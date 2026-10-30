/* leo-thap.js — Nhánh 3: Leo tháp. Leo tầng liên tục, sai/hết giờ = rơi 1 tầng
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

  var st = { lv: 'N5', diff: 'tb', topic: 'mix' };
  var floor = 1, topFloor = 1, score = 0, okCount = 0, streak = 0, best = 0, asked = 0,
      lock = false, pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0,
      usedLife = { f50: false, time: false, swap: false };
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
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Mỗi tầng là một câu hỏi. Đúng thì leo lên, sai hoặc hết giờ thì rơi xuống 1 tầng. Càng lên cao, thời gian mỗi câu càng ngắn. Có 3 quyền trợ giúp dùng 1 lần mỗi lượt.</p>' +
      (rec ? '<p class="tw-rec">🏅 Kỷ lục ' + esc(st.lv) + ' của ' + esc(callName()) + ': tầng ' + rec.floor + ' · ' + rec.score + ' điểm</p>' : '') +
      '<h2>Trình độ</h2><div class="mx-seg lv" data-seg="lv">' + LEVELS.map(function (l) { return '<button type="button" data-v="' + l + '" class="' + (l === st.lv ? 'on' : '') + '">' + l + '</button>'; }).join('') + '</div>' +
      '<h2>Chủ đề</h2>' + segHTML(Object.keys(TOPICS).map(function (k) { return { v: k, n: TOPICS[k] }; }), st.topic, 'topic') +
      '<h2>Độ khó</h2>' + segHTML(Object.keys(DIFF).map(function (k) { return { v: k, n: DIFF[k].n, sub: DIFF[k].s + 's/câu ở tầng 1' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') }; }), st.diff, 'diff') +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Bắt đầu leo ▶</button></div>';
    bindSeg(m, 'lv', function (v) { st.lv = v; buildMenu(); });
    bindSeg(m, 'topic', function (v) { st.topic = v; });
    bindSeg(m, 'diff', function (v) { st.diff = v; });
    $('#btnGo').addEventListener('click', start);
  }

  function drawTower() {
    var tw = $('#tw'); tw.innerHTML = '';
    for (var f = Math.max(1, floor - 3); f <= floor + 4; f++) {
      var d = document.createElement('div');
      d.className = 'tw-fl' + (f === floor ? ' cur' : f < floor ? ' done' : '');
      var mile = f % 5 === 0 ? ' ⭐ mốc' : '';
      d.innerHTML = '<span class="mx-grow">' + (f === floor ? '🧗 ' : f < floor ? '✅ ' : '') + 'Tầng ' + f + '<small>' + esc(st.lv) + ' · ' + secForFloor(f).toFixed(1) + 's' + mile + '</small></span>';
      tw.appendChild(d);
    }
    $('#fh').textContent = 'Tầng ' + floor;
    $('#lt').textContent = st.lv + ' · ' + TOPICS[st.topic];
    $('#mileInfo').textContent = 'Mốc tiếp theo: tầng ' + (Math.floor(floor / 5) * 5 + 5);
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
    startT = Date.now(); needNext = false;
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

  function next(keepTime) {
    if (isPaused()) { needNext = true; return; }
    takeQ().then(function (q) {
      if (!q) return end();
      cur = q; lock = false; asked++;
      var qb = $('#qBox'); qb.textContent = q.prompt || '';
      qb.classList.toggle('long', (q.prompt || '').length > 14);
      $('#qSub').textContent = q.promptSub || '';
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      drawTower();
      startTimer(secForFloor(floor), function () { if (!lock) { lock = true; fall(true); } });
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
      answer(norm(got) === norm(q.answerText), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (isPaused() || lock) return; lock = true; stopTimer();
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak); fx('burst', btn || $('#fh'));
      score += Math.round(100 * Math.max(1, floor / 3) * DIFF[st.diff].x);
      $('#sc').textContent = '⭐ ' + score;
      floor++; topFloor = Math.max(topFloor, floor);
      if ((floor - 1) % 5 === 0) { trend('combo'); fx('confetti'); }
      else trend(streak >= 3 ? 'combo' : 'dung');
      sfx('hit');
      drawTower();
      setTimeout(function () { next(); }, 800);
    } else {
      if (btn) btn.classList.add('bad');
      revealChoices();
      fall(false);
    }
  }
  function fall(timeout) {
    stopTimer();
    streak = 0; fx('comboPop', 0); fx('shake', $('#tw'));
    sfx('fall');
    trend('roi'); /* khoảnh khắc rơi tầng — bắt buộc theo giao việc (chỉ 1 câu để không chồng lời đọc) */
    floor = Math.max(1, floor - 1);
    drawTower();
    setTimeout(function () { next(); }, 1150);
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
      asked--; next();
    });
    $('#btnQuit').addEventListener('click', end);
  }

  var lastIsRec = false;
  function end() {
    if ($('#play').classList.contains('mx-hid')) return;
    if (pauseCtl) pauseCtl.setVisible(false);
    stopTimer();
    /* Kết liễu BOSS (đợt 4): chỉ khi đạt ngưỡng thắng sẵn có (tầng 10+);
       chế độ chưa có boss -> playBoss tự lấy GBOSS.next() không trùng. */
    if (topFloor >= 10 && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: document.querySelector('#tw .tw-fl.cur'), toEl: null, dmg: score, label: 'TẦNG ' + topFloor + '!' }); else GFIN.play({ fromEl: document.querySelector('#tw .tw-fl.cur'), toEl: null, dmg: score, label: 'TẦNG ' + topFloor + '!' }); } catch (e) {} }
    $('#play').classList.add('mx-hid');
    lastIsRec = saveRec();
    submitScore(score, startT);
    sfx(topFloor >= 10 ? 'victory' : 'click');
    renderResult();
  }
  /* Chỉ DỰNG HTML màn kết quả từ state hiện tại (saveRec/submitScore/sfx nằm
     ở end(), KHÔNG chạy lại ở đây); gọi lại khi tên người chơi resolve muộn
     để dòng chữ dùng tên mới nhất. */
  function renderResult() {
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
  if (window.GPAUSE && typeof window.GPAUSE.create === 'function') {
    pauseCtl = window.GPAUSE.create({
      btnHost: $('#pauseSlot') || $('#play'),
      exitLabel: 'Dừng leo & nhận kết quả',
      isPlaying: function () { return !$('#play').classList.contains('mx-hid'); },
      onPause: function () { suspendTimer(); },
      onResume: function (dur) {
        t0 += dur; startT += dur;
        if (timerLive) armTimer();
        if (needNext) { needNext = false; next(); }
      },
      onExit: function () { end(); }
    });
  }

  bindUserEvent();
  loadUser().then(function () { buildMenu(); bindLifelines(); });
})();
