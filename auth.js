// Tài khoản học viên ↔ Cloudflare Worker /auth/*
const AUTH=(()=>{
  const SK='hn_sess_v1', AK='hn_admin_sess_v1', CK='hn_key_v1';
  const ep=()=>(typeof SITE!='undefined'&&SITE.aiEndpoint)||'';
  const base=()=>ep().replace(/\/$/,'');
  async function api(path,opts={}){
    const headers=Object.assign({'Content-Type':'application/json'},opts.headers||{});
    const tok=opts.admin?sessionAdmin():session();
    if(tok)headers.Authorization='Bearer '+tok;
    const r=await fetch(base()+path,{method:opts.method||'GET',headers,body:opts.body?JSON.stringify(opts.body):undefined});
    const j=await r.json().catch(()=>({}));
    if(!r.ok){const e=new Error(j.error||('Lỗi '+r.status));e.status=r.status;e.body=j;throw e}
    return j;
  }
  function session(){return localStorage.getItem(SK)||''}
  function sessionAdmin(){return localStorage.getItem(AK)||''}
  function setSession(t){t?localStorage.setItem(SK,t):localStorage.removeItem(SK)}
  function setAdmin(t){t?localStorage.setItem(AK,t):localStorage.removeItem(AK)}
  function clearContentKey(){try{localStorage.removeItem(CK)}catch(e){}}
  // ===== Thiết bị của hồ sơ trình duyệt này (giới hạn 2 thiết bị/tài khoản) =====
  // device_id sinh 1 lần cho mỗi hồ sơ trình duyệt, lưu local (hn_device_id) —
  // KHÔNG đồng bộ đi đâu: đăng nhập lại cùng trình duyệt = cùng thiết bị.
  const DK='hn_device_id';
  // Dự phòng cho Safari (ITP): sao lưu hn_device_id ra cookie first-party + IndexedDB,
  // đọc thì khôi phục từ nơi còn dữ liệu.
  const DCOOK='hn_device_id';
  function devCookieGet(){try{const m=document.cookie.match(/(?:^|;\s*)hn_device_id=([^;]+)/);return m?decodeURIComponent(m[1]):''}catch(e){return ''}}
  function devCookieSet(d){try{document.cookie=DCOOK+'='+encodeURIComponent(d)+';path=/;max-age=63072000;SameSite=Lax'+(location.protocol==='https:'?';Secure':'')}catch(e){}}
  function devIdb(mode,val){return new Promise(res=>{try{
    const rq=indexedDB.open('hn_device',1);
    rq.onupgradeneeded=()=>rq.result.createObjectStore('kv');
    rq.onerror=()=>res('');
    rq.onsuccess=()=>{try{const db=rq.result,tx=db.transaction('kv',mode),st=tx.objectStore('kv');
      if(mode==='readwrite'){st.put(val,DK);tx.oncomplete=()=>{db.close();res(val)};tx.onerror=()=>{db.close();res('')}}
      else{const g=st.get(DK);g.onsuccess=()=>{db.close();res(g.result||'')};g.onerror=()=>{db.close();res('')}}
    }catch(e){res('')}};
  }catch(e){res('')}})}
  function devSaveAll(d){try{localStorage.setItem(DK,d)}catch(e){}devCookieSet(d);devIdb('readwrite',d)}
  function deviceId(){
    let d='';
    try{d=localStorage.getItem(DK)||''}catch(e){}
    if(!d)d=devCookieGet();
    if(!d)d=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():('dev-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,14));
    devSaveAll(d);
    return d;
  }
  // Khi tải trang: nếu localStorage + cookie đều mất mà IndexedDB còn thì khôi phục.
  const deviceReady=(async()=>{
    let d='';try{d=localStorage.getItem(DK)||''}catch(e){}
    if(!d)d=devCookieGet();
    if(!d)d=await devIdb('readonly');
    if(d)devSaveAll(d);
    return d;
  })();
  function deviceLabel(){
    const ua=(navigator&&navigator.userAgent)||'';
    let os='Thiết bị';
    if(/iPhone/.test(ua))os='iPhone';else if(/iPad/.test(ua))os='iPad';
    else if(/Android/.test(ua))os='Điện thoại Android';else if(/Windows/.test(ua))os='Máy Windows';
    else if(/Macintosh|Mac OS X/.test(ua))os='Máy Mac';else if(/Linux/.test(ua))os='Máy Linux';
    let br='';
    if(/Edg\//.test(ua))br='Edge';else if(/OPR\/|Opera/.test(ua))br='Opera';
    else if(/CriOS/.test(ua))br='Chrome';else if(/Chrome\//.test(ua))br='Chrome';
    else if(/FxiOS/.test(ua))br='Firefox';else if(/Firefox\//.test(ua))br='Firefox';
    else if(/Safari\//.test(ua))br='Safari';
    return br?os+' · '+br:os;
  }
  function deviceBody(){return {device_id:deviceId(),device_label:deviceLabel()}}
  async function applyContentKey(b64){
    if(!b64||typeof LOCK==='undefined'||!LOCK.importContentKey)return false;
    return LOCK.importContentKey(b64);
  }
  async function register(name,email,password){
    const j=await api('/auth/register',{method:'POST',body:Object.assign({name,email,password},deviceBody())});
    setSession(j.session);return j;
  }
  async function login(email,password){
    const j=await api('/auth/login',{method:'POST',body:Object.assign({email,password},deviceBody())});
    setSession(j.session);
    if(j.contentKey)await applyContentKey(j.contentKey);
    return j;
  }
  async function me(){return api('/auth/me',{method:'GET'})}
  async function logout(){
    try{await api('/auth/logout',{method:'POST',body:deviceBody()})}catch(e){}
    setSession('');
    clearContentKey();
  }
  /** Đăng xuất đầy đủ: user + admin + mã nội dung, rồi reload.
   *  Phía máy chủ: đăng xuất chủ động sẽ gỡ luôn đăng ký thiết bị của phiên
   *  này (trống chỗ ngay cho thiết bị khác) — xem /auth/logout phía Worker. */
  async function signOut(reload){
    if(session()){
      // Không để mạng chậm giữ người dùng lại quá 4 giây.
      try{await Promise.race([api('/auth/logout',{method:'POST',body:deviceBody()}),new Promise(r=>setTimeout(r,4000))])}catch(e){}
    }
    setSession('');
    setAdmin('');
    clearContentKey();
    try{if(typeof LOCK!='undefined'&&LOCK.clearStoredKey)LOCK.clearStoredKey()}catch(e){}
    // Chuyển hẳn về trang đăng nhập thay vì reload trang đang mở khoá (tránh màn trắng).
    if(reload!==false)location.replace('dang-nhap.html');
  }
  async function adminLogin(password){
    const j=await api('/auth/admin/login',{method:'POST',body:{password}});
    setAdmin(j.session);
    if(j.contentKey){
      try{localStorage.setItem(CK,j.contentKey)}catch(e){}
      await applyContentKey(j.contentKey);
    }
    return j;
  }
  async function adminUsers(tab){return api('/auth/admin/users?tab='+encodeURIComponent(tab||'pending'),{admin:true})}
  async function adminAction(userId,action){return api('/auth/admin/action',{method:'POST',admin:true,body:{userId,action}})}
  // Bị chặn vì đủ 2 thiết bị: xem danh sách bằng vé + gỡ 1 thiết bị để hoàn tất đăng nhập.
  async function deviceTicketInfo(ticket){return api('/auth/device/ticket-info',{method:'POST',body:{login_ticket:ticket}})}
  async function deviceResolve(ticket,removeDeviceId){
    const j=await api('/auth/device/resolve',{method:'POST',body:{login_ticket:ticket,remove_device_id:removeDeviceId}});
    setSession(j.session);
    if(j.contentKey)await applyContentKey(j.contentKey);
    return j;
  }
  async function adminDevices(userId){return api('/auth/admin/devices?user_id='+encodeURIComponent(userId),{admin:true})}
  async function adminDeviceRemove(userId,deviceId){return api('/auth/admin/device-remove',{method:'POST',admin:true,body:{userId,device_id:deviceId}})}
  async function adminDeviceRemoveAll(userId){return api('/auth/admin/device-remove-all',{method:'POST',admin:true,body:{userId}})}

  function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function shortLabel(u){
    if(!u)return 'Tài khoản';
    const n=(u.name||'').trim(), e=(u.email||'').trim();
    if(n)return n;
    if(e)return e.length>22?e.slice(0,18)+'…':e;
    return 'Tài khoản';
  }

  async function mountAccountBox(){
    const wrap=document.querySelector('.topbar .wrap');
    if(!wrap)return;
    let box=document.getElementById('acctbox');
    if(!box){
      box=document.createElement('div');
      box.id='acctbox';
      box.className='acctbox';
      box.setAttribute('aria-label','Tài khoản');
      wrap.appendChild(box);
    }

    const paint=(html)=>{box.innerHTML=html};

    // Admin session ưu tiên
    if(sessionAdmin()){
      paint(
        '<span class="acctwho" title="Admin">👑 Admin</span>'+
        '<a class="acctlink" href="admin.html">Quản lý</a>'+
        '<button type="button" class="acctout" id="acctOut">Đăng xuất</button>'
      );
      box.querySelector('#acctOut').onclick=()=>signOut(true);
      return;
    }

    if(!session()){
      paint('<a class="acctin" href="dang-nhap.html">Đăng nhập</a>');
      return;
    }

    paint('<span class="acctwho">…</span><button type="button" class="acctout" id="acctOut" disabled>Đăng xuất</button>');
    try{
      const j=await me();
      const u=j.user||{};
      const label=shortLabel(u);
      const tip=esc(u.email||u.name||'');
      paint(
        '<span class="acctwho" title="'+tip+'">'+esc(label)+'</span>'+
        '<button type="button" class="acctout" id="acctOut">Đăng xuất</button>'
      );
      box.querySelector('#acctOut').onclick=()=>signOut(true);
    }catch(e){
      if(e.status===401||e.status===403){
        // Máy chủ xác nhận phiên hết hạn/không hợp lệ → mới xoá phiên.
        setSession('');
        paint('<a class="acctin" href="dang-nhap.html">Đăng nhập</a>');
      }else{
        // Lỗi mạng/tạm thời: giữ nguyên phiên, đừng bắt đăng nhập lại oan.
        paint(
          '<span class="acctwho" title="Chưa kiểm tra được tài khoản (lỗi mạng)">Tài khoản</span>'+
          '<button type="button" class="acctout" id="acctOut">Đăng xuất</button>'
        );
        box.querySelector('#acctOut').onclick=()=>signOut(true);
      }
    }
  }

  // tự gắn vào mọi trang có topbar
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>mountAccountBox());
  else mountAccountBox();

  return {register,login,logout,signOut,me,adminLogin,adminUsers,adminAction,adminDevices,adminDeviceRemove,adminDeviceRemoveAll,deviceTicketInfo,deviceResolve,deviceId,deviceReady,deviceLabel,session,sessionAdmin,setSession,setAdmin,applyContentKey,clearContentKey,api,mountAccountBox};
})();

// ===== Đồng bộ tiến độ học theo tài khoản (qua Worker /progress) =====
// CHỈ các khoá TIẾN ĐỘ mới đồng bộ: hn_prog_v1 (bài đã học/điểm/học tiếp),
// hn_srs_v1 (thẻ ôn tập SRS), hn_choukai_<vid> (phiếu nghe đã chọn),
// hn_choukai_mark_<vid> (tự đánh dấu đúng/sai), hn_game_v1 (thắng game
// Đấu trùm: {w:{bài: số lần thắng}, d:{ngày: số lần thắng}}). Khoá nội dung/phiên
// (hn_key_v1, hn_sess_v1, hn_admin_sess_v1), mã thiết bị (hn_device_id) và
// tuỳ chọn thiết bị (hn_theme, hn_furi, hn_tts_rate, hn_srs_deck, hn_ai_used)
// KHÔNG bao giờ rời máy qua kênh này.
// Chưa đăng nhập -> không làm gì cả, mọi thứ chạy local đúng như cũ.
// Mất mạng -> bỏ qua êm; lần mở trang sau tự đồng bộ lại.
const HNSYNC=(()=>{
  const META='hn_sync_meta'; // {khoá: mốc ms phía local} — chỉ ở máy này
  const EXACT={hn_prog_v1:1,hn_srs_v1:1,hn_game_v1:1};
  const isKey=k=>typeof k==='string'&&(!!EXACT[k]||k.indexOf('hn_choukai_')===0);
  const parseJ=s=>{try{return JSON.parse(s)}catch(e){return null}};
  let dirty={},dirtyDel={},timer=null,busy=false,mute=false;
  function meta(){return parseJ(localStorage.getItem(META))||{}}
  function saveMeta(m){try{localStorage.setItem(META,JSON.stringify(m))}catch(e){}}
  function rawSet(k,v){mute=true;try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}mute=false}
  function localKeys(){const out=[];try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(isKey(k))out.push(k)}}catch(e){}return out}
  // ---- Quy tắc gộp theo từng khoá (không bao giờ để máy trống ghi đè dữ liệu giàu) ----
  function pickCard(x,y){
    // thẻ SRS: hạn ôn (due) muộn hơn thắng; hoà -> reps cao hơn; hoà nữa -> ef cao hơn
    const dx=+x.due||0,dy=+y.due||0;
    if(dx!==dy)return dx>dy?x:y;
    const rx=+x.reps||0,ry=+y.reps||0;
    if(rx!==ry)return rx>ry?x:y;
    const ex=+x.ef||0,ey=+y.ef||0;
    return ex>=ey?x:y;
  }
  function mergeSRS(a,b){
    a=(a&&typeof a==='object')?a:{};b=(b&&typeof b==='object')?b:{};
    const out={c:{},n:{}};
    const ac=a.c||{},bc=b.c||{};
    Object.keys(ac).forEach(id=>{out.c[id]=ac[id]});
    Object.keys(bc).forEach(id=>{out.c[id]=out.c[id]?pickCard(out.c[id],bc[id]):bc[id]});
    const an=a.n||{},bn=b.n||{};
    Object.keys(an).concat(Object.keys(bn)).forEach(d=>{
      if(out.n[d])return;
      const ad=an[d]||{},bd=bn[d]||{},o={};
      Object.keys(ad).forEach(k=>{o[k]=ad[k]});
      Object.keys(bd).forEach(k=>{o[k]=Math.max(o[k]||0,bd[k]||0)});
      out.n[d]=o;
    });
    return out;
  }
  function mergeProg(a,b){
    a=(a&&typeof a==='object')?a:{};b=(b&&typeof b==='object')?b:{};
    const out={days:{},seen:{},best:{},last:null};
    [a.days,b.days].forEach(d=>{if(d)Object.keys(d).forEach(k=>{out.days[k]=1})});
    [a.seen,b.seen].forEach(s=>{if(s)Object.keys(s).forEach(id=>{out.seen[id]=Math.max(out.seen[id]||0,+s[id]||0)})});
    const ab=a.best||{},bb=b.best||{};
    Object.keys(ab).forEach(id=>{out.best[id]=ab[id]});
    Object.keys(bb).forEach(id=>{
      const x=out.best[id],y=bb[id];
      if(!x){out.best[id]=y;return}
      const rx=x.n?x.ok/x.n:-1,ry=y.n?y.ok/y.n:-1;
      if(rx!==ry){if(ry>rx)out.best[id]=y}
      else if((+y.t||0)>(+x.t||0))out.best[id]=y;
    });
    const la=a.last||null,lb=b.last||null;
    if(la&&lb)out.last=(out.seen[lb.id]||0)>(out.seen[la.id]||0)?lb:la;
    else out.last=lb||la;
    return out;
  }
  function countAns(o){
    if(!o||typeof o!=='object')return 0;
    let n=0;Object.keys(o).forEach(k=>{const v=o[k];if(v!==null&&v!==undefined&&v!=='')n++});
    return n;
  }
  function mergeGame(a,b){
    // game Đấu trùm: mỗi mục (theo bài / theo ngày) lấy số lớn hơn — thắng ở máy nào cũng không mất
    a=(a&&typeof a==='object')?a:{};b=(b&&typeof b==='object')?b:{};
    const out={w:{},d:{}};
    ['w','d'].forEach(sec=>{
      const am=a[sec]||{},bm=b[sec]||{};
      Object.keys(am).forEach(k=>{out[sec][k]=+am[k]||0});
      Object.keys(bm).forEach(k=>{out[sec][k]=Math.max(out[sec][k]||0,+bm[k]||0)});
    });
    return out;
  }
  function mergeVal(k,localStr,serverStr,lts,sts){
    if(serverStr==null)return localStr;
    if(localStr==null)return serverStr;
    if(localStr===serverStr)return localStr;
    if(k==='hn_game_v1'){
      const a=parseJ(localStr),b=parseJ(serverStr);
      if(a&&b)return JSON.stringify(mergeGame(a,b));
    }else if(k==='hn_srs_v1'||k==='hn_prog_v1'){
      const a=parseJ(localStr),b=parseJ(serverStr);
      if(a&&b)return JSON.stringify(k==='hn_srs_v1'?mergeSRS(a,b):mergeProg(a,b));
    }else{
      // phiếu nghe: bản đã trả lời nhiều câu hơn thắng; hoà -> bản mới hơn
      const a=parseJ(localStr),b=parseJ(serverStr);
      if(a&&b){
        const ca=countAns(a),cb=countAns(b);
        if(ca!==cb)return ca>cb?localStr:serverStr;
      }
    }
    return (lts||0)>=(sts||0)?localStr:serverStr;
  }
  // ---- Trao đổi với Worker ----
  function endpoint(){return (typeof SITE!='undefined'&&SITE.aiEndpoint||'').replace(/\/$/,'')}
  async function call(method,body,keepalive){
    const ep=endpoint();if(!ep)throw new Error('no-endpoint');
    const tok=(typeof AUTH!='undefined'&&AUTH.session)?AUTH.session():'';
    if(!tok)throw new Error('no-session');
    const r=await fetch(ep+'/progress',{method:method,headers:{'Content-Type':'application/json',Authorization:'Bearer '+tok},body:body?JSON.stringify(body):undefined,keepalive:!!keepalive});
    const j=await r.json().catch(()=>({}));
    if(!r.ok){const e=new Error(j.error||('Lỗi '+r.status));e.status=r.status;throw e}
    return j;
  }
  async function pull(){
    if(typeof AUTH=='undefined'||!AUTH.session())return false;
    let j;try{j=await call('GET')}catch(e){return false}
    if(!j||!j.items)return false;
    const m=meta(),changed=[];
    Object.keys(j.items).forEach(k=>{
      if(!isKey(k))return;
      const sv=j.items[k],sts=Date.parse(sv.u)||0;
      const lv=localStorage.getItem(k);
      const merged=mergeVal(k,lv,sv.v,m[k]||0,sts);
      if(merged!==lv){rawSet(k,merged);changed.push(k)}
      m[k]=Math.max(m[k]||0,sts);
      if(merged!==sv.v)dirty[k]=1;
    });
    localKeys().forEach(k=>{if(!j.items[k]&&!dirtyDel[k])dirty[k]=1});
    saveMeta(m);
    if(changed.length){try{document.dispatchEvent(new CustomEvent('hn-synced',{detail:{keys:changed}}))}catch(e){}}
    if(Object.keys(dirty).length||Object.keys(dirtyDel).length)schedule(600);
    return true;
  }
  async function push(unload){
    if(busy)return;
    if(typeof AUTH=='undefined'||!AUTH.session())return;
    const ks=Object.keys(dirty),ds=Object.keys(dirtyDel);
    if(!ks.length&&!ds.length)return;
    busy=true;dirty={};dirtyDel={};
    const items={};
    ks.forEach(k=>{const v=localStorage.getItem(k);if(v!=null)items[k]=v});
    try{
      const body={items:items};
      if(ds.length)body.delete=ds;
      const j=await call('POST',body,unload);
      if(j&&j.updated){const m=meta();Object.keys(j.updated).forEach(k=>{m[k]=Math.max(m[k]||0,Date.parse(j.updated[k])||0)});saveMeta(m)}
    }catch(e){
      if(e&&e.status===401){
        // Phiên đã hết hiệu lực (vd thiết bị bị gỡ): ngừng đẩy; dữ liệu local vẫn
        // nguyên, lần đăng nhập sau pull() sẽ tự gộp/đẩy lại.
      }else{
        ks.forEach(k=>{dirty[k]=1});ds.forEach(k=>{dirtyDel[k]=1});
      }
    }
    busy=false;
  }
  function schedule(ms){
    if(timer)return;
    timer=setTimeout(()=>{timer=null;push(false)},ms||2500);
  }
  function touched(k){
    if(mute||!isKey(k))return;
    const m=meta();m[k]=Date.now();saveMeta(m);
    delete dirtyDel[k];dirty[k]=1;schedule(2500);
  }
  function removedKey(k){
    if(mute||!isKey(k))return;
    delete dirty[k];dirtyDel[k]=1;schedule(2500);
  }
  // Bắt mọi lần ghi tiến độ (F.ls của features.js, phiếu nghe, trang Ôn thẻ...)
  try{
    const _set=Storage.prototype.setItem,_rem=Storage.prototype.removeItem;
    Storage.prototype.setItem=function(k,v){_set.call(this,k,v);if(this===localStorage)touched(String(k))};
    Storage.prototype.removeItem=function(k){_rem.call(this,k);if(this===localStorage)removedKey(String(k))};
  }catch(e){}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)push(true);else pull()});
  try{addEventListener('pagehide',()=>push(true))}catch(e){}
  setInterval(()=>{if(Object.keys(dirty).length||Object.keys(dirtyDel).length)push(false)},30000);
  try{addEventListener('unlocked',()=>pull())}catch(e){}
  if(typeof AUTH!='undefined'&&AUTH.session())pull();
  return {pull:pull,push:push,isKey:isKey,_merge:{srs:mergeSRS,prog:mergeProg,val:mergeVal}};
})();
