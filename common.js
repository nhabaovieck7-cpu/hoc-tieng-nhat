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
// ===== Mục "Game" trong menu chính: chèn 1 lần vào .topbar .nav =====
// Trang game nằm ở thư mục con game/ → đường dẫn từ gốc là "game/index.html".
// Các trang game KHÔNG nạp common.js của trang chính nên không cần xử lý href ngược.
(function(){function boot(){var nav=document.querySelector('.topbar .nav');if(!nav||nav.querySelector('a[href="game/index.html"]'))return;var a=document.createElement('a');a.href='game/index.html';a.textContent='🎮 Game';a.className='hn-navlink';if(/(^|\/)game(\/|$)/.test(location.pathname))a.classList.add('on');nav.appendChild(a)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot()})();


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
/* Hồ sơ cá nhân (Phía B): bấm tên trên thanh trên cùng (chỉ thành viên). Lưu ở localStorage hn_dk_ho_so — cùng khóa mà HNX/khen-cau đọc (gt: nam|nu|''). Thành viên: đồng bộ theo tài khoản qua Worker /hoso (HNHOSO trong auth.js, gộp từng mục theo _t). */
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
     '<p class="hs-note">🔒 Lưu vào tài khoản để dùng trên các máy khác — chỉ chủ tài khoản xem được. Dùng để chọn cách xưng hô và lời chào. Không mục nào bắt buộc.</p>'+
     '<form id="hsF" novalidate>'+'<div class="hs-avrow"><span class="hs-lab" style="margin:0">Ảnh đại diện</span><input type="file" id="hsFile" accept="image/*" hidden><div class="hs-avbtn"><button type="button" class="dk-btn ghost" data-hs-pick>Đổi ảnh</button><button type="button" class="dk-btn ghost" data-hs-avdel>Xóa ảnh</button></div><p class="hs-hint" id="hsAvMsg" role="status">Ảnh được cắt vuông, thu nhỏ và lưu vào tài khoản.</p></div>'+inp('hsGoi','Muốn web gọi mình là gì?','text',h.goi,'off','VD: Sếp Tùng',30)+'<p class="hs-hint">Để trống thì web gọi theo mặc định.</p>'+inp('hsTen','Họ tên','text',h.ten,'name','')+
     '<label class="hs-lab" for="hsNam">Năm sinh</label><select class="hs-in" id="hsNam">'+o+'</select>'+
     '<fieldset class="hs-fs"><legend class="hs-lab">Giới tính</legend><div class="hs-rads">'+rad('hsGt','nam','Nam',h.gt)+rad('hsGt','nu','Nữ',h.gt)+rad('hsGt','','Không muốn nói',h.gt)+'</div></fieldset>'+
     '<label class="hs-lab" for="hsSl">Slogan cá nhân</label><input class="hs-in" id="hsSl" type="text" maxlength="60" value="'+e(h.sl)+'" autocomplete="off" placeholder="VD: Mỗi ngày một chút"><p class="hs-hint" id="hsSlN" aria-live="polite">'+String(h.sl||'').length+'/60</p>'+'<label class="hs-lab" for="hsSo">Sở thích</label><textarea class="hs-in" id="hsSo" rows="3" maxlength="200" placeholder="VD: nấu ăn, anime, đi bộ">'+e(h.so)+'</textarea>'+inp('hsDc','Địa chỉ','text',h.dc,'street-address','')+inp('hsDt','Số điện thoại','tel',h.dt,'tel','')+inp('hsEm','Email','email',h.em,'email','')+
     '<fieldset class="hs-fs"><legend class="hs-lab">Tình trạng</legend><div class="hs-rads">'+rad('hsTt','doc-than','Độc thân',h.tt)+rad('hsTt','ket-hon','Đã kết hôn',h.tt)+rad('hsTt','','Không muốn nói',h.tt)+'</div></fieldset>'+
     '<p class="hs-msg" id="hsMsg" role="status"></p><div class="hs-btns"><button type="submit" class="dk-btn big">Lưu</button><button type="button" class="dk-btn big ghost" data-hs-del>Xóa toàn bộ thông tin</button><button type="button" class="dk-btn big ghost" data-hs-close>Đóng</button></div>'+
     '<div class="hs-confirm" id="hsCf" hidden><p><b>Xóa toàn bộ thông tin hồ sơ trên tài khoản và trên máy này?</b><br>Cách xưng hô sẽ trở lại mặc định. Không ảnh hưởng tới tài khoản hay tiến độ học.</p><div class="hs-btns"><button type="button" class="dk-btn big" data-hs-yes>Xóa hết</button><button type="button" class="dk-btn big ghost" data-hs-no>Không xóa</button></div></div></form></section>';
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
      else if(t.closest('[data-hs-yes]')){if(typeof HNHOSO!='undefined'&&HNHOSO.wipe){HNHOSO.wipe().then(function(ok){if(!ok){var m=document.getElementById('hsMsg');if(m)m.textContent='Đã xóa trên máy này. Chưa kết nối được tới tài khoản — có mạng lại sẽ tự xóa nốt trên tài khoản.'}})}try{localStorage.removeItem(K);localStorage.removeItem(AK)}catch(x){}avPaint();avTop();d.querySelector('#hsF').reset();d.querySelectorAll('.hs-in').forEach(function(i){i.value=''});d.querySelector('#hsCf').hidden=true;d.querySelector('#hsSo').value='';d.querySelector('#hsSlN').textContent='0/60';d.querySelector('#hsSlH').hidden=true;done('Đã xóa toàn bộ thông tin hồ sơ.')}});
    d.querySelector('#hsF').addEventListener('submit',function(ev){ev.preventDefault();var f=function(id){return String(d.querySelector('#'+id).value||'').trim().slice(0,200)},r=function(n){var c=d.querySelector('input[name="'+n+'"]:checked');return c?c.value:''};
      var v={goi:f('hsGoi').slice(0,30),sl:f('hsSl').slice(0,60),so:f('hsSo').slice(0,200),ten:f('hsTen'),nam:f('hsNam'),gt:r('hsGt'),dc:f('hsDc'),dt:f('hsDt'),em:f('hsEm'),tt:r('hsTt')};var p=g(),t=Object.assign({},p._t||{}),now=Date.now();Object.keys(v).forEach(function(k){if(String(p[k]||'')!==String(v[k]||''))t[k]=now;if(!v[k])delete v[k]});if(Object.keys(t).length)v._t=t;
      try{localStorage.setItem(K,JSON.stringify(v))}catch(x){}var hh=d.querySelector('#hsSlH');done('Đã lưu. Cảm ơn '+((window.HNX&&HNX.xung())||'nhiều')+' ạ!')});
    document.addEventListener('keydown',function k(ev){if(ev.key==='Escape'){close();document.removeEventListener('keydown',k)}});
    d.querySelector('#hsSl').addEventListener('input',function(){d.querySelector('#hsSlN').textContent=this.value.length+'/60'});var f0=d.querySelector('#hsTen');if(f0&&!('ontouchstart' in window))f0.focus();
  }
  /* Tên trên thanh trên cùng -> mở hồ sơ (không đụng auth.js: chỉ bắt sự kiện bấm) */
  document.addEventListener('click',function(ev){var w=ev.target.closest&&ev.target.closest('#acctbox .acctwho,#acctbox .hs-slogan');if(w&&w.classList.contains('hs-slogan'))w=w.parentNode.querySelector('.acctwho');if(!w||w.title==='Admin'||(window.HNX&&HNX.khach()))return;ev.preventDefault();open()});
  /* Slogan nhỏ dưới tên trên thanh trên cùng (chỉ thành viên; textContent nên không cần thoát) */
  function slogan(){nick();tb();avTop();var old=document.querySelectorAll('#acctbox .hs-slogan');old.forEach(function(x){x.remove()});return;/* slogan chỉ hiện dưới lời chào */var w=document.querySelector('#acctbox .acctwho');if(!w)return;var sp=w.parentNode.querySelector('.hs-slogan');var t=(window.HNX&&HNX.khach()||w.title==='Admin')?'':String(g().sl||'').slice(0,60);
    if(!t){if(sp)sp.remove();return}if(!sp){sp=document.createElement('span');sp.className='hs-slogan';w.insertAdjacentElement('afterend',sp)}if(sp.textContent!==t)sp.textContent=t;sp.title=t}
  /* Tên + slogan ngay trên thanh trên cùng, cạnh vòng tròn avatar (chỉ thành viên; textContent nên đã an toàn) */
  function nick(){var w=document.querySelector('#acctbox .acctwho');if(!w||w.title==='Admin'||(window.HNX&&HNX.khach()))return;if(w.dataset.acc==null)w.dataset.acc=(w.textContent||'').trim();var gn=String(g().goi||'').trim().slice(0,30),t=gn||w.dataset.acc;if(t&&w.textContent!==t)w.textContent=t}
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

// ===== Khung chat thu gọn (dock) dùng chung toàn trang =====
// Gắn qua common.js: học viên nhắn tin ngay trong trang đang học, không phải
// rời sang trang Tin nhắn. Thu gọn = nút tròn (máy tính) / thanh mỏng ngay
// trên thanh tab (điện thoại); bung ra = danh sách hội thoại + 1 cuộc trò
// chuyện (chữ + ảnh). Tính năng nặng (cảm xúc, trả lời trích dẫn…) ở trang
// tin-nhan.html đầy đủ. KHÔNG có chỉ báo "đang gõ…".
// Chỉ hiện khi đã có phiên học viên; không gắn ở trang đăng nhập/chờ duyệt/
// quản trị và trang Tin nhắn (đã là khung chat đầy đủ). Riêng cong-dong.html:
// máy tính ≥1000px trang đã có cửa sổ chat nổi riêng (.cd-dock) nên dock này
// chỉ gắn ở bề rộng <1000px để không chồng lên nhau.
(function(){
var PAGE=(location.pathname||'').split('/').pop()||'index.html';
if(/^(dang-nhap|dang-cho|admin|tin-nhan)\.html$/.test(PAGE))return;
function sess(){try{return localStorage.getItem('hn_sess_v1')||''}catch(e){return ''}}
if(!sess())return;
var EP=(typeof SITE!='undefined'&&SITE&&SITE.aiEndpoint)||'';
if(!EP)return;
EP=EP.replace(/\/$/,'');
var CDMQ=(PAGE==='cong-dong.html'&&window.matchMedia)?window.matchMedia('(max-width:999px)'):null;
if(CDMQ&&!CDMQ.matches)return;

var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
async function api(path,opts){opts=opts||{};var h={'Content-Type':'application/json'};var t=sess();if(t)h.Authorization='Bearer '+t;
 var r=await fetch(EP+path,{method:opts.method||'GET',headers:h,body:opts.body?JSON.stringify(opts.body):undefined});
 var j=await r.json().catch(function(){return{}});if(!r.ok){var e=new Error(j.error||('Lỗi '+r.status));e.status=r.status;e.body=j;throw e}return j}
var COLORS=['#cf3a2e','#233d63','#2e7d4f','#8a5a00','#6a3fa0','#0f6f7a','#a03d63','#4c5866'];
function color(id){var h=0,s=String(id||'');for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return COLORS[h%COLORS.length]}
function when(t){try{var d=new Date(t),s=(Date.now()-d)/1000;if(s<60)return'vừa xong';if(s<3600)return Math.floor(s/60)+' phút';if(s<86400)return Math.floor(s/3600)+' giờ';if(s<86400*7)return Math.floor(s/86400)+' ngày';return d.toLocaleDateString('vi-VN')}catch(e){return''}}
function hmt(t){try{return new Date(t).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}catch(e){return''}}
function isOn(p){if(!p)return false;if(typeof p.online!=='undefined')return !!p.online;var ls=p.last_seen;if(ls){try{return (Date.now()-new Date(ls).getTime())<120000}catch(e){return false}}return false}

var CSS=''
+'.hdk{font-size:15px;color:var(--t)}'
+'.hdk-fab{position:fixed;right:20px;bottom:20px;z-index:72;width:56px;height:56px;border-radius:50%;border:0;background:var(--c2);color:#fff;font-size:25px;line-height:1;cursor:pointer;box-shadow:0 8px 24px rgba(20,26,38,.35);display:flex;align-items:center;justify-content:center;transition:transform .18s ease,background .18s ease}'
+'.hdk-fab:hover{transform:translateY(-2px)}'
+'.hdk-bar{display:none}'
+'.hdk-bdg{position:absolute;top:-3px;right:-3px;background:var(--c);color:#fff;border-radius:999px;min-width:20px;height:20px;font-size:11.5px;font-weight:700;display:none;align-items:center;justify-content:center;padding:0 5px;border:2px solid var(--card)}'
+'.hdk-bdg.on{display:inline-flex}'
+'.hdk-panel{margin:0;padding:0;position:fixed;right:20px;bottom:88px;z-index:72;width:340px;max-width:calc(100vw - 24px);height:min(520px,calc(100vh - 120px));background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 18px 48px rgba(15,20,30,.28);display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(12px);transition:opacity .22s ease,transform .22s ease,visibility .22s}'
+'.hdk[data-state="list"] .hdk-panel,.hdk[data-state="chat"] .hdk-panel{opacity:1;visibility:visible;transform:none}'
+'.hdk-ph{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--line);min-height:52px;box-sizing:border-box}'
+'.hdk-ph b{font-size:16px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.hdk-ic{flex:0 0 auto;width:38px;height:38px;border-radius:50%;border:0;background:var(--soft);color:var(--t);font-size:17px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-decoration:none}'
+'.hdk-ic:hover{filter:brightness(.96)}'
+'.hdk-items{flex:1;overflow-y:auto;padding:6px}'
+'.hdk-it{display:flex;gap:10px;width:100%;text-align:left;background:none;border:0;border-radius:12px;padding:9px 8px;font:inherit;color:var(--t);cursor:pointer;align-items:center}'
+'.hdk-it:hover{background:var(--soft)}'
+'.hdk-ava{position:relative;width:44px;height:44px;border-radius:50%;flex:0 0 44px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:17px;overflow:visible}'
+'.hdk-ava img{width:100%;height:100%;border-radius:50%;object-fit:cover}'
+'.hdk-ava.sm{width:30px;height:30px;flex-basis:30px;font-size:12.5px}'
+'.hdk-onl{position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:50%;background:#31a24c;border:2px solid var(--card)}'
+'.hdk-imid{flex:1;min-width:0}'
+'.hdk-inm{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;gap:6px;align-items:center}'
+'.hdk-lv{font-size:11px;font-weight:700;background:var(--soft);color:var(--c2);border-radius:999px;padding:1px 7px}'
+'.hdk-adm{font-size:11px;font-weight:700;background:var(--shu-soft,#faecea);color:var(--c);border-radius:999px;padding:1px 7px}'
+'.hdk-ipv{color:var(--m);font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.hdk-it.un .hdk-ipv{color:var(--t);font-weight:600}'
+'.hdk-irt{flex:0 0 auto;text-align:right}'
+'.hdk-itm{color:var(--m);font-size:12px}'
+'.hdk-cbdg{display:inline-flex;margin-top:3px;background:var(--c);color:#fff;border-radius:999px;min-width:19px;height:19px;font-size:11px;font-weight:700;align-items:center;justify-content:center;padding:0 5px}'
+'.hdk-empty{padding:22px 14px;color:var(--m);text-align:center;line-height:1.6}'
+'.hdk-msgs{flex:1;overflow-y:auto;padding:12px 10px;display:flex;flex-direction:column;gap:8px;background:var(--bg)}'
+'.hdk-row{display:flex;gap:7px;align-items:flex-end;max-width:100%}'
+'.hdk-row.me{flex-direction:row-reverse}'
+'.hdk-bub{max-width:76%;background:var(--card);border:1px solid var(--line);border-radius:16px 16px 16px 5px;padding:8px 11px;line-height:1.5;word-break:break-word;white-space:pre-wrap;font-size:14.5px}'
+'.hdk-row.me .hdk-bub{background:var(--c2);border-color:var(--c2);color:#fff;border-radius:16px 16px 5px 16px}'
+'.hdk-bub img{max-width:100%;border-radius:10px;display:block;margin:2px 0}'
+'.hdk-tm{font-size:11px;opacity:.65;margin-top:3px;text-align:right}'
+'.hdk-row.me .hdk-tm{text-align:right}'
+'.hdk-at{color:var(--c2);font-weight:600}'
+'.hdk-row.me .hdk-at{color:#bcd6ff}'
+'.hdk-quote{border-left:3px solid var(--c);background:var(--soft);border-radius:6px;padding:4px 8px;font-size:13px;margin-bottom:5px;color:var(--t)}'
+'.hdk-row.me .hdk-quote{background:rgba(255,255,255,.14);color:#fff;border-left-color:#fff}'
+'.hdk-share{display:block;text-decoration:none;background:var(--soft);border:1px solid var(--line);border-radius:10px;padding:8px 10px;color:var(--t);margin-bottom:5px;font-size:13.5px}'
+'.hdk-doc{display:inline-block;text-decoration:none;background:var(--soft);border:1px solid var(--line);border-radius:10px;padding:6px 10px;color:var(--t);font-size:13.5px;margin:2px 0}'
+'.hdk-rcpt{align-self:flex-end;font-size:11.5px;color:var(--m);padding:0 4px}'
+'.hdk-form{display:flex;gap:7px;align-items:flex-end;padding:9px 10px;border-top:1px solid var(--line);background:var(--card)}'
+'.hdk-in{flex:1;font:inherit;font-size:15px;line-height:1.4;max-height:74px;resize:none;border:1.5px solid var(--line);border-radius:18px;padding:9px 13px;outline:none;background:var(--card);color:var(--t);box-sizing:border-box}'
+'.hdk-in:focus{border-color:var(--c2)}'
+'.hdk-send{flex:0 0 auto;border:0;border-radius:999px;background:var(--c);color:#fff;font:inherit;font-weight:700;padding:10px 16px;cursor:pointer;min-height:42px}'
+'.hdk-send:disabled{opacity:.55;cursor:default}'
+'.hdk-imgb{flex:0 0 auto;width:42px;height:42px;border-radius:50%;border:0;background:var(--soft);font-size:18px;cursor:pointer}'
+'.hdk-chip{display:none;align-items:center;gap:8px;margin:0 10px;padding:7px 10px;background:var(--soft);border-radius:10px;font-size:13px}'
+'.hdk-chip.on{display:flex}.hdk-chip span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.hdk-chip button{border:0;background:none;cursor:pointer;font-size:14px;color:var(--m)}'
+'.hdk-err{display:none;margin:0;padding:7px 12px;color:var(--c);font-size:13px;background:var(--card)}'
+'.hdk-err.on{display:block}'
+'.hdk-status{font-size:12.5px;color:var(--m);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.hdk-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#31a24c;margin-right:5px;vertical-align:1px}'
+'.hdk.hdk-lift .hdk-fab{bottom:76px}'
+'.hdk.hdk-lift .hdk-panel{bottom:144px}'
+'@media(max-width:860px){'
+'.hdk-fab{display:none}'
+'.hdk-bar{display:flex;position:fixed;left:0;right:0;bottom:calc(62px + env(safe-area-inset-bottom,0px));z-index:72;height:42px;border:0;border-top:1px solid var(--line);background:var(--card);color:var(--t);font:inherit;font-size:14.5px;align-items:center;gap:8px;padding:0 14px;cursor:pointer;box-shadow:0 -4px 14px rgba(15,20,30,.07)}'
+'.hdk-bar .hdk-bdg{position:static;border:0}'
+'.hdk-bar-tx{font-weight:700;flex:0 0 auto}'
+'.hdk-bar-pv{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--m);text-align:left}'
+'body.hdk-on{padding-bottom:calc(118px + env(safe-area-inset-bottom,0px))}'
+'.hdk-panel{left:0;right:0;bottom:calc(62px + env(safe-area-inset-bottom,0px));top:60px;width:auto;max-width:none;height:auto;border-radius:18px 18px 0 0;border-bottom:0}'
+'.hdk.hdk-lift .hdk-bar{bottom:calc(124px + env(safe-area-inset-bottom,0px))}'
+'.hdk.hdk-lift .hdk-panel{bottom:calc(124px + env(safe-area-inset-bottom,0px))}'
+'}';

var SSK='hdk_v1';
var S={open:false,view:'list',conv:null,other:null};
function saveS(){try{sessionStorage.setItem(SSK,JSON.stringify({o:S.open?1:0,v:S.view,c:S.conv||null,u:S.other?{id:S.other.id,name:S.other.name||''}:null}))}catch(e){}}
function loadS(){try{var j=JSON.parse(sessionStorage.getItem(SSK)||'null');if(j&&typeof j==='object'){S.open=!!j.o;S.view=j.v==='chat'?'chat':'list';S.conv=j.c||null;S.other=j.u||null}}catch(e){}}
var CONVS=[],MSGS=[],STORAGE=false,pendFile=null,loadingMsgs=false,dead=false,timers=[];
var root,fabEl,barEl,barPv,bdgEls,panel,listBox,chatBox,msgBox,inEl,errEl,chipEl,phTitle,phSub,chatHead;
var FURL={};

function avaHTML(p,sm){if(!p)return '<span class="hdk-ava'+(sm?' sm':'')+'" style="background:#8593a2">?</span>';
 var ini=esc(((p.name||'?').trim().charAt(0)||'?').toUpperCase());
 if(p.avatar_file)return '<span class="hdk-ava'+(sm?' sm':'')+'" style="background:'+color(p.id)+'"><img data-hdkf="'+esc(p.avatar_file)+'" alt="" loading="lazy" onerror="this.remove()">'+(isOn(p)?'<span class="hdk-onl"></span>':'')+'</span>';
 return '<span class="hdk-ava'+(sm?' sm':'')+'" style="background:'+color(p.id)+'">'+ini+(isOn(p)?'<span class="hdk-onl"></span>':'')+'</span>'}
async function resolveFiles(scope){if(!scope)return;var ids=[];scope.querySelectorAll('[data-hdkf]').forEach(function(el){var id=el.getAttribute('data-hdkf');if(id&&!FURL[id]&&ids.indexOf(id)<0)ids.push(id)});
 scope.querySelectorAll('[data-hdkf]').forEach(function(el){var id=el.getAttribute('data-hdkf');if(id&&FURL[id]){if(el.tagName==='A')el.href=FURL[id];else el.src=FURL[id]}});
 if(!ids.length)return;
 try{var j=await api('/community/file-token',{method:'POST',body:{ids:ids.slice(0,60)}});var map=j.urls||{};Object.keys(map).forEach(function(k){var v=String(map[k]);FURL[k]=v.charAt(0)==='/'?EP+v:v});
  scope.querySelectorAll('[data-hdkf]').forEach(function(el){var id=el.getAttribute('data-hdkf');if(id&&FURL[id]){if(el.tagName==='A')el.href=FURL[id];else el.src=FURL[id]}})}catch(e){}}
function convPreview(c){var t=String(c.last_text||'');if(c.last_kind==='post')t='↗️ Đã chia sẻ một bài viết';if(!t)t='Chưa có tin nhắn';return (c.last_mine?'Bạn: ':'')+t}
function setBadge(n){bdgEls.forEach(function(b){b.textContent=n>99?'99+':String(n);b.classList.toggle('on',n>0)})}
function renderBar(){var c=CONVS[0];if(!c){barPv.textContent='Nhắn tin với bạn học';return}
 barPv.textContent=((c.other&&c.other.name)?c.other.name+': ':'')+convPreview(c)}
function convHTML(c){var p=c.other||{};var on=isOn(p)||isOn(c);var adm=c.is_admin||p.admin;
 return '<button type="button" class="hdk-it'+(c.unread?' un':'')+'" data-conv="'+esc(c.id)+'">'
 +avaHTML(p)
 +'<span class="hdk-imid"><span class="hdk-inm">'+esc(p.name||'Học viên')+(p.level?'<span class="hdk-lv">'+esc(p.level)+'</span>':'')+(adm?'<span class="hdk-adm">Admin</span>':'')+'</span>'
 +'<span class="hdk-ipv">'+esc(convPreview(c))+'</span></span>'
 +'<span class="hdk-irt">'+(c.last_at?'<span class="hdk-itm">'+when(c.last_at)+'</span>':'')+(c.unread?'<br><span class="hdk-cbdg">'+c.unread+'</span>':'')+'</span></button>'}
function renderList(){if(!CONVS.length){listBox.innerHTML='<div class="hdk-empty">Chưa có cuộc trò chuyện nào.<br>Vào trang Cộng đồng hoặc Bạn bè để bắt đầu nhắn tin nhé 💬</div>';return}
 listBox.innerHTML=CONVS.map(convHTML).join('');resolveFiles(listBox)}
function bodyHTML(m){var b=esc(m.body||'');var mp=m.mentions||{};
 return b.replace(/@\[([^\]]+)\]/g,function(t,id){return mp[id]?'<span class="hdk-at">@'+esc(mp[id])+'</span>':t}).replace(/\n/g,'<br>')}
function msgHTML(m){if(m.deleted)return '<div class="hdk-row'+(m.mine?' me':'')+'"><div class="hdk-bub" style="font-style:italic;opacity:.75">Tin nhắn đã bị xoá</div></div>';
 var inner='';
 if(m.kind==='post'&&m.ref_id){var ex=(m.post&&m.post.body)?esc(String(m.post.body).slice(0,90))+'…':'Bài viết được chia sẻ';
  inner+='<a class="hdk-share" href="cong-dong.html#post-'+esc(m.ref_id)+'">📌 '+ex+'</a>'}
 if(m.reply_preview&&!m.reply_preview.deleted)inner+='<div class="hdk-quote">'+esc(m.reply_preview.body||'')+'</div>';
 if(m.body)inner+='<div>'+bodyHTML(m)+'</div>';
 if(m.file){if(m.file.kind==='image')inner+='<img data-hdkf="'+esc(m.file.id)+'" alt="'+esc(m.file.name||'Ảnh đính kèm')+'">';
  else inner+='<a class="hdk-doc" data-hdkf="'+esc(m.file.id)+'" href="#" onclick="return false">📎 '+esc(m.file.name||'Tệp đính kèm')+'</a>'}
 if(!inner)inner='<div>📎 Tệp đính kèm</div>';
 inner+='<div class="hdk-tm">'+hmt(m.created_at)+'</div>';
 return '<div class="hdk-row'+(m.mine?' me':'')+'">'+(m.mine?'':avaHTML(S.other,true))+'<div class="hdk-bub">'+inner+'</div></div>'}
function renderMsgs(){if(!MSGS.length){msgBox.innerHTML='<div class="hdk-empty">Hãy gửi lời chào đầu tiên nhé 👋</div>';return}
 var html=MSGS.map(msgHTML).join('');
 var lastMine=null;for(var i=MSGS.length-1;i>=0;i--){if(MSGS[i].mine){lastMine=MSGS[i];break}}
 if(lastMine&&lastMine.read_at)html+='<div class="hdk-rcpt">Đã xem ✓✓</div>';
 msgBox.innerHTML=html;resolveFiles(msgBox);msgBox.scrollTop=msgBox.scrollHeight}
function msgSig(){return MSGS.map(function(m){return [m.id,m.read_at?1:0,m.deleted?1:0].join(':')}).join('|')}
function statusTx(){var p=S.other;if(!p)return 'Nhắn tin riêng';
 if(S.isAdmin)return 'Quản trị viên · Chính thức';
 if(isOn(p))return '<span class="hdk-dot"></span>Đang hoạt động';
 if(p.last_seen)return 'Hoạt động '+when(p.last_seen)+' trước';return 'Nhắn tin riêng'}
function paint(){if(!root)return;root.dataset.state=S.open?(S.view==='chat'?'chat':'list'):'closed';
 fabEl.setAttribute('aria-expanded',S.open?'true':'false');barEl.setAttribute('aria-expanded',S.open?'true':'false');
 listBox.style.display=S.view==='chat'?'none':'';chatBox.style.display=S.view==='chat'?'flex':'none';
 var ph=document.getElementById('hdkphList'),pc=document.getElementById('hdkphChat');
 ph.style.display=S.view==='chat'?'none':'flex';pc.style.display=S.view==='chat'?'flex':'none';
 if(S.view==='chat'&&S.other){phTitle.textContent=S.other.name||'Học viên';phSub.innerHTML=statusTx();
  var lk=document.getElementById('hdkFull');lk.href='tin-nhan.html?conv='+encodeURIComponent(S.conv||'');
  var av=document.getElementById('hdkChatAva');av.innerHTML=avaHTML(S.other);resolveFiles(av)}
 saveS()}
async function refreshBadge(){try{var j=await api('/community/unread');setBadge(j.chat||0)}catch(e){}}
async function loadConvs(quiet){try{var j=await api('/chat/conversations');CONVS=j.conversations||[];STORAGE=!!j.storage_enabled;
 var ib=document.getElementById('hdkImgB');if(ib)ib.style.display=STORAGE?'':'none';
 renderBar();if(S.view!=='chat')renderList();
 if(S.conv){var c=CONVS.find(function(x){return x.id===S.conv});if(c){S.other=c.other||S.other;S.isAdmin=!!c.is_admin;if(S.view==='chat')paint()}}
 }catch(e){if(e.status===401||e.status===403){dead=true;unmount()}else if(!quiet){listBox.innerHTML='<div class="hdk-empty">Không tải được danh sách hội thoại.<br>Đóng khung rồi mở lại để thử lại nhé.</div>'}}}
async function loadMsgs(quiet){if(!S.conv||loadingMsgs)return;loadingMsgs=true;
 try{var j=await api('/chat/messages?conv_id='+encodeURIComponent(S.conv));
  if(j.other){S.other=j.other}if(typeof j.is_admin!=='undefined')S.isAdmin=!!j.is_admin;
  var before=msgSig();MSGS=j.messages||[];
  if(!quiet||msgSig()!==before){renderMsgs();paint()}
  var c=CONVS.find(function(x){return x.id===S.conv});if(c&&c.unread){c.unread=0}
  refreshBadge();
 }catch(e){if(!quiet)showErr('Không tải được tin nhắn.')}loadingMsgs=false}
function showErr(t){errEl.textContent=t;errEl.classList.add('on');setTimeout(function(){errEl.classList.remove('on')},4000)}
async function openConv(id){var c=CONVS.find(function(x){return x.id===id});S.conv=id;if(c){S.other=c.other||S.other;S.isAdmin=!!c.is_admin}
 S.view='chat';S.open=true;MSGS=[];msgBox.innerHTML='<div class="hdk-empty">Đang tải tin nhắn…</div>';paint();await loadMsgs(false)}
function openDock(view){S.open=true;if(view)S.view=view;if(S.view==='chat'&&!S.conv)S.view='list';paint();
 if(S.view==='chat'&&S.conv){loadMsgs(true)}else{loadConvs(true)}
 if(window.innerWidth>860&&S.view==='chat')setTimeout(function(){try{inEl.focus()}catch(e){}},60)}
function closeDock(){S.open=false;paint()}
async function shrinkImage(file){if(!/^image\//.test(file.type))return file;
 return new Promise(function(res){var url;try{url=URL.createObjectURL(file)}catch(e){res(file);return}
 var img=new Image();
 img.onload=function(){URL.revokeObjectURL(url);var mx=1600,w=img.naturalWidth,h=img.naturalHeight;if(w<=mx&&h<=mx&&file.size<=2*1024*1024){res(file);return}
  var k=Math.min(1,mx/Math.max(w,h));var cv=document.createElement('canvas');cv.width=Math.round(w*k);cv.height=Math.round(h*k);
  cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);cv.toBlob(function(b){res(b?new File([b],file.name.replace(/\.\w+$/,'.jpg'),{type:'image/jpeg'}):file)},'image/jpeg',0.82)};
 img.onerror=function(){URL.revokeObjectURL(url);res(file)};img.src=url})}
async function send(){if(!S.conv)return;var body=inEl.value.trim();if(!body&&!pendFile)return;
 var btn=document.getElementById('hdkSend');btn.disabled=true;
 try{var fileId;
  if(pendFile){var f=await shrinkImage(pendFile);var fd=new FormData();fd.append('purpose','chat');fd.append('file',f);
   var r=await fetch(EP+'/community/upload',{method:'POST',headers:{Authorization:'Bearer '+sess()},body:fd});
   var ju=await r.json().catch(function(){return{}});if(!r.ok)throw new Error(ju.error||('Lỗi tải ảnh '+r.status));fileId=(ju.file&&ju.file.id)||ju.id;
   pendFile=null;paintChip()}
  var j=await api('/chat/send',{method:'POST',body:{conv_id:S.conv,body:body,file_id:fileId}});
  inEl.value='';inEl.style.height='auto';
  if(j.message){MSGS.push(j.message);renderMsgs()}
  loadConvs(true);
 }catch(e){showErr(e.message||'Không gửi được tin nhắn.')}
 btn.disabled=false;if(window.innerWidth>860)inEl.focus()}
function paintChip(){if(pendFile){chipEl.classList.add('on');chipEl.querySelector('span').textContent='🖼 '+pendFile.name}else{chipEl.classList.remove('on')}}
function heartbeat(){if(document.hidden)return;api('/community/heartbeat',{method:'POST',body:{}}).catch(function(){})}
function tickBadge(){if(document.hidden||dead)return;refreshBadge();
 var ob=document.querySelector('.offbar');root.classList.toggle('hdk-lift',!!ob)}
function mount(){
 loadS();
 var st=document.createElement('style');st.id='hdkcss';st.textContent=CSS;document.head.appendChild(st);
 root=document.createElement('div');root.className='hdk';root.id='hdk';root.dataset.state='closed';
 root.innerHTML=''
 +'<button type="button" class="hdk-fab" id="hdkFab" aria-label="Mở khung nhắn tin" aria-expanded="false">💬<span class="hdk-bdg"></span></button>'
 +'<button type="button" class="hdk-bar" id="hdkBar" aria-label="Mở khung nhắn tin" aria-expanded="false">💬<span class="hdk-bar-tx">Tin nhắn</span><span class="hdk-bar-pv">Nhắn tin với bạn học</span><span class="hdk-bdg"></span></button>'
 +'<div class="hdk-panel" role="dialog" aria-label="Khung nhắn tin">'
 +'<div class="hdk-ph" id="hdkphList"><b>💬 Tin nhắn</b><a class="hdk-ic" href="tin-nhan.html" title="Mở trang Tin nhắn đầy đủ" aria-label="Mở trang Tin nhắn đầy đủ">↗</a><button type="button" class="hdk-ic" id="hdkX1" aria-label="Thu gọn">✕</button></div>'
 +'<div class="hdk-ph" id="hdkphChat" style="display:none"><button type="button" class="hdk-ic" id="hdkBack" aria-label="Về danh sách">‹</button><span id="hdkChatAva"></span><span style="flex:1;min-width:0"><b id="hdkName"></b><br><span class="hdk-status" id="hdkStatus"></span></span><a class="hdk-ic" id="hdkFull" href="tin-nhan.html" title="Mở trong trang Tin nhắn" aria-label="Mở trong trang Tin nhắn">↗</a><button type="button" class="hdk-ic" id="hdkX2" aria-label="Thu gọn">✕</button></div>'
 +'<div class="hdk-items" id="hdkList"></div>'
 +'<div id="hdkChat" style="display:none;flex:1;flex-direction:column;min-height:0">'
 +'<div class="hdk-msgs" id="hdkMsgs"></div>'
 +'<p class="hdk-err" id="hdkErr" role="status"></p>'
 +'<div class="hdk-chip" id="hdkChip"><span></span><button type="button" id="hdkChipX" aria-label="Bỏ ảnh đính kèm">✕</button></div>'
 +'<form class="hdk-form" id="hdkForm"><button type="button" class="hdk-imgb" id="hdkImgB" aria-label="Gửi ảnh">🖼</button><input type="file" id="hdkFile" accept="image/*" hidden><textarea class="hdk-in" id="hdkIn" rows="1" maxlength="4000" placeholder="Nhắn tin…" aria-label="Nhắn tin"></textarea><button type="submit" class="hdk-send" id="hdkSend">Gửi</button></form>'
 +'</div></div>';
 document.body.appendChild(root);
 document.body.classList.add('hdk-on');
 fabEl=root.querySelector('#hdkFab');barEl=root.querySelector('#hdkBar');barPv=root.querySelector('.hdk-bar-pv');
 bdgEls=[root.querySelector('#hdkFab .hdk-bdg'),root.querySelector('#hdkBar .hdk-bdg')];
 panel=root.querySelector('.hdk-panel');listBox=root.querySelector('#hdkList');chatBox=root.querySelector('#hdkChat');
 msgBox=root.querySelector('#hdkMsgs');inEl=root.querySelector('#hdkIn');errEl=root.querySelector('#hdkErr');chipEl=root.querySelector('#hdkChip');
 phTitle=root.querySelector('#hdkName');phSub=root.querySelector('#hdkStatus');chatHead=root.querySelector('#hdkphChat');
 fabEl.addEventListener('click',function(){S.open?closeDock():openDock()});
 barEl.addEventListener('click',function(){S.open?closeDock():openDock()});
 root.querySelector('#hdkX1').addEventListener('click',closeDock);
 root.querySelector('#hdkX2').addEventListener('click',closeDock);
 root.querySelector('#hdkBack').addEventListener('click',function(){S.view='list';paint();renderList()});
 listBox.addEventListener('click',function(e){var b=e.target.closest?e.target.closest('[data-conv]'):null;if(b)openConv(b.getAttribute('data-conv'))});
 root.querySelector('#hdkForm').addEventListener('submit',function(e){e.preventDefault();send()});
 inEl.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
 inEl.addEventListener('input',function(){inEl.style.height='auto';inEl.style.height=Math.min(inEl.scrollHeight,74)+'px'});
 var fIn=root.querySelector('#hdkFile');
 root.querySelector('#hdkImgB').addEventListener('click',function(){fIn.click()});
 fIn.addEventListener('change',function(){if(fIn.files&&fIn.files[0]){pendFile=fIn.files[0];paintChip()}fIn.value=''});
 root.querySelector('#hdkChipX').addEventListener('click',function(){pendFile=null;paintChip()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&S.open)closeDock()});
 document.addEventListener('visibilitychange',function(){if(document.hidden||dead)return;refreshBadge();heartbeat();
  if(S.open){if(S.view==='chat')loadMsgs(true);else loadConvs(true)}});
 timers.push(setInterval(tickBadge,60000));
 timers.push(setInterval(function(){if(!document.hidden&&!dead&&S.open&&S.view==='chat')loadMsgs(true)},10000));
 timers.push(setInterval(function(){if(!document.hidden&&!dead&&S.open&&S.view!=='chat')loadConvs(true)},30000));
 timers.push(setInterval(heartbeat,75000));
 paint();
 refreshBadge();heartbeat();
 loadConvs(true).then(function(){if(dead||!root)return;if(S.open&&S.view==='chat'&&S.conv){paint();loadMsgs(true)}
  else if(S.open){paint()}});
}
function unmount(){timers.forEach(clearInterval);timers=[];
 if(root&&root.parentNode)root.parentNode.removeChild(root);root=null;
 document.body.classList.remove('hdk-on');
 var cs=document.getElementById('hdkcss');if(cs)cs.remove()}
if(CDMQ){var onchg=function(){if(CDMQ.matches){if(!root)mount()}else{if(root){unmount();root=null}}};
 if(CDMQ.addEventListener)CDMQ.addEventListener('change',onchg);else if(CDMQ.addListener)CDMQ.addListener(onchg)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();

