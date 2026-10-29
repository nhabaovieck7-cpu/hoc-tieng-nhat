// sfx.js — Tiếng skill/hiệu ứng bằng Web Audio thuần (Nhánh 4, từ bản mẫu mau-game/sfx.js)
// TUYỆT ĐỐI không phát giọng nói, không hô tên skill — chỉ tiếng nổ/sét/súng/chưởng/thắng/thua/click.
// Tôn trọng công tắc localStorage 'hn_game_snd_sfx' (đọc lại mỗi lần phát).
// AudioContext chỉ khởi tạo sau tương tác đầu tiên của người chơi (luật autoplay iPhone).
// API: window.GSFX = { hit, shoot, thunder, explosion, win, lose, click, ultra }
//      (+ bí danh tương thích bản mẫu: fire, gun, beam, combo, perfect, victory, fall, wrong, shuriken; window.sfx(name))
(function () {
  'use strict';

  var LS_SFX = 'hn_game_snd_sfx';
  var AC = null;
  var unlocked = false;
  var noiseCache = null;

  function sfxOn() {
    try { return localStorage.getItem(LS_SFX) !== '0'; } catch (e) { return true; }
  }

  function ac() {
    if (!unlocked) return null;
    if (!AC) {
      try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (AC && AC.state === 'suspended') { try { AC.resume(); } catch (e) {} }
    return AC;
  }

  // Mở khóa ở lần chạm/gõ đầu tiên (capture: chạy trước handler của nút bấm).
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () {
      if (unlocked) return;
      unlocked = true;
      ac();
    }, { passive: true, capture: true });
  });

  function noiseBuf(c, sec) {
    if (noiseCache && noiseCache.sec >= sec) return noiseCache.buf;
    var b = c.createBuffer(1, Math.ceil(c.sampleRate * sec), c.sampleRate);
    var d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseCache = { buf: b, sec: sec };
    return b;
  }

  function env(g, t, a, peak, dec) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  }

  function tone(type, f1, f2, t, dur, vol) {
    vol = vol || 0.3;
    var c = AC, o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f1, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(Math.max(1, f2), t + dur);
    env(g, t, 0.01, vol, dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function noise(t, dur, ftype, f1, f2, vol, q) {
    vol = vol || 0.4; q = q || 1;
    var c = AC, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = noiseBuf(c, dur + 0.1);
    f.type = ftype; f.Q.value = q;
    f.frequency.setValueAtTime(f1, t);
    if (f2) f.frequency.exponentialRampToValueAtTime(Math.max(10, f2), t + dur);
    env(g, t, 0.01, vol, dur);
    s.connect(f); f.connect(g); g.connect(c.destination);
    s.start(t); s.stop(t + dur + 0.1);
  }

  // Mỗi hiệu ứng nhận t = thời điểm bắt đầu (currentTime + 0.01).
  var FX = {
    // Nổ lớn (trúng đòn nặng / tuyệt chiêu kết liễu)
    explosion: function (t) {
      noise(t, 0.6, 'lowpass', 300, 3000, 0.5);
      noise(t + 0.15, 0.5, 'bandpass', 1200, 200, 0.4, 2);
      tone('sawtooth', 90, 40, t + 0.2, 0.4, 0.15);
    },
    // Sét đánh
    thunder: function (t) {
      noise(t, 0.08, 'highpass', 3000, 0, 0.6);
      noise(t + 0.05, 1.1, 'lowpass', 2500, 80, 0.6);
      tone('square', 60, 30, t + 0.05, 0.6, 0.2);
    },
    // Bắn súng (loạt đạn)
    shoot: function (t) {
      for (var i = 0; i < 7; i++) {
        noise(t + i * 0.07, 0.06, 'bandpass', 1800, 400, 0.5, 3);
        tone('square', 180, 60, t + i * 0.07, 0.05, 0.12);
      }
    },
    // Tung chưởng / tia năng lượng
    beam: function (t) {
      tone('sawtooth', 120, 900, t, 0.35, 0.12);
      tone('sine', 240, 1800, t, 0.35, 0.12);
      noise(t + 0.32, 0.7, 'lowpass', 5000, 300, 0.45);
      tone('sawtooth', 900, 200, t + 0.32, 0.6, 0.12);
    },
    // Phi tiêu
    shuriken: function (t) {
      for (var i = 0; i < 5; i++) noise(t + i * 0.06, 0.12, 'bandpass', 4000, 9000, 0.35, 6);
      tone('sine', 2400, 600, t + 0.3, 0.15, 0.08);
    },
    // Đòn đánh trúng thường
    hit: function (t) {
      noise(t, 0.15, 'lowpass', 900, 100, 0.6);
      tone('sine', 150, 50, t, 0.2, 0.4);
    },
    // Trả lời sai
    wrong: function (t) {
      tone('square', 300, 150, t, 0.25, 0.12);
      tone('square', 220, 110, t + 0.12, 0.3, 0.12);
    },
    // Combo
    combo: function (t) {
      [523, 659, 784, 1047].forEach(function (f, i) { tone('square', f, 0, t + i * 0.06, 0.12, 0.12); });
    },
    // ULTRA COMBO
    ultra: function (t) {
      [523, 659, 784, 1047, 1319, 1568].forEach(function (f, i) {
        tone('sawtooth', f, 0, t + i * 0.07, 0.2, 0.1);
        tone('square', f * 1.5, 0, t + i * 0.07, 0.15, 0.05);
      });
      noise(t + 0.42, 0.8, 'highpass', 4000, 9000, 0.15);
    },
    // PERFECT (trả lời nhanh)
    perfect: function (t) {
      tone('sine', 1319, 0, t, 0.15, 0.2);
      tone('sine', 1760, 0, t + 0.09, 0.3, 0.2);
      tone('triangle', 2637, 0, t + 0.18, 0.4, 0.1);
    },
    // Thắng
    win: function (t) {
      var seq = [[523, 0.15], [659, 0.15], [784, 0.15], [1047, 0.45], [784, 0.15], [1047, 0.7]];
      var tt = t;
      seq.forEach(function (pair) {
        tone('square', pair[0], 0, tt, pair[1], 0.12);
        tone('triangle', pair[0] / 2, 0, tt, pair[1], 0.15);
        tt += pair[1] * 0.8;
      });
    },
    // Thua
    lose: function (t) {
      var seq = [[392, 0.3], [370, 0.3], [349, 0.3], [330, 0.8]];
      var tt = t;
      seq.forEach(function (pair) {
        tone('triangle', pair[0], 0, tt, pair[1], 0.18);
        tt += pair[1];
      });
    },
    // Click UI
    click: function (t) { tone('sine', 880, 1200, t, 0.06, 0.1); },
    // Rơi tầng
    fall: function (t) { tone('sine', 800, 120, t, 0.6, 0.2); }
  };

  function play(name) {
    if (!sfxOn()) return;
    if (!FX[name]) return;
    var c = ac();
    if (!c) return;
    try { FX[name](c.currentTime + 0.01); } catch (e) {}
  }

  var api = {
    hit: function () { play('hit'); },
    shoot: function () { play('shoot'); },
    thunder: function () { play('thunder'); },
    explosion: function () { play('explosion'); },
    win: function () { play('win'); },
    lose: function () { play('lose'); },
    click: function () { play('click'); },
    ultra: function () { play('ultra'); },
    // Bí danh tương thích bản mẫu / nhánh khác nếu gọi nhầm tên:
    fire: function () { play('explosion'); },
    gun: function () { play('shoot'); },
    beam: function () { play('beam'); },
    shuriken: function () { play('shuriken'); },
    combo: function () { play('combo'); },
    perfect: function () { play('perfect'); },
    victory: function () { play('win'); },
    wrong: function () { play('wrong'); },
    fall: function () { play('fall'); },
    play: play
  };

  window.GSFX = api;
  window.sfx = play; // tương thích ngược với bản mẫu (sfx('click')...)
})();
