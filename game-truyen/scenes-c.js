// scenes-c.js — Hội thoại ĐẦY ĐỦ cho 4 bối cảnh (kaigo / chùa / trường / công viên)
// của game 2D «TUỔI TRẺ Ở NHẬT» (staging — chưa đẩy main).
// Thể ngữ §8: chị Mai nói tiếng Việt ấm áp + dạy kính ngữ chăm sóc; sư thầy nói
// tiếng Việt trang trọng nhẹ; cô giáo nói teineigo chậm rãi; ông cụ công viên nói
// tiếng Nhật thể thường ấm áp của người già. Cảnh 'school-teacher' dùng dạng kaiwa
// (lines/wrong/outro), các cảnh còn lại dùng dạng branch (say + choice có fx).
// Đăng ký bằng Object.assign(window.DEMO_DATA, {...}) — giữ nguyên ID, tiêu đề, thứ tự.
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  'kaigo-mai': {
    scene: '🧓 Nơi làm kaigo — chị Mai dặn dò',
    branch: [
      { sp: 'narr', text: 'Buổi sáng đầu tiên đi làm, {name} thay giày ở sảnh genkan của trung tâm chăm sóc ban ngày 神戸. Trong sảnh thơm mùi trà ấm và gỗ cũ, tiếng các cụ cười nói vọng ra từ phòng sinh hoạt chung. Chị Mai — senpai người Việt làm kaigo ở đây đã ba năm — đang đợi sẵn, tay cầm chiếc tạp dề gấp gọn đưa cho {name}.' },
      { sp: 'Chị Mai', text: '"Chào {call}, tới sớm thế này là chị yên tâm rồi. Ngày đầu ở day-service, việc chưa quen tay thì không sao — các cụ không cần mình nhanh, các cụ cần mình ân cần. Trước khi vào phòng, chị dặn ba điều thôi, nhớ kỹ là làm được."' },
      { sp: 'Chị Mai', text: '"Điều một: gặp ai cũng chào to, rõ, cười tươi rồi cúi đầu nhẹ. Ở kaigo, lời chào là liều thuốc đầu tiên của buổi sáng — cụ nào nghe chào đàng hoàng là cả buổi vui. Điều này không được làm qua loa, nghe chưa?"' },
      { sp: 'Chị Mai', text: '"Điều hai: làm xong việc gì cũng báo lại một câu. Xong thì nói 「終わりました」, được giúp thì nói 「ありがとうございました」. Báo lại một câu ngắn thôi, nhưng người nghe biết việc đã xong, lòng người ta mới yên."' },
      { sp: 'Chị Mai', text: '"Điều ba — quan trọng nhất: không hiểu thì hỏi ngay, đừng gật bừa. Gật bừa trong kaigo là nguy hiểm thật sự đấy, không phải chuyện đùa. Hỏi lại chẳng ai trách đâu, các cụ còn thương người thật thà. Có gì khó, cứ gọi chị Mai."' },
      { sp: 'Chị Mai', jp: 'おはようございます。', text: '"Giờ học thuộc ba câu này trước đã. Câu thứ nhất — câu chào buổi sáng: 『おはようございます』 — Chào buổi sáng ạ. Nói to, rõ, nhìn vào mắt các cụ mà chào."' },
      { sp: 'Chị Mai', jp: 'お{食事|しょくじ}の{時間|じかん}ですよ。', text: '"Câu thứ hai, dùng khi tới giờ ăn: 『お食事の時間ですよ』 — Đến giờ dùng bữa rồi ạ. Nói chậm thôi, kèm nụ cười, các cụ nghe là biết sắp được ăn ngon."' },
      { sp: 'Chị Mai', jp: 'ゆっくりでいいですよ。', text: '"Câu thứ ba, câu chị dùng nhiều nhất trong ngày: 『ゆっくりでいいですよ』 — Cứ thong thả thôi ạ, không sao đâu. Cụ nào tay run, chân chậm mà nghe câu này là yên tâm hẳn."' },
      { sp: 'narr', text: 'Vừa lúc đó, xe đẩy đưa các cụ vào phòng sinh hoạt. Ngồi gần cửa nhất là cụ bà Haru — tóc bạc búi gọn, áo len màu trà, tay ôm chiếc khăn tay gấp tư. Chị Mai ghé tai {name} nói nhỏ: "Cụ Haru đấy. Cụ hiền lắm, ai chào đàng hoàng là cụ quý ngay. Tới lượt {call} chào cụ rồi."' },
      { sp: 'Cụ Haru', jp: 'あら、{新|あたら}しい{方|かた}？{今日|きょう}からここで{働|はたら}くの？', text: 'Ô, người mới phải không cháu? Từ hôm nay cháu làm ở đây à?' },
      {
        prompt: 'Chào cụ Haru thế nào cho phải phép?',
        choice: [
          {
            label: 'Chào bằng kính ngữ vừa học: cúi đầu, nói to rõ 「おはようございます。よろしくお願いします。」',
            fx: { jp: 3, love: 2 }, note: 'Chào cụ Haru bằng kính ngữ ân cần — cụ cười tươi lắm',
            say: [
              { sp: 'narr', text: '{name} bước tới trước mặt cụ, cúi đầu ngay ngắn và chào to, rõ đúng câu vừa học. Mắt cụ Haru sáng lên thấy rõ.' },
              { sp: 'Cụ Haru', jp: 'まあ、ありがとう。{気持|きも}ちのいい{挨拶|あいさつ}ね。{手|て}を{出|だ}してごらん。', text: 'Ôi, cảm ơn cháu. Lời chào nghe dễ chịu quá. Đưa tay cho bà nào.' },
              { sp: 'narr', text: 'Cụ nắm lấy tay {name}, vỗ nhẹ hai cái như cách người bà vỗ tay cháu trong nhà. Chị Mai đứng sau lưng, giơ ngón cái lên cười: "Đấy, thấy chưa — qua cửa ải đầu tiên rồi."' }
            ]
          },
          {
            label: 'Chào suồng sã như với bạn bè: 「おはよう、ハルちゃん！元気？」',
            fx: { jp: 1 }, note: 'Chào cụ hơi suồng sã mất rồi — chị Mai nhắc khéo ngay',
            say: [
              { sp: 'narr', text: 'Cụ Haru ngơ người ra một nhịp, chớp mắt nhìn {name} rồi nhìn sang chị Mai, không hiểu sao người trẻ này lại gọi mình thân mật như bạn cùng lớp.' },
              { sp: 'Chị Mai', text: '"{call} ơi, với các cụ mình không chào kiểu bạn bè được đâu." — Chị Mai bước tới đỡ lời, cười xòa với cụ rồi quay sang dạy lại, giọng nhỏ nhẹ mà rõ từng chữ:' },
              { sp: 'Chị Mai', jp: '{年上|としうえ}の{方|かた}には「おはようございます」がいいよ。', text: '"Với người lớn tuổi thì nói 『おはようございます』 là phải phép nhất đấy. Nói lại theo chị một lần cho nhớ, rồi chào lại cụ đàng hoàng nhé."' },
              { sp: 'narr', text: '{name} chào lại bằng kính ngữ. Cụ Haru gật đầu, cười hiền như chưa có chuyện gì — các cụ dễ tha thứ cho người mới, miễn là biết sửa.' }
            ]
          },
          {
            label: 'Chỉ cúi đầu thật sâu, im lặng không nói gì',
            fx: { jp: 0 }, note: 'Cúi đầu im lặng — chị Mai đỡ lời giúp ngay',
            say: [
              { sp: 'narr', text: '{name} cúi đầu thật sâu… rồi đứng im. Câu chào học thuộc làu làu ban nãy, tới lúc cần nói lại bay đi đâu mất. Tai {name} nóng bừng.' },
              { sp: 'Chị Mai', text: '"Cụ Haru ơi, đây là bạn mới hôm nay bắt đầu làm ở 神戸 mình ạ. Bạn ấy còn bỡ ngỡ nên hơi rụt rè, cụ thông cảm nhé." — Chị Mai đỡ lời gọn gàng, rồi quay sang {name} nháy mắt: "Lần sau cứ mạnh dạn nói ra, nói sai chị sửa cho. Im lặng mới là khó sửa nhất đấy."' },
              { sp: 'narr', text: 'Cụ Haru gật gù, vỗ vỗ vào chiếc ghế trống bên cạnh như bảo: cứ ngồi xuống đây, rồi quen dần.' }
            ]
          }
        ]
      },
      { sp: 'Chị Mai', text: '"Rồi, giờ theo chị vào phòng sinh hoạt. Sáng nay mình phụ giờ thể dục nhẹ với giờ trà. Cứ đi chậm, đi cạnh các cụ, đừng đi trước mặt cụ nào bao giờ — mình đi sau một bước là vừa."' },
      { sp: 'Cụ Haru', jp: 'また{明日|あした}も{来|き}てね。', text: 'Ngày mai lại tới nữa nhé cháu.' },
      { sp: 'narr', text: 'Lúc {name} quay đi, cụ Haru bỗng gọi với theo — cụ gọi đúng tên của {name}, rõ từng tiếng, như thể đã thuộc từ lâu lắm rồi: "{name} ơi…" Rồi cụ cười, vẫy chiếc khăn tay. Ngày làm việc đầu tiên ở Nhật, có người gọi tên mình bằng giọng ấm như thế — tự nhiên thấy nơi này bớt lạ hẳn.' }
    ]
  },
  'kaigo-board': {
    scene: '🗓️ Lịch hoạt động tuần — 神戸',
    branch: [
      { sp: 'narr', text: 'Trên tường cạnh cửa phòng sinh hoạt treo tấm bảng trắng lớn: lịch hoạt động cả tuần của 神戸, viết tay nắn nót bằng ba màu bút. Chị Mai gõ nhẹ vào bảng: "Đi làm ở đây là phải thuộc cái bảng này trước thuộc đường về nhà đấy, {call}."' },
      { sp: 'Chị Mai', jp: '{月曜日|げつようび}は{体操|たいそう}、{火曜日|かようび}は{入浴|にゅうよく}、{金曜日|きんようび}はレクです。', text: '"Đọc theo chị này: thứ Hai là 体操 — tập thể dục, thứ Ba là 入浴 — hỗ trợ tắm, thứ Sáu là レク — sinh hoạt giải trí. Ba chữ này ngày nào cũng gặp, thuộc luôn hôm nay đi."' },
      { sp: 'narr', text: 'Ở góc dưới bên phải của bảng, có một dòng chữ nhỏ viết bằng bút đỏ, nét chữ của ca trước để lại — dòng 申し送り, bàn giao ca, mà ai vào ca cũng phải đọc trước tiên.' },
      { sp: 'Chị Mai', jp: '{申|もう}し{送|おく}り：ハルさん、{今日|きょう}は{少|すこ}しお{疲|つか}れのようでした。', text: '"Dòng bàn giao ca ghi thế này: 『申し送り：ハルさん、今日は少しお疲れのようでした』 — Bàn giao: cụ Haru hôm nay có vẻ hơi mệt. Thấy chưa, một dòng ngắn vậy thôi mà ca của mình biết phải để ý cụ hơn hẳn."' },
      { sp: 'Chị Mai', text: '"Nhớ nhé {call}: vào ca là đọc bảng lịch trước, đọc dòng bàn giao ca sau, rồi mới bắt đầu việc. Thiếu một dòng chữ nhỏ trên bảng này là có khi lỡ cả một buổi chăm sóc tử tế."' },
      {
        prompt: 'Xem bảng lịch xong, {name} làm gì tiếp?',
        choice: [
          {
            label: 'Hỏi chị Mai: ca hỗ trợ tắm 入浴介助 thì làm thế nào ạ?',
            fx: { jp: 1 }, note: 'Hỏi trước khi làm — chị Mai khen nếp này',
            say: [
              { sp: 'Chị Mai', text: '"Hỏi trước thế là tốt. Ca hỗ trợ tắm 入浴介助 thì nhớ ba ý: một, chuẩn bị nước và ghế tắm sẵn trước khi đón cụ; hai, luôn hỏi ý cụ trước từng bước, cụ gật mới làm; ba — quan trọng nhất — tôn trọng riêng tư của các cụ: khăn che kín đáo, đóng cửa, không bao giờ để cụ phải ngượng."' },
              { sp: 'Chị Mai', text: '"Các cụ cả đời giữ thể diện, tới tuổi này được người ta chăm mà vẫn giữ được sự riêng tư cho mình là các cụ biết ơn lắm. Mình làm nghề này, giữ thể diện cho các cụ cũng là việc chính đấy, {call}."' }
            ]
          },
          {
            label: 'Chụp lại bảng lịch, tối về nhà học từ vựng trong lịch',
            fx: { jp: 1 }, note: 'Đã chụp lịch tuần — tối về có bài để học rồi',
            say: [
              { sp: 'narr', text: '{name} giơ điện thoại chụp lại cả tấm bảng, zoom riêng vào ba chữ 体操・入浴・レク và dòng bàn giao ca ở góc. Tối nay, sổ từ vựng sẽ có thêm một trang toàn chữ của nghề kaigo.' },
              { sp: 'Chị Mai', jp: '{体操|たいそう}、{入浴|にゅうよく}、{介助|かいじょ}。', text: '"Chụp rồi thì tối học ba chữ này trước: 『体操、入浴、介助』 — thể dục, tắm, hỗ trợ chăm sóc. Học từ trong chính việc mình làm là nhớ lâu nhất đấy."' }
            ]
          },
          {
            label: 'Xem qua loa cho biết rồi đi vào phòng sinh hoạt',
            say: [
              { sp: 'narr', text: '{name} lướt mắt qua bảng lịch một lượt rồi quay đi. Chị Mai nhìn theo, chỉ nhắc một câu nhẹ hều: "Bảng này ngày nào cũng thay đổi một chút đấy — mai nhớ đọc lại." Có những bài học ở nơi làm việc, người ta chỉ nhắc đúng một lần như thế.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Chuông báo giờ thể dục buổi sáng vang lên khe khẽ. Các cụ lần lượt được đưa ra phòng sinh hoạt, ai nấy đều nhìn lên bảng lịch như một thói quen — hôm nay có gì vui, bảng đã nói trước rồi.' }
    ]
  },
  'temple-monk': {
    scene: '🛕 Chùa Phúc An — chào sư thầy',
    branch: [
      { sp: 'narr', text: 'Buổi lễ sáng chủ nhật ở chùa Phúc An vừa tan. Sân chùa còn thơm mùi trầm, tiếng người nói chuyện rì rầm bằng cả tiếng Việt lẫn tiếng Nhật. {name} đứng nép bên hiên, lần đầu tới một ngôi chùa Việt trên đất Nhật — nghe tiếng chuông và tiếng mẹ đẻ cùng lúc, lòng bỗng chậm lại.' },
      { sp: 'Sư thầy', text: '"Mô Phật. Con mới sang Nhật phải không? Nhìn cách con đứng ngó quanh là thầy đoán được. Những ngày đầu xa nhà là những ngày khó nhất — thầy gặp nhiều người trẻ như con lắm, ai tới chùa lần đầu cũng mang theo một nỗi lo chưa biết kể với ai."' },
      { sp: 'Cô người Việt trong chùa', jp: 'こんにちは。', text: 'Một cô người Việt đang quét sân gần đó ngẩng lên, cười tươi chào {name} bằng tiếng Nhật: "こんにちは。" — Chào cháu nhé. Ở chùa này, người Việt mình gặp nhau là chào nhau như người nhà.' },
      { sp: 'Sư thầy', text: '"Cứ coi chùa như một mái nhà chung, {call} ạ. Ở đất khách, có một nơi để trở về thắp nén hương, ăn bữa cơm chay, nghe tiếng nói quê nhà — là giữ được gốc. Gốc còn thì cây mới đứng vững qua mùa đông được."' },
      {
        prompt: 'Ngồi xuống bên bậc thềm, {name} thưa với thầy điều gì?',
        choice: [
          {
            label: 'Hỏi thầy: "Thưa thầy, Tết ở chùa mình có gói bánh chưng không ạ?"',
            fx: { love: 2 }, note: 'Tết ở chùa có gói bánh chưng — nghe mà ấm lòng',
            say: [
              { sp: 'Sư thầy', text: '"Có chứ con. Tết nào chùa cũng gói bánh chưng. Từ hai mươi bảy, hai mươi tám Tết, bà con quanh vùng tụ về đông lắm — người rửa lá, người đãi đỗ, người gói bánh, canh nồi bánh suốt đêm như ở quê vậy. Ai xa nhà không về được, tới chùa là có phần bánh mang về."' },
              { sp: 'Sư thầy', text: '"Năm nay con tới sớm phụ gói bánh nhé. Tay người trẻ gói bánh còn vụng cũng không sao — cái chính là ngồi lại với nhau. Ở nơi đất khách này, một cái Tết có nhau là quý hơn mọi thứ."' }
            ]
          },
          {
            label: 'Hỏi thầy: "Thưa thầy, nếu gặp khó khăn ở Nhật thì chùa có giúp được không ạ?"',
            fx: { love: 1 }, note: 'Biết thêm một nơi để tìm tới khi thật sự khó khăn',
            say: [
              { sp: 'Sư thầy', text: '"Giúp được trong khả năng của chùa, con ạ. Chùa và các nhóm hỗ trợ người Việt ở quanh đây luôn mở cửa cho người gặp nạn — mất việc, ốm đau, bị lừa gạt hay bế tắc giấy tờ, cứ tìm tới, đừng im lặng chịu một mình. Có cả đường dây tư vấn bằng tiếng Việt của các tổ chức hỗ trợ, thầy sẽ ghi cho con mang về."' },
              { sp: 'Sư thầy', text: '"Nhớ lời thầy: gặp chuyện, việc đầu tiên là tìm đường cầu cứu đàng hoàng — chùa, nhóm hỗ trợ, cơ quan chức năng. Đừng nghe lời rủ rê làm liều của ai hết. Đường sáng thì chậm mà chắc, con ạ."' }
            ]
          },
          {
            label: 'Lặng nghe thầy dặn dò, rồi chắp tay cảm ơn và ra về',
            fx: { love: 1, pressure: -1 }, note: 'Một buổi sáng yên ở chùa — lòng nhẹ đi nhiều',
            say: [
              { sp: 'Sư thầy', text: '"Người trẻ đi xa, thầy chỉ dặn ba chữ: chậm, chắc, thiện. Làm gì cũng chậm lại một nhịp mà nghĩ, đi đường chắc mà đi, và giữ cái tâm thiện với người xung quanh. Được ba chữ đó thì ở đâu cũng sống được."' },
              { sp: 'narr', text: '{name} chắp tay cúi đầu cảm ơn thầy, bước ra cổng chùa khi nắng đã lên cao. Không hiểu sao, những lo lắng mang theo lúc tới dường như đã để lại sau lưng cùng tiếng chuông.' }
            ]
          }
        ]
      },
      { sp: 'Sư thầy', text: '"Thôi, con về nghỉ đi. Chủ nhật nào rảnh lại ghé chùa, không lễ lạt gì cũng được — về uống chén trà, nói vài câu tiếng Việt cho đỡ nhớ nhà. Cửa chùa lúc nào cũng mở cho người xa xứ."' },
      { sp: 'narr', text: '{name} quay lại nhìn ngôi chùa một lần nữa trước khi ra về: mái ngói cong, bảng hiệu tiếng Việt, lá cờ nhỏ bay trên cổng. Giữa một thành phố Nhật xa lạ, vẫn có một góc quê nhà đứng chờ mình ở đây.' }
    ]
  },
  'temple-bell': {
    scene: '🔔 Thỉnh chuông — thắp hương cầu bình an',
    branch: [
      { sp: 'narr', text: 'Trước khi về, {name} ghé lại chính điện. Lư hương đồng khói bay nghi ngút, ánh nến lay nhẹ. Sư thầy gật đầu ra hiệu cứ tự nhiên — ở đây, ai muốn thắp một nén hương cho lòng mình yên thì cứ thắp.' },
      { sp: 'narr', text: '{name} rút một nén hương, châm vào ngọn nến trên bàn thờ. Tay hơi run — không phải vì lạnh, mà vì tự nhiên nhớ nhà quá. Mùi trầm ở chùa Việt trên đất Nhật giống hệt mùi trầm trong gian nhà ở quê mỗi dịp giỗ chạp.' },
      { sp: 'narr', text: 'Cắm nén hương lên lư, {name} chắp tay, nhắm mắt lại. Trong đầu hiện ra đủ thứ muốn cầu — nhiều đến mức không biết bắt đầu từ đâu. Tiếng chuông chùa từ gian bên khẽ ngân lên một tiếng, dài và trong.' },
      {
        prompt: 'Trong làn khói hương, {name} khấn thầm điều gì trước nhất?',
        choice: [
          {
            label: 'Cầu cho người nhà ở quê luôn khỏe mạnh, bình an',
            fx: { love: 2, pressure: -2 }, note: 'Lời cầu cho người nhà — nói ra được là nhẹ cả người',
            say: [
              { sp: 'narr', text: '{name} khấn thầm, câu đầu tiên không phải cho mình: cầu cho bố mẹ ở nhà khỏe mạnh, ngủ ngon, đừng lo cho con nhiều quá. Cầu cho cả nhà, ai cũng bình an chờ ngày con trở về.' },
              { sp: 'narr', text: 'Khói hương bay thẳng lên, tiếng chuông ngân dài không dứt. Lạ thật — chỉ là nói thật lòng một lời cầu cho người khác, mà bước ra khỏi chính điện, vai {name} nhẹ đi như vừa đặt xuống một chiếc ba lô vô hình đã đeo suốt từ ngày lên máy bay.' }
            ]
          },
          {
            label: 'Cầu cho kỳ thi sắp tới thi đâu đỗ đó',
            fx: { jp: 1 }, note: 'Cầu thi đỗ — còn lại là phần của sự cố gắng',
            say: [
              { sp: 'narr', text: '{name} khấn cầu cho kỳ thi sắp tới được suôn sẻ: vào phòng thi đầu óc sáng suốt, chữ nào đã học thì nhớ hết. Khấn xong, tự mình cũng bật cười trong lòng — Phật chắc cũng muốn nghe thêm câu "con hứa sẽ học thật chăm" nữa.' },
              { sp: 'narr', text: 'Tiếng chuông ngân lên đúng lúc đó, như một lời nhắc nhẹ: cầu nguyện xong thì về mà mở sách ra. Phần của trời là phù hộ, phần của mình là từng trang sách mỗi tối.' }
            ]
          },
          {
            label: 'Cầu cho sớm trả hết nợ, nhẹ gánh cho cả nhà',
            fx: { pressure: 1 }, note: 'Lời cầu rất thật — chuông vẫn ngân đều, không phán xét gì',
            say: [
              { sp: 'narr', text: '{name} khấn một điều rất thật, thật đến mức hơi ngượng khi nghĩ lại: cầu cho công việc thuận lợi, dành dụm được đều tay, sớm trả hết khoản nợ mà cả nhà đã vay cho chuyến đi này.' },
              { sp: 'narr', text: 'Chuông vẫn ngân đều đều, trầm và thong thả, chẳng nhanh lên cũng chẳng chậm đi. Hóa ra có những lời cầu nói ra không phải để được đáp ứng ngay — chỉ để biết mình đang thật sự mong điều gì nhất, rồi bình tĩnh mà đi tiếp từng bước một.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: '{name} mở mắt, cúi lạy ba lạy rồi lùi ra khỏi chính điện, đi giật lùi mấy bước như cách ở nhà vẫn làm trước bàn thờ. Nén hương của {name} vẫn cháy đỏ giữa lư, khói bay lên thẳng tắp trong buổi sáng không gió.' },
      { sp: 'narr', text: 'Ra tới cổng chùa, {name} ngoái lại một lần cuối. Một tiếng chuông nữa ngân lên — "boong…" — tiễn người ra về. Đường về nhà trọ hôm nay hình như ngắn hơn mọi ngày.' }
    ]
  },
  'school-teacher': {
    scene: '🏫 Trường tiếng — cô giáo chủ nhiệm',
    lines: [
      { sp: 'Cô giáo', jp: 'おはようございます、みなさん。{今日|きょう}はまず、{宿題|しゅくだい}の{確認|かくにん}をします。{宿題|しゅくだい}を{出|だ}してください。', vi: 'Chào cả lớp. Hôm nay trước tiên, cô kiểm tra bài tập về nhà. Các em lấy bài tập ra nào.' },
      { sp: 'hero', jp: 'はい、{先生|せんせい}。{宿題|しゅくだい}は{昨日|きのう}、{家|いえ}で{全部|ぜんぶ}{終|お}わりました。', vi: 'Vâng, thưa cô. Bài tập em đã làm xong hết ở nhà hôm qua rồi ạ.' },
      { sp: 'Cô giáo', jp: 'それから、{大切|たいせつ}なお{知|し}らせがあります。{試験|しけん}の{申|もう}し{込|こ}みは{今月|こんげつ}の{二十日|はつか}までで、{試験|しけん}は{来月|らいげつ}の{十五日|じゅうごにち}です。{忘|わす}れないでください。', vi: 'Tiếp theo, cô có một thông báo quan trọng. Hạn đăng ký dự thi là ngày 20 tháng này, và kỳ thi là ngày 15 tháng sau. Các em đừng quên nhé.' },
      { sp: 'hero', jp: 'すみません、もう{一度|いちど}お{願|ねが}いします。', vi: 'Xin lỗi cô, cô nhắc lại một lần nữa giúp em với ạ.' },
      { sp: 'Cô giáo', jp: 'あれ、{顔|かお}を{見|み}ると、まだよく{分|わ}かっていないようですね。{大丈夫|だいじょうぶ}です。ゆっくり{言|い}いますから、よく{聞|き}いてください。', vi: 'Ơ, nhìn nét mặt em thì hình như em vẫn chưa hiểu rõ lắm. Không sao đâu. Cô sẽ nói chậm lại, em nghe kỹ nhé.' },
      { sp: 'Cô giáo', jp: '{試験|しけん}は{来月|らいげつ}の{十五日|じゅうごにち}です。{申|もう}し{込|こ}みは{今月|こんげつ}の{二十日|はつか}までです。ノートに{書|か}きましたか。', vi: 'Kỳ thi là ngày 15 tháng sau. Hạn đăng ký là ngày 20 tháng này. Em đã ghi vào sổ chưa?' },
      { sp: 'hero', jp: 'はい、{書|か}きました。{試験|しけん}は{来月|らいげつ}の{十五日|じゅうごにち}、{申|もう}し{込|こ}みは{今月|こんげつ}の{二十日|はつか}までですね。', vi: 'Vâng, em ghi rồi ạ. Kỳ thi ngày 15 tháng sau, hạn đăng ký ngày 20 tháng này, đúng không ạ?' },
      { sp: 'Cô giáo', jp: 'そうです、その{通|とお}りです。{試験|しけん}の{日|ひ}は、{受験票|じゅけんひょう}と{鉛筆|えんぴつ}を{忘|わす}れないでください。', vi: 'Đúng rồi, chính xác như vậy. Ngày thi, các em đừng quên phiếu dự thi và bút chì nhé.' },
      { sp: 'hero', jp: 'はい、{分|わ}かりました。ありがとうございます、{先生|せんせい}。', vi: 'Vâng, em hiểu rồi ạ. Em cảm ơn cô.' },
      { sp: 'Cô giáo', jp: 'それから、{夜|よる}は{試験|しけん}の{練習|れんしゅう}クラスもあります。{分|わ}からないことは、{遠慮|えんりょ}しないで{何|なん}でも{聞|き}いてくださいね。', vi: 'Thêm nữa, buổi tối còn có lớp luyện thi. Có điều gì không hiểu, các em đừng ngại, cứ hỏi cô bất cứ điều gì nhé.' },
      { sp: 'hero', jp: 'はい、{夜|よる}のクラスにも{行|い}きます。よろしくお{願|ねが}いします。', vi: 'Vâng, em sẽ đi cả lớp buổi tối nữa ạ. Mong cô giúp đỡ em.' }
    ],
    wrong: {
      0: ['{先生|せんせい}、{宿題|しゅくだい}は{食|た}べました。とてもおいしかったです。', '{私|わたし}の{宿題|しゅくだい}は、{犬|いぬ}と{一緒|いっしょ}に{学校|がっこう}へ{来|き}ませんでした。'],
      1: ['はい、{分|わ}かりました。{大丈夫|だいじょうぶ}です。', 'もう{一度|いちど}！{早|はや}く{言|い}ってください！'],
      2: ['{試験|しけん}は{来月|らいげつ}の{十日|とおか}ですね。{楽|たの}しみです。', '{申|もう}し{込|こ}みは{来月|らいげつ}の{十五日|じゅうごにち}で、{試験|しけん}は{今日|きょう}ですね。']
    },
    outro: 'Tan học, cô giáo gọi {name} lại dặn thêm một câu: trường có lớp luyện thi buổi tối dành riêng cho kỳ thi tháng sau, học phí đã gồm trong học phí rồi, cứ tới mà học. "Không hiểu thì hỏi ngay, đừng gật bừa rồi về nhà lo một mình" — cô nói câu đó mà như nói đúng tim đen của {name}. Trên đường về, {name} mở sổ ra xem lại hai con số đã khoanh tròn đỏ chót: hạn đăng ký ngày 20 tháng này, ngày thi 15 tháng sau. Lần này thì không nhầm đi đâu được nữa, {call} ạ.'
  },
  'school-board': {
    scene: '📚 Bảng đen / bảng thông báo của trường',
    branch: [
      { sp: 'narr', text: 'Giờ ra chơi, {name} dừng lại trước bảng thông báo ở sảnh trường. Bảng dán kín giấy: lịch thi, lịch nghỉ, tờ rơi lớp luyện thi — tờ nào cũng toàn kanji, đọc chậm từng dòng mới thấm. Ở trường tiếng, bỏ lỡ một tờ giấy trên bảng này có khi là bỏ lỡ cả một kỳ thi.' },
      { sp: 'narr', jp: '{試験|しけん}は{来月|らいげつ}の{十五日|じゅうごにち}です。{申|もう}し{込|こ}みは{今月|こんげつ}の{二十日|はつか}までです。', text: 'Tờ thông báo lớn nhất ở giữa bảng ghi: Kỳ thi là ngày 15 tháng sau. Hạn đăng ký là ngày 20 tháng này. Đúng hai con số cô giáo vừa nhắc trong lớp — {name} đối chiếu lại một lần cho chắc.' },
      { sp: 'narr', text: 'Ngay bên cạnh tờ lịch thi là một tấm bảng màu vàng mà trước giờ {name} chưa từng để ý: bảng hướng dẫn an toàn của khu, ghi rõ trường học này chính là điểm lánh nạn được chỉ định của cả khu phố.' },
      { sp: 'narr', jp: '{地震|じしん}や{台風|たいふう}のとき、この{学校|がっこう}は{避難所|ひなんじょ}になります。', text: 'Dòng chữ trên bảng ghi: Khi có động đất hay bão lớn, ngôi trường này sẽ trở thành điểm lánh nạn. Sân trường rộng, nhà thể chất kiên cố — cả khu phố sẽ tập trung về đây khi thiên tai xảy ra.' },
      { sp: 'narr', text: '{name} đọc đi đọc lại chi tiết này hai lần. Ở Nhật, biết trước nơi lánh nạn gần nhà nhất không phải chuyện xa vời — đó là kiến thức sinh tồn, ngang với việc thuộc đường ra ga vậy.' },
      {
        prompt: 'Trước khi chuông vào lớp reo, {name} tranh thủ làm gì?',
        choice: [
          {
            label: 'Chụp lịch thi và hạn đăng ký vào điện thoại, đặt luôn lời nhắc',
            fx: { jp: 1 }, note: 'Đã lưu lịch thi — kỳ này không lo trễ hạn đăng ký',
            say: [
              { sp: 'narr', text: '{name} chụp lại tờ lịch thi, mở ứng dụng nhắc việc và ghim hai mốc: ngày 20 tháng này — hạn đăng ký; ngày 15 tháng sau — ngày thi. Chụp xong còn gửi luôn một bản về cho mình trong tin nhắn, phòng khi điện thoại có bề gì.' }
            ]
          },
          {
            label: 'Đọc kỹ bảng hướng dẫn lánh nạn: đường đi, vật cần mang, nơi tập trung',
            note: 'Đã thuộc vị trí điểm lánh nạn của khu — kiến thức này có ngày cứu mình',
            say: [
              { sp: 'narr', jp: '{避難|ひなん}のときは、エレベーターは{使|つか}わないでください。', text: '{name} đọc kỹ từng mục trên bảng: khi lánh nạn thì không dùng thang máy — 『避難のときは、エレベーターは使わないでください』; mang theo nước, đèn pin và giấy tờ tùy thân; tập trung ở sân trường và chờ hướng dẫn của người phụ trách khu.' },
              { sp: 'narr', text: 'Đọc xong, {name} còn đi ra sân trường nhìn quanh một vòng cho thuộc: cổng nào gần nhà trọ nhất, nhà thể chất ở phía nào. Biết trước những điều này khi mọi thứ còn yên bình — đó là cách người Nhật sống chung với thiên tai.' }
            ]
          },
          {
            label: 'Bỏ qua cả hai, chuông sắp reo rồi — vào lớp trước đã',
            say: [
              { sp: 'narr', text: '{name} liếc nhanh qua bảng rồi rảo bước về lớp. Những tờ giấy trên bảng vẫn nằm yên ở đó, chờ một người chịu dừng lại đọc chúng — chỉ tiếc là kỳ thi và thiên tai thì không chờ ai bao giờ.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Chuông vào lớp reo. {name} về chỗ ngồi, mở sổ tay ra — trang đầu tiên của cuốn sổ từ hôm nay có thêm hai dòng mới viết nắn nót: lịch thi, và địa chỉ điểm lánh nạn của khu.' }
    ]
  },
  'park-elder': {
    scene: '🌳 Công viên — ông cụ tập thể dục',
    branch: [
      { sp: 'narr', text: 'Sáng sớm, công viên gần nhà trọ còn đẫm sương. Một nhóm các cụ trong khu đã xếp thành vòng tròn quanh bãi cỏ, tiếng nhạc từ chiếc radio nhỏ vang lên đều đều — buổi tập ラジオ体操, thể dục theo đài, bắt đầu nào cũng đúng giờ như một cái đồng hồ.' },
      { sp: 'Ông cụ', jp: 'おはよう。{若|わか}いのに{早起|はやお}きだね。', text: 'Chào buổi sáng. Trẻ thế này mà cũng dậy sớm nhỉ.' },
      { sp: 'narr', text: 'Ông cụ đứng gần {name} nhất — áo gió xám, khăn quàng cổ, tay vung đều theo nhịp nhạc — quay sang bắt chuyện. Giọng ông nói tiếng Nhật thể thường, chậm rãi và ấm, kiểu người già hay nói với con cháu trong nhà.' },
      { sp: 'Ông cụ', jp: 'おれたちは{毎朝|まいあさ}、ここでラジオ{体操|たいそう}をしているんだ。よかったら、{一緒|いっしょ}にやらないか。', text: 'Bọn bác sáng nào cũng tập thể dục theo đài ở đây. Nếu cháu không bận thì vào tập cùng nhé?' },
      { sp: 'Ông cụ', jp: '{体|からだ}を{動|うご}かすと、{一日|いちにち}が{元気|げんき}になるよ。', text: 'Vận động thân thể một chút là cả ngày khỏe khoắn hẳn ra đấy.' },
      {
        prompt: 'Ông cụ đã rủ, {name} đáp sao đây?',
        choice: [
          {
            label: 'Vào vòng tập cùng các cụ luôn — "Cho cháu tập với ạ!"',
            fx: { hp: 3, love: 1 }, note: 'Tập thể dục buổi sáng cùng xóm — khỏe người, quen thêm hàng xóm',
            say: [
              { sp: 'narr', text: '{name} đứng vào cuối vòng, bắt chước từng động tác: vươn tay, xoay vai, cúi người. Động tác thì đơn giản mà làm đúng nhịp với gần hai mươi người già xung quanh lại vui lạ thường. Mấy cụ hai bên gật đầu cười khích lệ.' },
              { sp: 'Ông cụ', jp: 'そうそう、{上手|じょうず}だよ。{近所|きんじょ}の{人|ひと}への{挨拶|あいさつ}は「おはようございます」が{一番|いちばん}だよ。', text: 'Đúng rồi, giỏi lắm. Mà này, chào hỏi hàng xóm thì câu 「おはようございます」 là chuẩn nhất đấy nhé.' },
              { sp: 'Ông cụ', jp: '{今度|こんど}の{日曜日|にちようび}、{町内会|ちょうないかい}で{公園|こうえん}の{掃除|そうじ}をするんだ。{時間|じかん}があったら、{来|き}てみないか。', text: 'Chủ nhật này, tổ dân phố sẽ cùng nhau dọn vệ sinh công viên đấy. Nếu cháu có thời gian thì ra phụ một tay nhé?' },
              { sp: 'narr', text: 'Tập xong, người nóng lên, mồ hôi rịn nhẹ trên trán. {name} gật đầu nhận lời vụ dọn công viên chủ nhật — tự nhiên thấy mình không còn là "người lạ đi ngang qua công viên" nữa, mà bắt đầu là một người của khu phố này.' }
            ]
          },
          {
            label: 'Đứng bên ngoài xem các cụ tập một lúc cho biết',
            fx: { hp: 1 }, note: 'Đứng xem một lúc — cũng hít được cả buổi sáng trong lành',
            say: [
              { sp: 'narr', text: '{name} đứng tựa vào hàng rào, xem hết cả bài tập: gần hai mươi mái đầu bạc vung tay đều tăm tắp theo tiếng nhạc radio. Nhìn thôi mà nhịp thở cũng chậm lại, đầu óc tỉnh táo hẳn sau một đêm ngủ chập chờn.' },
              { sp: 'Ông cụ', jp: 'いいよ、{見|み}ているだけでも{気分|きぶん}がいいだろう。', text: 'Ừ, cứ đứng xem thôi cũng thấy dễ chịu rồi, phải không cháu.' }
            ]
          },
          {
            label: 'Cúi đầu cảm ơn rồi từ chối — sáng nay đang vội đi có việc',
            fx: { love: -1 }, note: 'Từ chối lời rủ của ông cụ — hẹn một buổi sáng khác vậy',
            say: [
              { sp: 'Ông cụ', jp: 'そうか、{忙|いそが}しいのはいいことだ。{気|き}をつけて{行|い}きなさい。', text: 'Thế à, bận rộn là điều tốt mà. Cháu đi cẩn thận nhé.' },
              { sp: 'narr', text: '{name} cúi đầu cảm ơn rồi rảo bước đi, sau lưng tiếng nhạc thể dục vẫn đều đều. Lời rủ của ông cụ bị từ chối mất rồi — sáng mai, nếu còn muốn quen xóm, chắc phải chủ động quay lại chào trước.' }
            ]
          }
        ]
      },
      { sp: 'Ông cụ', jp: 'じゃあ、また{明日|あした}の{朝|あさ}に。', text: 'Thôi, hẹn cháu sáng mai ở đây nhé.' },
      { sp: 'narr', text: 'Ông cụ vẫy tay rồi quay lại nhập vào vòng tập đang đi bộ thả lỏng quanh đài phun nước, bước chân nhanh nhẹn hơn khối người trẻ. Ở Nhật, quen được một ông cụ trong công viên buổi sáng, là quen được cả một khu phố.' }
    ]
  },
  'park-fountain': {
    scene: '⛲ Đài phun nước công viên',
    branch: [
      { sp: 'narr', text: 'Đi bộ một vòng quanh công viên, {name} ghé ngồi xuống băng ghế đá cạnh đài phun nước. Tia nước phun lên đều đều, mát rượi. Mấy đứa trẻ chạy vòng quanh bồn nước cười vang, người lớn ngồi ghế bên phe phẩy quạt giấy ngắm theo.' },
      { sp: 'narr', text: 'Ngay đầu lối vào bồn phun dựng một tấm bảng gỗ đã cũ: 「公園のきまり」 — nội quy công viên. Ba dòng ngắn gọn: không xả rác bừa bãi, không vào trong bồn nước, và buổi tối thì giữ yên lặng cho khu dân cư quanh công viên nghỉ ngơi.' },
      { sp: 'narr', jp: '{夜|よる}は{静|しず}かにして、ごみは{持|も}ち{帰|かえ}りましょう。', text: 'Dòng cuối của bảng ghi: 『夜は静かにして、ごみは持ち帰りましょう』 — Buổi tối hãy giữ yên lặng, rác thì mang về nhà nhé. Nội quy viết nhẹ nhàng như một lời nhờ vả, vậy mà ai cũng tự giác làm theo.' },
      { sp: 'narr', text: '{name} ngồi ngắm mặt nước lấp loáng nắng sớm. Công viên Nhật yên bình theo một cách rất có trật tự — và cái trật tự đó bắt đầu từ những tấm bảng nhỏ như thế này, cùng những người chịu đọc chúng.' },
      {
        prompt: 'Ngồi bên đài phun nước, {name} làm gì bây giờ?',
        choice: [
          {
            label: 'Ngồi nghỉ hẳn 15 phút cho lại sức rồi mới đi tiếp',
            fx: { hp: 2, pressure: -1 }, note: 'Nghỉ ngơi tử tế 15 phút — người khỏe lại, đầu óc cũng yên',
            say: [
              { sp: 'narr', text: '{name} ngả lưng vào ghế đá, nhắm mắt nghe tiếng nước phun đều đều. Mười lăm phút không điện thoại, không vội vã — chỉ có nắng sớm, tiếng trẻ con cười và hơi nước mát phả vào mặt. Mở mắt ra, đôi chân đã hết mỏi, đầu óc nhẹ tênh.' },
              { sp: 'narr', text: 'Hóa ra nghỉ ngơi cũng là một việc phải học khi sống một mình nơi đất khách: không ai nhắc mình nghỉ, thì mình phải tự biết dừng lại đúng lúc.' }
            ]
          },
          {
            label: 'Gọi điện về nhà ngay tại công viên — giờ này ở nhà chắc mẹ đã dậy',
            fx: { love: 2 }, note: 'Một cuộc gọi về nhà — ngắn thôi mà ấm cả buổi sáng',
            say: [
              { sp: 'Mẹ', text: '"A lô, con à? Sao gọi sớm thế — à mà bên con giờ này chắc sáng rõ rồi nhỉ. Ăn sáng chưa con? Đừng có bỏ bữa đấy."' },
              { sp: 'Mẹ', text: '"Ở nhà mọi người khỏe cả, con đừng lo. Cứ giữ sức khỏe, làm việc đàng hoàng, cuối tuần rảnh thì gọi về. Mẹ nghe giọng con khỏe thế này là mẹ yên tâm rồi."' },
              { sp: 'narr', text: 'Cuộc gọi chỉ vài phút. {name} cúp máy, nhìn màn hình tối đi mà vẫn cười một mình. Giữa công viên xa lạ, giọng mẹ vừa ở ngay bên tai — khoảng cách mười mấy nghìn cây số, hóa ra chỉ bằng một cuộc gọi.' }
            ]
          },
          {
            label: 'Đứng dậy đi tiếp luôn, còn nhiều việc phải làm hôm nay',
            say: [
              { sp: 'narr', text: '{name} phủi quần đứng dậy, đi tiếp vòng nữa quanh công viên trước khi về. Đài phun nước vẫn phun đều sau lưng, bọn trẻ vẫn cười vang — buổi sáng ở khu phố này cứ thế trôi đi, bình yên và đúng giờ.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Trước khi rời công viên, {name} cúi xuống nhặt vỏ chai ai đó để quên cạnh ghế, bỏ vào thùng rác phân loại ở cổng. Nội quy trên tấm bảng gỗ — đọc rồi thì làm theo, bắt đầu từ việc nhỏ nhất.' }
    ]
  }
});
