// sfx.js — Tiếng skill/hiệu ứng bằng Web Audio thuần (Nhánh 4, từ bản mẫu mau-game/sfx.js)
// TUYỆT ĐỐI không phát giọng nói, không hô tên skill — chỉ tiếng nổ/sét/súng/chưởng/thắng/thua/click.
// Tôn trọng công tắc localStorage 'hn_game_snd_sfx' (đọc lại mỗi lần phát).
// AudioContext chỉ khởi tạo sau tương tác đầu tiên của người chơi (luật autoplay iPhone).
// Âm lượng skill: master GainNode (gain = 'hn_game_vol_sfx'/100, mặc định 100)
// mà mọi env gain nối vào thay vì c.destination; GSFX.setVolume(v01) cập nhật ngay.
// API: window.GSFX = { hit, shoot, thunder, explosion, win, lose, click, ultra,
//                      finisher, bossfin, setVolume(v01), getVolume() }
// Tiếng 'finisher' (Nhánh K, đợt 3): tổng hợp WebAudio tại chỗ trong file này,
// KHÔNG dùng asset/MP3 ngoài — cùng cơ chế master gain + công tắc như mọi tiếng khác.
// Tiếng 'bossfin' (Nhánh B, đợt 4): CŨNG tổng hợp WebAudio tại chỗ trong file
// này (không file ngoài, không thư viện) — xem chú thích ở FX.bossfin bên dưới.
//      (+ bí danh tương thích bản mẫu: fire, gun, beam, combo, perfect, victory, fall, wrong, shuriken; window.sfx(name))
(function () {
  'use strict';

  var LS_SFX = 'hn_game_snd_sfx';
  var LS_VOL_SFX = 'hn_game_vol_sfx';
  var AC = null;
  var unlocked = false;
  var noiseCache = null;
  var master = null;      // GainNode tổng, tạo lười khi có AudioContext
  var volOverride = null; // setVolume() đặt; null = đọc từ localStorage

  function sfxOn() {
    try { return localStorage.getItem(LS_SFX) !== '0'; } catch (e) { return true; }
  }

  function sfxVol01() {
    if (volOverride != null) return volOverride;
    try {
      var v = parseInt(localStorage.getItem(LS_VOL_SFX), 10);
      if (isNaN(v)) return 1;
      return Math.max(0, Math.min(100, v)) / 100;
    } catch (e) { return 1; }
  }

  // Master gain: mọi tiếng skill đều qua đây rồi mới ra destination.
  function masterNode(c) {
    if (!master) {
      master = c.createGain();
      master.gain.value = sfxVol01();
      master.connect(c.destination);
    }
    return master;
  }

  function setVolume(v01) {
    var v = Number(v01);
    if (isNaN(v)) return sfxVol01();
    v = Math.max(0, Math.min(1, v));
    volOverride = v;
    try { localStorage.setItem(LS_VOL_SFX, String(Math.round(v * 100))); } catch (e) {}
    if (master) {
      try {
        if (AC) master.gain.setTargetAtTime(v, AC.currentTime, 0.03);
        else master.gain.value = v;
      } catch (e) { try { master.gain.value = v; } catch (e2) {} }
    }
    return v;
  }
  function getVolume() { return sfxVol01(); }

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
    o.connect(g); g.connect(masterNode(c));
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
    s.connect(f); f.connect(g); g.connect(masterNode(c));
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
    // KẾT LIỄU thắng trận (Nhánh K) — phân biệt rõ với 'win' (giai điệu vuông ngắn):
    // ~1,15s gồm 3 lớp: (1) quét lên nhanh sawtooth+triangle 180->1400Hz + gió highpass,
    // (2) một đòn trầm mạnh ở 0,30s (sine 160->38Hz + noise lowpass + square phụ),
    // (3) arpeggio chuông lấp lánh 1319/1568/2093/2637Hz từ 0,55s + hợp âm shimmer cuối.
    finisher: function (t) {
      tone('sawtooth', 180, 1400, t, 0.28, 0.14);
      tone('triangle', 360, 2800, t, 0.28, 0.10);
      noise(t, 0.25, 'highpass', 1200, 6000, 0.12);
      tone('sine', 160, 38, t + 0.30, 0.45, 0.5);
      noise(t + 0.30, 0.35, 'lowpass', 900, 120, 0.5);
      tone('square', 90, 45, t + 0.30, 0.30, 0.18);
      [1319, 1568, 2093, 2637].forEach(function (f, i) {
        tone('sine', f, 0, t + 0.55 + i * 0.09, 0.35, 0.16);
        tone('triangle', f * 2, 0, t + 0.55 + i * 0.09, 0.22, 0.05);
      });
      tone('sine', 1047, 0, t + 0.92, 0.30, 0.08);
    },
    // KẾT LIỄU BOSS CUỐI VÁN (Nhánh B, đợt 4) — khác rõ 'finisher' (1 đòn
    // duy nhất ~1,15s): bản này dài ~2,4s, bám đúng nhịp hình của
    // GFIN.playBoss: (1) 6 ĐÒN DỒN DẬP ở các mốc 0 / .23 / .44 / .63 /
    // .80 / .95s (nhịp nhanh dần, biên độ tăng dần: sine trầm 170->48Hz
    // + noise lowpass + tick sawtooth ngắn), (2) SLOW-MO ở 1,28s: quét
    // pitch RƠI 820->70Hz trong 0,42s (cảm giác thời gian chậm lại),
    // (3) NỔ LỚN ở 1,72s: noise lowpass dài 0,7s + sine 150->30Hz +
    // noise bandpass phụ, (4) chuông ăn mừng 1568/2093/2637/3136Hz từ
    // 1,88s. Nguồn âm: 100% tổng hợp WebAudio tại chỗ (oscillator +
    // noise buffer qua env/master gain sẵn có) — KHÔNG asset ngoài.
    bossfin: function (t) {
      var hits = [0, 0.23, 0.44, 0.63, 0.80, 0.95];
      hits.forEach(function (off, i) {
        var v = 0.26 + i * 0.05; // đòn sau mạnh hơn đòn trước
        tone('sine', 170, 48, t + off, 0.22, v);
        noise(t + off, 0.16, 'lowpass', 1100, 140, v * 0.85);
        tone('sawtooth', 320 + i * 90, 120, t + off, 0.07, 0.10);
      });
      tone('sawtooth', 820, 70, t + 1.28, 0.42, 0.13);
      tone('sine', 410, 38, t + 1.28, 0.42, 0.16);
      noise(t + 1.30, 0.38, 'bandpass', 2400, 220, 0.12, 2);
      noise(t + 1.72, 0.70, 'lowpass', 2600, 90, 0.55);
      tone('sine', 150, 30, t + 1.72, 0.62, 0.55);
      noise(t + 1.80, 0.45, 'bandpass', 900, 2600, 0.22, 2);
      [1568, 2093, 2637, 3136].forEach(function (f, i) {
        tone('sine', f, 0, t + 1.88 + i * 0.08, 0.32, 0.13);
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
    finisher: function () { play('finisher'); },
    bossfin: function () { play('bossfin'); },
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
    play: play,
    setVolume: setVolume,
    getVolume: getVolume,
    // FIX2: móc kiểm thử (chỉ đọc) — harness đo gain THẬT của master
    // GainNode sau khi kéo thanh trượt (null = chưa tạo AudioContext).
    _test: {
      masterGain: function () { return master ? master.gain.value : null; },
      hasContext: function () { return !!AC; }
    }
  };

  window.GSFX = api;
  window.sfx = play; // tương thích ngược với bản mẫu (sfx('click')...)
})();
