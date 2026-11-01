// guide.js — LỚP DẪN ĐƯỜNG + HUD GỌN (Lane H, theo góp ý chơi thử thật của chủ trang
// 31/10/2026 21:39 JST):
//   1) Bảng HƯỚNG DẪN TỪNG BƯỚC (#guide): bước hiện tại in đậm + các bước tiếp theo
//      đánh số, bước xong tự qua bước kế — suy từ trạng thái máy truyện (STORY.state())
//      cho Mở đầu + Chương 1 + Chương 2; ngoài mạch đã có dữ liệu thì hiện mục tiêu
//      hiện tại (bắt từ GAMEUI.setObjective) làm bước duy nhất.
//      Lane P (01/11, lệnh chủ trang 06:07): bảng ẨN HẲN mặc định (đã có giọng
//      hướng dẫn tự phát) — dữ liệu bước vẫn dựng nền như cũ; người chơi bấm biểu
//      tượng 🧭 #btn-guide mới mở bảng xem lại, đóng bằng ✕ / bấm lại 🧭 / bấm ra
//      ngoài. Trạng thái mở/đóng KHÔNG lưu.
//   2) MŨI TÊN CHỈ ĐƯỜNG: engine.js hỏi GUIDE.targetFor(mapId) mỗi khung hình — đích
//      là NPC/vật thể của bước hiện tại; đích ở bản đồ khác → chỉ về CỬA đi đúng
//      hướng (BFS trên đồ thị cửa của MAPDEF). Tắt được ở Cài đặt (#set-guide-arrow).
//      Lane R (01/11, lệnh chủ trang 06:32 "nhiệm vụ đi đâu phải có mũi tên chỉ dẫn
//      đường chứ lạc mất"): kiểm kê thật cho thấy MỌI đích không gian đều phân
//      giải được và đồ thị cửa thông suốt — điểm yếu nằm ở NHÃN và KHOẢNG TRẮNG:
//      (a) nhãn xuyên bản đồ nay ghi cả ĐÍCH CUỐI + số nơi còn phải qua (routePath
//      trả cả tuyến BFS) thay vì chỉ chặng kế kèm "≈N bước" tới cửa gây hiểu lầm
//      là sắp tới đích; (b) các bước KHÔNG có đích không gian (trả lời tin nhắn
//      điện thoại, chờ diễn biến SIM, nhịp Chương 3 qua điện thoại) trước đây làm
//      mũi tên biến mất lặng lẽ — nay guide NHẮC NÚT: nhấp nháy nút 📱 khi bước
//      cần mở điện thoại và nhấp nháy nhẹ nút 🧭 (bảng bước luôn dựng đúng bước
//      hiện tại — xem GUIDE.uiCue()); (c) số bước cùng bản đồ do engine tính theo
//      ô TRÊN ĐƯỜNG ĐI (BFS lưới) thay cho đường thẳng.
//   3) HUD thu gọn: nút #btn-hud thu/mở bảng chỉ số (mặc định GỌN, lưu lựa chọn);
//      cỡ hình (zoom) chỉnh ở Cài đặt (#set-zoom) qua WORLD2D.setZoom.
//      Lane X (01/11, lệnh chủ trang 08:31–08:32 "có mũi tên đường đi chỉ mình
//      phải đi đâu" + "phải làm gì điểm đến phải rõ ràng"): bản dò harness cho
//      thấy 5 khe hở CÓ THẬT — (i) Chương 3 KHÔNG BAO GIỜ có mũi tên (bước Ch3
//      luôn target=null, kể cả khi có người chưa gặp với meetMap rõ ràng trong
//      REL.candidates); (ii) #objective bị display:none nên chữ mục tiêu Ch3
//      chỉ nằm trong bảng 🧭 đang ẩn; (iii) tắt mũi tên trong Cài đặt lúc đang
//      có nhiệm vụ thì im lặng hoàn toàn, không nhắc gì; (iv) mũi tên mép trên
//      bị HUD (77px @390) phủ vì kẹp ở ~62px, mũi tên mép dưới bị thẻ thoại
//      (279px) nuốt; (v) bước chờ/tự do không có chữ nào trên màn hình chính.
//      Vá ở lane này: CHIP MỤC TIÊU 1 DÒNG #guide-chip luôn hiện khi đang chơi
//      (bấm chip = mở bảng 🧭), CHUỖI DỰ PHÒNG ĐÍCH cho Chương 3 từ dữ liệu
//      REL phơi ra (ứng viên chưa gặp → meetMap của họ), NHẮC 🧭 khi mũi tên
//      đang tắt mà có nhiệm vụ, và trạng thái TỰ DO dứt khoát (chip "🌸 Tự do
//      khám phá", hết nhấp nháy vô ích). Phần vẽ trên canvas (mũi tên nổi trên
//      đầu nhân vật + vệt chấm theo đường đi) nằm ở engine.js (drawHeroArrow /
//      drawGuideTrail) dùng cùng GUIDE.targetFor này.
//   4) Điểm nối ÂM THANH HƯỚNG DẪN: nút 🔊 #guide-voice CHỈ hiện khi lane âm thanh
//      đã nạp window.GUIDE_VOICE.playCurrent — bấm là gọi hàm đó; chưa có thì ẩn.
// File này CHỈ đọc trạng thái (STORY.state / MAPDEF) và ghi DOM của chính nó —
// không sửa trạng thái truyện, không đụng hợp đồng FLOW/engine.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var TILE = (window.MAPS2D && window.MAPS2D.TILE) || 32;
  var LS_ARROW = 'tuoitre2d_guide_arrow', LS_HUD = 'tuoitre2d_hud_full';
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var arrowOn = lsGet(LS_ARROW, '1') !== '0';
  var objectiveText = '';
  var steps = [], curIdx = -1, curTgt = null;   // curTgt: {map,x,y} của bước hiện tại (đã phân giải)
  var fbTgt = null;      // Lane X: đích DỰ PHÒNG (Chương 3 — ứng viên chưa gặp) khi bước không có đích
  var isFree = false;    // Lane X: trạng thái TỰ DO dứt khoát (hết việc bắt buộc hiện có)
  var lastChapter = 0, lastBook = {};
  var lastSig = '';

  /* ---------- Bắt mục tiêu hiện tại từ GAMEUI.setObjective (đường dự phòng) ---------- */
  if (window.GAMEUI && window.GAMEUI.setObjective && !window.GAMEUI.__guideWrapped) {
    var origSetObj = window.GAMEUI.setObjective;
    window.GAMEUI.setObjective = function (text) {
      objectiveText = String(text || '');
      origSetObj(text);
      scheduleRefresh();
    };
    window.GAMEUI.__guideWrapped = true;
  }

  /* ---------- Dữ liệu bước theo mạch truyện ---------- */
  function examStep(st, n) {
    var ex = n === 1 ? st.exam : st.exam2;
    if (!ex.passed && ex.needReview) return {
      label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại bài, rồi quay lại trường thi tiếp',
      target: { scene: 'room-desk' }, done: function () { return ex.passed; }
    };
    return {
      label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để thi mốc JLPT N' + (n === 1 ? '5' : '4') + ', cổng cuối Chương ' + n,
      target: { scene: 'school-board' }, done: function () { return ex.passed; }
    };
  }
  function buildSteps(st) {
    var f = st.flags || {}, c = st.ch2 || {}, t = st.tenancy || {};
    if (st.chapter >= 3) {
      // Tuyến Chương 3 do rel.js dẫn nhịp qua mục tiêu — hiện mục tiêu làm bước duy nhất.
      return [{ label: objectiveText || '🌸 Tự do khám phá — tuyến Chương 3 đang mở dần', target: null, done: function () { return false; } }];
    }
    if (st.chapter >= 2) {
      var d = [];
      d.push({ label: 'Ra PHỐ MUA SẮM — gặp anh Tuấn "môi giới" gần cửa ngân hàng', target: { scene: 'sim-01-loi-ru' }, done: function () { return !!t.simChoice || t.simDi === 'di'; } });
      if (t.simDi === 'di' && !t.simChoice) d.push({ label: 'Đi theo anh Tuấn vào CỬA HÀNG ĐIỆN THOẠI — xem kỹ bộ giấy tờ, cân nhắc thật kỹ trước khi ký (cảnh nối tự mở, đừng nói chuyện lại với anh Tuấn)', target: null, ui: 'free', done: function () { return !!t.simChoice; } });
      if (t.simChoice === 'ky') d.push({ label: 'Kèo SIM sẽ để lại hậu quả — cứ sinh hoạt bình thường, chờ diễn biến', target: null, ui: 'free', done: function () { return !!t.simBillFired; } });
      if (t.simTruthPending) d.push({ label: 'Mở ĐIỆN THOẠI (nút 📱 góc phải) — đọc và trả lời tin nhắn của mẹ', target: null, ui: 'phone', done: function () { return !t.simTruthPending; } });
      d.push({ label: 'Tới NGÂN HÀNG ở phố mua sắm — quầy giao dịch: lĩnh LƯƠNG ĐẦU và gửi tiền về nhà', target: { scene: 'bank-counter' }, done: function () { return !!c.salaryDone; } });
      if (c.sentMsgPending) d.push({ label: 'Mở ĐIỆN THOẠI (nút 📱 góc phải) — trả lời tin nhắn của mẹ sau khi nhận tiền', target: null, ui: 'phone', done: function () { return !c.sentMsgPending; } });
      d.push({ label: 'Về PHÒNG TRỌ — bật chiếc TV NHỎ trên kệ (tường phía đông phòng) xem bản tin tối', target: { scene: 'room-tv' }, done: function () { return !!c.tvDone; } });
      d.push({ label: 'Ghé combini — gặp Yui ở quầy', target: { scene: 'combini' }, done: function () { return !!c.romanceDone; } });
      d.push({ label: 'Tới quán nhậu 新橋 — xem BẢNG TIN trong quán, dự tiệc TẤT NIÊN 忘年会 với công ty', target: { scene: 'bonenkai' }, done: function () { return !!c.bonenkaiDone; } });
      d.push({ label: 'Về PHÒNG TRỌ — dùng điện thoại trên bàn thấp, gọi về nhà đón giao thừa với bố mẹ', target: { scene: 'call-home' }, done: function () { return !!c.tetDone; } });
      d.push(examStep(st, 2));
      d.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để mở TỔNG KẾT Chương 2', target: { scene: 'school-board' }, done: function () { return st.chapter >= 3; } });
      return d;
    }
    if (!f.boarded) {
      return [
        { label: 'Nói lời chia tay với BỐ MẸ (phía trái sảnh)', target: { scene: 'airport-family' }, done: function () { return !!f.famDone; } },
        { label: 'Tạm biệt LINH (góc cà phê, phía phải sảnh)', target: { scene: 'airport-lover' }, done: function () { return !!f.loverDone; } },
        { label: 'Qua CỬA AN NINH (tường phía đông sảnh) để lên máy bay', target: { scene: 'airport-gate' }, done: function () { return !!f.boarded; } }
      ];
    }
    if (!f.arrived) {
      return [
        { label: 'Đi dọc khoang tới CỬA ở đầu đông — xuống máy bay, về phòng trọ', target: { doorTo: 'room', map: 'may-bay' }, done: function () { return !!f.arrived; } }
      ];
    }
    return [
      { label: 'Ở trong phòng trọ — nghe đoạn mở đầu ngày đầu ở Nhật', target: { map: 'room' }, done: function () { return !!f.introDone; } },
      { label: 'Ra đường (qua cửa phòng) — gặp anh Hùng "sẹo" đang đi dạo', target: { scene: 'hung' }, done: function () { return !!f.hungDone; } },
      { label: 'Vào combini — nói chuyện với Yui ở quầy', target: { scene: 'combini' }, done: function () { return !!f.combiniDone; } },
      { label: 'Mở ĐIỆN THOẠI (nút 📱 góc phải) — trả lời tin nhắn của Linh', target: null, ui: 'phone', done: function () { return !!f.phoneReplied; } },
      { label: 'Ra GA — tới chỗ nhân viên ga, nghe thông báo ở ga', target: { scene: 'station' }, done: function () { return !!f.listenDone; } },
      { label: 'Về ĐIỂM TẬP KẾT RÁC trên phố (cạnh máy bán hàng đỏ) — thử phân loại rác', target: { scene: 'gomi' }, done: function () { return !!f.gomiDone; } },
      { label: 'Về PHÒNG TRỌ — bấm chiếc điện thoại trên bàn thấp để gọi về nhà', target: { scene: 'call-home' }, done: function () { return !!f.callHomeDone; } },
      { label: 'Tới SHIYAKUSHO (ủy ban phường) — làm thủ tục ĐĂNG KÝ ĐỊA CHỈ', target: { scene: 'officer' }, done: function () { return !!f.officerDone; } },
      examStep(st, 1),
      { label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để mở TỔNG KẾT Chương 1', target: { scene: 'school-board' }, done: function () { return st.chapter >= 2; } }
    ];
  }

  /* ---------- Phân giải đích → tọa độ thế giới ---------- */
  // Nhãn nơi đến dạng biển cửa: "→ Đường phố 吉祥寺" (mô tả Việt từ PLACES.label +
  // tên riêng) — dùng cho đích là cửa/bản đồ và cho mũi tên mép màn hình, để người
  // chơi biết mũi tên đang dẫn ĐI ĐÂU (bổ sung chủ trang 22:02 31/10).
  // Tên nơi dạng biển: "Đường phố 吉祥寺" (mô tả Việt từ PLACES.label + tên riêng).
  function placeName(mapId) {
    var P = (window.PLACES || {})[mapId];
    if (!P) return '';
    var desc = (P.label || '').split('—')[0].trim().replace(/^\S+\s+/, '');
    return (desc ? desc + ' ' : '') + P.jp;
  }
  function placeDoorText(mapId) {
    var n = placeName(mapId);
    return n ? '→ ' + n : '';
  }
  function findSceneEntity(scene) {
    var defs = window.MAPDEF || {};
    var ids = Object.keys(defs), i, j;
    for (i = 0; i < ids.length; i++) {
      var d = defs[ids[i]], npcs = d.npcs || [];
      for (j = 0; j < npcs.length; j++) if (npcs[j].scene === scene) {
        var npc = npcs[j], nx = (npc.tx + 0.5) * TILE;
        // NPC ĐI DẠO (behavior 'pace', vd Hùng đi dọc phố ô 42→49): chỉ ô xuất
        // phát thì tới nơi anh ta đã đi mất — người chơi lại lạc. Chỉ vào ĐIỂM
        // GIỮA đoạn đi dạo (engine cho NPC chạy giữa (from+0.5) và (to+0.5) ô):
        // NPC không bao giờ cách mũi tên quá nửa đoạn (~3–4 ô, luôn trong tầm
        // nhìn ở 390px) và biển tên của NPC cũng hiện ngay cạnh đó. (Lane R)
        if (npc.behavior === 'pace' && typeof npc.from === 'number' && typeof npc.to === 'number')
          nx = ((npc.from + npc.to) / 2 + 0.5) * TILE;
        return { map: ids[i], x: nx, y: (npc.ty + 0.5) * TILE, label: npc.name || '', kind: 'npc' };
      }
    }
    for (i = 0; i < ids.length; i++) {
      var d2 = defs[ids[i]], objs = d2.objects || [];
      for (j = 0; j < objs.length; j++) if (objs[j].interact && objs[j].interact.scene === scene)
        return { map: ids[i], x: (objs[j].tx + (objs[j].tw || 1) / 2) * TILE, y: (objs[j].ty + (objs[j].th || 1) / 2) * TILE, label: objs[j].interact.label || '', kind: 'object' };
    }
    return null;
  }
  function resolveTarget(tg) {
    if (!tg) return null;
    if (tg.scene) return findSceneEntity(tg.scene);
    if (tg.doorTo && tg.map) {
      var d = (window.MAPDEF || {})[tg.map], doors = (d && d.doors) || {}, k;
      for (k in doors) if (doors[k].to === tg.doorTo) {
        var p = k.split(',');
        return { map: tg.map, x: (+p[0] + 0.5) * TILE, y: (+p[1] + 0.5) * TILE, label: placeDoorText(tg.doorTo), kind: 'door' };
      }
      return null;
    }
    if (tg.map) {
      var d2 = (window.MAPDEF || {})[tg.map];
      if (!d2) return null;
      var sp = d2.spawnDefault || [2, 2];
      return { map: tg.map, x: (sp[0] + 0.5) * TILE, y: (sp[1] + 0.5) * TILE, label: placeDoorText(tg.map), kind: 'map' };
    }
    return null;
  }
  /* ---------- Chuỗi dự phòng đích (Lane X) ---------- */
  // Bước truyện không có đích không gian thì thử suy ra VIỆC-TIẾP-THEO từ dữ
  // liệu game ĐÃ phơi ra — không bịa nội dung: Chương 3 do rel.js dẫn bằng chữ
  // mục tiêu, nhưng dữ liệu ứng viên (REL.candidates: meetMap/meetScene) +
  // trạng thái đã gặp (REL.state().met) cho một đích thật: người chưa gặp mà
  // tuyến tình cảm đang mở cửa. Cổng mở bám đúng điều kiện rel.js dùng cho
  // romanceOpen/objective: arc đã ngã ngũ (beats.resolved) hoặc đã buông tay
  // từ sân bay (book.loiHuaSanBay), chưa có partner, qua khỏi nhịp khóc/hồi
  // phục. Ngoài các trường hợp đó → null (nhịp điện thoại/chờ/tự do giữ
  // nguyên cách nhắc nút + chip chữ như Lane R).
  function relStateSafe() {
    if (!window.REL || !window.REL.state) return null;
    try { return window.REL.state(); } catch (e) { return null; }
  }
  function ch3Fallback(st) {
    if (!window.REL || !window.REL.candidates) return null;
    var R = relStateSafe(), cands;
    try { cands = window.REL.candidates(); } catch (e) { return null; }
    if (!R || !cands) return null;
    var gender = 'M';
    try { var pl = window.__demo && window.__demo.player && window.__demo.player(); if (pl && pl.gender) gender = pl.gender; } catch (e) {}
    var order = ['yui', 'hang', 'ren', 'khoi'];
    /* Lane AD — hai đích phải hiện NGAY CẢ KHI nhịp điện thoại chưa ngã ngũ:
       (1) nhịp C (cám dỗ) đang chờ mở ở đúng nơi của nó → đích là NGƯỜI đang chờ
           ở đó (Yui ở combini / Ren ở quán nhậu), để người chơi tự đi tới nơi
           thì cảnh mới mở — luật địa điểm của rel.js;
       (2) người chơi đang ĐỨNG ở đúng nơi gặp của một ứng viên chưa quen → đích
           là chính người đó. Trước đây vào lớp giữa nhịp điện thoại thì không
           có đích nào, Khôi lại chưa có NPC trong lớp → vào lớp rồi đứng ngơ. */
    if (window.REL && window.REL.camDoTarget) {
      var cd = null; try { cd = window.REL.camDoTarget(); } catch (e) {}
      if (cd) {
        var ct = resolveTarget({ scene: cd.npcScene });
        if (ct) { ct.kind = 'npc'; return ct; }
        var cm = resolveTarget({ map: cd.map });
        if (cm) { cm.kind = 'npc'; cm.label = cd.name; return cm; }
      }
    }
    var hereId = curMapId();
    if (hereId) {
      for (var h = 0; h < order.length; h++) {
        var hc = cands[order[h]];
        if (!hc || hc.route !== gender || !hc.meetScene || hc.meetMap !== hereId) continue;
        if (R.met && R.met[order[h]]) continue;
        var ht = resolveTarget({ scene: hc.meetScene }) || resolveTarget({ map: hc.meetMap });
        if (ht) { ht.label = hc.name; ht.kind = 'meet'; return ht; }
      }
    }
    var skipped = !!(st.book && st.book.loiHuaSanBay === 'buong-tay');
    if (!skipped && !(R.beats && R.beats.resolved)) return null;
    if (R.partner) return null;
    if (R.breakup === 'giu-duoc') return null;                 // đã yên bề — tự do
    if (R.breakup && !R.khocDone) return null;                  // nhịp khóc tự chạy theo giờ
    if (R.breakup && !R.recovered) return null;                 // đang hồi phục — nhịp bạn bè/UI
    for (var i = 0; i < order.length; i++) {
      var c = cands[order[i]];
      if (!c || c.route !== gender || !c.meetScene || !c.meetMap) continue;
      if (R.met && R.met[order[i]]) continue;
      var t = resolveTarget({ scene: c.meetScene }) || resolveTarget({ map: c.meetMap });   // Lane AD: chỉ tới NGƯỜI THẬT (vị trí NPC), không chỉ điểm spawn trống
      if (t) { t.label = c.name; t.kind = 'meet'; return t; }
    }
    return null;
  }
  // Trạng thái TỰ DO dứt khoát: hết bước bắt buộc (curIdx<0) hoặc Chương 3 đã
  // ngã ngũ êm (giữ được người ở quê / đã có partner) và không còn đích dự
  // phòng — chip hiện "🌸 Tự do khám phá", mũi tên tắt, 🧭 hết nhấp nháy.
  function computeFree(st) {
    if (curIdx < 0) return true;
    if (st.chapter >= 3 && !curTgt && !fbTgt) {
      var R = relStateSafe();
      if (R && R.beats && R.beats.resolved && (R.partner || R.breakup === 'giu-duoc')) return true;
    }
    return false;
  }
  function effTarget() { return curTgt || fbTgt; }

  // Đồ thị cửa: graph[from][to] = khóa ô cửa trong bản đồ `from`
  var graphCache = null;
  function doorGraph() {
    if (graphCache) return graphCache;
    var g = {}, defs = window.MAPDEF || {};
    Object.keys(defs).forEach(function (id) {
      g[id] = {};
      var doors = defs[id].doors || {};
      Object.keys(doors).forEach(function (k) { if (!g[id][doors[k].to]) g[id][doors[k].to] = k; });
    });
    graphCache = g;
    return g;
  }
  // TUYẾN ĐƯỜNG ĐẦY ĐỦ (Lane R): BFS trả CẢ tuyến [from, ..., to] (có cache) —
  // mũi tên cần biết không chỉ cửa chặng đầu mà cả ĐÍCH CUỐI và còn mấy nơi phải
  // qua, để nhãn không gây hiểu lầm. Đổi bản đồ là targetFor tự định tuyến lại.
  var pathCache = {};
  function routePath(fromMap, toMap) {
    if (fromMap === toMap) return [fromMap];
    var ck = fromMap + '>' + toMap;
    if (ck in pathCache) return pathCache[ck];
    var g = doorGraph();
    var prev = {}, seen = {}, q = [fromMap];
    seen[fromMap] = true; prev[fromMap] = null;
    while (q.length) {
      var cur = q.shift();
      if (cur === toMap) break;
      Object.keys(g[cur] || {}).forEach(function (nx) {
        if (!seen[nx]) { seen[nx] = true; prev[nx] = cur; q.push(nx); }
      });
    }
    var out = null;
    if (seen[toMap]) {
      out = [];
      var n = toMap;
      while (n) { out.unshift(n); n = prev[n]; }
    }
    pathCache[ck] = out;
    return out;
  }
  // Ô cửa trên bản đồ `fromMap` dẫn sang `hop` (khóa 'tx,ty' → tọa độ thế giới).
  function doorTileFor(fromMap, hop) {
    var key = (doorGraph()[fromMap] || {})[hop];
    if (!key) return null;
    var p = key.split(',');
    return { x: (+p[0] + 0.5) * TILE, y: (+p[1] + 0.5) * TILE };
  }

  /* ---------- Nhắc nút cho bước KHÔNG có đích không gian (Lane R) ---------- */
  // Bước điện thoại/chờ: không có tọa độ để chỉ mũi tên. Thay vì im lặng biến
  // mất, guide nhấp nháy nhẹ nút thao tác tương ứng (📱) + nút 🧭 (nơi xem lại
  // bước) bằng Web Animations — tự hủy khi bước đổi. GUIDE.uiCue() cho harness.
  var cueAnims = {};
  function pulseBtn(id, on) {
    var el = $(id);
    if (!el || typeof el.animate !== 'function') return;
    var cur = cueAnims[id];
    if (on && !cur) {
      try {
        cueAnims[id] = el.animate([
          { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255,205,64,0)' },
          { transform: 'scale(1.22)', boxShadow: '0 0 0 5px rgba(255,205,64,.55)' }
        ], { duration: 650, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
      } catch (e) {}
    } else if (!on && cur) {
      try { cur.cancel(); } catch (e) {}
      delete cueAnims[id];
    }
  }
  var cueState = { active: false, phone: false, step: '', arrowOff: false };
  function syncCues() {
    var phone = false, compass = false, label = '';
    var T = effTarget();
    if (curIdx >= 0) label = (steps[curIdx] || {}).label || '';
    // Lane X (e): mũi tên đang TẮT (kể cả do bản lưu cũ) mà vẫn còn nhiệm vụ
    // có đích → nhấp nháy 🧭 nhắc, thay vì im lặng như trước (bản dò: tắt mũi
    // tên lúc đang có nhiệm vụ cho 0 animation, 0 cue). Tôn trọng lựa chọn
    // tắt — chỉ nhắc, không tự bật lại.
    var arrowOff = !!(!arrowOn && curIdx >= 0 && T);
    if (arrowOff) compass = true;
    if (curIdx >= 0 && !T && !isFree) {
      compass = true;
      var s = steps[curIdx] || {};
      if (s.ui === 'phone') phone = true;
      // Chương 3: nhịp truyện do rel.js đẩy qua mục tiêu chữ — mục tiêu nhắc mở
      // ĐIỆN THOẠI thì cũng nhắc nút 📱.
      if (!phone && /📱|ĐIỆN THOẠI/i.test(objectiveText)) phone = true;
    }
    // Lane AC: đã TỚI ĐÚNG NƠI gặp (đích dự phòng kiểu 'meet' cùng bản đồ) —
    // cuộc gặp mở bằng nút 💗 Tình cảm (cảnh gặp do rel.js chạy), nên nhắc
    // đúng nút đó thay vì để người chơi đứng giữa quán không biết làm gì.
    var relPulse = meetPulseNow();
    // `active` = "đang có cue HÀNH ĐỘNG chạy" (la bàn 🧭 hoặc nút 💗) — trước
    // đây active chỉ là kênh la bàn nên ở bước quan hệ nó luôn false dù xung
    // 💗 đang chạy, cổng QA đọc active=false tưởng cue chết (harness-nav
    // liveRelPulse). pulseBtn của 🧭 vẫn chỉ do compass điều khiển như cũ.
    cueState = { active: compass || relPulse, compass: compass, phone: phone, step: label, arrowOff: arrowOff, rel: relPulse };
    pulseBtn('btn-phone', phone);
    pulseBtn('btn-guide', compass);
    pulseBtn('btn-rel', relPulse);
  }
  /* Điều kiện xung 💗 TÍNH TRỰC TIẾP (không qua cache của refresh): đích dự
     phòng là người chưa gặp + người chơi ĐÃ Ở ĐÚNG bản đồ của người đó.
     cueState chỉ cập nhật khi refresh qua cổng chữ ký nên trên máy chậm mẫu
     cue lấy được có thể cũ hơn chip (chip tính trực tiếp mỗi lần đọc) — đó là
     lý do cổng QA bắt được rel=false chớp nhoáng ở izakaya 2 lượt liên tiếp
     trong khi chữ chip luôn đúng. uiCue() + syncRelCue() dùng hàm này. */
  function meetPulseNow() {
    return !!(!curTgt && fbTgt && fbTgt.kind === 'meet' && curMapId() === fbTgt.map);
  }
  function syncRelCue() {
    var rel = meetPulseNow();
    if (rel === cueState.rel) return;
    cueState.rel = rel;
    cueState.active = !!cueState.compass || rel;
    pulseBtn('btn-rel', rel);
  }

  /* ---------- Vẽ bảng hướng dẫn ---------- */
  function renderPanel() {
    var box = $('guide-steps');
    if (!box) return;
    if (curIdx < 0) {
      box.innerHTML = '<li class="done-all">🎉 Đã xong các bước chính — tự do khám phá, hoặc xem mục tiêu: ' + esc(objectiveText || '…') + '</li>';
      return;
    }
    var from = Math.max(0, curIdx - 1), to = Math.min(steps.length, curIdx + 3), html = '';
    for (var i = from; i < to; i++) {
      var cls = i < curIdx ? 'done' : (i === curIdx ? 'cur' : 'next');
      var num = i < curIdx ? '✓' : (i + 1);
      html += '<li class="' + cls + '"><span class="gs-num">' + num + '</span><span class="gs-txt">' + esc(steps[i].label) + '</span></li>';
    }
    box.innerHTML = html;
    var title = $('guide-title');
    if (title) title.textContent = '🧭 Hướng dẫn — bước ' + (curIdx + 1) + '/' + steps.length;
  }

  var refreshQueued = false;
  function scheduleRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    setTimeout(function () { refreshQueued = false; refresh(); }, 60);
  }
  function refresh() {
    // Nguồn trạng thái CHUẨN: window.STORY.state() (story.js xuất bản đầy đủ
    // chương/cờ/sổ tay/kỳ thi — window.FLOW chỉ có flags() rút gọn, không đủ dựng bước).
    if (!window.STORY || !window.STORY.state) return;
    var st;
    try { st = window.STORY.state(); } catch (e) { return; }
    var f = st.flags || {}, c = st.ch2 || {}, t = st.tenancy || {};
    // Lane AC: chữ ký TRƯỚC ĐÂY không chứa trạng thái REL — mà toàn bộ diễn
    // biến Chương 3 (nhịp A/B/C, đổ vỡ, khóc, hồi phục, đã gặp ai, partner)
    // sống trong REL. Hệ quả trên bản thật: sang Ch3 là guide ĐÔNG CỨNG ở
    // trạng thái lúc mở chương — đích dự phòng (người chưa gặp) không bao giờ
    // xuất hiện, cue/chip không đổi nữa ("đến đây rồi mất hướng dẫn luôn").
    // Nay đưa cả rel của STORY.state lẫn bản tóm tắt REL.state() vào chữ ký:
    // bất kỳ thay đổi nào của arc cũng tính lại bước/đích/cue/chip ngay.
    var relDig = '';
    var RS0 = relStateSafe();
    if (RS0) {
      try { relDig = JSON.stringify([RS0.beats, RS0.breakup, RS0.khocDone, RS0.recovered, RS0.partner, RS0.met, RS0.courting, RS0.flirted]); } catch (e) { relDig = ''; }
    }
    // Lane AC: đưa cả BẢN ĐỒ HIỆN TẠI vào chữ ký — các cue phụ thuộc bản đồ
    // (vd nút 💗 nhấp nháy khi ĐÃ TỚI nơi gặp) phải tính lại ngay khi bước qua
    // cửa, dù trạng thái truyện không đổi; thiếu nó thì cue đứng ở giá trị của
    // bản đồ trước.
    // Lane AC (đợt QA): thêm simDi/simKy — THIẾU simDi là gốc của lỗi chip sai
    // trong KHOẢNG CHỜ sim-02: sim-01 kết thúc chỉ đổi simDi (null→'di'), chữ
    // ký cũ không đổi nên refresh bỏ qua, danh sách bước không dựng lại, bước
    // chờ "CỬA HÀNG ĐIỆN THOẠI" (buildSteps) không bao giờ thành bước hiện tại
    // — chip kẹt ở bước gặp Tuấn (harness-simfix gapStepIsSim02Wait/gapChipClear).
    var sig = JSON.stringify([st.chapter, f, c, t.simDi, t.simKy, t.simChoice, t.simBillFired, t.simTruthPending, st.exam, st.exam2, st.rel, relDig, objectiveText, curMapId()]);
    if (sig === lastSig) return;
    lastSig = sig;
    steps = buildSteps(st);
    curIdx = -1;
    for (var i = 0; i < steps.length; i++) { if (!steps[i].done()) { curIdx = i; break; } }
    curTgt = curIdx >= 0 ? resolveTarget(steps[curIdx].target) : null;
    lastChapter = st.chapter || 0;
    lastBook = st.book || {};
    // Lane X: đích dự phòng chỉ khi bước hiện tại không có đích thật.
    fbTgt = (!curTgt && lastChapter >= 3) ? ch3Fallback(st) : null;
    isFree = computeFree(st);
    renderPanel();
    syncCues();
    syncChip();
  }

  /* ---------- CHIP MỤC TIÊU 1 DÒNG (Lane X — lệnh bổ sung 08:32) ---------- */
  // #objective bị ẩn hẳn (ui.css) nên chữ mục tiêu trước đây chỉ nằm trong
  // bảng 🧭. Chip này là MỘT DÒNG duy nhất (≤ ~30px, bán trong suốt, dưới HUD,
  // trên thẻ thoại z-30) luôn hiện khi đang chơi: "🎯 <việc> · Đích: <nơi>" —
  // chữ lấy từ nhãn bước/mục tiêu sẵn có, chỉ RÚT GỌN (bỏ tiền tố chương, bỏ
  // ghi chú nút, lấy vế đầu trước " — "), không bịa nội dung. Bấm chip = mở
  // bảng 🧭 chi tiết như cũ. Hết việc → "🌸 Tự do khám phá" tĩnh, không nháy.
  var chipEl = null, chipSig = '';
  function gameStarted() {
    try { return !!(window.__demo && window.__demo.started && window.__demo.started()); } catch (e) { return false; }
  }
  function curMapId() {
    try { return (window.__demo && window.__demo.mapId && window.__demo.mapId()) || null; } catch (e) { return null; }
  }
  function shortTask(s, keepFull) {
    s = String(s || '');
    // Bỏ tiền tố "🌸 Chương 3 — " của mục tiêu rel.js (emoji là cặp surrogate
    // nên không dùng character class — quét lười tới "Chương 3 — " ở đầu câu).
    if (s.indexOf('Chương 3') >= 0 && s.indexOf('Chương 3') < 8) s = s.replace(/^.*?Chương 3\s*—\s*/, '');
    s = s.replace(/\s*\(nút 📱 góc phải\)/g, '');
    if (!keepFull) {
      var head = s.split(' — ')[0];
      if (head && head.length >= 10 && head.length < s.length) s = head;
    }
    return s.trim();
  }
  function destText() {
    var T = effTarget();
    if (!T) return '';
    var nm = ((T.kind === 'npc' || T.kind === 'meet') && T.label) ? T.label : '';
    var here = curMapId();
    // Đích CÙNG bản đồ: chỉ ghi tên người/vật — người chơi đã ở nơi này rồi,
    // ghi lại tên nơi chỉ tổ chật chip và làm cụt phần việc (bản chạy đầu cho
    // ra "…chia tay với BỐ…" ở sân bay).
    if (here && T.map === here) return nm || placeName(T.map);
    var pl = placeName(T.map);
    var dest = nm ? (pl ? nm + ' · ' + pl : nm) : pl;
    if (here) {
      var path = routePath(here, T.map);
      if (path && path.length > 2) dest += ' · còn ' + (path.length - 2) + ' nơi';
    }
    return dest;
  }
  function chipInfo() {
    if (!gameStarted()) return { visible: false, text: '', free: false };
    if (isFree) return { visible: true, text: '🌸 Tự do khám phá', free: true };
    if (curIdx < 0) return { visible: false, text: '', free: false };
    var s = steps[curIdx] || {};
    var T = effTarget();
    // Lane AC: đích dự phòng là NGƯỜI CHƯA GẶP (kind 'meet') — chip phải nói
    // thẳng VIỆC cần làm là đi gặp ai + gặp bằng cách nào, thay vì mượn nhãn
    // bước mơ hồ của rel.js. ĐÃ ở đúng nơi gặp: cuộc gặp mở qua mục 💗 Tình
    // cảm (không có NPC đứng chờ trên bản đồ — vd Ren ở izakaya chỉ gặp qua
    // mục đó), chip ghi đúng thao tác; CHƯA tới nơi: ghi người + nơi như đích
    // thường.
    if (!curTgt && fbTgt && fbTgt.kind === 'meet') {
      var meetName = fbTgt.label || 'người ấy';
      if (curMapId() === fbTgt.map) {
        return { visible: true, text: '🎯 Gặp ' + meetName + ' — mở 💗 Tình cảm, chọn “Gặp”', free: false };
      }
      var mPlace = placeName(fbTgt.map), mSuffix = mPlace;
      var mHere = curMapId();
      if (mHere) { var mPath = routePath(mHere, fbTgt.map); if (mPath && mPath.length > 2) mSuffix += ' · còn ' + (mPath.length - 2) + ' nơi'; }
      var mText = '🎯 Tới gặp ' + meetName + (mSuffix ? ' · Đích: ' + mSuffix : '');
      if (mText.length > 64) mText = mText.slice(0, 63).replace(/\s+\S*$/, '') + '…';
      return { visible: true, text: mText, free: false };
    }
    var isPhone = !T && (s.ui === 'phone' || (lastChapter >= 3 && /📱|ĐIỆN THOẠI/i.test(objectiveText)));
    var task = shortTask(s.label, isPhone);
    var suffix = '';
    if (T) { var d = destText(); if (d) suffix = 'Đích: ' + d; }
    else if (isPhone) suffix = '📱 trong điện thoại';
    // Cắt ở phần VIỆC để hậu tố ĐÍCH không bao giờ bị chém ngang (bản chạy đầu
    // cho ra "…trong điện…" cụt nghĩa); toàn dòng ≤ ~62 ký tự.
    var room = 62 - 3 - (suffix ? suffix.length + 3 : 0);
    if (task.length > room) task = task.slice(0, Math.max(8, room - 1)).replace(/\s+\S*$/, '') + '…';
    var text = '🎯 ' + task + (suffix ? ' · ' + suffix : '');
    if (text.length > 64) text = text.slice(0, 63).replace(/\s+\S*$/, '') + '…';
    return { visible: true, text: text, free: false };
  }
  function syncChip() {
    if (!chipEl) return;
    var info = chipInfo();
    var sig = (info.visible ? '1' : '0') + '|' + info.text;
    if (sig === chipSig) return;
    chipSig = sig;
    chipEl.textContent = info.text;
    chipEl.classList.toggle('show', info.visible);
  }

  /* ---------- Điểm nối âm thanh hướng dẫn (lane âm thanh sẽ nạp GUIDE_VOICE) ---------- */
  function syncVoiceBtn() {
    var b = $('guide-voice');
    if (!b) return;
    var ok = !!(window.GUIDE_VOICE && typeof window.GUIDE_VOICE.playCurrent === 'function');
    b.style.display = ok ? '' : 'none';
  }

  /* ---------- Khởi tạo DOM: mở/đóng bảng (Lane P) + HUD gọn + cài đặt ---------- */
  function init() {
    // Chip mục tiêu 1 dòng (Lane X): guide.js tự tạo phần tử (khỏi sửa
    // index.html) — bấm chip = bật/tắt bảng 🧭 chi tiết như bấm #btn-guide.
    if (!$('guide-chip')) {
      chipEl = document.createElement('button');
      chipEl.type = 'button';
      chipEl.id = 'guide-chip';
      chipEl.setAttribute('aria-label', 'Mục tiêu hiện tại — bấm để xem hướng dẫn chi tiết');
      chipEl.addEventListener('click', function () {
        var p = $('guide');
        if (p) p.classList.toggle('open');
      });
      document.body.appendChild(chipEl);
    } else chipEl = $('guide-chip');
    var panel = $('guide');
    if (panel) {
      // Lane P (01/11): bảng ẩn hẳn theo mặc định (CSS display:none, chỉ .open
      // mới hiện) — mở/đóng qua biểu tượng 🧭, nút ✕ và bấm ra ngoài bảng.
      panel.classList.remove('open');
      var gb = $('btn-guide');
      if (gb) gb.addEventListener('click', function () { panel.classList.toggle('open'); });
      var gc = $('guide-close');
      if (gc) gc.addEventListener('click', function () { panel.classList.remove('open'); });
      document.addEventListener('click', function (e) {
        if (!panel.classList.contains('open')) return;
        var t = e.target;
        // #guide-chip cũng là nút MỞ bảng (Lane X) — không tính là "bấm ra ngoài".
        if (t && t.closest && (t.closest('#guide') || t.closest('#btn-guide') || t.closest('#guide-chip'))) return;
        panel.classList.remove('open');
      });
      var vb = $('guide-voice');
      if (vb) vb.addEventListener('click', function () {
        if (window.GUIDE_VOICE && typeof window.GUIDE_VOICE.playCurrent === 'function') window.GUIDE_VOICE.playCurrent();
      });
    }
    // HUD: mặc định GỌN; nút #btn-hud bung đủ (lưu lựa chọn)
    var hudFull = lsGet(LS_HUD, '0') === '1';
    document.body.classList.toggle('hud-full', hudFull);
    var hb = $('btn-hud');
    if (hb) {
      hb.textContent = hudFull ? '▴' : '▾';
      hb.addEventListener('click', function () {
        var on = document.body.classList.toggle('hud-full');
        hb.textContent = on ? '▴' : '▾';
        lsSet(LS_HUD, on ? '1' : '0');
      });
    }
    // Cài đặt: mũi tên chỉ đường
    var sa = $('set-guide-arrow');
    if (sa) {
      sa.checked = arrowOn;
      sa.addEventListener('change', function () {
        arrowOn = sa.checked;
        lsSet(LS_ARROW, arrowOn ? '1' : '0');
        syncCues();   // Lane X: nhắc 🧭 bật/tắt ngay, khỏi chờ refresh (refresh bỏ qua khi chữ ký không đổi)
        syncChip();
      });
    }
    // Cài đặt: cỡ hình (zoom) — qua WORLD2D.setZoom của engine
    var sz = $('set-zoom'), szv = $('set-zoom-val');
    if (sz) {
      var z0 = (window.WORLD2D && window.WORLD2D.getZoom) ? window.WORLD2D.getZoom() : 1.35;
      sz.value = Math.round(z0 * 100);
      if (szv) szv.textContent = z0.toFixed(2) + '×';
      sz.addEventListener('input', function () {
        var z = (window.WORLD2D && window.WORLD2D.setZoom) ? window.WORLD2D.setZoom(sz.value / 100) : (sz.value / 100);
        if (szv) szv.textContent = z.toFixed(2) + '×';
      });
    }
    refresh();
    syncVoiceBtn();
    syncChip();
    setInterval(function () { refresh(); syncRelCue(); syncVoiceBtn(); syncChip(); }, 400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* ---------- API cho engine + harness ---------- */
  window.GUIDE = {
    refresh: refresh,
    steps: function () { return steps.map(function (s, i) { return { label: s.label, done: i < curIdx, current: i === curIdx }; }); },
    currentIndex: function () { return curIdx; },
    currentText: function () { return curIdx >= 0 ? steps[curIdx].label : (objectiveText || ''); },
    objectiveText: function () { return objectiveText; },
    arrowOn: function () { return arrowOn; },
    setArrow: function (on) {
      arrowOn = !!on;
      lsSet(LS_ARROW, arrowOn ? '1' : '0');
      var sa = $('set-guide-arrow'); if (sa) sa.checked = arrowOn;
      syncCues();   // Lane X: cập nhật nhắc 🧭 ngay (refresh() bỏ qua khi chữ ký truyện không đổi)
      syncChip();
    },
    // engine gọi mỗi khung hình: trả {x,y,label,hops} của đích cần chỉ trong bản
    // đồ `mapId` — đích thật nếu cùng bản đồ (hops=0, engine tự ghi "≈N bước"
    // theo đường đi); khác bản đồ thì là ô CỬA đúng tuyến BFS, nhãn ghi ĐÍCH
    // CUỐI + số nơi còn phải qua, hops = số chặng còn lại (engine KHÔNG ghi số
    // bước cho trường hợp này — tránh hiểu lầm sắp tới đích).
    targetFor: function (mapId) {
      if (!arrowOn) return null;
      var T = effTarget();   // Lane X: đích thật của bước, else đích dự phòng Ch3
      if (!T) return null;
      // Lane AC: đích 'meet' MÀ NGƯỜI CHƠI ĐÃ Ở ĐÚNG BẢN ĐỒ ĐÓ — KHÔNG chỉ
      // mũi tên vào điểm spawn trống (ở đó không có ai đứng chờ; cuộc gặp mở
      // qua 💗 Tình cảm). Trả null để mũi tên/vệt chấm tắt hẳn, chip + nút 💗
      // nhấp nháy gánh phần chỉ dẫn (đúng bản chất thao tác).
      if (T.kind === 'meet' && T.map === mapId) return null;
      if (T.map === mapId) return { x: T.x, y: T.y, label: T.label || '', hops: 0 };
      var path = routePath(mapId, T.map);
      if (!path || path.length < 2) return null;
      var hop = path[1];
      var tile = doorTileFor(mapId, hop);
      if (!tile) return null;
      var label;
      if (path.length === 2) {
        // Cửa này vào thẳng nơi đích: biển cửa + tên người cần gặp (nếu là NPC).
        label = placeDoorText(hop);
        if ((T.kind === 'npc' || T.kind === 'meet') && T.label) label += ' · ' + T.label;
      } else {
        var fin = placeName(T.map);
        if ((T.kind === 'npc' || T.kind === 'meet') && T.label) fin += ' — ' + T.label;
        label = placeDoorText(hop) + ' · đích: ' + fin + ' · qua ' + (path.length - 2) + ' nơi nữa';
      }
      return { x: tile.x, y: tile.y, label: label, hops: path.length - 1 };
    },
    // Lane R — cho harness/kiểm kê: tuyến BFS đầy đủ giữa hai bản đồ (hoặc null).
    route: function (fromMap, toMap) { return routePath(fromMap, toMap); },
    // Lane R — trạng thái nhắc nút khi bước hiện tại không có đích không gian.
    // Lane X: thêm arrowOff (mũi tên đang tắt mà còn nhiệm vụ có đích → 🧭 đang nhắc).
    uiCue: function () { var rel = meetPulseNow(); return { active: !!cueState.compass || rel, phone: cueState.phone, step: cueState.step, arrowOff: cueState.arrowOff, rel: rel }; },
    currentTarget: function () { return effTarget(); },
    // Lane X — trạng thái chip mục tiêu 1 dòng + cờ tự do (cho harness).
    chip: function () { var i = chipInfo(); return { visible: i.visible, text: i.text, free: i.free }; },
    fallbackTarget: function () { return fbTgt; }
  };
})();
