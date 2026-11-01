/* MANGA THEME (redesign-manga, 01/11/2026): tabbar 5 o thong nhat + hero trang chu.
   Chi THEM giao dien; doc du lieu that (AUTH.me, hn_prog_v1) chi de hien thi, khong ghi gi. */
(function(){
'use strict';
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function prog(){try{return JSON.parse(localStorage.getItem('hn_prog_v1'))||{}}catch(e){return {}}}
function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function streak(p){var days=p.days||{},n=0,d=new Date();if(!days[ymd(d)])d.setDate(d.getDate()-1);while(days[ymd(d)]){n++;d.setDate(d.getDate()-1)}return n}
function logged(){try{return typeof AUTH!=='undefined'&&!!(AUTH.session()||AUTH.sessionAdmin())}catch(e){return false}}
var path=(location.pathname.split('/').pop()||'index.html');
var home=path==='index.html'||path==='';

/* ---- 1. Tabbar 5 o: Nha / Hoc / Choi / Ban / Toi ---- */
var TABS=[['家','Trang chủ','index.html',/^(index\.html)?$/],['学','Học','index.html#khoahoc',/^(lesson|hoc-thu|on-tap|thi-thu|luyen-nghe|kaiwa|thanh-ngu|kiem-tra-trinh-do)\.html$/],
 ['遊','Game','game/index.html',/^$/],['友','Cộng đồng','cong-dong.html',/^(cong-dong|ban-be|tin-nhan|xep-hang)\.html$/],['私','Tôi','#toi',/^(dang-nhap|ung-dung|cap-nhat)\.html$/]];
function tabbar(){
 var inGame=/\/game\//.test(location.pathname),pre=inGame?'../':'';
 var nav=document.querySelector('nav.tabbar');
 if(!nav){nav=document.createElement('nav');nav.className='tabbar';nav.setAttribute('aria-label','Điều hướng dưới');document.body.appendChild(nav)}
 nav.innerHTML='<div class="tabbar-in">'+TABS.map(function(t,i){
  var on=(i===2&&inGame)||(!inGame&&t[3].test(path));if(i===0&&home)on=true;if(i===1&&home)on=false;
  return '<a href="'+(t[2][0]==='#'?'#':pre+t[2])+'"'+(on?' class="on" aria-current="page"':'')+(i===4?' data-mg-toi="1"':'')+'><span class="mg-tk" aria-hidden="true">'+t[0]+'</span><span>'+t[1]+'</span></a>'}).join('')+'</div>';
 var toi=nav.querySelector('[data-mg-toi]');toi.addEventListener('click',function(e){e.preventDefault();sheet(pre)});
}
function sheet(pre){
 var s=document.getElementById('mgSheet');
 if(!s){s=document.createElement('div');s.id='mgSheet';s.className='mg-sheet';s.setAttribute('role','dialog');s.setAttribute('aria-label','Tài khoản');document.body.appendChild(s);
  s.addEventListener('click',function(e){if(e.target===s)s.hidden=true})}
 var L=logged(),items=L?[['🏆 Bảng xếp hạng','xep-hang.html'],['👥 Bạn bè','ban-be.html'],['💬 Tin nhắn','tin-nhan.html'],['🤖 Hỏi AI','hoi-ai.html'],['✨ Có gì mới','cap-nhat.html'],['📲 Cài ứng dụng','ung-dung.html']]
  :[['🔑 Đăng nhập / Đăng ký','dang-nhap.html'],['🎯 Kiểm tra trình độ','kiem-tra-trinh-do.html'],['📖 Học thử miễn phí','hoc-thu.html'],['✨ Có gì mới','cap-nhat.html'],['📲 Cài ứng dụng','ung-dung.html']];
 s.innerHTML='<div class="mg-sheet-in"><h3>私 · '+(L?'Tài khoản của bạn':'Chào bạn!')+'</h3>'+items.map(function(x){return '<a href="'+pre+x[1]+'">'+x[0]+'</a>'}).join('')+
  (L?'<button type="button" id="mgOut">🚪 Đăng xuất</button>':'')+'<button type="button" id="mgClose">✕ Đóng</button></div>';
 s.hidden=false;
 s.querySelector('#mgClose').onclick=function(){s.hidden=true};
 var o=s.querySelector('#mgOut');if(o)o.onclick=function(){try{AUTH.signOut(true)}catch(e){}};
}

/* ---- 2. Hero + lo trinh + 8 cong cu (chi trang chu) ---- */
var LV=[['N5','入門','Nền tảng từ số 0: chữ cái, chào hỏi'],['N4','初級','Câu thường ngày, đi làm cơ bản'],['N3','中級','Đọc hiểu, giao tiếp công việc'],['N2','中上級','Báo chí, hội thoại tự nhiên'],['N1','上級','Thành thạo như người bản xứ']];
var TOOLS=[['🎧','Luyện nghe','Nghe chậm, chép chính tả','luyen-nghe.html'],['🔁','Ôn tập','Thẻ nhớ lặp lại ngắt quãng','on-tap.html'],['📝','Thi thử JLPT','Đề mô phỏng, chấm điểm','thi-thu.html'],['💬','Kaiwa','Hội thoại có đọc mẫu','kaiwa.html'],
 ['🤖','Hỏi AI','Hỏi ngữ pháp, dịch câu','hoi-ai.html'],['🎴','Thành ngữ','Mỗi ngày một câu hay','thanh-ngu.html'],['🎯','Kiểm tra trình độ','Biết mình ở cấp nào','kiem-tra-trinh-do.html'],['📰','Tin tức','Tin Nhật & người Việt ở Nhật','tin-tuc.html']];
var CHEER=['Hôm nay chỉ cần 10 phút thôi — bắt đầu nào!','Mỗi ngày một chút, N-cấp nào cũng qua!','Giữ lửa chuỗi ngày học nhé, bạn đang làm rất tốt!','がんばって！Bài tiếp theo đang chờ bạn.'];
function pct(lv){try{if(typeof lvPct==='function'){var p=prog();return Math.max(0,Math.min(100,Math.round(lvPct(lv,p.seen||{}))))}}catch(e){}return null}
function heroHTML(name){
 var p=prog(),L=logged(),st=streak(p),seen=Object.keys(p.seen||{}).length,h=new Date().getHours(),buoi=h<11?'sáng':(h<18?'chiều':'tối');
 var nm=String(name||'').trim().slice(0,24),cheer=CHEER[new Date().getDate()%CHEER.length];
 var top=L?'<span class="mg-tag">CHƯƠNG HÔM NAY · 第'+(seen+1)+'話</span><h1 class="mg-shout">CHÀO '+(nm?'<em>'+esc(nm.toUpperCase())+'</em>':'BẠN')+'!</h1>'+
  '<div class="mg-balloon">Buổi '+buoi+' vui vẻ! '+esc(cheer)+'</div>'+
  '<div class="mg-stats"><span class="mg-stat"><b>🔥 '+st+'</b>ngày liên tục</span><span class="mg-stat"><b>'+seen+'</b>bài đã học</span></div>'+
  '<div class="mg-cta">'+(p.last&&p.last.id?'<a class="mg-btn" href="lesson.html?id='+encodeURIComponent(p.last.id)+'">▶ Học tiếp: '+esc(String(p.last.title||'').slice(0,40))+'</a>':'<a class="mg-btn" href="#khoahoc">▶ Bắt đầu bài đầu tiên</a>')+
  '<a class="mg-btn alt" href="on-tap.html">🔁 Ôn tập</a></div>'
 :'<span class="mg-tag">TẬP 1 · 第1話</span><h1 class="mg-shout">CHÀO <em>BẠN</em> MỚI!</h1>'+
  '<div class="mg-balloon">Học tiếng Nhật từ N5 đến N1 bằng tiếng Việt. Chọn cấp độ hoặc học thử ngay — miễn phí!</div>'+
  '<div class="mg-cta"><a class="mg-btn" href="hoc-thu.html">📖 Học thử ngay</a><a class="mg-btn alt" href="kiem-tra-trinh-do.html">🎯 Chọn cấp độ</a><a class="mg-btn alt" href="dang-nhap.html">🔑 Đăng nhập</a></div>';
 return '<div class="mg-panel"><span class="mg-sfx" aria-hidden="true">ドン!</span>'+top+'</div>';
}
function roadHTML(){
 return '<h2 class="mg-h">Lộ trình N5 → N1 <small>5 TẬP</small></h2><div class="mg-road">'+LV.map(function(l){var v=logged()?pct(l[0]):null;
  return '<a class="mg-ch" href="'+(logged()?'#khoahoc':'hoc-thu.html')+'" data-mg-lv="'+l[0]+'"><span class="lv">'+l[0]+'</span><span class="kj">'+l[1]+'</span><span class="ds">'+l[2]+'</span>'+(v!=null?'<span class="bar" title="'+v+'%"><i style="width:'+v+'%"></i></span>':'')+'</a>'}).join('')+'</div>';
}
function toolsHTML(){return '<h2 class="mg-h">8 công cụ luyện tập <small>道具</small></h2><div class="mg-tools">'+TOOLS.map(function(t){return '<a class="mg-tool" href="'+t[3]+'"><span class="ic" aria-hidden="true">'+t[0]+'</span><b>'+t[1]+'</b><span>'+t[2]+'</span></a>'}).join('')+'</div>'}
function homeMount(){
 document.body.classList.add('mg-home');
 var main=document.querySelector('main');if(!main||document.getElementById('mgHero'))return;
 var hero=document.createElement('section');hero.id='mgHero';hero.className='mg-hero';hero.setAttribute('aria-label','Lời chào');
 var road=document.createElement('section');road.id='mgRoad';road.className='mg-sec';
 var tools=document.createElement('section');tools.id='mgTools';tools.className='mg-sec';
 main.parentNode.insertBefore(hero,main);main.parentNode.insertBefore(road,main);main.parentNode.insertBefore(tools,main);
 function paint(n){hero.innerHTML=heroHTML(n);road.innerHTML=roadHTML();tools.innerHTML=toolsHTML()}
 paint('');
 road.addEventListener('click',function(e){var a=e.target.closest('[data-mg-lv]');if(!a||!logged())return;var b=document.querySelector('#levelGrid .level-card[data-level="'+a.getAttribute('data-mg-lv')+'"]');if(b){setTimeout(function(){b.click()},50)}});
 // Ten that tu /auth/me (giong cach trang chu cu dang lam)
 function who(){if(!logged())return paint('');try{AUTH.me().then(function(j){paint((j&&j.user&&j.user.name)||'')}).catch(function(){paint('')})}catch(e){paint('')}}
 who();addEventListener('unlocked',function(){setTimeout(who,0)});addEventListener('hn-synced',who);
}
function boot(){try{tabbar()}catch(e){}try{if(home)homeMount()}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
