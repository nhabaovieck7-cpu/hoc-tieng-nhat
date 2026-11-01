(function () {
  'use strict';
  // scenes-l5.js — Chương 4 (năm thứ hai), khối ngành L5: seizo (chế tạo), seibi (ô tô),
  // soko (kho vận), nogyo (nông nghiệp) + tuyến du học. Mỗi tuyến 2 cảnh branch.
  // Nhân vật dùng lại đúng tên cũ: Senpai Kudo / Sếp xưởng (seizo); Chủ xưởng (seibi);
  // Anh trưởng kho / Chị nhân viên kho (soko); Bác chủ trại / Bà chủ trại / Anh hàng xóm trại (nogyo);
  // Thầy Khánh / Thầy chủ nhiệm / Bạn cùng lớp Asha / Anh quản lý cửa hàng (du học).
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

    // ================= SEIZO — năm thứ hai ở xưởng cơ khí Nagoya =================

    'ind4-seizo-1': {
      scene: '🏭 Năm thứ hai: đứng máy mới và đọc bản vẽ kỹ thuật',
      branch: [
        { sp: 'narr', text: 'Năm thứ hai ở xưởng Nagoya. {name} không còn là người mới đứng nép ở cửa nữa — ca sáng nay, tên {name} được gọi trong buổi họp đầu ca, trước cả chuyền.' },
        { sp: 'Sếp xưởng', jp: '{今日|きょう}から {新|あたら}しい CNCの {機械|きかい}は おまえに {任|まか}せる。{図面|ずめん}も {自分|じぶん}で {読|よ}んで、{段取|だんど}りまで {考|かんが}えて くれ。', text: '(Từ hôm nay máy CNC mới giao cho cháu phụ trách. Bản vẽ cũng tự đọc, tính cả trình tự gia công cho chú.)' },
        { sp: 'hero', jp: 'はい、ありがとうございます。まず {図面|ずめん}を {確認|かくにん}してから、{作業|さぎょう}を {始|はじ}めます。', text: '(Dạ, cháu cảm ơn ạ. Cháu sẽ kiểm tra bản vẽ kỹ rồi mới bắt đầu làm.)' },
        { sp: 'narr', text: 'Senpai Kudo đặt tập bản vẽ lên bàn, không nói gì, chỉ gõ ngón tay lên một ký hiệu nhỏ ở góc dưới. Bài kiểm tra của anh chưa bao giờ có báo trước.' },
        { sp: 'Senpai Kudo', jp: 'じゃあ {聞|き}くぞ。この {寸法|すんぽう}、プラス マイナス 0.02って かいて ある。どういう {意味|いみ}だ。', text: '(Vậy anh hỏi đây. Kích thước này ghi dung sai cộng trừ 0,02. Nghĩa là sao?)' },
        { sp: 'hero', jp: '{基準|きじゅん}の {寸法|すんぽう}から、0.02ミリまでなら {大|おお}きくても {小|ちい}さくても {合格|ごうかく}です。その {外|そと}は {不良|ふりょう}です。', text: '(So với kích thước chuẩn, lớn hơn hay nhỏ hơn trong vòng 0,02 mm thì vẫn đạt. Ngoài khoảng đó là hàng lỗi ạ.)' },
        { sp: 'Senpai Kudo', jp: 'ふん。じゃあ こっち、この C0.5と {材質|ざいしつ}の {記号|きごう}は。{適当|てきとう}に こたえるなよ。', text: '(Hừm. Vậy còn đây, ký hiệu C0.5 và ký hiệu vật liệu này thì sao? Đừng trả lời qua loa đấy.)' },
        { sp: 'hero', jp: 'C0.5は {角|かど}を 0.5ミリ {面取|めんと}りする {意味|いみ}です。{材質|ざいしつ}は {図面|ずめん}の {表題欄|ひょうだいらん}で {確認|かくにん}します。{勝手|かって}に {決|き}めません。', text: '(C0.5 nghĩa là vát cạnh 0,5 mm ạ. Vật liệu thì cháu đối chiếu ở khung tên của bản vẽ, không tự quyết bừa.)' },
        {
          prompt: 'Kudo khoanh tay, hỏi câu khó nhất: “Vì sao đo kiểm phải chờ máy chạy ấm lên đã?” {name} trả lời thế nào?',
          choice: [
            {
              label: 'Trả lời đúng nguyên lý: kim loại giãn nở vì nhiệt, đo lúc máy nguội sẽ lệch số',
              fx: { jp: 3, hp: -1, love: 1, money: 0, risk: -1, pressure: 1 },
              note: '{name} trả lời trúng nguyên lý giãn nở nhiệt — Kudo gật đầu hiếm hoi.',
              say: [
                { sp: 'hero', jp: '{金属|きんぞく}は {熱|ねつ}で のびます。{冷|つめ}たい {状態|じょうたい}で {測|はか}ると、{温|あたた}まった {後|あと}で {寸法|すんぽう}が かわります。だから {暖機|だんき}の {後|あと}に {測|はか}ります。', text: '(Kim loại giãn ra vì nhiệt ạ. Đo lúc còn nguội thì sau khi ấm lên kích thước sẽ đổi. Nên phải đo sau khi chạy ấm máy.)' },
                { sp: 'Senpai Kudo', jp: '……{正解|せいかい}だ。{本|ほん}で {読|よ}んだだけじゃ なく、{意味|いみ}が わかってるな。', text: '(……Đúng. Không chỉ đọc trong sách, mà hiểu thật sự đấy.)' }
              ]
            },
            {
              label: 'Đoán là do dầu bôi trơn chưa đều nên phải chờ',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 1, pressure: 1 },
              note: '{name} đoán sai nguyên lý — Kudo sửa ngay tại chỗ.',
              say: [
                { sp: 'Senpai Kudo', jp: 'ちがうな。{油|あぶら}は {関係|かんけい}ない。{熱|ねつ}で {金属|きんぞく}が のびるからだ。{理由|りゆう}の ない {勘|かん}で {測|はか}るな。', text: '(Sai rồi. Không liên quan tới dầu. Là vì kim loại giãn vì nhiệt. Đừng đo bằng cảm tính không có lý do.)' }
              ]
            },
            {
              label: 'Thành thật nói chưa biết, xin senpai dạy rồi ghi vào sổ',
              fx: { jp: 2, hp: 0, love: 1, money: 0, risk: -1, pressure: 0 },
              note: '{name} thừa nhận chưa biết và xin học — đúng tinh thần hỏi ngay của xưởng này.',
              say: [
                { sp: 'hero', jp: 'すみません、そこは まだ わかりません。{教|おし}えて いただけますか。ノートに かいて、{次|つぎ}からは こたえられるように します。', text: '(Em xin lỗi, chỗ đó em chưa biết thật. Anh dạy em được không ạ? Em ghi vào sổ để lần sau trả lời được.)' },
                { sp: 'Senpai Kudo', jp: '……いい {態度|たいど}だ。{知|し}らないことを {知|し}らないと {言|い}えるやつは、のびる。', text: '(……Thái độ tốt đấy. Người dám nói mình chưa biết là người còn tiến được.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Máy chạy ấm, chi tiết đầu tiên ra lò. {name} đo ba điểm theo đúng bản vẽ, ghi số vào phiếu kiểm tra, tay không run như năm ngoái nữa.' },
        {
          prompt: 'Số đo của chi tiết đầu tiên nằm sát biên trên của dung sai — vẫn đạt, nhưng rất sát. {name} xử lý thế nào?',
          choice: [
            {
              label: 'Dừng lại báo Kudo, xin ý kiến trước khi chạy cả loạt',
              fx: { jp: 2, hp: -1, love: 0, money: 0, risk: -2, pressure: 1 },
              note: '{name} báo ngay khi số đo sát biên — tránh được nguy cơ cả loạt trôi ra ngoài dung sai.',
              say: [
                { sp: 'hero', jp: '{先輩|せんぱい}、{合格|ごうかく}の {範囲|はんい}ですが、{上限|じょうげん}に ちかいです。このまま {続|つづ}けて いいか、{確認|かくにん}させて ください。', text: '(Senpai, vẫn trong giới hạn đạt, nhưng sát biên trên lắm ạ. Cho em xác nhận xem có chạy tiếp được không.)' }
              ]
            },
            {
              label: 'Vẫn trong dung sai thì cứ chạy tiếp cho kịp tiến độ',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 3, pressure: -1 },
              note: '{name} chạy tiếp khi số đo sát biên — Kudo phát hiện và nhắc: sát biên chính là tín hiệu cảnh báo.',
              say: [
                { sp: 'Senpai Kudo', jp: 'おい、{数字|すうじ} みたか。{上限|じょうげん}に ちかいのは「まだ {大丈夫|だいじょうぶ}」じゃ なくて「{次|つぎ}は {出|で}るぞ」の {合図|あいず}だ。', text: '(Này, có nhìn số không? Sát biên trên không phải là “vẫn ổn”, mà là dấu hiệu “cái tiếp theo sẽ vượt” đấy.)' }
              ]
            }
          ]
        },
        { sp: 'Senpai Kudo', jp: '{図面|ずめん}は お{客|きゃく}さんとの {約束|やくそく}だ。{読|よ}めるやつにしか、{機械|きかい}は まかせられない。……おまえは {読|よ}めるように なったな。', text: '(Bản vẽ là lời hứa với khách hàng. Chỉ giao máy cho người đọc được nó thôi. ……Em đọc được rồi đấy.)' },
        { sp: 'hero', jp: 'ありがとうございます。{今日|きょう} {教|おし}わったことは {全部|ぜんぶ} ノートに かきました。{明日|あした}からも {図面|ずめん}を {先|さき}に、{機械|きかい}は {後|あと}に します。', text: '(Em cảm ơn ạ. Những gì học hôm nay em ghi hết vào sổ rồi. Từ mai em vẫn theo thứ tự: bản vẽ trước, máy sau.)' },
        { sp: 'narr', text: 'Chiều tan ca, {name} lau máy mới sạch bóng trước khi về. Đứng một mình một máy — câu nói ấy năm ngoái nghe xa vời, hôm nay nó nằm trong phiếu phân công, ngay ngắn cạnh tên mình.' }
      ]
    },
    'ind4-seizo-2': {
      scene: '🚨 Tiếng kêu lạ giữa ca và bài học 報告・連絡・相談',
      branch: [
        { sp: 'narr', text: 'Giữa ca chiều, máy của {name} bỗng phát ra tiếng “kacha… kacha…” rất khẽ, đều đều như kim loại cọ vào nhau. Sản phẩm ra vẫn đẹp, số đo vẫn chuẩn — chỉ có cái tiếng ấy là không thuộc về chiếc máy này.' },
        { sp: 'hero', jp: '{先輩|せんぱい}、すみません、{今|いま} いいですか。{機械|きかい}から いつもと {違|ちが}う {音|おと}が します。{報告|ほうこく}させて ください。', text: '(Senpai, xin lỗi, em báo cáo ạ. Máy đang phát ra tiếng khác thường.) — {name} không chờ hết ca, gọi ngay: đó là liên lạc.' },
        { sp: 'Senpai Kudo', jp: 'いつからだ。{音|おと}は どんなふうに かわった。{寸法|すんぽう}は。', text: '(Từ khi nào? Tiếng thay đổi thế nào? Số đo thì sao?)' },
        { sp: 'hero', jp: '{十分前|じゅっぷんまえ}からです。{小|ちい}さい {金属|きんぞく}の {音|おと}が {定期的|ていきてき}に します。{寸法|すんぽう}は {三個|さんこ} {測|はか}って、{全部|ぜんぶ} {範囲内|はんいない}でした。', text: '(Từ mười phút trước ạ. Tiếng kim loại nhỏ, lặp đều đều. Số đo em đo ba chi tiết, tất cả vẫn trong giới hạn.)' },
        {
          prompt: 'Tổ trưởng chuyền bên đi ngang, nói: “Sắp hết loạt rồi, cứ chạy nốt đi, dừng là trễ tiến độ cả tổ.” {name} làm gì?',
          choice: [
            {
              label: 'Giữ quyết định dừng máy: cúi đầu giải thích và dừng máy ngay theo đúng 報連相',
              fx: { jp: 3, hp: -2, love: 1, money: 0, risk: -3, pressure: 2 },
              note: '{name} dừng máy bất chấp sức ép tiến độ — quyết định cứu cả tổ khỏi một tai nạn lớn.',
              say: [
                { sp: 'hero', jp: '{申|もう}し{訳|わけ}ありません。でも {異常|いじょう}が あるときは {止|と}めるのが {規則|きそく}です。{機械|きかい}を {止|と}めて、{確認|かくにん}してから {再開|さいかい}します。', text: '(Cháu xin lỗi tổ trưởng. Nhưng có bất thường là phải dừng, đó là quy định ạ. Cháu dừng máy, kiểm tra xong mới chạy lại.)' },
                { sp: 'narr', text: '{name} bấm nút dừng, treo thẻ bảo trì lên bảng điều khiển. Cả chuyền xôn xao — người mới năm nào giờ dám dừng máy trước mặt tổ trưởng.' }
              ]
            },
            {
              label: 'Nghe theo tổ trưởng, chạy nốt loạt này rồi mới tính',
              fx: { jp: 0, hp: -3, love: -1, money: 0, risk: 5, pressure: 1 },
              note: '{name} chạy tiếp theo sức ép tiến độ — tiếng kêu to dần cho tới khi Kudo lao tới.',
              say: [
                { sp: 'narr', text: 'Chưa hết loạt, tiếng kêu đã to thành tiếng rít. Senpai Kudo lao tới bấm nút dừng khẩn cấp, mặt cắt không còn giọt máu.' },
                { sp: 'Senpai Kudo', jp: 'なぜ {止|と}めなかった。{音|おと}は {機械|きかい}の {悲鳴|ひめい}だぞ。{進度|しんど}より {人|ひと}の {命|いのち}だ。', text: '(Sao không dừng? Tiếng kêu là tiếng máy kêu cứu đấy. Mạng người hơn tiến độ.)' }
              ]
            },
            {
              label: 'Giảm tốc độ máy xuống một nửa để chạy cầm chừng',
              fx: { jp: 1, hp: -1, love: 0, money: 0, risk: 3, pressure: 1 },
              note: '{name} tự ý giảm tốc cầm chừng — vẫn là tự phán đoán, Kudo nhắc lại nguyên tắc năm đầu.',
              say: [
                { sp: 'Senpai Kudo', jp: '{速度|そくど}を {落|お}とすのも {自分|じぶん}の {判断|はんだん}だ。{異常|いじょう}のときの {答|こた}えは ひとつ、{止|と}める、だ。わすれたか。', text: '(Giảm tốc cũng là tự phán đoán đấy. Khi có bất thường, đáp án chỉ có một: dừng. Quên rồi à?)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Nắp máy được mở ra trước mặt cả tổ. Bạc đạn của trục chính đã nứt một đường dài, mảnh kim loại nhỏ kẹt ngay rìa — chỉ cần chạy thêm ít phút, trục chính sẽ gãy và mảnh vỡ có thể văng ra ngoài.' },
        { sp: 'Tổ trưởng', jp: '……{止|と}めて {正解|せいかい}だった。おれの {言葉|ことば}が {悪|わる}かった。{進度|しんど}のことで {頭|あたま}が いっぱいだった。', text: '(……Dừng là đúng. Lời của chú sai rồi. Đầu chú lúc đó chỉ nghĩ tới tiến độ.) — Tổ trưởng cúi đầu trước cả tổ, không né tránh.' },
        { sp: 'Senpai Kudo', jp: 'あと {十分|じゅっぷん} {回|まわ}してたら、{主軸|しゅじく}が こわれて、{破片|はへん}が とんでた。{誰|だれ}か {大|おお}けが してたかも しれないんだぞ。', text: '(Chạy thêm mười phút nữa là trục chính gãy, mảnh vỡ văng ra. Có khi đã có người bị thương nặng rồi đấy.)' },
        { sp: 'hero', jp: 'あの、{相談|そうだん}が あります。この {音|おと}の {変化|へんか}を {引継|ひきつ}ぎノートに かいて、{朝|あさ}の {点検|てんけん}に「{音|おと}の {確認|かくにん}」を {加|くわ}えられませんか。', text: '(À, em có một đề xuất muốn bàn ạ. Mình ghi lại sự thay đổi âm thanh này vào sổ bàn giao, và thêm mục “kiểm tra âm thanh” vào kiểm tra đầu ca được không ạ?) — Đó là chữ cuối của 報連相：相談.' },
        {
          prompt: 'Cuối ca, tổ trưởng đề nghị {name} đứng trước cả tổ kể lại vụ việc. {name} nói thế nào?',
          choice: [
            {
              label: 'Kể ngắn gọn đúng trình tự: nghe thấy — báo ngay — dừng máy, không kể công',
              fx: { jp: 2, hp: 0, love: 1, money: 0, risk: -1, pressure: 0 },
              note: '{name} chia sẻ quy trình, không kể công — cả tổ học được bài học chung.',
              say: [
                { sp: 'hero', jp: '{音|おと}が おかしいと {思|おも}ったら、{我慢|がまん}しないで すぐ {報告|ほうこく}して、{機械|きかい}を {止|と}めて ください。{止|と}めることは、{遅|おく}れることじゃ ありません。{守|まも}ることです。', text: '(Nghe tiếng lạ thì đừng cố chịu, báo ngay và dừng máy. Dừng máy không phải là làm chậm — đó là bảo vệ.)' },
                { sp: 'narr', text: 'Cả tổ im lặng nghe. Có người gật đầu, có người lén ghi vào sổ tay. Tổ trưởng ghi tên {name} vào mục ghi nhận an toàn của tháng, trước mặt mọi người.' }
              ]
            },
            {
              label: 'Ngại đứng trước đám đông, xin tổ trưởng kể thay',
              fx: { jp: 1, hp: 0, love: 0, money: 0, risk: 0, pressure: -1 },
              note: '{name} tránh phần chia sẻ — việc vẫn được ghi nhận, nhưng bỏ lỡ cơ hội truyền kinh nghiệm cho cả tổ.',
              say: [
                { sp: 'Tổ trưởng', jp: 'まあ、{今日|きょう}の {判断|はんだん}は {立派|りっぱ}だった。{次|つぎ}は {自分|じぶん}の {言葉|ことば}で {話|はな}せるように なれよ。', text: '(Thôi được, phán đoán hôm nay của cháu rất đáng nể. Lần sau cố nói bằng lời của mình nhé.)' }
              ]
            }
          ]
        },
        { sp: 'Sếp xưởng', jp: '{機械|きかい}を {止|と}められるやつが、{本当|ほんとう}の {担当者|たんとうしゃ}だ。{今日|きょう}は おまえが この {工場|こうじょう}を {守|まも}った。', text: '(Người dám dừng máy mới là người phụ trách thật sự. Hôm nay chính cháu đã bảo vệ cái xưởng này.)' },
        { sp: 'hero', jp: 'ありがとうございます。{報告|ほうこく}、{連絡|れんらく}、{相談|そうだん}。この {三|みっ}つを、これからも {守|まも}ります。', text: '(Cháu cảm ơn ạ. Báo cáo, liên lạc, bàn bạc — ba điều này cháu sẽ giữ mãi.)' },
        { sp: 'narr', text: 'Trên đường về, {name} ngang qua bảng tin của xưởng: dòng ghi nhận an toàn tháng này có tên mình. Không phải vì làm nhanh nhất tổ — mà vì đã dừng đúng lúc nhất.' }
      ]
    },

    // ================= SEIBI — năm thứ hai ở xưởng sửa xe Toyota =================

    'ind4-seibi-1': {
      scene: '🔊 Khách quen và tiếng kêu lạ: chẩn đoán bằng tai, tư vấn bằng sự trung thực',
      branch: [
        { sp: 'narr', text: 'Sáng thứ bảy, vị khách quen của xưởng — người mà năm ngoái {name} từng gọi điện xác nhận triệu chứng suốt mười phút — lái xe vào sân, hạ kính xuống cười: “Lại nhờ cậu nghe hộ cái tiếng này.”' },
        { sp: 'Khách quen', jp: 'おはよう。{今度|こんど}は ブレーキを {軽|かる}く ふむと、キーって {音|おと}が するんだ。{強|つよ}く ふむと しないのが また {不思議|ふしぎ}でな。', text: '(Chào buổi sáng. Lần này đạp phanh nhẹ thì nghe tiếng “kiii”, đạp mạnh lại không nghe, lạ ở chỗ đó đấy.)' },
        { sp: 'hero', jp: 'おはようございます。いつも ありがとうございます。まず {一緒|いっしょ}に {走|はし}って、{音|おと}を {確認|かくにん}させて ください。', text: '(Cháu chào bác ạ. Cảm ơn bác luôn tin tưởng xưởng. Trước hết cho cháu chạy thử cùng bác để nghe tiếng ạ.)' },
        { sp: 'narr', text: 'Trên đoạn đường thử, {name} tắt radio, hạ kính, nghe tiếng kêu theo từng nhịp phanh. Về xưởng, cây nghe chẩn đoán áp vào từng bánh xe — tiếng kêu nằm ở bánh trước bên trái.' },
        { sp: 'hero', jp: 'しゃちょう、ブレーキパッドが {限界|げんかい}まで へって います。ディスクにも {細|こま}かい {傷|きず}が あります。{音|おと}の {原因|げんいん}は ここで {間違|まちが}いないと {思|おも}います。', text: '(Sếp ơi, má phanh mòn tới giới hạn rồi ạ. Đĩa phanh cũng có vết xước nhỏ. Nguyên nhân tiếng kêu chắc chắn ở đây.)' },
        { sp: 'Chủ xưởng', jp: 'よく {聞|き}きわけたな。あとは お{客|きゃく}さんへの {説明|せつめい}だ。{整備|せいび}の {腕|うで}は、{口|くち}でも はかるんだぞ。', text: '(Nghe phân biệt giỏi đấy. Phần còn lại là giải thích cho khách. Tay nghề của thợ còn được đo bằng miệng nữa đấy.)' },
        {
          prompt: 'Ngoài má phanh, giảm xóc sau cũng đã mòn nhẹ nhưng chưa tới mức phải thay. {name} tư vấn khách thế nào?',
          choice: [
            {
              label: 'Nói thẳng cả hai phần: phanh phải thay ngay vì an toàn; giảm xóc đi thêm một vạn km nữa kiểm tra lại cũng được',
              fx: { jp: 3, hp: -1, love: 2, money: 0, risk: -1, pressure: 0 },
              note: '{name} tư vấn trung thực, phân biệt rõ “phải thay” và “chưa cần thay” — khách gật đầu tin tưởng.',
              say: [
                { sp: 'hero', jp: 'ご{説明|せつめい}します。ブレーキは {安全|あんぜん}に {関|かか}わるので、パッドと ディスクは {今|いま} {交換|こうかん}が {必要|ひつよう}です。でも {後|うし}ろの ショックは まだ {使|つか}えます。{一万|いちまん}キロ {走|はし}ったら、また {無料|むりょう}で {点検|てんけん}します。', text: '(Cháu xin giải thích ạ. Phanh liên quan tới an toàn nên má và đĩa cần thay ngay. Nhưng giảm xóc sau vẫn dùng được. Chạy thêm một vạn km nữa, xưởng sẽ kiểm tra lại miễn phí ạ.)' },
                { sp: 'Khách quen', jp: '「まだ {使|つか}える」って {言|い}って くれる {店|みせ}は めったに ないよ。だから ここに くるんだ。', text: '(Xưởng mà nói “cái này vẫn dùng được” thì hiếm lắm. Vì thế tôi mới tới đây đấy.)' }
              ]
            },
            {
              label: 'Đề xuất thay hết cả giảm xóc cho khách “yên tâm tuyệt đối”',
              fx: { jp: 0, hp: 0, love: -1, money: 1, risk: 1, pressure: 0 },
              note: '{name} đề xuất thay cả phần chưa cần thay — hoá đơn phình lên, chủ xưởng phải gọi lại.',
              say: [
                { sp: 'Chủ xưởng', jp: 'まて。{不安|ふあん}を うるのが {商売|しょうばい}じゃ ない。{必要|ひつよう}なことだけ {言|い}うんだ。', text: '(Khoan. Bán nỗi lo không phải là buôn bán. Chỉ nói điều cần thiết thôi.)' }
              ]
            },
            {
              label: 'Chỉ thay má phanh rẻ nhất, giấu luôn chuyện đĩa phanh có xước cho khách đỡ tốn',
              fx: { jp: 0, hp: 0, love: -1, money: -0.5, risk: 3, pressure: 0 },
              note: '{name} giấu tình trạng đĩa phanh — má mới sẽ bị đĩa xước ăn mòn nhanh, khách phải quay lại sớm.',
              say: [
                { sp: 'Chủ xưởng', jp: '{隠|かく}すのは {安|やす}くする ことじゃ ないぞ。ディスクの {傷|きず}を {言|い}わないと、{新|あたら}しい パッドが すぐ だめに なる。', text: '(Giấu không phải là làm rẻ đâu. Không nói vết xước ở đĩa thì má mới cũng mau hỏng thôi.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Khách ký vào phiếu báo giá trước khi chiếc xe được nâng lên — từng khoản mục đều đã được giải thích bằng lời, không có dòng nào mập mờ.' },
        { sp: 'hero', jp: '{見積|みつも}りの {通|とお}りに {作業|さぎょう}しました。{古|ふる}い {部品|ぶひん}は こちらの {箱|はこ}に あります。ご{確認|かくにん}ください。', text: '(Cháu đã làm đúng như báo giá ạ. Phụ tùng cũ cháu để trong hộp này, mời bác kiểm tra.)' },
        { sp: 'Khách quen', jp: 'いやあ、{古|ふる}い {部品|ぶひん}まで みせて くれるのか。{来月|らいげつ}、{女房|にょうぼう}の {車|くるま}も たのむよ。', text: '(Chà, cho xem cả phụ tùng cũ nữa cơ à. Tháng sau tôi mang xe của vợ tôi tới nhờ nhé.)' },
        {
          prompt: 'Trước khi khách về, {name} còn làm thêm việc gì cho trọn buổi sửa?',
          choice: [
            {
              label: 'Chạy thử một vòng, ghi vào sổ bảo dưỡng mốc kiểm tra giảm xóc sau và hẹn lịch rõ ràng',
              fx: { jp: 2, hp: -1, love: 1, money: 0, risk: -1, pressure: 0 },
              note: '{name} chạy thử kiểm chứng và ghi mốc hẹn kiểm tra — lời tư vấn trung thực có ngày tháng đi kèm.',
              say: [
                { sp: 'hero', jp: '{試運転|しうんてん}して、{音|おと}が {消|き}えたことを {確認|かくにん}しました。{整備手帳|せいびてちょう}に {次回|じかい}の {点検|てんけん}の {時期|じき}を かいて おきました。', text: '(Cháu chạy thử và xác nhận tiếng kêu đã hết ạ. Cháu cũng ghi vào sổ bảo dưỡng mốc kiểm tra lần tới rồi.)' }
              ]
            },
            {
              label: 'Giao xe ngay vì khách đang vội, sổ sách để ghi sau',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 1, pressure: -1 },
              note: '{name} giao xe vội không chạy thử — chủ xưởng giữ xe lại đúng năm phút để kiểm chứng.',
              say: [
                { sp: 'Chủ xưởng', jp: '{試運転|しうんてん}なしで わたすな。{五分|ごふん}の {確認|かくにん}が、{次|つぎ}の {信用|しんよう}に なるんだ。', text: '(Đừng giao xe khi chưa chạy thử. Năm phút kiểm chứng đổi lấy niềm tin lần sau đấy.)' }
              ]
            }
          ]
        },
        { sp: 'Chủ xưởng', jp: '{客|きゃく}は {車|くるま}が なおったから くるんじゃ ない。{信|しん}じられるから くるんだ。おまえの {説明|せつめい}、だいぶ さまに なってきたな。', text: '(Khách tới không phải vì xe được sửa xong. Họ tới vì tin được. Lời giải thích của cháu, giờ ra dáng lắm rồi đấy.)' },
        { sp: 'narr', text: 'Chiếc xe lăn bánh khỏi sân, tiếng phanh êm như chưa từng kêu. {name} cất cây nghe chẩn đoán vào hộp đồ, nghĩ: hoá ra đôi tai nghe đúng bệnh và cái miệng nói đúng sự thật là cùng một bộ dụng cụ.' }
      ]
    },
    'ind4-seibi-2': {
      scene: '☀️ Xe gia đình hỏng giữa chuyến đi và chìa khóa ca tối',
      branch: [
        { sp: 'narr', text: 'Chiều hè, nắng như đổ lửa. Xe cứu hộ kéo vào sân một chiếc xe gia đình chết máy giữa đường cao tốc: bố mẹ mặt mũi bơ phờ, hai đứa nhỏ khóc ngằn ngặt vì nóng, vali chất đầy sau xe — chuyến du lịch của họ mới đi được nửa đường.' },
        { sp: 'Chị khách', jp: 'すみません、{旅行|りょこう}の {途中|とちゅう}で {止|と}まってしまって。{子供|こども}が {熱|あつ}くて ないて いて……。{今日中|きょうじゅう}に なおりますか。', text: '(Xin lỗi, xe hỏng giữa chuyến du lịch. Các cháu nóng quá cứ khóc mãi…… Hôm nay sửa xong được không ạ?) — Chị nói gấp, tay quạt liên tục cho con.' },
        { sp: 'hero', jp: 'かしこまりました。まず {中|なか}の {待合室|まちあいしつ}へ どうぞ。クーラーが あります。お{子|こ}さんに {冷|つめ}たい お{水|みず}を おもちします。{車|くるま}は すぐに みます。', text: '(Cháu rõ rồi ạ. Trước hết mời cả nhà vào phòng chờ, trong đó có điều hoà. Cháu mang nước mát cho các cháu ngay. Xe cháu kiểm tra liền ạ.)' },
        { sp: 'Anh khách', jp: 'ありがとう。{宿|やど}は {先|さき}の {町|まち}に とって あるんだ。{夜|よる}までに たどりつけると いいんだが……。', text: '(Cảm ơn cậu. Phòng nghỉ đặt ở thị trấn phía trước. Tới nơi trước tối thì tốt quá……)' },
        { sp: 'Chủ xưởng', jp: '{閉店時間|へいてんじかん}は {気|き}にするな。{家族連|かぞくづ}れの {車|くるま}は、{今日中|きょうじゅう}に {走|はし}らせる。みんなで かかろう。', text: '(Đừng lo giờ đóng cửa. Xe chở cả gia đình thì phải cho chạy lại trong hôm nay. Cả xưởng cùng vào việc.) — Chủ xưởng xắn tay áo, tự tay đẩy hộp dụng cụ ra sân.' },
        { sp: 'narr', text: 'Chẩn đoán nhanh cho kết quả: bơm nước rò, dây curoa nứt — động cơ bị quá nhiệt nên tự ngắt. Bệnh rõ ràng, nhưng kho xưởng vừa hết đúng mã bơm nước này.' },
        {
          prompt: 'Kho hết bơm nước đúng mã, trời thì sắp tối. {name} đề xuất cách nào?',
          choice: [
            {
              label: 'Tự chạy xe máy tới kho tổng cách 20 phút để lấy phụ tùng chính hãng, chủ xưởng ở lại tháo trước',
              fx: { jp: 2, hp: -2, love: 1, money: 0, risk: 0, pressure: 1 },
              note: '{name} chạy đi lấy phụ tùng giữa nắng — hai đầu cùng làm, xe kịp nổ máy trước giờ ăn tối.',
              say: [
                { sp: 'hero', jp: 'しゃちょう、おれが バイクで {部品|ぶひん}を とりに いきます。その {間|あいだ}に {分解|ぶんかい}を お{願|ねが}いできますか。{二十分|にじゅっぷん}で もどります。', text: '(Sếp ơi, cháu chạy xe máy đi lấy phụ tùng. Trong lúc đó sếp tháo trước giúp cháu được không ạ? Hai mươi phút cháu quay lại.)' },
                { sp: 'Chủ xưởng', jp: 'よし、{分担|ぶんたん}だ。{気|き}をつけて いってこい。{暑|あつ}いから {水|みず}を {飲|の}んでからな。', text: '(Được, chia việc. Đi cẩn thận. Nắng thế này, uống nước rồi hẵng đi.)' }
              ]
            },
            {
              label: 'Đề xuất gia đình thuê xe khác đi tiếp, xe để lại xưởng sửa thong thả mấy hôm',
              fx: { jp: 1, hp: 0, love: -1, money: 0, risk: -1, pressure: -1 },
              note: '{name} chọn phương án an toàn mà lạnh lùng — chủ xưởng lắc đầu: chuyến đi của người ta không chờ được.',
              say: [
                { sp: 'Chủ xưởng', jp: 'それは {最後|さいご}の {手|て}だ。{子供|こども}の {夏|なつ}の {思|おも}い{出|で}は、{待|ま}って くれないぞ。まず {走|はし}らせる {方法|ほうほう}を {考|かんが}えよう。', text: '(Đó là nước cuối cùng. Kỷ niệm mùa hè của trẻ con không chờ được đâu. Trước hết cứ nghĩ cách cho xe chạy lại đã.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Phụ tùng về tới nơi, hai thầy trò cùng lăn vào làm dưới ánh đèn sân xưởng. Cứ xong một công đoạn, {name} lại ghé phòng chờ báo một câu cho gia đình yên tâm.' },
        { sp: 'hero', jp: '{部品|ぶひん}が つきました。あと {三十分|さんじゅっぷん}で {試運転|しうんてん}に いけます。もう {少|すこ}しだけ お{待|ま}ちください。', text: '(Phụ tùng lắp xong rồi ạ. Ba mươi phút nữa là chạy thử được. Cả nhà chờ cháu thêm chút nữa thôi ạ.)' },
        {
          prompt: 'Xe nổ máy lúc trời chạng vạng, hai đứa nhỏ đã thôi khóc. Lúc thanh toán, anh khách dúi thêm tiền cảm ơn ngoài hoá đơn. {name} xử lý thế nào?',
          choice: [
            {
              label: 'Từ chối khéo bằng kính ngữ: chỉ nhận đúng hoá đơn, mời gia đình lần sau ghé kiểm tra miễn phí',
              fx: { jp: 2, hp: 0, love: 2, money: 0, risk: -1, pressure: 0 },
              note: '{name} từ chối tiền thêm một cách tử tế — gia đình ra về với ấn tượng không quên về xưởng nhỏ này.',
              say: [
                { sp: 'hero', jp: 'お{気持|きも}ちだけ いただきます。{料金|りょうきん}は {見積|みつも}りの {通|とお}りで じゅうぶんです。{帰|かえ}り{道|みち}、{何|なに}か あれば すぐ お{電話|でんわ}ください。', text: '(Cháu chỉ xin nhận tấm lòng thôi ạ. Tiền sửa đúng như báo giá là đủ rồi. Trên đường về có gì cứ gọi cho xưởng ngay ạ.)' },
                { sp: 'Chị khách', jp: 'ありがとうございます。{子供|こども}たち、{車|くるま}の おにいさんのこと、ずっと {覚|おぼ}えてると {思|おも}います。', text: '(Cảm ơn cậu nhiều lắm. Mấy đứa nhỏ nhà tôi chắc nhớ mãi anh thợ sửa xe này đấy.)' }
              ]
            },
            {
              label: 'Nhận luôn khoản tiền cảm ơn vì cả xưởng đã vất vả ngoài giờ',
              fx: { jp: 0, hp: 0, love: -1, money: 0.5, risk: 1, pressure: 0 },
              note: '{name} nhận tiền ngoài hoá đơn — chủ xưởng lặng lẽ gửi trả lại kèm lời dặn về nghề.',
              say: [
                { sp: 'Chủ xưởng', jp: '{金|かね}は {見積|みつも}りの {中|なか}だけだ。{外|そと}で もらうと、{次|つぎ}から {値段|ねだん}が {信|しん}じられなくなる。', text: '(Tiền chỉ nằm trong báo giá thôi. Nhận ngoài là từ lần sau giá cả không còn ai tin nữa.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Chiếc xe lăn bánh ra khỏi sân trong ánh hoàng hôn. Qua cửa kính, hai đứa nhỏ vẫy tay rối rít — chuyến du lịch của một gia đình được nối lại từ sân một xưởng nhỏ.' },
        { sp: 'Chủ xưởng', jp: 'おい、これ、おまえの {鍵|かぎ}だ。{今日|きょう}から {夜|よる}の {当番|とうばん}は おまえが {持|も}て。{急|きゅう}な {車|くるま}が きたら、{店|みせ}を {開|あ}けて いい。{判断|はんだん}は おまえに {任|まか}せる。', text: '(Này, đây là chìa khóa của cháu. Từ hôm nay ca tối do cháu giữ. Có xe gấp tới thì cứ mở xưởng. Phán đoán giao cho cháu.) — Khác hẳn lần nhờ khóa hộ một đêm năm ngoái: lần này là bộ chìa khóa riêng, giao chính thức.' },
        { sp: 'hero', jp: 'はい、{責任|せきにん}を もって {預|あず}かります。{夜|よる}に {困|こま}った {人|ひと}が きたら、{今日|きょう}の ように {対応|たいおう}します。', text: '(Dạ, cháu xin nhận với tất cả trách nhiệm. Đêm nào có người gặp khó tới, cháu sẽ xử lý như hôm nay ạ.)' },
        { sp: 'narr', text: 'Bộ chìa khóa ca tối nằm trong túi áo {name}, kêu lanh canh khe khẽ theo từng bước chân về nhà trọ. Năm ngoái, chìa khóa là một lần nhờ. Năm nay, nó là một chức danh không cần bảng tên.' }
      ]
    },

    // ================= SOKO — năm thứ hai ở trung tâm kho vận Chiba =================

    'ind4-soko-1': {
      scene: '📦 Mùa cao điểm 繁忙期： được giao điều phối cả một line phân loại',
      branch: [
        { sp: 'narr', text: 'Mùa cao điểm cuối năm ở trung tâm kho Chiba: lượng hàng gấp ba ngày thường, xe tải nối đuôi nhau ngoài sân từ lúc trời chưa sáng. Trên bảng phân công buổi sáng, cạnh tên line phân loại số 2, người phụ trách ghi là: {name}.' },
        { sp: 'Anh trưởng kho', jp: '{今日|きょう}から {繁忙期|はんぼうき}の あいだ、2{番|ばん}ラインは おまえに {任|まか}せる。{六人|ろくにん}の ラインだ。{新人|しんじん}も {二人|ふたり} いる。{早|はや}さと {正確|せいかく}さ、{両方|りょうほう} まもって くれ。', text: '(Từ hôm nay, suốt mùa cao điểm, line số 2 giao cho em phụ trách. Line sáu người, có hai bạn mới. Giữ cả tốc độ lẫn chính xác cho anh.)' },
        { sp: 'hero', jp: 'はい、わかりました。{目標|もくひょう}の {件数|けんすう}と、{休憩|きゅうけい}の {時間|じかん}を {確認|かくにん}させて ください。{最初|さいしょ}に {三十分|さんじゅっぷん}、{様子|ようす}を みながら {進|すす}めます。', text: '(Dạ, em rõ rồi ạ. Cho em xác nhận số kiện mục tiêu và giờ nghỉ. Ba mươi phút đầu em sẽ vừa làm vừa quan sát nhịp line.)' },
        { sp: 'narr', text: 'Họp đầu ca chỉ ba phút: {name} chia line thành từng cặp — một người cũ kèm một người mới, khâu quét mã đứng cạnh khâu kiểm hàng, để câu hỏi nào cũng có người trả lời ngay bên cạnh.' },
        { sp: 'Bạn mới', jp: 'あの、{先輩|せんぱい}。この {速度|そくど}、{全部|ぜんぶ} ついて いけるか {不安|ふあん}です。まちがえたら どうしよう……。', text: '(À, senpai. Nhịp nhanh thế này, em sợ theo không kịp. Lỡ làm sai thì sao ạ……) — Bạn mới nhìn băng chuyền chạy vun vút, tay nắm chặt máy quét.' },
        { sp: 'hero', jp: 'だいじょうぶ。まちがえたら {止|と}めて、おれを よんで。{一{件|けん}の まちがいを {直|なお}すほうが、ライン {全部|ぜんぶ}を {直|なお}すより {早|はや}いから。{焦|あせ}らなくて いいよ。', text: '(Không sao. Sai thì dừng lại, gọi anh/chị. Sửa một kiện sai vẫn nhanh hơn sửa cả line. Đừng cuống.) — Giọng {name} bình thản như người đã từng đứng đúng vị trí run rẩy ấy.)' },
        {
          prompt: 'Giữa ca, hàng dồn ứ ở khâu đóng gói, kiện bắt đầu chất đống chờ. {name} điều phối thế nào?',
          choice: [
            {
              label: 'Điều một người từ khâu quét mã sang đóng gói, tự mình nhảy vào khâu nặng nhất',
              fx: { jp: 2, hp: -2, love: 1, money: 0, risk: -1, pressure: 1 },
              note: '{name} điều người theo điểm nghẽn và tự vào khâu nặng nhất — đống hàng tan dần, line không ai bị bỏ lại.',
              say: [
                { sp: 'hero', jp: 'すみません、{一人|ひとり}、{梱包|こんぽう}に まわって ください。{検品|けんぴん}は おれが みます。{十分|じゅっぷん}だけ、この {形|かたち}で いきましょう。', text: '(Xin lỗi mọi người, một người chuyển sang khâu đóng gói giúp em. Khâu kiểm hàng em phụ trách. Mình giữ đội hình này mười phút thôi ạ.)' },
                { sp: 'narr', text: 'Điểm nghẽn tan dần. Không ai phải gào lên câu nào — chỉ có vị trí của từng người lặng lẽ đổi đúng lúc cần đổi.' }
              ]
            },
            {
              label: 'Hô cả line tăng tốc, ai chậm người đó tự chịu trách nhiệm',
              fx: { jp: 0, hp: -1, love: -1, money: 0, risk: 3, pressure: 2 },
              note: '{name} ép tốc độ bằng tiếng hô — lỗi quét mã bắt đầu tăng, chị nhân viên phải nhắc.',
              say: [
                { sp: 'Chị nhân viên kho', jp: 'ちょっと、ミスが {増|ふ}えてるよ。{早|はや}くするのは いいけど、{直|なお}す {時間|じかん}まで {考|かんが}えないと、{結局|けっきょく} おそくなるよ。', text: '(Này, lỗi tăng lên rồi đấy. Tăng tốc thì tốt, nhưng không tính thời gian sửa lại thì cuối cùng lại thành chậm thôi.)' }
              ]
            },
            {
              label: 'Báo trưởng kho xin hỗ trợ thêm người từ line bên cạnh ít hàng hơn',
              fx: { jp: 1, hp: 0, love: 0, money: 0, risk: 0, pressure: 0 },
              note: '{name} xin điều viện binh đúng lúc — line bên ít hàng san sẻ được một người, cả trung tâm cùng qua giờ cao điểm.',
              say: [
                { sp: 'Anh trưởng kho', jp: 'わかった、1{番|ばん}から {一人|ひとり} まわす。よく {早|はや}めに {言|い}って くれた。{無理|むり}に まわすより、ずっと いい。', text: '(Rõ, anh điều một người từ line 1 sang. Em nói sớm là tốt lắm. Hơn hẳn cố gồng cho qua.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Nhịp line ổn định trở lại. Tiếng máy quét đều đều như nhịp trống, và lần đầu tiên trong mùa cao điểm, line 2 không một lần phải dừng vì ùn ứ.' },
        { sp: 'Chị nhân viên kho', jp: 'あんたの ライン、{静|しず}かだね。{大声|おおごえ}も ないし、{走|はし}る {人|ひと}も いない。なのに {一番|いちばん} {進|すす}んでる。', text: '(Line của cậu yên tĩnh nhỉ. Không ai gào, không ai chạy. Vậy mà tiến nhanh nhất.)' },
        {
          prompt: 'Một bạn mới mệt lả, bắt đầu đặt ngược kiện lên băng liên tục. {name} xử lý thế nào?',
          choice: [
            {
              label: 'Cho bạn đổi sang khâu nhẹ, nghỉ năm phút uống nước — tự mình trám vào vị trí của bạn',
              fx: { jp: 2, hp: -1, love: 1, money: 0, risk: -1, pressure: 0 },
              note: '{name} đổi khâu và cho nghỉ ngắn — bạn mới quay lại với đôi tay đã vững, không thêm kiện nào sai.',
              say: [
                { sp: 'hero', jp: '{少|すこ}し {休|やす}んで、{水|みず}を {飲|の}んで きて。{五分|ごふん}で いいから。その {間|あいだ}は おれが ここに {入|はい}る。{体|からだ}が ついていかないと、{目|め}も ついていかないよ。', text: '(Nghỉ một chút, đi uống nước đi. Năm phút thôi cũng được. Trong lúc đó anh/chị đứng chỗ này. Người không theo kịp thì mắt cũng không theo kịp đâu.)' },
                { sp: 'Bạn mới', jp: 'ありがとうございます。……{目|め}が まわってたの、{自分|じぶん}でも わかって ました。', text: '(Em cảm ơn ạ. ……Thật ra em cũng biết là mắt em hoa hết cả lên rồi.)' }
              ]
            },
            {
              label: 'Nhắc nhở nghiêm khắc trước cả line để bạn nhớ mà không tái phạm',
              fx: { jp: 0, hp: 0, love: -1, money: 0, risk: 2, pressure: 2 },
              note: '{name} nhắc nhở công khai — bạn mới rúm người lại vì xấu hổ, tay càng run, tốc độ cả line tụt xuống.',
              say: [
                { sp: 'narr', text: 'Bạn mới cúi gằm, tay run hơn trước. Chị nhân viên kho khẽ chạm vào tay {name}: “Người mới mà bị mắng trước đám đông thì chỉ nhớ mỗi nỗi sợ thôi, không nhớ được việc đâu.”' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Cuối ca, bảng số liệu của trung tâm hiện lên: line 2 đạt chỉ tiêu kiện, và số lỗi thấp nhất trong bốn line ngày hôm đó.' },
        { sp: 'Anh trưởng kho', jp: '{繁忙期|はんぼうき}の {残|のこ}りも、2{番|ばん}は おまえに {任|まか}せる。{人|ひと}を まわすのが うまくなったな。{数字|すうじ}が そう {言|い}ってる。', text: '(Phần còn lại của mùa cao điểm, line 2 vẫn giao cho em. Em điều người khéo lên nhiều rồi. Số liệu nói thế đấy.)' },
        { sp: 'hero', jp: 'ありがとうございます。{明日|あした}は {休憩|きゅうけい}の まわしかたを もう {少|すこ}し {工夫|くふう}して みます。{疲|つか}れる {前|まえ}に {代|か}わる {形|かたち}に したいです。', text: '(Em cảm ơn anh. Mai em sẽ tính lại cách xoay ca nghỉ, để mọi người được đổi trước khi kiệt sức ạ.)' }
      ]
    },
    'ind4-soko-2': {
      scene: '🔎 Kiện hàng giá trị cao lạc tuyến: truy vết bằng số liệu và cách dán nhãn mới',
      branch: [
        { sp: 'narr', text: 'Sau giờ cao điểm, hệ thống của trung tâm báo đỏ: một kiện đồng hồ trị giá hơn ba mươi man yên, hẹn giao sáng nay, đến giờ vẫn chưa có người nhận. Kiện hàng ấy đã đi qua chính line {name} phụ trách.' },
        { sp: 'Anh trưởng kho', jp: 'おい、{高額|こうがく}の {荷物|にもつ}が {一件|いっけん}、{届|とど}いて いない。おまえの ラインを とおったはずだ。{一緒|いっしょ}に {追|お}おう。{誰|だれ}の せいかじゃ なく、まず {場所|ばしょ}だ。', text: '(Này, một kiện hàng giá trị cao chưa tới nơi. Nó đáng lẽ qua line của em. Cùng truy vết nào. Không phải truy lỗi của ai — trước hết là truy nó đang ở đâu.)' },
        { sp: 'hero', jp: 'はい、{責任|せきにん}を もって {調|しら}べます。まず {記録|きろく}から みせて ください。{勘|かん}では {探|さが}しません。', text: '(Dạ, em chịu trách nhiệm tra rõ ạ. Trước hết cho em xem dữ liệu ghi nhận. Em không tìm bằng cảm tính.)' },
        { sp: 'narr', text: '{name} mở nhật ký quét mã: kiện hàng được quét ở line 2 lúc 14 giờ 03 phút. Nhưng sau mốc đó, không còn bản ghi lên xe nào nữa — như thể kiện hàng biến mất giữa hai lần quét.' },
        { sp: 'hero', jp: 'スキャンは 14{時|じ}3{分|ふん}まで あります。その {後|あと}が ありません。カメラの {映像|えいぞう}、その {時間|じかん}の {分|ぶん}を みせて ください。', text: '(Bản ghi quét có tới 14 giờ 03. Sau đó thì không. Cho em xem camera đúng khung giờ đó ạ.)' },
        { sp: 'narr', text: 'Hình ảnh camera chậm rãi chạy: một nhân viên đặt kiện hàng sang khay tuyến bên cạnh. Nhìn kỹ mới thấy cớ sự — nhãn tuyến màu xanh lá và xanh dương, dưới ánh đèn vàng của kho, gần như cùng một màu. Kiện hàng bị đưa lên nhầm xe tuyến, đang nằm ở trung tâm bạn cách đây hai giờ xe.' },
        {
          prompt: 'Xe tuyến sai còn bốn mươi phút nữa mới tới trung tâm đích đầu tiên. {name} đề xuất xử lý thế nào?',
          choice: [
            {
              label: 'Báo ngay trưởng kho, liên hệ trung tâm bạn nhờ giữ kiện và chuyển trả trong đêm, đồng thời lập biên bản',
              fx: { jp: 3, hp: -1, love: 1, money: 0, risk: -2, pressure: 1 },
              note: '{name} báo ngay và kích hoạt đường chuyển trả — kiện hàng giá trị cao được giữ an toàn, không thất lạc thêm giờ nào.',
              say: [
                { sp: 'hero', jp: 'すぐに {先方|せんぽう}の センターに {連絡|れんらく}を お{願|ねが}いします。{車|くるま}が ついたら {荷物|にもつ}を {止|と}めて もらって、{夜|よる}の {便|びん}で もどしましょう。{記録|きろく}にも のこします。', text: '(Xin liên hệ ngay trung tâm bạn ạ. Xe tới nơi thì nhờ họ giữ kiện lại, chuyển về bằng chuyến đêm. Em ghi biên bản đầy đủ.)' },
                { sp: 'Anh trưởng kho', jp: 'よし、その {手配|てはい}で いく。{報告|ほうこく}が {早|はや}いと、{取|と}りかえせる {時間|じかん}が のこるんだ。', text: '(Được, cứ theo phương án đó. Báo sớm thì còn thời gian mà gỡ lại.)' }
              ]
            },
            {
              label: 'Chờ xe tới nơi cho chắc chắn rồi mới báo cáo một thể',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 3, pressure: 0 },
              note: '{name} chờ cho “chắc” mới báo — mất thêm ba giờ vàng, kiện hàng suýt bị xuất tiếp sang tuyến khác.',
              say: [
                { sp: 'Anh trưởng kho', jp: 'おそい。{確|たし}かめるのと {報告|ほうこく}するのは {別|べつ}だ。まず {一報|いっぽう}、{後|あと}で {正確|せいかく}な {報告|ほうこく}。これが {順番|じゅんばん}だ。', text: '(Chậm rồi. Xác minh và báo cáo là hai việc khác nhau. Báo nhanh một tiếng trước, báo chính xác sau. Đó mới là thứ tự.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Kiện đồng hồ được giữ lại an toàn ở trung tâm bạn và chuyển về ngay trong đêm. Nhưng {name} chưa dừng ở việc cứu một kiện hàng.' },
        { sp: 'hero', jp: 'リーダー、{提案|ていあん}が あります。ラベルの {色|いろ}が にすぎて います。{行|ゆ}き{先|さき}の {名前|なまえ}を {大|おお}きく {印刷|いんさつ}して、{色|いろ}の {組合|くみあわ}せも はっきり {変|か}えて、はる {位置|いち}も {決|き}めませんか。', text: '(Trưởng kho, em có đề xuất ạ. Màu nhãn giống nhau quá. Mình in tên tuyến thật to, đổi tổ hợp màu cho tương phản rõ, và cố định vị trí dán — được không anh?)' },
        { sp: 'Anh trưởng kho', jp: '{気持|きも}ちは わかる。だが センター {全体|ぜんたい}を かえるには、{数字|すうじ}が いる。いくら よく なるんだ。', text: '(Ý thì anh hiểu. Nhưng muốn đổi cả trung tâm thì cần số liệu. Nó tốt hơn được bao nhiêu?)' },
        {
          prompt: 'Trưởng kho đòi số liệu trước khi đổi cách dán nhãn cho cả trung tâm. {name} trả lời thế nào?',
          choice: [
            {
              label: 'Đề xuất thử ba ngày tại line 2, đo số lỗi dán nhầm trước và sau, rồi báo cáo bằng con số',
              fx: { jp: 2, hp: -1, love: 0, money: 0, risk: -1, pressure: 1 },
              note: '{name} đề xuất thử nghiệm có đo lường — ba ngày sau, số liệu tự nó nói thay mọi lời thuyết phục.',
              say: [
                { sp: 'hero', jp: 'まず 2{番|ばん}ラインで {三日|みっか} {試|ため}させて ください。まちがいの {数|かず}を {前|まえ}と {後|あと}で {比|くら}べて、{数字|すうじ}で {報告|ほうこく}します。', text: '(Trước hết cho em thử ba ngày ở line 2 ạ. Em so số lỗi trước và sau, báo cáo bằng con số.)' },
                { sp: 'narr', text: 'Ba ngày thử nghiệm: lỗi dán nhầm của line 2 về con số không. Bảng so sánh in ra chỉ có một trang — mà cầm nặng hơn mọi lời hứa.' }
              ]
            },
            {
              label: 'Đề nghị áp dụng ngay cho toàn trung tâm vì “nhìn là biết tốt hơn hẳn”',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 2, pressure: 1 },
              note: '{name} đề xuất đổi ngay không qua thử nghiệm — trưởng kho cười và hỏi lại đúng một câu: số liệu đâu?',
              say: [
                { sp: 'Anh trưởng kho', jp: '「みれば わかる」は {提案|ていあん}じゃ ない。{試|ため}して、{数|かず}えて、それからだ。{順番|じゅんばん}を とばすな。', text: '(“Nhìn là biết” không phải là đề xuất. Thử đi, đếm đi, rồi mới nói. Đừng nhảy bước.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Một tuần sau, cách dán nhãn mới — tên tuyến in to, màu tương phản, vị trí cố định — được áp dụng cho cả trung tâm. Bảng hướng dẫn dán ở đầu mỗi line ghi dòng cuối: “Đề xuất từ line 2”.' },
        { sp: 'Anh trưởng kho', jp: 'センター {全体|ぜんたい}で {採用|さいよう}が きまった。{一件|いっけん}の {行方不明|ゆくえふめい}から、ここまで もって きたのは おまえだ。', text: '(Cả trung tâm đã quyết định áp dụng. Từ một kiện hàng thất lạc mà đưa được tới đây là nhờ em đấy.)' },
        { sp: 'hero', jp: 'ありがとうございます。でも まちがいの {原因|げんいん}は {人|ひと}じゃ なくて、ラベルの {仕組|しく}みでした。{仕組|しく}みが なおれば、{誰|だれ}も まちがえません。', text: '(Em cảm ơn anh. Nhưng nguyên nhân lỗi không nằm ở con người, mà ở cơ chế cái nhãn. Cơ chế được sửa thì không ai còn sai nữa ạ.)' }
      ]
    },

    // ================= NOGYO — năm thứ hai ở trang trại Furano =================

    'ind4-nogyo-1': {
      scene: '🌀 Mùa thu hoạch gặp tin bão: chống bão cho nhà kính và bữa cơm trong nhà kho',
      branch: [
        { sp: 'narr', text: 'Tuần cao điểm thu hoạch ở Furano. Đài báo tin từ sáng sớm: một cơn bão mạnh sẽ đổ bộ ngay đêm mai — sớm hơn mọi năm, và đúng lúc ruộng dưa cùng nhà kính đang ở kỳ mong manh nhất.' },
        { sp: 'Bác chủ trại', jp: '{台風|たいふう}は {明日|あした}の {夜|よる}だ。{実|み}が ついた ハウスは {風|かぜ}に よわい。{今日|きょう}のうちに、とれるものは とって、ハウスは しめて かためる。{順番|じゅんばん}を まちがえるな。', text: '(Bão vào đêm mai. Nhà kính đang mang quả thì yếu trước gió. Trong hôm nay, thu được gì thì thu, nhà kính thì đóng chặt và gia cố. Đừng sai thứ tự.) — Bác chủ trại nhìn trời, giọng trầm mà chắc.' },
        { sp: 'Bà chủ trại', jp: 'あたしは {道具|どうぐ}と {縄|なわ}を {用意|ようい}する。あんたたちは {手|て}を うごかして。{昼|ひる}は {抜|ぬ}くよ、{今日|きょう}は {戦|たたか}いだからね。', text: '(Tôi chuẩn bị dụng cụ với dây thừng. Mấy người cứ mải miết làm. Trưa nay bỏ bữa đấy, hôm nay là một trận chiến mà.) — Bà chủ trại nói mà tay đã thoăn thoắt cuộn dây.' },
        { sp: 'hero', jp: 'はい。おれは ハウスの {戸|と}の {確認|かくにん}と、{縄|なわ}かけを やります。{終|お}わった {場所|ばしょ}から {報告|ほうこく}します。', text: '(Dạ. Cháu làm phần kiểm tra cửa nhà kính và chằng dây ạ. Xong chỗ nào cháu báo chỗ đó.)' },
        { sp: 'Anh hàng xóm trại', jp: 'おう、うちも {同|おな}じだ。{終|お}わったら {手伝|てつだ}いに くる。{台風|たいふう}の {前|まえ}は、{村|むら}じゅうが {一|ひと}つの {農家|のうか}だ。', text: '(Ừ, nhà tôi cũng thế. Xong bên tôi là tôi sang giúp. Trước bão, cả xóm là một nhà nông.) — Anh Tanaka hàng xóm nói vọng qua hàng rào, áo đã ướt đẫm mồ hôi.' },
        { sp: 'narr', text: 'Cả buổi sáng và trưa trôi trong tiếng búa đóng cọc, tiếng dây thừng siết chặt, tiếng sọt dưa chín chuyền tay nhau vào kho. Gió bắt đầu đổi hướng, lá cây rung lên từng đợt lạ thường.' },
        {
          prompt: 'Một góc nhà kính bị rách tấm phủ ngay khi gió bắt đầu giật mạnh. {name} xử lý thế nào?',
          choice: [
            {
              label: 'Gọi thêm người, vá từ phía trong theo hướng dẫn của bác — tuyệt đối không trèo lên mái khi gió mạnh',
              fx: { jp: 2, hp: -2, love: 1, money: 0, risk: -2, pressure: 1 },
              note: '{name} vá nhà kính từ phía trong cùng mọi người — chậm hơn một chút mà an toàn, tấm phủ giữ được qua đêm bão.',
              say: [
                { sp: 'hero', jp: 'おやっさん、{破|やぶ}れました。{中|なか}から なおしましょう。{風|かぜ}が つよいので、{上|うえ}には のぼりません。{二人|ふたり}で おさえて ください。', text: '(Bác ơi, rách rồi ạ. Mình sửa từ phía trong đi. Gió mạnh thế này cháu không trèo lên trên đâu. Hai người giữ giúp cháu với.)' },
                { sp: 'Bác chủ trại', jp: 'その {判断|はんだん}でいい。ハウスは あしたも なおせるが、{人|ひと}は なおせない。', text: '(Phán đoán thế là đúng. Nhà kính mai còn sửa được, người thì không.)' }
              ]
            },
            {
              label: 'Tự trèo lên mái vá cho nhanh trước khi gió to hơn nữa',
              fx: { jp: 0, hp: -4, love: 0, money: 0, risk: 5, pressure: 1 },
              note: '{name} định trèo lên mái giữa gió giật — bác chủ trại quát dừng ngay từ dưới đất.',
              say: [
                { sp: 'Bác chủ trại', jp: 'おりろ！{風|かぜ}の {日|ひ}に {屋根|やね}に のぼるやつが、どこに いる。{作業|さぎょう}より {命|いのち}だ。', text: '(Xuống ngay! Ngày gió thế này mà trèo lên mái thì có ai làm thế không. Mạng người hơn công việc.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Việc chống bão xong vừa lúc trời sầm tối sớm. Mây đen kéo về phía núi, và những hạt mưa đầu tiên bắt đầu gõ lên mái tôn của nhà kho.' },
        { sp: 'Bà chủ trại', jp: 'はい、みんな {倉庫|そうこ}に はいって。{新米|しんまい}が たけたよ。{味噌汁|みそしる}と、{漬物|つけもの}と、{畑|はたけ}の トマト。{台風|たいふう}の {日|ひ}の ごはんは、{一緒|いっしょ}に たべるのが {一番|いちばん}だよ。', text: '(Nào, mọi người vào kho cả đi. Cơm gạo mới nấu xong rồi. Súp miso, dưa muối với cà chua ngoài ruộng. Cơm ngày bão, ăn cùng nhau là ngon nhất đấy.)' },
        { sp: 'hero', jp: 'いただきます。……この お{米|こめ}、{香|かお}りが ちがいますね。{自分|じぶん}たちで つくった {米|こめ}だと {思|おも}うと、{特別|とくべつ}です。', text: '(Cháu xin phép dùng bữa ạ. ……Gạo này thơm khác hẳn bà nhỉ. Nghĩ tới việc nó do chính tay mình làm ra, thấy đặc biệt lắm.)' },
        {
          prompt: 'Trong bữa cơm giữa tiếng mưa, bác chủ trại hỏi: “Năm nay của cháu khác năm ngoái ở chỗ nào?” {name} trả lời thế nào?',
          choice: [
            {
              label: 'Trả lời thật lòng: năm ngoái chỉ biết làm theo lời dặn, năm nay đã biết nhìn trời và tính trước một bước',
              fx: { jp: 2, hp: 0, love: 2, money: 0, risk: 0, pressure: 0 },
              note: '{name} nói thật về sự trưởng thành của mình — bác chủ trại gật gù, bà lặng lẽ gắp thêm thức ăn.',
              say: [
                { sp: 'hero', jp: '{去年|きょねん}は {言|い}われたことしか できませんでした。{今年|ことし}は、{空|そら}を みて、{次|つぎ}に なにが くるか {考|かんが}えられるように なりました。……まだまだですが。', text: '(Năm ngoái cháu chỉ làm được những gì được bảo. Năm nay cháu đã biết nhìn trời, nghĩ trước xem điều gì sắp tới. ……Dù còn kém lắm ạ.)' },
                { sp: 'Bác chủ trại', jp: 'それが {農家|のうか}の {目|め}だ。{天気|てんき}は {本|ほん}に ならない、{空|そら}を {読|よ}むんだ。', text: '(Đó là con mắt của nhà nông đấy. Thời tiết không thành sách được — phải đọc bầu trời.)' }
              ]
            },
            {
              label: 'Đùa nhẹ cho qua chuyện: “Cháu ăn khoẻ hơn năm ngoái nhiều ạ”',
              fx: { jp: 1, hp: 1, love: 1, money: 0, risk: 0, pressure: -1 },
              note: '{name} trả lời bằng câu đùa — cả nhà kho bật cười, không khí bữa cơm ngày bão ấm hẳn lên.',
              say: [
                { sp: 'Bà chủ trại', jp: 'ははは、それも {成長|せいちょう}だよ。はい、もう {一杯|いっぱい}。{働|はたら}く {人間|にんげん}は たべないとね。', text: '(Ha ha ha, đó cũng là trưởng thành đấy. Này, thêm một bát nữa. Người làm việc là phải ăn cho khoẻ.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Ngoài kho, mưa đã thành màn trắng xoá, gió gào qua hàng cây chắn gió. Trong kho, đèn vàng, cơm nóng, và bốn người ngồi sát bên nhau chờ bão như chờ một vị khách ồn ào rồi cũng sẽ đi qua.' },
        { sp: 'Bác chủ trại', jp: 'ハウスが たつかは、{明日|あした}の {朝|あさ} わかる。だが {今日|きょう}の {仕事|しごと}は、もう じゅうぶん たった。{食|た}べて、{休|やす}め。', text: '(Nhà kính có trụ được không, sáng mai sẽ rõ. Nhưng công việc hôm nay thì đã trọn vẹn rồi. Ăn đi, nghỉ đi.)' },
        { sp: 'hero', jp: 'はい。{明日|あした}、{朝|あさ} {一番|いちばん}に {畑|はたけ}を みて まわります。{台風|たいふう}、{軽|かる}く すみますように。', text: '(Dạ. Sáng mai cháu sẽ đi kiểm tra khắp ruộng đầu tiên. Mong cơn bão qua nhẹ nhàng thôi ạ.)' }
      ]
    },
    'ind4-nogyo-2': {
      scene: '🏥 Bác chủ trại nhập viện: một mình gánh cả trại và hai chữ “người nhà”',
      branch: [
        { sp: 'narr', text: 'Năm giờ sáng, điện thoại của {name} rung lên giữa lúc trời còn tối. Bà chủ trại ở đầu dây bên kia, giọng run run đứt quãng: đêm qua bác chủ trại đau bụng dữ dội, xe cấp cứu đã đưa vào viện tỉnh, sáng nay phải mổ.' },
        { sp: 'Bà chủ trại', jp: 'あたしは {病院|びょういん}に ついて いく。{数日|すうじつ}、もどれないかも しれない。……{畑|はたけ}のことは、あんたに たのめるかい。', text: '(Tôi phải theo vào viện. Mấy ngày tới chắc không về được đâu. ……Việc ruộng vườn, tôi nhờ cháu được không.) — Giọng bà cố giữ bình tĩnh mà tay nghe rõ cả tiếng run.' },
        { sp: 'hero', jp: 'もちろんです。{畑|はたけ}は おれが まもります。おばさんは {病院|びょういん}のことに {集中|しゅうちゅう}して ください。{毎日|まいにち}、{様子|ようす}を {電話|でんわ}で {報告|ほうこく}します。', text: '(Tất nhiên rồi ạ. Trại cứ để cháu giữ. Bà cứ tập trung lo ở bệnh viện. Mỗi ngày cháu gọi điện báo tình hình ạ.)' },
        { sp: 'narr', text: '{name} ngồi dậy, mở sổ việc của trại và tự viết lịch cho một người: sáng cho gà ăn và nhặt trứng, mở nước tưới nhà kính, trưa thu phần dưa chín tới, chiều đóng hàng giao cho hợp tác xã. Ba ngày — có thể là bốn, năm ngày.' },
        { sp: 'Anh hàng xóm trại', jp: 'おう、{話|はなし}は {聞|き}いた。{朝|あさ}の {水|みず}やりは うちも {手伝|てつだ}う。{困|こま}ったら {夜中|よなか}でも よべ。{隣|となり}ってのは、そのために あるんだ。', text: '(Này, tôi nghe chuyện rồi. Tưới nước buổi sáng nhà tôi phụ một tay. Khó khăn gì cứ gọi, nửa đêm cũng được. Hàng xóm là để lúc này đấy.)' },
        { sp: 'hero', jp: 'ありがとうございます。じゃあ {朝|あさ}の {水|みず}やりを お{願|ねが}いします。おれは {収穫|しゅうかく}と {出荷|しゅっか}に {集中|しゅうちゅう}します。', text: '(Cháu cảm ơn anh. Vậy tưới sáng nhờ anh nhé. Cháu tập trung vào thu hoạch và giao hàng.)' },
        {
          prompt: 'Ngày thứ hai: giờ giao hàng cho hợp tác xã trùng đúng lúc hệ thống tưới tự động trục trặc, nước không lên. {name} xoay thế nào?',
          choice: [
            {
              label: 'Ưu tiên sửa tưới trước vì cây không chờ được, gọi điện cho hợp tác xã xin lùi giờ giao một tiếng và nói rõ lý do',
              fx: { jp: 2, hp: -2, love: 1, money: 0, risk: -1, pressure: 1 },
              note: '{name} cứu cây trước, giao hàng chậm một giờ nhưng đã báo trước — hợp tác xã thông cảm ngay.',
              say: [
                { sp: 'hero', jp: 'すみません、{出荷|しゅっか}を {一時間|いちじかん} おくらせて ください。{水|みず}やりの {機械|きかい}が とまって しまって。{直|なお}り{次第|しだい}、すぐ もって いきます。', text: '(Cháu xin lỗi, cho cháu lùi giờ giao hàng một tiếng ạ. Máy tưới đang hỏng. Sửa xong cháu mang tới ngay.) — Lời xin lỗi nói qua điện thoại, rõ ràng và đến trước giờ hẹn.' },
                { sp: 'narr', text: 'Hợp tác xã trả lời gọn: “Nhà có người nằm viện thì ai chẳng thế. Cứ thong thả.” Nước lên lại sau bốn mươi phút vật lộn với cái van cũ, dưa vẫn kịp chuyến xe chiều.' }
              ]
            },
            {
              label: 'Bỏ buổi tưới hôm nay để giao hàng đúng giờ cho chắc ăn',
              fx: { jp: 0, hp: -1, love: 0, money: 0, risk: 3, pressure: 1 },
              note: '{name} ưu tiên chuyến hàng, bỏ tưới một buổi — chiều về thấy lá dưa héo rũ, phải tưới bù tới tối muộn.',
              say: [
                { sp: 'narr', text: 'Chuyến hàng đi đúng giờ, nhưng buổi chiều quay về, cả dãy dưa trong nhà kính rũ lá xuống vì khát. {name} tưới bù đến khi trời tối hẳn, lưng áo ướt đẫm, và tự hứa: cây cối không biết nói dối về sự vắng mặt của người chăm.' }
              ]
            },
            {
              label: 'Nhờ anh hàng xóm mang hàng đi giao hộ, mình ở lại toàn tâm sửa hệ thống tưới',
              fx: { jp: 1, hp: -1, love: 2, money: 0, risk: -1, pressure: 0 },
              note: '{name} nhờ đúng người, đúng việc — hàng đi đúng giờ, nước cũng lên lại, tình làng xóm thêm một lần được thử lửa.',
              say: [
                { sp: 'Anh hàng xóm trại', jp: 'まかせろ。{出荷|しゅっか}は おれが いく。おまえは {水|みず}を たのむ。……なあ、{一人|ひとり}で かかえるのが {偉|えら}いんじゃ ないぞ。{頼|たよ}るのも {仕事|しごと}だ。', text: '(Để tôi. Giao hàng tôi đi. Cháu lo phần nước. ……Này, ôm hết một mình không phải là giỏi đâu. Biết nhờ người cũng là một phần việc đấy.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Ba ngày trôi qua. Trại vẫn chạy: gà vẫn đẻ trứng đều, nhà kính xanh nguyên, hàng giao đủ từng chuyến. Mỗi tối, {name} gọi một cuộc điện thoại ngắn vào viện, báo đúng ba câu — trại ổn, cây ổn, cháu ổn.' },
        { sp: 'Bà chủ trại', jp: '{手術|しゅじゅつ}は {無事|ぶじ}に おわったよ。あした、{退院|たいいん}できるって。……{畑|はたけ}の {様子|ようす}、{全部|ぜんぶ} {聞|き}いたよ。あんた、ほんとうに よく やって くれたね。', text: '(Ca mổ xong xuôi cả rồi cháu ạ. Mai là được xuất viện đấy. ……Tình hình trại, bà nghe hết rồi. Cháu thật sự đã làm rất tốt.) — Đầu dây bên kia, bà chủ trại khóc khẽ, lần này là vì nhẹ lòng.' },
        {
          prompt: 'Ngày bác chủ trại xuất viện về, {name} chuẩn bị đón thế nào?',
          choice: [
            {
              label: 'Nấu sẵn nồi cháo loãng dễ tiêu, dọn nhà cửa, để sẵn ghế ở hiên — đón bác như đón người thân về nhà',
              fx: { jp: 1, hp: -1, love: 2, money: 0, risk: 0, pressure: -1 },
              note: '{name} đón bác bằng sự chăm sóc của người trong nhà — nồi cháo nóng nói thay mọi lời.',
              say: [
                { sp: 'hero', jp: 'おかえりなさい。おかゆを つくって おきました。{畑|はたけ}のことは {後|あと}で ゆっくり。まず {休|やす}んで ください。', text: '(Mừng bác về nhà ạ. Cháu nấu sẵn cháo rồi. Việc trại để sau thong thả cũng được. Bác nghỉ trước đã ạ.) — Bác chủ trại nhìn nồi cháo, nhìn hiên nhà đã quét sạch, nhìn đôi dép xếp ngay ngắn — rồi nhìn {name} rất lâu, không nói gì.' }
              ]
            },
            {
              label: 'Chuẩn bị sổ sách bàn giao thật chỉn chu: từng chuyến hàng, từng khoản thu, trình bày rành mạch',
              fx: { jp: 2, hp: -1, love: 1, money: 0, risk: -1, pressure: 0 },
              note: '{name} bàn giao sổ sách không thiếu một dòng — sự tin cậy được chứng minh bằng con số sạch sẽ.',
              say: [
                { sp: 'hero', jp: '{出荷|しゅっか}の {記録|きろく}です。{三日分|みっかぶん}、{全部|ぜんぶ} かいて あります。{卵|たまご}の {数|かず}も、{水|みず}やりの {時間|じかん}も。ご{確認|かくにん}ください。', text: '(Đây là sổ giao hàng ạ. Ba ngày, cháu ghi đủ cả. Số trứng, giờ tưới cũng vậy. Bác kiểm tra giúp cháu.)' },
                { sp: 'Bà chủ trại', jp: 'まあ、ここまで きちんと。あんたの {字|じ}、{一年目|いちねんめ}より ずっと {上手|じょうず}に なったねえ。', text: '(Chà, chỉn chu tới mức này. Chữ của cháu giờ đẹp hơn năm đầu nhiều rồi đấy.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Bác chủ trại ngồi xuống hiên nhà, nhìn quanh trại một lượt thật chậm: luống dưa xanh, nhà kính nguyên vẹn, sân vừa được quét. Rồi bác quay sang {name}, nói câu mà {call} sẽ nhớ rất lâu sau khi rời Furano.' },
        { sp: 'Bác chủ trại', jp: '{他人|たにん}はな、{仕事|しごと}の {分|ぶん}だけ やる。だが {家族|かぞく}は、{自分|じぶん}の {家|いえ}の ように まもる。あんたは もう、{家族|かぞく}だよ。', text: '(Người ngoài thì chỉ làm phần việc của họ thôi. Còn người nhà thì giữ gìn như nhà của chính mình. Cháu là người nhà rồi đấy.)' },
        { sp: 'Bà chủ trại', jp: 'これからは {勝手口|かってぐち}じゃ なくて、{玄関|げんかん}から はいって おいで。{家族|かぞく}は {正面|しょうめん}から はいるもんだよ。ごはん、{一緒|いっしょ}に たべよう。', text: '(Từ nay đừng vào bằng cửa sau nữa, vào bằng cửa chính nhé. Người nhà là phải đi cửa chính. Nào, ăn cơm cùng nhau thôi.)' },
        { sp: 'hero', jp: '……ありがとうございます。{家族|かぞく}って よんで もらえるなんて。{日本|にほん}に きて、いちばん うれしい {言葉|ことば}です。', text: '(……Cháu cảm ơn hai bác. Được gọi là người nhà… đó là câu nói khiến cháu vui nhất từ khi tới Nhật.)' },
        { sp: 'narr', text: 'Bữa cơm chiều hôm đó, chỗ ngồi của {name} ở bàn ăn nhà bác chủ trại được dọn sẵn như một điều hiển nhiên. Ngoài sân, hoàng hôn Furano đỏ rực trên những luống dưa vừa qua một tuần không chủ — mà không một ngày nào bị bỏ rơi.' }
      ]
    },

    // ================= DU HỌC — năm thứ hai ở trường chuyên môn =================

    'ind4-duhoc-1': {
      scene: '🎒 Du học năm hai: chọn môn chuyên ngành, cái cân 28 giờ và lời dặn đường dài',
      branch: [
        { sp: 'narr', text: 'Kỳ học mới của năm hai ở trường chuyên môn. Khác năm nhất — khi mọi môn đều bắt buộc — năm nay sinh viên phải tự chọn các môn chuyên ngành. Tờ đăng ký môn học nằm cạnh lịch làm thêm: hai tờ giấy, một con người, và bài toán thời gian bắt đầu khó hơn hẳn.' },
        { sp: 'Thầy chủ nhiệm', jp: '{二年|にねん}の {科目選択|かもくせんたく}は、{将来|しょうらい}の {進路|しんろ}に {直結|ちょっけつ}します。{友達|ともだち}と {同|おな}じだから、という {理由|りゆう}では {選|えら}ばないで ください。', text: '“Việc chọn môn năm hai gắn thẳng tới con đường tương lai. Đừng chọn vì lý do “bạn em cũng chọn môn đó”.”' },
        { sp: 'hero', jp: '{先生|せんせい}、{実践的|じっせんてき}な {科目|かもく}と、{資格|しかく}に つながる {科目|かもく}と、どちらを {優先|ゆうせん}すべきですか。', text: '“Thưa thầy, giữa môn thiên về thực hành và môn gắn với chứng chỉ, em nên ưu tiên bên nào ạ?”' },
        { sp: 'Bạn cùng lớp', jp: 'わたしは {資格|しかく}の {科目|かもく}を とるつもり。でも、{難|むずか}しいから {一緒|いっしょ}に {勉強|べんきょう}できる {仲間|なかま}が ほしいな。……あなたは どうするの。', text: '“Tớ định chọn môn chứng chỉ. Nhưng nó khó, nên tớ muốn có bạn học cùng. ……Còn cậu thì sao?” — Asha hỏi nhỏ trong giờ giải lao, tờ đăng ký của cô bạn cũng còn trống trơn.' },
        {
          prompt: '{name} chốt tổ hợp môn chuyên ngành của mình thế nào?',
          choice: [
            {
              label: 'Chọn môn gắn với nghề muốn làm sau tốt nghiệp, cộng thêm một môn chứng chỉ khó',
              fx: { jp: 3, hp: -1, love: 0, money: 0, risk: 0, pressure: 1 },
              note: 'Du học: chọn môn theo trục nghề nghiệp tương lai — nặng hơn, nhưng hồ sơ tốt nghiệp có hướng rõ ràng.',
              say: [
                { sp: 'hero', jp: 'わたしは {卒業後|そつぎょうご}に つきたい {仕事|しごと}から {逆算|ぎゃくさん}して {選|えら}びます。{実践|じっせん}の {科目|かもく}を {中心|ちゅうしん}に、{資格|しかく}の {科目|かもく}を ひとつ {加|くわ}えます。', text: '“Em chọn bằng cách tính ngược từ công việc muốn làm sau tốt nghiệp ạ. Môn thực hành làm trục chính, thêm một môn chứng chỉ nữa.”' },
                { sp: 'Thầy chủ nhiệm', jp: 'いい {考|かんが}えかただ。{重|おも}い {組合|くみあわ}せだが、{二年目|にねんめ}は そのための {年|とし}だ。{出席|しゅっせき}だけは {落|お}とすなよ。', text: '“Cách nghĩ tốt đấy. Tổ hợp này nặng, nhưng năm hai sinh ra là để cho việc đó. Chỉ đừng để sụt tỷ lệ điểm danh.”' }
              ]
            },
            {
              label: 'Chọn toàn môn nhẹ để giữ sức cho việc làm thêm',
              fx: { jp: 0, hp: 1, love: 0, money: 0.3, risk: 1, pressure: -1 },
              note: 'Du học: chọn môn nhẹ để dồn sức cho baito — thầy chủ nhiệm nhắc: hồ sơ tốt nghiệp nhìn vào môn chuyên ngành, không nhìn vào bảng lương làm thêm.',
              say: [
                { sp: 'Thầy chủ nhiệm', jp: 'アルバイトの {時間|じかん}は {増|ふ}えるだろう。だが、{卒業|そつぎょう}のときに みられるのは {給料明細|きゅうりょうめいさい}じゃ ない。{何|なに}を {学|まな}んだかだ。', text: '“Giờ làm thêm thì tăng đấy. Nhưng lúc tốt nghiệp, người ta không xem bảng lương của em — họ xem em đã học được gì.”' }
              ]
            },
            {
              label: 'Chọn giống hệt Asha cho có bạn học cùng, đỡ phải nghĩ',
              fx: { jp: 1, hp: 0, love: 1, money: 0, risk: 1, pressure: 0 },
              note: 'Du học: chọn môn theo bạn — Asha cũng phải nhắc: đường của hai người khác nhau, môn học không nên là đồ mặc chung.',
              say: [
                { sp: 'Bạn cùng lớp', jp: 'うれしいけど、いいの。わたしの {夢|ゆめ}と あなたの {夢|ゆめ}は ちがうよ。{科目|かもく}は {自分|じぶん}の {進路|しんろ}で {選|えら}ぼう。', text: '“Tớ vui, nhưng thế có ổn không? Giấc mơ của tớ và của cậu khác nhau mà. Môn học thì chọn theo con đường của chính mình đi.”' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Lịch học chốt xong: các buổi sáng và hai buổi chiều kín môn chuyên ngành. Lịch làm thêm ở cửa hàng tiện lợi hiện ở mức 24 giờ một tuần — còn cách trần luật định bốn giờ.' },
        { sp: 'Anh quản lý cửa hàng', jp: 'ねえ、{繁忙期|はんぼうき}に はいるから、シフト {増|ふ}やせる。{週|しゅう}28{時間|じかん}までなら {大丈夫|だいじょうぶ}なんだろう。ぎりぎりまで {入|はい}らないか。', text: '“Này, sắp vào mùa đông khách rồi, anh tăng ca cho em nhé. Trong 28 giờ một tuần thì không sao đúng không? Vào sát trần luôn nhé?”' },
        {
          prompt: 'Quản lý đề nghị tăng ca sát trần 28 giờ. {name} cân bằng thế nào?',
          choice: [
            {
              label: 'Nhận tối đa 26 giờ, chừa hai giờ đệm cho tuần thi và những ca đổi hộ — nói rõ với quản lý ngay từ đầu',
              fx: { jp: 2, hp: 0, love: 0, money: 0.3, risk: -1, pressure: 0 },
              note: 'Du học: giữ khoảng đệm hai giờ dưới trần 28 giờ — tuần thi đến, khoảng đệm ấy cứu cả kỳ học.',
              say: [
                { sp: 'hero', jp: 'ありがとうございます。26{時間|じかん}までで お{願|ねが}いできますか。{試験|しけん}の {週|しゅう}と、{友達|ともだち}の {代|か}わりが あるので、2{時間|じかん}は あけて おきたいんです。', text: '“Em cảm ơn anh. Cho em tối đa 26 giờ được không ạ? Tuần thi và những lúc đổi ca hộ bạn, em muốn chừa sẵn hai giờ trống.”' },
                { sp: 'narr', text: 'Quản lý gật đầu ghi vào bảng ca: “Tính trước cả phần đệm cơ à.” Hai giờ trống nghe thì ít — cho tới tuần thi giữa kỳ, khi cả lớp cuống cuồng xin nghỉ ca, còn {name} đã có sẵn đường lui từ hai tháng trước.' }
              ]
            },
            {
              label: 'Nhận đủ 28 giờ mọi tuần để tăng thu nhập tối đa',
              fx: { jp: 0, hp: -2, love: 0, money: 0.7, risk: 3, pressure: 2 },
              note: 'Du học: chạy sát trần 28 giờ mọi tuần — chỉ một lần đổi ca hộ bạn cũng đủ đẩy tổng giờ vượt giới hạn, rủi ro visa treo lơ lửng.',
              say: [
                { sp: 'narr', text: 'Ba tuần sau, một bạn cùng ca ốm đột xuất, quản lý nhờ {name} “chỉ hai giờ thôi”. Cộng dồn cả tuần: 29 giờ rưỡi. Tờ bảng chấm công nằm trong tay, {name} nhìn con số vượt trần mà lạnh cả sống lưng — giới hạn 28 giờ không trừ hao cho lòng tốt.' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Tối đó, buổi tư vấn định kỳ với thầy Khánh. Thầy nghe hết chuyện chọn môn và chuyện ca làm thêm, im lặng một lúc, rồi nói chậm rãi như mọi lần thầy sắp nói điều quan trọng.' },
        { sp: 'Thầy Khánh', text: '“Chọn môn tốt. Giữ giờ làm thêm có đệm cũng tốt. Nhưng thầy dặn chuyện đường dài này: hai năm chuyên môn không phải đích đến, nó là bệ phóng. Ngay từ năm nay, {call} phải bắt đầu nghĩ xem sau tốt nghiệp mình đi đâu — thi lên cao học, hay đi làm. Hai đường ấy chuẩn bị khác nhau lắm: đường cao học cần điểm số và đề tài, đường đi làm cần chứng chỉ và kinh nghiệm thực tập. Nghĩ sớm một năm là nhẹ đi một năm.”' },
        { sp: 'hero', jp: '{先生|せんせい}、{正直|しょうじき}に {言|い}うと、まだ {決|き}められていません。でも、{考|かんが}えないまま {卒業|そつぎょう}は したくないです。', text: '“Thưa thầy, nói thật là em vẫn chưa quyết được. Nhưng em không muốn để tới tốt nghiệp mà vẫn chưa nghĩ gì ạ.”' },
        { sp: 'Thầy Khánh', jp: '{決|き}まらないのは {悪|わる}くない。{悪|わる}いのは、{考|かんが}えないことだ。{一枚|いちまい}でいい、{計画|けいかく}を かいて みなさい。{来週|らいしゅう}、{一緒|いっしょ}に みよう。', text: '“Chưa quyết được thì không xấu. Xấu là không nghĩ tới. Em cứ viết kế hoạch ra, một trang thôi cũng được. Tuần sau thầy trò mình cùng xem.”' },
        { sp: 'hero', jp: 'はい、{来週|らいしゅう}までに {計画|けいかく}を かいて きます。{科目|かもく}も バイトも、その {計画|けいかく}に あわせて いきます。', text: '“Vâng, tuần sau em sẽ viết xong bản kế hoạch mang tới ạ. Môn học và việc làm thêm, em sẽ xếp theo bản kế hoạch đó.”' },
        { sp: 'narr', text: 'Đêm ấy, trên bàn học của {name} có thêm một tờ giấy trắng mới tinh, dòng đầu tiên viết bằng nét chữ chậm rãi: “Kế hoạch của tôi — từ năm hai tới sau tốt nghiệp.” Viết chưa được chữ nào tiếp theo, mà lưng đã ngồi thẳng hơn.' }
      ]
    },
    'ind4-duhoc-2': {
      scene: '🎤 Du học năm hai: thuyết trình giữa kỳ và buổi tư vấn hướng nghiệp',
      branch: [
        { sp: 'narr', text: 'Một năm trước, buổi phỏng vấn đầu vào trường chuyên môn: {name} trả lời lắp bắp, mắt dán vào tờ giấy chuẩn bị sẵn, câu hỏi bất ngờ đầu tiên đã làm đầu óc trống rỗng. Hôm nay là thuyết trình giữa kỳ năm hai — chủ đề “kế hoạch tương lai của tôi”, và theo sau là phần hỏi đáp không có giấy.' },
        { sp: 'hero', jp: 'わたしの {発表|はっぴょう}の {題|だい}は「{卒業後|そつぎょうご}の {三年|さんねん}」です。{最初|さいしょ}に {結論|けつろん}を {言|い}います。わたしは {卒業後|そつぎょうご}、{日本語|にほんご}と {専門知識|せんもんちしき}の {両方|りょうほう}を {使|つか}う {仕事|しごと}に つきます。そのために、{今年度|こんねんど}は {資格取得|しかくしゅとく}、{来年度|らいねんど}は {実習|じっしゅう}と {就職活動|しゅうしょくかつどう}に {力|ちから}を いれます。', text: '“Đề tài thuyết trình của tôi là “Ba năm sau tốt nghiệp”. Trước hết tôi xin nói kết luận: sau tốt nghiệp, tôi sẽ làm công việc dùng được cả tiếng Nhật lẫn kiến thức chuyên môn. Vì vậy, năm nay tôi tập trung lấy chứng chỉ, năm sau tập trung thực tập và tìm việc.” — Lời mở đầu đi thẳng vào kết luận, không một lần nhìn giấy.' },
        { sp: 'hero', jp: '{理由|りゆう}は {二|ふた}つあります。ひとつは、{専門|せんもん}だけでも、{日本語|にほんご}だけでも、{長|なが}くは {働|はたら}けないからです。もうひとつは、{週|しゅう}28{時間|じかん}の アルバイトの {経験|けいけん}から、{時間|じかん}を {計画的|けいかくてき}に {使|つか}う {力|ちから}が ついたからです。', text: '“Lý do có hai điểm. Một là chỉ có chuyên môn, hoặc chỉ có tiếng Nhật, thì đều không làm việc lâu dài được. Hai là qua kinh nghiệm làm thêm trong giới hạn 28 giờ một tuần, tôi đã rèn được khả năng dùng thời gian có kế hoạch.”' },
        { sp: 'Thầy chủ nhiệm', jp: 'では {質問|しつもん}です。なぜ {国|くに}へ {帰|かえ}らず、{日本|にほん}で {働|はたら}きたいのですか。{理由|りゆう}を {具体的|ぐたいてき}に お{願|ねが}いします。', text: '“Vậy thầy hỏi: vì sao em không về nước mà muốn làm việc ở Nhật? Hãy nêu lý do cụ thể.”' },
        { sp: 'hero', jp: 'はい。{日本|にほん}で {学|まな}んだ {専門技術|せんもんぎじゅつ}は、{現場|げんば}で {使|つか}ってこそ {深|ふか}まります。まず {日本|にほん}で {三年|さんねん}、{現場|げんば}の {経験|けいけん}を つみます。その {経験|けいけん}は、{将来|しょうらい} {国|くに}へ {帰|かえ}ったときにも、{必|かなら}ず {役|やく}に たちます。', text: '“Vâng ạ. Kỹ thuật chuyên môn học ở Nhật chỉ sâu thêm khi được dùng tại hiện trường. Trước hết em sẽ tích lũy ba năm kinh nghiệm làm việc tại Nhật. Kinh nghiệm đó, sau này nếu về nước, chắc chắn cũng sẽ có ích.” — Câu trả lời có mốc thời gian, có lý do, và không một giây ngập ngừng.' },
        {
          prompt: 'Thầy chủ nhiệm hỏi tiếp câu khó nhất buổi: “Nếu không vào được nguyện vọng một thì em tính sao?” {name} trả lời thế nào?',
          choice: [
            {
              label: 'Trình bày kế hoạch B rõ ràng: nguyện vọng hai cùng ngành và phần chuẩn bị đang chạy song song',
              fx: { jp: 3, hp: -1, love: 0, money: 0, risk: -1, pressure: 1 },
              note: 'Du học: trả lời bằng kế hoạch B cụ thể — thầy chủ nhiệm gật đầu: đây là cách nói của người đã lớn.',
              say: [
                { sp: 'hero', jp: '{第二希望|だいにきぼう}も {用意|ようい}して あります。{同|おな}じ {分野|ぶんや}の {別|べつ}の {会社|かいしゃ}です。{資格|しかく}の {勉強|べんきょう}は、どちらの {会社|かいしゃ}にも {必要|ひつよう}なので、{今|いま}から {並行|へいこう}して {進|すす}めています。', text: '“Em đã chuẩn bị cả nguyện vọng hai ạ: một công ty khác trong cùng lĩnh vực. Việc học chứng chỉ thì công ty nào cũng cần, nên em đang tiến hành song song từ bây giờ.”' },
                { sp: 'Thầy chủ nhiệm', jp: '{立派|りっぱ}な {答|こた}えです。{計画|けいかく}に {予備|よび}が ある {人|ひと}は、{本番|ほんばん}で あわてません。', text: '“Câu trả lời rất đĩnh đạc. Người có phương án dự phòng trong kế hoạch thì đến lúc thật sẽ không hoảng.”' }
              ]
            },
            {
              label: 'Trả lời: “Em sẽ cố hết sức nên chưa nghĩ tới chuyện trượt nguyện vọng một”',
              fx: { jp: 1, hp: 0, love: 0, money: 0, risk: 1, pressure: 1 },
              note: 'Du học: câu trả lời đầy quyết tâm nhưng thiếu phương án — thầy nhẹ nhàng chỉ ra chỗ hổng của kế hoạch.',
              say: [
                { sp: 'Thầy chủ nhiệm', jp: '{気持|きも}ちは わかります。でも {大人|おとな}の {計画|けいかく}には、うまくいかない {場合|ばあい}も はいっています。{次|つぎ}の {機会|きかい}に、{予備|よび}の {計画|けいかく}も {話|はな}せるように しましょう。', text: '“Thầy hiểu quyết tâm đó. Nhưng kế hoạch của người trưởng thành phải tính cả trường hợp không suôn sẻ. Lần tới, em hãy nói được cả phương án dự phòng nhé.”' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Tiếng vỗ tay vang lên khi {name} cúi chào kết thúc. Trên bảng điểm, phần hỏi đáp — phần từng là nỗi sợ lớn nhất ở buổi phỏng vấn đầu vào — hôm nay lại là phần được điểm cao nhất.' },
        { sp: 'narr', text: 'Chiều cùng ngày, phòng tư vấn hướng nghiệp. Thầy Khánh đã đọc trước bản kế hoạch một trang mà {name} nộp từ tuần trước, từng dòng đều có vết bút đỏ ghi chú bên lề.' },
        { sp: 'Thầy Khánh', jp: 'まず、{一分|いっぷん}で {計画|けいかく}を {話|はな}して みなさい。{紙|かみ}は みないで。', text: '“Trước hết, em trình bày kế hoạch trong một phút. Không nhìn giấy.” — Thầy Khánh nói ấm mà nghiêm, đúng giọng của thầy từ những ngày đầu.' },
        { sp: 'hero', jp: 'はい。{今年度|こんねんど}は {専門|せんもん}の {資格|しかく}を とります。{来年度|らいねんど}の {前期|ぜんき}に {実習|じっしゅう}、{後期|こうき}に {就職活動|しゅうしょくかつどう}を {始|はじ}めます。{卒業後|そつぎょうご}は {日本|にほん}で {三年|さんねん} {働|はたら}いて、{四年目|よねんめ}に {進路|しんろ}を {見直|みなお}します。', text: '“Vâng ạ. Năm nay em lấy chứng chỉ chuyên môn. Năm sau, học kỳ đầu đi thực tập, học kỳ sau bắt đầu tìm việc. Sau tốt nghiệp em làm việc ở Nhật ba năm, đến năm thứ tư sẽ xem lại con đường của mình.” — Sáu mươi giây, ba mốc thời gian, không vấp một lần.' },
        {
          prompt: 'Thầy Khánh hỏi quyết định cuối cùng: “Vậy trục chính là đi làm sau tốt nghiệp, hay thi lên cao học?” {name} chọn hướng nào làm trục?',
          choice: [
            {
              label: 'Đi làm trước để lấy kinh nghiệm và tự chủ tài chính; cao học để ngỏ, sau ba năm đi làm sẽ tính lại',
              fx: { jp: 2, hp: 0, love: 0, money: 0.3, risk: 0, pressure: 0 },
              note: 'Du học: chốt trục đi làm trước, cao học là cửa để ngỏ có thời hạn — kế hoạch có trục, có nhịp xem lại.',
              say: [
                { sp: 'hero', jp: '{主軸|しゅじく}は {就職|しゅうしょく}です。まず {経済的|けいざいてき}に {自立|じりつ}して、{現場|げんば}を {知|し}りたいんです。{大学院|だいがくいん}は {三年後|さんねんご}に もう {一度|いちど} {判断|はんだん}します。', text: '“Trục chính của em là đi làm ạ. Trước hết em muốn tự chủ về kinh tế và hiểu hiện trường thật sự. Cao học, ba năm sau em sẽ phán đoán lại một lần nữa.”' },
                { sp: 'Thầy Khánh', text: '“Được. Đi làm không phải là đóng cửa học tiếp — đi làm là học bằng một trường khác, trường đời. Miễn là ba năm sau em thật sự ngồi lại phán đoán, như lời hôm nay.”' }
              ]
            },
            {
              label: 'Thi lên cao học ngay sau tốt nghiệp để đào sâu chuyên môn, chấp nhận vừa học vừa làm thêm trong trần 28 giờ lâu dài',
              fx: { jp: 2, hp: -1, love: 0, money: -0.3, risk: 0, pressure: 1 },
              note: 'Du học: chốt trục cao học — con đường dài và tốn kém hơn, nhưng đào sâu chuyên môn tới nơi tới chốn.',
              say: [
                { sp: 'hero', jp: '{主軸|しゅじく}は {進学|しんがく}です。{専門|せんもん}を もっと {深|ふか}く {学|まな}びたいんです。{学費|がくひ}は {今|いま}から {計画的|けいかくてき}に ためます。バイトは 28{時間|じかん}の {範囲内|はんいない}で つづけます。', text: '“Trục chính của em là học lên cao học ạ. Em muốn đào sâu chuyên môn hơn nữa. Học phí em sẽ để dành có kế hoạch từ bây giờ. Làm thêm em vẫn giữ trong giới hạn 28 giờ.”' },
                { sp: 'Thầy Khánh', text: '“Đường dài thì phải có sức bền và có tiền dành. Thầy tôn trọng lựa chọn này — với một điều kiện: mỗi học kỳ, em mang bản kế hoạch tới đây cập nhật cùng thầy một lần. Đường dài không đi bằng một quyết tâm, mà bằng nhiều lần kiểm tra lại.”' }
              ]
            }
          ]
        },
        { sp: 'Thầy Khánh', jp: '{去年|きょねん}の {面接|めんせつ}、{覚|おぼ}えてるか。あのときは {紙|かみ}から {目|め}が はなせなかった。{今日|きょう}の あんたは、{計画|けいかく}を {自分|じぶん}の {言葉|ことば}で {話|はな}せる。……それが {成長|せいちょう}だよ。', text: '“Buổi phỏng vấn năm ngoái, em còn nhớ không? Hồi đó mắt em không rời nổi tờ giấy. Hôm nay em đã nói được kế hoạch bằng lời của chính mình. ……Đó là trưởng thành đấy.”' },
        { sp: 'hero', jp: 'ありがとうございます。{計画|けいかく}は {毎学期|まいがっき}、{見直|みなお}して {報告|ほうこく}します。{言葉|ことば}に した {約束|やくそく}は、{守|まも}ります。', text: '“Em cảm ơn thầy ạ. Bản kế hoạch, mỗi học kỳ em sẽ xem lại và báo cáo thầy. Lời hứa đã nói ra thành tiếng, em sẽ giữ.”' },
        { sp: 'narr', text: 'Ra khỏi phòng tư vấn, {name} đi qua đúng hành lang của buổi phỏng vấn đầu vào năm ngoái. Vẫn hành lang ấy, vẫn cánh cửa ấy — chỉ có người đi qua là đã khác: bước chân chậm, chắc, và trong cặp là một bản kế hoạch cho ba năm tới.' }
      ]
    }
  });
})();
