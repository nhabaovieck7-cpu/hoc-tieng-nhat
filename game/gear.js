/* =====================================================================
   gear.js — Hệ thống TRANG BỊ + SKILL dùng chung (Việc I, đợt game 3)
   window.GGEAR theo CONTRACT-B3.md (mục GEAR).

   API:
     GGEAR.ready()    -> Promise<state>  nạp tiến độ + lựa chọn đã lưu,
                        hợp nhất lựa chọn vào cây progress qua
                        GAME_API.saveProgress({gear}) khi API sẵn sàng.
     GGEAR.state()    -> {weapon, armor, acc, skill, extra} (đã kiểm tra
                        mở khoá; món lưu cũ nay bị khoá -> rơi về cơ bản;
                        extra = kind "Đồ thêm", mặc định 'none')
     GGEAR.catalog()  -> {weapons, armors, accs, skills} mỗi món
                        {id,name,icon,color,cond,unlocked}
     GGEAR.select(kind,id) -> bool (false nếu đang khoá); phát
                        CustomEvent 'hn-game-gear' (detail=state, bắn cả
                        window lẫn document cho khớp 2 thói quen sẵn có)
                        + lưu localStorage 'hn_game_gear' + saveProgress.
     GGEAR.skillId()  -> skill hiện tại
     GGEAR.attackFx(fromEl,toEl,opts?) -> Promise resolve lúc đòn CHẠM
                        đích (~400–650ms; reduced-motion <=80ms)
     GGEAR.decorate(svgStr) -> chuỗi SVG của AV.draw + lớp trang bị
                        (vũ khí bên tay phải, giáp ở thân, phụ kiện —
                        KHÔNG che mặt)
     GGEAR.badge()    -> HTML span emoji vũ khí hiện tại (gắn góc avatar)
     GGEAR.info()     -> {stars, bossWins, level, xp, nextXp} (phụ, cho UI
                        hiển thị tiến độ; nextXp = ngưỡng XP của cấp kế,
                        null khi đã cấp tối đa 12)

   CẤP NGƯỜI CHƠI (Việc M, đợt game 5 — BATCH5-M):
     XP = stars*10 + bossWins*30 (đúng 2 nguồn prog sẵn có, không nguồn
     mới). Thang 12 cấp theo ngưỡng XP tích luỹ LEVEL_XP bên dưới.
     Mở khoá thêm mode 'level': mở khi prog.level >= req.level. Toàn bộ
     req của 12 món/skill đợt 3 GIỮ NGUYÊN 100%; món/skill mới mở theo
     cấp 2–11, cấp 12 là danh hiệu "Truyền thuyết Edo" (xem level.js).

   BẢNG MỐC MỞ KHOÁ (tổng sao campaign = cộng mọi campaign[*].stars,
   bossWins = progress.totals.bossWins):
     Cơ bản (mở sẵn)      : kiem-go, giap-vai, khan-do, skill chem
     3 sao                : skill dan
     5 sao HOẶC 1 trùm    : kiem-thep, giap-thep
     8 sao HOẶC 2 trùm    : skill chuong
     15 sao HOẶC 3 trùm   : kiem-lua, giap-rong, vuong-mien
     20 sao HOẶC 4 trùm   : skill chem-lua

   Nguyên tắc an toàn: khách / chưa đăng nhập / mất mạng vẫn chạy bằng
   localStorage; mọi lời gọi GAME_API/GFX/GSFX đều bọc try/catch +
   kiểm tra typeof — lỗi ở đâu cũng không được làm hỏng game.
   ===================================================================== */
(function () {
  'use strict';

  var LS_KEY = 'hn_game_gear';
  var LS_PROG = 'hn_game_progress'; // cùng khoá game-api.js dùng dự phòng

  /* ------------------------- Catalog tĩnh ------------------------- */
  var BASIC = { stars: 0, boss: 0, mode: 'basic' };
  function orReq(stars, boss) { return { stars: stars, boss: boss, mode: 'or' }; }
  function lvlReq(level) { return { stars: 0, boss: 0, mode: 'level', level: level }; }

  /* Cấp người chơi (BATCH5-M): XP = stars*10 + bossWins*30; LEVEL_XP[i]
     là ngưỡng XP tích luỹ để ĐẠT cấp i+1 (12 cấp). */
  var LEVEL_XP = [0, 30, 80, 150, 240, 350, 480, 630, 800, 1000, 1250, 1550];
  function xpOfProg(p) { return (p.stars || 0) * 10 + (p.bossWins || 0) * 30; }
  function levelOfXp(xp) {
    var lv = 1;
    for (var i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lv = i + 1;
    return lv;
  }
  function withLevel(p) {
    var xp = xpOfProg(p);
    return { stars: p.stars || 0, bossWins: p.bossWins || 0, xp: xp, level: levelOfXp(xp) };
  }

  var WEAPONS = [
    { id: 'kiem-go',   name: 'Kiếm gỗ',   icon: '🗡️', color: '#a9743f', req: BASIC },
    { id: 'kiem-thep', name: 'Kiếm thép', icon: '⚔️', color: '#c7d0dd', req: orReq(5, 1) },
    { id: 'kiem-lua',  name: 'Kiếm lửa',  icon: '🔥', color: '#ff6a1f', req: orReq(15, 3) },
    /* BATCH5-M: mở theo cấp */
    { id: 'kiem-bang', name: 'Kiếm băng', icon: '❄️', color: '#67e8f9', req: lvlReq(5) },
    { id: 'kiem-set',  name: 'Kiếm sét',  icon: '⚡', color: '#facc15', req: lvlReq(8) }
  ];
  var ARMORS = [
    { id: 'giap-vai',  name: 'Giáp vải',      icon: '👕', color: '#5b8a72', req: BASIC },
    { id: 'giap-thep', name: 'Giáp thép',     icon: '🛡️', color: '#aab6c6', req: orReq(5, 1) },
    { id: 'giap-rong', name: 'Giáp rồng lửa', icon: '🐉', color: '#ff7a45', req: orReq(15, 3) },
    /* BATCH5-M: mở theo cấp */
    { id: 'giap-bang',      name: 'Giáp băng tinh', icon: '🧊', color: '#7dd3fc', req: lvlReq(5) },
    { id: 'giap-thien-loi', name: 'Giáp thiên lôi', icon: '🌩️', color: '#fbbf24', req: lvlReq(9) }
  ];
  var ACCS = [
    { id: 'khan-do',    name: 'Khăn đỏ',       icon: '🧣', color: '#cf3a2e', req: BASIC },
    { id: 'vuong-mien', name: 'Vương miện Edo', icon: '👑', color: '#ffd84e', req: orReq(15, 3) },
    /* BATCH5-M: mở theo cấp */
    { id: 'non-la',    name: 'Nón lá',        icon: '👒', color: '#d9b36a', req: lvlReq(2) },
    { id: 'bang-tran', name: 'Băng trán ninja', icon: '🎗️', color: '#3b5bdb', req: lvlReq(3) },
    { id: 'mat-na',    name: 'Mặt nạ Oni',    icon: '👹', color: '#e0452f', req: lvlReq(7) }
  ];
  /* BATCH5-M: kind MỚI 'extra' (Đồ thêm). 'none' = không dùng (mặc định,
     mở sẵn) để bản lưu cũ không có extra vẫn hợp lệ 100%. */
  var EXTRAS = [
    { id: 'none',          name: 'Không dùng',    icon: '🚫', color: '#9aa3b2', req: BASIC },
    { id: 'gang-thep',     name: 'Găng thép',     icon: '🧤', color: '#aab6c6', req: lvlReq(3) },
    { id: 'giay-gio',      name: 'Giày gió',      icon: '👟', color: '#2fbf71', req: lvlReq(6) },
    { id: 'ao-choang-dem', name: 'Áo choàng đêm', icon: '🧥', color: '#4c3a8f', req: lvlReq(10) }
  ];
  var SKILLS = [
    { id: 'chem',     name: 'Chém thường',        icon: '🗡️', color: '#ffd84e', req: BASIC },
    { id: 'dan',      name: 'Bắn đạn năng lượng', icon: '🔮', color: '#22d3ee', req: { stars: 3, boss: 0, mode: 'stars' } },
    { id: 'chuong',   name: 'Tung chưởng sóng',   icon: '🌀', color: '#7c5cff', req: orReq(8, 2) },
    { id: 'chem-lua', name: 'Chém lửa',           icon: '🔥', color: '#ff6a1f', req: orReq(20, 4) },
    /* BATCH5-M: mở theo cấp */
    { id: 'chem-bang',      name: 'Chém băng',      icon: '❄️', color: '#67e8f9', req: lvlReq(4) },
    { id: 'set-danh',       name: 'Sét đánh',       icon: '⚡', color: '#fde047', req: lvlReq(6) },
    { id: 'loc-xoay',       name: 'Lốc xoáy kiếm',  icon: '🌪️', color: '#2dd4bf', req: lvlReq(7) },
    { id: 'lien-hoan',      name: 'Chém liên hoàn', icon: '💨', color: '#fb7185', req: lvlReq(9) },
    { id: 'song-xung-kich', name: 'Sóng xung kích', icon: '🌊', color: '#f59e0b', req: lvlReq(11) }
  ];
  var LISTS = { weapon: WEAPONS, armor: ARMORS, acc: ACCS, skill: SKILLS, extra: EXTRAS };
  var KIND_KEY = { weapon: 'weapon', armor: 'armor', acc: 'acc', skill: 'skill', extra: 'extra' };
  var DEFAULTS = { weapon: 'kiem-go', armor: 'giap-vai', acc: 'khan-do', skill: 'chem', extra: 'none' };

  function findIn(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function condText(req) {
    if (!req || req.mode === 'basic') return 'Mở sẵn';
    if (req.mode === 'level') return 'Cấp ' + req.level;
    if (req.mode === 'stars') return 'Cần ' + req.stars + ' sao để mở';
    return 'Cần ' + req.stars + ' sao hoặc hạ ' + req.boss + ' trùm để mở';
  }
  function isUnlocked(item, prog) {
    var req = item.req || BASIC;
    if (req.mode === 'basic') return true;
    if (req.mode === 'level') {
      var lv = (typeof prog.level === 'number') ? prog.level : levelOfXp(xpOfProg(prog));
      return lv >= req.level;
    }
    if (req.mode === 'stars') return prog.stars >= req.stars;
    return prog.stars >= req.stars || prog.bossWins >= req.boss;
  }

  /* ------------------- Đọc tiến độ (sao + trùm) ------------------- */
  // Cộng sao đệ quy: chấp nhận cả campaign[k].stars dạng object
  // {'0-0':3,...} (đúng cấu trúc chien-dich.js) lẫn dạng số, và cây
  // {chien-dich:{campaign:{...}}} nếu nơi gọi bọc thêm một lớp.
  function sumStars(node, depth) {
    if (!node || typeof node !== 'object' || depth > 6) return 0;
    var total = 0;
    for (var k in node) {
      if (!Object.prototype.hasOwnProperty.call(node, k)) continue;
      if (k === 'totals' || k === 'gear') continue;
      var v = node[k];
      if (k === 'stars') {
        if (typeof v === 'number') total += v;
        else if (v && typeof v === 'object') {
          for (var kk in v) if (typeof v[kk] === 'number') total += v[kk];
        }
      } else if (v && typeof v === 'object') {
        total += sumStars(v, depth + 1);
      }
    }
    return total;
  }
  function readProgressTree(tree) {
    var out = { stars: 0, bossWins: 0, gear: null };
    if (!tree || typeof tree !== 'object') return out;
    out.stars = sumStars(tree.campaign ? { campaign: tree.campaign } : tree, 0);
    var totals = tree.totals || (tree['chien-dich'] && tree['chien-dich'].totals) || {};
    out.bossWins = Math.max(0, parseInt(totals.bossWins, 10) || 0);
    if (tree.gear && typeof tree.gear === 'object') out.gear = tree.gear;
    return out;
  }
  function localProgressTree() {
    try {
      var v = localStorage.getItem(LS_PROG);
      var o = v ? JSON.parse(v) : null;
      return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
    } catch (e) { return {}; }
  }

  /* --------------------------- Trạng thái --------------------------- */
  var prog = { stars: 0, bossWins: 0, xp: 0, level: 1 }; // ảnh chụp tiến độ gần nhất (+ cấp/XP, BATCH5-M)
  var sel = loadLocalSelection();          // lựa chọn thô (chưa kiểm tra khoá)
  var readyPromise = null;

  function loadLocalSelection() {
    try {
      var v = localStorage.getItem(LS_KEY);
      var o = v ? JSON.parse(v) : null;
      if (o && typeof o === 'object') return sanitizeRaw(o);
    } catch (e) { /* hỏng thì dùng mặc định */ }
    return sanitizeRaw({}); // mặc định mọi kind (kể cả extra='none')
  }
  function sanitizeRaw(o) {
    var out = {};
    for (var kind in LISTS) {
      var id = o[KIND_KEY[kind]];
      out[KIND_KEY[kind]] = findIn(LISTS[kind], id) ? id : DEFAULTS[KIND_KEY[kind]];
    }
    return out;
  }
  // Lựa chọn hiệu lực: món nào đang khoá -> rơi về cơ bản của loại đó.
  function validState() {
    var out = {};
    for (var kind in LISTS) {
      var key = KIND_KEY[kind];
      var item = findIn(LISTS[kind], sel[key]);
      out[key] = (item && isUnlocked(item, prog)) ? item.id : DEFAULTS[key];
    }
    return out;
  }
  function persist(state, syncServer) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { /* bỏ qua */ }
    if (syncServer === false) return;
    try {
      if (window.GAME_API && typeof window.GAME_API.saveProgress === 'function') {
        var p = window.GAME_API.saveProgress({ gear: { weapon: state.weapon, armor: state.armor, acc: state.acc, skill: state.skill, extra: state.extra } });
        if (p && typeof p.catch === 'function') p.catch(function () { /* mạng lỗi: local vẫn còn */ });
      }
    } catch (e) { /* không bao giờ để lỗi đồng bộ phá game */ }
  }
  function fireEvent(state) {
    var detail = { weapon: state.weapon, armor: state.armor, acc: state.acc, skill: state.skill, extra: state.extra };
    try { window.dispatchEvent(new CustomEvent('hn-game-gear', { detail: detail })); } catch (e) { /* bỏ qua */ }
    try { document.dispatchEvent(new CustomEvent('hn-game-gear', { detail: detail })); } catch (e) { /* bỏ qua */ }
  }

  function ready() {
    readyPromise = (function () {
      var treePromise;
      try {
        if (window.GAME_API && typeof window.GAME_API.getProgress === 'function') {
          treePromise = Promise.resolve(window.GAME_API.getProgress()).catch(function () { return localProgressTree(); });
        } else {
          treePromise = Promise.resolve(localProgressTree());
        }
      } catch (e) { treePromise = Promise.resolve(localProgressTree()); }
      return treePromise.then(function (tree) {
        var info = readProgressTree(tree);
        prog = withLevel({ stars: info.stars, bossWins: info.bossWins });
        // Lựa chọn: local có thì local thắng (máy này chọn gần nhất);
        // chưa có local mà cây progress có gear (đồng bộ tài khoản) thì dùng nó.
        var hasLocal = false;
        try { hasLocal = !!localStorage.getItem(LS_KEY); } catch (e) { hasLocal = false; }
        if (!hasLocal && info.gear) sel = sanitizeRaw(info.gear);
        var st = validState();
        sel = { weapon: st.weapon, armor: st.armor, acc: st.acc, skill: st.skill, extra: st.extra };
        persist(st); // ghi local + hợp nhất vào progress (nếu API có)
        return st;
      }).catch(function () {
        // Bất kỳ lỗi nào: vẫn trả state hợp lệ từ tiến độ đã biết (0 sao).
        return validState();
      });
    })();
    return readyPromise;
  }

  function state() { return validState(); }
  function skillId() { return validState().skill; }
  function info() {
    return {
      stars: prog.stars, bossWins: prog.bossWins,
      level: prog.level, xp: prog.xp,
      nextXp: prog.level < LEVEL_XP.length ? LEVEL_XP[prog.level] : null
    };
  }

  function catalogList(list) {
    return list.map(function (it) {
      return {
        id: it.id, name: it.name, icon: it.icon, color: it.color,
        cond: condText(it.req), unlocked: isUnlocked(it, prog)
      };
    });
  }
  function catalog() {
    return {
      weapons: catalogList(WEAPONS),
      armors: catalogList(ARMORS),
      accs: catalogList(ACCS),
      skills: catalogList(SKILLS),
      extras: catalogList(EXTRAS)
    };
  }

  function select(kind, id) {
    var list = LISTS[kind];
    if (!list) return false;
    var item = findIn(list, id);
    if (!item) return false;
    if (!isUnlocked(item, prog)) return false; // đang khoá: không chọn, không lưu
    sel[KIND_KEY[kind]] = id;
    var st = validState();
    persist(st);
    fireEvent(st);
    return true;
  }

  /* --------------------------- Hiệu ứng đòn --------------------------- */
  var mq = null;
  try { mq = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { mq = null; }
  function reduced() { return !!(mq && mq.matches); }

  function playSfx(name) {
    try {
      if (window.GSFX) {
        if (typeof window.GSFX.play === 'function') { window.GSFX.play(name); return; }
        if (typeof window.GSFX[name] === 'function') { window.GSFX[name](); return; }
      }
      if (typeof window.sfx === 'function') window.sfx(name);
    } catch (e) { /* âm thanh là phụ */ }
  }
  function burstAt(el, n, colors) {
    try {
      if (window.GFX && typeof window.GFX.burst === 'function') {
        window.GFX.burst(el, n || 22, colors || undefined);
        return true;
      }
    } catch (e) { /* bỏ qua */ }
    return false;
  }
  function centerOf(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
  }
  function flashTarget(el, color) {
    if (!el || !el.animate) return;
    try {
      el.animate([
        { transform: 'translate(0,0)', filter: 'none' },
        { transform: 'translate(6px,-3px)', filter: 'brightness(2.1) drop-shadow(0 0 14px ' + color + ')', offset: .3 },
        { transform: 'translate(-5px,2px)', filter: 'brightness(1.7) drop-shadow(0 0 10px ' + color + ')', offset: .6 },
        { transform: 'translate(0,0)', filter: 'none' }
      ], { duration: 340, easing: 'ease-out' });
    } catch (e) { /* bỏ qua */ }
    try { el.classList.add('gg-hit'); setTimeout(function () { el.classList.remove('gg-hit'); }, 360); } catch (e) { /* bỏ qua */ }
  }
  function fxEl(cls, x, y) {
    var d = document.createElement('div');
    d.className = 'gg-fx ' + cls;
    d.setAttribute('aria-hidden', 'true');
    d.style.left = x + 'px';
    d.style.top = y + 'px';
    document.body.appendChild(d);
    return d;
  }

  // attackFx: resolve ĐÚNG lúc đòn chạm đích.
  function attackFx(fromEl, toEl, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var done = false;
      function finish() { if (!done) { done = true; resolve(); } }
      try {
        if (!fromEl || !toEl || typeof fromEl.getBoundingClientRect !== 'function' || typeof toEl.getBoundingClientRect !== 'function') { finish(); return; }
        var skill = (opts.skill && findIn(SKILLS, opts.skill)) ? opts.skill : skillId();
        var def = findIn(SKILLS, skill) || SKILLS[0];
        var col = def.color;

        if (reduced()) {
          // Tôn trọng reduced-motion: không phóng/bay, chỉ chớp nhẹ <=80ms.
          try {
            if (toEl.animate) toEl.animate([{ filter: 'brightness(1.9)' }, { filter: 'none' }], { duration: 70 });
            toEl.classList.add('gg-hit');
            setTimeout(function () { try { toEl.classList.remove('gg-hit'); } catch (e) {} }, 80);
          } catch (e) { /* bỏ qua */ }
          playSfx(skill === 'dan' ? 'shoot'
            : skill === 'set-danh' ? 'thunder'
            : skill === 'loc-xoay' ? 'shuriken'
            : skill === 'lien-hoan' ? 'combo'
            : skill === 'song-xung-kich' ? 'ultra' : 'hit');
          setTimeout(finish, 50);
          return;
        }

        var A = centerOf(fromEl), B = centerOf(toEl);
        var dx = B.x - A.x, dy = B.y - A.y;
        var impactMs = skill === 'dan' ? 520 : (skill === 'chuong' ? 540 : (skill === 'chem-lua' ? 500 : 480));

        function impact() {
          playSfx(skill === 'chem-lua' ? 'explosion' : 'hit');
          burstAt(toEl, skill === 'chem' ? 20 : 28);
          flashTarget(toEl, col);
          finish();
        }

        if (skill === 'chem' || skill === 'chem-lua') {
          var fire = skill === 'chem-lua';
          playSfx('hit');
          // Người đánh phóng tới đích (giữ ~72% quãng đường như fx-combat).
          var reachX = dx * 0.72, reachY = dy * 0.72 - 10;
          try {
            if (fromEl.animate) fromEl.animate([
              { transform: 'translate(0,0)' },
              { transform: 'translate(' + (reachX * 0.4) + 'px,' + (reachY * 0.4 - 6) + 'px)', offset: .35 },
              { transform: 'translate(' + reachX + 'px,' + reachY + 'px) scale(1.07)', offset: .62 },
              { transform: 'translate(' + (reachX * 0.85) + 'px,' + (reachY * 0.85) + 'px)', offset: .8 },
              { transform: 'translate(0,0)' }
            ], { duration: impactMs + 160, easing: 'cubic-bezier(.3,.7,.3,1)' });
          } catch (e) { /* bỏ qua */ }
          // Vệt chém tại đích, quét đúng nhịp chạm.
          var slash = fxEl(fire ? 'gg-slash gg-slash-fire' : 'gg-slash', B.x - 55, B.y - 7);
          try {
            if (slash.animate) slash.animate([
              { opacity: 0, transform: 'rotate(-38deg) translate(-32px,22px) scaleX(.5)' },
              { opacity: 1, transform: 'rotate(-38deg) translate(0,0) scaleX(1)', offset: .35 },
              { opacity: 0, transform: 'rotate(-38deg) translate(36px,-24px) scaleX(1.15)' }
            ], { duration: 340, delay: Math.max(0, impactMs - 120), easing: 'ease-out', fill: 'backwards' });
          } catch (e) { /* bỏ qua */ }
          setTimeout(function () { slash.remove(); }, impactMs + 420);
          if (fire) {
            // Hạt lửa bắn ra quanh đích lúc chạm.
            setTimeout(function () {
              for (var i = 0; i < 9; i++) {
                var em = fxEl('gg-ember', B.x - 4, B.y - 4);
                var ang = Math.random() * Math.PI * 2, dist = 26 + Math.random() * 42;
                try {
                  if (em.animate) em.animate([
                    { transform: 'translate(0,0) scale(1)', opacity: 1 },
                    { transform: 'translate(' + (Math.cos(ang) * dist) + 'px,' + (Math.sin(ang) * dist - 22) + 'px) scale(.3)', opacity: 0 }
                  ], { duration: 460 + Math.random() * 220, easing: 'ease-out' });
                } catch (e) { /* bỏ qua */ }
                (function (el) { setTimeout(function () { el.remove(); }, 760); })(em);
              }
            }, impactMs - 20);
          }
          setTimeout(impact, impactMs);
        } else if (skill === 'dan') {
          playSfx('shoot');
          // Đạn năng lượng: chấm sáng có vệt, bay thẳng; người bắn đứng yên (chỉ giật nhẹ).
          try {
            if (fromEl.animate) fromEl.animate([
              { transform: 'translate(0,0)' }, { transform: 'translate(' + (dx >= 0 ? -5 : 5) + 'px,0)', offset: .25 }, { transform: 'translate(0,0)' }
            ], { duration: 240, easing: 'ease-out' });
          } catch (e) { /* bỏ qua */ }
          var ang = Math.atan2(dy, dx);
          var proj = fxEl('gg-proj', A.x - 8, A.y - 8);
          proj.style.setProperty('--gg-c', col);
          try {
            if (proj.animate) proj.animate([
              { transform: 'translate(0,0) rotate(' + ang + 'rad)', opacity: 1 },
              { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + ang + 'rad)', opacity: 1 }
            ], { duration: impactMs, easing: 'cubic-bezier(.25,.6,.4,1)' });
          } catch (e) { /* bỏ qua */ }
          setTimeout(function () { proj.remove(); }, impactMs + 60);
          setTimeout(impact, impactMs);
        } else if (skill === 'chem-bang') {
          // BATCH5-M — Chém băng: vệt chém cyan + mảnh băng văng + đích
          // đóng băng (class gg-frozen ~650ms: tint lạnh trên target).
          playSfx('hit');
          var imsB = 500;
          var reachBX = dx * 0.72, reachBY = dy * 0.72 - 10;
          try {
            if (fromEl.animate) fromEl.animate([
              { transform: 'translate(0,0)' },
              { transform: 'translate(' + (reachBX * 0.4) + 'px,' + (reachBY * 0.4 - 6) + 'px)', offset: .35 },
              { transform: 'translate(' + reachBX + 'px,' + reachBY + 'px) scale(1.07)', offset: .62 },
              { transform: 'translate(' + (reachBX * 0.85) + 'px,' + (reachBY * 0.85) + 'px)', offset: .8 },
              { transform: 'translate(0,0)' }
            ], { duration: imsB + 160, easing: 'cubic-bezier(.3,.7,.3,1)' });
          } catch (e) { /* bỏ qua */ }
          var slashI = fxEl('gg-slash gg-slash-ice', B.x - 55, B.y - 7);
          try {
            if (slashI.animate) slashI.animate([
              { opacity: 0, transform: 'rotate(-38deg) translate(-32px,22px) scaleX(.5)' },
              { opacity: 1, transform: 'rotate(-38deg) translate(0,0) scaleX(1)', offset: .35 },
              { opacity: 0, transform: 'rotate(-38deg) translate(36px,-24px) scaleX(1.15)' }
            ], { duration: 340, delay: Math.max(0, imsB - 120), easing: 'ease-out', fill: 'backwards' });
          } catch (e) { /* bỏ qua */ }
          setTimeout(function () { slashI.remove(); }, imsB + 420);
          setTimeout(function () {
            for (var si = 0; si < 8; si++) {
              var shard = fxEl('gg-shard', B.x - 4, B.y - 4);
              var sang = Math.random() * Math.PI * 2, sdist = 24 + Math.random() * 40;
              try {
                if (shard.animate) shard.animate([
                  { transform: 'translate(0,0) rotate(45deg) scale(1)', opacity: 1 },
                  { transform: 'translate(' + (Math.cos(sang) * sdist) + 'px,' + (Math.sin(sang) * sdist - 14) + 'px) rotate(225deg) scale(.3)', opacity: 0 }
                ], { duration: 480 + Math.random() * 200, easing: 'ease-out' });
              } catch (e) { /* bỏ qua */ }
              (function (el) { setTimeout(function () { el.remove(); }, 760); })(shard);
            }
          }, imsB - 20);
          setTimeout(function () {
            playSfx('hit');
            burstAt(toEl, 26);
            flashTarget(toEl, col);
            try {
              toEl.classList.add('gg-frozen');
              setTimeout(function () { try { toEl.classList.remove('gg-frozen'); } catch (e) {} }, 650);
            } catch (e) { /* bỏ qua */ }
            finish();
          }, imsB);
        } else if (skill === 'set-danh') {
          // BATCH5-M — Sét đánh: tia zigzag giáng xuống đích + chớp trắng.
          playSfx('thunder');
          var bolt = fxEl('gg-bolt', B.x - 30, B.y - 124);
          bolt.innerHTML = '<svg width="60" height="130" viewBox="0 0 60 130" aria-hidden="true"><polyline points="34,2 14,52 28,52 10,128 46,44 32,44 50,2" fill="#fde047" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/></svg>';
          try {
            if (bolt.animate) bolt.animate([
              { opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: .15, offset: .3 },
              { opacity: 1, offset: .45 }, { opacity: 0 }
            ], { duration: 430, easing: 'ease-out' });
          } catch (e) { /* bỏ qua */ }
          setTimeout(function () { bolt.remove(); }, 500);
          setTimeout(function () {
            burstAt(toEl, 26);
            flashTarget(toEl, '#ffffff');
            finish();
          }, 380);
        } else if (skill === 'loc-xoay') {
          // BATCH5-M — Lốc xoáy kiếm: vòng cung xoay quanh đích.
          playSfx('shuriken');
          var vort = fxEl('gg-vortex', B.x - 46, B.y - 46);
          vort.style.setProperty('--gg-c', col);
          try {
            if (vort.animate) vort.animate([
              { transform: 'rotate(0deg) scale(.7)', opacity: 0 },
              { transform: 'rotate(240deg) scale(1)', opacity: 1, offset: .3 },
              { transform: 'rotate(620deg) scale(1.05)', opacity: 1, offset: .75 },
              { transform: 'rotate(760deg) scale(.9)', opacity: 0 }
            ], { duration: 640, easing: 'ease-out' });
          } catch (e) { /* bỏ qua */ }
          setTimeout(function () { vort.remove(); }, 700);
          setTimeout(function () {
            burstAt(toEl, 24);
            flashTarget(toEl, col);
            finish();
          }, 560);
        } else if (skill === 'lien-hoan') {
          // BATCH5-M — Chém liên hoàn: 3 vệt chém dồn dập, 3 hit.
          playSfx('combo');
          for (var lh = 0; lh < 3; lh++) {
            (function (k) {
              setTimeout(function () {
                var rot = -38 + (k - 1) * 24;
                var sl3 = fxEl('gg-slash gg-slash-combo', B.x - 55, B.y - 7 + (k - 1) * 16);
                try {
                  if (sl3.animate) sl3.animate([
                    { opacity: 0, transform: 'rotate(' + rot + 'deg) translate(-26px,16px) scaleX(.5)' },
                    { opacity: 1, transform: 'rotate(' + rot + 'deg) translate(0,0) scaleX(1)', offset: .4 },
                    { opacity: 0, transform: 'rotate(' + rot + 'deg) translate(28px,-18px) scaleX(1.1)' }
                  ], { duration: 260, easing: 'ease-out' });
                } catch (e) { /* bỏ qua */ }
                setTimeout(function () { sl3.remove(); }, 320);
                flashTarget(toEl, col);
                burstAt(toEl, 10);
                if (k === 2) { playSfx('hit'); finish(); }
              }, k * 150);
            })(lh);
          }
        } else if (skill === 'song-xung-kich') {
          // BATCH5-M — Sóng xung kích: vòng sóng mặt đất lan từ người đánh.
          playSfx('ultra');
          var distK = Math.max(60, Math.sqrt(dx * dx + dy * dy));
          var ringScale = Math.max(1.2, (distK * 2) / 60);
          for (var rw = 0; rw < 2; rw++) {
            var ring = fxEl('gg-ring', A.x - 30, A.y - 30);
            ring.style.setProperty('--gg-c', col);
            (function (el, delay) {
              try {
                if (el.animate) el.animate([
                  { transform: 'scale(.3)', opacity: .95 },
                  { transform: 'scale(' + ringScale.toFixed(2) + ')', opacity: .5 }
                ], { duration: 520, delay: delay, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' });
              } catch (e) { /* bỏ qua */ }
              setTimeout(function () { el.remove(); }, 600 + delay);
            })(ring, rw * 100);
          }
          setTimeout(function () {
            burstAt(toEl, 28);
            flashTarget(toEl, col);
            finish();
          }, 520);
        } else { // chuong — sóng năng lượng lan từ tay người đánh tới đích
          playSfx('beam');
          for (var w = 0; w < 2; w++) {
            var wave = fxEl('gg-wave', A.x - 22, A.y - 22);
            wave.style.setProperty('--gg-c', col);
            (function (el, delay) {
              try {
                if (el.animate) el.animate([
                  { transform: 'translate(0,0) scale(.35)', opacity: .95 },
                  { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1.7)', opacity: .85 }
                ], { duration: impactMs, delay: delay, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' });
              } catch (e) { /* bỏ qua */ }
              setTimeout(function () { el.remove(); }, impactMs + delay + 60);
            })(wave, w * 90);
          }
          setTimeout(impact, impactMs + 90);
        }
        // Van an toàn: dù WAAPI/timer trục trặc, promise không treo quá 900ms.
        setTimeout(finish, 900);
      } catch (e) { finish(); }
    });
  }

  /* --------------------------- decorate / badge --------------------------- */
  function weaponSVG(w) {
    var blade = w.color, tip = w.color;
    var glow = '';
    if (w.id === 'kiem-lua') {
      glow = '<path d="M158 96 L158 148" stroke="#ffb347" stroke-width="13" opacity=".45" stroke-linecap="round"/>' +
        '<path d="M158 84 q7 10 0 18 q-7 -8 0 -18 Z" fill="#ffcf3f"/>';
      blade = '#ff7a2a'; tip = '#ffd23f';
    } else if (w.id === 'kiem-thep') {
      blade = '#d7dee9'; tip = '#f4f7fb';
    } else if (w.id === 'kiem-bang') {
      // BATCH5-M: lưỡi xanh băng + tinh thể băng dọc lưỡi.
      blade = '#a5f3fc'; tip = '#ecfeff';
      glow = '<path d="M158 96 L158 148" stroke="#67e8f9" stroke-width="13" opacity=".4" stroke-linecap="round"/>' +
        '<polygon points="158,103 164,114 158,125 152,114" fill="#e0f2fe" opacity=".95"/>' +
        '<polygon points="158,126 162,133 158,141 154,133" fill="#bae6fd" opacity=".9"/>';
    } else if (w.id === 'kiem-set') {
      // BATCH5-M: lưỡi vàng điện + tia zigzag chạy dọc lưỡi.
      blade = '#fde047'; tip = '#fef9c3';
      glow = '<path d="M158 96 L158 148" stroke="#facc15" stroke-width="13" opacity=".35" stroke-linecap="round"/>' +
        '<polyline points="160,100 155,114 161,114 156,129 162,129 157,144" fill="none" stroke="#f59e0b" stroke-width="2.4" stroke-linejoin="round"/>';
    }
    return '<g class="gg-weapon gg-w-' + w.id + '" transform="rotate(24 158 156)">' + glow +
      '<polygon points="154,96 162,96 158,84" fill="' + tip + '"/>' +
      '<rect x="154" y="96" width="8" height="50" rx="3" fill="' + blade + '" stroke="rgba(0,0,0,.35)" stroke-width="1"/>' +
      ((w.id === 'kiem-thep' || w.id === 'kiem-bang') ? '<rect x="157" y="99" width="2" height="44" fill="#ffffff" opacity=".8"/>' : '') +
      '<rect x="145" y="146" width="26" height="6" rx="3" fill="#d9a84e" stroke="rgba(0,0,0,.3)"/>' +
      '<rect x="155" y="152" width="6" height="15" rx="3" fill="#5a3a22"/>' +
      '</g>';
  }
  function armorSVG(a) {
    if (a.id === 'giap-vai') {
      return '<g class="gg-armor gg-a-giap-vai">' +
        '<path d="M100 146 L120 154 L116 188 Q100 197 84 188 L80 154 Z" fill="' + a.color + '" opacity=".92"/>' +
        '<path d="M86 160 L114 160 M87 172 L113 172" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="4 3" fill="none"/>' +
        '</g>';
    }
    var gem = a.id === 'giap-rong' ? '#ffcf3f'
      : a.id === 'giap-bang' ? '#e0f2fe'
      : a.id === 'giap-thien-loi' ? '#fde047' : '#22d3ee';
    var glowC = a.id === 'giap-rong'
      ? '<circle cx="100" cy="169" r="11" fill="#ff7a45" opacity=".4"/>'
      : a.id === 'giap-bang'
      ? '<circle cx="100" cy="169" r="11" fill="#67e8f9" opacity=".35"/>'
      : a.id === 'giap-thien-loi'
      ? '<circle cx="100" cy="169" r="11" fill="#facc15" opacity=".35"/>' : '';
    // BATCH5-M: chi tiết riêng — băng tinh: mảnh tinh thể ở vai giáp;
    // thiên lôi: tia sét khắc giữa ngực (dưới gem).
    var extraA = '';
    if (a.id === 'giap-bang') {
      extraA = '<polygon points="83,152 88,142 93,152" fill="#e0f2fe" opacity=".9"/>' +
        '<polygon points="107,152 112,142 117,152" fill="#e0f2fe" opacity=".9"/>' +
        '<polygon points="96,155 100,148 104,155" fill="#bae6fd" opacity=".85"/>';
    } else if (a.id === 'giap-thien-loi') {
      extraA = '<polygon points="104,178 96,192 101,192 98,199 110,186 104,186 109,178" fill="#fde047" stroke="#f59e0b" stroke-width=".8"/>';
    }
    return '<g class="gg-armor gg-a-' + a.id + '">' +
      '<path d="M100 145 L123 153 L119 189 Q100 199 81 189 L77 153 Z" fill="' + a.color + '" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>' +
      '<path d="M100 145 L100 199 M81 168 L119 168" stroke="rgba(0,0,0,.22)" stroke-width="2" fill="none"/>' +
      '<circle cx="86" cy="158" r="2.4" fill="rgba(0,0,0,.4)"/><circle cx="114" cy="158" r="2.4" fill="rgba(0,0,0,.4)"/>' +
      glowC + '<circle cx="100" cy="169" r="6" fill="' + gem + '" stroke="rgba(0,0,0,.3)"/>' + extraA +
      '</g>';
  }
  function accSVG(a, hoso) {
    if (a.id === 'non-la') {
      // BATCH5-M: cung nón lá đội trên đầu (đỉnh y12, vành y~66) + dây
      // quai mảnh chạy sát MÉP mặt (x~50/150) — không phủ mặt.
      return '<g class="gg-acc gg-acc-non-la">' +
        '<path d="M100 12 L166 66 Q100 48 34 66 Z" fill="' + a.color + '" stroke="#a97f3f" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<path d="M100 12 L100 52 M100 12 L62 58 M100 12 L138 58" stroke="rgba(120,80,20,.45)" stroke-width="1.6" fill="none"/>' +
        '<path d="M50 62 q-3 20 2 38 M150 62 q3 20 -2 38" stroke="#a97f3f" stroke-width="2" fill="none" opacity=".65"/>' +
        '</g>';
    }
    if (a.id === 'bang-tran') {
      // BATCH5-M: dải băng vắt qua trán (y~62–92 theo cong trán) + nút
      // giữa trán + đuôi băng phấp phới bên phải (hook ca-flutter-tail).
      return '<g class="gg-acc gg-acc-bang-tran ca-flutter">' +
        '<path d="M54 80 Q100 62 146 80 L146 92 Q100 74 54 92 Z" fill="' + a.color + '" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>' +
        '<circle cx="100" cy="79" r="4.4" fill="#e8ecf7" stroke="rgba(0,0,0,.25)"/>' +
        '<circle cx="146" cy="86" r="4" fill="' + a.color + '" stroke="rgba(0,0,0,.3)"/>' +
        '<path class="ca-flutter-tail" d="M148 88 q15 3 18 17 l-9 4 q-4 -10 -12 -15 Z" fill="' + a.color + '" stroke="rgba(0,0,0,.2)"/>' +
        '</g>';
    }
    if (a.id === 'mat-na') {
      // BATCH5-M: mặt nạ Oni NỬA mặt, lệch hẳn sang trán–má PHẢI
      // (x~116–161, mặt chỉ tới x146) — không che kín mặt. Khi mặt là
      // ẢNH HỒ SƠ (hoso): thu nhỏ ~0.78 + đẩy lệch thêm ra ngoài/trên
      // (translate +26,-10 quanh tâm mặt nạ) để càng ít phủ ảnh thật.
      var mask = '<g class="gg-acc gg-acc-mat-na" transform="rotate(12 140 76)">' +
        '<path d="M116 42 Q150 34 158 68 Q161 96 144 114 Q131 100 133 80 Q134 56 116 42 Z" fill="#d63c2a" stroke="rgba(0,0,0,.35)" stroke-width="1.4"/>' +
        '<polygon points="124,40 130,25 137,40" fill="#f4e3c1" stroke="rgba(0,0,0,.3)"/>' +
        '<path d="M131 65 Q141 59 150 65" stroke="#241a12" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="141" cy="76" r="4.6" fill="#241a12"/>' +
        '<polygon points="136,103 140,112 145,103" fill="#ffffff"/>' +
        '</g>';
      if (hoso) {
        return '<g class="gg-acc-hoso" transform="translate(26 -10) translate(140 76) scale(.78) translate(-140 -76)">' + mask + '</g>';
      }
      return mask;
    }
    if (a.id === 'khan-do') {
      // ca-flutter / ca-flutter-tail: hook hoạt họa phấp phới của Nhánh A
      // (charanim.css) — chỉ thêm class, hình vẽ giữ nguyên.
      return '<g class="gg-acc gg-acc-khan-do ca-flutter">' +
        '<path d="M69 143 Q100 159 131 143 L131 154 Q100 170 69 154 Z" fill="' + a.color + '"/>' +
        '<path class="ca-flutter-tail" d="M73 152 q-3 14 3 24 l10 -3 q-5 -10 -4 -19 Z" fill="' + a.color + '" stroke="rgba(0,0,0,.2)"/>' +
        '</g>';
    }
    // Vương miện: đặt CAO trên tóc (y 12–34), lệch tâm lên trên — không
    // phủ xuống mặt (mặt bắt đầu ~y44 trong khung 200x200 của AV.draw).
    return '<g class="gg-acc gg-acc-vuong-mien ca-flutter">' +
      '<polygon points="76,35 76,17 89,27 100,12 111,27 124,17 124,35" fill="' + a.color + '" stroke="#b8860b" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<rect x="76" y="33" width="48" height="5" rx="2" fill="#e8b93c"/>' +
      '<circle cx="100" cy="29" r="3.4" fill="#cf3a2e"/><circle cx="86" cy="31" r="2.4" fill="#22d3ee"/><circle cx="114" cy="31" r="2.4" fill="#22d3ee"/>' +
      '</g>';
  }

  function decorate(svgStr) {
    try {
      if (typeof svgStr !== 'string') return svgStr;
      if (svgStr.indexOf('<svg') === -1 || svgStr.indexOf('</svg>') === -1) return svgStr;
      if (svgStr.indexOf('gg-gear') !== -1) return svgStr; // đã trang trí rồi
      var st = validState();
      var w = findIn(WEAPONS, st.weapon) || WEAPONS[0];
      var a = findIn(ARMORS, st.armor) || ARMORS[0];
      var ac = findIn(ACCS, st.acc) || ACCS[0];
      // BATCH5-M — Áo choàng đêm (extra): path choàng chèn TRƯỚC nhóm
      // thân (.ca-torso) = sau thân nhưng trước nền, xoè rộng hơn thân.
      // Găng thép / Giày gió KHÔNG vẽ trên tượng bán thân (chờ hình toàn
      // thân của nhánh A) — chỉ hiện ở trang nhân vật + icon.
      var ex = findIn(EXTRAS, st.extra);
      if (ex && ex.id === 'ao-choang-dem' && svgStr.indexOf('gg-cape') === -1 &&
          svgStr.indexOf('<g class="ca-torso">') !== -1) {
        var cape = '<g class="gg-cape" aria-hidden="true">' +
          '<path d="M100 130 Q50 138 38 200 L162 200 Q150 138 100 130 Z" fill="#241d3d" stroke="#4c3a8f" stroke-width="2"/>' +
          '<circle cx="58" cy="176" r="1.8" fill="#cfd6ff"/><circle cx="142" cy="170" r="1.8" fill="#cfd6ff"/>' +
          '<circle cx="70" cy="192" r="1.4" fill="#cfd6ff"/><circle cx="132" cy="190" r="1.4" fill="#cfd6ff"/></g>';
        svgStr = svgStr.replace('<g class="ca-torso">', cape + '<g class="ca-torso">');
      }
      // Mặt ảnh hồ sơ? (để mặt nạ Oni thu nhỏ/lệch hơn — xem accSVG)
      var hoso = false;
      try {
        hoso = !!(window.GAME_AVATAR && typeof window.GAME_AVATAR.load === 'function' &&
          window.GAME_AVATAR.load().face === 'hoso');
      } catch (e) { hoso = false; }
      var layer = '<g class="gg-gear" data-gear="' + w.id + '/' + a.id + '/' + ac.id + '">' +
        armorSVG(a) + accSVG(ac, hoso) + weaponSVG(w) + '</g>';
      return svgStr.replace('</svg>', layer + '</svg>');
    } catch (e) { return svgStr; }
  }

  function badge() {
    var st = validState();
    var w = findIn(WEAPONS, st.weapon) || WEAPONS[0];
    return '<span class="gg-badge" title="' + w.name + '" aria-hidden="true">' + w.icon + '</span>';
  }

  /* ------------------------------ Xuất API ------------------------------ */
  window.GGEAR = {
    ready: ready,
    state: state,
    catalog: catalog,
    select: select,
    skillId: skillId,
    attackFx: attackFx,
    decorate: decorate,
    badge: badge,
    info: info,
    WEAPONS: WEAPONS, ARMORS: ARMORS, ACCS: ACCS, SKILLS: SKILLS, EXTRAS: EXTRAS,
    LEVEL_XP: LEVEL_XP
  };

  // Tự khởi động nhẹ: đọc local ngay (sel đã nạp đồng bộ ở trên) và đối
  // chiếu tiến độ ở nền — lỗi gì cũng nuốt, game không chờ gear.
  try {
    var kick = function () { ready().catch(function () { /* bỏ qua */ }); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kick);
    else kick();
  } catch (e) { /* bỏ qua */ }
})();
