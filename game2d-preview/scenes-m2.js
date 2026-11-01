// scenes-m2.js — CHƯƠNG 5 «LỚN RỒI» (Pha 3), lane M2:
// 10 cảnh ĐỐI GƯƠNG (c5-succ-<ngành>-2): hậu bối mới phạm đúng kiểu lỗi hero
// từng được dạy sửa ở buổi làm ĐẦU TIÊN của ngành (chuỗi ind-<ngành>-1),
// hero chọn cách dạy tử tế thay vì mắng như mình từng suýt bị mắng.
// 10 cảnh TỔNG KẾT NĂM (c5-succ-<ngành>-3): người phụ trách khen đúng thành
// tích trước cả đội + tiền thưởng + tin bảo lãnh nâng visa.
// Người phụ trách/địa điểm dùng lại đúng chuỗi cũ: kaigo chị Mai (cụ Haru) ·
// nhà hàng bếp trưởng Sato (Toyosu) · genba sếp công trường + anh thợ cả
// (横浜) · khách sạn chị senpai + chị quản lý (お台場) · thực phẩm chị trưởng
// ca (大阪) · cơ khí senpai Kudo + sếp xưởng (名古屋) · sửa xe chủ xưởng
// (豊田) · kho anh trưởng kho + chị nhân viên kho (千葉) · nông nghiệp bác +
// bà chủ trại (富良野) · du học thầy Khánh.
// Thể ngữ §8: hero với hậu bối nói teinei chừng mực của senpai tử tế; với
// người phụ trách/khách dùng kính ngữ đúng vai. KHÔNG dùng cờ saga nào.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= KAIGO — ĐỐI GƯƠNG: TRANG ================= */
  'c5-succ-kaigo-2': {
    scene: '🪞 Kaigo năm thứ ba — đối gương: Trang và bài học ngang tầm mắt',
    branch: [
      { sp: 'narr', text: 'Sáng nay viện đón một kouhai người Việt mới sang chưa đầy tháng: Trang, mười chín tuổi, tay ôm cuốn sổ ghi chép còn mới tinh. Chị Mai gọi {name} lại, giao việc bằng một câu ngắn: "Tháng đầu của Trang, em dìu nhé — như ngày xưa chị dìu em vậy."' },
      { sp: 'Chị Mai', jp: '{今日|きょう}から、チャンさんの{指導|しどう}を{任|まか}せます。{最初|さいしょ}は{挨拶|あいさつ}と{食事|しょくじ}の{介助|かいじょ}から、あなたの{言葉|ことば}で{教|おし}えてあげてください。', text: '"Từ hôm nay, chị giao việc hướng dẫn Trang cho em. Trước hết là cách chào hỏi và hỗ trợ bữa ăn — em dạy lại cho em ấy bằng lời của chính em nhé."' },
      { sp: 'Trang', jp: 'はじめまして、チャンと{申|もう}します。よろしくお{願|ねが}いいたします。…{緊張|きんちょう}して、{手|て}が{震|ふる}えてしまいます。', text: '"Em chào senpai ạ, em là Trang. Mong senpai chỉ bảo cho em. …Em hồi hộp quá, tay cứ run lên ạ."' },
      { sp: 'hero', jp: '{大丈夫|だいじょうぶ}ですよ。{私|わたし}も{最初|さいしょ}は{同|おな}じでした。まずハルさんへの{挨拶|あいさつ}を、{一緒|いっしょ}にやってみましょう。', text: '"Không sao đâu. Ngày đầu anh/chị cũng y như em vậy. Trước hết mình cùng chào cụ Haru nhé."' },
      { sp: 'narr', text: 'Nhưng ngay bữa trưa đầu tiên, {name} khựng lại: Trang đứng thẳng người từ trên cao nói vọng xuống cụ Haru, giọng nhanh và dồn dập, rồi xúc cháo đưa liên tiếp, miệng giục khẽ: "Cụ ăn nhanh lên ạ, sắp hết giờ rồi." Cụ Haru quay mặt đi, miếng cháo nghẹn ở cổ họng. Đúng hình ảnh của một người mới chưa ai dạy cho bài học đầu tiên của nghề này: ngang tầm mắt, chậm rãi, theo nhịp của cụ.' },
      { sp: 'Cụ Haru', jp: 'あんた、{早口|はやくち}だねえ。おばあちゃんは、そんなに{急|いそ}げないよ。', text: 'Cụ Haru phẩy tay, giọng mệt: "Cháu nói nhanh quá. Bà già rồi, vội thế không được đâu."' },
      { sp: 'Trang', text: '"Em… em xin lỗi cụ ạ." Trang đỏ bừng mặt, tay cầm thìa run lên. "Em sợ để cụ chờ lâu thì bị chê là chậm…"' },
      { sp: 'narr', text: 'Một câu mắng đã lên tới miệng {name} — câu mắng gần giống hệt điều mình từng nơm nớp sợ nghe ngày mới vào viện. Nhưng rồi {call} nhớ lại buổi sáng đầu tiên của chính mình: chị Mai đã không mắng, chị chỉ ngồi xuống, làm mẫu, và nói "tốc độ ăn là nhịp của từng người, giục giã là điều cấm kỵ nhất". {name} hít một hơi, hạ giọng xuống.' },
      {
        prompt: 'Trang vừa phạm đúng lỗi ngày đầu của nghề: đứng trên cao, nói nhanh, giục cụ ăn. {name} dạy em ấy thế nào?',
        choice: [
          { label: 'Mắng ngay tại chỗ như mình từng sợ bị mắng: "Làm thế cụ nghẹn thì sao!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương kaigo: mắng hậu bối trước mặt cụ — Trang nhớ bằng nỗi sợ', say: [
            { sp: 'narr', text: 'Giọng {name} bật ra to hơn ý định. Trang cúi gằm, nước mắt lưng tròng, thìa trên tay càng run. Cụ Haru thở dài, đẩy khay cháo ra xa hơn. Bữa trưa hôm đó kết thúc trong im lặng — và tối về, Trang ghi sổ đúng từng chữ, nhưng ghi xong còn lén kiểm tra lại ba lần vì sợ.' },
            { sp: 'Chị Mai', text: 'Cuối ca, chị Mai kéo {name} ra hành lang: "Người mới sai thì sửa, không phải mắng. Em còn nhớ ngày đầu của chính mình không? Lúc đó có ai mắng em đâu."' } ] },
          { label: 'Ngồi xuống cạnh Trang, bình tĩnh chỉ tận tay: làm mẫu lại từ đầu, chậm rãi', fx: { love: 2, jp: 2 }, note: 'Đối gương kaigo: dạy tận tay như chị Mai từng dạy mình — Trang nhớ bằng sự hiểu', say: [
            { sp: 'hero', jp: 'チャンさん、まず{椅子|いす}に{座|すわ}って、ハルさんと{目線|めせん}を{合|あ}わせましょう。{食|た}べる{速|はや}さは、ハルさんのペースです。{急|いそ}がせるのが、この{仕事|しごと}で{一番|いちばん}いけないことですよ。', text: '{name} kéo ghế ngồi xuống cạnh Trang, ngang tầm mắt cụ Haru: "Trang này, trước hết ngồi xuống, nhìn ngang tầm mắt cụ nhé. Tốc độ ăn là theo nhịp của cụ. Giục giã là điều cấm kỵ nhất trong nghề này đấy."' },
            { sp: 'Trang', text: '"…Dạ. Em hiểu rồi ạ." Trang ngồi xuống, hít một hơi thật chậm. Lần này em nhìn thẳng vào mắt cụ Haru, mỉm cười, và chờ cụ nuốt xong miếng trước mới xúc miếng sau.' } ] }
        ]
      },
      { sp: 'hero', jp: 'ハルさん、{失礼|しつれい}しました。{一口|ひとくち}ずつでいいですよ。{熱|あつ}いので、ふうふうしてから{食|た}べてくださいね。', text: '{name} làm mẫu một lần trọn vẹn cho Trang xem: "Cụ Haru, cháu xin lỗi cụ ạ. Cứ từng miếng một thôi ạ. Cháo còn nóng, cụ thổi nguội rồi hẵng ăn nhé."' },
      { sp: 'Cụ Haru', jp: 'そうそう、その{調子|ちょうし}。あんたが{教|おし}えると、{若|わか}い{子|こ}もすぐ{優|やさ}しくなるねえ。', text: 'Cụ Haru gật gù, ăn hết miếng cháo: "Đúng rồi, cứ thế. Cháu dạy thì đứa trẻ nào cũng sớm dịu dàng thôi."' },
      {
        prompt: 'Trước bữa ăn, còn một câu kaiwa quan trọng {name} muốn Trang nói được với cụ. Dạy em ấy câu nào?',
        choice: [
          { label: 'Câu mời nước trước bữa ăn: "Trước bữa ăn, cụ uống một chút nước nhé?"', fx: { jp: 2, love: 1 }, note: 'Đối gương kaigo: Trang học được câu mời nước làm ẩm họng trước bữa ăn', say: [
            { sp: 'Trang', jp: 'ハルさん、{食事|しょくじ}の{前|まえ}に、お{水|みず}を{少|すこ}し{飲|の}みませんか。{喉|のど}が{潤|うるお}うと、{食|た}べやすくなりますよ。', text: 'Trang nói chậm rãi, rõ từng chữ: "Cụ Haru, trước bữa ăn, cụ uống một chút nước nhé ạ? Cổ họng ẩm thì ăn sẽ dễ hơn ạ."' },
            { sp: 'Cụ Haru', jp: 'おお、{気|き}が{利|き}くねえ。じゃあ{少|すこ}しもらおうか。', text: 'Cụ Haru cười móm mém: "Ồ, chu đáo đấy. Vậy cho bà một chút nào."' } ] },
          { label: 'Câu hỏi sức khỏe buổi sáng: "Sáng nay sức khỏe của cụ thế nào ạ?"', fx: { jp: 1, love: 1 }, note: 'Đối gương kaigo: Trang học câu hỏi thăm thể trạng — câu đầu tiên hero từng nói với cụ Haru', say: [
            { sp: 'Trang', jp: 'ハルさん、{今朝|けさ}の{体調|たいちょう}はいかがですか。{痛|いた}いところはありませんか。', text: 'Trang hỏi khẽ, mắt nhìn cụ chăm chú: "Cụ Haru, sáng nay sức khỏe của cụ thế nào ạ? Có chỗ nào đau không ạ?"' },
            { sp: 'narr', text: 'Nghe Trang nói câu ấy, {name} chợt thấy sống mũi cay cay: đó chính là câu đầu tiên mình từng run run nói với cụ Haru ba năm trước — vụng về y như thế, và chân thành y như thế.' } ] }
        ]
      },
      { sp: 'Trang', jp: '{今日|きょう}はありがとうございました。{先輩|せんぱい}みたいに、ゆっくりできるように{頑張|がんば}ります。', text: 'Cuối ca, Trang cúi đầu cảm ơn: "Hôm nay em cảm ơn senpai ạ. Em sẽ cố gắng làm được chậm rãi, từ tốn như senpai ạ."' },
      { sp: 'Chị Mai', jp: '{教|おし}える{側|がわ}になりましたね。{手|て}を{出|だ}したくなる{時|とき}ほど、{言葉|ことば}で{伝|つた}える。それができていましたよ。', text: 'Chị Mai đi ngang, nói một câu mà {name} nghe quen đến lạ: "Em đã thành người đi dạy rồi đấy. Càng lúc muốn làm hộ, càng phải truyền đạt bằng lời. Hôm nay em làm được điều đó rồi."' },
      { sp: 'narr', text: 'Trên đường về, {name} nghĩ về buổi sáng đầu tiên của mình ở viện này: một người mới run tay, và một senpai đã chọn ngồi xuống thay vì mắng. Hôm nay, vòng tròn ấy vừa khép lại một vòng — và mở ra một vòng mới, bắt đầu bằng một cô bé tên Trang và một thìa cháo được xúc chậm rãi.' }
    ]
  },

  /* ================= KAIGO — TỔNG KẾT NĂM ================= */
  'c5-succ-kaigo-3': {
    scene: '🏆 Kaigo — tổng kết năm: lời khen trước cả đội và tin bảo lãnh',
    branch: [
      { sp: 'narr', text: 'Buổi họp tổng kết cuối năm của viện dưỡng lão. Cả đội ngồi đủ trong phòng sinh hoạt, bảng trắng phía trước ghi dòng chữ "今年一年、ありがとうございました". Chị Mai đứng dậy, cầm theo một tập hồ sơ mỏng và một phong bì trắng.' },
      { sp: 'Chị Mai', jp: '{最後|さいご}に、{今年|いちねん}の{表彰|ひょうしょう}です。{皆|みな}さんの{前|まえ}で、{一人|ひとり}だけ、{名前|なまえ}を{呼|よ}ばせてください。', text: 'Chị Mai nhìn khắp phòng: "Cuối cùng là phần khen thưởng của năm nay. Trước mặt mọi người, cho phép tôi gọi tên một người."' },
      { sp: 'Chị Mai', jp: 'あの{難|むずか}しいと{言|い}われた{利用者|りようしゃ}さんのケアプラン、{家族|かぞく}から{感謝|かんしゃ}の{手紙|てがみ}が{届|とど}きました。{担当|たんとう}したのは、この{人|ひと}です。{本当|ほんとう}によくやってくれました。', text: '"Bản kế hoạch chăm sóc cho cụ bà mà ai cũng nói là khó tính ấy — gia đình cụ đã gửi thư cảm ơn tới viện. Người phụ trách chính là người này. Em ấy đã làm thật sự rất tốt."' },
      { sp: 'Cụ Haru', jp: 'あんたのケアプランは、{家族|かぞく}の{心|こころ}まで{届|とど}いたんだねえ。{誇|ほこ}らしいよ。', text: 'Cụ Haru ngồi xe lăn ở hàng ghế đầu, chống gậy nói vọng lên: "Kế hoạch chăm sóc của cháu chạm được tới cả trái tim gia đình cụ ấy đấy. Đáng tự hào lắm."' },
      { sp: 'hero', jp: '{皆|みな}さんに{支|ささ}えていただいたおかげです。{一人|ひとり}では、とてもできませんでした。ありがとうございます。', text: '"Đó là nhờ mọi người đã nâng đỡ em ạ. Một mình em thì không thể nào làm được. Em cảm ơn mọi người ạ."' },
      { sp: 'Chị Mai', jp: 'では、{今年|ことし}の{賞与|しょうよ}です。{少|すこ}しですが、{施設|しせつ}からの{気持|きも}ちです。{受|う}け{取|と}ってください。', text: 'Chị Mai trao phong bì bằng hai tay: "Đây là tiền thưởng của năm nay. Không nhiều, nhưng là tấm lòng của viện. Em nhận nhé."' },
      {
        prompt: 'Nhận phong bì thưởng trước cả đội, {name} đáp thế nào?',
        choice: [
          { label: 'Cúi đầu nhận bằng hai tay, cảm ơn khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。これからも、{信頼|しんらい}に{応|こた}えられるよう{頑張|がんば}ります。', text: '"Em cảm ơn chị ạ. Em sẽ dùng số tiền này thật trân trọng. Từ giờ em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Tiếng vỗ tay vang khắp phòng sinh hoạt. Trang ngồi ở hàng ghế sau vỗ tay to nhất — trong mắt cô bé, senpai của mình vừa bước lên một nấc thang mà người mới nào cũng mơ.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: 'Phong bì nằm gọn trong tay {name}, nhẹ mà ấm. Ba năm ở viện này, từ người mới run tay tới người được gọi tên trước cả đội — chặng đường ấy vừa được khép lại bằng một tràng pháo tay.' } ] }
        ]
      },
      { sp: 'Chị Mai', jp: 'それから、もう{一|ひと}つ{大事|だいじ}な{話|はなし}です。{施設|しせつ}は、あなたの{在留資格|ざいりゅうしかく}の{更新|こうしん}と、{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を{支援|しえん}します。{会社|かいしゃ}が{保証|ほしょう}しますから、{安心|あんしん}してください。', text: '"Còn một việc quan trọng nữa. Viện sẽ hỗ trợ em gia hạn tư cách lưu trú và chuyển lên Tokutei Ginou số 2. Phía cơ sở đứng ra bảo lãnh, em cứ yên tâm nhé."' },
      { sp: 'hero', jp: 'ありがとうございます。{手続|てつづ}きに{必要|ひつよう}な{書類|しょるい}を{教|おし}えていただけますか。{期限|きげん}も{確認|かくにん}させてください。', text: '"Em cảm ơn chị ạ. Xin chị cho em biết những giấy tờ cần thiết cho thủ tục. Cho em xác nhận cả thời hạn nữa ạ."' },
      { sp: 'Chị Mai', jp: '{在職証明書|ざいしょくしょうめいしょ}と{雇用契約書|こようけいやくしょ}は{施設|しせつ}で{用意|ようい}します。あなたの{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えましょう。', text: '"Giấy chứng nhận đang làm việc và hợp đồng lao động phía viện sẽ chuẩn bị. Phần của em là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Mình chuẩn bị đủ trước giữa tháng sau nhé."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{書類|しょるい}は{早|はや}めに{揃|そろ}えて、{一覧|いちらん}にして{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị giấy tờ sớm, lập thành danh mục rồi nộp ạ. Mong chị chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Buổi tổng kết khép lại bằng bữa tiệc nhỏ cuối năm. {name} cầm phong bì thưởng và tờ giấy hẹn thủ tục, nhìn quanh căn phòng đầy những gương mặt đã thành thân quen. Ba năm trước, {call} bước vào đây chỉ mong "đừng bị mắng". Ba năm sau, {call} bước ra với một lời bảo lãnh cho tương lai dài lâu trên đất này.' }
    ]
  },

  /* ================= NHÀ HÀNG — ĐỐI GƯƠNG: ĐẠT ================= */
  'c5-succ-nha-hang-2': {
    scene: '🪞 Nhà hàng năm thứ ba — đối gương: Đạt và lời chào trong bếp',
    branch: [
      { sp: 'narr', text: 'Bếp nhà hàng ở Toyosu, bảy giờ sáng. Hôm nay bếp trưởng Sato giao cho {name} một học việc mới: Đạt, vừa sang Nhật, mắt sáng và tay chân lóng ngóng. "Tháng đầu nó đi theo mày. Dạy nó như tao từng dạy mày — từ lời chào."' },
      { sp: 'Bếp trưởng Sato', jp: '{今日|きょう}から、ダットはお{前|まえ}の{後輩|こうはい}だ。{厨房|ちゅうぼう}の{朝|あさ}は{挨拶|あいさつ}からだ。お{前|まえ}の{言葉|ことば}で{教|おし}えてやれ。', text: 'Bếp trưởng Sato khoanh tay: "Từ hôm nay Đạt là kouhai của mày. Buổi sáng trong bếp bắt đầu bằng lời chào. Dạy nó bằng lời của mày đi."' },
      { sp: 'Đạt', jp: 'はじめまして、ダットです。よろしくお{願|ねが}いします。…{包丁|ほうちょう}、{早|はや}く{使|つか}ってみたいです。', text: 'Đạt cúi đầu, giọng nhỏ xíu chỉ đủ người đối diện nghe: "Em chào senpai, em là Đạt ạ. Mong senpai chỉ bảo. …Em muốn được dùng dao sớm ạ."' },
      { sp: 'hero', jp: '{声|こえ}はもう{少|すこ}し{大|おお}きくね。{厨房|ちゅうぼう}は{声|こえ}で{回|まわ}るんだ。{包丁|ほうちょう}はまだ{早|はや}い。まず{皿洗|さらあら}いと{下処理|したしょり}からだよ。', text: '{name} cười, đáp vừa đủ nghe: "Giọng to lên chút nữa nhé. Bếp chạy bằng tiếng hô mà. Dao thì còn sớm — trước hết là rửa bát và sơ chế đã."' },
      { sp: 'narr', text: 'Nhưng tới giờ nếm thử nồi canh miso chuẩn bị cho bữa trưa nhân viên, Đạt làm đúng ba việc mà bất kỳ người mới nào cũng từng ham: cậu lén cầm con dao lớn thái thử một củ cải cho "ra dáng đầu bếp", rồi nếm canh và phán một câu cụt lủn: "Hơi mặn thôi ạ." Bếp trưởng Sato đứng ngay sau lưng từ lúc nào, cán dao gõ xuống thớt một tiếng khô.' },
      { sp: 'Bếp trưởng Sato', jp: 'おい。{味|あじ}は「{少|すこ}し{濃|こ}い」だけじゃ{伝|つた}わらない。{何|なに}がどうなのか、{言葉|ことば}で{言|い}え。{包丁|ほうちょう}も、{順番|じゅんばん}を{飛|と}ばすな。', text: 'Bếp trưởng gằn giọng: "Này. Vị thì nói "hơi đậm" thôi chưa truyền đạt được gì. Cái gì thế nào, phải nói ra bằng lời. Dao cũng vậy — đừng nhảy bước."' },
      { sp: 'Đạt', text: '"Em xin lỗi ạ…" Đạt đặt vội con dao xuống, mặt tái đi. "Ở nhà em nấu ăn suốt, em tưởng cầm dao là được việc ngay…"' },
      { sp: 'narr', text: 'Cổ họng {name} nghẹn lại vì một ký ức y hệt: buổi sáng đầu tiên của chính mình, cũng ham con dao, cũng chỉ biết nói vị bằng những chữ chung chung — và bếp trưởng đã không đuổi ra khỏi bếp, chỉ bắt đầu dạy lại từ cách nếm. Câu quát sắp bật ra được {name} nuốt lại, thay bằng một hơi thở dài.' },
      {
        prompt: 'Đạt vừa nhảy bước cầm dao và nếm thử nói cụt lủn — đúng lỗi người mới của bếp này. {name} dạy thế nào?',
        choice: [
          { label: 'Quát như bếp trưởng năm xưa: "Ai cho mày cầm dao! Ra rửa bát!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương nhà hàng: quát kouhai ra bồn rửa — Đạt nhớ dao bằng nỗi sợ', say: [
            { sp: 'narr', text: 'Đạt lặng lẽ ra bồn rửa, vai sụp xuống, cả buổi sáng chỉ dám làm trong im lặng. Món canh hôm đó vẫn được nêm lại đúng vị — nhưng không phải nhờ Đạt hiểu ra điều gì, mà nhờ cậu sợ không dám mở miệng nữa. Anh đầu bếp lắc đầu khẽ: "Bếp này quát nhau vì việc, không quát cho người ta câm."' },
            { sp: 'Bếp trưởng Sato', text: 'Cuối ca, bếp trưởng gọi {name} lại: "Mày quên ngày đầu của mày rồi à? Tao quát mày câu nào chưa — hay tao dạy mày nếm lại từ đầu?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: cất dao đúng chỗ, rồi dạy lại cách nếm và cách nói vị', fx: { love: 2, jp: 2 }, note: 'Đối gương nhà hàng: dạy tận tay từ cách nếm — Đạt nhớ bằng cái lưỡi và lời nói', say: [
            { sp: 'hero', jp: 'ダット、{包丁|ほうちょう}は{元|もと}の{場所|ばしょ}に{戻|もど}して。{家|いえ}の{料理|りょうり}と{店|みせ}の{料理|りょうり}は{別物|べつもの}だ。まず{味見|あじみ}の{仕方|しかた}から、{一緒|いっしょ}にやろう。', text: '{name} đặt tay lên vai Đạt, giọng đều: "Đạt, cất dao về chỗ cũ đã. Nấu ở nhà và nấu ở quán là hai thứ khác nhau. Trước hết, anh/chị dạy em cách nếm thử — mình làm cùng nhau."' },
            { sp: 'Đạt', text: '"Dạ…" Đạt cất dao, đứng sát lại bên nồi canh, lần này cầm thìa nếm bằng hai tay, mắt nhắm lại tập trung như người ta nghe một bản nhạc khó.' } ] }
        ]
      },
      { sp: 'hero', jp: '{出汁|だし}の{香|かお}り、{塩味|しおあじ}、{後味|あとあじ}。{順番|じゅんばん}に{感|かん}じて、{言葉|ことば}にするんだ。{美味|おい}しい、だけじゃ{仕事|しごと}にならない。', text: '{name} chỉ từng lớp vị: "Mùi nước dùng, vị muối, hậu vị. Cảm nhận theo thứ tự rồi biến thành lời. Chỉ nói "ngon" thì chưa thành việc được đâu."' },
      { sp: 'Anh đầu bếp', jp: 'サトウさんも{昔|むかし}、そうやって{教|おし}えたんだよ。{皿洗|さらあら}いが{一番|いちばん}、{店|みせ}の{腕|うで}が{分|わ}かる。{焦|あせ}るな。', text: 'Anh đầu bếp ghé tai Đạt, nói nhỏ: "Anh Sato ngày xưa cũng dạy anh mày y như thế đấy. Rửa bát là việc thể hiện tay nghề của quán rõ nhất. Đừng vội."' },
      {
        prompt: 'Đến lượt Đạt nếm lại nồi canh và nói vị cho bếp trưởng nghe. {name} chọn câu mẫu nào để dạy em ấy?',
        choice: [
          { label: '"Nước dùng đậm; vị muối hơi nhạt, nếu cho khách quen thì tầm này là vừa êm"', fx: { jp: 2, love: 1 }, note: 'Đối gương nhà hàng: Đạt nói được vị bằng lời có lớp lang — bếp trưởng gật đầu', say: [
            { sp: 'Đạt', jp: '{出汁|だし}がよく{出|で}ています。{塩味|しおあじ}は{少|すこ}し{薄|うす}いかもしれません。{常連|じょうれん}さん{向|む}けなら、このくらいが{落|お}ち{着|つ}く{味|あじ}でしょうか。', text: 'Đạt hít một hơi, nói chậm mà chắc: "Nước dùng rất đậm ạ. Vị muối có lẽ hơi nhạt một chút. Nếu cho khách quen thì tầm vị này có phải là vừa êm không ạ?"' },
            { sp: 'Bếp trưởng Sato', jp: '…ほう。{味|あじ}のことを{言葉|ことば}で{言|い}える{新|あたら}しいのは{珍|めずら}しいな。{教|おし}えた{奴|やつ}がいいんだろうな。', text: 'Bếp trưởng nhướng mày, liếc sang {name}: "…Ồ. Người mới mà nói được vị bằng lời thì hiếm đấy. Chắc người dạy cũng ra gì."' } ] },
          { label: '"Canh ngon ạ, chắc chắn ngon ạ" — nói chắc vào cho bếp trưởng yên tâm', fx: { jp: 1 }, note: 'Đối gương nhà hàng: Đạt nói chung chung — được hero sửa lại ngay tại chỗ', say: [
            { sp: 'Đạt', jp: 'おいしいです。{絶対|ぜったい}、おいしいと{思|おも}います。', text: 'Đạt nói nhanh như sợ bị hỏi thêm: "Ngon ạ. Chắc chắn là ngon ạ."' },
            { sp: 'hero', jp: '{美味|おい}しいの{中身|なかみ}を{言|い}ってみて。{出汁|だし}はどう、{塩味|しおあじ}はどう。{感|かん}じたまま、{順番|じゅんばん}にね。', text: '{name} không quát, chỉ gợi mở: "Thử nói cái ruột của chữ "ngon" xem. Nước dùng thế nào, vị muối thế nào. Cảm nhận sao, nói theo thứ tự thế." Đạt nếm lại lần nữa — và lần này, cậu nói được.' } ] }
        ]
      },
      { sp: 'Đạt', jp: '{今日|きょう}はありがとうございました。{味|あじ}を{言葉|ことば}にする{練習|れんしゅう}、{毎日|まいにち}やります。', text: 'Cuối ca, Đạt tháo tạp dề, cúi đầu: "Hôm nay em cảm ơn senpai ạ. Việc luyện nói vị bằng lời, em sẽ làm mỗi ngày ạ."' },
      { sp: 'Bếp trưởng Sato', jp: 'お{前|まえ}も{教|おし}える{側|がわ}か。…{悪|わる}くない{気分|きぶん}だろ。{昼|ひる}のまかない、{二人|ふたり}で{手伝|てつだ}え。', text: 'Bếp trưởng cười khùng khục trong cổ họng: "Mày cũng thành người đi dạy rồi à. …Cảm giác không tệ chứ gì. Bữa trưa nhân viên, hai đứa cùng phụ đi."' },
      { sp: 'narr', text: 'Được phụ nấu bữa trưa cho cả quán — đặc ân nhỏ mà {name} từng nhận trong buổi sáng đầu tiên của mình — hôm nay đến lượt Đạt. {name} nhìn cậu học việc lóng ngóng bên nồi canh, chợt hiểu: nghề bếp truyền nhau không phải bằng tiếng quát, mà bằng một thìa canh được nếm đi nếm lại cho tới khi nói ra được thành lời.' }
    ]
  },

  /* ================= NHÀ HÀNG — TỔNG KẾT NĂM ================= */
  'c5-succ-nha-hang-3': {
    scene: '🏆 Nhà hàng — tổng kết năm: bữa tiệc 40 khách và tin bảo lãnh',
    branch: [
      { sp: 'narr', text: 'Đêm tổng kết cuối năm, nhà hàng đóng cửa sớm một hôm. Cả bếp ngồi quanh chiếc bàn dài kê giữa sảnh, hơi ấm từ bếp còn phả ra. Bếp trưởng Sato đứng dậy, tay cầm một phong bì và một tờ giấy khen gấp tư.' },
      { sp: 'Bếp trưởng Sato', jp: '{今年|ことし}の{話|はなし}を{一|ひと}つする。{先月|せんげつ}の40{人|にん}の{宴会|えんかい}、{最初|さいしょ}から{最後|さいご}まで、{一皿|さら}も{遅|おく}れなかった。あれは{大|おお}したもんだ。', text: 'Bếp trưởng nói chậm rãi: "Tôi kể một chuyện của năm nay. Bữa tiệc bốn mươi khách tháng trước — từ món đầu tới món cuối, không một đĩa nào chậm. Việc đó không hề nhỏ."' },
      { sp: 'Bếp trưởng Sato', jp: 'あの{夜|よる}、{厨房|ちゅうぼう}の{真|ま}ん{中|なか}で{声|こえ}を{出|だ}し{続|つづ}けたのは、この{男|おとこ}だ。{俺|おれ}の{弟子|でし}として、{誇|ほこ}らしい{仕事|しごと}だった。ありがとうな。', text: '"Đêm ấy, người đứng giữa bếp hô giữ nhịp không ngừng chính là cậu này. Với tư cách đệ tử của tôi, đó là một đêm làm việc đáng tự hào. Cảm ơn mày."' },
      { sp: 'Anh đầu bếp', jp: '40{人|にん}{分|ぶん}、{温|あたた}かいまま{出|だ}せたのは、{順番|じゅんばん}の{組|く}み{立|た}てが{完璧|かんぺき}だったからだよ。{本当|ほんとう}にすごかった。', text: 'Anh đầu bếp vỗ tay phụ hoạ: "Bốn mươi suất mà ra bàn còn nóng hổi là nhờ cách xếp thứ tự lửa hoàn hảo đấy. Thật sự rất giỏi."' },
      { sp: 'hero', jp: '{皆|みな}さんの{力|ちから}があっての{宴会|えんかい}でした。{私|わたし}は{声|こえ}を{出|だ}していただけです。ありがとうございます。', text: '"Bữa tiệc ấy thành công là nhờ sức của mọi người ạ. Em chỉ là người hô nhịp thôi. Em cảm ơn mọi người ạ."' },
      { sp: 'Bếp trưởng Sato', jp: 'はい、{今年|ことし}の{賞与|しょうよ}。{店|みせ}からの{気持|きも}ちだ。{受|う}け{取|と}れ。', text: 'Bếp trưởng chìa phong bì ra, giọng gọn như mọi khi: "Đây, tiền thưởng năm nay. Tấm lòng của quán. Nhận đi."' },
      {
        prompt: 'Nhận phong bì thưởng từ tay bếp trưởng trước cả bếp, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu: "Em sẽ cố gắng xứng đáng với sự tin cậy của quán"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{店|みせ}の{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。{大切|たいせつ}に{使|つか}わせていただきます。', text: '"Em cảm ơn anh ạ. Em sẽ cố gắng để năm tới cũng xứng đáng với sự tin cậy của quán. Em sẽ dùng số tiền này thật trân trọng ạ."' },
            { sp: 'narr', text: 'Cả bếp vỗ tay rào rào. Đạt ngồi cuối bàn vỗ to nhất, mắt sáng lên — hình ảnh senpai của cậu được bếp trưởng gọi là "đệ tử đáng tự hào" sẽ còn theo cậu nhiều năm.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn anh và mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いします。', text: '"Em cảm ơn anh và mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: 'Phong bì mỏng mà nặng tình. {name} cất vào túi áo ngực — nơi gần nhất với mùi khói và dầu mỡ đã thành mùi của nghề mình.' } ] }
        ]
      },
      { sp: 'Bếp trưởng Sato', jp: 'それから、{店|みせ}からもう{一|ひと}つ。お{前|まえ}の{在留資格|ざいりゅうしかく}、{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、{店|みせ}が{支援|しえん}する。{書類|しょるい}は{店|みせ}で{用意|ようい}するから、{安心|あんしん}して{腕|うで}を{磨|みが}け。', text: '"Còn một việc từ phía quán. Việc chuyển tư cách lưu trú của mày lên Tokutei Ginou số 2, quán sẽ hỗ trợ. Giấy tờ quán chuẩn bị, mày cứ yên tâm mà rèn tay nghề."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn anh ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Bếp trưởng Sato', jp: '{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}はお{前|まえ}の{分|ぶん}だ。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えろ。{他|ほか}は{店|みせ}が{出|だ}す。', text: '"Giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế là phần của mày. Chuẩn bị đủ trước giữa tháng sau. Còn lại quán lo."' },
      { sp: 'hero', jp: '{分|わ}かりました。{早|はや}めに{揃|そろ}えて、{一覧|いちらん}にして{持|も}ってきます。よろしくお{願|ねが}いいたします。', text: '"Em rõ rồi ạ. Em sẽ chuẩn bị sớm, lập danh mục rồi mang tới ạ. Mong anh chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Đêm tổng kết tan dần trong tiếng bát đũa dọn dẹp. {name} bước ra con phố đêm Toyosu, áo vẫn vương mùi khói bếp — nhưng lần này trong túi là phong bì thưởng và một lời bảo lãnh. Từ đứa học việc bị nhắc vì câu nếm thử cụt lủn, tới người giữ nhịp cho bữa tiệc bốn mươi khách: con đường ấy đi bằng nghìn lần nếm và trăm lần sai, y như bếp trưởng từng nói.' }
    ]
  },

  /* ================= GENBA — ĐỐI GƯƠNG: PHÚC ================= */
  'c5-succ-genba-2': {
    scene: '🪞 Genba năm thứ ba — đối gương: Phúc và buổi KY đầu tiên',
    branch: [
      { sp: 'narr', text: 'Công trường ở Yokohama, buổi điểm danh sáng. Tổ của {name} hôm nay đón một người mới: Phúc, mới sang, người gầy, mũ bảo hộ đội còn chưa quen tay. Sếp công trường giao thẳng: "Tuần đầu của Phúc, cậu dẫn. Buổi KY sáng nay, để nó đứng cạnh cậu."' },
      { sp: 'Sếp công trường', jp: '{今日|きょう}から、フックくんはあなたの{班|はん}です。まず{安全|あんぜん}、それから{仕事|しごと}。あなたのやり{方|かた}で{教|おし}えてください。', text: 'Sếp công trường nói rõ: "Từ hôm nay, Phúc vào tổ của cậu. Trước hết là an toàn, rồi mới tới công việc. Cậu dạy theo cách của cậu đi."' },
      { sp: 'Phúc', jp: 'はじめまして、フックです。よろしくお{願|ねが}いします。{力仕事|ちからしごと}なら、{自信|じしん}があります。', text: 'Phúc chào to, đầy khí thế: "Em chào senpai, em là Phúc ạ. Mong senpai chỉ bảo. Việc nặng thì em tự tin lắm ạ."' },
      { sp: 'hero', jp: 'よろしく。{力|ちから}より{先|さき}に、ヘルメットを{見|み}せて。あごひも、{締|し}まっているかな。', text: '{name} gật đầu, nhìn ngay vào chiếc mũ của Phúc: "Chào em. Trước khi nói chuyện sức lực, cho anh/chị xem mũ đã. Dây cằm đã thắt chặt chưa?"' },
      { sp: 'narr', text: 'Dây cằm của Phúc lỏng thòng, mũ ngửa ra sau như mũ lưỡi trai. Tới phần chỉ tay xác nhận trong buổi KY, Phúc đứng im thin thít, mắt liếc ngang — rồi khi cả tổ tản ra, cậu xách đồ định đi thẳng lên khu vực giàn giáo, bỏ qua luôn phần hô xác nhận và câu hỏi KY về điểm nguy hiểm của ngày hôm nay.' },
      { sp: 'Anh thợ cả', jp: 'おい、フック。{待|ま}て。KYも{指差確認|ゆびさしかくにん}も{終|お}わっていないぞ。どこが{危|あぶ}ないか、{言|い}えるか。', text: 'Anh thợ cả gọi giật lại: "Này Phúc. Khoan đã. KY và chỉ tay xác nhận còn chưa xong đấy. Chỗ nào nguy hiểm hôm nay, em nói được không?"' },
      { sp: 'Phúc', text: '"Dạ… em thấy mọi người làm được thì em cũng làm được ạ." Phúc gãi đầu, chiếc mũ lỏng khẽ trượt xuống trán. "Em sợ hỏi nhiều thì bị chê là chậm…"' },
      { sp: 'narr', text: 'Tim {name} thót lại một nhịp — không phải vì giận, mà vì nhận ra chính mình của buổi sáng đầu tiên ở công trường này: cũng sợ hỏi thì bị chê chậm, cũng từng nghĩ sức trẻ là đủ. Ngày ấy, Hùng và anh thợ cả đã dạy {call} một câu: không hiểu thì hỏi trước khi bắt đầu, vào việc rồi mới hỏi thì nguy hiểm. {name} bước tới, chỉnh lại dây mũ cho Phúc thay vì quát.' },
      {
        prompt: 'Phúc đội mũ lỏng, bỏ qua chỉ tay xác nhận và định vào việc khi chưa qua KY. {name} dạy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Muốn chết à mà mũ cũng không thắt cho tử tế!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương genba: mắng hậu bối trước cả tổ — Phúc nhớ buổi KY bằng nỗi sợ', say: [
            { sp: 'narr', text: 'Câu mắng bật ra giữa sân công trường. Phúc giật mình thắt vội dây mũ, cả buổi sáng làm việc gì cũng liếc nhìn {name} trước, hô xác nhận to mà rỗng — hô vì sợ, không phải vì hiểu. Anh thợ cả lắc đầu: "Ở genba, sợ senpai không cứu được ai. Hiểu nguy hiểm mới cứu được."' },
            { sp: 'Sếp công trường', text: 'Cuối buổi, sếp gọi {name} lại: "Ngày đầu của cậu ở đây, có ai mắng cậu câu nào không? Người ta chỉnh mũ cho cậu, đúng không?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: thắt lại dây mũ, làm mẫu chỉ tay và giải thích KY từng bước', fx: { love: 2, jp: 2 }, note: 'Đối gương genba: dạy tận tay như anh thợ cả từng dạy mình — Phúc nhớ bằng sự hiểu', say: [
            { sp: 'hero', jp: 'フック、あごひもはこうやって{締|し}めるんだ。ヘルメットは{命|いのち}を{守|まも}る{最初|さいしょ}の{道具|どうぐ}だよ。それからKYは、「{危険|きけん}を{予知|よち}する」という{意味|いみ}。{作業|さぎょう}の{前|まえ}に、{危|あぶ}ない{場所|ばしょ}を{先|さき}に{考|かんが}えるんだ。', text: '{name} cúi xuống thắt lại dây mũ cho Phúc, nói chậm rãi: "Phúc này, dây cằm thắt như thế này. Mũ bảo hộ là dụng cụ đầu tiên giữ mạng mình đấy. Còn KY nghĩa là "dự đoán trước nguy hiểm" — trước khi làm, mình nghĩ trước xem chỗ nào nguy hiểm."' },
            { sp: 'Phúc', text: '"…Dạ. Em hiểu rồi ạ." Phúc tự tay thắt lại dây mũ lần nữa cho đúng, lần này chặt và ngay ngắn. "Hỏi trước không phải là chậm — hỏi trước là an toàn, đúng không senpai?"' } ] }
        ]
      },
      { sp: 'hero', jp: '{分|わ}からないことは、{作業|さぎょう}の{前|まえ}に{聞|き}くんだ。{始|はじ}まってからだと{危|あぶ}ない。{勝手|かって}に{触|さわ}るのも、なしだよ。', text: '{name} dặn thêm một câu mà mình từng được dặn: "Cái gì không hiểu thì hỏi trước khi bắt đầu làm. Vào việc rồi mới hỏi thì nguy hiểm. Tự ý đụng vào cũng không được, nhớ nhé."' },
      { sp: 'Anh thợ cả', jp: 'その{心構|こころがま}えが{一番|いちばん}{大事|だいじ}だ。さあ、みんなで{指差確認|ゆびさしかくにん}だ。フック、{声|こえ}を{出|だ}せ。', text: 'Anh thợ cả gật đầu: "Tâm thế đó là quan trọng nhất. Nào, cả tổ chỉ tay xác nhận. Phúc, hô to lên."' },
      {
        prompt: 'Phần hô chỉ tay xác nhận — câu kaiwa mở đầu đời genba. {name} dạy Phúc hô thế nào?',
        choice: [
          { label: 'Hô mẫu rồi để Phúc hô theo: "Giàn giáo: ổn! Phía trên đầu: ổn! Chúc an toàn!"', fx: { jp: 2, love: 1 }, note: 'Đối gương genba: Phúc hô chỉ tay xác nhận vang cả tổ trong buổi KY đầu tiên', say: [
            { sp: 'Phúc', jp: '{足場|あしば}よし、{頭上|ずじょう}よし。ご{安全|あんぜん}に！', text: 'Phúc chỉ tay lên giàn giáo, rồi lên phía trên đầu, hô vang: "Giàn giáo: ổn! Phía trên đầu: ổn! Chúc mọi người an toàn ạ!"' },
            { sp: 'Anh thợ cả', jp: 'いい{声|こえ}だ。その{調子|ちょうし}でいこう。', text: 'Anh thợ cả cười: "Hô tốt lắm. Cứ giữ phong độ đó mà làm nhé." — câu nói y hệt câu anh từng nói với {name} trong buổi sáng đầu tiên.' } ] },
          { label: 'Chỉ hô câu chốt "Chúc an toàn!" cho nhanh, bỏ phần chỉ tay từng điểm', fx: { jp: 1 }, note: 'Đối gương genba: Phúc hô tắt — được hero nhắc chỉ tay là để mắt nhìn thật', say: [
            { sp: 'Phúc', jp: 'ご{安全|あんぜん}に！', text: 'Phúc hô ngắn gọn, tay vẫn để xuôi: "Chúc an toàn ạ!"' },
            { sp: 'hero', jp: '{指|ゆび}を{差|さ}すのは、{目|め}で{見|み}るためだよ。{足場|あしば}、{頭上|ずじょう}、{一|ひと}つずつ{指差|ゆびさ}して、{声|こえ}に{出|だ}して。もう{一回|いっかい}、{一緒|いっしょ}に。', text: '{name} làm mẫu lại, không quát: "Chỉ tay là để mắt nhìn thật vào điểm đó. Giàn giáo, phía trên đầu — chỉ từng điểm một và hô to lên. Làm lại lần nữa, cùng anh/chị nào." Lần thứ hai, tay Phúc đã chỉ đúng điểm, và tiếng hô đã có sức.' } ] }
        ]
      },
      { sp: 'Phúc', jp: '{今日|きょう}はありがとうございました。{安全|あんぜん}の{意味|いみ}、{少|すこ}し{分|わ}かりました。', text: 'Cuối buổi, Phúc tháo mũ, cúi đầu: "Hôm nay em cảm ơn senpai ạ. Ý nghĩa của hai chữ an toàn, em đã hiểu được một chút rồi ạ."' },
      { sp: 'Sếp công trường', jp: '{教|おし}える{側|がわ}になったな。{最初|さいしょ}は{安全|あんぜん}、それから{仕事|しごと}。お{前|まえ}はそれを{体|からだ}で{覚|おぼ}えたんだな。', text: 'Sếp công trường vỗ vai {name}: "Cậu thành người đi dạy rồi đấy. Trước hết là an toàn, rồi mới tới công việc — cậu đã học điều đó bằng chính thân mình rồi."' },
      { sp: 'narr', text: 'Buổi chiều, {name} nhìn Phúc hô đối chiếu với bạn cùng cặp, dây mũ thắt chặt, chợt nhớ chiếc mũ còn thơm mùi mới của chính mình ba năm trước. Ở genba, câu chào không phải "chúc làm tốt" — mà là "chúc nhau trở về nguyên vẹn". Hôm nay, {call} đã trao lại được câu chào ấy cho một người mới.' }
    ]
  },

  /* ================= GENBA — TỔNG KẾT NĂM ================= */
  'c5-succ-genba-3': {
    scene: '🏆 Genba — tổng kết năm: buổi đổ bê tông an toàn tuyệt đối',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của công trường được tổ chức ngay trong văn phòng container, cả tổ ngồi quanh bàn họp dã chiến. Sếp công trường đứng dậy, trên bảng trắng sau lưng là biểu đồ an toàn của năm: một đường thẳng không một vết gãy.' },
      { sp: 'Sếp công trường', jp: '{今年|ことし}の{数字|すうじ}を{言|い}います。{事故|じこ}ゼロ、{一日|いちにち}も{止|と}まらなかった。これは{簡単|かんたん}なことじゃありません。', text: 'Sếp nói chậm, rõ: "Tôi nói con số của năm nay. Tai nạn bằng không, không một ngày nào phải dừng việc. Đây không phải việc dễ."' },
      { sp: 'Sếp công trường', jp: 'とくに、あの{大|おお}きなコンクリート{打設|だせつ}の{日|ひ}。{指揮|しき}をとって、{最後|さいご}まで{安全|あんぜん}に{終|お}えたのは、この{人|ひと}です。{班|はん}の{皆|みな}も、よく{支|ささ}えてくれました。', text: '"Đặc biệt là ngày đổ bê tông lớn ấy. Người chỉ huy và giữ an toàn tới phút cuối cùng chính là người này. Cả tổ cũng đã nâng đỡ nhau rất tốt."' },
      { sp: 'Anh thợ cả', jp: 'あの{日|ひ}の{合図|あいず}の{声|こえ}、{現場|げんば}の{端|はし}まで{届|とど}いていたよ。{若|わか}いのに、{落|お}ち{着|つ}いた{指揮|しき}だった。', text: 'Anh thợ cả gật gù: "Hôm ấy tiếng hô hiệu lệnh của cậu vọng tới tận cuối công trường. Còn trẻ mà chỉ huy rất điềm tĩnh."' },
      { sp: 'hero', jp: '{皆|みな}さんが{声|こえ}を{合|あ}わせてくれたおかげです。{一人|ひとり}の{力|ちから}ではありません。ありがとうございます。', text: '"Đó là nhờ mọi người đã đồng lòng hô đáp cùng em ạ. Không phải sức của một người đâu ạ. Em cảm ơn mọi người."' },
      { sp: 'Sếp công trường', jp: 'では、{今年|ことし}の{賞与|しょうよ}です。{会社|かいしゃ}からの{気持|きも}ちです。{受|う}け{取|と}ってください。', text: 'Sếp trao phong bì bằng hai tay: "Đây là tiền thưởng của năm nay. Tấm lòng của công ty. Cậu nhận nhé."' },
      {
        prompt: 'Nhận phong bì thưởng trước cả tổ, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{安全第一|あんぜんだいいち}で{頑張|がんば}ります。', text: '"Em cảm ơn sếp ạ. Em sẽ cố gắng xứng đáng với sự tin cậy này — năm tới cũng đặt an toàn lên hàng đầu ạ."' },
            { sp: 'narr', text: 'Cả tổ vỗ tay, tiếng vỗ tay của những bàn tay chai sần nghe ấm lạ thường. Phúc ngồi ở cuối bàn vỗ đến đỏ cả tay — senpai của cậu vừa được cả công trường công nhận.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: 'Phong bì được cất cẩn thận vào túi trong của áo khoác. Ngoài cửa sổ container, công trường lên đèn — nơi {name} đã trưởng thành từ một người mới đội mũ còn chưa quen.' } ] }
        ]
      },
      { sp: 'Sếp công trường', jp: 'それから、{来年|らいねん}の{話|はなし}です。{会社|かいしゃ}は、あなたの{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を{支援|しえん}します。{必要|ひつよう}な{書類|しょるい}は{会社|かいしゃ}が{用意|ようい}します。', text: '"Còn chuyện năm tới. Công ty sẽ hỗ trợ cậu chuyển lên Tokutei Ginou số 2. Giấy tờ cần thiết công ty sẽ chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と、{手続|てつづ}きの{期限|きげん}を{確認|かくにん}させてください。', text: '"Em cảm ơn sếp ạ. Cho em xác nhận phần giấy tờ của em và thời hạn thủ tục ạ."' },
      { sp: 'Sếp công trường', jp: 'あなたの{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてください。{在職証明書|ざいしょくしょうめいしょ}は{会社|かいしゃ}が{出|だ}します。', text: '"Phần của cậu là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang làm việc công ty sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong sếp chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Ra khỏi văn phòng container, {name} đội lại mũ, nhìn công trường chìm trong nắng chiều cuối năm. Ba năm trước, {call} là người được người ta chỉnh lại dây mũ cho. Ba năm sau, {call} là người chỉ huy một buổi đổ bê tông không một vết xước — và được công ty đứng ra bảo lãnh cho chặng đường dài hơn nữa.' }
    ]
  },

  /* ================= KHÁCH SẠN — ĐỐI GƯƠNG: MY ================= */
  'c5-succ-khach-san-2': {
    scene: '🪞 Khách sạn năm thứ ba — đối gương: My và câu keigo đầu tiên',
    branch: [
      { sp: 'narr', text: 'Khách sạn ở Odaiba, ca sáng. Chị senpai gọi {name} lại quầy lễ tân: hôm nay có một nhân viên mới người Việt — My, lễ tân tập sự, nụ cười tươi nhưng vốn keigo còn mỏng. "Tuần đầu của My, em kèm nhé. Quầy lễ tân là cửa ngõ của khách sạn đấy."' },
      { sp: 'Chị senpai khách sạn', jp: '{今日|きょう}から、ミーさんの{指導|しどう}をお{願|ねが}いします。まずは{笑顔|えがお}と、ていねいな{言葉|ことば}。それがホテルの{入口|いりぐち}ですよ。', text: 'Chị senpai nói nhẹ nhàng: "Từ hôm nay, chị nhờ em hướng dẫn My nhé. Trước hết là nụ cười và lời nói lịch sự. Đó là cửa ngõ của khách sạn đấy."' },
      { sp: 'My', jp: 'はじめまして、ミーです。よろしくお{願|ねが}いいたします。{日本語|にほんご}はまだ{勉強中|べんきょうちゅう}ですが、{頑張|がんば}ります。', text: 'My cúi chào rất đúng phép: "Em chào senpai ạ, em là My. Mong senpai chỉ bảo. Tiếng Nhật em còn đang học, nhưng em sẽ cố gắng ạ."' },
      { sp: 'hero', jp: 'よろしくね。{最初|さいしょ}はチェックインの{流|なが}れを{一緒|いっしょ}に{見|み}ましょう。{分|わ}からない{言葉|ことば}は、その{場|ば}で{聞|き}いてね。', text: '{name} mỉm cười đáp: "Chào em. Trước hết mình cùng xem quy trình check-in nhé. Từ nào không hiểu, cứ hỏi ngay tại chỗ nhé."' },
      { sp: 'narr', text: 'Vị khách đầu tiên của buổi sáng bước tới quầy. My hít sâu, mỉm cười — rồi câu đầu tiên bật ra bằng thường thể thân mật như nói với bạn: "Phòng của chị là phòng hút thuốc, một đêm nhé?" Vị khách khựng lại. Phòng khách đặt là phòng CẤM hút thuốc. Chị senpai đứng bên khẽ cau mày.' },
      { sp: 'Chị khách', jp: 'あの…{禁煙|きんえん}で{予約|よやく}したはずなのですが。', text: 'Vị khách ngập ngừng: "À… tôi nhớ là mình đặt phòng cấm hút thuốc cơ mà."' },
      { sp: 'My', text: '"Em… em xin lỗi ạ!" My luống cuống cúi đầu liên tục, giọng run hẳn. "Em nói nhầm… em hồi hộp quá…"' },
      { sp: 'narr', text: 'Trong đầu {name} vang lên nguyên vẹn buổi sáng đầu tiên của mình ở quầy lễ tân này: tim đập thình thịch, sợ nhất là nói sai một câu keigo trước mặt khách. Chị senpai ngày ấy đã không mắng — chị đứng sát bên, nói mẫu từng câu, để {call} nhắc lại. {name} bước lên nửa bước, đứng cạnh My, không phải trước mặt em ấy.' },
      {
        prompt: 'My vừa nói thường thể với khách và xác nhận sai loại phòng. {name} dạy em ấy thế nào?',
        choice: [
          { label: 'Mắng khẽ ngay tại quầy: "Đã bảo phải dùng kính ngữ cơ mà!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương khách sạn: mắng kouhai ngay tại quầy — My nhớ keigo bằng nỗi sợ khách nghe thấy', say: [
            { sp: 'narr', text: '{name} tự xử lý xong phần check-in cho khách, còn My đứng nép sau quầy, cả buổi sáng còn lại chỉ dám gật đầu và cười trừ — không dám mở miệng nói câu nào dài. Chị quản lý đi ngang, nói khẽ: "Ở quầy lễ tân, dạy người mới bằng cách làm em ấy câm đi là cách dạy tệ nhất."' },
            { sp: 'Chị senpai khách sạn', text: 'Cuối ca, chị senpai nhắc riêng {name}: "Ngày đầu của em ở quầy này, chị có mắng em câu nào không? Chị nói mẫu, em nhắc lại. Nhớ không?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: xin lỗi khách cùng My, rồi nói mẫu từng câu để em ấy nhắc lại', fx: { love: 2, jp: 2 }, note: 'Đối gương khách sạn: dạy tận tay ngay tại quầy — My nhớ keigo bằng việc nhắc lại đúng', say: [
            { sp: 'hero', jp: '{申|もう}し{訳|わけ}ございません。{確認|かくにん}いたします。ミーさん、{一緒|いっしょ}に{言|い}ってみましょう。ご{予約|よやく}の{お名前|なまえ}をお{聞|き}かせいただけますか。', text: '{name} cúi chào khách trước, giọng chuẩn mực: "Tôi vô cùng xin lỗi quý khách. Tôi xin xác nhận lại ạ." Rồi quay sang My, nói nhỏ mà rõ: "My, mình cùng nói nhé: Xin quý khách cho tôi biết tên đã dùng để đặt phòng ạ."' },
            { sp: 'My', text: '"Dạ…" My hít một hơi, đứng thẳng người, và nhắc lại câu ấy — chậm, rõ, và đúng. Vai em ấy hạ xuống thấy rõ khi vị khách mỉm cười gật đầu.' } ] }
        ]
      },
      { sp: 'hero', jp: 'たなか{様|さま}、ありがとうございます。{禁煙|きんえん}のお{部屋|へや}、{一泊|いっぱく}でございますね。{少々|しょうしょう}お{待|ま}ちくださいませ。', text: '{name} làm mẫu trọn vẹn phần xác nhận cho My nghe: "Thưa bà Tanaka, cảm ơn quý khách ạ. Phòng cấm hút thuốc, một đêm, đúng không ạ. Xin quý khách vui lòng chờ một chút ạ."' },
      { sp: 'Chị khách', jp: 'ありがとう。{丁寧|ていねい}に{教|おし}えているのね。{安心|あんしん}しました。', text: 'Vị khách mỉm cười, giọng dịu hẳn: "Cảm ơn các bạn. Thấy các bạn dạy nhau chu đáo thế này, tôi yên tâm rồi."' },
      {
        prompt: 'Phần trao thẻ phòng là câu kaiwa chốt của buổi check-in. {name} dạy My nói thế nào?',
        choice: [
          { label: 'Câu chuẩn mực đầy đủ: "Đây là thẻ phòng ạ. Phòng 602 ở tầng sáu ạ. Chúc quý khách kỳ nghỉ dễ chịu"', fx: { jp: 2, love: 1 }, note: 'Đối gương khách sạn: My trao thẻ phòng bằng keigo chuẩn ngay lần đầu tự làm', say: [
            { sp: 'My', jp: 'こちらがカードキーでございます。お{部屋|へや}は{六階|ろっかい}の{六|ろく}{〇|ぜろ}{二|に}{号室|ごうしつ}でございます。よいご{滞在|たいざい}を。', text: 'My hai tay trao thẻ, nói trọn câu không vấp: "Đây là thẻ phòng của quý khách ạ. Phòng của quý khách là phòng 602 ở tầng sáu ạ. Chúc quý khách có kỳ nghỉ dễ chịu ạ."' },
            { sp: 'Chị senpai khách sạn', jp: '{初|はじ}めてとは{思|おも}えないくらい、{落|お}ち{着|つ}いていましたよ。その{調子|ちょうし}です。', text: 'Chị senpai mỉm cười với cả hai: "Bình tĩnh đến mức không nghĩ là lần đầu đâu đấy. Cứ giữ phong độ đó nhé." — câu khen y hệt chị từng dành cho {name} ba năm trước.' } ] },
          { label: 'Câu ngắn gọn: "Thẻ phòng đây ạ, tầng sáu" — cho nhanh qua lượt khách', fx: { jp: 1 }, note: 'Đối gương khách sạn: My nói tắt — được hero nhắc keigo là phần việc, không phải phần trang trí', say: [
            { sp: 'My', jp: 'カードキーです。{六階|ろっかい}です。', text: 'My chìa thẻ ra, nói cụt: "Thẻ phòng đây ạ. Tầng sáu ạ."' },
            { sp: 'hero', jp: 'ミーさん、お{客様|きゃくさま}への{言葉|ことば}は{短|みじか}さより{丁寧|ていねい}さだよ。「こちらがカードキーでございます」から、もう{一回|いっかい}{一緒|いっしょ}に。', text: '{name} nhắc khẽ, không một chút gắt: "My này, với khách, lời nói cần sự lịch sự hơn là ngắn gọn. Bắt đầu từ "Đây là thẻ phòng của quý khách ạ" — mình làm lại lần nữa cùng nhau nhé." Lần thứ hai, My nói trọn câu, và vị khách cúi đầu cảm ơn.' } ] }
        ]
      },
      { sp: 'My', jp: '{今日|きょう}はありがとうございました。{言葉|ことば}、{書|か}いて{覚|おぼ}えます。{明日|あした}は{一人|ひとり}で{言|い}えるようにします。', text: 'Cuối ca, My ghi chép đầy một trang sổ: "Hôm nay em cảm ơn senpai ạ. Các câu mẫu em sẽ viết ra để học thuộc. Mai em sẽ tự nói được ạ."' },
      { sp: 'Chị senpai khách sạn', jp: '{教|おし}える{側|がわ}になりましたね。{笑顔|えがお}と{言葉|ことば}、{次|つぎ}の{人|ひと}に{渡|わた}せましたね。', text: 'Chị senpai đi qua quầy, nói một câu ấm: "Em đã thành người đi dạy rồi đấy. Nụ cười và lời nói — em vừa trao lại được cho người tiếp theo rồi."' },
      { sp: 'narr', text: 'Sảnh khách sạn lại yên tĩnh sau lượt khách cuối. {name} nhìn My cẩn thận lau quầy lễ tân, miệng lẩm nhẩm các câu keigo mẫu. Ba năm trước, người lẩm nhẩm ấy là chính mình. Ở quầy lễ tân, sự chu đáo không nằm ở việc nói hay — nó nằm ở chỗ khách cảm thấy được đón tiếp thật lòng, và ở chỗ người đi trước chịu đứng cạnh người mới cho tới khi em ấy nói được trọn câu đầu tiên.' }
    ]
  },

  /* ================= KHÁCH SẠN — TỔNG KẾT NĂM ================= */
  'c5-succ-khach-san-3': {
    scene: '🏆 Khách sạn — tổng kết năm: lá thư cảm ơn của đoàn VIP',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của khách sạn tổ chức ở sảnh nhỏ tầng một. Chị quản lý đứng trước cả đội, tay cầm một lá thư viết tay được kẹp trong bìa trong suốt — nét chữ nắn nót, cuối thư là chữ ký của trưởng đoàn khách VIP lưu trú tháng trước.' },
      { sp: 'Chị quản lý', jp: '{今年|ことし}の{最後|さいご}に、この{手紙|てがみ}を{紹介|しょうかい}します。{先月|せんげつ}のVIPの{団体|だんたい}から、ホテルに{届|とど}いたものです。', text: 'Chị quản lý mở lời trang trọng: "Cuối năm nay, tôi xin giới thiệu lá thư này. Đây là thư đoàn khách VIP tháng trước gửi tới khách sạn."' },
      { sp: 'Chị quản lý', jp: '「{滞在中|たいざいちゅう}の{対応|たいおう}が{素晴|すば}らしかった。とくにフロントの{担当者|たんとうしゃ}の{気配|きくば}りに{感動|かんどう}した」と{書|か}かれています。その{担当者|たんとうしゃ}は、この{人|ひと}です。', text: 'Chị đọc lớn một đoạn: ""Sự phục vụ trong thời gian lưu trú thật tuyệt vời. Đặc biệt, chúng tôi cảm động trước sự chu đáo của nhân viên lễ tân phụ trách." Người phụ trách ấy chính là người này."' },
      { sp: 'Chị senpai khách sạn', jp: 'あの{団体|だんたい}、{要望|ようぼう}が{多|おお}くて{大変|たいへん}だったのに、{最後|さいご}まで{笑顔|えがお}でしたね。{本当|ほんとう}におつかれさまでした。', text: 'Chị senpai mỉm cười: "Đoàn ấy nhiều yêu cầu, vất vả lắm, vậy mà em giữ nụ cười tới phút cuối. Thật sự vất vả cho em rồi."' },
      { sp: 'hero', jp: '{皆|みな}さんに{助|たす}けていただいたおかげです。{一人|ひとり}では、あの{団体|だんたい}は{受|う}けられませんでした。ありがとうございます。', text: '"Đó là nhờ mọi người đã giúp đỡ em ạ. Một mình em không thể nào tiếp nổi đoàn ấy đâu ạ. Em cảm ơn mọi người ạ."' },
      { sp: 'Chị quản lý', jp: 'では、{今年|ことし}の{賞与|しょうよ}です。ホテルからの{気持|きも}ちです。どうぞ{受|う}け{取|と}ってください。', text: 'Chị quản lý trao phong bì bằng hai tay: "Đây là tiền thưởng của năm nay. Tấm lòng của khách sạn. Em nhận nhé."' },
      {
        prompt: 'Nhận phong bì thưởng trước cả đội lễ tân, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。', text: '"Em cảm ơn chị ạ. Em sẽ dùng số tiền này thật trân trọng. Em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Tiếng vỗ tay vang trong sảnh nhỏ. My ngồi hàng đầu vỗ tay không ngừng — trong lá thư cảm ơn của đoàn VIP, cô bé vừa nhìn thấy đích đến của những câu keigo mình đang lẩm nhẩm học mỗi ngày.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: 'Lá thư cảm ơn được chị quản lý treo lên bảng tin nội bộ ngay chiều hôm đó — và tên của {name} ở trong đó, cạnh tên của cả một tập thể.' } ] }
        ]
      },
      { sp: 'Chị quản lý', jp: 'それから、ホテルからの{支援|しえん}の{話|はなし}です。あなたの{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、ホテルが{支援|しえん}します。{手続|てつづ}きの{書類|しょるい}は、こちらで{用意|ようい}します。', text: '"Còn việc hỗ trợ từ phía khách sạn. Khách sạn sẽ hỗ trợ em chuyển lên Tokutei Ginou số 2. Giấy tờ thủ tục phía khách sạn sẽ chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn chị ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Chị quản lý', jp: 'あなたの{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてください。{在職証明書|ざいしょくしょうめいしょ}はホテルが{出|だ}します。', text: '"Phần của em là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang làm việc khách sạn sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong chị chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Buổi tổng kết khép lại, {name} đi ngang qua bảng tin nội bộ, dừng lại một giây trước lá thư viết tay của đoàn VIP. Ba năm trước, {call} run tay sau ca check-in đầu tiên. Ba năm sau, sự chu đáo của {call} được khách viết thành thư, và khách sạn đứng ra bảo lãnh cho chặng đường tiếp theo.' }
    ]
  },

  /* ================= THỰC PHẨM — ĐỐI GƯƠNG: KIÊN ================= */
  'c5-succ-shokuhin-2': {
    scene: '🪞 Thực phẩm năm thứ ba — đối gương: Kiên và chiếc hộp sứt góc',
    branch: [
      { sp: 'narr', text: 'Nhà máy thực phẩm ở Osaka, đầu ca sáng. Chị trưởng ca giao cho {name} kèm một công nhân mới: Kiên, mới sang, nhanh nhẹn, chỉ tội hay làm tắt cho kịp nhịp chuyền. "Tuần đầu của Kiên, em dẫn nhé. Ở xưởng mình, vệ sinh và báo cáo là hai chữ không được tắt."' },
      { sp: 'Chị trưởng ca', jp: '{今日|きょう}から、キエンくんの{指導|しどう}をお{願|ねが}いします。{食品工場|しょくひんこうじょう}で{一番|いちばん}{大事|だいじ}なのは、{衛生|えいせい}と{報告|ほうこく}です。あなたのやり{方|かた}で{教|おし}えてください。', text: 'Chị trưởng ca dặn: "Từ hôm nay, chị nhờ em hướng dẫn Kiên. Ở nhà máy thực phẩm, quan trọng nhất là vệ sinh và báo cáo. Em dạy theo cách của em đi."' },
      { sp: 'Kiên', jp: 'はじめまして、キエンです。よろしくお{願|ねが}いします。ラインの{速|はや}さには、{自信|じしん}があります。', text: 'Kiên chào nhanh, mắt đã liếc về phía dây chuyền: "Em chào senpai, em là Kiên ạ. Mong senpai chỉ bảo. Tốc độ của chuyền thì em tự tin lắm ạ."' },
      { sp: 'hero', jp: 'よろしく。{速|はや}さより{先|さき}に、{手洗|てあら}いと{身|み}だしなみだよ。{鏡|かがみ}の{前|まえ}に{立|た}ってみて。', text: '{name} gật đầu, chỉ về phía bồn rửa: "Chào em. Trước tốc độ là rửa tay và trang phục đã. Đứng trước gương xem nào."' },
      { sp: 'narr', text: 'Tóc của Kiên thò một lọn ra ngoài mũ, và cậu định đi thẳng qua khu sát khuẩn để "kịp giờ vào chuyền". Vào chuyền được hai mươi phút, {name} lại thấy Kiên cầm một chiếc hộp sứt góc, ngập ngừng một giây — rồi đặt trở lại lên chuyền cho trôi đi, miệng lẩm bẩm: "Một cái chắc không sao…"' },
      { sp: 'Anh công nhân', jp: 'おい、キエン。その{容器|ようき}、{角|かど}が{欠|か}けているぞ。ラインに{戻|もど}したのか。', text: 'Anh công nhân đứng chuyền bên cạnh gọi với sang: "Này Kiên. Cái hộp đó sứt góc kìa. Em vừa đặt lại lên chuyền à?"' },
      { sp: 'Kiên', text: '"Dạ… em thấy có một cái thôi, báo cáo thì chuyền chậm lại, em sợ bị chê…" Kiên cúi đầu, tay xoắn vào nhau. "Em xin lỗi ạ."' },
      { sp: 'narr', text: '{name} nhìn chiếc hộp sứt đang trôi xa dần, và nhớ lại ca đầu tiên của chính mình ở xưởng này: cũng một chiếc hộp sứt góc, cũng một giây ngập ngừng — và câu nói của chị trưởng ca cứu cả buổi hôm đó: "Hàng lỗi thì không giấu, báo cáo ngay. Đó là cách bảo vệ người sẽ ăn sản phẩm này." {name} bấm dừng đoạn chuyền, lấy chiếc hộp ra, rồi mới quay sang Kiên.' },
      {
        prompt: 'Kiên vừa cho hộp lỗi trôi qua chuyền và bỏ qua bước vệ sinh cho kịp nhịp. {name} dạy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Một cái cũng là lỗi! Muốn cả lô bị trả về à!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương thực phẩm: mắng kouhai giữa chuyền — Kiên nhớ hàng lỗi bằng nỗi sợ bị chê', say: [
            { sp: 'narr', text: 'Kiên cúi gằm mặt, từ đó trở đi cứ mười phút lại gọi {name} hỏi một lần về những vết xước nhỏ nhất — không phải vì hiểu, mà vì sợ. Nhịp chuyền chậm lại còn nhiều hơn cả khi báo cáo một chiếc hộp lỗi. Anh công nhân lắc đầu: "Dạy bằng sợ thì người ta chỉ học cách giấu khéo hơn thôi."' },
            { sp: 'Chị trưởng ca', text: 'Cuối ca, chị trưởng ca nhắc riêng: "Ngày đầu của em, chị có mắng em vì chiếc hộp sứt không? Chị chỉ nói cho em hiểu vì sao phải báo cáo. Em còn nhớ chứ?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: cùng Kiên lấy hộp lỗi ra, bỏ thùng đỏ và làm lại bước vệ sinh từ đầu', fx: { love: 2, jp: 2 }, note: 'Đối gương thực phẩm: dạy tận tay quy trình hàng lỗi — Kiên nhớ bằng lý do bảo vệ người ăn', say: [
            { sp: 'hero', jp: 'キエンくん、{不良|ふりょう}は{隠|かく}さず、すぐ{報告|ほうこく}だよ。{容器|ようき}はラインから{外|はず}して、{赤|あか}いケースへ。それが{食|た}べる{人|ひと}を{守|まも}ることなんだ。', text: '{name} cùng Kiên bỏ chiếc hộp vào thùng đỏ, giọng đều: "Kiên này, hàng lỗi thì không giấu, báo cáo ngay. Hộp phải lấy ra khỏi chuyền, bỏ vào thùng đỏ. Đó là cách bảo vệ người sẽ ăn sản phẩm này đấy."' },
            { sp: 'Kiên', text: '"…Dạ. Em hiểu rồi ạ." Hai người quay lại khu rửa tay, làm lại từ đầu: rửa theo đúng thứ tự, sát khuẩn, soi gương chỉnh lại mũ cho kín tóc. Lần này Kiên làm chậm — và đúng.' } ] }
        ]
      },
      { sp: 'hero', jp: '{髪|かみ}が{出|で}ていたら、{入|はい}る{前|まえ}に{鏡|かがみ}で{確認|かくにん}して{直|なお}す。{順番|じゅんばん}を{飛|と}ばすと、{後|あと}で{全部|ぜんぶ}やり{直|なお}しになるからね。', text: '{name} chỉ vào tấm gương ở cửa xưởng: "Tóc lộ ra thì soi gương kiểm tra và chỉnh lại trước khi vào. Nhảy bước thì sau đó phải làm lại tất cả, còn chậm hơn đấy."' },
      { sp: 'Anh công nhân', jp: 'このライン、{冷|つめ}たいからな。{中|なか}に{一枚|いちまい}{多|おお}く{着|き}てくるといいよ。{明|あす}からな、キエン。', text: 'Anh công nhân cười hiền với Kiên: "Chuyền này lạnh lắm, mặc thêm một lớp bên trong là đỡ hẳn. Từ mai nhé, Kiên." — câu dặn y hệt anh từng dành cho {name} ngày đầu.' },
      {
        prompt: 'Một chiếc hộp nữa sứt góc trôi tới trước mặt Kiên. Câu kaiwa báo cáo — {name} dạy em ấy nói thế nào?',
        choice: [
          { label: '"Một hộp bị sứt góc ạ. Em đã lấy ra khỏi chuyền và bỏ vào thùng đỏ rồi ạ"', fx: { jp: 2, love: 1 }, note: 'Đối gương thực phẩm: Kiên báo cáo hàng lỗi rành mạch kèm hành động đã xử lý', say: [
            { sp: 'Kiên', jp: '{容器|ようき}が{一|ひと}つ、{角|かど}が{欠|か}けています。ラインから{外|はず}して、{赤|あか}いケースに{入|い}れました。', text: 'Kiên hô to về phía chị trưởng ca, tay cầm chiếc hộp lỗi: "Một hộp bị sứt ở góc ạ. Em đã lấy ra khỏi chuyền và bỏ vào thùng đỏ rồi ạ."' },
            { sp: 'Chị trưởng ca', jp: 'その{判断|はんだん}で{正解|せいかい}です。{数|かず}も、{区切|くぎ}りのいいところで{報告|ほうこく}してくださいね。', text: 'Chị trưởng ca gật đầu từ đầu chuyền: "Phán đoán vậy là đúng đấy. Số lượng cũng nhớ báo cáo ở mốc tròn nhé." — câu khen năm xưa dành cho {name}, nay dành cho kouhai của {call}.' } ] },
          { label: '"Có hộp lỗi ạ" — nói ngắn cho nhanh rồi tự xử lý sau', fx: { jp: 1 }, note: 'Đối gương thực phẩm: Kiên báo cáo cụt — được hero dạy nói đủ cả hiện tượng lẫn xử lý', say: [
            { sp: 'Kiên', jp: '{不良|ふりょう}が{一|ひと}つあります。', text: 'Kiên hô lên, giọng vẫn còn vội: "Có một hàng lỗi ạ."' },
            { sp: 'hero', jp: 'どこがどう{悪|わる}いのか、どう{処理|しょり}したのかまで{言|い}うんだ。「{角|かど}が{欠|か}けています、{外|はず}しました」までが{報告|ほうこく}だよ。', text: '{name} nhắc khẽ: "Phải nói cả chỗ nào hỏng thế nào, và mình đã xử lý ra sao. "Sứt góc ạ, em đã lấy ra rồi" — nói đủ tới đó mới gọi là báo cáo." Kiên gật đầu, hô lại trọn câu, lần này rành mạch.' } ] }
        ]
      },
      { sp: 'Kiên', jp: '{今日|きょう}はありがとうございました。{速|はや}さより、{正|ただ}しさですね。{覚|おぼ}えました。', text: 'Cuối ca, Kiên tháo găng, cúi đầu: "Hôm nay em cảm ơn senpai ạ. Quan trọng hơn tốc độ là làm đúng. Em nhớ rồi ạ."' },
      { sp: 'Chị trưởng ca', jp: '{分|わ}からないことは、ラインが{動|うご}いている{時|とき}でも{声|こえ}をかけてくださいね。…それ、{昔|むかし}あなたにも{言|い}いましたね。', text: 'Chị trưởng ca mỉm cười, nói với cả hai: "Có gì không hiểu thì dù chuyền đang chạy cũng cứ gọi nhé. …Câu này, ngày xưa chị cũng nói với em đấy, {name} ạ."' },
      { sp: 'narr', text: 'Tan ca, {name} nhìn Kiên cẩn thận ghi vào sổ: "hộp lỗi: 1, đã bỏ thùng đỏ, đã báo cáo". Ở nhà máy thực phẩm, "làm đúng" không phải khẩu hiệu treo tường — nó nằm trong từng chiếc hộp sẽ đến tay một người xa lạ nào đó. Hôm nay, bài học ấy đã được trao lại, nguyên vẹn, cho đôi tay tiếp theo.' }
    ]
  },

  /* ================= THỰC PHẨM — TỔNG KẾT NĂM ================= */
  'c5-succ-shokuhin-3': {
    scene: '🏆 Thực phẩm — tổng kết năm: quyết định dừng chuyền cứu cả lô hàng',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của nhà máy thực phẩm diễn ra ở phòng họp nhỏ, cả ca ngồi đủ. Chị trưởng ca đứng dậy, tay cầm bản báo cáo sản xuất của năm và một phong bì thưởng.' },
      { sp: 'Chị trưởng ca', jp: '{今年|ことし}の{一番|いちばん}{大|おお}きな{出来事|できごと}を{話|はなし}ます。あの{日|ひ}、ラインを{止|と}める{判断|はんだん}をした{人|ひと}がいました。', text: 'Chị trưởng ca mở lời: "Tôi kể sự kiện lớn nhất của năm nay. Ngày hôm ấy, có một người đã quyết định cho dừng cả dây chuyền."' },
      { sp: 'Chị trưởng ca', jp: 'その{判断|はんだん}のおかげで、{問題|もんだい}のあるロットは{出荷|しゅっか}されずに{済|す}みました。{止|と}める{勇気|ゆうき}が、{工場|こうじょう}と{食|た}べる{人|ひと}の{両方|りょうほう}を{守|まも}ったんです。', text: '"Nhờ quyết định ấy, lô hàng có vấn đề đã không bị xuất xưởng. Dũng khí bấm nút dừng đã bảo vệ cả nhà máy lẫn người sẽ ăn sản phẩm."' },
      { sp: 'Anh công nhân', jp: 'あの{時|とき}、{周|まわ}りは{皆|みな}{止|と}めるのをためらっていた。{声|こえ}を{上|あ}げたのは、この{人|ひと}だったよ。', text: 'Anh công nhân gật đầu: "Lúc ấy quanh đó ai cũng ngần ngại không dám dừng. Người cất tiếng nói chính là người này."' },
      { sp: 'hero', jp: '{異常|いじょう}に{気|き}づいたら{止|と}めて{報告|ほうこく}する。それは{新|あたら}しい{頃|ころ}に{教|おし}わった{基本|きほん}です。{皆|みな}さんのおかげです。', text: '"Thấy bất thường thì dừng và báo cáo — đó là điều cơ bản em được dạy từ ngày mới vào ạ. Em cảm ơn mọi người ạ."' },
      { sp: 'Chị trưởng ca', jp: 'では、{今年|ことし}の{賞与|しょうよ}です。{工場|こうじょう}からの{気持|きも}ちです。{受|う}け{取|と}ってください。', text: 'Chị trưởng ca trao phong bì: "Đây là tiền thưởng của năm nay. Tấm lòng của nhà máy. Em nhận nhé."' },
      {
        prompt: 'Nhận phong bì thưởng trước cả ca, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。', text: '"Em cảm ơn chị ạ. Em sẽ dùng số tiền này thật trân trọng. Em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Tiếng vỗ tay vang khắp phòng họp nhỏ. Kiên ngồi ở hàng ghế cuối vỗ tay không ngừng — cậu vừa tận mắt thấy nút dừng chuyền mà senpai dạy mình hôm nào có thể cứu cả một lô hàng, và cứu cả một nhà máy.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: '{name} cất phong bì cẩn thận. Quyết định bấm nút dừng ngày ấy từng khiến {call} run suốt một buổi — hôm nay, nó được cả nhà máy gọi tên bằng hai chữ cảm ơn.' } ] }
        ]
      },
      { sp: 'Chị trưởng ca', jp: 'それから、{会社|かいしゃ}からの{支援|しえん}です。あなたの{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、{会社|かいしゃ}が{支援|しえん}します。{書類|しょるい}は{会社|かいしゃ}で{用意|ようい}します。', text: '"Còn việc hỗ trợ từ phía công ty. Công ty sẽ hỗ trợ em chuyển lên Tokutei Ginou số 2. Giấy tờ công ty sẽ chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn chị ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Chị trưởng ca', jp: 'あなたの{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてください。{在職証明書|ざいしょくしょうめいしょ}は{会社|かいしゃ}が{出|だ}します。', text: '"Phần của em là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang làm việc công ty sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong chị chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Ra khỏi phòng họp, {name} đi ngang qua dây chuyền đang chạy đều trong ca chiều. Ba năm trước, {call} là người mới học cách rửa tay theo đúng thứ tự. Ba năm sau, {call} là người mà cả nhà máy nhắc tới khi nói về hai chữ "dừng chuyền" — và là người được công ty bảo lãnh để ở lại lâu dài.' }
    ]
  },

  /* ================= CƠ KHÍ — ĐỐI GƯƠNG: LONG ================= */
  'c5-succ-seizo-2': {
    scene: '🪞 Cơ khí năm thứ ba — đối gương: Long và tiếng kêu lạ của máy',
    branch: [
      { sp: 'narr', text: 'Xưởng cơ khí ở Nagoya, đầu ca. Senpai Kudo giao cho {name} một việc mới: kèm Long, công nhân vừa vào xưởng, tay nghề ở quê có sẵn nên rất tự tin vào phán đoán của mình. "Nó giỏi tay, nhưng tai nó chưa quen xưởng này. Mày dạy nó bài đầu tiên đi."' },
      { sp: 'Senpai Kudo', jp: '{今日|きょう}から、ロンくんはお{前|まえ}の{後輩|こうはい}だ。{最初|さいしょ}の{約束|やくそく}から{教|おし}えてやれ。{異常|いじょう}があったら、どうするかだ。', text: 'Senpai Kudo nói gọn: "Từ hôm nay Long là kouhai của mày. Dạy nó từ lời hứa đầu tiên đi: có bất thường thì làm gì."' },
      { sp: 'Long', jp: 'はじめまして、ロンです。よろしくお{願|ねが}いします。{機械|きかい}の{音|おと}は、{国|くに}でもよく{聞|き}いていました。', text: 'Long chào to, vỗ ngực: "Em chào senpai, em là Long ạ. Mong senpai chỉ bảo. Tiếng máy thì ở quê em nghe quen rồi ạ."' },
      { sp: 'hero', jp: 'よろしく。じゃあ{約束|やくそく}を{先|さき}に{言|い}うね。{異常|いじょう}があったら、まず{止|と}める、{呼|よ}ぶ、{待|ま}つ。{自分|じぶん}で{判断|はんだん}しないこと。', text: '{name} gật đầu, nói ngay điều quan trọng nhất: "Chào em. Vậy mình nói lời hứa trước nhé: có bất thường thì trước hết dừng, gọi, chờ. Không tự phán đoán."' },
      { sp: 'narr', text: 'Chưa đầy một giờ sau, chiếc máy của Long phát ra một tiếng "cạch… cạch…" lạ, nhịp không đều. Long nghiêng tai nghe một giây, nhún vai: "Chắc không sao đâu ạ, máy cũ nào chả kêu" — rồi để máy chạy tiếp, tay vẫn thao tác như thường. Senpai Kudo từ chuyền bên cạnh đã đứng dậy.' },
      { sp: 'Senpai Kudo', jp: 'おい、ロン。その{音|おと}、いつもと{違|ちが}うだろ。なぜ{止|と}めなかった。', text: 'Senpai Kudo gằn giọng: "Này Long. Tiếng đó khác mọi khi, đúng không. Sao không dừng máy?"' },
      { sp: 'Long', text: '"Dạ… em tưởng tiếng nhỏ thế này thì chưa tới mức ạ." Long cúi đầu, giọng nhỏ dần. "Em sợ dừng máy hoài thì bị chê là nhát tay…"' },
      { sp: 'narr', text: '{name} đã kịp bấm nút dừng trước khi senpai tới nơi. Nhìn Long cúi đầu, {call} nhớ lại buổi đầu của chính mình ở xưởng này: cũng từng học thuộc ba chữ "dừng — gọi — chờ" như một câu thần chú cứu mạng, và senpai Kudo đã nói "đừng quên câu đó đấy" bằng giọng còn lạnh hơn hôm nay. Câu mắng sắp ra khỏi miệng {name} được thay bằng một cái gật đầu với senpai: để em nói với nó.' },
      {
        prompt: 'Long nghe tiếng lạ mà vẫn cho máy chạy tiếp vì sợ bị chê nhát tay. {name} dạy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Tai để làm cảnh à! Máy hỏng thì ai đền!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương cơ khí: mắng kouhai giữa xưởng — Long nhớ tiếng máy bằng nỗi sợ bị đền', say: [
            { sp: 'narr', text: 'Long đứng im như tượng, từ đó trở đi cứ nghe bất cứ tiếng động nào lạ là cậu giật mình bấm dừng — cả những tiếng bình thường của xưởng — khiến chuyền khựng lại liên tục. Senpai Kudo lắc đầu: "Mắng cho nó sợ thì nó dừng bừa. Dạy cho nó hiểu thì nó dừng đúng lúc."' },
            { sp: 'Senpai Kudo', text: 'Cuối ca, senpai gọi {name} ra: "Ngày đầu của mày, tao mắng mày câu nào chưa? Tao chỉ bắt mày nhắc lại ba chữ đó. Nhớ không?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: cùng Long nghe lại tiếng máy đã dừng và giải thích ba bước dừng — gọi — chờ', fx: { love: 2, jp: 2 }, note: 'Đối gương cơ khí: dạy tận tay ba bước xử lý bất thường — Long nhớ bằng đôi tai', say: [
            { sp: 'hero', jp: 'ロン、{音|おと}の{違|ちが}いに{気|き}づいた{時点|じてん}で、{仕事|しごと}の{半分|はんぶん}はできているんだ。あとは{止|と}める{勇気|ゆうき}だけだよ。{止|と}める、{呼|よ}ぶ、{待|ま}つ。{順番|じゅんばん}を{体|からだ}で{覚|おぼ}えよう。', text: '{name} cho Long đứng cạnh chiếc máy đã dừng, nói chậm: "Long này, nghe ra được tiếng khác lạ là em đã làm được nửa công việc rồi. Nửa còn lại chỉ là dũng khí bấm dừng thôi. Dừng, gọi, chờ — mình học thuộc thứ tự này bằng người thật việc thật nhé."' },
            { sp: 'Long', text: '"…Dạ." Long tự tay đặt lên nút dừng, nhắc lại ba chữ như học thuộc lòng: "Dừng… gọi… chờ…" Lần này, trong giọng cậu không còn chút nhún vai nào.' } ] }
        ]
      },
      { sp: 'hero', jp: 'あと5Sも{同|おな}じだよ。{道具|どうぐ}は{決|き}まった{場所|ばしょ}に{戻|もど}す。{使|つか}わない{物|もの}は{分|わ}ける。{基本|きほん}が{全体|ぜんたい}を{守|まも}るんだ。', text: '{name} chỉ vào bảng dụng cụ sau lưng: "5S cũng cùng một lẽ. Dụng cụ trả về đúng chỗ quy định, đồ không dùng thì phân loại ra. Điều cơ bản giữ cho cả chuyền an toàn."' },
      { sp: 'Senpai Kudo', jp: 'その{言葉|ことば}、わすれるなよ。…お{前|まえ}が{言|い}うと、{重|おも}みが{違|ちが}うな。', text: 'Senpai Kudo khoanh tay, khẽ gật đầu với {name}: "Đừng quên câu đó đấy. …Mày nói câu đó, sức nặng khác hẳn rồi." — chính câu senpai từng dặn {name} ngày đầu, nguyên văn.' },
      {
        prompt: 'Chiều hôm đó, một chiếc máy khác lại kêu lạ. Câu kaiwa báo cáo — {name} để Long tự nói thế nào?',
        choice: [
          { label: '"Có bất thường ạ. Em đã dừng máy, xin senpai tới xem giúp ạ" — đủ cả hiện tượng lẫn hành động', fx: { jp: 2, love: 1 }, note: 'Đối gương cơ khí: Long báo cáo bất thường đúng ba bước ngay trong ngày đầu được dạy', say: [
            { sp: 'Long', jp: '{異常|いじょう}があります。{機械|きかい}を{止|と}めました。{先輩|せんぱい}、{確認|かくにん}をお{願|ねが}いします。', text: 'Long hô to, tay chỉ vào chiếc máy đã dừng: "Có bất thường ạ. Em đã dừng máy rồi. Senpai, xin tới xác nhận giúp em ạ."' },
            { sp: 'narr', text: 'Senpai Kudo tới nơi, nghe máy, gật đầu: chỉ là một con ốc lỏng — lỏng thêm một ca nữa là thành sự cố thật. Ông vỗ vai Long một cái, không nói gì thêm. Cái vỗ vai ấy ở xưởng này nặng hơn mọi lời khen.' } ] },
          { label: '"Máy kêu lạ ạ" — hô lên là được, chi tiết tính sau', fx: { jp: 1 }, note: 'Đối gương cơ khí: Long báo cáo thiếu — được hero dạy nói kèm trạng thái đã xử lý', say: [
            { sp: 'Long', jp: '{機械|きかい}からへんな{音|おと}がします。', text: 'Long hô lên từ đầu chuyền: "Máy phát tiếng lạ ạ!"' },
            { sp: 'hero', jp: '{止|と}めたかどうかも{一緒|いっしょ}に{言|い}うんだ。「{止|と}めました、{来|き}てください」までが{報告|ほうこく}だよ。もう{一回|いっかい}、{大|おお}きな{声|こえ}で。', text: '{name} nhắc ngay: "Phải nói kèm là đã dừng máy chưa nữa. "Em đã dừng rồi, xin tới xem giúp" — nói đủ tới đó mới là báo cáo. Thêm lần nữa, to lên." Long hô lại trọn câu, và cả chuyền nghe rõ từng chữ.' } ] }
        ]
      },
      { sp: 'Long', jp: '{今日|きょう}はありがとうございました。{止|と}める{勇気|ゆうき}、{覚|おぼ}えました。', text: 'Cuối ca, Long lau tay, cúi đầu: "Hôm nay em cảm ơn senpai ạ. Dũng khí bấm nút dừng — em nhớ rồi ạ."' },
      { sp: 'Senpai Kudo', jp: '{声|こえ}がでかいのはいいことだ。{工場|こうじょう}は{声|こえ}でまわる。お{前|まえ}の{後輩|こうはい}も、{同|おな}じだな。', text: 'Senpai Kudo nhìn hai thầy trò, nói một câu cũ mà mới: "Giọng to là tốt đấy. Xưởng này vận hành bằng tiếng hô mà. Kouhai của mày cũng thế rồi đấy."' },
      { sp: 'narr', text: 'Tan ca, {name} đi ngang bảng 5S, chợt mỉm cười: ba năm trước mình là người được bắt nhắc lại ba chữ "dừng — gọi — chờ" trong run rẩy. Hôm nay, ba chữ ấy vang lên từ miệng một người mới khác, to và rõ. Ở xưởng này, báo cáo nhanh và trung thực quý hơn tay nghề — và bài học ấy vừa có thêm một người giữ.' }
    ]
  },

  /* ================= CƠ KHÍ — TỔNG KẾT NĂM ================= */
  'c5-succ-seizo-3': {
    scene: '🏆 Cơ khí — tổng kết năm: cứu hạn giao hàng cho khách lớn',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của xưởng Nagoya tổ chức ở phòng họp tầng hai, cả chuyền ngồi đủ. Sếp xưởng đứng dậy, tay cầm biểu đồ giao hàng của năm — và một phong bì thưởng đặt ngay ngắn trên bàn.' },
      { sp: 'Sếp xưởng', jp: '{今年|ことし}の{一番|いちばん}{大|おお}きな{仕事|しごと}を{話|はなし}ます。あの{大口|おおぐち}の{注文|ちゅうもん}、{納期|のうき}まであと{三日|みっか}という{時|とき}のことです。', text: 'Sếp xưởng mở lời: "Tôi kể công việc lớn nhất của năm nay. Đơn hàng của khách lớn ấy — khi ấy chỉ còn ba ngày là tới hạn giao."' },
      { sp: 'Sếp xưởng', jp: 'ラインの{組|く}み{直|なお}しを{提案|ていあん}して、{夜|よる}まで{残|のこ}って{調整|ちょうせい}した{人|ひと}がいます。その{判断|はんだん}で、{納期|のうき}に{間|ま}に{合|あ}いました。{会社|かいしゃ}の{信用|しんよう}を{守|まも}った{仕事|しごと}でした。', text: '"Có một người đã đề xuất sắp xếp lại chuyền, ở lại tới đêm để điều chỉnh. Nhờ phán đoán ấy, chúng ta giao hàng kịp hạn. Đó là công việc đã giữ được uy tín của công ty."' },
      { sp: 'Senpai Kudo', jp: 'あの{三日間|みっかかん}、{声|こえ}の{出|だ}し{方|かた}も、{報告|ほうこく}の{早|はや}さも、{一人前|いちにんまえ}だった。{認|みと}めるよ。', text: 'Senpai Kudo nói ngắn mà nặng: "Ba ngày ấy, từ cách hô đến tốc độ báo cáo của cậu đều đã là thợ lành nghề rồi. Tôi công nhận đấy."' },
      { sp: 'hero', jp: '{皆|みな}さんが{協力|きょうりょく}してくれたおかげです。{一人|ひとり}では、とても{間|ま}に{合|あ}いませんでした。ありがとうございます。', text: '"Đó là nhờ mọi người đã hợp sức cùng em ạ. Một mình em thì không thể nào kịp được. Em cảm ơn mọi người ạ."' },
      { sp: 'Sếp xưởng', jp: 'では、{今年|ことし}の{賞与|しょうよ}です。{会社|かいしゃ}からの{気持|きも}ちです。{受|う}け{取|と}ってください。', text: 'Sếp xưởng trao phong bì: "Đây là tiền thưởng của năm nay. Tấm lòng của công ty. Cậu nhận nhé."' },
      {
        prompt: 'Nhận phong bì thưởng trước cả chuyền, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。', text: '"Em cảm ơn sếp ạ. Em sẽ dùng số tiền này thật trân trọng. Em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Tiếng vỗ tay vang khắp phòng họp. Long ngồi ở cuối bàn nhìn senpai của mình không chớp mắt — ba ngày cứu hạn giao hàng ấy, cậu chỉ nghe kể lại, và hôm nay mới thấy cái giá của ba chữ "dừng — gọi — chờ" khi được dùng đúng lúc.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: '{name} cất phong bì vào túi áo bảo hộ. Ở xưởng này, lời khen không nhiều — nên mỗi lời khen đều được giữ gìn như một chiếc tem đóng vào hồ sơ của cả một năm.' } ] }
        ]
      },
      { sp: 'Sếp xưởng', jp: 'それから、{会社|かいしゃ}からの{支援|しえん}です。あなたの{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、{会社|かいしゃ}が{支援|しえん}します。{書類|しょるい}は{会社|かいしゃ}で{用意|ようい}します。', text: '"Còn việc hỗ trợ từ phía công ty. Công ty sẽ hỗ trợ cậu chuyển lên Tokutei Ginou số 2. Giấy tờ công ty sẽ chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn sếp ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Sếp xưởng', jp: 'あなたの{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてください。{在職証明書|ざいしょくしょうめいしょ}は{会社|かいしゃ}が{出|だ}します。', text: '"Phần của cậu là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang làm việc công ty sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong sếp chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Ra khỏi phòng họp, {name} đi xuống chuyền, tay chạm nhẹ lên chiếc máy đầu tiên mình từng đứng cạnh trong run rẩy. Ba năm sau, {call} là người cứu hạn giao hàng cho khách lớn nhất của xưởng — và là người được công ty bảo lãnh để đi tiếp, lâu dài, trên đất này.' }
    ]
  },

  /* ================= SỬA XE — ĐỐI GƯƠNG: VŨ ================= */
  'c5-succ-seibi-2': {
    scene: '🪞 Sửa xe năm thứ ba — đối gương: Vũ và phiếu tiếp nhận đầu tiên',
    branch: [
      { sp: 'narr', text: 'Xưởng sửa ô tô nhỏ ở Toyota, buổi sáng. Chủ xưởng giao cho {name} kèm một thợ học việc mới: Vũ, nhanh miệng, mê xe, thuộc tên dụng cụ nhanh hơn ai hết. "Hôm nay có khách tới, để nó tiếp nhận thử. Mày đứng cạnh, xem nó nghe khách được tới đâu."' },
      { sp: 'Chủ xưởng', jp: '{今日|きょう}から、ヴーくんの{指導|しどう}をお{願|ねが}いします。{整備|せいび}は{直|なお}す{前|まえ}に{聞|き}くことから{始|はじ}まります。その{順番|じゅんばん}を{教|おし}えてください。', text: 'Chủ xưởng dặn: "Từ hôm nay, tôi nhờ cậu hướng dẫn Vũ. Sửa xe bắt đầu từ việc nghe, trước cả việc sửa. Cậu dạy cho nó thứ tự ấy nhé."' },
      { sp: 'Vũ', jp: 'はじめまして、ヴーです。よろしくお{願|ねが}いします。{車|くるま}の{音|おと}なら、だいたい{分|わ}かります。', text: 'Vũ chào to, đầy tự tin: "Em chào senpai, em là Vũ ạ. Mong senpai chỉ bảo. Tiếng xe thì em nghe là đoán được kha khá ạ."' },
      { sp: 'hero', jp: 'よろしく。まず{受付|うけつけ}だね。{音|おと}の{情報|じょうほう}があると、{点検|てんけん}の{順番|じゅんばん}が{決|き}めやすい。{決|き}めつけずに、まず{聞|き}こう。', text: '{name} gật đầu, dặn trước: "Chào em. Trước hết là tiếp nhận nhé. Có thông tin về tiếng kêu thì dễ quyết định thứ tự kiểm tra. Đừng phán quyết vội — nghe trước đã."' },
      { sp: 'narr', text: 'Vị khách quen lái chiếc xe quen thuộc vào xưởng: "Lúc chạy thì nghe lạch cạch, dừng thì hết." Vũ nghe tới đó đã phán ngay: "Chắc chắn là phanh rồi ạ, để em tháo ra xem!" — rồi cầm phiếu tiếp nhận ghi đúng hai dòng cụt lủn: tên khách và chữ "kêu lạch cạch". Điều kiện phát tiếng, tốc độ, thời tiết — không một chữ.' },
      { sp: 'Khách quen', jp: 'あのさ、{早|はや}く{走|はし}ると{音|おと}も{早|はや}くなるんだ。{朝|あさ}の{寒|さむ}いときが、とくにひどくてさ。', text: 'Vị khách nói thêm, như mọi khi: "À này, chạy nhanh thì tiếng cũng nhanh theo. Sáng lạnh là bị nặng nhất đấy."' },
      { sp: 'Vũ', text: '"Dạ… vậy không phải phanh rồi ạ…" Vũ đỏ mặt, nhìn tờ phiếu hai dòng của mình. "Em phán nhanh quá. Mà ghi thiếu thế này thì biết kiểm tra từ đâu…"' },
      { sp: 'narr', text: '{name} nhìn tờ phiếu cụt lủn ấy và nhớ chiếc phiếu tiếp nhận đầu tiên của chính mình — kín chữ, không một dòng đoán mò — cùng câu nói của chủ xưởng hôm đó: "Tiếp nhận tốt lắm. Sửa xe bắt đầu từ việc nghe." Vũ chưa được ai dạy kỹ điều đó. Câu mắng "phán bừa" vừa lên tới miệng {name} đã được nuốt xuống.' },
      {
        prompt: 'Vũ vừa phán bệnh ngay khi nghe tiếng và ghi phiếu thiếu hết điều kiện. {name} dạy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Chưa kiểm tra đã phán, khách mất tiền oan thì sao!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương sửa xe: mắng kouhai trước mặt khách — Vũ nhớ phiếu tiếp nhận bằng nỗi sợ', say: [
            { sp: 'narr', text: 'Vũ cúi gằm mặt ngay trước mặt khách, cả buổi sáng còn lại làm gì cũng hỏi lại hai lần, ghi phiếu dài dòng cả những thứ không cần thiết — vì sợ, không phải vì hiểu. Chủ xưởng lắc đầu: "Mắng trước mặt khách là mất cả hai: mất thợ và mất khách."' },
            { sp: 'Chủ xưởng', text: 'Cuối ngày, chủ xưởng nhắc riêng {name}: "Phiếu đầu tiên của cậu kín chữ là vì có người dạy cậu nghe. Không ai mắng cậu để cậu viết được thế đâu."' } ] },
          { label: 'Bình tĩnh chỉ tận tay: cùng Vũ hỏi lại khách từ đầu và ghi phiếu ngay trước mặt em ấy', fx: { love: 2, jp: 2 }, note: 'Đối gương sửa xe: dạy tận tay cách nghe và ghi điều kiện — Vũ nhớ bằng tờ phiếu kín chữ', say: [
            { sp: 'hero', jp: 'ヴーくん、{音|おと}は{情報|じょうほう}だよ。いつ、どんな{時|とき}に、どう{変|か}わるか。{決|き}めつけずに{聞|き}き{直|なお}して、{受付表|うけつけひょう}に{全部|ぜんぶ}{書|か}こう。{一緒|いっしょ}にやるから。', text: '{name} kéo ghế ngồi cạnh Vũ, giọng đều: "Vũ này, tiếng kêu là thông tin đấy. Khi nào kêu, trong điều kiện gì, thay đổi ra sao. Mình không phán quyết — hỏi lại từ đầu và ghi hết vào phiếu tiếp nhận. Anh/chị làm cùng em."' },
            { sp: 'Vũ', text: '"Dạ…" Vũ cầm lại cây bút, lần này hỏi từng câu một, ghi từng dòng một. Tờ phiếu dần kín chữ — và trong mắt cậu, vị khách từ một "ca bệnh" thành một người đang kể câu chuyện của chiếc xe.' } ] }
        ]
      },
      { sp: 'hero', jp: 'かしこまりました。カラカラという{音|おと}は、{走行中|そうこうちゅう}だけで、{停止時|ていしじ}はしないですね。{速度|そくど}で{変|か}わりますか。', text: '{name} làm mẫu câu hỏi xác nhận cho Vũ nghe: "Tôi rõ rồi ạ. Tiếng lạch cạch chỉ có khi xe chạy, lúc dừng thì không — đúng không ạ? Tiếng có thay đổi theo tốc độ không ạ?"' },
      { sp: 'Chủ xưởng', jp: 'いい{受付|うけつけ}だ。…お{前|まえ}が{教|おし}えると、{若|わか}いのもすぐ{丁寧|ていねい}になるな。', text: 'Chủ xưởng đọc tờ phiếu mới, gật đầu: "Tiếp nhận tốt đấy. …Cậu dạy thì đứa trẻ nào cũng sớm chu đáo nhỉ."' },
      {
        prompt: 'Đến phần chốt phiếu với khách — câu kaiwa báo cách liên lạc kết quả. {name} dạy Vũ nói thế nào?',
        choice: [
          { label: '"Cháu đã ghi chi tiết vào phiếu ạ. Kết quả kiểm tra cháu sẽ gọi điện báo ạ"', fx: { jp: 2, love: 1 }, note: 'Đối gương sửa xe: Vũ chốt phiếu tiếp nhận chuẩn mực ngay ngày đầu được dạy', say: [
            { sp: 'Vũ', jp: '{音|おと}の{出|で}る{条件|じょうけん}を{受付表|うけつけひょう}にくわしく{書|か}きました。{点検|てんけん}の{結果|けっか}はお{電話|でんわ}でご{連絡|れんらく}します。', text: 'Vũ nói chậm, rõ, mắt nhìn khách: "Cháu đã ghi chi tiết điều kiện phát tiếng vào phiếu tiếp nhận ạ. Kết quả kiểm tra cháu sẽ gọi điện báo ạ."' },
            { sp: 'Khách quen', jp: 'お、{丁寧|ていねい}だね。じゃあたのむよ。{夕方|ゆうがた}までにわかるとたすかる。', text: 'Vị khách gật gù: "Ồ, chu đáo nhỉ. Vậy nhờ nhé. Biết kết quả trước chiều tối thì tốt quá." — câu đáp y hệt ông từng dành cho {name} ngày đầu.' } ] },
          { label: '"Để em xem rồi tính ạ" — nói chung chung cho qua lượt', fx: { jp: 1 }, note: 'Đối gương sửa xe: Vũ nói chung chung — được hero dạy chốt việc bằng cam kết cụ thể', say: [
            { sp: 'Vũ', jp: 'じゃあ、{見|み}てから{考|かんが}えます。', text: 'Vũ nói qua loa, tay đã quay đi lấy dụng cụ: "Vậy để em xem rồi tính ạ."' },
            { sp: 'hero', jp: 'お{客様|きゃくさま}には、{何|なに}をして、いつ{連絡|れんらく}するかまで{言|い}うんだ。「{結果|けっか}はお{電話|でんわ}でご{連絡|れんらく}します」までが{受付|うけつけ}だよ。', text: '{name} nhắc khẽ: "Với khách, phải nói rõ mình sẽ làm gì và khi nào liên lạc lại. "Kết quả cháu sẽ gọi điện báo ạ" — nói đủ tới đó mới hết phần tiếp nhận." Vũ quay lại, cúi đầu và nói lại trọn câu với khách.' } ] }
        ]
      },
      { sp: 'Vũ', jp: '{今日|きょう}はありがとうございました。{聞|き}くことが、{最初|さいしょ}の{技術|ぎじゅつ}ですね。', text: 'Cuối ngày, Vũ cất phiếu vào tủ hồ sơ, cúi đầu: "Hôm nay em cảm ơn senpai ạ. Nghe cho hết — đó là kỹ thuật đầu tiên, đúng không ạ?"' },
      { sp: 'Chủ xưởng', jp: '{使|つか}った{道具|どうぐ}はそのつど{元|もと}の{場所|ばしょ}に{戻|もど}す。それも{教|おし}えたか。…いい{先輩|せんぱい}になったな。', text: 'Chủ xưởng cười hiền: "Dụng cụ dùng xong trả về chỗ cũ ngay — điều đó cũng dạy nó rồi chứ? …Cậu thành một senpai tốt rồi đấy."' },
      { sp: 'narr', text: 'Tan ca, {name} nhìn Vũ cẩn thận treo lại từng chiếc cờ lê đúng vị trí. Ở xưởng này, nghe khách cho hết câu cũng là một kỹ thuật — và hôm nay, kỹ thuật ấy đã có người thứ hai trong xưởng giữ nó bằng cả hai tay.' }
    ]
  },

  /* ================= SỬA XE — TỔNG KẾT NĂM ================= */
  'c5-succ-seibi-3': {
    scene: '🏆 Sửa xe — tổng kết năm: ca điện khó và vị khách thành thân',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của xưởng nhỏ ở Toyota chỉ có vài người ngồi quanh chiếc bàn làm việc đã dọn sạch dụng cụ. Chủ xưởng rót trà, rồi mở lời bằng một câu chuyện mà cả xưởng đều biết.' },
      { sp: 'Chủ xưởng', jp: '{今年|ことし}の{話|はなし}を{一|ひと}つ。あの{電気系統|でんきけいとう}の{故障|こしょう}、{他|ほか}の{店|みせ}で{二回|にかい}{断|ことわ}られた{車|くるま}だ。', text: 'Chủ xưởng nói chậm rãi: "Tôi kể một chuyện của năm nay. Ca hỏng hệ thống điện ấy — chiếc xe đã bị hai xưởng khác từ chối nhận."' },
      { sp: 'Chủ xưởng', jp: 'それを{最後|さいご}まで{追|お}って、きれいに{直|なお}したのが、この{人|ひと}だ。お{客様|きゃくさま}は{今|いま}や{常連|じょうれん}さんだ。{感謝|かんしゃ}の{言葉|ことば}を、{何回|なんかい}もいただいている。', text: '"Người theo tới cùng và xử lý gọn gàng ca ấy chính là người này. Vị khách đó giờ đã thành khách quen thân của xưởng. Lời cảm ơn của ông ấy, chúng ta nhận được không biết bao lần."' },
      { sp: 'Khách quen', jp: 'あんたが{音|おと}の{話|はなし}を{最後|さいご}まで{聞|き}いてくれたからだよ。{車|くるま}も{人|ひと}も、{同|おな}じだな。', text: 'Vị khách quen — ghé xưởng chơi cuối năm — cười nói vọng vào: "Là nhờ cậu nghe câu chuyện tiếng kêu của tôi tới cuối đấy. Xe với người, hóa ra giống nhau."' },
      { sp: 'hero', jp: '{皆|みな}さんに{教|おし}わったことの{積|つ}み{重|かさ}ねです。{一人|ひとり}ではできませんでした。ありがとうございます。', text: '"Đó là nhờ những điều em được mọi người dạy, tích lại từng chút ạ. Một mình em không làm được đâu ạ. Em cảm ơn mọi người ạ."' },
      { sp: 'Chủ xưởng', jp: 'では、{今年|ことし}の{賞与|しょうよ}だ。{少|すこ}しだが、{店|みせ}の{気持|きも}ちだ。{受|う}け{取|と}ってくれ。', text: 'Chủ xưởng chìa phong bì: "Đây là tiền thưởng năm nay. Không nhiều, nhưng là tấm lòng của xưởng. Cậu nhận đi."' },
      {
        prompt: 'Nhận phong bì thưởng từ tay chủ xưởng, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。', text: '"Em cảm ơn bác ạ. Em sẽ dùng số tiền này thật trân trọng. Em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Cả xưởng vỗ tay — tiếng vỗ tay ít người mà ấm. Vũ vỗ to nhất: ca điện khó ấy, cậu chỉ được nghe kể lại như một huyền thoại nhỏ của xưởng, và hôm nay huyền thoại ấy đang ngồi ngay cạnh cậu.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: '{name} cất phong bì vào túi áo. Ở xưởng nhỏ này, tiền thưởng không lớn — lớn là câu nói đi kèm của chủ xưởng, và vị khách quen đang ngồi uống trà như người nhà.' } ] }
        ]
      },
      { sp: 'Chủ xưởng', jp: 'それから、{店|みせ}からの{支援|しえん}だ。お{前|まえ}の{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、{店|みせ}が{支援|しえん}する。{書類|しょるい}は{店|みせ}で{用意|ようい}する。', text: '"Còn việc hỗ trợ từ phía xưởng. Việc chuyển tư cách của cậu lên Tokutei Ginou số 2, xưởng sẽ hỗ trợ. Giấy tờ xưởng chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn bác ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Chủ xưởng', jp: 'お{前|まえ}の{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}だ。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてくれ。{他|ほか}は{店|みせ}が{出|だ}す。', text: '"Phần của cậu là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Còn lại xưởng lo."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong bác chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Chiều cuối năm, {name} đóng cửa xưởng, nhìn lần cuối bảng dụng cụ treo ngay ngắn. Ba năm trước, chiếc phiếu tiếp nhận đầu tiên của {call} kín chữ vì có người dạy nghe. Ba năm sau, {call} xử lý gọn ca điện mà hai xưởng khác đã từ chối — và được xưởng đứng ra bảo lãnh cho tương lai dài lâu.' }
    ]
  },

  /* ================= KHO VẬN — ĐỐI GƯƠNG: LAN ================= */
  'c5-succ-soko-2': {
    scene: '🪞 Kho vận năm thứ ba — đối gương: Lan và tiếng hô đối chiếu',
    branch: [
      { sp: 'narr', text: 'Trung tâm logistics ở Chiba, đầu ca đêm. Anh trưởng kho giao cho {name} kèm một nhân viên mới: Lan, nhỏ người, nhanh tay, làm gì cũng muốn xong sớm để được khen nhanh. " Tuần đầu của Lan, em dẫn nhé. Kho mình chạy bằng tiếng hô và sự đối chiếu — dạy nó từ kiện hàng đầu tiên."' },
      { sp: 'Anh trưởng kho', jp: '{今日|きょう}から、ランさんの{指導|しどう}をお{願|ねが}いします。{夜|よる}のうちに{荷物|にもつ}をさばくのが{仕事|しごと}です。{最初|さいしょ}の{一箱|ひとはこ}から、あなたのやり{方|かた}で{教|おし}えてください。', text: 'Anh trưởng kho dặn: "Từ hôm nay, tôi nhờ cậu hướng dẫn Lan. Việc của mình là xử lý hàng trong đêm. Từ kiện hàng đầu tiên, cậu dạy theo cách của cậu đi."' },
      { sp: 'Lan', jp: 'はじめまして、ランです。よろしくお{願|ねが}いします。{荷物|にもつ}を{分|わ}けるのは、{速|はや}くできます。', text: 'Lan chào nhanh, tay đã đeo găng sẵn: "Em chào senpai, em là Lan ạ. Mong senpai chỉ bảo. Phân loại hàng thì em làm nhanh lắm ạ."' },
      { sp: 'hero', jp: 'よろしく。{速|はや}さより{先|さき}に、{番号|ばんごう}を{声|こえ}に{出|だ}して{読|よ}むこと。{呼|よ}び{合|あ}わせって{言|い}うんだよ。{一緒|いっしょ}にやろう。', text: '{name} gật đầu, cầm kiện hàng đầu tiên lên: "Chào em. Trước tốc độ là đọc to mã kiện hàng. Gọi là hô đối chiếu đấy. Mình làm cùng nhau nhé."' },
      { sp: 'narr', text: 'Nhưng chỉ sau nửa giờ, nhịp kho dồn dập cuốn Lan đi: cô bé ngừng hô mã từ lúc nào, mắt chỉ liếc qua số rồi đặt hàng lên băng theo cảm giác. Một kiện quét ra màn hình đỏ chót — lỗi — Lan vẫn cho trôi qua, miệng lẩm bẩm: "Chắc máy quét nhầm thôi ạ." Kiện hàng ấy suýt lên nhầm băng tuyến Ichikawa thay vì Funabashi.' },
      { sp: 'Chị nhân viên kho', jp: 'ランちゃん、{待|ま}って。その{荷物|にもつ}、{画面|がめん}が{赤|あか}かったよ。{行|ゆ}き{先|さき}の{札|ふだ}、{見|み}た。', text: 'Chị nhân viên kho gọi giật lại: "Lan, khoan đã. Kiện đó màn hình hiện đỏ kìa. Thẻ điểm đến, em đã nhìn chưa?"' },
      { sp: 'Lan', text: '"Dạ… em thấy đỏ nhưng tưởng máy lỗi ạ…" Lan cúi đầu, giọng lí nhí. "Em sợ hô to thì chậm, mà chậm thì bị chê…"' },
      { sp: 'narr', text: '{name} vớt kiện hàng sai tuyến trở lại, và chợt nhớ đêm đầu tiên của chính mình ở kho này: hô mã đến khản giọng, được dạy rằng màn hình đỏ là dừng ngay và báo cáo, rằng kho vận không chạy bằng sức mà chạy bằng tiếng hô và sự đối chiếu. Lan chưa được ai nói kỹ điều đó — em ấy chỉ đang cố nhanh. {name} hạ giọng, đứng vào vị trí đối diện Lan như một cặp hô đối chiếu đúng nghĩa.' },
      {
        prompt: 'Lan bỏ hô đối chiếu, cho kiện lỗi màn hình đỏ trôi qua và suýt gửi sai tuyến. {name} dạy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Đỏ mà còn cho qua! Hàng đi lạc thì ai chịu!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương kho vận: mắng kouhai giữa ca đêm — Lan nhớ màn hình đỏ bằng nỗi sợ', say: [
            { sp: 'narr', text: 'Lan giật mình, từ đó trở đi kiện nào cũng dừng lại nhìn {name} chờ gật đầu mới dám đặt lên băng — nhịp cả line chậm hẳn. Chị nhân viên kho lắc đầu: "Dạy bằng sợ thì người ta chỉ học cách chờ lệnh. Kho này cần người biết tự dừng đúng lúc."' },
            { sp: 'Anh trưởng kho', text: 'Gần cuối ca, anh trưởng kho nhắc riêng: "Đêm đầu của cậu ở đây, có ai mắng cậu không? Người ta hô cùng cậu kiện đầu tiên, đúng không?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: đứng đối diện hô đối chiếu cùng Lan và giải thích màn hình đỏ là điểm dừng', fx: { love: 2, jp: 2 }, note: 'Đối gương kho vận: dạy tận tay bằng hô đối chiếu — Lan nhớ bằng tiếng hô của chính mình', say: [
            { sp: 'hero', jp: 'ランさん、{番号|ばんごう}は{声|こえ}に{出|だ}して、{二人|ふたり}で{確認|かくにん}し{合|あ}うんだ。{画面|がめん}が{赤|あか}くなったらエラー。{止|と}まって、{報告|ほうこく}する。それがこの{仕事|しごと}の{約束|やくそく}だよ。', text: '{name} cầm kiện hàng lên, đọc to mã số trước: "Lan này, mã số phải đọc to lên, hai người đối chiếu xác nhận với nhau. Màn hình đỏ là lỗi — dừng lại và báo cáo. Đó là lời hứa của công việc này đấy."' },
            { sp: 'Lan', text: '"Dạ…" Lan đứng đối diện, đọc lại mã số theo, lần này to và rõ. Đôi vai em ấy thả lỏng — hóa ra hô to không làm chậm việc, hô to chính là việc.' } ] }
        ]
      },
      { sp: 'hero', jp: '{行|ゆ}き{先|さき}の{札|ふだ}を{見|み}てから、ベルトにのせるんだ。{迷|まよ}ったら{手|て}を{止|と}めて{聞|き}いてね。{夜|よる}は{眠|ねむ}いのが{敵|てき}だから、{声|こえ}をかけ{合|あ}おう。', text: '{name} dặn thêm: "Nhìn thẻ điểm đến rồi mới đặt lên băng nhé. Phân vân là dừng tay hỏi ngay. Ban đêm buồn ngủ là kẻ thù, nên mình gọi nhau bằng tiếng hô nhé."' },
      { sp: 'Chị nhân viên kho', jp: 'じゃあ{次|つぎ}の{一箱|ひとはこ}、{二人|ふたり}でやってみて。{番号|ばんごう}、{読|よ}んでみて。', text: 'Chị nhân viên kho mỉm cười đẩy kiện tiếp theo tới: "Vậy kiện tiếp theo, hai đứa làm cùng nhau nhé. Đọc mã thử xem." — y hệt cách chị từng bắt đầu với {name} trong đêm đầu tiên.' },
      {
        prompt: 'Kiện hàng tiếp theo tới tay Lan. Câu kaiwa hô đối chiếu — {name} dạy em ấy hô thế nào?',
        choice: [
          { label: 'Hô đủ mã số và tuyến: "0, 8, 3, 5, 2 — đi Funabashi, đúng không ạ?"', fx: { jp: 2, love: 1 }, note: 'Đối gương kho vận: Lan hô đối chiếu đủ mã và tuyến ngay trong ca đầu được dạy', say: [
            { sp: 'Lan', jp: 'ゼロ、{八|はち}、{三|さん}、{五|ご}、{二|に}。{船橋|ふなばし}ゆきで、あっていますか。', text: 'Lan hô vang, mắt nhìn thẳng người đối diện: "0, 8, 3, 5, 2. Đi Funabashi — đúng không ạ?"' },
            { sp: 'narr', text: 'Tiếng hô đáp trả lại từ phía {name}: "Đúng!" Kiện hàng lên đúng băng, trôi đi êm. Lan cười rạng rỡ lần đầu tiên trong ca — tiếng hô của chính mình vừa đưa một kiện hàng về đúng nhà.' } ] },
          { label: 'Chỉ gật đầu ra hiệu cho nhanh, khỏi hô ồn cả kho', fx: { jp: 1 }, note: 'Đối gương kho vận: Lan làm tắt bằng gật đầu — được hero nhắc tiếng hô chính là đối chiếu', say: [
            { sp: 'narr', text: 'Lan đặt kiện hàng lên băng bằng một cái gật đầu im lặng. {name} giữ kiện lại, lắc đầu nhẹ.' },
            { sp: 'hero', jp: '{声|こえ}に{出|だ}すから、{二人|ふたり}で{間違|まちが}いに{気|き}づけるんだ。{番号|ばんごう}と{行|ゆ}き{先|さき}、もう{一回|いっかい}{大|おお}きな{声|こえ}で。', text: '{name} nhắc: "Phải đọc thành tiếng thì hai người mới cùng phát hiện được sai sót. Mã số và điểm đến — thêm lần nữa, to lên." Lan hô lại trọn vẹn, và từ đó tiếng hô của em ấy không tắt nữa.' } ] }
        ]
      },
      { sp: 'Lan', jp: '{今日|きょう}はありがとうございました。{呼|よ}び{合|あ}わせの{意味|いみ}、{分|わ}かりました。', text: 'Cuối ca, Lan tháo găng, cúi đầu: "Hôm nay em cảm ơn senpai ạ. Ý nghĩa của hô đối chiếu, em hiểu rồi ạ."' },
      { sp: 'Anh trưởng kho', jp: 'その{姿勢|しせい}でいい。お{前|まえ}が{教|おし}えると、{新|あたら}しい{子|こ}も{声|こえ}が{出|で}るようになるな。', text: 'Anh trưởng kho gật đầu với {name}: "Thái độ vậy là được. Cậu dạy thì đứa mới nào cũng sớm biết cất tiếng hô đấy."' },
      { sp: 'narr', text: 'Ca đêm tan, kho lên đèn sáng trắng. {name} nhìn Lan hô đối chiếu với bạn cùng cặp ở line bên cạnh, giọng đã vang và chắc. Mỗi kiện hàng qua tay đều có một người đang chờ ở đầu kia — bài học của đêm đầu tiên ấy, hôm nay đã được trao lại bằng chính tiếng hô của một người mới.' }
    ]
  },

  /* ================= KHO VẬN — TỔNG KẾT NĂM ================= */
  'c5-succ-soko-3': {
    scene: '🏆 Kho vận — tổng kết năm: tuyến phân loại chạy nhanh nhất kho',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của trung tâm logistics tổ chức ngay tại khu nghỉ của ca đêm, bảng số liệu năm treo trên tường. Anh trưởng kho đứng dậy, tay cầm bản thống kê và một phong bì thưởng.' },
      { sp: 'Anh trưởng kho', jp: '{今年|ことし}の{数字|すうじ}を{話|はなし}ます。{仕分|しわ}けラインの{速|はや}さと{正確|せいかく}さ、{両方|りょうほう}で{倉庫|そうこ}{一番|いちばん}だった{班|はん}があります。', text: 'Anh trưởng kho mở lời: "Tôi nói con số của năm nay. Có một tổ đạt hạng nhất toàn kho ở cả hai mặt: tốc độ và độ chính xác của line phân loại."' },
      { sp: 'Anh trưởng kho', jp: 'ラインの{並|なら}びを{組|く}み{直|なお}して、{呼|よ}び{合|あ}わせの{順番|じゅんばん}を{作|つく}ったのは、この{人|ひと}です。{皆|みな}がその{方法|ほうほう}を{使|つか}うようになりました。', text: '"Người tổ chức lại cách sắp xếp của line và xây dựng quy trình hô đối chiếu chính là người này. Giờ thì cả kho đều làm theo cách ấy."' },
      { sp: 'Chị nhân viên kho', jp: 'あの{方法|ほうほう}になってから、{間違|まちが}いが{本当|ほんとう}に{減|へ}ったの。{夜勤|やきん}の{皆|みな}が{助|たす}かっているよ。', text: 'Chị nhân viên kho gật đầu: "Từ khi áp dụng cách ấy, sai sót giảm hẳn thật đấy. Cả ca đêm ai cũng được nhờ."' },
      { sp: 'hero', jp: '{皆|みな}さんが{声|こえ}を{合|あ}わせてくれたおかげです。{一人|ひとり}のラインではありません。ありがとうございます。', text: '"Đó là nhờ mọi người đã đồng lòng hô đáp cùng em ạ. Line này không phải của một người đâu ạ. Em cảm ơn mọi người ạ."' },
      { sp: 'Anh trưởng kho', jp: 'では、{今年|ことし}の{賞与|しょうよ}です。{会社|かいしゃ}からの{気持|きも}ちです。{受|う}け{取|と}ってください。', text: 'Anh trưởng kho trao phong bì: "Đây là tiền thưởng của năm nay. Tấm lòng của công ty. Cậu nhận nhé."' },
      {
        prompt: 'Nhận phong bì thưởng trước cả ca, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。', text: '"Em cảm ơn anh ạ. Em sẽ dùng số tiền này thật trân trọng. Em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Tiếng vỗ tay vang trong khu nghỉ ca đêm. Lan ngồi ở góc bàn vỗ tay mãi không ngừng — tuyến phân loại nhanh nhất kho ấy, có một phần được xây từ chính tiếng hô đối chiếu mà senpai đã dạy cô bé.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: '{name} cất phong bì vào túi áo khoác. Đêm nay kho vẫn chạy đều — và cách chạy ấy mang dấu tay của {call} trong từng tiếng hô đối chiếu.' } ] }
        ]
      },
      { sp: 'Anh trưởng kho', jp: 'それから、{会社|かいしゃ}からの{支援|しえん}です。あなたの{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、{会社|かいしゃ}が{支援|しえん}します。{書類|しょるい}は{会社|かいしゃ}で{用意|ようい}します。', text: '"Còn việc hỗ trợ từ phía công ty. Công ty sẽ hỗ trợ cậu chuyển lên Tokutei Ginou số 2. Giấy tờ công ty sẽ chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn anh ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Anh trưởng kho', jp: 'あなたの{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてください。{在職証明書|ざいしょくしょうめいしょ}は{会社|かいしゃ}が{出|だ}します。', text: '"Phần của cậu là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang làm việc công ty sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong anh chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Ra khỏi khu nghỉ, {name} đi dọc line phân loại đang chạy, nghe tiếng hô đối chiếu vang đều từ đầu này tới đầu kia. Ba năm trước, {call} hô mã đến khản giọng trong đêm đầu tiên. Ba năm sau, cả kho hô theo cách của {call} — và công ty đứng ra bảo lãnh cho {call} ở lại, lâu dài.' }
    ]
  },

  /* ================= NÔNG NGHIỆP — ĐỐI GƯƠNG: HIẾU ================= */
  'c5-succ-nogyo-2': {
    scene: '🪞 Nông nghiệp năm thứ ba — đối gương: Hiếu và chiếc kéo thu hoạch',
    branch: [
      { sp: 'narr', text: 'Trang trại ở Furano, bốn giờ sáng, trời còn tối mà sân đã sáng đèn. Bác chủ trại giao cho {name} một người mới: Hiếu, con nhà nông chính gốc, tay chân nhanh nhẹn, vừa tới đã xắn tay áo. "Tuần đầu của Hiếu, mày dẫn. Ở trại này, học tên rau và tên dụng cụ trước khi học việc."' },
      { sp: 'Bác chủ trại', jp: '{今日|きょう}から、ヒエウはお{前|まえ}の{後輩|こうはい}だ。まず{野菜|やさい}の{名前|なまえ}と{道具|どうぐ}の{名前|なまえ}から{教|おし}えてやれ。{名前|なまえ}を{間違|まちが}えると、{作業|さぎょう}が{止|と}まるからな。', text: 'Bác chủ trại dặn: "Từ hôm nay Hiếu là kouhai của mày. Trước hết dạy nó tên rau củ và tên dụng cụ. Nhầm tên là công việc khựng lại đấy."' },
      { sp: 'Hiếu', jp: 'はじめまして、ヒエウです。よろしくお{願|ねが}いします。{畑|はたけ}の{仕事|しごと}は、{国|くに}でもやっていました。', text: 'Hiếu chào to, đầy tự tin: "Cháu chào senpai, cháu là Hiếu ạ. Mong senpai chỉ bảo. Việc đồng áng thì ở quê cháu làm quen rồi ạ."' },
      { sp: 'hero', jp: 'よろしく。じゃあ{道具|どうぐ}からいこう。これは{収穫|しゅうかく}バサミ、こっちは{鍬|くわ}。{使|つか}う{前|まえ}に{名前|なまえ}を{声|こえ}に{出|だ}して{確認|かくにん}するのが、うちの{約束|やくそく}だよ。', text: '{name} gật đầu, cầm hai món dụng cụ lên: "Chào em. Vậy bắt đầu từ dụng cụ nhé. Đây là kéo thu hoạch, kia là cuốc. Trước khi dùng, đọc to tên để xác nhận — đó là quy ước của trại mình."' },
      { sp: 'narr', text: 'Nhưng ra tới luống dưa, Hiếu làm đúng điều mà sự tự tin hay khiến người ta làm: cậu gọi bí đỏ thành dưa, gọi củ cải thành ngô khi nghe bà chủ trại dặn việc — rồi xách nhầm chiếc cuốc ra luống dưa thay vì kéo thu hoạch, miệng nói chắc nịch: "Kéo nào chả là kéo, cắt được là được ạ." Lưỡi cuốc suýt chạm vào thân dưa non.' },
      { sp: 'Bà chủ trại', jp: 'ヒエウちゃん、{待|ま}って。それは{鍬|くわ}だよ。メロンの{様子|ようす}を{見|み}るのは、{収穫|しゅうかく}バサミの{仕事|しごと}だよ。', text: 'Bà chủ trại gọi lại, giọng vẫn hiền: "Hiếu ơi, khoan đã. Đó là cái cuốc đấy. Xem tình hình dưa là việc của kéo thu hoạch cơ mà."' },
      { sp: 'Hiếu', text: '"Dạ… cháu xin lỗi ạ." Hiếu đặt vội cuốc xuống, mặt đỏ lên. "Ở quê cháu gọi chung là kéo hết… cháu tưởng nhớ tên từ từ cũng được ạ."' },
      { sp: 'narr', text: '{name} nhìn luống dưa non suýt bị lưỡi cuốc chạm vào, và nhớ buổi sáng đầu tiên của chính mình ở Furano này: cũng ngái ngủ, cũng được bà chủ trại kiên nhẫn dạy từng tên rau bằng hình lá, từng món dụng cụ bằng cách đọc to tên trước khi dùng. Không ai quát {call} hôm ấy — người ta chỉ dạy, chậm rãi như dạy một đứa trẻ học bảng chữ cái của đất. {name} cầm chiếc kéo thu hoạch lên, đưa cho Hiếu.' },
      {
        prompt: 'Hiếu nhầm tên rau, lấy nhầm cuốc thay kéo thu hoạch và suýt làm hỏng dưa non. {name} dạy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Nhà nông mà kéo với cuốc cũng không phân biệt được à!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương nông nghiệp: mắng kouhai giữa luống dưa — Hiếu nhớ tên dụng cụ bằng nỗi sợ', say: [
            { sp: 'narr', text: 'Hiếu cúi đầu, cả buổi sáng còn lại làm việc gì cũng chậm chạp, tay cầm dụng cụ nào cũng liếc nhìn {name} xin phép trước — nhịp việc của cả luống chậm hẳn. Bà chủ trại lắc đầu: "Dạy bằng mắng thì nó nhớ tên vì sợ mày, không phải vì hiểu đất."' },
            { sp: 'Bác chủ trại', text: 'Cuối buổi, bác chủ trại nhắc riêng: "Ngày đầu của mày ở đây, có ai mắng mày vì chưa thuộc tên rau không? Người ta dạy mày bằng lá cây, đúng không?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: dẫn Hiếu đi dọc luống, dạy lại tên rau bằng lá và tên dụng cụ bằng cách đọc to', fx: { love: 2, jp: 2 }, note: 'Đối gương nông nghiệp: dạy tận tay như bà chủ trại từng dạy mình — Hiếu nhớ bằng mắt và miệng', say: [
            { sp: 'hero', jp: 'ヒエウ、{土|つち}の{中|なか}が{本体|ほんたい}の{野菜|やさい}は、{葉|は}の{形|かたち}で{見分|みわ}けるんだ。あっちはかぼちゃ、そっちは{大根|だいこん}。{道具|どうぐ}も{同|おな}じ。{名前|なまえ}を{言|い}ってから{手|て}に{取|と}ろう。', text: '{name} dẫn Hiếu đi dọc luống, chỉ từng loại lá: "Hiếu này, rau mà phần chính nằm dưới đất thì phân biệt bằng hình lá. Kia là bí đỏ, đằng kia là củ cải. Dụng cụ cũng vậy — nói tên ra rồi mới cầm lên tay."' },
            { sp: 'Hiếu', text: '"Dạ…" Hiếu đi theo, miệng nhắc lại từng tên như học vẹt, tay chạm vào từng chiếc lá. Tới cuối luống, cậu đã gọi đúng được bốn loại rau liên tiếp mà không cần nhìn trộm senpai.' } ] }
        ]
      },
      { sp: 'hero', jp: 'これはメロン、こちらはトウモロコシ。{畑|はたけ}は{待|ま}ってくれないけど、{名前|なまえ}を{覚|おぼ}える{時間|じかん}は、ちゃんとあるからね。', text: '{name} chỉ sang hai luống bên: "Đây là dưa lưới, kia là ngô. Ruộng không chờ ai thật — nhưng thời gian để học thuộc tên thì vẫn có đủ, yên tâm."' },
      { sp: 'Bà chủ trại', jp: 'いい{子|こ}だねえ。ヒエウちゃん、お{昼|ひる}はうちの{味噌汁|みそしる}だよ。{名前|なまえ}を{覚|おぼ}えたら、もっとおいしいよ。', text: 'Bà chủ trại cười hiền: "Ngoan quá. Hiếu này, trưa nay canh miso nhà bà đấy. Thuộc được tên rau rồi thì ăn còn ngon hơn nữa."' },
      {
        prompt: 'Ra luống dưa làm việc thật — câu kaiwa xác nhận dụng cụ trước khi dùng. {name} dạy Hiếu thế nào?',
        choice: [
          { label: 'Đọc to tên dụng cụ và việc sắp làm: "Kéo thu hoạch đây ạ. Cháu xem tình hình dưa nhé"', fx: { jp: 2, love: 1 }, note: 'Đối gương nông nghiệp: Hiếu xác nhận dụng cụ bằng tiếng đọc to ngay ngày đầu được dạy', say: [
            { sp: 'Hiếu', jp: '{収穫|しゅうかく}バサミですね。メロンの{様子|ようす}を{見|み}ます。ぼうしもかぶりました、{長靴|ながぐつ}もはきました。', text: 'Hiếu cầm kéo lên, đọc to rõ ràng: "Kéo thu hoạch đây ạ. Cháu xem tình hình dưa nhé. Mũ cháu đội rồi, ủng cũng đi rồi ạ."' },
            { sp: 'Bác chủ trại', jp: 'よし、その{格好|かっこう}とその{声|こえ}なら{一人前|いちにんまえ}だ。{畑|はたけ}は{待|ま}ってくれない、{行|い}くぞ。', text: 'Bác chủ trại gật đầu: "Tốt, trang phục và tiếng hô thế là ra dáng rồi. Ruộng không chờ ai đâu, đi thôi." — câu nói y hệt bác từng nói với {name} buổi sáng đầu tiên.' } ] },
          { label: 'Cầm kéo lên làm luôn cho nhanh, khỏi đọc tên mất thời gian', fx: { jp: 1 }, note: 'Đối gương nông nghiệp: Hiếu làm tắt bước xác nhận — được hero nhắc tên gọi là điểm bắt đầu của việc', say: [
            { sp: 'narr', text: 'Hiếu cầm kéo bước thẳng vào luống. {name} gọi em ấy quay lại, không quát, chỉ chìa tay ra.' },
            { sp: 'hero', jp: '{名前|なまえ}を{声|こえ}に{出|だ}すのは、{自分|じぶん}の{手|て}に{確認|かくにん}させるためだよ。「{収穫|しゅうかく}バサミ」って{言|い}ってから、{始|はじ}めよう。', text: '{name} nói chậm: "Đọc to tên là để chính tay mình tự xác nhận đấy. Nói "kéo thu hoạch" ra rồi mới bắt đầu nhé." Hiếu gật đầu, đọc to tên dụng cụ — và bước vào luống với đôi tay đã chậm lại một nhịp cần thiết.' } ] }
        ]
      },
      { sp: 'Hiếu', jp: '{今日|きょう}はありがとうございました。{野菜|やさい}の{名前|なまえ}、ノートにまとめます。', text: 'Cuối buổi, Hiếu lau mồ hôi, cúi đầu: "Hôm nay cháu cảm ơn senpai ạ. Tên rau củ, cháu sẽ tổng hợp vào sổ ạ."' },
      { sp: 'Bác chủ trại', jp: 'まじめだねえ。お{前|まえ}に{教|おし}わると、{若|わか}いのもまじめになるな。', text: 'Bác chủ trại cười khà: "Chăm chỉ quá. Mày dạy thì đứa trẻ nào cũng chăm chỉ theo nhỉ."' },
      { sp: 'narr', text: 'Bốn giờ sáng hôm sau, {name} ra sân đã thấy Hiếu đứng đọc to tên từng món dụng cụ trước khi cầm lên. Mùi đất và mùi lá ngô xanh trong sương sớm — Furano vẫn vậy, chỉ khác là hôm nay có thêm một người trẻ đang học bảng chữ cái của đất, bằng giọng đọc to của chính mình.' }
    ]
  },

  /* ================= NÔNG NGHIỆP — TỔNG KẾT NĂM ================= */
  'c5-succ-nogyo-3': {
    scene: '🏆 Nông nghiệp — tổng kết năm: quyết định thu hoạch trước bão cứu cả luống dưa',
    branch: [
      { sp: 'narr', text: 'Buổi tổng kết cuối năm của trang trại tổ chức ngay trong căn bếp ấm của nhà chủ trại, cả nhà ngồi quanh bàn gỗ dài. Bác chủ trại đứng dậy, tay cầm cuốn sổ mùa vụ đã sờn gáy và một phong bì thưởng.' },
      { sp: 'Bác chủ trại', jp: '{今年|ことし}の{話|はなし}を{一|ひと}つする。あの{台風|たいふう}の{前|まえ}の{日|ひ}、メロンを{早|はや}めに{収穫|しゅうかく}しようと{言|い}った{人|ひと}がいたな。', text: 'Bác chủ trại mở lời: "Tôi kể một chuyện của năm nay. Ngày trước cơn bão ấy, có một người đã đề xuất thu hoạch dưa sớm."' },
      { sp: 'Bác chủ trại', jp: 'その{判断|はんだん}で、あの{畑|はたけ}のメロンは{全部|ぜんぶ}{助|たす}かった。{天気|てんき}を{読|よ}んで、{先|さき}に{動|うご}く。それが{農家|のうか}の{腕|うで}だ。ありがとうな。', text: '"Nhờ quyết định ấy, dưa của cả luống đó được cứu toàn bộ. Đọc được thời tiết và hành động trước — đó là tay nghề của nhà nông. Cảm ơn mày."' },
      { sp: 'Bà chủ trại', jp: 'あの{日|ひ}は{皆|みな}で{夜|よる}まで{収穫|しゅうかく}したねえ。{一|ひと}つも{無駄|むだ}にならなかった。{本当|ほんとう}にありがとうね。', text: 'Bà chủ trại gật đầu, mắt rưng rưng: "Ngày ấy cả nhà thu hoạch tới đêm. Không một quả nào bị phí. Thật sự cảm ơn cháu."' },
      { sp: 'hero', jp: '{皆|みな}さんが{一緒|いっしょ}に{動|うご}いてくれたおかげです。{判断|はんだん}だけでは、{畑|はたけ}は{守|まも}れませんでした。', text: '"Đó là nhờ mọi người đã cùng hành động với cháu ạ. Chỉ có quyết định thôi thì không giữ nổi luống dưa đâu ạ."' },
      { sp: 'Bác chủ trại', jp: 'では、{今年|ことし}の{賞与|しょうよ}だ。{少|すこ}しだが、うちの{気持|きも}ちだ。{受|う}け{取|と}ってくれ。', text: 'Bác chủ trại chìa phong bì: "Đây là tiền thưởng năm nay. Không nhiều, nhưng là tấm lòng của nhà này. Mày nhận đi."' },
      {
        prompt: 'Nhận phong bì thưởng quanh bàn bếp của nhà chủ trại, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Cháu sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、{来年|らいねん}も{頑張|がんば}ります。', text: '"Cháu cảm ơn bác ạ. Cháu sẽ dùng số tiền này thật trân trọng. Cháu sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Cả bàn vỗ tay, tiếng vỗ tay trong căn bếp ấm nghe thân như tiếng người nhà. Hiếu ngồi cuối bàn vỗ mãi — quyết định thu hoạch trước bão ấy, cậu chỉ nghe kể lại, và hôm nay mới hiểu nó nặng bao nhiêu ký dưa.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Cháu cảm ơn hai bác ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Cháu cảm ơn hai bác ạ. Năm tới cũng mong được hai bác chỉ bảo ạ."' },
            { sp: 'narr', text: 'Bà chủ trại dúi thêm vào tay {name} một bát canh miso nóng — phần thưởng thứ hai của nhà nông, không nằm trong phong bì nào cả.' } ] }
        ]
      },
      { sp: 'Bác chủ trại', jp: 'それから、うちからの{支援|しえん}の{話|はなし}だ。お{前|まえ}の{特定技能|とくていぎのう}2{号|ごう}への{移行|いこう}を、{農園|のうえん}が{支援|しえん}する。{書類|しょるい}はこちらで{用意|ようい}するからな。', text: '"Còn việc hỗ trợ từ phía trại. Việc chuyển tư cách của mày lên Tokutei Ginou số 2, trại sẽ hỗ trợ. Giấy tờ bên này chuẩn bị cho."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Cháu cảm ơn bác ạ. Cho cháu xác nhận phần giấy tờ của cháu và thời hạn ạ."' },
      { sp: 'Bác chủ trại', jp: 'お{前|まえ}の{分|ぶん}は{課税証明書|かぜいしょうめいしょ}と{納税証明書|のうぜいしょうめいしょ}だ。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えてくれ。{在職証明書|ざいしょくしょうめいしょ}はうちが{出|だ}す。', text: '"Phần của mày là giấy chứng nhận thuế và giấy chứng nhận đã nộp thuế. Chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang làm việc trại sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Cháu đã rõ ạ. Cháu sẽ chuẩn bị sớm rồi nộp ạ. Mong bác chỉ bảo thêm cho cháu."' },
      { sp: 'narr', text: 'Ra sân trong nắng chiều cuối năm, {name} nhìn những luống dưa đã thu hoạch xong, đất trống trải dài tới chân trời Furano. Ba năm trước, {call} còn nhầm lẫn tên rau trong buổi sáng đầu tiên. Ba năm sau, {call} đọc được thời tiết để cứu cả một luống dưa — và được gia đình chủ trại bảo lãnh như một người nhà.' }
    ]
  },

  /* ================= DU HỌC — ĐỐI GƯƠNG: NGỌC ================= */
  'c5-succ-duhoc-2': {
    scene: '🪞 Du học năm thứ ba — đối gương: Ngọc và dũng khí hỏi thầy',
    branch: [
      { sp: 'narr', text: 'Trường chuyên môn, giờ học đầu tuần. Thầy Khánh gọi {name} lại sau giờ: lớp dưới vừa có một sinh viên mới người Việt — Ngọc, học giỏi trên giấy nhưng ít nói đến mức đáng lo. "Tuần này em kèm Ngọc giúp thầy nhé. Con bé ấy giống hệt em ngày đầu: cái gì không hiểu cũng chỉ gật đầu."' },
      { sp: 'Thầy Khánh', jp: '{今週|こんしゅう}、ゴックさんの{勉強|べんきょう}を{見|み}てあげてください。{分|わ}からないことを{聞|き}く{勇気|ゆうき}、それを{教|おし}えてあげてほしいんです。', text: 'Thầy Khánh nói nhỏ: "Tuần này em kèm việc học của Ngọc giúp thầy nhé. Dũng khí hỏi khi không hiểu — thầy muốn em dạy cho con bé điều đó."' },
      { sp: 'Ngọc', jp: 'はじめまして、ゴックです。よろしくお{願|ねが}いいたします。{専門用語|せんもんようご}は{難|むずか}しいですが、{家|いえ}で{調|しら}べます。', text: 'Ngọc cúi chào, giọng nhỏ: "Em chào senpai ạ, em là Ngọc. Mong senpai chỉ bảo. Thuật ngữ chuyên ngành khó, nhưng em sẽ về nhà tra cứu ạ."' },
      { sp: 'hero', jp: 'よろしくね。{分|わ}からない{言葉|ことば}は、{後|あと}じゃなくて、その{場|ば}で{聞|き}くのが{一番|いちばん}だよ。{恥|は}ずかしいことじゃないからね。', text: '{name} mỉm cười, nói trước điều quan trọng nhất: "Chào em. Từ nào không hiểu thì hỏi ngay tại chỗ là tốt nhất, không phải để sau. Hỏi không phải chuyện xấu hổ đâu nhé."' },
      { sp: 'narr', text: 'Nhưng suốt buổi học hôm đó, {name} đếm được bốn lần Ngọc khựng lại trước một thuật ngữ lạ — và cả bốn lần, cô bé chỉ gật đầu nhanh hơn bình thường, lén ghi phiên âm vào mép vở, rồi để bài giảng trôi qua. Tan giờ, Ngọc thú thật lí nhí: "Hỏi giữa lớp thì mọi người cười em… Em định về nhà tra sau, quên mất cũng không sao ạ."' },
      { sp: 'Thầy Khánh', jp: 'ゴックさん、さっきの{言葉|ことば}、{本当|ほんとう}に{分|わ}かりましたか。{分|わ}からないまま{進|すす}むのが、{一番|いちばん}もったいないんですよ。', text: 'Thầy Khánh đi ngang, hỏi nhẹ mà trúng: "Ngọc này, từ lúc nãy, em thật sự hiểu chưa? Để không hiểu mà học tiếp mới là điều đáng tiếc nhất đấy."' },
      { sp: 'Ngọc', text: '"Dạ… chưa ạ." Ngọc cúi đầu, tay xoắn góc vở. "Em sợ hỏi thì thầy nghĩ em học kém…"' },
      { sp: 'narr', text: 'Nghe câu ấy, {name} thấy mình của buổi học đầu tiên quay lại nguyên vẹn: cũng từng định bụng "về nhà tra sau", cũng từng nghĩ hỏi là xấu hổ — cho tới khi học được rằng dũng khí hỏi khi không hiểu mới là thứ phân biệt người học thật với người gật đầu cho qua. Câu trách "sao không hỏi" vừa tới miệng {name} đã hóa thành một cái gật đầu thông cảm.' },
      {
        prompt: 'Ngọc ngại hỏi, gật đầu giả vờ hiểu và để từ khó trôi qua bốn lần trong một buổi. {name} dạy em ấy thế nào?',
        choice: [
          { label: 'Mắng như mình từng sợ bị mắng: "Không hiểu mà gật đầu là nói dối đấy!"', fx: { pressure: 2, love: -1 }, note: 'Đối gương du học: mắng kouhai chuyện giả vờ hiểu — Ngọc nhớ bài học bằng nỗi sợ bị gọi tên', say: [
            { sp: 'narr', text: 'Ngọc giật mình, cả buổi chiều còn lại ngồi co lại ở góc lớp, vở ghi kín chữ mà ánh mắt trống rỗng — ghi cho khỏi bị mắng, không phải để hiểu. Thầy Khánh lắc đầu khẽ: "Dạy bằng sợ thì sinh viên chỉ học cách giấu kỹ hơn sự không hiểu của mình."' },
            { sp: 'Thầy Khánh', text: 'Cuối buổi, thầy nhắc riêng {name}: "Ngày đầu của em ở lớp này, có ai mắng em vì không dám hỏi không? Người ta hẹn em ôn bài ở thư viện, đúng không?"' } ] },
          { label: 'Bình tĩnh chỉ tận tay: cùng Ngọc quay lại hỏi thầy ngay sau giờ học, làm mẫu lần đầu tiên', fx: { love: 2, jp: 2 }, note: 'Đối gương du học: dạy tận tay bằng việc cùng đi hỏi — Ngọc nhớ bằng lần hỏi đầu tiên thành công', say: [
            { sp: 'hero', jp: 'ゴックさん、{一緒|いっしょ}に{先生|せんせい}に{聞|き}きに{行|い}こう。{私|わたし}も{最初|さいしょ}は{一人|ひとり}だと{聞|き}きにくかった。{隣|となり}にいるから、{大丈夫|だいじょうぶ}だよ。', text: '{name} đứng dậy, cầm theo vở của cả hai: "Ngọc, mình cùng tới hỏi thầy nhé. Ngày trước anh/chị một mình cũng ngại hỏi lắm. Có người đứng cạnh thì không sao đâu."' },
            { sp: 'Ngọc', text: '"Dạ… dạ." Ngọc ôm vở đi theo, bước chân chậm mà không quay lại. Đứng trước bàn giáo viên, cô bé hít một hơi thật sâu — hơi thở của người sắp làm một việc nhỏ mà lớn.' } ] }
        ]
      },
      { sp: 'hero', jp: '{当校|とうこう}で{一番大事|いちばんだいじ}なのは{出席率|しゅっせきりつ}と、{分|わ}からないことを{残|のこ}さないことだよ。{質問|しつもん}は、{勉強|べんきょう}の{一番早|いちばんはや}い{道|みち}なんだ。', text: '{name} dặn thêm trên đường tới phòng giáo viên: "Ở trường này, quan trọng nhất là tỷ lệ điểm danh và không để dồn lại điều chưa hiểu. Đặt câu hỏi là con đường nhanh nhất của việc học đấy."' },
      { sp: 'Thầy Khánh', jp: 'いい{質問|しつもん}だね。{聞|き}いてくれて、ありがとう。{分|わ}からないことを{聞|き}ける{学生|がくせい}は、{必|かなら}ず{伸|の}びるよ。', text: 'Thầy Khánh nghe xong câu hỏi, mỉm cười: "Câu hỏi hay đấy. Cảm ơn em đã hỏi. Sinh viên biết hỏi điều mình chưa hiểu thì nhất định sẽ tiến bộ."' },
      {
        prompt: 'Lần hỏi đầu tiên trước thầy — câu kaiwa mở miệng. {name} dạy Ngọc nói thế nào?',
        choice: [
          { label: '"Thưa thầy, xin thầy chỉ cho em ý nghĩa của từ này ạ" — lịch sự, rõ ràng, đúng ý cần hỏi', fx: { jp: 2, love: 1 }, note: 'Đối gương du học: Ngọc hỏi thầy bằng câu lịch sự trọn vẹn ngay lần đầu tiên', say: [
            { sp: 'Ngọc', jp: 'すみません、{先生|せんせい}。この{言葉|ことば}の{意味|いみ}を{教|おし}えていただけますか。', text: 'Ngọc nói chậm, giọng còn run mà trọn câu: "Em xin lỗi thầy ạ. Xin thầy chỉ cho em ý nghĩa của từ này ạ."' },
            { sp: 'narr', text: 'Thầy giảng lại tận tình, còn ghi thêm một ví dụ vào vở cho Ngọc. Bước ra khỏi phòng giáo viên, cô bé cười rạng rỡ: "Hỏi… không đáng sợ như em tưởng." {name} cười theo — câu nói ấy, mình cũng từng nói nguyên văn.' } ] },
          { label: '"Thầy ơi, từ này là gì ạ?" — hỏi cụt cho đỡ hồi hộp', fx: { jp: 1 }, note: 'Đối gương du học: Ngọc hỏi cụt — được hero dạy nói đủ ý mà vẫn giữ sự lịch sự', say: [
            { sp: 'Ngọc', jp: '{先生|せんせい}、これ、{何|なん}ですか。', text: 'Ngọc buột miệng hỏi cụt, rồi tự đỏ mặt: "Thầy ơi, cái này là gì ạ?"' },
            { sp: 'hero', jp: '{聞|き}けたことが{一番|いちばん}だよ。{次|つぎ}は「{意味|いみ}を{教|おし}えていただけますか」まで{言|い}ってみよう。{丁寧|ていねい}だと、{答|こた}える{側|がわ}も{嬉|うれ}しいんだ。', text: '{name} động viên trước, sửa sau: "Hỏi được là quan trọng nhất rồi. Lần sau mình nói tới "xin thầy chỉ cho em ý nghĩa" nhé. Nói lịch sự thì người trả lời cũng vui lòng hơn." Ngọc gật đầu, nhắc lại câu đầy đủ hai lần ngay tại hành lang.' } ] }
        ]
      },
      { sp: 'Ngọc', jp: '{今日|きょう}はありがとうございました。{放課後|ほうかご}、{図書室|としょしつ}で{復習|ふくしゅう}しませんか。', text: 'Tan học, Ngọc chủ động rủ, mắt sáng hẳn: "Hôm nay em cảm ơn senpai ạ. Tan học mình ôn bài ở thư viện nhé?"' },
      { sp: 'Thầy Khánh', jp: '{伝|つた}わる{日本語|にほんご}は、{聞|き}く{勇気|ゆうき}から{生|う}まれます。あなたはそれを{次|つぎ}の{人|ひと}に{渡|わた}せましたね。', text: 'Thầy Khánh nhìn hai học trò, nói một câu như tổng kết: "Tiếng Nhật truyền đạt được sinh ra từ dũng khí dám hỏi. Em vừa trao lại được điều đó cho người tiếp theo rồi."' },
      { sp: 'narr', text: 'Thư viện chiều hôm ấy có hai chiếc ghế ngồi cạnh nhau và một cuốn vở đầy những câu hỏi được khoanh tròn. Ba năm trước, {name} cũng ngồi ở đây, cũng khoanh tròn những từ chưa hiểu. Người ta lớn lên trong đời du học không phải khi hết điều chưa biết — mà khi dám hỏi về chúng, và dám đứng cạnh người tiếp theo trong lần hỏi đầu tiên của họ.' }
    ]
  },

  /* ================= DU HỌC — TỔNG KẾT NĂM ================= */
  'c5-succ-duhoc-3': {
    scene: '🏆 Du học — tổng kết năm học: buổi trợ giảng được yêu quý và bài nghiên cứu được chọn',
    branch: [
      { sp: 'narr', text: 'Lễ tổng kết năm học của trường chuyên môn. Trong hội trường nhỏ, thầy Khánh đứng trên bục, tay cầm danh sách khen thưởng và một phong bì học bổng khuyến học của trường.' },
      { sp: 'Thầy Khánh', jp: '{今年|ことし}の{表彰|ひょうしょう}を{行|おこな}います。まず、{下|した}のクラスの{助手|じょしゅ}として、{多|おお}くの{学生|がくせい}に{慕|した}われた{人|ひと}がいます。', text: 'Thầy Khánh mở lời trang trọng: "Giờ là phần khen thưởng của năm nay. Trước hết, có một người làm trợ giảng cho lớp dưới và được rất nhiều sinh viên yêu quý."' },
      { sp: 'Thầy Khánh', jp: 'さらに、その{人|ひと}の{研究発表|けんきゅうはっぴょう}は、{今年|ことし}の{学校|がっこう}{代表|だいひょう}に{選|えら}ばれました。{努力|どりょく}が{実|み}を{結|むす}ぶとは、このことです。', text: '"Hơn nữa, bài trình bày nghiên cứu của người ấy đã được chọn làm bài đại diện của trường năm nay. "Nỗ lực kết thành quả" chính là như thế này."' },
      { sp: 'Ngọc', jp: '{先輩|せんぱい}の{授業|じゅぎょう}、{分|わ}かりやすかったです。{私|わたし}も{質問|しつもん}できるようになりました。ありがとうございました。', text: 'Ngọc ngồi ở hàng ghế lớp dưới, nói vọng lên với nụ cười rạng rỡ: "Giờ trợ giảng của senpai dễ hiểu lắm ạ. Em cũng đã biết đặt câu hỏi rồi. Em cảm ơn senpai ạ."' },
      { sp: 'hero', jp: '{皆|みな}さんに{教|おし}わり、{支|ささ}えていただいたおかげです。ありがとうございます。', text: '"Đó là nhờ em được mọi người dạy dỗ và nâng đỡ ạ. Em cảm ơn mọi người ạ."' },
      { sp: 'Thầy Khánh', jp: 'では、{今年|ことし}の{奨学金|しょうがくきん}です。{学校|がっこう}からの{気持|きも}ちです。{受|う}け{取|と}ってください。', text: 'Thầy trao phong bì bằng hai tay: "Đây là học bổng khuyến học của năm nay. Tấm lòng của nhà trường. Em nhận nhé."' },
      {
        prompt: 'Nhận phong bì học bổng trước cả hội trường, {name} đáp thế nào?',
        choice: [
          { label: 'Nhận bằng hai tay, cúi đầu khiêm tốn: "Em sẽ cố gắng xứng đáng với sự tin cậy này"', fx: { money: 2.0, jp: 2 }, note: 'Thưởng cuối năm của người được trọng dụng', say: [
            { sp: 'hero', jp: 'ありがとうございます。{大切|たいせつ}に{使|つか}わせていただきます。{信頼|しんらい}に{応|こた}えられるよう、これからも{頑張|がんば}ります。', text: '"Em cảm ơn thầy ạ. Em sẽ dùng số tiền này thật trân trọng. Em sẽ tiếp tục cố gắng để xứng đáng với sự tin cậy này ạ."' },
            { sp: 'narr', text: 'Tiếng vỗ tay vang khắp hội trường nhỏ. Ở hàng ghế lớp dưới, Ngọc vỗ tay không ngừng — senpai của cô bé vừa cho cô bé thấy con đường từ một câu hỏi run run có thể đi xa tới đâu.' } ] },
          { label: 'Nhận và cảm ơn giản dị: "Em cảm ơn thầy và mọi người ạ"', fx: { money: 2.0, jp: 1 }, note: 'Thưởng cuối năm: nhận thưởng với lời cảm ơn giản dị, chân thành', say: [
            { sp: 'hero', jp: 'ありがとうございます。{来年|らいねん}もよろしくお{願|ねが}いいたします。', text: '"Em cảm ơn thầy và mọi người ạ. Năm tới cũng mong được mọi người chỉ bảo ạ."' },
            { sp: 'narr', text: '{name} cất phong bì vào cặp. Ba năm du học, từ buổi tự giới thiệu đầu tiên tới bài nghiên cứu được chọn làm đại diện trường — chặng đường ấy vừa được gọi tên trong tiếng vỗ tay.' } ] }
        ]
      },
      { sp: 'Thầy Khánh', jp: 'それから、{進路|しんろ}の{話|はなし}です。{学校|がっこう}は、あなたの{研究|けんきゅう}を{続|つづ}けるための{進学|しんがく}を{支援|しえん}します。{推薦|すいせん}と{手続|てつづ}きの{書類|しょるい}は、{学校|がっこう}が{用意|ようい}します。', text: '"Còn chuyện hướng đi tiếp theo. Nhà trường sẽ hỗ trợ em tiến học để tiếp tục con đường nghiên cứu. Thư tiến cử và giấy tờ thủ tục phía trường sẽ chuẩn bị."' },
      { sp: 'hero', jp: 'ありがとうございます。{私|わたし}の{分|ぶん}の{書類|しょるい}と{期限|きげん}を、{確認|かくにん}させてください。', text: '"Em cảm ơn thầy ạ. Cho em xác nhận phần giấy tờ của em và thời hạn ạ."' },
      { sp: 'Thầy Khánh', jp: 'あなたの{分|ぶん}は{研究計画書|けんきゅうけいかくしょ}の{下書|したか}きと、{成績証明書|せいせきしょうめいしょ}の{申請|しんせい}です。{来月|らいげつ}の{中旬|ちゅうじゅん}までに{揃|そろ}えましょう。{在学証明書|ざいがくしょうめいしょ}は{学校|がっこう}が{出|だ}します。', text: '"Phần của em là bản nháp kế hoạch nghiên cứu và đơn xin bảng điểm. Mình chuẩn bị đủ trước giữa tháng sau nhé. Giấy chứng nhận đang học trường sẽ cấp."' },
      { sp: 'hero', jp: '{確認|かくにん}しました。{早|はや}めに{揃|そろ}えて{提出|ていしゅつ}します。よろしくお{願|ねが}いいたします。', text: '"Em đã rõ ạ. Em sẽ chuẩn bị sớm rồi nộp ạ. Mong thầy chỉ bảo thêm cho em."' },
      { sp: 'narr', text: 'Ra khỏi hội trường, {name} đi ngang qua lớp học của buổi đầu tiên, nhìn dãy bàn ghế trống trong nắng chiều. Ba năm trước, {call} đứng trước lớp này giới thiệu bản thân bằng giọng còn run. Ba năm sau, bài nghiên cứu của {call} mang tên trường đi xa hơn — và nhà trường đứng ra bảo lãnh cho con đường nghiên cứu tiếp theo.' }
    ]
  }
  });
})();
