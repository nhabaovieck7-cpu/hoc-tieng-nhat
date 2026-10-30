/* dau-kanji.js — Nhánh 3: Đấu trùm (đối đầu trùm theo vùng).
   Câu hỏi CHỈ qua window.GQ (hook an toàn); hiệu ứng qua GFX, âm skill qua GSFX
   (chỉ âm thanh, không hô tên skill), câu trend qua GTREND, nhạc nền GMUSIC 'boss',
   điểm nộp qua GAME_API.submitScore. Không nhúng nội dung khóa học. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var DIFF = { de: { n: 'Dễ', s: 20, x: 1 }, tb: { n: 'Trung bình', s: 12, x: 1 }, kho: { n: 'Khó', s: 6, x: 2 } };
  /* 5 trùm theo 5 vùng của cốt truyện (như bản mẫu/hub) */
  var BOSSES = [
    { lv: 'N5', zone: 'Làng Sakura', boss: 'Oni Đỏ', be: '👹', c: '#ff7eb6', hp: 90 },
    { lv: 'N4', zone: 'Rừng Tre Ma', boss: 'Kappa Láu Cá', be: '🐸', c: '#2fbf71', hp: 100 },
    { lv: 'N3', zone: 'Lâu đài Mây', boss: 'Tengu Mũi Dài', be: '👺', c: '#22d3ee', hp: 110 },
    { lv: 'N2', zone: 'Núi Lửa Fuji', boss: 'Rồng Lửa Ryūjin', be: '🐉', c: '#ff7a45', hp: 120 },
    { lv: 'N1', zone: 'Kinh thành Edo', boss: 'Shogun Bóng Tối', be: '🥷', c: '#7c5cff', hp: 130 }
  ];
  var SKILLS = ['beam', 'thunder', 'shuriken', 'gun', 'fire'];

  /* ---------- Việc J: dàn boss GBOSS (bosses.js) ----------
     curBoss = boss đang chọn (GBOSS object). Nếu bosses.js thiếu, rơi về
     5 boss gốc BOSSES ở trên (chuẩn hoá sang cùng dạng). Máu trùm:
       hpBMax = round(hpGocTheoCap[lv của boss] * boss.hpMul)
     hpGocTheoCap lấy từ 5 boss gốc: N5:90 N4:100 N3:110 N2:120 N1:130.
     Nhịp câu: file CÓ hệ số thời gian (DIFF[].s giây/câu) nên áp spdMul
     theo nghĩa tốc độ: giây/câu hiệu dụng = DIFF.s / boss.spdMul
     (boss nhanh spdMul>1 -> ít giờ hơn; boss chậm -> nhiều giờ hơn). */
  var ORIG_IDS = ['oni-do', 'kappa', 'tengu', 'ryujin', 'shogun'];
  var curBoss = null;
  function baseHpFor(lv) {
    if (window.GBOSS && typeof GBOSS.baseHp === 'function') return GBOSS.baseHp(lv);
    for (var i = 0; i < BOSSES.length; i++) if (BOSSES[i].lv === lv) return BOSSES[i].hp;
    return 100;
  }
  function effHpOf(b) { return Math.round(baseHpFor(b.lv) * (b.hpMul || 1)); }
  function qSeconds() { var b = bossNow(); return DIFF[st.diff].s / ((b && b.spdMul) || 1); }
  function normOrig(i) {
    var b = BOSSES[i];
    return { id: ORIG_IDS[i], name: b.boss, emoji: b.be, sub: '', color: b.c, theme: b.zone, zone: b.zone, line: '', lv: b.lv, tier: i + 1, hpMul: 1, spdMul: 1 };
  }
  function bossNow() {
    if (curBoss) return curBoss;
    if (window.GBOSS && typeof GBOSS.next === 'function') { curBoss = GBOSS.next(); return curBoss; }
    return normOrig(st.boss);
  }
  function setBoss(b, manual) {
    if (!b) return;
    curBoss = b;
    var ix = ORIG_IDS.indexOf(b.id); if (ix >= 0) st.boss = ix;
    if (manual && window.GBOSS && typeof GBOSS.removeFromBag === 'function') {
      try { GBOSS.removeFromBag(b.id); } catch (e) {}
    }
  }
  function changeBoss() {
    if (window.GBOSS && typeof GBOSS.next === 'function') setBoss(GBOSS.next(), false);
    else { st.boss = (st.boss + 1) % BOSSES.length; curBoss = normOrig(st.boss); }
  }

  /* ---------- Hook an toàn tới các nhánh khác ---------- */
  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function syncUser(u) { if (u) for (var k in u) user[k] = u[k]; return user; }
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(syncUser).catch(function () { return user; });
  }
  /* Tên có thể resolve SAU khi menu đã vẽ (game.js phát sự kiện
     'hn-game-user', detail = GAME_USER_DATA, mỗi khi resolve/refresh xong):
     đồng bộ lại bản local rồi vẽ lại phần đang hiện có dùng tên — menu khi
     đang ở menu, tên người chơi trong arena, màn kết quả khi đang hiện.
     Đăng ký đúng 1 lần, vẽ lại idempotent, không đổi logic chơi/điểm. */
  var userEvtBound = false;
  function bindUserEvent() {
    if (userEvtBound) return; userEvtBound = true;
    window.addEventListener('hn-game-user', function (ev) {
      syncUser((ev && ev.detail) || window.GAME_USER_DATA);
      refreshNameUI();
    });
  }
  function refreshNameUI() {
    var menu = $('#menu'), res = $('#result'), pn = $('#pName');
    if (pn) pn.textContent = '🧑 ' + (user.name || 'Người chơi');
    paintPlayerPlate();
    if (menu && !menu.classList.contains('mx-hid') && menu.innerHTML) buildMenu();
    else if (res && !res.classList.contains('mx-hid') && res.innerHTML) renderResult();
  }
  function callName() {
    if (!user.loggedIn) return 'bạn';
    if (user.call && user.name && user.call !== user.name) return user.call + ' ' + user.name;
    return user.name || user.call || 'bạn';
  }
  function trend(m) { try { if (window.GTREND && typeof GTREND.say === 'function') GTREND.say(m); } catch (e) {} }
  function music(scene) { try { if (window.GMUSIC && typeof GMUSIC.play === 'function') GMUSIC.play(scene); } catch (e) {} }
  function sfx(n) { try {
    if (typeof window.GSFX === 'function') GSFX(n);
    else if (window.GSFX && typeof GSFX.play === 'function') GSFX.play(n);
    else if (typeof window.sfx === 'function') window.sfx(n);
  } catch (e) {} }
  function fx(name, arg) { try { if (window.GFX && typeof GFX[name] === 'function') GFX[name](arg); } catch (e) {} }
  function submitScore(score, t0) { try {
    if (window.GAME_API && typeof GAME_API.submitScore === 'function') {
      var r = GAME_API.submitScore({ mode: 'dau-kanji', level: st.lv, score: Math.round(score), durationMs: Date.now() - t0 });
      if (r && r.catch) r.catch(function () {});
    }
  } catch (e) {} }
  function fetchQ(count) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: 'kanji', count: count });
  }
  function usable(qs) { return (qs || []).filter(function (q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }

  /* ---------- Trạng thái ---------- */
  var st = { boss: 3, diff: 'tb' };
  Object.defineProperty(st, 'lv', { get: function () { return bossNow().lv; } });
  var hpP = 100, hpB = 100, hpBMax = 100, round = 0, okCount = 0, streak = 0, best = 0, score = 0,
      lock = false, pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0;

  /* ---------- Menu ---------- */
  function segHTML(items, cur, attr) {
    return '<div class="mx-seg" data-seg="' + attr + '">' + items.map(function (it) {
      return '<button type="button" data-v="' + esc(it.v) + '" class="' + (it.v === cur ? 'on' : '') + '">' + esc(it.n) + (it.sub ? '<small>' + esc(it.sub) + '</small>' : '') + '</button>';
    }).join('') + '</div>';
  }
  function bindSeg(root, attr, cb) {
    $$('[data-seg="' + attr + '"] button', root).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-seg="' + attr + '"] button', root).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); cb(b.getAttribute('data-v'));
      });
    });
  }
  function buildMenu() {
    var m = $('#menu');
    var B = bossNow();
    /* Khối "Trùm sắp đấu": boss từ GBOSS.next() (đã chốt vào curBoss ở lần
       vẽ đầu; vẽ lại menu KHÔNG gọi next() lần nữa nên không nhảy boss).
       Nút Đổi trùm mới gọi next() tiếp theo. */
    var nextHTML =
      '<div class="gb-next" id="gbNext" data-boss-id="' + esc(B.id) + '" style="--gb-c:' + esc(B.color) + '">' +
      '<div class="gb-next-emoji">' + B.emoji + (B.sub ? '<small>' + B.sub + '</small>' : '') + '</div>' +
      '<div class="gb-next-info"><b>' + esc(B.name) + '</b>' +
      '<div class="gb-meta">' + esc(B.lv) + ' · ' + esc(B.theme || B.zone || '') + ' · <span class="gb-tier">Tier ' + B.tier + '</span> · ❤️ ' + effHpOf(B) + ' máu</div>' +
      (B.line ? '<div class="gb-line">“' + esc(B.line) + '”</div>' : '') +
      '<button type="button" class="gb-change" id="btnChangeBoss">🔀 Đổi trùm khác</button></div></div>';
    /* Lưới roster toàn bộ boss: bấm chọn tay được; chọn tay thì loại boss
       đó khỏi túi phiên hiện tại (GBOSS.removeFromBag theo contract). */
    var roster = (window.GBOSS && GBOSS.ALL ? GBOSS.ALL : BOSSES.map(function (_, i) { return normOrig(i); }));
    var rosterHTML = '<div class="gb-roster" id="gbRoster">' + roster.map(function (b) {
      return '<button type="button" class="gb-card' + (b.id === B.id ? ' on' : '') + '" data-boss-id="' + esc(b.id) + '" style="--gb-c:' + esc(b.color) + '">' +
        '<span class="gb-emoji">' + b.emoji + (b.sub ? ' <small>' + b.sub + '</small>' : '') + '</span><b>' + esc(b.name) + '</b>' +
        '<small>' + esc(b.lv) + ' · Tier ' + b.tier + '<br><span class="gb-hp">❤️ ' + effHpOf(b) + '</span> · ' + esc(b.theme || '') + '</small></button>';
    }).join('') + '</div>';
    m.innerHTML =
      '<div class="mx-card"><div class="mx-big-emoji">⚔️</div>' +
      '<h1>Đấu trùm</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Trả lời đúng và nhanh để tung đòn; combo 5 trở lên sẽ mở tuyệt chiêu ULTRA. Sai hoặc hết giờ thì trùm phản đòn đấy.</p>' +
      '<h2>Trùm sắp đấu</h2>' + nextHTML +
      '<h2>Tất cả trùm (chạm để chọn tay)</h2>' + rosterHTML +
      '<h2>Độ khó</h2>' + segHTML(Object.keys(DIFF).map(function (k) { return { v: k, n: DIFF[k].n, sub: DIFF[k].s + 's/câu' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') }; }), st.diff, 'diff') +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Vào trận ▶</button>' +
      '<p class="mx-mut" style="text-align:center;margin-top:10px">Câu hỏi kanji lấy từ bài học thật của trang, hiện ngay khi chơi.</p></div>';
    var chg = $('#btnChangeBoss');
    if (chg) chg.addEventListener('click', function () { changeBoss(); sfx('click'); buildMenu(); });
    $$('.gb-card', m).forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-boss-id');
        var picked = (window.GBOSS && typeof GBOSS.get === 'function') ? GBOSS.get(id) : null;
        if (!picked) { var ix = ORIG_IDS.indexOf(id); picked = ix >= 0 ? normOrig(ix) : null; }
        if (picked) { setBoss(picked, true); sfx('click'); buildMenu(); }
      });
    });
    bindSeg(m, 'diff', function (v) { st.diff = v; });
    $('#btnGo').addEventListener('click', start);
  }

  /* ---------- Chơi ---------- */
  function setHp() {
    // Đợt 7: thanh máu bằng transform scaleX (compositor) thay width
    // (layout) — modes.css .bk-hp i đã cố định width:100% + origin theo phía.
    $('#hpP').style.transform = 'scaleX(' + (Math.max(0, hpP) / 100) + ')';
    $('#hpB').style.transform = 'scaleX(' + Math.max(0, hpB / hpBMax) + ')';
    $('#hpBoxP').classList.toggle('low', hpP <= 30);
    $('#hpBoxB').classList.toggle('low', hpB / hpBMax <= 0.3);
    $('#scorePill').textContent = '⭐ ' + score;
    $('#comboBox').textContent = streak >= 2 ? '🔥 Combo x' + streak + (streak >= 5 ? ' — ULTRA sẵn sàng!' : '') : '';
    var say = $('#gbSay'); if (say) say.classList.toggle('gb-low', hpB > 0 && hpB / hpBMax <= 0.3);
  }
  function dmgPop(el, txt) {
    var ar = $('#arena'), d = document.createElement('div');
    d.className = 'bk-dmg'; d.textContent = txt;
    d.style.left = (el.offsetLeft + 10) + 'px'; d.style.top = '16px';
    ar.appendChild(d); setTimeout(function () { d.remove(); }, 1000);
  }

  /* ---------- Hiệu ứng đối kháng (Nhánh E) ----------
     Cơ chế đòn DUY NHẤT, nhất quán: CHÉM CẬN CHIẾN — nhân vật tấn công
     nhảy/phóng về phía đối thủ (transform), vệt chém .bk-slash xuất hiện
     tại thời điểm chạm, đối thủ chớp sáng + rung nhẹ, hạt GFX.burst (khi
     nhánh gọi yêu cầu), tiếng "hit" qua kênh GSFX/settings sẵn có.
     Chỉ transform/opacity/filter; tổng ~0,6–0,7s, chạy bằng WAAPI nên
     KHÔNG chặn nhịp reveal/next sẵn có (950/1150ms giữ nguyên).
     Tôn trọng prefers-reduced-motion (chỉ chớp tĩnh, không phóng/rung)
     và tự giảm hạt biên độ rung khi fps đo được < 30 (lowFx). */
  var mqReduced = null;
  try { mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { mqReduced = null; }
  function reducedMotion() { return !!(mqReduced && mqReduced.matches); }
  /* Đợt 7 (nhánh Q): BỎ vòng fpsWatch rAF riêng chạy vĩnh viễn (bản cũ là
     vòng rAF thứ hai song song với charanim trên cùng trang). Đọc chất
     lượng CHUNG từ bộ đo FPS duy nhất (charanim.js) qua __GPERF/GCANIM:
     khác 'full' -> giảm hạt/biên độ như ngưỡng fps<30 cũ. */
  function lowFx() {
    try {
      if (window.__GPERF && window.__GPERF.tier) return window.__GPERF.tier !== 'full';
      if (window.GCANIM && typeof window.GCANIM.quality === 'function') return window.GCANIM.quality() !== 'full';
    } catch (e) { /* bỏ qua */ }
    return false;
  }
  function slashFx(target, foe) {
    var ar = $('#arena'); if (!ar || !target) return;
    try {
      var arr = ar.getBoundingClientRect(), tr = target.getBoundingClientRect();
      var d = document.createElement('div');
      d.className = 'bk-slash' + (foe ? ' foe' : '');
      d.setAttribute('aria-hidden', 'true');
      d.style.left = (tr.left - arr.left + tr.width / 2 - 52) + 'px';
      d.style.top = (tr.top - arr.top + tr.height / 2 - 7) + 'px';
      ar.appendChild(d);
      if (d.animate) {
        d.animate([
          { opacity: 0, transform: 'rotate(-38deg) translate(-30px,20px) scaleX(.55)' },
          { opacity: 1, transform: 'rotate(-38deg) translate(0,0) scaleX(1)', offset: .35 },
          { opacity: 0, transform: 'rotate(-38deg) translate(34px,-22px) scaleX(1.12)' }
        ], { duration: 340, delay: 180, easing: 'ease-out', fill: 'backwards' });
      }
      setTimeout(function () { d.remove(); }, 620);
    } catch (e) { /* hiệu ứng phụ, lỗi thì thôi */ }
  }
  function flashTarget(tgt, tint, reduced) {
    if (!tgt || !tgt.animate) return;
    var filt = tint === 'red'
      ? 'brightness(1.85) drop-shadow(0 0 14px rgba(239,75,91,.95)) saturate(1.7) hue-rotate(-30deg)'
      : 'brightness(2.25) drop-shadow(0 0 16px rgba(255,216,78,.95))';
    var amp = (reduced || lowFx()) ? 0 : 7;
    try {
      tgt.animate([
        { transform: 'translate(0,0)', filter: 'none' },
        { transform: 'translate(' + amp + 'px,-3px)', filter: filt, offset: .3 },
        { transform: 'translate(' + (-amp) + 'px,2px)', filter: filt, offset: .55 },
        { transform: 'translate(0,0)', filter: 'none' }
      ], { duration: reduced ? 260 : 480, easing: 'ease-out' });
    } catch (e) { /* bỏ qua */ }
  }
  /* combatHit(attackerEl, targetEl, {ultra, tint:'gold'|'red', particles})
     Số sát thương bay lên + thanh máu do nơi gọi xử lý bằng ĐÚNG delta HP
     thật (đã clamp) — hàm này chỉ lo hình/tiếng của đòn đánh. */
  function combatHit(atk, tgt, opts) {
    opts = opts || {};
    if (!atk || !tgt) return;
    var reduced = reducedMotion();
    // Tiếng đòn chạm: 'hit' sẵn có trong GSFX (kênh skill, chỉnh âm/tắt
    // được qua settings như mọi tiếng khác); phát trễ tới lúc chạm đòn.
    setTimeout(function () { sfx('hit'); }, reduced ? 0 : 180);
    flashTarget(tgt, opts.tint, reduced);
    if (reduced) return;
    try {
      var a = atk.getBoundingClientRect(), b = tgt.getBoundingClientRect();
      var dx = (b.left + b.width / 2) - (a.left + a.width / 2);
      var reach = dx * (lowFx() ? 0.45 : 0.58);
      if (atk.animate) {
        atk.animate([
          { transform: 'translate(0,0)' },
          { transform: 'translate(' + (reach * 0.35) + 'px,-6px)', offset: .3 },
          { transform: 'translate(' + reach + 'px,-12px) scale(1.06)', offset: .48 },
          { transform: 'translate(' + (reach * 0.85) + 'px,-4px)', offset: .64 },
          { transform: 'translate(0,0)' }
        ], { duration: opts.ultra ? 700 : 600, easing: 'cubic-bezier(.3,.7,.3,1)' });
      }
    } catch (e) { /* bỏ qua */ }
    slashFx(tgt, opts.tint === 'red');
    if (opts.particles && window.GFX && typeof GFX.burst === 'function') {
      try { GFX.burst(tgt, lowFx() ? 8 : 20); } catch (e) { /* bỏ qua */ }
    }
  }
  function startTimer(sec, onTimeout) {
    stopTimer(); limMs = sec * 1000; t0 = Date.now();
    timer = setInterval(function () {
      var left = limMs - (Date.now() - t0);
      // Đợt 7: thanh giờ bằng transform scaleX thay width (tick 50ms
      // không còn ép layout mỗi nhịp) — modes.css .mx-timer i origin trái.
      $('#tBar').style.transform = 'scaleX(' + Math.max(0, left / limMs) + ')';
      $('#tTxt').textContent = (Math.max(0, left) / 1000).toFixed(1) + 's';
      if (left <= 0) { stopTimer(); onTimeout(); }
    }, 50);
  }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; }
  function speedFrac() { return Math.max(0, Math.min(1, (limMs - (Date.now() - t0)) / limMs)); }

  function showError(msg) {
    stopTimer();
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-err"><div class="mx-big-emoji">🌧️</div><h1>Chưa lấy được câu hỏi</h1>' +
      '<p class="mx-mut">' + esc(msg) + '</p><div style="height:12px"></div>' +
      '<button class="mx-btn" id="btnRetry" type="button">Thử lại</button>' +
      '<div style="height:8px"></div><a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnRetry').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); });
  }

  /* Hộp thoại boss trong trận: tạo động 1 lần (dau-kanji.html chỉ được
     thêm thẻ script/link bosses nên không chèn sẵn div vào HTML). Hiện
     câu thoại boss ở ĐẦU trận; khi boss xuống <=30% máu chỉ đổi viền đỏ
     cảnh báo (gb-low), không đổi nội dung thoại — ghi rõ vậy. */
  function sayBoss(lowOnly) {
    var B = bossNow(), play = $('#play'); if (!play || !B) return;
    var el = $('#gbSay');
    if (!el) {
      el = document.createElement('div');
      el.className = 'gb-say'; el.id = 'gbSay';
      var arena = $('#arena'); if (arena && arena.parentNode) arena.parentNode.insertBefore(el, arena.nextSibling);
      else play.appendChild(el);
    }
    el.style.setProperty('--gb-c', B.color);
    el.classList.toggle('gb-low', !!lowOnly);
    el.innerHTML = '<span class="gb-say-face">' + B.emoji + (B.sub || '') + '</span><div><b>' + esc(B.name) + ':</b>' +
      '<p>“' + esc(B.line || 'Lên đi, ta chờ!') + '”</p></div>';
    el.classList.remove('mx-hid');
  }
  /* ===== Đợt 5 Nhánh C: BIỂN TÊN MÌNH trên đầu #figP =====
     LỰA CHỌN: GIỮ NGUYÊN hình #figP cũ (emoji 🥷 / mặt hồ sơ 'hoso' 84px —
     cơ chế F đợt 4, có CSS riêng `#figP .gface` trong modes.css) và CHỈ
     THÊM biển tên; KHÔNG thay #figP bằng GBODY toàn thân. Lý do: (1) #figP
     là neo combat của combatHit/dmgPop/GFIN (mọi hiệu ứng đo theo rect của
     nó) và nội dung của nó bị ghi đè có điều kiện bởi paintFace khi mặt là
     'hoso' — thay bằng GBODY sẽ phá hợp đồng mặt hồ sơ đợt 4; (2) arena
     .bk-arena cao cố định 180px (210px desktop), figP được cân theo cỡ
     70–84px ngang boss 104px — hình toàn thân tỉ lệ 200x360 đặt vào sẽ
     hoặc quá cao (tràn/chạm thanh máu) hoặc thu nhỏ tới mức mất chi tiết;
     (3) fullbody.js THẬT của nhánh A chưa có trong bản sao nhánh C nên
     không kiểm chứng được hình thật trong arena. Số đo với GBODY stub ghi
     trong reports/C.md. Biển dùng .gnp-top (nameplate.css): treo tuyệt đối
     ngay trên đầu figP, không đổi kích thước figP (absolute, ngoài luồng). */
  function plateHTML(name, own) {
    if (window.GNAME && typeof GNAME.plate === 'function') return GNAME.plate(name, { own: own });
    var n = String(name == null ? '' : name).trim();
    return n ? '<span class="gnp' + (own ? ' gnp-own' : '') + '">' + esc(n) + '</span>' : '';
  }
  function paintPlayerPlate() {
    var fig = $('#figP'); if (!fig) return;
    var old = fig.querySelector('.gnp'); if (old) old.remove();
    var name = (window.GNAME && typeof GNAME.ownName === 'function' ? GNAME.ownName() : '')
      || (user.loggedIn ? user.name : '');
    var html = plateHTML(name, true);
    if (!html) return;
    var tmp = document.createElement('div'); tmp.innerHTML = html;
    var el = tmp.firstChild;
    if (el) { el.classList.add('gnp-top'); fig.appendChild(el); }
  }
  function start() {
    var B = bossNow();
    hpP = 100; hpBMax = effHpOf(B); hpB = hpBMax; round = 0; okCount = 0; streak = 0; best = 0; score = 0; qi = 0; pool = [];
    startT = Date.now();
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    document.documentElement.style.setProperty('--bkc', B.color);
    var arena = $('#arena');
    arena.style.setProperty('--bkc', B.color);
    arena.setAttribute('data-boss-id', B.id);
    arena.setAttribute('data-boss-hpmax', String(hpBMax));
    arena.setAttribute('data-boss-spdmul', String(B.spdMul || 1));
    $('#pName').textContent = '🧑 ' + (user.name || 'Người chơi');
    // F: chỉ khi cấu hình mặt là 'hoso' mới thay #figP bằng ảnh hồ sơ; mặc định giữ emoji 🥷.
    // Chỉ thay NỘI DUNG con của #figP — combatHit/dmgPop thao tác trên chính phần tử nên không ảnh hưởng.
    if (window.GAME_AVATAR && GAME_AVATAR.load().face === 'hoso') {
      GAME_AVATAR.paintFace($('#figP'), GAME_AVATAR.load(), 84);
    }
    paintPlayerPlate(); // Đợt 5 C: biển tên mình treo trên đầu #figP (sau paintFace để không bị ghi đè)
    $('#bName').textContent = B.emoji + ' ' + B.name;
    $('#bName').setAttribute('data-boss-id', B.id);
    $('#figB').textContent = B.emoji; // chỉ emoji chính (104px): emoji phụ để ở hộp thoại, tránh xếp chồng tràn arena
    $('#play').classList.remove('mx-hid');
    sayBoss(false);
    setHp();
    music('boss'); trend('vao');
    loadMore(14).then(function () { next(); }).catch(function () {
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }
  function loadMore(n) {
    return fetchQ(n).then(function (qs) {
      var u = usable(qs);
      if (!u.length && !pool.length) throw new Error('empty');
      pool = pool.concat(u); return pool;
    });
  }
  function takeQ() {
    if (qi >= pool.length) return loadMore(10).then(function () { return qi < pool.length ? pool[qi++] : null; }).catch(function () { return null; });
    return Promise.resolve(pool[qi++]);
  }

  function next() {
    if (hpP <= 0 || hpB <= 0) return end();
    takeQ().then(function (q) {
      if (!q) return end();
      cur = q; lock = false; round++;
      $('#roundInfo').textContent = 'Hiệp ' + round + ' · Đúng & nhanh = đòn mạnh';
      var qb = $('#qBox');
      qb.textContent = q.prompt || '';
      qb.classList.toggle('long', (q.prompt || '').length > 14);
      $('#qSub').textContent = q.promptSub || (q.meaning && q.type !== 'kanji' ? '' : '');
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      startTimer(qSeconds(), function () { if (!lock) { lock = true; onWrong(true); } });
    });
  }
  function renderChoices(q) {
    var box = $('#optBox'), ci = correctIdx(q);
    q.choices.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-opt'; b.textContent = c;
      b.addEventListener('click', function () { answer(i === ci, b); });
      box.appendChild(b);
    });
  }
  function revealChoices() {
    var ci = correctIdx(cur);
    $$('#optBox .mx-opt').forEach(function (b, i) { b.disabled = true; if (i === ci) b.classList.add('ok'); });
  }
  function renderOrder(q) {
    var box = $('#ordBox'), picked = [];
    var slots = document.createElement('div'); slots.className = 'mx-ord-slots';
    var poolEl = document.createElement('div'); poolEl.className = 'mx-ord-pool';
    shuffle(q.tokens).forEach(function (tk) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-token'; b.textContent = tk;
      b.addEventListener('click', function () {
        if (lock) return;
        if (b.classList.contains('used')) return;
        b.classList.add('used'); picked.push({ t: tk, b: b });
        var s = document.createElement('button');
        s.type = 'button'; s.className = 'mx-token'; s.textContent = tk;
        s.addEventListener('click', function () {
          if (lock) return;
          var ix = picked.findIndex(function (p) { return p.b === b; });
          if (ix >= 0) picked.splice(ix, 1);
          b.classList.remove('used'); s.remove();
        });
        slots.appendChild(s);
      });
      poolEl.appendChild(b);
    });
    var chk = document.createElement('button');
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '⚔️ Ra đòn';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      answer(norm(got) === norm(q.answerText), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (lock) return; lock = true; stopTimer();
    var sp = speedFrac(), D = DIFF[st.diff];
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak);
      var ultra = streak >= 5;
      var dmg = Math.round((12 + sp * 14) * (ultra ? 2 : 1));
      score += Math.round((100 + sp * 100) * D.x * (1 + streak * 0.1));
      var hpBBefore = hpB;
      hpB = Math.max(0, hpB - dmg); setHp();
      var dealtB = hpBBefore - hpB; // delta HP thật (đã clamp) — số bay lên khớp đúng thanh máu
      sfx(ultra ? 'thunder' : SKILLS[(round - 1) % SKILLS.length]);
      fx(ultra ? 'ultra' : 'burst', $('#figB'));
      if (ultra) { trend('combo'); }
      else if (sp > 0.7) { fx('perfect'); trend('nhanh'); }
      else trend('dung');
      combatHit($('#figP'), $('#figB'), { ultra: ultra, tint: 'gold' });
      dmgPop($('#figB'), '-' + dealtB + (ultra ? ' ULTRA!' : ''));
    } else {
      onWrong(false, btn);
      return;
    }
    setTimeout(next, 950);
  }
  function onWrong(timeout, btn) {
    stopTimer();
    if (btn) btn.classList.add('bad');
    revealChoices();
    streak = 0; fx('comboPop', 0);
    var dmg = timeout ? 14 : 15;
    var hpPBefore = hpP;
    hpP = Math.max(0, hpP - dmg); setHp();
    var dealtP = hpPBefore - hpP; // delta HP thật (đã clamp)
    sfx('fire'); fx('shake', $('#arena'));
    trend(timeout ? 'hetgio' : 'sai');
    combatHit($('#figB'), $('#figP'), { tint: 'red', particles: true });
    dmgPop($('#figP'), '-' + dealtP);
    setTimeout(next, 1150);
  }

  function end() {
    /* Kết liễu BOSS (đợt 4): chỉ khi thắng, gắn TRƯỚC khi end() ẩn sân đấu;
       truyền boss CỦA VÁN (bossNow()). Thua (hpB>0) tuyệt đối không chạy. */
    if (hpB <= 0 && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ boss: bossNow(), fromEl: $('#figP'), toEl: $('#figB'), dmg: score }); else GFIN.play({ fromEl: $('#figP'), toEl: $('#figB'), dmg: score }); } catch (e) {} }
    stopTimer();
    $('#play').classList.add('mx-hid');
    var B = bossNow(), win = hpB <= 0;
    sfx(win ? 'victory' : 'lose');
    if (win) { fx('confetti'); trend('thang'); } else trend('thua');
    submitScore(score, startT);
    renderResult();
  }
  /* Chỉ DỰNG HTML màn kết quả từ state hiện tại (win suy từ hpB; không nộp
     điểm/không sfx — hiệu ứng phụ nằm ở end()); gọi lại khi tên người chơi
     resolve muộn để dòng chữ dùng tên mới nhất. */
  function renderResult() {
    var B = bossNow(), win = hpB <= 0;
    var zone = B.theme || B.zone || '';
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">' + (win ? '🏆' : '💪') + '</div>' +
      '<h1>' + (win ? 'Hạ gục ' + esc(B.name) + '!' : 'Suýt nữa thôi!') + '</h1>' +
      '<p class="mx-mut">' + (win ? callName() + ' quá cháy! Vùng ' + esc(zone) + ' đã yên bình trở lại 🔓' : callName() + ' đánh rất hay, nghỉ một chút rồi phục thù nhé!') + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + ' đúng</span><span class="mx-pill">⚡ Combo cao nhất ' + best + '</span><span class="mx-pill">❤️ Còn ' + Math.max(0, hpP) + ' máu</span></div>' +
      (win ? '<p class="mx-pill" style="margin-bottom:12px">🎉 Mở khóa danh hiệu: Người hùng ' + esc(zone) + '</p><br>' : '') +
      '<button class="mx-btn" id="btnAgain" type="button">Đánh lại</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenuKeep(); });
  }
  function buildMenuKeep() { /* giữ lựa chọn trùm/độ khó đã chọn */ buildMenu(); }

  bindUserEvent();
  loadUser().then(buildMenu);
})();
