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
    var from = el.volume, steps = stepsN || 10, i = 0;
    timer = setInterval(function () {
      i++;
      var t = getT();
      el.volume = Math.max(0, Math.min(1, from + (t - from) * (i / steps)));
      if (i >= steps) { clearInterval(timer); el.volume = Math.max(0, Math.min(1, t)); var d = pendingDone; pendingDone = null; if (d) d(); }
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
  // Gắn ducking vào MỘT phần tử audio nguồn tiếng: play → giữ duck; ended/pause/error → nhả.
  // Cờ held theo từng phần tử chống đếm trùng (play+playing, nghe lại, đổi src giữa chừng);
  // nhả ở cả 'error' nên clip lỗi tải không bao giờ kẹt duck vĩnh viễn.
  function attachDuck(a) {
    if (!a || a.__duckAttached) return a;
    a.__duckAttached = true;
    var held = false;
    function acq() { if (!held) { held = true; duckStart(); } }
    function rel() { if (held) { held = false; duckEnd(); } }
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
      if (on && el.paused && el.src) { el.volume = 0; el.play().catch(function () {}); rampToVol(); }
      return;
    }
    effTrack = t;
    clearInterval(fadeTimer);
    var from = el.volume, i = 0;
    fadeTimer = setInterval(function () {
      i++;
      el.volume = Math.max(0, from * (1 - i / 10));
      if (i >= 10) {
        clearInterval(fadeTimer); fadeTimer = null;
        el.src = 'bgm/' + t + '.mp3';
        if (on) { el.play().catch(function () {}); rampToVol(); }
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
      el.volume = 0;
      el.play().catch(function () {});
      rampToVol();
    }
  }
  function setVolume(v) {
    vol = Math.max(0, Math.min(1, v));
    localStorage.setItem('b2d_bgm_vol', String(vol));
    if (on && !el.paused) el.volume = effVol();   // đang duck thì theo giá trị mới × hệ số
  }
  window.BGM = {
    play: play, mood: mood, setEnabled: setEnabled, setVolume: setVolume,
    duckStart: duckStart, duckEnd: duckEnd, attachDuck: attachDuck,
    setDuckEnabled: setDuckEnabled,
    duckEnabled: function () { return duckOn; },
    duckCount: function () { return duckCount; },
    effVolume: function () { return effVol(); },
    isOn: function () { return on; }, volume: function () { return vol; },
    current: function () { return curTrack; },
    moodCurrent: function () { return moodName; },
    effective: function () { return effTrack; }
  };
})();
