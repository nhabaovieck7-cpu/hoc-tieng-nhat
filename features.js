// Tính năng dùng chung: đọc to (TTS), tiến độ, trắc nghiệm, AI, bình luận, offline.
// File này KHÔNG chứa nội dung bài học (nội dung vẫn được mã hoá trong enc/).
const F=(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
const R=s=>typeof ruby=='function'?ruby(String(s||'')):String(s||'');
const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};

// ===== 1. Đọc to: ưu tiên giọng thu sẵn VOICEVOX, không có thì giọng máy tiếng Nhật =====
// Cơ chế: tts.speak(text) -> chuẩn hoá -> tra audio-index.json -> trúng id thì
// phát audio/<id>.mp3; không trúng / lỗi phát / index tải hỏng -> giọng máy như cũ.
// Cờ tắt khẩn cấp: AUDIO_ON=false -> toàn bộ về giọng máy ngay.
const AUDIO_ON=true;
const AUDIO_BASE='audio/';
const AUDIO_INDEX_URL='audio-index.json';
// Chuẩn hoá khoá tra: PHẢI giống hệt norm() trong gen-audio-index.py
function aNorm(s){return String(s==null?'':s).normalize('NFKC').replace(/[（(][^）)]*[ぁ-んァ-ン][^）)]*[）)]/g,'').replace(/\s+/g,'')}
let _aidx=null,_aidxP=null;
function loadAudioIndex(){if(_aidx)return Promise.resolve(_aidx);if(_aidxP)return _aidxP;_aidxP=fetch(AUDIO_INDEX_URL,{cache:'force-cache'}).then(r=>r.ok?r.json():{}).catch(()=>({})).then(j=>{_aidx=j||{};return _aidx});return _aidxP}
const _au=new Audio();_au.preload='auto';let _auRes=null;
function _auFinish(){if(_auRes){const r=_auRes;_auRes=null;r()}}
function _auStop(){try{_au.pause()}catch(e){}_auFinish()}
function _auPlay(id,rate){return new Promise(res=>{_auFinish();_auRes=res;_au.onended=()=>_auFinish();_au.onerror=()=>{_auFinish();res('err')};try{_au.playbackRate=rate||1}catch(e){}_au.src=AUDIO_BASE+id+'.mp3';const p=_au.play();if(p&&p.catch)p.catch(()=>{_auFinish();res('err')})})}
const tts={rate:ls.get('hn_tts_rate',0.9),ok:typeof speechSynthesis!='undefined'&&typeof SpeechSynthesisUtterance!='undefined',
 voice(){if(!this.ok)return null;const v=speechSynthesis.getVoices().filter(x=>/^ja/i.test(x.lang));return v.find(x=>/Google|Kyoko|O-ren|Otoya|Nanami/i.test(x.name))||v[0]||null},
 // chữ cần đọc: bỏ furigana (rt), bỏ nút, bỏ tên người nói "Nam："
 text(el){if(typeof el=='string'){const d=document.createElement('div');d.innerHTML=R(el);el=d}const c=el.cloneNode(true);$$('rt,rp,button,.ix,.vi',c).forEach(x=>x.remove());return c.textContent.replace(/^\s*[^：:\s]{1,12}[：:]/,'').replace(/[（(][^）)]*[ぁ-んァ-ン][^）)]*[）)]/g,'').replace(/\s+/g,' ').trim()},
 async speak(t,o={}){if(!o.queue){_auStop();if(this.ok)speechSynthesis.cancel()}if(AUDIO_ON&&t){try{const idx=await loadAudioIndex();const id=idx[aNorm(t)];if(id){const r=await _auPlay(id,o.rate||this.rate);if(r!=='err')return}}catch(e){}}if(!this.ok)return;return new Promise(res=>{const u=new SpeechSynthesisUtterance(t);u.lang='ja-JP';const v=this.voice();if(v)u.voice=v;u.rate=o.rate||this.rate;u.onend=u.onerror=()=>res();speechSynthesis.speak(u)})},
 stop(){_auStop();if(this.ok)speechSynthesis.cancel()},
 setRate(r){this.rate=r;ls.set('hn_tts_rate',r)}};
if(tts.ok)try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>{}}catch(e){}
function spkBtn(getText,sm){const b=document.createElement('button');b.type='button';b.className='spk'+(sm?' sm':'');b.textContent='🔊';b.title='Nghe (giọng máy)';b.setAttribute('aria-label','Nghe câu tiếng Nhật');
 b.onclick=e=>{e.preventDefault();e.stopPropagation();$$('.spk.on').forEach(x=>x.classList.remove('on'));b.classList.add('on');tts.speak(typeof getText=='function'?getText():getText).then(()=>b.classList.remove('on'))};return b}
// gắn nút 🔊 vào các câu tiếng Nhật trong một vùng
function addSpeakers(root){if(!tts.ok||!root)return;
 // Khử trùng tổng quát: trong cùng một hàng bảng / một khối mục (.ex, .mq, .qa), hai nút đọc trùng khít
 // một câu (sau tts.text) thì chỉ giữ nút đầu tiên — nút sau là nút thừa. Phạm vi hẹp theo hàng/khối nên
 // các mục khác nhau lặp lại cùng một câu vẫn giữ nguyên nút của mình.
 const seen=new WeakMap();
 const scopeOf=el=>el.closest('tr')||el.closest('.ex,.mq,.qa')||el;
 const dup=(el,t)=>{if(!t)return false;const sc=scopeOf(el);let s=seen.get(sc);if(!s){s=new Set();seen.set(sc,s)}if(s.has(t))return true;s.add(t);return false};
 $$('.ex .jp, div.jp, td.jp, .kwl, .op.jp, .q.jp',root).forEach(el=>{if(el.querySelector(':scope > .spk')||el.closest('.mq'))return;if(!/[ぁ-んァ-ン一-龯]/.test(el.textContent))return;if(dup(el,tts.text(el)))return;el.append(' ',spkBtn(()=>tts.text(el),true))});
 // bảng "Sách giáo khoa / Người Nhật nói thật": đọc từng ô tiếng Nhật
 // bảng từ vựng (vt): bỏ qua ô cột "Cách đọc" – nút ở đó đọc lại đúng từ mà nút cạnh từ (cột "Từ") đã đọc, thừa một nút
 // (giữ riêng quy tắc cột này: hai nút khác dạng chữ — kanji vs kana — nên khử trùng theo text không bắt được)
 $$('table',root).forEach(t=>{const vt=t.classList.contains('vt'),kjt=t.classList.contains('kjt');$$('tr',t).forEach(r=>{[...r.children].forEach(c=>{if(c.tagName!='TD'||c.querySelector('.spk')||c.classList.contains('jp'))return;if(vt&&c.getAttribute('data-l')=='Cách đọc')return;const tx=c.cloneNode(true);$$('rt,.ix',tx).forEach(x=>x.remove());const s=tx.textContent.trim();if(!s||!/[ぁ-んァ-ン]/.test(s)||/[a-zA-Zà-ỹ]{3}/.test(s))return;
  // Âm On / Âm Kun của bảng kanji là hai thông tin riêng: không khử trùng lẫn nhau,
  // nhưng vẫn đăng ký text vào phạm vi hàng để ô khác trùng với chúng vẫn bị khử
  const onkun=kjt&&(c.getAttribute('data-l')=='Âm On'||c.getAttribute('data-l')=='Âm Kun');
  if(onkun)dup(c,tts.text(c));else if(dup(c,tts.text(c)))return;
  c.append(' ',spkBtn(()=>tts.text(c),true))})})})}
// đoạn hội thoại "A：…<br>B：…" -> mỗi dòng một nút + nút đọc cả đoạn
function dialogs(root){if(!root)return;$$('p',root).forEach(p=>{const parts=p.innerHTML.split(/<br\s*\/?>/i);if(parts.length<3||parts.filter(x=>/^[\s\S]{0,40}?[：]/.test(x.replace(/<[^>]+>/g,'').trim())).length<3)return;
 p.innerHTML=parts.map(x=>'<span class="kwl">'+x.trim()+'</span>').join('');p.classList.add('kwp');if(!tts.ok)return;
 const all=document.createElement('button');all.type='button';all.className='spkall';all.textContent='🔊 Đọc cả đoạn hội thoại';let playing=false;
 all.onclick=async()=>{if(playing){playing=false;tts.stop();all.textContent='🔊 Đọc cả đoạn hội thoại';return}playing=true;all.textContent='⏹ Dừng đọc';for(const l of $$('.kwl',p)){if(!playing)break;l.classList.add('reading');await tts.speak(tts.text(l));l.classList.remove('reading')}playing=false;all.textContent='🔊 Đọc cả đoạn hội thoại'};
 p.after(all)})}
function rateBar(){if(!tts.ok)return '';return '<div class="ttsbar"><span>🔊 Tốc độ đọc:</span>'+[0.7,0.9,1,1.2].map(r=>'<button type="button" data-r="'+r+'" class="'+(r==tts.rate?'on':'')+'">'+r+'×</button>').join('')+'<small>Giọng máy (ja-JP), chỉ đọc chữ, không đọc furigana.</small></div>'}
function bindRate(root){$$('.ttsbar button',root).forEach(b=>b.onclick=()=>{tts.setRate(+b.dataset.r);$$('.ttsbar button').forEach(x=>x.classList.toggle('on',x.dataset.r==b.dataset.r));tts.speak('こんにちは')})}

// ===== 2. Tiến độ (lưu trên máy) =====
const P={K:'hn_prog_v1',get(){return ls.get(this.K,{days:{},seen:{},best:{},last:null})},save(p){ls.set(this.K,p)},
 touch(){const p=this.get();p.days[today()]=1;this.save(p);return p},
 seen(id,title){const p=this.touch();p.seen[id]=Date.now();p.last={id,title};this.save(p)},
 score(id,title,ok,n){const p=this.touch();const b=p.best[id];if(!b||ok/n>=b.ok/b.n)p.best[id]={ok,n,title,t:Date.now()};p.last={id,title};this.save(p)},
 streak(){const p=this.get();let n=0;const d=new Date();if(!p.days[today()])d.setDate(d.getDate()-1);for(;;){const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');if(!p.days[k])break;n++;d.setDate(d.getDate()-1)}return n}};
function dashboard(el){if(!el)return;const p=P.get(),seen=Object.keys(p.seen),bs=Object.values(p.best);
 const avg=bs.length?Math.round(100*bs.reduce((a,b)=>a+b.ok/b.n,0)/bs.length):null;
 const rows=[];if(typeof COURSE!='undefined')Object.keys(COURSE).forEach(lv=>Object.keys(COURSE[lv]).forEach(t=>{const us=COURSE[lv][t];rows.push(['Khóa '+lv+' · '+t,us.filter(u=>p.seen[u.id]).length,us.length])}));
 if(typeof LESSONS!='undefined'){const th=LESSONS.filter(l=>/^Tổng hợp/.test(l.type)),dk=LESSONS.filter(l=>l.type=='Đọc hiểu'),kw=LESSONS.filter(l=>l.type=='Hội thoại/kaigo');
  rows.push(['Tổng hợp mỗi ngày',th.filter(l=>p.seen[l.id]).length,th.length],['Đọc hiểu',dk.filter(l=>p.seen[l.id]).length,dk.length],['Kaiwa',kw.filter(l=>p.seen[l.id]).length,kw.length])}
 const top=Object.entries(p.best).sort((a,b)=>b[1].t-a[1].t).slice(0,4);
 el.innerHTML='<div class="box pg"><h3>📈 Tiến độ của bạn</h3><div class="pgn"><div><b>🔥 '+P.streak()+'</b><span>ngày liên tục</span></div><div><b>'+seen.length+'</b><span>bài đã học</span></div><div><b>'+(avg==null?'–':avg+'%')+'</b><span>điểm TB trắc nghiệm</span></div></div>'+
 '<div class="pgb">'+rows.filter(r=>r[2]).map(r=>'<div class="pgr"><span>'+r[0]+'</span><small>'+r[1]+'/'+r[2]+' bài</small><div class="bar"><i style="width:'+Math.round(100*r[1]/r[2])+'%"></i></div></div>').join('')+'</div>'+
 (top.length||p.last?'<h4>Điểm cao nhất gần đây</h4><ul class="pgl">'+top.map(([id,b])=>'<li><a href="lesson.html?id='+encodeURIComponent(id)+'">'+(b.ok/b.n>=.8?'✅':'🟡')+' '+esc(b.title||id)+' · <b>'+b.ok+'/'+b.n+'</b></a></li>').join('')+(p.last?'<li><a href="lesson.html?id='+encodeURIComponent(p.last.id)+'">📘 Đang học dở: '+esc(p.last.title||p.last.id)+'</a></li>':'')+'</ul>':'<p class="mut">Chưa có dữ liệu – mở một bài học hoặc làm trắc nghiệm để bắt đầu.</p>')+
 '<p class="mut">Lưu trên máy này (không gửi đi đâu). <a href="#" id="pgreset">Xoá tiến độ</a></p></div>';
 $('#pgreset',el).onclick=e=>{e.preventDefault();if(confirm('Xoá toàn bộ tiến độ trên máy này?')){localStorage.removeItem(P.K);dashboard(el)}}}

// ===== 3. Trắc nghiệm 4 lựa chọn (giống trong bài học) =====
function mcqHTML(qs,o={}){return '<div class="mcq"'+(o.id?' data-id="'+esc(o.id)+'" data-title="'+esc(o.title||'')+'"':'')+'>'+(o.hint===false?'':'<p class="mqh">Chạm vào một phương án cho mỗi câu, rồi bấm <b>Chấm điểm</b>.</p>')+qs.map((x,i)=>'<div class="mq" data-c="'+x.c+'"><div class="mqq">'+(o.num?'<b>Câu '+(i+1)+':</b> ':'')+(typeof prepMcqQ=='function'?R(prepMcqQ(x.q,x.o)):R(x.q))+'</div><div class="mo">'+x.o.map((t,j)=>'<button type="button" class="opt" data-i="'+j+'"><span class="on">'+(j+1)+'</span><span class="ot">'+R(t)+'</span></button>').join('')+'</div><div class="mx" hidden><div class="mxr"></div>'+R(x.a||'')+'</div></div>').join('')+'<div class="mbar"><button type="button" class="grade">Chấm điểm</button><button type="button" class="redo" hidden>Làm lại</button><span class="score"></span></div></div>'}
function bindMCQ(root,onGrade){$$('.mcq',root).forEach(Q=>{if(Q.dataset.b)return;Q.dataset.b=1;const qs=$$('.mq',Q),sc=$('.score',Q),g=$('.grade',Q),rd=$('.redo',Q);
 Q.addEventListener('click',e=>{const b=e.target.closest('.opt');if(!b||Q.classList.contains('done'))return;$$('.opt',b.parentNode).forEach(x=>x.classList.toggle('sel',x==b))});
 g.onclick=()=>{let ok=0;qs.forEach(q=>{const c=+q.dataset.c,os=$$('.opt',q),s=os.findIndex(x=>x.classList.contains('sel'));os[c].classList.add('right');if(s==c){ok++;q.classList.add('qok')}else{q.classList.add('qbad');if(s>=0)os[s].classList.add('wrong')}
  const x=$('.mx',q);x.hidden=false;$('.mxr',x).innerHTML=s==c?'✅ Đúng':(s<0?'⚪ Chưa chọn':'❌ Sai')+' – đáp án đúng: <b>'+(c+1)+'</b>'});
  Q.classList.add('done');sc.textContent='Đúng '+ok+'/'+qs.length+' câu';sc.dataset.ok=ok;g.hidden=true;rd.hidden=false;if(Q.dataset.id)P.score(Q.dataset.id,Q.dataset.title,ok,qs.length);onGrade&&onGrade(ok,qs.length,Q)};
 rd.onclick=()=>{Q.classList.remove('done');qs.forEach(q=>{q.classList.remove('qok','qbad');$$('.opt',q).forEach(x=>x.classList.remove('sel','right','wrong'));$('.mx',q).hidden=true});sc.textContent='';g.hidden=false;rd.hidden=true}})}

// ===== 4. Trợ lý AI (qua Cloudflare Worker → Gemini) =====
const AI={on:()=>!!(typeof SITE!='undefined'&&SITE.aiEndpoint),LIM:16,
 used(){const u=ls.get('hn_ai_used',{});return u[today()]||0},
 async token(){const k=localStorage.getItem('hn_key_v1')||'';const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('hn-ai:'+k));return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('')},
 async ask(mode,text,ctx){if(!this.on())throw new Error('AI chưa được bật.');if(this.used()>=this.LIM)throw new Error('Hôm nay đã dùng hết '+this.LIM+' câu hỏi AI. Mai quay lại nhé!');
  const hd={'Content-Type':'application/json','X-Access':await this.token()};
  const st=(typeof AUTH!='undefined'&&AUTH.session)?AUTH.session():'';if(st)hd.Authorization='Bearer '+st;
  const r=await fetch(SITE.aiEndpoint,{method:'POST',headers:hd,body:JSON.stringify({mode,text:String(text).slice(0,2000),ctx:String(ctx||'').slice(0,3000)})});
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||('Lỗi máy chủ AI ('+r.status+')'));
  if(typeof j.aiLeft==='number'){ls.set('hn_ai_used',{[today()]:Math.max(0,this.LIM-j.aiLeft)})}
  else{const u=ls.get('hn_ai_used',{});u[today()]=(u[today()]||0)+1;ls.set('hn_ai_used',{[today()]:u[today()]})}
  return j.reply||''},
 // định dạng trả lời: **đậm**, *nghiêng*, xuống dòng, {漢字|かな}
 fmt(s){const inl=t=>R(esc(t)).replace(/&lt;(\/?)(ruby|rt)&gt;/g,'<$1$2>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<i>$2</i>');
  let out='',list=false;const end=()=>{if(list){out+='</ul>';list=false}};
  String(s||'').split('\n').forEach(ln=>{const h=ln.match(/^\s*#{1,6}\s+(.+?)\s*#*\s*$/),li=ln.match(/^\s*(?:[-•*]|\d{1,2}[.)])\s+(.+)$/);
   if(h){end();out+='<div class="aih">'+inl(h[1])+'</div>'}
   else if(li){if(!list){out+='<ul class="ail">';list=true}out+='<li>'+inl(li[1])+'</li>'}
   else{end();out+=inl(ln)+'<br>'}});
  end();return out.replace(/(<br>)+$/,'')}};

// ===== 5. Bình luận (Giscus – GitHub Discussions) =====
function comments(el,term){if(!el)return;const g=typeof SITE!='undefined'&&SITE.giscus;
 if(!g||!g.repoId||!g.categoryId){el.remove();return}
 el.innerHTML='<h2>💬 Thảo luận bài học</h2><div class="cwarn">⚠️ <b>Bình luận công khai, không được mã khoá.</b> Không ghi tên thật, nơi làm việc hay thông tin cá nhân. Câu hỏi mới được AI (Gemini) tự trả lời trong vài phút – AI có thể sai.</div><div class="giscus"></div>';
 const s=document.createElement('script');s.src='https://giscus.app/client.js';s.async=true;s.crossOrigin='anonymous';
 Object.entries({'data-repo':g.repo,'data-repo-id':g.repoId,'data-category':g.category,'data-category-id':g.categoryId,'data-mapping':'specific','data-term':term,'data-strict':'1','data-reactions-enabled':'1','data-emit-metadata':'0','data-input-position':'bottom','data-theme':'light','data-lang':'vi','data-loading':'lazy'}).forEach(([k,v])=>s.setAttribute(k,v));
 el.append(s)}

// ===== 6. Ứng dụng (PWA) + ngoại tuyến =====
function offlineBar(){let b=$('#offbar');if(!b){b=document.createElement('div');b.id='offbar';b.className='offbar';b.textContent='📶 Đang ngoại tuyến – đang dùng bản đã lưu trên máy.';document.body.appendChild(b)}b.hidden=navigator.onLine}
addEventListener('online',offlineBar);addEventListener('offline',offlineBar);
if('serviceWorker' in navigator&&location.protocol!='file:')addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
// sau khi mở khoá: tải sẵn mọi gói nội dung (vẫn mã hoá) để dùng offline
async function precache(){if(!('caches' in window))return;try{const m=await (await fetch('enc/meta.json',{cache:'no-cache'})).json();const c=await caches.open('hn-data');
 for(const [f,v] of Object.entries(m.v)){const u='enc/'+f+'.bin?v='+v;if(!(await c.match(u)))await c.add(u).catch(()=>{})}}catch(e){}}
async function offlineStatus(){if(!('caches' in window))return null;const m=await (await fetch('enc/meta.json',{cache:'no-cache'})).json();const c=await caches.open('hn-data');let n=0,bytes=0;
 for(const [f,v] of Object.entries(m.v)){const r=await c.match('enc/'+f+'.bin?v='+v);if(r){n++;bytes+=(await r.clone().arrayBuffer()).byteLength}}return {n,total:Object.keys(m.v).length,mb:bytes/1048576}}

// thêm mục mới vào thanh menu (mọi trang)
const NAV=[['tin-tuc.html','Tin tức'],['luyen-nghe.html','Luyện nghe'],['on-tap.html','Ôn thẻ'],['thi-thu.html','Thi thử'],['hoi-ai.html','Hỏi AI'],['ung-dung.html','Ứng dụng']];
function nav(){const n=$('.topbar .nav');if(!n||n.dataset.f)return;n.dataset.f=1;const here=location.pathname.split('/').pop();
 NAV.forEach(([h,t])=>{if(h=='hoi-ai.html'&&!AI.on())return;const a=document.createElement('a');a.href=h;a.textContent=t;if(here==h)a.className='on';const lk=$('.lockbtn',n);lk?n.insertBefore(a,lk):n.append(a)})}
addEventListener('unlocked',()=>{nav();offlineBar();precache()});
return {$,$$,esc,R,ls,today,tts,spkBtn,addSpeakers,dialogs,rateBar,bindRate,P,dashboard,mcqHTML,bindMCQ,AI,comments,offlineStatus,precache,nav}})();
