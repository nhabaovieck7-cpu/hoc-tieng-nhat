/* cap-nhat.js — đọc SỔ CẬP NHẬT CHUNG của trang (data/updates.json) và vẽ:
   - renderHome(el): khối "🆕 Mới cập nhật" ở trang chủ (vài mục mới nhất).
   - renderPage(chipsEl, listEl): trang cap-nhat.html — nhóm theo ngày, lọc theo loại.
   Game truyện đọc CÙNG file này và chỉ lấy các mục type="game".
   Định dạng mỗi mục: {id, date:"YYYY-MM-DD" (JST), type, title, desc, link|null}
   type ∈ bai-hoc | de-thi | tin-tuc | game | tinh-nang | he-thong */
(function(){
'use strict';
var TYPES={
 'bai-hoc':{t:'Bài học'},
 'de-thi':{t:'Đề thi'},
 'tin-tuc':{t:'Tin tức'},
 'game':{t:'Trò chơi'},
 'tinh-nang':{t:'Tính năng'},
 'he-thong':{t:'Hệ thống'}
};
var SRC='data/updates.json';
var cache=null;
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function load(){
 if(cache)return cache;
 cache=fetch(SRC,{credentials:'same-origin'}).then(function(r){if(!r.ok)throw new Error('http '+r.status);return r.json()})
  .then(function(j){var items=(j&&j.items)||[];return items.slice().sort(function(a,b){return a.date<b.date?1:(a.date>b.date?-1:0)})});
 return cache;
}
function maxDate(items){return items.reduce(function(m,x){return x.date>m?x.date:m},'')}
function tag(x,isNew){
 var ty=TYPES[x.type]||{t:x.type};
 return '<span class="upd-tag upd-t-'+esc(x.type)+'">'+esc(ty.t)+'</span>'+(isNew?'<span class="upd-new">Mới</span>':'');
}
var WD=['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
function dayLabel(dstr){
 var p=dstr.split('-'),y=+p[0],m=+p[1],d=+p[2];
 var wd=WD[new Date(y,m-1,d).getDay()];
 return wd+', ngày '+d+'/'+m+'/'+y;
}
function dmLabel(dstr){var p=dstr.split('-');return (+p[2])+'/'+(+p[1])}

/* ---- Khối trang chủ: n mục mới nhất ---- */
function renderHome(el,n){
 n=n||4;
 load().then(function(items){
  var mx=maxDate(items);
  if(!items.length){el.innerHTML='<p class="empty">Chưa có cập nhật nào.</p>';return}
  el.innerHTML=items.slice(0,n).map(function(x){
   var inner='<b>'+esc(x.title)+'</b><p>'+esc(x.desc)+'</p>';
   if(x.link)inner='<a href="'+esc(x.link)+'">'+inner+'</a>';
   return '<div class="upd-hrow"><div class="upd-hmeta"><span class="upd-hdate">'+dmLabel(x.date)+'</span>'+tag(x,x.date===mx)+'</div><div class="upd-hmain">'+inner+'</div></div>';
  }).join('');
 }).catch(function(){el.innerHTML='<p class="empty">Chưa tải được danh sách cập nhật — <a href="cap-nhat.html">mở trang Có gì mới</a>.</p>'});
}

/* ---- Trang cap-nhat.html: lọc theo loại + nhóm theo ngày ---- */
function renderPage(chipsEl,listEl){
 var state={type:'tat-ca',items:null};
 function chips(){
  var counts={};(state.items||[]).forEach(function(x){counts[x.type]=(counts[x.type]||0)+1});
  var defs=[['tat-ca','Tất cả']].concat(Object.keys(TYPES).map(function(k){return [k,TYPES[k].t]}));
  chipsEl.innerHTML=defs.filter(function(d){return d[0]==='tat-ca'||counts[d[0]]}).map(function(d){
   return '<button type="button" data-t="'+d[0]+'"'+(state.type===d[0]?' class="on"':'')+' aria-pressed="'+(state.type===d[0])+'">'+d[1]+'</button>';
  }).join('');
  chipsEl.querySelectorAll('button').forEach(function(b){b.onclick=function(){state.type=b.getAttribute('data-t');chips();draw()}});
 }
 function draw(){
  var items=state.items||[],mx=maxDate(items);
  var sel=items.filter(function(x){return state.type==='tat-ca'||x.type===state.type});
  if(!sel.length){listEl.innerHTML='<p class="empty">Chưa có cập nhật nào thuộc mục này.</p>';return}
  var html='',cur='';
  sel.forEach(function(x,i){
   if(x.date!==cur){cur=x.date;html+='<h2 class="upd-day">'+dayLabel(cur)+'</h2><div class="upd-list">'}
   html+='<article class="upd-item"><div class="upd-meta">'+tag(x,x.date===mx)+'</div><h3>'+esc(x.title)+'</h3><p>'+esc(x.desc)+'</p>'
    +(x.link?'<a class="upd-go" href="'+esc(x.link)+'">Mở xem →</a>':'')+'</article>';
   var nx=sel[i+1];
   if(!nx||nx.date!==cur)html+='</div>';
  });
  listEl.innerHTML=html;
 }
 load().then(function(items){state.items=items;chips();draw()})
 .catch(function(){listEl.innerHTML='<p class="empty">Chưa tải được sổ cập nhật. Kiểm tra mạng rồi tải lại trang nhé.</p>'});
}
window.UPD={TYPES:TYPES,load:load,renderHome:renderHome,renderPage:renderPage};
})();
