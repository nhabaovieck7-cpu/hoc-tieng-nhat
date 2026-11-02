(function () {
  'use strict';
  // scenes-k2.js — Chương 3, khối ngành K2: genba (công trường), khach-san (khách sạn),
  // shokuhin (nhà máy thực phẩm). Mỗi ngành: 1 kaiwa buổi đầu + 2 branch + 1 talk.
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

    // ================= GENBA — công trường ở Yokohama =================

    'ind-genba-1': {
      scene: '🏗️ Công trường 横浜 — buổi đầu: chào đội, KY活動 và câu hô ご安全に！',
      wrong: {
        0: ['{今日|きょう}からお{世話|せわ}になります。よろしくお{金|かね}ください。', '{私|わたし}は{安全|あんぜん}を{食|た}べます。よろしくお{願|ねが}いします。'],
        1: ['ヘルメットは{少|すこ}し{美味|おい}しいです。{大|おお}きいのを{飲|の}めますか。', '{私|わたし}の{頭|あたま}はヘルメットより{昨日|きのう}です。'],
        2: ['KYは{空気|くうき}を{読|よ}むことですか。{危険|きけん}を{食|た}べますか。', '{危険|きけん}な{場所|ばしょ}へ{先|さき}に{行|い}って{遊|あそ}びます。'],
        3: ['{分|わ}からないときは、{静|しず}かに{触|さわ}って{寝|ね}ます。', 'はい、{全部|ぜんぶ}{分|わ}かりますから{聞|き}きません。{大丈夫|だいじょうぶ}です。']
      },
      lines: [
        { sp: 'Sếp công trường', jp: 'おはようございます。{今日|きょう}から{一緒|いっしょ}に{働|はたら}く{仲間|なかま}です。まず{安全|あんぜん}、それから{仕事|しごと}ですよ。', vi: 'Chào buổi sáng. Từ hôm nay là đồng đội cùng làm với nhau đấy. Trước hết là an toàn, rồi mới tới công việc nhé.' },
        { sp: 'hero', jp: '{今日|きょう}からお{世話|せわ}になります。{安全|あんぜん}に{気|き}をつけて{頑張|がんば}りますので、よろしくお{願|ねが}いします。', vi: 'Từ hôm nay mong được mọi người giúp đỡ ạ. Em sẽ chú ý an toàn và cố gắng, mong được chỉ bảo ạ.' },
        { sp: 'Anh thợ cả', jp: 'じゃあ、まずヘルメットと{安全靴|あんぜんぐつ}を{渡|わた}すね。サイズが{合|あ}うか、かぶってみて。', vi: 'Vậy trước tiên anh đưa mũ bảo hộ và giày an toàn nhé. Thử đội xem có vừa size không.' },
        { sp: 'hero', jp: 'ありがとうございます。ヘルメットは{少|すこ}しきついです。もう{少|すこ}し{大|おお}きいのはありますか。', vi: 'Cảm ơn anh ạ. Mũ hơi chật ạ. Có cái nào to hơn một chút không ạ?' },
        { sp: 'Sếp công trường', jp: 'うん、{大|おお}きいのと{交換|こうかん}しよう。{朝礼|ちょうれい}ではKY{活動|かつどう}をするよ。KYは「{危険|きけん}を{予知|よち}する」という{意味|いみ}だ。', vi: 'Ừ, đổi sang cái to hơn nhé. Trong buổi điểm danh sáng mình làm KY活動 đấy. KY nghĩa là “dự đoán trước nguy hiểm”.' },
        { sp: 'hero', jp: 'KY{活動|かつどう}ですね。{危険|きけん}な{場所|ばしょ}を{先|さき}に{考|かんが}える、という{意味|いみ}ですか。', vi: 'KY活動 ạ. Nghĩa là nghĩ trước xem chỗ nào nguy hiểm, đúng không ạ?' },
        { sp: 'Hùng', jp: '{大丈夫|だいじょうぶ}、{最初|さいしょ}はみんなそうだよ。{分|わ}からないことは、{作業|さぎょう}の{前|まえ}に{聞|き}いてね。{始|はじ}まってからだと{危|あぶ}ないからさ。', vi: 'Không sao đâu, lúc đầu ai cũng vậy mà. Cái gì không hiểu thì hỏi trước khi bắt đầu làm nhé. Vào việc rồi mới hỏi thì nguy hiểm đấy.' },
        { sp: 'hero', jp: 'はい、{分|わ}からないときは、{必|かなら}ず{前|まえ}に{聞|き}きます。{勝手|かって}に{触|さわ}りません。', vi: 'Vâng, khi nào không hiểu em nhất định sẽ hỏi trước ạ. Em sẽ không tự ý đụng vào đâu ạ.' },
        { sp: 'Anh thợ cả', jp: 'その{心構|こころがま}えが{一番|いちばん}{大事|だいじ}だね。あと、{合図|あいず}や{報告|ほうこく}は{大|おお}きな{声|こえ}でね。', vi: 'Cái tâm thế đó là quan trọng nhất đấy. Với lại, hiệu lệnh và báo cáo thì phải hô to rõ nhé.' },
        { sp: 'Sếp công trường', jp: 'じゃあ、みんなで{指差|ゆびさ}し{確認|かくにん}だ。{足場|あしば}よし、{頭上|ずじょう}よし。', vi: 'Nào, cả đội cùng chỉ tay kiểm tra nào. Giàn giáo: ổn! Phía trên đầu: ổn!' },
        { sp: 'hero', jp: '{足場|あしば}よし、{頭上|ずじょう}よし。ご{安全|あんぜん}に！', vi: 'Giàn giáo: ổn! Phía trên đầu: ổn! Chúc mọi người an toàn ạ!' },
        { sp: 'Anh thợ cả', jp: 'いい{声|こえ}だ。その{調子|ちょうし}でいこう。', vi: 'Hô tốt lắm. Cứ giữ phong độ đó mà làm nhé.' }
      ],
      outro: 'Buổi sáng đầu tiên ở công trường 横浜, {name} đội chiếc mũ còn thơm mùi mới, hô vang 「ご安全に！」 cùng cả đội. Ở genba, câu chào không phải “chúc làm tốt” — mà là “chúc nhau trở về nguyên vẹn”. {call} nhớ kỹ điều đó trước cả cách cầm dụng cụ.'
    },

    'ind-genba-2': {
      scene: '☀️ Công trường 横浜 — trưa nắng gắt: say nắng và sợi cáp cẩu treo lơ lửng',
      branch: [
        { sp: 'narr', text: 'Trưa tháng bảy ở 横浜, nắng đổ lửa xuống mặt bê tông. Nhiệt độ ngoài trời chạm 35 độ, gió biển cũng nóng hầm hập. Giờ nghỉ vừa hết, cả đội quay lại việc. {name} đang bê thùng đinh thì thấy Hùng ở phía trước loạng choạng, mặt trắng bệch, tay ôm đầu.' },
        { sp: 'Hùng', jp: 'あれ…なんか{目|め}まいがする。{少|すこ}し{気持|きも}ち{悪|わる}いかも。', text: 'Hùng thều thào, giọng yếu hẳn: “Ơ… sao tự nhiên chóng mặt quá. Hơi buồn nôn nữa…” — Dấu hiệu say nắng 熱中症 (necchuushou) điển hình: chóng mặt, buồn nôn, mặt tái.' },
        { sp: 'narr', text: 'Đúng lúc đó, {name} ngẩng lên: trên cao, cần cẩu đang di chuyển một bó thép dài. Sợi cáp rung lắc, bó thép chao đảo — và nó đang treo lơ lửng ngay phía trên lối đi mà Hùng sắp bước vào. Gió vừa thốc lên một cơn nữa.' },
        {
          prompt: 'Bó thép đang đung đưa ngay trên đầu Hùng. Hùng thì đang choáng, không hề hay biết. {name} làm gì trong tích tắc này?',
          choice: [
            { label: 'Hét to đúng câu cảnh báo: 「危ない！止まって！頭上注意！」', fx: { jp: 3, hp: 1 }, note: 'Genba biến cố: hét cảnh báo đúng câu, đúng lúc', say: [
              { sp: 'narr', text: '{name} lấy hết hơi, hét vang cả một góc công trường: 「危ない！止まって！頭上注意！」 (Nguy hiểm! Dừng lại! Chú ý phía trên đầu!). Hùng giật mình khựng lại ngay mép lối đi. Anh thợ cả gần đó lập tức giơ tay ra hiệu dừng cẩu. Bó thép từ từ được hạ xuống khu vực trống, cách chỗ Hùng đứng chưa đầy hai mét.' },
              { sp: 'Anh thợ cả', jp: 'よく{叫|さけ}んだ。その{一言|ひとこと}で{助|たす}かったよ。', text: 'Anh thợ cả chạy tới, vỗ mạnh vào vai {name}: “Hét tốt lắm. Chỉ một câu đó thôi là cứu được người rồi đấy.”' }
            ] },
            { label: 'Lao vào kéo Hùng ra khỏi lối đi', fx: { hp: -3, love: 2, pressure: 1 }, note: 'Genba biến cố: lao vào kéo người — cứu được người nhưng tự đặt mình vào nguy hiểm', say: [
              { sp: 'narr', text: 'Không kịp nghĩ, {name} lao thẳng vào lối đi, túm áo kéo Hùng ngã nhào ra ngoài. Bó thép sượt qua, hạ xuống đúng chỗ hai người vừa đứng. Hùng thoát nạn — nhưng tim {name} đập thình thịch: nếu bó thép rơi sớm nửa giây, người nằm dưới đó đã là cả hai.' },
              { sp: 'Sếp công trường', jp: '{人|ひと}を{助|たす}けたい{気持|きも}ちは{分|わ}かる。でも、{吊|つ}り{荷|に}の{下|した}に{入|はい}るのは{絶対|ぜったい}にだめだ。まず{声|こえ}だ、{声|こえ}。', text: 'Sếp công trường nghiêm mặt, giọng trầm hẳn: “Muốn cứu người thì anh hiểu. Nhưng chui xuống dưới vật đang treo là tuyệt đối cấm. Trước hết phải là tiếng hét, là tiếng hét đấy.” — Mắng thì mắng, nhưng sếp cúi đầu cảm ơn {name} ngay sau đó, rất công bằng.' }
            ] },
            { label: 'Đứng im — chắc người điều khiển cẩu sẽ tự xử lý', fx: { pressure: 3, risk: 2 }, note: 'Genba biến cố: đứng im khi thấy nguy hiểm', say: [
              { sp: 'narr', text: '{name} sững người, tay chân như bị chôn xuống đất. May thay, anh thợ cả phía bên kia cũng nhìn thấy, hét lên và ra hiệu dừng cẩu kịp lúc. Bó thép được hạ xuống an toàn, Hùng được dìu ra khỏi lối đi. Không ai bị thương — nhưng ánh mắt cả đội nhìn {name} sau đó khiến {call} chỉ muốn độn thổ: ở công trường, nhìn thấy nguy hiểm mà im lặng cũng là một lỗi.' },
              { sp: 'Sếp công trường', jp: '{見|み}て{見|み}ぬふりが、{一番|いちばん}の{事故|じこ}のもとだ。{次|つぎ}は{声|こえ}を{出|だ}せ。', text: 'Sếp nói chậm rãi mà nặng: “Thấy mà làm ngơ là mầm mống lớn nhất của tai nạn. Lần sau, phải cất tiếng lên.”' }
            ] }
          ]
        },
        { sp: 'Sếp công trường', jp: 'クレーン{作業|さぎょう}は{一旦|いったん}{中止|ちゅうし}。{全員|ぜんいん}、{日陰|ひかげ}に{集|あつ}まれ。{水分|すいぶん}を{取|と}れ。', text: 'Sếp ra lệnh dứt khoát: “Tạm dừng việc cẩu. Tất cả tập trung vào chỗ râm. Uống nước ngay.” — Cả đội lập tức tuân lệnh, không ai bàn ra tán vào.' },
        { sp: 'narr', text: 'Hùng được dìu vào lán nghỉ có quạt, nới lỏng cổ áo. Mặt Hùng vẫn tái, mồ hôi túa ra nhưng người thì lạnh. Mọi người nhìn {name} — người đứng gần Hùng nhất lúc này.' },
        {
          prompt: 'Hùng có dấu hiệu say nắng. {name} xử lý thế nào trong lúc chờ sếp quyết định?',
          choice: [
            { label: 'Cho Hùng nằm chỗ mát, chườm lạnh cổ và nách, cho uống nước điện giải từng ngụm nhỏ', fx: { jp: 2, hp: 2 }, note: 'Genba biến cố: sơ cứu say nắng đúng cách', say: [
              { sp: 'narr', text: '{name} làm đúng bài đã học ở buổi tập huấn: đưa Hùng nằm chỗ mát nhất, lấy khăn ướt chườm cổ, nách và bẹn — những chỗ có mạch máu lớn — rồi cho uống nước điện giải từng ngụm nhỏ. Mười phút sau, sắc mặt Hùng hồng hào trở lại, mở mắt cười yếu: “Tưởng đâu gục luôn rồi…”' },
              { sp: 'Hùng', jp: 'ありがとう。{少|すこ}し{落|お}ち{着|つ}いたよ。{頭|あたま}も{軽|かる}くなった。', text: 'Hùng nắm nhẹ cổ tay {name}: “Cảm ơn nhé. Đỡ hơn nhiều rồi. Đầu cũng nhẹ hẳn.”' }
            ] },
            { label: 'Hùng nói “không sao”, để Hùng đứng dậy làm tiếp cho kịp tiến độ', fx: { hp: -3, pressure: 2 }, note: 'Genba biến cố: để người say nắng làm tiếp', say: [
              { sp: 'narr', text: 'Hùng gượng đứng dậy, miệng nói không sao — nhưng mới đi được ba bước đã khuỵu xuống, may mà anh thợ cả đỡ kịp. Cả lán nhốn nháo. Sếp công trường quát lên một tiếng khiến ai cũng im bặt, rồi tự tay dìu Hùng vào chỗ mát.' },
              { sp: 'Sếp công trường', jp: '「{大丈夫|だいじょうぶ}」は{本人|ほんにん}が{言|い}うな。{周|まわ}りが{判断|はんだん}するんだ。{熱中症|ねっちゅうしょう}は{甘|あま}く{見|み}るな。', text: 'Sếp gắt: “Câu ‘tôi không sao’ thì đừng để người bệnh tự nói. Người xung quanh phải là người phán đoán. Đừng có coi thường say nắng.” — Bài học này {name} nhớ đến tận xương.' }
            ] }
          ]
        },
        { sp: 'Sếp công trường', jp: '{午後|ごご}の{作業|さぎょう}は{日陰|ひかげ}の{多|おお}い{場所|ばしょ}に{変更|へんこう}する。{具合|ぐあい}が{悪|わる}いと{感|かん}じたら、{我慢|がまん}せず{言|い}え。', text: 'Sếp thông báo: “Việc buổi chiều chuyển sang khu vực nhiều bóng râm. Ai thấy trong người không ổn thì đừng cố chịu, phải nói ngay.”' },
        { sp: 'narr', text: 'Chiều hôm đó, tiến độ chậm lại một chút nhưng không một ai phàn nàn. Hùng được cho về sớm nghỉ ngơi, trước khi về còn quay lại cảm ơn cả đội. Sự cố “suýt nữa” được cả công trường nhắc đến trong buổi họp cuối ngày như một bài học chung.' },
        { sp: 'Sếp công trường', jp: '{吊|つ}り{荷|に}の{下|した}には、{絶対|ぜったい}に{入|はい}らない。{荷|に}が{揺|ゆ}れたら、まず{止|と}まる、{離|はな}れる、{声|こえ}を{出|だ}す。', text: 'Sếp nhắc lại nguyên tắc sống còn: “Dưới vật đang treo thì tuyệt đối không được vào. Thấy vật đung đưa thì trước hết: dừng lại, tránh xa, cất tiếng cảnh báo.”' },
        { sp: 'Anh thợ cả', jp: 'あとはさ、{暑|あつ}い{日|ひ}は{塩飴|しおあめ}な。ポケットに{入|い}れとくと{違|ちが}うよ。', text: 'Anh thợ cả dúi vào tay {name} mấy viên kẹo muối: “Mà này, ngày nóng thì thủ sẵn kẹo muối nhé. Bỏ túi vài viên là khác hẳn đấy.” — Kinh nghiệm của người mười năm lăn lộn dưới nắng, không sách nào ghi.' },
        {
          prompt: 'Cuối ngày, sếp phát tờ ghi chép KY để mọi người tự ghi “điều suýt xảy ra hôm nay”. {name} ghi thế nào?',
          choice: [
            { label: 'Ghi thành thật toàn bộ sự việc, kể cả phần mình còn lúng túng', fx: { jp: 2, pressure: -1 }, note: 'Genba biến cố: ghi chép sự cố thành thật', say: [
              { sp: 'narr', text: '{name} ghi hết, không giấu một chữ: bó thép đung đưa, Hùng say nắng, và cả khoảnh khắc mình chần chừ. Sếp đọc xong, gật đầu: “Ghi được như vậy thì lần sau sẽ không lặp lại. Sự cố suýt xảy ra — ヒヤリハット — là tài sản của cả đội, không phải lỗi của một người.”' }
            ] },
            { label: 'Ghi qua loa vài dòng cho xong, sợ bị để ý', fx: { pressure: 2 }, note: 'Genba biến cố: ghi chép sự cố qua loa', say: [
              { sp: 'narr', text: '{name} chỉ ghi vỏn vẹn “hôm nay hơi nắng, cần chú ý”. Sếp đọc lướt qua, nhíu mày nhưng không nói gì thêm, chỉ gõ nhẹ cây bút lên tờ giấy. Tối về, {name} cứ thấy cấn trong lòng: một bài học lớn như vậy mà ghi qua loa, chẳng khác nào tự tước của mình cơ hội nhớ nó cho kỹ.' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Trên đường về, hoàng hôn đỏ rực phía vịnh 横浜. Ngày hôm nay dài hơn mọi ngày — {name} học được rằng ở công trường, phản xạ và tiếng nói của mình có thể là ranh giới giữa một ngày bình thường và một tai nạn không thể quay lại.' },
        { sp: 'Sếp công trường', jp: 'じゃあ、{今日|きょう}はここまで。{明日|あした}も、ご{安全|あんぜん}に。', text: 'Sếp khép cuốn sổ, nhìn cả đội: “Thôi, hôm nay đến đây. Ngày mai cũng vậy nhé — chúc mọi người an toàn.”' }
      ],
      outro: 'Đêm đó {name} nằm nghĩ mãi về ba chữ sếp dặn: 止まる・離れる・声を出す — dừng lại, tránh xa, cất tiếng. Công trường dạy {call} rằng dũng cảm không phải là lao vào, mà là phản ứng đúng trong đúng một giây cần thiết.'
    },

    'ind-genba-3': {
      scene: '📐 Công trường 横浜 — sau một tháng: đọc bản vẽ và hô điểm danh thay đội',
      branch: [
        { sp: 'narr', text: 'Một tháng trôi qua nhanh như một cái chớp mắt. {name} giờ đã thuộc lòng đường đi trong công trường, biết tên từng người trong đội, và không còn giật mình mỗi khi tiếng cẩu kêu nữa. Sáng nay, sếp công trường gọi {name} lại bàn làm việc trong lán chỉ huy.' },
        { sp: 'Sếp công trường', jp: '{今日|きょう}から、{簡単|かんたん}な{図面|ずめん}を{読|よ}んでみよう。まずこの{数字|すうじ}、{何|なん}ミリか{分|わ}かるか。', text: 'Sếp trải tấm bản vẽ ra bàn: “Từ hôm nay, thử đọc bản vẽ đơn giản nhé. Trước hết, con số này là bao nhiêu milimét, có đọc được không?”' },
        { sp: 'Anh thợ cả', jp: '{図面|ずめん}はさ、{記号|きごう}を{覚|おぼ}えれば{半分|はんぶん}{読|よ}めたも{同然|どうぜん}だよ。{焦|あせ}らなくていい。', text: 'Anh thợ cả ghé vào chỉ tay: “Bản vẽ ấy mà, thuộc được các ký hiệu là coi như đọc được một nửa rồi. Cứ từ từ, không phải vội.”' },
        { sp: 'narr', text: '{name} cúi sát bản vẽ: những đường thẳng, con số và ký hiệu từng trông như mê cung giờ dần có nghĩa. Chỗ này là cột, chỗ kia là khoảng cách giữa hai điểm neo. Sếp khoanh tròn một ký hiệu lạ ở góc bản vẽ và nhìn {name}.' },
        {
          prompt: 'Có một ký hiệu trên bản vẽ mà {name} chưa từng thấy. Xử lý sao đây?',
          choice: [
            { label: 'Hỏi ngay sếp và anh thợ cả trước khi chạm vào việc', fx: { jp: 3 }, note: 'Genba tay nghề: không hiểu thì hỏi trước khi làm', say: [
              { sp: 'narr', text: '{name} chỉ vào ký hiệu, hỏi thẳng. Sếp gật đầu hài lòng rồi giải thích: đó là ký hiệu điểm dừng kiểm tra — tới bước đó phải gọi người có trách nhiệm tới xác nhận mới được làm tiếp. “Tốt. Không biết mà hỏi là giỏi. Không biết mà đoán mới là tai nạn.” Câu nói của sếp làm cả lán cười, còn {name} thì ghi ngay vào sổ tay.' }
            ] },
            { label: 'Đoán theo cảm tính rồi làm luôn cho nhanh', fx: { risk: 2, pressure: 2 }, note: 'Genba tay nghề: đoán ký hiệu bản vẽ', say: [
              { sp: 'narr', text: '{name} đoán ký hiệu đó là “làm tiếp” và bắt tay vào việc. Mười phút sau anh thợ cả đi qua, huýt sáo một tiếng rồi khoát tay dừng lại: đó là điểm phải chờ kiểm tra mới được qua. May mà chưa có gì hỏng — chỉ phải tháo ra làm lại từ đầu, giữa cái nắng ban trưa.' },
              { sp: 'Anh thợ cả', jp: '{図面|ずめん}の{分|わ}からない{記号|きごう}は、{占|うらな}いじゃないんだから、{聞|き}いてくれよな。', text: 'Anh thợ cả nửa đùa nửa thật: “Ký hiệu không hiểu trên bản vẽ thì phải hỏi chứ, có phải bói toán đâu mà đoán.”' }
            ] }
          ]
        },
        { sp: 'Sếp công trường', jp: 'うん、{読|よ}めている。{寸法|すんぽう}も{合|あ}っているよ。', text: 'Sếp kiểm tra phần {name} vừa đọc, gật đầu: “Ừ, đọc được rồi đấy. Kích thước cũng khớp.”' },
        { sp: 'narr', text: 'Chưa kịp mừng xong, sếp đã đưa cho {name} cuốn sổ điểm danh an toàn của buổi sáng hôm sau và nói một câu khiến {name} đứng hình mất hai giây: mai, {name} sẽ là người hô điểm danh an toàn thay cho cả đội.' },
        {
          prompt: 'Sáng hôm sau, đứng trước cả đội gần hai mươi người, {name} hô điểm danh an toàn như thế nào?',
          choice: [
            { label: 'Hô to, rõ, từng mục một, chờ cả đội đáp lại mới sang mục tiếp', fx: { jp: 3, love: 2 }, note: 'Genba tay nghề: hô điểm danh an toàn thay đội, được cả đội hưởng ứng', say: [
              { sp: 'narr', text: 'Giọng {name} vang lên giữa sân công trường buổi sớm: từng mục một — mũ, giày, dây an toàn, sức khoẻ — hô tới đâu, cả đội đáp “よし！” tới đó, rền vang. Hô xong, mấy anh thợ vỗ tay rần rần. Hùng huýt sáo: “Oách chưa kìa!”' },
              { sp: 'Hùng', jp: 'すげえ、もう{一人前|いちにんまえ}じゃん。{最初|さいしょ}の{日|ひ}の{人|ひと}とは{別人|べつじん}だよ。', text: 'Hùng cười toe: “Ghê chưa, giờ ra dáng thợ lành nghề rồi đấy. Khác hẳn con người của ngày đầu tiên luôn.”' }
            ] },
            { label: 'Hô lí nhí cho nhanh, đọc một mạch hết cho xong', fx: { pressure: 2 }, note: 'Genba tay nghề: hô điểm danh qua loa', say: [
              { sp: 'narr', text: '{name} đọc một mạch như trả bài, giọng nhỏ dần về cuối. Sếp giơ tay ra hiệu dừng, bước lên đứng cạnh: “Điểm danh không phải thủ tục. Là lúc mỗi người tự kiểm lại mình. Làm lại nào, anh hô cùng.” Hai người cùng hô lại từ đầu, lần này cả đội đáp vang dội. {name} đỏ mặt — nhưng thuộc bài.' }
            ] }
          ]
        },
        { sp: 'Hùng', jp: 'ご{安全|あんぜん}に！…って、{俺|おれ}たちより{様|さま}になってるよ。', text: 'Hùng hô theo câu kết rồi quay sang trêu: “‘Chúc an toàn!’… nghe còn điệu nghệ hơn cả bọn này ấy chứ.”' },
        { sp: 'Anh thợ cả', jp: '{一|いち}か{月|げつ}でここまでくれば、{上出来|じょうでき}だよ。{本当|ほんとう}にさ。', text: 'Anh thợ cả gật gù, hiếm khi khen ai mà khen thật lòng: “Một tháng mà được đến mức này là quá đạt rồi. Thật đấy.”' },
        { sp: 'Sếp công trường', jp: '{来月|らいげつ}から、{朝|あさ}の{点呼|てんこ}は{任|まか}せる。{頼|たの}んだぞ。', text: 'Sếp chốt lại bằng một câu ngắn gọn: “Từ tháng sau, điểm danh buổi sáng giao cho em đấy. Trông cậy vào em.” — Ở công trường, được giao việc hô an toàn nghĩa là được tin như một thành viên thực thụ.' },
        { sp: 'narr', text: 'Chiều tan ca, cả đội rôm rả bàn chuyện cuối tuần đi ăn cùng nhau — một quán thịt nướng bình dân gần ga, chia đều, ai cũng có phần. Anh thợ cả quay sang {name}: “Đi nhé, tân binh được công nhận thì phải khao một chầu chứ — đùa thôi, đội trả!”' },
        {
          prompt: 'Cả đội rủ đi ăn thịt nướng sau giờ làm (phần của {name} khoảng 2.000 yên nếu chia đều). {name} quyết định sao?',
          choice: [
            { label: 'Đi cùng cả đội — buổi ăn đầu tiên với tư cách thành viên chính thức', fx: { money: -0.2, love: 3 }, note: 'Genba tay nghề: đi ăn cùng đội công trường', say: [
              { sp: 'narr', text: 'Quán thịt nướng khói bay mù mịt, tiếng xèo xèo trên vỉ và tiếng cười nói át cả tiếng tàu chạy qua. Sếp công trường — người nghiêm nhất công trường — gắp cho {name} miếng thịt đầu tiên: “Ăn đi, tháng này vất vả rồi.” Ngồi giữa những con người rám nắng và tốt bụng này, {name} thấy công trường không còn là nơi xa lạ nữa. Nó là một đội. Và {call} ở trong đội đó.' }
            ] },
            { label: 'Cảm ơn và xin hẹn dịp khác — hôm nay muốn về nghỉ sớm', fx: { hp: 3 }, note: 'Genba tay nghề: từ chối khéo buổi ăn của đội', say: [
              { sp: 'narr', text: '{name} cảm ơn cả đội và hẹn lần sau chắc chắn sẽ đi. Không ai giận, anh thợ cả còn dúi theo hộp cơm: “Vậy cầm cái này về ăn, đừng bỏ bữa.” Về tới phòng, {name} mở hộp cơm ra ăn chậm rãi, lòng ấm lạ — hoá ra được một đội quý mến là cảm giác như thế này.' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Tối đó, {name} lật lại cuốn sổ tay: trang đầu tiên là dòng chữ nguệch ngoạc “ご安全に！” ghi trong ngày đầu bỡ ngỡ. Trang hôm nay là một bản vẽ đã đọc được và một dòng chữ mới: “được giao điểm danh”. Một tháng ở công trường, đổi lại là một vị trí thật sự trong lòng một tập thể.' }
      ],
      outro: 'Từ cậu/cô tân binh đội mũ còn chật đến người được cả đội tin tưởng giao hô điểm danh — {name} đã đi một chặng đường không dài mà rất thật. Công trường 横浜 khắc nghiệt, nhưng tình đồng đội ở đó thì ấm như nắng sớm sau cơn mưa.'
    },

    'talk-genba': {
      scene: '🍱 Công trường 横浜 — giờ nghỉ trưa: cơm hộp, kẹo muối và chuyện cuối tuần',
      wrong: {
        0: ['{今日|きょう}の{弁当|べんとう}は{美味|おい}しいです。{特|とく}に{唐揚|からあ}げが{昨日|きのう}です。', '{弁当|べんとう}を{食|た}べると、{午後|ごご}は{海|うみ}で{泳|およ}げます。'],
        1: ['{週末|しゅうまつ}は{部屋|へや}で{寝|ね}て、コンビニへ{泳|およ}ぎます。', '{週末|しゅうまつ}は{掃除|そうじ}を{食|た}べて、{海|うみ}で{寝|ね}ます。']
      },
      lines: [
        { sp: 'Hùng', jp: 'おー、{昼|ひる}だ{昼|ひる}だ。{今日|きょう}はコンビニの{唐揚|からあ}げ{弁当|べんとう}にしたよ。{当|あ}たりかも。', vi: 'Ô, trưa rồi trưa rồi. Hôm nay tớ chọn cơm hộp gà chiên ở combini đấy. Có khi lại trúng món ngon.' },
        { sp: 'hero', jp: '{私|わたし}も{同|おな}じ{弁当|べんとう}です。{美味|おい}しいですね。{午後|ごご}も{頑張|がんば}れそうです。', vi: 'Em cũng mua đúng hộp cơm đó ạ. Ngon thật đấy ạ. Ăn xong thế này thì buổi chiều lại có sức cố gắng tiếp.' },
        { sp: 'Anh thợ cả', jp: '{食|た}べたら{少|すこ}し{横|よこ}になれよ。{昼寝|ひるね}は{午後|ごご}の{安全|あんぜん}にもつながるからな。', vi: 'Ăn xong thì ngả lưng một chút đi. Ngủ trưa có liên quan tới an toàn buổi chiều đấy nhé.' },
        { sp: 'hero', jp: '{週末|しゅうまつ}は{何|なに}をしますか。{私|わたし}は{部屋|へや}の{掃除|そうじ}をして、ゆっくり{休|やす}みたいです。', vi: 'Cuối tuần anh làm gì ạ? Em định dọn phòng rồi nghỉ ngơi thong thả ạ.' },
        { sp: 'Hùng', jp: '{俺|おれ}は{海|うみ}の{近|ちか}くを{走|はし}るよ。{横浜|よこはま}の{朝|あさ}の{海|うみ}、けっこういいんだぜ。', vi: 'Tớ thì chạy bộ gần biển. Biển 横浜 buổi sáng đẹp ra phết đấy.' },
        { sp: 'hero', jp: 'いいですね。{今度|こんど}、{私|わたし}も{一緒|いっしょ}に{行|い}きたいです。', vi: 'Hay quá ạ. Lần sau cho em đi cùng với nhé ạ.' },
        { sp: 'Anh thợ cả', jp: 'よし、{決|き}まりだな。でも{月曜|げつよう}の{朝|あさ}は{寝坊|ねぼう}するなよ。', vi: 'Rồi, chốt vậy nhé. Nhưng sáng thứ hai thì đừng có ngủ quên đấy.' }
      ],
      outro: 'Giờ nghỉ trưa ngắn ngủi giữa công trường ồn ào hoá ra là khoảng lặng quý giá nhất ngày: một hộp cơm, mấy câu chuyện phiếm, và cảm giác mình thuộc về một đội. {name} gấp vỏ hộp cơm lại, đội mũ lên — buổi chiều lại bắt đầu bằng câu hô quen thuộc.'
    },

    // ================= KHACH-SAN — khách sạn ở Odaiba =================

    'ind-khach-san-1': {
      scene: '🛎️ Khách sạn お台場 — buổi đầu ở quầy lễ tân: check-in bằng keigo chuẩn',
      wrong: {
        0: ['よろしくお{願|ねが}いします。{私|わたし}はフロントを{食|た}べます。', 'お{客様|きゃくさま}のことは{全部|ぜんぶ}{私|わたし}に{寝|ね}かせてください。'],
        1: ['ご{予約|よやく}の{名前|なまえ}を{食|た}べてもいいですか。', 'すみません、{名前|なまえ}は{昨日|きのう}ですか。'],
        2: ['{禁煙|きんえん}のお{部屋|へや}、{一泊|いっぱく}ですね。{私|わたし}が{部屋|へや}に{住|す}みます。', 'お{部屋|へや}は{禁煙|きんえん}で、{朝|あさ}ごはんは{泳|およ}げます。'],
        3: ['こちらがカードキーです。エレベーターで{寝|ね}てください。', 'カードキーをどうぞ。{部屋|へや}は{海|うみ}の{中|なか}の{六階|ろっかい}です。']
      },
      lines: [
        { sp: 'Chị senpai khách sạn', jp: '{今日|きょう}からフロントですね。まずは{笑顔|えがお}と、ていねいな{言葉|ことば}。それがホテルの{入口|いりぐち}ですよ。', vi: 'Từ hôm nay em ở quầy lễ tân nhé. Trước hết là nụ cười và lời nói lịch sự. Đó chính là “cửa ngõ” của khách sạn đấy.' },
        { sp: 'hero', jp: 'よろしくお{願|ねが}いいたします。フロントの{仕事|しごと}、{一生懸命|いっしょうけんめい}{覚|おぼ}えます。', vi: 'Mong được chị chỉ bảo ạ. Em sẽ cố gắng hết sức học việc ở quầy lễ tân ạ.' },
        { sp: 'Chị khách', jp: 'すみません、チェックインをお{願|ねが}いしたいのですが。{予約|よやく}をしています。', vi: 'Xin lỗi, tôi muốn làm thủ tục nhận phòng ạ. Tôi đã có đặt phòng trước.' },
        { sp: 'hero', jp: 'いらっしゃいませ。かしこまりました。ご{予約|よやく}の{お名前|なまえ}をお{聞|き}かせいただけますか。', vi: 'Xin kính chào quý khách ạ. Vâng, tôi đã rõ ạ. Xin quý khách cho tôi biết tên đã dùng để đặt phòng ạ.' },
        { sp: 'Chị khách', jp: 'たなかです。{今日|きょう}から{一泊|いっぱく}で、{禁煙|きんえん}のお{部屋|へや}を{予約|よやく}しました。', vi: 'Tôi là Tanaka ạ. Tôi đặt một phòng cấm hút thuốc, ở một đêm từ hôm nay ạ.' },
        { sp: 'hero', jp: 'たなか{様|さま}、ありがとうございます。{禁煙|きんえん}のお{部屋|へや}、{一泊|いっぱく}でございますね。{少々|しょうしょう}お{待|ま}ちくださいませ。', vi: 'Thưa bà Tanaka, cảm ơn quý khách ạ. Phòng cấm hút thuốc, một đêm, đúng không ạ. Xin quý khách vui lòng chờ một chút ạ.' },
        { sp: 'Chị khách', jp: 'ありがとう。あの、{朝食|ちょうしょく}は{何時|なんじ}からですか。', vi: 'Cảm ơn anh/chị. À, bữa sáng bắt đầu từ mấy giờ vậy ạ?' },
        { sp: 'hero', jp: '{朝食|ちょうしょく}は{朝|あさ}{六時半|ろくじはん}から{九時半|くじはん}まで、{一階|いっかい}のレストランでございます。', vi: 'Bữa sáng từ 6 giờ rưỡi đến 9 giờ rưỡi sáng, tại nhà hàng ở tầng một ạ.' },
        { sp: 'Chị senpai khách sạn', jp: 'エレベーターはロビーの{奥|おく}にございます。お{荷物|にもつ}はお{持ち|も}ちいたしましょうか。', vi: 'Thang máy ở phía trong sảnh ạ. Quý khách có muốn chúng tôi mang hành lý lên giúp không ạ?' },
        { sp: 'hero', jp: 'こちらがカードキーでございます。お{部屋|へや}は{六階|ろっかい}の{六|ろく}{〇|ぜろ}{二|に}{号室|ごうしつ}でございます。', vi: 'Đây là thẻ phòng của quý khách ạ. Phòng của quý khách là phòng 602 ở tầng sáu ạ.' },
        { sp: 'Chị khách', jp: 'どうもありがとう。とてもていねいですね。', vi: 'Cảm ơn nhiều ạ. Các bạn chu đáo thật đấy.' },
        { sp: 'hero', jp: 'ありがとうございます。ご{不明|ふめい}な{点|てん}がございましたら、いつでもフロントまでお{声|こえ}がけください。よいご{滞在|たいざい}を。', vi: 'Cảm ơn quý khách ạ. Nếu có điều gì chưa rõ, xin cứ gọi xuống quầy lễ tân bất cứ lúc nào ạ. Chúc quý khách có kỳ nghỉ dễ chịu ạ.' },
        { sp: 'Chị senpai khách sạn', jp: '{初|はじ}めてとは{思|おも}えないくらい、{落|お}ち{着|つ}いていましたよ。その{調子|ちょうし}です。', vi: 'Trông em bình tĩnh đến mức không nghĩ là lần đầu đâu đấy. Cứ giữ phong độ đó nhé.' }
      ],
      outro: 'Khách lên phòng, sảnh lại yên tĩnh. {name} nhìn xuống đôi tay mình — vẫn còn hơi run sau ca check-in đầu tiên, nhưng câu keigo nào cũng đã ra đúng chỗ. Ở quầy lễ tân, sự chu đáo không nằm ở việc nói hay, mà ở việc khách cảm thấy được đón tiếp thật lòng.'
    },

    'ind-khach-san-2': {
      scene: '🙇 Khách sạn お台場 — biến cố: phòng có mùi thuốc lá và nghệ thuật xin lỗi 謝罪',
      branch: [
        { sp: 'narr', text: 'Ca chiều ở sảnh khách sạn お台場. Một vị khách nữ vừa nhận phòng được mười phút đã quay xuống quầy, tay cầm thẻ phòng, gương mặt mệt và khó chịu thấy rõ. Chị senpai ra hiệu cho {name}: lần này, {call} sẽ là người tiếp nhận phàn nàn.' },
        { sp: 'Chị khách', jp: '{禁煙|きんえん}の{部屋|へや}を{予約|よやく}したのに、タバコのにおいがするんです。{窓|まど}を{開|あ}けても、{全然|ぜんぜん}{消|き}えなくて。', text: 'Chị khách nói, cố giữ bình tĩnh nhưng giọng run lên: “Tôi đã đặt phòng cấm hút thuốc, vậy mà trong phòng toàn mùi thuốc lá. Mở cửa sổ ra rồi cũng không hết mùi chút nào.”' },
        { sp: 'narr', text: 'Tấm xác nhận đặt phòng trên tay khách ghi rõ ràng: 禁煙 — cấm hút thuốc. Đây là lỗi của khách sạn, không thể chối cãi. Khách đi cả một chặng đường dài, về phòng đầu tiên lại gặp phải chuyện này. Cả sảnh như lặng đi một nhịp.' },
        { sp: 'Chị senpai khách sạn', jp: 'まず{謝|あやま}ること。{言|い}い{訳|わけ}はその{後|あと}。{順番|じゅんばん}を{間違|まちが}えないで。', text: 'Chị senpai nói rất khẽ, chỉ đủ cho {name} nghe: “Trước hết là xin lỗi. Giải thích để sau. Đừng nhầm thứ tự.” — Bài học đầu tiên của 謝罪 (shazai — nghệ thuật xin lỗi của người Nhật).' },
        {
          prompt: 'Khách đang đứng trước mặt, mệt và bực. {name} mở lời và xử lý thế nào?',
          choice: [
            { label: 'Cúi đầu xin lỗi thật lòng, đề xuất đổi ngay sang phòng khác và tặng voucher bữa sáng', fx: { jp: 3, love: 2, money: -0.05 }, note: 'Khách sạn biến cố: xin lỗi + đổi phòng + voucher', say: [
              { sp: 'narr', text: '{name} cúi đầu thật sâu, trước hết nhận lỗi trọn vẹn: khách đã đặt phòng cấm hút mà khách sạn lại để xảy ra chuyện này, thành thật xin lỗi. Rồi {call} đề xuất ngay phương án cụ thể: đổi sang phòng cấm hút ở tầng khác đã kiểm tra kỹ, nhân viên sẽ mang hành lý lên giúp, và khách sạn xin gửi tặng voucher bữa sáng như một lời xin lỗi nhỏ.' },
              { sp: 'Chị khách', jp: '…そこまでしてくれるなら、{部屋|へや}を{変|か}えてください。においさえなければ、いいんです。', text: 'Chị khách lặng đi một chút, giọng đã mềm xuống: “…Nếu các bạn xử lý đến mức đó thì, cho tôi đổi phòng nhé. Chỉ cần không còn mùi là được rồi.”' }
            ] },
            { label: 'Chỉ xin lỗi liên tục và hứa sẽ “lưu ý lần sau”, chưa đưa phương án gì', fx: { pressure: 2 }, note: 'Khách sạn biến cố: chỉ xin lỗi suông', say: [
              { sp: 'narr', text: '{name} cúi đầu nói “thành thật xin lỗi” đến lần thứ ba, nhưng ngoài câu xin lỗi ra không có một phương án nào được đưa ra. Vai khách nữ chùng xuống thấy rõ: điều khách cần không phải thêm một lời xin lỗi nữa, mà là một căn phòng không có mùi thuốc để được nghỉ ngơi.' },
              { sp: 'Chị khách', jp: 'あの、{謝|あやま}ってほしいんじゃなくて、どうにかしてほしいんです。', text: 'Chị khách nói thẳng, mệt mỏi: “Tôi không cần các bạn xin lỗi thêm đâu, tôi cần các bạn xử lý việc này cơ.”' }
            ] },
            { label: 'Giải thích rằng đó là lỗi của bộ phận buồng phòng, không phải lỗi quầy lễ tân', fx: { pressure: 3, risk: 1 }, note: 'Khách sạn biến cố: đổ lỗi cho bộ phận khác', say: [
              { sp: 'narr', text: 'Câu “đây là lỗi của bộ phận buồng phòng” vừa thoát ra, nét mặt khách nữ sầm lại. Với khách, khách sạn là một — ai trực tiếp làm sai không quan trọng bằng việc không ai chịu đứng ra nhận trách nhiệm. Chị senpai đứng bên khẽ hắng giọng, một tín hiệu cảnh báo rất rõ.' },
              { sp: 'Chị senpai khách sạn', jp: 'お{客様|きゃくさま}の{前|まえ}で、{他|ほか}の{部署|ぶしょ}のせいにしてはいけません。ホテルは{一|ひと}つですよ。', text: 'Chị senpai nhẹ nhàng mà nghiêm khắc: “Trước mặt khách, không được đổ lỗi cho bộ phận khác. Khách sạn là một thể thống nhất.”' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Dù theo cách nào, cuối cùng một phòng cấm hút khác cũng được chuẩn bị: chị quản lý yêu cầu kiểm tra phòng mới thật kỹ trước khi mời khách lên — mở cửa, kiểm tra mùi, kiểm tra khăn và nước uống. “Đừng để khách phải phàn nàn đến lần thứ hai về cùng một chuyện.”' },
        { sp: 'Chị quản lý', jp: '{状況|じょうきょう}を{教|おし}えてください。お{客様|きゃくさま}には、どう{対応|たいおう}しましたか。', text: 'Chị quản lý tới quầy, giọng điềm tĩnh: “Cho chị biết tình hình đi. Em đã xử lý với khách như thế nào rồi?”' },
        {
          prompt: 'Chị quản lý hỏi tình hình. {name} báo cáo thế nào?',
          choice: [
            { label: 'Báo cáo đầy đủ và đúng sự thật: lỗi ở khâu nào, mình đã xử lý ra sao, còn thiếu gì', fx: { jp: 2, pressure: -1 }, note: 'Khách sạn biến cố: báo cáo quản lý trung thực, đầy đủ', say: [
              { sp: 'narr', text: '{name} báo cáo rành mạch từng ý: phòng được xếp sai loại, khách đã được xin lỗi và đổi phòng, voucher đã được đề xuất, phòng mới đã kiểm tra xong. Chị quản lý gật đầu, ghi chép lại: “Báo cáo như vậy là được. Có sự cố không đáng sợ — đáng sợ là giấu sự cố.”' }
            ] },
            { label: 'Báo cáo vắn tắt cho qua chuyện, né phần xử lý chưa tốt của mình', fx: { pressure: 2, risk: 1 }, note: 'Khách sạn biến cố: báo cáo né tránh với quản lý', say: [
              { sp: 'narr', text: '{name} chỉ nói “đã đổi phòng cho khách rồi ạ” và lướt nhanh qua phần còn lại. Chị quản lý nhìn lên từ cuốn sổ, hỏi lại đúng hai câu — và cả hai câu đều chạm vào phần {call} vừa né. Báo cáo nửa vời không giấu được ai lâu, nó chỉ làm người nghe phải hỏi thêm và mất niềm tin thêm.' }
            ] }
          ]
        },
        { sp: 'Chị quản lý', jp: '{謝罪|しゃざい}で{大切|たいせつ}なのは、{言|い}い{訳|わけ}より{先|さき}に、{相手|あいて}の{気持|きも}ちを{受|う}け{止|と}めることです。', text: 'Chị quản lý nói chậm rãi: “Điều quan trọng nhất khi xin lỗi là: trước khi giải thích, hãy đón nhận cảm xúc của đối phương trước đã.” — Khách bực vì chuyến đi bị phá hỏng, vì cảm giác không được tôn trọng; nhận ra điều đó rồi mới nói tiếp được.' },
        { sp: 'narr', text: 'Phòng mới ở tầng cao hơn, cửa sổ nhìn ra vịnh. Nhân viên mang hành lý lên, {name} đích thân đi cùng để mở cửa phòng cho khách — theo lời dặn của chị quản lý: “Người gây ra sự bất tiện thì cũng nên là người tiễn khách vào căn phòng tử tế.”' },
        { sp: 'Chị khách', jp: 'こちらのお{部屋|へや}は、においがしませんね。{窓|まど}からの{景色|けしき}もきれい。', text: 'Chị khách hít một hơi thật sâu trong phòng mới, nét mặt giãn ra: “Phòng này không có mùi gì cả. Cảnh nhìn từ cửa sổ cũng đẹp nữa.”' },
        {
          prompt: 'Khách đã yên vị ở phòng mới. {name} làm thêm bước cuối nào trước khi rời đi?',
          choice: [
            { label: 'Để lại lời xin lỗi viết tay ngắn gọn cùng số máy lẻ của quầy lễ tân', fx: { jp: 2, love: 2 }, note: 'Khách sạn biến cố: theo dõi sau xử lý bằng lời xin lỗi viết tay', say: [
              { sp: 'narr', text: '{name} để lại trên bàn một tấm thiệp nhỏ viết tay: xin lỗi về sự bất tiện đầu tiên, chúc khách một buổi tối yên tĩnh, và số máy lẻ của quầy lễ tân nếu cần bất cứ điều gì. Chiều hôm sau, khi trả phòng, khách nữ nhắc đích danh tấm thiệp đó: “Chi tiết nhỏ vậy thôi mà tôi thấy mình được coi trọng.”' }
            ] },
            { label: 'Thấy khách đã ổn thì về quầy luôn, còn nhiều việc đang chờ', fx: { pressure: 1 }, note: 'Khách sạn biến cố: bỏ qua bước theo dõi cuối', say: [
              { sp: 'narr', text: '{name} chào khách rồi quay về quầy, chìm vào đống việc tiếp theo. Mọi thứ có vẻ đã ổn — nhưng tối đó chị senpai hỏi một câu khiến {call} khựng lại: “Em có biết sau khi đổi phòng, khách có thực sự hài lòng không?” Xử lý sự cố mà không có bước xác nhận cuối, giống như chữa bệnh mà không tái khám.' }
            ] }
          ]
        },
        { sp: 'Chị khách', jp: 'ありがとうございました。{最初|さいしょ}はがっかりしたけど、{最後|さいご}は{安心|あんしん}しました。', text: 'Trước khi cửa phòng khép lại, khách nữ mỉm cười nói: “Cảm ơn các bạn nhé. Lúc đầu tôi thất vọng lắm, nhưng cuối cùng thì tôi yên tâm rồi.”' },
        { sp: 'Chị senpai khách sạn', jp: '{謝|あやま}るのは{恥|はじ}じゃありません。{誠実|せいじつ}に{向|む}き{合|あ}うことが、{信頼|しんらい}に{変|か}わるんですよ。', text: 'Chị senpai nói khi hai người cùng quay lại quầy: “Xin lỗi không phải là điều đáng xấu hổ. Đối mặt một cách thành thật mới là thứ biến thành niềm tin đấy.”' },
        { sp: 'narr', text: 'Cuối ca, {name} ngồi viết bản tường trình sự cố trong phòng nghỉ nhân viên. Tay viết chậm rãi từng dòng — hôm nay {call} học được một bài học mà không trường lớp nào dạy trọn vẹn: ở Nhật, lời xin lỗi đúng cách không làm mình thấp đi, nó làm niềm tin của người đối diện cao lên.' },
        { sp: 'Chị quản lý', jp: '{今日|きょう}の{対応|たいおう}、よく{見|み}ていましたよ。{明日|あした}もフロント、お{願|ねが}いしますね。', text: 'Chị quản lý ghé qua trước khi về: “Cách xử lý hôm nay của em, chị quan sát hết đấy. Ngày mai cũng nhờ em ở quầy lễ tân nhé.”' }
      ],
      outro: 'Trên đường về qua cầu vòm お台場 lấp lánh đèn, {name} nhẩm lại thứ tự của ngày hôm nay: xin lỗi trước, giải thích sau; nhận trách nhiệm trước, đề xuất phương án ngay sau đó. 謝罪 không phải là cúi đầu cho qua chuyện — là cách một khách sạn nói với khách rằng: cảm xúc của bạn quan trọng hơn sĩ diện của chúng tôi.'
    },

    'ind-khach-san-3': {
      scene: '🌟 Khách sạn お台場 — khách VIP khó tính khen đích danh và ca lễ tân chính thức',
      branch: [
        { sp: 'narr', text: 'Một buổi chiều mưa ở お台場. Sảnh khách sạn thơm mùi trà, và chị quản lý vừa thông báo nhỏ với cả ca: chiều nay có một vị khách VIP — một vị khách rất khó tính, nổi tiếng là chi tiết đến từng ly từng tí — sẽ đến nhận phòng. Mọi ánh mắt ở quầy đều đổ dồn về phía {name}.' },
        { sp: 'Khách nam', jp: '{予約|よやく}の{通|とお}り、{静|しず}かな{高層階|こうそうかい}でお{願|ねが}いします。あと、{明日|あした}の{朝食|ちょうしょく}は{六時|ろくじ}に{部屋|へや}まで{持|も}ってきてください。', text: 'Khách nam nói nhanh, rõ và không thừa một chữ: “Đúng như đã đặt, cho tôi phòng yên tĩnh ở tầng cao. Thêm nữa, sáng mai mang bữa sáng lên phòng cho tôi lúc 6 giờ.”' },
        { sp: 'Chị senpai khách sạn', jp: '{要望|ようぼう}が{多|おお}いお{客様|きゃくさま}ほど、{一|ひと}つずつ{確認|かくにん}するのが{大事|だいじ}ですよ。', text: 'Chị senpai ghé tai nhắc nhỏ: “Khách càng nhiều yêu cầu thì càng phải xác nhận từng việc một. Đó là điều quan trọng nhất đấy.”' },
        {
          prompt: 'Khách VIP đưa ra một loạt yêu cầu cùng lúc. {name} tiếp nhận thế nào?',
          choice: [
            { label: 'Lặp lại và xác nhận từng yêu cầu một, ghi chép ngay trước mặt khách', fx: { jp: 3, love: 1 }, note: 'Khách sạn tay nghề: xác nhận từng yêu cầu của khách VIP', say: [
              { sp: 'narr', text: '{name} mở sổ, xác nhận lại từng ý một bằng giọng rõ ràng: phòng yên tĩnh tầng cao — đã ghi; bữa sáng 6 giờ mang lên phòng — đã ghi; và hỏi thêm một câu về món dị ứng. Khách nam ngẩng lên nhìn {call} lâu hơn một nhịp — cái nhìn của người quen được phục vụ qua loa, nay bất ngờ gặp người làm việc có hệ thống.' },
              { sp: 'Khách nam', jp: 'ふむ、{落|お}ち{着|つ}いているね。{要望|ようぼう}を{一|ひと}つも{落|お}としていない。', text: 'Khách nam gật nhẹ: “Hừm, bình tĩnh đấy. Không bỏ sót một yêu cầu nào cả.”' }
            ] },
            { label: 'Nhận hết bằng câu “cứ để tôi lo” cho nhanh, không ghi chép gì', fx: { risk: 2, pressure: 2 }, note: 'Khách sạn tay nghề: nhận hết yêu cầu mà không ghi chép', say: [
              { sp: 'narr', text: 'Câu “cứ để tôi lo” nghe rất tự tin — cho đến hai mươi phút sau, khi {name} đứng giữa ca mà không nhớ nổi bữa sáng của khách là 6 giờ hay 6 giờ rưỡi, mang lên phòng hay ăn ở nhà hàng. Chị senpai phải lặng lẽ gọi điện xác nhận lại với khách, một cuộc gọi mà lẽ ra không bao giờ nên tồn tại.' }
            ] },
            { label: 'Nói thẳng là có yêu cầu khách sạn không đáp ứng được, từ chối ngay từ đầu', fx: { pressure: 2 }, note: 'Khách sạn tay nghề: từ chối yêu cầu quá sớm', say: [
              { sp: 'narr', text: 'Vừa nghe tới bữa sáng mang lên phòng lúc 6 giờ, {name} đã lắc đầu nói nhà hàng chưa mở cửa nên không làm được. Khách nam nhíu mày: “Chưa kiểm tra đã từ chối sao?” Hoá ra bộ phận nhà hàng hoàn toàn có thể chuẩn bị hộp bữa sáng từ tối hôm trước — điều mà {call} sẽ biết nếu chịu hỏi trước khi trả lời.' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Mọi yêu cầu sau khi xác nhận đều được chuyển tới các bộ phận liên quan kèm giờ giấc cụ thể. Phòng tầng cao yên tĩnh đã sẵn sàng, hộp bữa sáng được nhà hàng hẹn giờ chuẩn bị. Ca trực tưởng như căng thẳng lại trôi đi trơn tru một cách bất ngờ.' },
        { sp: 'Chị quản lý', jp: '{準備|じゅんび}がいいですね。お{客様|きゃくさま}からの{評価|ひょうか}が、{楽|たの}しみです。', text: 'Chị quản lý xem qua bảng chuyển giao, mỉm cười: “Chuẩn bị tốt đấy. Chị đang chờ xem vị khách này sẽ đánh giá thế nào đây.”' },
        { sp: 'Khách nam', jp: 'この{辺|あた}りで、{静|しず}かに{食事|しょくじ}ができる{店|みせ}はありますか。{明日|あした}の{夜|よる}、{一人|ひとり}で{行|い}きたいんです。', text: 'Tối hôm đó khách nam quay xuống quầy hỏi thêm: “Quanh khu này có quán nào ăn uống yên tĩnh không? Tối mai tôi muốn đi ăn một mình.” — Một câu hỏi thử thách thật sự: giới thiệu sai gu là mất điểm ngay.' },
        {
          prompt: 'Khách VIP hỏi gợi ý quán ăn yên tĩnh quanh khu vực. {name} trả lời sao?',
          choice: [
            { label: 'Hỏi khéo sở thích và ngân sách của khách trước, rồi mới gợi ý hai lựa chọn cụ thể', fx: { jp: 3, love: 2 }, note: 'Khách sạn tay nghề: hỏi gu khách trước khi gợi ý quán', say: [
              { sp: 'narr', text: '{name} không vội đọc thuộc lòng danh sách quán, mà hỏi lại hai câu ngắn: khách thích món Nhật hay món Âu, và muốn đi bộ hay đi tàu một bến. Từ hai câu trả lời, {call} gợi ý đúng hai quán — một quán Nhật nhỏ yên tĩnh cách hai con phố, kèm giờ đóng cửa và lời khuyên nên đặt bàn trước. Khách nam gật đầu ghi lại vào điện thoại.' },
              { sp: 'Khách nam', jp: 'よく{分|わ}かっているね。{明日|あした}、{行|い}ってみよう。', text: 'Khách nam nói, giọng đã khác hẳn lúc mới đến: “Hiểu rõ khu này đấy. Mai tôi sẽ thử tới xem.”' }
            ] },
            { label: 'Giới thiệu ngay quán nổi tiếng nhất khu, không cần hỏi thêm', fx: { pressure: 1 }, note: 'Khách sạn tay nghề: gợi ý quán khi chưa biết gu khách', say: [
              { sp: 'narr', text: '{name} giới thiệu ngay quán nổi tiếng nhất trong trung tâm thương mại gần khách sạn. Khách nam nghe xong chỉ “ừm” một tiếng: quán đó ồn ào, toàn khách du lịch theo đoàn — đúng thứ khách vừa nói là muốn tránh. Gợi ý không sai về độ nổi tiếng, nhưng sai hoàn toàn về con người đang đứng trước mặt.' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Sáng hôm sau, hộp bữa sáng được mang lên phòng đúng 6 giờ không lệch một phút. Khi trả phòng, khách nam dừng lại ở quầy lâu hơn thường lệ, nhìn bảng tên trên ngực áo {name} rồi quay sang chị quản lý đang đứng phía sau.' },
        { sp: 'Khách nam', jp: 'この{方|かた}の{対応|たいおう}が、とてもよかったです。{要望|ようぼう}をよく{聞|き}いて、{約束|やくそく}を{守|まも}ってくれた。また{来|き}たときも、お{願|ねが}いしたいですね。', text: 'Khách nam nói rõ ràng, đích danh: “Cách phục vụ của bạn này rất tốt. Lắng nghe kỹ yêu cầu của tôi, và giữ đúng mọi lời hứa. Lần sau tới, tôi lại muốn nhờ bạn ấy.” — Ở nghề khách sạn, một lời khen đích danh từ vị khách khó tính nhất là huân chương không treo trên tường mà treo trong lòng.' },
        { sp: 'Chị quản lý', jp: '{来週|らいしゅう}から、フロントの{主担当|しゅたんとう}を{任|まか}せます。シフトも{少|すこ}し{増|ふ}やしましょう。', text: 'Sau khi khách rời đi, chị quản lý gọi {name} lại: “Từ tuần sau, chị giao cho em vị trí phụ trách chính ở quầy lễ tân. Giờ làm cũng sẽ tăng thêm một chút nhé.” — 公 nhận bằng lời, và bằng cả trách nhiệm lẫn thu nhập.' },
        {
          prompt: 'Được giao ca lễ tân chính thức và tăng giờ làm. {name} phản hồi thế nào?',
          choice: [
            { label: 'Nhận lời cảm ơn, đồng thời xác nhận rõ lịch nghỉ để giữ sức lâu dài', fx: { jp: 2, money: 0.5, hp: 1 }, note: 'Khách sạn tay nghề: nhận ca chính thức, chốt rõ ngày nghỉ', say: [
              { sp: 'narr', text: '{name} cảm ơn chị quản lý, nhận vị trí mới, và khéo léo xác nhận luôn hai ngày nghỉ cố định trong tuần để còn giữ sức và thời gian học tiếng Nhật. Chị quản lý cười: “Biết giữ sức mới làm được lâu. Chốt như vậy nhé.” Tăng giờ đồng nghĩa tăng thu nhập — và tăng cả sự tin tưởng.' }
            ] },
            { label: 'Nhận hết mọi ca tăng thêm không cần suy nghĩ, kể cả ca liền nhau', fx: { money: 0.8, hp: -3, pressure: 2 }, note: 'Khách sạn tay nghề: ôm hết ca tăng thêm', say: [
              { sp: 'narr', text: 'Nghe tới tăng giờ là {name} gật đầu ngay với mọi ca được đề xuất, kể cả những ca tối muộn nối sáng sớm. Tiền thì đúng là nhiều hơn thật — nhưng mới ba ngày sau, đôi mắt thâm quầng đã bán đứng {call} ngay tại quầy, và chị senpai phải nhắc khẽ: “Phục vụ khách bằng bộ mặt kiệt sức thì không gọi là omotenashi đâu em.”' }
            ] },
            { label: 'Từ chối vị trí chính vì sợ trách nhiệm nặng', fx: { pressure: 1 }, note: 'Khách sạn tay nghề: từ chối cơ hội vì sợ trách nhiệm', say: [
              { sp: 'narr', text: '{name} ngập ngừng rồi từ chối khéo, nói muốn làm phụ thêm một thời gian nữa. Chị quản lý không ép, chỉ gật đầu — nhưng cánh cửa cơ hội không phải lúc nào cũng mở hai lần. Tối về, {name} cứ nghĩ mãi về ánh mắt của vị khách VIP lúc khen mình: người ta đã tin mình đến thế, sao mình lại không tin chính mình?' }
            ] }
          ]
        },
        { sp: 'Chị senpai khách sạn', jp: 'おめでとう。{主担当|しゅたんとう}のバッジ、よく{似合|にあ}っていますよ。', text: 'Chị senpai tự tay gắn chiếc bảng tên mới cho {name}, cười rạng rỡ: “Chúc mừng em. Chiếc bảng tên phụ trách chính này, hợp với em lắm đấy.”' },
        { sp: 'narr', text: 'Tối đó, đứng ở quầy lễ tân chính lần đầu tiên với tư cách người phụ trách, {name} nhìn sảnh khách sạn lên đèn, vịnh お台場 ngoài kia lấp lánh. Từ một người mới run tay ngày đầu, tới người được khách khó tính nhất khen đích danh — chặng đường ấy được dệt bằng từng câu keigo đúng lúc và từng lời hứa được giữ đúng giờ.' },
        { sp: 'Chị quản lý', jp: 'これからも、その{丁寧|ていねい}さを{忘|わす}れないでくださいね。', text: 'Chị quản lý nói câu cuối trước khi hết ca: “Từ nay về sau cũng đừng quên sự chu đáo đó nhé.”' }
      ],
      outro: 'Omotenashi — lòng hiếu khách của người Nhật — hoá ra không phải là nghi lễ cầu kỳ. Nó là việc nhớ đúng một yêu cầu nhỏ, giữ đúng một lời hứa nhỏ, và để khách ra về với cảm giác “người đó thật sự để tâm tới mình”. {name} đã bắt đầu được nhớ đến ở khách sạn này, bằng chính cái tên của mình.'
    },

    'talk-khach-san': {
      scene: '☕ Khách sạn お台場 — giờ nghỉ giữa ca: trà, mưa biển và chuyện khách dễ thương',
      wrong: {
        0: ['{雨|あめ}の{日|ひ}は{静|しず}かで、{窓|まど}の{外|そと}の{海|うみ}を{飲|の}みたいです。', '{雨|あめ}の{日|ひ}のロビーは、{海|うみ}が{部屋|へや}の{中|なか}に{入|はい}ります。'],
        1: ['{昨日|きのう}の{小|ちい}さいお{客様|きゃくさま}は、お{辞儀|じぎ}を{食|た}べてくれました。', 'お{辞儀|じぎ}をされると、{疲|つか}れがご{飯|はん}になります。']
      },
      lines: [
        { sp: 'Chị senpai khách sạn', jp: '{少|すこ}し{休|やす}みましょう。{雨|あめ}の{日|ひ}はロビーも{静|しず}かになりますね。', vi: 'Nghỉ một chút nào. Ngày mưa thì sảnh cũng yên tĩnh hẳn nhỉ.' },
        { sp: 'hero', jp: 'そうですね。{窓|まど}の{外|そと}の{海|うみ}が、{今日|きょう}はグレーの{色|いろ}ですね。', vi: 'Đúng là vậy ạ. Biển ngoài cửa sổ hôm nay mang màu xám ạ.' },
        { sp: 'Chị senpai khách sạn', jp: '{昨日|きのう}の{小|ちい}さいお{客様|きゃくさま}、{帰|かえ}るとき{深|ふか}くお{辞儀|じぎ}をしてくれたんですよ。かわいかったなあ。', vi: 'Vị khách nhỏ tuổi hôm qua ấy, lúc ra về còn cúi chào rất sâu với chị đấy. Đáng yêu ghê.' },
        { sp: 'hero', jp: 'かわいいですね。お{辞儀|じぎ}をされると、{疲|つか}れが{少|すこ}し{消|き}えますね。', vi: 'Dễ thương thật ạ. Được khách cúi chào đáp lại như vậy là mệt mỏi cũng tan đi một chút ạ.' },
        { sp: 'Chị senpai khách sạn', jp: 'その{気持|きも}ちがあれば、{大丈夫|だいじょうぶ}。さあ、あと{半分|はんぶん}、いきましょうか。', vi: 'Giữ được cảm xúc đó là ổn rồi. Nào, còn nửa ca nữa, mình đi tiếp nhé.' },
        { sp: 'hero', jp: 'はい、{頑張|がんば}ります。お{茶|ちゃ}、ごちそうさまでした。', vi: 'Vâng, em sẽ cố gắng ạ. Em cảm ơn chị về trà ạ.' }
      ],
      outro: 'Tách trà ấm giữa ca, một câu chuyện nhỏ về vị khách nhí — nghề lễ tân có những khoảng lặng dịu dàng như vậy, đủ để {name} mỉm cười quay lại quầy, sẵn sàng cúi chào vị khách tiếp theo bằng cả tấm lòng.'
    },

    // ================= SHOKUHIN — nhà máy thực phẩm ở Osaka =================

    'ind-shokuhin-1': {
      scene: '🏭 Nhà máy thực phẩm 大阪 — buổi đầu ca: vệ sinh tay, đứng chuyền và báo cáo số lượng',
      wrong: {
        0: ['よろしくお{願|ねが}いします。{手|て}は{美味|おい}しく{洗|あら}います。', '{私|わたし}はラインで{一番|いちばん}{速|はや}く{寝|ね}ます。'],
        1: ['{帽子|ぼうし}と{手袋|てぶくろ}は、{髪|かみ}が{見|み}えたら{直|なお}してから{入|はい}りますか。{食|た}べますか。', '{手袋|てぶくろ}は{破|やぶ}れても、{明日|あした}まで{大丈夫|だいじょうぶ}ですか。'],
        2: ['{今|いま}、{百個|ひゃっこ}{終|お}わりました。{残|のこ}りは{海|うみ}です。', '{数|かず}は{数|かぞ}えました。{全部|ぜんぶ}で{昨日|きのう}こです。'],
        3: ['{容器|ようき}が{一|ひと}つ、{割|わ}れています。これは{美味|おい}しいですか。', '{不良|ふりょう}が{一|ひと}つあります。{隠|かく}して{出|だ}します。']
      },
      lines: [
        { sp: 'Chị trưởng ca', jp: 'おはようございます。{食品工場|しょくひんこうじょう}で{一番|いちばん}{大事|だいじ}なのは、{衛生|えいせい}です。まず{手洗|てあら}いからいきましょう。', vi: 'Chào buổi sáng. Ở nhà máy thực phẩm, điều quan trọng nhất là vệ sinh. Mình bắt đầu từ việc rửa tay nhé.' },
        { sp: 'hero', jp: 'おはようございます。よろしくお{願|ねが}いします。{手|て}は{決|き}められた{順番|じゅんばん}で、しっかり{洗|あら}います。', vi: 'Chào buổi sáng ạ. Mong được chị chỉ bảo ạ. Em sẽ rửa tay kỹ theo đúng thứ tự đã quy định ạ.' },
        { sp: 'Chị trưởng ca', jp: '{洗|あら}ったら、アルコールで{消毒|しょうどく}。{帽子|ぼうし}から{髪|かみ}が{出|で}ていたら、{入|はい}る{前|まえ}に{直|なお}してくださいね。', vi: 'Rửa xong thì sát khuẩn bằng cồn. Nếu tóc lộ ra ngoài mũ thì phải chỉnh lại trước khi vào xưởng nhé.' },
        { sp: 'hero', jp: '{分|わ}かりました。{髪|かみ}が{出|で}ていたら、{鏡|かがみ}で{確認|かくにん}して{直|なお}してから{入|はい}ります。', vi: 'Em hiểu rồi ạ. Nếu tóc bị lộ, em sẽ soi gương kiểm tra và chỉnh lại rồi mới vào ạ.' },
        { sp: 'Anh công nhân', jp: 'ラインは{思|おも}ったより{速|はや}いけど、{慣|な}れれば{大丈夫|だいじょうぶ}だよ。{最初|さいしょ}は{数|かず}より、{落|お}とさないことが{大事|だいじ}だからね。', vi: 'Dây chuyền nhanh hơn tưởng tượng đấy, nhưng quen rồi là ổn thôi. Lúc đầu thì đừng làm rơi quan trọng hơn là đếm nhanh nhé.' },
        { sp: 'hero', jp: 'ありがとうございます。{今|いま}、{百個|ひゃっこ}{終|お}わりました。{残|のこ}りはあと{五十個|ごじゅっこ}です。', vi: 'Cảm ơn anh ạ. Hiện tại em đã làm xong 100 cái rồi ạ. Còn lại 50 cái nữa ạ.' },
        { sp: 'Chị trưởng ca', jp: 'いいですね。{数|かず}は{区切|くぎ}りのいいところで{報告|ほうこく}してください。あと、{不良|ふりょう}は{見|み}つけましたか。', vi: 'Tốt đấy. Số lượng thì báo cáo ở những mốc tròn nhé. À, em có phát hiện sản phẩm lỗi nào không?' },
        { sp: 'hero', jp: 'はい、{容器|ようき}が{一|ひと}つ、{角|かど}が{欠|か}けています。ラインから{外|はず}して、{赤|あか}いケースに{入|い}れました。', vi: 'Có ạ, một hộp bị sứt ở góc ạ. Em đã lấy ra khỏi chuyền và bỏ vào thùng đỏ rồi ạ.' },
        { sp: 'Chị trưởng ca', jp: 'その{判断|はんだん}で{正解|せいかい}です。{不良|ふりょう}は{隠|かく}さず、すぐ{報告|ほうこく}。それが{食|た}べる{人|ひと}を{守|まも}ることですよ。', vi: 'Phán đoán vậy là đúng đấy. Hàng lỗi thì không giấu, báo cáo ngay. Đó là cách bảo vệ người sẽ ăn sản phẩm này đấy.' },
        { sp: 'Anh công nhân', jp: 'このライン、{冷|つめ}たいからさ、{中|なか}に{一枚|いちまい}{多|おお}く{着|き}てくるといいよ。{明日|あした}からな。', vi: 'Chuyền này lạnh lắm, mặc thêm một lớp bên trong là đỡ hẳn đấy. Từ mai nhớ nhé.' },
        { sp: 'hero', jp: 'ありがとうございます。{明日|あした}からそうします。{今日|きょう}の{分|ぶん}、{最後|さいご}まで{頑張|がんば}ります。', vi: 'Cảm ơn anh ạ. Từ mai em sẽ làm như vậy ạ. Phần việc hôm nay em sẽ cố gắng đến cuối ạ.' },
        { sp: 'Chị trưởng ca', jp: 'よし、その{調子|ちょうし}で。{分|わ}からないことは、ラインが{動|うご}いている{時|とき}でも{声|こえ}をかけてくださいね。', vi: 'Được, cứ giữ phong độ đó. Có gì không hiểu thì dù chuyền đang chạy cũng cứ gọi chị nhé.' }
      ],
      outro: 'Ca đầu tiên kết thúc, {name} tháo găng tay, đôi tay đỏ lên vì lạnh nhưng lòng thì nhẹ nhõm: số lượng khớp, lỗi đã báo, không có gì phải giấu. Ở nhà máy thực phẩm, “làm đúng” không phải là khẩu hiệu treo tường — nó nằm trong từng chiếc hộp sẽ đến tay một người xa lạ nào đó.'
    },

    'ind-shokuhin-2': {
      scene: '🌙 Nhà máy thực phẩm 大阪 — biến cố ca đêm: khay hàng in sai hạn dùng',
      branch: [
        { sp: 'narr', text: 'Hai giờ sáng. Dây chuyền lạnh ở nhà máy 大阪 chạy đều đều trong tiếng máy rì rầm, hơi lạnh phả ra từ kho bảo quản khiến kính bảo hộ của {name} mờ đi từng nhịp. Ca đêm là ca của sự tỉnh táo — và của những sai sót rất dễ bị bỏ qua khi ai cũng đã mệt.' },
        { sp: 'Anh công nhân', jp: '{夜中|よなか}のラインは{眠|ねむ}さとの{勝負|しょうぶ}だね。でも、{目|め}だけは{落|お}としちゃだめだよ。', text: 'Anh công nhân ngáp một cái thật dài rồi tự vỗ vào má: “Chuyền lúc nửa đêm là trận chiến với cơn buồn ngủ đấy. Nhưng riêng đôi mắt thì không được phép gục đâu nhé.”' },
        { sp: 'narr', text: 'Đúng lúc đó, một khay hàng chạy qua trước mặt {name}. Hạn dùng in trên nhãn là ngày hôm qua so với phiếu sản xuất treo ở đầu chuyền — lệch hẳn một ngày. {name} nhìn lại lần nữa cho chắc: không nhầm được. Cả khay này, và có thể cả lô hàng quanh nó, đã bị in sai hạn dùng.' },
        {
          prompt: 'Một khay hàng in sai hạn dùng đang chạy trên chuyền, phía sau còn hàng trăm khay nữa. {name} làm gì ngay lúc này?',
          choice: [
            { label: 'Bấm dừng chuyền và báo ngay cho chị trưởng ca', fx: { jp: 3, pressure: -1 }, note: 'Thực phẩm biến cố: dừng chuyền báo ngay khi phát hiện sai hạn', say: [
              { sp: 'narr', text: '{name} bấm nút dừng chuyền và gọi lớn về phía đầu ca. Tiếng máy dừng lại, cả chuyền ngẩng lên — nhưng không một ai khó chịu. Chị trưởng ca tới nơi, xem nhãn, xem phiếu sản xuất, rồi gật đầu dứt khoát: toàn bộ lô hàng trong ca này sẽ bị giữ lại kiểm tra. Một phần hàng phải bỏ đi, tốn kém thật — nhưng không một hộp sai hạn nào lọt ra khỏi cổng nhà máy đêm nay.' },
              { sp: 'Chị trưởng ca', jp: 'よく{止|と}めてくれました。{止|と}める{勇気|ゆうき}が、{一番|いちばん}の{品質|ひんしつ}です。', text: 'Chị trưởng ca nói rõ ràng: “Cảm ơn em đã dám dừng chuyền. Dũng khí bấm nút dừng chính là chất lượng số một đấy.”' }
            ] },
            { label: 'Lén lấy khay sai ra bỏ đi, không báo ai để chuyền khỏi dừng', fx: { risk: 2, pressure: 2 }, note: 'Thực phẩm biến cố: lén bỏ khay sai hạn, không báo cáo', say: [
              { sp: 'narr', text: '{name} nhanh tay nhấc khay đó ra, bụng nghĩ vậy là xong. Nhưng mười phút sau, anh công nhân ở cuối chuyền phát hiện thêm hai khay nữa cùng lô — sai hạn không nằm ở một khay, nó nằm ở cả lô hàng. Chị trưởng ca phải dừng chuyền trong tình trạng không ai biết sai sót bắt đầu từ lúc nào, và câu hỏi đầu tiên của chị là: “Có ai thấy gì bất thường trước đó không?”' },
              { sp: 'Chị trưởng ca', jp: '{一|ひと}つ{見|み}つけたということは、{全部|ぜんぶ}が{怪|あや}しいということです。{隠|かく}すと、{範囲|はんい}が{分|わ}からなくなりますよ。', text: 'Chị trưởng ca nghiêm giọng: “Phát hiện một cái sai nghĩa là phải nghi ngờ toàn bộ. Giấu đi thì sẽ không còn biết phạm vi sai sót tới đâu nữa.”' }
            ] },
            { label: 'Để mặc kệ — chắc bộ phận kiểm phẩm cuối chuyền sẽ tự phát hiện', fx: { risk: 3, pressure: 3 }, note: 'Thực phẩm biến cố: để mặc khay sai hạn trôi qua', say: [
              { sp: 'narr', text: '{name} nhìn khay hàng trôi qua, tự nhủ phía cuối chuyền còn người kiểm tra. Nhưng ca đêm mệt mỏi, và khay hàng đó đã lọt qua cả vòng kiểm tra cuối cùng. Sáng hôm sau, cả lô hàng bị thu hồi khẩn cấp từ kho, nhà máy phải làm việc với bên phân phối, và cuộc họp kiểm điểm kéo dài tới trưa. Một khoảnh khắc “để mặc kệ” ở hai giờ sáng hoá thành hậu quả mà cả nhà máy phải gánh.' },
              { sp: 'Chị trưởng ca', jp: '{食|た}べる{人|ひと}の{顔|かお}を{思|おも}い{浮|う}かべてください。{私|わたし}たちの{仕事|しごと}は、その{人|ひと}の{健康|けんこう}そのものです。', text: 'Chị trưởng ca nói trong buổi họp, giọng không cao nhưng ai cũng cúi đầu: “Hãy nghĩ tới gương mặt của người sẽ ăn sản phẩm này. Công việc của chúng ta chính là sức khoẻ của người ta đấy.”' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Chuyền dừng, đèn vàng báo hiệu bật lên. Toàn bộ hàng trong khung giờ nghi ngờ được chuyển sang khu vực cách ly dán nhãn đỏ, chờ kiểm tra lại từng khay. Không khí trong xưởng căng mà trật tự — ai cũng hiểu đây là lúc nhà máy chứng minh mình đáng tin.' },
        { sp: 'Chị trưởng ca', jp: '{詳|くわ}しく{教|おし}えてください。{発見|はっけん}したのは{何時頃|なんじごろ}で、{対象|たいしょう}はどのロットですか。', text: 'Chị trưởng ca cầm sẵn sổ ghi chép, hỏi rành mạch: “Cho chị biết chi tiết đi. Em phát hiện lúc mấy giờ, và lô hàng liên quan là lô nào?”' },
        {
          prompt: 'Chị trưởng ca hỏi chi tiết sự việc. {name} trả lời thế nào?',
          choice: [
            { label: 'Trả lời đúng giờ phát hiện, đúng số khay đã thấy, phần nào chưa chắc thì nói rõ là chưa chắc', fx: { jp: 2 }, note: 'Thực phẩm biến cố: báo cáo chi tiết, phân biệt chắc chắn và chưa chắc', say: [
              { sp: 'narr', text: '{name} báo cáo từng ý: giờ phát hiện, số khay tận mắt thấy, và nói rõ phần lô hàng phía trước đó mình chưa kiểm chứng. Chị trưởng ca gật đầu ghi chép: báo cáo tách bạch được “điều đã chắc” và “điều chưa chắc” giúp khâu kiểm tra khoanh vùng nhanh gấp nhiều lần.' }
            ] },
            { label: 'Nói qua loa “chắc chỉ có vài khay thôi” cho nhẹ chuyện', fx: { pressure: 2, risk: 1 }, note: 'Thực phẩm biến cố: báo cáo qua loa về sai hạn', say: [
              { sp: 'narr', text: 'Câu “chắc chỉ vài khay thôi” thốt ra nhẹ tênh, nhưng chị trưởng ca dừng bút, nhìn thẳng: “‘Chắc’ là bao nhiêu? Ba khay hay ba mươi khay?” Trong an toàn thực phẩm, những con số đoán mò nguy hiểm không kém gì sự im lặng — vì người nghe sẽ ra quyết định dựa trên chính những con số đó.' }
            ] }
          ]
        },
        { sp: 'Chị trưởng ca', jp: 'では、ロット{全部|ぜんぶ}を{保留|ほりゅう}にします。{出荷|しゅっか}は{確認|かくにん}が{終|お}わるまで{止|と}めます。', text: 'Chị trưởng ca quyết định dứt khoát: “Vậy thì giữ lại toàn bộ lô hàng này. Việc xuất hàng tạm dừng cho tới khi kiểm tra xong.”' },
        { sp: 'narr', text: 'Đội ca đêm chia nhau kiểm lại từng khay dưới ánh đèn sáng trưng. Việc mất thêm gần một giờ, lưng ai cũng mỏi — nhưng khi khay cuối cùng được xếp lại gọn gàng vào khu cách ly, có một cảm giác rất lạ lan ra trong xưởng: mệt, mà yên tâm.' },
        { sp: 'Anh công nhân', jp: '{正直|しょうじき}、{止|と}まったときは{焦|あせ}ったけどさ、{今|いま}は{止|と}まってよかったと{思|おも}うよ。', text: 'Anh công nhân vừa xếp khay vừa nói thật lòng: “Nói thật lúc chuyền dừng anh cũng sốt ruột lắm, nhưng giờ thì thấy dừng lại là đúng rồi đấy.”' },
        {
          prompt: 'Trời sắp sáng, ca đêm sắp kết thúc. Việc bàn giao cho ca sáng, {name} làm tới đâu?',
          choice: [
            { label: 'Viết tường trình đầy đủ và bàn giao trực tiếp cho người ca sáng', fx: { jp: 2, pressure: -1 }, note: 'Thực phẩm biến cố: bàn giao ca đầy đủ sau sự cố', say: [
              { sp: 'narr', text: '{name} ở lại thêm mười phút, viết tường trình rõ ràng: lô nào bị giữ, kiểm tra tới đâu, còn phần nào ca sáng phải làm tiếp — rồi bàn giao tận tay người phụ trách ca sáng, chỉ vào khu cách ly cho họ thấy tận mắt. Người ca sáng gật đầu: “Rõ ràng thế này thì bọn tôi đỡ khổ rồi.”' }
            ] },
            { label: 'Về đúng giờ, để lại mảnh giấy ghi vội vài chữ trên bàn', fx: { pressure: 2 }, note: 'Thực phẩm biến cố: bàn giao ca bằng giấy ghi vội', say: [
              { sp: 'narr', text: 'Mảnh giấy ghi vội “lô tối qua có vấn đề, hỏi trưởng ca” đến trưa hôm sau mới được người ta tìm thấy dưới đáy cốc nước. May mà chị trưởng ca đã tự bàn giao miệng từ sớm — nhưng bài học thì rõ ràng: sự cố càng lớn, bàn giao càng không được phép qua loa.' }
            ] }
          ]
        },
        { sp: 'Chị trưởng ca', jp: '{今夜|こんや}の{対応|たいおう}、{採点|さいてん}ではなく{事実|じじつ}として{記録|きろく}に{残|のこ}します。よくやってくれました。', text: 'Chị trưởng ca nói trước giờ tan ca: “Cách xử lý đêm nay, chị sẽ ghi vào hồ sơ như một sự việc thực tế, không phải để chấm điểm. Em đã làm tốt.” — Công minh đúng chất của chị: không tâng bốc, cũng không bỏ qua.' },
        { sp: 'Anh công nhân', jp: 'さあ、{朝|あさ}だ。{外|そと}、{明|あか}るいよ。コンビニでなんか{食|た}べて{帰|かえ}ろう。', text: 'Anh công nhân kéo rèm cửa kho, ánh sáng sớm tràn vào: “Nào, sáng rồi đấy. Ngoài kia trời sáng trưng rồi. Ghé combini ăn gì đó rồi về thôi.”' },
        { sp: 'narr', text: 'Bước ra khỏi cổng nhà máy khi thành phố 大阪 vừa thức giấc, {name} hít một hơi dài. Đêm nay {call} hiểu ra một điều: nút dừng chuyền không phải là nút “gây rắc rối” — nó là nút bảo vệ bữa ăn của hàng nghìn người mà mình không bao giờ gặp mặt.' },
        { sp: 'Chị trưởng ca', jp: 'お{疲|つか}れさまでした。{今日|きょう}はよく{寝|ね}てくださいね。{次|つぎ}のシフトでまた{会|あ}いましょう。', text: 'Chị trưởng ca vẫy tay ở cổng: “Mọi người vất vả rồi. Hôm nay về ngủ cho ngon nhé. Hẹn gặp lại ở ca tiếp theo.”' }
      ],
      outro: 'Về tới phòng, {name} ngủ một giấc dài không mộng mị. Trong sổ tay có thêm một dòng mới: “Thấy sai — dừng, báo, ghi lại. Không có ngoại lệ, kể cả lúc hai giờ sáng.” An toàn thực phẩm không được xây bằng những ngày thuận lợi; nó được xây bằng chính những đêm như đêm nay.'
    },

    'ind-shokuhin-3': {
      scene: '✅ Nhà máy thực phẩm 大阪 — được giao kiểm phẩm cuối chuyền và dạy lại người mới',
      branch: [
        { sp: 'narr', text: 'Một tháng sau đêm sự cố sai hạn. Hôm nay chị trưởng ca gọi {name} lại trước giờ vào ca, trao cho {call} một chiếc bảng kẹp hồ sơ và cây bút đỏ — bộ đồ nghề của người kiểm phẩm cuối chuyền, vị trí mà ở nhà máy này chỉ giao cho người đã được tin tưởng.' },
        { sp: 'Chị trưởng ca', jp: '{今日|きょう}から、ラインの{最後|さいご}の{検査|けんさ}をお{願|ねが}いします。{印|しるし}、{日付|ひづけ}、{重|おも}さ。{三|みっ}つを{見|み}てください。', text: 'Chị trưởng ca dặn rõ ràng: “Từ hôm nay, nhờ em phụ trách khâu kiểm tra cuối chuyền nhé. Nhìn ba thứ: dấu niêm phong, ngày tháng, và trọng lượng.”' },
        { sp: 'Anh công nhân', jp: 'お、{検査担当|けんさたんとう}か。{最初|さいしょ}の{日|ひ}に{数|かず}を{数|かぞ}えてた{人|ひと}と{別人|べつじん}だな。', text: 'Anh công nhân cười khà: “Ồ, lên kiểm phẩm rồi cơ à. Khác hẳn con người đếm số ngày đầu tiên luôn đấy.”' },
        { sp: 'narr', text: 'Đứng ở cuối chuyền, {name} mới thấy hết trách nhiệm của vị trí này: mọi sản phẩm đi qua tay mình là đi thẳng ra thế giới ngoài kia. Niêm phong phải kín, ngày tháng phải đúng, trọng lượng phải khớp. Từng khay, từng khay — chậm rãi mà không được phép lơ là.' },
        {
          prompt: 'Một gói hàng qua tay {name} có trọng lượng nhẹ hơn quy định một chút — rất ít, khó nhận ra. Xử lý sao?',
          choice: [
            { label: 'Giữ lại, cân đối chiếu và báo trưởng ca theo đúng quy trình', fx: { jp: 2 }, note: 'Thực phẩm tay nghề: giữ lại gói nhẹ cân và báo cáo đúng quy trình', say: [
              { sp: 'narr', text: '{name} giữ gói hàng lại, đặt lên cân kiểm tra lần hai: đúng là thiếu trọng lượng. Gói hàng được chuyển sang khu chờ xử lý và ghi vào sổ. Chị trưởng ca đi ngang, nhìn thấy, chỉ gật đầu một cái — cái gật đầu của người biết mình đã giao đúng việc cho đúng người.' }
            ] },
            { label: 'Chênh lệch ít thôi, cho qua luôn để chuyền khỏi tắc', fx: { risk: 2, pressure: 1 }, note: 'Thực phẩm tay nghề: cho qua gói nhẹ cân', say: [
              { sp: 'narr', text: 'Gói hàng nhẹ cân trôi qua tay {name} và biến mất vào dòng hàng phía trước. Nhưng suốt phần ca còn lại, hình ảnh chiếc kim cân lệch đi một chút cứ quay lại trong đầu. Người kiểm phẩm mà bắt đầu biết nói “chắc không sao đâu” — thì đó là ngày chất lượng bắt đầu trượt dốc, chậm và lặng lẽ.' }
            ] }
          ]
        },
        { sp: 'Chị trưởng ca', jp: 'その{目|め}の{細|こま}かさが、{検査|けんさ}の{力|ちから}です。{続|つづ}けてください。', text: 'Chị trưởng ca nói khi xem sổ kiểm tra cuối giờ: “Sự tỉ mỉ trong đôi mắt đó chính là năng lực của người kiểm phẩm. Cứ tiếp tục như vậy nhé.”' },
        { sp: 'narr', text: 'Giữa ca, nhà máy đón một bạn nhân viên mới — cũng là người Việt, cũng bỡ ngỡ y như {name} ngày đầu, đứng nép ở cửa xưởng không dám bước vào. Chị Mai, người vào trước vài tháng, đã ra đón bạn ấy. Chị trưởng ca quay sang {name} và giao thêm một việc nhỏ mà ý nghĩa không nhỏ chút nào.' },
        { sp: 'Chị trưởng ca', jp: 'あの{新|あたら}しい{方|かた}に、まず{一|ひと}つだけ、{日本語|にほんご}の{報告|ほうこく}の{言葉|ことば}を{教|おし}えてあげてください。', text: 'Chị trưởng ca nói: “Em dạy cho bạn mới kia trước một câu thôi nhé — một câu tiếng Nhật dùng để báo cáo.”' },
        {
          prompt: 'Lần đầu tiên đứng ở vị trí “người đi trước”, {name} dạy bạn mới như thế nào?',
          choice: [
            { label: 'Dạy câu 「数えました、今〜個です」 và cho bạn ấy tập nói ngay tại chỗ', fx: { jp: 3, love: 2 }, note: 'Thực phẩm tay nghề: dạy lại người mới một câu báo cáo tiếng Nhật', say: [
              { sp: 'narr', text: '{name} viết câu mẫu ra giấy, đọc chậm từng chữ: 「数えました。今、百個です」 — “Em đếm rồi ạ. Hiện tại là 100 cái.” Bạn mới lẩm nhẩm đọc theo, lần đầu ngượng nghịu, lần thứ ba đã rõ tiếng. Khi bạn ấy tự mình báo cáo thành công lần đầu tiên cho chị trưởng ca, cả hai người cùng cười — một nụ cười mà {name} nhận ra: nó giống hệt nụ cười của mình một tháng trước.' }
            ] },
            { label: 'Chỉ nói nhanh nghĩa tiếng Việt của câu báo cáo, để bạn ấy tự xoay xở dần', fx: { pressure: 1 }, note: 'Thực phẩm tay nghề: dạy người mới qua loa', say: [
              { sp: 'narr', text: '{name} dịch qua loa ý nghĩa rồi quay lại chuyền của mình. Mười phút sau, bạn mới đứng khựng giữa xưởng, tay cầm khay hàng mà không biết báo cáo với ai, bằng câu gì. Anh công nhân phải dừng tay ra giúp. {name} chợt nhớ lại ngày đầu của chính mình — và nhớ rằng mình đã may mắn thế nào khi có người chịu chỉ cho từng câu một.' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Cuối ca, sổ kiểm phẩm của {name} không một dòng bỏ trống. Ở trang cuối, chị trưởng ca đã viết sẵn một dòng chữ nhỏ từ lúc nào: vị trí kiểm phẩm cuối chuyền — phụ trách chính thức từ tuần sau, kèm theo vai trò kèm cặp người mới khi có bạn mới vào.' },
        { sp: 'Chị trưởng ca', jp: '{教|おし}えることは、{自分|じぶん}の{勉強|べんきょう}にもなります。{来週|らいしゅう}からも、お{願|ねが}いしますね。', text: 'Chị trưởng ca nói: “Dạy người khác cũng chính là học cho mình đấy. Từ tuần sau cũng trông cậy vào em nhé.”' },
        {
          prompt: 'Được giao phụ trách kiểm phẩm chính thức và kèm người mới. {name} đáp lại thế nào?',
          choice: [
            { label: 'Nhận lời, và hứa sẽ chỉ lại cho người mới đúng như cách mình từng được chỉ', fx: { jp: 2, love: 2 }, note: 'Thực phẩm tay nghề: nhận vai trò người đi trước', say: [
              { sp: 'narr', text: '{name} gật đầu nhận lời. Trên đường về, {call} nhắn tin khoe với gia đình một câu ngắn: “Con được giao việc quan trọng rồi, còn được dạy người mới nữa.” Vòng tròn cứ thế khép lại — người từng được dắt tay qua ngày đầu bỡ ngỡ, giờ dang tay ra dắt người tiếp theo.' }
            ] },
            { label: 'Nhận việc kiểm phẩm nhưng xin chưa kèm người mới vì thấy mình chưa đủ giỏi', fx: { hp: 1, pressure: -1 }, note: 'Thực phẩm tay nghề: nhận từng phần trách nhiệm một cách thận trọng', say: [
              { sp: 'narr', text: '{name} thật thà nói mình muốn chắc tay ở khâu kiểm phẩm trước đã, rồi hãy kèm người mới. Chị trưởng ca gật đầu tôn trọng: “Biết rõ giới hạn của mình cũng là một loại giỏi.” Việc kèm cặp được hẹn lại sau hai tuần — không vội, nhưng cũng không trốn tránh.' }
            ] }
          ]
        },
        { sp: 'Anh công nhân', jp: 'ほら、もう{先輩|せんぱい}の{顔|かお}してる。{来月|らいげつ}は{新|あたら}しい{人|ひと}が、あんたを{見|み}て{覚|おぼ}えるんだよ。', text: 'Anh công nhân khoác vai {name} cười lớn: “Đấy, ra mặt senpai rồi đấy. Tháng sau người mới sẽ nhìn vào em mà học theo đấy nhé.”' },
        { sp: 'narr', text: 'Cổng nhà máy 大阪 mở ra, nắng chiều rải vàng trên con đường về trạm tàu. {name} đi chậm hơn mọi ngày một chút — không phải vì mệt, mà vì muốn giữ lâu hơn cảm giác của ngày hôm nay: ngày {call} thôi là “người mới” và bắt đầu trở thành “người đi trước” của ai đó.' },
        { sp: 'Chị trưởng ca', jp: 'お{疲|つか}れさまでした。{明日|あした}も、よろしくお{願|ねが}いします。', text: 'Chị trưởng ca chào từ phía sau, vẫn câu nói quen thuộc mỗi cuối ca: “Vất vả rồi. Ngày mai cũng mong được em giúp đỡ nhé.”' }
      ],
      outro: 'Một tháng ở nhà máy thực phẩm 大阪 dạy {name} một vòng tròn đẹp: được chỉ dạy, làm được việc, rồi chỉ dạy lại. Kiến thức không mất đi khi truyền lại — nó nhân lên. Và từ hôm nay, ở cuối dây chuyền lạnh ấy, có một người kiểm phẩm mà cả ca đều tin tưởng.'
    },

    'talk-shokuhin': {
      scene: '🍜 Nhà máy thực phẩm 大阪 — giờ giải lao ca đêm: mì ly và chuyện quê nhà',
      wrong: {
        0: ['この{時間|じかん}のラーメンは、{特|とく}に{寒|さむ}くて{美味|おい}しいです。', 'カップラーメンは{夜中|よなか}に{泳|およ}ぐと{美味|おい}しいです。'],
        1: ['{家族|かぞく}と{電話|でんわ}すると、{疲|つか}れが{半分|はんぶん}{食|た}べられます。', '{電話|でんわ}の{後|あと}は、{体|からだ}がご{飯|はん}になります。']
      },
      lines: [
        { sp: 'Anh công nhân', jp: '{休憩|きゅうけい}だ。{夜中|よなか}のカップラーメン、{格別|かくべつ}だよな。', vi: 'Đến giờ giải lao rồi. Mì ly ăn lúc nửa đêm đúng là ngon đặc biệt nhỉ.' },
        { sp: 'hero', jp: 'そうですね。{寒|さむ}いラインの{後|あと}だから、{温|あたた}かさが{体|からだ}にしみます。', vi: 'Đúng vậy ạ. Vừa từ chuyền lạnh ra nên hơi ấm thấm vào người dễ chịu lắm ạ.' },
        { sp: 'Chị trưởng ca', jp: '{無理|むり}をしないで、{休憩|きゅうけい}はしっかり{休|やす}んでくださいね。{後半|こうはん}も{長|なが}いですよ。', vi: 'Đừng cố quá, giờ giải lao thì phải nghỉ cho đàng hoàng nhé. Nửa ca sau còn dài đấy.' },
        { sp: 'hero', jp: 'はい。さっき{家族|かぞく}からメッセージが{来|き}て、{元気|げんき}が{出|で}ました。', vi: 'Vâng ạ. Lúc nãy gia đình vừa nhắn tin tới, em thấy có thêm động lực hẳn ạ.' },
        { sp: 'Anh công nhân', jp: 'それが{一番|いちばん}の{薬|くすり}だよ。さあ、{食|た}べたらもうひと{頑張|がんば}りだ。', vi: 'Đó là liều thuốc tốt nhất đấy. Nào, ăn xong thì cố thêm một chặng nữa nhé.' },
        { sp: 'hero', jp: 'はい、{頑張|がんば}ります。あと{少|すこ}しで{朝|あさ}ですね。', vi: 'Vâng, em sẽ cố gắng ạ. Còn một chút nữa là tới sáng rồi ạ.' }
      ],
      outro: 'Hơi mì ly bốc lên giữa phòng nghỉ lúc ba giờ sáng, quyện với câu chuyện quê nhà nói dở. Ca đêm ở 大阪 dài thật, nhưng {name} chưa bao giờ phải đi qua nó một mình.'
    }
  });
})();
