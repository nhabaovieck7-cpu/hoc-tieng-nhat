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
      d.push({ label: 'Ra PHỐ MUA SẮM — gặp anh Tuấn "môi giới" gần cửa ngân hàng', target: { scene: 'sim-01-loi-ru' }, done: function () { return !!t.simChoice; } });
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
  var cueState = { active: false, phone: false, step: '' };
  function syncCues() {
    var phone = false, compass = false, label = '';
    if (curIdx >= 0 && !curTgt) {
      var s = steps[curIdx] || {};
      label = s.label || '';
      compass = true;
      if (s.ui === 'phone') phone = true;
      // Chương 3: nhịp truyện do rel.js đẩy qua mục tiêu chữ — mục tiêu nhắc mở
      // ĐIỆN THOẠI thì cũng nhắc nút 📱.
      if (!phone && /📱|ĐIỆN THOẠI/i.test(objectiveText)) phone = true;
    }
    cueState = { active: compass, phone: phone, step: label };
    pulseBtn('btn-phone', phone);
    pulseBtn('btn-guide', compass);
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
    var sig = JSON.stringify([st.chapter, f, c, t.simChoice, t.simBillFired, t.simTruthPending, st.exam, st.exam2, objectiveText]);
    if (sig === lastSig) return;
    lastSig = sig;
    steps = buildSteps(st);
    curIdx = -1;
    for (var i = 0; i < steps.length; i++) { if (!steps[i].done()) { curIdx = i; break; } }
    curTgt = curIdx >= 0 ? resolveTarget(steps[curIdx].target) : null;
    renderPanel();
    syncCues();
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
        if (t && t.closest && (t.closest('#guide') || t.closest('#btn-guide'))) return;
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
    setInterval(function () { refresh(); syncVoiceBtn(); }, 400);
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
    },
    // engine gọi mỗi khung hình: trả {x,y,label,hops} của đích cần chỉ trong bản
    // đồ `mapId` — đích thật nếu cùng bản đồ (hops=0, engine tự ghi "≈N bước"
    // theo đường đi); khác bản đồ thì là ô CỬA đúng tuyến BFS, nhãn ghi ĐÍCH
    // CUỐI + số nơi còn phải qua, hops = số chặng còn lại (engine KHÔNG ghi số
    // bước cho trường hợp này — tránh hiểu lầm sắp tới đích).
    targetFor: function (mapId) {
      if (!arrowOn || !curTgt) return null;
      if (curTgt.map === mapId) return { x: curTgt.x, y: curTgt.y, label: curTgt.label || '', hops: 0 };
      var path = routePath(mapId, curTgt.map);
      if (!path || path.length < 2) return null;
      var hop = path[1];
      var tile = doorTileFor(mapId, hop);
      if (!tile) return null;
      var label;
      if (path.length === 2) {
        // Cửa này vào thẳng nơi đích: biển cửa + tên người cần gặp (nếu là NPC).
        label = placeDoorText(hop);
        if (curTgt.kind === 'npc' && curTgt.label) label += ' · ' + curTgt.label;
      } else {
        var fin = placeName(curTgt.map);
        if (curTgt.kind === 'npc' && curTgt.label) fin += ' — ' + curTgt.label;
        label = placeDoorText(hop) + ' · đích: ' + fin + ' · qua ' + (path.length - 2) + ' nơi nữa';
      }
      return { x: tile.x, y: tile.y, label: label, hops: path.length - 1 };
    },
    // Lane R — cho harness/kiểm kê: tuyến BFS đầy đủ giữa hai bản đồ (hoặc null).
    route: function (fromMap, toMap) { return routePath(fromMap, toMap); },
    // Lane R — trạng thái nhắc nút khi bước hiện tại không có đích không gian.
    uiCue: function () { return { active: cueState.active, phone: cueState.phone, step: cueState.step }; },
    currentTarget: function () { return curTgt; }
  };
})();
