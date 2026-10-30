/* =====================================================================
 * plus.js — Lớp dùng chung ĐỢT GAME-PLUS (window.GPLUS)
 *   1) Kho dữ liệu hn_game_v1 (mục x/v/u/t/c — xem THIET-KE.md §0.2):
 *      đọc/ghi bảo toàn w/d và mọi khoá lạ; ghi qua localStorage.setItem
 *      để hook HNSYNC của auth.js tự đồng bộ (không cần sửa Worker).
 *   2) GPLUS_TRACK(q, ok): ghi câu sai khi chơi (móc 1 dòng ở phễu chấm).
 *   3) Tài nguyên làng: bọc GAME_API.submitScore -> quy đổi gỗ/đá/xu.
 *   4) Bộ kỹ năng tiện ích trước trận: chọn <=3, HUD trong trận, móc
 *      hiệu ứng qua handler do từng chế độ đăng ký (đóng băng/gợi ý),
 *      onAnswer (khiên), scoreMul (x2), tryRevive (hồi sinh).
 * Mọi hàm đều có guard: thiếu GQ/GLEVEL/GAME_API vẫn không ném lỗi.
 * ===================================================================== */
(function () {
  'use strict';
  if (window.GPLUS) return;

  var KEY = 'hn_game_v1';
  var WRONG_CAP = 120;

  /* ---------------- Kho hn_game_v1 ---------------- */
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      var o = raw ? JSON.parse(raw) : null;
      return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
    } catch (e) { return {}; }
  }
  function save(o) {
    try { localStorage.setItem(KEY, JSON.stringify(o)); return true; }
    catch (e) { return false; }
  }
  function section(name, def) {
    var o = load();
    return (o[name] && typeof o[name] === 'object') ? o[name] : (def || {});
  }
  function putSection(name, val) {
    var o = load();
    o[name] = val;
    return save(o);
  }
  function todayLocal() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  /* ---------------- 1) Ghi câu sai ---------------- */
  function track(q, ok) {
    try {
      if (!q || !q.id) return;
      var o = load();
      var x = (o.x && typeof o.x === 'object') ? o.x : {};
      var e = x[q.id];
      if (ok) {
        if (e && (e.done || 0) < (e.n || 0)) {
          e.done = (e.done || 0) + 1;
          e.last = Date.now();
          o.x = x; save(o);
        }
        return;
      }
      if (!e) {
        e = x[q.id] = {
          l: q.lesson || '', lv: q.level || '', t: q.type || '',
          p: String(q.prompt || '').slice(0, 80),
          a: String(q.answerText || '').slice(0, 60),
          n: 0, done: 0, last: 0
        };
      }
      e.n = (e.n || 0) + 1;
      e.done = 0;
      e.last = Date.now();
      // Trần: xoá mục đã xử lý cũ nhất, rồi tới mục cũ nhất nói chung
      var ids = Object.keys(x);
      if (ids.length > WRONG_CAP) {
        ids.sort(function (a, b) {
          var ea = x[a], eb = x[b];
          var da = (ea.done || 0) >= (ea.n || 0) ? 0 : 1;
          var db = (eb.done || 0) >= (eb.n || 0) ? 0 : 1;
          return (da - db) || ((ea.last || 0) - (eb.last || 0));
        });
        while (ids.length > WRONG_CAP) { delete x[ids.shift()]; }
      }
      o.x = x; save(o);
    } catch (err) { /* ghi câu sai không bao giờ được làm gãy ván chơi */ }
  }
  window.GPLUS_TRACK = track;

  /* ---------------- 2) Tài nguyên làng ---------------- */
  var RES_DAY_CAP = { go: 300, da: 150, xu: 120 };
  var BOSS_MODES = { 'chien-dich': 1, 'dau-kanji': 1, 'trum-sai-lam': 1, 'raid': 1, 'boss': 1 };
  var lastAwardSig = '';
  var lastAwardAt = 0;

  /* Toast tài nguyên: div.gplus-toast cố định trên cùng giữa màn hình,
     pointer-events:none (CSS ở plus.css), tự ẩn sau 2,6s bằng WAAPI —
     không che khu câu hỏi/đáp án ở giữa trang. */
  var resToastTimer = null;
  function showResToast(gain) {
    try {
      if (!gain || !(gain.go || gain.da || gain.xu)) return;
      if (typeof document === 'undefined' || !document.body) return;
      var parts = [];
      if (gain.go) parts.push('🪵 +' + gain.go);
      if (gain.da) parts.push('🪨 +' + gain.da);
      if (gain.xu) parts.push('🪙 +' + gain.xu);
      var el = document.querySelector('.gplus-toast');
      if (!el) {
        el = document.createElement('div');
        el.className = 'gplus-toast';
        el.setAttribute('aria-hidden', 'true');
        document.body.appendChild(el);
      }
      el.textContent = 'Nhận tài nguyên làng: ' + parts.join(' · ');
      el.style.display = '';
      if (resToastTimer) { clearTimeout(resToastTimer); resToastTimer = null; }
      if (el.animate) {
        try { el.getAnimations().forEach(function (a) { a.cancel(); }); } catch (e) {}
        el.animate([
          { opacity: 0, transform: 'translate(-50%,-10px)' },
          { opacity: 1, transform: 'translate(-50%,0)' }
        ], { duration: 240, easing: 'ease-out', fill: 'forwards' });
      } else { el.style.opacity = '1'; }
      resToastTimer = setTimeout(function () {
        resToastTimer = null;
        if (el.animate) {
          var anim = el.animate([
            { opacity: 1, transform: 'translate(-50%,0)' },
            { opacity: 0, transform: 'translate(-50%,-8px)' }
          ], { duration: 280, easing: 'ease-in', fill: 'forwards' });
          if (anim && anim.finished) anim.finished.then(function () { el.style.display = 'none'; }).catch(function () { el.style.display = 'none'; });
          else el.style.display = 'none';
        } else { el.style.display = 'none'; }
      }, 2600);
    } catch (e) { /* toast không bao giờ được làm gãy ván chơi */ }
  }
  function balance() {
    var v = section('v', {});
    var e = v.e || {}, s = v.s || {};
    return {
      go: Math.max(0, (e.go || 0) - (s.go || 0)),
      da: Math.max(0, (e.da || 0) - (s.da || 0)),
      xu: Math.max(0, (e.xu || 0) - (s.xu || 0))
    };
  }
  function awardForScore(sub) {
    try {
      if (!sub || typeof sub.score !== 'number' || sub.score <= 0) return null;
      var sig = String(sub.mode || '') + '|' + sub.score + '|' + (sub.durationMs || 0);
      var now = Date.now();
      if (sig === lastAwardSig && now - lastAwardAt < 120000) return null;
      lastAwardSig = sig; lastAwardAt = now;
      var gain = {
        go: Math.ceil(sub.score / 50),
        da: Math.ceil(sub.score / 120),
        xu: Math.ceil(sub.score / 200) + (BOSS_MODES[sub.mode] ? 5 : 0)
      };
      var o = load();
      var v = (o.v && typeof o.v === 'object') ? o.v : {};
      v.e = v.e || { go: 0, da: 0, xu: 0 };
      v.s = v.s || { go: 0, da: 0, xu: 0 };
      v.b = v.b || {};
      var td = todayLocal();
      if (!v.day || v.day.d !== td) v.day = { d: td, go: 0, da: 0, xu: 0 };
      ['go', 'da', 'xu'].forEach(function (k) {
        var room = Math.max(0, RES_DAY_CAP[k] - (v.day[k] || 0));
        var add = Math.min(gain[k], room);
        v.e[k] = (v.e[k] || 0) + add;
        v.day[k] = (v.day[k] || 0) + add;
        gain[k] = add;
      });
      v._t = now;
      o.v = v; save(o);
      if (gain.go || gain.da || gain.xu) showResToast(gain);
      return gain;
    } catch (e) { return null; }
  }
  function wrapSubmitScore() {
    try {
      if (!window.GAME_API || !GAME_API.submitScore || GAME_API.submitScore.__plusWrapped) return;
      var orig = GAME_API.submitScore;
      var wrapped = function (s) {
        var gain = awardForScore(s);
        if (gain && (gain.go || gain.da || gain.xu)) {
          try { document.dispatchEvent(new CustomEvent('gplus:res', { detail: gain })); } catch (e) {}
        }
        return orig.apply(this, arguments);
      };
      wrapped.__plusWrapped = true;
      GAME_API.submitScore = wrapped;
    } catch (e) {}
  }

  /* ---------------- 3) Bộ kỹ năng tiện ích ---------------- */
  var SKILLS = [
    { id: 'goi-y',     icon: '🎯', name: 'Gợi ý',      desc: 'Loại 1 đáp án sai của câu hiện tại', uses: 2, req: 1, kind: 'active' },
    { id: 'dong-bang', icon: '🧊', name: 'Đóng băng giờ', desc: 'Đông cứng đồng hồ câu hiện tại 5 giây', uses: 1, req: 2, kind: 'active' },
    { id: 'khien',     icon: '🛡️', name: 'Khiên streak', desc: '1 câu sai không mất chuỗi đúng (tự đỡ)', uses: 1, req: 3, kind: 'passive' },
    { id: 'x2',        icon: '🔥', name: 'Bội combo',  desc: '10 giây: điểm nhận được ×2', uses: 1, req: 4, kind: 'active' },
    { id: 'hoi-sinh',  icon: '❤️‍🩹', name: 'Hồi sinh',  desc: 'Sắp thua thì sống lại 1 lần, làm lại câu hiện tại', uses: 1, req: 5, kind: 'passive' }
  ];
  function skillDef(id) { for (var i = 0; i < SKILLS.length; i++) if (SKILLS[i].id === id) return SKILLS[i]; return null; }
  function myLevel() {
    // Trang chế độ KHÔNG nạp level.js (chỉ hub + nhan-vat có GLEVEL);
    // GGEAR.info() tự tính sẵn level từ sao/thắng trùm — dùng nó khi
    // thiếu GLEVEL để bộ kỹ năng mở khoá đúng ở mọi trang.
    try { if (window.GLEVEL && typeof GLEVEL.level === 'function') return GLEVEL.level() || 1; } catch (e) {}
    try {
      if (window.GGEAR && typeof GGEAR.info === 'function') {
        var inf = GGEAR.info();
        if (inf && typeof inf.level === 'number' && inf.level >= 1) return inf.level;
      }
    } catch (e) {}
    return 1;
  }
  function skillUnlocked(def) { return myLevel() >= (def ? def.req : 99); }
  function loadout() {
    var u = section('u', {});
    var sel = Array.isArray(u.sel) ? u.sel.filter(function (id) { return !!skillDef(id); }) : [];
    return sel.slice(0, 3);
  }
  function setLoadout(sel) {
    var clean = (sel || []).filter(function (id, i, a) {
      var d = skillDef(id);
      return d && skillUnlocked(d) && a.indexOf(id) === i;
    }).slice(0, 3);
    putSection('u', { sel: clean, _t: Date.now() });
    return clean;
  }

  /* Trạng thái trong trận */
  var match = null; // {sel, uses:{id:remaining}, x2Until, active}
  var freezeHandler = null, hintHandler = null;
  function beginMatch() {
    var sel = loadout();
    var uses = {};
    sel.forEach(function (id) { uses[id] = skillDef(id).uses; });
    match = { sel: sel, uses: uses, x2Until: 0, active: true };
    renderHud();
    return match;
  }
  function endMatch() { if (match) match.active = false; renderHud(); }
  function inMatch(id) { return !!(match && match.active && match.uses[id] > 0); }

  function scoreMul() {
    return (match && match.active && match.x2Until > Date.now()) ? 2 : 1;
  }
  function onAnswer(ok) {
    // Khiên streak: nuốt đúng 1 lần sai. Trả {shieldUsed}
    if (!ok && inMatch('khien')) {
      match.uses.khien--;
      renderHud();
      return { shieldUsed: true };
    }
    return { shieldUsed: false };
  }
  function tryRevive() {
    if (inMatch('hoi-sinh')) { match.uses['hoi-sinh']--; renderHud(); return true; }
    return false;
  }
  function useActive(id) {
    if (!inMatch(id)) return false;
    if (id === 'dong-bang') {
      if (!freezeHandler) return false;
      if (!freezeHandler()) return false;
    } else if (id === 'goi-y') {
      if (!hintHandler) return false;
      if (!hintHandler()) return false;
    } else if (id === 'x2') {
      match.x2Until = Date.now() + 10000;
    } else {
      return false;
    }
    match.uses[id]--;
    renderHud();
    return true;
  }

  /* HUD + bộ chọn trước trận */
  var hudHost = null;
  function setHudHost(el) { hudHost = el; renderHud(); }
  function renderHud() {
    if (!hudHost) return;
    if (!match || !match.active || !match.sel.length) { hudHost.innerHTML = ''; return; }
    hudHost.innerHTML = match.sel.map(function (id) {
      var d = skillDef(id);
      var left = match.uses[id] || 0;
      var dis = left <= 0 || (d.kind === 'active' && id === 'dong-bang' && !freezeHandler) || (d.kind === 'active' && id === 'goi-y' && !hintHandler);
      return '<button type="button" class="gplus-skill' + (left <= 0 ? ' used' : '') + '" data-skill="' + id + '"' +
        (d.kind === 'active' && !dis ? '' : ' disabled') + ' title="' + d.name + ' — ' + d.desc + '">' +
        d.icon + ' ' + d.name + ' <span class="gplus-uses">×' + left + '</span></button>';
    }).join('');
    Array.prototype.forEach.call(hudHost.querySelectorAll('[data-skill]'), function (b) {
      b.addEventListener('click', function () { useActive(b.getAttribute('data-skill')); });
    });
  }
  function mountLoadout(el, opts) {
    if (!el) return;
    opts = opts || {};
    var sel = loadout();
    function draw() {
      el.innerHTML = '<div class="gplus-loadout"><div class="gplus-loadout-t">🎒 Kỹ năng mang theo <span>(chọn tối đa 3 · cấp hiện tại: ' + myLevel() + ')</span></div>' +
        '<div class="gplus-loadout-row">' + SKILLS.map(function (d) {
          var un = skillUnlocked(d);
          var on = sel.indexOf(d.id) >= 0;
          return '<button type="button" class="gplus-pick' + (on ? ' on' : '') + '" data-pick="' + d.id + '"' + (un ? '' : ' disabled') + '>' +
            d.icon + ' ' + d.name + '<small>' + (un ? d.desc + ' · ×' + d.uses + '/trận' : 'Mở ở cấp ' + d.req) + '</small></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(el.querySelectorAll('[data-pick]'), function (b) {
        b.addEventListener('click', function () {
          var id = b.getAttribute('data-pick');
          var i = sel.indexOf(id);
          if (i >= 0) sel.splice(i, 1);
          else { if (sel.length >= 3) sel.shift(); sel.push(id); }
          sel = setLoadout(sel);
          draw();
          if (typeof opts.onChange === 'function') opts.onChange(sel);
        });
      });
    }
    draw();
  }

  /* ---------------- Phơi API ---------------- */
  window.GPLUS = {
    load: load, save: save, section: section, putSection: putSection,
    track: track,
    balance: balance, awardForScore: awardForScore,
    SKILLS: SKILLS, skillDef: skillDef, skillUnlocked: skillUnlocked, myLevel: myLevel,
    loadout: loadout, setLoadout: setLoadout,
    beginMatch: beginMatch, endMatch: endMatch,
    setFreezeHandler: function (fn) { freezeHandler = fn; renderHud(); },
    setHintHandler: function (fn) { hintHandler = fn; renderHud(); },
    setHudHost: setHudHost, renderHud: renderHud,
    mountLoadout: mountLoadout,
    onAnswer: onAnswer, tryRevive: tryRevive, useActive: useActive, scoreMul: scoreMul
  };

  // Bọc submitScore ngay khi GAME_API sẵn sàng (nạp sau game-api.js).
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wrapSubmitScore);
  else wrapSubmitScore();
})();
