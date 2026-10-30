/* le-hoi.js — Nhánh 3: Lễ hội. ĐUA TEM LỄ HỘI (mở rộng mục 4): 6 quầy ×
   6 câu = 36 câu, mỗi quầy 1 thể loại lấy qua GQ theo topic của quầy,
   điểm theo chuỗi đúng (chain) chạy xuyên quầy như bản cũ. Quầy 1–5 đạt
   ≥4/6 đúng -> nhận tem 🏮 của quầy; đủ 5 tem -> đổi quà +500 × hệ số
   khó + pháo giấy + GFIN ăn mừng. Bong bóng thoại trang trí đi qua HÀNG
   ĐỢI: tối đa 2 bong bóng cùng lúc, xếp ở 2 vị trí lệch nhau, bong bóng
   sau chờ đến lượt — không chồng nhau (sửa lỗi bản mẫu, giữ khung 92px
   của fix2). Câu trend đọc qua GTREND, nhạc GMUSIC 'normal', câu hỏi
   qua GQ (hook an toàn), điểm nộp GAME_API 1 lần mode 'le-hoi'.
   Pause theo hợp đồng fix3: timerCb/timerLive/needNext + isPaused(),
   mọi chuyển câu/chuyển quầy đều qua luồng next() hiện hữu. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- Cấu trúc đua tem: 6 quầy × 6 câu = 36 câu ---------- */
  var PER_STALL = 6;
  var STALLS = [
    { id: 'vocab', emoji: '🎯', name: 'Từ Vựng', topic: 'vocab', timeMul: 1 },
    { id: 'listen', emoji: '👂', name: 'Nghe & Chọn', topic: 'vocab', timeMul: 1, listen: true },
    { id: 'order', emoji: '🧩', name: 'Sắp Xếp Câu', topic: 'grammar', timeMul: 1, order: true },
    { id: 'kanji', emoji: '🀄', name: 'Kanji Chớp', topic: 'kanji', timeMul: 0.7 },
    { id: 'grammar', emoji: '🎆', name: 'Ngữ Pháp', topic: 'grammar', timeMul: 1 },
    { id: 'gift', emoji: '🎁', name: 'Quầy Quà Cuối', topic: 'mix', timeMul: 1 }
  ];
  var TOTAL = STALLS.length * PER_STALL;
  var STAMP_NEED = 4; /* đúng ≥4/6 ở quầy 1–5 -> nhận tem */
  var GIFT_BONUS = 500; /* đủ 5 tem -> +500 × hệ số khó */
  var DIFF = { de: { n: 'Dễ', s: 15, x: 1 }, tb: { n: 'Trung bình', s: 10, x: 1 }, kho: { n: 'Khó', s: 7, x: 2 } };
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  /* Lời cổ vũ trang trí ngắn của linh vật (chữ UI, không phải câu trend đọc to) */
  var CHEERS = ['Cố lên nào! 🎉', 'Nhanh tay, nhanh mắt! 👀', 'Chuỗi đang nóng dần! 🔥', 'Thêm một câu nữa thôi!', 'Lễ hội là phải cháy! 🎆', 'Tuyệt vời ông mặt trời! ☀️'];
  /* Nhận diện chữ Nhật (kana/kanji) — cùng dải mã với voice.js */
  var JA_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

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
  /* Tham số hoá theo topic của quầy hiện tại (vocab/grammar/kanji/mix) */
  function fetchQ(count, topic) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: topic || 'mix', count: count });
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

  /* ---------- Quầy Nghe: điều kiện giọng + lọc câu nghe được ---------- */
  /* GAME_VOICE khả dụng = có speak VÀ có speechSynthesis. Không sửa
     voice.js/settings.js: GAME_VOICE tự áp âm lượng + kiểu giọng người
     dùng đã đặt mỗi lần speak(). */
  function voiceAvailable() {
    return !!(window.GAME_VOICE && typeof window.GAME_VOICE.speak === 'function' && window.speechSynthesis);
  }
  /* Câu nghe được: đáp án đúng là 1 TỪ tiếng Nhật lấy từ chính câu GQ —
     answerText chứa kana/kanji, nằm trong choices, MỌI choices đều là
     từ Nhật ngắn (≤14 ký tự, để loại câu hỏi nghĩa tiếng Việt / câu dài),
     và không phải câu "Đọc là gì?" (đáp án của dạng đó là cách đọc chứ
     không phải từ). Khớp chủ yếu với dạng vocab "nghĩa -> chọn từ" và
     "điền từ vào câu" của GQ, nơi answerText chính là từ cần nghe. */
  function isListenQ(q) {
    if (!q || !q.choices || q.choices.length < 2) return false;
    if (!q.answerText || !JA_RE.test(q.answerText)) return false;
    if (String(q.answerText).length > 14) return false;
    if (q.choices.indexOf(q.answerText) < 0) return false;
    if ((q.promptSub || '').indexOf('Đọc là') >= 0) return false;
    for (var i = 0; i < q.choices.length; i++) {
      var c = String(q.choices[i] == null ? '' : q.choices[i]);
      if (!JA_RE.test(c) || c.length > 14) return false;
    }
    return true;
  }

  var st = { lv: 'N5', diff: 'tb' };
  var idx = 0, score = 0, okCount = 0, chain = 0, bestChain = 0, lock = false,
      pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0, cheerIx = 0;
  /* Trạng thái đua tem */
  var stallIdx = 0, loadedStall = -1, stallOk = [0, 0, 0, 0, 0, 0], stamps = [false, false, false, false, false],
      listenFallback = false, listenPlays = 0, curIsListen = false, giftBonus = 0, finalStampCount = 0, ended = false;
  /* FIX3: tạm dừng (pause.js) — timerCb/timerLive/needNext như leo-thap. */
  var timerCb = null, timerLive = false, needNext = false, pauseCtl = null;
  function isPaused() { return !!(pauseCtl && pauseCtl.isPaused()); }

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
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Đua tem lễ hội gồm 6 quầy × 6 câu = ' + TOTAL + ' câu: ' +
      STALLS.map(function (s) { return s.emoji + ' ' + esc(s.name); }).join(' · ') +
      '. Càng nối dài chuỗi đúng, điểm mỗi câu càng cao. Mỗi quầy 1–5 đúng từ 4/6 trở lên là nhận tem 🏮; gom đủ 5 tem thì cuối phiên được đổi quà 🎁 +500 điểm × hệ số khó!</p>' +
      '<h2>Trình độ</h2><div class="mx-seg lv" data-seg="lv">' + LEVELS.map(function (l) { return '<button type="button" data-v="' + l + '" class="' + (l === st.lv ? 'on' : '') + '">' + l + '</button>'; }).join('') + '</div>' +
      '<h2>Độ khó</h2><div class="mx-seg" data-seg="diff">' + Object.keys(DIFF).map(function (k) { return '<button type="button" data-v="' + k + '" class="' + (k === st.diff ? 'on' : '') + '">' + DIFF[k].n + '<small>' + DIFF[k].s + 's/câu' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') + '</small></button>'; }).join('') + '</div>' +
      '<div id="lhPlusLoadout"></div>' +
      '<p class="mx-mut" style="font-size:12px;margin-top:8px">❤️‍🩹 Lưu ý: kỹ năng <b>Hồi sinh</b> không áp dụng ở Lễ hội (chế độ này chơi trọn 36 câu, không có thua) — ' + esc(callName()) + ' hãy mang kỹ năng khác nhé.</p>' +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Vào lễ hội ▶</button></div>';
    bindSeg(m, 'lv', function (v) { st.lv = v; });
    bindSeg(m, 'diff', function (v) { st.diff = v; });
    if (window.GPLUS) GPLUS.mountLoadout($('#lhPlusLoadout'));
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
  function suspendTimer() { if (timer) clearInterval(timer); timer = null; }
  function speedFrac() { return Math.max(0, Math.min(1, (limMs - (Date.now() - t0)) / limMs)); }

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

  /* ---------- Bản đồ quầy / dòng thông báo / khu nghe (dựng động) ---------- */
  /* HTML chỉ thêm <link> x-le-hoi.css; mọi khối mới dựng bằng JS tại đây. */
  function ensurePlayExtras() {
    if ($('#stallMap')) return;
    var card = $('#play .mx-card'); if (!card) return;
    var map = document.createElement('div');
    map.id = 'stallMap'; map.className = 'xlh-map';
    map.setAttribute('aria-label', 'Bản đồ quầy lễ hội');
    var banner = document.createElement('div');
    banner.id = 'stallBanner'; banner.className = 'xlh-banner mx-hid';
    var lanterns = $('.fh-lanterns', card);
    if (lanterns && lanterns.nextSibling) {
      card.insertBefore(map, lanterns.nextSibling);
      card.insertBefore(banner, map.nextSibling);
    } else {
      card.insertBefore(map, card.firstChild);
      card.insertBefore(banner, map.nextSibling);
    }
    var listen = document.createElement('div');
    listen.id = 'listenBox'; listen.className = 'xlh-listen mx-hid';
    var opt = $('#optBox');
    if (opt && opt.parentNode === card) card.insertBefore(listen, opt);
    else card.appendChild(listen);
  }
  /* Số câu đã trả lời trong quầy i, suy từ idx toàn phiên (0..6) */
  function stallAnswered(i) {
    var a = idx - i * PER_STALL;
    return a < 0 ? 0 : (a > PER_STALL ? PER_STALL : a);
  }
  function drawStallMap() {
    var box = $('#stallMap'); if (!box) return;
    var html = '';
    for (var i = 0; i < STALLS.length; i++) {
      var s = STALLS[i];
      var done = stallAnswered(i) >= PER_STALL;
      var cls = 'xlh-stall' + (i === stallIdx && !ended ? ' cur' : '') + (done ? ' done' : '');
      var name = (s.listen && listenFallback) ? 'Đọc & Chọn' : s.name;
      var stat = done ? (stallOk[i] + '/6 đúng') : (i === stallIdx && !ended ? 'Đang chơi' : 'Chờ');
      var stampHtml = '';
      if (i < 5 && stamps[i]) stampHtml = '<span class="xlh-stamp" title="Đã nhận tem">🏮</span>';
      else if (i < 5 && done) stampHtml = '<span class="xlh-nostamp" title="Chưa đạt tem">—</span>';
      html += '<div class="' + cls + '"><span class="xlh-emoji">' + s.emoji + '</span>' +
        '<span class="xlh-name">' + esc(name) + '</span>' +
        '<span class="xlh-stat">' + esc(stat) + '</span>' + stampHtml + '</div>';
    }
    box.innerHTML = html;
  }
  function showStallBanner(si) {
    var b = $('#stallBanner'); if (!b) return;
    var stall = STALLS[si];
    var extra = '';
    if (stall.listen && listenFallback) extra = ' · Thiết bị không có giọng đọc nên quầy này chuyển 📖 Đọc & chọn';
    else if (stall.listen) extra = ' · Nghe tối đa 3 lần mỗi câu';
    else if (stall.order) extra = ' · Ưu tiên câu sắp xếp';
    else if (stall.kanji) extra = ' · Giờ mỗi câu ×0,7 — chớp nhanh!';
    else if (si === 5) extra = ' · Quầy cuối, gom điểm về đích!';
    if (si < 5 && !stall.listen) extra += ' · Đúng ≥4/6 nhận tem 🏮';
    else if (si < 5 && stall.listen && !listenFallback) extra += ' · Đúng ≥4/6 nhận tem 🏮';
    else if (si < 5 && stall.listen && listenFallback) extra += ' · Đúng ≥4/6 vẫn nhận tem 🏮';
    b.textContent = 'Quầy ' + (si + 1) + '/6 · ' + stall.emoji + ' ' + ((stall.listen && listenFallback) ? 'Đọc & Chọn' : stall.name) + extra;
    b.classList.remove('mx-hid');
  }

  /* ---------- Nạp câu theo quầy ---------- */
  function appendUsable(qs) {
    var u = usable(qs);
    pool = pool.concat(u);
    return u;
  }
  /* Dự phòng giữa quầy: pool cạn thì lấy thêm theo topic của quầy đó */
  function loadMore(n) {
    var topic = (STALLS[stallIdx] && STALLS[stallIdx].topic) || 'mix';
    return fetchQ(n, topic).then(function (qs) {
      var u = appendUsable(qs);
      if (!u.length && !pool.length) throw new Error('empty');
      return pool;
    });
  }
  function takeQ() {
    if (qi >= pool.length) return loadMore(10).then(function () { return qi < pool.length ? pool[qi++] : null; }).catch(function () { return null; });
    return Promise.resolve(pool[qi++]);
  }
  /* Nạp pool cho 1 quầy, lọc theo thể loại của quầy:
     - Quầy Nghe: giọng không khả dụng -> listenFallback, nạp vocab thường
       (hiện chữ như Đọc & chọn). Giọng khả dụng -> lấy dư 24 câu vocab,
       câu nghe được (isListenQ) xếp trước, câu còn lại xếp sau làm dự
       phòng đọc cho từng câu (câu nào không nghe được thì hiện chữ).
     - Quầy Sắp Xếp: lấy dư 24 câu grammar, câu type 'order' xếp trước;
       thiếu order thì các câu grammar còn lại (fill/part/grammar) tự
       lấp vào các vị trí sau — vẫn đủ 6 câu cho quầy.
     - Quầy thường: lấy PER_STALL + 2 câu theo topic của quầy. */
  function prepareStall(si) {
    pool = []; qi = 0; listenPlays = 0; curIsListen = false;
    var stall = STALLS[si];
    if (stall.listen) {
      listenFallback = !voiceAvailable();
      if (listenFallback) {
        return fetchQ(PER_STALL + 2, 'vocab').then(function (qs) { appendUsable(qs); return pool; });
      }
      return fetchQ(24, 'vocab').then(function (qs) {
        var u = usable(qs);
        var suit = u.filter(isListenQ);
        var rest = u.filter(function (q) { return !isListenQ(q); });
        pool = suit.concat(rest);
        return pool;
      });
    }
    if (stall.order) {
      return fetchQ(24, 'grammar').then(function (qs) {
        var u = usable(qs);
        var isOrder = function (q) { return q && q.type === 'order' && q.tokens && q.tokens.length >= 2; };
        var ord = u.filter(isOrder);
        var rest = u.filter(function (q) { return !isOrder(q); });
        pool = ord.concat(rest);
        return pool;
      });
    }
    return fetchQ(PER_STALL + 2, stall.topic).then(function (qs) { appendUsable(qs); return pool; });
  }

  /* drawChain mới: 6 chấm tiến độ của QUẦY HIỆN TẠI (không còn TOTAL
     chấm); chuỗi đúng vẫn hiện ở scorePill như cũ. */
  function drawChain() {
    var box = $('#chainBox'); if (!box) return;
    box.innerHTML = '';
    var prog = idx - stallIdx * PER_STALL;
    if (prog < 0) prog = 0; if (prog > PER_STALL) prog = PER_STALL;
    for (var i = 0; i < PER_STALL; i++) {
      var dot = document.createElement('i');
      if (i < prog) dot.className = 'on';
      box.appendChild(dot);
    }
    $('#scorePill').textContent = '⭐ ' + score + (chain >= 2 ? ' · 🔥 chuỗi ' + chain : '');
  }

  /* ---------- Quầy Nghe: nút nghe lại + phát đáp án ---------- */
  function updateListenBtn() {
    var b = $('#btnListen'); if (!b) return;
    var left = Math.max(0, 3 - listenPlays);
    b.textContent = '🔊 Nghe lại · còn ' + left + ' lần';
    b.disabled = left <= 0;
  }
  function renderListenBox(isListen) {
    var box = $('#listenBox'); if (!box) return;
    box.innerHTML = '';
    if (!isListen) { box.classList.add('mx-hid'); return; }
    box.classList.remove('mx-hid');
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'xlh-listen-btn'; b.id = 'btnListen';
    b.addEventListener('click', function () { speakListen(); });
    box.appendChild(b);
    updateListenBtn();
  }
  /* Phát từ đáp án của chính câu GQ hiện tại. Đang tạm dừng thì KHÔNG
     phát (hợp đồng pause fix3); tối đa 3 lần/câu tính cả lần tự phát. */
  function speakListen() {
    if (isPaused()) return;
    if (!cur || !curIsListen) return;
    if (listenPlays >= 3) return;
    if (!voiceAvailable()) return;
    listenPlays++;
    updateListenBtn();
    try { window.GAME_VOICE.speak(cur.answerText); } catch (e) {}
  }

  function start() {
    idx = 0; score = 0; okCount = 0; chain = 0; bestChain = 0; qi = 0; pool = [];
    stallIdx = 0; loadedStall = -1; stallOk = [0, 0, 0, 0, 0, 0]; stamps = [false, false, false, false, false];
    listenFallback = false; listenPlays = 0; curIsListen = false; giftBonus = 0; finalStampCount = 0; ended = false;
    bubbleQ.length = 0;
    if (window.GPLUS) GPLUS.beginMatch();
    startT = Date.now(); needNext = false;
    if (pauseCtl) pauseCtl.setVisible(true);
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid'); $('#play').classList.remove('mx-hid');
    ensurePlayExtras();
    drawStallMap();
    music('normal'); trend('vao');
    pushBubble('Lễ hội bắt đầu rồi, ' + callName() + ' ơi! 🎉');
    next();
  }
  /* Luồng chuyển câu/chuyển quầy DUY NHẤT (hợp đồng pause fix3 giữ
     nguyên): đang dừng -> ghi needNext, resume sẽ gọi lại next(). */
  function next() {
    if (isPaused()) { needNext = true; return; }
    if (idx >= TOTAL) return end();
    var si = Math.floor(idx / PER_STALL);
    if (si !== loadedStall) {
      /* Chuyển quầy: nạp pool của quầy mới rồi mới hiện câu đầu quầy */
      stallIdx = si; loadedStall = si;
      ensurePlayExtras();
      drawStallMap();
      showStallBanner(si);
      if (si === 0) {
        pushBubble('Quầy đầu tiên: ' + STALLS[si].emoji + ' ' + STALLS[si].name + ' — bắt đầu thôi, ' + callName() + '!');
      } else {
        var prev = si - 1;
        var prevTxt = prev < 5
          ? (stamps[prev] ? ' Nhận tem 🏮 quầy trước rồi, giỏi quá!' : ' Quầy trước đúng ' + stallOk[prev] + '/6 — quầy này gỡ lại nhé!')
          : '';
        pushBubble('Sang quầy ' + (si + 1) + ': ' + STALLS[si].emoji + ' ' + STALLS[si].name + '!' + prevTxt);
      }
      prepareStall(si).then(function () {
        if (isPaused()) { needNext = true; return; }
        if (!pool.length) {
          showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
          return;
        }
        proceedQuestion();
      }).catch(function () {
        showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
      });
      return;
    }
    proceedQuestion();
  }
  function proceedQuestion() {
    if (isPaused()) { needNext = true; return; }
    if (idx >= TOTAL) return end();
    takeQ().then(function (q) {
      if (!q) return end();
      cur = q; lock = false; listenPlays = 0;
      stallIdx = Math.floor(idx / PER_STALL);
      var stall = STALLS[stallIdx];
      var j = (idx % PER_STALL) + 1;
      $('#progInfo').textContent = 'Quầy ' + (stallIdx + 1) + '/6 · Câu ' + j + '/6 · ' + st.lv;
      /* Câu này có chơi kiểu nghe không: đúng quầy Nghe + giọng khả
         dụng + chính câu này nghe được (isListenQ). */
      curIsListen = !!(stall.listen && !listenFallback && isListenQ(q));
      renderListenBox(curIsListen);
      var qb = $('#qBox'), qsub = $('#qSub');
      if (curIsListen) {
        /* Ẩn chữ câu hỏi: chỉ hiện lời dẫn nghe, đáp án nghe lấy từ
           answerText của chính câu GQ này (phát ở dưới). */
        qb.textContent = '👂 Nghe và chọn từ đúng';
        qb.classList.remove('long');
        qsub.textContent = 'Nghe kỹ rồi chọn từ vừa nghe nhé';
      } else {
        qb.textContent = q.prompt || '';
        qb.classList.toggle('long', (q.prompt || '').length > 14);
        qsub.textContent = q.promptSub || '';
        if (stall.listen && listenFallback) qsub.textContent = '📖 Đọc & chọn' + (q.promptSub ? ' · ' + q.promptSub : '');
      }
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      drawChain();
      drawStallMap();
      /* Giờ/câu theo độ khó × hệ số riêng của quầy (Kanji Chớp ×0,7) */
      startTimer(DIFF[st.diff].s * (stall.timeMul || 1), function () { if (!lock) { lock = true; answer(false, null); } });
      /* Vào câu nghe: tự phát đáp án 1 lần (tính vào hạn 3 lần/câu) */
      if (curIsListen) speakListen();
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
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '🎉 Nộp câu';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      answer(orderRight(q, got), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (isPaused() || lock) return; lock = true; stopTimer();
    window.GPLUS_TRACK && GPLUS_TRACK(cur, right);
    var __pr = window.GPLUS ? GPLUS.onAnswer(right) : null;
    var sp = speedFrac();
    if (btn) btn.classList.add(right ? 'ok' : 'bad');
    revealChoices();
    if (right) {
      okCount++; chain++; bestChain = Math.max(bestChain, chain);
      stallOk[stallIdx]++;
      /* Điểm theo chuỗi: mỗi mắt xích cộng thêm 20% */
      score += Math.round((80 + sp * 40) * DIFF[st.diff].x * (1 + (chain - 1) * 0.2)) * (window.GPLUS ? GPLUS.scoreMul() : 1);
      sfx('beam'); fx('burst', btn || $('#mascot')); fx('comboPop', chain);
      trend(chain >= 4 ? 'combo' : sp > 0.7 ? 'nhanh' : 'dung');
      pushBubble(CHEERS[cheerIx++ % CHEERS.length]);
      if (chain === 5) { fx('confetti'); pushBubble('Chuỗi 5 câu liền! Quá đỉnh 🔥'); }
    } else {
      /* Khiên GAME-PLUS: đỡ đúng phần mất chuỗi (chain), điểm/tem như cũ. */
      if (!(__pr && __pr.shieldUsed)) chain = 0;
      sfx('wrong'); fx('shake', $('#qBox'));
      trend(btn ? 'sai' : 'hetgio');
      pushBubble('Suýt thôi, câu sau gỡ liền! 💪');
    }
    idx++;
    /* Vừa xong câu cuối của 1 quầy 1–5: chốt tem ngay nếu đạt ≥4/6 */
    if (idx % PER_STALL === 0 && idx > 0) {
      var fs = idx / PER_STALL - 1;
      if (fs >= 0 && fs < 5 && stallOk[fs] >= STAMP_NEED) stamps[fs] = true;
    }
    drawChain();
    drawStallMap();
    setTimeout(next, 900);
  }

  function end() {
    if (ended) return; ended = true;
    if (window.GPLUS) GPLUS.endMatch();
    if (pauseCtl) pauseCtl.setVisible(false);
    stopTimer();
    /* Chốt tem + quà TRƯỚC khi nộp điểm để điểm nộp gồm cả thưởng.
       Tính 1 lần duy nhất ở đây; renderResult chỉ đọc lại state. */
    var stampCount = 0;
    for (var i = 0; i < stamps.length; i++) if (stamps[i]) stampCount++;
    finalStampCount = stampCount;
    var fullStamps = stampCount >= 5;
    giftBonus = fullStamps ? GIFT_BONUS * DIFF[st.diff].x : 0;
    if (giftBonus) score += giftBonus;
    /* Đủ 5 tem -> đổi quà: pháo giấy + GFIN ăn mừng (theo mẫu ngưỡng
       thắng cũ: GFIN.playBoss nếu có, ngược lại GFIN.play). */
    if (fullStamps && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: $('#mascot'), toEl: null, dmg: score }); else GFIN.play({ fromEl: $('#mascot'), toEl: null, dmg: score }); } catch (e) {} }
    $('#play').classList.add('mx-hid');
    submitScore(score, startT);
    sfx(fullStamps ? 'victory' : 'click');
    trend(fullStamps ? 'thang' : 'dung');
    if (fullStamps) fx('confetti');
    renderResult();
  }
  /* Chỉ DỰNG HTML màn kết quả từ state hiện tại (không nộp điểm/không sfx —
     các hiệu ứng phụ nằm ở end()); gọi lại khi tên người chơi resolve muộn
     để dòng chữ dùng tên mới nhất. */
  function renderResult() {
    var r = $('#result'); r.classList.remove('mx-hid');
    var stampCount = 0;
    for (var i = 0; i < stamps.length; i++) if (stamps[i]) stampCount++;
    /* Khi render lại do tên resolve muộn, finalStampCount đã chốt ở
       end() là nguồn đúng; trước end() (không xảy ra) thì đếm trực tiếp. */
    if (ended) stampCount = finalStampCount;
    var fullStamps = stampCount >= 5;
    var cells = '';
    for (var k = 0; k < 5; k++) {
      var s = STALLS[k];
      var nm = (s.listen && listenFallback) ? 'Đọc & Chọn' : s.name;
      cells += '<div class="xlh-stamp-cell' + (stamps[k] ? ' got' : '') + '">' +
        '<span class="xlh-cell-emoji">' + s.emoji + '</span>' +
        '<span class="xlh-cell-name">' + esc(nm) + '</span>' +
        '<span class="xlh-cell-stat">' + stallOk[k] + '/6 đúng</span>' +
        '<span class="xlh-cell-stamp">' + (stamps[k] ? '🏮 Đã nhận tem' : 'Chưa có tem') + '</span></div>';
    }
    var giftHtml = fullStamps
      ? '<div class="xlh-gift">🎁 ĐỔI QUÀ THÀNH CÔNG! +' + giftBonus + ' điểm thưởng (500 × hệ số khó ×' + DIFF[st.diff].x + ') đã cộng vào tổng điểm.</div>'
      : '<p class="mx-mut">Đủ 5 tem mới đổi được quà 🎁 — lần này ' + esc(callName()) + ' gom được ' + stampCount + '/5 tem. Quầy Quà Cuối: ' + stallOk[5] + '/6 đúng.</p>';
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">🎆</div>' +
      '<h1>Lễ hội khép lại!</h1>' +
      '<p class="mx-mut">' + esc(callName()) + ' đã đua xong 6 quầy — đúng ' + okCount + '/' + TOTAL + ' câu, chuỗi dài nhất ' + bestChain + ' câu liền.</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + '/' + TOTAL + ' đúng</span><span class="mx-pill">🔥 Chuỗi ' + bestChain + '</span><span class="mx-pill">🏮 Tem ' + stampCount + '/5</span><span class="mx-pill">' + esc(st.lv) + ' · ' + DIFF[st.diff].n + '</span></div>' +
      '<div class="xlh-stamps">' + cells + '</div>' +
      giftHtml +
      '<div style="height:10px"></div>' +
      '<button class="mx-btn" id="btnAgain" type="button">Chơi lại</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  /* FIX3: nút Tạm dừng — onResume cộng ms đã dừng vào t0 + startT;
     thoát theo luồng sẵn có: về menu như nút "Về menu" ở màn lỗi. */
  /* GAME-PLUS: phép dời giờ DÙNG CHUNG cho onResume của GPAUSE và kỹ
     năng Đóng băng — cộng dur vào t0 (mốc đồng hồ câu) + startT. */
  function shiftLhTime(dur) { t0 += dur; startT += dur; }
  if (window.GPLUS) {
    GPLUS.setHudHost($('#lhPlusHud'));
    GPLUS.setFreezeHandler(function () {
      if (!timerLive || lock) return false;
      shiftLhTime(5000);
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
      exitLabel: 'Thoát lễ hội (về menu)',
      isPlaying: function () { return !$('#play').classList.contains('mx-hid'); },
      onPause: function () { suspendTimer(); },
      onResume: function (dur) {
        shiftLhTime(dur);
        if (timerLive) armTimer();
        if (needNext) { needNext = false; next(); }
      },
      onExit: function () { if (window.GPLUS) GPLUS.endMatch(); stopTimer(); $('#play').classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); }
    });
  }

  bindUserEvent();
  loadUser().then(buildMenu);
})();
