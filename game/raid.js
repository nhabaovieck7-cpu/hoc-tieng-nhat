/* raid.js — game-plus NHÁNH D: RAID TRÙM TUẦN 🐉 (client).
   Nguồn sự thật phía máy chủ: GET /game/raid + POST /game/raid/hit
   (bản vá Worker ở game-plus/worker-additions/raid.js — CHƯA deploy ở
   đợt staging này). Vì vậy client có ĐƯỜNG AN TOÀN: mọi lỗi khi gọi
   /game/raid (mạng / 404 / timeout 8s / trả về không hợp lệ) đều rơi về
   thẻ khoá "🐉 Raid Trùm Tuần — sắp mở", ẩn nút vào trận, 0 lỗi JS.
   Khi endpoint sống, cùng trang tự hoạt động, không phải sửa client.

   Lượt raid: 10 câu GQ topic 'mix' theo cấp đã chọn, 12 giây/câu
   (= DIFF.tb của dau-kanji). Sát thương CỐ ĐỊNH: đúng = 10 dmg,
   chuỗi đúng (streak) >= 5 thì +2 cho câu đó — GPLUS.scoreMul() KHÔNG
   áp dụng ở raid (dmg cố định theo thiết kế §3.2, ghi rõ tại đây).
   GPLUS.tryRevive KHÔNG dùng: raid không có thua chung cuộc (không có
   máu người chơi), hết 10 câu là chốt lượt. Khiên (GPLUS.onAnswer) chỉ
   giữ streak qua 1 câu sai. Hết lượt: POST tổng dmg đúng 1 lần. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var QSEC = 12;              // giây/câu — như DIFF.tb của dau-kanji
  var QCOUNT = 10;
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var DEFAULT_ENDPOINT = 'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev';

  /* ---------- Endpoint + phiên (mẫu api() trong phong-nhom.js) ---------- */
  function raidEndpoint() {
    try {
      if (window.GAME_API && typeof GAME_API._endpoint === 'function') {
        var e = GAME_API._endpoint();
        if (e) return String(e).replace(/\/$/, '');
      }
    } catch (e) { /* rơi xuống nấc dưới */ }
    try {
      if (typeof SITE !== 'undefined' && SITE && SITE.aiEndpoint) return String(SITE.aiEndpoint).replace(/\/$/, '');
      if (window.SITE && window.SITE.aiEndpoint) return String(window.SITE.aiEndpoint).replace(/\/$/, '');
    } catch (e) { /* rơi xuống mặc định */ }
    return DEFAULT_ENDPOINT;
  }
  function sessionToken() {
    try { if (window.AUTH && typeof AUTH.session === 'function') return AUTH.session() || ''; } catch (e) {}
    try { return localStorage.getItem('hn_sess_v1') || ''; } catch (e) { return ''; }
  }
  /* fetch kèm Bearer + timeout 8s. Trả {status, json}; NÉM lỗi khi
     mạng đứt/timeout để nơi gọi rơi về đường an toàn. */
  function raidApi(path, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    var tok = sessionToken();
    if (tok) headers.Authorization = 'Bearer ' + tok;
    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    return fetch(raidEndpoint() + path, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (timer) clearTimeout(timer);
        return { status: r.status, ok: r.ok, json: j || {} };
      });
    }).catch(function (e) { if (timer) clearTimeout(timer); throw e; });
  }

  /* ---------- Người dùng (mẫu dau-kanji) ---------- */
  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function syncUser(u) { if (u) for (var k in u) user[k] = u[k]; return user; }
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(syncUser).catch(function () { return user; });
  }
  var userEvtBound = false;
  function bindUserEvent() {
    if (userEvtBound) return; userEvtBound = true;
    window.addEventListener('hn-game-user', function (ev) {
      syncUser((ev && ev.detail) || window.GAME_USER_DATA);
      var pn = $('#pName');
      if (pn) pn.textContent = '🧑 ' + (user.name || 'Người chơi');
      applyProfileLevel();
    });
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

  /* ---------- Trạng thái raid (từ máy chủ) ---------- */
  var raid = null;        // null = chưa rõ; object khi endpoint sống
  var raidAlive = false;  // true chỉ khi GET /game/raid trả ok hợp lệ
  var st = { lv: 'N5', lvManual: false };

  function validRaid(j) {
    return !!(j && j.ok === true && j.boss && typeof j.hpMax === 'number' && typeof j.hpLeft === 'number');
  }
  function applyRaid(j) {
    raid = {
      week: j.week || '',
      boss: { id: (j.boss && j.boss.id) || '', name: (j.boss && j.boss.name) || 'Trùm tuần', emoji: (j.boss && j.boss.emoji) || '🐉' },
      hpMax: Math.max(0, +j.hpMax || 0),
      hpLeft: Math.max(0, +j.hpLeft || 0),
      defeated: !!j.defeated || (+j.hpLeft || 0) <= 0,
      myDmg: Math.max(0, +j.myDmg || 0),
      players: Math.max(0, +j.players || 0),
      top: Array.isArray(j.top) ? j.top.slice(0, 10) : []
    };
    raidAlive = true;
    return raid;
  }
  function loadRaid() {
    renderPanelLoading();
    return raidApi('/game/raid').then(function (r) {
      if (r.ok && validRaid(r.json)) { applyRaid(r.json); }
      else { raidAlive = false; raid = null; }
    }).catch(function () { raidAlive = false; raid = null; })
      .then(function () { renderPanel(); });
  }

  /* ---------- Panel sảnh raid ---------- */
  function topHTML() {
    if (!raid || !raid.top.length) {
      return '<p class="rd-top-empty">Chưa có ai ghi sát thương tuần này. Vào trận mở màn cho cả cộng đồng nào!</p>';
    }
    return '<ol class="rd-top">' + raid.top.map(function (t) {
      return '<li><span class="rd-top-name">' + esc(t.name || 'Người chơi') + '</span>' +
        '<span class="rd-top-dmg">⚔️ ' + (Math.max(0, +t.dmg || 0)).toLocaleString('vi-VN') + '</span></li>';
    }).join('') + '</ol>';
  }
  function hpBarHTML() {
    var frac = raid.hpMax > 0 ? Math.max(0, Math.min(1, raid.hpLeft / raid.hpMax)) : 0;
    return '<div class="rd-hp"><i style="transform:scaleX(' + frac + ')"></i></div>' +
      '<div class="rd-hp-num">❤️ ' + raid.hpLeft.toLocaleString('vi-VN') + ' <small>/ ' + raid.hpMax.toLocaleString('vi-VN') + ' máu</small></div>';
  }
  function renderPanelLoading() {
    $('#raidPanel').innerHTML = '<div class="mx-card"><p class="mx-mut">⏳ Đang kiểm tra raid tuần…</p></div>';
    $('#raidSetup').classList.add('mx-hid');
  }
  function renderPanel() {
    var p = $('#raidPanel'), setup = $('#raidSetup');
    if (!raidAlive || !raid) {
      /* ĐƯỜNG AN TOÀN: endpoint chưa live / lỗi — thẻ khoá, ẩn nút vào trận */
      p.innerHTML = '<div class="mx-card rd-locked"><div class="mx-big-emoji">🐉</div>' +
        '<h1>Raid Trùm Tuần — sắp mở</h1>' +
        '<p class="mx-mut">Mỗi tuần, cả cộng đồng cùng hợp sức đánh một con trùm chung: mỗi lượt chơi 10 câu, mỗi câu đúng gây sát thương trừ vào thanh máu chung của trùm, hạ được trùm là cả tuần cùng ăn mừng. Máy chủ raid đang được chuẩn bị — quay lại ít hôm nữa nhé!</p></div>';
      setup.classList.add('mx-hid');
      return;
    }
    var head = '<div class="mx-card' + (raid.defeated ? ' rd-defeated' : '') + '">' +
      '<div class="rd-boss-head"><div class="rd-boss-emoji">' + raid.boss.emoji + '</div>' +
      '<div><div class="rd-week">🐉 RAID TRÙM TUẦN' + (raid.week ? ' · Tuần từ ' + esc(raid.week) : '') + '</div>' +
      '<h1>' + esc(raid.boss.name) + '</h1>' +
      '<div class="mx-mut">Cả cộng đồng cùng đánh một con trùm — sát thương của mọi lượt chơi đều trừ vào thanh máu chung này.</div></div></div>' +
      hpBarHTML() +
      '<div class="rd-stats">' +
      '<span class="mx-pill">👥 ' + raid.players + ' người đã tham gia</span>' +
      '<span class="mx-pill">⚔️ Đóng góp của ' + (user.loggedIn ? 'mình' : 'khách') + ': ' + raid.myDmg.toLocaleString('vi-VN') + ' dmg</span>' +
      '</div>';
    if (raid.defeated) {
      p.innerHTML = head +
        '<div class="rd-defeated-banner">🏆 Trùm tuần đã hạ!</div>' +
        '<p class="mx-mut" style="text-align:center">Cả cộng đồng đã hạ ' + esc(raid.boss.name) + ' trong tuần này. Bảng đóng góp cuối cùng ở dưới — tuần sau trùm mới sẽ xuất hiện.</p>' +
        '<h2>🏅 Bảng đóng góp cuối</h2>' + topHTML() + '</div>';
      setup.classList.remove('mx-hid');
      var btn = $('#btnRaidGo');
      btn.disabled = true; btn.textContent = '🏆 Trùm tuần đã hạ';
      return;
    }
    p.innerHTML = head + '<h2>🏅 Top đóng góp tuần</h2>' + topHTML() + '</div>';
    setup.classList.remove('mx-hid');
    var btn2 = $('#btnRaidGo');
    btn2.disabled = false; btn2.textContent = 'Vào trận raid ▶';
  }

  /* ---------- Setup: chọn cấp + bộ kỹ năng ---------- */
  function segHTML(items, cur, attr) {
    return '<div class="mx-seg" data-seg="' + attr + '">' + items.map(function (it) {
      return '<button type="button" data-v="' + esc(it.v) + '" class="' + (it.v === cur ? 'on' : '') + '">' + esc(it.n) + '</button>';
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
  function applyProfileLevel() {
    /* Mặc định: cấp hồ sơ nếu đọc được, chưa chọn tay thì mới áp */
    if (st.lvManual) return;
    if (user.level && LEVELS.indexOf(user.level) >= 0 && user.level !== st.lv) {
      st.lv = user.level;
      var seg = $('#lvSeg');
      if (seg) {
        seg.innerHTML = segHTML(LEVELS.map(function (l) { return { v: l, n: l }; }), st.lv, 'lv');
        bindSeg(seg, 'lv', function (v) { st.lv = v; st.lvManual = true; });
      }
    }
  }
  function buildSetup() {
    var seg = $('#lvSeg');
    seg.innerHTML = segHTML(LEVELS.map(function (l) { return { v: l, n: l }; }), st.lv, 'lv');
    bindSeg(seg, 'lv', function (v) { st.lv = v; st.lvManual = true; });
    if (window.GPLUS && typeof GPLUS.mountLoadout === 'function') {
      try { GPLUS.mountLoadout($('#loadoutBox')); } catch (e) {}
    }
    $('#btnRaidGo').addEventListener('click', startBattle);
  }

  /* ---------- GPLUS: HUD + đóng băng + gợi ý ---------- */
  var frozen = false, freezeAt = 0, freezeTimer = null;
  function freezeFn() {
    if (isPaused() || frozen || !timerLive || lock) return false;
    frozen = true; freezeAt = Date.now(); suspendTimer();
    freezeTimer = setTimeout(unfreeze, 5000);
    return true;
  }
  function unfreeze() {
    if (!frozen) return;
    frozen = false; freezeTimer = null;
    t0 += Date.now() - freezeAt;
    if (timerLive) armTimer();
  }
  function cancelFreeze() {
    if (freezeTimer) clearTimeout(freezeTimer);
    freezeTimer = null; frozen = false;
  }
  function hintFn() {
    if (!cur || !cur.choices || lock) return false;
    var ci = correctIdx(cur), done = false;
    $$('#optBox .mx-opt').forEach(function (b) {
      if (done) return;
      if (+b.getAttribute('data-ix') !== ci && !b.classList.contains('gone') && !b.disabled) { b.classList.add('gone'); done = true; }
    });
    return done;
  }
  function wirePlus() {
    if (!window.GPLUS) return;
    try {
      if (typeof GPLUS.setHudHost === 'function') GPLUS.setHudHost($('#skillHud'));
      if (typeof GPLUS.setFreezeHandler === 'function') GPLUS.setFreezeHandler(freezeFn);
      if (typeof GPLUS.setHintHandler === 'function') GPLUS.setHintHandler(hintFn);
    } catch (e) {}
  }

  /* ---------- Trận raid ---------- */
  var deck = [], qi = 0, cur = null, lock = false, round = 0,
      okCount = 0, streak = 0, best = 0, totalDmg = 0,
      t0 = 0, startT = 0, timer = null, limMs = 0,
      timerCb = null, timerLive = false, needNext = false, pauseCtl = null,
      battleHpLeft = 0;
  function isPaused() { return !!(pauseCtl && pauseCtl.isPaused()); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }
  /* ARRANGEFIX (31/10): chấm câu sắp xếp qua bộ chấm chung GQ.orderOK
     (bản cũ so norm() không bỏ '。' nên xếp đúng vẫn bị báo sai). */
  function orderRight(q, got) {
    if (window.GQ && typeof GQ.orderOK === 'function') return GQ.orderOK(q, got);
    return norm(got) === norm(String(q.answerText || '').replace(/[。．]+$/, ''));
  }
  function usable(qs) { return (qs || []).filter(function (q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }); }

  function armTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (isPaused()) return;
      var left = limMs - (Date.now() - t0);
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

  function setBattleHp() {
    /* Thanh máu trong trận = máu server trừ phần dmg lượt này (xem trước);
       sau POST sẽ đồng bộ lại đúng số máy chủ trả về. */
    var left = Math.max(0, battleHpLeft);
    var frac = raid && raid.hpMax > 0 ? left / raid.hpMax : 0;
    $('#hpB').style.transform = 'scaleX(' + frac + ')';
    $('#hpBoxB').classList.toggle('low', frac <= 0.3);
  }
  function paintBattleHud() {
    $('#dmgPill').textContent = '⚔️ ' + totalDmg + ' dmg';
    $('#pNote').textContent = '🔥 Chuỗi ' + streak + ' · ⚔️ ' + totalDmg + ' dmg';
    $('#comboBox').textContent = streak >= 5 ? '🔥 Chuỗi ' + streak + ' — mỗi câu đúng +12 dmg!' : (streak >= 2 ? '🔥 Chuỗi x' + streak : '');
  }
  function dmgPop(txt) {
    var ar = $('#arena'); if (!ar) return;
    var d = document.createElement('div');
    d.className = 'bk-dmg'; d.textContent = txt;
    d.style.right = '26px'; d.style.top = '16px';
    ar.appendChild(d); setTimeout(function () { d.remove(); }, 1000);
  }

  function showError(msg) {
    stopTimer(); cancelFreeze();
    if (window.GPLUS && typeof GPLUS.endMatch === 'function') { try { GPLUS.endMatch(); } catch (e) {} }
    if (pauseCtl) pauseCtl.setVisible(false);
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-err"><div class="mx-big-emoji">🌧️</div><h1>Chưa lấy được câu hỏi</h1>' +
      '<p class="mx-mut">' + esc(msg) + '</p><div style="height:12px"></div>' +
      '<button class="mx-btn" id="btnRetry" type="button">Về sảnh raid</button></div>';
    $('#btnRetry').addEventListener('click', backToMenu);
  }

  function startBattle() {
    if (!raidAlive || !raid || raid.defeated) return;
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) {
      showError('Chưa nạp được bộ câu hỏi. Thử tải lại trang nhé.');
      return;
    }
    var btn = $('#btnRaidGo');
    btn.disabled = true; btn.textContent = '⏳ Đang lấy câu hỏi…';
    GQ.getQuestions({ level: st.lv, topic: 'mix', count: QCOUNT }).then(function (qs) {
      btn.disabled = false; btn.textContent = 'Vào trận raid ▶';
      var u = usable(qs);
      if (u.length < 3) { showError('Chưa gom đủ câu hỏi cho cấp ' + st.lv + '. Thử lại sau ít phút nhé.'); return; }
      deck = u.slice(0, QCOUNT); qi = 0; round = 0;
      okCount = 0; streak = 0; best = 0; totalDmg = 0; lock = false;
      battleHpLeft = raid.hpLeft;
      startT = Date.now(); needNext = false;
      $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
      $('#play').classList.remove('mx-hid');
      $('#pName').textContent = '🧑 ' + (user.name || 'Người chơi');
      if (window.GAME_AVATAR && GAME_AVATAR.load().face === 'hoso') {
        try { GAME_AVATAR.paintFace($('#figP'), GAME_AVATAR.load(), 84); } catch (e) {}
      }
      $('#bName').textContent = raid.boss.emoji + ' ' + raid.boss.name + ' · Trùm tuần';
      $('#figB').textContent = raid.boss.emoji;
      if (pauseCtl) pauseCtl.setVisible(true);
      if (window.GPLUS && typeof GPLUS.beginMatch === 'function') { try { GPLUS.beginMatch('raid'); } catch (e) {} }
      music('boss'); trend('vao');
      setBattleHp(); paintBattleHud();
      next();
    }).catch(function () {
      btn.disabled = false; btn.textContent = 'Vào trận raid ▶';
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }

  function next() {
    if (isPaused()) { needNext = true; return; }
    if (qi >= deck.length) return endRound();
    cur = deck[qi++]; lock = false; round++;
    $('#roundInfo').textContent = 'Câu ' + round + '/' + deck.length + ' · ' + st.lv + ' · Trộn';
    var qb = $('#qBox');
    qb.textContent = cur.prompt || '';
    qb.classList.toggle('long', (cur.prompt || '').length > 14);
    $('#qSub').textContent = cur.promptSub || '';
    $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
    if (cur.tokens && cur.tokens.length >= 2 && !cur.choices) renderOrder(cur); else renderChoices(cur);
    paintBattleHud();
    startTimer(QSEC, function () { if (!lock) { lock = true; funnel(false, null, true); } });
  }
  function renderChoices(q) {
    var box = $('#optBox'), ci = correctIdx(q);
    q.choices.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-opt'; b.textContent = c;
      b.setAttribute('data-ix', String(i));
      b.addEventListener('click', function () { funnel(i === ci, b, false); });
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
    var toks = q.tokens.slice();
    for (var i = toks.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = toks[i]; toks[i] = toks[j]; toks[j] = t; }
    toks.forEach(function (tk) {
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
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '⚔️ Ra đòn';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      funnel(orderRight(q, got), chk, false);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  /* Phễu chấm DUY NHẤT của raid: GPLUS_TRACK + GPLUS.onAnswer (khiên)
     đều móc tại đây. scoreMul KHÔNG áp dụng — dmg cố định (xem đầu file). */
  function funnel(right, btn, timeout) {
    if (isPaused() || lock) return; lock = true; stopTimer(); cancelFreeze();
    var shieldUsed = false;
    try {
      if (window.GPLUS && typeof GPLUS.onAnswer === 'function') {
        var r = GPLUS.onAnswer(right);
        shieldUsed = !!(r && r.shieldUsed);
      }
    } catch (e) {}
    try { if (window.GPLUS_TRACK) GPLUS_TRACK(cur, right); } catch (e) {}
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      var dmg = 10 + (streak >= 5 ? 2 : 0);
      totalDmg += dmg;
      battleHpLeft = Math.max(0, battleHpLeft - dmg);
      setBattleHp(); paintBattleHud();
      fx('comboPop', streak); fx('burst', $('#figB'));
      sfx(streak >= 5 ? 'thunder' : 'hit');
      trend(streak >= 5 ? 'combo' : (speedFrac() > 0.7 ? 'nhanh' : 'dung'));
      dmgPop('-' + dmg + ' dmg');
      setTimeout(next, 950);
    } else {
      if (btn) btn.classList.add('bad');
      revealChoices();
      if (!shieldUsed) streak = 0;
      paintBattleHud();
      fx('shake', $('#arena')); sfx('fire');
      if (shieldUsed) { $('#comboBox').textContent = '🛡️ Khiên đã đỡ — chuỗi đúng được giữ!'; trend('trogiup'); }
      else trend(timeout ? 'hetgio' : 'sai');
      setTimeout(next, 1150);
    }
  }

  function submitScoreOnce() {
    try {
      if (window.GAME_API && typeof GAME_API.submitScore === 'function') {
        var r = GAME_API.submitScore({ mode: 'raid', level: st.lv, score: totalDmg, durationMs: Date.now() - startT });
        if (r && r.catch) r.catch(function () {});
      }
    } catch (e) {}
  }

  function endRound() {
    stopTimer(); cancelFreeze();
    if (pauseCtl) pauseCtl.setVisible(false);
    if (window.GPLUS && typeof GPLUS.endMatch === 'function') { try { GPLUS.endMatch(); } catch (e) {} }
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">🐉</div>' +
      '<h1>Lượt raid xong!</h1>' +
      '<div class="mx-stat-row"><span class="mx-pill">✅ ' + okCount + '/' + deck.length + ' đúng</span>' +
      '<span class="mx-pill">⚔️ ' + totalDmg + ' dmg</span>' +
      '<span class="mx-pill">🔥 Chuỗi cao nhất ' + best + '</span></div>' +
      '<p class="mx-mut" id="raidPostNote">⏳ Đang gửi ' + totalDmg + ' sát thương lên máy chủ raid…</p>' +
      '<div style="height:12px"></div><button class="mx-btn" id="btnBackMenu" type="button">Về sảnh raid</button>' +
      '<div style="height:8px"></div><a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnBackMenu').addEventListener('click', backToMenu);
    submitScoreOnce();
    if (totalDmg <= 0) {
      var n0 = $('#raidPostNote');
      if (n0) n0.textContent = 'Lượt này chưa gây được sát thương nào nên không có gì để ghi lên máy chủ. Lượt sau gỡ lại nhé!';
      return;
    }
    if (!sessionToken()) {
      var n1 = $('#raidPostNote');
      if (n1) n1.textContent = 'Chưa ghi được sát thương (máy chủ raid chưa mở). Đăng nhập để sát thương được ghi vào raid tuần nhé.';
      return;
    }
    /* POST tổng dmg đúng 1 lần cho cả lượt */
    raidApi('/game/raid/hit', { method: 'POST', body: { dmg: totalDmg } }).then(function (res) {
      var note = $('#raidPostNote');
      if (res.ok && res.json && res.json.ok === true && validRaid(res.json)) {
        applyRaid(res.json);
        battleHpLeft = raid.hpLeft; setBattleHp();
        var applied = (typeof res.json.applied === 'number') ? res.json.applied : totalDmg;
        if (raid.defeated || raid.hpLeft <= 0) {
          fx('confetti'); sfx('victory'); trend('thang');
          if (note) note.innerHTML = '🎉 Đòn kết liễu! <b>Trùm tuần đã hạ!</b> Đã ghi +' + applied + ' dmg — đóng góp của mình tuần này: ' + raid.myDmg.toLocaleString('vi-VN') + ' dmg.';
        } else if (note) {
          note.innerHTML = '✅ Đã ghi +' + applied + ' dmg lên máy chủ! Trùm còn ' + raid.hpLeft.toLocaleString('vi-VN') + '/' + raid.hpMax.toLocaleString('vi-VN') + ' máu · Đóng góp của mình: ' + raid.myDmg.toLocaleString('vi-VN') + ' dmg.';
        }
      } else if (note) {
        note.textContent = 'Chưa ghi được sát thương (máy chủ raid chưa mở). Kết quả lượt chơi ở trên vẫn là thành tích của lượt này.';
      }
    }).catch(function () {
      var note = $('#raidPostNote');
      if (note) note.textContent = 'Chưa ghi được sát thương (máy chủ raid chưa mở). Kết quả lượt chơi ở trên vẫn là thành tích của lượt này.';
    });
  }

  function backToMenu() {
    stopTimer(); cancelFreeze();
    if (pauseCtl) pauseCtl.setVisible(false);
    $('#play').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    $('#menu').classList.remove('mx-hid');
    if (raidAlive) renderPanel(); else loadRaid();
  }

  /* GPAUSE đúng mẫu pause.js (như dau-kanji/leo-thap) */
  if (window.GPAUSE && typeof window.GPAUSE.create === 'function') {
    pauseCtl = window.GPAUSE.create({
      btnHost: $('#pauseSlot') || $('#play'),
      exitLabel: 'Thoát trận (về sảnh raid)',
      isPlaying: function () { return !$('#play').classList.contains('mx-hid'); },
      onPause: function () { cancelFreeze(); suspendTimer(); },
      onResume: function (dur) {
        t0 += dur; startT += dur;
        if (timerLive) armTimer();
        if (needNext) { needNext = false; next(); }
      },
      onExit: function () {
        stopTimer(); cancelFreeze();
        if (window.GPLUS && typeof GPLUS.endMatch === 'function') { try { GPLUS.endMatch(); } catch (e) {} }
        backToMenu();
      }
    });
  }

  bindUserEvent();
  wirePlus();
  buildSetup();
  renderPanelLoading();
  loadUser().then(function () { applyProfileLevel(); });
  loadRaid();
})();
