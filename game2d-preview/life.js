// life.js — ĐI LẠI + MÙA + ĐỜI SỐNG (giai đoạn 6, lệnh chủ trang 14:03–14:04 JST 31/10/2026).
//  A) ĐI TÀU: máy bán vé ở ga (vật 'station-ticket') mở màn hình mua vé: TÀU ĐIỆN thường
//     (chặng gần, vài trăm yên) + SHINKANSEN (chặng xa 大阪/名古屋/神戸…, ¥8.000–14.000/chiều).
//     Tiền trừ qua moneyTxn() của file này, reason 'travel.train.*' / 'travel.shinkansen.*' /
//     'travel.ekiben'. BỔ SUNG cho cửa đi bộ, KHÔNG phá khoá truyện: nơi chưa mở theo truyện
//     thì vé báo rõ lý do. Chọn mục đích: đi một mình / đi cùng bạn (Hùng · Hằng · Yui nếu
//     điều kiện quan hệ cho phép) — bạn đi cùng xuất hiện ĐI THEO SAU người chơi ở bản đồ
//     đích (qua WORLD2D.setRemote + vòng bám vị trí). Chuyển cảnh trên tàu: cửa sổ chạy
//     cảnh + thông báo tàu (clip câu nghe listen.js) + mua ekiben / ăn đồ tủ lạnh mang theo.
//     VỀ NGƯỜI YÊU LINH: Linh ở Việt Nam — arc thăm người yêu bằng MÁY BAY nối từ hệ này là
//     THIẾT KẾ ở KHUNG-GAME (chưa làm cảnh Linh ở Nhật ở giai đoạn này).
//  B) MÙA: suy từ tiến trình truyện (KHUNG-GAME §4.11): Ch1 + đầu Ch2 (tháng 10–11) = THU 🍁 ·
//     sau lương đầu Ch2 (tháng 12) = ĐÔNG ❄ · đỗ mốc N4 / sang Ch3 (tháng 3) = XUÂN 🌸.
//     Ngoài trời (street/station/park/temple/shotengai) có hạt rơi nhẹ theo mùa (canvas
//     riêng, 26 hạt — đo FPS ở harness). Sự kiện: hanami (xuân, công viên) / momiji (thu,
//     chùa + công viên) — cảnh trong scenes-i.js; đi cùng bạn → +Tình cảm, đi một mình →
//     giảm Áp lực ẩn, có đồ ăn/đồ uống trong kho siêu thị → cộng thêm (xử lý ở story.js).
//  C) XÃ HỘI: lời mời họp đồng hương đến SAU KHI nhận lương đầu (toast + cờ invite trong
//     trạng thái life), sự kiện lặp theo mỗi mốc chương; cảnh 'dong-huong' ở công viên.
//  Trạng thái lưu qua FLOW.getLife/setLife (runtime.life) + gương localStorage.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var LSKEY = 'tuoitre2d_life_v1';

  /* ================= MÙA ================= */
  function season() {
    var f = (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {};
    var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {};
    if (f.exam2Passed || (st.chapter || 0) >= 3) return 'spring';
    if (f.salaryDone) return 'winter';
    return 'autumn';
  }
  var SEASON_INFO = {
    spring: { emoji: '🌸', name: 'Mùa xuân — tháng 3, anh đào nở', particle: '#f7a8c4' },
    autumn: { emoji: '🍁', name: 'Mùa thu — tháng 10–11, lá đỏ', particle: '#e2703a' },
    winter: { emoji: '❄️', name: 'Mùa đông — tháng 12, cuối năm', particle: '#dbeafe' }
  };
  var OUTDOOR = ['street', 'station', 'park', 'temple', 'shotengai'];

  /* ---- hạt rơi theo mùa (canvas phủ, nhẹ) ---- */
  var fxCanvas = null, fxCtx = null, parts = [], fxRun = false;
  function ensureFx() {
    if (fxCanvas) return;
    fxCanvas = document.createElement('canvas');
    fxCanvas.id = 'season-fx';
    fxCanvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:6;';
    document.body.appendChild(fxCanvas);
    fxCtx = fxCanvas.getContext('2d');
    var rs = function () { fxCanvas.width = innerWidth; fxCanvas.height = innerHeight; };
    rs(); addEventListener('resize', rs);
    for (var i = 0; i < 26; i++) parts.push({ x: Math.random(), y: Math.random(), s: 0.0006 + Math.random() * 0.0012, r: 3 + Math.random() * 4, ph: Math.random() * 6.28 });
  }
  function fxLoop() {
    if (!fxRun) { fxCtx && fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height); return; }
    var info = SEASON_INFO[season()];
    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    fxCtx.fillStyle = info.particle;
    parts.forEach(function (p) {
      p.y += p.s; p.ph += 0.02; if (p.y > 1.02) { p.y = -0.02; p.x = Math.random(); }
      var x = (p.x + Math.sin(p.ph) * 0.012) * fxCanvas.width, y = p.y * fxCanvas.height;
      fxCtx.beginPath(); fxCtx.arc(x, y, p.r, 0, 6.29); fxCtx.fill();
    });
    requestAnimationFrame(fxLoop);
  }
  function refreshSeasonFx() {
    var map = (window.WORLD2D && window.WORLD2D.snapshot) ? window.WORLD2D.snapshot().map : null;
    var show = OUTDOOR.indexOf(map) >= 0;
    var badge = $('hud-season');
    if (badge) badge.textContent = SEASON_INFO[season()].emoji + ' ' + SEASON_INFO[season()].name;
    if (show && !fxRun) { ensureFx(); fxRun = true; fxLoop(); }
    if (!show) fxRun = false;
  }

  /* ================= TRẠNG THÁI ================= */
  var L = { photos: [], donghuongCount: 0, inviteCycle: -1, hanamiDone: false, momijiDone: false, ledger: [] };
  function serialize() { return { photos: L.photos.slice(), donghuongCount: L.donghuongCount, inviteCycle: L.inviteCycle, hanamiDone: L.hanamiDone, momijiDone: L.momijiDone, ledger: L.ledger.slice(-100) }; }
  function persist() {
    if (window.FLOW && window.FLOW.setLife) window.FLOW.setLife(serialize());
    try { localStorage.setItem(LSKEY, JSON.stringify(serialize())); } catch (e) {}
  }
  function onGameStart() {
    var d = null;
    if (window.FLOW && window.FLOW.getLife) d = window.FLOW.getLife();
    if (!d) { try { d = JSON.parse(localStorage.getItem(LSKEY)); } catch (e) {} }
    if (d && typeof d === 'object') {
      L.photos = Array.isArray(d.photos) ? d.photos : [];
      L.donghuongCount = d.donghuongCount | 0;
      L.inviteCycle = typeof d.inviteCycle === 'number' ? d.inviteCycle : -1;
      L.hanamiDone = !!d.hanamiDone; L.momijiDone = !!d.momijiDone;
      L.ledger = Array.isArray(d.ledger) ? d.ledger.slice(-100) : [];
    }
    setInterval(refreshSeasonFx, 1500);
    refreshSeasonFx();
  }
  function moneyYen() { return Math.round((window.GAMEUI ? window.GAMEUI.stats().money : 0) * 10000); }
  function yen(n) { return '¥' + n.toLocaleString('en-US'); }
  function moneyTxn(yenDelta, reason, note) {   // CỬA DUY NHẤT đổi tiền của hệ đi lại/đời sống
    if (!yenDelta) return;
    window.GAMEUI.apply({ money: yenDelta / 10000 }, note);
    L.ledger.push({ t: Date.now(), yen: yenDelta, reason: reason });
    if (L.ledger.length > 100) L.ledger = L.ledger.slice(-100);
    persist();
  }

  /* ================= ĐI TÀU ================= */
  // mode: train = tàu điện thường · shinkansen = chặng xa. lock(f) trả về lý do khoá hoặc null.
  var DESTS = [
    { map: 'street', mode: 'train', price: 180, label: 'Đường phố 吉祥寺' },
    { map: 'combini', mode: 'train', price: 210, label: 'Combini 秋葉原' },
    { map: 'restaurant', mode: 'train', price: 230, label: 'Nhà hàng 築地' },
    { map: 'park', mode: 'train', price: 240, label: 'Công viên 代々木' },
    { map: 'school', mode: 'train', price: 260, label: 'Trường tiếng 早稲田' },
    { map: 'shotengai', mode: 'train', price: 190, label: 'Phố mua sắm 浅草' },
    { map: 'mall', mode: 'train', price: 290, label: 'Trung tâm thương mại 銀座' },
    { map: 'hotel', mode: 'train', price: 390, label: 'Khách sạn お台場' },
    { map: 'genba', mode: 'train', price: 570, label: 'Công trường 横浜' },
    { map: 'soko', mode: 'train', price: 620, label: 'Kho vận 千葉' },
    { map: 'temple', mode: 'train', price: 950, label: 'Chùa 鎌倉' },
    { map: 'seizo', mode: 'shinkansen', price: 10560, label: 'Nhà máy chế tạo 名古屋' },
    { map: 'seibi', mode: 'shinkansen', price: 11000, label: 'Xưởng ô tô 豊田 (qua 名古屋)' },
    { map: 'shokuhin', mode: 'shinkansen', price: 13800, label: 'Nhà máy thực phẩm 大阪' },
    { map: 'kaigo', mode: 'shinkansen', price: 13900, label: 'Nơi làm kaigo 神戸' },
    { map: 'nogyo', mode: 'plane', price: 0, label: 'Nông trại 富良野 (北海道)' }
  ];
  function lockReason(d) {
    var f = (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {};
    if (d.mode === 'plane') return 'Quá xa — phải đi máy bay. Hệ bay nối từ hệ đi lại này sẽ mở ở đợt sau.';
    if (!f.arrived) return 'Chưa tới Nhật/phòng trọ — xong nhịp tới nơi đã nhé.';
    if (d.mode === 'shinkansen' && !f.salaryDone) return 'Chặng xa tốn kém — đợi nhận LƯƠNG ĐẦU ở Chương 2 rồi hãy đi chơi xa.';
    return null;
  }
  function companions() {
    var f = (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {};
    var list = [{ id: null, name: 'Đi một mình', sprite: null }];
    if (f.hungDone) list.push({ id: 'hung', name: 'Rủ anh Hùng đi cùng', sprite: 'heroM' });
    if (f.combiniDone) list.push({ id: 'yui', name: 'Rủ Yui đi cùng (nếu cô ấy rảnh)', sprite: 'heroF' });
    list.push({ id: 'hang', name: 'Rủ Hằng — bạn cùng lớp — đi cùng', sprite: 'heroF' });
    return list;
  }
  var companion = null, compTimer = null, trail = [];
  function startCompanion(c) {
    stopCompanion();
    if (!c || !c.sprite) return;
    companion = c; trail = [];
    compTimer = setInterval(function () {
      var snap = window.WORLD2D.snapshot();
      if (!snap.player) return;
      trail.push({ map: snap.map, x: snap.player.x, y: snap.player.y, dir: snap.player.dir });
      if (trail.length > 6) trail.shift();
      var lag = trail[0];
      if (lag && lag.map === snap.map) window.WORLD2D.setRemote('companion', { map: lag.map, name: c.name, sprite: c.sprite, x: lag.x, y: lag.y, dir: lag.dir });
    }, 280);
    window.GAMEUI.toast('👥 ' + c.name.replace('Rủ ', '').replace(' đi cùng', '') + ' đi cùng bạn trong chuyến này — họ sẽ đi theo sau.');
  }
  function stopCompanion() {
    if (compTimer) clearInterval(compTimer); compTimer = null;
    companion = null;
    if (window.WORLD2D) window.WORLD2D.removeRemote('companion');
  }

  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  var selDest = null, selComp = null;
  function renderTravel() {
    var card = $('travel-card'); if (!card) return;
    card.innerHTML = '';
    card.appendChild(h('h3', null, '🚉 Máy bán vé — ga 新宿'));
    card.appendChild(h('div', 'sub', 'Chọn điểm đến + người đi cùng, mua vé là lên tàu. Vé tàu điện vài trăm yên · Shinkansen chặng xa ¥8.000–14.000/chiều. 💴 Ví: ' + yen(moneyYen()) + ' · ' + SEASON_INFO[season()].emoji + ' ' + SEASON_INFO[season()].name));
    var sec = h('div', 'style-sec'); sec.appendChild(h('div', 'style-sec-t', '👥 Mục đích / người đi cùng')); card.appendChild(sec);
    var row = h('div', 'style-row'); sec.appendChild(row);
    companions().forEach(function (c) {
      var b = h('button', 'style-chip' + ((selComp && selComp.id === c.id) || (!selComp && !c.id) ? ' on' : ''), c.name);
      b.type = 'button';
      b.addEventListener('click', function () { selComp = c; renderTravel(); });
      row.appendChild(b);
    });
    DESTS.forEach(function (d) {
      var lock = lockReason(d);
      var rowEl = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', (d.mode === 'shinkansen' ? '🚅' : d.mode === 'plane' ? '✈️' : '🚃') + ' ' + d.label));
      info.appendChild(h('div', 'shop-jp', lock ? '🔒 ' + lock : (d.mode === 'shinkansen' ? 'Shinkansen — nhanh, êm, mắc' : 'Tàu điện thường — rẻ, dừng nhiều ga')));
      if (!lock) info.appendChild(h('div', 'shop-price', yen(d.price) + ' / chiều'));
      rowEl.appendChild(info);
      if (!lock) {
        var b = h('button', 'btn primary', 'Mua vé & đi'); b.type = 'button';
        b.addEventListener('click', function () { buyTrip(d); });
        rowEl.appendChild(b);
      }
      card.appendChild(rowEl);
    });
    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn ghost', 'Để sau'); done.type = 'button';
    done.addEventListener('click', function () { $('modal-travel').classList.remove('show'); });
    btnrow.appendChild(done); card.appendChild(btnrow);
  }
  function openTravel() { selDest = null; renderTravel(); $('modal-travel').classList.add('show'); }
  function buyTrip(d) {
    if (moneyYen() < d.price) { window.GAMEUI.toast('💴 Không đủ tiền mua vé ' + yen(d.price) + ' — ví đang có ' + yen(moneyYen()) + '.'); return { ok: false, why: 'money' }; }
    moneyTxn(-d.price, 'travel.' + (d.mode === 'shinkansen' ? 'shinkansen' : 'train') + '.' + d.map, 'Vé ' + (d.mode === 'shinkansen' ? 'Shinkansen' : 'tàu điện') + ' đi ' + d.label + ' — ' + yen(d.price));
    selDest = d;
    renderTransit(d);
    return { ok: true };
  }
  function renderTransit(d) {
    var card = $('travel-card'); if (!card) return;
    card.innerHTML = '';
    card.appendChild(h('h3', null, (d.mode === 'shinkansen' ? '🚅 Đang trên Shinkansen' : '🚃 Đang trên tàu') + ' — đi ' + d.label));
    var win = h('div', 'train-window');
    win.innerHTML = '<div class="train-stripes"></div><div class="train-note">🪟 Cảnh ngoài cửa sổ chạy qua vun vút… nhà cửa, đồng ruộng, núi xa. Nghe thông báo tàu:</div>';
    card.appendChild(win);
    var bank = window.LISTEN_N5 || [];
    var clip = bank[Math.floor(Math.random() * bank.length)];
    if (clip) {
      var au = new Audio(clip.audio);
      var pb = h('button', 'btn ghost', '🔊 Nghe thông báo trên tàu'); pb.type = 'button';
      pb.addEventListener('click', function () { au.currentTime = 0; au.play().catch(function () {}); });
      card.appendChild(pb);
    }
    var acts = h('div', 'btnrow');
    var ek = h('button', 'btn ghost', '🍱 Mua ekiben ở ga — ¥980'); ek.type = 'button';
    ek.addEventListener('click', function () {
      if (moneyYen() < 980) { window.GAMEUI.toast('💴 Không đủ tiền mua ekiben.'); return; }
      moneyTxn(-980, 'travel.ekiben', 'Ekiben ăn trên tàu — ¥980');
      window.GAMEUI.apply({ hp: 3 }, 'Ekiben trên tàu: cơm hộp vùng miền, ăn ngắm cảnh thì ngon gấp đôi');
      ek.disabled = true;
    });
    acts.appendChild(ek);
    var stock = (window.MARKET && window.MARKET.stock) ? window.MARKET.stock() : {};
    var mealId = Object.keys(stock).find(function (id) { var it = (window.MARKET.catalog() || []).find(function (x) { return x.id === id; }); return it && it.fx === 'meal'; });
    if (mealId) {
      var use = h('button', 'btn ghost', '🎒 Ăn đồ mang theo từ tủ lạnh'); use.type = 'button';
      use.addEventListener('click', function () { window.MARKET.consume(mealId); use.disabled = true; });
      acts.appendChild(use);
    }
    var arr = h('button', 'btn primary', '🛬 Tới nơi — xuống tàu'); arr.type = 'button';
    arr.addEventListener('click', function () {
      $('modal-travel').classList.remove('show');
      window.WORLD2D.gotoMap(d.map);
      if (selComp && selComp.sprite) startCompanion(selComp);
      window.GAMEUI.toast('🚉 Đã tới ' + d.label + '!');
    });
    acts.appendChild(arr);
    card.appendChild(acts);
  }

  /* ================= SỰ KIỆN MÙA / XÃ HỘI (story.js gọi) ================= */
  function addPhoto(kind) {
    L.photos.push({ kind: kind, at: Date.now(), season: season() });
    persist();
  }
  function eventBonus(kind) {   // cộng thêm sau cảnh hanami/momiji/dong-huong (story.js onSceneEnd gọi)
    var bonus = [];
    var stock = (window.MARKET && window.MARKET.stock) ? window.MARKET.stock() : {};
    var hasFood = Object.keys(stock).length > 0;
    if (companion) { window.GAMEUI.apply({ love: 3 }, 'Đi cùng bạn — vui gấp đôi, tình cảm +3'); bonus.push('companion+love3'); }
    else window.GAMEUI.apply({ pressure: -2 }, 'Đi một mình tĩnh tâm — áp lực vơi đi');
    if (hasFood && (kind === 'hanami' || kind === 'momiji' || kind === 'dong-huong')) {
      var id = Object.keys(stock)[0];
      window.MARKET.consume(id);
      window.GAMEUI.toast('🎒 Đồ ăn/đồ uống mang theo từ siêu thị phát huy tác dụng — buổi đi chơi trọn vẹn hơn hẳn!');
      bonus.push('pantry-used');
    }
    if (kind === 'hanami') { L.hanamiDone = true; addPhoto('hanami'); }
    if (kind === 'momiji') { L.momijiDone = true; addPhoto('momiji'); }
    if (kind === 'dong-huong') { L.donghuongCount++; moneyTxn(-2000, 'social.donghuong', 'Họp đồng hương — góp tiền BBQ chia đều ¥2,000'); }
    persist();
    return bonus;
  }
  function inviteCheck() {   // lời mời đồng hương: mở sau lương đầu, lặp theo mốc chương
    var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {};
    var cyc = (st.chaptersDone || []).length;
    var f = (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {};
    if (f.salaryDone && L.inviteCycle < cyc) {
      L.inviteCycle = cyc; persist();
      window.GAMEUI.toast('📱 Anh Hùng nhắn: "Chủ nhật này hội đồng hương BBQ ở công viên 代々木 — ra công viên nhé, đỡ nhớ nhà!" (điểm tương tác 🇻🇳 ở công viên)');
      return true;
    }
    return false;
  }

  window.LIFE = {
    onGameStart: onGameStart, season: season, seasonInfo: function () { return SEASON_INFO[season()]; },
    openTravel: openTravel, buyTrip: buyTrip, dests: function () { return JSON.parse(JSON.stringify(DESTS)); },
    lockReason: lockReason, companion: function () { return companion ? JSON.parse(JSON.stringify(companion)) : null; },
    stopCompanion: stopCompanion, eventBonus: eventBonus, inviteCheck: inviteCheck,
    photos: function () { return JSON.parse(JSON.stringify(L.photos)); },
    state: function () { return JSON.parse(JSON.stringify(serialize())); },
    ledger: function () { return JSON.parse(JSON.stringify(L.ledger)); },
    refreshSeasonFx: refreshSeasonFx
  };
  window.SEASONS = window.LIFE;
  window.TRAVEL = window.LIFE;
})();
