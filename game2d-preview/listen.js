// listen.js — NGÂN HÀNG CÂU NGHE + ĐIỂM NGHE Ở ĐỊA ĐIỂM (giai đoạn 5, lệnh chủ trang
// 14:02 JST 31/10/2026: "Có cả câu hỏi và câu nghe"). Mọi clip là file ghi âm THẬT bằng
// VOICEVOX (nữ No.7 speaker 30 / nam 青山龍星 speaker 13, phong cách thi 0.95/0.75/0 —
// thu bằng work/record_listen.py), TUYỆT ĐỐI không dùng speechSynthesis cho câu nghe.
// Câu + đáp án tự soạn gốc, bám đời sống trong game; transcript chỉ hiện SAU khi trả lời.
// Dùng ở: (1) PHẦN NGHE của mốc thi chương (story.js rút 2 câu/lượt từ LISTEN_N5/N4),
// (2) ĐIỂM NGHE ở địa điểm qua SPOTLISTEN: ga (ngân hàng xoay vòng 4 thông báo — clip mẫu
// gốc listen-ga-01 của story.js + 3 clip mới ở đây), siêu thị, nơi làm kaigo.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  window.LISTEN_N5 = [
    { id: 'ln5-01', audio: 'audio/ln5-01.mp3', voice: 'm', script: 'まもなく、2番線に新宿行きの電車が来ます。白い線の内側でお待ちください。', q: 'Nghe thông báo: tàu đi Shinjuku sẽ tới ở sân ga số mấy?', choices: ['1番線', '2番線', '4番線'], answer: 1, explain: '「2番線に新宿行きの電車が来ます」— tàu tới sân ga số 2.' },
    { id: 'ln5-02', audio: 'audio/ln5-02.mp3', voice: 'f', script: 'お弁当、温めますか。', q: 'Nhân viên combini hỏi bạn điều gì?', choices: ['Có muốn hâm nóng hộp cơm không', 'Có lấy túi nilon không', 'Có thẻ điểm không'], answer: 0, explain: '「温めますか」= có hâm nóng (cho vào lò vi sóng) không — câu cửa miệng ở combini.' },
    { id: 'ln5-03', audio: 'audio/ln5-03.mp3', voice: 'f', script: 'ただいま、夕方セールを行っています。お惣菜は20パーセント引きです。', q: 'Thông báo siêu thị: món ăn sẵn (お惣菜) đang được giảm bao nhiêu?', choices: ['10%', '20%', '50%'], answer: 1, explain: '「20パーセント引き」= giảm 20%.' },
    { id: 'ln5-04', audio: 'audio/ln5-04.mp3', voice: 'm', script: 'あした、9時に駅の前で会おう。遅れないでね。', q: 'Tin nhắn thoại của anh Hùng: hẹn gặp nhau lúc nào, ở đâu?', choices: ['9 giờ, trước ga', '8 giờ, trước ga', '9 giờ, ở combini'], answer: 0, explain: '「あした、9時に駅の前で会おう」= mai 9 giờ gặp trước ga nhé.' },
    { id: 'ln5-05', audio: 'audio/ln5-05.mp3', voice: 'f', script: '田中さん、お薬の時間ですよ。お水を持ってきました。', q: 'Ở nơi làm kaigo, chị Mai mang gì tới cho cụ Tanaka?', choices: ['Nước để uống thuốc', 'Cơm trưa', 'Khăn tắm'], answer: 0, explain: '「お薬の時間ですよ。お水を持ってきました」= tới giờ uống thuốc rồi, em mang nước tới đây.' },
    { id: 'ln5-06', audio: 'audio/ln5-06.mp3', voice: 'm', script: 'あしたはテストです。教科書の30ページから50ページまで、よく復習してください。', q: 'Thầy dặn: bài kiểm tra ngày mai cần ôn sách giáo khoa từ trang nào tới trang nào?', choices: ['Trang 30 đến 50', 'Trang 10 đến 30', 'Trang 50 đến 70'], answer: 0, explain: '「30ページから50ページまで」= từ trang 30 tới trang 50.' },
    { id: 'ln5-07', audio: 'audio/ln5-07.mp3', voice: 'f', script: 'この電車は各駅停車です。次は高円寺に止まります。', q: 'Thông báo trên tàu: ga tiếp theo tàu sẽ dừng là ga nào?', choices: ['高円寺 (Koenji)', '吉祥寺 (Kichijoji)', '新宿 (Shinjuku)'], answer: 0, explain: '「次は高円寺に止まります」= ga tới sẽ dừng ở Koenji.' },
    { id: 'ln5-08', audio: 'audio/ln5-08.mp3', voice: 'f', script: '本日の日替わりは、焼き魚定食です。', q: 'Ở nhà hàng 築地: suất ăn thay đổi theo ngày (日替わり) hôm nay là gì?', choices: ['Suất cá nướng', 'Suất thịt chiên', 'Mì udon'], answer: 0, explain: '「焼き魚定食」= suất cá nướng.' }
  ];
  window.LISTEN_N4 = [
    { id: 'ln4-01', audio: 'audio/ln4-01.mp3', voice: 'm', script: '電車が遅れています。3番線の電車は、10分ほど遅れて来る予定です。', q: 'Thông báo ga: chuyến tàu ở sân ga số 3 dự kiến trễ khoảng bao lâu?', choices: ['5 phút', '10 phút', '15 phút'], answer: 1, explain: '「10分ほど遅れて来る予定です」= dự kiến đến trễ khoảng 10 phút.' },
    { id: 'ln4-02', audio: 'audio/ln4-02.mp3', voice: 'f', script: '卵はお一人様2パックまでとなっております。ご協力をお願いいたします。', q: 'Thông báo siêu thị: mỗi khách được mua tối đa bao nhiêu hộp trứng?', choices: ['1 hộp', '2 hộp', '3 hộp'], answer: 1, explain: '「お一人様2パックまで」= mỗi người tối đa 2 hộp.' },
    { id: 'ln4-03', audio: 'audio/ln4-03.mp3', voice: 'f', script: '午後3時から、会議室で新しい介護計画の会議があります。資料を忘れないでください。', q: 'Ở nơi làm kaigo: cuộc họp về kế hoạch chăm sóc mới diễn ra lúc nào, ở đâu?', choices: ['3 giờ chiều, phòng họp', '2 giờ chiều, phòng sinh hoạt', '4 giờ chiều, sảnh'], answer: 0, explain: '「午後3時から、会議室で…会議があります」= từ 3 giờ chiều, họp ở phòng họp.' },
    { id: 'ln4-04', audio: 'audio/ln4-04.mp3', voice: 'm', script: '雨が強くなってきました。安全のため、今日の作業は午後休みにします。', q: 'Ở công trường 横浜: vì sao công việc buổi chiều được nghỉ?', choices: ['Mưa to lên, vì an toàn', 'Hết vật liệu xây dựng', 'Máy móc bị hỏng'], answer: 0, explain: '「雨が強くなってきました。安全のため」= mưa to dần, vì an toàn nên nghỉ.' },
    { id: 'ln4-05', audio: 'audio/ln4-05.mp3', voice: 'f', script: '今日は仕事が遅くなるから、先に食べていてね。冷蔵庫におかずがあるよ。', q: 'Tin nhắn thoại của Yui dặn điều gì?', choices: ['Ăn trước đi, đồ ăn ở trong tủ lạnh', 'Đợi Yui về rồi hãy ăn', 'Ra combini mua đồ ăn'], answer: 0, explain: '「先に食べていてね。冷蔵庫におかずがあるよ」= ăn trước nhé, trong tủ lạnh có đồ ăn.' },
    { id: 'ln4-06', audio: 'audio/ln4-06.mp3', voice: 'f', script: '診察は10時半からです。番号札を取って、待合室でお待ちください。', q: 'Ở bệnh viện 本郷: sau khi lấy phiếu số, bạn nên làm gì?', choices: ['Ngồi chờ ở phòng chờ', 'Vào phòng khám ngay', 'Đi ra nhà thuốc'], answer: 0, explain: '「番号札を取って、待合室でお待ちください」= lấy phiếu số rồi đợi ở phòng chờ.' },
    { id: 'ln4-07', audio: 'audio/ln4-07.mp3', voice: 'm', script: '次は名古屋に止まります。名古屋駅では、新幹線にお乗り換えができます。', q: 'Thông báo trên tàu: tại ga Nagoya, hành khách có thể đổi sang phương tiện nào?', choices: ['Shinkansen', 'Tàu thường địa phương', 'Xe buýt'], answer: 0, explain: '「新幹線にお乗り換えができます」= có thể chuyển sang Shinkansen.' },
    { id: 'ln4-08', audio: 'audio/ln4-08.mp3', voice: 'm', script: '明日は午前中、雨が降りますが、午後は晴れるでしょう。洗濯は午後がおすすめです。', q: 'Dự báo thời tiết khuyên: nên giặt quần áo vào lúc nào ngày mai?', choices: ['Buổi chiều', 'Buổi sáng sớm', 'Buổi tối'], answer: 0, explain: '「午後は晴れるでしょう。洗濯は午後がおすすめです」= chiều trời nắng, nên giặt vào buổi chiều.' }
  ];

  /* ===== ĐIỂM NGHE Ở ĐỊA ĐIỂM (xoay vòng, làm lại được nhiều lần, có ghi nhận) ===== */
  var SPOTS = {
    'ga-bank': { title: '🎧 Điểm nghe — thông báo ở ga 新宿', items: [
      { id: 'sp-ga-02', audio: 'audio/sp-ga-02.mp3', voice: 'f', script: 'まもなく、1番線に吉祥寺行きの電車が来ます。黄色い線の内側でお待ちください。', q: 'Tàu đi Kichijoji sẽ tới ở sân ga số mấy?', choices: ['1番線', '2番線', '3番線'], answer: 0, explain: '「1番線に吉祥寺行きの電車が来ます」.' },
      { id: 'sp-ga-03', audio: 'audio/sp-ga-03.mp3', voice: 'm', script: 'この電車は、途中、高円寺と吉祥寺に止まります。終点は新宿です。', q: 'Chuyến tàu này dừng ở những ga nào trước khi tới ga cuối Shinjuku?', choices: ['Koenji và Kichijoji', 'Chỉ Koenji', 'Chỉ Kichijoji'], answer: 0, explain: '「高円寺と吉祥寺に止まります。終点は新宿です」.' },
      { id: 'sp-ga-04', audio: 'audio/sp-ga-04.mp3', voice: 'f', script: 'お忘れ物は、駅の窓口までお持ちください。窓口は改札の隣です。', q: 'Nếu nhặt được đồ bỏ quên ở ga, phải mang tới đâu?', choices: ['Quầy cửa sổ của ga, cạnh cửa soát vé', 'Đồn cảnh sát 上野', 'Quầy bán vé tự động'], answer: 0, explain: '「駅の窓口までお持ちください。窓口は改札の隣です」.' }
    ] },
    'super': { title: '🎧 Điểm nghe — thông báo trong siêu thị 中野', items: [
      { id: 'sp-super-01', audio: 'audio/sp-super-01.mp3', voice: 'f', script: '本日、牛乳と卵が特売です。冷蔵コーナーへどうぞ。', q: 'Hôm nay siêu thị bán giá đặc biệt (特売) những món nào?', choices: ['Sữa và trứng', 'Cá hồi và rau', 'Bento và mì ly'], answer: 0, explain: '「牛乳と卵が特売です」— hướng tới khu tủ lạnh 冷蔵コーナー.' },
      { id: 'sp-super-02', audio: 'audio/sp-super-02.mp3', voice: 'f', script: '閉店まであと30分です。お買い忘れのないよう、ご確認ください。', q: 'Thông báo này báo còn bao lâu nữa thì đóng cửa?', choices: ['30 phút', '15 phút', '1 giờ'], answer: 0, explain: '「閉店まであと30分です」= còn 30 phút nữa tới giờ đóng cửa.' }
    ] },
    'kaigo': { title: '🎧 Điểm nghe — hướng dẫn ở nơi làm kaigo 神戸', items: [
      { id: 'sp-kaigo-01', audio: 'audio/sp-kaigo-01.mp3', voice: 'f', script: '午前10時から、ホールで体操をします。皆さん、集まってください。', q: 'Mấy giờ thì tập thể dục ở sảnh sinh hoạt?', choices: ['10 giờ sáng', '9 giờ sáng', '11 giờ sáng'], answer: 0, explain: '「午前10時から、ホールで体操をします」.' },
      { id: 'sp-kaigo-02', audio: 'audio/sp-kaigo-02.mp3', voice: 'f', script: 'お風呂の時間です。まず、お湯の温度を確認してから、声をかけてください。', q: 'Trước giờ tắm cho các cụ, phải làm gì đầu tiên?', choices: ['Kiểm tra nhiệt độ nước rồi mới gọi các cụ', 'Gọi các cụ ngay lập tức', 'Dọn phòng tắm trước'], answer: 0, explain: '「まず、お湯の温度を確認してから、声をかけてください」= trước hết kiểm tra nhiệt độ nước, sau đó mới lên tiếng gọi.' }
    ] }
  };
  var LSKEY = 'tuoitre2d_spotlisten_v1';
  var doneSet = {};
  try { doneSet = JSON.parse(localStorage.getItem(LSKEY) || '{}'); } catch (e) { doneSet = {}; }
  var rotIdx = {};
  var cur = null, audio = null, solved = false;

  function open(spotId) {
    var spot = SPOTS[spotId]; if (!spot) return false;
    var idx = rotIdx[spotId] || 0;
    cur = spot.items[idx % spot.items.length];
    rotIdx[spotId] = idx + 1;
    solved = false;
    $('spotlisten-title').textContent = spot.title;
    $('spotlisten-q').textContent = cur.q;
    $('spotlisten-fb').textContent = ''; $('spotlisten-fb').className = 'fb-line';
    $('spotlisten-close').style.display = 'none';
    $('spotlisten-script').style.display = 'none';
    $('spotlisten-eq').textContent = 'Nhấn để phát';
    var box = $('spotlisten-opts'); box.innerHTML = '';
    cur.choices.forEach(function (txt, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt-btn'; b.textContent = txt;
      b.addEventListener('click', function () {
        if (solved) return;
        if (i === cur.answer) {
          solved = true; b.classList.add('right');
          var first = !doneSet[cur.id];
          doneSet[cur.id] = true;
          try { localStorage.setItem(LSKEY, JSON.stringify(doneSet)); } catch (e) {}
          $('spotlisten-fb').textContent = '✅ Đúng rồi! ' + cur.explain + (first ? ' (Đã ghi nhận hoàn thành điểm nghe này)' : '');
          $('spotlisten-fb').className = 'fb-line ok';
          var sc = $('spotlisten-script');
          sc.textContent = '📝 Lời thoại gốc: ' + cur.script;
          sc.style.display = '';
          $('spotlisten-close').style.display = '';
          if (first && window.GAMEUI) window.GAMEUI.apply({ jp: 2 }, 'Hoàn thành điểm nghe: ' + cur.id);
        } else {
          b.classList.add('wrong');
          $('spotlisten-fb').textContent = '❌ Chưa đúng — nghe lại, để ý từ khoá chính nhé.';
          $('spotlisten-fb').className = 'fb-line ng';
        }
      });
      box.appendChild(b);
    });
    $('modal-spotlisten').classList.add('show');
    if (!audio) audio = new Audio();
    audio.src = cur.audio;
    $('spotlisten-play').onclick = function () {
      audio.currentTime = 0; audio.play().catch(function () {});
      $('spotlisten-eq').textContent = '🔊 Đang phát… (nghe lại được thoải mái ở điểm nghe)';
    };
    $('spotlisten-close').onclick = function () { $('modal-spotlisten').classList.remove('show'); if (audio) audio.pause(); };
    return true;
  }
  window.SPOTLISTEN = {
    open: open,
    spots: function () { return JSON.parse(JSON.stringify(SPOTS)); },
    done: function () { return JSON.parse(JSON.stringify(doneSet)); },
    current: function () { return cur ? cur.id : null; },
    answer: function () { return cur ? cur.answer : -1; }   // phục vụ harness kiểm chứng
  };
})();
