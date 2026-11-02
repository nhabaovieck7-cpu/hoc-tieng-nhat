// level.js — CHỌN TRÌNH ĐỘ CÂU HỎI N5–N1 (Lane Z, lệnh chủ trang 09:16 JST 01/11/2026).
// Nguyên tắc: MẠCH TRUYỆN VÀ CÁC BƯỚC GIỮ NGUYÊN Y HỆT cho mọi người — trình độ đã chọn
// CHỈ quyết định CÂU HỎI của các bài thi mốc/kiểm tra được rút từ ngân hàng nào
// (EXAM_N5..N1 ở exam-n5.js / exam-n4.js / exam-levels.js; LISTEN_N5..N1 ở listen.js /
// listen-levels.js). Mặc định N5 = trải nghiệm hiện tại. Đổi lúc nào cũng được (màn tạo
// nhân vật + Cài đặt), áp dụng từ BÀI THI KẾ TIẾP — bài đang làm dở không đổi cấp vì
// openExam chốt cấp vào examRun ngay khi mở bài. Lưu bền: localStorage 'b2d_level'
// (cùng nhóm b2d_* với nhạc/giọng) + trạng thái runtime window.PLAYER_LEVEL.
(function () {
  'use strict';
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var KEY = 'b2d_level';
  var $ = function (id) { return document.getElementById(id); };

  function stored() {
    try { var v = localStorage.getItem(KEY); return LEVELS.indexOf(v) >= 0 ? v : 'N5'; }
    catch (e) { return 'N5'; }
  }
  var cur = stored();

  // Đóng dấu trường "level" cho ngân hàng N5/N4 (file có trước trường này) để MỌI câu
  // trong mọi ngân hàng đều mang nhãn cấp kiểm chứng được, như N3/N2/N1 đã có sẵn.
  function stamp() {
    ['N5', 'N4'].forEach(function (lv) {
      var b = window['EXAM_' + lv];
      if (b && b.questions) b.questions.forEach(function (q) { if (!q.level) q.level = lv; });
      var l = window['LISTEN_' + lv];
      if (l) l.forEach(function (q) { if (!q.level) q.level = lv; });
    });
  }
  stamp();

  /* ---------- Giao diện: CSS riêng của lane, không đụng ui.css ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.lvl-chips{display:flex;flex-wrap:wrap;gap:8px}' +
    '.lvl-chip{min-width:52px;min-height:44px;padding:8px 12px;border-radius:12px;border:2px solid #cfc7ae;' +
    'background:#fffdf6;font-size:15px;font-weight:800;color:#5a5342;cursor:pointer}' +
    '.lvl-chip.on{border-color:#2b3a67;background:#2b3a67;color:#ffe9a8}' +
    '.lvl-block{margin:10px 0 2px;text-align:left}' +
    '.lvl-note{font-size:12px;color:#8a8574;margin-top:6px;line-height:1.45}' +
    '.mrow.lvl-mrow{flex-direction:column;align-items:stretch;gap:8px}' +
    '#pc-qlevel{color:#8a8574;font-weight:700;white-space:nowrap}';
  document.head.appendChild(css);

  function chipRow(id) {
    var box = document.createElement('div');
    box.className = 'lvl-chips'; box.id = id;
    LEVELS.forEach(function (lv) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'lvl-chip' + (lv === cur ? ' on' : '');
      b.dataset.lv = lv; b.textContent = lv;
      b.setAttribute('aria-label', 'Chọn trình độ câu hỏi ' + lv);
      b.addEventListener('click', function () { set(lv); });
      box.appendChild(b);
    });
    return box;
  }
  function syncUI() {
    document.querySelectorAll('.lvl-chip').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lv === cur);
    });
    // huy hiệu HUD do ensureBadge() lo (gắn vào cuối file) — syncUI được bọc lại ở dưới
  }
  function set(lv) {
    if (LEVELS.indexOf(lv) < 0) return;
    if (lv === cur) { syncUI(); return; }   // bấm lại cấp đang chọn: chỉ đồng bộ giao diện, không báo lại
    cur = lv;
    try { localStorage.setItem(KEY, lv); } catch (e) {}
    syncUI();
    if (window.GAMEUI && window.GAMEUI.toast) {
      window.GAMEUI.toast('🎓 Trình độ câu hỏi: ' + lv + ' — áp dụng từ bài thi kế tiếp (bài đang làm không đổi).');
    }
  }

  // Màn tạo nhân vật: thêm khối chọn trình độ ngay dưới hàng chọn tuyến nam/nữ
  var genderRow = document.querySelector('#start-overlay .gender-row');
  if (genderRow && genderRow.parentNode) {
    var block = document.createElement('div');
    block.className = 'lvl-block';
    var lab = document.createElement('div');
    lab.className = 'start-label';
    lab.textContent = '🎓 Trình độ tiếng Nhật của anh/chị?';
    var note = document.createElement('div');
    note.className = 'lvl-note';
    note.textContent = 'Chỉ đổi độ khó CÂU HỎI trong các bài thi — câu chuyện và các bước chơi giữ nguyên. Đổi lại lúc nào cũng được trong ⚙️ Cài đặt.';
    block.appendChild(lab);
    block.appendChild(chipRow('lvl-chips-start'));
    block.appendChild(note);
    genderRow.parentNode.insertBefore(block, genderRow.nextSibling);
  }
  // Cài đặt: thêm hàng chọn trình độ ngay dưới hàng tự giảm nhạc (Lane W)
  var duck = $('set-bgm-duck');
  var duckRow = duck ? duck.closest('.mrow') : null;
  if (duckRow && duckRow.parentNode) {
    var row = document.createElement('div');
    row.className = 'mrow lvl-mrow';
    var sp = document.createElement('span');
    sp.textContent = '🎓 Trình độ câu hỏi (thi mốc)';
    row.appendChild(sp);
    row.appendChild(chipRow('lvl-chips-set'));
    duckRow.parentNode.insertBefore(row, duckRow.nextSibling);
  }
  // Huy hiệu nhỏ ở thẻ người chơi trên HUD: span INLINE ngay trong dòng #pc-level sẵn
  // có — tuyệt đối không thêm chiều cao cho HUD (ngưỡng HUD desktop ≤46px của Lane Q/X).
  // game-ui ghi lại textContent của #pc-level mỗi lần vào game nên cần MutationObserver
  // tự gắn lại span khi nó bị ghi đè.
  function ensureBadge() {
    var host = $('pc-level');
    if (!host) return null;
    var badge = $('pc-qlevel');
    if (!badge || badge.parentNode !== host) {
      badge = document.createElement('span');
      badge.id = 'pc-qlevel';
      host.appendChild(badge);
    }
    var txt = ' · ❓ Câu hỏi ' + cur;
    if (badge.textContent !== txt) badge.textContent = txt;
    return badge;
  }
  var pcLevelEl = $('pc-level');
  if (pcLevelEl && window.MutationObserver) {
    new MutationObserver(function () { ensureBadge(); }).observe(pcLevelEl, { childList: true, characterData: true, subtree: true });
  }
  var _syncUI = syncUI;
  syncUI = function () { _syncUI(); ensureBadge(); };
  syncUI();

  window.PLAYER_LEVEL = {
    LEVELS: LEVELS.slice(),
    get: function () { return cur; },
    set: set,
    // Ngân hàng câu viết/nghe ĐÚNG cấp đã chọn (thiếu file thì lùi về N5 để không kẹt người chơi)
    bank: function () { return window['EXAM_' + cur] || window.EXAM_N5 || null; },
    listenBank: function () { return window['LISTEN_' + cur] || window.LISTEN_N5 || null; },
    stamp: stamp
  };
})();
