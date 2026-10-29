/* =====================================================================
 * phong-nhom.js — NHÁNH 6: sảnh phòng nhóm + đối kháng 1-1.
 *
 * Máy chủ: game-rooms.js (nhánh 6) — prefix /game/rooms/*, xem GROOMS.
 * Đồng bộ bằng POLLING:
 *   - trong trận + tab hiển thị: 2 giây/lần
 *   - phòng chờ: 5 giây/lần
 *   - tab ẩn: DỪNG hẳn (chỉ chạy lại ngay khi tab hiện lại)
 * Bộ câu CÙNG ĐỀ cho cả phòng — lựa chọn đã chốt (ghi ở branches/N6.md):
 *   1) Chủ phòng lấy câu qua GQ.getQuestions({..., seed: seed phòng}).
 *   2) Nếu lấy được, chủ phòng GỬI NGUYÊN BỘ CÂU qua sự kiện 'questions'
 *      rồi mới gửi 'start' {deck:'event'} — mọi máy dùng đúng bộ câu đó
 *      (giống hệt nhau kể cả khi các máy khác nhau bản GQ).
 *   3) Nếu GQ chưa sẵn/lỗi ở máy chủ phòng: vẫn gửi 'start' {deck:'seed'};
 *      từng máy tự gọi GQ bằng seed chung; máy nào cũng không có GQ thì
 *      hiện thông báo nhẹ nhàng + nút thử lại, KHÔNG bịa câu hỏi.
 * GAME_USER/GQ/GTREND/GMUSIC/GFX/GAME_API đều dùng có guard: thiếu
 * nhánh nào trang vẫn chạy phần còn lại.
 * Thành viên đăng nhập KHÔNG bị gọi "bạn": mọi chuỗi dùng call của
 * GAME_USER (anh/chị/tên); chỉ khách mới là "bạn". Mọi dữ liệu hiển
 * thị đều qua esc() hoặc textContent.
 * ===================================================================== */
(function () {
  'use strict';

  var ENDPOINT = (typeof window.SITE !== 'undefined' && window.SITE && window.SITE.aiEndpoint)
    || (typeof window.GAME_ENDPOINT !== 'undefined' && window.GAME_ENDPOINT)
    || 'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev';
  ENDPOINT = String(ENDPOINT).replace(/\/$/, '');
  var QUESTION_TIME_MS = 15000; // 15 giây/câu cho cả nhóm + đối kháng
  var REVEAL_MS = 1800;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function $(id) { return document.getElementById(id); }
  function show(el, on) { if (el) el.classList.toggle('hid', !on); }
  function toast(msg) {
    var t = $('pnToast'); if (!t) return;
    t.textContent = msg; t.classList.remove('hid');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.add('hid'); }, 2200);
  }
  function sessionToken() {
    try { if (window.AUTH && AUTH.session) return AUTH.session() || ''; } catch (e) {}
    try { return localStorage.getItem('hn_sess_v1') || ''; } catch (e) { return ''; }
  }

  /* ============================ GROOMS ============================ */
  async function api(path, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    var tok = sessionToken();
    if (tok) headers.Authorization = 'Bearer ' + tok;
    var r = await fetch(ENDPOINT + path, {
      method: opts.method || 'GET', headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    var j = await r.json().catch(function () { return {}; });
    if (!r.ok) { var e = new Error(j.error || ('Lỗi ' + r.status)); e.status = r.status; e.body = j; throw e; }
    return j;
  }
  var GROOMS = {
    create: function (o) { return api('/game/rooms/create', { method: 'POST', body: o }); },
    join: function (code) { return api('/game/rooms/join', { method: 'POST', body: { code: code } }); },
    state: function (code, since) { return api('/game/rooms/state?code=' + encodeURIComponent(code) + '&since=' + (since || 0)); },
    event: function (code, kind, payload) { return api('/game/rooms/event', { method: 'POST', body: { code: code, kind: kind, payload: payload || {} } }); },
    leave: function (code) { return api('/game/rooms/leave', { method: 'POST', body: { code: code } }); },
  };
  window.GROOMS = GROOMS;

  /* ============================ Người dùng ============================ */
  var user = { loggedIn: false, id: '', name: '', call: 'bạn', gender: null, level: null };
  async function resolveUser() {
    try {
      if (window.GAME_USER) {
        var gu = await window.GAME_USER;
        if (gu) {
          user.loggedIn = !!gu.loggedIn;
          user.name = gu.name || '';
          user.call = gu.call || (user.loggedIn ? (gu.name || 'anh') : 'bạn');
          user.gender = gu.gender || null;
          user.level = gu.level || null;
        }
      }
    } catch (e) {}
    if (!user.name && sessionToken()) {
      try {
        var me = await api('/auth/me');
        if (me && me.user) {
          user.loggedIn = true;
          user.id = me.user.id || '';
          user.name = me.user.name || user.name;
          if (!window.GAME_USER) user.call = user.name || 'anh';
        }
      } catch (e) { /* 401 -> khách */ }
    }
    if (!user.loggedIn) user.call = 'bạn';
    return user;
  }

  /* ============================ Trạng thái trang ============================ */
  var S = {
    view: 'lobby',          // lobby | room | play | wait | result
    room: null,             // room view từ máy chủ
    code: '',
    lastEventId: 0,
    deck: null,             // bộ câu của ván hiện tại
    deckSource: '',         // 'event' | 'seed'
    pendingStart: false,    // đã thấy sự kiện start nhưng chưa đủ đề
    qi: 0, score: 0, correct: 0, answered: 0, streak: 0, bestStreak: 0,
    locked: false, timer: null, qStartedAt: 0,
    orderPicked: [],
    pollTimer: null, pollBusy: false, pollWanted: false,
    chatReady: false,
    sel: { mode: 'group', level: 'N4', topic: 'mix', count: 10 },
  };

  function isHost() { return !!(S.room && S.room.isHost); }
  function mePlayer() {
    if (!S.room) return null;
    return S.room.players.find(function (p) { return p.me; }) || null;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* ============================ Polling ============================
   * Nhịp: trong trận 2s, phòng chờ 5s, kết quả/chờ-đối-thủ 3s.
   * Chỉ chạy khi document.visibilityState === 'visible'. */
  function pollInterval() {
    if (S.view === 'play') return 2000;
    if (S.view === 'wait') return 3000;
    if (S.view === 'result') return 5000; // thưa: chỉ để bắt sự kiện ván mới (rematch)
    return 5000;
  }
  function schedulePoll() {
    clearTimeout(S.pollTimer);
    if (!S.pollWanted) return;
    var iv = pollInterval();
    if (!iv) return;
    S.pollTimer = setTimeout(runPoll, iv);
  }
  async function runPoll() {
    if (!S.pollWanted) return;
    if (document.visibilityState !== 'visible') { schedulePoll(); return; }
    if (S.pollBusy || !S.code) { schedulePoll(); return; }
    S.pollBusy = true;
    try {
      var j = await GROOMS.state(S.code, S.lastEventId);
      applyState(j);
    } catch (e) {
      if (e && e.status === 404) { onRoomGone(); return; }
      // lỗi mạng tạm thời: giữ nguyên màn hình, nhịp sau thử lại
    } finally {
      S.pollBusy = false;
      schedulePoll();
    }
  }
  function startPolling() { S.pollWanted = true; clearTimeout(S.pollTimer); runPoll(); }
  function stopPolling() { S.pollWanted = false; clearTimeout(S.pollTimer); }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && S.pollWanted) { clearTimeout(S.pollTimer); runPoll(); }
  });

  function onRoomGone() {
    stopPolling();
    toast('Phòng đã đóng hoặc hết hạn.');
    backToLobby();
  }

  /* ============================ Áp trạng thái + sự kiện ============================ */
  function applyState(j) {
    if (!j || !j.room) return;
    var prevStatus = S.room ? S.room.status : '';
    S.room = j.room;
    var events = j.events || [];
    if (typeof j.lastEventId === 'number' && j.lastEventId > S.lastEventId) S.lastEventId = j.lastEventId;
    events.forEach(handleEvent);
    // Đồng bộ theo status của phòng (kể cả khi lỡ sự kiện)
    if (S.room.status === 'playing' && S.view === 'room' && !S.deck) {
      // Đang chờ mà phòng đã playing (vd vừa nạp lại trang): thử dựng đề bằng seed.
      beginMatchWithSeed(S.room.seed, S.room.qCount);
    }
    if (S.room.status === 'done' && (S.view === 'play' || S.view === 'wait')) showResult();
    if (S.room.status === 'waiting' && prevStatus === 'done' && S.view === 'result') enterRoomView();
    if (S.view === 'room') renderRoom();
    if (S.view === 'play' || S.view === 'wait') renderStrip();
    if (S.view === 'wait') renderWaitBars();
  }

  function handleEvent(ev) {
    if (!ev || ev.id <= 0) return;
    var p = ev.payload || {};
    switch (ev.kind) {
      case 'questions':
        if (Array.isArray(p.questions) && p.questions.length && !S.deck) {
          S.deck = p.questions; S.deckSource = 'event';
          if (S.view === 'room' || S.pendingStart) startMatch();
        }
        break;
      case 'start':
        S.pendingStart = true;
        if (S.deck && S.deckSource === 'event') { startMatch(); }
        else { beginMatchWithSeed(p.seed || (S.room && S.room.seed), p.qCount || (S.room && S.room.qCount)); }
        break;
      case 'chem':
      case 'chat':
        if (window.GCHAT) GCHAT.receiveRemote({ userId: ev.userId, name: ev.name, text: p.text, kind: ev.kind });
        break;
      case 'answer': {
        // Nháy dải điểm của đối thủ vừa trả lời
        try {
          var el = document.querySelector('[data-strip="' + CSS.escape(String(ev.userId)) + '"]');
          if (el) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
        } catch (e) {}
        break;
      }
      case 'rematch':
        S.deck = null; S.deckSource = ''; S.pendingStart = false;
        resetMatchLocal();
        if (S.view !== 'room') enterRoomView(); else renderRoom();
        break;
      case 'system':
        if (p.text === 'done' && (S.view === 'play' || S.view === 'wait')) showResult();
        break;
    }
  }

  /* ============================ Bộ câu ============================ */
  // GQ của nhánh 2 dùng RNG mulberry32 với seed SỐ (seed >>> 0): seed
  // phòng là CHUỖI nên phải băm FNV-1a sang số — mọi máy băm cùng chuỗi
  // ra cùng số nên cùng bộ câu; không băm thì chuỗi nào cũng thành 0
  // và mọi phòng trùng đề nhau.
  function seedNum(seed) {
    var s = String(seed == null ? '' : seed), hsh = 2166136261;
    for (var i = 0; i < s.length; i++) { hsh ^= s.charCodeAt(i); hsh = Math.imul(hsh, 16777619); }
    return hsh >>> 0;
  }
  async function fetchSeedDeck(seed, count) {
    if (!window.GQ || typeof GQ.getQuestions !== 'function') return null;
    try {
      var qs = await GQ.getQuestions({ level: S.room.level, topic: S.room.topic, count: count || S.room.qCount || 10, seed: seedNum(seed) });
      if (Array.isArray(qs) && qs.length) return qs;
    } catch (e) {}
    return null;
  }
  async function beginMatchWithSeed(seed, count) {
    if (S.view === 'play') return;
    var qs = await fetchSeedDeck(seed, count);
    if (qs) { S.deck = qs; S.deckSource = 'seed'; startMatch(); return; }
    // Không có GQ ở máy này: chờ thêm sự kiện 'questions' của chủ phòng
    // (poll vẫn chạy); quá 6 giây chưa có thì báo nhẹ.
    var waited = 0;
    var iv = setInterval(function () {
      waited += 500;
      if (S.deck) { clearInterval(iv); return; }
      if (waited >= 6000) {
        clearInterval(iv);
        toast('Chưa tải được bộ câu cho ván này — kiểm tra mạng rồi chờ chủ phòng mở ván mới nhé.');
      }
    }, 500);
  }

  /* ============================ Vào / rời phòng ============================ */
  function enterRoomView() {
    S.view = 'room';
    show($('pnLobby'), false); show($('pnPlay'), false); show($('pnWait'), false); show($('pnResult'), false);
    show($('pnRoom'), true);
    renderRoom();
    mountChat();
    try { if (window.GMUSIC && GMUSIC.play) GMUSIC.play('map'); } catch (e) {}
  }
  function renderRoom() {
    if (!S.room) return;
    $('pnRoomCode').textContent = S.room.code;
    $('pnRoomMeta').textContent = (S.room.mode === 'versus' ? '⚔️ Đối kháng' : '👥 Nhóm') + ' · ' + S.room.level + ' · ' + topicName(S.room.topic) + ' · ' + S.room.qCount + ' câu';
    $('pnRoomCount').textContent = S.room.players.length + '/' + S.room.maxPlayers + ' người';
    var grid = $('pnPlayers');
    grid.innerHTML = '';
    for (var i = 0; i < S.room.maxPlayers; i++) {
      var pl = S.room.players[i];
      var d = document.createElement('div');
      if (pl) {
        d.className = 'pn-pl'; d.setAttribute('data-anchor', pl.userId);
        d.innerHTML = '<div class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(pl.name)) + '</div>' +
          (pl.me ? esc(user.call) + ' ' : '') + esc(pl.name) +
          (pl.isHost ? '<span class="pn-host">👑 Chủ phòng</span>' : '') +
          (pl.online ? '' : '<span class="pn-off">ngoại tuyến</span>');
      } else {
        d.className = 'pn-pl wait';
        d.innerHTML = '<div class="pn-ava"></div>trống';
      }
      grid.appendChild(d);
    }
    var startBtn = $('pnStart'), note = $('pnStartNote');
    var min = S.room.mode === 'versus' ? 2 : 2;
    if (isHost()) {
      var ready = S.room.players.length >= min && S.room.status === 'waiting';
      startBtn.disabled = !ready;
      startBtn.textContent = ready ? 'Bắt đầu ▶ (' + S.room.players.length + ' người)' : 'Chờ thêm người…';
      note.textContent = ready ? cap(user.call) + ' là chủ phòng — bấm Bắt đầu khi mọi người đã vào đủ.' : 'Gửi mã phòng cho mọi người, đủ ' + min + ' người là bắt đầu được.';
    } else {
      startBtn.disabled = true;
      startBtn.textContent = 'Chờ chủ phòng bắt đầu…';
      note.textContent = 'Chủ phòng sẽ bấm bắt đầu. Trong lúc chờ, chém gió vài câu cho vui nhé ' + user.call + '!';
    }
  }
  function topicName(t) { return { kanji: 'Kanji', vocab: 'Từ vựng', grammar: 'Ngữ pháp', mix: 'Trộn' }[t] || t; }
  function initial(name) { return String(name || '?').trim().charAt(0).toUpperCase() || '?'; }

  async function leaveRoom(silent) {
    var code = S.code;
    stopPolling();
    stopQuestionTimer();
    if (code && user.loggedIn && !silent) { try { await GROOMS.leave(code); } catch (e) {} }
    S.code = ''; S.room = null; S.deck = null; S.lastEventId = 0;
    if (window.GCHAT) GCHAT.destroy(); S.chatReady = false;
    try { if (window.GMUSIC && GMUSIC.play) GMUSIC.play('lobby'); } catch (e) {}
  }
  async function backToLobby() {
    await leaveRoom(true);
    S.view = 'lobby';
    show($('pnRoom'), false); show($('pnPlay'), false); show($('pnWait'), false); show($('pnResult'), false);
    show($('pnLobby'), user.loggedIn);
    try { localStorage.removeItem('hn_game_room'); } catch (e) {}
  }

  /* ============================ Chém gió ============================ */
  function mountChat() {
    if (S.chatReady || !window.GCHAT) return;
    var mountEl = $('pnChatMount'); if (!mountEl) return;
    GCHAT.mount({
      mountEl: mountEl,
      me: { id: user.id || user.name, name: user.name },
      call: user.call,
      anchorFor: function (key) {
        var els = document.querySelectorAll('[data-anchor]');
        for (var i = 0; i < els.length; i++) if (els[i].getAttribute('data-anchor') === String(key)) return els[i].querySelector('.pn-ava') || els[i];
        // dự phòng: neo vào avatar của chính mình trong dải trận
        var me = document.querySelector('[data-strip-me] .pn-ava');
        return me || null;
      },
      onSendTrend: function (text) {
        if (S.code) GROOMS.event(S.code, 'chem', { text: text, moment: 'chem' }).catch(function () {});
      },
      onSendText: function (text) {
        if (S.code) GROOMS.event(S.code, 'chat', { text: text }).catch(function () {});
      },
    });
    S.chatReady = true;
  }

  /* ============================ Trận đấu ============================ */
  function resetMatchLocal() {
    S.qi = 0; S.score = 0; S.correct = 0; S.answered = 0; S.streak = 0; S.bestStreak = 0; S.locked = false;
  }
  function startMatch() {
    if (S.view === 'play') return; // sự kiện start dội về qua polling: đang đấu thì bỏ qua
    if (!S.deck || !S.deck.length) return;
    S.pendingStart = false;
    resetMatchLocal();
    S.matchStartedAt = Date.now(); // điều phối hợp nhất: để nộp durationMs thật cho /game/score
    S.view = 'play';
    show($('pnRoom'), false); show($('pnWait'), false); show($('pnResult'), false);
    show($('pnPlay'), true);
    mountChat();
    renderStrip();
    try { if (window.GTREND && GTREND.say) GTREND.say('vao'); } catch (e) {}
    nextQuestion();
  }
  function renderStrip() {
    var strip = $('pnStrip'); if (!strip || !S.room) return;
    strip.innerHTML = '';
    S.room.players.forEach(function (pl) {
      var st = pl.state || {};
      var d = document.createElement('div');
      d.className = 'pn-pl'; d.setAttribute('data-strip', pl.userId);
      if (pl.me) d.setAttribute('data-strip-me', '1');
      d.setAttribute('data-anchor', pl.userId);
      var prog = st.finished ? '✅ xong' : ('Câu ' + Math.min((st.qIndex || 0) + 1, S.room.qCount) + '/' + S.room.qCount);
      d.innerHTML = '<div class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(pl.name)) + '</div>' +
        '<span>' + (pl.me ? esc(user.call) + ' ' : '') + esc(pl.name) + '</span>' +
        '<span class="pn-score"> ' + (pl.score || 0) + 'đ</span>' +
        '<span class="pn-prog">' + esc(prog) + '</span>';
      strip.appendChild(d);
    });
  }

  function stopQuestionTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }
  function nextQuestion() {
    stopQuestionTimer();
    if (!S.deck || S.qi >= S.deck.length) { finishLocal(); return; }
    S.locked = false;
    var q = S.deck[S.qi];
    $('pnQn').textContent = 'Câu ' + (S.qi + 1) + '/' + S.deck.length;
    $('pnQPrompt').textContent = q.prompt || '';
    $('pnQSub').textContent = q.promptSub || '';
    $('pnFeedback').textContent = ''; $('pnFeedback').className = 'pn-feedback';
    var opts = $('pnOpts'), order = $('pnOrder');
    opts.innerHTML = '';
    if (q.type === 'order' && Array.isArray(q.tokens)) {
      show(opts, false); show(order, true);
      buildOrder(q);
    } else {
      show(order, false); show(opts, true);
      (q.choices || []).forEach(function (choice, idx) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'pn-opt jp'; b.textContent = choice;
        b.addEventListener('click', function () { pickChoice(idx, b); });
        opts.appendChild(b);
      });
    }
    S.qStartedAt = Date.now();
    var bar = $('pnTimerBar'), label = $('pnQt');
    S.timer = setInterval(function () {
      var left = QUESTION_TIME_MS - (Date.now() - S.qStartedAt);
      if (bar) bar.style.width = Math.max(0, left / QUESTION_TIME_MS * 100) + '%';
      if (label) label.textContent = Math.max(0, left / 1000).toFixed(1) + 's';
      if (left <= 0 && !S.locked) { S.locked = true; onTimeout(); }
    }, 80);
  }

  function buildOrder(q) {
    S.orderPicked = [];
    var built = $('pnOrderBuilt'), box = $('pnOrderTokens');
    built.innerHTML = '<span class="pn-mut">Chạm các mảnh để xếp thành câu đúng…</span>';
    box.innerHTML = '';
    shuffled(q.tokens.map(function (t, i) { return { t: t, i: i }; })).forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'pn-tok jp'; b.textContent = o.t;
      b.addEventListener('click', function () {
        if (S.locked || b.classList.contains('used')) return;
        b.classList.add('used');
        S.orderPicked.push(o.t);
        paintBuilt();
      });
      box.appendChild(b);
    });
    function paintBuilt() {
      built.innerHTML = '';
      if (!S.orderPicked.length) { built.innerHTML = '<span class="pn-mut">Chạm các mảnh để xếp thành câu đúng…</span>'; return; }
      S.orderPicked.forEach(function (t) {
        var s = document.createElement('span'); s.className = 'pn-tok jp'; s.textContent = t; built.appendChild(s);
      });
    }
    built._paint = paintBuilt; // nút "chạm câu đã xếp để làm lại" gắn 1 lần ở boot
  }
  function resetOrder() {
    if (S.locked) return;
    S.orderPicked = [];
    var box = $('pnOrderTokens');
    if (box) box.querySelectorAll('.pn-tok').forEach(function (x) { x.classList.remove('used'); });
    var built = $('pnOrderBuilt');
    if (built && built._paint) built._paint();
  }
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // Xáo trộn có seed để các máy... lưu ý: thứ tự MẢNH hiển thị không cần
  // giống nhau giữa các máy (chỉ bộ câu + đáp án cần giống), nên dùng
  // Math.random thường là đủ.

  function normSentence(s) { return String(s || '').replace(/\s+/g, '').replace(/。$/, ''); }
  function gradeAndAdvance(isCorrect, pickedIdx) {
    stopQuestionTimer();
    var q = S.deck[S.qi];
    S.answered++;
    var elapsed = Date.now() - S.qStartedAt;
    var speed = Math.max(0, 1 - elapsed / QUESTION_TIME_MS);
    if (isCorrect) {
      S.correct++; S.streak++; S.bestStreak = Math.max(S.bestStreak, S.streak);
      S.score += Math.round(500 + 500 * speed) + Math.min(150, S.streak * 25);
    } else { S.streak = 0; }
    // Tô đáp án đúng
    var opts = $('pnOpts');
    if (opts && q.choices && typeof q.answer === 'number') {
      Array.prototype.forEach.call(opts.children, function (b, i) {
        b.disabled = true;
        if (i === q.answer) b.classList.add('ok');
        else if (i === pickedIdx && !isCorrect) b.classList.add('bad');
      });
    }
    var fb = $('pnFeedback');
    fb.textContent = isCorrect ? '✅ Đúng! ' + (q.meaning ? q.meaning : '') : '❌ Đáp án đúng: ' + (q.answerText || '');
    fb.className = 'pn-feedback ' + (isCorrect ? 'ok' : 'bad');
    try {
      if (window.GFX && isCorrect) GFX.burst && GFX.burst($('pnQPrompt'));
      if (window.GTREND && GTREND.say) GTREND.say(isCorrect ? (speed > 0.6 ? 'nhanh' : (S.streak >= 3 ? 'combo' : 'dung')) : 'sai');
      if (window.GSFX && GSFX.play) GSFX.play(isCorrect ? 'correct' : 'wrong');
    } catch (e) {}
    var snapshot = { qIndex: S.qi, answered: S.answered, correct: S.correct, streak: S.streak, score: S.score };
    if (S.code) GROOMS.event(S.code, 'answer', snapshot).catch(function () {});
    S.qi++;
    setTimeout(function () { if (S.view === 'play') nextQuestion(); }, REVEAL_MS);
  }
  function pickChoice(idx, btn) {
    if (S.locked) return; S.locked = true;
    var q = S.deck[S.qi];
    gradeAndAdvance(typeof q.answer === 'number' ? idx === q.answer : String(q.choices[idx]) === String(q.answerText), idx);
  }
  function onTimeout() {
    try { if (window.GTREND && GTREND.say) GTREND.say('hetgio'); } catch (e) {}
    gradeAndAdvance(false, -1);
  }

  function finishLocal() {
    stopQuestionTimer();
    if (S.code) GROOMS.event(S.code, 'finish', { score: S.score, correct: S.correct }).catch(function () {});
    try { if (window.GAME_API && GAME_API.submitScore) GAME_API.submitScore({ mode: S.room ? S.room.mode : 'group', level: S.room ? S.room.level : 'N4', score: S.score, durationMs: S.matchStartedAt ? Date.now() - S.matchStartedAt : 0 }); } catch (e) {}
    if (S.room && S.room.players.length <= 1) { showResult(); return; }
    S.view = 'wait';
    show($('pnPlay'), false); show($('pnWait'), true);
    show($('pnForceDone'), isHost());
    renderWaitBars();
  }
  function renderWaitBars() {
    var box = $('pnWaitBars'); if (!box || !S.room) return;
    var sorted = S.room.players.slice().sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
    var max = Math.max.apply(null, sorted.map(function (p) { return p.score || 0; }).concat([1]));
    box.innerHTML = '';
    sorted.forEach(function (pl) {
      var row = document.createElement('div'); row.className = 'pn-bar';
      row.innerHTML = '<span class="pn-bar-name">' + (pl.me ? '<b>' + esc(user.call) + ' ' + esc(pl.name) + '</b>' : esc(pl.name)) + (pl.state && pl.state.finished ? ' ✅' : ' ⏳') + '</span>' +
        '<span class="pn-bar-track"><span class="pn-bar-fill" style="width:' + Math.round((pl.score || 0) / max * 100) + '%"></span></span><b>' + (pl.score || 0) + '</b>';
      box.appendChild(row);
    });
  }

  function showResult() {
    if (!S.room) return;
    S.view = 'result';
    stopQuestionTimer(); // polling KHÔNG dừng hẳn: chuyển nhịp thưa 5s để bắt rematch
    show($('pnPlay'), false); show($('pnWait'), false); show($('pnRoom'), false);
    var box = $('pnResult'); show(box, true);
    var sorted = S.room.players.slice().sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
    var me = mePlayer();
    var rank = me ? sorted.findIndex(function (p) { return p.me; }) + 1 : 0;
    var won = rank === 1 && sorted.length > 1;
    try { if (window.GTREND && GTREND.say) GTREND.say(won ? 'thang' : 'thua'); if (window.GFX && won && GFX.confetti) GFX.confetti(); } catch (e) {}
    var title = sorted.length <= 1 ? 'Ván đấu kết thúc' : (won ? '👑 Quán quân phòng!' : 'Hạng ' + rank + ' / ' + sorted.length);
    var msg = won
      ? cap(user.call) + ' ' + user.name + ' đỉnh nhất phòng luôn! 🎊'
      : cap(user.call) + ' chơi vui quá — làm ván nữa để lấy ngôi vương nhé!';
    box.innerHTML =
      '<div class="pn-card pn-podium"><div class="pn-crown">' + (won ? '👑' : '🎉') + '</div>' +
      '<h1 class="pn-h1">' + esc(title) + '</h1><p class="pn-mut">' + esc(msg) + '</p>' +
      '<p style="margin:10px 0"><span class="pn-pill">⭐ ' + (me ? me.score : S.score) + ' điểm</span> <span class="pn-pill">✅ ' + S.correct + '/' + (S.deck ? S.deck.length : S.answered) + ' đúng</span> <span class="pn-pill">⚡ Chuỗi ' + S.bestStreak + '</span></p>' +
      '<ul class="pn-rank-list">' + sorted.map(function (pl, i) {
        return '<li class="' + (pl.me ? 'me' : '') + '"><span class="pn-rk">' + (i < 3 ? ['🥇', '🥈', '🥉'][i] : (i + 1)) + '</span>' +
          '<span class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(pl.name)) + '</span>' +
          '<span class="pn-grow">' + (pl.me ? esc(user.call) + ' ' : '') + esc(pl.name) + (pl.isHost ? ' 👑' : '') + '</span><b>' + (pl.score || 0) + '</b></li>';
      }).join('') + '</ul>' +
      (isHost()
        ? '<button type="button" class="pn-btn pn-btn-main pn-blk" id="pnRematch">🔁 Chơi lại (mở ván mới)</button>'
        : '<p class="pn-note">Chờ chủ phòng mở ván mới, hoặc về sảnh tạo phòng của riêng mình.</p>') +
      '<button type="button" class="pn-btn pn-btn-alt pn-blk" id="pnBackLobby">Về sảnh</button></div>';
    var rm = $('pnRematch');
    if (rm) rm.addEventListener('click', async function () {
      rm.disabled = true;
      try { await GROOMS.event(S.code, 'rematch', {}); S.deck = null; S.deckSource = ''; resetMatchLocal(); startPolling(); enterRoomView(); }
      catch (e) { toast(e.message || 'Chưa mở được ván mới.'); rm.disabled = false; }
    });
    $('pnBackLobby').addEventListener('click', backToLobby);
    mountChat();
  }

  /* ============================ Khởi tạo + sự kiện sảnh ============================ */
  function segInit(id, key, cb) {
    var seg = $(id); if (!seg) return;
    seg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        seg.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        S.sel[key] = key === 'count' ? parseInt(b.getAttribute('data-v'), 10) : b.getAttribute('data-v');
        if (cb) cb(S.sel[key]);
      });
    });
  }
  function markSel(id, val) {
    var seg = $(id); if (!seg) return;
    seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === String(val)); });
  }

  async function boot() {
    segInit('pnModeSeg', 'mode'); segInit('pnLevelSeg', 'level'); segInit('pnTopicSeg', 'topic'); segInit('pnCountSeg', 'count');
    try { if (window.GMUSIC && GMUSIC.mountToggles) GMUSIC.mountToggles($('sndToggles')); } catch (e) {}
    await resolveUser();
    $('pnUserChip').textContent = user.loggedIn ? (user.name || 'Học viên') : 'Khách';
    if (!user.loggedIn) {
      show($('pnGuest'), true);
      return;
    }
    show($('pnLobby'), true);
    if (user.level && GR_LEVELS_HINT.includes(user.level)) { S.sel.level = user.level; markSel('pnLevelSeg', user.level); }
    $('pnHello').textContent = 'Chào ' + user.call + ' ' + user.name + '! Tạo phòng rồi gửi mã cho mọi người, hoặc nhập mã phòng có sẵn để vào chơi cùng.';
    try { if (window.GMUSIC && GMUSIC.play) GMUSIC.play('lobby'); } catch (e) {}

    // Vào thẳng phòng từ link ?room=CODE (chép mã/link mời)
    var q = new URLSearchParams(location.search);
    var fromUrl = (q.get('room') || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (fromUrl) { $('pnJoinCode').value = fromUrl; doJoin(fromUrl); }
  }
  var GR_LEVELS_HINT = ['N5', 'N4', 'N3', 'N2', 'N1'];

  async function doCreate() {
    var btn = $('pnCreate'), note = $('pnCreateNote');
    btn.disabled = true; note.textContent = 'Đang tạo phòng…';
    try {
      var j = await GROOMS.create({ mode: S.sel.mode, level: S.sel.level, topic: S.sel.topic, qCount: S.sel.count });
      S.room = j.room; S.code = j.room.code; S.lastEventId = 0;
      try { localStorage.setItem('hn_game_room', S.code); } catch (e) {}
      enterRoomView();
      startPolling();
    } catch (e) {
      note.textContent = e.message || 'Chưa tạo được phòng, thử lại nhé.';
    } finally { btn.disabled = false; }
  }
  async function doJoin(codeRaw) {
    var code = String(codeRaw || $('pnJoinCode').value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    var note = $('pnJoinNote'), btn = $('pnJoin');
    if (code.length !== 5) { note.textContent = 'Mã phòng gồm đúng 5 ký tự — kiểm tra lại giúp em nhé.'; return; }
    btn.disabled = true; note.textContent = 'Đang vào phòng ' + code + '…';
    try {
      var j = await GROOMS.join(code);
      S.room = j.room; S.code = j.room.code; S.lastEventId = 0;
      try { localStorage.setItem('hn_game_room', S.code); } catch (e) {}
      enterRoomView();
      startPolling();
      if (S.room.status === 'playing') beginMatchWithSeed(S.room.seed, S.room.qCount);
    } catch (e) {
      note.textContent = e.message || 'Chưa vào được phòng, thử lại nhé.';
    } finally { btn.disabled = false; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    boot();
    $('pnCreate').addEventListener('click', doCreate);
    $('pnJoin').addEventListener('click', function () { doJoin(); });
    $('pnJoinCode').addEventListener('keydown', function (e) { if (e.key === 'Enter') doJoin(); });
    $('pnJoinCode').addEventListener('input', function (e) { e.target.value = e.target.value.toUpperCase(); });
    $('pnCopy').addEventListener('click', function () {
      var link = location.origin + location.pathname + '?room=' + S.code;
      var done = function () { toast('Đã chép mã + link phòng ✨'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(S.code + ' — ' + link).then(done, function () { toast('Mã phòng: ' + S.code); });
      else toast('Mã phòng: ' + S.code);
    });
    $('pnLeaveLobby').addEventListener('click', backToLobby);
    $('pnStart').addEventListener('click', async function () {
      var btn = $('pnStart'); btn.disabled = true;
      try {
        // 1) Lấy bộ câu BẰNG SEED CHUNG ở máy chủ phòng
        var qs = await fetchSeedDeck(S.room.seed, S.room.qCount);
        if (qs) {
          S.deck = qs; S.deckSource = 'event';
          // 2) Gửi nguyên bộ câu cho cả phòng (đề giống hệt nhau), rồi start
          try { await GROOMS.event(S.code, 'questions', { questions: qs }); } catch (e) { /* gửi đề lỗi -> vẫn start bằng seed */ S.deckSource = 'seed'; }
          await GROOMS.event(S.code, 'start', { seed: S.room.seed, qCount: qs.length, deck: S.deckSource === 'event' ? 'event' : 'seed' });
        } else {
          await GROOMS.event(S.code, 'start', { seed: S.room.seed, qCount: S.room.qCount, deck: 'seed' });
        }
        if (S.deck) startMatch();
      } catch (e) {
        toast(e.message || 'Chưa bắt đầu được, thử lại nhé.');
        btn.disabled = false;
      }
    });
    $('pnOrderBuilt').addEventListener('click', resetOrder);
    $('pnOrderCheck').addEventListener('click', function () {
      if (S.locked || !S.deck) return;
      var q = S.deck[S.qi]; if (!q) return;
      S.locked = true;
      gradeAndAdvance(normSentence(S.orderPicked.join('')) === normSentence(q.answerText), -1);
    });
    $('pnForceDone').addEventListener('click', function () {
      if (S.code) GROOMS.event(S.code, 'finish', { score: S.score, correct: S.correct, final: true }).catch(function () {});
    });
    window.addEventListener('pagehide', function () {
      // Rời phòng êm khi đóng tab (không chờ phản hồi)
      if (S.code && user.loggedIn) {
        try {
          var tok = sessionToken();
          fetch(ENDPOINT + '/game/rooms/leave', {
            method: 'POST', keepalive: true,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok },
            body: JSON.stringify({ code: S.code }),
          });
        } catch (e) {}
      }
    });
  });
})();
