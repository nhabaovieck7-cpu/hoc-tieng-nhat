// relations.js — HỆ QUAN HỆ CÓ ĐỒNG Ý + RỦ NHAU ĐI CHƠI (GIAI ĐOẠN 8 — lane E,
// lệnh chủ trang 14:08 JST 31/10/2026). Dựng TRÊN máy tình cảm của rel.js (giai đoạn 7):
//   · Thiện cảm của 4 ỨNG VIÊN đọc từ cờ chuẩn của rel.js (FLOW.flags()['affection.<id>']
//     / REL.state().aff) — relations KHÔNG giữ bản sao, chỉ cộng thêm qua REL.addAff.
//   · rel.js tự nâng relation.<id> lên 'ban' khi thiện cảm ≥ 20 — giai đoạn 8 gắn HÀNH
//     ĐỘNG ĐỒNG Ý lên đúng ngưỡng đó: người chơi phải bấm "Kết bạn" và NPC đồng ý qua
//     cảnh be-ban-<id> thì quan hệ mới thành BẠN ở tầng đồng ý (stage8). NPC thường
//     (Hùng, chị Mai — không phải ứng viên) dừng ở mức bạn: không tỏ tình/kết đôi được.
//   · KẾT ĐÔI: ứng viên đã là NGƯỜI YÊU (REL.state().partner) + thiện cảm ≥ 60 → cảnh
//     xác nhận ket-doi-<id> → CẶP ĐÔI chính thức (stage8 'doi'): hiện ở hồ sơ/điện thoại,
//     lưu ngày kỷ niệm + nhắc qua điện thoại, mở khoá ÁO ĐÔI ở buổi đi cửa hàng.
//   · RỦ NHAU ĐI CHƠI (bạn trở lên mới rủ được; sprite đi theo sau người chơi): karaoke
//     (cảnh karaoke-doi) · công viên (cong-vien-doi) · CÁC CỬA HÀNG ở mall (người đi
//     cùng THỬ ĐỒ từ danh mục của style.js, HỎI Ý KIẾN, MUA TẶNG tại chỗ qua moneyTxn
//     reason 'gift.<quầy>.<itemId>'; thiện cảm cao thì họ TẶNG LẠI một món nhỏ vào tủ
//     đồ người chơi). Chi phí buổi đi chơi qua moneyTxn reason 'outing.<loại>'.
// Trạng thái của TẦNG ĐỒNG Ý lưu riêng ở localStorage 'tuoitre2d_relations_v1'
// (runtime.rel thuộc về rel.js của giai đoạn 7 — không ghi đè lên nhau; tiền vẫn qua
// GAMEUI như mọi hệ). Thoại mọi cảnh lấy từ scenes-j.js (gói goi-tinh-cam-quan-he
// v1.8.0) — file này chỉ là máy trạng thái + giao diện. Thiết kế: KHUNG-GAME §4.12.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var LSKEY = 'tuoitre2d_relations_v1';

  var PEOPLE8 = {
    hung: { name: 'Hùng "sẹo"', short: 'Hùng', ava: '🧑', sprite: 'heroM', candidate: false, thread: 'ban-hung',
      spec: { skin: '#e0aa7d', hair: '#26221f', hairStyle: 'short', shirt: '#7a4a3a', pants: '#3f4652', skirt: false },
      friendScene: 'be-ban-hung', metScenes: ['hung'],
      refuse: '"Ê, anh em mình mới quen — thân thiết là phải có thời gian. Cứ đi làm, đi nhậu với nhau vài bữa nữa đã!" — Hùng cười xòa, không giận, chỉ là chưa tới lúc.' },
    yui: { name: 'Yui', short: 'Yui', ava: '👩', sprite: 'heroF', candidate: true, route: 'M', nat: '🇯🇵 Người Nhật — nhân viên combini', thread: 'ban-yui',
      spec: { skin: '#f6cba6', hair: '#5a3a26', hairStyle: 'pony', shirt: '#d96a86', pants: '#7a4a63', skirt: true },
      friendScene: 'be-ban-yui', coupleScene: 'ket-doi-yui', metScenes: ['combini', 'ch2-yui', 'ch3-cam-do-nam'],
      refuse: 'Yui cúi đầu, hơi đỏ mặt: "Xin lỗi… mình mới chỉ quen nhau ở quầy thu ngân thôi. Cho mình thêm thời gian được không?" — cô ấy không từ chối bạn, chỉ là chưa sẵn sàng.' },
    hang: { name: 'Hằng', short: 'Hằng', ava: '👩‍🎓', sprite: 'heroF', candidate: true, route: 'M', nat: '🇻🇳 Người Việt — bạn cùng lớp tiếng', thread: 'ban-hang',
      spec: { skin: '#f2c49b', hair: '#26221f', hairStyle: 'long', shirt: '#39a05a', pants: '#46536b', skirt: false },
      friendScene: 'be-ban-hang', coupleScene: 'ket-doi-hang', metScenes: ['ch3-hang-vo'],
      refuse: 'Hằng cười nhẹ: "Mình quý bạn, nhưng kết bạn đàng hoàng thì phải hiểu nhau thêm chút nữa đã. Cứ học chung, đi chơi chung vài buổi nữa nhé."' },
    mai: { name: 'Chị Mai', short: 'Chị Mai', ava: '👩‍⚕️', sprite: 'staffF', candidate: false, thread: 'ban-mai',
      spec: { skin: '#f6cba6', hair: '#3a2a20', hairStyle: 'pony', shirt: '#b03a48', pants: '#3f4652', skirt: false, apron: true },
      friendScene: 'be-ban-mai', metScenes: ['kaigo-mai'],
      refuse: 'Chị Mai điềm đạm: "Làm chung với nhau thêm một thời gian nữa, chị em mình tự khắc thân. Đừng vội, em."' },
    ren: { name: 'Ren', short: 'Ren', ava: '👨‍🍳', sprite: 'heroM', candidate: true, route: 'F', nat: '🇯🇵 Người Nhật — đầu bếp izakaya', thread: 'ban-ren',
      spec: { skin: '#f2c49b', hair: '#26221f', hairStyle: 'short', shirt: '#f4f1ea', pants: '#33373c', skirt: false },
      friendScene: 'be-ban-ren', coupleScene: 'ket-doi-ren', metScenes: ['ch3-ren-gap', 'ch3-cam-do-nu'],
      refuse: 'Ren gãi đầu, nói nhỏ: "Tôi… ít bạn, nên hơi chậm trong mấy chuyện này. Cho tôi thêm thời gian, được không?" — không phải từ chối, chỉ là người ít nói cần lâu hơn để mở lòng.' },
    khoi: { name: 'Khôi', short: 'Khôi', ava: '🧑‍🎓', sprite: 'heroM', candidate: true, route: 'F', nat: '🇻🇳 Người Việt — bạn học, làm kho vận', thread: 'ban-khoi',
      spec: { skin: '#e0aa7d', hair: '#26221f', hairStyle: 'short', shirt: '#3d7be0', pants: '#33507e', skirt: false },
      friendScene: 'be-ban-khoi', coupleScene: 'ket-doi-khoi', metScenes: ['ch3-khoi-gap'],
      refuse: 'Khôi cười hiền: "Mình quý bạn lắm, nhưng bạn bè đàng hoàng thì phải qua lại thêm vài buổi nữa mới chắc. Mình cứ từ từ nhé."' }
  };
  var ORDER8 = ['hung', 'yui', 'hang', 'mai', 'ren', 'khoi'];
  var STAGE_LABEL = { quen: '👋 Người quen', ban: '💚 Bạn bè', yeu: '💗 Người yêu', doi: '💑 Cặp đôi' };
  var BEFRIEND_AFF = 20;      // khớp ngưỡng relation.<id>='ban' của §4.10
  var COUPLE_AFF = 60;        // khớp ngưỡng tỏ tình thành của §4.10
  var COST8 = { karaoke: 2400, park: 600, mall: 900 };
  var COUPLE_ITEM = 'ao-somi-xanh';

  /* ================= TRẠNG THÁI TẦNG ĐỒNG Ý ================= */
  function fresh8() {
    return { stage8: { hung: 'quen', yui: 'quen', hang: 'quen', mai: 'quen', ren: 'quen', khoi: 'quen' },
      aff8: { hung: 0, mai: 0 },               // thiện cảm riêng cho NPC thường (ứng viên dùng cờ của rel.js)
      met8: { hung: false, yui: false, hang: false, mai: false, ren: false, khoi: false },
      gifts8: { hung: [], yui: [], hang: [], mai: [], ren: [], khoi: [] },
      partner8: null, coupleSince: '', anniversary: '', annivMsgDay: '',
      topics: {}, topicSeen: {}, refusedAt: {}, grants: [], ledger: [] };
  }
  var R8 = fresh8();
  function persist8() { try { localStorage.setItem(LSKEY, JSON.stringify(R8)); } catch (e) {} }
  try {
    var saved8 = JSON.parse(localStorage.getItem(LSKEY));
    if (saved8 && typeof saved8 === 'object') { var f8 = fresh8(); Object.keys(f8).forEach(function (k) { if (saved8[k] !== undefined) f8[k] = saved8[k]; }); R8 = f8; }
  } catch (e) {}

  function relState() { return (window.REL && window.REL.state) ? window.REL.state() : null; }
  function isMet(id) {
    if (R8.met8[id]) return true;
    var s = relState();
    return !!(s && s.met && s.met[id]);
  }
  function affection(id) {
    if (PEOPLE8[id].candidate) { var s = relState(); return s ? (s.aff[id] || 0) : 0; }
    return R8.aff8[id] || 0;
  }
  function addAffection(id, n) {
    if (!n) return;
    if (PEOPLE8[id].candidate) { if (window.REL && window.REL.addAff) window.REL.addAff(id, n); }
    else { R8.aff8[id] = Math.max(0, Math.min(100, (R8.aff8[id] || 0) + n)); persist8(); }
  }
  function dispStage(id) {
    if (R8.stage8[id] === 'doi') return 'doi';
    var s = relState();
    if (s && s.partner === id) return 'yeu';
    return R8.stage8[id];   // 'quen' | 'ban'
  }
  function moneyYen() { return Math.round((window.GAMEUI ? window.GAMEUI.stats().money : 0) * 10000); }
  function yen(n) { return '¥' + n.toLocaleString('en-US'); }
  function moneyTxn8(yenDelta, reason, note) {
    if (!yenDelta) return true;
    if (yenDelta < 0 && moneyYen() < -yenDelta) { window.GAMEUI.toast('💴 Không đủ tiền: cần ' + yen(-yenDelta) + ', ví đang có ' + yen(moneyYen()) + '.'); return false; }
    window.GAMEUI.apply({ money: yenDelta / 10000 }, note);
    R8.ledger.push({ t: Date.now(), yen: yenDelta, reason: reason });
    if (R8.ledger.length > 100) R8.ledger = R8.ledger.slice(-100);
    persist8();
    return true;
  }
  function sceneExists(id) { return !!(window.DEMO_DATA && window.DEMO_DATA[id]); }
  function playScene(id) { if (window.__demo) window.__demo.scene(id); }

  /* ================= KẾT BẠN CÓ ĐỒNG Ý ================= */
  var pending8 = null;   // {kind:'befriend'|'couple', npc}
  function befriend(id) {
    var p = PEOPLE8[id]; if (!p) return false;
    if (dispStage(id) !== 'quen') { window.GAMEUI.toast('💚 ' + p.short + ' đang là ' + STAGE_LABEL[dispStage(id)] + ' rồi.'); return false; }
    if (!isMet(id)) { window.GAMEUI.toast('👋 Hãy gặp và nói chuyện với ' + p.short + ' trong truyện trước đã — kết bạn là chuyện của hai người đã quen nhau.'); return false; }
    if (affection(id) < BEFRIEND_AFF) {
      window.GAMEUI.toast(p.refuse, 4800);
      R8.refusedAt[id] = affection(id); persist8();
      return false;
    }
    if (sceneExists(p.friendScene)) { pending8 = { kind: 'befriend', npc: id }; playScene(p.friendScene); }
    else finishBefriend(id);
    return true;
  }
  function finishBefriend(id) {
    var p = PEOPLE8[id];
    R8.stage8[id] = 'ban';
    if (window.PHONE && window.PHONE.addThread) {
      window.PHONE.addThread(p.thread, { name: '💚 ' + p.name, ava: p.ava });
      window.PHONE.receive(p.thread, [p.short + ': Từ nay có chuyện gì cứ nhắn mình nhé!']);
    }
    R8.topics[id] = 0; setTopic(id);
    window.GAMEUI.toast('💚 ' + p.short + ' ĐÃ ĐỒNG Ý kết bạn — số đã vào danh bạ điện thoại, từ nay rủ đi chơi và nhắn tin được rồi!');
    persist8();
  }
  /* ================= KẾT ĐÔI ================= */
  function couple(id) {
    var p = PEOPLE8[id]; if (!p || !p.candidate) return false;
    if (dispStage(id) !== 'yeu') { window.GAMEUI.toast('💌 ' + p.short + ' chưa là người yêu của bạn — tỏ tình thành công (ở mục 💗 Tình cảm) trước đã.'); return false; }
    if (affection(id) < COUPLE_AFF) { window.GAMEUI.toast('💑 Kết đôi cần thiện cảm ' + COUPLE_AFF + ' (đang ' + affection(id) + ') — hẹn hò, tặng quà thêm nhé.'); return false; }
    if (sceneExists(p.coupleScene)) { pending8 = { kind: 'couple', npc: id }; playScene(p.coupleScene); }
    else finishCouple(id);
    return true;
  }
  function finishCouple(id) {
    var p = PEOPLE8[id], today = new Date().toISOString().slice(0, 10);
    R8.stage8[id] = 'doi'; R8.partner8 = id;
    R8.coupleSince = today; R8.anniversary = today;
    window.GAMEUI.toast('💑 KẾT ĐÔI CHÍNH THỨC với ' + p.short + '! Ngày kỷ niệm ' + today + ' đã lưu trong mục Quan hệ — áo đôi đã mở khoá ở buổi đi cửa hàng!');
    if (window.PHONE && window.PHONE.addThread) {
      window.PHONE.addThread(p.thread, { name: '💚 ' + p.name, ava: p.ava });
      window.PHONE.receive(p.thread, [p.short + ': Từ hôm nay mình là một cặp rồi đấy 💑 Ngày này năm sau, nhớ nhắc mình nhé!']);
    }
    persist8();
  }

  /* ================= CHỦ ĐỀ NHẮN TIN VỚI BẠN BÈ ================= */
  var TOPICS8 = {
    hung: [
      { text: '💬 Hỏi anh Hùng: ở Nhật lâu rồi, anh thấy khó nhất là chuyện gì?', follow: ['Hùng: "Khó nhất là lúc ốm mà không dám nghỉ. Nên nghe anh: giữ sức khỏe là giữ visa đấy. Có gì cứ gọi anh."'] },
      { text: '💬 Kể anh Hùng nghe chuyện vui ở chỗ làm hôm nay', follow: ['Hùng: "Ha ha, được đấy! Ở đây mà còn cười được là còn sống tốt. Hôm nào anh em mình làm bữa ra trò."'] },
      { text: '💬 Nhờ anh Hùng chỉ chỗ mua đồ rẻ quanh khu nhà', follow: ['Hùng: "Siêu thị 中野 sau 7 giờ tối là đồ giảm nửa giá. Canh giờ đó mà đi — bí kíp sống còn của anh đấy."'] }
    ],
    yui: [
      { text: '💬 Hỏi Yui: tiếng Nhật của mình dạo này có khá hơn không?', follow: ['Yui: "Khá hơn nhiều rồi! Hồi đầu bạn chỉ biết gật đầu thôi mà. Giờ thì… mình nói chuyện được với nhau rồi nhỉ."'] },
      { text: '💬 Hỏi Yui về món ăn Nhật cô ấy thích nhất', follow: ['Yui: "Mình thích cá thu nướng muối nhất. Hôm nào… mình chỉ bạn chỗ bán ngon nhé."'] },
      { text: '💬 Cảm ơn Yui vì hôm trước đã kiên nhẫn nghe mình nói tiếng Nhật', follow: ['Yui: "Không có gì đâu. Nghe bạn nói là niềm vui của mình mà. Cứ luyện tiếp nhé!"'] }
    ],
    hang: [
      { text: '💬 Hỏi Hằng cách ôn ngữ pháp cho nhớ lâu', follow: ['Hằng: "Học câu, đừng học chữ rời. Mỗi mẫu câu đặt một câu về chính đời mình — nhớ cả đời. Tối nay ôn chung không?"'] },
      { text: '💬 Kể Hằng nghe chuyện nhớ nhà', follow: ['Hằng: "Mình cũng thế. Nhớ nhà thì cứ gọi về, đừng giấu. Người xa xứ mà, khóc một chút rồi lại cố tiếp."'] },
      { text: '💬 Hỏi Hằng cuối tuần này có dự định gì không', follow: ['Hằng: "Chắc ra hiệu sách cũ rồi về ôn bài. Mà nếu bạn rủ đi đâu vui vui thì… mình cũng đổi ý được đấy."'] }
    ],
    mai: [
      { text: '💬 Hỏi chị Mai cách nói chuyện với các cụ ở viện cho đúng kính ngữ', follow: ['Chị Mai: "Cứ nói chậm, rõ, và cúi đầu chào trước. Các cụ quý nhất là sự điềm đạm, em làm được mà."'] },
      { text: '💬 Cảm ơn chị Mai vì những lần chỉ việc', follow: ['Chị Mai: "Có gì đâu em. Ai sang đây cũng từng lớ ngớ cả. Sau này em vững rồi, nhớ dìu lại người mới nhé."'] },
      { text: '💬 Hỏi chị Mai cuối tuần chị thường làm gì', follow: ['Chị Mai: "Chị đi chùa Việt cho lòng nó yên. Hôm nào rảnh, hai chị em mình đi cùng."'] }
    ],
    ren: [
      { text: '💬 Hỏi Ren: làm sao để chọn được cá tươi ở chợ?', follow: ['Ren: "Nhìn mắt cá — trong, sáng là cá mới. Lần sau đi chợ, tôi chỉ tận tay cho."'] },
      { text: '💬 Khen món Ren nấu hôm trước một lần nữa', follow: ['Ren: "…Cảm ơn. Được khen thế này, mai tôi lại muốn nấu món mới cho bạn thử."'] },
      { text: '💬 Hỏi Ren ước mơ của anh là gì', follow: ['Ren: "Một quán nhỏ của riêng mình. Nhỏ thôi, mà khách tới đều là người quen. …Bạn sẽ là khách đầu tiên chứ?"'] }
    ],
    khoi: [
      { text: '💬 Hỏi Khôi mẹo sống ở Nhật của người mới', follow: ['Khôi: "Mẹo to nhất: giấy tờ giữ như giữ mạng. Còn lại thì cứ sống tử tế, người ta tự thương mình."'] },
      { text: '💬 Kể Khôi nghe chuyện ở lớp hôm nay', follow: ['Khôi: "Ha ha, lớp mình vui thật. Mai mốt tan học, hai đứa làm ly trà đá kiểu Việt cho đỡ nhớ nhà không?"'] },
      { text: '💬 Hỏi Khôi cuối tuần có tăng ca không', follow: ['Khôi: "Tuần này không. Rảnh thì rủ mình đi đâu cũng được — mình dễ tính lắm."'] }
    ]
  };
  function setTopic(id) {
    var p = PEOPLE8[id], idx = R8.topics[id] || 0, list = TOPICS8[id] || [];
    if (!window.PHONE || idx >= list.length) return;
    var t = list[idx];
    window.PHONE.setReplies(p.thread, [{ text: t.text, fx: { deltas: { love: 1 }, note: 'Nhắn tin với ' + p.short + ': chủ đề ' + (idx + 1) }, follow: t.follow }]);
    var st = window.PHONE.state ? window.PHONE.state() : null;
    if (st) { var th = st.threads.filter(function (x) { return x.id === p.thread; })[0]; R8.topicSeen[p.thread] = th ? th.msgs : 0; }
    persist8();
  }
  setInterval(function () {
    if (!window.PHONE || !window.PHONE.state) return;
    var st = window.PHONE.state();
    ORDER8.forEach(function (id) {
      var p = PEOPLE8[id];
      var th = st.threads.filter(function (x) { return x.id === p.thread; })[0];
      if (!th) return;
      var seen = R8.topicSeen[p.thread];
      if (typeof seen === 'number' && th.msgs >= seen + 2 && (R8.topics[id] || 0) < (TOPICS8[id] || []).length) {
        R8.topics[id] = (R8.topics[id] || 0) + 1;
        addAffection(id, 2);
        setTopic(id);
        persist8();
      }
    });
  }, 2500);

  /* ================= RỦ NHAU ĐI CHƠI ================= */
  var outing8 = null;   // {npc, kind, map, sceneDone, giftGiven, giftBackDone}
  var followTimer8 = null, trail8 = [];
  function startFollow8(npcId) {
    stopFollow8();
    var p = PEOPLE8[npcId]; if (!p) return;
    trail8 = [];
    followTimer8 = setInterval(function () {
      var snap = window.WORLD2D && window.WORLD2D.snapshot ? window.WORLD2D.snapshot() : null;
      if (!snap || !snap.player) return;
      trail8.push({ map: snap.map, x: snap.player.x, y: snap.player.y, dir: snap.player.dir });
      if (trail8.length > 6) trail8.shift();
      var lag = trail8[0];
      if (lag && lag.map === snap.map) window.WORLD2D.setRemote('rel8-pal', { map: lag.map, name: p.short, sprite: p.sprite, x: lag.x, y: lag.y, dir: lag.dir });
    }, 280);
  }
  function stopFollow8() {
    if (followTimer8) clearInterval(followTimer8); followTimer8 = null;
    if (window.WORLD2D) window.WORLD2D.removeRemote('rel8-pal');
  }
  function endOuting8(silent) {
    if (!outing8) return;
    var p = PEOPLE8[outing8.npc];
    stopFollow8(); outing8 = null;
    var m = $('modal-rel8-shop'); if (m) m.classList.remove('show');
    if (!silent) window.GAMEUI.toast('🚃 Buổi đi chơi kết thúc — ' + p.short + ' về trước giờ tàu cuối. Hẹn lần sau nhé!');
  }
  function startOuting(kind, id) {
    var p = PEOPLE8[id]; if (!p) return false;
    if (dispStage(id) === 'quen') { window.GAMEUI.toast('🤝 Hãy kết bạn với ' + p.short + ' trước — người quen chưa thân thì chưa rủ đi chơi được.'); return false; }
    if (outing8) endOuting8(true);
    var venue = kind;
    if (!moneyTxn8(-COST8[kind], 'outing.' + kind, (kind === 'karaoke' ? '🎤 Karaoke 渋谷 cùng ' : kind === 'park' ? '🌳 Đi công viên 代々木 cùng ' : '🛍️ Ăn uống ở trung tâm thương mại 銀座 cùng ') + p.short + ' — ' + yen(COST8[kind]))) return false;
    outing8 = { npc: id, kind: kind, map: venue, sceneDone: kind === 'mall', giftGiven: false, giftBackDone: false };
    if (window.WORLD2D) window.WORLD2D.gotoMap(venue);
    startFollow8(id);
    window.GAMEUI.toast('👥 ' + p.short + ' đi cùng bạn — họ sẽ đi theo sau trong buổi đi chơi này.');
    if (kind === 'karaoke') setTimeout(function () { playScene('karaoke-doi'); }, 700);
    if (kind === 'park') setTimeout(function () { playScene('cong-vien-doi'); }, 700);
    if (kind === 'mall') setTimeout(openShopPanel8, 700);
    persist8();
    return true;
  }
  setInterval(function () {   // buổi đi chơi tự khép khi rời bản đồ địa điểm sau khi cảnh đã xong
    if (!outing8 || !outing8.sceneDone) return;
    var snap = window.WORLD2D && window.WORLD2D.snapshot ? window.WORLD2D.snapshot() : null;
    if (snap && snap.map && snap.map !== outing8.map) endOuting8(false);
  }, 1400);

  /* ================= ĐI CỬA HÀNG — THỬ ĐỒ / Ý KIẾN / MUA TẶNG ================= */
  var shopCtx8 = null;   // {item, opinionDone}
  var TRY_LINES8 = {
    fashion: ['"Màu này… hợp với mình không?"', '"Ở quê mình ít khi mặc kiểu này. Trông có lạ lắm không?"', '"Bạn chọn giúp mình nhé — mắt bạn tốt hơn mình."'],
    jewelry: ['"Đeo lên trông có sang quá không? Mình sợ không quen."', '"Món này nhỏ mà xinh nhỉ. Bạn thấy sao?"'],
    cosmetics: ['"Màu son này có tươi quá không bạn?"', '"Thử lên tay nè — bạn xem giúp mình với."'],
    perfume: ['"Mùi này nhẹ nhàng nhỉ… bạn thích mùi này không?"', '"Xịt thử một chút — lại gần ngửi giúp mình xem hợp không."']
  };
  function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function trialSpec8(npcId, item) {
    var base = PEOPLE8[npcId].spec, s = { skin: base.skin, hair: base.hair, hairStyle: base.hairStyle, shirt: base.shirt, pants: base.pants, skirt: !!base.skirt, acc: [] };
    if (base.apron) s.apron = true;
    if (item) {
      if (item.kind === 'top') { s.shirt = item.shirt; if (item.dress) { s.skirt = true; s.pants = item.skirtColor || item.shirt; } }
      else if (item.kind === 'bottom') { s.pants = item.color; s.skirt = !!item.skirt; }
      else if (item.kind === 'acc' && item.acc) s.acc = [item.acc];
    }
    return s;
  }
  function drawPreview8(cv, npcId, item) {
    if (!cv || !window.SPRITES || !window.SPRITES.make) return;
    var set = window.SPRITES.make(trialSpec8(npcId, item));
    cv.width = 96; cv.height = 144;
    cv.getContext('2d').drawImage(set.frames.down[0], 0, 0);
  }
  function ensureModals8() {
    if (!$('modal-rel8')) {
      var m1 = document.createElement('div');
      m1.className = 'modal'; m1.id = 'modal-rel8';
      m1.innerHTML = '<div class="modal-card" id="rel8-card"></div>';
      document.body.appendChild(m1);
    }
    if (!$('modal-rel8-shop')) {
      var m2 = document.createElement('div');
      m2.className = 'modal'; m2.id = 'modal-rel8-shop';
      m2.innerHTML = '<div class="modal-card" id="rel8-shop-card"></div>';
      document.body.appendChild(m2);
    }
  }
  function openShopPanel8() {
    ensureModals8();
    var modal = $('modal-rel8-shop'); if (!modal || !outing8 || outing8.kind !== 'mall') return;
    renderShopPanel8();
    modal.classList.add('show');
  }
  function renderShopPanel8() {
    var card = $('rel8-shop-card'); if (!card || !outing8) return;
    var p = PEOPLE8[outing8.npc];
    var cat = (window.STYLE && window.STYLE.catalog) ? window.STYLE.catalog() : [];
    var lvl = (window.STYLE && window.STYLE.level) ? window.STYLE.level() : 1;
    card.innerHTML = '';
    card.appendChild(h('h3', null, '🛍️ Đi cửa hàng cùng ' + p.short + ' — trung tâm thương mại 銀座'));
    var sub = h('div', 'sub');
    sub.innerHTML = p.short + ' sẽ <b>thử đồ ngay tại quầy</b> — bạn cho ý kiến, ưng thì <b>mua tặng tại chỗ</b>. 💴 Ví: ' + yen(moneyYen()) + ' · Thiện cảm: <b>' + affection(outing8.npc) + '</b>';
    card.appendChild(sub);
    var wrap = h('div', 'style-preview');
    var cv = document.createElement('canvas');
    drawPreview8(cv, outing8.npc, shopCtx8 ? shopCtx8.item : null);
    wrap.appendChild(cv);
    wrap.appendChild(h('div', 'style-prev-note', shopCtx8 && shopCtx8.item ? (p.short + ' đang thử: ' + shopCtx8.item.name) : (p.short + ' đang dạo quầy — chọn một món để ' + p.short + ' thử nhé')));
    card.appendChild(wrap);
    if (shopCtx8 && shopCtx8.item) {
      var lines = TRY_LINES8[shopCtx8.item.counter] || TRY_LINES8.fashion;
      card.appendChild(h('div', 'style-note', '💬 ' + p.short + ': ' + lines[Math.floor(Math.random() * lines.length)]));
      if (!shopCtx8.opinionDone) {
        var sec = h('div', 'style-sec'); sec.appendChild(h('div', 'style-sec-t', 'Ý kiến của bạn:')); card.appendChild(sec);
        var row = h('div', 'style-row'); sec.appendChild(row);
        [['💬 "Hợp với bạn lắm!"', 3], ['💬 "Cũng được — xem thêm vài món nữa"', 1], ['💬 "Màu này hơi dìm da đấy"', -2]].forEach(function (op) {
          var b = h('button', 'style-chip', op[0]); b.type = 'button';
          b.addEventListener('click', function () {
            shopCtx8.opinionDone = true; addAffection(outing8.npc, op[1]);
            window.GAMEUI.toast(op[1] > 0 ? '💗 ' + p.short + ' cười tươi — ý kiến của bạn làm họ vui. (Thiện cảm +' + op[1] + ')' : '😅 ' + p.short + ' hơi xìu — chê cũng phải khéo. (Thiện cảm ' + op[1] + ')');
            renderShopPanel8();
          });
          row.appendChild(b);
        });
      } else {
        var acts = h('div', 'btnrow');
        var gb = h('button', 'btn primary', '🎁 Mua tặng món này — ' + yen(shopCtx8.item.price)); gb.type = 'button';
        gb.addEventListener('click', function () { giftItem8(shopCtx8.item); });
        acts.appendChild(gb);
        var nb = h('button', 'btn ghost', 'Xem món khác'); nb.type = 'button';
        nb.addEventListener('click', function () { shopCtx8 = null; renderShopPanel8(); });
        acts.appendChild(nb);
        card.appendChild(acts);
      }
    }
    if (R8.partner8 === outing8.npc) {
      var cs = h('div', 'style-sec'); cs.appendChild(h('div', 'style-sec-t', '💑 Đồ đôi của hai bạn (mở khoá khi kết đôi)')); card.appendChild(cs);
      var crow = h('div', 'shop-item');
      var cinfo = h('div', 'shop-info');
      cinfo.appendChild(h('div', 'shop-name', '👕 Áo đôi — cặp áo sơ mi xanh giống nhau (2 chiếc)'));
      cinfo.appendChild(h('div', 'shop-jp', 'ペアルック — một chiếc tặng ' + p.short + ', một chiếc vào tủ đồ của bạn'));
      cinfo.appendChild(h('div', 'shop-price', yen(3900 * 2)));
      crow.appendChild(cinfo);
      var cacts = h('div', 'shop-acts');
      var cb = h('button', 'btn primary', 'Mua cặp áo đôi'); cb.type = 'button';
      cb.addEventListener('click', buyCoupleSet8);
      cacts.appendChild(cb); crow.appendChild(cacts);
      card.appendChild(crow);
    }
    var sec2 = h('div', 'style-sec'); sec2.appendChild(h('div', 'style-sec-t', 'Chọn món cho ' + p.short + ' thử:')); card.appendChild(sec2);
    cat.forEach(function (it) {
      var rowEl = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', it.emoji + ' ' + it.name + (R8.gifts8[outing8.npc].indexOf(it.id) >= 0 ? ' · 🎁 đã tặng' : '')));
      info.appendChild(h('div', 'shop-jp', it.jp));
      var pr = h('div', 'shop-price', yen(it.price));
      if (lvl < it.req) pr.appendChild(h('span', 'shop-lock', ' 🔒 Cần Cấp ' + it.req));
      info.appendChild(pr);
      rowEl.appendChild(info);
      var acts2 = h('div', 'shop-acts');
      var tb = h('button', 'btn ' + (lvl < it.req ? 'ghost' : 'primary'), lvl < it.req ? '🔒 Cấp ' + it.req : 'Thử món này');
      tb.type = 'button';
      tb.addEventListener('click', function () {
        if (lvl < it.req) { window.GAMEUI.toast('🔒 Món này cần Cấp phong cách ' + it.req + '.'); return; }
        shopCtx8 = { item: it, opinionDone: false }; renderShopPanel8();
      });
      acts2.appendChild(tb);
      rowEl.appendChild(acts2);
      card.appendChild(rowEl);
    });
    var done = h('div', 'btnrow');
    var db = h('button', 'btn primary', 'Xong — đi tiếp'); db.type = 'button';
    db.addEventListener('click', function () { $('modal-rel8-shop').classList.remove('show'); shopCtx8 = null; });
    done.appendChild(db);
    card.appendChild(done);
  }
  function giftItem8(item) {
    if (!outing8 || !item) return false;
    var npc = outing8.npc, p = PEOPLE8[npc];
    if (!moneyTxn8(-item.price, 'gift.' + item.counter + '.' + item.id, '🎁 Mua tặng ' + p.short + ': ' + item.name + ' — ' + yen(item.price))) return false;
    if (R8.gifts8[npc].indexOf(item.id) < 0) R8.gifts8[npc].push(item.id);
    outing8.giftGiven = true;
    var bonus = 5;
    if (p.candidate && window.REL && window.REL.candidates) {
      var c = window.REL.candidates()[npc];
      if (c && c.fav && c.fav.indexOf(item.counter) >= 0) bonus = 10;   // đúng gu — khớp §4.10
    }
    addAffection(npc, bonus);
    window.GAMEUI.toast('🎁 ' + p.short + ' nhận ' + item.name + ' — mắt sáng lên! (Thiện cảm +' + bonus + ')');
    maybeGiftBack8();
    shopCtx8 = null;
    persist8(); renderShopPanel8();
    return true;
  }
  var uidSeq8 = 0;
  function genUid8() { uidSeq8++; return 'it-' + Date.now().toString(36) + '-g' + uidSeq8.toString(36) + Math.floor(Math.random() * 46656).toString(36); }
  function grantToPlayer8(itemId) {
    if (!window.FLOW || !window.FLOW.getStyle || !window.FLOW.setStyle) return false;
    var st = window.FLOW.getStyle();
    if (!st && window.STYLE && window.STYLE.state) st = window.STYLE.state();   // tủ đồ chưa từng lưu → lấy trạng thái hiện hành của style.js làm nền
    if (!st) return false;
    st.owned = Array.isArray(st.owned) ? st.owned : [];
    st.instances = Array.isArray(st.instances) ? st.instances : [];
    if (st.owned.indexOf(itemId) >= 0) return false;
    var uid = genUid8();
    st.owned.push(itemId);
    st.instances.push({ uid: uid, itemId: itemId, tradeable: true, via: 'gift', at: Date.now() });
    window.FLOW.setStyle(st);
    R8.grants.push({ uid: uid, itemId: itemId, at: Date.now(), consumed: false });
    persist8();
    return true;
  }
  function maybeGiftBack8() {
    if (!outing8 || outing8.giftBackDone || !outing8.giftGiven) return;
    if (affection(outing8.npc) < 50) return;
    var cat = (window.STYLE && window.STYLE.catalog) ? window.STYLE.catalog() : [];
    var lvl = (window.STYLE && window.STYLE.level) ? window.STYLE.level() : 1;
    var st = (window.FLOW && window.FLOW.getStyle) ? window.FLOW.getStyle() : null;
    if (!st && window.STYLE && window.STYLE.state) st = window.STYLE.state();
    var owned = st && Array.isArray(st.owned) ? st.owned : [];
    var cand = cat.filter(function (it) { return it.price <= 3000 && (it.req || 1) <= lvl && owned.indexOf(it.id) < 0; })
      .sort(function (a, b) { return a.price - b.price; })[0];
    if (!cand) return;
    if (grantToPlayer8(cand.id)) {
      outing8.giftBackDone = true;
      window.GAMEUI.toast('🎁 ' + PEOPLE8[outing8.npc].short + ' bất ngờ tặng lại bạn: ' + cand.name + ' — đã vào tủ đồ của bạn (mở 👗 Ngoại hình để xem/mặc)!');
    }
  }
  function buyCoupleSet8() {
    if (!outing8 || R8.partner8 !== outing8.npc) return false;
    var it = ((window.STYLE && window.STYLE.catalog) ? window.STYLE.catalog() : []).filter(function (x) { return x.id === COUPLE_ITEM; })[0];
    if (!it) return false;
    if (!moneyTxn8(-it.price * 2, 'gift.fashion.ao-doi', '💑 Mua ÁO ĐÔI với ' + PEOPLE8[outing8.npc].short + ': 2 chiếc ' + it.name + ' — ' + yen(it.price * 2))) return false;
    if (R8.gifts8[outing8.npc].indexOf(it.id) < 0) R8.gifts8[outing8.npc].push(it.id);
    grantToPlayer8(it.id);
    addAffection(outing8.npc, 6);
    window.GAMEUI.toast('💑 Áo đôi đã sẵn sàng — một chiếc của ' + PEOPLE8[outing8.npc].short + ', một chiếc của bạn. Lần tới đi chơi cùng nhau, hai người mặc giống nhau nhé!');
    persist8(); renderShopPanel8();
    return true;
  }
  // Giữ quà tặng lại cho người chơi khỏi bị bản ghi tủ đồ cũ trong phiên ghi đè mất:
  // bọc FLOW.setStyle — món quà (theo uid) chưa từng xuất hiện mà biến mất thì gắn lại 1 lần.
  if (window.FLOW && window.FLOW.setStyle) {
    var origSetStyle8 = window.FLOW.setStyle;
    window.FLOW.setStyle = function (d) {
      try {
        if (d && R8.grants.length) {
          d.owned = Array.isArray(d.owned) ? d.owned : [];
          d.instances = Array.isArray(d.instances) ? d.instances : [];
          R8.grants.forEach(function (g) {
            if (!g.consumed && d.owned.indexOf(g.itemId) < 0) {
              d.owned.push(g.itemId);
              d.instances.push({ uid: g.uid, itemId: g.itemId, tradeable: true, via: 'gift', at: g.at });
              g.consumed = true;
            }
          });
          persist8();
        }
      } catch (e) {}
      return origSetStyle8(d);
    };
  }

  /* ================= KỶ NIỆM CẶP ĐÔI ================= */
  function daysTogether() {
    if (!R8.coupleSince) return 0;
    var a = new Date(R8.coupleSince + 'T00:00:00'), b = new Date();
    return Math.floor((b - a) / 86400000);
  }
  function anniversaryCheck() {
    if (!R8.partner8) return;
    var p = PEOPLE8[R8.partner8], today = new Date().toISOString().slice(0, 10);
    var days = daysTogether();
    var isAnniv = R8.anniversary && R8.anniversary.slice(5) === today.slice(5) && days >= 364;
    if (days > 0 && (days % 30 === 0 || isAnniv) && R8.annivMsgDay !== today) {
      R8.annivMsgDay = today; persist8();
      if (window.PHONE && window.PHONE.addThread) {
        window.PHONE.addThread(p.thread, { name: '💚 ' + p.name, ava: p.ava });
        window.PHONE.receive(p.thread, [p.short + ': Hôm nay là mốc ' + (isAnniv ? 'TRÒN 1 NĂM' : days + ' ngày') + ' của hai đứa mình đấy 💑 Cảm ơn vì đã luôn ở bên nhau.']);
      }
      window.GAMEUI.toast('💑 Hôm nay là mốc kỷ niệm của bạn và ' + p.short + ' — mở điện thoại xem lời nhắn nhé!');
    }
  }

  /* ================= MỤC QUAN HỆ (giao diện) ================= */
  function genderNow() { var pl = window.__demo && window.__demo.player ? window.__demo.player() : null; return pl && pl.gender === 'F' ? 'F' : 'M'; }
  function openPanel8() {
    ensureModals8();
    anniversaryCheck();
    var card = $('rel8-card'); if (!card) return;
    var f = (window.FLOW && window.FLOW.flags) ? window.FLOW.flags() : {};
    var g = genderNow();
    card.innerHTML = '';
    card.appendChild(h('h3', null, '💞 Quan hệ — bạn bè, người yêu, cặp đôi'));
    var lover = g === 'F' ? 'Hải' : 'Linh';
    var arcTxt = f.breakup === 'giu-duoc' ? ('💌 ' + lover + ' ở quê vẫn đang đợi — hai người đã giữ được nhau (điểm quan tâm ' + (f.lovecare != null ? f.lovecare : '—') + ').')
      : f.breakup === 'bi-da' ? ('💔 Đã chia tay với ' + lover + ' ở quê — người ở quê buông tay trước.')
      : f.breakup === 'cam-sung' ? ('💔 Đã chia tay với ' + lover + ' ở quê — phát hiện người thứ ba.')
      : ('💌 ' + lover + ' ở quê đang đợi bạn (điểm quan tâm: ' + (f.lovecare != null ? f.lovecare : '—') + ') — cách bạn đối xử sẽ quyết định kết cục ở Chương 3.');
    var arcDiv = h('div', 'sub'); arcDiv.innerHTML = '<b>Người yêu ở quê:</b> ' + arcTxt;
    card.appendChild(arcDiv);
    if (R8.partner8) {
      var cpDiv = h('div', 'sub');
      cpDiv.innerHTML = '💑 <b>Cặp đôi hiện tại:</b> bạn & ' + PEOPLE8[R8.partner8].short + ' — kết đôi từ ' + R8.coupleSince + ' · bên nhau ' + daysTogether() + ' ngày · 🎂 Ngày kỷ niệm: ' + R8.anniversary;
      card.appendChild(cpDiv);
    }
    ORDER8.forEach(function (id) {
      var p = PEOPLE8[id], st = dispStage(id), aff = affection(id);
      var box = h('div', 'shop-item');
      var info = h('div', 'shop-info');
      info.appendChild(h('div', 'shop-name', p.ava + ' ' + p.name + ' — ' + STAGE_LABEL[st]));
      info.appendChild(h('div', 'shop-jp', (p.candidate ? p.nat : 'Người quen trong đời sống ở Nhật') + ' · Thiện cảm: ' + aff + '/100 ' + '💗'.repeat(Math.round(aff / 20))));
      if (!p.candidate) info.appendChild(h('div', 'shop-jp', 'Quan hệ với ' + p.short + ' dừng ở mức BẠN BÈ — không tỏ tình/kết đôi được.'));
      var gifts = R8.gifts8[id];
      if (gifts.length) info.appendChild(h('div', 'shop-jp', '🎁 Đã tặng: ' + gifts.map(function (gid) { var it = ((window.STYLE && window.STYLE.catalog) ? window.STYLE.catalog() : []).filter(function (x) { return x.id === gid; })[0]; return it ? it.name : gid; }).join(', ')));
      box.appendChild(info);
      var acts = h('div', 'shop-acts');
      function mkBtn(label, cls, fn) { var b = h('button', 'btn ' + cls, label); b.type = 'button'; b.addEventListener('click', fn); acts.appendChild(b); return b; }
      if (st === 'quen') {
        mkBtn(isMet(id) ? (aff >= BEFRIEND_AFF ? '🤝 Kết bạn' : '🤝 Kết bạn (cần 💗' + BEFRIEND_AFF + ')') : '🤝 Kết bạn (chưa gặp)', 'primary', function () { if (befriend(id)) { var m = $('modal-rel8'); if (m) m.classList.remove('show'); } });
      } else {
        mkBtn('🎤 Karaoke', 'ghost', function () { var m = $('modal-rel8'); if (m) m.classList.remove('show'); startOuting('karaoke', id); });
        mkBtn('🌳 Công viên', 'ghost', function () { var m = $('modal-rel8'); if (m) m.classList.remove('show'); startOuting('park', id); });
        mkBtn('🛍️ Đi cửa hàng', 'primary', function () { var m = $('modal-rel8'); if (m) m.classList.remove('show'); startOuting('mall', id); });
        if (p.candidate && st === 'yeu') mkBtn('💑 Kết đôi chính thức', 'primary', function () { if (couple(id)) { var m = $('modal-rel8'); if (m) m.classList.remove('show'); } });
      }
      box.appendChild(acts);
      card.appendChild(box);
    });
    var btnrow = h('div', 'btnrow');
    var done = h('button', 'btn primary', 'Đóng'); done.type = 'button';
    done.addEventListener('click', function () { $('modal-rel8').classList.remove('show'); });
    btnrow.appendChild(done); card.appendChild(btnrow);
    $('modal-rel8').classList.add('show');
  }

  /* ================= NỐI VÀO MÁY TRUYỆN (chuỗi onSceneEnd) + ĐIỂM VÀO ================= */
  var logMark8 = 0;
  var SCENE_NPC8 = { 'hung': 'hung', 'combini': 'yui', 'ch2-yui': 'yui', 'ch3-cam-do-nam': 'yui', 'ch3-hang-vo': 'hang', 'kaigo-mai': 'mai', 'ch3-ren-gap': 'ren', 'ch3-cam-do-nu': 'ren', 'ch3-khoi-gap': 'khoi' };
  function rel8SceneEnd(id) {
    var npc = SCENE_NPC8[id];
    if (npc) {
      if (!R8.met8[npc]) { R8.met8[npc] = true; persist8(); }
      if ((id === 'hung' || id === 'kaigo-mai') && !PEOPLE8[npc].candidate) addAffection(npc, 8);
    }
    if (window.GAMEUI && window.GAMEUI.log) {
      var lg = window.GAMEUI.log();
      for (var i = logMark8; i < lg.length; i++) {
        var n = lg[i].note || '';
        if (n.indexOf('Đi karaoke chung:') === 0 || n.indexOf('Dạo công viên chung:') === 0) {
          if (outing8) addAffection(outing8.npc, 3);
        }
      }
      logMark8 = lg.length;
    }
    if (pending8 && pending8.kind === 'befriend' && id === PEOPLE8[pending8.npc].friendScene) {
      var bId = pending8.npc; pending8 = null; finishBefriend(bId);
    } else if (pending8 && pending8.kind === 'couple' && id === PEOPLE8[pending8.npc].coupleScene) {
      var cId = pending8.npc; pending8 = null; finishCouple(cId);
    }
    if ((id === 'karaoke-doi' || id === 'cong-vien-doi') && outing8) outing8.sceneDone = true;
  }
  if (window.REL && window.REL.onSceneEnd) {
    var origRelSceneEnd = window.REL.onSceneEnd;
    window.REL.onSceneEnd = function (id) {
      origRelSceneEnd(id);
      try { rel8SceneEnd(id); } catch (e) {}
    };
  }
  document.addEventListener('DOMContentLoaded', function () {
    ensureModals8();
    // Điểm vào 1: hàng riêng trong ⚙️ Cài đặt (cạnh hàng Ngoại hình)
    var anchor = $('set-style');
    if (anchor && anchor.closest) {
      var rowEl = anchor.closest('.mrow');
      if (rowEl && rowEl.parentNode && !$('set-rel8')) {
        var mrow = document.createElement('div');
        mrow.className = 'mrow';
        mrow.innerHTML = '<span>💞 Quan hệ — bạn bè, người yêu, cặp đôi</span>';
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'btn ghost'; b.id = 'set-rel8'; b.textContent = 'Mở mục Quan hệ';
        b.addEventListener('click', function () {
          var s = $('modal-settings'); if (s) s.classList.remove('show');
          openPanel8();
        });
        mrow.appendChild(b);
        rowEl.parentNode.insertBefore(mrow, rowEl.nextSibling);
      }
    }
    // Điểm vào 2: đầu danh sách luồng tin nhắn trong điện thoại (nút 📱 của phone.js
    // gọi hàm open nội bộ, nên phải gắn cả vào nút lẫn PHONE.open cho các lệnh gọi API)
    function injectPhoneEntry() {
      var body = $('phone-body');
      if (body && body.querySelector('.thread-item') && !$('rel8-entry')) {
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'thread-item'; btn.id = 'rel8-entry';
        btn.innerHTML = '<span class="t-ava">💞</span><span><span class="t-name">Quan hệ — bạn bè, người yêu, cặp đôi</span><br><span class="t-last">Kết bạn, rủ đi chơi, kết đôi…</span></span>';
        btn.addEventListener('click', function () { if (window.PHONE) window.PHONE.close(); openPanel8(); });
        body.insertBefore(btn, body.firstChild);
      }
    }
    var bp = $('btn-phone');
    if (bp) bp.addEventListener('click', function () { anniversaryCheck(); setTimeout(injectPhoneEntry, 60); });
    if (window.PHONE && window.PHONE.open) {
      var origOpen = window.PHONE.open;
      window.PHONE.open = function () { origOpen(); anniversaryCheck(); setTimeout(injectPhoneEntry, 30); };
    }
  });

  window.REL8 = {
    state: function () { return JSON.parse(JSON.stringify(R8)); },
    people: function () { return JSON.parse(JSON.stringify(PEOPLE8)); },
    affection: affection, stage: dispStage, isMet: isMet,
    befriend: befriend, couple: couple,
    startOuting: startOuting, endOuting: function () { endOuting8(false); },
    outing: function () { return outing8 ? JSON.parse(JSON.stringify(outing8)) : null; },
    openPanel: openPanel8, openShopPanel: openShopPanel8,
    giftItem: giftItem8, buyCoupleSet: buyCoupleSet8,
    ledger: function () { return JSON.parse(JSON.stringify(R8.ledger)); },
    thresholds: { befriend: BEFRIEND_AFF, couple: COUPLE_AFF, costs: JSON.parse(JSON.stringify(COST8)) },
    _debug: {
      set: function (patch) {
        if (!patch) return;
        ['stage8', 'aff8', 'met8', 'gifts8', 'topics', 'refusedAt'].forEach(function (k) {
          if (patch[k]) Object.keys(patch[k]).forEach(function (id) { R8[k][id] = patch[k][id]; });
        });
        ['partner8', 'coupleSince', 'anniversary'].forEach(function (k) { if (patch[k] !== undefined) R8[k] = patch[k]; });
        persist8();
      },
      reset: function () { R8 = fresh8(); persist8(); }
    }
  };
})();
