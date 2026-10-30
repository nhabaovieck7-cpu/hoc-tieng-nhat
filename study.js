// Ghi thời gian học (chỉ thành viên đã duyệt). Khách / admin: KHÔNG gửi gì.
// /study/start → /study/ping mỗi 60s khi trang đang hiển thị → /study/end (sendBeacon) khi rời trang.
(function(){
  if(typeof AUTH==='undefined'||typeof SITE==='undefined')return;
  if(/admin\.html$/.test(location.pathname))return;
  const tok=()=>AUTH.session();
  if(!tok())return;
  const base=(SITE.aiEndpoint||'').replace(/\/$/,'');if(!base)return;
  const KEY='hn_study_sid';
  let sid=null,timer=null,every=60e3,dead=false,busy=false,hidAt=0;
  try{sid=sessionStorage.getItem(KEY)}catch(e){}
  const pg=()=>(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'')||'index';
  const ls=()=>{const q=new URLSearchParams(location.search);return q.get('id')||q.get('lv')||undefined};
  const setSid=v=>{sid=v;try{v?sessionStorage.setItem(KEY,v):sessionStorage.removeItem(KEY)}catch(e){}};
  const stop=e=>{if(e&&(e.status===401||e.status===403)){dead=true;clearInterval(timer);timer=null}};
  async function start(){
    if(dead||!tok())return;
    try{const j=await AUTH.api('/study/start',{method:'POST',body:{page:pg(),lesson:ls()}});if(j&&j.sid){setSid(j.sid);if(j.ping_sec)every=Math.max(45,j.ping_sec)*1e3}}catch(e){stop(e)}
  }
  async function ping(){
    if(dead||busy||document.visibilityState!=='visible')return;
    if(!tok()){end();dead=true;return}
    busy=true;
    try{if(!sid)await start();else await AUTH.api('/study/ping',{method:'POST',body:{sid,page:pg(),lesson:ls()}})}
    catch(e){if(e.status===409){setSid(null);await start()}else stop(e)}
    busy=false;
  }
  function end(){
    if(!sid)return;const t=tok();if(!t)return;
    try{navigator.sendBeacon(base+'/study/end',new Blob([JSON.stringify({sid,t})],{type:'text/plain'}))}catch(e){}
    setSid(null);
  }
  function loop(){clearInterval(timer);if(!dead)timer=setInterval(ping,every)}
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible'){if(hidAt&&Date.now()-hidAt>5*60e3)setSid(null);hidAt=0;ping();loop()}
    else{hidAt=Date.now();clearInterval(timer);timer=null}
  });
  // Rời trang (iPhone Safari không bắn unload → dùng pagehide). Phiên khác trang/tab sẽ được /study/start tái dùng.
  addEventListener('pagehide',e=>{if(!e.persisted)end()});
  addEventListener('pageshow',e=>{if(e.persisted)ping()});
  // Đăng xuất: gửi end TRƯỚC khi auth.js xoá token (bắt ở pha capture).
  document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#acctOut')){end();dead=true}},true);
  window.HNSTUDY={end};
  if(document.visibilityState==='visible')ping();
  loop();
})();
