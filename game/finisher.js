/* =====================================================================
   finisher.js — Hiệu ứng KẾT LIỄU khi thắng ván (Nhánh K, đợt game 3)
   ---------------------------------------------------------------------
   API theo CONTRACT-B3.md (mục FINISHER):
     window.GFIN.play(opts) -> Promise
     opts: { anchorEl?, fromEl?, toEl?, dmg?, label? }
       - fromEl: phần tử nhân vật tung đòn (thiếu -> dùng anchorEl;
         vẫn thiếu/không đo được -> clone emoji 🥷 tự dựng ở trái-giữa).
       - toEl: phần tử mục tiêu (thiếu -> mục tiêu 👹 tự dựng giữa-trên).
       - dmg: số sát thương hiện lớn (mặc định 999).
       - label: chữ bùng nổ cuối (mặc định "K.O.!").
   Trình tự (~1,4s): phát GSFX 'finisher' ngay đầu -> dồn sáng nhẹ ->
   clone của nhân vật tung đòn (GGEAR.attackFx nếu có; fallback
   GFX.skill('beam', clone, target); fallback nữa = vệt chém CSS tự chứa
   + clone lao tới) -> số sát thương bay lên + GFX.burst -> chữ K.O.!
   bùng nổ -> GFX.confetti(80).
   - Chạm (pointerdown/touchstart) vào overlay bất cứ lúc nào: dọn ngay
     + resolve sớm.
   - prefers-reduced-motion: chỉ chữ K.O.! tĩnh + tiếng, resolve ~450ms.
   - Gọi play() khi đang chạy: huỷ đoạn cũ (resolve nó) rồi chạy đoạn mới
     — không bao giờ chồng 2 overlay.
   - Mọi lỗi nội bộ đều bị nuốt: play() LUÔN resolve, không treo luồng game.
   Cần: finisher.css. Tuỳ chọn (tự kiểm tra lúc chạy): fx.js (GFX),
   sfx.js (GSFX), gear.js (GGEAR).
   ===================================================================== */
(function () {
  'use strict';

  var Z = 9990; // dưới panel ⚙️ settings nếu panel dùng z cao hơn; vẫn trên mọi lớp game (<=200)
  var TOTAL_MS = 1400;      // tổng thời lượng đoạn thường
  var REDUCED_MS = 450;     // reduced-motion: chỉ chữ tĩnh + tiếng
  var cur = null;           // đoạn đang chạy: {overlay, timers:[], resolve, done}

  function reduced() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }
  function isEl(x) { return !!(x && typeof x === 'object' && typeof x.getBoundingClientRect === 'function' && x.nodeType === 1); }
  function rectOf(el) {
    if (!isEl(el)) return null;
    try {
      var r = el.getBoundingClientRect();
      if (!r || (r.width === 0 && r.height === 0)) return null; // ẩn / detached -> coi như không có
      return r;
    } catch (e) { return null; }
  }
  function sfxFinisher() {
    try {
      if (window.GSFX && typeof window.GSFX.play === 'function') { window.GSFX.play('finisher'); return; }
      if (window.GSFX && typeof window.GSFX.finisher === 'function') { window.GSFX.finisher(); return; }
      if (typeof window.sfx === 'function') window.sfx('finisher');
    } catch (e) { /* tiếng là phụ */ }
  }
  function later(state, fn, ms) {
    var id = setTimeout(function () { try { fn(); } catch (e) { /* không để lỗi treo đoạn */ } }, ms);
    state.timers.push(id);
    return id;
  }

  /* Kết thúc 1 đoạn: dọn DOM + timer, resolve đúng 1 lần. */
  function finish(state) {
    if (!state || state.done) return;
    state.done = true;
    state.timers.forEach(function (id) { clearTimeout(id); });
    state.timers = [];
    try { if (state.overlay && state.overlay.parentNode) state.overlay.parentNode.removeChild(state.overlay); } catch (e) {}
    if (cur === state) cur = null;
    try { state.resolve(); } catch (e) {}
  }

  function play(opts) {
    opts = opts || {};
    // Đang chạy dở -> huỷ đoạn cũ trước (nó resolve ngay), không chồng overlay.
    if (cur) finish(cur);

    var resolveFn = null;
    var promise = new Promise(function (res) { resolveFn = res; });
    var state = { overlay: null, timers: [], resolve: resolveFn, done: false };
    cur = state;

    try {
      sfxFinisher();

      var overlay = document.createElement('div');
      overlay.className = 'gf-overlay';
      overlay.setAttribute('role', 'presentation');
      overlay.setAttribute('aria-label', 'Kết liễu!');
      state.overlay = overlay;

      var skip = function (ev) {
        try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (e) {}
        finish(state);
      };
      overlay.addEventListener('pointerdown', skip);
      overlay.addEventListener('touchstart', skip, { passive: false });

      document.body.appendChild(overlay);

      var label = (typeof opts.label === 'string' && opts.label) ? opts.label : 'K.O.!';

      /* ----- Reduced motion: chữ tĩnh + tiếng, ~450ms ----- */
      if (reduced()) {
        var koStill = document.createElement('div');
        koStill.className = 'gf-ko gf-still';
        koStill.textContent = label;
        overlay.appendChild(koStill);
        later(state, function () { finish(state); }, REDUCED_MS);
        return promise;
      }

      /* ----- Điểm xuất phát / mục tiêu ----- */
      var fromEl = isEl(opts.fromEl) ? opts.fromEl : (isEl(opts.anchorEl) ? opts.anchorEl : null);
      var fromRect = rectOf(fromEl);
      var vw = window.innerWidth || 360, vh = window.innerHeight || 640;
      var fromPt = fromRect
        ? { x: fromRect.left + fromRect.width / 2, y: fromRect.top + fromRect.height / 2 }
        : { x: Math.round(vw * 0.18), y: Math.round(vh * 0.58) };

      // Clone nhân vật: bản sao tuyệt đối tại vị trí fromEl (không phá layout gốc).
      var clone = document.createElement('div');
      clone.className = 'gf-clone';
      clone.setAttribute('aria-hidden', 'true');
      if (fromRect && fromEl) {
        try {
          var cn = fromEl.cloneNode(true);
          if (cn.removeAttribute) { cn.removeAttribute('id'); }
          cn.classList && cn.classList.add('gf-clone-inner');
          clone.appendChild(cn);
        } catch (e) { clone.textContent = '🥷'; }
        clone.style.left = fromRect.left + 'px';
        clone.style.top = fromRect.top + 'px';
        clone.style.width = fromRect.width + 'px';
        clone.style.height = fromRect.height + 'px';
      } else {
        clone.textContent = '🥷';
        clone.classList.add('gf-clone-emoji');
        clone.style.left = (fromPt.x - 34) + 'px';
        clone.style.top = (fromPt.y - 34) + 'px';
      }
      overlay.appendChild(clone);

      var toEl = isEl(opts.toEl) ? opts.toEl : null;
      var toRect = rectOf(toEl);
      var targetEl = toEl, targetPt;
      if (toRect) {
        targetPt = { x: toRect.left + toRect.width / 2, y: toRect.top + toRect.height / 2 };
      } else {
        // Mục tiêu mặc định do finisher tự dựng: boss 👹 ở giữa-trên màn hình.
        targetEl = document.createElement('div');
        targetEl.className = 'gf-target';
        targetEl.setAttribute('aria-hidden', 'true');
        targetEl.textContent = '👹';
        targetPt = { x: Math.round(vw * 0.5), y: Math.round(vh * 0.26) };
        targetEl.style.left = targetPt.x + 'px';
        targetEl.style.top = targetPt.y + 'px';
        overlay.appendChild(targetEl);
      }

      overlay.classList.add('gf-charge'); // dồn sáng nhẹ (CSS)

      /* ----- Đòn đánh ở ~150ms ----- */
      later(state, function () {
        var usedGear = false;
        try {
          if (window.GGEAR && typeof window.GGEAR.attackFx === 'function') {
            usedGear = true;
            var p = window.GGEAR.attackFx(clone, targetEl);
            if (p && typeof p.catch === 'function') p.catch(function () {});
          } else if (window.GFX && typeof window.GFX.skill === 'function') {
            var p2 = window.GFX.skill('beam', clone, targetEl);
            if (p2 && typeof p2.catch === 'function') p2.catch(function () {});
          }
        } catch (e) { usedGear = false; }

        if (!usedGear) {
          // Fallback tự chứa: clone lao tới + vệt chém CSS nối 2 điểm.
          try {
            var dx = targetPt.x - fromPt.x, dy = targetPt.y - fromPt.y;
            if (clone.animate) {
              clone.animate([
                { transform: 'translate(0,0)' },
                { transform: 'translate(' + Math.round(dx * 0.82) + 'px,' + Math.round(dy * 0.82) + 'px)' }
              ], { duration: 360, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'forwards' });
            }
            if (!(window.GFX && typeof window.GFX.skill === 'function')) {
              var len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
              var slash = document.createElement('div');
              slash.className = 'gf-slash';
              slash.style.left = fromPt.x + 'px';
              slash.style.top = fromPt.y + 'px';
              slash.style.width = len + 'px';
              slash.style.transform = 'rotate(' + ang + 'rad)';
              overlay.appendChild(slash);
            }
          } catch (e) { /* bỏ qua */ }
        }
      }, 150);

      /* ----- Chạm đích ~620ms: số sát thương + burst ----- */
      later(state, function () {
        try { if (window.GFX && typeof window.GFX.burst === 'function') window.GFX.burst(targetEl, 46); } catch (e) {}
        try {
          if (targetEl.animate && targetEl !== clone) {
            targetEl.animate([
              { transform: 'scale(1.25) rotate(-6deg)', filter: 'brightness(2.4)' },
              { transform: 'scale(1)', filter: 'none' }
            ], { duration: 320 });
          }
        } catch (e) {}
        var dmg = document.createElement('div');
        dmg.className = 'gf-dmg';
        dmg.textContent = (opts.dmg != null && opts.dmg !== '') ? String(opts.dmg) : '999';
        dmg.style.left = targetPt.x + 'px';
        dmg.style.top = (targetPt.y - 10) + 'px';
        overlay.appendChild(dmg);
      }, 620);

      /* ----- K.O.! ~740ms + confetti ----- */
      later(state, function () {
        var ko = document.createElement('div');
        ko.className = 'gf-ko';
        ko.textContent = label;
        overlay.appendChild(ko);
        try { if (window.GFX && typeof window.GFX.confetti === 'function') window.GFX.confetti(80); } catch (e) {}
        // Không dùng GFX.flash ở đây: chớp vàng .7 opacity che mất chữ K.O.! trên nền sáng.
      }, 740);

      later(state, function () { finish(state); }, TOTAL_MS);
      // Failsafe tuyệt đối: dù bước nào treo, tối đa 2,4s là resolve.
      later(state, function () { finish(state); }, 2400);
    } catch (e) {
      finish(state);
    }
    return promise;
  }

  /* =====================================================================
     playBoss(opts) — BOSS CUỐI VÁN, hiệu ứng mạnh (Nhánh B, đợt game 4)
     opts: { boss?, fromEl?, anchorEl?, toEl?, dmg?, label?, skillId? }
       - boss: object GBOSS {id,name,emoji,sub,color} của ván (đấu trùm /
         chiến dịch / phòng nhóm nếu có). Thiếu -> GBOSS.next() (túi xáo
         trộn không trùng đợt 3) và boss được HIỆN trong overlay.
       - skillId: ép skill cho chuỗi đòn; thiếu -> skill đang trang bị.
     Trình tự (~2,6s): tiếng 'bossfin' -> boss hiện -> 6 đòn dồn dập
     (GGEAR.attackFx gọi lặp, nhịp 230->150ms nhanh dần; fallback
     GFX.skill('beam') -> vệt chém CSS), rung overlay biên độ tăng dần,
     chớp sáng theo đòn, số sát thương từng đòn + TỔNG cộng dồn, thanh
     máu boss tụt theo -> SLOW-MO ~0,42s (1,28s, overlay dataset.slowmo)
     -> NỔ LỚN (burst + confetti + vòng nổ) -> "K.O.!".
     Chạm để bỏ qua; gọi đè -> huỷ đoạn cũ (chung biến `cur` với play());
     reduced-motion -> boss + K.O. tĩnh + tiếng, resolve ~500ms.
     play() cũ giữ nguyên 100%.
     ===================================================================== */
  var BOSS_TOTAL_MS = 2600;
  var BOSS_REDUCED_MS = 500;
  var HIT_T = [160, 390, 600, 790, 960, 1110];       // nhịp nhanh dần
  var HIT_W = [0.10, 0.13, 0.15, 0.18, 0.20, 0.24];  // tỉ trọng sát thương, tổng = 1

  function sfxBossfin() {
    try {
      if (window.GSFX && typeof window.GSFX.play === 'function') { window.GSFX.play('bossfin'); return; }
      if (window.GSFX && typeof window.GSFX.bossfin === 'function') { window.GSFX.bossfin(); return; }
      if (typeof window.sfx === 'function') window.sfx('bossfin');
    } catch (e) { /* tiếng là phụ */ }
  }

  function pickBoss(opts) {
    var b = opts.boss;
    if (typeof b === 'string') {
      try { if (window.GBOSS && typeof window.GBOSS.get === 'function') b = window.GBOSS.get(b); } catch (e) { b = null; }
    }
    if (b && typeof b === 'object' && (b.emoji || b.name)) {
      // Boss đã chốt của ván: ghi nhận "vừa dùng" để lần GBOSS.next() kế
      // không rút trùng (removeFromBag + khoá hn_boss_last của bosses.js).
      try {
        if (b.id && window.GBOSS && typeof window.GBOSS.removeFromBag === 'function') window.GBOSS.removeFromBag(b.id);
        if (b.id) localStorage.setItem('hn_boss_last', b.id);
      } catch (e) {}
      return { id: b.id || '', name: b.name || 'Boss', emoji: b.emoji || '👹', sub: b.sub || '', color: b.color || '#ff7a45' };
    }
    try {
      if (window.GBOSS && typeof window.GBOSS.next === 'function') {
        var n = window.GBOSS.next();
        if (n) return n;
      }
    } catch (e) {}
    return { id: 'boss-edo', name: 'Boss Edo', emoji: '👹', sub: '', color: '#ff7a45' };
  }

  function buildClone(overlay, fromEl) {
    var fromRect = rectOf(fromEl);
    var vw = window.innerWidth || 360, vh = window.innerHeight || 640;
    var fromPt = fromRect
      ? { x: fromRect.left + fromRect.width / 2, y: fromRect.top + fromRect.height / 2 }
      : { x: Math.round(vw * 0.16), y: Math.round(vh * 0.60) };
    var clone = document.createElement('div');
    clone.className = 'gf-clone';
    clone.setAttribute('aria-hidden', 'true');
    if (fromRect && fromEl) {
      try {
        var cn = fromEl.cloneNode(true);
        if (cn.removeAttribute) { cn.removeAttribute('id'); }
        cn.classList && cn.classList.add('gf-clone-inner');
        clone.appendChild(cn);
      } catch (e) { clone.textContent = '🥷'; }
      clone.style.left = fromRect.left + 'px';
      clone.style.top = fromRect.top + 'px';
      clone.style.width = fromRect.width + 'px';
      clone.style.height = fromRect.height + 'px';
    } else {
      clone.textContent = '🥷';
      clone.classList.add('gf-clone-emoji');
      clone.style.left = (fromPt.x - 34) + 'px';
      clone.style.top = (fromPt.y - 34) + 'px';
    }
    overlay.appendChild(clone);
    return { clone: clone, pt: fromPt };
  }

  function playBoss(opts) {
    opts = opts || {};
    if (cur) finish(cur);

    var resolveFn = null;
    var promise = new Promise(function (res) { resolveFn = res; });
    var state = { overlay: null, timers: [], resolve: resolveFn, done: false };
    cur = state;

    try {
      sfxBossfin();
      var boss = pickBoss(opts);
      var label = (typeof opts.label === 'string' && opts.label) ? opts.label : 'K.O.!';
      var baseDmg = (opts.dmg != null && opts.dmg !== '' && !isNaN(+opts.dmg)) ? Math.max(1, Math.round(+opts.dmg)) : 999;

      var overlay = document.createElement('div');
      overlay.className = 'gf-overlay gfb-overlay';
      overlay.setAttribute('role', 'presentation');
      overlay.setAttribute('aria-label', 'Kết liễu boss: ' + boss.name);
      overlay.dataset.bossId = boss.id || '';
      overlay.dataset.bossfin = '1';
      state.overlay = overlay;
      var skip = function (ev) {
        try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (e) {}
        finish(state);
      };
      overlay.addEventListener('pointerdown', skip);
      overlay.addEventListener('touchstart', skip, { passive: false });
      document.body.appendChild(overlay);

      /* ----- Thẻ boss trong overlay (luôn hiện) ----- */
      var vw = window.innerWidth || 360, vh = window.innerHeight || 640;
      var toEl = isEl(opts.toEl) ? opts.toEl : null;
      var toRect = rectOf(toEl);
      var bossPt = toRect
        ? { x: toRect.left + toRect.width / 2, y: toRect.top + toRect.height / 2 }
        : { x: Math.round(vw * 0.60), y: Math.round(vh * 0.30) };
      // Kẹp tâm thẻ boss vào trong màn hình: boss ở sát biên (vd hình boss
      // bên phải sân đấu) thì thẻ ~220px vẫn không bị cắt khỏi khung.
      bossPt.x = Math.max(118, Math.min(vw - 118, bossPt.x));
      bossPt.y = Math.max(120, Math.min(vh - 170, bossPt.y));
      var card = document.createElement('div');
      card.className = 'gfb-boss';
      card.setAttribute('aria-hidden', 'true');
      card.style.setProperty('--gfb-c', boss.color || '#ff7a45');
      card.innerHTML = '';
      var em = document.createElement('div'); em.className = 'gfb-boss-emoji'; em.textContent = boss.emoji || '👹';
      var nm = document.createElement('div'); nm.className = 'gfb-boss-name'; nm.textContent = boss.name || 'Boss';
      var tag = document.createElement('div'); tag.className = 'gfb-boss-tag'; tag.textContent = '👹 BOSS CUỐI VÁN' + (boss.sub ? ' ' + boss.sub : '');
      var hpWrap = document.createElement('div'); hpWrap.className = 'gfb-hp';
      var hpFill = document.createElement('div'); hpFill.className = 'gfb-hp-fill';
      hpWrap.appendChild(hpFill);
      card.appendChild(em); card.appendChild(nm); card.appendChild(tag); card.appendChild(hpWrap);
      overlay.appendChild(card);
      // Đặt thẻ theo kích thước ĐO THỰC, kẹp trọn trong màn hình (left/top,
      // không transform căn giữa — xem chú thích .gfb-boss trong CSS).
      try {
        var cw = card.offsetWidth || 190, chh = card.offsetHeight || 190;
        /* Lề kẹp 14px (coordinator đợt 4 nới từ 6): chừa chỗ cho rung trúng
           đòn + scale của chính thẻ để không tràn mép màn hình khi lắc. */
        var cl = Math.max(10, Math.min(vw - cw - 14, bossPt.x - cw / 2));
        var ct = Math.max(10, Math.min(vh - chh - 14, bossPt.y - chh / 2));
        card.style.left = cl + 'px';
        card.style.top = ct + 'px';
        // Tâm hiệu ứng (số sát thương/vòng nổ/đòn) bám theo tâm thẻ thật.
        bossPt.x = Math.round(cl + cw / 2);
        bossPt.y = Math.round(ct + chh / 2);
      } catch (e) {
        card.style.left = (bossPt.x - 95) + 'px';
        card.style.top = (bossPt.y - 95) + 'px';
      }

      var totalEl = document.createElement('div');
      totalEl.className = 'gfb-total';
      totalEl.setAttribute('aria-hidden', 'true');
      totalEl.textContent = 'TỔNG SÁT THƯƠNG 0';
      overlay.appendChild(totalEl);

      /* ----- Reduced motion: boss + K.O. tĩnh + tiếng, ~500ms ----- */
      if (reduced()) {
        overlay.dataset.reduced = '1';
        totalEl.textContent = 'TỔNG SÁT THƯƠNG ' + baseDmg;
        var koStill = document.createElement('div');
        koStill.className = 'gf-ko gf-still';
        koStill.textContent = label;
        overlay.appendChild(koStill);
        later(state, function () { finish(state); }, BOSS_REDUCED_MS);
        return promise;
      }

      var flash = document.createElement('div');
      flash.className = 'gfb-flash';
      flash.setAttribute('aria-hidden', 'true');
      overlay.appendChild(flash);

      var fromEl = isEl(opts.fromEl) ? opts.fromEl : (isEl(opts.anchorEl) ? opts.anchorEl : null);
      var built = buildClone(overlay, fromEl);
      var clone = built.clone, fromPt = built.pt;

      function oneHitFx() {
        var used = false;
        try {
          if (window.GGEAR && typeof window.GGEAR.attackFx === 'function') {
            used = true;
            var p = opts.skillId
              ? window.GGEAR.attackFx(clone, card, { skill: opts.skillId })
              : window.GGEAR.attackFx(clone, card);
            if (p && typeof p.catch === 'function') p.catch(function () {});
          } else if (window.GFX && typeof window.GFX.skill === 'function') {
            used = true;
            var p2 = window.GFX.skill('beam', clone, card);
            if (p2 && typeof p2.catch === 'function') p2.catch(function () {});
          }
        } catch (e) { used = false; }
        if (!used) {
          try {
            var dx = bossPt.x - fromPt.x, dy = bossPt.y - fromPt.y;
            var len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
            var slash = document.createElement('div');
            slash.className = 'gf-slash';
            slash.style.left = fromPt.x + 'px';
            slash.style.top = fromPt.y + 'px';
            slash.style.width = len + 'px';
            slash.style.transform = 'rotate(' + ang + 'rad)';
            overlay.appendChild(slash);
            later(state, function () { try { slash.remove(); } catch (e) {} }, 420);
            if (clone.animate) {
              clone.animate([
                { transform: 'translate(0,0)' },
                { transform: 'translate(' + Math.round(dx * 0.7) + 'px,' + Math.round(dy * 0.7) + 'px)' },
                { transform: 'translate(0,0)' }
              ], { duration: 300, easing: 'ease-out' });
            }
          } catch (e) { /* bỏ qua */ }
        }
      }

      /* ----- Chuỗi đòn dồn dập ----- */
      var cum = 0;
      HIT_T.forEach(function (tHit, i) {
        later(state, function () {
          oneHitFx();
          var chunk = (i === HIT_T.length - 1) ? (baseDmg - cum) : Math.round(baseDmg * HIT_W[i]);
          cum += chunk;
          // Số sát thương của đòn (giữ trong DOM tới hết đoạn để đếm được)
          var d = document.createElement('div');
          d.className = 'gfb-dmg';
          d.textContent = String(chunk);
          d.style.left = (bossPt.x + ((i % 2) ? -1 : 1) * (16 + (i % 3) * 24)) + 'px';
          d.style.top = (bossPt.y - 26 - i * 8) + 'px';
          d.style.fontSize = (34 + i * 7) + 'px';
          overlay.appendChild(d);
          totalEl.textContent = 'TỔNG SÁT THƯƠNG ' + cum;
          try { hpFill.style.width = Math.max(0, 100 - Math.round(cum / baseDmg * 100)) + '%'; } catch (e) {}
          // Rung màn hình: biên độ tăng dần theo đòn
          try {
            if (overlay.animate) {
              var a = 4 + i * 3;
              overlay.animate([
                { transform: 'translate(0,0)' },
                { transform: 'translate(' + (-a) + 'px,' + Math.round(a / 2) + 'px)' },
                { transform: 'translate(' + a + 'px,' + (-Math.round(a / 2)) + 'px)' },
                { transform: 'translate(0,0)' }
              ], { duration: 150 });
            }
          } catch (e) {}
          // Chớp sáng theo đòn
          try {
            if (flash.animate) flash.animate([{ opacity: 0.5 }, { opacity: 0 }], { duration: 170, easing: 'ease-out' });
          } catch (e) {}
          // Boss trúng đòn: giật + chớp
          try {
            if (card.animate) card.animate([
              { transform: 'scale(1.16) rotate(-5deg)', filter: 'brightness(2.3)' },
              { transform: 'scale(1)', filter: 'none' }
            ], { duration: 190 });
          } catch (e) {}
          try { if (window.GFX && typeof window.GFX.burst === 'function') window.GFX.burst(card, 14); } catch (e) {}
        }, tHit);
      });

      /* ----- SLOW-MO ~0,42s (mốc 1,28s) ----- */
      later(state, function () {
        overlay.dataset.slowmo = '1';
        overlay.classList.add('gfb-slow');
        var stag = document.createElement('div');
        stag.className = 'gfb-slowtag';
        stag.textContent = '⏱ SLOW-MOTION';
        overlay.appendChild(stag);
        state._slowtag = stag;
        try {
          if (card.animate) card.animate([
            { transform: 'scale(1)', filter: 'none' },
            { transform: 'translateY(30px) rotate(10deg) scale(.9)', filter: 'grayscale(.65) brightness(.72)' }
          ], { duration: 420, easing: 'ease-in', fill: 'forwards' });
          if (clone.animate) clone.animate([
            { transform: 'translate(0,0)' },
            { transform: 'translate(' + Math.round((bossPt.x - fromPt.x) * 0.55) + 'px,' + Math.round((bossPt.y - fromPt.y) * 0.55) + 'px) scale(1.12)' }
          ], { duration: 420, easing: 'ease-in', fill: 'forwards' });
        } catch (e) {}
      }, 1280);

      /* ----- Đòn cuối: NỔ LỚN + K.O.! (mốc 1,72s) ----- */
      later(state, function () {
        overlay.dataset.boom = '1';
        try { if (state._slowtag) state._slowtag.remove(); } catch (e) {}
        try { if (window.GFX && typeof window.GFX.burst === 'function') window.GFX.burst(card, 90); } catch (e) {}
        try { if (window.GFX && typeof window.GFX.confetti === 'function') window.GFX.confetti(120); } catch (e) {}
        // Chớp nổ vừa phải (đỉnh 0,5): đủ "nổ" nhưng không trắng xoá che
        // mất chữ K.O.! như cảnh báo của nhánh K đợt 3 về GFX.flash.
        try { if (flash.animate) flash.animate([{ opacity: 0.5 }, { opacity: 0 }], { duration: 320 }); } catch (e) {}
        var ring = document.createElement('div');
        ring.className = 'gfb-ring';
        ring.style.left = bossPt.x + 'px';
        ring.style.top = bossPt.y + 'px';
        overlay.appendChild(ring);
        try {
          if (card.animate) card.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(2.3) rotate(14deg)', opacity: 0 }
          ], { duration: 380, easing: 'ease-out', fill: 'forwards' });
        } catch (e) {}
        totalEl.classList.add('gfb-total-final');
        var ko = document.createElement('div');
        ko.className = 'gf-ko gfb-ko';
        ko.textContent = label;
        overlay.appendChild(ko);
      }, 1720);

      later(state, function () { finish(state); }, BOSS_TOTAL_MS);
      later(state, function () { finish(state); }, 3800); // failsafe
    } catch (e) {
      finish(state);
    }
    return promise;
  }

  window.GFIN = { play: play, playBoss: playBoss };
})();
