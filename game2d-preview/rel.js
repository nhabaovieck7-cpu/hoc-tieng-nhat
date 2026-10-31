// rel.js — TUYẾN TÌNH CẢM CHƯƠNG 3 (giai đoạn 7, lệnh chủ trang 14:07 + 14:09 JST 31/10/2026).
// Nội dung thoại nằm ở scenes-j.js; file này là MÁY TRẠNG THÁI của tuyến:
//   1) ĐIỂM "QUAN TÂM YÊU XA" (lovecare): điểm nền từ Sổ lời hứa (story.js) + 3 nhịp đầu Ch3 —
//      A: tin nhắn của người yêu (trả lời qua điện thoại, PHONE.setReplies + cb) ·
//      B: cuộc gọi video (PHONE.startCall, lựa chọn có cb) · C: nhịp cám dỗ ở Nhật (cảnh
//      'ch3-cam-do-nam/nu' — đọc mã trong note của GAMEUI.log, đúng tiền lệ nhịp SIM).
//      Kết cục (KHUNG-GAME §4.10): léng phéng (flirted) → 'cam-sung' · điểm ≥ 5 → 'giu-duoc' ·
//      còn lại → 'bi-da'. Tuyến nam: người yêu là Linh; tuyến nữ: bạn trai ở quê là Hải
//      (luồng tin nhắn 'lover' được ĐỔI TÊN hiển thị theo tuyến; thoại viết riêng từng tuyến).
//   2) CHUỖI HỒI PHỤC sau đổ vỡ: cảnh khóc 'ch3-khoc' → cảnh 'ch3-hoi-phuc' (đọc đường đã chọn
//      từ note) → recovered=true → nhịp ĐƯỢC TÁN NGƯỢC 'ch3-tan-nguoc-nam/nu'.
//   3) TÁN NGƯỜI MỚI: 4 ứng viên — gái Nhật YUI (combini) · gái Việt HẰNG (bạn cùng lớp) ·
//      trai Nhật REN (đầu bếp izakaya) · trai Việt KHÔI (bạn học mới, ấm, khác hẳn anh Tuấn/Đức).
//      Tuyến nam theo đuổi nhóm gái, tuyến nữ nhóm trai — 1 người chính tại một thời điểm
//      (courting). CỜ THIỆN CẢM CHUẨN (lane giai đoạn 8 đọc lại để nối hệ quan hệ/kết đôi):
//        · FLOW.flags()['affection.yui' | 'affection.hang' | 'affection.ren' | 'affection.khoi']
//          = số điểm thiện cảm 0..100 của từng ứng viên (gương từ trạng thái ở đây);
//        · FLOW.flags()['relation.<id>'] = 'quen' | 'ban' (thiện cảm ≥ 20) | 'yeu' (tỏ tình thành);
//        · FLOW.flags()['partner'] = id người yêu hiện tại hoặc null;
//        · FLOW.flags()['lovecare'] / ['breakup'] / ['recovered'] cho arc yêu xa.
//      Ngưỡng: rủ đi chơi ≥ 0 (mất tiền vé+ăn) · rủ về nhà ≥ 35 · tỏ tình thử ≥ 40, thành ≥ 60.
//   4) HẸN HÒ: RỦ ĐI CHƠI (chọn nơi qua bảng giá dựng trên hệ đi lại của life.js: vé + ăn uống
//      trừ qua moneyTxn reason 'date.<nơi>'), RỦ VỀ NHÀ CHƠI (nấu bằng đồ tủ lạnh của market.js,
//      khách về trước tàu cuối — trong thoại của cảnh), TẶNG QUÀ (danh mục mall của style.js,
//      moneyTxn reason 'gift.shop.<itemId>', đúng gu +10 / thường +5), TỎ TÌNH (cảnh theo điểm).
// Trạng thái lưu qua FLOW.getRel/setRel (runtime.rel) + gương localStorage 'tuoitre2d_rel_v1'.
// NGƯỜI YÊU LINH Ở VIỆT NAM: không xuất hiện ở Nhật ở giai đoạn này — arc đoàn tụ/thăm nhau
// dựng trên hệ đi lại là THIẾT KẾ ở KHUNG-GAME §4.10 (chưa làm cảnh).
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var LSKEY = 'tuoitre2d_rel_v1';

  /* ================= ĐĂNG KÝ ỨNG VIÊN ================= */
  var CANDS = {
    yui:  { name: 'Yui',  sub: '🇯🇵 Gái Nhật — nhân viên combini 秋葉原', gender: 'F', route: 'M', sprite: 'heroF', fav: ['jewelry', 'perfume'], meetMap: 'combini', meetScene: null },
    hang: { name: 'Hằng', sub: '🇻🇳 Gái Việt — bạn cùng lớp tiếng',      gender: 'F', route: 'M', sprite: 'heroF', fav: ['cosmetics', 'fashion'], meetMap: 'school', meetScene: 'ch3-hang-vo' },
    ren:  { name: 'Ren',  sub: '🇯🇵 Trai Nhật — đầu bếp quán nhậu 新橋', gender: 'M', route: 'F', sprite: 'heroM', fav: ['fashion'], meetMap: 'izakaya', meetScene: 'ch3-ren-gap' },
    khoi: { name: 'Khôi', sub: '🇻🇳 Trai Việt — bạn học mới, làm kho vận', gender: 'M', route: 'F', sprite: 'heroM', fav: ['fashion', 'cosmetics'], meetMap: 'school', meetScene: 'ch3-khoi-gap' }
  };
  var VENUES = {
    park:       { map: 'park',       yen: 1200, label: '🌳 Công viên 代々木 — picnic & đi dạo' },
    temple:     { map: 'temple',     yen: 1500, label: '🛕 Chùa 鎌倉 — đi dạo & cầu an' },
    karaoke:    { map: 'karaoke',    yen: 2000, label: '🎤 Karaoke 渋谷 — hát và ăn nhẹ' },
    mall:       { map: 'mall',       yen: 2500, label: '🛍️ Trung tâm thương mại 銀座 — mua sắm & cà phê' },
    restaurant: { map: 'restaurant', yen: 3500, label: '🍱 Nhà hàng 築地 — một bữa tối tử tế' }
  };

  /* ================= TRẠNG THÁI ================= */
  function freshState() {
    return {
      v: 1,
      aff: { yui: 0, hang: 0, ren: 0, khoi: 0 },
      met: { yui: false, hang: false, ren: false, khoi: false, hung: false, mai: false },
      stage: { yui: 'quen', hang: 'quen', ren: 'quen', khoi: 'quen' },
      partner: null, courting: null,
      careBase: null, careA: null, careB: null, careC: null, flirted: false,
      beats: { aSent: false, aDone: false, bStarted: false, bDone: false, cStarted: false, cDone: false, resolved: false },
      breakup: null, breakupFired: false, khocDone: false, recovered: false, hoiPhuc: null, tanNguocDone: false,
      gifts: [], dates: 0, homes: 0, ledger: []
    };
  }
  var R = freshState();
  var gender = 'M', beatBChoice = null, logMark = 0, started = false;

  function serialize() { return JSON.parse(JSON.stringify(R)); }
  function persist() {
    if (window.FLOW && window.FLOW.setRel) window.FLOW.setRel(serialize());
    try { localStorage.setItem(LSKEY, JSON.stringify(serialize())); } catch (e) {}
  }
  function loverName() { return gender === 'F' ? 'Hải' : 'Linh'; }
  function flags() { return (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {}; }
  function chapter() { var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {}; return st.chapter || 0; }
  function moneyYen() { return Math.round((window.GAMEUI ? window.GAMEUI.stats().money : 0) * 10000); }
  function yen(n) { return '¥' + n.toLocaleString('en-US'); }
  function moneyTxn(yenDelta, reason, note) {   // CỬA DUY NHẤT đổi tiền của tuyến tình cảm
    if (!yenDelta) return true;
    if (yenDelta < 0 && moneyYen() < -yenDelta) { window.GAMEUI.toast('💴 Không đủ tiền — ví đang có ' + yen(moneyYen()) + ', cần ' + yen(-yenDelta) + '.'); return false; }
    window.GAMEUI.apply({ money: yenDelta / 10000 }, note);
    R.ledger.push({ t: Date.now(), yen: yenDelta, reason: reason });
    if (R.ledger.length > 100) R.ledger = R.ledger.slice(-100);
    persist();
    return true;
  }

  /* ================= THIỆN CẢM (cờ affection.<id>) ================= */
  function addAff(id, n, why) {
    if (!CANDS[id]) return;
    R.aff[id] = Math.max(0, Math.min(100, (R.aff[id] || 0) + n));
    if (R.stage[id] === 'quen' && R.aff[id] >= 20) R.stage[id] = 'ban';   // ≥20 điểm = thành BẠN (lane gđ8 gắn hành động đồng ý lên cùng cờ này)
    if (why) window.GAMEUI.toast('💗 Thiện cảm với ' + CANDS[id].name + ' ' + (n >= 0 ? '+' : '') + n + ' — ' + why);
    persist();
  }
  function setCourting(id) { if (R.courting !== id) { R.courting = id; persist(); } }

  /* ================= ĐIỂM QUAN TÂM YÊU XA ================= */
  function computeCareBase() {
    if (R.careBase !== null) return R.careBase;
    var f = flags(), base = 0;
    if (f.loiHuaSanBay === 'cho-doi') base += 2; else if (f.loiHuaSanBay === 'buong-tay') base -= 2;
    if (f.quaLuuNiem) base += 1;
    if (f.tetDone) base += 1;
    R.careBase = base; persist();
    return base;
  }
  function loveCare() {
    return computeCareBase() + (R.careA || 0) + (R.careB || 0) + (R.careC || 0);
  }
  function arcSkipped() { return flags().loiHuaSanBay === 'buong-tay'; }   // đã buông tay từ sân bay → không còn yêu xa để đổ vỡ

  /* ================= 3 NHỊP ĐẦU CHƯƠNG 3 ================= */
  function deliverBeatA() {
    if (R.beats.aSent || chapter() < 3) return;
    R.beats.aSent = true; persist();
    var ln = loverName();
    setTimeout(function () {
      window.PHONE.receive('lover', [
        ln + ': Sang tháng ba rồi đó. Hôm nay ở quê trời đẹp lắm, tự nhiên mình nhớ cái hôm ở sân bay ghê 🥺',
        ln + ': Dạo này ' + (gender === 'F' ? 'anh' : 'em') + ' bận lắm hả? Mấy tuần nay tin nhắn thưa hẳn… nói thật là mình hơi chạnh lòng.'
      ]);
      window.PHONE.setReplies('lover', [
        { text: 'Xin lỗi nhé, dạo này mình bận thật — nhưng bận mấy thì tối nào mình cũng nghĩ tới người ở nhà đầu tiên đấy 💗', fx: { deltas: { love: 2 }, note: 'Trả lời tin nhắn người yêu đầu Chương 3: ấm áp, nói rõ lòng mình' }, cb: function () { answerBeatA('am'); }, follow: [ln + ': Ừm… nghe câu này là mình hết chạnh lòng rồi. Cố lên nhé, mình vẫn ở đây 💗'] },
        { text: 'Ừ, bên này vào guồng rồi nên bận hơn trước. Ở nhà giữ sức khỏe nhé, có gì mình nhắn sau.', fx: { deltas: { love: 1 }, note: 'Trả lời tin nhắn người yêu đầu Chương 3: thường, hơi vội' }, cb: function () { answerBeatA('thuong'); }, follow: [ln + ': Ừ, mình biết rồi. Giữ sức khỏe nhé…'] },
        { text: '(Đọc rồi — để mai trả lời, giờ mệt quá, ngủ đã.)', fx: { deltas: { pressure: 1 }, note: 'Tin nhắn người yêu đầu Chương 3: đọc rồi bỏ đó' }, cb: function () { answerBeatA('sau'); }, follow: [] }
      ]);
      window.GAMEUI.toast('📱 ' + ln + ' vừa nhắn tin — mở điện thoại đọc và trả lời nhé');
    }, 1500);
  }
  function answerBeatA(kind) {
    if (R.beats.aDone) return;
    R.careA = kind === 'am' ? 2 : kind === 'thuong' ? 1 : -1;
    R.beats.aDone = true; persist();
    setTimeout(function () { advanceStory(); }, 800);
  }
  function deliverBeatB() {
    if (R.beats.bStarted || chapter() < 3) return;
    R.beats.bStarted = true; beatBChoice = null; persist();
    var ln = loverName(), first = true;
    setTimeout(function () {
      var lines = gender === 'F' ? [
        { from: 'them', who: 'Hải', text: 'A lô, em à? Anh đây. Hôm nay anh được nghỉ sớm, tự nhiên muốn nhìn mặt em một cái. Bên đó đang là giờ nào rồi, ăn cơm chưa đấy?' },
        { from: 'them', who: 'Hải', text: 'Mấy nay ở quê có mấy chuyện anh muốn kể: nhà hàng xóm mới cưới, mẹ anh lại hỏi bao giờ tới lượt mình… Anh cười trừ cho qua. Mà em này — thật ra anh gọi vì anh nhớ em, chỉ vậy thôi.' }
      ] : [
        { from: 'them', who: 'Linh', text: 'A lô, anh à? Em đây. Hôm nay em được nghỉ sớm, tự nhiên muốn nhìn mặt anh một cái. Bên đó đang là giờ nào rồi, ăn cơm chưa đấy?' },
        { from: 'them', who: 'Linh', text: 'Mấy nay ở quê có mấy chuyện em muốn kể: nhỏ bạn thân của em mới cưới, mẹ em lại hỏi bao giờ tới lượt mình… Em cười trừ cho qua. Mà anh này — thật ra em gọi vì em nhớ anh, chỉ vậy thôi.' }
      ];
      lines.push({
        prompt: [
          { label: 'Tắt mọi thứ, ngồi nói chuyện đàng hoàng — kể hết chuyện bên này cho người ở nhà nghe', text: 'Đợi mình một chút — để mình tắt TV, ngồi xuống đàng hoàng đã. Hôm nay mình kể hết: chuyện thi cử, chuyện phố xá mùa hoa, cả chuyện mình nhớ nhà thế nào. Nghe nhé…', fx: first ? { deltas: { love: 2, pressure: -1 }, note: 'Cuộc gọi video đầu Chương 3: ngồi nói chuyện đàng hoàng' } : null, cb: function () { beatBChoice = 'tan-tam'; }, reply: { who: ln, text: 'Ừ… nói chuyện thế này mới thấy gần nhau này. Khoảng cách hóa ra cũng không to như mình tưởng — miễn là hai đứa còn chịu ngồi lại với nhau.' } },
          { label: 'Vừa làm việc khác vừa nghe, trả lời qua loa cho xong', text: 'Ừ, kể đi, mình đang nghe đây. (Tay vẫn lướt điện thoại, mắt vẫn xem dở chương trình trên TV…)', fx: first ? { deltas: { pressure: 1 }, note: 'Cuộc gọi video đầu Chương 3: nghe qua loa, làm việc riêng' } : null, cb: function () { beatBChoice = 'lo-dang'; }, reply: { who: ln, text: '…Ừ. Thôi, chắc ' + (gender === 'F' ? 'anh' : 'em') + ' bận. Mình nói chuyện sau vậy. Ngủ sớm nhé.' } }
        ]
      });
      lines.push({ from: 'them', who: ln, text: 'Thôi, khuya rồi, ngủ sớm đi nhé. Nói chuyện được thế này là mình vui rồi. Chào nhé — nhớ giữ gìn sức khỏe đấy.' });
      window.PHONE.startCall({
        name: '💗 ' + ln + ' — cuộc gọi video', ava: '💗', lines: lines,
        onEnd: function () { answerBeatB(); }
      });
    }, 1500);
  }
  function answerBeatB() {
    if (R.beats.bDone) return;
    R.careB = beatBChoice === 'tan-tam' ? 2 : 0;
    R.beats.bDone = true; persist();
    setTimeout(function () { advanceStory(); }, 800);
  }
  function deliverBeatC() {
    if (R.beats.cStarted || chapter() < 3) return;
    R.beats.cStarted = true; persist();
    setTimeout(function () {
      window.GAMEUI.toast('🌙 Tối nay có một cuộc gặp không ngờ ở phía trước…');
      if (window.__demo) window.__demo.scene(gender === 'F' ? 'ch3-cam-do-nu' : 'ch3-cam-do-nam');
    }, 1400);
  }
  function finishBeatC() {
    var lg = window.GAMEUI.log(), note = '';
    for (var i = lg.length - 1; i >= 0; i--) { if ((lg[i].note || '').indexOf('Điểm cám dỗ Ch3:') === 0) { note = lg[i].note; break; } }
    if (note.indexOf('đã tiến tới') >= 0) { R.flirted = true; R.careC = -3; }
    else { R.careC = 1; }
    R.beats.cDone = true; persist();
    setTimeout(function () { advanceStory(); }, 800);
  }

  /* ================= GIẢI QUYẾT ARC + HỒI PHỤC ================= */
  function resolveArc() {
    if (R.beats.resolved) return;
    R.beats.resolved = true;
    if (arcSkipped()) { R.recovered = true; persist(); return; }
    if (R.flirted) R.breakup = 'cam-sung';
    else if (loveCare() >= 5) R.breakup = 'giu-duoc';
    else R.breakup = 'bi-da';
    persist();
    var g = gender === 'F' ? 'nu' : 'nam';
    setTimeout(function () {
      if (R.breakup === 'cam-sung') {
        window.PHONE.receive('ban-be', ['Trang (bạn chung): Tao suy nghĩ mãi mới quyết định gửi. Mày xem đi… rồi bình tĩnh gọi hỏi cho rõ ràng. Tao xin lỗi vì là người báo tin này.']);
        window.GAMEUI.toast('📱 Có tin nhắn lạ từ Trang — bạn chung của hai đứa…');
        setTimeout(function () { if (window.__demo) window.__demo.scene('ch3-camsung-' + g); R.breakupFired = true; persist(); }, 2600);
      } else if (R.breakup === 'bi-da') {
        window.GAMEUI.toast('📱 Nửa đêm rồi mà điện thoại vẫn rung — là ' + loverName() + ' gọi…');
        setTimeout(function () { if (window.__demo) window.__demo.scene('ch3-davut-' + g); R.breakupFired = true; persist(); }, 1800);
      } else {
        window.GAMEUI.toast('📱 ' + loverName() + ' gọi video lúc nửa đêm — giọng nghe khác mọi lần…');
        setTimeout(function () { if (window.__demo) window.__demo.scene('ch3-giu-duoc-' + g); R.breakupFired = true; persist(); }, 1800);
      }
    }, 1200);
  }
  function afterBreakupScene() {
    setTimeout(function () {
      window.GAMEUI.toast('🌧 Về phòng trọ thôi… tối nay, cứ khóc cho hết đã.');
      if (window.__demo) window.__demo.scene('ch3-khoc');
    }, 1300);
  }
  function afterKhocScene() {
    R.khocDone = true; persist();
    setTimeout(function () { if (window.__demo) window.__demo.scene('ch3-hoi-phuc'); }, 1300);
  }
  function afterHoiPhucScene() {
    var lg = window.GAMEUI.log();
    for (var i = lg.length - 1; i >= 0; i--) {
      var n = lg[i].note || '';
      if (n.indexOf('Cách gượng dậy:') === 0) {
        R.hoiPhuc = n.indexOf('vùi đầu') >= 0 ? 'hoc' : n.indexOf('nhậu') >= 0 ? 'nhau' : 'gia-dinh';
        break;
      }
    }
    R.recovered = true; persist();
    if (R.hoiPhuc === 'nhau') window.GAMEUI.toast('🍺 Chị Mai đã nói rồi đấy — uống để quên chỉ quên được một đêm. Từ mai, sống tử tế lại nhé.');
  }
  function deliverTanNguoc() {
    if (R.tanNguocDone || !R.recovered || R.breakup === 'giu-duoc' || arcSkipped()) return;
    R.tanNguocDone = true; persist();
    setTimeout(function () { if (window.__demo) window.__demo.scene(gender === 'F' ? 'ch3-tan-nguoc-nu' : 'ch3-tan-nguoc-nam'); }, 1500);
  }
  function afterTanNguocScene() {
    var id = gender === 'F' ? 'khoi' : 'hang';
    var lg = window.GAMEUI.log();
    for (var i = lg.length - 1; i >= 0; i--) {
      var n = lg[i].note || '';
      if (n.indexOf('Được tán ngược') === 0) { if (n.indexOf('để ngỏ') >= 0) { addAff(id, 10, 'người ấy đã chủ động mở lời'); setCourting(id); } break; }
    }
  }
  function advanceStory() {   // máy nhịp của arc: A → B → C → giải quyết
    if (chapter() < 3 || R.beats.resolved) return;
    if (!R.beats.aDone) { deliverBeatA(); return; }
    if (!R.beats.bDone) { deliverBeatB(); return; }
    if (!R.beats.cDone) { deliverBeatC(); return; }
    resolveArc();
  }

  /* ================= NGƯỜI ĐI THEO (đi chơi cùng nhau) ================= */
  var compTimer = null, trail = [];
  function startFollower(id) {
    stopFollower();
    var c = CANDS[id]; if (!c) return;
    trail = [];
    compTimer = setInterval(function () {
      var snap = window.WORLD2D.snapshot();
      if (!snap.player) return;
      trail.push({ map: snap.map, x: snap.player.x, y: snap.player.y, dir: snap.player.dir });
      if (trail.length > 6) trail.shift();
      var lag = trail[0];
      if (lag && lag.map === snap.map) window.WORLD2D.setRemote('rel-companion', { map: lag.map, name: c.name, sprite: c.sprite, x: lag.x, y: lag.y, dir: lag.dir });
    }, 280);
  }
  function stopFollower() {
    if (compTimer) clearInterval(compTimer); compTimer = null;
    if (window.WORLD2D) window.WORLD2D.removeRemote('rel-companion');
  }

  /* ================= HẸN HÒ (giai đoạn 7) ================= */
  function romanceOpen() {   // tình mới chỉ mở sau khi arc yêu xa đã ngã ngũ (hoặc đã buông tay từ sân bay)
    if (chapter() < 3) return { ok: false, why: 'chapter', msg: 'Tuyến tình cảm ở Nhật mở ở Chương 3.' };
    if (arcSkipped()) return { ok: true };
    if (!R.beats.resolved) return { ok: false, why: 'arc', msg: 'Chuyện với người yêu ở quê chưa ngã ngũ — giải quyết dứt điểm trước đã.' };
    if (R.breakup === 'giu-duoc') return { ok: false, why: 'lover', msg: loverName() + ' vẫn đang đợi ở quê — còn người yêu thì không tán người mới được.' };
    if (!R.recovered) return { ok: false, why: 'recovery', msg: 'Lòng chưa lành — qua hết chuỗi hồi phục đã, đừng vội.' };
    return { ok: true };
  }
  function startDate(id, venueId) {
    var gate = romanceOpen(); if (!gate.ok) { window.GAMEUI.toast('💗 ' + gate.msg); return gate; }
    var v = VENUES[venueId]; if (!v || !CANDS[id]) return { ok: false, why: 'input' };
    if (!moneyTxn(-v.yen, 'date.' + venueId, 'Rủ ' + CANDS[id].name + ' đi chơi — ' + v.label + ' — ' + yen(v.yen) + ' (vé + ăn uống)')) return { ok: false, why: 'money' };
    setCourting(id);
    logMark = window.GAMEUI.log().length;
    closePanel();
    window.WORLD2D.gotoMap(v.map);
    startFollower(id);
    R.dates++; persist();
    setTimeout(function () { if (window.__demo) window.__demo.scene('hen-' + id); }, 900);
    return { ok: true };
  }
  function afterDateScene(id) {
    stopFollower();
    var pts = scanScore('Điểm buổi hẹn:');
    addAff(id, pts, 'sau buổi đi chơi');
  }
  function startHome(id) {
    var gate = romanceOpen(); if (!gate.ok) { window.GAMEUI.toast('💗 ' + gate.msg); return gate; }
    if (!CANDS[id]) return { ok: false, why: 'input' };
    if ((R.aff[id] || 0) < 35) { window.GAMEUI.toast('🏠 Rủ về nhà chơi cần thân nhau hơn nữa (thiện cảm ≥ 35) — giờ đang là ' + (R.aff[id] || 0) + '. Đi chơi với nhau thêm vài buổi đã.'); return { ok: false, why: 'aff' }; }
    setCourting(id);
    var bonus = 0;
    var stock = (window.MARKET && window.MARKET.stock) ? window.MARKET.stock() : {};
    var mealId = Object.keys(stock).find(function (k) { var it = (window.MARKET.catalog() || []).find(function (x) { return x.id === k; }); return it && it.fx === 'meal'; });
    if (mealId) { window.MARKET.consume(mealId); bonus = 6; window.GAMEUI.toast('🎒 Nấu bằng đồ ngon mang từ siêu thị về — bữa cơm ở phòng trọ hôm nay ra trò hẳn!'); }
    else window.GAMEUI.toast('🏠 Tủ lạnh hơi trống — bữa này nấu đơn giản thôi. Lần sau đi siêu thị mua đồ trước nhé.');
    logMark = window.GAMEUI.log().length;
    closePanel();
    window.WORLD2D.gotoMap('room');
    startFollower(id);
    R.homes++; persist();
    if (bonus) addAff(id, bonus, 'bữa cơm nấu bằng đồ tủ lạnh ngon');
    setTimeout(function () { if (window.__demo) window.__demo.scene('ve-nha-' + id); }, 900);
    return { ok: true };
  }
  function afterHomeScene(id) {
    stopFollower();
    addAff(id, scanScore('Điểm rủ về nhà:'), 'sau buổi về nhà chơi');
  }
  function scanScore(prefix) {
    var lg = window.GAMEUI.log();
    for (var i = lg.length - 1; i >= Math.max(0, logMark); i--) {
      var n = lg[i].note || '';
      if (n.indexOf(prefix) === 0) return n.indexOf('trọn vẹn') >= 0 ? 12 : n.indexOf('ổn') >= 0 ? 7 : 2;
    }
    return 5;
  }
  function buyGift(id, itemId) {
    var gate = romanceOpen(); if (!gate.ok) { window.GAMEUI.toast('💗 ' + gate.msg); return gate; }
    var cat = (window.STYLE && window.STYLE.catalog) ? window.STYLE.catalog() : [];
    var it = cat.find(function (x) { return x.id === itemId; });
    if (!it || !CANDS[id]) return { ok: false, why: 'input' };
    if (!moneyTxn(-it.price, 'gift.shop.' + it.id, 'Mua quà tặng ' + CANDS[id].name + ': ' + it.name + ' — ' + yen(it.price))) return { ok: false, why: 'money' };
    var fav = CANDS[id].fav.indexOf(it.counter) >= 0;
    R.gifts.push({ to: id, itemId: it.id, name: it.name, yen: it.price, at: Date.now() });
    setCourting(id);
    addAff(id, fav ? 10 : 5, fav ? 'tặng đúng gu của ' + CANDS[id].name : 'có quà tặng kèm theo tấm lòng');
    persist();
    return { ok: true, fav: fav };
  }
  function confess(id) {
    var gate = romanceOpen(); if (!gate.ok) { window.GAMEUI.toast('💗 ' + gate.msg); return gate; }
    if (!CANDS[id] || R.partner) return { ok: false, why: 'input' };
    if (R.courting !== id) { window.GAMEUI.toast('💌 Hãy theo đuổi ' + CANDS[id].name + ' một cách rõ ràng trước (đi chơi / về nhà chơi / tặng quà) rồi hãy tỏ tình.'); return { ok: false, why: 'courting' }; }
    var a = R.aff[id] || 0;
    closePanel();
    if (a >= 60) { setTimeout(function () { if (window.__demo) window.__demo.scene('to-tinh-' + id); }, 500); return { ok: true, will: 'ok' }; }
    if (a >= 40) { setTimeout(function () { if (window.__demo) window.__demo.scene('to-tinh-loi'); }, 500); return { ok: true, will: 'fail' }; }
    window.GAMEUI.toast('💌 Thiện cảm mới ' + a + '/100 — nói ra lúc này chắc chắn bị từ chối. Đi chơi với nhau thêm đã.');
    return { ok: false, why: 'aff' };
  }
  function afterConfessOk(id) {
    R.stage[id] = 'yeu'; R.partner = id;
    addAff(id, 5, 'tỏ tình thành công');
    window.GAMEUI.toast('💑 ' + CANDS[id].name + ' đã đồng ý — từ hôm nay hai người là NGƯỜI YÊU! (Cờ relation.' + id + ' = yeu)');
    persist();
  }

  /* ================= GẮN VÀO CẢNH CÓ SẴN (thiện cảm từ đời sống) ================= */
  var SCENE_AFF = { 'combini': ['yui', 3], 'ch2-yui': ['yui', 8], 'ch3-hang-vo': ['hang', 6], 'ch3-ren-gap': ['ren', 6], 'ch3-khoi-gap': ['khoi', 6] };
  var SCENE_MET = { 'hung': 'hung', 'kaigo-mai': 'mai', 'combini': 'yui', 'school-teacher': 'hang', 'ch3-hang-vo': 'hang', 'ch3-ren-gap': 'ren', 'ch3-khoi-gap': 'khoi' };
  function onSceneEnd(id) {
    if (SCENE_MET[id] && !R.met[SCENE_MET[id]]) { R.met[SCENE_MET[id]] = true; persist(); }
    if (SCENE_AFF[id]) addAff(SCENE_AFF[id][0], SCENE_AFF[id][1], 'qua những lần gặp gỡ');
    if (chapter() >= 3) {
      if (id === 'ch3-cam-do-nam' || id === 'ch3-cam-do-nu') { finishBeatC(); return; }
      if (R.beats.resolved && !R.breakupFired) return;
      advanceStory();
    }
    if ((id === 'ch3-davut-nam' || id === 'ch3-davut-nu' || id === 'ch3-camsung-nam' || id === 'ch3-camsung-nu') && !R.khocDone) afterBreakupScene();
    else if (id === 'ch3-khoc' && !R.recovered) afterKhocScene();
    else if (id === 'ch3-hoi-phuc' && !R.recovered) { afterHoiPhucScene(); setTimeout(deliverTanNguoc, 2500); }
    else if (id === 'ch3-tan-nguoc-nam' || id === 'ch3-tan-nguoc-nu') afterTanNguocScene();
    else if (id.indexOf('hen-') === 0) afterDateScene(id.slice(4));
    else if (id.indexOf('ve-nha-') === 0) afterHomeScene(id.slice(7));
    else if (id.indexOf('to-tinh-') === 0 && id !== 'to-tinh-loi') afterConfessOk(id.slice(8));
    else if (id === 'to-tinh-loi' && R.courting) { addAff(R.courting, -5, 'tỏ tình chưa đúng lúc'); }
  }

  /* ================= MỤC TIÊU MẠCH (story.js gọi qua advanceObjective) ================= */
  function objective() {
    if (chapter() < 3) return false;
    if (arcSkipped()) {
      window.GAMEUI.setObjective(R.partner ? '💑 Chương 3 — đã có người yêu mới ở Nhật. Những lựa chọn lớn của «Ngã rẽ» vẫn đang chờ ở phía trước' : '🌸 Chương 3 «Ngã rẽ» — chuyện ở quê đã buông tay từ sân bay. Mở mục 💗 Tình cảm (cạnh nút điện thoại) để làm quen những người ở Nhật');
      return true;
    }
    if (!R.beats.resolved) {
      window.GAMEUI.setObjective(!R.beats.aDone ? '🌸 Chương 3 — 📱 ' + loverName() + ' vừa nhắn tin — mở ĐIỆN THOẠI trả lời người yêu ở quê' : !R.beats.bDone ? '🌸 Chương 3 — 📞 ' + loverName() + ' sắp gọi video — để ý điện thoại nhé' : '🌸 Chương 3 — 🌙 Tối nay ở Nhật có một cuộc gặp không ngờ đang chờ…');
      return true;
    }
    if (R.breakup === 'giu-duoc') { window.GAMEUI.setObjective('🌸 Chương 3 — 💗 ' + loverName() + ' vẫn đợi ở quê — hai người đã đặt mốc rõ ràng với nhau. Chương 3 còn những lựa chọn lớn khác đang chờ'); return true; }
    if (R.breakup && !R.khocDone) { window.GAMEUI.setObjective('🌸 Chương 3 — 🌧 Một mình trong phòng trọ tối nay… cứ khóc cho hết đã'); return true; }
    if (R.breakup && !R.recovered) { window.GAMEUI.setObjective('🌸 Chương 3 — 🌤 Bạn bè đang ở bên — chọn một cách để gượng dậy'); return true; }
    if (R.partner) { window.GAMEUI.setObjective('💑 Chương 3 — đã có ' + CANDS[R.partner].name + ' ở bên. Những lựa chọn lớn của «Ngã rẽ» vẫn đang chờ'); return true; }
    window.GAMEUI.setObjective('🌸 Chương 3 — 💗 Lòng đã lành dần — mở mục 💗 Tình cảm (cạnh nút điện thoại): ở Nhật này có những người đang chờ được làm quen');
    return true;
  }

  /* ================= BẢNG ĐIỀU KHIỂN TÌNH CẢM (mở từ nút 💗 cạnh điện thoại) ================= */
  var panel = null, giftFor = null;
  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function ensurePanel() {
    if (panel) return;
    panel = document.createElement('div');
    panel.className = 'modal'; panel.id = 'modal-rel';
    panel.innerHTML = '<div class="modal-card" id="rel-card"></div>';
    document.body.appendChild(panel);
  }
  function closePanel() { if (panel) panel.classList.remove('show'); giftFor = null; }
  function stageLabel(id) {
    if (R.partner === id) return '💑 Người yêu';
    return { quen: 'Người quen', ban: '🤝 Bạn bè', yeu: '💑 Người yêu' }[R.stage[id]] || 'Người quen';
  }
  function openPanel() {
    ensurePanel();
    var card = $('rel-card'); card.innerHTML = '';
    card.appendChild(h('h3', null, '💗 Tình cảm — những người quanh bạn'));
    var ln = loverName();
    var arc = arcSkipped() ? 'Đã buông tay từ sân bay — không còn yêu xa.'
      : !R.beats.resolved ? 'Yêu xa với ' + ln + ' ở quê: đang ở những nhịp quyết định (điểm quan tâm: ' + loveCare() + ').'
      : R.breakup === 'giu-duoc' ? ln + ' vẫn đợi ở quê — hai người đã đặt mốc rõ ràng. 💗'
      : R.breakup ? 'Đã chia tay với ' + ln + ' (' + (R.breakup === 'cam-sung' ? 'phát hiện người thứ ba' : 'người ở quê buông tay') + ')' + (R.recovered ? ' — đã gượng dậy.' : ' — đang hồi phục.')
      : 'Yêu xa với ' + ln + '.';
    card.appendChild(h('div', 'sub', arc));
    var gate = romanceOpen();
    Object.keys(CANDS).filter(function (id) { return CANDS[id].route === gender; }).forEach(function (id) {
      var c = CANDS[id], a = R.aff[id] || 0;
      var box = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', c.name + ' — ' + stageLabel(id) + (R.courting === id && !R.partner ? ' · 💘 đang theo đuổi' : '')));
      info.appendChild(h('div', 'shop-jp', c.sub));
      info.appendChild(h('div', 'shop-jp', 'Thiện cảm: ' + a + '/100 ' + '💗'.repeat(Math.round(a / 20)) + ' (cờ affection.' + id + ')'));
      box.appendChild(info);
      var acts = h('div', 'btnrow');
      if (!R.met[id] && c.meetScene) {
        var meet = h('button', 'btn primary', 'Gặp gỡ làm quen'); meet.type = 'button';
        meet.addEventListener('click', function () { closePanel(); window.WORLD2D.gotoMap(c.meetMap); setTimeout(function () { if (window.__demo) window.__demo.scene(c.meetScene); }, 900); });
        acts.appendChild(meet);
      } else if (!gate.ok) {
        acts.appendChild(h('div', 'shop-jp', '🔒 ' + gate.msg));
      } else {
        var d = h('button', 'btn primary', '🎡 Rủ đi chơi'); d.type = 'button';
        d.addEventListener('click', function () { renderVenues(id); });
        acts.appendChild(d);
        var hm = h('button', 'btn ghost', '🏠 Rủ về nhà' + (a < 35 ? ' (cần 35💗)' : '')); hm.type = 'button';
        hm.addEventListener('click', function () { startHome(id); });
        acts.appendChild(hm);
        var gf = h('button', 'btn ghost', '🎁 Tặng quà'); gf.type = 'button';
        gf.addEventListener('click', function () { renderGifts(id); });
        acts.appendChild(gf);
        if (!R.partner) {
          var cf = h('button', 'btn ghost', '💌 Tỏ tình' + (a < 40 ? ' (cần 40💗)' : '')); cf.type = 'button';
          cf.addEventListener('click', function () { confess(id); });
          acts.appendChild(cf);
        }
      }
      box.appendChild(acts);
      card.appendChild(box);
    });
    if (giftFor) renderGiftList(card);
    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn primary', 'Đóng'); done.type = 'button';
    done.addEventListener('click', closePanel);
    btnrow.appendChild(done); card.appendChild(btnrow);
    panel.classList.add('show');
  }
  function renderVenues(id) {
    var card = $('rel-card'); if (!card) return;
    var sec = h('div', 'style-sec');
    sec.appendChild(h('div', 'style-sec-t', '🎡 Rủ ' + CANDS[id].name + ' đi đâu? (vé + ăn uống tính một lượt)'));
    Object.keys(VENUES).forEach(function (k) {
      var v = VENUES[k];
      var b = h('button', 'btn ghost', v.label + ' — ' + yen(v.yen)); b.type = 'button';
      b.addEventListener('click', function () { startDate(id, k); });
      sec.appendChild(b);
    });
    card.appendChild(sec);
    card.scrollTop = card.scrollHeight;
  }
  function renderGifts(id) { giftFor = id; openPanel(); }
  function renderGiftList(card) {
    var id = giftFor, cat = (window.STYLE && window.STYLE.catalog) ? window.STYLE.catalog() : [];
    var lvl = (window.STYLE && window.STYLE.level) ? window.STYLE.level() : 1;
    var sec = h('div', 'style-sec');
    sec.appendChild(h('div', 'style-sec-t', '🎁 Chọn quà cho ' + CANDS[id].name + ' (gu của người ấy: ' + CANDS[id].fav.map(function (c) { return { fashion: 'thời trang', jewelry: 'trang sức', cosmetics: 'mỹ phẩm', perfume: 'nước hoa' }[c] || c; }).join(', ') + ' — tặng đúng gu +10💗)'));
    cat.filter(function (it) { return (it.req || 1) <= lvl; }).forEach(function (it) {
      var row = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', (it.emoji || '🎁') + ' ' + it.name));
      info.appendChild(h('div', 'shop-price', yen(it.price)));
      row.appendChild(info);
      var b = h('button', 'btn primary', 'Mua tặng'); b.type = 'button';
      b.addEventListener('click', function () { if (buyGift(id, it.id).ok) openPanel(); });
      row.appendChild(b);
      sec.appendChild(row);
    });
    card.appendChild(sec);
  }

  /* ================= KHỞI ĐỘNG ================= */
  function onGameStart(player) {
    gender = player && player.gender === 'F' ? 'F' : 'M';
    var d = null;
    if (window.FLOW && window.FLOW.getRel) d = window.FLOW.getRel();
    if (!d) { try { d = JSON.parse(localStorage.getItem(LSKEY)); } catch (e) {} }
    if (d && typeof d === 'object') { var f = freshState(); Object.keys(f).forEach(function (k) { if (d[k] !== undefined) f[k] = d[k]; }); R = f; }
    if (window.PHONE && window.PHONE.addThread) window.PHONE.addThread('ban-be', { name: '👥 Bạn bè', ava: '👥' });
    if (window.PHONE && window.PHONE.setThreadName && gender === 'F') window.PHONE.setThreadName('lover', '💗 Hải');
    if (!started) {
      started = true;
      var anchor = $('btn-phone');
      if (anchor && anchor.parentNode) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'hud-btn'; b.id = 'btn-rel'; b.setAttribute('aria-label', 'Tình cảm');
        b.textContent = '💗';
        b.addEventListener('click', openPanel);
        anchor.parentNode.insertBefore(b, anchor.nextSibling);
      }
    }
    if (chapter() >= 3) { computeCareBase(); setTimeout(function () { advanceStory(); }, 2500); }
    persist();
  }

  window.REL = {
    onGameStart: onGameStart, onSceneEnd: onSceneEnd, objective: objective,
    state: function () { return serialize(); },
    loveCare: loveCare, addAff: addAff,
    answerBeatA: answerBeatA, answerBeatB: answerBeatB, resolveArc: resolveArc,
    startDate: startDate, startHome: startHome, buyGift: buyGift, confess: confess,
    openPanel: openPanel, closePanel: closePanel,
    candidates: function () { return JSON.parse(JSON.stringify(CANDS)); },
    venues: function () { return JSON.parse(JSON.stringify(VENUES)); },
    ledger: function () { return JSON.parse(JSON.stringify(R.ledger)); }
  };
})();
