/* =====================================================================
 * trum-sai-lam.js — NHÁNH B (đợt game-plus): TRÙM SAI LẦM 👹
 * THIET-KE.md §1. Trùm được dựng từ ĐIỂM YẾU THẬT của chính người chơi,
 * đọc trực tiếp 3 nguồn localStorage (mọi đọc đều guard JSON):
 *   1) hn_game_v1.x  — nhật ký câu sai trong game (mục chưa xử lý
 *      done < n; bỏ qua khoá 'srs:' = dấu đã xử lý thẻ SRS).
 *   2) hn_srs_v1.c   — thẻ yếu: due <= now || reps === 0 || ef <= 1.7
 *      || iv < 1; trừ thẻ đã có dấu 'srs:<id>' trong x còn hiệu lực
 *      7 ngày. TUYỆT ĐỐI không ghi đè hn_srs_v1 (lịch ôn là thẩm quyền
 *      của trang Ôn tập) — chỉ ghi dấu vào x khi xử lý xong.
 *   3) hn_prog_v1.best — bài yếu: n >= 4 và ok/n < 0.7 (không ghi gì
 *      khi xử lý; tỉ lệ tự cải thiện khi học lại bài).
 * Pool dựng được < 8 câu -> trạng thái rỗng TRUNG THỰC, không sinh câu
 * ngoài dữ liệu, không có nút gọi trùm.
 * Trận: 14 câu, HP trùm = số câu x 10, đúng = đánh (10 + thưởng tốc
 * độ/streak như dau-kanji), sai = mất 1 tim (3 tim). Thắng = hạ hết HP
 * VÀ tỉ lệ đúng (trên số câu đã trả lời) >= 70%.
 * Bộ kỹ năng: window.GPLUS (plus.js của nhánh A) — mountLoadout ở menu,
 * beginMatch/endMatch, HUD, setHintHandler, setFreezeHandler (dời
 * deadline câu +5000 qua đúng cơ chế giờ của trang: limMs += 5000,
 * GPAUSE onResume cộng dur vào t0 nên vẫn khớp), onAnswer ở phễu chấm
 * (khiên bỏ qua mất streak), scoreMul khi cộng điểm, tryRevive khi hết
 * tim (hồi 1 tim, làm lại câu). GPLUS_TRACK cũng gọi ở phễu chấm.
 * Điểm nộp 1 lần cuối trận: GAME_API.submitScore({mode:'trum-sai-lam'}).
 * ===================================================================== */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function uniq(a) { var seen = {}, out = []; (a || []).forEach(function (v) { if (v != null && v !== '' && !seen[v]) { seen[v] = 1; out.push(v); } }); return out; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }
  /* ARRANGEFIX (31/10): chấm câu sắp xếp qua bộ chấm chung GQ.orderOK
     (bản cũ so norm() không bỏ '。' nên xếp đúng vẫn bị báo sai). */
  function orderRight(q, got) {
    if (window.GQ && typeof GQ.orderOK === 'function') return GQ.orderOK(q, got);
    return norm(got) === norm(String(q.answerText || '').replace(/[。．]+$/, ''));
  }

  var MATCH_N = 14;          // số câu mục tiêu của 1 trận
  var MIN_POOL = 8;          // dưới mức này -> trạng thái rỗng trung thực
  var BASE_SEC = 15;         // giây/câu gốc (chia spdMul của trùm như dau-kanji)
  var SEVEN_DAYS = 7 * 24 * 3600 * 1000;
  var KIND_LABEL = { x: '🧾 Câu sai cũ', srs: '🃏 Thẻ SRS yếu', prog: '📚 Bài yếu', extra: '➕ Câu cùng bài yếu' };
  var TAUNTS = ['Ha! Trúng đòn phản công của ta rồi đấy!', 'Gừ… câu đó mà cũng để tuột à?', 'Đòn này đau chứ? Ta chờ câu tiếp theo đây!'];

  /* ---------- Người chơi (mẫu dau-kanji: GAME_USER + sự kiện tên) ---------- */
  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function syncUser(u) { if (u) for (var k in u) user[k] = u[k]; return user; }
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(syncUser).catch(function () { return user; });
  }
  function callName() {
    if (!user.loggedIn) return 'bạn';
    if (user.call && user.name && user.call !== user.name) return user.call + ' ' + user.name;
    return user.name || user.call || 'bạn';
  }
  var userEvtBound = false;
  function bindUserEvent() {
    if (userEvtBound) return; userEvtBound = true;
    window.addEventListener('hn-game-user', function (ev) {
      syncUser((ev && ev.detail) || window.GAME_USER_DATA);
      var pn = $('#pName'); if (pn) pn.textContent = '🧑 ' + (user.name || 'Người chơi');
      var menu = $('#menu');
      if (menu && !menu.classList.contains('mx-hid') && menu.innerHTML && !playing) buildMenu();
    });
  }

  /* ---------- Hook an toàn tới các lớp dùng chung ---------- */
  function trend(m) { try { if (window.GTREND && typeof GTREND.say === 'function') GTREND.say(m); } catch (e) {} }
  function music(scene) { try { if (window.GMUSIC && typeof GMUSIC.play === 'function') GMUSIC.play(scene); } catch (e) {} }
  function sfx(n) { try {
    if (typeof window.GSFX === 'function') GSFX(n);
    else if (window.GSFX && typeof GSFX.play === 'function') GSFX.play(n);
    else if (typeof window.sfx === 'function') window.sfx(n);
  } catch (e) {} }
  function fx(name, arg) { try { if (window.GFX && typeof GFX[name] === 'function') GFX[name](arg); } catch (e) {} }
  function gplus() { return (window.GPLUS && typeof window.GPLUS === 'object') ? window.GPLUS : null; }
  function trackQ(q, ok) { try { if (window.GPLUS_TRACK) window.GPLUS_TRACK(q, ok); } catch (e) {} }

  /* ---------- Đọc kho (guard JSON, đọc trực tiếp localStorage) ---------- */
  function readLS(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var o = JSON.parse(raw);
      return (o && typeof o === 'object' && !Array.isArray(o)) ? o : null;
    } catch (e) { return null; }
  }
  /* hn_game_v1: ưu tiên GPLUS.load()/save() (bảo toàn w/d + mọi khoá lạ);
     thiếu plus.js thì đọc/ghi thẳng cùng khoá. */
  function loadGame() {
    var G = gplus();
    if (G && typeof G.load === 'function') return G.load();
    return readLS('hn_game_v1') || {};
  }
  function saveGame(o) {
    var G = gplus();
    if (G && typeof G.save === 'function') return G.save(o);
    try { localStorage.setItem('hn_game_v1', JSON.stringify(o)); return true; } catch (e) { return false; }
  }

  /* ---------- Suy cấp / topic từ dữ kiện đã lưu ---------- */
  function normLevel(v) { v = String(v || '').toUpperCase(); return /^N[1-5]$/.test(v) ? v : null; }
  function levelFromLesson(lid) {
    var m = /(?:^|[-_/])n([1-5])(?:[-_/]|$)/i.exec(String(lid || ''));
    return m ? 'N' + m[1] : null;
  }
  function topicFromType(t) {
    t = String(t || '');
    if (t === 'kanji') return 'kanji';
    if (t === 'vocab') return 'vocab';
    if (t === 'grammar' || t === 'fill' || t === 'part') return 'grammar';
    return 'mix';
  }
  function topicFromLesson(lid) {
    var m = /[-_/](tv|kj|np)(?:[-_/]|$)/.exec(String(lid || ''));
    if (!m) return 'mix';
    return m[1] === 'tv' ? 'vocab' : (m[1] === 'kj' ? 'kanji' : 'grammar');
  }

  /* ---------- 1) Dựng hồ sơ điểm yếu từ 3 nguồn THẬT ---------- */
  function buildProfile() {
    var now = Date.now();
    var g = readLS('hn_game_v1') || {};
    var x = (g.x && typeof g.x === 'object') ? g.x : {};

    // Nguồn 1: nhật ký câu sai chưa xử lý (done < n), n giảm dần, last mới trước.
    var xItems = [];
    Object.keys(x).forEach(function (qid) {
      if (qid.indexOf('srs:') === 0) return; // dấu xử lý thẻ SRS, không phải câu sai
      var e = x[qid];
      if (!e || typeof e !== 'object') return;
      if ((e.done || 0) < (e.n || 0)) xItems.push({ qid: qid, e: e });
    });
    xItems.sort(function (a, b) { return ((b.e.n || 0) - (a.e.n || 0)) || ((b.e.last || 0) - (a.e.last || 0)); });

    // Dấu đã xử lý thẻ SRS còn hiệu lực 7 ngày: x['srs:<cardId>'] với done >= n.
    var srsMarks = {};
    Object.keys(x).forEach(function (k) {
      if (k.indexOf('srs:') !== 0) return;
      var e = x[k];
      if (e && typeof e === 'object' && (e.done || 0) >= (e.n || 0) && (now - (e.last || 0)) <= SEVEN_DAYS) {
        srsMarks[k.slice(4)] = 1;
      }
    });

    // Nguồn 2: thẻ SRS yếu (trừ thẻ đã có dấu xử lý còn hiệu lực).
    var srs = readLS('hn_srs_v1') || {};
    var cards = (srs.c && typeof srs.c === 'object') ? srs.c : {};
    var weakCards = [];
    Object.keys(cards).forEach(function (cid) {
      var c = cards[cid];
      if (!c || typeof c !== 'object') return;
      if (srsMarks[cid]) return;
      if ((c.due || 0) <= now || c.reps === 0 ||
          (typeof c.ef === 'number' && c.ef <= 1.7) ||
          (typeof c.iv === 'number' && c.iv < 1)) {
        weakCards.push({ cardId: cid, c: c });
      }
    });
    weakCards.sort(function (a, b) { return (a.c.due || 0) - (b.c.due || 0); }); // quá hạn lâu nhất trước

    // Nguồn 3: bài yếu theo tỉ lệ đúng trong hn_prog_v1.best.
    var prog = readLS('hn_prog_v1') || {};
    var best = (prog.best && typeof prog.best === 'object') ? prog.best : {};
    var weakLessons = [];
    Object.keys(best).forEach(function (lid) {
      var b = best[lid];
      if (!b || typeof b !== 'object') return;
      var n = b.n || 0;
      if (n >= 4 && (b.ok || 0) / n < 0.7) weakLessons.push({ lesson: lid, b: b });
    });
    weakLessons.sort(function (a, b) { return (a.b.ok / a.b.n) - (b.b.ok / b.b.n); }); // yếu nhất trước

    // Cấp trội: đếm theo cả 3 nguồn (ưu tiên thứ tự nguồn khi hoà).
    var counts = {}, order = [];
    function bump(lv) { if (!lv) return; if (!counts[lv]) { counts[lv] = 0; order.push(lv); } counts[lv]++; }
    xItems.forEach(function (it) { bump(normLevel(it.e.lv) || levelFromLesson(it.e.l)); });
    weakCards.forEach(function (w) { bump(levelFromLesson(w.cardId)); });
    weakLessons.forEach(function (w) { bump(levelFromLesson(w.lesson)); });
    var domLevel = null, domCount = -1;
    order.forEach(function (lv) { if (counts[lv] > domCount) { domCount = counts[lv]; domLevel = lv; } });
    if (!domLevel) domLevel = normLevel(user.level) || 'N5';

    return { xItems: xItems, weakCards: weakCards, weakLessons: weakLessons, domLevel: domLevel, now: now };
  }

  /* ---------- 2) Dựng câu trận từ hồ sơ ---------- */
  var poolCache = {};
  function poolFor(level, topic) {
    var key = level + '|' + topic;
    if (!poolCache[key]) {
      poolCache[key] = (window.GQ && typeof GQ.getQuestions === 'function')
        ? GQ.getQuestions({ level: level, topic: topic, count: 40, seed: (Math.random() * 1e9) | 0 })
            .then(function (qs) { return Array.isArray(qs) ? qs : []; })
            .catch(function () { return []; })
        : Promise.resolve([]);
    }
    return poolCache[key];
  }
  function tag(q, kind, ref) {
    q.__kind = kind; q.__ref = ref; q.__lesson = q.lesson || null;
    return q;
  }
  function usableQ(q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }

  // Mục x: khớp lại câu gốc theo qid trong pool GQ; không khớp -> dựng
  // trực tiếp từ prompt/đáp án đã lưu + 3 nhiễu từ pool CÙNG BÀI (thiếu
  // mới nới ra pool cùng cấp — vẫn là dữ liệu bài học thật).
  function buildFromX(item, domLevel) {
    var e = item.e;
    var level = normLevel(e.lv) || levelFromLesson(e.l) || domLevel;
    return poolFor(level, topicFromType(e.t)).then(function (pool) {
      pool = pool.filter(usableQ);
      for (var i = 0; i < pool.length; i++) if (pool[i].id === item.qid) return tag(pool[i], 'x', item.qid);
      if (!e.p || !e.a) return null;
      var wrongs = uniq(pool.filter(function (q) { return q.lesson === e.l; }).map(function (q) { return q.answerText; }))
        .filter(function (v) { return v !== e.a; }).slice(0, 3);
      if (wrongs.length < 3) {
        pool.forEach(function (q) {
          if (wrongs.length < 3 && q.answerText && q.answerText !== e.a && wrongs.indexOf(q.answerText) < 0) wrongs.push(q.answerText);
        });
      }
      if (wrongs.length < 2) return null;
      var choices = shuffle([e.a].concat(wrongs));
      return tag({
        id: item.qid, type: e.t || 'vocab', prompt: e.p, promptSub: 'Câu này từng trả lời sai — phục thù nào!',
        choices: choices, answer: choices.indexOf(e.a), answerText: e.a,
        lesson: e.l || undefined
      }, 'x', item.qid);
    }).catch(function () { return null; });
  }

  // Thẻ SRS: tách lessonId + mặt thẻ; pool theo cấp + topic của deck;
  // ưu tiên câu của đúng bài có prompt/answerText chứa mặt thẻ, rồi tới
  // câu bất kỳ của đúng bài; bài không có câu trong pool thì tìm mặt thẻ
  // trong toàn pool cùng cấp/topic.
  function buildFromSrs(w, domLevel) {
    var cid = w.cardId, ix = cid.indexOf(':');
    var lesson = ix >= 0 ? cid.slice(0, ix) : '';
    var face = ix >= 0 ? cid.slice(ix + 1) : '';
    var level = levelFromLesson(lesson) || domLevel;
    var topic = topicFromLesson(lesson);
    return poolFor(level, topic).then(function (pool) {
      pool = pool.filter(usableQ);
      var inLesson = pool.filter(function (q) { return q.lesson === lesson; });
      function faceHit(list) {
        if (!face) return null;
        for (var i = 0; i < list.length; i++) {
          var q = list[i];
          if ((q.prompt && String(q.prompt).indexOf(face) >= 0) || (q.answerText && String(q.answerText).indexOf(face) >= 0)) return q;
        }
        return null;
      }
      var hit = faceHit(inLesson) || (inLesson.length ? inLesson[(Math.random() * inLesson.length) | 0] : faceHit(pool));
      return hit ? tag(hit, 'srs', cid) : null;
    }).catch(function () { return null; });
  }

  // Bài yếu (prog): câu của đúng bài đó từ pool.
  function buildFromProg(w, domLevel) {
    var level = levelFromLesson(w.lesson) || domLevel;
    return poolFor(level, 'mix').then(function (pool) {
      var inLesson = pool.filter(function (q) { return usableQ(q) && q.lesson === w.lesson; });
      if (!inLesson.length) return null;
      return tag(inLesson[(Math.random() * inLesson.length) | 0], 'prog', w.lesson);
    }).catch(function () { return null; });
  }

  // Bổ sung tới 14 câu: câu cùng các bài yếu/điểm yếu (kind 'extra' —
  // không tính là đã xử lý mục gốc nào khi trả lời đúng).
  function topUp(profile, out, used) {
    var lessons = [];
    profile.weakLessons.forEach(function (w) { lessons.push(w.lesson); });
    profile.xItems.forEach(function (it) { if (it.e.l) lessons.push(it.e.l); });
    profile.weakCards.forEach(function (w) { var ix = w.cardId.indexOf(':'); lessons.push(ix >= 0 ? w.cardId.slice(0, ix) : w.cardId); });
    lessons = uniq(lessons);
    var chain = Promise.resolve();
    lessons.forEach(function (lid) {
      chain = chain.then(function () {
        if (out.length >= MATCH_N) return null;
        var level = levelFromLesson(lid) || profile.domLevel;
        return poolFor(level, 'mix').then(function (pool) {
          pool.filter(function (q) { return usableQ(q) && q.lesson === lid && q.id && !used[q.id]; })
            .forEach(function (q) {
              if (out.length < MATCH_N && !used[q.id]) { used[q.id] = 1; out.push(tag(q, 'extra', null)); }
            });
        }).catch(function () {});
      });
    });
    return chain.then(function () { return out; });
  }

  function buildMatch(profile) {
    var jobs = [];
    profile.xItems.forEach(function (it) { jobs.push(function () { return buildFromX(it, profile.domLevel); }); });
    profile.weakCards.forEach(function (w) { jobs.push(function () { return buildFromSrs(w, profile.domLevel); }); });
    profile.weakLessons.forEach(function (w) { jobs.push(function () { return buildFromProg(w, profile.domLevel); }); });
    var out = [], used = {};
    var chain = Promise.resolve();
    // Tuần tự theo độ ưu tiên nguồn (x -> srs -> prog) để khử trùng qid công bằng.
    jobs.forEach(function (fn) {
      chain = chain.then(function () {
        if (out.length >= MATCH_N) return null;
        return fn().then(function (q) {
          if (q && q.id && !used[q.id]) { used[q.id] = 1; out.push(q); }
        }).catch(function () {});
      });
    });
    return chain.then(function () {
      if (out.length >= MIN_POOL && out.length < MATCH_N) return topUp(profile, out, used);
      return out;
    }).then(function (list) { return shuffle(list).slice(0, MATCH_N); });
  }

  /* ---------- Trùm theo cấp trội (GBOSS) ---------- */
  var curBoss = null;
  function pickBoss(lv) {
    if (window.GBOSS && typeof GBOSS.byLevel === 'function') {
      var list = GBOSS.byLevel(lv);
      if (list && list.length) return list[(Math.random() * list.length) | 0];
      if (GBOSS.ALL && GBOSS.ALL.length) return GBOSS.ALL[0];
    }
    return { id: 'trum-sai-lam', name: 'Trùm Sai Lầm', emoji: '👹', sub: '', color: '#ef4b5b', theme: 'Điểm yếu', line: 'Ta là cái bóng của những câu sai — đối mặt với ta đi!', lv: lv, tier: 0, hpMul: 1, spdMul: 1 };
  }

  /* ---------- Trạng thái trận ---------- */
  var profile = null, matchPool = null, menuToken = 0;
  var playing = false, ended = false, submitted = false;
  var qs = [], qi = 0, cur = null, curIdx = -1, lock = false;
  var hearts = 3, hpB = 0, hpBMax = 0, okCount = 0, answered = 0, streak = 0, best = 0, score = 0;
  var startT = 0, t0 = 0, limMs = 0, timer = null, timerCb = null, timerLive = false, needNext = false;
  var pauseCtl = null;
  function isPaused() { return !!(pauseCtl && pauseCtl.isPaused()); }

  /* ---------- Đồng hồ câu (đúng mẫu dau-kanji / GPAUSE) ---------- */
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

  /* ---------- Bộ kỹ năng GPLUS: handler đăng ký cho plus.js ---------- */
  // Gợi ý: ẩn 1 đáp án SAI của câu hiện tại (nút .gone sẵn có của modes.css).
  function hintHideOne() {
    if (!cur || lock || !cur.choices) return false;
    var ci = correctIdx(cur);
    var btns = $$('#optBox .mx-opt').filter(function (b) {
      return !b.classList.contains('gone') && !b.disabled && +b.getAttribute('data-ix') !== ci;
    });
    if (!btns.length) return false;
    btns[0].classList.add('gone');
    return true;
  }
  // Đóng băng giờ: dời deadline câu hiện tại +5000 bằng đúng cơ chế giờ
  // của trang (limMs là mốc deadline tương đối; GPAUSE onResume cộng dur
  // đã dừng vào t0 nên hai cơ chế cộng dồn vẫn khớp nhau).
  function freezeQuestion() {
    if (!cur || lock || !timerLive || isPaused()) return false;
    limMs += 5000;
    return true;
  }

  /* ---------- Menu: hồ sơ điểm yếu + gọi trùm ---------- */
  function buildMenu() {
    var token = ++menuToken;
    profile = buildProfile();
    curBoss = pickBoss(profile.domLevel);
    matchPool = null;
    var m = $('#menu');
    var B = curBoss;
    m.innerHTML =
      '<div class="mx-card"><div class="mx-big-emoji">👹</div>' +
      '<h1>Trùm Sai Lầm</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Con trùm này mang mặt điểm yếu của chính người chơi: ' +
      'những câu từng sai trong game, thẻ SRS đang yếu và bài có tỉ lệ đúng thấp. ' +
      'Hạ nó với tỉ lệ đúng từ 70% trở lên để xử lý từng điểm yếu đó.</p>' +
      '<div class="ts-boss" style="--ts-c:' + esc(B.color || '#ef4b5b') + '">' +
      '<div class="ts-boss-emoji">' + B.emoji + (B.sub ? '<small>' + B.sub + '</small>' : '') + '</div>' +
      '<div class="ts-boss-info"><b>' + esc(B.name) + '</b>' +
      '<div class="mx-mut">' + esc(B.lv) + ' · ' + esc(B.theme || '') + ' · ❤️ máu = số câu × 10</div>' +
      (B.line ? '<div class="ts-line">“' + esc(B.line) + '”</div>' : '') + '</div></div>' +
      '<h2>Hồ sơ điểm yếu</h2>' +
      '<div class="ts-sum">' +
      '<div class="ts-stat"><b>' + profile.xItems.length + '</b><span>câu sai trong game</span></div>' +
      '<div class="ts-stat"><b>' + profile.weakCards.length + '</b><span>thẻ SRS yếu</span></div>' +
      '<div class="ts-stat"><b>' + profile.weakLessons.length + '</b><span>bài tỉ lệ đúng thấp</span></div>' +
      '<div class="ts-stat"><b>' + esc(profile.domLevel) + '</b><span>cấp trội</span></div>' +
      '</div>' +
      '<div id="loadout"></div>' +
      '<div id="poolState"><p class="mx-mut" style="text-align:center;margin-top:14px">Đang dựng trận từ hồ sơ điểm yếu…</p></div>' +
      '</div>';
    var G = gplus();
    if (G && typeof G.mountLoadout === 'function') {
      try { G.mountLoadout($('#loadout'), {}); } catch (e) {}
    }
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) {
      var ps0 = $('#poolState');
      if (ps0) ps0.innerHTML = '<div class="ts-empty"><div class="mx-big-emoji">🌧️</div>' +
        '<p>Chưa tải được bộ câu hỏi từ bài học. Kiểm tra mạng rồi mở lại trang nhé.</p></div>';
      return;
    }
    buildMatch(profile).then(function (list) {
      if (token !== menuToken) return; // menu đã vẽ lại (tên resolve muộn...) -> bỏ kết quả cũ
      matchPool = list;
      var ps = $('#poolState');
      if (!ps) return;
      if (!list || list.length < MIN_POOL) {
        // Trạng thái rỗng TRUNG THỰC: không sinh câu ngoài dữ liệu, không nút gọi trùm.
        ps.innerHTML = '<div class="ts-empty"><div class="mx-big-emoji">🌱</div>' +
          '<p>Chưa đủ dữ liệu điểm yếu — chơi vài ván game hoặc ôn thẻ SRS để trùm hiện hình</p></div>';
        return;
      }
      ps.innerHTML = '<div style="height:14px"></div>' +
        '<button class="mx-btn" id="btnGo" type="button">👹 Gọi Trùm Sai Lầm (' + list.length + ' câu điểm yếu)</button>' +
        '<p class="mx-mut" style="text-align:center;margin-top:10px">Đúng = đánh (10 điểm máu/câu + thưởng nhanh &amp; chuỗi đúng) · Sai = mất 1 tim (có 3 tim) · Thắng khi hạ hết máu và đúng từ 70%.</p>';
      $('#btnGo').addEventListener('click', start);
    });
  }

  /* ---------- Arena ---------- */
  function setHp() {
    $('#hpB').style.transform = 'scaleX(' + (hpBMax ? Math.max(0, hpB / hpBMax) : 0) + ')';
    $('#hpBoxB').classList.toggle('low', hpBMax > 0 && hpB / hpBMax <= 0.3);
    $('#scorePill').textContent = '⭐ ' + score;
    $('#comboBox').textContent = streak >= 2 ? '🔥 Combo x' + streak : '';
    var say = $('#bossSay .ts-say'); if (say) say.classList.toggle('ts-low', hpB > 0 && hpBMax > 0 && hpB / hpBMax <= 0.3);
  }
  function paintHearts() {
    var s = '';
    for (var i = 0; i < 3; i++) s += i < hearts ? '❤️' : '🖤';
    $('#hearts').textContent = s;
  }
  function sayBoss(text) {
    var host = $('#bossSay'); if (!host || !curBoss) return;
    host.innerHTML = '<div class="ts-say" style="--ts-c:' + esc(curBoss.color || '#ef4b5b') + '">' +
      '<span class="ts-say-face">' + curBoss.emoji + (curBoss.sub || '') + '</span><div><b>' + esc(curBoss.name) + ':</b>' +
      '<p>“' + esc(text || curBoss.line || 'Lên đi, ta chờ!') + '”</p></div></div>';
  }
  function dmgPop(el, txt) {
    var ar = $('#arena'); if (!ar || !el) return;
    var d = document.createElement('div');
    d.className = 'bk-dmg'; d.textContent = txt;
    d.style.left = (el.offsetLeft + 10) + 'px'; d.style.top = '16px';
    ar.appendChild(d); setTimeout(function () { d.remove(); }, 1000);
  }
  function arenaBanner(txt) {
    var ar = $('#arena'); if (!ar) return;
    var old = ar.querySelector('.ts-banner'); if (old) old.remove();
    var d = document.createElement('div');
    d.className = 'ts-banner'; d.setAttribute('aria-hidden', 'true'); d.textContent = txt;
    ar.appendChild(d);
    setTimeout(function () { d.remove(); }, 1600);
  }
  function hitFx(atk, tgt, tint) {
    if (!atk || !tgt) return;
    try {
      if (tgt.animate) {
        tgt.animate([
          { transform: 'translate(0,0)', filter: 'none' },
          { transform: 'translate(6px,-3px)', filter: tint === 'red' ? 'brightness(1.8) drop-shadow(0 0 12px rgba(239,75,91,.9))' : 'brightness(2.1) drop-shadow(0 0 14px rgba(255,216,78,.9))', offset: .35 },
          { transform: 'translate(0,0)', filter: 'none' }
        ], { duration: 420, easing: 'ease-out' });
      }
    } catch (e) {}
  }

  function start() {
    if (playing || !matchPool || matchPool.length < MIN_POOL) return;
    qs = matchPool;
    hpBMax = qs.length * 10; hpB = hpBMax;
    hearts = 3; qi = 0; cur = null; curIdx = -1; lock = false;
    okCount = 0; answered = 0; streak = 0; best = 0; score = 0;
    ended = false; submitted = false; needNext = false;
    startT = Date.now();
    playing = true;
    var G = gplus();
    if (G) {
      try {
        if (typeof G.setHintHandler === 'function') G.setHintHandler(hintHideOne);
        if (typeof G.setFreezeHandler === 'function') G.setFreezeHandler(freezeQuestion);
        if (typeof G.setHudHost === 'function') G.setHudHost($('#skillHud'));
        if (typeof G.beginMatch === 'function') G.beginMatch();
      } catch (e) {}
    }
    if (pauseCtl) pauseCtl.setVisible(true);
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    document.documentElement.style.setProperty('--bkc', curBoss.color || '#ef4b5b');
    var arena = $('#arena');
    arena.style.setProperty('--bkc', curBoss.color || '#ef4b5b');
    arena.setAttribute('data-boss-id', curBoss.id || '');
    arena.setAttribute('data-boss-hpmax', String(hpBMax));
    $('#pName').textContent = '🧑 ' + (user.name || 'Người chơi');
    if (window.GAME_AVATAR && GAME_AVATAR.load().face === 'hoso') {
      GAME_AVATAR.paintFace($('#figP'), GAME_AVATAR.load(), 84);
    }
    $('#bName').textContent = curBoss.emoji + ' ' + curBoss.name;
    $('#figB').textContent = curBoss.emoji;
    $('#play').classList.remove('mx-hid');
    sayBoss();
    paintHearts(); setHp();
    music('boss'); trend('vao');
    next();
  }

  function next() {
    if (isPaused()) { needNext = true; return; }
    if (!playing || ended) return;
    if (hearts <= 0 || hpB <= 0 || qi >= qs.length) return endMatch();
    showQuestion(qs[qi], false);
    qi++;
  }

  function showQuestion(q, replay) {
    cur = q; lock = false;
    curIdx = replay ? curIdx : qi;
    $('#roundInfo').textContent = 'Câu ' + (curIdx + 1) + '/' + qs.length + ' · ' + (KIND_LABEL[q.__kind] || '');
    var qb = $('#qBox');
    qb.textContent = q.prompt || '';
    qb.classList.toggle('long', (q.prompt || '').length > 14);
    $('#qSub').textContent = q.promptSub || '';
    $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
    if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
    var sec = BASE_SEC / ((curBoss && curBoss.spdMul) || 1);
    startTimer(sec, function () { if (!lock) judge(false, null, true); });
  }

  function renderChoices(q) {
    var box = $('#optBox'), ci = correctIdx(q);
    q.choices.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-opt'; b.textContent = c;
      b.setAttribute('data-ix', String(i));
      b.addEventListener('click', function () { judge(i === ci, b, false); });
      box.appendChild(b);
    });
  }
  function revealChoices() {
    if (!cur) return;
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
      judge(orderRight(q, got), chk, false);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  /* ---------- Phễu chấm DUY NHẤT của chế độ ----------
     Mọi đáp án (bấm chọn / sắp xếp / hết giờ) đều qua judge():
     GPLUS_TRACK + GPLUS.onAnswer (khiên) + GPLUS.scoreMul (x2) +
     GPLUS.tryRevive (hết tim) đều móc tại đây. */
  function judge(ok, btn, timedOut) {
    if (isPaused() || lock || !cur) return;
    lock = true; stopTimer();
    var q = cur;
    var sp = speedFrac();
    trackQ(q, ok);
    var G = gplus();
    var ar = { shieldUsed: false };
    if (G && typeof G.onAnswer === 'function') { try { ar = G.onAnswer(ok) || ar; } catch (e) {} }
    answered++;
    q.__ok = ok;
    if (ok) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak);
      // Đúng = đánh: 10 máu + thưởng tốc độ (tối đa +5) + thưởng chuỗi
      // đúng (streak >= 3: +2, >= 5: +4) — HP trùm = số câu x 10 nên
      // phần thưởng này là đường thắng thực tế ở tỉ lệ đúng ~70-85%.
      var dmg = 10 + Math.round(sp * 5) + (streak >= 5 ? 4 : (streak >= 3 ? 2 : 0));
      var gain = Math.round((100 + sp * 100) * (1 + streak * 0.1));
      if (G && typeof G.scoreMul === 'function') { try { gain *= G.scoreMul(); } catch (e) {} }
      score += gain;
      var before = hpB;
      hpB = Math.max(0, hpB - dmg); setHp();
      sfx(streak >= 5 ? 'thunder' : 'hit');
      if (streak >= 5) { fx('ultra', $('#figB')); trend('combo'); }
      else if (sp > 0.7) { fx('perfect'); trend('nhanh'); }
      else trend('dung');
      hitFx($('#figP'), $('#figB'), 'gold');
      dmgPop($('#figB'), '-' + (before - hpB));
      setTimeout(next, 950);
      return;
    }
    // Sai / hết giờ: trùm phản đòn, mất 1 tim.
    if (btn) btn.classList.add('bad');
    revealChoices();
    if (ar.shieldUsed) {
      // Khiên streak đỡ 1 lần: giữ nguyên chuỗi đúng (tim vẫn mất theo luật trận).
      $('#comboBox').textContent = '🛡️ Khiên streak đã đỡ — chuỗi đúng được giữ!';
      trend('trogiup');
    } else {
      streak = 0; fx('comboPop', 0);
    }
    hearts--; paintHearts(); setHp();
    sfx('fire'); fx('shake', $('#arena'));
    trend(timedOut ? 'hetgio' : 'sai');
    sayBoss(TAUNTS[(Math.random() * TAUNTS.length) | 0]);
    hitFx($('#figB'), $('#figP'), 'red');
    dmgPop($('#figP'), '-1 ❤️');
    if (hearts <= 0) {
      // Hồi sinh (kỹ năng GPLUS): cứu 1 lần — hồi 1 tim, LÀM LẠI câu hiện tại.
      if (G && typeof G.tryRevive === 'function') {
        var revived = false;
        try { revived = G.tryRevive(); } catch (e) {}
        if (revived) {
          hearts = 1; paintHearts();
          arenaBanner('❤️‍🩹 HỒI SINH — làm lại câu này!');
          sfx('victory');
          setTimeout(function () { if (playing && !ended) showQuestion(q, true); }, 1150);
          return;
        }
      }
      setTimeout(function () { if (playing) endMatch(); }, 1150);
      return;
    }
    setTimeout(next, 1150);
  }

  /* ---------- Chốt xử lý sau trận (chỉ câu ĐÚNG trong trận) ---------- */
  function settleCorrect() {
    var fixedX = 0, fixedSrs = 0;
    var rightX = qs.filter(function (q) { return q.__ok && q.__kind === 'x'; });
    var rightSrs = qs.filter(function (q) { return q.__ok && q.__kind === 'srs'; });
    if (!rightX.length && !rightSrs.length) return { x: 0, srs: 0 };
    var o = loadGame();
    var x = (o.x && typeof o.x === 'object') ? o.x : (o.x = {});
    rightX.forEach(function (q) {
      var e = x[q.__ref];
      if (e && typeof e === 'object') { e.done = e.n || 0; fixedX++; } // done = n -> rời pool điểm yếu
    });
    var now = Date.now(), seenCard = {};
    rightSrs.forEach(function (q) {
      var cid = q.__ref;
      if (!cid || seenCard[cid]) return;
      seenCard[cid] = 1;
      // KHÔNG đụng hn_srs_v1: chỉ ghi dấu đã xử lý vào x (hiệu lực 7 ngày ở khâu dựng pool).
      var ix = cid.indexOf(':');
      x['srs:' + cid] = { n: 1, done: 1, last: now, l: ix >= 0 ? cid.slice(0, ix) : (q.__lesson || '') };
      fixedSrs++;
    });
    // Nguồn 'prog': không ghi gì — best tự cải thiện khi học lại bài.
    saveGame(o);
    return { x: fixedX, srs: fixedSrs };
  }

  function submitOnce() {
    if (submitted) return; submitted = true;
    try {
      if (window.GAME_API && typeof GAME_API.submitScore === 'function') {
        var r = GAME_API.submitScore({ mode: 'trum-sai-lam', level: profile ? profile.domLevel : (curBoss ? curBoss.lv : 'N5'), score: Math.round(score), durationMs: Date.now() - startT });
        if (r && r.catch) r.catch(function () {});
      }
    } catch (e) {}
  }

  function endMatch() {
    if (ended) return; ended = true;
    playing = false;
    stopTimer();
    if (pauseCtl) pauseCtl.setVisible(false);
    var G = gplus();
    if (G && typeof G.endMatch === 'function') { try { G.endMatch(); } catch (e) {} }
    var acc = answered ? okCount / answered : 0;
    var win = hpB <= 0 && acc >= 0.7;
    var settled = settleCorrect();
    submitOnce();
    $('#play').classList.add('mx-hid');
    sfx(win ? 'victory' : 'lose');
    if (win) { fx('confetti'); trend('thang'); } else trend('thua');
    renderResult(win, acc, settled);
  }

  function renderResult(win, acc, settled) {
    var r = $('#result'); r.classList.remove('mx-hid');
    var B = curBoss;
    var procTxt;
    if (settled.x || settled.srs) {
      procTxt = '🧹 Đã xử lý ' + settled.x + ' câu sai trong game' +
        (settled.srs ? ' · ' + settled.srs + ' thẻ SRS (ghi dấu đã luyện qua trận — lịch ôn SRS gốc giữ nguyên)' : '') +
        '. Bài yếu không ghi đè gì — tỉ lệ đúng sẽ tự cải thiện khi học lại bài.';
    } else {
      procTxt = 'Chưa xử lý được điểm yếu nào trong trận này — trả lời đúng các câu điểm yếu để xử lý chúng.';
    }
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">' + (win ? '🏆' : '💪') + '</div>' +
      '<h1>' + (win ? 'Hạ gục ' + esc(B.name) + '!' : 'Trùm Sai Lầm vẫn còn đó…') + '</h1>' +
      '<p class="mx-mut">' + (win
        ? callName() + ' đã đối mặt và xử lý gọn điểm yếu của chính mình. Quá cháy!'
        : (hpB <= 0
          ? callName() + ' đã hạ hết máu trùm nhưng tỉ lệ đúng ' + Math.round(acc * 100) + '% chưa tới 70% — cần chắc tay hơn một chút nữa.'
          : callName() + ' đánh rất hay. Các câu đã đúng vẫn được ghi nhận xử lý từng phần — nghỉ một chút rồi phục thù nhé!')) + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span>' +
      '<span class="mx-pill">✅ ' + okCount + '/' + answered + ' đúng (' + Math.round(acc * 100) + '%)</span>' +
      '<span class="mx-pill">⚡ Combo cao nhất ' + best + '</span>' +
      '<span class="mx-pill">❤️ Còn ' + Math.max(0, hearts) + ' tim</span>' +
      '<span class="mx-pill">👹 Máu trùm còn ' + Math.max(0, hpB) + '/' + hpBMax + '</span></div>' +
      '<p class="ts-proc">' + esc(procTxt) + '</p>' +
      '<button class="mx-btn" id="btnAgain" type="button">Đánh lại</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () {
      r.classList.add('mx-hid');
      $('#menu').classList.remove('mx-hid');
      buildMenu(); // dựng lại hồ sơ: điểm yếu vừa xử lý đã rời pool
    });
  }

  /* ---------- GPAUSE (đúng mẫu pause.js như dau-kanji) ---------- */
  if (window.GPAUSE && typeof window.GPAUSE.create === 'function') {
    pauseCtl = window.GPAUSE.create({
      btnHost: $('#pauseSlot') || $('#play'),
      exitLabel: 'Thoát trận (về menu)',
      isPlaying: function () { return playing && !$('#play').classList.contains('mx-hid'); },
      onPause: function () { suspendTimer(); },
      onResume: function (dur) {
        t0 += dur; startT += dur;
        if (timerLive) armTimer();
        if (needNext) { needNext = false; next(); }
      },
      onExit: function () {
        stopTimer(); playing = false;
        var G = gplus();
        if (G && typeof G.endMatch === 'function') { try { G.endMatch(); } catch (e) {} }
        $('#play').classList.add('mx-hid');
        $('#menu').classList.remove('mx-hid');
        buildMenu();
      }
    });
  }

  bindUserEvent();
  loadUser().then(function () { buildMenu(); });
})();
