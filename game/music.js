// music.js — Nhạc nền game "Hành trình đến Edo" (Nhánh 4)
// 4 beat tự sáng tác trong game/nhac/ (KHÔNG để trong audio/**, KHÔNG precache trong SW).
// Ánh xạ cảnh: lobby->lofi-chill, normal->trap-ngau, boss->drill-trum, map->boom-bap.
// Tải lười (chỉ tạo <audio> khi play), loop, chỉ phát sau tương tác đầu tiên,
// chuyển cảnh crossfade ngắn, duck() giảm ~70% âm lượng khi câu trend đang đọc.
// Công tắc localStorage: 'hn_game_snd_music' | 'hn_game_snd_sfx' | 'hn_game_snd_voice' (1/0).
// API: window.GMUSIC = { play(scene), stop(), duck(on), mountToggles(el), current() }
(function () {
  'use strict';

  var KEYS = { voice: 'hn_game_snd_voice', sfx: 'hn_game_snd_sfx', music: 'hn_game_snd_music' };
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

  function on(key) {
    try { return localStorage.getItem(KEYS[key]) !== '0'; } catch (e) { return true; }
  }
  function setKey(key, val) {
    try { localStorage.setItem(KEYS[key], val ? '1' : '0'); } catch (e) {}
  }
  function targetVol() { return ducked ? BASE_VOL * DUCK_RATIO : BASE_VOL; }

  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () {
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
    return a;
  }

  function fadeTo(player, to, done) {
    var from = player.volume;
    var steps = 9, i = 0;
    var stepMs = Math.max(20, Math.floor(FADE_MS / steps));
    var tm = setInterval(function () {
      i++;
      var v = from + (to - from) * (i / steps);
      try { player.volume = Math.max(0, Math.min(1, v)); } catch (e) {}
      if (i >= steps) {
        clearInterval(tm);
        if (done) done();
      }
    }, stepMs);
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
      // Duck phản ứng nhanh hơn crossfade thường một chút.
      var from = cur.volume, to = targetVol(), steps = 5, i = 0;
      var tm = setInterval(function () {
        i++;
        try { cur.volume = Math.max(0, Math.min(1, from + (to - from) * (i / steps))); } catch (e) {}
        if (i >= steps) clearInterval(tm);
      }, 40);
    }
  }

  // ---- 3 công tắc âm thanh ----
  var DEFS = [
    { key: 'voice', icon: '🎙', label: 'Giọng đọc' },
    { key: 'sfx', icon: '💥', label: 'Tiếng skill' },
    { key: 'music', icon: '🎵', label: 'Nhạc nền' }
  ];

  function mountToggles(el) {
    if (!el) return;
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
    current: function () { return scene; }
  };
})();
