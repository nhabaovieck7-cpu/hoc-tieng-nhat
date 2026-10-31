// data.js — Dữ liệu hội thoại cho DEMO 2D «TUỔI TRẺ Ở NHẬT».
// Cảnh combini + đoạn kết c4b + thoại Hùng (c2/c2a): SAO CHÉP NGUYÊN VĂN từ
// game-story/staging/game/truyen-data-ch1.js (Chương 1, các node c2, c2a, c4, c4b)
// của lane truyện — bản sao để demo độc lập, KHÔNG sửa file gốc.
// Cảnh máy bán hàng tự động là nội dung DEMO viết thêm (placeholder) để minh họa điểm tương tác phụ.
(function () {
  'use strict';

  // --- Cảnh combini (node c4) — nguyên văn ---
  var COMBINI = {
    scene: '🏪 Combini đầu đời',
    wrong: {
      0: ['この{弁当|べんとう}とアイスは、{今日|きょう}の{私|わたし}の{夢|ゆめ}です。ください。', 'アイスは{弁当|べんとう}の{中|なか}に{入|い}れて、{友達|ともだち}にしてください。'],
      1: ['はい、{袋|ふくろ}を{着|き}ます。{大|おお}きいのがいいです。', 'はいはい。{袋|ふくろ}も{温|あたた}めてください。'],
      2: ['アイスを{温|あたた}めてください。{弁当|べんとう}は{冷|つめ}たいままでいいです。', 'ぜんぶ{熱|あつ}くしてください。アイスはドリンクになりますね。'],
      3: ['ポイントカードは、{家|いえ}の{鍵|かぎ}ですか。これで{開|あ}きますか。', 'はい、ポイントは{明日|あした}の{天気|てんき}です。{晴|は}れだと{思|おも}います。']
    },
    lines: [
      { sp: 'Yui', jp: 'いらっしゃいませ。', vi: 'Xin chào quý khách ạ.' },
      { sp: 'hero', jp: 'すみません、この{弁当|べんとう}とアイスをください。', vi: 'Xin lỗi, cho tôi hộp cơm này và cây kem này.' },
      { sp: 'Yui', jp: '{袋|ふくろ}は、いりますか。', vi: 'Anh/chị có cần túi không ạ?' },
      { sp: 'hero', jp: 'はい、お{願|ねが}いします。', vi: 'Vâng, cho tôi xin túi ạ.' },
      { sp: 'Yui', jp: 'こちらの{弁当|べんとう}、{温|あたた}めますか。', vi: 'Hộp cơm này, tôi hâm nóng cho anh/chị nhé?' },
      { sp: 'hero', jp: 'はい、{弁当|べんとう}だけ{温|あたた}めてください。アイスはそのままで、お{願|ねが}いします。', vi: 'Vâng, chỉ hâm hộp cơm thôi ạ. Kem thì để nguyên giúp tôi.' },
      { sp: 'Yui', jp: 'ポイントカードはお{持|も}ちですか。お{支払|しはら}いは{現金|げんきん}ですか、カードですか。', vi: 'Anh/chị có thẻ điểm không ạ? Thanh toán bằng tiền mặt hay thẻ ạ?' },
      { sp: 'hero', jp: 'ポイントカードは{持|も}っていません。{現金|げんきん}で{払|はら}います。', vi: 'Tôi không có thẻ điểm. Tôi trả bằng tiền mặt.' },
      { sp: 'Yui', jp: 'お{弁当|べんとう}が620{円|えん}、アイスが177{円|えん}、レジ{袋|ぶくろ}が3{円|えん}で、{合計|ごうけい}800{円|えん}になります。', vi: 'Hộp cơm 620 yên, cây kem 177 yên, túi nilon tính riêng 3 yên — tổng cộng 800 yên ạ.' },
      { sp: 'Yui', jp: 'かしこまりました。{少々|しょうしょう}お{待|ま}ちください。', vi: 'Tôi rõ rồi ạ. Xin đợi một chút.' },
      { sp: 'hero', jp: 'ありがとうございます。', vi: 'Cảm ơn chị.' },
      { sp: 'Yui', jp: 'ありがとうございました。またお{越|こ}しくださいませ。', vi: 'Cảm ơn quý khách. Hẹn gặp lại ạ.' }
    ],
    // Đoạn dẫn chuyện sau cảnh (node c4b — nguyên văn, {name}/{call} thay lúc chạy).
    outro: 'Ở quầy tính tiền có hai chi tiết nhỏ {name} suýt bỏ qua: tiền phải đặt lên chiếc khay con thay vì đưa tận tay, và màn hình máy tính tiền hiện rõ từng món — kể cả 3 yên tiền túi nilon tính riêng. Về tới phòng, {name} mở túi combini như mở kho báu: hộp cơm còn ấm, thơm phức. Và cây kem… Nếu lúc nãy gật bừa thêm một nhịp nữa thôi, cây kem giờ đã thành súp kem rồi. {name} cắn một miếng kem lạnh, tự hứa: từ mai, nghe hết câu rồi hãy gật. Hùng ở phòng bên gõ tường: "Sống sót ngày đầu rồi đấy, {call}!"'
  };
  // --- Thoại với Hùng trên đường (node c2 + c2a — nguyên văn hai câu gốc, dạng branch:
  // giữ nguyên văn, chèn thêm lời dặn điểm lánh nạn + 1 choice đáp lại "3 điều sống còn") ---
  var HUNG = {
    scene: '🚶 Trên đường ra ga — Hùng "sẹo" khai sáng',
    branch: [
      { sp: 'Hùng "sẹo"', text: 'Cộc cộc cộc! Hùng "sẹo" — senpai ở cùng khu, mặt có vết sẹo nhỏ mà miệng thì không nhỏ chút nào — gõ cửa rầm rầm: "Dậy chưa {call}? Đi, anh dẫn đi mua đồ, chỉ đường ra ga. Ở Nhật, thuộc đường ra ga là thuộc nửa đường về nhà đấy."' },
      { sp: 'Hùng "sẹo"', text: 'Vừa đi Hùng vừa "khai sáng": "Ba điều sống còn này. Một, thấy gì không hiểu thì chụp ảnh lại, tối tra sau. Hai, ở combini người ta hỏi một tràng, cứ nghe hết rồi hãy gật. Ba — quan trọng nhất — đừng gật bừa. Gật bừa là có ngày ăn kem hâm nóng đấy, {call} ạ." {name} gật đầu lia lịa. Gật rất bừa.' },
      { sp: 'Hùng "sẹo"', text: 'Đi qua đầu phố, Hùng chỉ tay về phía trường tiểu học: "Động đất mạnh thì chạy ra sân trường tiểu học kia kìa — điểm lánh nạn của khu này. Nhớ mặt đường đi từ bây giờ."' },
      {
        prompt: 'Đáp lại "3 điều sống còn" của Hùng thế nào?',
        choice: [
          {
            label: '"Nhớ nhất điều ba — đừng gật bừa."',
            fx: { jp: 1 }, note: 'Đáp Hùng: nhớ nhất điều ba — đừng gật bừa',
            say: [
              { sp: 'Hùng "sẹo"', text: 'Hùng cười khoái chí, vỗ vai {name} đánh bốp: "Đấy! Học nhanh thế này thì sống được. Nhớ đấy — nghe hết câu, rồi hãy gật."' }
            ]
          },
          {
            label: '"Gật bừa tí có sao đâu anh." (đùa)',
            fx: { love: 1 }, note: 'Đùa với Hùng về chuyện gật bừa',
            say: [
              { sp: 'Hùng "sẹo"', text: 'Hùng trợn mắt dọa: "Ừ, cứ gật bừa đi — rồi có ngày ăn kem hâm nóng, lúc đó đừng có khóc với anh!" Nói vậy mà miệng cười toe toét.' }
            ]
          },
          {
            label: '"Anh nhắc lại điều một cho em với."',
            fx: { jp: 1 }, note: 'Hỏi lại Hùng điều một: chụp ảnh, tối tra từ',
            say: [
              { sp: 'Hùng "sẹo"', text: 'Hùng gật gù nhắc lại: "Điều một: thấy gì không hiểu — biển hiệu, tờ đơn, thông báo — thì chụp ảnh lại, tối về từ từ tra từng chữ. Chụp trước, hiểu sau, thế là không sót chữ nào."' }
            ]
          }
        ]
      }
    ]
  };

  // --- Máy bán hàng tự động (cảnh phụ — branch ngắn: chọn đồ uống) ---
  var VENDING = {
    scene: '🥤 Máy bán hàng tự động',
    branch: [
      { sp: 'narr', text: 'Máy bán hàng sáng đèn giữa phố vắng. {name} đứng ngắm một lúc: trà, cà phê lon, cả súp ngô nóng. Ở Nhật, cái máy này cũng là một "cửa hàng" không bao giờ ngủ.' },
      { sp: 'narr', text: '{name} nhét 130 yên tiền xu, bấm lon cà phê. "Cạch" — lon rơi xuống, ấm tay. Sống sót ở Nhật, đôi khi bắt đầu từ những thứ nhỏ như thế này.' },
      {
        prompt: 'Hay là mua thêm một lon nữa?',
        choice: [
          {
            label: 'Mua lon cà phê nóng — 130 yên',
            fx: { money: -0.01 }, note: 'Mua lon cà phê nóng ở máy bán hàng',
            say: [
              { sp: 'narr', text: '"Cạch" — lon cà phê nóng rơi xuống khay lấy đồ. {name} ôm lon vào hai tay, hơi ấm lan ra từng đầu ngón tay đang lạnh cóng. Ấm cả tay, ấm cả bụng.' }
            ]
          },
          {
            label: 'Mua trà ô long cho tỉnh táo',
            fx: { hp: 1, money: -0.01 }, note: 'Mua trà ô long ở máy bán hàng',
            say: [
              { sp: 'narr', text: '"Cạch" — chai trà ô long mát lạnh rơi xuống. {name} tu một hơi dài: mát, tỉnh cả người. Đường về phòng bỗng ngắn lại hẳn.' }
            ]
          },
          {
            label: 'Thôi, để dành tiền',
            say: [
              { sp: 'narr', text: '{name} đút tay vào túi, đi tiếp. Ví tiền còn nguyên vẹn — và trong lòng dâng lên một niềm tự hào nhẹ: nhịn được một lần thèm vặt, cũng là thắng chính mình một lần.' }
            ]
          }
        ]
      }
    ]
  };

  // --- Cảnh nhà hàng (KAIWA đầy đủ — vào quán 築地食堂 ăn trưa, nhân viên nói kính ngữ chuẩn) ---
  var STAFF = {
    scene: '🍱 築地食堂 — bữa trưa đầu tiên',
    wrong: {
      0: ['{一|いち}{人|にん}です。{一台|いちだい}ください。', '{私|わたし}だけ{一人|ひとり}、{友達|ともだち}は{家|いえ}で{待|ま}っています{席|せき}です。'],
      2: ['おすすめは、{私|わたし}を{食|た}べますか。{何|なに}がいいですか。', 'おすすめをください。それは{何|なん}の{味|あじ}ですか、{先生|せんせい}。'],
      4: ['お{水|みず}は{私|わたし}に{泳|およ}ぎます。ください。', '{水|みず}を{飲|の}みたいですから、{海|うみ}を{一|ひと}つください。']
    },
    lines: [
      { sp: 'Nhân viên nhà hàng', jp: 'いらっしゃいませ。{何名様|なんめいさま}ですか。', vi: 'Xin chào quý khách ạ. Quý khách đi mấy người ạ?' },
      { sp: 'hero', jp: '{一人|ひとり}です。', vi: 'Tôi đi một người ạ.' },
      { sp: 'Nhân viên nhà hàng', jp: 'かしこまりました。カウンター{席|せき}でもよろしいですか。', vi: 'Tôi rõ rồi ạ. Quý khách ngồi ghế ở quầy (ghế counter) có được không ạ?' },
      { sp: 'hero', jp: 'はい、{大丈夫|だいじょうぶ}です。', vi: 'Vâng, được ạ.' },
      { sp: 'Nhân viên nhà hàng', jp: 'こちらがメニューです。ご{注文|ちゅうもん}がお{決|き}まりになりましたら、お{呼|よ}びください。', vi: 'Đây là thực đơn ạ. Khi quý khách chọn xong món, xin cứ gọi tôi ạ.' },
      { sp: 'hero', jp: 'すみません、おすすめは{何|なん}ですか。', vi: 'Xin lỗi, món được nhà hàng gợi ý (おすすめ) là món gì ạ?' },
      { sp: 'Nhân viên nhà hàng', jp: '{今日|きょう}の{日替|ひが}わり{定食|ていしょく}がおすすめです。{焼|や}き{魚|ざかな}と{小鉢|こばち}がついて、850{円|えん}です。', vi: 'Món gợi ý là suất ăn định thực thay đổi theo ngày (日替わり定食) hôm nay ạ. Có cá nướng và một món phụ nhỏ, giá 850 yên ạ.' },
      { sp: 'hero', jp: 'では、{日替|ひが}わり{定食|ていしょく}を{一|ひと}つお{願|ねが}いします。', vi: 'Vậy cho tôi một suất 日替わり定食 ạ.' },
      { sp: 'Nhân viên nhà hàng', jp: 'かしこまりました。{日替|ひが}わり{定食|ていしょく}、{一|ひと}つですね。{少々|しょうしょう}お{待|ま}ちください。', vi: 'Rõ rồi ạ. Một suất 日替わり定食, đúng không ạ. Xin quý khách đợi một chút ạ.' },
      { sp: 'hero', jp: 'あと、すみません。お{水|みず}を{一|ひと}つお{願|ねが}いします。', vi: 'À, xin lỗi ạ. Cho tôi thêm một ly nước nữa ạ.' },
      { sp: 'Nhân viên nhà hàng', jp: 'お{水|みず}は、あちらのコーナーでセルフサービスになっております。ご{自由|じゆう}にお{取|と}りください。', vi: 'Nước lọc ở góc đằng kia là hình thức tự phục vụ ạ. Quý khách cứ tự lấy tự nhiên ạ.' }
    ],
    outro: 'Bữa trưa ở 築地食堂: suất 日替わり定食 850 yên — cá nướng thơm phức, canh miso nóng hổi, cơm trắng dẻo. Và {name} học thêm được một điều nhỏ mà thật: ở nhiều quán ăn Nhật, nước lọc là miễn phí và để ở một góc quán cho khách tự phục vụ — khát thì tự ra lấy, không cần gọi nhân viên, cũng không tính tiền. Ăn xong bữa trưa đầu tiên bằng tiếng Nhật tự gọi món, {name} thấy mình lớn thêm được một chút.'
  };
  // --- Cảnh Shiyakusho (KAIWA đầy đủ — Chương 1: đăng ký địa chỉ 転入届, cán bộ nói teineigo chuẩn) ---
  var OFFICER = {
    scene: '🏢 Shiyakusho — đăng ký địa chỉ',
    wrong: {
      0: ['おい、15{番|ばん}、{俺|おれ}だよ。カード、これ。', '{在留|ざいりゅう}カード、はい。{早|はや}くしてね。'],
      1: ['{転出届|てんしゅつとどけ}をお{願|ねが}いします。{日本|にほん}から{引|ひ}っ{越|こ}します。', '{転入届|てんにゅうとどけ}は、{国|くに}へ{帰|かえ}る{時|とき}の{紙|かみ}ですね。ください。'],
      2: ['{引|ひ}っ{越|こ}した{日|ひ}は、25{月|がつ}10{日|にち}です。{住所|じゅうしょ}は{高円寺|こうえんじ}です。', '{住所|じゅうしょ}はあとでいいですか。{日|ひ}だけ{先|さき}に{言|い}います。10{日|にち}25{月|がつ}です。'],
      3: ['{裏面|うらめん}は{写真|しゃしん}を{貼|は}る{所|ところ}ですね。{住所|じゅうしょ}は{書|か}かなくていいです。', '{在留|ざいりゅう}カードの{裏|うら}は{空|あ}けておきます。{住所|じゅうしょ}は{紙|かみ}だけですね。']
    },
    lines: [
      { sp: 'Cán bộ ủy ban', jp: 'おはようございます。まず、{番号札|ばんごうふだ}をお{取|と}りになって、お{待|ま}ちください。', vi: 'Chào buổi sáng ạ. Trước tiên, xin quý vị lấy phiếu số (番号札) rồi ngồi chờ ạ.' },
      { sp: 'Cán bộ ủy ban', jp: '15{番|ばん}の{方|かた}、3{番|ばん}{窓口|まどぐち}へどうぞ。', vi: 'Xin mời vị khách số 15 tới quầy số 3 ạ.' },
      { sp: 'hero', jp: 'はい、15{番|ばん}は{私|わたし}です。{在留|ざいりゅう}カードはこれです。', vi: 'Vâng, số 15 là tôi ạ. Đây là thẻ lưu trú (在留カード) của tôi ạ.' },
      { sp: 'Cán bộ ủy ban', jp: '{在留|ざいりゅう}カードをお{借|か}りします。{本日|ほんじつ}はどのようなご{用件|ようけん}でしょうか。', vi: 'Xin phép mượn thẻ lưu trú ạ. Hôm nay quý vị tới làm thủ tục gì ạ?' },
      { sp: 'hero', jp: '{転入届|てんにゅうとどけ}をお{願|ねが}いします。{日本|にほん}に{来|き}てから、まだ{一週間|いっしゅうかん}です。', vi: 'Tôi muốn nộp giấy đăng ký chuyển đến (転入届) ạ. Tôi mới tới Nhật được một tuần ạ.' },
      { sp: 'Cán bộ ủy ban', jp: 'かしこまりました。{転入届|てんにゅうとどけ}は、{入国|にゅうこく}した{日|ひ}から14{日以内|にちいない}に{届|とど}け{出|で}る{必要|ひつよう}があります。{新|あたら}しい{住所|じゅうしょ}と、{引|ひ}っ{越|こ}した{日|ひ}を{教|おし}えてください。', vi: 'Rõ rồi ạ. Giấy 転入届 cần nộp trong vòng 14 ngày kể từ ngày nhập cảnh ạ. Xin cho biết địa chỉ mới và ngày chuyển đến ạ.' },
      { sp: 'hero', jp: '{新|あたら}しい{住所|じゅうしょ}は、{高円寺|こうえんじ}{一丁目|いっちょうめ}2{番|ばん}3{号|ごう}です。{引|ひ}っ{越|こ}した{日|ひ}は、10{月|がつ}25{日|にち}です。', vi: 'Địa chỉ mới của tôi là Kichijōji 1-chōme, số 2-3 ạ. Ngày chuyển đến là ngày 25 tháng 10 ạ.' },
      { sp: 'Cán bộ ủy ban', jp: 'ありがとうございます。では、この{転入届|てんにゅうとどけ}にご{記入|きにゅう}ください。{住所|じゅうしょ}は、こちらの{在留|ざいりゅう}カードの{裏面|うらめん}にも{記載|きさい}いたします。', vi: 'Cảm ơn ạ. Vậy xin quý vị điền vào tờ 転入届 này ạ. Địa chỉ cũng sẽ được ghi vào mặt sau của thẻ lưu trú này ạ.' },
      { sp: 'hero', jp: 'わかりました。{裏面|うらめん}に{住所|じゅうしょ}を{書|か}くんですね。よろしくお{願|ねが}いします。', vi: 'Tôi hiểu rồi ạ. Địa chỉ được ghi vào mặt sau thẻ, phải không ạ. Nhờ chị giúp ạ.' },
      { sp: 'Cán bộ ủy ban', jp: 'はい、そのとおりです。…できました。{裏面|うらめん}に{住所|じゅうしょ}を{記載|きさい}した{在留|ざいりゅう}カードをお{返|かえ}しします。', vi: 'Vâng, đúng vậy ạ. …Đã xong rồi ạ. Tôi xin trả lại thẻ lưu trú đã ghi địa chỉ ở mặt sau ạ.' },
      { sp: 'hero', jp: 'ありがとうございます。あと、{住民票|じゅうみんひょう}を{一枚|いちまい}ください。', vi: 'Cảm ơn ạ. À, cho tôi xin thêm một bản giấy chứng nhận cư trú (住民票) nữa ạ.' },
      { sp: 'Cán bộ ủy ban', jp: 'かしこまりました。{住民票|じゅうみんひょう}は{一枚|いちまい}300{円|えん}です。{区|く}によって{手数料|てすうりょう}が{少|すこ}し{違|ちが}います。', vi: 'Rõ rồi ạ. Một bản 住民票 là 300 yên ạ. Phí này có khác nhau đôi chút tùy theo phường ạ.' },
      { sp: 'hero', jp: 'ありがとうございました。とても{助|たす}かりました。', vi: 'Cảm ơn chị rất nhiều ạ. Chị đã giúp tôi nhiều lắm ạ.' }
    ],
    outro: 'Chưa tới giờ trưa mà thủ tục đã xong xuôi: tờ 転入届 nộp đúng hạn 14 ngày kể từ ngày tới Nhật, mặt sau tấm 在留カード đã ghi địa chỉ mới, và trong tay {name} còn thêm một bản 住民票. Lúc mới bước vào ủy ban, {name} cứ sợ vốn tiếng Nhật ít ỏi của mình sẽ khiến buổi sáng này kéo dài tới tận trưa giữa hàng ghế chờ. Hóa ra chỉ cần nghe hết câu, nói chậm rãi bằng kính ngữ vừa sức, là qua được cửa ải giấy tờ đầu tiên ở Nhật.'
  };
  // --- Cảnh ở ga (KAIWA đầy đủ — Chương 1: lạc tàu / hỏi đường.
  // Nguồn tinh thần: bài kaiwa-12 trên web học tiếng Nhật (lạc ở ga lớn, hỏi nhân viên ga cách đi) ---
  var STATION = {
    scene: '🚉 Ga trung chuyển — hỏi đường về Shinjuku',
    wrong: {
      0: ['おい、{新宿駅|しんじゅくえき}、どこ？{早|はや}く{教|おし}えて。', '{私|わたし}の{電車|でんしゃ}はどこですか。{電車|でんしゃ}を{探|さが}しています。'],
      1: ['8{番線|ばんせん}ですね。{緑駅|みどりえき}で{降|お}りれば{終|お}わりですね。', '3{番線|ばんせん}ですね。{緑駅|みどりえき}で{降|お}りて、{歩|ある}いて{行|い}きます。'],
      2: ['なあ、新宿まで{何分|なんぷん}？{早|はや}い？', '{新宿駅|しんじゅくえき}、{時間|じかん}は{俺|おれ}に{何分|なんぷん}かかりますか。'],
      3: ['ありがとう。8{番線|ばんせん}と5{番線|ばんせん}、{両方|りょうほう}{行|い}きます。', '{電車|でんしゃ}は{私|わたし}を3{番線|ばんせん}で{待|ま}っていますね。ありがとう。']
    },
    lines: [
      { sp: 'hero', jp: 'すみません、{道|みち}に{迷|まよ}ってしまいました。{新宿駅|しんじゅくえき}へ{行|い}きたいんですが、どう{行|い}けばいいですか。', vi: 'Xin lỗi, tôi bị lạc đường mất rồi. Tôi muốn đi tới ga Shinjuku (新宿駅) thì phải đi thế nào ạ?' },
      { sp: 'Nhân viên ga', jp: '{新宿駅|しんじゅくえき}ですね。まず、この{駅|えき}の3{番線|ばんせん}から{電車|でんしゃ}に{乗|の}ってください。{二|ふた}つ{先|さき}の{緑駅|みどりえき}で{乗|の}り{換|か}えです。', vi: 'Ga Shinjuku phải không ạ. Trước tiên, xin lên tàu ở sân ga số 3 của ga này ạ. Đến ga Midori — cách đây hai ga — thì đổi tàu ạ.' },
      { sp: 'hero', jp: '3{番線|ばんせん}ですね。{緑駅|みどりえき}で{乗|の}り{換|か}えるんですね。', vi: 'Sân ga số 3 ạ. Và ở ga Midori thì đổi tàu, đúng không ạ?' },
      { sp: 'Nhân viên ga', jp: 'はい、{乗|の}り{換|か}えです。{緑駅|みどりえき}では、5{番線|ばんせん}の{新宿線|しんじゅくせん}に{乗|の}り{換|か}えてください。', vi: 'Vâng, là đổi tàu ạ. Ở ga Midori, xin đổi sang tuyến Shinjuku ở sân ga số 5 ạ.' },
      { sp: 'hero', jp: 'わかりました。{新宿駅|しんじゅくえき}まで、{全部|ぜんぶ}で{何分|なんぷん}ぐらいかかりますか。', vi: 'Tôi hiểu rồi ạ. Đi tới ga Shinjuku thì tổng cộng mất khoảng bao nhiêu phút ạ?' },
      { sp: 'Nhân viên ga', jp: '{乗|の}り{換|か}えの{時間|じかん}も{入|い}れて、だいたい25{分|ふん}です。{次|つぎ}の{電車|でんしゃ}は5{分後|ふんご}に{来|き}ます。', vi: 'Tính cả thời gian đổi tàu thì khoảng 25 phút ạ. Chuyến tàu tiếp theo sẽ đến sau 5 phút nữa ạ.' },
      { sp: 'hero', jp: 'ありがとうございます。3{番線|ばんせん}に{行|い}きます。', vi: 'Cảm ơn anh ạ. Tôi đi ra sân ga số 3 đây ạ.' },
      { sp: 'Nhân viên ga', jp: 'はい、お{気|き}をつけて。{乗|の}り{換|か}えの{緑駅|みどりえき}を{過|す}ぎないようにしてくださいね。', vi: 'Vâng, xin quý khách cẩn thận ạ. Nhớ đừng đi quá ga Midori — ga cần đổi tàu — nhé ạ.' }
    ],
    outro: '{name} chạy kịp ra sân ga số 3, lên đúng chuyến tàu, đến ga Midori thì nhớ lời dặn mà đổi sang sân ga số 5. Khi bảng điện tử hiện lên chữ 新宿駅, {name} thở phào một hơi dài: lạc ở một ga lớn của Nhật thì đáng sợ thật, nhưng hỏi đúng người và nghe hết câu, là lại tìm được đường về nhà.'
  };

  // --- Mở đầu đoạn mẫu (viết mới cho bản 2D — ngày đầu tới Nhật, nhận phòng) ---
  var INTRO = {
    scene: '✈️ Ngày đầu tiên ở Nhật',
    sayLines: [
      { sp: 'narr', text: 'Chuyến bay đáp xuống khi trời Nhật vừa sẩm tối. Kéo theo chiếc vali nặng trĩu và một cái bụng đói meo, {name} đứng trước cửa căn phòng 1K ở khu Shinjuku — từ hôm nay, đây là nhà.' },
      { sp: 'narr', text: 'Phòng nhỏ thôi: một tấm futon, một cái bàn, bếp mini và cửa sổ nhìn ra ban công phơi đồ. Nhưng mọi thứ đều mới, đều lạ, và đều là của mình. {name} đặt vali xuống, thở ra một hơi dài: "Bắt đầu rồi đây."' },
      { sp: 'narr', text: 'Ở quê nhà, mẹ dặn đi dặn lại: tới nơi là phải nhắn tin ngay. Còn một người nữa cũng đang cầm điện thoại chờ… Nhưng trước mắt, phải sống sót những ngày đầu đã. Nghe nói anh Hùng "sẹo" — senpai cùng khu — hay đi dạo quanh đây. Ra đường xem sao!' }
    ]
  };

  window.DEMO_DATA = { combini: COMBINI, hung: HUNG, vending: VENDING, staff: STAFF, officer: OFFICER, station: STATION, intro: INTRO };
})();
