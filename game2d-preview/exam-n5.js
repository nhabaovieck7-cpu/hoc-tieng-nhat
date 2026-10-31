// exam-n5.js — NGÂN HÀNG CÂU HỎI MỐC THI JLPT N5 (cảnh 1.14) — DỮ LIỆU THẬT CỦA WEB.
// Nguồn (chép nguyên văn, không chế câu mới):
//   · Đề thi thử N5 đầy đủ của web: data/practice/full/2026-10-31-n5.json (15 câu: chữ/vocab 5 · ngữ pháp 5 · đọc hiểu 5)
//   · Bộ ôn tuần weekly-mock week-1 N5 của web: content-features/weekly-mock-week1-n5.json (20 câu)
// Đã loại câu trùng theo nội dung câu hỏi. Luật trình bày giữ như đề web: KHÔNG furigana trên câu hỏi.
// Máy truyện (story.js) rút mỗi lượt thi 10 câu (chữ 4 · pháp 4 · đọc 2), tráo thứ tự lựa chọn; đỗ khi đúng >= 6/10.
(function () {
  'use strict';
  window.EXAM_N5 = {
    source: 'data/practice/full/2026-10-31-n5.json + weekly-mock-week1-n5.json',
    questions: [
      {
        "section": "文字・語彙",
        "question": "「電車」の読み方はどれですか。",
        "choices": [
          "でんしゃ",
          "でんしゃあ",
          "てんしゃ",
          "でんじゃ"
        ],
        "answer": 0,
        "explain_vi": "電車 đọc là でんしゃ.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「図書館」の読み方はどれですか。",
        "choices": [
          "としょかん",
          "としょうがん",
          "としょがん",
          "どしょかん"
        ],
        "answer": 0,
        "explain_vi": "図書館 đọc là としょかん (thư viện).",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「安い」の反対はどれですか。",
        "choices": [
          "高い",
          "新しい",
          "近い",
          "忙しい"
        ],
        "answer": 0,
        "explain_vi": "安い (rẻ) trái nghĩa với 高い (đắt/cao).",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "かいものに 行きます。デパートで かさを （　）。",
        "choices": [
          "かいます",
          "あいます",
          "なります",
          "でます"
        ],
        "answer": 0,
        "explain_vi": "Mua đồ dùng かいます.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「毎週」の読み方はどれですか。",
        "choices": [
          "まいしゅう",
          "まいしゅ",
          "ましゅう",
          "まいすう"
        ],
        "answer": 0,
        "explain_vi": "毎週 đọc là まいしゅう (mỗi tuần).",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "わたしは 日本へ （　）ことが あります。",
        "choices": [
          "行った",
          "行く",
          "行って",
          "行き"
        ],
        "answer": 0,
        "explain_vi": "〜たことがあります dùng thể た: 行った.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "あの 人は 先生 （　）。",
        "choices": [
          "です",
          "ます",
          "でした 昨日",
          "する"
        ],
        "answer": 0,
        "explain_vi": "Danh từ + です cho câu khẳng định hiện tại.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "電車 （　） 学校へ 行きます。",
        "choices": [
          "で",
          "に",
          "を",
          "へ だけ"
        ],
        "answer": 0,
        "explain_vi": "Phương tiện di chuyển dùng で.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "この へやは しずか （　）。",
        "choices": [
          "です",
          "ます",
          "だ 昨日",
          "する"
        ],
        "answer": 0,
        "explain_vi": "Tính từ な + です: しずかです.",
        "src": "full"
      },
      {
        "section": "文法",
        "question": "きのう 買った 本は （　）。",
        "choices": [
          "おもしろかったです",
          "おもしろい ます",
          "おもしろく です",
          "おもしろでした"
        ],
        "answer": 0,
        "explain_vi": "Tính từ い quá khứ: おもしろかったです.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは みどり市の 図書館で 本を かりました。本は 3さつです。ミンさんは りょうりの 本が すきです。今日の 夜、りょうりの 本を 読みます。あした 友だちと りょうりを 作ります。\nミンさんは どこで 本を かりましたか。",
        "choices": [
          "図書館",
          "学校",
          "本屋",
          "デパート"
        ],
        "answer": 0,
        "explain_vi": "Bài viết: 図書館で本をかりました.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは みどり市の 図書館で 本を かりました。本は 3さつです。ミンさんは りょうりの 本が すきです。今日の 夜、りょうりの 本を 読みます。あした 友だちと りょうりを 作ります。\n本は 何さつですか。",
        "choices": [
          "3さつ",
          "2さつ",
          "5さつ",
          "1さつ"
        ],
        "answer": 0,
        "explain_vi": "Bài viết: 本は3さつです.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは みどり市の 図書館で 本を かりました。本は 3さつです。ミンさんは りょうりの 本が すきです。今日の 夜、りょうりの 本を 読みます。あした 友だちと りょうりを 作ります。\nミンさんは 何の 本が すきですか。",
        "choices": [
          "りょうりの 本",
          "れきしの 本",
          "スポーツの 本",
          "えいごの 本"
        ],
        "answer": 0,
        "explain_vi": "Bài viết: りょうりの本がすきです.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは みどり市の 図書館で 本を かりました。本は 3さつです。ミンさんは りょうりの 本が すきです。今日の 夜、りょうりの 本を 読みます。あした 友だちと りょうりを 作ります。\nミンさんは 今日の 夜 何を しますか。",
        "choices": [
          "本を 読みます",
          "本を かいます",
          "りょうりを 作ります",
          "友だちに あいます"
        ],
        "answer": 0,
        "explain_vi": "Bài viết: 今日の夜、りょうりの本を読みます.",
        "src": "full"
      },
      {
        "section": "読解",
        "question": "ミンさんは みどり市の 図書館で 本を かりました。本は 3さつです。ミンさんは りょうりの 本が すきです。今日の 夜、りょうりの 本を 読みます。あした 友だちと りょうりを 作ります。\nミンさんは あした 何を しますか。",
        "choices": [
          "友だちと りょうりを 作ります",
          "図書館へ 行きます",
          "本を かえします",
          "学校で べんきょうします"
        ],
        "answer": 0,
        "explain_vi": "Bài viết: あした友だちとりょうりを作ります.",
        "src": "full"
      },
      {
        "section": "文字・語彙",
        "question": "「今日」は 何と 読みますか。",
        "choices": [
          "きょう",
          "こんにち",
          "きのう",
          "あした"
        ],
        "answer": 0,
        "explain_vi": "今日 đọc là きょう, nghĩa là \"hôm nay\". Các đáp án còn lại là từ không đúng cách đọc của chữ này.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "「学校」は 何と 読みますか。",
        "choices": [
          "がくこう",
          "がっこー",
          "がっこう",
          "かっこう"
        ],
        "answer": 2,
        "explain_vi": "学校 đọc là がっこう, nghĩa là \"trường học\". Lưu ý có âm nhỏ っ trước こう.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "わたしは まいあさ （ ）を のみます。",
        "choices": [
          "テレビ",
          "コーヒー",
          "くるま",
          "つくえ"
        ],
        "answer": 1,
        "explain_vi": "Động từ のみます (uống) chỉ đi với đồ uống, nên đáp án là コーヒー (cà phê). Các từ còn lại là đồ vật, không uống được.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "「電車」は 何と 読みますか。",
        "choices": [
          "てんしゃ",
          "でんしゃー",
          "でんしゃい",
          "でんしゃ"
        ],
        "answer": 3,
        "explain_vi": "電車 đọc là でんしゃ, nghĩa là \"tàu điện\". Chữ 電 đọc là でん, chữ 車 đọc là しゃ trong từ này.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "ここは （ ）ですから、しずかに して ください。",
        "choices": [
          "こうえん",
          "みせ",
          "としょかん",
          "えき"
        ],
        "answer": 2,
        "explain_vi": "Nơi cần giữ yên lặng (しずかにしてください) là としょかん (thư viện). Công viên, cửa hàng và nhà ga không có yêu cầu này.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "「時間」は 何と 読みますか。",
        "choices": [
          "じかん",
          "じま",
          "ときかん",
          "しかん"
        ],
        "answer": 0,
        "explain_vi": "時間 đọc là じかん, nghĩa là \"thời gian / giờ\". Chữ 時 đọc là じ, chữ 間 đọc là かん trong từ này.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "きょうは とても （ ）です。エアコンを つけましょう。",
        "choices": [
          "さむい",
          "すずしい",
          "くらい",
          "あつい"
        ],
        "answer": 3,
        "explain_vi": "Vì bật điều hòa (エアコンをつけましょう) nên trời phải nóng, đáp án là あつい. さむい là lạnh, すずしい là mát, くらい là tối.",
        "src": "mock"
      },
      {
        "section": "文字・語彙",
        "question": "わたしは くだものが すきです。とくに （ ）が すきです。",
        "choices": [
          "さかな",
          "りんご",
          "ごはん",
          "みず"
        ],
        "answer": 1,
        "explain_vi": "くだもの là hoa quả, nên đáp án thuộc nhóm hoa quả là りんご (táo). Cá, cơm và nước không phải hoa quả.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "わたしは ハンさん（ ）いっしょに べんきょうします。",
        "choices": [
          "を",
          "へ",
          "と",
          "で"
        ],
        "answer": 2,
        "explain_vi": "Trợ từ と dùng để chỉ người cùng làm việc gì với mình (〜と いっしょに = cùng với ~). Nên chọn ハンさんと いっしょに.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "ここに 名前を （ ）ください。",
        "choices": [
          "かいて",
          "かきて",
          "かいいて",
          "かくて"
        ],
        "answer": 0,
        "explain_vi": "Động từ 書く (nhóm 1, kết thúc bằng く) đổi sang thể て thành かいて. Mẫu 〜てください dùng để nhờ/yêu cầu ai làm gì.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "わたしは 日本へ （ ）です。",
        "choices": [
          "行くたい",
          "行きたい",
          "行きたいい",
          "行ったい"
        ],
        "answer": 1,
        "explain_vi": "Muốn làm gì thì dùng thân động từ (bỏ ます) + たい: 行きます → 行き + たい = 行きたい (muốn đi). Các đáp án khác sai cách chia.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "ここで たばこを （ ）ください。",
        "choices": [
          "すいないで",
          "すわなくて",
          "すうないで",
          "すわないで"
        ],
        "answer": 3,
        "explain_vi": "Mẫu 〜ないでください nghĩa là \"xin đừng làm ~\". Động từ すう đổi sang thể ない thành すわない, nên đáp án là すわないでください (xin đừng hút thuốc).",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "つくえの 上に ねこが （ ）。",
        "choices": [
          "います",
          "あります",
          "あいます",
          "おります"
        ],
        "answer": 0,
        "explain_vi": "ねこ (mèo) là sinh vật sống nên dùng います. あります chỉ dùng cho đồ vật và cây cối.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "きのう、わたしは えいがを （ ）。",
        "choices": [
          "見ます",
          "見たい",
          "見ました",
          "見て"
        ],
        "answer": 2,
        "explain_vi": "Câu có きのう (hôm qua) nên động từ phải ở thì quá khứ: 見ました (đã xem). 見ます là hiện tại/tương lai, không hợp với きのう.",
        "src": "mock"
      },
      {
        "section": "文法",
        "question": "この みせは 安い（ ）、人が 多いです。",
        "choices": [
          "でも",
          "から",
          "そして",
          "が"
        ],
        "answer": 1,
        "explain_vi": "から nối nguyên nhân – kết quả: vì cửa hàng rẻ (安いから) nên đông người. Các từ nối còn lại không diễn tả quan hệ nguyên nhân ở đây.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "ハンさんは さくら町の 学校の 先生です。まいにち 六時に おきて、バスで 学校へ 行きます。学校は 八時から 三時半までです。土曜日と 日曜日は やすみです。\nハンさんは どこで はたらきますか。",
        "choices": [
          "みどり町の びょういん",
          "さくら町の 会社",
          "あおい学校",
          "さくら町の 学校"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn mở đầu nói rõ ハンさんは さくら町の 学校の 先生です, tức làm việc tại trường học ở thị trấn Sakura.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "ハンさんは さくら町の 学校の 先生です。まいにち 六時に おきて、バスで 学校へ 行きます。学校は 八時から 三時半までです。土曜日と 日曜日は やすみです。\nハンさんは 何時に おきますか。",
        "choices": [
          "七時",
          "八時",
          "六時",
          "三時半"
        ],
        "answer": 2,
        "explain_vi": "Đoạn văn nói まいにち 六時に おきて, nghĩa là mỗi ngày dậy lúc 6 giờ. Tám giờ là giờ bắt đầu trường học, không phải giờ dậy.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "ハンさんは さくら町の 学校の 先生です。まいにち 六時に おきて、バスで 学校へ 行きます。学校は 八時から 三時半までです。土曜日と 日曜日は やすみです。\nハンさんは いつ 学校へ 行きませんか。",
        "choices": [
          "土曜日と 日曜日",
          "月曜日",
          "水曜日",
          "金曜日"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn nói 土曜日と 日曜日は やすみです (thứ Bảy và Chủ nhật là ngày nghỉ), nên hai ngày đó không đến trường.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "リンさんは 学生です。今、みどり町に 住んでいます。リンさんは 日本語を 勉強しています。リンさんは すしが 好きです。日曜日、よく 友だちと みどり駅の 前の 店で すしを 食べます。\nリンさんは 何が 好きですか。",
        "choices": [
          "うどん",
          "すし",
          "てんぷら",
          "カレー"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói thẳng リンさんは すしが 好きです, nghĩa là Rin thích sushi.",
        "src": "mock"
      },
      {
        "section": "読解",
        "question": "リンさんは 学生です。今、みどり町に 住んでいます。リンさんは 日本語を 勉強しています。リンさんは すしが 好きです。日曜日、よく 友だちと みどり駅の 前の 店で すしを 食べます。\nリンさんは 日曜日、どこで すしを 食べますか。",
        "choices": [
          "学校の 中の 店",
          "みどり町の こうえん",
          "みどり駅の 前の 店",
          "うち"
        ],
        "answer": 2,
        "explain_vi": "Đoạn văn nói 日曜日、よく 友だちと みどり駅の 前の 店で すしを 食べます, tức ăn sushi tại quán trước ga Midori.",
        "src": "mock"
      }
    ]
  };
})();
