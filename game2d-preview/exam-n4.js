// exam-n4.js — NGÂN HÀNG CÂU HỎI MỐC THI JLPT N4 — DỮ LIỆU THẬT CỦA WEB.
// Nguồn (chép nguyên văn, không chế câu mới):
//   · Đề thi thử N4 đầy đủ của web: content-features/practice/full/2026-10-31-n4.json (55 câu)
//   · Đề ngắn hằng ngày N4 của web: content-features/practice/daily/2026-10-31-n4.json (20 câu)
//   · Bộ ôn tuần weekly-mock week-1 N4 của web: content-features/weekly-mock-week1-n4.json (20 câu)
// Đã loại câu trùng theo nội dung câu hỏi (0 câu trùng giữa 3 nguồn; tổng 95 câu giữ nguyên).
// Ánh xạ trường: nguồn đã dùng đúng tên trường đích (section/question/choices/answer/explain_vi) và đúng nhãn section (文字・語彙 / 文法 / 読解) nên chép 1-1, chỉ thêm trường src (full/daily/mock) theo đúng mẫu exam-n5.js.
// Luật trình bày giữ như đề web: KHÔNG furigana trên câu hỏi.
(function () {
  'use strict';
  window.EXAM_N4 = {
    source: 'content-features/practice/full/2026-10-31-n4.json + content-features/practice/daily/2026-10-31-n4.json + content-features/weekly-mock-week1-n4.json',
    questions: [
      {
        "section": "文字・語彙",
        "question": "明日までに先生へ連絡してください。「連絡」の読み方はどれですか。",
        "choices": [
          "れんらく",
          "れんらぐ",
          "れんがく",
          "れいらく"
        ],
        "answer": 0,
        "explain_vi": "連絡 đọc là れんらく, nghĩa là liên lạc. Cần tránh nhầm sang れんがく hay れいらく.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "工事の場所では安全に気をつけてください。「安全」の読み方はどれですか。",
        "choices": [
          "あんせん",
          "あんぜん",
          "あんせい",
          "あんぜい"
        ],
        "answer": 1,
        "explain_vi": "安全 đọc là あんぜん, nghĩa là an toàn. Chữ 全 trong từ này đọc là ぜん, không phải せん.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "ホテルの受付で部屋の鍵をもらいました。「受付」の読み方はどれですか。",
        "choices": [
          "じゅふ",
          "うけふ",
          "うけつけ",
          "じゅつけ"
        ],
        "answer": 2,
        "explain_vi": "受付 đọc là うけつけ, nghĩa là quầy lễ tân, nơi tiếp nhận. Đây là cách đọc ghép đặc biệt, không đọc theo âm on đơn lẻ.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "旅行の前に、荷物の準備をしました。「準備」の読み方はどれですか。",
        "choices": [
          "しゅんび",
          "じゅんべ",
          "じゅんぴ",
          "じゅんび"
        ],
        "answer": 3,
        "explain_vi": "準備 đọc là じゅんび, nghĩa là chuẩn bị. Âm đầu là じゅん, không phải しゅん.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "明日の会議は3時から始まります。「会議」の読み方はどれですか。",
        "choices": [
          "かいぎ",
          "かいき",
          "あいぎ",
          "かいじ"
        ],
        "answer": 0,
        "explain_vi": "会議 đọc là かいぎ, nghĩa là cuộc họp. Chữ 議 đọc là ぎ ở cuối từ này.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "父は毎日、車を運転して会社へ行きます。「運転」の読み方はどれですか。",
        "choices": [
          "うんでん",
          "うんてん",
          "うんてむ",
          "うんてい"
        ],
        "answer": 1,
        "explain_vi": "運転 đọc là うんてん, nghĩa là lái xe, vận hành. Chữ 転 đọc là てん, không phải でん.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "郵便局で手紙を出しました。「郵便」の読み方はどれですか。",
        "choices": [
          "ゆうべん",
          "ゆうぴん",
          "ゆうびん",
          "ゆうみん"
        ],
        "answer": 2,
        "explain_vi": "郵便 đọc là ゆうびん, nghĩa là bưu điện, thư từ. Âm cuối là びん, không phải べん hay ぴん.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "最近、朝はとても寒くなりました。「最近」の読み方はどれですか。",
        "choices": [
          "さいこん",
          "さいぎん",
          "さいきむ",
          "さいきん"
        ],
        "answer": 3,
        "explain_vi": "最近 đọc là さいきん, nghĩa là gần đây. Chữ 近 đọc là きん trong từ này.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "分からないことがあったら、先生に相談してください。「相談」の読み方はどれですか。",
        "choices": [
          "そうだん",
          "そうたん",
          "しょうだん",
          "そうだむ"
        ],
        "answer": 0,
        "explain_vi": "相談 đọc là そうだん, nghĩa là bàn bạc, xin tư vấn. Chữ 談 đọc là だん, không phải たん.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "わたしたちは「かんきょう」を守らなければなりません。「かんきょう」を漢字で書いたものはどれですか。",
        "choices": [
          "観境",
          "環境",
          "完境",
          "環況"
        ],
        "answer": 1,
        "explain_vi": "かんきょう viết bằng kanji là 環境, nghĩa là môi trường. 環 là vòng quanh, 境 là ranh giới, hoàn cảnh.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "日本で働いた「けいけん」があります。「けいけん」を漢字で書いたものはどれですか。",
        "choices": [
          "軽験",
          "経検",
          "経験",
          "経賢"
        ],
        "answer": 2,
        "explain_vi": "けいけん viết là 経験, nghĩa là kinh nghiệm. Cặp kanji đúng là 経 và 験, không phải 検 (kiểm tra).",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "あの歌手はとても「ゆうめい」です。「ゆうめい」を漢字で書いたものはどれですか。",
        "choices": [
          "有明",
          "由名",
          "友名",
          "有名"
        ],
        "answer": 3,
        "explain_vi": "ゆうめい viết là 有名, nghĩa là nổi tiếng. 有明 đọc là ゆうめい trong một số tên riêng nhưng nghĩa khác, không dùng cho nghĩa nổi tiếng ở đây.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "健康は「たいせつ」なものです。「たいせつ」を漢字で書いたものはどれですか。",
        "choices": [
          "大切",
          "大節",
          "太切",
          "大窃"
        ],
        "answer": 0,
        "explain_vi": "たいせつ viết là 大切, nghĩa là quan trọng, quý giá. Đây là cặp kanji cố định 大 và 切.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "ここに名前と「じゅうしょ」を書いてください。「じゅうしょ」を漢字で書いたものはどれですか。",
        "choices": [
          "往所",
          "住所",
          "住処",
          "主所"
        ],
        "answer": 1,
        "explain_vi": "じゅうしょ viết là 住所, nghĩa là địa chỉ nơi ở. 住 là ở, sinh sống, kết hợp với 所 là nơi chốn.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "部屋が暑かったので、窓を（　）ました。",
        "choices": [
          "閉めました",
          "捨てました",
          "開けました",
          "消しました"
        ],
        "answer": 2,
        "explain_vi": "Phòng nóng nên phải mở cửa sổ: 窓を開けました. 閉める là đóng, 捨てる là vứt, 消す dùng cho tắt đèn, điện.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "夜遅くなったので、友だちを駅まで（　）。",
        "choices": [
          "集まりました",
          "始まりました",
          "止まりました",
          "送りました"
        ],
        "answer": 3,
        "explain_vi": "送る ở đây là tiễn, đưa ai đó đến nơi: 駅まで送りました. Các động từ còn lại là tự động từ, không đi với を và tân ngữ người như vậy.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "わたしはいつもコーヒーに砂糖を（　）。",
        "choices": [
          "入れます",
          "出します",
          "取ります",
          "捨てます"
        ],
        "answer": 0,
        "explain_vi": "Cho đường vào cà phê dùng 入れます (bỏ vào). 出す là lấy ra, 取る là lấy, 捨てる là vứt đi, đều ngược ngữ cảnh.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "傘を持っていなかったので、雨で服が（　）しまいました。",
        "choices": [
          "乾いて",
          "濡れて",
          "破れて",
          "無くなって"
        ],
        "answer": 1,
        "explain_vi": "Không có ô nên quần áo bị mưa làm ướt: 濡れてしまいました. 乾く là khô, 破れる là rách, 無くなる là mất đi.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "会議の前に、資料をコピーして、みんなに（　）。",
        "choices": [
          "集めました",
          "返しました",
          "配りました",
          "借りました"
        ],
        "answer": 2,
        "explain_vi": "Phát tài liệu cho mọi người dùng 配りました (phân phát). 集める là thu thập, 返す là trả lại, 借りる là mượn.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "風邪をひいたので、病院で（　）をもらいました。",
        "choices": [
          "手紙",
          "切符",
          "荷物",
          "薬"
        ],
        "answer": 3,
        "explain_vi": "Bị cảm nên đến bệnh viện nhận 薬 (thuốc). 手紙 là thư, 切符 là vé, 荷物 là hành lý, không hợp với bệnh viện và bệnh cảm.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "部屋を掃除したあとで、ごみを外に（　）。",
        "choices": [
          "出しました",
          "入れました",
          "作りました",
          "開けました"
        ],
        "answer": 0,
        "explain_vi": "Mang rác ra ngoài dùng 出しました (đưa ra). 入れる là cho vào, ngược hướng với 外に trong câu này.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「電車はもうすぐ来ます」の「もうすぐ」と同じ意味のものはどれですか。",
        "choices": [
          "ときどき",
          "まもなく",
          "ゆっくり",
          "ずっと"
        ],
        "answer": 1,
        "explain_vi": "もうすぐ nghĩa là sắp, ngay bây giờ, gần nghĩa nhất với まもなく. ときどき là thỉnh thoảng, ゆっくり là chậm rãi, ずっと là suốt.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「仕事はだいたい終わりました」の「だいたい」と同じ意味のものはどれですか。",
        "choices": [
          "ぜんぜん",
          "少しだけ",
          "ほとんど",
          "まだまだ"
        ],
        "answer": 2,
        "explain_vi": "だいたい trong câu này nghĩa là phần lớn, hầu như, gần nghĩa với ほとんど. ぜんぜん đi với phủ định, 少しだけ là chỉ một ít.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「お茶はもう結構です」と同じ意味のものはどれですか。",
        "choices": [
          "お茶はとてもおいしいです",
          "お茶をもっとください",
          "お茶をあとで飲みます",
          "お茶はもう要りません"
        ],
        "answer": 3,
        "explain_vi": "もう結構です là cách từ chối lịch sự, nghĩa là tôi đủ rồi, không cần nữa: もう要りません. Không phải lời khen hay lời xin thêm.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「急いで駅へ行きました」の「急いで」と同じ意味のものはどれですか。",
        "choices": [
          "早く",
          "静かに",
          "一人で",
          "歩いて"
        ],
        "answer": 0,
        "explain_vi": "急ぐ là vội vàng, đi nhanh, nên 急いで gần nghĩa với 早く trong ngữ cảnh này. 静かに là yên lặng, 一人で là một mình.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「明日の会議の資料を用意してください」の「用意する」と同じ意味のものはどれですか。",
        "choices": [
          "片付ける",
          "準備する",
          "注文する",
          "予約する"
        ],
        "answer": 1,
        "explain_vi": "用意する nghĩa là chuẩn bị sẵn, gần nghĩa với 準備する. 片付ける là dọn dẹp, 注文する là đặt món, hàng, 予約する là đặt trước.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "明日までにレポートを（　）なければなりません。",
        "choices": [
          "出し",
          "出す",
          "出さ",
          "出して"
        ],
        "answer": 2,
        "explain_vi": "Mẫu phải làm là động từ phủ định bỏ ない rồi thêm なければなりません: 出す → 出さなければなりません. Các dạng còn lại không nối được với なければ.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "わたしは子どものころから習っているので、ピアノを（　）ができます。",
        "choices": [
          "弾いたこと",
          "弾きます",
          "弾く",
          "弾くこと"
        ],
        "answer": 3,
        "explain_vi": "Mẫu có thể làm gì là động từ thể từ điển + ことができます: 弾くことができます. 弾いたことがあります là đã từng làm, khác nghĩa khả năng.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "来年から、新しい仕事を（　）と思っています。",
        "choices": [
          "始めよう",
          "始めたいな",
          "始めること",
          "始めたとき"
        ],
        "answer": 0,
        "explain_vi": "Khi nói ý định của bản thân với と思っています, động từ phải ở thể ý hướng (意向形): 始める → 始めようと思っています. 始めたいな là mong muốn nói suồng sã, không đi với mẫu này.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "公園で遊んでいたら、犬に手を（　）。",
        "choices": [
          "かみました",
          "かまれました",
          "かませました",
          "かまされました"
        ],
        "answer": 1,
        "explain_vi": "Người nói là người bị cắn nên dùng thể bị động: 犬に手をかまれました. かみました là tự mình cắn, かませました là sai khiến.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "先生は学生に教室で本を（　）。",
        "choices": [
          "読みました",
          "読まれました",
          "読ませました",
          "読まされました"
        ],
        "answer": 2,
        "explain_vi": "Thầy giáo cho, bắt học sinh đọc sách là quan hệ sai khiến: 読む → 読ませました. 読まれました là bị động, không hợp với chủ ngữ 先生は.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "雨が（　）、明日の試合は中止になります。",
        "choices": [
          "降るば",
          "降ったば",
          "降りば",
          "降れば"
        ],
        "answer": 3,
        "explain_vi": "Thể điều kiện ば của 降る là 降れば: mưa thì trận đấu bị hủy. Các dạng 降るば, 降ったば, 降りば đều là cách chia sai.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "家に（　）、すぐ電話してください。",
        "choices": [
          "帰ったら",
          "帰るたら",
          "帰ってたら",
          "帰ればたら"
        ],
        "answer": 0,
        "explain_vi": "Mẫu khi, sau khi dùng たら gắn với thể た: 帰る → 帰ったら. 帰るたら và 帰ればたら là dạng ghép sai.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "このケーキはとても（　）そうです。",
        "choices": [
          "おいしいそう",
          "おいしそう",
          "おいしかったそう",
          "おいしいなそう"
        ],
        "answer": 1,
        "explain_vi": "そうです chỉ vẻ bề ngoài với tính từ い thì bỏ い rồi thêm そうです: おいしい → おいしそうです (trông ngon). おいしいそうだ với い nguyên là mẫu truyền đạt, nghĩa khác.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "窓の外を見ると、雨が（　）ようです。",
        "choices": [
          "降るよう",
          "降ったよう",
          "降っているよう",
          "降ってよう"
        ],
        "answer": 2,
        "explain_vi": "ようです diễn tả phán đoán từ quan sát, đi với thể thông thường: 降っているようです (có vẻ đang mưa). Cần trạng thái đang diễn ra 降っている mới hợp với việc nhìn ra ngoài.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "病院の中では、たばこを（　）いけません。",
        "choices": [
          "吸っても",
          "吸うのは",
          "吸わないでは",
          "吸っては"
        ],
        "answer": 3,
        "explain_vi": "Mẫu cấm đoán là thể て + はいけません: 吸ってはいけません. 吸っても đi với いい (được phép), ngược nghĩa với bệnh viện.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "わたしは200メートル（　）。",
        "choices": [
          "泳げます",
          "泳がれます",
          "泳がせます",
          "泳ぎれます"
        ],
        "answer": 0,
        "explain_vi": "Thể khả năng của 泳ぐ (động từ nhóm 1) là 泳げます: tôi bơi được 200 mét. 泳ぎれます là dạng rút gọn sai chuẩn, 泳がれます là bị động.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "次の文の ★ に入るものはどれですか。\nトゥイさんは朝 ＿＿ ★ ＿＿ ＿＿ 会社へ行きます。\n1 起きて　2 顔を洗って　3 パンを食べて　4 電車に乗って",
        "choices": [
          "パンを食べて",
          "顔を洗って",
          "電車に乗って",
          "起きて"
        ],
        "answer": 1,
        "explain_vi": "Thứ tự đúng là 起きて → 顔を洗って → パンを食べて → 電車に乗って (dậy, rửa mặt, ăn bánh, lên tàu). Vị trí ★ thứ hai là 顔を洗って.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "次の文の ★ に入るものはどれですか。\nミンさんは ＿＿ ＿＿ ★ ＿＿ 返しました。\n1 先週　2 図書館で借りた　3 日本語の　4 本を",
        "choices": [
          "先週",
          "図書館で借りた",
          "日本語の",
          "本を"
        ],
        "answer": 2,
        "explain_vi": "Câu đúng: ミンさんは先週図書館で借りた日本語の本を返しました. Vị trí ★ thứ ba là 日本語の, bổ nghĩa cho 本.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "次の文の ★ に入るものはどれですか。\nわたしは ＿＿ ＿＿ ＿＿ ★ なければなりません。\n1 明日　2 までに　3 レポートを　4 出さ",
        "choices": [
          "明日",
          "までに",
          "レポートを",
          "出さ"
        ],
        "answer": 3,
        "explain_vi": "Câu đúng: わたしは明日までにレポートを出さなければなりません. Vị trí ★ thứ tư là 出さ, nối với なければなりません.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "次の文の ★ に入るものはどれですか。\n彼は ＿＿ ★ ＿＿ ＿＿ 人です。\n1 いつも　2 約束を　3 守る　4 まじめな",
        "choices": [
          "約束を",
          "いつも",
          "守る",
          "まじめな"
        ],
        "answer": 0,
        "explain_vi": "Câu đúng: 彼はいつも約束を守るまじめな人です. Vị trí ★ thứ hai là 約束を, tân ngữ của 守る.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "ミンさんは来月から新しい会社で働きます。その前に、日本語をもっと勉強したいと思っています。毎日仕事のあとで図書館へ行って、2時間勉強しています。来週の土曜日には日本語の試験がありますから、今週は特に（　1　）います。また、試験の前の日は早く（　2　）と思っています。\n（　1　）に入るものはどれですか。",
        "choices": [
          "休んで",
          "頑張って",
          "寝て",
          "遊んで"
        ],
        "answer": 1,
        "explain_vi": "Vì tuần sau có kỳ thi nên tuần này đặc biệt cố gắng học: 特に頑張っています. 休む, 寝る, 遊ぶ đều ngược với ngữ cảnh chuẩn bị thi.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "ミンさんは来月から新しい会社で働きます。その前に、日本語をもっと勉強したいと思っています。毎日仕事のあとで図書館へ行って、2時間勉強しています。来週の土曜日には日本語の試験がありますから、今週は特に（　1　）います。また、試験の前の日は早く（　2　）と思っています。\n（　2　）に入るものはどれですか。",
        "choices": [
          "寝る",
          "寝た",
          "寝よう",
          "寝れば"
        ],
        "answer": 2,
        "explain_vi": "Ý định của bản thân với と思っています dùng thể ý hướng: 早く寝ようと思っています (định ngủ sớm). 寝る hay 寝た không diễn đạt ý định trong mẫu này.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "トゥイさんへ\n明日の会議は10時からでしたが、11時に変わりました。場所は前と同じ3階の会議室です。資料は今日の夕方までに送ります。すみませんが、よろしくお願いします。ミンより\n会議は何時から始まりますか。",
        "choices": [
          "9時",
          "10時",
          "10時半",
          "11時"
        ],
        "answer": 3,
        "explain_vi": "Tin nhắn nói cuộc họp vốn từ 10 giờ nhưng đã đổi thành 11時. 10時は giờ cũ, cần chú ý từ 変わりました.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ひまわり町のプールは、月曜日は休みです。火曜日から日曜日まで、朝9時から夜8時まで開いています。小学生は無料ですが、中学生からは300円かかります。\nプールはいつ休みですか。",
        "choices": [
          "月曜日",
          "火曜日",
          "日曜日",
          "祝日"
        ],
        "answer": 0,
        "explain_vi": "Bài viết ghi rõ 月曜日は休みです, tức hồ bơi nghỉ vào thứ Hai. Từ thứ Ba đến Chủ nhật hồ mở cửa nên không phải ngày nghỉ.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは自転車で学校へ通っています。家から学校まで30分かかります。雨の日はバスで行きますが、バスは込んでいるので、時間がもっとかかります。\n雨の日、ミンさんは何で学校へ行きますか。",
        "choices": [
          "自転車",
          "バス",
          "電車",
          "歩いて"
        ],
        "answer": 1,
        "explain_vi": "Bài viết nói 雨の日はバスで行きます, ngày mưa ミンさん đi học bằng xe buýt. Xe đạp là phương tiện ngày thường.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは、みどり市に住んでいます。平日は会社で働いていますが、週末はよくひまわり町の公園へ行きます。先週の土曜日、ミンさんは友だちのトゥイさんと公園でテニスをしました。二人は午前中テニスをして、昼は公園の近くの店でうどんを食べました。午後、急に雨が降り出したので、二人は近くの喫茶店に入りました。そこでコーヒーを飲みながら、来月の旅行について話しました。二人は来月、電車で山へ行く予定です。ミンさんは「天気がよければ、山の上から海が見えるそうです」と言いました。トゥイさんはカメラを持って行くつもりです。\n先週の土曜日、ミンさんはどこでテニスをしましたか。",
        "choices": [
          "みどり市の会社",
          "ひまわり町の体育館",
          "ひまわり町の公園",
          "山の上"
        ],
        "answer": 2,
        "explain_vi": "Bài viết nói hai người chơi tennis ở ひまわり町の公園. 体育館 không xuất hiện trong bài, 山の上 là chuyện của chuyến đi tháng sau.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは、みどり市に住んでいます。平日は会社で働いていますが、週末はよくひまわり町の公園へ行きます。先週の土曜日、ミンさんは友だちのトゥイさんと公園でテニスをしました。二人は午前中テニスをして、昼は公園の近くの店でうどんを食べました。午後、急に雨が降り出したので、二人は近くの喫茶店に入りました。そこでコーヒーを飲みながら、来月の旅行について話しました。二人は来月、電車で山へ行く予定です。ミンさんは「天気がよければ、山の上から海が見えるそうです」と言いました。トゥイさんはカメラを持って行くつもりです。\n午後、二人はどうして喫茶店に入りましたか。",
        "choices": [
          "コーヒーが飲みたかったから",
          "旅行の話をしたかったから",
          "うどんを食べたかったから",
          "雨が降り出したから"
        ],
        "answer": 3,
        "explain_vi": "Bài viết ghi 急に雨が降り出したので、二人は喫茶店に入りました: mưa bất ngờ nên vào quán. Uống cà phê và nói chuyện du lịch là việc làm sau khi đã vào quán.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは、みどり市に住んでいます。平日は会社で働いていますが、週末はよくひまわり町の公園へ行きます。先週の土曜日、ミンさんは友だちのトゥイさんと公園でテニスをしました。二人は午前中テニスをして、昼は公園の近くの店でうどんを食べました。午後、急に雨が降り出したので、二人は近くの喫茶店に入りました。そこでコーヒーを飲みながら、来月の旅行について話しました。二人は来月、電車で山へ行く予定です。ミンさんは「天気がよければ、山の上から海が見えるそうです」と言いました。トゥイさんはカメラを持って行くつもりです。\n来月の旅行について、正しいものはどれですか。",
        "choices": [
          "電車で山へ行く予定だ",
          "トゥイさんはカメラを買う予定だ",
          "車で海へ行く予定だ",
          "ミンさんは一人で行くつもりだ"
        ],
        "answer": 0,
        "explain_vi": "Bài viết nói 二人は来月、電車で山へ行く予定です. トゥイさん chỉ mang theo máy ảnh (持って行く), không phải mua máy ảnh.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "トゥイさんは料理が好きで、先月からみどり市の料理教室に通っています。教室は毎週水曜日の夜にあります。先生はとても親切で、難しい言葉も分かりやすく説明してくれます。先週は日本のカレーを作りました。トゥイさんは家でも作ってみましたが、教室で作ったものより少し辛くなってしまいました。家族は「おいしい」と言って、全部食べてくれました。トゥイさんは次は寿司を作りたいと思っています。教室の友だちと一緒に、来月スーパーへ日本の材料を買いに行く約束もしました。\n料理教室はいつありますか。",
        "choices": [
          "毎週水曜日の朝",
          "毎週水曜日の夜",
          "毎週土曜日の夜",
          "毎月一回の水曜日"
        ],
        "answer": 1,
        "explain_vi": "Bài viết ghi 教室は毎週水曜日の夜にあります, lớp học vào tối thứ Tư hằng tuần. 先月から chỉ là thời điểm bắt đầu học, không phải tần suất mỗi tháng một lần.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "トゥイさんは料理が好きで、先月からみどり市の料理教室に通っています。教室は毎週水曜日の夜にあります。先生はとても親切で、難しい言葉も分かりやすく説明してくれます。先週は日本のカレーを作りました。トゥイさんは家でも作ってみましたが、教室で作ったものより少し辛くなってしまいました。家族は「おいしい」と言って、全部食べてくれました。トゥイさんは次は寿司を作りたいと思っています。教室の友だちと一緒に、来月スーパーへ日本の材料を買いに行く約束もしました。\nトゥイさんが家で作ったカレーはどうでしたか。",
        "choices": [
          "教室で作ったものより甘くなった",
          "家族は誰も食べなかった",
          "教室で作ったものより少し辛くなった",
          "先生に直してもらった"
        ],
        "answer": 2,
        "explain_vi": "Bài viết nói món cà ri làm ở nhà 教室で作ったものより少し辛くなってしまいました, cay hơn một chút so với ở lớp. Gia đình vẫn khen ngon và ăn hết.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "トゥイさんは料理が好きで、先月からみどり市の料理教室に通っています。教室は毎週水曜日の夜にあります。先生はとても親切で、難しい言葉も分かりやすく説明してくれます。先週は日本のカレーを作りました。トゥイさんは家でも作ってみましたが、教室で作ったものより少し辛くなってしまいました。家族は「おいしい」と言って、全部食べてくれました。トゥイさんは次は寿司を作りたいと思っています。教室の友だちと一緒に、来月スーパーへ日本の材料を買いに行く約束もしました。\nトゥイさんは来月、何をする約束をしましたか。",
        "choices": [
          "家族と寿司を作ること",
          "先生と旅行に行くこと",
          "家族とスーパーへ行くこと",
          "教室の友だちと材料を買いに行くこと"
        ],
        "answer": 3,
        "explain_vi": "Cuối bài: 教室の友だちと一緒に、来月スーパーへ日本の材料を買いに行く約束をしました. Người đi cùng là bạn ở lớp, không phải gia đình.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "\nヨガ教室：毎週火曜日 10時から11時まで、料金は1回500円、場所は2階ホールです。\n書道教室：毎週木曜日 14時から15時半まで、料金は1回800円、場所は1階教室です。\n子ども絵画教室：毎週土曜日 10時から11時半まで、料金は1回600円、場所は1階教室です。\n申し込みは、10月20日から電話で受け付けます。ヨガ教室に参加する人は、タオルと水を持って来てください。\n書道教室はいつありますか。",
        "choices": [
          "毎週木曜日 14時から15時半まで",
          "毎週火曜日 10時から11時まで",
          "毎週土曜日 10時から11時半まで",
          "毎週木曜日 10時から11時まで"
        ],
        "answer": 0,
        "explain_vi": "Theo thông báo, 書道教室 diễn ra 毎週木曜日 14時から15時半まで. Các mốc giờ còn lại thuộc về lớp yoga và lớp vẽ thiếu nhi.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "\nヨガ教室：毎週火曜日 10時から11時まで、料金は1回500円、場所は2階ホールです。\n書道教室：毎週木曜日 14時から15時半まで、料金は1回800円、場所は1階教室です。\n子ども絵画教室：毎週土曜日 10時から11時半まで、料金は1回600円、場所は1階教室です。\n申し込みは、10月20日から電話で受け付けます。ヨガ教室に参加する人は、タオルと水を持って来てください。\nヨガ教室に参加する人は、何を持って来なければなりませんか。",
        "choices": [
          "筆と紙",
          "タオルと水",
          "色鉛筆",
          "料金800円"
        ],
        "answer": 1,
        "explain_vi": "Thông báo ghi người tham gia lớp yoga cần mang タオルと水 (khăn và nước). 800円 là học phí của lớp thư pháp, không phải của yoga.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "\nヨガ教室：毎週火曜日 10時から11時まで、料金は1回500円、場所は2階ホールです。\n書道教室：毎週木曜日 14時から15時半まで、料金は1回800円、場所は1階教室です。\n子ども絵画教室：毎週土曜日 10時から11時半まで、料金は1回600円、場所は1階教室です。\n申し込みは、10月20日から電話で受け付けます。ヨガ教室に参加する人は、タオルと水を持って来てください。\n申し込みはいつからできますか。",
        "choices": [
          "11月1日から",
          "10月1日から",
          "10月20日から",
          "11月20日から"
        ],
        "answer": 2,
        "explain_vi": "Thông báo ghi 申し込みは、10月20日から電話で受け付けます, đăng ký từ ngày 20 tháng 10 qua điện thoại. Tháng 11 là tháng diễn ra các lớp, không phải ngày bắt đầu đăng ký.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "友だちとの約束を忘れてはいけません。「約束」の読み方として正しいものはどれですか。",
        "choices": [
          "やくそく",
          "やくそ",
          "やくしょく",
          "やっそく"
        ],
        "answer": 0,
        "explain_vi": "約束 đọc là やくそく, nghĩa là lời hẹn. Đây là từ quen thuộc ở trình độ N4.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "先生に連絡をしなければなりません。「連絡」の読み方として正しいものはどれですか。",
        "choices": [
          "れんら",
          "れんらく",
          "れんろく",
          "れんらくう"
        ],
        "answer": 1,
        "explain_vi": "連絡 đọc là れんらく, nghĩa là liên lạc. Âm ん trong れん và らく cần đọc rõ, không bỏ hay kéo dài.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "旅行の準備はもう終わりました。「準備」の読み方として正しいものはどれですか。",
        "choices": [
          "じゅび",
          "じゅんぴ",
          "じゅんび",
          "じゅんみ"
        ],
        "answer": 2,
        "explain_vi": "準備 đọc là じゅんび, nghĩa là sự chuẩn bị. Chữ 備 đọc là び, không phải ぴ hay み.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "「けんこう」の漢字として正しいものはどれですか。",
        "choices": [
          "建康",
          "健広",
          "康健",
          "健康"
        ],
        "answer": 3,
        "explain_vi": "けんこう viết là 健康, nghĩa là sức khỏe. Cần nhớ đúng bộ của 健 và 康, không đảo thứ tự hai chữ.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "「しんぱい」の漢字として正しいものはどれですか。",
        "choices": [
          "心西",
          "心配",
          "心肥",
          "心酉"
        ],
        "answer": 1,
        "explain_vi": "しんぱい viết là 心配, nghĩa là lo lắng. Chữ 配 có bộ 酉, dễ nhầm với các chữ trông giống.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "彼は試験に（ ）したので、とてもうれしいです。",
        "choices": [
          "失敗",
          "遅刻",
          "合格",
          "欠席"
        ],
        "answer": 2,
        "explain_vi": "Thi đỗ dùng 合格する. 失敗 là thất bại, 遅刻 là đến muộn, 欠席 là vắng mặt, đều trái với niềm vui trong câu.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "この説明書は（ ）ので、初めての人でも分かります。",
        "choices": [
          "難しい",
          "長い",
          "分かりにくい",
          "分かりやすい"
        ],
        "answer": 3,
        "explain_vi": "説明書 dễ hiểu thì dùng 分かりやすい. 難しい là khó, 分かりにくい là khó hiểu, đều trái nghĩa với ý câu.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "道が（ ）ので、早く着きました。",
        "choices": [
          "空いていた",
          "混んでいた",
          "狭かった",
          "暗かった"
        ],
        "answer": 0,
        "explain_vi": "Đường vắng thì dùng 空いている, nên đến sớm. 混んでいた là tắc đường, sẽ làm đến muộn, không hợp với câu.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "明日は雨だそうですから、傘を（ ）ください。",
        "choices": [
          "持って行き",
          "持って行って",
          "持って行っておいて",
          "持って行く"
        ],
        "answer": 2,
        "explain_vi": "Chuẩn bị trước một việc dùng 〜ておく: 持って行っておいてください nghĩa là hãy mang ô đi sẵn.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "財布を家に忘れて（ ）。買い物ができませんでした。",
        "choices": [
          "しまう",
          "しまって",
          "しまいます",
          "しまった"
        ],
        "answer": 3,
        "explain_vi": "Việc đã xảy ra ngoài ý muốn và đã xong dùng 〜てしまった: 忘れてしまった nghĩa là lỡ để quên.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "天気予報によると、明日は雪が（ ）そうです。",
        "choices": [
          "降る",
          "降って",
          "降り",
          "降った"
        ],
        "answer": 0,
        "explain_vi": "Nghe nói, truyền đạt lại dùng 〜そうです với thể thường: 降るそうです nghĩa là nghe nói tuyết sẽ rơi.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "明日までにこのレポートを（ ）なりません。",
        "choices": [
          "出さ",
          "出さなければ",
          "出し",
          "出して"
        ],
        "answer": 1,
        "explain_vi": "Phải làm gì dùng 〜なければなりません: 出さなければなりません nghĩa là phải nộp báo cáo.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "彼は日本に来た（ ）ですから、日本語がまだあまり話せません。",
        "choices": [
          "ところ",
          "はず",
          "ばかり",
          "ため"
        ],
        "answer": 2,
        "explain_vi": "Vừa mới làm gì dùng 〜たばかり: 来たばかり nghĩa là vừa mới đến Nhật, nên tiếng Nhật còn chưa nói tốt.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "毎日練習したので、漢字が読める（ ）なりました。",
        "choices": [
          "ような",
          "ようた",
          "よ",
          "ように"
        ],
        "answer": 3,
        "explain_vi": "Trở nên có thể làm gì dùng 〜ようになる: 読めるようになりました nghĩa là đã trở nên đọc được chữ Hán.",
        "src": "daily"
      },
      {
        "section": "文法",
        "question": "雨が（ ）、明日の試合は行います。",
        "choices": [
          "降っても",
          "降って",
          "降ったら",
          "降れば"
        ],
        "answer": 0,
        "explain_vi": "Dù… vẫn… dùng 〜ても: 雨が降っても nghĩa là dù trời mưa, trận đấu ngày mai vẫn diễn ra.",
        "src": "daily"
      },
      {
        "section": "読解",
        "question": "ゆうたさんはさくら町に住んでいます。毎日、自転車で会社へ行きます。会社は駅の近くにあります。昼休みは、同僚と近くの公園で昼ごはんを食べます。日曜日は、家族と山へ行くことが多いです。\nゆうたさんは何で会社へ行きますか。",
        "choices": [
          "バス",
          "自転車",
          "電車",
          "車"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói 毎日、自転車で会社へ行きます, tức Yuta đến công ty bằng xe đạp mỗi ngày.",
        "src": "daily"
      },
      {
        "section": "読解",
        "question": "ゆうたさんはさくら町に住んでいます。毎日、自転車で会社へ行きます。会社は駅の近くにあります。昼休みは、同僚と近くの公園で昼ごはんを食べます。日曜日は、家族と山へ行くことが多いです。\nゆうたさんの会社はどこにありますか。",
        "choices": [
          "公園の近く",
          "山の近く",
          "駅の近く",
          "海の近く"
        ],
        "answer": 2,
        "explain_vi": "Đoạn văn nói 会社は駅の近くにあります, tức công ty ở gần ga. Công viên là nơi ăn trưa, núi là nơi đi chơi ngày Chủ nhật.",
        "src": "daily"
      },
      {
        "section": "読解",
        "question": "ゆうたさんはさくら町に住んでいます。毎日、自転車で会社へ行きます。会社は駅の近くにあります。昼休みは、同僚と近くの公園で昼ごはんを食べます。日曜日は、家族と山へ行くことが多いです。\nゆうたさんは昼休みに何をしますか。",
        "choices": [
          "仕事をします",
          "本を読みます",
          "昼寝をします",
          "同僚と昼ごはんを食べます"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn nói 昼休みは、同僚と近くの公園で昼ごはんを食べます, tức giờ nghỉ trưa Yuta ăn trưa cùng đồng nghiệp ở công viên gần đó.",
        "src": "daily"
      },
      {
        "section": "読解",
        "question": "ひまわり図書館は、火曜日から日曜日まで開いています。月曜日は休みです。午前九時から午後六時までです。本は一人五冊まで、二週間借りることができます。図書館の二階には、静かに勉強できる部屋があります。\nひまわり図書館は何曜日に休みですか。",
        "choices": [
          "月曜日",
          "火曜日",
          "日曜日",
          "土曜日"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn nói 月曜日は休みです, tức thư viện nghỉ thứ Hai. Thư viện mở từ thứ Ba đến Chủ nhật.",
        "src": "daily"
      },
      {
        "section": "読解",
        "question": "ひまわり図書館は、火曜日から日曜日まで開いています。月曜日は休みです。午前九時から午後六時までです。本は一人五冊まで、二週間借りることができます。図書館の二階には、静かに勉強できる部屋があります。\n本は一人何冊まで借りることができますか。",
        "choices": [
          "三冊",
          "五冊",
          "二冊",
          "十冊"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói 本は一人五冊まで、二週間借りることができます, tức mỗi người mượn tối đa 5 quyển trong 2 tuần.",
        "src": "daily"
      },
      {
        "section": "文字・語彙",
        "question": "駅の放送で「電車はもうすぐ発車します」と聞こえました。「発車」の読み方として正しいものはどれですか。",
        "choices": [
          "はつしゃ",
          "はっしゃ",
          "はっしゃや",
          "はしゃ"
        ],
        "answer": 1,
        "explain_vi": "発車 đọc là はっしゃ, nghĩa là tàu/xe xuất phát. Đây là âm đọc có âm tắc nhỏ っ nên dễ nhầm với はつしゃ.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "今週は仕事が多くて、残業が続いています。「残業」の読み方として正しいものはどれですか。",
        "choices": [
          "ざんきょう",
          "さんぎょう",
          "ざんぎょう",
          "ざんぎょ"
        ],
        "answer": 2,
        "explain_vi": "残業 đọc là ざんぎょう, nghĩa là làm thêm giờ. Chữ 業 đọc là ぎょう trong từ này, không phải きょう.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "友だちから手紙が届きました。「届き」の読み方として正しいものはどれですか。",
        "choices": [
          "とどき",
          "とどけ",
          "つき",
          "いたり"
        ],
        "answer": 0,
        "explain_vi": "届く đọc là とどく, dạng ます là 届きます nên phần thân là とどき. Cần phân biệt với 届ける (とどける) là gửi/chuyển đến.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "今日は体の具合がよくありません。「具合」の読み方として正しいものはどれですか。",
        "choices": [
          "きあい",
          "ぐわい",
          "くあい",
          "ぐあい"
        ],
        "answer": 3,
        "explain_vi": "具合 đọc là ぐあい, dùng để nói tình trạng sức khỏe hoặc tình hình. Ví dụ 体の具合が悪い là người không khỏe.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "「彼は約束を守る人です」の「守る」の意味として正しいものはどれですか。",
        "choices": [
          "約束や決まりを自分で決めること",
          "約束や決まりをその通りにすること",
          "約束を忘れてしまうこと",
          "約束の時間を変えること"
        ],
        "answer": 1,
        "explain_vi": "守る ngoài nghĩa bảo vệ còn có nghĩa là tuân thủ, giữ đúng như đã định. 約束を守る là giữ lời hứa.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "「電車が込んでいて、座れませんでした」の「込んでいて」の意味として正しいものはどれですか。",
        "choices": [
          "人が少なくて静かな様子",
          "速く動いている様子",
          "人が多くて場所が少ない様子",
          "きれいに並んでいる様子"
        ],
        "answer": 2,
        "explain_vi": "込んでいる diễn tả trạng thái đông người, chật chội. Vì tàu đông nên không ngồi được ghế.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "「集める」を使った文として正しいものはどれですか。",
        "choices": [
          "ミンさんは世界の切手を集めています。",
          "雨がたくさん集めて降っています。",
          "学生が教室に集めました。",
          "電車に集めて乗りました。"
        ],
        "answer": 0,
        "explain_vi": "集める là tha động từ nghĩa là thu thập, sưu tầm, dùng với を. Khi nói mọi người tụ tập lại thì phải dùng tự động từ 集まる, nên các câu còn lại sai.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "薬を飲んだら、熱が（　）きました。",
        "choices": [
          "上がって",
          "下りて",
          "落ちて",
          "下がって"
        ],
        "answer": 3,
        "explain_vi": "Với cơn sốt, tiếng Nhật dùng kết hợp cố định 熱が下がる (sốt hạ). 熱が上がる là sốt tăng, còn 下りる dùng cho việc đi xuống cầu thang, xe cộ.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "この学校の決まりでは、学生は制服を（　）。",
        "choices": [
          "着なければなりません",
          "着てもいいです",
          "着なくてもいいです",
          "着るそうです"
        ],
        "answer": 0,
        "explain_vi": "決まりでは gợi ý đây là quy định bắt buộc, nên dùng 〜なければなりません (phải làm). 着てもいい là được phép làm, 着なくてもいい là không làm cũng được, không hợp với quy định.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "宿題を忘れて、ミンさんは先生に（　）。",
        "choices": [
          "しかりました",
          "しかられました",
          "しからせました",
          "しからせられました"
        ],
        "answer": 1,
        "explain_vi": "ミンさん là người bị mắng nên phải dùng thể bị động しかられました. しかりました là tự mình mắng người khác, còn しからせました (sai khiến) và しからせられました (sai khiến bị động) đều không hợp với ngữ cảnh này.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "この漢字は難しくて、私には（　）。",
        "choices": [
          "読みません",
          "読まないです",
          "読れません",
          "読めません"
        ],
        "answer": 3,
        "explain_vi": "Động từ nhóm 1 読む chuyển sang thể khả năng là 読める, phủ định là 読めません. 読れません là dạng chia sai không tồn tại.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "来年、日本へ留学（　）と思っています。",
        "choices": [
          "する",
          "した",
          "しよう",
          "したい"
        ],
        "answer": 2,
        "explain_vi": "Sau 〜と思います khi nói về dự định của bản thân, động từ phải ở thể ý hướng (意向形). 留学する → 留学しようと思っています nghĩa là tôi định đi du học.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "空が暗くなってきました。雨が（　）そうです。",
        "choices": [
          "降り",
          "降る",
          "降った",
          "降れ"
        ],
        "answer": 0,
        "explain_vi": "〜そうです diễn tả vẻ bên ngoài (trông có vẻ sắp...) đi với thân động từ dạng ます bỏ ます: 降ります → 降りそうです. Nhìn trời tối dần nên đoán trời sắp mưa.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "すみません、ここでは写真を（　）もいいですか。",
        "choices": [
          "撮る",
          "撮って",
          "撮った",
          "撮ら"
        ],
        "answer": 1,
        "explain_vi": "Mẫu xin phép là 〜てもいいですか, động từ phải chia sang thể て: 撮る → 撮って. Câu này hỏi ở đây chụp ảnh có được không.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "雲が少なくて、空が青いです。明日も晴れる（　）です。",
        "choices": [
          "そう",
          "らしい",
          "よう",
          "みたい"
        ],
        "answer": 2,
        "explain_vi": "〜ようです dùng khi tự quan sát rồi phán đoán. Người nói nhìn bầu trời ít mây, xanh trong nên đoán ngày mai cũng nắng. らしい thường dùng cho tin nghe được từ người khác.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "ミンさんは、みどり市にある小さなパン屋で働いています。毎朝5時に起きて、6時からパンを作ります。店は7時に開きますが、近所の人たちは6時半ごろから店の前に並びます。ミンさんが作るあんパンはとても人気で、午前中には全部売れてしまいます。ミンさんは疲れますが、お客さんの笑顔を見ると、うれしくなります。\nミンさんは何時からパンを作りますか。",
        "choices": [
          "5時から",
          "7時から",
          "6時半から",
          "6時から"
        ],
        "answer": 3,
        "explain_vi": "Bài viết nói rõ 6時からパンを作ります. 5時 là giờ thức dậy, 7時 là giờ tiệm mở cửa, 6時半 là giờ hàng xóm bắt đầu xếp hàng.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "ミンさんは、みどり市にある小さなパン屋で働いています。毎朝5時に起きて、6時からパンを作ります。店は7時に開きますが、近所の人たちは6時半ごろから店の前に並びます。ミンさんが作るあんパンはとても人気で、午前中には全部売れてしまいます。ミンさんは疲れますが、お客さんの笑顔を見ると、うれしくなります。\nミンさんが作るあんパンはどうなりますか。",
        "choices": [
          "夕方まで残ります",
          "午前中に全部売れます",
          "近所の人だけ買います",
          "ミンさんが全部食べます"
        ],
        "answer": 1,
        "explain_vi": "Trong bài có câu あんパンはとても人気で、午前中には全部売れてしまいます, tức bánh anpan rất được ưa chuộng và bán hết trong buổi sáng.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "ミンさんは、みどり市にある小さなパン屋で働いています。毎朝5時に起きて、6時からパンを作ります。店は7時に開きますが、近所の人たちは6時半ごろから店の前に並びます。ミンさんが作るあんパンはとても人気で、午前中には全部売れてしまいます。ミンさんは疲れますが、お客さんの笑顔を見ると、うれしくなります。\nミンさんはどうしてうれしくなりますか。",
        "choices": [
          "給料が高いから",
          "早く帰れるから",
          "お客さんの笑顔を見るから",
          "パンが安いから"
        ],
        "answer": 2,
        "explain_vi": "Câu cuối của bài nói お客さんの笑顔を見ると、うれしくなります, tức khi nhìn thấy nụ cười của khách hàng thì ミンさん thấy vui.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "トゥイさんは、先月からひまわり町の図書館で本を借りています。図書館のカードを作ると、一度に5冊まで、2週間借りることができます。トゥイさんは日本の小説が好きで、毎週土曜日に新しい本を借りに行きます。返しに行く日を忘れないように、借りた日を手帳に書いています。今週は雨が多くて、まだ行っていません。\n本は一度に何冊まで借りることができますか。",
        "choices": [
          "5冊",
          "2冊",
          "3冊",
          "10冊"
        ],
        "answer": 0,
        "explain_vi": "Bài viết nói 一度に5冊まで, tức mỗi lần mượn tối đa 5 cuốn. Con số 2週間 là thời hạn mượn 2 tuần, không phải số sách.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "トゥイさんは、先月からひまわり町の図書館で本を借りています。図書館のカードを作ると、一度に5冊まで、2週間借りることができます。トゥイさんは日本の小説が好きで、毎週土曜日に新しい本を借りに行きます。返しに行く日を忘れないように、借りた日を手帳に書いています。今週は雨が多くて、まだ行っていません。\nトゥイさんはどうして借りた日を手帳に書いていますか。",
        "choices": [
          "字の練習をするため",
          "本の名前を覚えるため",
          "友だちに知らせるため",
          "返す日を忘れないため"
        ],
        "answer": 3,
        "explain_vi": "Bài viết giải thích 返しに行く日を忘れないように、借りた日を手帳に書いています, tức ghi ngày mượn vào sổ để không quên ngày đi trả sách.",
        "src": "mock"
      }
    ]
  };
})();
