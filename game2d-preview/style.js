// style.js — HỆ NGOẠI HÌNH + TRUNG TÂM THƯƠNG MẠI (đợt 1, lệnh chủ trang 13:51 JST 31/10/2026).
// Người chơi tự chỉnh: kiểu tóc / màu tóc / màu da / áo / quần-váy (nhóm cơ bản MIỄN PHÍ);
// lên CẤP thì vào TRUNG TÂM THƯƠNG MẠI (bản đồ 'mall' ở phố mua sắm) mua quần áo xịn,
// trang sức & phụ kiện, mỹ phẩm, nước hoa theo cấp mở khoá. Đồ mua vào TỦ ĐỒ, bán lại 50%,
// mặc lên người là sprite đổi ngay (sprites.js có lớp phụ kiện riêng: kính, vòng cổ, túi,
// mũ, đồng hồ, khuyên tai). Mỹ phẩm/nước hoa không vẽ lên sprite được → tính thành
// ✨ ĐIỂM PHONG CÁCH hiển thị RIÊNG ở màn hình ngoại hình — TUYỆT ĐỐI không cộng vào
// bất kỳ chỉ số truyện nào (jp/money/hp/love/risk/pressure giữ nguyên luật cũ).
//
// QUY TẮC CẤP (bám hệ sẵn có, không bịa hệ song song): Cấp phong cách suy thẳng từ
// mốc thi JLPT của máy truyện — cấp 1 = mới sang (đang học N5) · cấp 2 = đã ĐỖ mốc N5
// (FLOW.flags().examPassed) · cấp 3 = đã ĐỖ mốc N4 (exam2Passed). Mall vào được từ đầu
// game, chỉ HÀNG bị khoá theo cấp — đúng ý "lên level mới mua được đồ xịn".
// GIỚI TÍNH/TUYẾN: tuyến truyện + xưng hô giữ nguyên theo lựa chọn ở màn hình bắt đầu
// (không đổi tuyến giữa chừng); màn hình ngoại hình cho TỰ DO chọn phong cách trang phục
// quần hoặc váy cho cả hai tuyến — đổi đồ không phá một cờ truyện nào.
// LƯU: trạng thái nằm ở runtime.style của bản lưu máy truyện (qua FLOW.getStyle/setStyle);
// thêm gương phụ ở localStorage để nạp an toàn kể cả khi máy truyện chưa kịp chạy.
//
// SẴN SÀNG CHO KINH TẾ NGƯỜI CHƠI (lệnh bổ sung 13:55 JST 31/10/2026 — chỉ CHUẨN BỊ NỀN,
// chưa làm chợ/chuyển tiền online thật; đợt riêng có máy chủ sẽ nối sau):
//  (1) Mỗi món trong CATALOG có item ID ỔN ĐỊNH vĩnh viễn (không đổi theo phiên bản gói);
//      mỗi món NGƯỜI CHƠI SỞ HỮU là một INSTANCE riêng có uid riêng (state.instances[]:
//      {uid, itemId, tradeable, via, at}) — bán/chuyển về sau đối chiếu theo uid.
//      Cờ tradeable: món mua ở mall = true (chuyển nhượng được); nhóm cơ bản miễn phí
//      không phải item (chỉ là lựa chọn hiển thị) nên không có instance, không bán/chuyển.
//  (2) MỌI biến động Tiền của hệ này đều đi qua moneyTxn() — một hàm chung duy nhất,
//      luôn ghi SỔ GIAO DỊCH (state.ledger[]) kèm REASON CODE dạng
//      'mall.buy.<quầy>.<itemId>' / 'mall.sell.<quầy>.<itemId>' + số yên + mốc thời gian,
//      để đợt máy chủ đối chiếu sổ được (client staging chưa tự quyết số dư thật khi online).
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var LSKEY = 'tuoitre2d_style_v1';

  /* ================= DANH MỤC HÀNG =================
     price = yên thật (bội số của 100 để khớp sổ tiền man — 0,01 man = 100 yên như các cảnh khác);
     bán lại = 50% làm tròn XUỐNG tới trăm yên. req = cấp phong cách yêu cầu (1..3). */
  var CATALOG = [
    // 👕 THỜI TRANG (kind top/bottom — mặc lên sprite qua màu áo/quần/váy)
    { id: 'ao-thun-trang', counter: 'fashion', kind: 'top', emoji: '👕', name: 'Áo thun trắng basic', jp: '白いTシャツ', price: 1900, req: 1, shirt: '#f4f1ea' },
    { id: 'ao-somi-xanh', counter: 'fashion', kind: 'top', emoji: '👔', name: 'Áo sơ mi xanh', jp: '青いシャツ', price: 3900, req: 1, shirt: '#3d7be0' },
    { id: 'quan-jean', counter: 'fashion', kind: 'bottom', emoji: '👖', name: 'Quần jean xanh đậm', jp: 'ジーンズ', price: 4500, req: 1, color: '#33507e' },
    { id: 'vay-hoa-hong', counter: 'fashion', kind: 'bottom', emoji: '👗', name: 'Váy xòe hồng', jp: 'ピンクのスカート', price: 5400, req: 2, color: '#d96a86', skirt: true },
    { id: 'ao-khoac-den', counter: 'fashion', kind: 'top', emoji: '🧥', name: 'Áo khoác đen', jp: '黒いジャケット', price: 7800, req: 2, shirt: '#33373c' },
    { id: 'dam-da-hoi-do', counter: 'fashion', kind: 'top', emoji: '👗', name: 'Đầm dự tiệc đỏ', jp: '赤いドレス', price: 12800, req: 3, shirt: '#c0392b', dress: true, skirtColor: '#a93226' },
    // 💍 TRANG SỨC & PHỤ KIỆN (kind acc — vẽ lên sprite qua spec.acc)
    { id: 'kinh-mat', counter: 'jewelry', kind: 'acc', emoji: '👓', name: 'Kính gọng đen', jp: '黒い眼鏡', price: 2400, req: 1, acc: 'glasses' },
    { id: 'mu-luoi-trai', counter: 'jewelry', kind: 'acc', emoji: '🧢', name: 'Mũ lưỡi trai đỏ', jp: '赤いキャップ', price: 3200, req: 1, acc: 'hat' },
    { id: 'khuyen-tai', counter: 'jewelry', kind: 'acc', emoji: '✨', name: 'Khuyên tai vàng nhỏ', jp: '金のピアス', price: 4900, req: 2, acc: 'earring' },
    { id: 'vong-co-vang', counter: 'jewelry', kind: 'acc', emoji: '📿', name: 'Vòng cổ vàng', jp: '金のネックレス', price: 6800, req: 2, acc: 'necklace' },
    { id: 'tui-xach-da', counter: 'jewelry', kind: 'acc', emoji: '👜', name: 'Túi xách da nâu', jp: '革のバッグ', price: 9800, req: 2, acc: 'bag' },
    { id: 'dong-ho', counter: 'jewelry', kind: 'acc', emoji: '⌚', name: 'Đồng hồ đeo tay', jp: '腕時計', price: 15800, req: 3, acc: 'watch' },
    // 💄 MỸ PHẨM (kind fx — hiệu ứng: ✨ điểm phong cách, không vẽ lên sprite)
    { id: 'son-duong', counter: 'cosmetics', kind: 'fx', emoji: '💋', name: 'Son dưỡng môi', jp: 'リップクリーム', price: 1000, req: 1, style: 1 },
    { id: 'mascara', counter: 'cosmetics', kind: 'fx', emoji: '🖤', name: 'Mascara', jp: 'マスカラ', price: 1500, req: 1, style: 2 },
    { id: 'son-do', counter: 'cosmetics', kind: 'fx', emoji: '💄', name: 'Son đỏ', jp: '赤い口紅', price: 1800, req: 1, style: 3 },
    { id: 'phan-phu', counter: 'cosmetics', kind: 'fx', emoji: '🪞', name: 'Phấn phủ kiềm dầu', jp: 'フェイスパウダー', price: 2600, req: 1, style: 4 },
    { id: 'kem-nen', counter: 'cosmetics', kind: 'fx', emoji: '🧴', name: 'Kem nền hợp tông da', jp: 'ファンデーション', price: 3400, req: 2, style: 6 },
    // 🌸 NƯỚC HOA (kind fx — hiệu ứng: ✨ điểm phong cách)
    { id: 'nuoc-hoa-bien', counter: 'perfume', kind: 'fx', emoji: '🌊', name: 'Nước hoa hương biển', jp: '海の香水', price: 4800, req: 1, style: 4 },
    { id: 'nuoc-hoa-cam', counter: 'perfume', kind: 'fx', emoji: '🍊', name: 'Nước hoa hương cam chanh', jp: 'シトラスの香水', price: 5800, req: 2, style: 5 },
    { id: 'nuoc-hoa-sakura', counter: 'perfume', kind: 'fx', emoji: '🌸', name: 'Nước hoa hoa anh đào (bản giới hạn)', jp: '桜の香水', price: 8800, req: 3, style: 8 }
  ];
  var COUNTERS = {
    fashion: { emoji: '👕', name: 'Thời trang', jp: 'ファッション', greet: 'いらっしゃいませ！お洋服をお探しですか。試着もできますよ。', greetVi: '(Chào mừng quý khách! Quý khách tìm quần áo ạ? Có thể mặc thử đấy ạ.)' },
    jewelry: { emoji: '💍', name: 'Trang sức & phụ kiện', jp: 'アクセサリー', greet: 'いらっしゃいませ。アクセサリーはこちらでございます。', greetVi: '(Chào mừng quý khách. Phụ kiện ở khu này ạ.)' },
    cosmetics: { emoji: '💄', name: 'Mỹ phẩm', jp: 'コスメ', greet: 'いらっしゃいませ。コスメをお探しですか。テスターもございますよ。', greetVi: '(Chào mừng quý khách! Quý khách tìm mỹ phẩm ạ? Có cả đồ dùng thử đấy ạ.)' },
    perfume: { emoji: '🌸', name: 'Nước hoa', jp: '香水', greet: 'いらっしゃいませ。香水は香りを試すこともできます。', greetVi: '(Chào mừng quý khách. Nước hoa có thể thử mùi được ạ.)' }
  };
  var HAIR_STYLES = [
    { id: 'short', name: 'Ngắn' }, { id: 'long', name: 'Dài' }, { id: 'pony', name: 'Đuôi ngựa' },
    { id: 'bob', name: 'Bob ôm má' }, { id: 'bun', name: 'Búi cao' }, { id: 'twin', name: 'Hai chỏm' }
  ];
  var HAIR_COLORS = ['#26221f', '#3a2e28', '#5a3a26', '#8a5a2e', '#7a2e35', '#d9a441', '#22354f', '#d96a86'];
  var HAIR_NAMES = { '#26221f': 'Đen', '#3a2e28': 'Đen nâu', '#5a3a26': 'Nâu hạt dẻ', '#8a5a2e': 'Nâu sáng', '#7a2e35': 'Đỏ rượu', '#d9a441': 'Vàng', '#22354f': 'Xanh đen', '#d96a86': 'Hồng' };
  var SKINS = [{ c: '#f6cba6', name: 'Sáng' }, { c: '#f2c49b', name: 'Trung bình' }, { c: '#e0aa7d', name: 'Ngăm nắng' }];
  var SHIRT_COLORS = ['#3f6fb5', '#d96a86', '#39a05a', '#e9c44d', '#f4f1ea', '#7a4a63', '#33373c'];
  var PANTS_COLORS = ['#46536b', '#33507e', '#7a4a63', '#5da464', '#8a8574', '#c95d5d'];

  /* ================= TRẠNG THÁI ================= */
  function baseFor(gender) {
    return gender === 'F'
      ? { skin: '#f6cba6', hair: '#5a3a26', hairStyle: 'pony', shirt: '#d96a86', pants: '#7a4a63', skirt: true }
      : { skin: '#f2c49b', hair: '#3a2e28', hairStyle: 'short', shirt: '#3f6fb5', pants: '#46536b', skirt: false };
  }
  function newStyle(gender) {
    return { base: baseFor(gender), owned: [], top: null, bottom: null, accs: [], fxOn: [], greeted: [], instances: [], ledger: [] };
  }
  var uidSeq = 0;
  function genUid() { uidSeq++; return 'it-' + Date.now().toString(36) + '-' + uidSeq.toString(36) + Math.floor(Math.random() * 46656).toString(36); }
  var S = newStyle('M');
  var gender = 'M';
  var levelOverride = null;   // chỉ cho harness kiểm chứng (giống STORY.examAnswer)

  function byId(id) { for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i]; return null; }
  function owned(id) { return S.owned.indexOf(id) >= 0; }
  function equipped(it) {
    if (!it) return false;
    if (it.kind === 'top') return S.top === it.id;
    if (it.kind === 'bottom') return S.bottom === it.id;
    if (it.kind === 'acc') return S.accs.indexOf(it.id) >= 0;
    return S.fxOn.indexOf(it.id) >= 0;
  }
  function sellPrice(it) { return Math.floor(it.price / 2 / 100) * 100; }
  function yen(n) { return '¥' + n.toLocaleString('en-US'); }

  function level() {
    if (levelOverride) return levelOverride;
    var f = (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {};
    return 1 + (f.examPassed ? 1 : 0) + (f.exam2Passed ? 1 : 0);
  }
  var LEVEL_NAMES = { 1: 'Cấp 1 — mới sang, đang học N5', 2: 'Cấp 2 — đã đỗ mốc JLPT N5', 3: 'Cấp 3 — đã đỗ mốc JLPT N4' };
  function stylePoints() {
    var p = 0;
    S.fxOn.forEach(function (id) { var it = byId(id); if (it) p += it.style || 0; });
    return p;
  }

  /* ================= SPEC → SPRITE ================= */
  function spec() {
    var s = { skin: S.base.skin, hair: S.base.hair, hairStyle: S.base.hairStyle, shirt: S.base.shirt, pants: S.base.pants, skirt: !!S.base.skirt, acc: [] };
    var top = byId(S.top), bot = byId(S.bottom);
    if (top) { s.shirt = top.shirt; if (top.dress) { s.skirt = true; s.pants = top.skirtColor || top.shirt; } }
    if (bot) { s.pants = bot.color; s.skirt = !!bot.skirt; }
    S.accs.forEach(function (id) { var it = byId(id); if (it && it.acc) s.acc.push(it.acc); });
    return s;
  }
  function applyToPlayer() { if (window.__demo && window.__demo.setAppearance) window.__demo.setAppearance(spec()); }

  /* ================= LƯU / NẠP ================= */
  function serialize() {
    return { base: S.base, owned: S.owned.slice(), top: S.top, bottom: S.bottom, accs: S.accs.slice(), fxOn: S.fxOn.slice(), greeted: S.greeted.slice(),
             instances: S.instances.map(function (x) { return { uid: x.uid, itemId: x.itemId, tradeable: x.tradeable, via: x.via, at: x.at }; }),
             ledger: S.ledger.slice(-100) };
  }
  function persist() {
    if (window.FLOW && window.FLOW.setStyle) window.FLOW.setStyle(serialize());
    try { localStorage.setItem(LSKEY, JSON.stringify(serialize())); } catch (e) {}
  }
  function normalize(d, g) {
    var st = newStyle(g);
    if (!d || typeof d !== 'object') return st;
    if (d.base) ['skin', 'hair', 'hairStyle', 'shirt', 'pants'].forEach(function (k) { if (typeof d.base[k] === 'string') st.base[k] = d.base[k]; });
    if (typeof d.base.skirt === 'boolean') st.base.skirt = d.base.skirt;
    st.owned = (Array.isArray(d.owned) ? d.owned : []).filter(function (id) { return !!byId(id); });
    st.top = st.owned.indexOf(d.top) >= 0 ? d.top : null;
    st.bottom = st.owned.indexOf(d.bottom) >= 0 ? d.bottom : null;
    st.accs = (Array.isArray(d.accs) ? d.accs : []).filter(function (id) { return st.owned.indexOf(id) >= 0; });
    st.fxOn = (Array.isArray(d.fxOn) ? d.fxOn : []).filter(function (id) { return st.owned.indexOf(id) >= 0; });
    st.greeted = Array.isArray(d.greeted) ? d.greeted.slice() : [];
    // Instances: bản lưu mới có sẵn → giữ uid; bản lưu CŨ (chỉ có owned[]) → sinh instance bù,
    // uid mới nhưng itemId/tradeable giữ đúng (món mua ở mall = tradeable true).
    var seenInst = {};
    st.instances = (Array.isArray(d.instances) ? d.instances : []).filter(function (x) {
      return x && typeof x.uid === 'string' && st.owned.indexOf(x.itemId) >= 0 && !seenInst[x.itemId] && (seenInst[x.itemId] = true);
    }).map(function (x) { return { uid: x.uid, itemId: x.itemId, tradeable: x.tradeable !== false, via: x.via || 'mall', at: x.at || 0 }; });
    st.owned.forEach(function (id) {
      if (!seenInst[id]) { var it = byId(id); st.instances.push({ uid: genUid(), itemId: id, tradeable: true, via: it ? it.counter : 'mall', at: 0 }); }
    });
    st.ledger = Array.isArray(d.ledger) ? d.ledger.slice(-100) : [];
    return st;
  }
  function onGameStart(player) {
    gender = player && player.gender === 'F' ? 'F' : 'M';
    var d = null;
    if (window.FLOW && window.FLOW.getStyle) d = window.FLOW.getStyle();
    if (!d) { try { d = JSON.parse(localStorage.getItem(LSKEY)); } catch (e) {} }
    S = normalize(d, gender);
    applyToPlayer();
  }

  /* ================= MUA / BÁN / MẶC ================= */
  function moneyYen() { return Math.round((window.GAMEUI ? window.GAMEUI.stats().money : 0) * 10000); }
  // moneyTxn — CỬA DUY NHẤT cho mọi biến động Tiền của hệ ngoại hình/mall (lệnh bổ sung
  // 13:55 JST 31/10/2026): trừ/cộng tiền qua GAMEUI.apply + ghi 1 dòng SỔ GIAO DỊCH có
  // reason code 'mall.buy.<quầy>.<itemId>' / 'mall.sell.<quầy>.<itemId>' để máy chủ
  // (đợt kinh tế người chơi riêng) đối chiếu được. KHÔNG nơi nào khác trong file này
  // được tự gọi GAMEUI.apply({money}) nữa.
  function moneyTxn(yenDelta, reason, note) {
    if (!yenDelta) return;
    window.GAMEUI.apply({ money: yenDelta / 10000 }, note);
    S.ledger.push({ t: Date.now(), yen: yenDelta, reason: reason });
    if (S.ledger.length > 100) S.ledger = S.ledger.slice(-100);
  }
  function buy(id) {
    var it = byId(id);
    if (!it) return { ok: false, why: 'noitem' };
    if (owned(id)) return { ok: false, why: 'owned' };
    if (level() < it.req) { window.GAMEUI.toast('🔒 «' + it.name + '» cần Cấp ' + it.req + ' — đỗ mốc JLPT ' + (it.req === 2 ? 'N5' : 'N4') + ' đã nhé!'); return { ok: false, why: 'locked' }; }
    if (moneyYen() < it.price) { window.GAMEUI.toast('💴 Không đủ tiền: «' + it.name + '» giá ' + yen(it.price) + ', ví đang có ' + yen(moneyYen()) + '.'); return { ok: false, why: 'money' }; }
    moneyTxn(-it.price, 'mall.buy.' + it.counter + '.' + it.id, 'Mua ' + it.name + ' ở trung tâm thương mại — ' + yen(it.price));
    S.owned.push(id);
    var inst = { uid: genUid(), itemId: id, tradeable: true, via: it.counter, at: Date.now() };
    S.instances.push(inst);
    equip(id, true);
    persist(); applyToPlayer();
    return { ok: true, uid: inst.uid };
  }
  function sell(id) {
    var it = byId(id);
    if (!it || !owned(id)) return { ok: false, why: 'notowned' };
    if (equipped(it)) { window.GAMEUI.toast('👕 Món này đang dùng — bỏ mặc/ngừng dùng trước rồi mới bán được.'); return { ok: false, why: 'equipped' }; }
    var p = sellPrice(it);
    moneyTxn(p, 'mall.sell.' + it.counter + '.' + it.id, 'Bán lại ' + it.name + ' — +' + yen(p) + ' (50% giá mua)');
    S.owned = S.owned.filter(function (x) { return x !== id; });
    S.instances = S.instances.filter(function (x) { return x.itemId !== id; });
    persist();
    return { ok: true, price: p };
  }
  function equip(id, on) {
    var it = byId(id); if (!it || !owned(id)) return false;
    if (it.kind === 'top') S.top = on ? id : (S.top === id ? null : S.top);
    else if (it.kind === 'bottom') S.bottom = on ? id : (S.bottom === id ? null : S.bottom);
    else if (it.kind === 'acc') { if (on && S.accs.indexOf(id) < 0) S.accs.push(id); if (!on) S.accs = S.accs.filter(function (x) { return x !== id; }); }
    else { if (on && S.fxOn.indexOf(id) < 0) S.fxOn.push(id); if (!on) S.fxOn = S.fxOn.filter(function (x) { return x !== id; }); }
    persist(); applyToPlayer();
    return true;
  }

  /* ================= GIAO DIỆN DÙNG CHUNG ================= */
  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function chip(label, on, fn, color) {
    var b = h('button', 'style-chip' + (on ? ' on' : ''), label);
    b.type = 'button';
    if (color) { b.style.background = color; b.style.color = '#fff'; b.style.textShadow = '0 1px 2px rgba(0,0,0,.45)'; }
    b.addEventListener('click', fn);
    return b;
  }
  function section(card, title) { var s = h('div', 'style-sec'); s.appendChild(h('div', 'style-sec-t', title)); card.appendChild(s); return s; }

  /* ================= MÀN HÌNH NGOẠI HÌNH + TỦ ĐỒ ================= */
  var curCounter = null;
  function renderStyle() {
    var card = $('style-card'); if (!card) return;
    card.innerHTML = '';
    card.appendChild(h('h3', null, '👗 Ngoại hình & tủ đồ'));
    var sub = h('div', 'sub');
    sub.innerHTML = 'Chỉnh tóc / da / đồ cơ bản là <b>miễn phí</b>. Đồ mua ở trung tâm thương mại nằm trong tủ đồ phía dưới. Tuyến truyện giữ nguyên theo lựa chọn đầu game (' + (gender === 'F' ? '👧 tuyến nữ' : '👦 tuyến nam') + ') — trang phục ở đây tự do chọn kiểu <b>quần hoặc váy</b> cho cả hai tuyến.<br>⭐ ' + LEVEL_NAMES[level()] + ' · 💴 Ví: ' + yen(moneyYen()) + ' · ✨ Điểm phong cách (mỹ phẩm + nước hoa đang dùng): <b>' + stylePoints() + ' điểm</b>';
    card.appendChild(sub);

    var prevWrap = h('div', 'style-preview');
    var cv = document.createElement('canvas');
    if (window.SPRITES && window.SPRITES.make) {
      var set = window.SPRITES.make(spec());
      cv.width = 96; cv.height = 144;
      cv.getContext('2d').drawImage(set.frames.down[0], 0, 0);
    }
    prevWrap.appendChild(cv);
    prevWrap.appendChild(h('div', 'style-prev-note', 'Xem trước — nhân vật trên bản đồ đổi ngay khi chỉnh'));
    card.appendChild(prevWrap);

    var sec = section(card, '💇 Kiểu tóc');
    var row = h('div', 'style-row'); sec.appendChild(row);
    HAIR_STYLES.forEach(function (hs) {
      row.appendChild(chip(hs.name, S.base.hairStyle === hs.id, function () { S.base.hairStyle = hs.id; persist(); applyToPlayer(); renderStyle(); }));
    });
    sec = section(card, '🎨 Màu tóc');
    row = h('div', 'style-row'); sec.appendChild(row);
    HAIR_COLORS.forEach(function (c) {
      row.appendChild(chip(HAIR_NAMES[c], S.base.hair === c, function () { S.base.hair = c; persist(); applyToPlayer(); renderStyle(); }, c));
    });
    sec = section(card, '🧑 Màu da');
    row = h('div', 'style-row'); sec.appendChild(row);
    SKINS.forEach(function (sk) {
      row.appendChild(chip(sk.name, S.base.skin === sk.c, function () { S.base.skin = sk.c; persist(); applyToPlayer(); renderStyle(); }, sk.c));
    });
    sec = section(card, '👕 Áo cơ bản (miễn phí)');
    row = h('div', 'style-row'); sec.appendChild(row);
    SHIRT_COLORS.forEach(function (c, i) {
      row.appendChild(chip('Áo ' + (i + 1), S.base.shirt === c && !S.top, function () { S.base.shirt = c; persist(); applyToPlayer(); renderStyle(); }, c));
    });
    if (S.top) sec.appendChild(h('div', 'style-note', 'Đang mặc áo từ tủ đồ — màu áo cơ bản sẽ áp dụng khi bỏ mặc món đó.'));
    sec = section(card, '👖 Dưới cơ bản — quần / váy (miễn phí)');
    row = h('div', 'style-row'); sec.appendChild(row);
    row.appendChild(chip('👖 Quần', !S.base.skirt, function () { S.base.skirt = false; persist(); applyToPlayer(); renderStyle(); }));
    row.appendChild(chip('👗 Váy', S.base.skirt, function () { S.base.skirt = true; persist(); applyToPlayer(); renderStyle(); }));
    row = h('div', 'style-row'); sec.appendChild(row);
    PANTS_COLORS.forEach(function (c, i) {
      row.appendChild(chip('Màu ' + (i + 1), S.base.pants === c && !S.bottom, function () { S.base.pants = c; persist(); applyToPlayer(); renderStyle(); }, c));
    });

    sec = section(card, '🗄️ Tủ đồ — đồ đã mua ở trung tâm thương mại');
    if (!S.owned.length) {
      sec.appendChild(h('div', 'style-note', 'Tủ đang trống. Vào 銀座モール ở phố mua sắm (cổng nam, biển 銀座モール) để sắm đồ nhé — hàng xịn mở theo cấp.'));
    }
    ['top', 'bottom', 'acc', 'fx'].forEach(function (kind) {
      var items = S.owned.map(byId).filter(function (it) { return it && it.kind === kind; });
      if (!items.length) return;
      var lbl = { top: 'Áo / đầm đã mua:', bottom: 'Quần / váy đã mua:', acc: 'Phụ kiện đã mua (đeo được nhiều món cùng lúc):', fx: 'Mỹ phẩm & nước hoa đã mua (bật = đang dùng, cộng ✨ điểm phong cách):' }[kind];
      sec.appendChild(h('div', 'style-note', lbl));
      var r = h('div', 'style-row'); sec.appendChild(r);
      items.forEach(function (it) {
        var on = equipped(it);
        r.appendChild(chip(it.emoji + ' ' + it.name + (on ? ' ✓' : ''), on, function () { equip(it.id, !equipped(it)); renderStyle(); }));
      });
    });

    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn primary', 'Xong');
    done.type = 'button';
    done.addEventListener('click', function () { $('modal-style').classList.remove('show'); });
    btnrow.appendChild(done);
    card.appendChild(btnrow);
  }
  function open() { renderStyle(); var m = $('modal-style'); if (m) m.classList.add('show'); }

  /* ================= QUẦY MUA SẮM TRONG MALL ================= */
  function renderShop() {
    var card = $('shop-card'); if (!card || !curCounter) return;
    var C = COUNTERS[curCounter];
    card.innerHTML = '';
    card.appendChild(h('h3', null, C.emoji + ' Quầy ' + C.name + ' — ' + C.jp));
    var sub = h('div', 'sub');
    sub.innerHTML = '<b>Nhân viên:</b> ' + C.greet + '<br>' + C.greetVi + '<br>⭐ ' + LEVEL_NAMES[level()] + ' · 💴 Ví: ' + yen(moneyYen()) + ' · Bán lại được 50% giá mua (món đang dùng thì phải bỏ ra trước).';
    card.appendChild(sub);
    CATALOG.filter(function (it) { return it.counter === curCounter; }).forEach(function (it) {
      var rowEl = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', it.emoji + ' ' + it.name));
      info.appendChild(h('div', 'shop-jp', it.jp + (it.kind === 'fx' ? ' · ✨ +' + it.style + ' điểm phong cách khi dùng' : '') + ' · ↔ chuyển nhượng được')); // mọi món bán ở mall đều tradeable (instance có uid riêng)
      var price = h('div', 'shop-price', yen(it.price));
      if (level() < it.req) price.appendChild(h('span', 'shop-lock', ' 🔒 Cần Cấp ' + it.req));
      info.appendChild(price);
      rowEl.appendChild(info);
      var acts = h('div', 'shop-acts');
      if (!owned(it.id)) {
        var b = h('button', 'btn ' + (level() < it.req ? 'ghost' : 'primary'), level() < it.req ? '🔒 Cấp ' + it.req : 'Mua');
        b.type = 'button';
        b.addEventListener('click', function () { buy(it.id); renderShop(); });
        acts.appendChild(b);
      } else {
        var on = equipped(it);
        var t = h('button', 'btn ' + (on ? 'ghost' : 'primary'), it.kind === 'fx' ? (on ? 'Đang dùng ✓' : 'Dùng') : (on ? 'Đang mặc ✓' : 'Mặc'));
        t.type = 'button';
        t.addEventListener('click', function () { equip(it.id, !equipped(it)); renderShop(); });
        acts.appendChild(t);
        var s = h('button', 'btn ghost', 'Bán ' + yen(sellPrice(it)));
        s.type = 'button';
        s.addEventListener('click', function () { sell(it.id); renderShop(); });
        acts.appendChild(s);
      }
      rowEl.appendChild(acts);
      card.appendChild(rowEl);
    });
    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn primary', 'Rời quầy ▶');
    done.type = 'button';
    done.addEventListener('click', function () { $('modal-shop').classList.remove('show'); curCounter = null; });
    btnrow.appendChild(done);
    card.appendChild(btnrow);
  }
  function openShop(counter) { curCounter = counter; renderShop(); var m = $('modal-shop'); if (m) m.classList.add('show'); }

  /* ================= API ================= */
  window.STYLE = {
    open: open, openShop: openShop,
    onGameStart: onGameStart,
    greeted: function (c) { return S.greeted.indexOf(c) >= 0; },
    markGreeted: function (c) { if (S.greeted.indexOf(c) < 0) { S.greeted.push(c); persist(); } },
    level: level, stylePoints: stylePoints, spec: spec,
    ledger: function () { return JSON.parse(JSON.stringify(S.ledger)); },          // sổ giao dịch tiền (reason code) — nền cho đợt máy chủ
    instances: function () { return JSON.parse(JSON.stringify(S.instances)); },    // instance theo uid + cờ tradeable từng món sở hữu
    state: function () { return JSON.parse(JSON.stringify(serialize())); },
    catalog: function () { return JSON.parse(JSON.stringify(CATALOG)); },
    buy: buy, sell: sell, equip: equip,
    setLevelOverride: function (n) { levelOverride = n ? (n | 0) : null; }   // phục vụ harness kiểm chứng khóa cấp
  };
  document.addEventListener('DOMContentLoaded', function () {
    var b = $('set-style');
    if (b) b.addEventListener('click', function () {
      var s = $('modal-settings'); if (s) s.classList.remove('show');
      open();
    });
  });
})();
