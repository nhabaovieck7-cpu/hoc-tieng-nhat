// Học thử (29/10): tiện ích giao diện cho khách chưa đăng nhập — thanh đăng ký dưới đáy, tab + mục lục.
const HT=(()=>{
const LV=['n5','n4','n3','n2','n1'];
const SEC=[['np','Ngữ pháp'],['tv','Từ vựng'],['kj','Kanji'],['kaiwa','Kaiwa'],['dokkai','Đọc hiểu'],['tonghop','Tổng hợp']];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function bar(txt){if(!window.HN_GUEST||document.querySelector('.ht-reg'))return;const d=document.createElement('div');d.className='ht-reg';
 d.innerHTML='<p>'+esc(txt||'Mở toàn bộ bài học')+'</p><a class="ht-big" href="dang-nhap.html">Đăng ký miễn phí</a>';document.body.appendChild(d);document.documentElement.classList.add('has-reg')}
// tabs: root chứa .ht-tabs button[data-t] và .ht-panel#id
function tabs(root,onShow){const bs=[...root.querySelectorAll('.ht-tabs button')],ps=[...root.querySelectorAll('.ht-panel')];
 function show(id,push){bs.forEach(b=>b.setAttribute('aria-selected',b.dataset.t===id));ps.forEach(p=>p.hidden=p.id!==id);if(push)history.replaceState(null,'','#'+id);onShow&&onShow(id)}
 bs.forEach(b=>b.onclick=()=>show(b.dataset.t,true));const h=location.hash.slice(1);if(bs.length)show(ps.some(p=>p.id===h)?h:bs[0].dataset.t,false);return show}
const half=n=>Math.ceil(n/2);
return {LV,SEC,esc,bar,tabs,half}})();
