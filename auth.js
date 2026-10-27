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
  async function applyContentKey(b64){
    if(!b64||typeof LOCK==='undefined'||!LOCK.importContentKey)return false;
    return LOCK.importContentKey(b64);
  }
  async function register(name,email,password){
    const j=await api('/auth/register',{method:'POST',body:{name,email,password}});
    setSession(j.session);return j;
  }
  async function login(email,password){
    const j=await api('/auth/login',{method:'POST',body:{email,password}});
    setSession(j.session);
    if(j.contentKey)await applyContentKey(j.contentKey);
    return j;
  }
  async function me(){return api('/auth/me',{method:'GET'})}
  async function logout(){
    try{await api('/auth/logout',{method:'POST'})}catch(e){}
    setSession('');
    clearContentKey();
  }
  /** Đăng xuất đầy đủ: user + admin + mã nội dung, rồi reload */
  async function signOut(reload){
    if(session()){
      try{await api('/auth/logout',{method:'POST'})}catch(e){}
    }
    setSession('');
    setAdmin('');
    clearContentKey();
    if(reload!==false)location.reload();
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
  async function oauth(provider){return api('/auth/oauth/'+provider,{method:'POST',body:{}})}

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
      // session hết hạn → về trạng thái đăng nhập
      setSession('');
      paint('<a class="acctin" href="dang-nhap.html">Đăng nhập</a>');
    }
  }

  // tự gắn vào mọi trang có topbar
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>mountAccountBox());
  else mountAccountBox();

  return {register,login,logout,signOut,me,adminLogin,adminUsers,adminAction,oauth,session,sessionAdmin,setSession,setAdmin,applyContentKey,clearContentKey,api,mountAccountBox};
})();
