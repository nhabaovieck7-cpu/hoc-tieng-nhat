// Cloudflare Worker: AI (Gemini) + tài khoản (D1) + admin duyệt.
// Secrets: GEMINI_API_KEY, ACCESS_TOKEN, ADMIN_PASSWORD, CONTENT_KEY_B64
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
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type, X-Access, Authorization',
      'Access-Control-Max-Age':'86400',
      'Vary':'Origin'
    }
  };
}
async function readJson(req){try{return await req.json()}catch(e){return null}}
function bearer(req){const a=req.headers.get('Authorization')||'';return a.startsWith('Bearer ')?a.slice(7).trim():''}

async function sessionUser(env,token){
  if(!token||!env.DB)return null;
  const row=await env.DB.prepare('SELECT s.kind,s.expires_at,s.user_id,u.email,u.name,u.status,u.method,u.created_at,u.last_visit FROM sessions s LEFT JOIN users u ON u.id=s.user_id WHERE s.token=?').bind(token).first();
  if(!row)return null;
  if(row.expires_at < now()){await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();return null}
  return row;
}
async function makeSession(env,userId,kind,days=30){
  const token=randB64(32);
  const exp=new Date(Date.now()+days*864e5).toISOString();
  await env.DB.prepare('INSERT INTO sessions(token,user_id,kind,expires_at) VALUES(?,?,?,?)').bind(token,userId,kind,exp).run();
  return {token,expires_at:exp};
}
function publicUser(u){return {id:u.id||u.user_id,email:u.email,name:u.name,status:u.status,method:u.method,created_at:u.created_at,last_visit:u.last_visit}}
function oauthConfigured(env,p){
  if(p==='google')return !!(env.OAUTH_GOOGLE_CLIENT_ID||'').trim();
  if(p==='facebook')return !!(env.OAUTH_FACEBOOK_APP_ID||'').trim();
  if(p==='line')return !!(env.OAUTH_LINE_CHANNEL_ID||'').trim();
  if(p==='apple')return !!(env.OAUTH_APPLE_CLIENT_ID||'').trim();
  return false;
}

async function handleAuth(req,env,c,path){
  if(!env.DB)return J({error:'Chưa cấu hình cơ sở dữ liệu tài khoản (D1).'},503,c.h);

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
    return J({ok:true,status:'pending',session:sess.token,user:publicUser({id,email,name,status:'pending',method:'email',created_at:now()})},201,c.h);
  }

  // --- login ---
  if(path==='/auth/login'&&req.method==='POST'){
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const email=String(b.email||'').trim().toLowerCase();
    const password=String(b.password||'');
    const u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
    if(!u)return J({error:'Email hoặc mật khẩu không đúng'},401,c.h);
    const hash=await pbkdf2Hash(password,u.pass_salt);
    if(hash!==u.pass_hash)return J({error:'Email hoặc mật khẩu không đúng'},401,c.h);
    if(u.status==='locked')return J({error:'Tài khoản đã bị khoá. Liên hệ Khánh.'},403,c.h);
    if(u.status==='rejected')return J({error:'Đăng ký đã bị từ chối.'},403,c.h);
    await env.DB.prepare('UPDATE users SET last_visit=? WHERE id=?').bind(now(),u.id).run();
    u.last_visit=now();
    const sess=await makeSession(env,u.id,'user');
    const out={ok:true,status:u.status,session:sess.token,user:publicUser(u)};
    if(u.status==='approved'&&env.CONTENT_KEY_B64)out.contentKey=env.CONTENT_KEY_B64;
    return J(out,200,c.h);
  }

  // --- logout ---
  if(path==='/auth/logout'&&req.method==='POST'){
    const t=bearer(req);if(t)await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(t).run();
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

  // --- oauth stub ---
  if(path.startsWith('/auth/oauth/')&&req.method==='POST'){
    const p=path.slice('/auth/oauth/'.length);
    if(!['google','facebook','line','apple'].includes(p))return J({error:'Nhà cung cấp không hỗ trợ'},400,c.h);
    if(!oauthConfigured(env,p))return J({error:'Sắp có',code:'soon',provider:p,message:'Đăng nhập bằng '+p+' sẽ mở khi Khánh cấu hình xong App ID.'},501,c.h);
    return J({error:'Sắp có',code:'soon',provider:p,message:'Handler OAuth đã sẵn sàng khung nhưng chưa nối xong.'},501,c.h);
  }

  // --- admin login ---
  if(path==='/auth/admin/login'&&req.method==='POST'){
    if(!env.ADMIN_PASSWORD)return J({error:'Chưa đặt ADMIN_PASSWORD'},503,c.h);
    const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
    const pw=String(b.password||'').trim();
    if(pw!==env.ADMIN_PASSWORD)return J({error:'Mật khẩu admin không đúng'},401,c.h);
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
    const rows=await env.DB.prepare('SELECT id,email,name,method,status,created_at,last_visit,reviewed_at FROM users WHERE status=? ORDER BY created_at DESC LIMIT 200').bind(statusFilter).all();
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

  return J({error:'Không tìm thấy API'},404,c.h);
}

async function handleAI(req,env,c){
  if(req.method!=='POST')return J({error:'Chỉ nhận POST'},405,c.h);
  if(!c.ok)return J({error:'Không được phép (origin)'},403,c.h);
  if(env.ACCESS_TOKEN&&req.headers.get('X-Access')!==env.ACCESS_TOKEN)return J({error:'Mã truy cập AI không đúng – hãy mở khoá lại trang.'},401,c.h);
  const b=await readJson(req);if(!b)return J({error:'Dữ liệu không hợp lệ'},400,c.h);
  const mode=SYS[b.mode]?b.mode:'hoi',text=String(b.text||'').slice(0,2000),ctx=String(b.ctx||'').slice(0,3000);
  if(!text.trim())return J({error:'Câu hỏi trống'},400,c.h);
  const LIM=+(env.DAILY_LIMIT||16);
  if(env.RL){const ip=req.headers.get('CF-Connecting-IP')||'x',k='rl:'+new Date().toISOString().slice(0,10)+':'+ip;const n=+(await env.RL.get(k)||0);if(n>=LIM)return J({error:'Hôm nay đã dùng hết '+LIM+' câu hỏi AI.'},429,c.h);await env.RL.put(k,String(n+1),{expirationTtl:90000})}
  const model=env.GEMINI_MODEL||'gemini-3.5-flash';
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},
   body:JSON.stringify({systemInstruction:{parts:[{text:SYS[mode]}]},contents:[{role:'user',parts:[{text:(ctx?ctx+'\n\n':'')+(mode=='dich'?'Bản dịch của học viên: ':'')+text}]}],generationConfig:{temperature:0.4,maxOutputTokens:900}})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)return J({error:r.status==429?'AI đang quá tải (giới hạn gói miễn phí), thử lại sau.':'Lỗi AI ('+r.status+')'},502,c.h);
  const reply=((j.candidates||[])[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();
  return J({reply:reply||'(AI không trả lời được câu này)'},200,c.h);
}

export default {async fetch(req,env){
  const c=cors(env,req);
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers:c.h});
  const url=new URL(req.url);
  let path=url.pathname.replace(/\/+$/,'')||'/';
  if(path.startsWith('/auth'))return handleAuth(req,env,c,path);
  // AI: "/" (tương thích cũ) hoặc "/ai"
  if(path==='/'||path==='/ai')return handleAI(req,env,c);
  return J({error:'Không tìm thấy',paths:['/','/ai','/auth/*']},404,c.h);
}};
