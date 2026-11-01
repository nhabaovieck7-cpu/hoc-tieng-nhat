(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {
    'ind-seizo-1': {
      scene: '🏭 Buổi đầu ở xưởng cơ khí',
      wrong: {
        0: ['{私|わたし}は {今日|きょう}から ここで はたらく ひとです。よろしく。', '{名前|なまえ}は {私|わたし}です。がんばります。'],
        1: ['{機械|きかい}が へんな {音|おと}です。でも だいじょうぶだと {思|おも}います。', '{音|おと}が へんですが、まだ みなくて いいですか。'],
        2: ['わかりました。{異常|いじょう}が あったら、まず {自分|じぶん}の {力|ちから}で なおします。', '{止|と}めるのは おそいので、{呼|よ}ばずに このまま みています。'],
        3: ['わかりました。{物|もの}は てきとうに おいて、5Sは かたづける だけだと {思|おも}います。', '{道具|どうぐ}の {場所|ばしょ}は じぶんの {近|ちか}くが {便利|べんり}だと {思|おも}います。']
      },
      lines: [
        { sp: 'Senpai Kudo', jp: 'おはよう。{今日|きょう}から {同|おな}じ ラインだな。まず {工場長|こうじょうちょう}に あいさつして こい。', vi: 'Chào buổi sáng. Từ hôm nay cùng một chuyền nhé. Trước tiên qua chào sếp xưởng đi.' },
        { sp: 'hero', jp: 'おはようございます。{本日|ほんじつ}から お{世話|せわ}になります。よろしく お{願|ねが}いいたします。', vi: 'Chào buổi sáng ạ. Từ hôm nay cháu, {name}, xin được giúp đỡ. Mong được chỉ bảo ạ.' },
        { sp: 'Sếp xưởng', jp: 'ようこそ {名古屋|なごや} {工場|こうじょう}へ。ここは {一秒|いちびょう}の おくれが {全体|ぜんたい}に ひびく。{分|わ}からないことは すぐ {聞|き}いて ください。', vi: 'Chào mừng đến xưởng Nagoya. Ở đây chậm một giây là ảnh hưởng cả chuyền. Không hiểu gì thì hỏi ngay nhé.' },
        { sp: 'hero', jp: '{機械|きかい}から いつもと {違|ちが}う {音|おと}が したら、どう {報告|ほうこく}すれば いいですか。', vi: 'Nếu máy phát ra tiếng khác thường thì cháu phải báo cáo thế nào ạ?' },
        { sp: 'Senpai Kudo', jp: 'いい {質問|しつもん}だ。{異常|いじょう}が あったら、まず {止|と}める、{呼|よ}ぶ、{待|ま}つ。{自分|じぶん}で {判断|はんだん}するな。', vi: 'Câu hỏi hay đấy. Có bất thường thì trước hết: dừng, gọi, chờ. Đừng tự phán đoán.' },
        { sp: 'hero', jp: '{了解|りょうかい}しました。{異常|いじょう}が あったら すぐ {止|と}めて、{先輩|せんぱい}を {呼|よ}んで、{指示|しじ}を {待|ま}ちます。', vi: 'Cháu rõ rồi ạ. Có bất thường sẽ dừng ngay, gọi senpai và chờ chỉ thị.' },
        { sp: 'Senpai Kudo', jp: 'そうだ。あと 5S、{言|い}えるか。{整理|せいり}、{整頓|せいとん}、{清掃|せいそう}、{清潔|せいけつ}、しつけだ。', vi: 'Đúng vậy. Còn 5S, nói được không? Sàng lọc, sắp xếp, sạch sẽ, săn sóc, sẵn sàng.' },
        { sp: 'hero', jp: 'はい。{使|つか}わない {物|もの}を {分|わ}けて、{道具|どうぐ}は {決|き}まった {場所|ばしょ}に {戻|もど}して、いつも きれいに します。', vi: 'Dạ. Phân loại đồ không dùng, dụng cụ trả về đúng chỗ quy định, và luôn giữ sạch sẽ ạ.' },
        { sp: 'Sếp xưởng', jp: 'よし。{安全|あんぜん}が {一番|いちばん}だ。{手袋|てぶくろ}と {保護|ほご} メガネを わすれるな。', vi: 'Tốt. An toàn là trên hết. Đừng quên găng tay và kính bảo hộ.' },
        { sp: 'hero', jp: 'はい、{身|み}に つけました。ラインが {止|と}まったら、{勝手|かって}に さわらず すぐ {報告|ほうこく}します。', vi: 'Dạ, cháu đã đeo rồi ạ. Nếu chuyền dừng, cháu sẽ không tự ý chạm vào mà báo ngay.' },
        { sp: 'Senpai Kudo', jp: 'その {言葉|ことば}、わすれるなよ。じゃあ、{今日|きょう}は おれの {横|よこ}で {部品|ぶひん}の {確認|かくにん}からだ。', vi: 'Đừng quên câu đó đấy. Thôi, hôm nay đứng cạnh anh, bắt đầu từ kiểm tra chi tiết nhé.' },
        { sp: 'hero', jp: 'ありがとうございます。しっかり {覚|おぼ}えますので、よろしく お{願|ねが}いします。', vi: 'Em cảm ơn ạ. Em sẽ ghi nhớ kỹ, mong anh chỉ bảo.' },
        { sp: 'Senpai Kudo', jp: 'ん。{声|こえ}が でかいのは いいことだ。{工場|こうじょう}は {声|こえ}で まわるからな。', vi: 'Ừ. Giọng to là tốt đấy. Xưởng này vận hành bằng tiếng hô mà.' }
      ],
      outro: 'Buổi đầu, {name} chưa chạm vào máy mà đã học được bài quan trọng nhất: ở xưởng này, báo cáo nhanh và trung thực còn quý hơn tay nghề. Senpai Kudo ít lời, nhưng ánh mắt đã bớt lạnh. {call} tự nhủ, cứ đúng ba bước dừng — gọi — chờ, rồi mọi thứ sẽ ổn.'
    },
    'ind-seizo-2': {
      scene: '⚠️ Chi tiết lỗi ren trước giờ xuất hàng',
      branch: [
        { sp: 'narr', text: 'Chiều thứ sáu, chuyền chạy nước rút cho lô hàng xuất lúc năm giờ. {name} cầm một chi tiết lên soi dưới đèn, tim khựng lại.' },
        { sp: 'Senpai Kudo', jp: 'どうした、{手|て}が {止|と}まってるぞ。', text: '(Sao thế, tay dừng lại rồi kìa.) — Senpai bước tới, giọng vẫn khô khan.' },
        { sp: 'hero', jp: 'あの、{先輩|せんぱい}。これ、ねじ{山|やま}が つぶれて います。{他|ほか}のも {確認|かくにん}させて ください。', text: '(À, senpai. Cái này ren bị móp rồi ạ. Cho em kiểm tra mấy cái khác nữa.)' },
        { sp: 'narr', text: '{name} kiểm tra nhanh mười chi tiết: ba cái lỗi ren giống hệt. Hộp đã đóng được hơn nửa, xe tải đang chờ ngoài cổng.' },
        { sp: 'Sếp xưởng', jp: '{出荷|しゅっか}まで あと {一時間|いちじかん}だ。{遅|おく}れたら {先方|せんぽう}に {迷惑|めいわく}が かかる。', text: '(Còn một tiếng nữa là xuất hàng. Chậm là gây phiền cho phía khách đấy.) — Sếp xưởng nhìn đồng hồ.' },
        { sp: 'narr', text: 'Nếu báo ngay, cả lô phải khui ra kiểm lại, tiến độ hôm nay coi như mất. Nếu để qua, không ai biết — trừ lương tâm của {name}. Còn tự ý động vào máy chỉnh lại thì khu vực này người mới bị cấm chạm tuyệt đối.' },
        {
          prompt: '{name} quyết định thế nào khi lô hàng sắp xuất mà phát hiện lỗi ren?',
          choice: [
            {
              label: 'Báo ngay cho sếp xưởng, xin dừng lô để kiểm lại toàn bộ',
              fx: { jp: 3, hp: -2, money: 0, risk: -2, pressure: 2 },
              note: '{name} báo lỗi ngay và dừng lô hàng — mất tiến độ nhưng giữ uy tín xưởng.',
              say: [
                { sp: 'hero', jp: '{工場長|こうじょうちょう}、{申|もう}し{訳|わけ}ありません。{不良|ふりょう}が {見|み}つかりました。{出荷|しゅっか}を {止|と}めて、{全部|ぜんぶ} {確認|かくにん}させて ください。', text: '(Sếp xưởng, cháu xin lỗi. Đã phát hiện hàng lỗi. Xin cho dừng xuất hàng để kiểm tra lại toàn bộ ạ.)' },
                { sp: 'Sếp xưởng', jp: '……よく {言|い}った。{止|と}めるぞ、{全員|ぜんいん} {確認|かくにん}に まわれ。', text: '(……Nói tốt lắm. Dừng lô, tất cả chuyển sang kiểm tra lại.)' },
                { sp: 'Senpai Kudo', jp: 'おれも {一緒|いっしょ}に みる。おまえは {悪|わる}くない、{見|み}つけたのが すごいんだ。', text: '(Anh kiểm cùng. Em không có lỗi, phát hiện ra mới là giỏi.) — Lần đầu senpai bênh người khác trước mặt cả chuyền.' }
              ]
            },
            {
              label: 'Để qua, đóng hộp nốt cho kịp xe',
              fx: { jp: 1, hp: 0, money: 0, risk: 4, pressure: -1 },
              note: '{name} im lặng cho lô hàng đi — rủi ro bị khách trả hàng treo lơ lửng.',
              say: [
                { sp: 'narr', text: '{name} nuốt nước bọt, đặt chi tiết lỗi xuống đáy hộp và đóng nắp lại. Xe tải lăn bánh đúng giờ, nhưng suốt buổi tối hình ảnh cái ren móp cứ hiện lên.' },
                { sp: 'Senpai Kudo', jp: '……さっきの、なんか あったか。まあいい、{終|お}わったことだ。', text: '(……Lúc nãy có gì à? Thôi, qua rồi.) — Senpai liếc nhìn, {name} tránh ánh mắt anh.' }
              ]
            },
            {
              label: 'Tự ý mở máy ra chỉnh lại cho nhanh',
              fx: { jp: 0, hp: -4, money: 0, risk: 5, pressure: 3 },
              note: '{name} tự ý chạm vào máy bị cấm — bị senpai chặn lại ngay lập tức.',
              say: [
                { sp: 'Senpai Kudo', jp: 'やめろ！そこは {新人|しんじん}が さわっちゃ いけない {場所|ばしょ}だ。{手|て}を はなせ。', text: '(Dừng lại! Chỗ đó người mới không được chạm vào. Bỏ tay ra.) — Senpai gạt tay {name} ra, giọng gắt hiếm thấy.' },
                { sp: 'Sếp xưởng', jp: '{直|なお}したい {気持|きも}ちは わかる。だが {安全|あんぜん}の ルールを {破|やぶ}るのが {一番|いちばん} {怖|こわ}いんだ。', text: '(Muốn sửa cho nhanh thì chú hiểu. Nhưng phá quy tắc an toàn mới là đáng sợ nhất.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Cả chuyền ở lại thêm bốn mươi phút. Từng hộp được khui ra, soi lại từng chi tiết dưới đèn trắng.' },
        {
          prompt: 'Kiểm lại cả lô rất tốn thời gian. {name} đề xuất cách kiểm thế nào?',
          choice: [
            {
              label: 'Kiểm theo cặp: một người soi, một người hô và đánh dấu',
              fx: { jp: 2, hp: -1, love: 1, money: 0, risk: -1, pressure: 0 },
              note: '{name} đề xuất kiểm theo cặp hô đối chiếu — chậm hơn một chút mà không sót.',
              say: [
                { sp: 'hero', jp: '{二人|ふたり}で みましょう。おれが みて、{先輩|せんぱい}が チェックして ください。もれが なくなります。', text: '(Mình kiểm hai người đi ạ. Em soi, senpai đánh dấu. Sẽ không sót.)' },
                { sp: 'Senpai Kudo', jp: 'いい {考|かんが}えだ。{目|め}は {四|よっ}つ あるほうが つよい。', text: '(Ý hay. Bốn con mắt mạnh hơn hai.)' }
              ]
            },
            {
              label: 'Kiểm một mình thật nhanh để cả chuyền đỡ phải ở lại',
              fx: { jp: 1, hp: -3, love: 0, money: 0, risk: 2, pressure: 1 },
              note: '{name} ôm việc kiểm một mình — nhanh nhưng mắt mỏi, suýt sót một chi tiết lỗi.',
              say: [
                { sp: 'narr', text: '{name} soi một mình đến hoa mắt. Đến hộp cuối, senpai cầm lên một chi tiết {name} vừa cho qua: ren vẫn móp nhẹ ở rìa.' },
                { sp: 'Senpai Kudo', jp: 'ほらな、{一人|ひとり}の {目|め}には {限界|げんかい}が ある。{助|たす}けを {借|か}りるのも {仕事|しごと}だ。', text: '(Thấy chưa, mắt một người có giới hạn. Biết mượn sức người khác cũng là một phần việc.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Từng cặp mắt rà qua từng hộp. Khi hộp cuối được đóng lại, đồng hồ chỉ đúng giờ xe tải phải rời cổng.' },
        { sp: 'Senpai Kudo', jp: '{原因|げんいん}は こっちだ。{型|かた}の {位置|いち}が ほんの すこし ずれてた。おまえの {目|め}が {正解|せいかい}だ。', text: '(Nguyên nhân ở đây. Vị trí khuôn lệch một chút xíu. Mắt em chuẩn đấy.)' },
        { sp: 'hero', jp: '{先輩|せんぱい}、ありがとうございます。{次|つぎ}からも おかしいと {思|おも}ったら すぐ {言|い}います。', text: '(Senpai, em cảm ơn. Từ lần sau thấy lạ là em nói ngay ạ.)' },
        { sp: 'Sếp xưởng', jp: '{今日|きょう}の {遅|おく}れは {工場|こうじょう}の {責任|せきにん}だ。{一人|ひとり}の せいじゃ ない。{帰|かえ}って いいぞ。', text: '(Phần chậm hôm nay là trách nhiệm của xưởng, không phải lỗi của một người. Về được rồi.)' },
        { sp: 'narr', text: 'Ra khỏi cổng xưởng, trời Nagoya đã tối. {name} đói meo, chân mỏi, nhưng trong lòng nhẹ hẳn.' },
        { sp: 'Senpai Kudo', jp: 'おい、{明日|あした}も {同|おな}じ ラインだ。おそい {朝|あさ}ごはんは ぬくなよ。', text: '(Này, mai vẫn cùng chuyền đấy. Đừng bỏ bữa sáng.) — Senpai nói rồi quay đi, khô khan như mọi ngày, mà nghe ấm lạ.' }
      ]
    },
    'ind-seizo-3': {
      scene: '🔧 Được giao máy riêng',
      branch: [
        { sp: 'narr', text: 'Một tháng sau, buổi họp sáng, sếp xưởng gọi tên {name} trước cả chuyền.' },
        { sp: 'Sếp xưởng', jp: '{今日|きょう}から {三番|さんばん}の {機械|きかい}は おまえが {担当|たんとう}だ。{名札|なふだ}も つけて おいた。', text: '(Từ hôm nay máy số ba do cháu phụ trách. Bảng tên cũng gắn sẵn rồi.)' },
        { sp: 'hero', jp: 'ありがとうございます。{責任|せきにん}を もって、{大切|たいせつ}に {使|つか}います。', text: '(Cháu cảm ơn ạ. Cháu sẽ dùng cẩn thận và có trách nhiệm.)' },
        { sp: 'narr', text: 'Bảng tên nhỏ gắn trên máy, ghi tên {name}. Chỉ là một tấm nhựa, mà {call} cứ đưa tay chạm vào mãi.' },
        { sp: 'Senpai Kudo', jp: 'あと {一人|ひとり}、{今日|きょう}から {新人|しんじん}が はいる。おまえが {教|おし}えて やれ。', text: '(Còn nữa, từ hôm nay có một bạn mới vào. Em dạy bạn ấy nhé.)' },
        { sp: 'narr', text: 'Bạn kohai mới đứng ở cửa, mặt tái vì hồi hộp, tay ôm cuốn sổ ghi chép — y hệt {name} của ngày đầu tiên.' },
        {
          prompt: 'Kohai run run hỏi: “Máy kêu lạ thì em phải làm sao ạ?” {name} trả lời thế nào?',
          choice: [
            {
              label: 'Dạy đúng ba bước dừng — gọi — chờ, kèm lý do an toàn',
              fx: { jp: 3, hp: -1, love: 1, money: 0, risk: -2, pressure: 0 },
              note: '{name} dạy kohai ba bước báo cáo bất thường — vòng tròn của ngày đầu khép lại.',
              say: [
                { sp: 'hero', jp: 'まず {止|と}める、{呼|よ}ぶ、{待|ま}つ。{自分|じぶん}で さわらないのが {一番|いちばん} {大事|だいじ}だよ。おれも {最初|さいしょ}は そう {教|おし}わった。', text: '(Trước hết là dừng, gọi, chờ. Không tự chạm vào là quan trọng nhất. Lúc đầu anh/chị cũng được dạy vậy.)' },
                { sp: 'Senpai Kudo', jp: '……いい {教|おし}えかただ。おまえも もう {先輩|せんぱい}だな。', text: '(……Dạy hay đấy. Em cũng thành senpai rồi nhỉ.)' }
              ]
            },
            {
              label: 'Nói qua loa “cứ gọi anh/chị là được” cho nhanh việc',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 2, pressure: -1 },
              note: '{name} dạy qua loa — kohai vẫn lơ mơ về quy trình an toàn.',
              say: [
                { sp: 'narr', text: 'Kohai gật đầu mà mắt vẫn đầy dấu hỏi. Senpai Kudo đứng phía sau nghe hết, khẽ lắc đầu.' },
                { sp: 'Senpai Kudo', jp: 'おい、{教|おし}えるってのは {自分|じぶん}が ハッとした {言葉|ことば}を そのまま わたすことだぞ。', text: '(Này, dạy người khác là trao lại nguyên câu từng làm mình giật mình đấy.)' }
              ]
            }
          ]
        },
        {
          prompt: 'Kohai vẫn căng thẳng, tay run không dám bấm nút dừng thử. {name} làm thế nào?',
          choice: [
            {
              label: 'Đứng ngay sau lưng, bảo bạn ấy cứ bấm — có mình chịu trách nhiệm cùng',
              fx: { jp: 2, hp: 0, love: 1, money: 0, risk: -1, pressure: -1 },
              note: '{name} đứng sau lưng đỡ cho kohai — bạn ấy dám bấm, và hiểu thế nào là senpai.',
              say: [
                { sp: 'hero', jp: 'だいじょうぶ、おれが うしろに いる。{止|と}めるのは {怖|こわ}いことじゃ ない、{守|まも}ることだ。', text: '(Không sao, có anh/chị đứng sau. Dừng máy không phải chuyện đáng sợ, đó là bảo vệ.)' }
              ]
            },
            {
              label: 'Tự bấm mẫu thật nhanh rồi bảo bạn ấy nhìn và làm theo sau',
              fx: { jp: 1, hp: 0, love: 0, money: 0, risk: 1, pressure: 0 },
              note: '{name} làm mẫu quá nhanh — kohai nhìn mà chưa kịp hiểu, vẫn sợ khi tự bấm.',
              say: [
                { sp: 'Senpai Kudo', jp: '{早|はや}すぎる。{新人|しんじん}の {目|め}は まだ おまえの {手|て}に おいついて ないぞ。', text: '(Nhanh quá. Mắt người mới chưa theo kịp tay em đâu.)' }
              ]
            }
          ]
        },
        { sp: 'hero', jp: 'じゃあ、{一緒|いっしょ}に {一回|いっかい} やって みよう。{音|おと}が {変|か}わったら、この ボタンを おして。', text: '(Vậy làm thử cùng nhau một lần nhé. Tiếng máy đổi là bấm nút này.)' },
        { sp: 'narr', text: 'Kohai bấm thử nút dừng, hô to câu báo cáo đầu tiên trong đời đi làm ở Nhật: giọng còn run, nhưng rõ ràng từng chữ.' },
        { sp: 'Senpai Kudo', jp: '{声|こえ}が でかいのは いいことだ。{工場|こうじょう}は {声|こえ}で まわるからな。', text: '(Giọng to là tốt đấy. Xưởng này vận hành bằng tiếng hô mà.)' },
        { sp: 'narr', text: 'Câu nói y hệt ngày đầu senpai nói với {name}. Lần này {call} nghe mà bật cười — hóa ra mình đã đi được một đoạn thật rồi.' },
        { sp: 'Sếp xưởng', jp: '{来月|らいげつ}から {三番|さんばん} ラインの {朝|あさ}の {点検|てんけん}も たのむ。{期待|きたい}してるぞ。', text: '(Từ tháng sau, kiểm tra buổi sáng của chuyền số ba cũng nhờ cháu. Chú kỳ vọng đấy.)' },
        { sp: 'hero', jp: 'はい、お{任|まか}せ ください。{点検表|てんけんひょう}を {前|まえ}の {日|ひ}に {用意|ようい}して おきます。', text: '(Dạ, cứ giao cho cháu. Cháu sẽ chuẩn bị bảng kiểm tra từ hôm trước ạ.)' }
      ]
    },
    'talk-seizo': {
      scene: '🍜 Chuyện phiếm giờ nghỉ trưa',
      wrong: {
        0: ['{名古屋|なごや}の たべものは ぜんぶ あまいと {思|おも}います。', '{手羽先|てばさき}は {魚|さかな}の {名前|なまえ}ですか。'],
        1: ['{先輩|せんぱい}は {休|やす}みの {日|ひ}も {工場|こうじょう}に いるんですか。', '{先輩|せんぱい}の {休|やす}みは ねるだけだと {思|おも}います。']
      },
      lines: [
        { sp: 'Senpai Kudo', jp: 'おい、{昼|ひる}だ。{食堂|しょくどう}の {味噌|みそ}カツ、{今日|きょう}は あたりだぞ。', vi: 'Này, trưa rồi. Món cốt lết sốt miso ở căng-tin hôm nay trúng mánh đấy.' },
        { sp: 'hero', jp: '{本当|ほんとう}ですか。{名古屋|なごや}に きてから {味噌|みそ}の {味|あじ}が {好|す}きに なりました。', vi: 'Thật ạ? Từ khi đến Nagoya em thích vị miso rồi.' },
        { sp: 'Senpai Kudo', jp: 'はは、いい {舌|した}してるな。{休|やす}みの {日|ひ}は なに してるんだ。', vi: 'Ha ha, khẩu vị tốt đấy. Ngày nghỉ em làm gì?' },
        { sp: 'hero', jp: '{先週|せんしゅう}は {川|かわ}の ちかくを さんぽしました。{先輩|せんぱい}は お{休|やす}みは どうして いますか。', vi: 'Tuần trước em đi dạo gần sông. Còn senpai ngày nghỉ thường làm gì ạ?' },
        { sp: 'Senpai Kudo', jp: 'おれは {息子|むすこ}の サッカーの {応援|おうえん}だ。{声|こえ}を だしすぎて {月曜|げつよう}は ガラガラだよ。', vi: 'Anh đi cổ vũ thằng cu đá bóng. Hô nhiều quá nên thứ hai giọng khàn đặc.' },
        { sp: 'hero', jp: 'それで {月曜|げつよう}の {朝礼|ちょうれい}の {声|こえ}が…。あ、すみません、なんでも ないです。', vi: 'Hóa ra vì thế mà giọng họp sáng thứ hai của anh… À, xin lỗi, không có gì ạ.' },
        { sp: 'Senpai Kudo', jp: 'バレてたか。まあ、{家族|かぞく}の ためなら {声|こえ}くらい くれて やるよ。', vi: 'Bị lộ rồi à. Thôi, vì gia đình thì cái giọng này cho cũng được.' }
      ],
      outro: 'Giờ nghỉ chỉ bốn mươi lăm phút, mà {name} biết thêm một điều: senpai khô khan kia hóa ra là ông bố hét khản cổ bên sân bóng mỗi cuối tuần. Chiều vào ca, hai người lại hô báo cáo như thường, chỉ khác là tiếng hô nghe thân hơn một chút.'
    },
    'ind-seibi-1': {
      scene: '🚗 Buổi đầu ở xưởng sửa ô tô',
      wrong: {
        0: ['{車|くるま}の ことは なんでも わかります。まかせて ください。', 'お{客|きゃく}さまの {車|くるま}、すぐ なおします。{約束|やくそく}します。'],
        1: ['へんな {音|おと}ですね。たぶん エンジンが {悪|わる}いです。', '{音|おと}は ききました。{原因|げんいん}は もう わかりました。'],
        2: ['{名前|なまえ}と {電話|でんわ}だけ きけば いいですか。あとは てきとうに かきます。', '{受付表|うけつけひょう}は あとで まとめて かきます。']
      },
      lines: [
        { sp: 'Chủ xưởng', jp: 'おはよう。ここは {豊田|とよた}の {小|ちい}さい {工場|こうじょう}だが、{車|くるま}は {命|いのち}を のせる {物|もの}だ。{丁寧|ていねい}に な。', vi: 'Chào buổi sáng. Đây là xưởng nhỏ ở Toyota, nhưng xe là thứ chở sinh mạng. Làm cho cẩn thận nhé.' },
        { sp: 'hero', jp: 'おはようございます。{本日|ほんじつ}から お{世話|せわ}になります。わからないことは {確認|かくにん}してから {作業|さぎょう}します。', vi: 'Chào buổi sáng ạ. Từ hôm nay cháu xin được giúp đỡ. Việc gì chưa rõ cháu sẽ xác nhận rồi mới làm ạ.' },
        { sp: 'Chủ xưởng', jp: 'よし。ちょうど お{客|きゃく}さまが きた。{受付|うけつけ}を たのむ。まず {話|はなし}を よく {聞|き}くんだ。', vi: 'Tốt. Vừa hay có khách tới. Nhờ cháu tiếp nhận. Trước hết phải nghe kỹ khách nói.' },
        { sp: 'Khách nam', jp: 'あのさ、{走|はし}ってると カラカラって {音|おと}が するんだよ。{止|と}まるときは しないんだ。', vi: 'À này, lúc chạy thì nghe tiếng lạch cạch. Khi dừng thì lại không nghe.' },
        { sp: 'hero', jp: 'かしこまりました。カラカラという {音|おと}は、{走行中|そうこうちゅう}だけで、{停止時|ていしじ}は しないですね。{速度|そくど}で {変|か}わりますか。', vi: 'Cháu rõ rồi ạ. Tiếng lạch cạch chỉ có khi xe chạy, lúc dừng thì không. Tiếng có thay đổi theo tốc độ không ạ?' },
        { sp: 'Khách nam', jp: 'ああ、{早|はや}く {走|はし}ると {音|おと}も {早|はや}く なる。{朝|あさ}の {寒|さむ}いときが とくに ひどいな。', vi: 'Ừ, chạy nhanh thì tiếng cũng nhanh theo. Sáng lạnh là bị nặng nhất.' },
        { sp: 'hero', jp: 'ありがとうございます。{音|おと}の {出|で}る {条件|じょうけん}を {受付表|うけつけひょう}に くわしく {書|か}きました。{点検|てんけん}の {結果|けっか}は お{電話|でんわ}で ご{連絡|れんらく}します。', vi: 'Cháu cảm ơn ạ. Cháu đã ghi chi tiết điều kiện phát tiếng vào phiếu tiếp nhận. Kết quả kiểm tra cháu sẽ gọi điện báo ạ.' },
        { sp: 'Khách nam', jp: 'お、{丁寧|ていねい}だね。じゃあ たのむよ。{夕方|ゆうがた}までに わかると たすかる。', vi: 'Ồ, chu đáo nhỉ. Vậy nhờ nhé. Biết kết quả trước chiều tối thì tốt quá.' },
        { sp: 'Chủ xưởng', jp: 'いい {受付|うけつけ}だった。{整備|せいび}は {直|なお}す {前|まえ}に {聞|き}くことから はじまるんだ。', vi: 'Tiếp nhận tốt lắm. Sửa xe bắt đầu từ việc nghe, trước cả việc sửa.' },
        { sp: 'hero', jp: 'はい。{音|おと}の {情報|じょうほう}が あると、{点検|てんけん}の {順番|じゅんばん}が {決|き}めやすいですね。', vi: 'Dạ. Có thông tin về tiếng kêu thì dễ quyết định thứ tự kiểm tra ạ.' },
        { sp: 'Chủ xưởng', jp: 'その {通|とお}り。じゃあ {道具|どうぐ}の {名前|なまえ}から {覚|おぼ}えよう。レンチ、ドライバー、ジャッキだ。', vi: 'Đúng vậy. Thôi học tên dụng cụ trước: cờ lê, tua vít, con đội.' },
        { sp: 'hero', jp: 'はい、{使|つか}った {道具|どうぐ}は そのつど {元|もと}の {場所|ばしょ}に {戻|もど}します。', vi: 'Dạ, dụng cụ dùng xong cháu sẽ trả về chỗ cũ ngay ạ.' }
      ],
      outro: 'Chiếc phiếu tiếp nhận đầu tiên của {name} kín chữ, không một dòng đoán mò. Chủ xưởng đọc xong chỉ gật đầu, nhưng cái gật ấy nặng hơn mọi lời khen. {call} hiểu ra: ở xưởng này, nghe khách cho hết câu cũng là một kỹ thuật.'
    },
    'ind-seibi-2': {
      scene: '📞 Chẩn đoán suýt sai và cuộc gọi xác nhận',
      branch: [
        { sp: 'narr', text: 'Buổi chiều, {name} nâng xe của vị khách nam lên cầu. Tiếng lạch cạch được khoanh vùng: một bộ phận truyền động giá gần tám man yên, thay là hết kêu — có lẽ vậy.' },
        { sp: 'Chủ xưởng', jp: 'どうだ、{原因|げんいん}は {特定|とくてい}できたか。', text: '(Sao rồi, khoanh được nguyên nhân chưa?)' },
        { sp: 'hero', jp: 'たぶん この {部品|ぶひん}ですが、まだ {百|ひゃく}パーセントでは ありません。{音|おと}の {出|で}かたが すこし ちがいます。', text: '(Có lẽ là bộ phận này ạ, nhưng cháu chưa chắc trăm phần trăm. Cách phát tiếng hơi khác.)' },
        { sp: 'narr', text: 'Bộ phận thay thế đã đặt, ngày mai giao. Nếu thay nhầm, khách mất tám man oan, xưởng mất uy tín. Đồng hồ đã gần năm giờ.' },
        {
          prompt: '{name} xử lý thế nào trước khi thay bộ phận đắt tiền mà mình chưa chắc chắn?',
          choice: [
            {
              label: 'Gọi điện cho khách, mô tả lại và xác nhận triệu chứng trước khi thay',
              fx: { jp: 3, hp: -2, money: 0, risk: -2, pressure: 2 },
              note: '{name} gọi điện xác nhận lại với khách — nghe qua điện thoại khó hơn, nhưng tránh được thay nhầm.',
              say: [
                { sp: 'hero', jp: 'お{電話|でんわ}ありがとうございます。{確認|かくにん}させて ください。{音|おと}は {右|みぎ}に まがるときも {出|で}ますか。', text: '(Cảm ơn bác đã nghe máy. Cho cháu xác nhận: tiếng có phát ra khi rẽ phải không ạ?) — Không nhìn mặt khách, {name} phải nghe từng chữ.' },
                { sp: 'Khách nam', jp: 'いや、まがるときは {出|で}ないな。{真|ま}っすぐ {走|はし}るとき だけだ。あと、{荷物|にもつ}を のせると {大|おお}きく なる。', text: '(Không, rẽ thì không kêu. Chỉ khi chạy thẳng thôi. Với lại chở đồ lên thì tiếng to hơn.)' },
                { sp: 'hero', jp: 'それは {大|おお}きな {手|て}がかりです。ありがとうございます。もう {一度|いちど} {点検|てんけん}してから ご{連絡|れんらく}します。', text: '(Đó là manh mối lớn ạ. Cháu cảm ơn bác. Cháu kiểm tra lại một lần nữa rồi báo lại ạ.)' },
                { sp: 'narr', text: 'Có đồ trên xe thì tiếng to hơn — không phải truyền động, mà là giảm xóc sau đã yếu. Bộ phận cần thay rẻ bằng một phần ba, mà quan trọng hơn: đúng bệnh.' }
              ]
            },
            {
              label: 'Cứ thay theo phán đoán ban đầu cho kịp tiến độ',
              fx: { jp: 0, hp: 0, money: -1.5, risk: 4, pressure: -1 },
              note: '{name} thay nhầm phụ tùng đắt tiền — khách phàn nàn, xưởng phải hoàn tiền.',
              say: [
                { sp: 'narr', text: 'Bộ phận mới lắp xong, xe chạy thử: tiếng lạch cạch vẫn nguyên. Mặt {name} tái đi.' },
                { sp: 'Khách nam', jp: '{音|おと}、まだ してるじゃないか。{八万円|はちまんえん}も かかったのに。', text: '(Tiếng vẫn còn đây này. Tốn tám man yên mà vậy à?) — Khách khoanh tay trước quầy.' },
                { sp: 'Chủ xưởng', jp: 'すみません、これは わたしたちの {確認不足|かくにんぶそく}です。{費用|ひよう}は いただきません。', text: '(Xin lỗi anh, đây là do chúng tôi xác nhận thiếu. Chi phí này chúng tôi không nhận.) — Chủ xưởng cúi đầu, {name} cúi theo, đầu nặng như chì.' }
              ]
            },
            {
              label: 'Hỏi chủ xưởng trước khi quyết định',
              fx: { jp: 2, hp: -1, money: 0, risk: -1, pressure: 1 },
              note: '{name} hỏi chủ xưởng — chậm mà chắc, được chỉ cách kiểm chứng.',
              say: [
                { sp: 'hero', jp: 'しゃちょう、{判断|はんだん}に {自信|じしん}が ありません。{交換|こうかん}の {前|まえ}に みて いただけますか。', text: '(Sếp ơi, cháu không tự tin với phán đoán này. Trước khi thay, sếp xem giúp cháu được không ạ?)' },
                { sp: 'Chủ xưởng', jp: 'よく {言|い}った。{高|たか}い {部品|ぶひん}ほど {急|いそ}ぐな。まず {荷物|にもつ}を のせて {走|はし}って みよう。', text: '(Nói tốt lắm. Bộ phận càng đắt càng không được vội. Trước hết chất đồ lên chạy thử xem.)' },
                { sp: 'narr', text: 'Chất bao cát lên xe, tiếng kêu to hẳn khi qua gờ giảm tốc. Chủ xưởng chỉ tay về phía giảm xóc sau: đúng bệnh, rẻ hơn nhiều.' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Phán đoán cuối cùng đã rõ, nhưng bộ phận giảm xóc đúng chủng loại chỉ còn một cái trong kho, khách thì cần xe ngay tối nay.' },
        {
          prompt: 'Chỉ còn một bộ giảm xóc trong kho. {name} xử lý thứ tự công việc thế nào?',
          choice: [
            {
              label: 'Lắp ngay cho khách đang chờ, ghi phiếu nhập bổ sung sau',
              fx: { jp: 2, hp: -2, love: 1, money: 0, risk: 0, pressure: 1 },
              note: '{name} ưu tiên khách đang chờ — xe xong đúng giờ, phiếu bổ sung được hoàn tất ngay sau đó.',
              say: [
                { sp: 'hero', jp: 'お{客様|きゃくさま}、{部品|ぶひん}の {用意|ようい}が できました。これから {交換|こうかん}して、{試運転|しうんてん}まで します。', text: '(Thưa bác, bộ phận đã sẵn sàng. Cháu thay ngay và chạy thử luôn ạ.)' },
                { sp: 'Chủ xưởng', jp: 'よし、{在庫|ざいこ}の {補充|ほじゅう}は おれが {手配|てはい}する。おまえは {作業|さぎょう}に {集中|しゅうちゅう}しろ。', text: '(Tốt, nhập bổ sung kho để chú lo. Cháu cứ tập trung vào việc sửa.)' }
              ]
            },
            {
              label: 'Để khách chờ, đi kiểm kê lại toàn bộ kho phụ tùng trước',
              fx: { jp: 0, hp: -1, love: -1, money: 0, risk: 1, pressure: 2 },
              note: '{name} sa vào kiểm kê giữa ca sửa — khách chờ sốt ruột, chủ xưởng phải nhắc thứ tự ưu tiên.',
              say: [
                { sp: 'Chủ xưởng', jp: 'おい、{在庫|ざいこ}しらべは あとだ。{待|ま}ってる お{客様|きゃくさま}が {先|さき}。{順番|じゅんばん}を まちがえるな。', text: '(Này, kiểm kê để sau. Khách đang chờ mới là trước. Đừng nhầm thứ tự.)' },
                { sp: 'hero', jp: 'すみません、すぐ {交換|こうかん}に もどります。', text: '(Cháu xin lỗi, cháu quay lại thay ngay ạ.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Tiếng máy thử đều trong sân xưởng. Trên bàn, cuốn sổ ghi chép của {name} thêm một trang kín chữ.' },
        { sp: 'Chủ xưởng', jp: '{整備士|せいびし}の {仕事|しごと}は {当|あ}てることじゃ ない。{外|はず}さないように {確認|かくにん}を かさねることだ。', text: '(Việc của thợ máy không phải đoán trúng, mà là chồng nhiều lớp xác nhận để không trật.)' },
        { sp: 'hero', jp: 'はい。{自信|じしん}が ないときほど、{止|と}まって {確認|かくにん}します。', text: '(Dạ. Càng không tự tin càng phải dừng lại xác nhận ạ.)' },
        { sp: 'narr', text: 'Tối đó, {name} ghi vào sổ tay một dòng: “Bộ phận càng đắt, càng không được vội.” Chữ hơi run vì tay còn dính dầu.' },
        { sp: 'Khách nam', jp: 'お、{音|おと}が きえた。{安|やす}く すんで たすかったよ。ありがとうな。', text: '(Ồ, hết kêu rồi. Rẻ hơn dự tính, may quá. Cảm ơn nhé.)' },
        { sp: 'hero', jp: 'こちらこそ、ご{協力|きょうりょく}ありがとうございました。また {何|なに}か あれば すぐ ご{連絡|れんらく}ください。', text: '(Cháu mới phải cảm ơn bác đã hợp tác ạ. Có gì cứ liên lạc ngay cho xưởng ạ.)' },
        { sp: 'Chủ xưởng', jp: '{電話|でんわ}の {向|む}こうの {声|こえ}だけで {判断|はんだん}するのは {難|むずか}しい。だが、それが できるのが プロだ。', text: '(Chỉ nghe giọng qua điện thoại mà phán đoán được thì khó. Nhưng làm được thế mới là dân chuyên nghiệp.)' }
      ]
    },
    'ind-seibi-3': {
      scene: '🔑 Ca khó nửa đêm và chiếc chìa khóa xưởng',
      branch: [
        { sp: 'narr', text: 'Tám giờ tối, mưa lất phất. Xe cứu hộ kéo vào sân một chiếc xe chết máy giữa đường, chủ xe là một vị khách nữ còn mặc nguyên đồng phục đi làm.' },
        { sp: 'Chị khách', jp: 'すみません、{途中|とちゅう}で エンジンが {止|と}まってしまって。{明日|あした}の {朝|あさ}、{車|くるま}で {出勤|しゅっきん}しないと いけないんです。', text: '(Xin lỗi, xe chết máy giữa đường. Sáng mai tôi phải lái xe đi làm.) — Chị nói nhanh, cố giữ bình tĩnh.' },
        { sp: 'Chủ xưởng', jp: 'だいじょうぶ、みんなで みよう。{閉店|へいてん}は あとまわしだ。', text: '(Không sao, cả xưởng cùng xem. Dẹp chuyện đóng cửa lại sau.)' },
        { sp: 'hero', jp: 'かしこまりました。まず {電気|でんき}の {流|なが}れから {確認|かくにん}します。お{客様|きゃくさま}は {中|なか}で お{待|ま}ちください。', text: '(Cháu rõ rồi ạ. Cháu kiểm tra đường điện trước. Mời chị vào trong chờ ạ.)' },
        { sp: 'narr', text: 'Cả xưởng chia việc không cần ai phân công: người soi đèn, người đo điện, {name} kiểm tra từng đầu nối — bài học “chồng lớp xác nhận” của hôm nào giờ thành nhịp thở.' },
        {
          prompt: 'Đo điện thấy bình thường, máy đề quay yếu. {name} đề xuất bước tiếp theo thế nào?',
          choice: [
            {
              label: 'Kiểm tra đầu nối mass bị oxy hóa trước khi kết luận hỏng máy đề',
              fx: { jp: 3, hp: -2, love: 1, money: 0.5, risk: -2, pressure: 1 },
              note: '{name} tìm đúng đầu nối bị oxy hóa — sửa rẻ, nhanh, khách khỏi thay máy đề đắt tiền.',
              say: [
                { sp: 'hero', jp: 'しゃちょう、{端子|たんし}が さびて {接触|せっしょく}が {悪|わる}いです。みがいて つなぎ{直|なお}せば かかるはずです。', text: '(Sếp ơi, đầu nối bị rỉ, tiếp xúc kém ạ. Đánh sạch nối lại là nổ máy được.)' },
                { sp: 'Chủ xưởng', jp: 'よく みつけた。{高|たか}い {部品|ぶひん}の {前|まえ}に、まず {足元|あしもと}だ。やって みろ。', text: '(Tìm giỏi lắm. Trước bộ phận đắt tiền, cứ nhìn dưới chân trước. Làm thử đi.)' },
                { sp: 'narr', text: 'Tiếng máy nổ giòn trong tiếng mưa. Chị khách bật cười nhẹ nhõm, hai tay còn nắm chặt quai túi.' }
              ]
            },
            {
              label: 'Kết luận ngay là hỏng máy đề, báo khách thay mới',
              fx: { jp: 0, hp: 0, love: -1, money: -1, risk: 3, pressure: 0 },
              note: '{name} kết luận vội — chủ xưởng phải chặn lại và kiểm tra lại từ đầu.',
              say: [
                { sp: 'Chủ xưởng', jp: 'まてまて、{交換|こうかん}は まだ {早|はや}い。{端子|たんし}を みたか。ほら、さびで {真|ま}っ{白|しろ}だ。', text: '(Khoan khoan, thay thì còn sớm. Đã xem đầu nối chưa? Này, rỉ trắng hết rồi.)' },
                { sp: 'hero', jp: 'すみません、また {急|いそ}ぎました。{足元|あしもと}から {確認|かくにん}します。', text: '(Cháu xin lỗi, lại vội nữa rồi. Cháu sẽ kiểm tra từ dưới chân trước ạ.)' }
              ]
            }
          ]
        },
        {
          prompt: 'Xe nổ máy rồi, nhưng đã quá giờ đóng cửa và khách nữ ở xa. {name} đề xuất gì thêm?',
          choice: [
            {
              label: 'Chạy thử một vòng cùng khách và dặn cách gọi xưởng nếu xe lại yếu điện',
              fx: { jp: 2, hp: -1, love: 2, money: 0, risk: -1, pressure: 0 },
              note: '{name} chạy thử cùng khách và dặn đường dây liên lạc — khách ra về thật sự yên tâm.',
              say: [
                { sp: 'hero', jp: 'いちど {一緒|いっしょ}に {走|はし}って みましょう。もし また かかりが {悪|わる}ければ、すぐ {店|みせ}に {電話|でんわ}して ください。', text: '(Mình chạy thử cùng nhau một vòng nhé. Nếu lại khó nổ máy, chị cứ gọi ngay cho xưởng ạ.)' },
                { sp: 'Chị khách', jp: 'そこまで して くれるんですか。{心強|こころづよ}いです。', text: '(Được chăm sóc đến vậy sao. Tôi yên tâm lắm.)' }
              ]
            },
            {
              label: 'Giao xe ngay cho nhanh, xưởng còn phải khóa cửa',
              fx: { jp: 0, hp: 0, love: -1, money: 0, risk: 2, pressure: -1 },
              note: '{name} giao xe vội không chạy thử — chủ xưởng giữ lại thêm năm phút để kiểm chứng.',
              say: [
                { sp: 'Chủ xưởng', jp: 'まて、{試運転|しうんてん}なしの {引|ひ}きわたしは なしだ。{五分|ごふん}の {確認|かくにん}が {信用|しんよう}に なるんだ。', text: '(Khoan, không có chuyện giao xe mà không chạy thử. Năm phút xác nhận đổi lấy niềm tin đấy.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Chiếc xe lăn bánh ra khỏi sân trong mưa đã tạnh, đèn hậu đỏ dần về phía đường lớn.' },
        { sp: 'Chị khách', jp: 'ありがとうございます。{夜|よる}に こんなに {丁寧|ていねい}に みて もらえるなんて。{明日|あした} {安心|あんしん}して {出勤|しゅっきん}できます。', text: '(Cảm ơn mọi người nhiều. Tối thế này mà được kiểm tra chu đáo vậy. Mai tôi yên tâm đi làm rồi.)' },
        { sp: 'Chủ xưởng', jp: 'おい、{片付|かたづ}けは おれが やる。おまえ、{鍵|かぎ}を あずけるから {戸締|とじ}まり たのむ。', text: '(Này, dọn dẹp để chú làm. Giao chìa khóa cho cháu, khóa xưởng nhờ cháu đấy.)' },
        { sp: 'narr', text: 'Chùm chìa khóa — có cả chìa xe nâng và chìa cửa xưởng — nằm gọn trong tay {name}, nặng hơn vẻ ngoài của nó nhiều. Đó không phải chìa khóa, đó là lòng tin.' },
        { sp: 'hero', jp: 'はい、{責任|せきにん}を もって {預|あず}かります。{朝|あさ}、{一番|いちばん}に きて {開|あ}けます。', text: '(Dạ, cháu xin nhận với trách nhiệm. Sáng mai cháu đến sớm nhất mở cửa ạ.)' },
        { sp: 'Chủ xưởng', jp: 'ん。それでいい。{車|くるま}も {店|みせ}も、{人|ひと}に あずけられるやつが プロだ。', text: '(Ừ. Vậy là được. Cả xe lẫn tiệm, giao được cho người khác mới gọi là dân chuyên.)' }
      ]
    },
    'talk-seibi': {
      scene: '☕ Chuyện phiếm bên máy bán nước',
      wrong: {
        0: ['しゃちょうは {車|くるま}と けっこんして いますね。', 'しゃちょうの {一番|いちばん} {好|す}きなのは {車|くるま}で、{家族|かぞく}は {二番|にばん}ですか。'],
        1: ['{休|やす}みの {日|ひ}は {一日中|いちにちじゅう} ねて います。もったいないです。', '{豊田|とよた}には なにも ないので、{休|やす}みは つまらないです。']
      },
      lines: [
        { sp: 'Chủ xưởng', jp: 'よし、{休憩|きゅうけい}だ。{好|す}きなの {飲|の}め、おれの おごりだ。', vi: 'Thôi, nghỉ giải lao. Thích gì cứ lấy, chú đãi.' },
        { sp: 'hero', jp: 'いいんですか。じゃあ この コーヒーを いただきます。しゃちょうは {車|くるま}の {仕事|しごと}、{長|なが}いんですか。', vi: 'Được ạ? Vậy cháu lấy cà phê này. Sếp làm nghề xe lâu chưa ạ?' },
        { sp: 'Chủ xưởng', jp: '{四十年|よんじゅうねん}だな。{初|はじ}めて さわった {車|くるま}は もう {走|はし}ってないが、{手|て}は {覚|おぼ}えてるよ。', vi: 'Bốn mươi năm rồi. Chiếc xe đầu tiên chú chạm vào giờ không còn chạy nữa, mà tay vẫn nhớ.' },
        { sp: 'hero', jp: '{四十年|よんじゅうねん}は すごいですね。{休|やす}みの {日|ひ}は なにを して いますか。', vi: 'Bốn mươi năm ghê thật ạ. Ngày nghỉ sếp thường làm gì ạ?' },
        { sp: 'Chủ xưởng', jp: '{畑|はたけ}だよ。{車|くるま}と {違|ちが}って、{野菜|やさい}は {急|いそ}いで くれないからな。ははは。', vi: 'Ra ruộng thôi. Rau thì khác xe, nó không chịu lớn nhanh cho mình đâu. Ha ha ha.' },
        { sp: 'hero', jp: 'それも いいですね。{今度|こんど} {畑|はたけ}の {話|はなし}も {聞|き}かせて ください。', vi: 'Vậy cũng hay ạ. Lần sau sếp kể cháu nghe chuyện ruộng với nhé.' },
        { sp: 'Chủ xưởng', jp: 'いいとも。{収穫|しゅうかく}の ときは {人手|ひとで}が いるから、おまえも {呼|よ}ぶぞ。', vi: 'Được thôi. Đến mùa thu hoạch cần người, chú gọi cháu đấy.' }
      ],
      outro: 'Lon cà phê ấm trong tay, {name} nghĩ về bốn mươi năm của chủ xưởng: tay nhớ cả những chiếc xe không còn chạy nữa. {call} mong một ngày tay mình cũng nhớ được như thế — và biết đâu bắt đầu từ chính chùm chìa khóa vừa được giao.'
    },
    'ind-soko-1': {
      scene: '🌙 Buổi đầu ca đêm ở kho vận',
      wrong: {
        0: ['{夜|よる}の {仕事|しごと}は ひまなので、ゆっくり やります。', '{荷物|にもつ}は おもくないので、{一人|ひとり}で だいじょうぶです。'],
        1: ['{番号|ばんごう}は みれば わかります。よまなくて いいですか。', 'バーコードが よめないときは、すてて いいですか。'],
        2: ['{千葉|ちば} ゆきは あっちだと {思|おも}います。たぶん あって います。', '{方面|ほうめん}を まちがえても、あとで なおせます。']
      },
      lines: [
        { sp: 'Anh trưởng kho', jp: 'ようこそ {夜勤|やきん}へ。ここは {千葉|ちば}の {物流|ぶつりゅう}センター。{夜|よる}のうちに {荷物|にもつ}を さばくのが {仕事|しごと}だ。', vi: 'Chào mừng đến ca đêm. Đây là trung tâm logistics ở Chiba. Việc của mình là xử lý hàng trong đêm.' },
        { sp: 'hero', jp: 'よろしく お{願|ねが}いします。{初|はじ}めての {夜勤|やきん}なので、ルールを {一|ひと}つずつ {覚|おぼ}えます。', vi: 'Mong anh chỉ bảo ạ. Lần đầu em làm ca đêm nên sẽ học từng quy tắc một.' },
        { sp: 'Chị nhân viên kho', jp: 'まず {荷物|にもつ}の {番号|ばんごう}を {声|こえ}に だして {読|よ}むの。{呼|よ}び{合|あ}わせって いうんだよ。', vi: 'Trước hết đọc to mã kiện hàng lên. Gọi là hô đối chiếu đấy.' },
        { sp: 'hero', jp: 'わかりました。{番号|ばんごう}を {声|こえ}に だして {読|よ}んで、{相方|あいかた}と {確認|かくにん}し{合|あ}います。', vi: 'Em hiểu rồi ạ. Đọc to mã số và đối chiếu xác nhận với bạn cùng cặp.' },
        { sp: 'Anh trưởng kho', jp: 'そうだ。つぎは スキャン。バーコードを よませて、{画面|がめん}の {色|いろ}を みる。{赤|あか}は エラーだ。', vi: 'Đúng rồi. Tiếp là quét mã. Cho đọc mã vạch rồi nhìn màu trên màn hình. Đỏ là lỗi.' },
        { sp: 'hero', jp: 'スキャンの あと {画面|がめん}を {確認|かくにん}します。{赤|あか}く なったら すぐ {止|と}まって {報告|ほうこく}します。', vi: 'Quét xong em sẽ kiểm tra màn hình. Hiện đỏ là dừng ngay và báo cáo ạ.' },
        { sp: 'Chị nhân viên kho', jp: 'いいね。{方面別|ほうめんべつ}に わけるのが {最後|さいご}。この ベルトは {船橋|ふなばし}、あっちは {市川|いちかわ} ゆきだよ。', vi: 'Tốt. Cuối là chia theo tuyến. Băng này đi Funabashi, bên kia đi Ichikawa đấy.' },
        { sp: 'hero', jp: 'はい、{行|ゆ}き{先|さき}の {札|ふだ}を みてから ベルトに のせます。{迷|まよ}ったら {手|て}を {止|と}めて {聞|き}きます。', vi: 'Dạ, em sẽ nhìn thẻ điểm đến rồi mới đặt lên băng. Phân vân là dừng tay hỏi ngay ạ.' },
        { sp: 'Anh trưởng kho', jp: 'その {姿勢|しせい}で いい。{夜|よる}は {眠|ねむ}いのが {敵|てき}だ。こまったら {声|こえ}を かけ{合|あ}おう。', vi: 'Thái độ vậy là được. Ban đêm, buồn ngủ là kẻ thù. Khó khăn gì thì gọi nhau nhé.' },
        { sp: 'hero', jp: 'ありがとうございます。{休憩|きゅうけい}の ときに {体|からだ}を うごかして、{最後|さいご}まで {集中|しゅうちゅう}します。', vi: 'Em cảm ơn ạ. Giờ nghỉ em sẽ vận động người, tập trung đến cuối ca.' },
        { sp: 'Chị nhân viên kho', jp: 'じゃあ {最初|さいしょ}の {一箱|ひとはこ}、{一緒|いっしょ}に やろう。{番号|ばんごう}、{読|よ}んで みて。', vi: 'Vậy kiện đầu tiên làm cùng nhau nhé. Đọc mã thử xem.' },
        { sp: 'hero', jp: 'はい。ゼロ、{八|はち}、{三|さん}、{五|ご}、{二|に}。{船橋|ふなばし} ゆきで あって いますか。', vi: 'Dạ. 0, 8, 3, 5, 2. Đi Funabashi, đúng không ạ?' }
      ],
      outro: 'Đêm đầu tiên, {name} học được rằng kho vận không chạy bằng sức mà chạy bằng tiếng hô và sự đối chiếu. Mỗi kiện hàng qua tay đều có một người đang chờ ở đầu kia. {call} hô mã đến khản giọng, mà thấy mình thuộc về ê-kíp này nhanh hơn tưởng tượng.'
    },
    'ind-soko-2': {
      scene: '🏃 Kiện hàng dán nhầm nhãn trước giờ xe lăn bánh',
      branch: [
        { sp: 'narr', text: 'Hai giờ sáng, xe tuyến cuối sắp lăn bánh. {name} chợt nhìn thấy một kiện quen quen trên băng: nhãn ghi Ichikawa, nhưng mã kiện mình vừa hô lúc nãy lại thuộc tuyến Funabashi.' },
        { sp: 'hero', jp: 'あれ、この {荷物|にもつ}、さっき おれが ラベルを はったやつだ。{行|ゆ}き{先|さき}が ちがう…。', text: '(Ơ, kiện này là cái mình vừa dán nhãn lúc nãy. Điểm đến sai rồi…) — {name} toát mồ hôi lạnh giữa kho lạnh.' },
        { sp: 'Chị nhân viên kho', jp: 'どうしたの、{顔色|かおいろ} {悪|わる}いよ。{車|くるま}、あと {五分|ごふん}で でるよ。', text: '(Sao thế, mặt cắt không còn giọt máu. Xe năm phút nữa là chạy đấy.)' },
        { sp: 'narr', text: 'Chính tay {name} dán nhầm nhãn khi cơn buồn ngủ ập tới. Kiện hàng là thuốc cần giao buổi sáng cho một hiệu thuốc ở Funabashi. Ba lối đi hiện ra cùng lúc.' },
        {
          prompt: 'Xe sắp chạy, kiện dán nhầm nhãn là do chính {name}. {call} làm gì?',
          choice: [
            {
              label: 'Chạy ra báo ngay trưởng kho, xin dừng xe kiểm lại',
              fx: { jp: 3, hp: -3, love: 1, money: 0, risk: -3, pressure: 2 },
              note: '{name} chạy bộ ra đầu xe báo dừng — mất mặt trước cả đội nhưng cứu được kiện thuốc.',
              say: [
                { sp: 'hero', jp: 'リーダー、すみません。おれが ラベルを まちがえました。{車|くるま}を {止|と}めて ください、{一箱|ひとはこ}だけ {確認|かくにん}させて ください。', text: '(Trưởng kho, em xin lỗi. Em dán nhầm nhãn. Xin dừng xe, cho em kiểm lại đúng một kiện thôi ạ!) — {name} chạy hụt hơi, hô to giữa sân.' },
                { sp: 'Anh trưởng kho', jp: 'わかった、{止|と}める。よく {言|い}った、それが {一番|いちばん} {早|はや}い {直|なお}しかただ。', text: '(Rõ, dừng xe. Nói ra được là tốt, đó là cách sửa nhanh nhất.)' },
                { sp: 'narr', text: 'Kiện hàng được kéo ra ở phút thứ tư, dán lại nhãn Funabashi trước mắt cả đội. Không ai cười — ai làm ca đêm cũng từng có một đêm như thế.' }
              ]
            },
            {
              label: 'Im lặng cho qua, chắc không ai phát hiện đâu',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 5, pressure: 1 },
              note: '{name} im lặng cho xe chạy — kiện thuốc thất lạc, sáng mai hiệu thuốc không có hàng.',
              say: [
                { sp: 'narr', text: 'Xe lăn bánh vào màn đêm. {name} quay lại băng chuyền, tay vẫn quét mã mà đầu chỉ nghĩ đến một hiệu thuốc ở Funabashi sáng mai mở cửa không có thuốc.' },
                { sp: 'Chị nhân viên kho', jp: 'ねえ、さっきの {荷物|にもつ}の こと、まだ {気|き}に してる でしょ。{顔|かお}に かいて あるよ。', text: '(Này, còn nghĩ về kiện lúc nãy đúng không. Viết hết lên mặt rồi kìa.)' }
              ]
            },
            {
              label: 'Tự lẻn ra xe, lén sửa lại nhãn cho xong',
              fx: { jp: 1, hp: -2, love: 0, money: 0, risk: 4, pressure: 2 },
              note: '{name} tự ý ra khu vực xe — sai quy trình an toàn, bị trưởng kho bắt gặp.',
              say: [
                { sp: 'Anh trưởng kho', jp: 'おい、{車|くるま}の {周|まわ}りは {立|た}ち{入|い}り {禁止|きんし}だ。なにを してる。', text: '(Này, quanh xe là khu vực cấm vào. Em đang làm gì đấy?) — Đèn pin của trưởng kho chiếu thẳng tới.' },
                { sp: 'hero', jp: 'すみません、ラベルを なおそうと…。{順番|じゅんばん}を まちがえました、まず {報告|ほうこく}でした。', text: '(Em xin lỗi, em định sửa nhãn… Em sai thứ tự rồi, lẽ ra phải báo cáo trước ạ.)' },
                { sp: 'Anh trưởng kho', jp: '{直|なお}したい {気持|きも}ちは わかる。でも {安全|あんぜん}の ルートを とおらない {修正|しゅうせい}は {事故|じこ}の もとだ。', text: '(Muốn sửa thì anh hiểu. Nhưng sửa không qua đường an toàn là mầm tai nạn.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Xe được giữ lại thêm mười phút. Cả khu vực đóng gói nín thở nhìn kiện hàng bị dán nhầm được kéo xuống khỏi thùng xe.' },
        { sp: 'Chị nhân viên kho', jp: 'あった、この {箱|はこ}だよ。ラベル、たしかに {違|ちが}う。{間|ま}に{合|あ}ったね。', text: '(Đây rồi, đúng kiện này. Nhãn sai thật. Kịp rồi nhé.)' },
        {
          prompt: 'Kiện đã cứu được, nhưng ca vẫn còn dài. {name} rút kinh nghiệm ngay trong đêm thế nào?',
          choice: [
            {
              label: 'Tự đề xuất từ giờ hô mã hai lần và nhờ người bên cạnh xác nhận chéo',
              fx: { jp: 2, hp: -1, love: 1, money: 0, risk: -2, pressure: 0 },
              note: '{name} tự đặt quy tắc hô hai lần, xác nhận chéo — trưởng kho gật đầu cho áp dụng cả khu vực.',
              say: [
                { sp: 'hero', jp: 'これからは {番号|ばんごう}を {二回|にかい} よんで、となりの {人|ひと}にも みて もらいます。', text: '(Từ giờ em sẽ đọc mã hai lần và nhờ người bên cạnh nhìn hộ ạ.)' },
                { sp: 'Anh trưởng kho', jp: 'いい {提案|ていあん}だ。その ルール、この エリア {全体|ぜんたい}で つかおう。', text: '(Đề xuất hay. Quy tắc đó áp dụng cho cả khu vực này luôn.)' }
              ]
            },
            {
              label: 'Chỉ lặng lẽ làm tiếp, tự hứa trong bụng là được',
              fx: { jp: 0, hp: 0, love: 0, money: 0, risk: 1, pressure: 0 },
              note: '{name} chỉ hứa thầm — không có cơ chế mới nên nguy cơ lặp lại vẫn còn.',
              say: [
                { sp: 'Chị nhân viên kho', jp: '{決心|けっしん}だけじゃ {眠気|ねむけ}には かてないよ。{仕組|しく}みに しないと。', text: '(Chỉ quyết tâm thôi thì không thắng nổi cơn buồn ngủ đâu. Phải biến thành cơ chế mới được.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Từ lúc đó, tiếng hô mã ở khu vực của {name} vang hai lần liên tiếp, đều đặn như nhịp trống trong đêm.' },
        { sp: 'hero', jp: 'ゼロ、{八|はち}、{三|さん}、{五|ご}、{二|に}。もう {一度|いちど}、ゼロ、{八|はち}、{三|さん}、{五|ご}、{二|に}。{船橋|ふなばし}、{合|あ}ってます。', text: '(0, 8, 3, 5, 2. Một lần nữa: 0, 8, 3, 5, 2. Funabashi, khớp rồi ạ.)' },
        { sp: 'Anh trưởng kho', jp: '{全員|ぜんいん}、{今日|きょう}の ことを {覚|おぼ}えて おけ。{間違|まちが}いは {起|お}きる。{隠|かく}すかどうかで {人|ひと}が わかるんだ。', text: '(Cả đội nhớ chuyện hôm nay. Sai sót thì ai cũng có. Giấu hay không mới biết được con người.)' },
        { sp: 'Chị nhân viên kho', jp: 'ほら、あったかい コーヒー。{次|つぎ}は {眠|ねむ}いときこそ {声|こえ}を だして {読|よ}むんだよ。', text: '(Này, cà phê nóng đây. Lần sau càng buồn ngủ càng phải đọc to lên đấy.)' },
        { sp: 'hero', jp: 'ありがとうございます。{眠気|ねむけ}が きたら、{必|かなら}ず {声|こえ}に だして、となりの {人|ひと}と {確認|かくにん}します。', text: '(Em cảm ơn chị. Buồn ngủ tới là em nhất định đọc to và đối chiếu với người bên cạnh ạ.)' },
        { sp: 'narr', text: 'Ba giờ sáng, hiệu thuốc ở Funabashi nhận kiện đúng giờ. Không ai ở đó biết đêm nay nó suýt đi lạc — trừ ê-kíp ca đêm và lương tâm vừa nhẹ đi của {name}.' }
      ]
    },
    'ind-soko-3': {
      scene: '🍜 Đêm cao điểm cuối tháng và mì ly lúc 2 giờ sáng',
      branch: [
        { sp: 'narr', text: 'Đêm cuối tháng, lượng hàng gấp đôi ngày thường. Đây là đêm cao điểm mà cả kho nhắc tới từ đầu tuần với vẻ vừa ngán vừa tự hào.' },
        { sp: 'Anh trưởng kho', jp: '{今夜|こんや}は {山|やま}だ。だが、うちの チームは {先月|せんげつ}も こえた。{焦|あせ}らず、{正確|せいかく}に いこう。', text: '(Đêm nay là một ngọn núi đấy. Nhưng đội mình tháng trước cũng vượt qua rồi. Đừng vội, cứ chính xác mà làm.)' },
        { sp: 'Chị nhân viên kho', jp: 'わたしは {入|い}り{口|くち}の スキャン、そちらは {方面別|ほうめんべつ}の {最後|さいご}の {確認|かくにん}で いい。', text: '(Chị quét ở đầu vào, {name} chốt kiểm tra theo tuyến ở cuối nhé, được không?)' },
        { sp: 'hero', jp: 'はい、{最後|さいご}の {砦|とりで}は おれが みます。{赤|あか}が でたら その {場|ば}で {止|と}めます。', text: '(Dạ, chốt cuối để em giữ. Hiện đỏ là em dừng ngay tại chỗ.)' },
        { sp: 'narr', text: 'Hàng đổ về như sóng. Tiếng hô mã, tiếng bíp quét mã và tiếng băng chuyền quyện thành một thứ nhạc nền chỉ ca đêm mới có.' },
        {
          prompt: 'Giữa đêm, một bạn mới bắt đầu rối, hàng ở khu vực bạn ấy dồn ứ. {name} làm gì?',
          choice: [
            {
              label: 'Sang phụ một tay, vừa làm vừa hô mẫu cho bạn ấy bắt nhịp',
              fx: { jp: 2, hp: -3, love: 2, money: 0, risk: -2, pressure: -1 },
              note: '{name} sang hỗ trợ bạn mới — cả khu vực thông lại trong mười phút.',
              say: [
                { sp: 'hero', jp: 'こっち、{半分|はんぶん} もらうよ。{番号|ばんごう}は {声|こえ}に だして、{焦|あせ}ったら {深呼吸|しんこきゅう}。これで いこう。', text: '(Phía này để anh/chị lấy một nửa. Mã thì đọc to lên, rối thì hít sâu. Cứ thế mà làm.)' },
                { sp: 'Chị nhân viên kho', jp: 'お、{流|なが}れが もどった。{教|おし}えながら {自分|じぶん}の {分|ぶん}も こなすなんて、もう {戦力|せんりょく}だね。', text: '(Ồ, dòng hàng thông lại rồi. Vừa dạy vừa làm phần mình, giờ là trụ cột thật rồi đấy.)' }
              ]
            },
            {
              label: 'Chỉ giữ phần việc của mình cho thật chuẩn',
              fx: { jp: 1, hp: -1, love: 0, money: 0, risk: 1, pressure: 0 },
              note: '{name} giữ chắc phần mình — không lỗi, nhưng khu vực bạn mới vẫn ì ạch đến gần sáng.',
              say: [
                { sp: 'narr', text: 'Chốt của {name} không một lỗi nào. Nhưng mắt {call} cứ liếc sang khu vực đang dồn ứ, và cái liếc ấy nặng dần theo từng giờ.' },
                { sp: 'Anh trưởng kho', jp: 'チームの {記録|きろく}は {全員|ぜんいん}の {足並|あしな}みで きまる。{次|つぎ}は {声|こえ}を かけて やれ。', text: '(Kỷ lục của đội do nhịp chân của tất cả quyết định. Lần sau nhớ gọi nhau một tiếng.)' }
              ]
            }
          ]
        },
        {
          prompt: 'Sóng hàng cuối ập tới lúc gần bốn giờ sáng, ai cũng rã rời. {name} giữ nhịp đội thế nào?',
          choice: [
            {
              label: 'Đứng ra hô nhịp chung cho cả khu vực, luân phiên đổi vị trí cho đỡ mỏi',
              fx: { jp: 2, hp: -2, love: 2, money: 0, risk: -1, pressure: -1 },
              note: '{name} hô nhịp và xoay vị trí cho cả đội — sóng hàng cuối qua đi mà không một lỗi.',
              say: [
                { sp: 'hero', jp: 'みんな、{声|こえ}を あわせよう。{三十分|さんじゅっぷん}ごとに {場所|ばしょ}を かわって、{眠気|ねむけ}を ちらそう。', text: '(Mọi người hô nhịp cùng nhau nhé. Ba mươi phút đổi vị trí một lần cho tỉnh ngủ.)' },
                { sp: 'Chị nhân viên kho', jp: 'その {声|こえ}、{夜|よる}の {倉庫|そうこ}に ひびいて いいね。あと すこし、がんばろう。', text: '(Tiếng hô đó vang trong kho đêm hay lắm. Còn chút nữa thôi, cố lên.)' }
              ]
            },
            {
              label: 'Tăng tốc phần mình tối đa để kết thúc sớm, kệ nhịp chung',
              fx: { jp: 1, hp: -3, love: 0, money: 0, risk: 2, pressure: 1 },
              note: '{name} bung tốc một mình — phần mình nhanh nhưng nhịp đội lệch, suýt lẫn hai kiện khác tuyến.',
              say: [
                { sp: 'Anh trưởng kho', jp: '{早|はや}いのは いいが、チームの {呼吸|こきゅう}が くずれる。{夜勤|やきん}は リレーだと いっただろ。', text: '(Nhanh thì tốt, nhưng nhịp thở của đội vỡ mất. Anh đã nói ca đêm là chạy tiếp sức mà.)' }
              ]
            }
          ]
        },
        { sp: 'Anh trưởng kho', jp: '{集計|しゅうけい}が でたぞ。{今夜|こんや}、エラー ゼロ。うちの チームの {新記録|しんきろく}だ。', text: '(Có tổng kết rồi. Đêm nay, lỗi bằng không. Kỷ lục mới của đội mình đấy.)' },
        { sp: 'narr', text: 'Tiếng reo nhỏ vang trong kho lúc hai giờ sáng — nhỏ thôi, vì ai cũng mệt, mà ấm lạ thường.' },
        { sp: 'Anh trưởng kho', jp: 'よし、{特別|とくべつ}だ。カップ{麺|めん}、{全員|ぜんいん} おれの おごりだ。{五分|ごふん}だけ {座|すわ}ろう。', text: '(Thôi, đặc biệt nhé. Mì ly, cả đội anh đãi. Ngồi xuống năm phút nào.)' },
        { sp: 'Chị nhân viên kho', jp: '{夜中|よなか} {二時|にじ}の カップ{麺|めん}って、なんで こんなに おいしいんだろうね。', text: '(Mì ly lúc hai giờ sáng, sao mà ngon thế không biết.)' },
        { sp: 'hero', jp: 'みんなで {食|た}べるからだと {思|おも}います。{今夜|こんや}のことは わすれません。', text: '(Em nghĩ vì ăn cùng nhau ạ. Đêm nay em không quên được đâu.)' },
        { sp: 'narr', text: 'Năm phút mì ly giữa kho hàng lạnh, hơi nóng bốc lên mờ cả kính. Tình anh em ca đêm hóa ra có vị như thế: mặn, nóng, và đến đúng lúc mệt nhất.' }
      ]
    },
    'talk-soko': {
      scene: '🌃 Chuyện phiếm giờ nghỉ ca đêm',
      wrong: {
        0: ['{夜勤|やきん}の ひとは みんな へんな ひとだと {思|おも}います。', '{朝|あさ}まで おきてるのは かんたんです。{眠|ねむ}く なりません。'],
        1: ['お{子|こ}さんは おかあさんが {夜|よる} いないので、まいばん ないて いますか。', '{朝|あさ} かえっても ねないで、ずっと あそんで あげるんですか。']
      },
      lines: [
        { sp: 'Chị nhân viên kho', jp: 'はい、{休憩|きゅうけい}。コンビニの {新作|しんさく} パン、{買|か}って きたよ。{半分|はんぶん} あげる。', vi: 'Này, nghỉ giải lao. Chị mua bánh mới ở combini đây. Cho em một nửa.' },
        { sp: 'hero', jp: 'ありがとうございます。{夜勤|やきん}に なれて きましたが、{休憩|きゅうけい}の パンが いちばんの たのしみです。', vi: 'Em cảm ơn chị. Em quen ca đêm rồi, mà bánh giờ nghỉ vẫn là niềm vui nhất.' },
        { sp: 'Chị nhân viên kho', jp: 'わかるわかる。{家|いえ}の {子|こ}はね、わたしが {夜|よる} はたらく {理由|りゆう}を まだ しらないの。', vi: 'Hiểu, hiểu. Con chị ở nhà ấy, nó vẫn chưa biết vì sao mẹ đi làm đêm đâu.' },
        { sp: 'hero', jp: 'そうなんですか。{朝|あさ} かえると、{子|こ}どもさんは よろこびますか。', vi: 'Vậy ạ. Sáng chị về, bé có mừng không ạ?' },
        { sp: 'Chị nhân viên kho', jp: 'うん、{寝|ね}ぼけながら くっついて くる。それで {疲|つか}れが とぶんだよね。', vi: 'Ừ, nó ngái ngủ mà cứ bám lấy. Thế là mệt bay hết đấy.' },
        { sp: 'hero', jp: 'いいですね。おれも {休|やす}みの {日|ひ}は {昼|ひる}まで ねて、{夕方|ゆうがた}は さんぽに いきます。', vi: 'Hay quá ạ. Em ngày nghỉ thì ngủ tới trưa, chiều đi dạo một vòng.' },
        { sp: 'Chị nhân viên kho', jp: 'その リズム、{大事|だいじ}に してね。さあ、{後半|こうはん}も {声|こえ} だして いこう。', vi: 'Giữ nhịp đó cho kỹ nhé. Thôi, nửa sau ca lại hô to lên nào.' }
      ],
      outro: 'Nửa cái bánh mì combini và câu chuyện về đứa trẻ ngái ngủ bám mẹ lúc sáng sớm — ca đêm của {name} có thêm một lý do để hô mã cho thật chuẩn: ở cuối mỗi kiện hàng, luôn có một mái nhà đang chờ. {call} quay lại băng chuyền, giọng hô đầu tiên của nửa sau ca nghe chắc hẳn.'
    },
    'ind-nogyo-1': {
      scene: '🌅 Buổi đầu 4 giờ sáng ở trang trại',
      wrong: {
        0: ['{朝|あさ} {四時|よじ}は はやいですね。でも {平気|へいき}です、ねむく ありません。', '{農作業|のうさぎょう}は かんたんだと {思|おも}います。'],
        1: ['これは トマトですか。あれも トマトですか。', '{野菜|やさい}の {名前|なまえ}は あとで まとめて {覚|おぼ}えます。'],
        2: ['{道具|どうぐ}は つかえば わかります。きかなくて いいですか。', 'ハサミは ハサミです。{切|き}れれば なんでも いいです。']
      },
      lines: [
        { sp: 'Bác chủ trại', jp: 'おう、よく {来|き}た。{富良野|ふらの}の {朝|あさ}は {四時|よじ}からだ。{空|そら}を みろ、もう {明|あか}るいぞ。', vi: 'Ồ, đến rồi hả. Buổi sáng ở Furano bắt đầu từ bốn giờ. Nhìn trời đi, đã sáng rồi đấy.' },
        { sp: 'hero', jp: 'おはようございます。{本日|ほんじつ}から お{世話|せわ}になります。{早起|はやお}きには {慣|な}れて おきますので、よろしく お{願|ねが}いします。', vi: 'Cháu chào bác buổi sáng ạ. Từ hôm nay cháu xin được giúp đỡ. Cháu sẽ tập quen dậy sớm, mong bác chỉ bảo.' },
        { sp: 'Bà chủ trại', jp: 'はい、ぼうし。{日|ひ}が でたら あついからね。まず {野菜|やさい}の {名前|なまえ}から {覚|おぼ}えようか。', vi: 'Này, mũ đây. Nắng lên là nóng lắm. Trước hết học tên rau củ nhé.' },
        { sp: 'hero', jp: 'ありがとうございます。これは メロン、こちらは トウモロコシですね。{葉|は}の {形|かたち}で {見分|みわ}けるんですか。', vi: 'Cháu cảm ơn bà. Đây là dưa lưới, kia là ngô. Phân biệt bằng hình lá hả bà?' },
        { sp: 'Bà chủ trại', jp: 'そうそう。あっちは かぼちゃ、そっちは {大根|だいこん}。{土|つち}の {中|なか}が {本体|ほんたい}だから {葉|は}を みるの。', vi: 'Đúng đúng. Kia là bí đỏ, đằng kia là củ cải. Phần chính nằm dưới đất nên phải nhìn lá.' },
        { sp: 'Bác chủ trại', jp: 'つぎは {道具|どうぐ}だ。これは {収穫|しゅうかく}バサミ、こっちは {鍬|くわ}。{名前|なまえ}を まちがえると {作業|さぎょう}が {止|と}まるぞ。', vi: 'Tiếp là dụng cụ. Đây là kéo thu hoạch, kia là cuốc. Nhầm tên là công việc khựng lại đấy.' },
        { sp: 'hero', jp: 'わかりました。{収穫|しゅうかく}バサミと {鍬|くわ}ですね。{使|つか}う {前|まえ}に {名前|なまえ}を {声|こえ}に だして {確認|かくにん}します。', vi: 'Cháu rõ rồi ạ. Kéo thu hoạch và cuốc. Trước khi dùng cháu sẽ đọc to tên để xác nhận.' },
        { sp: 'Bà chủ trại', jp: 'いい {子|こ}だねえ。さあ {畑|はたけ}に でよう。{今日|きょう}は メロンの {様子|ようす}を みるよ。', vi: 'Ngoan quá. Thôi ra đồng nào. Hôm nay xem tình hình ruộng dưa.' },
        { sp: 'hero', jp: 'はい、ぼうしを かぶりました。{長靴|ながぐつ}も はきました。いつでも でられます。', vi: 'Dạ, cháu đội mũ rồi, ủng cũng đi rồi. Sẵn sàng ra đồng ạ.' },
        { sp: 'Bác chủ trại', jp: 'よし、その {格好|かっこう}なら {一人前|いちにんまえ}だ。{畑|はたけ}は {待|ま}って くれない、{行|い}くぞ。', vi: 'Tốt, trang phục thế là ra dáng rồi. Ruộng không chờ ai đâu, đi thôi.' },
        { sp: 'hero', jp: 'はい。{今日|きょう}の {作業|さぎょう}が おわったら、{野菜|やさい}の {名前|なまえ}を ノートに まとめます。', vi: 'Dạ. Xong việc hôm nay cháu sẽ tổng hợp tên rau củ vào sổ ạ.' },
        { sp: 'Bà chủ trại', jp: 'まじめだねえ。お{昼|ひる}は うちの {味噌汁|みそしる}だよ、たのしみに してて。', vi: 'Chăm chỉ quá. Trưa nay canh miso nhà bà đấy, háo hức lên nhé.' }
      ],
      outro: 'Bốn giờ sáng, trời Furano sáng dần trên những luống dưa thẳng tắp. {name} còn ngái ngủ, nhưng mùi đất và mùi lá ngô xanh đã đánh thức {call} theo cách cà phê không làm được. Buổi trưa, bát canh miso của bà chủ trại được hứa hẹn như một phần thưởng đầu mùa.'
    },
    'ind-nogyo-2': {
      scene: '🌪️ Bão tới sớm và vụ thu hoạch xuyên trưa',
      branch: [
        { sp: 'narr', text: 'Dự báo thời tiết đổi trong đêm: cơn bão đáng lẽ cuối tuần mới tới, giờ chiều mai đã ập vào Hokkaido. Cả ruộng dưa lưới chín tới mà chưa thu.' },
        { sp: 'Bác chủ trại', jp: '{台風|たいふう}が {早|はや}まった。{明日|あした}の {午後|ごご}には くる。メロン、{今日中|きょうじゅう}に とりきれるか…。', text: '(Bão đến sớm. Chiều mai là vào. Dưa, liệu thu hết trong hôm nay nổi không…) — Bác chủ trại nhìn trời, giọng trầm hẳn.' },
        { sp: 'Bà chủ trại', jp: 'だめだよ {二人|ふたり}じゃ。{隣|となり}の {田中|たなか}さんにも {声|こえ}を かけて みよう。', text: '(Hai người không nổi đâu. Thử gọi cả nhà Tanaka hàng xóm xem.)' },
        { sp: 'narr', text: 'Chưa đầy một giờ sau, anh hàng xóm Tanaka kéo cả nhà sang, rồi thêm hai hộ nữa ở cuối xóm. Người Nhật ở nông thôn gọi nhau bằng một tiếng hô qua hàng rào, không cần hẹn trước.' },
        { sp: 'Anh hàng xóm trại', jp: 'おう、{台風|たいふう}の {前|まえ}の {収穫|しゅうかく}は {村|むら}の {共同作業|きょうどうさぎょう}だ。{遠慮|えんりょ}は なしだぞ。', text: '(Này, thu hoạch trước bão là việc chung cả xóm. Đừng khách sáo gì hết.)' },
        { sp: 'hero', jp: 'ありがとうございます。おれは {軽|かる}い メロンから {運|はこ}びます。{重|おも}いのは {一緒|いっしょ}に もちましょう。', text: '(Cháu cảm ơn mọi người. Cháu vận chuyển dưa nhẹ trước. Quả nặng thì cùng khiêng ạ.)' },
        {
          prompt: 'Nắng trưa gắt dần, lưng áo ướt đẫm. {name} chọn mức gắng sức thế nào?',
          choice: [
            {
              label: 'Gắng hết sức cùng mọi người, chỉ nghỉ khi bà chủ trại bắt nghỉ',
              fx: { jp: 2, hp: -5, love: 2, money: 0, risk: 0, pressure: 1 },
              note: '{name} gồng hết sức xuyên trưa cùng cả xóm — kiệt sức nhưng ruộng dưa kịp cứu.',
              say: [
                { sp: 'narr', text: '{name} cắn răng khiêng từng sọt dưa ra xe, đếm thầm trong đầu để quên cơn mỏi. Cả xóm thành một dây chuyền người giữa ruộng.' },
                { sp: 'Bà chủ trại', jp: 'はい、{休憩|きゅうけい}。おにぎり たべて。これ、{梅干|うめぼ}しと {塩|しお}むすび。{食|た}べないと たおれるよ。', text: '(Này, nghỉ tay. Ăn cơm nắm đi. Đây, cơm nắm mơ muối và muối trắng. Không ăn là gục đấy.) — Bà chủ trại dúi vào tay {name} hai nắm cơm còn ấm.' },
                { sp: 'hero', jp: 'ありがとうございます。いただきます。…この おにぎり、{力|ちから}が でます。', text: '(Cháu cảm ơn bà. Cháu xin nhận.…Cơm nắm này ăn vào thấy có sức hẳn.)' },
                { sp: 'Bà chủ trại', jp: '{田舎|いなか}の ありがとうはね、よく {働|はたら}いて よく {食|た}べること。それで じゅうぶんなの。', text: '(Câu cảm ơn của nông thôn là làm cho tốt, ăn cho khỏe. Thế là đủ rồi.)' }
              ]
            },
            {
              label: 'Giữ sức đều, làm chậm rãi nhưng không nghỉ giữa chừng',
              fx: { jp: 2, hp: -2, love: 1, money: 0, risk: 0, pressure: 0 },
              note: '{name} giữ nhịp đều đến cuối — không nhanh nhất nhưng không gục, việc vẫn trôi.',
              say: [
                { sp: 'Anh hàng xóm trại', jp: 'いい ペースだ。{農作業|のうさぎょう}は {長距離|ちょうきょり}だからな。{最後|さいご}まで たつやつが つよい。', text: '(Nhịp tốt đấy. Việc đồng áng là đường dài mà. Ai đứng được tới cuối mới là khỏe.)' },
                { sp: 'Bà chủ trại', jp: 'はい、おにぎり。あんたは {無理|むり}を しない {子|こ}だね。{長|なが}く たのしめるよ、そういうのは。', text: '(Này, cơm nắm đây. Cháu là đứa không cố quá sức. Kiểu đó làm lâu dài được đấy.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Ba giờ chiều, sọt dưa cuối cùng lên xe. Cả xóm ngồi bệt bên bờ ruộng, áo ai cũng ướt, mà cười nói râm ran. Sáng hôm sau bão quét qua: ruộng nhà bác chủ trại nguyên vẹn, chỉ ướt đẫm.' },
        { sp: 'Bác chủ trại', jp: 'だが、{田中|たなか}さんの {畑|はたけ}は {半分|はんぶん} やられたそうだ。{明日|あした}、{手伝|てつだ}いに いくぞ。', text: '(Nhưng ruộng nhà Tanaka nghe nói bị hại một nửa. Mai mình sang giúp họ.)' },
        {
          prompt: 'Mới qua một ngày kiệt sức, {name} có sang giúp ruộng nhà hàng xóm không?',
          choice: [
            {
              label: 'Đi từ sớm, giúp dọn ruộng và dựng lại giàn đổ cho nhà hàng xóm',
              fx: { jp: 2, hp: -3, love: 3, money: 0, risk: 0, pressure: 0 },
              note: '{name} sang giúp lại nhà hàng xóm — tình làng nghĩa xóm hai nước nối nhau bằng đôi tay lấm bùn.',
              say: [
                { sp: 'Anh hàng xóm trại', jp: 'おまえ、{昨日|きのう} あれだけ {働|はたら}いて、また きたのか。…ありがとう。{借|か}りは かえすぞ、いつか。', text: '(Cháu hôm qua làm cật lực thế mà nay lại sang à.…Cảm ơn nhé. Ơn này anh trả, một ngày nào đó.)' },
                { sp: 'hero', jp: '{昨日|きのう} たすけて もらったのは こちらです。{畑|はたけ}の {恩|おん}は {畑|はたけ}で かえします。', text: '(Hôm qua bên cháu mới là người được giúp. Ơn ruộng thì trả bằng ruộng ạ.)' }
              ]
            },
            {
              label: 'Ở nhà nghỉ một ngày cho lại sức rồi mới tính',
              fx: { jp: 0, hp: 3, love: 0, money: 0, risk: 0, pressure: -1 },
              note: '{name} nghỉ lấy sức — bác chủ trại gật đầu thông cảm, nhưng ánh mắt anh hàng xóm thoáng buồn.',
              say: [
                { sp: 'Bác chủ trại', jp: '{体|からだ}が {資本|しほん}だからな、{休|やす}むのも {仕事|しごと}だ。だが {一言|ひとこと}、{田中|たなか}さんに あいさつだけ いって こい。', text: '(Sức khỏe là vốn, nghỉ cũng là việc. Nhưng sang chào nhà Tanaka một câu rồi hẵng về.)' },
                { sp: 'narr', text: '{name} sang chào, hứa cuối tuần quay lại phụ. Anh hàng xóm gật đầu, nụ cười quay về được một nửa.' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Chiều xuống, cả xóm ngồi lại ở sân nhà bác chủ trại. Bà chủ trại bê ra nồi canh lớn — phần thưởng không ai hẹn trước cho một ngày bão gió.' },
        { sp: 'Bác chủ trại', jp: '{今日|きょう}の メロンは {市場|いちば}で いい {値段|ねだん}が ついたそうだ。{全員|ぜんいん}の おかげだ。', text: '(Nghe nói dưa hôm nay được giá tốt ở chợ. Nhờ tất cả mọi người đấy.)' },
        { sp: 'Bà chủ trại', jp: '{国|くに}は ちがっても、{畑|はたけ}の {人間|にんげん}は おなじだねえ。たすけ{合|あ}って、{食|た}べ{合|あ}って。', text: '(Khác nước mà người làm ruộng thì giống nhau nhỉ. Giúp nhau, ăn cùng nhau.)' },
        { sp: 'narr', text: 'Tối đó {name} ngủ say như chưa từng ngủ — giấc ngủ của người biết mình vừa được một xóm làng xa lạ nhận vào.' }
      ]
    },
    'ind-nogyo-3': {
      scene: '🎁 Cuối vụ và bình minh trên cánh đồng',
      branch: [
        { sp: 'narr', text: 'Ngày cuối vụ. Sọt dưa cuối cùng của mùa đã lên xe từ chiều qua, ruộng giờ trống trải, chỉ còn mùi đất và tiếng côn trùng cuối hạ.' },
        { sp: 'Bác chủ trại', jp: 'おう、{最後|さいご}の {日|ひ}だ。これ、{今季|こんき}の {給料|きゅうりょう}と、ほんの {少|すこ}しの {寸志|すんし}だ。{受|う}けとって くれ。', text: '(Này, ngày cuối vụ đây. Đây là lương mùa này và một chút tiền thưởng vụ mùa. Nhận cho bác vui.)' },
        { sp: 'hero', jp: 'ありがとうございます。{寸志|すんし}まで いただけるなんて…。{大切|たいせつ}に {使|つか}います。', text: '(Cháu cảm ơn bác. Được cả tiền thưởng nữa… Cháu sẽ dùng cẩn thận ạ.)' },
        { sp: 'Bà chủ trại', jp: 'あと これ、{野菜|やさい}の {箱|はこ}。へやに もって かえって、{友達|ともだち}と たべて。うちの {畑|はたけ}の {味|あじ}だよ。', text: '(Còn đây nữa, một thùng rau củ. Mang về phòng trọ, ăn cùng bạn bè nhé. Vị của ruộng nhà bà đấy.)' },
        { sp: 'narr', text: 'Thùng rau nặng trĩu: ngô, bí đỏ, củ cải, và hai quả dưa lưới đẹp nhất mùa — bà chủ trại chọn từ lúc nào {name} cũng không hay.' },
        {
          prompt: '{name} đáp lại tấm lòng của hai bác thế nào?',
          choice: [
            {
              label: 'Cúi đầu cảm ơn và hứa vụ sau sẽ quay lại, dù ở đâu cũng nhớ đường về ruộng',
              fx: { jp: 3, hp: 0, love: 3, money: 1, risk: 0, pressure: 0 },
              note: '{name} nhận thưởng vụ mùa và hứa quay lại vụ sau — hai bác cười như người nhà tiễn nhau.',
              say: [
                { sp: 'hero', jp: '{来年|らいねん}の {季節|きせつ}も、ぜひ よんで ください。{畑|はたけ}の {帰|かえ}り{道|みち}は もう {覚|おぼ}えました。', text: '(Mùa năm sau, nhất định gọi cháu nhé. Đường về ruộng cháu thuộc rồi ạ.)' },
                { sp: 'Bác chủ trại', jp: 'おう、{約束|やくそく}だ。おまえの ぼうし、ここに かけて おくからな。', text: '(Ừ, hứa đấy. Mũ của cháu, bác treo ở đây chờ sẵn.)' }
              ]
            },
            {
              label: 'Ngại ngùng từ chối tiền thưởng vì thấy mình chưa làm được bao nhiêu',
              fx: { jp: 1, hp: 0, love: 1, money: 0, risk: 0, pressure: 1 },
              note: '{name} ngại không dám nhận — bà chủ trại dúi lại tận tay, bảo nhận cũng là một phép lịch sự.',
              say: [
                { sp: 'Bà chủ trại', jp: 'もらうのも {礼儀|れいぎ}だよ。あんたの {汗|あせ}が この {畑|はたけ}に しみて いるんだから。', text: '(Nhận cũng là phép lịch sự đấy. Mồ hôi của cháu thấm vào ruộng này rồi mà.)' },
                { sp: 'hero', jp: '…ありがとうございます。ありがたく、いただきます。', text: '(…Cháu cảm ơn hai bác. Cháu xin nhận với lòng biết ơn ạ.)' }
              ]
            }
          ]
        },
        {
          prompt: 'Trước khi về, {name} muốn để lại gì cho trang trại?',
          choice: [
            {
              label: 'Viết lại cuốn sổ tên rau củ và dụng cụ bằng tiếng Nhật thật đẹp, để lại cho người vụ sau',
              fx: { jp: 3, hp: -1, love: 2, money: 0, risk: 0, pressure: 0 },
              note: '{name} để lại cuốn sổ ghi chép cho người vụ sau — bà chủ trại cất lên kệ như của quý.',
              say: [
                { sp: 'hero', jp: 'この ノート、{次|つぎ}の {季節|きせつ}に くる {人|ひと}のために おいて いきます。おれが {覚|おぼ}えたことです。', text: '(Cuốn sổ này cháu để lại cho người đến mùa sau. Toàn là những gì cháu đã học được.)' },
                { sp: 'Bà chủ trại', jp: 'まあ…。{字|じ}も {丁寧|ていねい}だねえ。これは {畑|はたけ}の {宝物|たからもの}に なるよ。', text: '(Ôi chao… Chữ cũng nắn nót nữa. Cái này thành của quý của ruộng rồi đấy.)' }
              ]
            },
            {
              label: 'Chỉ chào tạm biệt gọn gàng rồi về, giữ kỷ niệm cho riêng mình',
              fx: { jp: 1, hp: 0, love: 0, money: 0, risk: 0, pressure: 0 },
              note: '{name} chào tạm biệt gọn gàng — hai bác vẫn quý, nhưng sân nhà trại chiều ấy hơi vắng.',
              say: [
                { sp: 'Bác chủ trại', jp: 'そうか、{元気|げんき}でな。…{手紙|てがみ}くらい、たまには くれよ。', text: '(Vậy à, khỏe nhé.…Thỉnh thoảng gửi lấy một lá thư cũng được mà.)' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Cuốn sổ — hay lá thư còn chưa viết — dù thế nào, sợi dây giữa {name} và ruộng đất này đã buộc chặt thêm một nút nữa.' },
        { sp: 'Anh hàng xóm trại', jp: 'おう、{帰|かえ}るのか。{駅|えき}まで おれの {軽|けい}トラで おくってくよ。{荷物|にもつ} おもいだろ。', text: '(Này, về à. Để anh chở ra ga bằng xe tải nhẹ. Đồ nặng lắm đúng không.)' },
        { sp: 'narr', text: 'Trước khi đi, {name} xin hai bác cho ra ruộng một mình lúc trời chưa sáng. Không để làm gì cả — chỉ để nhìn.' },
        { sp: 'narr', text: 'Năm giờ kém. Mặt trời lên từ sau dãy núi xa, ánh sáng tràn qua những luống đất trống như nước. Lần đầu tiên, {name} thấy bình minh trên cánh đồng đẹp tới lặng người — đẹp kiểu không chụp ảnh được, chỉ đứng yên mà nhớ.' },
        { sp: 'Bác chủ trại', jp: 'どうだ、{富良野|ふらの}の {朝日|あさひ}は。…その {顔|かお}、もう ここの {人間|にんげん}だな。', text: '(Sao, bình minh Furano thế nào.…Cái mặt đó, giờ là người của nơi này rồi.)' },
        { sp: 'hero', jp: 'はい。{言葉|ことば}に できませんが、{胸|むね}に もって かえります。また きます、{必|かなら}ず。', text: '(Dạ. Không nói thành lời được, nhưng cháu mang theo trong tim về. Cháu sẽ quay lại, nhất định.)' }
      ]
    },
    'talk-nogyo': {
      scene: '🍵 Chuyện phiếm bên hiên nhà trại',
      wrong: {
        0: ['{故郷|ふるさと}は {田|た}んぼしか ないので、つまらないと {思|おも}います。', '{鳥|とり}の {声|こえ}は うるさくて、{朝|あさ}は ゆっくり ねられません。'],
        1: ['{冬|ふゆ}は ゆきが ふらないと さむく ないですね。', '{北海道|ほっかいどう}の ゆきは きれいだから たべても いいですか。']
      },
      lines: [
        { sp: 'Bà chủ trại', jp: 'はい、{麦茶|むぎちゃ}。{畑|はたけ}の あとは これが いちばん。{故郷|ふるさと}の {話|はなし}、{聞|き}かせて。', vi: 'Này, trà lúa mạch đây. Sau việc đồng thì thứ này là nhất. Kể bà nghe chuyện quê cháu đi.' },
        { sp: 'hero', jp: 'ありがとうございます。{故郷|ふるさと}も {田|た}んぼが ひろくて、{朝|あさ}は {鳥|とり}の {声|こえ}で おきます。', vi: 'Cháu cảm ơn bà. Quê cháu cũng ruộng rộng, buổi sáng thức dậy bằng tiếng chim.' },
        { sp: 'Bà chủ trại', jp: 'あら、じゃあ ここも あんまり かわらないね。{冬|ふゆ}は どうして いるの、あっちは。', vi: 'Ôi, vậy thì ở đây cũng không khác mấy nhỉ. Mùa đông bên quê cháu thế nào?' },
        { sp: 'hero', jp: '{冬|ふゆ}でも ゆきは ふりません。{北海道|ほっかいどう}の {冬|ふゆ}を みるのが たのしみです。', vi: 'Mùa đông cũng không có tuyết ạ. Cháu đang mong được thấy mùa đông Hokkaido.' },
        { sp: 'Bác chủ trại', jp: 'はは、{楽|たの}しみは {最初|さいしょ}の {三日|みっか}だけだぞ。{雪|ゆき}かきで {腰|こし}を やられる。', vi: 'Ha ha, mong thì chỉ ba ngày đầu thôi. Xúc tuyết là ê hết cả lưng đấy.' },
        { sp: 'hero', jp: 'それでも {一度|いちど}は みて みたいです。おばさんの {味噌汁|みそしる}も、{冬|ふゆ}の {味|あじ}が しそうです。', vi: 'Dù vậy cháu vẫn muốn thấy một lần ạ. Canh miso của bà chắc cũng có vị mùa đông nữa.' },
        { sp: 'Bà chủ trại', jp: 'うまいこと いうねえ。{冬|ふゆ}に きたら、{鍋|なべ}を たいて あげるよ。', vi: 'Khéo miệng quá nhỉ. Mùa đông mà tới, bà nấu lẩu cho mà ăn.' }
      ],
      outro: 'Ly trà lúa mạch cạn dần trong tiếng ve cuối buổi chiều. {name} kể chuyện quê nhà có ruộng, có tiếng chim buổi sáng, và nhận ra Furano xa xôi này giống quê mình hơn bất cứ nơi nào từng đi qua. {call} đã có thêm một lời hẹn mùa đông: một nồi lẩu đang chờ.'
    }
  });
})();
