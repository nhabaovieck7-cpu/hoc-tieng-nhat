// scenes-l4.js — CHƯƠNG 4, khối ngành L-D (đợt 01/11/2026, lane L-D):
// kaigo · nhà hàng · genba · khách sạn · thực phẩm — NĂM THỨ HAI trong ngành:
// đã được tin cậy, gánh trách nhiệm, dẫn người mới và xử lý sự cố đúng quy trình.
// Mỗi ngành 2 cảnh branch: -1 được tin cậy/gánh trách nhiệm, -2 sự cố nghề.
// Nhân vật/bối cảnh dùng lại đúng chuỗi Chương 3 (scenes-k.js / scenes-k2.js):
// kaigo — chị Mai, cụ Haru, ông Yamada · nhà hàng — bếp trưởng Sato, anh đầu bếp,
// vị khách khó tính của ind-nha-hang-2 · genba 横浜 — sếp công trường, anh thợ cả,
// Hùng · khách sạn お台場 — chị senpai khách sạn, chị quản lý · thực phẩm 大阪 —
// chị trưởng ca, anh công nhân. Thể ngữ: kaigo kính ngữ chăm sóc; bếp ngắn gọn
// nghề nghiệp; công trường an toàn là trên hết; lễ tân keigo chuẩn; xưởng thực
// phẩm báo cáo rành mạch, phân biệt điều đã chắc và điều chưa chắc.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= KAIGO CHƯƠNG 4 — năm thứ hai ================= */
  'ind4-kaigo-1': {
    scene: '🌱 Kaigo năm thứ hai — ngày đầu làm người dẫn kouhai',
    branch: [
      { sp: 'narr', text: 'Năm thứ hai ở viện dưỡng lão. Sáng nay, trước giờ họp ca, chị Mai gọi {name} lại và thông báo một việc khiến {call} vừa mừng vừa lo: viện vừa nhận một kouhai người Việt mới sang — và người được giao dẫn dắt em ấy trong tháng đầu tiên, chính là {name}.' },
      { sp: 'Chị Mai', jp: '{今日|きょう}から、{新|あたら}しい{後輩|こうはい}の{指導|しどう}を{任|まか}せます。まず{挨拶|あいさつ}と{記録|きろく}の{書|か}き{方|かた}を、あなたの{言葉|ことば}で{教|おし}えてあげてください。', text: 'Chị Mai nói rõ ràng: "Từ hôm nay, chị giao cho em việc hướng dẫn kouhai mới. Trước hết, cách chào hỏi và cách ghi sổ, em hãy dạy lại cho em ấy bằng lời của chính em nhé."' },
      { sp: 'Huy', jp: 'はじめまして。{先輩|せんぱい}、よろしくお{願|ねが}いします。…{緊張|きんちょう}して、{手|て}が{震|ふる}えます。', text: 'Huy — kouhai mới, mười chín tuổi, sang Nhật chưa đầy một tháng — cúi chào rất sâu mà giọng run run: "Em chào senpai ạ. Mong senpai chỉ bảo cho em. …Em hồi hộp quá, tay cứ run lên ạ."' },
      { sp: 'hero', jp: 'ハルさん、おはようございます。{新|あたら}しい{仲間|なかま}を{紹介|しょうかい}します。{目線|めせん}を{合|あ}わせて、ゆっくり{挨拶|あいさつ}するのが、この{仕事|しごと}の{最初|さいしょ}の{約束|やくそく}です。', text: '{name} làm mẫu trước, ngồi xuống ngang tầm mắt cụ Haru: "Cụ Haru, chào buổi sáng ạ. Cháu xin giới thiệu bạn đồng nghiệp mới ạ." Rồi quay sang Huy, nói nhỏ: "Ngồi xuống ngang tầm mắt, chào chậm rãi — đó là lời hứa đầu tiên của nghề này đấy."' },
      { sp: 'Cụ Haru', jp: 'おお、また{若|わか}い{人|ひと}が{来|き}たねえ。{大丈夫|だいじょうぶ}、この{人|ひと}に{教|おし}われば、すぐ{優|やさ}しい{手|て}になるよ。', text: 'Cụ Haru cười móm mém: "Ồ, lại có người trẻ nữa tới à. Không sao đâu, học ở người này thì tay cháu sẽ sớm dịu dàng thôi." — Cụ vừa nói vừa nhìn {name}, cái nhìn của người đã chứng kiến {call} từ ngày đầu bỡ ngỡ.' },
      { sp: 'narr', text: 'Buổi sáng trôi qua không tệ: Huy chào được, rót nước được, chỉ hơi nhanh tay. Nhưng đến giờ ghi sổ sau bữa trưa, {name} phát hiện một dòng chữ khiến tim mình thót lại: Huy ghi "cụ Haru ăn hết bữa trưa, uống nước đủ" — trong khi trưa nay cụ chỉ ăn một nửa, và cốc nước gần như còn nguyên. Một lỗi đầu tiên, nhỏ mà không hề nhỏ.' },
      {
        prompt: 'Kouhai ghi sổ sai ngay ngày đầu: ghi "ăn hết" cho một bữa cụ chỉ ăn một nửa. {name} xử lý thế nào?',
        choice: [
          { label: 'Cùng Huy mở lại sổ ngay, sửa trước mặt em ấy và dạy nguyên tắc "chỉ ghi điều mắt mình thấy"', fx: { jp: 2, love: 2 }, note: 'Kaigo Ch4: dạy kouhai sửa sổ ngay tại chỗ — ghi điều mắt thấy, không ghi điều đoán', say: [
            { sp: 'hero', jp: '{記録|きろく}は、{見|み}たことをそのまま{書|か}きます。{食|た}べた{量|りょう}も、{水|みず}の{量|りょう}も、{目|め}で{確認|かくにん}してからにしましょう。', text: '{name} ngồi xuống cạnh Huy, mở sổ ra: "Sổ ghi chép là ghi lại đúng điều mình đã thấy. Lượng ăn, lượng nước — phải nhìn tận mắt xác nhận rồi mới ghi, nhớ nhé."' },
            { sp: 'Huy', text: '"Em xin lỗi… Em sợ ghi ít thì bị chê là chăm chưa tốt." {name} lắc đầu: "Ghi đúng mới là chăm tốt. Ghi sai, người ca sau sẽ tưởng cụ khỏe và bỏ qua dấu hiệu mệt của cụ đấy." Huy gật đầu, tự tay gạch dòng sai, ghi lại đúng từng chữ, ký tên bên cạnh.' },
            { sp: 'Chị Mai', text: 'Chị Mai đi ngang, đọc dòng sửa trong sổ rồi gật đầu với {name}: "Dạy được như vậy là em đã hiểu nghề này sâu hơn một bậc rồi. Ngày xưa chị cũng sửa sổ cho em y như thế này đấy, nhớ không?"' } ] },
          { label: 'Tự lặng lẽ sửa sổ hộ Huy để em ấy khỏi bị mắng ngày đầu', fx: { pressure: 1, risk: 1 }, note: 'Kaigo Ch4: sửa sổ hộ kouhai — che được lỗi một lần nhưng kouhai không học được gì', say: [
            { sp: 'narr', text: '{name} cầm bút sửa lại dòng ghi cho đúng, không nói với ai. Nhưng tối đó chị Mai đối chiếu sổ với phần ăn thừa của nhà bếp, nhận ra nét chữ khác nhau trong cùng một dòng. Chị không mắng, chỉ hỏi một câu khiến {name} đỏ mặt:' },
            { sp: 'Chị Mai', text: '"Em sửa hộ thì hôm nay sổ đúng. Nhưng ngày mai em không đứng cạnh, em ấy sẽ ghi sai tiếp — và lúc đó không ai biết mà sửa. Dạy người khác, việc khó nhất là dám để họ tự sửa lỗi của mình."' } ] },
          { label: 'Mắng Huy một trận trước mặt cả phòng để em ấy nhớ đời', fx: { pressure: 2, love: -1 }, note: 'Kaigo Ch4: mắng kouhai trước mặt mọi người — lỗi được nhớ bằng nỗi sợ, không phải bằng hiểu biết', say: [
            { sp: 'narr', text: 'Giọng {name} cao lên ngay giữa phòng sinh hoạt. Huy cúi gằm mặt, tay xoắn vào nhau — và cụ Haru ngồi bên khẽ thở dài. Tối đó, Huy ghi sổ đúng từng chữ thật, nhưng ghi xong còn lén hỏi chị Mai xác nhận lại ba lần, vì sợ.' },
            { sp: 'Chị Mai', text: 'Cuối ca, chị Mai kéo {name} ra hành lang: "Người mới sai thì sửa, không phải mắng. Em còn nhớ ngày đầu của chính mình không? Lúc đó, có ai mắng em đâu."' } ] }
        ]
      },
      { sp: 'Chị Mai', jp: '{指導|しどう}で{一番難|いちばんむずか}しいのは、{自分|じぶん}が{我慢|がまん}することです。{手|て}を{出|だ}したくなる{時|とき}ほど、{言葉|ことば}で{伝|つた}えてください。', text: 'Chị Mai tổng kết cuối ca: "Điều khó nhất khi hướng dẫn người khác là chính mình phải biết kiềm chế. Càng những lúc muốn làm hộ, càng phải truyền đạt bằng lời."' },
      { sp: 'Huy', text: '"Senpai, cảm ơn anh/chị. Mai em sẽ nhìn tận mắt rồi mới ghi. …Mà senpai này, ngày đầu của senpai có run như em không?" {name} cười phá lên: "Run hơn em nhiều. Chào cụ mà vấp tới hai lần." Cả hành lang cùng cười — khoảng cách senpai và kouhai ngắn lại hẳn sau câu chuyện thật lòng ấy.' },
      { sp: 'Cụ Haru', jp: 'あんたが{教|おし}える{側|がわ}になるなんてねえ。{月日|つきひ}は{早|はや}いもんだ。{明日|あした}も{二人|ふたり}で{来|き}ておくれ。', text: 'Cụ Haru chống gậy đứng ở cửa phòng, nói vọng ra: "Cháu mà đã thành người đi dạy người khác rồi cơ đấy. Tháng ngày trôi nhanh thật. Mai hai đứa lại tới nhé."' },
      { sp: 'hero', jp: '{明日|あした}は{申|もう}し{送|おく}りの{読|よ}み{合|あ}わせを{一緒|いっしょ}にしましょう。{分|わ}からない{言葉|ことば}は、{遠慮|えんりょ}なく{聞|き}いてくださいね。', text: '{name} đáp lời Huy trước khi ra về: "Ngày mai mình cùng đọc đối chiếu sổ bàn giao nhé. Từ nào không hiểu cứ hỏi, đừng ngại."' },
      { sp: 'narr', text: 'Trên đường về, {name} chợt nhận ra một điều lạ: dạy lại cho người khác những điều mình từng được dạy, hóa ra là cách học sâu nhất. Hôm nay {call} không chỉ là người chăm sóc nữa — {call} đã bắt đầu là một mắt xích truyền nghề.' }
    ]
  },

  'ind4-kaigo-2': {
    scene: '🚨 Kaigo năm thứ hai — đêm trực: cụ Yamada ngã nhẹ trong phòng tắm',
    branch: [
      { sp: 'narr', text: 'Đêm trực đầu tiên mà {name} là người chịu trách nhiệm chính của tầng. Mưa gõ đều trên cửa kính, cả viện chìm trong im lặng. Hơn một năm trước, cũng trong một đêm như thế này, {name} đã ngồi nghe cụ Yamada kể về ngôi nhà cũ — còn đêm nay, sự tin cậy dành cho {call} sẽ được thử bằng một tình huống thật.' },
      { sp: 'Chị Mai', jp: '{今夜|こんや}の{注意点|ちゅういてん}です。ヤマダさんは{足元|あしもと}が{不安定|ふあんてい}です。{夜中|よなか}のトイレは、{必|かなら}ず{声|こえ}をかけてから{一緒|いっしょ}に{行|い}ってください。', text: 'Chị Mai bàn giao trước khi về, dặn kỹ: "Điểm cần chú ý đêm nay đây. Cụ Yamada đi đứng không vững. Cụ đi vệ sinh ban đêm thì nhất định phải cất tiếng hỏi trước rồi đi cùng cụ nhé."' },
      { sp: 'narr', text: 'Hai giờ sáng. Một tiếng "bịch" khẽ, rồi tiếng đồ nhựa đổ trong phòng tắm của cụ Yamada. {name} chạy tới, gõ cửa gọi lớn — không tiếng trả lời ngay. Đẩy cửa vào: cụ Yamada đang ngồi bệt trên sàn phòng tắm, một tay ôm hông, chiếc ghế tắm đổ nghiêng bên cạnh. Cụ vẫn tỉnh táo, nhưng mặt nhăn lại vì đau.' },
      { sp: 'Ông Yamada', jp: '{大丈夫|だいじょうぶ}、{大丈夫|だいじょうぶ}。{少|すこ}し{滑|すべ}っただけだ。{誰|だれ}も{呼|よ}ばないでくれ、{恥|は}ずかしいから。', text: 'Cụ Yamada xua tay, cố nói cứng: "Không sao, không sao đâu. Chỉ trượt chân một chút thôi. Đừng gọi ai cả, xấu hổ lắm." — Cụ tỉnh, nói rõ, nhưng tay ôm hông không rời, và sàn phòng tắm vẫn còn ướt.' },
      {
        prompt: 'Cụ Yamada ngã trong phòng tắm, đang ngồi dưới sàn và nài nỉ "đừng gọi ai". {name} làm gì đầu tiên?',
        choice: [
          { label: 'Không tự bế cụ lên — trấn an, giữ ấm, bấm chuông gọi hỗ trợ và kiểm tra chỗ đau', fx: { jp: 3, hp: 1 }, note: 'Kaigo Ch4: xử lý ngã đúng quy trình — không tự bế, gọi hỗ trợ, giữ ấm, kiểm tra', say: [
            { sp: 'hero', jp: 'ヤマダさん、{動|うご}かないでください。{私|わたし}がそばにいます。{応援|おうえん}を{呼|よ}びますから、{安心|あんしん}してください。{痛|いた}いところを{教|おし}えてください。', text: '{name} quỳ xuống ngang tầm cụ, phủ chiếc khăn khô lên vai cụ cho ấm, một tay bấm chuông gọi hỗ trợ: "Cụ Yamada, cụ đừng cử động ạ. Cháu ở ngay đây. Cháu gọi thêm người tới hỗ trợ, cụ cứ yên tâm. Cụ cho cháu biết chỗ nào đau ạ."' },
            { sp: 'narr', text: 'Chưa đầy hai phút, anh nhân viên ca đêm từ tầng dưới chạy lên. Hai người dùng đúng kỹ thuật đã học: hỏi cụ từng chỗ đau, kiểm tra cử động chân, rồi mới cùng nhau đỡ cụ ngồi lên xe lăn — chậm, chắc, không một động tác giật kéo. Cụ Yamada thở phào: "Hai người đỡ thì… cũng đỡ xấu hổ hơn."' },
            { sp: 'Ông Yamada', jp: 'すまんね、{夜中|よなか}に。あんた、{落|お}ち{着|つ}いてるねえ。{前|まえ}のあんたとは{違|ちが}うよ。', text: 'Cụ Yamada nói khẽ khi đã yên vị trên xe lăn: "Xin lỗi nhé, giữa đêm thế này. Cháu bình tĩnh thật đấy. Khác hẳn cháu của ngày trước."' } ] },
          { label: 'Tự bế cụ đứng dậy ngay cho nhanh, đỡ mất công gọi người giữa đêm', fx: { hp: -2, risk: 2, pressure: 1 }, note: 'Kaigo Ch4: tự bế người bị ngã — nhanh một phút, nguy hiểm cho cả cụ lẫn mình', say: [
            { sp: 'narr', text: '{name} cúi xuống, vòng tay bế xốc cụ lên theo phản xạ muốn giúp nhanh. Cụ Yamada kêu "ối" một tiếng vì chỗ hông bị kéo động, còn lưng {name} thì nhói lên một cơn đau sắc. Đỡ được cụ về giường xong, cả hai cùng ngồi thở — một người đau hông hơn, một người đau lưng.' },
            { sp: 'Chị Mai', text: 'Sáng hôm sau nghe báo cáo, chị Mai nghiêm mặt: "Nếu đêm qua cụ gãy xương hông, cái bế đó có thể làm mọi thứ tệ hơn nhiều. Quy trình không sinh ra để làm chậm em — nó sinh ra để bảo vệ cả hai người. Nhớ kỹ đêm nay."' } ] },
          { label: 'Chiều theo ý cụ: dìu cụ tự đứng dậy, không báo ai để cụ khỏi xấu hổ', fx: { risk: 3, pressure: 2 }, note: 'Kaigo Ch4: giấu sự cố ngã vì chiều ý cụ — vết bầm hôm sau nói thay tất cả', say: [
            { sp: 'narr', text: '{name} dìu cụ tự đứng lên, đưa về giường, và giữ kín chuyện này như một bí mật giữa hai người. Nhưng sáng ra, hông cụ Yamada bầm tím một mảng lớn, cụ bước đi khập khiễng thấy rõ. Chị Mai nhìn vết bầm là hiểu ngay: một sự cố không được báo cáo là một sự cố bị lặp lại trong tương lai.' },
            { sp: 'Chị Mai', text: '"Cụ ngại là cảm xúc của cụ, đáng tôn trọng. Nhưng an toàn của cụ là trách nhiệm của mình, không thương lượng được. Lần sau, dù cụ có nài nỉ thế nào — gọi hỗ trợ, và báo cáo."' } ] }
        ]
      },
      { sp: 'hero', jp: '{看護師|かんごし}さんに{連絡|れんらく}します。バイタルを{測|はか}って、{打|う}ったところを{冷|ひ}やしましょう。ヤマダさん、{少|すこ}し{冷|つめ}たいですよ。', text: 'Khi hỗ trợ đã tới, {name} tiếp tục đúng quy trình: "Cháu liên lạc với y tá ạ. Mình đo các chỉ số sinh tồn, rồi chườm lạnh chỗ bị va đập nhé. Cụ Yamada, hơi lạnh một chút đấy ạ."' },
      { sp: 'narr', text: 'Kết quả kiểm tra khiến cả ca thở phào: không gãy xương, chỉ bầm nhẹ ở hông, các chỉ số ổn định. Nhưng quy trình chưa dừng ở đó — một cú ngã, dù nhẹ đến đâu, vẫn là một sự cố phải được ghi lại và thông báo đúng đường dây.' },
      {
        prompt: 'Cụ đã ổn định. Việc giấy tờ và thông báo, {name} xử lý thế nào trong đêm nay?',
        choice: [
          { label: 'Viết 事故報告 ngay trong đêm, gọi thông báo cho gia đình cụ theo đúng quy trình của viện', fx: { jp: 2, pressure: -1 }, note: 'Kaigo Ch4: viết báo cáo sự cố ngay trong đêm và thông báo gia đình đúng quy trình', say: [
            { sp: 'narr', text: '{name} ngồi vào bàn trực, viết báo cáo sự cố 事故報告 khi mọi chi tiết còn rõ nguyên: giờ giấc, vị trí, tình trạng của cụ, cách đã xử lý. Rồi theo danh sách liên lạc khẩn của viện, {call} gọi cho con gái cụ ở Hokkaido — báo bình tĩnh, đúng sự thật, kèm câu chốt: "Hiện cụ đã ổn định, chúng cháu đang theo dõi sát ạ."' },
            { sp: 'hero', jp: 'ご{家族|かぞく}への{連絡|れんらく}と、{事故報告|じこほうこく}が{済|す}みました。あとは{朝|あさ}まで、{定期的|ていきてき}に{様子|ようす}を{見|み}ます。', text: '{name} tự nhẩm lại quy trình trước khi quay lại phòng cụ: "Đã liên lạc với gia đình, báo cáo sự cố đã xong. Từ giờ tới sáng, mình sẽ kiểm tra tình trạng của cụ theo định kỳ."' } ] },
          { label: 'Để sáng mai hẵng báo cáo và gọi gia đình — đêm hôm gọi chỉ làm người ta lo', fx: { pressure: 2, risk: 1 }, note: 'Kaigo Ch4: trì hoãn báo cáo sự cố tới sáng — gia đình biết muộn, niềm tin bị xước', say: [
            { sp: 'narr', text: 'Sáng hôm sau, con gái cụ Yamada gọi tới viện với giọng lo lắng lẫn trách móc: hàng xóm của cụ ở tầng trên nhắn tin kể lại mà gia đình lại là người biết sau cùng. Chị Mai đứng cạnh {name}, nói khẽ mà thấm: "Thông báo sớm không làm gia đình lo hơn. Thông báo muộn mới làm họ mất niềm tin."' } ] }
        ]
      },
      { sp: 'Chị Mai', jp: '{今夜|こんや}の{対応|たいおう}、{報告|ほうこく}まで{読|よ}みました。{落|お}ち{着|つ}いて、{順番|じゅんばん}も{合|あ}っていましたよ。', text: 'Sáng ra, chị Mai đọc hết báo cáo đêm, nói với {name}: "Cách xử lý đêm nay của em, chị đọc tới tận phần báo cáo rồi. Bình tĩnh, và thứ tự cũng đúng nữa."' },
      { sp: 'narr', text: 'Trước khi hết ca, {name} ghé phòng cụ Yamada lần cuối. Cụ đã ngủ yên, hơi thở đều. Trên bàn trực, cạnh bản báo cáo sự cố, {name} ghi thêm một dòng vào sổ tay của mình: "An toàn không nằm ở chỗ không có sự cố. An toàn nằm ở chỗ sự cố nào cũng được xử lý đúng — kể cả lúc hai giờ sáng, kể cả khi người trong cuộc xin mình đừng làm."' }
    ]
  },

  /* ================= NHÀ HÀNG CHƯƠNG 4 — năm thứ hai ================= */
  'ind4-nha-hang-1': {
    scene: '🔥 Nhà hàng năm thứ hai — đứng bếp phụ giờ cao điểm và vị khách quen năm ngoái',
    branch: [
      { sp: 'narr', text: 'Tối thứ sáu, nhà hàng ở Toyosu đông kín từ lúc mở cửa. Năm thứ hai trong bếp, {name} không còn đứng ở bồn rửa nữa — tối nay, bếp trưởng Sato vừa chỉ tay vào vị trí bếp phụ bên cạnh mình: vị trí của người giữ nhịp cho cả gian bếp trong giờ cao điểm.' },
      { sp: 'Bếp trưởng Sato', jp: '{今日|きょう}はお{前|まえ}が{俺|おれ}の{隣|となり}だ。{焼|や}きと{盛|も}り{付|つ}け、{同時|どうじ}に{見|み}ろ。{声|こえ}が{止|と}まったら、{厨房|ちゅうぼう}も{止|と}まるぞ。', text: 'Bếp trưởng Sato nói ngắn gọn, đúng kiểu bếp: "Hôm nay mày đứng cạnh tao. Nướng và trình bày, nhìn cả hai cùng lúc. Tiếng hô mà dừng là cả bếp dừng đấy."' },
      { sp: 'Anh đầu bếp', jp: 'ピークは{最初|さいしょ}の30{分|ふん}が{勝負|しょうぶ}だ。あとは{体|からだ}が{勝手|かって}に{動|うご}く。{深呼吸|しんこきゅう}しとけ。', text: 'Anh đầu bếp vỗ vai {name}: "Giờ cao điểm thì ba mươi phút đầu là trận đấu quyết định. Qua được là người tự chạy theo nhịp. Hít thở sâu sẵn đi."' },
      { sp: 'hero', jp: 'はい、お{願|ねが}いします！オーダーが{入|はい}ったら、まず{復唱|ふくしょう}してから{動|うご}きます。', text: '{name} đáp to, rõ: "Vâng, mong được chỉ bảo ạ! Có order vào là em hô nhắc lại trước rồi mới bắt tay làm ạ."' },
      {
        prompt: 'Bảy giờ tối: năm phiếu order bay vào cùng một lúc, có cả món cần nướng lâu. {name} giữ nhịp thế nào?',
        choice: [
          { label: 'Hô nhắc lại từng phiếu theo thứ tự, món lâu lửa cho lên bếp trước rồi mới tới món nhanh', fx: { jp: 2, hp: -1 }, note: 'Nhà hàng Ch4: giữ nhịp giờ cao điểm bằng hô nhắc lại và thứ tự lửa hợp lý', say: [
            { sp: 'narr', text: '"Cá nướng hai! Thịt một, thêm món lâu lửa trước!" Tiếng hô của {name} vang đều, tay xếp phiếu theo thứ tự thời gian chín của món chứ không theo thứ tự giấy bay vào. Anh đầu bếp liếc sang, khẽ gật đầu: đúng bài. Cả gian bếp chạy như một cỗ máy đã lên dây.' },
            { sp: 'Bếp trưởng Sato', jp: 'その{順番|じゅんばん}だ。{火|ひ}の{時間|じかん}で{並|なら}べるのが、{厨房|ちゅうぼう}の{頭|あたま}だよ。', text: 'Bếp trưởng Sato nói vọng qua tiếng chảo: "Đúng thứ tự đó. Xếp việc theo thời gian của lửa — đó là cái đầu của người làm bếp đấy."' } ] },
          { label: 'Làm tắt: gộp hết các phiếu giống nhau vào một mẻ lớn cho nhanh, khỏi hô', fx: { pressure: 2, risk: 1 }, note: 'Nhà hàng Ch4: gộp mẻ tắt trong giờ cao điểm — nhanh lúc đầu, rối lúc sau', say: [
            { sp: 'narr', text: 'Mẻ gộp đầu tiên đúng là nhanh. Nhưng tới mẻ thứ hai, hai bàn khác nhau gọi cùng món mà khác độ chín — và đĩa ra bàn bị trả lại một chiếc. Bếp trưởng Sato không quát, chỉ gõ cán dao xuống thớt một tiếng khô: "Tắt đường trong bếp là tự đào hố. Làm lại, từng phiếu một."' } ] }
        ]
      },
      { sp: 'narr', text: 'Tám giờ hơn, nhịp bếp vừa qua đỉnh thì cửa quán mở ra. Một vị khách trung niên bước vào, nhìn quanh gian bếp mở một lượt — rồi dừng ánh mắt đúng chỗ {name}. Đó là vị khách khó tính của năm ngoái: người từng chỉ vào đĩa cá kho và đòi gặp quản lý vì món mặn và chờ lâu.' },
      { sp: 'Anh khách quen', jp: 'あんた、{去年|きょねん}の…そうか、まだいたのか。{今年|ことし}は{厨房|ちゅうぼう}の{中|なか}なんだな。じゃあ、{今日|きょう}はあんたに{任|まか}せるよ。', text: 'Vị khách nheo mắt, rồi bật cười nhận ra: "Cậu là người năm ngoái… À, vẫn còn làm ở đây à. Năm nay đã vào trong bếp rồi cơ đấy. Vậy hôm nay tôi giao bữa này cho cậu đấy."' },
      {
        prompt: 'Vị khách khó tính năm ngoái nhận ra và nói "giao bữa này cho cậu". {name} đáp lại thế nào?',
        choice: [
          { label: 'Cảm ơn khách đã quay lại, nhớ và nhắc đúng khẩu vị của khách: vị nhẹ hơn, ít mặn', fx: { jp: 2, love: 2 }, note: 'Nhà hàng Ch4: nhớ khẩu vị của khách khó tính năm ngoái — lời phàn nàn cũ thành mối khách quen', say: [
            { sp: 'hero', jp: 'ありがとうございます。{昨年|さくねん}のご{指摘|してき}、{今|いま}も{覚|おぼ}えています。{今日|きょう}は{薄味|うすあじ}で、{熱々|あつあつ}をすぐお{出|だ}しします。', text: '{name} cúi đầu qua quầy bếp: "Cảm ơn quý khách đã quay lại ạ. Lời góp ý năm ngoái của quý khách, tới giờ tôi vẫn nhớ. Hôm nay tôi sẽ làm vị nhẹ hơn, và mang ra ngay khi còn nóng hổi ạ."' },
            { sp: 'narr', text: 'Vị khách ngồi xuống, gật đầu chậm rãi — cái gật của người thấy mình được nhớ đến. Món cá kho phiên bản vị nhẹ ra bàn sau mười hai phút, nóng hổi. Ăn xong, khách ghé quầy bếp, nói một câu mà cả bếp đều nghe thấy: "Năm ngoái tôi mắng cậu. Năm nay tôi quay lại vì cậu. Khẩu vị này… đúng ý tôi đấy."' },
            { sp: 'Bếp trưởng Sato', text: 'Bếp trưởng Sato khoanh tay, cười khùng khục: "Đấy. クレーム (lời phàn nàn) năm ngoái, năm nay thành khách quen. Tao nói rồi mà — xin lỗi không phải là thua."' } ] },
          { label: 'Giả vờ không nhớ chuyện năm ngoái, chỉ đáp chung chung "quý khách cứ yên tâm"', fx: { pressure: 1 }, note: 'Nhà hàng Ch4: giả vờ quên chuyện cũ với khách — bỏ lỡ cơ hội biến phàn nàn thành tin cậy', say: [
            { sp: 'narr', text: '{name} cười trừ, đáp một câu an toàn. Vị khách cũng không nói thêm, lặng lẽ gọi món như mọi vị khách bình thường khác. Bữa ăn trôi qua không lỗi lầm gì — nhưng cũng không có khoảnh khắc nào đáng nhớ. Tối đó anh đầu bếp bảo nhỏ: "Khách người ta nhớ mình rõ thế, mà mình lại giả vờ quên người ta. Uổng."' } ] }
        ]
      },
      { sp: 'Bếp trưởng Sato', jp: '{今日|きょう}のピーク、{最後|さいご}まで{崩|くず}れなかったな。{来週|らいしゅう}もその{位置|いち}でいいぞ。', text: 'Khách cuối ra về, bếp trưởng Sato tháo tạp dề, chốt một câu ngắn: "Giờ cao điểm hôm nay, tới cuối vẫn không vỡ nhịp. Tuần sau cứ đứng vị trí đó."' },
      { sp: 'narr', text: '{name} lau chiếc chảo cuối cùng, nhìn gian bếp tối dần. Một năm trước, ở chính gian bếp này, {call} học cách xin lỗi một vị khách đang giận. Tối nay, vị khách ấy quay lại và gọi tên sự tin tưởng. Nghề bếp hóa ra cũng có sổ điểm danh của nó — chỉ là nó được ghi trong trí nhớ của khách hàng.' }
    ]
  },

  'ind4-nha-hang-2': {
    scene: '⚠️ Nhà hàng năm thứ hai — sự cố dị ứng thực phẩm và quy trình アレルギー対応',
    branch: [
      { sp: 'narr', text: 'Giờ trưa. Một phiếu order được chuyển vào bếp có dòng chữ đỏ gạch chân hai lần: "Bàn 6 — khách dị ứng tôm, アレルギー：えび. Tuyệt đối không hải sản vỏ cứng." Trong bếp Nhật, dòng chữ đỏ ấy có trọng lượng như một mệnh lệnh y tế.' },
      { sp: 'Anh đầu bếp', jp: '6{番|ばん}、アレルギー{対応|たいおう}だ。{別|べつ}の{道具|どうぐ}で、{最後|さいご}まで{分|わ}けて{作|つく}るぞ。{確認|かくにん}を{声|こえ}に{出|だ}してな。', text: 'Anh đầu bếp hô to cho cả bếp nghe: "Bàn 6, xử lý dị ứng đấy! Dụng cụ riêng, tách riêng tới cuối. Xác nhận thì phải nói thành tiếng nhé."' },
      { sp: 'narr', text: 'Món chính của bàn 6 được làm riêng cẩn thận. Nhưng ở khâu trình bày cuối, một bạn phụ bếp mới — không biết chuyện — theo thói quen đặt lên đĩa một con tôm chiên giòn trang trí cho đẹp mắt. Đĩa ăn hoàn hảo đến từng chi tiết… trừ chi tiết có thể khiến khách phải vào viện. Và nó đang được bưng ra cửa bếp.' },
      {
        prompt: 'Đĩa ăn của khách dị ứng tôm đang được bưng ra, trên đĩa có một con tôm trang trí. {name} phản ứng thế nào?',
        choice: [
          { label: 'Hô to "ストップ！" giữ đĩa lại ngay, báo bếp trưởng và làm lại đĩa mới hoàn toàn', fx: { jp: 3, pressure: -1 }, note: 'Nhà hàng Ch4: chặn đứng món dị ứng đúng quy trình — hô dừng, báo cáo, làm lại từ đầu', say: [
            { sp: 'hero', jp: 'ストップ！その{皿|さら}、{出|だ}しません。えびが{乗|の}っています。{店長|てんちょう}、アレルギーの{皿|さら}に{混入|こんにゅう}です、{作|つく}り{直|なお}します！', text: '{name} hô vang cả bếp: "Dừng lại! Đĩa đó không được mang ra. Trên đĩa có tôm. Bếp trưởng, đĩa của khách dị ứng bị lẫn tôm vào rồi, làm lại từ đầu ạ!" Đĩa ăn được đặt xuống ngay lập tức — cả bếp dừng tay nửa nhịp, rồi chuyển động theo một nhịp khác hẳn: nhịp của xử lý sự cố.' },
            { sp: 'Bếp trưởng Sato', jp: 'よく{止|と}めた。{取|と}り{除|のぞ}くだけじゃだめだ、{油|あぶら}も{道具|どうぐ}も{全部|ぜんぶ}{新|あたら}しくしろ。', text: 'Bếp trưởng Sato ra lệnh dứt khoát: "Giữ lại tốt lắm. Không phải chỉ gắp bỏ con tôm ra là xong đâu — dầu, dụng cụ, tất cả làm mới hết."' },
            { sp: 'narr', text: 'Đĩa mới được làm lại từ đầu: chảo riêng, dầu mới, dụng cụ riêng, và lần này {name} đích thân kiểm tra lần cuối trước khi bưng ra. Mười phút chậm hơn dự kiến — đổi lại là một bữa trưa an toàn tuyệt đối cho người khách bàn 6.' } ] },
          { label: 'Gắp con tôm ra khỏi đĩa rồi mang ra bình thường — khách có ăn vào đâu mà lo', fx: { risk: 3, pressure: 2 }, note: 'Nhà hàng Ch4: gắp bỏ tôm khỏi đĩa của khách dị ứng — tiếp xúc chéo vẫn còn nguyên trên món ăn', say: [
            { sp: 'narr', text: '{name} nhanh tay gắp con tôm bỏ đi và ra hiệu mang đĩa ra như thường. Nhưng bếp trưởng Sato — người đã nhìn thấy tất cả từ phía sau — giữ khay lại, mặt sầm xuống: "Mày có biết 接触 (tiếp xúc chéo) là gì không? Nước tôm đã thấm vào món ăn rồi. Với người dị ứng, "gắp ra" và "chưa từng có" là hai chuyện cách nhau một chuyến xe cấp cứu đấy." Đĩa ăn bị hủy ngay tại chỗ.' },
            { sp: 'Bếp trưởng Sato', jp: 'アレルギーは「{少|すこ}しなら{平気|へいき}」が{通|とお}らない{世界|せかい}だ。{命|いのち}の{話|はなし}だぞ。', text: 'Bếp trưởng nói chậm, nặng từng chữ: "Dị ứng là cái thế giới mà câu "một chút chắc không sao" không hề tồn tại. Đây là chuyện tính mạng đấy."' } ] },
          { label: 'Mang đĩa ra bàn rồi hỏi khách "có một con tôm trang trí, quý khách gắp bỏ được không"', fx: { risk: 2, pressure: 2 }, note: 'Nhà hàng Ch4: đẩy quyết định dị ứng sang cho khách — trách nhiệm của bếp không thể chuyển giao', say: [
            { sp: 'narr', text: 'Câu hỏi vừa dứt, vị khách bàn 6 tái mặt, đặt đũa xuống. Quản lý phải ra cúi đầu xin lỗi và cho làm lại toàn bộ. Trên đường bưng đĩa vào lại bếp, {name} nghe anh đầu bếp nói khẽ sau lưng: "Quyết định về an toàn của khách là việc của bếp. Đẩy sang cho khách trả lời, tức là mình đã bỏ việc của mình."' } ] }
        ]
      },
      { sp: 'Bếp trưởng Sato', jp: '{客|きゃく}には{私|わたし}から{謝|あやま}る。{遅|おく}れる{理由|りゆう}は、{正直|しょうじき}に{言|い}う。それが{店|みせ}の{信用|しんよう}だ。', text: 'Bếp trưởng Sato tự mình ra bàn 6: "Tôi sẽ là người xin lỗi khách. Lý do chậm món thì nói thật. Đó là uy tín của quán."' },
      { sp: 'hero', jp: '{申|もう}し{訳|わけ}ございません。{安全|あんぜん}の{確認|かくにん}のため、{新|あたら}しいものを{作|つく}り{直|なお}しました。{材料|ざいりょう}と{道具|どうぐ}は、すべて{別|べつ}のものを{使|つか}っています。', text: '{name} bưng đĩa mới ra, cúi đầu giải thích rõ ràng: "Tôi vô cùng xin lỗi quý khách. Để xác nhận an toàn, chúng tôi đã làm lại món mới hoàn toàn. Nguyên liệu và dụng cụ đều dùng đồ riêng ạ."' },
      { sp: 'Khách nữ', jp: 'ちゃんと{言|い}ってくれて、ありがとう。{隠|かく}されるのが{一番怖|いちばんこわ}いから。…おいしい、{安心|あんしん}して{食|た}べられます。', text: 'Vị khách bàn 6 — một phụ nữ trẻ — thở phào, mỉm cười: "Cảm ơn anh đã nói rõ ràng cho tôi biết. Bị giấu mới là điều đáng sợ nhất… Món ăn ngon, và tôi ăn mà yên tâm được."' },
      {
        prompt: 'Khách đã ăn an toàn. Cuối giờ trưa, khâu tổng kết sự cố, {name} đề xuất gì với bếp trưởng?',
        choice: [
          { label: 'Đề xuất quy trình cố định: phiếu dị ứng kẹp thẻ đỏ, hô xác nhận ở khâu trình bày cuối', fx: { jp: 2, love: 1 }, note: 'Nhà hàng Ch4: biến sự cố thành quy trình — thẻ đỏ cho phiếu dị ứng và điểm kiểm tra cuối', say: [
            { sp: 'narr', text: '{name} lấy một tấm thẻ đỏ trong kho, trình bày ngắn gọn: từ nay phiếu có dị ứng sẽ kẹp thẻ đỏ, và khâu trình bày cuối phải hô "アレルギー確認！" trước khi đĩa rời bếp. Bếp trưởng Sato nghe xong, cầm thẻ đỏ ghim ngay lên bảng quy trình: "Được. Từ tối nay áp dụng. Sự cố mà rút ra được quy trình thì sự cố đó không uổng."' },
            { sp: 'Anh đầu bếp', jp: 'じゃあ{今日|きょう}から、{最後|さいご}の{確認|かくにん}はお{前|まえ}の{役|やく}だな。{頼|たの}むよ、{番人|ばんにん}さん。', text: 'Anh đầu bếp cười, vỗ vai {name}: "Vậy từ hôm nay, khâu kiểm tra cuối là phần việc của cậu nhé. Trông cậy vào cậu đấy, anh lính gác."' } ] },
          { label: 'Cho qua — khách chưa ăn phải, coi như bài học miệng giữa mọi người là đủ', fx: { pressure: 1, risk: 1 }, note: 'Nhà hàng Ch4: bỏ qua bước cố định quy trình sau sự cố dị ứng', say: [
            { sp: 'narr', text: 'Mọi người gật gù "rút kinh nghiệm" rồi ai vào việc nấy. Nhưng một tuần sau, một phụ bếp khác lại suýt trang trí nhầm lên đĩa của khách dị ứng trứng — may mà anh đầu bếp đứng gần nhìn thấy. Bài học chỉ nằm trong trí nhớ của vài người thì không gọi là quy trình; nó sẽ rơi rụng theo từng ca trực.' } ] }
        ]
      },
      { sp: 'Bếp trưởng Sato', jp: '{今日|きょう}の{対応|たいおう}を、{最後|さいご}に{言|い}うぞ。アレルギー{対応|たいおう}は、{早|はや}さより{正|ただ}しさ。{止|と}める{声|こえ}を、{恥|は}ずかしがるな。', text: 'Cuối ca, bếp trưởng Sato tổng kết cho cả bếp: "Tao nói lại cách xử lý hôm nay lần cuối. Đối phó dị ứng thì đúng quan trọng hơn nhanh. Đừng bao giờ xấu hổ vì đã hô dừng."' },
      { sp: 'narr', text: '{name} ghi vào sổ tay nghề, ngay dưới dòng chữ của năm ngoái — "xin lỗi là giữ lại một người khách" — một dòng mới: "Hô dừng một đĩa ăn là giữ lại một mạng người." Trên bảng quy trình của bếp, tấm thẻ đỏ đầu tiên đã được ghim lên, nhỏ thôi, mà từ nay không một phiếu dị ứng nào đi qua gian bếp này mà thiếu nó.' }
    ]
  },

  /* ================= GENBA CHƯƠNG 4 — năm thứ hai ================= */
  'ind4-genba-1': {
    scene: '🦺 Genba năm thứ hai — tổ phó chủ trì 朝礼 và buổi kiểm tra KY cho cả tổ',
    branch: [
      { sp: 'narr', text: 'Năm thứ hai ở công trường 横浜. Sáng nay sương còn đọng trên giàn giáo, sếp công trường gọi {name} lại lán chỉ huy và giao một việc chưa từng có: từ tuần này, {name} làm tổ phó của tổ nhỏ năm người — và buổi họp an toàn buổi sáng 朝礼 hôm nay, {call} sẽ là người chủ trì.' },
      { sp: 'Sếp công trường', jp: '{今日|きょう}の{朝礼|ちょうれい}は、お{前|まえ}が{進|すす}めろ。KYも{同|おな}じだ。{新|あたら}しいベトナムの{子|こ}が{一人|ひとり}いる。{言葉|ことば}が{届|とど}くように、{頼|たの}んだぞ。', text: 'Sếp công trường nói ngắn gọn: "Buổi 朝礼 hôm nay em chủ trì đi. Phần KY cũng vậy. Có một bạn người Việt mới sang. Căn sao cho lời nói tới được với bạn ấy nhé, trông cậy vào em."' },
      { sp: 'hero', jp: 'おはようございます！{今日|きょう}の{作業|さぎょう}と{危険|きけん}を、{全員|ぜんいん}で{確認|かくにん}します。まず{体調|たいちょう}、{悪|わる}い{人|ひと}は{手|て}を{上|あ}げてください。', text: '{name} đứng trước tổ, hô to mở buổi họp: "Chào buổi sáng mọi người! Công việc và các mối nguy hôm nay, cả tổ cùng xác nhận nào. Trước hết là tình trạng sức khỏe — ai thấy không ổn, giơ tay lên ạ!"' },
      { sp: 'Bảo', jp: 'おはようございます。バオです。…あの、{安全帯|あんぜんたい}、これで{合|あ}っていますか。', text: 'Bảo — người Việt mới sang được hai tuần — chào lí nhí rồi giơ chiếc dây an toàn của mình lên hỏi, giọng đầy lo lắng: "Chào buổi sáng ạ. Em là Bảo ạ. …À, dây an toàn của em đeo thế này có đúng không ạ?"' },
      {
        prompt: '{name} nhìn kỹ: dây an toàn của Bảo móc sai vị trí, quai mũ cũng lỏng. Buổi KY kiểm tra bắt đầu từ đây:',
        choice: [
          { label: 'Dừng buổi kiểm tra, chỉnh lại dây tận tay cho Bảo và cho cả tổ cùng nhìn để học chung', fx: { jp: 2, love: 2 }, note: 'Genba Ch4: chỉnh dây an toàn tận tay trước cả tổ — một người học thành năm người nhớ', say: [
            { sp: 'hero', jp: 'いい{質問|しつもん}だ。{皆|みんな}も{見|み}てくれ。{安全帯|あんぜんたい}は{腰|こし}より{上|うえ}、フックは{背中|せなか}の{輪|わ}に{掛|か}ける。{緩|ゆる}いと、{落|お}ちた{時|とき}に{体|からだ}が{抜|ぬ}けるぞ。', text: '{name} đáp ngay: "Câu hỏi hay đấy. Mọi người cùng nhìn nhé. Dây an toàn phải ở trên hông, móc khóa vào vòng sau lưng. Đeo lỏng thì lúc ngã, người sẽ tuột ra khỏi dây đấy." Rồi {call} tự tay chỉnh lại từng quai cho Bảo, để cả tổ nhìn rõ từng thao tác.' },
            { sp: 'narr', text: 'Bảo tự đeo lại lần thứ hai — lần này đúng từng điểm. Hùng đứng cạnh gật gù: một năm trước, chính anh là người được chỉnh dây như thế này. Buổi KY hôm đó chậm hơn mọi ngày đúng ba phút, nhưng cả năm người trong tổ đều mang theo một bài học chung.' },
            { sp: 'Bảo', jp: 'ありがとうございます。{聞|き}いてよかったです。{分|わ}からないことは、{作業|さぎょう}の{前|まえ}に{聞|き}きます。', text: 'Bảo cúi đầu: "Em cảm ơn ạ. May mà em hỏi. Từ nay việc gì không hiểu, em sẽ hỏi trước khi bắt đầu làm ạ."' } ] },
          { label: 'Nhắc riêng Bảo một câu qua loa "móc lên cao chút nữa" rồi đi tiếp cho kịp giờ', fx: { risk: 2, pressure: 1 }, note: 'Genba Ch4: nhắc dây an toàn qua loa — lỗi nhỏ được giữ lại thành nguy cơ lớn', say: [
            { sp: 'narr', text: 'Bảo gật đầu, loay hoay tự chỉnh theo cảm tính — móc thì lên cao thật, nhưng quai ngực lại xoắn. Mãi tới giờ nghỉ trưa, anh thợ cả đi ngang mới phát hiện và chỉnh lại từ đầu. Anh nhìn {name}, nói một câu không nặng mà thấm: "Tổ phó mà ngại mất ba phút thì có ngày cả tổ mất nhiều hơn ba phút đấy."' } ] }
        ]
      },
      { sp: 'Anh thợ cả', jp: '{今日|きょう}のKY、もう{一|ひと}つあるぞ。{午後|ごご}から{風|かぜ}が{強|つよ}くなる。{高|たか}い{場所|ばしょ}の{物|もの}は、{全部|ぜんぶ}{下|お}ろすか{固定|こてい}するかだ。', text: 'Anh thợ cả bổ sung điểm nguy hiểm của ngày: "KY hôm nay còn một ý nữa. Từ chiều gió sẽ mạnh lên đấy. Vật gì ở trên cao là phải hạ xuống hết hoặc cố định lại."' },
      { sp: 'hero', jp: 'では{役割|やくわり}を{決|き}めます。{高所|こうしょ}は{経験者|けいけんしゃ}だけ。バオさんはフンさんと{一緒|いっしょ}に、{下|した}で{材料|ざいりょう}を{頼|たの}みます。', text: '{name} phân công rành mạch: "Vậy mình chốt vai trò nhé. Việc trên cao chỉ người có kinh nghiệm làm. Bảo làm cùng anh Hùng ở dưới, phụ trách vật liệu nhé."' },
      {
        prompt: 'Tan buổi 朝礼, Bảo kéo {name} lại, nói nhỏ bằng tiếng Việt: "Em sợ nhất lúc hô khẩu hiệu an toàn — em không thuộc, sợ hô sai cả tổ cười." {name} đáp sao?',
        choice: [
          { label: 'Dạy Bảo hai câu hô ngắn nhất, cho em ấy hô thử ngay cùng cả tổ một lần', fx: { jp: 2, love: 1 }, note: 'Genba Ch4: dạy kouhai Việt câu hô an toàn và cho thực hành ngay — tiếng Nhật công trường bắt đầu từ hai câu ngắn', say: [
            { sp: 'hero', jp: 'バオさん、{二|ふた}つだけでいい。{足元|あしもと}よし、{頭上|ずじょう}よし。{最後|さいご}に、ご{安全|あんぜん}に。さあ、{皆|みんな}と{一緒|いっしょ}に{言|い}ってみよう。', text: '{name} viết hai câu lên bảng trắng của tổ: "Bảo, chỉ cần hai câu này thôi. "Dưới chân: ổn! Trên đầu: ổn!" Cuối cùng là "Chúc mọi người an toàn!" Nào, hô thử cùng cả tổ một lần xem." Cả tổ hô theo, giọng Bảo lúc đầu nhỏ, lần thứ hai đã vang hẳn lên.' },
            { sp: 'narr', text: 'Hùng vỗ lưng Bảo đánh "bốp": "Ngày xưa anh cũng chỉ thuộc đúng hai câu này suốt tháng đầu đấy." Tiếng cười làm buổi sáng công trường nhẹ hẳn — và một người mới bớt đi một nỗi sợ vô hình.' } ] },
          { label: 'Bảo Bảo cứ đứng im nhìn theo mọi người là được, thuộc dần sau cũng chưa muộn', fx: { pressure: 1 }, note: 'Genba Ch4: để kouhai đứng ngoài vòng hô an toàn — an toàn là việc của từng người, không ai được đứng ngoài', say: [
            { sp: 'narr', text: 'Cả ngày hôm đó, mỗi lần tổ hô kiểm tra, Bảo chỉ mấp máy môi không thành tiếng. Tới cuối ngày, anh thợ cả hỏi một câu khiến {name} suy nghĩ mãi: "Khẩu hiệu an toàn mà có người chỉ đứng nhìn, thì buổi kiểm tra đó còn thiếu một người. Người thiếu đó chính là người dễ gặp chuyện nhất."' } ] }
        ]
      },
      { sp: 'Hùng', jp: '{朝礼|ちょうれい}、{様|さま}になってたよ。{俺|おれ}の{時|とき}より{上手|うま}かったな、{正直|しょうじき}。', text: 'Hùng khoác vai {name} trên đường vào việc, cười thật lòng: "Buổi 朝礼 hôm nay ra dáng lắm đấy. Nói thật là còn ngon hơn hồi của tớ nữa."' },
      { sp: 'Sếp công trường', jp: '{来週|らいしゅう}から、{朝礼|ちょうれい}の{当番|とうばん}に{入|い}れておく。{人|ひと}に{伝|つた}えるのが、{次|つぎ}の{腕|うで}だぞ。', text: 'Sếp công trường chốt trước khi vào ca: "Từ tuần sau anh xếp em vào lịch trực 朝礼 đấy. Biết truyền đạt cho người khác mới là bậc tay nghề tiếp theo."' },
      { sp: 'narr', text: '{name} cầm cuốn sổ KY của tổ, nhìn năm chữ ký điểm danh ngay ngắn. Một năm trước, {call} là người đứng ở cuối hàng, hô theo người khác. Sáng nay, {call} là người đứng đầu hàng — và hiểu rằng đứng đầu hàng không phải để ra oai, mà để chắc chắn không một ai trong hàng bị bỏ lại phía sau, kể cả người mới sang được hai tuần.' }
    ]
  },

  'ind4-genba-2': {
    scene: '🌪️ Genba năm thứ hai — gió lớn bất thường và quyết định dừng việc trên cao',
    branch: [
      { sp: 'narr', text: 'Buổi chiều ở công trường 横浜, trời đang trong xanh bỗng đổi gió. Cờ hiệu trên đỉnh giàn giáo giật phần phật, những tấm bạt che phủ đập vào khung thép nghe "bành bạch". Tổ của {name} đang làm việc trên cao — và gió thì không hề có ý định nhẹ đi.' },
      { sp: 'Anh thợ cả', jp: '{風|かぜ}、さっきより{強|つよ}くなったぞ。{体|からだ}が{押|お}されるくらいだ。おい、{上|うえ}の{連中|れんちゅう}、{気|き}をつけろ。', text: 'Anh thợ cả ngẩng lên, một tay giữ mũ: "Gió mạnh hơn lúc nãy rồi đấy. Đứng còn thấy người bị đẩy đi cơ mà. Này, mấy người trên cao, cẩn thận đấy!"' },
      { sp: 'Anh phụ trách tiến độ', text: 'Phía dưới, anh phụ trách tiến độ của nhà thầu nhìn đồng hồ, cau mày gọi với lên: "Phần việc trên cao hôm nay phải xong trước tối, mai đoàn kiểm tra tới rồi. Cố thêm một tiếng nữa thôi, gió thế này chắc không sao đâu!" Tiến độ đang dí sát — và câu "chắc không sao" vang lên giữa tiếng gió nghe mong manh lạ thường.' },
      { sp: 'hero', jp: '{風速|ふうそく}を{測|はか}ります。…{秒速|びょうそく}12メートルを{超|こ}えています。{規定|きてい}では10メートルで{高所作業|こうしょさぎょう}は{中止|ちゅうし}です。', text: '{name} rút máy đo gió, giơ lên quá đầu, đọc con số hai lần cho chắc: "Em đo tốc độ gió ạ. …Đã vượt 12 mét một giây rồi. Theo quy định, từ 10 mét một giây là phải dừng việc trên cao ạ."' },
      {
        prompt: 'Gió đã vượt ngưỡng quy định, nhưng tiến độ đang bị giục gắt. Tổ phó {name} quyết định thế nào?',
        choice: [
          { label: 'Tuyên bố dừng việc trên cao ngay, cho cả tổ xuống và chuyển sang việc ở mặt đất', fx: { jp: 3, pressure: 1 }, note: 'Genba Ch4: dừng việc trên cao đúng luật bất chấp sức ép tiến độ — quyết định của tổ phó cứu cả tổ', say: [
            { sp: 'hero', jp: '{全員|ぜんいん}、{高所作業|こうしょさぎょう}を{中止|ちゅうし}します！{道具|どうぐ}を{固定|こてい}して、{順番|じゅんばん}に{下|お}りてください。{下|した}の{作業|さぎょう}に{切|き}り{替|か}えます。ご{安全|あんぜん}に！', text: '{name} hô vang, át cả tiếng gió: "Tất cả dừng việc trên cao! Cố định dụng cụ lại, rồi xuống theo thứ tự. Mình chuyển sang làm việc ở mặt đất. Chúc mọi người an toàn!" Cả tổ không một lời bàn cãi — từng người cố định đồ nghề, nối nhau leo xuống.' },
            { sp: 'narr', text: 'Anh phụ trách tiến độ xua tay bực bội dưới sân: "Dừng bây giờ là mai đoàn kiểm tra tới nơi chưa xong đâu đấy!" Nhưng {name} chỉ đưa cho anh xem màn hình máy đo gió: con số không biết nói dối, và quy định thì không có dòng nào viết "trừ khi đang vội".' },
            { sp: 'Hùng', jp: '{言|い}いにくいことを{言|い}えるのが、{上|うえ}に{立|た}つ{人|ひと}だな。{下|した}から{見|み}てて、{頼|たの}もしかったよ。', text: 'Hùng vừa buộc lại dây giày vừa nói: "Nói được điều khó nói mới là người đứng đầu đấy. Đứng dưới nhìn lên, thấy cậu đáng tin hẳn."' } ] },
          { label: 'Cho tổ làm nốt ba mươi phút nữa cho xong mảng đang dở, gió chắc sẽ nhẹ đi', fx: { risk: 3, hp: -2 }, note: 'Genba Ch4: cố làm trên cao quá ngưỡng gió — quyết định đánh cược bằng sự an toàn của cả tổ', say: [
            { sp: 'narr', text: 'Hai mươi phút sau, một cơn gió giật mạnh hơn hẳn thốc tới. Một tấm ván cố định chưa kỹ trên tầng trên trượt ra, rơi xuống — may mắn rơi đúng vào khu vực đất trống đã rào chắn, không trúng ai. Cả công trường im phăng phắc mất mấy giây. Sếp công trường nhìn {name}, không quát, chỉ hỏi: "Ngưỡng quy định để làm gì, em nói anh nghe?"' },
            { sp: 'Sếp công trường', jp: '{進度|しんど}は{取|と}り{返|かえ}せる。{人|ひと}の{体|からだ}は{取|と}り{返|かえ}せない。{止|と}めるのは、{勇気|ゆうき}じゃない。{仕事|しごと}だ。', text: 'Sếp nói chậm rãi: "Tiến độ thì lấy lại được. Thân người thì không lấy lại được đâu. Dừng việc không phải chuyện dũng cảm — nó là công việc đấy."' } ] },
          { label: 'Không dám tự quyết, cho tổ đứng chờ trên cao trong lúc mình chạy đi hỏi sếp', fx: { risk: 2, pressure: 2 }, note: 'Genba Ch4: chờ quyết định trong khi tổ vẫn ở trên cao giữa gió lớn — thời gian chờ cũng là thời gian nguy hiểm', say: [
            { sp: 'narr', text: 'Năm phút {name} chạy tới lán chỉ huy là năm phút cả tổ vẫn đứng trên giàn giáo giữa gió giật, níu chặt khung thép. Sếp công trường vừa nghe câu đầu tiên đã đứng bật dậy ra lệnh dừng toàn bộ việc trên cao qua bộ đàm — rồi quay lại: "Tổ phó là người quyết tại chỗ. Chờ đợi trong lúc nguy hiểm đang diễn ra, bản thân nó đã là một quyết định sai."' } ] }
        ]
      },
      { sp: 'narr', text: 'Mười lăm phút sau khi tổ của {name} xuống hết, ở khu giàn giáo của đội bên cạnh, một cơn gió giật cực mạnh quật tới: tấm bạt lớn chưa cố định kỹ bị xé toạc khỏi khung, một thanh thép nhẹ bị hất bay, đập vào lưới an toàn rồi rơi xuống khu vực bên dưới. Không ai bị thương — vì khu vực đó đã được rào — nhưng tiếng thép chạm đất khiến cả công trường lạnh người. Nếu lúc đó còn người làm việc trên cao…' },
      { sp: 'Sếp công trường', jp: '{全員|ぜんいん}、{無事|ぶじ}か。…よし。{今日|きょう}の{高所|こうしょ}はこれで{終|お}わりだ。{風|かぜ}が{落|お}ち{着|つ}くまで、{上|うえ}には{誰|だれ}も{上|あ}がるな。', text: 'Sếp công trường chạy tới, điểm danh bằng mắt một lượt rồi ra lệnh: "Mọi người không sao chứ? …Tốt. Việc trên cao hôm nay kết thúc ở đây. Gió chưa yên thì không ai được lên trên nữa."' },
      {
        prompt: 'Sự cố ở đội bên cạnh đã xảy ra thật. Phần việc giấy tờ sau đó, tổ phó {name} làm tới đâu?',
        choice: [
          { label: 'Ghi đầy đủ vào sổ: giờ đo gió, con số đo được, giờ ra lệnh dừng và diễn biến sự cố bên cạnh', fx: { jp: 2, pressure: -1 }, note: 'Genba Ch4: ghi chép quyết định dừng việc đầy đủ — con số và giờ giấc là bằng chứng bảo vệ cả tổ', say: [
            { sp: 'narr', text: '{name} mở sổ công trường, ghi từng dòng rành mạch: 14 giờ 05 đo gió 12 mét/giây, 14 giờ 07 ra lệnh dừng, 14 giờ 22 sự cố ở giàn giáo bên. Sếp đọc xong, ký xác nhận ngay bên dưới: "Ghi thế này thì mai đoàn kiểm tra tới, mình không có gì phải cúi đầu. Quyết định đúng mà không ghi lại thì chỉ còn là lời nói gió bay."' } ] },
          { label: 'Tổ mình không sao là may rồi, không cần ghi chép gì thêm cho rườm rà', fx: { pressure: 1 }, note: 'Genba Ch4: bỏ qua ghi chép sau quyết định dừng việc — hôm sau không còn bằng chứng nào cho quyết định đúng', say: [
            { sp: 'narr', text: 'Sáng hôm sau, khi bị hỏi vì sao phần việc trên cao chậm một buổi, {name} chỉ có thể trả lời bằng miệng: "Hôm qua gió to lắm ạ." Không giờ giấc, không con số — và câu trả lời nghe yếu hẳn đi. Bài học đến muộn một ngày nhưng rất rõ: ở công trường, hồ sơ chính là tiếng nói của mình khi mình không có mặt.' } ] }
        ]
      },
      { sp: 'Sếp công trường', jp: '{今日|きょう}の{判断|はんだん}は、{正|ただ}しかった。{進度|しんど}より{人|ひと}を{選|えら}んだ{人間|にんげん}を、{俺|おれ}は{信用|しんよう}する。これからも、その{目|め}で{現場|げんば}を{見|み}てくれ。', text: 'Cuối ngày, sếp công trường gọi riêng {name} lại: "Quyết định hôm nay của em là đúng. Người biết chọn con người thay vì tiến độ thì anh tin được. Từ nay cũng hãy nhìn công trường bằng con mắt đó nhé."' },
      { sp: 'narr', text: 'Trên đường về, gió 横浜 đã dịu, biển lên đèn lấp lánh. {name} nghĩ về câu hô của mình lúc chiều — câu hô bị người ta bực bội, bị tiến độ chống lại, nhưng là câu hô giữ cho năm con người trong tổ được về nhà nguyên vẹn tối nay. Ở genba, uy tín của người đứng đầu không đo bằng việc xong nhanh bao nhiêu. Nó đo bằng việc có bao nhiêu người được an toàn trở về.' }
    ]
  },

  /* ================= KHÁCH SẠN CHƯƠNG 4 — năm thứ hai ================= */
  'ind4-khach-san-1': {
    scene: '👑 Khách sạn お台場 năm thứ hai — khách VIP khó tính và lời phàn nàn tưởng nhỏ',
    branch: [
      { sp: 'narr', text: 'Năm thứ hai ở quầy lễ tân khách sạn お台場, {name} đã là người được chị quản lý giao tiếp những vị khách quan trọng nhất. Chiều nay, một vị khách VIP quen mặt của khách sạn — một nữ doanh nhân nổi tiếng khó tính, chi tiết tới từng chiếc gối — sẽ đến ở ba đêm liền.' },
      { sp: 'Chị quản lý', jp: 'あの{方|かた}は、{細|こま}かい{要望|ようぼう}が{多|おお}い{方|かた}です。でも、{要望|ようぼう}の{多|おお}さは、{期待|きたい}の{高|たか}さですよ。よろしくお{願|ねが}いします。', text: 'Chị quản lý dặn trước: "Vị khách đó là người có nhiều yêu cầu chi tiết. Nhưng yêu cầu càng nhiều thì kỳ vọng càng cao đấy. Trông cậy vào em nhé."' },
      { sp: 'Bà khách VIP', jp: '{前回|ぜんかい}と{同|おな}じ、{静|しず}かな{部屋|へや}でお{願|ねが}いします。あと、{枕|まくら}は{低|ひく}いもの、{夜|よる}の{紅茶|こうちゃ}はカモミールで。…{覚|おぼ}えられますか。', text: 'Bà khách VIP nói nhanh và rõ, mắt nhìn thẳng như đang kiểm tra: "Như lần trước, cho tôi phòng yên tĩnh nhé. Thêm nữa, gối phải là loại thấp, trà buổi tối là trà hoa cúc. …Cậu ghi nhớ được hết không đấy?"' },
      { sp: 'hero', jp: 'かしこまりました。{静|しず}かなお{部屋|へや}、{低|ひく}い{枕|まくら}、{夜|よる}はカモミールの{紅茶|こうちゃ}でございますね。{一|ひと}つずつ{確認|かくにん}して、{手配|てはい}いたします。', text: '{name} mỉm cười, lặp lại xác nhận từng ý một: "Tôi đã rõ ạ. Phòng yên tĩnh, gối thấp, buổi tối là trà hoa cúc — đúng không ạ. Tôi sẽ xác nhận từng việc một và sắp xếp ngay ạ."' },
      { sp: 'narr', text: 'Mọi thứ được sắp xếp chu toàn. Nhưng mười giờ tối, điện thoại quầy lễ tân reo: giọng bà khách VIP mệt mỏi sau một ngày họp dài. "Này cậu… chắc chuyện nhỏ thôi, nhưng cái điều hòa phòng tôi nó cứ kêu rì rì, còn cái gối thì vẫn cao quá. Tôi nằm mãi không ngủ được." Một lời phàn nàn "tưởng nhỏ" — vào đúng mười giờ đêm, với một vị khách đã bay cả ngày và sáng mai họp sớm.' },
      {
        prompt: 'Lời phàn nàn tưởng nhỏ lúc mười giờ đêm của khách VIP. {name} xử lý thế nào?',
        choice: [
          { label: 'Xin lỗi, đích thân cùng nhân viên kỹ thuật lên phòng ngay, mang theo hai loại gối thấp khác nhau', fx: { jp: 3, love: 2 }, note: 'Khách sạn Ch4: không xem nhẹ phàn nàn nhỏ — lên phòng ngay cùng kỹ thuật và lựa chọn gối thay thế', say: [
            { sp: 'hero', jp: '{申|もう}し{訳|わけ}ございません。すぐ{技術|ぎじゅつ}の{者|もの}と{一緒|いっしょ}に、お{部屋|へや}へ{上|あ}がります。{低|ひく}い{枕|まくら}も、{二種類|にしゅるい}お{持|も}ちしますので、お{選|えら}びください。', text: '{name} đáp ngay, không một giây chần chừ: "Tôi vô cùng xin lỗi quý khách. Tôi sẽ cùng nhân viên kỹ thuật lên phòng ngay ạ. Gối thấp tôi cũng mang theo hai loại để quý khách lựa chọn ạ."' },
            { sp: 'narr', text: 'Mười phút sau, tiếng kêu của điều hòa được xử lý xong — một tấm lọc rung nhẹ, việc nhỏ xíu. Bà khách VIP tự tay ấn thử từng chiếc gối, chọn một chiếc, rồi ngồi xuống giường, thở ra một hơi dài. Nét khó tính trên mặt bà tan đi thấy rõ.' },
            { sp: 'Bà khách VIP', jp: 'こんな{小|ちい}さなことで、ここまでしてくれるのね。…{明日|あした}の{会議|かいぎ}、{頑張|がんば}れそう。ありがとう。', text: 'Bà khách nói, giọng mềm hẳn: "Chuyện nhỏ thế này mà các cậu làm tới mức này cơ à. …Cuộc họp ngày mai, chắc tôi cố gắng được rồi. Cảm ơn cậu."' } ] },
          { label: 'Hẹn khách tới sáng mai bộ phận kỹ thuật mới làm việc, mời khách tạm dùng nút bịt tai ở quầy', fx: { pressure: 2, love: -1 }, note: 'Khách sạn Ch4: trì hoãn phàn nàn "nhỏ" tới sáng — với khách, giấc ngủ đêm nay không chờ được tới mai', say: [
            { sp: 'narr', text: 'Đầu dây bên kia im lặng hai giây — hai giây đủ lạnh. "Vậy à. Thế thôi." Sáng hôm sau, bà khách VIP trả phòng sớm với đôi mắt thâm quầng, và phiếu đánh giá dịch vụ của khách sạn nhận điểm trừ đầu tiên sau nhiều tháng, kèm một dòng ghi chú ngắn: "Chuyện nhỏ của khách, hóa ra không phải chuyện nhỏ."' },
            { sp: 'Chị senpai khách sạn', text: 'Chị senpai nói khẽ khi đọc phiếu đánh giá: "Ở quầy lễ tân, không có phàn nàn nào là nhỏ cả — chỉ có phàn nàn được xử lý sớm hay muộn thôi, em ạ."' } ] },
          { label: 'Nói rằng phòng nào điều hòa cũng kêu như vậy, khách thông cảm dùng tạm một đêm', fx: { pressure: 3, love: -1 }, note: 'Khách sạn Ch4: gạt phàn nàn của khách bằng lý do chung chung — omotenashi mất điểm ngay câu đầu tiên', say: [
            { sp: 'narr', text: 'Câu "phòng nào cũng vậy ạ" vừa ra khỏi miệng, {name} đã tự nghe thấy nó sai. Bà khách VIP không nói thêm lời nào, cúp máy. Năm phút sau, chị quản lý nhận được cuộc gọi trực tiếp lên phòng điều hành. Tối đó, chính chị quản lý là người lên phòng khách cùng kỹ thuật — còn {name} đứng ở quầy, học một bài học đắt: câu trả lời qua loa nhất luôn là câu trả lời tốn kém nhất.' } ] }
        ]
      },
      { sp: 'Bà khách VIP', jp: 'あなたの{名前|なまえ}、{覚|おぼ}えたわ。{次|つぎ}に{来|き}た{時|とき}も、あなたに{頼|たの}みたい。', text: 'Trước khi cửa phòng khép lại, bà khách VIP nhìn bảng tên trên ngực áo {name} và nói một câu hiếm hoi: "Tôi nhớ tên cậu rồi đấy. Lần sau tới, tôi lại muốn nhờ cậu."' },
      {
        prompt: 'Khách đã yên giấc. Bước theo dõi cuối cùng của ca đêm nay, {name} chọn làm gì?',
        choice: [
          { label: 'Ghi sở thích của khách vào hồ sơ, và sáng hôm sau chủ động hỏi thăm giấc ngủ của khách', fx: { jp: 2, love: 1 }, note: 'Khách sạn Ch4: khép vòng omotenashi bằng hồ sơ sở thích và lời hỏi thăm sáng hôm sau', say: [
            { sp: 'narr', text: '{name} ghi vào hồ sơ khách từng chi tiết: gối thấp loại mềm, trà hoa cúc buổi tối, phòng yên tĩnh tránh xa thang máy. Sáng hôm sau, khi bà khách xuống ăn sáng, {call} chủ động hỏi một câu: "Đêm qua quý khách ngủ có ngon không ạ?" Bà mỉm cười — nụ cười đầu tiên trong ba lần lưu trú: "Ngon. Nhờ cậu cả đấy."' } ] },
          { label: 'Coi như sự việc đã xong, không ghi chép gì thêm để còn xử lý việc khác', fx: { pressure: 1 }, note: 'Khách sạn Ch4: bỏ qua bước ghi hồ sơ sở thích — lần lưu trú sau mọi thứ lại bắt đầu từ con số không', say: [
            { sp: 'narr', text: 'Ba tháng sau, bà khách VIP quay lại — và ca trực hôm đó là một đồng nghiệp khác, người không hề biết bà cần gối thấp hay trà hoa cúc. Mọi yêu cầu lại phải trình bày lại từ đầu, và bà thở dài: "Lần trước có một cậu nhớ hết cơ mà." Ký ức tốt đẹp mà không được ghi lại thì chỉ sống được trong một ca trực.' } ] }
        ]
      },
      { sp: 'Chị senpai khách sạn', jp: 'おもてなしの{上級|じょうきゅう}は、{大|おお}きなことじゃありません。{小|ちい}さな{声|こえ}を、{小|ちい}さなまま{受|う}け{止|と}めることですよ。', text: 'Chị senpai nói khi hai người cùng nhìn ra vịnh お台場 lên đèn: "Omotenashi ở bậc cao không phải là làm những việc lớn lao đâu. Nó là đón nhận những tiếng nói nhỏ — ngay khi chúng còn nhỏ."' },
      { sp: 'narr', text: 'Cuối ca, {name} lật hồ sơ khách, đọc lại những dòng ghi chép của chính mình. Một chiếc gối thấp, một tách trà hoa cúc, một tấm lọc điều hòa — những thứ nhỏ đến mức không ai đem ra khoe. Nhưng đêm nay {name} hiểu: ở khách sạn này, người ta không được khách khó tính nhớ tên vì những việc lớn. Người ta được nhớ tên vì những việc nhỏ được làm như việc lớn.' }
    ]
  },

  'ind4-khach-san-2': {
    scene: '🔍 Khách sạn お台場 năm thứ hai — khách báo mất đồ và quy trình thất lạc',
    branch: [
      { sp: 'narr', text: 'Chín giờ sáng, giờ trả phòng đông nhất. Một vị khách nam vừa trả phòng 704 cách đây hai mươi phút hớt hải quay lại quầy, mặt tái đi: chiếc đồng hồ đeo tay — kỷ vật của cha anh để lại — không còn trong túi áo nữa. Lần cuối anh nhìn thấy nó là trên bàn đầu giường, tối qua.' },
      { sp: 'Anh khách', jp: '{時計|とけい}が{無|な}いんです。{父|ちち}の{形見|かたみ}なんです。{部屋|へや}の{机|つくえ}に{置|お}いたはずなのに…どうしたらいいですか。', text: 'Anh khách nói gấp, tay lục đi lục lại các túi: "Chiếc đồng hồ của tôi không thấy đâu nữa. Đó là kỷ vật của cha tôi. Tôi nhớ là đã để trên bàn trong phòng mà… Giờ tôi phải làm sao đây?"' },
      { sp: 'hero', jp: 'かしこまりました。まず{落|お}ち{着|つ}いてください。{最後|さいご}にご{覧|らん}になった{場所|ばしょ}と{時間|じかん}を、{私|わたし}に{教|おし}えてください。すぐ{手続|てつづ}きを{始|はじ}めます。', text: '{name} hạ giọng, nói chậm và rõ: "Tôi đã rõ ạ. Trước hết xin quý khách cứ bình tĩnh. Quý khách cho tôi biết lần cuối nhìn thấy đồng hồ là ở đâu, lúc mấy giờ ạ. Tôi sẽ bắt đầu thủ tục tìm kiếm ngay ạ."' },
      {
        prompt: 'Khách báo mất kỷ vật quý trong phòng vừa trả. {name} tổ chức việc tìm kiếm thế nào?',
        choice: [
          { label: 'Theo đúng quy trình: lập biên bản thất lạc, báo chị quản lý, cùng buồng phòng vào kiểm tra phòng trước sự chứng kiến', fx: { jp: 3, pressure: -1 }, note: 'Khách sạn Ch4: tìm đồ thất lạc đúng quy trình — biên bản, quản lý, hai người cùng vào phòng', say: [
            { sp: 'narr', text: '{name} mở sổ thất lạc, ghi từng mục trước mặt khách: đặc điểm đồng hồ, thời điểm cuối cùng nhìn thấy, số phòng. Chị quản lý được báo ngay và có mặt trong hai phút. Ba người — {name}, nhân viên buồng phòng và chị quản lý — cùng vào phòng 704 kiểm tra theo danh mục: gầm giường, sau tủ đầu giường, trong phòng tắm, giữa các lớp khăn.' },
            { sp: 'Chị quản lý', jp: '{見|み}つかりました。{棚|たな}の{後|うし}ろに{落|お}ちています。お{客様|きゃくさま}、{特徴|とくちょう}の{確認|かくにん}をお{願|ねが}いします。', text: 'Chị quản lý cúi xuống sau tủ đầu giường, giơ lên một chiếc đồng hồ dây da nâu: "Tìm thấy rồi. Nó rơi ở phía sau kệ tủ ạ. Xin quý khách xác nhận đặc điểm giúp chúng tôi."' },
            { sp: 'Anh khách', jp: 'これです、{間違|まちが}いありません。{裏|うら}に{父|ちち}の{名前|なまえ}が…ありがとう、{本当|ほんとう}にありがとうございます。', text: 'Anh khách đón chiếc đồng hồ bằng cả hai tay, lật mặt sau lên — giọng nghẹn lại: "Đúng nó rồi, không sai được. Mặt sau có khắc tên cha tôi… Cảm ơn, thật sự cảm ơn mọi người."' } ] },
          { label: 'Tự chạy lên phòng tìm một mình cho nhanh, khách đang vội', fx: { risk: 2, pressure: 1 }, note: 'Khách sạn Ch4: tự vào phòng khách tìm đồ một mình — dù tìm thấy cũng không ai chứng kiến được quá trình', say: [
            { sp: 'narr', text: '{name} chạy lên phòng 704, tìm đúng năm phút thì thấy chiếc đồng hồ sau tủ đầu giường thật. Nhưng khi mang xuống, một câu hỏi khó vang lên ở quầy: "Từ lúc tôi trả phòng tới giờ, có những ai đã vào phòng đó?" — và vì {name} vào phòng một mình không biên bản, không người chứng kiến, câu trả lời nào cũng trở nên yếu ớt.' },
            { sp: 'Chị quản lý', text: 'Chị quản lý nói riêng với {name} sau đó: "Quy trình hai người và biên bản không phải để làm chậm việc tìm đồ. Nó bảo vệ khách, bảo vệ khách sạn — và bảo vệ chính em, người vào căn phòng đó."' } ] },
          { label: 'Bảo khách tự quay lên phòng tìm lại, nhân viên không được vào phòng sau trả phòng', fx: { pressure: 2, love: -1 }, note: 'Khách sạn Ch4: đẩy việc tìm đồ về phía khách đang hoảng loạn', say: [
            { sp: 'narr', text: 'Anh khách đứng sững ở quầy: "Nhưng tôi trả phòng rồi, thẻ phòng cũng nộp rồi, tôi lên bằng cách nào…" Câu nói của anh làm cả sảnh lặng đi. Chị senpai phải bước ra nhận việc ngay lập tức. Với một người đang hoảng vì mất kỷ vật của người cha đã khuất, câu trả lời đúng quy định về mặt chữ nghĩa vẫn có thể là câu trả lời sai hoàn toàn về mặt con người.' } ] }
        ]
      },
      { sp: 'narr', text: 'Chiếc đồng hồ được lau sạch, đặt vào túi vải của khách sạn. Nhưng thủ tục chưa kết thúc ở giây phút tìm thấy — đồ thất lạc chỉ thật sự "về với chủ" khi việc bàn giao được ghi lại rõ ràng: ai tìm thấy, ở đâu, ai nhận lại, và chữ ký xác nhận của khách.' },
      { sp: 'Chị quản lý', jp: '{受|う}け{渡|わた}しの{記録|きろく}を{取|と}ります。お{客様|きゃくさま}、こちらにご{署名|しょめい}をお{願|ねが}いいたします。', text: 'Chị quản lý mở sổ bàn giao: "Chúng ta ghi lại việc bàn giao nhé. Quý khách, xin quý khách ký xác nhận vào đây giúp chúng tôi ạ."' },
      { sp: 'Anh khách', jp: '{署名|しょめい}しました。…あの、{御礼|おれい}に、{少|すこ}しだけでも{受|う}け{取|と}ってください。', text: 'Anh khách ký xong, rồi rút ví ra, ngập ngừng: "Tôi ký rồi ạ. …À, để cảm ơn, xin mọi người nhận một chút này của tôi."' },
      {
        prompt: 'Khách muốn gửi tiền cảm ơn sau khi tìm lại được kỷ vật. {name} đáp thế nào?',
        choice: [
          { label: 'Từ chối khéo bằng keigo chuẩn: đây là bổn phận của khách sạn, mời khách ghi vài dòng vào sổ cảm tưởng', fx: { jp: 2, love: 2 }, note: 'Khách sạn Ch4: từ chối tiền cảm ơn đúng mực — bổn phận của nghề và lời mời ghi sổ cảm tưởng', say: [
            { sp: 'hero', jp: 'お{気持|きも}ちだけ、ありがたく{頂戴|ちょうだい}いたします。これは{私|わたし}どもの{仕事|しごと}でございます。よろしければ、こちらのノートに{一言|ひとこと}いただけますか。', text: '{name} cúi đầu, hai tay khẽ đưa ra từ chối một cách lịch thiệp: "Tấm lòng của quý khách, chúng tôi xin trân trọng nhận. Đây là bổn phận của chúng tôi ạ. Nếu được, xin quý khách để lại vài dòng trong cuốn sổ cảm tưởng này ạ."' },
            { sp: 'narr', text: 'Anh khách cầm bút, viết chậm rãi gần nửa trang. Trong những dòng chữ ấy có cả câu chuyện về người cha và chiếc đồng hồ — và ở cuối trang, một dòng dành riêng cho quầy lễ tân sáng nay.' } ] },
          { label: 'Nhận tiền cảm ơn chia cho cả ca — khách có lòng thì mình cứ nhận', fx: { risk: 1, pressure: 1 }, note: 'Khách sạn Ch4: nhận tiền cảm ơn của khách — việc nhỏ làm mờ ranh giới nghề nghiệp', say: [
            { sp: 'narr', text: 'Số tiền được chia ra trong phòng nghỉ, nhưng niềm vui của nó ngắn hơn dự kiến: cuối ca, chị quản lý gọi {name} lại. Khách sạn có quy định rõ về tiền cảm ơn, và quan trọng hơn — một vị khách khác đứng gần đó đã nhìn thấy cảnh nhận tiền ở quầy. "Uy tín của quầy lễ tân được xây bằng năm tháng, và có thể bị xước chỉ trong một cái gật đầu."' } ] }
        ]
      },
      { sp: 'narr', text: 'Một tuần sau, một phong bì thư tay được gửi tới khách sạn. Chị quản lý đọc xong, không cất vào hồ sơ ngay mà đưa cho {name} đọc trước — vì trong thư, có một đoạn nhắc đích danh người nhân viên đã bình tĩnh mở cuốn sổ thất lạc trong buổi sáng hôm đó.' },
      { sp: 'Chị senpai khách sạn', jp: 'この{手紙|てがみ}、フロントの{宝物|たからもの}ですね。{来年|らいねん}の{新人|しんじん}にも、{読|よ}ませてあげたいです。', text: 'Chị senpai mỉm cười: "Lá thư này là báu vật của quầy lễ tân đấy. Sang năm có người mới vào, chị cũng muốn cho các em ấy đọc nó."' },
      { sp: 'narr', text: '{name} gấp lá thư lại, cất vào hồ sơ thất lạc của tháng — nơi nó sẽ nằm cạnh bản biên bản khô khan ghi giờ giấc và chữ ký. Hai thứ giấy tờ của cùng một buổi sáng: một thứ chứng minh quy trình đã đúng, một thứ chứng minh con người đã được chạm tới. Nghề lễ tân, hóa ra, cần cả hai.' }
    ]
  },

  /* ================= THỰC PHẨM CHƯƠNG 4 — năm thứ hai ================= */
  'ind4-shokuhin-1': {
    scene: '🌡️ Nhà máy thực phẩm 大阪 năm thứ hai — ca đêm học khâu 検品 và chiếc chìa khóa tủ lạnh',
    branch: [
      { sp: 'narr', text: 'Ca đêm ở nhà máy thực phẩm 大阪, năm thứ hai. Tối nay chị trưởng ca không xếp {name} vào vị trí đứng chuyền quen thuộc nữa — chị dẫn {call} tới góc kiểm tra ở cuối xưởng, nơi có chiếc bàn thép, cây bút đỏ, và một cuốn sổ dày đã ngả màu: sổ 検品 — kiểm tra chất lượng.' },
      { sp: 'Chị trưởng ca', jp: '{今夜|こんや}は{検品|けんぴん}を{覚|おぼ}えてください。{見|み}るのは{三|みっ}つ。ラベル、{賞味期限|しょうみきげん}、それから{冷蔵庫|れいぞうこ}の{温度|おんど}です。', text: 'Chị trưởng ca chỉ từng mục trên sổ: "Đêm nay em học khâu 検品 nhé. Có ba thứ phải nhìn: nhãn, hạn sử dụng, và nhiệt độ tủ lạnh."' },
      { sp: 'hero', jp: 'ラベルは{商品名|しょうひんめい}と{内容量|ないようりょう}、{期限|きげん}は{年月日|ねんがっぴ}まで、ですね。{一|ひと}つずつ{声|こえ}に{出|だ}して{確認|かくにん}します。', text: '{name} nhắc lại để xác nhận: "Nhãn thì xem tên sản phẩm và khối lượng tịnh, hạn dùng thì xem tới ngày tháng năm — đúng không ạ. Em sẽ đọc thành tiếng để xác nhận từng mục ạ."' },
      { sp: 'Anh công nhân', jp: '{温度|おんど}はな、{冷蔵庫|れいぞうこ}の{表示|ひょうじ}だけじゃなくて、{中|なか}の{温度計|おんどけい}でも{見|み}るんだ。{二|ふた}つ{合|あ}ってたら、{記録|きろく}に{書|か}く。それが{検品|けんぴん}の{基本|きほん}だよ。', text: 'Anh công nhân chỉ vào trong tủ: "Nhiệt độ ấy, không chỉ nhìn bảng hiển thị của tủ đâu, phải nhìn cả nhiệt kế đặt bên trong nữa. Hai con số khớp nhau thì mới ghi vào sổ. Đó là căn bản của 検品 đấy."' },
      {
        prompt: 'Mẫu kiểm tra đầu tiên: bảng hiển thị của tủ ghi 4 độ, nhưng nhiệt kế bên trong chỉ gần 6 độ — cao hơn mức chuẩn một chút. {name} xử lý sao?',
        choice: [
          { label: 'Ghi đúng cả hai con số vào sổ và báo ngay cho chị trưởng ca để kiểm tra tủ', fx: { jp: 2, pressure: -1 }, note: 'Thực phẩm Ch4: ghi đúng số đo chênh lệch và báo ngay — sổ 検品 chỉ có giá trị khi nó nói thật', say: [
            { sp: 'narr', text: '{name} ghi vào sổ cả hai con số, khoanh tròn phần chênh lệch rồi báo ngay. Chị trưởng ca tới kiểm tra: cửa tủ bị một khay hàng kê chưa khít, hơi lạnh thoát ra từ lúc đầu ca. Khay hàng được xếp lại, cửa đóng kín, hai mươi phút sau nhiệt độ hai bên đã khớp nhau. "Thấy chưa," chị nói, "một con số ghi thật đã cứu cả tủ hàng."' } ] },
          { label: 'Ghi theo số trên bảng hiển thị cho khớp sổ — chênh một hai độ chắc không sao', fx: { risk: 2, pressure: 2 }, note: 'Thực phẩm Ch4: ghi số đẹp thay vì số thật vào sổ 検品 — hồ sơ sạch mà hàng thì không an toàn', say: [
            { sp: 'narr', text: 'Con số 4 độ tròn trịa nằm ngay ngắn trong sổ. Nhưng đến vòng kiểm tra giữa ca, chị trưởng ca tự tay mở tủ, nhìn nhiệt kế bên trong — và dừng lại rất lâu ở trang sổ của {name}. "Sổ ghi 4 độ mà tủ là 6 độ. Em biết điều đáng sợ nhất trong an toàn thực phẩm là gì không? Là những cuốn sổ lúc nào cũng đẹp."' } ] }
        ]
      },
      { sp: 'narr', text: 'Nửa đêm, {name} đi hết một vòng 検品 đầu tiên trong đời: bốn mươi khay hàng, từng nhãn một, từng hạn dùng một. Hai sản phẩm bị mờ nhãn được giữ lại đúng quy trình. Khi quay lại bàn kiểm tra, chị trưởng ca đang đứng đợi — trong tay chị là một chiếc chìa khóa nhỏ màu bạc.' },
      { sp: 'Chị trưởng ca', jp: 'この{冷蔵庫|れいぞうこ}の{鍵|かぎ}、{今夜|こんや}からあなたに{預|あず}けます。{開|あ}けたら{必|かなら}ず{鍵|かぎ}をかけ、{温度|おんど}を{記録|きろく}してください。', text: 'Chị trưởng ca đặt chiếc chìa khóa vào tay {name}: "Chìa khóa tủ lạnh này, từ đêm nay chị giao cho em giữ. Mở tủ ra thì nhất định phải khóa lại, và ghi lại nhiệt độ nhé."' },
      {
        prompt: 'Chiếc chìa khóa tủ lạnh — biểu tượng của niềm tin nghề nghiệp ở nhà máy này — đang nằm trong tay {name}. {call} đáp lại thế nào?',
        choice: [
          { label: 'Nhận chìa khóa, xác nhận lại rõ ràng quy trình khóa tủ và ghi sổ trước mặt chị trưởng ca', fx: { jp: 2, love: 1 }, note: 'Thực phẩm Ch4: nhận chìa khóa niềm tin kèm việc xác nhận lại toàn bộ quy trình giữ khóa', say: [
            { sp: 'hero', jp: 'ありがとうございます。{鍵|かぎ}は{必|かなら}ず{身|み}に{付|つ}けて{持|も}ち、{人|ひと}には{貸|か}しません。{開閉|かいへい}のたびに、{時刻|じこく}と{温度|おんど}を{記録|きろく}します。', text: '{name} nhận chìa khóa bằng hai tay, xác nhận lại từng ý: "Em cảm ơn chị đã tin tưởng. Chìa khóa em sẽ luôn mang theo người, không cho ai mượn. Mỗi lần mở và đóng tủ, em sẽ ghi lại giờ giấc và nhiệt độ ạ."' },
            { sp: 'narr', text: 'Chị trưởng ca gật đầu, ghi tên {name} vào danh sách người giữ khóa dán trên cửa kho — danh sách chỉ có bốn cái tên trong cả nhà máy. Anh công nhân đi ngang, huýt sáo một tiếng dài: "Lên người giữ khóa rồi cơ đấy."' } ] },
          { label: 'Ngập ngừng từ chối — sợ giữ chìa khóa thì phải gánh trách nhiệm nếu tủ có chuyện', fx: { pressure: 1 }, note: 'Thực phẩm Ch4: từ chối chìa khóa vì sợ trách nhiệm — niềm tin được trao mà không dám nhận', say: [
            { sp: 'narr', text: '{name} ngập ngừng nói mình muốn học thêm một thời gian nữa. Chị trưởng ca không ép, cất chìa khóa lại, chỉ nói một câu nhẹ nhàng: "Trách nhiệm thì đúng là nặng thật. Nhưng này — người ta chỉ trao chìa khóa cho người mà người ta tin là sẽ gánh được nó thôi." Suốt phần ca còn lại, câu nói đó cứ quay lại trong đầu {name}.' } ] }
        ]
      },
      { sp: 'Anh công nhân', jp: '{鍵|かぎ}を{持|も}つってことはさ、この{工場|こうじょう}の{冷蔵庫|れいぞうこ}を{任|まか}されたってことだよ。{大|おお}きいことだぜ。', text: 'Anh công nhân vừa xếp khay vừa nói: "Giữ chìa khóa nghĩa là được giao cả hệ thống tủ lạnh của nhà máy này đấy. Việc lớn đấy nhé."' },
      { sp: 'hero', jp: '{今夜|こんや}の{検品|けんぴん}、{全部|ぜんぶ}{終|お}わりました。{記録|きろく}も、{漏|も}れは{一|ひと}つもありません。', text: 'Cuối ca, {name} báo cáo dứt khoát: "Phần 検品 đêm nay em đã hoàn thành toàn bộ ạ. Sổ ghi chép cũng không thiếu một mục nào ạ."' },
      { sp: 'narr', text: 'Trời sáng dần phía ngoài cổng nhà máy 大阪. {name} tra chìa khóa vào ổ, khóa cánh tủ cuối cùng của ca, nghe tiếng "cách" nhỏ vang lên trong xưởng lạnh. Một tiếng khóa rất khẽ — mà trong lòng {call}, nó vang như một lời tuyên thệ: từ đêm nay, sự an toàn của những tủ hàng này có một phần nằm trong tay mình.' }
    ]
  },

  'ind4-shokuhin-2': {
    scene: '🏷️ Nhà máy thực phẩm 大阪 năm thứ hai — lô hàng sai nhãn hạn dùng và quyết định dừng chuyền',
    branch: [
      { sp: 'narr', text: 'Một ca đêm khác ở 大阪, không lâu sau ngày {name} nhận chìa khóa tủ lạnh. Đêm nay {call} ngồi ở vị trí 検品 cuối chuyền — vị trí của người cuối cùng nhìn thấy sản phẩm trước khi nó rời nhà máy. Đầu ca, xưởng chạy một lô hàng mới: trên chuyền là những hộp thành phẩm vừa đóng gói, chờ dán nhãn hạn dùng.' },
      { sp: 'Anh công nhân', text: 'Anh công nhân ở đầu chuyền gọi với sang, giọng giục giã: "Đêm nay chỉ tiêu cao đấy, lô này phải xong trước bốn giờ để kịp xe tải sáng. 検品 nhanh tay lên nhé, đừng để chuyền phải chờ!" Cả xưởng đang chạy theo con số — và áp lực giờ giấc treo lơ lửng trên từng khay hàng.' },
      { sp: 'hero', jp: 'ロット{番号|ばんごう}と、ラベルの{期限|きげん}を{照|て}らし{合|あ}わせます。…あれ、{生産日|せいさんび}から{計算|けいさん}すると、{期限|きげん}が{一|ひと}つ{月|き}も{長|なが}くなっています。', text: '{name} làm đúng thao tác đã học: đối chiếu mã lô với hạn dùng trên nhãn — rồi khựng lại. "{name} tự nhẩm tính từ ngày sản xuất: …Ơ, tính từ ngày sản xuất thì hạn dùng trên nhãn đang dài hơn đúng chuẩn tới cả một tháng."' },
      { sp: 'narr', text: 'Nhìn kỹ cuộn nhãn đang chạy trên máy dán: cả cuộn nhãn này được in sẵn với hạn dùng lùi xa hơn thực tế một tháng. Nghĩa là từng hộp hàng dán nhãn từ cuộn này sẽ mang một hạn dùng "đẹp" hơn sự thật — và người ăn phải hộp hàng ở tháng cuối cùng của cái hạn giả đó sẽ ăn một sản phẩm đã quá hạn thật từ lâu. Gần hai trăm hộp đã được đóng thùng ở đầu chuyền bên kia.' },
      {
        prompt: 'Cả một lô hàng đang mang nhãn hạn dùng sai, chỉ tiêu thì đang giục. Ở vị trí 検品, {name} quyết định thế nào?',
        choice: [
          { label: 'Bấm dừng dây chuyền ngay và báo chị trưởng ca — dù biết ca đêm nay sẽ trễ chỉ tiêu', fx: { jp: 3, pressure: 1 }, note: 'Thực phẩm Ch4: dừng chuyền vì lô hàng sai nhãn hạn dùng — chậm chỉ tiêu một đêm để chặn một sự cố an toàn thực phẩm lớn', say: [
            { sp: 'hero', jp: 'ラインを{止|と}めます！{長|ちょう}、ラベルの{期限|きげん}がロットと{合|あ}っていません。{今|いま}のロット、{全部|ぜんぶ}{確認|かくにん}が{必要|ひつよう}です！', text: '{name} bấm nút dừng chuyền, gọi lớn về phía đầu ca: "Em dừng chuyền ạ! Chị trưởng ca, hạn dùng trên nhãn không khớp với mã lô. Toàn bộ lô hàng hiện tại cần được kiểm tra lại ạ!" Tiếng máy dừng lại — và trong xưởng bỗng im lặng, mọi ánh mắt đổ dồn về bàn 検品.' },
            { sp: 'narr', text: 'Chị trưởng ca chạy tới, cầm hộp hàng lên đối chiếu mã lô, sắc mặt thay đổi ngay. Lệnh được đưa ra trong vòng một phút: giữ lại toàn bộ lô, tháo các thùng đã đóng để kiểm kê, thay cuộn nhãn đúng. Chỉ tiêu đêm nay chắc chắn không đạt — nhưng hai trăm hộp hàng mang hạn dùng giả sẽ không rời khỏi cổng nhà máy này.' },
            { sp: 'Chị trưởng ca', jp: '{止|と}めて、{正解|せいかい}です。{数字|すうじ}の{遅|おく}れは{明日|あした}{取|と}り{返|かえ}せます。でも、{出|で}てしまった{商品|しょうひん}は{取|と}り{返|かえ}せません。', text: 'Chị trưởng ca nói rõ từng chữ: "Dừng chuyền là quyết định đúng. Con số bị chậm thì mai lấy lại được. Nhưng sản phẩm đã xuất ra ngoài rồi thì không lấy lại được đâu."' } ] },
          { label: 'Đợi chạy hết lô này rồi mới báo — dừng chuyền giữa ca sẽ làm cả xưởng trễ nặng', fx: { risk: 3, pressure: 2 }, note: 'Thực phẩm Ch4: để lô sai nhãn chạy hết mới báo — phạm vi sự cố nhân lên theo từng phút chần chừ', say: [
            { sp: 'narr', text: 'Thêm bốn mươi phút chần chừ là thêm gần ba trăm hộp nữa được dán nhãn sai và đóng thùng, một phần đã được chất lên xe tải chờ ở sân. Khi chị trưởng ca nhận được báo cáo, việc truy hồi không còn là "kiểm tra lại một lô" nữa — nó là một chiến dịch tháo dỡ cả xe hàng trong đêm, với nguy cơ chỉ một thùng sót lại cũng thành sự cố ngoài thị trường.' },
            { sp: 'Chị trưởng ca', jp: '{見|み}つけた{瞬間|しゅんかん}が、{被害|ひがい}の{大|おお}きさが{決|き}まる{瞬間|しゅんかん}です。{遅|おく}れるほど、{止|と}めるのが{大変|たいへん}になりますよ。', text: 'Chị trưởng ca nói trong lúc cả xưởng tháo dỡ thùng hàng: "Khoảnh khắc phát hiện ra chính là khoảnh khắc quyết định quy mô thiệt hại đấy. Báo càng chậm, việc dừng lại càng khó khăn hơn."' } ] },
          { label: 'Tự dán đè nhãn đúng lên những hộp mình nhìn thấy, không làm phiền ai', fx: { risk: 2, pressure: 2 }, note: 'Thực phẩm Ch4: tự sửa nhãn tại chỗ không báo cáo — sai sót hệ thống vẫn còn nguyên trên cả cuộn nhãn', say: [
            { sp: 'narr', text: '{name} dán đè được mười mấy hộp thì đuối — vì máy dán ở đầu chuyền vẫn đang đều đều cho ra những hộp mới mang nhãn sai, nhanh hơn bất kỳ đôi tay sửa lẻ nào. Đến khi anh công nhân phát hiện ra những miếng dán đè không đúng quy cách, cả lô hàng đã lẫn lộn không còn phân biệt được hộp nào đã sửa, hộp nào chưa.' },
            { sp: 'Anh công nhân', jp: '{一人|ひとり}で{直|なお}せる{量|りょう}じゃないだろ、これは。こういうのは{止|と}めて、{呼|よ}ぶ。それが{順番|じゅんばん}だよ。', text: 'Anh công nhân lắc đầu: "Cái lượng này một mình sửa sao nổi. Gặp chuyện thế này là phải dừng chuyền rồi gọi người. Đó mới đúng thứ tự việc đấy."' } ] }
        ]
      },
      { sp: 'Chị trưởng ca', jp: '{対象|たいしょう}の{範囲|はんい}を{教|おし}えてください。{確認|かくにん}{済|ず}みの{箱|はこ}と、まだの{箱|はこ}、{分|わ}けて{答|こた}えてください。', text: 'Khi chuyền đã dừng hẳn, chị trưởng ca cầm sổ 検品 của {name} lên và hỏi rành mạch: "Cho chị biết phạm vi liên quan đi. Những thùng đã kiểm tra xong và những thùng chưa kiểm tra — trả lời tách bạch ra nhé."' },
      {
        prompt: 'Chị trưởng ca hỏi phạm vi lô hàng sai nhãn. Sổ 検品 của {name} là căn cứ duy nhất lúc này:',
        choice: [
          { label: 'Báo cáo tách bạch: số thùng đã kiểm và xác nhận, số thùng chưa kiểm — phần chưa chắc nói rõ là chưa chắc', fx: { jp: 2, pressure: -1 }, note: 'Thực phẩm Ch4: báo cáo phạm vi sự cố tách bạch chắc chắn và chưa chắc — truy vết lô hàng trong vài phút', say: [
            { sp: 'narr', text: '{name} giở sổ, báo cáo từng con số: cuộn nhãn sai được lắp từ đầu ca, tổng số thùng đã đóng, số thùng đã qua tay {call} kiểm tra và đánh dấu, số còn lại chưa kiểm — nói rõ rành mạch phần nào là chắc chắn, phần nào cần kiểm lại. Nhờ cuốn sổ đó, cả xưởng khoanh vùng được toàn bộ lô hàng liên quan chỉ trong mười phút.' },
            { sp: 'Chị trưởng ca', jp: 'その{記録|きろく}があれば、{全部|ぜんぶ}を{追|お}えます。{検品|けんぴん}の{力|ちから}は、ここですね。', text: 'Chị trưởng ca gõ nhẹ lên cuốn sổ: "Có cuốn sổ ghi chép này thì mình truy vết được toàn bộ. Sức mạnh của khâu 検品 nằm ở đây đấy."' } ] },
          { label: 'Trả lời ước chừng "chắc khoảng một trăm thùng thôi" để trưởng ca yên tâm', fx: { pressure: 2, risk: 1 }, note: 'Thực phẩm Ch4: ước chừng phạm vi sự cố an toàn thực phẩm bằng cảm tính', say: [
            { sp: 'narr', text: 'Chị trưởng ca dừng bút, nhìn thẳng: ""Khoảng" là không phải con số chị cần lúc này." Cả đội phải mất thêm gần một giờ mở từng thùng kiểm đếm lại từ đầu — một giờ mà cuốn sổ 検品 lẽ ra đã tiết kiệm được, nếu những con số trong đó được dùng đúng lúc.' } ] }
        ]
      },
      { sp: 'Chị trưởng ca', jp: '{今夜|こんや}の{判断|はんだん}は、{工場長|こうじょうちょう}にも{報告|ほうこく}します。{目標|もくひょう}より、{安全|あんぜん}を{選|えら}んだ{判断|はんだん}としてです。', text: 'Khi lô hàng sai nhãn đã được cách ly toàn bộ và dán nhãn đỏ, chị trưởng ca nói: "Quyết định đêm nay, chị sẽ báo cáo lên cả giám đốc nhà máy. Báo cáo như một quyết định đã chọn an toàn thay vì chỉ tiêu."' },
      { sp: 'Anh công nhân', text: 'Anh công nhân — người đầu ca còn giục {name} làm nhanh — ngồi xuống cạnh bàn 検品 lúc gần sáng, nói thật lòng: "Lúc chuyền dừng, anh cũng xót chỉ tiêu lắm. Nhưng nghĩ tới hộp hàng này mà vào tay đứa nhỏ nào đó ở tháng cuối của cái hạn giả kia… Thôi, chậm một đêm. Chậm một đêm là còn rẻ chán."' },
      { sp: 'narr', text: 'Xe tải sáng rời nhà máy muộn hơn thường lệ, chở theo một lô hàng khác — lô hàng đúng nhãn, đúng hạn, đã qua đôi mắt của người 検品 ở cuối chuyền. {name} khóa tủ, ký tên vào trang sổ cuối cùng của ca và ghi thêm một dòng: "Chỉ tiêu là con số của một đêm. An toàn là con số của cả đời người ăn. Đêm nay mình đã chọn đúng con số."' }
    ]
  }
  });
})();
