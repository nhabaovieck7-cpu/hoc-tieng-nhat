// Cloudflare Worker: AI (Gemini) + tài khoản (D1) + admin duyệt + Google OAuth
// + giới hạn 2 thiết bị/tài khoản + đồng bộ tiến độ /progress (29/10)
// + Cộng đồng (bảng tin/hồ sơ/thông báo) + Chat riêng 1-1 + công cụ admin cộng đồng (29/10).
// Secrets: GEMINI_API_KEY, ACCESS_TOKEN, ADMIN_PASSWORD, CONTENT_KEY_B64, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
const SYS={
 hoi:'Bạn là giáo viên tiếng Nhật cho người Việt (trình độ N2–N1, có học viên làm kaigo). Trả lời NGẮN GỌN bằng tiếng Việt, rõ ràng, chính xác. Khi đưa câu tiếng Nhật hãy kèm bản dịch tiếng Việt; có thể ghi furigana dạng {漢字|かんじ}. Dùng **đậm** cho ý chính. Nếu không chắc, nói rõ là không chắc. Chỉ trả lời về tiếng Nhật, JLPT, văn hoá/công việc ở Nhật.',
 chua:'Bạn là giáo viên tiếng Nhật cho người Việt. Học viên gửi một câu tiếng Nhật. Hãy: (1) nói câu đúng hay sai, (2) chỉ ra lỗi cụ thể bằng tiếng Việt (ngữ pháp, trợ từ, kính ngữ, tự nhiên hay không), (3) đưa câu sửa ✅ kèm nghĩa tiếng Việt. Ngắn gọn, dùng ❌ / ✅.',
 dich:'Bạn là giáo viên chấm bài dịch Nhật→Việt. Có câu gốc, bản dịch mẫu và bản dịch của học viên. Chấm điểm trên 10 (dạng "**8/10**"), nhận xét ngắn bằng tiếng Việt: đúng ý chính chưa, từ nào dịch sai/thiếu, gợi ý cách dịch tự nhiên hơn. Tối đa 4 câu.',
 binhluan:'Bạn là trợ lý trả lời bình luận dưới bài học tiếng Nhật cho người Việt. Trả lời ngắn bằng tiếng Việt, thân thiện, chính xác; kèm ví dụ tiếng Nhật có dịch nếu cần.'};

const J=(o,s,h)=>new Response(JSON.stringify(o),{status:s||200,headers:Object.assign({'Content-Type':'application/json; charset=utf-8'},h||{})});
const now=()=>new Date().toISOString();
const b64=buf=>btoa(String.fromCharCode(...new Uint8Array(buf)));
const ub64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const te=new TextEncoder();
const b64url=buf=>{const a=buf instanceof Uint8Array?buf:new Uint8Array(buf);let s='';for(const x of a)s+=String.fromCharCode(x);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const randB64url=n=>{const a=new Uint8Array(n);crypto.getRandomValues(a);return b64url(a)};

async function pbkdf2Hash(password,saltB64,iter=100000){
  const salt=ub64(saltB64);
  const base=await crypto.subtle.importKey('raw',te.encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:iter,hash:'SHA-256'},base,256);
  return b64(bits);
}
function randB64(n=16){const a=new Uint8Array(n);crypto.getRandomValues(a);return b64(a)}
function cors(env,req){
  const origin=req.headers.get('Origin')||'';
  const allow=(env.ALLOWED_ORIGIN||'').split(',').map(s=>s.trim()).filter(Boolean);
  const ok=!origin||allow.includes(origin);
  return {
    ok,
    h:{
      'Access-Control-Allow-Origin':ok?origin:(allow[0]||'*'),
      'Access-Control-Allow-Methods':'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type, X-Access, Authorization',
      'Access-Control-Max-Age':'86400',
      'Vary':'Origin'
    }
  };
}
async function readJson(req){try{return await req.json()}catch(e){return null}}
function bearer(req){const a=req.headers.get('Authorization')||'';return a.startsWith('Bearer ')?a.slice(7).trim():''}

async function ensureOauthStates(env){
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS oauth_states (
    state TEXT PRIMARY KEY,
    return_to TEXT NOT NULL,
    expires_at TEXT NOT NULL
  )`).run();
}

async function ensureOauthCodes(env){
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS oauth_codes (
    code TEXT PRIMARY KEY,
    session TEXT NOT NULL,
    expires_at TEXT NOT NULL
  )`).run();
}

// --- Quên / đặt lại mật khẩu ---
// Token đặt lại chỉ lưu HASH SHA-256 trong D1, hạn 30 phút, dùng 1 lần; email là khoá chính
// nên xin link mới sẽ thay thế (huỷ) link cũ của cùng email.
async function ensurePasswordResets(env){
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS password_resets (
    email TEXT PRIMARY KEY,
    token_hash TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  )`).run();
}
async function sha256hex(s){
  const d=await crypto.subtle.digest('SHA-256',te.encode(s));
  return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function siteBase(env){
  const o=siteOrigins(env)[0];
  return (o||'https://nhabaovieck7-cpu.github.io/hoc-tieng-nhat').replace(/\/$/,'');
}
// Gửi email đặt lại mật khẩu qua Resend (https://resend.com) — hàm cắm-rút, thay nhà cung cấp chỉ sửa hàm này.
// Cần secret RESEND_API_KEY + biến/secret RESEND_FROM (địa chỉ gửi thuộc tên miền đã xác thực trên Resend).
// Chưa cấu hình → trả false, KHÔNG coi là lỗi lộ ra ngoài (endpoint luôn trả phản hồi chung). Token/link TUYỆT ĐỐI không ghi log.
async function sendResetEmail(env,to,link){
  const key=(env.RESEND_API_KEY||'').trim();
  const from=(env.RESEND_FROM||'').trim();
  if(!key||!from)return false;
  const subject='Đặt lại mật khẩu – Học tiếng Nhật cùng Khánh';
  const text='Bạn (hoặc ai đó) vừa xin đặt lại mật khẩu cho tài khoản Học tiếng Nhật cùng Khánh.\n\nMở link sau để đặt mật khẩu mới (link chỉ dùng được 1 lần, hết hạn sau 30 phút):\n'+link+'\n\nNếu không phải bạn, cứ bỏ qua email này — mật khẩu cũ vẫn giữ nguyên.';
  const html='<div style="font-family:sans-serif;line-height:1.6;color:#222"><p>Bạn (hoặc ai đó) vừa xin <b>đặt lại mật khẩu</b> cho tài khoản <b>Học tiếng Nhật cùng Khánh</b>.</p><p><a href="'+link+'" style="display:inline-block;background:#233d63;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none">Đặt lại mật khẩu</a></p><p style="font-size:.9em">Link chỉ dùng được 1 lần và hết hạn sau 30 phút. Nếu nút bấm không mở được, hãy dán link này vào trình duyệt:<br>'+link+'</p><p style="font-size:.9em;color:#666">Nếu không phải bạn, cứ bỏ qua email này — mật khẩu cũ vẫn giữ nguyên.</p></div>';
  try{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+key},body:JSON.stringify({from,to:[to],subject,text,html})});
    return r.ok;
  }catch(e){return false}
}

// --- Đếm giới hạn dùng chung (A4: đăng nhập sai; A6: hạn mức AI) ---
// Ưu tiên KV binding RL nếu có; không có thì rơi về D1 (binding DB) với bảng rate_limits tự tạo.
// Mọi lỗi lưu trữ đều nuốt im lặng (trả 0) để không bao giờ làm sập luồng chính.
let _rlTableReady=false;
async function ensureRateLimits(env){
  if(_rlTableReady||!env.DB)return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    day TEXT NOT NULL DEFAULT ''
  )`).run();
  _rlTableReady=true;
}
async function rlPeek(env,key){
  try{
    if(env.RL)return +(await env.RL.get(key)||0);
    if(env.DB){
      await ensureRateLimits(env);
      const row=await env.DB.prepare('SELECT count FROM rate_limits WHERE key=?').bind(key).first();
      return row?(+row.count||0):0;
    }
  }catch(e){}
  return 0;
}
async function rlHit(env,key,day){
  try{
    if(env.RL){const n=+(await env.RL.get(key)||0)+1;await env.RL.put(key,String(n),{expirationTtl:90000});return n}
    if(env.DB){
      await ensureRateLimits(env);
      await env.DB.prepare('INSERT INTO rate_limits(key,count,day) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET count=count+1').bind(key,1,day||'').run();
      const row=await env.DB.prepare('SELECT count FROM rate_limits WHERE key=?').bind(key).first();
      return row?(+row.count||0):1;
    }
  }catch(e){}
  return 0;
}

// A5: mã truy cập AI kỳ vọng = hex(SHA-256('hn-ai:' + CONTENT_KEY_B64)) — cùng công thức phía web (features.js AI.token()).
async function aiAccessExpected(env){
  if(!env.CONTENT_KEY_B64)return '';
  const digest=await crypto.subtle.digest('SHA-256',te.encode('hn-ai:'+env.CONTENT_KEY_B64));
  return [...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('');
}

function siteOrigins(env){
  return (env.ALLOWED_ORIGIN||'').split(',').map(s=>s.trim()).filter(Boolean);
}
function safeReturnTo(env, raw){
  const fallback='https://nhabaovieck7-cpu.github.io/hoc-tieng-nhat/dang-nhap.html';
  try{
    const u=new URL(String(raw||fallback));
    if(!['http:','https:'].includes(u.protocol))return fallback;
    const allowed=siteOrigins(env).map(o=>{try{return new URL(o).origin}catch(e){return ''}}).filter(Boolean);
    if(!allowed.includes(u.origin))return fallback;
    return u.toString().split('#')[0];
  }catch(e){return fallback}
}
function googleRedirectUri(env,req){
  // cố định theo app Google đã đăng ký
  return 'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev/auth/google/callback';
}
function googleClientId(env){return (env.GOOGLE_CLIENT_ID||env.OAUTH_GOOGLE_CLIENT_ID||'').trim()}

async function sessionUser(env,token){
  if(!token||!env.DB)return null;
  const row=await env.DB.prepare('SELECT s.kind,s.expires_at,s.user_id,u.email,u.name,u.status,u.method,u.created_at,u.last_visit FROM sessions s LEFT JOIN users u ON u.id=s.user_id WHERE s.token=?').bind(token).first();
  if(!row)return null;
  if(row.expires_at < now()){await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();return null}
  // Răng giới hạn thiết bị: phiên gắn với một thiết bị ĐÃ BỊ GỠ khỏi tài khoản thì
  // vô hiệu ngay tại lần gọi này (xoá phiên + bản gắn). Phiên cũ không có bản gắn
  // (từ trước bản này) vẫn dùng bình thường — không ai bị đá oan khi nâng cấp.
  if(row.kind==='user'){
    try{
      await ensureDevices(env);
      const bnd=await env.DB.prepare('SELECT device_id FROM session_devices WHERE token=?').bind(token).first();
      if(bnd){
        const dv=await env.DB.prepare('SELECT device_id,last_seen FROM devices WHERE user_id=? AND device_id=?').bind(row.user_id,bnd.device_id).first();
        if(!dv){
          await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();
          await env.DB.prepare('DELETE FROM session_devices WHERE token=?').bind(token).run();
          return null;
        }
        // last_seen của thiết bị: cập nhật tối đa 1 lần/giờ, tránh ghi DB mỗi lần mở trang.
        if(!dv.last_seen||(Date.now()-Date.parse(dv.last_seen))>3600e3){
          await env.DB.prepare('UPDATE devices SET last_seen=? WHERE user_id=? AND device_id=?').bind(now(),row.user_id,bnd.device_id).run();
        }
      }
    }catch(e){/* lỗi phụ trợ: không chặn luồng chính */}
  }
  return row;
}
async function makeSession(env,userId,kind,days=30){
  const token=randB64(32);
  const exp=new Date(Date.now()+days*864e5).toISOString();
  await env.DB.prepare('INSERT INTO sessions(token,user_id,kind,expires_at) VALUES(?,?,?,?)').bind(token,userId,kind,exp).run();
  return {token,expires_at:exp};
}
function publicUser(u){return {id:u.id||u.user_id,email:u.email,name:u.name,status:u.status,method:u.method,created_at:u.created_at,last_visit:u.last_visit}}

// ===== Giới hạn 2 thiết bị / tài khoản + đồng bộ tiến độ (29/10) =====
// Bảng MỚI (chỉ thêm, không sửa bảng cũ): devices (đăng ký thiết bị theo user),
// session_devices (gắn phiên ↔ thiết bị để gỡ thiết bị thì phiên chết theo),
// login_tickets (vé 1 lần khi đăng nhập bị chặn vì đủ 2 thiết bị — lưu HASH,
// hạn 10 phút, dùng 1 lần; cùng khuôn oauth_codes/password_resets),
// oauth_state_devices (mang device_id qua vòng OAuth Google),
// user_progress (tiến độ học theo user + khoá, giá trị là chuỗi JSON phía web).
// Slot thiết bị KHÔNG tự hết hạn theo thời gian: chỉ trống khi học viên đăng
// xuất trên thiết bị đó, tự gỡ lúc đăng nhập ở thiết bị mới, admin gỡ, hoặc
// đặt lại mật khẩu (khôi phục = chỉ giữ thiết bị đang đặt lại).
const DEVICE_LIMIT=2;
let _devReady=false;
async function ensureDevices(env){
  if(_devReady||!env.DB)return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS devices (
    user_id TEXT NOT NULL,
    device_id TEXT NOT NULL,
    label TEXT NOT NULL DEFAULT '',
    first_seen TEXT NOT NULL,
    last_seen TEXT NOT NULL,
    PRIMARY KEY(user_id, device_id)
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS session_devices (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    device_id TEXT NOT NULL
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS login_tickets (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    device_id TEXT NOT NULL,
    device_label TEXT NOT NULL DEFAULT '',
    expires_at TEXT NOT NULL
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS oauth_state_devices (
    state TEXT PRIMARY KEY,
    device_id TEXT NOT NULL DEFAULT '',
    device_label TEXT NOT NULL DEFAULT ''
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT NOT NULL,
    pkey TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY(user_id, pkey)
  )`).run();
  _devReady=true;
}
async function listDevices(env,userId){
  await ensureDevices(env);
  const r=await env.DB.prepare('SELECT device_id,label,first_seen,last_seen FROM devices WHERE user_id=? ORDER BY last_seen DESC').bind(userId).all();
  return r.results||[];
}
async function bindSessionDevice(env,token,userId,deviceId){
  await ensureDevices(env);
  await env.DB.prepare('INSERT OR REPLACE INTO session_devices(token,user_id,device_id) VALUES(?,?,?)').bind(token,userId,deviceId).run();
}
async function killDeviceSessions(env,userId,deviceId){
  await ensureDevices(env);
  const r=await env.DB.prepare('SELECT token FROM session_devices WHERE user_id=? AND device_id=?').bind(userId,deviceId).all();
  for(const row of (r.results||[])){
    await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(row.token).run();
    await env.DB.prepare('DELETE FROM session_devices WHERE token=?').bind(row.token).run();
  }
}
async function removeDevice(env,userId,deviceId){
  await ensureDevices(env);
  await killDeviceSessions(env,userId,deviceId);
  await env.DB.prepare('DELETE FROM devices WHERE user_id=? AND device_id=?').bind(userId,deviceId).run();
}
// Cổng thiết bị cho một lần đăng nhập: thiết bị đã đăng ký -> cho qua (cập nhật
// last_seen/nhãn); thiết bị mới mà còn slot -> đăng ký luôn; đã đủ 2 thiết bị ->
// {ok:false, devices, ticket} để web cho học viên chọn gỡ một thiết bị.
// Không gửi device_id (client cũ) -> cho qua, phiên không gắn thiết bị.
async function deviceGate(env,userId,deviceId,label){
  await ensureDevices(env);
  const did=String(deviceId||'').trim().slice(0,80);
  if(!did)return {ok:true,unbound:true};
  const lb=String(label||'').trim().slice(0,120);
  const t=now();
  const ex=await env.DB.prepare('SELECT device_id FROM devices WHERE user_id=? AND device_id=?').bind(userId,did).first();
  if(ex){
    await env.DB.prepare("UPDATE devices SET last_seen=?, label=CASE WHEN ?<>'' THEN ? ELSE label END WHERE user_id=? AND device_id=?").bind(t,lb,lb,userId,did).run();
    return {ok:true};
  }
  const ds=await listDevices(env,userId);
  if(ds.length<DEVICE_LIMIT){
    await env.DB.prepare('INSERT INTO devices(user_id,device_id,label,first_seen,last_seen) VALUES(?,?,?,?,?)').bind(userId,did,lb,t,t).run();
    return {ok:true};
  }
  const raw=randB64url(32);
  const hash=await sha256hex(raw);
  const exp=new Date(Date.now()+10*60*1000).toISOString();
  await env.DB.prepare('INSERT OR REPLACE INTO login_tickets(token_hash,user_id,device_id,device_label,expires_at) VALUES(?,?,?,?,?)').bind(hash,userId,did,lb,exp).run();
  await env.DB.prepare('DELETE FROM login_tickets WHERE expires_at < ?').bind(t).run();
  return {ok:false,devices:ds,ticket:raw};
}
function oauthConfigured(env,p){
  if(p==='google')return !!googleClientId(env) && !!(env.GOOGLE_CLIENT_SECRET||'').trim();
  if(p==='facebook')return !!(env.OAUTH_FACEBOOK_APP_ID||'').trim();
  if(p==='line')return !!(env.OAUTH_LINE_CHANNEL_ID||'').trim();
  if(p==='apple')return !!(env.OAUTH_APPLE_CLIENT_ID||'').trim();
  return false;
}

function redirectWith(url, params){
  const u=new URL(url);
  Object.entries(params||{}).forEach(([k,v])=>{ if(v!=null && v!=='') u.searchParams.set(k,String(v)); });
  return Response.redirect(u.toString(), 302);
}

async function handleGoogleStart(req,env,c){
  const cid=googleClientId(env);
  if(!cid || !(env.GOOGLE_CLIENT_SECRET||'').trim())return J({error:'Google OAuth chưa cấu hình'},503,c.h);
  const url=new URL(req.url);
  const returnTo=safeReturnTo(env, url.searchParams.get('return')||url.searchParams.get('return_to'));
  await ensureOauthStates(env);
  const state=randB64url(24);
  const exp=new Date(Date.now()+10*60*1000).toISOString();
  await env.DB.prepare('INSERT INTO oauth_states(state,return_to,expires_at) VALUES(?,?,?)').bind(state,returnTo,exp).run();
  // Mang device_id của hồ sơ trình duyệt qua vòng OAuth (để callback áp cổng 2 thiết bị).
  const gDid=String(url.searchParams.get('device_id')||'').trim().slice(0,80);
  const gLab=String(url.searchParams.get('device_label')||'').trim().slice(0,120);
  if(gDid){await ensureDevices(env);await env.DB.prepare('INSERT OR REPLACE INTO oauth_state_devices(state,device_id,device_label) VALUES(?,?,?)').bind(state,gDid,gLab).run()}
  // dọn state cũ
  await env.DB.prepare('DELETE FROM oauth_states WHERE expires_at < ?').bind(now()).run();
  const auth=new URL('https://accounts.google.com/o/oauth2/v2/auth');
  auth.searchParams.set('client_id',cid);
  auth.searchParams.set('redirect_uri',googleRedirectUri(env,req));
  auth.searchParams.set('response_type','code');
  auth.searchParams.set('scope','openid email profile');
  auth.searchParams.set('state',state);
  auth.searchParams.set('access_type','online');
  auth.searchParams.set('prompt','select_account');
  return Response.redirect(auth.toString(), 302);
}

async function handleGoogleCallback(req,env,c){
  const url=new URL(req.url);
  const err=url.searchParams.get('error');
  const code=url.searchParams.get('code');
  const state=url.searchParams.get('state')||'';
  await ensureOauthStates(env);
  const st=state?await env.DB.prepare('SELECT * FROM oauth_states WHERE state=?').bind(state).first():null;
  const returnTo=st?st.return_to:safeReturnTo(env,null);
  if(st)await env.DB.prepare('DELETE FROM oauth_states WHERE state=?').bind(state).run();
  let sd=null;
  if(state){await ensureDevices(env);sd=await env.DB.prepare('SELECT device_id,device_label FROM oauth_state_devices WHERE state=?').bind(state).first();if(sd)await env.DB.prepare('DELETE FROM oauth_state_devices WHERE state=?').bind(state).run()}
  if(err)return redirectWith(returnTo,{oauth_error:'Google từ chối đăng nhập ('+err+')'});
  if(!st || st.expires_at < now())return redirectWith(returnTo,{oauth_error:'Phiên Google hết hạn. Thử lại.'});
  if(!code)return redirectWith(returnTo,{oauth_error:'Thiếu mã Google'});
  const cid=googleClientId(env);
  const secret=(env.GOOGLE_CLIENT_SECRET||'').trim();
  if(!cid||!secret)return redirectWith(returnTo,{oauth_error:'Google OAuth chưa cấu hình'});

  const body=new URLSearchParams({
    code,
    client_id:cid,
    client_secret:secret,
    redirect_uri:googleRedirectUri(env,req),
    grant_type:'authorization_code'
  });
  const tr=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
  const tj=await tr.json().catch(()=>({}));
  if(!tr.ok || !tj.access_token)return redirectWith(returnTo,{oauth_error:'Không đổi được mã Google'});

  const ur=await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{headers:{Authorization:'Bearer '+tj.access_token}});
  const uj=await ur.json().catch(()=>({}));
  if(!ur.ok || !uj.email)return redirectWith(returnTo,{oauth_error:'Không lấy được email Google'});
  const email=String(uj.email).trim().toLowerCase().slice(0,120);
  const name=String(uj.name||uj.given_name||email.split('@')[0]).trim().slice(0,80)||'Học viên';

  let u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
  if(u){
    if(u.status==='locked')return redirectWith(returnTo,{oauth_error:'Tài khoản đã bị khoá. Liên hệ Khánh.'});
    if(u.status==='rejected')return redirectWith(returnTo,{oauth_error:'Đăng ký đã bị từ chối.'});
    // liên kết: cập nhật tên nếu cần, ghi method google nếu trước đó email
    if(u.method!=='google'){
      await env.DB.prepare('UPDATE users SET method=?, name=?, last_visit=? WHERE id=?').bind('google', name||u.name, now(), u.id).run();
      u.method='google'; u.name=name||u.name;
    }else{
      await env.DB.prepare('UPDATE users SET name=?, last_visit=? WHERE id=?').bind(name||u.name, now(), u.id).run();
      u.name=name||u.name;
    }
    u.last_visit=now();
  }else{
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO users(id,email,name,pass_salt,pass_hash,method,status,created_at,last_visit) VALUES(?,?,?,?,?,?,?,?,?)')
      .bind(id,email,name,'oauth','oauth','google','pending',now(),now()).run();
    u={id,email,name,method:'google',status:'pending',created_at:now(),last_visit:now()};
  }
  // Cổng 2 thiết bị: bị chặn thì KHÔNG tạo phiên — quay về trang đăng nhập kèm vé
  // chọn thiết bị (device_ticket) để học viên gỡ một thiết bị rồi hoàn tất đăng nhập.
  let gBind='';
  if(sd&&sd.device_id){
    const gate=await deviceGate(env,u.id,sd.device_id,sd.device_label);
    if(!gate.ok){
      return redirectWith(returnTo,{device_ticket:gate.ticket,status:u.status,oauth:'google'});
    }
    gBind=sd.device_id;
  }
  const sess=await makeSession(env,u.id,'user');
  if(gBind)await bindSessionDevice(env,sess.token,u.id,gBind);
  // A13: không đưa session token lên URL nữa — sinh mã dùng 1 lần (hạn 5 phút), web đổi mã lấy phiên qua POST /auth/exchange.
  await ensureOauthCodes(env);
  const xcode=randB64url(32);
  const xexp=new Date(Date.now()+5*60*1000).toISOString();
  await env.DB.prepare('INSERT INTO oauth_codes(code,session,expires_at) VALUES(?,?,?)').bind(xcode,sess.token,xexp).run();
  await env.DB.prepare('DELETE FROM oauth_codes WHERE expires_at < ?').bind(now()).run();
  return redirectWith(returnTo,{code:xcode,status:u.status,oauth:'google'});
}

async function handleAuth(req,env,c,path){
  if(!env.DB)return J({error:'Chưa cấu hình cơ sở dữ liệu tài khoản (D1).'},503,c.h);

  if(path==='/auth/google/start'&&req.method==='GET')return handleGoogleStart(req,env,c);
  if(path==='/auth/google/callback'&&req.method==='GET')return handleGoogleCallback(req,env,c);

  // --- exchange: đổi mã dùng 1 lần (A13) lấy phiên — dùng xong xoá mã ngay ---
  if(path==='/auth/exchange'&&req.method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const xcode=String(b.code||'').trim();
    if(!xcode)return J({error:'Thiếu mã'},400,c.h);
    await ensureOauthCodes(env);
    const row=await env.DB.prepare('SELECT * FROM oauth_codes WHERE code=?').bind(xcode).first();
    if(row)await env.DB.prepare('DELETE FROM oauth_codes WHERE code=?').bind(xcode).run();
    if(!row||row.expires_at<now())return J({error:'Mã đã hết hạn hoặc đã dùng. Đăng nhập lại.'},401,c.h);
    const s=await sessionUser(env,row.session);
    if(!s)return J({error:'Phiên không còn hiệu lực'},401,c.h);
    if(s.kind==='admin'){
      const out={ok:true,status:'approved',session:row.session,user:{id:'admin',name:'Admin',status:'approved',method:'admin'}};
      if(env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
      return J(out,200,c.h);
    }
    if(s.kind!=='user')return J({error:'Phiên không còn hiệu lực'},401,c.h);
    const out={ok:true,status:s.status,session:row.session,user:publicUser(s)};
    if(s.status==='approved'&&env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
    return J(out,200,c.h);
  }

  // --- bị chặn vì đủ 2 thiết bị: xem danh sách thiết bị bằng vé (không tốn vé) ---
  if(path==='/auth/device/ticket-info'&&req.method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    await ensureDevices(env);
    const hash=await sha256hex(String(b.login_ticket||''));
    const row=await env.DB.prepare('SELECT * FROM login_tickets WHERE token_hash=?').bind(hash).first();
    if(!row||row.expires_at<now())return J({error:'Phiên chọn thiết bị đã hết hạn. Hãy đăng nhập lại.'},401,c.h);
    const u=await env.DB.prepare('SELECT id,email,name FROM users WHERE id=?').bind(row.user_id).first();
    if(!u)return J({error:'Tài khoản không còn tồn tại'},404,c.h);
    const ds=await listDevices(env,row.user_id);
    return J({ok:true,email:u.email,name:u.name,devices:ds},200,c.h);
  }

  // --- gỡ một thiết bị bằng vé rồi hoàn tất đăng nhập trên thiết bị mới ---
  // Vé chỉ dùng 1 lần (xoá ngay khi resolve); học viên đã xác thực mật khẩu/Google
  // ở bước đăng nhập trước đó nên được quyền chọn thiết bị của CHÍNH tài khoản đó để gỡ.
  if(path==='/auth/device/resolve'&&req.method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    await ensureDevices(env);
    const hash=await sha256hex(String(b.login_ticket||''));
    const row=await env.DB.prepare('SELECT * FROM login_tickets WHERE token_hash=?').bind(hash).first();
    if(row)await env.DB.prepare('DELETE FROM login_tickets WHERE token_hash=?').bind(hash).run();
    if(!row||row.expires_at<now())return J({error:'Phiên chọn thiết bị đã hết hạn. Hãy đăng nhập lại.'},401,c.h);
    const u=await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(row.user_id).first();
    if(!u)return J({error:'Tài khoản không còn tồn tại'},404,c.h);
    if(u.status==='locked')return J({error:'Tài khoản đã bị khoá. Liên hệ Khánh.'},403,c.h);
    if(u.status==='rejected')return J({error:'Đăng ký đã bị từ chối.'},403,c.h);
    const removeId=String(b.remove_device_id||'').trim();
    if(removeId){
      const own=await env.DB.prepare('SELECT device_id FROM devices WHERE user_id=? AND device_id=?').bind(u.id,removeId).first();
      if(!own)return J({error:'Thiết bị cần gỡ không thuộc tài khoản này'},400,c.h);
      await removeDevice(env,u.id,removeId);
    }
    const gate=await deviceGate(env,u.id,row.device_id,row.device_label);
    if(!gate.ok){
      return J({error:'Tài khoản vẫn đang dùng đủ 2 thiết bị. Hãy gỡ một thiết bị để tiếp tục.',code:'device_limit',devices:gate.devices,login_ticket:gate.ticket},403,c.h);
    }
    await env.DB.prepare('UPDATE users SET last_visit=? WHERE id=?').bind(now(),u.id).run();
    u.last_visit=now();
    const sess=await makeSession(env,u.id,'user');
    await bindSessionDevice(env,sess.token,u.id,row.device_id);
    const out={ok:true,status:u.status,session:sess.token,user:publicUser(u)};
    if(u.status==='approved'&&env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
    return J(out,200,c.h);
  }

  // --- quên mật khẩu: xin link đặt lại ---
  // Phản hồi LUÔN giống nhau dù email có tồn tại hay không, và dù đã chạm giới hạn hay chưa (chống dò tài khoản).
  if(path==='/auth/password/forgot'&&req.method==='POST'){
    const done=()=>J({ok:true,message:'Nếu email này có tài khoản, link đặt lại mật khẩu đã được gửi. Kiểm tra hộp thư (cả mục thư rác) nhé.'},200,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const email=String(b.email||'').trim().toLowerCase().slice(0,120);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return done();
    // Giới hạn tần suất (dùng chung cơ chế đếm A4): tối đa 3 lần/ngày theo email, 10 lần/ngày theo IP.
    const prDay=new Date().toISOString().slice(0,10);
    const ipKey='pr:'+prDay+':ip:'+(req.headers.get('CF-Connecting-IP')||'x');
    const emKey='pr:'+prDay+':e:'+email;
    if(await rlPeek(env,ipKey)>=10||await rlPeek(env,emKey)>=3)return done();
    await rlHit(env,ipKey,prDay);await rlHit(env,emKey,prDay);
    const u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
    // Chỉ tài khoản có mật khẩu thật mới đặt lại được (tài khoản Google thuần không có mật khẩu để đặt lại).
    if(u&&u.pass_hash&&u.pass_hash!=='oauth'){
      await ensurePasswordResets(env);
      const token=randB64url(32);
      const tokenHash=await sha256hex(token);
      const exp=new Date(Date.now()+30*60*1000).toISOString();
      // INSERT OR REPLACE theo email: xin link mới sẽ huỷ link cũ chưa dùng của cùng email.
      await env.DB.prepare('INSERT OR REPLACE INTO password_resets(email,token_hash,expires_at,used,created_at) VALUES(?,?,?,0,?)').bind(email,tokenHash,exp,now()).run();
      await env.DB.prepare('DELETE FROM password_resets WHERE expires_at < ?').bind(now()).run();
      const link=siteBase(env)+'/dat-lai-mat-khau.html?token='+encodeURIComponent(token);
      await sendResetEmail(env,email,link);
    }
    return done();
  }

  // --- đặt lại mật khẩu bằng token trong email ---
  // Mọi lỗi (token sai/hết hạn/đã dùng/không thấy tài khoản) đều trả CHUNG một câu (không lộ chi tiết).
  if(path==='/auth/password/reset'&&req.method==='POST'){
    const fail=()=>J({error:'Link đặt lại mật khẩu đã hết hạn hoặc đã dùng. Hãy xin link mới.'},400,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const token=String(b.token||'').trim();
    const password=String(b.password||'');
    if(password.length<8)return J({error:'Mật khẩu cần ít nhất 8 ký tự'},400,c.h);
    if(!token||token.length>200)return fail();
    const rstDay=new Date().toISOString().slice(0,10);
    const rstKey='pr:'+rstDay+':rst:'+(req.headers.get('CF-Connecting-IP')||'x');
    if(await rlPeek(env,rstKey)>=20)return fail();
    await ensurePasswordResets(env);
    const tokenHash=await sha256hex(token);
    const row=await env.DB.prepare('SELECT * FROM password_resets WHERE token_hash=?').bind(tokenHash).first();
    if(!row||row.used||row.expires_at<now()){await rlHit(env,rstKey,rstDay);return fail()}
    const u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(row.email).first();
    if(!u){await rlHit(env,rstKey,rstDay);return fail()}
    // Đổi mật khẩu theo đúng cơ chế hiện tại: salt ngẫu nhiên mới + PBKDF2 (pbkdf2Hash).
    const salt=randB64(16);
    const hash=await pbkdf2Hash(password,salt);
    await env.DB.prepare('UPDATE users SET pass_salt=?, pass_hash=? WHERE id=?').bind(salt,hash,u.id).run();
    await env.DB.prepare('UPDATE password_resets SET used=1 WHERE email=?').bind(row.email).run();
    // Vô hiệu hoá MỌI phiên cũ của tài khoản: mọi thiết bị phải đăng nhập lại bằng mật khẩu mới.
    await env.DB.prepare('DELETE FROM sessions WHERE user_id=?').bind(u.id).run();
    await ensureDevices(env);
    await env.DB.prepare('DELETE FROM session_devices WHERE user_id=?').bind(u.id).run();
    // Đặt lại mật khẩu là đường khôi phục: nếu biết thiết bị đang đặt lại thì chỉ
    // giữ thiết bị đó trong danh sách đăng ký, gỡ mọi thiết bị còn lại.
    const rsDid=String(b.device_id||'').trim().slice(0,80);
    if(rsDid){
      await env.DB.prepare('DELETE FROM devices WHERE user_id=?').bind(u.id).run();
      const t0=now();
      await env.DB.prepare('INSERT INTO devices(user_id,device_id,label,first_seen,last_seen) VALUES(?,?,?,?,?)').bind(u.id,rsDid,String(b.device_label||'').trim().slice(0,120),t0,t0).run();
    }
    if(u.status==='approved'||u.status==='pending'){
      const sess=await makeSession(env,u.id,'user');
      if(rsDid)await bindSessionDevice(env,sess.token,u.id,rsDid);
      const out={ok:true,status:u.status,session:sess.token,user:publicUser(u)};
      if(u.status==='approved'&&env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
      return J(out,200,c.h);
    }
    return J({ok:true,status:u.status},200,c.h);
  }

  // --- register ---
  if(path==='/auth/register'&&req.method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const name=String(b.name||'').trim().slice(0,80);
    const email=String(b.email||'').trim().toLowerCase().slice(0,120);
    const password=String(b.password||'');
    if(!name||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return J({error:'Tên hoặc email không hợp lệ'},400,c.h);
    if(password.length<8)return J({error:'Mật khẩu cần ít nhất 8 ký tự'},400,c.h);
    const exist=await env.DB.prepare('SELECT id FROM users WHERE email=?').bind(email).first();
    if(exist)return J({error:'Email này đã được đăng ký'},409,c.h);
    const salt=randB64(16);
    const hash=await pbkdf2Hash(password,salt);
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO users(id,email,name,pass_salt,pass_hash,method,status,created_at) VALUES(?,?,?,?,?,?,?,?)')
      .bind(id,email,name,salt,hash,'email','pending',now()).run();
    const sess=await makeSession(env,id,'user');
    // Tài khoản mới: đăng ký luôn thiết bị đang đăng ký (danh sách đang trống).
    const rDid=String(b.device_id||'').trim().slice(0,80);
    if(rDid){
      await ensureDevices(env);
      const t0=now();
      await env.DB.prepare('INSERT OR IGNORE INTO devices(user_id,device_id,label,first_seen,last_seen) VALUES(?,?,?,?,?)').bind(id,rDid,String(b.device_label||'').trim().slice(0,120),t0,t0).run();
      await bindSessionDevice(env,sess.token,id,rDid);
    }
    return J({ok:true,status:'pending',session:sess.token,user:publicUser({id,email,name,status:'pending',method:'email',created_at:now()})},201,c.h);
  }

  // --- login ---
  if(path==='/auth/login'&&req.method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const email=String(b.email||'').trim().toLowerCase();
    const password=String(b.password||'');
    // A4: chống dò mật khẩu — đếm lần đăng nhập sai theo IP, chặn 10 lần/ngày, kiểm tra TRƯỚC khi so mật khẩu.
    const lfDay=new Date().toISOString().slice(0,10);
    const lfKey='lf:'+lfDay+':login:'+(req.headers.get('CF-Connecting-IP')||'x');
    if(await rlPeek(env,lfKey)>=10)return J({error:'Quá nhiều lần đăng nhập sai. Thử lại vào ngày mai.'},429,c.h);
    const u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
    if(!u){await rlHit(env,lfKey,lfDay);return J({error:'Email hoặc mật khẩu không đúng'},401,c.h)}
    if(u.method==='google'&&(u.pass_hash==='oauth'||!u.pass_hash)){await rlHit(env,lfKey,lfDay);return J({error:'Email này đăng nhập bằng Google'},401,c.h)}
    const hash=await pbkdf2Hash(password,u.pass_salt);
    if(hash!==u.pass_hash){await rlHit(env,lfKey,lfDay);return J({error:'Email hoặc mật khẩu không đúng'},401,c.h)}
    if(u.status==='locked')return J({error:'Tài khoản đã bị khoá. Liên hệ Khánh.'},403,c.h);
    if(u.status==='rejected')return J({error:'Đăng ký đã bị từ chối.'},403,c.h);
    // Cổng 2 thiết bị: đủ 2 thiết bị khác -> chặn hoàn tất đăng nhập, trả danh sách
    // thiết bị + vé 1 lần để học viên gỡ một thiết bị ngay tại bước này.
    const gate=await deviceGate(env,u.id,b.device_id,b.device_label);
    if(!gate.ok){
      return J({error:'Tài khoản này đã đăng nhập trên 2 thiết bị khác. Hãy đăng xuất một thiết bị trong danh sách dưới đây để tiếp tục trên thiết bị này.',code:'device_limit',devices:gate.devices,login_ticket:gate.ticket},403,c.h);
    }
    await env.DB.prepare('UPDATE users SET last_visit=? WHERE id=?').bind(now(),u.id).run();
    u.last_visit=now();
    const sess=await makeSession(env,u.id,'user');
    const lDid=String(b.device_id||'').trim().slice(0,80);
    if(lDid)await bindSessionDevice(env,sess.token,u.id,lDid);
    const out={ok:true,status:u.status,session:sess.token,user:publicUser(u)};
    if(u.status==='approved'&&env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
    return J(out,200,c.h);
  }

  // --- logout ---
  // Đăng xuất chủ động: xoá phiên, bỏ gắn phiên–thiết bị và GỠ luôn đăng ký thiết
  // bị của phiên này để chỗ trống mở ngay cho thiết bị khác.
  if(path==='/auth/logout'&&req.method==='POST'){
    const t=bearer(req);
    if(t){
      try{
        const srow=await env.DB.prepare('SELECT user_id,kind FROM sessions WHERE token=?').bind(t).first();
        await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(t).run();
        if(srow&&srow.kind==='user'){
          await ensureDevices(env);
          const bnd=await env.DB.prepare('SELECT device_id FROM session_devices WHERE token=?').bind(t).first();
          await env.DB.prepare('DELETE FROM session_devices WHERE token=?').bind(t).run();
          let did=bnd?bnd.device_id:'';
          if(!did){
            const bb=await readJson(req);
            if(bb&&bb.device_id){
              const cand=String(bb.device_id).trim().slice(0,80);
              const own=await env.DB.prepare('SELECT device_id FROM devices WHERE user_id=? AND device_id=?').bind(srow.user_id,cand).first();
              if(own)did=cand;
            }
          }
          if(did)await env.DB.prepare('DELETE FROM devices WHERE user_id=? AND device_id=?').bind(srow.user_id,did).run();
        }
      }catch(e){}
    }
    return J({ok:true},200,c.h);
  }

  // --- me ---
  if(path==='/auth/me'&&(req.method==='GET'||req.method==='POST')){
    const t=bearer(req);const s=await sessionUser(env,t);
    if(!s)return J({error:'Chưa đăng nhập'},401,c.h);
    if(s.kind==='admin'){
      const out={ok:true,user:{id:'admin',name:'Admin',status:'approved',method:'admin'}};
      if(env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
      return J(out,200,c.h);
    }
    if(s.kind!=='user')return J({error:'Chưa đăng nhập'},401,c.h);
    if(s.status==='approved')await env.DB.prepare('UPDATE users SET last_visit=? WHERE id=?').bind(now(),s.user_id).run();
    const out={ok:true,user:publicUser(s)};
    if(s.status==='approved'&&env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
    return J(out,200,c.h);
  }

  // --- oauth stub (facebook/line/apple) + google tip ---
  if(path.startsWith('/auth/oauth/')&&req.method==='POST'){
    const p=path.slice('/auth/oauth/'.length);
    if(!['google','facebook','line','apple'].includes(p))return J({error:'Nhà cung cấp không hỗ trợ'},400,c.h);
    if(p==='google'&&oauthConfigured(env,'google')){
      return J({ok:true,redirect:'/auth/google/start',message:'Dùng GET /auth/google/start'},200,c.h);
    }
    if(!oauthConfigured(env,p))return J({error:'Sắp có',code:'soon',provider:p,message:'Đăng nhập bằng '+p+' sẽ mở khi Khánh cấu hình xong App ID.'},501,c.h);
    return J({error:'Sắp có',code:'soon',provider:p,message:'Handler OAuth đã sẵn sàng khung nhưng chưa nối xong.'},501,c.h);
  }

  // --- admin login ---
  if(path==='/auth/admin/login'&&req.method==='POST'){
    if(!env.ADMIN_PASSWORD)return J({error:'Chưa đặt ADMIN_PASSWORD'},503,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    // A4: chống dò mật khẩu admin — cùng cơ chế đếm như /auth/login, scope 'admin'.
    const afDay=new Date().toISOString().slice(0,10);
    const afKey='lf:'+afDay+':admin:'+(req.headers.get('CF-Connecting-IP')||'x');
    if(await rlPeek(env,afKey)>=10)return J({error:'Quá nhiều lần đăng nhập sai. Thử lại vào ngày mai.'},429,c.h);
    const pw=String(b.password||'').trim();
    if(pw!==env.ADMIN_PASSWORD){await rlHit(env,afKey,afDay);return J({error:'Mật khẩu admin không đúng'},401,c.h)}
    const sess=await makeSession(env,'admin','admin',7);
    const out={ok:true,session:sess.token};
    if(env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
    return J(out,200,c.h);
  }

  // --- admin users ---
  if(path==='/auth/admin/users'&&req.method==='GET'){
    const t=bearer(req);const s=await sessionUser(env,t);
    if(!s||s.kind!=='admin')return J({error:'Cần đăng nhập admin'},401,c.h);
    const url=new URL(req.url);
    const tab=url.searchParams.get('tab')||'pending';
    let statusFilter;
    if(tab==='approved')statusFilter='approved';
    else if(tab==='locked')statusFilter='locked';
    else if(tab==='rejected')statusFilter='rejected';
    else statusFilter='pending';
    await ensureDevices(env);
    const rows=await env.DB.prepare('SELECT id,email,name,method,status,created_at,last_visit,reviewed_at,(SELECT COUNT(*) FROM devices WHERE devices.user_id=users.id) AS device_count FROM users WHERE status=? ORDER BY created_at DESC LIMIT 200').bind(statusFilter).all();
    return J({ok:true,tab:statusFilter,users:rows.results||[]},200,c.h);
  }

  // --- admin action ---
  if(path==='/auth/admin/action'&&req.method==='POST'){
    const t=bearer(req);const s=await sessionUser(env,t);
    if(!s||s.kind!=='admin')return J({error:'Cần đăng nhập admin'},401,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const id=String(b.userId||'');
    const action=String(b.action||'');
    const map={approve:'approved',reject:'rejected',lock:'locked'};
    if(!map[action])return J({error:'Hành động không hợp lệ'},400,c.h);
    const r=await env.DB.prepare('UPDATE users SET status=?, reviewed_at=? WHERE id=?').bind(map[action],now(),id).run();
    if(!r.meta||!r.meta.changes)return J({error:'Không tìm thấy người dùng'},404,c.h);
    return J({ok:true,status:map[action]},200,c.h);
  }

  // --- admin: danh sách thiết bị của một tài khoản ---
  if(path==='/auth/admin/devices'&&req.method==='GET'){
    const t=bearer(req);const s=await sessionUser(env,t);
    if(!s||s.kind!=='admin')return J({error:'Cần đăng nhập admin'},401,c.h);
    const url=new URL(req.url);
    const uid=String(url.searchParams.get('user_id')||'');
    if(!uid)return J({error:'Thiếu user_id'},400,c.h);
    const ds=await listDevices(env,uid);
    return J({ok:true,devices:ds},200,c.h);
  }

  // --- admin: gỡ 1 thiết bị (phiên của thiết bị đó chết theo) ---
  if(path==='/auth/admin/device-remove'&&req.method==='POST'){
    const t=bearer(req);const s=await sessionUser(env,t);
    if(!s||s.kind!=='admin')return J({error:'Cần đăng nhập admin'},401,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const uid=String(b.userId||''),did=String(b.device_id||'').trim();
    if(!uid||!did)return J({error:'Thiếu userId hoặc device_id'},400,c.h);
    await removeDevice(env,uid,did);
    return J({ok:true},200,c.h);
  }

  // --- admin: đăng xuất mọi thiết bị của một tài khoản (đường cứu hộ khi mất máy) ---
  if(path==='/auth/admin/device-remove-all'&&req.method==='POST'){
    const t=bearer(req);const s=await sessionUser(env,t);
    if(!s||s.kind!=='admin')return J({error:'Cần đăng nhập admin'},401,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const uid=String(b.userId||'');
    if(!uid)return J({error:'Thiếu userId'},400,c.h);
    await ensureDevices(env);
    await env.DB.prepare('DELETE FROM sessions WHERE user_id=?').bind(uid).run();
    await env.DB.prepare('DELETE FROM session_devices WHERE user_id=?').bind(uid).run();
    await env.DB.prepare('DELETE FROM devices WHERE user_id=?').bind(uid).run();
    return J({ok:true},200,c.h);
  }

  return J({error:'Không tìm thấy API'},404,c.h);
}

// --- Hồ sơ cá nhân theo tài khoản: GET/POST/DELETE /hoso (29/10) ---
// Bảng RIÊNG user_hoso (không dùng `profiles` của Cộng đồng). Chỉ chủ tài khoản
// đọc/ghi qua phiên của chính mình (sessionUser), không có :id, không có danh
// sách, không admin/xếp hạng/stats nào đọc bảng này. Không log nội dung.
const HOSO_MAX={hn_dk_ho_so:4096,hn_dk_avatar:70000,hn_dk_level:4,hn_dk_goal:4};
const HOSO_LEVEL=['N5','N4','N3','N2','N1'];
const HOSO_GOAL=['5','10','20','30','60','120'];
const _hosoRl=new Map();
function hosoRlOk(uid){
  const m=Math.floor(Date.now()/60000);const k=uid+':'+m;
  const n=(_hosoRl.get(k)||0)+1;_hosoRl.set(k,n);
  if(_hosoRl.size>500)for(const kk of _hosoRl.keys()){if(!kk.endsWith(':'+m))_hosoRl.delete(kk)}
  return n<=20;
}
function hosoAvatarOk(v){
  let b64;
  if(v.startsWith('data:image/webp;base64,'))b64=v.slice(23);
  else if(v.startsWith('data:image/jpeg;base64,'))b64=v.slice(23);
  else return false;
  if(!/^[A-Za-z0-9+/]+={0,2}$/.test(b64))return false;
  let bin;try{bin=atob(b64.slice(0,16))}catch(e){return false}
  const by=i=>bin.charCodeAt(i);
  if(v.startsWith('data:image/webp'))return bin.length>=12&&bin.slice(0,4)==='RIFF'&&bin.slice(8,12)==='WEBP';
  return bin.length>=3&&by(0)===0xFF&&by(1)===0xD8&&by(2)===0xFF;
}
// Trả mã lỗi (chuỗi) nếu giá trị không hợp lệ, null nếu hợp lệ.
function hosoCheck(k,v){
  if(typeof v!=='string')return 'type';
  if(v.length>HOSO_MAX[k])return 'size';
  if(k==='hn_dk_avatar')return hosoAvatarOk(v)?null:'avatar';
  if(k==='hn_dk_level')return HOSO_LEVEL.includes(v)?null:'enum';
  if(k==='hn_dk_goal')return HOSO_GOAL.includes(v)?null:'enum';
  if(k==='hn_dk_ho_so'){try{const o=JSON.parse(v);return (o&&typeof o==='object'&&!Array.isArray(o))?null:'json'}catch(e){return 'json'}}
  return 'key';
}
let _hosoReady=false;
async function ensureHoso(env){
  if(_hosoReady)return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS user_hoso (
    user_id TEXT NOT NULL,
    pkey TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY(user_id, pkey)
  )`).run();
  _hosoReady=true;
}
async function handleHoso(req,env,c){
  const h=Object.assign({},c.h,{'Cache-Control':'no-store, private'});
  if(!env.DB)return J({error:'Chưa cấu hình cơ sở dữ liệu tài khoản (D1).'},503,h);
  const s=await sessionUser(env,bearer(req));
  if(!s||s.kind!=='user')return J({error:'Chưa đăng nhập'},401,h);
  if(s.status==='locked'||s.status==='rejected')return J({error:'Tài khoản không còn hiệu lực'},403,h);
  await ensureHoso(env);
  if(req.method==='GET'){
    const r=await env.DB.prepare('SELECT pkey,value,updated_at FROM user_hoso WHERE user_id=?').bind(s.user_id).all();
    const items={};
    for(const row of (r.results||[]))items[row.pkey]={v:row.value,u:row.updated_at};
    return J({ok:true,items,server_time:now()},200,h);
  }
  if(req.method==='DELETE'){
    await env.DB.prepare('DELETE FROM user_hoso WHERE user_id=?').bind(s.user_id).run();
    return J({ok:true},200,h);
  }
  if(req.method==='POST'){
    if(!hosoRlOk(s.user_id))return J({error:'Lưu quá nhanh, thử lại sau ít phút'},429,h);
    const len=+(req.headers.get('Content-Length')||0);
    if(len>200000)return J({error:'Dữ liệu quá lớn'},413,h);
    const b=await readJson(req);
    if(!b||typeof b.items!=='object'||!b.items||Array.isArray(b.items))return J({error:'Dữ liệu không hợp lệ'},400,h);
    const keys=Object.keys(b.items);
    if(keys.length>10)return J({error:'Quá nhiều mục'},413,h);
    // Kiểm tra hết trước khi ghi: một mục sai thì không ghi mục nào.
    for(const k of keys){
      if(!(k in HOSO_MAX))continue;
      const e=hosoCheck(k,b.items[k]);
      if(e==='avatar')return J({error:'Ảnh không hợp lệ'},400,h);
      if(e==='size')return J({error:k==='hn_dk_avatar'?'Ảnh quá lớn':'Dữ liệu quá lớn',key:k},413,h);
      if(e)return J({error:'Dữ liệu không hợp lệ',key:k},400,h);
    }
    if(Array.isArray(b.delete)){
      for(const k of b.delete.slice(0,10)){
        if(!(typeof k==='string'&&k in HOSO_MAX))continue;
        await env.DB.prepare('DELETE FROM user_hoso WHERE user_id=? AND pkey=?').bind(s.user_id,k).run();
      }
    }
    const t=now();const updated={};
    for(const k of keys){
      if(!(k in HOSO_MAX))continue;
      await env.DB.prepare('INSERT INTO user_hoso(user_id,pkey,value,updated_at) VALUES(?,?,?,?) ON CONFLICT(user_id,pkey) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at').bind(s.user_id,k,b.items[k],t).run();
      updated[k]=t;
    }
    return J({ok:true,updated},200,h);
  }
  return J({error:'Chỉ nhận GET, POST hoặc DELETE'},405,h);
}

// --- Đồng bộ tiến độ học theo tài khoản: GET/POST /progress ---
// Xác thực bằng ĐÚNG phiên đăng nhập hiện có (Bearer + sessionUser — phiên gắn
// thiết bị đã bị gỡ sẽ bị sessionUser vô hiệu, tiến độ cũng khoá theo).
// Chỉ nhận các khoá tiến độ trong danh sách cho phép; giá trị là chuỗi JSON do
// phía web gộp sẵn theo quy tắc từng khoá. Khoá/phiên/tuỳ chọn thiết bị KHÔNG
// bao giờ được nhận ở đây.
const PROG_EXACT=['hn_prog_v1','hn_srs_v1','hn_game_v1'];
const PROG_PREFIX=['hn_choukai_'];
function progKeyOk(k){
  if(typeof k!=='string'||k.length<3||k.length>80)return false;
  if(PROG_EXACT.includes(k))return true;
  return PROG_PREFIX.some(p=>k.startsWith(p)&&k.length>p.length);
}
async function handleProgress(req,env,c){
  if(!env.DB)return J({error:'Chưa cấu hình cơ sở dữ liệu tài khoản (D1).'},503,c.h);
  const s=await sessionUser(env,bearer(req));
  if(!s||s.kind!=='user')return J({error:'Chưa đăng nhập'},401,c.h);
  if(s.status==='locked'||s.status==='rejected')return J({error:'Tài khoản không còn hiệu lực'},403,c.h);
  await ensureDevices(env);
  if(req.method==='GET'){
    const r=await env.DB.prepare('SELECT pkey,value,updated_at FROM user_progress WHERE user_id=?').bind(s.user_id).all();
    const items={};
    for(const row of (r.results||[]))items[row.pkey]={v:row.value,u:row.updated_at};
    return J({ok:true,items,server_time:now()},200,c.h);
  }
  if(req.method==='POST'){
    const b=await readJson(req);
    if(!b||typeof b.items!=='object'||!b.items||Array.isArray(b.items))return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const keys=Object.keys(b.items);
    if(keys.length>250)return J({error:'Quá nhiều khoá tiến độ'},413,c.h);
    // Xoá có chủ đích phía web (vd nút "Xoá tiến độ"): xoá hàng của các khoá hợp lệ.
    if(Array.isArray(b.delete)){
      for(const k of b.delete.slice(0,250)){
        if(!progKeyOk(k))continue;
        await env.DB.prepare('DELETE FROM user_progress WHERE user_id=? AND pkey=?').bind(s.user_id,k).run();
      }
    }
    const t=now();const updated={};
    for(const k of keys){
      if(!progKeyOk(k))continue;
      const v=b.items[k];
      if(typeof v!=='string'||v.length>1048576)continue;
      await env.DB.prepare('INSERT INTO user_progress(user_id,pkey,value,updated_at) VALUES(?,?,?,?) ON CONFLICT(user_id,pkey) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at').bind(s.user_id,k,v,t).run();
      updated[k]=t;
    }
    return J({ok:true,updated},200,c.h);
  }
  return J({error:'Chỉ nhận GET hoặc POST'},405,c.h);
}

// --- Job tin tức hằng ngày: endpoint quản trị /job/* ---
// Xác thực bằng TOKEN DÙNG 1 LẦN lưu trong D1 — cùng khuôn với oauth_codes và
// password_resets (chỉ lưu HASH SHA-256, hạn 10 phút, dùng xong xoá). Job không
// giữ bí mật nào của site (không WEB_PASSWORD, không CONTENT_KEY_B64, không
// ADMIN_PASSWORD): agent chạy job đúc token qua Cloudflare API (D1) ngay trước
// mỗi lần gọi. Token rò ra cũng chỉ sống 10 phút và dùng được đúng 1 lần.
let _jtReady=false;
async function ensureJobTokens(env){
  if(_jtReady||!env.DB)return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS job_tokens (
    token_hash TEXT PRIMARY KEY,
    scope TEXT NOT NULL DEFAULT 'news',
    expires_at TEXT NOT NULL
  )`).run();
  _jtReady=true;
}
async function jobAuth(req,env){
  const t=bearer(req);
  if(!t||!env.DB)return false;
  await ensureJobTokens(env);
  const h=await sha256hex(t);
  const row=await env.DB.prepare('SELECT * FROM job_tokens WHERE token_hash=?').bind(h).first();
  if(row)await env.DB.prepare('DELETE FROM job_tokens WHERE token_hash=?').bind(h).run();
  await env.DB.prepare('DELETE FROM job_tokens WHERE expires_at < ?').bind(now()).run();
  return !!row&&row.expires_at>=now()&&row.scope==='news';
}
async function contentKey(env){
  if(!env.CONTENT_KEY_B64)return null;
  try{return await crypto.subtle.importKey('raw',ub64(env.CONTENT_KEY_B64),{name:'AES-GCM'},false,['encrypt','decrypt'])}catch(e){return null}
}
// Giải mã 1 gói đúng định dạng tools/encrypt.js: IV 12 byte || ciphertext || tag GCM 16 byte.
async function gcmDecrypt(env,buf){
  const key=await contentKey(env);if(!key)throw new Error('no-key');
  const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:buf.subarray(0,12)},key,buf.subarray(12));
  return new Uint8Array(pt);
}

// b64 cho payload lớn (bản tin có thể vài trăm KB) — bản b64() ở trên dùng spread, dễ tràn stack.
function b64big(buf){const a=buf instanceof Uint8Array?buf:new Uint8Array(buf);let s='';for(let i=0;i<a.length;i+=32768)s+=String.fromCharCode(...a.subarray(i,i+32768));return btoa(s)}
async function gzipBytes(data){return new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer())}
async function gunzipBytes(data){return new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer())}
// Mã hoá đúng định dạng tools/encrypt.js (fmt 2): gzip -> AES-256-GCM, IV 12 byte ngẫu nhiên ở đầu, tag 16 byte ở cuối.
async function gcmEncrypt(env,data){
  const key=await contentKey(env);if(!key)throw new Error('no-key');
  const iv=new Uint8Array(12);crypto.getRandomValues(iv);
  const ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,data));
  const out=new Uint8Array(12+ct.length);out.set(iv,0);out.set(ct,12);
  return out;
}

async function handleJob(req,env,c,path){
  if(req.method!=='POST')return J({error:'Chỉ nhận POST'},405,c.h);
  if(!env.CONTENT_KEY_B64)return J({error:'Chưa cấu hình CONTENT_KEY_B64'},503,c.h);
  if(!(await jobAuth(req,env)))return J({error:'Token job không hợp lệ, đã dùng hoặc đã hết hạn'},401,c.h);
  // Kiểm chứng khoá: giải blob "check" của enc/meta.json bằng CONTENT_KEY_B64.
  // GCM xác thực được + plaintext đúng "ok" => khoá Worker trùng khoá suy từ mật khẩu trang.
  if(path==='/job/keycheck'){
    const b=await readJson(req);if(!b||!b.check)return J({error:'Thiếu blob check của meta.json'},400,c.h);
    let txt=null;
    try{txt=new TextDecoder().decode(await gcmDecrypt(env,ub64(String(b.check))))}catch(e){}
    return J({ok:true,keyValid:txt==='ok'},200,c.h);
  }
// Mã hoá plaintext (JS/JSON do job soạn) -> gói .bin đúng định dạng site.
  if(path==='/job/encrypt'){
    const b=await readJson(req);if(!b||!b.plain)return J({error:'Thiếu plain (base64 của plaintext)'},400,c.h);
    let bin;
    try{bin=await gcmEncrypt(env,await gzipBytes(ub64(String(b.plain))))}catch(e){return J({error:'Mã hoá thất bại phía Worker'},500,c.h)}
    return J({ok:true,bin:b64big(bin)},200,c.h);
  }
  // Giải mã 1 gói .bin -> plaintext (phục vụ khôi phục nguồn tin từ gói live).
  if(path==='/job/decrypt'){
    const b=await readJson(req);if(!b||!b.bin)return J({error:'Thiếu bin (base64 của gói mã hoá)'},400,c.h);
    let plain;
    try{plain=await gunzipBytes(await gcmDecrypt(env,ub64(String(b.bin))))}catch(e){return J({error:'Giải mã thất bại (sai khoá hoặc gói hỏng)'},422,c.h)}
    return J({ok:true,plain:b64big(plain)},200,c.h);
  }
  return J({error:'Không tìm thấy API job'},404,c.h);
}

async function handleAI(req,env,c){
  if(req.method!=='POST')return J({error:'Chỉ nhận POST'},405,c.h);
  if(!c.ok)return J({error:'Không được phép (origin)'},403,c.h);
  // A5: so mã truy cập với giá trị tự suy ra từ CONTENT_KEY_B64 (không còn phụ thuộc secret ACCESS_TOKEN đặt tay).
  const aiExpect=await aiAccessExpected(env);
  if(!aiExpect||req.headers.get('X-Access')!==aiExpect)return J({error:'Mã truy cập AI không đúng – hãy mở khoá lại trang.'},401,c.h);
  const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
  const mode=SYS[b.mode]?b.mode:'hoi',text=String(b.text||'').slice(0,2000),ctx=String(b.ctx||'').slice(0,3000);
  if(!text.trim())return J({error:'Câu hỏi trống'},400,c.h);
  const LIM=+(env.DAILY_LIMIT||16);
  // A6: hạn mức đếm theo tài khoản (từ phiên Authorization: Bearer) nếu có; chưa đăng nhập thì rơi về IP. Lưu đếm dùng chung cơ chế A4 (KV RL nếu có, không thì D1).
  const aiDay=new Date().toISOString().slice(0,10);
  const aiSess=await sessionUser(env,bearer(req)).catch(()=>null);
  const aiKey=(aiSess&&aiSess.user_id)?'rl:'+aiDay+':u:'+aiSess.user_id:'rl:'+aiDay+':'+(req.headers.get('CF-Connecting-IP')||'x');
  if(await rlPeek(env,aiKey)>=LIM)return J({error:'Hôm nay đã dùng hết '+LIM+' câu hỏi AI.',aiLeft:0},429,c.h);
  // A6b (kiểm chứng 29/10): giới hạn tốc độ 5 câu/phút theo cùng chủ thể đếm như hạn mức ngày
  // (tài khoản khi có phiên, IP khi chưa đăng nhập) — trước đây chỉ có hạn mức 16/ngày nên
  // mô tả vận hành "16/ngày + 5/phút" không đúng hành vi thật. Bị chặn theo phút thì KHÔNG trừ hạn mức ngày.
  const aiMin=new Date().toISOString().slice(0,16);
  const aiMinKey=(aiSess&&aiSess.user_id)?'rl:'+aiMin+':u:'+aiSess.user_id:'rl:'+aiMin+':'+(req.headers.get('CF-Connecting-IP')||'x');
  if(await rlPeek(env,aiMinKey)>=5)return J({error:'Hỏi hơi nhanh — chờ một phút rồi hỏi tiếp nhé.',aiLeft:Math.max(0,LIM-(await rlPeek(env,aiKey)))},429,c.h);
  await rlHit(env,aiMinKey,aiDay);
  const aiLeft=Math.max(0,LIM-(await rlHit(env,aiKey,aiDay)));
  const model=env.GEMINI_MODEL||'gemini-3.5-flash';
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},
   body:JSON.stringify({systemInstruction:{parts:[{text:SYS[mode]}]},contents:[{role:'user',parts:[{text:(ctx?ctx+'\n\n':'')+(mode=='dich'?'Bản dịch của học viên: ':'')+text}]}],generationConfig:{temperature:0.4,maxOutputTokens:900}})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)return J({error:r.status==429?'AI đang quá tải (giới hạn gói miễn phí), thử lại sau.':'Lỗi AI ('+r.status+')'},502,c.h);
  const reply=((j.candidates||[])[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();
  return J({reply:reply||'(AI không trả lời được câu này)',aiLeft},200,c.h);
}


// ===== Cộng đồng + Chat riêng + Admin cộng đồng (29/10) =====
// Bảng MỚI (chỉ thêm, không sửa bảng cũ): profiles (hồ sơ học viên), files
// (siêu dữ liệu tệp — nội dung tệp CHIA MẢNH ngay trong D1 ở bảng
// file_chunks; cách 1 chốt 29/10, không dùng R2 nữa), file_chunks (các mảnh
// bytes của tệp),
// posts/post_files, comments, likes, notifications, reports (báo cáo vi phạm,
// gồm cả báo cáo chat kèm bản chụp các tin bị báo cáo), conversations/messages
// (chat riêng 1-1, kể cả luồng với Admin), blocks (chặn trong chat),
// broadcasts (nhật ký phát thanh của admin), chat_view_grants (quyền xem chat
// học viên của admin sau khi nhập lại mật khẩu admin — sống theo phiên admin,
// KHÔNG hết hạn theo thời gian; mất khi admin đăng xuất/đóng quyền hoặc phiên
// chết) và chat_access_log (nhật ký MỞ XEM chat phía admin — chỉ admin thấy).
// Xác thực: đúng phiên đăng nhập hiện có (sessionUser). Chỉ tài khoản status
// 'approved' mới dùng được; tài khoản bị khoá/từ chối bị chặn ở mọi endpoint.
// KHÔNG có bất kỳ chữ nào phía học viên nhắc tới việc admin xem được chat:
// nhật ký truy cập chỉ tồn tại trong trang quản trị.
let _cmReady=false;
// ===== CỘNG ĐỒNG v2 (30/10/2026, Phía B): phản ứng, nhóm cấp độ, lưu bài, chia sẻ, nhắc tên, bạn bè =====
// Gói Workers Free: tối đa 50 truy vấn D1 mỗi lần gọi -> mọi danh sách dùng truy vấn gom (IN ...) hoặc env.DB.batch (tính 1 truy vấn).
const CM_REACTS=['like','love','haha','wow','sad','strong'];
const CM_LEVELS=['N5','N4','N3','N2','N1'];
const CM_MSG_REACTS=['👍','❤️','😂','😮','😢','🙏'];
const CM_MENTION_MAX=10;
const CM_ONLINE_MS=120e3;
function cmQ(n){return Array(n).fill('?').join(',')}
function cmMinute(){return new Date().toISOString().slice(0,16)}
function cmDay(){return new Date().toISOString().slice(0,10)}
// Đếm + chặn theo khoá: trả true nếu VƯỢT giới hạn (đếm cả lần này).
async function cmLimit(env,kind,me,max,per){
  const slot=per==='day'?cmDay():per==='hour'?new Date().toISOString().slice(0,13):cmMinute();
  return (await rlHit(env,'cm2:'+kind+':'+slot+':'+me,slot))>max;
}
const CM_MIGRATE={
  likes:[['type',"TEXT NOT NULL DEFAULT 'like'"]],
  posts:[['level',"TEXT NOT NULL DEFAULT ''"]],
  profiles:[['region',"TEXT NOT NULL DEFAULT ''"],['discoverable','INTEGER NOT NULL DEFAULT 1'],['last_seen','TEXT'],['mention_policy',"TEXT NOT NULL DEFAULT 'all'"]],
  messages:[['reply_to','TEXT'],['kind',"TEXT NOT NULL DEFAULT 'text'"],['ref_id','TEXT']],
  notifications:[['conv_id','TEXT']],
  chat_view_grants:[['reason',"TEXT NOT NULL DEFAULT ''"]],
  chat_access_log:[['reason','TEXT'],['report_id','TEXT']]
};
const CM_V2_SQL=[
  `CREATE TABLE IF NOT EXISTS saved_posts (user_id TEXT NOT NULL, post_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT '', PRIMARY KEY(user_id,post_id))`,
  `CREATE TABLE IF NOT EXISTS message_reactions (message_id TEXT NOT NULL, user_id TEXT NOT NULL, emoji TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT '', PRIMARY KEY(message_id,user_id))`,
  `CREATE TABLE IF NOT EXISTS friendships (pair_key TEXT PRIMARY KEY, user_a TEXT NOT NULL, user_b TEXT NOT NULL, requester_id TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', message TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT '')`,
  `CREATE TABLE IF NOT EXISTS mentions (id TEXT PRIMARY KEY, source_kind TEXT NOT NULL, source_id TEXT NOT NULL, from_id TEXT NOT NULL, to_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT '')`,
  `CREATE TABLE IF NOT EXISTS conv_mutes (user_id TEXT NOT NULL, conv_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT '', PRIMARY KEY(user_id,conv_id))`,
  `CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_posts_level ON posts(level,created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id,created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conv_id,created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_messages_ref ON messages(ref_id)`,
  `CREATE INDEX IF NOT EXISTS idx_notif_user ON notifications(user_id,created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_friend_a ON friendships(user_a,status)`,
  `CREATE INDEX IF NOT EXISTS idx_friend_b ON friendships(user_b,status)`,
  `CREATE INDEX IF NOT EXISTS idx_mentions_to ON mentions(to_id,created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_mentions_src ON mentions(source_kind,source_id)`,
  `CREATE INDEX IF NOT EXISTS idx_profiles_disc ON profiles(discoverable,level)`,
  `CREATE INDEX IF NOT EXISTS idx_reports_target ON reports(target_type,target_id)`,
  `CREATE INDEX IF NOT EXISTS idx_conv_a ON conversations(user_a)`,
  `CREATE INDEX IF NOT EXISTS idx_conv_b ON conversations(user_b)`
];
async function cmMigrate(env){
  const tbls=Object.keys(CM_MIGRATE);
  const r=await env.DB.batch(tbls.map(t=>env.DB.prepare('SELECT name FROM pragma_table_info(?)').bind(t)));
  for(let i=0;i<tbls.length;i++){
    const have=new Set((r[i].results||[]).map(x=>x.name));
    for(const [col,def] of CM_MIGRATE[tbls[i]]){
      if(!have.has(col)){try{await env.DB.prepare('ALTER TABLE '+tbls[i]+' ADD COLUMN '+col+' '+def).run()}catch(e){}}
    }
  }
  await env.DB.batch(CM_V2_SQL.map(s=>env.DB.prepare(s)));
}
function cmAdminProfile(){return {id:'admin',name:'Quản trị viên',avatar_file:null,bio:'',level:'',goal:'',region:'',admin:true,official:true}}
// Hồ sơ gom: 1 truy vấn cho cả danh sách id.
async function cmProfiles(env,ids){
  const out={};const uniq=[...new Set(ids.filter(Boolean).map(String))];
  if(uniq.includes('admin'))out.admin=cmAdminProfile();
  const real=uniq.filter(x=>x!=='admin');
  for(let i=0;i<real.length;i+=90){
    const part=real.slice(i,i+90);
    const r=await env.DB.prepare('SELECT u.id,u.name,p.display_name,p.bio,p.level,p.goal,p.avatar_file,p.region FROM users u LEFT JOIN profiles p ON p.user_id=u.id WHERE u.id IN ('+cmQ(part.length)+')').bind(...part).all();
    for(const p of (r.results||[]))out[p.id]={id:p.id,name:(p.display_name&&p.display_name.trim())||p.name||'',avatar_file:p.avatar_file||null,bio:p.bio||'',level:p.level||'',goal:p.goal||'',region:p.region||''};
  }
  for(const id of real)if(!out[id])out[id]={id,name:'(đã xoá)',avatar_file:null,bio:'',level:'',goal:'',region:''};
  return out;
}
// Tập người bị chặn theo CẢ HAI chiều với me.
async function cmBlockSet(env,me){
  const r=await env.DB.prepare('SELECT blocked_id AS x FROM blocks WHERE user_id=? UNION SELECT user_id AS x FROM blocks WHERE blocked_id=?').bind(me,me).all();
  return new Set((r.results||[]).map(x=>x.x));
}
async function cmBlockedEither(env,a,b){
  if(a==='admin'||b==='admin')return false;
  const r=await env.DB.prepare('SELECT 1 AS x FROM blocks WHERE (user_id=? AND blocked_id=?) OR (user_id=? AND blocked_id=?) LIMIT 1').bind(a,b,b,a).first();
  return !!r;
}
function cmPair(a,b){const [x,y]=[String(a),String(b)].sort();return {key:x+'|'+y,a:x,b:y}}
async function cmFriendRow(env,a,b){return await env.DB.prepare('SELECT * FROM friendships WHERE pair_key=?').bind(cmPair(a,b).key).first()}
function cmFriendState(row,me){
  if(!row||row.status==='declined')return 'none';
  if(row.status==='accepted')return 'friends';
  return row.requester_id===me?'outgoing':'incoming';
}
// Chuỗi @[id] trong nội dung -> danh sách id hợp lệ (đã lọc chặn + quyền "ai được nhắc đến tôi").
const CM_MENTION_RE=/@\[([A-Za-z0-9_-]{1,64})\]/g;
function cmMentionIds(body){const s=new Set();let m;CM_MENTION_RE.lastIndex=0;while((m=CM_MENTION_RE.exec(body)))s.add(m[1]);return [...s]}
async function cmCheckMentions(env,me,body,allowOnly){
  const ids=cmMentionIds(body).filter(x=>x!==me&&x!=='admin');
  if(ids.length>CM_MENTION_MAX)return {err:'Mỗi nội dung chỉ được nhắc tối đa '+CM_MENTION_MAX+' người.'};
  if(!ids.length)return {body,ids:[]};
  const q=cmQ(ids.length);
  const [us,bl,fr]=await env.DB.batch([
    env.DB.prepare("SELECT u.id,u.name,u.status,p.display_name,COALESCE(p.mention_policy,'all') AS mp FROM users u LEFT JOIN profiles p ON p.user_id=u.id WHERE u.id IN ("+q+")").bind(...ids),
    env.DB.prepare('SELECT blocked_id AS x FROM blocks WHERE user_id=? AND blocked_id IN ('+q+') UNION SELECT user_id AS x FROM blocks WHERE blocked_id=? AND user_id IN ('+q+')').bind(me,...ids,me,...ids),
    env.DB.prepare("SELECT CASE WHEN user_a=? THEN user_b ELSE user_a END AS x FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?)").bind(me,me,me)
  ]);
  const blocked=new Set((bl.results||[]).map(x=>x.x)),friends=new Set((fr.results||[]).map(x=>x.x));
  const info={};for(const u of (us.results||[]))info[u.id]=u;
  const ok=[];
  for(const id of ids){
    const u=info[id];
    const good=u&&u.status==='approved'&&!blocked.has(id)&&(allowOnly?allowOnly.includes(id):true)&&(u.mp==='all'||(u.mp==='friends'&&friends.has(id)));
    if(good)ok.push(id);
  }
  // Nhắc không hợp lệ -> đổi về chữ thường "@Tên" (không thành liên kết, không gửi thông báo).
  const out=body.replace(CM_MENTION_RE,(all,id)=>ok.includes(id)?all:('@'+((info[id]&&((info[id].display_name||'').trim()||info[id].name))||'người dùng')));
  return {body:out,ids:ok};
}
async function cmSaveMentions(env,me,ids,kind,sourceId,notif){
  if(!ids.length)return;
  const t=now();const st=[];
  for(const to of ids){
    st.push(env.DB.prepare('INSERT INTO mentions(id,source_kind,source_id,from_id,to_id,created_at) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),kind,sourceId,me,to,t));
    st.push(env.DB.prepare('INSERT INTO notifications(id,user_id,actor_id,type,post_id,comment_id,conv_id,created_at) VALUES(?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(),to,me,'mention_'+kind,notif.post_id||null,notif.comment_id||null,notif.conv_id||null,t));
  }
  await env.DB.batch(st);
}
function cmMentionMap(body,profs){const m={};for(const id of cmMentionIds(body||''))if(profs[id])m[id]=profs[id].name;return m}
// Bài viết gom: ~2 truy vấn cho cả trang (1 batch + 1 hồ sơ).
async function cmShapePosts(env,rows,me){
  if(!rows.length)return [];
  const ids=rows.map(r=>r.id),q=cmQ(ids.length);
  const res=await env.DB.batch([
    env.DB.prepare('SELECT pf.post_id,f.id,f.purpose,f.kind,f.name,f.mime,f.size FROM post_files pf JOIN files f ON f.id=pf.file_id WHERE pf.post_id IN ('+q+') AND f.deleted=0 ORDER BY pf.ord').bind(...ids),
    env.DB.prepare('SELECT post_id,COUNT(*) AS n FROM comments WHERE post_id IN ('+q+') AND deleted=0 AND hidden=0 GROUP BY post_id').bind(...ids),
    env.DB.prepare("SELECT target_id,COALESCE(type,'like') AS t,COUNT(*) AS n FROM likes WHERE target_type='post' AND target_id IN ("+q+") GROUP BY target_id,t").bind(...ids),
    env.DB.prepare("SELECT target_id,COALESCE(type,'like') AS t FROM likes WHERE target_type='post' AND user_id=? AND target_id IN ("+q+")").bind(me||'',...ids),
    env.DB.prepare('SELECT post_id FROM saved_posts WHERE user_id=? AND post_id IN ('+q+')').bind(me||'',...ids),
    env.DB.prepare("SELECT ref_id,COUNT(*) AS n FROM messages WHERE kind='post' AND ref_id IN ("+q+") GROUP BY ref_id").bind(...ids)
  ]);
  const [rf,rc,rr,rm,rs,rsh]=res.map(x=>x.results||[]);
  const authorIds=rows.map(r=>r.author_id);
  for(const r of rows)authorIds.push(...cmMentionIds(r.body||''));
  const profs=await cmProfiles(env,authorIds);
  return rows.map(row=>{
    const reactions={};let total=0;
    for(const x of rr)if(x.target_id===row.id){reactions[x.t]=x.n;total+=x.n}
    const my=rm.find(x=>x.target_id===row.id);
    const cc=rc.find(x=>x.post_id===row.id),sh=rsh.find(x=>x.ref_id===row.id);
    return {id:row.id,author:profs[row.author_id],body:row.body,mentions:cmMentionMap(row.body,profs),level:row.level||'',pinned:!!row.pinned,hidden:!!row.hidden,created_at:row.created_at,
      files:rf.filter(f=>f.post_id===row.id).map(f=>({id:f.id,purpose:f.purpose,kind:f.kind,name:f.name,mime:f.mime,size:f.size})),
      like_count:total,reactions,my_reaction:my?my.t:null,liked:!!my,comment_count:cc?cc.n:0,share_count:sh?sh.n:0,saved:rs.some(x=>x.post_id===row.id),mine:row.author_id===me};
  });
}
async function cmShapeComments(env,rows,me){
  if(!rows.length)return [];
  const ids=rows.map(r=>r.id),q=cmQ(ids.length);
  const all=[];
  for(let i=0;i<ids.length;i+=90){
    const part=ids.slice(i,i+90),pq=cmQ(part.length);
    const res=await env.DB.batch([
      env.DB.prepare("SELECT target_id,COALESCE(type,'like') AS t,COUNT(*) AS n FROM likes WHERE target_type='comment' AND target_id IN ("+pq+") GROUP BY target_id,t").bind(...part),
      env.DB.prepare("SELECT target_id,COALESCE(type,'like') AS t FROM likes WHERE target_type='comment' AND user_id=? AND target_id IN ("+pq+")").bind(me||'',...part)
    ]);
    all.push(res);
  }
  const rr=[],rm=[];for(const res of all){rr.push(...(res[0].results||[]));rm.push(...(res[1].results||[]))}
  const pids=rows.map(r=>r.author_id);for(const r of rows)pids.push(...cmMentionIds(r.body||''));
  const profs=await cmProfiles(env,pids);
  return rows.map(row=>{
    const reactions={};let total=0;for(const x of rr)if(x.target_id===row.id){reactions[x.t]=x.n;total+=x.n}
    const my=rm.find(x=>x.target_id===row.id);
    const body=row.deleted?'':row.body;
    return {id:row.id,post_id:row.post_id,author:profs[row.author_id],parent_id:row.parent_id||null,body,mentions:cmMentionMap(body,profs),deleted:!!row.deleted,hidden:!!row.hidden,created_at:row.created_at,like_count:total,reactions,my_reaction:my?my.t:null,liked:!!my,mine:row.author_id===me};
  });
}

async function ensureCommunity(env){
  if(_cmReady||!env.DB)return;
  const sqls=[
  `CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL DEFAULT '',
    bio TEXT NOT NULL DEFAULT '',
    level TEXT NOT NULL DEFAULT '',
    goal TEXT NOT NULL DEFAULT '',
    avatar_file TEXT,
    updated_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL,
    purpose TEXT NOT NULL DEFAULT 'post',
    kind TEXT NOT NULL DEFAULT 'image',
    name TEXT NOT NULL DEFAULT '',
    mime TEXT NOT NULL DEFAULT '',
    size INTEGER NOT NULL DEFAULT 0,
    r2_key TEXT NOT NULL DEFAULT '',
    deleted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS file_chunks (
    file_id TEXT NOT NULL,
    seq INTEGER NOT NULL,
    data BLOB NOT NULL,
    PRIMARY KEY(file_id, seq)
  )`,
  `CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    pinned INTEGER NOT NULL DEFAULT 0,
    hidden INTEGER NOT NULL DEFAULT 0,
    deleted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS post_files (
    post_id TEXT NOT NULL,
    file_id TEXT NOT NULL,
    ord INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(post_id, file_id)
  )`,
  `CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    author_id TEXT NOT NULL,
    parent_id TEXT,
    body TEXT NOT NULL DEFAULT '',
    hidden INTEGER NOT NULL DEFAULT 0,
    deleted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS likes (
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT '',
    PRIMARY KEY(target_type, target_id, user_id)
  )`,
  `CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    actor_id TEXT NOT NULL,
    type TEXT NOT NULL,
    post_id TEXT,
    comment_id TEXT,
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    reporter_id TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    conv_id TEXT,
    message_ids TEXT,
    snapshot TEXT,
    reason TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL DEFAULT '',
    handled_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    pair_key TEXT NOT NULL UNIQUE,
    user_a TEXT NOT NULL,
    user_b TEXT NOT NULL,
    is_admin INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT '',
    last_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conv_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    file_id TEXT,
    deleted INTEGER NOT NULL DEFAULT 0,
    read_at TEXT,
    created_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS blocks (
    user_id TEXT NOT NULL,
    blocked_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT '',
    PRIMARY KEY(user_id, blocked_id)
  )`,
  `CREATE TABLE IF NOT EXISTS broadcasts (
    id TEXT PRIMARY KEY,
    body TEXT NOT NULL DEFAULT '',
    file_id TEXT,
    recipient_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS chat_view_grants (
    token TEXT PRIMARY KEY,
    granted_at TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS chat_access_log (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL DEFAULT 'open',
    conv_id TEXT,
    user_a TEXT,
    user_b TEXT,
    opened_at TEXT NOT NULL DEFAULT ''
  )`];
  await env.DB.batch(sqls.map(q=>env.DB.prepare(q)));
  await cmMigrate(env);
  _cmReady=true;
}

// --- cổng phiên cho cộng đồng/chat ---
async function cmSession(env,req){
  const s=await sessionUser(env,bearer(req));
  if(!s)return {err:J({error:'Chưa đăng nhập'},401,cmC.h)};
  return {s};
}
let cmC={h:{}}; // cors context được gán trong handleCommunity
function cmNeedUser(s){
  if(!s||s.kind!=='user')return J({error:'Cần đăng nhập tài khoản học viên'},401,cmC.h);
  if(s.status==='locked')return J({error:'Tài khoản đã bị khoá'},403,cmC.h);
  if(s.status==='rejected')return J({error:'Tài khoản đã bị từ chối'},403,cmC.h);
  if(s.status!=='approved')return J({error:'Tài khoản chưa được duyệt'},403,cmC.h);
  return null;
}
function cmNeedAdmin(s){
  if(!s||s.kind!=='admin')return J({error:'Cần đăng nhập admin'},401,cmC.h);
  return null;
}
async function cmProfile(env,uid){
  if(uid==='admin')return cmAdminProfile();
  const p=await env.DB.prepare('SELECT p.display_name,p.bio,p.level,p.goal,p.avatar_file,u.name FROM profiles p RIGHT JOIN users u ON u.id=p.user_id WHERE u.id=?').bind(uid).first()
    || await env.DB.prepare('SELECT NULL AS display_name,NULL AS bio,NULL AS level,NULL AS goal,NULL AS avatar_file,name FROM users WHERE id=?').bind(uid).first();
  if(!p)return {id:uid,name:'(đã xoá)',avatar_file:null,bio:'',level:'',goal:''};
  return {id:uid,name:(p.display_name&&p.display_name.trim())||p.name||'',avatar_file:p.avatar_file||null,bio:p.bio||'',level:p.level||'',goal:p.goal||''};
}
async function cmNotify(env,recipient,actor,type,postId,commentId){
  if(!recipient||recipient===actor||recipient==='admin')return;
  try{
    await env.DB.prepare('INSERT INTO notifications(id,user_id,actor_id,type,post_id,comment_id,created_at) VALUES(?,?,?,?,?,?,?)')
      .bind(crypto.randomUUID(),recipient,actor,type,postId||null,commentId||null,now()).run();
  }catch(e){}
}
async function cmPostFiles(env,postId){
  const r=await env.DB.prepare('SELECT f.id,f.purpose,f.kind,f.name,f.mime,f.size FROM post_files pf JOIN files f ON f.id=pf.file_id WHERE pf.post_id=? AND f.deleted=0 ORDER BY pf.ord').bind(postId).all();
  return r.results||[];
}
async function cmPostShape(env,row,me){
  const files=await cmPostFiles(env,row.id);
  const cc=await env.DB.prepare('SELECT COUNT(*) AS n FROM comments WHERE post_id=? AND deleted=0 AND hidden=0').bind(row.id).first();
  const lc=await env.DB.prepare("SELECT COUNT(*) AS n FROM likes WHERE target_type='post' AND target_id=?").bind(row.id).first();
  let liked=false;
  if(me){const l=await env.DB.prepare("SELECT 1 AS x FROM likes WHERE target_type='post' AND target_id=? AND user_id=?").bind(row.id,me).first();liked=!!l}
  return {id:row.id,author:await cmProfile(env,row.author_id),body:row.body,pinned:!!row.pinned,hidden:!!row.hidden,created_at:row.created_at,files,like_count:lc?lc.n:0,comment_count:cc?cc.n:0,liked,mine:row.author_id===me};
}
async function cmCommentShape(env,row,me){
  const lc=await env.DB.prepare("SELECT COUNT(*) AS n FROM likes WHERE target_type='comment' AND target_id=?").bind(row.id).first();
  let liked=false;
  if(me){const l=await env.DB.prepare("SELECT 1 AS x FROM likes WHERE target_type='comment' AND target_id=? AND user_id=?").bind(row.id,me).first();liked=!!l}
  return {id:row.id,post_id:row.post_id,author:await cmProfile(env,row.author_id),parent_id:row.parent_id||null,body:row.deleted?'':row.body,deleted:!!row.deleted,hidden:!!row.hidden,created_at:row.created_at,like_count:lc?lc.n:0,liked,mine:row.author_id===me};
}

// --- Tin nhắn gom (chat giai đoạn 2, đặc tả audit mục 4b) ---
// Đặt ngay sau cmCommentShape. Nạp GỘP cho cả trang tin (tối đa 100): tin được
// trả lời (cùng bảng messages, theo reply_to), cảm xúc (message_reactions
// GROUP BY + của me), hồ sơ người được nhắc, thẻ bài cho kind='post' (dùng
// cmShapePosts; bài đã xoá/ẩn -> post=null). Mỗi tin trả đúng các trường:
// {id, conv_id, sender_id, mine, body ('' nếu deleted), deleted, file, file_id,
//  reply_to, reply_preview, kind, ref_id, post, mentions, reactions, read_at,
//  created_at} — reactions dạng {<type>:{count, mine}}.
async function cmShapeMessages(env,rows,me){
  if(!rows.length)return [];
  const ids=rows.map(r=>r.id);
  const reactMap={},myMap={};
  for(let i=0;i<ids.length;i+=90){
    const part=ids.slice(i,i+90),pq=cmQ(part.length);
    const res=await env.DB.batch([
      env.DB.prepare('SELECT message_id,emoji AS t,COUNT(*) AS n FROM message_reactions WHERE message_id IN ('+pq+') GROUP BY message_id,emoji').bind(...part),
      env.DB.prepare('SELECT message_id,emoji AS t FROM message_reactions WHERE user_id=? AND message_id IN ('+pq+')').bind(me||'',...part)
    ]);
    for(const x of (res[0].results||[])){(reactMap[x.message_id]=reactMap[x.message_id]||{})[x.t]=x.n}
    for(const x of (res[1].results||[]))myMap[x.message_id]=x.t;
  }
  const fileIds=[...new Set(rows.map(r=>r.file_id).filter(Boolean))];
  const files={};
  for(let i=0;i<fileIds.length;i+=90){
    const part=fileIds.slice(i,i+90);
    const r=await env.DB.prepare('SELECT id,purpose,kind,name,mime,size FROM files WHERE id IN ('+cmQ(part.length)+') AND deleted=0').bind(...part).all();
    for(const f of (r.results||[]))files[f.id]=f;
  }
  const replyIds=[...new Set(rows.map(r=>r.reply_to).filter(Boolean))];
  const replies={};
  for(let i=0;i<replyIds.length;i+=90){
    const part=replyIds.slice(i,i+90);
    const r=await env.DB.prepare('SELECT * FROM messages WHERE id IN ('+cmQ(part.length)+')').bind(...part).all();
    for(const m of (r.results||[]))replies[m.id]=m;
  }
  const postIds=[...new Set(rows.filter(r=>(r.kind||'text')==='post'&&r.ref_id).map(r=>r.ref_id))];
  const postRows=[];
  for(let i=0;i<postIds.length;i+=90){
    const part=postIds.slice(i,i+90);
    const r=await env.DB.prepare('SELECT * FROM posts WHERE id IN ('+cmQ(part.length)+')').bind(...part).all();
    postRows.push(...(r.results||[]));
  }
  const visiblePosts=postRows.filter(p=>!p.deleted&&!p.hidden);
  const shapedPosts=await cmShapePosts(env,visiblePosts,me);
  const posts={};
  visiblePosts.forEach((p,i)=>{const s=shapedPosts[i];posts[p.id]={id:s.id,author:s.author,body:s.body,level:s.level,created_at:s.created_at,files:s.files}});
  const mentionProbe=[];
  for(const r of rows)if(!r.deleted)mentionProbe.push(...cmMentionIds(r.body||''));
  const profs=await cmProfiles(env,mentionProbe);
  return rows.map(row=>{
    const kind=row.kind||'text';
    const body=row.deleted?'':(row.body||'');
    const rp=row.reply_to?replies[row.reply_to]:null;
    const reactions={};
    const counts=reactMap[row.id]||{};
    for(const t in counts)reactions[t]={count:counts[t],mine:myMap[row.id]===t};
    return {id:row.id,conv_id:row.conv_id,sender_id:row.sender_id,mine:row.sender_id===me,body,deleted:!!row.deleted,
      file:row.file_id?(files[row.file_id]||null):null,file_id:row.file_id||null,
      reply_to:row.reply_to||null,
      reply_preview:rp?{id:rp.id,sender_id:rp.sender_id,body:rp.deleted?'':(String(rp.body||'').slice(0,120)||(rp.file_id?'📎 Tệp đính kèm':'')),deleted:!!rp.deleted,has_file:!!rp.file_id}:null,
      kind,ref_id:row.ref_id||null,
      post:!row.deleted&&kind==='post'&&row.ref_id?(posts[row.ref_id]||null):null,
      mentions:cmMentionMap(body,profs),reactions,
      read_at:row.read_at||null,created_at:row.created_at};
  });
}
// --- chữ ký tải tệp: HMAC-SHA256(id:hết_hạn) suy từ CONTENT_KEY_B64 (không thêm secret) ---
async function cmFileKey(env){
  const dig=await crypto.subtle.digest('SHA-256',te.encode('hn-file:'+(env.CONTENT_KEY_B64||'')));
  return crypto.subtle.importKey('raw',dig,{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);
}
async function cmFileSig(env,id,exp){
  const k=await cmFileKey(env);
  const sig=await crypto.subtle.sign('HMAC',k,te.encode(id+':'+exp));
  return b64url(sig);
}
async function cmFileSigOk(env,id,exp,sig){
  if(!exp||!sig||+exp<Date.now())return false;
  try{
    const k=await cmFileKey(env);
    return await crypto.subtle.verify('HMAC',k,ub64(String(sig).replace(/-/g,'+').replace(/_/g,'/')),te.encode(id+':'+exp));
  }catch(e){return false}
}
// Quyền xem 1 tệp: chủ tệp, admin, tệp đính bài đang hiện, avatar công khai trong cộng đồng, hoặc thành viên cuộc trò chuyện chứa tệp.
async function cmFileAccess(env,s,file){
  if(!file||file.deleted)return false;
  if(s&&s.kind==='admin')return true;
  const me=s?s.user_id:null;
  if(!me)return false;
  if(file.owner_id===me)return true;
  const pf=await env.DB.prepare('SELECT p.hidden,p.deleted FROM post_files pf JOIN posts p ON p.id=pf.post_id WHERE pf.file_id=?').bind(file.id).first();
  if(pf&&!pf.hidden&&!pf.deleted)return true;
  const pr=await env.DB.prepare('SELECT user_id FROM profiles WHERE avatar_file=?').bind(file.id).first();
  if(pr)return true;
  const mg=await env.DB.prepare('SELECT c.user_a,c.user_b FROM messages m JOIN conversations c ON c.id=m.conv_id WHERE m.file_id=?').bind(file.id).first();
  if(mg&&(mg.user_a===me||mg.user_b===me))return true;
  return false;
}

const CM_IMG_MIME=['image/jpeg','image/png','image/webp'];
const CM_DOC_MIME=['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','text/plain','application/zip','application/x-zip-compressed'];
const CM_DOC_EXT=['.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx','.txt','.zip'];

// --- Lưu trữ tệp trong D1 (cách 1, chốt 29/10 — thay R2) ---
// Nội dung tệp chia mảnh vào bảng file_chunks, mỗi mảnh 1.5MB: đã đo thật
// qua Worker probe trên chính binding của tài khoản này — ghi/đọc nguyên vẹn
// ở 500K/1M/1.5M/1.9M/2M byte (tài liệu Cloudflare ghi trần BLOB/dòng 2MB
// nên 1.5MB còn biên an toàn). Khi đọc, binding trả BLOB dạng Array số (tuỳ
// runtime có thể là ArrayBuffer/Uint8Array) — cmBlobBytes chuẩn hoá mọi dạng.
// CHẶN RỦI RO: DB này đồng thời chứa tài khoản/phiên/tiến độ của toàn site.
// Trần DB gói Free là 500MB; dữ liệu chính hiện ~0.3MB. TỔNG HẠN MỨC AN
// TOÀN cho riêng phần tệp = 200MB (chừa >290MB cho dữ liệu chính): chạm mức
// thì từ chối tải lên bằng thông báo rõ ràng, không để tệp làm đầy DB chính.
const CM_STORAGE_ON=true;
const CM_CHUNK=1500000;
const CM_FILE_CAP=200*1024*1024; // (trần cũ khi lưu D1 — giữ để tham chiếu)
// 29/10 (Phía B, theo lệnh chủ trang): chuyển lớp lưu trữ sang R2 (binding FILES,
// bucket riêng tư hoc-tieng-nhat-files). Tệp cũ 'd1://' vẫn đọc qua file_chunks.
// Phanh chi phí: trần toàn trang 9GB (gói R2 miễn phí 10GB) + tối đa 50 lần
// tải lên/ngày/tài khoản (giữ xa hạn mức thao tác miễn phí của R2).
const CM_R2_CAP=9*1024*1024*1024;
const CM_DAILY_UPLOADS=50;
function cmBlobBytes(d){
  if(!d)return new Uint8Array(0);
  if(d instanceof Uint8Array)return d;
  if(d instanceof ArrayBuffer)return new Uint8Array(d);
  if(Array.isArray(d))return Uint8Array.from(d);
  if(ArrayBuffer.isView(d))return new Uint8Array(d.buffer,d.byteOffset,d.byteLength);
  return new Uint8Array(0);
}
async function cmReadFileBytes(env,id){
  const r=await env.DB.prepare('SELECT data FROM file_chunks WHERE file_id=? ORDER BY seq ASC').bind(id).all();
  const rows=(r&&r.results)||[];
  if(!rows.length)return null;
  let total=0;const parts=rows.map(row=>{const b=cmBlobBytes(row.data);total+=b.length;return b});
  const out=new Uint8Array(total);let off=0;
  for(const b of parts){out.set(b,off);off+=b.length}
  return out;
}

async function handleCommunity(req,env,c,path){
  cmC=c;
  if(!env.DB)return J({error:'Chưa cấu hình cơ sở dữ liệu (D1).'},503,c.h);
  await ensureCommunity(env);
  const url=new URL(req.url);
  const method=req.method;

  // ===== TỆP: tải xuống qua chữ ký tạm hoặc phiên (không cần qua cổng approved để avatar/ảnh bài hiển thị được cho chính chủ) =====
  if(path.startsWith('/community/file/')&&method==='GET'){
    const id=decodeURIComponent(path.slice('/community/file/'.length));
    const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(id).first();
    if(!f||f.deleted)return J({error:'Không tìm thấy tệp'},404,c.h);
    let ok=false;
    const exp=url.searchParams.get('e'),sig=url.searchParams.get('t');
    if(sig)ok=await cmFileSigOk(env,id,exp,sig);
    if(!ok){
      const s=await sessionUser(env,bearer(req));
      if(s&&(s.kind==='admin'||s.kind==='user'))ok=await cmFileAccess(env,s,f);
    }
    if(!ok)return J({error:'Không có quyền xem tệp này'},403,c.h);
    let bytes=null,len=0;
    if(String(f.r2_key||'').startsWith('f/')&&env.FILES){
      const obj=await env.FILES.get(f.r2_key);
      if(obj){bytes=obj.body;len=obj.size}
    }else{
      const b=await cmReadFileBytes(env,f.id); // tệp cũ lưu trong D1 (d1://)
      if(b){bytes=b;len=b.length}
    }
    if(!bytes)return J({error:'Tệp không còn trên kho lưu trữ'},404,c.h);
    // Nội dung một tệp không bao giờ đổi (id mới cho mỗi lần tải lên) nên trình
    // duyệt được giữ bản đã xem trong 1 giờ (bằng hạn của liên kết ký), không đọc lại R2.
    const h={'Content-Type':f.mime,'X-Content-Type-Options':'nosniff','Cache-Control':'private, max-age=3600, immutable','Content-Length':String(len)};
    if(f.kind==='image')h['Content-Disposition']='inline';
    else h['Content-Disposition']="attachment; filename*=UTF-8''"+encodeURIComponent(f.name||'tep');
    return new Response(bytes,{status:200,headers:h});
  }

  const isAdminPath=path.includes('/admin/');
  const {s,err}=await cmSession(env,req);
  if(err)return err;
  const gate=isAdminPath?cmNeedAdmin(s):cmNeedUser(s);
  if(gate)return gate;
  const me=s.user_id;

  // ===== v2 (Phía B, 30/10/2026): các handler dưới đây THAY bản cũ cùng đường dẫn (bản cũ phía dưới giữ làm dự phòng, không còn chạy tới) =====
  if(path==='/community/heartbeat'&&method==='POST'){
    // Online = last_seen trong 2 phút. Ghi tối đa 1 lần/60 giây.
    const p=await env.DB.prepare('SELECT last_seen FROM profiles WHERE user_id=?').bind(me).first();
    if(!p)await env.DB.prepare("INSERT OR IGNORE INTO profiles(user_id,display_name,updated_at,last_seen) VALUES(?,'',?,?)").bind(me,now(),now()).run();
    else if(!p.last_seen||Date.now()-Date.parse(p.last_seen)>60e3)await env.DB.prepare('UPDATE profiles SET last_seen=? WHERE user_id=?').bind(now(),me).run();
    const uc=await env.DB.prepare("SELECT (SELECT COUNT(*) FROM notifications WHERE user_id=? AND is_read=0) AS n,(SELECT COUNT(*) FROM friendships WHERE status='pending' AND requester_id<>? AND (user_a=? OR user_b=?)) AS f").bind(me,me,me,me).first();
    return J({ok:true,notifications:uc?uc.n:0,friend_requests:uc?uc.f:0},200,c.h);
  }
  if(path==='/community/profile'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const cur=await env.DB.prepare('SELECT * FROM profiles WHERE user_id=?').bind(me).first()||{};
    const pick=(k,max,def)=>b[k]===undefined?(cur[k]===undefined||cur[k]===null?def:cur[k]):String(b[k]||'').trim().slice(0,max);
    const display_name=pick('display_name',60,''),bio=pick('bio',300,''),goal=pick('goal',120,'');
    let level=pick('level',20,'');
    const region=pick('region',40,'');
    const discoverable=b.discoverable===undefined?(cur.discoverable===undefined||cur.discoverable===null?1:cur.discoverable):(b.discoverable?1:0);
    let mp=b.mention_policy===undefined?(cur.mention_policy||'all'):String(b.mention_policy);
    if(!['all','friends','none'].includes(mp))return J({error:'Lựa chọn "Ai được nhắc đến tôi" không hợp lệ'},400,c.h);
    let avatar=cur.avatar_file===undefined?null:cur.avatar_file;
    if(b.avatar_file){avatar=String(b.avatar_file);
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(avatar).first();
      if(!f||f.deleted||f.owner_id!==me||f.kind!=='image'||f.purpose!=='avatar')return J({error:'Ảnh đại diện không hợp lệ'},400,c.h);
    }
    if(b.avatar_clear)avatar=null;
    await env.DB.prepare('INSERT INTO profiles(user_id,display_name,bio,level,goal,avatar_file,region,discoverable,mention_policy,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET display_name=excluded.display_name,bio=excluded.bio,level=excluded.level,goal=excluded.goal,avatar_file=excluded.avatar_file,region=excluded.region,discoverable=excluded.discoverable,mention_policy=excluded.mention_policy,updated_at=excluded.updated_at')
      .bind(me,display_name,bio,level,goal,avatar,region,discoverable,mp,now()).run();
    const prof=await cmProfile(env,me);
    return J({ok:true,profile:Object.assign(prof,{region,discoverable:!!discoverable,mention_policy:mp})},200,c.h);
  }
  if(path==='/community/profile'&&method==='GET'){
    const uid=url.searchParams.get('user_id')||me;
    if(uid!==me&&await cmBlockedEither(env,me,uid))return J({error:'Không xem được hồ sơ này'},403,c.h);
    const r=await env.DB.prepare('SELECT * FROM posts WHERE author_id=? AND deleted=0 AND hidden=0 ORDER BY created_at DESC LIMIT 30').bind(uid).all();
    const prof=(await cmProfiles(env,[uid]))[uid];
    if(uid===me){const x=await env.DB.prepare('SELECT discoverable,mention_policy FROM profiles WHERE user_id=?').bind(me).first();prof.discoverable=x?!!x.discoverable:true;prof.mention_policy=x?x.mention_policy||'all':'all'}
    return J({ok:true,profile:prof,posts:await cmShapePosts(env,r.results||[],me),storage_enabled:CM_STORAGE_ON},200,c.h);
  }
  if(path==='/community/user'&&method==='GET'){
    const uid=url.searchParams.get('user_id')||'';
    if(!uid)return J({error:'Thiếu user_id'},400,c.h);
    if(uid==='admin')return J({ok:true,profile:cmAdminProfile(),stats:null,friend:'none',online:false},200,c.h);
    const u=await env.DB.prepare('SELECT id,status FROM users WHERE id=?').bind(uid).first();
    if(!u)return J({error:'Không tìm thấy học viên'},404,c.h);
    const blocked=uid!==me&&await cmBlockedEither(env,me,uid);
    const iBlocked=blocked?!!(await env.DB.prepare('SELECT 1 AS x FROM blocks WHERE user_id=? AND blocked_id=?').bind(me,uid).first()):false;
    if(blocked&&!iBlocked)return J({error:'Không xem được hồ sơ này'},403,c.h);
    await ensureStats(env);
    const [a,b2,cnt,pg,bg,fr,mu]=await env.DB.batch([
      env.DB.prepare('SELECT last_seen FROM profiles WHERE user_id=?').bind(uid),
      env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE author_id=? AND deleted=0 AND hidden=0').bind(uid),
      env.DB.prepare("SELECT COUNT(*) AS n FROM likes l JOIN posts p ON p.id=l.target_id WHERE l.target_type='post' AND p.author_id=?").bind(uid),
      env.DB.prepare('SELECT pkey,value,updated_at FROM user_progress WHERE user_id=?').bind(uid),
      env.DB.prepare('SELECT COUNT(*) AS n FROM badge_grants WHERE user_id=?').bind(uid),
      env.DB.prepare("SELECT COUNT(*) AS n FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?)").bind(uid,uid),
      env.DB.prepare("SELECT COUNT(*) AS n FROM (SELECT CASE WHEN user_a=? THEN user_b ELSE user_a END AS x FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?)) f1 JOIN (SELECT CASE WHEN user_a=? THEN user_b ELSE user_a END AS x FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?)) f2 ON f1.x=f2.x").bind(uid,uid,uid,me,me,me)
    ]);
    const prog={};for(const r of (pg.results||[]))prog[r.pkey]={value:r.value,updated_at:r.updated_at};
    let st={};try{st=stCompute(prog)}catch(e){}
    const ls=a.results&&a.results[0]?a.results[0].last_seen:null;
    const frow=uid===me?null:await cmFriendRow(env,me,uid);
    return J({ok:true,profile:(await cmProfiles(env,[uid]))[uid],
      stats:{post_count:b2.results[0].n,reactions_received:cnt.results[0].n,streak:st.streakCur||0,xp_total:st.xpTotal||0,badge_count:bg.results[0].n,friend_count:fr.results[0].n,mutual_friends:uid===me?0:mu.results[0].n},
      friend:uid===me?'self':cmFriendState(frow,me),online:!blocked&&!!ls&&Date.now()-Date.parse(ls)<CM_ONLINE_MS,last_seen:blocked?null:ls,blocked_by_me:iBlocked},200,c.h);
  }
  if(path==='/community/feed'&&method==='GET'){
    const before=url.searchParams.get('before')||'';
    const limit=Math.min(30,Math.max(1,+(url.searchParams.get('limit')||20)));
    const lvRaw=String(url.searchParams.get('level')||'').toUpperCase();
    const level=CM_LEVELS.includes(lvRaw)?lvRaw:'';
    const sort=url.searchParams.get('sort')==='hot'?'hot':'new';
    const offset=Math.max(0,Math.min(300,+(url.searchParams.get('offset')||0)));
    const blk=[...(await cmBlockSet(env,me))].slice(0,80);
    let where='p.deleted=0 AND p.hidden=0';const binds=[];
    if(level){where+=' AND p.level=?';binds.push(level)}
    if(blk.length){where+=' AND p.author_id NOT IN ('+cmQ(blk.length)+')';binds.push(...blk)}
    let rows;
    if(sort==='hot'){
      const since=new Date(Date.now()-7*864e5).toISOString();
      const r=await env.DB.prepare("SELECT p.*, ((SELECT COUNT(*) FROM likes l WHERE l.target_type='post' AND l.target_id=p.id)+2*(SELECT COUNT(*) FROM comments c WHERE c.post_id=p.id AND c.deleted=0 AND c.hidden=0)+1.0)/(((julianday('now')-julianday(p.created_at))*24+2)*((julianday('now')-julianday(p.created_at))*24+2)) AS score FROM posts p WHERE "+where+" AND p.created_at>? ORDER BY score DESC, p.created_at DESC LIMIT ? OFFSET ?").bind(...binds,since,limit,offset).all();
      rows=r.results||[];
    }else if(before){
      const r=await env.DB.prepare('SELECT p.* FROM posts p WHERE '+where+' AND p.created_at<? ORDER BY p.created_at DESC LIMIT ?').bind(...binds,before,limit).all();
      rows=r.results||[];
    }else{
      const r=await env.DB.prepare('SELECT p.* FROM posts p WHERE '+where+' ORDER BY p.pinned DESC, p.created_at DESC LIMIT ?').bind(...binds,limit).all();
      rows=r.results||[];
    }
    return J({ok:true,posts:await cmShapePosts(env,rows,me),level:level||'all',sort,storage_enabled:CM_STORAGE_ON,me:await cmProfile(env,me)},200,c.h);
  }
  if(path==='/community/posts'&&method==='POST'){
    const hour=new Date().toISOString().slice(0,13);
    if(await rlHit(env,'cm:post:'+hour+':'+me,hour)>=16)return J({error:'Bạn đăng bài hơi nhanh — thử lại sau ít phút.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    let body=String(b.body||'').trim().slice(0,5000);
    const lvRaw=String(b.level||'').toUpperCase();
    if(lvRaw&&lvRaw!=='ALL'&&!CM_LEVELS.includes(lvRaw))return J({error:'Nhóm cấp độ không hợp lệ'},400,c.h);
    const level=CM_LEVELS.includes(lvRaw)?lvRaw:'';
    const fileIds=Array.isArray(b.file_ids)?[...new Set(b.file_ids.map(String))].slice(0,6):[];
    if(!body&&!fileIds.length)return J({error:'Bài viết trống'},400,c.h);
    const mc=await cmCheckMentions(env,me,body);if(mc.err)return J({error:mc.err},400,c.h);body=mc.body;
    if(fileIds.length){
      const q=cmQ(fileIds.length);
      const [fr,ur]=await env.DB.batch([env.DB.prepare('SELECT * FROM files WHERE id IN ('+q+')').bind(...fileIds),env.DB.prepare('SELECT file_id FROM post_files WHERE file_id IN ('+q+')').bind(...fileIds)]);
      const fm={};for(const f of (fr.results||[]))fm[f.id]=f;
      for(const fid of fileIds){const f=fm[fid];if(!f||f.deleted||f.owner_id!==me||f.purpose!=='post')return J({error:'Tệp đính kèm không hợp lệ'},400,c.h)}
      if((ur.results||[]).length)return J({error:'Tệp đã được dùng ở bài khác'},400,c.h);
    }
    const id=crypto.randomUUID(),t=now();
    const st=[env.DB.prepare('INSERT INTO posts(id,author_id,body,level,created_at,updated_at) VALUES(?,?,?,?,?,?)').bind(id,me,body,level,t,t)];
    fileIds.forEach((fid,i)=>st.push(env.DB.prepare('INSERT INTO post_files(post_id,file_id,ord) VALUES(?,?,?)').bind(id,fid,i)));
    await env.DB.batch(st);
    await cmSaveMentions(env,me,mc.ids,'post',id,{post_id:id});
    const row=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(id).first();
    return J({ok:true,post:(await cmShapePosts(env,[row],me))[0]},201,c.h);
  }
  if(path==='/community/posts/delete'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const row=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(String(b.id||'')).first();
    if(!row||row.deleted)return J({error:'Không tìm thấy bài viết'},404,c.h);
    if(row.author_id!==me)return J({error:'Chỉ xoá được bài của chính bạn'},403,c.h);
    await env.DB.batch([env.DB.prepare('UPDATE posts SET deleted=1, updated_at=? WHERE id=?').bind(now(),row.id),env.DB.prepare("DELETE FROM mentions WHERE source_kind='post' AND source_id=?").bind(row.id)]);
    return J({ok:true},200,c.h);
  }
  if(path==='/community/comments'&&method==='GET'){
    const postId=url.searchParams.get('post_id')||'';
    const post=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(postId).first();
    if(!post||post.deleted||post.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
    const blk=[...(await cmBlockSet(env,me))].slice(0,80);
    const r=await env.DB.prepare('SELECT * FROM comments WHERE post_id=? AND deleted=0 AND hidden=0'+(blk.length?' AND author_id NOT IN ('+cmQ(blk.length)+')':'')+' ORDER BY created_at ASC LIMIT 300').bind(postId,...blk).all();
    return J({ok:true,comments:await cmShapeComments(env,r.results||[],me)},200,c.h);
  }
  if(path==='/community/comments'&&method==='POST'){
    const hour=new Date().toISOString().slice(0,13);
    if(await rlHit(env,'cm:cmt:'+hour+':'+me,hour)>=61)return J({error:'Bạn bình luận hơi nhanh — thử lại sau ít phút.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const postId=String(b.post_id||'');
    const post=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(postId).first();
    if(!post||post.deleted||post.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
    if(await cmBlockedEither(env,me,post.author_id))return J({error:'Không thể bình luận bài này'},403,c.h);
    let body=String(b.body||'').trim().slice(0,2000);
    if(!body)return J({error:'Bình luận trống'},400,c.h);
    const mc=await cmCheckMentions(env,me,body);if(mc.err)return J({error:mc.err},400,c.h);body=mc.body;
    let parentId=null,parent=null;
    if(b.parent_id){
      parent=await env.DB.prepare('SELECT * FROM comments WHERE id=? AND post_id=?').bind(String(b.parent_id),postId).first();
      if(!parent||parent.deleted)return J({error:'Không tìm thấy bình luận gốc'},404,c.h);
      parentId=parent.parent_id||parent.id;
      if(parentId!==parent.id)parent=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(parentId).first();
    }
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO comments(id,post_id,author_id,parent_id,body,created_at) VALUES(?,?,?,?,?,?)').bind(id,postId,me,parentId,body,now()).run();
    const mset=new Set(mc.ids);
    if(parentId&&parent&&parent.author_id!==me){if(!mset.has(parent.author_id))await cmNotify(env,parent.author_id,me,'reply_comment',postId,id)}
    else if(post.author_id!==me&&!mset.has(post.author_id))await cmNotify(env,post.author_id,me,'comment_post',postId,id);
    await cmSaveMentions(env,me,mc.ids,'comment',id,{post_id:postId,comment_id:id});
    const row=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(id).first();
    return J({ok:true,comment:(await cmShapeComments(env,[row],me))[0]},201,c.h);
  }
  if(path==='/community/like'&&method==='POST'){
    if(await cmLimit(env,'like',me,60,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const tt=String(b.target_type||''),tid=String(b.target_id||'');
    const type=b.type===undefined||b.type===null||b.type===''?'like':String(b.type);
    if(!['post','comment'].includes(tt))return J({error:'Loại không hợp lệ'},400,c.h);
    if(!CM_REACTS.includes(type))return J({error:'Cảm xúc không hợp lệ'},400,c.h);
    let author=null,postId=null;
    if(tt==='post'){
      const p=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(tid).first();
      if(!p||p.deleted||p.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
      author=p.author_id;postId=p.id;
    }else{
      const cm=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(tid).first();
      if(!cm||cm.deleted||cm.hidden)return J({error:'Không tìm thấy bình luận'},404,c.h);
      author=cm.author_id;postId=cm.post_id;
    }
    if(await cmBlockedEither(env,me,author))return J({error:'Không thể bày tỏ cảm xúc với nội dung này'},403,c.h);
    const ex=await env.DB.prepare("SELECT COALESCE(type,'like') AS t FROM likes WHERE target_type=? AND target_id=? AND user_id=?").bind(tt,tid,me).first();
    let mine=null;
    if(ex&&ex.t===type){await env.DB.prepare('DELETE FROM likes WHERE target_type=? AND target_id=? AND user_id=?').bind(tt,tid,me).run()}
    else if(ex){await env.DB.prepare('UPDATE likes SET type=? WHERE target_type=? AND target_id=? AND user_id=?').bind(type,tt,tid,me).run();mine=type}
    else{
      await env.DB.prepare('INSERT INTO likes(target_type,target_id,user_id,created_at,type) VALUES(?,?,?,?,?)').bind(tt,tid,me,now(),type).run();mine=type;
      await cmNotify(env,author,me,tt==='post'?'like_post':'like_comment',postId,tt==='comment'?tid:null);
    }
    const rr=await env.DB.prepare("SELECT COALESCE(type,'like') AS t,COUNT(*) AS n FROM likes WHERE target_type=? AND target_id=? GROUP BY t").bind(tt,tid).all();
    const reactions={};let count=0;for(const x of (rr.results||[])){reactions[x.t]=x.n;count+=x.n}
    return J({ok:true,liked:!!mine,my_reaction:mine,count,reactions},200,c.h);
  }
  if(path==='/community/save'&&method==='POST'){
    if(await cmLimit(env,'save',me,60,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const pid=String(b.post_id||'');
    const p=await env.DB.prepare('SELECT id,deleted,hidden FROM posts WHERE id=?').bind(pid).first();
    const ex=await env.DB.prepare('SELECT 1 AS x FROM saved_posts WHERE user_id=? AND post_id=?').bind(me,pid).first();
    if(ex){await env.DB.prepare('DELETE FROM saved_posts WHERE user_id=? AND post_id=?').bind(me,pid).run();return J({ok:true,saved:false},200,c.h)}
    if(!p||p.deleted||p.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
    const n=await env.DB.prepare('SELECT COUNT(*) AS n FROM saved_posts WHERE user_id=?').bind(me).first();
    if(n&&n.n>=500)return J({error:'Bạn đã lưu tối đa 500 bài — bỏ lưu bớt rồi lưu tiếp nhé.'},429,c.h);
    await env.DB.prepare('INSERT OR IGNORE INTO saved_posts(user_id,post_id,created_at) VALUES(?,?,?)').bind(me,pid,now()).run();
    return J({ok:true,saved:true},200,c.h);
  }
  if(path==='/community/saved'&&method==='GET'){
    const before=url.searchParams.get('before')||'9999';
    const r=await env.DB.prepare('SELECT p.*,s.created_at AS saved_at FROM saved_posts s JOIN posts p ON p.id=s.post_id WHERE s.user_id=? AND s.created_at<? AND p.deleted=0 AND p.hidden=0 ORDER BY s.created_at DESC LIMIT 30').bind(me,before).all();
    const rows=r.results||[];
    const posts=await cmShapePosts(env,rows,me);
    posts.forEach((p,i)=>p.saved_at=rows[i].saved_at);
    return J({ok:true,posts},200,c.h);
  }
  if(path==='/community/share'&&method==='POST'){
    if(await cmLimit(env,'share',me,20,'day'))return J({error:'Hôm nay bạn đã chia sẻ 20 lần — mai chia sẻ tiếp nhé.'},429,c.h);
    if(await cmLimit(env,'chatmin',me,30,'minute'))return J({error:'Bạn gửi tin hơi nhanh — chờ một chút rồi gửi tiếp.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const pid=String(b.post_id||'');
    const p=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(pid).first();
    if(!p||p.deleted||p.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
    let cv=null;
    if(b.conv_id){cv=await env.DB.prepare('SELECT * FROM conversations WHERE id=?').bind(String(b.conv_id)).first();if(cv&&cv.user_a!==me&&cv.user_b!==me)cv=null}
    else if(b.user_id){
      const other=String(b.user_id);
      if(other===me||other==='admin')return J({error:'Không thể chia sẻ cho người này'},400,c.h);
      cv=await env.DB.prepare('SELECT * FROM conversations WHERE pair_key=?').bind(cmPair(me,other).key).first();
      if(!cv){
        const fr=await cmFriendRow(env,me,other);
        if(!fr||fr.status!=='accepted')return J({error:'Chỉ chia sẻ được cho bạn bè hoặc người bạn đã từng nhắn tin.'},403,c.h);
        const pr=cmPair(me,other),id=crypto.randomUUID(),t=now();
        await env.DB.prepare('INSERT OR IGNORE INTO conversations(id,pair_key,user_a,user_b,is_admin,created_at,last_at) VALUES(?,?,?,?,0,?,?)').bind(id,pr.key,pr.a,pr.b,t,t).run();
        cv=await env.DB.prepare('SELECT * FROM conversations WHERE pair_key=?').bind(pr.key).first();
      }
    }
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    if(cv.is_admin)return J({error:'Không chia sẻ vào cuộc trò chuyện với quản trị viên'},400,c.h);
    const otherId=cv.user_a===me?cv.user_b:cv.user_a;
    if(await cmBlockedEither(env,me,otherId))return J({error:'Không thể gửi tới người này.',code:'blocked'},403,c.h);
    if(await cmBlockedEither(env,otherId,p.author_id))return J({error:'Người nhận không xem được bài này.'},403,c.h);
    const body=String(b.body||'').trim().slice(0,1000);
    const id=crypto.randomUUID(),t=now();
    await env.DB.batch([
      env.DB.prepare("INSERT INTO messages(id,conv_id,sender_id,body,kind,ref_id,created_at) VALUES(?,?,?,?,'post',?,?)").bind(id,cv.id,me,body,pid,t),
      env.DB.prepare('UPDATE conversations SET last_at=? WHERE id=?').bind(t,cv.id)
    ]);
    if(p.author_id!==me&&p.author_id!==otherId)await cmNotify(env,p.author_id,me,'share_post',pid,null);
    return J({ok:true,conv_id:cv.id,message_id:id},201,c.h);
  }
  if(path==='/community/report'&&method==='POST'){
    const day=new Date().toISOString().slice(0,10);
    if(await rlHit(env,'cm:rep:'+day+':'+me,day)>=21)return J({error:'Bạn đã báo cáo nhiều lần hôm nay — admin sẽ xem xét dần.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const tt=String(b.target_type||''),tid=String(b.target_id||'');
    const reason=String(b.reason||'').trim().slice(0,500);
    let snap=null;
    if(tt==='post'){
      const p=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(tid).first();
      if(!p)return J({error:'Không tìm thấy bài viết'},404,c.h);
      snap={body:p.body,author_id:p.author_id,created_at:p.created_at};
    }else if(tt==='comment'){
      const cm=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(tid).first();
      if(!cm)return J({error:'Không tìm thấy bình luận'},404,c.h);
      snap={body:cm.body,author_id:cm.author_id,post_id:cm.post_id,created_at:cm.created_at};
    }else if(tt==='user'){
      const u=await env.DB.prepare('SELECT id FROM users WHERE id=?').bind(tid).first();
      if(!u||tid===me)return J({error:'Không tìm thấy học viên'},404,c.h);
      snap={user_id:tid,profile:await cmProfile(env,tid)};
    }else return J({error:'Loại báo cáo không hợp lệ'},400,c.h);
    const dup=await env.DB.prepare("SELECT id FROM reports WHERE reporter_id=? AND target_type=? AND target_id=? AND status='open'").bind(me,tt,tid).first();
    if(dup)return J({ok:true,id:dup.id,duplicate:true},200,c.h);
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO reports(id,reporter_id,target_type,target_id,reason,snapshot,created_at) VALUES(?,?,?,?,?,?,?)').bind(id,me,tt,tid,reason,JSON.stringify(snap),now()).run();
    // Tự ẩn khi >=3 người KHÁC NHAU báo cáo (admin hiện lại được qua /community/admin/moderate action=show).
    let auto_hidden=false;
    if(tt==='post'||tt==='comment'){
      const n=await env.DB.prepare("SELECT COUNT(DISTINCT reporter_id) AS n FROM reports WHERE target_type=? AND target_id=? AND status='open'").bind(tt,tid).first();
      if(n&&n.n>=3){await env.DB.prepare('UPDATE '+(tt==='post'?'posts':'comments')+' SET hidden=1 WHERE id=?').bind(tid).run();auto_hidden=true}
    }
    return J({ok:true,id,auto_hidden},201,c.h);
  }
  if(path==='/community/notifications'&&method==='GET'){
    const r=await env.DB.prepare('SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 50').bind(me).all();
    const rows=r.results||[];
    const profs=await cmProfiles(env,rows.map(n=>n.actor_id));
    const out=rows.map(n=>({id:n.id,type:n.type,actor:profs[n.actor_id],post_id:n.post_id,comment_id:n.comment_id,conv_id:n.conv_id||null,read:!!n.is_read,created_at:n.created_at}));
    const uc=await env.DB.prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id=? AND is_read=0').bind(me).first();
    return J({ok:true,notifications:out,unread:uc?uc.n:0},200,c.h);
  }

  // ===== HỒ SƠ =====
  if(path==='/community/profile'&&method==='GET'){
    const uid=url.searchParams.get('user_id')||me;
    const prof=await cmProfile(env,uid);
    const r=await env.DB.prepare('SELECT * FROM posts WHERE author_id=? AND deleted=0 AND hidden=0 ORDER BY created_at DESC LIMIT 30').bind(uid).all();
    const posts=[];
    for(const row of (r.results||[]))posts.push(await cmPostShape(env,row,me));
    return J({ok:true,profile:prof,posts,storage_enabled:CM_STORAGE_ON},200,c.h);
  }
  if(path==='/community/profile'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const display_name=String(b.display_name||'').trim().slice(0,60);
    const bio=String(b.bio||'').trim().slice(0,300);
    const level=String(b.level||'').trim().slice(0,20);
    const goal=String(b.goal||'').trim().slice(0,120);
    let avatar=null,hasAvatar=false;
    if(b.avatar_file){hasAvatar=true;avatar=String(b.avatar_file);
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(avatar).first();
      if(!f||f.deleted||f.owner_id!==me||f.kind!=='image'||f.purpose!=='avatar')return J({error:'Ảnh đại diện không hợp lệ'},400,c.h);
    }
    if(b.avatar_clear){hasAvatar=true;avatar=null}
    const cur=await env.DB.prepare('SELECT user_id FROM profiles WHERE user_id=?').bind(me).first();
    if(cur){
      if(hasAvatar)await env.DB.prepare('UPDATE profiles SET display_name=?,bio=?,level=?,goal=?,avatar_file=?,updated_at=? WHERE user_id=?').bind(display_name,bio,level,goal,avatar,now(),me).run();
      else await env.DB.prepare('UPDATE profiles SET display_name=?,bio=?,level=?,goal=?,updated_at=? WHERE user_id=?').bind(display_name,bio,level,goal,now(),me).run();
    }else{
      await env.DB.prepare('INSERT INTO profiles(user_id,display_name,bio,level,goal,avatar_file,updated_at) VALUES(?,?,?,?,?,?,?)').bind(me,display_name,bio,level,goal,hasAvatar?avatar:null,now()).run();
    }
    return J({ok:true,profile:await cmProfile(env,me)},200,c.h);
  }

  // ===== BẢNG TIN =====
  if(path==='/community/feed'&&method==='GET'){
    const before=url.searchParams.get('before')||'';
    const limit=Math.min(30,Math.max(1,+(url.searchParams.get('limit')||20)));
    let rows;
    if(before){
      const r=await env.DB.prepare('SELECT * FROM posts WHERE deleted=0 AND hidden=0 AND created_at<? ORDER BY created_at DESC LIMIT ?').bind(before,limit).all();
      rows=r.results||[];
    }else{
      const r=await env.DB.prepare('SELECT * FROM posts WHERE deleted=0 AND hidden=0 ORDER BY pinned DESC, created_at DESC LIMIT ?').bind(limit).all();
      rows=r.results||[];
    }
    const posts=[];
    for(const row of rows)posts.push(await cmPostShape(env,row,me));
    return J({ok:true,posts,storage_enabled:CM_STORAGE_ON,me:await cmProfile(env,me)},200,c.h);
  }
  if(path==='/community/posts'&&method==='POST'){
    const hour=new Date().toISOString().slice(0,13);
    if(await rlHit(env,'cm:post:'+hour+':'+me,hour)>=16)return J({error:'Bạn đăng bài hơi nhanh — thử lại sau ít phút.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const body=String(b.body||'').trim().slice(0,5000);
    const fileIds=Array.isArray(b.file_ids)?b.file_ids.map(String).slice(0,6):[];
    if(!body&&!fileIds.length)return J({error:'Bài viết trống'},400,c.h);
    const files=[];
    for(const fid of fileIds){
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(fid).first();
      if(!f||f.deleted||f.owner_id!==me||f.purpose!=='post')return J({error:'Tệp đính kèm không hợp lệ'},400,c.h);
      const used=await env.DB.prepare('SELECT post_id FROM post_files WHERE file_id=?').bind(fid).first();
      if(used)return J({error:'Tệp đã được dùng ở bài khác'},400,c.h);
      files.push(f);
    }
    const id=crypto.randomUUID(),t=now();
    await env.DB.prepare('INSERT INTO posts(id,author_id,body,created_at,updated_at) VALUES(?,?,?,?,?)').bind(id,me,body,t,t).run();
    for(let i=0;i<files.length;i++)await env.DB.prepare('INSERT INTO post_files(post_id,file_id,ord) VALUES(?,?,?)').bind(id,files[i].id,i).run();
    const row=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(id).first();
    return J({ok:true,post:await cmPostShape(env,row,me)},201,c.h);
  }
  if(path==='/community/posts/delete'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const row=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(String(b.id||'')).first();
    if(!row||row.deleted)return J({error:'Không tìm thấy bài viết'},404,c.h);
    if(row.author_id!==me)return J({error:'Chỉ xoá được bài của chính bạn'},403,c.h);
    await env.DB.prepare('UPDATE posts SET deleted=1, updated_at=? WHERE id=?').bind(now(),row.id).run();
    return J({ok:true},200,c.h);
  }

  // ===== BÌNH LUẬN =====
  if(path==='/community/comments'&&method==='GET'){
    const postId=url.searchParams.get('post_id')||'';
    const post=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(postId).first();
    if(!post||post.deleted||post.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
    const r=await env.DB.prepare('SELECT * FROM comments WHERE post_id=? AND deleted=0 AND hidden=0 ORDER BY created_at ASC LIMIT 300').bind(postId).all();
    const out=[];
    for(const row of (r.results||[]))out.push(await cmCommentShape(env,row,me));
    return J({ok:true,comments:out},200,c.h);
  }
  if(path==='/community/comments'&&method==='POST'){
    const hour=new Date().toISOString().slice(0,13);
    if(await rlHit(env,'cm:cmt:'+hour+':'+me,hour)>=61)return J({error:'Bạn bình luận hơi nhanh — thử lại sau ít phút.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const postId=String(b.post_id||'');
    const post=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(postId).first();
    if(!post||post.deleted||post.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
    const body=String(b.body||'').trim().slice(0,2000);
    if(!body)return J({error:'Bình luận trống'},400,c.h);
    let parentId=null,parent=null;
    if(b.parent_id){
      parent=await env.DB.prepare('SELECT * FROM comments WHERE id=? AND post_id=?').bind(String(b.parent_id),postId).first();
      if(!parent||parent.deleted)return J({error:'Không tìm thấy bình luận gốc'},404,c.h);
      parentId=parent.parent_id||parent.id; // dẹt 1 cấp lồng
      if(parentId!==parent.id)parent=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(parentId).first();
    }
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO comments(id,post_id,author_id,parent_id,body,created_at) VALUES(?,?,?,?,?,?)').bind(id,postId,me,parentId,body,now()).run();
    if(parentId&&parent&&parent.author_id!==me)await cmNotify(env,parent.author_id,me,'reply_comment',postId,id);
    else if(post.author_id!==me)await cmNotify(env,post.author_id,me,'comment_post',postId,id);
    const row=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(id).first();
    return J({ok:true,comment:await cmCommentShape(env,row,me)},201,c.h);
  }
  if(path==='/community/comments/delete'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const row=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(String(b.id||'')).first();
    if(!row||row.deleted)return J({error:'Không tìm thấy bình luận'},404,c.h);
    if(row.author_id!==me)return J({error:'Chỉ xoá được bình luận của chính bạn'},403,c.h);
    await env.DB.prepare('UPDATE comments SET deleted=1 WHERE id=?').bind(row.id).run();
    return J({ok:true},200,c.h);
  }

  // ===== THÍCH =====
  if(path==='/community/like'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const tt=String(b.target_type||''),tid=String(b.target_id||'');
    if(!['post','comment'].includes(tt))return J({error:'Loại không hợp lệ'},400,c.h);
    let author=null;
    if(tt==='post'){
      const p=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(tid).first();
      if(!p||p.deleted||p.hidden)return J({error:'Không tìm thấy bài viết'},404,c.h);
      author=p.author_id;
    }else{
      const cm=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(tid).first();
      if(!cm||cm.deleted||cm.hidden)return J({error:'Không tìm thấy bình luận'},404,c.h);
      author=cm.author_id;
    }
    const ex=await env.DB.prepare('SELECT 1 AS x FROM likes WHERE target_type=? AND target_id=? AND user_id=?').bind(tt,tid,me).first();
    let liked;
    if(ex){await env.DB.prepare('DELETE FROM likes WHERE target_type=? AND target_id=? AND user_id=?').bind(tt,tid,me).run();liked=false}
    else{
      await env.DB.prepare('INSERT INTO likes(target_type,target_id,user_id,created_at) VALUES(?,?,?,?)').bind(tt,tid,me,now()).run();liked=true;
      if(tt==='post')await cmNotify(env,author,me,'like_post',tid,null);
      else{const cm=await env.DB.prepare('SELECT post_id FROM comments WHERE id=?').bind(tid).first();await cmNotify(env,author,me,'like_comment',cm?cm.post_id:null,tid)}
    }
    const lc=await env.DB.prepare('SELECT COUNT(*) AS n FROM likes WHERE target_type=? AND target_id=?').bind(tt,tid).first();
    return J({ok:true,liked,count:lc?lc.n:0},200,c.h);
  }

  // ===== BÁO CÁO (bài/bình luận) =====
  if(path==='/community/report'&&method==='POST'){
    const day=new Date().toISOString().slice(0,10);
    if(await rlHit(env,'cm:rep:'+day+':'+me,day)>=21)return J({error:'Bạn đã báo cáo nhiều lần hôm nay — admin sẽ xem xét dần.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const tt=String(b.target_type||''),tid=String(b.target_id||'');
    const reason=String(b.reason||'').trim().slice(0,500);
    let snap=null;
    if(tt==='post'){
      const p=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(tid).first();
      if(!p)return J({error:'Không tìm thấy bài viết'},404,c.h);
      snap={body:p.body,author_id:p.author_id,created_at:p.created_at};
    }else if(tt==='comment'){
      const cm=await env.DB.prepare('SELECT * FROM comments WHERE id=?').bind(tid).first();
      if(!cm)return J({error:'Không tìm thấy bình luận'},404,c.h);
      snap={body:cm.body,author_id:cm.author_id,post_id:cm.post_id,created_at:cm.created_at};
    }else return J({error:'Loại báo cáo không hợp lệ'},400,c.h);
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO reports(id,reporter_id,target_type,target_id,reason,snapshot,created_at) VALUES(?,?,?,?,?,?,?)')
      .bind(id,me,tt,tid,reason,JSON.stringify(snap),now()).run();
    return J({ok:true,id},201,c.h);
  }

  // ===== THÔNG BÁO =====
  if(path==='/community/notifications'&&method==='GET'){
    const r=await env.DB.prepare('SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 50').bind(me).all();
    const out=[];
    for(const n of (r.results||[])){
      out.push({id:n.id,type:n.type,actor:await cmProfile(env,n.actor_id),post_id:n.post_id,comment_id:n.comment_id,read:!!n.is_read,created_at:n.created_at});
    }
    const uc=await env.DB.prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id=? AND is_read=0').bind(me).first();
    return J({ok:true,notifications:out,unread:uc?uc.n:0},200,c.h);
  }
  if(path==='/community/notifications/read'&&method==='POST'){
    const b=await readJson(req);
    if(b&&Array.isArray(b.ids)&&b.ids.length){
      for(const id of b.ids.slice(0,100))await env.DB.prepare('UPDATE notifications SET is_read=1 WHERE id=? AND user_id=?').bind(String(id),me).run();
    }else{
      await env.DB.prepare('UPDATE notifications SET is_read=1 WHERE user_id=?').bind(me).run();
    }
    return J({ok:true},200,c.h);
  }
  if(path==='/community/unread'&&method==='GET'){
    const uc=await env.DB.prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id=? AND is_read=0').bind(me).first();
    const cc=await env.DB.prepare('SELECT COUNT(*) AS n FROM messages m JOIN conversations c ON c.id=m.conv_id WHERE (c.user_a=? OR c.user_b=?) AND m.sender_id<>? AND m.read_at IS NULL AND m.deleted=0').bind(me,me,me).first();
    return J({ok:true,notifications:uc?uc.n:0,chat:cc?cc.n:0,storage_enabled:CM_STORAGE_ON},200,c.h);
  }

  // ===== TẢI TỆP LÊN (nội dung chia mảnh lưu trong D1 — cách 1) =====
  if(path==='/community/upload'&&method==='POST'){
    let form;try{form=await req.formData()}catch(e){return J({error:'Dữ liệu tải lên không hợp lệ'},400,c.h)}
    const file=form.get('file');
    const purpose=['post','chat','avatar'].includes(String(form.get('purpose')||''))?String(form.get('purpose')):'post';
    if(!file||typeof file.arrayBuffer!=='function')return J({error:'Thiếu tệp'},400,c.h);
    const name=String(file.name||'tep').slice(0,120);
    const mime=String(file.type||'');
    const isImg=CM_IMG_MIME.includes(mime);
    const ext=(name.toLowerCase().match(/\.[a-z0-9]+$/)||[''])[0];
    const isDoc=!isImg&&CM_DOC_MIME.includes(mime)&&CM_DOC_EXT.includes(ext);
    if(!isImg&&!isDoc)return J({error:'Định dạng tệp không được hỗ trợ. Ảnh: JPG/PNG/WebP. Tài liệu: PDF, Word, Excel, PowerPoint, TXT, ZIP.'},415,c.h);
    const fsize=+file.size||0;
    const max=isImg?5*1024*1024:10*1024*1024;
    if(!fsize||fsize>max)return J({error:'Tệp vượt quá dung lượng cho phép ('+(isImg?'5MB':'10MB')+')'},413,c.h);
    const quota=await env.DB.prepare('SELECT COUNT(*) AS n, COALESCE(SUM(size),0) AS total FROM files WHERE owner_id=? AND deleted=0').bind(me).first();
    if(quota&&((+quota.n||0)>=200||(+quota.total||0)+fsize>200*1024*1024))return J({error:'Bạn đã dùng hết hạn mức tệp của tài khoản (tối đa 200 tệp / 200MB).'},429,c.h);
    // Chặn tệp giả dạng: kiểm tra vài byte đầu (MZ = tệp chạy .exe; '<' = SVG/HTML giả ảnh).
    const head=new Uint8Array(await file.slice(0,16).arrayBuffer());
    if(head[0]===0x4D&&head[1]===0x5A)return J({error:'Định dạng tệp không được hỗ trợ (tệp chạy .exe bị chặn).'},415,c.h);
    if(isImg){const ok=(head[0]===0xFF&&head[1]===0xD8)||(head[0]===0x89&&head[1]===0x50&&head[2]===0x4E&&head[3]===0x47)||(head[0]===0x52&&head[1]===0x49&&head[2]===0x46&&head[3]===0x46&&head[8]===0x57&&head[9]===0x45);
      if(!ok)return J({error:'Ảnh không hợp lệ. Chỉ nhận JPG/PNG/WebP thật.'},415,c.h)}
    const upDay=new Date().toISOString().slice(0,10);const upKey='cm:up:'+upDay+':'+me;
    if(await rlPeek(env,upKey)>=CM_DAILY_UPLOADS)return J({error:'Hôm nay bạn đã tải lên '+CM_DAILY_UPLOADS+' tệp — đây là giới hạn mỗi ngày. Mai bạn tải tiếp nhé.',code:'daily_limit'},429,c.h);
    // Hạn mức an toàn TOÀN TRANG cho riêng phần tệp (bảo vệ DB chính chứa
    // tài khoản/phiên/tiến độ): chạm trần thì từ chối, không ghi thêm.
    const gall=await env.DB.prepare('SELECT COALESCE(SUM(size),0) AS total FROM files WHERE deleted=0').first();
    if(gall&&(+gall.total||0)+fsize>CM_R2_CAP)return J({error:'Kho tệp của trang đã đạt giới hạn an toàn (9GB) nên tạm thời chưa tải thêm được. Vui lòng báo quản trị viên giúp.',code:'storage_full'},429,c.h);
    if(!env.FILES)return J({error:'Kho lưu trữ tệp chưa sẵn sàng.',code:'storage_pending'},503,c.h);
    const id=crypto.randomUUID();
    const key='f/'+me+'/'+id; // cột r2_key = khoá đối tượng trong bucket R2
    await env.FILES.put(key,file.stream(),{httpMetadata:{contentType:mime},customMetadata:{owner:me,file_id:id}});
    try{
      await env.DB.prepare('INSERT INTO files(id,owner_id,purpose,kind,name,mime,size,r2_key,created_at) VALUES(?,?,?,?,?,?,?,?,?)')
        .bind(id,me,purpose,isImg?'image':'doc',name,mime,fsize,key,now()).run();
    }catch(e){try{await env.FILES.delete(key)}catch(_){}throw e}
    await rlHit(env,upKey,upDay);
    return J({ok:true,id,file:{id,purpose,kind:isImg?'image':'doc',name,mime,size:fsize}},201,c.h);
  }
  if(path==='/community/file-token'&&method==='POST'){
    const b=await readJson(req);if(!b||!Array.isArray(b.ids))return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const exp=Date.now()+3600e3;
    const urls={};
    for(const rawId of b.ids.slice(0,60)){
      const id=String(rawId);
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(id).first();
      if(!f||f.deleted)continue;
      if(await cmFileAccess(env,s,f))urls[id]='/community/file/'+id+'?e='+exp+'&t='+(await cmFileSig(env,id,exp));
    }
    return J({ok:true,urls},200,c.h);
  }

  // ===== CHAT RIÊNG 1-1 =====
  // Đếm chưa đọc của chat KHÔNG sinh dòng thông báo riêng: huy hiệu chuông ở
  // header = thông báo cộng đồng + tin nhắn chưa đọc (xem /community/unread).
  async function cmConvOf(env,convId,uid){
    const cv=await env.DB.prepare('SELECT * FROM conversations WHERE id=?').bind(convId).first();
    if(!cv)return null;
    if(cv.user_a!==uid&&cv.user_b!==uid)return null;
    return cv;
  }
  async function cmGetOrCreateConv(env,a,b){
    const [x,y]=[a,b].sort();
    const pair=x+'|'+y;
    let cv=await env.DB.prepare('SELECT * FROM conversations WHERE pair_key=?').bind(pair).first();
    if(cv)return cv;
    const id=crypto.randomUUID(),t=now();
    await env.DB.prepare('INSERT INTO conversations(id,pair_key,user_a,user_b,is_admin,created_at,last_at) VALUES(?,?,?,?,?,?,?)')
      .bind(id,pair,x,y,(x==='admin'||y==='admin')?1:0,t,t).run();
    return await env.DB.prepare('SELECT * FROM conversations WHERE id=?').bind(id).first();
  }
  if(path==='/chat/conversations'&&method==='GET'){
    const r=await env.DB.prepare('SELECT * FROM conversations WHERE user_a=? OR user_b=? ORDER BY last_at DESC LIMIT 60').bind(me,me).all();
    const rows=r.results||[];
    // Nạp GỘP last_seen của mọi người còn lại (1 lượt truy vấn cho cả danh sách).
    const otherIds=[...new Set(rows.map(cv=>cv.user_a===me?cv.user_b:cv.user_a).filter(x=>x!=='admin'))];
    const lsMap={};
    for(let i=0;i<otherIds.length;i+=90){
      const part=otherIds.slice(i,i+90);
      const lr=await env.DB.prepare('SELECT user_id,last_seen FROM profiles WHERE user_id IN ('+cmQ(part.length)+')').bind(...part).all();
      for(const p of (lr.results||[]))lsMap[p.user_id]=p.last_seen||null;
    }
    const out=[];
    for(const cv of rows){
      const otherId=cv.user_a===me?cv.user_b:cv.user_a;
      const last=await env.DB.prepare('SELECT body,file_id,deleted,sender_id,kind,read_at FROM messages WHERE conv_id=? ORDER BY created_at DESC LIMIT 1').bind(cv.id).first();
      const uc=await env.DB.prepare('SELECT COUNT(*) AS n FROM messages WHERE conv_id=? AND sender_id<>? AND read_at IS NULL AND deleted=0').bind(cv.id,me).first();
      const prof=await cmProfile(env,otherId);
      const lastSeen=otherId==='admin'?null:(lsMap[otherId]||null);
      const online=!!lastSeen&&(Date.now()-Date.parse(lastSeen))<CM_ONLINE_MS;
      const mu=await env.DB.prepare('SELECT 1 AS x FROM conv_mutes WHERE user_id=? AND conv_id=?').bind(me,cv.id).first();
      out.push({id:cv.id,other:Object.assign(prof,{online,last_seen:lastSeen}),is_admin:!!cv.is_admin,last_at:cv.last_at,
        last_text:last?(last.deleted?'Tin nhắn đã bị xoá':(last.body||(last.file_id?'📎 Tệp đính kèm':''))):'',
        last_mine:last?last.sender_id===me:false,last_kind:last?(last.kind||'text'):'',last_sender_id:last?last.sender_id:null,last_read_at:last?(last.read_at||null):null,muted:!!mu,unread:uc?uc.n:0});
    }
    return J({ok:true,conversations:out,storage_enabled:CM_STORAGE_ON},200,c.h);
  }
  if(path==='/chat/open'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const other=String(b.user_id||'');
    if(other===me)return J({error:'Không thể tự nhắn cho chính mình'},400,c.h);
    if(other!=='admin'){
      const u=await env.DB.prepare('SELECT id,status FROM users WHERE id=?').bind(other).first();
      if(!u)return J({error:'Không tìm thấy học viên này'},404,c.h);
    }
    const cv=await cmGetOrCreateConv(env,me,other);
    const blockedByMe=await env.DB.prepare('SELECT 1 AS x FROM blocks WHERE user_id=? AND blocked_id=?').bind(me,other).first();
    return J({ok:true,conv_id:cv.id,other:await cmProfile(env,other),is_admin:!!cv.is_admin,blocked_by_me:!!blockedByMe},200,c.h);
  }
  if(path==='/chat/messages'&&method==='GET'){
    const convId=url.searchParams.get('conv_id')||'';
    const cv=await cmConvOf(env,convId,me);
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    const before=url.searchParams.get('before')||'';
    // Mở xem = đã đọc: đánh dấu mọi tin của phía kia.
    await env.DB.prepare('UPDATE messages SET read_at=? WHERE conv_id=? AND sender_id<>? AND read_at IS NULL').bind(now(),convId,me).run();
    let rows;
    if(before){
      const r=await env.DB.prepare('SELECT * FROM messages WHERE conv_id=? AND created_at<? ORDER BY created_at DESC LIMIT 100').bind(convId,before).all();
      rows=(r.results||[]).reverse();
    }else{
      const r=await env.DB.prepare('SELECT * FROM messages WHERE conv_id=? ORDER BY created_at DESC LIMIT 100').bind(convId).all();
      rows=(r.results||[]).reverse();
    }
    const out=await cmShapeMessages(env,rows,me);
    const otherId=cv.user_a===me?cv.user_b:cv.user_a;
    const prof=await cmProfile(env,otherId);
    let online=false,lastSeen=null;
    if(otherId!=='admin'){
      const pr=await env.DB.prepare('SELECT last_seen FROM profiles WHERE user_id=?').bind(otherId).first();
      lastSeen=pr?(pr.last_seen||null):null;
      online=!!lastSeen&&(Date.now()-Date.parse(lastSeen))<CM_ONLINE_MS;
    }
    return J({ok:true,messages:out,other:Object.assign(prof,{online,last_seen:lastSeen}),is_admin:!!cv.is_admin},200,c.h);
  }
  if(path==='/chat/read'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const cv=await cmConvOf(env,String(b.conv_id||''),me);
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    await env.DB.prepare('UPDATE messages SET read_at=? WHERE conv_id=? AND sender_id<>? AND read_at IS NULL').bind(now(),cv.id,me).run();
    return J({ok:true},200,c.h);
  }
  if(path==='/chat/send'&&method==='POST'){
    const minute=new Date().toISOString().slice(0,16);
    if(await rlHit(env,'cm:chat:'+minute+':'+me,minute)>=31)return J({error:'Bạn gửi tin hơi nhanh — chờ một chút rồi gửi tiếp.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    let cv=null;
    if(b.conv_id)cv=await cmConvOf(env,String(b.conv_id),me);
    else if(b.user_id){
      const other=String(b.user_id);
      if(other===me)return J({error:'Không thể tự nhắn cho chính mình'},400,c.h);
      if(other!=='admin'){
        const u=await env.DB.prepare('SELECT id FROM users WHERE id=?').bind(other).first();
        if(!u)return J({error:'Không tìm thấy học viên này'},404,c.h);
      }
      cv=await cmGetOrCreateConv(env,me,other);
    }
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    const otherId=cv.user_a===me?cv.user_b:cv.user_a;
    const iBlocked=await env.DB.prepare('SELECT 1 AS x FROM blocks WHERE user_id=? AND blocked_id=?').bind(me,otherId).first();
    if(iBlocked)return J({error:'Bạn đã chặn người này — bỏ chặn để nhắn tiếp.',code:'blocked_by_me'},403,c.h);
    const theyBlocked=otherId==='admin'?null:await env.DB.prepare('SELECT 1 AS x FROM blocks WHERE user_id=? AND blocked_id=?').bind(otherId,me).first();
    if(theyBlocked)return J({error:'Không thể gửi tin nhắn tới người này.',code:'blocked'},403,c.h);
    let body=String(b.body||'').trim().slice(0,4000);
    let fileId=null;
    if(b.file_id){
      fileId=String(b.file_id);
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(fileId).first();
      if(!f||f.deleted||f.owner_id!==me||f.purpose!=='chat')return J({error:'Tệp đính kèm không hợp lệ'},400,c.h);
      const used=await env.DB.prepare('SELECT id FROM messages WHERE file_id=?').bind(fileId).first();
      if(used)return J({error:'Tệp đã được dùng ở tin khác'},400,c.h);
    }
    if(!body&&!fileId)return J({error:'Tin nhắn trống'},400,c.h);
    // @ trong chat: chạy cmCheckMentions như bài/bình luận (đặc tả 4d: KHÔNG
    // allowOnly) — lọc theo chặn + mention_policy của người được nhắc, tối đa
    // CM_MENTION_MAX; token không hợp lệ bị hạ xuống chữ thường, không thông báo.
    let mc={body,ids:[]};
    if(body){
      mc=await cmCheckMentions(env,me,body);
      if(mc.err)return J({error:mc.err},400,c.h);
      body=mc.body;
    }
    // Trả lời 1 tin: tin gốc phải tồn tại và thuộc CHÍNH cuộc trò chuyện này.
    const replyTo=String(b.reply_to||'');
    if(replyTo){
      const rp=await env.DB.prepare('SELECT id FROM messages WHERE id=? AND conv_id=?').bind(replyTo,cv.id).first();
      if(!rp)return J({error:'Không tìm thấy tin nhắn được trả lời trong cuộc trò chuyện này'},400,c.h);
    }
    const id=crypto.randomUUID(),t=now();
    await env.DB.prepare("INSERT INTO messages(id,conv_id,sender_id,body,file_id,reply_to,kind,created_at) VALUES(?,?,?,?,?,?,'text',?)").bind(id,cv.id,me,body,fileId,replyTo||null,t).run();
    await env.DB.prepare('UPDATE conversations SET last_at=? WHERE id=?').bind(t,cv.id).run();
    await cmSaveMentions(env,me,mc.ids,'message',id,{conv_id:cv.id});
    const row=await env.DB.prepare('SELECT * FROM messages WHERE id=?').bind(id).first();
    return J({ok:true,message:(await cmShapeMessages(env,[row],me))[0],conv_id:cv.id},201,c.h);
  }
  // Cảm xúc tin nhắn (đặc tả 4e): type thuộc CM_REACTS, hoặc null/'' = gỡ.
  // Đã có cùng type -> DELETE (gỡ); type khác -> UPDATE; chưa có -> INSERT
  // (bảng message_reactions, cột emoji chứa type). Chỉ thành viên hội thoại.
  if(path==='/chat/react'&&method==='POST'){
    if(await cmLimit(env,'mreact',me,60,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const mid=String(b.message_id||'');
    const type=b.type===undefined||b.type===null?'':String(b.type);
    if(type&&!CM_REACTS.includes(type))return J({error:'Cảm xúc không hợp lệ'},400,c.h);
    const m=await env.DB.prepare('SELECT * FROM messages WHERE id=?').bind(mid).first();
    if(!m||m.deleted)return J({error:'Không tìm thấy tin nhắn'},404,c.h);
    const cv=await cmConvOf(env,m.conv_id,me);
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    const ex=await env.DB.prepare('SELECT emoji AS t FROM message_reactions WHERE message_id=? AND user_id=?').bind(mid,me).first();
    let mine=null;
    if(!type){
      if(ex)await env.DB.prepare('DELETE FROM message_reactions WHERE message_id=? AND user_id=?').bind(mid,me).run();
    }
    else if(ex&&ex.t===type){await env.DB.prepare('DELETE FROM message_reactions WHERE message_id=? AND user_id=?').bind(mid,me).run()}
    else if(ex){await env.DB.prepare('UPDATE message_reactions SET emoji=? WHERE message_id=? AND user_id=?').bind(type,mid,me).run();mine=type}
    else{await env.DB.prepare('INSERT INTO message_reactions(message_id,user_id,emoji,created_at) VALUES(?,?,?,?)').bind(mid,me,type,now()).run();mine=type}
    const rr=await env.DB.prepare('SELECT emoji AS t,COUNT(*) AS n FROM message_reactions WHERE message_id=? GROUP BY emoji').bind(mid).all();
    const reactions={};for(const x of (rr.results||[]))reactions[x.t]={count:x.n,mine:x.t===mine};
    return J({ok:true,reactions,mine},200,c.h);
  }
  // Tắt/bật thông báo 1 cuộc trò chuyện (đặc tả 4f, bảng conv_mutes sẵn có):
  // muted=true -> INSERT OR IGNORE; muted=false -> DELETE. Theo từng tài khoản.
  if(path==='/chat/mute'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const cv=await cmConvOf(env,String(b.conv_id||''),me);
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    const muted=!!b.muted;
    if(muted)await env.DB.prepare('INSERT OR IGNORE INTO conv_mutes(user_id,conv_id,created_at) VALUES(?,?,?)').bind(me,cv.id,now()).run();
    else await env.DB.prepare('DELETE FROM conv_mutes WHERE user_id=? AND conv_id=?').bind(me,cv.id).run();
    return J({ok:true,muted},200,c.h);
  }
  if(path==='/chat/delete-message'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const m=await env.DB.prepare('SELECT * FROM messages WHERE id=?').bind(String(b.id||'')).first();
    if(!m)return J({error:'Không tìm thấy tin nhắn'},404,c.h);
    if(m.sender_id!==me)return J({error:'Chỉ xoá được tin nhắn của chính bạn'},403,c.h);
    const cv=await cmConvOf(env,m.conv_id,me);
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    await env.DB.prepare('UPDATE messages SET deleted=1 WHERE id=?').bind(m.id).run();
    return J({ok:true},200,c.h);
  }
  if(path==='/chat/block'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const other=String(b.user_id||'');
    if(!other||other===me||other==='admin')return J({error:'Không thể chặn người này'},400,c.h);
    await env.DB.prepare('INSERT OR IGNORE INTO blocks(user_id,blocked_id,created_at) VALUES(?,?,?)').bind(me,other,now()).run();
    return J({ok:true},200,c.h);
  }
  if(path==='/chat/unblock'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    await env.DB.prepare('DELETE FROM blocks WHERE user_id=? AND blocked_id=?').bind(me,String(b.user_id||'')).run();
    return J({ok:true},200,c.h);
  }
  if(path==='/chat/blocks'&&method==='GET'){
    const r=await env.DB.prepare('SELECT blocked_id,created_at FROM blocks WHERE user_id=? ORDER BY created_at DESC').bind(me).all();
    const out=[];
    for(const row of (r.results||[]))out.push({user:await cmProfile(env,row.blocked_id),created_at:row.created_at});
    return J({ok:true,blocks:out},200,c.h);
  }
  if(path==='/chat/report'&&method==='POST'){
    const day=new Date().toISOString().slice(0,10);
    if(await rlHit(env,'cm:rep:'+day+':'+me,day)>=21)return J({error:'Bạn đã báo cáo nhiều lần hôm nay — admin sẽ xem xét dần.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const cv=await cmConvOf(env,String(b.conv_id||''),me);
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    const ids=Array.isArray(b.message_ids)?b.message_ids.map(String).slice(0,50):[];
    if(!ids.length)return J({error:'Hãy chọn ít nhất một tin nhắn để báo cáo'},400,c.h);
    const snap=[];
    for(const mid of ids){
      const m=await env.DB.prepare('SELECT * FROM messages WHERE id=? AND conv_id=?').bind(mid,cv.id).first();
      if(m)snap.push({id:m.id,sender_id:m.sender_id,body:m.body,file_id:m.file_id,deleted:!!m.deleted,created_at:m.created_at});
    }
    if(!snap.length)return J({error:'Không tìm thấy tin nhắn đã chọn trong cuộc trò chuyện này'},404,c.h);
    const id=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO reports(id,reporter_id,target_type,conv_id,message_ids,snapshot,reason,created_at) VALUES(?,?,?,?,?,?,?,?)')
      .bind(id,me,'chat',cv.id,JSON.stringify(ids),JSON.stringify(snap),String(b.reason||'').trim().slice(0,500),now()).run();
    return J({ok:true,id},201,c.h);
  }

  // ===== ADMIN: kiểm duyệt cộng đồng =====
  if(path==='/community/admin/posts'&&method==='GET'){
    const filter=url.searchParams.get('filter')||'all';
    let where='WHERE deleted=0';
    if(filter==='hidden')where='WHERE deleted=0 AND hidden=1';
    if(filter==='pinned')where='WHERE deleted=0 AND pinned=1';
    if(filter==='deleted')where='WHERE deleted=1';
    const r=await env.DB.prepare('SELECT * FROM posts '+where+' ORDER BY created_at DESC LIMIT 100').all();
    const rows=r.results||[],out=[];
    for(let i=0;i<rows.length;i+=30)out.push(...await cmShapePosts(env,rows.slice(i,i+30),'admin'));
    out.forEach((p,i)=>p.deleted=!!rows[i].deleted);
    return J({ok:true,posts:out},200,c.h);
  }
  if(path==='/community/admin/moderate'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const tt=String(b.target_type||''),id=String(b.id||''),action=String(b.action||'');
    const colmap={pin:['pinned',1],unpin:['pinned',0],hide:['hidden',1],show:['hidden',0],delete:['deleted',1],restore:['deleted',0]};
    if(!colmap[action])return J({error:'Hành động không hợp lệ'},400,c.h);
    if(tt==='post'){
      if(action==='pin'||action==='unpin'){
        await env.DB.prepare('UPDATE posts SET pinned=?, updated_at=? WHERE id=?').bind(colmap[action][1],now(),id).run();
      }else{
        await env.DB.prepare('UPDATE posts SET '+colmap[action][0]+'=?, updated_at=? WHERE id=?').bind(colmap[action][1],now(),id).run();
      }
      return J({ok:true},200,c.h);
    }
    if(tt==='comment'){
      if(action==='pin'||action==='unpin')return J({error:'Bình luận không ghim được'},400,c.h);
      await env.DB.prepare('UPDATE comments SET '+colmap[action][0]+'=? WHERE id=?').bind(colmap[action][1],id).run();
      return J({ok:true},200,c.h);
    }
    return J({error:'Loại không hợp lệ'},400,c.h);
  }
  if(path==='/community/admin/reports'&&method==='GET'){
    const status=url.searchParams.get('status')||'open';
    const r=await env.DB.prepare('SELECT * FROM reports WHERE status=? ORDER BY created_at DESC LIMIT 100').bind(status).all();
    const out=[];
    for(const row of (r.results||[])){
      let snap=null;try{snap=row.snapshot?JSON.parse(row.snapshot):null}catch(e){}
      out.push({id:row.id,reporter:await cmProfile(env,row.reporter_id),target_type:row.target_type,target_id:row.target_id,conv_id:row.conv_id,
        message_ids:row.message_ids?JSON.parse(row.message_ids):null,snapshot:snap,reason:row.reason,status:row.status,created_at:row.created_at});
    }
    return J({ok:true,reports:out},200,c.h);
  }
  if(path==='/community/admin/report-action'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const st=String(b.action||'')==='dismiss'?'dismissed':'resolved';
    const r=await env.DB.prepare('UPDATE reports SET status=?, handled_at=? WHERE id=?').bind(st,now(),String(b.id||'')).run();
    if(!r.meta||!r.meta.changes)return J({error:'Không tìm thấy báo cáo'},404,c.h);
    return J({ok:true,status:st},200,c.h);
  }
  if(path==='/community/admin/profile-reset'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const uid=String(b.user_id||'');
    const u=await env.DB.prepare('SELECT id FROM users WHERE id=?').bind(uid).first();
    if(!u)return J({error:'Không tìm thấy học viên'},404,c.h);
    await env.DB.prepare("INSERT INTO profiles(user_id,display_name,bio,level,goal,avatar_file,updated_at) VALUES(?,'','','','',NULL,?) ON CONFLICT(user_id) DO UPDATE SET display_name='',bio='',level='',goal='',avatar_file=NULL,updated_at=excluded.updated_at").bind(uid,now()).run();
    return J({ok:true},200,c.h);
  }

  // ===== ADMIN: nhắn tin + phát thanh =====
  if(path==='/chat/admin/send'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const uid=String(b.user_id||'');
    const u=await env.DB.prepare('SELECT id,status FROM users WHERE id=?').bind(uid).first();
    if(!u)return J({error:'Không tìm thấy học viên'},404,c.h);
    const body=String(b.body||'').trim().slice(0,4000);
    let fileId=null;
    if(b.file_id){
      fileId=String(b.file_id);
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(fileId).first();
      if(!f||f.deleted||f.purpose!=='chat')return J({error:'Tệp đính kèm không hợp lệ'},400,c.h);
    }
    if(!body&&!fileId)return J({error:'Tin nhắn trống'},400,c.h);
    const cv=await cmGetOrCreateConv(env,'admin',uid);
    const id=crypto.randomUUID(),t=now();
    await env.DB.prepare('INSERT INTO messages(id,conv_id,sender_id,body,file_id,created_at) VALUES(?,?,?,?,?,?)').bind(id,cv.id,'admin',body,fileId,t).run();
    await env.DB.prepare('UPDATE conversations SET last_at=? WHERE id=?').bind(t,cv.id).run();
    return J({ok:true,conv_id:cv.id,message_id:id},201,c.h);
  }
  if(path==='/chat/admin/broadcast'&&method==='POST'){
    const day=new Date().toISOString().slice(0,10);
    if(await rlHit(env,'cm:bc:'+day,day)>=11)return J({error:'Đã đạt giới hạn phát thanh hôm nay'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const body=String(b.body||'').trim().slice(0,4000);
    if(!body)return J({error:'Nội dung phát thanh trống'},400,c.h);
    let fileId=null;
    if(b.file_id){
      fileId=String(b.file_id);
      const f=await env.DB.prepare('SELECT * FROM files WHERE id=?').bind(fileId).first();
      if(!f||f.deleted||f.purpose!=='chat')return J({error:'Tệp đính kèm không hợp lệ'},400,c.h);
    }
    const recips=await env.DB.prepare("SELECT id FROM users WHERE status='approved'").all();
    const list=recips.results||[];
    const t=now();
    for(const u of list){
      const cv=await cmGetOrCreateConv(env,'admin',u.id);
      await env.DB.prepare('INSERT INTO messages(id,conv_id,sender_id,body,file_id,created_at) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),cv.id,'admin',body,fileId,t).run();
      await env.DB.prepare('UPDATE conversations SET last_at=? WHERE id=?').bind(t,cv.id).run();
    }
    const bid=crypto.randomUUID();
    await env.DB.prepare('INSERT INTO broadcasts(id,body,file_id,recipient_count,created_at) VALUES(?,?,?,?,?)').bind(bid,body,fileId,list.length,t).run();
    return J({ok:true,id:bid,recipient_count:list.length},201,c.h);
  }
  if(path==='/chat/admin/broadcasts'&&method==='GET'){
    const r=await env.DB.prepare('SELECT * FROM broadcasts ORDER BY created_at DESC LIMIT 50').all();
    return J({ok:true,broadcasts:r.results||[]},200,c.h);
  }

  // ===== ADMIN: xem chat học viên sau cổng mật khẩu + nhật ký truy cập =====
  // Nguyên tắc: KHÔNG có đường xem nào ngoài cổng này; mật khẩu kiểm tra phía
  // server theo đúng ADMIN_PASSWORD (không tạo mật khẩu mới); quyền xem sống
  // theo phiên admin (không hết hạn theo thời gian) cho tới khi admin đăng
  // xuất phiên chết hoặc tự đóng quyền; MỌI lần mở 1 cuộc trò chuyện đều ghi
  // chat_access_log (chỉ hiển thị trong trang quản trị).
  async function cmHasViewGrant(env,token){
    if(!token)return false;
    const g=await env.DB.prepare('SELECT token FROM chat_view_grants WHERE token=?').bind(token).first();
    if(!g)return false;
    const sess=await env.DB.prepare('SELECT token FROM sessions WHERE token=?').bind(token).first();
    if(!sess){await env.DB.prepare('DELETE FROM chat_view_grants WHERE token=?').bind(token).run();return false}
    return true;
  }
  if(path==='/chat/admin/unlock'&&method==='POST'){
    if(!env.ADMIN_PASSWORD)return J({error:'Chưa đặt ADMIN_PASSWORD'},503,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    // Bắt buộc lý do (đặc tả 4h): thiếu/trắng -> 400 với đúng câu lỗi của đặc tả;
    // kiểm TRƯỚC mật khẩu để lần thử thiếu lý do không ăn vào bộ đếm chống dò.
    const reason=String(b.reason||'').trim().slice(0,200);
    if(!reason)return J({error:'Hãy nhập lý do xem (ví dụ: xử lý báo cáo quấy rối).'},400,c.h);
    const reportId=String(b.report_id||'').trim().slice(0,64);
    const afDay=new Date().toISOString().slice(0,10);
    const afKey='lf:'+afDay+':admin:'+(req.headers.get('CF-Connecting-IP')||'x');
    if(await rlPeek(env,afKey)>=10)return J({error:'Quá nhiều lần nhập sai. Thử lại vào ngày mai.'},429,c.h);
    const pw=String(b.password||'').trim();
    if(pw!==env.ADMIN_PASSWORD){await rlHit(env,afKey,afDay);return J({error:'Mật khẩu admin không đúng'},401,c.h)}
    const token=bearer(req);
    await env.DB.prepare('INSERT OR REPLACE INTO chat_view_grants(token,granted_at,reason) VALUES(?,?,?)').bind(token,now(),reason).run();
    await env.DB.prepare("INSERT INTO chat_access_log(id,kind,conv_id,user_a,user_b,opened_at,reason,report_id) VALUES(?,'unlock',NULL,NULL,NULL,?,?,?)").bind(crypto.randomUUID(),now(),reason,reportId||null).run();
    return J({ok:true},200,c.h);
  }
  if(path==='/chat/admin/lock-view'&&method==='POST'){
    await env.DB.prepare('DELETE FROM chat_view_grants WHERE token=?').bind(bearer(req)).run();
    return J({ok:true},200,c.h);
  }
  if(path==='/chat/admin/view-state'&&method==='GET'){
    return J({ok:true,unlocked:await cmHasViewGrant(env,bearer(req))},200,c.h);
  }
  if(path==='/chat/admin/conversations'&&method==='GET'){
    const r=await env.DB.prepare('SELECT c.*, (SELECT COUNT(*) FROM messages m WHERE m.conv_id=c.id) AS msg_count FROM conversations c WHERE c.is_admin=0 ORDER BY c.last_at DESC LIMIT 100').all();
    const rows=r.results||[];
    // Nạp GỘP số báo cáo chat đang mở cho mọi cuộc trò chuyện (1 lượt GROUP BY).
    const repMap={};
    for(let i=0;i<rows.length;i+=90){
      const part=rows.slice(i,i+90).map(cv=>cv.id);
      const rr=await env.DB.prepare("SELECT conv_id,COUNT(*) AS n FROM reports WHERE target_type='chat' AND status='open' AND conv_id IN ("+cmQ(part.length)+") GROUP BY conv_id").bind(...part).all();
      for(const x of (rr.results||[]))repMap[x.conv_id]=x.n;
    }
    const out=[];
    for(const cv of rows){
      out.push({id:cv.id,user_a:await cmProfile(env,cv.user_a),user_b:await cmProfile(env,cv.user_b),last_at:cv.last_at,msg_count:cv.msg_count,open_reports:repMap[cv.id]||0});
    }
    return J({ok:true,conversations:out},200,c.h);
  }
  if(path==='/chat/admin/messages'&&method==='GET'){
    if(!(await cmHasViewGrant(env,bearer(req))))return J({error:'Cần nhập lại mật khẩu admin để xem tin nhắn học viên',code:'need_unlock'},403,c.h);
    const convId=url.searchParams.get('conv_id')||'';
    const cv=await env.DB.prepare('SELECT * FROM conversations WHERE id=?').bind(convId).first();
    if(!cv)return J({error:'Không tìm thấy cuộc trò chuyện'},404,c.h);
    // Ghi nhật ký TRƯỚC khi trả dữ liệu: mọi lần mở xem đều có dấu vết phía admin.
    // Lý do lấy từ grant đang mở (SELECT reason FROM chat_view_grants theo token
    // phiên — ghi lúc unlock ở (h)); report_id lấy từ query (?report_id=...)
    // khi admin mở xem từ một báo cáo cụ thể. Cả hai chép vào dòng 'open'.
    const grant=await env.DB.prepare('SELECT reason FROM chat_view_grants WHERE token=?').bind(bearer(req)).first();
    const reportId=String(url.searchParams.get('report_id')||'').slice(0,64);
    await env.DB.prepare("INSERT INTO chat_access_log(id,kind,conv_id,user_a,user_b,opened_at,reason,report_id) VALUES(?,'open',?,?,?,?,?,?)").bind(crypto.randomUUID(),cv.id,cv.user_a,cv.user_b,now(),grant?(grant.reason||null):null,reportId||null).run();
    const r=await env.DB.prepare('SELECT * FROM messages WHERE conv_id=? ORDER BY created_at ASC LIMIT 500').bind(convId).all();
    const out=[];
    for(const m of (r.results||[])){
      out.push({id:m.id,sender_id:m.sender_id,body:m.body,file_id:m.file_id,deleted:!!m.deleted,read_at:m.read_at,created_at:m.created_at});
    }
    return J({ok:true,messages:out,user_a:await cmProfile(env,cv.user_a),user_b:await cmProfile(env,cv.user_b)},200,c.h);
  }
  if(path==='/chat/admin/access-log'&&method==='GET'){
    const r=await env.DB.prepare('SELECT * FROM chat_access_log ORDER BY opened_at DESC LIMIT 200').all();
    return J({ok:true,log:r.results||[]},200,c.h);
  }

  // ===== BẠN BÈ (giai đoạn 2, nhánh 2): /friends/* =====
  // Trạng thái quan hệ luôn suy từ bảng friendships qua cmFriendRow/cmFriendState
  // ('none'|'outgoing'|'incoming'|'friends'; hàng status='declined' tính là 'none').
  // Cổng tài khoản approved đã áp ở đầu handleCommunity (cmNeedUser) như mọi
  // endpoint /community khác nên khối này không kiểm tra lại phiên/quyền.
  // cmProfiles không trả last_seen nên trạng thái online tra riêng tại đây.
  async function frLastSeen(env,ids){
    const out={};const uniq=[...new Set(ids.filter(Boolean).map(String))].filter(x=>x!=='admin');
    for(let i=0;i<uniq.length;i+=90){
      const part=uniq.slice(i,i+90);
      const r=await env.DB.prepare('SELECT user_id,last_seen FROM profiles WHERE user_id IN ('+cmQ(part.length)+')').bind(...part).all();
      for(const p of (r.results||[]))out[p.user_id]=p.last_seen||null;
    }
    return out;
  }
  function frEntry(prof,ls,extra){
    return Object.assign({user:prof,online:!!ls&&(Date.now()-Date.parse(ls))<CM_ONLINE_MS,last_seen:ls||null},extra||{});
  }
  // Đếm bạn chung của từng ứng viên với me (tương đương mẫu tự-join f1/f2 trong
  // /community/user, tính phía JS trên 1 truy vấn gom để tiết kiệm lượt D1).
  async function frMutual(env,me,ids){
    const mutual={};if(!ids.length)return mutual;
    const myFr=await env.DB.prepare("SELECT CASE WHEN user_a=? THEN user_b ELSE user_a END AS x FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?)").bind(me,me,me).all();
    const mySet=new Set((myFr.results||[]).map(x=>x.x));
    if(!mySet.size)return mutual;
    const qmarks=cmQ(ids.length);
    const their=await env.DB.prepare('SELECT user_a,user_b FROM friendships WHERE status=\'accepted\' AND (user_a IN ('+qmarks+') OR user_b IN ('+qmarks+'))').bind(...ids,...ids).all();
    for(const x of (their.results||[])){
      for(const cand of [x.user_a,x.user_b]){
        if(!ids.includes(cand))continue;
        const otherSide=cand===x.user_a?x.user_b:x.user_a;
        if(mySet.has(otherSide))mutual[cand]=(mutual[cand]||0)+1;
      }
    }
    return mutual;
  }
  if(path==='/friends/request'&&method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const other=String(b.user_id||'');
    const target=other?await env.DB.prepare('SELECT id,status FROM users WHERE id=?').bind(other).first():null;
    if(!target||target.status!=='approved')return J({error:'Không tìm thấy học viên này'},404,c.h);
    if(other===me)return J({error:'Bạn không thể gửi lời mời cho chính mình'},400,c.h);
    if(await cmBlockedEither(env,me,other))return J({error:'Không thể gửi lời mời tới người này.',code:'blocked'},403,c.h);
    if(await rlHit(env,'cm:friendreq:'+cmDay()+':'+me,cmDay())>=21)return J({error:'Bạn đã gửi khá nhiều lời mời hôm nay — mai gửi tiếp nhé.'},429,c.h);
    const message=String(b.message||'').trim().slice(0,300);
    const row=await cmFriendRow(env,me,other);
    const state0=cmFriendState(row,me);
    if(state0==='friends')return J({ok:true,state:'friends'},200,c.h);
    if(state0==='outgoing')return J({ok:true,state:'outgoing'},200,c.h);
    // Phía kia đã mời mình trước: chỉ báo trạng thái, KHÔNG tự chấp nhận —
    // muốn kết bạn thì người dùng bấm đồng ý qua /friends/respond.
    if(state0==='incoming')return J({ok:true,state:'incoming'},200,c.h);
    const pr=cmPair(me,other),t=now();
    if(row){
      // Hàng cũ status='declined': dùng lại đúng hàng đó, mở một lời mời mới.
      await env.DB.prepare("UPDATE friendships SET requester_id=?,status='pending',message=?,updated_at=? WHERE pair_key=?").bind(me,message,t,row.pair_key).run();
    }else{
      await env.DB.prepare('INSERT INTO friendships(pair_key,user_a,user_b,requester_id,status,message,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)').bind(pr.key,pr.a,pr.b,me,'pending',message,t,t).run();
    }
    await cmNotify(env,other,me,'friend_request',null,null);
    return J({ok:true,state:'outgoing'},200,c.h);
  }
  if(path==='/friends/respond'&&method==='POST'){
    if(await cmLimit(env,'friendact',me,60,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const other=String(b.user_id||'');
    let accept=null;
    if(b.action==='accept')accept=true;
    else if(b.action==='decline')accept=false;
    else if(typeof b.accept==='boolean')accept=b.accept;
    else if(typeof b.accepted==='boolean')accept=b.accepted;
    if(accept===null)return J({error:'Thiếu lựa chọn đồng ý hay từ chối'},400,c.h);
    const row=other?await cmFriendRow(env,me,other):null;
    // Chỉ xử lý khi hàng đang pending và người gửi là phía kia (requester_id = user_id).
    if(!row||row.status!=='pending'||row.requester_id!==other)return J({error:'Không tìm thấy lời mời'},404,c.h);
    if(accept){
      await env.DB.prepare("UPDATE friendships SET status='accepted',updated_at=? WHERE pair_key=?").bind(now(),row.pair_key).run();
      await cmNotify(env,other,me,'friend_accept',null,null);
      return J({ok:true,state:'friends'},200,c.h);
    }
    await env.DB.prepare("UPDATE friendships SET status='declined',updated_at=? WHERE pair_key=?").bind(now(),row.pair_key).run();
    return J({ok:true,state:'none'},200,c.h);
  }
  if(path==='/friends/cancel'&&method==='POST'){
    if(await cmLimit(env,'friendact',me,60,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const other=String(b.user_id||'');
    const row=other?await cmFriendRow(env,me,other):null;
    if(!row||row.status!=='pending'||row.requester_id!==me)return J({error:'Không tìm thấy lời mời đã gửi để huỷ'},404,c.h);
    await env.DB.prepare('DELETE FROM friendships WHERE pair_key=?').bind(row.pair_key).run();
    return J({ok:true,state:'none'},200,c.h);
  }
  if(path==='/friends/remove'&&method==='POST'){
    if(await cmLimit(env,'friendact',me,60,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const other=String(b.user_id||'');
    const row=other?await cmFriendRow(env,me,other):null;
    if(!row||row.status!=='accepted')return J({error:'Hai bạn chưa phải bạn bè'},404,c.h);
    await env.DB.prepare('DELETE FROM friendships WHERE pair_key=?').bind(row.pair_key).run();
    return J({ok:true,state:'none'},200,c.h);
  }
  if(path==='/friends/list'&&method==='GET'){
    const r=await env.DB.prepare("SELECT *,CASE WHEN user_a=? THEN user_b ELSE user_a END AS other_id FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?) LIMIT 200").bind(me,me,me).all();
    const rows=r.results||[];
    const profs=await cmProfiles(env,rows.map(x=>x.other_id));
    const seen=await frLastSeen(env,rows.map(x=>x.other_id));
    const friends=rows.map(x=>frEntry(profs[x.other_id],seen[x.other_id]));
    // Đang online xếp trước, trong cùng nhóm thì theo tên A–Z.
    friends.sort((a,b2)=>((b2.online?1:0)-(a.online?1:0))||String(a.user.name).localeCompare(String(b2.user.name)));
    return J({ok:true,friends,total:friends.length},200,c.h);
  }
  if(path==='/friends/requests'&&method==='GET'){
    const r=await env.DB.prepare("SELECT *,CASE WHEN user_a=? THEN user_b ELSE user_a END AS other_id FROM friendships WHERE status='pending' AND (user_a=? OR user_b=?) ORDER BY created_at DESC LIMIT 100").bind(me,me,me).all();
    const rows=r.results||[];
    const profs=await cmProfiles(env,rows.map(x=>x.other_id));
    const incoming=[],outgoing=[];
    for(const x of rows){
      if(x.requester_id===me)outgoing.push({user:profs[x.other_id],created_at:x.created_at||null});
      else incoming.push({user:profs[x.other_id],message:x.message||'',created_at:x.created_at||null});
    }
    return J({ok:true,incoming,outgoing},200,c.h);
  }
  if(path==='/friends/search'&&method==='GET'){
    if(await cmLimit(env,'search',me,30,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const q=String(url.searchParams.get('q')||'').trim().slice(0,60);
    const lvRaw=String(url.searchParams.get('level')||'').toUpperCase();
    const level=CM_LEVELS.includes(lvRaw)?lvRaw:'';
    const region=String(url.searchParams.get('region')||'').trim().slice(0,40);
    if(!q&&!level&&!region)return J({ok:true,users:[]},200,c.h);
    const blk=[...(await cmBlockSet(env,me))].slice(0,80);
    let sql="SELECT u.id FROM users u LEFT JOIN profiles p ON p.user_id=u.id WHERE u.status='approved' AND COALESCE(p.discoverable,1)=1 AND u.id<>?";
    const binds=[me];
    if(blk.length){sql+=' AND u.id NOT IN ('+cmQ(blk.length)+')';binds.push(...blk)}
    if(q){
      const pat='%'+q.toLowerCase().replace(/[\\%_]/g,'\\$&')+'%';
      sql+=" AND (LOWER(u.name) LIKE ? ESCAPE '\\' OR LOWER(COALESCE(p.display_name,'')) LIKE ? ESCAPE '\\')";
      binds.push(pat,pat);
    }
    if(level){sql+=' AND p.level=?';binds.push(level)}
    if(region){sql+=' AND LOWER(p.region)=LOWER(?)';binds.push(region)}
    sql+=' ORDER BY (p.last_seen IS NULL),p.last_seen DESC,u.name ASC LIMIT 30';
    const r=await env.DB.prepare(sql).bind(...binds).all();
    const ids=(r.results||[]).map(x=>x.id);
    if(!ids.length)return J({ok:true,users:[]},200,c.h);
    const profs=await cmProfiles(env,ids);
    const seen=await frLastSeen(env,ids);
    const qmarks=cmQ(ids.length);
    const fr=await env.DB.prepare('SELECT * FROM friendships WHERE (user_a=? AND user_b IN ('+qmarks+')) OR (user_b=? AND user_a IN ('+qmarks+'))').bind(me,...ids,me,...ids).all();
    const state={};for(const x of (fr.results||[]))state[x.user_a===me?x.user_b:x.user_a]=cmFriendState(x,me);
    const mutual=await frMutual(env,me,ids);
    const users=ids.map(id=>frEntry(profs[id],seen[id],{friend:state[id]||'none',mutual_friends:mutual[id]||0}));
    return J({ok:true,users},200,c.h);
  }
  if(path==='/friends/suggest'&&method==='GET'){
    if(await cmLimit(env,'search',me,30,'minute'))return J({error:'Bạn thao tác hơi nhanh — chờ một chút nhé.'},429,c.h);
    const meProf=await env.DB.prepare('SELECT level FROM profiles WHERE user_id=?').bind(me).first();
    const myLevel=meProf?meProf.level||'':'';
    const r=await env.DB.prepare("SELECT u.id,p.level,p.last_seen FROM users u LEFT JOIN profiles p ON p.user_id=u.id WHERE u.status='approved' AND COALESCE(p.discoverable,1)=1 AND u.id<>? ORDER BY (p.last_seen IS NULL),p.last_seen DESC LIMIT 200").bind(me).all();
    const blk=await cmBlockSet(env,me);
    const rel=await env.DB.prepare('SELECT *,CASE WHEN user_a=? THEN user_b ELSE user_a END AS other_id FROM friendships WHERE (user_a=? OR user_b=?) AND status IN (\'pending\',\'accepted\')').bind(me,me,me).all();
    const busy=new Set((rel.results||[]).map(x=>x.other_id));
    // Loại: bị chặn hai chiều + đã có hàng accepted/pending (hàng declined không loại).
    const cand=(r.results||[]).filter(x=>!blk.has(x.id)&&!busy.has(x.id));
    if(!cand.length)return J({ok:true,users:[]},200,c.h);
    const candIds=cand.map(x=>x.id);
    const mutual=await frMutual(env,me,candIds);
    const profs=await cmProfiles(env,candIds);
    const seen=await frLastSeen(env,candIds);
    // Ưu tiên cùng cấp với me trước (khác cấp vẫn hiện sau), rồi bạn chung giảm dần.
    cand.sort((a,b2)=>(((myLevel&&b2.level===myLevel)?1:0)-((myLevel&&a.level===myLevel)?1:0))||((mutual[b2.id]||0)-(mutual[a.id]||0))||String(b2.last_seen||'').localeCompare(String(a.last_seen||'')));
    const users=cand.slice(0,12).map(x=>frEntry(profs[x.id],seen[x.id],{friend:'none',mutual_friends:mutual[x.id]||0}));
    return J({ok:true,users},200,c.h);
  }

  return J({error:'Không tìm thấy API'},404,c.h);
}


// ===== THÀNH TÍCH HỌC TẬP: chuỗi ngày học (streak) / XP / bảng xếp hạng / huy hiệu =====
// Mọi con số TÍNH PHÍA SERVER từ dữ liệu đã đồng bộ theo tài khoản trong
// user_progress (hn_prog_v1, hn_srs_v1, hn_choukai_*, hn_game_v1) — không có
// hệ ghi điểm song song phía client. Ngày học tính theo giờ Nhật (Asia/Tokyo,
// UTC+9, không có giờ mùa) từ map ngày của chính dữ liệu (prog.days / srs.n /
// game.d — các map này phía web đóng dấu theo ngày địa phương của học viên,
// đối tượng của trang đều ở Nhật).
// hn_game_v1 = {w:{id bài: số lần thắng trùm}, d:{ngày: số lần thắng}} do
// lesson.html ghi khi thắng game Đấu trùm (trước đây game không ghi gì).
let _stReady = false;
async function ensureStats(env) {
  if (_stReady || !env.DB) return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS badge_grants (
    user_id TEXT NOT NULL, badge_id TEXT NOT NULL, granted_at TEXT NOT NULL,
    PRIMARY KEY(user_id, badge_id))`).run();
  _stReady = true;
}
const ST_LEVELS = {"N1":["khoa-n1-kj-01","khoa-n1-kj-02","khoa-n1-kj-03","khoa-n1-kj-04","khoa-n1-kj-05","khoa-n1-kj-06","khoa-n1-kj-07","khoa-n1-kj-08","khoa-n1-kj-09","khoa-n1-kj-10","khoa-n1-kj-11","khoa-n1-kj-12","khoa-n1-kj-13","khoa-n1-kj-14","khoa-n1-kj-15","khoa-n1-kj-16","khoa-n1-kj-17","khoa-n1-kj-18","khoa-n1-kj-19","khoa-n1-kj-20","khoa-n1-kj-21","khoa-n1-kj-22","khoa-n1-kj-23","khoa-n1-kj-24","khoa-n1-kj-25","khoa-n1-kj-26","khoa-n1-kj-27","khoa-n1-kj-28","khoa-n1-kj-29","khoa-n1-kj-30","khoa-n1-np-01","khoa-n1-np-02","khoa-n1-np-03","khoa-n1-np-04","khoa-n1-np-05","khoa-n1-np-06","khoa-n1-np-07","khoa-n1-np-08","khoa-n1-np-09","khoa-n1-np-10","khoa-n1-np-11","khoa-n1-np-12","khoa-n1-np-13","khoa-n1-np-14","khoa-n1-np-15","khoa-n1-np-16","khoa-n1-np-17","khoa-n1-np-18","khoa-n1-np-19","khoa-n1-np-20","khoa-n1-np-21","khoa-n1-np-22","khoa-n1-np-23","khoa-n1-np-24","khoa-n1-np-25","khoa-n1-np-26","khoa-n1-np-n2-trong-n1","khoa-n1-tv-01","khoa-n1-tv-02","khoa-n1-tv-03","khoa-n1-tv-04","khoa-n1-tv-05","khoa-n1-tv-06","khoa-n1-tv-07","khoa-n1-tv-08","khoa-n1-tv-09","khoa-n1-tv-10","khoa-n1-tv-11","khoa-n1-tv-12","khoa-n1-tv-13","khoa-n1-tv-14","khoa-n1-tv-15","khoa-n1-tv-16","khoa-n1-tv-17","khoa-n1-tv-18","khoa-n1-tv-19","khoa-n1-tv-20","khoa-n1-tv-21","khoa-n1-tv-22","khoa-n1-tv-23","khoa-n1-tv-24","khoa-n1-tv-25","khoa-n1-tv-26","khoa-n1-tv-27","khoa-n1-tv-28","khoa-n1-tv-29","khoa-n1-tv-30","khoa-n1-tv-31","khoa-n1-tv-32","khoa-n1-tv-33","khoa-n1-tv-34","khoa-n1-tv-35","khoa-n1-tv-36","khoa-n1-tv-37","khoa-n1-tv-38","khoa-n1-tv-39","khoa-n1-tv-40","khoa-n1-tv-41","khoa-n1-tv-42","khoa-n1-tv-43","khoa-n1-tv-44","khoa-n1-tv-45","khoa-n1-tv-46","khoa-n1-tv-47","khoa-n1-tv-48","khoa-n1-tv-49","khoa-n1-tv-50","khoa-n1-tv-51","khoa-n1-tv-52","khoa-n1-tv-53","khoa-n1-tv-54","khoa-n1-tv-55","khoa-n1-tv-56","khoa-n1-tv-57","khoa-n1-tv-58","khoa-n1-tv-59","khoa-n1-tv-60","khoa-n1-tv-61","khoa-n1-tv-62"],"N2":["khoa-n2-kj-01","khoa-n2-kj-02","khoa-n2-kj-03","khoa-n2-kj-04","khoa-n2-kj-05","khoa-n2-kj-06","khoa-n2-kj-07","khoa-n2-kj-08","khoa-n2-kj-09","khoa-n2-kj-10","khoa-n2-kj-11","khoa-n2-kj-12","khoa-n2-kj-13","khoa-n2-np-01","khoa-n2-np-02","khoa-n2-np-03","khoa-n2-np-04","khoa-n2-np-05","khoa-n2-np-06","khoa-n2-np-07","khoa-n2-np-08","khoa-n2-np-09","khoa-n2-np-10","khoa-n2-np-11","khoa-n2-np-12","khoa-n2-np-13","khoa-n2-np-14","khoa-n2-np-15","khoa-n2-np-16","khoa-n2-np-17","khoa-n2-np-18","khoa-n2-np-19","khoa-n2-np-20","khoa-n2-np-21","khoa-n2-tv-01","khoa-n2-tv-02","khoa-n2-tv-03","khoa-n2-tv-04","khoa-n2-tv-05","khoa-n2-tv-06","khoa-n2-tv-07","khoa-n2-tv-08","khoa-n2-tv-09","khoa-n2-tv-10","khoa-n2-tv-11","khoa-n2-tv-12","khoa-n2-tv-13","khoa-n2-tv-14","khoa-n2-tv-15","khoa-n2-tv-16","khoa-n2-tv-17","khoa-n2-tv-18","khoa-n2-tv-19","khoa-n2-tv-20","khoa-n2-tv-21","khoa-n2-tv-22","khoa-n2-tv-23","khoa-n2-tv-24","khoa-n2-tv-25","khoa-n2-tv-26","khoa-n2-tv-27","khoa-n2-tv-28","khoa-n2-tv-29","khoa-n2-tv-30","khoa-n2-tv-31","khoa-n2-tv-32","khoa-n2-tv-33","khoa-n2-tv-34","khoa-n2-tv-35","khoa-n2-tv-36","khoa-n2-tv-37","khoa-n2-tv-38","khoa-n2-tv-39","khoa-n2-tv-40","khoa-n2-tv-41","khoa-n2-tv-42","khoa-n2-tv-43","khoa-n2-tv-44","khoa-n2-tv-45","khoa-n2-tv-46","khoa-n2-tv-47"],"N5":["khoa-n5-kj-01","khoa-n5-kj-02","khoa-n5-kj-03","khoa-n5-kj-04","khoa-n5-kj-05","khoa-n5-kj-06","khoa-n5-kj-07","khoa-n5-kj-08","khoa-n5-kj-09","khoa-n5-kj-10","khoa-n5-kj-11","khoa-n5-kj-12","khoa-n5-np-01","khoa-n5-np-02","khoa-n5-np-03","khoa-n5-np-04","khoa-n5-np-05","khoa-n5-np-06","khoa-n5-np-07","khoa-n5-np-08","khoa-n5-np-09","khoa-n5-np-10","khoa-n5-np-11","khoa-n5-np-12","khoa-n5-np-13","khoa-n5-np-14","khoa-n5-np-15","khoa-n5-np-16","khoa-n5-np-17","khoa-n5-np-18","khoa-n5-np-19","khoa-n5-np-20","khoa-n5-np-21","khoa-n5-np-22","khoa-n5-np-23","khoa-n5-np-24","khoa-n5-np-25","khoa-n5-tv-01","khoa-n5-tv-02","khoa-n5-tv-03","khoa-n5-tv-04","khoa-n5-tv-05","khoa-n5-tv-06","khoa-n5-tv-07","khoa-n5-tv-08","khoa-n5-tv-09","khoa-n5-tv-10","khoa-n5-tv-11","khoa-n5-tv-12","khoa-n5-tv-13","khoa-n5-tv-14","khoa-n5-tv-15","khoa-n5-tv-16","khoa-n5-tv-17","khoa-n5-tv-18","khoa-n5-tv-19","khoa-n5-tv-20","khoa-n5-tv-21","khoa-n5-tv-22","khoa-n5-tv-23","khoa-n5-tv-24","khoa-n5-tv-25"],"N4":["khoa-n4-kj-01","khoa-n4-kj-02","khoa-n4-kj-03","khoa-n4-kj-04","khoa-n4-kj-05","khoa-n4-kj-06","khoa-n4-kj-07","khoa-n4-kj-08","khoa-n4-kj-09","khoa-n4-kj-10","khoa-n4-kj-11","khoa-n4-kj-12","khoa-n4-np-01","khoa-n4-np-02","khoa-n4-np-03","khoa-n4-np-04","khoa-n4-np-05","khoa-n4-np-06","khoa-n4-np-07","khoa-n4-np-08","khoa-n4-np-09","khoa-n4-np-10","khoa-n4-np-11","khoa-n4-np-12","khoa-n4-np-13","khoa-n4-np-14","khoa-n4-np-15","khoa-n4-np-16","khoa-n4-np-17","khoa-n4-np-18","khoa-n4-np-19","khoa-n4-np-20","khoa-n4-np-21","khoa-n4-np-22","khoa-n4-np-23","khoa-n4-np-24","khoa-n4-np-25","khoa-n4-tv-01","khoa-n4-tv-02","khoa-n4-tv-03","khoa-n4-tv-04","khoa-n4-tv-05","khoa-n4-tv-06","khoa-n4-tv-07","khoa-n4-tv-08","khoa-n4-tv-09","khoa-n4-tv-10","khoa-n4-tv-11","khoa-n4-tv-12","khoa-n4-tv-13","khoa-n4-tv-14","khoa-n4-tv-15","khoa-n4-tv-16","khoa-n4-tv-17","khoa-n4-tv-18","khoa-n4-tv-19","khoa-n4-tv-20","khoa-n4-tv-21","khoa-n4-tv-22","khoa-n4-tv-23","khoa-n4-tv-24","khoa-n4-tv-25"],"N3":["khoa-n3-kj-01","khoa-n3-kj-02","khoa-n3-kj-03","khoa-n3-kj-04","khoa-n3-kj-05","khoa-n3-kj-06","khoa-n3-kj-07","khoa-n3-kj-08","khoa-n3-kj-09","khoa-n3-kj-10","khoa-n3-kj-11","khoa-n3-kj-12","khoa-n3-kj-13","khoa-n3-kj-14","khoa-n3-kj-15","khoa-n3-np-01","khoa-n3-np-02","khoa-n3-np-03","khoa-n3-np-04","khoa-n3-np-05","khoa-n3-np-06","khoa-n3-np-07","khoa-n3-np-08","khoa-n3-np-09","khoa-n3-np-10","khoa-n3-np-11","khoa-n3-np-12","khoa-n3-np-13","khoa-n3-np-14","khoa-n3-np-15","khoa-n3-np-16","khoa-n3-np-17","khoa-n3-np-18","khoa-n3-np-19","khoa-n3-np-20","khoa-n3-np-21","khoa-n3-np-22","khoa-n3-np-23","khoa-n3-np-24","khoa-n3-np-25","khoa-n3-np-26","khoa-n3-np-27","khoa-n3-np-28","khoa-n3-np-29","khoa-n3-np-30","khoa-n3-tv-01","khoa-n3-tv-02","khoa-n3-tv-03","khoa-n3-tv-04","khoa-n3-tv-05","khoa-n3-tv-06","khoa-n3-tv-07","khoa-n3-tv-08","khoa-n3-tv-09","khoa-n3-tv-10","khoa-n3-tv-11","khoa-n3-tv-12","khoa-n3-tv-13","khoa-n3-tv-14","khoa-n3-tv-15","khoa-n3-tv-16","khoa-n3-tv-17","khoa-n3-tv-18","khoa-n3-tv-19","khoa-n3-tv-20"]};
const ST_XP = { quizOk: 5, newCard: 2, listen: 25, boss: 15 };
const ST_BADGES = [
  { id: 'streak7',   icon: '🔥', name: 'Chuỗi 7 ngày',    desc: 'Học liên tục 7 ngày',                    target: 7,    unit: 'ngày',  val: s => s.streakBest },
  { id: 'streak30',  icon: '🌋', name: 'Chuỗi 30 ngày',   desc: 'Học liên tục 30 ngày',                   target: 30,   unit: 'ngày',  val: s => s.streakBest },
  { id: 'cards100',  icon: '🌱', name: '100 thẻ mới',     desc: 'Học 100 thẻ từ/kanji mới qua ôn tập',    target: 100,  unit: 'thẻ',   val: s => s.newCards },
  { id: 'cards500',  icon: '🌳', name: '500 thẻ mới',     desc: 'Học 500 thẻ từ/kanji mới qua ôn tập',    target: 500,  unit: 'thẻ',   val: s => s.newCards },
  { id: 'boss10',    icon: '⚔️', name: 'Hạ trùm 10 lần', desc: 'Thắng game Đấu trùm ôn tập 10 lần',      target: 10,   unit: 'lần',   val: s => s.bossWins },
  { id: 'listen5',   icon: '🎧', name: '5 đề nghe',       desc: 'Hoàn thành trọn 5 đề luyện nghe',        target: 5,    unit: 'đề',    val: s => s.listenDone },
  { id: 'lessons50', icon: '📚', name: '50 bài đã học',   desc: 'Mở học 50 bài học',                      target: 50,   unit: 'bài',   val: s => s.seen },
  { id: 'xp1000',    icon: '💎', name: '1.000 XP',        desc: 'Tích lũy tổng 1.000 XP học tập',         target: 1000, unit: 'XP',    val: s => s.xpTotal },
  { id: 'level',     icon: '🎓', name: 'Trọn một cấp độ', desc: 'Mọi bài của một cấp đều đạt điểm ≥ 70%', target: 1,    unit: 'cấp',   val: s => s.levelsDone.length },
  { id: 'top3',      icon: '👑', name: 'Top 3 tuần',      desc: 'Lọt vào top 3 XP của một tuần đã qua',   target: 1,    unit: 'tuần',  val: s => s.top3Weeks },
];
function stParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }
function stJstDay(ms) { return new Date(ms + 9 * 3600 * 1000).toISOString().slice(0, 10); }
function stToday() { return stJstDay(Date.now()); }
function stDayUtcMs(day) { const p = day.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
function stShift(day, n) { return new Date(stDayUtcMs(day) + n * 86400000).toISOString().slice(0, 10); }
function stWeekKey(day) { const ms = stDayUtcMs(day); const dow = (new Date(ms).getUTCDay() + 6) % 7; return new Date(ms - dow * 86400000).toISOString().slice(0, 10); }
const ST_DAY_OK = /^\d{4}-\d{2}-\d{2}$/;
function stCompute(rows) {
  const prog = stParse(rows['hn_prog_v1'] ? rows['hn_prog_v1'].value : null) || {};
  const srs = stParse(rows['hn_srs_v1'] ? rows['hn_srs_v1'].value : null) || {};
  const game = stParse(rows['hn_game_v1'] ? rows['hn_game_v1'].value : null) || {};
  const days = new Set();
  Object.keys(prog.days || {}).forEach(d => { if (ST_DAY_OK.test(d)) days.add(d); });
  Object.keys(srs.n || {}).forEach(d => { if (ST_DAY_OK.test(d)) days.add(d); });
  Object.keys(game.d || {}).forEach(d => { if (ST_DAY_OK.test(d)) days.add(d); });
  // --- Chuỗi ngày học: hiện tại (hôm nay chưa học thì tính tới hôm qua) + dài nhất
  const today = stToday();
  let streakCur = 0, anchor = null;
  if (days.has(today)) anchor = today;
  else if (days.has(stShift(today, -1))) anchor = stShift(today, -1);
  if (anchor) { let d = anchor; while (days.has(d)) { streakCur++; d = stShift(d, -1); } }
  let streakBest = 0;
  { const sorted = [...days].sort(); let run = 0, prev = null;
    for (const d of sorted) { run = (prev && stShift(prev, 1) === d) ? run + 1 : 1; if (run > streakBest) streakBest = run; prev = d; } }
  // --- XP: cộng dồn theo tuần/tháng JST + bản đồ XP theo tuần (cho huy hiệu Top 3)
  const wkNow = stWeekKey(today), moNow = today.slice(0, 7);
  let xpTotal = 0, xpWeek = 0, xpMonth = 0; const xpByWeek = {};
  function addXp(day, amt) {
    if (!amt) return;
    xpTotal += amt;
    if (!day || !ST_DAY_OK.test(day)) return;
    const w = stWeekKey(day); xpByWeek[w] = (xpByWeek[w] || 0) + amt;
    if (w === wkNow) xpWeek += amt;
    if (day.slice(0, 7) === moNow) xpMonth += amt;
  }
  const bestMap = (prog.best && typeof prog.best === 'object') ? prog.best : {};
  for (const id of Object.keys(bestMap)) {
    const b = bestMap[id] || {}; const ok = +b.ok || 0;
    if (ok > 0) addXp(b.t ? stJstDay(+b.t) : null, ok * ST_XP.quizOk);
  }
  let newCards = 0; const nMap = (srs.n && typeof srs.n === 'object') ? srs.n : {};
  for (const d of Object.keys(nMap)) {
    if (!ST_DAY_OK.test(d)) continue;
    let cnt = 0; const decks = nMap[d] || {};
    for (const k of Object.keys(decks)) cnt += (+decks[k] || 0);
    newCards += cnt;
    if (cnt > 0) addXp(d, cnt * ST_XP.newCard);
  }
  let wordsMastered = 0, cardsKnown = 0; const cMap = (srs.c && typeof srs.c === 'object') ? srs.c : {};
  for (const id of Object.keys(cMap)) { const cd = cMap[id] || {}; if ((+cd.reps || 0) >= 1) cardsKnown++; if ((+cd.reps || 0) >= 2) wordsMastered++; }
  // --- Đề nghe hoàn thành: phiếu có dấu __done do web đóng khi chấm đủ 100% câu
  const doneVids = new Set(); const xpDoneVids = new Set();
  for (const k of Object.keys(rows)) {
    const m = k.match(/^hn_choukai_(?:mark_)?(.+)$/); if (!m) continue;
    const v = stParse(rows[k].value);
    if (v && v.__done) { doneVids.add(m[1]); if (!xpDoneVids.has(m[1])) { xpDoneVids.add(m[1]); addXp(stJstDay(+v.__done), ST_XP.listen); } }
  }
  // --- Thắng trùm: tổng theo bài (w), XP theo ngày (d)
  let bossWins = 0; const wMap = (game.w && typeof game.w === 'object') ? game.w : {};
  for (const id of Object.keys(wMap)) bossWins += (+wMap[id] || 0);
  const dMap = (game.d && typeof game.d === 'object') ? game.d : {};
  for (const d of Object.keys(dMap)) { if (ST_DAY_OK.test(d)) addXp(d, (+dMap[d] || 0) * ST_XP.boss); }
  // --- Bài đã học + hoàn thành cấp độ (điểm tốt nhất từng bài ≥ 70%, đủ mọi bài của cấp)
  const seen = Object.keys(prog.seen || {}).length;
  const ratio = {};
  for (const id of Object.keys(bestMap)) {
    const base = id.split('#')[0]; const b = bestMap[id] || {};
    const r = b.n ? (+b.ok || 0) / (+b.n) : 0;
    if (ratio[base] == null || r > ratio[base]) ratio[base] = r;
  }
  const levelsDone = [];
  for (const lv of Object.keys(ST_LEVELS)) {
    const ids = ST_LEVELS[lv]; let okN = 0;
    for (const id of ids) if ((ratio[id] || 0) >= 0.7) okN++;
    if (ids.length && okN === ids.length) levelsDone.push(lv);
  }
  return { streakCur, streakBest, xpWeek, xpMonth, xpTotal, xpByWeek, newCards, wordsMastered, cardsKnown, listenDone: doneVids.size, bossWins, seen, levelsDone, daysCount: days.size, top3Weeks: 0 };
}
async function stLoadAll(env) {
  const byUser = {};
  const r = await env.DB.prepare('SELECT user_id,pkey,value,updated_at FROM user_progress').all();
  for (const row of (r.results || [])) (byUser[row.user_id] = byUser[row.user_id] || {})[row.pkey] = { value: row.value, updated_at: row.updated_at };
  const us = await env.DB.prepare("SELECT id FROM users WHERE status='approved'").all();
  const out = {};
  for (const u of (us.results || [])) out[u.id] = stCompute(byUser[u.id] || {});
  // Huy hiệu Top 3: với mỗi tuần ĐÃ kết thúc, ai ở top 3 XP tuần đó (XP > 0)
  const wkNow = stWeekKey(stToday());
  const weeks = new Set();
  for (const uid of Object.keys(out)) for (const w of Object.keys(out[uid].xpByWeek)) if (w < wkNow) weeks.add(w);
  for (const w of weeks) {
    const ranked = Object.keys(out).filter(uid => (out[uid].xpByWeek[w] || 0) > 0)
      .sort((a, b) => (out[b].xpByWeek[w] - out[a].xpByWeek[w]) || (out[b].xpTotal - out[a].xpTotal));
    ranked.slice(0, 3).forEach(uid => { out[uid].top3Weeks++; });
  }
  return out;
}
function stEarned(s) { return ST_BADGES.filter(b => b.val(s) >= b.target).map(b => b.id); }
async function handleStats(req, env, c, path) {
  if (!env.DB) return J({ error: 'Chưa cấu hình cơ sở dữ liệu (D1).' }, 503, c.h);
  await ensureStats(env);
  const s = await sessionUser(env, bearer(req));
  if (!s || s.kind !== 'user') return J({ error: 'Chưa đăng nhập' }, 401, c.h);
  if (s.status === 'locked' || s.status === 'rejected') return J({ error: 'Tài khoản không còn hiệu lực' }, 403, c.h);
  if (s.status !== 'approved') return J({ error: 'Tài khoản chưa được duyệt' }, 403, c.h);
  const me = s.user_id;
  if (path === '/stats/me' && req.method === 'GET') {
    const all = await stLoadAll(env);
    const mine = all[me] || stCompute({});
    const earned = stEarned(mine);
    const g = await env.DB.prepare('SELECT badge_id,granted_at FROM badge_grants WHERE user_id=?').bind(me).all();
    const granted = {}; (g.results || []).forEach(r => { granted[r.badge_id] = r.granted_at; });
    const newBadges = [];
    const t = now();
    for (const bid of earned) {
      if (granted[bid]) continue;
      await env.DB.prepare('INSERT OR IGNORE INTO badge_grants(user_id,badge_id,granted_at) VALUES(?,?,?)').bind(me, bid, t).run();
      // Báo qua hệ thống thông báo trong trang của mục Cộng đồng (loại 'badge';
      // comment_id giữ mã huy hiệu; actor là chính học viên như mốc thành tích cá nhân).
      await env.DB.prepare('INSERT INTO notifications(id,user_id,actor_id,type,post_id,comment_id,created_at) VALUES(?,?,?,?,?,?,?)')
        .bind(crypto.randomUUID(), me, me, 'badge', null, bid, t).run();
      granted[bid] = t; newBadges.push(bid);
    }
    const pub = { streakCur: mine.streakCur, streakBest: mine.streakBest, xpWeek: mine.xpWeek, xpMonth: mine.xpMonth, xpTotal: mine.xpTotal, newCards: mine.newCards, wordsMastered: mine.wordsMastered, cardsKnown: mine.cardsKnown, listenDone: mine.listenDone, bossWins: mine.bossWins, seen: mine.seen, levelsDone: mine.levelsDone, daysCount: mine.daysCount };
    const badges = ST_BADGES.map(b => ({ id: b.id, icon: b.icon, name: b.name, desc: b.desc, target: b.target, unit: b.unit, value: Math.min(b.val(mine), b.target), rawValue: b.val(mine), earned: earned.includes(b.id), granted_at: granted[b.id] || null }));
    return J({ ok: true, stats: pub, badges, newBadges }, 200, c.h);
  }
  if (path === '/stats/leaderboard' && req.method === 'GET') {
    const url = new URL(req.url);
    const cat = url.searchParams.get('cat') || 'week';
    const lim = Math.min(20, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10) || 20));
    const valOf = st => cat === 'month' ? st.xpMonth : cat === 'total' ? st.xpTotal : cat === 'streak' ? st.streakCur : cat === 'words' ? st.wordsMastered : cat === 'boss' ? st.bossWins : cat === 'listen' ? st.listenDone : st.xpWeek;
    const tieOf = st => cat === 'streak' ? st.streakBest : st.xpTotal;
    const all = await stLoadAll(env);
    const rows = Object.keys(all).map(uid => ({ uid, v: valOf(all[uid]), tb: tieOf(all[uid]) }));
    rows.sort((a, b) => (b.v - a.v) || (b.tb - a.tb) || (a.uid < b.uid ? -1 : 1));
    rows.forEach((r, i) => { r.rank = i + 1; });
    const top = [];
    for (const r of rows.filter(r => r.v > 0).slice(0, lim)) {
      const p = await cmProfile(env, r.uid);
      top.push({ rank: r.rank, name: p.name, avatar_file: p.avatar_file, value: r.v, me: r.uid === me });
    }
    let meRow = null;
    const mine = rows.find(r => r.uid === me);
    if (mine) { const p = await cmProfile(env, me); meRow = { rank: mine.rank, name: p.name, avatar_file: p.avatar_file, value: mine.v, inTop: top.some(r => r.me) }; }
    return J({ ok: true, cat, list: top, me: meRow }, 200, c.h);
  }
  return J({ error: 'Không tìm thấy API' }, 404, c.h);
}


// ===== Học thử miễn phí (29/10/2026, Khánh duyệt): người chưa đăng nhập đọc được
// N5 toàn bộ, N4 nửa đầu mỗi phần (ceil(n/2)), N3/N2/N1 chỉ bài 1 mỗi phần. Allowlist tính ở server.
const FREE_SITE='https://nhabaovieck7-cpu.github.io/hoc-tieng-nhat/';
const FREE_LEVELS=['n5','n4','n3','n2','n1'],FREE_SECTIONS=['np','tv','kj','kaiwa','dokkai','tonghop'];
// Bộ đọc literal JS an toàn (không eval): lấy mọi object cấp ngoài cùng trong lessons.js
function freeParseObjs(t){
  let i=0;const n=t.length,out=[];
  const ws=()=>{for(;;){while(i<n&&/\s/.test(t[i]))i++;if(t[i]==='/'&&t[i+1]==='/'){while(i<n&&t[i]!=='\n')i++}else if(t[i]==='/'&&t[i+1]==='*'){i=t.indexOf('*/',i+2);i=i<0?n:i+2}else return}};
  const str=()=>{const q=t[i++];let s='';while(i<n&&t[i]!==q){if(t[i]==='\\'){const c=t[++i];i++;if(c==='n')s+='\n';else if(c==='t')s+='\t';else if(c==='r')s+='\r';else if(c==='u'){s+=String.fromCharCode(parseInt(t.substr(i,4),16));i+=4}else if(c==='\n'){}else s+=c}else s+=t[i++]}i++;return s};
  const val=()=>{ws();const c=t[i];
    if(c==='{'){i++;const o={};for(;;){ws();if(t[i]==='}'){i++;return o}let k;if(t[i]==='"'||t[i]==="'")k=str();else{const m=/^[A-Za-z_$][\w$]*/.exec(t.slice(i,i+64));if(!m)throw new Error('key@'+i);k=m[0];i+=k.length}ws();if(t[i++]!==':')throw new Error(':@'+i);o[k]=val();ws();if(t[i]===',')i++}}
    if(c==='['){i++;const a=[];for(;;){ws();if(t[i]===']'){i++;return a}a.push(val());ws();if(t[i]===',')i++}}
    if(c==='"'||c==="'")return str();
    const m=/^(-?\d+(\.\d+)?([eE][-+]?\d+)?|true|false|null)/.exec(t.slice(i,i+32));if(!m)throw new Error('val@'+i);i+=m[0].length;return JSON.parse(m[0])};
  while(i<n){ws();if(i>=n)break;const c=t[i];
    if(c==='{'){try{const o=val();if(o&&o.id)out.push(o)}catch(e){i++}}
    else if(c==='"'||c==="'")str();else i++}
  return out;
}
function freeSecOf(x){const ty=String(x.type||''),id=String(x.id||'');if(/Hội thoại|kaiwa|kaigo/i.test(ty)||/^kaiwa-/.test(id))return 'kaiwa';if(/Đọc hiểu/i.test(ty)||/dokkai/.test(id))return 'dokkai';if(/Tổng hợp/i.test(ty)||/tonghop/.test(id))return 'tonghop';return ''}
const _freeMem=new Map();const _freeRl=new Map();
function freeCount(level,total){if(level==='n5')return total;if(level==='n4')return Math.ceil(total/2);return Math.min(1,total)}
async function freeLoad(env,level,section){
  const extra=['kaiwa','dokkai','tonghop'].includes(section);
  const name=extra?'lessons':'course_'+level+'_'+section;
  const meta=await (await fetch(FREE_SITE+'enc/meta.json',{cf:{cacheTtl:300}})).json();
  const v=(meta.v||{})[name];if(!v)throw new Error('no-pack');
  const k=name+'@'+v;let all=_freeMem.get(k);
  if(!all){
    const r=await fetch(FREE_SITE+'enc/'+name+'.bin?v='+v,{cf:{cacheTtl:3600}});if(!r.ok)throw new Error('fetch '+r.status);
    const t=new TextDecoder().decode(await gunzipBytes(await gcmDecrypt(env,new Uint8Array(await r.arrayBuffer()))));
    all=freeParseObjs(t);for(const key of _freeMem.keys())if(key.startsWith(name+'@'))_freeMem.delete(key);_freeMem.set(k,all);
  }
  const arr=extra?all.filter(x=>freeSecOf(x)===section&&String(x.level||'').toLowerCase()===level).sort((a,b)=>String(a.id).localeCompare(String(b.id),'en',{numeric:true})):all;
  return {v,lessons:arr};
}

// /free/news: tin tức công khai; phần luyện tập (dịch, đọc hiểu, nghe...) chỉ mở cho 1 tin/ngày (tin đầu tiên của hôm nay, JST).
const FREE_NEWS_BASE=['id','date','tab','sample','h','ex','vi','vo','src'];
async function freeNews(env,c){
  const meta=await (await fetch(FREE_SITE+'enc/meta.json',{cf:{cacheTtl:300}})).json();
  const v=(meta.v||{}).news;if(!v)throw new Error('no-pack');
  const k='news@'+v;let all=_freeMem.get(k);
  if(!all){
    const r=await fetch(FREE_SITE+'enc/news.bin?v='+v,{cf:{cacheTtl:600}});if(!r.ok)throw new Error('fetch '+r.status);
    const t=new TextDecoder().decode(await gunzipBytes(await gcmDecrypt(env,new Uint8Array(await r.arrayBuffer()))));
    all=freeParseObjs(t);for(const key of _freeMem.keys())if(key.startsWith('news@'))_freeMem.delete(key);_freeMem.set(k,all);
  }
  const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
  const pick=all.find(n=>n.date===today&&(n.tr||(n.qs&&n.qs.length)||Object.keys(n).some(x=>!FREE_NEWS_BASE.includes(x))));
  const news=all.map(n=>{if(pick&&n.id===pick.id)return Object.assign({},n,{practice:true});const o={};for(const f of FREE_NEWS_BASE)if(n[f]!==undefined)o[f]=n[f];o.practice=false;return o});
  return {ok:true,today,practiceId:pick?pick.id:null,news};
}
async function handleFree(req,env,c,path){
  if(req.method!=='GET')return J({error:'Chỉ nhận GET'},405,c.h);
  const ip=req.headers.get('CF-Connecting-IP')||'?';const now=Date.now();
  let e=_freeRl.get(ip);if(!e||now-e.t>60000){e={t:now,n:0};_freeRl.set(ip,e)}
  if(_freeRl.size>5000)_freeRl.clear();
  let over=++e.n>60;
  if(!over&&env.FREE_RL){try{const r=await env.FREE_RL.limit({key:'free:'+ip});if(!r.success)over=true}catch(_){}}
  if(over)return J({error:'Quá nhiều yêu cầu, thử lại sau 1 phút'},429,Object.assign({'Retry-After':'60'},c.h));
  if(path==='/free/news'){
    const cache=caches.default;const ck=new Request(new URL(req.url).origin+'/free/news',{method:'GET'});
    const hit=await cache.match(ck);if(hit){const h=new Response(hit.body,hit);for(const[k2,v2]of Object.entries(c.h))h.headers.set(k2,v2);return h}
    let body;try{body=await freeNews(env,c)}catch(err){return J({error:'Không tải được tin tức'},502,c.h)}
    await cache.put(ck,new Response(JSON.stringify(body),{headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=300'}}));
    return J(body,200,Object.assign({'Cache-Control':'public, max-age=300'},c.h));
  }
  const u=new URL(req.url);const level=(u.searchParams.get('level')||'').toLowerCase(),section=(u.searchParams.get('section')||'').toLowerCase();
  if(!FREE_LEVELS.includes(level)||!FREE_SECTIONS.includes(section))return J({error:'level phải là n5..n1, section phải là np|tv|kj|kaiwa|dokkai|tonghop'},400,c.h);
  const cache=caches.default;const ck=new Request(u.toString(),{method:'GET'});
  const hit=await cache.match(ck);if(hit){const h=new Response(hit.body,hit);for(const[k2,v2]of Object.entries(c.h))h.headers.set(k2,v2);return h}
  let pack;try{pack=await freeLoad(env,level,section)}catch(err){return J({error:'Không tải được bài'},502,c.h)}
  const L=pack.lessons,nFree=freeCount(level,L.length);
  const ok=(i)=>i<nFree;
  let body,status=200;
  if(path==='/free/list'){
    body={ok:true,level,section,total:L.length,freeCount:nFree,lessons:L.map((x,i)=>({id:x.id,n:i+1,title:x.title,free:ok(i)}))};
  }else if(path==='/free/lesson'){
    const id=u.searchParams.get('id')||'';const i=L.findIndex(x=>x.id===id);
    if(i<0){status=404;body={error:'Không có bài này'}}
    else if(!ok(i)){status=403;body={error:'Bài này cần đăng nhập',locked:true,id}}
    else body={ok:true,level,section,n:i+1,total:L.length,lesson:L[i]};
  }else return J({error:'Không tìm thấy API free'},404,c.h);
  const res=J(body,status,Object.assign({'Cache-Control':status===200||status===403?'public, max-age=10800':'no-store'},c.h));
  if(status===200||status===403){const cr=new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=10800'}});await cache.put(ck,cr)}
  return res;
}

export default {async fetch(req,env){
  const c=cors(env,req);
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers:c.h});
  const url=new URL(req.url);
  let path=url.pathname.replace(/\/+$/,'')||'/';
  if(path.startsWith('/auth'))return handleAuth(req,env,c,path);
  if(path==='/progress')return handleProgress(req,env,c);
  if(path==='/hoso')return handleHoso(req,env,c);
  if(path.startsWith('/stats/'))return handleStats(req,env,c,path);
  if(path.startsWith('/community')||path.startsWith('/chat')||path.startsWith('/friends'))return handleCommunity(req,env,c,path);
  if(path.startsWith('/job/'))return handleJob(req,env,c,path);
  if(path.startsWith('/free/'))return handleFree(req,env,c,path);
  if(path==='/'||path==='/ai')return handleAI(req,env,c);
  return J({error:'Không tìm thấy',paths:['/','/ai','/auth/*']},404,c.h);
}};
