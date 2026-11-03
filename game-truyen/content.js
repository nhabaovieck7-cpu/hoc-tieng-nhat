
// ===== GUESTOPEN (03/11/2026): khách KHÔNG lưu tiến độ (bản gắn cho realm game) =====
// Khi trình duyệt KHÔNG có phiên đăng nhập, đọc/ghi các khoá TIẾN ĐỘ + HỒ SƠ
// được chuyển sang sessionStorage (chỉ sống trong phiên mở trang). Có phiên
// -> localStorage như cũ. Xem bản gốc của cơ chế này ở auth.js của trang chính.
(function(){
  try{
    if(Storage.prototype.__hnGuestGuard)return;
    Storage.prototype.__hnGuestGuard=1;
    var EXACT={hn_prog_v1:1,hn_srs_v1:1,hn_game_v1:1,hn_game_progress:1,hn_game_scores_local:1,hn_game_campaign:1,hn_practice_v1:1,hn_dk_done:1,hn_dk_streak:1,hn_dk_lastlesson:1,hn_dk_level:1,hn_dk_goal:1,hn_dk_ho_so:1,hn_dk_avatar:1,hn_game_user:1,b2d_level:1};
    var isProg=function(k){return typeof k==='string'&&(!!EXACT[k]||k.indexOf('hn_choukai_')===0||k.indexOf('tuoitre2d_')===0)};
    var _get=Storage.prototype.getItem,_set=Storage.prototype.setItem,_rem=Storage.prototype.removeItem;
    var guestNow=function(){try{return !_get.call(localStorage,'hn_sess_v1')&&!_get.call(localStorage,'hn_admin_sess_v1')}catch(e){return false}};
    Storage.prototype.getItem=function(k){if(this===localStorage&&isProg(k)&&guestNow()){try{return _get.call(sessionStorage,k)}catch(e){}}return _get.call(this,k)};
    Storage.prototype.setItem=function(k,v){if(this===localStorage&&isProg(k)&&guestNow()){try{_set.call(sessionStorage,k,v);return}catch(e){}}return _set.call(this,k,v)};
    Storage.prototype.removeItem=function(k){if(this===localStorage&&isProg(k)&&guestNow()){try{_rem.call(sessionStorage,k);return}catch(e){}}return _rem.call(this,k)};
  }catch(e){}
})();

// ===== Thống kê truy cập (03/11/2026): beacon lượt xem nhẹ cho trang admin =====
// Bất đồng bộ, fire-and-forget: đường dẫn trang + định danh phiên khách ẩn
// danh (sessionStorage). Có phiên thì đính token để Worker ghi nhận thành
// viên. Mọi lỗi đều bỏ qua êm — không bao giờ ảnh hưởng trang.
(function(){
  try{
    var PAGE=(location.pathname||'').split('/').pop()||'index.html';
    if(PAGE==='admin.html')return;
    var EP=((typeof SITE!=='undefined'&&SITE&&SITE.aiEndpoint)||'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev').replace(/\/$/,'');
    var sid='';try{sid=sessionStorage.getItem('hn_guest_sid')||'';if(!sid){sid='g'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);sessionStorage.setItem('hn_guest_sid',sid)}}catch(e){}
    var p=location.pathname.replace(/^\/hoc-tieng-nhat\//,'').replace(/^\//,'');
    var id=new URLSearchParams(location.search).get('id');if(id)p+='?id='+String(id).slice(0,60);
    var h={'Content-Type':'application/json'};
    var tok='';try{tok=localStorage.getItem('hn_sess_v1')||localStorage.getItem('hn_admin_sess_v1')||''}catch(e){}
    if(tok)h.Authorization='Bearer '+tok;
    fetch(EP+'/track/view',{method:'POST',headers:h,body:JSON.stringify({p:p,s:sid}),keepalive:true}).catch(function(){});
  }catch(e){}
})();
// content.js — LỚP NẠP NỘI DUNG DUY NHẤT của game «TUỔI TRẺ Ở NHẬT» (kiến trúc gói, lệnh 08:28 JST 31/10/2026).
// NGUYÊN TẮC: engine CHỈ đọc nội dung qua hai sổ đăng ký do lớp này sở hữu — window.MAPDEF (bản đồ)
// và window.DEMO_DATA (cảnh) — cùng bản kê gói trong window.CONTENT. Mọi file nội dung (maps-*.js,
// data*.js, scenes-*.js) chỉ ĐĂNG KÝ vào hai sổ đó; bản kê gói (content-manifest.js) khai báo gói nào
// chứa ID nào, kèm số PHIÊN BẢN và ngày. Thêm nội dung mới = thêm file nội dung + khai thêm vào bản kê
// + tăng phiên bản gói — KHÔNG sửa engine.
// LUẬT TƯƠNG THÍCH (bất biến): ID bản đồ/cảnh ổn định VĨNH VIỄN — chỉ thêm mới, hoặc vá lỗi không đổi
// nghĩa; không bao giờ xóa/đổi tên/tái dùng ID. Nhờ đó tiến độ đã lưu của người chơi không bao giờ vỡ
// vì cập nhật nội dung (kiểm chứng tự động: CONTENT.checkSave + work/validate-content.js).
// File này phải nạp ĐẦU TIÊN, trước mọi file nội dung.
(function () {
  'use strict';

  // Hai sổ đăng ký nội dung — lớp nạp tạo sẵn; các file nội dung giữ nguyên đối tượng này khi đăng ký.
  window.MAPDEF = window.MAPDEF || {};
  window.DEMO_DATA = window.DEMO_DATA || {};

  var packages = [];          // các gói đã khai trong bản kê
  var errors = [];            // lỗi kiểm chứng bản kê (rỗng = bản kê khớp tuyệt đối với nội dung đã nạp)
  var owner = { maps: {}, scenes: {} };  // ID → gói sở hữu
  var finalized = false;

  function cmpVer(a, b) {
    var pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
    for (var i = 0; i < 3; i++) { if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0); }
    return 0;
  }

  var CONTENT = {
    version: null,            // phiên bản nội dung hiện tại = phiên bản cao nhất trong các gói
    errors: errors,
    packages: packages,

    // Bản kê gọi hàm này cho từng gói: {id, version, date, title, notes[], maps[], scenes[]}
    declare: function (pkg) { packages.push(pkg); },

    // Chạy SAU khi mọi file nội dung đã nạp (content-manifest.js gọi): đối chiếu bản kê với thực tế.
    finalize: function () {
      if (finalized) return CONTENT;
      finalized = true;
      var seen = { maps: {}, scenes: {} };
      packages.forEach(function (pkg) {
        (pkg.maps || []).forEach(function (id) {
          if (seen.maps[id]) errors.push('Bản đồ "' + id + '" bị khai ở 2 gói: ' + seen.maps[id] + ' và ' + pkg.id);
          seen.maps[id] = pkg.id; owner.maps[id] = pkg.id;
          if (!window.MAPDEF[id]) errors.push('Gói ' + pkg.id + ' khai bản đồ "' + id + '" nhưng không có file nội dung nào đăng ký nó');
        });
        (pkg.scenes || []).forEach(function (id) {
          if (seen.scenes[id]) errors.push('Cảnh "' + id + '" bị khai ở 2 gói: ' + seen.scenes[id] + ' và ' + pkg.id);
          seen.scenes[id] = pkg.id; owner.scenes[id] = pkg.id;
          if (!window.DEMO_DATA[id]) errors.push('Gói ' + pkg.id + ' khai cảnh "' + id + '" nhưng không có file nội dung nào đăng ký nó');
        });
      });
      Object.keys(window.MAPDEF).forEach(function (id) {
        if (!seen.maps[id]) errors.push('Bản đồ "' + id + '" đã nạp nhưng CHƯA được khai vào gói nào trong bản kê');
      });
      Object.keys(window.DEMO_DATA).forEach(function (id) {
        if (!seen.scenes[id]) errors.push('Cảnh "' + id + '" đã nạp nhưng CHƯA được khai vào gói nào trong bản kê');
      });
      var top = null;
      packages.forEach(function (pkg) { if (!top || cmpVer(pkg.version, top) > 0) top = pkg.version; });
      CONTENT.version = top;
      if (errors.length && window.console) console.warn('[CONTENT] Bản kê gói có ' + errors.length + ' lỗi:', errors);
      return CONTENT;
    },

    // Danh sách đợt cập nhật cho mục "🆕 Có gì mới" (mới nhất trước).
    changelog: function () {
      return packages.slice().sort(function (a, b) { return cmpVer(b.version, a.version); });
    },

    info: function () {
      return {
        version: CONTENT.version,
        packages: packages.length,
        maps: Object.keys(window.MAPDEF).length,
        scenes: Object.keys(window.DEMO_DATA).length,
        errors: errors.length
      };
    },

    // Ảnh chụp toàn bộ ID hiện có — dùng cho kiểm thử ổn định ID giữa các đợt phát hành.
    snapshotIds: function () {
      return {
        maps: Object.keys(window.MAPDEF).sort(),
        scenes: Object.keys(window.DEMO_DATA).sort()
      };
    },

    // KIỂM TRA TƯƠNG THÍCH BẢN LƯU: một đối tượng tiến độ (đã lưu từ BẤT KỲ phiên bản cũ nào)
    // có chạy được với bộ gói hiện tại không. Chỉ đọc — không sửa bản lưu, không ném lỗi:
    // ID lạ/bị thiếu được BÁO thành danh sách vấn đề để tầng trên xử lý êm (bỏ qua phần đã mất,
    // giữ nguyên phần còn lại). Trường lạ trong bản lưu được BỎ QUA (tương thích xuôi).
    checkSave: function (save) {
      var problems = [];
      if (!save || typeof save !== 'object') return { ok: false, problems: ['Bản lưu trống hoặc không phải đối tượng'] };
      if (save.map != null && !window.MAPDEF[save.map]) problems.push('Bản đồ trong bản lưu không còn tồn tại: "' + save.map + '"');
      ['visitedMaps', 'doneScenes'].forEach(function (field) {
        var arr = save[field];
        if (!Array.isArray(arr)) return;
        var reg = field === 'visitedMaps' ? window.MAPDEF : window.DEMO_DATA;
        arr.forEach(function (id) { if (!reg[id]) problems.push(field + ' chứa ID không còn tồn tại: "' + id + '"'); });
      });
      if (save.scene != null && !window.DEMO_DATA[save.scene]) problems.push('Cảnh đang dở trong bản lưu không còn tồn tại: "' + save.scene + '"');
      return { ok: problems.length === 0, problems: problems };
    }
  };

  window.CONTENT = CONTENT;
})();
