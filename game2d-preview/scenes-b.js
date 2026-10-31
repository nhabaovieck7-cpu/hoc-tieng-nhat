// scenes-b.js — Hội thoại ĐẦY ĐỦ cho 4 bối cảnh (bệnh viện / siêu thị / karaoke /
// izakaya) của demo 2D «TUỔI TRẺ Ở NHẬT» — bản staging.
// LUẬT THỂ NGỮ: lễ tân bệnh viện / dược sĩ / thu ngân siêu thị / lễ tân karaoke nói
// kính ngữ + teineigo phục vụ; chủ quán izakaya kính vừa đủ + thân mật ấm;
// Hùng "sẹo" trong izakaya-menu nói tiếng Việt suồng sã kiểu bạn bè.
// Cảnh kaiwa dùng { scene, lines, wrong, outro } — wrong đánh số theo THỨ TỰ CÂU HERO
// (câu hero đầu tiên = 0), mỗi điểm có đúng 2 câu sai kiểu người Việt mới học.
// Cảnh rẽ nhánh dùng { scene, branch } theo đúng engine.js (prompt/choice/fx/say).
// Nối thêm vào window.DEMO_DATA (KHÔNG ghi đè các cảnh trong data.js).
(function () {
  'use strict';

  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

    'hospital-reception': {
      scene: '🏥 Bệnh viện — quầy lễ tân',
      wrong: {
        0: [
          '{今日|きょう}は{私|わたし}が{初|はじ}めてです。{診察券|しんさつけん}は{保険証|ほけんしょう}にありません。',
          '{初|はじ}めての{私|わたし}は{今日|きょう}です。{保険証|ほけんしょう}を{持|も}ちますでした。'
        ],
        1: [
          '{私|わたし}の{頭|あたま}はとても{熱|あつ}いです。{熱|ねつ}は{昨日|きのう}の{夜|よる}から{私|わたし}を{持|も}っています。',
          '{頭|あたま}が{燃|も}えています。38{度|ど}の{熱|ねつ}が{体|からだ}に{座|すわ}っています。'
        ],
        2: [
          '{頭|あたま}を{痛|いた}いです。のどは{私|わたし}を{痛|いた}みます。',
          '{痛|いた}い{頭|あたま}がいます。のどの{中|なか}に{痛|いた}みが{歩|ある}いています。'
        ],
        3: [
          '{咳|せき}を{少|すこ}し{飲|の}みます。{吐|は}く{気持|きも}ちは{私|わたし}の{胃|い}にいません。',
          'アレルギーは{薬|くすり}が{私|わたし}を{嫌|きら}いです。{咳|せき}が{私|わたし}から{散歩|さんぽ}します。'
        ]
      },
      lines: [
        { sp: 'Lễ tân bệnh viện', jp: 'おはようございます。{本日|ほんじつ}はどのようなご{用件|ようけん}でしょうか。{保険証|ほけんしょう}と{診察券|しんさつけん}をお{持|も}ちですか。', vi: 'Chào buổi sáng ạ. Hôm nay quý khách đến vì việc gì ạ? Anh/chị có mang thẻ bảo hiểm và thẻ khám bệnh không ạ?' },
        { sp: 'hero', jp: 'すみません、{今日|きょう}が{初|はじ}めてです。{診察券|しんさつけん}はまだありませんが、{保険証|ほけんしょう}は{持|も}っています。', vi: 'Xin lỗi, hôm nay là lần đầu tôi đến. Tôi chưa có thẻ khám, nhưng có mang thẻ bảo hiểm ạ.' },
        { sp: 'Lễ tân bệnh viện', jp: 'かしこまりました。では、{初診|しょしん}の{方|かた}はこちらの{問診票|もんしんひょう}にご{記入|きにゅう}ください。{今日|きょう}はどうされましたか。', vi: 'Tôi rõ rồi ạ. Vậy người khám lần đầu xin điền vào tờ khai triệu chứng này ạ. Hôm nay anh/chị thấy không khỏe ở đâu ạ?' },
        { sp: 'hero', jp: '{昨日|きのう}の{夜|よる}から{熱|ねつ}があります。{今朝|けさ}{測|はか}ったら、38{度|ど}ありました。', vi: 'Từ tối qua tôi đã bị sốt. Sáng nay đo thì được 38 độ ạ.' },
        { sp: 'hero', jp: 'あと、{頭|あたま}が{痛|いた}くて、のども{少|すこ}し{痛|いた}いです。', vi: 'Với lại đầu tôi đau, cổ họng cũng hơi đau ạ.' },
        { sp: 'Lễ tân bệnh viện', jp: 'ほかに、{咳|せき}や{吐|は}き{気|け}はありますか。お{薬|くすり}のアレルギーはありますか。', vi: 'Ngoài ra anh/chị có ho hay buồn nôn không ạ? Anh/chị có dị ứng với thuốc nào không ạ?' },
        { sp: 'hero', jp: '{咳|せき}は{少|すこ}し{出|で}ますが、{吐|は}き{気|け}はありません。{薬|くすり}のアレルギーもありません。', vi: 'Tôi hơi ho một chút, nhưng không buồn nôn. Tôi cũng không dị ứng thuốc ạ.' },
        { sp: 'Lễ tân bệnh viện', jp: '{記入|きにゅう}の{前|まえ}に、{待合室|まちあいしつ}の{隅|すみ}にある{機械|きかい}で{血圧|けつあつ}を{測|はか}ってください。{自分|じぶん}で{測|はか}れる{機械|きかい}です。', vi: 'Trước khi điền đơn, xin anh/chị đo huyết áp bằng chiếc máy ở góc phòng chờ ạ. Đó là máy tự phục vụ, tự đo được ạ.' },
        { sp: 'hero', jp: 'わかりました。{腕|うで}を{入|い}れてボタンを{押|お}せばいいですか。', vi: 'Tôi hiểu rồi. Chỉ cần cho tay vào máy và bấm nút là được phải không ạ?' },
        { sp: 'Lễ tân bệnh viện', jp: 'はい、そうです。{結果|けっか}が{印刷|いんさつ}されますので、{問診票|もんしんひょう}と{一緒|いっしょ}にこちらへお{出|だ}しください。', vi: 'Vâng, đúng vậy ạ. Kết quả sẽ được in ra, xin anh/chị nộp nó cùng tờ khai triệu chứng ở quầy này ạ.' },
        { sp: 'Lễ tân bệnh viện', jp: '{受付|うけつけ}が{終|お}わると{番号|ばんごう}をお{渡|わた}しします。{番号|ばんごう}でお{呼|よ}びしますので、{待合室|まちあいしつ}でお{待|ま}ちください。お{支払|しはら}いは{診察|しんさつ}のあと、{隣|となり}の{会計|かいけい}で{別|べつ}にお{願|ねが}いします。', vi: 'Khi tiếp nhận xong, tôi sẽ đưa số thứ tự ạ. Chúng tôi gọi theo số nên xin anh/chị chờ ở phòng chờ. Tiền khám thì sau khi khám xong, xin thanh toán riêng ở quầy thu ngân bên cạnh ạ.' },
        { sp: 'hero', jp: 'はい、わかりました。{保険|ほけん}があると、{自己負担|じこふたん}は3{割|わり}でしたね。', vi: 'Vâng, tôi hiểu rồi. Có bảo hiểm thì phần tự trả là 30% phải không ạ?' },
        { sp: 'Lễ tân bệnh viện', jp: 'はい、{今日|きょう}の{診察|しんさつ}は3{割負担|わりふたん}になります。では、こちらが{番号札|ばんごうふだ}です。', vi: 'Vâng ạ, buổi khám hôm nay anh/chị tự trả 30%. Đây là phiếu số của anh/chị ạ.' },
        { sp: 'hero', jp: 'ありがとうございます。{待合室|まちあいしつ}で{待|ま}ちます。', vi: 'Cảm ơn chị. Tôi sẽ chờ ở phòng chờ ạ.' }
      ],
      outro: '{name} ngồi xuống hàng ghế chờ, tay cầm tờ khai triệu chứng và tờ kết quả huyết áp vừa in. Bảng điện tử nhảy từng số một — A 015, A 016… Chưa tới lượt mình, nhưng ít nhất {name} đã nắm được quy trình: lễ tân, tự đo huyết áp, ngồi chờ gọi theo số, khám xong mới sang quầy 会計 bên cạnh thanh toán riêng.'
    },

    'hospital-pharmacy': {
      scene: '💊 Bệnh viện — quầy phát thuốc',
      wrong: {
        0: [
          'お{薬手帳|くすりてちょう}は{私|わたし}の{家|いえ}で{寝|ね}ています。{今日|きょう}は{持|も}ちませんでしたする。',
          '{手帳|てちょう}は{薬|くすり}を{持|も}っていますか。{私|わたし}は{家|いえ}に{手帳|てちょう}を{忘|わす}れますでした。'
        ],
        1: [
          'ジェネリックは{私|わたし}です。{安|やす}い{薬|くすり}を{私|わたし}に{変|か}えてくださいます。',
          '{安|やす}ければジェネリックを{食|た}べます。{先発薬|せんぱつやく}は{高|たか}いから{私|わたし}を{嫌|きら}います。'
        ],
        2: [
          '{食後|しょくご}に{薬|くすり}を{食|た}べたほうがいいですか。{眠|ねむ}い{薬|くすり}は{私|わたし}を{寝|ね}ますか。',
          '{薬|くすり}はご{飯|はん}の{友達|ともだち}ですか。{眠|ねむ}くなる{前|まえ}に{車|くるま}が{私|わたし}を{運転|うんてん}しますか。'
        ]
      },
      lines: [
        { sp: 'Dược sĩ', jp: 'お{待|ま}たせいたしました。{番号|ばんごう}の{方|かた}、こちらへどうぞ。お{薬手帳|くすりてちょう}はお{持|も}ちですか。', vi: 'Xin lỗi đã để quý khách chờ. Mời vị khách có số này lại đây ạ. Anh/chị có mang sổ thuốc không ạ?' },
        { sp: 'hero', jp: 'すみません、お{薬手帳|くすりてちょう}は{今日|きょう}{持|も}っていません。{家|いえ}にあります。', vi: 'Xin lỗi, hôm nay tôi không mang sổ thuốc. Tôi để ở nhà ạ.' },
        { sp: 'Dược sĩ', jp: 'かしこまりました。{次回|じかい}はお{持|も}ちください。なお、{処方箋|しょほうせん}は{発行日|はっこうび}を{含|ふく}めて4{日以内|にちいない}でないとお{薬|くすり}と{交換|こうかん}できませんので、ご{注意|ちゅうい}ください。', vi: 'Tôi rõ rồi ạ. Lần sau xin anh/chị mang theo nhé. À, đơn thuốc chỉ có giá trị trong vòng 4 ngày kể cả ngày phát hành, quá hạn là không đổi thuốc được, xin anh/chị lưu ý ạ.' },
        { sp: 'Dược sĩ', jp: '{今日|きょう}は{熱|ねつ}を{下|さ}げるお{薬|くすり}です。{先発薬|せんぱつやく}とジェネリックがありますが、ジェネリックのほうがお{安|やす}くなります。{成分|せいぶん}は{同|おな}じです。', vi: 'Thuốc hôm nay là thuốc hạ sốt ạ. Có thuốc gốc và thuốc generic, thuốc generic thì rẻ hơn ạ. Thành phần thì giống nhau ạ.' },
        { sp: 'hero', jp: 'では、ジェネリックでお{願|ねが}いします。{安|やす}いほうが{助|たす}かります。', vi: 'Vậy cho tôi thuốc generic ạ. Rẻ hơn thì đỡ cho tôi lắm ạ.' },
        { sp: 'Dược sĩ', jp: 'かしこまりました。このお{薬|くすり}は、1{日|にち}3{回|かい}、{食後|しょくご}に1{錠|じょう}ずつお{飲|の}みください。{熱|ねつ}が{下|さ}がっても、{出|だ}された{分|ぶん}は{飲|の}み{切|き}ってください。', vi: 'Rõ rồi ạ. Thuốc này uống 1 ngày 3 lần, sau bữa ăn, mỗi lần 1 viên ạ. Dù đã hạ sốt, cũng xin uống hết phần thuốc đã phát ạ.' },
        { sp: 'hero', jp: '{食後|しょくご}のあと、すぐ{飲|の}んだほうがいいですか。あと、{眠|ねむ}くなる{薬|くすり}はありますか。', vi: 'Sau bữa ăn thì nên uống ngay phải không ạ? Với lại có thuốc nào gây buồn ngủ không ạ?' },
        { sp: 'Dược sĩ', jp: 'はい、こちらのお{薬|くすり}には{眠|ねむ}くなる{成分|せいぶん}が{入|はい}っています。{飲|の}んだあとは、{車|くるま}の{運転|うんてん}や{自転車|じてんしゃ}はお{控|ひか}えください。', vi: 'Vâng, thuốc này có thành phần gây buồn ngủ ạ. Sau khi uống, xin anh/chị tránh lái ô tô, và cả đi xe đạp nữa ạ.' },
        { sp: 'hero', jp: 'わかりました。{今日|きょう}は{運転|うんてん}しません。{家|いえ}でゆっくり{休|やす}みます。', vi: 'Tôi hiểu rồi. Hôm nay tôi sẽ không lái xe. Tôi về nhà nghỉ ngơi ạ.' },
        { sp: 'Dược sĩ', jp: 'お{水|みず}と{一緒|いっしょ}に{飲|の}んでください。もし{高熱|こうねつ}が{続|つづ}いたら、もう{一度|いちど}{病院|びょういん}に{来|き}てください。', vi: 'Xin uống thuốc cùng với nước ạ. Nếu vẫn sốt cao kéo dài, xin anh/chị quay lại bệnh viện một lần nữa ạ.' },
        { sp: 'hero', jp: 'ありがとうございました。{気|き}をつけて{飲|の}みます。', vi: 'Cảm ơn chị nhiều. Tôi sẽ uống cẩn thận ạ.' },
        { sp: 'Dược sĩ', jp: 'お{大事|だいじ}にどうぞ。{早|はや}く{良|よ}くなりますように。', vi: 'Anh/chị giữ gìn sức khỏe nhé. Mong anh/chị mau khỏe ạ.' }
      ],
      outro: '{name} cất túi thuốc vào balo, không quên chụp lại nhãn 1日3回・食後 dán trên từng túi để về nhà đối chiếu. Câu お大事に cuối cùng của dược sĩ nghe nhẹ cả người — ốm ở xứ người mà được dặn dò tử tế, tự nhiên thấy đỡ tủi hẳn.'
    },

    'super-checkout': {
      scene: '🛒 Siêu thị — quầy tính tiền',
      wrong: {
        0: [
          'レジ{袋|ぶくろ}を{着|き}ます。{大|おお}きいのをください。',
          'え、レジが{袋|ふくろ}ですか。{袋|ふくろ}はレジの{中|なか}にありますか。'
        ],
        1: [
          'ないよ。いらない。',
          'うん、ないない。{早|はや}くして。'
        ],
        2: [
          '{現金|げんきん}だよ。はい、{手|て}に{渡|わた}すから{受|う}け{取|と}って。',
          'お{金|かね}はカードじゃないよ。レシート、ちょうだい。'
        ]
      },
      lines: [
        { sp: 'Thu ngân siêu thị', jp: 'いらっしゃいませ。お{次|つぎ}の{方|かた}、どうぞ。かごをこちらに{置|お}いてください。', vi: 'Xin chào quý khách. Mời vị khách tiếp theo ạ. Xin đặt giỏ hàng lên đây ạ.' },
        { sp: 'Thu ngân siêu thị', jp: 'レジ{袋|ぶくろ}はお{付|つ}けしますか。1{枚|まい}3{円|えん}になります。', vi: 'Anh/chị có lấy túi nilon ở quầy không ạ? Một túi là 3 yên ạ.' },
        { sp: 'hero', jp: 'はい、レジ{袋|ぶくろ}を1{枚|まい}お{願|ねが}いします。', vi: 'Vâng, cho tôi xin 1 túi nilon ạ.' },
        { sp: 'Thu ngân siêu thị', jp: 'ポイントカードはお{持|も}ちですか。お{持|も}ちでしたら、こちらの{機械|きかい}にかざしてください。', vi: 'Anh/chị có thẻ điểm không ạ? Nếu có, xin anh/chị quẹt thẻ vào máy này ạ.' },
        { sp: 'hero', jp: 'すみません、ポイントカードは{持|も}っていません。', vi: 'Xin lỗi, tôi không có thẻ điểm ạ.' },
        { sp: 'Thu ngân siêu thị', jp: 'お{預|あず}かりします。サーモンが398{円|えん}、{野菜|やさい}が198{円|えん}、{牛乳|ぎゅうにゅう}が178{円|えん}、パンが128{円|えん}、{卵|たまご}が248{円|えん}、レジ{袋|ぶくろ}が3{円|えん}で、{合計|ごうけい}1,153{円|えん}になります。', vi: 'Tôi xin quét hàng ạ. Cá hồi 398 yên, rau 198 yên, sữa 178 yên, bánh mì 128 yên, trứng 248 yên, túi nilon 3 yên — tổng cộng 1.153 yên ạ.' },
        { sp: 'Thu ngân siêu thị', jp: 'お{支払|しはら}いは{現金|げんきん}ですか、カードですか、{電子|でんし}マネーですか。', vi: 'Anh/chị thanh toán bằng tiền mặt, thẻ hay tiền điện tử ạ?' },
        { sp: 'hero', jp: '{現金|げんきん}でお{願|ねが}いします。2,000{円|えん}あります。', vi: 'Cho tôi trả bằng tiền mặt ạ. Tôi có tờ 2.000 yên ạ.' },
        { sp: 'Thu ngân siêu thị', jp: 'ありがとうございます。お{金|かね}はこちらのトレーに{置|お}いてください。…2,000{円|えん}お{預|あず}かりしました。847{円|えん}のお{返|かえ}しです。', vi: 'Cảm ơn anh/chị. Xin đặt tiền lên chiếc khay này ạ. …Tôi đã nhận 2.000 yên. Tiền thừa trả lại là 847 yên ạ.' },
        { sp: 'hero', jp: 'ありがとうございます。レシートもお{願|ねが}いします。', vi: 'Cảm ơn chị. Cho tôi xin cả hóa đơn nữa ạ.' },
        { sp: 'Thu ngân siêu thị', jp: 'はい、こちらです。お{忘|わす}れ{物|もの}のないよう、ご{確認|かくにん}ください。ありがとうございました。', vi: 'Vâng, đây ạ. Xin anh/chị kiểm tra lại kẻo quên đồ. Cảm ơn quý khách ạ.' },
        { sp: 'hero', jp: 'はい、ありがとうございました。', vi: 'Vâng, cảm ơn chị nhiều ạ.' }
      ],
      outro: 'Ra khỏi quầy, {name} bê giỏ sang bàn サッカー台 ở phía sau để tự xếp hàng vào túi: đồ nặng xuống dưới, trứng và cá hồi lên trên cùng. Ở siêu thị Nhật, qua khỏi máy tính tiền chưa phải là xong — tự xếp túi gọn gàng ở bàn đóng gói cũng là một phần của nghi lễ đi chợ.'
    },

    'super-shelf': {
      scene: '🥬 Siêu thị — kệ rau củ giảm giá',
      branch: [
        { sp: 'narr', text: 'Gần 7 giờ tối, kệ đồ tươi bắt đầu “thay áo”: nhân viên đi dọc kệ, dán tem giảm giá theo giờ — món hết hạn sớm dán trước, món còn cầm cự được dán sau. {name} đẩy xe, mắt đảo như radar săn tem đỏ.' },
        { sp: 'Nhân viên siêu thị', jp: 'いらっしゃいませ。ただいま、{夕方|ゆうがた}のお{得|とく}な{時間|じかん}です。{一部|いちぶ}のお{惣菜|そうざい}は2{割引|わりびき}になっています。', text: 'Nhân viên chào: “Xin chào quý khách. Đang là khung giờ ưu đãi buổi tối ạ. Một số món ăn sẵn đang được giảm 2 phần, tức 20% ạ.”' },
        { sp: 'narr', text: 'Càng về tối, tem càng “nặng đô”: 2割引 rồi tới 3割引, sát giờ đóng cửa là 半額 — giảm hẳn một nửa. Đổi lại, đồ ngon cũng biến mất nhanh như chớp, ai chậm chân là chỉ còn biết ngắm kệ trống.' },
        { sp: 'Bà cụ bên cạnh', jp: 'あら、このサーモン、{半額|はんがく}ねえ。{今日|きょう}はいい{日|ひ}だわ。', text: 'Bà cụ bên cạnh reo khẽ: “Ôi, hộp cá hồi này giảm một nửa này. Hôm nay là ngày đẹp đây.” — Bà cũng đang ngắm đúng hộp cá hồi 半額 cuối cùng trên kệ, tay đã giơ ra nửa chừng.' },
        { sp: 'narr', text: 'Trên kệ chỉ còn đúng một hộp cá hồi 半額, một khay rau xào dán tem 3割引 và vài hộp cơm lặng lẽ chờ người. Bụng {name} réo lên đúng lúc khó xử nhất.' },
        {
          prompt: 'Hộp cá hồi cuối cùng — {name} tính sao?',
          choice: [
            {
              label: 'Lấy hộp cá hồi 半額 — tối nay ăn sang một bữa',
              fx: { money: -0.06, hp: 1 }, note: 'Mua hộp cá hồi giảm nửa giá — tối nay ăn sang',
              say: [
                { sp: 'narr', jp: 'すみません、このサーモンをいただきます。', text: '{name} nhanh tay — nhưng vẫn lịch sự — cầm hộp cá hồi lên trước: “Xin phép, tôi lấy hộp cá hồi này ạ.”' },
                { sp: 'Bà cụ bên cạnh', jp: 'あらあら、{早|はや}かったわねえ。{若|わか}い{人|ひと}は{動|うご}きが{早|はや}いわ。', text: 'Bà cụ cười xòa: “Ôi chao, cháu nhanh thật đấy. Người trẻ tay chân nhanh nhẹn ghê.” — Không giận chút nào, bà quay sang chọn một hộp cơm khác.' },
                { sp: 'narr', text: 'Tối nay ăn sang: cá hồi áp chảo thơm lừng, cơm nóng, canh miso bốc khói. Một hộp cá giảm nửa giá mà chữa lành cả một ngày đi làm mệt nhoài.' }
              ]
            },
            {
              label: 'Chỉ lấy khay rau xào giảm 3割引 — chắc bụng, nhẹ ví',
              fx: { money: -0.03 }, note: 'Chỉ lấy rau xào giảm giá — tiết kiệm mà vẫn no',
              say: [
                { sp: 'narr', jp: '{今日|きょう}はこの{野菜炒|やさいいた}めにします。', text: '{name} cầm khay rau xào 3割引 lên: “Hôm nay mình lấy món rau xào này thôi.” Hộp cá hồi được để lại nguyên trên kệ, cho người đến sau.' },
                { sp: 'narr', text: 'Rau xào giảm giá, về nhà nấu thêm cơm là thành bữa tối gọn, rẻ, đủ no. Ví tiền thở phào — còn hộp cá hồi thì ở lại chờ bà cụ phía sau.' }
              ]
            },
            {
              label: 'Nhường hộp cá hồi cho bà cụ',
              fx: { love: 2, pressure: -1 }, note: 'Nhường hộp cá hồi cho bà cụ',
              say: [
                { sp: 'narr', jp: 'お{先|さき}にどうぞ。', text: '{name} cầm hộp cá hồi, chìa sang phía bà cụ: “Mời bác lấy trước ạ.”' },
                { sp: 'Bà cụ bên cạnh', jp: 'まあ、ありがとう。{優|やさ}しいわねえ。「お{先|さき}にどうぞ」って、いい{言葉|ことば}よ。', text: 'Bà cụ xúc động: “Ôi, cảm ơn cháu. Cháu tốt quá. Câu ‘mời bác trước’ ấy là một câu nói đẹp đấy cháu ạ.” Bà còn đọc lại chậm rãi câu đó cho {name} nhớ mặt chữ.' },
                { sp: 'narr', text: '{name} quay sang khay rau xào 3割引, lòng nhẹ tênh. Có những bữa tối không sang, nhưng ấm — và hôm nay còn học được một câu tiếng Nhật đáng giá hơn cả hộp cá.' }
              ]
            }
          ]
        },
        { sp: 'Nhân viên siêu thị', jp: 'お{買|か}い{上|あ}げ、ありがとうございます。レジはあちらです。', text: 'Nhân viên cúi chào: “Cảm ơn quý khách đã mua hàng. Quầy tính tiền ở phía kia ạ.”' },
        { sp: 'narr', text: '{name} đẩy xe ra quầy tính tiền, trong giỏ là chiến lợi phẩm của một buổi săn tem giảm giá. Ở Nhật, đi siêu thị lúc 7 giờ tối cũng là một môn thể thao — có luật, có đối thủ, và có cả những khoảnh khắc nhường nhau rất người.' }
      ]
    },

    'karaoke-reception': {
      scene: '🎤 Karaoke — thuê phòng hát',
      wrong: {
        0: [
          '{私|わたし}はヒトカラの{人間|にんげん}です。{一人|ひとり}の{歌|うた}をください。',
          '{一|ひと}つでお{願|ねが}いします。{友達|ともだち}は{私|わたし}の{心|こころ}の{中|なか}にいます。'
        ],
        1: [
          '1{時間|じかん}を{飲|の}みたいです。ドリンクバーを{歌|うた}います。',
          'ドリンクバーは{私|わたし}が1{時間|じかん}です。バーをください、{大|おお}きいのを。'
        ],
        2: [
          '{延長|えんちょう}の{電話|でんわ}を{部屋|へや}に{歌|うた}えばいいですか。',
          '{電話|でんわ}の{中|なか}に{延長|えんちょう}がいますか。{私|わたし}は{電話|でんわ}を{長|なが}くします。'
        ]
      },
      lines: [
        { sp: 'Lễ tân karaoke', jp: 'いらっしゃいませ。{何名様|なんめいさま}ですか。ご{予約|よやく}はありますか。', vi: 'Xin chào quý khách. Anh/chị đi mấy người ạ? Anh/chị có đặt trước không ạ?' },
        { sp: 'hero', jp: '{一人|ひとり}です。{予約|よやく}はありませんが、ヒトカラで{利用|りよう}したいです。', vi: 'Tôi đi một mình ạ. Tôi không đặt trước, nhưng muốn hát karaoke một mình — kiểu hitokara — ạ.' },
        { sp: 'Lễ tân karaoke', jp: 'かしこまりました。お{一人様|ひとりさま}ですね。コースは{何時間|なんじかん}になさいますか。', vi: 'Rõ rồi ạ. Một vị khách ạ. Anh/chị muốn thuê theo gói mấy giờ ạ?' },
        { sp: 'hero', jp: '1{時間|じかん}でお{願|ねが}いします。ドリンクバーもつけたいです。', vi: 'Cho tôi 1 giờ ạ. Tôi muốn thêm cả quầy đồ uống tự phục vụ nữa ạ.' },
        { sp: 'Lễ tân karaoke', jp: 'ありがとうございます。お{部屋|へや}は3{番|ばん}です。{受付|うけつけ}の{紙|かみ}をお{持|も}ちになって、エレベーターで2{階|かい}へどうぞ。', vi: 'Cảm ơn anh/chị. Phòng của anh/chị là phòng số 3 ạ. Xin cầm phiếu tiếp nhận này và đi thang máy lên tầng 2 ạ.' },
        { sp: 'hero', jp: '{延長|えんちょう}したいときは、{部屋|へや}の{電話|でんわ}で{連絡|れんらく}すればいいですか。', vi: 'Khi muốn gia hạn thì tôi liên lạc bằng điện thoại trong phòng là được phải không ạ?' },
        { sp: 'Lễ tân karaoke', jp: 'はい、{部屋|へや}の{内線電話|ないせんでんわ}で{受付|うけつけ}までご{連絡|れんらく}ください。{終了時間|しゅうりょうじかん}の10{分前|ふんまえ}にお{知|し}らせします。', vi: 'Vâng, xin anh/chị gọi về lễ tân bằng điện thoại nội bộ trong phòng ạ. Trước giờ kết thúc 10 phút, chúng tôi sẽ báo ạ.' },
        { sp: 'Lễ tân karaoke', jp: 'なお、{飲食物|いんしょくぶつ}の{持|も}ち{込|こ}みはできません。ご{注文|ちゅうもん}は{部屋|へや}のタッチパネルからお{願|ねが}いします。', vi: 'Ngoài ra, không được mang đồ ăn thức uống từ ngoài vào ạ. Muốn gọi món, xin anh/chị đặt qua màn hình cảm ứng trong phòng ạ.' },
        { sp: 'hero', jp: 'わかりました。{食|た}べ{物|もの}は{持|も}ち{込|こ}みません。{中|なか}で{注文|ちゅうもん}します。', vi: 'Tôi hiểu rồi. Tôi sẽ không mang đồ ăn vào, cần gì tôi sẽ gọi món ở trong phòng ạ.' },
        { sp: 'Lễ tân karaoke', jp: 'では、{料金|りょうきん}はお{帰|かえ}りのときで{結構|けっこう}です。マイクは{部屋|へや}に2{本|ほん}あります。', vi: 'Vậy tiền phòng xin thanh toán lúc ra về là được ạ. Trong phòng có sẵn 2 micro ạ.' },
        { sp: 'hero', jp: 'ありがとうございます。では、{行|い}ってきます。', vi: 'Cảm ơn chị. Vậy tôi lên phòng đây ạ.' },
        { sp: 'Lễ tân karaoke', jp: 'はい、いってらっしゃいませ。ごゆっくりお{楽|たの}しみください。', vi: 'Vâng, mời anh/chị ạ. Chúc anh/chị hát vui vẻ, thư thả ạ.' }
      ],
      outro: '{name} cầm phiếu phòng số 3, đi dọc hành lang tím lịm. Một mình đi karaoke — ヒトカラ — ở Nhật là chuyện bình thường nhất quả đất: không ai phán xét, chỉ có mình với âm nhạc, xả hết một tuần mệt mỏi.'
    },

    'karaoke-room': {
      scene: '🎤 Karaoke — phòng hát số 1',
      branch: [
        { sp: 'narr', text: 'Cửa phòng đóng lại, cả thế giới ồn ào ngoài kia biến mất. Phòng thơm mùi vải mới, micro bọc màng dùng một lần đặt ngay ngắn trên bàn, màn hình lớn hiện dòng chữ ♪ リクエスト受付中 ♪ — đang nhận chọn bài.' },
        { sp: 'narr', jp: '{好|す}きな{曲|きょく}を{探|さが}そう。', text: '{name} cầm máy chọn bài cảm ứng — nửa tiếng Nhật, nửa biểu tượng — lẩm bẩm: “Tìm bài mình thích nào.” Máy lướt rất mượt, gõ vài chữ là ra cả danh sách dài.' },
        { sp: 'narr', text: 'Trong mục nhạc quốc tế có cả mấy bài Việt Nam quen thuộc. {name} mừng như bắt được vàng: ở xứ người, nghe lại một giai điệu quê nhà qua chiếc micro xịn cũng là một kiểu chữa lành.' },
        { sp: 'narr', jp: '{今日|きょう}は{思|おも}いっきり{歌|うた}いたい{気分|きぶん}だ。', text: '{name} tự nhủ: “Hôm nay mình đang có hứng hát cho đã đời.” Ly nước lấy từ quầy đồ uống tự phục vụ đã sẵn sàng trên bàn, ống hút cắm ngay ngắn.' },
        { sp: 'narr', text: 'Đồng hồ trên màn hình bắt đầu đếm ngược thời gian thuê phòng. Một giờ hát — dùng thế nào là quyền của {name}.' },
        {
          prompt: 'Một giờ trong phòng hát — {name} dùng thế nào?',
          choice: [
            {
              label: 'Hát hết cỡ, quẩy tới khuya cho đã',
              fx: { hp: -2 }, note: 'Hát hết cỡ tới khuya — vui nhưng kiệt sức',
              say: [
                { sp: 'narr', text: '{name} tăng âm lượng, hát như liveshow một khán giả: bài Việt, bài Nhật, bài nào cũng “full công lực”. Cổ họng bắt đầu khàn, nhưng cảm xúc thì đầy ắp.' },
                { sp: 'Lễ tân karaoke', jp: 'お{客様|きゃくさま}、{夜分遅|よぶんおそ}くに{申|もう}し{訳|わけ}ございません。お{時間|じかん}も{過|す}ぎておりますので、{音量|おんりょう}を{少|すこ}しお{下|さ}げいただけますか。', text: 'Lễ tân gọi điện nội bộ vào phòng, giọng vẫn rất lịch sự: “Thưa quý khách, rất xin lỗi vì đã khuya. Giờ thuê cũng đã quá rồi ạ, anh/chị có thể giảm âm lượng xuống một chút được không ạ?”' },
                { sp: 'narr', jp: '{申|もう}し{訳|わけ}ございませんでした。すぐに{音量|おんりょう}を{下|さ}げます。ご{迷惑|めいわく}をおかけしました。', text: '{name} tỉnh cả người, đáp bằng kính ngữ đàng hoàng: “Tôi thành thật xin lỗi. Tôi sẽ giảm âm lượng ngay. Đã làm phiền mọi người rồi ạ.”' },
                { sp: 'narr', text: 'Âm lượng hạ xuống, {name} khẽ khàng hát nốt bài cuối bằng giọng gần như thì thầm. Về tới nhà, cổ họng khàn đặc — hát hết cỡ tới khuya thì vui thật, nhưng sáng mai đi làm sẽ biết tay nhau.' }
              ]
            },
            {
              label: 'Hát vừa phải, đúng 1 giờ rồi về nghỉ',
              fx: { hp: 1, love: 1 }, note: 'Hát vừa phải rồi về sớm — giữ sức, giữ nhịp',
              say: [
                { sp: 'narr', text: '{name} hát vừa giọng, chọn mấy bài chậm rãi — có bài ngày xưa ở nhà hay nghe cùng người thương. Hát một mình mà như hát cho hai người nghe.' },
                { sp: 'narr', jp: '{楽|たの}しかった。また{来|こ}よう。', text: 'Đúng 1 giờ, {name} tắt máy, trả phòng gọn gàng và tự nhủ: “Vui thật. Lần sau lại tới.” Người nhẹ nhõm, cổ họng còn nguyên — mai đi làm vẫn chào to rõ ràng được.' }
              ]
            },
            {
              label: 'Gọi thêm đồ uống và khoai chiên, vừa ăn vừa hát',
              fx: { money: -0.08, hp: 1 }, note: 'Gọi thêm đồ uống và khoai chiên trong phòng hát',
              say: [
                { sp: 'Nhân viên karaoke', jp: 'お{待|ま}たせいたしました。ご{注文|ちゅうもん}のドリンクとポテトフライです。ごゆっくりどうぞ。', text: 'Nhân viên gõ cửa, mang đồ vào: “Xin lỗi đã để quý khách chờ. Đồ uống và khoai tây chiên anh/chị gọi đây ạ. Xin cứ thư thả ạ.”' },
                { sp: 'narr', text: 'Khoai chiên nóng hổi, đồ uống mát lạnh, micro trong tay — combo này nguy hiểm ở chỗ: hát bài nào cũng thấy hay hơn bình thường một bậc. {name} vừa ăn vừa hát, một giờ trôi qua lúc nào không hay.' }
              ]
            }
          ]
        },
        { sp: 'narr', text: 'Ra khỏi phòng, hành lang tím đã vắng người. {name} trả phiếu ở lễ tân, nghe tiếng mình — khàn khàn hay còn trong veo là tùy tối nay — mà bật cười.' },
        { sp: 'narr', text: 'Hóa ra xả stress ở Nhật cũng có quy trình, có nội quy, và có cả điện thoại nội bộ nhắc khuya. {name} bước ra phố đêm, đầu nhẹ bẫng hơn lúc bước vào rất nhiều.' }
      ]
    },

    'izakaya-master': {
      scene: '🍶 Quán nhậu — gọi chủ quán',
      wrong: {
        0: [
          'やあ、{一人|ひとり}だよ。カウンターに{座|すわ}るぞ。',
          'おい、カウンターでいい。{早|はや}く{何|なに}か{飲|の}ませてくれ。'
        ],
        1: [
          '{生|なま}ビール、くれ。{焼|や}き{鳥|とり}も{早|はや}く{持|も}って{来|こ}い。',
          'ビールは{俺|おれ}が{飲|の}むものだ。{焼|や}き{鳥|とり}を{俺|おれ}にくださいだ。'
        ],
        3: [
          'ベトナムだよ。{先月|せんげつ}{来|き}たばかりだ。{日本語|にほんご}はまだ{下手|へた}だ。',
          '{俺|おれ}はベトナムから{来|き}たんだ。よろしくな、{親父|おやじ}。'
        ]
      },
      lines: [
        { sp: 'Chủ quán nhậu', jp: 'いらっしゃい！お{一人|ひとり}さん？カウンターでいいかい？こちらへどうぞ。', vi: 'Chào mừng cháu! Cháu đi một mình à? Ngồi quầy counter được không? Mời cháu lại đây.' },
        { sp: 'hero', jp: 'こんばんは。{一人|ひとり}です。カウンターでお{願|ねが}いします。', vi: 'Chào buổi tối ạ. Cháu đi một mình. Cho cháu ngồi quầy counter ạ.' },
        { sp: 'Chủ quán nhậu', jp: 'はいよ。まずお{通|とお}しね、{今日|きょう}は{枝豆|えだまめ}だよ。{飲|の}み{物|もの}はどうする？', vi: 'Rồi. Trước tiên là món お通し mang ra đầu tiên nhé, hôm nay là đậu nành luộc. Cháu uống gì nào?' },
        { sp: 'hero', jp: 'とりあえず{生|なま}ビールをお{願|ねが}いします。あと、{焼|や}き{鳥|とり}の{盛|も}り{合|あ}わせもお{願|ねが}いします。', vi: 'Trước tiên cho cháu một bia tươi ạ. Với lại một đĩa yakitori thập cẩm nữa ạ.' },
        { sp: 'Chủ quán nhậu', jp: 'ははは、{元気|げんき}でいいねえ。ただ、{目上|めうえ}の{人|ひと}には「お{願|ねが}いします」って{言|い}うと、もっと{可愛|かわい}がられるよ。あと、このお{通|とお}しは{席料|せきりょう}みたいなもので、350{円|えん}だけもらってるんだ。{悪|わる}いね。', vi: 'Ha ha, trẻ khỏe thế là tốt. Nhưng này, với người lớn tuổi mà nói “お願いします” thì sẽ được quý hơn đấy. À, món お通し này coi như phí chỗ ngồi, quán chỉ lấy 350 yên thôi. Thông cảm cho quán nhé.' },
        { sp: 'hero', jp: '{焼|や}き{鳥|とり}は{塩|しお}でお{願|ねが}いします。', vi: 'Yakitori cho cháu vị muối ạ.' },
        { sp: 'Chủ quán nhậu', jp: 'はいよ、{塩|しお}ね。…{君|きみ}、{顔|かお}を{見|み}ると{外国|がいこく}の{人|ひと}だね。どこの{国|くに}から？{日本|にっぽん}に{来|き}たばかりかい？', vi: 'Rồi, vị muối nhé. …Nhìn mặt là bác biết cháu là người nước ngoài rồi. Cháu từ nước nào tới? Mới sang Nhật phải không?' },
        { sp: 'hero', jp: 'ベトナムから{来|き}ました。{先月|せんげつ}{日本|にっぽん}に{来|き}たばかりで、まだ{日本語|にほんご}を{勉強中|べんきょうちゅう}です。', vi: 'Cháu từ Việt Nam tới ạ. Cháu mới sang Nhật tháng trước, vẫn đang học tiếng Nhật ạ.' },
        { sp: 'Chủ quán nhậu', jp: 'そうか、{来|き}たばかりじゃ{大変|たいへん}だね。でも、{挨拶|あいさつ}ができれば{大丈夫|だいじょうぶ}。うちは{気楽|きらく}な{店|みせ}だから、ゆっくりしていきな。', vi: 'Thế à, mới sang thì vất vả lắm. Nhưng biết chào hỏi lễ phép là ổn rồi. Quán bác là quán thoải mái, cháu cứ ngồi thư thả đi.' },
        { sp: 'hero', jp: '{焼|や}き{鳥|とり}のほかに、おすすめはありますか。', vi: 'Ngoài yakitori ra, còn món nào bác giới thiệu không ạ?' },
        { sp: 'Chủ quán nhậu', jp: '{今日|きょう}は{出汁巻|だしま}き{玉子|たまご}がうまいよ。あと、{炭火|すみび}の{焼|や}き{鳥|とり}は{自慢|じまん}だな。', vi: 'Hôm nay món trứng cuộn dashi ngon lắm. Với lại yakitori nướng than là món tự hào của quán đấy.' },
        { sp: 'hero', jp: 'では、{出汁巻|だしま}き{玉子|たまご}もお{願|ねが}いします。', vi: 'Vậy cho cháu thêm món trứng cuộn dashi nữa ạ.' },
        { sp: 'Chủ quán nhậu', jp: 'はいよ、{待|ま}ってな。…ほら、{生|なま}ビールと{焼|や}き{鳥|とり}、お{待|ま}たせ。', vi: 'Rồi, chờ bác một chút nhé. …Đây, bia tươi và yakitori của cháu đây, xin lỗi đã để cháu chờ.' },
        { sp: 'hero', jp: 'ありがとうございます。いただきます。', vi: 'Cháu cảm ơn bác. Cháu xin phép dùng ạ.' },
        { sp: 'Chủ quán nhậu', jp: 'うん、たくさん{食|た}べて{飲|の}んでいきな。{困|こま}ったことがあったら、また{顔|かお}を{見|み}せな。', vi: 'Ừ, cứ ăn uống nhiều vào nhé. Có chuyện gì khó khăn, lại ghé cho bác thấy mặt đấy.' }
      ],
      outro: '{name} ngồi ở counter, nhìn ông chủ thoăn thoắt lật xiên nướng trên than hồng. Khói thơm, tiếng xèo xèo, tiếng cụng ly quanh quán — và bài học đầu tiên về お通し: món “chào bàn” ấy không miễn phí, nhưng sự ấm áp của ông chủ thì có.'
    },

    'izakaya-menu': {
      scene: '📜 Quán nhậu — thực đơn viết tay',
      branch: [
        { sp: 'narr', text: 'Cả một bức tường dán đầy những mảnh giấy 本日のおすすめ viết tay bằng bút lông: 焼鳥、枝豆、刺身、唐揚げ… Chữ của ông chủ quán bay lượn như rồng, có món chỉ ghi mỗi cái tên, không ghi giá. {name} đọc được chữ nào hay chữ đó.' },
        { sp: 'Hùng "sẹo"', text: '“Ngồi ngồi ngồi! {call} tới là hội này mới đủ mâm. Tối nay không say không về, nghe chưa? Mấy món chữ khó kệ nó — đói thì cứ chỉ tay vào đĩa của bàn bên mà gọi, anh Hùng lo hết!” Hùng cười hô hố, tay đã rót bia ầm ầm.' },
        { sp: 'Nhân viên quán', jp: 'いらっしゃいませ。ご{注文|ちゅうもん}がお{決|き}まりになりましたら、お{呼|よ}びください。', text: 'Nhân viên quán cúi chào: “Xin chào quý khách. Khi nào chọn món xong, xin cứ gọi chúng tôi ạ.” — Rồi đặt thêm đĩa お通し xuống bàn cho cả hội.' },
        { sp: 'Hùng "sẹo"', text: '“Đấy, thực đơn viết tay là phong vị của quán lâu năm. Món nào không ghi giá là món ‘giá theo ngày’ — nhưng quán này quen rồi, không chặt chém đâu. Lo nhất là… cái bụng của {call} tối nay thôi!” Cả hội cười ồ lên.' },
        { sp: 'narr', text: 'Trên bàn, bia đã rót, お通し đã chia. Chỉ còn một quyết định: tối nay {name} sẽ nhập hội tới mức nào.' },
        {
          prompt: 'Tối nay {name} nhập hội kiểu nào?',
          choice: [
            {
              label: 'Uống tới bến cùng hội — không say không về',
              fx: { money: -0.25, hp: -4, love: 3 }, note: 'Uống tới bến cùng cả hội — vui hết mình',
              say: [
                { sp: 'Nhân viên quán', jp: 'はい、{生|なま}ビール4つと{焼|や}き{鳥|とり}の{盛|も}り{合|あ}わせですね。{少々|しょうしょう}お{待|ま}ちください。', text: 'Nhân viên ghi lia lịa: “Vâng, 4 bia tươi và một đĩa yakitori thập cẩm ạ. Xin quý khách đợi một chút ạ.”' },
                { sp: 'Hùng "sẹo"', text: '“Chuẩn bài! {call} hôm nay chơi lớn, anh thích! Cạn ly này — vì những ngày đầu ở Nhật, không có nhau thì biết sống sao!” Ly chạm nhau leng keng, câu chuyện nổ như pháo.' },
                { sp: 'narr', text: 'Vui thật — vui tới bến. Nhưng 1 giờ sáng, {name} lảo đảo về phòng, đầu óc quay cuồng. Sáng mai, chuông báo thức sẽ là bản án: đi làm với cái đầu như búa bổ và đôi mắt không mở nổi…' }
              ]
            },
            {
              label: 'Uống vừa thôi, ăn là chính',
              fx: { money: -0.18, hp: -1, love: 2 }, note: 'Uống vừa, ăn là chính — vui mà vẫn giữ sức',
              say: [
                { sp: 'narr', jp: '{私|わたし}はウーロン{茶|ちゃ}もお{願|ねが}いします。あと、{唐揚|からあ}げをください。', text: '{name} gọi thêm trà ô long để uống xen kẽ: “Cho tôi thêm trà ô long nữa ạ. Với một phần gà chiên ạ.” — Uống một ly, ăn hai miếng, nhịp này bền hơn.' },
                { sp: 'Hùng "sẹo"', text: '“Ừ, thế cũng được — ăn nhiều vào cho anh, gầy như cái que thế kia. Ở Nhật, biết giữ sức mới đi đường dài được, {call} ạ.” Hùng gắp lia lịa đồ ăn sang bát của {name}.' },
                { sp: 'narr', text: 'Bữa nhậu vừa đủ ấm: no bụng, vui miệng, đầu óc vẫn tỉnh táo. Về tới phòng, {name} còn kịp tắm rửa đàng hoàng trước khi ngủ.' }
              ]
            },
            {
              label: 'Ăn xong về sớm, mai còn ôn bài',
              fx: { money: -0.10, love: -1, jp: 1 }, note: 'Ăn xong về sớm ôn bài — Hùng trêu nhưng vẫn thương',
              say: [
                { sp: 'Hùng "sẹo"', text: '“Ơ kìa, ‘gà’ thế {call}! Mới 9 giờ đã đòi về ôm sách à?” Hùng trêu chọc ầm ĩ, cả hội cười theo — nhưng ánh mắt Hùng thì chẳng ác ý chút nào.' },
                { sp: 'Nhân viên quán', jp: 'はい、お{持|も}ち{帰|かえ}りですね。{温|あたた}め{直|なお}してお{食|た}べください。', text: 'Nhân viên gói phần mang về, dặn: “Vâng, phần mang về đây ạ. Về nhà xin hâm lại rồi ăn nhé.”' },
                { sp: 'Hùng "sẹo"', text: '“Trêu thế thôi. Cầm cái đùi gà này về, tối ôn bài đói thì gặm. Học cho giỏi vào — có chữ trong đầu, sau này ai bắt nạt được {call}.” Hùng dúi hộp đồ ăn vào tay {name}, vỗ vai đánh bốp.' }
              ]
            }
          ]
        },
        { sp: 'Chủ quán nhậu', jp: 'おお、{帰|かえ}りかい？{気|き}をつけてな。また{顔|かお}を{見|み}せてくれよ。', text: 'Ông chủ quán ló đầu ra khỏi counter: “Ồ, về rồi à? Đi cẩn thận nhé. Lại ghé cho bác thấy mặt đấy.”' },
        { sp: 'narr', text: '{name} bước ra phố đêm, tiếng cười nói của quán nhậu nhỏ dần sau lưng. Thực đơn viết tay khó đọc, hội bạn ồn ào khó đỡ — mà sao thấy Nhật Bản gần gũi hơn hẳn một bậc.' }
      ]
    }

  });
})();
