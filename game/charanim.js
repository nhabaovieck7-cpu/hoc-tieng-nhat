/* =====================================================================
   charanim.js — Điều khiển HOẠT HỌA NHÂN VẬT dùng chung (Nhánh A,
   đợt game 4). Đi cùng charanim.css. window.GCANIM:

     GCANIM.apply(el, state)  state ∈ {idle, run, attack, hit, win, none}
       - idle/run/win/none: trạng thái GIỮ (gán đúng 1 class ca-<state>
         lên el, gỡ các class trạng thái giữ khác; gọi lặp cùng state
         là no-op — không khởi động lại hoạt họa).
       - attack/hit: trạng thái ĐÁNH 1 LẦN (.ca-attack 550ms /
         .ca-hit 450ms) — tự gỡ class khi hết nhịp, trạng thái giữ
         trước đó (idle/run/win) vẫn nguyên bên dưới.
       - An toàn với el null/không hợp lệ: bỏ qua êm, trả lại el.
     GCANIM.quality() -> 'full' | 'low' | 'off'
       - 'off'  : prefers-reduced-motion đang bật (tắt toàn bộ, CSS
         cũng tự khoá qua media query — JS chỉ phản ánh + gắn class).
       - 'low'  : fps đo bằng rAF < 30 trong 2 cửa sổ 500ms liên tiếp
         -> gắn html.ca-q-low (CSS tắt hiệu ứng phụ: tóc, phụ kiện,
         bóng, gật đầu; giữ bob/chạy, nhún thở, chớp mắt). fps ≥ 55
         trong 3 cửa sổ liên tiếp -> tự trở lại 'full'.
     GCANIM._fpsSample(fps)  móc NỘI BỘ cho harness kiểm thử: đưa 1 mẫu
       fps giả vào đúng đường đánh giá chất lượng ở trên.

   Trang ẩn (visibilitychange / document.hidden): gắn html.ca-paused
   (CSS đặt animation-play-state: paused cho mọi hoạt họa ca-*) và
   dừng vòng rAF đo fps; hiện lại thì tiếp tục. Mọi lỗi đều nuốt êm —
   hoạt họa là lớp trang trí, không bao giờ được làm hỏng game.
   ===================================================================== */
(function () {
  'use strict';

  var PERSIST = ['idle', 'run', 'win'];
  var ONESHOT_MS = { attack: 600, hit: 500 };
  var shotTimers = (typeof WeakMap === 'function') ? new WeakMap() : null;
  var shotFallback = [];

  /* ------------------------- apply ------------------------- */
  function apply(el, state) {
    try {
      if (!el || !el.classList) return el;
      state = String(state == null ? 'none' : state).toLowerCase();
      if (ONESHOT_MS[state]) {
        el.classList.add('ca-' + state);
        var old = null;
        if (shotTimers) { old = shotTimers.get(el); }
        else {
          for (var i = 0; i < shotFallback.length; i++) {
            if (shotFallback[i].el === el) { old = shotFallback[i].t; shotFallback.splice(i, 1); break; }
          }
        }
        if (old) clearTimeout(old);
        var t = setTimeout(function () {
          try { el.classList.remove('ca-' + state); } catch (e) { /* phần tử đã bị gỡ */ }
        }, ONESHOT_MS[state]);
        if (shotTimers) shotTimers.set(el, t);
        else shotFallback.push({ el: el, t: t });
        return el;
      }
      if (state !== 'none' && PERSIST.indexOf(state) === -1) state = 'none';
      // Gọi lặp cùng trạng thái giữ: không làm gì (tránh restart CSS).
      if (el.dataset && el.dataset.caState === state &&
          (state === 'none' || el.classList.contains('ca-' + state))) return el;
      for (var j = 0; j < PERSIST.length; j++) el.classList.remove('ca-' + PERSIST[j]);
      if (state !== 'none') el.classList.add('ca-' + state);
      if (el.dataset) el.dataset.caState = state;
      return el;
    } catch (e) { return el; }
  }

  /* ------------------------- Chất lượng / fps ------------------------- */
  var level = 'full';        // 'full' | 'low' (chưa kể reduced-motion)
  var reduced = false;
  var mq = null;
  try { mq = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { mq = null; }

  function renderQuality() {
    try {
      var h = document.documentElement;
      if (!h) return;
      h.classList.toggle('ca-q-off', !!reduced);
      h.classList.toggle('ca-q-low', !reduced && level === 'low');
    } catch (e) { /* bỏ qua */ }
  }
  function quality() { return reduced ? 'off' : level; }

  var lowStreak = 0, highStreak = 0;
  function evaluate(fps) {
    try {
      if (reduced || typeof fps !== 'number' || !(fps > 0)) return;
      if (fps < 30) {
        lowStreak++; highStreak = 0;
        if (lowStreak >= 2 && level !== 'low') { level = 'low'; renderQuality(); }
      } else if (fps >= 55) {
        highStreak++; lowStreak = 0;
        if (highStreak >= 3 && level !== 'full') { level = 'full'; renderQuality(); }
      } else { lowStreak = 0; highStreak = 0; }
    } catch (e) { /* bỏ qua */ }
  }

  /* Vòng đo fps bằng rAF: đếm khung trong cửa sổ 500ms. */
  var rafId = 0, frames = 0, winStart = 0, measuring = false;
  function loop(ts) {
    if (!measuring) return;
    rafId = requestAnimationFrame(loop);
    if (!winStart) { winStart = ts; frames = 0; return; }
    frames++;
    var elapsed = ts - winStart;
    if (elapsed >= 500) {
      evaluate(Math.round(frames * 1000 / elapsed));
      frames = 0; winStart = ts;
    }
  }
  function startMeasure() {
    if (measuring) return;
    measuring = true; frames = 0; winStart = 0;
    try { rafId = requestAnimationFrame(loop); } catch (e) { measuring = false; }
  }
  function stopMeasure() {
    measuring = false;
    try { cancelAnimationFrame(rafId); } catch (e) { /* bỏ qua */ }
  }

  function onVisibility() {
    try {
      var hidden = !!document.hidden || document.visibilityState === 'hidden';
      var h = document.documentElement;
      if (h) h.classList.toggle('ca-paused', hidden);
      if (hidden) stopMeasure(); else startMeasure();
    } catch (e) { /* bỏ qua */ }
  }
  function onReducedChange() {
    reduced = !!(mq && mq.matches);
    lowStreak = 0; highStreak = 0;
    renderQuality();
  }

  /* ------------- Tự gắn idle dùng chung (ghép tích hợp đợt 4) -------------
     Mọi nhân vật do GAME_AVATAR vẽ (.ca-wrap / .gface) mà chưa mang lớp
     trạng thái nào thì tự nhận ca-idle (nhún thở + chớp mắt theo CSS), để
     hub và các trang đấu sống động ngay cả khi mã chế độ không gọi
     GCANIM.apply. Bỏ qua phần tử nằm trong vùng .ca-run (vd runner của
     Chạy vô tận - đã có hoạt họa chạy riêng) hoặc đã có ca-idle/ca-win.
     MutationObserver bắt các nhân vật được vẽ lại sau này. */
  function autoIdle(root) {
    try {
      var scope = (root && root.querySelectorAll) ? root : document;
      var nodes = scope.querySelectorAll('.ca-wrap:not(.ca-idle):not(.ca-win), .gface:not(.ca-idle):not(.ca-win)');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (el.closest && el.closest('.ca-run')) continue;
        el.classList.add('ca-idle');
      }
    } catch (e) { /* bỏ qua */ }
  }

  /* ------------------------- Khởi động ------------------------- */
  window.GCANIM = {
    apply: apply,
    quality: quality,
    _fpsSample: evaluate,
    version: '1.0'
  };

  try {
    reduced = !!(mq && mq.matches);
    if (mq) {
      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onReducedChange);
      else if (typeof mq.addListener === 'function') mq.addListener(onReducedChange);
    }
    renderQuality();
    document.addEventListener('visibilitychange', onVisibility);
    /* Tự gắn idle dùng chung (ghép tích hợp đợt 4 của coordinator): xem autoIdle bên dưới. */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { autoIdle(document); });
    else autoIdle(document);
    if (typeof MutationObserver === 'function' && document.body) {
      new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          for (var j = 0; j < muts[i].addedNodes.length; j++) {
            var n = muts[i].addedNodes[j];
            if (n && n.nodeType === 1) autoIdle(n.parentNode || document);
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
    onVisibility(); // đặt ca-paused + chạy/dừng vòng đo theo trạng thái hiện tại
  } catch (e) { /* hoạt họa không bao giờ được chặn trang */ }
})();
