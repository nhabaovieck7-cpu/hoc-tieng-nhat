// data-opening.js — Cảnh MỞ ĐẦU bản 2D: chia tay ở sân bay Việt Nam (§6e/§12) + trên máy bay.
// Hội thoại ở sân bay Việt Nam = TIẾNG VIỆT là chính (đúng tinh thần "ngày lên đường"),
// lồng vài câu tiếng Nhật đầu tiên mà nhân vật chính đã học cấp tốc. Các cảnh chia tay dùng
// dạng 'branch' (lựa chọn lời đáp → hậu quả chỉ số Tình cảm + ghi sổ lời hứa qua FLOW.setFlag).
// Đăng ký vào DEMO_DATA bằng Object.assign — file này phải nạp SAU data.js, TRƯỚC engine.js.
(function () {
  'use strict';

  var INTRO = {
    scene: '✈️ Sảnh đi — ngày lên đường',
    sayLines: [
      { sp: 'narr', text: 'Sảnh đi đông như hội. {name} kéo hai chiếc vali nặng trĩu — một vali quần áo, một vali mì gói, cà phê và thuốc cảm mẹ nhét vào bằng được — đứng giữa biển người tiễn nhau.' },
      { sp: 'narr', text: 'Hành lý ký gửi đã xong. Chỉ còn ít phút nữa là phải qua cửa an ninh. Bên kia cửa đó, không ai quay lại ôm được nữa — mọi lời chưa nói, phải nói hết ở sảnh này.' },
      { sp: 'narr', text: 'Bố mẹ đang chờ ở phía trái sảnh, cạnh hàng ghế chờ. Còn ở góc cà phê bên phải, có một người nữa cũng đến từ rất sớm… {name} hít một hơi dài. Đi nói lời chia tay thôi.' }
    ]
  };

  var CHECKIN = {
    scene: '🧳 Quầy làm thủ tục',
    branch: [
      { sp: 'Nhân viên quầy', text: '"Chuyến bay VN310 đi Narita, hành khách làm thủ tục xong rồi ạ. Hai kiện ký gửi, một xách tay. Trước giờ bay 60 phút nhớ qua cửa an ninh nhé." — Cô nhân viên cười, trả lại hộ chiếu kẹp thẻ lên máy bay.' },
      { sp: 'narr', text: 'Lúc cân hành lý, {name} buột miệng đếm theo thói quen học cấp tốc: "Một… いち、hai… に、ba… さん — ba kiện tất cả!" Cô nhân viên bật cười: "Sang Nhật đếm giỏi thế này là ổn rồi đấy." Câu tiếng Nhật đầu tiên của {name} ở đời thật — đếm vali.' },
      { sp: 'Nhân viên quầy', text: '"À, cho tôi hỏi thêm một câu để kiểm tra an toàn: trong hành lý xách tay của anh/chị có pin dự phòng (sạc dự phòng) không ạ? Pin dự phòng bắt buộc phải để ở hành lý xách tay, tuyệt đối không được để trong vali ký gửi đâu ạ."' },
      {
        prompt: 'Nhân viên quầy hỏi về pin dự phòng. {name} đáp thế nào?',
        choice: [
          {
            label: '"Có ạ — pin dự phòng em để ở xách tay đây." (khai đúng, lấy pin ra trình)',
            note: 'Khai đúng về pin dự phòng — pin để ở hành lý xách tay, đúng quy định an toàn',
            say: [
              { sp: 'narr', text: '{name} mở túi xách tay, lấy cục pin dự phòng ra trình. Cô nhân viên gật đầu: "Đúng rồi ạ. Pin cứ để theo người thế này, lúc qua soi chiếu anh/chị lấy ra để riêng vào khay là được. Cảm ơn anh/chị đã hợp tác — chúc chuyến bay tốt lành!"' }
            ]
          },
          {
            label: '"Hình như… em để pin trong vali ký gửi rồi." (ấp úng)',
            note: 'Pin để nhầm trong vali ký gửi — mở vali lấy ra, chuyển lên xách tay cho an toàn',
            say: [
              { sp: 'narr', text: 'Cô nhân viên vẫn cười rất kiên nhẫn: "Không sao đâu, mình mở vali ký gửi ra, lấy pin chuyển lên xách tay là được ạ." Hai người lúi húi mở chiếc vali to, moi mãi mới thấy cục pin nằm lọt giữa đống mì gói mẹ nhét. Hơi mất thời gian một chút — nhưng an toàn là trên hết. Và {name} nhớ đời bài học hành lý đầu tiên: pin dự phòng luôn đi theo người, không bao giờ nằm trong vali ký gửi.' }
            ]
          }
        ]
      }
    ]
  };

  var FAMILY = {
    scene: '💞 Chia tay bố mẹ',
    branch: [
      { sp: 'narr', text: 'Bố mẹ đứng cạnh hàng ghế chờ. Mẹ mắt đỏ hoe nhưng cố cười, tay xách túi cam và gói xôi bọc lá: "Sang đó cất vào tủ lạnh, ăn dần. Đồ ăn bên đó đắt, lại lạ miệng." Bố đứng cạnh, ít nói như mọi khi, tay đút túi áo — cái túi có phong bì tiền ông dúi thêm hồi sáng.' },
      { sp: 'Mẹ', text: '"Đi sang bên đó, việc đầu tiên là giữ sức khỏe nghe con. Lạnh thì mặc ấm, ốm thì đi khám ngay, đừng tiếc tiền. Ăn uống đàng hoàng, đừng mì gói hoài. Có chuyện gì — bất cứ chuyện gì — là gọi về cho mẹ, nghe chưa?"' },
      { sp: 'Bố', text: 'Giọng bố trầm xuống, hơi run: "Nhà mình vay tiền cho con đi là để con đổi đời, không phải để con khổ. Sang đó làm không được thì về, nghe chưa. Đừng cố quá mà ốm ra đấy — người còn thì còn làm lại được."' },
      {
        prompt: 'Đáp lại bố mẹ thế nào?',
        choice: [
          {
            label: '"Con hứa sẽ cố gắng hết sức. Ba năm nữa con về — nhà mình hết nợ, bố mẹ không phải lo nữa."',
            fx: { love: 6, pressure: 2 }, note: 'Hứa với bố mẹ: sẽ cố gắng hết sức', flag: 'loi-hua-gia-dinh', value: 'het-suc',
            say: [
              { sp: 'narr', text: 'Mẹ không kìm được nữa — nước mắt chảy dài, ôm chầm lấy {name}: "Ừ… ừ, con mẹ giỏi lắm. Đi mạnh giỏi, mẹ ở nhà chờ." Bố quay mặt đi, đưa tay dụi mắt rất nhanh, tưởng không ai thấy.' },
              { sp: 'Mẹ', text: '"Tới nơi là nhắn tin ngay. Ăn cơm chưa cũng phải nhắn. Mẹ cầm điện thoại chờ đấy, đừng để mẹ ngóng."' }
            ]
          },
          {
            label: '"Bố mẹ yên tâm. Con vừa làm vừa học tiếng, tháng nào cũng gọi về, không để bố mẹ lo đâu."',
            fx: { love: 4 }, note: 'Trấn an bố mẹ: tháng nào cũng gọi về', flag: 'loi-hua-gia-dinh', value: 'goi-ve-deu',
            say: [
              { sp: 'narr', text: 'Mẹ gật đầu liên tục, tay vẫn nắm chặt tay {name} không buông: "Ừ, gọi về là được. Nghe giọng là mẹ biết khỏe hay ốm liền."' },
              { sp: 'Bố', text: '"Đi đi con. Sang đó nhớ: người ta tử tế thì mình tử tế lại. Đừng để ai bắt nạt, cũng đừng bắt nạt ai."' }
            ]
          },
          {
            label: '"…Con đi đây. Bố mẹ ở nhà giữ sức khỏe." (nói ngắn, quay đi nhanh)',
            fx: { love: 1, pressure: 2 }, note: 'Chia tay ngắn ngủn — còn nhiều điều chưa nói', flag: 'loi-hua-gia-dinh', value: 'ngan-ngun',
            say: [
              { sp: 'narr', text: 'Câu nói ngắn ngủn. {name} quay đi nhanh vì sợ đứng thêm một giây nữa là khóc trước mặt bố mẹ. Sau lưng, tiếng mẹ gọi với theo, nhỏ dần trong tiếng loa sân bay…' },
              { sp: 'narr', text: 'Có những lời không nói ra được ở sảnh sân bay. Có lẽ sẽ phải nói dần qua điện thoại, trong những ngày tháng sắp tới.' }
            ]
          }
        ]
      },
      { sp: 'narr', jp: '{行|い}ってきます。がんばります。', text: '{name} hít một hơi, nói câu tiếng Nhật đầu tiên của đời mình — nói với bố mẹ: 「行ってきます。がんばります。」(Con đi đây. Con sẽ cố gắng.) Bố mẹ chẳng hiểu tiếng Nhật, nhưng hiểu hết.' }
    ]
  };

  var LOVER = {
    scene: '💗 Chia tay Linh',
    branch: [
      { sp: 'narr', text: 'Linh đứng ở góc cà phê từ sớm, hai tay nắm chặt một chiếc khăn tay thêu và một cặp móc khóa. Ba tháng học tiếng cấp tốc ở trung tâm, hai đứa ngồi cạnh nhau — và giờ một đứa sắp bay sang bên kia đại dương.' },
      { sp: 'Linh', text: '"Sang đó lạnh lắm đấy. Nhớ mặc ấm, đừng có bỏ bữa như ở nhà. Ốm một mình bên đó là khổ lắm, biết chưa?" — Linh nói một tràng như đã tập trước ở nhà, nói nhanh vì sợ nói chậm là khóc.' },
      { sp: 'Linh', text: '"Mình nói thật nhé — mình đợi. Ba năm, mình đợi được. Nhưng {call} cũng phải giữ lời: tập trung học và làm, cuối tuần gọi cho mình. Hứa đi."' },
      {
        prompt: 'Trả lời Linh thế nào?',
        choice: [
          {
            label: 'Nhận khăn tay Linh thêu: "Mình giữ khăn này bên người. Đợi mình nhé — nhất định mình sẽ về."',
            fx: { love: 6 }, note: 'Nhận khăn tay thêu — hứa sẽ về', flag: 'qua-luu-niem', value: 'khan-tay-theu',
            say: [
              { sp: 'narr', text: 'Linh dúi chiếc khăn tay thêu hai chữ cái đầu tên hai đứa vào tay {name}, vừa khóc vừa cười: "Khăn này mình thêu cả tuần đấy. Nhớ nhà thì lấy ra xem — nhưng xem xong là phải cố lên, không được khóc như mình bây giờ."' },
              { sp: 'narr', text: 'Linh nói sẽ đợi. Ba năm — nói thì dễ, giữ được hay không lại là chuyện khác. Chỉ thời gian mới trả lời được. Nhưng ngày hôm nay, ở sảnh sân bay này, lời hứa ấy là thật. (Sổ lời hứa đã ghi lại ngày hôm nay.)' }
            ]
          },
          {
            label: 'Nhận một chiếc móc khóa đôi: "Một nửa của Linh, một nửa của mình. Xa nhau mà như gần nhau."',
            fx: { love: 4 }, note: 'Nhận móc khóa đôi', flag: 'qua-luu-niem', value: 'moc-khoa-doi',
            say: [
              { sp: 'narr', text: 'Linh tách cặp móc khóa, đeo một chiếc vào vali xách tay của {name}: "Đi đâu cũng mang theo đấy. Mất là mình giận thật." Hai đứa cười — nụ cười méo xệch vì cả hai đều đang cố không khóc.' },
              { sp: 'narr', text: 'Linh nói sẽ đợi. Ba năm — một khoảng thời gian dài hơn tất cả những gì hai đứa đã có với nhau. Lời hứa đã được ghi lại; còn giữ được tới đâu, những chương sau sẽ rõ.' }
            ]
          },
          {
            label: '"Thôi… đừng đợi mình. Ba năm dài lắm. Linh cứ sống tốt, có người tốt thì cứ đến với người ta."',
            fx: { love: -2, pressure: 2 }, note: 'Nói lời buông tay ngay ở sân bay', flag: 'loi-hua-lover', value: 'buong-tay',
            say: [
              { sp: 'narr', text: 'Linh sững người. Chiếc khăn tay thêu rơi khỏi tay Linh, nằm im trên ghế. "Sao… sao lại nói thế? Mình còn chưa kịp…" — Linh quay mặt đi, vai run lên.' },
              { sp: 'narr', text: '{name} nghĩ đó là tử tế. Nhưng có những câu nói ra ở sảnh chia tay sẽ theo cả hai người rất lâu. Chuyến đi này bắt đầu bằng một vết rạn — và không có lời hứa nào được ghi vào sổ hết.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Loa sân bay vang lên: "Hành khách chuyến bay VN310 đi Tokyo Narita, xin mời qua cửa kiểm soát an ninh." Đã đến lúc phải đi thật rồi.' }
    ]
  };

  var GATE = {
    scene: '✈️ Qua cửa an ninh',
    sayLines: [
      { sp: 'narr', text: '{name} đặt khay đồ lên băng chuyền, đưa hộ chiếu cho nhân viên an ninh. Qua khung dò kim loại, tiếng "bíp" vang lên khô khốc — như một dấu chấm hết cho phần đời ở nhà.' },
      { sp: 'narr', text: 'Đi được vài bước, {name} quay lại nhìn qua tấm kính lớn. Phía bên kia, bố mẹ và Linh vẫn đứng đó, nhỏ dần. Mẹ vẫn đang vẫy tay. Ở bên này kính, không ai vẫy lại được nữa rồi — chỉ còn biết giơ tay thật cao.' },
      { sp: 'narr', text: '"Đi mạnh giỏi nhé con!" — không nghe thấy tiếng, chỉ đọc được khẩu hình của mẹ. {name} gật đầu thật mạnh, rồi quay lưng bước nhanh về cửa lên máy bay. Từ giờ phút này, mọi thứ đều phải tự lo.' }
    ]
  };

  var FLIGHT = {
    scene: '✈️ Trên đường sang Nhật',
    sayLines: [
      { sp: 'narr', text: 'Máy bay rời đường băng. Thành phố quê hương nhỏ dần dưới cánh — những mái nhà, con sông, rồi chỉ còn mây. {name} ôm chặt ba lô vào lòng: trong túi áo là vật kỷ niệm của ngày hôm nay, và trong đầu là một mớ câu tiếng Nhật học vẹt chưa biết dùng vào đâu.' },
      { sp: 'narr', text: 'Loa khoang vang lên, lần này bằng tiếng Nhật thật: 「まもなく、成田空港に到着いたします。」{name} chỉ nghe lõm bõm được hai chữ "Narita" và "到着" (tới nơi) — vậy mà tim đập thình thịch. Sắp thật rồi.' },
      { sp: 'narr', text: '{name} thiếp đi một lúc. Mở mắt ra, ngoài cửa sổ là biển mây nhuộm nắng chiều, và rất xa phía dưới, đất Nhật Bản lần đầu tiên hiện ra: những ô ruộng xanh ngăn nắp như bàn cờ. "Mình tới rồi." — câu đầu tiên của một đời mới.' }
    ]
  };

  var WINDOW = {
    scene: '🪟 Cửa sổ máy bay',
    branch: [
      { sp: 'narr', text: 'Ngoài cửa sổ, mây trôi dưới cánh máy bay như một biển bông. {name} chợt nghĩ: lúc này ở nhà, mẹ chắc đang dọn lại cái phòng trống, còn Linh chắc đang trên đường về, tay vẫn cầm chiếc móc khóa còn lại.' },
      { sp: 'narr', text: 'Bay năm tiếng mà như đi qua hai cuộc đời. Bên dưới là đại dương — ranh giới mờ nhất và cũng rõ nhất giữa "ở nhà" và "đi xa".' },
      {
        prompt: 'Chuyến bay còn dài. Bên cửa sổ này, {name} làm gì?',
        choice: [
          {
            label: 'Mở sổ tay, ôn lại 5 câu chào tiếng Nhật',
            fx: { jp: 1 }, note: 'Ôn 5 câu chào tiếng Nhật trên máy bay',
            say: [
              { sp: 'narr', text: '{name} lật cuốn sổ tay chi chít chữ, nhẩm đi nhẩm lại: おはようございます、こんにちは、すみません、ありがとうございます、よろしくお願いします. Năm câu chào — nhẩm đến thuộc lòng. Xuống máy bay là dùng được ngay.' }
            ]
          },
          {
            label: 'Ngồi yên, nghĩ về nhà',
            fx: { love: 1, pressure: 1 }, note: 'Nghĩ về nhà trên máy bay',
            say: [
              { sp: 'narr', text: '{name} tựa trán vào ô cửa sổ mát lạnh. Ở nhà giờ này, mẹ chắc đang gấp lại cái chăn trong căn phòng vừa trống, còn bố chắc ngồi uống trà một mình ngoài hiên. Mắt cay cay — nhưng {name} không để nước mắt rơi. Đã đi, là phải đi cho tới nơi.' }
            ]
          },
          {
            label: 'Chợp mắt một lúc, lấy sức',
            fx: { hp: 2 }, note: 'Chợp mắt trên máy bay, lấy sức cho ngày đầu ở Nhật',
            say: [
              { sp: 'narr', text: '{name} kéo tấm chăn mỏng lên vai, nhắm mắt lại. Ngủ một giấc ngắn thôi — mở mắt ra là đất Nhật, và một cuộc đời mới đang chờ ở ngay cửa máy bay.' }
            ]
          }
        ]
      }
    ]
  };

  var OBAASAN = {
    scene: '🛍️ Phố mua sắm — bà cụ đi chợ',
    branch: [
      { sp: 'narr', text: 'Ở phố mua sắm, một bà cụ khệ nệ xách hai túi đồ chợ nặng trĩu, bước đi chậm chạp, lưng hơi còng. {name} vội bước tới đỡ lấy một túi: "Bà ơi, để cháu xách giúp bà một đoạn." Bà cụ ngước lên, mắt cười híp lại sau cặp kính lão.' },
      { sp: 'Bà cụ', jp: 'あら、ありがとうねえ。{重|おも}いでしょう、{悪|わる}いねえ。', text: 'Ôi, cảm ơn cháu nhé. Nặng lắm phải không, phiền cháu quá.' },
      { sp: 'Bà cụ', jp: 'あんた、この{辺|へん}の{子|こ}じゃないね。{最近|さいきん}、こっちへ{引|ひ}っ{越|こ}してきたの？', text: 'Cháu không phải người quanh khu này nhỉ. Mới chuyển tới đây à cháu?' },
      { sp: 'narr', text: '{name} gật đầu, xách túi đồ đi chầm chậm bên cạnh bà. Qua vài câu chuyện vụn, bà biết ngay: đây là một đứa trẻ Việt Nam mới sang Nhật, ở một mình trong căn phòng nhỏ đầu phố.' },
      { sp: 'Bà cụ', jp: '{若|わか}いんだから、ご{飯|はん}はしっかり{食|た}べなさい。{一人|ひとり}だと、つい{適当|てきとう}になっちゃうからね。', text: 'Còn trẻ thì phải ăn uống cho đàng hoàng vào. Ở một mình là hay ăn uống qua loa lắm đấy, cháu ạ.' },
      { sp: 'Bà cụ', jp: 'これ、あんたにあげるよ。うちの{畑|はたけ}の{野菜|やさい}。おすそ{分|わ}けってやつだよ。', text: 'Đây, bà cho cháu này. Rau trong vườn nhà bà đấy. Người ta gọi là "osusowake" — có gì ngon thì chia sẻ một ít cho hàng xóm, cháu ạ.' },
      {
        prompt: 'Bà cụ dúi túi rau vào tay {name}. Đáp lại thế nào?',
        choice: [
          {
            label: 'Nhận và đáp lễ bằng tiếng Nhật vừa học: 「ありがとうございます、おすそ分けですね」',
            fx: { love: 2, jp: 1 }, note: 'Nhận rau chia sẻ của bà cụ, đáp lễ đúng câu tiếng Nhật',
            say: [
              { sp: 'Bà cụ', jp: 'そうそう、その{返事|へんじ}でいいんだよ。{上手|じょうず}、{上手|じょうず}。', text: 'Đúng rồi, đúng rồi — đáp lễ như thế là chuẩn đấy cháu. Giỏi, giỏi lắm. (Khi nhận đồ người ta chia cho, người Nhật đáp "Cảm ơn bà, đây là đồ chia sẻ phải không ạ" — vừa cảm ơn, vừa nhắc lại tấm lòng của người cho.)' },
              { sp: 'narr', text: 'Bà cụ gật gù, mắt cười híp lại, còn cẩn thận dạy {name} cách đáp lễ thêm một lần nữa cho thuộc. Túi rau trong tay bỗng nặng hơn một chút — nặng cái tình hàng xóm.' }
            ]
          },
          {
            label: 'Từ chối khéo vì ngại: "Dạ thôi ạ, cháu không dám nhận đâu…"',
            fx: { love: 0 }, note: 'Ngại nên từ chối khéo túi rau của bà cụ',
            say: [
              { sp: 'Bà cụ', jp: 'あらあら、{今|いま}の{若|わか}い{人|ひと}は{遠慮|えんりょ}がちだねえ。', text: 'Ôi chao, người trẻ bây giờ hay ngại ghê.' },
              { sp: 'narr', text: 'Bà cụ cười xòa, không ép nữa, chỉ vỗ nhẹ vào tay {name} rồi đi tiếp. Túi rau vẫn nằm trong tay bà — còn {name} thì cứ áy náy mãi suốt quãng đường về phòng.' }
            ]
          },
          {
            label: 'Nhận, và hẹn hôm sau mang ít bánh quê Việt sang đáp lễ',
            fx: { love: 3, money: -0.02 }, note: 'Nhận rau của bà cụ, hẹn mang bánh quê Việt đáp lễ',
            say: [
              { sp: 'narr', text: '{name} hai tay nhận túi rau, cúi đầu cảm ơn rối rít, rồi hẹn: "Ngày mai cháu mang ít bánh quê Việt Nam sang biếu bà đáp lễ nhé." Bà cụ cười tươi, gật đầu liên tục.' },
              { sp: 'Bà cụ', jp: 'ベトナムの{お菓子|かし}かい。{楽|たの}しみにしてるよ。', text: 'Bánh kẹo Việt Nam à cháu. Thế thì bà mong chờ lắm đấy nhé.' }
            ]
          }
        ]
      },
      { sp: 'Bà cụ', jp: 'あ、そうだ。{通|とお}りの{頭|あたま}のスーパーはね、{夕方|ゆうがた}の5{時|じ}ごろ、{野菜|やさい}に{半額|はんがく}シールがつくんだよ。{覚|おぼ}えておきなさい。', text: 'À, phải rồi. Cái siêu thị ở đầu phố ấy — tầm 5 giờ chiều là rau củ được dán tem giảm giá một nửa đấy. Nhớ mà canh giờ ra mua nhé cháu.' },
      { sp: 'narr', text: '{name} tiễn bà tới tận cửa nhà, rồi xách túi rau bà cho về phòng mình. Tối nay, bữa cơm ở khu phố mới sẽ có rau xanh vườn nhà — và một bài học đầu tiên về lòng tốt của hàng xóm ở Nhật.' }
    ]
  };

  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {
    'airport-intro': INTRO, 'airport-checkin': CHECKIN, 'airport-family': FAMILY,
    'airport-lover': LOVER, 'airport-gate': GATE, 'flight': FLIGHT,
    'flight-window': WINDOW, 'shotengai-obaasan': OBAASAN
  });
})();
