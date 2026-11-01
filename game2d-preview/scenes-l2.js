// scenes-l2.js — GÓI CHƯƠNG 4 (LANE L-B): tuyến kinh tế «ở lại hay về» · tuyến bằng lái
// (đăng ký · sát hạch luật · thi thực hành · nhận bằng) · xả stress karaoke · nhớ nhà lần 3.
// Thể ngữ: quầy siêu thị / trường lái / phòng sát hạch = kính ngữ; ký túc, bạn bè = thường thể.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= C4-ECON-1 — SIÊU THỊ: GIÁ TĂNG THẤY BẰNG MẮT ================= */
  'c4-econ-1': {
    scene: '🛒 Siêu thị — giá tăng thấy bằng mắt',
    branch: [
      { sp: 'narr', text: 'Siêu thị đầu tháng vẫn sáng đèn như mọi ngày, chỉ có một thứ khác: trên kệ trứng, kệ gạo, kệ dầu ăn, những tấm biển giá mới màu vàng được dán đè lên biển giá cũ — và ở vài chỗ, mép biển cũ còn thò ra, như một cái giá của tháng trước chưa kịp biến mất.' },
      { sp: 'hero', jp: '{卵|たまご}、{先月|せんげつ}は198{円|えん}だったのに…{今月|こんげつ}は258{円|えん}。', text: '"Trứng… tháng trước 198 yên, tháng này 258 yên." — {name} cầm khay trứng lên, đặt xuống, rồi lại cầm lên, như thể cân lại vài lần thì con số sẽ đổi ý.' },
      { sp: 'Thu ngân siêu thị', jp: 'いらっしゃいませ。ポイントカードはお{持|も}ちですか。', text: '"Xin chào quý khách. Quý khách có thẻ điểm không ạ?" — chị thu ngân hỏi bằng giọng đều đều của người đã hỏi câu này cả nghìn lần trong một ca.' },
      { sp: 'hero', jp: 'はい、あります。あの…{卵|たまご}とお{米|こめ}、{値上|ねあ}がりしましたよね。', text: '"Dạ có ạ. À… trứng với gạo, giá tăng rồi đúng không chị?"' },
      { sp: 'Thu ngân siêu thị', jp: 'そうなんです。{今月|こんげつ}から{食品|しょくひん}が{多|おお}く{値上|ねあ}がりしまして…{申|もう}し{訳|わけ}ございません。お{米|こめ}は5キロで{約|やく}600{円|えん}{上|あ}がりました。', text: '"Đúng vậy ạ. Từ tháng này, nhiều mặt hàng thực phẩm tăng giá… chúng tôi rất xin lỗi. Gạo tăng khoảng 600 yên cho túi 5 ký."' },
      { sp: 'narr', text: 'Sáu trăm yên. Nghe thì nhỏ — cho tới khi {name} nhân nó lên với dầu ăn, với thịt, với hộp sữa, với mọi thứ trong giỏ đang chờ tính tiền. Vật giá không tăng bằng tin tức; nó tăng bằng từng con số nhỏ như thế này, mỗi tháng một ít.' },
      { sp: 'Bà Suzuki hàng xóm', jp: 'あら、{隣|となり}の{若|わか}い{人|ひと}じゃない。{買|か}い{物|もの}？', text: '"Ồ, chẳng phải cậu trẻ nhà bên sao. Đi mua đồ à?" — bà Suzuki đẩy chiếc xe nhỏ, trong xe chỉ có nửa bắp cải, một hộp đậu phụ và túi bánh mì sắp hết hạn dán tem giảm nửa giá.' },
      { sp: 'hero', jp: 'こんばんは。{少|すこ}しだけです。{最近|さいきん}、{何|なん}でも{高|たか}くなりましたね。', text: '"Chào bà buổi tối ạ. Cháu mua ít thôi. Dạo này cái gì cũng đắt lên bà nhỉ."' },
      { sp: 'Bà Suzuki hàng xóm', jp: '{年金|ねんきん}は{同|おな}じなのに、{値段|ねだん}だけ{上|あ}がるのよ。だから{私|わたし}は{半額|はんがく}のシールが{出|で}る{時間|じかん}にしか{来|こ}ないの。', text: '"Lương hưu thì vẫn thế, mà giá thì cứ leo lên. Nên bà chỉ đến vào giờ người ta dán tem giảm nửa giá thôi đấy."' },
      { sp: 'hero', text: '"Bà tính ghê thật." — {name} cười, rồi nhìn lại giỏ của mình: bà cụ sống một mình ở đất nước của bà còn phải tính từng tem giảm giá, thì một người gửi tiền về quê như mình, có tư cách gì mua sắm bằng cảm tính?' },
      { sp: 'Bà Suzuki hàng xóm', jp: '{冷凍|れいとう}の{野菜|やさい}は{安|やす}くて{長持|ながも}ちするわよ。{一人暮|ひとりぐ}らしには、そっちの{方|ほう}が{賢|かしこ}いわ。', text: '"Rau đông lạnh vừa rẻ vừa để được lâu đấy. Sống một mình thì mua thế mới là khôn."' },
      { sp: 'narr', text: 'Điện thoại rung trong túi áo khoác. Tin nhắn của mẹ — kèm theo một tấm ảnh chụp mâm cơm nhà mình, và một dòng chữ làm {name} đứng yên giữa hai dãy kệ.' },
      { sp: 'Mẹ', text: '"Con ơi, tiền tháng này mẹ nhận được rồi. Mà sao ít hơn tháng trước gần một triệu? Mẹ tưởng con gửi nhầm. Ở bên đó có chuyện gì không con?"' },
      { sp: 'hero', text: 'Không gửi nhầm một yên nào. Số yên gửi về vẫn y nguyên — chỉ là đồng yên rớt giá, nên khi đổi ra tiền Việt, khoản tiền ấy "teo" đi trông thấy ngay trên đường bay về nhà. {name} gõ rồi xóa, xóa rồi gõ: biết giải thích thế nào cho mẹ hiểu về tỷ giá trong một tin nhắn?' },
      { sp: 'hero', jp: 'お{母|かあ}さん、{間違|まちが}えてないよ。{円|えん}が{安|やす}くなって、ベトナムドンに{替|か}えると{少|すこ}し{減|へ}るんだ。{心配|しんぱい}しないで。', text: '"Mẹ, con không gửi nhầm đâu. Đồng yên mất giá nên đổi ra tiền Việt thì ít đi một chút. Mẹ đừng lo nhé." — gửi xong, {name} nhìn chằm chằm vào chữ "một chút" của chính mình.' },
      { sp: 'Thu ngân siêu thị', jp: '{合計|ごうけい}で3,480{円|えん}です。お{米|こめ}は{重|おも}いので、{袋|ふくろ}を{二重|にじゅう}にしますね。', text: '"Tổng cộng 3.480 yên ạ. Gạo nặng nên tôi lồng hai túi cho chắc nhé."' },
      {
        prompt: 'Thanh toán xong, đi ngang kệ mì gói — món ăn "chữa cháy" quen thuộc cũng vừa đổi biển giá. Tháng này, {name} tính lại từ đầu:',
        choice: [
          { label: 'Cắt khoản ăn ngoài và cà phê lon — giữ nguyên tiền gửi về cho mẹ', fx: { love: 2, hp: -1 }, note: 'Kinh tế C4: thắt chặt chi tiêu để giữ tiền gửi về', say: [
            { sp: 'hero', text: 'Cà phê lon mỗi sáng: cắt. Ăn ngoài cuối tuần: cắt. Hai khoản ấy cộng lại vừa đúng phần tỷ giá vừa "ăn" mất của mẹ. Mình khổ thêm một chút không sao — ở nhà, mẹ đang tính tiền thuốc cho bố bằng những đồng ấy.' },
            { sp: 'narr', text: 'Quyết xong, tự nhiên thấy nhẹ. Không phải nhẹ vì có thêm tiền — mà vì ít ra, trong cái tháng mọi thứ đều tăng này, vẫn có một thứ mình giữ nguyên được bằng chính tay mình.' } ] },
          { label: 'Giữ nhịp sống như cũ — giảm nhẹ phần để dành của bản thân', fx: { pressure: 1 }, note: 'Kinh tế C4: giữ nhịp sống, xén vào phần tiết kiệm của mình', say: [
            { sp: 'hero', text: 'Cắt nữa thì sống không ra sống. Tháng này thôi: tiền gửi về giữ nguyên, nhịp sống giữ nguyên, chỉ có cuốn sổ tiết kiệm của mình là mỏng đi thay cho tất cả. Nhưng "tháng này thôi" mà lặp lại mười hai lần thì thành một năm…' },
            { sp: 'narr', text: '{name} bỏ gói mì vào giỏ. Một quyết định nghe rất hợp lý — và chính vì hợp lý nên mới đáng ngại: cái bẫy của vật giá không nằm ở một tháng, nó nằm ở chỗ tháng nào mình cũng tự nhủ đúng câu đó.' } ] }
        ]
      },
      { sp: 'narr', text: 'Ra khỏi siêu thị, túi gạo nặng trĩu một tay. {name} đứng trước kệ mì gói ban nãy thêm một lúc trong đầu mình: trứng, gạo, dầu, tỷ giá, tiền nhà, tiền gửi về… Cả tháng tới được tính lại từ đầu, bằng những con số không còn như tháng trước nữa. Ở Nhật năm nay, trưởng thành có lẽ là đây: biết giá của mọi thứ — kể cả giá của việc ở lại.' }
    ]
  },

  /* ================= C4-ECON-2 — ĐÊM KÝ TÚC: Ở LẠI HAY VỀ ================= */
  'c4-econ-2': {
    scene: '🌙 Đêm ký túc — ở lại hay về',
    branch: [
      { sp: 'narr', text: 'Mười một giờ đêm, phòng sinh hoạt chung của ký túc. Hùng "sẹo" — senpai ở lâu nhất khu này — kéo cái bàn thấp ra giữa phòng, đặt xuống bốn lon trà, rồi tuyên bố lý do họp mặt bằng một câu không giống đùa chút nào.' },
      { sp: 'Hùng', text: '"Đêm nay nói chuyện nghiêm túc một lần. Chuyện ở lại hay về. Đứa nào cũng nghĩ trong đầu từ lâu rồi, khác nhau là chưa ai nói ra miệng. Sơn — mày nói trước. Mày là đứa nghĩ nhiều nhất."' },
      { sp: 'Sơn', text: '"…Ừ. Tao nói. Tao sẽ về. Cuối năm nay, hết hạn hợp đồng là tao về hẳn, không gia hạn."' },
      { sp: 'narr', text: 'Câu nói rơi xuống giữa bàn. Long đang cầm lon trà cũng dừng tay. Chuyện "về" ai cũng từng nói lúc say, lúc mệt — nhưng Sơn nói nó tỉnh táo, chậm rãi, như người đã ký sẵn trong đầu từ lâu.' },
      { sp: 'Sơn', text: '"Lý do à? Thứ nhất: bố mẹ tao già rồi. Bố tao năm nay bảy mươi, mẹ tao đau khớp gối, đi cầu thang phải vịn. Tao là con trai duy nhất. Ở đây gửi tiền về thì được, nhưng tiền không leo cầu thang đỡ bố tao được."' },
      { sp: 'Sơn', text: '"Thứ hai: giá cả. Làm quần quật, tăng ca còng lưng, mà tiền gửi về tháng này teo hơn tháng trước vì đồng yên rớt. Đồ ăn, tiền nhà, cái gì cũng tăng — chỉ có lương là đứng yên. Tao bắt đầu thấy mình chạy tại chỗ."' },
      { sp: 'Sơn', text: '"Thứ ba, nói thật mất lòng: tao chán. Không phải chán việc — chán cái cảm giác sáng mở mắt ra là một ngày y hệt hôm qua, ở một nơi không phải nhà mình, nói một thứ tiếng không phải tiếng mình. Ba năm rồi, tao chưa thấy nó đỡ đi."' },
      { sp: 'Long', text: '"Tao nghe hết rồi. Nhưng Sơn, mày về rồi làm gì? Câu này không phải tao cà khịa — tao hỏi thật. Về quê với hai bàn tay và mấy trăm triệu, mở quán à? Được mấy tháng? Việc ở nhà lương bao nhiêu, mày biết rõ hơn tao."' },
      { sp: 'Long', text: '"Ở lại không phải vì Nhật đẹp. Ở lại vì ở đây mình còn đang lên: tiếng khá hơn, nghề chắc hơn, mỗi năm để dành được một khoản mà ở nhà mười năm chưa chắc có. Về bây giờ là cắt đúng lúc cái cây sắp ra quả."' },
      { sp: 'Hùng', text: '"Hai đứa đều có lý, đó mới là cái khó. Nghe tao nói về Đức một câu thôi."' },
      { sp: 'narr', text: 'Cái tên Đức rơi vào phòng như một cái bóng. Đức — bạn cùng ký túc khóa trước, trượt kỳ gia hạn visa, về nước trong một buổi sáng không kịp ăn bữa chia tay tử tế. Nhóm này vẫn giữ cái cốc của Đức trên kệ, chưa ai nỡ cất đi.' },
      { sp: 'Hùng', text: '"Đức nó không chọn về — nó bị về. Về rồi nó nhắn: điều nó tiếc nhất không phải nước Nhật, mà là nó đã sống hai năm cuối như người ở trọ trong chính đời mình: không học thêm, không để dành tử tế, vì lúc nào cũng nghĩ "chắc sắp về". Sơn về là về có chuẩn bị, khác hẳn. Nhưng tụi bay ở lại thì đừng sống kiểu Đức."' },
      { sp: 'Sơn', text: '"Tao không trốn. Tao về có kế hoạch: phụ bố mẹ, lấy vợ, mở cái xưởng nhỏ với anh họ. Tao chỉ không muốn đến năm bốn mươi mới nhận ra mình ở lại vì sợ về, chứ không phải vì muốn ở."' },
      { sp: 'Long', text: '"Còn tao ở lại cũng không phải vì sợ về. Tao ở lại vì tao chưa xong việc ở đây. Xong việc mà vẫn muốn về, tao về sau cũng chưa muộn."' },
      { sp: 'Hùng', text: '"Được. Hai thằng nói xong phần mình rồi. Giờ tới mày." — Hùng quay sang {name}, đẩy lon trà cuối cùng qua. "Không phải nói cho hay. Nói thật lòng mày đang nghiêng về đâu."' },
      {
        prompt: 'Giữa hai tiếng nói vừa dứt, {name} đặt mình vào đâu?',
        choice: [
          { label: 'Quyết ở lại — tao còn một con đường dài phải đi hết ở đây', flag: 'saga-c4', value: 'econ:o-lai', fx: { jp: 1, pressure: 1 }, note: 'Chương 4 — kinh tế: tuyên bố quyết ở lại vì lý do dài hạn', say: [
            { sp: 'hero', text: '"Tao ở lại. Nói rõ lý do để sau này nản cũng không tự lừa mình: tao ở lại vì những thứ tao đang xây ở đây chưa xong — tiếng Nhật chưa tới nơi, nghề chưa thành nghề, tiền để dành chưa đủ làm vốn cho bất cứ cái gì."' },
            { sp: 'hero', text: '"Giá tăng, yên rớt — thật. Nhưng về bây giờ thì tao mang về được gì? Một khoản tiền ăn dần và con số không. Ở nhà tao cũng sẽ phải bắt đầu lại, mà bắt đầu lại ở tuổi này với hai bàn tay trắng tiếng Nhật thì phí mấy năm đã qua lắm."' },
            { sp: 'Sơn', text: '"…Ừ. Mày nói thế tao phục. Ở lại mà biết mình ở lại để làm gì, khác hẳn ở lại vì không biết đi đâu."' },
            { sp: 'Long', text: '"Đấy. Đồng đội đây rồi." — Long cụng lon trà cái cạch. "Hai đứa ở lại, một đứa về làm ăn — năm năm nữa họp lớp ký túc, đứa nào cũng phải có cái để kể đấy."' },
            { sp: 'Hùng', text: '"Ghi sổ." — Hùng gật đầu, giọng senpai hiếm khi nghiêm mà ấm. "Ở lại thì sống cho ra ở lại: học thêm một thứ, để dành có kế hoạch, đừng sống tạm. Tao sẽ nhắc. Nhắc nhiều là đằng khác."' },
            { sp: 'hero', text: 'Nói ra miệng rồi mới thấy: quyết định ở lại không làm giá trứng rẻ đi một yên nào. Nhưng nó biến những ngày sắp tới từ "chịu đựng" thành "đang đi" — và hai thứ đó, nhìn giống nhau mà khác nhau cả một đời.' } ] },
          { label: 'Thú thật: tao đang nghiêng về đường về — nhưng chưa phải lúc này', flag: 'saga-c4', value: 'econ:ve', fx: { love: 1, pressure: 1 }, note: 'Chương 4 — kinh tế: thú thật nghiêng về đường về, nhưng chưa phải lúc này', say: [
            { sp: 'hero', text: '"Tao nói thật, đừng đứa nào sốc: dạo này tao nghiêng về đường về. Không phải vì một ngày xấu — mà vì tao bắt đầu hiểu câu của Sơn: tiền gửi về không leo cầu thang đỡ bố mẹ mình được."' },
            { sp: 'hero', text: '"Nhưng chưa phải lúc này. Về bây giờ là về bằng cảm xúc: chưa đủ vốn, chưa có kế hoạch, tiếng Nhật đang dở dang. Tao không muốn mình thành một Đức thứ hai — khác là Đức bị về, còn tao tự nhảy xuống giữa đường."' },
            { sp: 'Sơn', text: '"Mày nói câu đó, tao yên tâm hơn cho cả hai đứa." — Sơn cười buồn. "Về cũng được, ở cũng được, chỉ đừng về kiểu trốn và đừng ở kiểu trôi. Tao về trước, dọn đường, đứa nào theo sau thì có chỗ mà về."' },
            { sp: 'Long', text: '"Nghe như chia tay sớm thế này." — Long chống cằm. "Thôi được. Nghiêng thì nghiêng, nhưng từ giờ tới lúc mày quyết, sống tử tế vào. Người sắp về mà buông xuôi là tao khinh trước đấy."' },
            { sp: 'Hùng', text: '"Chuẩn." — Hùng chốt lại. "Nghiêng về đâu cũng phải có ngày tháng và điều kiện rõ ràng: đủ bao nhiêu tiền thì về, học xong cái gì thì về. Viết ra giấy đi. Quyết định đời người mà để trong đầu thì nó trôi theo tâm trạng đấy."' },
            { sp: 'hero', text: 'Thú thật xong, không thấy nhẹ tội — chỉ thấy rõ ràng. Đường về, từ đêm nay, không còn là một ý nghĩ lén lút lúc yếu lòng nữa; nó là một khả năng có tên, có điều kiện, và có ngày để xét lại.' } ] }
        ]
      },
      { sp: 'narr', text: 'Đêm ấy không ai thắng trong cuộc tranh luận, vì vốn dĩ chẳng có gì để thắng: mỗi người chỉ vừa nói ra con đường của chính mình. Lon trà cạn, đèn hành lang ký túc tắt dần. Nhưng từ đêm nay, trong phòng này, "ở lại" và "về nước" không còn là hai phe — chúng là hai đáp án, và mỗi người phải tự chịu trách nhiệm với đáp án của mình.' }
    ]
  },

  /* ================= C4-ECON-3 — TIỄN SƠN Ở GA ================= */
  'c4-econ-3': {
    scene: '🚉 Ga chiều — tiễn Sơn',
    branch: [
      { sp: 'narr', text: 'Chiều chủ nhật, sân ga đông người mà nhóm bốn người đứng lặng như một khoảng trống. Sơn về nước hôm nay. Khác với buổi tiễn Đức ngày trước — hôm ấy là bị động, là nước mắt của sự bất lực — buổi tiễn này nặng hơn theo một cách khác: đây là người chủ động bỏ cuộc giữa đường, xếp hành lý của ba năm đời mình vào đúng hai cái vali.' },
      { sp: 'hero', jp: '{荷物|にもつ}、それだけ？{三年|さんねん}いたのに。', text: '"Hành lý có thế thôi à? Ở những ba năm cơ mà."' },
      { sp: 'Sơn', jp: '{物|もの}は{少|すく}ない{方|ほう}がいい。{増|ふ}えたのは{写真|しゃしん}と、{貯金通帳|ちょきんつうちょう}の{数字|すうじ}だけだよ。', text: '"Đồ ít thôi là tốt. Thứ tăng lên chỉ có ảnh chụp, với con số trong sổ tiết kiệm thôi." — Sơn cười, vỗ vỗ cái ba lô nhỏ đeo trên vai như vỗ vai một người bạn cũ.' },
      { sp: 'Long', jp: 'お{前|まえ}の{部屋|へや}、{今日|きょう}から{誰|だれ}が{入|はい}るんだろうな。', text: '"Phòng của mày, từ hôm nay không biết ai vào ở nhỉ." — Long nói câu vô nghĩa nhất có thể nghĩ ra, vì những câu có nghĩa thì không nói nổi lúc này.' },
      { sp: 'Sơn', jp: '{新|あたら}しい{人|ひと}が{来|き}たら、{伝|つた}えてくれ。{壁|かべ}の{時計|とけい}、{電池|でんち}すぐ{切|き}れるから{気|き}をつけろって。あと、うるさいのは{俺|おれ}じゃなくて{隣|となり}の{部屋|へや}の{洗濯機|せんたくき}だって。', text: '"Người mới tới thì nhắn hộ: đồng hồ treo tường nhanh hết pin, cẩn thận đấy. Với lại, tiếng ồn không phải từ phòng tao đâu, là máy giặt phòng bên."' },
      { sp: 'Hùng', jp: '{空港|くうこう}までの{電車|でんしゃ}、{乗|の}り{換|か}え{間違|まちが}えるなよ。{搭乗|とうじょう}は2{時間前|じかんまえ}だ。{手続|てつづ}き、{焦|あせ}るな。', text: '"Tàu ra sân bay đừng đổi nhầm tuyến đấy. Lên máy bay trước 2 tiếng. Thủ tục cứ bình tĩnh, đừng cuống." — Hùng dặn dò như dặn một đứa em đi xa lần đầu, dù cả hai đều biết Sơn thuộc đường hơn ai hết.' },
      { sp: 'Sơn', jp: '{分|わ}かってる。{兄貴|あにき}こそ、{体|からだ}に{気|き}をつけて。{皆|みんな}の{世話|せわ}ばかりで、{自分|じぶん}の{健康診断|けんこうしんだん}、{今年|ことし}も{行|い}ってないだろ。', text: '"Em biết rồi. Anh mới phải giữ sức khỏe ấy. Lo cho cả xóm mà khám sức khỏe năm nay anh vẫn chưa đi, đúng không."' },
      { sp: 'narr', text: 'Hùng khựng lại, rồi bật cười khan. Sơn là thế: tới phút chia tay vẫn là người nhìn thấu cả nhóm. Cái vali nhỏ, cái ba lô, một túi quà mua ở cửa hàng đồng giá sân ga — quà cho bố là cái khăn len, cho mẹ là hộp trà, toàn những thứ nhẹ, vì "quà nặng thì người nhận áy náy".' },
      { sp: 'Sơn', text: '"Nghe tao dặn ba câu, gửi cho người ở lại." — Sơn quay lại nhìn cả ba người, bỗng nghiêm hẳn. "Một: đừng để dành tiền kiểu nhịn ăn nhịn mặc rồi đổ bệnh — tiền tiết kiệm mà đổi bằng sức khỏe là lỗ. Hai: học thêm một cái gì đó mỗi năm, kể cả không liên quan tới việc. Ba…" ' },
      { sp: 'Sơn', text: '"Ba: đừng ở lại chỉ vì đã ở lại. Mỗi năm, vào đúng ngày hôm nay, tự hỏi lại một lần: mình ở đây vì muốn, hay vì sợ? Nếu là vì sợ — thì về, hoặc đổi cách sống. Đừng như tao, để câu hỏi đó đợi tới ba năm mới trả lời."' },
      { sp: 'narr', text: 'Cả nhóm im lặng. Không ai gật, không ai phản bác. Trên sân ga ồn ã, câu nói ấy hạ xuống giữa bốn người như một vật nặng đặt xuống bàn — không vỡ, không kêu, chỉ ở đó, và từ nay sẽ ở đó mãi trong đầu mỗi người ở lại.' },
      { sp: 'Loa ga', jp: '{間|ま}もなく、{空港行|くうこうい}きの{電車|でんしゃ}が{到着|とうちゃく}します。', text: '"Tàu đi sân bay sắp tới ga." — tiếng loa vang lên, vô tình và đúng giờ như mọi cuộc chia ly ở đất nước này.' },
      { sp: 'Long', jp: '{着|つ}いたら{連絡|れんらく}しろよ。{実家|じっか}の{写真|しゃしん}も{送|おく}れ。{庭|にわ}の{柿|かき}の{木|き}、{本当|ほんとう}にあったのか{確認|かくにん}したい。', text: '"Tới nơi thì nhắn đấy. Gửi ảnh nhà mày nữa. Tao muốn kiểm chứng cây hồng trong vườn có thật không."' },
      { sp: 'Sơn', jp: 'ああ、{送|おく}る。お{前|まえ}らもな、{元気|げんき}で。…{悪|わる}いな、{先|さき}に{降|お}りて。', text: '"Ừ, tao gửi. Tụi bay cũng giữ gìn nhé. …Xin lỗi, tao xuống tàu giữa đường trước đây." — Sơn cúi đầu rất nhanh, rồi xách vali bước qua cửa tàu vừa mở.' },
      { sp: 'narr', text: 'Tàu chạy. Sơn đứng ở ô cửa kính cuối toa, giơ tay — không vẫy mạnh, chỉ giơ lên và giữ yên, cho tới khi cả đoàn tàu thu lại thành một điểm sáng rồi mất hẳn sau khúc cua. Long đứng nhìn theo lâu nhất. Hùng đút hai tay vào túi áo, nói một câu rất nhỏ: "Một đứa về hẳn hoi. Còn mình thì ở lại cho hẳn hoi."' },
      { sp: 'hero', text: 'Trên đường đi bộ từ ga về ký túc, phố chiều phủ một lớp nắng mỏng. Hai người đi qua siêu thị, qua công viên nhỏ, qua quán mì mà cả nhóm từng ăn mừng lương tháng đầu tiên. Nơi nào cũng còn nguyên — chỉ có một người vừa rời khỏi tất cả những nơi ấy, mãi mãi, bằng chính lựa chọn của mình.' },
      { sp: 'Hùng', text: '"Về tới phòng, ăn gì nóng nóng đi. Rồi từ mai, sống phần của mình — đừng sống thay phần nó, cũng đừng sống né phần nó. Nó về không phải để tụi mình buồn; nó về để nhắc tụi mình đang ở đây vì cái gì."' },
      { sp: 'narr', text: 'Đêm đó, phòng của Sơn khóa cửa, tối đèn. Cái cốc của Đức trên kệ nay có thêm chiếc móc khóa Sơn để lại. Ký túc xá vẫn vậy, chỉ vắng dần — như một đoàn tàu đường dài, mỗi ga lại có một người xuống, và những người còn ngồi lại nhìn nhau, hiểu rằng phần đường của mình từ nay phải tự đi cho đáng.' }
    ]
  },

  /* ================= C4-LIC-1 — ĐĂNG KÝ LẤY BẰNG LÁI: HAI CON ĐƯỜNG ================= */
  'c4-lic-1': {
    scene: '🚗 Đăng ký lấy bằng lái — hai con đường',
    branch: [
      { sp: 'narr', text: 'Chủ nhật, {name} đi bộ tới trường lái xe ở đầu thành phố. Tấm biển hiệu lớn, sân tập có những chiếc xe nhỏ sơn chữ "luyện tập" chạy chậm rãi sau hàng rào. Bằng lái — thứ ở quê nhà chỉ là một tấm thẻ, ở đây là cả một cánh cửa: đi xa hơn, xin việc rộng hơn, không còn bị bó chân trong bán kính một tuyến tàu.' },
      { sp: 'Nhân viên trường lái', jp: 'いらっしゃいませ。{免許|めんきょ}を{取|と}りたいとお{考|かんが}えですか。{初|はじ}めから{取|と}る{方|ほう}ですか、それとも{外国|がいこく}の{免許|めんきょ}の{切|き}り{替|か}えですか。', text: '"Xin chào. Anh đang muốn lấy bằng lái phải không ạ? Anh lấy từ đầu, hay đổi từ bằng của nước ngoài sang?"' },
      { sp: 'hero', jp: 'ベトナムの{免許|めんきょ}は{持|も}っていますが、{日本|にほん}で{取|と}る{方法|ほうほう}を{全部|ぜんぶ}{聞|き}いてから{決|き}めたいです。', text: '"Tôi có bằng của Việt Nam, nhưng tôi muốn nghe tất cả các cách lấy bằng ở Nhật rồi mới quyết định ạ."' },
      { sp: 'Nhân viên trường lái', jp: 'かしこまりました。では、{二|ふた}つの{方法|ほうほう}を{順番|じゅんばん}にご{説明|せつめい}します。まず、{自動車学校|じどうしゃがっこう}に{通|かよ}う{方法|ほうほう}です。', text: '"Vâng, tôi hiểu rồi ạ. Vậy tôi xin giải thích lần lượt hai cách. Trước tiên là cách theo học tại trường lái."' },
      { sp: 'Nhân viên trường lái', jp: '{学校|がっこう}では{学科|がっか}と{技能|ぎのう}を{順番|じゅんばん}に{学|まな}びます。{費用|ひよう}は{全部|ぜんぶ}で{約|やく}30{万円|まんえん}ですが、{最初|さいしょ}に{第一段階|だいいちだんかい}の{分|ぶん}、{約|やく}6{万円|まんえん}をお{支払|しはら}いいただきます。{分割|ぶんかつ}も{可能|かのう}です。', text: '"Ở trường, anh sẽ học lý thuyết và thực hành theo từng giai đoạn. Tổng chi phí khoảng 30 man, nhưng trước mắt anh thanh toán phần giai đoạn một, khoảng 6 man. Cũng có thể trả góp ạ."' },
      { sp: 'hero', jp: '{学科|がっか}の{試験|しけん}は、やはり{日本語|にほんご}だけですか。', text: '"Bài thi lý thuyết thì vẫn chỉ có tiếng Nhật thôi ạ?"' },
      { sp: 'Nhân viên trường lái', jp: '{学校|がっこう}の{試験|しけん}と、{最後|さいご}の{免許|めんきょ}センターの{試験|しけん}は{日本語|にほんご}が{中心|ちゅうしん}です。だから、{標識|ひょうしき}の{言葉|ことば}はここでしっかり{覚|おぼ}えていただきます。{授業|じゅぎょう}は{平日|へいじつ}の{夜|よる}と{日曜日|にちようび}にもありますよ。', text: '"Thi ở trường và thi cuối cùng ở trung tâm sát hạch chủ yếu là tiếng Nhật. Vì vậy ở đây chúng tôi sẽ giúp anh học chắc từ ngữ trên biển báo. Lớp học có cả buổi tối ngày thường và chủ nhật ạ."' },
      { sp: 'Nhân viên trường lái', jp: '{次|つぎ}に、{外国免許切替|がいこくめんきょきりかえ}、{通称|つうしょう}「がいめんきりかえ」です。こちらは{手数料|てすうりょう}などが{約|やく}4{千円|せんえん}ほどで、ずっと{安|やす}いです。', text: '"Tiếp theo là đổi bằng nước ngoài, gọi tắt là gaimen kirikae. Cách này phí chỉ khoảng 4 nghìn yên, rẻ hơn rất nhiều."' },
      { sp: 'hero', jp: '{安|やす}いのは{助|たす}かります。でも、{難|むずか}しいと{聞|き}きました。', text: '"Rẻ thì đỡ lắm ạ. Nhưng tôi nghe nói cách này khó."' },
      { sp: 'Nhân viên trường lái', jp: 'はい、{正直|しょうじき}に{申|もう}し{上|あ}げますと、{簡単|かんたん}ではありません。まず{面接|めんせつ}で、ベトナムでどうやって{免許|めんきょ}を{取|と}ったか、{細|こま}かく{聞|き}かれます。{次|つぎ}に{視力検査|しりょくけんさ}、そして{知識|ちしき}の{確認|かくにん}と{技能試験|ぎのうしけん}があります。', text: '"Vâng, nói thẳng thì nó không dễ ạ. Trước hết là phỏng vấn — anh sẽ bị hỏi rất kỹ về quá trình lấy bằng ở Việt Nam. Sau đó là khám thị lực, rồi kiểm tra kiến thức và thi thực hành."' },
      { sp: 'Nhân viên trường lái', jp: '{技能試験|ぎのうしけん}の{基準|きじゅん}は{厳|きび}しくて、{一度|いちど}で{合格|ごうかく}する{人|ひと}は{少|すく}ないです。{落|お}ちるたびに{予約|よやく}を{取|と}り{直|なお}しますので、{時間|じかん}はかかるかもしれません。', text: '"Tiêu chuẩn thi thực hành khá nghiêm, ít người đỗ ngay lần đầu. Mỗi lần trượt lại phải đặt lịch lại, nên có thể sẽ mất thời gian ạ."' },
      { sp: 'hero', jp: '{必要|ひつよう}な{書類|しょるい}は、{何|なに}ですか。', text: '"Giấy tờ cần thiết gồm những gì ạ?"' },
      { sp: 'Nhân viên trường lái', jp: 'ベトナムの{免許証|めんきょしょう}の{翻訳文|ほんやくぶん}、パスポート、{在留|ざいりゅう}カード、{住民票|じゅうみんひょう}です。ベトナムで{免許|めんきょ}を{取|と}った{後|あと}、3か{月以上|げついじょう}{滞在|たいざい}していた{証明|しょうめい}も{必要|ひつよう}です。', text: '"Bản dịch bằng lái Việt Nam, hộ chiếu, thẻ cư trú và giấy chứng nhận cư trú. Anh cũng cần chứng minh đã ở Việt Nam trên 3 tháng sau khi lấy bằng ạ."' },
      { sp: 'narr', text: '{name} ghi vào sổ hai cột. Cột trái: trường lái — đắt, 6 man ngay đợt đầu, nhưng có thầy dạy từng bước, bài bản, chắc đỗ. Cột phải: đổi bằng — rẻ bất ngờ, vài nghìn yên, nhưng phỏng vấn, khám mắt, thi thực hành với cái chuẩn "ít người qua lần đầu". Một bên mua sự chắc chắn bằng tiền; một bên đánh cược bằng thời gian và thần kinh.' },
      {
        prompt: '{name} chọn con đường nào để lấy bằng?',
        choice: [
          { label: 'Học trường lái 自動車学校 — đắt nhưng bài bản, chắc đỗ', flag: 'saga-c4', value: 'lic:truong', fx: { money: -6, jp: 1 }, note: 'Chương 4 — bằng lái: chọn học trường lái (đợt 1: 6 man)', say: [
            { sp: 'hero', jp: '{学校|がっこう}に{入|はい}ります。{第一段階|だいいちだんかい}の{分|ぶん}を、まずお{支払|しはら}いします。', text: '"Tôi sẽ theo học ở trường. Trước hết tôi xin thanh toán phần của giai đoạn một ạ." — 6 man rời khỏi ví, nghe rõ tiếng "xoẹt" trong đầu: đó là gần nửa tháng lương, đổi lấy một con đường không có lối tắt.' },
            { sp: 'Nhân viên trường lái', jp: 'ありがとうございます。では{入学手続|にゅうがくてつづ}きをいたします。{来週|らいしゅう}から{学科|がっか}が{始|はじ}まります。{教科書|きょうかしょ}と{予定表|よていひょう}をお{渡|わた}ししますね。', text: '"Cảm ơn anh. Vậy tôi làm thủ tục nhập học cho anh. Từ tuần sau bắt đầu học lý thuyết. Đây là sách giáo khoa và lịch học của anh ạ."' },
            { sp: 'narr', text: 'Cầm cuốn sách luật giao thông dày cộp toàn tiếng Nhật, {name} vừa thấy ngợp vừa thấy thật: từ tuần sau, buổi tối của mình có thêm một việc nghiêm túc. Đắt — nhưng mỗi yên chi ra đều nhìn thấy nó biến thành giờ học, thành thầy sửa từng lỗi, thành sự chắc chắn.' },
            { sp: 'hero', text: 'Ra khỏi trường, {name} nhắn cho Hùng một dòng: "Đăng ký rồi. Trường lái. Từ nay cuối tuần bớt rủ em nhậu." Hùng trả lời bằng một sticker giơ ngón cái và câu: "Học cho đỗ một lần. Tiền đợt hai để anh em… không, tự lo đi, nhưng đỗ thì khao."' } ] },
          { label: 'Đổi bằng gaimen kirikae — rẻ, khó mấy cũng thử sức', flag: 'saga-c4', value: 'lic:kirikae', fx: { money: -0.4 }, note: 'Chương 4 — bằng lái: chọn đổi bằng Việt Nam gaimen kirikae (phí ~0,4 man)', say: [
            { sp: 'hero', jp: 'きりかえで{申|もう}し{込|こ}みます。{書類|しょるい}を{揃|そろ}えて、{面接|めんせつ}の{予約|よやく}をお{願|ねが}いします。', text: '"Tôi xin đăng ký đường đổi bằng. Tôi sẽ chuẩn bị đủ giấy tờ, xin đặt lịch phỏng vấn ạ." — 4 nghìn yên phí: rẻ đến mức ví không hề nhúc nhích. Chỉ có lòng bàn tay là hơi ướt.' },
            { sp: 'Nhân viên trường lái', jp: 'かしこまりました。では{必要書類|ひつようしょるい}のリストをお{渡|わた}しします。{面接|めんせつ}では、{免許|めんきょ}を{取|と}った{時|とき}のことをよく{聞|き}かれますので、{準備|じゅんび}しておいてください。', text: '"Vâng ạ. Đây là danh sách giấy tờ cần thiết. Ở buổi phỏng vấn, họ sẽ hỏi kỹ về thời điểm anh lấy bằng, nên anh hãy chuẩn bị trước nhé."' },
            { sp: 'narr', text: 'Rẻ có cái giá của rẻ — chỉ là nó không thu bằng tiền. Nó thu bằng những buổi tối tự ôn luật bằng tiếng Nhật, bằng buổi phỏng vấn phải kể lại rành mạch chuyện thi bằng ở quê nhà mấy năm trước, và bằng một kỳ thi thực hành mà người ta bảo "mười người đi, hai người qua".' },
            { sp: 'hero', text: '{name} gấp tờ danh sách giấy tờ cho vào sổ. Đường rẻ thì đi cho khéo: dịch bằng, xin giấy cư trú, ôn lại từng biển báo. Ở Nhật tới giờ, mình chưa từng qua được cửa nào bằng may mắn cả — cửa này cũng thế thôi.' } ] },
          { label: 'Để dành thêm ít tiền rồi quay lại', fx: { pressure: 1 }, note: 'Bằng lái: hoãn đăng ký, để dành thêm tiền rồi quay lại', say: [
            { sp: 'hero', jp: 'すみません、{今日|きょう}は{申|もう}し{込|こ}みません。もう{少|すこ}し{貯金|ちょきん}してから、また{来|き}ます。', text: '"Xin lỗi, hôm nay tôi chưa đăng ký. Tôi sẽ để dành thêm một ít tiền rồi quay lại sau ạ."' },
            { sp: 'Nhân viên trường lái', jp: 'はい、{無理|むり}のない{方|ほう}がいいですよ。パンフレットをお{持|も}ちください。{分|わ}からないことがあれば、いつでもどうぞ。', text: '"Vâng, cứ theo khả năng của mình là tốt nhất ạ. Anh cầm tờ giới thiệu này về xem. Có gì chưa rõ, cứ ghé lại bất cứ lúc nào."' },
            { sp: 'narr', text: '{name} ra về với tờ rơi gấp tư trong túi áo. Chưa tiến thêm bước nào — nhưng ít nhất hôm nay đã nhìn tận mắt cả hai con đường và cái giá của chúng. Có những quyết định hoãn lại là khôn; chỉ cần nhớ: hoãn không được phép biến thành quên.' } ] }
        ]
      },
      { sp: 'narr', text: 'Trên đường về, ngang qua bãi đỗ xe của trường, những chiếc xe tập lái vẫn chạy chậm rãi theo vòng sân. {name} nhìn theo một chiếc vừa dừng đúng vạch, lòng nghĩ về ngày mình ngồi vào ghế đó — bằng con đường nào đi nữa, đích đến vẫn là một tấm bằng, và một Nhật Bản rộng hơn đang chờ phía sau tay lái.' }
    ]
  },

  /* ================= C4-LIC-2 — SÁT HẠCH LUẬT: 6 CÂU HỎI =================
     Đúng 6 câu; nhãn lựa chọn là câu tiếng Nhật TRẦN; mỗi đáp án có note bắt đầu
     'Bằng lái: đúng' / 'Bằng lái: sai' (ghi rõ sai ở đâu) và say gồm hero đọc câu
     tiếng Nhật (furigana + dịch) + phản ứng của cán bộ sát hạch. */
  'c4-lic-2': {
    scene: '📝 Ngày sát hạch — phần hiểu biết luật',
    branch: [
      { sp: 'narr', text: 'Phòng thi của trung tâm sát hạch im phăng phắc, chỉ có tiếng bút chì và tiếng lật giấy. Trên màn hình trước mặt {name} là phần thi hiểu biết luật — phần thi không hỏi mẹo, chỉ hỏi một thứ: người cầm lái này có hiểu rằng mỗi câu trả lời của mình, ngoài đời thật, đều nặng bằng một sinh mạng hay không.' },
      { sp: 'Cán bộ sát hạch', jp: '{試験|しけん}を{始|はじ}めます。{落|お}ち{着|つ}いて、{問題|もんだい}をよく{読|よ}んでください。{時間|じかん}は{十分|じゅうぶん}あります。', text: '"Bắt đầu làm bài. Hãy bình tĩnh và đọc kỹ câu hỏi. Thời gian là đủ."' },
      { sp: 'hero', jp: 'はい。よろしくお{願|ねが}いします。', text: '"Vâng. Xin nhờ thầy." — {name} hít một hơi dài. Mấy tháng tối ôn biển báo trong phòng ký túc, giờ gói lại trong sáu câu hỏi đầu tiên đập vào mắt.' },
      { sp: 'Cán bộ sát hạch', jp: '{日本|にほん}の{道路|どうろ}では、{車|くるま}と{歩行者|ほこうしゃ}はそれぞれ{左右|さゆう}のどちらを{通行|つうこう}しますか。', text: '"Trên đường ở Nhật, ô tô và người đi bộ lần lượt đi ở phía trái hay phía phải?"' },
      {
        prompt: 'Câu 1/6 — Nguyên tắc đi trái/phải ở Nhật?',
        choice: [
          { label: '車は左側、歩行者は右側を通行する', fx: { jp: 2 }, note: 'Bằng lái: đúng — Nhật Bản đi bên trái đối với xe, người đi bộ đi phía bên phải (đối diện dòng xe)', say: [
            { sp: 'hero', jp: '{車|くるま}は{左側|さそく}、{歩行者|ほこうしゃ}は{右側|うそく}を{通行|つうこう}します。', text: '"Xe đi phía bên trái, người đi bộ đi phía bên phải." — quy tắc ngược hẳn với Việt Nam, và là thứ đầu tiên phải "lật" trong đầu khi ngồi vào ghế lái ở Nhật.' },
            { sp: 'Cán bộ sát hạch', jp: 'はい、{正解|せいかい}です。ベトナムと{反対|はんたい}ですから、{習慣|しゅうかん}を{切|き}り{替|か}えるのが{大切|たいせつ}です。', text: '"Đúng. Vì ngược với Việt Nam nên việc thay đổi thói quen là rất quan trọng."' } ] },
          { label: '車は右側、歩行者は左側を通行する', fx: { pressure: 1 }, note: 'Bằng lái: sai — đó là quy tắc của Việt Nam; ở Nhật xe đi bên TRÁI, khai ngược là sai ngay nền tảng', say: [
            { sp: 'hero', jp: '{車|くるま}は{右側|うそく}、{歩行者|ほこうしゃ}は{左側|さそく}を{通行|つうこう}します。', text: '"Xe đi phía bên phải, người đi bộ đi phía bên trái."' },
            { sp: 'Cán bộ sát hạch', jp: 'それはベトナムの{規則|きそく}です。{日本|にほん}では{反対|はんたい}ですよ。', text: '"Đó là quy tắc của Việt Nam. Ở Nhật thì ngược lại." — giọng cán bộ không nặng, nhưng cây bút đã gạch một đường dứt khoát.' } ] },
          { label: '車も歩行者も、空いている側を通行してよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — không có quy tắc "phía nào trống thì đi"; luật quy định cố định xe trái, người phải', say: [
            { sp: 'hero', jp: '{車|くるま}も{歩行者|ほこうしゃ}も、{空|あ}いている{側|がわ}を{通行|つうこう}してよいです。', text: '"Cả xe lẫn người đi bộ đều đi phía nào trống cũng được."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ、{決|き}まりは{決|き}まりです。「{空|あ}いているから」は{理由|りゆう}になりません。', text: '"Không. Quy định là quy định. "Vì trống" không phải là lý do."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: '{横断歩道|おうだんほどう}を{渡|わた}ろうとしている{歩行者|ほこうしゃ}がいます。{車|くるま}はどうしなければなりませんか。', text: '"Có người đi bộ đang chuẩn bị qua vạch zebra. Xe phải làm gì?"' },
      {
        prompt: 'Câu 2/6 — Gặp người đi bộ ở vạch zebra?',
        choice: [
          { label: '横断歩道の手前で一時停止し、歩行者の横断を妨げてはならない', fx: { jp: 2 }, note: 'Bằng lái: đúng — phải dừng hẳn trước vạch zebra, không được cản trở người đi bộ qua đường', say: [
            { sp: 'hero', jp: '{横断歩道|おうだんほどう}の{手前|てまえ}で{一時停止|いちじていし}し、{歩行者|ほこうしゃ}の{横断|おうだん}を{妨|さまた}げてはなりません。', text: '"Phải dừng hẳn trước vạch sang đường và không được cản trở người đi bộ qua đường."' },
            { sp: 'Cán bộ sát hạch', jp: 'その{通|とお}りです。{歩行者|ほこうしゃ}{優先|ゆうせん}は、{日本|にほん}の{交通|こうつう}の{基本|きほん}です。', text: '"Chính xác. Ưu tiên người đi bộ là nguyên tắc cơ bản của giao thông Nhật Bản."' } ] },
          { label: '速度を落とせば、そのまま通過してよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — chỉ giảm tốc rồi đi tiếp vẫn là cản trở người đi bộ; khi có người qua đường phải DỪNG HẲN', say: [
            { sp: 'hero', jp: '{速度|そくど}を{落|お}とせば、そのまま{通過|つうか}してよいです。', text: '"Chỉ cần giảm tốc độ là có thể đi qua luôn."' },
            { sp: 'Cán bộ sát hạch', jp: '{違|ちが}います。{歩行者|ほこうしゃ}がいる{場合|ばあい}は、{止|と}まらなければなりません。', text: '"Sai. Khi có người đi bộ thì phải dừng lại."' } ] },
          { label: 'クラクションを鳴らして、歩行者に注意を促す', fx: { pressure: 1 }, note: 'Bằng lái: sai — bấm còi giục người đi bộ là hành vi sai luật và nguy hiểm; quyền ưu tiên thuộc về người đi bộ', say: [
            { sp: 'hero', jp: 'クラクションを{鳴|な}らして、{歩行者|ほこうしゃ}に{注意|ちゅうい}を{促|うなが}します。', text: '"Bấm còi để nhắc người đi bộ chú ý."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。{横断歩道|おうだんほどう}では、{車|くるま}が{待|ま}つ{側|がわ}です。', text: '"Không. Ở vạch sang đường, phía phải chờ là ô tô."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: '「{止|と}まれ」の{標識|ひょうしき}がある{交差点|こうさてん}では、どうしますか。', text: '"Ở ngã tư có biển "止まれ" (dừng lại) thì phải làm gì?"' },
      {
        prompt: 'Câu 3/6 — Biển 止まれ xử lý thế nào?',
        choice: [
          { label: '停止線の手前で完全に止まり、左右の安全を確認してから進む', fx: { jp: 2 }, note: 'Bằng lái: đúng — biển 止まれ bắt buộc dừng HẲN ở vạch dừng, quan sát hai phía rồi mới đi', say: [
            { sp: 'hero', jp: '{停止線|ていしせん}の{手前|てまえ}で{完全|かんぜん}に{止|と}まり、{左右|さゆう}の{安全|あんぜん}を{確認|かくにん}してから{進|すす}みます。', text: '"Dừng hẳn trước vạch dừng, xác nhận an toàn hai phía rồi mới đi tiếp."' },
            { sp: 'Cán bộ sát hạch', jp: 'はい。「{止|と}まれ」は{徐行|じょこう}ではなく、{停止|ていし}です。その{理解|りかい}で{正|ただ}しいです。', text: '"Đúng. "止まれ" không phải đi chậm, mà là dừng lại. Hiểu như vậy là đúng."' } ] },
          { label: '徐行して、左右を見ながらそのまま進んでよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — lăn bánh chậm qua biển 止まれ vẫn bị tính là không dừng; luật yêu cầu bánh xe dừng hẳn', say: [
            { sp: 'hero', jp: '{徐行|じょこう}して、{左右|さゆう}を{見|み}ながらそのまま{進|すす}んでよいです。', text: '"Đi thật chậm, nhìn hai phía rồi đi luôn cũng được."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。{止|と}まらずに{進|すす}むのは{違反|いはん}です。', text: '"Không. Không dừng mà đi tiếp là vi phạm."' } ] },
          { label: '他の車が来ていなければ、止まらなくてよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — nghĩa vụ dừng ở biển 止まれ là tuyệt đối, không phụ thuộc có xe khác hay không', say: [
            { sp: 'hero', jp: '{他|ほか}の{車|くるま}が{来|き}ていなければ、{止|と}まらなくてよいです。', text: '"Nếu không có xe khác tới thì không cần dừng."' },
            { sp: 'Cán bộ sát hạch', jp: '{違|ちが}います。{車|くるま}が{来|き}ていなくても、{必|かなら}ず{止|と}まってください。', text: '"Sai. Dù không có xe tới cũng nhất định phải dừng."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: '{飲酒運転|いんしゅうんてん}について、{正|ただ}しいものを{選|えら}んでください。', text: '"Hãy chọn câu đúng về lái xe sau khi uống rượu bia."' },
      {
        prompt: 'Câu 4/6 — Rượu bia và lái xe?',
        choice: [
          { label: '少量でも飲んだら運転してはならず、酒を勧めた同乗者や車を貸した人も罰せられる', fx: { jp: 2 }, note: 'Bằng lái: đúng — cấm tuyệt đối dù chỉ một ít; cả người mời rượu, người cho mượn xe và người đi cùng biết chuyện cũng bị phạt', say: [
            { sp: 'hero', jp: '{少量|しょうりょう}でも{飲|の}んだら{運転|うんてん}してはならず、お{酒|さけ}を{勧|すす}めた{同乗者|どうじょうしゃ}や{車|くるま}を{貸|か}した{人|ひと}も{罰|ばっ}せられます。', text: '"Dù chỉ uống một ít cũng không được lái xe; người mời rượu, người cho mượn xe cũng bị phạt." — ở Nhật, "một ly thôi mà" là câu nói mở đầu của rất nhiều bi kịch, và luật ở đây không thương lượng với nó.' },
            { sp: 'Cán bộ sát hạch', jp: 'はい、{全部|ぜんぶ}{正|ただ}しいです。{飲酒運転|いんしゅうんてん}は、{周|まわ}りの{人|ひと}にも{責任|せきにん}があります。', text: '"Đúng, tất cả đều đúng. Lái xe khi say rượu thì người xung quanh cũng phải chịu trách nhiệm."' } ] },
          { label: 'ビール一杯ぐらいなら、2時間休めば運転してよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — không tồn tại mức "một cốc thì được"; đã uống là cấm lái, nghỉ 2 tiếng cũng không làm cồn biến mất theo luật định', say: [
            { sp: 'hero', jp: 'ビール{一杯|いっぱい}ぐらいなら、2{時間|じかん}{休|やす}めば{運転|うんてん}してよいです。', text: '"Khoảng một cốc bia thì nghỉ 2 tiếng là lái được."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。「{少|すこ}しなら」はありません。{飲|の}んだら{乗|の}らない、それだけです。', text: '"Không. Không có chuyện "một chút thì được". Đã uống thì không lái, chỉ vậy thôi."' } ] },
          { label: '飲んだあと、コーヒーを飲んで顔を洗えば運転できる', fx: { pressure: 1 }, note: 'Bằng lái: sai — cà phê và rửa mặt chỉ làm tỉnh táo giả, không làm giảm nồng độ cồn; vẫn là lái xe khi có cồn', say: [
            { sp: 'hero', jp: '{飲|の}んだあと、コーヒーを{飲|の}んで{顔|かお}を{洗|あら}えば{運転|うんてん}できます。', text: '"Sau khi uống, uống cà phê và rửa mặt là có thể lái xe."' },
            { sp: 'Cán bộ sát hạch', jp: '{違|ちが}います。コーヒーはアルコールを{消|け}しません。', text: '"Sai. Cà phê không làm cồn biến mất."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: '{住宅街|じゅうたくがい}の{生活道路|せいかつどうろ}に、30キロの{速度制限|そくどせいげん}の{標識|ひょうしき}があります。どう{走|はし}りますか。', text: '"Trên đường dân sinh trong khu dân cư có biển giới hạn tốc độ 30 km/h. Phải chạy thế nào?"' },
      {
        prompt: 'Câu 5/6 — Tốc độ trong khu dân cư?',
        choice: [
          { label: '標識の30キロ以下で、歩行者に注意しながら安全な速度で走る', fx: { jp: 2 }, note: 'Bằng lái: đúng — tuân thủ giới hạn 30 km/h theo biển báo và giữ tốc độ an toàn, chú ý người đi bộ trong khu dân cư', say: [
            { sp: 'hero', jp: '{標識|ひょうしき}の30キロ{以下|いか}で、{歩行者|ほこうしゃ}に{注意|ちゅうい}しながら{安全|あんぜん}な{速度|そくど}で{走|はし}ります。', text: '"Chạy dưới 30 km/h theo biển báo, chú ý người đi bộ và giữ tốc độ an toàn."' },
            { sp: 'Cán bộ sát hạch', jp: 'その{通|とお}りです。{住宅街|じゅうたくがい}では、{子|こ}どもが{急|きゅう}に{出|で}てくることもあります。', text: '"Chính xác. Trong khu dân cư, trẻ con có thể bất ngờ chạy ra."' } ] },
          { label: '制限は目安なので、流れに合わせて50キロで走ってよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — biển giới hạn tốc độ là quy định bắt buộc, không phải "mục tiêu tham khảo"; chạy 50 ở khu 30 là vượt tốc độ', say: [
            { sp: 'hero', jp: '{制限|せいげん}は{目安|めやす}なので、{流|なが}れに{合|あ}わせて50キロで{走|はし}ってよいです。', text: '"Giới hạn chỉ là tham khảo, nên chạy theo dòng xe ở 50 km/h cũng được."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。{標識|ひょうしき}の{制限|せいげん}は{守|まも}らなければなりません。', text: '"Không. Giới hạn trên biển báo là phải tuân thủ."' } ] },
          { label: '昼間なら60キロまで出してよいが、夜は30キロに落とす', fx: { pressure: 1 }, note: 'Bằng lái: sai — giới hạn theo biển áp dụng cả ngày lẫn đêm; không có quy tắc "ban ngày 60" trong khu dân cư có biển 30', say: [
            { sp: 'hero', jp: '{昼間|ひるま}なら60キロまで{出|だ}してよいですが、{夜|よる}は30キロに{落|お}とします。', text: '"Ban ngày chạy tới 60 cũng được, ban đêm thì giảm xuống 30."' },
            { sp: 'Cán bộ sát hạch', jp: '{違|ちが}います。{制限|せいげん}は{昼|ひる}も{夜|よる}も{同|おな}じです。', text: '"Sai. Giới hạn áp dụng như nhau cả ngày lẫn đêm."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: '{運転中|うんてんちゅう}の{携帯電話|けいたいでんわ}について、{正|ただ}しいものを{選|えら}んでください。', text: '"Hãy chọn câu đúng về điện thoại di động khi đang lái xe."' },
      {
        prompt: 'Câu 6/6 — Dùng điện thoại khi lái xe?',
        choice: [
          { label: '運転中は携帯電話を手に持って使ってはならず、必要なときは安全な場所に止めてから使う', fx: { jp: 2 }, note: 'Bằng lái: đúng — cấm cầm điện thoại khi lái (kể cả nhìn màn hình); cần dùng thì dừng xe ở nơi an toàn trước', say: [
            { sp: 'hero', jp: '{運転中|うんてんちゅう}は{携帯電話|けいたいでんわ}を{手|て}に{持|も}って{使|つか}ってはならず、{必要|ひつよう}なときは{安全|あんぜん}な{場所|ばしょ}に{止|と}めてから{使|つか}います。', text: '"Khi đang lái xe không được cầm điện thoại sử dụng; khi cần dùng thì dừng xe ở nơi an toàn rồi mới dùng."' },
            { sp: 'Cán bộ sát hạch', jp: 'はい。{画面|がめん}を{見|み}るだけでも{危険|きけん}です。それが{正解|せいかい}です。', text: '"Đúng. Chỉ nhìn màn hình thôi cũng nguy hiểm. Đó là đáp án đúng."' } ] },
          { label: '信号で止まっている間なら、手に持って画面を見てもよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — dừng chờ đèn đỏ vẫn đang trong quá trình lái xe; cầm điện thoại nhìn màn hình lúc này vẫn bị cấm', say: [
            { sp: 'hero', jp: '{信号|しんごう}で{止|と}まっている{間|あいだ}なら、{手|て}に{持|も}って{画面|がめん}を{見|み}てもよいです。', text: '"Trong lúc dừng chờ đèn đỏ thì cầm điện thoại nhìn màn hình cũng được."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。{信号待|しんごうま}ちも{運転|うんてん}のうちです。', text: '"Không. Chờ đèn đỏ cũng vẫn tính là đang lái xe."' } ] },
          { label: 'ナビの画面なら、走りながら5秒ぐらい見てもよい', fx: { pressure: 1 }, note: 'Bằng lái: sai — nhìn chằm chằm vào màn hình dẫn đường khi xe đang chạy cũng bị cấm; 5 giây ở 40 km/h là hơn 50 mét không nhìn đường', say: [
            { sp: 'hero', jp: 'ナビの{画面|がめん}なら、{走|はし}りながら5{秒|びょう}ぐらい{見|み}てもよいです。', text: '"Nếu là màn hình dẫn đường thì vừa chạy vừa nhìn khoảng 5 giây cũng được."' },
            { sp: 'Cán bộ sát hạch', jp: '{違|ちが}います。5{秒|びょう}で{車|くるま}は{何十|なんじゅう}メートルも{進|すす}みます。', text: '"Sai. Trong 5 giây, xe đã đi được mấy chục mét rồi."' } ] }
        ]
      },
      { sp: 'narr', text: 'Câu hỏi cuối cùng khép lại. {name} đặt bút xuống, hai vai thả lỏng một cái mới biết nãy giờ mình đã gồng cứng đến mức nào. Cán bộ sát hạch thu bài, gật đầu nhẹ, không nói một lời nào về kết quả.' },
      { sp: 'Cán bộ sát hạch', jp: 'お{疲|つか}れさまでした。{結果|けっか}は{後|あと}で{発表|はっぴょう}します。{技能試験|ぎのうしけん}の{方|ほう}は、{車両|しゃりょう}の{前|まえ}でお{待|ま}ちください。', text: '"Anh đã vất vả rồi. Kết quả sẽ được thông báo sau. Phần thi thực hành, xin mời ra chờ trước khu vực xe."' }
    ]
  },

  /* ================= C4-LIC-3 — THI THỰC HÀNH: 5 TÌNH HUỐNG =================
     Cùng khuôn note 'Bằng lái: đúng/sai'; kết thúc ở chờ công bố, không tự tuyên đỗ/trượt. */
  'c4-lic-3': {
    scene: '🚙 Thi thực hành — năm tình huống trên sân',
    branch: [
      { sp: 'narr', text: 'Sân thi thực hành nắng chang chang. Chiếc xe thi nhỏ, sạch, vô lăng nằm bên phải như mọi chiếc xe ở nước này. Cán bộ sát hạch ngồi vào ghế phụ với tập hồ sơ trên tay — từ lúc {name} mở cửa xe, bài thi thực ra đã bắt đầu rồi.' },
      { sp: 'Cán bộ sát hạch', jp: 'では、{始|はじ}めます。まず、{発進|はっしん}の{準備|じゅんび}をしてください。', text: '"Vậy bắt đầu nhé. Trước hết, hãy chuẩn bị khởi hành."' },
      { sp: 'hero', jp: 'はい。シートとミラーを{合|あ}わせて、シートベルトを{締|し}めます。', text: '"Vâng. Tôi chỉnh ghế và gương, rồi thắt dây an toàn ạ."' },
      {
        prompt: 'Tình huống 1/5 — Chuẩn bị khởi hành: trình tự đúng là gì?',
        choice: [
          { label: 'Ghế – gương – dây an toàn – quan sát quanh xe rồi mới nổ máy ra tín hiệu', fx: { jp: 2 }, note: 'Bằng lái: đúng — chỉnh ghế, gương, thắt dây, kiểm tra an toàn quanh xe trước khi khởi hành', say: [
            { sp: 'hero', jp: 'シート、ミラー、シートベルトを{確認|かくにん}しました。{周|まわ}りの{安全|あんぜん}を{見|み}てから、{発進|はっしん}します。', text: '"Đã xác nhận ghế, gương, dây an toàn. Tôi nhìn kiểm tra an toàn xung quanh rồi mới khởi hành." — nói thành tiếng từng bước, tay làm theo đúng thứ tự đã tập cả trăm lần.' },
            { sp: 'Cán bộ sát hạch', jp: '{順番|じゅんばん}が{正確|せいかく}ですね。{落|お}ち{着|つ}いています。', text: '"Thứ tự rất chính xác. Anh khá bình tĩnh đấy." — câu khen ngắn ngủi mà nghe như được cộng cả một bầu trời.' } ] },
          { label: 'Nổ máy trước cho ấm xe, vừa đi vừa chỉnh gương sau', fx: { pressure: 1 }, note: 'Bằng lái: sai — chỉnh gương khi xe đang chạy là mất tập trung; mọi khâu chuẩn bị phải xong trước khi xe lăn bánh', say: [
            { sp: 'hero', jp: 'エンジンをかけて、{走|はし}りながらミラーを{合|あ}わせます。', text: '"Tôi nổ máy rồi vừa chạy vừa chỉnh gương."' },
            { sp: 'Cán bộ sát hạch', jp: '{止|と}まってください。{準備|じゅんび}は{走|はし}る{前|まえ}に{終|お}わらせるものです。', text: '"Dừng xe lại. Chuẩn bị là việc phải xong trước khi xe chạy."' } ] },
          { label: 'Thắt dây sau cũng được, ưu tiên khởi hành nhanh cho kịp nhịp sân thi', fx: { pressure: 1 }, note: 'Bằng lái: sai — không thắt dây an toàn là lỗi nặng ngay từ đầu; thi thực hành không chấm "nhanh"', say: [
            { sp: 'hero', jp: 'シートベルトは{後|あと}で{締|し}めます。まず{早|はや}く{発進|はっしん}します。', text: '"Dây an toàn tôi thắt sau. Trước tiên khởi hành nhanh đã."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。シートベルトなしの{発進|はっしん}は、それだけで{大|おお}きな{減点|げんてん}です。', text: '"Không. Khởi hành mà không thắt dây an toàn, chỉ riêng điều đó đã bị trừ điểm rất nặng."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: 'その{交差点|こうさてん}を{右折|うせつ}してください。{歩行者|ほこうしゃ}がいます。', text: '"Hãy rẽ phải ở ngã tư đó. Có người đi bộ đấy."' },
      {
        prompt: 'Tình huống 2/5 — Rẽ phải có người đi bộ đang qua đường?',
        choice: [
          { label: 'Dừng trước vạch, chờ người đi bộ qua hẳn, quan sát lại rồi mới rẽ', fx: { jp: 2 }, note: 'Bằng lái: đúng — khi rẽ phải phải nhường tuyệt đối cho người đi bộ trên vạch sang đường, chờ qua hẳn mới đi', say: [
            { sp: 'hero', jp: '{歩行者|ほこうしゃ}が{渡|わた}り{終|お}わるまで{止|と}まります。{渡|わた}ったあと、もう{一度|いちど}{確認|かくにん}してから{曲|ま}がります。', text: '"Tôi dừng lại cho tới khi người đi bộ qua xong. Sau khi họ qua, tôi xác nhận lại một lần nữa rồi mới rẽ."' },
            { sp: 'Cán bộ sát hạch', jp: 'はい。{右折|うせつ}のときこそ、{歩行者|ほこうしゃ}を{見落|みお}としやすいですからね。', text: '"Đúng. Chính lúc rẽ phải là lúc dễ bỏ sót người đi bộ nhất đấy."' } ] },
          { label: 'Lách qua phía sau người đi bộ thật sát để không phải dừng', fx: { pressure: 1 }, note: 'Bằng lái: sai — đi sát sau lưng người đi bộ là hành vi nguy hiểm và bị trừ điểm nặng; phải dừng chờ, không được lách', say: [
            { sp: 'hero', jp: '{歩行者|ほこうしゃ}の{後|うし}ろを、{近|ちか}く{通|とお}って{曲|ま}がります。', text: '"Tôi vòng qua sát phía sau người đi bộ để rẽ mà không cần dừng."' },
            { sp: 'Cán bộ sát hạch', jp: '{危険|きけん}です。{歩行者|ほこうしゃ}の{近|ちか}くを{通|とお}る{運転|うんてん}は{認|みと}められません。', text: '"Nguy hiểm. Cách lái đi sát người đi bộ như vậy là không được chấp nhận."' } ] },
          { label: 'Bấm còi nhẹ để người đi bộ đi nhanh hơn rồi rẽ theo', fx: { pressure: 1 }, note: 'Bằng lái: sai — còi không dùng để giục người đi bộ; quyền ưu tiên ở vạch sang đường thuộc về họ, xe phải chờ', say: [
            { sp: 'hero', jp: 'クラクションを{軽|かる}く{鳴|な}らして、{歩行者|ほこうしゃ}に{早|はや}く{渡|わた}ってもらいます。', text: '"Tôi bấm còi nhẹ để người đi bộ qua nhanh hơn rồi rẽ theo."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。クラクションは{歩行者|ほこうしゃ}を{急|いそ}がせるためのものではありません。', text: '"Không. Còi xe không phải để giục người đi bộ đi nhanh."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: 'では、あの{枠|わく}にバックで{入|い}れてください。', text: '"Vậy hãy lùi xe vào ô kia."' },
      {
        prompt: 'Tình huống 3/5 — Lùi xe vào chuồng?',
        choice: [
          { label: 'Đi chậm tối thiểu, liên tục nhìn gương và quay đầu kiểm tra điểm mù phía sau', fx: { jp: 2 }, note: 'Bằng lái: đúng — lùi xe phải thật chậm, dùng cả gương lẫn quay đầu trực tiếp để xóa điểm mù phía sau', say: [
            { sp: 'hero', jp: '{速度|そくど}を{落|お}として、ミラーと{目視|もくし}で{後|うし}ろを{確認|かくにん}しながら{下|さ}がります。', text: '"Tôi giảm tốc độ xuống thật thấp, vừa nhìn gương vừa quay đầu nhìn trực tiếp phía sau trong lúc lùi."' },
            { sp: 'Cán bộ sát hạch', jp: '{目視|もくし}ができていますね。ミラーだけに{頼|たよ}らないのが{大事|だいじ}です。', text: '"Anh có quay đầu nhìn trực tiếp, tốt. Không chỉ dựa vào gương là điều quan trọng."' } ] },
          { label: 'Chỉ nhìn camera lùi trên màn hình cho nhanh và chính xác', fx: { pressure: 1 }, note: 'Bằng lái: sai — chỉ nhìn màn hình/camera là bỏ qua kiểm tra trực tiếp; trong thi và ngoài đời đều phải xác nhận bằng mắt thật', say: [
            { sp: 'hero', jp: '{画面|がめん}のカメラだけ{見|み}て{下|さ}がります。', text: '"Tôi chỉ nhìn camera trên màn hình để lùi."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。カメラは{補助|ほじょ}です。{自分|じぶん}の{目|め}で{確認|かくにん}してください。', text: '"Không. Camera chỉ là hỗ trợ. Hãy xác nhận bằng chính mắt mình."' } ] },
          { label: 'Lùi một mạch thật nhanh vào ô để khỏi phải chỉnh nhiều lần', fx: { pressure: 1 }, note: 'Bằng lái: sai — lùi nhanh là mất kiểm soát và dễ va chạm; chỉnh lại nhiều lần không bị trừ điểm bằng lái ẩu', say: [
            { sp: 'hero', jp: '{早|はや}く{一回|いっかい}で{下|さ}がって{入|い}れます。', text: '"Tôi lùi nhanh một mạch vào ô luôn."' },
            { sp: 'Cán bộ sát hạch', jp: '{慌|あわ}てる{運転|うんてん}が{一番危|いちばんあぶ}ないんですよ。', text: '"Cách lái vội vàng là nguy hiểm nhất đấy."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: 'このまま{直進|ちょくしん}してください。…{信号|しんごう}、{黄色|きいろ}に{変|か}わりましたよ。', text: '"Cứ đi thẳng tiếp. …Đèn tín hiệu vừa chuyển sang vàng đấy."' },
      {
        prompt: 'Tình huống 4/5 — Đèn vừa chuyển vàng khi xe đang tới gần?',
        choice: [
          { label: 'Nếu dừng an toàn được thì dừng trước vạch; chỉ đi tiếp khi phanh gấp sẽ gây nguy hiểm', fx: { jp: 2 }, note: 'Bằng lái: đúng — đèn vàng là phải dừng trước vạch dừng nếu dừng được an toàn; ngoại lệ duy nhất là khi dừng gấp gây nguy hiểm', say: [
            { sp: 'hero', jp: '{安全|あんぜん}に{止|と}まれるので、{停止線|ていしせん}の{手前|てまえ}で{止|と}まります。', text: '"Vì dừng lại an toàn được, tôi dừng trước vạch dừng." — chân rời ga, rà phanh từ sớm, xe dừng êm trước vạch, không một cú giật.' },
            { sp: 'Cán bộ sát hạch', jp: 'はい、その{判断|はんだん}です。{黄色|きいろ}は「{止|と}まれ」の{始|はじ}まりです。', text: '"Đúng, phán đoán như vậy đấy. Đèn vàng là khởi đầu của "dừng lại"."' } ] },
          { label: 'Tăng tốc vượt qua trước khi đèn kịp đỏ', fx: { pressure: 1 }, note: 'Bằng lái: sai — tăng tốc ở đèn vàng là hành vi vượt đèn điển hình, nguy cơ tai nạn cao nhất ở ngã tư', say: [
            { sp: 'hero', jp: 'アクセルを{踏|ふ}んで、{赤|あか}くなる{前|まえ}に{通|とお}ります。', text: '"Tôi đạp ga vượt qua trước khi đèn chuyển đỏ."' },
            { sp: 'Cán bộ sát hạch', jp: 'それは{一番|いちばん}やってはいけない{判断|はんだん}です。', text: '"Đó là phán đoán tuyệt đối không được làm." — lần này giọng cán bộ cứng hẳn lại.' } ] },
          { label: 'Phanh gấp ngay lập tức bất kể xe phía sau đang bám sát', fx: { pressure: 1 }, note: 'Bằng lái: sai — phanh gấp không xét tình huống có thể gây tai nạn từ phía sau; luật cho phép đi tiếp khi không thể dừng an toàn', say: [
            { sp: 'hero', jp: '{後|うし}ろの{車|くるま}が{近|ちか}くても、{急|きゅう}ブレーキで{止|と}まります。', text: '"Dù xe sau đang bám sát, tôi vẫn phanh gấp để dừng."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。{止|と}まれない{場合|ばあい}は、{安全|あんぜん}に{進|すす}む{判断|はんだん}も{必要|ひつよう}です。', text: '"Không. Trường hợp không dừng được thì phán đoán đi tiếp an toàn cũng cần thiết."' } ] }
        ]
      },
      { sp: 'Cán bộ sát hạch', jp: '{最後|さいご}に、あの{車|くるま}の{後|うし}ろに{縦列駐車|じゅうれつちゅうしゃ}をしてください。', text: '"Cuối cùng, hãy đỗ xe song song phía sau chiếc xe kia."' },
      {
        prompt: 'Tình huống 5/5 — Đỗ xe song song?',
        choice: [
          { label: 'Bật xi-nhan, căn ngang xe phía trước, lùi chậm và chỉnh vô lăng theo từng nhịp', fx: { jp: 2 }, note: 'Bằng lái: đúng — đỗ song song đúng trình tự: tín hiệu, căn vị trí, lùi chậm có kiểm soát, giữ khoảng cách an toàn', say: [
            { sp: 'hero', jp: 'ウインカーを{出|だ}して、{前|まえ}の{車|くるま}と{並|なら}んでから、ゆっくり{下|さ}がります。', text: '"Tôi bật xi-nhan, dừng ngang với xe phía trước rồi mới từ từ lùi vào." — từng nhịp vô lăng chậm rãi, mắt không rời gương và khoảng cách với lề đường.' },
            { sp: 'Cán bộ sát hạch', jp: '{落|お}ち{着|つ}いた{操作|そうさ}でした。{距離|きょり}も{適切|てきせつ}です。', text: '"Thao tác rất bình tĩnh. Khoảng cách cũng vừa phải."' } ] },
          { label: 'Đánh lái mạnh một lần, đưa xe vào ô theo cảm giác cho gọn', fx: { pressure: 1 }, note: 'Bằng lái: sai — đỗ theo "cảm giác" không kiểm soát khoảng cách dễ leo lề hoặc va xe khác; phải làm theo trình tự chậm rãi', say: [
            { sp: 'hero', jp: 'ハンドルを{大|おお}きく{切|き}って、{感覚|かんかく}で{入|い}れます。', text: '"Tôi đánh lái mạnh một lần, đưa xe vào theo cảm giác cho gọn."' },
            { sp: 'Cán bộ sát hạch', jp: '「{感覚|かんかく}」では{合格|ごうかく}できません。{確認|かくにん}しながら{操作|そうさ}してください。', text: '"Làm theo "cảm giác" thì không thể đỗ được. Hãy thao tác trong lúc xác nhận cẩn thận."' } ] },
          { label: 'Đỗ chéo đầu vào một nửa, chừa đuôi xe lấn ra làn đường cho dễ ra', fx: { pressure: 1 }, note: 'Bằng lái: sai — đuôi xe lấn ra làn đường là đỗ xe gây cản trở giao thông, không được tính là hoàn thành bài đỗ song song', say: [
            { sp: 'hero', jp: '{半分|はんぶん}だけ{入|い}れて、{後|うし}ろは{道路|どうろ}に{出|だ}しておきます。', text: '"Tôi đưa xe vào một nửa thôi, phần đuôi chừa ra đường cho dễ ra."' },
            { sp: 'Cán bộ sát hạch', jp: 'いいえ。それは{駐車|ちゅうしゃ}が{終|お}わったことに なりません。', text: '"Không. Như thế không được tính là đã đỗ xe xong."' } ] }
        ]
      },
      { sp: 'narr', text: 'Xe về lại điểm xuất phát. Cán bộ sát hạch không nói đỗ, không nói trượt — ông chỉ cúi xuống tập hồ sơ, cây bút chạy nhanh trên giấy, ghi chép từng mục một cách lặng lẽ. Tiếng bút ấy, lúc này, nghe còn nặng hơn cả tiếng động cơ.' },
      { sp: 'Cán bộ sát hạch', jp: 'お{疲|つか}れさまでした。{結果|けっか}は、このあと{名前|なまえ}を{呼|よ}んで{発表|はっぴょう}します。{待合室|まちあいしつ}でお{待|ま}ちください。', text: '"Anh đã vất vả rồi. Kết quả sẽ được công bố ngay sau đây bằng cách gọi tên. Xin mời về phòng chờ đợi."' },
      { sp: 'narr', text: '{name} bước xuống xe, hai đầu gối hơi run — không phải vì mệt, mà vì mọi thứ vừa dồn vào mười lăm phút. Trong phòng chờ, những người thi cùng ngồi im lặng như nhau, mắt thỉnh thoảng lại liếc về phía cánh cửa nơi cái tên tiếp theo sẽ được gọi. Bài thi đã xong. Phần còn lại nằm trong tập hồ sơ của người đàn ông cầm bút kia.' }
    ]
  },

  /* ================= C4-LIC-DONE — NHẬN BẰNG (CẢNH NGẮN) ================= */
  'c4-lic-done': {
    scene: '🪪 Ngày nhận bằng — tấm thẻ của tự do',
    branch: [
      { sp: 'narr', text: 'Phòng chờ lặng đi khi loa gọi đến tên của {name}. Mọi thứ sau đó diễn ra rất nhanh và rất chậm cùng một lúc: đứng dậy, đi theo hàng, ký nhận — và rồi tấm bằng lái mới, còn thơm mùi in, nằm gọn trong hai bàn tay đang cố không run.' },
      { sp: 'Cán bộ sát hạch', jp: 'おめでとうございます。こちらがあなたの{免許証|めんきょしょう}です。{大切|たいせつ}にしてください。', text: '"Chúc mừng anh. Đây là bằng lái của anh. Hãy giữ gìn cẩn thận."' },
      { sp: 'hero', jp: 'ありがとうございます。{一生懸命|いっしょうけんめい}{勉強|べんきょう}してよかったです。', text: '"Cảm ơn thầy rất nhiều. Thật tốt vì tôi đã học hành chăm chỉ." — {name} cúi đầu sâu, sâu hơn mức cần thiết, vì trong cái cúi đầu ấy có cả mấy tháng trời ôn luyện.' },
      { sp: 'Cán bộ sát hạch', jp: 'あと、{初心者|しょしんしゃ}マークを{忘|わす}れないでください。{免許|めんきょ}を{取|と}ってから1{年間|ねんかん}、{車|くるま}の{前|まえ}と{後|うし}ろに{付|つ}ける{義務|ぎむ}があります。', text: '"À, đừng quên tem người mới lái nhé. Trong vòng 1 năm kể từ ngày lấy bằng, anh có nghĩa vụ dán tem ở phía trước và phía sau xe."' },
      { sp: 'hero', jp: 'はい、1{年間|ねんかん}ですね。{帰|かえ}りに{買|か}って{帰|かえ}ります。', text: '"Vâng, 1 năm phải không ạ. Trên đường về tôi sẽ mua luôn." — tem hình chiếc lá non màu vàng xanh: ở Nhật, đến cả sự non nớt cũng được dán nhãn tử tế để người khác nhường đường cho mình.' },
      { sp: 'narr', text: 'Ra khỏi trung tâm, {name} đứng dưới nắng, mở ví ngắm tấm bằng thêm lần nữa. Ảnh chân dung chụp hôm đăng ký trông nghiêm nghị đến buồn cười. Góc thẻ ghi ngày cấp — ngày hôm nay, một dấu mốc nhỏ mà chắc chắn: từ đây, bản đồ nước Nhật trong đầu mình không còn bị cắt bởi các tuyến tàu nữa.' },
      { sp: 'hero', text: 'Điện thoại gọi về nhà. Chuông đổ hai hồi, giọng mẹ vang lên đầy lo lắng theo thói quen: "Alo, con à, có chuyện gì không con?" — "Không có chuyện gì đâu mẹ. Con chỉ gọi để khoe: con đỗ bằng lái xe ở Nhật rồi."' },
      { sp: 'Mẹ', text: '"Trời đất ơi, thật không con? Đỗ rồi à? …Bố mày ơi, nó đỗ bằng lái bên Nhật rồi này! Lái xe cẩn thận nghe con, bên đó người ta đi ngược tay với mình đấy. Có bằng rồi thì đi đâu cũng phải nhớ: nhanh một phút không bằng an toàn cả đời."' },
      { sp: 'hero', text: '"Dạ, con nhớ rồi mẹ." — cúp máy, {name} cười một mình giữa sân trung tâm sát hạch. Tự do hóa ra có hình dạng rất cụ thể: một tấm thẻ nhỏ trong ví, một chiếc tem lá non chưa mua, và cả một vùng đất rộng đang mở ra phía trước — từ nay, mình đi xa được rồi.' }
    ]
  },

  /* ================= C4-BAR — XẢ STRESS: BAR & KARAOKE ================= */
  'c4-bar': {
    scene: '🎤 Xả stress — bar, sàn nhảy và karaoke',
    branch: [
      { sp: 'narr', text: 'Cuối tháng, sau chuỗi ngày tăng ca và vật giá leo thang, Hùng tuyên bố trong nhóm chat ký túc: "Tối nay xả. Không bàn chuyện tiền, không bàn chuyện về hay ở. Đứa nào nhắc tới công việc, đứa đó trả tiền nước." Ba người có mặt ở quán bar nhỏ gần ga lúc tám giờ tối.' },
      { sp: 'Hùng', jp: '{今日|きょう}は{仕事|しごと}の{話|はなし}なし！{飲|の}んで、{踊|おど}って、{忘|わす}れる{日|ひ}だ！', text: '"Hôm nay cấm nói chuyện công việc! Hôm nay là ngày uống, nhảy và quên hết!"' },
      { sp: 'Long', jp: 'お{前|まえ}が{一番|いちばん}、{仕事|しごと}の{話|はなし}しそうだけどな。まあいい、{乾杯|かんぱい}！', text: '"Mày là đứa dễ nhắc chuyện công việc nhất đấy. Thôi kệ, cạn ly!"' },
      { sp: 'hero', jp: '{乾杯|かんぱい}！…この{店|みせ}、{音楽|おんがく}{大|おお}きすぎない？{耳|みみ}が{痛|いた}い。', text: '"Cạn ly! …Quán này nhạc to quá không? Tao đau tai rồi đấy."' },
      { sp: 'Long', jp: '{若|わか}いのにジジくさいこと{言|い}うなよ。ほら、{踊|おど}りに{行|い}こうぜ。{下手|へた}でもいいんだよ、{誰|だれ}も{見|み}てない。', text: '"Trẻ mà nói như ông già. Nào, ra nhảy đi. Nhảy dở cũng được, có ai nhìn đâu." — Long kéo cả hai ra góc sàn nhảy nhỏ, nơi ánh đèn quay và chẳng ai quan tâm hai chân của ai đi về hướng nào.' },
      { sp: 'narr', text: 'Và đúng là không ai nhìn thật. {name} nhảy những bước chẳng theo nhịp nào, Hùng nhảy như đang khuấy một nồi lẩu khổng lồ, Long thì nghiêm túc quá mức cần thiết. Ba người cười đến chảy nước mắt giữa sàn — tiếng cười của những kẻ ban ngày phải cúi đầu đúng mực trong một đất nước không phải của mình.' },
      { sp: 'Hùng', jp: 'よし、{次|つぎ}はカラオケだ。{俺|おれ}の{番|ばん}が{来|き}たら、{全員|ぜんいん}{立|た}てよ。', text: '"Được, tiếp theo là karaoke. Tới lượt tao hát thì tất cả đứng dậy hết đấy."' },
      { sp: 'narr', text: 'Phòng karaoke nhỏ, màn hình lớn, điều khiển bọc nilon. Long chọn bài trước, hát như thi chung kết toàn quốc. Hùng ôm mic gào một bản nhạc trẻ bằng chất giọng chỉ hợp để gọi món trong quán nhậu. Tới lượt chọn mức chơi của đêm nay, cả nhóm nhìn {name}: đêm còn dài, mà ngày mai vẫn là một ngày làm việc.' },
      {
        prompt: 'Đêm xả stress đi tới đâu là vừa?',
        choice: [
          { label: 'Chơi vừa đủ — hát cho đã, về sớm ngủ ngon', fx: { love: 3, money: -0.8 }, note: 'Xả stress C4: chơi vừa đủ, giữ sức cho ngày mai', say: [
            { sp: 'hero', jp: '{今日|きょう}はここまでで{楽|たの}しもう。{最後|さいご}に{皆|みんな}で{一曲|いっきょく}、{大|おお}きな{声|こえ}で{歌|うた}おう！', text: '"Hôm nay chơi vừa tới đây là vui rồi. Cuối cùng cả nhóm hát chung một bài, hát thật to nào!"' },
            { sp: 'narr', text: 'Bài hát chung được chọn là một bản ballad cũ mà cả ba đều thuộc nằm lòng từ những đêm ký túc đầu tiên — bài hát về tuổi trẻ đi xa nhà. Long ôm vai Hùng, Hùng ôm vai {name}, ba cái đầu chụm vào một chiếc mic, hát sai nửa số nốt và đúng một trăm phần trăm số cảm xúc.' },
            { sp: 'Long', jp: '{下手|へた}だけど、{最高|さいこう}だな、この{感|かん}じ。', text: '"Hát dở thật, nhưng cái cảm giác này thì đỉnh nhất." — Long hát lạc giọng ở điệp khúc cuối, và chẳng ai buồn sửa, vì cả phòng đang hát bằng một giọng chung.' },
            { sp: 'narr', text: 'Bà chủ quán mở hé cửa, tưởng có chuyện — rồi mỉm cười đóng lại. Khách ở phòng bên vỗ tay theo qua vách tường. Ba người hát đến câu cuối, cùng giơ tay lên trời như vừa vô địch một giải đấu chỉ có ba đội, mà cả ba đội đều thắng.' },
            { sp: 'Hùng', jp: '{写真|しゃしん}{撮|と}ろう。{三年後|さんねんご}に{見|み}たら、{絶対|ぜったい}{笑|わら}うやつだ。', text: '"Chụp tấm ảnh đi. Ba năm nữa xem lại, chắc chắn cười bò." — bức ảnh ra đời: ba gương mặt đỏ bừng vì vui, một chiếc mic giơ giữa khung hình, và phía sau là màn hình karaoke còn chạy dòng chữ điểm số 62 đầy vô tội.' },
            { sp: 'hero', text: 'Về tới ký túc lúc mười một giờ, người nhẹ như vừa trút được một bao cát khỏi vai. Hóa ra xả stress đúng cách không phải là quên hết — là nhớ lại rằng mình còn biết vui, rồi ngủ một giấc tử tế để mai còn sức mà đi tiếp.' } ] },
          { label: 'Chơi tới bến — đêm nay không biết ngày mai', fx: { money: -1.8, hp: -6, pressure: 2 }, note: 'Xả stress C4: chơi tới bến, sáng hôm sau kiệt sức đi làm', say: [
            { sp: 'hero', jp: 'まだ{早|はや}い！{今日|きょう}はとことん{行|い}こう。{次|つぎ}の{店|みせ}！', text: '"Còn sớm chán! Hôm nay chơi tới bến đi. Sang quán tiếp theo!"' },
            { sp: 'narr', text: 'Quán tiếp theo, rồi một vòng karaoke nữa tới gần hai giờ sáng. Hùng hát lại bài cũ đến lần thứ ba. Long ngủ gật giữa một bản nhạc sôi động rồi giật mình hát tiếp câu của bài khác. Ví mỏng đi nhanh hơn cảm giác buồn nhiều.' },
            { sp: 'Long', jp: '{明日|あした}の{俺|おれ}たち、{絶対|ぜったい}{後悔|こうかい}するな…まあ、{明日|あした}のことは{明日|あした}の{俺|おれ}に{任|まか}せよう。', text: '"Ngày mai tụi mình chắc chắn hối hận… thôi, chuyện ngày mai để thằng mình của ngày mai lo."' },
            { sp: 'narr', text: 'Sáng hôm sau, {name} bước vào chỗ làm như một cái xác biết đi: mắt không mở hẳn, lưng như đeo đá, câu chào buổi sáng nói ra bằng nửa cái hồn. Đồng hồ chỉ mới tám giờ mà cảm giác như đã làm được nửa ca.' },
            { sp: 'Trưởng ca chỗ làm', jp: '{顔色|かおいろ}が{悪|わる}いですよ。{遊|あそ}ぶのは{自由|じゆう}ですが、{仕事|しごと}に{出|で}るなら、{体調|たいちょう}は{自分|じぶん}で{管理|かんり}してください。', text: '"Sắc mặt cậu tệ lắm đấy. Chơi bời là tự do của cậu, nhưng đã đi làm thì tự quản lý sức khỏe của mình đi." — câu nhắc không nặng, mà thấm: cái giá của một đêm tới bến được trả bằng cả một ngày hôm sau.' },
            { sp: 'hero', text: 'Ngồi nghỉ trưa với hộp cơm nguội, {name} tự ghi vào sổ một dòng: vui có điểm dừng mới là vui của người lớn. Đêm qua vui thật — nhưng một phần của niềm vui đó là vay mượn của ngày hôm nay, và vay thì luôn có lãi.' } ] }
        ]
      },
      { sp: 'narr', text: 'Dù đêm ấy kết thúc ở mấy giờ, sáng thứ hai cả nhóm vẫn gặp nhau ở hành lang ký túc, mỗi người một kiểu mệt khác nhau. Hùng huýt sáo đi qua, phán một câu kết sổ: "Xả là để nạp lại mà sống tiếp — đứa nào xả xong thấy đời nặng hơn thì lần sau xả kiểu khác." Cả nhóm cười, và không ai phản đối.' }
    ]
  },

  /* ================= C4-HOMESICK — NHỚ NHÀ LẦN 3: CÔNG VIÊN HOA ANH ĐÀO ================= */
  'c4-homesick': {
    scene: '🌸 Nhớ nhà lần ba — công viên hoa anh đào',
    branch: [
      { sp: 'narr', text: 'Tháng tư, công viên gần ký túc vào mùa hoa anh đào nở rộ nhất. Các gia đình trải bạt xanh dưới tán hoa, trẻ con chạy giữa những cánh hoa rơi, mùi đồ nướng thơm từ góc này sang góc khác. Giữa một bức tranh đẹp như bưu thiếp ấy, {name} ngồi một mình trên ghế đá, lon trà nguội dần trong tay.' },
      { sp: 'hero', jp: '{桜|さくら}は{今年|ことし}も{同|おな}じように{咲|さ}いたのに、{見|み}ている{俺|おれ}だけ{変|か}わったな。', text: '"Hoa anh đào năm nay vẫn nở như mọi năm, chỉ có người ngắm hoa là mình đã khác đi rồi." — lần nhớ nhà thứ nhất là những ngày đầu, khóc vì lạ lẫm. Lần thứ hai là mùa đông, khóc vì cô đơn. Lần thứ ba này không có nước mắt; chỉ có một câu hỏi ngồi yên trong ngực, nặng và tĩnh.' },
      { sp: 'narr', text: 'Một cánh hoa rơi xuống đậu trên màn hình điện thoại, đúng lúc {name} đang lướt qua tấm ảnh cả nhà chụp Tết năm ngoái gửi sang: bố ngồi giữa, mẹ đứng sau lưng, mâm cơm đầy và cái ghế của mình được để trống như một lời hẹn. {name} bấm gọi về nhà, không cần lý do.' },
      { sp: 'Mẹ', text: '"Alo, con à? Sao gọi giờ này, bên đó đang ban ngày mà. Con được nghỉ à?" — giọng mẹ lúc nào cũng vậy: câu đầu tiên bao giờ cũng là một câu lo lắng trá hình câu hỏi.' },
      { sp: 'hero', text: '"Con đang ở công viên, hoa anh đào nở đẹp lắm mẹ. Tự nhiên muốn gọi về nghe giọng nhà mình thôi. Ở nhà mình… cây mai trước sân năm nay nở có đúng Tết không mẹ?"' },
      { sp: 'Mẹ', text: '"Nở đúng lắm con. Bố con chụp ảnh gửi cho con rồi đấy, chắc con chưa xem. Bố dạo này khỏe hơn, sáng nào cũng ra vườn. Chỉ có điều hay hỏi: không biết bên đó nó ăn uống có tử tế không." — mẹ cười khẽ, rồi im lặng một nhịp rất quen. "Mẹ hỏi thật câu này: ở bên đó, con có vui không?"' },
      { sp: 'hero', text: 'Câu hỏi đơn giản nhất trên đời, mà {name} không trả lời ngay được. Vui thì có vui. Mệt thì có mệt. Có bằng lái mới, có bạn bè, có một công việc đang thành hình — và có những buổi chiều như buổi chiều này, ngồi giữa mùa hoa đẹp nhất năm của một đất nước xa lạ, thấy mình lạc lõng đến mức chỉ muốn nghe tiếng mẹ hỏi một câu rất đỗi bình thường.' },
      { sp: 'Mẹ', text: '"Không trả lời được cũng không sao. Mẹ chỉ muốn con nhớ một điều: nhà mình không ai cần con phải thành ông nọ bà kia bên đó cả. Con khỏe, con sống tử tế, thỉnh thoảng gọi về — thế là nhà mình đủ rồi. Đừng tự ép mình đến kiệt sức vì ai hết, nghe không."' },
      { sp: 'narr', text: 'Gió thổi qua, cả một trận mưa hoa rơi xuống ghế đá. {name} ngẩng đầu nhìn tán cây hồng rực, và câu hỏi đã ngồi trong ngực bấy lâu nay cuối cùng cũng tự đứng dậy, rõ ràng từng chữ: mình đang sống những năm tháng này — cho ai?' },
      {
        prompt: 'Giữa mùa hoa, {name} trả lời câu hỏi ấy bằng tâm thế nào?',
        choice: [
          { label: 'Gia đình là đích đến — mọi cố gắng đều hướng về nhà', fx: { love: 3 }, note: 'Nhớ nhà C4: tâm thế gia đình là đích đến', say: [
            { sp: 'hero', text: '"Con sống cho nhà mình, mẹ." — câu trả lời bật ra không cần nghĩ lâu. "Mỗi yên con gửi về, mỗi thứ con học được, cuối cùng đều để một ngày con về mà lo được cho bố mẹ tử tế. Ở xa thế này mà quên mất đích đến thì con không chịu nổi một ngày nào đâu."' },
            { sp: 'Mẹ', text: '"Ừ… ừ, mẹ nghe rồi." — đầu dây bên kia im lặng một lúc, rồi là tiếng mẹ cười mà như khóc. "Nhưng nhớ lời mẹ: đích đến là nhà, chứ không phải gánh nặng là nhà. Con phải sống cho con nữa, nghe chưa."' },
            { sp: 'narr', text: 'Cúp máy, {name} ngồi yên thêm một lúc giữa mưa hoa. Câu trả lời không làm nỗi nhớ nhẹ đi — nó làm nỗi nhớ có chỗ để ở. Nhớ nhà, từ nay, không phải là vết nứt; nó là sợi dây, và người ta đi xa được là nhờ biết sợi dây ấy neo mình ở đâu.' } ] },
          { label: 'Trước hết phải thành cái gì đã — cho bản thân mình', fx: { jp: 2, pressure: 1 }, note: 'Nhớ nhà C4: tâm thế phải thành đạt cho bản thân trước', say: [
            { sp: 'hero', text: '"Thật lòng thì… con đang sống cho chính con trước, mẹ. Con muốn thành một người có nghề, có tiếng, đứng được bằng chân mình ở bất cứ đâu. Xong phần đó rồi, con mới lo cho nhà mình được đàng hoàng. Cho con ích kỷ thêm vài năm nữa, mẹ nhé."' },
            { sp: 'Mẹ', text: '"Ích kỷ gì đâu con." — mẹ đáp ngay, nhanh đến bất ngờ. "Con đứng vững thì nhà mình mới có chỗ dựa. Mẹ đẻ con ra không phải để con sống thay đời của mẹ. Cứ đi cho tới nơi, nhà mình chờ được."' },
            { sp: 'narr', text: 'Cúp máy, {name} đứng dậy phủi những cánh hoa trên vai áo. Được chính mẹ cho phép sống cho mình — hóa ra đó lại là động lực mạnh hơn cả sự hy sinh: từ nay mỗi bước đi không chỉ mang theo kỳ vọng, mà mang theo một lời chúc phúc.' } ] },
          { label: 'Chưa trả lời được — và chưa trả lời được cũng là một câu trả lời', fx: { pressure: -1, jp: 1 }, note: 'Nhớ nhà C4: thừa nhận chưa có câu trả lời, sống tiếp và để thời gian trả lời', say: [
            { sp: 'hero', text: '"Mẹ… con chưa trả lời được. Có ngày con nghĩ mình sống cho nhà, có ngày lại thấy mình sống cho cái tôi cứng đầu của con. Chắc phải đi thêm một đoạn nữa con mới biết. Nhưng con hứa: con sẽ không sống lơ lửng mãi. Con sẽ tìm cho ra câu trả lời."' },
            { sp: 'Mẹ', text: '"Ừ, thế cũng được con ạ." — mẹ nói chậm rãi. "Người trẻ mà. Có những câu hỏi cả đời mới trả lời xong. Miễn là đừng thôi hỏi, và đừng thôi gọi về."' },
            { sp: 'narr', text: 'Cúp máy, {name} bước đi dưới hàng anh đào, lòng nhẹ một cách lạ lùng. Chưa có đáp án mà thấy nhẹ — vì lần đầu tiên, câu hỏi được nói ra thành lời thay vì đè nén trong ngực. Một câu hỏi đã được gọi tên thì không còn là bóng ma nữa; nó là một người bạn đồng hành khó tính, đi cùng mình sang chặng đường tiếp theo.' } ] }
        ]
      },
      { sp: 'narr', text: 'Chiều buông, các gia đình cuộn bạt ra về, công viên trả lại sự yên tĩnh cho những hàng cây. {name} đi bộ về ký túc qua con đường phủ đầy cánh hoa, trong đầu là nguyên một mùa xuân của nước Nhật và một mâm cơm ở rất xa. Chương đời ở Nhật bước sang trang mới — với tiền bạc phải tính lại, một người bạn vừa xuống tàu, một tấm bằng trong ví, và một câu hỏi lớn đi theo sau lưng, chờ được trả lời bằng chính những năm tháng sắp tới.' }
    ]
  }

  });
})();
