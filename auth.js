// Tài khoản học viên ↔ Cloudflare Worker /auth/*
const AUTH=(()=>{
  const SK='hn_sess_v1', AK='hn_admin_sess_v1';
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
  async function logout(){try{await api('/auth/logout',{method:'POST'})}catch(e){}setSession('');}
  async function adminLogin(password){
    const j=await api('/auth/admin/login',{method:'POST',body:{password}});
    setAdmin(j.session);
    if(j.contentKey){
      try{localStorage.setItem('hn_key_v1',j.contentKey)}catch(e){}
      await applyContentKey(j.contentKey);
    }
    return j;
  }
  async function adminUsers(tab){return api('/auth/admin/users?tab='+encodeURIComponent(tab||'pending'),{admin:true})}
  async function adminAction(userId,action){return api('/auth/admin/action',{method:'POST',admin:true,body:{userId,action}})}
  async function oauth(provider){return api('/auth/oauth/'+provider,{method:'POST',body:{}})}
  return {register,login,logout,me,adminLogin,adminUsers,adminAction,oauth,session,sessionAdmin,setSession,setAdmin,applyContentKey,api};
})();
