/* backbtn.js — nút Quay lại cố định cho trang không nạp common.js (vd 404.html).
   Nội dung injector giống hệt phần cuối common.js; sửa thì sửa cả hai nơi. */
/* ===== Nút "Quay lại" cố định cho mọi trang (lệnh chủ trang 31/10/2026) =====
   Nút tròn 48px góc dưới trái, position:fixed nên luôn hiện khi cuộn;
   trên điện thoại (<=860px) nằm trên thanh tab cố định ở đáy; ẩn khi in. */
(function(){
 if(document.getElementById('backBtnFixed'))return;
 var CSS='#backBtnFixed{position:fixed;left:16px;bottom:16px;z-index:900;width:48px;height:48px;padding:0;border:0;border-radius:50%;background:#233d63;color:#fff;font-size:22px;line-height:48px;text-align:center;box-shadow:0 4px 14px rgba(35,61,99,.35);cursor:pointer;-webkit-tap-highlight-color:transparent}'
  +'#backBtnFixed:active{transform:scale(.94)}'
  +'@media (max-width:860px){#backBtnFixed{bottom:calc(78px + env(safe-area-inset-bottom))}}'
  +'@media print{#backBtnFixed{display:none}}';
 function add(){
  if(document.getElementById('backBtnFixed'))return;
  if(!document.getElementById('backBtnFixedCss')){
   var st=document.createElement('style');st.id='backBtnFixedCss';st.textContent=CSS;
   (document.head||document.documentElement).appendChild(st)}
  var b=document.createElement('button');
  b.id='backBtnFixed';b.type='button';b.textContent='←';
  b.setAttribute('aria-label','Quay lại');b.title='Quay lại';
  b.addEventListener('click',function(){
   if(history.length>1)history.back();else location.href='index.html'});
  document.body.appendChild(b)}
 if(document.body)add();
 else document.addEventListener('DOMContentLoaded',add);
})();
