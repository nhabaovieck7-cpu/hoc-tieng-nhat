/* chay-vo-tan.js — Chạy vô tận (Đợt 3, Việc H: CHẠY DỌC + CHẠM ĐÁP ÁN).
   Đường chạy dọc: nhân vật ở dưới chạy hướng lên, 3 cổng đáp án NGANG hàng
   ở phía trước tiến gần dần (nhịp travelFor giữ nguyên: nhanh dần 3%/cổng,
   sàn 2.2s, khiên chậm x1.6). Tương tác chính = CHẠM TRỰC TIẾP vào cổng:
   nhân vật phóng tới cổng (WAAPI ~300ms) rồi tung skill phá vỡ cổng
   (ưu tiên GGEAR.attackFx nếu nhánh gear đã nạp, fallback GFX.skill/burst
   + mảnh DOM vỡ), sau hiệu ứng vỡ ~450ms mới chốt kết quả.
   Luật GIỮ NGUYÊN: sai (chạm sai HOẶC cổng chạm tới mà chưa trả lời) mất
   1 tim, 3 tim hết lượt, khiên chắn 1 lần sai, điểm = 100 x hệ số khó x
   (1 + combo x 0.1) + điểm quãng đường, nộp điểm GAME_API mode
   'chay-vo-tan'. Câu hỏi qua GQ (topic vocab).
   Đợt 4 Nhánh F: runner dùng nhân vật GAME_AVATAR (fallback emoji quay
   lên) và QUAY MẶT/NGHIÊNG THÂN về phía cổng được chạm trong lúc phóng —
   xem khối "HƯỚNG MẶT VỀ ĐÁP ÁN" ở dưới (hệ quy chiếu: rotate 0deg =
   hướng lên, âm = trái, dương = phải, clamp ±55deg). Luật/điểm/hình học
   đợt 3 không đổi. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var DIFF = { de: { n: 'Dễ', s: 9, x: 1 }, tb: { n: 'Trung bình', s: 6.5, x: 1 }, kho: { n: 'Khó', s: 4.5, x: 2 } };
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function syncUser(u) { if (u) for (var k in u) user[k] = u[k]; return user; }
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(syncUser).catch(function () { return user; });
  }
  /* Tên có thể resolve SAU khi menu đã vẽ (game.js phát sự kiện
     'hn-game-user', detail = GAME_USER_DATA, mỗi khi resolve/refresh xong):
     đồng bộ lại bản local rồi vẽ lại phần đang hiện có dùng tên — menu khi
     đang ở menu, tiêu đề màn kết quả khi đang hiện. Đăng ký đúng 1 lần,
     vẽ lại idempotent, không đổi logic chơi/điểm. */
  var userEvtBound = false;
  function bindUserEvent() {
    if (userEvtBound) return; userEvtBound = true;
    window.addEventListener('hn-game-user', function (ev) {
      syncUser((ev && ev.detail) || window.GAME_USER_DATA);
      refreshNameUI();
    });
  }
  function refreshNameUI() {
    paintRunnerPlate();
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
  var playing = false, score = 0, combo = 0, bestCombo = 0, lives = 3, dist = 0, gates = 0,
      pool = [], qi = 0, cur = null, curOpts = [], gateT0 = 0, travelMs = 6000, raf = null,
      shield = 1, shieldOn = false, slow = 1, slowOn = false, startT = 0, lastFrame = 0, resolving = false;

  function buildMenu() {
    var m = $('#menu');
    m.innerHTML =
      '<div class="mx-card"><div class="mx-big-emoji">🏃</div>' +
      '<h1>Chạy vô tận</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Chạy dọc lên phía trước: CHẠM thẳng vào cổng mang nghĩa đúng — nhân vật sẽ phóng tới tung skill phá cổng. Đừng để cổng chạm tới nơi mà chưa trả lời. Càng chạy nhịp càng nhanh. Sai 3 lần là hết lượt. Trợ giúp mỗi lượt: 🛡️ khiên chắn 1 lần sai · 🐢 chạy chậm 1 câu.</p>' +
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
    score = 0; combo = 0; bestCombo = 0; lives = 3; dist = 0; gates = 0; qi = 0; pool = [];
    shield = 1; shieldOn = false; slow = 1; slowOn = false; resolving = false;
    startT = Date.now(); lastFrame = 0;
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid'); $('#play').classList.remove('mx-hid');
    $('#btnShield').disabled = false; $('#btnShield').textContent = '🛡️ Khiên (1)';
    $('#btnSlow').disabled = false;
    resetRunner();
    updateHud();
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
      gb.style.top = '132px'; // đợt 7: top cố định 1 lần/cổng; vòng loop chỉ còn transform (xem loop)
      curOpts.forEach(function (o, i) {
        /* Cổng = NÚT BẤM THẬT: chạm/click trực tiếp để trả lời ngay khi
           cổng đang tiến gần, không phải chờ cổng chạm đáy. */
        var d = document.createElement('button');
        d.type = 'button'; d.className = 'rnv-gate'; d.textContent = o;
        d.setAttribute('data-idx', i);
        d.setAttribute('aria-label', 'Đáp án: ' + o);
        d.addEventListener('click', function () { answerGate(i, d); });
        gb.appendChild(d);
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
      /* Hàng cổng xuất phát ngay dưới hộp câu hỏi (top 132px cố định ở
         nextGate, tránh HUD/câu hỏi) và tiến về phía nhân vật ở đáy
         (chân cổng cách đáy 116px), phóng to dần như cũ.
         Đợt 7 (nhánh Q): tiến cổng bằng transform translateY + scale
         (compositor) thay style.top từng khung (ép layout mỗi khung). */
      gb.style.transform = 'translateY(' + (y * (H - 248)) + 'px) scale(' + (0.62 + y * 0.38) + ')';
      if (y >= 1) resolveGate();
    }
    /* Đợt 6 N: đầu dõi cổng gần nhất trong chính vòng lặp cổng này;
       khi đang dash/vỡ (resolving) giữ nguyên góc dash. */
    if (!resolving) trackHeadNormal();
    /* Đợt 7: HUD chỉ ghi DOM khi số nguyên đổi (bản cũ ghi textContent
       2 lần/khung dù số chưa đổi). */
    var dInt = Math.floor(dist), sInt = Math.floor(score);
    if (dInt !== loop._dInt) { loop._dInt = dInt; $('#distBox').textContent = dInt + ' m'; }
    if (sInt !== loop._sInt) { loop._sInt = sInt; $('#scoreBox').textContent = '⭐ ' + sInt; }
    raf = requestAnimationFrame(loop);
  }
  function reducedMotion() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ===== Đợt 4 Nhánh F: NHÂN VẬT GAME + HƯỚNG MẶT VỀ ĐÁP ÁN =====
     Thị giác: ưu tiên nhân vật SVG dùng chung GAME_AVATAR.paintFace
     (đúng mẫu dau-kanji.js / phong-nhom.js: bọc try/catch, cfg từ
     GAME_AVATAR.load(), mặt hồ sơ 'hoso' tự resolve). Chỉ khi không gọi
     được mới giữ emoji 🏃 dự phòng trong HTML — CSS .rnv-face-emoji quay
     glyph 90deg để hướng chạy trỏ lên (xem modes.css).
     HỆ QUY CHIẾU GÓC (để harness đo): góc áp trên .rnv-face là CSS
     rotate() theo độ, 0deg = mặt/hướng nhân vật hướng LÊN phía cổng
     trước mặt (vector (0,-1), phương vị -90deg). Góc âm = nghiêng về
     phía TRÁI màn hình, dương = nghiêng về phía PHẢI. */
  var FACE_MAX_DEG = 55; /* clamp: không bao giờ lật ngược nhân vật */
  /* Đợt 5 Nhánh C: runner ưu tiên HÌNH NGƯỜI TOÀN THÂN GBODY (nhánh A) đặt
     TRONG .rnv-face — góc quay đợt 4 áp trên .rnv-face nên cả thân quay theo
     như mặt. GBODY vắng/lỗi -> rơi về mặt bán thân GAME_AVATAR đợt 4, rồi
     emoji 🏃 (đúng mẫu fallback đợt 4). Biển tên .gnp-own nằm trong #runner
     NGOÀI .rnv-face (xem paintRunnerPlate) nên không quay theo thân. */
  var RUNNER_BODY_H = 84;
  function setupRunnerFace() {
    var face = $('#runnerFace'); if (!face) return;
    try {
      if (window.GBODY && typeof GBODY.paint === 'function' && window.GAME_AVATAR) {
        GBODY.paint(face, GAME_AVATAR.load(), { height: RUNNER_BODY_H });
        face.classList.add('rnv-face-avatar', 'rnv-face-body'); face.classList.remove('rnv-face-emoji');
        return;
      }
      if (window.GAME_AVATAR && typeof GAME_AVATAR.paintFace === 'function') {
        GAME_AVATAR.paintFace(face, GAME_AVATAR.load(), 56);
        face.classList.add('rnv-face-avatar'); face.classList.remove('rnv-face-body', 'rnv-face-emoji');
        return;
      }
      if (window.GAME_AVATAR && typeof GAME_AVATAR.faceHTML === 'function') {
        face.innerHTML = GAME_AVATAR.faceHTML(GAME_AVATAR.load(), 56);
        face.classList.add('rnv-face-avatar'); face.classList.remove('rnv-face-body', 'rnv-face-emoji');
        return;
      }
    } catch (e) { /* rơi xuống fallback emoji bên dưới */ }
    if (!face.querySelector('.rnv-emoji')) face.innerHTML = '<span class="rnv-emoji">🏃</span>';
    face.classList.add('rnv-face-emoji'); face.classList.remove('rnv-face-body');
  }
  /* Biển tên mình trên đầu runner: GNAME.plate(own) — tên MỚI NHẤT từ
     GAME_USER_DATA (GNAME tự nghe 'hn-game-user' để sửa text biển đang có;
     hàm này dựng lại biển khi chưa có, vd khách vừa đăng nhập). Khách ->
     ownName() = '' -> không biển. */
  function paintRunnerPlate() {
    var box = $('#runnerPlate'); if (!box) return;
    try {
      box.innerHTML = (window.GNAME && typeof GNAME.plate === 'function')
        ? GNAME.plate(GNAME.ownName(), { own: true }) : '';
    } catch (e) { box.innerHTML = ''; }
  }
  var faceEvtBound = false;
  function bindFaceEvent() {
    if (faceEvtBound) return; faceEvtBound = true;
    /* Người chơi đổi nhân vật/mặt lúc đang ở trang -> vẽ lại mặt runner. */
    document.addEventListener('hn-game-avatar', function () { setupRunnerFace(); setFace(0, 0); setHeadTurn(0); });
  }
  /* Góc nghiêng (độ, đã clamp ±55) từ vector runner->cổng (dx, dy theo
     tọa độ màn hình: x phải+, y xuống+). Hướng lên tuyệt đối có phương
     vị atan2 = -90deg nên độ lệch = phương vị + 90, chuẩn hóa [-180,180]
     rồi clamp. Cổng trái -> âm, cổng phải -> dương. */
  function faceAngleFor(dx, dy) {
    var dev = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    while (dev > 180) dev -= 360;
    while (dev < -180) dev += 360;
    if (dev > FACE_MAX_DEG) dev = FACE_MAX_DEG;
    if (dev < -FACE_MAX_DEG) dev = -FACE_MAX_DEG;
    return dev;
  }
  /* Áp góc lên .rnv-face (lớp riêng dưới #runner để không đè animation
     phóng WAAPI, trong .rnv-runner-in để không đè nhịp bob/ca-run).
     Ghi dataset.faceDeg để harness đọc số chính xác bên cạnh ma trận
     transform tính được. */
  function setFace(dev, ms) {
    var face = $('#runnerFace'); if (!face) return;
    var from = (typeof face._dev === 'number') ? face._dev : 0;
    face._dev = dev;
    face.setAttribute('data-face-deg', String(Math.round(dev * 10) / 10));
    try {
      if (face.animate && !reducedMotion() && ms > 0) {
        face.animate([
          { transform: 'rotate(' + from + 'deg)' },
          { transform: 'rotate(' + dev + 'deg)' }
        ], { duration: ms, easing: 'ease-out', fill: 'forwards' });
      } else {
        face.style.transform = 'rotate(' + dev + 'deg)';
      }
    } catch (e) { try { face.style.transform = 'rotate(' + dev + 'deg)'; } catch (e2) {} }
  }
  function resetFace() {
    var face = $('#runnerFace'); if (!face) return;
    try { if (face.getAnimations) face.getAnimations().forEach(function (a) { a.cancel(); }); } catch (e) {}
    face.style.transform = 'rotate(0deg)';
    face._dev = 0;
    face.setAttribute('data-face-deg', '0');
    setHeadTurn(0);
  }

  /* ===== Đợt 6 Nhánh N: MẶT QUAY VÀO ĐÁP ÁN (đầu quay riêng) =====
     Prep đợt 6 (fullbody.js/css, KHÔNG sửa ở đây): đầu + phụ kiện đầu của
     GBODY gói trong <g class="fb-headturn">, quay quanh cổ (100,100) theo
     2 biến CSS trên .fb-wrap: --fbht (độ, kèm 'deg') + --fbhtn (số độ).
     Hàm này CHỈ đặt 2 biến đó + ghi data-head-deg lên #runnerFace cho
     harness đọc số (đo thật vẫn bằng ma trận computed của .fb-headturn).
     Góc thân .rnv-face của đợt 4/5 (setFace) giữ nguyên, không đụng.
     reduced-motion: CSS .fb-headturn đã tắt transition -> đặt biến là
     tới ngay giá trị cuối, không cần nhánh riêng. */
  var HEAD_MAX_DEG = 40; /* clamp cứng của đầu */
  var headDegCur = 0;    /* góc đầu hiện tại (để trả dần về 0 khi hết cổng) */
  function clampHead(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
  function setHeadTurn(deg) {
    var face = $('#runnerFace'); if (!face) return;
    if (typeof deg !== 'number' || !isFinite(deg)) deg = 0;
    deg = clampHead(deg, -HEAD_MAX_DEG, HEAD_MAX_DEG);
    headDegCur = deg;
    face.setAttribute('data-head-deg', String(Math.round(deg * 10) / 10));
    var wrap = face.querySelector('.fb-wrap');
    if (!wrap) return; /* fallback emoji/avatar cũ: bỏ qua êm */
    try {
      wrap.style.setProperty('--fbht', deg + 'deg');
      wrap.style.setProperty('--fbhtn', String(deg));
    } catch (e) {}
  }
  /* dx (px) từ tâm runner tới tâm CỔNG GẦN NHẤT phía trước (cổng còn ở
     trên runner, theo bounding rect; khoảng cách Euclid). null = không
     có cổng nào phía trước. */
  function nearestGateDx() {
    var runner = $('#runner'); if (!runner) return null;
    var gates = $$('#gateBox .rnv-gate'); if (!gates.length) return null;
    var rr = runner.getBoundingClientRect();
    var rcx = rr.left + rr.width / 2, rcy = rr.top + rr.height / 2;
    var best = null, bestD = Infinity;
    gates.forEach(function (g) {
      var gr = g.getBoundingClientRect(); if (!gr.width) return;
      var cx = gr.left + gr.width / 2, cy = gr.top + gr.height / 2;
      if (cy > rcy) return; /* cổng đã qua khỏi runner: không tính */
      var d2 = (cx - rcx) * (cx - rcx) + (cy - rcy) * (cy - rcy);
      if (d2 < bestD) { bestD = d2; best = cx - rcx; }
    });
    return best;
  }
  /* Góc đầu ở nhịp CHẠY THƯỜNG: dõi cổng gần nhất, hệ số 0.10, clamp ±12. */
  function normalHeadDeg() {
    var dx = nearestGateDx();
    if (dx === null) return 0;
    return clampHead(dx * 0.10, -12, 12);
  }
  /* Cập nhật mỗi tick trong loop() sẵn có (chỉ khi KHÔNG resolving —
     lúc dash/vỡ, góc dash phải giữ nguyên): có cổng -> dõi theo cổng
     gần nhất; không cổng -> trả DẦN về 0. */
  function trackHeadNormal() {
    var dx = nearestGateDx();
    if (dx === null) {
      if (Math.abs(headDegCur) < 0.2) { if (headDegCur !== 0) setHeadTurn(0); return; }
      setHeadTurn(headDegCur * 0.8);
      return;
    }
    setHeadTurn(clampHead(dx * 0.10, -12, 12));
  }
  /* Góc đầu khi DASH tới cổng được chạm: hệ số 0.30 theo dx của CHÍNH
     cổng đó, clamp ±40; cổng lệch rõ (|dx| > 30) mà góc chưa tới 28 thì
     nâng lên ±28 cho mặt quay RÕ. */
  function headTurnForDash(dx) {
    var d = clampHead(dx * 0.30, -HEAD_MAX_DEG, HEAD_MAX_DEG);
    if (Math.abs(d) < 28 && Math.abs(dx) > 30) d = dx > 0 ? 28 : -28;
    return d;
  }

  function resetRunner() {
    var r = $('#runner'); if (!r) return;
    try { if (r.getAnimations) r.getAnimations().forEach(function (a) { a.cancel(); }); } catch (e) {}
    r.style.transform = '';
    resetFace();
  }
  /* Mảnh DOM vỡ bay ra từ tâm cổng rồi tự biến mất (dự phòng/đi kèm GFX). */
  function spawnShards(gateEl) {
    var stage = $('#stage'); if (!stage || !gateEl) return;
    var sr = stage.getBoundingClientRect(), gr = gateEl.getBoundingClientRect();
    var cx = gr.left - sr.left + gr.width / 2, cy = gr.top - sr.top + gr.height / 2;
    var cols = ['#ffd84e', '#ff7a45', '#22d3ee', '#ffffff', '#7c5cff'];
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span');
      s.className = 'rnv-shard';
      s.style.left = cx + 'px'; s.style.top = cy + 'px';
      s.style.background = cols[i % cols.length];
      stage.appendChild(s);
      (function (el, k) {
        var ang = (Math.PI * 2 * k) / 8 + Math.random() * 0.5;
        var d = 34 + Math.random() * 30;
        try {
          if (el.animate) el.animate([
            { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
            { transform: 'translate(' + (Math.cos(ang) * d - 5) + 'px,' + (Math.sin(ang) * d - 5) + 'px) rotate(' + (120 + k * 40) + 'deg)', opacity: 0 }
          ], { duration: 430, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' });
        } catch (e) {}
        setTimeout(function () { el.remove(); }, 460);
      })(s, i);
    }
  }
  /* CHẠM ĐÁP ÁN: khoá chạm thêm (resolving), nhân vật phóng tới cổng
     (~300ms WAAPI) -> tung skill phá vỡ cổng (GGEAR.attackFx nếu có,
     fallback GFX.skill('beam') / GFX.burst + mảnh DOM) -> sau nhịp vỡ
     ~450ms mới chốt kết quả như resolveGate cũ. */
  function answerGate(idx, gateEl) {
    if (!playing || resolving || !cur) return;
    resolving = true;
    $$('#gateBox .rnv-gate').forEach(function (g) { g.disabled = true; });
    var ci = correctIdx(cur);
    var right = curOpts[idx] === cur.choices[ci];
    var runner = $('#runner');
    var rm = reducedMotion();
    var dashMs = rm ? 40 : 300, breakMs = rm ? 60 : 450;
    var dash = Promise.resolve();
    if (runner && gateEl && runner.animate && !rm) {
      var rr = runner.getBoundingClientRect(), gr = gateEl.getBoundingClientRect();
      var dx = (gr.left + gr.width / 2) - (rr.left + rr.width / 2);
      var dy = (gr.top + gr.height / 2) - (rr.top + rr.height / 2);
      /* Nhánh F: mặt + thân quay/nghiêng về phía cổng được chạm trong
         suốt cú phóng, giữ nguyên tới khi cổng vỡ (settleGate ->
         resetRunner -> resetFace mới trả về hướng lên). */
      setFace(faceAngleFor(dx, dy), dashMs);
      /* Đợt 6 N: ĐẦU quay rõ vào chính cổng được chạm (thêm vào góc thân). */
      setHeadTurn(headTurnForDash(dx));
      try {
        dash = runner.animate([
          { transform: 'translate(0px,0px) scale(1)' },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1.18)' }
        ], { duration: dashMs, easing: 'cubic-bezier(.3,1.3,.5,1)', fill: 'forwards' }).finished.catch(function () {});
      } catch (e) { dash = wait(dashMs); }
    } else {
      /* reduced-motion / không có WAAPI: vẫn quay mặt về cổng (áp tĩnh
         ngay, không chuyển động) để ý nghĩa hướng mặt không mất. */
      if (runner && gateEl) {
        try {
          var rr2 = runner.getBoundingClientRect(), gr2 = gateEl.getBoundingClientRect();
          var dx2 = (gr2.left + gr2.width / 2) - (rr2.left + rr2.width / 2);
          setFace(faceAngleFor(dx2,
                               (gr2.top + gr2.height / 2) - (rr2.top + rr2.height / 2)), 0);
          /* Đợt 6 N: reduced-motion vẫn quay đầu vào cổng (áp tĩnh ngay). */
          setHeadTurn(headTurnForDash(dx2));
        } catch (e) {}
      }
      dash = wait(dashMs);
    }
    dash.then(function () {
      if (!playing) return;
      gateEl.classList.add('rnv-broken');
      var fxDone;
      if (window.GGEAR && typeof window.GGEAR.attackFx === 'function') {
        /* gear.js do nhánh khác sở hữu — chỉ gọi phòng thủ khi tồn tại. */
        try { fxDone = Promise.resolve(window.GGEAR.attackFx(runner, gateEl)); }
        catch (e) { fxDone = Promise.reject(e); }
        fxDone = fxDone.catch(function () {
          if (window.GFX && typeof GFX.burst === 'function') GFX.burst(gateEl);
        });
      } else if (window.GFX && typeof GFX.skill === 'function') {
        try { fxDone = Promise.resolve(GFX.skill('beam', runner, gateEl)); } catch (e) { fxDone = Promise.resolve(); }
      } else if (window.GFX && typeof GFX.burst === 'function') {
        try { GFX.burst(gateEl); } catch (e) {}
        fxDone = Promise.resolve();
      } else { fxDone = Promise.resolve(); }
      spawnShards(gateEl);
      return Promise.race([fxDone, wait(breakMs + 250)]).then(function () { return wait(rm ? 0 : Math.max(0, breakMs - 200)); });
    }).then(function () {
      if (!playing) return;
      settleGate(right);
    }).catch(function () { if (playing) settleGate(right); });
  }
  /* Cổng chạm đáy mà chưa trả lời -> tính như trả lời sai (luật cũ). */
  function resolveGate() {
    resolving = true;
    settleGate(false);
  }
  function settleGate(right) {
    var ci = correctIdx(cur);
    $$('#gateBox .rnv-gate').forEach(function (g, i) { g.classList.add(curOpts[i] === cur.choices[ci] ? 'ok' : 'bad'); });
    resetRunner();
    /* Đợt 6 N: cổng vỡ xong (hook settle sẵn có) -> đầu rời góc dash, trở
       về giá trị chạy thường tính lại theo cổng gần nhất (hoặc 0). */
    setHeadTurn(normalHeadDeg());
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
  /* Việc H: ĐÃ BỎ hẳn cơ chế làn — không còn nút Trái/Phải, vuốt chuyển
     làn hay phím mũi tên. Trả lời = chạm trực tiếp vào cổng (xem
     answerGate). bindControls chỉ còn Khiên / Chậm / Dừng. */
  function bindControls() {
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
  }

  function end() {
    if (!playing && $('#play').classList.contains('mx-hid')) return;
    /* Kết liễu (đợt 3): chỉ khi dừng tự nguyện mà vẫn còn tim; hết tim = thua, không chạy. */
    /* Kết liễu BOSS (đợt 4, gắn theo mẫu nhánh B): chỉ khi dừng tự nguyện mà vẫn còn tim; hết tim = thua, không chạy. Chế độ chưa có boss -> playBoss tự lấy GBOSS.next() không trùng. */
    if (lives > 0 && window.GFIN) { try { if (typeof GFIN.playBoss === 'function') GFIN.playBoss({ fromEl: $('#runner'), toEl: null, dmg: Math.floor(score) }); else GFIN.play({ fromEl: $('#runner'), toEl: null, dmg: Math.floor(score) }); } catch (e) {} }
    playing = false; if (raf) cancelAnimationFrame(raf);
    $('#play').classList.add('mx-hid');
    submitScore(score, startT);
    sfx(lives > 0 ? 'click' : 'lose');
    if (lives <= 0) trend('thua');
    renderResult();
  }
  /* Chỉ DỰNG HTML màn kết quả từ state hiện tại (submitScore/sfx/trend nằm ở
     end(), KHÔNG chạy lại ở đây); gọi lại khi tên người chơi resolve muộn để
     tiêu đề dùng tên mới nhất. */
  function renderResult() {
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">🏅</div>' +
      '<h1>' + esc(callName()) + ' chạy được ' + Math.floor(dist) + ' m!</h1>' +
      '<p class="mx-mut">' + (lives <= 0 ? 'Hết tim rồi — nhưng quãng đường này rất đáng nể. Chạy thêm vòng nữa nhé!' : 'Dừng nghỉ đúng lúc cũng là chiến thuật hay.') + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + Math.floor(score) + ' điểm</span><span class="mx-pill">🚪 ' + gates + ' cổng</span><span class="mx-pill">🔥 Chuỗi cao nhất ' + bestCombo + '</span><span class="mx-pill">' + esc(st.lv) + ' · ' + DIFF[st.diff].n + '</span></div>' +
      '<button class="mx-btn" id="btnAgain" type="button">Chạy thêm vòng nữa ↻</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenu(); });
  }

  bindUserEvent();
  setupRunnerFace();
  paintRunnerPlate();
  /* ĐỢT 6 (vá tích hợp coordinator): runner vẽ lần đầu có thể TRƯỚC khi
     GGEAR nạp xong tiến độ — lúc đó state() rơi về mặc định cho mọi món
     khoá cấp (trang phục/mũ/vũ khí/giáp), và không có sự kiện nào vẽ lại.
     Nạp xong tiến độ thì vẽ lại đúng 1 lần cho khớp đồ đang chọn. */
  try { if (window.GGEAR && typeof GGEAR.ready === 'function') GGEAR.ready().then(function () { setupRunnerFace(); }); } catch (e) {}
  bindFaceEvent();
  loadUser().then(function () { buildMenu(); bindControls(); });
})();
