/* =====================================================================
   lang-edo.js — 🏘️ Xây Làng Edo (game-plus §2)
   - Tài nguyên: số dư đọc qua window.GPLUS.balance() (e − s trong
     hn_game_v1 mục v — plus.js là nguồn sự thật duy nhất).
   - Xây/nâng cấp: kiểm số dư -> GPLUS.load() đọc TOÀN BỘ hn_game_v1,
     chỉ sửa mục v (s cộng dồn chi phí, b ghi cấp mới, _t = now) rồi
     GPLUS.save() ghi lại nguyên khối — BẢO TOÀN w/d/x/u/t/c và mọi
     khoá lạ, tuyệt đối không ghi đè trắng.
   - Khách chưa đăng nhập vẫn xem/xây bình thường (dữ liệu local như
     mọi tiến độ game khác) — không chặn, không gọi API.
   - Hiệu ứng dựng nhà: WAAPI 1 lần khi xây xong, tôn trọng
     prefers-reduced-motion (helper cùng mẫu chay-vo-tan.js).
   ===================================================================== */
(function () {
  'use strict';

  var RES = [
    { k: 'go', icon: '🪵', name: 'Gỗ' },
    { k: 'da', icon: '🪨', name: 'Đá' },
    { k: 'xu', icon: '🪙', name: 'Xu' }
  ];

  function $(id) { return document.getElementById(id); }
  function escSafe(s) {
    if (typeof window.esc === 'function') return window.esc(s);
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function reducedMotion() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }

  /* ---------- Đọc dữ liệu (qua GPLUS; guard dự phòng khi thiếu plus.js) ---------- */
  function loadAll() {
    try {
      if (window.GPLUS && typeof GPLUS.load === 'function') return GPLUS.load() || {};
    } catch (e) { /* rơi xuống dự phòng */ }
    try {
      var raw = localStorage.getItem('hn_game_v1');
      var o = raw ? JSON.parse(raw) : null;
      return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
    } catch (e) { return {}; }
  }
  function saveAll(o) {
    try {
      if (window.GPLUS && typeof GPLUS.save === 'function') return GPLUS.save(o);
    } catch (e) { /* rơi xuống dự phòng */ }
    try { localStorage.setItem('hn_game_v1', JSON.stringify(o)); return true; }
    catch (e) { return false; }
  }
  function getV(root) {
    var v = (root && typeof root.v === 'object' && root.v) ? root.v : {};
    return v;
  }
  function levelOf(v, id) {
    var b = (v && typeof v.b === 'object' && v.b) ? v.b : {};
    var n = parseInt(b[id], 10);
    if (!isFinite(n)) return 0;
    return Math.max(0, Math.min(3, n));
  }
  function balance() {
    try {
      if (window.GPLUS && typeof GPLUS.balance === 'function') {
        var b = GPLUS.balance() || {};
        return { go: b.go || 0, da: b.da || 0, xu: b.xu || 0 };
      }
    } catch (e) { /* rơi xuống dự phòng */ }
    var v = getV(loadAll());
    var e2 = v.e || {}, s2 = v.s || {};
    return {
      go: Math.max(0, (e2.go || 0) - (s2.go || 0)),
      da: Math.max(0, (e2.da || 0) - (s2.da || 0)),
      xu: Math.max(0, (e2.xu || 0) - (s2.xu || 0))
    };
  }
  function normRes(r) {
    r = (r && typeof r === 'object') ? r : {};
    return { go: r.go || 0, da: r.da || 0, xu: r.xu || 0 };
  }
  function missingFor(cost, bal) {
    var miss = [];
    RES.forEach(function (r) {
      var need = (cost && cost[r.k]) || 0;
      if (need > bal[r.k]) miss.push({ k: r.k, icon: r.icon, name: r.name, amt: need - bal[r.k] });
    });
    return miss;
  }

  /* ---------- Vẽ ---------- */
  function renderRes(bal) {
    if ($('resGo')) $('resGo').textContent = String(bal.go);
    if ($('resDa')) $('resDa').textContent = String(bal.da);
    if ($('resXu')) $('resXu').textContent = String(bal.xu);
  }

  function yardHTML(v) {
    var cat = window.GVILLAGE;
    return cat.order.map(function (id) {
      var it = cat.items[id];
      var lv = levelOf(v, id);
      if (!lv) {
        return '<div class="le-cell empty" data-cell="' + escSafe(id) + '" data-lv="0">' +
          '<span class="le-ico">' + it.icon + '</span>' +
          '<span class="le-cell-name">' + escSafe(it.name) + '</span>' +
          '<span class="le-cell-sub">Chưa xây</span>' +
          '<span class="le-dots" aria-hidden="true"><i class="le-dot"></i><i class="le-dot"></i><i class="le-dot"></i></span>' +
          '</div>';
      }
      var deco = '';
      if (lv >= 2) deco += '<span class="le-deco d1" aria-hidden="true">✿</span>';
      if (lv >= 3) deco += '<span class="le-deco d2" aria-hidden="true">🏮</span>';
      var dots = '';
      for (var i = 1; i <= 3; i++) dots += '<i class="le-dot' + (i <= lv ? ' on' : '') + '"></i>';
      return '<div class="le-cell built" data-cell="' + escSafe(id) + '" data-lv="' + lv + '">' + deco +
        '<span class="le-ico">' + it.icon + '</span>' +
        '<span class="le-cell-name">' + escSafe(it.names[lv - 1]) + '</span>' +
        '<span class="le-cell-sub">' + escSafe(it.name) + ' · Cấp ' + lv + '</span>' +
        '<span class="le-dots" aria-hidden="true">' + dots + '</span>' +
        '</div>';
    }).join('');
  }

  function cardHTML(id, v, bal) {
    var cat = window.GVILLAGE;
    var it = cat.items[id];
    var lv = levelOf(v, id);
    var head =
      '<div class="le-card-head"><span class="le-card-ico">' + it.icon + '</span>' +
      '<div class="le-card-t"><h3>' + escSafe(it.name) + '</h3>' +
      '<p class="le-cur">' + (lv ? 'Hiện tại: ' + escSafe(it.names[lv - 1]) : 'Chưa xây') + '</p></div>' +
      '<span class="le-lvl">Cấp ' + lv + '/3</span></div>';
    if (lv >= 3) {
      return '<article class="le-card" data-card="' + escSafe(id) + '">' + head +
        '<p class="le-desc">' + escSafe(it.descs[2]) + '</p>' +
        '<p class="le-max">⭐ Cấp tối đa</p></article>';
    }
    var cost = it.cost[lv] || {};
    var miss = missingFor(cost, bal);
    var afford = miss.length === 0;
    var chips = RES.filter(function (r) { return (cost[r.k] || 0) > 0; }).map(function (r) {
      var lack = (cost[r.k] || 0) > bal[r.k];
      return '<span class="' + (lack ? 'lack' : '') + '">' + r.icon + ' ' + (cost[r.k] || 0) + '</span>';
    }).join('');
    var missLine = afford ? '' :
      '<p class="le-miss">Thiếu: ' + miss.map(function (m) { return m.icon + ' ' + m.amt + ' ' + m.name.toLowerCase(); }).join(' · ') + '</p>';
    var label = (lv === 0 ? '🔨 Xây ' : '⬆️ Nâng cấp lên ') + it.names[lv];
    return '<article class="le-card" data-card="' + escSafe(id) + '">' + head +
      '<p class="le-desc">' + escSafe(it.descs[lv]) + '</p>' +
      '<div class="le-cost" aria-label="Chi phí">' + chips + '</div>' +
      missLine +
      '<button type="button" class="mx-btn le-build" data-build="' + escSafe(id) + '"' +
      (afford ? '' : ' disabled') + '>' + escSafe(label) + '</button></article>';
  }

  function render() {
    var yard = $('yard'), panel = $('panel');
    if (!window.GVILLAGE || !GVILLAGE.order || !GVILLAGE.items) {
      if (yard) yard.innerHTML = '<div class="mx-err"><div class="mx-big-emoji">🏘️</div><p class="mx-mut">Chưa tải được danh mục công trình.</p></div>';
      if (panel) panel.innerHTML = '';
      return;
    }
    var root = loadAll();
    var v = getV(root);
    var bal = balance();
    renderRes(bal);
    if (yard) yard.innerHTML = yardHTML(v);
    if (panel) {
      panel.innerHTML = GVILLAGE.order.map(function (id) { return cardHTML(id, v, bal); }).join('');
    }
    var hint = $('emptyHint');
    if (hint) {
      var built = GVILLAGE.order.some(function (id) { return levelOf(v, id) > 0; });
      hint.classList.toggle('mx-hid', built);
    }
  }

  /* ---------- Hiệu ứng + toast ---------- */
  function bounce(id) {
    if (reducedMotion()) return;
    var cell = document.querySelector('[data-cell="' + id + '"]');
    if (!cell || typeof cell.animate !== 'function') return;
    try {
      cell.animate(
        [{ transform: 'scale(1) translateY(0)' }, { transform: 'scale(1.1) translateY(-7px)' }, { transform: 'scale(1) translateY(0)' }],
        { duration: 480, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      var ico = cell.querySelector('.le-ico');
      if (ico && typeof ico.animate === 'function') {
        ico.animate(
          [{ transform: 'translateY(10px) scale(.6)', opacity: '.3' }, { transform: 'translateY(0) scale(1)', opacity: '1' }],
          { duration: 480, easing: 'ease-out' });
      }
    } catch (e) { /* hiệu ứng lỗi không được làm gãy việc xây */ }
  }
  function showToast(msg) {
    if (typeof window.toast === 'function') { window.toast(msg); return; }
    if (typeof window.GAME_toast === 'function') { window.GAME_toast(msg); return; }
    var d = document.createElement('div');
    d.className = 'le-toast';
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1800);
  }

  /* ---------- Xây / nâng cấp ---------- */
  function build(id) {
    var cat = window.GVILLAGE;
    if (!cat || !cat.items || !cat.items[id]) return;
    var it = cat.items[id];
    var root = loadAll();           // đọc lại TOÀN BỘ hn_game_v1 ngay trước khi ghi
    var v = getV(root);
    var cur = levelOf(v, id);
    if (cur >= 3) { render(); return; }
    var cost = it.cost[cur];
    if (!cost) { render(); return; }
    var bal = balance();
    if (missingFor(cost, bal).length) { render(); return; }  // số dư đã đổi: vẽ lại, không trừ

    v.e = normRes(v.e);
    v.s = normRes(v.s);
    v.b = (v.b && typeof v.b === 'object') ? v.b : {};
    RES.forEach(function (r) { v.s[r.k] += (cost[r.k] || 0); });
    v.b[id] = cur + 1;
    v._t = Date.now();
    root.v = v;                     // các mục khác (w/d/x/u/t/c...) giữ nguyên trong root
    if (!saveAll(root)) { render(); return; }

    render();
    bounce(id);
    showToast('Đã xây ' + it.name + ' (' + it.names[cur] + ') cấp ' + (cur + 1) + ' 🏘️');
  }

  /* ---------- Khởi tạo ---------- */
  function init() {
    try {
      if (typeof window.GAME_mountSndToggles === 'function') window.GAME_mountSndToggles();
    } catch (e) { /* nút âm thanh không sẵn: bỏ qua, trang vẫn chạy */ }
    var panel = $('panel');
    if (panel) {
      panel.addEventListener('click', function (ev) {
        var b = ev.target && ev.target.closest ? ev.target.closest('[data-build]') : null;
        if (!b || b.disabled) return;
        build(b.getAttribute('data-build'));
      });
    }
    // Tài nguyên vừa được cộng ở ngay trang này (plus.js phát sự kiện) -> vẽ lại số dư
    document.addEventListener('gplus:res', function () { render(); });
    // Máy/tab khác vừa đổi hn_game_v1 -> vẽ lại cho khớp
    window.addEventListener('storage', function (ev) {
      if (ev && ev.key === 'hn_game_v1') render();
    });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
