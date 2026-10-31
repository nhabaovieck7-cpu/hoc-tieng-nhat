// scenes-i.js — Cảnh ĐỜI SỐNG XÃ HỘI + MÙA (giai đoạn 6, lệnh chủ trang 14:03–14:04 JST 31/10/2026):
//  · 'bonenkai' — tiệc tất niên 忘年会 với công ty kaigo (cảnh TRUYỆN bắt buộc của Chương 2:
//    tháng 12, sau lương đầu, trước cuộc gọi Tết — máy truyện nối ở story.js).
//  · 'dong-huong' — họp đồng hương (sự kiện xã hội LẶP ĐƯỢC, lời mời theo nhịp lương).
//  · 'hanami' / 'momiji' — ngắm hoa anh đào (xuân) / lá đỏ (thu) theo hệ mùa (life.js).
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

    'bonenkai': {
      scene: '🍻 忘年会 — tiệc tất niên với công ty (tháng 12)',
      branch: [
        { sp: 'narr', text: 'Giữa tháng 12, trung tâm kaigo 神戸 tổ chức 忘年会 (bōnenkai — tiệc "quên năm cũ") ở quán nhậu 新橋. Sếp Tanaka đã đặt phòng tatami riêng. Công ty trả phần lớn tiền tiệc — người mới như {name} được mời hẳn, không phải góp đồng nào. Vừa vào phòng, cả bàn đã ngồi gần kín: sếp Tanaka ở trong cùng, các senpai ngồi hai bên.' },
        { sp: 'Sếp Tanaka', jp: '今年も一年、お疲れ様でした。今日は無礼講でいきましょう。乾杯！', text: 'Sếp Tanaka nâng ly, nói kính ngữ chuẩn mực: "Một năm qua mọi người đã vất vả rồi. Hôm nay cứ thoải mái không câu nệ nhé. Cạn ly!" — 無礼講 (bureikō) là lệ của tiệc Nhật: trong tiệc thì không phân cấp bậc, nói cười tự nhiên.' },
        {
          prompt: 'Vị trí còn trống: trong cùng cạnh sếp (上座 — ghế danh dự phía xa cửa) và gần cửa ra vào (下座). {name} là người mới, vào sau cùng — ngồi đâu cho phải phép?',
          choice: [
            { label: 'Ngồi 下座 gần cửa — ghế của người mới/người trẻ', fx: { jp: 3 }, note: 'Bōnenkai: chọn đúng ghế 下座 cho người mới', say: [
              { sp: 'narr', text: '{name} lặng lẽ ngồi vào ghế gần cửa nhất. Chị Mai gật đầu khen khẽ: "Đúng rồi đấy. 上座 (kamiza) — chỗ xa cửa, trong cùng — là để dành cho sếp và khách quý. Người mới ngồi 下座 (shimoza) gần cửa, tiện đứng lên rót nước, gọi món phụ mọi người." Văn hoá chỗ ngồi: không ai dạy trên lớp, nhưng ai ở Nhật lâu cũng phải biết.' },
              { sp: 'Chị Mai', text: '"Ở tiệc Nhật, ngồi sai chỗ không ai mắng đâu — nhưng ngồi đúng chỗ thì người ta nhớ mãi là mình tinh ý." — Chị Mai cười, đẩy đĩa edamame về phía {name}.' }
            ] },
            { label: 'Ngồi vào ghế trong cùng cạnh sếp cho thân thiết', fx: { pressure: 2 }, note: 'Bōnenkai: ngồi nhầm 上座', say: [
              { sp: 'narr', text: '{name} vừa ngồi xuống ghế trong cùng, cả bàn bỗng im một nhịp. Chị Mai khẽ kéo tay áo: "Chỗ đó là 上座 — ghế danh dự dành cho sếp đấy, mình ngồi gần cửa thôi." {name} đỏ mặt đứng lên đổi chỗ, may mà sếp Tanaka cười xòa: "Không sao, không sao, năm sau là nhớ nhé!" Bài học đầu tiên của tiệc Nhật đến hơi quê một chút, nhưng nhớ cả đời.' }
            ] }
          ]
        },
        { sp: 'narr', text: 'Món ăn dọn lên đầy bàn: sashimi, yakitori, nồi lẩu nhỏ bốc khói. Bình rượu sake của sếp đã vơi một nửa — theo lệ お酌 (oshaku), người trẻ chủ động cầm bình rót cho cấp trên bằng HAI TAY, và khi được rót thì nâng ly lên đón.' },
        {
          prompt: 'Sếp Tanaka vừa uống cạn ly. {name} làm gì?',
          choice: [
            { label: 'Cầm bình bằng hai tay, rót cho sếp: 「お注ぎしますね」', fx: { jp: 3, love: 2 }, note: 'Bōnenkai: rót rượu お酌 đúng cách cho cấp trên', say: [
              { sp: 'hero', jp: '部長、お注ぎしてもいいですか。', text: '{name} cầm bình sake bằng hai tay, hơi nghiêng người: "Thưa sếp, cho phép em rót thêm cho sếp ạ."' },
              { sp: 'Sếp Tanaka', jp: 'おお、ありがとう。君もよく頑張っているね。今年の新人で一番丁寧だよ。', text: 'Sếp Tanaka nâng ly đón bằng hai tay, gật gù: "Ồ, cảm ơn em. Em cũng làm rất tốt đấy. Trong các bạn mới năm nay, em là người chu đáo nhất." — Một cái rót rượu đúng lúc, đúng cách, đôi khi nói thay cả trăm lời giới thiệu.' }
            ] },
            { label: 'Ngồi ăn phần mình, ai uống kệ ai', fx: { pressure: 1 }, note: 'Bōnenkai: bỏ qua lệ お酌', say: [
              { sp: 'narr', text: '{name} cắm cúi ăn, chẳng để ý ly của ai vơi. Chị Mai lặng lẽ cầm bình rót thay cho cả hai phía, lát sau ghé tai nhắc nhỏ: "Ở tiệc công ty, để ý ly của sếp một chút — rót cho người ta là cách nói cảm ơn không lời đấy." {name} gật đầu, lần sau sẽ khác.' }
            ] }
          ]
        },
        {
          prompt: 'Được rót tới ly thứ ba, đầu {name} đã hơi lâng lâng. Sếp lại giơ bình lên. Từ chối sao cho khéo?',
          choice: [
            { label: 'Che miệng ly nhẹ nhàng: 「すみません、今日はこのぐらいにしておきます」', fx: { jp: 3, hp: 1 }, note: 'Bōnenkai: từ chối rượu khéo bằng kính ngữ', say: [
              { sp: 'hero', jp: 'すみません、今日はこのぐらいにしておきます。ありがとうございます。', text: '{name} khẽ che miệng ly, cười ái ngại: "Xin lỗi sếp, hôm nay em xin dừng ở đây ạ. Cảm ơn sếp nhiều." — Câu 「このぐらいにしておきます」 (xin dừng ở mức này) là mẫu từ chối rượu lịch sự kinh điển: không chê rượu, không phá vui, chỉ nói giới hạn của mình.' },
              { sp: 'Sếp Tanaka', jp: 'そうか、無理はしなくていいよ。お茶に変えようか。', text: 'Sếp gật đầu ngay: "Vậy à, đừng cố quá nhé. Đổi sang trà nhé." — Ở Nhật, từ chối khéo một lần không làm mất lòng ai cả; uống tới say khướt giữa tiệc công ty mới là điều người ta nhớ theo cách không hay.' }
            ] },
            { label: 'Uống cố cho vui nhà vui cửa', fx: { hp: -3, pressure: 2 }, note: 'Bōnenkai: uống cố quá chén', say: [
              { sp: 'narr', text: '{name} nốc cạn ly thứ ba, thứ tư… Mặt đỏ bừng, tiếng cười to dần, đầu óc quay như chong chóng. Chị Mai phải đỡ về tận cửa quán, dúi cho chai nước: "Mai còn ca sáng đấy, về ngủ ngay đi." Vui thì vui thật — nhưng sáng mai cái đầu sẽ nhắc lại từng ly một. Uống chừng mực, từ chối khéo, mới là người lớn ở bàn tiệc.' }
            ] }
          ]
        },
        {
          prompt: 'Tiệc chính tan lúc 9 giờ. Mấy anh chị rủ đi 二次会 (nijikai — tăng hai) hát karaoke 渋谷 ngay gần đó (tăng hai thì chia đều, phần của {name} khoảng 1.000 yên). Đi hay về?',
          choice: [
            { label: 'Đi tăng hai karaoke — hát một bài tiếng Nhật với mọi người', fx: { money: -0.10, love: 3, jp: 2 }, note: 'Bōnenkai: đi 二次会 karaoke với công ty (chia tiền 1.000 yên)', say: [
              { sp: 'narr', text: 'Phòng karaoke nhỏ mà ấm. Tới lượt, {name} run run chọn một bài hát Nhật chậm rãi — phát âm còn vụng, cả phòng vỗ tay theo nhịp, sếp Tanaka còn hát bè câu cuối. Tan tăng hai lúc gần 11 giờ, ai cũng bắt tay chúc nhau 良いお年を (yoi otoshi wo — chúc một năm mới tốt lành). Đêm tất niên đầu tiên ở Nhật khép lại bằng cảm giác: mình không còn là người ngoài ở nơi làm này nữa.' }
            ] },
            { label: 'Chào mọi người về sớm — mai còn ca sáng, giữ sức', fx: { hp: 3 }, note: 'Bōnenkai: về sớm giữ sức', say: [
              { sp: 'hero', jp: 'すみません、明日は朝のシフトなので、今日はこのあたりで失礼します。ありがとうございました。', text: '{name} đứng dậy chào đúng phép: "Xin lỗi mọi người, mai em có ca sáng nên xin phép về trước tại đây ạ. Cảm ơn mọi người nhiều." Cả bàn vẫy tay: "お疲れ様！良いお年を！" Về sớm ở tiệc Nhật hoàn toàn bình thường — chỉ cần chào một câu tử tế, không ai giữ, không ai giận.' }
            ] }
          ]
        }
      ],
      outro: 'Đi bộ về phòng trọ qua những con phố 吉祥寺 lấp lánh đèn cuối năm, {name} thấy lòng mình khác hẳn ngày mới sang: có một nơi làm việc nhớ mặt mình, có những người nâng ly chúc mình năm mới tốt lành. 忘年会 — tiệc quên năm cũ — hoá ra là để nhớ những điều tốt của năm cũ mà bước sang năm mới.'
    },

    'dong-huong': {
      scene: '🇻🇳 Họp đồng hương — BBQ ở công viên 代々木',
      branch: [
        { sp: 'narr', text: 'Tin nhắn của anh Hùng từ tuần trước: "Chủ nhật này hội đồng hương tụ tập nướng BBQ ở công viên 代々木, đông lắm, ra chơi cho đỡ nhớ nhà!" Dưới tán cây, khói thịt nướng bay thơm cả một góc công viên: hơn chục anh chị em người Việt — người làm kaigo, người làm xưởng, có chị còn bế theo em bé. Mỗi người góp 2.000 yên tiền đồ ăn, chia đều, vui như Tết.' },
        {
          prompt: 'Vừa ngồi xuống, mọi người bắt đầu chia sẻ kinh nghiệm sống ở Nhật. {name} chăm chú nghe:',
          choice: [
            { label: 'Nghe chị điều dưỡng chia sẻ cách xin hỗ trợ tiền nhà của phường', fx: { jp: 2, pressure: -3 }, note: 'Đồng hương: nghe được thông tin hỗ trợ tử tế', say: [
              { sp: 'narr', text: 'Chị điều dưỡng kể rành rọt: phường 霞が関 có gói hỗ trợ tiền nhà cho người thu nhập thấp, ra shiyakusho hỏi là được hướng dẫn tận tình — "Nhiều đứa không biết nên bỏ phí, chị nói cho mà nhớ." Anh thợ xưởng 横浜 thì chỉ chỗ mua đồ Việt giá rẻ, cách gửi tiền về nhà phí thấp. Ở xứ người, một buổi BBQ đổi được cả rổ kinh nghiệm sống còn — thứ không trường lớp nào dạy.' }
            ] },
            { label: 'Nghe anh bạn mới quen kể chuyện lương xưởng và ca đêm', fx: { pressure: -2 }, note: 'Đồng hương: nghe chuyện ca đêm ở xưởng', say: [
              { sp: 'narr', text: 'Anh bạn mới quen làm ở nhà máy 名古屋 kể chuyện ca đêm lương cao nhưng người rã rời, khuyên chân thành: "Tiền thì ham thật, nhưng sức khoẻ hỏng là hết. Cứ đường dài mà đi, em ạ." Xung quanh gật gù — ai ở Nhật lâu cũng thuộc nằm lòng bài học đó.' }
            ] }
          ]
        },
        {
          prompt: 'Bia được khui liên tục — hội đồng hương vui là chính, mà lon cứ vơi dần. Anh bạn bên cạnh lại dí thêm một lon nữa vào tay {name}:',
          choice: [
            { label: 'Uống đúng một lon cho vui rồi chuyển sang trà: "Em mai còn ca sớm ạ"', fx: { hp: 1, love: 1 }, note: 'Đồng hương: uống một lon rồi dừng — chừng mực', say: [
              { sp: 'narr', text: '{name} uống hết một lon, cười nói góp vui thêm một lúc rồi chuyển sang trà đá. Không khí chẳng vì thế mà nhạt đi — ở hội này, người ta quý nhau ở chỗ có mặt và biết lắng nghe, không phải ở số lon uống được. Vui mà mai vẫn dậy nổi đi làm: đó mới là nhậu kiểu người lớn.' }
            ] },
            { label: 'Uống tiếp mấy lon cho tới bến — lâu lâu mới có dịp', fx: { hp: -4, pressure: 1 }, note: 'Đồng hương: uống quá chén ở buổi BBQ (say, trừ sức khỏe)', say: [
              { sp: 'narr', text: 'Lon thứ ba, thứ tư… mặt {name} đỏ bừng, tiếng cười to dần, đầu óc quay như chong chóng. Cuối buổi, Hùng phải dìu về tận phòng, dúi cho chai nước: "Mai ca sáng đấy, ngủ ngay đi." Vui thì vui thật — nhưng bia ở Nhật không tha cho ai uống tới bến: sáng mai cái đầu sẽ nhắc lại từng lon một. Chừng mực mới là đường dài.' }
            ] }
          ]
        },
        {
          prompt: 'Cuối buổi, một anh chàng ít nói kéo {name} ra góc riêng, hạ giọng: "Anh có mối làm thêm ngoài giờ, tiền mặt trao tay, không qua giấy tờ gì đâu. Tuần kiếm thêm 3–4 man dễ như chơi. Làm không?"',
          choice: [
            { label: 'Từ chối thẳng, lịch sự: "Em cảm ơn, em không làm việc ngoài giấy tờ đâu ạ"', fx: { jp: 1 }, note: 'Đồng hương: từ chối lời rủ làm chui', say: [
              { sp: 'narr', text: '{name} lắc đầu, cười mà dứt khoát. Anh chàng nhún vai bỏ đi tìm người khác. Anh Hùng vỗ vai {name}: "Đúng đấy. Ở đây ai cũng từng được rủ một lần như thế. Người ta rủ thì dễ, người gánh hậu quả là mình. Giữ cái tư cách lưu trú cho chắc, còn lại từ từ mà làm." Khói BBQ vẫn thơm, tiếng cười vẫn rộn — và {name} thấy mình vừa đi qua một cái ngã rẽ nhỏ mà quan trọng.' }
            ] },
            { label: 'Ỡm ờ: "Để em suy nghĩ đã…"', fx: { risk: 3, pressure: 2 }, note: 'Đồng hương: ỡm ờ trước lời rủ làm chui (Rủi ro ẩn tăng)', say: [
              { sp: 'narr', text: 'Câu "để suy nghĩ" làm anh chàng mừng ra mặt, dúi cho số điện thoại: "Nghĩ xong gọi anh." {name} cất tờ giấy vào túi, lòng hơi nặng. Không phải lời rủ nào ở xứ người cũng xấu — nhưng việc gì phải giấu giấy tờ, trả tiền mặt lén lút, thì mùi của nó không bao giờ là mùi tử tế.' }
            ] },
            { label: 'Hỏi vặn lại: "Việc gì mà phải giấu giấy tờ hả anh?"', fx: { jp: 2 }, note: 'Đồng hương: hỏi thẳng về lời rủ xám', say: [
              { sp: 'narr', text: 'Bị hỏi thẳng, anh chàng lúng túng cười trừ rồi lảng sang chuyện khác. Chị điều dưỡng ngồi cạnh gật đầu với {name}: "Hỏi được câu đó là tỉnh đấy. Việc tử tế thì chẳng ai phải hạ giọng." — Buổi họp đồng hương cho {name} cả kinh nghiệm sống lẫn một bài học nhìn người.' }
            ] }
          ]
        }
      ],
      outro: 'Chia tay nhau lúc chiều tà, ai về nhà nấy, hẹn tháng sau lại tụ. Ở một đất nước xa lạ, có một góc công viên thơm mùi thịt nướng và rộn tiếng Việt — thế là nhớ nhà cũng vơi đi quá nửa.'
    },

    'hanami': {
      scene: '🌸 Hanami — ngắm hoa anh đào ở công viên 代々木 (mùa xuân)',
      branch: [
        { sp: 'narr', text: 'Tháng ba, anh đào ở công viên 代々木 bung nở rợp trời. {name} trải tấm chiếu picnic dưới tán cây, bày đồ ăn mang theo. Người Nhật có lệ 花見 (hanami) từ cả nghìn năm: ngồi dưới hoa, ăn uống, nói chuyện — hoa chỉ nở chừng một tuần, nên khoảnh khắc nào cũng quý.' },
        { sp: 'narr', jp: '桜が満開ですね。今年も見られて、よかったです。', text: 'Một bà cụ ngồi chiếu bên cạnh bắt chuyện: "Anh đào nở rộ rồi nhỉ. Năm nay lại được ngắm hoa, thật là tốt." — 満開 (mankai) là lúc hoa nở rộ nhất, cũng là lúc đẹp nhất và ngắn nhất.' },
        {
          prompt: 'Ngắm hoa một mình giữa biển người vui vẻ, {name} thấy…',
          choice: [
            { label: 'Lòng nhẹ nhõm hẳn — chụp một tấm ảnh hoa gửi về nhà', fx: { pressure: -3, love: 1 }, note: 'Hanami: chụp ảnh hoa gửi về nhà', say: [
              { sp: 'narr', text: '{name} giơ điện thoại chụp tán hoa hồng rực trên nền trời, gửi về cho mẹ kèm dòng chữ: "Hoa anh đào ở Nhật đây mẹ, đẹp như trong phim ấy. Năm sau con gửi tiền, mẹ sang ngắm thật nhé." Phía nhà trả lời bằng một tràng biểu tượng trái tim. (Ảnh kỷ niệm đã lưu vào album trong điện thoại.)' }
            ] },
            { label: 'Hơi chạnh lòng nhớ người thương ở quê', fx: { pressure: -1 }, note: 'Hanami: chạnh lòng nhớ quê', say: [
              { sp: 'narr', text: 'Hoa đẹp thế này mà người muốn cùng ngắm lại ở cách nửa vòng trái đất. {name} thở dài, rồi tự nhủ: chính vì có người để nhớ, mùa hoa mới có ý nghĩa. Cánh hoa rơi xuống tấm chiếu, mỏng như lời hứa ở sân bay ngày nào.' }
            ] }
          ]
        }
      ],
      outro: 'Về nhà, cánh hoa còn vương trên vai áo. Người Nhật bảo hoa anh đào đẹp vì nó chóng tàn — mono no aware, cái đẹp của những thứ không ở lại lâu. {name} thấy mình hiểu câu đó hơn một chút rồi.'
    },

    'momiji': {
      scene: '🍁 Ngắm lá đỏ ở 鎌倉 (mùa thu)',
      branch: [
        { sp: 'narr', text: 'Cuối thu, lá phong ở chùa 鎌倉 đỏ rực cả sườn đồi. Người Nhật gọi thú đi ngắm lá đỏ là 紅葉狩り (momijigari — "săn lá đỏ"). {name} đi chậm trên con đường lát đá, tiếng lá khô xào xạc dưới chân, khói hương từ chánh điện thoang thoảng.' },
        { sp: 'Sư thầy', jp: '紅葉は、散る時が一番美しいんですよ。', text: 'Sư thầy quét sân gần đó mỉm cười: "Lá đỏ lúc lìa cành là lúc đẹp nhất đấy." — Một câu nói nhẹ mà {name} cứ nghĩ mãi: có những thứ đẹp nhất đúng vào lúc buông xuống.' },
        {
          prompt: 'Một chiếc lá phong đỏ thắm vừa rơi xuống lòng bàn tay. {name}:',
          choice: [
            { label: 'Ép lá vào sổ tay làm kỷ niệm, chụp ảnh gửi về nhà', fx: { pressure: -3 }, note: 'Momiji: ép lá phong làm kỷ niệm', say: [
              { sp: 'narr', text: '{name} ép chiếc lá vào cuốn sổ học tiếng Nhật, chụp ảnh cả sườn đồi đỏ gửi về nhà: "Ở Nhật vào thu rồi, lá đỏ đẹp lắm cả nhà ạ." (Ảnh kỷ niệm đã lưu vào album trong điện thoại.)' }
            ] },
            { label: 'Thả lá theo gió, ngồi ngắm đồi thêm một lúc lâu', fx: { pressure: -2, hp: 2 }, note: 'Momiji: ngồi tĩnh ngắm lá đỏ', say: [
              { sp: 'narr', text: 'Chiếc lá xoay mấy vòng rồi mất hút trong gió thu. {name} ngồi xuống bậc đá, không làm gì cả — chỉ ngắm. Ở Nhật gần một năm, đây là lần đầu tiên {name} cho phép mình ngồi yên lâu đến thế mà không thấy tội lỗi với thời gian.' }
            ] }
          ]
        }
      ],
      outro: 'Xuống núi khi nắng chiều đã ngả vàng, {name} thấy người nhẹ như vừa trút được một gánh vô hình. Mùa thu ở Nhật dạy người ta một điều: buông xuống đúng lúc cũng là một cách đẹp.'
    }
  });
})();
