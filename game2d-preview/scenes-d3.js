// scenes-d3.js — Hội thoại ĐẦY ĐỦ đợt 3 cho 5 bối cảnh đi làm (khách sạn / kho vận /
// xưởng sửa ô tô / bếp nhà hàng) của game 2D «TUỔI TRẺ Ở NHẬT» (staging — chưa đẩy main).
// Thể ngữ theo ngành: khách sạn = kính ngữ phục vụ chuẩn cao, dịu mà khắt khe;
// kho vận = nhanh, thực dụng, chính xác và an toàn xe nâng là trên hết;
// xưởng sửa ô tô = chủ xưởng nói thể thường, ít lời, trọng uy tín và con số thật;
// bếp nhà hàng = trong bếp nói cụt kiểu bếp, ra ngoài với khách chuyển kính ngữ ngay.
// Cảnh kaiwa dùng { scene, lines, wrong, outro } — wrong đánh số theo THỨ TỰ CÂU HERO
// (từ 0), mỗi câu hero có đúng 2 đáp án sai kiểu lỗi người Việt mới học.
// Cảnh branch dùng { scene, branch } — mỗi choice có 3 lựa chọn, fx chỉ thuộc
// nhóm jp / money / hp / love / risk. Tên địa danh, cơ sở theo bảng địa danh places.js.
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  'hotel-senpai': {
    scene: '🛏️ Khách sạn — senpai Kato kiểm tra phòng 302',
    lines: [
      { sp: 'Senpai Kato', jp: '{今日|きょう}は302{号室|ごうしつ}を{一緒|いっしょ}に{確認|かくにん}します。シーツの{角|かど}、{髪|かみ}の{毛|け}{一本|いっぽん}まで、よーく{見|み}てくださいね。', vi: 'Hôm nay chị cùng em kiểm tra phòng 302 nhé. Nhìn thật kỹ vào, từ góc ga giường cho tới một sợi tóc cũng không được sót đâu em.' },
      { sp: 'Senpai Kato', jp: 'この{部屋|へや}には{連泊|れんぱく}の{お客様|きゃくさま}が{泊|と}まっています。ドアの{前|まえ}で、まず{何|なん}をしますか。', vi: 'Phòng này có khách đang ở tiếp nhiều ngày đấy. Đứng trước cửa phòng, đầu tiên em làm gì nào?' },
      { sp: 'hero', jp: 'ドアを3{回|かい}ノックして、「{失礼|しつれい}いたします」と{言|い}ってから{入|はい}ります。', vi: 'Em gõ cửa 3 lần, nói "Xin phép ạ" rồi mới vào ạ.' },
      { sp: 'Senpai Kato', jp: '{正解|せいかい}です。{声|こえ}は{大|おお}きすぎず、でもはっきりと。お{客様|きゃくさま}への{最初|さいしょ}の{挨拶|あいさつ}ですからね。', vi: 'Đúng rồi. Giọng vừa đủ nghe nhưng phải rõ ràng nhé. Đó là lời chào đầu tiên dành cho khách đấy.' },
      { sp: 'Senpai Kato', jp: '{中|なか}の{清掃|せいそう}が{終|お}わりましたね。では、フロントへ{報告|ほうこく}をお{願|ねが}いします。どう{言|い}いますか。', vi: 'Trong phòng dọn xong rồi nhỉ. Vậy em báo cáo cho quầy lễ tân giúp chị. Em sẽ nói thế nào?' },
      { sp: 'hero', jp: '302{号室|ごうしつ}、{清掃|せいそう}が{終|お}わりました。{確認|かくにん}をお{願|ねが}いいたします。', vi: 'Phòng 302, việc dọn dẹp đã xong ạ. Xin kiểm tra giúp em ạ.' },
      { sp: 'Senpai Kato', jp: 'はい、{短|みじか}くて{正確|せいかく}。いい{報告|ほうこく}です。では{廊下|ろうか}へ…あ、お{客様|きゃくさま}が{来|き}ましたよ。', vi: 'Ừ, ngắn gọn mà chính xác. Báo cáo tốt đấy. Nào, ra hành lang thôi… À, có khách đang đi tới kìa em.' },
      { sp: 'hero', jp: 'こんにちは、いらっしゃいませ。', vi: '(Dừng hẳn tay, đứng thẳng người, mỉm cười cúi chào) Chào buổi trưa ạ, hoan nghênh quý khách ạ.' },
      { sp: 'Khách', jp: 'ありがとうございます。{笑顔|えがお}がいいですね。エレベーターはどちらですか。', vi: 'Cảm ơn em. Nụ cười dễ chịu quá. Cho tôi hỏi thang máy ở phía nào vậy?' },
      { sp: 'Senpai Kato', jp: 'お{客様|きゃくさま}が{行|い}きましたね。{最後|さいご}にリネンを{確認|かくにん}しましょう。タオルは{何枚|なんまい}ありますか。', vi: 'Khách đi rồi nhỉ. Cuối cùng, kiểm tra đồ vải nào. Khăn tắm có mấy chiếc vậy em?' },
      { sp: 'hero', jp: 'すみません、タオルが{一枚|いちまい}{足|た}りません。すぐに{持|も}ってきます。', vi: 'Xin lỗi chị, khăn tắm thiếu một chiếc ạ. Em đi lấy ngay ạ.' },
      { sp: 'Senpai Kato', jp: 'すぐに{言|い}ってくれて、ありがとう。{足|た}りないことは、{隠|かく}さず{報告|ほうこく}。それが{一番|いちばん}{大切|たいせつ}です。', vi: 'Cảm ơn em đã báo ngay. Việc thiếu đồ thì không giấu, phải báo cáo. Điều đó là quan trọng nhất đấy.' },
      { sp: 'Senpai Kato', jp: 'あ、ベッドの{上|うえ}。{髪|かみ}の{毛|け}が{一本|いっぽん}、{残|のこ}っていますよ。', vi: 'À, trên giường kìa. Còn sót một sợi tóc đấy em.' },
      { sp: 'hero', jp: 'すみません、すぐ{取|と}ります。{髪|かみ}の{毛|け}{一本|いっぽん}まで、{気|き}をつけます。', vi: 'Em xin lỗi, em gỡ ngay ạ. Em sẽ để ý tới từng sợi tóc một ạ.' }
    ],
    wrong: {
      0: ['「{入|はい}るよ」と{言|い}って、ノックしないでドアを{開|あ}けます。', 'ノックして、「こんにちは」とだけ{言|い}って{入|はい}ります。'],
      1: ['302{号室|ごうしつ}、{掃除|そうじ}、{終|お}わったよ。', '301{号室|ごうしつ}、{清掃|せいそう}が{終|お}わりました。'],
      2: ['こんにちは、{元気|げんき}？{部屋|へや}はあっちだよ。', 'おはようございます。またね。'],
      3: ['タオルは{大丈夫|だいじょうぶ}です。{数|かず}は{言|い}いません。', 'タオルが{足|た}りないけど、あとでいいよ。{今|いま}は{言|い}わない。'],
      4: ['うん、わかった。{髪|かみ}の{毛|け}は{小|ちい}さいから、{大丈夫|だいじょうぶ}だよ。', 'その{髪|かみ}の{毛|け}はお{客様|きゃくさま}のだから、{置|お}いておきます。']
    },
    outro: 'Cuối buổi kiểm tra, chị Kato gấp lại chiếc khăn cuối cùng, lướt ngón tay lên mặt bàn một lần nữa rồi mới gật đầu cho qua. Chị nói nhỏ: ở khách sạn お台場, khách không nhớ hết những việc mình làm đúng — nhưng một sợi tóc sót trên gối thì khách nhớ rất lâu. {name} chợt hiểu: khách đánh giá cả một khách sạn chỉ bằng một sợi tóc, và đánh giá người làm phòng bằng việc có dám báo ngay một chiếc khăn thiếu hay không. Báo ngay không làm mình kém đi — nó mới là thứ làm nên một người làm dịch vụ đáng tin, {call} ạ.'
  },
  'soko-leader': {
    scene: '📦 Kho vận — anh Mori phát máy quét buổi ca',
    branch: [
      { sp: 'narr', text: 'Kho 千葉{物流|ぶつりゅう}, 7 giờ sáng. Xe tải đã xếp hàng ở cửa xuất, băng chuyền còn im, và anh Mori — tổ trưởng ca — đang đứng bên kệ máy quét, phát từng chiếc một cho cả đội. Tới lượt {name}, anh đưa máy kèm câu dặn nhanh như mọi ngày.' },
      { sp: 'Anh Mori', jp: '{今日|きょう}の{出荷|しゅっか}は300{個|こ}、{夕方|ゆうがた}5{時|じ}までだ。これ、スキャナー。{落|お}とすなよ。', text: 'Anh Mori nói: "Xuất hàng hôm nay là 300 kiện, hạn tới 5 giờ chiều. Máy quét của em đây. Đừng làm rơi đấy nhé." — Anh nói nhanh, nhưng con số nào cũng rõ như in.' },
      { sp: 'Anh Mori', jp: '{出荷|しゅっか}は{正確|せいかく}さが{命|いのち}だ。バーコードは{必|かなら}ず2{回|かい}{確認|かくにん}。フォークリフトの{近|ちか}くでは{走|はし}らない、{近道|ちかみち}しない。', text: 'Anh dặn tiếp: "Xuất hàng thì sự chính xác là sinh mạng. Mã vạch phải kiểm tra hai lần. Gần xe nâng thì không chạy, không đi tắt."' },
      { sp: 'narr', text: '{name} đẩy xe đẩy tới dãy kệ số 2, bắt đầu quét từng kiện. Nhịp việc đang đều thì trước mặt hiện ra một thùng carton to, nhãn dán ghi rõ: 25kg. Một mình bê thùng này xuống xe đẩy không phải chuyện đùa.' },
      { sp: 'Anh Mori', jp: 'おい、その{箱|はこ}は25キロあるぞ。{重|おも}い{荷物|にもつ}のとき、どうするんだっけ。', text: 'Anh Mori từ đầu dãy kệ gọi với sang: "Này, thùng đó nặng 25 ký đấy. Gặp hàng nặng thì phải làm thế nào, còn nhớ không?"' },
      {
        prompt: 'Thùng hàng 25kg ngay trước mặt — {name} xử lý thế nào?',
        choice: [
          {
            label: 'Gọi đồng đội tới bê cùng hai người, đúng quy tắc an toàn',
            fx: { love: 1, hp: 1 }, note: 'Gọi đồng đội bê hai người — an toàn, lại được anh Mori gật đầu',
            say: [
              { sp: 'narr', text: '{name} không chạm vào thùng vội, gọi to sang dãy kệ bên: "Thùng này nặng, qua giúp em một tay với!" Anh đồng đội chạy tới, hai người đếm "một, hai" rồi cùng nhấc — thùng hàng lên xe đẩy nhẹ tênh.' },
              { sp: 'Anh Mori', jp: '{声|こえ}をかけろ、それでいいんだ。{二人|ふたり}でやれば{早|はや}いし、{安全|あんぜん}だ。', text: 'Anh Mori gật đầu: "Cứ cất tiếng gọi đồng đội, thế là đúng rồi. Làm hai người vừa nhanh vừa an toàn."' }
            ]
          },
          {
            label: 'Cố bê một mình cho nhanh, khỏi phiền ai',
            fx: { hp: -4 }, note: 'Bê một mình 25kg — lưng kêu cái rắc, đau ê ẩm cả buổi',
            say: [
              { sp: 'narr', text: '{name} cắn răng ôm thùng hàng nhấc lên một mình. Được nửa đường, lưng dưới kêu "rắc" một tiếng nhỏ mà lạnh sống lưng — đặt được thùng xuống xe đẩy thì mồ hôi đã vã ra, eo đau ê ẩm.' },
              { sp: 'Anh Mori', jp: '{無理|むり}するなって{言|い}っただろう。{腰|こし}を{壊|こわ}したら、{一|いっ}か{月|げつ}は{休|やす}みだぞ。', text: 'Anh Mori chạy tới, giọng mắng mà nghe như lo: "Anh đã bảo đừng cố quá sức. Lưng mà hỏng là nghỉ cả tháng đấy, biết chưa."' }
            ]
          },
          {
            label: 'Để thùng nặng lại đó, cuối ca quay lại tính sau',
            fx: { risk: 2 }, note: 'Để lại cuối ca — đơn xuất không chờ ai, suýt trễ cả chuyến xe',
            say: [
              { sp: 'narr', text: '{name} đẩy xe đi qua thùng nặng như không thấy. Chưa đầy mười phút sau, tiếng anh Mori đã vang lên từ phía cửa xuất hàng.' },
              { sp: 'Anh Mori', jp: '{出荷|しゅっか}の{車|くるま}は{待|ま}ってくれないぞ。{後回|あとまわ}しにした{荷物|にもつ}は、{忘|わす}れる{元|もと}だ。', text: 'Anh nhắc ngay: "Xe xuất hàng không chờ ai đâu. Hàng để lại tính sau là nguồn cơn của quên và sót đấy. Quay lại xử lý luôn, gọi thêm người mà bê."' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Tới gần trưa, số kiện trên bảng đếm nhảy đều: 120, 180, 240… Đội kho vào guồng, tiếng máy quét "bíp, bíp" đều như nhịp trống. Rồi một kiện hàng khiến máy của {name} im bặt: mã vạch in mờ, quét ba lần vẫn không nhận.' },
      { sp: 'Anh Mori', jp: 'バーコードが{薄|うす}い{箱|はこ}か。{時々|ときどき}あるんだ。どうする？', text: 'Anh Mori đi ngang, liếc qua là hiểu ngay: "Mã vạch bị mờ à? Thỉnh thoảng vẫn có kiện như thế. Em xử lý sao đây?"' },
      {
        prompt: 'Mã vạch mờ, quét mãi không được — {name} làm gì?',
        choice: [
          {
            label: 'Nhập tay dãy số dưới mã vạch, rồi kiểm tra lại hai lần',
            fx: { jp: 2 }, note: 'Nhập tay + kiểm hai lần — đúng quy trình chuẩn của kho',
            say: [
              { sp: 'narr', text: '{name} nheo mắt đọc dãy số in dưới mã vạch, gõ tay từng số vào máy, đọc lại lần một, đối chiếu lần hai với nhãn thùng — khớp. Máy kêu "bíp" một tiếng giòn, kiện hàng được qua cửa xuất.' },
              { sp: 'Anh Mori', jp: 'それが{正|ただ}しいやり{方|かた}だ。{手入力|てにゅうりょく}して、2{回|かい}{確認|かくにん}。{完璧|かんぺき}だ。', text: 'Anh Mori vỗ vai: "Đó mới là cách làm đúng. Nhập tay, rồi kiểm tra hai lần. Hoàn hảo."' }
            ]
          },
          {
            label: 'Lau mã vạch bằng tay áo rồi quét đi quét lại mãi',
            fx: { jp: 1 }, note: 'Quét đi quét lại gần chục lần — cuối cùng vẫn phải nhập tay',
            say: [
              { sp: 'narr', text: '{name} lấy tay áo chà lên mã vạch, quét lại. Lần bốn, lần bảy, lần mười — máy vẫn im lặng, hàng phía sau bắt đầu dồn lại thành một hàng ngắn.' },
              { sp: 'Anh Mori', jp: '{時間|じかん}がもったいないぞ。{読|よ}めないときは{手入力|てにゅうりょく}だ。{覚|おぼ}えておけ。', text: 'Anh Mori nhắc: "Phí thời gian quá. Không quét được thì nhập tay — nhớ lấy cách này nhé." {name} nhập tay dãy số, kiểm hai lần, kiện hàng qua cửa trong nửa phút.' }
            ]
          },
          {
            label: 'Đoán số cuối bị mờ rồi quét cho qua',
            fx: { risk: 2 }, note: 'Đoán số cuối — suýt xuất nhầm kiện sang cửa hàng khác',
            say: [
              { sp: 'narr', text: '{name} đoán đại con số cuối cùng bị mờ và bấm xác nhận. Máy báo xanh — nhưng khi anh Mori kiểm tra chéo ở cửa xuất, mã kiện này thuộc về một cửa hàng khác hẳn. Chỉ chậm một nhịp nữa thôi là kiện hàng đã lên nhầm xe.' },
              { sp: 'Anh Mori', jp: '{数字|すうじ}は{当|あ}てものじゃないぞ。{読|よ}めないときは{手入力|てにゅうりょく}、そして2{回|かい}{確認|かくにん}。これが{手順|てじゅん}だ。', text: 'Anh nghiêm giọng, chỉ lại cách xử lý chuẩn: "Số má không phải để đoán mò. Không quét được thì nhập tay, rồi kiểm tra hai lần. Đó là quy trình — làm đúng quy trình thì không bao giờ xuất nhầm."' }
            ]
          }
        ]
      },
      { sp: 'Anh Mori', jp: '300{個|こ}、{全部|ぜんぶ}{出|で}た。{時計|とけい}は5{時|じ}ちょうどだ。{正確|せいかく}で、{事故|じこ}なし。いい{仕事|しごと}だった。', text: 'Đúng 5 giờ chiều, anh Mori nhìn bảng đếm rồi tuyên bố: "300 kiện, xuất hết. Đúng giờ. Chính xác, không tai nạn. Hôm nay làm tốt."' },
      { sp: 'narr', text: 'Kết ca đúng giờ, {name} trả máy quét về kệ, lưng còn nguyên vẹn, sổ xuất hàng không một dòng sai. Anh Mori đã quay đi kiểm xe cuối, chỉ giơ tay vẫy một cái — ở kho này, thế là lời khen to nhất rồi.' }
    ]
  },
  'seibi-boss': {
    scene: '🔧 Xưởng sửa ô tô — chú Ito giao việc đầu ngày',
    branch: [
      { sp: 'narr', text: 'Xưởng 豊田{自動車|じどうしゃ} nằm ở góc phố, cửa cuốn mở hé, mùi dầu máy thoang thoảng. Chú Ito — chủ xưởng kiêm thợ cả, tay còn dính dầu — đã đứng sẵn bên chiếc xe đỏ trên cầu nâng, tay cầm bảng việc của ngày.' },
      { sp: 'Chú Ito', jp: '{今日|きょう}はあの{赤|あか}い{車|くるま}の{車検整備|しゃけんせいび}だ。{頼|たの}むぞ。', text: 'Chú nói ngắn như mọi khi: "Hôm nay làm bảo dưỡng đăng kiểm cho chiếc xe đỏ kia. Nhờ cả vào cháu đấy."' },
      { sp: 'Chú Ito', jp: 'ブレーキだけは{二重|にじゅう}に{点検|てんけん}しろ。ブレーキは{命|いのち}そのものだ。', text: 'Chú hạ giọng, gõ nhẹ vào bánh xe: "Riêng phanh thì kiểm tra hai lượt cho chú. Phanh là chính mạng người đấy."' },
      { sp: 'Chú Ito', jp: '{客|きゃく}の{車|くるま}には、{自分|じぶん}の{車|くるま}みたいに{触|さわ}れ。{工具|こうぐ}は{使|つか}ったら、{必|かなら}ず{元|もと}の{場所|ばしょ}に{戻|もど}せ。', text: '"Xe của khách thì chạm vào như xe của mình. Dụng cụ dùng xong phải trả về đúng chỗ cũ." — Hai câu này chú nói mỗi sáng, như một lời thề của xưởng nhỏ.' },
      { sp: 'narr', text: '{name} nâng xe, tháo bánh trước, tháo cụm phanh ra kiểm tra lượt một, rồi đo lại lượt hai cho chắc. Con số trên thước đo khiến {name} khựng lại: má phanh đã mòn mỏng hơn mức chuẩn của hãng khá nhiều — mỏng tới mức không thể coi như không thấy.' },
      {
        prompt: 'Má phanh mòn hơn chuẩn rõ rệt — {name} xử lý thế nào?',
        choice: [
          {
            label: 'Báo chú Ito ngay, kèm con số đo được bằng thước',
            fx: { jp: 2, love: 1 }, note: 'Báo ngay kèm số đo — chú Ito gật đầu: thợ giỏi là người nói thật con số',
            say: [
              { sp: 'hero', jp: 'すみません、ブレーキパッドは3ミリしかありません。{基準|きじゅん}より{薄|うす}いです。', text: '{name} cầm thước đo tới báo ngay: "Chú ơi, má phanh chỉ còn 3mm thôi ạ. Mỏng hơn mức chuẩn rồi ạ."' },
              { sp: 'Chú Ito', jp: '{数|すう}を{正直|しょうじき}に{言|い}えるのが、いい{職人|しょくにん}だ。よく{見|み}つけた。', text: 'Chú Ito nhìn con số, gật đầu chậm rãi: "Nói thật được con số đo là thợ giỏi đấy. Phát hiện tốt lắm." Rồi chú quyết ngay: thay má phanh mới, và xưởng sẽ báo khách trước khi làm.' }
            ]
          },
          {
            label: 'Để vậy, chắc vẫn chạy thêm được một thời gian nữa',
            fx: { risk: 3 }, note: 'Im lặng cho qua — chú Ito kiểm tra lại và nghiêm giọng dạy một bài lớn',
            say: [
              { sp: 'narr', text: '{name} lắp lại bánh xe, tự nhủ "chắc vẫn chạy được". Nhưng chú Ito có thói quen kiểm tra chéo ngẫu nhiên vào cuối buổi — và hôm nay, chú chọn đúng chiếc xe đỏ.' },
              { sp: 'Chú Ito', jp: 'ブレーキは{命|いのち}だ。{薄|うす}いと{分|わ}かったら、その{場|ば}で{言|い}え。{黙|だま}るのが{一番|いちばん}{怖|こわ}いんだぞ。', text: 'Giọng chú trầm xuống, nghiêm hẳn: "Phanh là mạng người. Biết nó mòn thì nói ngay tại chỗ. Im lặng cho qua mới là điều đáng sợ nhất." Bài học này, {name} nghe một lần là nhớ cả đời thợ.' }
            ]
          },
          {
            label: 'Tự cầm điện thoại của xưởng gọi cho khách, hỏi có muốn thay luôn không',
            fx: { risk: 1 }, note: 'Vượt quyền rồi — chú Ito dạy lại trình tự báo cáo của xưởng',
            say: [
              { sp: 'narr', text: 'Muốn làm cho nhanh, {name} cầm điện thoại của xưởng, định gọi thẳng cho khách để hỏi thay má phanh luôn không. Điện thoại chưa kịp đổ chuông, chú Ito đã bước tới, nhẹ nhàng đặt tay lên máy.' },
              { sp: 'Chú Ito', jp: '{順番|じゅんばん}が{違|ちが}うぞ。まず{俺|おれ}に{報告|ほうこく}、それから{店|みせ}が{客|きゃく}に{聞|き}く。{勝手|かって}に{約束|やくそく}するな。', text: 'Chú dạy lại trình tự: "Sai thứ tự rồi cháu. Trước hết báo cho chú, sau đó xưởng mới gọi hỏi khách. Không được tự ý hứa hẹn gì với khách cả." {name} gật đầu — nhanh mà sai trình tự thì thành vượt quyền.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Má phanh mới được thay, kiểm tra lại hai lượt: đạp phanh chắc, bánh quay đều, không một tiếng lạ. Chú Ito tự mình ngồi vào ghế lái thử một vòng quanh xưởng rồi mới gật đầu cho hạ cầu nâng.' },
      { sp: 'narr', text: '{name} lau sạch từng món dụng cụ, trả về đúng ô vẽ sẵn trên bảng treo: cờ-lê theo cờ-lê, tua-vít theo tua-vít. Nhìn bảng dụng cụ đầy đủ không thiếu một ô, tự nhiên thấy lòng yên như vừa ký xong một lời hứa.' },
      { sp: 'Chú Ito', jp: '{約束|やくそく}は3{時|じ}だ。{時間|じかん}どおりに{渡|わた}せるな。{信用|しんよう}は、こうして{積|つ}むんだ。', text: 'Chú lau tay, nhìn đồng hồ: "Đã hứa với khách 3 giờ giao xe. Giao đúng giờ được rồi nhỉ. Uy tín của xưởng là tích lại từ những lần đúng giờ như thế đấy."' },
      { sp: 'narr', text: 'Đúng 3 giờ, chiếc xe đỏ lăn bánh ra khỏi xưởng, phanh êm, máy nổ giòn. {name} đứng ở cửa nhìn theo — hôm nay học được rằng ở xưởng này, thước đo không nói dối, và người thợ giỏi là người không giấu con số mà thước đo vừa nói.' }
    ]
  },
  'kitchen-manager': {
    scene: '👨‍🍳 Bếp nhà hàng — bếp trưởng Sato và hai thứ tiếng',
    lines: [
      { sp: 'Bếp trưởng Sato', jp: '{出|で}たよー！{定食|ていしょく}ひとつ、{急|いそ}いで！', vi: '(Trong bếp, giọng bếp trưởng vang lên nhanh và cụt như dao thái) Ra món rồi đây! Một suất cơm định thực, nhanh lên!' },
      { sp: 'hero', jp: 'はい、{定食|ていしょく}{一|ひと}つ{入|はい}ります！', vi: 'Vâng, một suất cơm định thực vào bếp ạ!' },
      { sp: 'Bếp trưởng Sato', jp: '{次|つぎ}、{焼|や}き{魚|ざかな}{二|ふた}つ。ご{飯|はん}はまだあるか。', vi: 'Tiếp theo, hai suất cá nướng. Cơm còn không đấy?' },
      { sp: 'hero', jp: 'すみません、ご{飯|はん}がもうすぐ{無|な}くなります。', vi: 'Em xin lỗi, cơm sắp hết rồi ạ.' },
      { sp: 'Bếp trưởng Sato', jp: 'すぐ{炊|た}いてくれ。あと、{包丁|ほうちょう}とまな{板|いた}は{洗|あら}ったか。{手|て}はどうだ。', vi: 'Nấu ngay một nồi mới giúp anh. À, dao với thớt rửa chưa? Tay thì sao?' },
      { sp: 'hero', jp: 'はい、{包丁|ほうちょう}とまな{板|いた}は{洗|あら}いました。{手|て}も{石|せっ}けんで{洗|あら}いました。', vi: 'Vâng, dao và thớt em rửa rồi ạ. Tay em cũng rửa bằng xà phòng rồi ạ.' },
      { sp: 'Khách', jp: 'すみません、{今日|きょう}のおすすめは{何|なん}ですか。', vi: '(Một vị khách ghé qua tấm rèm noren, hỏi vào) Xin lỗi, món gợi ý hôm nay của quán là gì vậy?' },
      { sp: 'hero', jp: 'いらっしゃいませ。{少々|しょうしょう}お{待|ま}ちくださいませ。{今|いま}、{聞|き}いてまいります。', vi: 'Hoan nghênh quý khách ạ. Xin quý khách đợi cho một lát ạ. Em vào hỏi giúp ngay ạ.' },
      { sp: 'Bếp trưởng Sato', jp: '{切|き}り{替|か}え、{早|はや}いな。{厨房|ちゅうぼう}の{言葉|ことば}と、{外|そと}の{言葉|ことば}は{別|べつ}だ。よし、{定食|ていしょく}のご{飯|はん}、できたか。', vi: 'Chuyển giọng nhanh đấy. Tiếng trong bếp với tiếng bên ngoài là hai thứ khác nhau mà. Rồi, cơm của suất định thực xong chưa?' },
      { sp: 'hero', jp: 'はい、できました！すぐ{出|だ}します！', vi: 'Vâng, xong rồi ạ! Em mang ra ngay ạ!' },
      { sp: 'Bếp trưởng Sato', jp: '{仕込|しこ}みの{前|まえ}に、{包丁|ほうちょう}、まな{板|いた}、{手|て}。もう{一度|いちど}{確認|かくにん}だぞ。', vi: 'Trước giờ chuẩn bị nguyên liệu, kiểm tra lại một lượt nữa nhé: dao, thớt, tay. Nhớ chưa?' },
      { sp: 'Bếp trưởng Sato', jp: '{厨房|ちゅうぼう}の{中|なか}はタメ{口|くち}でも、{外|そと}では{敬語|けいご}だ。それがプロだぞ。', vi: 'Trong bếp thì nói suồng sã cũng được, nhưng ra ngoài là phải kính ngữ. Thế mới là dân chuyên nghiệp đấy.' }
    ],
    wrong: {
      0: ['かしこまりました。{定食|ていしょく}を{一|ひと}つ、ただいま{心|こころ}を{込|こ}めて{準備|じゅんび}いたしますので、{少々|しょうしょう}お{待|ま}ちくださいませ。', 'オッケー、{定食|ていしょく}{二|ふた}つ、ちょっと{待|ま}ってて！'],
      1: ['ご{飯|はん}はまだ{大丈夫|だいじょうぶ}です。{無|な}くなったら{言|い}います。', 'ご{飯|はん}、もうないよ。{早|はや}く{炊|た}いてくれない？'],
      2: ['{包丁|ほうちょう}はまだ{洗|あら}っていません。{手|て}も{洗|あら}い{忘|わす}れました。', 'うん、{洗|あら}ったよ。{手|て}も{道具|どうぐ}もオッケーだよ。'],
      3: ['やあ、ちょっと{待|ま}ってね。{今|いま}、{中|なか}は{忙|いそが}しいんだ。', '{待|ま}って！すぐ{人|ひと}を{呼|よ}ぶから、そこで{立|た}ってて。'],
      4: ['はい、{厨房|ちゅうぼう}では{長|なが}い{敬語|けいご}で、{外|そと}ではタメ{口|くち}で{出|だ}します！', 'わかったよ、プロはどこでも{同|おな}じ{言|い}い{方|かた}だよ。']
    },
    outro: 'Tan ca trưa, bếp trưởng Sato lau con dao của mình, treo lên giá rồi nhắc lại câu chốt của ngày hôm nay — câu mà anh bảo {name} phải thuộc như thuộc đường về nhà: 「ちゅうぼうの なかは ためぐちでも、そとでは けいごだ。それがプロだぞ。」 Trong bếp thì nói cụt cho kịp việc, ra ngoài thì kính ngữ cho ra dáng nhà hàng. Hai thứ tiếng trong cùng một con người, chuyển qua chuyển lại trong một nhịp thở — {name} lẩm nhẩm học theo, thấy nghề bếp hóa ra cũng là một nghề của lời nói, {call} ạ.'
  },
  'kitchen-board': {
    scene: '🗓️ Bảng phân ca của bếp',
    branch: [
      { sp: 'narr', jp: '{昼|ひる}のシフトは10{時|じ}から14{時|じ}、{夜|よる}は17{時|じ}から21{時|じ}です。', text: 'Bảng phân ca của bếp 築地{食堂|しょくどう} treo ngay cạnh cửa ra vào: ca trưa 10 giờ tới 14 giờ được khoanh bút đỏ hai vòng — giờ "chiến trường" của bữa trưa; ca tối 17 giờ tới 21 giờ, yên hơn nhưng là giờ của khách tan làm.' },
      { sp: 'narr', jp: '{土曜日|どようび}は{予約|よやく}12{人|にん}。{洗|あら}い{場|ば}にもう{一人|ひとり}、{手|て}がほしいです。', text: 'Ở cột ghi chú cuối bảng, bếp trưởng viết tay một dòng: thứ Bảy này có tiệc đặt trước 12 người — quầy rửa chén cần thêm một tay nữa. Bát đĩa hôm tiệc thì ai làm bếp cũng biết: chúng xếp chồng lên như núi.' },
      { sp: 'Bếp trưởng Sato', jp: '{土曜日|どようび}の{夜|よる}は{忙|いそが}しいぞ。{皿|さら}も{客|きゃく}も、{倍|ばい}は{来|く}る。', text: 'Bếp trưởng Sato đứng sau lưng {name} từ lúc nào: "Tối thứ Bảy bận lắm đấy. Bát đĩa với khách kéo tới, gấp đôi ngày thường là ít."' },
      { sp: 'narr', text: '{name} đếm lại các ca của mình trong tuần trên bảng: trưa thứ Ba, trưa thứ Năm, trưa thứ Bảy — ba ca trưa, cộng thêm ca tối thứ Tư là bốn ca. Các buổi tối còn lại trong tuần đã kín lịch học, trừ mỗi… tối thứ Bảy.' },
      { sp: 'Bếp trưởng Sato', jp: '{今週|こんしゅう}の{土曜日|どようび}、{夜|よる}も{入|はい}れるか。{無理|むり}にとは{言|い}わない。{自分|じぶん}で{決|き}めろ。', text: 'Anh hỏi thẳng, không ép một câu: "Thứ Bảy tuần này, em vào thêm ca tối được không? Anh không ép đâu. Em tự quyết đi."' },
      { sp: 'narr', text: 'Tối thứ Bảy, {name} có buổi học online đã hứa trước với lớp — buổi ôn quan trọng, phải điểm danh đầy đủ mới được dự thi thử. Nhưng tiền công thêm một ca tối cũng quý thật, nhất là vào cuối tháng… {name} nhìn bảng phân ca, đứng lặng một lúc.' },
      {
        prompt: 'Nhận thêm ca tối thứ Bảy này không?',
        choice: [
          {
            label: 'Nhận ca tối thứ Bảy — thêm tiền, thêm kinh nghiệm đứng quầy rửa chén hôm tiệc',
            fx: { love: 1, hp: -2 }, note: 'Nhận ca tối thứ Bảy: đổi sức lấy tiền và kinh nghiệm — tối đó về nhà sẽ mệt rã rời, và phải chủ động xin đổi buổi học trước',
            say: [
              { sp: 'narr', text: '{name} ghi tên mình vào ô tối thứ Bảy, rồi nhắn ngay cho lớp học xin đổi buổi ôn sang sáng Chủ nhật — nhận ca thì nhận, nhưng lời hứa học hành cũng phải được xếp lại đàng hoàng, không bỏ ngang.' },
              { sp: 'Bếp trưởng Sato', jp: 'ありがとう、{助|たす}かる。{途中|とちゅう}で{休憩|きゅうけい}を{取|と}れよ。{倒|たお}れたら{元|もと}も{子|こ}もないぞ。', text: 'Bếp trưởng gật đầu: "Cảm ơn em, cứu anh một bàn thua đấy. Nhớ giữa ca phải nghỉ giải lao tử tế nhé. Gục xuống thì mất cả chì lẫn chài."' }
            ]
          },
          {
            label: 'Từ chối khéo: tối thứ Bảy em đã hứa buổi học online rồi ạ',
            fx: { jp: 1 }, note: 'Từ chối khéo mà rõ ràng — Sato gật đầu: giữ chữ tín cũng là một cái nghề',
            say: [
              { sp: 'hero', jp: 'すみません、{土曜日|どようび}の{夜|よる}はオンラインの{授業|じゅぎょう}があります。その{日|ひ}は{入|はい}れません。', text: '{name} nói rõ ràng, lễ phép: "Em xin lỗi, tối thứ Bảy em có buổi học online rồi ạ. Hôm đó em không vào ca được ạ."' },
              { sp: 'Bếp trưởng Sato', jp: '{約束|やくそく}を{守|まも}るのも、{仕事|しごと}のうちだ。{勉強|べんきょう}も{大事|だいじ}にしろ。', text: 'Bếp trưởng gật đầu ngay, không một chút phật ý: "Giữ được lời hứa cũng là một phần của nghề đấy. Học hành cũng phải coi trọng vào."' }
            ]
          },
          {
            label: 'Nhận đại đi, tới hôm đó trùng giờ học thì tính sau',
            fx: { risk: 2 }, note: 'Nhận lời là hứa — nhận đại rồi tính sau là cách làm mất lòng tin nhanh nhất',
            say: [
              { sp: 'narr', text: '{name} gật đầu nhận luôn cho xong chuyện, bụng nghĩ "tới hôm đó tính sau". Bếp trưởng Sato nhìn cái gật đầu quá nhanh ấy, gõ nhẹ cây bút vào bảng phân ca.' },
              { sp: 'Bếp trưởng Sato', jp: '{引|ひ}き{受|う}けたら、それは{約束|やくそく}だぞ。{後|あと}で{困|こま}るのは、{店|みせ}も{自分|じぶん}もだ。', text: 'Anh nhắc chậm rãi: "Đã nhận lời là thành một lời hứa đấy. Để tới nơi mới tính sau, thì cả quán lẫn bản thân em đều khổ." {name} lặng người, quay lại suy nghĩ cho nghiêm túc rồi mới trả lời lại đàng hoàng.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Sau cùng, {name} đứng đếm lại từng ô ca của mình trên bảng một lần nữa — ngón tay di chậm qua từng ngày trong tuần. Ở nhà hàng, bảng phân ca không chỉ chia giờ làm; nó chia cả sức người, và ai không biết đếm sức của mình thì cái bảng sẽ đếm thay, bằng những buổi sáng không dậy nổi.' },
      { sp: 'Bếp trưởng Sato', jp: '{週末|しゅうまつ}は{稼|かせ}ぎ{時|どき}だ。でもな、{体|からだ}は{売|う}り{物|もの}じゃないぞ。', text: 'Trước khi quay vào bếp, bếp trưởng nói câu cuối: "Cuối tuần là lúc kiếm tiền ở nhà hàng này. Nhưng nhớ nhé — sức khỏe không phải thứ mang ra bán hết được đâu."' },
      { sp: 'narr', text: '{name} gật đầu, cất điện thoại, quay vào rửa nốt chồng bát của ca trưa. Ngoài cửa, nắng chiều đã ngả — cuối tuần ở nhà hàng đúng là ngày kiếm tiền, nhưng từ hôm nay, {name} biết mình sẽ chỉ nhận những ca mà cả sức khỏe lẫn lời hứa đều gánh nổi.' }
    ]
  }
});
