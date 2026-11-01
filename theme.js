/* =====================================================================
   HNSKIN — Hệ thống 4 giao diện (Manga / Hộp cơm / Fuji / Neon)
   - Mặc định: TỰ ĐỔI THEO NGÀY (giờ JST): thứ tự [manga, bento, fuji, neon]
     theo (ngày-trong-năm % 4).
   - Người dùng chọn tay: nút 🎨 trên thanh trên cùng, hoặc mục "Giao diện"
     trong Hồ sơ cá nhân (panel HOSO của common.js).
   - Lưu lựa chọn ở localStorage 'hn_skin_v1' = {c:'auto'|skin, t:ms}.
     auth.js đã mở rộng HNSYNC.isKey để khóa này đồng bộ theo tài khoản qua
     /progress (gộp theo mốc thời gian — bản mới hơn thắng, mergeVal mặc định).
   - Áp dụng: <html data-skin="..."> + data-skinchoice. Đoạn init sớm trong
     <head> từng trang đặt data-skin trước khi vẽ (chống chớp); file này
     đồng bộ lại + gắn giao diện chọn.
   - Trang chủ: themes.css (chỉ index.html nạp). Trang con: style.css có
     khối biến tông màu theo [data-skin] (chỉ đổi màu nhấn, giữ sáng/tối cũ).
   ===================================================================== */
(function () {
  'use strict';
  var SKINS = ['manga', 'bento', 'fuji', 'neon'];
  var NAMES = { manga: 'Manga', bento: 'Hộp cơm', fuji: 'Fuji', neon: 'Neon' };
  var ICONS = { manga: '🥷', bento: '🍱', fuji: '🗻', neon: '🌃' };
  var KEY = 'hn_skin_v1';

  function readChoice() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (o && typeof o.c === 'string' && (o.c === 'auto' || SKINS.indexOf(o.c) >= 0)) return o.c;
    } catch (e) {}
    return 'auto';
  }
  function autoSkin() {
    var n = new Date(Date.now() + 9 * 36e5), y = n.getUTCFullYear();
    var doy = Math.floor((Date.UTC(y, n.getUTCMonth(), n.getUTCDate()) - Date.UTC(y, 0, 0)) / 864e5);
    return SKINS[doy % 4];
  }
  function eff() { var c = readChoice(); return c === 'auto' ? autoSkin() : c; }
  function apply() {
    var e = eff();
    document.documentElement.dataset.skin = e;
    document.documentElement.dataset.skinchoice = readChoice();
    return e;
  }
  function set(c) {
    if (c !== 'auto' && SKINS.indexOf(c) < 0) c = 'auto';
    try { localStorage.setItem(KEY, JSON.stringify({ c: c, t: Date.now() })); } catch (e) {}
    apply(); paint();
    try { document.dispatchEvent(new CustomEvent('hn-skin', { detail: { choice: c, skin: eff() } })); } catch (e) {}
  }
  window.HNSKIN = { list: SKINS, names: NAMES, icons: ICONS, KEY: KEY, read: readChoice, auto: autoSkin, eff: eff, apply: apply, set: set };
  apply();
  // Đồng bộ từ tài khoản về (hn-synced / hn-hoso) -> áp lại giao diện mới nhất
  document.addEventListener('hn-synced', function () { apply(); paint(); });

  /* ---------- CSS cho nút + menu chọn (tự chứa, trang nào cũng dùng) ---------- */
  var CSS = ''
    + '.hn-skin-btn{margin-left:8px;width:40px;height:40px;flex:none;border-radius:50%;border:1.5px solid var(--line,#e3e0d6);background:var(--card,#fff);font-size:19px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(20,24,40,.10)}'
    + '.hn-skin-btn:active{transform:scale(.94)}'
    + '.hn-skin-menu{position:fixed;top:64px;right:12px;z-index:300;width:min(320px,calc(100vw - 24px));background:var(--card,#fff);color:var(--t,#1c2430);border:1px solid var(--line,#e3e0d6);border-radius:16px;box-shadow:0 18px 48px rgba(10,14,30,.28);padding:10px;font-size:15px}'
    + '.hn-skin-menu h3{margin:4px 8px 8px;font-size:.95rem;letter-spacing:.02em}'
    + '.hn-skin-it{display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:11px 10px;border:2px solid transparent;border-radius:12px;background:transparent;font:inherit;color:inherit;cursor:pointer;min-height:48px}'
    + '.hn-skin-it:hover{background:var(--soft,#f2f4f8)}'
    + '.hn-skin-it.on{border-color:var(--c,#cf3a2e);background:var(--soft,#f2f4f8)}'
    + '.hn-skin-it .ic{font-size:21px;width:28px;text-align:center;flex:none}'
    + '.hn-skin-it .tx{flex:1;min-width:0}.hn-skin-it .tx b{display:block;font-size:.98rem}.hn-skin-it .tx small{display:block;color:var(--m,#4c5866);font-size:.8rem;line-height:1.35}'
    + '.hn-skin-it .ck{flex:none;font-weight:800;color:var(--c,#cf3a2e);visibility:hidden}.hn-skin-it.on .ck{visibility:visible}'
    + '.hn-skin-note{margin:8px 8px 4px;color:var(--m,#4c5866);font-size:.8rem;line-height:1.45}'
    + '.hs-skin-hint{margin-top:6px}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------- Menu chọn giao diện ---------- */
  var menu = null;
  function todayLine() { return 'Hôm nay theo lịch: ' + NAMES[autoSkin()]; }
  function buildMenu() {
    var d = document.createElement('div');
    d.className = 'hn-skin-menu'; d.id = 'hnSkinMenu'; d.setAttribute('role', 'menu');
    var h = '<h3>🎨 Giao diện trang chủ</h3>';
    h += '<button type="button" class="hn-skin-it" data-skin-set="auto"><span class="ic">🔄</span><span class="tx"><b>Tự đổi theo ngày</b><small>' + todayLine() + ' · mỗi ngày một mẫu trong 4 mẫu</small></span><span class="ck">✓</span></button>';
    SKINS.forEach(function (s) {
      h += '<button type="button" class="hn-skin-it" data-skin-set="' + s + '"><span class="ic">' + ICONS[s] + '</span><span class="tx"><b>' + NAMES[s] + '</b><small>' + ({ manga: 'Truyện tranh đen–trắng–hồng, viền đậm', bento: 'Hộp cơm pastel dễ thương', fuji: 'Áp-phích Fuji retro kem–đỏ–vàng', neon: 'Phố đêm Tokyo phát sáng' })[s] + '</small></span><span class="ck">✓</span></button>';
    });
    h += '<p class="hn-skin-note">Chọn một mẫu cố định thì web giữ mẫu đó; chọn “Tự đổi theo ngày” thì mỗi ngày một giao diện mới. Lựa chọn lưu trên máy này và đồng bộ theo tài khoản.</p>';
    d.innerHTML = h;
    d.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('[data-skin-set]');
      if (b) { set(b.getAttribute('data-skin-set')); closeMenu(); }
    });
    return d;
  }
  function paint() {
    if (!menu) return;
    var c = readChoice();
    menu.querySelectorAll('[data-skin-set]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-skin-set') === c); });
    var auto = menu.querySelector('[data-skin-set="auto"] small');
    if (auto) auto.textContent = todayLine() + ' · mỗi ngày một mẫu trong 4 mẫu';
  }
  function openMenu() {
    if (!menu) { menu = buildMenu(); document.body.appendChild(menu); }
    menu.hidden = false; paint();
  }
  function closeMenu() { if (menu) menu.hidden = true; }
  document.addEventListener('click', function (ev) {
    if (!menu || menu.hidden) return;
    if (ev.target.closest && (ev.target.closest('#hnSkinMenu') || ev.target.closest('.hn-skin-btn'))) return;
    closeMenu();
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeMenu(); });

  /* ---------- Nút 🎨 trên thanh trên cùng ---------- */
  function addBtn() {
    var wrap = document.querySelector('.topbar .wrap');
    if (!wrap || wrap.querySelector('.hn-skin-btn')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'hn-skin-btn'; b.textContent = '🎨';
    b.setAttribute('aria-label', 'Đổi giao diện trang chủ'); b.title = 'Đổi giao diện';
    b.addEventListener('click', function (ev) { ev.stopPropagation(); if (menu && !menu.hidden) closeMenu(); else openMenu(); });
    wrap.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addBtn); else addBtn();

  /* ---------- Mục "Giao diện" trong Hồ sơ cá nhân (panel HOSO) ---------- */
  function skinFieldset() {
    var fs = document.createElement('fieldset');
    fs.className = 'hs-fs'; fs.id = 'hsSkinFs';
    function rad(v, t) {
      return '<label class="hs-rad"><input type="radio" name="hsSkin" value="' + v + '"> <span>' + t + '</span></label>';
    }
    fs.innerHTML = '<legend class="hs-lab">Giao diện trang chủ</legend><div class="hs-rads">'
      + rad('auto', '🔄 Tự đổi theo ngày') + rad('manga', '🥷 Manga') + rad('bento', '🍱 Hộp cơm') + rad('fuji', '🗻 Fuji') + rad('neon', '🌃 Neon')
      + '</div><p class="hs-hint hs-skin-hint">' + todayLine() + '. Chọn cố định một mẫu thì web luôn dùng mẫu đó trên mọi máy của bạn.</p>';
    fs.addEventListener('change', function (ev) {
      var r = ev.target.closest && ev.target.closest('input[name="hsSkin"]');
      if (r) set(r.value);
    });
    return fs;
  }
  function paintHoso() {
    var fs = document.getElementById('hsSkinFs'); if (!fs) return;
    var c = readChoice();
    fs.querySelectorAll('input[name="hsSkin"]').forEach(function (r) { r.checked = (r.value === c); });
    var hint = fs.querySelector('.hs-skin-hint');
    if (hint) hint.textContent = todayLine() + '. Chọn cố định một mẫu thì web luôn dùng mẫu đó trên mọi máy của bạn.';
  }
  new MutationObserver(function () {
    var f = document.getElementById('hsF');
    if (f && !document.getElementById('hsSkinFs')) {
      var btns = f.querySelector('.hs-btns');
      var fs = skinFieldset();
      if (btns) f.insertBefore(fs, btns); else f.appendChild(fs);
      paintHoso();
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('hn-skin', paintHoso);
})();
