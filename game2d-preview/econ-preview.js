// econ-preview.js — BẢN XEM TRƯỚC P1: KINH TẾ GIỮA NGƯỜI CHƠI (Lane F, lệnh phối hợp 14:15 JST 31/10/2026).
// Bám ĐÚNG tài liệu ../THIET-KE-KINH-TE-NGUOI-CHOI.md — thông số §5 ĐÃ ĐƯỢC CHỦ TRANG DUYỆT HẾT
// 13:59 JST 31/10/2026 (không tự đổi):
//   · Phí chợ 10% trừ phía người bán (tiền phí chìm) · chuyển tiền + đề nghị trực tiếp phí 0%.
//   · Hạn mức chuyển: gửi ≤ 5 man/ngày · nhận ≤ 10 man/ngày · mỗi lần tối thiểu ¥1.000.
//   · Mở khoá (CẢ HAI phía): xong Chương 1 + tài khoản ≥ 3 ngày + đã là bạn bè.
//   · Khung giá rao/đề nghị: 10% – 200% giá gốc cửa hàng · tối đa 5 tin rao mở · tin sống 7 ngày · đề nghị sống 48 giờ.
// PHẠM VI P1: chạy CỤC BỘ 100% bằng dữ liệu mô phỏng (1 "bạn mô phỏng" có ví + tủ đồ riêng),
// KHÔNG máy chủ, KHÔNG endpoint thật. Ví xem trước TÁCH RIÊNG trong localStorage của file này —
// tuyệt đối không đụng tiền/hàm tiền của mạch truyện chính (GAMEUI/STYLE.moneyTxn không được gọi).
// Đồ Rao bán/đề nghị đọc TỪ tủ đồ mall thật qua window.STYLE (CHỈ ĐỌC catalog() + instances());
// nếu tủ đồ thật đang trống thì gieo instance mẫu đúng cấu trúc {uid, itemId, tradeable, via, at} để thử luồng.
(function () {
  'use strict';

  /* ================= THÔNG SỐ §5 (ĐÃ DUYỆT — KHÔNG ĐỔI) ================= */
  var SEND_CAP = 50000;          // gửi tối đa 5 man/ngày
  var RECEIVE_CAP = 100000;      // nhận tối đa 10 man/ngày
  var MIN_AMOUNT = 1000;         // tối thiểu ¥1.000/lần chuyển
  var MARKET_FEE_RATE = 0.10;    // phí chợ 10%, người bán chịu, chìm
  var PRICE_MIN_R = 0.10, PRICE_MAX_R = 2.00; // khung giá 10%–200% giá shop
  var MAX_LISTINGS = 5;          // tối đa 5 tin rao mở
  var LISTING_TTL = 7 * 24 * 3600 * 1000;     // tin rao sống 7 ngày
  var OFFER_TTL = 48 * 3600 * 1000;           // đề nghị sống 48 giờ
  var LSKEY = 'tuoitre2d_econ_preview_v1';
  var BOT_ID = 'bot-tuananh';
  var BOT_NAME = 'Tuấn Anh';

  /* ================= TIỆN ÍCH ================= */
  function $(id) { return document.getElementById(id); }
  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function yen(n) { return '¥' + Math.round(n).toLocaleString('en-US'); }
  function man(n) { var m = n / 10000; return (Math.round(m * 100) / 100).toString().replace('.', ',') + ' man'; }
  function uid(p) { return p + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8); }
  function jstDay() { try { return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' }); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function fmtTime(at) { try { return new Date(at).toLocaleString('vi-VN', { timeZone: 'Asia/Tokyo', hour12: false, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); } catch (e) { return new Date(at).toLocaleString(); } }
  function leftText(until) {
    var ms = until - Date.now(); if (ms <= 0) return 'đã hết hạn';
    var mins = Math.floor(ms / 60000), hh = Math.floor(mins / 60), dd = Math.floor(hh / 24);
    if (dd > 0) return 'còn ' + dd + ' ngày ' + (hh % 24) + ' giờ';
    if (hh > 0) return 'còn ' + hh + ' giờ ' + (mins % 60) + ' phút';
    return 'còn ' + mins + ' phút';
  }
  function esc(s) { return String(s == null ? '' : s); }

  /* Catalog đọc từ style.js (chỉ đọc) — cache lười biếng */
  var _catMap = null;
  function catMap() {
    if (_catMap) return _catMap;
    _catMap = {};
    try { (window.STYLE && window.STYLE.catalog ? window.STYLE.catalog() : []).forEach(function (it) { _catMap[it.id] = it; }); } catch (e) {}
    return _catMap;
  }
  function cat(id) { return catMap()[id] || null; }
  function itemLabel(id) { var it = cat(id); return it ? (it.emoji + ' ' + it.name) : ('📦 ' + id); }
  function priceFrame(id) { var it = cat(id); if (!it) return null; return { shop: it.price, min: Math.ceil(it.price * PRICE_MIN_R / 100) * 100, max: Math.floor(it.price * PRICE_MAX_R / 100) * 100 }; }

  /* ================= TRẠNG THÁI MÔ PHỎNG ================= */
  var S = null;
  function seedInstances() {
    var pool = [];
    var mine = [];
    try { mine = (window.STYLE && window.STYLE.instances) ? window.STYLE.instances() : []; } catch (e) { mine = []; }
    if (mine && mine.length) {
      mine.forEach(function (x) { pool.push({ uid: x.uid, itemId: x.itemId, tradeable: x.tradeable !== false, via: x.via || 'mall', at: x.at || 0, owner: 'me', locked: null }); });
    } else {
      // Tủ đồ thật đang trống → gieo instance mẫu ĐÚNG cấu trúc thiết kế để thử đủ luồng.
      ['ao-somi-xanh', 'kinh-mat', 'mu-luoi-trai', 'son-do'].forEach(function (id, i) {
        if (cat(id)) pool.push({ uid: 'pv-me-' + (i + 1), itemId: id, tradeable: true, via: 'preview-seed', at: Date.now() - 86400000 * (i + 1), owner: 'me', locked: null });
      });
    }
    ['quan-jean', 'ao-thun-trang', 'nuoc-hoa-bien'].forEach(function (id, i) {
      if (cat(id)) pool.push({ uid: 'pv-bot-' + (i + 1), itemId: id, tradeable: true, via: 'mall', at: Date.now() - 86400000 * (i + 2), owner: 'bot', locked: null });
    });
    return pool;
  }
  function seedState() {
    var now = Date.now();
    var st = {
      v: 1,
      me: { balance: 0 },
      bot: { balance: 0 },
      cond: { meCh1: true, meAge: 12, botCh1: true, botAge: 30, friends: true },
      day: { date: jstDay(), sent: 0, received: 0, botSent: 0, botReceived: 0 },
      pool: seedInstances(),
      listings: [], offers: [], ledger: [], seq: 1
    };
    st.listings.push({ id: 'lst-seed-1', seller: 'bot', uid: 'pv-bot-1', itemId: 'quan-jean', price: 4200, status: 'open', createdAt: now - 3600000, expiresAt: now - 3600000 + LISTING_TTL, buyer: null, soldAt: null });
    st.listings.push({ id: 'lst-seed-2', seller: 'bot', uid: 'pv-bot-3', itemId: 'nuoc-hoa-bien', price: 5200, status: 'open', createdAt: now - 7200000, expiresAt: now - 7200000 + LISTING_TTL, buyer: null, soldAt: null });
    st.pool.forEach(function (p) { if (p.uid === 'pv-bot-1' || p.uid === 'pv-bot-3') p.locked = 'listing'; });
    var firstMine = st.pool.filter(function (p) { return p.owner === 'me'; })[0];
    if (firstMine) {
      st.offers.push({ id: 'ofr-seed-1', from: 'bot', to: 'me', uid: firstMine.uid, itemId: firstMine.itemId, price: 3500, status: 'pending', createdAt: now - 1800000, expiresAt: now - 1800000 + OFFER_TTL, note: 'Món này hợp cậu lắm, để lại cho tớ nhé!' });
      firstMine.locked = 'offer';
    }
    // Số dư mở đầu đi qua ĐÚNG một dòng sổ mở đầu cho mỗi ví (khởi tạo 0 ở trên rồi cộng ở đây — không cộng đôi).
    ledgerAdd(st, 'me', 200000, 'preview_opening', 'preview', 'seed', 'bot', 'Số dư mở đầu bản xem trước — tiền MÔ PHỎNG, tách riêng ví truyện', 'seed-me');
    ledgerAdd(st, 'bot', 68000, 'preview_opening', 'preview', 'seed', 'me', 'Số dư mở đầu của bạn mô phỏng', 'seed-bot');
    return st;
  }
  function ledgerAdd(st, side, delta, kind, refType, refId, cp, note, idem) {
    if (side === 'me') st.me.balance += delta; else st.bot.balance += delta;
    st.ledger.push({ id: 'lg' + (st.seq++), side: side, delta: delta, balanceAfter: side === 'me' ? st.me.balance : st.bot.balance, kind: kind, refType: refType, refId: refId, cp: cp, note: note || '', idem: idem || '', at: Date.now() });
  }
  function save() { try { localStorage.setItem(LSKEY, JSON.stringify(S)); } catch (e) {} }
  function load() {
    try { var raw = localStorage.getItem(LSKEY); if (raw) { var p = JSON.parse(raw); if (p && p.v === 1 && p.me && p.bot) { S = p; } } } catch (e) {}
    if (!S) { S = seedState(); save(); return; }
    if (S.day.date !== jstDay()) { S.day = { date: jstDay(), sent: 0, received: 0, botSent: 0, botReceived: 0 }; save(); }
  }
  function resetAll() { try { localStorage.removeItem(LSKEY); } catch (e) {} S = seedState(); save(); }

  function inst(uidv) { for (var i = 0; i < S.pool.length; i++) if (S.pool[i].uid === uidv) return S.pool[i]; return null; }
  function myOpenListings() { return S.listings.filter(function (l) { return l.seller === 'me' && l.status === 'open'; }); }
  function sendLeft() { return Math.max(0, SEND_CAP - S.day.sent); }
  function recvLeft() { return Math.max(0, RECEIVE_CAP - S.day.received); }
  function botRecvLeft() { return Math.max(0, RECEIVE_CAP - S.day.botReceived); }

  /* ================= KIỂM TRA MỞ KHOÁ (cả hai phía — §5 mục 5) ================= */
  function unlockError() {
    var c = S.cond;
    if (!c.friends) return { code: 'NOT_FRIENDS', msg: 'Hai bên chưa là bạn bè — chỉ giao dịch được với bạn bè.' };
    var why = [];
    if (!c.meCh1) why.push('bạn chưa xong Chương 1');
    if (c.meAge < 3) why.push('tài khoản của bạn chưa đủ 3 ngày');
    if (!c.botCh1) why.push('bạn mô phỏng chưa xong Chương 1');
    if (c.botAge < 3) why.push('tài khoản của bạn mô phỏng chưa đủ 3 ngày');
    if (why.length) return { code: 'NOT_UNLOCKED', msg: 'Chưa đạt mốc mở khoá giao dịch: ' + why.join('; ') + '.' };
    return null;
  }
  function priceError(itemId, price) {
    var f = priceFrame(itemId); if (!f) return { code: 'PRICE_RANGE', msg: 'Không tra được giá gốc cửa hàng của món này.' };
    if (!(price > 0) || price < f.min || price > f.max) return { code: 'PRICE_RANGE', msg: 'Giá phải nằm trong khung 10%–200% giá shop (' + yen(f.min) + ' – ' + yen(f.max) + ' cho món này, giá gốc ' + yen(f.shop) + ').' };
    return null;
  }

  /* ================= (a) CHUYỂN TIỀN ================= */
  function doTransfer(amount, note, idem) {
    load(); // luôn đối chiếu bản đã lưu trước khi giao dịch (bản xem trước: localStorage đóng vai nguồn sự thật)
    amount = Math.round(amount || 0);
    var ue = unlockError(); if (ue) return { ok: false, code: ue.code, msg: ue.msg };
    if (amount < MIN_AMOUNT) return { ok: false, code: 'AMOUNT_RANGE', msg: 'Mỗi lần chuyển tối thiểu ' + yen(MIN_AMOUNT) + '.' };
    if (amount > sendLeft()) return { ok: false, code: 'LIMIT_SEND', msg: 'Vượt hạn mức gửi hôm nay: còn gửi được ' + yen(sendLeft()) + ' / ' + yen(SEND_CAP) + ' mỗi ngày.' };
    if (amount > botRecvLeft()) return { ok: false, code: 'LIMIT_RECEIVE', msg: 'Phía bạn mô phỏng đã gần trần nhận hôm nay (' + yen(RECEIVE_CAP) + '/ngày) — còn nhận được ' + yen(botRecvLeft()) + '.' };
    if (amount > S.me.balance) return { ok: false, code: 'INSUFFICIENT', msg: 'Số dư ví mô phỏng không đủ (đang có ' + yen(S.me.balance) + ').' };
    var ref = 'tx' + (S.seq++);
    ledgerAdd(S, 'me', -amount, 'transfer_out', 'transfer', ref, 'bot', note || '', idem);
    ledgerAdd(S, 'bot', amount, 'transfer_in', 'transfer', ref, 'me', note || '', idem);
    S.day.sent += amount; S.day.botReceived += amount;
    save();
    return { ok: true, txId: ref };
  }

  /* ================= (b) CHỢ NGƯỜI CHƠI ================= */
  function createListing(uidv, price) {
    load();
    price = Math.round(price || 0);
    var ue = unlockError(); if (ue) return { ok: false, code: ue.code, msg: ue.msg };
    var p = inst(uidv); if (!p || p.owner !== 'me') return { ok: false, code: 'ITEM_LOCKED', msg: 'Món này không còn trong tủ của bạn.' };
    if (!p.tradeable) return { ok: false, code: 'ITEM_NOT_TRADEABLE', msg: 'Món này không chuyển nhượng được (tradeable = false).' };
    if (p.locked) return { ok: false, code: 'ITEM_LOCKED', msg: 'Món đang bị khoá trong một giao dịch chờ khác (rao chợ hoặc đề nghị).' };
    if (myOpenListings().length >= MAX_LISTINGS) return { ok: false, code: 'LISTING_LIMIT', msg: 'Tối đa ' + MAX_LISTINGS + ' tin rao mở cùng lúc.' };
    var pe = priceError(p.itemId, price); if (pe) return pe;
    var now = Date.now();
    var l = { id: uid('lst'), seller: 'me', uid: p.uid, itemId: p.itemId, price: price, status: 'open', createdAt: now, expiresAt: now + LISTING_TTL, buyer: null, soldAt: null };
    S.listings.push(l); p.locked = 'listing'; save();
    return { ok: true, listingId: l.id };
  }
  function settleMarketSale(l, buyerSide) {
    // Nguyên tử kiểu mô phỏng: trừ tiền người mua → cộng NGƯỜI BÁN sau phí 10% → instance đổi chủ → tin 'sold'.
    var sellerSide = l.seller;
    var fee = Math.floor(l.price * MARKET_FEE_RATE);
    var net = l.price - fee;
    var ref = 'tx' + (S.seq++);
    ledgerAdd(S, buyerSide, -l.price, 'market_buy', 'listing', l.id, sellerSide, itemLabel(l.itemId), ref);
    ledgerAdd(S, sellerSide, net, 'market_sell', 'listing', l.id, buyerSide, itemLabel(l.itemId) + ' — thực nhận sau phí chợ 10%', ref);
    ledgerAdd(S, sellerSide, 0, 'market_fee', 'listing', l.id, buyerSide, 'Phí chợ 10% = ' + yen(fee) + ' (tiền chìm, đã trừ gọn trong market_sell)', ref);
    var p = inst(l.uid); if (p) { p.owner = buyerSide; p.locked = null; }
    l.status = 'sold'; l.buyer = buyerSide; l.soldAt = Date.now();
    save();
    return { ok: true, txId: ref, fee: fee, net: net };
  }
  function buyListing(id) {
    load();
    var l = null; S.listings.forEach(function (x) { if (x.id === id) l = x; });
    if (!l || l.status !== 'open') return { ok: false, code: 'LISTING_GONE', msg: 'Tin rao không còn (đã bán/gỡ/hết hạn).' };
    if (l.seller === 'me') return { ok: false, code: 'SELF_TRADE', msg: 'Không tự mua tin rao của chính mình.' };
    var ue = unlockError(); if (ue) return { ok: false, code: ue.code, msg: ue.msg };
    if (l.price > S.me.balance) return { ok: false, code: 'INSUFFICIENT', msg: 'Số dư ví mô phỏng không đủ mua món này.' };
    return settleMarketSale(l, 'me');
  }
  function botBuyListing(id) {
    load();
    var l = null; S.listings.forEach(function (x) { if (x.id === id) l = x; });
    if (!l || l.status !== 'open' || l.seller !== 'me') return { ok: false, code: 'LISTING_GONE', msg: 'Tin rao của bạn không còn mở.' };
    if (l.price > S.bot.balance) return { ok: false, code: 'INSUFFICIENT', msg: 'Bạn mô phỏng không đủ tiền mua tin này (ví bạn: ' + yen(S.bot.balance) + ').' };
    return settleMarketSale(l, 'bot');
  }
  function cancelListing(id) {
    load();
    var l = null; S.listings.forEach(function (x) { if (x.id === id) l = x; });
    if (!l || l.seller !== 'me' || l.status !== 'open') return { ok: false, code: 'LISTING_GONE', msg: 'Không gỡ được tin này.' };
    l.status = 'cancelled'; var p = inst(l.uid); if (p) p.locked = null; save();
    return { ok: true };
  }

  /* ================= (c) ĐỀ NGHỊ TRỰC TIẾP ================= */
  function settleOffer(o) {
    // Người BÁN = chủ hiện tại của instance (đề nghị đi: mình bán món của mình;
    // đề nghị đến: bạn hỏi mua món của mình — vẫn là mình bán). Người mua = phía còn lại. Phí 0% (§5 mục 2).
    var p0 = inst(o.uid);
    var sellerSide = p0 ? p0.owner : (o.from === 'me' ? 'me' : 'bot');
    var buyerSide = sellerSide === 'me' ? 'bot' : 'me';
    var ref = 'tx' + (S.seq++);
    ledgerAdd(S, buyerSide, -o.price, 'offer_buy', 'offer', o.id, sellerSide, itemLabel(o.itemId), ref);
    ledgerAdd(S, sellerSide, o.price, 'offer_sell', 'offer', o.id, buyerSide, itemLabel(o.itemId) + ' — đề nghị trực tiếp, phí 0%', ref);
    var p = inst(o.uid); if (p) { p.owner = buyerSide; p.locked = null; }
    o.status = 'accepted'; o.respondedAt = Date.now();
    save();
    return { ok: true, txId: ref };
  }
  function sendOffer(uidv, price) {
    load();
    price = Math.round(price || 0);
    var ue = unlockError(); if (ue) return { ok: false, code: ue.code, msg: ue.msg };
    var p = inst(uidv); if (!p || p.owner !== 'me') return { ok: false, code: 'ITEM_LOCKED', msg: 'Món này không còn trong tủ của bạn.' };
    if (!p.tradeable) return { ok: false, code: 'ITEM_NOT_TRADEABLE', msg: 'Món này không chuyển nhượng được.' };
    if (p.locked) return { ok: false, code: 'ITEM_LOCKED', msg: 'Món đang bị khoá trong một giao dịch chờ khác.' };
    var pe = priceError(p.itemId, price); if (pe) return pe;
    var now = Date.now();
    var o = { id: uid('ofr'), from: 'me', to: 'bot', uid: p.uid, itemId: p.itemId, price: price, status: 'pending', createdAt: now, expiresAt: now + OFFER_TTL, note: '' };
    S.offers.push(o); p.locked = 'offer'; save();
    // Bạn mô phỏng phản hồi đơn giản sau ~0,9 giây: nhận nếu giá ≥ 70% giá shop và ví bạn đủ tiền.
    setTimeout(function () {
      load();
      var cur = null; S.offers.forEach(function (x) { if (x.id === o.id) cur = x; });
      if (!cur || cur.status !== 'pending') return;
      var f = priceFrame(cur.itemId);
      if (f && cur.price >= Math.round(f.shop * 0.7) && S.bot.balance >= cur.price) {
        settleOffer(cur);
        uiMsg('good', '', '🤖 ' + BOT_NAME + ' đã ĐỒNG Ý đề nghị ' + itemLabel(cur.itemId) + ' với giá ' + yen(cur.price) + ' — tiền đã về ví mô phỏng của bạn (phí 0%).');
      } else {
        cur.status = 'rejected'; cur.respondedAt = Date.now();
        var pp = inst(cur.uid); if (pp) pp.locked = null;
        cur.note = S.bot.balance < cur.price ? 'Ví của tớ không đủ tiền mua giá này.' : 'Giá này hơi thấp so với giá shop, tớ chưa bán đâu.';
        save();
        uiMsg('err', '', '🤖 ' + BOT_NAME + ' TỪ CHỐI đề nghị ' + itemLabel(cur.itemId) + ': “' + cur.note + '” Món đã mở khoá.');
      }
      if (overlayOpen) render();
    }, 900);
    return { ok: true, offerId: o.id };
  }
  function respondOffer(id, accept) {
    load();
    var o = null; S.offers.forEach(function (x) { if (x.id === id) o = x; });
    if (!o || o.status !== 'pending' || o.to !== 'me') return { ok: false, code: 'OFFER_EXPIRED', msg: 'Đề nghị không còn chờ trả lời.' };
    if (!accept) { o.status = 'rejected'; o.respondedAt = Date.now(); var p = inst(o.uid); if (p) p.locked = null; save(); return { ok: true }; }
    var ue = unlockError(); if (ue) return { ok: false, code: ue.code, msg: ue.msg };
    if (S.bot.balance < o.price) return { ok: false, code: 'INSUFFICIENT', msg: 'Bạn mô phỏng không còn đủ tiền trả cho đề nghị này.' };
    return settleOffer(o);
  }
  function cancelOffer(id) {
    load();
    var o = null; S.offers.forEach(function (x) { if (x.id === id) o = x; });
    if (!o || o.from !== 'me' || o.status !== 'pending') return { ok: false, code: 'OFFER_EXPIRED', msg: 'Không rút được đề nghị này.' };
    o.status = 'cancelled'; o.respondedAt = Date.now(); var p = inst(o.uid); if (p) p.locked = null; save();
    return { ok: true };
  }

  /* ================= GIAO DIỆN ================= */
  var overlayOpen = false;
  var tab = 'transfer';
  var draft = { amount: '', note: '', confirming: false, idem: '', listUid: '', listPrice: '', offerUid: '', offerPrice: '' };
  var msgState = null; // {kind:'err'|'good', code, text}
  function uiMsg(kind, code, text) { msgState = text ? { kind: kind, code: code || '', text: text } : null; if (overlayOpen) renderMsg(); }
  function showResult(r, okText) {
    if (r && r.ok) uiMsg('good', '', okText);
    else uiMsg('err', r ? r.code : 'ERROR', (r && r.msg) || 'Có lỗi xảy ra.');
  }
  function availInstances(owner) { return S.pool.filter(function (p) { return p.owner === owner && p.tradeable && !p.locked; }); }

  function buildOverlay() {
    if ($('econ-overlay')) return;
    var ov = h('div'); ov.id = 'econ-overlay';
    ov.innerHTML =
      '<div class="econ-card">' +
      '  <div class="econ-head"><div class="econ-title">💴 Ví &amp; Chợ — Kinh tế người chơi</div>' +
      '  <span class="econ-badge">MÔ PHỎNG · XEM TRƯỚC P1</span>' +
      '  <button class="econ-close" id="econ-close" type="button">Đóng ✕</button></div>' +
      '  <div class="econ-warn">🧪 <b>BẢN MÔ PHỎNG:</b> toàn bộ tiền, bạn bè và giao dịch ở đây là dữ liệu giả chạy ngay trên máy này — chưa có máy chủ thật. Ví này <b>tách riêng</b>, không phải tiền trong truyện. ' +
      '⚠️ <b>Chỉ mua bán bằng nút trong game.</b> Ai rủ bạn chuyển đồ/tiền trước qua chat hoặc ra ngoài game đều là lừa đảo. Tiền trong game không đổi ra được bất cứ thứ gì ngoài game.</div>' +
      '  <div id="econ-top"></div>' +
      '  <div class="econ-tabs">' +
      '    <button class="econ-tab" data-tab="transfer" type="button">💸 Chuyển tiền</button>' +
      '    <button class="econ-tab" data-tab="market" type="button">🏪 Chợ người chơi</button>' +
      '    <button class="econ-tab" data-tab="offers" type="button">💱 Đề nghị trực tiếp</button>' +
      '    <button class="econ-tab" data-tab="ledger" type="button">📒 Sổ giao dịch</button>' +
      '  </div>' +
      '  <div class="econ-msg" id="econ-msg"></div>' +
      '  <div id="econ-body"></div>' +
      '  <div class="econ-foot"><span class="note">Thông số theo thiết kế §5 đã duyệt 13:59 JST 31/10/2026: phí chợ 10% · chuyển/đề nghị 0% · gửi ≤5 man/ngày · nhận ≤10 man/ngày · tối thiểu ¥1.000 · giá 10%–200% giá shop · 5 tin · tin 7 ngày · đề nghị 48 giờ.</span>' +
      '  <button class="econ-btn ghost small" id="econ-reset" type="button">↺ Đặt lại dữ liệu mô phỏng</button></div>' +
      '</div>';
    document.body.appendChild(ov);
    $('econ-close').addEventListener('click', close);
    $('econ-reset').addEventListener('click', function () { resetAll(); draft.confirming = false; uiMsg('good', '', 'Đã đặt lại toàn bộ dữ liệu mô phỏng về trạng thái ban đầu.'); render(); });
    ov.querySelectorAll('.econ-tab').forEach(function (b) { b.addEventListener('click', function () { tab = b.getAttribute('data-tab'); msgState = null; render(); }); });
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  }

  function renderMsg() {
    var m = $('econ-msg'); if (!m) return;
    if (!msgState) { m.className = 'econ-msg'; m.innerHTML = ''; return; }
    m.className = 'econ-msg show ' + msgState.kind;
    m.innerHTML = '';
    if (msgState.code) m.appendChild(h('span', 'econ-code', msgState.code));
    m.appendChild(document.createTextNode(msgState.text));
  }

  function renderTop() {
    var top = $('econ-top'); if (!top) return;
    top.innerHTML = '';
    var w = h('div', 'econ-wallets');
    var mine = h('div', 'econ-wallet');
    mine.appendChild(h('div', 'who', '👤 Ví của bạn (mô phỏng)'));
    mine.appendChild(h('div', 'bal', yen(S.me.balance)));
    mine.appendChild(h('div', 'sub', '= ' + man(S.me.balance) + ' · tách riêng ví truyện'));
    var bot = h('div', 'econ-wallet');
    bot.appendChild(h('div', 'who', '🤖 Ví của ' + BOT_NAME + ' — bạn mô phỏng'));
    bot.appendChild(h('div', 'bal', yen(S.bot.balance)));
    bot.appendChild(h('div', 'sub', '= ' + man(S.bot.balance) + ' · bạn bè giả lập chạy cục bộ'));
    w.appendChild(mine); w.appendChild(bot); top.appendChild(w);
    var ue = unlockError();
    var lim = h('div', 'econ-limits');
    lim.innerHTML = 'Hạn mức chuyển hôm nay (' + S.day.date + ', giờ Nhật): đã gửi <b>' + yen(S.day.sent) + '</b> / ' + yen(SEND_CAP) +
      ' · đã nhận <b>' + yen(S.day.received) + '</b> / ' + yen(RECEIVE_CAP) +
      ' · Trạng thái mở khoá: ' + (ue ? '<span class="bad">🔒 CHƯA MỞ (' + ue.code + ')</span>' : '<span class="ok">🔓 ĐÃ MỞ — cả hai phía xong Chương 1 + TK ≥3 ngày + là bạn bè</span>');
    top.appendChild(lim);
    var det = h('details', 'econ-cond');
    var sum = h('summary', null, '🎛 Điều kiện mô phỏng — chỉnh để thử các chặn mở khoá/hạn mức');
    det.appendChild(sum);
    var grid = h('div', 'econ-cond-grid');
    grid.innerHTML =
      '<label><input type="checkbox" id="cond-me-ch1"' + (S.cond.meCh1 ? ' checked' : '') + '> Tôi đã xong Chương 1</label>' +
      '<label>TK của tôi (ngày): <input type="number" id="cond-me-age" min="0" max="999" value="' + S.cond.meAge + '"></label>' +
      '<label><input type="checkbox" id="cond-bot-ch1"' + (S.cond.botCh1 ? ' checked' : '') + '> ' + BOT_NAME + ' đã xong Chương 1</label>' +
      '<label>TK của bạn (ngày): <input type="number" id="cond-bot-age" min="0" max="999" value="' + S.cond.botAge + '"></label>' +
      '<label><input type="checkbox" id="cond-friends"' + (S.cond.friends ? ' checked' : '') + '> Hai bên đã là bạn bè</label>';
    det.appendChild(grid); top.appendChild(det);
    function bind(id, fn) { var el = $(id); if (el) el.addEventListener('change', function () { fn(el); save(); render(); }); }
    bind('cond-me-ch1', function (el) { S.cond.meCh1 = el.checked; });
    bind('cond-bot-ch1', function (el) { S.cond.botCh1 = el.checked; });
    bind('cond-friends', function (el) { S.cond.friends = el.checked; });
    bind('cond-me-age', function (el) { S.cond.meAge = Math.max(0, parseInt(el.value || '0', 10) || 0); });
    bind('cond-bot-age', function (el) { S.cond.botAge = Math.max(0, parseInt(el.value || '0', 10) || 0); });
  }

  function render() {
    if (!overlayOpen) return;
    document.querySelectorAll('#econ-overlay .econ-tab').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-tab') === tab); });
    renderTop(); renderMsg();
    var body = $('econ-body'); body.innerHTML = '';
    if (tab === 'transfer') renderTransfer(body);
    else if (tab === 'market') renderMarket(body);
    else if (tab === 'offers') renderOffers(body);
    else renderLedger(body);
  }

  /* ---- Tab Chuyển tiền ---- */
  function renderTransfer(body) {
    body.appendChild(h('div', 'econ-sec-t', '💸 Chuyển tiền cho bạn (phí 0%)'));
    var card = h('div', 'econ-friend');
    card.appendChild(h('div', null, '🤖 Người nhận: ' + BOT_NAME + ' — bạn mô phỏng'));
    card.appendChild(h('div', 'econ-hint', 'Chỉ chuyển được cho BẠN BÈ · tối thiểu ' + yen(MIN_AMOUNT) + '/lần · hôm nay bạn còn gửi được ' + yen(sendLeft()) + ', phía bạn còn nhận được ' + yen(botRecvLeft()) + '. Chuyển xong KHÔNG huỷ được — muốn trả lại, phía nhận tự chuyển ngược bằng giao dịch mới.'));
    var r1 = h('div', 'econ-row');
    r1.appendChild(h('label', null, 'Số tiền (yên):'));
    var inp = h('input', 'econ-inp'); inp.id = 'econ-amount'; inp.type = 'number'; inp.min = '0'; inp.step = '100'; inp.placeholder = 'VD: 20000'; inp.value = draft.amount;
    inp.addEventListener('input', function () { draft.amount = inp.value; draft.confirming = false; updMan(); });
    r1.appendChild(inp);
    var manSpan = h('span', 'econ-hint'); manSpan.id = 'econ-amount-man';
    r1.appendChild(manSpan); card.appendChild(r1);
    function updMan() { var v = parseInt(draft.amount || '0', 10) || 0; manSpan.textContent = v > 0 ? ('= ' + man(v) + ' · số dư sau chuyển: ' + yen(S.me.balance - v)) : ''; }
    updMan();
    var r2 = h('div', 'econ-row');
    r2.appendChild(h('label', null, 'Ghi chú:'));
    var note = h('input', 'econ-inp'); note.id = 'econ-note'; note.type = 'text'; note.maxLength = 40; note.placeholder = 'Tối đa 40 ký tự, chỉ hai phía thấy'; note.value = draft.note;
    note.addEventListener('input', function () { draft.note = note.value; });
    r2.appendChild(note); card.appendChild(r2);
    var r3 = h('div', 'econ-row');
    var btn = h('button', 'econ-btn', 'Chuyển tiền →'); btn.id = 'econ-transfer-btn'; btn.type = 'button';
    btn.addEventListener('click', function () {
      var amount = Math.round(parseInt(draft.amount || '0', 10) || 0);
      // Chạy kiểm tra trước (không trừ gì) bằng cách kiểm cùng bộ luật:
      var ue = unlockError();
      if (ue) { uiMsg('err', ue.code, ue.msg); return; }
      if (amount < MIN_AMOUNT) { uiMsg('err', 'AMOUNT_RANGE', 'Mỗi lần chuyển tối thiểu ' + yen(MIN_AMOUNT) + '.'); return; }
      if (amount > sendLeft()) { uiMsg('err', 'LIMIT_SEND', 'Vượt hạn mức gửi hôm nay: còn gửi được ' + yen(sendLeft()) + ' / ' + yen(SEND_CAP) + ' mỗi ngày.'); return; }
      if (amount > botRecvLeft()) { uiMsg('err', 'LIMIT_RECEIVE', 'Phía bạn mô phỏng còn nhận được ' + yen(botRecvLeft()) + ' hôm nay.'); return; }
      if (amount > S.me.balance) { uiMsg('err', 'INSUFFICIENT', 'Số dư ví mô phỏng không đủ (đang có ' + yen(S.me.balance) + ').'); return; }
      draft.confirming = true; draft.idem = uid('idem'); render();
    });
    r3.appendChild(btn); card.appendChild(r3);
    if (draft.confirming) {
      var amount2 = Math.round(parseInt(draft.amount || '0', 10) || 0);
      var cf = h('div', 'econ-confirm'); cf.id = 'econ-confirm-box';
      cf.appendChild(h('div', null, 'Chuyển ' + yen(amount2) + ' (' + man(amount2) + ') cho ' + BOT_NAME + '? Chuyển xong không huỷ được.'));
      var rr = h('div', 'econ-row');
      var yes = h('button', 'econ-btn warn', '✔ Xác nhận chuyển'); yes.id = 'econ-confirm-yes'; yes.type = 'button';
      yes.addEventListener('click', function () {
        var r = doTransfer(amount2, draft.note, draft.idem);
        draft.confirming = false;
        if (r.ok) { draft.amount = ''; draft.note = ''; showResult(r, '✅ Đã chuyển ' + yen(amount2) + ' cho ' + BOT_NAME + ' (mã giao dịch ' + r.txId + '). Bên nhận không cần bấm "nhận" — tiền đã cộng vào ví bạn.'); }
        else showResult(r);
        render();
      });
      var no = h('button', 'econ-btn ghost', 'Quay lại'); no.id = 'econ-confirm-no'; no.type = 'button';
      no.addEventListener('click', function () { draft.confirming = false; render(); });
      rr.appendChild(yes); rr.appendChild(no); cf.appendChild(rr); card.appendChild(cf);
    }
    body.appendChild(card);
    body.appendChild(h('div', 'econ-hint', '📬 Hộp thư giao dịch (mô phỏng): phía nhận sẽ thấy thông báo “' + 'Bạn đã nhận ' + yen(0).replace('¥0', '¥X') + ' từ …” ở lần vào game kế tiếp — ở bản xem trước này, xem ngay ở tab 📒 Sổ giao dịch.'));
  }

  /* ---- Tab Chợ ---- */
  function listingCard(l) {
    var it = cat(l.itemId);
    var card = h('div', 'econ-item');
    var head = h('div');
    head.appendChild(h('span', 'nm', (it ? it.emoji + ' ' + it.name : l.itemId)));
    head.appendChild(h('span', 'econ-tag ' + (l.status === 'open' ? 'open' : 'done'), l.status === 'open' ? 'ĐANG RAO' : (l.status === 'sold' ? 'ĐÃ BÁN' : (l.status === 'cancelled' ? 'ĐÃ GỠ' : 'HẾT HẠN'))));
    if (l.seller === 'me') head.appendChild(h('span', 'econ-tag mine', 'TIN CỦA BẠN'));
    else head.appendChild(h('span', 'econ-tag sim', 'NGƯỜI BÁN: ' + BOT_NAME + ' (mô phỏng)'));
    card.appendChild(head);
    var meta = h('div', 'meta');
    var f = priceFrame(l.itemId);
    meta.textContent = (it ? it.jp + ' · ' : '') + 'Giá shop gốc ' + (f ? yen(f.shop) : '?') + ' · Hạn tin: ' + leftText(l.expiresAt) + ' (7 ngày)';
    card.appendChild(meta);
    var pr = h('div', 'price', yen(l.price));
    if (l.seller === 'me' && l.status === 'open') pr.appendChild(h('span', 'econ-hint', ' — bán được bạn thực nhận ' + yen(l.price - Math.floor(l.price * MARKET_FEE_RATE)) + ' (phí chợ 10% = ' + yen(Math.floor(l.price * MARKET_FEE_RATE)) + ', tiền phí chìm)'));
    card.appendChild(pr);
    if (l.status === 'open') {
      var r = h('div', 'econ-row');
      if (l.seller !== 'me') {
        var buy = h('button', 'econ-btn small', '🛒 Mua món này'); buy.type = 'button'; buy.setAttribute('data-buy', l.id);
        buy.addEventListener('click', function () { var rr = buyListing(l.id); showResult(rr, rr.ok ? '✅ Đã mua ' + itemLabel(l.itemId) + ' với giá ' + yen(l.price) + ' từ chợ mô phỏng. Món đã về tủ đồ mô phỏng của bạn.' : ''); render(); });
        r.appendChild(buy);
      } else {
        var sim = h('button', 'econ-btn small warn', '🧪 Cho ' + BOT_NAME + ' mua tin này (mô phỏng)'); sim.type = 'button'; sim.setAttribute('data-simbuy', l.id);
        sim.addEventListener('click', function () { var rr = botBuyListing(l.id); showResult(rr, rr.ok ? '✅ ' + BOT_NAME + ' đã mua ' + itemLabel(l.itemId) + ' — bạn thực nhận ' + yen(rr.net) + ' sau phí chợ 10% (' + yen(rr.fee) + ' chìm).' : ''); render(); });
        r.appendChild(sim);
        var can = h('button', 'econ-btn ghost small', 'Gỡ tin'); can.type = 'button'; can.setAttribute('data-cancel', l.id);
        can.addEventListener('click', function () { var rr = cancelListing(l.id); showResult(rr, 'Đã gỡ tin rao — món được mở khoá.'); render(); });
        r.appendChild(can);
      }
      card.appendChild(r);
    }
    return card;
  }
  function renderMarket(body) {
    body.appendChild(h('div', 'econ-sec-t', '🏪 Chợ người chơi — «Chợ đồ cũ & trao đổi» (mô phỏng)'));
    body.appendChild(h('div', 'econ-hint', 'Rao bán món trong tủ đồ mô phỏng của bạn: món bị KHOÁ khi đang rao · tối đa ' + MAX_LISTINGS + ' tin · tin sống 7 ngày · phí chợ 10% trừ phía người bán (chìm). Lướt chợ xem được ở đây; khi lên máy chủ thật (P2), rao/mua tại khu chợ trong trung tâm thương mại.'));
    var open = S.listings.filter(function (l) { return l.status === 'open'; });
    var closed = S.listings.filter(function (l) { return l.status !== 'open'; });
    if (!open.length) body.appendChild(h('div', 'econ-hint', 'Chợ đang trống.'));
    open.forEach(function (l) { body.appendChild(listingCard(l)); });
    // Form rao bán
    body.appendChild(h('div', 'econ-sec-t', '➕ Rao bán món của bạn'));
    var avail = availInstances('me');
    if (!avail.length) { body.appendChild(h('div', 'econ-hint', 'Tủ đồ mô phỏng không còn món nào rảnh (đang bị khoá hết hoặc đã bán). Bấm “↺ Đặt lại dữ liệu mô phỏng” để gieo lại.')); }
    else {
      var r1 = h('div', 'econ-row');
      var sel = h('select', 'econ-sel'); sel.id = 'econ-list-item';
      avail.forEach(function (p) { var o = h('option', null, itemLabel(p.itemId) + ' (uid ' + p.uid + ')'); o.value = p.uid; sel.appendChild(o); });
      if (!draft.listUid || !avail.some(function (p) { return p.uid === draft.listUid; })) draft.listUid = avail[0].uid;
      sel.value = draft.listUid;
      sel.addEventListener('change', function () { draft.listUid = sel.value; render(); });
      r1.appendChild(sel); body.appendChild(r1);
      var f = priceFrame((inst(draft.listUid) || {}).itemId);
      var r2 = h('div', 'econ-row');
      r2.appendChild(h('label', null, 'Giá rao (yên):'));
      var pin = h('input', 'econ-inp'); pin.id = 'econ-list-price'; pin.type = 'number'; pin.step = '100'; pin.placeholder = f ? ('Khung: ' + f.min + ' – ' + f.max) : ''; pin.value = draft.listPrice;
      pin.addEventListener('input', function () { draft.listPrice = pin.value; updNet(); });
      r2.appendChild(pin); body.appendChild(r2);
      var net = h('div', 'econ-hint'); net.id = 'econ-list-net'; body.appendChild(net);
      function updNet() {
        var v = Math.round(parseInt(draft.listPrice || '0', 10) || 0);
        net.textContent = f ? ('Giá shop gốc ' + yen(f.shop) + ' → khung cho phép ' + yen(f.min) + ' – ' + yen(f.max) + '.' + (v > 0 ? ' Giá ' + yen(v) + ' — phí chợ 10% — bạn thực nhận ' + yen(v - Math.floor(v * MARKET_FEE_RATE)) + '.' : '')) : '';
      }
      updNet();
      var r3 = h('div', 'econ-row');
      var btn = h('button', 'econ-btn', '📣 Đăng tin rao'); btn.id = 'econ-list-btn'; btn.type = 'button';
      btn.addEventListener('click', function () {
        var rr = createListing(draft.listUid, parseInt(draft.listPrice || '0', 10) || 0);
        showResult(rr, rr.ok ? '✅ Đã đăng tin rao (sống 7 ngày). Món bị khoá trong tủ cho tới khi bán được/gỡ tin.' : '');
        if (rr.ok) draft.listPrice = '';
        render();
      });
      r3.appendChild(btn); body.appendChild(r3);
      body.appendChild(h('div', 'econ-hint', 'Tin rao của bạn đang mở: ' + myOpenListings().length + '/' + MAX_LISTINGS + '.'));
    }
    if (closed.length) {
      body.appendChild(h('div', 'econ-sec-t', 'Tin đã đóng'));
      closed.slice(-4).reverse().forEach(function (l) { body.appendChild(listingCard(l)); });
    }
  }

  /* ---- Tab Đề nghị ---- */
  function offerCard(o) {
    var card = h('div', 'econ-item');
    var head = h('div');
    head.appendChild(h('span', 'nm', itemLabel(o.itemId)));
    head.appendChild(h('span', 'econ-tag ' + (o.status === 'pending' ? 'pend' : 'done'), o.status === 'pending' ? 'ĐANG CHỜ' : (o.status === 'accepted' ? 'ĐÃ ĐỒNG Ý' : (o.status === 'rejected' ? 'ĐÃ TỪ CHỐI' : (o.status === 'cancelled' ? 'ĐÃ RÚT' : 'HẾT HẠN')))));
    head.appendChild(h('span', 'econ-tag sim', o.from === 'me' ? ('BẠN → ' + BOT_NAME) : (BOT_NAME + ' → BẠN')));
    card.appendChild(head);
    var meta = h('div', 'meta');
    var f = priceFrame(o.itemId);
    meta.textContent = 'Giá đề nghị ' + yen(o.price) + ' (phí 0%) · giá shop gốc ' + (f ? yen(f.shop) : '?') + (o.status === 'pending' ? ' · hết hạn: ' + leftText(o.expiresAt) + ' (48 giờ)' : '') + (o.note ? ' · 💬 “' + o.note + '”' : '');
    card.appendChild(meta);
    if (o.status === 'pending') {
      var r = h('div', 'econ-row');
      if (o.to === 'me') {
        var acc = h('button', 'econ-btn small', '✔ Đồng ý bán'); acc.type = 'button'; acc.setAttribute('data-acc', o.id);
        acc.addEventListener('click', function () { var rr = respondOffer(o.id, true); showResult(rr, rr.ok ? '✅ Đã bán ' + itemLabel(o.itemId) + ' cho ' + BOT_NAME + ' qua đề nghị trực tiếp — nhận đủ ' + yen(o.price) + ' (phí 0%).' : ''); render(); });
        var rej = h('button', 'econ-btn ghost small', '✖ Từ chối'); rej.type = 'button'; rej.setAttribute('data-rej', o.id);
        rej.addEventListener('click', function () { var rr = respondOffer(o.id, false); showResult(rr, 'Đã từ chối đề nghị — món được mở khoá.'); render(); });
        r.appendChild(acc); r.appendChild(rej);
      } else {
        r.appendChild(h('span', 'econ-hint', '⏳ Đang chờ ' + BOT_NAME + ' trả lời (bạn mô phỏng trả lời sau ~1 giây)…'));
        var can = h('button', 'econ-btn ghost small', 'Rút đề nghị'); can.type = 'button'; can.setAttribute('data-canc', o.id);
        can.addEventListener('click', function () { var rr = cancelOffer(o.id); showResult(rr, 'Đã rút đề nghị — món được mở khoá.'); render(); });
        r.appendChild(can);
      }
      card.appendChild(r);
    }
    return card;
  }
  function renderOffers(body) {
    body.appendChild(h('div', 'econ-sec-t', '💱 Đề nghị trực tiếp với ' + BOT_NAME + ' (phí 0%)'));
    body.appendChild(h('div', 'econ-hint', 'Đề nghị là một BẢN GHI giao dịch riêng (không phải tin nhắn thường): món bị khoá khi đang chờ · sống 48 giờ · phía nhận bấm Đồng ý thì hệ thống mới trừ tiền + chuyển đồ cùng lúc. Không có “gửi đồ trước trả tiền sau”.'));
    var pendIn = S.offers.filter(function (o) { return o.to === 'me' && o.status === 'pending'; });
    if (pendIn.length) { body.appendChild(h('div', 'econ-sec-t', '📥 Đề nghị gửi đến bạn')); pendIn.forEach(function (o) { body.appendChild(offerCard(o)); }); }
    body.appendChild(h('div', 'econ-sec-t', '➕ Gửi đề nghị bán món của bạn cho ' + BOT_NAME));
    var avail = availInstances('me');
    if (!avail.length) body.appendChild(h('div', 'econ-hint', 'Tủ đồ mô phỏng không còn món nào rảnh để đề nghị.'));
    else {
      var r1 = h('div', 'econ-row');
      var sel = h('select', 'econ-sel'); sel.id = 'econ-offer-item';
      avail.forEach(function (p) { var o = h('option', null, itemLabel(p.itemId) + ' (uid ' + p.uid + ')'); o.value = p.uid; sel.appendChild(o); });
      if (!draft.offerUid || !avail.some(function (p) { return p.uid === draft.offerUid; })) draft.offerUid = avail[0].uid;
      sel.value = draft.offerUid;
      sel.addEventListener('change', function () { draft.offerUid = sel.value; render(); });
      r1.appendChild(sel); body.appendChild(r1);
      var f = priceFrame((inst(draft.offerUid) || {}).itemId);
      var r2 = h('div', 'econ-row');
      r2.appendChild(h('label', null, 'Giá đề nghị (yên):'));
      var pin = h('input', 'econ-inp'); pin.id = 'econ-offer-price'; pin.type = 'number'; pin.step = '100'; pin.placeholder = f ? ('Khung: ' + f.min + ' – ' + f.max) : ''; pin.value = draft.offerPrice;
      pin.addEventListener('input', function () { draft.offerPrice = pin.value; });
      r2.appendChild(pin); body.appendChild(r2);
      body.appendChild(h('div', 'econ-hint', f ? ('Giá shop gốc ' + yen(f.shop) + ' → khung 10%–200%: ' + yen(f.min) + ' – ' + yen(f.max) + '. Mẹo thử luồng: ' + BOT_NAME + ' thường ĐỒNG Ý khi giá ≥ 70% giá shop, thấp hơn thì từ chối.') : ''));
      var r3 = h('div', 'econ-row');
      var btn = h('button', 'econ-btn', '📨 Gửi đề nghị'); btn.id = 'econ-offer-btn'; btn.type = 'button';
      btn.addEventListener('click', function () {
        var rr = sendOffer(draft.offerUid, parseInt(draft.offerPrice || '0', 10) || 0);
        showResult(rr, rr.ok ? '✅ Đã gửi đề nghị (sống 48 giờ). Món đã khoá chờ trả lời.' : '');
        if (rr.ok) draft.offerPrice = '';
        render();
      });
      r3.appendChild(btn); body.appendChild(r3);
    }
    var rest = S.offers.filter(function (o) { return !(o.to === 'me' && o.status === 'pending'); });
    if (rest.length) { body.appendChild(h('div', 'econ-sec-t', 'Lịch sử đề nghị')); rest.slice().reverse().forEach(function (o) { body.appendChild(offerCard(o)); }); }
  }

  /* ---- Tab Sổ giao dịch ---- */
  function ledgerTable(side) {
    var rows = S.ledger.filter(function (e) { return e.side === side; }).slice().reverse();
    var wrap = h('div', 'econ-tablewrap');
    var t = h('table', 'econ-table');
    t.innerHTML = '<tr><th>Thời gian</th><th>Loại</th><th>Đối tác</th><th>Số tiền</th><th>Số dư sau</th><th>Ghi chú</th></tr>';
    rows.forEach(function (e) {
      var tr = h('tr');
      tr.appendChild(h('td', null, fmtTime(e.at)));
      tr.appendChild(h('td', null, e.kind));
      tr.appendChild(h('td', null, e.cp === 'bot' ? BOT_NAME : (e.cp === 'me' ? 'Bạn' : e.cp)));
      var td = h('td', e.delta > 0 ? 'econ-plus' : (e.delta < 0 ? 'econ-minus' : null), (e.delta > 0 ? '+' : '') + (e.delta === 0 ? '±0 (ảo)' : yen(e.delta)));
      tr.appendChild(td);
      tr.appendChild(h('td', null, yen(e.balanceAfter)));
      tr.appendChild(h('td', null, e.note || ''));
      t.appendChild(tr);
    });
    wrap.appendChild(t);
    return wrap;
  }
  function renderLedger(body) {
    body.appendChild(h('div', 'econ-sec-t', '📒 Sổ giao dịch của bạn (mô phỏng)'));
    body.appendChild(h('div', 'econ-hint', 'Mẫu sổ bám đúng thiết kế §3.2 (game_econ_ledger): mỗi giao dịch hai phía = hai dòng dùng chung một mã tham chiếu, có idem key chống trùng. Chỉ xem được sổ của chính mình.'));
    body.appendChild(ledgerTable('me'));
    body.appendChild(h('div', 'econ-sec-t', '📒 Sổ của ' + BOT_NAME + ' (chỉ để đối chiếu ở bản xem trước)'));
    body.appendChild(ledgerTable('bot'));
  }

  function open() { load(); buildOverlay(); overlayOpen = true; $('econ-overlay').classList.add('show'); render(); }
  function close() { overlayOpen = false; var ov = $('econ-overlay'); if (ov) ov.classList.remove('show'); }

  /* ================= NÚT VÀO + API ================= */
  function injectButtons() {
    var LABEL = '💴 Xem trước: Kinh tế người chơi (mô phỏng)';
    var sc = document.querySelector('#start-overlay .start-card');
    if (sc && !$('econ-entry-start')) {
      var b = h('button', 'econ-entry', LABEL); b.id = 'econ-entry-start'; b.type = 'button';
      b.addEventListener('click', open); sc.appendChild(b);
    }
    var setCard = document.querySelector('#modal-settings .modal-card');
    if (setCard && !$('econ-entry-settings')) {
      var row = h('div', 'mrow');
      row.appendChild(h('span', null, '🧪 Kinh tế người chơi (xem trước P1)'));
      var b2 = h('button', 'btn ghost', LABEL); b2.id = 'econ-entry-settings'; b2.type = 'button';
      b2.addEventListener('click', function () { var m = $('modal-settings'); if (m) m.classList.remove('show'); open(); });
      row.appendChild(b2); setCard.appendChild(row);
    }
  }
  load();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectButtons); else injectButtons();

  window.ECONPREVIEW = {
    version: 'P1-preview-1',
    open: open, close: close,
    reset: function () { resetAll(); if (overlayOpen) render(); },
    state: function () { load(); return JSON.parse(JSON.stringify(S)); },
    transfer: function (amount, note) { return doTransfer(amount, note || '', uid('idem')); },
    createListing: createListing, buyListing: buyListing, botBuyListing: botBuyListing, cancelListing: cancelListing,
    sendOffer: sendOffer, respondOffer: respondOffer, cancelOffer: cancelOffer
  };
})();
