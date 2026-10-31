// market.js — HỆ MUA SẮM SIÊU THỊ THẬT (giai đoạn 3, lệnh chủ trang 14:00 JST 31/10/2026).
// Bám hai cảnh sẵn có: 'super-checkout' (kaiwa tính tiền giỏ CỐ ĐỊNH — giữ nguyên làm cảnh
// truyện riêng) và 'super-shelf' (săn đồ giảm giá — giữ nguyên). Hệ mới: mua TỰ DO theo kệ →
// GIỎ HÀNG → ra quầy thu ngân (NPC super-cashier, cảnh ảo 'super-pay') mới tính tiền được,
// đúng luồng siêu thị Nhật; thoại tính tiền NGẮN đọc đúng TỔNG GIỎ THẬT + túi nilon 3 yên;
// giỏ có BIA → bước xác nhận tuổi 20歳以上確認 như máy tự tính tiền thật (học đời sống).
// Đồ mua vào KHO ĐỒ TIÊU DÙNG (pantry) — tab riêng cạnh tủ đồ quần áo trong màn hình ngoại
// hình; về phòng bấm TỦ LẠNH/BẾP (vật 'room-fridge') để ĂN/UỐNG; ngủ ở futon ('room-sleep')
// = qua ngày mới → hết say, đếm bia trong ngày reset.
// TIỀN: mọi biến động đi qua moneyTxn() của CHÍNH file này, ghi sổ ledger kèm reason code
// 'super.buy.<món>' / 'super.checkout' — cùng khuôn sổ giao dịch của style.js (đợt máy chủ
// đối chiếu được). Item ID ổn định 'sm-*'; đồ ăn cộng dồn số lượng trong pantry (qty),
// mỗi lần mua vẫn ghi 1 instance {uid, itemId, qty, tradeable:false} để đối chiếu sổ.
// HIỆU ỨNG ĂN UỐNG (ghi ở KHUNG-GAME §4.8): bữa chính (bento/cơm/cá) hp+6~7 · ăn nhẹ hp+1~3 ·
// nước/trà hp+1 · BIA: lon đầu love+2 hp+1 (vui vẻ xã giao), từ lon thứ 3 trong NGÀY:
// say — hp−4, love+1, trạng thái SAY tới khi ngủ qua ngày; thoại hài nhẹ, không cổ vũ nhậu.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var LSKEY = 'tuoitre2d_pantry_v1';
  var SHELVES = {
    fresh:  { emoji: '🥬', name: 'Rau củ & thực phẩm tươi', jp: '青果・鮮魚' },
    bento:  { emoji: '🍱', name: 'Đồ ăn sẵn & bento', jp: 'お惣菜・弁当' },
    drinks: { emoji: '🥤', name: 'Đồ uống', jp: '飲料' },
    dry:    { emoji: '🍜', name: 'Đồ khô & mì', jp: '麺・乾物' },
    frozen: { emoji: '🧊', name: 'Đồ đông lạnh', jp: '冷凍食品' },
    daily:  { emoji: '🧺', name: 'Đồ dùng hằng ngày', jp: '日用品' }
  };
  // fx: meal/snack/drink/beer/daily — hp/love áp khi ĂN/UỐNG (daily = không ăn được)
  var ITEMS = [
    // 🥬 Tươi (giá bám cảnh sẵn có: cá hồi 398, rau 198, sữa 178, bánh mì 128, trứng 248)
    { id: 'sm-ca-hoi', shelf: 'fresh', emoji: '🐟', jp: 'サーモン', read: 'saamon', name: 'Cá hồi tươi', price: 398, fx: 'meal', hp: 6 },
    { id: 'sm-rau-xanh', shelf: 'fresh', emoji: '🥬', jp: '野菜セット', read: 'やさいセット', name: 'Set rau xanh', price: 198, fx: 'meal', hp: 4 },
    { id: 'sm-trung', shelf: 'fresh', emoji: '🥚', jp: '卵 10個', read: 'たまご じゅっこ', name: 'Trứng gà 10 quả', price: 248, fx: 'meal', hp: 3 },
    { id: 'sm-thit-ga', shelf: 'fresh', emoji: '🍗', jp: '鶏肉', read: 'とりにく', name: 'Thịt gà', price: 298, fx: 'meal', hp: 5 },
    { id: 'sm-chuoi', shelf: 'fresh', emoji: '🍌', jp: 'バナナ', read: 'banana', name: 'Chuối (nải)', price: 128, fx: 'snack', hp: 2 },
    { id: 'sm-tao', shelf: 'fresh', emoji: '🍎', jp: 'りんご', read: 'ringo', name: 'Táo', price: 158, fx: 'snack', hp: 2 },
    // 🍱 Ăn sẵn & bento
    { id: 'sm-bento', shelf: 'bento', emoji: '🍱', jp: '幕の内弁当', read: 'まくのうちべんとう', name: 'Bento makunouchi', price: 498, fx: 'meal', hp: 7 },
    { id: 'sm-onigiri', shelf: 'bento', emoji: '🍙', jp: 'おにぎり', read: 'onigiri', name: 'Cơm nắm onigiri', price: 120, fx: 'snack', hp: 3 },
    { id: 'sm-banh-mi', shelf: 'bento', emoji: '🍞', jp: '食パン', read: 'しょくパン', name: 'Bánh mì lát', price: 128, fx: 'snack', hp: 3 },
    { id: 'sm-salad', shelf: 'bento', emoji: '🥗', jp: 'サラダ', read: 'sarada', name: 'Salad trộn', price: 198, fx: 'snack', hp: 2 },
    { id: 'sm-banh-ngot', shelf: 'bento', emoji: '🍰', jp: 'ショートケーキ', read: 'shooto keeki', name: 'Bánh kem dâu', price: 320, fx: 'snack', hp: 1, love: 1 },
    // 🥤 Đồ uống
    { id: 'sm-sua', shelf: 'drinks', emoji: '🥛', jp: '牛乳', read: 'ぎゅうにゅう', name: 'Sữa tươi 1L', price: 178, fx: 'drink', hp: 2 },
    { id: 'sm-tra', shelf: 'drinks', emoji: '🍵', jp: 'お茶 2L', read: 'おちゃ', name: 'Trà đóng chai 2L', price: 128, fx: 'drink', hp: 1 },
    { id: 'sm-nuoc', shelf: 'drinks', emoji: '💧', jp: '水 2L', read: 'みず', name: 'Nước lọc 2L', price: 98, fx: 'drink', hp: 1 },
    { id: 'sm-ca-phe', shelf: 'drinks', emoji: '☕', jp: '缶コーヒー', read: 'かんコーヒー', name: 'Cà phê lon', price: 130, fx: 'drink', hp: 1 },
    { id: 'sm-nuoc-cam', shelf: 'drinks', emoji: '🧃', jp: 'オレンジジュース', read: 'orenji juusu', name: 'Nước cam', price: 168, fx: 'drink', hp: 2 },
    { id: 'sm-bia', shelf: 'drinks', emoji: '🍺', jp: 'ビール 350ml', read: 'biiru', name: 'Bia lon 350ml (20+)', price: 280, fx: 'beer', hp: 1, love: 2 },
    // 🍜 Đồ khô & mì
    { id: 'sm-mi-ly', shelf: 'dry', emoji: '🍜', jp: 'カップ麺', read: 'kappu men', name: 'Mì ly', price: 180, fx: 'meal', hp: 4 },
    { id: 'sm-gao', shelf: 'dry', emoji: '🍚', jp: '米 2kg', read: 'こめ', name: 'Gạo 2kg', price: 980, fx: 'meal', hp: 5 },
    { id: 'sm-mi-spaghetti', shelf: 'dry', emoji: '🍝', jp: 'スパゲッティ', read: 'supagetti', name: 'Mì spaghetti', price: 198, fx: 'meal', hp: 4 },
    { id: 'sm-banh-quy', shelf: 'dry', emoji: '🍪', jp: 'クッキー', read: 'kukkii', name: 'Bánh quy', price: 158, fx: 'snack', hp: 1, love: 1 },
    // 🧊 Đông lạnh
    { id: 'sm-gyoza', shelf: 'frozen', emoji: '🥟', jp: '冷凍餃子', read: 'れいとうぎょうざ', name: 'Há cảo đông lạnh', price: 298, fx: 'meal', hp: 5 },
    { id: 'sm-kem', shelf: 'frozen', emoji: '🍦', jp: 'アイスクリーム', read: 'aisukuriimu', name: 'Kem', price: 168, fx: 'snack', hp: 1, love: 1 },
    { id: 'sm-com-dong-lanh', shelf: 'frozen', emoji: '🍚', jp: '冷凍チャーハン', read: 'れいとうチャーハン', name: 'Cơm rang đông lạnh', price: 348, fx: 'meal', hp: 5 },
    // 🧺 Đồ dùng ngày (không ăn — chỉ cất kho)
    { id: 'sm-giay-ve-sinh', shelf: 'daily', emoji: '🧻', jp: 'ティッシュ', read: 'tisshu', name: 'Khăn giấy (hộp)', price: 198, fx: 'daily' },
    { id: 'sm-kem-danh-rang', shelf: 'daily', emoji: '🪥', jp: '歯磨き粉', read: 'はみがきこ', name: 'Kem đánh răng', price: 248, fx: 'daily' },
    { id: 'sm-nuoc-giat', shelf: 'daily', emoji: '🧴', jp: '洗濯洗剤', read: 'せんたくせんざい', name: 'Nước giặt', price: 398, fx: 'daily' }
  ];
  function byId(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; }
  function yen(n) { return '¥' + n.toLocaleString('en-US'); }

  var P = { cart: {}, stock: {}, beersToday: 0, drunk: false, instances: [], ledger: [] };
  var uidSeq = 0;
  function genUid() { uidSeq++; return 'sm-' + Date.now().toString(36) + '-' + uidSeq.toString(36) + Math.floor(Math.random() * 46656).toString(36); }
  function serialize() { return { cart: P.cart, stock: P.stock, beersToday: P.beersToday, drunk: P.drunk, instances: P.instances, ledger: P.ledger.slice(-100) }; }
  function persist() {
    if (window.FLOW && window.FLOW.setPantry) window.FLOW.setPantry(serialize());
    try { localStorage.setItem(LSKEY, JSON.stringify(serialize())); } catch (e) {}
  }
  function normalize(d) {
    var p = { cart: {}, stock: {}, beersToday: 0, drunk: false, instances: [], ledger: [] };
    if (!d || typeof d !== 'object') return p;
    ['cart', 'stock'].forEach(function (k) { if (d[k]) Object.keys(d[k]).forEach(function (id) { if (byId(id) && d[k][id] > 0) p[k][id] = d[k][id] | 0; }); });
    p.beersToday = d.beersToday | 0; p.drunk = !!d.drunk;
    p.instances = Array.isArray(d.instances) ? d.instances : [];
    p.ledger = Array.isArray(d.ledger) ? d.ledger.slice(-100) : [];
    return p;
  }
  function onGameStart() {
    var d = null;
    if (window.FLOW && window.FLOW.getPantry) d = window.FLOW.getPantry();
    if (!d) { try { d = JSON.parse(localStorage.getItem(LSKEY)); } catch (e) {} }
    P = normalize(d);
  }
  function moneyYen() { return Math.round((window.GAMEUI ? window.GAMEUI.stats().money : 0) * 10000); }
  function moneyTxn(yenDelta, reason, note) {   // CỬA DUY NHẤT đổi tiền của hệ siêu thị — cùng khuôn sổ với style.js
    if (!yenDelta) return;
    window.GAMEUI.apply({ money: yenDelta / 10000 }, note);
    P.ledger.push({ t: Date.now(), yen: yenDelta, reason: reason });
    if (P.ledger.length > 100) P.ledger = P.ledger.slice(-100);
  }
  function cartTotal() { var t = 0; Object.keys(P.cart).forEach(function (id) { t += byId(id).price * P.cart[id]; }); return t; }
  function cartCount() { var n = 0; Object.keys(P.cart).forEach(function (id) { n += P.cart[id]; }); return n; }
  function cartHasBeer() { return (P.cart['sm-bia'] | 0) > 0; }
  // Ví của game tính theo MAN với hạt 0,01 man = 100 yên (như mọi cảnh khác: combini −0,08 man) —
  // tổng giỏ yên thật được LÀM TRÒN TỚI TRĂM YÊN khi trừ ví; hoá đơn vẫn ghi đúng tổng yên.
  function chargedYen(total) { return Math.round(total / 100) * 100; }

  /* ================= GIAO DIỆN ================= */
  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  var curShelf = null, payStep = null;
  function cartLine() { return '🧺 Giỏ: ' + cartCount() + ' món · Tổng: ' + yen(cartTotal()) + ' · 💴 Ví: ' + yen(moneyYen()); }

  function renderShelf() {
    var card = $('market-card'); if (!card || !curShelf) return;
    var S2 = SHELVES[curShelf];
    card.innerHTML = '';
    card.appendChild(h('h3', null, '🛒 Siêu thị 中野 — kệ ' + S2.name));
    card.appendChild(h('div', 'sub', S2.jp + ' — chọn số lượng cho vào giỏ, ra QUẦY THU NGÂN (nhân viên ở làn レジ 1番) mới tính tiền được nhé. ' + cartLine()));
    ITEMS.filter(function (it) { return it.shelf === curShelf; }).forEach(function (it) {
      var row = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', it.emoji + ' ' + it.name + (P.cart[it.id] ? ' · trong giỏ ×' + P.cart[it.id] : '')));
      info.appendChild(h('div', 'shop-jp', it.jp + '（' + it.read + '）'));
      info.appendChild(h('div', 'shop-price', yen(it.price)));
      row.appendChild(info);
      var acts = h('div', 'shop-acts');
      var minus = h('button', 'btn ghost', '−'); minus.type = 'button';
      minus.addEventListener('click', function () { if (P.cart[it.id]) { P.cart[it.id]--; if (!P.cart[it.id]) delete P.cart[it.id]; persist(); renderShelf(); } });
      var plus = h('button', 'btn primary', '＋ Cho vào giỏ'); plus.type = 'button';
      plus.addEventListener('click', function () { P.cart[it.id] = (P.cart[it.id] || 0) + 1; persist(); renderShelf(); });
      acts.appendChild(minus); acts.appendChild(plus);
      row.appendChild(acts);
      card.appendChild(row);
    });
    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn primary', 'Xong kệ này ▶'); done.type = 'button';
    done.addEventListener('click', function () { $('modal-market').classList.remove('show'); curShelf = null; });
    btnrow.appendChild(done); card.appendChild(btnrow);
  }
  function openShelf(shelf) { curShelf = shelf; renderShelf(); $('modal-market').classList.add('show'); }

  /* ---- Thanh toán ở quầy: thoại ngắn theo GIỎ THẬT + túi 3 yên + xác nhận tuổi khi có bia ---- */
  function renderPay(step) {
    payStep = step;
    var card = $('market-card'); if (!card) return;
    card.innerHTML = '';
    card.appendChild(h('h3', null, '🧾 Quầy tính tiền — レジ'));
    var lines = h('div', 'sub');
    if (!cartCount()) {
      lines.innerHTML = '<b>Thu ngân:</b> いらっしゃいませ。かごは空ですね。お買い物はこれからですか。<br>(Chào quý khách. Giỏ đang trống ạ — quý khách chưa chọn món nào.)<br>Hãy tới các kệ hàng trong siêu thị, bấm ＋ cho món vào giỏ rồi quay lại đây nhé.';
      card.appendChild(lines);
    } else if (step === 'age' && cartHasBeer()) {
      lines.innerHTML = '<b>Thu ngân:</b> お酒が含まれていますので、年齢確認をさせてください。<br>(Trong giỏ có đồ uống có cồn nên xin phép xác nhận tuổi ạ.)<br>🪪 <b>20歳以上確認</b> — Ở Nhật, người dưới 20 tuổi không được mua/uống rượu bia; máy tự tính tiền cũng hiện màn hình xác nhận tuổi như thế này.';
      card.appendChild(lines);
      var btnrowA = h('div', 'btnrow');
      var ok = h('button', 'btn primary', '✅ Tôi đã đủ 20 tuổi — 20歳以上です'); ok.type = 'button';
      ok.addEventListener('click', function () { renderPay('bag'); });
      btnrowA.appendChild(ok); card.appendChild(btnrowA);
      return;
    } else {
      var itemsTxt = Object.keys(P.cart).map(function (id) { var it = byId(id); return it.emoji + ' ' + it.jp + ' ×' + P.cart[id] + ' = ' + yen(it.price * P.cart[id]); }).join('<br>');
      lines.innerHTML = '<b>Thu ngân:</b> ありがとうございます。お会計いたします。<br>' + itemsTxt + '<br><b>Tổng hàng: ' + yen(cartTotal()) + '</b> · ' + cartLine();
      card.appendChild(lines);
      var bagRow = h('div', 'btnrow');
      var b1 = h('button', 'btn ' + (step === 'bag3' ? 'primary' : 'ghost'), '🛍️ Lấy túi nilon (+¥3)'); b1.type = 'button';
      b1.addEventListener('click', function () { renderPay('bag3'); });
      var b2 = h('button', 'btn ' + (step !== 'bag3' ? 'primary' : 'ghost'), '🎒 Không cần túi (có túi riêng)'); b2.type = 'button';
      b2.addEventListener('click', function () { renderPay('nobag'); });
      bagRow.appendChild(b1); bagRow.appendChild(b2); card.appendChild(bagRow);
      var total = cartTotal() + (step === 'bag3' ? 3 : 0);
      var charged = chargedYen(total);
      card.appendChild(h('div', 'sub', (step === 'bag3' ? 'レジ袋 1枚 3円 — ' : '') + 'Tổng giỏ: ' + yen(total) + ' · Ví tính theo man (hạt 100 yên như mọi cảnh trong game) nên số trừ là ' + yen(charged) + ' (' + (charged / 10000).toFixed(2) + ' man).'));
      var payBtn = h('button', 'btn primary', '💴 Thanh toán ' + yen(charged)); payBtn.type = 'button';
      payBtn.addEventListener('click', function () { checkout(step === 'bag3'); });
      var btnrow = h('div', 'btnrow'); btnrow.appendChild(payBtn); card.appendChild(btnrow);
      if (moneyYen() < charged) card.appendChild(h('div', 'sub', '⚠️ Không đủ tiền (thiếu ' + yen(charged - moneyYen()) + ') — bỏ bớt món trong giỏ ở nút dưới rồi tính lại nhé.'));
      Object.keys(P.cart).forEach(function (id) {
        var it = byId(id);
        var row = h('div', 'shop-item');
        row.appendChild(h('div', 'shop-info', it.emoji + ' ' + it.name + ' ×' + P.cart[id] + ' — ' + yen(it.price * P.cart[id])));
        var rm = h('button', 'btn ghost', '✕ Bỏ 1'); rm.type = 'button';
        rm.addEventListener('click', function () { P.cart[id]--; if (!P.cart[id]) delete P.cart[id]; persist(); renderPay(cartHasBeer() && payStep === 'age' ? 'age' : 'bag'); });
        row.appendChild(rm); card.appendChild(row);
      });
    }
    var btnrow2 = h('div', 'btnrow');
    var done = h('button', 'btn ghost', 'Để sau'); done.type = 'button';
    done.addEventListener('click', function () { $('modal-market').classList.remove('show'); payStep = null; });
    btnrow2.appendChild(done); card.appendChild(btnrow2);
  }
  function openPay() { renderPay(cartHasBeer() ? 'age' : 'bag'); $('modal-market').classList.add('show'); }
  function checkout(withBag) {
    var total = cartTotal() + (withBag ? 3 : 0);
    var charged = chargedYen(total);
    if (!cartCount()) return { ok: false, why: 'empty' };
    if (moneyYen() < charged) { window.GAMEUI.toast('💴 Không đủ tiền — bỏ bớt món trong giỏ rồi tính lại nhé.'); return { ok: false, why: 'money' }; }
    var ids = Object.keys(P.cart);
    moneyTxn(-charged, 'super.checkout', 'Siêu thị 中野 — ' + ids.map(function (id) { return byId(id).name + ' ×' + P.cart[id]; }).join(', ') + (withBag ? ' + túi nilon ¥3' : '') + ' — tổng giỏ ' + yen(total) + ', trừ theo man làm tròn trăm yên ' + yen(charged));
    ids.forEach(function (id) {
      P.stock[id] = (P.stock[id] || 0) + P.cart[id];
      P.instances.push({ uid: genUid(), itemId: id, qty: P.cart[id], tradeable: false, via: 'supermarket', at: Date.now() });
    });
    P.cart = {};
    persist();
    window.GAMEUI.toast('🛒 Đã tính tiền — tổng giỏ ' + yen(total) + ', trừ ví ' + yen(charged) + ' (theo man). Đồ đã về kho, mở tủ lạnh ở phòng để ăn uống. ありがとうございました！');
    $('modal-market').classList.remove('show'); payStep = null;
    return { ok: true, total: total, charged: charged };
  }

  /* ---- Kho đồ tiêu dùng + ăn uống (tab cạnh tủ đồ quần áo, mở từ tủ lạnh/phòng) ---- */
  function renderPantry() {
    var card = $('market-card'); if (!card) return;
    card.innerHTML = '';
    card.appendChild(h('h3', null, '🧊 Tủ lạnh & kho đồ — đồ mua ở siêu thị'));
    card.appendChild(h('div', 'sub', 'Bấm Ăn/Uống để dùng ngay. Bữa chính +Sức khỏe nhiều · đồ uống +nhỏ · bia: vui vẻ xã giao nhưng uống nhiều trong ngày sẽ SAY (Sức khỏe −) tới khi ngủ qua ngày.' + (P.drunk ? '<br>🥴 <b>Đang SAY</b> — mặt đỏ, chân hơi loạng choạng… về futon ngủ một giấc tới sáng là hết.' : '')));
    var ids = Object.keys(P.stock).filter(function (id) { return P.stock[id] > 0; });
    if (!ids.length) card.appendChild(h('div', 'style-note', 'Kho đang trống. Ra siêu thị 中野 ở phố mua sắm 浅草 chọn đồ theo kệ, ra quầy tính tiền rồi mang về nhé.'));
    ids.forEach(function (id) {
      var it = byId(id);
      var row = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', it.emoji + ' ' + it.name + ' ×' + P.stock[id]));
      info.appendChild(h('div', 'shop-jp', it.jp + '（' + it.read + '）' + (it.fx === 'daily' ? ' · đồ dùng — không ăn được' : it.fx === 'beer' ? ' · bia (20+) — hôm nay đã uống ' + P.beersToday + ' lon' : ' · ăn vào: ❤️ +' + (it.hp || 0) + (it.love ? ' 💗 +' + it.love : ''))));
      row.appendChild(info);
      if (it.fx !== 'daily') {
        var b = h('button', 'btn primary', it.fx === 'drink' || it.fx === 'beer' ? 'Uống' : 'Ăn'); b.type = 'button';
        b.addEventListener('click', function () { consume(id); renderPantry(); });
        row.appendChild(b);
      }
      card.appendChild(row);
    });
    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn primary', 'Xong'); done.type = 'button';
    done.addEventListener('click', function () { $('modal-market').classList.remove('show'); });
    btnrow.appendChild(done); card.appendChild(btnrow);
  }
  function openPantry() { renderPantry(); $('modal-market').classList.add('show'); }
  function consume(id) {
    var it = byId(id); if (!it || !P.stock[id]) return { ok: false };
    P.stock[id]--; if (!P.stock[id]) delete P.stock[id];
    if (it.fx === 'beer') {
      P.beersToday++;
      if (P.beersToday >= 3) {
        P.drunk = true;
        window.GAMEUI.apply({ hp: -4, love: 1 }, 'Lon bia thứ ' + P.beersToday + ' hôm nay — SAY rồi: đầu quay quay, nói nhiều hơn hẳn… 🥴 Về futon ngủ tới sáng thôi.');
      } else {
        window.GAMEUI.apply({ hp: it.hp || 0, love: it.love || 0 }, 'Nhấp một lon bia lạnh sau giờ làm — xả hơi một chút thôi, chừng mực là được 🍺');
      }
    } else if (it.fx === 'meal') {
      window.GAMEUI.apply({ hp: it.hp || 0 }, 'Ăn ' + it.name + ' đàng hoàng — người có sức hẳn lên 🍱');
    } else if (it.fx === 'drink') {
      window.GAMEUI.apply({ hp: it.hp || 0 }, 'Uống ' + it.name + ' — khát đâu còn nữa 💧');
    } else {
      window.GAMEUI.apply({ hp: it.hp || 0, love: it.love || 0 }, 'Ăn ' + it.name + ' — ngon miệng, vui miệng 😋');
    }
    persist();
    return { ok: true };
  }
  function newDay() {   // ngủ ở futon = qua ngày mới: hết say + reset đếm bia trong ngày
    var was = P.drunk; P.drunk = false; P.beersToday = 0; persist();
    window.GAMEUI.toast(was ? '🌅 Ngủ một giấc tới sáng — tỉnh táo hẳn, cơn say bay sạch. Uống chừng mực thôi nhé!' : '🌅 Ngủ một giấc tới sáng — ngày mới, người khoẻ re.');
    return { ok: true };
  }

  window.MARKET = {
    onGameStart: onGameStart, openShelf: openShelf, openPay: openPay, openPantry: openPantry,
    checkout: checkout, consume: consume, newDay: newDay,
    cartTotal: cartTotal, cartCount: cartCount, cartHasBeer: cartHasBeer,
    addToCart: function (id, n) { if (byId(id)) { P.cart[id] = (P.cart[id] || 0) + (n || 1); persist(); } },
    removeFromCart: function (id) { if (P.cart[id]) { P.cart[id]--; if (!P.cart[id]) delete P.cart[id]; persist(); } },
    clearCart: function () { P.cart = {}; persist(); },
    stock: function () { return JSON.parse(JSON.stringify(P.stock)); },
    state: function () { return JSON.parse(JSON.stringify(serialize())); },
    ledger: function () { return JSON.parse(JSON.stringify(P.ledger)); },
    catalog: function () { return JSON.parse(JSON.stringify(ITEMS)); },
    shelves: function () { return JSON.parse(JSON.stringify(SHELVES)); }
  };
})();
