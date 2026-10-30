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
  /* MỞ RỘNG ĐẤU TRÙM: HP hiệu dụng TRONG TRẬN — đánh lẻ ×2.6, leo hạng
     ×2.0 (so với effHpOf gốc ở trên; roster vẫn hiển thị máu gốc). */
  function battleHpOf(b) { return Math.round(effHpOf(b) * (st.mode === 'ladder' ? 2.0 : 2.6)); }
  /* Họ câu theo phase: Phase 1 = 'kanji' (bản sắc chế độ), Phase 2/3 = 'mix'. */
  function phaseTopic(p) { return p <= 1 ? 'kanji' : 'mix'; }
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
  /* Tham số hoá theo topic của phase hiện tại (poolTopic); không truyền
     topic thì lấy theo pool đang dùng. Câu hỏi VẪN chỉ qua GQ. */
  function fetchQ(count, topic) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: topic || poolTopic || 'kanji', count: count });
  }
  function usable(qs) { return (qs || []).filter(function (q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }
  /* ARRANGEFIX (31/10): chấm câu sắp xếp qua bộ chấm chung GQ.orderOK
     (bản cũ so norm() không bỏ '。' nên xếp đúng vẫn bị báo sai). */
  function orderRight(q, got) {
    if (window.GQ && typeof GQ.orderOK === 'function') return GQ.orderOK(q, got);
    return norm(got) === norm(String(q.answerText || '').replace(/[。．]+$/, ''));
  }

  /* ---------- Trạng thái ---------- */
  var st = { boss: 3, diff: 'tb', mode: 'solo' };
  Object.defineProperty(st, 'lv', { get: function () { return bossNow().lv; } });
  var hpP = 100, hpB = 100, hpBMax = 100, round = 0, okCount = 0, streak = 0, best = 0, score = 0,
      lock = false, pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0;
  /* FIX3: tạm dừng (pause.js) — cùng cơ chế leo-thap: timerCb/timerLive
     giữ đồng hồ câu, needNext hoãn next() khi đang dừng. */
  var timerCb = null, timerLive = false, needNext = false, pauseCtl = null;
  function isPaused() { return !!(pauseCtl && pauseCtl.isPaused()); }

  /* ---------- MỞ RỘNG: phase trùm + chiêu phá + phù trợ + leo hạng ----------
     phase: 1 (100–67% máu) / 2 (66–34%) / 3 (33–0%). pendingPhase được
     chốt ở cú đánh làm trùm tụt qua mốc, áp dụng ở next() kế tiếp để
     không phá câu đang reveal. trick = chiêu đang áp cho câu hiện tại:
       { kind:'cover'|'squeeze'|'swap'|null, el, origLimMs, cutMs,
         swapTimer, swapPending, qRound }
     lastTrickKind chống lặp cùng chiêu 2 lần liền (giữ xuyên leo hạng). */
  var phase = 1, pendingPhase = 0, trickPending = false, p3Since = 0,
      poolTopic = 'kanji', nextPool = null, nextPoolPhase = 0, preloadBusy = false,
      trick = null, lastTrickKind = null,
      usedLife = { break: false, time: false, f50: false },
      ladderLineup = null, ladderIdx = 0, advancing = false, resultInfo = null;
  var PHASE_SAY = {
    2: 'Gừ… được lắm! Ta nổi giận rồi đây — coi chừng chiêu phá của ta đấy!',
    3: 'Chưa xong đâu! Ta dốc toàn lực rồi — đừng hòng thoát khỏi tay ta!'
  };
  function phaseFor(frac) { return frac > 0.66 ? 1 : (frac > 0.33 ? 2 : 3); }
  function newTrick() { return { kind: null, el: null, origLimMs: 0, cutMs: 0, swapTimer: null, swapPending: false, qRound: 0 }; }
  trick = newTrick();

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
      '<div class="gb-meta">' + esc(B.lv) + ' · ' + esc(B.theme || B.zone || '') + ' · <span class="gb-tier">Tier ' + B.tier + '</span> · ❤️ ' + battleHpOf(B) + ' máu trong trận</div>' +
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
      '<h2>Cách đánh</h2>' + segHTML([{ v: 'solo', n: 'Đánh lẻ', sub: '1 trùm · HP ×2,6 · 3 phase' }, { v: 'ladder', n: '🏆 Leo hạng', sub: '3 trùm liền · HP ×2,0' }], st.mode, 'mode') +
      (st.mode === 'ladder'
        ? '<p class="mx-mut" style="margin-top:8px">Leo hạng: rút 3 trùm ngẫu nhiên, sắp tier tăng dần. Giữ điểm/streak xuyên suốt; giữa các trùm hồi 35 máu + hồi 1 phù đã dùng. Trùm chọn tay ở trên chỉ áp cho Đánh lẻ.</p>'
        : '<p class="mx-mut" style="margin-top:8px">Đánh lẻ: trùm chia 3 phase theo máu (66%/33%). Từ Phase 2 trùm tung chiêu phá và họ câu đổi sang trộn; có 3 phù trợ, mỗi phù 1 lần/trận.</p>') +
      '<div id="dkPlusLoadout"></div>' +
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
    /* Đổi cách đánh thì vẽ lại menu để số máu trong trận (×2,6 / ×2,0)
       và dòng mô tả khớp lựa chọn; boss đang chọn không đổi. */
    bindSeg(m, 'mode', function (v) { st.mode = v; buildMenu(); });
    if (window.GPLUS) GPLUS.mountLoadout($('#dkPlusLoadout'));
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
  function armTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (isPaused()) return;
      var left = limMs - (Date.now() - t0);
      // Đợt 7: thanh giờ bằng transform scaleX thay width (tick 50ms
      // không còn ép layout mỗi nhịp) — modes.css .mx-timer i origin trái.
      $('#tBar').style.transform = 'scaleX(' + Math.max(0, left / limMs) + ')';
      $('#tTxt').textContent = (Math.max(0, left) / 1000).toFixed(1) + 's';
      if (left <= 0) { stopTimer(); if (timerCb) timerCb(); }
    }, 50);
  }
  function startTimer(sec, onTimeout) {
    stopTimer(); limMs = sec * 1000; t0 = Date.now(); timerCb = onTimeout; timerLive = true;
    armTimer();
  }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; timerLive = false; }
  function suspendTimer() { if (timer) clearInterval(timer); timer = null; }
  function speedFrac() { return Math.max(0, Math.min(1, (limMs - (Date.now() - t0)) / limMs)); }

  function showError(msg) {
    stopTimer();
    if (pauseCtl) pauseCtl.setVisible(false);
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
  function sayBoss(lowOnly, text) {
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
      '<p>“' + esc(text || B.line || 'Lên đi, ta chờ!') + '”</p></div>';
    el.classList.remove('mx-hid');
  }

  /* ---------- MỞ RỘNG: phase / chiêu phá / phù trợ ---------- */
  /* Biển phase: tạo động TRONG arena (như dmgPop), pointer-events:none
     qua x-dau-kanji.css, tự gỡ sau ~1,6s — không che câu hỏi/đáp án. */
  function showPhaseBanner(txt) {
    var ar = $('#arena'); if (!ar) return;
    var old = ar.querySelector('.x-phase-banner'); if (old) old.remove();
    var d = document.createElement('div');
    d.className = 'x-phase-banner'; d.setAttribute('aria-hidden', 'true'); d.textContent = txt;
    ar.appendChild(d);
    setTimeout(function () { d.remove(); }, 1600);
  }
  function paintTrickBadge() {
    var b = $('#trickBadge'); if (!b) return;
    var txt = trick.kind === 'cover' ? '🌀 Che 1 đáp án' : trick.kind === 'squeeze' ? '⚡ Ép giờ ×0,6' : (trick.kind === 'swap' ? '🔀 Đảo đáp án' : '');
    b.textContent = txt; b.classList.toggle('mx-hid', !txt);
    var tb = document.querySelector('#play .mx-timer');
    if (tb) tb.classList.toggle('x-squeezed', trick.kind === 'squeeze');
  }
  /* Nạp dự phòng pool của phase kế: gọi khi máu trùm vừa xuống mốc
     70% (chuẩn bị Phase 2) / 37% (chuẩn bị Phase 3) để lúc chuyển
     phase (66%/33%) chỉ việc hoán pool, không giật chờ mạng. */
  function maybePreload() {
    if (nextPool || preloadBusy || hpB <= 0) return;
    var frac = hpB / hpBMax, want = 0;
    if (phase === 1 && frac <= 0.70 && frac > 0.66) want = 2;
    else if (phase === 2 && frac <= 0.37 && frac > 0.33) want = 3;
    if (!want) return;
    preloadBusy = true;
    var lv = st.lv; // chốt cấp của trùm hiện tại (leo hạng đổi trùm = đổi cấp)
    fetchQ(14, phaseTopic(want)).then(function (qs) {
      preloadBusy = false;
      var u = usable(qs);
      /* Chỉ giữ nếu vẫn đang đấu cùng trùm/cấp và chưa qua phase đó. */
      if (u.length && st.lv === lv && phase < want) { nextPool = u; nextPoolPhase = want; }
    }).catch(function () { preloadBusy = false; });
  }
  /* Áp phase mới ngay trước câu kế tiếp: hoán pool theo topic phase,
     biển báo + rung arena nhẹ + câu thoại phase trong gbSay, và hẹn
     1 chiêu phá cho câu sắp hiện (trickPending, xử lý trong next()). */
  function applyPhase(np) {
    phase = np; p3Since = 0;
    poolTopic = phaseTopic(np);
    if (nextPool && nextPoolPhase === np) { pool = nextPool; qi = 0; }
    else { pool = []; qi = 0; }
    nextPool = null; nextPoolPhase = 0;
    showPhaseBanner(np === 2 ? 'PHASE 2 — TRÙM NỔI GIẬN 🔥' : 'PHASE 3 — TRÙM BÙNG NỔ 💥');
    fx('shake', $('#arena'));
    sayBoss(true, PHASE_SAY[np]);
    trickPending = true;
  }
  function pickTrick(q) {
    /* Câu sắp xếp (order) không có nút đáp án để che/đảo -> chỉ Ép giờ. */
    var cand = (q.choices && q.choices.length >= 2) ? ['cover', 'squeeze', 'swap'] : ['squeeze'];
    var fresh = cand.filter(function (k) { return k !== lastTrickKind; });
    var list = fresh.length ? fresh : cand;
    return list[Math.random() * list.length | 0];
  }
  function cancelSwap() {
    if (trick.swapTimer) { clearTimeout(trick.swapTimer); trick.swapTimer = null; }
    trick.swapPending = false;
    if (trick.kind === 'swap') trick.kind = null;
  }
  function clearTrick() {
    if (trick.swapTimer) clearTimeout(trick.swapTimer);
    trick = newTrick();
    paintTrickBadge();
  }
  function applyCover() {
    var btns = $$('#optBox .mx-opt').filter(function (b) { return !b.classList.contains('gone'); });
    if (!btns.length) btns = $$('#optBox .mx-opt');
    if (!btns.length) { trick.kind = null; return; }
    var b = btns[Math.random() * btns.length | 0];
    b.classList.add('x-covered');
    var cov = document.createElement('span');
    cov.className = 'x-cover'; cov.setAttribute('aria-hidden', 'true'); cov.textContent = '🌀';
    b.appendChild(cov);
    trick.el = b;
  }
  function scheduleSwap(ms) {
    if (trick.swapTimer) clearTimeout(trick.swapTimer);
    trick.swapTimer = setTimeout(function () { trick.swapTimer = null; doSwap(); }, ms);
  }
  function doSwap() {
    /* Đang pause: ĐÔNG CỨNG nhịp đảo — hoãn sang sau resume (onResume
       của GPAUSE hẹn lại); câu đã khoá/đã trả lời thì bỏ qua hẳn. */
    if (isPaused()) { trick.swapPending = true; return; }
    trick.swapPending = false;
    if (lock || !cur || trick.qRound !== round) { if (trick.kind === 'swap') { trick.kind = null; paintTrickBadge(); } return; }
    var box = $('#optBox'); if (!box) return;
    var btns = $$('#optBox .mx-opt');
    if (btns.length < 2) { trick.kind = null; paintTrickBadge(); return; }
    shuffle(btns).forEach(function (b) { box.appendChild(b); });
    box.classList.add('x-swapped');
    setTimeout(function () { box.classList.remove('x-swapped'); }, 650);
    trick.kind = null; paintTrickBadge();
  }
  /* Hàng phù trợ: trạng thái disabled khớp usedLife (leo hạng hồi lại
     1 phù đã dùng thì paintLife mở khoá nút đó). */
  function paintLife() {
    var m = { lfBreak: 'break', lfTime6: 'time', lf5050: 'f50' };
    Object.keys(m).forEach(function (id) { var b = $('#' + id); if (b) b.disabled = !!usedLife[m[id]]; });
  }
  function reviveOneLife() {
    var used = Object.keys(usedLife).filter(function (k) { return usedLife[k]; });
    if (!used.length) return null;
    var k = used[Math.random() * used.length | 0];
    usedLife[k] = false; paintLife();
    return k;
  }
  function bindLifelines() {
    var bb = $('#lfBreak'), bt = $('#lfTime6'), bf = $('#lf5050');
    if (bb) bb.addEventListener('click', function () {
      if (isPaused() || usedLife.break || lock || !timerLive) return;
      var did = false;
      if (trick.kind === 'cover' && trick.el) { /* bỏ lớp che */
        trick.el.classList.remove('x-covered');
        var cov = trick.el.querySelector('.x-cover'); if (cov) cov.remove();
        trick.el = null; trick.kind = null; did = true;
      } else if (trick.kind === 'squeeze') { /* cộng lại đúng phần giờ bị cắt (kể cả khi đã +6s xen giữa) */
        limMs += trick.cutMs || 0; trick.kind = null; did = true;
      } else if (trick.kind === 'swap' || trick.swapPending || trick.swapTimer) { /* huỷ đảo đang chờ */
        cancelSwap(); did = true;
      }
      if (!did) return; /* không có chiêu nào đang áp: không tốn phù */
      usedLife.break = true; paintLife(); paintTrickBadge();
      trend('trogiup'); sfx('click');
    });
    if (bt) bt.addEventListener('click', function () {
      if (isPaused() || usedLife.time || lock || !timerLive) return;
      usedLife.time = true; paintLife();
      /* +6s bám đúng cơ chế giờ fix3 của trang: đồng hồ tính
         left = limMs - (Date.now() - t0) nên chỉ cần limMs += 6000 —
         pause vẫn đúng vì onResume đã cộng dur vào t0. */
      limMs += 6000;
      trend('trogiup'); sfx('click');
    });
    if (bf) bf.addEventListener('click', function () {
      if (isPaused() || usedLife.f50 || lock || !cur || !cur.choices) return;
      usedLife.f50 = true; paintLife(); trend('trogiup'); sfx('click');
      var ci = correctIdx(cur), k = 0;
      $$('#optBox .mx-opt').forEach(function (b) {
        if (k < 2 && +b.getAttribute('data-ix') !== ci && !b.classList.contains('gone')) { b.classList.add('gone'); k++; }
      });
    });
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
  /* Leo hạng: rút 3 trùm bằng GBOSS.next() 3 lần rồi sắp tier tăng dần.
     Không có GBOSS thì xoay vòng 5 trùm gốc (tier = thứ tự gốc). */
  function drawLadderLineup() {
    var out = [];
    if (window.GBOSS && typeof GBOSS.next === 'function') {
      for (var i = 0; i < 3; i++) out.push(GBOSS.next());
    } else {
      for (var k = 0; k < 3; k++) out.push(normOrig((st.boss + k) % BOSSES.length));
    }
    out.sort(function (a, b) { return (a.tier || 0) - (b.tier || 0); });
    return out;
  }
  function start() {
    /* Khởi tạo LƯỢT (điểm/streak/phù giữ xuyên suốt leo hạng); từng trùm
       được dựng bởi startBossFight(). */
    hpP = 100; round = 0; okCount = 0; streak = 0; best = 0; score = 0;
    usedLife = { break: false, time: false, f50: false }; paintLife();
    lastTrickKind = null; resultInfo = null; advancing = false;
    startT = Date.now(); needNext = false;
    if (window.GPLUS) GPLUS.beginMatch();
    if (st.mode === 'ladder') {
      ladderLineup = drawLadderLineup(); ladderIdx = 0;
      setBoss(ladderLineup[0], false);
    } else { ladderLineup = null; ladderIdx = 0; }
    if (pauseCtl) pauseCtl.setVisible(true);
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    music('boss'); trend('vao');
    startBossFight(bossNow());
  }
  /* Dựng 1 trùm trong lượt: HP theo cách đánh (×2,6 lẻ / ×2,0 leo hạng),
     phase về 1, pool về topic 'kanji', gỡ mọi chiêu/phù đang treo. */
  function startBossFight(B) {
    hpBMax = battleHpOf(B); hpB = hpBMax;
    phase = 1; pendingPhase = 0; trickPending = false; p3Since = 0;
    pool = []; qi = 0; poolTopic = 'kanji'; nextPool = null; nextPoolPhase = 0;
    clearTrick();
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
    $('#bName').textContent = B.emoji + ' ' + B.name + (st.mode === 'ladder' ? ' · Trùm ' + (ladderIdx + 1) + '/3' : '');
    $('#bName').setAttribute('data-boss-id', B.id);
    $('#figB').textContent = B.emoji; // chỉ emoji chính (104px): emoji phụ để ở hộp thoại, tránh xếp chồng tràn arena
    $('#play').classList.remove('mx-hid');
    sayBoss(false);
    setHp();
    loadMore(14).then(function () { next(); }).catch(function () {
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }
  /* Leo hạng: hạ 1 trùm chưa phải cuối -> KHÔNG kết lượt, KHÔNG nộp
     điểm, KHÔNG GFIN (kết liễu chỉ ở trùm cuối). Hồi 35 máu người chơi
     + hồi 1 phù đã dùng (ngẫu nhiên), dựng trùm kế tiếp. */
  function advanceBoss() {
    if (advancing) return; advancing = true;
    stopTimer(); clearTrick();
    ladderIdx++;
    var B = ladderLineup[ladderIdx];
    setBoss(B, false);
    hpP = Math.min(100, hpP + 35);
    var revived = reviveOneLife();
    startBossFight(B);
    showPhaseBanner('⚔️ TRÙM ' + (ladderIdx + 1) + '/3: ' + B.name + ' · +35 máu' + (revived ? ' · hồi 1 phù' : ''));
    advancing = false;
  }
  function loadMore(n) {
    return fetchQ(n, poolTopic).then(function (qs) {
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
    if (isPaused()) { needNext = true; return; }
    if (hpP <= 0) return end();
    if (hpB <= 0) {
      /* Leo hạng còn trùm kế: chuyển trùm thay vì kết lượt. */
      if (st.mode === 'ladder' && ladderLineup && ladderIdx < ladderLineup.length - 1) return advanceBoss();
      return end();
    }
    /* Chuyển phase chốt từ cú đánh trước áp ở đây: hoán pool + hẹn chiêu. */
    if (pendingPhase && pendingPhase > phase) { applyPhase(pendingPhase); }
    pendingPhase = 0;
    takeQ().then(function (q) {
      if (!q) return end();
      cur = q; lock = false; round++;
      clearTrick();
      /* Chiêu phá: hẹn từ chuyển phase (trickPending) hoặc mỗi 3 câu
         ở Phase 3 (p3Since đếm câu Phase 3 kể từ chiêu gần nhất). */
      var due = false;
      if (trickPending) { due = true; trickPending = false; }
      else if (phase === 3) { p3Since++; if (p3Since >= 3) { due = true; p3Since = 0; } }
      var chosen = due ? pickTrick(q) : null;
      if (chosen) { lastTrickKind = chosen; trick.kind = chosen; trick.qRound = round; }
      $('#roundInfo').textContent = 'Hiệp ' + round + ' · Phase ' + phase + (st.mode === 'ladder' ? ' · Trùm ' + (ladderIdx + 1) + '/3' : '') + ' · Đúng & nhanh = đòn mạnh';
      var qb = $('#qBox');
      qb.textContent = q.prompt || '';
      qb.classList.toggle('long', (q.prompt || '').length > 14);
      $('#qSub').textContent = q.promptSub || (q.meaning && q.type !== 'kanji' ? '' : '');
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      var sec = qSeconds();
      if (chosen === 'squeeze') {
        /* Ép giờ: áp hệ số ×0,6 vào limMs của CHÍNH câu này qua
           startTimer; origLimMs giữ để phù Phá sương khôi phục. */
        trick.origLimMs = sec * 1000;
        sec = sec * 0.6;
        trick.cutMs = trick.origLimMs - sec * 1000;
      }
      paintTrickBadge();
      startTimer(sec, function () { if (!lock) { lock = true; onWrong(true); } });
      if (chosen === 'cover') applyCover();
      else if (chosen === 'swap') scheduleSwap(1200);
      paintTrickBadge();
    });
  }
  function renderChoices(q) {
    var box = $('#optBox'), ci = correctIdx(q);
    q.choices.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-opt'; b.textContent = c;
      /* data-ix giữ chỉ số đáp án GỐC: chiêu Đảo đáp án hoán vị vị trí
         DOM nên mọi tra cứu đúng/sai phải theo data-ix, không theo
         thứ tự DOM (revealChoices + phù 50/50 đều dùng data-ix). */
      b.setAttribute('data-ix', String(i));
      b.addEventListener('click', function () { answer(i === ci, b); });
      box.appendChild(b);
    });
  }
  function revealChoices() {
    var ci = correctIdx(cur);
    $$('#optBox .mx-opt').forEach(function (b) { b.disabled = true; if (+b.getAttribute('data-ix') === ci) b.classList.add('ok'); });
  }
  function renderOrder(q) {
    var box = $('#ordBox'), picked = [];
    var slots = document.createElement('div'); slots.className = 'mx-ord-slots';
    var poolEl = document.createElement('div'); poolEl.className = 'mx-ord-pool';
    shuffle(q.tokens).forEach(function (tk) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-token'; b.textContent = tk;
      b.addEventListener('click', function () {
        if (isPaused() || lock) return;
        if (b.classList.contains('used')) return;
        b.classList.add('used'); picked.push({ t: tk, b: b });
        var s = document.createElement('button');
        s.type = 'button'; s.className = 'mx-token'; s.textContent = tk;
        s.addEventListener('click', function () {
          if (isPaused() || lock) return;
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
      answer(orderRight(q, got), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (isPaused() || lock) return; lock = true; stopTimer();
    /* GAME-PLUS: đáp án SAI (bấm sai + hết giờ) đều chảy qua onWrong nên
       ghi câu sai + khiên đặt ở onWrong để không ghi/không đỡ 2 lần;
       ở đây chỉ ghi khi ĐÚNG. */
    if (right) { window.GPLUS_TRACK && GPLUS_TRACK(cur, right); }
    cancelSwap(); paintTrickBadge(); /* câu đã khoá: đảo đang chờ bị huỷ */
    var sp = speedFrac(), D = DIFF[st.diff];
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak);
      var ultra = streak >= 5;
      var dmg = Math.round((12 + sp * 14) * (ultra ? 2 : 1));
      score += Math.round((100 + sp * 100) * D.x * (1 + streak * 0.1)) * (window.GPLUS ? GPLUS.scoreMul() : 1);
      var hpBBefore = hpB;
      hpB = Math.max(0, hpB - dmg); setHp();
      /* Mốc phase 66%/33%: chốt pendingPhase (áp ở next() kế tiếp);
         mốc nạp dự phòng 70%/37% chạy ngay để pool phase mới sẵn sàng. */
      if (hpB > 0) {
        var np = phaseFor(hpB / hpBMax);
        if (np > phase) pendingPhase = np;
        maybePreload();
      }
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
    window.GPLUS_TRACK && GPLUS_TRACK(cur, false);
    var __pr = window.GPLUS ? GPLUS.onAnswer(false) : null;
    cancelSwap(); paintTrickBadge();
    if (btn) btn.classList.add('bad');
    revealChoices();
    /* Khiên GAME-PLUS: đỡ đúng phần mất streak/combo, máu vẫn trừ như cũ. */
    if (__pr && __pr.shieldUsed) { fx('comboPop', streak); } else { streak = 0; fx('comboPop', 0); }
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
    /* GAME-PLUS hồi sinh: chỉ khi thua vì hết máu (hpP<=0, trùm còn sống) —
       hồi 20 máu rồi đấu tiếp câu kế. */
    if (hpP <= 0 && hpB > 0 && window.GPLUS && GPLUS.tryRevive()) {
      hpP = 20; setHp();
      if (pauseCtl) pauseCtl.setVisible(true);
      next(); return;
    }
    if (window.GPLUS) GPLUS.endMatch();
    if (pauseCtl) pauseCtl.setVisible(false);
    clearTrick();
    /* Kết liễu BOSS (đợt 4): chỉ khi thắng, gắn TRƯỚC khi end() ẩn sân đấu;
       truyền boss CỦA VÁN (bossNow()). Thua (hpB>0) tuyệt đối không chạy.
       Leo hạng: end() chỉ tới được ở trùm cuối (thắng) hoặc khi gục giữa
       chừng nên GFIN kết liễu giữ đúng ở trùm cuối như thiết kế. */
    if (hpB <= 0 && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ boss: bossNow(), fromEl: $('#figP'), toEl: $('#figB'), dmg: score }); else GFIN.play({ fromEl: $('#figP'), toEl: $('#figB'), dmg: score }); } catch (e) {} }
    /* Chốt thông tin kết quả TRƯỚC renderResult (hàm này được gọi lại
       khi tên người chơi resolve muộn nên phải đọc từ resultInfo). */
    if (st.mode === 'ladder' && ladderLineup) {
      resultInfo = {
        ladder: true, win: hpB <= 0, fellAt: ladderIdx + 1,
        fellBoss: bossNow().name,
        names: ladderLineup.map(function (b) { return b.name; })
      };
    } else resultInfo = null;
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
    var head, sub, extra = '';
    if (resultInfo && resultInfo.ladder) {
      if (resultInfo.win) {
        head = '🏆 CHINH PHỤC LEO HẠNG!';
        sub = callName() + ' đã hạ cả 3 trùm liền một mạch: ' + esc(resultInfo.names.join(' → ')) + '. Đỉnh thật sự!';
        extra = '<p class="mx-pill" style="margin-bottom:12px">🎉 Mở khóa danh hiệu: Vô địch Leo hạng trùm</p><br>';
      } else {
        head = 'Gục ở trùm thứ ' + resultInfo.fellAt + '/3';
        sub = callName() + ' đã gục trước ' + esc(resultInfo.fellBoss) + ' ở lượt leo hạng. Điểm của cả lượt vẫn được ghi nhận — nghỉ một chút rồi leo lại nhé!';
      }
      r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">' + (resultInfo.win ? '🏆' : '💪') + '</div>' +
        '<h1>' + head + '</h1>' +
        '<p class="mx-mut">' + sub + '</p>' +
        '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + ' đúng</span><span class="mx-pill">⚡ Combo cao nhất ' + best + '</span><span class="mx-pill">❤️ Còn ' + Math.max(0, hpP) + ' máu</span></div>' +
        extra +
        '<button class="mx-btn" id="btnAgain" type="button">Đánh lại</button><div style="height:8px"></div>' +
        '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    } else {
      r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">' + (win ? '🏆' : '💪') + '</div>' +
        '<h1>' + (win ? 'Hạ gục ' + esc(B.name) + '!' : 'Suýt nữa thôi!') + '</h1>' +
        '<p class="mx-mut">' + (win ? callName() + ' quá cháy! Vùng ' + esc(zone) + ' đã yên bình trở lại 🔓' : callName() + ' đánh rất hay, nghỉ một chút rồi phục thù nhé!') + '</p>' +
        '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + ' đúng</span><span class="mx-pill">⚡ Combo cao nhất ' + best + '</span><span class="mx-pill">❤️ Còn ' + Math.max(0, hpP) + ' máu</span></div>' +
        (win ? '<p class="mx-pill" style="margin-bottom:12px">🎉 Mở khóa danh hiệu: Người hùng ' + esc(zone) + '</p><br>' : '') +
        '<button class="mx-btn" id="btnAgain" type="button">Đánh lại</button><div style="height:8px"></div>' +
        '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    }
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenuKeep(); });
  }
  function buildMenuKeep() { /* giữ lựa chọn trùm/độ khó đã chọn */ buildMenu(); }

  /* GAME-PLUS: phép dời giờ DÙNG CHUNG cho onResume của GPAUSE và kỹ
     năng Đóng băng — cộng dur vào t0 (mốc đồng hồ câu) + startT. */
  function shiftDkTime(dur) { t0 += dur; startT += dur; }
  if (window.GPLUS) {
    GPLUS.setHudHost($('#dkPlusHud'));
    GPLUS.setFreezeHandler(function () {
      if (!timerLive || lock) return false;
      shiftDkTime(5000);
      return true;
    });
    GPLUS.setHintHandler(function () {
      if (!cur || lock || !cur.choices) return false;
      var ci = correctIdx(cur), done = false;
      $$('#optBox .mx-opt').forEach(function (b) {
        if (!done && +b.getAttribute('data-ix') !== ci && !b.classList.contains('gone') && !b.disabled) { b.classList.add('gone'); done = true; }
      });
      return done;
    });
  }
  /* FIX3: nút Tạm dừng — onResume cộng ms đã dừng vào t0 + startT. */
  if (window.GPAUSE && typeof window.GPAUSE.create === 'function') {
    pauseCtl = window.GPAUSE.create({
      btnHost: $('#pauseSlot') || $('#play'),
      exitLabel: 'Thoát trận (về menu)',
      isPlaying: function () { return !$('#play').classList.contains('mx-hid'); },
      onPause: function () { suspendTimer(); },
      onResume: function (dur) {
        shiftDkTime(dur);
        if (timerLive) armTimer();
        if (needNext) { needNext = false; next(); }
        /* MỞ RỘNG: đảo đáp án bị đông cứng lúc pause -> hẹn lại sau
           resume, chỉ khi vẫn đúng câu đó và câu chưa khoá. */
        if (trick.swapPending) {
          trick.swapPending = false;
          if (!lock && timerLive && trick.qRound === round) scheduleSwap(250);
          else if (trick.kind === 'swap') { trick.kind = null; paintTrickBadge(); }
        }
      },
      onExit: function () { if (window.GPLUS) GPLUS.endMatch(); stopTimer(); clearTrick(); $('#play').classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); }
    });
  }

  bindUserEvent();
  loadUser().then(function () { buildMenu(); bindLifelines(); paintLife(); });
})();
