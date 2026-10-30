/* =====================================================================
 * pause.js — FIX3 (30/10): nút TẠM DỪNG dùng chung cho các chế độ chơi
 * đơn có tính giờ (leo-thap, chien-dich, dau-kanji, chay-vo-tan, le-hoi).
 *
 * pause.js CHỈ lo: nút "⏸ Tạm dừng" + lớp phủ "⏸ Đang tạm dừng"
 * (▶ Tiếp tục / nút thoát) + cờ paused + ĐO thời gian đã dừng (ms) +
 * duck nhạc nền khi dừng. Việc ĐÔNG CỨNG đồng hồ của từng chế độ nằm ở
 * callback của chính chế độ đó, vì mỗi chế độ giữ giờ một kiểu khác
 * nhau (Date.now()-t0, deadline, performance.now()-gateT0):
 *   GPAUSE.create({
 *     btnHost,          // phần tử chứa nút Tạm dừng
 *     exitLabel,        // nhãn nút thoát trong lớp phủ
 *     isPlaying(),      // -> đang trong ván thì mới cho dừng
 *     onPause(),        // chế độ tự dừng interval/rAF của mình
 *     onResume(durMs),  // chế độ tự cộng durMs vào mốc giờ của mình
 *                       // rồi chạy tiếp đúng từ giá trị đã dừng
 *     onExit(),         // thoát theo luồng sẵn có của chế độ
 *   }) -> { isPaused(), pause(), resume(), setVisible(bool) }
 *
 * setVisible(false) khi ván kết thúc/thoát: nếu đang dừng thì dọn lớp
 * phủ + cờ (không gọi onResume — ván đã bỏ, chế độ tự reset giờ).
 * Lớp phủ phủ kín màn hình nên khi đang dừng, đáp án/trợ giúp phía
 * dưới không bấm được; các handler của chế độ cũng tự kiểm isPaused().
 * Chữ trong lớp phủ viết trung tính, không xưng hô "bạn".
 * ===================================================================== */
(function () {
  'use strict';
  if (window.GPAUSE) return;

  function duck(onOff) {
    try { if (window.GMUSIC && typeof window.GMUSIC.duck === 'function') window.GMUSIC.duck(!!onOff); } catch (e) {}
  }

  function create(opts) {
    opts = opts || {};
    var paused = false;
    var pauseStart = 0;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gpause-btn';
    btn.textContent = '⏸ Tạm dừng';
    btn.setAttribute('aria-label', 'Tạm dừng trò chơi');
    btn.hidden = true;

    var ov = document.createElement('div');
    ov.className = 'gpause-overlay';
    ov.hidden = true;
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'Đang tạm dừng');
    ov.innerHTML =
      '<div class="gpause-card">' +
      '<div class="gpause-title">⏸ Đang tạm dừng</div>' +
      '<p class="gpause-msg">Đồng hồ đã dừng lại. Bấm Tiếp tục để chơi tiếp từ đúng chỗ này.</p>' +
      '<button type="button" class="gpause-resume">▶ Tiếp tục</button>' +
      '<button type="button" class="gpause-exit"></button>' +
      '</div>';
    var resumeBtn = ov.querySelector('.gpause-resume');
    var exitBtn = ov.querySelector('.gpause-exit');
    exitBtn.textContent = opts.exitLabel || 'Thoát';

    (opts.btnHost || document.body).appendChild(btn);
    document.body.appendChild(ov);

    function pause() {
      if (paused) return;
      if (typeof opts.isPlaying === 'function') {
        try { if (!opts.isPlaying()) return; } catch (e) {}
      }
      paused = true;
      pauseStart = Date.now();
      try { if (typeof opts.onPause === 'function') opts.onPause(); } catch (e) {}
      duck(true);
      ov.hidden = false;
    }
    function resume() {
      if (!paused) return;
      paused = false;
      var dur = Date.now() - pauseStart;
      ov.hidden = true;
      duck(false);
      try { if (typeof opts.onResume === 'function') opts.onResume(dur); } catch (e) {}
    }
    function clearSilent() {
      if (!paused) return;
      paused = false;
      ov.hidden = true;
      duck(false);
    }
    btn.addEventListener('click', pause);
    resumeBtn.addEventListener('click', resume);
    exitBtn.addEventListener('click', function () {
      clearSilent();
      try { if (typeof opts.onExit === 'function') opts.onExit(); } catch (e) {}
    });

    return {
      isPaused: function () { return paused; },
      pause: pause,
      resume: resume,
      setVisible: function (v) {
        btn.hidden = !v;
        if (!v) clearSilent();
      }
    };
  }

  window.GPAUSE = { create: create };
})();
