// Đón khách (mockup 29/10): chào lần đầu + chọn trình độ, chúc mừng sau bài, khen khi đúng, chuỗi ngày, lời nhắc nhẹ.
// Mọi dữ liệu chỉ lưu trên máy (localStorage); không gửi đi đâu. Lỗi localStorage (Safari riêng tư) thì chạy bình thường, chỉ không nhớ.
const DK=(()=>{
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const g=k=>{try{return localStorage.getItem(k)}catch(e){return null}},s=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const LV=['n5','n4','n3','n2','n1'],PRIV='Lựa chọn và tiến độ chỉ lưu trên máy này của bạn, trang không thu thập thêm thông tin nào.';
const day=d=>{const x=new Date(d.getTime()+9*36e5);return x.toISOString().slice(0,10)};
const isGuest=()=>!(g('hn_sess_v1')||g('hn_admin_sess_v1'));
// chuỗi ngày + lần ghé trước
let gap=0;(function(){const now=new Date(),t=day(now),last=g('hn_dk_last');
 if(last){gap=Math.round((Date.parse(t)-Date.parse(last))/864e5)}
 let st={n:0,d:''};try{st=JSON.parse(g('hn_dk_streak')||'{}')||st}catch(e){}
 if(st.d!==t){st.n=(st.d&&Math.round((Date.parse(t)-Date.parse(st.d))/864e5)===1)?(st.n||0)+1:1;st.d=t;s('hn_dk_streak',JSON.stringify(st))}
 s('hn_dk_last',t)})();
const streak=()=>{try{return (JSON.parse(g('hn_dk_streak')||'{}').n)||1}catch(e){return 1}};
function toast(html){let t=document.querySelector('.dk-toast');if(!t){t=document.createElement('div');t.className='dk-toast';t.setAttribute('role','status');document.body.appendChild(t)}
 t.innerHTML=html;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),3800)}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=['#cf3a2e','#f2b33d','#3f8f5a','#3b6fc4','#e889a8'],w=document.createElement('div');w.className='dk-conf';w.setAttribute('aria-hidden','true');
 for(let i=0;i<60;i++){const p=document.createElement('i');p.style.left=Math.random()*100+'%';p.style.background=c[i%5];p.style.animationDelay=(Math.random()*.6)+'s';p.style.animationDuration=(1.8+Math.random()*1.4)+'s';p.style.transform='rotate('+(Math.random()*360)+'deg)';w.appendChild(p)}
 document.body.appendChild(w);setTimeout(()=>w.remove(),3800)}
// 5) lời nhắc nhẹ khi lâu chưa ghé, có nút tắt
function remind(force){const d=force||gap;if(d<3||g('hn_dk_nhac_off')==='1'||document.querySelector('.dk-remind'))return;
 const b=document.createElement('div');b.className='dk-remind';b.setAttribute('role','status');
 b.innerHTML='<p>🌸 Đã '+d+' ngày bạn chưa ghé. Không sao cả — bạn có thể học tiếp bất cứ lúc nào thuận tiện, chỉ vài phút cũng tốt ạ.</p><div class="dk-row"><a class="dk-btn" href="'+(isGuest()?'hoc-thu.html':'index.html#khoahoc')+'">Học tiếp bài gần nhất</a><button type="button" class="dk-btn ghost" data-x>Ẩn lần này</button><button type="button" class="dk-btn ghost" data-off>Tắt lời nhắc này</button></div>';
 b.querySelector('[data-x]').onclick=()=>b.remove();b.querySelector('[data-off]').onclick=()=>{s('hn_dk_nhac_off','1');b.innerHTML='<p>Đã tắt lời nhắc. Bạn có thể bật lại ở cuối trang chủ.</p>';setTimeout(()=>b.remove(),2500)};
 const m=document.querySelector('#guestHome:not([hidden])')||document.querySelector('main')||document.body;m.insertBefore(b,m.firstChild)}
// 5) khen khi làm đúng (bài trắc nghiệm có nút chấm)
document.addEventListener('click',e=>{const gr=e.target.closest&&e.target.closest('.grade');if(!gr)return;setTimeout(()=>{const Q=gr.closest('.mcq'),sc=Q&&Q.querySelector('.score');if(!sc)return;
 const ok=+sc.dataset.ok||0,n=Q.querySelectorAll('.mx').length||0;if(!ok)return toast('Bạn đã thử rồi, thế là tốt lắm ạ. Xem lại đáp án rồi làm lại nhé!');
 toast((ok===n?'🎉 Tuyệt vời! ':'👏 Giỏi lắm! ')+'Bạn làm đúng <b>'+ok+(n?'/'+n:'')+'</b> câu.')},50)},true);
// 1) chào lần đầu + chọn trình độ (khách, trang chủ)
const LVN={n5:'N5 · mới bắt đầu',n4:'N4 · sơ cấp',n3:'N3 · trung cấp',n2:'N2 · trên trung cấp',n1:'N1 · cao cấp'};
function welcome(box){if(!box)return;const lv=g('hn_dk_level');
 if(!lv||!LVN[lv]){box.innerHTML='<div class="dk-card dk-hi"><p class="dk-kicker">ようこそ · Chào mừng bạn</p><h2>Rất vui được gặp bạn!</h2><p>Để gợi ý bài phù hợp, cho mình hỏi nhanh một câu nhé:</p><h3>Bạn đang ở trình độ nào?</h3><div class="dk-lv">'+
  LV.map(l=>'<button type="button" class="dk-btn big" data-lv="'+l+'">'+LVN[l]+'</button>').join('')+'</div><a class="dk-btn big ghost" href="kiem-tra-trinh-do.html">Chưa rõ? Làm bài kiểm tra trình độ 5 phút</a><p class="dk-priv">🔒 '+PRIV+'</p></div>';
  box.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{s('hn_dk_level',b.dataset.lv);welcome(box);box.scrollIntoView({block:'start'})});return}
 box.innerHTML='<div class="dk-card dk-hi"><p class="dk-kicker">Gợi ý cho bạn · '+lv.toUpperCase()+'</p><h2>Bài học thử dành cho bạn</h2><div id="dkSug"><p class="mut">Đang tìm bài phù hợp…</p></div><button type="button" class="dk-btn ghost" data-chg>Đổi trình độ khác</button><p class="dk-priv">🔒 '+PRIV+'</p></div>';
 box.querySelector('[data-chg]').onclick=()=>{try{localStorage.removeItem('hn_dk_level')}catch(e){}welcome(box)};
 const sug=box.querySelector('#dkSug'),secs=[['tv','Từ vựng'],['np','Ngữ pháp'],['kj','Kanji']];
 Promise.all(secs.map(([sc,nm])=>(typeof LOCK!='undefined'&&LOCK.free?LOCK.free('/free/list?level='+lv+'&section='+sc):Promise.reject(new Error('x'))).then(j=>[sc,nm,(j.lessons||[]).find(x=>x.free)]).catch(()=>[sc,nm,null]))).then(rs=>{
  const ok=rs.filter(r=>r[2]);if(!ok.length){sug.innerHTML='<p>Hiện chưa tải được danh sách. Bạn có thể xem tất cả bài miễn phí ở trang Học thử.</p><a class="dk-btn big" href="hoc-thu.html">Mở trang Học thử</a>';return}
  sug.innerHTML=ok.map(([sc,nm,x],i)=>'<a class="dk-sug'+(i?'':' first')+'" href="lesson.html?id='+encodeURIComponent(x.id)+'&lv='+lv+'&s='+sc+'"><span class="tg">'+nm+'</span><b>'+esc(String(x.title).replace(/^Khóa N\d · [^·]+ · /,''))+'</b><span class="go">Mở bài này ▶</span></a>').join('')+'<a class="dk-btn" href="hoc-thu.html#'+lv+'">Xem tất cả bài miễn phí '+lv.toUpperCase()+'</a>'})}
// 2) sau bài học thử: đếm thật từ dữ liệu bài
function countOf(l){const t=String(l.type||''),sm=String(l.summary||'');
 if(/^Từ:/.test(sm))return [sm.replace(/^Từ:\s*/,'').split(/[、,]/).filter(x=>x.trim()).length,'từ vựng'];
 const rows=(l.sections||[]).reduce((a,x)=>a+Math.max(0,(String(x.html||'').match(/<tr>/g)||[]).length-1),0);
 if(rows)return [rows,/Kanji/i.test(t)?'chữ Hán':(/Ngữ pháp/i.test(t)?'mẫu ngữ pháp':'mục')];
 if((l.quiz||[]).length)return [l.quiz.length,'câu luyện tập'];return [0,'']}
function finish(){const l=(window.LESSONS||[])[0];const m=document.querySelector('main');if(!l||!m||document.querySelector('.dk-done'))return;
 const [n,u]=countOf(l),d=document.createElement('section');d.className='dk-card dk-done';
 d.innerHTML='<h2>Bạn đã đi tới cuối bài 👏</h2><p>Khi học xong, bạn bấm nút dưới đây để đánh dấu nhé.</p><button type="button" class="dk-btn big" data-fin>Đánh dấu: tôi đã học xong bài này</button>';
 d.querySelector('[data-fin]').onclick=()=>{confetti();const k='hn_dk_done';let a=[];try{a=JSON.parse(g(k)||'[]')}catch(e){}if(!a.includes(l.id))a.push(l.id);s(k,JSON.stringify(a.slice(-200)));
  d.innerHTML='<p class="dk-kicker">おめでとう · Chúc mừng bạn!</p><h2>'+(n?'Bạn vừa học <span class="dk-num">'+n+'</span> '+u+'!':'Bạn vừa học xong một bài!')+'</h2><p>Đây là bài học thử thứ <b>'+a.length+'</b> của bạn. 🔥 Chuỗi học: <b>'+streak()+' ngày</b>.</p>'+
  (isGuest()?'<a class="dk-btn big" href="dang-nhap.html">Lưu tiến độ, học tiếp miễn phí</a><a class="dk-btn ghost big" href="hoc-thu.html">Chọn bài học thử tiếp theo</a><p class="dk-priv">🔒 Hiện tiến độ chỉ lưu trên máy này. Khi có tài khoản (miễn phí), bạn xem được tiến độ trên mọi máy. Tài khoản mới được Khánh duyệt thủ công.</p>':'<a class="dk-btn big" href="index.html#khoahoc">Về danh sách bài</a>');d.scrollIntoView({block:'center'})};
 m.appendChild(d)}
addEventListener('guest',()=>{if(/lesson\.html/.test(location.pathname))setTimeout(finish,300)});
// 4) lần đầu sau khi được duyệt
const GOALS=[5,10,20];
function member(box,name){if(!box||g('hn_dk_member_ok')==='1')return;const n=String(name||'').trim().slice(0,40),lv=g('hn_dk_level')||'',gl=g('hn_dk_goal')||'';
 box.innerHTML='<div class="dk-card dk-hi"><p class="dk-kicker">ようこそ · Tài khoản đã được duyệt</p><h2>Chào mừng '+(n?'<span class="hn-name">'+esc(n)+'</span>':'bạn')+' đến với lớp học!</h2><p>Chỉ 3 bước nhỏ để bắt đầu thật nhẹ nhàng:</p><ol class="dk-steps">'+
 '<li class="'+(lv?'ok':'')+'"><b>1. Chọn trình độ</b><div class="dk-lv sm">'+LV.map(l=>'<button type="button" class="dk-btn'+(l===lv?'':' ghost')+'" data-lv="'+l+'" aria-pressed="'+(l===lv)+'">'+l.toUpperCase()+'</button>').join('')+'</div></li>'+
 '<li class="'+(gl?'ok':'')+'"><b>2. Đặt mục tiêu mỗi ngày</b><div class="dk-lv sm">'+GOALS.map(x=>'<button type="button" class="dk-btn'+(String(x)===gl?'':' ghost')+'" data-g="'+x+'" aria-pressed="'+(String(x)===gl)+'">'+x+' phút/ngày</button>').join('')+'</div></li>'+
 '<li><b>3. Học bài đầu tiên</b><div><a class="dk-btn big" href="lesson.html?id=khoa-'+(lv||'n5')+'-tv-01">Mở bài đầu tiên '+(lv||'n5').toUpperCase()+'</a></div></li></ol>'+
 '<div class="dk-badges"><span class="dk-streak">🔥 Chuỗi học <b>'+streak()+'</b> ngày</span><span class="dk-badge">🌱 Huy hiệu đầu tiên: <b>Khởi đầu</b></span></div>'+
 '<button type="button" class="dk-btn ghost" data-ok>Tôi đã hiểu, ẩn lời chào này</button><p class="dk-priv">🔒 Trình độ, mục tiêu, chuỗi ngày và huy hiệu chỉ lưu trên máy này.</p></div>';
 box.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{s('hn_dk_level',b.dataset.lv);member(box,name)});
 box.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{s('hn_dk_goal',b.dataset.g);member(box,name);toast('Đã lưu mục tiêu '+b.dataset.g+' phút mỗi ngày. Cảm ơn bạn!')});
 box.querySelector('[data-ok]').onclick=()=>{s('hn_dk_member_ok','1');box.innerHTML=''}}
function remindToggle(el){if(!el)return;const f=()=>{const off=g('hn_dk_nhac_off')==='1';el.innerHTML='Lời nhắc khi lâu chưa ghé: <b>'+(off?'đang tắt':'đang bật')+'</b> <button type="button" class="dk-btn ghost">'+(off?'Bật lại lời nhắc':'Tắt lời nhắc')+'</button>';el.querySelector('button').onclick=()=>{s('hn_dk_nhac_off',off?'0':'1');f()}};f()}
addEventListener('guest',()=>setTimeout(()=>remind(),50));addEventListener('unlocked',()=>setTimeout(()=>remind(),50));
document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>remind(),2500);remindToggle(document.getElementById('dkRemindSet'))});
return {esc,welcome,member,remind,toast,confetti,finish,countOf}})();
