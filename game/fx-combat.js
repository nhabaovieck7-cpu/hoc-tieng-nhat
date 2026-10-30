/* =====================================================================
   fx-combat.js — Module hiệu ứng đối kháng cho Phòng nhóm / Đối kháng
   (Nhánh E). ĐỘC LẬP: không sửa phong-nhom.*, không đổi luật tính điểm
   hay kết thúc ván của phòng — hai thanh máu ở đây CHỈ là lớp hiển thị
   hiệu ứng (bắt đầu 100/100), dùng chung ngôn ngữ hiệu ứng với Đấu trùm
   (dau-kanji): phóng cận chiến + vệt chém + chớp/rung nhẹ + số sát
   thương bay lên + thanh máu chạy bằng transition.

   API:
     window.GCOMBAT = {
       mountVersus(containerEl, opts),   // dựng 2 thanh máu + 2 nhân vật
       hit(side, correct, dmg),          // side: 'me' | 'foe'
       reset(),                          // máu về đầy, xoá hiệu ứng thừa
       hp()                              // -> { me, foe }
     }

   Ngữ nghĩa hit() (dmg mặc định 10):
     hit('me',  true,  dmg) — MÌNH đánh trúng  -> Đối thủ -dmg, FX tại đối thủ
     hit('me',  false, dmg) — MÌNH bị đánh     -> Mình -dmg,    FX tại mình
     hit('foe', true,  dmg) — ĐỐI THỦ đánh trúng (góc nhìn đối thủ) -> Mình -dmg
     hit('foe', false, dmg) — ĐỐI THỦ bị đánh  -> Đối thủ -dmg
   Tức: người tung đòn = (side === 'me') === !!correct ? 'me' : 'foe'.

   opts của mountVersus (tất cả tuỳ chọn):
     { meName:'Mình', foeName:'Đối thủ', meEmoji:'🥷', foeEmoji:'👹',
       max:100, dmg:10 }
   Tiếng đòn: 'hit' qua GSFX sẵn có (kênh skill — chỉnh âm lượng/tắt
   được qua settings như mọi tiếng skill khác); thiếu GSFX thì im lặng.
   Tôn trọng prefers-reduced-motion: không phóng/rung/vệt chém, chỉ
   chớp tĩnh + số sát thương tĩnh + thanh máu đổi ngay (CSS tắt
   transition trong media query tương ứng ở fx-combat.css).
   Chỉ transform/opacity/filter; hiệu ứng ~0,6s, không khoá thao tác.
   ===================================================================== */
(function () {
  'use strict';

  var DEFAULT_DMG = 10;
  var state = {
    mounted: false,
    root: null,           // phần tử .gc-wrap đã dựng
    max: 100,
    me: 100, foe: 100,
    els: null             // {me:{...}, foe:{...}, fxLayer}
  };

  var mq = null;
  try { mq = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { mq = null; }
  function reduced() { return !!(mq && mq.matches); }

  /* Đo fps đơn giản (cùng cách với dau-kanji): < 30fps -> giảm hạt. */
  var lowFx = false, fxFrames = 0, fxTPrev = 0;
  (function fpsWatch(ts) {
    if (typeof window.requestAnimationFrame !== 'function') return;
    if (!fxTPrev) fxTPrev = ts || 0;
    fxFrames++;
    if (ts && ts - fxTPrev >= 1000) {
      var fps = fxFrames * 1000 / Math.max(1, ts - fxTPrev);
      lowFx = fps > 0 && fps < 30;
      fxFrames = 0; fxTPrev = ts;
    }
    window.requestAnimationFrame(fpsWatch);
  })(0);

  function sfxHit() {
    try {
      if (window.GSFX && typeof window.GSFX.play === 'function') window.GSFX.play('hit');
      else if (typeof window.sfx === 'function') window.sfx('hit');
    } catch (e) { /* âm thanh là phụ */ }
  }
  function burstAt(el) {
    if (reduced() || !el) return;
    try {
      if (window.GFX && typeof window.GFX.burst === 'function') window.GFX.burst(el, lowFx ? 8 : 20);
    } catch (e) { /* bỏ qua */ }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function sideHTML(key, name, emoji, alignRight) {
    return '<div class="gc-side gc-' + key + (alignRight ? ' gc-r' : '') + '" data-gc-side="' + key + '">' +
      '<div class="gc-head"><span class="gc-name">' + esc(name) + '</span>' +
      '<span class="gc-hpnum" data-gc-hpnum>' + state.max + '</span></div>' +
      '<div class="gc-bar' + (alignRight ? ' gc-r' : '') + '" data-gc-bar><i data-gc-fill></i></div>' +
      '<div class="gc-fig" data-gc-fig aria-hidden="true">' + esc(emoji) + '</div>' +
      '</div>';
  }

  function mountVersus(containerEl, opts) {
    if (!containerEl) return null;
    opts = opts || {};
    state.max = Math.max(1, parseInt(opts.max, 10) || 100);
    state.me = state.max; state.foe = state.max;
    state.defaultDmg = Math.max(1, parseInt(opts.dmg, 10) || DEFAULT_DMG);
    containerEl.innerHTML =
      '<div class="gc-wrap">' +
        sideHTML('me', opts.meName || 'Mình', opts.meEmoji || '🥷', false) +
        '<span class="gc-vs" aria-hidden="true">VS</span>' +
        sideHTML('foe', opts.foeName || 'Đối thủ', opts.foeEmoji || '👹', true) +
        '<div class="gc-fx" aria-hidden="true"></div>' +
      '</div>';
    state.root = containerEl.querySelector('.gc-wrap');
    state.els = {
      fxLayer: containerEl.querySelector('.gc-fx'),
      me: grabSide(containerEl, 'me'),
      foe: grabSide(containerEl, 'foe')
    };
    state.mounted = true;
    paint();
    return state.root;
  }
  function grabSide(root, key) {
    var side = root.querySelector('[data-gc-side="' + key + '"]');
    if (!side) return null;
    return {
      side: side,
      bar: side.querySelector('[data-gc-bar]'),
      fill: side.querySelector('[data-gc-fill]'),
      num: side.querySelector('[data-gc-hpnum]'),
      fig: side.querySelector('[data-gc-fig]')
    };
  }

  function paint() {
    if (!state.els) return;
    ['me', 'foe'].forEach(function (key) {
      var e = state.els[key]; if (!e) return;
      var pct = Math.max(0, state[key] / state.max * 100);
      if (e.fill) e.fill.style.width = pct + '%';
      if (e.num) e.num.textContent = String(Math.max(0, state[key]));
      if (e.bar) e.bar.classList.toggle('gc-low', pct <= 30);
    });
  }

  function dmgPop(targetKey, dealt) {
    var layer = state.els && state.els.fxLayer;
    var e = state.els && state.els[targetKey];
    if (!layer || !e || !e.fig || !state.root) return;
    try {
      var rr = state.root.getBoundingClientRect(), fr = e.fig.getBoundingClientRect();
      var d = document.createElement('div');
      d.className = 'gc-dmg';
      d.textContent = '-' + dealt;
      d.style.left = (fr.left - rr.left + fr.width / 2 - 16) + 'px';
      d.style.top = (fr.top - rr.top - 6) + 'px';
      layer.appendChild(d);
      setTimeout(function () { d.remove(); }, 1050);
    } catch (err) { /* bỏ qua */ }
  }
  function slashFx(targetKey, foeAttack) {
    var layer = state.els && state.els.fxLayer;
    var e = state.els && state.els[targetKey];
    if (!layer || !e || !e.fig || !state.root || reduced()) return;
    try {
      var rr = state.root.getBoundingClientRect(), fr = e.fig.getBoundingClientRect();
      var d = document.createElement('div');
      d.className = 'gc-slash' + (foeAttack ? ' foe' : '');
      d.style.left = (fr.left - rr.left + fr.width / 2 - 52) + 'px';
      d.style.top = (fr.top - rr.top + fr.height / 2 - 7) + 'px';
      layer.appendChild(d);
      if (d.animate) {
        d.animate([
          { opacity: 0, transform: 'rotate(-38deg) translate(-30px,20px) scaleX(.55)' },
          { opacity: 1, transform: 'rotate(-38deg) translate(0,0) scaleX(1)', offset: .35 },
          { opacity: 0, transform: 'rotate(-38deg) translate(34px,-22px) scaleX(1.12)' }
        ], { duration: 340, delay: 180, easing: 'ease-out', fill: 'backwards' });
      }
      setTimeout(function () { d.remove(); }, 620);
    } catch (err) { /* bỏ qua */ }
  }
  function flashTarget(e, tint) {
    if (!e || !e.fig || !e.fig.animate) return;
    var red = tint === 'red';
    var filt = red
      ? 'brightness(1.85) drop-shadow(0 0 14px rgba(239,75,91,.95)) saturate(1.7) hue-rotate(-30deg)'
      : 'brightness(2.25) drop-shadow(0 0 16px rgba(255,216,78,.95))';
    var amp = (reduced() || lowFx) ? 0 : 7;
    try {
      e.fig.animate([
        { transform: 'translate(0,0)', filter: 'none' },
        { transform: 'translate(' + amp + 'px,-3px)', filter: filt, offset: .3 },
        { transform: 'translate(' + (-amp) + 'px,2px)', filter: filt, offset: .55 },
        { transform: 'translate(0,0)', filter: 'none' }
      ], { duration: reduced() ? 260 : 480, easing: 'ease-out' });
    } catch (err) { /* bỏ qua */ }
  }
  function lunge(atkE, tgtE) {
    if (!atkE || !tgtE || !atkE.fig || !tgtE.fig || reduced()) return;
    try {
      var a = atkE.fig.getBoundingClientRect(), b = tgtE.fig.getBoundingClientRect();
      var dx = (b.left + b.width / 2) - (a.left + a.width / 2);
      var reach = dx * (lowFx ? 0.45 : 0.58);
      if (atkE.fig.animate) {
        atkE.fig.animate([
          { transform: 'translate(0,0)' },
          { transform: 'translate(' + (reach * 0.35) + 'px,-6px)', offset: .3 },
          { transform: 'translate(' + reach + 'px,-12px) scale(1.06)', offset: .48 },
          { transform: 'translate(' + (reach * 0.85) + 'px,-4px)', offset: .64 },
          { transform: 'translate(0,0)' }
        ], { duration: 600, easing: 'cubic-bezier(.3,.7,.3,1)' });
      }
    } catch (err) { /* bỏ qua */ }
  }

  /* hit(side, correct, dmg) -> { me, foe } sau đòn (tiện cho nơi gọi/test) */
  function hit(side, correct, dmg) {
    if (!state.mounted) return hp();
    var d = Math.max(0, parseInt(dmg, 10) || (dmg == null ? state.defaultDmg || DEFAULT_DMG : 0));
    var attacker = ((side === 'me') === !!correct) ? 'me' : 'foe';
    var victim = attacker === 'me' ? 'foe' : 'me';
    var before = state[victim];
    state[victim] = Math.max(0, state[victim] - d);
    var dealt = before - state[victim]; // delta thật sau clamp
    paint();
    if (dealt > 0 || d > 0) {
      // Việc I (đợt 3): nếu hệ trang bị GGEAR có mặt, đòn đánh dùng
      // GGEAR.attackFx(theo skill đang chọn) thay hiệu ứng mặc định;
      // GGEAR lỗi/thiếu -> rơi về hiệu ứng cũ nguyên vẹn ở dưới.
      var usedGear = false;
      try {
        if (window.GGEAR && typeof window.GGEAR.attackFx === 'function' &&
            state.els[attacker] && state.els[attacker].fig &&
            state.els[victim] && state.els[victim].fig) {
          var gp = window.GGEAR.attackFx(state.els[attacker].fig, state.els[victim].fig);
          if (gp && typeof gp.then === 'function') { usedGear = true; gp.catch(function () { /* bỏ qua */ }); }
        }
      } catch (e) { usedGear = false; }
      if (!usedGear) {
        setTimeout(sfxHit, reduced() ? 0 : 180);
        lunge(state.els[attacker], state.els[victim]);
        slashFx(victim, attacker === 'foe');
        flashTarget(state.els[victim], attacker === 'foe' ? 'red' : 'gold');
        burstAt(state.els[victim] && state.els[victim].fig);
      }
      dmgPop(victim, dealt);
    }
    return hp();
  }

  function reset() {
    state.me = state.max; state.foe = state.max;
    if (state.els && state.els.fxLayer) state.els.fxLayer.innerHTML = '';
    paint();
    return hp();
  }

  function hp() { return { me: state.me, foe: state.foe }; }

  window.GCOMBAT = { mountVersus: mountVersus, hit: hit, reset: reset, hp: hp };
})();
