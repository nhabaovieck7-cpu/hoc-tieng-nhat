/* leo-thap.js — Nhánh 3: Leo tháp. Leo tầng liên tục, sai/hết giờ = rơi 1 tầng
   MỞ RỘNG (THIET-KE mục 3): đích tầng 30 + cổng trùm mini 10/20/30 (3 câu mix),
   checkpoint 10/20, trạm nghỉ mỗi 5 tầng, sự kiện ngẫu nhiên qua nextMod.
   (trend 'roi'), thời gian mỗi câu ít dần theo tầng, mốc mỗi 5 tầng, kỷ lục local
   (localStorage hn_game_tower_best_<level>). Câu hỏi qua GQ (hook an toàn),
   nhạc GMUSIC 'normal', điểm nộp GAME_API khi kết thúc lượt leo. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var DIFF = { de: { n: 'Dễ', s: 20, x: 1 }, tb: { n: 'Trung bình', s: 12, x: 1 }, kho: { n: 'Khó', s: 6, x: 2 } };
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var TOPICS = { mix: 'Trộn', kanji: 'Kanji', vocab: 'Từ vựng', grammar: 'Ngữ pháp' };

  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function syncUser(u) { if (u) for (var k in u) user[k] = u[k]; return user; }
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(syncUser).catch(function () { return user; });
  }
  /* Tên có thể resolve SAU khi menu đã vẽ (game.js phát sự kiện
     'hn-game-user', detail = GAME_USER_DATA, mỗi khi resolve/refresh xong):
     đồng bộ lại bản local rồi vẽ lại phần đang hiện có dùng tên — menu khi
     đang ở menu (lời chào + dòng kỷ lục), màn kết quả khi đang hiện.
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
    var menu = $('#menu'), res = $('#result');
    if (menu && !menu.classList.contains('mx-hid') && menu.innerHTML) buildMenu();
    else if (res && !res.classList.contains('mx-hid') && res.innerHTML) { if (winScreen) renderWin(); else renderResult(); }
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
      var r = GAME_API.submitScore({ mode: 'leo-thap', level: st.lv, score: Math.round(score), durationMs: Date.now() - t0 });
      if (r && r.catch) r.catch(function () {});
    }
  } catch (e) {} }
  function fetchQ(count) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: st.topic, count: count });
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

  var st = { lv: 'N5', diff: 'tb', topic: 'mix' };
  var floor = 1, topFloor = 1, score = 0, okCount = 0, streak = 0, best = 0, asked = 0,
      lock = false, pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0,
      usedLife = { f50: false, time: false, swap: false };
  /* MỞ RỘNG mục 3 — máy trạng thái:
     checkpoint: tầng sàn khi rơi (0 = chưa có, hiệu lực tối thiểu tầng 1);
     gate: null ngoài cổng, trong cổng là {at, got, wrong, left, boss} —
           đúng/sai trong cổng CHỈ tính vào gate, không cộng/trừ tầng;
     gatePassed / restVisited: cờ "1 lần/lượt" cho từng cổng / trạm;
     endless: sau khi thắng tầng 30 mà chọn leo tiếp -> tắt checkpoint + cổng;
     nextMod: hệ số sự kiện cho câu KẾ TIẾP, activeMod: hệ số của câu ĐANG chơi
           (tiêu thụ đúng 1 lần ở next(), áp vào startTimer/điểm). */
  var checkpoint = 0, gate = null, gatePassed = {}, restVisited = {}, endless = false,
      hasWon = false, winSubmitBase = 0, needGateResolve = null,
      gatePool = [], gateQi = 0, doorPool = [], doorQi = 0, pendingDoorTopic = null,
      nextMod = null, activeMod = null, winScreen = false;
  /* FIX3: tạm dừng — timerCb/timerLive giữ callback + trạng thái đồng
     hồ câu hiện tại để pause.js dừng/đánh thức đúng interval này;
     needNext: next() bị gọi trong lúc đang dừng thì hoãn tới resume. */
  var timerCb = null, timerLive = false, needNext = false, pauseCtl = null;
  function isPaused() { return !!(pauseCtl && pauseCtl.isPaused()); }

  function recKey() { return 'hn_game_tower_best_' + st.lv; }
  function getRec() { try { return JSON.parse(localStorage.getItem(recKey()) || 'null'); } catch (e) { return null; } }
  function saveRec() {
    var rec = getRec();
    if (!rec || topFloor > rec.floor || (topFloor === rec.floor && score > rec.score)) {
      try { localStorage.setItem(recKey(), JSON.stringify({ floor: topFloor, score: Math.round(score) })); } catch (e) {}
      return true;
    }
    return false;
  }
  function secForFloor(f) {
    /* Càng cao càng ít giờ: trừ 0.35s mỗi tầng, tối thiểu 5s */
    return Math.max(5, DIFF[st.diff].s - (f - 1) * 0.35);
  }

  /* ---------- MỞ RỘNG mục 3: cổng / checkpoint / trạm / sự kiện ---------- */
  function isGateFloor(f) { return f === 10 || f === 20 || f === 30; }
  function isStationFloor(f) { return f === 5 || f === 15 || f === 25; }
  /* Đích rơi khi thua cổng (ghi rõ trên thẻ cổng trước khi đánh):
     cổng 10 -> tầng 5 (chưa có checkpoint), 20 -> checkpoint 10, 30 -> checkpoint 20 */
  function gateFallDest(at) { return at === 10 ? 5 : at === 20 ? 10 : 20; }
  function gateTierWant(at) { return at === 10 ? 2 : at === 20 ? 3 : 5; }
  /* Mặt trùm cổng từ GBOSS: ưu tiên boss cùng lv với st.lv (xoay mặt giữa
     cổng 10/20 cho khác nhau); cổng 30 = Tengu (lv thấp) / Shogun (N2/N1);
     thiếu GBOSS thì lùi byTier theo tầng cổng, cuối cùng là emoji dự phòng. */
  function gateBoss(at) {
    var fb = { emoji: '👹', name: 'Trùm cổng tầng ' + at, sub: '', color: '', line: '' };
    try {
      if (!(window.GBOSS && GBOSS.ALL && GBOSS.ALL.length)) return fb;
      if (at === 30 && typeof GBOSS.get === 'function') {
        var g30 = GBOSS.get((st.lv === 'N1' || st.lv === 'N2') ? 'shogun' : 'tengu');
        if (g30) return g30;
      }
      var sameLv = (typeof GBOSS.byLevel === 'function') ? GBOSS.byLevel(st.lv) : [];
      if (sameLv && sameLv.length) return sameLv[(at / 10 - 1) % sameLv.length];
      var byT = (typeof GBOSS.byTier === 'function') ? GBOSS.byTier(gateTierWant(at)) : [];
      if (byT && byT.length) return byT[0];
      return GBOSS.ALL[0];
    } catch (e) { return fb; }
  }
  /* 3 thẻ động dựng trong JS (HTML chỉ thêm <link> css): thẻ cổng, thẻ sự
     kiện, dòng thông tin trạm — đều nằm TRÊN khu câu hỏi, không chặn luồng. */
  function ensureBars() {
    var qb = $('#qBox'); if (!qb || !qb.parentNode) return;
    if (!$('#gateCard')) { var g = document.createElement('div'); g.id = 'gateCard'; g.className = 'tw-gate-card mx-hid'; qb.parentNode.insertBefore(g, qb); }
    if (!$('#eventCard')) { var ev = document.createElement('div'); ev.id = 'eventCard'; ev.className = 'tw-event-card mx-hid'; qb.parentNode.insertBefore(ev, qb); }
    if (!$('#twInfo')) { var inf = document.createElement('div'); inf.id = 'twInfo'; inf.className = 'tw-info-line mx-hid'; qb.parentNode.insertBefore(inf, qb); }
  }
  function notifyInfo(text, moment) {
    ensureBars();
    var el = $('#twInfo'); if (el) { el.textContent = text; el.classList.remove('mx-hid'); }
    try {
      if (window.GTREND && typeof GTREND.show === 'function') GTREND.show(text);
      else if (moment) trend(moment);
    } catch (e) {}
  }
  function renderEventCard(m) {
    ensureBars();
    var el = $('#eventCard'); if (!el) return;
    if (!m) { el.classList.add('mx-hid'); el.innerHTML = ''; return; }
    var txt = '';
    if (m.kind === 'door') txt = '🚪 <b>Cửa bí mật!</b> Câu này trả lời đúng được <b>×2 điểm</b>.';
    else if (m.kind === 'fire') txt = '🔥 <b>Bẫy lửa!</b> Câu này chỉ còn <b>×0,7 thời gian</b> — nhanh tay lên!';
    else if (m.kind === 'spring') txt = m.bonusSec ? '💧 <b>Suối hồi phục!</b> Câu này được <b>+8 giây</b>.' : '💧 <b>Suối hồi phục!</b> Đã hồi lại 1 quyền trợ giúp.';
    el.innerHTML = txt; el.classList.remove('mx-hid');
  }
  /* Hồi 1 quyền trợ giúp đã dùng, ưu tiên 50/50 -> +giờ -> Đổi câu;
     trả tên quyền vừa hồi, chưa dùng cái nào thì trả null. */
  function restoreLifeline() {
    var order = [['f50', 'lf50', '✂️ 50/50'], ['time', 'lfTime', '⏱️ +10 giây'], ['swap', 'lfSwap', '🔄 Đổi câu']];
    for (var i = 0; i < order.length; i++) {
      if (usedLife[order[i][0]]) {
        usedLife[order[i][0]] = false;
        var b = $('#' + order[i][1]); if (b) b.disabled = false;
        return order[i][2];
      }
    }
    return null;
  }
  /* Trạm nghỉ: mỗi tầng trạm chỉ kích hoạt 1 lần/lượt (restVisited).
     key là 5/15/25 khi đặt chân tới, hoặc 10/20 khi vừa qua cổng. */
  function applyRest(key) {
    if (restVisited[key]) return false;
    restVisited[key] = true;
    var got = restoreLifeline();
    if (got) notifyInfo('🏕️ Trạm nghỉ tầng ' + key + ': hồi lại quyền trợ giúp ' + got + ' cho ' + callName() + '!', 'trogiup');
    else {
      score += 150; $('#sc').textContent = '⭐ ' + score;
      notifyInfo('🏕️ Trạm nghỉ tầng ' + key + ': ' + callName() + ' chưa dùng trợ giúp nào nên nhận +150 điểm tiếp tế!', 'dung');
    }
    sfx('click');
    return true;
  }
  function familyOf(q) {
    var t = (q && q.type) || '';
    if (t === 'kanji') return 'kanji';
    if (t === 'vocab') return 'vocab';
    return 'grammar'; /* grammar/part/fill/order cùng họ ngữ pháp */
  }
  /* Sự kiện ngẫu nhiên: CHỈ đặt nextMod cho câu kế tiếp + hiện thẻ nhỏ.
     Điều kiện rút (tầng thường, không trạm/cổng, không 2 lần liên tiếp,
     25%) do answer() lọc trước khi gọi. */
  function rollEvent() {
    var kinds = ['door', 'fire', 'spring'];
    var kind = kinds[Math.random() * kinds.length | 0];
    if (kind === 'door') {
      nextMod = { kind: 'door', scoreMul: 2 };
      /* Đang chọn mix: câu thưởng lấy topic KHÁC họ câu vừa rồi; đang chọn
         topic chuyên thì giữ nguyên lựa chọn (không đặt pendingDoorTopic). */
      if (st.topic === 'mix') {
        var fam = familyOf(cur);
        pendingDoorTopic = fam === 'kanji' ? 'vocab' : fam === 'vocab' ? 'grammar' : 'kanji';
        doorPool = []; doorQi = 0;
      }
    } else if (kind === 'fire') {
      nextMod = { kind: 'fire', timeMul: 0.7 };
    } else {
      var got = restoreLifeline();
      if (got) {
        nextMod = { kind: 'spring' };
        notifyInfo('💧 Suối hồi phục! Hồi lại quyền trợ giúp ' + got + ' cho ' + callName() + '.', 'trogiup');
      } else nextMod = { kind: 'spring', bonusSec: 8 };
    }
    renderEventCard(nextMod);
  }
  function startGate(at) {
    gate = { at: at, got: 0, wrong: 0, left: 3, boss: gateBoss(at) };
    gatePool = []; gateQi = 0;
    activeMod = null; nextMod = null; renderEventCard(null);
    updateGateCard();
    try { if (window.GTREND && typeof GTREND.show === 'function') GTREND.show('🚪 Cổng tầng ' + at + ': ' + gate.boss.emoji + ' ' + (gate.boss.name || 'Trùm cổng') + ' trấn giữ! Đúng ít nhất 2/3 câu để qua cổng nhé ' + callName() + '!'); } catch (e) {}
    sfx('click');
  }
  function updateGateCard() {
    ensureBars();
    var el = $('#gateCard'); if (!el) return;
    if (!gate) { el.classList.add('mx-hid'); el.innerHTML = ''; return; }
    var b = gate.boss || {};
    el.innerHTML = '<div class="tw-gate-face">' + esc(b.emoji || '👹') + '</div><div class="mx-grow">' +
      '<b>🚪 Cổng trùm tầng ' + gate.at + '</b> — ' + esc(b.name || 'Trùm cổng') +
      (b.line ? '<div class="tw-gate-line">“' + esc(b.line) + '”</div>' : '') +
      '<div>⚔️ Câu ' + Math.min(3, 3 - gate.left + 1) + '/3 · ✅ Đúng ' + gate.got + ' · ❌ Sai ' + gate.wrong + ' · Cần đúng ≥2/3 · ⏱️ Giờ/câu ×0,85</div>' +
      '<div class="tw-gate-warn">Qua cổng: ' + (gate.at === 30 ? 'THẮNG lượt — lên đỉnh tháp 🏯' : 'leo tiếp tầng ' + (gate.at + 1) + ' + đặt 🔒 checkpoint tầng ' + gate.at) + ' · Thua cổng: rơi về tầng ' + gateFallDest(gate.at) + '</div></div>';
    el.classList.remove('mx-hid');
  }

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
    var m = $('#menu'), rec = getRec();
    m.innerHTML =
      '<div class="mx-card"><div class="mx-big-emoji">🏯</div>' +
      '<h1>Leo tháp Tengu</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Mỗi tầng là một câu hỏi. Đúng thì leo lên, sai hoặc hết giờ thì rơi xuống 1 tầng. Càng lên cao, thời gian mỗi câu càng ngắn. Có 3 quyền trợ giúp dùng 1 lần mỗi lượt. Đích là <b>tầng 30 🏯</b>: cổng trùm mini ở tầng 10/20/30, qua cổng 10/20 được 🔒 checkpoint (rơi không xuống dưới), trạm nghỉ mỗi 5 tầng hồi lại 1 trợ giúp.</p>' +
      (rec ? '<p class="tw-rec">🏅 Kỷ lục ' + esc(st.lv) + ' của ' + esc(callName()) + ': tầng ' + rec.floor + ' · ' + rec.score + ' điểm</p>' : '') +
      '<h2>Trình độ</h2><div class="mx-seg lv" data-seg="lv">' + LEVELS.map(function (l) { return '<button type="button" data-v="' + l + '" class="' + (l === st.lv ? 'on' : '') + '">' + l + '</button>'; }).join('') + '</div>' +
      '<h2>Chủ đề</h2>' + segHTML(Object.keys(TOPICS).map(function (k) { return { v: k, n: TOPICS[k] }; }), st.topic, 'topic') +
      '<h2>Độ khó</h2>' + segHTML(Object.keys(DIFF).map(function (k) { return { v: k, n: DIFF[k].n, sub: DIFF[k].s + 's/câu ở tầng 1' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') }; }), st.diff, 'diff') +
      '<div id="ltPlusLoadout"></div>' +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Bắt đầu leo ▶</button></div>';
    bindSeg(m, 'lv', function (v) { st.lv = v; buildMenu(); });
    bindSeg(m, 'topic', function (v) { st.topic = v; });
    bindSeg(m, 'diff', function (v) { st.diff = v; });
    if (window.GPLUS) GPLUS.mountLoadout($('#ltPlusLoadout'));
    $('#btnGo').addEventListener('click', start);
  }

  function drawTower() {
    var tw = $('#tw'); tw.innerHTML = '';
    for (var f = Math.max(1, floor - 3); f <= floor + 4; f++) {
      var d = document.createElement('div');
      d.className = 'tw-fl' + (f === floor ? ' cur' : f < floor ? ' done' : '');
      var mile = f % 5 === 0 ? ' ⭐ mốc' : '';
      /* Nhãn mở rộng: 🔒 checkpoint tại 10/20 đã qua cổng, 🚪 cổng trùm
         10/20/30 chưa qua, 🏕️ trạm nghỉ mỗi 5 tầng (10/20 tính khi qua cổng) */
      if (!endless && f === checkpoint && (f === 10 || f === 20)) mile += ' 🔒 checkpoint';
      if (isGateFloor(f)) mile += gatePassed[f] ? ' ✔ đã qua cổng' : (endless ? '' : (f === 30 ? ' 🚪 cổng đỉnh tháp' : ' 🚪 cổng trùm'));
      if (isStationFloor(f) || f === 10 || f === 20) mile += ' 🏕️ trạm nghỉ';
      d.innerHTML = '<span class="mx-grow">' + (f === floor ? '🧗 ' : f < floor ? '✅ ' : '') + 'Tầng ' + f + '<small>' + esc(st.lv) + ' · ' + secForFloor(f).toFixed(1) + 's' + mile + '</small></span>';
      tw.appendChild(d);
    }
    $('#fh').textContent = 'Tầng ' + floor;
    $('#lt').textContent = st.lv + ' · ' + TOPICS[st.topic];
    if (gate) $('#mileInfo').textContent = '🚪 Đang đánh cổng tầng ' + gate.at + ': đúng ' + gate.got + '/3 câu (cần ≥2)';
    else if (endless) $('#mileInfo').textContent = '♾️ Leo vô tận — không checkpoint, không cổng · Cao nhất: tầng ' + topFloor;
    else $('#mileInfo').textContent = 'Mốc tiếp theo: tầng ' + (Math.floor(floor / 5) * 5 + 5) + (checkpoint >= 10 ? ' · 🔒 Checkpoint: tầng ' + checkpoint : '') + ' · Đích: tầng 30 🏯';
    var rec = getRec();
    $('#recInfo').textContent = rec ? '🏅 Kỷ lục ' + st.lv + ': tầng ' + rec.floor + ' · ' + rec.score + ' điểm' : '';
  }

  function armTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (isPaused()) return;
      var left = limMs - (Date.now() - t0);
      $('#tBar').style.width = Math.max(0, left / limMs * 100) + '%';
      $('#tTxt').textContent = (Math.max(0, left) / 1000).toFixed(1) + 's';
      if (left <= 0) { stopTimer(); if (timerCb) timerCb(); }
    }, 50);
  }
  function startTimer(sec, onTimeout) {
    stopTimer(); limMs = sec * 1000; t0 = Date.now(); timerCb = onTimeout; timerLive = true;
    armTimer();
  }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; timerLive = false; }
  /* FIX3: dừng interval mà KHÔNG hủy trạng thái đồng hồ (khác stopTimer). */
  function suspendTimer() { if (timer) clearInterval(timer); timer = null; }

  function showError(msg) {
    stopTimer();
    if (pauseCtl) pauseCtl.setVisible(false);
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-err"><div class="mx-big-emoji">🌧️</div><h1>Chưa lấy được câu hỏi</h1>' +
      '<p class="mx-mut">' + esc(msg) + '</p><div style="height:12px"></div>' +
      '<button class="mx-btn" id="btnRetry" type="button">Về menu</button></div>';
    $('#btnRetry').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  function start() {
    floor = 1; topFloor = 1; score = 0; okCount = 0; streak = 0; best = 0; asked = 0; qi = 0; pool = [];
    usedLife = { f50: false, time: false, swap: false };
    ['lf50', 'lfTime', 'lfSwap'].forEach(function (id) { $('#' + id).disabled = false; });
    /* Reset toàn bộ trạng thái mở rộng cho lượt mới */
    checkpoint = 0; gate = null; gatePassed = {}; restVisited = {}; endless = false; winScreen = false;
    hasWon = false; winSubmitBase = 0; needGateResolve = null;
    gatePool = []; gateQi = 0; doorPool = []; doorQi = 0; pendingDoorTopic = null;
    nextMod = null; activeMod = null;
    ensureBars(); renderEventCard(null); updateGateCard();
    var ti = $('#twInfo'); if (ti) { ti.classList.add('mx-hid'); ti.textContent = ''; }
    startT = Date.now(); needNext = false;
    if (window.GPLUS) GPLUS.beginMatch();
    if (pauseCtl) pauseCtl.setVisible(true);
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid'); $('#play').classList.remove('mx-hid');
    $('#sc').textContent = '⭐ 0';
    music('normal'); trend('vao');
    loadMore(14).then(next).catch(function () {
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
  function fetchTopicQ(topic, count) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: topic, count: count });
  }
  /* Pool RIÊNG cho trận cổng: luôn topic mix, không đụng pool leo thường */
  function takeGateQ() {
    if (gateQi >= gatePool.length) return fetchTopicQ('mix', 10).then(function (qs) {
      gatePool = gatePool.concat(usable(qs));
      return gateQi < gatePool.length ? gatePool[gateQi++] : null;
    }).catch(function () { return null; });
    return Promise.resolve(gatePool[gateQi++]);
  }
  /* Pool RIÊNG cho câu thưởng 🚪 khi đang chọn mix (topic khác họ câu trước);
     lấy lỗi/trống thì lùi về pool thường để không kẹt lượt. */
  function takeDoorQ() {
    if (doorQi >= doorPool.length) return fetchTopicQ(pendingDoorTopic || 'mix', 6).then(function (qs) {
      doorPool = doorPool.concat(usable(qs));
      return doorQi < doorPool.length ? doorPool[doorQi++] : takeQ();
    }).catch(function () { return takeQ(); });
    return Promise.resolve(doorPool[doorQi++]);
  }

  function next(keepTime) {
    if (isPaused()) { needNext = true; return; }
    /* Tới tầng cổng chưa qua trong lượt (và chưa vào vô tận) -> mở trận cổng */
    if (!gate && !endless && isGateFloor(floor) && !gatePassed[floor]) startGate(floor);
    var inGate = !!gate;
    /* Tiêu thụ hệ số sự kiện đúng 1 câu: nextMod -> activeMod */
    activeMod = inGate ? null : nextMod; nextMod = null;
    renderEventCard(activeMod);
    var take;
    if (inGate) take = takeGateQ();
    else if (activeMod && activeMod.kind === 'door' && pendingDoorTopic) { take = takeDoorQ(); pendingDoorTopic = null; }
    else take = takeQ();
    take.then(function (q) {
      if (!q) return end();
      cur = q; lock = false; asked++;
      var qb = $('#qBox'); qb.textContent = q.prompt || '';
      qb.classList.toggle('long', (q.prompt || '').length > 14);
      qb.classList.toggle('tw-q-bonus', !!(activeMod && activeMod.kind === 'door'));
      var tm = $('.mx-timer'); if (tm) tm.classList.toggle('tw-timer-fire', !!(activeMod && activeMod.kind === 'fire'));
      $('#qSub').textContent = q.promptSub || '';
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      drawTower();
      if (gate) updateGateCard();
      /* Giờ câu: cổng = secForFloor(tầng cổng) x0,85; sự kiện áp tiếp lên trên.
         Vẫn là startTimer duy nhất của trang nên pause fix3 đông cứng cả cổng. */
      var sec = gate ? secForFloor(gate.at) * 0.85 : secForFloor(floor);
      if (activeMod) {
        if (activeMod.timeMul) sec = sec * activeMod.timeMul;
        if (activeMod.bonusSec) sec += activeMod.bonusSec;
      }
      startTimer(sec, function () { if (!lock) { lock = true; if (gate) answerGate(false, null); else fall(true); } });
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
        if (isPaused() || lock || b.classList.contains('used')) return;
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
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '🧗 Leo lên';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      answer(orderRight(q, got), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (isPaused() || lock) return; lock = true; stopTimer();
    /* GAME-PLUS: đáp án SAI chảy tiếp qua fall()/answerGate() (kể cả
       đường hết giờ gọi thẳng 2 hàm đó) nên ghi câu sai + khiên đặt ở
       đó để không ghi/không đỡ 2 lần; ở đây chỉ ghi khi ĐÚNG. */
    if (right) { window.GPLUS_TRACK && GPLUS_TRACK(cur, right); }
    if (gate) { answerGate(right, btn); return; }
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak); fx('burst', btn || $('#fh'));
      var prevFloor = floor, hadMod = !!activeMod;
      var pts = Math.round(100 * Math.max(1, floor / 3) * DIFF[st.diff].x);
      if (activeMod && activeMod.scoreMul) pts = pts * activeMod.scoreMul; /* 🚪 x2 điểm */
      if (window.GPLUS) pts = pts * GPLUS.scoreMul(); /* 🔥 GAME-PLUS x2 */
      score += pts;
      $('#sc').textContent = '⭐ ' + score;
      floor++; topFloor = Math.max(topFloor, floor);
      if ((floor - 1) % 5 === 0) { trend('combo'); fx('confetti'); }
      else trend(streak >= 3 ? 'combo' : 'dung');
      sfx('hit');
      drawTower();
      /* Trạm nghỉ 5/15/25: đặt chân tới là kích hoạt (1 lần/lượt) */
      var landedStation = isStationFloor(floor);
      if (landedStation) applyRest(floor);
      /* Sự kiện 25%: chỉ sau câu đúng ở tầng thường — không ở tầng trạm/cổng,
         không khi câu vừa rồi đã mang 1 sự kiện (chống 2 lần liên tiếp) */
      if (!landedStation && !hadMod && !isStationFloor(prevFloor) && !isGateFloor(prevFloor) && !isGateFloor(floor) && Math.random() < 0.25) rollEvent();
      setTimeout(function () { next(); }, 800);
    } else {
      if (btn) btn.classList.add('bad');
      revealChoices();
      fall(false);
    }
  }
  function fall(timeout) {
    stopTimer();
    window.GPLUS_TRACK && GPLUS_TRACK(cur, false);
    var __pr = window.GPLUS ? GPLUS.onAnswer(false) : null;
    /* Khiên GAME-PLUS: đỡ đúng phần mất streak/combo, vẫn rơi tầng như cũ. */
    if (__pr && __pr.shieldUsed) { fx('comboPop', streak); } else { streak = 0; fx('comboPop', 0); }
    fx('shake', $('#tw'));
    sfx('fall');
    trend('roi'); /* khoảnh khắc rơi tầng — bắt buộc theo giao việc (chỉ 1 câu để không chồng lời đọc) */
    /* Checkpoint: đã qua cổng 10/20 thì rơi không xuống dưới tầng đó
       (chế độ vô tận sau đỉnh thì tắt checkpoint, sàn là tầng 1 như cũ) */
    var dest = Math.max(endless ? 1 : Math.max(1, checkpoint), floor - 1);
    /* Hồi sinh GAME-PLUS (nối khi đăng): cú rơi này THẬT SỰ làm mất tầng
       (dest < floor) mà người chơi còn Hồi sinh -> trừ kỹ năng, giữ
       nguyên tầng và leo tiếp. Đang đứng ở sàn (dest == floor) thì
       không tốn Hồi sinh. */
    if (dest < floor && window.GPLUS && GPLUS.tryRevive()) {
      notifyInfo('❤️‍🩹 Hồi sinh! ' + callName() + ' bám trụ ở tầng ' + floor + ' thay vì rơi xuống tầng ' + dest + '.', 'thang');
      drawTower();
      setTimeout(function () { next(); }, 1150);
      return;
    }
    floor = dest;
    drawTower();
    setTimeout(function () { next(); }, 1150);
  }

  /* ---------- Trận cổng trùm mini (3 câu mix, giờ x0,85) ----------
     Đúng/sai trong cổng KHÔNG cộng/trừ tầng, chỉ tính vào gate;
     điểm vẫn cộng như câu thường theo tầng cổng. Chơi đủ 3 câu rồi
     mới chốt: got >= 2 -> qua, ngược lại -> rơi về gateFallDest. */
  function answerGate(right, btn) {
    stopTimer();
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak); fx('burst', btn || $('#fh'));
      score += Math.round(100 * Math.max(1, gate.at / 3) * DIFF[st.diff].x);
      $('#sc').textContent = '⭐ ' + score;
      trend(streak >= 3 ? 'combo' : 'dung'); sfx('hit');
    } else {
      if (btn) btn.classList.add('bad');
      revealChoices();
      window.GPLUS_TRACK && GPLUS_TRACK(cur, false);
      var __prG = window.GPLUS ? GPLUS.onAnswer(false) : null;
      /* Khiên GAME-PLUS trong cổng: đỡ đúng phần mất streak/combo. */
      if (__prG && __prG.shieldUsed) { fx('comboPop', streak); } else { streak = 0; fx('comboPop', 0); }
      fx('shake', $('#tw'));
      trend('roi'); sfx('fall');
    }
    gate.got += right ? 1 : 0;
    gate.wrong += right ? 0 : 1;
    gate.left--;
    updateGateCard(); drawTower();
    if (gate.left > 0) { setTimeout(function () { next(); }, right ? 800 : 1150); return; }
    var g = gate;
    setTimeout(function () {
      /* Tôn trọng pause fix3: đang dừng thì hoãn chốt cổng tới onResume */
      if (isPaused()) { needGateResolve = g; return; }
      resolveGate(g);
    }, right ? 800 : 1150);
  }
  function resolveGate(g) {
    if (!g || gate !== g) return;
    gate = null; updateGateCard();
    var at = g.at;
    if (g.got >= 2) {
      gatePassed[at] = true;
      fx('confetti'); sfx('victory');
      if (at === 30) { topFloor = Math.max(topFloor, 30); winRun(); return; }
      checkpoint = at;
      floor = at + 1; topFloor = Math.max(topFloor, floor);
      notifyInfo('🎉 ' + callName() + ' đã qua cổng tầng ' + at + ' (' + g.got + '/3 câu đúng)! Đặt 🔒 checkpoint tại tầng ' + at + '.', 'thang');
      applyRest(at); /* qua cổng 10/20 cũng tính là trạm nghỉ */
      drawTower();
      setTimeout(function () { next(); }, 900);
      return;
    }
    var dest = gateFallDest(at);
    /* Hồi sinh GAME-PLUS (nối khi đăng): thua cổng mà còn Hồi sinh ->
       trừ kỹ năng, đánh LẠI cổng tầng này thay vì rơi về tầng đích. */
    if (window.GPLUS && GPLUS.tryRevive()) {
      notifyInfo('❤️‍🩹 Hồi sinh! ' + callName() + ' được đánh lại cổng tầng ' + at + ' thay vì rơi về tầng ' + dest + '.', 'thang');
      startGate(at);
      drawTower();
      setTimeout(function () { next(); }, 1150);
      return;
    }
    floor = dest; streak = 0;
    fx('shake', $('#tw')); sfx('fall');
    notifyInfo('💥 Chưa qua được cổng tầng ' + at + ' (đúng ' + g.got + '/3 câu). ' + callName() + ' rơi về tầng ' + dest + ' rồi leo lại nhé!', 'roi');
    drawTower();
    setTimeout(function () { next(); }, 1150);
  }
  /* THẮNG lượt ở cổng 30: GFIN như mốc thắng sẵn có + nộp điểm + màn riêng.
     Điểm đã nộp ở đây được ghi winSubmitBase để nếu leo tiếp vô tận rồi
     kết thúc, end() chỉ nộp phần điểm kiếm thêm (không nộp trùng). */
  function winRun() {
    stopTimer();
    if (window.GPLUS) GPLUS.endMatch();
    if (pauseCtl) pauseCtl.setVisible(false);
    hasWon = true;
    if (window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: document.querySelector('#tw .tw-fl.cur'), toEl: null, dmg: score, label: 'ĐỈNH THÁP 30!' }); else GFIN.play({ fromEl: document.querySelector('#tw .tw-fl.cur'), toEl: null, dmg: score, label: 'ĐỈNH THÁP 30!' }); } catch (e) {} }
    $('#play').classList.add('mx-hid');
    lastIsRec = saveRec();
    submitScore(score, startT); winSubmitBase = score;
    sfx('victory');
    renderWin();
  }
  function renderWin() {
    winScreen = true;
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result tw-win"><div class="mx-big-emoji mx-pop">🏯</div>' +
      '<h1>🎉 Lên đỉnh tháp!</h1>' +
      '<p class="mx-mut">' + esc(callName()) + ' đã qua cổng trùm tầng 30 và chinh phục Đỉnh tháp Tengu! ' + (lastIsRec ? 'Đây là kỷ lục mới của ' + esc(st.lv) + ' đó 🎉' : '') + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + '/' + asked + ' đúng</span><span class="mx-pill">⚡ Chuỗi ' + best + '</span><span class="mx-pill">🏯 Đỉnh tầng 30</span></div>' +
      '<button class="mx-btn" id="btnEndless" type="button">♾️ Leo tiếp vô tận</button><div style="height:8px"></div>' +
      '<button class="mx-btn alt" id="btnWinEnd" type="button">Kết thúc lượt</button></div>';
    $('#btnEndless').addEventListener('click', function () {
      /* Vô tận: tắt checkpoint + cổng, giữ luật cũ (+1/-1 tầng, giờ giảm dần) */
      if (window.GPLUS) GPLUS.beginMatch(); /* ván mới sau khi winRun đã endMatch */
      endless = true; floor = 31; topFloor = Math.max(topFloor, floor);
      r.classList.add('mx-hid'); $('#play').classList.remove('mx-hid');
      if (pauseCtl) pauseCtl.setVisible(true);
      notifyInfo('♾️ Chế độ leo vô tận: không checkpoint, không cổng trùm — cứ leo tiếp thôi ' + callName() + '!', 'vao');
      drawTower(); next();
    });
    $('#btnWinEnd').addEventListener('click', function () { renderResult(); });
  }

  /* Trợ giúp — mỗi loại 1 lần/lượt */
  function bindLifelines() {
    $('#lf50').addEventListener('click', function () {
      if (isPaused() || usedLife.f50 || lock || !cur || !cur.choices) return;
      usedLife.f50 = true; this.disabled = true; trend('trogiup'); sfx('click');
      var ci = correctIdx(cur), k = 0;
      $$('#optBox .mx-opt').forEach(function (b, i) { if (i !== ci && k < 2) { b.classList.add('gone'); k++; } });
    });
    $('#lfTime').addEventListener('click', function () {
      if (isPaused() || usedLife.time || lock) return;
      usedLife.time = true; this.disabled = true; trend('trogiup'); sfx('click');
      limMs += 10000;
    });
    $('#lfSwap').addEventListener('click', function () {
      if (isPaused() || usedLife.swap || lock) return;
      usedLife.swap = true; this.disabled = true; trend('doicau'); sfx('click');
      /* Đổi câu không làm mất hệ số sự kiện của câu đang chơi */
      if (activeMod && !nextMod) nextMod = activeMod;
      asked--; next();
    });
    $('#btnQuit').addEventListener('click', end);
  }

  var lastIsRec = false;
  function end() {
    if ($('#play').classList.contains('mx-hid')) return;
    if (window.GPLUS) GPLUS.endMatch();
    if (pauseCtl) pauseCtl.setVisible(false);
    stopTimer();
    /* Kết liễu BOSS (đợt 4): chỉ khi đạt ngưỡng thắng sẵn có (tầng 10+);
       chế độ chưa có boss -> playBoss tự lấy GBOSS.next() không trùng. */
    if (topFloor >= 10 && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: document.querySelector('#tw .tw-fl.cur'), toEl: null, dmg: score, label: 'TẦNG ' + topFloor + '!' }); else GFIN.play({ fromEl: document.querySelector('#tw .tw-fl.cur'), toEl: null, dmg: score, label: 'TẦNG ' + topFloor + '!' }); } catch (e) {} }
    $('#play').classList.add('mx-hid');
    lastIsRec = saveRec();
    /* Đã thắng ở cổng 30 thì điểm tới đỉnh đã nộp ở winRun(); kết thúc sau
       chặng vô tận chỉ nộp phần điểm kiếm thêm để không trùng điểm. */
    var toSubmit = hasWon ? (score - winSubmitBase) : score;
    if (toSubmit > 0 || !hasWon) submitScore(toSubmit, startT);
    sfx(topFloor >= 10 ? 'victory' : 'click');
    renderResult();
  }
  /* Chỉ DỰNG HTML màn kết quả từ state hiện tại (saveRec/submitScore/sfx nằm
     ở end(), KHÔNG chạy lại ở đây); gọi lại khi tên người chơi resolve muộn
     để dòng chữ dùng tên mới nhất. */
  function renderResult() {
    winScreen = false;
    var isRec = lastIsRec;
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">🏯</div>' +
      '<h1>Lên tới tầng ' + topFloor + '!</h1>' +
      '<p class="mx-mut">' + esc(callName()) + ' leo giỏi thật! ' + (isRec ? 'Đây là kỷ lục mới của ' + esc(st.lv) + ' đó 🎉' : 'Lần sau thử chinh phục tầng ' + (topFloor + 5) + ' nhé!') + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + '/' + asked + ' đúng</span><span class="mx-pill">⚡ Chuỗi ' + best + '</span><span class="mx-pill">🏯 Tầng cao nhất ' + topFloor + '</span></div>' +
      '<button class="mx-btn" id="btnAgain" type="button">Leo lại</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  /* FIX3: gắn nút Tạm dừng (pause.js). onResume cộng đúng số ms đã
     dừng vào t0 (đồng hồ câu tính bằng Date.now()-t0) và startT (thời
     lượng ván) nên đồng hồ chạy tiếp từ đúng giá trị đã dừng. */
  /* GAME-PLUS: phép dời giờ DÙNG CHUNG cho onResume của GPAUSE và kỹ
     năng Đóng băng — cộng dur vào t0 (mốc đồng hồ câu) + startT. */
  function shiftLtTime(dur) { t0 += dur; startT += dur; }
  if (window.GPLUS) {
    GPLUS.setHudHost($('#ltPlusHud'));
    GPLUS.setFreezeHandler(function () {
      if (!timerLive || lock) return false;
      shiftLtTime(5000);
      return true;
    });
    GPLUS.setHintHandler(function () {
      if (!cur || lock || !cur.choices) return false;
      var ci = correctIdx(cur), done = false;
      $$('#optBox .mx-opt').forEach(function (b, i) {
        if (!done && i !== ci && !b.classList.contains('gone') && !b.disabled) { b.classList.add('gone'); done = true; }
      });
      return done;
    });
  }
  if (window.GPAUSE && typeof window.GPAUSE.create === 'function') {
    pauseCtl = window.GPAUSE.create({
      btnHost: $('#pauseSlot') || $('#play'),
      exitLabel: 'Dừng leo & nhận kết quả',
      isPlaying: function () { return !$('#play').classList.contains('mx-hid'); },
      onPause: function () { suspendTimer(); },
      onResume: function (dur) {
        shiftLtTime(dur);
        if (timerLive) armTimer();
        if (needGateResolve) { var gr = needGateResolve; needGateResolve = null; resolveGate(gr); }
        else if (needNext) { needNext = false; next(); }
      },
      onExit: function () { end(); }
    });
  }

  bindUserEvent();
  loadUser().then(function () { ensureBars(); buildMenu(); bindLifelines(); });
})();
