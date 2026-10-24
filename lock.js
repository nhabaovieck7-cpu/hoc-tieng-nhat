// Khoá trang: giải mã nội dung bằng Mã khoá (AES-GCM, PBKDF2-SHA256)
const LOCK=(()=>{const KS='hn_key_v1';let key=null,meta=null;
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0)),u64=a=>btoa(String.fromCharCode(...new Uint8Array(a)));
const getMeta=async()=>meta||(meta=await (await fetch('enc/meta.json',{cache:'no-cache'})).json());
const dec=async(k,buf)=>new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:buf.slice(0,12)},k,buf.slice(12)));
async function tryKey(k){await dec(k,b64(meta.check));return k}
async function derive(pw){const m=await getMeta();const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(m.salt),iterations:m.iter,hash:'SHA-256'},base,{name:'AES-GCM',length:256},true,['decrypt'])}
async function load(name){const m=await getMeta();const r=await fetch('enc/'+name+'.bin?v='+(m.v[name]||''));const z=await dec(key,new Uint8Array(await r.arrayBuffer()));const t=await new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
 const s=document.createElement('script');s.textContent=t;document.head.appendChild(s)}
function lockAgain(){localStorage.removeItem(KS);location.reload()}
function screen(){return new Promise(res=>{const d=document.createElement('div');d.className='lockscr';
 d.innerHTML='<form class="lockbox"><div class="lockico">🔒</div><h1>'+(typeof SITE!='undefined'?SITE.title:'')+'</h1><p>Trang này cần mã khoá để xem nội dung.</p><input id="lkpw" type="password" autocomplete="current-password" placeholder="Mã khoá" aria-label="Mã khoá"><button type="submit">Mở khoá</button><div class="lkerr" id="lkerr"></div></form>';
 document.body.appendChild(d);const f=d.querySelector('form'),i=d.querySelector('#lkpw'),e=d.querySelector('#lkerr'),b=d.querySelector('button');setTimeout(()=>i.focus(),50);
 f.onsubmit=async ev=>{ev.preventDefault();if(!i.value)return;b.disabled=true;b.textContent='Đang mở…';e.textContent='';
  try{const k=await tryKey(await derive(i.value));localStorage.setItem(KS,u64(await crypto.subtle.exportKey('raw',k)));d.remove();res(k)}
  catch(x){e.textContent='Mã khoá không đúng. Vui lòng thử lại.';i.value='';i.focus();b.disabled=false;b.textContent='Mở khoá'}}})}
async function run(files){document.documentElement.classList.add('locked');await getMeta();
 const s=localStorage.getItem(KS);if(s){try{key=await tryKey(await crypto.subtle.importKey('raw',b64(s),'AES-GCM',true,['decrypt']))}catch(e){localStorage.removeItem(KS)}}
 if(!key)key=await screen();
 for(const f of files)await load(f);
 document.documentElement.classList.remove('locked');
 const m=document.getElementById('main');const s2=document.createElement('script');s2.textContent=m.textContent;document.body.appendChild(s2);
 const tb=document.querySelector('.topbar .nav');if(tb){const a=document.createElement('a');a.href='#';a.className='lockbtn';a.textContent='🔒 Khoá lại';a.title='Khoá lại trang trên thiết bị này';a.onclick=e=>{e.preventDefault();lockAgain()};tb.appendChild(a)}
 dispatchEvent(new Event('unlocked'))}
return {run,load,lockAgain}})();
