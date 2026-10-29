/* chay-vo-tan.js — Nhánh 3: Chạy vô tận (theo bản mẫu mau-game-b).
   Chạy liên tục: chọn làn có đáp án đúng trước khi cổng chạm tới. Nhịp nhanh dần
   theo số cổng đã qua. Sai 3 lần (hết tim) hoặc để cổng qua khi sai = mất tim;
   hết tim thì game over. Điểm = đáp án đúng + quãng đường. Câu hỏi qua GQ
   (topic vocab, hook an toàn), nhạc GMUSIC 'normal', điểm nộp GAME_API. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var DIFF = { de: { n: 'Dễ', s: 9, x: 1 }, tb: { n: 'Trung bình', s: 6.5, x: 1 }, kho: { n: 'Khó', s: 4.5, x: 2 } };
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(function (u) { if (u) for (var k in u) user[k] = u[k]; return user; }).catch(function () { return user; });
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
      var r = GAME_API.submitScore({ mode: 'chay-vo-tan', level: st.lv, score: Math.round(score), durationMs: Date.now() - t0 });
      if (r && r.catch) r.catch(function () {});
    }
  } catch (e) {} }
  function fetchQ(count) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: 'vocab', count: count });
  }
  function usable(qs) {
    return (qs || []).filter(function (q) { return q && q.choices && q.choices.length >= 3 && correctIdx(q) >= 0; });
  }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }

  var st = { lv: 'N5', diff: 'tb' };
  var playing = false, lane = 1, score = 0, combo = 0, bestCombo = 0, lives = 3, dist = 0, gates = 0,
      pool = [], qi = 0, cur = null, curOpts = [], gateT0 = 0, travelMs = 6000, raf = null,
      shield = 1, shieldOn = false, slow = 1, slowOn = false, startT = 0, lastFrame = 0, resolving = false;

  function buildMenu() {
    var m = $('#menu');
    m.innerHTML =
      '<div class="mx-card"><div class="mx-big-emoji">🏃</div>' +
      '<h1>Chạy vô tận</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Chạy vào làn mang nghĩa đúng để qua cổng. Càng chạy nhịp càng nhanh. Sai 3 lần là hết lượt. Trợ giúp mỗi lượt: 🛡️ khiên chắn 1 lần sai · 🐢 chạy chậm 1 câu.</p>' +
      '<h2>Trình độ</h2><div class="mx-seg lv" data-seg="lv">' + LEVELS.map(function (l) { return '<button type="button" data-v="' + l + '" class="' + (l === st.lv ? 'on' : '') + '">' + l + '</button>'; }).join('') + '</div>' +
      '<h2>Độ khó</h2><div class="mx-seg" data-seg="diff">' + Object.keys(DIFF).map(function (k) { return '<button type="button" data-v="' + k + '" class="' + (k === st.diff ? 'on' : '') + '">' + DIFF[k].n + '<small>' + DIFF[k].s + 's/cổng' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') + '</small></button>'; }).join('') + '</div>' +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Xuất phát ▶</button></div>';
    bindSeg(m, 'lv', function (v) { st.lv = v; });
    bindSeg(m, 'diff', function (v) { st.diff = v; });
    $('#btnGo').addEventListener('click', start);
  }
  function bindSeg(root, attr, cb) {
    $$('[data-seg="' + attr + '"] button', root).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-seg="' + attr + '"] button', root).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); cb(b.getAttribute('data-v'));
      });
    });
  }

  function showError(msg) {
    playing = false; if (raf) cancelAnimationFrame(raf);
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-err"><div class="mx-big-emoji">🌧️</div><h1>Chưa lấy được câu hỏi</h1>' +
      '<p class="mx-mut">' + esc(msg) + '</p><div style="height:12px"></div>' +
      '<button class="mx-btn" id="btnRetry" type="button">Về menu</button></div>';
    $('#btnRetry').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  function loadMore(n) {
    return fetchQ(n).then(function (qs) {
      var u = usable(qs);
      if (!u.length && !pool.length) throw new Error('empty');
      pool = pool.concat(u); return pool;
    });
  }
  function takeQ() {
    if (qi >= pool.length) return loadMore(12).then(function () { return qi < pool.length ? pool[qi++] : null; }).catch(function () { return null; });
    return Promise.resolve(pool[qi++]);
  }

  function start() {
    lane = 1; score = 0; combo = 0; bestCombo = 0; lives = 3; dist = 0; gates = 0; qi = 0; pool = [];
    shield = 1; shieldOn = false; slow = 1; slowOn = false; resolving = false;
    startT = Date.now(); lastFrame = 0;
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid'); $('#play').classList.remove('mx-hid');
    $('#btnShield').disabled = false; $('#btnShield').textContent = '🛡️ Khiên (1)';
    $('#btnSlow').disabled = false;
    updateHud(); posRunner();
    music('normal'); trend('vao');
    loadMore(14).then(function () {
      playing = true;
      nextGate();
      raf = requestAnimationFrame(loop);
    }).catch(function () {
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }
  function travelFor(g) {
    /* Nhịp nhanh dần: mỗi cổng nhanh hơn 3%, sàn 2.2s; khiên chậm x1.6 khi đang bật */
    var base = DIFF[st.diff].s * Math.pow(0.97, g);
    return Math.max(2.2, base) * (slowOn ? 1.6 : 1) * 1000;
  }
  function nextGate() {
    takeQ().then(function (q) {
      if (!playing) return;
      if (!q) { end(); return; }
      cur = q;
      var ci = correctIdx(q);
      var wrongs = shuffle(q.choices.filter(function (_, i) { return i !== ci; })).slice(0, 2);
      curOpts = shuffle([q.choices[ci]].concat(wrongs));
      $('#qBox').textContent = q.prompt || '';
      var sub = $('#qSub');
      if (q.promptSub) { sub.textContent = q.promptSub; sub.style.display = ''; } else sub.style.display = 'none';
      var gb = $('#gateBox'); gb.innerHTML = '';
      curOpts.forEach(function (o) {
        var d = document.createElement('div'); d.className = 'rn-gate'; d.textContent = o; gb.appendChild(d);
      });
      travelMs = travelFor(gates);
      gateT0 = performance.now();
      $('#road').style.animationDuration = Math.max(0.22, 0.5 * (travelMs / 6000)) + 's';
    });
  }
  function loop(t) {
    if (!playing) return;
    if (lastFrame) {
      var dt = (t - lastFrame) / 1000;
      dist += dt * (6 + gates * 0.15); /* quãng đường chạy */
      if (gates > 0) score += dt * 2;   /* điểm quãng đường nhẹ */
    }
    lastFrame = t;
    if (cur && !resolving) {
      var H = $('#stage').clientHeight;
      var y = (t - gateT0) / travelMs;
      var gb = $('#gateBox');
      gb.style.top = (118 + y * (H - 210)) + 'px';
      gb.style.transform = 'scale(' + (0.62 + y * 0.38) + ')';
      if (y >= 1) resolveGate();
    }
    $('#distBox').textContent = Math.floor(dist) + ' m';
    $('#scoreBox').textContent = '⭐ ' + Math.floor(score);
    raf = requestAnimationFrame(loop);
  }
  function resolveGate() {
    resolving = true;
    var ci = correctIdx(cur);
    var right = curOpts[lane] === cur.choices[ci];
    $$('#gateBox .rn-gate').forEach(function (g, i) { g.classList.add(curOpts[i] === cur.choices[ci] ? 'ok' : 'bad'); });
    var fl = $('#flash');
    if (right) {
      combo++; bestCombo = Math.max(bestCombo, combo);
      score += Math.round(100 * DIFF[st.diff].x * (1 + combo * 0.1));
      fl.style.background = 'rgba(24,160,88,.35)';
      sfx('beam'); fx('comboPop', combo);
      trend(combo >= 5 ? 'combo' : 'dung');
    } else if (shieldOn) {
      shieldOn = false; $('#btnShield').textContent = '🛡️ Khiên đã dùng';
      fl.style.background = 'rgba(217,168,78,.4)';
      sfx('click');
    } else {
      combo = 0; lives--;
      fl.style.background = 'rgba(207,58,46,.4)';
      sfx('wrong'); fx('shake', $('#stage')); fx('comboPop', 0);
      trend('sai');
    }
    fl.style.opacity = '1';
    setTimeout(function () { fl.style.opacity = '0'; }, 200);
    slowOn = false;
    updateHud();
    gates++;
    if (lives <= 0) { setTimeout(end, 550); playing = false; return; }
    setTimeout(function () { resolving = false; if (playing) nextGate(); }, 260);
  }
  function updateHud() {
    $('#livesBox').textContent = '❤️'.repeat(Math.max(0, lives)) + '🤍'.repeat(Math.max(0, 3 - lives));
    $('#comboBox').textContent = '🔥 ' + combo;
    $('#scoreBox').textContent = '⭐ ' + Math.floor(score);
  }
  function posRunner() { $('#runner').style.left = (lane * 33.333) + '%'; }
  function move(d) { if (!playing) return; lane = Math.max(0, Math.min(2, lane + d)); posRunner(); sfx('click'); }

  function bindControls() {
    $('#btnLeft').addEventListener('click', function () { move(-1); });
    $('#btnRight').addEventListener('click', function () { move(1); });
    $('#btnShield').addEventListener('click', function () {
      if (!shield || shieldOn) return;
      shield = 0; shieldOn = true; this.textContent = '🛡️ Khiên đang bật'; trend('trogiup');
    });
    $('#btnSlow').addEventListener('click', function () {
      if (!slow) return;
      slow = 0; slowOn = true; this.disabled = true; trend('trogiup');
      /* kéo dài cổng hiện tại tương ứng */
      gateT0 = performance.now() - (performance.now() - gateT0) / 1.6;
    });
    $('#btnStop').addEventListener('click', function () { if (playing) end(); });
    document.addEventListener('keydown', function (e) {
      if (!playing) return;
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });
    var sx = null, stage = $('#stage');
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (sx == null) return;
      var d = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(d) > 30) move(d > 0 ? 1 : -1);
    }, { passive: true });
  }

  function end() {
    if (!playing && $('#play').classList.contains('mx-hid')) return;
    playing = false; if (raf) cancelAnimationFrame(raf);
    $('#play').classList.add('mx-hid');
    submitScore(score, startT);
    sfx(lives > 0 ? 'click' : 'lose');
    if (lives <= 0) trend('thua');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">🏅</div>' +
      '<h1>' + esc(callName()) + ' chạy được ' + Math.floor(dist) + ' m!</h1>' +
      '<p class="mx-mut">' + (lives <= 0 ? 'Hết tim rồi — nhưng quãng đường này rất đáng nể. Chạy thêm vòng nữa nhé!' : 'Dừng nghỉ đúng lúc cũng là chiến thuật hay.') + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + Math.floor(score) + ' điểm</span><span class="mx-pill">🚪 ' + gates + ' cổng</span><span class="mx-pill">🔥 Chuỗi cao nhất ' + bestCombo + '</span><span class="mx-pill">' + esc(st.lv) + ' · ' + DIFF[st.diff].n + '</span></div>' +
      '<button class="mx-btn" id="btnAgain" type="button">Chạy thêm vòng nữa ↻</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  loadUser().then(function () { buildMenu(); bindControls(); });
})();
