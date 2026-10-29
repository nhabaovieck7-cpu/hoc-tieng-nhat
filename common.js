function ruby(s){return s.replace(/\{([^|}]+)\|([^}]+)\}/g,'<ruby>$1<rt>$2</rt></ruby>')}
function plain(s){return s.replace(/\{([^|}]+)\|([^}]+)\}/g,'$1$2')}
/* Bỏ furigana trên từ được hỏi (chữ in đậm/gạch chân) — tránh lộ đáp án câu 漢字読み */
function stripYomiTarget(s){return String(s||'').replace(/<(b|u|strong)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,function(_,t,a,inner){return '<'+t+(a||'')+'>'+inner.replace(/\{([^|}]+)\|[^}]+\}/g,'$1')+'</'+t+'>'})}
function prepMcqQ(q,o){var s=String(q||''); if(/<(b|u|strong)\b/i.test(s)) s=stripYomiTarget(s); return s}

document.querySelectorAll('.site-title').forEach(e=>{const f=document.createElement('span'),t=document.createElement('span');f.className='st-f';f.textContent=SITE.title;t.className='st-s';t.textContent=String(SITE.title).replace(/\s+cùng\s+.*$/i,'')||SITE.title;e.textContent='';e.append(f,t);e.setAttribute('aria-label',SITE.title)});if(!document.title||!document.title.trim())document.title=SITE.title;

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

// ===== Nút "← Quay lại" (trang con): có trang trước cùng site thì history.back(),
// không có (mở trực tiếp) thì đi theo href trang cha đã khai sẵn trên nút =====
document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a.hn-back'):null;if(!a)return;
 var ok=false;try{ok=!!document.referrer&&new URL(document.referrer).origin===location.origin}catch(x){}
 if(ok&&history.length>1){e.preventDefault();history.back()}});

// ===== Nút chia sẻ trang web =====
// Ưu tiên Web Share API (iPhone Safari có sẵn — panel hệ thống gồm cả Messenger, Zalo…);
// trình duyệt không có thì mở panel riêng với các kênh có URL chia sẻ chính thức đã kiểm chứng:
// Facebook (sharer), LINE (social-plugins.line.me), WhatsApp (wa.me), X (intent/tweet),
// Telegram (t.me/share, tài liệu core.telegram.org) và Email. Messenger/Zalo không có URL
// chia sẻ web chính thức dùng được (Messenger bắt buộc app_id của Meta app, Zalo chỉ có
// widget/SDK gắn app) nên đi qua "Sao chép liên kết" và Web Share API.
(function(){
var TITLE='Học tiếng Nhật cùng Khánh';
var TEXT='Học tiếng Nhật miễn phí cho người Việt: khóa học N5–N1 gồm ngữ pháp, từ vựng, kanji, luyện nghe JLPT, tin tức mỗi ngày và trợ lý AI.';
var HOME='https://nhabaovieck7-cpu.github.io/hoc-tieng-nhat/';
var ov=null,copyBtn=null,note=null,curUrl=HOME;
function urlFor(btn){var u=btn&&btn.getAttribute('data-url');if(u)return u;
 if(/(^|\/)lesson\.html$/.test(location.pathname)){var id=new URLSearchParams(location.search).get('id')||'';if(/^[\w-]+$/.test(id))return HOME+'bai/'+id+'.html'}
 if(/(^|\/)index\.html$/.test(location.pathname)||location.pathname.endsWith('/'))return HOME;
 return location.href.split('#')[0]}
function build(){if(ov)return;var eu=encodeURIComponent(curUrl),et=encodeURIComponent(TITLE+' — '+TEXT),ew=encodeURIComponent(TEXT+'\n'+curUrl);
 ov=document.createElement('div');ov.className='hn-sh-ov';ov.hidden=true;
 ov.innerHTML='<div class="hn-sh-sheet" role="dialog" aria-modal="true" aria-label="Chia sẻ trang web">'
 +'<div class="hn-sh-h"><b>📤 Chia sẻ trang web</b><button type="button" class="hn-sh-x" aria-label="Đóng">✕</button></div>'
 +'<p class="hn-sh-t">Giới thiệu “Học tiếng Nhật cùng Khánh” tới bạn bè qua:</p>'
 +'<div class="hn-sh-list">'
 +'<button type="button" class="hn-sh-item" data-act="copy"><span class="hn-sh-ic">🔗</span><span>Sao chép liên kết</span></button>'
 +'<a class="hn-sh-item" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+eu+'"><span class="hn-sh-ic">f</span><span>Facebook</span></a>'
 +'<a class="hn-sh-item" target="_blank" rel="noopener" href="https://social-plugins.line.me/lineit/share?url='+eu+'"><span class="hn-sh-ic">💬</span><span>LINE</span></a>'
 +'<a class="hn-sh-item" target="_blank" rel="noopener" href="https://wa.me/?text='+ew+'"><span class="hn-sh-ic">📱</span><span>WhatsApp</span></a>'
 +'<a class="hn-sh-item" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text='+et+'&url='+eu+'"><span class="hn-sh-ic">𝕏</span><span>X (Twitter)</span></a>'
 +'<a class="hn-sh-item" target="_blank" rel="noopener" href="https://t.me/share/url?url='+eu+'&text='+et+'"><span class="hn-sh-ic">✈️</span><span>Telegram</span></a>'
 +'<a class="hn-sh-item" href="mailto:?subject='+encodeURIComponent(TITLE)+'&body='+ew+'"><span class="hn-sh-ic">✉️</span><span>Email</span></a>'
 +'</div><p class="hn-sh-note" role="status"></p></div>';
 document.body.appendChild(ov);
 copyBtn=ov.querySelector('[data-act="copy"]');note=ov.querySelector('.hn-sh-note');
 ov.addEventListener('click',function(e){if(e.target===ov||(e.target.closest&&e.target.closest('.hn-sh-x')))closePanel()});
 copyBtn.addEventListener('click',function(){copyLink(curUrl)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov&&!ov.hidden)closePanel()});}
function closePanel(){if(ov)ov.hidden=true}
function openPanel(btn){curUrl=urlFor(btn);build();note.textContent='';ov.hidden=false}
function copyLink(u){function ok(){var old=copyBtn.innerHTML;copyBtn.innerHTML='<span class="hn-sh-ic">✅</span><span>Đã sao chép</span>';note.textContent='Đã sao chép liên kết — dán vào Zalo, Messenger hoặc bất cứ đâu để gửi cho bạn bè.';setTimeout(function(){copyBtn.innerHTML=old},2200)}
 function fb(){var ta=document.createElement('textarea');ta.value=u;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok()}catch(e){note.textContent='Không sao chép tự động được — liên kết trang: '+u}ta.remove()}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(ok,fb);else fb()}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-share]'):null;if(!b)return;var u=urlFor(b);
 if(navigator.share){navigator.share({title:TITLE,text:TEXT,url:u}).catch(function(err){if(err&&err.name!=='AbortError')openPanel(b)})}
 else openPanel(b)});
// Nút chia sẻ trên header: gắn vào .topbar .wrap, ngay trước nút chế độ tối —
// dùng chung handler [data-share] ở trên nên chia sẻ đúng URL trang đang xem.
function hdrBoot(){var w=document.querySelector('.topbar .wrap');if(!w||document.getElementById('hdrshare'))return;
 var b=document.createElement('button');b.type='button';b.id='hdrshare';b.className='hn-share-hdr';b.setAttribute('data-share','');b.setAttribute('aria-label','Chia sẻ trang web');b.title='Chia sẻ trang web';
 b.innerHTML='<span class="hn-share-hic" aria-hidden="true">📤</span><span class="hn-share-tx">Chia sẻ</span>';
 var t=document.getElementById('themetgl');
 if(t&&t.parentNode===w)w.insertBefore(b,t);else w.appendChild(b)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hdrBoot);else hdrBoot();
})();

// ===== Cộng đồng: link menu + chuông thông báo + nút tin nhắn trên header =====
// Chuông hiện TỔNG chưa đọc = thông báo cộng đồng + tin nhắn chưa đọc (đếm riêng ở /community/unread).
// Chỉ hiện khi đã có phiên đăng nhập học viên; thông báo là TRONG trang (không push về điện thoại).
(function(){
var base=function(){return (typeof SITE!='undefined'&&SITE&&SITE.aiEndpoint)||(window.SITE&&window.SITE.aiEndpoint)||''};
function sess(){try{return localStorage.getItem('hn_sess_v1')||''}catch(e){return ''}}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
async function api(path,opts){opts=opts||{};var h={'Content-Type':'application/json'};var t=sess();if(t)h.Authorization='Bearer '+t;
 var r=await fetch(base()+path,{method:opts.method||'GET',headers:h,body:opts.body?JSON.stringify(opts.body):undefined});
 var j=await r.json().catch(function(){return{}});if(!r.ok){var e=new Error(j.error||('Lỗi '+r.status));e.status=r.status;e.body=j;throw e}return j}
var CSS='.hn-cb{position:relative;background:none;border:0;cursor:pointer;font-size:19px;line-height:1;padding:8px;border-radius:999px;min-width:40px;min-height:40px}'
+'.hn-cb:hover{background:var(--soft)}.hn-cbdg{position:absolute;top:0;right:-2px;background:var(--c);color:#fff;border-radius:999px;min-width:19px;height:19px;font-size:11px;font-weight:700;display:none;align-items:center;justify-content:center;padding:0 5px}'
+'.hn-cbdg.on{display:inline-flex}'
+'.hn-nwrap{position:relative}'
+'.hn-ndd{position:absolute;right:0;top:calc(100% + 8px);width:min(360px,92vw);max-height:70vh;overflow:auto;background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.2);z-index:90;padding:8px}'
+'.hn-ndd h4{margin:6px 8px 8px;font-size:15px}.hn-nit{display:flex;gap:9px;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid var(--line);padding:9px 8px;font:inherit;color:var(--t);cursor:pointer;align-items:flex-start}'
+'.hn-nit:last-of-type{border-bottom:0}.hn-nit.un{background:var(--soft);border-radius:10px}'
+'.hn-nava{width:34px;height:34px;border-radius:50%;flex:0 0 34px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}'
+'.hn-ntx{flex:1;font-size:14px;line-height:1.45}.hn-ntm{color:var(--m);font-size:12px}'
+'.hn-nall{display:block;width:100%;text-align:center;background:none;border:0;border-top:1px solid var(--line);padding:10px;font:inherit;font-weight:600;color:var(--c2);cursor:pointer}'
+'.hn-navlink.on{color:var(--c)}';
var COLORS=['#cf3a2e','#233d63','#2e7d4f','#8a5a00','#6a3fa0','#0f6f7a','#a03d63','#4c5866'];
function color(id){var h=0,s=String(id||'');for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return COLORS[h%COLORS.length]}
var NOTIFS=[],UNREAD={notifications:0,chat:0};
function badge(el,n){if(!el)return;el.textContent=n>99?'99+':n;el.classList.toggle('on',n>0)}
async function refresh(){if(!sess())return;try{var j=await api('/community/unread');UNREAD=j;
 badge(document.querySelector('#hnbell .hn-cbdg'),(j.notifications||0)+(j.chat||0));
 badge(document.querySelector('#hnchat .hn-cbdg'),j.chat||0)}catch(e){}}
function typeText(n){var a=n.actor&&n.actor.name?n.actor.name:'Ai đó';
 if(n.type==='like_post')return '<b>'+esc(a)+'</b> đã thích bài đăng'+(function(){var c=HNX.cua();return c?' '+c:''})();
 if(n.type==='like_comment')return '<b>'+esc(a)+'</b> đã thích bình luận'+(function(){var c=HNX.cua();return c?' '+c:''})();
 if(n.type==='comment_post')return '<b>'+esc(a)+'</b> đã bình luận vào bài'+(function(){var c=HNX.cua();return c?' '+c:''})();
 if(n.type==='reply_comment')return '<b>'+esc(a)+'</b> đã trả lời bình luận'+(function(){var c=HNX.cua();return c?' '+c:''})();
 if(n.type==='badge'){var BN={'streak7':'Chuỗi 7 ngày','streak30':'Chuỗi 30 ngày','cards100':'100 thẻ mới','cards500':'500 thẻ mới','boss10':'Hạ trùm 10 lần','listen5':'5 đề nghe','lessons50':'50 bài đã học','xp1000':'1.000 XP','level':'Trọn một cấp độ','top3':'Top 3 tuần'};return '🏅 '+(HNX.ai()?HNX.cap(HNX.ai())+' vừa đạt':'Vừa đạt')+' huy hiệu <b>'+(BN[n.comment_id]||'mới')+'</b> — xem ở mục Xếp hạng'}
 return '<b>'+esc(a)+'</b> có hoạt động mới'}
function when(t){try{var d=new Date(t),s=(Date.now()-d)/1000;if(s<60)return'vừa xong';if(s<3600)return Math.floor(s/60)+' phút trước';if(s<86400)return Math.floor(s/3600)+' giờ trước';return d.toLocaleDateString('vi-VN')}catch(e){return''}}
function renderDD(dd){var items=NOTIFS.map(function(n){var ini=n.actor&&n.actor.name?n.actor.name.trim().charAt(0).toUpperCase():'?';
  return '<button type="button" class="hn-nit'+(n.is_read?'':' un')+'" data-nid="'+esc(n.id)+'" data-post="'+esc(n.post_id||'')+'"><span class="hn-nava" style="background:'+color(n.actor&&n.actor.id)+'">'+esc(ini)+'</span><span class="hn-ntx">'+typeText(n)+'<br><span class="hn-ntm">'+when(n.created_at)+'</span></span></button>'}).join('');
 var chatLine=UNREAD.chat>0?'<button type="button" class="hn-nit un" data-gochat="1"><span class="hn-nava" style="background:#233d63">💬</span><span class="hn-ntx">'+(HNX.ai()?HNX.cap(HNX.ai())+' có':'Có')+' <b>'+UNREAD.chat+'</b> tin nhắn chưa đọc<br><span class="hn-ntm">Bấm để mở hộp tin nhắn</span></span></button>':'';
 dd.innerHTML='<h4>🔔 Thông báo</h4>'+chatLine+(items||'<p style="padding:6px 8px;color:var(--m);font-size:14px">Chưa có thông báo nào.</p>')
 +(NOTIFS.some(function(n){return !n.is_read})?'<button type="button" class="hn-nall" data-readall="1">Đánh dấu đã đọc tất cả</button>':'')}
async function boot(){var w=document.querySelector('.topbar .wrap');if(!w)return;
 var nav=document.querySelector('.topbar .nav');
 if(nav&&!nav.querySelector('a[href="cong-dong.html"]')){var a=document.createElement('a');a.href='cong-dong.html';a.textContent='Cộng đồng';a.className='hn-navlink';
  if(/(^|\/)cong-dong\.html$/.test(location.pathname)||/(^|\/)tin-nhan\.html$/.test(location.pathname))a.classList.add('on');nav.appendChild(a)}
 if(!sess())return;
 if(document.getElementById('hnbell'))return;
 var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
 var chat=document.createElement('button');chat.type='button';chat.id='hnchat';chat.className='hn-cb';chat.title='Tin nhắn';chat.setAttribute('aria-label','Tin nhắn');
 chat.innerHTML='💬<span class="hn-cbdg"></span>';chat.addEventListener('click',function(){location.href='tin-nhan.html'});
 var fr=document.createElement('button');fr.type='button';fr.id='hnfriends';fr.className='hn-cb';fr.title='Bạn bè';fr.setAttribute('aria-label','Bạn bè');
 fr.innerHTML='🤝';fr.addEventListener('click',function(){location.href='ban-be.html'});
 var wrap=document.createElement('span');wrap.className='hn-nwrap';
 var bell=document.createElement('button');bell.type='button';bell.id='hnbell';bell.className='hn-cb';bell.title='Thông báo';bell.setAttribute('aria-label','Thông báo');
 bell.innerHTML='🔔<span class="hn-cbdg"></span>';
 var dd=document.createElement('div');dd.className='hn-ndd';dd.hidden=true;wrap.appendChild(bell);wrap.appendChild(dd);
 var tgl=document.getElementById('themetgl');
 if(tgl&&tgl.parentNode===w){w.insertBefore(chat,tgl);w.insertBefore(fr,tgl);w.insertBefore(wrap,tgl)}else{w.appendChild(chat);w.appendChild(fr);w.appendChild(wrap)}
 bell.addEventListener('click',async function(){if(!dd.hidden){dd.hidden=true;return}
  dd.hidden=false;dd.innerHTML='<h4>🔔 Thông báo</h4><p style="padding:6px 8px;color:var(--m);font-size:14px">Đang tải…</p>';
  try{var j=await api('/community/notifications');NOTIFS=j.notifications||[];UNREAD.notifications=j.unread||0;renderDD(dd);
   badge(document.querySelector('#hnbell .hn-cbdg'),UNREAD.notifications+UNREAD.chat)}catch(e){dd.innerHTML='<h4>🔔 Thông báo</h4><p style="padding:6px 8px;color:var(--m);font-size:14px">Không tải được thông báo.</p>'}});
 document.addEventListener('click',function(e){if(!wrap.contains(e.target))dd.hidden=true});
 dd.addEventListener('click',async function(e){var it=e.target.closest?e.target.closest('[data-nid],[data-gochat],[data-readall]'):null;if(!it)return;
  if(it.dataset.gochat){location.href='tin-nhan.html';return}
  if(it.dataset.readall){try{await api('/community/notifications/read',{method:'POST',body:{}});NOTIFS.forEach(function(n){n.is_read=1});UNREAD.notifications=0;renderDD(dd);refresh()}catch(x){}return}
  var id=it.dataset.nid,post=it.dataset.post;
  try{await api('/community/notifications/read',{method:'POST',body:{id:id}})}catch(x){}
  var n=NOTIFS.find(function(x){return x.id===id});if(n)n.is_read=1;UNREAD.notifications=Math.max(0,UNREAD.notifications-1);refresh();
  dd.hidden=true;if(post)location.href='cong-dong.html#post-'+encodeURIComponent(post);else location.href='cong-dong.html'});
 refresh();setInterval(function(){if(!document.hidden)refresh()},60000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

// ===== Mục "Xếp hạng" trong menu chính (29/10): chèn 1 lần vào .topbar .nav =====
(function(){function boot(){var nav=document.querySelector('.topbar .nav');if(!nav||nav.querySelector('a[href="xep-hang.html"]'))return;var a=document.createElement('a');a.href='xep-hang.html';a.textContent='🏆 Xếp hạng';a.className='hn-navlink';if(/(^|\/)xep-hang\.html$/.test(location.pathname))a.classList.add('on');nav.appendChild(a)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot()})();

// ===== Header gọn trên điện thoại (29/10, Phía B): 1 hàng — tên trang · 🔍 · chế độ tối · avatar.
// Tài khoản, tin nhắn, thông báo, chia sẻ, đăng xuất gom vào menu avatar (#hdrmenu). Trên máy tính #hdrmenu
// dùng display:contents nên các nút vẫn nằm trên thanh như cũ. Chỉ DI CHUYỂN phần tử, không đổi auth.js.
(function(){
function boot(){var w=document.querySelector('.topbar .wrap');if(!w||document.getElementById('hdrmenu'))return;var tb=w.parentNode;
 var menu=document.createElement('div');menu.id='hdrmenu';menu.setAttribute('role','menu');
 function addSq(){if(w.querySelector(':scope > .hdr-sq')||!tb.querySelector('.gsbar'))return;var sq=document.createElement('button');sq.type='button';sq.className='hdr-sq';sq.setAttribute('aria-label','Tìm kiếm');sq.textContent='🔍';
  sq.onclick=function(){var o=tb.classList.toggle('gs-open');if(o){var q=tb.querySelector('.gsbar input');if(q)setTimeout(function(){q.focus()},30)}};w.appendChild(sq)}
 var av=document.createElement('button');av.type='button';av.className='hdr-av out';av.setAttribute('aria-label','Mở menu tài khoản');av.setAttribute('aria-haspopup','true');av.setAttribute('aria-expanded','false');av.innerHTML='<span class="hdr-l">☰</span><span class="hdr-dot"></span>';
 w.appendChild(av);w.appendChild(menu);
 function close(){menu.classList.remove('open');av.setAttribute('aria-expanded','false')}
 av.onclick=function(e){e.stopPropagation();var o=menu.classList.toggle('open');av.setAttribute('aria-expanded',o?'true':'false')};
 document.addEventListener('click',function(e){if(!menu.classList.contains('open'))return;if(menu.contains(e.target)||av.contains(e.target))return;close()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
 var IDS=['hdrshare','hnchat','acctbox'];
 function sweep(){addSq();IDS.forEach(function(id){var el=document.getElementById(id);if(el&&el.parentNode===w)menu.appendChild(el)});
  var nw=w.querySelector(':scope > .hn-nwrap');if(nw)menu.appendChild(nw);
  var box=document.getElementById('acctbox'),who=box&&box.querySelector('.acctwho'),inl=box&&box.querySelector('.acctin');
  var L=av.querySelector('.hdr-l'),txt,lab,out;
  if(who&&!inl){var n=(who.textContent||'').replace(/^[^\p{L}\p{N}]+/u,'').trim();txt=(n&&n!=='…'?Array.from(n)[0]:'👤').toUpperCase();lab='Tài khoản: '+(who.textContent||'').trim();out=false}
  else{txt='☰';lab='Mở menu';out=true}
  var dot=false;menu.querySelectorAll('.hn-cbdg').forEach(function(b){if(b.classList.contains('on')&&(b.textContent||'').trim()&&b.textContent.trim()!=='0')dot=true});
  // chỉ ghi khi thật sự khác, tránh vòng lặp MutationObserver
  if(L.textContent!==txt)L.textContent=txt;if(av.getAttribute('aria-label')!==lab)av.setAttribute('aria-label',lab);
  if(av.classList.contains('out')!==out)av.classList.toggle('out',out);if(av.classList.contains('dot')!==dot)av.classList.toggle('dot',dot)}
 sweep();new MutationObserver(sweep).observe(tb,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class']});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
/* Xưng hô cho thành viên (Phía B): khách giữ "bạn"; thành viên dùng anh/chị theo hồ sơ (hn_dk_ho_so), không điền giới tính thì dùng tên (hn_dk_ten), không có tên thì câu không đại từ. Tên luôn được thoát HTML. */
window.HNX=(function(){
  function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function e(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function khach(){return !(g('hn_sess_v1')||g('hn_admin_sess_v1'))}
  function xung(){try{var h=JSON.parse(g('hn_dk_ho_so')||'null')||{};return h.gt==='nam'?'anh':(h.gt==='nu'?'chị':null)}catch(x){return null}}
  function ten(){return String(g('hn_dk_ten')||'').trim().slice(0,40)}
  function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s}
  /* ai(): "bạn" cho khách; thành viên: "anh"/"chị", hoặc tên, hoặc null (gọi bên ngoài tự viết câu không đại từ) */
  function ai(){if(khach())return 'bạn';var x=xung(),n=ten();return x||(n?e(n):null)}
  /* cua(): "của bạn" / "của anh" / "của Minh" / "" */
  function cua(){var a=ai();return a?'của '+a:''}
  /* chip(): nhãn cạnh tên mình trên bảng xếp hạng (chỉ đại từ; không điền giới tính thì "Tôi" vì tên đã đứng ngay bên) */
  function chip(){var x=khach()?'bạn':xung();return x?cap(x):'Tôi'}
  /* Điền vào <span data-xh="ai|cua" data-xh0="câu thay khi không có đại từ" data-xh-cap> */
  function fill(root){(root||document).querySelectorAll('[data-xh]').forEach(function(el){if(khach())return;var v=el.getAttribute('data-xh')==='cua'?cua():ai();if(!v){el.textContent=el.getAttribute('data-xh0')||'';return}if(el.hasAttribute('data-xh-cap'))v=cap(v);el.innerHTML=v})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fill()});else fill();
  return {khach:khach,xung:xung,ten:ten,ai:ai,cua:cua,cap:cap,chip:chip,fill:fill};
})();
/* Hồ sơ cá nhân (Phía B): bấm tên trên thanh trên cùng (chỉ thành viên). Lưu ở localStorage hn_dk_ho_so — cùng khóa mà HNX/khen-cau đọc (gt: nam|nu|''). Không gửi đi đâu. */
window.HOSO=(function(){
  var K='hn_dk_ho_so',AK='hn_dk_avatar';function avg(){try{var v=localStorage.getItem(AK)||'';return /^data:image\/(webp|jpeg);base64,[A-Za-z0-9+\/=]+$/.test(v)?v:''}catch(e){return ''}}
  function g(){try{return JSON.parse(localStorage.getItem(K)||'null')||{}}catch(e){return {}}}
  function e(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function close(){var o=document.getElementById('hsOv');if(o)o.remove();document.documentElement.classList.remove('hs-lock')}
  function done(msg){try{document.dispatchEvent(new CustomEvent('hn-hoso'))}catch(x){}var m=document.getElementById('hsMsg');if(m)m.textContent=msg}
  function open(){
    if(window.HNX&&HNX.khach())return;close();
    var h=g(),y=new Date().getFullYear(),o='<option value="">— Không chọn —</option>';
    for(var n=y-12;n>=y-90;n--)o+='<option value="'+n+'"'+(+h.nam===n?' selected':'')+'>'+n+'</option>';
    function rad(name,v,t,cur){return '<label class="hs-rad"><input type="radio" name="'+name+'" value="'+v+'"'+((cur||'')===v?' checked':'')+'> <span>'+t+'</span></label>'}
    function inp(id,lab,type,val,ac,ph,ml){return '<label class="hs-lab" for="'+id+'">'+lab+'</label><input class="hs-in" id="'+id+'" type="'+type+'" value="'+e(val)+'" autocomplete="'+ac+'"'+(ph?' placeholder="'+ph+'"':'')+(type==='tel'?' inputmode="tel"':'')+(ml?' maxlength="'+ml+'"':'')+'>'}
    var x=(window.HNX&&HNX.xung())||'anh/chị';
    var d=document.createElement('div');d.id='hsOv';d.className='hs-ov';
    d.innerHTML='<section class="hs-sheet" role="dialog" aria-modal="true" aria-labelledby="hsH"><div class="hs-top"><div class="hs-av" id="hsAvH" aria-hidden="true"></div><div class="hs-tt"><h2 id="hsH">Hồ sơ cá nhân</h2><p class="hs-slh" id="hsSlH" hidden></p></div><button type="button" class="hs-x" data-hs-close aria-label="Đóng">✕</button></div>'+
     '<p class="hs-note">🔒 Chỉ mình '+e(x)+' thấy, lưu trên máy này, dùng để chọn cách xưng hô và lời chào; không chia sẻ cho ai. Không mục nào bắt buộc.</p>'+
     '<form id="hsF" novalidate>'+'<div class="hs-avrow"><span class="hs-lab" style="margin:0">Ảnh đại diện</span><input type="file" id="hsFile" accept="image/*" hidden><div class="hs-avbtn"><button type="button" class="dk-btn ghost" data-hs-pick>Đổi ảnh</button><button type="button" class="dk-btn ghost" data-hs-avdel>Xóa ảnh</button></div><p class="hs-hint" id="hsAvMsg" role="status">Ảnh được cắt vuông, thu nhỏ và chỉ lưu trên máy này.</p></div>'+inp('hsGoi','Muốn web gọi mình là gì?','text',h.goi,'off','VD: Sếp Tùng',30)+'<p class="hs-hint">Để trống thì web gọi theo mặc định.</p>'+inp('hsTen','Họ tên','text',h.ten,'name','')+
     '<label class="hs-lab" for="hsNam">Năm sinh</label><select class="hs-in" id="hsNam">'+o+'</select>'+
     '<fieldset class="hs-fs"><legend class="hs-lab">Giới tính</legend><div class="hs-rads">'+rad('hsGt','nam','Nam',h.gt)+rad('hsGt','nu','Nữ',h.gt)+rad('hsGt','','Không muốn nói',h.gt)+'</div></fieldset>'+
     '<label class="hs-lab" for="hsSl">Slogan cá nhân</label><input class="hs-in" id="hsSl" type="text" maxlength="60" value="'+e(h.sl)+'" autocomplete="off" placeholder="VD: Mỗi ngày một chút"><p class="hs-hint" id="hsSlN" aria-live="polite">'+String(h.sl||'').length+'/60</p>'+'<label class="hs-lab" for="hsSo">Sở thích</label><textarea class="hs-in" id="hsSo" rows="3" maxlength="200" placeholder="VD: nấu ăn, anime, đi bộ">'+e(h.so)+'</textarea>'+inp('hsDc','Địa chỉ','text',h.dc,'street-address','')+inp('hsDt','Số điện thoại','tel',h.dt,'tel','')+inp('hsEm','Email','email',h.em,'email','')+
     '<fieldset class="hs-fs"><legend class="hs-lab">Tình trạng</legend><div class="hs-rads">'+rad('hsTt','doc-than','Độc thân',h.tt)+rad('hsTt','ket-hon','Đã kết hôn',h.tt)+rad('hsTt','','Không muốn nói',h.tt)+'</div></fieldset>'+
     '<p class="hs-msg" id="hsMsg" role="status"></p><div class="hs-btns"><button type="submit" class="dk-btn big">Lưu</button><button type="button" class="dk-btn big ghost" data-hs-del>Xóa toàn bộ thông tin</button><button type="button" class="dk-btn big ghost" data-hs-close>Đóng</button></div>'+
     '<div class="hs-confirm" id="hsCf" hidden><p><b>Xóa toàn bộ thông tin hồ sơ trên máy này?</b><br>Cách xưng hô sẽ trở lại mặc định. Không ảnh hưởng tới tài khoản hay tiến độ học.</p><div class="hs-btns"><button type="button" class="dk-btn big" data-hs-yes>Xóa hết</button><button type="button" class="dk-btn big ghost" data-hs-no>Không xóa</button></div></div></form></section>';
    document.body.appendChild(d);document.documentElement.classList.add('hs-lock');
    function avPaint(){var v=avg(),n=(document.querySelector('#acctbox .acctwho')||{}).textContent||'';var el=d.querySelector('#hsAvH');el.innerHTML='';if(v){var im=new Image();im.alt='';im.src=v;el.appendChild(im)}else el.textContent=(Array.from(String(n).trim())[0]||'👤').toUpperCase();d.querySelector('[data-hs-avdel]').hidden=!v;d.querySelector('[data-hs-pick]').textContent=v?'Đổi ảnh':'Chọn ảnh'}
    function avMsg(t,bad){var m=d.querySelector('#hsAvMsg');m.textContent=t;m.classList.toggle('bad',!!bad)}
    avPaint();
    d.querySelector('#hsFile').addEventListener('change',function(){var fl=this.files&&this.files[0];this.value='';if(!fl)return;
      if(fl.size>30*1024*1024){avMsg('Ảnh quá lớn (trên 30MB). Xin chọn ảnh khác ạ.',1);return}avMsg('Đang xử lý ảnh…');
      var u=URL.createObjectURL(fl),im=new Image();
      im.onerror=function(){URL.revokeObjectURL(u);avMsg(/heic|heif/i.test(fl.type+fl.name)?'Trình duyệt này chưa đọc được ảnh HEIC. Xin chọn ảnh JPG/PNG, hoặc chụp màn hình ảnh đó rồi chọn lại ạ.':'Không đọc được tệp ảnh này. Xin thử ảnh khác ạ.',1)};
      im.onload=function(){URL.revokeObjectURL(u);try{var S=Math.min(im.naturalWidth,im.naturalHeight);if(!S)throw 0;var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');x.imageSmoothingQuality='high';
        x.drawImage(im,(im.naturalWidth-S)/2,(im.naturalHeight-S)/2,S,S,0,0,256,256);
        var type=c.toDataURL('image/webp',.8).indexOf('data:image/webp')===0?'image/webp':'image/jpeg',q=.86,out='';
        do{out=c.toDataURL(type,q);q-=.08}while(out.length*.75>50*1024&&q>.2);
        if(out.length*.75>50*1024){avMsg('Ảnh vẫn hơi nặng sau khi nén. Xin thử ảnh khác ạ.',1);return}
        try{localStorage.setItem(AK,out)}catch(qe){avMsg('Bộ nhớ trình duyệt trên máy này đã đầy nên chưa lưu được ảnh. Xin xóa bớt dữ liệu hoặc thử ảnh khác ạ.',1);return}
        avPaint();avTop();avMsg('Đã lưu ảnh đại diện ('+Math.round(out.length*.75/1024)+' KB).')}catch(er){avMsg('Không xử lý được ảnh này. Xin thử ảnh khác ạ.',1)}};
      im.src=u});
    d.addEventListener('click',function(ev){var t=ev.target;
      if(t.closest('[data-hs-pick]')){d.querySelector('#hsFile').click();return}
      if(t.closest('[data-hs-avdel]')){try{localStorage.removeItem(AK)}catch(x){}avPaint();avTop();avMsg('Đã xóa ảnh đại diện.');return}if(t===d||t.closest('[data-hs-close]'))close();
      else if(t.closest('[data-hs-del]')){var c=d.querySelector('#hsCf');c.hidden=false;c.scrollIntoView({block:'nearest'})}
      else if(t.closest('[data-hs-no]'))d.querySelector('#hsCf').hidden=true;
      else if(t.closest('[data-hs-yes]')){try{localStorage.removeItem(K);localStorage.removeItem(AK)}catch(x){}avPaint();avTop();d.querySelector('#hsF').reset();d.querySelectorAll('.hs-in').forEach(function(i){i.value=''});d.querySelector('#hsCf').hidden=true;d.querySelector('#hsSo').value='';d.querySelector('#hsSlN').textContent='0/60';d.querySelector('#hsSlH').hidden=true;done('Đã xóa toàn bộ thông tin hồ sơ trên máy này.')}});
    d.querySelector('#hsF').addEventListener('submit',function(ev){ev.preventDefault();var f=function(id){return String(d.querySelector('#'+id).value||'').trim().slice(0,200)},r=function(n){var c=d.querySelector('input[name="'+n+'"]:checked');return c?c.value:''};
      var v={goi:f('hsGoi').slice(0,30),sl:f('hsSl').slice(0,60),so:f('hsSo').slice(0,200),ten:f('hsTen'),nam:f('hsNam'),gt:r('hsGt'),dc:f('hsDc'),dt:f('hsDt'),em:f('hsEm'),tt:r('hsTt')};Object.keys(v).forEach(function(k){if(!v[k])delete v[k]});
      try{localStorage.setItem(K,JSON.stringify(v))}catch(x){}var hh=d.querySelector('#hsSlH');done('Đã lưu. Cảm ơn '+((window.HNX&&HNX.xung())||'nhiều')+' ạ!')});
    document.addEventListener('keydown',function k(ev){if(ev.key==='Escape'){close();document.removeEventListener('keydown',k)}});
    d.querySelector('#hsSl').addEventListener('input',function(){d.querySelector('#hsSlN').textContent=this.value.length+'/60'});var f0=d.querySelector('#hsTen');if(f0&&!('ontouchstart' in window))f0.focus();
  }
  /* Tên trên thanh trên cùng -> mở hồ sơ (không đụng auth.js: chỉ bắt sự kiện bấm) */
  document.addEventListener('click',function(ev){var w=ev.target.closest&&ev.target.closest('#acctbox .acctwho,#acctbox .hs-slogan');if(w&&w.classList.contains('hs-slogan'))w=w.parentNode.querySelector('.acctwho');if(!w||w.title==='Admin'||(window.HNX&&HNX.khach()))return;ev.preventDefault();open()});
  /* Slogan nhỏ dưới tên trên thanh trên cùng (chỉ thành viên; textContent nên không cần thoát) */
  function slogan(){tb();avTop();var old=document.querySelectorAll('#acctbox .hs-slogan');old.forEach(function(x){x.remove()});return;/* slogan chỉ hiện dưới lời chào */var w=document.querySelector('#acctbox .acctwho');if(!w)return;var sp=w.parentNode.querySelector('.hs-slogan');var t=(window.HNX&&HNX.khach()||w.title==='Admin')?'':String(g().sl||'').slice(0,60);
    if(!t){if(sp)sp.remove();return}if(!sp){sp=document.createElement('span');sp.className='hs-slogan';w.insertAdjacentElement('afterend',sp)}if(sp.textContent!==t)sp.textContent=t;sp.title=t}
  /* Tên + slogan ngay trên thanh trên cùng, cạnh vòng tròn avatar (chỉ thành viên; textContent nên đã an toàn) */
  function tb(){var av=document.querySelector('.topbar .hdr-av'),who=document.querySelector('#acctbox .acctwho'),inl=document.querySelector('#acctbox .acctin');var c=document.getElementById('hsTb');
    var n=who&&!inl&&who.title!=='Admin'&&!(window.HNX&&HNX.khach())?(who.textContent||'').trim():'';if(n==='…')n='';
    if(!av||!n){if(c)c.remove();return}
    if(!c){c=document.createElement('button');c.type='button';c.id='hsTb';c.className='hs-tb';c.innerHTML='<span class="hs-tb-n"></span><span class="hs-tb-s"></span>';c.addEventListener('click',function(ev){ev.stopPropagation();open()})}
    if(c.nextElementSibling!==av)av.parentNode.insertBefore(c,av);
    var sl=String(g().sl||'').trim().slice(0,60),a=c.firstChild,b=c.lastChild;if(a.textContent!==n)a.textContent=n;if(b.textContent!==sl)b.textContent='';b.hidden=true;
    var lab='Hồ sơ cá nhân: '+n;if(c.getAttribute('aria-label')!==lab){c.setAttribute('aria-label',lab);c.title=lab}}
  /* Ảnh đại diện trên thanh trên cùng: vòng tròn avatar (điện thoại) và ô tài khoản (máy tính) */
  function avTop(){var v=(window.HNX&&HNX.khach())?'':avg(),who=document.querySelector('#acctbox .acctwho');if(who&&who.title==='Admin')v='';
    var av=document.querySelector('.topbar .hdr-av');if(av){var on=!!v&&!!who&&!document.querySelector('#acctbox .acctin');var bg=on?'url("'+v+'")':'';if(av.style.backgroundImage!==bg)av.style.backgroundImage=bg;if(av.classList.contains('hs-img')!==on)av.classList.toggle('hs-img',on)}
    var box=document.getElementById('acctbox'),sm=box&&box.querySelector('.hs-avsm');if(!box||!who||!v){if(sm)sm.remove();return}
    if(!sm){sm=document.createElement('img');sm.className='hs-avsm';sm.alt='';box.insertBefore(sm,box.firstChild)}if(sm.getAttribute('src')!==v)sm.src=v}
  function watch(){var b=document.getElementById('acctbox');if(!b)return false;slogan();new MutationObserver(slogan).observe(b,{childList:true,subtree:true,characterData:true});return true}
  if(!watch()){var mo=new MutationObserver(function(){if(watch())mo.disconnect()});document.addEventListener('DOMContentLoaded',function(){if(!watch())mo.observe(document.body,{childList:true,subtree:true})})}
  document.addEventListener('hn-hoso',slogan);
  return {open:open,close:close,get:g,slogan:slogan};
})();
