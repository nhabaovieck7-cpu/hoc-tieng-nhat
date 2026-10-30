/* thach-dau.js — game-plus NHÁNH D: THÁCH ĐẤU BẠN BÈ ⚔️.
   Chạy KHÔNG cần server: mã thử thách TỰ CHỨA (challenge-codec.js,
   window.GCHALLENGE) mang seed + danh sách qid + điểm chuẩn; máy người
   nhận dựng lại đúng bộ câu theo qid từ pool GQ (seed chung).

   CÔNG THỨC ĐIỂM CHUNG (cả 2 phía PHẢI tính y hệt nhau — ghi rõ ở đây):
     score = số câu đúng x 100
           + tổng thưởng tốc độ, mỗi câu đúng cộng
             round(50 x thời gian còn lại / tổng giờ của câu)
     giờ mỗi câu = 12 giây (như DIFF.tb của dau-kanji); hết giờ = sai.
     ms = tổng thời gian của lượt (đã trừ thời gian tạm dừng GPAUSE).
   GPLUS.scoreMul() KHÔNG áp dụng ở thách đấu: điểm phải khớp tuyệt đối
   giữa 2 máy theo công thức chung trên (như raid — dmg/điểm cố định).
   GPLUS.tryRevive KHÔNG dùng: lượt thách đấu không có thua chung cuộc,
   luôn chơi trọn bộ câu. Khiên (GPLUS.onAnswer) giữ streak qua 1 câu sai.
   GPLUS_TRACK móc tại phễu chấm của CẢ 2 lượt (tạo + nhận). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var QSEC = 12;
  var QCOUNT = 10;
  var MIN_MATCH = 8;   // dựng lại bộ câu: khớp < 8/10 qid thì huỷ (thiết kế §4.1)
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var TOPICS = { mix: 'Trộn', kanji: 'Kanji', vocab: 'Từ vựng', grammar: 'Ngữ pháp' };

  /* Điểm 1 câu theo CÔNG THỨC CHUNG ở đầu file */
  function ptsFor(right, frac) {
    if (!right) return 0;
    var f = Math.max(0, Math.min(1, frac));
    return 100 + Math.round(50 * f);
  }
  function fmtMs(ms) { return (Math.max(0, ms || 0) / 1000).toFixed(1) + ' giây'; }
  function fmtDate(t) {
    try { var d = new Date(t); return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }); }
    catch (e) { return ''; }
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
    window.addEventListener('hn-game-user', function (ev) { syncUser((ev && ev.detail) || window.GAME_USER_DATA); });
  }
  function callName() {
    if (!user.loggedIn) return 'bạn';
    if (user.call && user.name && user.call !== user.name) return user.call + ' ' + user.name;
    return user.name || user.call || 'bạn';
  }
  /* Tên hiển thị hiện tại cho trường from của mã: GAME_USER mới nhất;
     khách -> 'Người chơi khách' (đúng đặc tả nhánh D). */
  function myDisplayName() {
    try { var d = window.GAME_USER_DATA; if (d && d.loggedIn && d.name) return d.name; } catch (e) {}
    if (user.loggedIn && user.name) return user.name;
    return 'Người chơi khách';
  }
  function trend(m, el) { try { if (window.GTREND && typeof GTREND.say === 'function') return GTREND.say(m, el); } catch (e) {} return null; }
  function music(scene) { try { if (window.GMUSIC && typeof GMUSIC.play === 'function') GMUSIC.play(scene); } catch (e) {} }
  function sfx(n) { try {
    if (typeof window.GSFX === 'function') GSFX(n);
    else if (window.GSFX && typeof GSFX.play === 'function') GSFX.play(n);
    else if (typeof window.sfx === 'function') window.sfx(n);
  } catch (e) {} }
  function fx(name, arg) { try { if (window.GFX && typeof GFX[name] === 'function') GFX[name](arg); } catch (e) {} }

  /* ---------- Kho hn_game_v1 qua GPLUS (bảo toàn các mục khác) ---------- */
  function gLoad() {
    if (window.GPLUS && typeof GPLUS.load === 'function') { try { return GPLUS.load() || {}; } catch (e) {} }
    try { var o = JSON.parse(localStorage.getItem('hn_game_v1') || 'null'); return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {}; } catch (e) { return {}; }
  }
  function gSave(o) {
    if (window.GPLUS && typeof GPLUS.save === 'function') { try { return GPLUS.save(o); } catch (e) {} }
    try { localStorage.setItem('hn_game_v1', JSON.stringify(o)); return true; } catch (e) { return false; }
  }
  function saveHistory(entry) {
    var o = gLoad();
    var c = Array.isArray(o.c) ? o.c : [];
    c.unshift(entry);
    o.c = c.slice(0, 20);
    gSave(o);
    renderHistory();
  }
  var VERDICT_LABEL = { win: 'Thắng 🏆', draw: 'Hoà 🤝', lose: 'Thua 💪' };
  function renderHistory() {
    var o = gLoad();
    var c = Array.isArray(o.c) ? o.c : [];
    var wrap = $('#histWrap'), list = $('#histList');
    if (!c.length) { wrap.classList.add('mx-hid'); list.innerHTML = ''; return; }
    wrap.classList.remove('mx-hid');
    list.innerHTML = c.map(function (h) {
      var v = VERDICT_LABEL[h.verdict] || h.verdict || '';
      return '<li><span class="td-hist-verdict ' + esc(h.verdict || '') + '">' + esc(v) + '</span>' +
        ' · vs ' + esc(h.from || 'Người thách') + ' · ' + esc(h.level || '') + '/' + esc(TOPICS[h.topic] || h.topic || '') +
        '<br>Tôi ' + (h.myScore || 0) + ' điểm — đối thủ ' + (h.vsScore || 0) + ' điểm' +
        (h.t ? ' · <span class="td-hist-code">' + esc(fmtDate(h.t)) + '</span>' : '') +
        (h.code ? '<br><span class="td-hist-code td-mono">' + esc(h.code) + '…</span>' : '') + '</li>';
    }).join('');
  }

  /* ---------- Trạng thái ---------- */
  var st = { lv: 'N5', topic: 'mix' };
  var flow = null;          // 'create' | 'recv'
  var deck = [], qi = 0, cur = null, lock = false, round = 0,
      okCount = 0, streak = 0, best = 0, score = 0,
      t0 = 0, startT = 0, timer = null, limMs = 0,
      timerCb = null, timerLive = false, needNext = false, pauseCtl = null;
  var createSeed = 0;       // seed của lượt tạo (đóng vào mã)
  var pending = null;       // thử thách đã giải mã, chờ chấp nhận
  var pendingCode = '';     // mã gốc của pending (lưu rút gọn vào lịch sử)
  function isPaused() { return !!(pauseCtl && pauseCtl.isPaused()); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }
  function usable(qs) { return (qs || []).filter(function (q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }); }

  /* ---------- Đồng hồ câu (mẫu dau-kanji/leo-thap) ---------- */
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

  /* ---------- GPLUS: HUD + đóng băng + gợi ý (như raid) ---------- */
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
  function cancelFreeze() { if (freezeTimer) clearTimeout(freezeTimer); freezeTimer = null; frozen = false; }
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

  /* ---------- Menu: seg chọn cấp/topic + loadout ---------- */
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
    var lv = $('#lvSeg');
    lv.innerHTML = segHTML(LEVELS.map(function (l) { return { v: l, n: l }; }), st.lv, 'lv');
    bindSeg(lv, 'lv', function (v) { st.lv = v; });
    var tp = $('#topicSeg');
    tp.innerHTML = segHTML(Object.keys(TOPICS).map(function (k) { return { v: k, n: TOPICS[k] }; }), st.topic, 'topic');
    bindSeg(tp, 'topic', function (v) { st.topic = v; });
    if (window.GPLUS && typeof GPLUS.mountLoadout === 'function') {
      try { GPLUS.mountLoadout($('#loadoutBox')); } catch (e) {}
    }
    $('#btnCreatePlay').addEventListener('click', startCreate);
    $('#btnDecode').addEventListener('click', function () { decodeChallenge($('#codeIn').value); });
  }

  function showError(msg) {
    stopTimer(); cancelFreeze();
    if (window.GPLUS && typeof GPLUS.endMatch === 'function') { try { GPLUS.endMatch(); } catch (e) {} }
    if (pauseCtl) pauseCtl.setVisible(false);
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-err"><div class="mx-big-emoji">🌧️</div><h1>Chưa lấy được câu hỏi</h1>' +
      '<p class="mx-mut">' + esc(msg) + '</p><div style="height:12px"></div>' +
      '<button class="mx-btn" id="btnRetry" type="button">Về sảnh thách đấu</button></div>';
    $('#btnRetry').addEventListener('click', backToMenu);
  }
  function backToMenu() {
    stopTimer(); cancelFreeze();
    if (pauseCtl) pauseCtl.setVisible(false);
    $('#play').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    $('#menu').classList.remove('mx-hid');
    renderHistory();
  }

  /* ---------- Lượt chơi dùng chung cho cả 2 phía ---------- */
  function startRound(questions, kind) {
    flow = kind;
    deck = questions; qi = 0; round = 0;
    okCount = 0; streak = 0; best = 0; score = 0; lock = false;
    startT = Date.now(); needNext = false;
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    $('#play').classList.remove('mx-hid');
    if (pauseCtl) pauseCtl.setVisible(true);
    if (window.GPLUS && typeof GPLUS.beginMatch === 'function') { try { GPLUS.beginMatch('thach-dau'); } catch (e) {} }
    music('normal'); trend('vao');
    next();
  }
  function next() {
    if (isPaused()) { needNext = true; return; }
    if (qi >= deck.length) return endRound();
    cur = deck[qi++]; lock = false; round++;
    $('#roundInfo').textContent = 'Câu ' + round + '/' + deck.length + ' · ' + (flow === 'create' ? 'Lượt tạo thử thách' : 'Lượt nhận thử thách');
    $('#scorePill').textContent = '⭐ ' + score;
    var qb = $('#qBox');
    qb.textContent = cur.prompt || '';
    qb.classList.toggle('long', (cur.prompt || '').length > 14);
    $('#qSub').textContent = cur.promptSub || '';
    $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
    $('#comboBox').textContent = streak >= 2 ? '🔥 Chuỗi x' + streak : '';
    if (cur.tokens && cur.tokens.length >= 2 && !cur.choices) renderOrder(cur); else renderChoices(cur);
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
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '⚔️ Chốt đáp án';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      funnel(norm(got) === norm(q.answerText), chk, false);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  /* Phễu chấm DUY NHẤT (cả 2 lượt): GPLUS_TRACK + khiên tại đây;
     điểm cộng theo ptsFor() — công thức chung ở đầu file. */
  function funnel(right, btn, timeout) {
    if (isPaused() || lock) return; lock = true;
    var frac = speedFrac();
    stopTimer(); cancelFreeze();
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
      score += ptsFor(true, frac);
      $('#scorePill').textContent = '⭐ ' + score;
      fx('comboPop', streak); sfx('hit');
      trend(streak >= 3 ? 'combo' : (frac > 0.7 ? 'nhanh' : 'dung'));
      setTimeout(next, 950);
    } else {
      if (btn) btn.classList.add('bad');
      revealChoices();
      if (!shieldUsed) streak = 0;
      sfx('fire');
      if (shieldUsed) { $('#comboBox').textContent = '🛡️ Khiên đã đỡ — chuỗi đúng được giữ!'; trend('trogiup'); }
      else trend(timeout ? 'hetgio' : 'sai');
      setTimeout(next, 1150);
    }
  }

  function endRound() {
    stopTimer(); cancelFreeze();
    if (pauseCtl) pauseCtl.setVisible(false);
    if (window.GPLUS && typeof GPLUS.endMatch === 'function') { try { GPLUS.endMatch(); } catch (e) {} }
    $('#play').classList.add('mx-hid');
    var ms = Math.max(0, Date.now() - startT);
    var me = { score: score, ok: okCount, ms: ms };
    if (flow === 'create') renderCreateResult(me);
    else renderRecvResult(me);
  }

  /* ---------- Phía TẠO thử thách ---------- */
  function startCreate() {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) { showError('Chưa nạp được bộ câu hỏi. Thử tải lại trang nhé.'); return; }
    createSeed = (Math.random() * 1e9 | 0) + 1;
    var btn = $('#btnCreatePlay');
    btn.disabled = true; btn.textContent = '⏳ Đang lấy câu hỏi…';
    GQ.getQuestions({ level: st.lv, topic: st.topic, count: QCOUNT, seed: createSeed }).then(function (qs) {
      btn.disabled = false; btn.textContent = 'Chơi lượt tạo thử thách ▶';
      var u = usable(qs);
      if (u.length < 3) { showError('Chưa gom đủ câu hỏi cho cấp ' + st.lv + '. Thử lại sau ít phút nhé.'); return; }
      startRound(u.slice(0, QCOUNT), 'create');
    }).catch(function () {
      btn.disabled = false; btn.textContent = 'Chơi lượt tạo thử thách ▶';
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }
  function renderCreateResult(me) {
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">⚔️</div>' +
      '<h1>Lượt tạo thử thách xong!</h1>' +
      '<p class="mx-mut">Kết quả này trở thành điểm chuẩn trong mã thử thách.</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">✅ ' + me.ok + '/' + deck.length + ' đúng</span>' +
      '<span class="mx-pill">⭐ ' + me.score + ' điểm</span>' +
      '<span class="mx-pill">⏱️ ' + fmtMs(me.ms) + '</span></div>' +
      '<button class="mx-btn" id="btnMakeCode" type="button">🔗 Tạo mã thử thách</button>' +
      '<div id="codeBox" class="mx-hid" style="text-align:left;margin-top:14px">' +
      '<textarea id="codeOut" class="td-code-in td-code-out" rows="3" readonly aria-label="Mã thử thách"></textarea>' +
      '<div class="td-actions"><button class="mx-btn" id="btnCopyCode" type="button">📋 Sao chép mã</button>' +
      '<a class="mx-btn alt" id="codeLink" style="display:block;text-align:center;text-decoration:none" href="#">Mở link thử thách</a></div>' +
      '<a class="td-link td-mono" id="codeLinkText" href="#"></a>' +
      '<p class="mx-mut" style="margin-top:8px">Gửi mã hoặc link cho người muốn thách đấu — phía bên kia dán mã vào thẻ 📩 Nhận thử thách là chơi đúng bộ câu này.</p></div>' +
      '<div style="height:12px"></div><button class="mx-btn alt" id="btnBack1" type="button">Về sảnh thách đấu</button></div>';
    $('#btnBack1').addEventListener('click', backToMenu);
    $('#btnMakeCode').addEventListener('click', function () {
      if (!(window.GCHALLENGE && typeof GCHALLENGE.encode === 'function')) {
        $('#codeBox').classList.remove('mx-hid');
        $('#codeOut').value = '';
        $('#codeOut').placeholder = 'Chưa nạp được bộ tạo mã (challenge-codec.js) — thử tải lại trang.';
        return;
      }
      var code = GCHALLENGE.encode({
        seed: String(createSeed), level: st.lv, topic: st.topic, count: deck.length,
        qids: deck.map(function (q) { return q.id; }),
        /* Bản chụp ĐẦY ĐỦ từng câu: GQ có sổ chống lặp + pool hàng nghìn
           biến thể nên seed+qid KHÔNG dựng lại tin cậy được bộ gốc (đã đo:
           8 vòng gọi chỉ khớp ~4/10 qid). Mang theo câu hỏi thật trong mã
           -> phía nhận chơi ĐÚNG bộ này, không phụ thuộc GQ. */
        qs: deck.map(function (q) {
          return {
            t: q.type || '', l: q.lesson || '', p: q.prompt || '', s: q.promptSub || '',
            a: q.answerText || '',
            c: (q.choices && q.choices.length) ? q.choices.slice() : null,
            k: (q.tokens && q.tokens.length) ? q.tokens.slice() : null
          };
        }),
        from: { name: myDisplayName(), score: me.score, ok: me.ok, ms: me.ms }
      });
      var box = $('#codeBox'); box.classList.remove('mx-hid');
      $('#codeOut').value = code;
      var link = 'thach-dau.html#c=' + code;
      var abs = link;
      try { abs = location.href.split('#')[0].replace(/[^/]*$/, '') + link; } catch (e) {}
      $('#codeLink').setAttribute('href', link);
      var lt = $('#codeLinkText'); lt.setAttribute('href', link); lt.textContent = abs;
      var cp = $('#btnCopyCode');
      cp.onclick = function () {
        var ta = $('#codeOut');
        function done() { cp.textContent = '✅ Đã sao chép!'; setTimeout(function () { cp.textContent = '📋 Sao chép mã'; }, 1800); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(done).catch(function () { ta.select(); try { document.execCommand('copy'); } catch (e) {} done(); });
        } else { ta.select(); try { document.execCommand('copy'); } catch (e) {} done(); }
      };
    });
  }

  /* ---------- Phía NHẬN thử thách ---------- */
  function recvError(msg) {
    var e = $('#recvErr');
    if (!msg) { e.classList.add('mx-hid'); e.textContent = ''; return; }
    e.textContent = msg; e.classList.remove('mx-hid');
  }
  function decodeChallenge(raw) {
    recvError('');
    $('#chalInfo').innerHTML = '';
    pending = null; pendingCode = '';
    var code = String(raw || '').trim();
    if (!code) { recvError('Chưa có mã nào trong ô — dán mã thử thách vào rồi bấm Giải mã nhé.'); return; }
    /* Dán cả link cũng nhận: tách phần #c= nếu có */
    var hi = code.indexOf('#c=');
    if (hi >= 0) code = code.slice(hi + 3).trim();
    if (!(window.GCHALLENGE && typeof GCHALLENGE.decode === 'function')) {
      recvError('Chưa nạp được bộ giải mã (challenge-codec.js) — thử tải lại trang.'); return;
    }
    var obj = GCHALLENGE.decode(code);
    if (!obj) { recvError('Mã thử thách không hợp lệ hoặc đã bị hỏng khi sao chép. Kiểm tra lại đoạn mã được gửi tới nhé.'); return; }
    pending = obj; pendingCode = code;
    var from = obj.from || {};
    $('#chalInfo').innerHTML = '<div class="td-chal"><h3>⚔️ ' + esc(from.name || 'Người thách') + ' thách đấu!</h3>' +
      '<div class="mx-mut">Bộ câu: ' + esc(obj.level || '') + ' · ' + esc(TOPICS[obj.topic] || obj.topic || '') + ' · ' + (Array.isArray(obj.qids) ? obj.qids.length : (obj.count || 10)) + ' câu' +
      (obj.t ? ' · tạo lúc ' + esc(fmtDate(obj.t)) : '') + '</div>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ Điểm chuẩn ' + (from.score || 0) + '</span>' +
      '<span class="mx-pill">✅ Đúng ' + (from.ok || 0) + ' câu</span>' +
      '<span class="mx-pill">⏱️ ' + fmtMs(from.ms || 0) + '</span></div>' +
      '<button class="mx-btn" id="btnAccept" type="button">Chấp nhận thử thách ▶</button></div>';
    $('#btnAccept').addEventListener('click', acceptChallenge);
  }
  function acceptChallenge() {
    if (!pending) return;
    var ch = pending;
    var btn = $('#btnAccept');
    btn.disabled = true; btn.textContent = '⏳ Đang dựng lại bộ câu…';
    recvError('');
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) {
      btn.disabled = false; btn.textContent = 'Chấp nhận thử thách ▶';
      recvError('Chưa nạp được bộ câu hỏi (questions.js) — thử tải lại trang.');
      return;
    }
    /* Ưu tiên 1: dựng bộ câu từ BẢN CHỤP trong mã (mã mới) — chính xác
       tuyệt đối, không phụ thuộc GQ/pool/mạng. */
    if (Array.isArray(ch.qs) && ch.qs.length) {
      var snapDeck = ch.qs.map(function (sn, i) {
        var q = {
          id: (ch.qids && ch.qids[i]) || ('snap-' + i),
          type: sn.t || '', lesson: sn.l || '', prompt: sn.p || '', promptSub: sn.s || '',
          answerText: sn.a || ''
        };
        if (sn.c && sn.c.length) {
          q.choices = sn.c.slice(); // thứ tự đã được GQ xáo ở phía tạo
          q.answer = q.choices.indexOf(sn.a);
          if (q.answer < 0) return null;
        }
        if (sn.k && sn.k.length) q.tokens = sn.k.slice();
        return q;
      }).filter(Boolean);
      var snapUsable = usable(snapDeck);
      if (snapUsable.length >= MIN_MATCH) {
        btn.disabled = false; btn.textContent = 'Chấp nhận thử thách ▶';
        pending = null;
        startRound(snapUsable.slice(0, QCOUNT), 'recv');
        activeChal = ch; activeCode = pendingCode;
        return;
      }
    }
    var seedNum = parseInt(ch.seed, 10);
    var seedArg = isNaN(seedNum) ? ch.seed : seedNum;
    /* Dự phòng cho mã CŨ (không có bản chụp): dựng lại theo qid — QUAN TRỌNG: GQ có sổ chống lặp (hn_game_seen_q)
       nên MỘT lần gọi getQuestions chỉ trả ~40 câu và thường KHÔNG chứa
       đủ 10 qid của mã (bộ gốc lấy từ một lần gọi khác). Vì vậy lặp tối
       đa 8 vòng gọi (mỗi vòng GQ ưu tiên câu chưa phát -> hợp nhất theo
       id tăng dần độ phủ pool) tới khi khớp đủ qids hoặc hết vòng. */
    var byId = {};
    var TRIES = 8;
    function allFound() {
      return (ch.qids || []).every(function (id) { return !!byId[id]; });
    }
    function finishRestore() {
      btn.disabled = false; btn.textContent = 'Chấp nhận thử thách ▶';
      var ordered = [];
      (ch.qids || []).forEach(function (id) { if (byId[id]) ordered.push(byId[id]); });
      var usableOrdered = usable(ordered);
      if (usableOrdered.length < MIN_MATCH) {
        recvError('Bộ câu đã thay đổi, không dựng lại trọn vẹn được (chỉ khớp ' + usableOrdered.length + '/' + (ch.qids || []).length + ' câu). Lượt này bị huỷ để không phải chơi một bộ câu khác với bộ gốc.');
        return;
      }
      pending = null;
      startRound(usableOrdered.slice(0, QCOUNT), 'recv');
      /* pending đã chốt vào biến ch ở trên — giữ lại cho endRound qua closure biến ngoài */
      activeChal = ch; activeCode = pendingCode;
    }
    (function nextTry(i) {
      if (i >= TRIES || allFound()) { finishRestore(); return; }
      var s = i === 0 ? seedArg : (isNaN(seedNum) ? ('r' + i) : seedNum + i * 7919);
      GQ.getQuestions({ level: ch.level, topic: ch.topic, count: 40, seed: s }).then(function (qs) {
        (qs || []).forEach(function (q) { if (q && q.id && !byId[q.id]) byId[q.id] = q; });
        nextTry(i + 1);
      }).catch(function () {
        if (i === 0 && !Object.keys(byId).length) {
          btn.disabled = false; btn.textContent = 'Chấp nhận thử thách ▶';
          recvError('Chưa tải được bộ câu để dựng lại thử thách (mạng chậm hoặc máy chủ bận). Thử lại sau một chút nhé.');
          return;
        }
        finishRestore();
      });
    })(0);
  }
  var activeChal = null, activeCode = '';

  function renderRecvResult(me) {
    var ch = activeChal;
    var r = $('#result'); r.classList.remove('mx-hid');
    if (!ch || !(window.GCHALLENGE && typeof GCHALLENGE.verdict === 'function')) {
      r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">⚔️</div><h1>Lượt thách đấu xong!</h1>' +
        '<div class="mx-stat-row"><span class="mx-pill">✅ ' + me.ok + '/' + deck.length + ' đúng</span><span class="mx-pill">⭐ ' + me.score + ' điểm</span><span class="mx-pill">⏱️ ' + fmtMs(me.ms) + '</span></div>' +
        '<button class="mx-btn" id="btnBack2" type="button">Về sảnh thách đấu</button></div>';
      $('#btnBack2').addEventListener('click', backToMenu);
      return;
    }
    var from = ch.from || {};
    var foe = { score: from.score || 0, ok: from.ok || 0, ms: from.ms || 0 };
    var v = GCHALLENGE.verdict(me, foe);
    saveHistory({
      code: String(activeCode || '').slice(0, 12),
      level: ch.level || st.lv, topic: ch.topic || st.topic,
      from: from.name || '', myScore: me.score, vsScore: foe.score,
      verdict: v, t: Date.now()
    });
    var vHead = v === 'win' ? '🏆 THẮNG THỬ THÁCH!' : (v === 'draw' ? '🤝 HOÀ!' : '💪 THUA KEO NÀY');
    var vSub = v === 'win' ? 'Vượt qua điểm chuẩn của người thách rồi — gửi lại kết quả này cho đối thủ xem nhé!'
      : (v === 'draw' ? 'Ngang tài ngang sức — đúng/điểm/thời gian khớp nhau cả. Làm thêm ván nữa phân thắng bại nhé!'
        : 'Chưa qua được điểm chuẩn lần này. Ôn lại bộ câu rồi phục thù bằng một mã thử thách mới nhé!');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">' + (v === 'win' ? '🏆' : (v === 'draw' ? '🤝' : '💪')) + '</div>' +
      '<div class="td-verdict ' + v + '">' + vHead + '</div>' +
      '<p class="mx-mut">' + vSub + '</p>' +
      '<div class="td-vs">' +
      '<div class="td-col me"><h3>🧑 ' + esc(myDisplayName()) + ' (mình)</h3>' +
      '<div class="td-row"><span>✅ Đúng</span><b>' + me.ok + '/' + deck.length + '</b></div>' +
      '<div class="td-row"><span>⭐ Điểm</span><b>' + me.score + '</b></div>' +
      '<div class="td-row"><span>⏱️ Thời gian</span><b>' + fmtMs(me.ms) + '</b></div></div>' +
      '<div class="td-col"><h3>⚔️ ' + esc(from.name || 'Người thách') + '</h3>' +
      '<div class="td-row"><span>✅ Đúng</span><b>' + foe.ok + '/' + (Array.isArray(ch.qids) ? ch.qids.length : deck.length) + '</b></div>' +
      '<div class="td-row"><span>⭐ Điểm</span><b>' + foe.score + '</b></div>' +
      '<div class="td-row"><span>⏱️ Thời gian</span><b>' + fmtMs(foe.ms) + '</b></div></div>' +
      '</div>' +
      '<p class="td-trend" id="tdTrend"></p>' +
      '<button class="mx-btn" id="btnBack3" type="button">Về sảnh thách đấu</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnBack3').addEventListener('click', backToMenu);
    var said = trend(v === 'win' ? 'thang' : (v === 'draw' ? 'dung' : 'thua'));
    var tp = $('#tdTrend');
    if (tp && said) tp.textContent = '“' + said + '”';
    if (v === 'win') { fx('confetti'); sfx('victory'); }
    activeChal = null; activeCode = '';
  }

  /* GPAUSE đúng mẫu pause.js (như dau-kanji/leo-thap) */
  if (window.GPAUSE && typeof window.GPAUSE.create === 'function') {
    pauseCtl = window.GPAUSE.create({
      btnHost: $('#pauseSlot') || $('#play'),
      exitLabel: 'Thoát lượt (về sảnh thách đấu)',
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
  buildMenu();
  renderHistory();
  loadUser().then(function () {
    if (user.level && LEVELS.indexOf(user.level) >= 0 && user.level !== st.lv) {
      st.lv = user.level;
      $$('#lvSeg [data-seg="lv"] button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === st.lv); });
    }
  });
  /* Mở trang bằng link thach-dau.html#c=<mã>: tự nạp + giải mã sẵn */
  (function intakeHash() {
    var h = location.hash || '';
    if (h.indexOf('#c=') !== 0) return;
    var code = h.slice(3);
    try { code = decodeURIComponent(code); } catch (e) {}
    if (!code) return;
    $('#codeIn').value = code;
    decodeChallenge(code);
  })();
})();
