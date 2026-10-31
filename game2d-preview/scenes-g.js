// scenes-g.js — GÓI CHƯƠNG 2 «VÀO GUỒNG» TRỌN VẸN (đợt xương sống Ch2, 31/10/2026).
// Cảnh: ch2-luong (lương đầu + vòng tháng gửi tiền — §4.2/6c-08), ch2-tv (bản tin TV người Việt
// bị bắt + số liệu ISA BS-03 + anh Tuấn rủ "kiếm thêm ngoài"), ch2-yui (rung động đầu — 6d-01,
// biến thể Yui), ch3-opening (mở đầu ngắn Chương 3 — chỉ mở khoá, chưa dựng Chương 3).
// Cuộc gọi Tết (nhớ nhà lần 2) KHÔNG nằm ở đây: đó là cảnh DẠNG CUỘC GỌI do máy truyện
// (story.js → startTetCall) điều phối qua lớp điện thoại, như cảnh 1.9.
// SỐ TIỀN CHỐT của vòng tháng đầu (ghi sổ ở KHUNG-GAME §6.5 đợt này):
//   lương gộp 20,10 man − khấu trừ bảo hiểm/thuế 3,30 = lương tay +16,80 man về tài khoản;
//   chi phí sống tháng: nhà 3,50 · điện nước gas 0,90 · điện thoại 0,40 · ăn uống + đi lại 3,00 = 7,80 man;
//   → vào ví +9,00 man, rồi người chơi chọn gửi về: GẦN HẾT 8,00 / VỪA 5,00 / ÍT 2,00 man (phí chuyển
//   tháng đầu được ngân hàng miễn cho khách mới mở tài khoản — nêu rõ trong thoại).
//   Chuỗi tiền phải khớp tuyệt đối: fx của điểm chọn 1 là +9,00 (đã gồm +16,80 − 7,80), điểm chọn 2 trừ đúng mức gửi.
// BS-03 (đã kiểm chứng với tài liệu 法務省・入管庁， xem Sổ đăng ký): thực tập sinh mất tích
//   2022: 9.006 · 2023: 9.753 (Việt 5.481) · 2024: 6.510 (Việt 3.865) · 2025: 3.950 (Việt 2.593).
//   Bản tin nói SỐ TRÒN theo đúng đăng ký BS-03; hộp thông tin ghi đủ dãy số + nguồn.
// Ngữ vực §8: nhân viên ngân hàng KÍNH NGỮ đầy đủ; phát thanh viên thể trang trọng của bản tin;
//   Yui teineigo mềm của nhân viên combini với khách quen; anh Tuấn (qua tin nhắn) suồng sã như cũ.
// Cờ truyện dùng trong lựa chọn phải ĐĂNG KÝ ở validate-dialogue (FLOWFLAGS): gui-tien · tuan-keo-2.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};

  /* ================= CH2-LUONG — LƯƠNG ĐẦU + VÒNG THÁNG GỬI TIỀN (§4.2) ================= */
  window.DEMO_DATA['ch2-luong'] = {
    scene: '💴 Ngày lĩnh lương đầu — ngân hàng 丸の内銀行',
    branch: [
      { sp: 'narr', text: 'Ngày 25 của tháng — ngày mà từ ngày sang Nhật tới giờ bạn đếm từng ngày. Sáng nay điện thoại rung một cái: thông báo tiền vào tài khoản. LƯƠNG ĐẦU TIÊN ở Nhật.' },
      { sp: 'narr', text: 'Tan ca, bạn ghé thẳng ngân hàng 丸の内銀行 ở phố mua sắm: một là kiểm tra bảng lương cho chắc, hai là làm việc quan trọng nhất tháng này — gửi tiền về nhà. Ở quê, bố mẹ cũng đang chờ tin này, dù không ai nói ra.' },
      { sp: 'Nhân viên ngân hàng', jp: 'いらっしゃいませ。{初|はじ}めてのお{給料|きゅうりょう}ですね。おめでとうございます。こちらが{今月|こんげつ}の{給与明細|きゅうよめいさい}でございます。ご{不明|ふめい}な{点|てん}がございましたら、{何|なん}でもお{尋|たず}ねください。', text: '(Kính chào quý khách. Đây là kỳ lương đầu tiên của quý khách nhỉ. Xin chúc mừng. Đây là bảng lương tháng này của quý khách ạ. Có điểm nào chưa rõ, quý khách cứ hỏi tôi bất cứ điều gì.)' },
      { sp: 'narr', text: 'Bạn cầm bảng lương, đọc chậm từng dòng: lương gộp tháng này 20,10 man (có cả tăng ca). Khấu trừ bảo hiểm sức khỏe, bảo hiểm hưu trí và thuế thu nhập: 3,30 man. Số tiền THẬT SỰ về tài khoản: 16,80 man.' },
      { sp: 'narr', text: 'Rồi bạn tự cộng nhẩm phần chi phí sống của tháng: tiền nhà 3,50 man · điện nước gas 0,90 man · tiền điện thoại 0,40 man · ăn uống và đi lại để dành cho tháng tới 3,00 man. Tổng cộng 7,80 man — trừ xong, tháng này bạn "dôi" ra 9,00 man so với trước khi lĩnh lương.' },
      {
        prompt: 'Trước bảng lương đầu tiên của đời đi làm xa xứ, bạn làm gì trước?',
        choice: [
          { label: 'Đọc kỹ từng dòng, hỏi nhân viên khoản khấu trừ chưa hiểu', fx: { money: 9.0, jp: 2 }, note: 'Lương tay +16,80 man − chi phí sống tháng này 7,80 man → ví +9,00 man', say: [
            { sp: 'hero', jp: 'すみません、この「{控除|こうじょ}」というのは、{何|なん}のお{金|かね}ですか。', text: '(Xin lỗi, khoản "khấu trừ" này là tiền gì vậy ạ?)' },
            { sp: 'Nhân viên ngân hàng', jp: 'はい、「{控除|こうじょ}」は{健康保険|けんこうほけん}と{厚生年金|こうせいねんきん}、それから{所得税|しょとくぜい}でございます。{病気|びょうき}になった{時|とき}や、{将来|しょうらい}のために{必要|ひつよう}なお{金|かね}ですよ。', text: '(Vâng, "khấu trừ" là bảo hiểm sức khỏe, bảo hiểm hưu trí và thuế thu nhập ạ. Đó là khoản tiền cần thiết cho lúc ốm đau và cho tương lai của quý khách đấy.)' },
            { sp: 'hero', text: '(Ra là vậy. Tiền bị trừ không phải mất đi — nó là cái ô che cho mình lúc ốm và lúc già. Hiểu được bảng lương của chính mình, tự nhiên thấy mình "người lớn" hẳn.)' }
          ] },
          { label: 'Chụp màn hình số dư — định khoe về nhà ngay cho nóng', fx: { money: 9.0, love: 1 }, note: 'Lương tay +16,80 man − chi phí sống tháng này 7,80 man → ví +9,00 man', say: [
            { sp: 'narr', text: 'Bạn giơ điện thoại chụp con số trong tài khoản, ngón tay đã chạm nút gửi về quê… rồi khựng lại. Khoe số dư thì dễ — gửi TIỀN THẬT về tới tay bố mẹ mới là việc chính. Bạn cất điện thoại, quay lại quầy làm thủ tục đàng hoàng.' },
            { sp: 'hero', text: '(Khoe sau. Gửi trước đã — ở nhà, một tin nhắn "mẹ nhận được tiền rồi" đáng giá hơn trăm tấm ảnh số dư.)' }
          ] }
        ]
      },
      { sp: 'Nhân viên ngân hàng', jp: '{海外送金|かいがいそうきん}のご{希望|きぼう}ですね。{今月|こんげつ}は{口座開設|こうざかいせつ}のキャンペーンで、{手数料|てすうりょう}は{無料|むりょう}でございます。{金額|きんがく}をお{決|き}めください。', text: '(Quý khách muốn gửi tiền ra nước ngoài đúng không ạ. Tháng này đang có chương trình mở tài khoản mới, phí chuyển được miễn phí ạ. Quý khách quyết định số tiền nhé.)' },
      { sp: 'narr', text: 'Tờ đơn gửi tiền đặt trước mặt bạn. Ô số tiền còn trống. Ở quê lúc này: khoản nợ ngày bạn đi vẫn còn đó, mái nhà dột chưa sửa, em còn phải đóng học phí kỳ tới. Ở đây: ví của bạn, sau khi gửi, sẽ còn lại phần chi phí sống đã chừa sẵn — gửi nhiều thì tháng này phải sống kiểu "sinh tồn", gửi ít thì lòng cứ day dứt mãi không yên.' },
      {
        prompt: 'Tháng lương đầu tiên này, bạn gửi về nhà bao nhiêu?',
        choice: [
          { label: 'Gửi GẦN HẾT — 8,00 man: nhà đang cần hơn mình', flag: 'gui-tien', value: 'gan-het', fx: { money: -8.0, love: 4, pressure: 2, hp: -2 }, note: 'Gửi về nhà 8,00 man — gần hết phần dôi của tháng lương đầu', say: [
            { sp: 'narr', text: 'Bạn ghi con số 8,00 man vào tờ đơn, tay hơi run. Nhân viên đóng dấu, đưa biên lai. Ra khỏi ngân hàng, ví mỏng hẳn — từ giờ tới kỳ lương sau là những ngày "chế độ sinh tồn": trứng luộc, trứng chiên, mì gói độn trứng, đếm từng ngày. Nhưng nghĩ tới mặt mẹ lúc ra ngân hàng quê nhận tiền, bạn thấy… đáng.' },
            { sp: 'hero', text: '(Ở nhà vui là được. Mình còn trẻ, ăn trứng một tháng không chết được. …Mà nói thế thôi, tối nay về luộc trứng ăn vậy.)' }
          ] },
          { label: 'Gửi VỪA — 5,00 man: đều đều mỗi tháng mới đi được đường dài', flag: 'gui-tien', value: 'vua', fx: { money: -5.0, love: 2 }, note: 'Gửi về nhà 5,00 man — mức vừa của tháng lương đầu', say: [
            { sp: 'narr', text: 'Bạn ghi 5,00 man. Không phải nhiều nhất có thể, nhưng là con số bạn tính kỹ: tháng nào cũng gửi được chừng này, đều như lương về, thì một năm là một khoản ra trò — mà mình vẫn ăn uống đàng hoàng, học hành không đứt đoạn. Đường dài thắng đường ngắn.' },
            { sp: 'hero', text: '(Bố từng nói: "Tiền gửi về đều mới quý, không phải gửi một cục rồi tháng sau im re." Tháng sau, lại đúng ngày này, lại 5 man nữa.)' }
          ] },
          { label: 'Gửi ÍT — 2,00 man: tháng đầu còn bao thứ phải sắm', flag: 'gui-tien', value: 'it', fx: { money: -2.0, pressure: 1 }, note: 'Gửi về nhà 2,00 man — tháng đầu còn nhiều khoản phải lo', say: [
            { sp: 'narr', text: 'Bạn ghi 2,00 man rồi nhìn con số một lúc lâu. Tháng đầu thật sự còn bao thứ phải mua: nồi niêu, chăn ấm, chiếc xe đạp cũ để đi làm… Lý do nào cũng đúng cả. Chỉ là trên đường về, bạn cứ nghĩ mãi về cuộc điện thoại tối nay — nói sao với mẹ cho khéo đây.' },
            { sp: 'hero', text: '(Tháng sau. Tháng sau nhất định gửi nhiều hơn. …Câu này, mình đã tự hứa mấy lần rồi nhỉ?)' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Bước ra khỏi ngân hàng, nắng chiều đổ dài trên phố mua sắm. Biên lai gửi tiền gấp tư trong ví — tờ giấy nhẹ nhất tháng này, mà cầm nặng tay nhất. Tối nay, chắc chắn điện thoại sẽ rung: ở quê, mẹ sẽ nhắn tin ngay khi nhận được tiền.' }
    ]
  };

  /* ================= CH2-TV — BẢN TIN TV + SỐ LIỆU ISA (BS-03) + TUẤN RỦ KÈO 2 ================= */
  window.DEMO_DATA['ch2-tv'] = {
    scene: '📺 Bản tin buổi tối — phòng trọ',
    branch: [
      { sp: 'narr', text: 'Tối nay bạn về sớm, nấu một bữa tử tế, bật chiếc TV nhỏ sẵn trong phòng trọ lên xem cho có tiếng người. Kênh tin tức buổi tối đang phát — dạo này bạn hay mở tin tức, một phần để luyện nghe, một phần vì thầy Khánh dặn: "Sống ở đâu thì phải biết xã hội quanh mình đang có chuyện gì."' },
      { sp: 'Phát thanh viên', jp: '{技能実習生|ぎのうじっしゅうせい}の{行方不明|ゆくえふめい}が、{社会問題|しゃかいもんだい}になっています。{去年|きょねん}、{職場|しょくば}を{離|はな}れた{実習生|じっしゅうせい}は、およそ{四千人|よんせんにん}。ピークだった2023{年|ねん}には、およそ{九千七百人|きゅうせんななひゃくにん}にのぼりました。その{半分|はんぶん}{以上|いじょう}が、ベトナム{国籍|こくせき}の{人|ひと}たちです。', text: '(Vấn đề thực tập sinh mất tích đang trở thành một vấn đề xã hội. Năm ngoái, số thực tập sinh rời bỏ nơi làm việc là khoảng 4.000 người. Vào năm đỉnh điểm 2023, con số lên tới khoảng 9.700 người. Hơn một nửa trong số đó là người quốc tịch Việt Nam.)' },
      { sp: 'Phát thanh viên', jp: 'また、{愛知県|あいちけん}では、{在留|ざいりゅう}カードを{偽造|ぎぞう}したとして、ベトナム{国籍|こくせき}の{男|おとこ}（28{歳|さい}）が{逮捕|たいほ}されました。{警察|けいさつ}は、{背後|はいご}にブローカーの{存在|そんざい}があるとみて、{調|しら}べを{進|すす}めています。', text: '(Mặt khác, tại tỉnh Aichi, một người đàn ông quốc tịch Việt Nam, 28 tuổi, đã bị bắt vì làm giả thẻ lưu trú. Cảnh sát đang điều tra theo hướng có đối tượng môi giới đứng sau vụ việc.)' },
      { sp: 'narr', text: '📊 Theo số liệu chính thức của 出入国在留管理庁 (Cơ quan Quản lý Xuất nhập cảnh Nhật Bản), số thực tập sinh mất tích: năm 2022 là 9.006 người · năm 2023 là 9.753 người (trong đó người Việt 5.481) · năm 2024 là 6.510 người (Việt 3.865) · năm 2025 là 3.950 người (Việt 2.593). Con số đang giảm dần — nhưng "mất tích" nghĩa là bỏ trốn khỏi nơi làm việc, mất luôn tư cách lưu trú hợp pháp, và phần lớn những người đó không có cái kết đẹp.' },
      {
        prompt: 'Màn hình chuyển sang bản tin thời tiết. Bạn ngồi trước TV, nghĩ gì?',
        choice: [
          { label: 'Ngồi lặng người — nhớ tới mấy người bạn cùng khóa sang cùng đợt', fx: { pressure: 2 }, say: [
            { sp: 'narr', text: 'Gần mười nghìn người ở năm đỉnh điểm. Đằng sau mỗi con số là một người từng ngồi ở sân bay khóc chia tay giống bạn, từng hứa với bố mẹ những lời giống hệt bạn. Không ai sang Nhật với ý định bỏ trốn cả — người ta bị dồn tới đường đó, từng bước một: nợ nần, gánh nặng tiền bạc, và những lời rủ rê nghe rất "hợp lý" vào đúng lúc yếu lòng nhất.' },
            { sp: 'hero', text: '(Mình phải nhớ cảm giác này. Nhớ thật kỹ — để cái ngày mình yếu lòng nhất, mình còn biết đường mà dừng lại.)' }
          ] },
          { label: 'Lẩm bẩm tập nói lại câu của phát thanh viên cho quen tai', fx: { jp: 2 }, say: [
            { sp: 'hero', jp: '「{行方不明|ゆくえふめい}」「{逮捕|たいほ}」… {難|むずか}しい {言葉|ことば}ばかりだな。でも、{分|わ}からないと {怖|こわ}いのは、こっちだ。', text: '("Mất tích", "bị bắt"… toàn từ khó. Nhưng không hiểu thì người thiệt là mình.) — Bạn ghi hai từ mới vào điện thoại. Tin tức không chỉ là tin tức; ở xứ người, hiểu được bản tin là một lớp áo giáp.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Đúng lúc đó, điện thoại trên bàn rung lên. Tin nhắn của anh Tuấn "môi giới": "Nghe tin TV chưa? Mấy đứa nó dại, bỏ trốn không có người dẫn đường nên mới bị bắt. Anh đây có chỗ LÀM THÊM NGOÀI cho người quen — tiền tươi mỗi tuần, giấy tờ anh lo hết. Khác hẳn bọn nó. Nghĩ kỹ đi, đừng dại."' },
      { sp: 'hero', text: '(Vừa xem xong bản tin bắt người vì giấy tờ giả… "giấy tờ anh lo hết". Câu này, nghe lại lần thứ hai, sao nó lạnh sống lưng thế.)' },
      {
        prompt: 'Bạn trả lời tin nhắn của anh Tuấn thế nào?',
        choice: [
          { label: 'Từ chối dứt khoát: "Em chỉ làm đúng chỗ, đúng luật thôi anh"', flag: 'tuan-keo-2', value: 'tu-choi', fx: { jp: 1 }, say: [
            { sp: 'narr', text: 'Bạn gõ tin nhắn, đọc lại hai lần rồi mới gửi — ngắn, rõ, không vòng vo. Anh Tuấn trả lời sau mười phút, cụt lủn: "Ừ. Tùy chú." Từ hôm đó, anh ta không nhắn nữa. Một cánh cửa khép lại — và bạn biết chắc đó là cánh cửa mình MUỐN khép.' },
            { sp: 'hero', text: '(Mất một "người quen có kèo" — được một giấc ngủ ngon. Thương vụ này mình lời.)' }
          ] },
          { label: 'Trả lời ỡm ờ: "Để em nghĩ thêm đã anh…"', flag: 'tuan-keo-2', value: 'o-mo', fx: { risk: 1, pressure: 1 }, say: [
            { sp: 'narr', text: 'Bạn không dám từ chối thẳng — sợ mất lòng, sợ sau này cần người giúp thì không còn ai. Tin nhắn "để em nghĩ thêm" gửi đi nghe vô hại… nhưng nó để cánh cửa hé mở. Và những cánh cửa hé mở, đến lúc gió lớn, thường tự bật tung. Chuyện này chưa kết thúc ở đây đâu.' },
            { sp: 'hero', text: '(Nghĩ thêm… nghĩ thêm cái gì chứ. Mình chỉ là không dám nói "không" thôi. Thôi, kệ, để mai tính.)' }
          ] },
          { label: 'Không trả lời — tắt TV, đi ngủ sớm, mai còn đi làm', flag: 'tuan-keo-2', value: 'im-lang', fx: { hp: 1 }, say: [
            { sp: 'narr', text: 'Bạn để tin nhắn nằm đó, không trả lời. Tắt TV, tắt đèn, kéo chăn. Ngoài kia, các khu phố quanh nhà chìm vào đêm yên tĩnh. Có những tin nhắn, không trả lời cũng là một câu trả lời — ít nhất là với chính mình.' }
          ] }
        ]
      }
    ]
  };

  /* ================= CH2-YUI — RUNG ĐỘNG ĐẦU TIÊN (6d-01, biến thể Yui) ================= */
  window.DEMO_DATA['ch2-yui'] = {
    scene: '💗 Combini buổi tối — khách quen',
    branch: [
      { sp: 'narr', text: 'Tối nay tan ca muộn, bạn ghé combini 秋葉原マート mua đồ ăn như mọi ngày. Mấy tháng trời, tuần nào cũng mấy lần — cái combini này giờ quen thuộc như cái bếp ở nhà, chỉ khác là ở nhà không có ai đứng quầy mỉm cười với bạn.' },
      { sp: 'Yui', jp: 'いらっしゃいませ。…あれ？ {今日|きょう}は {遅|おそ}いですね。いつもの、ツナマヨおにぎりと お{茶|ちゃ}、まだ {残|のこ}ってますよ。', text: '(Kính chào quý khách. …Ơ? Hôm nay bạn tới trễ nhỉ. Món quen thuộc của bạn — onigiri cá ngừ mayo với trà — vẫn còn đấy nhé.)' },
      { sp: 'hero', text: '(Cô ấy… nhớ cả món mình hay mua? Mình đến đây bao nhiêu lần rồi nhỉ — mà hôm nay mới để ý: hóa ra có người NHỚ mình ghé.)', jp: 'え、{覚|おぼ}えて…くれたんですか。' },
      { sp: 'Yui', jp: 'はい。{毎週|まいしゅう} {来|き}てくれますから。…あの、{仕事|しごと}、{大変|たいへん}そうですね。{無理|むり}しないでくださいね。', text: '(Vâng. Vì tuần nào bạn cũng ghé mà. …À này, công việc của bạn trông vất vả nhỉ. Đừng gắng sức quá nhé.)' },
      {
        prompt: 'Tim bạn đập nhanh hơn một nhịp. Bạn sẽ…',
        choice: [
          { label: 'Đáp đàng hoàng bằng tiếng Nhật — và hỏi tên cô ấy', fx: { jp: 2, love: 3 }, say: [
            { sp: 'hero', jp: '{私|わたし}の {好|す}きなものを {覚|おぼ}えてくれて、ありがとうございます。あの…お{名前|なまえ}を {聞|き}いても いいですか。', text: '(Cảm ơn bạn đã nhớ món tôi thích. À… tôi hỏi tên bạn được không?)' },
            { sp: 'Yui', jp: 'えっ…あ、はい。{私|わたし}、{結衣|ゆい}って {言|い}います。…{店|みせ}の {名前|なまえ}じゃなくて、{私|わたし}の {名前|なまえ}、{初|はじ}めて {聞|き}かれました。', text: '(Ơ… à, vâng. Tôi tên là Yui. …Lần đầu tiên có người hỏi tên TÔI, chứ không phải tên cửa hàng đấy.) — Yui hơi cúi mặt, vành tai đỏ lên một chút. Cái bảng tên trên ngực cô ấy, hóa ra bạn đã đọc thuộc từ lâu rồi — chỉ là hôm nay mới dám nói chuyện như hai người quen.' },
            { sp: 'narr', text: 'Ra khỏi combini, bạn đi bộ về phòng mà chân nhẹ hẳn. Chưa có gì xảy ra cả — không số điện thoại, không lời hẹn. Chỉ là từ hôm nay, ở thị trấn xa lạ này, có thêm một người biết mặt bạn, nhớ món bạn ăn. Thế thôi mà lòng ấm lạ.' }
          ] },
          { label: 'Lấy thêm một hộp cơm — có thêm cớ đứng lại nói thêm vài câu', fx: { money: -0.62, love: 2 }, note: 'Mua thêm hộp cơm ở combini — 620 yên', say: [
            { sp: 'narr', text: 'Bạn với tay lấy thêm một hộp cơm 620 yên — thật ra trong phòng vẫn còn đồ ăn. Nhưng hộp cơm này mua cho bạn thêm đúng… hai phút ở quầy. Hai phút hỏi Yui hôm nay ca có đông không, hai phút nghe cô ấy kể quán vừa đổi cách xếp kệ. Hai phút đắt nhất tháng — và bạn thấy hoàn toàn xứng đáng.' },
            { sp: 'Yui', jp: 'あ、{今日|きょう}は {奮発|ふんぱつ}ですね。ちゃんと {食|た}べて、{明日|あした}も {頑張|がんば}ってください。', text: '(Ồ, hôm nay bạn "chịu chi" nhỉ. Ăn uống đàng hoàng vào, mai lại cố gắng nhé.) — Cô ấy cười, mắt cong cong. Bạn gật đầu lia lịa như học sinh được khen.' }
          ] },
          { label: 'Ngại quá — trả tiền, cảm ơn rối rít rồi đi nhanh ra cửa', fx: { pressure: 1 }, say: [
            { sp: 'narr', text: 'Bạn cảm ơn đến lần thứ ba, cúi đầu đến lần thứ hai, rồi bước ra cửa nhanh như trốn. Đi được mười bước mới dám thở mạnh. Tiếng Nhật học mấy tháng trời, tới lúc cần nói một câu cho ra hồn thì bay sạch khỏi đầu. Trên đường về, bạn tự tập nói lại câu vừa rồi đến năm lần — lần sau. Nhất định lần sau.' },
            { sp: 'hero', text: '(Lần sau mình sẽ nói được. …Mà "lần sau" là khi nào, combini thì ngày nào mình chẳng ghé. Thôi được — mai. Mai là lần sau.)' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Người ta gọi cái này là "rung động đầu tiên": nó không ồn ào, không pháo hoa — nó chỉ là việc bạn bắt đầu ngóng tới giờ tan ca, và bước chân tự rẽ vào một cái combini sáng đèn, nơi có người nhớ món bạn hay ăn.' }
    ]
  };

  /* ================= CH3-OPENING — MỞ ĐẦU NGẮN CHƯƠNG 3 «NGÃ RẼ» (chỉ mở khoá) ================= */
  window.DEMO_DATA['ch3-opening'] = {
    scene: '🌸 Chương 3 — Ngã rẽ',
    branch: [
      { sp: 'narr', text: 'Tháng ba sang, hoa anh đào trước ga 新宿駅 bung nở rợp một góc trời. Bạn đứng dưới tán hoa, cầm trên tay kết quả mốc N4 — một năm ở Nhật đã trôi qua như thế đấy: từ đứa lớ ngớ không biết phân loại rác, tới người có lương đều, có sổ gửi tiền về nhà đều, và có cả một thị trấn bắt đầu nhớ mặt mình.' },
      { sp: 'narr', text: 'Nhưng Chương 3 mở ra bằng những câu hỏi lớn hơn hẳn Chương 2: đi tiếp con đường nào — thi lên 特定技能 để ở lại lâu dài? Học lên tiếp? Hay một ngày nào đó, quay về? Chị Mai đã nói trước: "Tới lúc phải chọn đường rồi đấy. Chọn sớm thì đi thong thả, chọn muộn thì chạy hụt hơi."' },
      {
        prompt: 'Đứng dưới tán hoa anh đào đầu tiên của đời xa xứ, bạn tự nhủ:',
        choice: [
          { label: '"Năm nay, mình sẽ chọn đường của mình — và đi cho tới nơi"', fx: { jp: 1 }, say: [
            { sp: 'hero', text: '(Chương 2 dạy mình đứng vững. Chương 3 sẽ dạy mình chọn hướng. Hoa nở có một mùa thôi — người cũng vậy, thanh xuân ở Nhật không chờ ai cả.)' }
          ] },
          { label: '"Trước hết, gọi về khoe bố mẹ cái đã — nhà mình đỗ N4 rồi!"', fx: { love: 1 }, say: [
            { sp: 'hero', text: '(Tin vui thì phải về nhà đầu tiên. Bố sẽ lại cười ha hả trong điện thoại, mẹ sẽ lại dặn ăn uống đủ bữa — vẫn những câu đó, mà nghe bao nhiêu lần cũng không chán.)' }
          ] }
        ]
      },
      { sp: 'narr', text: '(Chương 3 «Ngã rẽ» sẽ được viết trọn ở đợt truyện sau — những lựa chọn lớn, những ngã rẽ thật sự đang chờ ở phía trước. Thị trấn Shinjuku vẫn ở đây, chờ bạn.)' }
    ]
  };
})();
