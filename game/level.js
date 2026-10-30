/* =====================================================================
   level.js — CẤP NGƯỜI CHƠI dùng chung (Việc M, đợt game 5 — BATCH5-M)
   window.GLEVEL:
     GLEVEL.LEVELS            -> thang ngưỡng XP tích luỹ (12 cấp)
     GLEVEL.level()           -> cấp hiện tại (từ GGEAR.info())
     GLEVEL.xp()              -> XP hiện tại (= stars*10 + bossWins*30,
                                 tính trong gear.js — đúng 2 nguồn prog)
     GLEVEL.progress()        -> {level, curXp, nextXp, pct, xp}
                                 curXp = XP đã tích trong cấp hiện tại,
                                 nextXp = XP cần cho trọn đoạn cấp này
                                 (null ở cấp 12), pct = % thanh tiến độ.
     GLEVEL.unlocksBetween(a,b) -> mọi món/skill mở theo cấp ở (a, b]
                                 [{kind,id,name,icon,level}] xếp theo cấp.
                                 ĐỢT 7 (nhánh R): gồm cả món mode 'and'
                                 (điều kiện kép cấp+sao+trùm, gom theo
                                 req.level của chúng) NHƯNG món 'and' chỉ
                                 được tính là "vừa mở" khi ĐỦ cả 3 điều
                                 kiện ở tiến độ hiện tại.
     GLEVEL.mountHTML(opts?)  -> HTML khối cấp dùng chung (huy hiệu +
                                 thanh tiến độ + "Mở tiếp theo: …");
                                 opts.mini = bản gọn cho hub.
     GLEVEL.mountInto(el,opts?)-> gắn mountHTML vào el.
     GLEVEL.checkNotify()     -> Promise<bool>: sau GGEAR.ready(), nếu
                                 cấp > mốc đã báo (localStorage
                                 'hn_game_level_seen') thì hiện thẻ ăn
                                 mừng "🎉 LÊN CẤP <n>!" liệt kê mọi mở
                                 khoá ở (seen, level] + confetti GFX
                                 (tôn trọng prefers-reduced-motion),
                                 rồi cập nhật seen. Chưa từng có seen:
                                 cấp <=1 -> đặt seen lặng lẽ; cấp >1 ->
                                 ăn mừng 1 lần (mốc tính từ cấp 1).

   An toàn: không có GGEAR -> mọi hàm trả giá trị mặc định cấp 1, không
   lỗi. Cấp 12 = danh hiệu "Truyền thuyết Edo" (hiển thị ở khối cấp +
   thẻ lên cấp).
   ===================================================================== */
(function () {
  'use strict';

  var LEVELS = [0, 30, 80, 150, 240, 350, 480, 630, 800, 1000, 1250, 1550];
  var SEEN_KEY = 'hn_game_level_seen';
  var TITLE_MAX = 'Truyền thuyết Edo';
  var KIND_LABEL = { weapon: 'Vũ khí', armor: 'Giáp', acc: 'Phụ kiện', extra: 'Đồ thêm', skill: 'Skill', costume: 'Trang phục', hat: 'Mũ nón' };

  function gearInfo() {
    try {
      if (window.GGEAR && typeof window.GGEAR.info === 'function') return window.GGEAR.info();
    } catch (e) { /* bỏ qua */ }
    return { stars: 0, bossWins: 0, level: 1, xp: 0, nextXp: LEVELS[1] };
  }
  function xp() {
    var inf = gearInfo();
    if (typeof inf.xp === 'number') return inf.xp;
    return (inf.stars || 0) * 10 + (inf.bossWins || 0) * 30;
  }
  function level() {
    var inf = gearInfo();
    if (typeof inf.level === 'number') return inf.level;
    var x = xp(), lv = 1;
    for (var i = 0; i < LEVELS.length; i++) if (x >= LEVELS[i]) lv = i + 1;
    return lv;
  }
  function progress() {
    var x = xp(), lv = level();
    var base = LEVELS[lv - 1];
    var next = lv < LEVELS.length ? LEVELS[lv] : null;
    var cur = x - base;
    var seg = next === null ? null : next - base;
    return {
      level: lv, xp: x, curXp: cur, nextXp: seg,
      pct: seg === null ? 100 : Math.max(0, Math.min(100, Math.round((cur / seg) * 100)))
    };
  }

  /* Mọi món/skill mở theo cấp, gom từ catalog tĩnh của GGEAR: mode
     'level' thuần VÀ mode 'and' (đợt 7 — gom theo req.level của món,
     kèm stars/boss/cond để nơi hiển thị nói đủ điều kiện kép). */
  function levelItems() {
    var out = [];
    try {
      if (!window.GGEAR) return out;
      var groups = [
        ['weapon', window.GGEAR.WEAPONS], ['armor', window.GGEAR.ARMORS],
        ['acc', window.GGEAR.ACCS], ['extra', window.GGEAR.EXTRAS],
        ['costume', window.GGEAR.COSTUMES], ['hat', window.GGEAR.HATS],
        ['skill', window.GGEAR.SKILLS]
      ];
      groups.forEach(function (g) {
        (g[1] || []).forEach(function (it) {
          if (it.req && (it.req.mode === 'level' || it.req.mode === 'and')) {
            out.push({
              kind: g[0], id: it.id, name: it.name, icon: it.icon,
              level: it.req.level, mode: it.req.mode,
              stars: it.req.stars || 0, boss: it.req.boss || 0,
              cond: (typeof window.GGEAR.condText === 'function')
                ? window.GGEAR.condText(it.req) : ('Cấp ' + it.req.level)
            });
          }
        });
      });
      out.sort(function (a, b) { return a.level - b.level; });
    } catch (e) { /* bỏ qua */ }
    return out;
  }
  /* Món đã mở THẬT ở tiến độ hiện tại chưa? Ưu tiên GGEAR.isUnlocked
     (gồm owned đợt 7); thiếu thì tự tính từ info: 'level' cần đủ cấp,
     'and' cần ĐỦ cả cấp + sao + trùm. */
  function itemUnlocked(it) {
    try {
      if (window.GGEAR && typeof window.GGEAR.isUnlocked === 'function') {
        return window.GGEAR.isUnlocked(it.kind, it.id);
      }
    } catch (e) { /* rơi xuống tự tính */ }
    var inf = gearInfo();
    var lv = (typeof inf.level === 'number') ? inf.level : level();
    if (it.mode === 'and') {
      return lv >= it.level && (inf.stars || 0) >= (it.stars || 0) && (inf.bossWins || 0) >= (it.boss || 0);
    }
    return lv >= it.level;
  }
  function unlocksBetween(a, b) {
    return levelItems().filter(function (it) {
      if (!(it.level > a && it.level <= b)) return false;
      // Món 'and': đủ cấp trong khoảng thôi chưa đủ — phải đủ cả sao +
      // trùm (mở thật) mới được liệt kê là "vừa mở" trong popup LÊN CẤP.
      if (it.mode === 'and') return itemUnlocked(it);
      return true;
    });
  }
  function nextUnlock() {
    // "Món sắp mở" = món theo cấp CHƯA mở thật gần nhất: món 'level'
    // ở cấp cao hơn, hoặc món 'and' còn thiếu sao/trùm dù cấp đã tới.
    var rest = levelItems().filter(function (it) { return !itemUnlocked(it); });
    return rest.length ? rest[0] : null;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ------------------------- Khối cấp dùng chung ------------------------- */
  function mountHTML(opts) {
    opts = opts || {};
    var pr = progress();
    var max = pr.level >= LEVELS.length;
    var nu = nextUnlock();
    var nextLine;
    if (max) {
      nextLine = 'Đã đạt cấp tối đa — 🏆 ' + TITLE_MAX;
    } else if (nu) {
      // Món 'and' phải nói đủ điều kiện kép (cond), không chỉ "Cấp X".
      nextLine = 'Còn ' + (pr.nextXp - pr.curXp) + ' XP tới cấp ' + (pr.level + 1) +
        ' · Mở tiếp theo: ' + nu.icon + ' ' + nu.name + ' (' + (nu.cond || ('Cấp ' + nu.level)) + ')';
    } else {
      nextLine = 'Còn ' + (pr.nextXp - pr.curXp) + ' XP tới cấp ' + (pr.level + 1);
    }
    return '<div class="glv' + (opts.mini ? ' glv-mini' : '') + '" role="status" aria-label="Cấp người chơi">' +
      '<div class="glv-badge" aria-hidden="true"><span class="glv-badge-lv">' + pr.level + '</span><span class="glv-badge-tx">CẤP</span></div>' +
      '<div class="glv-main">' +
        '<div class="glv-head"><b>Cấp ' + pr.level + '</b>' +
          (max ? '<span class="glv-title12">🏆 ' + TITLE_MAX + '</span>' : '') +
          '<span class="glv-xpv">' + pr.xp + ' XP</span></div>' +
        '<div class="glv-bar"><span class="glv-fill" style="width:' + pr.pct + '%"></span></div>' +
        '<div class="glv-next">' + esc(nextLine) + '</div>' +
      '</div></div>';
  }
  function mountInto(el, opts) {
    if (!el) return;
    try { el.innerHTML = mountHTML(opts); } catch (e) { /* bỏ qua */ }
  }

  /* ------------------------- Thông báo lên cấp ------------------------- */
  function reducedMotion() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }
  function getSeen() {
    try {
      var v = localStorage.getItem(SEEN_KEY);
      if (v === null || v === undefined) return null;
      var n = parseInt(v, 10);
      return isNaN(n) ? null : n;
    } catch (e) { return null; }
  }
  function setSeen(n) {
    try { localStorage.setItem(SEEN_KEY, String(n)); } catch (e) { /* bỏ qua */ }
  }
  function showOverlay(fromLv, toLv) {
    if (document.querySelector('.glv-overlay')) return;
    var items = unlocksBetween(fromLv, toLv);
    var ov = document.createElement('div');
    ov.className = 'glv-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Lên cấp ' + toLv);
    var listHtml = items.length
      ? '<div class="glv-pop-list">' + items.map(function (it) {
          return '<div class="glv-pop-it"><span aria-hidden="true">' + it.icon + '</span>' +
            '<span><b>' + esc(it.name) + '</b> <span class="glv-pop-kind">' + esc(KIND_LABEL[it.kind] || it.kind) + '</span></span>' +
            // Món 'and': nhãn phải là cond đủ điều kiện kép, không chỉ cấp.
            '<span class="glv-pop-lv">' + esc(it.mode === 'and' && it.cond ? it.cond : ('Cấp ' + it.level)) + '</span></div>';
        }).join('') + '</div>'
      : '<p class="glv-pop-none">Cấp mới, sức mạnh mới — tiếp tục hành trình đến Edo nhé!</p>';
    ov.innerHTML = '<div class="glv-pop">' +
      '<div class="glv-pop-ttl">🎉 LÊN CẤP ' + toLv + '!</div>' +
      (toLv >= LEVELS.length ? '<div class="glv-pop-sub">🏆 Danh hiệu: ' + TITLE_MAX + '</div>' : '') +
      listHtml +
      '<button type="button" class="glv-pop-btn">Tuyệt vời! 🎉</button></div>';
    document.body.appendChild(ov);
    var btn = ov.querySelector('.glv-pop-btn');
    function close() { try { ov.remove(); } catch (e) { /* bỏ qua */ } }
    if (btn) btn.addEventListener('click', close);
    ov.addEventListener('click', function (ev) { if (ev.target === ov) close(); });
    if (!reducedMotion()) {
      try {
        if (window.GFX) {
          if (typeof window.GFX.confetti === 'function') window.GFX.confetti(70);
          if (typeof window.GFX.burst === 'function') window.GFX.burst(ov.querySelector('.glv-pop'), 36);
        }
      } catch (e) { /* pháo giấy là phụ */ }
    }
  }
  function checkNotify() {
    var readyP;
    try {
      readyP = (window.GGEAR && typeof window.GGEAR.ready === 'function')
        ? Promise.resolve(window.GGEAR.ready()) : Promise.resolve();
    } catch (e) { readyP = Promise.resolve(); }
    return readyP.then(function () {
      var lv = level();
      var seen = getSeen();
      if (seen === null) {
        if (lv <= 1) { setSeen(lv); return false; }
        seen = 1; // tính năng mới ra mắt: ăn mừng 1 lần, mốc từ cấp 1
      }
      if (lv <= seen) { if (seen < lv) setSeen(lv); return false; }
      showOverlay(seen, lv);
      setSeen(lv);
      return true;
    }).catch(function () { return false; });
  }

  window.GLEVEL = {
    LEVELS: LEVELS,
    TITLE_MAX: TITLE_MAX,
    level: level,
    xp: xp,
    progress: progress,
    unlocksBetween: unlocksBetween,
    levelItems: levelItems,
    nextUnlock: nextUnlock,
    mountHTML: mountHTML,
    mountInto: mountInto,
    checkNotify: checkNotify
  };
})();
