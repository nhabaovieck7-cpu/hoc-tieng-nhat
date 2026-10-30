/* =====================================================================
   fx.js — Hiệu ứng hình ảnh game "Hành trình đến Edo" (Nhánh 1)
   ---------------------------------------------------------------------
   API theo CONTRACT.md: window.GFX = {shake, burst, confetti, comboPop,
   perfect, ultra}. Ngoài ra giữ tương thích bản mẫu: burst(x, y, n),
   combo(n), bigText(), flash(), skill() cho màn đấu trùm.
   - burst nhận: phần tử HTML | {x, y} | (x, y, n) | không tham số.
   - Tôn trọng prefers-reduced-motion: tắt rung màn hình, tắt mưa hạt,
     chữ lớn hiện tĩnh (CSS cũng có media query tương ứng trong game.css).
   - Âm thanh skill: chỉ "mượn" GSFX/sfx nếu Nhánh 4 đã nạp — fx.js
     KHÔNG tự phát tiếng và KHÔNG hô tên skill bằng giọng đọc.
   ===================================================================== */
(function () {
  'use strict';

  var mq = null;
  try { mq = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { mq = null; }
  function reduced() { return !!(mq && mq.matches); }
  window.GAME_reducedMotion = reduced;

  function sfx(name) {
    try {
      if (window.GSFX && typeof window.GSFX.play === 'function') { window.GSFX.play(name); return; }
      if (typeof window.sfx === 'function') window.sfx(name);
    } catch (e) { /* âm thanh là phụ, lỗi thì thôi */ }
  }

  /* ---------------- Lớp hạt (canvas) ----------------
     Đợt 7 (nhánh Q) — tối ưu theo số đo harness (work/Q/tests):
     - Vòng rAF TỰ DỪNG khi hết hạt (bản cũ chạy vĩnh viễn + clearRect
       toàn màn mỗi khung sau lần fxInit đầu tiên) và tự dừng khi tab ẩn;
       có hạt mới thì pushPart khởi động lại.
     - Ngân sách hạt theo bậc chất lượng __GPERF.tier (charanim.js là bộ
       đo FPS chung duy nhất): 'full' tối đa 300 hạt sống, 'low' tối đa
       140 và số hạt mỗi lần burst/confetti nhân 0.45; 'off' (reduced
       motion) vốn đã bị chặn ở cửa hàm. */
  var cv = null, cx = null, parts = [], rafOn = false;
  function fxTier() {
    try {
      if (window.__GPERF && window.__GPERF.tier) return window.__GPERF.tier;
      if (window.GCANIM && typeof window.GCANIM.quality === 'function') return window.GCANIM.quality();
    } catch (e) { /* bỏ qua */ }
    return 'full';
  }
  function capParts() { return fxTier() === 'low' ? 140 : 300; }
  function scaleN(n) {
    if (fxTier() === 'low') return Math.max(4, Math.round(n * 0.45));
    return n;
  }
  function fxInit() {
    if (cv) return;
    cv = document.createElement('canvas');
    cv.className = 'fx-canvas';
    cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    cx = cv.getContext('2d');
    var rs = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.floor(window.innerWidth * dpr);
      cv.height = Math.floor(window.innerHeight * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    rs();
    window.addEventListener('resize', rs);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && parts.length && !rafOn) { rafOn = true; requestAnimationFrame(loop); }
    });
    if (!rafOn) { rafOn = true; requestAnimationFrame(loop); }
  }
  function loop() {
    if (!cx || document.hidden) { rafOn = false; return; }
    parts = parts.filter(function (p) { return p.l > 0; });
    cx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (!parts.length) { rafOn = false; return; } // hết hạt -> dừng hẳn vòng lặp
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= p.dec;
      if (p.rot != null) p.rot += p.vr;
      cx.globalAlpha = Math.max(0, Math.min(1, p.l));
      cx.fillStyle = p.c;
      if (p.shape === 'rect') {
        cx.save();
        cx.translate(p.x, p.y);
        cx.rotate(p.rot || 0);
        cx.fillRect(-p.r, -p.r * 0.62, p.r * 2, p.r * 1.24);
        cx.restore();
      } else {
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, 7);
        cx.fill();
      }
    }
    cx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  function pushPart(p) {
    var cap = capParts();
    if (parts.length >= cap) parts.splice(0, parts.length - cap + 1);
    parts.push(p);
    if (!rafOn && cv) { rafOn = true; requestAnimationFrame(loop); }
  }
  var SPARK_COLORS = ['#ffd84e', '#ff7a45', '#ff4fd8', '#22d3ee', '#ffffff'];
  function pickColor(cols) { return cols[Math.floor(Math.random() * cols.length)]; }

  function pointOf(target, x, y) {
    if (typeof target === 'number' && typeof x === 'number') return { x: target, y: x };
    if (target && typeof target.getBoundingClientRect === 'function') {
      var r = target.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    if (target && typeof target.x === 'number' && typeof target.y === 'number') return target;
    return { x: window.innerWidth / 2, y: window.innerHeight / 3 };
  }

  /* Nổ năng lượng: burst(el) | burst({x,y}) | burst(x, y, n) */
  function burst(target, a, b) {
    if (reduced()) return;
    var n = 40, cols = SPARK_COLORS, pt;
    if (typeof target === 'number') { pt = pointOf(target, a); if (typeof b === 'number') n = b; }
    else {
      pt = pointOf(target);
      if (typeof a === 'number') n = a;
      if (Array.isArray(b)) cols = b;
    }
    fxInit();
    n = scaleN(n);
    for (var i = 0; i < n; i++) {
      var ang = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 7;
      pushPart({
        x: pt.x, y: pt.y,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 1,
        g: 0.12, r: 2 + Math.random() * 4, l: 1, dec: 0.02,
        c: pickColor(cols), shape: 'dot'
      });
    }
  }

  /* Pháo giấy: confetti(n?) — rơi từ trên xuống, đủ màu */
  function confetti(n) {
    if (reduced()) return;
    n = scaleN((typeof n === 'number') ? n : 130);
    fxInit();
    var cols = ['#ffd84e', '#ff4fd8', '#22d3ee', '#2fbf71', '#ff7a45', '#7c5cff', '#ffffff'];
    for (var i = 0; i < n; i++) {
      pushPart({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 2.2, vy: 2 + Math.random() * 3.4,
        g: 0.045, r: 4 + Math.random() * 5, l: 1, dec: 0.004,
        c: pickColor(cols), shape: 'rect',
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3
      });
    }
  }

  /* ---------------- Rung màn hình / chớp sáng ---------------- */
  function shake(target, ms) {
    if (reduced()) return;
    var el = (target && target.animate) ? target
      : (document.querySelector('.wrap') || document.body);
    if (!el.animate) return;
    try {
      el.animate([
        { transform: 'translate(0,0)' },
        { transform: 'translate(-9px,5px)' },
        { transform: 'translate(8px,-6px)' },
        { transform: 'translate(-5px,-4px)' },
        { transform: 'translate(0,0)' }
      ], { duration: ms || 350, iterations: 1 });
    } catch (e) { /* bỏ qua */ }
  }
  function flash(color) {
    if (reduced()) return;
    var d = document.createElement('div');
    d.className = 'fx-flash';
    d.style.background = color || '#ffffff';
    document.body.appendChild(d);
    try {
      d.animate([{ opacity: 0.7 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
    } catch (e) { /* bỏ qua */ }
    setTimeout(function () { d.remove(); }, 320);
  }

  /* ---------------- Chữ lớn & combo ---------------- */
  function bigText(text, cls, ms) {
    var d = document.createElement('div');
    d.className = 'big ' + (cls || '');
    d.innerHTML = text; // text do mã game tự tạo (không phải dữ liệu người dùng)
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, ms || 1100);
    return d;
  }
  function perfect() {
    sfx('perfect');
    document.querySelectorAll('.big.perfect').forEach(function (x) { x.remove(); });
    bigText('PERFECT!', 'perfect', 1100);
  }
  function ultra() {
    sfx('ultra');
    flash('#ff4fd8');
    bigText('ULTRA<br>COMBO!!', 'ultra', 1400);
    burst(null, 110);
  }
  /* FIX3 (30/10, Lỗi 1): vị trí combo tính từ THẺ CÂU HỎI THẬT của
     chế độ đang chơi, ngay lúc hiện:
       - Chiến dịch: thẻ #cdQbox; câu hỏi = .cd-q/.cd-sent trong thẻ.
       - Chạy vô tận: sân #stage — cổng đáp án TRƯỢT dọc khắp sân nên
         vùng an toàn duy nhất là góc ĐÁY-phải sân (dưới tầm cổng chạm
         đáy: cổng dừng ở bottom-64px, runner ở giữa sân).
       - Các chế độ mx (leo-thap/dau-kanji/le-hoi): thẻ .mx-card chứa
         #qBox; câu hỏi = #qBox, đáp án đầu = .mx-opt/.mx-token.
     Quy tắc chung (trừ Chạy vô tận): cạnh DƯỚI của hộp combo đặt trên
     cạnh trên của câu hỏi 4px và trên đáp án đầu tiên — hộp combo
     KHÔNG BAO GIỜ giao hộp chữ câu hỏi hay bất kỳ nút đáp án nào.
     Không tìm thấy thẻ (hub/phòng nhóm…): góc trên-phải cố định. */
  var comboTimer = null;
  function positionCombo(c) {
    c.style.left = ''; c.style.right = ''; c.style.top = ''; c.style.bottom = '';
    var placed = false;
    try {
      var card = null, q = null, ans = null, bottomMode = false;
      var cdq = document.getElementById('cdQbox');
      if (cdq && cdq.getBoundingClientRect().height) {
        card = cdq;
        q = cdq.querySelector('.cd-q, .cd-sent');
        ans = cdq.querySelector('.cd-opt, .cd-tile');
      }
      if (!card) {
        var stg = document.getElementById('stage');
        if (stg && document.getElementById('gateBox')) { card = stg; bottomMode = true; }
      }
      if (!card) {
        var qb = document.getElementById('qBox');
        if (qb) {
          card = qb.closest ? qb.closest('.mx-card') : null;
          q = qb;
          ans = document.querySelector('#optBox .mx-opt, #ordBox .mx-token');
        }
      }
      if (card) {
        var cr = card.getBoundingClientRect();
        var h = c.offsetHeight || 40;
        c.style.right = Math.max(6, Math.round(window.innerWidth - cr.right + 8)) + 'px';
        var top;
        if (bottomMode) {
          top = cr.bottom - h - 8;
        } else {
          var limit = cr.bottom;
          if (q) limit = Math.min(limit, q.getBoundingClientRect().top);
          if (ans) limit = Math.min(limit, ans.getBoundingClientRect().top);
          /* Chừa 12px thay vì 4px: hộp combo xoay -6deg + nhịp scale
             1.1 làm hộp bao thật (getBoundingClientRect) phình thêm
             ~5px mỗi phía so với offsetHeight — đo harness vòng đầu:
             chừa 4px còn giao 1,3px ở đỉnh animation. */
          top = limit - h - 12;
          if (top < cr.top + 4) top = cr.top + 4;
        }
        c.style.top = Math.round(top) + 'px';
        if (!bottomMode) {
          /* Né các pill nằm sẵn trong dải an toàn (đồng hồ #tTxt, điểm
             #sc/#scorePill ở leo-thap/dau-kanji/le-hoi): nếu hộp combo
             (canh phải) giao một pill thì dịch trái cho tới khi nằm
             cạnh trái của pill đó — vẫn trong dải trên câu hỏi. */
          var wCombo = c.offsetWidth || 60;
          var blockers = card.querySelectorAll('#tTxt, #sc, #scorePill');
          for (var bi = 0; bi < blockers.length; bi++) {
            var br = blockers[bi].getBoundingClientRect();
            if (!br.width || !br.height) continue;
            var curRight = parseFloat(c.style.right) || 0;
            var cLeft = window.innerWidth - curRight - wCombo;
            var cTop = parseFloat(c.style.top) || 0;
            var cBottom = cTop + h, cRight = cLeft + wCombo;
            if (cLeft < br.right && br.left < cRight && cTop < br.bottom && br.top < cBottom) {
              c.style.right = Math.round(window.innerWidth - br.left + 8) + 'px';
            }
          }
        }
        placed = true;
      }
    } catch (e) { /* rơi về vị trí mặc định bên dưới */ }
    if (!placed) { c.style.right = '10px'; c.style.top = '64px'; }
  }
  function comboPop(n, el) {
    var c = document.getElementById('combo');
    if (!c) {
      c = document.createElement('div');
      c.id = 'combo';
      c.setAttribute('aria-hidden', 'true');
      document.body.appendChild(c);
    }
    if (comboTimer) { clearTimeout(comboTimer); comboTimer = null; }
    if (!n || n < 2) { c.className = ''; c.innerHTML = ''; return; }
    if (n >= 5 && n % 5 === 0) sfx('ultra'); else sfx('combo');
    c.className = 'on';
    c.innerHTML = '<b>' + (+n) + '</b><small>COMBO</small>';
    positionCombo(c);
    /* FIX3: hiện NGẮN (~1s) rồi tự ẩn — bản cũ để hộp combo đứng yên
       vô hạn tới combo lần sau/sai, nên nó che đáp án suốt câu sau. */
    comboTimer = setTimeout(function () { c.className = ''; c.innerHTML = ''; comboTimer = null; }, 1000);
    if (!reduced() && c.animate) {
      try {
        c.animate([
          { transform: 'scale(1.1) rotate(-6deg)' },
          { transform: 'scale(1) rotate(-6deg)' }
        ], { duration: 200 });
      } catch (e) { /* bỏ qua */ }
    }
    if (n === 5 || (n >= 10 && n % 10 === 0)) ultra();
    if (el) burst(el, 18);
  }

  /* ---------------- Tuyệt chiêu (giữ từ bản mẫu) ----------------
     Chỉ hiệu ứng hình + tiếng skill (GSFX), KHÔNG hô tên skill.      */
  var SKILLS = {
    beam: { c: '#22d3ee' }, thunder: { c: '#ffe14e' }, shuriken: { c: '#e5e7eb' },
    gun: { c: '#7cfc00' }, fire: { c: '#ff5a1f' }
  };
  function skill(k, from, to) {
    if (!SKILLS[k] || !from || !to) return Promise.resolve();
    fxInit();
    sfx(k);
    var S = SKILLS[k];
    var a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    var x1 = a.left + a.width / 2, y1 = a.top + a.height / 2;
    var x2 = b.left + b.width / 2, y2 = b.top + b.height / 2;
    var L = document.createElement('div');
    L.className = 'beamfx ' + k;
    var len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1);
    L.style.left = x1 + 'px'; L.style.top = y1 + 'px';
    L.style.width = len + 'px';
    L.style.transform = 'rotate(' + ang + 'rad)';
    L.style.setProperty('--c', S.c);
    L.style.setProperty('--fly', len + 'px'); // đợt 7: đích translateX cho @keyframes gfly (game.css)
    if (k === 'shuriken' || k === 'gun') {
      var icons = '';
      var cnt = (k === 'gun') ? 7 : 5;
      for (var i = 0; i < cnt; i++) {
        icons += '<i style="animation-delay:' + (i * 60) + 'ms">' + (k === 'gun' ? '•' : '✦') + '</i>';
      }
      L.innerHTML = icons;
    }
    if (k === 'thunder') {
      L.style.left = (x2 - 30) + 'px'; L.style.top = '0px';
      L.style.width = '60px'; L.style.height = y2 + 'px';
      L.style.transform = 'none';
    }
    document.querySelectorAll('.beamfx').forEach(function (x) { x.remove(); });
    document.body.appendChild(L);
    return new Promise(function (resolve) {
      setTimeout(function () {
        document.body.classList.add('hitstop');
        sfx('hit');
        flash(S.c + '88');
        shake();
        burst(x2, y2, 55);
        if (to.animate && !reduced()) {
          try {
            to.animate([
              { transform: 'scale(1.22) rotate(-7deg)', filter: 'brightness(2.6)' },
              { transform: 'scale(1)', filter: 'none' }
            ], { duration: 380 });
          } catch (e) { /* bỏ qua */ }
        }
        setTimeout(function () {
          document.body.classList.remove('hitstop');
          L.remove();
          resolve();
        }, 90);
      }, k === 'thunder' ? 150 : 320);
    });
  }

  window.GFX = {
    shake: shake, burst: burst, confetti: confetti, comboPop: comboPop,
    perfect: perfect, ultra: ultra, bigText: bigText, flash: flash, skill: skill,
    _parts: function () { return parts.length; } // đợt 7: harness/__GPERF đọc số hạt sống
  };
  // Tương thích bản mẫu cho các nhánh đã quen tên toàn cục
  window.shake = shake;
  window.burst = burst;
  window.confetti = confetti;
  window.combo = comboPop;
  window.bigText = bigText;
  window.flash = flash;
  window.skill = skill;
})();
