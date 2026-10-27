// Khoá trang: chỉ mở khi phiên đăng nhập hợp lệ (học viên đã duyệt hoặc admin).
// Mã hoá AES-GCM giữ nguyên; WEB_PASSWORD chỉ dùng lúc build (không nhập trên web).
const LOCK=(()=>{const KS='hn_key_v1',SS='hn_sess_v1',AS='hn_admin_sess_v1';let key=null,meta=null;
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
  const ep=(typeof SITE!='undefined'&&SITE.aiEndpoint)||'';
  if(!ep){clearStoredKey();return null}
  const base=ep.replace(/\/$/,'');
  const tries=[
    {tok:localStorage.getItem(AS),kind:'admin'},
    {tok:localStorage.getItem(SS),kind:'user'},
  ].filter(x=>x.tok);
  if(!tries.length){clearStoredKey();return null}
  for(const t of tries){
    try{
      const r=await fetch(base+'/auth/me',{headers:{Authorization:'Bearer '+t.tok}});
      const j=await r.json().catch(()=>({}));
      if(!r.ok){
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
    }catch(e){}
  }
  clearStoredKey();
  return null;
}
async function load(name){const m=await getMeta();const r=await fetch('enc/'+name+'.bin?v='+(m.v[name]||''));const z=await dec(key,new Uint8Array(await r.arrayBuffer()));const t=await new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
 const s=document.createElement('script');s.textContent=t;document.head.appendChild(s)}
function lockAgain(){clearStoredKey();location.reload()}
function screen(){
  return new Promise(()=>{ // không resolve — phải đăng nhập
    if(document.querySelector('.lockscr'))return;
    const d=document.createElement('div');d.className='lockscr';
    const title=(typeof SITE!='undefined'?SITE.title:'');
    d.innerHTML='<div class="lockbox"><div class="lockico">🔒</div><h1>'+title+'</h1>'+
      '<p>Chưa đăng nhập thì không xem được nội dung. Đăng nhập (tài khoản đã được duyệt) hoặc vào trang quản lý.</p>'+
      '<a class="lockcta" href="dang-nhap.html">Đăng nhập / Đăng ký</a>'+
      '<p class="lkalt"><a href="admin.html">Vào trang quản lý</a></p>'+
      '<div class="lkerr" id="lkerr"></div></div>';
    document.body.appendChild(d);
  });
}
async function run(files){
  document.documentElement.classList.add('locked');
  await getMeta();
  key=await verifySession();
  if(!key){
    clearStoredKey();
    await screen();
    return;
  }
  for(const f of files)await load(f);
  document.documentElement.classList.remove('locked');
  const m=document.getElementById('main');
  if(m){const s2=document.createElement('script');s2.textContent=m.textContent;document.body.appendChild(s2)}
  dispatchEvent(new Event('unlocked'));
}
return {run,load,lockAgain,importContentKey,verifySession,clearStoredKey}})();
