// bgm.js — Nhạc nền cho game 2D. Từ Lane V (01/11): nhạc THẬT của producer (họ melodic
// emo-trap, nguồn Pixabay/OpenTracks — bảng kê đầy đủ ở KHUNG-GAME §7.2c), gán theo CỤM
// cảm xúc cho 30 mapId + lớp MOOD phủ theo cảnh truyện qua BGM.mood(name|null).
// Một phần tử audio duy nhất; chuyển bản đồ = mờ dần rồi đổi bản. Tắt→bật khôi phục ĐÚNG bản
// đang ở khu vực hiện tại với ĐÚNG âm lượng đã lưu (rút kinh nghiệm lỗi tắt/bật mất tiếng của web).
// Lane W (01/11): DUCKING — khi có giọng đọc (thoại/hướng dẫn/câu nghe) nhạc tự hạ xuống
// 25% mức người dùng đang đặt, hết tiếng thì khôi phục, ramp ~0,3s. Cơ chế trung tâm ở đây:
// âm lượng hiệu dụng = vol × hệ số duck; đích của ramp (Lane K) đọc hiệu dụng MỖI tick nên
// duck/kéo trượt/đổi track không bao giờ giằng nhau. Nguồn tiếng gắn qua BGM.attachDuck(el)
// hoặc BGM.duckStart()/duckEnd() (đếm tham chiếu: nguồn cuối cùng dừng mới khôi phục).
// Lane AF (01/11): iPHONE VẪN KHÔNG DUCK — gốc rễ: Lane W chỉnh thuộc tính .volume của
// phần tử <audio>, mà tài liệu chính thức của Apple (Safari HTML5 Audio/Video Guide,
// Device-Specific Considerations) ghi rõ trên iOS "the volume property is not settable
// in JavaScript. Reading the volume property always returns 1" — âm lượng iOS do PHẦN
// CỨNG quyết, gán .volume = thao tác rỗng (trên máy tính Chrome tôn trọng nên harness
// đo 0,6→0,15 vẫn PASS trong khi máy thật không hề nhỏ đi; cùng họ lỗi 30/10). Vá tận
// gốc: nhạc được ĐỊNH TUYẾN QUA WEB AUDIO (MediaElementAudioSourceNode → GainNode →
// destination) — gain node là đường chỉnh âm lượng duy nhất iOS tôn trọng. Mọi ramp/
// fade/kéo trượt từ nay ghi vào gain node qua setOut(); .volume của phần tử bị ghim = 1
// khi đã định tuyến. Không có Web Audio (trình duyệt quá cũ) thì tự rơi về cơ chế
// .volume cũ. Thêm lớp bảo hiểm thứ hai: duck còn được giữ bởi BUS GIỌNG NÓI trung tâm
// (VOICE_BUS.claim → BGM.duckBusStart, nhả sàn → duckBusEnd) để không đường phát tiếng
// nào quên duck được nữa; attachDuck theo phần tử vẫn giữ nguyên.
// Lane AG (01/11): iPHONE MẤT LUÔN NHẠC sau bản AF — chẩn đoán hai lớp, đều có bằng chứng:
// (1) CORS LÀ KẺ GIẾT CHÍNH: bản preview chạy ở origin rawcdn.githack.com NHƯNG file
// nhạc bị githack REDIRECT sang raw.githubusercontent.com (curl xác minh: 1 redirect,
// đầu cuối có Access-Control-Allow-Origin: *). Phần tử nhạc KHÔNG đặt crossOrigin →
// media bị "tainted" → theo spec HTML, MediaElementAudioSourceNode cho ra TOÀN SỐ 0
// (câm tuyệt đối) dù AudioContext 'running'. Harness local cùng-origin nên không bao
// giờ tái hiện. Thuốc: el.crossOrigin = 'anonymous' TRƯỚC mọi lần gán src.
// (2) ĐỒ THỊ SINH NGOÀI CỬ CHỈ: ensureGraph() trước đây chỉ tới được qua resumeCtx(),
// mà applyTarget() (timer fade/tự phát theo mood khi nạp bản lưu) và setEnabled() đều
// gọi resumeCtx() NGOÀI stack cử chỉ chạm → trên iOS, AudioContext sinh ra ngoài cử
// chỉ có thể kẹt 'suspended'/'interrupted' và NUỐT toàn bộ tiếng đã định tuyến — và
// code cũ không có bất kỳ đường thoát nào (createMediaElementSource là một chiều).
// THIẾT KẾ LANE AG — "KHÔNG BAO GIỜ MẤT NHẠC":
//  • Đồ thị CHỈ sinh đồng bộ bên trong handler cử chỉ chạm thật (pointerdown/touchend/
//    click, capture) + resume đồng bộ ngay trong cùng stack; các đường gọi ngoài cử
//    chỉ (applyTarget/setEnabled/visibilitychange) TUYỆT ĐỐI không sinh đồ thị, chỉ
//    resume nếu đồ thị đã có. Chưa có đồ thị = nhạc phát THẲNG qua phần tử (an toàn).
//  • Watchdog tự chữa (1s/nhịp): chen AnalyserNode vào đồ thị để ĐO MỨC RA THẬT.
//    Track đang phát mà ctx không 'running' hoặc mức đo ≈ 0 liên tục 3 nhịp → thử
//    resume; vẫn chết → TỰ RƠI VỀ PHÁT THẲNG bằng một phần tử audio DỰ PHÒNG SẠCH
//    (chưa từng bị createMediaElementSource — phần tử cũ không gỡ định tuyến được).
//    Ở chế độ rơi về, duck hy sinh qua cơ chế .volume cũ — ưu tiên tuyệt đối: CÓ NHẠC.
//  • Mọi trạng thái phơi ra window.__bgmDiag (+ BGM.diag()) để harness đọc: mode,
//    ctxState, ai sinh đồ thị, nhịp câm, lý do rơi về, nhật ký watchdog.
(function () {
  'use strict';
  var el = new Audio();
  el.crossOrigin = 'anonymous';   // Lane AG: BẮT BUỘC trước mọi gán src — không có dòng này, file nhạc cross-origin (githack→githubusercontent) làm MediaElementSource câm tuyệt đối
  el.loop = true; el.preload = 'auto';
  var elD = null;           // Lane AG: phần tử DỰ PHÒNG phát thẳng khi rơi về — không bao giờ bị định tuyến
  var curTrack = null;      // track của BẢN ĐỒ hiện tại — BGM.current() trả cái này (hợp đồng harness cũ)
  var moodName = null;      // Lane V: mood truyện đang phủ ('airport','tense',...) — null = không phủ
  var effTrack = null;      // track THẬT đang nạp trong phần tử audio (mood nếu có, không thì track bản đồ)
  var on = localStorage.getItem('b2d_bgm_on') !== '0';
  var vol = parseFloat(localStorage.getItem('b2d_bgm_vol') || '0.45');
  if (isNaN(vol)) vol = 0.45;
  var timer = null;

  /* ---- Lane AF + AG: định tuyến Web Audio (gain node mới là núm âm lượng THẬT) ----
     outLevel = mức ra loa hiện tại (vai trò cũ của el.volume). setOut() là CHỖ DUY
     NHẤT ghi mức ra: mode 'routed' → ghi gain node; 'direct'/'fallback' → ghi
     .volume của phần tử đang hoạt động. */
  var actx = null, srcNode = null, gainNode = null, anlNode = null, routed = false, routeFailed = false;
  var mode = 'direct';      // Lane AG: 'direct' (phát thẳng, chưa có đồ thị) | 'routed' (qua gain) | 'fallback' (đồ thị chết → phát thẳng bằng elD)
  var outLevel = 1;         // khớp giá trị mặc định của el.volume lúc mới tạo
  var diag = {
    mode: 'direct', ctxState: null, graphBornInGesture: false, graphBornAt: 0,
    lastGestureAt: 0, silentTicks: 0, fallbackReason: null, fallbackPendingPlay: false,
    watchdog: []
  };
  window.__bgmDiag = diag;
  function wlog(msg) {
    diag.watchdog.push(new Date().toISOString().slice(11, 19) + ' ' + msg);
    if (diag.watchdog.length > 12) diag.watchdog.shift();
  }
  function activeEl() { return mode === 'fallback' ? (elD || el) : el; }
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function setOut(v) {
    outLevel = clamp01(v);
    if (mode === 'routed' && gainNode) { try { gainNode.gain.value = outLevel; } catch (e) {} }
    else { activeEl().volume = outLevel; }
  }
  function measureOut() {
    // Lane AG: mức ra THẬT đo ở đầu ra đồ thị (sau gain). null khi chưa định tuyến.
    if (mode !== 'routed' || !anlNode || !actx) return null;
    try {
      var buf = new Uint8Array(anlNode.fftSize), sum = 0;
      anlNode.getByteTimeDomainData(buf);
      for (var i = 0; i < buf.length; i++) { var d = (buf[i] - 128) / 128; sum += d * d; }
      return Math.sqrt(sum / buf.length);
    } catch (e) { return null; }
  }
  function ensureGraph(inGesture) {
    if (routed) return true;
    if (routeFailed || mode === 'fallback') return false;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { routeFailed = true; wlog('no-web-audio → direct'); return false; }
      actx = new AC();
      srcNode = actx.createMediaElementSource(el);
      gainNode = actx.createGain();
      gainNode.gain.value = outLevel;   // nạp mức hiện tại TRƯỚC khi nối ra loa — không phọt tiếng
      anlNode = actx.createAnalyser(); anlNode.fftSize = 2048;
      srcNode.connect(gainNode);
      gainNode.connect(anlNode);
      anlNode.connect(actx.destination);
      el.volume = 1;   // ghim: từ nay gain node quyết định toàn bộ mức ra
      routed = true; mode = 'routed'; diag.mode = 'routed';
      diag.graphBornInGesture = !!inGesture; diag.graphBornAt = Date.now();
      diag.ctxState = actx.state;
      try { actx.onstatechange = function () { diag.ctxState = actx.state; }; } catch (e) {}
      wlog('graph-born gesture=' + !!inGesture + ' state=' + actx.state);
      return true;
    } catch (e) { routeFailed = true; actx = null; srcNode = null; gainNode = null; anlNode = null; wlog('graph-failed: ' + (e && e.message || e)); return false; }
  }
  function tryResume() {
    if (actx && actx.state !== 'running') {
      try { var p = actx.resume(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    }
    if (actx) diag.ctxState = actx.state;
  }
  /* Lane AG: mở khóa ĐỒNG BỘ trong stack cử chỉ chạm — sinh đồ thị (nếu chưa có) +
     resume + phát nốt nhạc đang chờ, tất cả trong cùng call stack của cử chỉ thật.
     Đây là đường DUY NHẤT được phép sinh đồ thị. */
  function unlockGesture() {
    diag.lastGestureAt = Date.now();
    if (mode === 'fallback') {
      if (diag.fallbackPendingPlay) {
        diag.fallbackPendingPlay = false;
        tryPlayActive('gesture-fallback');
      }
      return;
    }
    if (!routed && !routeFailed) { if (ensureGraph(true)) tryResume(); }
    else tryResume();
    if (on && effTrack && activeEl().paused) tryPlayActive('gesture');
  }
  ['pointerdown', 'touchend', 'click'].forEach(function (evName) {
    document.addEventListener(evName, unlockGesture, true);
  });
  function tryPlayActive(why) {
    var a = activeEl();
    if (!a.src && effTrack) a.src = (window.GT_MEDIA || '') + 'bgm/' + effTrack + '.mp3';
    var p = a.play();
    if (p && p.catch) p.catch(function () { wlog('play-rejected(' + why + ')'); });
  }
  /* Các đường gọi NGOÀI cử chỉ (applyTarget/setEnabled/visibilitychange): chỉ resume
     nếu đồ thị ĐÃ có — tuyệt đối không sinh đồ thị ở đây (bài học Lane AG mục 2). */
  function resumeCtx() {
    if (actx) { tryResume(); }
    if (actx) diag.ctxState = actx.state;
  }
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { resumeCtx(); if (on && effTrack && mode !== 'routed' && activeEl().paused) tryPlayActive('visible'); }
  });

  /* ---- Lane AG: rơi về phát thẳng (tự chữa khi đồ thị chết/câm) ---- */
  function enterFallback(reason) {
    if (mode === 'fallback') return;
    mode = 'fallback'; diag.mode = 'fallback'; diag.fallbackReason = reason;
    diag.silentTicks = 0;
    wlog('FALLBACK: ' + reason);
    try { el.pause(); } catch (e) {}
    if (!elD) { elD = new Audio(); elD.loop = true; elD.preload = 'auto'; }
    if (effTrack) {
      var want = (window.GT_MEDIA || '') + 'bgm/' + effTrack + '.mp3';
      if ((elD.getAttribute('src') || '') !== want) elD.src = want;
      try { if (isFinite(el.currentTime) && el.currentTime > 0) elD.currentTime = el.currentTime; } catch (e) {}
    }
    elD.volume = outLevel;
    if (on && effTrack) {
      var p = elD.play();
      if (p && p.catch) p.catch(function () { diag.fallbackPendingPlay = true; wlog('fallback-play-rejected → chờ cử chỉ'); });
    }
  }
  /* Watchdog 1s: track ĐANG phát mà đầu ra câm (ctx không running / analyser ≈ 0)
     3 nhịp liên tục → thử resume; vẫn câm → rơi về phát thẳng. Chỉ chạy khi mode
     'routed' — mode 'direct' phát thẳng vốn đã an toàn, 'fallback' là đích cuối. */
  setInterval(function () {
    diag.ctxState = actx ? actx.state : null;
    if (mode !== 'routed' || !on || !effTrack) { diag.silentTicks = 0; return; }
    if (el.paused || el.ended) { diag.silentTicks = 0; return; }   // chưa phát (autoplay bị chặn) — cử chỉ sẽ mở, không phải lỗi đồ thị
    var dead = false, why = '';
    if (!actx || actx.state !== 'running') { dead = true; why = 'ctx-' + (actx ? actx.state : 'null'); tryResume(); }
    else {
      var m = measureOut();
      if (m !== null && m < 0.002 && el.readyState >= 3) { dead = true; why = 'output-silent'; }
    }
    if (!dead) { diag.silentTicks = 0; return; }
    diag.silentTicks++;
    wlog('silent-tick ' + diag.silentTicks + ' (' + why + ')');
    if (diag.silentTicks >= 3) enterFallback(why);
  }, 1000);

  /* ---- Lane W: ducking (tự giảm nhạc khi có giọng đọc) ---- */
  var duckOn = localStorage.getItem('b2d_bgm_duck') !== '0';   // mặc định BẬT
  var duckCount = 0;                                           // số nguồn tiếng đang giữ duck
  var DUCK_FACTOR = 0.25;                                      // hạ còn 25% mức đang đặt
  function duckFactor() { return (duckOn && duckCount > 0) ? DUCK_FACTOR : 1; }
  function effVol() { return vol * duckFactor(); }             // âm lượng hiệu dụng thật

  var pendingDone = null;   // callback hoàn tất của ramp đang chạy (vd pause khi tắt nhạc)
  function ramp(target, done, stepsN) {
    // target có thể là HÀM (đích động): fade-in luôn hướng về `vol` HIỆN TẠI, để người
    // chơi kéo thanh trượt GIỮA lúc fade thì nhạc theo đúng giá trị mới, không bị giá
    // trị cũ chụp lúc bắt đầu fade ghi đè (Lane K, kiểm chứng harness-bgm-autoplay K3).
    var getT = (typeof target === 'function') ? target : function () { return target; };
    clearInterval(timer);
    // Lane W: ramp mới thay ramp cũ thì callback của ramp cũ (pause khi tắt) phải được
    // CHẠY NGAY thay vì mất hút — nếu không, duckEnd chen vào đúng lúc tắt nhạc sẽ làm
    // nhạc không dừng lại được.
    if (pendingDone) { var pd = pendingDone; pendingDone = null; try { pd(); } catch (e) {} }
    pendingDone = done || null;
    var from = outLevel, steps = stepsN || 10, i = 0;
    timer = setInterval(function () {
      i++;
      var t = getT();
      setOut(from + (t - from) * (i / steps));
      if (i >= steps) { clearInterval(timer); setOut(t); var d = pendingDone; pendingDone = null; if (d) d(); }
    }, 45);
  }
  // Đích ramp = âm lượng HIỆU DỤNG (gồm hệ số duck) đọc lại mỗi tick: đổi track (Lane V),
  // kéo trượt giữa lúc duck, bật/tắt duck giữa chừng — tất cả hội tụ về đúng công thức.
  function rampToVol(done, stepsN) { ramp(function () { return effVol(); }, done, stepsN); }
  function duckStart() {
    duckCount++;
    if (duckCount === 1 && on && !activeEl().paused) rampToVol(null, 7);   // 7×45ms ≈ 0,3s
  }
  function duckEnd() {
    if (duckCount > 0) duckCount--;
    if (duckCount === 0 && on && !activeEl().paused) rampToVol(null, 7);
  }
  function setDuckEnabled(v) {
    duckOn = !!v;
    localStorage.setItem('b2d_bgm_duck', duckOn ? '1' : '0');
    if (on && !activeEl().paused) rampToVol(null, 7);   // tắt giữa lúc duck → khôi phục ngay; bật giữa clip → hạ ngay
  }
  /* ---- Lane AF: duck giữ bởi BUS GIỌNG NÓI (lớp bảo hiểm trung tâm) ----
     VOICE_BUS.claim() (voice.js) gọi duckBusStart — bất kỳ giọng nào giành sàn là
     nhạc duck, kể cả nếu đường tiếng đó quên attachDuck phần tử của nó. Nhả sàn
     (release/stopAll) gọi duckBusEnd. Cờ busHeld chống đếm trùng khi claim liên
     tiếp (giọng sau claim ngay khi giọng trước vừa bị dừng). Đây là GIỮ BỔ SUNG
     trên bộ đếm theo phần tử của attachDuck: nhạc chỉ hết duck khi MỌI giữ (bus +
     từng phần tử) đều nhả — xem rel() trong attachDuck. */
  var busHeld = false, busWatch = null;
  function duckBusStart() {
    if (busHeld) return;
    busHeld = true; duckStart();
    // Watchdog chống kẹt: claim giành sàn nhưng tiếng KHÔNG BAO GIỜ phát (play() bị
    // trình duyệt từ chối vì autoplay — promise bị reject mà phần tử không hề bắn
    // sự kiện ended/pause/error) thì giữ-bus không có sự kiện nào nhả. Mọi đường
    // tiếng thật đều attachDuck phần tử của mình nên giữ-bus chỉ sống một mình khi
    // phát thất bại: sau 5s mà bộ đếm vẫn đúng 1 (chỉ còn giữ-bus) → tự nhả. Giọng
    // đang phát thật luôn giữ thêm phần tử (đếm ≥ 2) nên watchdog không cắt nhầm.
    clearInterval(busWatch);
    busWatch = setInterval(function () {
      if (!busHeld) { clearInterval(busWatch); busWatch = null; return; }
      if (duckCount <= 1) { duckBusEnd(); clearInterval(busWatch); busWatch = null; }
    }, 5000);
  }
  function duckBusEnd() { if (busHeld) { busHeld = false; duckEnd(); } }
  // Gắn ducking vào MỘT phần tử audio nguồn tiếng: play → giữ duck; ended/pause/error → nhả.
  // Cờ held theo từng phần tử chống đếm trùng (play+playing, nghe lại, đổi src giữa chừng);
  // nhả ở cả 'error' nên clip lỗi tải không bao giờ kẹt duck vĩnh viễn.
  function attachDuck(a) {
    if (!a || a.__duckAttached) return a;
    a.__duckAttached = true;
    var held = false;
    function acq() { if (!held) { held = true; duckStart(); } }
    // Lane AF: một phần tử giọng dừng (ended/pause/error) thì GIỮ-BUS cũng nhả theo —
    // giọng kế tiếp giành sàn sẽ claim lại đồng bộ ngay trong cùng thao tác bấm (trước
    // khi phát), và ramp đọc đích hiệu dụng mỗi tick nên không nghe thấy nhịp chớp.
    // Giữ theo phần tử của các giọng khác (vd clip nghe người chơi chủ động mở mà
    // giọng hướng dẫn chỉ giành sàn một phần) không bị ảnh hưởng: bộ đếm chung chưa
    // về 0 thì nhạc vẫn duck.
    function rel() { if (held) { held = false; duckEnd(); } duckBusEnd(); }
    a.addEventListener('play', acq);
    a.addEventListener('ended', rel);
    a.addEventListener('pause', rel);
    a.addEventListener('error', rel);
    a.__duckRelease = rel;
    return a;
  }
  function effId() { return moodName ? 'mood-' + moodName : curTrack; }
  var fadeTimer = null;   // Lane W: timer RIÊNG cho fade đổi track. Trước đây đổi track
  // dùng chung ramp() với ramp âm lượng — duckEnd/duckStart gọi rampToVol chen vào đúng
  // lúc gỡ mood/đổi bản đồ sẽ huỷ callback đổi src, nhạc kẹt ở track cũ (harness-bgm-mood
  // M4 bắt được). Fade đổi track nay độc lập hoàn toàn với ramp âm lượng.
  function applyTarget() {   // nạp/phát track hiệu dụng (mood phủ > bản đồ), fade như cũ — Lane AG: luôn qua activeEl()
    var a = activeEl();
    var t = effId();
    if (!t) return;
    if (t === effTrack) {
      if (on && a.paused && a.src) { setOut(0); resumeCtx(); tryPlayActive('applyTarget'); rampToVol(); }
      return;
    }
    effTrack = t;
    clearInterval(fadeTimer);
    var from = outLevel, i = 0;
    fadeTimer = setInterval(function () {
      i++;
      setOut(from * (1 - i / 10));
      if (i >= 10) {
        clearInterval(fadeTimer); fadeTimer = null;
        activeEl().src = (window.GT_MEDIA || '') + 'bgm/' + t + '.mp3';
        diag.silentTicks = 0;   // track mới cần thời gian nạp — watchdog không đếm oan trong lúc chuyển bản
        if (on) { resumeCtx(); tryPlayActive('applyTarget-fade'); rampToVol(); }
        else activeEl().pause();
      }
    }, 45);
  }
  function play(id) {        // đổi bản đồ: ghi nhận track bản đồ; đang có mood thì mood vẫn phủ
    if (!id) return;
    curTrack = id;
    applyTarget();
  }
  function mood(name) {      // Lane V: BGM.mood('tense') phủ mood-tense.mp3; BGM.mood(null) về track bản đồ
    name = name || null;
    if (name === moodName) return;
    moodName = name;
    applyTarget();
  }
  function setEnabled(v) {
    on = !!v;
    localStorage.setItem('b2d_bgm_on', on ? '1' : '0');
    if (!on) { ramp(0, function () { activeEl().pause(); }); }
    else if (effId()) {
      var a = activeEl();
      if (!a.src) a.src = (window.GT_MEDIA || '') + 'bgm/' + effId() + '.mp3';
      setOut(0);
      resumeCtx();
      tryPlayActive('setEnabled');
      rampToVol();
    }
  }
  function setVolume(v) {
    vol = Math.max(0, Math.min(1, v));
    localStorage.setItem('b2d_bgm_vol', String(vol));
    if (on && !activeEl().paused) setOut(effVol());   // đang duck thì theo giá trị mới × hệ số
  }
  window.BGM = {
    play: play, mood: mood, setEnabled: setEnabled, setVolume: setVolume,
    duckStart: duckStart, duckEnd: duckEnd, attachDuck: attachDuck,
    duckBusStart: duckBusStart, duckBusEnd: duckBusEnd,
    setDuckEnabled: setDuckEnabled,
    duckEnabled: function () { return duckOn; },
    duckCount: function () { return duckCount; },
    effVolume: function () { return effVol(); },
    // Lane AF: số đo trên CẤU TRÚC THẬT cho harness/người kiểm — mức ra loa hiện tại
    // (gain node khi đã định tuyến Web Audio; .volume của phần tử đang hoạt động khi
    // phát thẳng/rơi về — Lane AG).
    outputLevel: function () { return (mode === 'routed' && gainNode) ? gainNode.gain.value : activeEl().volume; },
    gainValue: function () { return (mode === 'routed' && gainNode) ? gainNode.gain.value : null; },
    usingWebAudio: function () { return mode === 'routed'; },
    ctxState: function () { return actx ? actx.state : null; },
    // Lane AG: đo mức ra THẬT ở đầu ra đồ thị (analyser) + chẩn đoán đầy đủ cho harness.
    measureOut: measureOut,
    diag: function () { return JSON.parse(JSON.stringify(diag)); },
    isOn: function () { return on; }, volume: function () { return vol; },
    current: function () { return curTrack; },
    moodCurrent: function () { return moodName; },
    effective: function () { return effTrack; }
  };
})();

