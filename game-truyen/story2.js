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
        phoneLie: false, trip: false, payday: 0, health: false, daCap: null, hong: null, bbq: false, bien: false,
        // Pha 2 (Chương 4) — trường bổ sung, bản lưu cũ được hợp nhất mặc định trong onGameStart:
        visaStage: 0, visaDone: false, econShop: false, ind4: 0,
        couple: 0, couplePend: 0, ld: 0, ldPend: 0, crisisPhone: false,
        licRoute: null, licReview: false, licLogMark: 0, licTried2: false, licTried3: false,
        tuanFired: false, darkStage: 0
      },
      c5: { success: 0, married: false, spouse: null, baby: false, baby2: false, baby3: false, fam: 0, babyName: null, finalInterview: false, finalChoice: null, finAttempts: 0, finReview: false, finMark: 0 },
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

  /* ================= MÁY BƯỚC CHƯƠNG 4 «SÓNG GIÓ» (Pha 2) =================
     Chuỗi chính: visa của mình → bạn trượt visa → tiễn bạn → việc năm 2 (1) →
     khủng hoảng quê nhà → kinh tế (siêu thị → tranh luận → tiễn người về) →
     việc năm 2 (2) → bạo hành nơi làm (dấy lên → giải quyết) → bằng lái
     (chọn đường → hiểu biết luật → thực hành) → cám dỗ đỉnh điểm (anh Tuấn;
     đi theo = nhánh đen → kết cục 5) → cờ bạc → bar/karaoke → nhớ nhà 3 → thi N2. */
  function step4() {
    var c = G.c4;
    if (G.ending) return 'done';
    if (!c.visaDone) return c.visaStage === 1 ? 'visa2' : 'visa1';
    if (!c.friendVisa) return 'friend';
    if (!c.farewell) return 'farewell';
    if (c.ind4 < 1) return 'work1';
    if (!c.crisisDone) return 'crisis';
    if (!c.econShop) return 'econ1';
    if (!c.econChoice) return 'econ2';
    if (!c.econ) return 'econ3';
    if (c.ind4 < 2) return 'work2';
    if (!c.bully) return 'bully1';
    if (c.bully === 'dang' || c.bully === 'chiu-dung') return 'bully2';
    if (!c.license) {
      if (!c.licRoute) return 'lic1';
      return c.licenseStage >= 2 ? 'lic3' : 'lic2';
    }
    if (!c.tuan) return 'tuan';
    if (G.darkPath) return c.darkStage >= 1 ? 'dark2' : 'dark1';
    if (!c.gambled) return 'gamble';
    if (!c.bar) return 'bar';
    if (!c.homesick3) return 'homesick';
    return 'exam';
  }
  /* ================= MÁY BƯỚC CHƯƠNG 5 «LỚN RỒI» (Pha 3) =================
     Chuỗi chính: thành công ★ (giao việc quan trọng → dạy hậu bối → khen trước
     đội + thưởng + bảo lãnh nâng visa) → gia đình 3 nhịp (kết hôn / đời độc
     thân · sinh con / gọi về nhà · khai sinh đặt tên / buổi chiều bạn bè) →
     phỏng vấn cuối (chấm điểm như phỏng vấn Ch3) → nyukan: xin vĩnh trú +
     CHỌN HƯỚNG CUỐI → thi N1 → finishGame() chốt kết cục 1–4. */
  function relState() { return (window.REL && window.REL.state) ? window.REL.state() : null; }
  function spousePath() {
    var R = relState();
    if (R && R.partner) return 'partner';
    if (R && R.breakup === 'giu-duoc') return 'ld';
    return 'single';
  }
  var SPOUSE_NAME = { yui: 'Yui', hang: 'Hằng', ren: 'Ren', khoi: 'Khôi' };
  function spouseName() {
    var R = relState();
    if (R && R.partner) return SPOUSE_NAME[R.partner] || 'người yêu';
    if (spousePath() === 'ld') return gender === 'F' ? 'Hải' : 'Linh';
    return null;
  }
  function step5() {
    var c = G.c5;
    if (G.ending) return 'done';
    if (c.success < 1) return 'succ1';
    if (c.success < 2) return 'succ2';
    if (c.success < 3) return 'succ3';
    if (c.fam < 1) return 'fam1';
    if (c.fam < 2) return 'fam2';
    if (c.fam < 3) return 'fam3';
    if (!c.finalInterview) return 'final';
    if (!c.finalChoice) return 'visa';
    return 'exam';
  }

  /* ================= CỔNG THI (story.js hỏi trước khi mở đề ở bảng đen) ================= */
  function gateReady(level) {
    if (level === 'N3') return chapter() === 3 && !G.ending && G.interview.passed && G.nyukan;
    if (level === 'N2') return chapter() === 4 && gate4();
    if (level === 'N1') return chapter() >= 5 && gate5();
    return false;
  }
  function gate4() { return !G.ending && chapter() === 4 && step4() === 'exam'; }
  function gate5() { return !G.ending && chapter() >= 5 && step5() === 'exam'; }

  /* ================= MỤC TIÊU (story.js advanceObjective hỏi trước rel.js) ================= */
  var ENDING_OBJ = {
    1: '🏡 Kết cục «An cư xứ người» đã mở — mở ⚙️ Cài đặt → «Sổ kết cục» để xem lại, và sống tiếp những ngày bình yên ở Nhật',
    2: '🎋 Kết cục «Vinh quy» đã mở — mở ⚙️ Cài đặt → «Sổ kết cục» để xem lại; nước Nhật vẫn ở đây mỗi khi bạn quay lại thăm',
    3: '🌙 Kết cục «Lưng chừng» đã mở — mở ⚙️ Cài đặt → «Sổ kết cục» để xem lại; một đời vẫn còn dài để viết tiếp những chương khác',
    4: '✉️ Kết cục «Tay trắng» đã mở — mở ⚙️ Cài đặt → «Sổ kết cục» để xem lại; chơi lại và đi đường thẳng để thấy một cái kết khác',
    5: '🌑 Kết cục đen đã mở — mở ⚙️ Cài đặt → «Sổ kết cục» để xem lại. Chơi lại và đi đường thẳng, để thấy một đời khác mở ra thế nào',
    6: '🏠 Kết thúc sớm «Về quê» đã mở — mở ⚙️ Cài đặt → «Sổ kết cục» để xem lại, hoặc chơi lại từ đầu để đi một đường khác'
  };
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
        case 'nyukan': return '🛂 Tới NYUKAN (入管局 — Cục quản lý xuất nhập cảnh) nộp hồ sơ đổi tư cách lưu trú — gặp CÁN BỘ NYUKAN ở quầy: họ sẽ hỏi xoáy đúng chỗ yếu của hồ sơ, cứ thành thật mà đáp';
        case 'exam': return '🎓 Mọi cửa đã qua — tới TRƯỜNG TIẾNG xem BẢNG ĐEN để thi MỐC JLPT N3, cổng cuối Chương 3';
      }
      return null;
    }
    if (ch === 4) {
      var c = G.c4, d = routeDef();
      var place = d ? d.place : 'nơi làm', hook = d ? d.hookName : 'quản lý';
      switch (s) {
        case 'done': return G.ending === 5 ? '🌑 Kết cục đen — con đường tắt đã khép lại. Chơi lại và đi đường thẳng, để thấy một đời khác mở ra thế nào' : '🌸 Tự do khám phá';
        case 'visa1': return '🛂 Chương 4 «Sóng gió» — tới NYUKAN (入管局) nộp hồ sơ GIA HẠN tư cách lưu trú: gặp CÁN BỘ NYUKAN ở quầy, giấy tờ mang đủ, trả lời thành thật';
        case 'visa2': return '🛂 Quay lại NYUKAN — bổ sung giấy còn thiếu và NHẬN THẺ LƯU TRÚ MỚI của mình';
        case 'friend': return '🍶 Ra PHỐ gặp HÙNG "sẹo" — anh ấy đang chờ để báo một tin không vui về Đức, bạn cùng ký túc';
        case 'farewell': return '🚃 Ra GA tiễn Đức về nước — đi sớm kẻo lỡ chuyến tàu ra sân bay của bạn';
        case 'work1': return '🏭 Tới ' + place + ' — gặp ' + hook + ': một ngày làm của NĂM THỨ HAI, khi người ta bắt đầu giao việc thật cho mình';
        case 'crisis': return '📱 Tin dữ từ quê nhà: bố ốm, cần tiền gấp. Tới ' + place + ' gặp ' + hook + ' — xoay tiền giúp bố bằng một trong ba cách: tăng ca · vay bạn · xin ứng lương';
        case 'econ1': return '🛒 Vào SIÊU THỊ xem kệ hàng — giá cả dạo này lạ lắm, tận mắt xem mới hiểu chuyện gì đang tới';
        case 'econ2': return '🌐 Ra PHỐ gặp HÙNG — đêm nay cả ký túc xá tranh luận một chuyện lớn: Ở LẠI HAY VỀ';
        case 'econ3': return '🚃 Ra GA tiễn Sơn — người bạn quyết định về nước giữa cơn sóng giá';
        case 'work2': return '🏭 Tới ' + place + ' — gặp ' + hook + ': ngày thể hiện tay nghề của năm thứ hai';
        case 'bully1': return G.route === 'du-hoc'
          ? '😠 Ở quán baito đang có chuyện không lành — tới COMBINI chỗ làm thêm xem chuyện gì'
          : '😠 Ở ' + place + ' đang có chuyện không lành — tới ' + hook + ' xem chuyện gì đang xảy ra với đồng nghiệp của mình';
        case 'bully2': return '⚖️ Tới ĐỒN CẢNH SÁT (koban) — mang theo chứng cứ và sự bình tĩnh: giải quyết vụ bắt nạt nơi làm bằng con đường đúng';
        case 'lic1': return '🪪 Ra PHỐ — tới BIỂN TRUNG TÂM SÁT HẠCH BẰNG LÁI ở đầu phố: tìm hiểu hai con đường lấy bằng lái ở Nhật';
        case 'lic2': return c.licReview
          ? '📚 Phần hiểu biết luật chưa qua — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại luật giao thông, rồi quay lại trung tâm sát hạch'
          : '🪪 Tới TRUNG TÂM SÁT HẠCH BẰNG LÁI — ngày thi HIỂU BIẾT LUẬT giao thông';
        case 'lic3': return c.licReview
          ? '📚 Thi thực hành chưa qua — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại, rồi quay lại trung tâm sát hạch'
          : '🪪 Tới TRUNG TÂM SÁT HẠCH BẰNG LÁI — THI THỰC HÀNH: lấy tấm bằng lái Nhật về tay';
        case 'tuan': return '🌑 Ra PHỐ gặp HÙNG — và một người còn đáng sợ hơn đang chờ ở đó: anh Tuấn "môi giới" đã quay lại…';
        case 'dark1': case 'dark2': return '🌑 Con đường tắt đang nuốt dần những ngày tháng… (cảnh tự mở, cứ sinh hoạt bình thường)';
        case 'gamble': return '🎰 Lời rủ pachinko/cá độ của anh Tuấn vẫn lởn vởn đâu đây — cảnh sẽ tự tới, cứ sinh hoạt bình thường';
        case 'bar': return '🎤 Tới KARAOKE — xả stress với hội bạn một đêm cho đáng, mà vẫn phải biết điểm dừng';
        case 'homesick': return '🌸 Ra CÔNG VIÊN, tới gốc anh đào lớn — có một nỗi nhớ nhà lần thứ ba đang chờ ở đó';
        case 'exam': return '🎓 Sóng gió đã qua — tới TRƯỜNG TIẾNG xem BẢNG ĐEN để thi MỐC JLPT N2, cổng cuối Chương 4';
      }
      return '🌊 Chương 4 «Sóng gió» — cứ sống tiếp những ngày ở Nhật, truyện sẽ tự tìm tới';
    }
    if (ch >= 5) {
      var c5 = G.c5, d5 = routeDef();
      var place5 = d5 ? d5.place : 'nơi làm', hook5 = d5 ? d5.hookName : 'quản lý';
      var path5 = spousePath(), sn5 = spouseName();
      switch (s) {
        case 'done': return ENDING_OBJ[G.ending] || '🌸 Tự do khám phá — đời ở Nhật vẫn tiếp diễn';
        case 'succ1': return '🌟 Chương 5 «Lớn rồi» — tới ' + place5 + ' gặp ' + hook5 + ': sau bao năm, người ta sắp giao cho mình một VIỆC QUAN TRỌNG';
        case 'succ2': return '🌱 Tới ' + place5 + ' gặp ' + hook5 + ': có HẬU BỐI mới sang đang chờ mình dìu — như ngày nào người ta dìu mình';
        case 'succ3': return '🏅 Tới ' + place5 + ' gặp ' + hook5 + ': buổi tổng kết năm — nghe nói có chuyện thưởng và chuyện visa được công ty bảo lãnh';
        case 'fam1': return path5 === 'partner'
          ? '💒 Tới SHIYAKUSHO cùng ' + sn5 + ' — ngày ĐĂNG KÝ KẾT HÔN: tờ giấy nhỏ, đời người lớn'
          : path5 === 'ld'
            ? '📞 Về PHÒNG TRỌ, dùng điện thoại trên bàn thấp — chuyện trăm năm với ' + sn5 + ' ở quê: đã đến lúc quyết định cho trọn lời hứa sân bay'
            : '🌿 Về PHÒNG TRỌ — một buổi tối yên tĩnh cho riêng mình: người trưởng thành cũng có hạnh phúc của người trưởng thành';
        case 'fam2': return c5.married
          ? '🏥 Tới BỆNH VIỆN — ngày đón đứa con đầu lòng chào đời, ngày làm cha/mẹ bắt đầu'
          : '📞 Về PHÒNG TRỌ, dùng điện thoại trên bàn thấp — gọi về nhà cho bố mẹ: có những chuyện chỉ nói được khi mình đã thật sự lớn';
        case 'fam3': return c5.married
          ? '🛂 Tới SHIYAKUSHO — làm GIẤY KHAI SINH cho con và chọn cái tên mang cả hai quê hương'
          : '🌸 Ra CÔNG VIÊN — một buổi chiều với những người bạn đã thành gia đình thứ hai ở đất khách';
        case 'final': return c5.finReview
          ? '📚 Phỏng vấn cuối chưa qua — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại cách trả lời, rồi quay lại (thi lại tốn 5.000 yên lệ phí hồ sơ)'
          : '💼 Tới ' + place5 + ' gặp ' + hook5 + ': TRẬN PHỎNG VẤN CUỐI — đàm phán lương và vị trí bằng thứ tiếng Nhật của người đã lớn';
        case 'visa': return '🛂 Tới NYUKAN (入管局) — nộp hồ sơ ở quầy cán bộ nyukan và CHỌN HƯỚNG ĐI CUỐI CÙNG: xin vĩnh trú ở lại, hay gói ghém hồi hương dựng nghiệp';
        case 'exam': return '🎓 Mọi cửa đã qua — tới TRƯỜNG TIẾNG xem BẢNG ĐEN để thi MỐC JLPT N1, cổng cuối của cả hành trình';
      }
      return '🌅 Chương 5 «Lớn rồi» — cứ sống tiếp, cái kết đang tự viết ra từ chính những lựa chọn của mình';
    }
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
      out.push({ label: 'Tới NYUKAN (入管局) — nộp hồ sơ đổi tư cách lưu trú ở quầy cán bộ nyukan', target: { scene: 'officer' }, done: G.nyukan });
      if (ex3.needReview) out.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại bài, rồi quay lại trường thi tiếp', target: { scene: 'room-desk' }, done: !!ex3.passed });
      out.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để thi mốc JLPT N3, cổng cuối Chương 3', target: { scene: 'school-board' }, done: !!ex3.passed });
      if (ex3.passed) out.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để mở TỔNG KẾT Chương 3', target: { scene: 'school-board' }, done: ch >= 4 });
      return out;
    }
    if (ch === 4) {
      var c = G.c4, d = routeDef(), out = [];
      var boardT = d ? { scene: d.board } : { scene: 'school-teacher' };
      var bossT = d ? { scene: d.boss } : { scene: 'school-teacher' };
      var place = d ? d.place : 'nơi làm';
      out.push({ label: 'Tới NYUKAN (入管局) — nộp hồ sơ GIA HẠN tư cách lưu trú ở quầy cán bộ nyukan', target: { scene: 'officer' }, done: c.visaStage >= 1 || !!c.visaDone });
      out.push({ label: 'Quay lại NYUKAN — bổ sung giấy còn thiếu và NHẬN THẺ LƯU TRÚ MỚI', target: { scene: 'officer' }, done: !!c.visaDone });
      out.push({ label: 'Ra PHỐ — gặp HÙNG "sẹo": có tin dữ về visa của Đức, bạn cùng ký túc', target: { scene: 'hung' }, done: !!c.friendVisa });
      out.push({ label: 'Ra GA — tiễn Đức về nước, một lời hứa hẹn gặp lại', target: { scene: 'station' }, done: !!c.farewell });
      out.push({ label: (G.route === 'du-hoc' ? 'Buổi học đầu tiên của năm mới — tới trường tiếng gặp thầy Khánh' : 'Ngày làm đầu tiên của năm thứ hai — tới ' + place), target: boardT, done: c.ind4 >= 1 });
      out.push({ label: 'Tin dữ từ quê: bố ốm cần tiền gấp — tới ' + (G.route === 'du-hoc' ? 'trường tiếng gặp thầy Khánh' : place + ' gặp người quản lý') + ' để xoay tiền giúp bố', target: bossT, done: !!c.crisisDone });
      out.push({ label: 'Vào SIÊU THỊ — xem kệ hàng: giá cả leo thang thấy bằng mắt', target: { scene: 'super-shelf' }, done: !!c.econShop });
      out.push({ label: 'Ra PHỐ — gặp HÙNG: đêm ký túc tranh luận Ở LẠI HAY VỀ', target: { scene: 'hung' }, done: !!c.econChoice });
      out.push({ label: 'Ra GA — tiễn Sơn, người bạn quyết về nước giữa cơn sóng giá', target: { scene: 'station' }, done: !!c.econ });
      out.push({ label: (G.route === 'du-hoc' ? 'Buổi học thứ hai của năm mới — thuyết trình và hướng nghiệp ở trường tiếng' : 'Ngày thể hiện tay nghề năm thứ hai — tới ' + place), target: bossT, done: c.ind4 >= 2 });
      out.push({ label: G.route === 'du-hoc' ? 'Tới COMBINI chỗ làm thêm — chuyện bắt nạt ở quán baito cần được nhìn thẳng' : 'Tới ' + place + ' — chuyện bắt nạt nơi làm cần được nhìn thẳng', target: G.route === 'du-hoc' ? { scene: 'combini' } : boardT, done: !!c.bully });
      out.push({ label: 'Tới ĐỒN CẢNH SÁT (koban) — trình bày chứng cứ, gọi tổng đài hỗ trợ lao động: giải quyết vụ bắt nạt bằng đường đúng', target: { scene: 'koban' }, done: c.bully === 'xong-dung' || c.bully === 'xong-chiu' });
      out.push({ label: 'Ra PHỐ — tới BIỂN TRUNG TÂM SÁT HẠCH BẰNG LÁI: chọn đường lấy bằng (học trường lái / đổi bằng gaimen kirikae)', target: { scene: 'license-center' }, done: !!c.licRoute });
      out.push({ label: 'Tới TRUNG TÂM SÁT HẠCH — ngày thi HIỂU BIẾT LUẬT giao thông', target: { scene: 'license-center' }, done: c.licenseStage >= 2 || !!c.license });
      if (c.licReview) out.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại luật giao thông trước khi thi tiếp', target: { scene: 'room-desk' }, done: !c.licReview });
      out.push({ label: 'Tới TRUNG TÂM SÁT HẠCH — THI THỰC HÀNH lấy bằng lái Nhật', target: { scene: 'license-center' }, done: !!c.license });
      out.push({ label: 'Ra PHỐ — gặp HÙNG… và anh Tuấn "môi giới" quay lại với kèo bỏ trốn lương gấp đôi', target: { scene: 'hung' }, done: !!c.tuan });
      if (G.darkPath) {
        out.push({ label: 'Con đường tắt đã chọn — những ngày sống chui phía trước…', target: null, done: !!G.ending });
      } else {
        out.push({ label: 'Lời rủ pachinko/cá độ của anh Tuấn — cảnh tự mở, cứ sinh hoạt bình thường', target: null, done: !!c.gambled });
        out.push({ label: 'Tới KARAOKE — xả stress với hội bạn, vui có chừng mực', target: { scene: 'karaoke-reception' }, done: !!c.bar });
        out.push({ label: 'Ra CÔNG VIÊN — gốc anh đào lớn: nhớ nhà lần thứ ba', target: { scene: 'hanami' }, done: !!c.homesick3 });
      }
      if (ex4.needReview) out.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại bài, rồi quay lại trường thi tiếp', target: { scene: 'room-desk' }, done: !!ex4.passed });
      out.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để thi mốc JLPT N2, cổng cuối Chương 4', target: { scene: 'school-board' }, done: !!ex4.passed });
      if (ex4.passed) out.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để mở TỔNG KẾT Chương 4', target: { scene: 'school-board' }, done: ch >= 5 });
      return out;
    }
    if (ch >= 5) {
      var c5 = G.c5, d5 = routeDef(), out5 = [];
      var boardT5 = d5 ? { scene: d5.board } : { scene: 'school-teacher' };
      var bossT5 = d5 ? { scene: d5.boss } : { scene: 'school-teacher' };
      var place5 = d5 ? d5.place : 'nơi làm';
      var path5 = spousePath(), sn5 = spouseName();
      out5.push({ label: 'Tới ' + place5 + ' — VIỆC QUAN TRỌNG đầu tiên được giao cho người đã đứng vững', target: boardT5, done: c5.success >= 1 });
      out5.push({ label: 'Tới ' + place5 + ' — dìu dắt HẬU BỐI mới sang, như ngày nào mình được dìu dắt', target: bossT5, done: c5.success >= 2 });
      out5.push({ label: 'Tới ' + place5 + ' — buổi tổng kết: lời khen trước cả đội, tiền thưởng và bảo lãnh nâng visa', target: boardT5, done: c5.success >= 3 });
      if (path5 === 'partner') out5.push({ label: 'Tới SHIYAKUSHO cùng ' + sn5 + ' — ĐĂNG KÝ KẾT HÔN ở quầy cán bộ', target: { scene: 'officer' }, done: c5.fam >= 1 });
      else if (path5 === 'ld') out5.push({ label: 'Về PHÒNG TRỌ — gọi về nhà: quyết định chuyện trăm năm với ' + sn5, target: { scene: 'call-home' }, done: c5.fam >= 1 });
      else out5.push({ label: 'Về PHÒNG TRỌ — buổi tối của riêng mình: con đường của người trưởng thành độc thân', target: null, done: c5.fam >= 1 });
      if (path5 !== 'single') {
        out5.push({ label: 'Tới BỆNH VIỆN — đón đứa con đầu lòng chào đời', target: { scene: 'hospital-reception' }, done: c5.fam >= 2 });
        out5.push({ label: 'Tới SHIYAKUSHO — làm GIẤY KHAI SINH và đặt tên cho con', target: { scene: 'officer' }, done: c5.fam >= 3 });
      } else {
        out5.push({ label: 'Về PHÒNG TRỌ — gọi về nhà cho bố mẹ: chuyện của người đã lớn', target: { scene: 'call-home' }, done: c5.fam >= 2 });
        out5.push({ label: 'Ra CÔNG VIÊN — buổi chiều với những người bạn đã thành gia đình', target: { scene: 'hanami' }, done: c5.fam >= 3 });
      }
      out5.push({ label: 'Tới ' + place5 + ' — TRẬN PHỎNG VẤN CUỐI: đàm phán bằng tiếng Nhật của người đã lớn', target: bossT5, done: !!c5.finalInterview });
      if (c5.finReview) out5.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại cách trả lời phỏng vấn cuối', target: { scene: 'room-desk' }, done: !c5.finReview });
      out5.push({ label: 'Tới NYUKAN (入管局) — quầy cán bộ nyukan: nộp hồ sơ và CHỌN HƯỚNG ĐI CUỐI (vĩnh trú / hồi hương)', target: { scene: 'officer' }, done: !!c5.finalChoice });
      if (ex5.needReview) out5.push({ label: 'Về PHÒNG TRỌ — ngồi vào BÀN HỌC ôn lại bài, rồi quay lại trường thi tiếp', target: { scene: 'room-desk' }, done: !!ex5.passed });
      out5.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để thi mốc JLPT N1, cổng cuối của hành trình', target: { scene: 'school-board' }, done: !!ex5.passed });
      if (ex5.passed) out5.push({ label: 'Tới TRƯỜNG TIẾNG — xem BẢNG ĐEN để mở KẾT CỤC của đời xa xứ này', target: { scene: 'school-board' }, done: !!G.ending });
      if (G.ending) out5.push({ label: '🏆 Truyện chính đã khép — mở ⚙️ Cài đặt → «Sổ kết cục» xem các kết cục đã mở, hoặc sống tiếp tự do ở Nhật', target: null, done: true });
      return out5;
    }
    return null;
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

  /* ================= PHỎNG VẤN CUỐI CHƯƠNG 5 — chấm điểm qua sổ log ================= */
  function fireFinal(sceneId) {
    var c = G.c5;
    if (c.finReview) {
      window.GAMEUI.toast('📚 Thầy Khánh nhắc: phỏng vấn cuối chưa qua là do trả lời chưa đủ tầm — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn một lượt đã, rồi hẵng thi lại.');
      return true;
    }
    c.finAttempts++;
    if (c.finAttempts > 1) {
      var st = stats();
      if (st.money >= 0.5) window.GAMEUI.apply({ money: -0.5 }, 'Lệ phí hồ sơ phỏng vấn lại — 5.000 yên');
      else window.GAMEUI.toast('💼 Tiền không đủ đóng lệ phí hồ sơ phỏng vấn lại — thầy Khánh đóng hộ lần này. Cố mà đỗ nhé!');
    }
    c.finMark = window.GAMEUI.log().length;
    persist();
    playNow(sceneId);
    return true;
  }
  function scoreFinal() {
    var c = G.c5;
    var lg = window.GAMEUI.log(), ok = 0;
    for (var i = Math.max(0, c.finMark); i < lg.length; i++) {
      if ((lg[i].note || '').indexOf('Phỏng vấn cuối: đúng') === 0) ok++;
    }
    if (ok >= 5) {
      c.finalInterview = true; c.finReview = false;
      window.GAMEUI.apply({ jp: 6 }, 'Đỗ phỏng vấn cuối — đàm phán như người đã lớn');
      window.GAMEUI.toast('💼 PHỎNG VẤN CUỐI: ĐẠT! ' + ok + ' câu trả lời ở đẳng cấp khác hẳn năm đầu. Chỉ còn một cửa: quầy cán bộ và hướng đi cuối cùng.');
    } else {
      c.finReview = true;
      window.GAMEUI.toast('💼 Phỏng vấn cuối chưa đạt (' + ok + ' câu ổn, cần 5). Về phòng trọ, ngồi vào BÀN HỌC ôn lại cách trả lời, rồi quay lại — thi lại tốn 5.000 yên lệ phí hồ sơ.');
    }
    persist();
  }

  /* ================= BẰNG LÁI — mở kỳ sát hạch + chấm điểm qua sổ log ================= */
  function fireLicense(sceneId) {
    var c = G.c4;
    if (c.licReview) {
      window.GAMEUI.toast('📚 Thầy Khánh nhắc: thi chưa qua là do luật chưa thuộc — về PHÒNG TRỌ ngồi vào BÀN HỌC ôn một lượt đã, rồi hẵng thi tiếp.');
      return true;
    }
    var triedKey = sceneId === 'c4-lic-2' ? 'licTried2' : sceneId === 'c4-lic-3' ? 'licTried3' : null;
    if (triedKey) {
      if (c[triedKey]) {
        var st = stats();
        if (st.money >= 0.3) window.GAMEUI.apply({ money: -0.3 }, 'Lệ phí thi lại sát hạch — 3.000 yên');
        else window.GAMEUI.toast('🪪 Tiền không đủ đóng lệ phí thi lại — thầy Khánh đóng hộ lần này. Thi cho đỗ nhé!');
      }
      c[triedKey] = true;
      c.licLogMark = window.GAMEUI.log().length;
    }
    persist();
    playNow(sceneId);
    return true;
  }
  function scoreLicense(sceneId) {
    var c = G.c4;
    var lg = window.GAMEUI.log(), ok = 0, ng = 0;
    for (var i = Math.max(0, c.licLogMark); i < lg.length; i++) {
      var n = lg[i].note || '';
      if (n.indexOf('Bằng lái: đúng') === 0) ok++;
      else if (n.indexOf('Bằng lái: sai') === 0) ng++;
    }
    var need = 4;
    if (ok >= need) {
      c.licReview = false;
      if (sceneId === 'c4-lic-2') {
        c.licenseStage = 2;
        window.GAMEUI.apply({ jp: 3 }, 'Qua phần hiểu biết luật giao thông');
        window.GAMEUI.toast('🪪 PHẦN HIỂU BIẾT LUẬT: ĐẠT (' + ok + ' câu đúng)! Còn cửa cuối: thi THỰC HÀNH — quay lại trung tâm sát hạch khi sẵn sàng.');
      } else {
        c.license = true; c.licenseStage = 3;
        window.GAMEUI.apply({ jp: 4 }, 'Đỗ thi thực hành — có bằng lái Nhật');
        window.GAMEUI.toast('🪪 THI THỰC HÀNH: ĐẠT (' + ok + ' tình huống đúng)! Tấm bằng lái Nhật sắp về tay…');
        deferScene('c4-lic-done', 1000);
      }
    } else {
      c.licReview = true;
      window.GAMEUI.toast('🪪 Chưa đạt (' + ok + ' câu/tình huống đúng, cần ' + need + '). Về PHÒNG TRỌ ngồi vào BÀN HỌC ôn lại luật, rồi quay lại thi tiếp — thi lại tốn 3.000 yên lệ phí.');
    }
    persist();
  }

  /* ================= CÁM DỖ ĐỈNH ĐIỂM — anh Tuấn quay lại ================= */
  function fireTuan() {
    if (G.c4.tuanFired) return true;
    G.c4.tuanFired = true;
    persist();
    playNow('c4-tuan-1');
    return true;
  }

  /* ================= ĐIỆN THOẠI KHỦNG HOẢNG QUÊ NHÀ (bố ốm) ================= */
  function maybeCrisisPhone() {
    var c = G.c4;
    if (chapter() !== 4 || G.ending || c.crisisPhone || c.crisisDone) return;
    if (step4() !== 'crisis') return;
    c.crisisPhone = true;
    persist();
    if (window.PHONE && window.PHONE.receive) {
      window.PHONE.receive('family', ['Mẹ: Con ơi… bố con nhập viện từ tối qua. Bác sĩ nói phải mổ, nhà mình cần gấp khoảng 10 man để đóng viện phí đợt đầu. Con đừng hoảng — mẹ chỉ báo để con biết, anh chị em ở nhà đang chạy vậy khắp nơi rồi…']);
      if (window.PHONE.setReplies) window.PHONE.setReplies('family', [
        { text: 'Mẹ đừng lo, để con xoay ngay. Con sẽ gửi tiền về trong tuần này — mẹ cứ yên tâm lo cho bố, phần tiền để con gánh!', fx: { deltas: { love: 2, pressure: 2 }, note: 'Hứa xoay tiền chữa bệnh cho bố — gánh nặng nhận về mình' }, follow: ['Mẹ: Con ơi… mẹ biết ngay là chỉ trông vào con được thôi. Con nhớ giữ sức khỏe đấy, đừng có gồng quá nghe chưa. Bố tỉnh là mẹ gọi lại liền.'] },
        { text: 'Trời ơi… bố có nặng lắm không mẹ? Con… con để con tính đã, con gọi lại mẹ sau nhé.', fx: { deltas: { pressure: 3 }, note: 'Hoảng loạn khi nghe tin bố nhập viện' }, follow: ['Mẹ: Bố qua cơn nguy hiểm rồi con ạ, chỉ là tiền thì… Thôi con cứ bình tĩnh tính, mẹ đợi tin con.'] }
      ]);
    }
    window.GAMEUI.toast('📱 Tin KHẨN từ Mẹ — mở điện thoại đọc ngay!');
  }

  /* ================= CHẶN CẢNH (story.js uỷ quyền) ================= */
  function handleScene(id) {
    var ch = chapter();
    if (ch < 3 || G.ending) return false;
    var s = step();
    /* ============ CHƯƠNG 5 «LỚN RỒI» (Pha 3) ============ */
    if (ch === 5) {
      var c5 = G.c5, d5 = routeDef(), path5 = spousePath();
      if (id === 'officer') {
        if (s === 'fam1' && path5 === 'partner') { var R5 = relState(); playNow('c5-marry-' + R5.partner); return true; }
        if (s === 'fam3' && c5.married) { playNow('c5-baby-2'); return true; }
        if (s === 'visa') { playNow('c5-visa-final'); return true; }
        return false;
      }
      if (id === 'call-home') {
        if (s === 'fam1' && path5 === 'ld') { playNow(gender === 'F' ? 'c5-marry-ld-nu' : 'c5-marry-ld'); return true; }
        if (s === 'fam2' && path5 === 'single') { playNow('c5-single-2'); return true; }
        return false;
      }
      if (id === 'hospital-reception') {
        if (s === 'fam2' && c5.married) { playNow('c5-baby-1'); return true; }
        return false;
      }
      if (id === 'hanami') {
        if (s === 'fam3' && path5 === 'single') { playNow('c5-single-3'); return true; }
        return false;
      }
      if (d5 && (id === d5.board || id === d5.boss)) {
        var ind5 = G.route === 'du-hoc' ? 'duhoc' : G.industry;
        if (s === 'succ1' && id === d5.board) { playNow('c5-succ-' + ind5 + '-1'); return true; }
        if (s === 'succ2' && id === d5.boss) { playNow('c5-succ-' + ind5 + '-2'); return true; }
        if (s === 'succ3' && id === d5.board) { playNow('c5-succ-' + ind5 + '-3'); return true; }
        if (s === 'final' && id === d5.boss) return fireFinal('c5-final-1');
        if (s === 'exam' && id === d5.board && G.route === 'tokutei') { playNow('talk-' + G.industry); return true; }   // kaiwa đời thường nơi làm, lặp lại được ở cuối chương
        return false;
      }
      return false;
    }
    /* ============ CHƯƠNG 4 «SÓNG GIÓ» (Pha 2) ============ */
    if (ch === 4) {
      var c = G.c4, d = routeDef();
      if (id === 'officer') {
        if (s === 'visa1') { playNow('c4-visa-1'); return true; }
        if (s === 'visa2') { playNow('c4-visa-2'); return true; }
        return false;
      }
      if (id === 'hung') {
        if (s === 'friend') { playNow('c4-friend-1'); return true; }
        if (s === 'econ2') { playNow('c4-econ-2'); return true; }
        if (s === 'tuan') return fireTuan();
        if (c.farewell && !c.hong && s !== 'friend' && s !== 'econ2' && s !== 'tuan') { playNow('c4-hong'); return true; }   // cảnh phụ §6c: rủ trộm hồng — sau khi tiễn Đức, Hùng rủ rê kiểu bạn bè
        return false;
      }
      if (id === 'station') {
        if (s === 'farewell') { playNow('c4-friend-2'); return true; }
        if (s === 'econ3') { playNow('c4-econ-3'); return true; }
        if (c.econ && !c.daCap) { playNow('c4-dacap'); return true; }       // cảnh phụ §6c: rủ rê đa cấp ở ga
        if (c.homesick3 && !c.trip) { playNow('c4-trip'); return true; }     // cảnh phụ §6c: chuyến đi onsen sau khi qua cơn nhớ nhà
        return false;
      }
      if (id === 'super-shelf') {
        if (s === 'econ1') { playNow('c4-econ-1'); return true; }
        return false;
      }
      if (id === 'karaoke-reception') {
        if (s === 'bar') { playNow('c4-bar'); return true; }
        return false;
      }
      if (id === 'hanami') {
        if (s === 'homesick') { playNow('c4-homesick'); return true; }
        return false;
      }
      if (id === 'koban') {
        if (s === 'bully2') { playNow(c.bully === 'chiu-dung' ? 'c4-bully-2b' : 'c4-bully-2'); return true; }
        return false;
      }
      if (id === 'license-center') {
        if (s === 'lic1') { playNow('c4-lic-1'); return true; }
        if (s === 'lic2') return fireLicense('c4-lic-2');
        if (s === 'lic3') return fireLicense('c4-lic-3');
        return false;   // ngoài bước sát hạch → cảnh thông tin 'license-center' trong DEMO_DATA chạy như thường
      }
      if (id === 'bank-counter') {
        if (!c.payday && c.crisisDone) { playNow('c4-gui-tien'); return true; }   // cảnh phụ §6c: ngày lương — gửi hết về nhà, cuối tháng ăn trứng
        return false;
      }
      if (id === 'hospital-reception') {
        if (!c.health) { playNow('c4-health'); return true; }   // cảnh phụ §6c: khám sức khỏe định kỳ
        return false;
      }
      if (id === 'dong-huong') {
        if (!c.bbq) { playNow('c4-bbq'); return true; }          // cảnh phụ §6c: BBQ bị cứu hỏa tới
        if (!c.bien) { playNow('c4-bien'); return true; }        // cảnh phụ §6c: đi biển bắt hàu ngao
        return false;
      }
      if (id === 'combini') {
        if (G.route === 'du-hoc' && s === 'bully1') { playNow('c4-bully-dh'); return true; }   // bạo hành ở quán baito của du học sinh
        return false;
      }
      if (G.route === 'du-hoc' && id === 'school-teacher') {
        if (s === 'work1') { playNow('ind4-duhoc-1'); return true; }
        if (s === 'crisis') { playNow('c4-crisis-dh'); return true; }
        if (s === 'work2') { playNow('ind4-duhoc-2'); return true; }
        return false;
      }
      if (d && G.route === 'tokutei' && (id === d.board || id === d.boss)) {
        if (s === 'work1' && id === d.board) { playNow('ind4-' + G.industry + '-1'); return true; }
        if (s === 'crisis' && id === d.boss) { playNow('c4-crisis'); return true; }
        if (s === 'work2' && id === d.boss) { playNow('ind4-' + G.industry + '-2'); return true; }
        if (s === 'bully1' && id === d.board) { playNow('c4-bully-1'); return true; }
        if (s === 'exam' && id === d.board) { playNow('talk-' + G.industry); return true; }   // kaiwa đời thường nơi làm, lặp lại được ở cuối chương
        return false;
      }
      return false;
    }
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
    if (id === 'room-desk' && G.c5.finReview) {
      G.c5.finReview = false;
      window.GAMEUI.toast('📚 Ôn lại cách trả lời phỏng vấn cuối xong — lần này sẽ khác. Quay lại nơi làm, gặp người phụ trách để thi lại nhé!');
      persist();
      return;
    }
    /* ============ TIẾN TRIỂN CHƯƠNG 5 (Pha 3) ============ */
    var c5o = G.c5;
    var ms5 = id.match(/^c5-succ-([a-z-]+)-(\d)$/);
    if (ms5) { var stg5 = parseInt(ms5[2], 10); if (stg5 === c5o.success + 1) { c5o.success = stg5; persist(); } return; }
    if (id === 'c5-marry-yui' || id === 'c5-marry-hang' || id === 'c5-marry-ren' || id === 'c5-marry-khoi') {
      c5o.married = true; c5o.spouse = id.slice('c5-marry-'.length); c5o.fam = 1;
      window.GAMEUI.apply({ love: 3 }, 'Đăng ký kết hôn — từ nay đi đâu cũng có nhau');
      persist(); return;
    }
    if (id === 'c5-marry-ld' || id === 'c5-marry-ld-nu') { c5o.married = true; c5o.spouse = 'ld'; c5o.fam = 1; window.GAMEUI.apply({ love: 3 }, 'Lời hứa sân bay năm nào — hôm nay thành vợ chồng'); persist(); return; }
    if (id === 'c5-single-1') { c5o.fam = 1; persist(); return; }
    if (id === 'c5-baby-1') { c5o.baby = true; c5o.fam = 2; window.GAMEUI.apply({ love: 3 }, 'Đón con đầu lòng — đời người sang một trang mới'); persist(); return; }
    if (id === 'c5-single-2') { c5o.fam = 2; persist(); return; }
    if (id === 'c5-baby-2') { c5o.baby2 = true; c5o.fam = 3; persist(); return; }
    if (id === 'c5-single-3') { c5o.fam = 3; persist(); return; }
    if (id === 'c5-baby-3') { c5o.baby3 = true; persist(); return; }
    if (id === 'c5-final-1') { scoreFinal(); return; }
    if (id === 'ket-1' || id === 'ket-2' || id === 'ket-3' || id === 'ket-4') { setTimeout(showFinalSummary, 700); return; }
    /* ============ TIẾN TRIỂN CHƯƠNG 4 (Pha 2) ============ */
    if (id === 'room-desk' && G.c4.licReview) {
      G.c4.licReview = false;
      window.GAMEUI.toast('📚 Ôn lại luật giao thông xong — những biển báo và quy tắc nhường đường đã vào đầu. Quay lại trung tâm sát hạch thi tiếp nhé!');
      persist();
      return;
    }
    var c4 = G.c4;
    if (id === 'c4-visa-1') { c4.visaStage = 1; persist(); maybeCrisisPhone(); return; }
    if (id === 'c4-visa-2') { c4.visaDone = true; c4.visaStage = 2; window.GAMEUI.apply({ jp: 3 }, 'Gia hạn visa thành công — thở phào'); persist(); return; }
    if (id === 'c4-friend-1') { c4.friendVisa = true; persist(); return; }
    if (id === 'c4-friend-2') { c4.farewell = true; persist(); return; }
    if (id.indexOf('ind4-') === 0) {
      var m4 = id.match(/^ind4-([a-z-]+)-(\d)$/);
      if (m4) { var stg4 = parseInt(m4[2], 10); if (stg4 === c4.ind4 + 1) { c4.ind4 = stg4; persist(); } }
      maybeCrisisPhone();
      return;
    }
    if (id === 'c4-crisis' || id === 'c4-crisis-dh') {
      if (!c4.crisis) c4.crisis = 'tang-ca';
      c4.crisisDone = true;
      persist();
      if (window.PHONE && window.PHONE.receive) window.PHONE.receive('family', ['Mẹ: Con ơi, tiền tới nơi rồi! Bố con mổ xong, qua cơn nguy hiểm rồi con ạ. Cả nhà mang ơn con… Con ở bên đó cũng phải giữ sức khỏe, đừng gồng quá nghe chưa.']);
      window.GAMEUI.toast('📱 Mẹ nhắn: bố đã qua cơn nguy hiểm — mở điện thoại đọc đi');
      return;
    }
    if (id === 'c4-econ-1') { c4.econShop = true; persist(); return; }
    if (id === 'c4-econ-3') { c4.econ = true; persist(); return; }
    if (id === 'c4-bully-1' || id === 'c4-bully-dh') { if (!c4.bully) c4.bully = 'dang'; persist(); return; }
    if (id === 'c4-bully-2') { c4.bully = 'xong-dung'; window.GAMEUI.apply({ jp: 3, love: 2 }, 'Giải quyết vụ bắt nạt bằng đường đúng — cả nơi làm nể thêm'); persist(); return; }
    if (id === 'c4-bully-2b') { c4.bully = 'xong-chiu'; window.GAMEUI.apply({ jp: 2 }, 'Đứng ra muộn còn hơn không bao giờ — bài học về sự im lặng'); persist(); return; }
    if (id === 'c4-lic-1') { if (c4.licRoute && c4.licenseStage < 1) { c4.licenseStage = 1; persist(); } return; }
    if (id === 'c4-lic-2' || id === 'c4-lic-3') { scoreLicense(id); return; }
    if (id === 'c4-tuan-1') {
      if (!c4.tuan) { c4.tuan = 'nghe'; persist(); }
      if (c4.tuan === 'theo') {
        G.darkPath = true; persist();
        window.GAMEUI.toast('🌑 Quyết định đã rơi xuống — con đường tắt bắt đầu từ đêm nay…');
        deferScene('c4-dark-1', 1400);
      } else {
        deferScene('c4-gamble', 1700);
      }
      return;
    }
    if (id === 'c4-gamble') { if (c4.gambled === 'choi') { c4.phoneLie = true; persist(); } return; }
    if (id === 'c4-dark-1') { c4.darkStage = 1; persist(); deferScene('c4-dark-2', 1400); return; }
    if (id === 'c4-dark-2') {
      G.ending = 5;
      if (window.FLOW && window.FLOW.addEnding) window.FLOW.addEnding(5);
      persist();
      window.GAMEUI.toast('🌑 Kết cục 5 — «Kết cục đen»: con đường tắt kết thúc ở cửa trục xuất…');
      deferScene('ket-den', 1000);
      return;
    }
    if (id === 'c4-bar') { c4.bar = true; persist(); return; }
    if (id === 'c4-homesick') { c4.homesick3 = true; persist(); return; }
    if (id === 'c4-bbq') { c4.bbq = true; persist(); return; }
    if (id === 'c4-bien') { c4.bien = true; persist(); return; }
    if (id === 'c4-health') { c4.health = true; persist(); return; }
    if (id === 'c4-trip') { c4.trip = true; persist(); return; }
    if (id === 'c4-gui-tien') { c4.payday = 1; persist(); return; }
    if (id.indexOf('c4-couple-') === 0) { c4.couple = c4.couplePend || (c4.couple + 1); c4.couplePend = 0; persist(); return; }
    if (id.indexOf('c4-ld-') === 0) { c4.ld = c4.ldPend || (c4.ld + 1); c4.ldPend = 0; persist(); return; }
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
    } else if (name === 'c4') {
      var p = String(value).split(':'), k = p[0], v = p[1], c = G.c4;
      if (k === 'econ') c.econChoice = v;
      else if (k === 'crisis') c.crisis = v;
      else if (k === 'tuan') { c.tuan = v; if (v === 'theo') G.darkPath = true; }
      else if (k === 'gamble') c.gambled = v;
      else if (k === 'bully') c.bully = (v === 'chiu-dung') ? 'chiu-dung' : 'dang';
      else if (k === 'lic') c.licRoute = v;
      else if (k === 'hong') c.hong = v;
      else if (k === 'dacap') c.daCap = v;
      persist();
    } else if (name === 'c5') {
      var p5 = String(value).split(':'), k5 = p5[0], v5 = p5[1], cc5 = G.c5;
      if (k5 === 'final') cc5.finalChoice = v5;          // 'eiju' | 've' — hướng đi cuối ở quầy nyukan
      else if (k5 === 'babyname') cc5.babyName = v5;     // tên con chọn ở cảnh khai sinh
      persist();
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
  function onMapEnter(id) {
    if (chapter() === 5 && !G.ending) {
      var c5m = G.c5, s5 = step5();
      if (id === 'room' && s5 === 'fam1' && spousePath() === 'single') { deferScene('c5-single-1', 1200); return; }
      if (id === 'park' && c5m.married && c5m.baby2 && !c5m.baby3) { deferScene('c5-baby-3', 1200); return; }
    }
    if (chapter() !== 4 || G.ending) return;
    var c = G.c4, s = step4();
    maybeCrisisPhone();
    // Anh Tuấn tự tìm tới khi người chơi ra phố ở bước cám dỗ (móc 'hung' là đường dự phòng)
    if (id === 'street' && s === 'tuan' && !c.tuanFired) {
      c.tuanFired = true; persist();
      deferScene('c4-tuan-1', 1100);
      return;
    }
    // Nhịp đời sống cặp đôi / yêu xa — mở khi về phòng trọ đúng mốc truyện
    if (id === 'room') {
      var R = (window.REL && window.REL.state) ? window.REL.state() : null;
      if (!R) return;
      if (R.partner && !c.couplePend && c.couple < 3) {
        var gate = [!!c.farewell, !!c.econ, !!c.tuan][c.couple];
        if (gate) {
          c.couplePend = c.couple + 1; persist();
          var malePartner = (R.partner === 'ren' || R.partner === 'khoi');
          deferScene('c4-couple-' + (c.couple + 1) + (malePartner ? 'm' : ''), 1200);
        }
      } else if (R.breakup === 'giu-duoc' && !c.ldPend && c.ld < 2) {
        var gateLd = [!!c.crisisDone, !!c.bar][c.ld];
        if (gateLd) {
          c.ldPend = c.ld + 1; persist();
          deferScene('c4-ld-' + (c.ld + 1) + (gender === 'F' ? '-nu' : ''), 1200);
        }
      }
    }
  }

  /* ================= KẾT CỤC 1–4 + TỔNG KẾT TOÀN TRUYỆN (Pha 3) =================
     Kết cục truy từ LỰA CHỌN THẬT tích lũy cả truyện:
       · hướng cuối người chơi tự chọn ở quầy nyukan (c5.finalChoice: eiju/ve);
       · chỉ số Rủi ro ẩn tích lũy từ mọi đường tắt (SIM, cờ bạc, trộm hồng, đa
         cấp…) — hồ sơ có vết thì cửa vĩnh trú bị từ chối ở chặng cuối → Tay trắng;
       · tình cảm/gia đình: đã kết hôn · còn người yêu · giữ được yêu xa · chỉ
         số Tình cảm — quyết «An cư» (đủ đầy) hay «Lưng chừng» (ở lại mà rạn vỡ). */
  var ENDING_NAME = { 1: 'An cư xứ người', 2: 'Vinh quy', 3: 'Lưng chừng', 4: 'Tay trắng', 5: 'Kết cục đen', 6: 'Về quê' };
  var ENDING_DESC = {
    1: 'Vĩnh trú trong tay, nhà nhỏ ấm đèn, con vào lớp 1 ở Nhật. Cuối game, quay lại combini năm xưa — người thương cười: "Ngày đầu cậu chẳng hiểu gì đâu."',
    2: 'Về Việt Nam dựng nghiệp bằng vốn liếng và tiếng Nhật: mở quán/công ty, làm cầu nối hai nước, dạy lớp trẻ đi Nhật "đi đường thẳng như mình".',
    3: 'Ở lại được, tiền cũng có — nhưng tình cảm rạn vỡ, Tết ăn một mình. Một cái kết buồn nhẹ cho người giỏi kiếm tiền hơn giữ người.',
    4: 'Trượt cửa cuối vì những vết trong hồ sơ, về nước khi món nợ vẫn chưa trả hết. Không bi lụy — chỉ để lại một lá thư: "nếu được làm lại".',
    5: 'Bỏ trốn, làm chui, bị bắt và trục xuất, cấm quay lại. Kết cục cảnh báo — chỉ mở từ những lựa chọn đường tắt.',
    6: 'Kết thúc sớm ở Chương 3: về quê, một đời bình thường ở quê nhà — và thỉnh thoảng mơ thấy chuyến tàu năm ấy.'
  };
  function decideEnding() {
    var st = stats(), c = G.c5, R = relState();
    if (c.finalChoice === 've') return 2;
    if (st.risk >= 12) return 4;
    var familyStrong = c.married || (R && R.partner) || (R && R.breakup === 'giu-duoc') || st.love >= 60;
    return familyStrong ? 1 : 3;
  }
  function finishGame() {
    if (!G.ending) {
      var n = decideEnding();
      G.ending = n;
      if (!G.c5.finalChoice) G.c5.finalChoice = 'eiju';
      if (window.FLOW && window.FLOW.addEnding) window.FLOW.addEnding(n);
      persist();
      window.GAMEUI.toast('🏁 Kết cục ' + n + ' — «' + ENDING_NAME[n] + '» đang mở ra…');
      deferScene('ket-' + n, 1000);
    } else {
      showFinalSummary();
    }
  }
  function showFinalSummary() {
    var h3 = document.querySelector('#modal-chapter h3'); if (!h3) return;
    var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {};
    var pub = st.story || {}, statsNow = stats(), sg = st.saga || {}, c5 = sg.c5 || {};
    var n = G.ending || sg.ending;
    h3.textContent = '🏁 Tổng kết toàn truyện — «Tuổi Trẻ Ở Nhật»';
    var sb = document.querySelector('#modal-chapter .sub');
    if (sb) sb.textContent = 'Kết cục ' + n + ' — «' + (ENDING_NAME[n] || '') + '». Từ tờ vé một chiều năm ấy tới hôm nay: một đời xa xứ đã khép lại trọn vẹn.';
    var btn = document.getElementById('chapter-next'); if (btn) btn.textContent = '🌸 Sống tiếp — đời ở Nhật vẫn tiếp diễn';
    var indName = '—';
    if (sg.route === 'tokutei') indName = industryName(sg.industry);
    if (sg.route === 'du-hoc') indName = 'Trường chuyên môn (du học)';
    var spouseTxt = c5.married
      ? ('Đã kết hôn' + (c5.spouse === 'ld' ? ' với người yêu từ quê nhà' : (c5.spouse ? ' với ' + (SPOUSE_NAME[c5.spouse] || '') : '')) + (c5.babyName ? ' · con: ' + c5.babyName : (c5.baby ? ' · đã có con đầu lòng' : '')))
      : 'Độc thân — tự do và tự trọng';
    var el = document.getElementById('ch1-detail');
    if (el) el.innerHTML =
      '<div class="sum-row"><span>🏆 Kết cục đạt được</span><b>' + n + ' — ' + (ENDING_NAME[n] || '') + '</b></div>' +
      '<div class="sum-row"><span>📖 Sổ kết cục đã mở</span><b>' + ((pub.endings || []).length) + '/6 kết cục</b></div>' +
      '<div class="sum-row"><span>🎓 Mốc thi N1</span><b>' + ((st.exam5 && st.exam5.best) || 0) + '/12 (thi ' + ((st.exam5 && st.exam5.attempts) || 0) + ' lần)</b></div>' +
      '<div class="sum-row"><span>🧭 Con đường đã đi</span><b>' + (sg.route === 'tokutei' ? 'Tokutei' : sg.route === 'du-hoc' ? 'Du học' : '—') + (sg.route ? ' · ' + indName : '') + '</b></div>' +
      '<div class="sum-row"><span>👨‍👩‍👧 Gia đình</span><b>' + spouseTxt + '</b></div>' +
      '<div class="sum-row"><span>🎬 Cảnh đã trải qua</span><b>' + ((pub.doneScenes || []).length) + ' cảnh</b></div>' +
      '<div class="sum-row"><span>⭐ XP truyện</span><b>' + (st.xp || 0) + '</b></div>' +
      '<div class="sum-row"><span>📚 Tiếng Nhật</span><b>' + statsNow.jp + '</b></div>' +
      '<div class="sum-row"><span>💴 Tiền</span><b>' + Number(statsNow.money || 0).toFixed(2).replace('.', ',') + ' man</b></div>' +
      '<div class="sum-row"><span>❤️ Sức khỏe</span><b>' + statsNow.hp + '</b></div>' +
      '<div class="sum-row"><span>💗 Tình cảm</span><b>' + statsNow.love + '</b></div>' +
      '<div class="sub" style="margin-top:10px">Truyện chính đã khép lại — nhưng đời thì chưa: cứ sống tiếp tự do ở khu phố này (đi làm, hẹn hò, mua sắm, ôn thi), xem «Sổ kết cục» trong ⚙️ Cài đặt, hoặc chơi lại từ đầu để đi một đường khác và mở nốt những kết cục còn lại.</div>';
    var m = document.getElementById('modal-chapter'); if (m) m.classList.add('show');
  }
  /* Sổ kết cục — mục trong ⚙️ Cài đặt (index.html: #set-endings / #modal-endings) */
  function wireEndingsBook() {
    var btn = document.getElementById('set-endings'); if (!btn) return;
    btn.addEventListener('click', function () {
      var st = (window.STORY && window.STORY.state) ? window.STORY.state() : {};
      var got = ((st.story || {}).endings) || [];
      var list = document.getElementById('endings-list'); if (!list) return;
      list.innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) {
        var has = got.indexOf(n) >= 0;
        return '<div class="sum-row"><span>' + (has ? '🏆' : '🔒') + ' Kết cục ' + n + ' — ' + ENDING_NAME[n] + '</span><b>' + (has ? 'Đã mở' : 'Chưa mở') + '</b></div>' + (has ? '<div class="sub">' + ENDING_DESC[n] + '</div>' : '');
      }).join('');
      var m = document.getElementById('modal-endings'); if (m) m.classList.add('show');
    });
    var cl = document.getElementById('endings-close');
    if (cl) cl.addEventListener('click', function () { var m = document.getElementById('modal-endings'); if (m) m.classList.remove('show'); });
  }
  document.addEventListener('DOMContentLoaded', wireEndingsBook);

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
