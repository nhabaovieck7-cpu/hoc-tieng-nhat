// scenes-k.js — GÓI CHƯƠNG 3 «NGÃ RẼ» phần lõi (đợt SAGA 01/11/2026):
// ngã rẽ chọn đường · chọn ngành · PHỎNG VẤN XIN VIỆC (boss chương — chấm điểm qua
// note 'Phỏng vấn: đúng/sai' trong sổ log, story2.js đọc) · phỏng vấn đầu vào du học ·
// nộp hồ sơ nyukan · kết thúc sớm «Về quê» · chuỗi ngành KAIGO + NHÀ HÀNG + tuyến DU HỌC
// + chuyện phiếm nơi làm (talk-*). Chuỗi 7 ngành còn lại ở scenes-k2.js / scenes-k3.js.
// Thể ngữ §8: thầy Khánh ấm mà nghiêm; cán bộ nyukan teineigo đều đều; bếp trưởng ngắn
// gọn kiểu nghề; chị Mai điềm đạm kính ngữ nghề kaigo. Kaiwa đời thường lồng khắp nơi
// theo lệnh chủ trang 20:44 01/11 — nói đúng câu thì việc trôi, nói sai thì rẽ nhánh vui.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= NGÃ RẼ — THẦY KHÁNH TƯ VẤN (trường tiếng) ================= */
  'ch3-nga-re': {
    scene: '🎓 Ngã rẽ — thầy Khánh gọi lên văn phòng trường',
    branch: [
      { sp: 'narr', text: 'Buổi chiều, thầy Khánh gọi {name} ở lại sau giờ học. Trên bàn là một tờ lịch được khoanh đỏ: chặng đầu tiên ở Nhật sắp hết hạn — tờ tư cách lưu trú trong ví không còn tính bằng năm nữa, mà bằng tháng.' },
      { sp: 'Thầy Khánh', text: '"Ngồi đi. Thầy nói thẳng như mọi khi nhé: tới đây là hết phần \'được dắt tay\'. Từ giờ, đường đi là do {call} tự chọn — và tự chịu. Có ba cửa chính, thầy phân tích từng cửa, nghe kỹ rồi quyết."' },
      { sp: 'Thầy Khánh', text: '"Cửa một: THI TOKUTEI. Chọn một ngành — kaigo, bếp, công trường, xưởng, kho, nông… — đi làm chuyên hẳn một nghề. Có lương tử tế, ở lại dài được, nhưng phải qua phỏng vấn xin việc thật và đổi tư cách ở nyukan. Sai ngành là khổ nhiều năm, nên chọn bằng cái đầu, không chọn bằng cái tai nghe người ta đồn."' },
      { sp: 'Thầy Khánh', text: '"Cửa hai: DU HỌC TIẾP lên trường chuyên môn. Học thêm hai năm, tiếng lên hẳn một bậc, đường dài rộng hơn — nhưng học phí không rẻ, vừa học vừa làm thêm trong giới hạn 28 giờ một tuần, kỷ luật phải tự giữ. Cửa này hợp với người còn muốn đầu tư cho cái đầu."' },
      { sp: 'Thầy Khánh', text: '"Cửa ba: VỀ NƯỚC. Nghe cho rõ: về không phải là thua. Có người về quê mở được việc riêng bằng vốn tiếng Nhật đã học, sống gần bố mẹ — một đời khác, không kém ai. Chỉ cần quyết bằng lòng mình, đừng quyết vì một phút nản."' },
      {
        prompt: 'Nghe thầy phân tích xong cả ba cửa, {name} ngả theo hướng nào?',
        choice: [
          { label: 'Đi làm Tokutei — chọn một ngành và đi tới cùng', flag: 'saga-route', value: 'tokutei', fx: { jp: 1, pressure: 1 }, note: 'Ngã rẽ Chương 3: chọn đường Tokutei', say: [
            { sp: 'Thầy Khánh', text: '"Được. Đi làm thì phải có nghề trong tay — không ai nuôi mình bằng lời hứa cả. Bước tiếp theo: chọn ngành. Ngành là thứ {call} sẽ sống cùng nó mười hai tiếng mỗi ngày, nên nghe thầy tư vấn từng ngành rồi hẵng chốt."' },
            { sp: 'narr', text: 'Thầy rút trong ngăn kéo ra một xấp tờ rơi của các công ty và trường dạy nghề, xếp thành hàng ngay ngắn trước mặt {name}. Một chặng đường mới bắt đầu từ việc chọn đúng cánh cửa đầu tiên.' }
          ] },
          { label: 'Du học tiếp — đầu tư thêm hai năm cho cái đầu', flag: 'saga-route', value: 'du-hoc', fx: { jp: 2 }, note: 'Ngã rẽ Chương 3: chọn đường du học tiếp', say: [
            { sp: 'Thầy Khánh', text: '"Chọn học tiếp là chọn đường dài. Nhớ lời thầy: học phí kỳ đầu phải lo từ bây giờ, và làm thêm là để sống — không phải để quên mất mình sang đây học cái gì. Kỳ học mới bắt đầu ngay tại trường này: ba buổi đầu, thầy sẽ theo sát."' },
            { sp: 'narr', text: '{name} nhìn ra cửa sổ lớp học — sân trường chiều xuống, mấy bạn khóa dưới đang cười nói ra về. Mình sẽ ở lại nơi này thêm hai năm nữa, với tư cách một học trò thật sự.' }
          ] },
          { label: 'Về nước — đường về cũng là một đường đi', flag: 'saga-route', value: 've-nuoc', fx: { love: 1, pressure: -1 }, note: 'Ngã rẽ Chương 3: nghiêng về đường về nước', say: [
            { sp: 'Thầy Khánh', text: '"…Thầy không cản. Nhưng quyết định lớn thì không ký trong một buổi chiều. Về phòng, gọi về nhà nói chuyện cho đàng hoàng, ngủ một đêm — mai quay lại đây nói với thầy tiếng cuối cùng. Nếu lòng vẫn vậy, thầy giúp làm thủ tục cho trọn vẹn."' },
            { sp: 'narr', text: 'Ra khỏi văn phòng, {name} đứng rất lâu ở hành lang. Ở lại hay về — lần đầu tiên từ ngày sang Nhật, câu hỏi này nằm hoàn toàn trong tay mình.' }
          ] }
        ]
      }
    ]
  },

  /* ================= CHỌN NGÀNH TOKUTEI ================= */
  'ch3-chon-nganh': {
    scene: '🏭 Chọn ngành — chín cánh cửa nghề',
    branch: [
      { sp: 'Thầy Khánh', text: '"Nghe kỹ từng ngành, thầy chỉ nói sự thật, không quảng cáo. KAIGO: chăm người già — cần trái tim và kính ngữ, việc ổn định nhất, chị Mai của {call} là người trong nghề đấy. NHÀ HÀNG: bếp nóng, giờ giấc thất thường, nhưng học được nghề nấu ăn mang đi đâu cũng sống."' },
      { sp: 'Thầy Khánh', text: '"CÔNG TRƯỜNG: nắng gió, lương khá, cần sức và kỷ luật an toàn. KHÁCH SẠN: mặt tiền của sự lịch sự — tiếng Nhật phải chuẩn, ca kíp xoay vòng. THỰC PHẨM: dây chuyền lạnh, ca đêm nhiều, việc đều như đồng hồ."' },
      { sp: 'Thầy Khánh', text: '"CHẾ TẠO: nhà máy cơ khí, kỷ luật từng giây, tay nghề lên nhanh. Ô TÔ: xưởng sửa xe, nghề càng làm càng có giá. KHO VẬN: phân loại hàng, ca đêm, cần nhanh và chính xác. NÔNG NGHIỆP: ra đồng từ 4 giờ sáng, sống chậm giữa thiên nhiên, tiền theo mùa vụ."' },
      { sp: 'Thầy Khánh', text: '"Chọn ngành không phải chọn chỗ dễ nhất — chọn chỗ mà {call} chịu được cả ngày xấu nhất của nó. Chốt đi, thầy ghi hồ sơ."' },
      {
        prompt: '{name} chọn ngành nào cho chặng Tokutei của mình?',
        choice: [
          { label: '🏥 Kaigo — chăm sóc người già (viện dưỡng lão, Thần Hộ)', flag: 'saga-industry', value: 'kaigo', fx: { love: 1 }, note: 'Chọn ngành: kaigo', say: [
            { sp: 'Thầy Khánh', text: '"Kaigo. Việc của người tử tế. Chị Mai sẽ là người dẫn {call} vào nghề — tới viện dưỡng lão ở 神戸， gặp chị ấy ở bảng tin của viện."' } ] },
          { label: '🍳 Nhà hàng — bếp Nhật (bếp ở Toyosu)', flag: 'saga-industry', value: 'nha-hang', fx: { jp: 1 }, note: 'Chọn ngành: nhà hàng', say: [
            { sp: 'Thầy Khánh', text: '"Vào bếp là vào lò lửa — theo cả hai nghĩa. Tới bếp nhà hàng ở 豊洲， xem bảng phân ca và chào bếp trưởng Sato."' } ] },
          { label: '🏗️ Xây dựng — công trường (Yokohama)', flag: 'saga-industry', value: 'genba', fx: { hp: 1 }, note: 'Chọn ngành: xây dựng', say: [
            { sp: 'Thầy Khánh', text: '"Công trường nuôi người bằng mồ hôi thật. Tới công trường ở 横浜， đọc bảng an toàn trước, rồi gặp sếp công trường."' } ] },
          { label: '🛎️ Khách sạn — lễ tân & buồng phòng (Odaiba)', flag: 'saga-industry', value: 'khach-san', fx: { jp: 1 }, note: 'Chọn ngành: khách sạn', say: [
            { sp: 'Thầy Khánh', text: '"Khách sạn là nơi tiếng Nhật bị soi từng chữ — hợp với người chịu khó sửa mình. Tới khách sạn ở お台場， gặp chị senpai ở quầy lễ tân."' } ] },
          { label: '🏭 Thực phẩm — dây chuyền chế biến (Osaka)', flag: 'saga-industry', value: 'shokuhin', fx: { hp: 1 }, note: 'Chọn ngành: thực phẩm', say: [
            { sp: 'Thầy Khánh', text: '"Dây chuyền lạnh và ca đêm — việc đều, người phải bền. Tới nhà máy thực phẩm ở 大阪， xem bảng phân ca, gặp chị trưởng ca."' } ] },
          { label: '⚙️ Chế tạo — nhà máy cơ khí (Nagoya)', flag: 'saga-industry', value: 'seizo', fx: { jp: 1 }, note: 'Chọn ngành: chế tạo', say: [
            { sp: 'Thầy Khánh', text: '"Cơ khí trọng người nói thật — máy hỏng thì báo hỏng. Tới nhà máy ở 名古屋， xem bảng sản xuất và chào senpai Kudo."' } ] },
          { label: '🔧 Ô tô — xưởng sửa chữa (Toyota)', flag: 'saga-industry', value: 'seibi', fx: { jp: 1 }, note: 'Chọn ngành: ô tô', say: [
            { sp: 'Thầy Khánh', text: '"Nghề sửa xe càng làm càng đắt giá. Tới xưởng ở 豊田， gặp chủ xưởng — ông ấy ít nói nhưng nhìn người rất chuẩn."' } ] },
          { label: '📦 Kho vận — trung tâm phân loại (Chiba)', flag: 'saga-industry', value: 'soko', fx: { hp: 1 }, note: 'Chọn ngành: kho vận', say: [
            { sp: 'Thầy Khánh', text: '"Kho vận cần nhanh và không được sai. Tới kho ở 千葉， gặp anh trưởng kho — người ta sẽ thử {call} ngay buổi đầu."' } ] },
          { label: '🌾 Nông nghiệp — trang trại (Furano)', flag: 'saga-industry', value: 'nogyo', fx: { love: 1 }, note: 'Chọn ngành: nông nghiệp', say: [
            { sp: 'Thầy Khánh', text: '"Ra đồng từ 4 giờ sáng, ngủ theo mặt trời. Tới trang trại ở 富良野， xem bảng việc và chào hai bác chủ trại."' } ] },
          { label: 'Để mình suy nghĩ thêm một đêm đã', fx: { pressure: 1 }, note: 'Chọn ngành: chưa chốt, cần suy nghĩ thêm', say: [
            { sp: 'Thầy Khánh', text: '"Được — chuyện cả vài năm, nghĩ kỹ một đêm là đúng. Nhưng đừng để quá lâu: hồ sơ không chờ ai đâu. Mai quay lại đây chốt với thầy."' } ] }
        ]
      }
    ]
  },
  /* ================= PHỎNG VẤN XIN VIỆC — BOSS CHƯƠNG 3 =================
     8 câu hỏi, mỗi câu 1 đáp án vào guồng (note 'Phỏng vấn: đúng') + 2 đáp án hụt
     (note 'Phỏng vấn: sai'). story2.js đếm từ sổ log: đỗ khi đúng ≥ 6/8. Nhãn lựa
     chọn là câu tiếng Nhật TRẦN (đúng chất phỏng vấn thật — người chơi phải tự đọc);
     câu được chọn sẽ hiện lại kèm furigana + nghĩa trong bước say ngay sau. */
  'ch3-phong-van': {
    scene: '💼 Phỏng vấn xin việc — trận đấu bằng tiếng Nhật',
    branch: [
      { sp: 'narr', text: 'Phòng phỏng vấn nhỏ, sáng lạnh. Hai người ngồi sau bàn dài: một quản lý và một trưởng bộ phận. Trên bàn là hồ sơ của {name} — và một khoảng im lặng cố ý, kiểu im lặng để thử người đối diện có biết tự mở lời hay không.' },
      { sp: 'Người phỏng vấn', jp: 'では、{簡単|かんたん}に{自己紹介|じこしょうかい}をお{願|ねが}いします。', text: '"Vậy, xin bạn tự giới thiệu ngắn gọn." — Câu mở màn kinh điển. (Câu tự giới thiệu đầu tiên ngày mới sang Nhật, ở Chương 1, {name} từng nói lắp bắp từng chữ…)' },
      {
        prompt: 'Câu 1/8 — Tự giới thiệu: nói thế nào cho gọn mà ra dáng người đi làm?',
        choice: [
          { label: '{name}と申します。ベトナム出身で、日本語能力試験N3に合格しました。前職の経験を生かして、御社で長く働きたいと考えています。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — tự giới thiệu gọn, có bằng cấp, có định hướng ở lại lâu dài', say: [
            { sp: 'hero', jp: '{初|はじ}めまして。{私|わたし}はベトナム{出身|しゅっしん}で、{日本語能力試験|にほんごのうりょくしけん}N3に{合格|ごうかく}しました。{前|まえ}の{経験|けいけん}を{生|い}かして、{御社|おんしゃ}で{長|なが}く{働|はたら}きたいと{考|かんが}えています。', text: '"Xin chào, tôi là {name}. Tôi đến từ Việt Nam, đã đỗ JLPT N3. Tôi muốn vận dụng kinh nghiệm trước đây và làm việc lâu dài tại quý công ty."' },
            { sp: 'Người phỏng vấn', text: '"Ừm." — cây bút của người quản lý gạch một đường ngắn lên hồ sơ. Cái gạch ấy, ai đi phỏng vấn ở Nhật rồi cũng biết, là gạch TỐT.' } ] },
          { label: '私は{name}です。ベトナムから来ました。日本語はペラペラです。よろしく!', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — tự giới thiệu suồng sã, khoe tiếng Nhật "pê-ra pê-ra"', say: [
            { sp: 'hero', jp: '{私|わたし}、ベトナムから{来|き}ました。{日本語|にほんご}はペラペラです。よろしく！', text: '"Tôi là {name} đây. Đến từ Việt Nam. Tiếng Nhật của tôi thì lưu loát lắm. Rất vui được gặp!"' },
            { sp: 'Người phỏng vấn', text: '"…Vâng." — hai người phỏng vấn nhìn nhau. "ペラペラ" là từ khoe khoang, và câu chào cụt ngủn không kính ngữ vừa làm căn phòng lạnh đi một độ.' } ] },
          { label: 'えーと、あのー、私は…名前は{name}で…', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — mở đầu ấp úng, không thành câu', say: [
            { sp: 'hero', jp: 'えーと、あのー、{私|わたし}は…えーと…', text: '"Ờ… ừm… tôi… tên tôi là {name}… ờ…"' },
            { sp: 'narr', text: 'Câu giới thiệu tập bao nhiêu lần trước gương lại tan ngay ở chữ đầu tiên. Người quản lý kiên nhẫn chờ thêm ba giây, rồi nhẹ nhàng chuyển sang câu hỏi khác — cơ hội đầu tiên đã trôi qua.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: 'なぜ{日本|にほん}で{働|はたら}きたいと{思|おも}ったのですか。', text: '"Vì sao bạn muốn làm việc ở Nhật?" — Câu hỏi tưởng dễ mà giết nhiều ứng viên nhất: trả lời sai một nhịp là lộ ngay bụng dạ.' },
      {
        prompt: 'Câu 2/8 — Vì sao muốn làm việc ở Nhật?',
        choice: [
          { label: '日本の技術と働き方を学んで、将来は自分の専門として伸ばしたいからです。家族への仕送りも大切ですが、それだけではありません。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — động lực nghề nghiệp rõ, nhắc gia đình ở vị trí thứ hai đầy tử tế', say: [
            { sp: 'hero', jp: '{日本|にほん}の{技術|ぎじゅつ}と{働|はたら}き{方|かた}を{学|まな}んで、{将来|しょうらい}は{自分|じぶん}の{専門|せんもん}として{伸|の}ばしたいからです。{家族|かぞく}への{仕送|しおく}りも{大切|たいせつ}ですが、それだけではありません。', text: '"Vì tôi muốn học kỹ thuật và cách làm việc của Nhật, để sau này phát triển thành chuyên môn của chính mình. Gửi tiền về cho gia đình cũng quan trọng, nhưng không phải là tất cả."' },
            { sp: 'Người phỏng vấn', text: '"Hừm." — lần này là trưởng bộ phận gật đầu. Câu trả lời có nghề nghiệp ở phía trước, gia đình ở phía sau: đúng thứ tự mà người Nhật tin tưởng.' } ] },
          { label: '日本は給料が高いからです。ベトナムの三倍ぐらいもらえます。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — động lực chỉ là tiền lương cao gấp ba', say: [
            { sp: 'hero', jp: '{日本|にほん}は{給料|きゅうりょう}が{高|たか}いからです。ベトナムの{三倍|さんばい}ぐらいもらえます。', text: '"Vì lương ở Nhật cao. Được gấp khoảng ba lần ở Việt Nam."' },
            { sp: 'Người phỏng vấn', text: '"Thế nếu có công ty khác trả cao hơn thì bạn chuyển ngay à?" — câu hỏi xoáy đáp lại ngay lập tức. Trong phòng phỏng vấn, nói thật về tiền không sai — nhưng chỉ có tiền thì là sai.' } ] },
          { label: '日本の漫画とアニメが大好きだからです。秋葉原に住みたいです。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — động lực fan anime, quên mất đây là xin việc', say: [
            { sp: 'hero', jp: '{日本|にほん}の{漫画|まんが}とアニメが{大好|だいす}きだからです。{秋葉原|あきはばら}に{住|す}みたいです。', text: '"Vì tôi rất thích manga và anime Nhật. Tôi muốn sống ở Akihabara."' },
            { sp: 'narr', text: 'Người quản lý khẽ mỉm cười — nụ cười của người nghe câu này đến lần thứ một trăm. Yêu văn hóa Nhật là điểm cộng ở quán cà phê, không phải ở bàn phỏng vấn.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: 'たくさんある{会社|かいしゃ}の{中|なか}から、なぜ{当社|とうしゃ}を{選|えら}んだのですか。', text: '"Giữa bao nhiêu công ty, vì sao bạn chọn công ty chúng tôi?" — Họ muốn nghe thấy {name} đã tìm hiểu thật, không phải nộp đơn rải khắp nơi.' },
      {
        prompt: 'Câu 3/8 — Vì sao chọn công ty này?',
        choice: [
          { label: '御社の研修制度と、外国人スタッフが長く働いている実績を見て、ここなら成長できると感じました。見学のときの現場の雰囲気も明るかったです。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — nêu được chế độ đào tạo + thực tế có người nước ngoài làm lâu + ấn tượng buổi tham quan', say: [
            { sp: 'hero', jp: '{御社|おんしゃ}の{研修制度|けんしゅうせいど}と、{外国人|がいこくじん}スタッフが{長|なが}く{働|はたら}いている{実績|じっせき}を{見|み}て、ここなら{成長|せいちょう}できると{感|かん}じました。{見学|けんがく}のときの{現場|げんば}の{雰囲気|ふんいき}も{明|あか}るかったです。', text: '"Tôi thấy chế độ đào tạo của quý công ty và thực tế có nhân viên nước ngoài làm việc lâu dài, nên cảm nhận ở đây mình có thể trưởng thành. Không khí nơi làm việc hôm tôi đến tham quan cũng rất cởi mở."' },
            { sp: 'Người phỏng vấn', text: 'Trưởng bộ phận ngả người ra sau một chút — dấu hiệu của người vừa nghe được câu trả lời có chuẩn bị. "Bạn đã đến tham quan thật à." — cây bút lại gạch thêm một đường tốt.' } ] },
          { label: '家から一番近いからです。通勤が楽なのが一番大事だと思います。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — chọn công ty vì gần nhà và đi làm cho nhàn', say: [
            { sp: 'hero', jp: '{家|いえ}から{一番近|いちばんちか}いからです。{通勤|つうきん}が{楽|らく}なのが{一番大事|いちばんだいじ}だと{思|おも}います。', text: '"Vì gần nhà tôi nhất. Tôi nghĩ đi làm nhàn là quan trọng nhất."' },
            { sp: 'narr', text: '"Nhàn" — cái chữ ấy rơi xuống bàn nghe rất rõ. Không ai tuyển người vì người đó muốn nhàn.' } ] },
          { label: '求人サイトで給料と休みだけ見て決めました。他の会社とあまり変わりません。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — thú nhận chỉ xem lương và ngày nghỉ, công ty nào cũng như nhau', say: [
            { sp: 'hero', jp: '{求人|きゅうじん}サイトで{給料|きゅうりょう}と{休|やす}みだけ{見|み}て{決|き}めました。{他|ほか}の{会社|かいしゃ}とあまり{変|か}わりません。', text: '"Tôi chỉ xem lương với ngày nghỉ trên trang tuyển dụng rồi quyết. Cũng không khác các công ty khác là mấy."' },
            { sp: 'Người phỏng vấn', text: '"Không khác là mấy…" — người quản lý nhắc lại khẽ khàng, rồi ghi gì đó rất dài vào hồ sơ. Thường ghi càng dài, tin càng xấu.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: 'あなたの{長所|ちょうしょ}と{短所|たんしょ}を{教|おし}えてください。', text: '"Hãy cho biết điểm mạnh và điểm yếu của bạn." — Bẫy ở đây nằm ở nửa sau: điểm yếu nói thế nào để không tự bắn vào chân.' },
      {
        prompt: 'Câu 4/8 — Điểm mạnh và điểm yếu?',
        choice: [
          { label: '長所は、約束したことは必ず守ることです。短所は、確認しすぎて少し時間がかかることですが、チェックリストを作って改善しています。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — điểm mạnh cụ thể; điểm yếu thật nhưng kèm cách đang khắc phục', say: [
            { sp: 'hero', jp: '{長所|ちょうしょ}は、{約束|やくそく}したことは{必|かなら}ず{守|まも}ることです。{短所|たんしょ}は、{確認|かくにん}しすぎて{少|すこ}し{時間|じかん}がかかることですが、チェックリストを{作|つく}って{改善|かいぜん}しています。', text: '"Điểm mạnh của tôi là đã hứa thì nhất định giữ lời. Điểm yếu là tôi hay xác nhận quá kỹ nên hơi tốn thời gian, nhưng tôi đang khắc phục bằng cách làm danh sách kiểm tra."' },
            { sp: 'Người phỏng vấn', text: '"Điểm yếu mà có sẵn cách sửa — thế mới là điểm yếu đáng nghe." Trưởng bộ phận nói nửa như đùa, nửa như thật.' } ] },
          { label: '短所はありません。何でもできますし、ミスもほとんどしません。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — tuyên bố không có điểm yếu, không bao giờ mắc lỗi', say: [
            { sp: 'hero', jp: '{短所|たんしょ}はありません。{何|なん}でもできますし、ミスもほとんどしません。', text: '"Tôi không có điểm yếu. Việc gì tôi cũng làm được, cũng gần như không mắc lỗi bao giờ."' },
            { sp: 'narr', text: 'Căn phòng im phăng phắc hai giây. Người không có điểm yếu, trong mắt người tuyển dụng, là người chưa từng tự nhìn lại mình — hoặc đang nói dối.' } ] },
          { label: '長所は体力だけです。短所は、朝が弱くて、たまに遅刻します。でも最近は頑張っています。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — thú nhận hay đi muộn, điểm mạnh chỉ là thể lực', say: [
            { sp: 'hero', jp: '{長所|ちょうしょ}は{体力|たいりょく}だけです。{短所|たんしょ}は、{朝|あさ}が{弱|よわ}くて、たまに{遅刻|ちこく}します。でも{最近|さいきん}は{頑張|がんば}っています。', text: '"Điểm mạnh chỉ có thể lực thôi ạ. Điểm yếu là tôi yếu buổi sáng, thỉnh thoảng đi muộn. Nhưng dạo này tôi đang cố rồi ạ."' },
            { sp: 'Người phỏng vấn', text: '"Đi muộn" trong ngành nào cũng là từ cấm kỵ. "Đang cố" không phải là một kế hoạch — và cả phòng đều nghe thấy điều đó.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: '{仕事|しごと}で{失敗|しっぱい}した{経験|けいけん}はありますか。そのとき、どうしましたか。', text: '"Bạn từng thất bại trong công việc chưa? Lúc đó bạn đã làm thế nào?" — Họ không tìm người hoàn hảo; họ tìm người biết đứng dậy kiểu gì.' },
      {
        prompt: 'Câu 5/8 — Kể một lần thất bại và cách xử lý?',
        choice: [
          { label: '伝達ミスで作業をやり直したことがあります。すぐ上司に報告して、謝って、一緒に直しました。それ以来、復唱確認を必ずしています。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — nhận lỗi, báo cáo ngay, xin lỗi, sửa cùng đội, rút bài học thành thói quen xác nhận lại', say: [
            { sp: 'hero', jp: '{伝達|でんたつ}ミスで{作業|さぎょう}をやり{直|なお}したことがあります。すぐ{上司|じょうし}に{報告|ほうこく}して、{謝|あやま}って、{一緒|いっしょ}に{直|なお}しました。それ{以来|いらい}、{復唱確認|ふくしょうかくにん}を{必|かなら}ずしています。', text: '"Tôi từng phải làm lại việc vì truyền đạt sai. Tôi báo cáo ngay với cấp trên, xin lỗi và cùng sửa lại. Từ đó về sau, tôi luôn xác nhận bằng cách nhắc lại chỉ thị."' },
            { sp: 'Người phỏng vấn', text: '"報告して、謝って、直して、仕組みにした。" — trưởng bộ phận đếm bốn nhịp trên đầu ngón tay. "Đó chính là cách làm việc của chúng tôi."' } ] },
          { label: '失敗したことはありません。いつも運が良かったです。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — chối chưa từng thất bại, đổ cho may mắn', say: [
            { sp: 'hero', jp: '{失敗|しっぱい}したことはありません。いつも{運|うん}が{良|よ}かったです。', text: '"Tôi chưa từng thất bại. Lúc nào tôi cũng gặp may."' },
            { sp: 'narr', text: '"May mắn" không phải là năng lực. Hai người phỏng vấn cúi xuống hồ sơ cùng lúc — và không hỏi thêm về chủ đề này nữa.' } ] },
          { label: '失敗は同僚のせいでした。私は悪くありませんでしたが、運悪く怒られました。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — đổ lỗi cho đồng nghiệp', say: [
            { sp: 'hero', jp: '{失敗|しっぱい}は{同僚|どうりょう}のせいでした。{私|わたし}は{悪|わる}くありませんでしたが、{運悪|うんわる}く{怒|おこ}られました。', text: '"Lần thất bại đó là lỗi của đồng nghiệp. Tôi không có lỗi gì, chỉ xui nên bị mắng thôi."' },
            { sp: 'Người phỏng vấn', text: '"Lỗi của đồng nghiệp" — trong văn hóa làm việc của Nhật, câu đó tự nó đã là một thất bại khác.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: 'N3に{合格|ごうかく}したそうですが、{日本語|にほんご}の{勉強|べんきょう}はどう{続|つづ}けていますか。', text: '"Nghe nói bạn đã đỗ N3 — bạn đang duy trì việc học tiếng Nhật thế nào?"' },
      {
        prompt: 'Câu 6/8 — Cách duy trì tiếng Nhật?',
        choice: [
          { label: '毎日、仕事の言葉をノートに書いて復習しています。現場で分からない言葉は、その日のうちに聞いて覚えるようにしています。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — học mỗi ngày từ chính công việc, hỏi trong ngày, ghi chép ôn lại', say: [
            { sp: 'hero', jp: '{毎日|まいにち}、{仕事|しごと}の{言葉|ことば}をノートに{書|か}いて{復習|ふくしゅう}しています。{現場|げんば}で{分|わ}からない{言葉|ことば}は、その{日|ひ}のうちに{聞|き}いて{覚|おぼ}えるようにしています。', text: '"Mỗi ngày tôi ghi từ vựng công việc vào sổ và ôn lại. Từ nào ở nơi làm không hiểu, tôi hỏi ngay trong ngày hôm đó để nhớ."' },
            { sp: 'Người phỏng vấn', text: '"Hỏi trong ngày hôm đó — thói quen này đáng giá hơn cả tấm bằng." Người quản lý nói, và lần đầu tiên trong buổi, mỉm cười rõ rệt.' } ] },
          { label: 'もうN3があるので、勉強はしていません。仕事で使えば自然に上手くなると思います。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — có N3 rồi nên ngừng học, trông vào "tự nhiên giỏi"', say: [
            { sp: 'hero', jp: 'もうN3があるので、{勉強|べんきょう}はしていません。{仕事|しごと}で{使|つか}えば{自然|しぜん}に{上手|じょうず}になると{思|おも}います。', text: '"Tôi đã có N3 rồi nên không học nữa. Cứ dùng trong công việc là tự khắc giỏi lên thôi."' },
            { sp: 'narr', text: '"Tự khắc giỏi" — trong phòng này, người ta gọi đó là đứng yên. Và đứng yên trong một đội đang đi lên nghĩa là tụt lại.' } ] },
          { label: 'アニメを見て勉強しています。セリフはだいたい分かります。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — học tiếng qua anime, "hiểu đại khái lời thoại"', say: [
            { sp: 'hero', jp: 'アニメを{見|み}て{勉強|べんきょう}しています。セリフはだいたい{分|わ}かります。', text: '"Tôi học bằng cách xem anime. Lời thoại thì tôi hiểu đại khái."' },
            { sp: 'Người phỏng vấn', text: '"Ở nơi làm việc, "đại khái" là từ nguy hiểm nhất đấy." — câu đáp nhẹ nhàng mà sắc như dao cạo.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: '{将来|しょうらい}は、どう{考|かんが}えていますか。{日本|にほん}に{長|なが}く{住|す}みたいですか。', text: '"Tương lai bạn tính thế nào? Có muốn ở Nhật lâu dài không?" — Câu hỏi về lòng trung thành trá hình: nói quá chắc cũng dở, nói nước đôi cũng dở.' },
      {
        prompt: 'Câu 7/8 — Kế hoạch tương lai?',
        choice: [
          { label: 'まずはこの仕事を一人前にできるようになって、資格も取りたいです。その先は、家族とも相談しながら、日本で長く働く方向で考えています。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — mục tiêu gần cụ thể (làm thạo việc, lấy chứng chỉ), định hướng ở lại dài hạn nhưng nói thật là còn bàn với gia đình', say: [
            { sp: 'hero', jp: 'まずはこの{仕事|しごと}を{一人前|いちにんまえ}にできるようになって、{資格|しかく}も{取|と}りたいです。その{先|さき}は、{家族|かぞく}とも{相談|そうだん}しながら、{日本|にほん}で{長|なが}く{働|はたら}く{方向|ほうこう}で{考|かんが}えています。', text: '"Trước mắt tôi muốn làm thạo việc này và lấy thêm chứng chỉ nghề. Xa hơn, tôi sẽ bàn với gia đình, và đang nghĩ theo hướng làm việc lâu dài ở Nhật."' },
            { sp: 'Người phỏng vấn', text: '"Bàn với gia đình" — ba chữ ấy làm câu trả lời thành thật. Người Nhật cũng vậy thôi: chẳng ai quyết đời mình một mình cả.' } ] },
          { label: '5年でお金を貯めて、必ずベトナムに帰ります。日本に残る気はありません。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — tuyên bố chắc chắn 5 năm kiếm tiền rồi về, không có ý ở lại', say: [
            { sp: 'hero', jp: '5{年|ねん}でお{金|かね}を{貯|た}めて、{必|かなら}ずベトナムに{帰|かえ}ります。{日本|にほん}に{残|のこ}る{気|き}はありません。', text: '"Trong 5 năm tôi sẽ để dành tiền rồi chắc chắn về Việt Nam. Tôi không có ý ở lại Nhật."' },
            { sp: 'narr', text: 'Thành thật là tốt — nhưng công ty sắp bỏ tiền đào tạo một người đã tuyên bố ngày ra đi ngay từ buổi đầu. Ánh mắt người quản lý trượt xuống dòng "kế hoạch đào tạo" trong hồ sơ.' } ] },
          { label: '将来のことはまだ何も考えていません。何とかなるだろうと思います。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — chưa nghĩ gì về tương lai, "rồi sẽ ổn"', say: [
            { sp: 'hero', jp: '{将来|しょうらい}のことはまだ{何|なに}も{考|かんが}えていません。{何|なん}とかなるだろうと{思|おも}います。', text: '"Chuyện tương lai tôi chưa nghĩ gì cả. Chắc rồi sẽ ổn thôi."' },
            { sp: 'Người phỏng vấn', text: '"Rồi sẽ ổn" — câu trả lời ổn nhất cho mọi câu hỏi, trừ câu hỏi đang được hỏi.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: '{残業|ざんぎょう}や{夜勤|やきん}はありますが、{大丈夫|だいじょうぶ}ですか。{体力|たいりょく}に{自信|じしん}はありますか。', text: '"Công việc có tăng ca và ca đêm, bạn có ổn không? Thể lực có tự tin không?"' },
      {
        prompt: 'Câu 8/8 — Tăng ca và ca đêm?',
        choice: [
          { label: '大丈夫です。体調管理も仕事のうちだと思っています。ただ、続くときは早めに相談させてください。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — nhận việc dứt khoát, coi quản lý sức khỏe là một phần công việc, và nói trước kênh trao đổi khi ca kéo dài', say: [
            { sp: 'hero', jp: '{大丈夫|だいじょうぶ}です。{体調管理|たいちょうかんり}も{仕事|しごと}のうちだと{思|おも}っています。ただ、{続|つづ}くときは{早|はや}めに{相談|そうだん}させてください。', text: '"Tôi ổn ạ. Tôi nghĩ quản lý sức khỏe cũng là một phần của công việc. Chỉ là nếu ca kéo dài liên tục, xin cho tôi được trao đổi sớm."' },
            { sp: 'Người phỏng vấn', text: '"Người nói trước được câu "xin trao đổi sớm" là người không bỏ việc giữa chừng." — trưởng bộ phận ghi thêm một dòng, lần này là dòng kết luận.' } ] },
          { label: '残業はできればしたくないです。夜勤も、体に悪いので避けたいです。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — từ chối tăng ca và ca đêm ngay trong phỏng vấn', say: [
            { sp: 'hero', jp: '{残業|ざんぎょう}はできればしたくないです。{夜勤|やきん}も、{体|からだ}に{悪|わる}いので{避|さ}けたいです。', text: '"Tăng ca thì nếu được tôi không muốn làm. Ca đêm cũng hại sức khỏe nên tôi muốn tránh."' },
            { sp: 'narr', text: 'Sự im lặng lần này dài hơn mọi lần. Yêu cầu ca kíp ghi rõ trong tin tuyển dụng — từ chối nó trong phòng phỏng vấn giống như xin việc nấu ăn mà chê khói bếp.' } ] },
          { label: 'はい! 24時間でも働けます! 睡眠は不要です!', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — hứa làm 24 giờ không cần ngủ, nhiệt tình quá lố thành thiếu tin cậy', say: [
            { sp: 'hero', jp: 'はい！24{時間|じかん}でも{働|はたら}けます！{睡眠|すいみん}は{不要|ふよう}です！', text: '"Vâng! Làm 24 tiếng cũng được ạ! Không cần ngủ cũng được ạ!"' },
            { sp: 'Người phỏng vấn', text: '"…Cảm ơn nhiệt tình của bạn." — người quản lý phải nén cười. Hứa điều không ai làm được không chứng minh sức khỏe; nó chứng minh người hứa chưa hiểu công việc.' } ] }
        ]
      },
      { sp: 'Người phỏng vấn', jp: '{最後|さいご}に、{何|なに}か{質問|しつもん}はありますか。', text: '"Cuối cùng, bạn có câu hỏi gì cho chúng tôi không?" — Câu hỏi ngược: im lặng ở đây thường bị đọc là "không quan tâm".' },
      {
        prompt: 'Câu kết — hỏi ngược lại nhà tuyển dụng:',
        choice: [
          { label: '入社後、最初の研修はどのぐらいの期間ですか。先輩についてもらえますか。', fx: { jp: 1 }, note: 'Phỏng vấn: đúng — hỏi về đào tạo đầu vào và việc có senpai kèm cặp không (câu hỏi của người định làm nghiêm túc)', say: [
            { sp: 'hero', jp: '{入社後|にゅうしゃご}、{最初|さいしょ}の{研修|けんしゅう}はどのぐらいの{期間|きかん}ですか。{先輩|せんぱい}についてもらえますか。', text: '"Sau khi vào công ty, đợt đào tạo đầu tiên kéo dài bao lâu ạ? Tôi có được senpai kèm cặp không ạ?"' },
            { sp: 'Người phỏng vấn', text: '"Ba tháng đầu, bạn sẽ đi cùng một senpai…" — câu trả lời lần này dài và tử tế. Ai hỏi về cách được dạy, người đó đang hình dung mình trong công việc thật.' } ] },
          { label: '質問はありません。全部理解しました。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — không hỏi gì, tuyên bố đã hiểu hết', say: [
            { sp: 'hero', jp: '{質問|しつもん}はありません。{全部理解|ぜんぶりかい}しました。', text: '"Tôi không có câu hỏi gì. Tôi đã hiểu hết rồi."' },
            { sp: 'narr', text: '"Hiểu hết" sau bốn mươi phút — người quản lý đóng hồ sơ lại, lịch sự và dứt khoát. Buổi phỏng vấn khép lại ở đúng khoảnh khắc {name} tưởng mình đã xong.' } ] },
          { label: 'ボーナスは年に何回ですか。有給はすぐ使えますか。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — câu hỏi đầu tiên và duy nhất là về thưởng và nghỉ phép', say: [
            { sp: 'hero', jp: 'ボーナスは{年|ねん}に{何回|なんかい}ですか。{有給|ゆうきゅう}はすぐ{使|つか}えますか。', text: '"Thưởng một năm mấy lần ạ? Nghỉ phép có dùng ngay được không ạ?"' },
            { sp: 'Người phỏng vấn', text: '"Thưởng thì…" — câu trả lời ngắn và khô. Hỏi về quyền lợi không sai; nhưng khi đó là câu hỏi DUY NHẤT, nó nói lên mọi thứ về thứ tự ưu tiên của người hỏi.' } ] }
        ]
      },
      { sp: 'narr', text: 'Cửa phòng phỏng vấn khép lại sau lưng. {name} đứng giữa hành lang vắng, nghe tim mình đập rõ từng nhịp: những câu trả lời tốt như những viên gạch xếp thẳng hàng, những câu hụt như bậc thang sụt dưới chân. Kết quả — đỗ hay trượt — nằm ở đếm lại từng câu mình vừa nói.' }
    ]
  },

  /* ================= PHỎNG VẤN ĐẦU VÀO — TUYẾN DU HỌC =================
     6 câu hỏi, đỗ khi đúng ≥ 4/6. Ghi chú note cùng chuẩn 'Phỏng vấn: đúng/sai'. */
  'ch3-phong-van-duhoc': {
    scene: '🎓 Phỏng vấn đầu vào trường chuyên môn',
    branch: [
      { sp: 'narr', text: 'Phòng phỏng vấn của trường chuyên môn nhỏ hơn {name} tưởng. Thầy phụ trách tuyển sinh lật hồ sơ chậm rãi — người đàn ông này đã phỏng vấn hàng nghìn du học sinh, và nhìn một cái là biết ai sang để học, ai sang để… ở nhờ.' },
      { sp: 'Thầy phụ trách tuyển sinh', jp: 'なぜ{当校|とうこう}で{学|まな}びたいのですか。', text: '"Vì sao bạn muốn học ở trường chúng tôi?"' },
      {
        prompt: 'Câu 1/6 — Vì sao chọn trường này?',
        choice: [
          { label: '御校の実習が多く、卒業生が現場で働いている話を聞いて、実践的に学べると感じました。オープンキャンパスで授業も見学しました。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — nêu thực hành nhiều, cựu sinh viên đi làm thật, và chính mình đã dự ngày hội trường', say: [
            { sp: 'hero', jp: '{御校|ごこう}の{実習|じっしゅう}が{多|おお}く、{卒業生|そつぎょうせい}が{現場|げんば}で{働|はたら}いている{話|はなし}を{聞|き}いて、{実践的|じっせんてき}に{学|まな}べると{感|かん}じました。オープンキャンパスで{授業|じゅぎょう}も{見学|けんがく}しました。', text: '"Tôi nghe nói trường có nhiều giờ thực hành, cựu sinh viên đang làm việc thực tế ngoài hiện trường, nên cảm thấy học ở đây rất thực tiễn. Tôi cũng đã dự giờ học trong ngày hội trường."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Đến dự giờ thật à." — thầy ghi một dấu tròn nhỏ. Du học sinh chịu đến tận nơi xem lớp học, hiếm hơn người ta tưởng.' } ] },
          { label: '学費が安いのと、家から近いからです。他の学校は調べていません。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — chọn trường vì rẻ và gần, không tìm hiểu trường nào khác', say: [
            { sp: 'hero', jp: '{学費|がくひ}が{安|やす}いのと、{家|いえ}から{近|ちか}いからです。{他|ほか}の{学校|がっこう}は{調|しら}べていません。', text: '"Vì học phí rẻ và gần nhà. Các trường khác tôi không tìm hiểu."' },
            { sp: 'narr', text: '"Hai năm đời người mà quyết bằng rẻ và gần…" Thầy không nói hết câu. Cái giá của sự hời hợt, ai cũng tự trả.' } ] },
          { label: '友達がこの学校に入るので、一緒がいいと思いました。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — vào trường vì bạn bè rủ rê', say: [
            { sp: 'hero', jp: '{友達|ともだち}がこの{学校|がっこう}に{入|はい}るので、{一緒|いっしょ}がいいと{思|おも}いました。', text: '"Vì bạn tôi vào trường này, nên tôi nghĩ học cùng nhau thì tốt."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Bạn của bạn học cho bạn được không?" — câu hỏi nhẹ như không, mà chặn đứng mọi lời bào chữa.' } ] }
        ]
      },
      { sp: 'Thầy phụ trách tuyển sinh', jp: 'アルバイトはしますか。{勉強|べんきょう}との{両立|りょうりつ}はできますか。', text: '"Bạn có đi làm thêm không? Có cân bằng được với việc học không?" — Câu này có một cái bẫy luật pháp nằm ngay ở giữa: 28 giờ một tuần.' },
      {
        prompt: 'Câu 2/6 — Làm thêm và cân bằng việc học?',
        choice: [
          { label: 'はい、週28時間以内でします。試験の前はシフトを減らして、勉強を優先します。出席率が一番大事だと分かっています。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — nắm rõ giới hạn 28 giờ/tuần, giảm ca trước kỳ thi, đặt tỷ lệ điểm danh lên đầu', say: [
            { sp: 'hero', jp: 'はい、{週|しゅう}28{時間以内|じかんいない}でします。{試験|しけん}の{前|まえ}はシフトを{減|へ}らして、{勉強|べんきょう}を{優先|ゆうせん}します。{出席率|しゅっせきりつ}が{一番大事|いちばんだいじ}だと{分|わ}かっています。', text: '"Có ạ, tôi sẽ làm trong giới hạn 28 giờ mỗi tuần. Trước kỳ thi tôi giảm ca để ưu tiên việc học. Tôi hiểu tỷ lệ điểm danh là quan trọng nhất."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: 'Thầy gật đầu chậm rãi. "28時間" và "出席率" — hai từ khóa mà bất kỳ cán bộ tuyển sinh nào cũng chờ nghe.' } ] },
          { label: 'たくさん働きたいです。週40時間ぐらいできれば、学費が楽になります。', fx: { pressure: 1, risk: 1 }, note: 'Phỏng vấn: sai — muốn làm 40 giờ/tuần, vượt trần pháp luật của visa du học', say: [
            { sp: 'hero', jp: 'たくさん{働|はたら}きたいです。{週|しゅう}40{時間|じかん}ぐらいできれば、{学費|がくひ}が{楽|らく}になります。', text: '"Tôi muốn làm thật nhiều. Nếu được khoảng 40 giờ một tuần thì học phí sẽ nhẹ gánh hơn."' },
            { sp: 'narr', text: 'Nụ cười của thầy phụ trách tắt hẳn. 40 giờ một tuần với visa du học không phải "chăm chỉ" — đó là phạm luật, và trường sẽ là nơi đầu tiên phải chịu trách nhiệm.' } ] },
          { label: 'アルバイトはしません。親が全部出してくれるので大丈夫です。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — không làm thêm vì bố mẹ lo hết (nghe thiếu tự lập, và mâu thuẫn với hồ sơ tài chính)', say: [
            { sp: 'hero', jp: 'アルバイトはしません。{親|おや}が{全部出|ぜんぶだ}してくれるので{大丈夫|だいじょうぶ}です。', text: '"Tôi không làm thêm. Bố mẹ tôi lo hết nên không sao."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Vậy à." — thầy lật sang trang chứng minh tài chính trong hồ sơ, nhìn lại con số một lần nữa, chậm hơn lần đầu.' } ] }
        ]
      },
      { sp: 'Thầy phụ trách tuyển sinh', jp: '{卒業後|そつぎょうご}は、どうする{予定|よてい}ですか。', text: '"Sau khi tốt nghiệp bạn dự định làm gì?"' },
      {
        prompt: 'Câu 3/6 — Dự định sau tốt nghiệp?',
        choice: [
          { label: '学んだ専門を生かして、日本で就職したいです。そのために在学中から資格と日本語を伸ばします。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — định hướng việc làm đúng chuyên ngành ở Nhật, gắn với việc trau dồi ngay từ khi còn học', say: [
            { sp: 'hero', jp: '{学|まな}んだ{専門|せんもん}を{生|い}かして、{日本|にほん}で{就職|しゅうしょく}したいです。そのために{在学中|ざいがくちゅう}から{資格|しかく}と{日本語|にほんご}を{伸|の}ばします。', text: '"Tôi muốn vận dụng chuyên môn đã học để xin việc tại Nhật. Vì thế ngay từ khi còn học, tôi sẽ trau dồi chứng chỉ và tiếng Nhật."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Đường đi rõ ràng." — một dấu tròn nữa. Người có đích đến hiếm khi lạc đường.' } ] },
          { label: '卒業後のことはまだ考えていません。そのとき考えます。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — chưa nghĩ gì tới sau tốt nghiệp', say: [
            { sp: 'hero', jp: '{卒業後|そつぎょうご}のことはまだ{考|かんが}えていません。そのとき{考|かんが}えます。', text: '"Chuyện sau tốt nghiệp tôi chưa nghĩ. Tới lúc đó hẵng tính."' },
            { sp: 'narr', text: 'Hai năm học phí, hai năm tuổi trẻ — và đích đến là "tới lúc đó hẵng tính". Thầy phụ trách khép nhẹ cây bút.' } ] },
          { label: 'できれば日本でずっと暮らしたいです。理由は特にありません。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — muốn ở lại Nhật vô thời hạn mà không có lý do nghề nghiệp', say: [
            { sp: 'hero', jp: 'できれば{日本|にほん}でずっと{暮|く}らしたいです。{理由|りゆう}は{特|とく}にありません。', text: '"Nếu được, tôi muốn sống ở Nhật mãi. Lý do thì không có gì đặc biệt."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Ở lại một đất nước" không phải dự định — đó là mong muốn. Trường tuyển học sinh đến học một nghề, không tuyển người đến ở.' } ] }
        ]
      },
      { sp: 'Thầy phụ trách tuyển sinh', jp: '{授業|じゅぎょう}は{全部|ぜんぶ}{日本語|にほんご}です。{専門用語|せんもんようご}も{多|おお}いですが、ついていけますか。', text: '"Giờ học hoàn toàn bằng tiếng Nhật, thuật ngữ chuyên môn rất nhiều — bạn theo kịp không?"' },
      {
        prompt: 'Câu 4/6 — Theo kịp giờ học toàn tiếng Nhật?',
        choice: [
          { label: '最初は大変だと思います。予習と復習をして、分からない言葉は授業のあとに必ず聞きます。録音の許可もお願いしたいです。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — thừa nhận khó lúc đầu, có phương pháp chuẩn bị/ôn tập/hỏi ngay, và xin phép ghi âm bài giảng', say: [
            { sp: 'hero', jp: '{最初|さいしょ}は{大変|たいへん}だと{思|おも}います。{予習|よしゅう}と{復習|ふくしゅう}をして、{分|わ}からない{言葉|ことば}は{授業|じゅぎょう}のあとに{必|かなら}ず{聞|き}きます。{録音|ろくおん}の{許可|きょか}もお{願|ねが}いしたいです。', text: '"Ban đầu chắc sẽ vất vả. Tôi sẽ chuẩn bị bài trước và ôn lại sau, từ nào không hiểu sẽ hỏi ngay sau giờ học. Tôi cũng muốn xin phép ghi âm bài giảng."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Biết trước là vất vả, và có sẵn cách đối phó — đó mới là người theo kịp được." Thầy nói, lần này có cả nụ cười.' } ] },
          { label: 'N3があるので問題ありません。専門用語もすぐ覚えられます。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — tự tin quá mức vì đã có N3', say: [
            { sp: 'hero', jp: 'N3があるので{問題|もんだい}ありません。{専門用語|せんもんようご}もすぐ{覚|おぼ}えられます。', text: '"Tôi có N3 nên không vấn đề gì. Thuật ngữ chuyên môn cũng nhớ ngay được thôi."' },
            { sp: 'narr', text: 'Thầy phụ trách ngẩng lên nhìn thẳng. "Vậy à. Thế em đọc thử dòng này trong giáo trình cho thầy nghe." — và một trang sách đầy thuật ngữ được đẩy qua bàn.' } ] },
          { label: '友達にノートを借りれば大丈夫だと思います。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — trông vào việc mượn vở bạn', say: [
            { sp: 'hero', jp: '{友達|ともだち}にノートを{借|か}りれば{大丈夫|だいじょうぶ}だと{思|おも}います。', text: '"Mượn vở của bạn chắc là ổn thôi ạ."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Vở của bạn, bằng của bạn. Hai thứ đó không đi cùng nhau được đâu." — câu nói khô khốc rơi xuống giữa bàn.' } ] }
        ]
      },
      { sp: 'Thầy phụ trách tuyển sinh', jp: '{学費|がくひ}の{支払|しはら}いの{計画|けいかく}はどうなっていますか。', text: '"Kế hoạch đóng học phí của bạn thế nào?" — Câu hỏi về tiền, nhưng thứ bị kiểm tra là tính toán, không phải giàu nghèo.' },
      {
        prompt: 'Câu 5/6 — Kế hoạch học phí?',
        choice: [
          { label: '親からの仕送りと、28時間以内のアルバイトで計画しています。明細も作ってあります。無理な月は早めに学校に相談します。', fx: { jp: 2 }, note: 'Phỏng vấn: đúng — kế hoạch rõ từ tiền gia đình + làm thêm đúng trần, có bảng tính, và kênh trao đổi khi tháng khó khăn', say: [
            { sp: 'hero', jp: '{親|おや}からの{仕送|しおく}りと、28{時間以内|じかんいない}のアルバイトで{計画|けいかく}しています。{明細|めいさい}も{作|つく}ってあります。{無理|むり}な{月|つき}は{早|はや}めに{学校|がっこう}に{相談|そうだん}します。', text: '"Tôi dự tính bằng tiền gia đình gửi sang và làm thêm trong giới hạn 28 giờ. Tôi cũng đã lập bảng tính chi tiết. Tháng nào khó khăn, tôi sẽ trao đổi với nhà trường sớm."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: 'Thầy xem qua bảng tính được đẩy qua bàn — từng tháng, từng khoản. "Du học sinh mà tính được thế này thì ít khi bỏ học giữa chừng."' } ] },
          { label: '何とかします。お金が足りなければ、もっと働きます。', fx: { pressure: 1, risk: 1 }, note: 'Phỏng vấn: sai — "sẽ xoay xở", thiếu tiền thì làm thêm vượt giờ', say: [
            { sp: 'hero', jp: '{何|なん}とかします。お{金|かね}が{足|た}りなければ、もっと{働|はたら}きます。', text: '"Tôi sẽ xoay xở được. Nếu thiếu tiền thì làm thêm nhiều hơn."' },
            { sp: 'narr', text: '"Motto hatarakimasu" — thầy nhắc lại ba chữ ấy như nhắc một bản án. Với du học sinh, "làm thêm nhiều hơn" là con đường ngắn nhất tới buổi chia tay ở sân bay.' } ] },
          { label: '学費のことは親に聞いてください。私は知りません。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — đẩy toàn bộ chuyện tiền nong cho bố mẹ, bản thân không biết gì', say: [
            { sp: 'hero', jp: '{学費|がくひ}のことは{親|おや}に{聞|き}いてください。{私|わたし}は{知|し}りません。', text: '"Chuyện học phí xin thầy hỏi bố mẹ tôi. Tôi không biết."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Người ngồi trong phòng này là em, không phải bố mẹ em." — nhẹ nhàng, và không thể cãi.' } ] }
        ]
      },
      { sp: 'Thầy phụ trách tuyển sinh', jp: '{最後|さいご}に、{何|なに}か{聞|き}きたいことはありますか。', text: '"Cuối cùng, bạn có muốn hỏi điều gì không?"' },
      {
        prompt: 'Câu 6/6 — Hỏi ngược nhà trường:',
        choice: [
          { label: '留学生の先輩から話を聞く機会はありますか。進路の相談は担任の先生にできますか。', fx: { jp: 1 }, note: 'Phỏng vấn: đúng — hỏi cơ hội gặp senpai du học sinh và kênh tư vấn hướng nghiệp với giáo viên chủ nhiệm', say: [
            { sp: 'hero', jp: '{留学生|りゅうがくせい}の{先輩|せんぱい}から{話|はなし}を{聞|き}く{機会|きかい}はありますか。{進路|しんろ}の{相談|そうだん}は{担任|たんにん}の{先生|せんせい}にできますか。', text: '"Có cơ hội được nghe các anh chị du học sinh khóa trước chia sẻ không ạ? Việc tư vấn hướng đi sau này, em có thể trao đổi với giáo viên chủ nhiệm không ạ?"' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"Có chứ. Tháng sau có buổi gặp mặt du học sinh…" — thầy vừa trả lời vừa viết nốt dòng cuối vào hồ sơ, nét chữ nhẹ hẳn đi.' } ] },
          { label: '特にありません。早く結果が知りたいです。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — không hỏi gì, chỉ nôn nóng biết kết quả', say: [
            { sp: 'hero', jp: '{特|とく}にありません。{早|はや}く{結果|けっか}が{知|し}りたいです。', text: '"Không có gì đặc biệt ạ. Em chỉ muốn biết kết quả sớm."' },
            { sp: 'narr', text: 'Thầy gật đầu cho qua, nhưng dấu tròn thứ ba đã không xuất hiện. Người không tò mò về nơi mình sắp sống hai năm — khó tin là họ đã nghĩ kỹ.' } ] },
          { label: '休みはどれぐらいありますか。欠席しても大丈夫な日数を教えてください。', fx: { pressure: 1 }, note: 'Phỏng vấn: sai — hỏi ngày nghỉ và số buổi được phép vắng', say: [
            { sp: 'hero', jp: '{休|やす}みはどれぐらいありますか。{欠席|けっせき}しても{大丈夫|だいじょうぶ}な{日数|にっすう}を{教|おし}えてください。', text: '"Một năm được nghỉ bao nhiêu ngày ạ? Cho em biết số buổi vắng vẫn an toàn ạ."' },
            { sp: 'Thầy phụ trách tuyển sinh', text: '"…" Câu hỏi về giới hạn vắng mặt, hỏi trước cả buổi học đầu tiên. Thầy không trả lời ngay — và sự im lặng ấy chính là câu trả lời.' } ] }
        ]
      },
      { sp: 'narr', text: 'Buổi phỏng vấn kết thúc bằng cái cúi chào ở cửa. Xuống cầu thang, {name} mới nhận ra lưng áo mình ướt một mảng mồ hôi. Sáu câu hỏi — mỗi câu là một lần tiếng Nhật phải đứng vững thay cho cả tương lai hai năm tới.' }
    ]
  }
,
  /* ================= NYUKAN — NỘP HỒ SƠ ĐỔI TƯ CÁCH ================= */
  'ch3-nyukan': {
    scene: '🛂 Nyukan — nộp hồ sơ đổi tư cách lưu trú',
    branch: [
      { sp: 'narr', text: 'Tòa nhà nyukan buổi sáng đông nghẹt, mùi giấy tờ và tiếng máy in chạy không nghỉ. Số thứ tự A-047. {name} ôm chặt bìa hồ sơ — bên trong là cả chặng đường vừa đi qua: kết quả phỏng vấn, hợp đồng (hoặc giấy báo nhập học), giấy tờ thuế.' },
      { sp: 'Cán bộ nyukan', jp: '{在留資格変更許可申請|ざいりゅうしかくへんこうきょかしんせい}ですね。{書類|しょるい}を{全部|ぜんぶ}お{出|だ}しください。', text: '"Hồ sơ xin đổi tư cách lưu trú phải không ạ. Xin anh/chị xuất trình toàn bộ giấy tờ."' },
      {
        prompt: 'Đưa hồ sơ thế nào cho đúng phép ở quầy thủ tục Nhật?',
        choice: [
          { label: 'Đưa bằng hai tay, từng tập đã kẹp gọn theo thứ tự danh mục', fx: { jp: 2 }, note: 'Nyukan: hồ sơ đưa hai tay, sắp xếp gọn gàng — cán bộ gật đầu nhận ngay', say: [
            { sp: 'narr', text: '{name} đứng thẳng, đưa từng tập hồ sơ bằng hai tay: đơn xin, hợp đồng, giấy chứng nhận thuế, bảng lương. Cán bộ lật vài trang, không phải hỏi lại một lần nào về thứ tự giấy tờ.' },
            { sp: 'Cán bộ nyukan', jp: '{書類|しょるい}はよく{揃|そろ}っていますね。{審査|しんさ}には{一|いっ}か{月|げつ}ほどかかります。', text: '"Hồ sơ của anh/chị chuẩn bị rất đầy đủ. Việc xét duyệt mất khoảng một tháng."' } ] },
          { label: 'Để cả bìa hồ sơ lên quầy rồi đẩy về phía cán bộ', fx: { pressure: 1 }, note: 'Nyukan: để hồ sơ cẩu thả lên quầy — cán bộ lặng lẽ yêu cầu sắp xếp lại từ đầu', say: [
            { sp: 'narr', text: 'Bìa hồ sơ trượt trên mặt quầy, mấy tờ giấy lệch ra ngoài. Cán bộ không nói gì nặng — chỉ đẩy nhẹ trả lại kèm một tờ danh mục: "Xin anh/chị sắp xếp theo thứ tự này rồi nộp lại." Hàng người phía sau khẽ xì xào; {name} đỏ mặt làm lại từ đầu.' } ] }
        ]
      },
      { sp: 'Cán bộ nyukan', jp: '{昨年|さくねん}の{税金|ぜいきん}と{年金|ねんきん}は、{全部|ぜんぶ}{払|はら}いましたか。{証明書|しょうめいしょ}はありますか。', text: '"Thuế và nenkin năm ngoái anh/chị đã nộp đủ chưa? Có giấy chứng nhận không?"' },
      {
        prompt: 'Cán bộ hỏi về thuế và nenkin — sự thật là {name} còn thiếu một giấy chứng nhận thuế (chưa kịp xin ở shiyakusho). Trả lời sao?',
        choice: [
          { label: 'Nói thật ngay: còn thiếu đúng giấy đó, hỏi hạn bổ sung', fx: { jp: 2 }, note: 'Nyukan: thành thật khai thiếu giấy chứng nhận thuế — được ghi chú cho bổ sung trong hai tuần, không bị đánh trượt', say: [
            { sp: 'hero', jp: '{課税証明書|かぜいしょうめいしょ}だけ、まだ{取|と}れていません。{正直|しょうじき}にお{伝|つた}えします。{二週間以内|にしゅうかんいない}に{追加|ついか}で{出|だ}せます。', text: '"Chỉ còn giấy chứng nhận thuế là tôi chưa xin được. Tôi xin nói thật. Trong vòng hai tuần tôi có thể nộp bổ sung."' },
            { sp: 'Cán bộ nyukan', jp: 'わかりました。では、こちらに{期限|きげん}を{書|か}きます。{必|かなら}ず{守|まも}ってください。{隠|かく}すより、{先|さき}に{言|い}うほうが{審査|しんさ}は{早|はや}いんですよ。', text: '"Tôi rõ rồi. Tôi ghi hạn chót vào đây. Xin nhớ giữ đúng hạn. Khai trước thay vì giấu — hồ sơ lại được xét nhanh hơn đấy."' } ] },
          { label: 'Nói "đủ hết rồi ạ" và hy vọng họ không kiểm tra kỹ', fx: { risk: 2, pressure: 2 }, note: 'Nyukan: nói dối là đã nộp đủ giấy tờ — cán bộ đối chiếu hệ thống và phát hiện ngay', say: [
            { sp: 'hero', jp: '{全部|ぜんぶ}{揃|そろ}っています。{大丈夫|だいじょうぶ}です。', text: '"Đủ hết rồi ạ. Không sao đâu ạ."' },
            { sp: 'narr', text: 'Cán bộ gõ bàn phím mười giây. Màn hình không nói dối: thiếu đúng một giấy. "Anh/chị kiểm tra lại giúp tôi." — giọng vẫn đều đều, nhưng từ giây đó, mọi câu trả lời của {name} đều bị nghe bằng đôi tai khác hẳn. Hồ sơ không trượt — nhưng niềm tin thì vừa rạn một đường.' } ] }
        ]
      },
      { sp: 'Cán bộ nyukan', jp: '{審査結果|しんさけっか}は、はがきで{通知|つうち}します。はがきが{届|とど}いたら、{収入印紙|しゅうにゅういんし}を{買|か}って、{新|あたら}しい{在留|ざいりゅう}カードを{受|う}け{取|と}りに{来|き}てください。', text: '"Kết quả xét duyệt sẽ được báo bằng bưu thiếp. Khi bưu thiếp tới, anh/chị mua tem lệ phí (収入印紙） rồi đến nhận thẻ lưu trú mới."' },
      { sp: 'narr', text: 'Ra khỏi tòa nhà, nắng trưa rọi thẳng xuống bậc thềm. {name} chụp ảnh lại tờ biên nhận nộp hồ sơ, gửi về nhóm gia đình kèm một dòng: "Đã nộp. Giờ là chờ." Bên dưới, mẹ thả một tràng biểu tượng trái tim. Chặng đường mới — chính thức bắt đầu bằng một tờ biên nhận mỏng tang.' }
    ]
  },

  /* ================= QUYẾT ĐỊNH VỀ NƯỚC ================= */
  'ch3-ve-nuoc': {
    scene: '✈️ Tiếng cuối cùng — về hay ở',
    branch: [
      { sp: 'narr', text: 'Một đêm suy nghĩ. {name} mở điện thoại: ảnh chụp cả nhà ngày tiễn ở sân bay Nội Bài vẫn là hình nền. Ở đầu dây bên kia là một mái nhà đã xa hơn hai năm — và ở đầu dây bên này là một tương lai chưa kịp thành hình.' },
      { sp: 'Mẹ (điện thoại)', text: '"Con à, mẹ nói thật lòng: nhà mình không ai ép con ở lại. Con khỏe, con vui là nhà mừng rồi. Tiền bạc thiếu đủ tính sau — người ta có cả đời để kiếm, có mỗi cái thân này là không kiếm lại được thôi."' },
      { sp: 'Bố (điện thoại)', text: '"Bố thì bố nghĩ thế này: đi được đến đây là con đã hơn bố cả một trời rồi. Về thì về cho đàng hoàng, đầu ngẩng cao — chả có gì phải xấu hổ với ai. Quyết đi con, nhà luôn có cơm chờ."' },
      { sp: 'narr', text: 'Cuộc gọi kết thúc. Căn phòng trọ im ắng đến mức nghe rõ tiếng tủ lạnh chạy. Sáng hôm sau, {name} trở lại văn phòng trường, đứng trước cửa phòng thầy Khánh — trong lòng đã có câu trả lời cuối cùng.' },
      {
        prompt: 'Đẩy cửa bước vào. Câu trả lời của {name} là…',
        choice: [
          { label: 'Về nước — quyết rồi, về cho đàng hoàng', fx: { love: 2, pressure: -2 }, note: 'Kết thúc sớm: chốt quyết định về nước ở Chương 3', say: [
            { sp: 'Thầy Khánh', text: '"…Thầy nghe rồi." Thầy Khánh tháo kính, day sống mũi, rồi gật đầu thật chậm. "Vậy thầy giúp {call} làm trọn vẹn: rút hồ sơ đúng phép, nenkin lấy lại phần hoàn trả, hủy hợp đồng phòng — đi thế nào thì về cũng phải tươm tất thế ấy. Người Nhật quý nhất là người biết khép lại đàng hoàng."' },
            { sp: 'narr', text: 'Thầy bắt tay {name} — cái bắt tay của hai người đàn ông/đồng nghiệp hơn là thầy trò. "Về rồi mà nhớ tiếng Nhật, thì tiếng Nhật không bỏ mình đâu. Nó sẽ nuôi {call} theo một cách khác."' } ] },
          { label: 'Khoan đã — cho mình suy nghĩ lại từ đầu', flag: 'saga-route', value: 'reset', fx: { pressure: 1 }, note: 'Đổi ý phút chót: quay lại chọn ngã rẽ khác', say: [
            { sp: 'Thầy Khánh', text: 'Thầy Khánh bật cười lớn: "Ha! Đứng trước cửa phòng thầy mà quay xe — thế mới là thanh niên. Thôi được, quyết định cả đời người thì cho phép đổi ý đúng một lần này. Về suy nghĩ lại cho kỹ: ở lại đi đường nào, nói thầy nghe."' },
            { sp: 'narr', text: '{name} ra về với tờ lịch chưa khoanh thêm nét nào. Có những quyết định không phải để trốn — mà để khi quyết rồi, không còn ngoảnh lại.' } ] }
        ]
      }
    ]
  },

  /* ================= KẾT CỤC 6 — VỀ QUÊ ================= */
  'ket-ve-que': {
    scene: '🏠 Kết cục — Về quê (kết thúc sớm, Chương 3)',
    branch: [
      { sp: 'narr', text: 'Chuyến bay đêm đáp xuống Nội Bài. Sân bay quê nhà ồn ào, ấm và đầy tiếng Việt — thứ âm thanh mà hai năm qua {name} chỉ được nghe qua màn hình điện thoại. Bố đứng chờ ở cửa ra, già đi một chút, cười nhiều hơn một chút. Mẹ ôm chầm lấy, câu đầu tiên không phải "kiếm được bao nhiêu" — mà là "gầy đi rồi đấy".' },
      { sp: 'narr', text: 'Ba tháng sau. {name} không ngồi chơi: tiếng Nhật và kinh nghiệm hai năm xứ người biến thành một công việc thật — dạy kèm tiếng Nhật cho lứa đàn em sắp sang, nhận thêm việc dịch tài liệu cho một công ty có vốn Nhật ở khu công nghiệp gần nhà. Thu nhập không bằng bên kia, nhưng mỗi tối được ăn cơm nhà.' },
      { sp: 'narr', text: 'Có những chiều, điện thoại lại sáng lên tin nhắn từ nước Nhật xa: chị Mai hỏi thăm, thầy Khánh gửi một đường link tuyển dụng "để dành, biết đâu đấy". {name} mỉm cười trả lời — quá khứ ấy không phải đoạn đời bỏ đi; nó là hành trang.' },
      { sp: 'narr', text: '🌅 KẾT CỤC 6 — «VỀ QUÊ». Không phải ai đi xa cũng phải ở lại mới gọi là thành công. Có người mang nước Nhật về nhà trong vốn tiếng, trong nếp làm việc, trong cách cúi chào và giữ lời hứa — và xây đời mình ngay trên mảnh đất đã sinh ra mình. Câu chuyện của {name} khép lại ở đây: không dang dở, chỉ là rẽ sang một con đường khác — con đường có cơm nhà mỗi tối. (Đạt được bằng lựa chọn của chính bạn ở ngã rẽ Chương 3. Chơi lại và chọn ở lại, để xem những kết cục khác mở ra thế nào.)' }
    ]
  }
,
  /* ================= NGÀNH KAIGO — chuỗi 3 cảnh + chuyện phiếm ================= */
  'ind-kaigo-1': {
    scene: '🏥 Kaigo — buổi sáng đầu tiên ở viện dưỡng lão',
    wrong: {
      0: [
        '{私|わたし}は{初|はじ}めて{来|き}ました、よろしくします。{手伝|てつだ}います。',
        '{体調|たいちょう}は{私|わたし}が{聞|き}きます、{答|こた}えてくださいします。'
      ],
      1: [
        '{水|みず}を{飲|の}みたいですか{私|わたし}は{今|いま}{持|も}ちます。',
        'お{水|みず}は{飲|の}みますか{喉|のど}は{私|わたし}が{乾|かわ}きましたか。'
      ],
      2: [
        '{朝|あさ}ごはんは{好|す}きですかを{私|わたし}が{聞|き}きます。',
        '{口|くち}に{私|わたし}はごはんを{速|はや}く{入|い}れますね。'
      ]
    },
    lines: [
      { sp: 'Chị Mai', jp: 'おはよう。{今日|きょう}からよろしくね。まず{利用者|りようしゃ}さんへの{挨拶|あいさつ}は、{目線|めせん}を{合|あ}わせて、ゆっくり、{笑顔|えがお}で。これが{介護|かいご}の{最初|さいしょ}の{技術|ぎじゅつ}よ。', vi: 'Chào em. Từ hôm nay làm cùng nhau nhé. Trước hết, chào hỏi người cao tuổi thì phải ngang tầm mắt, chậm rãi, mỉm cười. Đó là kỹ thuật đầu tiên của nghề kaigo đấy.' },
      { sp: 'hero', jp: 'おはようございます。{今日|きょう}からお{世話|せわ}になります。ご{指導|しどう}、よろしくお{願|ねが}いいたします。', vi: 'Chào chị buổi sáng. Từ hôm nay em được mọi người giúp đỡ. Mong chị chỉ dạy cho em ạ.' },
      { sp: 'Chị Mai', jp: 'いい{挨拶|あいさつ}。じゃあ、ハルさんの{体調確認|たいちょうかくにん}から。{声|こえ}のかけ{方|かた}、{見|み}ていてね。ハルさん、おはようございます。{昨夜|ゆうべ}はよく{眠|ねむ}れましたか。', vi: 'Chào hỏi tốt đấy. Vậy bắt đầu từ việc kiểm tra sức khỏe cụ Haru nhé. Xem cách chị hỏi thăm này. Cụ Haru, chào buổi sáng ạ. Đêm qua cụ ngủ có ngon không ạ?' },
      { sp: 'Cụ Haru', jp: 'おはよう。{眠|ねむ}れたよ、{夢|ゆめ}も{見|み}なかった。あんた、{新|あたら}しい{人|ひと}かい。{優|やさ}しそうな{顔|かお}だねえ。', vi: 'Chào cháu. Ngủ được, cũng chẳng mơ gì. Cháu là người mới hả? Trông mặt hiền lành đấy.' },
      { sp: 'hero', jp: 'ハルさん、おはようございます。{今朝|けさ}の{体調|たいちょう}はいかがですか。{熱|ねつ}っぽさや、{痛|いた}いところはありませんか。', vi: 'Cụ Haru, chào buổi sáng ạ. Sáng nay sức khỏe của cụ thế nào ạ? Có thấy sốt hay đau ở đâu không ạ?' },
      { sp: 'Cụ Haru', jp: '{大丈夫|だいじょうぶ}、{大丈夫|だいじょうぶ}。{膝|ひざ}が{少|すこ}し{重|おも}いくらいだ。あんたの{声|こえ}、{聞|き}きやすいね。{外国|がいこく}の{人|ひと}は{丁寧|ていねい}だねえ。', vi: 'Ổn, ổn mà. Chỉ hơi nặng đầu gối chút thôi. Giọng cháu dễ nghe đấy. Người nước ngoài mà lễ phép nhỉ.' },
      { sp: 'Chị Mai', jp: 'じゃあ{朝食|ちょうしょく}の{介助|かいじょ}。ハルさん、{喉|のど}が{渇|かわ}いていませんかって、{先|さき}に{水|みず}のこと、{聞|き}いてみて。', vi: 'Giờ tới hỗ trợ ăn sáng. Trước tiên hỏi cụ có khát nước không — em thử hỏi xem.' },
      { sp: 'hero', jp: 'ハルさん、{朝食|ちょうしょく}の{前|まえ}に、お{水|みず}を{少|すこ}し{飲|の}みませんか。{喉|のど}が{潤|うるお}うと、{食|た}べやすくなります。', vi: 'Cụ Haru, trước bữa sáng, cụ uống một chút nước nhé? Cổ họng ẩm thì ăn sẽ dễ hơn ạ.' },
      { sp: 'Cụ Haru', jp: 'おお、{気|き}が{利|き}くねえ。じゃあ{少|すこ}しもらおうか。…うん、{美味|おい}しい。ただの{水|みず}なのにねえ。', vi: 'Ồ, chu đáo đấy. Vậy cho cụ một chút. …Ừm, ngon. Chỉ là nước lọc thôi mà.' },
      { sp: 'Chị Mai', jp: '{食|た}べる{速|はや}さは、その{人|ひと}のペース。{急|いそ}がせるのが{一番|いちばん}いけない。ハルさん、{今日|きょう}のおかゆ、{味|あじ}はどうですか。', vi: 'Tốc độ ăn là theo nhịp của từng người. Giục giã là điều cấm kỵ nhất. Cụ Haru, cháo hôm nay vị thế nào ạ?' },
      { sp: 'hero', jp: 'ハルさん、{一口|ひとくち}ずつでいいですよ。{熱|あつ}いので、ふうふうしてから{食|た}べてくださいね。', vi: 'Cụ Haru, cứ từng miếng một thôi ạ. Cháo còn nóng, cụ thổi nguội rồi hẵng ăn nhé.' },
      { sp: 'Cụ Haru', jp: 'あんたが{来|き}て、この{部屋|へや}が{明|あか}るくなったよ。{明日|あした}も{来|き}ておくれ。', vi: 'Cháu tới là căn phòng này sáng hẳn lên. Mai lại tới nhé.' }
    ],
    outro: 'Một buổi sáng trôi qua bằng những câu nói nhỏ: hỏi thăm giấc ngủ, mời ngụm nước, chờ một miếng cháo. {name} chợt hiểu nghề kaigo không bắt đầu bằng kỹ thuật — nó bắt đầu bằng việc người già chịu mở lời với mình. Và hôm nay, cụ Haru đã mở lời.'
  },

  'ind-kaigo-2': {
    scene: '🌙 Kaigo — đêm trực và nỗi nhớ nhà của cụ Yamada',
    branch: [
      { sp: 'narr', text: 'Ca tối. Hành lang viện chỉ còn ánh đèn vàng nhạt. Cụ Yamada — người cả tháng nay ít nói — đang ngồi xe lăn trước cửa phòng, áo khoác mặc sẵn, tay ôm một chiếc túi vải cũ. "Đêm nay tôi về nhà. Con gái tôi đang đợi cơm." Vấn đề là: nhà cũ của cụ đã bán từ ba năm trước, và con gái cụ sống tận Hokkaido.' },
      { sp: 'Chị Mai', text: '"Đây gọi là 帰宅願望 — nỗi muốn về nhà của người lẫn. Đừng cãi đúng sai với cụ, vô ích và tàn nhẫn. Nghe cụ trước đã. {name}, em thử nói chuyện với cụ xem."' },
      {
        prompt: 'Cụ Yamada nhất quyết đòi về nhà lúc nửa đêm. {name} xử lý thế nào?',
        choice: [
          { label: 'Ngồi xuống ngang tầm mắt, nghe cụ kể về ngôi nhà cũ rồi mời cụ chén trà ấm', fx: { love: 2, jp: 1 }, note: 'Kaigo: dùng kỹ thuật lắng nghe với hội chứng muốn về nhà — cụ Yamada dịu lại', say: [
            { sp: 'hero', jp: 'ヤマダさん、{家|いえ}の{話|はなし}、{聞|き}かせてください。どんな{家|いえ}だったんですか。{奥|おく}さんのごはん、{何|なに}が{一番美味|いちばんおい}しかったですか。', text: '"Cụ Yamada, cụ kể cho cháu nghe về ngôi nhà của cụ đi ạ. Ngôi nhà ấy thế nào ạ? Trong các món phu nhân nấu, món nào ngon nhất ạ?"' },
            { sp: 'Ông Yamada', text: '"…Canh miso với ngao. Bà ấy nấu canh miso ngao ngon lắm. Nhà tôi có cây hồng trước sân — mùa này chắc chín rồi…" Giọng cụ chậm dần. Chiếc túi vải trên tay nới lỏng ra.' },
            { sp: 'narr', text: '{name} pha một ấm trà ấm, rót mời cụ. Hơn một tiếng sau, cụ tự nói: "Muộn rồi nhỉ. Thôi, mai về cũng được." — và chịu để đẩy xe về phòng. Không ai thắng cụ trong một cuộc cãi lý. Cụ chỉ cần một người chịu ngồi xuống nghe.' },
            { sp: 'Chị Mai', text: '"Đêm nay em vừa làm được việc mà nhiều người làm nghề năm năm chưa làm được." Chị Mai nói khẽ, ghi vào sổ bàn giao một dòng dài.' } ] },
          { label: 'Gọi video cho con gái cụ ở Hokkaido để cụ nghe giọng người thân', fx: { love: 1, jp: 1 }, note: 'Kaigo: kết nối cụ Yamada với con gái qua cuộc gọi video — cụ yên lòng đi ngủ', say: [
            { sp: 'narr', text: 'Màn hình sáng lên giữa hành lang đêm. Khuôn mặt người con gái hiện ra, ngái ngủ mà mừng rỡ: "Bố! Bố chưa ngủ à?" Cụ Yamada nhìn chằm chằm, tay run run chạm lên màn hình.' },
            { sp: 'Ông Yamada', text: '"…À, con đấy à. Bố tưởng con đợi cơm. Ừ, bố ăn rồi. Con ngủ đi, lạnh thế này…" Cuộc gọi ngắt. Cụ ngáp dài — nỗi nhớ nhà, hóa ra, chỉ cần một giọng nói thật là dịu xuống.' } ] },
          { label: 'Nói thẳng: "Nhà cụ bán rồi, con gái cụ ở Hokkaido, giờ phải đi ngủ"', fx: { pressure: 2, love: -1 }, note: 'Kaigo: nói thẳng sự thật trần trụi với cụ lẫn — cụ kích động, cả ca trực vất vả', say: [
            { sp: 'narr', text: 'Sự thật — nói sai cách — trở thành một nhát dao. Cụ vùng dậy, giọng lạc đi: "Nói dối! Nhà tôi vẫn ở đó!" Cả hành lang sáng đèn. Mất thêm hai tiếng, với sự giúp sức của cả ca trực, cụ mới dịu lại trong nước mắt. Chị Mai không trách, chỉ nói một câu:' },
            { sp: 'Chị Mai', text: '"Với người lẫn, đúng sự thật không quan trọng bằng đúng cảm xúc. Nhớ lấy đêm nay — nó đáng giá hơn mười buổi học."' } ] }
        ]
      },
      { sp: 'narr', text: 'Đèn phòng cụ Yamada tắt lúc gần sáng. {name} ngồi ghi sổ bàn giao ca đêm, tay vẫn còn hơi run — không phải vì mệt, mà vì lần đầu tiên chạm tới phần sâu nhất của nghề này: chăm một con người, không phải một ca bệnh.' }
    ]
  },

  'ind-kaigo-3': {
    scene: '🌸 Kaigo — bước đi đầu tiên sau ba tháng',
    branch: [
      { sp: 'narr', text: 'Ba tháng sau ngày tai biến nhẹ, hôm nay cụ Haru tập đi lại buổi đầu tiên: từ giường tới cửa sổ — quãng đường bốn mét mà cả phòng hồi hộp như xem một cuộc thi.' },
      { sp: 'Chị Mai', text: '"{name} dẫn cụ hôm nay. Nhớ: đi bên phía yếu hơn, tay để cụ vịn — không bế, không kéo. Cụ tự đi được bước nào, bước đó là của cụ."' },
      { sp: 'hero', jp: 'ハルさん、{今日|きょう}は{窓|まど}まで{歩|ある}いてみましょう。{私|わたし}の{腕|うで}につかまってください。{一歩|いっぽ}ずつ、{焦|あせ}らなくて{大丈夫|だいじょうぶ}です。', text: '"Cụ Haru, hôm nay mình thử đi tới cửa sổ nhé. Cụ vịn vào tay cháu đây ạ. Từng bước một thôi, không cần vội ạ."' },
      { sp: 'Cụ Haru', text: '"…Được. Đi." — Bước một. Bước hai. Đến bước thứ ba, đầu gối cụ run lên bần bật. Cả căn phòng nín thở.' },
      {
        prompt: 'Cụ Haru lảo đảo ở bước thứ ba, cách cửa sổ còn hai mét…',
        choice: [
          { label: 'Giữ chắc tay cụ, nói câu động viên cụ vẫn thích nghe và đi nốt cùng cụ', fx: { love: 2, hp: -1 }, note: 'Kaigo: đỡ cụ Haru đi hết bốn mét đầu tiên sau ba tháng — cả phòng vỗ tay', say: [
            { sp: 'hero', jp: 'あと{少|すこ}しです、ハルさん。{窓|まど}の{外|そと}、{桜|さくら}が{咲|さ}き{始|はじ}めましたよ。{見|み}に{行|い}きましょう。', text: '"Còn một chút nữa thôi cụ Haru. Ngoài cửa sổ, hoa anh đào bắt đầu nở rồi đấy ạ. Mình đi xem nào."' },
            { sp: 'narr', text: 'Bước bốn. Bước năm. Tay cụ bám chặt tay {name} — rồi cửa sổ hiện ra trước mặt, và cả một trời hoa anh đào hồng nhạt. Cụ Haru đứng lặng rất lâu, nước mắt chảy mà miệng thì cười: "Tôi… tự đi được rồi." Tiếng vỗ tay vang khắp phòng bệnh.' } ] },
          { label: 'Cho cụ ngồi nghỉ ngay — an toàn là trên hết, mai tập tiếp', fx: { jp: 1 }, note: 'Kaigo: chọn an toàn, cho cụ nghỉ giữa chừng — cụ hơi tiếc nhưng hiểu', say: [
            { sp: 'narr', text: '"Thôi, hôm nay tới đây." {name} đỡ cụ ngồi xuống ghế đã kéo sẵn. Cụ Haru thở hổn hển, nhìn hai mét còn lại đầy tiếc nuối — rồi gật đầu: "Mai đi tiếp, hứa đấy." An toàn không lãng mạn, nhưng là điều giữ cho ngày mai còn có thể.' } ] }
        ]
      },
      { sp: 'Chị Mai', text: '"Hôm nay đến lượt {name} ghi sổ 記録 và báo cáo trong buổi họp ca đấy. Viết và nói như những gì em làm — đừng thêm, đừng bớt."' },
      { sp: 'hero', jp: '{報告|ほうこく}します。ハルさんは{今日|きょう}、{介助|かいじょ}ありで4メートル{歩行|ほこう}できました。{表情|ひょうじょう}も{明|あか}るく、{食欲|しょくよく}も{良好|りょうこう}です。', text: '"Tôi xin báo cáo. Hôm nay cụ Haru đã đi được bốn mét với sự hỗ trợ. Sắc mặt cụ tươi tắn, ăn uống cũng tốt ạ."' },
      { sp: 'narr', text: 'Buổi chiều, cụ Haru nhờ {name} một việc riêng: viết giúp cụ một lá thư cho đứa cháu ngoại sắp vào đại học — chữ cụ run, mà ý thì rõ từng lời. Viết xong, cụ ký tên ở cuối thư, tay run run, nét nào ra nét nấy. "Cảm ơn cháu. Ở cái tuổi này, còn được người ta cần tới — quý lắm."' }
    ]
  },

  'talk-kaigo': {
    scene: '🍵 Chuyện phiếm giờ nghỉ — phòng sinh hoạt viện dưỡng lão',
    wrong: {
      0: [
        '{仕事|しごと}はもう{慣|な}れます、{全然|ぜんぜん}{平気|へいき}ですします。',
        '{足|あし}は{私|わたし}が{痛|いた}い{体|からだ}ですから{座|すわ}りますね。'
      ]
    },
    lines: [
      { sp: 'Chị Mai', jp: '{午前中|ごぜんちゅう}おつかれさま。{立|た}ちっぱなしで{足|あし}が{痛|いた}いでしょ。はい、お{茶|ちゃ}。{少|すこ}し{座|すわ}りなさい。', vi: 'Cả buổi sáng vất vả rồi. Đứng suốt chắc đau chân lắm nhỉ. Này, trà đây. Ngồi xuống một chút đi.' },
      { sp: 'hero', jp: 'ありがとうございます。{正直|しょうじき}、まだ{体|からだ}が{慣|な}れていなくて、{家|いえ}に{帰|かえ}るとすぐ{寝|ね}てしまいます。', vi: 'Em cảm ơn chị. Nói thật là người em vẫn chưa quen, về tới nhà là ngủ thiếp đi luôn.' },
      { sp: 'Chị Mai', jp: 'それ、みんな{同|おな}じ。{私|わたし}も{最初|さいしょ}はそうだった。でもね、この{仕事|しごと}は{体|からだ}より{先|さき}に、{心|こころ}が{慣|な}れるの。ハルさん、あなたのこと{気|き}に{入|い}ったみたいよ。', vi: 'Ai cũng thế cả. Hồi mới vào chị cũng vậy. Nhưng này, nghề này thì trái tim quen trước cơ thể đấy. Cụ Haru có vẻ quý em rồi đấy.' },
      { sp: 'hero', jp: 'ハルさんの{笑顔|えがお}を{見|み}ると、{疲|つか}れが{飛|と}びます。{不思議|ふしぎ}ですね。', vi: 'Nhìn thấy cụ Haru cười là mệt mỏi của em bay hết. Lạ thật đấy chị.' },
      { sp: 'Chị Mai', jp: '{不思議|ふしぎ}じゃないのよ。それがこの{仕事|しごと}の{給料|きゅうりょう}より{高|たか}い{部分|ぶぶん}。{大事|だいじ}にしなさいね。', vi: 'Không lạ đâu. Đó là phần "lương" cao hơn cả lương của nghề này đấy. Nhớ trân trọng nhé.' }
    ],
    outro: 'Chén trà nóng giữa ca trực — và một câu nói của chị Mai mà {name} sẽ nhớ rất lâu: lương của nghề kaigo có một phần không nằm trong phong bì.'
  },

  /* ================= NGÀNH NHÀ HÀNG — chuỗi 3 cảnh + chuyện phiếm ================= */
  'ind-nha-hang-1': {
    scene: '🍳 Bếp nhà hàng — buổi sáng của người học việc',
    wrong: {
      0: [
        'おはようございます。{元気|げんき}に{今日|きょう}も、{私|わたし}は{来|き}ます。',
        '{注文|ちゅうもん}を{私|わたし}は{今|いま}{聞|き}き{始|はじ}めますねします。'
      ],
      1: [
        '{新|あたら}しい{包丁|ほうちょう}は{私|わたし}が{使|つか}いたいですから{貸|か}しますか。',
        '{指|ゆび}を{私|わたし}はよく{切|き}りますので、{包丁|ほうちょう}は{嫌|きら}いです。'
      ],
      2: [
        '{味|あじ}は{私|わたし}がおいしいと{思|おも}い{感|かん}じます{多分|たぶん}です。',
        '{塩|しお}が{私|わたし}は{足|た}りますか{分|わ}かりません{食|た}べます。'
      ]
    },
    lines: [
      { sp: 'Bếp trưởng Sato', jp: 'おう、{新|あたら}しいのが{来|き}たな。{厨房|ちゅうぼう}の{朝|あさ}は{挨拶|あいさつ}からだ。{大|おお}きな{声|こえ}で、もう{一回|いっかい}。', vi: 'Ồ, người mới đến rồi à. Buổi sáng trong bếp bắt đầu bằng lời chào. Chào lại, to tiếng lên.' },
      { sp: 'hero', jp: 'おはようございます！{今日|きょう}もよろしくお{願|ねが}いします！', vi: 'Chào buổi sáng ạ! Hôm nay cũng mong được mọi người chỉ bảo ạ!' },
      { sp: 'Bếp trưởng Sato', jp: 'よし、その{声|こえ}だ。{最初|さいしょ}は{皿洗|さらあら}いと{野菜|やさい}の{下処理|したしょり}からだ。{包丁|ほうちょう}はまだ{早|はや}い。{焦|あせ}るな、{順番|じゅんばん}がある。', vi: 'Được, giọng thế đấy. Ban đầu làm rửa bát và sơ chế rau củ. Dao thì còn sớm. Đừng vội, việc gì cũng có thứ tự của nó.' },
      { sp: 'Anh đầu bếp', jp: 'サトウさんはいつもああ{言|い}うけど、{皿洗|さらあら}いが{一番|いちばん}、{店|みせ}の{腕|うで}が{分|わ}かるんだよ。{割|わ}らず、{早|はや}く、{静|しず}かに。やってみな。', vi: 'Anh Sato lúc nào cũng nói thế, nhưng rửa bát là việc thể hiện tay nghề của quán rõ nhất đấy. Không vỡ, nhanh, mà êm. Thử đi.' },
      { sp: 'hero', jp: '{包丁|ほうちょう}はまだ{使|つか}えませんが、{野菜|やさい}の{皮|かわ}むきなら{任|まか}せてください。{家|いえ}でも{毎日|まいにち}{料理|りょうり}しています。', vi: 'Dao thì em chưa được dùng, nhưng gọt vỏ rau củ thì cứ giao cho em. Ở nhà em cũng nấu ăn hằng ngày ạ.' },
      { sp: 'Bếp trưởng Sato', jp: 'ほう、{自信|じしん}があるのはいい。ただし、{家|いえ}の{料理|りょうり}と{店|みせ}の{料理|りょうり}は{別物|べつもの}だ。{味見|あじみ}の{仕方|しかた}から{教|おし}える。この{味噌汁|みそしる}、どうだ。', vi: 'Ồ, tự tin là tốt. Nhưng nấu ăn ở nhà và nấu ở quán là hai thứ khác nhau. Ta dạy từ cách nếm thử. Canh miso này, thấy sao?' },
      { sp: 'hero', jp: '{出汁|だし}がよく{出|で}ています。{塩味|しおあじ}は{少|すこ}し{薄|うす}いかもしれません。{常連|じょうれん}さん{向|む}けなら、このくらいが{落|お}ち{着|つ}く{味|あじ}でしょうか。', vi: 'Nước dùng rất đậm ạ. Vị muối có lẽ hơi nhạt một chút. Nếu cho khách quen thì tầm vị này có phải là vừa êm không ạ?' },
      { sp: 'Bếp trưởng Sato', jp: '…ほう。{味|あじ}のことを{言葉|ことば}で{言|い}える{新|あたら}しいのは{珍|めずら}しいな。よし、{昼|ひる}のまかないはお{前|まえ}が{手伝|てつだ}え。{見|み}てやる。', vi: '…Ồ. Người mới mà nói được về vị bằng lời thì hiếm đấy. Được, bữa trưa của nhân viên hôm nay cho cậu phụ. Ta sẽ xem.' }
    ],
    outro: 'Buổi sáng đầu tiên ở bếp kết thúc bằng một đặc ân nhỏ: được phụ nấu bữa trưa cho cả quán. Trong bếp Nhật, được đứng gần nồi là được tin thêm một bước — và bước đầu tiên ấy bắt đầu bằng một lời chào đủ to, đủ rõ.'
  },

  'ind-nha-hang-2': {
    scene: '😤 Bếp nhà hàng — vị khách khó tính và nghệ thuật xin lỗi',
    branch: [
      { sp: 'narr', text: 'Giờ trưa cao điểm. Một vị khách trung niên gọi {name} lại, chỉ vào đĩa cá kho đưa lên bàn được mười phút: "Món này mặn quá. Mà tôi chờ gần ba mươi phút rồi đấy." Cả khu vực bàn xung quanh bắt đầu ngẩng lên nghe.' },
      { sp: 'Anh khách', jp: 'しょっぱすぎるよ、これ。{待|ま}たせすぎだし。{店長|てんちょう}を{呼|よ}んでくれる？', text: '"Món này mặn quá đấy. Mà bắt tôi chờ lâu quá. Gọi quản lý ra đây được không?"' },
      {
        prompt: 'Khách đang giận dữ và đòi gặp quản lý. Câu đầu tiên của {name} là…',
        choice: [
          { label: 'Xin lỗi ngay, nhận phần việc của quán, đề xuất làm lại món và mời khách trà trong lúc chờ', fx: { jp: 2, love: 1 }, note: 'Nhà hàng: nghệ thuật xin lỗi — nhận lỗi trước, giải pháp sau, khách dịu lại rõ rệt', say: [
            { sp: 'hero', jp: '{申|もう}し{訳|わけ}ございません。{味付|あじつ}けの{確認|かくにん}が{不足|ふそく}していました。すぐ{新|あたら}しいものを{作|つく}り{直|なお}します。お{待|ま}たせしたお{詫|わ}びに、まず{温|あたた}かいお{茶|ちゃ}をお{持|も}ちします。', text: '"Tôi vô cùng xin lỗi. Việc kiểm tra nêm nếm của chúng tôi chưa kỹ. Tôi sẽ cho làm lại món mới ngay. Để xin lỗi vì đã để quý khách chờ, trước tiên tôi xin mang trà nóng ra ạ."' },
            { sp: 'narr', text: 'Vị khách hơi khựng lại — người ta khó mà giận tiếp một người vừa nhận lỗi gọn gàng vừa có giải pháp rõ ràng. Quản lý tới nơi, nghe lại sự việc, cúi chào lần nữa và quyết định miễn phí món làm lại kèm món tráng miệng. Khi ra về, vị khách để lại một câu qua cửa: "Anh nhân viên nước ngoài kia… được đấy."' },
            { sp: 'Bếp trưởng Sato', text: '"Nghe thấy chưa. クレームは店の敵じゃない — lời phàn nàn xử lý tốt còn quý hơn lời khen. Hôm nay mày cứu quán một bàn khách quen đấy."' } ] },
          { label: 'Giải thích: "Công thức của quán là thế, khách khác vẫn ăn bình thường ạ"', fx: { pressure: 2, love: -1 }, note: 'Nhà hàng: cãi lại khách phàn nàn bằng lý lẽ công thức — khách nổi đóa, quản lý phải ra mặt', say: [
            { sp: 'narr', text: '"Thế à, công thức à?" — giọng vị khách to lên một nấc. Trong nghề dịch vụ, giải thích đúng đến mấy mà đặt trước lời xin lỗi cũng thành sai. Quản lý phải bước ra cúi đầu tới lần thứ ba sự việc mới lắng xuống, và tên của {name} được nhắc trong buổi họp cuối ngày — theo cách không ai muốn.' } ] },
          { label: 'Im lặng mang đĩa vào bếp, nhờ anh đầu bếp nếm lại và quyết định', fx: { jp: 1 }, note: 'Nhà hàng: không đôi co, mang món vào nhờ senpai xử lý — an toàn nhưng chậm', say: [
            { sp: 'narr', text: 'Không cãi, không phân bua — {name} cúi đầu, mang đĩa vào trong. Anh đầu bếp nếm thử, khẽ chau mày: "Hơi mặn thật." Món mới được làm lại với vị chấn chỉnh, quản lý mang ra kèm lời xin lỗi chính thức. Hơi chậm một nhịp, nhưng không ai bị tổn thương thêm — và {name} ghi nhớ: trong bếp, biết mình chưa đủ tầm để tự xử lý cũng là một loại khôn.' } ] }
        ]
      },
      { sp: 'narr', text: 'Cuối ca, bếp trưởng ghé qua chỗ {name} đang lau bếp, nói một câu ngắn mà {name} chép nguyên văn vào cuốn sổ tay nghề: "Xin lỗi không phải là thua. Xin lỗi là giữ lại một người khách."' }
    ]
  },

  'ind-nha-hang-3': {
    scene: '⭐ Bếp nhà hàng — lần đầu đứng bếp một món chính',
    branch: [
      { sp: 'narr', text: 'Một buổi tối, anh đầu bếp phụ trách món cá bị cảm đột ngột. Bếp trưởng nhìn quanh gian bếp đang vào guồng giờ cao điểm — rồi dừng ánh mắt ở {name}.' },
      { sp: 'Bếp trưởng Sato', text: '"{name}. Tối nay mày đứng món cá nướng. Sợ không?"' },
      {
        prompt: 'Cơ hội lớn nhất từ ngày vào bếp rơi xuống bất ngờ. {name} đáp:',
        choice: [
          { label: '"Để em làm. Em đã xem anh làm cả trăm lần rồi."', fx: { jp: 1, love: 1, hp: -2 }, note: 'Nhà hàng: nhận đứng bếp món cá trong đêm cao điểm — run tay mà giữ được nhịp', say: [
            { sp: 'narr', text: 'Hai tiếng đồng hồ như một trận đấu. "Cá thu một! Cá saba hai!" — tiếng gọi món bay liên hồi. Tay {name} run ở đĩa đầu tiên, vững từ đĩa thứ năm, và đến đĩa thứ hai mươi thì nhịp lật cá đã thành phản xạ. Bếp trưởng đứng sau lưng suốt, không đỡ một tay — chỉ thỉnh thoảng gật đầu rất khẽ.' } ] },
          { label: '"Em chưa tự tin. Em phụ anh phần nêm nếm và trình bày thôi."', fx: { jp: 1 }, note: 'Nhà hàng: biết lượng sức, nhận vai phụ vững chắc trong đêm cao điểm', say: [
            { sp: 'narr', text: 'Bếp trưởng gật đầu, không ép: "Biết mình đứng đâu cũng là tay nghề." Đêm đó {name} phụ bếp chính xác tới từng đĩa rau trang trí — và học được nhiều hơn cả một tuần đứng xem, vì mọi thứ diễn ra ngay trong tầm tay.' } ] }
        ]
      },
      { sp: 'narr', text: 'Khách cuối cùng ra về. Một vị khách quen ghé qua cửa bếp, chìa tay qua quầy: "Món cá hôm nay — ngon như mọi khi. Ai nướng thế?" Bếp trưởng hất hàm về phía {name}, nói gọn lỏn: "Đệ tử của tôi."' },
      { sp: 'Bếp trưởng Sato', text: '"{name}, nghề bếp không có đường tắt: nếm nghìn lần, sai trăm lần. Nhưng có một thứ không dạy được — là cái bụng muốn làm cho người ăn vui. Mày có thứ đó. Giữ lấy."' },
      { sp: 'narr', text: '{name} tháo tạp dề, bước ra khỏi bếp vào con phố đêm Toyosu. Mùi khói và dầu mỡ bám trên áo — mùi của một nghề đang dần trở thành của mình.' }
    ]
  },

  'talk-nha-hang': {
    scene: '🍜 Bữa trưa nhân viên — まかない và chuyện đời',
    wrong: {
      0: [
        '{賄|まかな}いは{毎日|まいにち}{私|わたし}が{食|た}べ{過|す}ぎました{太|ふと}ります。',
        '{料理人|りょうりにん}は{食|た}べる{人|ひと}が{私|わたし}を{作|つく}りますね。'
      ]
    },
    lines: [
      { sp: 'Anh đầu bếp', jp: 'まかない{出来|でき}たよ。{今日|きょう}は{余|あま}った{魚|さかな}でアラ{汁|じる}。いただきます、{先|さき}に{食|た}べな。', vi: 'Bữa trưa nhân viên xong rồi đây. Hôm nay nấu canh từ phần cá thừa. Mời cả nhà ăn — cậu ăn trước đi.' },
      { sp: 'hero', jp: 'いただきます。…おいしい！{残|のこ}り{物|もの}でこんなに{美味|おい}しくなるんですね。さすが{料理人|りょうりにん}です。', vi: 'Em xin phép ăn ạ. …Ngon quá! Đồ thừa mà nấu được ngon thế này. Đúng là đầu bếp có khác.' },
      { sp: 'Anh đầu bếp', jp: 'はは、{料理人|りょうりにん}はな、{捨|す}てる{部分|ぶぶん}から{一番美味|いちばんおい}しい{物|もの}を{作|つく}るのが{腕|うで}なんだ。{人生|じんせい}も{同|おな}じだよ、たぶん。', vi: 'Ha ha, đầu bếp mà lị — biến phần người ta bỏ đi thành món ngon nhất mới là tay nghề. Đời người chắc cũng thế.' },
      { sp: 'Bếp trưởng Sato', jp: 'おい、{哲学|てつがく}はいいから{食|た}え。{午後|ごご}は{仕込|しこ}みが{山|やま}ほどあるぞ。', vi: 'Này, triết lý thế đủ rồi, ăn đi. Chiều nay việc chuẩn bị chất như núi đấy.' },
      { sp: 'hero', jp: 'はい！{午後|ごご}もよろしくお{願|ねが}いします。', vi: 'Vâng ạ! Buổi chiều cũng mong mọi người chỉ bảo ạ.' }
    ],
    outro: 'Bữa trưa của người làm bếp chỉ có mười lăm phút, ăn đứng quanh nồi canh bốc khói. Vậy mà trong mười lăm phút ấy có đủ cả: một bài học nghề, một câu triết lý nửa đùa, và cảm giác mình đã là người của gian bếp này.'
  }
,
  /* ================= TUYẾN DU HỌC — chuỗi 3 cảnh ================= */
  'ind-duhoc-1': {
    scene: '🎒 Du học — buổi học đầu tiên ở trường chuyên môn',
    wrong: {
      0: [
        '{私|わたし}はベトナム{人|じん}です、{国|くに}はベトナムあります。よろしく{頼|たの}みます。',
        '{趣味|しゅみ}は{私|わたし}がサッカーを{好|す}きします、{将来|しょうらい}はまだ{考|かんが}えません。'
      ],
      1: [
        '{出席|しゅっせき}は{私|わたし}が{大事|だいじ}します、{遅刻|ちこく}はしません{約束|やくそく}。',
        '{授業|じゅぎょう}を{寝|ね}ることはありません、{多分|たぶん}です。'
      ],
      2: [
        '{分|わ}からない{言葉|ことば}は{私|わたし}が{家|いえ}で{調|しら}べます、{後|あと}で。',
        '{質問|しつもん}は{恥|は}ずかしいですから、{友達|ともだち}にだけ{聞|き}きます。'
      ]
    },
    lines: [
      { sp: 'Thầy chủ nhiệm', jp: '{新入生|しんにゅうせい}のみなさん、ようこそ。ここからは{全部|ぜんぶ}{日本語|にほんご}の{授業|じゅぎょう}です。まず、{一人|ひとり}ずつ{自己紹介|じこしょうかい}をしてください。', vi: 'Chào mừng các em học sinh mới. Từ đây, mọi giờ học đều bằng tiếng Nhật. Trước hết, từng em hãy tự giới thiệu.' },
      { sp: 'hero', jp: '{初|はじ}めまして、{私|わたし}はベトナムから{来|き}た{留学生|りゅうがくせい}です。{日本語|にほんご}を{生|い}かした{仕事|しごと}に{就|つ}くために、この{学校|がっこう}を{選|えら}びました。よろしくお{願|ねが}いします。', vi: 'Xin chào mọi người, tôi là {name}, đến từ Việt Nam. Tôi chọn trường này để sau này làm công việc vận dụng được tiếng Nhật. Mong mọi người giúp đỡ.' },
      { sp: 'Thầy chủ nhiệm', jp: 'いい{紹介|しょうかい}だね。{当校|とうこう}で{一番大事|いちばんだいじ}なのは{出席率|しゅっせきりつ}。{理由|りゆう}があっても、{休|やす}みが{多|おお}いと{進級|しんきゅう}できません。{体調管理|たいちょうかんり}も{勉強|べんきょう}のうちだよ。', vi: 'Bài giới thiệu tốt đấy. Ở trường này, quan trọng nhất là tỷ lệ điểm danh. Dù có lý do, nghỉ nhiều là không được lên lớp. Quản lý sức khỏe cũng là một phần của việc học đấy.' },
      { sp: 'hero', jp: 'はい、{分|わ}かりました。{出席|しゅっせき}を{一番|いちばん}に{考|かんが}えて、{遅刻|ちこく}もしないようにします。', vi: 'Vâng, em hiểu rồi ạ. Em sẽ đặt việc điểm danh lên hàng đầu và cố gắng không đi muộn.' },
      { sp: 'Bạn cùng lớp', jp: 'ねえ、さっきの{自己紹介|じこしょうかい}、すごく{上手|じょうず}だったね。{私|わたし}、ネパールから{来|き}たアーシャ。{一緒|いっしょ}のクラスだね。', vi: 'Này, bài giới thiệu vừa rồi của cậu hay thật đấy. Tớ là Asha, đến từ Nepal. Mình học cùng lớp rồi nhé.' },
      { sp: 'hero', jp: 'ありがとう、アーシャさん。{専門用語|せんもんようご}が{難|むずか}しそうで、{少|すこ}し{不安|ふあん}です。{分|わ}からない{言葉|ことば}があったら、{授業|じゅぎょう}の{後|あと}に{一緒|いっしょ}に{先生|せんせい}に{聞|き}きませんか。', vi: 'Cảm ơn cậu, Asha. Thuật ngữ chuyên ngành có vẻ khó, tớ hơi lo. Nếu có từ nào không hiểu, sau giờ học mình cùng hỏi thầy nhé?' },
      { sp: 'Bạn cùng lớp', jp: 'もちろん！{私|わたし}も{一人|ひとり}だと{聞|き}きにくかったから、うれしい。じゃあ{放課後|ほうかご}、{図書室|としょしつ}で{復習|ふくしゅう}しよう。', vi: 'Tất nhiên rồi! Một mình tớ cũng ngại hỏi, nên vui lắm. Vậy tan học mình ôn bài ở thư viện nhé.' },
      { sp: 'Thầy chủ nhiệm', jp: 'では{最初|さいしょ}の{授業|じゅぎょう}を{始|はじ}めます。{教科書|きょうかしょ}の{三|さん}ページを{開|ひら}いてください。', vi: 'Vậy chúng ta bắt đầu buổi học đầu tiên. Mở sách giáo khoa trang ba.' }
    ],
    outro: 'Buổi học đầu tiên trôi qua nhanh hơn nỗi lo ban đầu. Có thêm một người bạn cùng cảnh ngộ, một lời hẹn ôn bài ở thư viện — và cảm giác rất rõ ràng: hai năm tới sẽ không dễ, nhưng sẽ không cô độc.'
  },

  'ind-duhoc-2': {
    scene: '🌃 Du học — lời mời ca đêm và giới hạn 28 giờ',
    branch: [
      { sp: 'narr', text: 'Kỳ thi giữa kỳ cách hai tuần. Một buổi tối ở chỗ làm thêm, quản lý cửa hàng kéo {name} ra góc quầy, hạ giọng như sắp chia một món hời: "Tháng này thiếu người. Em làm thêm buổi đêm giúp anh — tiền mặt trao tay, không qua sổ sách gì đâu. Bạn em bên kho cũng làm thế cả."' },
      { sp: 'Anh quản lý cửa hàng', jp: 'ねえ、{今月|こんげつ}{人手|ひとで}が{足|た}りなくてさ。{夜|よる}も{入|はい}ってくれない？{現金|げんきん}で{払|はら}うから、{学校|がっこう}には{分|わ}からないよ。', text: '"Này, tháng này đang thiếu người. Em vào ca đêm nữa được không? Anh trả tiền mặt, trường không biết được đâu."' },
      {
        prompt: 'Ca đêm tiền mặt, vượt trần 28 giờ — ngay trước kỳ thi. {name} trả lời quản lý thế nào?',
        choice: [
          { label: 'Từ chối khéo bằng tiếng Nhật: cảm ơn đã tin tưởng, nhưng luật 28 giờ và kỳ thi không cho phép', fx: { jp: 2, risk: -1 }, note: 'Du học: từ chối làm chui vượt trần 28 giờ trước kỳ thi — quản lý tôn trọng, giữ được việc', say: [
            { sp: 'hero', jp: 'ありがとうございます。でも、{留学生|りゅうがくせい}は{週|しゅう}28{時間|じかん}までと{決|き}まっていて、{再来週|さらいしゅう}は{試験|しけん}なんです。{今|いま}のシフトは{今|いま}まで{通|どお}り{頑張|がんば}りますので、{夜|よる}はお{断|ことわ}りさせてください。', text: '"Em cảm ơn anh đã tin tưởng. Nhưng du học sinh bị giới hạn 28 giờ một tuần, mà hai tuần nữa em thi rồi. Ca hiện tại em sẽ làm hết sức như trước nay; ca đêm xin cho em từ chối ạ."' },
            { sp: 'narr', text: 'Quản lý nhìn {name} vài giây, rồi cười khà: "Luật thuộc nằm lòng thế thì anh chịu." Công việc được giữ nguyên, cái gật đầu tôn trọng còn hơn — và kỳ thi giữa kỳ, {name} bước vào phòng thi với cái đầu tỉnh táo.' } ] },
          { label: 'Nhận ngay — tiền mặt, ai mà biết được', fx: { money: 0.7, risk: 3, pressure: 2, hp: -3 }, note: 'Du học: nhận ca đêm tiền mặt vượt trần — tiền nhiều hơn nhưng rủi ro visa treo trên đầu', say: [
            { sp: 'narr', text: 'Ba tuần làm đêm. Ví dày lên trông thấy — nhưng mắt cũng thâm quầng, và buổi học sáng bắt đầu bằng những cái ngáp không giấu nổi. Một sáng, thầy chủ nhiệm gọi {name} lại cuối giờ: "Tháng này em ngủ gật ba lần rồi đấy. Có chuyện gì không?" Câu hỏi nhẹ tênh ấy khiến lưng {name} lạnh toát: chỉ cần trường hoặc nyukan hỏi tới bảng lương, mọi thứ xây được bấy lâu có thể đổ trong một buổi chiều.' } ] },
          { label: 'Thương lượng: chỉ nhận thêm đúng số giờ còn trống trong trần 28 giờ', fx: { jp: 1, money: 0.3 }, note: 'Du học: thương lượng trong giới hạn luật — thêm được ít giờ, giữ an toàn tuyệt đối', say: [
            { sp: 'hero', jp: '{週|しゅう}28{時間|じかん}までなら、あと4{時間|じかん}だけ{増|ふ}やせます。{日曜|にちよう}の{昼|ひる}なら{入|はい}れますが、{夜|よる}は{試験勉強|しけんべんきょう}のために{空|あ}けさせてください。', text: '"Trong giới hạn 28 giờ một tuần, em có thể tăng thêm đúng bốn giờ. Trưa chủ nhật thì em vào được, nhưng buổi tối xin để em dành cho việc ôn thi ạ."' },
            { sp: 'narr', text: '"Bốn giờ cũng quý." Quản lý ghi thêm vào bảng ca. Không phải lời từ chối nào cũng làm mất lòng — từ chối có con số và có phương án thay thế, đó là thương lượng của người trưởng thành.' } ] }
        ]
      },
      { sp: 'narr', text: 'Trên đường về phòng trọ, {name} nghĩ về cái gật đầu suýt nữa của mình. Có những cái bẫy không trông giống bẫy — chúng trông giống cơ hội, trả bằng tiền mặt và nói bằng giọng thân tình.' }
    ]
  },

  'ind-duhoc-3': {
    scene: '🎤 Du học — buổi thuyết trình và lời hứa với tương lai',
    branch: [
      { sp: 'narr', text: 'Cuối học kỳ, mỗi sinh viên phải thuyết trình năm phút bằng tiếng Nhật về "nghề nghiệp tôi muốn làm". Đến lượt {name}: slide cuối cùng chỉ có một dòng chữ — và cả lớp im lặng chờ nghe từ chính miệng người nói.' },
      { sp: 'hero', jp: '{私|わたし}は{卒業後|そつぎょうご}、{日本語|にほんご}と{専門|せんもん}の{両方|りょうほう}を{使|つか}える{仕事|しごと}に{就|つ}きたいです。{日本|にほん}で{学|まな}んだことは、{技術|ぎじゅつ}だけではありません。{約束|やくそく}を{守|まも}ること、{時間|じかん}を{大切|たいせつ}にすること、そして、{分|わ}からないことを{恥|は}ずかしがらずに{聞|き}く{勇気|ゆうき}です。', text: '"Sau khi tốt nghiệp, tôi muốn làm công việc dùng được cả tiếng Nhật lẫn chuyên môn. Điều tôi học được ở Nhật không chỉ là kỹ thuật: đó là giữ lời hứa, trân trọng thời gian, và dũng khí hỏi khi không hiểu mà không xấu hổ."' },
      { sp: 'narr', text: 'Tiếng vỗ tay vang lên — to nhất từ hàng ghế của Asha. Thầy chủ nhiệm đứng dậy, chỉnh lại một lỗi trợ từ nhỏ trong bài, rồi nói câu mà cả lớp cùng ghi vào vở:' },
      { sp: 'Thầy chủ nhiệm', jp: '{上手|じょうず}な{日本語|にほんご}より、{伝|つた}わる{日本語|にほんご}。そして、{伝|つた}わる{話|はなし}の{裏|うら}には、いつも{生|い}きてきた{時間|じかん}がある。あんたの{話|はなし}には、それがあったよ。', text: '"Quan trọng hơn tiếng Nhật giỏi là tiếng Nhật truyền đạt được. Và đằng sau lời nói truyền đạt được, luôn là quãng đời đã sống. Bài nói của em có thứ đó."' },
      {
        prompt: 'Tan học, Asha rủ {name} đi ăn mừng. Trên bàn ăn nhỏ, câu chuyện về tương lai mở ra:',
        choice: [
          { label: 'Chia sẻ thật lòng: muốn ở lại Nhật làm việc sau tốt nghiệp, rủ Asha cùng giữ liên lạc và giúp nhau', fx: { love: 1, jp: 1 }, note: 'Du học: kết một tình bạn quốc tế bền chặt từ những ngày trường chuyên môn', say: [
            { sp: 'narr', text: 'Hai đứa du học sinh, hai đất nước, một quán ăn nhỏ và một lời hẹn: dù sau này ở lại hay về, mỗi năm một lần phải gặp nhau — ở Tokyo, Kathmandu hay Hà Nội cũng được. Tình bạn của người xa xứ, hóa ra, là một loại quê hương di động.' } ] },
          { label: 'Giữ kín kế hoạch, chỉ nói chung chung "để xem đã"', fx: { pressure: 1 }, note: 'Du học: vẫn chưa dám nói chắc về tương lai của chính mình', say: [
            { sp: 'narr', text: '"Để xem đã" — câu trả lời an toàn nhất và trống rỗng nhất. Asha cười cho qua, nhưng {name} biết: đến một lúc nào đó, người ta phải dám nói ra điều mình muốn, ít nhất là với bạn bè — và với chính mình.' } ] }
        ]
      },
      { sp: 'narr', text: 'Học kỳ khép lại bằng một buổi thuyết trình năm phút. Năm phút ngắn ngủi — nhưng là năm phút đầu tiên {name} nói về tương lai của mình bằng tiếng Nhật, trước một phòng đầy người, mà không cần nhìn giấy.' }
    ]
  }
});
})();
