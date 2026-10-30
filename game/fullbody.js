/* =====================================================================
   fullbody.js — Hình người TOÀN THÂN cho game "Hành trình đến Edo"
   (Đợt game 5, Nhánh A — theo CONTRACT-B5.md, mục HÌNH NGƯỜI TOÀN THÂN)

   API: window.GBODY = { render(cfg, opts), paint(el, cfg, opts), version }
   - render(cfg, opts) -> '<span class="fb-wrap">…SVG…</span>'
     opts: { height: px (mặc định 180), gear: true|false (mặc định true),
             extraClass: '' }
   - paint(el, cfg, opts): gán render() vào el; cfg.face==='hoso' mà URL
     ảnh chưa resolve thì resolve rồi vẽ lại ĐÚNG el đó (đúng mẫu
     GAME_AVATAR.paintFace trong game.js).

   Hình học CỐ ĐỊNH: viewBox="0 0 200 360", svg class "fb-svg".
   Đầu tâm (100,58) rx40 ry44; cổ y 96–112; vai y≈110, hông y≈205;
   vai tay (68,118)/(132,118); hông chân (86,204)/(114,204).
   Thứ tự vẽ: bóng đổ -> hair-back -> leg-l -> leg-r -> arm-l -> torso
   -> arm-r -> head -> phụ kiện. (Chân vẽ TRƯỚC thân để thân phủ khớp
   hông; tay trái sau lưng, tay phải trước thân.)

   Trang bị: khi window.GGEAR sẵn sàng và opts.gear!==false, lấy
   GGEAR.state(): giáp tô thân theo ARMORS + class gg-armor gg-a-<id>,
   vũ khí <g class="fb-weapon gg-weapon gg-w-<id>"> NẰM TRONG .fb-fore-r,
   phụ kiện khan-do (khăn cổ .ca-flutter/.ca-flutter-tail) / vuong-mien
   (vương miện trên đầu). Không có GGEAR -> giáp theo outfit của cfg +
   kiếm gỗ đơn giản + khăn đỏ mặc định (như GGEAR mặc định).

   Mặt ảnh hồ sơ: cfg.face==='hoso' + GAME_USER_DATA.avatarFile/avatarUrl
   -> <img class="fb-hoso-img"> tròn phủ vùng đầu (tâm 50%/16.1%, đường
   kính 40% bề ngang wrap), onerror tự gỡ -> mặt SVG hiện ra. TUYỆT ĐỐI
   không lưu URL tạm vào cấu hình.

   Mọi truy cập GGEAR / GAME_AVATAR / GAME_USER_DATA đều guard typeof —
   thiếu bất kỳ global nào render vẫn chạy, không ném lỗi.
   ===================================================================== */
(function () {
  'use strict';

  var VERSION = '1.1-b6-headturn';

  /* ---------------- Danh sách dự phòng (khớp game.js) ---------------- */
  var SKINS = ['#ffe3c2', '#f2c79b', '#c68863', '#8d5524'];
  var HAIRCOLORS = ['#2b2118', '#5b3a1e', '#a83232', '#d9a84e', '#7c5cff', '#22d3ee'];
  var HAIRS = ['ngan', 'dai', 'xoan', 'bui', 'hai-mai'];
  var OUTFITS = {
    neon:     { main: '#233d63', sub: '#22d3ee' },
    yukata:   { main: '#cf3a2e', sub: '#ffb7c5' },
    giap:     { main: '#374151', sub: '#d9a84e' },
    dongphuc: { main: '#f4f1ea', sub: '#cf3a2e' },
    choang:   { main: '#3a1d5c', sub: '#7c5cff' }
  };
  var PANTS = '#2e3a52', PANTS_D = '#26314a', SHOE = '#4a3220', SHOE_D = '#33241a';

  /* ---------------- ĐỢT 6 (O2): Tủ đồ — costume + hat ----------------
     HEAD_IDS: 4 món đầu ĐÃ có hình accSVG từ đợt 5 (xem CONTRACT-B6,
     "QUY TẮC ƯU TIÊN ĐẦU"). HAT_NEW_IDS: 5 mũ vẽ mới trong hatSVG(). */
  var HEAD_IDS = ['non-la', 'bang-tran', 'mat-na', 'vuong-mien'];
  var HAT_NEW_IDS = ['mu-luoi-trai', 'mu-len', 'tai-meo', 'mu-bao-hiem', 'mu-cao-boi'];
  var HAT_FALLBACK_COLORS = {
    'mu-luoi-trai': '#2563eb', 'mu-len': '#e0452f', 'tai-meo': '#2b2118',
    'mu-bao-hiem': '#f59e0b', 'mu-cao-boi': '#b45309',
    'non-la': '#d9b36a', 'bang-tran': '#3b5bdb', 'mat-na': '#e0452f', 'vuong-mien': '#ffd84e'
  };
  /* Bảng vẽ nội bộ cho 8 bộ trang phục (mac-dinh KHÔNG có ở đây: không
     vẽ gì thêm, giáp hiện tại hiện nguyên như đợt 5). style = khoá chi
     tiết phân biệt trong torsoSVG/armSVG. Riêng 'the-thao': pantsD
     được render() thay bằng cfg.skin (quần đùi -> cẳng chân màu da). */
  var COSTUME_ART = {
    'dong-phuc':  { main: '#2e4a7a', sub: '#cf3a2e', pants: '#2e3a52', pantsD: '#26314a', style: 'dong-phuc' },
    'hoodie':     { main: '#ff8a3d', sub: '#c2410c', pants: '#3a4a5f', pantsD: '#2f3c4e', style: 'hoodie' },
    'the-thao':   { main: '#2563eb', sub: '#ffffff', pants: '#1d4ed8', pantsD: '#1e40af', style: 'the-thao' },
    'jean':       { main: '#3b6ea5', sub: '#ffffff', pants: '#2f5d8a', pantsD: '#274e75', style: 'jean' },
    'bo-yukata':  { main: '#4f7fc4', sub: '#e0452f', pants: '#3a639e', pantsD: '#2f5285', style: 'bo-yukata' },
    'bo-kimono':  { main: '#7c2d5e', sub: '#d9a84e', pants: '#5b2144', pantsD: '#4a1b38', style: 'bo-kimono' },
    'bo-ninja':   { main: '#232833', sub: '#0f1218', pants: '#1a1e28', pantsD: '#141821', style: 'bo-ninja' },
    'bo-samurai': { main: '#b91c1c', sub: '#1e3a5f', pants: '#1e3a5f', pantsD: '#172e4d', style: 'bo-samurai' }
  };
  var DEFAULT_CFG = { gender: 'nam', hair: 'ngan', skin: '#f2c79b', hairColor: '#2b2118', outfit: 'neon', cls: 'ninja', pet: 'meo', face: 'mascot', faceFile: null };

  function escLocal(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function esc(s) {
    try { if (typeof window.esc === 'function') return window.esc(s); } catch (e) { /* rơi về local */ }
    return escLocal(s);
  }
  function sanitize(raw) {
    try {
      if (window.GAME_AVATAR && typeof window.GAME_AVATAR.sanitize === 'function') {
        return window.GAME_AVATAR.sanitize(raw);
      }
    } catch (e) { /* dùng bản local */ }
    var c = (raw && typeof raw === 'object') ? raw : {};
    return {
      gender: c.gender === 'nu' ? 'nu' : 'nam',
      hair: HAIRS.indexOf(c.hair) >= 0 ? c.hair : DEFAULT_CFG.hair,
      skin: SKINS.indexOf(c.skin) >= 0 ? c.skin : DEFAULT_CFG.skin,
      hairColor: HAIRCOLORS.indexOf(c.hairColor) >= 0 ? c.hairColor : DEFAULT_CFG.hairColor,
      outfit: OUTFITS[c.outfit] ? c.outfit : DEFAULT_CFG.outfit,
      cls: typeof c.cls === 'string' && c.cls ? c.cls : DEFAULT_CFG.cls,
      pet: typeof c.pet === 'string' && c.pet ? c.pet : DEFAULT_CFG.pet,
      face: c.face === 'hoso' ? 'hoso' : 'mascot',
      faceFile: (typeof c.faceFile === 'string' && c.faceFile) ? c.faceFile : null
    };
  }
  function loadCfg(raw) {
    if (raw && typeof raw === 'object') return sanitize(raw);
    try {
      if (window.GAME_AVATAR && typeof window.GAME_AVATAR.load === 'function') return sanitize(window.GAME_AVATAR.load());
    } catch (e) { /* mặc định */ }
    return sanitize(DEFAULT_CFG);
  }
  function userData() {
    try { return window.GAME_USER_DATA || null; } catch (e) { return null; }
  }

  /* --------------------------- Trang bị --------------------------- */
  // Trả {weaponId, armorId, armorColor, accId, accColor, extraId,
  // extraColor, costumeId, costumeColor, hatId, hatColor} hoặc null.
  // ĐỢT 6 (O2): đọc thêm st.costume/st.hat (guard typeof như mọi chỗ);
  // save cũ không có 2 trường này -> 'mac-dinh'/'none' (hồi quy đợt 5).
  // Id lạ -> rơi về mặc định. Màu tra trong GGEAR.COSTUMES/HATS nếu có;
  // danh mục chưa có (gear.js cũ) thì id vẫn chỉ được công nhận khi nằm
  // trong bảng vẽ nội bộ COSTUME_ART / danh sách mũ đã biết.
  function gearState(useGear) {
    if (!useGear) return null;
    try {
      if (window.GGEAR && typeof window.GGEAR.state === 'function') {
        var st = window.GGEAR.state();
        if (st && typeof st === 'object') {
          var cat = { weapons: window.GGEAR.WEAPONS || [], armors: window.GGEAR.ARMORS || [], accs: window.GGEAR.ACCS || [], extras: window.GGEAR.EXTRAS || [], costumes: (typeof window.GGEAR.COSTUMES !== 'undefined' && window.GGEAR.COSTUMES) || [], hats: (typeof window.GGEAR.HATS !== 'undefined' && window.GGEAR.HATS) || [] };
          var find = function (list, id, def) {
            for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
            return def;
          };
          var w = find(cat.weapons, st.weapon, { id: 'kiem-go', color: '#a9743f' });
          var a = find(cat.armors, st.armor, { id: 'giap-vai', color: '#5b8a72' });
          var ac = st.acc === 'none' ? null : find(cat.accs, st.acc, null);
          /* BATCH5-M (ghép coordinator): kind 'extra' — choàng/găng/giày */
          var ex = (!st.extra || st.extra === 'none') ? null : find(cat.extras, st.extra, null);
          /* ĐỢT 6 (O2): costume + hat */
          var co = (typeof st.costume === 'string' && st.costume) ? find(cat.costumes, st.costume, null) : null;
          var costumeId = 'mac-dinh';
          if (co) costumeId = co.id;
          else if (typeof st.costume === 'string' && COSTUME_ART[st.costume]) costumeId = st.costume;
          var costumeColor = co ? (co.color || null) : (COSTUME_ART[costumeId] ? COSTUME_ART[costumeId].main : null);
          var ha = (typeof st.hat === 'string' && st.hat) ? find(cat.hats, st.hat, null) : null;
          var hatId = 'none';
          if (ha) hatId = ha.id;
          else if (typeof st.hat === 'string' && (HEAD_IDS.indexOf(st.hat) >= 0 || HAT_NEW_IDS.indexOf(st.hat) >= 0)) hatId = st.hat;
          var hatColor = ha ? (ha.color || null) : (HAT_FALLBACK_COLORS[hatId] || null);
          return {
            weaponId: w.id, armorId: a.id, armorColor: a.color,
            accId: ac ? ac.id : null, accColor: ac ? ac.color : null,
            extraId: ex ? ex.id : null, extraColor: ex ? ex.color : null,
            costumeId: costumeId, costumeColor: costumeColor,
            hatId: hatId, hatColor: hatColor, fromGear: true
          };
        }
      }
    } catch (e) { /* rơi về mặc định outfit */ }
    return null;
  }

  /* ----------------------------- Tóc ----------------------------- */
  // Tọa độ theo mặt mới: tâm (100,58), rx40 ry44 (đỉnh đầu y=14).
  function hairBackSVG(cfg) {
    if (cfg.hair !== 'dai' && cfg.hair !== 'hai-mai') return '';
    return '<path class="ca-hair-back" d="M60 72 Q52 148 60 198 L140 198 Q148 148 140 72 Q144 18 100 16 Q56 18 60 72 Z" fill="' + cfg.hairColor + '"/>';
  }
  function hairTopSVG(cfg, of) {
    var hc = cfg.hairColor;
    if (cfg.hair === 'ngan') {
      return '<path d="M63 68 Q57 16 100 14 Q143 16 137 68 Q133 45 115 39 Q123 51 117 55 Q101 37 81 45 Q67 50 63 68 Z" fill="' + hc + '"/>';
    }
    if (cfg.hair === 'dai') {
      return '<path d="M61 70 Q55 14 100 12 Q145 14 139 70 Q135 42 117 37 Q99 31 82 39 Q66 46 61 70 Z" fill="' + hc + '"/>' +
        '<path d="M64 66 Q78 50 86 58 Q74 68 70 80 Z" fill="' + hc + '"/>' +
        '<path d="M136 66 Q122 50 114 58 Q126 68 130 80 Z" fill="' + hc + '"/>';
    }
    if (cfg.hair === 'xoan') {
      return '<g fill="' + hc + '">' +
        '<circle cx="68" cy="44" r="13"/><circle cx="85" cy="32" r="14"/><circle cx="103" cy="30" r="14"/>' +
        '<circle cx="120" cy="33" r="13"/><circle cx="134" cy="47" r="12"/><circle cx="61" cy="62" r="9"/><circle cx="139" cy="64" r="9"/></g>' +
        '<path d="M64 58 Q100 36 136 58 Q126 44 100 42 Q74 44 64 58 Z" fill="' + hc + '"/>';
    }
    if (cfg.hair === 'bui') {
      return '<circle cx="100" cy="9" r="12" fill="' + hc + '"/>' +
        '<path d="M63 68 Q59 20 100 18 Q141 20 137 68 Q131 44 112 39 Q91 35 75 43 Q65 49 63 68 Z" fill="' + hc + '"/>' +
        '<circle cx="100" cy="9" r="5" fill="' + of.sub + '"/>';
    }
    // hai-mai
    return '<path d="M62 69 Q56 16 100 14 Q144 16 138 69 Q134 44 117 38 L115 84 L107 84 L109 47 Q100 42 91 47 L93 84 L85 84 L83 38 Q66 44 62 69 Z" fill="' + hc + '"/>';
  }

  /* ----------------------------- Đầu ----------------------------- */
  function headSVG(cfg, of) {
    var sk = cfg.skin, hc = cfg.hairColor;
    var blush = cfg.gender === 'nu'
      ? '<ellipse cx="72" cy="76" rx="7" ry="4" fill="#ff9db0" opacity=".75"/><ellipse cx="128" cy="76" rx="7" ry="4" fill="#ff9db0" opacity=".75"/>'
      : '';
    var lash = cfg.gender === 'nu'
      ? '<path d="M80 60 q-3.4 -2.6 -6 -1.6 M120 60 q3.4 -2.6 6 -1.6" stroke="#2b2118" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
      : '';
    return '<g class="fb-head">' +
      // cổ (y 96–112) — vẽ trong nhóm đầu để đầu gật là cổ đi theo
      '<rect x="91" y="96" width="18" height="17" rx="6" fill="' + sk + '"/>' +
      '<ellipse cx="60" cy="62" rx="6" ry="9" fill="' + sk + '"/><ellipse cx="140" cy="62" rx="6" ry="9" fill="' + sk + '"/>' +
      '<ellipse cx="100" cy="58" rx="40" ry="44" fill="' + sk + '"/>' +
      '<g class="ca-hair">' + hairTopSVG(cfg, of) + '</g>' +
      /* ĐỢT 6 (prep): cụm nét mặt gói trong .fb-gaze để Việc N dịch
         điểm nhìn theo góc quay đầu (--fbhtn do JS đặt trên .fb-wrap). */
      '<g class="fb-gaze">' +
      '<g class="ca-eye ca-eye-l"><ellipse cx="85" cy="62" rx="4.8" ry="6.2" fill="#241a12"/><circle cx="86.8" cy="59.5" r="1.8" fill="#fff"/></g>' +
      '<g class="ca-eye ca-eye-r"><ellipse cx="115" cy="62" rx="4.8" ry="6.2" fill="#241a12"/><circle cx="116.8" cy="59.5" r="1.8" fill="#fff"/></g>' + lash +
      '<path d="M76 49 Q84 44 92 49 M108 49 Q116 44 124 49" stroke="' + hc + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      blush +
      '<path d="M93 85 Q100 90 107 85" stroke="#b3543f" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '</g>';
  }

  /* ----------------------------- Tay ----------------------------- */
  // Vai trái (68,118) / phải (132,118); cánh tay trên ~50, cẳng ~44.
  function armSVG(side, sleeveColor, skin, weaponInner, glove, style) {
    var L = side === 'l';
    var cx = L ? 68 : 132;
    var x0 = cx - 8, x1 = cx + 8;
    var upper;
    if (style === 'bo-kimono') {
      /* ĐỢT 6 (O2): tay áo kimono PHÌNH — ống rộng hơn hẳn tay thường. */
      upper = '<path d="M' + (x0 - 6) + ' 114 Q' + cx + ' 106 ' + (x1 + 6) + ' 114 L' + (cx + (L ? 12 : -12)) + ' 168 Q' + cx + ' 175 ' + (cx + (L ? -12 : 12)) + ' 168 Z" fill="' + sleeveColor + '"/>';
    } else {
      upper = '<path d="M' + x0 + ' 116 Q' + cx + ' 109 ' + x1 + ' 116 L' + (cx + (L ? 6 : -6)) + ' 166 Q' + cx + ' 171 ' + (cx + (L ? -6 : 6)) + ' 166 Z" fill="' + sleeveColor + '"/>';
    }
    if (style === 'the-thao') {
      /* ĐỢT 6 (O2): 3 sọc trắng trên ống tay thể thao. */
      upper += '<path d="M' + (cx - 7) + ' 126 L' + (cx + 7) + ' 126 M' + (cx - 7) + ' 134 L' + (cx + 7) + ' 134 M' + (cx - 7) + ' 142 L' + (cx + 7) + ' 142" stroke="#ffffff" stroke-width="2.4" fill="none" opacity=".92"/>';
    }
    /* BATCH5-M: găng thép -> bàn tay phủ thép + khớp đốt */
    var hand = glove
      ? '<circle class="gg-x gg-x-gang-thep" cx="' + cx + '" cy="214" r="8" fill="#aab6c6" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>' +
        '<path d="M' + (cx - 5) + ' 210 L' + (cx + 5) + ' 210 M' + (cx - 5) + ' 215 L' + (cx + 5) + ' 215" stroke="rgba(0,0,0,.3)" stroke-width="1.4"/>'
      : '<circle cx="' + cx + '" cy="214" r="7.5" fill="' + skin + '"/>';
    var fore = '<g class="fb-fore-' + side + '">' +
      (weaponInner || '') +
      '<path d="M' + (cx - 6) + ' 164 L' + (cx + 6) + ' 164 L' + (cx + (L ? 5 : -5)) + ' 207 Q' + cx + ' 212 ' + (cx + (L ? -5 : 5)) + ' 207 Z" fill="' + skin + '"/>' +
      hand +
      '</g>';
    return '<g class="fb-arm-' + side + '">' + upper + fore + '</g>';
  }

  /* ----------------------------- Chân ----------------------------- */
  // Hông trái (86,204) / phải (114,204); đùi ~58, cẳng ~56, giày cuối chân.
  function legSVG(side, wind, pants, pantsD) {
    var L = side === 'l';
    var cx = L ? 86 : 114;
    /* ĐỢT 6 (O2): màu quần truyền vào; không truyền -> giữ PANTS/PANTS_D
       của đợt 5 nguyên xi (tương thích lời gọi cũ). */
    var pFill = pants || PANTS, pdFill = pantsD || PANTS_D;
    /* BATCH5-M: giày gió -> thân giày xanh gió + cánh nhỏ sau gót */
    var shoeFill = wind ? '#2fbf71' : SHOE;
    var wing = wind ? '<path class="gg-x gg-x-giay-gio" d="M' + (cx - 9) + ' 318 q-9 -3 -12 -10 q8 0 12 4 Z" fill="#2fbf71" stroke="rgba(0,0,0,.25)"/>' : '';
    var thigh = '<path d="M' + (cx - 9) + ' 202 L' + (cx + 9) + ' 202 L' + (cx + 7) + ' 258 Q' + cx + ' 263 ' + (cx - 7) + ' 258 Z" fill="' + pFill + '"/>';
    var shin = '<g class="fb-shin-' + side + '">' +
      '<path d="M' + (cx - 7) + ' 256 L' + (cx + 7) + ' 256 L' + (cx + 6) + ' 314 Q' + cx + ' 319 ' + (cx - 6) + ' 314 Z" fill="' + pdFill + '"/>' +
      wing +
      // giày: mũi tròn hướng về trước + đế
      '<path d="M' + (cx - 8) + ' 312 L' + (cx + 8) + ' 312 L' + (cx + 11) + ' 328 Q' + (cx + 11) + ' 334 ' + (cx + 4) + ' 334 L' + (cx - 6) + ' 334 Q' + (cx - 10) + ' 334 ' + (cx - 9) + ' 327 Z" fill="' + shoeFill + '"/>' +
      '<path d="M' + (cx - 9) + ' 330 L' + (cx + 11) + ' 330 L' + (cx + 11) + ' 334 Q' + cx + ' 337 ' + (cx - 9) + ' 334 Z" fill="' + SHOE_D + '"/>' +
      '</g>';
    return '<g class="fb-leg-' + side + '">' + thigh + shin + '</g>';
  }

  /* ---------------------------- Vũ khí ---------------------------- */
  // Vẽ quanh bàn tay phải (132,214); nằm TRONG .fb-fore-r nên vung theo tay.
  function weaponSVG(weaponId) {
    var inner;
    if (weaponId === 'kiem-lua') {
      inner = '<path d="M132 200 q9 12 0 24 q-9 -12 0 -24 Z" fill="#ffcf3f" opacity=".9"/>' +
        '<path d="M125 218 L139 218 L137 268 Q132 276 127 268 Z" fill="#ff7a2a" stroke="#c24e0e" stroke-width="1.4"/>' +
        '<path d="M132 222 L132 264" stroke="#ffd23f" stroke-width="2.4"/>' +
        '<path d="M132 196 L132 276" stroke="#ffb347" stroke-width="15" opacity=".28" stroke-linecap="round"/>';
    } else if (weaponId === 'kiem-thep') {
      inner = '<path d="M126 218 L138 218 L136 266 Q132 273 128 266 Z" fill="#d7dee9" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>' +
        '<path d="M132 221 L132 262" stroke="#ffffff" stroke-width="2" opacity=".85"/>';
    } else if (weaponId === 'kiem-bang') { // BATCH5-M
      inner = '<path d="M126 218 L138 218 L136 266 Q132 273 128 266 Z" fill="#a5e8fb" stroke="#3d9dbd" stroke-width="1.2"/>' +
        '<path d="M132 221 L132 262" stroke="#eafcff" stroke-width="2" opacity=".9"/>' +
        '<path d="M128 232 l4 -6 l4 6 l-4 6 Z M129 248 l3 -4 l3 4 l-3 4 Z" fill="#67e8f9" opacity=".85"/>';
    } else if (weaponId === 'kiem-set') { // BATCH5-M
      inner = '<path d="M126 218 L138 218 L136 266 Q132 273 128 266 Z" fill="#fde047" stroke="#b8860b" stroke-width="1.2"/>' +
        '<path d="M134 224 l-5 12 l4 0 l-5 12 l10 -14 l-4 0 l5 -10 Z" fill="#facc15" stroke="#b8860b" stroke-width=".8"/>';
    } else { // kiem-go (mặc định)
      inner = '<path d="M126 218 L138 218 L137 264 Q132 270 127 264 Z" fill="#a9743f" stroke="#7c5227" stroke-width="1.2"/>' +
        '<path d="M132 221 L132 260" stroke="#c08b4e" stroke-width="2"/>';
    }
    var grip = '<rect x="123" y="212" width="18" height="6" rx="3" fill="#d9a84e" stroke="rgba(0,0,0,.3)"/>' +
      '<rect x="129" y="200" width="6" height="13" rx="3" fill="#5a3a22"/>';
    return '<g class="fb-weapon gg-weapon gg-w-' + weaponId + '" transform="rotate(14 132 214)">' + grip + inner + '</g>';
  }

  /* ----------------------------- Thân ----------------------------- */
  // Thân: vai y≈110, hông y≈205, x 70–130. Giáp (gear) tô theo bậc +
  // chi tiết phân bậc; không gear -> outfit cfg + họa tiết sub.
  function torsoSVG(cfg, of, gear, art) {
    var fill = art ? art.main : (gear ? gear.armorColor : of.main);
    /* ĐỢT 6 (O2): có costume -> nhóm thân mang gg-costume gg-c-<id> để
       harness đếm/đo được; bỏ hẳn chi tiết giáp (nhánh gear bên dưới). */
    var s = '<g class="fb-torso' + (art ? ' gg-costume gg-c-' + art.style : (gear ? ' gg-armor gg-a-' + gear.armorId : '')) + '">';
    if (art && art.style === 'hoodie') {
      /* Mũ trùm hoodie: QUYẾT ĐỊNH O2 — vẽ trong nhóm THÂN, ngay TRƯỚC
         path thân chính, vòng sau cổ (y 90–118). Nhóm đầu vẽ sau nên đầu/
         cổ phủ phần giữa, chỉ còn vành mũ trùm lộ sau cổ + trên vai —
         đúng vị trí mũ trùm thả sau gáy, không cần đụng .fb-headturn. */
      s += '<path class="gg-hood" d="M74 118 Q70 90 100 88 Q130 90 126 118 Q114 103 100 103 Q86 103 74 118 Z" fill="' + art.sub + '" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>';
    }
    s += '<path d="M74 114 Q100 105 126 114 L123 200 Q100 209 77 200 Z" fill="' + fill + '"/>';
    if (art) {
      s += costumeDetailSVG(art);
      if (art.style === 'bo-yukata' || art.style === 'bo-kimono') {
        /* Đai obi thay thắt lưng: dải ngang y 188–203 màu sub + nút
           thắt gợi ý lệch phải (phần sau lưng khuất nên chỉ gợi mép). */
        s += '<path d="M77 188 L123 188 L122 203 Q100 209 78 203 Z" fill="' + art.sub + '" stroke="rgba(0,0,0,.25)" stroke-width="1"/>' +
          '<path d="M118 190 l10 4 l-3 9 l-9 -4 Z" fill="' + art.sub + '" stroke="rgba(0,0,0,.3)" stroke-width="1"/>' +
          '<rect x="94" y="190" width="12" height="11" rx="2" fill="rgba(0,0,0,.18)"/>' +
          '</g>';
        return s;
      }
      s += '<path d="M77 192 L123 192 L122 203 Q100 209 78 203 Z" fill="#26314a"/>' +
        '<rect x="93" y="193" width="14" height="9" rx="2" fill="#d9a84e" stroke="rgba(0,0,0,.3)"/>' +
        '</g>';
      return s;
    }
    if (gear && gear.armorId === 'giap-vai') {
      s += '<path d="M82 124 L118 124 L116 188 Q100 195 84 188 Z" fill="' + gear.armorColor + '" opacity=".95"/>' +
        '<path d="M86 140 L114 140 M87 156 L113 156 M88 172 L112 172" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-dasharray="4 3" fill="none"/>';
    } else if (gear && (gear.armorId === 'giap-thep' || gear.armorId === 'giap-rong' || gear.armorId === 'giap-bang' || gear.armorId === 'giap-thien-loi')) {
      var rong = gear.armorId === 'giap-rong';
      var gem = rong ? '#ffcf3f' : (gear.armorId === 'giap-bang' ? '#eafcff' : (gear.armorId === 'giap-thien-loi' ? '#fde047' : '#22d3ee'));
      s += '<path d="M100 118 L121 126 L118 190 Q100 198 82 190 L79 126 Z" fill="' + gear.armorColor + '" stroke="rgba(0,0,0,.32)" stroke-width="1.5"/>' +
        '<path d="M100 118 L100 196 M82 160 L118 160" stroke="rgba(0,0,0,.22)" stroke-width="2" fill="none"/>' +
        '<circle cx="87" cy="134" r="2.4" fill="rgba(0,0,0,.4)"/><circle cx="113" cy="134" r="2.4" fill="rgba(0,0,0,.4)"/>' +
        (rong ? '<circle cx="100" cy="160" r="11" fill="#ff7a45" opacity=".45"/>' : '') +
        '<circle cx="100" cy="160" r="6" fill="' + gem + '" stroke="rgba(0,0,0,.3)"/>' +
        (rong ? '<path d="M84 140 q4 -6 8 0 M108 140 q4 -6 8 0 M92 178 q4 -6 8 0" stroke="#ffd23f" stroke-width="2" fill="none" opacity=".8"/>' : '') +
        (gear.armorId === 'giap-bang' ? '<path d="M86 138 l4 -6 l4 6 l-4 5 Z M106 138 l4 -6 l4 6 l-4 5 Z" fill="#eafcff" opacity=".85"/>' : '') +
        (gear.armorId === 'giap-thien-loi' ? '<path d="M97 130 l7 0 l-4 8 l6 0 l-9 12 l2 -9 l-6 0 Z" fill="#fde047" stroke="#b8860b" stroke-width=".7"/>' : '');
    } else if (!gear) {
      s += '<path d="M100 122 L85 144 L100 166 L115 144 Z" fill="' + of.sub + '" opacity=".92"/>' +
        '<path d="M85 144 L100 166 L115 144 L115 198 L85 198 Z" fill="' + of.main + '" opacity=".5"/>';
    }
    // thắt lưng + khóa
    s += '<path d="M77 192 L123 192 L122 203 Q100 209 78 203 Z" fill="#26314a"/>' +
      '<rect x="93" y="193" width="14" height="9" rx="2" fill="#d9a84e" stroke="rgba(0,0,0,.3)"/>' +
      '</g>';
    return s;
  }

  /* ------------------ ĐỢT 6 (O2): chi tiết trang phục ------------------ */
  // Chi tiết phân biệt tối thiểu mỗi style (vẽ trên path thân chính,
  // TRƯỚC thắt lưng/obi do torsoSVG thêm sau).
  function costumeDetailSVG(art) {
    var st = art.style, sub = art.sub;
    if (st === 'dong-phuc') {
      // Cổ áo trắng chữ V + cà vạt đỏ (sub) + nút áo.
      return '<path d="M86 112 L100 134 L114 112 L107 110 L100 124 L93 110 Z" fill="#ffffff" stroke="rgba(0,0,0,.15)"/>' +
        '<path d="M100 122 L96 131 L100 150 L104 131 Z" fill="' + sub + '" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>' +
        '<circle cx="100" cy="121" r="3" fill="' + sub + '"/>' +
        '<path d="M84 118 L84 186 M116 118 L116 186" stroke="rgba(0,0,0,.18)" stroke-width="1.6" fill="none"/>';
    }
    if (st === 'hoodie') {
      // Túi kangaroo trước bụng + dây rút ở cổ.
      return '<rect x="82" y="156" width="36" height="27" rx="7" fill="rgba(0,0,0,.13)" stroke="rgba(0,0,0,.28)" stroke-width="1.4"/>' +
        '<path d="M94 118 L94 130 M106 118 L106 130" stroke="' + sub + '" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="94" cy="132" r="2" fill="#ffffff"/><circle cx="106" cy="132" r="2" fill="#ffffff"/>';
    }
    if (st === 'the-thao') {
      // 3 sọc trắng chạy dọc ngực (cùng hệ 3 sọc trên ống tay ở armSVG).
      return '<path d="M86 116 L90 188 M93 114 L97 189 M79 120 L82 186" stroke="#ffffff" stroke-width="2.2" fill="none" opacity=".85"/>' +
        '<path d="M114 116 L110 188 M107 114 L103 189 M121 120 L118 186" stroke="#ffffff" stroke-width="2.2" fill="none" opacity=".85"/>';
    }
    if (st === 'jean') {
      // Khoác jean mở + áo trắng giữa ngực (tam giác) + đường chỉ vàng.
      return '<path d="M89 112 L111 112 L104 168 L96 168 Z" fill="#ffffff"/>' +
        '<path d="M89 112 L100 142 L96 190 M111 112 L100 142 L104 190" stroke="#d9a84e" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>' +
        '<circle cx="86" cy="150" r="1.8" fill="#d9a84e"/><circle cx="114" cy="150" r="1.8" fill="#d9a84e"/>';
    }
    if (st === 'bo-yukata') {
      // Hoa văn chấm/hoa nhỏ trên nền + vạt cổ chéo nhẹ.
      return '<g fill="#ffffff" opacity=".55"><circle cx="86" cy="132" r="2.4"/><circle cx="112" cy="140" r="2.4"/><circle cx="94" cy="156" r="2.4"/><circle cx="116" cy="168" r="2.2"/><circle cx="84" cy="172" r="2.2"/><circle cx="102" cy="124" r="2"/></g>' +
        '<g fill="#ffb7c5" opacity=".8"><circle cx="105" cy="148" r="3"/><circle cx="88" cy="146" r="2.6"/></g>' +
        '<path d="M86 112 L116 150 M114 112 L84 150" stroke="rgba(255,255,255,.5)" stroke-width="2.4" fill="none"/>';
    }
    if (st === 'bo-kimono') {
      // Hai vạt chéo qua ngực (2 path chéo đối nhau, viền sub).
      return '<path d="M80 110 L122 162 L114 170 L74 120 Z" fill="rgba(255,255,255,.20)" stroke="' + sub + '" stroke-width="1.4"/>' +
        '<path d="M120 110 L78 162 L86 170 L126 120 Z" fill="rgba(0,0,0,.18)" stroke="' + sub + '" stroke-width="1.4"/>';
    }
    if (st === 'bo-ninja') {
      // Dây chéo ngực (X) màu sub gần như đen + khoá nhỏ giữa ngực.
      return '<path d="M80 116 L120 178 M120 116 L80 178" stroke="' + sub + '" stroke-width="7" fill="none" opacity=".9"/>' +
        '<path d="M80 116 L120 178 M120 116 L80 178" stroke="rgba(255,255,255,.14)" stroke-width="1.6" fill="none"/>' +
        '<rect x="94" y="140" width="12" height="12" rx="2" fill="#39404e" stroke="rgba(255,255,255,.25)"/>';
    }
    if (st === 'bo-samurai') {
      // Giáp lamellar: 3 dải ngang có chấm rivet + 2 miếng vai phình.
      var bands = '';
      var rows = [128, 146, 164];
      for (var i = 0; i < rows.length; i++) {
        var y = rows[i];
        bands += '<path d="M79 ' + y + ' L121 ' + y + ' L120 ' + (y + 13) + ' Q100 ' + (y + 18) + ' 80 ' + (y + 13) + ' Z" fill="' + (i % 2 ? sub : art.main) + '" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>';
        bands += '<circle cx="88" cy="' + (y + 7) + '" r="1.7" fill="#ffd84e"/><circle cx="100" cy="' + (y + 8) + '" r="1.7" fill="#ffd84e"/><circle cx="112" cy="' + (y + 7) + '" r="1.7" fill="#ffd84e"/>';
      }
      return '<path d="M74 112 Q60 114 58 128 Q70 134 80 126 Q82 116 74 112 Z" fill="' + sub + '" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>' +
        '<path d="M126 112 Q140 114 142 128 Q130 134 120 126 Q118 116 126 112 Z" fill="' + sub + '" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>' + bands;
    }
    return '';
  }

  /* --------------------- ĐỢT 6 (O2): mũ mới + bịt mặt --------------------- */
  /* hatSVG: CHỈ vẽ 5 mũ MỚI. 4 món HEAD_IDS không vẽ ở đây — render()
     ánh xạ sang accSVG cũ qua effAccId (hình + class giữ nguyên đợt 5).
     VÙNG AN TOÀN: mọi path chính nằm ở y <= 40 (trên trán/đỉnh đầu) —
     mũ len/cap có vành tới y 38 vẫn <= 40; tai mèo ở đỉnh; riêng quai
     mũ bảo hiểm là NGOẠI LỆ hợp đồng: 2 path mảnh ở x 59/141 (ngoài
     vùng mặt giữa x 62–138) kéo xuống y 66 làm quai cằm. Không path
     nào phủ vùng mặt chính (x 62–138, y 40–100). */
  function hatSVG(hatId, hatColor) {
    if (!hatId || HAT_NEW_IDS.indexOf(hatId) < 0) return '';
    var c = hatColor || HAT_FALLBACK_COLORS[hatId] || '#888888';
    var inner = '';
    if (hatId === 'mu-luoi-trai') {
      inner = '<path d="M64 34 Q66 8 100 8 Q134 8 136 34 Q100 24 64 34 Z" fill="' + c + '" stroke="rgba(0,0,0,.28)" stroke-width="1.4"/>' +
        '<ellipse cx="100" cy="34" rx="42" ry="5" fill="' + c + '" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>' +
        '<circle cx="100" cy="9" r="3.6" fill="rgba(0,0,0,.28)"/>' +
        '<path d="M100 10 L100 26 M78 14 Q84 24 84 30 M122 14 Q116 24 116 30" stroke="rgba(0,0,0,.22)" stroke-width="1.4" fill="none"/>';
    } else if (hatId === 'mu-len') {
      inner = '<path d="M63 36 Q62 4 100 4 Q138 4 137 36 Q100 27 63 36 Z" fill="' + c + '" stroke="rgba(0,0,0,.25)" stroke-width="1.4"/>' +
        '<path d="M63 30 Q100 21 137 30 L137 38 Q100 29 63 38 Z" fill="rgba(0,0,0,.20)"/>' +
        '<path d="M72 12 L72 26 M86 8 L86 24 M100 7 L100 23 M114 8 L114 24 M128 12 L128 26" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>' +
        '<circle cx="100" cy="6" r="5" fill="#ffffff" stroke="rgba(0,0,0,.2)"/>';
    } else if (hatId === 'tai-meo') {
      inner = '<path d="M52 28 L58 4 L78 18 Q66 30 52 28 Z" fill="' + c + '" stroke="rgba(0,0,0,.3)" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<path d="M148 28 L142 4 L122 18 Q134 30 148 28 Z" fill="' + c + '" stroke="rgba(0,0,0,.3)" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<path d="M58 22 L61 11 L72 18 Q65 24 58 22 Z" fill="#ff9db0"/>' +
        '<path d="M142 22 L139 11 L128 18 Q135 24 142 22 Z" fill="#ff9db0"/>';
    } else if (hatId === 'mu-bao-hiem') {
      inner = '<path d="M62 32 Q64 2 100 2 Q136 2 138 32 Q100 23 62 32 Z" fill="' + c + '" stroke="rgba(0,0,0,.32)" stroke-width="1.5"/>' +
        '<path d="M76 10 Q88 4 100 5 Q86 10 80 20 Q74 16 76 10 Z" fill="#ffffff" opacity=".55"/>' +
        '<path d="M62 32 Q100 23 138 32 L138 37 Q100 28 62 37 Z" fill="rgba(0,0,0,.22)"/>' +
        /* Quai cằm: NGOẠI LỆ vùng an toàn — 2 bên x 59/141, ngoài vùng mặt giữa. */
        '<path class="gg-hat-strap" d="M59 34 L57 66" stroke="rgba(0,0,0,.5)" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<path class="gg-hat-strap" d="M141 34 L143 66" stroke="rgba(0,0,0,.5)" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (hatId === 'mu-cao-boi') {
      inner = '<path d="M72 28 Q74 2 100 2 Q126 2 128 28 Q114 21 100 21 Q86 21 72 28 Z" fill="' + c + '" stroke="rgba(0,0,0,.3)" stroke-width="1.4"/>' +
        '<path d="M88 6 Q100 12 112 6 Q106 16 100 16 Q94 16 88 6 Z" fill="rgba(0,0,0,.28)"/>' +
        '<ellipse cx="100" cy="31" rx="60" ry="7" fill="' + c + '" stroke="rgba(0,0,0,.32)" stroke-width="1.4"/>' +
        '<path d="M74 24 Q100 17 126 24 L126 28 Q100 21 74 28 Z" fill="rgba(0,0,0,.25)"/>';
    }
    return '<g class="gg-hat gg-h-' + hatId + '">' + inner + '</g>';
  }
  /* Bịt mặt ninja: QUYẾT ĐỊNH O2 — thuộc COSTUME bo-ninja (không phải
     hat) nên vẽ bằng hàm riêng, gọi ở CUỐI nhóm .fb-headturn trong
     render() (sau hatSVG) để chắc chắn NẰM TRÊN mặt + tóc, che mũi/
     miệng (y 76–102). Class gg-ninja-mask để harness/gỡ riêng được. */
  function ninjaMaskSVG(art) {
    var dark = art && art.sub ? art.sub : '#0f1218';
    return '<g class="gg-ninja-mask">' +
      '<path d="M66 76 Q100 86 134 76 L130 100 Q100 110 70 100 Z" fill="' + dark + '" stroke="rgba(255,255,255,.14)" stroke-width="1.2"/>' +
      '<path d="M70 84 Q100 92 130 84" stroke="rgba(255,255,255,.18)" stroke-width="1.6" fill="none"/>' +
      '</g>';
  }

  /* --------------------------- Phụ kiện --------------------------- */
  function accSVG(gear) {
    if (!gear || !gear.accId) return '';
    if (gear.accId === 'khan-do') {
      var c = gear.accColor || '#cf3a2e';
      return '<g class="gg-acc gg-acc-khan-do ca-flutter">' +
        '<path d="M79 103 Q100 114 121 103 L121 115 Q100 126 79 115 Z" fill="' + c + '" stroke="rgba(0,0,0,.18)"/>' +
        '<path class="ca-flutter-tail" d="M83 113 q-4 16 2 29 l11 -3 q-5 -13 -4 -24 Z" fill="' + c + '" stroke="rgba(0,0,0,.2)"/>' +
        '</g>';
    }
    if (gear.accId === 'vuong-mien') {
      var g = gear.accColor || '#ffd84e';
      return '<g class="gg-acc gg-acc-vuong-mien ca-flutter">' +
        '<polygon points="79,22 79,6 90,15 100,2 110,15 121,6 121,22" fill="' + g + '" stroke="#b8860b" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<rect x="79" y="20" width="42" height="5" rx="2" fill="#e8b93c"/>' +
        '<circle cx="100" cy="16" r="3.2" fill="#cf3a2e"/><circle cx="87" cy="18" r="2.2" fill="#22d3ee"/><circle cx="113" cy="18" r="2.2" fill="#22d3ee"/>' +
        '</g>';
    }
    /* BATCH5-M (ghép coordinator): phụ kiện theo cấp trên hình toàn thân */
    if (gear.accId === 'non-la') {
      var nl = gear.accColor || '#d9b36a';
      return '<g class="gg-acc gg-acc-non-la">' +
        '<path d="M100 0 L148 34 Q100 46 52 34 Z" fill="' + nl + '" stroke="#a37f35" stroke-width="1.4"/>' +
        '<path d="M100 0 L100 40 M76 20 L124 20 M64 28 L136 28" stroke="#a37f35" stroke-width="1" opacity=".55" fill="none"/>' +
        '<circle cx="100" cy="2" r="3.4" fill="#a37f35"/>' +
        '</g>';
    }
    if (gear.accId === 'bang-tran') {
      var bt = gear.accColor || '#3b5bdb';
      return '<g class="gg-acc gg-acc-bang-tran ca-flutter">' +
        '<path d="M63 34 Q100 24 137 34 L137 45 Q100 35 63 45 Z" fill="' + bt + '" stroke="rgba(0,0,0,.25)"/>' +
        '<rect x="93" y="29" width="14" height="11" rx="2" fill="#d7dee9" stroke="rgba(0,0,0,.3)"/>' +
        '<path class="ca-flutter-tail" d="M135 38 q12 3 15 13 l-9 3 q-3 -8 -8 -12 Z" fill="' + bt + '" stroke="rgba(0,0,0,.2)"/>' +
        '</g>';
    }
    if (gear.accId === 'mat-na') {
      var mn = gear.accColor || '#e0452f';
      return '<g class="gg-acc gg-acc-mat-na">' +
        '<path d="M104 20 Q138 16 142 44 Q143 62 132 72 L112 58 Q102 40 104 20 Z" fill="' + mn + '" stroke="rgba(0,0,0,.3)" opacity=".96"/>' +
        '<path d="M118 22 q3 -7 9 -8 M132 26 q5 -5 10 -4" stroke="#f4f1ea" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="128" cy="42" r="3.4" fill="#241a12"/><path d="M118 62 q7 5 14 1" stroke="#241a12" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '</g>';
    }
    return '';
  }

  /* BATCH5-M (ghép coordinator): áo choàng đêm — vẽ SAU nền, TRƯỚC chân/tay/thân */
  function capeSVG(gear) {
    if (!gear || gear.extraId !== 'ao-choang-dem') return '';
    var c = gear.extraColor || '#4c3a8f';
    return '<path class="fb-cape gg-x gg-x-ao-choang-dem" d="M76 110 Q100 100 124 110 L138 296 Q119 310 100 304 Q81 310 62 296 Z" fill="' + c + '" opacity=".94"/>' +
      '<path d="M100 106 L100 302" stroke="rgba(255,255,255,.14)" stroke-width="3"/>' +
      '<path d="M76 110 Q100 100 124 110 L126 126 Q100 116 74 126 Z" fill="rgba(255,255,255,.16)"/>';
  }

  /* ----------------------------- render ----------------------------- */
  function render(rawCfg, opts) {
    opts = opts || {};
    var cfg = loadCfg(rawCfg);
    var of = OUTFITS[cfg.outfit] || OUTFITS.neon;
    try {
      if (window.GAME_AVATAR && typeof window.GAME_AVATAR.outfitOf === 'function') {
        var o2 = window.GAME_AVATAR.outfitOf(cfg);
        if (o2 && o2.main) of = { main: o2.main, sub: o2.sub };
      }
    } catch (e) { /* giữ bảng local */ }
    var gear = gearState(opts.gear !== false);
    // Không có GGEAR: mặc định như GGEAR cơ bản — kiếm gỗ + khăn đỏ.
    var effGear = gear || { weaponId: 'kiem-go', armorId: null, armorColor: null, accId: 'khan-do', accColor: '#cf3a2e', costumeId: 'mac-dinh', costumeColor: null, hatId: 'none', hatColor: null, fromGear: false };
    /* ĐỢT 6 (O2): costume hiệu lực (null khi mac-dinh -> vẽ như đợt 5). */
    var costumeId = effGear.costumeId || 'mac-dinh';
    var art = (costumeId !== 'mac-dinh' && COSTUME_ART[costumeId]) ? COSTUME_ART[costumeId] : null;
    var effArt = art;
    if (art && art.style === 'the-thao') {
      // Quần đùi: cẳng chân = màu da (bản sao art, không sửa bảng gốc).
      effArt = { main: art.main, sub: art.sub, pants: art.pants, pantsD: cfg.skin, style: art.style };
    }
    var sleeve = art ? art.main : (gear ? gear.armorColor : of.main);
    var armStyle = art ? art.style : null;
    /* ĐỢT 6 (O2) — QUY TẮC ƯU TIÊN ĐẦU: hat !== 'none' thì mũ THẮNG.
       hat thuộc HEAD_IDS -> effAccId = hat (accSVG vẽ ĐÚNG hình cũ, màu
       lấy từ HATS); hat mới -> acc thuộc HEAD_IDS bị ẩn (null), khan-do
       (không thuộc HEAD_IDS) giữ nguyên. hat === 'none' -> acc như cũ. */
    var hatId = effGear.hatId || 'none';
    var effAccId = effGear.accId, effAccColor = effGear.accColor;
    if (hatId !== 'none') {
      if (HEAD_IDS.indexOf(hatId) >= 0) { effAccId = hatId; effAccColor = effGear.hatColor || effAccColor; }
      else if (effAccId && HEAD_IDS.indexOf(effAccId) >= 0) { effAccId = null; effAccColor = null; }
    }
    var accGear = { weaponId: effGear.weaponId, armorId: effGear.armorId, armorColor: effGear.armorColor, accId: effAccId, accColor: effAccColor, extraId: effGear.extraId, extraColor: effGear.extraColor, fromGear: effGear.fromGear };
    var height = (typeof opts.height === 'number' && opts.height > 0) ? Math.round(opts.height) : 180;
    var extra = (typeof opts.extraClass === 'string' && opts.extraClass) ? ' ' + esc(opts.extraClass) : '';

    var glove = !!(gear && gear.extraId === 'gang-thep');
    var wind = !!(gear && gear.extraId === 'giay-gio');
    var svg = '<svg class="fb-svg" viewBox="0 0 200 360" role="img" aria-label="Nhân vật toàn thân" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse class="fb-shadow" cx="100" cy="346" rx="54" ry="9"/>' +
      capeSVG(gear) +
      hairBackSVG(cfg) +
      legSVG('l', wind, effArt ? effArt.pants : null, effArt ? effArt.pantsD : null) + legSVG('r', wind, effArt ? effArt.pants : null, effArt ? effArt.pantsD : null) +
      armSVG('l', sleeve, cfg.skin, '', glove, armStyle) +
      torsoSVG(cfg, of, gear, effArt) +
      armSVG('r', sleeve, cfg.skin, weaponSVG(effGear.weaponId), glove, armStyle) +
      /* ĐỢT 6 (prep): đầu + phụ kiện đầu gói trong .fb-headturn — lớp
         quay đầu riêng (Việc N), tâm quay tại cổ (100,100), góc lấy từ
         biến --fbht trên .fb-wrap (mặc định 0deg = không đổi đợt 5).
         ĐỢT 6 (O2): hatSVG vẽ CUỐI nhóm (trên cùng), sau accSVG;
         bịt mặt ninja (costume) còn sau nữa để luôn nằm trên mặt. */
      '<g class="fb-headturn">' + headSVG(cfg, of) + accSVG(accGear) + hatSVG(hatId, effGear.hatColor) + (art && art.style === 'bo-ninja' ? ninjaMaskSVG(art) : '') + '</g>' +
      '</svg>';

    var hoso = '';
    var ud = userData();
    if (cfg.face === 'hoso' && ud && ud.avatarFile && ud.avatarUrl) {
      hoso = '<img class="fb-hoso-img" src="' + esc(ud.avatarUrl) + '" alt="Ảnh hồ sơ" onerror="this.remove()">';
    }
    return '<span class="fb-wrap' + extra + '" style="height:' + height + 'px">' + svg + hoso + '</span>';
  }

  /* ------------------------------ paint ------------------------------ */
  // Đúng mẫu GAME_AVATAR.paintFace: gán render(); mặt hoso có avatarFile
  // mà URL chưa resolve thì resolve ngay rồi vẽ lại ĐÚNG el đó.
  function paint(el, rawCfg, opts) {
    if (!el) return;
    el.innerHTML = render(rawCfg, opts);
    var cfg = loadCfg(rawCfg);
    var ud = userData();
    if (cfg.face === 'hoso' && ud && ud.avatarFile && !ud.avatarUrl) {
      var wantFile = ud.avatarFile;
      var resolver = null;
      try {
        if (window.GAME_AVATAR && typeof window.GAME_AVATAR.resolveFileUrl === 'function') resolver = window.GAME_AVATAR.resolveFileUrl;
        else if (typeof window.GAME_resolveFileUrl === 'function') resolver = window.GAME_resolveFileUrl;
      } catch (e) { resolver = null; }
      if (!resolver) return;
      Promise.resolve(resolver(wantFile)).then(function (url) {
        var now = userData();
        if (!url || !now || now.avatarFile !== wantFile) return;
        now.avatarUrl = url;
        if (el.isConnected) el.innerHTML = render(rawCfg, opts);
        try { window.dispatchEvent(new CustomEvent('hn-game-user', { detail: now })); } catch (e) { /* bỏ qua */ }
      }).catch(function () { /* ảnh không resolve được: giữ mặt SVG */ });
    }
  }

  window.GBODY = { render: render, paint: paint, version: VERSION, COSTUME_ART: COSTUME_ART, HEAD_IDS: HEAD_IDS, HAT_NEW_IDS: HAT_NEW_IDS };
})();
