// scenes-a.js — Hội thoại ĐẦY ĐỦ cho 3 bối cảnh (koban / ngân hàng / bưu điện) của demo 2D
// «TUỔI TRẺ Ở NHẬT» (staging — bản duyệt nội dung, chưa đẩy main).
// Đăng ký vào window.DEMO_DATA theo đúng định dạng engine:
//   KAIWA  { scene, lines:[{sp, jp, vi}], wrong:{<thứ tự câu hero, từ 0>:[câu sai 1, câu sai 2]}, outro }
//   BRANCH { scene, branch:[ {sp, text, jp?} | {prompt, choice:[{label, fx, note, say:[{sp, text, jp?}]}]} ] }
// Thể ngữ: cảnh sát, nhân viên ngân hàng / bưu điện nói kính ngữ + teineigo chuẩn phục vụ & thủ tục;
// nhân vật chính nói vốn N5 lịch sự, còn vấp những lỗi điển hình của người Việt mới học.
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  koban: {
    scene: '🚓 Koban — khai báo mất đồ & hỏi đường',
    lines: [
      { sp: 'Cảnh sát trực', jp: 'こんにちは。どうされましたか。{何|なに}かお{困|こま}りですか。', vi: 'Chào anh/chị. Có chuyện gì thế ạ? Anh/chị đang gặp khó khăn gì ạ?' },
      { sp: 'hero', jp: 'すみません、{財布|さいふ}をなくしてしまいました。{遺失届|いしつとどけ}を{出|だ}したいです。', vi: 'Xin lỗi, tôi lỡ làm mất ví rồi ạ. Tôi muốn nộp đơn khai báo mất đồ.' },
      { sp: 'Cảnh sát trực', jp: 'わかりました。{落|お}ち{着|つ}いてください。まず、いつ、どこでなくしたか、{教|おし}えてください。', vi: 'Tôi hiểu rồi. Anh/chị cứ bình tĩnh đã. Trước hết, cho tôi biết anh/chị làm mất khi nào, ở đâu ạ.' },
      { sp: 'hero', jp: '{今日|きょう}の{午前中|ごぜんちゅう}に、{電車|でんしゃ}の{中|なか}でなくした{思|おも}います。', vi: 'Tôi nghĩ mình làm mất vào buổi sáng hôm nay, ở trong tàu điện.' },
      { sp: 'Cảnh sát trực', jp: '{何線|なんせん}の{電車|でんしゃ}ですか。どの{駅|えき}で{降|お}りたか、{覚|おぼ}えていますか。', vi: 'Tàu thuộc tuyến nào ạ? Anh/chị có nhớ mình xuống ở ga nào không?' },
      { sp: 'hero', jp: 'JRの{電車|でんしゃ}です。{新宿駅|しんじゅくえき}で{降|お}りました。', vi: 'Tàu của JR ạ. Tôi xuống ở ga Shinjuku.' },
      { sp: 'Cảnh sát trực', jp: '{財布|さいふ}の{中|なか}には、{何|なに}が{入|はい}っていましたか。お{金|かね}はどのくらいありましたか。', vi: 'Trong ví có những gì ạ? Tiền thì khoảng bao nhiêu?' },
      { sp: 'hero', jp: '{現金|げんきん}が{約|やく}8,000{円|えん}と、キャッシュカードと{学生証|がくせいしょう}が{入|はい}っていました。', vi: 'Có khoảng 8.000 yên tiền mặt, thẻ ngân hàng và thẻ học sinh ạ.' },
      { sp: 'Cảnh sát trực', jp: '{財布|さいふ}の{色|いろ}と{形|かたち}も{教|おし}えてください。{目立|めだ}つ{特徴|とくちょう}はありますか。', vi: 'Cho tôi biết thêm màu sắc và hình dáng của ví nữa ạ. Có đặc điểm gì dễ nhận ra không?' },
      { sp: 'hero', jp: '{茶色|ちゃいろ}の{長財布|ながざいふ}です。{革|かわ}のもので、{角|かど}に{小|ちい}さい{傷|きず}があります。', vi: 'Là ví dài màu nâu ạ. Bằng da, ở góc có một vết xước nhỏ.' },
      { sp: 'Cảnh sát trực', jp: 'ありがとうございます。では、この{遺失届|いしつとどけ}にお{名前|なまえ}と{電話番号|でんわばんごう}をご{記入|きにゅう}ください。', vi: 'Cảm ơn anh/chị. Vậy xin điền họ tên và số điện thoại vào tờ đơn khai báo mất đồ này ạ.' },
      { sp: 'hero', jp: 'はい、わかりました。ここに{書|か}けばいいですか。', vi: 'Vâng, tôi hiểu rồi ạ. Điền vào chỗ này là được phải không ạ?' },
      { sp: 'Cảnh sát trực', jp: '{受|う}け{付|つ}けました。{見|み}つかりましたら、こちらからご{連絡|れんらく}いたしますので、ご{安心|あんしん}ください。', vi: 'Đã tiếp nhận rồi ạ. Khi nào tìm thấy, chúng tôi sẽ liên lạc ngay, anh/chị cứ yên tâm.' }
    ],
    wrong: {
      0: ['すみません、{私|わたし}の{財布|さいふ}が{迷子|まいご}になりました。', '{財布|さいふ}をなくした。{早|はや}く{探|さが}して。'],
      1: ['{今日|きょう}の{午前中|ごぜんちゅう}を、{電車|でんしゃ}の{中|なか}をなくしました。', '{朝|あさ}から{電車|でんしゃ}までなくしました。'],
      2: ['{現金|げんきん}は8,000{円|えん}を、カードは{学生証|がくせいしょう}を{入|はい}りました。', 'お{金|かね}は{財布|さいふ}に{住|す}んでいました。カードも{住|す}んでいました。'],
      3: ['{茶色|ちゃいろ}い{長財布|ながざいふ}です。{革|かわ}の{角|かど}が{傷|きず}です。', '{私|わたし}の{財布|さいふ}は{茶色|ちゃいろ}を{着|き}ています。']
    },
    outro: '{name} cầm tờ biên nhận, cúi chào anh cảnh sát rồi mới dám thở phào. Trước khi ra cửa, anh dặn lại một lần nữa: hễ tìm thấy ví là đồn sẽ gọi điện ngay, nhớ để điện thoại bên mình. Ở Nhật có một điều rất thật: đồ ai nhặt được — dù là chiếc ô rẻ tiền hay chiếc ví còn nguyên tiền — gần như luôn được mang tới koban gần nhất. Vậy nên việc của {name} bây giờ chỉ là giữ điện thoại bên mình, chờ cuộc gọi ấy, và lần sau giữ ví cho cẩn thận hơn.'
  },
  'koban-board': {
    scene: '🗺️ Bản đồ khu vực & bảng thông báo',
    branch: [
      { sp: 'narr', text: 'Chờ anh cảnh sát in biên nhận, {name} ngẩng lên nhìn bức tường của đồn: một tấm bản đồ lớn đề 管内図 — bản đồ khu vực đồn phụ trách. Chấm đỏ ghi 現在地 nằm ngay dưới chân mình, xung quanh là ga, combini, trường học và khu nhà trọ ở 高円寺.' },
      { sp: 'Cảnh sát trực', jp: 'こちらの{地図|ちず}で、ご{自宅|じたく}までの{道|みち}が{分|わ}かります。{赤|あか}い{線|せん}が、{駅|えき}からの{道|みち}です。', text: 'Nhìn bản đồ này là biết đường về nhà anh/chị đấy ạ. Đường màu đỏ là đường từ ga về.' },
      { sp: 'narr', text: 'Bên cạnh bản đồ là bảng thông báo của khu: tờ rơi phòng chống lừa đảo chuyển tiền 振り込め詐欺 in hình điện thoại đỏ chót, lịch tuần tra 巡回連絡 của tổ dân phố, và một tờ thông báo điểm lánh nạn khi có động đất, bão lớn.' },
      { sp: 'Cảnh sát trực', jp: '{最近|さいきん}、{振|ふ}り{込|こ}め{詐欺|さぎ}が{増|ふ}えています。{電話|でんわ}でお{金|かね}の{話|はなし}が{出|で}たら、まず{疑|うたが}ってください。', text: 'Dạo này nạn lừa đảo chuyển tiền đang tăng. Cứ nghe ai gọi điện nhắc tới tiền là phải nghi ngờ trước đã ạ.' },
      { sp: 'narr', text: '{name} đọc tiếp tờ lịch tuần tra: tuần này cảnh sát khu vực sẽ đi từng nhà hỏi thăm, nhắc chuyện khóa cửa và đèn đường. Ở Nhật, koban không chỉ để báo án — nó là cái đồng hồ canh giấc ngủ cho cả khu phố.' },
      { sp: 'Cảnh sát trực', jp: '{地震|じしん}や{台風|たいふう}のときは、{近|ちか}くの{小学校|しょうがっこう}が{避難所|ひなんじょ}になります。{場所|ばしょ}だけでも{覚|おぼ}えておいてください。', text: 'Khi có động đất hay bão, trường tiểu học gần đây sẽ là điểm lánh nạn. Anh/chị nhớ sẵn vị trí của nó nhé.' },
      { sp: 'narr', text: 'Tờ rơi chống lừa đảo ghi rõ ba dấu hiệu: người lạ xưng là người nhà gọi điện khóc lóc, số tài khoản lạ hối chuyển tiền gấp, và câu nói kinh điển 「携帯の番号が変わった」 — “số điện thoại của con thay đổi rồi”. Đọc mà lạnh sống lưng.' },
      {
        prompt: '{name} làm gì trước khi rời đồn?',
        choice: [
          {
            label: 'Chụp lại tờ rơi chống lừa đảo chuyển tiền để tối về tra từ vựng',
            fx: { jp: 1 }, note: 'Đã chụp lại tờ rơi chống lừa đảo — tối về tra thêm từ vựng',
            say: [
              { sp: 'narr', text: '{name} giơ điện thoại chụp lại tờ rơi 振り込め詐欺, chụp cả số điện thoại tư vấn của đồn ở góc dưới. Biết đâu một ngày, chính tờ rơi này cứu được ví tiền của mình — theo đúng nghĩa đen.' },
              { sp: 'Cảnh sát trực', jp: 'いいですね。{分|わ}からないことがあったら、いつでもここへ{聞|き}きに{来|き}てください。', text: 'Tốt lắm. Có gì không hiểu, cứ tới đây hỏi bất cứ lúc nào nhé.' }
            ]
          },
          {
            label: 'Chỉ xem kỹ bản đồ khu vực rồi đi luôn',
            note: 'Đã xem kỹ bản đồ khu vực rồi rời đồn',
            say: [
              { sp: 'narr', text: '{name} nhìn lại bản đồ một lượt cuối, ghi nhớ con đường đỏ từ ga về nhà trọ và vị trí trường tiểu học — điểm lánh nạn gần nhất. Vậy là đủ cho ngày hôm nay rồi.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Bước ra khỏi đồn, {name} nhìn lại tấm bản đồ qua ô cửa kính. Mất ví thì xui thật, nhưng đổi lại, cả khu phố này bỗng trở nên rõ ràng hơn hẳn trong đầu.' },
      { sp: 'Cảnh sát trực', jp: 'お{帰|かえ}りも、{気|き}をつけてくださいね。', text: 'Đường về anh/chị cũng cẩn thận nhé.' }
    ]
  },
  'bank-counter': {
    scene: '🏦 Quầy ngân hàng — mở tài khoản',
    lines: [
      { sp: 'Nhân viên ngân hàng', jp: 'いらっしゃいませ。{本日|ほんじつ}はどのようなご{用件|ようけん}でしょうか。', vi: 'Xin chào quý khách. Hôm nay quý khách cần giao dịch gì ạ?' },
      { sp: 'hero', jp: 'すみません、{口座|こうざ}を{開設|かいせつ}したいのですが、{手続|てつづ}きをお{願|ねが}いできますか。', vi: 'Xin lỗi, tôi muốn mở một tài khoản, nhờ chị làm thủ tục giúp tôi được không ạ?' },
      { sp: 'Nhân viên ngân hàng', jp: 'かしこまりました。{在留|ざいりゅう}カードと{印鑑|いんかん}はお{持|も}ちでしょうか。', vi: 'Tôi rõ rồi ạ. Quý khách có mang theo thẻ lưu trú và con dấu không ạ?' },
      { sp: 'hero', jp: 'はい、{両方|りょうほう}とも{持|も}ってきました。これです。', vi: 'Vâng, tôi mang cả hai rồi. Đây ạ.' },
      { sp: 'Nhân viên ngân hàng', jp: 'ありがとうございます。こちらの{申込書|もうしこみしょ}に、お{名前|なまえ}とご{住所|じゅうしょ}、お{電話番号|でんわばんごう}をご{記入|きにゅう}ください。', vi: 'Cảm ơn quý khách. Xin điền họ tên, địa chỉ và số điện thoại vào tờ đơn đăng ký này ạ.' },
      { sp: 'hero', jp: '{名前|なまえ}はカタカナで{書|か}いたほうがいいですか。{住所|じゅうしょ}は{在留|ざいりゅう}カードのとおりでいいですか。', vi: 'Tên thì viết bằng katakana có tốt hơn không ạ? Địa chỉ viết đúng như trên thẻ lưu trú là được phải không ạ?' },
      { sp: 'Nhân viên ngân hàng', jp: 'はい、そのとおりで{結構|けっこう}です。{書|か}き{終|お}わりましたら、こちらに{印鑑|いんかん}を{押|お}してください。', vi: 'Vâng, cứ viết như vậy là được ạ. Điền xong, xin đóng dấu vào chỗ này giúp tôi.' },
      { sp: 'hero', jp: '{書|か}き{終|お}わりました。{印鑑|いんかん}はここでいいですか。', vi: 'Tôi điền xong rồi ạ. Đóng dấu ở đây là được phải không ạ?' },
      { sp: 'Nhân viên ngân hàng', jp: 'ありがとうございます。{次|つぎ}に、キャッシュカードの{暗証番号|あんしょうばんごう}、4{桁|けた}の{数字|すうじ}を{決|き}めていただきます。', vi: 'Cảm ơn quý khách. Tiếp theo, xin quý khách quyết định mã PIN của thẻ tiền mặt, gồm 4 chữ số ạ.' },
      { sp: 'hero', jp: '{暗証番号|あんしょうばんごう}は、{生年月日|せいねんがっぴ}を{使|つか}ってもいいですか。', vi: 'Mã PIN thì dùng ngày tháng năm sinh của tôi có được không ạ?' },
      { sp: 'Nhân viên ngân hàng', jp: '{誕生日|たんじょうび}など、ほかの{人|ひと}に{分|わ}かりやすい{数字|すうじ}はお{控|ひか}えください。{安全|あんぜん}のためでございます。', vi: 'Xin tránh dùng những con số người khác dễ đoán như ngày sinh ạ. Đó là vì sự an toàn của quý khách.' },
      { sp: 'hero', jp: 'わかりました。じゃあ、{誕生日|たんじょうび}じゃない{数字|すうじ}にします。', vi: 'Tôi hiểu rồi ạ. Vậy tôi sẽ dùng dãy số không phải ngày sinh.' },
      { sp: 'Nhân viên ngân hàng', jp: '{通帳|つうちょう}は{本日|ほんじつ}お{渡|わた}しできます。キャッシュカードは{後日|ごじつ}、{簡易書留|かんいかきとめ}でご{自宅|じたく}にお{送|おく}りいたします。', vi: 'Sổ ngân hàng thì tôi trao ngay hôm nay được ạ. Thẻ tiền mặt sẽ gửi về nhà quý khách sau ít ngày, bằng thư bảo đảm giản đơn.' },
      { sp: 'hero', jp: 'ありがとうございます。カードは{何日|なんにち}ぐらいで{届|とど}きますか。', vi: 'Cảm ơn chị. Thẻ thì khoảng mấy ngày sẽ tới ạ?' },
      { sp: 'Nhân viên ngân hàng', jp: '1{週間|しゅうかん}ほどかかります。お{受|う}け{取|と}りの{際|さい}は、ご{本人様|ほんにんさま}のサインが{必要|ひつよう}ですので、ご{注意|ちゅうい}ください。', vi: 'Khoảng một tuần ạ. Khi nhận thẻ cần chữ ký của chính chủ, quý khách lưu ý giúp tôi nhé.' }
    ],
    wrong: {
      0: ['{口座|こうざ}、{開|あ}けて。お{金|かね}、{入|い}れたい。', 'すみません、{口座|こうざ}を{開設|かいせつ}したいですから、{手続|てつづ}きを{作|つく}ってください。'],
      1: ['{名前|なまえ}はカタカナで{書|か}きますか。{住所|じゅうしょ}は{在留|ざいりゅう}カードを{書|か}きますか。', '{私|わたし}の{名前|なまえ}がカタカナです。{住所|じゅうしょ}もカタカナに{住|す}んでいます。'],
      2: ['{暗証番号|あんしょうばんごう}は{私|わたし}の{誕生日|たんじょうび}に{生|う}まれますか。', '4{桁|けた}の{数字|すうじ}は{私|わたし}です。{誕生日|たんじょうび}を{押|お}します。']
    },
    outro: '{name} cầm cuốn 通帳 mới tinh ra khỏi quầy, mở ra xem đi xem lại trang đầu tiên in tên mình bằng katakana. Thẻ tiền mặt chưa có ngay — ít ngày nữa nó sẽ về nhà bằng 簡易書留, phải ký nhận mới được cầm. Ở Nhật, mở tài khoản là nghi lễ đầu tiên của người lớn: có sổ, có dấu, có mã PIN tự nghĩ ra và tuyệt đối không được là ngày sinh. {name} cất sổ vào túi trong cùng của ba lô — lần này thì không được mất nữa.'
  },
  'bank-atm': {
    scene: '🏧 Máy ATM — toàn tiếng Nhật',
    branch: [
      { sp: 'narr', text: 'Ba máy ATM xếp dọc tường ngân hàng, màn hình sáng trưng — và toàn tiếng Nhật. {name} cho thẻ vào khe, màn hình hiện dòng chữ đầu tiên: 暗証番号を入力してください — “xin nhập mã PIN”.' },
      { sp: 'narr', text: 'Lần một: sai. Màn hình đỏ lên: 暗証番号が違います. Lần hai: lại sai — chắc nhầm thứ tự hai số cuối lúc hồi hộp. ATM ở Nhật chỉ cho nhập sai tối đa ba lần; sai lần nữa là thẻ bị khóa ngay tại máy.' },
      {
        prompt: 'Đã sai hai lần. Làm gì bây giờ?',
        choice: [
          {
            label: 'Kệ, nhập đại lần thứ ba cho xong',
            note: 'Nhập sai lần thứ ba — thẻ đã bị khóa, phải vào quầy xử lý',
            say: [
              { sp: 'narr', text: 'Bíp! Màn hình hiện: このカードはロックされました — “thẻ này đã bị khóa”. Máy nuốt luôn thẻ, nhả ra một tờ giấy báo lỗi. Không mất một xu nào, nhưng coi như mất trắng cả buổi: phải lấy số, xếp hàng vào quầy lại từ đầu.' },
              { sp: 'Nhân viên ngân hàng', jp: '{本人確認|ほんにんかくにん}のため、{在留|ざいりゅう}カードを{見|み}せてください。ロックを{解除|かいじょ}いたします。', text: 'Để xác minh chính chủ, xin cho tôi xem thẻ lưu trú ạ. Tôi sẽ mở khóa thẻ cho quý khách.' },
              { sp: 'narr', text: 'Chị nhân viên kiểm tra giấy tờ, gõ máy một lúc rồi trả lại thẻ kèm lời dặn: lần sau sai hai lần là dừng tay ngay. {name} quay lại máy ATM, đứng thở đều ba nhịp trước khi chạm vào phím số.' }
            ]
          },
          {
            label: 'Dừng lại ngay, bấm hủy rồi vào quầy hỏi nhân viên',
            note: 'Đã dừng tay kịp lúc và vào quầy nhờ hỗ trợ',
            say: [
              { sp: 'narr', text: '{name} bấm nút 取消 (hủy), rút thẻ ra, cầm vào quầy. Thà hỏi một câu còn hơn để thẻ bị khóa — bài học này Hùng “sẹo” đã dặn từ ngày đầu.' },
              { sp: 'Nhân viên ngân hàng', jp: '2{回|かい}{間違|まちが}えたら、{一度|いちど}カードを{出|だ}して、{落|お}ち{着|つ}いてからもう{一度|いちど}お{試|ため}しください。', text: 'Sai hai lần thì cứ rút thẻ ra trước, bình tĩnh lại rồi thử lại sau ạ.' },
              { sp: 'narr', text: 'Nghe chị nói, {name} mới nhớ ra: dãy số mình chọn có hai số cuối đảo nhau trong đầu vì hồi hộp. Hít một hơi, quay lại máy — lần này chậm rãi từng phím một.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Mã PIN đúng. Màn hình chuyển sang hàng nút giao dịch xanh lá: お引き出し、 お振込、 お預け入れ、 残高照会… Cả một bàn phím vận mệnh, chỉ được bấm đúng một nút.' },
      {
        prompt: 'Muốn rút tiền mặt thì bấm nút nào?',
        choice: [
          {
            label: 'Bấm 「お引き出し」 — rút tiền',
            fx: { jp: 1 }, note: 'Đã chọn đúng nút rút tiền',
            say: [
              { sp: 'narr', text: 'Màn hình nhảy sang bước nhập số tiền. Đúng nút rồi — {name} thở phào, vai thả lỏng hẳn. Hóa ra chỉ cần đọc đúng bốn chữ お引き出し là qua được cửa ải khó nhất.' }
            ]
          },
          {
            label: 'Bấm 「お振込」 — chuyển khoản',
            note: 'Suýt chuyển khoản nhầm — đã hủy kịp trước bước xác nhận',
            say: [
              { sp: 'narr', text: 'Màn hình hiện ra ô nhập số tài khoản người nhận và tên ngân hàng lạ hoắc. {name} giật mình: đây là màn hình CHUYỂN KHOẢN. Chỉ cần bấm thêm nút xác nhận nữa thôi là tiền bay sang tài khoản của một người không quen biết.' },
              { sp: 'narr', text: 'Tim đập thình thịch, {name} bấm ngay 取消 — hủy. Màn hình quay về từ đầu, thẻ được nhả ra. Suýt nữa thì… Thở đều, cho thẻ vào lại, lần này đọc chậm từng nút một rồi mới bấm お引き出し.' }
            ]
          },
          {
            label: 'Bấm 「お預け入れ」 — nộp tiền vào',
            note: 'Đã bấm nhầm nút nộp tiền — khay tiền mở ra trống không, phải làm lại',
            say: [
              { sp: 'narr', text: 'Máy kêu “xoạch” một tiếng, khay đựng tiền bật mở trống không, màn hình bảo cho tiền vào. Đây là nút NỘP tiền, không phải rút. {name} đứng ngơ một lúc mới hiểu, bấm hủy, khay đóng lại, làm lại từ đầu với nút お引き出し.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Tới bước nhập số tiền: bàn phím số hiện ra, kèm các nút tiền mẫu 1,000 / 5,000 / 10,000 yên. {name} cần đúng 5.000 yên cho tuần này — không hơn, không kém.' },
      {
        prompt: 'Nhập số tiền và xác nhận thế nào?',
        choice: [
          {
            label: 'Gõ 5,000, kiểm tra lại trên màn hình rồi bấm 「確認」',
            fx: { jp: 1 }, note: 'Đã nhập đúng 5.000 yên và xác nhận',
            say: [
              { sp: 'narr', text: 'Màn hình hiện rõ: 5,000円. {name} đọc lại lần nữa cho chắc, rồi mới bấm 確認. Trong bụng máy bắt đầu nghe tiếng đếm tiền “sột soạt” rất khẽ.' }
            ]
          },
          {
            label: 'Gõ nhanh 50000 rồi bấm xác nhận luôn cho đỡ xếp hàng',
            note: 'Đã gõ thừa một số 0 — kịp bấm nút sửa trước khi tiền chạy',
            say: [
              { sp: 'narr', text: 'Màn hình hiện: 50,000円 — năm mươi nghìn! Thừa đúng một số 0, mà thừa là rút sạch gần hết số dư. {name} vội bấm 訂正 (sửa lại), xóa về 5,000 rồi mới dám bấm 確認. Ở máy ATM, nhanh chưa bao giờ là khôn.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Máy đếm tiền xong, khe tiền mở ra: năm tờ 1.000 yên mới cứng. Cùng lúc, khe bên cạnh bắt đầu “è è” nhắc nhở — thẻ và biên lai vẫn còn trong máy, chưa ai lấy.' },
      {
        prompt: 'Bước cuối cùng trước khi rời máy:',
        choice: [
          {
            label: 'Cầm tiền, đứng đợi máy nhả thẻ và biên lai rồi mới đi',
            note: 'Đã lấy đủ tiền, thẻ và biên lai',
            say: [
              { sp: 'narr', text: '{name} cất tiền vào ví, rút thẻ, lấy biên lai 明細票, kiểm tra số dư còn lại in trên giấy rồi mới rời máy. Đủ ba thứ trong tay — buổi rút tiền đầu đời ở Nhật kết thúc gọn gàng.' }
            ]
          },
          {
            label: 'Cầm tiền rồi đi luôn cho nhanh',
            note: 'Suýt quên thẻ ở máy ATM — tiếng nhắc đã cứu kịp',
            say: [
              { sp: 'narr', text: 'Đi được ba bước, sau lưng máy ATM kêu “bíp bíp bíp” liên hồi kèm dòng chữ カードをお取りください — “xin lấy thẻ của bạn”. {name} quay phắt lại, rút thẻ ra mà toát mồ hôi: quên thẻ ở ATM là lỗi kinh điển của người mới sang, và máy chỉ chờ một lát ngắn nữa thôi là nuốt thẻ vào trong.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Ra khỏi ngân hàng, {name} mở ví đếm lại: đủ 5.000 yên tiền mặt cho tuần này. Không thừa, không thiếu — và quan trọng nhất là thẻ vẫn nằm nguyên trong ví, không bị khóa, không bị nuốt.' }
    ]
  },
  'post-counter': {
    scene: '📮 Quầy bưu điện — gửi đồ về Việt Nam',
    branch: [
      { sp: 'Nhân viên bưu điện', jp: 'いらっしゃいませ。{本日|ほんじつ}は{国際郵便|こくさいゆうびん}のご{利用|りよう}ですか。お{荷物|にもつ}はこちらへお{願|ねが}いいたします。', text: 'Xin chào quý khách. Hôm nay quý khách gửi bưu phẩm quốc tế phải không ạ? Xin đặt kiện hàng lên đây giúp tôi.' },
      { sp: 'hero', jp: 'ベトナムへ{贈|おく}り{物|もの}を{送|おく}りたいです。こちらが{荷物|にもつ}です。よろしくお{願|ねが}いします。', text: 'Tôi muốn gửi quà về Việt Nam ạ. Đây là kiện hàng của tôi. Nhờ anh giúp cho.' },
      { sp: 'Nhân viên bưu điện', jp: 'かしこまりました。まず{重|おも}さを{量|はか}りますね。…2キロほどございます。こちらの{伝票|でんぴょう}に、{送|おく}り{先|さき}のお{名前|なまえ}とご{住所|じゅうしょ}をご{記入|きにゅう}ください。', text: 'Tôi rõ rồi ạ. Trước hết tôi cân thử nhé… khoảng 2 kg ạ. Xin điền họ tên và địa chỉ người nhận vào tờ vận đơn này.' },
      { sp: 'narr', text: '{name} nắn nót viết địa chỉ ở quê bằng chữ không dấu, đúng như mẫu dán trên tường: tên người nhận, xã, huyện, tỉnh, rồi số điện thoại của mẹ — đầu mối duy nhất để bưu tá ở nhà gọi khi hàng tới.' },
      { sp: 'Nhân viên bưu điện', jp: '{税関|ぜいかん}の{手続|てつづ}きのため、{中身|なかみ}と{金額|きんがく}を{詳|くわ}しくお{書|か}きください。{何|なに}が{入|はい}っていますか。', text: 'Để làm thủ tục hải quan, xin ghi rõ nội dung bên trong và giá trị ạ. Trong kiện có những gì vậy ạ?' },
      { sp: 'hero', jp: 'お{菓子|かし}と{服|ふく}と、{家族|かぞく}への{健康食品|けんこうしょくひん}が{入|はい}っています。{全部|ぜんぶ}で8,000{円|えん}くらいです。', text: 'Có bánh kẹo, quần áo và thuốc bổ cho người nhà ạ. Tất cả khoảng 8.000 yên.' },
      { sp: 'Nhân viên bưu điện', jp: 'リチウム{電池|でんち}が{入|はい}った{機械|きかい}や、{肉製品|にくせいひん}、それから{現金|げんきん}は{入|はい}っていませんか。これらは{国際郵便|こくさいゆうびん}では{送|おく}ることができません。', text: 'Trong kiện có máy móc chứa pin lithium, đồ làm từ thịt, hay tiền mặt không ạ? Những món này không gửi được bằng bưu điện quốc tế đâu ạ.' },
      { sp: 'hero', jp: '{肉|にく}も{現金|げんきん}も{入|はい}っていません。{機械|きかい}もありませんので、{大丈夫|だいじょうぶ}です。', text: 'Thịt cũng không, tiền mặt cũng không ạ. Máy móc cũng không có, nên không sao đâu ạ.' },
      {
        prompt: 'Chọn cách gửi nào cho kiện quà này?',
        choice: [
          {
            label: 'Gửi EMS — nhanh nhất, khoảng một tuần là tới nơi',
            fx: { money: -0.38 }, note: 'Đã chọn EMS: cước cao hơn nhưng hàng tới nơi nhanh',
            say: [
              { sp: 'Nhân viên bưu điện', jp: 'EMSですね。ベトナムまで、だいたい1{週間|しゅうかん}ほどで{届|とど}きます。{追跡|ついせき}もできますので、ご{安心|あんしん}ください。', text: 'Gửi EMS nhé ạ. Về tới Việt Nam mất khoảng một tuần. Có theo dõi được hành trình nên quý khách cứ yên tâm.' },
              { sp: 'narr', text: 'Cước cao hơn hẳn, nhưng nghĩ tới cảnh mẹ nhận được quà sớm, {name} gật đầu không do dự. Quà gửi về nhà thì ngày nào tới nơi, ngày đó mới thật sự là ngày vui.' }
            ]
          },
          {
            label: 'Gửi thường bằng máy bay (航空便) — rẻ hơn, chậm hơn',
            fx: { money: -0.21 }, note: 'Đã chọn gửi thường bằng máy bay: cước rẻ hơn, hàng đi chậm hơn',
            say: [
              { sp: 'Nhân viên bưu điện', jp: '{航空便|こうくうびん}ですね。EMSよりお{安|やす}いですが、{届|とど}くまで2{週間|しゅうかん}ほどかかることがあります。', text: 'Gửi thường bằng máy bay nhé ạ. Rẻ hơn EMS, nhưng hàng có khi mất khoảng hai tuần mới tới nơi.' },
              { sp: 'narr', text: 'Chậm hơn một chút mà cước nhẹ đi hẳn — với kiện quà không có gì gấp, đây là lựa chọn của người biết tính toán. {name} tự nhủ sẽ nhắn mẹ trước để ở nhà khỏi ngóng.' }
            ]
          }
        ]
      },
      { sp: 'Nhân viên bưu điện', jp: 'あと、{伝票|でんぴょう}の{内容品|ないようひん}の{欄|らん}ですが、{入|はい}っているものは{全部|ぜんぶ}、{正直|しょうじき}にお{書|か}きくださいね。', text: 'À, còn ô khai nội dung trên vận đơn: có món gì bên trong, xin quý khách cứ ghi hết và ghi đúng sự thật nhé.' },
      {
        prompt: 'Hộp thuốc bổ cho người nhà — khai thế nào?',
        choice: [
          {
            label: 'Khai thật đầy đủ: ghi cả hộp thuốc bổ vào vận đơn',
            note: 'Đã khai báo đầy đủ mọi món trong kiện hàng',
            say: [
              { sp: 'Nhân viên bưu điện', jp: 'はい、{健康食品|けんこうしょくひん}1{箱|はこ}ですね。{正確|せいかく}に{書|か}いていただき、ありがとうございます。これで{大丈夫|だいじょうぶ}です。', text: 'Vâng, một hộp thuốc bổ nhé ạ. Cảm ơn quý khách đã khai chính xác. Như vậy là ổn rồi ạ.' },
              { sp: 'narr', text: 'Khai đủ thì thủ tục đi thẳng một mạch, chẳng ai phải hỏi lại lần hai. {name} nhìn anh nhân viên đóng dấu “đạt” lên tờ khai hải quan mà thấy nhẹ cả người.' }
            ]
          },
          {
            label: 'Định bỏ qua hộp thuốc bổ, không ghi cho gọn tờ khai',
            fx: { risk: 1 }, note: 'Đã nghe nhân viên nhắc và sửa lại tờ khai cho đầy đủ',
            say: [
              { sp: 'Nhân viên bưu điện', jp: 'すみません、{書|か}かれていないものが{入|はい}っていると、{税関|ぜいかん}で{止|と}められて、{返送|へんそう}されることがあります。{追加|ついか}でお{書|か}きください。', text: 'Xin lỗi quý khách, nếu trong kiện có món không được khai, hàng có thể bị giữ lại ở hải quan và bị gửi trả về đấy ạ. Xin quý khách ghi bổ sung vào giúp tôi.' },
              { sp: 'narr', text: 'Anh nhân viên nói rất nhẹ, không hề nặng lời — chỉ nhắc như nhắc một việc hiển nhiên. {name} đỏ mặt, cầm bút ghi thêm hộp thuốc bổ vào tờ khai. Khai thiếu một dòng, suýt nữa kiện quà đi nửa đường rồi quay đầu về Nhật.' }
            ]
          }
        ]
      },
      { sp: 'Nhân viên bưu điện', jp: 'お{預|あず}かりいたします。こちらがお{客様|きゃくさま}の{控|ひか}えです。{追跡番号|ついせきばんごう}で、{配達|はいたつ}の{状況|じょうきょう}が{確認|かくにん}できます。', text: 'Tôi xin nhận kiện hàng ạ. Đây là biên lai của quý khách. Dùng mã theo dõi này là tra được tình trạng vận chuyển đấy ạ.' },
      { sp: 'narr', text: 'Kiện hàng dán nhãn đỏ trượt vào băng chuyền phía sau quầy. Từ 日本橋 tới quê nhà — ít ngày nữa, ở đầu bên kia, sẽ có người ký nhận thay cho {name}, và việc đầu tiên người ấy làm chắc chắn là gọi điện sang.' }
    ]
  },
  'post-box': {
    scene: '📮 Hòm thư đỏ & bảng giá cước',
    branch: [
      { sp: 'narr', text: 'Ngay trong sảnh bưu điện là hòm thư đỏ đứng sừng sững, dấu 〒 trắng nổi bật trên nền sơn bóng. Cạnh hòm thư là bảng giá cước 料金表 dán kính, và một dãy bàn nhỏ có sẵn keo dán, bút bi buộc dây — chỗ cho người ta ngồi viết thư tay.' },
      { sp: 'Nhân viên bưu điện', jp: 'そちらの{料金表|りょうきんひょう}に、{切手|きって}の{値段|ねだん}が{出|で}ています。{分|わ}からないことがあれば、お{気軽|きがる}にお{聞|き}きください。', text: 'Giá tem có ghi trên bảng giá cước đằng kia đấy ạ. Có gì không rõ, quý khách cứ hỏi tôi thoải mái nhé.' },
      { sp: 'narr', text: '{name} đọc bảng giá từ trên xuống: bưu thiếp はがき dán tem 85 yên; thư thường định hình 定形, nhẹ và đúng khổ chuẩn, dán tem 110 yên. Gửi đồ dày cộm thì có phong bì mua sẵn レターパック: loại 430 yên và loại 600 yên, nhét vừa là gửi, không cần cân.' },
      { sp: 'hero', jp: 'すみません、この{手紙|てがみ}は{定形|ていけい}ですか。{切手|きって}は{何円|なんえん}のものを{貼|は}ればいいですか。', text: 'Xin lỗi, lá thư này của tôi có phải thư định hình không ạ? Tôi phải dán tem bao nhiêu yên ạ?' },
      { sp: 'Nhân viên bưu điện', jp: 'はい、{定形郵便|ていけいゆうびん}ですので、110{円|えん}の{切手|きって}で{結構|けっこう}です。はがきでしたら、85{円|えん}の{切手|きって}をお{貼|は}りください。', text: 'Vâng, đây là thư định hình nên dán tem 110 yên là được ạ. Còn nếu là bưu thiếp thì quý khách dán tem 85 yên nhé.' },
      { sp: 'Nhân viên bưu điện', jp: '{厚|あつ}いものや{大|おお}きいものを{送|おく}るときは、レターパックが{便利|べんり}です。430{円|えん}と600{円|えん}の2{種類|しゅるい}がございます。', text: 'Khi gửi đồ dày hoặc to, dùng Letter Pack rất tiện ạ. Có hai loại: 430 yên và 600 yên.' },
      { sp: 'narr', text: '{name} mua một tấm bưu thiếp in hình phố 浅草 và một con tem cho lá thư đã viết sẵn một nửa. Ở quầy bên cạnh, một bác lớn tuổi đang cẩn thận nhét xấp tài liệu vào phong bì レターパック màu đỏ, dán kín miệng bằng băng dính chuyên dụng.' },
      {
        prompt: 'Trước khi bỏ thư vào hòm, {name} làm gì với tấm bưu thiếp?',
        choice: [
          {
            label: 'Ngồi xuống bàn, viết vài dòng thật lòng gửi cho mẹ',
            fx: { love: 2, pressure: -1, money: -0.02 }, note: 'Đã ngồi viết mấy dòng thật lòng lên bưu thiếp gửi mẹ',
            say: [
              { sp: 'narr', text: '{name} ngồi vào chiếc bàn nhỏ cạnh hòm thư, nắn nót viết: “Mẹ ơi, con sang tới nơi rồi, ở bên này mọi thứ đều lạ mà cũng đều tử tế. Con ăn ngủ đàng hoàng, mẹ đừng lo. Cuối tháng con gọi về lâu lâu một bữa.” Viết xong, đọc lại, thấy mắt mình hơi cay.' },
              { sp: 'narr', text: 'Chỉ mấy dòng thôi, mà tấm bưu thiếp mỏng bỗng nặng hơn hẳn. {name} dán tem 85 yên lên góc phải, vuốt phẳng mép tem, rồi mới trịnh trọng bỏ cả bưu thiếp lẫn lá thư vào khe hòm đỏ.' }
            ]
          },
          {
            label: 'Chỉ dán tem rồi gửi lá thư để trống cho nhanh',
            fx: { pressure: 1, money: -0.02 }, note: 'Đã gửi phong bì đi mà chẳng viết thêm được dòng nào',
            say: [
              { sp: 'narr', text: '{name} dán vội con tem, thả phong bì vào hòm thư rồi quay đi. Bên trong phong bì… gần như trống, chỉ có mỗi địa chỉ người nhận viết nắn nót. Có những điều muốn nói mà cứ để “hôm nào viết”, rồi hôm nào mãi chẳng tới.' },
              { sp: 'narr', text: 'Đi ra tới cửa, {name} còn ngoái lại nhìn hòm thư đỏ một lần. Tiếng phong bì rơi xuống đáy hòm nghe “cạch” một cái — nhẹ tênh, như chính lá thư ấy vậy.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Hòm thư đỏ nuốt lấy những lá thư của cả khu phố, ngày hai lượt xe tới gom. Từ đây, thư của {name} sẽ qua tay bưu tá, qua sân bay, qua nửa vòng trái đất — chậm rãi như ngày xưa, mà chắc chắn như một lời hứa.' },
      { sp: 'Nhân viên bưu điện', jp: 'ありがとうございました。お{手紙|てがみ}、{確|たし}かにお{預|あず}かりしました。', text: 'Cảm ơn quý khách ạ. Thư của quý khách, chúng tôi đã nhận cẩn thận rồi ạ.' }
    ]
  }
});
