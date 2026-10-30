/* nameplate.js — ĐỢT GAME 5 · Nhánh C: BIỂN TÊN NGƯỜI CHƠI (window.GNAME).
   Hợp đồng (CONTRACT-B5, phần "BIỂN TÊN + TÍCH HỢP CẢNH"):
     GNAME.plate(name, opts{own}) -> '<span class="gnp[ gnp-own]">Tên</span>'
       (đã escape HTML). Tên rỗng/khách -> '' (không vẽ biển).
     GNAME.ownName() -> tên hiển thị MỚI NHẤT của chính mình:
       GAME_USER_DATA.name khi đã loaded (game.js resolveGameUser luôn lấy
       /hoso mới nhất, KHÔNG đọc cache tên cũ); khách/chưa có tên -> ''.
     GNAME.refresh() -> cập nhật textContent MỌI .gnp-own đang có trong trang
       theo ownName() hiện tại; tên trống -> ẩn biển.
   GNAME tự lắng nghe sự kiện 'hn-game-user' (game.js phát mỗi khi
   resolve/refresh xong) -> mọi biển .gnp-own tự đổi theo tên mới nhất.
   Chỉ DOM hiển thị: không đổi luật chơi/payload/luồng ở bất kỳ cảnh nào. */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function ownName() {
    var d = window.GAME_USER_DATA;
    if (!d || !d.loaded || !d.loggedIn) return ''; // khách / chưa resolve xong
    return String(d.name || '').trim();
  }

  function plate(name, opts) {
    opts = opts || {};
    var n = String(name == null ? '' : name).trim();
    if (opts.own && !n) n = ownName();
    if (!n) return ''; // khách / không tên -> ẩn biển
    return '<span class="gnp' + (opts.own ? ' gnp-own' : '') + '">' + esc(n) + '</span>';
  }

  function refresh() {
    var n = ownName();
    var els;
    try { els = document.querySelectorAll('.gnp-own'); } catch (e) { return; }
    Array.prototype.forEach.call(els, function (el) {
      if (n) {
        if (el.textContent !== n) el.textContent = n;
        el.classList.remove('gnp-hide');
      } else {
        el.classList.add('gnp-hide');
      }
    });
  }

  window.GNAME = { plate: plate, ownName: ownName, refresh: refresh, version: 1 };

  window.addEventListener('hn-game-user', refresh);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();
