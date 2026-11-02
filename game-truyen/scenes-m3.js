// scenes-m3.js — GÓI CHƯƠNG 5 «LỚN RỒI» (Pha 3 — GIA ĐÌNH):
// cưới theo từng tuyến (Yui / Hằng / Ren / Khôi / yêu xa Linh / yêu xa Hải) ·
// sinh con + đặt tên con (flag 'saga-c5' babyname) + nhà trẻ · tuyến độc thân
// vững vàng (phòng trọ / cuộc gọi về nhà / đỡ đầu ở công viên).
// Thể ngữ §8: quầy shiyakusho / bệnh viện = kính ngữ trang trọng;
// vợ chồng, bạn bè, gia đình = thường thể ấm áp tự nhiên.
// Nội dung cưới / con viết trang trọng, gợi cảm xúc, không chi tiết nhạy cảm.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= CƯỚI 1 — YUI (tuyến nam) ================= */
  'c5-marry-yui': {
    scene: '💍 Chương 5 «Lớn rồi» — Nộp giấy kết hôn với Yui ở shiyakusho',
    branch: [
      { sp: 'narr', text: 'Sáng thứ hai đầu tháng, {name} và Yui đứng trước cửa shiyakusho, tay nắm tay, trong túi hồ sơ là tờ 婚姻届 đã điền đi điền lại ba lần từ tối qua — cùng xấp giấy tờ từ Việt Nam đã được dịch và chứng thực cẩn thận. Mấy năm trước, cũng đôi tay này run run nộp tờ giấy đầu tiên trên đất Nhật. Hôm nay, run vì một lý do hoàn toàn khác.' },
      { sp: 'Nhân viên shiyakusho', jp: 'おはようございます。{本日|ほんじつ}はどのようなご{用件|ようけん}でしょうか。', text: '"Chào buổi sáng ạ. Hôm nay anh chị cần làm thủ tục gì ạ?"' },
      { sp: 'hero', jp: '{婚姻届|こんいんとどけ}の{提出|ていしゅつ}に{参|まい}りました。{必要書類|ひつようしょるい}はすべて{揃|そろ}えて{持参|じさん}いたしましたので、ご{確認|かくにん}をお{願|ねが}いいたします。', text: '"Chúng tôi đến nộp giấy đăng ký kết hôn ạ. Mọi giấy tờ cần thiết tôi đã chuẩn bị đầy đủ và mang theo, xin anh/chị kiểm tra giúp ạ."' },
      { sp: 'Yui', jp: 'ねえ、{手|て}、{震|ふる}えてるよ。…わたしもだけど。あの{秋葉原|あきはばら}のコンビニで、{初|はじ}めて{会|あ}った{日|ひ}、{覚|おぼ}えてる？', text: '"Này, tay anh đang run kìa. …Em cũng vậy. Anh còn nhớ ngày đầu tiên mình gặp nhau ở combini tại Akihabara không?"' },
      { sp: 'hero', jp: '{忘|わす}れるわけないだろ。おにぎりの{温|あたた}め{方|かた}も{分|わ}からなくて、{汗|あせ}だくだった{俺|おれ}に、{笑|わら}わずに{教|おし}えてくれた。あの{日|ひ}の{優|やさ}しさから、{全部|ぜんぶ}{始|はじ}まったんだ。', text: '"Quên sao được. Hồi đó anh còn không biết cách hâm onigiri, mồ hôi đầm đìa, mà em không cười, chỉ kiên nhẫn chỉ cho anh. Mọi chuyện bắt đầu từ sự tử tế hôm ấy đấy."' },
      { sp: 'Nhân viên shiyakusho', jp: 'ありがとうございます。ベトナムの{独身証明書|どくしんしょうめいしょ}と、その{翻訳文|ほんやくぶん}も{揃|そろ}っていますね。{翻訳者|ほんやくしゃ}の{署名|しょめい}も{確認|かくにん}できました。', text: '"Cảm ơn anh chị. Giấy chứng nhận độc thân của phía Việt Nam và bản dịch cũng đã đầy đủ. Tôi cũng đã xác nhận được chữ ký của người dịch ạ."' },
      { sp: 'hero', jp: '{両親|りょうしん}がベトナムで{取|と}ってくれた{書類|しょるい}です。{郵送|ゆうそう}に{時間|じかん}がかかりましたが、{不足|ふそく}がないよう、{何度|なんど}も{確認|かくにん}いたしました。', text: '"Đây là giấy tờ bố mẹ tôi ở Việt Nam xin giúp ạ. Gửi qua bưu điện mất khá nhiều thời gian, nhưng tôi đã kiểm tra nhiều lần để không thiếu sót gì ạ."' },
      { sp: 'Nhân viên shiyakusho', jp: 'はい、すべて{揃|そろ}っております。では、こちらに{署名|しょめい}をお{願|ねが}いいたします。…はい、{婚姻届|こんいんとどけ}を{受理|じゅり}いたしました。おめでとうございます。', text: '"Vâng, mọi thứ đã đầy đủ ạ. Xin anh chị ký tên vào đây ạ. …Vâng, tôi đã tiếp nhận giấy đăng ký kết hôn của anh chị. Xin chúc mừng anh chị ạ."' },
      {
        prompt: 'Con dấu受理 vừa đóng xuống. {name} nhìn Yui — từ giây phút này, hai người là vợ chồng trước pháp luật.',
        choice: [
          { label: 'Nắm chặt tay Yui và cảm ơn cán bộ bằng kính ngữ trang trọng', fx: { jp: 2, love: 2 }, note: 'Cưới Yui: khoảnh khắc nhận giấy — xúc động mà vẫn lễ phép ở quầy thủ tục', say: [
            { sp: 'hero', jp: 'ありがとうございました。{今日|きょう}のことは、{一生|いっしょう}{忘|わす}れません。{二人|ふたり}で{力|ちから}を{合|あ}わせて、{幸|しあわ}せな{家庭|かてい}を{築|きず}いてまいります。', text: '"Cảm ơn anh/chị rất nhiều ạ. Chuyện hôm nay, cả đời tôi sẽ không quên. Hai chúng tôi sẽ cùng nhau vun đắp một gia đình hạnh phúc ạ."' },
            { sp: 'Yui', jp: '…{聞|き}いた？「{家庭|かてい}」だって。ねえ、もう{他人|たにん}じゃないんだね、わたしたち。', text: '"…Anh nghe không? Anh nói “gia đình” đấy. Này, từ giờ mình không còn là người ngoài của nhau nữa rồi nhỉ."' } ] },
          { label: 'Cười rạng rỡ, giơ tờ giấy lên như một tấm bằng tốt nghiệp đời người', fx: { love: 2 }, note: 'Cưới Yui: niềm vui vỡ oà ngay tại sảnh shiyakusho', say: [
            { sp: 'narr', text: '{name} giơ bản sao tờ giấy lên ngang tầm mắt, đọc đi đọc lại hai cái tên đặt cạnh nhau, rồi bật cười thành tiếng giữa sảnh — cán bộ quầy cũng mỉm cười theo. Yui huých nhẹ khuỷu tay: "Chồng em ơi, người ta đang nhìn kìa." Hai chữ "chồng em" — nghe lần đầu, mà ấm như đã nghe cả đời.' } ] }
        ]
      },
      { sp: 'narr', text: 'Tối hôm đó, căn phòng nhỏ của hai vợ chồng chật kín màn hình điện thoại: cuộc gọi video bốn nhà — bố mẹ {name} ở quê, bố mẹ Yui ở quê nhà của cô. Hai thứ tiếng交 nhau trong một khung hình, và ở giữa là {name} — người phiên dịch hạnh phúc nhất thế giới tối nay.' },
      { sp: 'Mẹ của Yui', jp: '{二人|ふたり}とも、おめでとう。{遠|とお}い{国|くに}から{来|き}て、{娘|むすめ}を{大切|たいせつ}にしてくれて、ありがとう。{体|からだ}に{気|き}をつけて、{仲良|なかよ}くね。', text: '"Chúc mừng hai con. Cảm ơn con đã từ một đất nước xa xôi đến đây, và đã trân trọng con gái của bố mẹ. Giữ gìn sức khoẻ, và sống hoà thuận với nhau nhé."' },
      { sp: 'hero', text: '"Mẹ của Yui nói: chúc mừng hai đứa, cảm ơn con đã sang từ nơi xa và đã trân trọng Yui. Mẹ dặn hai đứa giữ sức khoẻ, sống hoà thuận với nhau." {name} dịch từng chữ thật chậm, để bố mẹ ở quê nghe trọn vẹn tấm lòng của thông gia bên kia màn hình.' },
      { sp: 'Mẹ', text: '"Ông bà thông gia ơi, nhà tôi ở xa, không qua được tận nơi. Yui về làm dâu nhà này, vợ chồng tôi thương nó như con ruột. Hai đứa nó ở bên ấy có nhau, chúng tôi ở quê cũng yên tâm phần nào rồi." Mẹ nói, mắt đỏ hoe, tay cứ nắm chặt tay bố ngồi bên cạnh.' },
      { sp: 'Bố của Yui', jp: '{言葉|ことば}は{違|ちが}っても、{子|こ}を{思|おも}う{気持|きも}ちは{同|おな}じですね。{今日|きょう}から、わたしたちは{家族|かぞく}です。どうぞよろしくお{願|ねが}いいたします。', text: '"Ngôn ngữ có khác nhau, nhưng tấm lòng nghĩ cho con cái thì giống nhau. Từ hôm nay, chúng ta là một gia đình. Mong được hai bên giúp đỡ lẫn nhau."' },
      { sp: 'hero', text: '"Bố của Yui nói: tiếng nói khác nhau, nhưng lòng thương con thì như nhau. Từ hôm nay, hai nhà là một gia đình." Dịch xong câu ấy, {name} im lặng một giây — vì nhận ra mình vừa dịch câu quan trọng nhất đời mình, và dịch không sót một chữ nào.' },
      { sp: 'Yui', jp: 'お{父|とう}さん、お{母|かあ}さん、ありがとう。わたし、{幸|しあわ}せになるよ。{心配|しんぱい}しないでね。', text: '"Bố, mẹ, con cảm ơn. Con sẽ hạnh phúc. Bố mẹ đừng lo nhé." — Yui nói với bố mẹ mình, rồi quay sang màn hình phía Việt Nam, chắp tay cúi đầu thật thấp, nói bằng thứ tiếng Việt còn ngượng ngập mà chân thành: "Con cảm ơn bố mẹ. Con sẽ chăm sóc anh ấy thật tốt ạ."' },
      { sp: 'narr', text: 'Cuối tuần, bạn bè ký túc mở một tiệc nhỏ chúc mừng ngay tại phòng sinh hoạt chung: bánh kem mua chung, vài món ăn tự nấu, và một tấm băng-rôn viết tay hơi nguệch ngoạc dòng chữ hai thứ tiếng. Không váy cưới lộng lẫy, không nhà hàng sang — chỉ có những con người đã cùng nhau đi qua những ngày khó nhất ở xứ người.' },
      { sp: 'Hùng', jp: 'おい、{新郎|しんろう}。{初|はじ}めて{会|あ}った{頃|ころ}のおまえ、{日本語|にほんご}ペラペラじゃなかったのにな。…いや、{立派|りっぱ}になったよ。{本当|ほんとう}に、おめでとう。', text: '"Này chú rể. Hồi mới quen, tiếng Nhật của mày còn chưa sõi cơ mà. …Không, mày trưởng thành thật rồi đấy. Thật lòng chúc mừng mày."' },
      { sp: 'Chị Mai', text: '"Chị chẳng có gì nhiều, tặng hai đứa bộ nồi nhỏ này — nồi của nhà mới cưới, nấu bữa đầu tiên cho nhớ." Chị Mai cười, mắt cũng rơm rớm. "Ở đất khách, có người để trở về nhà cùng — thế là giàu nhất rồi, hai đứa ạ."' },
      { sp: 'narr', text: 'Giữa tiệc, Yui kéo {name} ra hành lang, chỉ về hướng ga — xa xa là hướng Akihabara, nơi có cửa hàng combini nhỏ năm ấy. "Nếu hôm đó anh không bước vào cửa hàng của em…" Yui bỏ lửng câu nói. {name} nắm lấy tay vợ, đáp nốt phần còn lại bằng một cái siết tay thật chặt.' },
      { sp: 'hero', jp: 'あの{日|ひ}、{店|みせ}に{入|はい}ってよかった。{人生|じんせい}で{一番|いちばん}の{選択|せんたく}だったよ。これからも、よろしくな、ユイ。', text: '"Ngày hôm đó, bước vào cửa hàng ấy là lựa chọn đúng nhất đời anh. Từ nay về sau, mong em tiếp tục ở bên anh nhé, Yui."' },
      { sp: 'narr', text: 'Đêm xuống, hai vợ chồng đi bộ về phòng qua con phố quen. Tờ giấy đăng ký kết hôn nằm ngay ngắn trong bìa hồ sơ, như một hạt giống vừa được gieo xuống đất tốt. Một gia đình mới — bắt đầu từ một cửa hàng combini, một chiếc onigiri được hâm nóng, và hai con người đã chọn nhau giữa một đất nước xa nhà.' }
    ]
  },

  /* ================= CƯỚI 2 — HẰNG (tuyến nam) ================= */
  'c5-marry-hang': {
    scene: '💍 Chương 5 «Lớn rồi» — Đám cưới xa xứ của {name} và Hằng',
    branch: [
      { sp: 'narr', text: 'Không hoa cưới nhập khẩu, không sảnh tiệc lớn. Đám cưới của {name} và Hằng bắt đầu bằng một buổi sáng bình thường ở shiyakusho — hai đứa con xa xứ, cùng nghèo, cùng chí hướng, tay trong tay bước vào quầy thủ tục với bìa hồ sơ đã chuẩn bị suốt một tháng. Giàu nhất trong hồ sơ ấy không phải tiền — là hai chữ "cùng nhau" viết đi viết lại qua bao năm tháng.' },
      { sp: 'Nhân viên shiyakusho', jp: 'おはようございます。{婚姻届|こんいんとどけ}のご{提出|ていしゅつ}ですね。{書類|しょるい}を{確認|かくにん}いたしますので、{少々|しょうしょう}お{待|ま}ちください。', text: '"Chào buổi sáng ạ. Anh chị đến nộp giấy đăng ký kết hôn phải không ạ. Tôi xin kiểm tra giấy tờ, xin vui lòng đợi một chút ạ."' },
      { sp: 'hero', jp: 'はい、{婚姻届|こんいんとどけ}と、ベトナムから{取|と}り{寄|よ}せた{独身証明書|どくしんしょうめいしょ}、その{翻訳文|ほんやくぶん}を{提出|ていしゅつ}いたします。ご{確認|かくにん}をお{願|ねが}いいたします。', text: '"Vâng ạ, tôi xin nộp giấy đăng ký kết hôn, giấy chứng nhận độc thân xin từ Việt Nam và bản dịch của giấy đó. Xin anh/chị kiểm tra giúp ạ."' },
      { sp: 'Hằng', text: '"Anh nhìn tay em này, run hơn cả hôm thi vấn đáp." Hằng nói nhỏ, chỉ đủ hai đứa nghe, rồi bật cười khẽ. "Mà lạ thật — run thế này mà trong lòng em yên lắm. Chắc vì người đứng cạnh là anh."' },
      { sp: 'Nhân viên shiyakusho', jp: '{書類|しょるい}はすべて{揃|そろ}っております。{翻訳文|ほんやくぶん}も{確認|かくにん}できました。では、{署名欄|しょめいらん}にご{署名|しょめい}をお{願|ねが}いいたします。', text: '"Giấy tờ đã đầy đủ tất cả ạ. Bản dịch tôi cũng đã xác nhận xong. Xin anh chị ký tên vào ô chữ ký ạ."' },
      { sp: 'narr', text: 'Hai nét chữ ký đặt cạnh nhau trên cùng một tờ giấy — một nét đã viết tiếng Nhật bao năm nơi đất khách, một nét cũng vậy. Cán bộ đóng dấu受理, mỉm cười: "おめでとうございます。" Chỉ một câu chúc ngắn ngủi của người lạ, mà hai đứa nghe như pháo hoa nổ trong ngực.' },
      { sp: 'Hằng', jp: '{名前|なまえ}が{並|なら}んでる。…ねえ、{今日|きょう}からわたしの{苗字|みょうじ}の{横|よこ}に、あなたの{名前|なまえ}が{一生|いっしょう}{並|なら}ぶんだね。', text: '"Hai cái tên nằm cạnh nhau này. …Này anh, từ hôm nay, bên cạnh họ tên của em sẽ có tên anh nằm cạnh suốt cả đời đấy."' },
      {
        prompt: 'Ra khỏi shiyakusho, nắng trải vàng trên phố. Hằng nhìn tờ giấy trong tay {name} và nói: "Mình cưới thật rồi đấy."',
        choice: [
          { label: 'Ôm Hằng ngay trước cổng và hứa về một mái nhà tử tế', fx: { love: 2 }, note: 'Cưới Hằng: lời hứa giản dị mà chắc nịch của hai đứa xa xứ', say: [
            { sp: 'hero', text: '"Ừ, cưới thật rồi. Anh chưa hứa được nhà cao cửa rộng. Nhưng anh hứa: nhà mình sẽ không bao giờ thiếu tiếng cười, và em sẽ không bao giờ phải khóc một mình ở đất này nữa." {name} nói chậm, từng chữ như đóng đinh. Hằng tựa đầu vào vai chồng, gật đầu mãi không thôi.' } ] },
          { label: 'Đùa nhẹ cho bớt xúc động: "Từ nay lương của anh là của em quản nhé"', fx: { love: 1, jp: 1 }, note: 'Cưới Hằng: tiếng cười trong trẻo ngay sau khoảnh khắc trọng đại', say: [
            { sp: 'hero', jp: 'これで{正式|せいしき}に{夫婦|ふうふ}だな。{給料|きゅうりょう}の{管理|かんり}は、{今日|きょう}からハンの{担当|たんとう}でいいよ。{俺|おれ}は{小遣|こづか}い{制|せい}で{頑張|がんば}る。', text: '"Vậy là chính thức thành vợ chồng rồi nhé. Việc quản lý lương, từ hôm nay giao cho Hằng phụ trách cũng được. Anh sẽ cố gắng sống bằng tiền tiêu vặt thôi." — Hằng phá lên cười giữa phố, nước mắt còn chưa khô trên má: "Anh nói đấy nhé. Ghi âm rồi đấy!"' } ] }
        ]
      },
      { sp: 'narr', text: 'Tiệc cưới của hai đứa diễn ra ở một quán ăn Việt nhỏ gần ga — quán mà ngày mới sang, cả hai chỉ dám đứng ngoài nhìn thực đơn. Hôm nay, quán treo tấm rèm đỏ, kê thêm hai dãy bàn dài. Bạn bè ký túc xúm vào: người làm phù dâu, người làm phù rể, người kiêm luôn MC bằng thứ tiếng Việt pha tiếng Nhật cười ra nước mắt.' },
      { sp: 'Đức', text: '"Tớ làm phù rể mà hồi hộp hơn cả chú rể." Đức chỉnh lại chiếc nơ mượn, cười toe. "Hai cậu là minh chứng sống: ở đất khách, nghèo không đáng sợ. Đáng sợ là không có ai cùng mình đi qua cái nghèo ấy."' },
      { sp: 'Hùng', jp: 'おい、{新婦|しんぷ}の{友人|ゆうじん}として{一言|ひとこと}。こいつは{不器用|ぶきよう}だが、{約束|やくそく}は{守|まも}る{男|おとこ}だ。ハン、{安心|あんしん}していいぞ。', text: '"Này, với tư cách bạn của cô dâu, tôi nói một câu. Thằng này vụng về thật, nhưng là thằng giữ lời hứa. Hằng à, em cứ yên tâm nhé."' },
      { sp: 'narr', text: 'Giữa tiệc, chiếc máy tính bảng đặt ở vị trí trang trọng nhất bàn tiệc sáng lên: bố mẹ hai bên ở quê dự tiệc cưới của con qua màn hình. Quê nhà cách nửa vòng trái đất bỗng ngồi chung một bàn — nhờ một đường truyền internet và rất nhiều nước mắt mừng.' },
      { sp: 'Mẹ', text: '"Hai đứa nghe mẹ nói này." Mẹ của {name} ghé sát màn hình, giọng nghẹn đi. "Nhà mình không có điều kiện làm đám cưới lớn cho các con. Nhưng các con khoẻ mạnh, thương nhau thật lòng — thế là bố mẹ hai bên mãn nguyện rồi. Ráng ăn uống đầy đủ, đừng tiết kiệm quá mà ốm ra đấy, nghe chưa."' },
      { sp: 'Hằng', text: '"Bố mẹ hai bên cứ yên tâm ạ." Hằng nắm tay {name}, hướng về màn hình nói rõ từng chữ. "Tụi con ở bên này có nhau, có bạn bè tốt. Tụi con sẽ sống tử tế, dành dụm tử tế, và nhất định sẽ có ngày đưa bố mẹ sang chơi, đứng đúng chỗ này mà chụp một tấm hình chung."' },
      { sp: 'Bố', text: 'Bố — người đàn ông cả đời ít nói — ngồi sau mẹ, chỉ gật đầu liên tục, mãi mới thốt được một câu: "Bố… bố tự hào về hai đứa." Nói xong, ông quay mặt đi, lấy tay áo quệt mắt thật nhanh, tưởng không ai thấy — mà cả bàn tiệc phía Nhật đều thấy, và đều lặng đi một nhịp vì thương.' },
      { sp: 'narr', text: 'Tiệc tan, bạn bè dọn dẹp cùng quán như người nhà. Trên đường về, Hằng xách đôi giày cao gót mượn của bạn, đi chân đất một đoạn ngắn trên vỉa hè mát lạnh, cười khúc khích: "Đám cưới của người ta tốn cả trăm man. Đám cưới của mình tốn ít hơn nhiều — mà em thấy mình giàu hơn họ."' },
      { sp: 'hero', text: '"Vì nhà mình giàu bạn bè, giàu bố mẹ khoẻ mạnh, và giàu…" {name} chưa nói hết câu, Hằng đã tiếp lời: "Giàu nhau." Hai vợ chồng nhìn nhau cười giữa phố đêm, tay vẫn nắm chặt như buổi sáng ở shiyakusho — chỉ khác là bây giờ, cái nắm tay ấy đã có thêm một tờ giấy của pháp luật và một đời người phía trước làm chứng.' },
      { sp: 'narr', text: 'Đêm đầu tiên của vợ chồng son, căn phòng trọ nhỏ được trang trí bằng đúng một bình hoa bạn tặng và tấm ảnh tiệc cưới in vội. Hạnh phúc của người xa xứ đôi khi bé nhỏ như vậy — mà đựng vừa cả một tương lai.' }
    ]
  },

  /* ================= CƯỚI 3 — REN (tuyến nữ) ================= */
  'c5-marry-ren': {
    scene: '💍 Chương 5 «Lớn rồi» — Nộp giấy kết hôn với Ren ở shiyakusho',
    branch: [
      { sp: 'narr', text: 'Buổi sáng nộp 婚姻届， Ren — anh đầu bếp quán nhậu ở 新橋 — mặc bộ vest mượn của chủ quán, đứng ngồi không yên trong sảnh shiyakusho. Người đàn ông cầm dao bếp chắc tay bao năm, hôm nay cầm cây bút mà tay cứ trượt. {name} nhìn người thương, vừa thương vừa buồn cười, nắm lấy tay anh để cả hai cùng bình tĩnh lại.' },
      { sp: 'Nhân viên shiyakusho', jp: 'おはようございます。{婚姻届|こんいんとどけ}のご{提出|ていしゅつ}ですね。{必要書類|ひつようしょるい}を{確認|かくにん}させていただきます。', text: '"Chào buổi sáng ạ. Anh chị đến nộp giấy đăng ký kết hôn phải không ạ. Xin cho tôi kiểm tra các giấy tờ cần thiết ạ."' },
      { sp: 'hero', jp: 'はい、こちらが{婚姻届|こんいんとどけ}と、ベトナムの{独身証明書|どくしんしょうめいしょ}、{翻訳文|ほんやくぶん}でございます。ご{確認|かくにん}をお{願|ねが}い{申|もう}し{上|あ}げます。', text: '"Vâng ạ, đây là giấy đăng ký kết hôn, giấy chứng nhận độc thân của Việt Nam và bản dịch ạ. Xin anh/chị kiểm tra giúp chúng tôi ạ."' },
      { sp: 'Ren', jp: 'あの…{字|じ}、{間違|まちが}えたらどうしよう。{包丁|ほうちょう}は{毎日|まいにち}{持|も}つのに、ペンがこんなに{重|おも}いなんて。', text: '"Này… nếu anh viết sai chữ thì sao đây. Ngày nào anh cũng cầm dao bếp, mà sao cây bút hôm nay nặng thế này."' },
      { sp: 'hero', jp: 'だいじょうぶ。{間違|まちが}えたら、{新|あたら}しい{用紙|ようし}をもらえばいいだけだよ。…ねえレン、{新橋|しんばし}の{店|みせ}で{初|はじ}めてあなたの{料理|りょうり}を{食|た}べた{日|ひ}、{覚|おぼ}えてる？あの{日|ひ}から、ずっと{今日|きょう}まで{来|き}たんだよ。', text: '"Không sao đâu. Viết sai thì xin tờ giấy mới là được mà. …Này Ren, anh còn nhớ ngày em lần đầu ăn món anh nấu ở quán tại Shinbashi không? Từ ngày hôm đó, mình đã đi một mạch tới tận hôm nay đấy."' },
      { sp: 'Nhân viên shiyakusho', jp: '{書類|しょるい}はすべて{揃|そろ}っております。{翻訳文|ほんやくぶん}の{内容|ないよう}も{確認|かくにん}できました。では、{署名|しょめい}をお{願|ねが}いいたします。…はい、{受理|じゅり}いたしました。おめでとうございます。', text: '"Giấy tờ đã đầy đủ tất cả ạ. Nội dung bản dịch tôi cũng đã xác nhận xong. Xin anh chị ký tên ạ. …Vâng, tôi đã tiếp nhận. Xin chúc mừng anh chị ạ."' },
      { sp: 'Ren', jp: '{緊張|きんちょう}しすぎて、{朝|あさ}ごはんも{喉|のど}を{通|とお}らなかった。でも、{署名|しょめい}だけは{一発|いっぱつ}で{書|か}けた。{練習|れんしゅう}したからな、{三十回|さんじゅっかい}も。', text: '"Anh căng thẳng đến mức bữa sáng cũng không nuốt nổi. Nhưng riêng chữ ký thì anh viết một phát ăn ngay. Vì anh đã tập ký tới ba mươi lần rồi mà."' },
      {
        prompt: 'Con dấu đỏ đóng xuống tờ giấy. Ren nhìn chằm chằm vào hai cái tên, rồi quay sang {name} với đôi mắt đỏ hoe hiếm thấy ở một anh đầu bếp lì lợm.',
        choice: [
          { label: 'Đưa khăn tay cho Ren và cùng cảm ơn cán bộ thật trang trọng', fx: { jp: 2, love: 2 }, note: 'Cưới Ren: khoảnh khắc xúc động kín đáo tại quầy shiyakusho', say: [
            { sp: 'hero', jp: 'ありがとうございました。{二人|ふたり}で{支|ささ}え{合|あ}って、{温|あたた}かい{家庭|かてい}を{築|きず}いてまいります。', text: '"Cảm ơn anh/chị rất nhiều ạ. Hai chúng tôi sẽ nương tựa vào nhau, vun đắp một gia đình ấm áp ạ."' },
            { sp: 'Ren', jp: '…{泣|な}いてない。{玉|たま}ねぎのせいだ。…この{役所|やくしょ}に、{玉|たま}ねぎはないけどな。', text: '"…Anh không khóc. Tại hành tây thôi. …Dù ở cái shiyakusho này thì chẳng có củ hành nào cả." — cả quầy bật cười trong nước mắt.' } ] },
          { label: 'Nắm tay Ren giơ cao: "Từ hôm nay, em là vợ của anh đầu bếp này rồi!"', fx: { love: 2 }, note: 'Cưới Ren: niềm vui bộc trực lan ra cả sảnh chờ', say: [
            { sp: 'narr', text: 'Tiếng vỗ tay lác đác vang lên từ hàng ghế chờ — những người lạ cũng đang chờ làm thủ tục của đời mình. Ren đỏ mặt tía tai, cúi chào lia lịa theo thói quen nhà bếp: "ありがとうございます！" Chào xong mới nhận ra mình vừa chào cả sảnh như chào khách vào quán, khiến {name} cười đến chảy nước mắt.' } ] }
        ]
      },
      { sp: 'narr', text: 'Tối đó, quán nhậu ở 新橋 đóng cửa sớm một hôm — treo biển "本日貸切" (hôm nay bao trọn quán). Chủ quán tự tay đứng bếp, nấu một bữa tiệc nhỏ mừng hai vợ chồng. Đồng nghiệp của Ren, bạn bè của {name}, chật kín quán nhỏ thơm mùi than nướng và niềm vui.' },
      { sp: 'Chủ quán nhậu', jp: 'レン、よくやった。{異国|いこく}から{来|き}た{人|ひと}を{幸|しあわ}せにするのはな、{腕|うで}と{心|こころ}の{両方|りょうほう}がいるんだ。おまえには、その{両方|りょうほう}がある。おめでとう。', text: '"Ren, giỏi lắm. Muốn làm cho một người từ xứ khác hạnh phúc thì cần cả tay nghề lẫn tấm lòng. Cháu có cả hai thứ đó. Chúc mừng cháu."' },
      { sp: 'Ren', jp: '{親方|おやかた}、ありがとうございます。…なあ、{最初|さいしょ}に{店|みせ}に{来|き}た{日|ひ}、{緊張|きんちょう}して{注文|ちゅうもん}もまともにできなかったのに、{笑顔|えがお}で「おいしい」って{言|い}ってくれた。あの{一言|ひとこと}が、ずっと{忘|わす}れられなかったんだ。', text: '"Sư phụ, cháu cảm ơn bác. …Này em, ngày đầu em tới quán, căng thẳng đến mức gọi món còn lúng túng, vậy mà em vẫn cười và nói “ngon lắm”. Một câu nói ấy, anh không quên được suốt bao năm."' },
      { sp: 'narr', text: 'Giữa tiệc, màn hình điện thoại sáng lên cuộc gọi video: bố mẹ Ren ở quê nhà Nhật và bố mẹ {name} ở Việt Nam — hai gia đình cách nhau một biển Đông, gặp nhau lần đầu trong ngày cưới của con. {name} ngồi giữa, phiên dịch hai chiều, câu nào cũng dịch bằng cả trái tim.' },
      { sp: 'Mẹ của Ren', jp: '{遠|とお}い{国|くに}から{来|き}てくれて、ありがとう。{言葉|ことば}も{食|た}べ{物|もの}も{違|ちが}うけれど、{家族|かぞく}に{国境|こっきょう}はないと、わたしは{思|おも}います。レンのこと、よろしくね。', text: '"Cảm ơn con đã từ một đất nước xa xôi đến đây. Tiếng nói và món ăn có khác nhau, nhưng gia đình thì không có biên giới — bác nghĩ vậy. Mong con chăm sóc cho Ren nhé."' },
      { sp: 'hero', text: '"Mẹ của Ren nói: cảm ơn con đã sang từ nơi xa. Tiếng nói, món ăn có khác, nhưng gia đình thì không có biên giới. Mẹ gửi gắm Ren cho con." {name} dịch xong, quay sang mẹ chồng mỉm cười: bằng tiếng Nhật, cô đáp lại từng chữ rõ ràng — lời hứa của một người con dâu mới.' },
      { sp: 'hero', jp: 'はい、お{任|まか}せください。レンのことも、こちらの{家族|かぞく}のことも、{大切|たいせつ}にします。{二人|ふたり}の{国|くに}の{味|あじ}が{並|なら}ぶ{食卓|しょくたく}を、{作|つく}っていきたいです。', text: '"Vâng, xin cứ giao cho con ạ. Con sẽ trân trọng cả Ren lẫn gia đình bên này. Con muốn vun đắp một mâm cơm có đủ hương vị của cả hai quê hương đặt cạnh nhau ạ."' },
      { sp: 'Mẹ', text: '"Bà thông gia ơi, con gái tôi ở bên ấy, từ nay nhờ ông bà để mắt tới nó như con trong nhà." Mẹ của {name} nói qua màn hình, giọng vừa mừng vừa nghẹn. "Nó vụng lắm, nấu ăn thì…" — cả quán nhậu ở Shinbashi bật cười, Ren giơ tay xin hàng: "Mẹ ơi, khoản nấu ăn cứ để con lo ạ!"' },
      { sp: 'narr', text: 'Khác biệt văn hoá đáng yêu nhất của nhà này, hoá ra, nằm ngay trên mâm cơm: Ren học cách ăn nước mắm pha ớt, {name} học cách nêm dashi không đường. Tiệc tan muộn, hai vợ chồng đi bộ qua phố Shinbashi về đêm — nơi tình yêu của họ bắt đầu bằng một món ăn, và hôm nay được pháp luật đóng dấu xác nhận bằng một tờ giấy trang trọng.' },
      { sp: 'hero', text: '"Ren này." {name} nắm tay chồng khi cả hai đứng chờ đèn xanh. "Cảm ơn anh đã chờ em học xong tiếng Nhật của trái tim mình." Ren cười, đáp bằng câu tiếng Việt anh tập suốt một tuần để nói đúng hôm nay: "Anh sẽ nấu cho em ăn, cả đời."' }
    ]
  },

  /* ================= CƯỚI 4 — KHÔI (tuyến nữ) ================= */
  'c5-marry-khoi': {
    scene: '💍 Chương 5 «Lớn rồi» — Đám cưới thực tế và ấm áp của {name} và Khôi',
    branch: [
      { sp: 'narr', text: 'Khôi — chàng trai Việt làm kho vận, thực tế đến mức khô khan trong mắt người ngoài — đã chuẩn bị ngày hôm nay theo cách của riêng anh: một bìa hồ sơ sắp xếp theo mục lục đánh số, một danh sách việc cần làm in ra giấy, và một cái hẹn ở shiyakusho đặt từ tuần trước. Tình yêu của Khôi không ồn ào. Nó nằm ở chỗ không một tờ giấy nào bị thiếu.' },
      { sp: 'Nhân viên shiyakusho', jp: 'おはようございます。{婚姻届|こんいんとどけ}のご{提出|ていしゅつ}ですね。{書類|しょるい}を{順番|じゅんばん}に{確認|かくにん}させていただきます。', text: '"Chào buổi sáng ạ. Anh chị đến nộp giấy đăng ký kết hôn phải không ạ. Tôi xin kiểm tra giấy tờ theo thứ tự ạ."' },
      { sp: 'Khôi', text: '"Đây, mục một là đơn, mục hai là giấy độc thân của hai đứa xin từ quê, mục ba là bản dịch, mục bốn là bản sao thẻ lưu trú." Khôi trình bày rành rọt như báo cáo kho hàng. Cán bộ quầy ngẩng lên, hơi bất ngờ trước sự ngăn nắp — rồi mỉm cười gật đầu liên tục.' },
      { sp: 'hero', jp: 'すみません、{彼|かれ}は{仕事柄|しごとがら}、{何|なん}でも{一覧表|いちらんひょう}にしないと{落|お}ち{着|つ}かないんです。でも、その{真面目|まじめ}さに、わたしは{何度|なんど}も{救|すく}われてきました。', text: '"Xin lỗi anh/chị, anh ấy làm nghề kho vận nên việc gì cũng phải lên danh sách mới yên tâm được. Nhưng chính sự nghiêm túc ấy đã cứu em rất nhiều lần ạ." — {name} nói, mắt cười nhìn người thương.' },
      { sp: 'Nhân viên shiyakusho', jp: '{書類|しょるい}はすべて{揃|そろ}っております。とても{丁寧|ていねい}なご{準備|じゅんび}ですね。では、ご{署名|しょめい}をお{願|ねが}いいたします。…はい、{受理|じゅり}いたしました。おめでとうございます。', text: '"Giấy tờ đã đầy đủ tất cả ạ. Anh chị chuẩn bị rất chu đáo. Xin anh chị ký tên ạ. …Vâng, tôi đã tiếp nhận. Xin chúc mừng anh chị ạ."' },
      { sp: 'narr', text: 'Trước khi rời quầy, Khôi còn cẩn thận hỏi lại cán bộ về thủ tục đổi thông tin trên thẻ lưu trú sau kết hôn — hỏi xong, ghi chú vào điện thoại, gật đầu cảm ơn. {name} đứng cạnh, vừa buồn cười vừa ấm lòng: lấy một người chồng chu toàn đến từng tờ giấy, hoá ra là một loại hạnh phúc rất yên ổn.' },
      { sp: 'hero', jp: '{手続|てつづ}きの{確認|かくにん}まで{完璧|かんぺき}だね、コイ。{私|わたし}、{今日|きょう}のこの{安心感|あんしんかん}を、{一生|いっしょう}{忘|わす}れないと{思|おも}う。', text: '"Đến cả việc xác nhận thủ tục anh cũng chu toàn hết, Khôi à. Em nghĩ, cảm giác yên tâm của ngày hôm nay, em sẽ không quên được suốt đời đâu."' },
      {
        prompt: 'Ra khỏi shiyakusho, Khôi mở điện thoại, đánh dấu "xong" vào mục cuối cùng của danh sách chuẩn bị đám cưới.',
        choice: [
          { label: 'Trêu Khôi: "Mục tiếp theo trong danh sách là gì, chồng?"', fx: { love: 2 }, note: 'Cưới Khôi: tiếng cười nhẹ ngay sau thủ tục — đúng chất cặp đôi thực tế', say: [
            { sp: 'Khôi', text: 'Khôi nhìn màn hình, trả lời nghiêm túc như thật: "Mục tiếp theo: chụp ảnh kỷ niệm trước cổng, trong vòng mười phút. Mục sau nữa: về quán Việt ăn trưa với mọi người. Mục cuối của hôm nay…" Anh ngừng lại, cất điện thoại vào túi, nắm tay vợ. "Mục cuối là: không có mục nào nữa. Phần còn lại của đời mình, anh không lên danh sách — mình cùng nhau viết dần."' } ] },
          { label: 'Tựa vào vai Khôi và cảm ơn anh vì sự vững chãi bao năm', fx: { love: 2, jp: 1 }, note: 'Cưới Khôi: lời cảm ơn dành cho người đàn ông của những việc làm lặng lẽ', say: [
            { sp: 'hero', jp: '{荷物|にもつ}の{重|おも}い{日|ひ}も、{熱|ねつ}を{出|だ}した{夜|よる}も、コイはいつも{黙|だま}って{側|そば}にいてくれたね。{言葉|ことば}より{先|さき}に、{手|て}が{動|うご}く{人|ひと}。…{今日|きょう}から、{正式|せいしき}に{家族|かぞく}だね。', text: '"Những ngày hành lý nặng nhọc, những đêm em sốt cao, Khôi lúc nào cũng lặng lẽ ở bên. Anh là người hành động trước lời nói. …Từ hôm nay, mình chính thức là gia đình rồi nhỉ."' } ] }
        ]
      },
      { sp: 'narr', text: 'Bữa tiệc nhỏ tổ chức ở quán Việt quen thuộc — nơi hai đứa từng ăn mừng lần đậu kỳ thi tiếng Nhật đầu tiên. Hôm nay quán dọn thêm bàn, treo mấy quả bóng bay, và nồi lẩu lớn nhất được bưng ra giữa tiếng vỗ tay của bạn bè ký túc. Phù dâu, phù rể đều là những gương mặt đã cùng hai đứa đi qua những năm tháng chật vật nhất.' },
      { sp: 'Hùng', jp: 'おいコイ、{倉庫|そうこ}の{棚|たな}より{大事|だいじ}なものを、{今日|きょう}から{預|あず}かるんだぞ。{落|お}としたり{傷|きず}つけたりしたら、{承知|しょうち}しないからな。…おめでとう、{二人|ふたり}とも。', text: '"Này Khôi, từ hôm nay mày trông giữ thứ quý hơn mọi kệ hàng trong kho đấy. Làm rơi hay làm xước là tao không để yên đâu. …Chúc mừng cả hai đứa."' },
      { sp: 'Khôi', text: '"Yên tâm." Khôi đáp gọn lỏn, đúng phong cách của anh. "Hàng này, anh kiểm kê mỗi ngày. Thiếu một nụ cười là anh biết ngay." Cả bàn cười ồ lên — câu nói đùa vụng về nhất buổi tiệc, và cũng là câu được vỗ tay to nhất, vì ai cũng biết nó là thật.' },
      { sp: 'narr', text: 'Giữa tiệc, hai chiếc điện thoại đặt cạnh nhau cùng sáng màn hình: hai gia đình ở hai miền quê Việt Nam cùng dự tiệc cưới của con qua video. Tiếng chúc phúc, tiếng trẻ con ở quê í ới đòi xem cô dâu chú rể, tiếng cười của hai bà mẹ — căn quán nhỏ ở Nhật bỗng thành chiếc cầu nối hai mái nhà quê.' },
      { sp: 'Mẹ', text: '"Khôi này, mẹ gửi con bé cho con." Mẹ của {name} nói, tay lau nước mắt bằng vạt áo. "Nó ở nhà được chiều, sang bên ấy một mình chịu bao nhiêu khổ. Từ nay có con bên cạnh, mẹ ngủ ngon hơn nhiều rồi. Hai đứa thương nhau, nhường nhau — thế là đủ giàu, con ạ."' },
      { sp: 'Bố', text: 'Bố của Khôi ở đầu dây bên kia tiếp lời, giọng trầm và chắc: "Nhà trai nhà gái giờ là một nhà. Các con ở xa, tự lo cho nhau là chính. Bố chỉ dặn một câu: vợ chồng như hai người chèo một thuyền. Chèo cùng nhịp thì sóng nào cũng qua." Cả bàn tiệc phía Nhật im lặng nghe, rồi vỗ tay rần rần.' },
      { sp: 'hero', text: '"Bố mẹ hai bên yên tâm ạ." {name} đứng dậy, nắm tay Khôi, hướng về hai màn hình nói rõ ràng. "Tụi con không hứa những điều lớn lao. Tụi con chỉ hứa mỗi ngày đều tử tế với nhau — như cách tụi con đã đi từ ngày đầu tới hôm nay." Khôi gật đầu bên cạnh, siết tay vợ chặt thêm một chút thay cho mọi lời thề.' },
      { sp: 'Chị Mai', text: '"Chị nói thật này hai đứa." Chị Mai vừa lau bàn vừa nói. "Đám cưới không cần lớn. Cần nhất là hai đứa nhìn nhau cái cách hai đứa đang nhìn nhau bây giờ — sau mười năm nữa vẫn thế. Chị tin hai đứa làm được."' },
      { sp: 'narr', text: 'Tiệc tan, hai vợ chồng ở lại phụ dọn quán cùng bạn bè — cô dâu chú rể xắn tay rửa bát, đúng chất những đứa con xa xứ không nề hà việc gì. Trên đường về phòng, Khôi mở danh sách trong điện thoại, xoá hết các mục chuẩn bị đám cưới, rồi tạo một danh sách mới chỉ có đúng một dòng.' },
      { sp: 'hero', text: '"Danh sách mới có một dòng thôi à anh?" {name} ghé mắt nhìn. Trên màn hình, dòng chữ ngắn ngủn của Khôi hiện lên: "Mục 1: sống tử tế với vợ, mỗi ngày." {name} bật cười, khoác tay chồng đi tiếp dưới phố đêm. Một đám cưới không xa hoa — mà là khởi đầu vững chãi nhất mà hai người từng có.' }
    ]
  },

  /* ================= CƯỚI 5 — LINH, YÊU XA (tuyến nam) ================= */
  'c5-marry-ld': {
    scene: '💍 Chương 5 «Lớn rồi» — Đoàn tụ với Linh ở sân bay Narita',
    branch: [
      { sp: 'narr', text: 'Bao nhiêu năm yêu xa được đếm bằng những cuộc gọi video lúc nửa đêm, những tin nhắn chúc ngủ ngon lệch múi giờ, và một lời hứa cũ: "Chờ anh." Tối nay, trong căn phòng nhỏ ở Nhật, {name} và Linh lại nhìn nhau qua màn hình — nhưng lần này, cuộc gọi không kết thúc bằng câu "ngủ sớm nhé", mà bắt đầu bằng một quyết định lớn nhất đời hai đứa.' },
      { sp: 'Linh', text: '"Anh này." Linh ghé sát màn hình, giọng nhỏ mà chắc. "Mình đã chờ nhau qua bao nhiêu mùa rồi. Em không muốn chờ thêm một mùa nào nữa trong vai người yêu xa. Mình… cưới nhau đi anh. Để em được sang với anh, đàng hoàng, với tư cách là vợ anh."' },
      { sp: 'hero', text: '"Linh…" {name} im lặng một lúc lâu vì xúc động. Bao năm qua, câu nói ấy đã được nghĩ tới hàng trăm lần trong những đêm trực ca dài. "Ừ. Cưới nhau. Anh sẽ lo thủ tục phía Nhật, em lo giấy tờ phía Việt Nam. Lần này, khoảng cách chỉ còn là một chuyến bay — và là chuyến bay một chiều."' },
      { sp: 'narr', text: 'Những tháng sau đó là những tháng của giấy tờ và chờ đợi: đăng ký kết hôn được hoàn tất với đầy đủ thủ tục phía Việt Nam, hồ sơ xin tư cách lưu trú cho vợ được nộp lên nyukan, và mỗi tuần, hai người lại gọi video để cùng nhau gạch đi một mục trong danh sách chuẩn bị. Tình yêu xa, đến chặng cuối, hiện hình bằng những tờ giấy được sắp xếp tử tế.' },
      { sp: 'Linh', text: '"Hôm nay em nhận được kết quả rồi anh ạ." Giọng Linh trong điện thoại run lên. "Được rồi. Em được sang rồi. Tuần sau em bay." Ở đầu dây bên này, {name} ngồi thụp xuống sàn phòng, tay ôm mặt — bao năm chờ đợi, cuối cùng cũng có một ngày tháng cụ thể để mà đếm ngược.' },
      { sp: 'Linh', text: '"Anh biết không, em đã gấp vali xong từ hôm qua rồi." Linh cười trong điện thoại, giọng háo hức không giấu nổi. "Cả nhà cứ ra vào ngắm cái vali, như ngắm một điều kỳ diệu sắp xảy ra. Mẹ em còn gói theo bao nhiêu thứ, bảo là quà cho nhà chồng tương lai."' },
      { sp: 'hero', text: '"Em mang ít đồ thôi, còn lại sang đây mình sắm dần — sắm cho nhà của hai đứa." {name} đáp, rồi cả hai cùng im lặng cười qua điện thoại. Một tuần nữa thôi. Đếm ngược chưa bao giờ ngọt ngào đến thế.' },
      {
        prompt: 'Còn một tuần nữa Linh sẽ sang. {name} chuẩn bị cho ngày đoàn tụ thế nào?',
        choice: [
          { label: 'Dọn phòng ngăn nắp, mua hoa và nấu sẵn món Linh thích nhất', fx: { love: 2, money: -0.5 }, note: 'Yêu xa cưới: chuẩn bị tổ ấm nhỏ chờ ngày đoàn tụ', say: [
            { sp: 'narr', text: 'Cả tuần, {name} biến căn phòng trọ thành một tổ ấm thật sự: rèm mới, một chiếc bàn nhỏ cho hai người, và trong tủ lạnh là nguyên liệu của món Linh vẫn nhắc trong mọi cuộc gọi. Tối cuối cùng trước ngày bay, {name} tập đi tập lại câu chào sẽ nói ở sân bay — tập đến lần thứ mười thì tự cười mình: bao năm nói qua màn hình lưu loát thế, mà mai gặp thật lại hồi hộp như ngày đầu.' } ] },
          { label: 'Nhờ bạn bè ký túc cùng ra sân bay đón cho thêm phần long trọng', fx: { love: 2 }, note: 'Yêu xa cưới: bạn bè cùng ra Narita đón Linh — ngày đoàn tụ thành ngày hội', say: [
            { sp: 'Hùng', jp: 'おい、{空港|くうこう}まで{一緒|いっしょ}に{行|い}くぞ。{何年|なんねん}も{待|ま}った{二人|ふたり}の{再会|さいかい}だ、{盛大|せいだい}に{迎|むか}えてやろうじゃないか。{花|はな}は{俺|おれ}が{持|も}っていく。', text: '"Này, tao ra sân bay cùng mày. Hai đứa chờ nhau bao nhiêu năm mới có ngày đoàn tụ, phải đón cho long trọng chứ. Hoa để tao cầm cho."' } ] }
        ]
      },
      { sp: 'narr', text: 'Ngày đoàn tụ. Sân bay Narita — cùng một sân bay năm xưa {name} một mình kéo vali bước ra trong nước mắt chia xa, dặn lòng sẽ quay lại đây vào một ngày khác. Hôm nay, {name} đứng ở sảnh đến quốc tế, ôm bó hoa, mắt không rời bảng điện tử báo chuyến bay từ quê nhà: ĐÃ HẠ CÁNH.' },
      { sp: 'narr', text: 'Cửa tự động mở ra rồi khép lại bao nhiêu lần, bao nhiêu gương mặt xa lạ bước qua. Rồi — giữa dòng người, một dáng hình quen thuộc đến mức tim nhận ra trước cả mắt: Linh, kéo chiếc vali nhỏ, ngó nghiêng tìm kiếm. Vẫn là sân bay này. Vẫn hai con người này. Chỉ khác là lần trước, sân bay là nơi chia tay — còn hôm nay, nó là nơi đón về.' },
      { sp: 'Linh', text: '"Anh!" Linh bỏ cả vali, chạy ùa tới. Bao năm chỉ nhìn nhau qua một màn hình lạnh, giờ đây khoảng cách cuối cùng khép lại bằng một vòng tay thật. "Em sang thật rồi này. Từ nay… không còn là qua điện thoại nữa đâu."' },
      { sp: 'hero', text: '"Ừ. Không qua điện thoại nữa." {name} nói, giọng vỡ ra giữa sảnh sân bay đông người mà như chỉ còn hai đứa. "Chào mừng em về nhà. Nhà của chúng mình — từ hôm nay."' },
      { sp: 'narr', text: 'Trên chuyến tàu từ Narita về, Linh tựa đầu vào vai {name} ngủ thiếp đi vì chuyến bay dài — bàn tay vẫn nắm chặt tay chồng ngay cả trong giấc ngủ, như sợ tỉnh dậy sẽ thấy mình vẫn ở phía bên kia màn hình. {name} ngồi yên không dám động đậy, nhìn ra cửa sổ: những cánh đồng, những mái nhà Nhật Bản trôi qua — phong cảnh quen thuộc bỗng trở nên mới lạ, vì từ hôm nay, nó là phong cảnh của hai người.' },
      { sp: 'narr', text: 'Ga đến gần, {name} chỉ cho Linh qua cửa sổ những nơi chốn quen thuộc của đời mình ở Nhật: con phố đi làm, quán ăn trưa, cây cầu qua sông. Linh nghe chăm chú như nghe giới thiệu về một thế giới mà từ nay cô cũng thuộc về. Mọi địa danh xa lạ, từ hôm nay, bắt đầu có thêm một người cùng ghi nhớ.' },
      { sp: 'Linh', text: '"Quê mình ở sau lưng, nhà mình ở phía trước." Linh tỉnh dậy, nói khẽ khi tàu gần về tới ga. "Em không buồn đâu anh. Vì phía trước có anh. Mình cùng nhau xây từ đầu nhé — như cách mình đã chờ nhau từ đầu."' },
      { sp: 'hero', jp: 'ああ、{一緒|いっしょ}に{築|きず}いていこう。{何年|なんねん}も{待|ま}ってくれて、ありがとう、リン。{今日|きょう}から、{毎日|まいにち}が{再会|さいかい}だ。', text: '"Ừ, mình cùng nhau xây dựng nhé. Cảm ơn em đã chờ anh bao nhiêu năm, Linh à. Từ hôm nay, mỗi ngày đều là một ngày đoàn tụ."' },
      { sp: 'Linh', text: '"Căn phòng này em đã nhìn qua màn hình cả nghìn lần." Linh đứng giữa phòng, xoay một vòng chậm rãi. "Mà đứng thật ở đây mới thấy: nó nhỏ hơn em tưởng — và ấm hơn em tưởng rất nhiều. Chắc vì… nó là nhà mình."' },
      { sp: 'narr', text: 'Tối đầu tiên của hai vợ chồng ở Nhật khép lại bằng một bữa cơm nhà giản dị và một cuộc gọi video về quê: hai bên bố mẹ nhìn đôi trẻ ngồi cạnh nhau thật sự — không còn là hai khung hình ghép lại — mà mừng đến rơi nước mắt. Lời hứa năm xưa ở một sân bay khác, cuối cùng đã được giữ trọn vẹn, ở chính sân bay này.' }
    ]
  },

  /* ================= CƯỚI 6 — HẢI, YÊU XA (tuyến nữ) ================= */
  'c5-marry-ld-nu': {
    scene: '💍 Chương 5 «Lớn rồi» — Đoàn tụ với Hải ở sân bay Narita',
    branch: [
      { sp: 'narr', text: 'Yêu xa bao năm, {name} và Hải thuộc lòng múi giờ của nhau hơn cả múi giờ của chính mình: giờ này anh ấy vừa tan làm, giờ này bên ấy sắp mưa. Tối nay, cuộc gọi video thường nhật bỗng khác đi — Hải ngồi thẳng lưng, nghiêm túc lạ thường, như người sắp nói một điều đã chuẩn bị rất lâu.' },
      { sp: 'Hải', text: '"Em nghe anh nói này." Hải hít một hơi sâu qua màn hình. "Anh đã suy nghĩ cả năm nay rồi. Anh không muốn làm người yêu qua màn hình của em nữa. Anh muốn sang bên em — bằng tư cách rõ ràng nhất. Mình cưới nhau nhé em. Rồi anh sang, mình bắt đầu một cuộc sống thật, không phải qua điện thoại."' },
      { sp: 'hero', text: '"Hải…" Mắt {name} nhoè đi trước màn hình. Bao năm qua, những lúc ốm đau một mình, những đêm lễ tết xa nhà, chính giọng nói này đã ở bên qua một chiếc điện thoại. "Ừ. Mình cưới nhau. Em lo thủ tục phía Nhật, anh lo giấy tờ phía nhà mình. Chuyến bay tới của anh — sẽ là chuyến bay về nhà."' },
      { sp: 'narr', text: 'Hồ sơ đăng ký kết hôn phía Việt Nam, hồ sơ xin tư cách lưu trú diện vợ/chồng phía Nhật — từng tờ giấy là một viên gạch xây chiếc cầu cuối cùng qua biển. Có những tuần chờ đợi dài đến mức hai người chỉ biết động viên nhau bằng một câu cũ: "Mình đã chờ được bao năm, thêm vài tuần nữa có sao."' },
      { sp: 'Hải', text: '"Em ơi, có kết quả rồi." Giọng Hải trong điện thoại vỡ oà. "Anh được cấp rồi. Cuối tháng này anh bay sang với em. Thật rồi, không phải mơ nữa." {name} đứng giữa phòng, điện thoại áp tai, khóc cười lẫn lộn — ngày mà bao năm chỉ dám hình dung, cuối cùng cũng có tên trong lịch.' },
      { sp: 'Hải', text: '"Ở nhà đang mở tiệc chia tay anh từ hôm qua tới giờ." Hải kể qua điện thoại, giọng vui không giấu được. "Ai cũng dặn một câu giống nhau: sang đấy nhớ đối xử tốt với vợ. Em xem, chưa sang mà anh đã mang tiếng là phải nghe lời em rồi."' },
      { sp: 'hero', text: '"Thế thì tốt." {name} cười trong điện thoại. "Anh cứ giữ nguyên cái “tiếng” đó mà sang. Nhà mình có một quy định duy nhất thôi: chuyện gì cũng nói với nhau, không giấu. Bao năm yêu xa mình làm được, về chung một nhà càng phải làm được."' },
      {
        prompt: 'Chỉ còn ít ngày nữa Hải sẽ sang Nhật đoàn tụ. {name} dành những ngày chờ cuối cùng để làm gì?',
        choice: [
          { label: 'Học nấu món quê Hải thích nhất để đón anh bằng bữa cơm nhà đầu tiên', fx: { love: 2 }, note: 'Yêu xa cưới (nữ): bữa cơm quê chờ sẵn cho ngày đoàn tụ', say: [
            { sp: 'narr', text: 'Ba buổi tối liền, căn bếp nhỏ của {name} sáng đèn tới khuya: món ăn quê nhà của Hải được nấu thử, nếm, ghi chép, nấu lại. Chị Mai ghé qua nếm thử, gật gù: "Đón người thương bằng vị quê hương — thế là khôn nhất đấy em." Ngày đoàn tụ chưa tới, mà tình yêu đã kịp thơm lừng cả hành lang ký túc.' } ] },
          { label: 'Sắp xếp lại căn phòng thành tổ ấm cho hai người, từng góc nhỏ một', fx: { love: 1, jp: 1 }, note: 'Yêu xa cưới (nữ): dọn tổ ấm hai người chờ ngày Hải sang', say: [
            { sp: 'narr', text: 'Một chiếc tủ nữa được kê vào, đôi dép đi trong nhà thứ hai được đặt ngay ngắn cạnh cửa, chiếc cốc mới mua về đặt cạnh chiếc cốc cũ. {name} đứng giữa phòng ngắm nghía: bao năm nay, đây là phòng của một người gồng mình nơi đất khách. Từ tuần sau, nó sẽ là nhà của hai người nương tựa vào nhau.' } ] }
        ]
      },
      { sp: 'narr', text: 'Ngày Hải sang. Sảnh đến quốc tế sân bay Narita đông nghẹt người, và {name} đứng đó, tim đập như trống hội. Năm xưa, chính tại sân bay này, {name} đã ngoái lại nhìn quê hương lần cuối qua ô cửa máy bay, mang theo một lời hứa với người ở lại. Hôm nay, lời hứa ấy đáp xuống cùng một chuyến bay từ quê nhà: ĐÃ HẠ CÁNH.' },
      { sp: 'narr', text: '{name} kiễng chân nhìn qua vai đám đông, tay ôm bó hoa mua vội ở ga, lòng bàn tay ướt mồ hôi. Bao năm chờ đợi gói lại trong mấy phút cuối này — mỗi lần cửa tự động mở ra là một lần tim nhảy lên tận cổ, rồi lại chùng xuống: chưa phải anh ấy.' },
      { sp: 'narr', text: 'Dòng người từ cửa ra cứ thế tuôn mãi. Rồi một chiếc ba lô quen thuộc xuất hiện — chiếc ba lô Hải vẫn đeo trong mọi tấm ảnh anh gửi. Hải bước ra, ngơ ngác nhìn quanh giữa sảnh lạ, cho tới khi ánh mắt hai người chạm nhau. Cả sân bay như lặng đi một nhịp.' },
      { sp: 'Hải', text: '"Em!" Hải chạy tới, ôm chầm lấy {name} giữa sảnh, mặc kệ hành lý, mặc kệ người qua lại. "Anh sang thật rồi đây. Lần này anh không ở trong điện thoại nữa. Anh ở đây — thật này, em sờ xem, thật này."' },
      { sp: 'hero', text: '"Thật rồi." {name} cười trong nước mắt, tay nắm chặt vạt áo chồng như kiểm chứng. "Mình đã chờ ngày này bao lâu rồi, Hải nhỉ. Từ hôm nay, em không phải kể chuyện vui buồn cho một cái màn hình nữa. Em kể cho anh — người đang đứng ngay đây."' },
      { sp: 'narr', text: 'Trên tàu về, Hải dán mắt vào cửa sổ như đứa trẻ lần đầu đi xa: cánh đồng, đường ray, những bảng hiệu tiếng Nhật anh chỉ từng thấy qua ảnh {name} chụp gửi về. "Đẹp thật." Anh nói khẽ. "Bao năm anh nhìn nước Nhật qua mắt em. Từ nay, anh được nhìn bằng mắt của chính mình — và vẫn là cùng em nhìn."' },
      { sp: 'Hải', text: '"Anh biết sang đây anh phải bắt đầu lại nhiều thứ: tiếng Nhật, công việc, nếp sống." Hải nắm tay vợ, giọng chắc nịch. "Nhưng anh không sợ. Người ta sang đây một mình còn sống được. Anh sang, lại có em — thế là anh hơn người ta một điểm tựa lớn nhất rồi."' },
      { sp: 'hero', jp: 'ようこそ、{日本|にほん}へ。ようこそ、わたしたちの{家|いえ}へ。{何年|なんねん}も{待|ま}たせて、ごめんね、ハイ。{今日|きょう}から{先|さき}は、{待|ま}つ{日々|ひび}じゃなくて、{一緒|いっしょ}に{生|い}きる{日々|ひび}だよ。', text: '"Chào mừng anh tới Nhật Bản. Chào mừng anh về nhà của chúng mình. Xin lỗi vì đã để anh chờ bao năm nhé, Hải. Từ hôm nay trở đi, không còn là những ngày chờ đợi nữa — mà là những ngày sống cùng nhau."' },
      { sp: 'Hải', text: '"Từ mai, anh bắt đầu học tiếng Nhật nghiêm túc." Hải tuyên bố trong bữa cơm, gắp cho vợ miếng ngon nhất. "Anh không muốn em phải làm phiên dịch cho anh cả đời. Anh muốn tự mình nói lời cảm ơn với đất nước đã giữ em an toàn bao năm qua — và tự mình xây dựng ở đây, bên cạnh em."' },
      { sp: 'narr', text: 'Bữa cơm đoàn tụ đầu tiên khép lại ngày dài: món quê Hải thích nhất bưng lên còn bốc khói, và cuộc gọi video về nhà — nơi bố mẹ hai bên nhìn thấy đôi trẻ ngồi sát bên nhau, thật bằng da bằng thịt, mà ai cũng khóc vì mừng. Một tình yêu từng chỉ sống trong màn hình điện thoại, từ hôm nay, sống trong một mái nhà thật.' }
    ]
  },

  /* ================= SINH CON 1 — NGÀY CON CHÀO ĐỜI ================= */
  'c5-baby-1': {
    scene: '👶 Chương 5 «Lớn rồi» — Ngày con chào đời ở bệnh viện',
    branch: [
      { sp: 'narr', text: 'Đêm ấy bắt đầu bằng một cuộc điện thoại ngắn và một chuyến taxi chạy êm trong phố khuya. {name} ngồi trong hành lang bệnh viện, hai tay đan chặt vào nhau, nghe từng âm thanh nhỏ nhất vọng ra từ phía cánh cửa phòng sinh. Người thương của {name} đang ở trong đó, đi qua giờ phút lớn nhất của đời người — còn {name} ở ngoài này, học bài học đầu tiên của việc làm cha/mẹ: có những lúc, yêu thương nhất cũng chỉ biết chờ đợi và cầu nguyện.' },
      { sp: 'Y tá', jp: 'ご{家族|かぞく}の{方|かた}ですね。ご{安心|あんしん}ください、{経過|けいか}は{順調|じゅんちょう}です。{先生|せんせい}がついていますので、こちらでお{待|ま}ちください。お{水|みず}はあちらにございます。', text: '"Anh/chị là người nhà phải không ạ. Xin cứ yên tâm, tình hình đang tiến triển thuận lợi. Đã có bác sĩ ở bên trong, xin anh/chị chờ ở đây ạ. Nước uống có ở phía đằng kia ạ."' },
      { sp: 'hero', jp: 'ありがとうございます。…あの、{中|なか}の{様子|ようす}が{分|わ}かりましたら、{教|おし}えていただけますか。{何|なに}か{必要|ひつよう}なことがあれば、すぐに{言|い}ってください。', text: '"Cảm ơn chị ạ. …Nếu có tin gì về tình hình bên trong, xin chị cho tôi biết với ạ. Có bất cứ điều gì cần thiết, xin chị cứ nói ngay với tôi ạ."' },
      { sp: 'narr', text: 'Thời gian trong hành lang bệnh viện trôi theo một nhịp khác: chậm như mật, nặng như chì. {name} đi đi lại lại, rồi ngồi xuống, rồi lại đứng lên nhìn đồng hồ. Bao năm ở Nhật, qua bao kỳ thi, bao buổi phỏng vấn căng thẳng — chưa có một sự chờ đợi nào giống lần này. Đây là chờ đợi một con người sắp đến với thế giới.' },
      { sp: 'Bác sĩ', jp: 'お{待|ま}たせいたしました。…おめでとうございます。{元気|げんき}な{赤|あか}ちゃんが{生|う}まれました。お{母|かあ}さんも{赤|あか}ちゃんも、{無事|ぶじ}ですよ。', text: '"Xin lỗi đã để anh/chị chờ lâu. …Xin chúc mừng anh/chị. Một em bé khoẻ mạnh đã chào đời. Cả mẹ và bé đều bình an ạ." — hai chữ "bình an" rơi xuống hành lang như một cơn mưa rào giữa mùa hạ.' },
      { sp: 'narr', text: '{name} đứng bật dậy, rồi lại phải vịn vào tường vì chân bỗng mềm nhũn. Mọi ngôn ngữ học được bao năm — tiếng Nhật trang trọng, tiếng Việt thân thương — đều không đủ cho giây phút này. Chỉ còn lại nước mắt, tự nhiên trào ra, không cần phiên dịch cho bất cứ ai.' },
      { sp: 'Y tá', jp: 'こちらに{体重|たいじゅう}と{身長|しんちょう}を{記|しる}したカードがございます。{後|あと}でゆっくりご{覧|らん}ください。ご{出産|しゅっさん}、{本当|ほんとう}におめでとうございます。', text: '"Đây là tấm thẻ ghi cân nặng và chiều dài của bé ạ. Lát nữa anh/chị cứ thong thả xem. Thật lòng chúc mừng gia đình mình đã đón bé chào đời ạ."' },
      {
        prompt: 'Y tá nhẹ nhàng đưa em bé — nhỏ xíu, đỏ hỏn, quấn trong chiếc khăn trắng — tới trước mặt {name}: "Anh/chị bế con một chút nhé."',
        choice: [
          { label: 'Run run đón con vào lòng, nói câu đầu tiên bằng tiếng Việt của quê hương', fx: { love: 2 }, note: 'Sinh con: khoảnh khắc bế con lần đầu — câu chào đầu tiên bằng tiếng mẹ đẻ', say: [
            { sp: 'hero', text: '"Chào con." {name} thì thầm bằng tiếng Việt, giọng lạc đi. "Bố/mẹ chờ con lâu lắm rồi. Từ nay, con có một quê hương ở đây, và một quê hương ở phía bên kia biển. Bố/mẹ sẽ kể cho con nghe về cả hai." Em bé khẽ cựa mình trong vòng tay — cái cựa mình đầu tiên, và cả thế giới của {name} vừa sang một trang mới.' } ] },
          { label: 'Cúi đầu cảm ơn bác sĩ và y tá bằng kính ngữ trang trọng nhất', fx: { jp: 2, love: 1 }, note: 'Sinh con: lời cảm ơn trang trọng dành cho đội ngũ y tế', say: [
            { sp: 'hero', jp: '{先生|せんせい}、{皆様|みなさま}、{本当|ほんとう}にありがとうございました。{遠|とお}い{国|くに}から{来|き}たわたしたち{家族|かぞく}を、こんなに{温|あたた}かく{迎|むか}えてくださって…{言葉|ことば}では{足|た}りません。', text: '"Thưa bác sĩ, thưa mọi người, thật lòng cảm ơn mọi người rất nhiều ạ. Gia đình chúng tôi từ một đất nước xa xôi tới đây, được mọi người đón tiếp ấm áp thế này… lời nói không thể diễn tả hết được ạ."' },
            { sp: 'Bác sĩ', jp: 'いいえ、{新|あたら}しい{命|いのち}の{誕生|たんじょう}は、わたしたちにとっても{一番|いちばん}の{喜|よろこ}びです。{今日|きょう}はゆっくり{休|やす}んでください。', text: '"Không có gì ạ. Sự chào đời của một sinh linh mới cũng là niềm vui lớn nhất của chúng tôi. Hôm nay anh/chị hãy nghỉ ngơi thật nhiều nhé."' } ] }
        ]
      },
      { sp: 'narr', text: 'Một lúc sau, khi người thương đã được đưa về phòng nghỉ và em bé ngủ ngoan trong nôi nhỏ cạnh giường, {name} mới run tay bấm số gọi về quê. Chuông đổ hai hồi — bên kia, giọng mẹ ngái ngủ bắt máy, và {name} phải hít một hơi thật sâu mới nói tròn được một câu.' },
      { sp: 'hero', text: '"Mẹ ơi… con gọi để báo tin mừng. Cháu của bố mẹ chào đời rồi ạ. Khoẻ mạnh, bình an. Cả nhà mình… có thêm một người rồi, mẹ ạ."' },
      { sp: 'Mẹ', text: '"Ơn giời… ơn giời đất ơi!" Mẹ khóc oà trong điện thoại, tiếng khóc của niềm vui thuần khiết nhất. "Để mẹ gọi bố mày dậy! Ông ơi, ông lên chức ông ngoại/ông nội rồi ông ơi! Cháu nó chào đời rồi!" Tiếng bố lật đật ở đầu dây bên kia, rồi hai ông bà cùng khóc, cùng cười, đòi xem ảnh cháu ngay trong đêm.' },
      { sp: 'Bố', text: '"Gửi ảnh cho bố ngay nhé." Giọng bố khàn đi vì xúc động. "Bố in ra, bố để ở bàn thờ, báo với tổ tiên là nhà mình có thêm cháu rồi. Các con ở xa vất vả… mà hôm nay, bố thấy bao nhiêu vất vả đều đáng hết."' },
      { sp: 'narr', text: 'Đêm đầu tiên làm cha/mẹ khép lại trong căn phòng bệnh viện thơm mùi sữa và mùi thuốc sát trùng nhè nhẹ. {name} ngồi bên nôi, ngắm một sinh linh bé bỏng đang ngủ — sinh linh mang trong mình hai quê hương, hai thứ tiếng, và tình yêu của rất nhiều con người ở cả hai đầu đại dương.' },
      { sp: 'hero', jp: '{生|う}まれてきてくれて、ありがとう。パパとママの{子|こ}に、なってくれてありがとう。', text: '"Cảm ơn con đã đến với thế giới này. Cảm ơn con đã chọn làm con của bố/mẹ." — {name} nói khẽ bằng cả hai thứ tiếng trong đêm, để câu cảm ơn đầu tiên của đời con được nghe bằng trọn vẹn hai quê hương.' }
    ]
  },

  /* ================= SINH CON 2 — KHAI SINH + ĐẶT TÊN CON ================= */
  'c5-baby-2': {
    scene: '📝 Chương 5 «Lớn rồi» — Làm giấy khai sinh và đặt tên cho con',
    branch: [
      { sp: 'narr', text: 'Con chào đời được năm ngày. Trong xấp giấy bệnh viện trao lại có một tờ hướng dẫn in đậm: 出生届 — giấy khai sinh — phải nộp tại shiyakusho trong vòng 14 ngày kể từ ngày sinh. {name} ôm con (đang ngủ ngoan trong chiếc địu trước ngực), cùng người thương tới quầy thủ tục — lần này không phải cho mình, mà cho một công dân bé bỏng vừa đến với thế giới.' },
      { sp: 'Nhân viên shiyakusho', jp: 'おはようございます。{出生届|しゅっしょうとどけ}のご{提出|ていしゅつ}ですね。おめでとうございます。{出生証明書|しゅっしょうしょうめいしょ}と{届出書|とどけでしょ}をお{出|だ}しください。', text: '"Chào buổi sáng ạ. Anh chị đến nộp giấy khai sinh phải không ạ. Xin chúc mừng anh chị. Xin cho tôi xem giấy chứng sinh và tờ khai ạ."' },
      { sp: 'hero', jp: 'ありがとうございます。こちらが{病院|びょういん}の{出生証明書|しゅっしょうしょうめいしょ}と、{記入済|きにゅうず}みの{出生届|しゅっしょうとどけ}でございます。{期限|きげん}の14{日以内|にちいない}に{間|ま}に{合|あ}うよう、{早|はや}めに{参|まい}りました。', text: '"Cảm ơn anh/chị ạ. Đây là giấy chứng sinh của bệnh viện và tờ khai sinh tôi đã điền sẵn ạ. Tôi đến sớm để kịp trong thời hạn 14 ngày ạ."' },
      { sp: 'Nhân viên shiyakusho', jp: 'はい、{確|たし}かに{受|う}け{取|と}りました。お{子|こ}さまの{お名前|なまえ}も{確認|かくにん}させていただきました。{素敵|すてき}な{お名前|なまえ}ですね。', text: '"Vâng, tôi đã nhận đủ ạ. Tôi cũng đã xác nhận tên của bé rồi. Một cái tên thật đẹp ạ."' },
      { sp: 'hero', jp: 'あの…お{名前|なまえ}のことで、ひとつ{確認|かくにん}させてください。{外国|がいこく}に{縁|ゆかり}のある{名前|なまえ}ですが、{届出|とどけで}に{問題|もんだい}はございませんか。', text: '"Dạ… về tên của bé, xin cho tôi xác nhận một điều ạ. Tên của bé có gắn với nước ngoài, vậy việc nộp tờ khai có vấn đề gì không ạ?"' },
      { sp: 'Nhân viên shiyakusho', jp: 'はい、{問題|もんだい}ございません。{漢字|かんじ}も{使用可能|しようかのう}な{字|じ}ですので、ご{安心|あんしん}ください。{二|ふた}つの{国|くに}に{縁|ゆかり}のある{素敵|すてき}な{お名前|なまえ}ですね。', text: '"Vâng, không vấn đề gì ạ. Chữ Hán cũng thuộc nhóm chữ được phép sử dụng, xin anh chị yên tâm. Một cái tên gắn với cả hai đất nước — thật là một cái tên đẹp ạ."' },
      { sp: 'narr', text: 'Cái tên ấy — hai vợ chồng đã bàn nhau suốt những tháng cuối thai kỳ, gạch đi viết lại cả một trang giấy. Cái tên phải đọc được bằng cả hai thứ tiếng, mang ý nghĩa nối hai quê hương của con: một bờ biển bên này, một bờ biển bên kia. Đến tận đêm qua, ba cái tên cuối cùng vẫn còn nằm trên bàn, chờ một quyết định.' },
      {
        prompt: 'Đêm qua, hai vợ chồng đã chọn tên cho con. Cái tên nào đã được viết vào tờ khai sinh?',
        choice: [
          { label: '葵・Aoi — hoa hướng dương, đọc êm trong cả hai tiếng, hướng về mặt trời của cả hai quê', flag: 'saga-c5', value: 'babyname:葵・Aoi', fx: { love: 2 }, note: 'Đặt tên con: 葵・Aoi — hướng dương, lớn lên hướng về ánh sáng hai quê hương', say: [
            { sp: 'narr', text: '葵 — Aoi, hoa hướng dương. Cái tên được chọn vì một mong ước giản dị: con lớn lên như đoá hoa luôn hướng về phía mặt trời, dù đứng trên đất Nhật hay đất Việt. Ông bà ở quê nghe đọc tên cháu qua điện thoại, gật gù: "Aoi — nghe hiền mà sáng. Được, tên này được."' } ] },
          { label: '海・Kai — biển cả nối hai bờ Việt–Nhật, đọc giống nhau trong cả hai ngôn ngữ', flag: 'saga-c5', value: 'babyname:海・Kai', fx: { love: 2 }, note: 'Đặt tên con: 海・Kai — biển nối hai bờ quê hương', say: [
            { sp: 'narr', text: '海 — Kai, là biển. Biển đã đưa bố/mẹ con sang Nhật, và cũng là mặt biển quê nhà nhìn ra mỗi sớm. Cái tên đọc lên ở Tokyo hay ở quê nhà đều êm như nhau — như chính con, thuộc về cả hai bờ. Bố ở quê nghe xong cười khà: "Biển thì rộng. Đứa cháu này, chí nó cũng sẽ rộng như biển."' } ] },
          { label: '空・Sora — bầu trời chung trên cả hai quê hương, không biên giới nào ngăn được', flag: 'saga-c5', value: 'babyname:空・Sora', fx: { love: 2 }, note: 'Đặt tên con: 空・Sora — bầu trời chung của hai quê hương', say: [
            { sp: 'narr', text: '空 — Sora, là bầu trời. Hai quê hương của con cách nhau một đại dương, nhưng cùng chung một bầu trời — ngẩng lên ở đâu cũng thấy mây nhà mình. Mẹ ở quê thủ thỉ trong điện thoại: "Trời thì ở đâu cũng là nhà. Đặt tên này, cháu bà đi đâu cũng không lạc."' } ] }
        ]
      },
      { sp: 'Nhân viên shiyakusho', jp: 'これで{出生届|しゅっしょうとどけ}の{手続|てつづ}きは{完了|かんりょう}です。{次|つぎ}に、{健康保険|けんこうほけん}と{児童手当|じどうてあて}のご{案内|あんない}をいたします。こちらの{書類|しょるい}をお{持|も}ちください。', text: '"Như vậy thủ tục giấy khai sinh đã hoàn tất ạ. Tiếp theo, tôi xin hướng dẫn về bảo hiểm y tế và trợ cấp trẻ em. Xin anh chị cầm theo những giấy tờ này ạ."' },
      { sp: 'hero', jp: 'ありがとうございます。{初|はじ}めての{子育|こそだ}てで{分|わ}からないことが{多|おお}いのですが、{順番|じゅんばん}に{教|おし}えていただけますか。', text: '"Cảm ơn anh/chị ạ. Lần đầu nuôi con nên tôi còn nhiều điều chưa biết, xin anh/chị chỉ dẫn cho tôi theo thứ tự ạ."' },
      { sp: 'Nhân viên shiyakusho', jp: 'もちろんです。{皆様|みなさま}、{最初|さいしょ}は{同|おな}じですよ。{困|こま}ったときは、いつでもこちらの{窓口|まどぐち}にご{相談|そうだん}ください。', text: '"Dĩ nhiên rồi ạ. Ai lần đầu cũng như vậy cả thôi ạ. Khi nào gặp khó khăn, anh chị cứ tới quầy này để được tư vấn bất cứ lúc nào ạ."' },
      { sp: 'narr', text: 'Ra khỏi shiyakusho, tờ giấy chứng nhận khai sinh nằm trong bìa hồ sơ cùng tờ giấy kết hôn ngày nào — hai cột mốc của một gia đình, cách nhau vài năm và cả một hành trình trưởng thành. Con người ta lớn lên, hoá ra, được đo bằng những tờ giấy tử tế mình đứng tên vì người khác.' },
      { sp: 'narr', text: 'Những tuần đầu làm cha/mẹ là một trường học không giáo trình: đêm thức trắng vì con quấy, buổi sáng ngủ gật trên tàu điện, niềm vui bé xíu khi con lần đầu nắm chặt ngón tay mình không buông. Có đêm {name} bế con đi đi lại lại trong phòng, hát ru bằng bài hát quê nhà mà ngày xưa mẹ vẫn hát.' },
      { sp: 'hero', text: '"Ngủ đi con. Bố/mẹ ở đây." Câu nói được lặp lại mỗi đêm, khẽ như hơi thở. Và trong những đêm tưởng dài vô tận ấy, {name} bỗng hiểu ra một điều: bố mẹ mình ở quê, ngày xưa, cũng đã thức đúng như thế này — vì mình.' },
      { sp: 'narr', text: 'Cuối tuần, ông bà ở quê gọi video sang ngắm cháu: đứa bé ngủ ngoan trong nôi, cái tên mới được đọc lên trang trọng như một lời tuyên bố với cả hai dòng họ. Ở quê, bố đã nhờ người viết tên cháu vào gia phả — nét chữ đầu tiên của một thành viên mới, nối dài dòng họ sang tận bên kia biển.' },
      { sp: 'narr', text: 'Một buổi sáng, con ngủ ngoan sau một đêm dài, nắng sớm chiếu qua cửa sổ rọi lên khuôn mặt bé xíu. {name} pha một cốc trà, ngồi ngắm con, và mỉm cười với sự mệt mỏi ngọt ngào nhất đời mình: làm cha/mẹ là một công việc không có ngày nghỉ — và không ai trong căn phòng này muốn nghỉ.' }
    ]
  },

  /* ================= SINH CON 3 — NHÀ TRẺ + CÔNG VIÊN ================= */
  'c5-baby-3': {
    scene: '🌳 Chương 5 «Lớn rồi» — Con đi nhà trẻ, buổi chiều công viên',
    branch: [
      { sp: 'narr', text: '"Cuộc chiến tìm nhà trẻ" — những tháng chạy đôn chạy đáo nộp đơn, chờ kết quả, hồi hộp như chờ kết quả thi — cuối cùng cũng đã qua. Sáng nay, con chính thức đi nhà trẻ gần nhà: chiếc ba lô nhỏ xíu trên lưng, bước chân lon ton, và hai phụ huynh đứng ngoài cổng vẫy tay đến khi cánh cửa lớp khép lại mới chịu quay về.' },
      { sp: 'narr', text: 'Chiều công viên, con đã bập bẹ những từ tiếng Nhật đầu tiên — và tốc độ học của con khiến bố mẹ phải ngỡ ngàng: mới mấy tuần đi lớp, con đã líu lo những từ mà ngày xưa bố/mẹ phải mất cả năm mới thuộc. Trẻ con học một ngôn ngữ mới như cây non hút nước: nhanh, tự nhiên, không chút sợ sai.' },
      { sp: 'Bà Suzuki hàng xóm', jp: 'あら、{大|おお}きくなったわねえ。{保育園|ほいくえん}、{楽|たの}しい？{先生|せんせい}の{言|い}うこと、ちゃんと{分|わ}かるようになったんですってね。', text: '"Ôi chà, lớn nhanh quá nhỉ. Đi nhà trẻ có vui không con? Nghe nói con đã hiểu được lời cô giáo nói rồi đấy nhỉ."' },
      { sp: 'hero', jp: 'はい、{子|こ}どもの{吸収|きゅうしゅう}は{早|はや}いですね。わたしたち{夫婦|ふうふ}より、もう{発音|はつおん}が{上手|じょうず}なくらいです。{家|いえ}では{先生|せんせい}の{真似|まね}をして、{教|おし}えてくれるんですよ。', text: '"Vâng ạ, trẻ con tiếp thu nhanh thật bà ạ. Phát âm của con còn chuẩn hơn cả vợ chồng cháu rồi. Ở nhà, con còn bắt chước cô giáo, quay lại “dạy” cho bố mẹ nữa ạ."' },
      { sp: 'Bà Suzuki hàng xóm', jp: 'それが{一番|いちばん}の{勉強|べんきょう}よ。{子|こ}どもが{先生|せんせい}で、{親|おや}が{生徒|せいと}。…{近|ちか}く、{保護者会|ほごしゃかい}があるでしょう。{言葉|ことば}で{困|こま}ったら、わたしに{聞|き}きなさい。{近所|きんじょ}なんだから。', text: '"Đó là cách học tốt nhất đấy. Con làm thầy, bố mẹ làm trò. …Sắp tới có buổi họp phụ huynh phải không. Nếu khó khăn về ngôn từ, cứ hỏi bà nhé. Hàng xóm với nhau mà."' },
      { sp: 'hero', jp: 'ありがとうございます、すずきさん。{保護者会|ほごしゃかい}の{案内|あんない}は{読|よ}んだのですが、{専門的|せんもんてき}な{言葉|ことば}が{多|おお}くて。{事前|じぜん}に{予習|よしゅう}してから{行|い}こうと{思|おも}っています。', text: '"Cháu cảm ơn bà Suzuki ạ. Thư thông báo họp phụ huynh cháu đã đọc rồi, mà nhiều từ chuyên môn quá. Cháu định chuẩn bị bài trước rồi mới đi họp ạ." — nói xong, {name} tự cười: bao năm làm học trò học tiếng Nhật, giờ lại học tiếp, vì một buổi họp phụ huynh của con.' },
      { sp: 'Chị Sato phụ huynh', jp: 'はじめまして、{同|おな}じクラスのさとうです。{今日|きょう}はいい{天気|てんき}ですね。お{子|こ}さん、{歌|うた}が{上手|じょうず}で、{発表会|はっぴょうかい}でも{元気|げんき}でしたよ。', text: '"Xin chào, tôi là Sato, phụ huynh cùng lớp với bé nhà anh/chị. Hôm nay thời tiết đẹp nhỉ. Bé nhà anh/chị hát hay lắm, buổi biểu diễn hôm trước cũng rất năng nổ đấy."' },
      { sp: 'hero', jp: 'ありがとうございます。{家|いえ}でも{毎日|まいにち}{歌|うた}っています。さとうさんの{息子|むすこ}さんも、{先週|せんしゅう}の{散歩|さんぽ}でうちの{子|こ}の{手|て}を{引|ひ}いてくれたそうで、ありがとうございました。', text: '"Cảm ơn chị ạ. Ở nhà cháu cũng hát suốt ngày. Nghe nói con trai chị Sato tuần trước còn dắt tay bé nhà tôi khi đi dạo nữa, cảm ơn cháu nhiều ạ."' },
      { sp: 'Chị Sato phụ huynh', jp: '{子|こ}ども{同士|どうし}は、{言葉|ことば}なんて{関係|かんけい}なく{友達|ともだち}になりますね。わたしたち{親|おや}も、そうありたいものです。{保護者会|ほごしゃかい}、{一緒|いっしょ}に{行|い}きましょう。', text: '"Trẻ con với nhau thì chẳng cần ngôn ngữ gì cũng thành bạn được nhỉ. Bố mẹ chúng ta cũng nên như vậy. Buổi họp phụ huynh tới, chúng ta cùng đi nhé."' },
      { sp: 'narr', text: 'Cuộc trò chuyện đời thường ở công viên — về thời tiết, về buổi biểu diễn của lớp, về buổi họp phụ huynh sắp tới — nghe thì nhỏ nhặt, mà là bằng chứng lớn: gia đình {name} đã thật sự cắm rễ vào khu phố này. Không còn là "người nước ngoài ở trọ", mà là "nhà của bé con lớp hoa" trong mắt hàng xóm.' },
      { sp: 'narr', text: 'Trên thảm cỏ, con lon ton chạy theo nhóm bạn cùng lớp, thỉnh thoảng quay lại vẫy tay với bố mẹ bằng cả hai tay. Mới ngày nào "cuộc chiến tìm nhà trẻ" còn khiến cả nhà mất ngủ vì chờ kết quả — giờ đây, nhà trẻ đã thành một phần bình yên trong nhịp sống hằng ngày, và công viên cuối tuần thành nơi hẹn hò của cả gia đình với khu phố.' },
      {
        prompt: 'Con chạy lon ton đuổi theo bạn, miệng líu lo câu tiếng Nhật mới học. {name} đứng nhìn, chợt thấy sống mũi cay cay.',
        choice: [
          { label: 'Nhủ thầm: con sẽ đi xa hơn bố mẹ — và đó là điều đáng mừng nhất', fx: { love: 2 }, note: 'Nhà trẻ: niềm tự hào của bậc làm cha/mẹ nơi đất khách', say: [
            { sp: 'narr', text: '{name} mỉm cười, mắt dõi theo cái bóng nhỏ xíu đang hoà vào đám trẻ trong công viên: con sinh ra ở đây, lớn lên bằng hai thứ tiếng, có bạn bè ở cả hai quê hương. Những gì bố mẹ đã phải vật lộn học lấy ở tuổi trưởng thành, con sẽ có sẵn từ thuở ấu thơ. Đó không phải khoảng cách — đó là món quà mà cả một thế hệ đi trước đã làm việc cật lực để trao lại.' } ] },
          { label: 'Quay sang cảm ơn bà Suzuki và chị Sato — những người hàng xóm tử tế', fx: { love: 1, jp: 1 }, note: 'Nhà trẻ: lòng biết ơn dành cho cộng đồng khu phố đã đón nhận gia đình mình', say: [
            { sp: 'hero', jp: '{皆様|みなさま}のおかげで、この{町|まち}がわたしたち{家族|かぞく}の「ふるさと」に{近|ちか}づいています。{本当|ほんとう}に、ありがとうございます。', text: '"Nhờ mọi người mà khu phố này đang dần trở thành “quê hương” của gia đình cháu. Thật lòng cảm ơn mọi người rất nhiều ạ."' } ] }
        ]
      },
      { sp: 'narr', text: 'Chiều xuống dần, con ngủ gật trên vai bố/mẹ trên đường về, miệng còn lẩm bẩm một từ tiếng Nhật mới. Buổi họp phụ huynh tuần sau, lớp học của con, những người bạn hàng xóm — một đời sống trọn vẹn đang lặng lẽ lớn lên từng ngày, như chính đứa trẻ trên vai.' }
    ]
  },

  /* ================= ĐỘC THÂN 1 — BUỔI TỐI BẠN BÈ Ở PHÒNG TRỌ ================= */
  'c5-single-1': {
    scene: '🌙 Chương 5 «Lớn rồi» — Buổi tối bạn bè ghé phòng trọ',
    branch: [
      { sp: 'narr', text: 'Tối cuối tuần, phòng trọ của {name} hiếm hoi đông vui: Hùng "sẹo" xách theo túi đồ ăn, Đức mang nước ngọt và một bộ bài cũ. Căn phòng của một người sống độc thân — gọn gàng, ấm áp, có cây xanh trên bậu cửa và kệ sách xếp ngay ngắn. Độc thân, ở đây, không đồng nghĩa với cô đơn. Nó chỉ đơn giản là một nhịp sống khác, được chính chủ nhân của nó lựa chọn và vun đắp tử tế.' },
      { sp: 'Hùng', jp: 'おう、{相変|あいか}わらず{片付|かたづ}いてるな、おまえの{部屋|へや}。…なあ、{聞|き}いたぞ。{今度|こんど}のプロジェクト、リーダーを{任|まか}されたんだってな。{大|おお}したもんだ。', text: '"Ồ, phòng mày vẫn ngăn nắp như mọi khi. …Này, tao nghe rồi đấy. Dự án lần này mày được giao làm trưởng nhóm phải không. Giỏi thật đấy."' },
      { sp: 'hero', jp: 'ありがとう、ヒョン。{最初|さいしょ}の{頃|ころ}は{言葉|ことば}も{仕事|しごと}も、ついていくのが{精一杯|せいいっぱい}だったのにね。{少|すこ}しずつ、{信用|しんよう}が{積|つ}み{上|あ}がってきたんだと{思|おも}う。', text: '"Cảm ơn anh Hùng. Hồi mới sang, cả tiếng Nhật lẫn công việc, em theo kịp được đã là cố hết sức rồi. Em nghĩ là niềm tin người ta dành cho mình, nó tích lại từng chút một như vậy đấy."' },
      { sp: 'Đức', text: '"Tớ thì khâm phục cái khác." Đức rót nước cho cả ba, nói chậm rãi. "Người ta hay hỏi nhau “bao giờ lấy vợ/lấy chồng” như thể đó là cột mốc duy nhất của tuổi này. Còn cậu — cậu sống một mình mà ngày nào cũng có kế hoạch, có mục tiêu, có người để quan tâm. Tớ thấy thế là một cuộc đời đầy đủ rồi."' },
      { sp: 'hero', text: '"Tớ cũng nghĩ vậy." {name} cười, gắp thức ăn cho hai người bạn. "Hạnh phúc đâu có một khuôn duy nhất. Có người hạnh phúc trong một mái nhà đông người. Có người hạnh phúc khi tự mình đi con đường của mình, vững vàng, không dựa vào ai để định nghĩa giá trị của bản thân. Tớ đang ở vế thứ hai — và tớ thật sự ổn, không phải nói cho ai yên lòng."' },
      { sp: 'Hùng', text: '"Mà nói đi cũng phải nói lại." Hùng gắp một miếng lớn, nói tỉnh bơ. "Độc thân như mày, trong cái ký túc này khối đứa ghen tị đấy: tiền mình làm mình tiêu, thời gian của mình mình quyết, cuối tuần muốn ngủ tới trưa cũng chẳng ai cằn nhằn. Tự do của mày là thứ có người bỏ cả đống tiền cũng không mua được."' },
      {
        prompt: 'Hùng nâng cốc, nửa đùa nửa thật: "Thế còn chuyện trăm năm, mày tính sao?" Cả phòng cười vang chờ câu trả lời của {name}.',
        choice: [
          { label: 'Đáp chín chắn: "Cửa thì không khóa — nhưng tớ không đứng chờ ngoài cửa"', fx: { love: 2, jp: 1 }, note: 'Độc thân: quan điểm chín chắn, mở lòng mà không sốt ruột', say: [
            { sp: 'hero', text: '"Nếu một ngày gặp được người khiến tớ muốn chia sẻ con đường này, tớ sẽ mở lòng, đàng hoàng và nghiêm túc. Còn không thì thôi — tớ vẫn có công việc để lớn lên, có bạn bè như hai người, có bố mẹ để phụng dưỡng. Đời tớ không thiếu một mảnh nào cần ai lấp vào mới tròn cả." Cả phòng gật gù, Hùng vỗ đùi: "Câu này đáng nâng cốc."' } ] },
          { label: 'Cười lớn: "Giờ tớ đang hẹn hò với tự do — và mối này đang rất hạnh phúc"', fx: { love: 1 }, note: 'Độc thân: tiếng cười tự tin của người làm chủ đời mình', say: [
            { sp: 'narr', text: 'Cả ba phá lên cười đến chảy nước mắt. Đức vừa cười vừa lắc đầu: "Khiếp, nói thế thì ai cãi được." Buổi tối của ba người bạn độc thân — không một chút bi lụy, chỉ có tiếng cười, đồ ăn ngon, và sự tôn trọng dành cho lựa chọn của nhau.' } ] }
        ]
      },
      { sp: 'Hùng', jp: 'まあ、おまえが{幸|しあわ}せなら、それが{正解|せいかい}だ。{人|ひと}の{人生|じんせい}に、{他人|たにん}が{点数|てんすう}をつけるもんじゃない。…さ、{食|く}おう。{料理|りょうり}が{冷|さ}める。', text: '"Mà thôi, mày hạnh phúc thì đó là đáp án đúng rồi. Đời người ta, không ai có quyền chấm điểm thay cả. …Nào, ăn đi. Đồ ăn nguội mất."' },
      { sp: 'narr', text: 'Bữa tối kéo dài bằng những câu chuyện không đầu không cuối: chuyện công trường, chuyện quê nhà, chuyện đội bóng cuối tuần. Đến khuya, Đức thắng ván bài cuối bằng một nước đi không ai ngờ, cả phòng cười nghiêng ngả. Tình bạn ở đất khách, hoá ra cũng là một dạng gia đình — dạng gia đình người ta tự chọn cho mình.' },
      { sp: 'Đức', text: '"Này, nói thật nhé." Đức xếp bài, giọng nhỏ đi một chút. "Những buổi như hôm nay — tớ nghĩ sau này già đi, tớ sẽ nhớ nhất. Không phải những chuyện to tát. Là những tối ngồi chật trong một căn phòng nhỏ, ăn với nhau một bữa tử tế."' },
      { sp: 'hero', jp: 'ああ、{俺|おれ}もだ。{家族|かぞく}って、{血|ち}だけじゃない。{一緒|いっしょ}に{食|た}べて、{笑|わら}って、{困|こま}ったときに{顔|かお}を{出|だ}してくれる{人|ひと}たち。それが、{俺|おれ}の{家族|かぞく}だよ。', text: '"Ừ, tớ cũng vậy. Gia đình đâu chỉ là huyết thống. Là những người cùng ăn với mình, cười với mình, và có mặt khi mình gặp khó khăn. Đó là gia đình của tớ đấy."' },
      { sp: 'Đức', text: '"Về nhé." Đức đứng dậy sau cùng, nhìn quanh căn phòng ấm cúng một lượt. "Phòng của người sống một mình mà đầy hơi người thế này — là vì chủ nó biết sống, chứ không phải vì nó đông người."' },
      { sp: 'hero', text: '"Cảm ơn hai người đã tới." {name} tiễn bạn ra cửa, cười thật tươi. "Tuần sau lại ghé. Phòng này lúc nào cũng có chỗ cho bạn bè — và nồi lẩu thì tớ lo."' },
      { sp: 'narr', text: 'Khách về khuya, {name} đứng ở cửa vẫy tay đến khi bóng hai người bạn khuất cuối hành lang. Căn phòng trở lại yên tĩnh — một sự yên tĩnh dễ chịu của người đang sống đúng với lựa chọn của mình. Ngày mai, dự án mới đang chờ. Đời còn dài, và nó đang đi đúng hướng chủ nhân của nó đã chọn.' }
    ]
  },

  /* ================= ĐỘC THÂN 2 — CUỘC GỌI VỀ NHÀ ================= */
  'c5-single-2': {
    scene: '📞 Chương 5 «Lớn rồi» — Cuộc gọi về nhà và lời giục của bố mẹ',
    branch: [
      { sp: 'narr', text: 'Cuộc gọi video tối chủ nhật về nhà bắt đầu như mọi tuần: mẹ hỏi ăn uống thế nào, bố hỏi công việc ra sao. Nhưng hôm nay, sau vài câu chuyện nhà chuyện cửa, mẹ hắng giọng — cái hắng giọng quen thuộc báo hiệu một chủ đề đã được "họp gia đình" từ trước: chuyện vợ chồng của đứa con xa nhà.' },
      { sp: 'Mẹ', text: '"Con này, mẹ nói thật, con đừng giận mẹ." Mẹ ghé sát màn hình, giọng vừa thương vừa lo. "Con cũng đến tuổi rồi. Ở bên ấy một mình, ốm đau ai lo cho. Bố mẹ ở quê cứ nghĩ tới là mất ngủ. Hay là… mẹ nhờ người giới thiệu cho một mối tử tế, con xem mặt một lần xem sao?"' },
      { sp: 'Bố', text: 'Bố ngồi bên, gật đầu phụ hoạ: "Bố mẹ không ép. Nhưng bố mẹ già rồi, chỉ mong thấy con yên bề gia thất thì mới nhắm mắt được. Con nghĩ lại xem — bạn bè con chúng nó con cái đề huề cả rồi đấy."' },
      { sp: 'Mẹ', text: '"Con đừng nghĩ mẹ giục là mẹ không thương con." Mẹ nói tiếp, giọng mềm lại. "Mẹ chỉ sợ… con ở bên ấy một mình quen rồi, sau này muốn tìm người cũng khó. Mẹ nói thế thôi, con nghe mẹ nói hết lòng mẹ, rồi con trả lời mẹ cũng hết lòng con, nhé."' },
      { sp: 'narr', text: 'Áp lực ấy — rất Việt Nam, rất quen thuộc — không đến từ sự độc đoán. Nó đến từ tình thương của những người cả đời chỉ biết lo cho con theo cách họ hiểu. {name} hít một hơi sâu. Câu trả lời hôm nay phải là câu trả lời của một người đã lớn: chín chắn, rõ ràng, và vẫn giữ trọn chữ hiếu trong từng lời.' },
      { sp: 'hero', text: '"Bố mẹ nghe con nói hết đã." {name} ngồi thẳng lưng, nói chậm và rõ. "Con biết bố mẹ lo cho con, và con cảm ơn vì cả đời bố mẹ chỉ lo cho con. Nhưng chuyện vợ chồng, con muốn nó đến khi con gặp đúng người và sẵn sàng thật sự — chứ không phải vì đến tuổi, hay vì sợ bố mẹ lo. Cưới vội cho yên lòng người khác, rồi sống không hạnh phúc, mới là điều làm bố mẹ đau lòng nhất về lâu dài."' },
      { sp: 'hero', text: '"Con ở bên này đang sống rất tử tế: công việc ổn định, được tin tưởng giao việc lớn, bạn bè tốt, sức khoẻ tốt. Con không cô đơn và không buông xuôi đâu, bố mẹ ạ. Con hứa: nếu gặp được người con thật lòng muốn đi cùng cả đời, con sẽ là người báo tin cho bố mẹ đầu tiên. Còn bây giờ, bố mẹ cho con thêm thời gian sống đúng nhịp của con, được không ạ."' },
      { sp: 'Mẹ', text: 'Mẹ im lặng một lúc lâu, mắt nhìn xa xăm qua màn hình. Rồi bà thở dài — cái thở dài của người vừa đặt xuống một mối lo đã mang nhiều năm: "…Thôi được. Mẹ nghe con nói thế, mẹ cũng thấy có lý. Con của mẹ lớn thật rồi, nói năng đâu ra đấy. Mẹ không giục nữa. Nhưng nhớ lời con hứa đấy."' },
      { sp: 'Bố', text: 'Bố lặng đi một lúc, rồi gật đầu chậm rãi: "Con nói… bố nghe lọt tai. Bố mẹ giục vì thương, nhưng con sống đời của con. Thôi, chuyện này từ nay bố mẹ để con tự quyết. Chỉ cần con khoẻ, con vui — là bố mẹ vui."' },
      {
        prompt: 'Không khí dịu lại. {name} quyết định dành cho bố mẹ một món quà đã ấp ủ từ lâu — bằng chính sức lao động của mình nơi đất khách.',
        choice: [
          { label: 'Biếu bố mẹ một chuyến du lịch cùng nhau — lần đầu hai ông bà đi chơi xa', fx: { love: 2, money: -3 }, note: 'Độc thân: biếu bố mẹ chuyến du lịch bằng tiền làm thêm dành dụm', say: [
            { sp: 'hero', text: '"Nhân hôm nay nói chuyện rõ ràng, con có món quà này cho bố mẹ." {name} mỉm cười. "Con dành dụm được một khoản. Con biếu bố mẹ một chuyến du lịch — hai ông bà đi chơi với nhau một chuyến tử tế, lần đầu tiên trong đời chỉ để vui, không phải để lo việc gì cả. Vé và khách sạn con lo hết. Bố mẹ chỉ cần… đi và cười thật nhiều cho con xem."' },
            { sp: 'Mẹ', text: '"Trời đất ơi…" Mẹ ôm miệng, nước mắt rơi lã chã. "Nuôi con lớn, giờ nó quay lại lo cho bố mẹ đi chơi. Ông ơi, ông nghe thấy không…" Bố bên cạnh cũng đỏ hoe mắt, chỉ biết gật đầu liên tục, không nói nên lời.' } ] },
          { label: 'Gửi bố mẹ một khoản tiền dưỡng già, dặn bố mẹ từ nay bớt làm nặng', fx: { love: 2, money: -2.5 }, note: 'Độc thân: gửi tiền dưỡng già — lời hứa phụng dưỡng thiết thực', say: [
            { sp: 'hero', text: '"Con gửi về một khoản, bố mẹ nhận cho con vui." {name} nói rõ ràng. "Khoản này không phải tiền lo đám cưới, cũng không phải để dành cho ai khác. Đây là tiền dưỡng già của bố mẹ — từ nay bố mẹ bớt nhận việc nặng, ăn uống đầy đủ, khám sức khoẻ định kỳ cho con. Con ở xa, đây là cách con ở gần bố mẹ nhất."' },
            { sp: 'Bố', text: 'Bố cầm điện thoại của mẹ, nhìn con qua màn hình rất lâu: "…Bố nhận. Không phải vì bố cần tiền. Bố nhận vì đây là tấm lòng của con bố, và bố tự hào về nó." Giọng ông khàn đi. "Con cứ sống theo cách con chọn. Bố mẹ ở quê, từ nay chỉ lo… giữ sức khoẻ để chờ tin vui của con — tin vui theo đúng nghĩa của con."' } ] }
        ]
      },
      { sp: 'hero', text: '"Và bố mẹ giữ lời đấy nhé: từ nay không giục nữa, chỉ hỏi thăm sức khoẻ thôi." {name} cười, giơ ngón tay út về phía màn hình làm dấu móc ngoéo với bố mẹ như hồi còn bé. "Con cũng giữ lời của con: sống tử tế, và báo tin vui đầu tiên cho bố mẹ — khi tin vui ấy thật sự đến."' },
      { sp: 'narr', text: 'Cuộc gọi kết thúc bằng tiếng cười hiếm hoi của cả nhà: mẹ đã chuyển sang kể chuyện hàng xóm, bố khoe cây khế sau nhà sai quả. Chủ đề vợ chồng, từ hôm nay, được cất vào một ngăn kéo tử tế trong nhà — không còn là áp lực, mà là một lời hứa mở giữa những người tôn trọng lẫn nhau.' },
      { sp: 'Mẹ', text: '"Ừ, con của mẹ ngoan." Mẹ cười hiền qua màn hình, nếp nhăn ở khoé mắt giãn ra như trút được một gánh nặng lâu năm. "Đi ngủ sớm đi con. Bên ấy khuya rồi. Mẹ… mẹ tự hào về con, không phải vì chuyện vợ chồng gì đâu. Vì con sống đàng hoàng."' },
      { sp: 'hero', text: '"Cảm ơn bố mẹ đã nghe con." {name} nói trước khi tắt máy. "Con ở xa thật, nhưng chưa bao giờ xa nhà cả." Màn hình tối đi, và trong căn phòng yên tĩnh, {name} thấy lòng mình nhẹ nhõm lạ thường: lớn lên, hoá ra là khi ta có thể nói thật với bố mẹ — và được bố mẹ tôn trọng sự thật ấy.' }
    ]
  },

  /* ================= ĐỘC THÂN 3 — CHA/MẸ ĐỠ ĐẦU Ở CÔNG VIÊN ================= */
  'c5-single-3': {
    scene: '🌳 Chương 5 «Lớn rồi» — Cha/mẹ đỡ đầu và buổi chiều công viên',
    branch: [
      { sp: 'narr', text: 'Chiều chủ nhật ở công viên, hội bạn thân nhất của {name} ở Nhật tụ họp đông đủ hiếm có: Hùng "sẹo" bế đứa con nhỏ của mình — bé con vừa tròn một tuổi, đang tập nói bi bô — cùng vài người bạn ký túc năm xưa. Giữa thảm cỏ xanh, Hùng trịnh trọng đặt con vào vòng tay {name}, nói một câu đã chuẩn bị từ lâu.' },
      { sp: 'Hùng', jp: 'なあ、{今日|きょう}は{大事|だいじ}な{話|はなし}がある。おまえに、この{子|こ}の{名付|なづ}け{親|おや}…いや、{後見人|こうけんにん}みたいな{存在|そんざい}になってほしいんだ。{何|なに}かあったら、{真|ま}っ{先|さき}に{思|おも}い{出|だ}す{大人|おとな}が、{親|おや}の{他|ほか}にもいるって、そういう{安心|あんしん}をこの{子|こ}にやりたい。', text: '"Này, hôm nay tao có chuyện quan trọng. Tao muốn mày làm cha/mẹ đỡ đầu của đứa nhỏ này. Tao muốn con tao có thêm một người lớn để nó nhớ tới đầu tiên khi cần — ngoài bố mẹ nó ra. Một sự yên tâm như thế, tao muốn trao cho nó."' },
      { sp: 'hero', jp: 'ヒョン…{本気|ほんき}か。{俺|おれ}でいいのか。', text: '"Anh Hùng… anh nói thật đấy à. Em có được không ạ?" — {name} ôm đứa bé chắc hơn một chút, giọng bỗng nghẹn lại giữa công viên đầy nắng.' },
      { sp: 'Hùng', text: '"Mày chứ ai." Hùng cười, vỗ vai bạn. "Ở cái đất này, người đầu tiên tao nghĩ tới khi cần một người tử tế đứng cạnh con tao — là mày. Huyết thống thì trời cho. Còn gia đình kiểu này — là do mình chọn, và mình chọn mày." Đứa bé trong tay {name} bỗng bi bô một tiếng rõ to, như đồng ý thay cho cả buổi lễ nhỏ không hoa không pháo này.' },
      {
        prompt: '{name} nhìn đứa bé trong tay, rồi nhìn Hùng — người anh đã đi cùng mình qua bao năm tháng khó nhất nơi đất khách.',
        choice: [
          { label: 'Nhận lời ngay, trang trọng như nhận một lời thề', fx: { love: 2 }, note: 'Độc thân: nhận làm cha/mẹ đỡ đầu cho con của bạn thân nhất', say: [
            { sp: 'hero', text: '"Em nhận." {name} nói rõ từng chữ. "Từ hôm nay, đứa nhỏ này có thêm một người để gọi khi cần, một bờ vai nữa để dựa, và một người sẽ có mặt trong mọi cột mốc của nó — ngày đầu đi học, ngày nó vấp ngã, ngày nó thành công. Anh chọn em, em sẽ không để anh phải chọn lại." Hùng gật đầu, mắt đỏ hoe, đấm nhẹ vào vai bạn một cái thật kêu.' } ] },
          { label: 'Nhận lời bằng một câu đùa ấm áp, rồi ôm chặt cả hai cha con', fx: { love: 2, jp: 1 }, note: 'Độc thân: lời nhận đỡ đầu gói trong tiếng cười của hội bạn', say: [
            { sp: 'hero', jp: 'わかった、{引|ひ}き{受|う}けるよ。その{代|か}わり、{最初|さいしょ}の{自転車|じてんしゃ}は{俺|おれ}が{買|か}うからな。{約束|やくそく}だ。', text: '"Được, em nhận lời. Đổi lại, chiếc xe đạp đầu tiên của nó để em mua đấy nhé. Hứa rồi đấy." — cả hội cười vang, đứa bé cũng cười theo không hiểu chuyện gì, và buổi chiều công viên bỗng trở thành một buổi lễ gia đình đúng nghĩa.' } ] }
        ]
      },
      { sp: 'narr', text: 'Buổi chiều trôi đi bằng những điều bình dị nhất: trải bạt, chia nhau cơm nắm và trái cây, thay nhau bế bé con, chụp một tấm ảnh chung mà ai cũng cười tươi — tấm ảnh của một "gia đình thứ hai" được dựng nên không phải bằng huyết thống, mà bằng những năm tháng có mặt bên nhau nơi xứ người.' },
      { sp: 'Đức', text: '"Nhìn cảnh này mới thấy." Đức nói, tay phe phẩy chiếc quạt giấy. "Ở quê, gia đình là điều cho sẵn. Ở đây, gia đình là điều mình tự xây. Hội mình xây được một cái rồi đấy — có anh, có em, có cả thế hệ tiếp theo."' },
      { sp: 'narr', text: 'Trước khi tan buổi, {name} chia sẻ với cả hội một dự định đã ấp ủ nhiều tháng: mở một buổi dạy tiếng Nhật miễn phí vào cuối tuần, ngay tại phòng sinh hoạt khu phố, dành cho những người Việt mới sang còn bỡ ngỡ như chính mình ngày đầu.' },
      { sp: 'hero', jp: '{新|あたら}しく{来|き}たベトナムの{人|ひと}たちに、{無料|むりょう}で{日本語|にほんご}を{教|おし}える{場|ば}を{作|つく}りたいんだ。{町内会|ちょうないかい}の{集会室|しゅうかいしつ}を{借|か}りて、{週末|しゅうまつ}に。…{俺|おれ}が{最初|さいしょ}に{困|こま}ったこと、そのまま{誰|だれ}かの{役|やく}に{立|た}てばいいと{思|おも}って。', text: '"Em muốn mở một chỗ dạy tiếng Nhật miễn phí cho những người Việt mới sang. Mượn phòng sinh hoạt của khu phố, học vào cuối tuần. …Những gì em từng lúng túng ngày đầu, nếu giúp được ai đó đỡ lúng túng hơn, thế là đáng làm rồi."' },
      { sp: 'Hùng', jp: 'いいじゃないか。{会場|かいじょう}の{手続|てつづ}きは{俺|おれ}も{手伝|てつだ}う。{町内会|ちょうないかい}の{人|ひと}には、{俺|おれ}からも{声|こえ}をかけておく。', text: '"Hay đấy chứ. Thủ tục mượn phòng tao giúp một tay. Người trong ban khu phố, để tao nói giúp một tiếng."' },
      { sp: 'narr', text: 'Đức xung phong lo tài liệu, một người bạn nhận phần trà nước. Dự định gieo xuống thảm cỏ công viên chiều hôm ấy — nhỏ bé, tử tế, và rất thật: một người từng được đất này dìu qua những ngày đầu, nay quay lại dìu những người mới đến. Vòng tròn của sự tử tế, đến lượt {name} là người nối tiếp.' },
      { sp: 'Hùng', jp: '{今日|きょう}の{写真|しゃしん}、{実家|じっか}に{送|おく}っておいた。{母|はは}が{見|み}たら、きっとこう{言|い}うぞ。「あんたたち、{本当|ほんとう}の{兄弟|きょうだい}みたいだ」ってな。', text: '"Tấm ảnh hôm nay tao gửi về nhà rồi đấy. Mẹ tao mà xem, chắc chắn sẽ nói: “Mấy đứa này, như anh em ruột ấy nhỉ.”"' },
      { sp: 'hero', text: '"Gia đình, hoá ra, có nhiều hình dạng lắm." {name} nhìn hội bạn đang thu dọn bạt dưới nắng chiều, đứa bé đỡ đầu ngủ ngoan trên vai bố nó. "Có hình dạng được sinh ra cùng. Có hình dạng được chọn lấy giữa một đất nước xa lạ. Và hôm nay — tớ thấy mình giàu có theo cả hai cách."' }
    ]
  }
});
})();
