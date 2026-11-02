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
