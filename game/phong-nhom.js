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

  /* ============================ Người dùng ============================
   * Đồng bộ TÊN (Nhánh N): nguồn DUY NHẤT cho user.name/call là
   * window.GAME_USER của game.js (hồ sơ web mới nhất trên máy chủ).
   * ĐÃ BỎ fallback tự gọi /auth/me lấy tên ở đây: tên tài khoản đó có
   * thể cũ hơn tên hồ sơ và từng thắng tên mới. api() phía trên CHỈ còn
   * dùng cho /game/rooms/* (máy chủ tự nhận diện người chơi qua token,
   * payload phòng không gắn tên nào từ client).
   * game.js phát sự kiện window 'hn-game-user' mỗi khi resolve xong
   * (kể cả sau GAME_USER_REFRESH) — nghe ở cuối khối này để áp lại tên
   * và vẽ lại mọi nhãn đã hiện (xem paintIdentity). */
  var user = { loggedIn: false, name: '', call: 'bạn', gender: null, level: null };
  function applyGameUser(gu) {
    if (!gu) return user;
    user.loggedIn = !!gu.loggedIn;
    user.name = gu.name || '';
    user.call = gu.call || (user.loggedIn ? (gu.name || 'anh') : 'bạn');
    user.gender = gu.gender || null;
    user.level = gu.level || null;
    if (!user.loggedIn) { user.name = ''; user.call = 'bạn'; }
    return user;
  }
  async function resolveUser() {
    try {
      if (window.GAME_USER) applyGameUser(await window.GAME_USER);
    } catch (e) {}
    return user;
  }
  // Tên HIỂN THỊ của một người chơi trong phòng: dòng của mình luôn lấy
  // tên GAME_USER hiện tại (máy chủ ghi tên lúc vào phòng, có thể đã cũ
  // nếu vừa đổi tên hồ sơ); người khác giữ nguyên tên máy chủ trả về.
  function shownName(pl) {
    if (!pl) return '';
    return pl.me ? (user.name || pl.name || '') : (pl.name || '');
  }

  /* Đợt 5 Nhánh C: BIỂN TÊN (.gnp của GNAME) treo trên đầu chip/người của
   * từng người chơi ở roster + dải trận. Tên mình = shownName (user.name
   * MỚI NHẤT; biển .gnp-own còn tự cập nhật theo sự kiện 'hn-game-user'
   * nhờ nameplate.js), người khác = pl.name từ dữ liệu phòng. GNAME vắng
   * (coordinator chưa gắn nameplate.js vào trang này) -> tự dựng span
   * .gnp tương đương. Chỉ DOM hiển thị — không đổi payload/luồng phòng. */
  function pnPlate(pl) {
    var nm = shownName(pl);
    if (!nm) return '';
    if (window.GNAME && typeof GNAME.plate === 'function') return GNAME.plate(nm, { own: !!pl.me });
    return '<span class="gnp' + (pl.me ? ' gnp-own' : '') + '">' + esc(nm) + '</span>';
  }

  /* Vẽ lại MỌI nhãn tên của mình đã hiện trên trang theo user hiện tại:
   * chip góc trên, lời chào sảnh, danh sách phòng chờ, dải điểm trong
   * trận, thanh chờ kết quả, màn kết quả và nhãn Chém gió (mount lại
   * GCHAT — chat.js giữ me/call trong closure lúc mount, không có API
   * đổi tên; mountChat(true) giữ lại nội dung feed cũ). */
  function paintIdentity() {
    var chip = $('pnUserChip');
    if (chip) chip.textContent = user.loggedIn ? (user.name || 'Học viên') : 'Khách';
    var hello = $('pnHello');
    if (hello && user.loggedIn) {
      hello.textContent = 'Chào ' + user.call + ' ' + user.name + '! Tạo phòng rồi gửi mã cho mọi người, hoặc nhập mã phòng có sẵn để vào chơi cùng.';
    }
    if (S.view === 'room') renderRoom();
    if (S.view === 'play' || S.view === 'wait') { renderStrip(); renderCoopHud(); }
    if (S.view === 'wait') renderWaitBars();
    if (S.view === 'result') paintResultNames();
    paintMyRoomFace(); // F: mặt hồ sơ của mình, vẽ lại khi hn-game-user đổi
    if (S.chatReady) mountChat(true);
  }
  function paintResultNames() {
    var box = $('pnResult'); if (!box || !S.room) return;
    var me = mePlayer();
    var row = box.querySelector('.pn-rank-list li.me .pn-grow, .pn-coop-table li.me .pn-grow');
    if (row && me) row.innerHTML = esc(user.call) + ' ' + esc(shownName(me)) + (me.isHost ? ' 👑' : '');
    var msg = box.querySelector('.pn-podium .pn-mut');
    if (msg && S.resultInfo) {
      msg.textContent = S.resultInfo.won
        ? cap(user.call) + ' ' + user.name + ' đỉnh nhất phòng luôn! 🎊'
        : cap(user.call) + ' chơi vui quá — làm ván nữa để lấy ngôi vương nhé!';
    }
  }
  window.addEventListener('hn-game-user', function (ev) {
    applyGameUser((ev && ev.detail) || window.GAME_USER_DATA);
    paintIdentity();
  });
  var lastUserRefresh = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') return;
    var now = Date.now();
    if (now - lastUserRefresh < 30000) return; // tránh gọi dồn khi tab chớp tắt
    lastUserRefresh = now;
    if (typeof window.GAME_USER_REFRESH === 'function') {
      try { window.GAME_USER_REFRESH(); } catch (e) { /* bỏ qua */ }
    }
  });

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
    chatReady: false, chatName: null, chatCall: null, // tên/call đã mount vào GCHAT
    resultInfo: null,               // {won, rank, count} của màn kết quả đang hiện
    sel: { mode: 'group', level: 'N4', topic: 'mix', count: 10, style: 'versus', coop: { qCount: 10, timeSec: 15, livesOn: true, lives: 3 } },
    /* --- Hợp sức (co-op): chỉ sống khi room.style === 'coop' --- */
    coop: null,              // snapshot trạng thái đội mới nhất (room.coop / sự kiện start)
    coopResolution: null,    // resolution của câu hiện tại (để vẽ HUD/feedback)
    coopRevealedQi: -1,      // qIndex đã hiện reveal (chống áp lại)
    coopNextSentQi: -1,      // qIndex đã gửi coop_next (chống gửi trùng)
    coopNextTimer: null, coopFallbackTimer: null,
    coopSubmitted: false,    // đã nộp điểm cá nhân mode 'coop' cho ván này chưa
    coopFinish: null,        // payload coop_finish (nếu nhận qua sự kiện trước khi status=done)
    _foeCorrectSeen: {},     // E/GCOMBAT: tổng đúng lũy kế đã thấy theo userId (tính boolean câu vừa trả lời)
  };

  /* ============================ E: GCOMBAT (chỉ versus) + F: mặt hồ sơ ============================ */
  function combatOn() {
    return !!(window.GCOMBAT && S.room && S.room.style !== 'coop');
  }
  function answerBoolNow(ev) {
    // Boolean của câu VỪA trả lời, tính bằng HIỆU SỐ lũy kế:
    // - payload gốc client gửi mang correct = TỔNG đúng lũy kế (snapshot
    //   của gradeAndAdvance), nhưng máy chủ LƯU LẠI sự kiện 'answer' thành
    //   { qIndex, correct: !!correct, score } — boolean đó chỉ còn nghĩa
    //   "đã từng đúng >= 1 câu", KHÔNG dùng thẳng được.
    // - Nguồn lũy kế đáng tin lúc handleEvent chạy: state.correct của
    //   chính người đó trong S.room MỚI NHẤT (applyState đã cập nhật
    //   S.room trước khi phát sự kiện) — đối chiếu với mốc đã thấy
    //   (S._foeCorrectSeen = "trước") -> hiệu số > 0 tức câu này đúng.
    // - Không có state (phòng lạ) mới rơi về hiệu số trên payload số.
    var p = (ev && ev.payload) || {};
    S._foeCorrectSeen = S._foeCorrectSeen || {};
    var k = String(ev && ev.userId);
    var prev = S._foeCorrectSeen[k] || 0;
    var pl = coopPlayerById(ev && ev.userId);
    var cum = (pl && pl.state && typeof pl.state.correct === 'number') ? pl.state.correct
      : (typeof p.correct === 'number' ? p.correct : null);
    if (cum == null) return !!p.correct; // không có nguồn lũy kế: dùng boolean máy chủ lưu
    S._foeCorrectSeen[k] = cum;
    return cum > prev; // câu này đúng khi tổng đúng lũy kế vừa tăng
  }
  function paintMyRoomFace(scope) {
    if (!window.GAME_AVATAR || !window.GAME_USER_DATA) return;
    var cfg;
    try { cfg = GAME_AVATAR.load(); } catch (e) { return; }
    if (!cfg || cfg.face !== 'hoso' || !GAME_USER_DATA.avatarUrl) return; // chưa chọn/không có ảnh: giữ chữ cái đầu
    var root = scope || document;
    var els = [];
    try { els = root.querySelectorAll ? Array.prototype.slice.call(root.querySelectorAll('.pn-ava.me')) : []; } catch (e) { els = []; }
    // scope có thể chính là phần tử .pn-ava.me (không có ở các nơi gọi hiện tại, giữ an toàn)
    els.forEach(function (el) { el.innerHTML = GAME_AVATAR.faceHTML(cfg, 48); });
  }

  /* ============================ Hợp sức: tiện ích ============================
   * Nguyên tắc cứng của contract: style vắng mặt/'versus' -> mọi đường
   * code coop dưới đây bất hoạt, hành vi đối kháng cũ giữ nguyên 100%. */
  function isCoopRoom() { return !!(S.room && S.room.style === 'coop'); }
  function normCoopCfg(c) {
    c = c || {};
    return {
      qCount: [10, 15, 20].indexOf(+c.qCount) >= 0 ? +c.qCount : 10,
      timeSec: [10, 15, 20, 30].indexOf(+c.timeSec) >= 0 ? +c.timeSec : 15,
      livesOn: typeof c.livesOn === 'boolean' ? c.livesOn : true,
      lives: Math.min(5, Math.max(1, parseInt(c.lives, 10) || 3)),
    };
  }
  function coopCfg() {
    if (S.room && S.room.coopCfg) return normCoopCfg(S.room.coopCfg);
    return normCoopCfg(S.sel.coop);
  }
  function coopTimeMs() { return coopCfg().timeSec * 1000; }
  function questionTimeMs() { return isCoopRoom() ? coopTimeMs() : QUESTION_TIME_MS; }
  function coopDisplayName(pl) {
    if (!pl) return '';
    return (pl.me ? user.call + ' ' : '') + shownName(pl);
  }
  function coopPlayerById(uid) {
    if (!S.room || uid == null) return null;
    return S.room.players.find(function (p) { return String(p.userId) === String(uid); }) || null;
  }
  function coopActorLabel(res) {
    if (!res || res.timeout || res.by == null) return '';
    var pl = coopPlayerById(res.by);
    if (pl) return coopDisplayName(pl);
    return res.name || '';
  }
  function clearCoopTimers() {
    if (S.coopNextTimer) { clearTimeout(S.coopNextTimer); S.coopNextTimer = null; }
    if (S.coopFallbackTimer) { clearTimeout(S.coopFallbackTimer); S.coopFallbackTimer = null; }
  }

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
    if (S.room.status === 'done' && (S.view === 'play' || S.view === 'wait')) {
      if (isCoopRoom()) showCoopResult(); else showResult();
    }
    if (S.room.status === 'waiting' && prevStatus === 'done' && S.view === 'result') enterRoomView();
    // Hợp sức: khớp lại từ snapshot room.coop khi lỡ sự kiện / nạp lại trang.
    if (isCoopRoom() && S.room.coop) syncCoopSnapshot(S.room.coop);
    if (S.view === 'room') renderRoom();
    if (S.view === 'play' || S.view === 'wait') { renderStrip(); renderCoopHud(); }
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
        if (p.coop) S.coop = p.coop; // snapshot đội kèm sự kiện start (phòng coop)
        if (S.deck && S.deckSource === 'event') { startMatch(); }
        else { beginMatchWithSeed(p.seed || (S.room && S.room.seed), p.qCount || (S.room && S.room.qCount)); }
        if (S.view === 'play') { renderStrip(); renderCoopHud(); }
        break;
      case 'coop_config':
        if (p.coop && S.room) { S.room.coopCfg = normCoopCfg(p.coop); if (S.view === 'room') renderRoom(); }
        break;
      case 'coop_locked':
        if (p.resolution) applyCoopResolution(p.resolution);
        break;
      case 'coop_question':
        if (typeof p.qIndex === 'number') gotoCoopQuestion(p.qIndex, p.startedAt);
        break;
      case 'coop_finish':
        S.coopFinish = p;
        if (S.view === 'play' || S.view === 'wait') showCoopResult(p);
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
        // E/GCOMBAT: đòn của ĐỐI THỦ (bỏ qua sự kiện của chính mình — đã tính ở gradeAndAdvance).
        // payload.correct là LŨY KẾ nên phải tính boolean bằng hiệu số (answerBoolNow).
        var mePlA = mePlayer();
        var isMineA = mePlA && String(ev.userId) === String(mePlA.userId);
        if (!isMineA && combatOn()) {
          GCOMBAT.hit('foe', answerBoolNow(ev), 10);
        } else if (!isMineA) {
          // Vẫn cập nhật mốc lũy kế kể cả khi chưa mount/không combat, tránh lệch khi mount muộn.
          answerBoolNow(ev);
        }
        break;
      }
      case 'rematch':
        S.deck = null; S.deckSource = ''; S.pendingStart = false;
        resetMatchLocal();
        if (S.view !== 'room') enterRoomView(); else renderRoom();
        break;
      case 'system':
        if (p.text === 'done' && (S.view === 'play' || S.view === 'wait')) {
          if (isCoopRoom()) showCoopResult(); else showResult();
        }
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
    $('pnRoomMeta').textContent = isCoopRoom()
      ? '🤝 Hợp sức · ' + S.room.level + ' · ' + topicName(S.room.topic) + ' · ' + coopCfg().qCount + ' câu'
      : (S.room.mode === 'versus' ? '⚔️ Đối kháng' : '👥 Nhóm') + ' · ' + S.room.level + ' · ' + topicName(S.room.topic) + ' · ' + S.room.qCount + ' câu';
    $('pnRoomCount').textContent = S.room.players.length + '/' + S.room.maxPlayers + ' người';
    var grid = $('pnPlayers');
    grid.innerHTML = '';
    for (var i = 0; i < S.room.maxPlayers; i++) {
      var pl = S.room.players[i];
      var d = document.createElement('div');
      if (pl) {
        d.className = 'pn-pl'; d.setAttribute('data-anchor', pl.userId);
        d.innerHTML = pnPlate(pl) +
          '<div class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(shownName(pl))) + '</div>' +
          (pl.me ? esc(user.call) + ' ' : '') + esc(shownName(pl)) +
          (pl.isHost ? '<span class="pn-host">👑 Chủ phòng</span>' : '') +
          (pl.online ? '' : '<span class="pn-off">ngoại tuyến</span>');
      } else {
        d.className = 'pn-pl wait';
        d.innerHTML = '<div class="pn-ava"></div>trống';
      }
      grid.appendChild(d);
    }
    paintMyRoomFace(grid);
    renderRoomCoop();
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
    clearCoopTimers();
    if (code && user.loggedIn && !silent) { try { await GROOMS.leave(code); } catch (e) {} }
    S.code = ''; S.room = null; S.deck = null; S.lastEventId = 0;
    if (window.GCHAT) GCHAT.destroy(); S.chatReady = false; S.chatName = null; S.chatCall = null;
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
  function mountChat(force) {
    if (!window.GCHAT) return;
    var mountEl = $('pnChatMount'); if (!mountEl) return;
    // Việc G: đổi kiểu phòng (Đối kháng <-> Hợp sức) cũng phải mount lại
    // để thẻ câu tổ đội hiện/ẩn đúng, kể cả khi tên người chơi không đổi.
    var wantStyle = (S.room && S.room.style === 'coop') ? 'coop' : 'versus';
    if (S.chatReady && !force && S.chatStyle === wantStyle) return;
    if (S.chatReady && S.chatStyle !== wantStyle) force = true;
    // Đã mount đúng tên hiện tại rồi thì thôi (tránh mount lại thừa).
    if (S.chatReady && !force && S.chatName === user.name && S.chatCall === user.call) return;
    // Mount lại vì tên đổi: giữ nội dung feed cũ (mount() của chat.js
    // tự destroy() bản cũ nên feed sẽ bị xoá nếu không chép sang).
    var oldFeed = '';
    if (S.chatReady) {
      var oldList = mountEl.querySelector('#cgList');
      if (oldList) oldFeed = oldList.innerHTML;
    }
    GCHAT.mount({
      mountEl: mountEl,
      me: { id: user.name, name: user.name },
      call: user.call,
      anchorFor: function (key) {
        var els = document.querySelectorAll('[data-anchor]');
        for (var i = 0; i < els.length; i++) if (els[i].getAttribute('data-anchor') === String(key)) return els[i].querySelector('.pn-ava') || els[i];
        // dự phòng: neo vào avatar của chính mình trong dải trận
        var me = document.querySelector('[data-strip-me] .pn-ava');
        return me || null;
      },
      // Việc G: chỉ phòng HỢP SỨC mới có bộ câu trend tổ đội hai kiểu.
      teamSets: (S.room && S.room.style === 'coop' && window.GTREND_TEAM) ? GTREND_TEAM.sets : null,
      // Việc G: tình thế đội lúc mở panel — vừa chốt đúng -> 'win',
      // vừa chốt sai/hết giờ -> 'lose', mạng chung còn <=1 -> 'lose',
      // còn lại trung tính. chat.js lọc câu theo thẻ tình huống này.
      situationFor: function () {
        if (!(S.room && S.room.style === 'coop')) return 'neu';
        var lock = S.coopResolution || (S.coop && S.coop.locked) || null;
        if (lock && typeof lock.correct === 'boolean') return lock.correct ? 'win' : 'lose';
        var cfg = coopCfgOf(S.room);
        if (cfg.livesOn && S.coop && typeof S.coop.livesLeft === 'number' && S.coop.livesLeft <= 1) return 'lose';
        return 'neu';
      },
      onSendTrend: function (text) {
        if (S.code) GROOMS.event(S.code, 'chem', { text: text, moment: 'chem' }).catch(function () {});
      },
      onSendText: function (text) {
        if (S.code) GROOMS.event(S.code, 'chat', { text: text }).catch(function () {});
      },
    });
    if (oldFeed) {
      var newList = mountEl.querySelector('#cgList');
      if (newList) newList.innerHTML = oldFeed;
    }
    S.chatReady = true;
    S.chatName = user.name; S.chatCall = user.call;
    S.chatStyle = wantStyle;
  }

  /* ============================ Trận đấu ============================ */
  function resetMatchLocal() {
    if (window.GCOMBAT) { try { GCOMBAT.reset(); } catch (e) {} }
    S._foeCorrectSeen = {};
    S._finDone = false; S._coopFinDone = false; /* cờ kết liễu (đợt 3): reset mỗi ván */
    S.qi = 0; S.score = 0; S.correct = 0; S.answered = 0; S.streak = 0; S.bestStreak = 0; S.locked = false;
    clearCoopTimers();
    S.coopResolution = null; S.coopRevealedQi = -1; S.coopNextSentQi = -1;
    S.coopSubmitted = false; S.coopFinish = null;
    if (isCoopRoom()) S.coop = null; // máy chủ rematch cũng reset trạng thái đội về null
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
    renderCoopHud();
    // E/GCOMBAT: chỉ phòng đối kháng (versus) — coop không mount, không hit.
    if (combatOn()) {
      var foePl = S.room.players.find(function (p) { return !p.me; });
      try {
        GCOMBAT.mountVersus($('pnCombat'), {
          meName: (user.name || 'Mình'),
          foeName: foePl ? shownName(foePl) : 'Đối thủ',
          dmg: 10
        });
      } catch (e) {}
    } else {
      var pc = $('pnCombat'); if (pc) pc.innerHTML = '';
    }
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
      if (isCoopRoom()) {
        // Hợp sức: hiện ĐÓNG GÓP cá nhân (số đúng · điểm cá nhân) thay điểm đua.
        var contrib = (S.coop && S.coop.contrib && S.coop.contrib[pl.userId]) || { answered: 0, correct: 0, wrong: 0, points: 0 };
        d.innerHTML = pnPlate(pl) +
          '<div class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(shownName(pl))) + '</div>' +
          '<span>' + (pl.me ? esc(user.call) + ' ' : '') + esc(shownName(pl)) + '</span>' +
          '<span class="pn-score"> ✓ ' + (contrib.correct || 0) + ' · ' + (contrib.points || 0) + 'đ</span>' +
          '<span class="pn-prog">đã chốt ' + (contrib.answered || 0) + ' câu</span>';
        strip.appendChild(d);
        return;
      }
      var prog = st.finished ? '✅ xong' : ('Câu ' + Math.min((st.qIndex || 0) + 1, S.room.qCount) + '/' + S.room.qCount);
      d.innerHTML = pnPlate(pl) +
        '<div class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(shownName(pl))) + '</div>' +
        '<span>' + (pl.me ? esc(user.call) + ' ' : '') + esc(shownName(pl)) + '</span>' +
        '<span class="pn-score"> ' + (pl.score || 0) + 'đ</span>' +
        '<span class="pn-prog">' + esc(prog) + '</span>';
      strip.appendChild(d);
    });
    paintMyRoomFace(strip); // F: chỉ .pn-ava.me, giữ nguyên phần tử neo chat
  }

  /* ============================ Hợp sức: phòng chờ ============================ */
  function coopSummaryText(cfg) {
    cfg = cfg || coopCfg();
    return '🤝 ' + cfg.qCount + ' câu · ' + cfg.timeSec + 's/câu · ' + (cfg.livesOn ? '❤️ Mạng chung ×' + cfg.lives : 'Mạng chung: Tắt');
  }
  function markCoopSegs(prefix, cfg, disabled) {
    markSel(prefix + 'CountSeg', cfg.qCount);
    markSel(prefix + 'TimeSeg', cfg.timeSec);
    markSel(prefix + 'LivesOnSeg', cfg.livesOn ? 'on' : 'off');
    markSel(prefix + 'LivesSeg', cfg.lives);
    show($(prefix + 'LivesWrap'), cfg.livesOn);
    [prefix + 'CountSeg', prefix + 'TimeSeg', prefix + 'LivesOnSeg', prefix + 'LivesSeg'].forEach(function (id) {
      var seg = $(id); if (!seg) return;
      seg.querySelectorAll('button').forEach(function (b) { b.disabled = !!disabled; });
    });
  }
  function renderRoomCoop() {
    var box = $('pnRoomCoop'); if (!box) return;
    if (!isCoopRoom()) { show(box, false); return; }
    show(box, true);
    var cfg = coopCfg();
    $('pnRoomCoopSummary').textContent = coopSummaryText(cfg);
    var note = $('pnRoomCoopEditNote');
    if (note) note.textContent = isHost() ? '(chủ phòng sửa được, cả phòng thấy ngay)' : '(chỉ chủ phòng sửa được)';
    markCoopSegs('pnRoomCoop', cfg, !isHost());
  }
  function sendCoopConfig() {
    if (!isHost() || !S.code) return;
    var cfg = coopCfg();
    GROOMS.event(S.code, 'coop_config', { coop: cfg }).catch(function () {});
  }

  /* ============================ Hợp sức: HUD đội ============================ */
  function renderCoopHud() {
    var el = $('pnCoopHud'); if (!el) return;
    if (!isCoopRoom() || S.view !== 'play') { show(el, false); return; }
    show(el, true);
    var cfg = coopCfg();
    var snap = S.coop || {};
    var total = snap.total || cfg.qCount || (S.room && S.room.qCount) || 0;
    var cur = Math.min((typeof snap.qIndex === 'number' ? snap.qIndex : S.qi) + 1, total || 1);
    var livesPart = '';
    if (cfg.livesOn) {
      var left = (snap.livesLeft != null ? snap.livesLeft : cfg.lives);
      livesPart = ' · ❤️×' + left;
    }
    var actorHtml = '';
    var lock = S.coopResolution || snap.locked || null;
    if (lock) {
      if (lock.timeout || lock.by == null) {
        actorHtml = '<span class="pn-coophud-actor bad">Vừa trả lời: ⏰ Hết giờ — Sai ❌</span>';
      } else {
        actorHtml = '<span class="pn-coophud-actor ' + (lock.correct ? 'ok' : 'bad') + '">Vừa trả lời: ' +
          esc(coopActorLabel(lock)) + ' — ' + (lock.correct ? 'Đúng ✅' : 'Sai ❌') + '</span>';
      }
    }
    el.innerHTML = '🤝 Điểm đội ' + (snap.teamScore || 0) + livesPart + ' · Câu ' + cur + '/' + total + actorHtml;
  }

  /* ============================ Hợp sức: trong trận ============================ */
  function localGradeCoop(q, payload) {
    // Chỉ để gửi kèm field correct khi phòng không có deck phía máy chủ;
    // máy chủ vẫn tự chấm bằng deck sự kiện khi có.
    if (payload.choice != null && q) {
      return typeof q.answer === 'number' ? payload.choice === q.answer : String(q.choices[payload.choice]) === String(q.answerText);
    }
    if (payload.orderText != null && q) return normSentence(payload.orderText) === normSentence(q.answerText);
    return false;
  }
  function sendCoopAnswer(payload) {
    if (!S.code) return;
    payload.correct = localGradeCoop(S.deck && S.deck[S.qi], payload);
    GROOMS.event(S.code, 'coop_answer', payload).then(function (j) {
      if (j && j.resolution) applyCoopResolution(j.resolution);
    }).catch(function () { /* resolution còn đến qua sự kiện coop_locked / poll */ });
  }
  function coopPickChoice(idx, btn) {
    S.locked = true;
    var opts = $('pnOpts');
    if (opts) Array.prototype.forEach.call(opts.children, function (b) { b.disabled = true; });
    if (btn) btn.classList.add('picked');
    sendCoopAnswer({ qIndex: S.qi, choice: idx });
  }
  function coopSubmitOrder() {
    S.locked = true;
    var chk = $('pnOrderCheck'); if (chk) chk.disabled = true;
    var box = $('pnOrderTokens');
    if (box) box.querySelectorAll('.pn-tok').forEach(function (x) { x.classList.add('used'); });
    sendCoopAnswer({ qIndex: S.qi, orderText: S.orderPicked.join('') });
  }
  function onCoopTimeout() {
    if (!S.code) return;
    var fb = $('pnFeedback');
    if (fb) { fb.textContent = '⏰ Hết giờ! Đang chờ đội chốt…'; fb.className = 'pn-feedback bad'; }
    GROOMS.event(S.code, 'coop_timeout', { qIndex: S.qi }).then(function (j) {
      if (j && j.resolution) applyCoopResolution(j.resolution);
    }).catch(function () { /* sự kiện coop_locked sẽ về qua poll */ });
  }
  function applyCoopResolution(res) {
    if (!isCoopRoom() || !res || S.view !== 'play' || !S.deck) return;
    if (typeof res.qIndex === 'number' && res.qIndex !== S.qi) return;
    // Gộp resolution vào snapshot đội để HUD/dải điểm khớp ngay.
    S.coop = Object.assign({}, S.coop || {}, {
      qIndex: (typeof res.qIndex === 'number' ? res.qIndex : S.qi), phase: 'reveal',
      teamScore: (res.teamScore != null ? res.teamScore : (S.coop && S.coop.teamScore) || 0),
      teamCorrect: (res.teamCorrect != null ? res.teamCorrect : (S.coop && S.coop.teamCorrect) || 0),
      livesLeft: (res.livesLeft !== undefined ? res.livesLeft : (S.coop && S.coop.livesLeft)),
      contrib: res.contrib || (S.coop && S.coop.contrib) || {},
      locked: { by: res.by != null ? res.by : null, choice: res.choice != null ? res.choice : null, orderText: res.orderText, correct: !!res.correct, timeout: !!res.timeout, points: res.points || 0 },
    });
    S.coopResolution = S.coop.locked;
    renderCoopHud(); renderStrip();
    if (S.coopRevealedQi === S.qi) return; // đã reveal câu này rồi: chỉ đồng bộ số liệu
    S.coopRevealedQi = S.qi;
    stopQuestionTimer();
    S.locked = true;
    var q = S.deck[S.qi];
    var correctIdx = (res.correctAnswer && typeof res.correctAnswer.index === 'number') ? res.correctAnswer.index
      : (q && typeof q.answer === 'number' ? q.answer : -1);
    var opts = $('pnOpts');
    if (opts && q && q.choices) {
      Array.prototype.forEach.call(opts.children, function (b, i) {
        b.disabled = true;
        if (i === correctIdx) b.classList.add('ok');
        else if (res.choice != null && i === res.choice && !res.correct) b.classList.add('bad');
      });
    }
    var chk = $('pnOrderCheck'); if (chk) chk.disabled = true;
    var cfg = coopCfg();
    var consequence = res.correct
      ? 'Đội được +' + (res.points || 0) + ' điểm.'
      : (cfg.livesOn ? 'Đội mất 1 mạng — ❤️ còn ' + (res.livesLeft != null ? res.livesLeft : '?') + '.' : 'Không mất mạng (mạng chung đang tắt).');
    var fb = $('pnFeedback');
    if (fb) {
      if (res.timeout || res.by == null) {
        fb.textContent = '⏰ Hết giờ — tính như sai! ' + consequence + (q && q.answerText ? ' Đáp án đúng: ' + q.answerText : '');
      } else if (res.correct) {
        fb.textContent = '✅ ' + coopActorLabel(res) + ' trả lời đúng! ' + consequence + (q && q.meaning ? ' ' + q.meaning : '');
      } else {
        fb.textContent = '❌ ' + coopActorLabel(res) + ' trả lời sai. ' + consequence + ' Đáp án đúng: ' +
          ((res.correctAnswer && res.correctAnswer.text) || (q && q.answerText) || '');
      }
      fb.className = 'pn-feedback ' + (res.correct ? 'ok' : 'bad');
    }
    try {
      if (window.GFX && res.correct) GFX.burst && GFX.burst($('pnQPrompt'));
      if (window.GTREND && GTREND.say) GTREND.say(res.correct ? 'dung' : (res.timeout ? 'hetgio' : 'sai'));
      if (window.GSFX && GSFX.play) GSFX.play(res.correct ? 'correct' : 'wrong');
    } catch (e) {}
    scheduleCoopNext(S.qi);
  }
  function scheduleCoopNext(qi) {
    clearCoopTimers();
    if (S.coopNextSentQi === qi) return;
    var send = function () {
      if (S.view !== 'play' || S.qi !== qi || S.coopNextSentQi === qi) return;
      S.coopNextSentQi = qi;
      if (S.code) GROOMS.event(S.code, 'coop_next', { qIndex: qi }).catch(function () {});
    };
    if (isHost()) {
      S.coopNextTimer = setTimeout(send, REVEAL_MS); // chủ phòng: sau reveal 1800ms
    } else {
      S.coopFallbackTimer = setTimeout(send, 4000); // khách: fallback sau 4s nếu chưa sang câu/kết thúc
    }
  }
  function gotoCoopQuestion(qIndex, startedAt) {
    if (!isCoopRoom() || !S.deck) return;
    clearCoopTimers();
    S.coopRevealedQi = -1; S.coopNextSentQi = -1; S.coopResolution = null;
    S.coop = Object.assign({}, S.coop || {}, { qIndex: qIndex, phase: 'ask', locked: null, startedAt: startedAt || Date.now() });
    S.qi = qIndex;
    if (S.view !== 'play') {
      S.view = 'play';
      show($('pnRoom'), false); show($('pnWait'), false); show($('pnResult'), false);
      show($('pnPlay'), true);
      mountChat();
    }
    renderStrip();
    nextQuestion(startedAt);
    renderCoopHud();
  }
  function syncCoopSnapshot(snap) {
    if (!snap || S.view !== 'play') { if (snap) S.coop = snap; return; }
    var prevQi = S.coop ? S.coop.qIndex : null;
    S.coop = snap;
    if (typeof snap.qIndex === 'number' && snap.qIndex !== S.qi && snap.phase === 'ask' && S.deck) {
      gotoCoopQuestion(snap.qIndex, snap.startedAt);
      return;
    }
    if (snap.phase === 'reveal' && snap.locked && S.deck && snap.qIndex === S.qi) {
      var lk = snap.locked;
      applyCoopResolution({
        qIndex: snap.qIndex, by: lk.by, choice: lk.choice, orderText: lk.orderText,
        correct: !!lk.correct, timeout: !!lk.timeout, points: lk.points || 0,
        teamScore: snap.teamScore, teamCorrect: snap.teamCorrect, livesLeft: snap.livesLeft, contrib: snap.contrib,
      });
      return;
    }
    if (snap.phase === 'ask' && (prevQi !== snap.qIndex)) S.coopResolution = null;
    renderCoopHud(); renderStrip();
  }

  /* ============================ Hợp sức: kết quả đội ============================ */
  function showCoopResult(finish) {
    if (!S.room || S.view === 'result') return;
    var data = finish || S.coopFinish || {};
    var snap = S.coop || {};
    var teamScore = data.teamScore != null ? data.teamScore : (snap.teamScore || 0);
    var teamCorrect = data.teamCorrect != null ? data.teamCorrect : (snap.teamCorrect || 0);
    var cfg = coopCfg();
    var total = data.total || snap.total || cfg.qCount || (S.deck ? S.deck.length : 0);
    var livesLeft = data.livesLeft !== undefined ? data.livesLeft : snap.livesLeft;
    var contrib = data.contrib || snap.contrib || {};
    S.view = 'result';
    S.resultInfo = null;
    stopQuestionTimer(); clearCoopTimers();
    show($('pnPlay'), false); show($('pnWait'), false); show($('pnRoom'), false);
    var box = $('pnResult'); show(box, true);
    var rows = S.room.players.map(function (pl) {
      var c = contrib[pl.userId] || { answered: 0, correct: 0, wrong: 0, points: 0 };
      return { pl: pl, c: c };
    }).sort(function (a, b) { return (b.c.points || 0) - (a.c.points || 0); });
    try { if (window.GTREND && GTREND.say) GTREND.say('thang'); if (window.GFX && GFX.confetti) GFX.confetti(); } catch (e) {}
    box.innerHTML =
      '<div class="pn-card pn-podium"><div class="pn-crown">🤝</div>' +
      '<h1 class="pn-h1">Kết quả hợp sức</h1>' +
      '<p style="margin:10px 0"><span class="pn-pill">🤝 Điểm đội ' + teamScore + '</span> ' +
      '<span class="pn-pill">✅ Đúng ' + teamCorrect + '/' + total + '</span>' +
      (cfg.livesOn ? ' <span class="pn-pill">❤️ Mạng còn ' + (livesLeft != null ? livesLeft : cfg.lives) + '</span>' : '') + '</p>' +
      '<ul class="pn-coop-table">' + rows.map(function (r) {
        return '<li class="' + (r.pl.me ? 'me' : '') + '"><span class="pn-ava' + (r.pl.me ? ' me' : '') + '">' + esc(initial(shownName(r.pl))) + '</span>' +
          '<span class="pn-grow">' + esc(coopDisplayName(r.pl)) + (r.pl.isHost ? ' 👑' : '') +
          '<span class="pn-coop-detail">đã chốt ' + (r.c.answered || 0) + ' câu · đúng ' + (r.c.correct || 0) + ' · sai ' + (r.c.wrong || 0) + '</span></span>' +
          '<b>' + (r.c.points || 0) + 'đ</b></li>';
      }).join('') + '</ul>' +
      (isHost()
        ? '<button type="button" class="pn-btn pn-btn-main pn-blk" id="pnCoopRematch">🔁 Chơi lại (giữ cài đặt)</button>'
        : '<p class="pn-note">Chờ chủ phòng mở ván mới (giữ nguyên cài đặt hợp sức), hoặc về sảnh tạo phòng của riêng mình.</p>') +
      '<button type="button" class="pn-btn pn-btn-alt pn-blk" id="pnCoopBackLobby">Về sảnh</button></div>';
    paintMyRoomFace(box);
    /* Kết liễu BOSS (đợt 4): hợp sức thắng = đội không bị hết mạng; hết
       mạng = thua, không chạy. Phòng nhóm không có boss riêng của ván ->
       playBoss tự lấy GBOSS.next() không trùng. */
    var coopWon = !(cfg.livesOn && (livesLeft != null ? livesLeft : cfg.lives) <= 0);
    if (coopWon && window.GFIN && !S._coopFinDone) { S._coopFinDone = true; try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: box.querySelector('.pn-ava.me'), toEl: box.querySelector('.pn-crown'), dmg: teamScore }); else GFIN.play({ fromEl: box.querySelector('.pn-ava.me'), toEl: box.querySelector('.pn-crown'), dmg: teamScore }); } catch (e) {} }
    // Nộp điểm CÁ NHÂN của mình (contrib[me].points) đúng 1 lần/ván.
    if (!S.coopSubmitted) {
      S.coopSubmitted = true;
      var me = mePlayer();
      var myPoints = (me && contrib[me.userId] && contrib[me.userId].points) || 0;
      try {
        if (window.GAME_API && GAME_API.submitScore) {
          GAME_API.submitScore({ mode: 'coop', level: S.room.level, score: myPoints, durationMs: S.matchStartedAt ? Date.now() - S.matchStartedAt : 0 });
        }
      } catch (e) {}
    }
    var rm = $('pnCoopRematch');
    if (rm) rm.addEventListener('click', async function () {
      rm.disabled = true;
      try { await GROOMS.event(S.code, 'rematch', {}); S.deck = null; S.deckSource = ''; resetMatchLocal(); startPolling(); enterRoomView(); }
      catch (e) { toast(e.message || 'Chưa mở được ván mới.'); rm.disabled = false; }
    });
    var back = $('pnCoopBackLobby');
    if (back) back.addEventListener('click', backToLobby);
    mountChat();
  }

  function stopQuestionTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }
  function nextQuestion(startedAtOverride) {
    stopQuestionTimer();
    if (!S.deck || S.qi >= S.deck.length) {
      if (isCoopRoom()) return; // coop: hết câu do máy chủ chốt qua coop_finish, không tự finish kiểu đối kháng
      finishLocal(); return;
    }
    S.locked = false;
    S.coopResolution = null;
    var chkBtn = $('pnOrderCheck'); if (chkBtn) chkBtn.disabled = false;
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
    var timeMs = questionTimeMs();
    S.qStartedAt = startedAtOverride
      || (isCoopRoom() && S.coop && S.coop.qIndex === S.qi && S.coop.startedAt ? S.coop.startedAt : null)
      || Date.now();
    var bar = $('pnTimerBar'), label = $('pnQt');
    S.timer = setInterval(function () {
      var left = timeMs - (Date.now() - S.qStartedAt);
      if (bar) bar.style.width = Math.min(100, Math.max(0, left / timeMs * 100)) + '%';
      if (label) label.textContent = Math.max(0, left / 1000).toFixed(1) + 's';
      if (left <= 0 && !S.locked) {
        S.locked = true;
        if (isCoopRoom()) onCoopTimeout(); else onTimeout();
      }
    }, 80);
    renderCoopHud();
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
    if (combatOn()) { try { GCOMBAT.hit('me', !!isCorrect, 10); } catch (e) {} } // E: phủ pickChoice + order check + timeout (đều chảy qua đây)
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
    if (S.locked) return;
    if (isCoopRoom()) { coopPickChoice(idx, btn); return; } // khoá cục bộ ngay + gửi coop_answer, chờ resolution của đội
    S.locked = true;
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
      row.innerHTML = '<span class="pn-bar-name">' + (pl.me ? '<b>' + esc(user.call) + ' ' + esc(shownName(pl)) + '</b>' : esc(shownName(pl))) + (pl.state && pl.state.finished ? ' ✅' : ' ⏳') + '</span>' +
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
    S.resultInfo = { won: won, rank: rank, count: sorted.length }; // cho paintResultNames khi tên đổi lúc đang xem kết quả
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
          '<span class="pn-ava' + (pl.me ? ' me' : '') + '">' + esc(initial(shownName(pl))) + '</span>' +
          '<span class="pn-grow">' + (pl.me ? esc(user.call) + ' ' : '') + esc(shownName(pl)) + (pl.isHost ? ' 👑' : '') + '</span><b>' + (pl.score || 0) + '</b></li>';
      }).join('') + '</ul>' +
      (isHost()
        ? '<button type="button" class="pn-btn pn-btn-main pn-blk" id="pnRematch">🔁 Chơi lại (mở ván mới)</button>'
        : '<p class="pn-note">Chờ chủ phòng mở ván mới, hoặc về sảnh tạo phòng của riêng mình.</p>') +
      '<button type="button" class="pn-btn pn-btn-alt pn-blk" id="pnBackLobby">Về sảnh</button></div>';
    paintMyRoomFace(box);
    /* Kết liễu BOSS (đợt 4): chỉ khi thắng phòng (hạng 1), 1 lần/ván
       (polling còn chạy ở màn kết quả). Không có boss riêng của ván ->
       playBoss tự lấy GBOSS.next() không trùng. */
    if (won && window.GFIN && !S._finDone) { S._finDone = true; try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: box.querySelector('.pn-ava.me'), toEl: box.querySelector('.pn-crown'), dmg: me ? me.score : S.score }); else GFIN.play({ fromEl: box.querySelector('.pn-ava.me'), toEl: box.querySelector('.pn-crown'), dmg: me ? me.score : S.score }); } catch (e) {} }
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
  // Seg dùng callback riêng (luật chơi + các seg cài đặt hợp sức).
  function segBind(id, cb) {
    var seg = $(id); if (!seg) return;
    seg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.disabled) return;
        seg.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        cb(b.getAttribute('data-v'));
      });
    });
  }
  function applyStylePanel() {
    var coop = S.sel.style === 'coop';
    show($('pnCoopPanel'), coop);
    show($('pnVersusCount'), !coop);
    show($('pnCoopLivesWrap'), S.sel.coop.livesOn);
  }
  function bindCoopSegs(prefix, getCfg, onChange) {
    segBind(prefix + 'CountSeg', function (v) { getCfg().qCount = parseInt(v, 10); onChange(); });
    segBind(prefix + 'TimeSeg', function (v) { getCfg().timeSec = parseInt(v, 10); onChange(); });
    segBind(prefix + 'LivesOnSeg', function (v) { getCfg().livesOn = v === 'on'; onChange(); });
    segBind(prefix + 'LivesSeg', function (v) { getCfg().lives = parseInt(v, 10); onChange(); });
  }
  function buildCreatePayload() {
    if (S.sel.style === 'coop') {
      // Theo contract §6: phòng coop gửi style + coop (không kèm qCount kiểu đối kháng).
      return { mode: S.sel.mode, level: S.sel.level, topic: S.sel.topic, style: 'coop', coop: normCoopCfg(S.sel.coop) };
    }
    return { mode: S.sel.mode, level: S.sel.level, topic: S.sel.topic, qCount: S.sel.count };
  }

  async function boot() {
    segInit('pnModeSeg', 'mode'); segInit('pnLevelSeg', 'level'); segInit('pnTopicSeg', 'topic'); segInit('pnCountSeg', 'count');
    segBind('pnStyleSeg', function (v) { S.sel.style = v; applyStylePanel(); });
    bindCoopSegs('pnCoop', function () { return S.sel.coop; }, applyStylePanel);
    bindCoopSegs('pnRoomCoop', function () {
      if (!S.room) S.room = {};
      if (!S.room.coopCfg) S.room.coopCfg = normCoopCfg(S.sel.coop);
      return S.room.coopCfg;
    }, function () { renderRoomCoop(); sendCoopConfig(); });
    applyStylePanel();
    try { if (window.GMUSIC && GMUSIC.mountToggles) GMUSIC.mountToggles($('sndToggles')); } catch (e) {}
    await resolveUser();
    paintIdentity(); // chip + lời chào sảnh theo GAME_USER (nguồn duy nhất)
    if (!user.loggedIn) {
      show($('pnGuest'), true);
      return;
    }
    show($('pnLobby'), true);
    if (user.level && GR_LEVELS_HINT.includes(user.level)) { S.sel.level = user.level; markSel('pnLevelSeg', user.level); }
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
      var j = await GROOMS.create(buildCreatePayload());
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
      if (isCoopRoom()) { coopSubmitOrder(); return; } // gửi coop_answer kèm orderText
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
