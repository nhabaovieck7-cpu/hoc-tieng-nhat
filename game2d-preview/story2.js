// story2.js — MÁY TRUYỆN CHƯƠNG 3–5 «SAGA» (đợt xây lớn 01/11/2026, lệnh chủ trang:
// "xây tiếp đi em" + "chuyện càng dài càng tốt" + "lồng ghép càng nhiều kaiwa đời sống càng tốt").
// Nội dung thoại nằm ở scenes-k*.js (Ch3) / scenes-l*.js (Ch4) / scenes-m*.js (Ch5);
// file này là MÁY TRẠNG THÁI: ngã rẽ · ngành · phỏng vấn · nyukan · mạch Ch4 · mạch Ch5 · kết cục.
// Trạng thái lưu qua FLOW.getSaga/setSaga (runtime.saga trong cùng bản lưu story) +
// gương localStorage 'tuoitre2d_saga_v1' (đúng tiền lệ rel.js).
// TÍCH HỢP (story.js đã nối sẵn): advanceObjective hỏi SAGA.objective() TRƯỚC rel.js
// ở chương ≥3 (SAGA tự nhường khi arc tình cảm Ch3 chưa ngã ngũ và người chơi chưa
// chọn ngã rẽ); handleScene uỷ quyền các móc cảnh của mạch chính cho SAGA.handleScene;
// onSceneEnd/onMapEnter gọi SAGA tương ứng; cờ trong cảnh (flag 'saga-*') qua
// FLOW.setFlag → SAGA.setFlag. Cổng chương vẫn là máy thi của story.js (N3/N2/N1) —
// SAGA chỉ quyết "đã sẵn sàng thi chưa" qua gateReady(level).
(function () {
  'use strict';
  var LSKEY = 'tuoitre2d_saga_v1';

  /* ================= BẢNG NGÀNH (Tokutei) + TUYẾN DU HỌC ================= */
  var INDUSTRIES = {
    'kaigo':     { name: 'Kaigo — chăm sóc người già',        map: 'kaigo',    board: 'kaigo-board',    boss: 'kaigo-mai',       place: 'viện dưỡng lão ở 神戸',        hookName: 'bảng tin của viện / chị Mai' },
    'nha-hang':  { name: 'Nhà hàng — bếp Nhật',               map: 'kitchen',  board: 'kitchen-board',  boss: 'kitchen-manager', place: 'bếp nhà hàng ở 豊洲',          hookName: 'bảng phân ca của bếp / bếp trưởng' },
    'genba':     { name: 'Xây dựng — công trường',            map: 'genba',    board: 'genba-board',    boss: 'genba-boss',      place: 'công trường ở 横浜',           hookName: 'bảng an toàn của công trường / sếp công trường' },
    'khach-san': { name: 'Khách sạn — lễ tân & buồng phòng',  map: 'hotel',    board: 'hotel-senpai',   boss: 'hotel-senpai',    place: 'khách sạn ở お台場',           hookName: 'chị senpai ở quầy lễ tân' },
    'shokuhin':  { name: 'Thực phẩm — dây chuyền chế biến',   map: 'shokuhin', board: 'shokuhin-board', boss: 'shokuhin-leader', place: 'nhà máy thực phẩm ở 大阪',     hookName: 'bảng phân ca của xưởng / chị trưởng ca' },
    'seizo':     { name: 'Chế tạo — nhà máy cơ khí',          map: 'seizo',    board: 'seizo-board',    boss: 'seizo-senpai',    place: 'nhà máy chế tạo ở 名古屋',      hookName: 'bảng sản xuất / senpai Kudo' },
    'seibi':     { name: 'Ô tô — xưởng sửa chữa',             map: 'seibi',    board: 'seibi-boss',     boss: 'seibi-boss',      place: 'xưởng ô tô ở 豊田',            hookName: 'chủ xưởng' },
    'soko':      { name: 'Kho vận — trung tâm phân loại',     map: 'soko',     board: 'soko-leader',    boss: 'soko-leader',     place: 'kho vận ở 千葉',               hookName: 'anh trưởng kho' },
    'nogyo':     { name: 'Nông nghiệp — trang trại',          map: 'nogyo',    board: 'nogyo-board',    boss: 'nogyo-boss',      place: 'trang trại ở 富良野',          hookName: 'bảng việc của trại / bác chủ trại' }
  };
  var DUHOC = { name: 'Du học — trường chuyên môn', map: 'school', board: 'school-teacher', boss: 'school-teacher', place: 'trường tiếng ở 早稲田', hookName: 'thầy Khánh' };

  /* ================= TRẠNG THÁI ================= */
  function freshSaga() {
    return {
      v: 1,
      route: null,               // null | 'tokutei' | 'du-hoc' | 've-nuoc'
      industry: null,            // khóa trong INDUSTRIES (chỉ khi route='tokutei')
      indStage: 0,               // 0..3 — số buổi làm/học chính đã qua của ngành/tuyến
      interview: { attempts: 0, passed: false, needReview: false, logMark: 0 },
      nyukan: false,
      c4: {
        friendVisa: false, farewell: false, crisis: null, crisisDone: false,
        econ: false, econChoice: null, licenseStage: 0, license: false,
        bully: null, bar: false, homesick3: false, tuan: null, gambled: null,
        phoneLie: false, trip: false, payday: 0, health: false, daCap: null, hong: null, bbq: false, bien: false
      },
      c5: { success: 0, married: false, spouse: null, baby: false, baby2: false, finalInterview: false, finalChoice: null },
      darkPath: false,           // đã đi theo anh Tuấn ở đỉnh cám dỗ Ch4 (nhánh đen)
      ending: null               // null | 1..6
    };
  }
  var G = freshSaga();
  var gender = 'M';

  function serialize() { return JSON.parse(JSON.stringify(G)); }
  function persist() {
    if (window.FLOW && window.FLOW.setSaga) window.FLOW.setSaga(serialize());
    try { localStorage.setItem(LSKEY, JSON.stringify(serialize())); } catch (e) {}
  }
  function chapter() { var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {}; return st.chapter || 0; }
  function stats() { return window.GAMEUI ? window.GAMEUI.stats() : { jp: 0, money: 0, hp: 0, love: 0, risk: 0, pressure: 0 }; }
  function routeDef() {
    if (G.route === 'du-hoc') return DUHOC;
    if (G.route === 'tokutei' && G.industry) return INDUSTRIES[G.industry] || null;
    return null;
  }
  function industryName(id) { return id && INDUSTRIES[id] ? INDUSTRIES[id].name : '—'; }
  /* Arc tình cảm Ch3 đã ngã ngũ chưa (hoặc đã buông tay từ sân bay) — máy truyện
     chính chỉ bắt đầu dẫn nhịp SAU điểm này, đúng thoả thuận với rel.js/guide.js. */
  function arcResolved() {
    var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {};
    if (st.book && st.book.loiHuaSanBay === 'buong-tay') return true;
    var R = (window.REL && window.REL.state) ? window.REL.state() : null;
    return !!(R && R.beats && R.beats.resolved);
  }
  function deferScene(id, delay) {
    setTimeout(function () {
      var tries = 0;
      (function attempt() {
        var dlgOpen = !!(window.__demo && window.__demo.dlgOpen && window.__demo.dlgOpen());
        var callOn = !!(window.PHONE && window.PHONE.callActive && window.PHONE.callActive());
        if ((dlgOpen || callOn) && tries < 60) { tries++; setTimeout(attempt, 400); return; }
        if (window.__demo) window.__demo.scene(id);
      })();
    }, delay || 600);
  }
  function playNow(id) { setTimeout(function () { if (window.__demo) window.__demo.scene(id); }, 60); }

  /* ================= MÁY BƯỚC CHƯƠNG 3 ================= */
  function step3() {
    if (G.ending) return 'done';
    if (!G.route) return 'route';
    if (G.route === 've-nuoc') return 'venh';
    if (G.route === 'tokutei' && !G.industry) return 'industry';
    if (G.indStage < 3) return 'ind' + G.indStage;
    if (!G.interview.passed) return 'interview';
    if (!G.nyukan) return 'nyukan';
    return 'exam';
  }
  function step() {   // bước hiện tại của TOÀN mạch chính (theo chương)
    var ch = chapter();
    if (ch < 3) return null;
    if (ch === 3) return step3();
    if (ch === 4) return step4();
    if (ch >= 5) return step5();
    return null;
  }

  /* ================= MÁY BƯỚC CHƯƠNG 4 (đợt Pha 2 sẽ lấp đầy) ================= */
  function step4() { return 'c4-next'; }
  /* ================= MÁY BƯỚC CHƯƠNG 5 (đợt Pha 3 sẽ lấp đầy) ================= */
  function step5() { return 'c5-next'; }

  /* ================= CỔNG THI (story.js hỏi trước khi mở đề ở bảng đen) ================= */
  function gateReady(level) {
    if (level === 'N3') return chapter() === 3 && !G.ending && G.interview.passed && G.nyukan;
    if (level === 'N2') return chapter() === 4 && gate4();
    if (level === 'N1') return chapter() >= 5 && gate5();
    return false;
  }
  function gate4() { return false; }   // Pha 2 lấp đầy
  function gate5() { return false; }   // Pha 3 lấp đầy

  /* ================= MỤC TIÊU (story.js advanceObjective hỏi trước rel.js) ================= */
  function objText() {
    var ch = chapter(), s = step();
    if (ch < 3 || !s) return null;
    if (ch === 3) {
      if (!G.route && !arcResolved()) return null;   // arc tình cảm chưa ngã ngũ → nhường rel.js dẫn nhịp
      var d = routeDef();
      switch (s) {
        case 'done': return G.ending === 6 ? '🏠 Kết thúc sớm «Về quê» — một đời bình thường ở quê nhà đang chờ. Thong thả sống nốt những ngày ở Nhật, hoặc chơi lại từ đầu để đi một đường khác' : '🌸 Tự do khám phá';
        case 'route': return '🎓 Chương 3 «Ngã rẽ» — tới TRƯỜNG TIẾNG gặp THẦY KHÁNH: đã đến lúc chọn con đường đi tiếp ở Nhật (đi làm Tokutei · du học tiếp · hay về nước)';
        case 'venh': return '✈️ Quyết định về quê đã chín — tới TRƯỜNG TIẾNG gặp THẦY KHÁNH nói lời quyết định cuối cùng';
        case 'industry': return '🏭 Tới TRƯỜNG TIẾNG gặp THẦY KHÁNH — nghe tư vấn từng ngành rồi CHỌN NGÀNH cho chặng Tokutei của mình';
        case 'ind0': return '🏭 Tới ' + d.place + ' — gặp ' + d.hookName + ' để bắt đầu BUỔI LÀM ĐẦU TIÊN của ' + (G.route === 'du-hoc' ? 'kỳ học mới' : 'ngành mới');
        case 'ind1': return '🏭 Buổi tiếp theo ở ' + d.place + ' — gặp ' + d.hookName + ': vào guồng việc thật, người thật';
        case 'ind2': return '🏭 Buổi thứ ba ở ' + d.place + ' — ngày thể hiện tay nghề trước ' + d.hookName;
        case 'interview': return G.interview.needReview
          ? '📚 Phỏng vấn chưa qua — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại cách trả lời, rồi quay lại phỏng vấn (thi lại tốn 5.000 yên lệ phí hồ sơ)'
          : (G.route === 'du-hoc'
            ? '🎓 PHỎNG VẤN ĐẦU VÀO trường chuyên môn — tới TRƯỜNG TIẾNG gặp THẦY KHÁNH: nói rõ kế hoạch học và đường đi của mình'
            : '💼 PHỎNG VẤN XIN VIỆC ở ' + d.place + ' — gặp ' + d.hookName + ': trận hội thoại quyết định, trả lời thành thật và đúng mực');
        case 'nyukan': return '🛂 Tới SHIYAKUSHO (ủy ban phường) nộp hồ sơ đổi tư cách lưu trú — gặp CÁN BỘ ở quầy: họ sẽ hỏi xoáy đúng chỗ yếu của hồ sơ, cứ thành thật mà đáp';
        case 'exam': return '🎓 Mọi cửa đã qua — tới TRƯỜNG TIẾNG xem BẢNG ĐEN để thi MỐC JLPT N3, cổng cuối Chương 3';
      }
      return null;
    }
    if (ch === 4) return '🌊 Chương 4 «Sóng gió» đang tới gần… (bản xem trước của đợt này dừng ở đây — chương 4 mở ở đợt xây kế tiếp)';
    if (ch >= 5) return '🌅 Chương 5 «Lớn rồi»… (bản xem trước của đợt này dừng ở đây)';
    return null;
  }
  function objective() {
    var t = objText();
    if (!t) return false;
    window.GAMEUI.setObjective(t);
    return true;
  }

  /* ================= BƯỚC DẪN ĐƯỜNG (guide.js dựng qua SAGA.guideSteps) ================= */
  function guideSteps() {
    var ch = chapter();
    if (ch < 3) return null;
    if (ch === 3 && !G.route && !arcResolved()) return null;   // giữ nguyên hành vi cũ: rel.js dẫn bằng mục tiêu chữ
    var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {};
    var ex3 = st.exam3 || {}, ex4 = st.exam4 || {}, ex5 = st.exam5 || {};
    var d = routeDef(), out = [];
    if (ch === 3) {
      out.push({ label: 'Tới TRƯỜNG TIẾNG — gặp THẦY KHÁNH bàn NGÃ RẼ: chọn đường đi tiếp ở Nhật', target: { scene: 'school-teacher' }, done: !!G.route });
      if (G.route === 've-nuoc') {
        out.push({ label: 'Nói lời quyết định VỀ QUÊ với thầy Khánh ở trường tiếng', target: { scene: 'school-teacher' }, done: !!G.ending });
        return out;
      }
      if (G.route === 'tokutei') out.push({ label: 'Chọn NGÀNH nghề cho chặng Tokutei — nghe thầy Khánh tư vấn ở trường tiếng', target: { scene: 'school-teacher' }, done: !!G.industry });
      if (d) {
        var stageLabels = G.route === 'du-hoc'
          ? ['Buổi học đầu tiên của kỳ mới — tới trường tiếng gặp thầy Khánh', 'Buổi học thứ hai — cân bằng học và làm thêm baito', 'Buổi học thứ ba — thuyết trình và kế hoạch tương lai']
          : ['Buổi làm đầu tiên của ngành mới — tới ' + d.place, 'Buổi làm thứ hai — vào guồng việc thật ở ' + d.place, 'Buổi làm thứ ba — ngày thể hiện tay nghề ở ' + d.place];
        for (var i = 0; i < 3; i++) {
          out.push({ label: stageLabels[i], target: { scene: i === 1 ? d.boss : d.board }, done: G.indStage > i });
        }
        out.push({
          label: G.route === 'du-hoc' ? 'PHỎNG VẤN ĐẦU VÀO trường chuyên môn — ở trường tiếng, với thầy Khánh' : 'PHỎNG VẤN XIN VIỆC — ở ' + d.place + ', gặp ' + d.hookName,
          target: { scene: d.boss }, done: G.interview.passed
        });
        if (G.interview.needReview) out.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại cách trả lời phỏng vấn', target: { scene: 'room-desk' }, done: !G.interview.needReview });
      }
      out.push({ label: 'Tới SHIYAKUSHO — nộp hồ sơ đổi tư cách lưu trú ở quầy cán bộ', target: { scene: 'officer' }, done: G.nyukan });
      if (ex3.needReview) out.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại bài, rồi quay lại trường thi tiếp', target: { scene: 'room-desk' }, done: !!ex3.passed });
      out.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để thi mốc JLPT N3, cổng cuối Chương 3', target: { scene: 'school-board' }, done: !!ex3.passed });
      if (ex3.passed) out.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để mở TỔNG KẾT Chương 3', target: { scene: 'school-board' }, done: ch >= 4 });
      return out;
    }
    if (ch === 4) {
      return [{ label: 'Chương 4 «Sóng gió» — mở ở đợt xây kế tiếp', target: null, done: false }];
    }
    return [{ label: 'Chương 5 «Lớn rồi» — mở ở đợt xây kế tiếp', target: null, done: false }];
  }

  /* ================= PHỎNG VẤN — chấm điểm qua sổ log (tiền lệ rel.js) ================= */
  function fireInterview(sceneId) {
    var iv = G.interview;
    if (iv.needReview) {
      window.GAMEUI.toast('📚 Thầy Khánh nhắc: phỏng vấn trượt là do trả lời chưa vào — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn một lượt đã, rồi hẵng thi lại.');
      return true;
    }
    iv.attempts++;
    if (iv.attempts > 1) {
      var st = stats();
      if (st.money >= 0.5) window.GAMEUI.apply({ money: -0.5 }, 'Lệ phí hồ sơ phỏng vấn lại — 5.000 yên');
      else window.GAMEUI.toast('🎓 Tiền không đủ đóng lệ phí hồ sơ phỏng vấn lại — thầy Khánh đóng hộ lần này. Cố mà đỗ nhé!');
    }
    iv.logMark = window.GAMEUI.log().length;
    persist();
    playNow(sceneId);
    return true;
  }
  function scoreInterview(sceneId) {
    var iv = G.interview;
    var lg = window.GAMEUI.log(), ok = 0, ng = 0;
    for (var i = Math.max(0, iv.logMark); i < lg.length; i++) {
      var n = lg[i].note || '';
      if (n.indexOf('Phỏng vấn: đúng') === 0) ok++;
      else if (n.indexOf('Phỏng vấn: sai') === 0) ng++;
    }
    var need = sceneId === 'ch3-phong-van-duhoc' ? 4 : 6;
    if (ok >= need) {
      iv.passed = true; iv.needReview = false;
      window.GAMEUI.apply({ jp: 6 }, 'Đỗ phỏng vấn — nói được, nói đúng mực');
      window.GAMEUI.toast('💼 PHỎNG VẤN ĐẠT! ' + ok + ' câu trả lời vào guồng — cánh cửa việc làm/học tập đã mở. Tiếp theo: nộp hồ sơ ở shiyakusho.');
    } else {
      iv.needReview = true;
      window.GAMEUI.toast('💼 Phỏng vấn chưa đạt (' + ok + ' câu ổn). Không sao — về phòng trọ, ngồi vào BÀN HỌC ôn lại cách trả lời, rồi quay lại phỏng vấn. Thi lại tốn 5.000 yên lệ phí hồ sơ.');
    }
    persist();
  }

  /* ================= CHẶN CẢNH (story.js uỷ quyền) ================= */
  function handleScene(id) {
    var ch = chapter();
    if (ch < 3 || G.ending) return false;
    var s = step();
    if (id === 'school-teacher') {
      if (ch !== 3) return false;
      if (s === 'route') {
        if (!arcResolved()) return false;   // arc tình cảm chưa ngã ngũ — thầy vẫn là thầy của lớp như thường
        playNow('ch3-nga-re'); return true;
      }
      if (s === 'venh') { playNow('ch3-ve-nuoc'); return true; }
      if (s === 'industry') { playNow('ch3-chon-nganh'); return true; }
      if (G.route === 'du-hoc') {
        if (s === 'ind0') { playNow('ind-duhoc-1'); return true; }
        if (s === 'ind1') { playNow('ind-duhoc-2'); return true; }
        if (s === 'ind2') { playNow('ind-duhoc-3'); return true; }
        if (s === 'interview') return fireInterview('ch3-phong-van-duhoc');
      }
      return false;
    }
    if (id === 'officer') {
      if (ch === 3 && s === 'nyukan') { playNow('ch3-nyukan'); return true; }
      return false;
    }
    // Móc của nơi làm ngành đã chọn: bảng tin (buổi 1 & 3 + chuyện phiếm) · người phụ trách (buổi 2 + phỏng vấn)
    var d = routeDef();
    if (ch === 3 && d && G.route === 'tokutei') {
      if (id === d.board || id === d.boss) {
        if (s === 'ind0' && id === d.board) { playNow('ind-' + G.industry + '-1'); return true; }
        if (s === 'ind1' && id === d.boss) { playNow('ind-' + G.industry + '-2'); return true; }
        if (s === 'ind2' && id === d.board) { playNow('ind-' + G.industry + '-3'); return true; }
        if (s === 'interview' && id === d.boss) return fireInterview('ch3-phong-van');
        if ((s === 'nyukan' || s === 'exam') && id === d.board) { playNow('talk-' + G.industry); return true; }   // kaiwa đời thường lặp lại được sau khi xong chuỗi ngành
        return false;
      }
    }
    return false;
  }

  /* ================= TIẾN TRIỂN SAU CẢNH ================= */
  function onSceneEnd(id) {
    if (id === 'room-desk' && G.interview.needReview) {
      G.interview.needReview = false;
      window.GAMEUI.toast('📚 Ôn lại cách trả lời phỏng vấn xong — tự tin hơn rồi. Quay lại nơi phỏng vấn thi lại nhé!');
      persist();
      return;
    }
    if (id === 'ch3-ve-nuoc') {
      if (G.route !== 've-nuoc') return;   // người chơi đổi ý ngay trong cảnh quyết định (cờ saga-route='reset') — không chốt kết cục
      G.ending = 6;
      if (window.FLOW && window.FLOW.addEnding) window.FLOW.addEnding(6);
      persist();
      window.GAMEUI.toast('🏠 Kết cục 6 — «Về quê»: một đời bình thường ở quê nhà, và thỉnh thoảng mơ thấy chuyến tàu năm ấy…');
      deferScene('ket-ve-que', 900);
      return;
    }
    if (id.indexOf('ind-') === 0) {
      var m = id.match(/^ind-([a-z-]+)-(\d)$/);
      if (m) {
        var stage = parseInt(m[2], 10);
        if (stage === G.indStage + 1) { G.indStage = stage; persist(); }
      }
      return;
    }
    if (id === 'ch3-phong-van' || id === 'ch3-phong-van-duhoc') { scoreInterview(id); return; }
    if (id === 'ch3-nyukan') { G.nyukan = true; persist(); return; }
  }

  /* ================= CỜ TỪ CẢNH (FLOW.setFlag 'saga-*') ================= */
  function setFlag(name, value) {
    if (name === 'route') {
      if (value === 'reset') { G.route = null; persist(); }   // đổi ý ở cảnh quyết định về quê → quay lại bước chọn ngã rẽ
      else if (value === 'tokutei' || value === 'du-hoc' || value === 've-nuoc') { G.route = value; persist(); }
    } else if (name === 'industry') {
      if (value && INDUSTRIES[value]) { G.industry = value; G.indStage = 0; persist(); }
    }
  }

  /* ================= KHỞI ĐỘNG ================= */
  function onGameStart(player) {
    gender = player && player.gender === 'F' ? 'F' : 'M';
    var d = null;
    if (window.FLOW && window.FLOW.getSaga) d = window.FLOW.getSaga();
    if (!d) { try { d = JSON.parse(localStorage.getItem(LSKEY)); } catch (e) {} }
    if (d && typeof d === 'object') {
      var f = freshSaga();
      Object.keys(f).forEach(function (k) { if (d[k] !== undefined) f[k] = d[k]; });
      // hợp nhất sâu cho các ô lồng nhau (bản lưu cũ thiếu trường con của c4/c5/interview)
      ['interview', 'c4', 'c5'].forEach(function (k) {
        var base = freshSaga()[k];
        Object.keys(base).forEach(function (kk) { if (f[k][kk] === undefined) f[k][kk] = base[kk]; });
      });
      G = f;
    }
    persist();
  }
  function onMapEnter(id) { /* Pha 1: chưa có nhịp theo bản đồ — Ch4/Ch5 sẽ dùng */ }

  /* ================= KẾT THÚC GAME (Pha 3 lấp đầy) ================= */
  function finishGame() {
    window.GAMEUI.toast('🏁 Mốc N1 đã qua — phần kết cục mở ở đợt xây cuối của truyện.');
  }

  window.SAGA = {
    onGameStart: onGameStart, onSceneEnd: onSceneEnd, onMapEnter: onMapEnter,
    handleScene: handleScene, setFlag: setFlag,
    objective: objective, guideSteps: guideSteps, gateReady: gateReady,
    finishGame: finishGame,
    industryName: industryName,
    industries: function () { return JSON.parse(JSON.stringify(INDUSTRIES)); },
    state: function () { return serialize(); },
    step: step
  };
})();
