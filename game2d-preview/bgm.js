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
(function () {
  'use strict';
  var el = new Audio();
  el.loop = true; el.preload = 'auto';
  var curTrack = null;      // track của BẢN ĐỒ hiện tại — BGM.current() trả cái này (hợp đồng harness cũ)
  var moodName = null;      // Lane V: mood truyện đang phủ ('airport','tense',...) — null = không phủ
  var effTrack = null;      // track THẬT đang nạp trong phần tử audio (mood nếu có, không thì track bản đồ)
  var on = localStorage.getItem('b2d_bgm_on') !== '0';
  var vol = parseFloat(localStorage.getItem('b2d_bgm_vol') || '0.45');
  if (isNaN(vol)) vol = 0.45;
  var timer = null;

  /* ---- Lane AF: định tuyến Web Audio (gain node mới là núm âm lượng THẬT) ----
     outLevel = mức ra loa hiện tại (vai trò cũ của el.volume). setOut() là CHỖ DUY
     NHẤT ghi mức ra: đã định tuyến → ghi gain node; chưa/không định tuyến được →
     ghi el.volume như cũ. Đồ thị được dựng LƯỜI ở thao tác chạm đầu tiên (đúng luật
     autoplay của iOS/Chrome: AudioContext phải sinh/resume trong cử chỉ người dùng;
     game luôn bắt đầu bằng chạm nút Bắt đầu) và resume lại ở mọi lần play + mỗi chạm
     sau đó, phòng context bị treo (suspended) khi ẩn/hiện tab. */
  var actx = null, srcNode = null, gainNode = null, routed = false, routeFailed = false;
  var outLevel = 1;   // khớp giá trị mặc định của el.volume lúc mới tạo
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function setOut(v) {
    outLevel = clamp01(v);
    if (routed && gainNode) { try { gainNode.gain.value = outLevel; } catch (e) {} }
    else { el.volume = outLevel; }
  }
  function ensureGraph() {
    if (routed) return true;
    if (routeFailed) return false;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { routeFailed = true; return false; }
      actx = new AC();
      srcNode = actx.createMediaElementSource(el);
      gainNode = actx.createGain();
      gainNode.gain.value = outLevel;   // nạp mức hiện tại TRƯỚC khi nối ra loa — không phọt tiếng
      srcNode.connect(gainNode);
      gainNode.connect(actx.destination);
      el.volume = 1;   // ghim: từ nay gain node quyết định toàn bộ mức ra
      routed = true;
      return true;
    } catch (e) { routeFailed = true; actx = null; srcNode = null; gainNode = null; return false; }
  }
  function resumeCtx() {
    if (!ensureGraph()) return;
    if (actx && actx.state === 'suspended') { var p = actx.resume(); if (p && p.catch) p.catch(function () {}); }
  }
  ['pointerdown', 'touchend', 'click'].forEach(function (evName) {
    document.addEventListener(evName, resumeCtx, true);
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) resumeCtx(); });

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
    if (duckCount === 1 && on && !el.paused) rampToVol(null, 7);   // 7×45ms ≈ 0,3s
  }
  function duckEnd() {
    if (duckCount > 0) duckCount--;
    if (duckCount === 0 && on && !el.paused) rampToVol(null, 7);
  }
  function setDuckEnabled(v) {
    duckOn = !!v;
    localStorage.setItem('b2d_bgm_duck', duckOn ? '1' : '0');
    if (on && !el.paused) rampToVol(null, 7);   // tắt giữa lúc duck → khôi phục ngay; bật giữa clip → hạ ngay
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
  function applyTarget() {   // nạp/phát track hiệu dụng (mood phủ > bản đồ), fade như cũ
    var t = effId();
    if (!t) return;
    if (t === effTrack) {
      if (on && el.paused && el.src) { setOut(0); resumeCtx(); el.play().catch(function () {}); rampToVol(); }
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
        el.src = 'bgm/' + t + '.mp3';
        if (on) { resumeCtx(); el.play().catch(function () {}); rampToVol(); }
        else el.pause();
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
    if (!on) { ramp(0, function () { el.pause(); }); }
    else if (effId()) {
      if (!el.src) el.src = 'bgm/' + effId() + '.mp3';
      setOut(0);
      resumeCtx();
      el.play().catch(function () {});
      rampToVol();
    }
  }
  function setVolume(v) {
    vol = Math.max(0, Math.min(1, v));
    localStorage.setItem('b2d_bgm_vol', String(vol));
    if (on && !el.paused) setOut(effVol());   // đang duck thì theo giá trị mới × hệ số
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
    // (gain node khi đã định tuyến Web Audio; el.volume khi rơi về cơ chế cũ).
    outputLevel: function () { return (routed && gainNode) ? gainNode.gain.value : el.volume; },
    gainValue: function () { return (routed && gainNode) ? gainNode.gain.value : null; },
    usingWebAudio: function () { return routed; },
    ctxState: function () { return actx ? actx.state : null; },
    isOn: function () { return on; }, volume: function () { return vol; },
    current: function () { return curTrack; },
    moodCurrent: function () { return moodName; },
    effective: function () { return effTrack; }
  };
})();
