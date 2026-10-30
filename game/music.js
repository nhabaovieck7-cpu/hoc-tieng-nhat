// music.js — Nhạc nền game "Hành trình đến Edo" (Nhánh 4)
// 4 beat tự sáng tác trong game/nhac/ (KHÔNG để trong audio/**, KHÔNG precache trong SW).
// Ánh xạ cảnh: lobby->lofi-chill, normal->trap-ngau, boss->drill-trum, map->boom-bap.
// Tải lười (chỉ tạo <audio> khi play), loop, chỉ phát sau tương tác đầu tiên,
// chuyển cảnh crossfade ngắn, duck() giảm ~70% âm lượng khi câu trend đang đọc.
// Công tắc localStorage: 'hn_game_snd_music' | 'hn_game_snd_sfx' | 'hn_game_snd_voice' (1/0).
// Âm lượng nhạc: 'hn_game_vol_music' (0..100, mặc định 100) — targetVol() = BASE_VOL * vol.
// API: window.GMUSIC = { play(scene), stop(), duck(on), mountToggles(el), current(),
//                        setVolume(v01), getVolume() }
// Có GAME_SETTINGS (settings.js) thì mountToggles NHƯỜNG panel ⚙️, không dựng 3 nút rời.
(function () {
  'use strict';

  var KEYS = { voice: 'hn_game_snd_voice', sfx: 'hn_game_snd_sfx', music: 'hn_game_snd_music' };
  var VOL_KEY_MUSIC = 'hn_game_vol_music';
  var volOverride = null; // setVolume() đặt; null = đọc từ localStorage
  var SCENES = {
    lobby: 'lofi-chill.mp3',
    normal: 'trap-ngau.mp3',
    boss: 'drill-trum.mp3',
    map: 'boom-bap.mp3'
  };
  var BASE_VOL = 0.55;
  var DUCK_RATIO = 0.3; // duck = giảm ~70%
  var FADE_MS = 450;

  // Đường dẫn tương đối theo vị trí file music.js (game/nhac/...) — an toàn dù trang ở thư mục con.
  var base = 'nhac/';
  try {
    var cs = document.currentScript;
    if (cs && cs.src) base = cs.src.replace(/[^/]*$/, '') + 'nhac/';
  } catch (e) {}

  var unlocked = false;
  var pendingScene = null;
  var scene = null;
  var ducked = false;
  var players = []; // tối đa 2 phần tử audio để crossfade

  /* FIX3 (30/10, Lỗi 3): trên iPhone (iOS Safari), thuộc tính
     .volume của phần tử <audio> KHÔNG do JS điều khiển được (âm
     lượng media đi theo nút cứng của máy) — đó là lý do kéo slider
     Nhạc nền trên máy thật "không ăn" dù harness Chromium (nơi
     .volume đặt được) đo đúng ở fix2. Cách sửa: khi đã có tương tác
     đầu tiên, nối mỗi player qua WebAudio: <audio> ->
     MediaElementSource -> GainNode riêng -> master -> destination,
     và fade bằng GAIN (JS điều khiển được trên iOS). Player nào nối
     gain thì .volume giữ 1; player nào không nối được (không có
     WebAudio / lỗi) rơi về đường .volume cũ nguyên vẹn. */
  var actx = null, masterOut = null;
  function ensureCtx() {
    if (actx) { if (actx.state === 'suspended') { try { actx.resume(); } catch (e) {} } return actx; }
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      actx = new AC();
      masterOut = actx.createGain();
      masterOut.gain.value = 1;
      masterOut.connect(actx.destination);
    } catch (e) { actx = null; masterOut = null; }
    return actx;
  }
  function volGet(p) { return p._g ? (typeof p._gv === 'number' ? p._gv : p._g.gain.value) : p.volume; }
  function volSet(p, v) {
    v = Math.max(0, Math.min(1, v));
    if (p._g) {
      p._gv = v;
      try { p._g.gain.value = v; } catch (e) {}
    } else {
      try { p.volume = v; } catch (e) {}
    }
  }

  function on(key) {
    try { return localStorage.getItem(KEYS[key]) !== '0'; } catch (e) { return true; }
  }
  function setKey(key, val) {
    try { localStorage.setItem(KEYS[key], val ? '1' : '0'); } catch (e) {}
  }
  function musicVol01() {
    if (volOverride != null) return volOverride;
    try {
      var v = parseInt(localStorage.getItem(VOL_KEY_MUSIC), 10);
      if (isNaN(v)) return 1;
      return Math.max(0, Math.min(100, v)) / 100;
    } catch (e) { return 1; }
  }
  function targetVol() {
    var base = BASE_VOL * musicVol01();
    return ducked ? base * DUCK_RATIO : base;
  }
  function getVolume() { return musicVol01(); }
  function setVolume(v01) {
    var v = Number(v01);
    if (isNaN(v)) return musicVol01();
    v = Math.max(0, Math.min(1, v));
    volOverride = v;
    try { localStorage.setItem(VOL_KEY_MUSIC, String(Math.round(v * 100))); } catch (e) {}
    // Áp ngay vào player hiện tại (targetVol đã tính duck). FIX2 bổ
    // sung: áp cả khi player đang pause — bản cũ chỉ áp khi !paused
    // nên kéo trượt lúc nhạc tạm dừng không thấy hiệu lực ngay trên
    // phần tử (dù giá trị đã lưu); nay volume của phần tử khớp mức
    // mới ngay lập tức, phát lại là nghe đúng luôn.
    var cur = players[players.length - 1];
    if (cur) fadeTo(cur, targetVol());
    return v;
  }

  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () {
      ensureCtx(); // FIX3: tạo/hồi AudioContext ngay trong cử chỉ đầu tiên (điều kiện của iOS)
      if (unlocked) return;
      unlocked = true;
      if (pendingScene) { var s = pendingScene; pendingScene = null; play(s); }
    }, { passive: true, capture: true });
  });

  function makePlayer(file) {
    var a = document.createElement('audio');
    a.src = base + file;
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    // FIX3: nối qua GainNode WebAudio khi làm được (xem ensureCtx).
    if (unlocked && ensureCtx() && masterOut) {
      try {
        var srcNode = actx.createMediaElementSource(a);
        var g = actx.createGain();
        g.gain.value = 0;
        srcNode.connect(g);
        g.connect(masterOut);
        a._g = g; a._gv = 0;
        a.volume = 1; // qua gain thì phần tử giữ 1, gain là mức thật
      } catch (e) { a._g = null; a._gv = null; }
    }
    return a;
  }

  /* FIX2 (30/10, "âm lượng lúc được lúc không"): mỗi player giữ ĐÚNG
     một interval fade của riêng nó (player._fadeTm) — bản cũ mỗi lần gọi
     fadeTo (play/duck/setVolume) lại tạo interval MỚI mà không hủy cái
     trước, nhiều interval cùng ghi player.volume tranh nhau trong ~450ms
     nên mức cuối cùng thắng/thua ngẫu nhiên theo nhịp đồng hồ, kéo thanh
     trượt xong nghe như không ăn. Nay: fade mới luôn hủy fade cũ của
     CÙNG player trước khi bắt đầu. */
  function fadeTo(player, to, done, ms) {
    if (player._fadeTm) { clearInterval(player._fadeTm); player._fadeTm = null; }
    var from = volGet(player); // FIX3: đọc mức THẬT (gain nếu có nối, không thì .volume)
    var total = ms || FADE_MS;
    var steps = 9, i = 0;
    var stepMs = Math.max(20, Math.floor(total / steps));
    var tm = setInterval(function () {
      i++;
      var v = from + (to - from) * (i / steps);
      volSet(player, v); // FIX3: ghi qua cùng một cửa (gain/.volume)
      if (i >= steps) {
        clearInterval(tm);
        if (player._fadeTm === tm) player._fadeTm = null;
        if (done) done();
      }
    }, stepMs);
    player._fadeTm = tm;
    return tm;
  }

  function play(next) {
    if (!SCENES[next]) return;
    scene = next;
    if (!on('music')) return;          // công tắc tắt: nhớ cảnh, không phát
    if (!unlocked) { pendingScene = next; return; } // chờ tương tác đầu tiên (iPhone)
    var file = SCENES[next];
    var cur = players[players.length - 1];
    if (cur && cur.dataset && cur.dataset.file === file && !cur.paused) {
      fadeTo(cur, targetVol());
      return;
    }
    var p = makePlayer(file);
    p.dataset.file = file;
    players.push(p);
    var pr = p.play();
    if (pr && pr.catch) pr.catch(function () { /* bị chặn autoplay: chờ tương tác sau */ pendingScene = next; });
    fadeTo(p, targetVol());
    if (cur) {
      fadeTo(cur, 0, function () { try { cur.pause(); } catch (e) {} });
      setTimeout(function () {
        players = players.filter(function (x) { return x !== cur; });
      }, FADE_MS + 120);
    }
  }

  function stop() {
    scene = null;
    pendingScene = null;
    players.forEach(function (p) {
      fadeTo(p, 0, function () { try { p.pause(); } catch (e) {} });
    });
    var old = players;
    players = [];
    setTimeout(function () { old.forEach(function (p) { try { p.removeAttribute('src'); } catch (e) {} }); }, FADE_MS + 120);
  }

  function duck(onOff) {
    ducked = !!onOff;
    var cur = players[players.length - 1];
    if (cur && !cur.paused) {
      // Duck đi qua fadeTo dùng chung (nhanh hơn crossfade thường):
      // interval riêng của duck trước đây cũng là một nguồn tranh ghi
      // volume với fade của play/setVolume — FIX2 bỏ hẳn.
      fadeTo(cur, targetVol(), null, 200);
    }
  }

  // ---- 3 công tắc âm thanh ----
  var DEFS = [
    { key: 'voice', icon: '🎙', label: 'Giọng đọc' },
    { key: 'sfx', icon: '💥', label: 'Tiếng skill' },
    { key: 'music', icon: '🎵', label: 'Nhạc nền' }
  ];

  function mountToggles(el) {
    if (!el) return false;
    // Có panel cài đặt ⚙️ (settings.js): nhường hẳn, KHÔNG dựng 3 nút rời
    // để tránh trùng. settings.js cũng tự chiếm #sndToggles nếu đến sau.
    if (window.GAME_SETTINGS) {
      if (typeof window.GAME_SETTINGS.mountSettings === 'function') {
        try { window.GAME_SETTINGS.mountSettings(el); } catch (e) {}
      }
      return false;
    }
    el.textContent = '';
    el.classList.add('snd-toggles');
    DEFS.forEach(function (def) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'snd-toggle';
      btn.setAttribute('role', 'switch');
      btn.style.cssText = 'min-height:44px;min-width:44px;display:inline-flex;align-items:center;gap:6px;' +
        'padding:8px 12px;margin:4px;border-radius:999px;border:2px solid #233d63;' +
        'font-size:14px;font-weight:700;cursor:pointer;background:#fff;color:#1d2440';
      var state = document.createElement('span');
      var label = document.createElement('span');
      label.textContent = def.icon + ' ' + def.label;
      btn.appendChild(label);
      btn.appendChild(state);
      function render() {
        var isOn = on(def.key);
        btn.setAttribute('aria-checked', isOn ? 'true' : 'false');
        btn.style.opacity = isOn ? '1' : '0.5';
        state.textContent = isOn ? 'Bật' : 'Tắt';
      }
      btn.addEventListener('click', function () {
        var now = !on(def.key);
        setKey(def.key, now);
        render();
        // Áp dụng ngay:
        if (def.key === 'music') {
          if (!now) stop();
          else if (scene) play(scene);
        } else if (def.key === 'voice') {
          if (!now && window.GTREND && typeof window.GTREND.stop === 'function') window.GTREND.stop();
        } else if (def.key === 'sfx') {
          if (now && window.GSFX && typeof window.GSFX.click === 'function') window.GSFX.click();
        }
      });
      render();
      el.appendChild(btn);
    });
  }

  window.GMUSIC = {
    play: play,
    stop: stop,
    duck: duck,
    mountToggles: mountToggles,
    current: function () { return scene; },
    setVolume: setVolume,
    getVolume: getVolume,
    // FIX2: móc kiểm thử (chỉ đọc) — harness đo volume THẬT trên từng
    // player + mức đích hiện tại sau khi kéo thanh trượt.
    _test: {
      players: function () {
        return players.map(function (p) {
          // FIX3: volume = mức ÁP THẬT (gain WebAudio nếu đã nối —
          // đường này mới là đường JS điều khiển được trên iOS).
          return { file: (p.dataset && p.dataset.file) || '', volume: volGet(p), paused: p.paused, routed: !!p._g, elemVolume: p.volume };
        });
      },
      targetVol: targetVol
    }
  };
})();
