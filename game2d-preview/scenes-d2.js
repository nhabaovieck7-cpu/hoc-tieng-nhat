// scenes-d2.js — Hội thoại ĐẦY ĐỦ cho 4 cảnh nhà máy thực phẩm + nông trại
// của game 2D «TUỔI TRẺ Ở NHẬT» (staging — chưa đẩy main).
// Thể ngữ: trưởng ca Tanaka dùng teineigo chuẩn, nghiêm về vệ sinh nhưng ấm
// như người mẹ; bác Yamada nói thể thường chậm rãi của người già làm nông.
// Nhân vật chính luôn nói N5 lịch sự です/ます. Cảnh kaiwa dùng lines/wrong/outro,
// các cảnh còn lại dùng branch (say + choice có fx). Mọi câu Nhật đều có
// furigana {漢字|よみ} và dịch Việt đi kèm trong cùng bước thoại.
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  'shokuhin-leader': {
    scene: '🥩 Nhà máy thực phẩm — trưởng ca Tanaka dặn ca đầu',
    lines: [
      { sp: 'Trưởng ca Tanaka', jp: 'おはようございます。{今日|きょう}は{初|はじ}めての{仕事|しごと}ですね。{入|はい}る{前|まえ}に、{衛生|えいせい}チェックをしますよ。', vi: 'Chào buổi sáng, {name}. Hôm nay là buổi làm đầu tiên của {call} nhỉ. Trước khi vào phòng, chị kiểm tra vệ sinh đã nhé.' },
      { sp: 'hero', jp: 'はい、{手|て}を{洗|あら}いました。せっけんで、{指|ゆび}の{間|あいだ}まで{洗|あら}いました。', vi: 'Vâng, em đã rửa tay rồi ạ. Em rửa bằng xà phòng, rửa kỹ cả kẽ ngón tay ạ.' },
      { sp: 'Trưởng ca Tanaka', jp: 'いいですね。{手洗|てあら}いの{次|つぎ}は、{何|なに}をしましたか。', vi: 'Tốt lắm. Sau khi rửa tay, {call} đã làm gì tiếp theo?' },
      { sp: 'hero', jp: '{消毒|しょうどく}しました。アルコールで、{両手|りょうて}を{消毒|しょうどく}しました。', vi: 'Em đã khử trùng rồi ạ. Em đã khử trùng cả hai tay bằng cồn ạ.' },
      { sp: 'Trưởng ca Tanaka', jp: '{順番|じゅんばん}が{合|あ}っています。{洗|あら}って、{消毒|しょうどく}して、それから{入室|にゅうしつ}です。{次|つぎ}に、{爪|つめ}と{帽子|ぼうし}とマスクを{見|み}せてください。', vi: 'Đúng thứ tự rồi đấy. Rửa tay, khử trùng, rồi mới vào phòng. Tiếp theo, cho chị xem móng tay, mũ và khẩu trang nào.' },
      { sp: 'hero', jp: '{爪|つめ}は{短|みじか}く{切|き}りました。{帽子|ぼうし}とマスクも、{正|ただ}しくつけました。', vi: 'Móng tay em đã cắt ngắn rồi ạ. Mũ và khẩu trang em cũng đã đeo đúng cách rồi ạ.' },
      { sp: 'Trưởng ca Tanaka', jp: 'よくできました。では{質問|しつもん}です。{仕事中|しごとちゅう}にラインが{止|と}まったら、どうしますか。', vi: 'Làm tốt lắm. Giờ chị hỏi nhé: đang làm mà chuyền bỗng dừng lại thì {call} sẽ làm thế nào?' },
      { sp: 'hero', jp: '{自分|じぶん}で{直|なお}しません。『{田中|たなか}さん、ラインが{止|と}まりました』と{呼|よ}んで、{知|し}らせます。', vi: 'Em sẽ không tự sửa ạ. Em sẽ gọi: "Chị Tanaka ơi, chuyền đã dừng lại rồi ạ" để báo cho chị biết ạ.' },
      { sp: 'Trưởng ca Tanaka', jp: 'その{通|とお}りです。{機械|きかい}には{触|さわ}らないでください。{安全|あんぜん}が{一番|いちばん}ですよ。', vi: 'Chính xác như vậy. Tuyệt đối không chạm vào máy nhé. An toàn là trên hết đấy.' },
      { sp: 'Trưởng ca Tanaka', jp: '{最後|さいご}に{聞|き}きます。{冷蔵庫|れいぞうこ}の{温度|おんど}は、{何度|なんど}に{保|たも}ちますか。', vi: 'Cuối cùng chị hỏi thêm: nhiệt độ kho lạnh phải giữ ở bao nhiêu độ?' },
      { sp: 'hero', jp: 'マイナス18℃に{保|たも}ちます。{温度|おんど}を{見|み}て、{紙|かみ}に{書|か}きます。', vi: 'Giữ ở âm 18 độ C ạ. Em sẽ xem nhiệt độ rồi ghi lại vào tờ ghi ạ.' },
      { sp: 'Trưởng ca Tanaka', jp: 'はい、その{通|とお}り。{温度|おんど}がおかしいと{思|おも}ったら、すぐ{私|わたし}に{言|い}ってください。{一人|ひとり}で{悩|なや}まないでね。', vi: 'Ừ, đúng rồi đấy. Thấy nhiệt độ lạ thì nói ngay với chị nhé. Đừng tự lo một mình, nghe chưa.' },
      { sp: 'Trưởng ca Tanaka', jp: 'よし、チェックは{終|お}わりです。{一緒|いっしょ}に{入|はい}りましょう。{初日|しょにち}は{緊張|きんちょう}しますが、{私|わたし}がそばにいますよ。', vi: 'Rồi, kiểm tra xong rồi. Mình cùng vào phòng thôi. Ngày đầu ai cũng hồi hộp, nhưng có chị ở ngay bên cạnh đây, đừng lo.' }
    ],
    wrong: {
      0: ['{消毒|しょうどく}しました。それから{手|て}を{洗|あら}いました。', '{手|て}、{洗|あら}ったよ。もう{大丈夫|だいじょうぶ}。'],
      1: ['まだです。{部屋|へや}に{入|はい}ってから{消毒|しょうどく}します。', '{手|て}を{洗|あら}いましたから、{消毒|しょうどく}はしなくてもいいです。'],
      2: ['{爪|つめ}は{長|なが}いですが、{大丈夫|だいじょうぶ}です。{帽子|ぼうし}はかぶりませんでした。', 'マスクは{顎|あご}につけました。{爪|つめ}も{切|き}ってないよ。'],
      3: ['{自分|じぶん}で{機械|きかい}を{直|なお}します。すぐ{見|み}てみます。', 'ラインが{止|と}まった！{誰|だれ}か{来|き}て！'],
      4: ['マイナス5℃でいいです。{温度|おんど}は{見|み}なくてもいいです。', '{温度|おんど}が{高|たか}かったら、ドアを{開|あ}けて{冷|さ}まします。']
    },
    outro: 'Ở nhà máy thực phẩm 大阪, vệ sinh là luật — và cũng là cách bảo vệ người ăn ở đầu bên kia của chuyền sản xuất. {name} bước vào phòng chế biến với đôi tay đã rửa sạch và khử trùng đúng thứ tự, móng tay cắt ngắn, mũ và khẩu trang ngay ngắn. Chị Tanaka đi bên cạnh, nghiêm mà ấm như một người mẹ ở nơi làm việc: ở đây, làm đúng từng việc nhỏ nhất chính là thương người nhất, {call} ạ.'
  },
  'shokuhin-board': {
    scene: '🌡️ Bảng ghi nhiệt độ kho lạnh',
    branch: [
      { sp: 'narr', text: 'Cuối buổi sáng, {name} được giao trực bảng ghi nhiệt độ ở nhà máy thực phẩm 大阪. Tờ giấy treo cạnh cửa kho lạnh đã ghi kín nhiều ngày: cứ hai giờ một dòng, nét chữ của từng ca đều tay như nhịp tim — "-18.2℃ ・ -17.8℃ ・ -18.0℃"… Cột cuối mỗi dòng là chữ ký của người trực ca đó.' },
      { sp: 'Trưởng ca Tanaka', jp: 'マイナス15℃より{高|たか}くなったら、すぐ{私|わたし}に{知|し}らせてください。{自分|じぶん}で{機械|きかい}を{触|さわ}らないでください。', text: 'Đầu ca, chị Tanaka đã chỉ vào tờ ghi mà dặn: "Hễ cao hơn âm 15 độ C thì báo ngay cho chị nhé. Tuyệt đối không tự chạm vào máy đâu đấy."' },
      { sp: 'narr', text: '{name} đọc lại từng dòng cho quen mắt: dòng của ca đêm -18.2℃, dòng đầu giờ sáng -17.8℃, cả hai đều nằm yên dưới vạch an toàn. Rồi mắt {name} dừng lại ở dòng gần nhất, nét mực còn mới của ca trước.' },
      { sp: 'narr', text: 'Dòng gần nhất ghi: -14.6℃. {name} đọc lại lần nữa cho chắc — vẫn là -14.6℃. Con số này đã vượt qua ngưỡng -15℃, chui hẳn lên vùng phải báo ngay mà chị Tanaka vừa dặn. Trong kho lạnh sau cánh cửa kia là cả một lô hàng đang chờ xuất.' },
      { sp: 'narr', jp: '{温度|おんど}がマイナス15℃を{超|こ}えたら、すぐ{報告|ほうこく}してください。', text: 'Dưới tờ ghi có dòng chú thích đỏ viết to: "Nhiệt độ mà vượt quá âm 15 độ C thì phải báo ngay." Dòng chữ đỏ nhìn {name} chằm chằm, như đang chờ xem người trực bảng sẽ làm gì.' },
      {
        prompt: 'Dòng gần nhất ghi -14,6℃ — đã vượt ngưỡng -15℃. {name} làm gì ngay bây giờ?',
        choice: [
          {
            label: 'Chạy đi báo chị Tanaka ngay lập tức',
            fx: { jp: 2, love: 1 }, note: 'Báo ngay khi nhiệt độ vượt ngưỡng — chị Tanaka khen {name} làm đúng quy trình',
            say: [
              { sp: 'narr', jp: '{田中|たなか}さん、{大変|たいへん}です。{温度|おんど}がマイナス14.6℃です。', text: '{name} gấp tờ ghi, chạy thẳng tới chỗ chị Tanaka, báo rõ ràng bằng câu vừa học: "Chị Tanaka ơi, có chuyện rồi ạ. Nhiệt độ đang là âm 14,6 độ C ạ."' },
              { sp: 'Trưởng ca Tanaka', jp: '{知|し}らせてくれて、ありがとう。{記録|きろく}を{正|ただ}しく{見|み}ることも、{大切|たいせつ}な{仕事|しごと}です。', text: 'Chị Tanaka đứng dậy ngay: "Cảm ơn {call} đã báo ngay nhé. Nhìn đúng và ghi đúng sổ sách cũng là một nghề quan trọng đấy — ghi chép đúng cũng là một nghề, nhớ kỹ câu này."' },
              { sp: 'narr', text: 'Chị Tanaka kiểm tra cửa kho, thấy gioăng cửa hở một khe nhỏ, rồi bình tĩnh chỉ đạo chuyển toàn bộ lô hàng sang kho phụ bên cạnh. Việc xong xuôi trong mười lăm phút, không một thùng hàng nào bị ảnh hưởng — tất cả nhờ một dòng chữ được đọc đúng lúc.' }
            ]
          },
          {
            label: 'Đợi 30 phút nữa đo lại xem nhiệt độ có tự xuống không',
            fx: { risk: 1 }, note: 'Chần chừ chờ đo lại — nhiệt độ trong kho không chờ ai bao giờ',
            say: [
              { sp: 'narr', text: '{name} nghĩ bụng: biết đâu máy lạnh chỉ lag một lúc rồi tự xuống lại. {name} đánh dấu vào sổ tay "30 phút nữa xem lại" rồi quay sang làm việc khác, cố không nhìn về phía tờ ghi nữa — nhưng con số -14.6℃ cứ lởn vởn trong đầu.' },
              { sp: 'Trưởng ca Tanaka', jp: '{温度|おんど}は{人|ひと}を{待|ま}ちません。おかしいと{思|おも}ったら、すぐ{知|し}らせてください。', text: 'Đúng lúc đó chị Tanaka tình cờ đi ngang, liếc tờ ghi rồi dừng phắt lại. Giọng chị nghiêm hẳn: "Nhiệt độ không chờ người đâu. Thấy lạ là phải báo ngay cho chị — chậm nửa giờ, hàng trong kho biết tính sao?"' },
              { sp: 'narr', text: 'Chị Tanaka lập tức xử lý chuyển hàng sang kho phụ, vừa làm vừa chỉ cho {name} xem từng bước. {name} đứng bên cạnh, vừa phụ tay vừa thấm: ở nhà máy này, "để xem đã" là câu nói đắt giá nhất — đắt bằng cả một lô hàng.' }
            ]
          },
          {
            label: 'Tự mở kho, chỉnh núm máy lạnh xuống sâu hơn cho chắc',
            fx: { jp: 0, hp: -2 }, note: 'Tự ý chỉnh máy lạnh — bị dạy lại quy trình từ đầu, tay tê cóng vì vào kho không găng',
            say: [
              { sp: 'narr', text: '{name} mở cửa kho lạnh, bước vào trong bằng tay trần, loay hoay xoay núm điều khiển xuống sâu hơn cho "chắc ăn". Hơi lạnh phả ra buốt đến tận xương, mới vài phút mà đầu ngón tay đã tê cóng, đỏ ửng lên.' },
              { sp: 'Trưởng ca Tanaka', jp: '{何|なに}をしているんですか。{勝手|かって}に{触|さわ}ってはいけません。{間違|まちが}えると、{全部|ぜんぶ}の{商品|しょうひん}がだめになります。', text: 'Chị Tanaka chạy tới nơi, hốt hoảng gọi {name} ra ngay: "{call} đang làm gì vậy? Không được tự ý chạm vào máy! Chỉnh sai một nấc là hỏng cả lô hàng đấy, biết không?"' },
              { sp: 'Trưởng ca Tanaka', jp: 'まず{私|わたし}を{呼|よ}んでください。それが{順番|じゅんばん}です。', text: 'Chị vừa xoa hai bàn tay tê cóng của {name} cho ấm lại, vừa dạy lại quy trình từ đầu, chậm rãi từng bước: "Trước hết là gọi chị đã. Đó là thứ tự đúng. Tay lạnh thế này, lần sau nhớ đeo găng rồi mới vào kho, nghe chưa."' },
              { sp: 'narr', text: 'Chị Tanaka tự tay chỉnh lại máy về đúng chế độ, kiểm tra lại gioăng cửa rồi mới cho chuyển hàng sang kho phụ. {name} đứng nhìn, hai tay vẫn còn tê — bài học hôm nay lạnh thật, theo đúng nghĩa đen.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Sau khi lô hàng đã yên vị ở kho phụ và máy lạnh chạy ổn định trở lại, chị Tanaka quay lại chỗ tờ ghi, gõ nhẹ vào dòng trống tiếp theo ở cuối trang rồi đưa cây bút cho {name}.' },
      { sp: 'Trưởng ca Tanaka', jp: '{新|あたら}しい{温度|おんど}を{書|か}いて、{名前|なまえ}も{書|か}いてください。', text: 'Chị nói: "Giờ {call} ghi dòng nhiệt độ mới vào đi, rồi ký tên của mình vào cột cuối nhé."' },
      { sp: 'narr', text: '{name} nắn nót ghi con số mới — nhiệt độ đã về lại vùng an toàn — rồi ký tên mình vào cột chữ ký. Chữ ký còn hơi run, nhưng đó là lần đầu tiên tên của {name} đứng trên một tờ giấy trách nhiệm của nhà máy.' },
      { sp: 'Trưởng ca Tanaka', jp: 'その{名前|なまえ}が、{責任|せきにん}の{印|しるし}ですよ。', text: 'Chị Tanaka nhìn dòng chữ ký, gật đầu cười: "Chữ ký đó là dấu của trách nhiệm đấy. Từ hôm nay, dòng nào có tên {call} là dòng {call} chịu trách nhiệm đến cùng."' },
      { sp: 'narr', text: 'Trước khi quay lại chuyền, {name} nhìn lại tờ ghi nhiệt độ một lần nữa: những con số đều tay của bao nhiêu ca trước, và ở dòng cuối cùng, lần đầu tiên có chữ ký của chính mình. Hóa ra ở nhà máy thực phẩm, biết ghi chép đúng cũng là một nghề — và hôm nay {name} đã bắt đầu học nghề đó.' }
    ]
  },
  'nogyo-boss': {
    scene: '🍅 Nông trại — bác Yamada xem luống cà chua',
    branch: [
      { sp: 'narr', text: 'Sáng sớm ở nông trại 富良野, sương còn đọng trên lá. Bác Yamada — chủ trại, da rám nắng, tay cầm cây kéo tỉa cành cũ — đã đứng sẵn ở đầu luống cà chua, ngẩng mặt nhìn trời một lúc lâu trước khi nhìn xuống ruộng. {name} đi theo sau, học việc buổi đầu tiên ngoài đồng.' },
      { sp: 'Bác Yamada', jp: 'おはよう。まず{空|そら}を{見|み}よう。{今日|きょう}は{晴|は}れそうだ。', text: 'Bác chào bằng thể thường, chậm rãi như nói với con cháu trong nhà: "Chào buổi sáng. Trước tiên nhìn trời đã. Hôm nay có vẻ nắng đẹp đấy."' },
      { sp: 'Bác Yamada', jp: '{次|つぎ}は{葉|は}っぱだ。{葉|は}の{色|いろ}と{裏|うら}を{見|み}ると、トマトの{調子|ちょうし}が{分|わ}かる。', text: 'Bác lật mặt dưới của một chiếc lá lên cho {name} xem: "Tiếp theo là nhìn lá. Nhìn màu lá và mặt dưới của lá là biết cây cà chua đang khỏe hay đang yếu ngay."' },
      { sp: 'narr', text: 'Bác đi dọc luống, tay sờ nhẹ từng gốc, thỉnh thoảng dừng lại ngắt một lá vàng ở sát đất. Nhìn trời, nhìn lá — hai việc tưởng như ngắm cảnh, hóa ra là nửa đầu của một ngày làm nông.' },
      { sp: 'Bác Yamada', jp: '{今日|きょう}は{点滴|てんてき}で{水|みず}やりを{頼|たの}む。{少|すこ}しずつ、ゆっくりだよ。', text: 'Bác chỉ vào hệ ống nhỏ giọt chạy dọc chân luống: "Hôm nay nhờ cháu làm tưới nhỏ giọt nhé. Cứ ít một, thong thả thôi, đừng dội ào ào."' },
      { sp: 'narr', text: '{name} mở van từng đoạn ống, đi dọc luống kiểm tra từng đầu nhỏ giọt: chỗ nào tắc thì khơi nhẹ, chỗ nào rò thì báo bác. Nước thấm xuống đất chậm rãi, đều đều — cách tưới này ít tốn nước mà rễ cây lại uống được đến giọt cuối.' },
      { sp: 'Bác Yamada', jp: 'それから、わき{芽|め}を{取|と}ろう。わき{芽|め}は、この{小|ちい}さい{芽|め}だ。はさみはここだよ。', text: 'Bác đưa cây kéo cho {name}: "Rồi, giờ tỉa chồi nách nhé. Chồi nách là cái chồi nhỏ mọc ở nách lá này này. Kéo đây, cầm lấy."' },
      {
        prompt: 'Bác đã giao kéo. Trước mặt {name} là một cây cà chua với mấy chồi non lẫn lộn — chồi nào là chồi nách, chồi nào là chồi chính, nhìn qua thật khó phân biệt. {name} làm gì?',
        choice: [
          {
            label: 'Giơ kéo lên nhưng dừng lại, hỏi lại bác cho chắc trước khi cắt',
            fx: { jp: 2, love: 1 }, note: 'Hỏi trước khi cắt — bác Yamada gật gù khen nếp làm việc cẩn thận',
            say: [
              { sp: 'narr', jp: 'すみません、この{芽|め}はわき{芽|め}ですか。{切|き}る{前|まえ}に{教|おし}えてください。', text: '{name} đưa kéo tới gần rồi dừng tay, hỏi lại bác bằng câu lịch sự vừa học: "Xin lỗi bác, chồi này có phải chồi nách không ạ? Trước khi cắt, bác chỉ cho cháu với ạ."' },
              { sp: 'Bác Yamada', jp: 'そうだ、{聞|き}いてから{切|き}る。それが{一番|いちばん}いい。', text: 'Bác Yamada gật gù, mắt cười híp lại: "Đúng rồi, hỏi rồi mới cắt. Thế là tốt nhất đấy. Cây cắt sai là không mọc lại được như cũ đâu."' },
              { sp: 'narr', text: 'Bác cầm tay {name}, chỉ tận nơi: chồi nách mọc ở góc giữa thân chính và cành lá. Tiếng kéo "tách" một tiếng gọn — chỉ chồi nách rơi xuống, thân chính vẫn nguyên vẹn vươn lên. Cây đầu tiên, tỉa đúng.' }
            ]
          },
          {
            label: 'Tự tin cắt luôn — chồi nào trông thừa thì cắt, kể cả chồi to nhất ở giữa',
            fx: { jp: 1 }, note: 'Cắt nhầm chồi chính — bác xót ruột nhưng dạy lại tận tay cách phân biệt',
            say: [
              { sp: 'narr', text: '{name} đưa kéo vào chồi to và thẳng nhất ở giữa cây — trông nó "thừa" nhất — và bấm một nhát dứt khoát. Bác Yamada ở luống bên quay lại, khựng người: "Ối… ối cháu ơi…"' },
              { sp: 'Bác Yamada', jp: 'ああ、それは{主|おも}の{茎|くき}だ。もったいないが、{勉強|べんきょう}になったな。{主|おも}は{太|ふと}くてまっすぐ、わき{芽|め}は{細|ほそ}くて{横|よこ}から{出|で}る。', text: 'Bác nâng đoạn chồi vừa bị cắt lên, xót ruột thấy rõ nhưng không hề quát: "Ài, đó là thân chính đấy cháu. Tiếc thật, nhưng coi như một bài học nhé. Nhớ này: chồi chính thì to, thẳng, mọc vươn lên; chồi nách thì mảnh, mọc ngang ra từ nách lá. Khác nhau ở chỗ đó."' },
              { sp: 'narr', text: 'Bác cầm tay {name} tỉa lại từng cây còn lại, cây nào cũng dừng cho {name} tự chỉ trước rồi mới cho cắt. Cây cà chua bị cắt nhầm chồi chính, bác bảo sẽ nuôi chồi nách khỏe nhất thành thân chính mới — cây cũng biết đứng dậy sau vấp ngã, miễn là có người chăm.' }
            ]
          },
          {
            label: 'Tỉa qua loa thật nhanh cho xong luống, còn kịp nghỉ trưa sớm',
            fx: { hp: 0, love: -1 }, note: 'Làm qua loa cho nhanh — bác lặng lẽ làm lại phía sau, {name} tự thấy xấu hổ',
            say: [
              { sp: 'narr', text: '{name} lia kéo thật nhanh dọc luống: chồi sót đầy, vết cắt nham nhở, có cây bị tỉa trụi cả chồi lẫn lá non. Xong sớm hẳn mười phút, {name} phủi tay, bụng nghĩ tới giờ nghỉ trưa.' },
              { sp: 'narr', text: 'Quay lại lấy chai nước, {name} bắt gặp bác Yamada đang lặng lẽ đi lại đúng luống vừa xong: bác tỉa lại từng cây, nhặt từng chồi sót, không một lời trách móc. Tiếng kéo của bác chậm và đều, nghe sao mà nhói.' },
              { sp: 'narr', text: '{name} đứng im một lúc, rồi lặng lẽ quay lại đầu luống, cầm kéo làm lại cùng bác từ cây đầu tiên — lần này chậm và đúng. Bác vẫn không nói gì, chỉ khi làm xong, bác mới vỗ nhẹ vào vai {name} một cái. Cái vỗ vai không lời ấy nặng hơn mọi lời mắng.' }
            ]
          }
        ]
      },
      { sp: 'Bác Yamada', jp: 'ほら、{一|ひと}つ{赤|あか}くなった。{食|た}べてみな。', text: 'Làm xong luống, bác hái một quả cà chua chín đỏ nhất trên cây, chùi nhẹ vào vạt áo rồi đưa cho {name}: "Này, có một quả chín rồi đây. Ăn thử đi cháu."' },
      { sp: 'narr', text: '{name} cắn một miếng: vị ngọt đậm, hơi chua nhẹ, thơm mùi nắng sớm — khác hẳn cà chua mua ở siêu thị. Mồ hôi cả buổi sáng tự nhiên hóa thành vị ngọt trên đầu lưỡi.' },
      { sp: 'Bác Yamada', jp: 'トマトは{正直|しょうじき}だ。{手|て}をかけた{分|ぶん}だけ{赤|あか}くなる。', text: 'Bác nhìn luống cà chua, nói chậm rãi như một câu châm ngôn của cả đời làm nông: "Cà chua thì thật thà lắm. Mình chăm nó bao nhiêu, nó đỏ lên bấy nhiêu."' },
      { sp: 'narr', text: '{name} nhìn lại đôi tay mình — lấm đất, hơi xước vì kéo — rồi nhìn những quả cà chua đang ửng đỏ dọc luống. Ở nông trại 富良野, không có đường tắt nào qua được con mắt của cây cối: làm thật, cây trả thật.' }
    ]
  },
  'nogyo-board': {
    scene: '🚚 Bảng lịch xuất hàng của nông trại',
    branch: [
      { sp: 'narr', text: 'Trong nhà kho của nông trại 富良野 dựng một tấm bảng đen lớn: lịch 出荷予定 — lịch xuất hàng — viết bằng phấn trắng, nét chữ của bác Yamada to và chắc. Ai làm ở trại, sáng ra cũng phải nhìn bảng này trước khi ra đồng.' },
      { sp: 'Bác Yamada', jp: '{水曜日|すいようび}はトマト40{箱|はこ}、スーパーだ。', text: 'Bác lấy viên phấn gạch dưới dòng đầu: "Thứ Tư này: cà chua 40 thùng, giao cho siêu thị đấy."' },
      { sp: 'Bác Yamada', jp: '{金曜日|きんようび}はいちご25トレー、{市場|いちば}だ。', text: 'Bác gạch tiếp dòng thứ hai: "Thứ Sáu: dâu tây 25 khay, đưa ra chợ đầu mối. Dâu thì mong manh, tới hôm đó phải hái trong buổi sáng, không để qua trưa."' },
      { sp: 'narr', text: 'Ở góc phải của bảng, có một dòng ghi chú được khoanh tròn bằng phấn tới hai vòng, nét phấn đè mạnh như sợ người ta đọc sót: ghi chú về trời mưa.' },
      { sp: 'Bác Yamada', jp: '{雨|あめ}なら{収穫|しゅうかく}は{休|やす}みだ。{無理|むり}すると{実|み}が{傷|いた}む。', text: 'Bác đọc lại dòng ghi chú như đọc một điều luật của trại: "Mưa thì hoãn thu hoạch. Cố hái lúc mưa là quả dập, quả thối, hỏng cả chuyến hàng."' },
      { sp: 'narr', jp: '{今夜|こんや}は{大雨|おおあめ}でしょう。', text: 'Chiều hôm đó, bản tin dự báo trên điện thoại của {name} hiện dòng chữ: "Đêm nay sẽ có mưa lớn." {name} nhìn ra phía luống dâu — những quả dâu thứ Sáu phải xuất vẫn còn đang chín dần trên cây, đỏ ửng từng chùm.' },
      {
        prompt: 'Dự báo nói đêm nay mưa lớn, mà dâu phải tới thứ Sáu mới hái theo lịch. {name} nói gì với bác Yamada?',
        choice: [
          {
            label: 'Đề xuất: hay là thu dâu sớm ngay chiều nay, kẻo mưa đêm dập hết quả',
            fx: { jp: 2, love: 2 }, note: 'Đọc được ý trời trước cơn mưa — bác gật gù: đọc được trời là nửa nghề',
            say: [
              { sp: 'narr', jp: 'すみません、{今夜|こんや}は{大雨|おおあめ}です。いちごを{今日|きょう}の{夕方|ゆうがた}に{取|と}りませんか。', text: '{name} đưa điện thoại cho bác xem rồi đề xuất bằng câu lịch sự: "Bác ơi, đêm nay mưa lớn ạ. Hay là mình thu dâu sớm vào chiều nay đi bác, kẻo mưa dập hết quả ạ?"' },
              { sp: 'Bác Yamada', jp: '{空|そら}を{読|よ}めるのは、{仕事|しごと}の{半分|はんぶん}だ。よし、{今日|きょう}{取|と}ろう。', text: 'Bác Yamada nhìn trời, nhìn luống dâu, rồi gật gù thật lâu: "Đọc được trời là nửa nghề rồi đấy cháu. Được, chiều nay hái luôn."' },
              { sp: 'narr', text: 'Cả trại xắn tay hái dâu ngay trong buổi chiều, tay nhanh mà nhẹ, kịp đóng khay cuối cùng khi mây đen vừa kéo kín chân trời. Tối đó mưa trút xuống rào rào — trong kho, những khay dâu khô ráo, đỏ tươi, nằm yên chờ chuyến xe thứ Sáu.' }
            ]
          },
          {
            label: 'Cứ theo đúng lịch cũ — thứ Sáu mới là ngày hái dâu, không xê dịch',
            note: 'Giữ nguyên lịch cũ — bác bảo lịch là để người sửa khi trời đổi, nhưng không ép cháu',
            say: [
              { sp: 'narr', text: '{name} nghĩ: lịch đã viết trên bảng thì cứ thế mà làm, người mới không nên tự ý đổi. {name} nói với bác là mình cứ theo lịch cũ, thứ Sáu hái dâu như đã định.' },
              { sp: 'Bác Yamada', jp: '{予定|よてい}は{人|ひと}が{直|なお}すためにある。{空|そら}が{変|か}われば、{予定|よてい}も{変|か}えるんだ。', text: 'Bác Yamada chỉ cười hiền, không ép một lời: "Lịch là để người sửa đấy cháu. Trời mà đổi thì lịch cũng phải đổi theo. Nhưng thôi, quyết sao là ở cháu — bác chỉ nói để cháu nhớ cho mùa sau."' },
              { sp: 'narr', text: 'Bác nói xong lại ngẩng lên nhìn trời, cái nhìn của người đã sống với đồng ruộng cả đời. {name} bỗng thấy câu "cứ theo lịch cũ" của mình nghe cứng và non quá — bảng phấn thì đứng yên, còn bầu trời thì chưa bao giờ đứng yên cả.' }
            ]
          },
          {
            label: 'Hỏi bác: "Thế mưa thì mai cháu được nghỉ phải không ạ?"',
            note: 'Hỏi mưa có được nghỉ không — bác cười khà: ngoài đồng nghỉ, việc nhà kính thì chất đống',
            say: [
              { sp: 'narr', jp: 'すみません、{雨|あめ}の{日|ひ}は{休|やす}みですか。', text: '{name} gãi đầu, hỏi một câu rất thật lòng: "Bác ơi, thế ngày mưa thì cháu được nghỉ phải không ạ?"' },
              { sp: 'Bác Yamada', jp: '{畑|はたけ}は{休|やす}みだが、ハウスの{仕事|しごと}は{山|やま}ほどあるよ。', text: 'Bác Yamada bật cười khà khà, vỗ đùi: "Ngoài đồng thì nghỉ tay thật đấy, nhưng việc trong nhà kính thì chất đống như núi kia kìa. Mưa là ngày đóng thùng, sửa ống, phân loại quả — trại này chưa có ngày nào hết việc đâu cháu."' },
              { sp: 'narr', text: '{name} cũng bật cười theo. Hóa ra ở nông trại, trời mưa không phải ngày nghỉ — chỉ là ngày công việc chuyển từ ngoài đồng vào trong mái che mà thôi.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Tới giờ phân loại quả để đóng thùng, bác Yamada kéo hai chiếc rổ tới trước mặt {name}: một rổ quả đẹp để đóng thùng xuất hàng, một rổ riêng để quả xấu, quả nứt, quả bị chim mổ.' },
      { sp: 'Bác Yamada', jp: '{悪|わる}い{実|み}は{分|わ}けてジュースにする。いい{箱|はこ}に{混|ま}ぜるな。', text: 'Bác dặn rành rọt: "Quả xấu thì để riêng ra làm nước ép. Đừng có trộn vào thùng đẹp, nghe chưa."' },
      { sp: 'narr', text: '{name} phân loại từng quả một: quả đẹp vào thùng lót giấy mềm, quả xấu sang rổ nước ép. Có quả chỉ xấu đúng một góc nhỏ, bỏ sang rổ riêng thì tiếc, nhưng tay {name} vẫn đặt nó sang rổ nước ép — đúng như lời bác dặn.' },
      { sp: 'Bác Yamada', jp: '{店|みせ}がうちを{信|しん}じるのは、その{正直|しょうじき}さだ。', text: 'Bác nhìn thùng hàng vừa đóng xong, gật đầu: "Các cửa hàng tin trại mình, là nhờ cái thật thà đó đấy cháu. Một thùng trộn quả xấu là mất tiếng cả mùa."' },
      { sp: 'narr', text: 'Trước khi rời kho, {name} nhìn lại tấm bảng phấn: thứ Tư cà chua 40 thùng, thứ Sáu dâu 25 khay, dòng ghi chú mưa được khoanh tròn hai vòng. Uy tín của nông trại 富良野 nằm ở những việc nhỏ như thế — đọc được trời, sửa được lịch, và không bao giờ trộn một quả xấu vào thùng đẹp.' }
    ]
  }
});
