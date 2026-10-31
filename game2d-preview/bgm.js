// bgm.js — Nhạc nền cho game 2D. Từ Lane V (01/11): nhạc THẬT của producer (họ melodic
// emo-trap, nguồn Pixabay/OpenTracks — bảng kê đầy đủ ở KHUNG-GAME §7.2c), gán theo CỤM
// cảm xúc cho 30 mapId + lớp MOOD phủ theo cảnh truyện qua BGM.mood(name|null).
// Một phần tử audio duy nhất; chuyển bản đồ = mờ dần rồi đổi bản. Tắt→bật khôi phục ĐÚNG bản
// đang ở khu vực hiện tại với ĐÚNG âm lượng đã lưu (rút kinh nghiệm lỗi tắt/bật mất tiếng của web).
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

  function ramp(target, done) {
    // target có thể là HÀM (đích động): fade-in luôn hướng về `vol` HIỆN TẠI, để người
    // chơi kéo thanh trượt GIỮA lúc fade thì nhạc theo đúng giá trị mới, không bị giá
    // trị cũ chụp lúc bắt đầu fade ghi đè (Lane K, kiểm chứng harness-bgm-autoplay K3).
    var getT = (typeof target === 'function') ? target : function () { return target; };
    clearInterval(timer);
    var from = el.volume, steps = 10, i = 0;
    timer = setInterval(function () {
      i++;
      var t = getT();
      el.volume = Math.max(0, Math.min(1, from + (t - from) * (i / steps)));
      if (i >= steps) { clearInterval(timer); el.volume = Math.max(0, Math.min(1, t)); if (done) done(); }
    }, 45);
  }
  function rampToVol(done) { ramp(function () { return vol; }, done); }
  function effId() { return moodName ? 'mood-' + moodName : curTrack; }
  function applyTarget() {   // nạp/phát track hiệu dụng (mood phủ > bản đồ), fade như cũ
    var t = effId();
    if (!t) return;
    if (t === effTrack) {
      if (on && el.paused && el.src) { el.volume = 0; el.play().catch(function () {}); rampToVol(); }
      return;
    }
    effTrack = t;
    ramp(0, function () {
      el.src = 'bgm/' + t + '.mp3';
      if (on) { el.play().catch(function () {}); rampToVol(); }
      else el.pause();
    });
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
    if (on && !el.paused) el.volume = vol;
  }
  window.BGM = {
    play: play, mood: mood, setEnabled: setEnabled, setVolume: setVolume,
    isOn: function () { return on; }, volume: function () { return vol; },
    current: function () { return curTrack; },
    moodCurrent: function () { return moodName; },
    effective: function () { return effTrack; }
  };
})();
