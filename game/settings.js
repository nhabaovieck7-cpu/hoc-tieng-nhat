// settings.js — Cài đặt âm thanh game "Hành trình đến Edo" (Nhánh S)
// Gom 3 nút rời cũ (Giọng đọc / Tiếng skill / Nhạc nền) thành MỘT nút ⚙️
// mở panel: 3 thanh trượt âm lượng 0–100 + công tắc bật/tắt nhanh từng kênh
// + chọn kiểu giọng đọc 3 mức.
//
// Khóa localStorage:
//   CŨ (giữ nguyên): hn_game_snd_voice | hn_game_snd_sfx | hn_game_snd_music ('1'/'0')
//   MỚI: hn_game_vol_voice | hn_game_vol_sfx | hn_game_vol_music ('0'..'100', mặc định 100)
//        hn_game_voice_style: 'chat' | 'thuong' | 'cute' (mặc định 'thuong')
//
// API: window.GAME_SETTINGS = {
//   get() -> { voiceOn, voiceVol, sfxOn, sfxVol, musicOn, musicVol, voiceStyle },
//   set(patch) -> áp + lưu + phát sự kiện, trả về get(),
//   onChange(fn) -> đăng ký nghe thay đổi, trả về hàm hủy đăng ký,
//   volumeOf(kind) -> 0..1 ĐÃ nhân công tắc tắt (tắt = 0),
//   mountSettings(hostEl) -> dựng nút ⚙️ + panel vào host, trả về true/false
// }
// Mỗi thay đổi đều phát sự kiện window 'hn-game-settings' (detail = get()).
//
// Chịu được thứ tự tải trước/sau music.js/sfx.js: mọi lời gọi GMUSIC/GSFX
// đều kiểm tra typeof tại thời điểm áp dụng, và applyAll() được thử lại
// ở các mốc DOMContentLoaded / load / +600ms / +1500ms.
(function () {
  'use strict';

  if (window.GAME_SETTINGS) return; // tránh nạp 2 lần

  var KEYS_ON = { voice: 'hn_game_snd_voice', sfx: 'hn_game_snd_sfx', music: 'hn_game_snd_music' };
  var KEYS_VOL = { voice: 'hn_game_vol_voice', sfx: 'hn_game_vol_sfx', music: 'hn_game_vol_music' };
  var KEY_STYLE = 'hn_game_voice_style';
  var STYLES = ['chat', 'thuong', 'cute'];
  var KINDS = ['voice', 'sfx', 'music'];
  var ROWS = [
    { kind: 'voice', icon: '🎙', label: 'Giọng đọc' },
    { kind: 'sfx', icon: '💥', label: 'Tiếng skill' },
    { kind: 'music', icon: '🎵', label: 'Nhạc nền' }
  ];
  var STYLE_OPTS = [
    { v: 'chat', label: 'Chất' },
    { v: 'thuong', label: 'Bình thường' },
    { v: 'cute', label: 'Dễ thương' }
  ];

  // ---------------- Đọc / ghi trạng thái ----------------
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function readOn(kind) { return lsGet(KEYS_ON[kind]) !== '0'; }
  function readVol(kind) {
    var v = parseInt(lsGet(KEYS_VOL[kind]), 10);
    if (isNaN(v)) return 100;
    return Math.max(0, Math.min(100, v));
  }
  function readStyle() {
    var s = lsGet(KEY_STYLE);
    return STYLES.indexOf(s) >= 0 ? s : 'thuong';
  }

  function get() {
    return {
      voiceOn: readOn('voice'), voiceVol: readVol('voice'),
      sfxOn: readOn('sfx'), sfxVol: readVol('sfx'),
      musicOn: readOn('music'), musicVol: readVol('music'),
      voiceStyle: readStyle()
    };
  }

  function volumeOf(kind) {
    if (KINDS.indexOf(kind) < 0) return 0;
    if (!readOn(kind)) return 0;
    return readVol(kind) / 100;
  }

  // ---------------- Áp dụng ngay sang GMUSIC / GSFX ----------------
  // Giọng đọc: GAME_VOICE tự đọc volumeOf('voice') ở lần đọc sau — ở đây
  // chỉ cần phát sự kiện (xem emit()).
  function applyKind(kind, st) {
    st = st || get();
    try {
      if (kind === 'music' && window.GMUSIC) {
        if (!st.musicOn) {
          if (typeof window.GMUSIC.stop === 'function') window.GMUSIC.stop();
        } else {
          if (typeof window.GMUSIC.setVolume === 'function') window.GMUSIC.setVolume(st.musicVol / 100);
          if (typeof window.GMUSIC.current === 'function' && typeof window.GMUSIC.play === 'function') {
            var sc = window.GMUSIC.current();
            if (sc) window.GMUSIC.play(sc);
          }
        }
      } else if (kind === 'sfx' && window.GSFX) {
        if (typeof window.GSFX.setVolume === 'function') window.GSFX.setVolume(st.sfxVol / 100);
      } else if (kind === 'voice') {
        if (!st.voiceOn && window.GTREND && typeof window.GTREND.stop === 'function') window.GTREND.stop();
      }
    } catch (e) {}
  }
  // Chỉ áp âm lượng (khi trượt slider) — không stop/play, không click thử.
  function applyVolume(kind, st) {
    st = st || get();
    try {
      if (kind === 'music' && window.GMUSIC && typeof window.GMUSIC.setVolume === 'function') {
        window.GMUSIC.setVolume(st.musicVol / 100);
      } else if (kind === 'sfx' && window.GSFX && typeof window.GSFX.setVolume === 'function') {
        window.GSFX.setVolume(st.sfxVol / 100);
      }
    } catch (e) {}
  }
  function applyAll() { KINDS.forEach(function (k) { applyVolume(k, get()); }); }

  // ---------------- Sự kiện thay đổi ----------------
  var listeners = [];
  function emit() {
    var snap = get();
    listeners.slice().forEach(function (fn) { try { fn(snap); } catch (e) {} });
    try {
      window.dispatchEvent(new CustomEvent('hn-game-settings', { detail: snap }));
    } catch (e) {
      try {
        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('hn-game-settings', false, false, snap);
        window.dispatchEvent(ev);
      } catch (e2) {}
    }
    return snap;
  }
  function onChange(fn) {
    if (typeof fn !== 'function') return function () {};
    listeners.push(fn);
    return function () {
      var i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    };
  }

  function set(patch) {
    if (!patch || typeof patch !== 'object') return get();
    var touched = { voice: false, sfx: false, music: false };
    var volOnly = { voice: false, sfx: false, music: false };
    KINDS.forEach(function (kind) {
      if (typeof patch[kind + 'On'] === 'boolean') {
        lsSet(KEYS_ON[kind], patch[kind + 'On'] ? '1' : '0');
        touched[kind] = true;
      }
      if (patch[kind + 'Vol'] != null) {
        var v = Math.round(Number(patch[kind + 'Vol']));
        if (!isNaN(v)) {
          lsSet(KEYS_VOL[kind], String(Math.max(0, Math.min(100, v))));
          touched[kind] = true; volOnly[kind] = true;
        }
      }
    });
    if (typeof patch.voiceStyle === 'string' && STYLES.indexOf(patch.voiceStyle) >= 0) {
      lsSet(KEY_STYLE, patch.voiceStyle);
    }
    var snap = get();
    KINDS.forEach(function (kind) {
      if (!touched[kind]) return;
      // Đổi riêng âm lượng (trượt) -> áp nhẹ; đổi công tắc -> áp đầy đủ.
      if (volOnly[kind] && patch[kind + 'On'] == null) applyVolume(kind, snap);
      else applyKind(kind, snap);
    });
    syncPanel();
    return emit();
  }

  // ---------------- Panel cài đặt ----------------
  var gearBtn = null;
  var panel = null;
  var rowEls = {}; // kind -> {switch, range, pct}
  var styleLabels = {}; // style -> label.gs-style-opt
  var panelOpen = false;

  function buildPanel() {
    panel = document.createElement('div');
    panel.className = 'gs-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Cài đặt âm thanh');
    panel.hidden = true;

    var head = document.createElement('div');
    head.className = 'gs-head';
    var title = document.createElement('span');
    title.className = 'gs-title';
    title.textContent = '🔊 Cài đặt âm thanh';
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'gs-close';
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Đóng');
    closeBtn.addEventListener('click', function () { closePanel(); });
    head.appendChild(title);
    head.appendChild(closeBtn);
    panel.appendChild(head);

    ROWS.forEach(function (def) {
      var row = document.createElement('div');
      row.className = 'gs-row';
      row.setAttribute('data-kind', def.kind);

      var lab = document.createElement('span');
      lab.className = 'gs-row-label';
      lab.textContent = def.icon + ' ' + def.label;

      var sw = document.createElement('button');
      sw.type = 'button';
      sw.className = 'gs-switch';
      sw.setAttribute('role', 'switch');
      sw.setAttribute('aria-label', def.label);

      var range = document.createElement('input');
      range.type = 'range';
      range.className = 'gs-range';
      range.min = '0'; range.max = '100'; range.step = '1';
      range.setAttribute('aria-label', 'Âm lượng ' + def.label);

      var pct = document.createElement('span');
      pct.className = 'gs-pct';

      sw.addEventListener('click', function () {
        var patch = {};
        patch[def.kind + 'On'] = !readOn(def.kind);
        var wasSfxOn = def.kind === 'sfx' && patch.sfxOn;
        set(patch);
        if (wasSfxOn && window.GSFX && typeof window.GSFX.click === 'function') {
          try { window.GSFX.click(); } catch (e) {}
        }
      });
      range.addEventListener('input', function () {
        var patch = {};
        patch[def.kind + 'Vol'] = Number(range.value);
        set(patch);
      });

      row.appendChild(lab);
      row.appendChild(sw);
      row.appendChild(range);
      row.appendChild(pct);
      panel.appendChild(row);
      rowEls[def.kind] = { sw: sw, range: range, pct: pct };
    });

    var styleBox = document.createElement('div');
    styleBox.className = 'gs-style';
    var stTitle = document.createElement('div');
    stTitle.className = 'gs-style-title';
    stTitle.textContent = '🎭 Kiểu giọng đọc';
    var opts = document.createElement('div');
    opts.className = 'gs-style-opts';
    opts.setAttribute('role', 'radiogroup');
    opts.setAttribute('aria-label', 'Kiểu giọng đọc');
    STYLE_OPTS.forEach(function (o) {
      var lb = document.createElement('label');
      lb.className = 'gs-style-opt';
      lb.setAttribute('data-style', o.v);
      var inp = document.createElement('input');
      inp.type = 'radio';
      inp.name = 'gs-voice-style';
      inp.value = o.v;
      inp.className = 'gs-style-input';
      var txt = document.createElement('span');
      txt.textContent = o.label;
      inp.addEventListener('change', function () {
        if (inp.checked) set({ voiceStyle: o.v });
      });
      lb.appendChild(inp);
      lb.appendChild(txt);
      opts.appendChild(lb);
      styleLabels[o.v] = lb;
    });
    styleBox.appendChild(stTitle);
    styleBox.appendChild(opts);
    panel.appendChild(styleBox);

    document.body.appendChild(panel);
  }

  function syncPanel() {
    if (!panel) return;
    var st = get();
    KINDS.forEach(function (kind) {
      var r = rowEls[kind];
      if (!r) return;
      var on = st[kind + 'On'];
      var vol = st[kind + 'Vol'];
      r.sw.setAttribute('aria-checked', on ? 'true' : 'false');
      r.sw.textContent = on ? 'Bật' : 'Tắt';
      r.sw.classList.toggle('off', !on);
      if (document.activeElement !== r.range || Number(r.range.value) !== vol) {
        r.range.value = String(vol);
      }
      r.pct.textContent = vol + '%';
      r.range.disabled = !on;
    });
    STYLES.forEach(function (s) {
      var lb = styleLabels[s];
      if (!lb) return;
      var inp = lb.querySelector('input');
      var sel = st.voiceStyle === s;
      lb.classList.toggle('on', sel);
      if (inp) inp.checked = sel;
    });
  }

  function positionPanel() {
    if (!panel || !gearBtn) return;
    var rect = gearBtn.getBoundingClientRect();
    var w = Math.min(320, window.innerWidth - 16);
    var left = Math.max(8, Math.min(rect.left, window.innerWidth - w - 8));
    panel.style.top = (rect.bottom + 8) + 'px';
    panel.style.left = left + 'px';
  }

  function openPanel() {
    if (!panel) return;
    syncPanel();
    panel.hidden = false;
    panelOpen = true;
    if (gearBtn) gearBtn.setAttribute('aria-expanded', 'true');
    positionPanel();
  }
  function closePanel() {
    if (!panel) return;
    panel.hidden = true;
    panelOpen = false;
    if (gearBtn) gearBtn.setAttribute('aria-expanded', 'false');
  }

  // Đóng khi bấm ngoài panel/nút ⚙️, hoặc phím Escape.
  document.addEventListener('pointerdown', function (ev) {
    if (!panelOpen || !panel) return;
    var t = ev.target;
    if (panel.contains(t)) return;
    if (gearBtn && (t === gearBtn || gearBtn.contains(t))) return;
    closePanel();
  }, true);
  document.addEventListener('keydown', function (ev) {
    if (panelOpen && (ev.key === 'Escape' || ev.keyCode === 27)) closePanel();
  });

  function mountSettings(hostEl) {
    if (!hostEl) return false;
    try {
      if (!panel) buildPanel();
      if (!gearBtn) {
        gearBtn = document.createElement('button');
        gearBtn.type = 'button';
        gearBtn.className = 'gs-gear';
        gearBtn.textContent = '⚙️';
        gearBtn.setAttribute('aria-label', 'Cài đặt âm thanh');
        gearBtn.setAttribute('aria-haspopup', 'dialog');
        gearBtn.setAttribute('aria-expanded', 'false');
        gearBtn.addEventListener('click', function () {
          if (panelOpen) closePanel(); else openPanel();
        });
      }
      // Đúng MỘT nút ⚙️ trong host: dọn mọi nút rời cũ rồi gắn gear.
      hostEl.textContent = '';
      hostEl.appendChild(gearBtn);
      syncPanel();
      applyAll();
      return true;
    } catch (e) {
      return false;
    }
  }

  window.GAME_SETTINGS = {
    get: get,
    set: set,
    onChange: onChange,
    volumeOf: volumeOf,
    mountSettings: mountSettings
  };

  // ---------------- Tự chiếm #sndToggles ----------------
  // game.js (bản hiện tại) gọi GMUSIC.mountToggles -> music.js đã nhường
  // khi thấy GAME_SETTINGS, nên host thường TRỐNG; một số trang/mốc thời
  // gian host có thể vẫn chứa 3 nút .snd-toggle rời. Cách chắc chắn +
  // đơn giản: kiểm tra ngay khi DOM sẵn sàng + MutationObserver (chống
  // topbar dựng lại bằng innerHTML) + vài mốc thử lại theo timer.
  // maybeTakeover() là no-op nếu gear đã có mặt.
  function maybeTakeover() {
    var host = document.getElementById('sndToggles');
    if (!host) return;
    if (host.querySelector('.gs-gear')) return;
    if (host.childElementCount === 0 || host.querySelector('.snd-toggle')) {
      mountSettings(host);
    }
  }

  function boot() {
    maybeTakeover();
    applyAll();
    if (typeof MutationObserver !== 'undefined' && document.documentElement) {
      var pending = false;
      var mo = new MutationObserver(function () {
        if (pending) return;
        pending = true;
        setTimeout(function () { pending = false; maybeTakeover(); }, 120);
      });
      try { mo.observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
    }
    // Thử lại vài mốc để áp âm lượng khi GMUSIC/GSFX nạp sau settings.js.
    [600, 1500].forEach(function (ms) { setTimeout(function () { maybeTakeover(); applyAll(); }, ms); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { maybeTakeover(); applyAll(); });
})();
