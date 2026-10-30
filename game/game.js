/* =====================================================================
   game.js — Hạ tầng dùng chung cho game "Hành trình đến Edo" (Nhánh 1)
   ---------------------------------------------------------------------
   Cung cấp cho mọi nhánh (theo CONTRACT.md):
   - GAME_ENDPOINT : địa chỉ Worker. Ưu tiên window.SITE / SITE.aiEndpoint
                     từ ../config.js; staging chưa có config.js thì dùng
                     địa chỉ mặc định bên dưới (đúng địa chỉ live).
   - esc()         : thoát HTML chống XSS — BẮT BUỘC dùng cho mọi dữ liệu
                     người dùng / không tin cậy khi đưa vào HTML.
   - shuffle(), rnd(), clamp()
   - GAME_USER     : Promise<{loggedIn,name,call,gender,level,avatarFile,avatarUrl}>
                     call = 'anh' (nam) / 'chị' (nữ) / tên (chưa rõ giới
                     tính) / 'bạn' (chỉ khách chưa đăng nhập).
                     Nguồn: /auth/me + /hoso (khóa hn_dk_ho_so: goi/ten/gt,
                     hn_dk_level) — đúng handleHoso trong worker live.
                     Có cache trong phiên (sessionStorage), không lưu
                     token vào cache.
                     avatarFile/avatarUrl (Nhánh F): mã file ảnh hồ sơ của
                     CHÍNH MÌNH từ GET /community/profile (profile.avatar_file)
                     + URL xem tạm resolve qua POST /community/file-token
                     (cơ chế Cộng đồng). URL tạm CHỈ giữ trong bộ nhớ phiên
                     (GAME_USER_DATA), không lưu localStorage; mỗi lần
                     refresh lại resolve từ avatarFile mới nhất.
   - GAME_topbar() : thanh trên dùng chung (logo về hub, <div
                     id="sndToggles"> cho Nhánh 4 gắn 3 công tắc âm thanh,
                     avatar nhân vật + tên & cách gọi đúng quy tắc).
   - gameStore     : tiện ích localStorage với tiền tố hn_game_.
   - GAME_AVATAR   : dữ liệu + vẽ SVG nhân vật (dùng ở hub & nhan-vat).
   - GAME_ZONES / GAME_CLASSES / GAME_PETS: dữ kiện cốt truyện dùng chung.
   Thứ tự nạp script chuẩn (mọi trang game):
     ../config.js → game.js → fx.js → trend.js → sfx.js → music.js
     → questions.js / game-api.js (theo trang) → script riêng của trang.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------- Endpoint ---------------- */
  var FALLBACK_ENDPOINT = 'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev';
  function siteEndpoint() {
    try {
      if (typeof SITE !== 'undefined' && SITE && SITE.aiEndpoint) return String(SITE.aiEndpoint);
      if (window.SITE && window.SITE.aiEndpoint) return String(window.SITE.aiEndpoint);
    } catch (e) { /* config.js chưa nạp trong staging */ }
    return FALLBACK_ENDPOINT;
  }
  var GAME_ENDPOINT = siteEndpoint().replace(/\/$/, '');
  window.GAME_ENDPOINT = GAME_ENDPOINT;

  /* ---------------- Tiện ích cơ bản ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  window.esc = esc;

  function shuffle(a) {
    var arr = (a || []).slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  window.shuffle = shuffle;

  function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function cap(s) { s = String(s || ''); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ---------------- Kho lưu hn_game_* ---------------- */
  var gameStore = {
    get: function (key, def) {
      try {
        var v = localStorage.getItem(key);
        if (v == null) return def;
        // Chỉ parse khi trông giống JSON object/array; chuỗi thường (vd
        // '1', 'lobby') trả nguyên văn để tránh '1' biến thành số 1.
        if (v.charAt(0) === '{' || v.charAt(0) === '[') {
          try { return JSON.parse(v); } catch (e) { return v; }
        }
        return v;
      } catch (e) { return def; }
    },
    set: function (key, val) {
      try {
        localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
        return true;
      } catch (e) { return false; }
    },
    del: function (key) { try { localStorage.removeItem(key); } catch (e) { /* bỏ qua */ } }
  };
  window.gameStore = gameStore;

  /* ---------------- Phiên đăng nhập & gọi Worker ---------------- */
  var SESSION_KEY = 'hn_sess_v1'; // cùng khóa với auth.js của trang chính
  function gameSession() {
    try { return localStorage.getItem(SESSION_KEY) || ''; } catch (e) { return ''; }
  }
  window.gameSession = gameSession;

  async function gameApi(path, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    var tok = gameSession();
    if (tok) headers.Authorization = 'Bearer ' + tok;
    if (opts.headers) { for (var k in opts.headers) headers[k] = opts.headers[k]; }
    var r = await fetch(GAME_ENDPOINT + path, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body != null ? JSON.stringify(opts.body) : undefined
    });
    var j = await r.json().catch(function () { return {}; });
    if (!r.ok) {
      var err = new Error(j.error || ('Lỗi ' + r.status));
      err.status = r.status; err.body = j;
      throw err;
    }
    return j;
  }
  window.gameApi = gameApi;

  /* ---------------- Ảnh hồ sơ qua file-token (Nhánh F) ----------------
     Cơ chế ĐÚNG của trang Cộng đồng (resolveFiles trong cong-dong.html):
     mã file R2 (vd profiles.avatar_file) -> POST /community/file-token
     { ids:[...] } -> j.urls[id] là URL xem TẠM (hết hạn). Vì vậy:
     - KHÔNG lưu URL vào localStorage ở bất cứ đâu; chỉ giữ trong bộ nhớ.
     - Mỗi lần cần mặt mới (refresh GAME_USER / vẽ lại) resolve lại từ mã
       file mới nhất — hồ sơ đổi ảnh là game hiện ảnh mới, không dính ảnh cũ.
     resolveFileUrls(ids): resolve theo LÔ (tối đa 60 mã/lần như Cộng đồng),
     trả map {id: url}; lỗi/khách -> map rỗng, không ném lỗi ra UI.        */
  var faceInflight = {}; // id -> Promise<url|null>, khử gọi trùng trong bộ nhớ
  async function resolveFileUrls(ids) {
    var clean = [];
    (ids || []).forEach(function (id) {
      id = String(id == null ? '' : id);
      if (id && clean.indexOf(id) < 0) clean.push(id);
    });
    if (!clean.length || !gameSession()) return {};
    try {
      var j = await gameApi('/community/file-token', {
        method: 'POST',
        body: { ids: clean.slice(0, 60) }
      });
      return (j && j.urls) || {};
    } catch (e) { return {}; }
  }
  function resolveFileUrl(id) {
    id = String(id == null ? '' : id);
    if (!id) return Promise.resolve(null);
    if (faceInflight[id]) return faceInflight[id];
    var p = resolveFileUrls([id]).then(function (map) {
      delete faceInflight[id];
      return map[id] || null;
    });
    faceInflight[id] = p;
    return p;
  }
  window.GAME_resolveFileUrls = resolveFileUrls;
  window.GAME_resolveFileUrl = resolveFileUrl;

  /* ---------------- GAME_USER ----------------
     Thứ tự ưu tiên tên: hồ sơ "tên muốn được gọi" (goi) → tên hồ sơ (ten)
     → tên tài khoản (/auth/me). Giới tính: hồ sơ gt = 'nam' | 'nu'.
     Khách (không có phiên): call = 'bạn', tuyệt đối không gọi /hoso.     */
  var GUEST_USER = { loggedIn: false, name: '', call: 'bạn', gender: null, level: null, avatarFile: null, avatarUrl: null };
  var GAME_USER_DATA = {
    loggedIn: false, name: '', call: 'bạn', gender: null, level: null, loaded: false,
    avatarFile: null, // mã file R2 của ảnh hồ sơ mình (profiles.avatar_file) — Nhánh F
    avatarUrl: null   // URL xem tạm của avatarFile, CHỈ trong bộ nhớ — Nhánh F
  };
  window.GAME_USER_DATA = GAME_USER_DATA;
  // Tương thích ngược với mã mẫu (USER / XH / Xh toàn cục)
  window.USER = GAME_USER_DATA;
  window.XH = function () { return GAME_USER_DATA.call; };
  window.Xh = function () { return cap(GAME_USER_DATA.call); };
  window.GAME_XH = window.XH;
  window.GAME_Xh = window.Xh;

  function parseHosoStr(s) {
    try {
      var o = JSON.parse(s || 'null');
      return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
    } catch (e) { return {}; }
  }

  function fireGameUserEvent() {
    try { window.dispatchEvent(new CustomEvent('hn-game-user', { detail: GAME_USER_DATA })); } catch (e) { /* bỏ qua */ }
  }

  async function resolveGameUser() {
    // ĐỢT SỬA GAME 30/10 — việc 4 (đồng bộ tên): KHÔNG còn cache tên theo
    // phiên (bản cũ cache sessionStorage 'hn_game_user_cache' khiến đổi tên
    // trong hồ sơ rồi quay lại game vẫn hiện tên cũ trong cùng phiên) và
    // LUÔN lấy hồ sơ MỚI NHẤT từ máy chủ /hoso khi có phiên; bản local
    // 'hn_dk_ho_so' chỉ là dự phòng khi mất mạng, và được cập nhật ngược
    // mỗi khi lấy được bản máy chủ.
    try { sessionStorage.removeItem('hn_game_user_cache'); } catch (e) { /* dọn cache cũ */ }
    if (!gameSession()) {
      Object.assign(GAME_USER_DATA, GUEST_USER, { loaded: true });
      fireGameUserEvent();
      return GAME_USER_DATA;
    }

    var name = '', goi = '', gender = null, level = null;
    try {
      var me = await gameApi('/auth/me');
      var u = (me && me.user) || {};
      name = String(u.name || '').trim();
    } catch (e) { /* mất mạng: vẫn coi là đã đăng nhập, gọi theo hồ sơ local nếu có */ }
    // Hồ sơ: ưu tiên bản MÁY CHỦ /hoso (mới nhất), thiếu/mất mạng mới dùng
    // bản local. Khóa đúng theo handleHoso: hn_dk_ho_so (JSON), hn_dk_level.
    var hoso = {}, gotServerHoso = false;
    try {
      var hj = await gameApi('/hoso');
      var items = (hj && hj.items) || {};
      if (items.hn_dk_ho_so && items.hn_dk_ho_so.v) {
        hoso = parseHosoStr(items.hn_dk_ho_so.v);
        gotServerHoso = true;
        try { localStorage.setItem('hn_dk_ho_so', items.hn_dk_ho_so.v); } catch (e) { /* bỏ qua */ }
      }
      if (items.hn_dk_level && items.hn_dk_level.v) {
        level = items.hn_dk_level.v;
        try { localStorage.setItem('hn_dk_level', items.hn_dk_level.v); } catch (e) { /* bỏ qua */ }
      }
    } catch (e) { /* /hoso không khả dụng: rơi về bản local bên dưới */ }
    if (!gotServerHoso) {
      try { hoso = parseHosoStr(localStorage.getItem('hn_dk_ho_so')); } catch (e) { hoso = {}; }
      try { level = localStorage.getItem('hn_dk_level') || level; } catch (e) { /* bỏ qua */ }
    }
    // Ảnh hồ sơ của CHÍNH MÌNH (Nhánh F): GET /community/profile ->
    // profile.avatar_file (mã file R2). Gọi có guard: khách không tới đây
    // (đã trả khách ở trên), lỗi/mất mạng/không có hồ sơ -> avatarFile=null
    // và mặt nhân vật rơi về SVG mặc định. Có mã file thì resolve URL xem
    // tạm ngay (chỉ giữ trong bộ nhớ), để nơi vẽ mặt dùng được luôn.
    var avatarFile = null, avatarUrl = null;
    try {
      var pj = await gameApi('/community/profile');
      var prof = (pj && pj.profile) || null;
      if (prof && prof.avatar_file) avatarFile = String(prof.avatar_file);
    } catch (e) { /* hồ sơ cộng đồng không khả dụng: giữ null */ }
    if (avatarFile) {
      try { avatarUrl = await resolveFileUrl(avatarFile); } catch (e) { avatarUrl = null; }
      // Đối chiếu với lựa chọn mặt đã lưu: hồ sơ đổi ảnh (mã file khác mã
      // đã lưu trong cấu hình avatar) -> cập nhật mã đối chiếu lặng lẽ;
      // mặt LUÔN vẽ từ avatarFile mới nhất này, không dùng ảnh cũ.
      try {
        var avRaw = gameStore.get('hn_game_avatar', null);
        if (avRaw && typeof avRaw === 'object' && avRaw.face === 'hoso' && avRaw.faceFile !== avatarFile) {
          avRaw.faceFile = avatarFile;
          gameStore.set('hn_game_avatar', avRaw);
        }
      } catch (e) { /* bỏ qua */ }
    }
    if (hoso.ten) name = String(hoso.ten).trim() || name;
    goi = String(hoso.goi || '').trim();
    if (hoso.gt === 'nam') gender = 'nam';
    else if (hoso.gt === 'nu') gender = 'nu';
    if (level && ['N5', 'N4', 'N3', 'N2', 'N1'].indexOf(level) < 0) level = null;

    var displayName = goi || name;
    var call;
    if (gender === 'nam') call = 'anh';
    else if (gender === 'nu') call = 'chị';
    else if (displayName) call = displayName;
    else call = 'bạn'; // trường hợp mép: có phiên nhưng chưa lấy được tên nào

    Object.assign(GAME_USER_DATA, {
      loggedIn: true,
      name: displayName || name || '',
      call: call,
      gender: gender,
      level: level,
      avatarFile: avatarFile,
      avatarUrl: avatarUrl,
      loaded: true
    });
    fireGameUserEvent();
    return GAME_USER_DATA;
  }

  var GAME_USER = resolveGameUser().catch(function () {
    Object.assign(GAME_USER_DATA, { loaded: true });
    return GAME_USER_DATA;
  });
  window.GAME_USER = GAME_USER;
  window.GAME_USER_REFRESH = function () {
    try { sessionStorage.removeItem('hn_game_user_cache'); } catch (e) { /* bỏ qua */ }
    return resolveGameUser();
  };

  /* ---------------- Dữ kiện cốt truyện dùng chung ---------------- */
  var GAME_ZONES = [
    { id: 'N5', name: 'Làng Sakura', boss: 'Oni Đỏ', be: '👹', bg: '#ff7eb6', gname: 'Lễ hội làng', ge: '🏮', jp: '桜の村' },
    { id: 'N4', name: 'Rừng Tre Ma', boss: 'Kappa Láu Cá', be: '🐸', bg: '#2fbf71', gname: 'Chạy trốn qua rừng', ge: '🏃', jp: '竹の森' },
    { id: 'N3', name: 'Lâu đài Mây', boss: 'Tengu Mũi Dài', be: '👺', bg: '#22d3ee', gname: 'Leo lâu đài mây', ge: '🏯', jp: '雲の城' },
    { id: 'N2', name: 'Núi Lửa Fuji', boss: 'Rồng Lửa Ryūjin', be: '🐉', bg: '#ff7a45', gname: 'Đấu rồng lửa', ge: '⚔️', jp: '富士の火山' },
    { id: 'N1', name: 'Kinh thành Edo', boss: 'Shogun Bóng Tối', be: '🥷', bg: '#7c5cff', gname: 'Trận cuối ở Edo', ge: '👑', jp: '江戸城' }
  ];
  window.GAME_ZONES = GAME_ZONES;
  window.ZONES = GAME_ZONES; // tương thích mã mẫu

  var GAME_CLASSES = [
    { k: 'ninja', n: 'Ninja', e: '🥷', sk: 'Phi tiêu bão' },
    { k: 'samurai', n: 'Samurai', e: '⚔️', sk: 'Trảm nguyệt' },
    { k: 'miko', n: 'Miko', e: '⛩️', sk: 'Bùa sấm sét' },
    { k: 'hs', n: 'Học sinh Tokyo', e: '🎒', sk: 'Chưởng bút bi' },
    { k: 'gunner', n: 'Gunner', e: '🔫', sk: 'Liên thanh Wasabi' }
  ];
  window.GAME_CLASSES = GAME_CLASSES;
  window.CLASSES = GAME_CLASSES;

  var GAME_PETS = {
    meo: { e: '🐱', n: 'Mèo Maneki' },
    cao: { e: '🦊', n: 'Cáo Kitsune' },
    shiba: { e: '🐶', n: 'Chó Shiba' },
    cu: { e: '🦉', n: 'Cú Thông Thái' },
    tho: { e: '🐰', n: 'Thỏ Mochi' }
  };
  window.GAME_PETS = GAME_PETS;
  window.PETS = GAME_PETS;

  /* ---------------- Nhân vật (avatar SVG) ----------------
     Cấu hình lưu ở localStorage 'hn_game_avatar':
     {gender, hair, skin, hairColor, outfit, cls, pet, face, faceFile}
     (face/faceFile: nguồn mặt + mã ảnh hồ sơ đối chiếu — Nhánh F)
     Mọi giá trị đều qua sanitize (chỉ nhận id/màu trong danh sách cố định)
     nên đưa thẳng vào SVG vẫn an toàn.                                   */
  var AV_SKINS = [
    { v: '#ffe3c2', n: 'Sáng' }, { v: '#f2c79b', n: 'Trung bình sáng' },
    { v: '#c68863', n: 'Trung bình' }, { v: '#8d5524', n: 'Ngăm' }
  ];
  var AV_HAIRCOLORS = [
    { v: '#2b2118', n: 'Đen' }, { v: '#5b3a1e', n: 'Nâu' }, { v: '#a83232', n: 'Đỏ' },
    { v: '#d9a84e', n: 'Vàng' }, { v: '#7c5cff', n: 'Tím' }, { v: '#22d3ee', n: 'Xanh băng' }
  ];
  var AV_HAIRS = [
    { k: 'ngan', n: 'Tóc ngắn' }, { k: 'dai', n: 'Tóc dài' },
    { k: 'xoan', n: 'Tóc xoăn' }, { k: 'bui', n: 'Búi cao' }, { k: 'hai-mai', n: 'Hai mái' }
  ];
  var AV_OUTFITS = [
    { k: 'neon', n: 'Áo khoác neon', e: '🧥', main: '#233d63', sub: '#22d3ee' },
    { k: 'yukata', n: 'Yukata sakura', e: '👘', main: '#cf3a2e', sub: '#ffb7c5' },
    { k: 'giap', n: 'Giáp rồng', e: '🐉', main: '#374151', sub: '#d9a84e' },
    { k: 'dongphuc', n: 'Đồng phục Tokyo', e: '🎒', main: '#f4f1ea', sub: '#cf3a2e' },
    { k: 'choang', n: 'Áo choàng đêm', e: '🌙', main: '#3a1d5c', sub: '#7c5cff' }
  ];
  var AV_DEFAULT = { gender: 'nam', hair: 'ngan', skin: '#f2c79b', hairColor: '#2b2118', outfit: 'neon', cls: 'ninja', pet: 'meo', face: 'mascot', faceFile: null };
  /* Nguồn mặt nhân vật (Nhánh F): 'mascot' = SVG mặc định vẽ ở dưới;
     'hoso' = ảnh hồ sơ của chính mình (xem GAME_AVATAR.faceHTML). Cấu hình
     chỉ lưu LỰA CHỌN (face) + mã file đối chiếu (faceFile) — TUYỆT ĐỐI
     không lưu URL xem tạm của file-token (hết hạn) vào cấu hình này. */
  var AV_FACES = [
    { k: 'mascot', n: 'Nhân vật mặc định' },
    { k: 'hoso', n: 'Ảnh hồ sơ' }
  ];

  function pickVal(v, list, key, def) {
    for (var i = 0; i < list.length; i++) { if (list[i][key] === v) return v; }
    return def;
  }
  function sanitizeAvatar(c) {
    c = (c && typeof c === 'object') ? c : {};
    return {
      gender: c.gender === 'nu' ? 'nu' : 'nam',
      hair: pickVal(c.hair, AV_HAIRS, 'k', AV_DEFAULT.hair),
      skin: pickVal(c.skin, AV_SKINS, 'v', AV_DEFAULT.skin),
      hairColor: pickVal(c.hairColor, AV_HAIRCOLORS, 'v', AV_DEFAULT.hairColor),
      outfit: pickVal(c.outfit, AV_OUTFITS, 'k', AV_DEFAULT.outfit),
      cls: pickVal(c.cls, GAME_CLASSES, 'k', AV_DEFAULT.cls),
      pet: (c.pet && GAME_PETS[c.pet]) ? c.pet : AV_DEFAULT.pet,
      face: c.face === 'hoso' ? 'hoso' : 'mascot',
      faceFile: (typeof c.faceFile === 'string' && c.faceFile) ? c.faceFile : null
    };
  }
  function outfitOf(cfg) {
    for (var i = 0; i < AV_OUTFITS.length; i++) if (AV_OUTFITS[i].k === cfg.outfit) return AV_OUTFITS[i];
    return AV_OUTFITS[0];
  }
  function classOf(cfg) {
    for (var i = 0; i < GAME_CLASSES.length; i++) if (GAME_CLASSES[i].k === cfg.cls) return GAME_CLASSES[i];
    return GAME_CLASSES[0];
  }

  /* Vẽ nhân vật chibi bằng SVG (bán thân). cfg đã sanitize. */
  function avatarSVG(rawCfg, size) {
    var cfg = sanitizeAvatar(rawCfg);
    var of = outfitOf(cfg);
    var hc = cfg.hairColor, sk = cfg.skin;
    var hairBack = '', hairTop = '';
    if (cfg.hair === 'dai' || cfg.hair === 'hai-mai') {
      hairBack = '<path class="ca-hair-back" d="M52 78 Q46 150 58 178 L142 178 Q154 150 148 78 Q150 44 100 42 Q50 44 52 78 Z" fill="' + hc + '"/>';
    }
    if (cfg.hair === 'ngan') {
      hairTop = '<path d="M58 84 Q54 40 100 38 Q146 40 142 84 Q138 62 118 58 Q126 70 120 74 Q104 56 78 64 Q62 69 58 84 Z" fill="' + hc + '"/>';
    } else if (cfg.hair === 'dai') {
      hairTop = '<path d="M56 88 Q50 38 100 36 Q150 38 144 88 Q140 60 122 56 Q100 50 78 58 Q62 64 56 88 Z" fill="' + hc + '"/>' +
        '<path d="M60 84 Q76 66 84 74 Q72 84 68 96 Z" fill="' + hc + '"/>' +
        '<path d="M140 84 Q124 66 116 74 Q128 84 132 96 Z" fill="' + hc + '"/>';
    } else if (cfg.hair === 'xoan') {
      hairTop = '<g fill="' + hc + '">' +
        '<circle cx="66" cy="62" r="15"/><circle cx="84" cy="48" r="16"/><circle cx="104" cy="45" r="16"/>' +
        '<circle cx="124" cy="50" r="15"/><circle cx="138" cy="66" r="14"/><circle cx="60" cy="82" r="11"/><circle cx="142" cy="86" r="11"/></g>' +
        '<path d="M62 76 Q100 52 138 76 Q128 60 100 58 Q72 60 62 76 Z" fill="' + hc + '"/>';
    } else if (cfg.hair === 'bui') {
      hairTop = '<circle cx="100" cy="30" r="15" fill="' + hc + '"/>' +
        '<path d="M58 84 Q55 42 100 40 Q145 42 142 84 Q136 60 114 57 Q92 54 74 62 Q62 68 58 84 Z" fill="' + hc + '"/>' +
        '<circle cx="100" cy="30" r="6" fill="' + of.sub + '"/>';
    } else { // hai-mai
      hairTop = '<path d="M57 86 Q52 40 100 38 Q148 40 143 86 Q139 62 120 57 L118 108 L110 108 L112 66 Q100 61 88 66 L90 108 L82 108 L80 57 Q61 62 57 86 Z" fill="' + hc + '"/>';
    }
    var blush = cfg.gender === 'nu'
      ? '<ellipse cx="70" cy="112" rx="8" ry="4.5" fill="#ff9db0" opacity=".75"/><ellipse cx="130" cy="112" rx="8" ry="4.5" fill="#ff9db0" opacity=".75"/>'
      : '';
    var lash = cfg.gender === 'nu' ? '<path d="M66 96 q-4 -3 -7 -2 M134 96 q4 -3 7 -2" stroke="#2b2118" stroke-width="2.6" fill="none" stroke-linecap="round"/>' : '';
    /* Hoạt họa dùng chung (Nhánh A, đợt 4 — charanim.css/js): SVG được
       tách lớp ca-torso (thân) / ca-head (đầu) / ca-hair (tóc) / ca-eye
       (từng mắt, để chớp) và bọc trong <span class="ca-wrap"> kèm bóng
       đổ .ca-shadow. Hình vẽ/tọa độ giữ nguyên 100% như trước. */
    var svg =
      '<svg class="ca-svg" viewBox="0 0 200 200" width="' + (size || 120) + '" height="' + (size || 120) + '" role="img" aria-label="Nhân vật" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="avbg" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#3a1d5c"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs>' +
      '<circle cx="100" cy="100" r="98" fill="url(#avbg)"/>' +
      '<circle cx="100" cy="100" r="98" fill="none" stroke="' + of.sub + '" stroke-width="3"/>' +
      hairBack +
      // thân / trang phục + cổ
      '<g class="ca-torso">' +
      '<path d="M100 138 Q58 146 48 200 L152 200 Q142 146 100 138 Z" fill="' + of.main + '"/>' +
      '<path d="M100 140 L84 158 L100 176 L116 158 Z" fill="' + of.sub + '"/>' +
      '<path d="M84 158 L100 176 L116 158 L116 200 L84 200 Z" fill="' + of.main + '" opacity=".55"/>' +
      '<rect x="90" y="122" width="20" height="20" rx="8" fill="' + sk + '"/>' +
      '</g>' +
      // đầu + mặt
      '<g class="ca-head">' +
      '<ellipse cx="56" cy="96" rx="7" ry="10" fill="' + sk + '"/><ellipse cx="144" cy="96" rx="7" ry="10" fill="' + sk + '"/>' +
      '<ellipse cx="100" cy="94" rx="46" ry="50" fill="' + sk + '"/>' +
      '<g class="ca-hair">' + hairTop + '</g>' +
      '<g class="ca-eye ca-eye-l"><ellipse cx="82" cy="98" rx="5.5" ry="7" fill="#241a12"/><circle cx="84" cy="95" r="2" fill="#fff"/></g>' +
      '<g class="ca-eye ca-eye-r"><ellipse cx="118" cy="98" rx="5.5" ry="7" fill="#241a12"/><circle cx="120" cy="95" r="2" fill="#fff"/></g>' + lash +
      '<path d="M74 84 Q82 79 91 84 M109 84 Q118 79 126 84" stroke="' + hc + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
      blush +
      '<path d="M92 118 Q100 124 108 118" stroke="#b3543f" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '</svg>';
    return '<span class="ca-wrap"><span class="ca-shadow" aria-hidden="true"></span>' + svg + '</span>';
  }

  /* ---------------- Mặt của CHÍNH MÌNH (Nhánh F) ----------------
     faceHTML(cfg, size): HÀM DÙNG CHUNG cho mọi nơi vẽ mặt của mình.
     - cfg.face === 'hoso' VÀ GAME_USER_DATA có avatarFile + avatarUrl
       (đã resolve từ avatarFile MỚI NHẤT ở lần refresh gần nhất)
       -> <span class="gface"> SVG dự phòng ở dưới + <img class="gface-img">
       tròn phủ lên trên (ảnh lỗi/hết hạn thì img tự gỡ, SVG hiện ra —
       đúng mẫu Cộng đồng: nội dung dự phòng nằm sau <img onerror>).
     - Ngược lại (chưa chọn / khách / chưa có ảnh hồ sơ / chưa resolve)
       -> SVG mascot mặc định như cũ.
     paintFace(el, cfg, size): gán faceHTML vào el; nếu đã chọn 'hoso',
     có avatarFile mà URL chưa kịp resolve thì resolve ngay rồi vẽ lại
     đúng el đó + phát lại sự kiện 'hn-game-user' cho các nơi khác.     */
  function faceHTML(rawCfg, size) {
    var cfg = sanitizeAvatar(rawCfg || GAME_AVATAR.load());
    size = size || 120;
    if (cfg.face === 'hoso' && GAME_USER_DATA.avatarFile && GAME_USER_DATA.avatarUrl) {
      return '<span class="gface ca-hoso" style="width:' + size + 'px;height:' + size + 'px">' +
        avatarSVG(cfg, size) +
        '<img class="gface-img" src="' + esc(GAME_USER_DATA.avatarUrl) + '" alt="Ảnh hồ sơ" ' +
        'width="' + size + '" height="' + size + '" onerror="this.remove()"></span>';
    }
    return avatarSVG(cfg, size);
  }
  function paintFace(el, rawCfg, size) {
    if (!el) return;
    el.innerHTML = faceHTML(rawCfg, size);
    var cfg = sanitizeAvatar(rawCfg || GAME_AVATAR.load());
    if (cfg.face === 'hoso' && GAME_USER_DATA.avatarFile && !GAME_USER_DATA.avatarUrl) {
      var wantFile = GAME_USER_DATA.avatarFile;
      resolveFileUrl(wantFile).then(function (url) {
        if (!url || GAME_USER_DATA.avatarFile !== wantFile) return;
        GAME_USER_DATA.avatarUrl = url;
        if (el.isConnected) el.innerHTML = faceHTML(rawCfg, size);
        fireGameUserEvent();
      });
    }
  }
  window.GAME_faceHTML = faceHTML;
  window.GAME_paintFace = paintFace;

  var GAME_AVATAR = {
    SKINS: AV_SKINS, HAIRCOLORS: AV_HAIRCOLORS, HAIRS: AV_HAIRS, OUTFITS: AV_OUTFITS,
    FACES: AV_FACES,
    DEFAULT: AV_DEFAULT,
    sanitize: sanitizeAvatar,
    svg: avatarSVG,
    faceHTML: faceHTML,
    paintFace: paintFace,
    resolveFileUrls: resolveFileUrls,
    resolveFileUrl: resolveFileUrl,
    /* Nạp lại ảnh hồ sơ MỚI NHẤT (profile + file-token) mà không cần
       refresh toàn bộ GAME_USER; cập nhật GAME_USER_DATA rồi phát sự
       kiện 'hn-game-user' để mọi nơi vẽ lại mặt như cơ chế tên. */
    refreshFace: async function () {
      if (!gameSession()) return null;
      var file = null;
      try {
        var pj = await gameApi('/community/profile');
        if (pj && pj.profile && pj.profile.avatar_file) file = String(pj.profile.avatar_file);
      } catch (e) { /* giữ nguyên trạng thái cũ */ return GAME_USER_DATA.avatarUrl; }
      var url = null;
      if (file) { try { url = await resolveFileUrl(file); } catch (e) { url = null; } }
      GAME_USER_DATA.avatarFile = file;
      GAME_USER_DATA.avatarUrl = url;
      fireGameUserEvent();
      return url;
    },
    outfitOf: outfitOf,
    classOf: classOf,
    KEY: 'hn_game_avatar',
    load: function () {
      return sanitizeAvatar(gameStore.get('hn_game_avatar', null) || AV_DEFAULT);
    },
    save: function (cfg) {
      var clean = sanitizeAvatar(cfg);
      gameStore.set('hn_game_avatar', clean);
      try { document.dispatchEvent(new CustomEvent('hn-game-avatar', { detail: clean })); } catch (e) { /* bỏ qua */ }
      GAME_AVATAR.syncHoso(clean); // chạy nền, lỗi thì bỏ qua êm
      return clean;
    },
    /* Đồng bộ nhẹ lên tài khoản qua /hoso khi đã đăng nhập.
       handleHoso (worker live) CHỈ nhận 4 khóa: hn_dk_ho_so (JSON ≤4KB),
       hn_dk_avatar (data URL ảnh raster webp/jpeg — SVG của game KHÔNG
       hợp lệ ở khóa này, tuyệt đối không ghi đè ảnh đại diện thật của
       người dùng), hn_dk_level, hn_dk_goal. Vì vậy nhân vật game được
       cất trong hn_dk_ho_so ở mục "game_avatar", gộp theo dấu thời gian
       _t đúng quy tắc mergeHoSo của trang chính; vượt quá 4KB thì bỏ qua.
       localStorage vẫn là nguồn chính — xem nhật ký branches/N1.md. */
    syncHoso: async function (cfg) {
      if (!gameSession()) return false;
      try {
        var hj = await gameApi('/hoso');
        var items = (hj && hj.items) || {};
        var hoso = items.hn_dk_ho_so ? parseHosoStr(items.hn_dk_ho_so.v) : {};
        hoso.game_avatar = JSON.stringify(cfg);
        hoso._t = (hoso._t && typeof hoso._t === 'object') ? hoso._t : {};
        hoso._t.game_avatar = Date.now();
        var str = JSON.stringify(hoso);
        if (str.length > 4000) return false;
        var body = { items: {} };
        body.items.hn_dk_ho_so = str;
        await gameApi('/hoso', { method: 'POST', body: body });
        return true;
      } catch (e) { return false; }
    },
    /* Máy mới chưa có local: thử lấy nhân vật đã đồng bộ trong hồ sơ. */
    pullHoso: async function () {
      if (!gameSession()) return null;
      try {
        var hj = await gameApi('/hoso');
        var items = (hj && hj.items) || {};
        if (!items.hn_dk_ho_so) return null;
        var hoso = parseHosoStr(items.hn_dk_ho_so.v);
        if (!hoso.game_avatar) return null;
        var cfg = sanitizeAvatar(JSON.parse(hoso.game_avatar));
        gameStore.set('hn_game_avatar', cfg);
        return cfg;
      } catch (e) { return null; }
    }
  };
  window.GAME_AVATAR = GAME_AVATAR;

  /* ---------------- Toast ---------------- */
  function toast(t) {
    var d = document.createElement('div');
    d.className = 'toast';
    d.textContent = String(t == null ? '' : t);
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1600);
  }
  window.toast = toast;
  window.GAME_toast = toast;

  /* ---------------- Công tắc âm thanh (chỗ cho Nhánh 4) ----------------
     Nhánh 1 chỉ đặt <div id="sndToggles" class="snd-toggles"> trong topbar
     và gọi GMUSIC.mountToggles(el) nếu Nhánh 4 đã sẵn; chưa sẵn thì thử
     lại khi trang tải xong. KHÔNG tự vẽ nút âm thanh ở đây.             */
  function ensureSndToggles() {
    var el = document.getElementById('sndToggles');
    if (!el) {
      el = document.createElement('div');
      el.id = 'sndToggles';
      el.className = 'snd-toggles';
      var top = document.querySelector('.gtop');
      if (top) top.appendChild(el); else document.body.appendChild(el);
    }
    return el;
  }
  window.GAME_ensureSndToggles = ensureSndToggles;

  function mountSndToggles() {
    var el = ensureSndToggles();
    // Đợt sửa 30/10 — việc 5a: ưu tiên panel cài đặt hợp nhất (settings.js):
    // 1 nút ⚙️ + 3 thanh trượt âm lượng + chọn kiểu giọng. Không có
    // settings.js mới rơi về 3 nút rời cũ của music.js.
    try {
      if (window.GAME_SETTINGS && typeof window.GAME_SETTINGS.mountSettings === 'function') {
        window.GAME_SETTINGS.mountSettings(el);
        return true;
      }
    } catch (e) { /* settings.js lỗi: rơi về nút rời */ }
    try {
      if (window.GMUSIC && typeof window.GMUSIC.mountToggles === 'function') {
        window.GMUSIC.mountToggles(el);
        return true;
      }
    } catch (e) { /* Nhánh 4 chưa sẵn: để trống, không lỗi */ }
    return false;
  }
  window.GAME_mountSndToggles = mountSndToggles;

  /* ---------------- Topbar dùng chung ----------------
     Cách dùng: trang đặt <header id="gtop"></header> (hoặc không đặt gì,
     hàm tự tạo) rồi gọi GAME_topbar('Tiêu đề'). Topbar gồm: logo về hub,
     tiêu đề, chỗ công tắc âm thanh, avatar nhân vật thu nhỏ + tên người
     chơi và cách gọi. Khách: hiện nút "Đăng nhập" trỏ về trang chính
     (../dang-nhap.html) — trong staging đường này chưa tồn tại, khi hợp
     nhất vào repo gốc sẽ đúng.                                        */
  function GAME_topbar(title, opts) {
    opts = opts || {};
    var host = document.getElementById('gtop');
    if (!host) {
      host = document.createElement('header');
      host.id = 'gtop';
      document.body.insertAdjacentHTML('afterbegin', '');
      document.body.prepend(host);
    }
    host.className = 'gtop';
    host.innerHTML =
      '<a class="gtop-logo" href="index.html" aria-label="Về sảnh game">🗾</a>' +
      '<a class="gtop-title grow" href="index.html">' + esc(title || 'Hành trình đến Edo') + '</a>' +
      '<a class="gtop-course" href="../index.html" aria-label="Quay lại khóa học">← <span>Về khóa học</span></a>' +
      (opts.back ? '<a class="gtop-back" href="index.html">← Sảnh</a>' : '') +
      '<div id="sndToggles" class="snd-toggles" aria-label="Âm thanh"></div>' +
      '<div class="gtop-user" id="gtopUser"><span class="gtop-ava" id="gtopAva"></span>' +
      '<span class="gtop-who"><b id="gtopName">…</b><small id="gtopSub">Đang tải…</small></span></div>';
    paintTopAvatar();
    function paintTopUser(u) {
      var nameEl = document.getElementById('gtopName');
      var subEl = document.getElementById('gtopSub');
      if (!nameEl || !subEl) return;
      if (u && u.loggedIn) {
        nameEl.textContent = u.name || 'Học viên';
        subEl.textContent = (u.level ? u.level + ' · ' : '') + 'Chào ' + u.call + '!';
      } else {
        nameEl.textContent = 'Khách';
        subEl.innerHTML = '<a href="../dang-nhap.html">Đăng nhập</a> để lưu điểm';
      }
    }
    GAME_USER.then(paintTopUser);
    // Việc 4 (30/10): tên đổi trong hồ sơ -> chip topbar vẽ lại ngay khi có
    // sự kiện tên mới, không chờ tải lại trang.
    if (!host.dataset.userPaintBound) {
      host.dataset.userPaintBound = '1';
      window.addEventListener('hn-game-user', function (ev) { paintTopUser(ev.detail || GAME_USER_DATA); });
    }
    mountSndToggles();
    if (document.readyState !== 'complete') {
      window.addEventListener('load', function () { setTimeout(mountSndToggles, 300); });
    } else {
      setTimeout(mountSndToggles, 300);
    }
    return host;
  }
  function paintTopAvatar() {
    var el = document.getElementById('gtopAva');
    // Nhánh F: chip topbar dùng hàm mặt dùng chung — đã chọn ảnh hồ sơ
    // thì hiện <img> hồ sơ, chưa chọn/không có thì SVG mặc định.
    if (el) el.innerHTML = faceHTML(GAME_AVATAR.load(), 36);
  }
  document.addEventListener('hn-game-avatar', paintTopAvatar);
  // Ảnh hồ sơ (hoặc lựa chọn mặt) đổi sau khi GAME_USER refresh xong:
  // vẽ lại chip ngay theo sự kiện người dùng, như cơ chế đồng bộ tên.
  window.addEventListener('hn-game-user', paintTopAvatar);
  window.GAME_topbar = GAME_topbar;
  window.topbar = GAME_topbar; // tương thích mã mẫu

  /* ---------------- Tiện ích giao diện nhỏ (từ bản mẫu) ---------------- */
  function segPick(el, cb) {
    if (!el) return;
    el.querySelectorAll('button').forEach(function (b) {
      b.onclick = function () {
        el.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        if (cb) cb(b.dataset.v);
      };
    });
  }
  window.segPick = segPick;
  window.GAME_segPick = segPick;

  window.GAME = {
    endpoint: GAME_ENDPOINT,
    esc: esc, shuffle: shuffle, rnd: rnd, clamp: clamp, cap: cap, ready: ready,
    store: gameStore, api: gameApi, session: gameSession
  };
})();
