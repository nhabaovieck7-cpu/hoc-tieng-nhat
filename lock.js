// Khoá trang: chỉ mở khi phiên đăng nhập hợp lệ (học viên đã duyệt hoặc admin).
// Mã hoá AES-GCM giữ nguyên; WEB_PASSWORD chỉ dùng lúc build (không nhập trên web).
const LOCK=(()=>{const KS='hn_key_v1',SS='hn_sess_v1',AS='hn_admin_sess_v1';let key=null,meta=null,netFail=false;
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const getMeta=async()=>meta||(meta=await (await fetch('enc/meta.json',{cache:'no-cache'})).json());
const dec=async(k,buf)=>new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:buf.slice(0,12)},k,buf.slice(12)));
async function tryKey(k){await dec(k,b64(meta.check));return k}
async function importContentKey(rawB64){
  await getMeta();
  const k=await crypto.subtle.importKey('raw',b64(rawB64),'AES-GCM',true,['decrypt']);
  await tryKey(k);
  localStorage.setItem(KS,rawB64);
  key=k;return true;
}
function clearStoredKey(){try{localStorage.removeItem(KS)}catch(e){} key=null}
function clearBadSession(which){
  try{if(which==='user'||which==='all')localStorage.removeItem(SS)}catch(e){}
  try{if(which==='admin'||which==='all')localStorage.removeItem(AS)}catch(e){}
}
/** Mỗi lần vào trang: xác thực /auth/me — không tin hn_key_v1 lưu sẵn. */
async function verifySession(){
  netFail=false;
  const ep=(typeof SITE!='undefined'&&SITE.aiEndpoint)||'';
  if(!ep){clearStoredKey();return null}
  const base=ep.replace(/\/$/,'');
  const tries=[
    {tok:localStorage.getItem(AS),kind:'admin'},
    {tok:localStorage.getItem(SS),kind:'user'},
  ].filter(x=>x.tok);
  if(!tries.length){clearStoredKey();return null}
  let answered=false;
  for(const t of tries){
    try{
      const r=await fetch(base+'/auth/me',{headers:{Authorization:'Bearer '+t.tok}});
      answered=true;
      const j=await r.json().catch(()=>({}));
      if(!r.ok){
        // Chỉ xoá phiên khi máy chủ thật sự trả lời từ chối (401/403…).
        clearBadSession(t.kind);
        continue;
      }
      const st=(j.user&&j.user.status)||j.status||'';
      // Chỉ approved (học viên) hoặc admin mới có contentKey
      if(j.contentKey && (st==='approved' || (j.user&&j.user.method==='admin') || t.kind==='admin')){
        try{await importContentKey(j.contentKey);return key}catch(e){clearStoredKey();continue}
      }
      // pending / rejected / locked / không có key → không mở nội dung
      if(t.kind==='user' && st && st!=='approved'){
        clearStoredKey();
        // giữ session để trang đăng nhập/chờ duyệt còn nhận diện
        return null;
      }
      clearStoredKey();
    }catch(e){/* lỗi mạng: không xoá phiên/khoá ở đây — xử lý thống nhất bên dưới */}
  }
  if(!answered){
    // Không gọi được máy chủ lần nào (mất mạng): thử khoá nội dung đã lưu trong máy (học offline).
    netFail=true;
    const saved=localStorage.getItem(KS);
    if(saved){try{await importContentKey(saved);return key}catch(e){}}
    return null;
  }
  clearStoredKey();
  return null;
}
// Tăng tốc (29/10): tải sẵn các gói .bin song song với bước xác thực /auth/me; trang chủ dùng danh sách bài rút gọn
// (lessons-meta.js, công khai, cùng mã phiên bản) thay cho gói lessons 1MB — lệch phiên bản thì tải gói đầy đủ như cũ.
const pre={};
const binUrl=(m,name)=>'enc/'+name+'.bin?v='+(m.v[name]||'');
function liteOk(m,name){const L=window.LESSONS_META;return name==='lessons'&&L&&L.v&&L.v===m.v.lessons&&Array.isArray(L.list)}
function prefetch(m,files){for(const f of files){if(pre[f]||liteOk(m,f))continue;pre[f]=fetch(binUrl(m,f)).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status+' khi tải gói '+f);return r.arrayBuffer()});pre[f].catch(()=>{})}}
async function load(name){const m=await getMeta();
 if(liteOk(m,name)){window.LESSONS=window.LESSONS_META.list;return}
 let ab;if(pre[name]){ab=await pre[name];delete pre[name]}else{const r=await fetch(binUrl(m,name));if(!r.ok)throw new Error('HTTP '+r.status+' khi tải gói '+name);ab=await r.arrayBuffer()}
 const z=await dec(key,new Uint8Array(ab));const t=await new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
 const s=document.createElement('script');s.textContent=t;document.head.appendChild(s)}
function lockAgain(){clearStoredKey();location.reload()}
function screen(){
  return new Promise(()=>{ // không resolve — phải đăng nhập
    if(document.querySelector('.lockscr'))return;
    const d=document.createElement('div');d.className='lockscr';
    const title=(typeof SITE!='undefined'?SITE.title:'');
    d.innerHTML='<div class="lockbox"><div class="lockico">🔒</div><h1>'+title+'</h1>'+
      '<p>Chưa đăng nhập thì không xem được nội dung. Hãy đăng nhập bằng tài khoản đã được duyệt để học.</p>'+
      '<a class="lockcta" href="dang-nhap.html">Đăng nhập / Đăng ký</a>'+
      '<div class="lkerr" id="lkerr"></div></div>';
    document.body.appendChild(d);
  });
}
function errScreen(msg){
  if(document.querySelector('.lockscr'))return;
  const d=document.createElement('div');d.className='lockscr';
  const title=(typeof SITE!='undefined'?SITE.title:'');
  d.innerHTML='<div class="lockbox"><div class="lockico">\u26A0\uFE0F</div><h1>'+title+'</h1>'+
    '<p>'+msg+'</p>'+
    '<button type="button" id="lkRetry">Thử lại</button>'+
    '<p class="lkalt"><a href="index.html">Về trang chủ</a> · <a href="dang-nhap.html">Đăng nhập</a></p></div>';
  document.body.appendChild(d);
  d.querySelector('#lkRetry').onclick=()=>location.reload();
}
function guestLock(e){
  if(document.querySelector('.lockscr'))return;
  const d=document.createElement('div');d.className='lockscr';
  d.innerHTML='<div class="lockbox"><div class="lockico">🔒</div><h1>'+((e&&e.title)||'Bài này cần đăng ký')+'</h1>'+
    '<p>'+((e&&e.msg)||'Bài học thử miễn phí: N5 toàn bộ, N4 nửa đầu, N3–N1 bài 1 mỗi phần. Đăng ký bằng Google, Khánh duyệt là học được hết.')+'</p>'+
    '<a class="lockcta" href="dang-nhap.html">Đăng ký để học tiếp</a>'+
    '<p class="lkalt"><a href="hoc-thu.html">Xem các bài học thử</a> · <a href="index.html">Trang chủ</a></p></div>';
  document.body.appendChild(d);
}
// Gọi API học thử công khai; 429 thì chờ đúng Retry-After (tối đa 2 lần).
async function free(path){
  const ep=((typeof SITE!='undefined'&&SITE.aiEndpoint)||'').replace(/\/$/,'');
  for(let i=0;i<3;i++){
    let r;try{r=await fetch(ep+path)}catch(x){throw new Error('Mất kết nối mạng — không tải được bài học thử. Bấm Thử lại.')}
    if(r.status===429&&i<2){const w=Math.min(30,+(r.headers.get('Retry-After')||5));await new Promise(ok=>setTimeout(ok,w*1000));continue}
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.ok)return j;
    if(r.status===403)throw Object.assign(new Error('locked'),{locked:true,id:j.id});
    if(r.status===404)throw new Error('Không có bài học này. <a href="hoc-thu.html">Xem danh sách bài học thử</a>.');
    if(r.status===429)throw new Error('Đang có quá nhiều lượt mở bài. Chờ một chút rồi bấm Thử lại.');
    throw new Error('Máy chủ chưa tải được bài học (mã '+r.status+'). Bấm Thử lại sau ít phút.');
  }
}
async function run(files,opt){
  document.documentElement.classList.add('locked');
  try{
    const m0=await getMeta();
    try{if(localStorage.getItem(SS)||localStorage.getItem(AS))prefetch(m0,files)}catch(e){}
    key=await verifySession();
  }catch(e){
    errScreen('Không tải được dữ liệu mở khoá. Có thể do mạng chập chờn — kiểm tra kết nối rồi bấm Thử lại.');
    return;
  }
  if(!key){
    if(netFail){
      errScreen('Đang mất kết nối mạng và máy này chưa lưu sẵn khoá nội dung nên chưa mở được bài học. Hãy nối mạng rồi bấm Thử lại.');
      return;
    }
    clearStoredKey();
    // Học thử (29/10): trang nào cho khách thì opt.guest() nạp dữ liệu công khai (Worker /free/*), không cần khoá.
    if(opt&&opt.guest){
      window.HN_GUEST=true;document.documentElement.classList.add('guest');
      let r;
      try{r=await opt.guest()}catch(e){
        if(e&&e.locked){guestLock(e);return}
        errScreen((e&&e.message)||'Không tải được bài học thử. Kiểm tra mạng rồi bấm Thử lại.');return;
      }
      document.documentElement.classList.remove('locked');
      if(r!==false){const m=document.getElementById('main');if(m){const s2=document.createElement('script');s2.textContent=m.textContent;document.body.appendChild(s2)}}
      dispatchEvent(new Event('guest'));
      return;
    }
    await screen();
    return;
  }
  try{
    for(const f of files)await load(f);
  }catch(e){
    errScreen('Không tải được nội dung của trang này — gói dữ liệu lỗi hoặc mạng chập chờn. Nếu bạn mở từ một liên kết bài học cũ, bài có thể đã đổi địa chỉ; hãy vào lại từ trang chủ.');
    return;
  }
  document.documentElement.classList.remove('locked');
  const m=document.getElementById('main');
  if(m){const s2=document.createElement('script');s2.textContent=m.textContent;document.body.appendChild(s2)}
  dispatchEvent(new Event('unlocked'));
}
return {run,free,guestLock,load,lockAgain,importContentKey,verifySession,clearStoredKey,netFailed:()=>netFail}})();
