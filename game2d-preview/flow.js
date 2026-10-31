// ⚠️ ĐÃ ĐƯỢC THAY THẾ (đợt máy truyện 31/10/2026): file này KHÔNG còn được index.html nạp.
// Máy truyện đầy đủ nằm ở story.js (giữ nguyên hợp đồng window.FLOW + toàn bộ nhịp của bản này,
// cộng: lưu tiến độ localStorage theo khóa `story`, mốc thi N5 1.14, Chương 2 + SIM).
// Giữ file tại đây làm dấu tích của bản rút gọn đầu tiên — không sửa thêm, không nạp lại.
// flow.js — KỊCH BẢN ĐOẠN MẪU chơi được (lớp truyện rút gọn cho đợt duyệt):
//   SÂN BAY VIỆT NAM: chia tay bố mẹ + Linh (chọn lời đáp, ghi sổ lời hứa §6e) → qua cửa
//   an ninh (chặn tới khi chia tay xong) → lên máy bay → PHÒNG TRỌ Nhật: mở đầu ngày đầu
//   → ra đường gặp Hùng → combini diễn kaiwa với Yui → tin nhắn điện thoại → ra ga trả lời
//   CÂU HỎI NGHE ghi âm thật → điểm tập kết rác: quiz phân loại rác → tổng kết chỉ số.
// Bản rút gọn tuyến tính của máy truyện đầy đủ (KHUNG-GAME.md) để duyệt cách chơi;
// trạng thái lưu trong phiên chơi, chưa nối lưu tiến độ tài khoản (đợt sau).
// Các bước (step): 0 sân bay-chờ chia tay · 1 đã chia tay 1 phía · 2 xong cả hai ·
//   3 trên máy bay/đã tới phòng · 4 xong mở đầu phòng trọ · 5 xong Hùng · 6 xong combini ·
//   7 đã trả lời điện thoại · 8 xong câu hỏi nghe · 9 xong quiz rác (hoàn thành đoạn mẫu)
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var step = 0, P = null;
  var flags = { famDone: false, loverDone: false, boarded: false, flown: false, arrived: false, vendingPaid: false, callHomeDone: false };
  var book = { loiHuaSanBay: null, quaLuuNiem: null, loiHuaGiaDinh: null };  // SỔ LỜI HỨA (§6e)

  /* ---------- Câu hỏi nghe ở ga (clip VOICEVOX ghi âm thật: audio/listen-ga-01.mp3) ---------- */
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
      step = 8;
      window.GAMEUI.apply({ jp: listenTries === 0 ? 5 : 2 }, listenTries === 0 ? 'Nghe thông báo ở ga — đúng ngay lần đầu' : 'Nghe thông báo ở ga — đúng sau khi nghe lại');
      window.GAMEUI.setObjective('🗑️ Về điểm tập kết rác (cạnh máy bán hàng đỏ) — thử phân loại rác');
    };
  }

  /* ---------- Quiz phân loại rác ---------- */
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
  $('quiz-close').addEventListener('click', function () {
    $('modal-quiz').classList.remove('show');
    step = 9;
    if (gomiScore === GOMI.length) window.GAMEUI.apply({ jp: 3, hp: 2 }, 'Phân loại rác chuẩn Nhật');
    else window.GAMEUI.apply({ jp: 1 }, 'Đã thử phân loại rác — về xem lại bảng hướng dẫn nhé');
    window.GAMEUI.setObjective('🎉 Hoàn thành đoạn mẫu — chờ duyệt phong cách');
    setTimeout(function () { window.GAMEUI.showSummary(); }, 700);
  });

  /* ---------- Mục tiêu theo tiến độ sân bay ---------- */
  function airportObjective() {
    if (!flags.famDone && !flags.loverDone)
      window.GAMEUI.setObjective('💞 Chia tay ở sân bay: tới chỗ BỐ MẸ (trái sảnh) và LINH (góc cà phê phải sảnh)');
    else if (!flags.famDone)
      window.GAMEUI.setObjective('💞 Còn bố mẹ đang chờ ở phía trái sảnh — tới nói lời chia tay với bố mẹ');
    else if (!flags.loverDone)
      window.GAMEUI.setObjective('💗 Còn Linh đang chờ ở góc cà phê bên phải sảnh');
    else
      window.GAMEUI.setObjective('✈️ Đã nói hết lời chia tay — tới CỬA AN NINH ở tường phía đông sảnh để lên máy bay');
  }

  /* ---------- Máy trạng thái mạch mẫu ---------- */
  function onGameStart(player) {
    P = player;
    window.GAMEUI.init(player);
    window.PHONE.bind();
    window.PHONE.onReplied(function (thread) {
      if (thread === 'lover' && step === 6) {
        step = 7;
        window.GAMEUI.setObjective('🚉 Ra ga (đi hết phố về phía đông) — nghe thông báo, trả lời câu hỏi nghe');
      }
    });
    airportObjective();
    setTimeout(function () { if (window.__demo) window.__demo.scene('airport-intro'); }, 800);
  }
  function onSceneEnd(id) {
    if (id === 'airport-family' && !flags.famDone) {
      flags.famDone = true;
      step = flags.loverDone ? 2 : 1;
      window.GAMEUI.apply({ money: 0.5 }, 'Bố dúi thêm phong bì tiền: +0,50 man');
      airportObjective();
    } else if (id === 'airport-lover' && !flags.loverDone) {
      flags.loverDone = true;
      step = flags.famDone ? 2 : 1;
      airportObjective();
    } else if (id === 'airport-gate') {
      flags.boarded = true;
      step = 3;
      window.GAMEUI.setObjective('✈️ Chuyến bay 5 tiếng sang Nhật…');
      return { moveTo: { map: 'may-bay' } };   // hợp đồng 1.3: lớp truyện trả chỉ thị moveTo
    } else if (id === 'flight') {
      window.GAMEUI.setObjective('🛬 Máy bay đã hạ cánh xuống Narita — ra cửa ở đầu đông khoang để "về phòng trọ"');
    } else if (id === 'intro' && flags.arrived && step === 3) {
      step = 4;
      window.GAMEUI.setObjective('🚶 Ra đường qua cửa phòng — gặp anh Hùng "sẹo" đang đi dạo');
    } else if (id === 'vending' && !flags.vendingPaid) {
      // Thoại máy bán hàng nói rõ "nhét 130 yên" — sổ tiền phải trừ khớp: 130 yên ≈ 0,01 man
      // (chỉ số tiền giữ 2 chữ số thập phân theo man). Chỉ trừ lần mua đầu; các lần sau là xem lại cảnh.
      flags.vendingPaid = true;
      window.GAMEUI.apply({ money: -0.01 }, 'Máy bán hàng tự động — lon cà phê 130 yên');
    } else if (id === 'hung' && step === 4) {
      step = 5;
      window.GAMEUI.apply({ jp: 2 }, 'Hùng chỉ đường ra ga và combini');
      window.GAMEUI.setObjective('🏪 Vào combini 秋葉原マート — nói chuyện với Yui ở quầy');
    } else if (id === 'combini' && step === 5) {
      step = 6;
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
    }
    return null;
  }
  function handleScene(id) {
    if (id === 'airport-gate') {
      if (flags.famDone && flags.loverDone) return false;  // đã chia tay xong → để engine chạy cảnh lên máy bay
      window.GAMEUI.toast(!flags.famDone && !flags.loverDone
        ? '🛂 Chưa thể qua cửa: còn chưa nói lời chia tay với bố mẹ và Linh…'
        : (!flags.famDone ? '🛂 Chưa thể qua cửa: bố mẹ vẫn đang chờ ở phía trái sảnh.' : '🛂 Chưa thể qua cửa: Linh vẫn đang chờ ở góc cà phê.'));
      return true;
    }
    if (id === 'station' && step === 7) { openListen(); return true; }
    if (id === 'gomi') {
      if (step === 8) { openGomi(); return true; }
      window.GAMEUI.toast('🗑️ Điểm tập kết rác của khu nhà — vứt đúng ngày, đúng loại, buộc túi gọn nhé.');
      return true;
    }
    if (id === 'call-home') { startHomeCall(); return true; }
    return false;
  }

  /* ---------- Cảnh 1.9 — NHỚ NHÀ LẦN 1: cuộc gọi thoại về nhà (dạng GỌI, không phải tin nhắn) ----------
     Mở giao diện cuộc gọi của phone.js: câu của bố mẹ hiện từng lượt như đang nói thật,
     lượt của người chơi là chọn câu đáp (fx chỉ áp dụng LẦN GỌI ĐẦU; gọi lại chỉ để nghe lại). */
  function startHomeCall() {
    var first = !flags.callHomeDone;
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
        if (!flags.callHomeDone) {
          flags.callHomeDone = true;
          window.GAMEUI.toast('📞 Gọi về nhà xong — nghe giọng bố mẹ, lòng nhẹ đi một nửa. (Cờ truyện: nhớ nhà lần 1)');
        } else {
          window.GAMEUI.toast('📞 Gọi về nhà — bố mẹ vẫn khỏe, vẫn chờ điện thoại mỗi chủ nhật.');
        }
      }
    });
  }
  function onMapEnter(id) {
    if (window.BGM) window.BGM.play(id);
    if (id === 'may-bay' && flags.boarded && !flags.flown) {
      flags.flown = true;
      setTimeout(function () { if (window.__demo) window.__demo.scene('flight'); }, 900);
    }
    if (id === 'room' && flags.boarded && !flags.arrived) {
      flags.arrived = true;
      step = 3;
      setTimeout(function () { if (window.__demo) window.__demo.scene('intro'); }, 900);
    }
  }
  function setFlag(name, value) {
    if (name === 'loi-hua-gia-dinh') book.loiHuaGiaDinh = value;
    else if (name === 'loi-hua-lover') book.loiHuaSanBay = value;
    else if (name === 'qua-luu-niem') { book.quaLuuNiem = value; book.loiHuaSanBay = 'cho-doi'; }
  }
  window.FLOW = {
    onGameStart: onGameStart, onSceneEnd: onSceneEnd, handleScene: handleScene,
    onMapEnter: onMapEnter, setFlag: setFlag,
    step: function () { return step; },
    flags: function () {
      return {
        famDone: flags.famDone, loverDone: flags.loverDone, boarded: flags.boarded, arrived: flags.arrived, callHomeDone: flags.callHomeDone,
        loiHuaSanBay: book.loiHuaSanBay, quaLuuNiem: book.quaLuuNiem, loiHuaGiaDinh: book.loiHuaGiaDinh
      };
    }
  };
})();
