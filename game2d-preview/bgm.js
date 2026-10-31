// bgm.js — Nhạc nền theo khu vực cho bản mẫu 2D (nhạc tự sản xuất dạng vòng lặp, placeholder).
// Một phần tử audio duy nhất; chuyển bản đồ = mờ dần rồi đổi bản. Tắt→bật khôi phục ĐÚNG bản
// đang ở khu vực hiện tại với ĐÚNG âm lượng đã lưu (rút kinh nghiệm lỗi tắt/bật mất tiếng của web).
(function () {
  'use strict';
  var el = new Audio();
  el.loop = true; el.preload = 'auto';
  var curTrack = null;
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
  function play(id) {
    if (!id) return;
    if (id === curTrack) {
      if (on && el.paused) { el.volume = 0; el.play().catch(function () {}); rampToVol(); }
      return;
    }
    curTrack = id;
    ramp(0, function () {
      el.src = 'bgm/' + id + '.mp3';
      if (on) { el.play().catch(function () {}); rampToVol(); }
      else el.pause();
    });
  }
  function setEnabled(v) {
    on = !!v;
    localStorage.setItem('b2d_bgm_on', on ? '1' : '0');
    if (!on) { ramp(0, function () { el.pause(); }); }
    else if (curTrack) {
      if (!el.src) el.src = 'bgm/' + curTrack + '.mp3';
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
    play: play, setEnabled: setEnabled, setVolume: setVolume,
    isOn: function () { return on; }, volume: function () { return vol; },
    current: function () { return curTrack; }
  };
})();
