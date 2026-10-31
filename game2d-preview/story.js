// story.js — MÁY TRUYỆN ĐẦY ĐỦ «Tuổi Trẻ Ở Nhật» (đợt máy truyện 31/10/2026, thay flow.js rút gọn).
// Theo THIET-KE-MO-RONG (b): trạng thái truyện gồm chương · cảnh đã xong · Sổ lời hứa (§6e) ·
// Sổ cám dỗ (§6f) · sự kiện chờ (hậu quả đến sau) · mốc thi. Tiến độ lưu ở localStorage với
// khóa `story` ĐÚNG hình dạng đã thiết kế cho /game/progress:
//   story: { doneScenes[], kaiwaBest{}, battlesWon[], quizzesPassed[], chaptersDone[],
//            endings[], chapterPct{}, updatedAt }
// (khi nối máy chủ, chỉ các trường chuẩn trên được đồng bộ; phần `runtime` là trạng thái máy
// cục bộ của staging: chương, cờ, sổ, lịch sự kiện, mốc thi, XP truyện.)
// Bản lưu cũ vẫn nạp được: dạng flow rút gọn (có `step`) và dạng mẫu kiểm chứng
// (map/visitedMaps/doneScenes/stats) đều có đường CHUYỂN ĐỔI rõ ràng trong migrateSave().
// Hợp đồng với engine giữ nguyên như flow.js: window.FLOW {onGameStart, onSceneEnd,
// handleScene, onMapEnter, setFlag, step, flags} — step() được SUY từ cờ để các harness cũ
// vẫn đọc đúng 0..9 trên toàn mạch mẫu. Mạch mẫu cũ chạy qua máy này KHÔNG mất cảnh nào:
// sân bay → máy bay → phòng trọ → Hùng → combini → điện thoại → nghe ở ga → quiz rác →
// (mới) gọi về nhà 1.9 → đăng ký địa chỉ 1.5 → MỐC THI N5 1.14 → tổng kết Ch1 → Chương 2 + SIM.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var SAVE_KEY = 'tuoitre2d_save_v1';
  var P = null;

  /* ================= TRẠNG THÁI ================= */
  function newState() {
    return {
      chapter: 0,                    // 0 = đang ở mở đầu/Chương 1; tăng khi qua tổng kết chương
      flags: {
        famDone: false, loverDone: false, boarded: false, flown: false, arrived: false,
        introDone: false, hungDone: false, combiniDone: false, phoneReplied: false,
        vendingPaid: false, listenDone: false, gomiDone: false,
        officerDone: false, callHomeDone: false, workDay1: false
      },
      book: { loiHuaGiaDinh: null, loiHuaSanBay: null, quaLuuNiem: null },   // SỔ LỜI HỨA (§6e)
      tenancy: {                     // SỔ CÁM DỖ — vụ SIM (§6f, cảnh 6f-01)
        simDi: null, simKy: null, simChoice: null,      // null | 'tu-choi' | 'ky'
        simXuly: null, simBillFired: false, simTruth: null, simTruthPending: false
      },
      ch2: {                         // XƯƠNG SỐNG CHƯƠNG 2 (đợt Ch2 trọn vẹn 31/10/2026)
        salaryDone: false, sent: null,          // sent: null | 'gan-het' | 'vua' | 'it' (cờ gui-tien)
        sentMsgPending: false,                  // tin nhắn của Mẹ sau khi gửi tiền đang chờ trả lời
        tvDone: false, tuan2: null,             // tuan2: null | 'tu-choi' | 'o-mo' | 'im-lang' (cờ tuan-keo-2)
        bonenkaiDone: false,                    // 忘年会 với công ty (giai đoạn 6) — tháng 12, sau lương đầu, trước gọi Tết
        romanceDone: false, tetDone: false
      },
      doneScenes: [], kaiwaBest: {}, battlesWon: [], quizzesPassed: [],
      chaptersDone: [], endings: [], chapterPct: {},
      life: null,                    // ĐI LẠI + MÙA + XÃ HỘI (life.js): {photos, donghuongCount, inviteCycle, hanamiDone, momijiDone, ledger} — bản lưu cũ không có → null
      rel: null,                     // TUYẾN TÌNH CẢM CHƯƠNG 3 (rel.js): {aff{affection.<id>}, stage{relation.<id>}, partner, care*, beats, breakup, recovered, gifts, ledger} — bản lưu cũ không có → null
      pantry: null,                  // KHO SIÊU THỊ (market.js): {cart, stock, beersToday, drunk, instances, ledger} — bản lưu cũ không có → null = kho trống
      style: null,                   // HỆ NGOẠI HÌNH + TỦ ĐỒ (style.js): {base, owned, instances[uid/tradeable], ledger[reason code], top/bottom/accs/fxOn, greeted} — bản lưu cũ không có → null = mặc định theo tuyến
      sched: [],                     // sự kiện chờ: {id, at (mốc doneScenes), fired}
      exam: { attempts: 0, passed: false, best: 0, needReview: false },       // mốc thi N5 (1.14)
      exam2: { attempts: 0, passed: false, best: 0, needReview: false },      // mốc thi N4 (cuối Chương 2 — cùng khuôn N5)
      xp: 0, visited: []
    };
  }
  var S = newState();
  function has(list, x) { return list.indexOf(x) >= 0; }
  function markDone(id) { if (!has(S.doneScenes, id)) S.doneScenes.push(id); }
  function addQuiz(id) { if (!has(S.quizzesPassed, id)) S.quizzesPassed.push(id); }

  /* ================= LƯU / NẠP / CHUYỂN ĐỔI ================= */
  function pubStory() {
    return {
      doneScenes: S.doneScenes.slice(), kaiwaBest: S.kaiwaBest, battlesWon: S.battlesWon.slice(),
      quizzesPassed: S.quizzesPassed.slice(), chaptersDone: S.chaptersDone.slice(),
      endings: S.endings.slice(), chapterPct: S.chapterPct, updatedAt: Date.now()
    };
  }
  function save() {
    try {
      var map = (window.__demo && window.__demo.mapId) ? window.__demo.mapId() : null;
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        story: pubStory(),
        runtime: {
          chapter: S.chapter, flags: S.flags, book: S.book, tenancy: S.tenancy, ch2: S.ch2,
          sched: S.sched, exam: S.exam, exam2: S.exam2, xp: S.xp, visited: S.visited, style: S.style, pantry: S.pantry, life: S.life, rel: S.rel
        },
        stats: window.GAMEUI ? window.GAMEUI.stats() : null,
        map: map, visitedMaps: S.visited.slice(), doneScenes: S.doneScenes.slice(),
        savedAt: Date.now()
      }));
    } catch (e) { /* localStorage không khả dụng — chơi tiếp trong phiên */ }
  }
  // Ánh xạ cảnh → cờ (dùng khi chuyển đổi bản lưu chỉ biết danh sách cảnh đã xong)
  var SCENE_FLAG = {
    'airport-family': 'famDone', 'airport-lover': 'loverDone', 'airport-gate': 'boarded',
    'flight': 'flown', 'intro': 'introDone', 'hung': 'hungDone', 'combini': 'combiniDone',
    'vending': 'vendingPaid', 'officer': 'officerDone', 'call-home': 'callHomeDone', 'kaigo-mai': 'workDay1'
  };
  function migrateSave(raw) {
    if (!raw || typeof raw !== 'object') return null;
    var st = newState();
    if (raw.runtime && typeof raw.runtime === 'object') {           // dạng máy truyện hiện tại
      var r = raw.runtime;
      st.chapter = r.chapter | 0;
      Object.assign(st.flags, r.flags || {}); Object.assign(st.book, r.book || {});
      Object.assign(st.tenancy, r.tenancy || {}); Object.assign(st.exam, r.exam || {});
      Object.assign(st.ch2, r.ch2 || {}); Object.assign(st.exam2, r.exam2 || {});   // bản lưu cũ (chưa có ch2/exam2) → nhận mặc định sạch từ newState()
      st.style = (r.style && typeof r.style === 'object') ? r.style : null;          // bản lưu cũ chưa có style → null, style.js tự dựng mặc định
      st.pantry = (r.pantry && typeof r.pantry === 'object') ? r.pantry : null;      // bản lưu cũ chưa có pantry → null, market.js tự dựng kho trống
      st.life = (r.life && typeof r.life === 'object') ? r.life : null;               // bản lưu cũ chưa có life → null, life.js tự dựng mặc định
      st.rel = (r.rel && typeof r.rel === 'object') ? r.rel : null;                  // bản lưu cũ chưa có rel → null, rel.js tự dựng mặc định
      st.sched = Array.isArray(r.sched) ? r.sched : []; st.xp = r.xp | 0;
      st.visited = Array.isArray(r.visited) ? r.visited : [];
      if (raw.story) {
        st.doneScenes = raw.story.doneScenes || []; st.kaiwaBest = raw.story.kaiwaBest || {};
        st.battlesWon = raw.story.battlesWon || []; st.quizzesPassed = raw.story.quizzesPassed || [];
        st.chaptersDone = raw.story.chaptersDone || []; st.endings = raw.story.endings || [];
        st.chapterPct = raw.story.chapterPct || {};
      }
      return { state: st, stats: raw.stats || null, map: raw.map || null };
    }
    if (typeof raw.step === 'number') {                              // dạng flow rút gọn cũ (step 0..9)
      var f = st.flags, n = raw.step;
      if (n >= 1) { f.famDone = true; f.loverDone = true; }          // step cũ không lưu bên nào chia tay trước — không phân biệt được nên chốt cả hai từ n>=1 để cửa an ninh không kẹt oan
      if (n >= 3) { f.boarded = true; f.arrived = true; }
      if (n >= 4) f.introDone = true;
      if (n >= 5) f.hungDone = true;
      if (n >= 6) f.combiniDone = true;
      if (n >= 7) f.phoneReplied = true;
      if (n >= 8) f.listenDone = true;
      if (n >= 9) f.gomiDone = true;
      st.doneScenes = Array.isArray(raw.doneScenes) ? raw.doneScenes : [];
      st.visited = Array.isArray(raw.visitedMaps) ? raw.visitedMaps : [];
      return { state: st, stats: raw.stats || null, map: raw.map || null };
    }
    if (Array.isArray(raw.doneScenes)) {                             // dạng mẫu kiểm chứng (chỉ biết cảnh đã xong)
      st.doneScenes = raw.doneScenes.slice();
      raw.doneScenes.forEach(function (id) { if (SCENE_FLAG[id]) st.flags[SCENE_FLAG[id]] = true; });
      if (st.flags.boarded) st.flags.arrived = true;
      if (st.flags.combiniDone) st.flags.phoneReplied = true;       // mẫu cũ không lưu nhịp điện thoại
      st.visited = Array.isArray(raw.visitedMaps) ? raw.visitedMaps.slice() : [];
      return { state: st, stats: raw.stats || null, map: raw.map || null };
    }
    return null;
  }
  function loadSave() {
    try {
      var txt = localStorage.getItem(SAVE_KEY);
      if (!txt) return null;
      return migrateSave(JSON.parse(txt));
    } catch (e) { return null; }
  }
  // NẠP NGAY KHI KHỞI ĐỘNG: engine gọi enterMap → FLOW.onMapEnter (có save()) TRƯỚC
  // FLOW.onGameStart — nếu để tới onGameStart mới nạp, save() đầu tiên sẽ ghi đè bản lưu
  // tốt bằng trạng thái trống. Nạp ở đây để mọi hook đều thấy trạng thái đã khôi phục.
  var bootSave = loadSave();
  if (bootSave) S = bootSave.state;

  /* ================= MỤC TIÊU MẠCH CHÍNH ================= */
  function airportObjective() {
    var f = S.flags;
    if (!f.famDone && !f.loverDone) window.GAMEUI.setObjective('💞 Chia tay ở sân bay: tới chỗ BỐ MẸ (trái sảnh) và LINH (góc cà phê phải sảnh)');
    else if (!f.famDone) window.GAMEUI.setObjective('💞 Còn bố mẹ đang chờ ở phía trái sảnh — tới nói lời chia tay với bố mẹ');
    else if (!f.loverDone) window.GAMEUI.setObjective('💗 Còn Linh đang chờ ở góc cà phê bên phải sảnh');
    else window.GAMEUI.setObjective('✈️ Đã nói hết lời chia tay — tới CỬA AN NINH ở tường phía đông sảnh để lên máy bay');
  }
  // Mục tiêu từ sau quiz rác tới hết Chương 1 + Chương 2 (các nhịp đầu giữ nguyên như flow cũ,
  // được đặt trực tiếp trong onSceneEnd).
  function advanceObjective() {
    var f = S.flags;
    if (S.chapter >= 3) {
      if (window.REL && window.REL.objective && window.REL.objective()) return;   // tuyến tình cảm Ch3 (rel.js) dẫn nhịp ở chương này
      window.GAMEUI.setObjective('🌸 Chương 3 «Ngã rẽ» sẽ mở ở đợt truyện sau — thong thả khám phá các khu phố quanh nhà, ôn lại bài cũ, chờ những lựa chọn lớn');
      return;
    }
    if (S.chapter >= 2) {
      var t = S.tenancy, c = S.ch2;
      if (!t.simChoice) window.GAMEUI.setObjective('📱 Ra phố mua sắm — anh Tuấn "môi giới" đang chờ gần cửa ngân hàng, nghe nói có "kèo thơm" cho người mới');
      else if (t.simChoice === 'ky' && !t.simBillFired) window.GAMEUI.setObjective('📅 Những ngày bình thường trôi qua… Hãy cứ sinh hoạt, ghé vài nơi trong thị trấn — đời sống ở Nhật vẫn đang tiếp diễn');
      else if (t.simTruthPending) window.GAMEUI.setObjective('📱 Mẹ vừa nhắn tin hỏi thăm — mở điện thoại đọc và trả lời mẹ');
      else if (!c.salaryDone) window.GAMEUI.setObjective('💴 Tới kỳ lĩnh LƯƠNG ĐẦU rồi — ra NGÂN HÀNG ở phố mua sắm, tới QUẦY GIAO DỊCH kiểm tra tài khoản và gửi tiền về nhà');
      else if (c.sentMsgPending) window.GAMEUI.setObjective('📱 Mẹ nhắn tin sau khi nhận được tiền gửi — mở điện thoại đọc và trả lời mẹ');
      else if (!c.tvDone) window.GAMEUI.setObjective('📺 Tối nay về phòng trọ sớm — bật chiếc TV NHỎ trên kệ (tường phía đông phòng trọ) xem bản tin buổi tối');
      else if (!c.romanceDone) window.GAMEUI.setObjective('🏪 Ghé combini 秋葉原マート mua đồ tối — dạo này hình như Yui bắt đầu nhớ mặt khách quen rồi đấy');
      else if (!c.bonenkaiDone) window.GAMEUI.setObjective('🍻 Tháng 12 rồi — công ty mở tiệc TẤT NIÊN 忘年会 ở quán nhậu 新橋 (bảng tin trong quán) — đi dự tiệc cuối năm với sếp và đồng nghiệp đã')
      else if (!c.tetDone) window.GAMEUI.setObjective('🧧 Tết sắp tới rồi — về PHÒNG TRỌ, dùng chiếc điện thoại trên bàn thấp gọi về nhà đón giao thừa từ xa với bố mẹ');
      else if (!S.exam2.passed) window.GAMEUI.setObjective(S.exam2.needReview
        ? '📚 Thi lại mốc N4: về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại đã — rồi quay lại trường thi tiếp'
        : '🎓 Mốc thi JLPT N4 đã mở — tới TRƯỜNG TIẾNG (qua phố chính), xem BẢNG ĐEN trong lớp để vào thi, cổng cuối Chương 2');
      else window.GAMEUI.setObjective('🏆 Đã qua mốc N4 — tới TRƯỜNG TIẾNG xem BẢNG ĐEN để mở TỔNG KẾT Chương 2');
      return;
    }
    if (!f.gomiDone) return;   // trước quiz rác, mục tiêu do từng nhịp tự đặt
    if (!f.callHomeDone) window.GAMEUI.setObjective('🌙 Trời tối rồi — về PHÒNG TRỌ, bấm vào chiếc điện thoại trên bàn thấp để gọi về nhà cho bố mẹ');
    else if (!f.officerDone) window.GAMEUI.setObjective('🏢 Còn thủ tục ĐĂNG KÝ ĐỊA CHỈ ở shiyakusho (ủy ban phường) — hạn 14 ngày từ khi tới Nhật, làm xong mới yên ổn');
    else if (!S.exam.passed) window.GAMEUI.setObjective(S.exam.needReview
      ? '📚 Thi lại mốc N5: về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại đã — rồi quay lại trường thi tiếp'
      : '🎓 Mốc thi JLPT N5 đã mở — tới TRƯỜNG TIẾNG (qua phố chính), xem BẢNG ĐEN trong lớp để vào thi, cổng cuối Chương 1');
  }
  function examGateOpen() {
    return S.flags.gomiDone && S.flags.callHomeDone && S.flags.officerDone && !S.exam.passed;
  }

  /* ================= CÂU HỎI NGHE Ở GA (giữ nguyên bản mẫu — clip VOICEVOX thật) ================= */
  var listenAudio = null, listenTries = 0, listenSolved = false;
  function openListen() {
    listenTries = 0; listenSolved = false;
    $('listen-fb').textContent = ''; $('listen-fb').className = 'fb-line';
    $('listen-close').style.display = 'none';
    var box = $('listen-opts'); box.innerHTML = '';
    ['1番線', '3番線', '5番線'].forEach(function (txt, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt-btn'; b.textContent = txt;
      b.addEventListener('click', function () {
        if (listenSolved) return;
        if (i === 1) {
          listenSolved = true;
          b.classList.add('right');
          $('listen-fb').textContent = listenTries === 0 ? '✅ Chính xác! Nghe rõ từng chữ như thế này là đạt.' : '✅ Đúng rồi — đáp án: 3番線.';
          $('listen-fb').className = 'fb-line ok';
          $('listen-close').style.display = '';
        } else {
          listenTries++;
          b.classList.add('wrong');
          $('listen-fb').textContent = '❌ Chưa đúng. Nghe lại lần nữa, để ý con số ngay đầu câu nhé.';
          $('listen-fb').className = 'fb-line ng';
        }
      });
      box.appendChild(b);
    });
    $('modal-listen').classList.add('show');
    if (!listenAudio) {
      listenAudio = new Audio('audio/listen-ga-01.mp3');
      listenAudio.addEventListener('ended', function () { $('listen-eq').textContent = 'Đã phát xong — nghe lại nếu cần'; });
    }
    $('listen-play').onclick = function () {
      listenAudio.currentTime = 0;
      listenAudio.play().catch(function () {});
      $('listen-eq').textContent = '🔊 Đang phát…';
    };
    $('listen-close').onclick = function () {
      $('modal-listen').classList.remove('show');
      if (listenAudio) listenAudio.pause();
      S.flags.listenDone = true;
      addQuiz('listen-ga'); S.xp += 15;
      window.GAMEUI.apply({ jp: listenTries === 0 ? 5 : 2 }, listenTries === 0 ? 'Nghe thông báo ở ga — đúng ngay lần đầu' : 'Nghe thông báo ở ga — đúng sau khi nghe lại');
      window.GAMEUI.setObjective('🗑️ Về điểm tập kết rác (cạnh máy bán hàng đỏ) — thử phân loại rác');
      save();
    };
  }

  /* ================= QUIZ PHÂN LOẠI RÁC (giữ nguyên bản mẫu) ================= */
  var GOMI = [
    { item: '🥤 Chai nhựa PET đã uống hết', ans: 0 },
    { item: '🍌 Vỏ chuối, đồ ăn thừa', ans: 1 },
    { item: '🔋 Pin cũ, đồ điện tử nhỏ hỏng', ans: 2 }
  ];
  var CATS = ['♻️ 資源ゴミ (rác tái chế)', '🔥 燃えるゴミ (rác đốt được)', '🚯 燃えないゴミ (rác không đốt)'];
  var gomiIdx = 0, gomiScore = 0;
  function openGomi() {
    gomiIdx = 0; gomiScore = 0;
    $('quiz-close').style.display = 'none';
    $('modal-quiz').classList.add('show');
    drawGomi();
  }
  function drawGomi() {
    var fb = $('quiz-fb'); fb.textContent = ''; fb.className = 'fb-line';
    if (gomiIdx >= GOMI.length) {
      $('quiz-prog').textContent = 'Kết quả: ' + gomiScore + '/' + GOMI.length;
      $('quiz-item').textContent = gomiScore === GOMI.length ? '🎉 Chuẩn như người Nhật! Hàng xóm nhìn là nể.' : 'Xong rồi — ở Nhật, vứt sai loại là bị trả lại tận cửa kèm giấy nhắc đấy.';
      $('quiz-opts').innerHTML = '';
      $('quiz-close').style.display = '';
      return;
    }
    var it = GOMI[gomiIdx];
    $('quiz-prog').textContent = 'Món ' + (gomiIdx + 1) + '/' + GOMI.length + ' — thuộc loại nào?';
    $('quiz-item').textContent = it.item;
    var box = $('quiz-opts'); box.innerHTML = '';
    CATS.forEach(function (c, ci) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt-btn'; b.textContent = c;
      b.addEventListener('click', function () {
        if (ci === it.ans) { gomiScore++; b.classList.add('right'); fb.textContent = '✅ Đúng loại!'; fb.className = 'fb-line ok'; }
        else { b.classList.add('wrong'); fb.textContent = '❌ Sai loại rồi — đáp án đúng đã được tô xanh.'; fb.className = 'fb-line ng'; box.querySelectorAll('.opt-btn').forEach(function (x, xi) { if (xi === it.ans) x.classList.add('right'); }); }
        box.querySelectorAll('.opt-btn').forEach(function (x) { x.disabled = true; });
        setTimeout(function () { gomiIdx++; drawGomi(); }, 1100);
      });
      box.appendChild(b);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    var qc = $('quiz-close');
    if (qc) qc.addEventListener('click', function () {
      $('modal-quiz').classList.remove('show');
      if (!S.flags.gomiDone) {
        S.flags.gomiDone = true;
        addQuiz('gomi'); S.xp += 10;
        if (gomiScore === GOMI.length) window.GAMEUI.apply({ jp: 3, hp: 2 }, 'Phân loại rác chuẩn Nhật');
        else window.GAMEUI.apply({ jp: 1 }, 'Đã thử phân loại rác — về xem lại bảng hướng dẫn nhé');
      }
      advanceObjective();
      save();
      setTimeout(function () { window.GAMEUI.showSummary(); }, 700);   // giữ nhịp tổng kết giữa chặng của bản mẫu
    });
    var ec = $('exam-close');
    if (ec) ec.addEventListener('click', function () { $('modal-exam').classList.remove('show'); examRun = null; advanceObjective(); });
    var en = $('exam-next');
    if (en) en.addEventListener('click', function () {
      if (!examRun) return;
      examRun.idx++;
      if (examRun.idx >= examRun.list.length) finishExam(); else drawExamQ();
    });
    var ech = $('exam-chapter');
    if (ech) ech.addEventListener('click', function () {
      $('modal-exam').classList.remove('show');
      examRun = null;
      if (examDoneLevel === 'N4') completeChapter2(); else completeChapter1();
    });
    var cn = $('chapter-next');
    if (cn) cn.addEventListener('click', function () {
      $('modal-chapter').classList.remove('show');
      var target = nextChapterTarget;
      S.chapter = target;
      save();
      advanceObjective();
      setTimeout(function () { if (window.__demo) window.__demo.scene(target === 3 ? 'ch3-opening' : 'ch2-opening'); }, 600);
    });
  });

  /* ================= MỐC THI JLPT (1.14 = N5 · cuối Ch2 = N4) — đề THẬT của web =================
     Một máy thi dùng chung cho mọi cấp (KHUNG §4.3): ngân hàng câu thật theo cấp
     (exam-n5.js / exam-n4.js), mỗi lượt rút 10 câu (chữ 4 · pháp 4 · đọc 2), tráo đáp án,
     đỗ ≥ 6/10; trượt → ôn ở bàn học phòng trọ rồi thi lại, lệ phí thi lại 7.500 yên
     (không đủ tiền thì thầy đóng hộ) — không bao giờ kẹt chết. */
  var EXAM_N = 12, EXAM_PASS = 7, EXAM_FEE = 0.75;   // từ giai đoạn 5 (31/10): mỗi lượt 12 câu = chữ 4 + pháp 4 + đọc 2 + NGHE 2; đỗ ≥ 7/12   // lệ phí thi lại 7.500 yên — mức lệ phí JLPT hiện hành tại Nhật
  var examRun = null, examDoneLevel = 'N5', nextChapterTarget = 2;
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function examBank(level) { return level === 'N4' ? window.EXAM_N4 : window.EXAM_N5; }
  function examState(level) { return level === 'N4' ? S.exam2 : S.exam; }
  function buildExamList(level) {
    var bank = examBank(level), bySec = {};
    (bank ? bank.questions : []).forEach(function (q) { (bySec[q.section] = bySec[q.section] || []).push(q); });
    var want = [['文字・語彙', 4], ['文法', 4], ['読解', 2]], picked = [];
    // PHẦN NGHE (giai đoạn 5): rút 2 câu nghe từ ngân hàng LISTEN_N5/N4 (listen.js — clip VOICEVOX thật)
    var lBank = level === 'N4' ? window.LISTEN_N4 : window.LISTEN_N5;
    if (lBank) shuffle(lBank.slice()).slice(0, 2).forEach(function (q) {
      picked.push({ section: '聴解', question: q.q, audio: q.audio, script: q.script, explain_vi: q.explain, choices: q.choices.slice(), answer: q.answer, listen: true });
    });
    want.forEach(function (w) { shuffle((bySec[w[0]] || []).slice()).slice(0, w[1]).forEach(function (q) { picked.push(q); }); });
    if (picked.length < EXAM_N) {   // bù từ phần còn dư nếu một phần thiếu câu
      var rest = shuffle((bank ? bank.questions : []).filter(function (q) { return picked.indexOf(q) < 0; }));
      while (picked.length < EXAM_N && rest.length) picked.push(rest.pop());
    }
    return shuffle(picked).map(function (q) {
      if (q.listen) return q;   // câu nghe giữ nguyên thứ tự lựa chọn đã soạn (đã cân bằng vị trí đáp án trong ngân hàng)
      var order = shuffle(q.choices.map(function (_, i) { return i; }));
      return { section: q.section, question: q.question, explain_vi: q.explain_vi || '',
               choices: order.map(function (oi) { return q.choices[oi]; }), answer: order.indexOf(q.answer) };
    });
  }
  function openExam(level) {
    level = level || 'N5';
    var bank = examBank(level), st8 = examState(level);
    if (!bank) { window.GAMEUI.toast('⚠️ Chưa nạp được ngân hàng đề ' + level + '.'); return; }
    st8.attempts++;
    st8.needReview = false;
    if (st8.attempts > 1) {
      var st = window.GAMEUI.stats();
      if (st.money >= EXAM_FEE) window.GAMEUI.apply({ money: -EXAM_FEE }, 'Lệ phí thi lại mốc ' + level + ' — 7.500 yên');
      else window.GAMEUI.toast('🎓 Tiền không đủ đóng lệ phí thi lại — thầy Khánh đóng hộ lần này. Cố mà đỗ nhé!');
    }
    var h3 = document.querySelector('#modal-exam h3');
    if (h3) h3.textContent = '🎓 Mốc thi JLPT ' + level + (level === 'N4' ? ' — cổng cuối Chương 2' : ' — cổng cuối Chương 1');
    var sub = document.querySelector('#modal-exam .sub');
    if (sub) sub.innerHTML = 'Đề 12 câu: chữ &amp; từ vựng 4 · ngữ pháp 4 · đọc hiểu 2 · <b>NGHE 2</b> (clip ghi âm thật, nghe lại tối đa 2 lần/câu; lời thoại gốc hiện sau khi trả lời). Đỗ khi đúng ít nhất <b>7/12</b>. Trượt thì về phòng trọ ôn ở bàn học rồi thi lại (lệ phí thi lại 7.500 yên) — không bao giờ kẹt.';
    examRun = { level: level, list: buildExamList(level), idx: 0, score: 0, locked: false, listenScore: 0, listenTotal: 0, plays: 0 };
    $('exam-chapter').style.display = 'none';
    $('modal-exam').classList.add('show');
    drawExamQ();
    save();
  }
  function drawExamQ() {
    var it = examRun.list[examRun.idx];
    examRun.locked = false;
    examRun.plays = 0;
    $('exam-prog').textContent = 'Mốc ' + examRun.level + ' · Câu ' + (examRun.idx + 1) + '/' + examRun.list.length + ' · Phần: ' + it.section + ' · Đã đúng: ' + examRun.score;
    $('exam-q').innerHTML = '';
    it.question.split('\n').forEach(function (ln, i) { if (i) $('exam-q').appendChild(document.createElement('br')); $('exam-q').appendChild(document.createTextNode(ln)); });
    var fb = $('exam-fb'); fb.textContent = ''; fb.className = 'fb-line';
    $('exam-next').style.display = 'none';
    if (it.audio) {   // câu NGHE: nút phát ngay trong modal thi, nghe lại tối đa 2 lần
      examRun.listenTotal++;
      var pb = document.createElement('button');
      pb.type = 'button'; pb.className = 'play-big'; pb.id = 'exam-listen-play';
      pb.textContent = '▶ Nghe câu này (còn 2 lần nghe lại)';
      var au = new Audio(it.audio);
      pb.addEventListener('click', function () {
        if (examRun.plays >= 3) { pb.textContent = '🔇 Đã hết lượt nghe của câu này'; return; }
        examRun.plays++;
        au.currentTime = 0; au.play().catch(function () {});
        pb.textContent = examRun.plays >= 3 ? '🔊 Đang phát… (lần cuối)' : '▶ Nghe câu này (còn ' + (3 - examRun.plays) + ' lần nghe lại)';
      });
      $('exam-q').appendChild(document.createElement('br'));
      $('exam-q').appendChild(pb);
    }
    var box = $('exam-opts'); box.innerHTML = '';
    it.choices.forEach(function (c, ci) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt-btn'; b.textContent = c;
      b.addEventListener('click', function () {
        if (examRun.locked) return;
        examRun.locked = true;
        if (ci === it.answer) { examRun.score++; if (it.listen) examRun.listenScore++; b.classList.add('right'); fb.textContent = '✅ Đúng! ' + it.explain_vi + (it.script ? ' 📝 Lời thoại gốc: ' + it.script : ''); fb.className = 'fb-line ok'; }
        else { b.classList.add('wrong'); box.querySelectorAll('.opt-btn').forEach(function (x, xi) { if (xi === it.answer) x.classList.add('right'); }); fb.textContent = '❌ Chưa đúng. ' + it.explain_vi + (it.script ? ' 📝 Lời thoại gốc: ' + it.script : ''); fb.className = 'fb-line ng'; }
        box.querySelectorAll('.opt-btn').forEach(function (x) { x.disabled = true; });
        var nx = $('exam-next');
        nx.textContent = examRun.idx >= examRun.list.length - 1 ? 'Xem kết quả ▶' : 'Câu tiếp ▶';
        nx.style.display = '';
      });
      box.appendChild(b);
    });
  }
  function finishExam() {
    var level = examRun.level, st8 = examState(level);
    var score = examRun.score, total = examRun.list.length;
    var isN4 = level === 'N4';
    $('exam-prog').textContent = 'Kết quả mốc thi ' + level + ': ' + score + '/' + total + ' · Phần nghe: ' + examRun.listenScore + '/' + examRun.listenTotal;
    $('exam-opts').innerHTML = '';
    $('exam-next').style.display = 'none';
    var fb = $('exam-fb');
    if (score > st8.best) st8.best = score;
    if (score >= EXAM_PASS) {
      st8.passed = true;
      examDoneLevel = level;
      addQuiz(isN4 ? 'exam-n4' : 'exam-n5');
      $('exam-q').textContent = isN4
        ? '🎉 ĐỖ MỐC N4! ' + score + '/' + total + ' — từ lớ ngớ ngày đầu tới nói được cả câu dài: bạn đã thật sự "vào guồng" rồi.'
        : '🎉 ĐỖ MỐC N5! ' + score + '/' + total + ' — tiếng Nhật của bạn đã đủ đứng vững ở mức đầu tiên.';
      fb.textContent = isN4
        ? 'Thầy Khánh gật gù: "Một năm, hai mốc thi. Chương 2 khép lại ở đây — xem tổng kết chương nhé."'
        : 'Thầy Khánh gật gù: "Đấy, sai thì sửa, sợ gì. Chương 1 khép lại ở đây — xem tổng kết chương nhé."';
      fb.className = 'fb-line ok';
      var btn = $('exam-chapter');
      btn.textContent = isN4 ? '🏆 Xem tổng kết Chương 2' : '🏆 Xem tổng kết Chương 1';
      btn.style.display = '';
    } else {
      st8.needReview = true;
      $('exam-q').textContent = '📚 Chưa đạt mốc ' + level + ': ' + score + '/' + total + ' (cần ít nhất ' + EXAM_PASS + '). Phần nghe: ' + examRun.listenScore + '/' + examRun.listenTotal + '. Không sao — đây không phải đường cụt.';
      fb.textContent = 'Thầy Khánh: "Trượt mốc thì ôn lại rồi thi lại, chuyện thường ở huyện. Về phòng trọ, ngồi vào BÀN HỌC ôn một lượt, rồi quay lại đây thi tiếp. Lệ phí thi lại 7.500 yên — thầy ghi sổ trước cũng được."';
      fb.className = 'fb-line ng';
    }
    save();
  }

  /* ================= TỔNG KẾT CHƯƠNG 1 → MỞ CHƯƠNG 2 ================= */
  var PROMISE_LABEL = {   // dịch mã Sổ lời hứa sang tiếng Việt cho người chơi đọc
    'het-suc': 'hứa cố gắng hết sức, ba năm nữa về — nhà hết nợ', 'goi-ve-deu': 'hứa tháng nào cũng gọi về',
    'ngan-ngun': 'chia tay ngắn ngủn — còn nhiều điều chưa nói', 'cho-doi': 'Linh hứa sẽ đợi',
    'buong-tay': 'nói lời buông tay ngay ở sân bay', 'khan-tay-theu': 'khăn tay Linh thêu', 'moc-khoa-doi': 'móc khóa đôi'
  };
  function promiseLabel(v) { return v ? (PROMISE_LABEL[v] || v) : '—'; }
  function setChapterModal(title, sub, btnLabel) {
    var h3 = document.querySelector('#modal-chapter h3'); if (h3) h3.textContent = title;
    var sb = document.querySelector('#modal-chapter .sub'); if (sb) sb.textContent = sub;
    $('chapter-next').textContent = btnLabel;
  }
  function completeChapter1() {
    if (!has(S.chaptersDone, 1)) { S.chaptersDone.push(1); S.xp += 100; }
    S.chapterPct[1] = 100;
    nextChapterTarget = 2;
    setChapterModal('🎉 Hoàn thành Chương 1 — Lớ ngớ', 'Từ sân bay nước mắt tới mốc N5 đầu tiên — bạn đã đứng vững những bước đầu ở Nhật.', '▶ Sang Chương 2 — Vào guồng');
    var st = window.GAMEUI.stats();
    $('ch1-detail').innerHTML =
      '<div class="sum-row"><span>🎓 Mốc thi N5</span><b>' + S.exam.best + '/10 (thi ' + S.exam.attempts + ' lần)</b></div>' +
      '<div class="sum-row"><span>🎬 Cảnh đã trải qua</span><b>' + S.doneScenes.length + ' cảnh</b></div>' +
      '<div class="sum-row"><span>⭐ XP truyện</span><b>' + S.xp + '</b></div>' +
      '<div class="sum-row"><span>📚 Tiếng Nhật</span><b>' + st.jp + '</b></div>' +
      '<div class="sum-row"><span>💴 Tiền</span><b>' + st.money.toFixed(2).replace('.', ',') + ' man</b></div>' +
      '<div class="sum-row"><span>❤️ Sức khỏe</span><b>' + st.hp + '</b></div>' +
      '<div class="sum-row"><span>💗 Tình cảm</span><b>' + st.love + '</b></div>' +
      '<div class="sub" style="margin-top:10px">Sổ lời hứa: với gia đình — <b>' + promiseLabel(S.book.loiHuaGiaDinh) + '</b> · với Linh — <b>' + promiseLabel(S.book.loiHuaSanBay) + '</b>' + (S.book.quaLuuNiem ? ' · quà lưu niệm: <b>' + promiseLabel(S.book.quaLuuNiem) + '</b>' : '') + '</div>' +
      '<div class="sub">Chương 2 «Vào guồng» bắt đầu: lương đầu sắp về, ví vẫn mỏng — và ngoài phố, anh Tuấn "môi giới" đang có một "kèo thơm" chờ người mới…</div>';
    $('modal-chapter').classList.add('show');
    save();
  }

  /* ================= TỔNG KẾT CHƯƠNG 2 → MỞ CHƯƠNG 3 ================= */
  var SENT_LABEL = { 'gan-het': 'gửi gần hết — 8,00 man', 'vua': 'gửi vừa — 5,00 man', 'it': 'gửi ít — 2,00 man' };
  var TUAN2_LABEL = { 'tu-choi': 'từ chối dứt khoát', 'o-mo': 'trả lời ỡm ờ — cánh cửa còn hé', 'im-lang': 'im lặng, không trả lời' };
  function completeChapter2() {
    if (!has(S.chaptersDone, 2)) { S.chaptersDone.push(2); S.xp += 100; }
    S.chapterPct[2] = 100;
    nextChapterTarget = 3;
    setChapterModal('🎉 Hoàn thành Chương 2 — Vào guồng', 'Một năm ở Nhật: có lương đều, có đường đi đúng luật, và bắt đầu có người nhớ mặt mình ở thị trấn này.', '▶ Sang Chương 3 — Ngã rẽ');
    var st = window.GAMEUI.stats(), c = S.ch2, t = S.tenancy;
    $('ch1-detail').innerHTML =
      '<div class="sum-row"><span>🎓 Mốc thi N4</span><b>' + S.exam2.best + '/10 (thi ' + S.exam2.attempts + ' lần)</b></div>' +
      '<div class="sum-row"><span>💴 Lương đầu — gửi về nhà</span><b>' + (c.sent ? SENT_LABEL[c.sent] : '—') + '</b></div>' +
      '<div class="sum-row"><span>📱 Vụ SIM đứng tên hộ</span><b>' + (t.simChoice === 'ky' ? 'đã sa ngã — và đã đứng dậy xử lý' : (t.simChoice === 'tu-choi' ? 'đã từ chối' : '—')) + '</b></div>' +
      '<div class="sum-row"><span>📩 Kèo "làm thêm ngoài" của anh Tuấn</span><b>' + (c.tuan2 ? TUAN2_LABEL[c.tuan2] : '—') + '</b></div>' +
      '<div class="sum-row"><span>🎬 Cảnh đã trải qua</span><b>' + S.doneScenes.length + ' cảnh</b></div>' +
      '<div class="sum-row"><span>⭐ XP truyện</span><b>' + S.xp + '</b></div>' +
      '<div class="sum-row"><span>📚 Tiếng Nhật</span><b>' + st.jp + '</b></div>' +
      '<div class="sum-row"><span>💴 Tiền</span><b>' + st.money.toFixed(2).replace('.', ',') + ' man</b></div>' +
      '<div class="sum-row"><span>❤️ Sức khỏe</span><b>' + st.hp + '</b></div>' +
      '<div class="sum-row"><span>💗 Tình cảm</span><b>' + st.love + '</b></div>' +
      '<div class="sub" style="margin-top:10px">Sổ lời hứa: với gia đình — <b>' + promiseLabel(S.book.loiHuaGiaDinh) + '</b> · với Linh — <b>' + promiseLabel(S.book.loiHuaSanBay) + '</b>' + (S.book.quaLuuNiem ? ' · quà lưu niệm: <b>' + promiseLabel(S.book.quaLuuNiem) + '</b>' : '') + '</div>' +
      '<div class="sub">Chương 3 «Ngã rẽ» ở phía trước: những lựa chọn lớn về con đường ở Nhật — chọn sớm thì đi thong thả, chọn muộn thì chạy hụt hơi.</div>';
    $('modal-chapter').classList.add('show');
    save();
  }

  /* ================= NHỊP 5 CỦA VỤ SIM — ĐIỆN THOẠI VỀ NHÀ (§6e-04) ================= */
  function triggerSimPhoneBeat() {
    S.tenancy.simTruthPending = true;
    window.PHONE.receive('family', ['Mẹ: Con à, dạo này có khỏe không? Mẹ nghe người ta nói bên Nhật có mấy vụ lừa đảo qua điện thoại, đứng tên hộ ghê lắm. Con ở một mình, giấy tờ của mình thì giữ cho chặt nghe con.']);
    window.PHONE.setReplies('family', [
      { text: 'Mẹ ơi… con phải nói thật một chuyện. Con trót đứng tên đăng ký điện thoại hộ người ta, giờ đang phải xử lý một khoản nợ không phải của con gây ra. Con xin lỗi mẹ, con dại quá…', fx: { deltas: { love: -1, pressure: -2 }, note: 'Nói thật với mẹ về chuyện điện thoại đứng tên' }, follow: ['Mẹ: Trời đất ơi con ơi… Thôi, chuyện đã rồi, con đừng giấu mẹ thêm nữa là được. Nợ thì từ từ cả nhà cùng nghĩ cách — TUYỆT ĐỐI không được làm liều, không được bỏ trốn nghe chưa. Mẹ thương con, ở nhà ai cũng thương con.'] },
      { text: 'Con khỏe lắm mẹ ạ! Mẹ đừng nghe người ta đồn đại. Bên này con ổn hết, giấy tờ con giữ kỹ lắm. Mẹ cứ yên tâm nhé!', fx: { deltas: { pressure: 3 }, note: 'Giấu mẹ chuyện điện thoại đứng tên' }, follow: ['Mẹ: Ừ, con nói vậy là mẹ yên tâm rồi. Nhớ ăn uống đầy đủ, đừng thức khuya nghe con. Cuối tuần gọi về cho mẹ.'] }
    ]);
    window.GAMEUI.toast('📱 Có tin nhắn mới từ Mẹ — mở điện thoại đọc đi');
    advanceObjective();
    save();
  }

  /* ================= NHỊP ĐIỆN THOẠI SAU KHI GỬI TIỀN (vòng tháng §4.2/§4.4) =================
     Luật tuyến §4.4: "gửi tiền xong là có tin nhắn của mẹ" — máy truyện giao tin nhắn theo
     ĐÚNG mức người chơi đã gửi, kèm lựa chọn trả lời riêng; trả lời xong mới khép nhịp. */
  function deliverSalaryPhoneBeat() {
    var sent = S.ch2.sent;
    var msg = sent === 'gan-het'
      ? 'Mẹ: Con ơi… mẹ nhận được tiền rồi. Tám man lận đó con — nhiều quá! Bố mẹ để dành trả dần khoản nợ trước, con đừng gửi nhiều thế mà ăn uống kham khổ nghe chưa. Ở nhà ai cũng thương con lắm.'
      : sent === 'it'
        ? 'Mẹ: Mẹ nhận được tiền con gửi rồi nhé. …Tháng này ở nhà cũng hơi kẹt, mà thôi — con ở xa, giữ sức khỏe là chính. Có bao nhiêu dùng bấy nhiêu, con đừng áy náy gì hết nghe.'
        : 'Mẹ: Mẹ nhận được 5 man con gửi rồi nhé! Đều đều tháng nào cũng thế này là nhà mình yên tâm lắm. Con nhớ giữ lại mà ăn uống đàng hoàng, đừng tằn tiện quá đấy.';
    S.ch2.sentMsgPending = true;
    window.PHONE.receive('family', [msg]);
    window.PHONE.setReplies('family', [
      { text: 'Dạ, con nhận lương đều rồi mẹ ạ. Từ giờ tháng nào con cũng gửi về đúng ngày này. Cả nhà cứ yên tâm nhé!', fx: { deltas: { love: 2, pressure: -1 }, note: 'Hứa gửi tiền đều mỗi tháng — nói được làm được mới nhẹ lòng' }, follow: ['Mẹ: Ừ, con nói vậy là mẹ mừng rồi. Nhớ lời mẹ: sức khỏe là vốn, đừng bán rẻ nó nghe con. Cuối tuần gọi về cho mẹ.'] },
      { text: 'Dạ… con nhận được rồi ạ. Thôi con đang bận, khi khác nói chuyện nhé mẹ.', fx: { deltas: { pressure: 1 }, note: 'Trả lời mẹ qua loa sau ngày gửi tiền' }, follow: ['Mẹ: Ừ… con bận thì thôi. Nhớ giữ gìn sức khỏe nghe con.'] }
    ]);
    window.GAMEUI.toast('📱 Có tin nhắn mới từ Mẹ — mở điện thoại đọc đi');
    save();
  }

  /* ================= NHỚ NHÀ LẦN 2 — GỌI VỀ NHÀ ĐÓN TẾT (Chương 2) =================
     Cùng dạng CUỘC GỌI như 1.9 nhưng là nhịp Tết: giao thừa ở quê (lệch 2 giờ so với Nhật),
     mẹ nhắc đúng khoản tiền người chơi đã gửi; cuối buổi, Linh nhắn chúc Tết qua luồng tin nhắn. */
  function startTetCall() {
    var first = !S.ch2.tetDone;
    var nm = P ? P.name : 'con';
    var sentLine = S.ch2.sent === 'gan-het'
      ? 'Tiền con gửi tháng trước, mẹ mua được ít thịt, ít lá dong gói bánh chưng, còn lại để dành trả nợ dần. Xóm giềng ai cũng khen con có hiếu — mẹ nghe mà mát ruột.'
      : S.ch2.sent === 'it'
        ? 'Tiền con gửi, mẹ để dành trong cái phong bì riêng, chưa dám tiêu — để Tết này lo cho nhà một cái Tết tươm tất. Ít nhiều gì cũng là mồ hôi của con, mẹ quý lắm.'
        : 'Tiền con gửi đều mỗi tháng, mẹ ghi sổ cả đấy — một phần trả nợ, một phần để dành lo Tết này. Nhà mình năm nay có cái Tết đàng hoàng cũng nhờ con.';
    window.PHONE.startCall({
      name: '👨‍👩‍👧 Gia đình — Đêm 30 Tết', ava: '🧧',
      lines: [
        { from: 'them', who: 'Mẹ', text: 'A lô, ' + nm + ' à con? Mẹ đây! Bên nhà mình đang chuẩn bị đón giao thừa này — bên con mấy giờ rồi? Lệch nhau hai tiếng, con gọi giờ này là khuya bên đó lắm rồi phải không?' },
        { from: 'them', who: 'Mẹ', text: 'Nhà mình gói bánh chưng xong rồi, bố đang bày mâm ngũ quả. Thằng út cứ chạy ra chạy vào hỏi "khi nào anh/chị gọi về". ' + sentLine },
        {
          prompt: [
            {
              label: 'Nói thật lòng: "Tết xa nhà đầu tiên… con nhớ nhà mình lắm"', text: 'Mẹ ơi… con nói thật nhé: đây là cái Tết đầu tiên con xa nhà. Nằm nghe tiếng pháo hoa của người ta ngoài phố mà con chỉ muốn chạy về ngồi cạnh nồi bánh chưng nhà mình thôi.',
              fx: first ? { deltas: { love: 3, pressure: -2 }, note: 'Nói thật nỗi nhớ nhà đêm giao thừa — lòng nhẹ đi' } : null,
              reply: { who: 'Mẹ', text: 'Nhớ thì cứ khóc một trận cho đã rồi ngủ, đừng nén trong lòng nghe con. Ở nhà, giao thừa năm nay mâm cơm vẫn chừa một chỗ của con đấy — trong lòng mọi người, con chưa đi đâu xa cả.' }
            },
            {
              label: 'Cố vui vẻ: "Bên này Tết Nhật cũng vui lắm mẹ, mẹ đừng lo"', text: 'Mẹ đừng lo, bên này con cũng có bạn bè, Tết Nhật cũng nhộn nhịp lắm! Con ổn mà, thật đấy.',
              fx: first ? { deltas: { love: 1, pressure: 2 }, note: 'Giấu nỗi nhớ nhà sau tiếng cười đêm giao thừa' } : null,
              reply: { who: 'Mẹ', text: 'Ừ… con nói vui thế mà giọng cứ nghèn nghẹn. Thôi, mẹ không hỏi nữa. Ăn uống đầy đủ, ngủ sớm — năm mới bình an là mẹ mừng nhất rồi.' }
            }
          ]
        },
        { from: 'them', who: 'Bố', text: 'Bố đây con. Năm mới bố chỉ dặn một câu thôi: tiền gửi về đều là quý, nhưng đừng đánh đổi sức khỏe lấy tiền. Người còn thì còn làm ra tiền. À — năm nay bố lì xì cho con qua màn hình nhé: một cái lì xì "sức khỏe", nhận đi, không được từ chối!' },
        {
          prompt: [
            {
              label: 'Chúc Tết bố mẹ bằng tiếng Nhật cho cả nhà nghe', jp: '{明|あ}けましておめでとうございます。{今年|ことし}もよろしくお{願|ねが}いします。', text: 'Bố mẹ nghe con chúc bằng tiếng Nhật nè: (Chúc mừng năm mới ạ. Năm nay cũng mong được mọi người giúp đỡ.) — Con sắp thi lên N4 rồi đấy, cả nhà chờ tin vui của con nhé!',
              fx: first ? { deltas: { jp: 2, love: 2 }, note: 'Chúc Tết bố mẹ bằng tiếng Nhật — bố cười tự hào cả buổi' } : null,
              reply: { who: 'Bố', text: 'Ha ha ha! Nghe sang hẳn! Mới năm ngoái còn lớ ngớ chào không xong, giờ chúc Tết nguyên câu rồi. Hàng xóm mai sang chơi, bố phải khoe mới được. Cố lên con — nhà mình tự hào về con lắm.' }
            },
            {
              label: 'Hứa chắc nịch: "Năm nay con sẽ gửi về nhiều hơn nữa"', text: 'Bố mẹ cứ yên tâm — năm nay con sẽ cố làm thêm, gửi về nhiều hơn năm ngoái. Nhà mình nhất định hết nợ sớm!',
              fx: first ? { deltas: { love: 1, pressure: 2 }, note: 'Hứa gửi nhiều hơn trong đêm giao thừa — lời hứa nặng vai cả năm' } : null,
              reply: { who: 'Mẹ', text: 'Thôi thôi, hứa vừa vừa thôi con. Gửi đều đều như giờ là nhà mừng lắm rồi. Đừng hứa nặng quá rồi tự làm khổ mình — mẹ xót.' }
            }
          ]
        },
        { from: 'them', who: 'Mẹ', text: 'Thôi, giao thừa điểm rồi con ạ — pháo hoa ngoài sân đây này, nghe thấy không? Năm mới chúc con của mẹ: khỏe mạnh, học hành đỗ đạt, gặp toàn người tốt. Ngủ ngon nghe con, mai mùng một lại gọi. Cả nhà thương con!' }
      ],
      onEnd: function () {
        if (!S.ch2.tetDone) {
          S.ch2.tetDone = true;
          window.GAMEUI.toast('🧧 Đón giao thừa từ xa với bố mẹ xong — xa nhà mà lòng thì ở ngay mâm cơm nhà mình.');
          var call = P ? P.call : 'anh/chị';
          window.PHONE.receive('lover', ['Linh: Giao thừa bên này pháo hoa rồi nè 🎆 Năm mới chúc người ta ở Nhật thật nhiều sức khỏe, thi đỗ N4 — và nhớ lời hứa ở sân bay đấy nhé 💗']);
          window.PHONE.setReplies('lover', [
            { text: 'Chúc mừng năm mới! Mình vừa gọi về nhà xong. Năm nay mình sẽ cố hơn nữa — vì nhà mình, và vì lời hứa với một người đang đợi 💗', fx: { deltas: { love: 3, pressure: -1 }, note: 'Nhắn chúc Tết cho Linh — nhắc lại lời hứa sân bay' }, follow: ['Linh: Ừm, mình đợi được mà. Năm mới, ' + call + ' cũng phải thật khỏe đấy. Ngủ sớm đi, mai mình kể chuyện lì xì cho nghe 🧧'] },
            { text: 'Chúc mừng năm mới nhé! Bên này khuya rồi, mình ngủ đây, mai còn đi làm sớm.', fx: { deltas: { love: 1 }, note: 'Chúc Tết Linh ngắn gọn rồi đi ngủ' }, follow: ['Linh: Ừ, ngủ ngon nhé. Năm mới bình an… nhớ giữ gìn sức khỏe đấy.'] }
          ]);
          advanceObjective();
        } else {
          window.GAMEUI.toast('🧧 Gọi về nhà dịp Tết — ở nhà vẫn vậy: bánh chưng, pháo hoa, và một chỗ chừa sẵn cho con.');
        }
        save();
      }
    });
  }

  /* ================= CẢNH 1.9 — GỌI VỀ NHÀ (chuyển nguyên từ bản mẫu; nay là NHỊP CỨNG của mạch) ================= */
  function startHomeCall() {
    var first = !S.flags.callHomeDone;
    var nm = P ? P.name : 'con';
    window.PHONE.startCall({
      name: '👨‍👩‍👧 Gia đình — Bố Mẹ', ava: '👨‍👩‍👧',
      lines: [
        { from: 'them', who: 'Mẹ', text: 'A lô… ' + nm + ' à con? Mẹ đây. Trời ơi, nghe được giọng con là mẹ mừng muốn khóc. Bên đó có lạnh không con?' },
        { from: 'them', who: 'Mẹ', text: 'Giờ này bên Nhật là tối rồi phải không? Con ăn cơm chưa? Ăn uống đàng hoàng vào, đừng ăn mì gói qua bữa nghe chưa. Ở nhà mẹ nấu cơm mà cứ chừa phần, quên mất là con đi xa rồi…' },
        {
          prompt: [
            {
              label: 'Nói thật: "Con ăn rồi ạ… mà con nhớ nhà lắm, mẹ ơi"', text: 'Mẹ ơi… con ăn cơm rồi ạ. Nhưng con nói thật nhé — con nhớ nhà lắm. Tối nay nằm một mình trong phòng nhỏ, nghe giọng mẹ là con muốn khóc.',
              fx: first ? { deltas: { love: 3, pressure: -3 }, note: 'Nói thật với mẹ là mình nhớ nhà — lòng nhẹ hẳn' } : null,
              reply: { who: 'Mẹ', text: 'Nhớ thì cứ nói ra với mẹ, đừng giấu trong lòng mà sinh bệnh nghe con. Ở nhà ai cũng thương con. Cuối tuần nào mẹ cũng nấu món con thích — phần của con, mẹ để trong lòng thôi…' }
            },
            {
              label: 'Giấu đi: "Con ổn lắm, bên này sướng lắm mẹ đừng lo"', text: 'Con ăn rồi, no lắm mẹ ạ! Bên này sướng lắm, phòng đẹp, đồ ăn ngon, mẹ với bố đừng lo gì hết nhé.',
              fx: first ? { deltas: { love: 1, pressure: 2 }, note: 'Giấu nỗi nhớ nhà sau nụ cười — nói xong lòng lại nặng thêm' } : null,
              reply: { who: 'Mẹ', text: 'Ừ… thế thì mẹ yên tâm. Mà giọng con nghe hơi khàn đấy, nhớ quàng khăn giữ ấm cổ, bên đó lạnh hơn nhà mình nhiều.' }
            }
          ]
        },
        { from: 'them', who: 'Bố', text: 'Bố đây con. Phòng ở có gần chỗ làm không? Tháng đầu tiền nong xoay sở được không — thiếu thì nói bố gửi thêm, đừng nhịn ăn mà sinh bệnh. Nhà mình còn xoay được, con đừng lo ngược lại.' },
        {
          prompt: [
            {
              label: 'Nói thử một câu tiếng Nhật cho bố nghe', jp: '{毎日|まいにち}がんばっています。{心配|しんぱい}しないでください。', text: 'Con nói thử câu tiếng Nhật con mới học nhé bố: (Mỗi ngày con đều cố gắng ạ. Bố mẹ đừng lo nhé.)',
              fx: first ? { deltas: { jp: 2, love: 2 }, note: 'Nói được câu tiếng Nhật cho bố nghe — bố cười tự hào cả buổi' } : null,
              reply: { who: 'Bố', text: 'Ha ha! Nghe "Tây" quá đi. Mới mấy hôm mà nói được thế rồi. Cố lên con — cả nhà tự hào về con lắm.' }
            },
            {
              label: 'Thật thà: "Con mới học được mấy câu chào thôi bố ạ"', text: 'Con mới học được mấy câu chào thôi bố ạ. Để tháng sau con nói cho bố nghe cả một đoạn dài nhé.',
              fx: first ? { deltas: { love: 1 }, note: 'Thật thà với bố — hẹn tháng sau nói một đoạn dài' } : null,
              reply: { who: 'Bố', text: 'Ừ, học từ từ, không ai giục. Bố chờ tháng sau nghe con nói một đoạn dài đấy nhé.' }
            }
          ]
        },
        { from: 'them', who: 'Mẹ', text: 'Thôi, khuya rồi, con ngủ sớm đi mai còn đi làm thủ tục. Chủ nhật tuần sau lại gọi về giờ này nhé — cả nhà chờ điện thoại của con đấy. Ngủ ngon nghe con.' }
      ],
      onEnd: function () {
        if (!S.flags.callHomeDone) {
          S.flags.callHomeDone = true;
          window.GAMEUI.toast('📞 Gọi về nhà xong — nghe giọng bố mẹ, lòng nhẹ đi một nửa. (Cờ truyện: nhớ nhà lần 1)');
          advanceObjective();
        } else {
          window.GAMEUI.toast('📞 Gọi về nhà — bố mẹ vẫn khỏe, vẫn chờ điện thoại mỗi chủ nhật.');
        }
        save();
      }
    });
  }

  /* ================= SỰ KIỆN CHỜ (hậu quả đến sau — nhịp 4 của SIM) ================= */
  function checkSched() {
    S.sched.forEach(function (ev) {
      if (ev.fired || S.doneScenes.length < ev.at) return;
      ev.fired = true;
      if (ev.id === 'sim-bill' && !S.tenancy.simBillFired) {
        S.tenancy.simBillFired = true;
        save();
        setTimeout(function () { if (window.__demo) window.__demo.scene('sim-03-hoa-don'); }, 1000);
      }
    });
  }

  /* ================= HOOK CHO ENGINE (hợp đồng như flow.js) ================= */
  function onGameStart(player) {
    P = player;
    window.GAMEUI.init(player);
    window.PHONE.bind();
    if (window.STYLE) window.STYLE.onGameStart(player);   // khôi phục ngoại hình + tủ đồ đã lưu, áp sprite ngay
    if (window.MARKET) window.MARKET.onGameStart();       // khôi phục giỏ/kho siêu thị đã lưu
    if (window.LIFE) window.LIFE.onGameStart();           // khôi phục ảnh/sự kiện đời sống đã lưu
    window.PHONE.onReplied(function (thread) {
      if (thread === 'lover' && S.flags.combiniDone && !S.flags.phoneReplied) {
        S.flags.phoneReplied = true;
        window.GAMEUI.setObjective('🚉 Ra ga (đi hết phố về phía đông) — nghe thông báo, trả lời câu hỏi nghe');
        save();
      }
      if (thread === 'family' && S.ch2.sentMsgPending) {
        S.ch2.sentMsgPending = false;
        advanceObjective();
        save();
      }
      if (thread === 'family' && S.tenancy.simTruthPending) {
        // Phân biệt nói thật / giấu qua ghi chú của mục log vừa áp (phone.js không truyền lựa chọn)
        var lg = window.GAMEUI.log(), truth = null;
        for (var i = lg.length - 1; i >= 0; i--) {
          if (lg[i].note === 'Nói thật với mẹ về chuyện điện thoại đứng tên') { truth = 'that'; break; }
          if (lg[i].note === 'Giấu mẹ chuyện điện thoại đứng tên') { truth = 'giau'; break; }
        }
        if (truth) {
          S.tenancy.simTruth = truth;
          S.tenancy.simTruthPending = false;
          window.GAMEUI.toast(truth === 'that' ? '💗 Nói thật với mẹ xong — nặng lòng một lúc, nhưng từ nay không phải giấu nữa.' : '🤐 Đã giấu mẹ chuyện SIM — nói dối một lần, lòng nặng thêm một chút…');
          advanceObjective();
          save();
        }
      }
    });
    var restored = bootSave;
    if (restored && (restored.state.doneScenes.length || restored.state.flags.boarded)) {
      if (restored.stats && window.GAMEUI.restore) window.GAMEUI.restore(restored.stats);
      if (S.flags.boarded && restored.map && restored.map !== 'vn-san-bay' && window.WORLD2D) {
        var targetMap = restored.map;
        setTimeout(function () { window.WORLD2D.gotoMap(targetMap); }, 500);
      }
      advanceObjective();
      window.GAMEUI.toast('💾 Đã khôi phục tiến độ đã lưu — chơi tiếp từ chỗ cũ nhé');
    } else {
      var keepStyle = S.style, keepPantry = S.pantry, keepLife = S.life, keepRel = S.rel;   // ngoại hình/tủ đồ + kho siêu thị + đời sống + tình cảm không thuộc tiến độ truyện — reset mạch không được xoá
      S = newState();
      S.style = keepStyle; S.pantry = keepPantry; S.life = keepLife; S.rel = keepRel;
      airportObjective();
      setTimeout(function () { if (window.__demo) window.__demo.scene('airport-intro'); }, 800);
    }
    if (window.REL) window.REL.onGameStart(player);           // khôi phục tuyến tình cảm Ch3 đã lưu (rel.js tự nạp qua FLOW.getRel)
  }
  function onSceneEnd(id) {
    markDone(id);
    var f = S.flags, ret = null;
    if (id === 'airport-family' && !f.famDone) {
      f.famDone = true;
      window.GAMEUI.apply({ money: 0.5 }, 'Bố dúi thêm phong bì tiền: +0,50 man');
      airportObjective();
    } else if (id === 'airport-lover' && !f.loverDone) {
      f.loverDone = true;
      airportObjective();
    } else if (id === 'airport-gate') {
      f.boarded = true;
      window.GAMEUI.setObjective('✈️ Chuyến bay 5 tiếng sang Nhật…');
      ret = { moveTo: { map: 'may-bay' } };   // hợp đồng 1.3: lớp truyện trả chỉ thị moveTo
    } else if (id === 'flight') {
      window.GAMEUI.setObjective('🛬 Máy bay đã hạ cánh xuống Narita — ra cửa ở đầu đông khoang để "về phòng trọ"');
    } else if (id === 'intro' && f.arrived && !f.introDone) {
      f.introDone = true;
      window.GAMEUI.setObjective('🚶 Ra đường qua cửa phòng — gặp anh Hùng "sẹo" đang đi dạo');
    } else if (id === 'vending' && !f.vendingPaid) {
      // Thoại máy bán hàng nói rõ "nhét 130 yên" — sổ tiền phải trừ khớp: 130 yên ≈ 0,01 man. Chỉ trừ lần đầu.
      f.vendingPaid = true;
      window.GAMEUI.apply({ money: -0.01 }, 'Máy bán hàng tự động — lon cà phê 130 yên');
    } else if (id === 'hung' && !f.hungDone && f.introDone) {
      // Tiền đề tối thiểu của mạch chính: xem/trình diễn cảnh trước nhịp (thanh duyệt bản đồ)
      // không được kích hoạt sớm — phải tới phòng trọ xong mới tính là đã gặp Hùng.
      f.hungDone = true;
      window.GAMEUI.apply({ jp: 2 }, 'Hùng chỉ đường ra ga và combini');
      window.GAMEUI.setObjective('🏪 Vào combini 秋葉原マート — nói chuyện với Yui ở quầy');
    } else if (id === 'combini' && !f.combiniDone && f.hungDone) {
      f.combiniDone = true;
      window.GAMEUI.apply({ jp: 4, money: -0.08 }, 'Mua xong ở combini — Yui tính: hộp cơm 620 + kem 177 + túi nilon 3 = 800 yên');
      var call = P ? P.call : 'anh/chị';
      window.PHONE.receive('lover', [
        'Tới Nhật rồi hả? Bên đó có lạnh không, phòng có ổn không? Mình lo cả buổi 😟',
        'Ở nhà ai cũng hỏi thăm. Mình đã hứa ở sân bay là mình đợi được — cứ yên tâm mà cố gắng nhé 💗'
      ]);
      window.PHONE.receive('family', ['Mẹ: Con ăn gì chưa? Nhớ mua đồ ăn đàng hoàng, đừng ăn mì gói hoài nghe con.']);
      window.PHONE.setReplies('lover', [
        { text: 'Mình tới nơi an toàn rồi, phòng nhỏ mà xinh lắm. Nhớ mọi người nhiều 🥺', fx: { deltas: { love: 6, pressure: -2 }, note: 'Trả lời Linh thật lòng' }, follow: ['Thế thì mình yên tâm rồi. Ngủ sớm đi nhé, mai mình lại nhắn. Cố lên, ' + call + ' làm được mà 💗'] },
        { text: 'Ừ, tới rồi. Đang bận dọn phòng, nói chuyện sau nhé.', fx: { deltas: { love: 1, pressure: 2 }, note: 'Trả lời Linh hơi vội' }, follow: ['Ừ… vậy thôi, nghỉ ngơi đi. Khi nào rảnh thì nhắn mình trước nhé.'] }
      ]);
      window.PHONE.setReplies('family', [
        { text: 'Con tới nơi an toàn rồi ạ. Vừa mua cơm hộp ở combini, cả nhà đừng lo!', fx: { deltas: { love: 2 }, note: 'Nhắn về cho mẹ yên tâm' }, follow: ['Mẹ: Ừ, thế là mẹ yên tâm rồi. Nhớ ngủ sớm, mai còn đi làm thủ tục nghe con.'] },
        { text: 'Mẹ ơi… thật ra con hơi nhớ nhà. Nhưng con ổn, mẹ đừng lo quá nhé.', fx: { deltas: { love: 3, pressure: -3 }, note: 'Nói thật với mẹ là mình nhớ nhà' }, follow: ['Mẹ: Nhớ thì cứ nói với mẹ, đừng giấu. Ở nhà ai cũng thương con. Gọi về thường xuyên nghe con, nghe giọng là mẹ vui rồi.'] }
      ]);
      window.GAMEUI.toast('📱 Có tin nhắn mới — bấm nút điện thoại ở góc phải!');
      window.GAMEUI.setObjective('📱 Mở điện thoại — trả lời tin nhắn của Linh');
    } else if (id === 'officer' && !f.officerDone) {
      f.officerDone = true;
      window.GAMEUI.toast('🏢 Đã đăng ký địa chỉ xong — một điều kiện của Chương 1 đã đủ!');
      advanceObjective();
    } else if (id === 'room-desk' && (S.exam.needReview || S.exam2.needReview)) {
      if (S.exam.needReview) {
        S.exam.needReview = false;
        window.GAMEUI.toast('📚 Ôn lại một lượt xong — đầu óc sáng ra rồi. Quay lại TRƯỜNG, xem bảng đen để thi lại mốc N5!');
      }
      if (S.exam2.needReview) {
        S.exam2.needReview = false;
        window.GAMEUI.toast('📚 Ôn lại một lượt xong — đầu óc sáng ra rồi. Quay lại TRƯỜNG, xem bảng đen để thi lại mốc N4!');
      }
      advanceObjective();
    } else if (id === 'kaigo-mai' && !f.workDay1) {
      f.workDay1 = true;   // biến thể ngày làm đầu (ngành kaigo) của cảnh 1.7 — bản đồ việc làm chung chưa có
    } else if (id === 'ch2-opening') {
      advanceObjective();
    } else if (id === 'sim-01-loi-ru') {
      if (S.tenancy.simDi === 'di') {
        setTimeout(function () { if (window.__demo) window.__demo.scene('sim-02-cua-hang'); }, 900);
      } else if (S.tenancy.simDi === 'khong') {
        S.tenancy.simChoice = 'tu-choi';
        advanceObjective();
      }
    } else if (id === 'sim-02-cua-hang') {
      if (S.tenancy.simKy === 'ky') {
        S.tenancy.simChoice = 'ky';
        S.sched.push({ id: 'sim-bill', at: S.doneScenes.length + 2, fired: false });   // NHỊP 4: hoá đơn đến sau 2 cảnh nữa
        advanceObjective();
      } else if (S.tenancy.simKy === 'khong') {
        S.tenancy.simChoice = 'tu-choi';
        advanceObjective();
      }
    } else if (id === 'sim-03-hoa-don') {
      if (S.tenancy.simXuly === 'ngay') {
        setTimeout(function () { if (window.__demo) window.__demo.scene('sim-04-xu-ly'); }, 900);
      } else {
        triggerSimPhoneBeat();   // đường "để sau": nhịp điện thoại về nhà vẫn tới ngay
      }
    } else if (id === 'sim-04-xu-ly') {
      triggerSimPhoneBeat();
    } else if (id === 'ch2-luong' && !S.ch2.salaryDone) {
      S.ch2.salaryDone = true;
      deliverSalaryPhoneBeat();   // §4.4: gửi tiền xong là có tin nhắn của mẹ — theo đúng mức đã gửi
      setTimeout(function () { if (window.LIFE) window.LIFE.inviteCheck(); }, 2500);   // lời mời họp đồng hương đến sau lương đầu (giai đoạn 6)
      advanceObjective();
    } else if (id === 'bonenkai' && !S.ch2.bonenkaiDone) {
      S.ch2.bonenkaiDone = true;
      advanceObjective();
    } else if (id === 'hanami' || id === 'momiji' || id === 'dong-huong') {
      if (window.LIFE) window.LIFE.eventBonus(id);   // cộng thêm: đi cùng bạn / đồ siêu thị mang theo / góp tiền đồng hương
      if (id === 'dong-huong') window.GAMEUI.toast('🇻🇳 Họp đồng hương xong — hẹn tháng sau lại tụ!');
    } else if (id === 'ch2-tv' && !S.ch2.tvDone) {
      S.ch2.tvDone = true;
      advanceObjective();
    } else if (id === 'ch2-yui' && !S.ch2.romanceDone) {
      S.ch2.romanceDone = true;
      advanceObjective();
    } else if (id === 'ch3-opening') {
      advanceObjective();
    } else if (id === 'mall-fashion' || id === 'mall-cosmetics') {
      // Kaiwa chào hỏi ở quầy mall diễn xong → đánh dấu đã chào và TỰ MỞ QUẦY MUA SẮM của quầy đó
      var mc = id === 'mall-fashion' ? 'fashion' : 'cosmetics';
      if (window.STYLE) {
        window.STYLE.markGreeted(mc);
        setTimeout(function () { window.STYLE.openShop(mc); }, 350);
      }
    }
    if (window.REL) window.REL.onSceneEnd(id);   // tuyến tình cảm: thiện cảm từ cảnh đời sống + máy nhịp arc Chương 3 (rel.js)
    checkSched();
    save();
    return ret;
  }
  function handleScene(id) {
    var f = S.flags;
    if (id === 'airport-gate') {
      if (f.famDone && f.loverDone) return false;  // đã chia tay xong → để engine chạy cảnh lên máy bay
      window.GAMEUI.toast(!f.famDone && !f.loverDone
        ? '🛂 Chưa thể qua cửa: còn chưa nói lời chia tay với bố mẹ và Linh…'
        : (!f.famDone ? '🛂 Chưa thể qua cửa: bố mẹ vẫn đang chờ ở phía trái sảnh.' : '🛂 Chưa thể qua cửa: Linh vẫn đang chờ ở góc cà phê.'));
      return true;
    }
    if (id === 'station' && f.phoneReplied && !f.listenDone) { openListen(); return true; }
    if (id === 'gomi') {
      if (f.listenDone && !f.gomiDone) { openGomi(); return true; }
      window.GAMEUI.toast('🗑️ Điểm tập kết rác của khu nhà — vứt đúng ngày, đúng loại, buộc túi gọn nhé.');
      return true;
    }
    if (id === 'call-home') {
      // Nhớ nhà lần 2: tới nhịp Tết của Chương 2 thì vật điện thoại mở CUỘC GỌI TẾT thay cho cuộc gọi thường
      if (S.chapter >= 2 && S.ch2.romanceDone && !S.ch2.tetDone && !S.ch2.bonenkaiDone) {
        window.GAMEUI.toast('🍻 Khoan gọi Tết đã — tháng 12 còn tiệc TẤT NIÊN 忘年会 với công ty ở quán nhậu 新橋 (bảng tin trong quán). Dự tiệc cuối năm xong rồi gọi về nhà đón giao thừa nhé!');
        return true;
      }
      if (S.chapter >= 2 && S.ch2.romanceDone && !S.ch2.tetDone) { startTetCall(); return true; }
      startHomeCall(); return true;
    }
    if (id === 'school-board') {
      if (S.chapter >= 2 && S.ch2.tetDone && !S.exam2.passed) {   // MỐC THI N4 — cổng cuối Chương 2
        if (S.exam2.needReview) {
          window.GAMEUI.toast('📚 Thầy Khánh nhắc: ôn lại ở BÀN HỌC trong phòng trọ trước đã — học chưa vào thì thi lại cũng vậy thôi.');
          return true;
        }
        openExam('N4');
        return true;
      }
      if (S.chapter >= 2 && S.exam2.passed && !has(S.chaptersDone, 2)) { completeChapter2(); return true; }   // đỗ rồi mà lỡ tay đóng modal tổng kết → mở lại tại đây, không kẹt
      if (examGateOpen()) {
        if (S.exam.needReview) {
          window.GAMEUI.toast('📚 Thầy Khánh nhắc: ôn lại ở BÀN HỌC trong phòng trọ trước đã — học chưa vào thì thi lại cũng vậy thôi.');
          return true;
        }
        openExam('N5');
        return true;
      }
    }
    if (id === 'bank-counter') {
      // Ngày lĩnh lương đầu của Chương 2 diễn ra tại quầy ngân hàng — chặn cảnh quầy thường đúng một lần
      if (S.chapter >= 2 && S.tenancy.simChoice && !S.ch2.salaryDone) {
        setTimeout(function () { if (window.__demo) window.__demo.scene('ch2-luong'); }, 60);
        return true;
      }
      return false;
    }
    if (id === 'room-tv') {
      // 'room-tv' là ID ẢO của vật TV trên bản đồ (như 'call-home'/'school-board') — cảnh thoại thật là 'ch2-tv'
      if (S.chapter < 2) {
        window.GAMEUI.toast('📺 TV đang chiếu chương trình nấu ăn — mấy món Nhật nhìn ngon mà làm theo thì… để hôm khác.');
        return true;
      }
      if (S.ch2.tvDone) {
        window.GAMEUI.toast('📺 TV giờ đang chiếu thời tiết và thể thao — bản tin "nặng đô" tối qua vẫn còn ám ảnh…');
        return true;
      }
      setTimeout(function () { if (window.__demo) window.__demo.scene('ch2-tv'); }, 60);
      return true;
    }
    if (id === 'combini') {
      // Rung động đầu: lần ghé combini sau bản tin TV ở Chương 2 là cảnh riêng với Yui
      if (S.chapter >= 2 && S.ch2.salaryDone && S.ch2.tvDone && !S.ch2.romanceDone) {
        setTimeout(function () { if (window.__demo) window.__demo.scene('ch2-yui'); }, 60);
        return true;
      }
      return false;
    }
    if (id === 'sim-01-loi-ru') {
      if (S.chapter < 2) {   // LOCKED/SAY-ONLY theo hợp đồng 1.3 — anh Tuấn chỉ "có kèo" từ Chương 2
        window.GAMEUI.toast('📱 Anh Tuấn đang bận nghe điện thoại: "Ờ ờ, kèo đó để ít bữa nữa, sắp có việc ngon cho mấy đứa mới sang…"');
        return true;
      }
      if (S.tenancy.simChoice) {
        window.GAMEUI.toast('📱 Anh Tuấn đã đi tìm người khác rồi — chuyện "kèo điện thoại" ở phố này tạm lắng.');
        return true;
      }
      return false;
    }
    if (id === 'station-ticket') {   // máy bán vé ở ga → màn hình đi tàu (life.js)
      if (window.LIFE) window.LIFE.openTravel();
      return true;
    }
    if (id === 'bonenkai') {   // tiệc tất niên: chỉ mở đúng mạch Ch2 (sau lương đầu, chưa dự)
      if (S.chapter < 2 || !S.ch2.salaryDone) { window.GAMEUI.toast('🍻 Bảng tin công ty: tiệc tất niên 忘年会 sẽ tổ chức vào tháng 12, sau kỳ lương đầu. Còn sớm lắm!'); return true; }
      if (S.ch2.bonenkaiDone) { window.GAMEUI.toast('🍻 Tiệc tất niên năm nay đã dự rồi — đêm đó ấm áp thật. Hẹn 忘年会 năm sau!'); return true; }
      return false;
    }
    if (id === 'hanami') {   // ngắm hoa: chỉ mùa xuân
      if (!window.LIFE || window.LIFE.season() !== 'spring') { window.GAMEUI.toast('🌸 Bây giờ chưa phải mùa anh đào — hanami mở vào MÙA XUÂN (sau mốc N4, tháng 3).'); return true; }
      return false;
    }
    if (id === 'momiji') {   // ngắm lá đỏ: chỉ mùa thu
      if (!window.LIFE || window.LIFE.season() !== 'autumn') { window.GAMEUI.toast('🍁 Lá đỏ chỉ rộ vào MÙA THU (tháng 10–11) — giờ chưa đúng mùa.'); return true; }
      return false;
    }
    if (id === 'dong-huong') {   // họp đồng hương: cần lời mời (sau lương đầu) — lặp được theo mốc chương
      var lf = window.LIFE ? window.LIFE.state() : null;
      if (!S.ch2.salaryDone) { window.GAMEUI.toast('🇻🇳 Góc công viên này cuối tuần hay có hội đồng hương tụ tập — nghe nói sau kỳ lương đầu sẽ có buổi BBQ lớn.'); return true; }
      return false;
    }
    if (id === 'listen-ga-bank' || id === 'listen-super' || id === 'listen-kaigo') {   // ĐIỂM NGHE ở địa điểm (listen.js) — làm lại được nhiều lần
      if (window.SPOTLISTEN) window.SPOTLISTEN.open(id === 'listen-ga-bank' ? 'ga-bank' : (id === 'listen-super' ? 'super' : 'kaigo'));
      return true;
    }
    if (id === 'super-pay') {   // quầy thu ngân siêu thị → thanh toán GIỎ THẬT (market.js); cảnh kaiwa 'super-checkout' giỏ cố định vẫn là cảnh truyện riêng ở NPC khi mạch gọi
      if (window.MARKET) window.MARKET.openPay();
      return true;
    }
    if (id.indexOf('super-shelf-') === 0) {   // các dãy kệ siêu thị → danh mục theo kệ (market.js)
      if (window.MARKET) window.MARKET.openShelf(id.slice('super-shelf-'.length));
      return true;
    }
    if (id === 'room-fridge') {   // tủ lạnh/bếp phòng trọ → kho đồ tiêu dùng, ăn/uống tại chỗ (market.js)
      if (window.MARKET) window.MARKET.openPantry();
      return true;
    }
    if (id === 'room-sleep') {   // futon → ngủ qua ngày mới: hết say + reset đếm bia (market.js)
      if (window.MARKET) window.MARKET.newDay();
      return true;
    }
    if (id === 'room-wardrobe') {   // tủ quần áo phòng trọ → màn hình ngoại hình & tủ đồ (style.js)
      if (window.STYLE) window.STYLE.open();
      return true;
    }
    if (id === 'mall-jewelry' || id === 'mall-perfume') {   // hai quầy không kaiwa: mở thẳng quầy mua sắm (lời chào kính ngữ ở đầu quầy)
      if (window.STYLE) window.STYLE.openShop(id === 'mall-jewelry' ? 'jewelry' : 'perfume');
      return true;
    }
    if (id === 'mall-fashion' || id === 'mall-cosmetics') {   // đã chào hỏi rồi → mở thẳng quầy; lần đầu để engine diễn kaiwa
      var mcc = id === 'mall-fashion' ? 'fashion' : 'cosmetics';
      if (window.STYLE && window.STYLE.greeted(mcc)) { window.STYLE.openShop(mcc); return true; }
      return false;
    }
    return false;
  }
  function onMapEnter(id) {
    if (window.BGM) window.BGM.play(id);
    if (!has(S.visited, id)) S.visited.push(id);
    if (id === 'may-bay' && S.flags.boarded && !S.flags.flown) {
      S.flags.flown = true;
      setTimeout(function () { if (window.__demo) window.__demo.scene('flight'); }, 900);
    }
    if (id === 'room' && S.flags.boarded && !S.flags.arrived) {
      S.flags.arrived = true;
      setTimeout(function () { if (window.__demo) window.__demo.scene('intro'); }, 900);
    }
    save();
  }
  function setFlag(name, value) {
    if (name === 'loi-hua-gia-dinh') S.book.loiHuaGiaDinh = value;
    else if (name === 'loi-hua-lover') S.book.loiHuaSanBay = value;
    else if (name === 'qua-luu-niem') { S.book.quaLuuNiem = value; S.book.loiHuaSanBay = 'cho-doi'; }
    else if (name === 'sim-di') S.tenancy.simDi = value;
    else if (name === 'sim-ky') S.tenancy.simKy = value;
    else if (name === 'sim-xuly') S.tenancy.simXuly = value;
    else if (name === 'gui-tien') S.ch2.sent = value;
    else if (name === 'tuan-keo-2') S.ch2.tuan2 = value;
  }
  function currentStep() {   // tương thích harness cũ: suy step 0..9 từ cờ, khớp flow.js tại mọi thời điểm
    var f = S.flags;
    if (f.gomiDone) return 9;
    if (f.listenDone) return 8;
    if (f.phoneReplied) return 7;
    if (f.combiniDone) return 6;
    if (f.hungDone) return 5;
    if (f.introDone) return 4;
    if (f.boarded) return 3;
    if (f.famDone && f.loverDone) return 2;
    if (f.famDone || f.loverDone) return 1;
    return 0;
  }
  window.FLOW = {
    onGameStart: onGameStart, onSceneEnd: onSceneEnd, handleScene: handleScene,
    onMapEnter: onMapEnter, setFlag: setFlag,
    // Hệ ngoại hình (style.js) đọc/ghi trạng thái qua 2 cổng này — ghi xong là LƯU ngay
    getStyle: function () { return S.style ? JSON.parse(JSON.stringify(S.style)) : null; },
    getPantry: function () { return S.pantry ? JSON.parse(JSON.stringify(S.pantry)) : null; },
    getLife: function () { return S.life ? JSON.parse(JSON.stringify(S.life)) : null; },
    getRel: function () { return S.rel ? JSON.parse(JSON.stringify(S.rel)) : null; },
    setRel: function (d) { S.rel = (d && typeof d === 'object') ? d : null; save(); },
    setLife: function (d) { S.life = (d && typeof d === 'object') ? d : null; save(); },
    setPantry: function (d) { S.pantry = (d && typeof d === 'object') ? d : null; save(); },
    setStyle: function (d) { S.style = (d && typeof d === 'object') ? d : null; save(); },
    step: currentStep,
    flags: function () {
      var o = {
        famDone: S.flags.famDone, loverDone: S.flags.loverDone, boarded: S.flags.boarded, arrived: S.flags.arrived, callHomeDone: S.flags.callHomeDone,
        officerDone: S.flags.officerDone, examPassed: S.exam.passed, chapter: S.chapter,
        salaryDone: S.ch2.salaryDone, sentChoice: S.ch2.sent, tvDone: S.ch2.tvDone, tuan2: S.ch2.tuan2,
        romanceDone: S.ch2.romanceDone, tetDone: S.ch2.tetDone, exam2Passed: S.exam2.passed, bonenkaiDone: S.ch2.bonenkaiDone,
        simChoice: S.tenancy.simChoice, simTruth: S.tenancy.simTruth,
        loiHuaSanBay: S.book.loiHuaSanBay, quaLuuNiem: S.book.quaLuuNiem, loiHuaGiaDinh: S.book.loiHuaGiaDinh
      };
      if (S.rel) {   // CỜ TÌNH CẢM CHUẨN (KHUNG-GAME §4.10 — lane giai đoạn 8 đọc để nối hệ quan hệ/kết đôi)
        var r = S.rel;
        Object.keys(r.aff || {}).forEach(function (k) { o['affection.' + k] = r.aff[k]; });
        Object.keys(r.stage || {}).forEach(function (k) { o['relation.' + k] = r.stage[k]; });
        o.partner = r.partner || null;
        o.breakup = r.breakup || null;
        o.recovered = !!r.recovered;
        var base = (S.book.loiHuaSanBay === 'cho-doi' ? 2 : S.book.loiHuaSanBay === 'buong-tay' ? -2 : 0) + (S.book.quaLuuNiem ? 1 : 0) + (S.ch2.tetDone ? 1 : 0);
        o.lovecare = base + (r.careA || 0) + (r.careB || 0) + (r.careC || 0);
      }
      return o;
    }
  };
  window.STORY = {
    version: 2,
    state: function () { return JSON.parse(JSON.stringify({ chapter: S.chapter, flags: S.flags, book: S.book, tenancy: S.tenancy, ch2: S.ch2, exam: S.exam, exam2: S.exam2, xp: S.xp, rel: S.rel, story: pubStory() })); },
    save: save,
    examAnswer: function () { return examRun ? examRun.list[examRun.idx].answer : -1; },   // phục vụ harness kiểm chứng
    wipe: function () { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} location.reload(); }
  };
})();
