function ruby(s){return s.replace(/\{([^|}]+)\|([^}]+)\}/g,'<ruby>$1<rt>$2</rt></ruby>')}
function plain(s){return s.replace(/\{([^|}]+)\|([^}]+)\}/g,'$1$2')}
/* Bỏ furigana trên từ được hỏi (chữ in đậm/gạch chân) — tránh lộ đáp án câu 漢字読み */
function stripYomiTarget(s){return String(s||'').replace(/<(b|u|strong)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,function(_,t,a,inner){return '<'+t+(a||'')+'>'+inner.replace(/\{([^|}]+)\|[^}]+\}/g,'$1')+'</'+t+'>'})}
function prepMcqQ(q,o){var s=String(q||''); if(/<(b|u|strong)\b/i.test(s)) s=stripYomiTarget(s); return s}

document.querySelectorAll('.site-title').forEach(e=>e.textContent=SITE.title);if(!document.title||!document.title.trim())document.title=SITE.title;

// ===== Tìm kiếm toàn trang (ô tìm kiếm trên đầu) =====
(function(){
const nz=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/[〜～~]/g,'').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96)).replace(/\s+/g,' ').trim();
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
function boot(){const tb=document.querySelector('.topbar');if(!tb||document.getElementById('gs'))return;
 const d=document.createElement('div');d.className='gsbar';d.innerHTML='<div class="wrap"><div class="gs" id="gs"><span class="gsi">🔍</span><input id="gq" type="search" autocomplete="off" placeholder="Tìm kanji, từ vựng, nghĩa tiếng Việt, mẫu ngữ pháp, bài học…"><div class="gsr" id="gsr" hidden></div></div></div>';
 tb.appendChild(d);const q=d.querySelector('#gq'),r=d.querySelector('#gsr');let K=null,loading=false,t=0;
 const load=()=>{if(K||loading)return;loading=true;LOCK.load('search').then(()=>{K=SIDX.E.map(e=>nz(e[1]+' '+e[2]));go()}).catch(()=>{loading=false;r.hidden=false;r.innerHTML='<div class="gsm">\u26A0\uFE0F Không tải được chỉ mục tìm kiếm (có thể do mạng). Gõ lại sau ít giây để thử lại.</div>'})};
 function go(){const v=nz(q.value);if(!v){r.hidden=true;return}
  if(!K){r.hidden=false;r.innerHTML='<div class="gsm">Đang tải chỉ mục…</div>';return}
  const ws=v.split(' ');const hits=[],seenL={};
  SIDX.L.forEach((l,i)=>{const k=nz(l[1]+' '+l[2]);if(ws.every(w=>k.includes(w)))hits.push([0,i,null])});
  for(let j=0;j<K.length&&hits.length<400;j++){if(ws.every(w=>K[j].includes(w))){const e=SIDX.E[j];const ex=nz(e[1]).split(' · ')[0]==v?1:2;hits.push([ex,e[0],e[1]])}}
  hits.sort((a,b)=>a[0]-b[0]);const n=hits.length,top=hits.slice(0,60);
  r.hidden=false;r.innerHTML=n?'<div class="gsm">'+(n>=400?'Hơn 400':n)+' kết quả'+(n>60?' (hiện 60 đầu)':'')+'</div>'+top.map(([x,i,lb])=>{const l=SIDX.L[i];const u='lesson.html?id='+encodeURIComponent(l[0])+(lb?'&hl='+encodeURIComponent(q.value.trim()):'');
   return '<a class="gsa" href="'+u+'"><span class="gst">'+esc(lb||l[1])+'</span><span class="gsl"><b>'+esc(l[3]||'')+'</b> '+esc(lb?l[1]:l[2])+'</span></a>'}).join(''):'<div class="gsm">Không tìm thấy kết quả cho “'+esc(q.value)+'”.</div>'}
 q.addEventListener('focus',load);q.addEventListener('input',()=>{load();clearTimeout(t);t=setTimeout(go,120)});
 q.addEventListener('keydown',e=>{if(e.key=='Escape'){r.hidden=true;q.blur()}if(e.key=='Enter'){const a=r.querySelector('a');if(a)location.href=a.href}});
 document.addEventListener('click',e=>{if(!d.contains(e.target))r.hidden=true});
 const pq=new URLSearchParams(location.search).get('tim');if(pq){q.value=pq;load()}
 // trang bài học: tô sáng và cuộn tới mục được tìm
 const hl=new URLSearchParams(location.search).get('hl');if(hl&&document.getElementById('m'))setTimeout(()=>{const w=nz(hl);const els=[...document.querySelectorAll('#m td,#m .ex,#m p,#m .qa')];
  const el=els.find(x=>nz(x.textContent.replace(/\s+/g,' ')).includes(w)||nz([...x.querySelectorAll('ruby')].map(y=>y.firstChild&&y.firstChild.textContent).join('')).includes(w));
  if(el){const row=el.closest('tr')||el;row.classList.add('gshl');row.scrollIntoView({block:'center'})}},50);
}
addEventListener('unlocked',boot);
})();

// ===== Chế độ tối / sáng =====
// Trạng thái do script nhỏ trong <head> đặt lên <html data-theme> trước khi vẽ
// (theo localStorage 'hn_theme', chưa có thì theo prefers-color-scheme).
// Module này gắn nút bật/tắt vào header và giữ đồng bộ khi hệ thống đổi.
(function(){
var root=document.documentElement,KEY='hn_theme';
var MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
var SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
function saved(){try{var v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}catch(e){return null}}
function sysDark(){try{return !!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)}catch(e){return false}}
function cur(){return root.dataset.theme==='dark'?'dark':'light'}
function paint(){var b=document.getElementById('themetgl');if(!b)return;var d=cur()==='dark';
 b.innerHTML=d?SUN:MOON;b.setAttribute('aria-label',d?'Chuyển sang chế độ sáng':'Chuyển sang chế độ tối');b.title=d?'Chế độ sáng':'Chế độ tối'}
function apply(t){root.dataset.theme=t;var mc=document.querySelector('meta[name="theme-color"]');
 if(mc)mc.setAttribute('content',t==='dark'?'#201c17':'#233d63');paint()}
if(!root.dataset.theme)apply(saved()||(sysDark()?'dark':'light'));
function boot(){var w=document.querySelector('.topbar .wrap');if(!w){paint();return}
 if(!document.getElementById('themetgl')){
  var b=document.createElement('button');b.type='button';b.id='themetgl';b.className='themetgl';
  b.addEventListener('click',function(){var t=cur()==='dark'?'light':'dark';
   try{localStorage.setItem(KEY,t)}catch(e){} apply(t)});
  w.appendChild(b)}
 paint()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
try{var mq=matchMedia('(prefers-color-scheme: dark)');
 var onchg=function(e){if(!saved())apply(e.matches?'dark':'light')};
 if(mq.addEventListener)mq.addEventListener('change',onchg);else if(mq.addListener)mq.addListener(onchg)}catch(e){}
})();
