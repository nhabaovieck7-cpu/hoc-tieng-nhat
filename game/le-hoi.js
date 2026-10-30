/* le-hoi.js — Nhánh 3: Lễ hội. Vòng 10 câu hỏi vui, nhịp nhanh, điểm theo chuỗi
   đúng (chain). Bong bóng thoại trang trí đi qua HÀNG ĐỢI: tối đa 2 bong bóng
   cùng lúc, xếp ở 2 vị trí lệch nhau, bong bóng sau chờ đến lượt — không chồng
   nhau (sửa lỗi bản mẫu). Câu trend đọc qua GTREND, nhạc GMUSIC 'normal',
   câu hỏi qua GQ (topic mix, hook an toàn), điểm nộp GAME_API. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var TOTAL = 10;
  var DIFF = { de: { n: 'Dễ', s: 15, x: 1 }, tb: { n: 'Trung bình', s: 10, x: 1 }, kho: { n: 'Khó', s: 7, x: 2 } };
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  /* Lời cổ vũ trang trí ngắn của linh vật (chữ UI, không phải câu trend đọc to) */
  var CHEERS = ['Cố lên nào! 🎉', 'Nhanh tay, nhanh mắt! 👀', 'Chuỗi đang nóng dần! 🔥', 'Thêm một câu nữa thôi!', 'Lễ hội là phải cháy! 🎆', 'Tuyệt vời ông mặt trời! ☀️'];

  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function syncUser(u) { if (u) for (var k in u) user[k] = u[k]; return user; }
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(syncUser).catch(function () { return user; });
  }
  /* Tên có thể resolve SAU khi menu đã vẽ (game.js phát sự kiện
     'hn-game-user', detail = GAME_USER_DATA, mỗi khi resolve/refresh xong):
     đồng bộ lại bản local rồi vẽ lại phần đang hiện có dùng tên — menu khi
     đang ở menu, màn kết quả khi đang hiện kết quả. Đăng ký đúng 1 lần,
     vẽ lại idempotent (chỉ dựng lại HTML từ state hiện tại, không nộp điểm
     lại, không đổi logic chơi). */
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
      var r = GAME_API.submitScore({ mode: 'le-hoi', level: st.lv, score: Math.round(score), durationMs: Date.now() - t0 });
      if (r && r.catch) r.catch(function () {});
    }
  } catch (e) {} }
  function fetchQ(count) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: 'mix', count: count });
  }
  function usable(qs) { return (qs || []).filter(function (q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }

  var st = { lv: 'N5', diff: 'tb' };
  var idx = 0, score = 0, okCount = 0, chain = 0, bestChain = 0, lock = false,
      pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0, cheerIx = 0;

  /* ---------- Hàng đợi bong bóng: không chồng nhau ---------- */
  var bubbleQ = [], bubbleBusy = [false, false];
  var bubblePos = [{ left: '76px', top: '0px' }, { right: '6px', top: '40px' }];
  function pushBubble(text) {
    bubbleQ.push(text);
    pumpBubbles();
  }
  function pumpBubbles() {
    for (var s = 0; s < 2; s++) {
      if (bubbleBusy[s] || !bubbleQ.length) continue;
      bubbleBusy[s] = true;
      showBubble(bubbleQ.shift(), s);
    }
  }
  function showBubble(text, slot) {
    var box = $('#bubbleBox');
    var d = document.createElement('div');
    d.className = 'fh-bubble'; d.textContent = text;
    var p = bubblePos[slot];
    /* Màn hẹp (≤860px): KHÔNG gán vị trí cứng — CSS để bong bóng trong luồng
       (position:static) cạnh mascot phía trên khu đáp án, không đè đáp án.
       Vị trí tuyệt đối lệch nhau chỉ dùng ở màn rộng. */
    var narrow = false;
    try { narrow = window.matchMedia('(max-width: 860px)').matches; } catch (e) {}
    if (!narrow) {
      if (p.left) d.style.left = p.left; if (p.right) d.style.right = p.right;
      d.style.top = p.top;
    }
    box.appendChild(d);
    setTimeout(function () { d.classList.add('out'); }, 1900);
    setTimeout(function () { d.remove(); bubbleBusy[slot] = false; pumpBubbles(); }, 2300);
  }

  function buildMenu() {
    var m = $('#menu');
    m.innerHTML =
      '<div class="mx-card"><div class="fh-lanterns" aria-hidden="true"><span>🏮</span><span>🎐</span><span>🏮</span><span>🎆</span><span>🏮</span></div>' +
      '<div class="mx-big-emoji">🎪</div>' +
      '<h1>Lễ hội Edo</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Vòng chơi vui gồm ' + TOTAL + ' câu hỏi tốc độ, trộn đủ chủ đề. Càng nối dài chuỗi đúng, điểm mỗi câu càng cao. Thư giãn là chính, cháy là mười! 🎉</p>' +
      '<h2>Trình độ</h2><div class="mx-seg lv" data-seg="lv">' + LEVELS.map(function (l) { return '<button type="button" data-v="' + l + '" class="' + (l === st.lv ? 'on' : '') + '">' + l + '</button>'; }).join('') + '</div>' +
      '<h2>Độ khó</h2><div class="mx-seg" data-seg="diff">' + Object.keys(DIFF).map(function (k) { return '<button type="button" data-v="' + k + '" class="' + (k === st.diff ? 'on' : '') + '">' + DIFF[k].n + '<small>' + DIFF[k].s + 's/câu' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') + '</small></button>'; }).join('') + '</div>' +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Vào lễ hội ▶</button></div>';
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

  function startTimer(sec, onTimeout) {
    stopTimer(); limMs = sec * 1000; t0 = Date.now();
    timer = setInterval(function () {
      var left = limMs - (Date.now() - t0);
      $('#tBar').style.width = Math.max(0, left / limMs * 100) + '%';
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
    if (qi >= pool.length) return loadMore(10).then(function () { return qi < pool.length ? pool[qi++] : null; }).catch(function () { return null; });
    return Promise.resolve(pool[qi++]);
  }

  function drawChain() {
    var box = $('#chainBox'); box.innerHTML = '';
    for (var i = 0; i < TOTAL; i++) {
      var dot = document.createElement('i');
      if (i < chain) dot.className = 'on';
      box.appendChild(dot);
    }
    $('#scorePill').textContent = '⭐ ' + score + (chain >= 2 ? ' · 🔥 chuỗi ' + chain : '');
  }

  function start() {
    idx = 0; score = 0; okCount = 0; chain = 0; bestChain = 0; qi = 0; pool = [];
    bubbleQ.length = 0;
    startT = Date.now();
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid'); $('#play').classList.remove('mx-hid');
    music('normal'); trend('vao');
    pushBubble('Lễ hội bắt đầu rồi, ' + callName() + ' ơi! 🎉');
    loadMore(TOTAL + 2).then(next).catch(function () {
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }
  function next() {
    if (idx >= TOTAL) return end();
    takeQ().then(function (q) {
      if (!q) return end();
      cur = q; lock = false;
      $('#progInfo').textContent = 'Câu ' + (idx + 1) + '/' + TOTAL + ' · ' + st.lv;
      var qb = $('#qBox'); qb.textContent = q.prompt || '';
      qb.classList.toggle('long', (q.prompt || '').length > 14);
      $('#qSub').textContent = q.promptSub || '';
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      drawChain();
      startTimer(DIFF[st.diff].s, function () { if (!lock) { lock = true; answer(false, null); } });
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
        if (lock || b.classList.contains('used')) return;
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
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '🎉 Nộp câu';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      answer(norm(got) === norm(q.answerText), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (lock) return; lock = true; stopTimer();
    var sp = speedFrac();
    if (btn) btn.classList.add(right ? 'ok' : 'bad');
    revealChoices();
    if (right) {
      okCount++; chain++; bestChain = Math.max(bestChain, chain);
      /* Điểm theo chuỗi: mỗi mắt xích cộng thêm 20% */
      score += Math.round((80 + sp * 40) * DIFF[st.diff].x * (1 + (chain - 1) * 0.2));
      sfx('beam'); fx('burst', btn || $('#mascot')); fx('comboPop', chain);
      trend(chain >= 4 ? 'combo' : sp > 0.7 ? 'nhanh' : 'dung');
      pushBubble(CHEERS[cheerIx++ % CHEERS.length]);
      if (chain === 5) { fx('confetti'); pushBubble('Chuỗi 5 câu liền! Quá đỉnh 🔥'); }
    } else {
      chain = 0;
      sfx('wrong'); fx('shake', $('#qBox'));
      trend(btn ? 'sai' : 'hetgio');
      pushBubble('Suýt thôi, câu sau gỡ liền! 💪');
    }
    drawChain();
    idx++;
    setTimeout(next, 900);
  }

  function end() {
    /* Kết liễu BOSS (đợt 4): chỉ khi đạt ngưỡng thắng sẵn có (đúng 7+/10);
       chế độ chưa có boss -> playBoss tự lấy GBOSS.next() không trùng. */
    if (okCount >= 7 && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: $('#mascot'), toEl: null, dmg: score }); else GFIN.play({ fromEl: $('#mascot'), toEl: null, dmg: score }); } catch (e) {} }
    stopTimer();
    $('#play').classList.add('mx-hid');
    submitScore(score, startT);
    sfx(okCount >= 7 ? 'victory' : 'click');
    trend(okCount >= 7 ? 'thang' : 'dung');
    if (okCount >= 7) fx('confetti');
    renderResult();
  }
  /* Chỉ DỰNG HTML màn kết quả từ state hiện tại (không nộp điểm/không sfx —
     các hiệu ứng phụ nằm ở end()); gọi lại khi tên người chơi resolve muộn
     để dòng chữ dùng tên mới nhất. */
  function renderResult() {
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">🎆</div>' +
      '<h1>Lễ hội khép lại!</h1>' +
      '<p class="mx-mut">' + esc(callName()) + ' đã chơi rất vui — đúng ' + okCount + '/' + TOTAL + ' câu, chuỗi dài nhất ' + bestChain + ' câu liền.</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + '/' + TOTAL + ' đúng</span><span class="mx-pill">🔥 Chuỗi ' + bestChain + '</span><span class="mx-pill">' + esc(st.lv) + ' · ' + DIFF[st.diff].n + '</span></div>' +
      '<button class="mx-btn" id="btnAgain" type="button">Chơi lại</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  bindUserEvent();
  loadUser().then(buildMenu);
})();
