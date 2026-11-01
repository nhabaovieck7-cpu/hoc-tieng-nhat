// exam-levels.js — NGÂN HÀNG CÂU HỎI THI MỐC THEO TRÌNH ĐỘ N3/N2/N1 (Lane Z, 01/11/2026).
// DỮ LIỆU THẬT CỦA WEB, chép nguyên văn, không chế câu mới — sinh bằng work/build_exam_levels.py:
//   · N3: content-features/practice/full/2026-10-31-n3.json + weekly-mock-week1-n3.json + practice/daily/2026-11-01-n3.json
//   · N2: content-features/practice/full/2026-10-31-n2.json + weekly-mock-week1-n2.json
//   · N1: content-features/practice/full/2026-10-31-n1.json + weekly-mock-week1-n1.json
// Đã loại câu trùng theo nội dung câu hỏi. Mỗi câu mang trường "level" để kiểm chứng được cấp.
// Luật trình bày giữ như đề web: KHÔNG furigana trên câu hỏi. Máy thi (story.js) qua
// window.PLAYER_LEVEL (level.js) rút câu đúng trình độ người chơi đã chọn; mạch truyện không đổi.
(function () {
  'use strict';

  window.EXAM_N3 = {
    source: 'content-features/practice/full/2026-10-31-n3.json + content-features/weekly-mock-week1-n3.json + content-features/practice/daily/2026-11-01-n3.json',
    questions: [
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「この映画は、若い人に大きな影響を与えた。」の「影響」の読み方として正しいものはどれですか。",
        "choices": [
          "えいごう",
          "えいきょう",
          "えんきょう",
          "えいきょ"
        ],
        "answer": 1,
        "explain_vi": "影響 đọc là えいきょう, nghĩa là 'ảnh hưởng'. Đây là từ ghép Hán tự rất hay gặp ở trình độ N3.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「事故のため、水の供給が止まってしまった。」の「供給」の読み方として正しいものはどれですか。",
        "choices": [
          "こうきゅう",
          "きゅうきょう",
          "きょうぎゅう",
          "きょうきゅう"
        ],
        "answer": 3,
        "explain_vi": "供給 đọc là きょうきゅう, nghĩa là 'cung cấp' như nước, điện, hàng hóa. Cần phân biệt với 高級 (こうきゅう) là 'cao cấp'.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「分からないことがあったら、先生に相談してください。」の「相談」の読み方として正しいものはどれですか。",
        "choices": [
          "そうだん",
          "しょうだん",
          "そうたん",
          "あいだん"
        ],
        "answer": 0,
        "explain_vi": "相談 đọc là そうだん, nghĩa là 'bàn bạc, xin tư vấn'. Cụm 先生に相談する là cách dùng rất phổ biến.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「この町では、高齢者の割合が増えている。」の「割合」の読み方として正しいものはどれですか。",
        "choices": [
          "わりごう",
          "わりあう",
          "わりあい",
          "かずあい"
        ],
        "answer": 2,
        "explain_vi": "割合 đọc là わりあい, nghĩa là 'tỷ lệ, tỷ trọng'. Ví dụ 高齢者の割合 = tỷ lệ người cao tuổi.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「アンさんは、歌の大会で優勝した。」の「優勝」の読み方として正しいものはどれですか。",
        "choices": [
          "ゆしょう",
          "ゆうしょう",
          "ゆうじょう",
          "ようしょう"
        ],
        "answer": 1,
        "explain_vi": "優勝 đọc là ゆうしょう, nghĩa là 'giành chức vô địch, đoạt giải nhất' trong thi đấu hay cuộc thi.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「彼は海外で働いた経験がある。」の「経験」の読み方として正しいものはどれですか。",
        "choices": [
          "けいげん",
          "きょうけん",
          "けいけい",
          "けいけん"
        ],
        "answer": 3,
        "explain_vi": "経験 đọc là けいけん, nghĩa là 'kinh nghiệm'. Cụm 経験がある nghĩa là 'có kinh nghiệm'.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「雪が急に降り出すのは、珍しい現象だ。」の「現象」の読み方として正しいものはどれですか。",
        "choices": [
          "げんしょう",
          "げんじょう",
          "けんしょう",
          "げんそう"
        ],
        "answer": 0,
        "explain_vi": "現象 đọc là げんしょう, nghĩa là 'hiện tượng'. Cần phân biệt với 現状 (げんじょう) là 'tình trạng hiện tại'.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「アルバイトの収入は、月に8万円ぐらいだ。」の「収入」の読み方として正しいものはどれですか。",
        "choices": [
          "しゅにゅう",
          "しゅうにょう",
          "しゅうにゅう",
          "しゅうゆう"
        ],
        "answer": 2,
        "explain_vi": "収入 đọc là しゅうにゅう, nghĩa là 'thu nhập'. Chữ 入 ở đây đọc là にゅう giống trong 入院 (にゅういん).",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「部屋の（　）を調べるために、窓の大きさを測った。」に入るものとして正しいものはどれですか。",
        "choices": [
          "明るく",
          "明るい",
          "明るさ",
          "明るげ"
        ],
        "answer": 2,
        "explain_vi": "Sau の cần một danh từ, nên tính từ 明るい phải chuyển thành danh từ 明るさ (độ sáng). Đây là cách chuyển đổi tính từ -i thành danh từ bằng hậu tố さ.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「年末の（　）で、会社は休む暇もない。」に入るものとして正しいものはどれですか。",
        "choices": [
          "忙しさ",
          "忙しい",
          "忙しく",
          "忙しげ"
        ],
        "answer": 0,
        "explain_vi": "Sau の và trước で (nguyên nhân) cần danh từ, nên dùng 忙しさ (sự bận rộn), dạng danh từ hóa của tính từ 忙しい.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「夜が（　）につれて、空気が冷たくなってきた。」に入るものとして正しいものはどれですか。",
        "choices": [
          "深さ",
          "深い",
          "深く",
          "深まる"
        ],
        "answer": 3,
        "explain_vi": "Trước につれて cần động từ ở dạng từ điển, nên tính từ 深い phải chuyển thành động từ 深まる (trở nên sâu, về đêm là 'đêm càng khuya'). 深さ là danh từ nên không đi với につれて được.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「町は、狭い道路を（　）工事を始めた。」に入るものとして正しいものはどれですか。",
        "choices": [
          "広さ",
          "広げる",
          "広い",
          "広く"
        ],
        "answer": 1,
        "explain_vi": "Sau tân ngữ を cần động từ tha động, nên tính từ 広い chuyển thành động từ 広げる (mở rộng). 広がる là tự động từ 'được mở rộng' nên không đi với を ở đây.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「彼の話を聞いて、思わず大きな（　）を感じた。」に入るものとして正しいものはどれですか。",
        "choices": [
          "驚く",
          "驚かす",
          "驚き",
          "驚いて"
        ],
        "answer": 2,
        "explain_vi": "Sau tính từ liên thể 大きな và trước を cảm thấy (感じる) cần danh từ, nên động từ 驚く chuyển thành danh từ 驚き (sự ngạc nhiên).",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「部長は新しい計画について詳しく説明し、社員全員が（　）した。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "納得",
          "辞退",
          "出発",
          "到着"
        ],
        "answer": 0,
        "explain_vi": "納得する nghĩa là 'thuyết phục, hiểu và đồng ý' sau khi nghe giải thích. Các từ còn lại (từ chối, xuất phát, đến nơi) không hợp ngữ cảnh nghe giải thích kế hoạch.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「駅前のあの店は、値段が（　）ので、学生によく利用されている。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "高価",
          "混雑",
          "便利",
          "手頃"
        ],
        "answer": 3,
        "explain_vi": "手頃 (てごろ) nghĩa là 'vừa phải, hợp lý' về giá cả hoặc kích cỡ. Giá cả hợp lý nên quán được sinh viên hay sử dụng.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「アンさんは、どんな時でも約束を必ず（　）、信頼できる人だ。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "破る",
          "守る",
          "忘れる",
          "遅れる"
        ],
        "answer": 1,
        "explain_vi": "Cụm cố định 約束を守る nghĩa là 'giữ lời hứa'. Vì được miêu tả là người đáng tin cậy nên chỉ 守る là phù hợp.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「電車が事故で止まってしまい、会社に着くのが大幅に（　）。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "進んだ",
          "早まった",
          "遅れた",
          "届いた"
        ],
        "answer": 2,
        "explain_vi": "Vì tàu dừng do tai nạn nên việc đến công ty bị 遅れた (chậm, muộn) rất nhiều. 大幅に遅れる là cụm hay dùng cho việc trễ giờ lớn.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「彼女の日本語は発音が（　）で、聞き取りやすい。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "自然",
          "自由",
          "当然",
          "自分"
        ],
        "answer": 0,
        "explain_vi": "発音が自然 nghĩa là 'phát âm tự nhiên', không gượng ép, nên dễ nghe. Đây là cách khen phát âm chuẩn tự nhiên như người bản xứ.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「新しい仕事に慣れるまでには、しばらく（　）がかかるだろう。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "料金",
          "値段",
          "お金",
          "時間"
        ],
        "answer": 3,
        "explain_vi": "Cụm 時間がかかる nghĩa là 'tốn thời gian, mất thời gian'. Để quen với công việc mới thì cần thời gian chứ không phải tiền bạc.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「会議では、遠慮せずに自分の意見を（　）述べたほうがいい。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "ゆっくり",
          "はっきり",
          "すっかり",
          "しっかり"
        ],
        "answer": 1,
        "explain_vi": "意見をはっきり述べる nghĩa là 'trình bày ý kiến một cách rõ ràng, dứt khoát'. Ngữ cảnh 'không cần e ngại' (遠慮せずに) củng cố nghĩa này.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「試験の結果は、来週の月曜日に（　）される予定だ。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "開発",
          "生産",
          "発表",
          "発明"
        ],
        "answer": 2,
        "explain_vi": "結果が発表される nghĩa là 'kết quả được công bố'. Các từ còn lại là phát triển, sản xuất, phát minh, không đi với 結 quả thi.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「いろいろ考えたが、結局、留学をやめることにした。」の「結局」の意味として最も近いものはどれですか。",
        "choices": [
          "最後に",
          "最初に",
          "途中で",
          "すぐに"
        ],
        "answer": 0,
        "explain_vi": "結局 nghĩa là 'cuối cùng thì, kết cục là', gần nghĩa nhất với 最後に trong các lựa chọn, chỉ kết quả sau khi đã suy nghĩ nhiều.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「長い時間待って、やっとバスが来た。」の「やっと」の意味として最も近いものはどれですか。",
        "choices": [
          "すぐに",
          "たぶん",
          "とても",
          "ようやく"
        ],
        "answer": 3,
        "explain_vi": "やっと nghĩa là 'cuối cùng cũng, mãi mới', đồng nghĩa với ようやく, diễn tả việc chờ đợi lâu rồi mới thành hiện thực.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「今日は非常に暑いので、水をたくさん飲んだ。」の「非常に」の意味として最も近いものはどれですか。",
        "choices": [
          "あまり",
          "とても",
          "少し",
          "全然"
        ],
        "answer": 1,
        "explain_vi": "非常に là phó từ trang trọng nghĩa là 'vô cùng, cực kỳ', gần nghĩa nhất với とても trong văn nói thông thường.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「相変わらず」という言葉の使い方として正しい文はどれですか。",
        "choices": [
          "彼は相変わらずの値段でこの車を買った。",
          "相変わらずを食べてから出かけた。",
          "彼は相変わらず忙しくて、なかなか会えない。",
          "窓を相変わらず開けてください。"
        ],
        "answer": 2,
        "explain_vi": "相変わらず nghĩa là 'vẫn như xưa, vẫn như mọi khi', dùng như phó từ đứng trước trạng thái không thay đổi: 相変わらず忙しい = vẫn bận như mọi khi. Các câu còn lại dùng sai vị trí và ý nghĩa.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「さっそく」という言葉の使い方として正しい文はどれですか。",
        "choices": [
          "新しい靴を買い、さっそく履いて出かけた。",
          "彼はさっそくの人で、みんなに好かれている。",
          "電車がさっそく遅れてしまった。",
          "この料理はさっそくの味がする。"
        ],
        "answer": 0,
        "explain_vi": "さっそく nghĩa là 'ngay lập tức, ngay và luôn' khi làm việc gì đó vừa nghĩ tới: mua giày mới rồi đi ngay. Các câu còn lại dùng さっそく như danh từ hoặc tính từ nên sai.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「ついでに」という言葉の使い方として正しい文はどれですか。",
        "choices": [
          "ついでには、明日の会議の資料だ。",
          "彼はついでにの学生です。",
          "雨のついでに、傘を買った。",
          "買い物に行ったついでに、郵便局に寄った。"
        ],
        "answer": 3,
        "explain_vi": "〜たついでに nghĩa là 'nhân tiện khi làm việc chính thì làm thêm việc khác': nhân tiện đi mua sắm thì ghé bưu điện. Các câu còn lại dùng sai cấu trúc của ついでに.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「このレストランは、値段が高い（　）、料理の量が少ない。」に入るものとして正しいものはどれですか。",
        "choices": [
          "ために",
          "わりに",
          "とおりに",
          "かわりに"
        ],
        "answer": 1,
        "explain_vi": "〜わりに nghĩa là 'so với... thì (không tương xứng)': giá cao mà lượng món ăn lại ít, không tương xứng với giá. かわりに là 'thay vào đó' nên không hợp.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「母が昼寝をしている（　）、子どもたちは静かに宿題をした。」に入るものとして正しいものはどれですか。",
        "choices": [
          "ところに",
          "ために",
          "うちに",
          "おかげで"
        ],
        "answer": 2,
        "explain_vi": "〜ているうちに nghĩa là 'trong lúc đang...': trong lúc mẹ đang ngủ trưa, bọn trẻ lặng lẽ làm bài tập. Mẫu này chỉ hành động diễn ra trong khoảng thời gian của hành động kia.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「練習を重ねる（　）、少しずつ自信がついてきた。」に入るものとして正しいものはどれですか。",
        "choices": [
          "につれて",
          "について",
          "によって",
          "に対して"
        ],
        "answer": 0,
        "explain_vi": "〜につれて nghĩa là 'cùng với việc... thì... cũng thay đổi theo': càng luyện tập nhiều lần thì càng tự tin hơn. について là 'về (chủ đề)' nên không hợp.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「混んだ電車の中で、私は後ろの人に足を（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "踏んだ",
          "踏ませた",
          "踏まない",
          "踏まれた"
        ],
        "answer": 3,
        "explain_vi": "Đây là thể bị động 受身: 私は足を踏まれた = 'tôi bị người phía sau giẫm lên chân'. Chủ thể là người chịu hành động nên phải dùng bị động.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「部長はアンさんに、会議の資料を（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "作った",
          "作らせた",
          "作られた",
          "作らせられた"
        ],
        "answer": 1,
        "explain_vi": "Đây là thể sai khiến 使役: 部長がアンさんに資料を作らせた = 'trưởng phòng bắt/cho anh An làm tài liệu'. Người ra lệnh là bộ trưởng nên dùng sai khiến chủ động.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「明日は大事な試験があるので、今夜は勉強せ（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "ざるを得る",
          "ざるは得ない",
          "ざるを得ない",
          "ざるを得なかった"
        ],
        "answer": 2,
        "explain_vi": "〜ざるを得ない nghĩa là 'buộc phải, không thể không làm'. Câu nói về tối nay (hiện tại/tương lai) nên dùng dạng hiện tại 勉強せざるを得ない.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「この橋は、新しい技術（　）作られた。」に入るものとして正しいものはどれですか。",
        "choices": [
          "によって",
          "にとって",
          "について",
          "として"
        ],
        "answer": 0,
        "explain_vi": "Trong câu bị động, 〜によって chỉ phương tiện, cách thức hoặc tác nhân tạo ra: cây cầu được làm bằng/nhờ công nghệ mới. にとって là 'đối với' nên không hợp.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「もう高校生なのに、弟の字は（　）見える。」に入るものとして正しいものはどれですか。",
        "choices": [
          "子どもっぽい",
          "子どもっぽさ",
          "子どもっぽめる",
          "子どもっぽく"
        ],
        "answer": 3,
        "explain_vi": "Trước 見える cần dạng trạng từ 〜く, nên dùng 子どもっぽく (trông trẻ con). Mẫu 〜っぽい nghĩa là 'có vẻ, trông như', ở đây mang sắc thái chê chữ viết trẻ con so với tuổi học sinh cấp 3.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「この曲は、聞けば聞く（　）好きになる。」に入るものとして正しいものはどれですか。",
        "choices": [
          "だけ",
          "ほど",
          "ばかり",
          "くらい"
        ],
        "answer": 1,
        "explain_vi": "Mẫu 〜ば〜ほど nghĩa là 'càng... càng...': 聞けば聞くほど好きになる = càng nghe càng thích. Đây là cấu trúc cố định lặp lại cùng một động từ.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「この会社では、毎朝9時から会議をすることに（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "している",
          "みえる",
          "なっている",
          "なれる"
        ],
        "answer": 2,
        "explain_vi": "〜ことになっている nghĩa là 'đã được quy định, theo lệ là': ở công ty này quy định họp từ 9 giờ sáng. Dùng cho quy tắc, lịch trình đã định sẵn.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「私は先生に、推薦状を書いて（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "いただいた",
          "あげた",
          "やった",
          "された"
        ],
        "answer": 0,
        "explain_vi": "〜ていただく là dạng khiêm nhường của 〜てもらう, dùng khi nhận sự giúp đỡ từ người trên: tôi đã được thầy viết cho thư giới thiệu. あげた/やった dùng khi mình làm cho người khác nên sai hướng.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「今日は暑くて、冷たい水が飲みたくて（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "たまらなく",
          "たまらなかった",
          "たまらないはず",
          "たまらない"
        ],
        "answer": 3,
        "explain_vi": "〜たくてたまらない nghĩa là 'muốn đến mức không chịu nổi': nóng quá nên khát nước lạnh không chịu được. Đây là mẫu diễn tả cảm xúc, mong muốn rất mạnh.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "次の文の（　★　）に入る最もよいものを、1・2・3・4から一つ選びなさい。\\n私は（　）（　）（　★　）（　）思います。\\n1 この仕事は　2 私には　3 難しいと　4 少し",
        "choices": [
          "この仕事は",
          "私には",
          "難しいと",
          "少し"
        ],
        "answer": 1,
        "explain_vi": "Thứ tự đúng là: この仕事は（1）少し（4）私には（2）難しいと（3）思います = 'Tôi nghĩ công việc này hơi khó đối với tôi'. Vị trí ★ là mảnh thứ ba, tức 私には.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "次の文の（　★　）に入る最もよいものを、1・2・3・4から一つ選びなさい。\\n彼女は（　）（　）（　★　）（　）なりました。\\n1 話せるように　2 日本語が　3 上手に　4 だんだん",
        "choices": [
          "話せるように",
          "日本語が",
          "上手に",
          "だんだん"
        ],
        "answer": 2,
        "explain_vi": "Thứ tự đúng là: だんだん（4）日本語が（2）上手に（3）話せるように（1）なりました = 'Cô ấy dần dần đã có thể nói tiếng Nhật giỏi'. Vị trí ★ là mảnh thứ ba, tức 上手に.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "次の文の（　★　）に入る最もよいものを、1・2・3・4から一つ選びなさい。\\n明日は（　）（　）（　★　）（　）行きましょう。\\n1 桜を　2 見に　3 みんなで　4 公園へ",
        "choices": [
          "桜を",
          "見に",
          "みんなで",
          "公園へ"
        ],
        "answer": 0,
        "explain_vi": "Thứ tự đúng là: みんなで（3）公園へ（4）桜を（1）見に（2）行きましょう = 'Ngày mai mọi người cùng đến công viên ngắm hoa anh đào nhé'. Vị trí ★ là mảnh thứ ba, tức 桜を.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "私は先月から、かぜの町の子ども食堂でボランティアをしている。はじめは言葉が通じるか心配だったが、子どもたちは明るく話しかけてくれた。（　43　）、毎週行くのが楽しみになった。料理を作るだけでなく、宿題を手伝うこともある。勉強を教える（　44　）、私も日本の習慣をたくさん学んだ。この活動を通して、町の人と（　45　）なれたのが一番うれしい。\\n\\n（　43　）に入るものとして正しいものはどれですか。",
        "choices": [
          "しかし",
          "それなのに",
          "たとえば",
          "そのため"
        ],
        "answer": 3,
        "explain_vi": "Câu trước nói bọn trẻ thân thiện bắt chuyện, câu sau là kết quả 'tôi thấy vui khi đến mỗi tuần', nên liên từ chỉ kết quả そのため (vì vậy) là đúng. しかし và それなのに chỉ sự đối ngược nên sai.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "私は先月から、かぜの町の子ども食堂でボランティアをしている。はじめは言葉が通じるか心配だったが、子どもたちは明るく話しかけてくれた。（　43　）、毎週行くのが楽しみになった。料理を作るだけでなく、宿題を手伝うこともある。勉強を教える（　44　）、私も日本の習慣をたくさん学んだ。この活動を通して、町の人と（　45　）なれたのが一番うれしい。\\n\\n（　44　）に入るものとして正しいものはどれですか。",
        "choices": [
          "ながら",
          "一方で",
          "ばかり",
          "うちに"
        ],
        "answer": 1,
        "explain_vi": "Sau động từ dạng từ điển 教える cần 〜一方で để nói hai mặt song song: 'một mặt dạy học, mặt khác tôi cũng học được nhiều phong tục Nhật Bản'. ながら phải nối với thể ます bỏ ます nên không dùng sau 教える được.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "私は先月から、かぜの町の子ども食堂でボランティアをしている。はじめは言葉が通じるか心配だったが、子どもたちは明るく話しかけてくれた。（　43　）、毎週行くのが楽しみになった。料理を作るだけでなく、宿題を手伝うこともある。勉強を教える（　44　）、私も日本の習慣をたくさん学んだ。この活動を通して、町の人と（　45　）なれたのが一番うれしい。\\n\\n（　45　）に入るものとして正しいものはどれですか。",
        "choices": [
          "仲良い",
          "仲良さ",
          "仲良く",
          "仲良げ"
        ],
        "answer": 2,
        "explain_vi": "Cụm cố định 仲良くなる nghĩa là 'trở nên thân thiết'. Trước なれた (dạng khả năng của なる) phải dùng dạng trạng từ 仲良く. Điều vui nhất của người viết là đã thân thiết được với người dân trong thị trấn.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "フオンさんへ\\n明日の打ち合わせですが、部長の都合で、午前10時から午後2時に変更になりました。場所は今までと同じ、そらビル3階の会議室です。資料は私が用意しますので、フオンさんは先週の報告書だけ持ってきてください。\\nアン\\n\\n打ち合わせは何時から始まりますか。",
        "choices": [
          "午後2時",
          "午前10時",
          "午後3時",
          "午前9時"
        ],
        "answer": 0,
        "explain_vi": "Email ghi rõ buổi họp bị đổi từ 10 giờ sáng thành 2 giờ chiều vì lịch của trưởng phòng: 午前10時から午後2時に変更になりました.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "そら市の図書館では、本を1人5冊まで、3週間借りることができる。返す日が休みの日に当たる場合は、次の開館日に返せばよい。また、借りたい本がほかの人に貸し出されているときは、予約をすることもできる。\\n\\n本はどのくらいの間、借りることができますか。",
        "choices": [
          "1週間",
          "2週間",
          "5週間",
          "3週間"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn ghi 本を1人5冊まで、3週間借りることができる, tức là mỗi người mượn tối đa 5 cuốn trong 3 tuần. Số 5 là số sách, không phải số tuần.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "アンさんは毎朝、仕事の前に30分走っている。はじめは健康のために始めたが、今は走った日のほうが夜よく眠れることに気づき、それが続ける理由になっている。雨の日は無理をせず、家で軽い運動をしているそうだ。\\n\\nアンさんが今、走ることを続けている理由はどれですか。",
        "choices": [
          "健康のためだけに走っているから",
          "走った日は夜よく眠れるから",
          "友達と一緒に走る約束をしたから",
          "大会に出るために練習しているから"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói ban đầu chạy vì sức khỏe, nhưng bây giờ lý do tiếp tục là vì nhận ra ngày nào chạy thì đêm ngủ ngon hơn: 走った日のほうが夜よく眠れることが続ける理由になっている.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "社内のお知らせ\\n1階のコピー機は故障のため、今週の金曜日まで使えません。コピーが必要な方は、2階のコピー機をご利用ください。修理が終わりましたら、またお知らせします。\\n\\nコピーをしたいとき、どこへ行けばいいですか。",
        "choices": [
          "1階",
          "3階",
          "2階",
          "4階"
        ],
        "answer": 2,
        "explain_vi": "Thông báo nói máy photo ở tầng 1 bị hỏng đến thứ Sáu, ai cần photo thì dùng máy ở tầng 2: 2階のコピー機をご利用ください.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "フオンさんは、3か月前から自転車で会社に通っている。以前は電車で通勤していたが、朝の満員電車に乗るたびに疲れてしまい、仕事を始める前に元気がなくなっていた。自転車では会社まで40分かかるが、自分のペースで走れるし、途中で季節の花や鳥の声に気づく楽しみもある。雨の日は無理をせず、バスで通勤している。3か月続けた結果、前より体の調子がよくなり、朝も早く起きられるようになった。\\n\\nフオンさんは以前、どうやって会社に通っていましたか。",
        "choices": [
          "電車で通っていた",
          "バスで通っていた",
          "歩いて通っていた",
          "車で通っていた"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn ghi 以前は電車で通勤していた, tức là trước đây chị đi làm bằng tàu điện, nhưng tàu đông buổi sáng khiến chị mệt.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "フオンさんは、3か月前から自転車で会社に通っている。以前は電車で通勤していたが、朝の満員電車に乗るたびに疲れてしまい、仕事を始める前に元気がなくなっていた。自転車では会社まで40分かかるが、自分のペースで走れるし、途中で季節の花や鳥の声に気づく楽しみもある。雨の日は無理をせず、バスで通勤している。3か月続けた結果、前より体の調子がよくなり、朝も早く起きられるようになった。\\n\\n雨の日、フオンさんはどうやって会社に行きますか。",
        "choices": [
          "自転車で行く",
          "電車で行く",
          "会社を休む",
          "バスで行く"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn ghi 雨の日は無理をせず、バスで通勤している, tức là ngày mưa chị không cố đi xe đạp mà đi làm bằng xe buýt.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "フオンさんは、3か月前から自転車で会社に通っている。以前は電車で通勤していたが、朝の満員電車に乗るたびに疲れてしまい、仕事を始める前に元気がなくなっていた。自転車では会社まで40分かかるが、自分のペースで走れるし、途中で季節の花や鳥の声に気づく楽しみもある。雨の日は無理をせず、バスで通勤している。3か月続けた結果、前より体の調子がよくなり、朝も早く起きられるようになった。\\n\\n自転車通勤を3か月続けて、どうなりましたか。",
        "choices": [
          "会社まで10分で行けるようになった",
          "体の調子がよくなった",
          "自転車が速く走れるようになった",
          "満員電車が好きになった"
        ],
        "answer": 1,
        "explain_vi": "Kết quả sau 3 tháng được ghi rõ: 前より体の調子がよくなり、朝も早く起きられるようになった, tức là sức khỏe tốt hơn trước và dậy sớm được.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "かぜの町では、去年から月に一度、「スマホ教室」が開かれている。町の高校生がボランティアとして、お年寄りにスマートフォンの使い方を教える教室だ。最初は参加者が少なかったが、参加した人の口コミで広がり、今では毎回20人以上が集まるようになった。お年寄りたちは、ビデオ通話で遠くに住む孫と顔を見ながら話せるようになったことを、とても喜んでいる。一方、高校生たちも、お年寄りから昔の町の様子や仕事の話を聞くことができて、勉強になると話している。ただ、会場の部屋が狭いことが問題で、来月からは町の公民館の大きな部屋に移る予定だ。\\n\\n「スマホ教室」が始まったのはいつですか。",
        "choices": [
          "先月",
          "3年前",
          "今年の春",
          "去年"
        ],
        "answer": 3,
        "explain_vi": "Câu đầu của đoạn văn ghi かぜの町では、去年から月に一度「スマホ教室」が開かれている, tức lớp học bắt đầu từ năm ngoái, mỗi tháng một lần.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "かぜの町では、去年から月に一度、「スマホ教室」が開かれている。町の高校生がボランティアとして、お年寄りにスマートフォンの使い方を教える教室だ。最初は参加者が少なかったが、参加した人の口コミで広がり、今では毎回20人以上が集まるようになった。お年寄りたちは、ビデオ通話で遠くに住む孫と顔を見ながら話せるようになったことを、とても喜んでいる。一方、高校生たちも、お年寄りから昔の町の様子や仕事の話を聞くことができて、勉強になると話している。ただ、会場の部屋が狭いことが問題で、来月からは町の公民館の大きな部屋に移る予定だ。\\n\\n参加者が増えたのはなぜですか。",
        "choices": [
          "参加した人の口コミで広がったから",
          "町がチラシをたくさん配ったから",
          "テレビで紹介されたから",
          "参加費が無料になったから"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn ghi 参加した人の口コミで広がり、今では毎回20人以上が集まる, tức là nhờ truyền miệng của người tham gia mà lớp đông lên.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "かぜの町では、去年から月に一度、「スマホ教室」が開かれている。町の高校生がボランティアとして、お年寄りにスマートフォンの使い方を教える教室だ。最初は参加者が少なかったが、参加した人の口コミで広がり、今では毎回20人以上が集まるようになった。お年寄りたちは、ビデオ通話で遠くに住む孫と顔を見ながら話せるようになったことを、とても喜んでいる。一方、高校生たちも、お年寄りから昔の町の様子や仕事の話を聞くことができて、勉強になると話している。ただ、会場の部屋が狭いことが問題で、来月からは町の公民館の大きな部屋に移る予定だ。\\n\\nお年寄りたちが喜んでいることは何ですか。",
        "choices": [
          "高校生に昔の話を聞かせること",
          "新しいスマートフォンをもらえたこと",
          "孫とビデオ通話で話せるようになったこと",
          "公民館の大きな部屋が使えること"
        ],
        "answer": 2,
        "explain_vi": "Đoạn văn ghi người cao tuổi rất vui vì ビデオ通話で遠くに住む孫と顔を見ながら話せるようになった, tức là gọi video thấy mặt cháu ở xa.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "かぜの町では、去年から月に一度、「スマホ教室」が開かれている。町の高校生がボランティアとして、お年寄りにスマートフォンの使い方を教える教室だ。最初は参加者が少なかったが、参加した人の口コミで広がり、今では毎回20人以上が集まるようになった。お年寄りたちは、ビデオ通話で遠くに住む孫と顔を見ながら話せるようになったことを、とても喜んでいる。一方、高校生たちも、お年寄りから昔の町の様子や仕事の話を聞くことができて、勉強になると話している。ただ、会場の部屋が狭いことが問題で、来月からは町の公民館の大きな部屋に移る予定だ。\\n\\n来月から、この教室はどうなりますか。",
        "choices": [
          "毎週開かれるようになる",
          "公民館の大きな部屋に移る",
          "高校生が教えるのをやめる",
          "参加者が20人以下になる"
        ],
        "answer": 1,
        "explain_vi": "Cuối đoạn văn ghi vì phòng chật là vấn đề nên 来月からは町の公民館の大きな部屋に移る予定だ, tức từ tháng sau lớp chuyển sang phòng lớn ở nhà văn hóa.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "アンさん：私は買い物も電車も、全部スマートフォンのキャッシュレス支払いです。小銭を用意しなくていいし、ポイントもたまるので、とても便利だと思います。\\nフオンさん：私は買い物では現金を使うことが多いです。現金なら、お金が減っていくのが目に見えるので、使いすぎを防げます。ただ、電車に乗るときだけは、ICカードのキャッシュレス支払いを使っています。\\n\\nアンさんとフオンさんに共通していることはどれですか。",
        "choices": [
          "買い物では現金しか使わない",
          "ポイントを集めるのが好きだ",
          "小銭をいつも持ち歩いている",
          "電車ではキャッシュレス支払いを使っている"
        ],
        "answer": 3,
        "explain_vi": "A dùng thanh toán không tiền mặt cho cả mua sắm lẫn tàu điện, B chủ yếu dùng tiền mặt khi mua sắm nhưng riêng đi tàu thì dùng thẻ IC không tiền mặt. Điểm chung là cả hai đều dùng thanh toán không tiền mặt khi đi tàu.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "アンさん：私は買い物も電車も、全部スマートフォンのキャッシュレス支払いです。小銭を用意しなくていいし、ポイントもたまるので、とても便利だと思います。\\nフオンさん：私は買い物では現金を使うことが多いです。現金なら、お金が減っていくのが目に見えるので、使いすぎを防げます。ただ、電車に乗るときだけは、ICカードのキャッシュレス支払いを使っています。\\n\\nフオンさんが買い物で現金を使うのはなぜですか。",
        "choices": [
          "お金の減り方が目に見えて、使いすぎを防げるから",
          "ポイントがたくさんたまるから",
          "小銭を用意するのが面倒だから",
          "スマートフォンを持っていないから"
        ],
        "answer": 0,
        "explain_vi": "B nói rõ: 現金なら、お金が減っていくのが目に見えるので、使いすぎを防げます, tức dùng tiền mặt thấy tiền giảm dần bằng mắt nên tránh tiêu quá tay.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "そら市文化センター「秋の料理教室」のお知らせ\\n日時：11月14日（土）午前10時〜午後1時\\n場所：そら市文化センター 2階 調理室\\n定員：20名\\n参加費：1,500円（材料費を含みます）\\n持ち物：エプロン\\n申し込み：11月7日までに、電話または文化センターの窓口でお申し込みください。\\n※小学生は保護者と一緒に参加してください。\\n作るもの：かぜの町で取れた野菜のスープと手作りパン\\n\\n申し込みはいつまでですか。",
        "choices": [
          "11月14日",
          "11月20日",
          "11月7日",
          "11月1日"
        ],
        "answer": 2,
        "explain_vi": "Thông báo ghi 申し込み：11月7日までに, tức hạn đăng ký là ngày 7 tháng 11, qua điện thoại hoặc tại quầy của trung tâm. Ngày 14 tháng 11 là ngày tổ chức lớp học.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "そら市文化センター「秋の料理教室」のお知らせ\\n日時：11月14日（土）午前10時〜午後1時\\n場所：そら市文化センター 2階 調理室\\n定員：20名\\n参加費：1,500円（材料費を含みます）\\n持ち物：エプロン\\n申し込み：11月7日までに、電話または文化センターの窓口でお申し込みください。\\n※小学生は保護者と一緒に参加してください。\\n作るもの：かぜの町で取れた野菜のスープと手作りパン\\n\\n参加費1,500円には、何が含まれていますか。",
        "choices": [
          "エプロンの代金",
          "材料費",
          "交通費",
          "レシピの本の代金"
        ],
        "answer": 1,
        "explain_vi": "Thông báo ghi 参加費：1,500円（材料費を含みます）, tức phí tham gia 1.500 yên đã bao gồm tiền nguyên liệu. Tạp dề (エプロン) là đồ người tham gia tự mang theo.",
        "src": "full"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「来週の会議で、新しい計画を提案する予定だ。」の「提案」の読み方として正しいものはどれですか。",
        "choices": [
          "ていえん",
          "だいあん",
          "ていあん",
          "てあん"
        ],
        "answer": 2,
        "explain_vi": "提案 đọc là ていあん, nghĩa là 'đề xuất, đề nghị'. Các cách đọc còn lại không tồn tại trong tiếng Nhật.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「駅前で偶然、高校時代の友達に会った。」の「偶然」の読み方として正しいものはどれですか。",
        "choices": [
          "ぐうぜん",
          "ぐぜん",
          "ごうぜん",
          "ぐうせん"
        ],
        "answer": 0,
        "explain_vi": "偶然 đọc là ぐうぜん, nghĩa là 'tình cờ, ngẫu nhiên', ví dụ 偶然会う = tình cờ gặp nhau.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「この機械は操作が複雑で、慣れるまで時間がかかる。」の「複雑」の読み方として正しいものはどれですか。",
        "choices": [
          "ふくさつ",
          "ふくざち",
          "ふくさち",
          "ふくざつ"
        ],
        "answer": 3,
        "explain_vi": "複雑 đọc là ふくざつ, nghĩa là 'phức tạp'. Cần chú ý âm ざつ, rất hay bị đọc nhầm thành さつ.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「締め切り」という言葉の意味として最も近いものはどれですか。",
        "choices": [
          "会議が始まる時間",
          "物事を終わらせなければならない最終の日時",
          "約束を守ること",
          "仕事を始める日"
        ],
        "answer": 1,
        "explain_vi": "締め切り (しめきり) là hạn chót phải hoàn thành một việc nào đó, ví dụ hạn nộp bài hay hạn đăng ký.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「弟は新しいゲームに（　）になって、夕食を食べるのも忘れてしまった。」に入る言葉として最も適切なものはどれですか。",
        "choices": [
          "心配",
          "びっくり",
          "夢中",
          "満足"
        ],
        "answer": 2,
        "explain_vi": "Cụm 〜に夢中になる nghĩa là 'say mê, mải mê đến quên cả xung quanh'. Em trai mải chơi game đến quên ăn tối nên 夢中 là phù hợp nhất.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「断る」という言葉の使い方として正しい文はどれですか。",
        "choices": [
          "アンさんは忙しくて、パーティーの誘いを断った。",
          "私は彼の意見に断った。",
          "彼は私の質問に断って答えた。",
          "先生は学生の間違いを断った。"
        ],
        "answer": 0,
        "explain_vi": "断る (ことわる) nghĩa là 'từ chối' lời mời hoặc yêu cầu của người khác, dùng như 誘いを断る. Các câu còn lại đều dùng sai đối tượng đi với 断る.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「準備はだいたい終わりました。」の「だいたい」の意味として最も近いものはどれですか。",
        "choices": [
          "完全に",
          "詳しく",
          "一部分だけ",
          "ほとんど"
        ],
        "answer": 3,
        "explain_vi": "Trong câu này, だいたい nghĩa là 'hầu hết, gần như toàn bộ' (việc chuẩn bị đã xong phần lớn), nên gần nghĩa nhất với ほとんど.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「彼は約束の時間に『おくれて』来た。」の「おくれて」を漢字で書くとどれですか。",
        "choices": [
          "送れて",
          "遅れて",
          "遅くれて",
          "後れて"
        ],
        "answer": 1,
        "explain_vi": "Với nghĩa 'đến muộn giờ hẹn', おくれて viết bằng kanji là 遅れて, thuộc động từ 遅れる (chậm, muộn). 送る nghĩa là 'gửi' nên không phù hợp.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「この歌は、練習すれ（　）上手になります。」に入るものとして正しいものはどれですか。",
        "choices": [
          "ばすれば",
          "ばするのに",
          "ばするほど",
          "ばするうちに"
        ],
        "answer": 2,
        "explain_vi": "Mẫu 〜ば〜ほど nghĩa là 'càng... càng...', lặp lại cùng một động từ: 練習すればするほど上手になる = càng luyện tập thì càng hát hay.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「人（　）、考え方はさまざまだ。」に入るものとして正しいものはどれですか。",
        "choices": [
          "によって",
          "にとって",
          "において",
          "に対して"
        ],
        "answer": 0,
        "explain_vi": "〜によって ở đây nghĩa là 'tùy vào... mà khác nhau': 人によって考え方はさまざまだ = tùy từng người mà cách suy nghĩ khác nhau.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「このバッグは本物の皮のように見えるが、実は安い材料で作られていて、少し（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "重っぽい",
          "安っぽい",
          "忘れっぽい",
          "怒りっぽい"
        ],
        "answer": 1,
        "explain_vi": "〜っぽい nghĩa là 'trông có vẻ, mang dáng dấp của...'. 安っぽい = trông rẻ tiền, kém chất lượng, hợp với ngữ cảnh chiếc túi làm bằng vật liệu rẻ.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「電車が止まってしまったので、駅から会社まで歩か（　）。」に入るものとして正しいものはどれですか。",
        "choices": [
          "ざるを得る",
          "ざるを得ない",
          "ざるをえないかった",
          "ざるを得なかった"
        ],
        "answer": 3,
        "explain_vi": "〜ざるを得ない nghĩa là 'buộc phải, không còn cách nào khác'. Vì cả câu đang kể chuyện quá khứ nên phải dùng dạng 歩かざるを得なかった.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「弟は子どものころ、母に嫌いな野菜を無理に（　）、泣いてしまったそうだ。」に入るものとして正しいものはどれですか。",
        "choices": [
          "食べさせた",
          "食べさせてあげた",
          "食べさせられた",
          "食べさせたい"
        ],
        "answer": 2,
        "explain_vi": "Đây là dạng bị động sai khiến 〜させられる: 母に野菜を食べさせられた = bị mẹ bắt ăn rau. Ngữ cảnh 'bị ép' (無理に) và 'đã khóc' cho thấy đây không phải hành động tự nguyện.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「雨が降らない（　）、急いで家に帰ろう。」に入るものとして正しいものはどれですか。",
        "choices": [
          "うちに",
          "ところに",
          "うえに",
          "ために"
        ],
        "answer": 0,
        "explain_vi": "〜ないうちに nghĩa là 'tranh thủ lúc còn chưa... thì làm ngay': nhân lúc trời chưa mưa, hãy nhanh về nhà.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "「年を取る（　）、若い頃の友達と会う機会が減ってきた。」に入るものとして正しいものはどれですか。",
        "choices": [
          "についた",
          "につれて",
          "について",
          "につき"
        ],
        "answer": 1,
        "explain_vi": "〜につれて nghĩa là 'cùng với sự biến đổi của... thì... cũng thay đổi theo': 年を取るにつれて = càng lớn tuổi thì cơ hội gặp bạn cũ càng giảm.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "そら市の図書館では、毎週土曜日に外国人のための日本語教室が開かれている。ベトナムから来たフオンさんは、去年の春からこの教室に通っている。はじめは買い物で困ることが多かったが、今では店の人と短い会話ができるようになった。教室では、文法の勉強だけでなく、日本の生活で役に立つ表現も教えている。フオンさんは「来年は日本語能力試験のN3を受けたい」と笑顔で話した。先生によると、フオンさんのように目標を持って続ける人は、少しずつだが確実に上手になるそうだ。\n\nフオンさんが日本語教室に通い始めたのはいつですか。",
        "choices": [
          "今年の春",
          "去年の秋",
          "2年前の春",
          "去年の春"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn ghi rõ フオンさんは去年の春からこの教室に通っている, tức là chị bắt đầu học từ mùa xuân năm ngoái.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "そら市の図書館では、毎週土曜日に外国人のための日本語教室が開かれている。ベトナムから来たフオンさんは、去年の春からこの教室に通っている。はじめは買い物で困ることが多かったが、今では店の人と短い会話ができるようになった。教室では、文法の勉強だけでなく、日本の生活で役に立つ表現も教えている。フオンさんは「来年は日本語能力試験のN3を受けたい」と笑顔で話した。先生によると、フオンさんのように目標を持って続ける人は、少しずつだが確実に上手になるそうだ。\n\nこの教室について、正しいものはどれですか。",
        "choices": [
          "文法だけを教えている",
          "試験の問題だけを教えている",
          "文法のほかに、生活で役に立つ表現も教えている",
          "日曜日に開かれている"
        ],
        "answer": 2,
        "explain_vi": "Đoạn văn nói lớp học không chỉ dạy ngữ pháp mà còn dạy các cách diễn đạt hữu ích trong đời sống ở Nhật: 文法の勉強だけでなく、日本の生活で役に立つ表現も教えている.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "そら市の図書館では、毎週土曜日に外国人のための日本語教室が開かれている。ベトナムから来たフオンさんは、去年の春からこの教室に通っている。はじめは買い物で困ることが多かったが、今では店の人と短い会話ができるようになった。教室では、文法の勉強だけでなく、日本の生活で役に立つ表現も教えている。フオンさんは「来年は日本語能力試験のN3を受けたい」と笑顔で話した。先生によると、フオンさんのように目標を持って続ける人は、少しずつだが確実に上手になるそうだ。\n\n先生によると、どんな人が日本語が上手になりますか。",
        "choices": [
          "毎日たくさん単語を覚える人",
          "目標を持って勉強を続ける人",
          "日本語の試験を受けたことがある人",
          "若い人"
        ],
        "answer": 1,
        "explain_vi": "Theo thầy giáo trong đoạn văn, người có mục tiêu và kiên trì học tiếp (目標を持って続ける人) sẽ tiến bộ từng chút một nhưng chắc chắn.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "かぜの町では、先月から「まちの食堂」という活動が始まった。この食堂では、地域のボランティアが週に一度、安い値段で夕食を作っている。一人で暮らすお年寄りや、仕事で遅くなる若い親子など、だれでも利用できる。料理に使う野菜は、近くの畑で取れたものだが、形が悪くて店では売れない野菜も多い。食堂の代表は「食べ物を無駄にせず、町の人たちが知り合う場所にしたい」と話している。来月からは、食事の後に子どもたちが宿題をする時間も作る予定だ。\n\n「まちの食堂」について、正しいものはどれですか。",
        "choices": [
          "ボランティアが週に一度、安い値段で夕食を作っている",
          "毎日、夕食を食べることができる",
          "お年寄りだけが利用できる",
          "店で売れている野菜だけを使っている"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn nói các tình nguyện viên trong vùng mỗi tuần một lần nấu bữa tối với giá rẻ tại食堂 này, ai cũng có thể sử dụng.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "かぜの町では、先月から「まちの食堂」という活動が始まった。この食堂では、地域のボランティアが週に一度、安い値段で夕食を作っている。一人で暮らすお年寄りや、仕事で遅くなる若い親子など、だれでも利用できる。料理に使う野菜は、近くの畑で取れたものだが、形が悪くて店では売れない野菜も多い。食堂の代表は「食べ物を無駄にせず、町の人たちが知り合う場所にしたい」と話している。来月からは、食事の後に子どもたちが宿題をする時間も作る予定だ。\n\nこの食堂の代表がしたいことは何ですか。",
        "choices": [
          "野菜をたくさん売ること",
          "子どもたちに料理を教えること",
          "町の外にも食堂を増やすこと",
          "食べ物を無駄にせず、人々が知り合う場所にすること"
        ],
        "answer": 3,
        "explain_vi": "Người đại diện nói muốn食堂 này là nơi không lãng phí thức ăn và là nơi mọi người trong町 làm quen, gắn kết với nhau.",
        "src": "mock"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "将来のために、毎日努力しています。「努力」の読み方として正しいものはどれですか。",
        "choices": [
          "どりき",
          "どりょく",
          "どりょう",
          "とりょく"
        ],
        "answer": 1,
        "explain_vi": "努力 đọc là どりょく, nghĩa là sự nỗ lực. Đây là từ thường gặp ở trình độ N3.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "「けんか」の漢字として正しいものはどれですか。",
        "choices": [
          "喧華",
          "見嘩",
          "見解",
          "喧嘩"
        ],
        "answer": 3,
        "explain_vi": "けんか viết là 喧嘩, nghĩa là cãi nhau. Cần chú ý chữ 喧 và 嘩, không nhầm với các chữ trông giống.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "彼は約束を（ ）、必ず来ます。",
        "choices": [
          "守る",
          "破る",
          "忘れる",
          "遅れる"
        ],
        "answer": 0,
        "explain_vi": "Giữ lời hứa dùng 守る: 約束を守る nghĩa là giữ lời hẹn. 破る là phá vỡ, 忘れる là quên, đều trái với ý câu.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "彼はみんなに（ ）人です。",
        "choices": [
          "疑われる",
          "忘れられる",
          "信頼される",
          "怒られる"
        ],
        "answer": 2,
        "explain_vi": "Được mọi người tin tưởng dùng 信頼される. 疑われる là bị nghi ngờ, 怒られる là bị mắng, đều không hợp với ý tích cực của câu.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "急に雨が降ってきたので、（ ）家に帰った。",
        "choices": [
          "急いで",
          "ゆっくり",
          "静かに",
          "少しずつ"
        ],
        "answer": 0,
        "explain_vi": "Vì mưa bất chợt nên phải về vội, dùng 急いで. ゆっくり là thong thả, 静かに là yên lặng, không hợp với tình huống gấp gáp.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "電気代を（ ）ために、使わない部屋の電気を消します。",
        "choices": [
          "増やす",
          "捨てる",
          "借りる",
          "節約する"
        ],
        "answer": 3,
        "explain_vi": "Tiết kiệm tiền điện dùng 節約する. 増やす là tăng lên, 捨てる là vứt bỏ, đều trái với mục đích trong câu.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "この本は初心者にも（ ）書かれています。",
        "choices": [
          "難しく",
          "分かりやすく",
          "分かりにくく",
          "長く"
        ],
        "answer": 1,
        "explain_vi": "Sách viết dễ hiểu cho người mới dùng 分かりやすく. 分かりにくく là khó hiểu, 難しく là khó, đều trái với ý câu.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文字・語彙",
        "question": "彼女は毎日日記を書く習慣があります。「習慣」の読み方として正しいものはどれですか。",
        "choices": [
          "しゅかん",
          "しゅうがん",
          "しゅうかん",
          "しゅうか"
        ],
        "answer": 2,
        "explain_vi": "習慣 đọc là しゅうかん, nghĩa là thói quen. Âm しゅう kéo dài và chữ 慣 đọc là かん, cần đọc đủ cả hai phần.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "彼はもう帰った（ ）です。",
        "choices": [
          "はずだ",
          "べきだ",
          "かもしれない",
          "ためだ"
        ],
        "answer": 2,
        "explain_vi": "Phỏng đoán có thể xảy ra dùng 〜かもしれない: 帰ったかもしれない nghĩa là có thể anh ấy đã về rồi.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "明日までにレポートを（ ）なければなりません。",
        "choices": [
          "出さ",
          "出し",
          "出して",
          "出す"
        ],
        "answer": 0,
        "explain_vi": "Phải làm gì dùng 〜なければなりません với thể ない: 出さなければなりません nghĩa là phải nộp báo cáo.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "彼女は忙しい（ ）、いつも笑顔です。",
        "choices": [
          "から",
          "ため",
          "なら",
          "のに"
        ],
        "answer": 3,
        "explain_vi": "Dù… nhưng… dùng 〜のに: 忙しいのに nghĩa là dù bận rộn, cô ấy vẫn luôn mỉm cười.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "毎日練習したので、日本語が話せる（ ）なりました。",
        "choices": [
          "ような",
          "ように",
          "ようで",
          "ようと"
        ],
        "answer": 1,
        "explain_vi": "Trở nên có thể làm gì dùng 〜ようになる: 話せるようになりました nghĩa là đã trở nên nói được tiếng Nhật.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "この映画は見る（ ）があります。",
        "choices": [
          "意味",
          "理由",
          "予定",
          "価値"
        ],
        "answer": 3,
        "explain_vi": "Đáng để xem dùng 価値がある: 見る価値がある nghĩa là bộ phim đáng xem. 意味 là ý nghĩa, 理由 là lý do, không hợp với mẫu câu này.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "雨が降っている（ ）、試合は行われます。",
        "choices": [
          "にもかかわらず",
          "ために",
          "ばかり",
          "そうに"
        ],
        "answer": 0,
        "explain_vi": "Dù… vẫn… ở mức trang trọng dùng 〜にもかかわらず: 雨が降っているにもかかわらず nghĩa là dù trời đang mưa, trận đấu vẫn diễn ra.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "文法",
        "question": "彼は来る（ ）言っていました。",
        "choices": [
          "が",
          "を",
          "と",
          "で"
        ],
        "answer": 2,
        "explain_vi": "Trích dẫn lời nói dùng 〜と: 来ると言っていました nghĩa là anh ấy đã nói rằng sẽ đến.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "ゆかりさんはみどり市に住んでいます。毎朝六時に起きて、駅前の花屋で働いています。仕事は午前九時から午後五時までです。休みの日は、近くの川で散歩をしたり、友だちと料理を作ったりします。先月、新しい自転車を買いました。自転車で行くと、会社まで十五分かかります。\nゆかりさんはどこで働いていますか。",
        "choices": [
          "川の近く",
          "駅前の花屋",
          "料理教室",
          "自転車屋"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói 駅前の花屋で働いています, tức Yukari làm việc ở tiệm hoa trước ga. Sông là nơi đi dạo, không phải nơi làm việc.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "ゆかりさんはみどり市に住んでいます。毎朝六時に起きて、駅前の花屋で働いています。仕事は午前九時から午後五時までです。休みの日は、近くの川で散歩をしたり、友だちと料理を作ったりします。先月、新しい自転車を買いました。自転車で行くと、会社まで十五分かかります。\n仕事は何時から何時までですか。",
        "choices": [
          "午前六時から午後五時まで",
          "午前九時から午後九時まで",
          "午前六時から午後九時まで",
          "午前九時から午後五時まで"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn nói 仕事は午前九時から午後五時までです, tức làm việc từ 9 giờ sáng đến 5 giờ chiều. Sáu giờ sáng là giờ thức dậy.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "ゆかりさんはみどり市に住んでいます。毎朝六時に起きて、駅前の花屋で働いています。仕事は午前九時から午後五時までです。休みの日は、近くの川で散歩をしたり、友だちと料理を作ったりします。先月、新しい自転車を買いました。自転車で行くと、会社まで十五分かかります。\n自転車で行くと、会社まで何分かかりますか。",
        "choices": [
          "十五分",
          "五分",
          "九分",
          "五十分"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn nói 自転車で行くと、会社まで十五分かかります, tức đi xe đạp đến công ty mất 15 phút.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "あさひ公民館は、水曜日から月曜日まで開いています。火曜日は休みです。午前十時から午後八時までです。料理教室は毎週土曜日の午後にあります。参加費は一人五百円です。申し込みは前の日までにしてください。\nあさひ公民館は何曜日に休みですか。",
        "choices": [
          "月曜日",
          "水曜日",
          "火曜日",
          "土曜日"
        ],
        "answer": 2,
        "explain_vi": "Đoạn văn nói 火曜日は休みです, tức trung tâm nghỉ thứ Ba. Thứ Bảy là ngày có lớp nấu ăn, không phải ngày nghỉ.",
        "src": "daily"
      },
      {
        "level": "N3",
        "section": "読解",
        "question": "あさひ公民館は、水曜日から月曜日まで開いています。火曜日は休みです。午前十時から午後八時までです。料理教室は毎週土曜日の午後にあります。参加費は一人五百円です。申し込みは前の日までにしてください。\n料理教室の参加費はいくらですか。",
        "choices": [
          "千円",
          "五百円",
          "無料",
          "五千円"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói 参加費は一人五百円です, tức phí tham gia lớp nấu ăn là 500 yên mỗi người.",
        "src": "daily"
      }
    ]
  };

  window.EXAM_N2 = {
    source: 'content-features/practice/full/2026-10-31-n2.json + content-features/weekly-mock-week1-n2.json',
    questions: [
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の言葉の読み方として最もよいものを選びなさい。「圧倒」",
        "choices": [
          "あつとう",
          "あっとう",
          "あっと",
          "あつと"
        ],
        "answer": 1,
        "explain_vi": "「圧倒」は「あっとう」と読みます。Nghĩa là áp đảo, vượt trội hẳn so với đối phương.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の言葉の読み方として最もよいものを選びなさい。「妥協」",
        "choices": [
          "たきょう",
          "だきょう",
          "だきよ",
          "ときょう"
        ],
        "answer": 1,
        "explain_vi": "「妥協」は「だきょう」と読みます。Nghĩa là thỏa hiệp, nhượng bộ để dung hòa ý kiến hai bên.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉の読み方として最もよいものを選びなさい。「若い世代が地域の祭りを担っている。」",
        "choices": [
          "にな",
          "かつぐ",
          "になう",
          "たんとう"
        ],
        "answer": 2,
        "explain_vi": "「担う」は「になう」と読みます。Nghĩa là gánh vác, đảm nhận một vai trò hay trách nhiệm.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉の読み方として最もよいものを選びなさい。「引っ越しには多くの費用が伴う。」",
        "choices": [
          "ともう",
          "はんう",
          "ばんう",
          "ともなう"
        ],
        "answer": 3,
        "explain_vi": "「伴う」は「ともなう」と読みます。Nghĩa là đi kèm theo, kéo theo một việc khác.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の言葉の読み方として最もよいものを選びなさい。「占める」",
        "choices": [
          "しめる",
          "うらなう",
          "しめす",
          "とめる"
        ],
        "answer": 0,
        "explain_vi": "「占める」は「しめる」と読みます。Nghĩa là chiếm một tỷ lệ, vị trí nhất định trong toàn thể.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉の読み方として最もよいものを選びなさい。「長年の努力が実を結び、ついに目標を遂げた。」",
        "choices": [
          "すげる",
          "とげる",
          "にげる",
          "つげる"
        ],
        "answer": 1,
        "explain_vi": "「遂げる」は「とげる」と読みます。Nghĩa là hoàn thành, đạt được mục tiêu đã đề ra.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の「かんきょう」の部分を漢字で書く場合、最もよいものを選びなさい。「川の水を守るため、かんきょうについて考える授業が行われた。」",
        "choices": [
          "関係",
          "観光",
          "環境",
          "歓迎"
        ],
        "answer": 2,
        "explain_vi": "「かんきょう」は「環境」と書きます。Nghĩa là môi trường tự nhiên và xã hội xung quanh con người.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の「しょうめい」の部分を漢字で書く場合、最もよいものを選びなさい。「実験の結果によって、自分の考えが正しいことをしょうめいした。」",
        "choices": [
          "詳細",
          "照明",
          "証名",
          "証明"
        ],
        "answer": 3,
        "explain_vi": "「しょうめい」は「証明」と書きます。Nghĩa là chứng minh một điều là đúng bằng chứng cứ.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の「ゆうえき」の部分を漢字で書く場合、最もよいものを選びなさい。「失敗の経験も、考え方次第ではゆうえきなものになる。」",
        "choices": [
          "有益",
          "有効",
          "有駅",
          "勇益"
        ],
        "answer": 0,
        "explain_vi": "「ゆうえき」は「有益」と書きます。Nghĩa là có ích, mang lại lợi ích cho bản thân.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の「ていきょう」の部分を漢字で書く場合、最もよいものを選びなさい。「この店では、地元の野菜を使った料理をていきょうしている。」",
        "choices": [
          "提示",
          "提供",
          "低供",
          "提況"
        ],
        "answer": 1,
        "explain_vi": "「ていきょう」は「提供」と書きます。Nghĩa là cung cấp món ăn, dịch vụ cho khách hàng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「情報が（　）十分で、判断が遅れてしまった。」",
        "choices": [
          "非十分",
          "無十分",
          "不十分",
          "未十分"
        ],
        "answer": 2,
        "explain_vi": "Tiếp đầu ngữ phủ định của「十分」là「不」nên thành「不十分」, nghĩa là chưa đầy đủ, còn thiếu. Đây là dạng từ phái sinh bằng tiếp đầu ngữ.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「古い工場の跡地では、住宅や店を作る（　）開発の工事が進んでいる。」",
        "choices": [
          "再開発性",
          "再開発化",
          "開発再",
          "再開発"
        ],
        "answer": 3,
        "explain_vi": "「再開発」は từ ghép gồm「再」(lại) +「開発」, nghĩa là tái phát triển, xây dựng lại một khu vực cũ.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「新しい技術には、思わぬ事故につながる（　）性がある。」",
        "choices": [
          "可能性",
          "可能化",
          "可能様",
          "可能分"
        ],
        "answer": 0,
        "explain_vi": "「可能性」は từ phái sinh bằng tiếp vĩ ngữ「性」, nghĩa là khả năng, tính có thể xảy ra của một việc.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「仕事と子育てを（　）させるのは簡単ではないが、会社の制度が助けになっている。」",
        "choices": [
          "両面",
          "両立",
          "両方立",
          "二立"
        ],
        "answer": 1,
        "explain_vi": "「両立」は từ ghép chỉ hai việc cùng tồn tại, cùng thực hiện được, như vừa làm việc vừa nuôi con.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「大きな地震の後、町の被害は（　）復旧し、今ではほぼ元の姿に戻っている。」",
        "choices": [
          "思い切って",
          "慌ただしく",
          "徐々に",
          "かえって"
        ],
        "answer": 2,
        "explain_vi": "「徐々に」nghĩa là dần dần, từ từ theo thời gian, hợp với quá trình phục hồi sau thiên tai.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「迷った末に、彼は（　）留学を申し込む決心をした。」",
        "choices": [
          "たまたま",
          "せっかく",
          "どうやら",
          "思い切って"
        ],
        "answer": 3,
        "explain_vi": "「思い切って」nghĩa là mạnh dạn quyết tâm làm một việc đã do dự lâu, hợp với「決心をした」.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「会議の日程が変わるかもしれないので、参加者には（　）連絡しておいたほうがいい。」",
        "choices": [
          "あらかじめ",
          "いつの間にか",
          "結局",
          "わざわざ"
        ],
        "answer": 0,
        "explain_vi": "「あらかじめ」nghĩa là trước từ sớm, chuẩn bị báo trước để tránh bị động khi có thay đổi.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「駅で（　）昔の友人に会い、近くの店でしばらく話をした。」",
        "choices": [
          "かえって",
          "たまたま",
          "次々に",
          "大幅に"
        ],
        "answer": 1,
        "explain_vi": "「たまたま」nghĩa là tình cờ, ngẫu nhiên, hợp với việc bất ngờ gặp lại bạn cũ ở ga.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「心配して声をかけたのに、（　）相手の機嫌を悪くしてしまった。」",
        "choices": [
          "せっかく",
          "ようやく",
          "かえって",
          "まさか"
        ],
        "answer": 2,
        "explain_vi": "「かえって」nghĩa là ngược lại với mong đợi, kết quả thành ra tệ hơn, hợp với tình huống quan tâm mà lại làm đối phương khó chịu.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「（　）作った資料なので、できれば最後まで読んでいただきたい。」",
        "choices": [
          "いずれ",
          "どうせ",
          "せいぜい",
          "せっかく"
        ],
        "answer": 3,
        "explain_vi": "「せっかく」nghĩa là đã cất công, mất công làm nên mong được trân trọng, hợp với tài liệu đã kỳ công chuẩn bị.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「空が暗くなってきた。 （　）雨が降り出しそうだ。」",
        "choices": [
          "どうやら",
          "やはり",
          "すでに",
          "必ずしも"
        ],
        "answer": 0,
        "explain_vi": "「どうやら」diễn tả phán đoán dựa trên dấu hiệu quan sát được, nghĩa là có vẻ như, xem ra sắp mưa.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉と意味が最も近いものを選びなさい。「困っている人を助けるために、彼は力を尽くした。」",
        "choices": [
          "力を隠した",
          "できる限りのことをした",
          "力を抜いた",
          "無理をして倒れた"
        ],
        "answer": 1,
        "explain_vi": "「力を尽くす」nghĩa là dốc hết sức, làm hết những gì có thể, gần nghĩa nhất với「できる限りのことをした」.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉と意味が最も近いものを選びなさい。「新しい仕事を始めるにあたって、今後の見通しを立てた。」",
        "choices": [
          "過去の記録",
          "現在の様子",
          "将来の予測",
          "他人の評価"
        ],
        "answer": 2,
        "explain_vi": "「見通し」ở đây nghĩa là dự đoán, viễn cảnh về tương lai, gần nghĩa nhất với「将来の予測」.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉と意味が最も近いものを選びなさい。「小さな会社でも、大きな借金を抱えているところは少なくない。」",
        "choices": [
          "借金を返している",
          "借金を貸している",
          "借金を忘れている",
          "重い負担を背負っている"
        ],
        "answer": 3,
        "explain_vi": "「抱える」trong「借金を抱える」nghĩa bóng là đang gánh một gánh nặng lớn, gần nghĩa với「重い負担を背負っている」.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉と意味が最も近いものを選びなさい。「彼の説明はあっさりしすぎていて、詳しい理由が分からなかった。」",
        "choices": [
          "簡単で淡泊だ",
          "複雑で長い",
          "丁寧で細かい",
          "強くて印象的だ"
        ],
        "answer": 0,
        "explain_vi": "「あっさり」nghĩa là đơn giản, ngắn gọn, nhạt, gần nghĩa với「簡単で淡泊だ」trong ngữ cảnh lời giải thích quá sơ sài.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "「果たす」の使い方として最もよいものを選びなさい。",
        "choices": [
          "電車が駅を果たして、出発した。",
          "彼は約束を果たすために、毎日練習を続けた。",
          "彼女は赤い服を果たして着ている。",
          "雨が果たして、傘が必要になった。"
        ],
        "answer": 1,
        "explain_vi": "「果たす」dùng với「約束」「役割」「責任」nghĩa là thực hiện, hoàn thành điều đã hứa hay nhiệm vụ được giao.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "「慎む」の使い方として最もよいものを選びなさい。",
        "choices": [
          "子どもたちは公園で慎んで遊んだ。",
          "彼女は歌を慎んで歌った。",
          "彼は酒を慎んで、健康に気をつけている。",
          "電車は駅に慎んで止まった。"
        ],
        "answer": 2,
        "explain_vi": "「慎む」nghĩa là kiêng dè, tiết chế một hành vi, nên「酒を慎む」(kiêng rượu) là cách dùng đúng duy nhất.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "「劣る」の使い方として最もよいものを選びなさい。",
        "choices": [
          "彼女は劣る歌を上手に歌った。",
          "彼は劣る服を着て出かけた。",
          "電車が劣る速度で走っている。",
          "この製品は安いが、品質は他社に劣らない。"
        ],
        "answer": 3,
        "explain_vi": "「劣る」nghĩa là thua kém về mức độ, chất lượng, nên「品質は他社に劣らない」(chất lượng không thua kém hãng khác) là đúng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「約束した以上、体調が悪くても会議に出席せ（　）。」",
        "choices": [
          "ざるを得ない",
          "かねない",
          "つつある",
          "がちだ"
        ],
        "answer": 0,
        "explain_vi": "「〜ざるを得ない」nghĩa là không thể không làm, buộc phải làm. Đã hứa rồi thì dù mệt cũng buộc phải dự họp.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「暗いパスワードを使い続けると、個人情報が他人に知られ（　）。」",
        "choices": [
          "ざるを得ない",
          "かねない",
          "ぬく",
          "ことなく"
        ],
        "answer": 1,
        "explain_vi": "「〜かねない」diễn tả khả năng một việc xấu có thể xảy ra. Mật khẩu yếu thì thông tin cá nhân có nguy cơ bị lộ.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「この町では高齢化が進み（　）、若い世代の支援の仕方が課題になっている。」",
        "choices": [
          "がちで",
          "かねて",
          "つつあり",
          "ぬいて"
        ],
        "answer": 2,
        "explain_vi": "「〜つつある」diễn tả sự thay đổi đang dần diễn ra. Già hóa dân số đang tiến triển từng ngày ở thị trấn này.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「人口の減少（　）、駅前の商店は少しずつ店を閉めるようになった。」",
        "choices": [
          "をめぐって",
          "に反して",
          "に基づいて",
          "に伴って"
        ],
        "answer": 3,
        "explain_vi": "「〜に伴って」nghĩa là cùng với một thay đổi này thì việc khác cũng thay đổi theo. Dân số giảm kéo theo các cửa hàng đóng cửa.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「公園の土地の使い方（　）、住民の間で意見が対立している。」",
        "choices": [
          "をめぐって",
          "を込めて",
          "を通じて",
          "を問わず"
        ],
        "answer": 0,
        "explain_vi": "「〜をめぐって」nghĩa là xoay quanh một vấn đề để bàn luận, tranh chấp. Ý kiến đối lập xoay quanh cách sử dụng đất công viên.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「忙しい日が続くと、つい朝ごはんを抜き（　）になる。」",
        "choices": [
          "げ",
          "がち",
          "ぬく",
          "かねる"
        ],
        "answer": 1,
        "explain_vi": "「〜がち」diễn tả xu hướng dễ hay xảy ra một việc không tốt. Bận rộn thì dễ có xu hướng bỏ bữa sáng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「彼女は窓の外を見ながら、寂し（　）に微笑んだ。」",
        "choices": [
          "がち",
          "っぽく",
          "げ",
          "ぐるみ"
        ],
        "answer": 2,
        "explain_vi": "「〜げ」gắn sau tính từ diễn tả vẻ, dáng vẻ bên ngoài.「寂しげに微笑む」là mỉm cười với vẻ buồn, cô đơn.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「彼は困難な練習を最後までやり（　）、ついに代表選手に選ばれた。」",
        "choices": [
          "そうに",
          "かけて",
          "がちで",
          "ぬいて"
        ],
        "answer": 3,
        "explain_vi": "「〜ぬく」gắn sau động từ diễn tả làm đến cùng, vượt qua khó khăn đến cuối.「やりぬく」là kiên trì làm đến cùng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「彼は誰にも相談する（　）、一人で問題を解決した。」",
        "choices": [
          "ことなく",
          "かねて",
          "がちに",
          "ぬいて"
        ],
        "answer": 0,
        "explain_vi": "「〜ことなく」nghĩa là mà không làm một việc gì đó. Anh ấy không相談 với ai mà tự giải quyết vấn đề một mình.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「こんなに努力したのだから、簡単に諦める（　）。」",
        "choices": [
          "ことか",
          "ものか",
          "ばかりか",
          "ながらも"
        ],
        "answer": 1,
        "explain_vi": "「〜ものか」diễn tả quyết tâm mạnh mẽ là tuyệt đối không làm. Đã nỗ lực thế này thì quyết không dễ dàng bỏ cuộc.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「目撃者がいない以上、その場に彼がいたかどうかは確かめ（　）。」",
        "choices": [
          "かねない",
          "ざるを得ない",
          "ようがない",
          "つつある"
        ],
        "answer": 2,
        "explain_vi": "「〜ようがない」nghĩa là không có cách nào để làm. Không có nhân chứng thì không cách nào xác nhận được.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「応募者の年齢（　）、選考の基準が少しずつ異なる。」",
        "choices": [
          "に基づいてのみ",
          "をめぐって",
          "に伴って",
          "に応じて"
        ],
        "answer": 3,
        "explain_vi": "「〜に応じて」nghĩa là tùy theo, tương ứng với điều kiện. Tiêu chuẩn tuyển chọn khác nhau tùy theo độ tuổi ứng viên.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の ★ に入る部分として最もよいものを選びなさい。「彼は ＿ ＿ ★ ＿ ので、みんなに信頼されている。」 1 守る 2 必ず 3 約束を 4 人だ",
        "choices": [
          "守る",
          "必ず",
          "約束を",
          "人だ"
        ],
        "answer": 0,
        "explain_vi": "Thứ tự đúng là「約束を・必ず・守る・人だ」nên vị trí ★ thứ ba là「守る」. Câu nghĩa là anh ấy là người luôn giữ lời hứa nên được mọi người tin cậy.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の ★ に入る部分として最もよいものを選びなさい。「この本は、子ども ＿ ＿ ★ ＿ 書かれている。」 1 にも 2 分かる 3 ように 4 易しく",
        "choices": [
          "にも",
          "分かる",
          "ように",
          "易しく"
        ],
        "answer": 2,
        "explain_vi": "Thứ tự đúng là「子どもにも・分かる・ように・易しく」nên vị trí ★ thứ ba là「ように」. Sách được viết dễ hiểu để trẻ em cũng hiểu được.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の ★ に入る部分として最もよいものを選びなさい。「先生は学生に ＿ ＿ ★ ＿ くださいと言った。」 1 待って 2 静かに 3 教室で 4 先生が来るまで",
        "choices": [
          "待って",
          "静かに",
          "教室で",
          "先生が来るまで"
        ],
        "answer": 3,
        "explain_vi": "Thứ tự đúng là「教室で・静かに・先生が来るまで・待って」nên vị trí ★ thứ ba là「先生が来るまで」.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の ★ に入る部分として最もよいものを選びなさい。「ズイさんは ＿ ＿ ★ ＿ 人だ。」 1 接する 2 誰にでも 3 親切に 4 ことができる",
        "choices": [
          "接する",
          "誰にでも",
          "親切に",
          "ことができる"
        ],
        "answer": 0,
        "explain_vi": "Thứ tự đúng là「誰にでも・親切に・接する・ことができる」nên vị trí ★ thứ ba là「接する」. Câu nói anh Duy là người có thể đối xử thân thiện với bất kỳ ai.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文章の（１）に入れるのに最もよいものを選びなさい。\nみなと市では、三年前から川沿いの清掃活動が行われている。最初は数人で始まった活動だったが、口コミで広がる（１）、今では毎月百人近くが集まるようになった。活動を続けるうちに、住民同士の交流も深まりつつある。一方で、ごみの量は以前ほど減っておらず、この問題を解決しない限り、活動の意味が薄れてしまうという声もある。",
        "choices": [
          "につれて",
          "に反して",
          "に基づいて",
          "に際して"
        ],
        "answer": 0,
        "explain_vi": "「〜につれて」nghĩa là cùng với sự lan rộng dần thì số người tham gia cũng tăng theo, hợp với ngữ cảnh hoạt động lan truyền qua lời truyền miệng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文章の（２）に入れるのに最もよいものを選びなさい。\nみなと市では、三年前から川沿いの清掃活動が行われている。最初は数人で始まった活動だったが、口コミで広がるにつれて、今では毎月百人近くが集まるようになった。活動を続ける（２）、住民同士の交流も深まりつつある。一方で、ごみの量は以前ほど減っておらず、この問題を解決しない限り、活動の意味が薄れてしまうという声もある。",
        "choices": [
          "ものの",
          "うちに",
          "ばかりに",
          "どころか"
        ],
        "answer": 1,
        "explain_vi": "「〜うちに」nghĩa là trong lúc đang làm việc này thì việc khác dần xảy ra. Trong lúc tiếp tục hoạt động, sự giao lưu giữa cư dân dần sâu sắc hơn.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文章の（３）に入れるのに最もよいものを選びなさい。\nみなと市では、三年前から川沿いの清掃活動が行われている。最初は数人で始まった活動だったが、口コミで広がるにつれて、今では毎月百人近くが集まるようになった。活動を続けるうちに、住民同士の交流も深まりつつある。一方で、ごみの量は以前ほど減っておらず、この問題を解決しない（３）、活動の意味が薄れてしまうという声もある。",
        "choices": [
          "うえで",
          "あげく",
          "限り",
          "ことには"
        ],
        "answer": 2,
        "explain_vi": "「〜ない限り」nghĩa là nếu không làm thì kết quả xấu sẽ kéo dài. Nếu không giải quyết vấn đề rác thì ý nghĩa hoạt động sẽ phai nhạt.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "ハーさんはアルバイト先の店長から、次のメモを受け取った。\n「来週の土曜日は、開店前に新しい商品が届きます。商品を棚に並べる作業があるので、いつもより三十分早く来てください。分からないことがあれば、遠慮せずに聞いてください。」\n\n問い：ハーさんが来週の土曜日にしなければならないことは何か。",
        "choices": [
          "新しい商品の値段を決める",
          "開店後に商品を受け取りに行く",
          "店長に電話をして休みを取る",
          "いつもより三十分早く来て、商品を棚に並べる手伝いをする"
        ],
        "answer": 3,
        "explain_vi": "Tờメモ yêu cầu đến sớm hơn thường lệ ba mươi phút vì có việc xếp hàng mới lên kệ trước giờ mở cửa.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "最近、現金を使わずに支払いをする人が増えている。確かに、財布を持たなくても買い物ができるのは便利だ。しかし、使いすぎに気づきにくいという問題もある。お金を使っているという感覚が薄れるため、計画的にお金を使う習慣が、より大切になっているのではないだろうか。\n\n問い：この文章で筆者が最も言いたいことは何か。",
        "choices": [
          "便利な支払い方法でも、お金の使い方に気をつける必要があるということ",
          "現金はもう必要ないということ",
          "財布は持ち歩くべきではないということ",
          "買い物は現金でするべきだということ"
        ],
        "answer": 0,
        "explain_vi": "Tác giả thừa nhận thanh toán không tiền mặt tiện lợi nhưng nhấn mạnh cảm giác tiêu tiền bị mờ nhạt nên càng cần thói quen tiêu tiền có kế hoạch.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "ズイさんは毎朝、家で育てている植物に水をやるのを日課にしている。初めのころは水のやりすぎで根を傷めてしまったこともあったが、土の様子を見ながら量を調整するうちに、葉の色も良くなってきた。植物の成長はゆっくりだが、毎日観察することで小さな変化にも気づけるようになったという。\n\n問い：ズイさんについて、正しいものはどれか。",
        "choices": [
          "最初から水の量を上手に調整できていた",
          "毎日の観察を通して、植物の小さな変化に気づけるようになった",
          "植物の成長が速いので驚いている",
          "水をやるのをやめてしまった"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói nhờ quan sát mỗi ngày, anh Duy đã nhận ra được cả những thay đổi nhỏ của cây, sau giai đoạn đầu tưới quá nhiều nước.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "ハーさんは三か月前から、自転車で通勤するようになった。電車が混んでいて疲れることが多かったためだ。初めは坂道がきつく感じられたが、慣れるにつれて体力がつき、朝から気分良く仕事を始められるようになった。雨の日だけは無理をせず、電車を使うようにしている。\n\n問い：ハーさんが自転車で通勤するようになった理由は何か。",
        "choices": [
          "自転車のほうが安いから",
          "会社に近いから",
          "電車が混んでいて疲れることが多かったから",
          "運動の先生に勧められたから"
        ],
        "answer": 2,
        "explain_vi": "Lý do nêu rõ trong đoạn là vì tàu điện đông đúc khiến chị Hà thường mệt mỏi, nên chị chuyển sang đi xe đạp.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "料理が苦手だった私は、休みの日に簡単な料理から作り始めた。レシピ通りに作っても失敗することがあったが、そのたびに火の強さや塩の量をメモしておいた。半年ほど続けるうちに、家族から「おいしくなった」と言われることが増え、今では料理が一つの楽しみになっている。\n\n問い：この文章の内容と合っているものはどれか。",
        "choices": [
          "筆者は最初から料理が得意だった",
          "筆者は料理をやめてしまった",
          "家族は筆者の料理を食べたがらない",
          "筆者は失敗するたびにメモを取り、少しずつ上手になった"
        ],
        "answer": 3,
        "explain_vi": "Người viết ghiメモ lại độ lửa và lượng muối mỗi lần thất bại, tiếp tục nửa năm thì dần nấu ngon hơn và được gia đình khen.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "在宅勤務が広がるにつれて、働き方の自由度は高まった。自宅で仕事をすれば、通勤時間がなくなり、家族と過ごす時間を増やすこともできる。一方で、仕事と生活の区別がつきにくくなるという声も多い。始業時間になっても気持ちの切り替えができず、逆に夜遅くまで仕事をしてしまう人も少なくない。こうした問題を解決するためには、会社まかせにするのではなく、働く人自身が一日の流れを意識して設計することが必要だろう。例えば、朝は決まった時間に着替え、仕事専用の場所を決めるだけでも、気持ちは切り替わりやすくなる。大切なのは、自由である分、自分で自分を管理する力を身につけることである。\n\n問い：在宅勤務の良い点として、文章に書かれているものはどれか。",
        "choices": [
          "通勤時間がなくなり、家族との時間を増やせること",
          "給料が上がること",
          "仕事の量が必ず減ること",
          "同僚と会わなくて済むこと"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn nêu điểm tốt của làm việc tại nhà là không mất thời gian đi lại và có thể tăng thời gian bên gia đình.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "在宅勤務が広がるにつれて、働き方の自由度は高まった。自宅で仕事をすれば、通勤時間がなくなり、家族と過ごす時間を増やすこともできる。一方で、仕事と生活の区別がつきにくくなるという声も多い。始業時間になっても気持ちの切り替えができず、逆に夜遅くまで仕事をしてしまう人も少なくない。こうした問題を解決するためには、会社まかせにするのではなく、働く人自身が一日の流れを意識して設計することが必要だろう。例えば、朝は決まった時間に着替え、仕事専用の場所を決めるだけでも、気持ちは切り替わりやすくなる。大切なのは、自由である分、自分で自分を管理する力を身につけることである。\n\n問い：在宅勤務の問題点として、文章に書かれているものはどれか。",
        "choices": [
          "自宅では静かすぎること",
          "仕事と生活の区別がつきにくく、夜遅くまで仕事をしてしまうことがあること",
          "パソコンが使えないこと",
          "家族と話す時間がなくなること"
        ],
        "answer": 1,
        "explain_vi": "Vấn đề được nêu là ranh giới công việc và đời sống khó phân biệt, có người lại làm việc đến khuya.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "在宅勤務が広がるにつれて、働き方の自由度は高まった。自宅で仕事をすれば、通勤時間がなくなり、家族と過ごす時間を増やすこともできる。一方で、仕事と生活の区別がつきにくくなるという声も多い。始業時間になっても気持ちの切り替えができず、逆に夜遅くまで仕事をしてしまう人も少なくない。こうした問題を解決するためには、会社まかせにするのではなく、働く人自身が一日の流れを意識して設計することが必要だろう。例えば、朝は決まった時間に着替え、仕事専用の場所を決めるだけでも、気持ちは切り替わりやすくなる。大切なのは、自由である分、自分で自分を管理する力を身につけることである。\n\n問い：問題を解決するために、筆者が提案していることは何か。",
        "choices": [
          "会社にすべて任せること",
          "在宅勤務を禁止すること",
          "働く人自身が一日の流れを意識して設計すること",
          "仕事の時間を会社が監視すること"
        ],
        "answer": 2,
        "explain_vi": "Tác giả đề xuất không phó mặc cho công ty mà chính người lao động phải ý thức thiết kế nhịp sinh hoạt trong ngày của mình.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "在宅勤務が広がるにつれて、働き方の自由度は高まった。自宅で仕事をすれば、通勤時間がなくなり、家族と過ごす時間を増やすこともできる。一方で、仕事と生活の区別がつきにくくなるという声も多い。始業時間になっても気持ちの切り替えができず、逆に夜遅くまで仕事をしてしまう人も少なくない。こうした問題を解決するためには、会社まかせにするのではなく、働く人自身が一日の流れを意識して設計することが必要だろう。例えば、朝は決まった時間に着替え、仕事専用の場所を決めるだけでも、気持ちは切り替わりやすくなる。大切なのは、自由である分、自分で自分を管理する力を身につけることである。\n\n問い：筆者が例として挙げている、気持ちを切り替える方法はどれか。",
        "choices": [
          "朝食を食べないこと",
          "夜遅くまで起きていること",
          "音楽を大きな音で聞くこと",
          "朝、決まった時間に着替え、仕事専用の場所を決めること"
        ],
        "answer": 3,
        "explain_vi": "Ví dụ được nêu là buổi sáng thay đồ vào giờ cố định và quyết định một chỗ riêng để làm việc, giúp dễ chuyển đổi tâm thế.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、二年前から「みんなの食堂」が月に二回開かれている。この食堂では、地域のボランティアが食事を作り、子どもからお年寄りまで、誰でも安い値段で温かいご飯を食べることができる。きっかけは、一人で食事をする高齢者が増えているという町の調査だった。食事を提供するだけでなく、世代を超えて交流する場を作りたいという思いもあった。運営を支えているのは、近所の店から提供される余った食材と、学生ボランティアの力である。食堂で働くズイさんは「食べに来る人の笑顔を見るのが一番うれしい」と話す。最近では、料理を教わりたいという若者や、自分の畑で採れた野菜を持ってくる農家も増えつつある。町は今後、開催日を増やすことも検討しているが、運営する人の負担が増えかねないため、慎重に話し合いを進めているという。\n\n問い：「みんなの食堂」が始まったきっかけは何か。",
        "choices": [
          "一人で食事をする高齢者が増えているという調査結果",
          "町の店の売り上げが落ちたこと",
          "学生が料理を習いたがったこと",
          "農家が野菜を売りたがったこと"
        ],
        "answer": 0,
        "explain_vi": "きっかけ được nêu rõ là kết quả điều tra của thị trấn cho thấy người cao tuổi ăn cơm một mình ngày càng tăng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、二年前から「みんなの食堂」が月に二回開かれている。この食堂では、地域のボランティアが食事を作り、子どもからお年寄りまで、誰でも安い値段で温かいご飯を食べることができる。きっかけは、一人で食事をする高齢者が増えているという町の調査だった。食事を提供するだけでなく、世代を超えて交流する場を作りたいという思いもあった。運営を支えているのは、近所の店から提供される余った食材と、学生ボランティアの力である。食堂で働くズイさんは「食べに来る人の笑顔を見るのが一番うれしい」と話す。最近では、料理を教わりたいという若者や、自分の畑で採れた野菜を持ってくる農家も増えつつある。町は今後、開催日を増やすことも検討しているが、運営する人の負担が増えかねないため、慎重に話し合いを進めているという。\n\n問い：食堂の運営を支えているものは何か。",
        "choices": [
          "町の大きな予算だけ",
          "近所の店から提供される余った食材と学生ボランティアの力",
          "有名な料理人の指導",
          "外国からの寄付金"
        ],
        "answer": 1,
        "explain_vi": "Việc vận hành được chống đỡ bởi nguyên liệu thừa do các cửa hàng gần đó cung cấp và sức lao động của tình nguyện viên sinh viên.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、二年前から「みんなの食堂」が月に二回開かれている。この食堂では、地域のボランティアが食事を作り、子どもからお年寄りまで、誰でも安い値段で温かいご飯を食べることができる。きっかけは、一人で食事をする高齢者が増えているという町の調査だった。食事を提供するだけでなく、世代を超えて交流する場を作りたいという思いもあった。運営を支えているのは、近所の店から提供される余った食材と、学生ボランティアの力である。食堂で働くズイさんは「食べに来る人の笑顔を見るのが一番うれしい」と話す。最近では、料理を教わりたいという若者や、自分の畑で採れた野菜を持ってくる農家も増えつつある。町は今後、開催日を増やすことも検討しているが、運営する人の負担が増えかねないため、慎重に話し合いを進めているという。\n\n問い：食堂について、最近の変化として書かれているものはどれか。",
        "choices": [
          "利用者が減っている",
          "開催日がすでに毎日になった",
          "料理を教わりたい若者や、野菜を持ってくる農家が増えつつある",
          "ボランティアがいなくなった"
        ],
        "answer": 2,
        "explain_vi": "Thay đổi gần đây là thanh niên muốn học nấu ăn và nông dân mang rau từ ruộng nhà đến ngày càng tăng.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、二年前から「みんなの食堂」が月に二回開かれている。この食堂では、地域のボランティアが食事を作り、子どもからお年寄りまで、誰でも安い値段で温かいご飯を食べることができる。きっかけは、一人で食事をする高齢者が増えているという町の調査だった。食事を提供するだけでなく、世代を超えて交流する場を作りたいという思いもあった。運営を支えているのは、近所の店から提供される余った食材と、学生ボランティアの力である。食堂で働くズイさんは「食べに来る人の笑顔を見るのが一番うれしい」と話す。最近では、料理を教わりたいという若者や、自分の畑で採れた野菜を持ってくる農家も増えつつある。町は今後、開催日を増やすことも検討しているが、運営する人の負担が増えかねないため、慎重に話し合いを進めているという。\n\n問い：町が開催日を増やすかどうか慎重に話し合っているのは、なぜか。",
        "choices": [
          "食材が足りないから",
          "場所が狭いから",
          "利用者が多すぎるから",
          "運営する人の負担が増えるおそれがあるから"
        ],
        "answer": 3,
        "explain_vi": "Thị trấn thận trọng vì nếu tăng ngày tổ chức thì gánh nặng cho người vận hành có nguy cơ tăng lên, như đoạn văn nêu với「増えかねない」.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "\n高齢者にとって、スマートフォンは家族と連絡を取るための便利な道具である。写真を送ったり、ビデオ通話で孫の顔を見たりすることで、離れて暮らす家族との距離が縮まる。また、健康に関する情報を調べたり、病院の予約をしたりすることもできるため、生活の幅が広がるという声が多い。\n\nスマートフォンは便利な反面、高齢者が使いこなすのは簡単ではない。小さな文字が読みにくかったり、間違った操作で知らないうちに料金が発生したりすることもある。また、うその情報や詐欺の被害にあう危険性も指摘されている。そのため、家族や地域が使い方を一緒に練習する機会を作り、困ったときに相談できる体制を整えることが大切だという意見がある。\n\n問い：文章Aと文章Bの両方に共通していることは何か。",
        "choices": [
          "スマートフォンが高齢者の生活に関係していることを述べている",
          "スマートフォンは高齢者に必要ないと考えている",
          "スマートフォンの値段について述べている",
          "スマートフォンの作り方について述べている"
        ],
        "answer": 0,
        "explain_vi": "Cả hai bài đều bàn về mối liên hệ của điện thoại thông minh với đời sống người cao tuổi, dù bài A nhấn mạnh tiện ích còn bài B nhấn mạnh khó khăn.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "\n高齢者にとって、スマートフォンは家族と連絡を取るための便利な道具である。写真を送ったり、ビデオ通話で孫の顔を見たりすることで、離れて暮らす家族との距離が縮まる。また、健康に関する情報を調べたり、病院の予約をしたりすることもできるため、生活の幅が広がるという声が多い。\n\nスマートフォンは便利な反面、高齢者が使いこなすのは簡単ではない。小さな文字が読みにくかったり、間違った操作で知らないうちに料金が発生したりすることもある。また、うその情報や詐欺の被害にあう危険性も指摘されている。そのため、家族や地域が使い方を一緒に練習する機会を作り、困ったときに相談できる体制を整えることが大切だという意見がある。\n\n問い：文章Bで指摘されている問題はどれか。",
        "choices": [
          "家族と連絡が取れなくなること",
          "文字が読みにくかったり、詐欺の被害にあう危険があったりすること",
          "病院の予約ができないこと",
          "写真が送れないこと"
        ],
        "answer": 1,
        "explain_vi": "Bài B chỉ ra chữ nhỏ khó đọc, thao tác nhầm phát sinh phí và nguy cơ bị lừa đảo, thông tin giả đối với người cao tuổi.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "\n高齢者にとって、スマートフォンは家族と連絡を取るための便利な道具である。写真を送ったり、ビデオ通話で孫の顔を見たりすることで、離れて暮らす家族との距離が縮まる。また、健康に関する情報を調べたり、病院の予約をしたりすることもできるため、生活の幅が広がるという声が多い。\n\nスマートフォンは便利な反面、高齢者が使いこなすのは簡単ではない。小さな文字が読みにくかったり、間違った操作で知らないうちに料金が発生したりすることもある。また、うその情報や詐欺の被害にあう危険性も指摘されている。そのため、家族や地域が使い方を一緒に練習する機会を作り、困ったときに相談できる体制を整えることが大切だという意見がある。\n\n問い：文章Aと文章Bを読んで分かることは何か。",
        "choices": [
          "スマートフォンを使えば家族の支援は要らなくなる",
          "スマートフォンは高齢者には全く役に立たない",
          "スマートフォンは便利だが、高齢者が安心して使うには周りの支援も必要だ",
          "スマートフォンの問題はすでにすべて解決している"
        ],
        "answer": 2,
        "explain_vi": "Tổng hợp hai bài: điện thoại thông minh tiện lợi cho người cao tuổi nhưng để dùng an toàn thì cần sự hỗ trợ, luyện tập cùng gia đình và địa phương.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "みなと市文化センター 11月の講座案内\n・料理教室：11月7日（土）10時〜12時、定員20名、参加費1,500円、持ち物：エプロン\n・写真教室：11月14日（土）13時〜15時、定員15名、参加費2,000円、持ち物：カメラまたはスマートフォン\n・書道教室：11月21日（土）10時〜12時、定員25名、参加費1,000円、持ち物：なし（道具は貸し出します）\n・申し込み：10月20日から電話で受け付けます。定員になり次第、締め切ります。\n・学生は参加費が半額になります（学生証が必要です）。\n\n問い：ハーさんは学生で、土曜日の午前中に参加できて、持ち物がなくても参加できる講座を探している。ハーさんに合う講座はどれか。",
        "choices": [
          "料理教室",
          "写真教室",
          "合う講座はない",
          "書道教室"
        ],
        "answer": 3,
        "explain_vi": "Lớp thư pháp diễn ra sáng thứ Bảy 10–12 giờ và ghi rõ không cần mang đồ (dụng cụ được cho mượn), phù hợp cả ba điều kiện của chị Hà.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "みなと市文化センター 11月の講座案内\n・料理教室：11月7日（土）10時〜12時、定員20名、参加費1,500円、持ち物：エプロン\n・写真教室：11月14日（土）13時〜15時、定員15名、参加費2,000円、持ち物：カメラまたはスマートフォン\n・書道教室：11月21日（土）10時〜12時、定員25名、参加費1,000円、持ち物：なし（道具は貸し出します）\n・申し込み：10月20日から電話で受け付けます。定員になり次第、締め切ります。\n・学生は参加費が半額になります（学生証が必要です）。\n\n問い：学生のズイさんが写真教室に参加する場合、参加費はいくらか。",
        "choices": [
          "1,000円",
          "1,500円",
          "2,000円",
          "500円"
        ],
        "answer": 0,
        "explain_vi": "Phí lớp nhiếp ảnh là 2,000 yên, học sinh sinh viên được giảm một nửa nên chỉ phải trả 1,000 yên, với điều kiện xuất trình thẻ sinh viên.",
        "src": "full"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の漢字の読み方として、最もよいものを選びなさい。「概要」",
        "choices": [
          "がいよう",
          "がいゆう",
          "かいよう",
          "がいりょう"
        ],
        "answer": 0,
        "explain_vi": "「概要」は「がいよう」と読みます。Nghĩa là bản tóm tắt, phần khái quát nội dung chính của một kế hoạch hay tài liệu.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の漢字の読み方として、最もよいものを選びなさい。「彼は締め切りに追われて、徹夜で資料を仕上げた。」",
        "choices": [
          "てつよ",
          "てっや",
          "てっよ",
          "てや"
        ],
        "answer": 1,
        "explain_vi": "「徹夜」は「てっや」と読みます。Nghĩa là thức trắng cả đêm để làm việc hoặc học bài.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「災害に備えて、各家庭で水や食料品を（　）しておくことが勧められている。」",
        "choices": [
          "保管",
          "保存",
          "備蓄",
          "貯蓄"
        ],
        "answer": 2,
        "explain_vi": "「備蓄（びちく）」là dự trữ sẵn lương thực, đồ dùng để dùng khi thiên tai, khẩn cấp. Các từ còn lại chỉ là cất giữ, bảo quản thông thường hoặc tiết kiệm tiền.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「新しい道路の建設計画について、住民の意見は（　）に分かれた。」",
        "choices": [
          "完全",
          "明確",
          "鮮明",
          "真っ二つ"
        ],
        "answer": 3,
        "explain_vi": "「真っ二つに分かれる」là cách nói chỉ việc chia thành hai phe đối lập hoàn toàn, không dung hòa được. Các từ còn lại không kết hợp được với「分かれる」theo nghĩa này.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉と、意味が最も近いものを選びなさい。「この問題については、彼の態度が曖昧で、結局どうしたいのか分からなかった。」",
        "choices": [
          "明確である",
          "はっきりしていない",
          "素直である",
          "丁寧である"
        ],
        "answer": 1,
        "explain_vi": "「曖昧（あいまい）」nghĩa là mơ hồ, không rõ ràng, gần nghĩa nhất với「はっきりしていない」.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の下線の言葉と、意味が最も近いものを選びなさい。「締め切りが迫っているので、休む暇もない。」",
        "choices": [
          "近づいている",
          "遅れている",
          "延びている",
          "過ぎている"
        ],
        "answer": 0,
        "explain_vi": "「迫る（せまる）」ở đây nghĩa là đến gần, sắp tới hạn, gần nghĩa nhất với「近づいている」.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "「著しい」の使い方として、最もよいものを選びなさい。",
        "choices": [
          "彼の著しい顔は、皆に好かれている。",
          "この薬は、著しい味がする。",
          "彼女は、著しい先生に日本語を教わった。",
          "この地域は、人口の減少が著しい。"
        ],
        "answer": 3,
        "explain_vi": "「著しい（いちじるしい）」chỉ mức độ thay đổi rất rõ rệt, đáng kể, nên chỉ hợp với câu về dân số giảm rõ rệt; không dùng để tả khuôn mặt, mùi vị hay con người.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文字・語彙",
        "question": "次の文の「きろく」の部分を漢字で書く場合、最もよいものを選びなさい。「会議の内容をきろくしておく。」",
        "choices": [
          "紀録",
          "記六",
          "記録",
          "気録"
        ],
        "answer": 2,
        "explain_vi": "「きろく」は「記録」と書きます, nghĩa là ghi chép lại để lưu giữ. Các cách viết còn lại không phải là từ đúng.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「悪天候のため、明日のハイキングは中止（　）なりました。」",
        "choices": [
          "せざるを得なく",
          "しがちに",
          "しかねなく",
          "するものに"
        ],
        "answer": 0,
        "explain_vi": "「〜ざるを得ない」nghĩa là không thể không làm, buộc phải làm. Thời tiết xấu nên buộc phải hủy chuyến dã ngoại.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「この川は危険だ。雨が降ると水位が上がり、氾濫（　）。」",
        "choices": [
          "するに違いありません",
          "することでしょう",
          "しかねません",
          "するに越したことはありません"
        ],
        "answer": 2,
        "explain_vi": "「〜かねない」diễn tả khả năng một việc xấu có thể xảy ra. Trời mưa thì sông có nguy cơ tràn bờ.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「インターネットの普及により、本を読む人の数は減少（　）。」",
        "choices": [
          "しがちです",
          "しつつあります",
          "したことです",
          "しぬいています"
        ],
        "answer": 1,
        "explain_vi": "「〜つつある」diễn tả một sự thay đổi đang dần dần diễn ra. Số người đọc sách đang ngày càng giảm đi.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「都市化の進展（　）、交通渋滞が深刻になってきた。」",
        "choices": [
          "をめぐって",
          "に反して",
          "に基づいて",
          "に伴って"
        ],
        "answer": 3,
        "explain_vi": "「〜に伴って」nghĩa là cùng với một sự thay đổi này thì việc khác cũng thay đổi theo. Đô thị hóa tiến triển kéo theo tắc đường ngày càng nghiêm trọng.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「新しい公園のデザイン（　）、市民の間でさまざまな意見が出されている。」",
        "choices": [
          "をめぐって",
          "を込めて",
          "を通じて",
          "を問わず"
        ],
        "answer": 0,
        "explain_vi": "「〜をめぐって」nghĩa là xoay quanh một vấn đề nào đó để bàn luận, tranh luận, xuất hiện nhiều ý kiến khác nhau.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「彼は何か言い（　）が、結局何も言わずに部屋を出て行った。」",
        "choices": [
          "ぬいた",
          "かけた",
          "がちだった",
          "げだった"
        ],
        "answer": 1,
        "explain_vi": "「〜かける」chỉ hành động mới bắt đầu, còn dở dang thì dừng lại.「言いかけた」là vừa định nói điều gì đó rồi lại thôi.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "文法",
        "question": "次の文の（　）に入れるのに最もよいものを選びなさい。「子どもの成長は早い（　）。あっという間に大きくなる。」",
        "choices": [
          "ことだ",
          "はずだ",
          "ものだ",
          "わけだ"
        ],
        "answer": 2,
        "explain_vi": "「〜ものだ」dùng để nói về một điều hiển nhiên, một chân lý mang tính cảm thán. Trẻ con lớn nhanh là điều ai cũng cảm nhận như vậy.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、昨年から町立図書館の夜間開館が始まった。仕事帰りの人々が利用しやすいように、閉館時間を午後六時から九時までに延ばしたのである。始まったばかりのころは利用者が少なかったが、口コミで評判が広がるにつれて、夜の利用者は増えつつある。特に、静かな環境で勉強したい学生や、資格の取得を目指す社会人に人気があるという。ただし、図書館は駅から少し離れているため、雨の日は利用者が減りがちだ。図書館で働くハーさんは「夜は昼間に比べて相談に来る人が少ない分、一人ひとりとゆっくり話すことができる」と語る。町では、この取り組みをきっかけに、図書館を地域の人々が交流する場にしていきたいと考えている。\n\n問い：図書館の閉館時間が延ばされたのは、なぜか。",
        "choices": [
          "昼間に本を借りる人が集中していたから",
          "建物が新しくなったから",
          "学生からの要望が多かったから",
          "仕事を終えた人が利用しやすいようにするため"
        ],
        "answer": 3,
        "explain_vi": "Đoạn văn nói rõ giờ đóng cửa được kéo dài để những người đi làm về có thể dễ dàng sử dụng thư viện.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、昨年から町立図書館の夜間開館が始まった。仕事帰りの人々が利用しやすいように、閉館時間を午後六時から九時までに延ばしたのである。始まったばかりのころは利用者が少なかったが、口コミで評判が広がるにつれて、夜の利用者は増えつつある。特に、静かな環境で勉強したい学生や、資格の取得を目指す社会人に人気があるという。ただし、図書館は駅から少し離れているため、雨の日は利用者が減りがちだ。図書館で働くハーさんは「夜は昼間に比べて相談に来る人が少ない分、一人ひとりとゆっくり話すことができる」と語る。町では、この取り組みをきっかけに、図書館を地域の人々が交流する場にしていきたいと考えている。\n\n問い：夜の図書館の利用者について、正しいものはどれか。",
        "choices": [
          "利用者は増えつつある",
          "始まったころから利用者が多かった",
          "昼間より相談に来る人が多い",
          "社会人は利用していない"
        ],
        "answer": 0,
        "explain_vi": "Đoạn văn có câu「夜の利用者は増えつつある」, tức là số người sử dụng thư viện buổi tối đang tăng dần sau khi tiếng tốt lan truyền.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "つばさ町では、昨年から町立図書館の夜間開館が始まった。仕事帰りの人々が利用しやすいように、閉館時間を午後六時から九時までに延ばしたのである。始まったばかりのころは利用者が少なかったが、口コミで評判が広がるにつれて、夜の利用者は増えつつある。特に、静かな環境で勉強したい学生や、資格の取得を目指す社会人に人気があるという。ただし、図書館は駅から少し離れているため、雨の日は利用者が減りがちだ。図書館で働くハーさんは「夜は昼間に比べて相談に来る人が少ない分、一人ひとりとゆっくり話すことができる」と語る。町では、この取り組みをきっかけに、図書館を地域の人々が交流する場にしていきたいと考えている。\n\n問い：ハーさんが言っていることは、どのようなことか。",
        "choices": [
          "夜は忙しくて大変だということ",
          "夜は来館者とゆっくり話すことができるということ",
          "夜は学生しか来ないということ",
          "夜の開館をやめたいということ"
        ],
        "answer": 1,
        "explain_vi": "ハーさん nói rằng buổi tối ít người đến tư vấn hơn ban ngày, nên có thể trò chuyện thong thả, kỹ càng với từng người một.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "みなと市で小さなパン屋を営むズイさんは、三年前から地元で採れた小麦を使うようになった。もともと輸入した小麦のほうが安く、手間もかからなかったため、切り替えるかどうか長い間迷っていた。しかし、地元の農家と話す中で、収穫の時期によって小麦の味が変わるという面白さに気づいた。考えぬいた末に、ズイさんは店の看板商品を地元の小麦で作ることに決めた。値段は少し上がったものの、味にこだわる客が増え、店は前よりもにぎわうようになった。店の前を通る人々は、焼きたてのパンの香りに誘われ、うれしげに店をのぞいている。ズイさんは「迷った時間は無駄ではなかった」と笑顔で話す。\n\n問い：ズイさんが地元の小麦を使うことに決めた一番の理由は何か。",
        "choices": [
          "輸入した小麦の値段が上がったから",
          "地元の農家に強く頼まれたから",
          "収穫の時期によって小麦の味が変わる面白さに気づいたから",
          "看板商品が売れなくなったから"
        ],
        "answer": 2,
        "explain_vi": "Lý do quyết định là sau khi trò chuyện với nông dân địa phương, ズイさん nhận ra điểm thú vị là hương vị lúa mì thay đổi theo thời vụ thu hoạch.",
        "src": "mock"
      },
      {
        "level": "N2",
        "section": "読解",
        "question": "みなと市で小さなパン屋を営むズイさんは、三年前から地元で採れた小麦を使うようになった。もともと輸入した小麦のほうが安く、手間もかからなかったため、切り替えるかどうか長い間迷っていた。しかし、地元の農家と話す中で、収穫の時期によって小麦の味が変わるという面白さに気づいた。考えぬいた末に、ズイさんは店の看板商品を地元の小麦で作ることに決めた。値段は少し上がったものの、味にこだわる客が増え、店は前よりもにぎわうようになった。店の前を通る人々は、焼きたてのパンの香りに誘われ、うれしげに店をのぞいている。ズイさんは「迷った時間は無駄ではなかった」と笑顔で話す。\n\n問い：この文章の内容と合っているものはどれか。",
        "choices": [
          "ズイさんは最初から地元の小麦を使っていた",
          "値段が下がったので客が増えた",
          "迷った時間は無駄だったとズイさんは後悔している",
          "地元の小麦に切り替えた後、味にこだわる客が増えた"
        ],
        "answer": 3,
        "explain_vi": "Sau khi chuyển sang lúa mì địa phương, giá bán tuy tăng lên nhưng khách hàng chú trọng hương vị tăng lên và quán đông khách hơn trước, đúng như nội dung đoạn văn.",
        "src": "mock"
      }
    ]
  };

  window.EXAM_N1 = {
    source: 'content-features/practice/full/2026-10-31-n1.json + content-features/weekly-mock-week1-n1.json',
    questions: [
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼は拙い言葉ながらも、必死に自分の思いを伝えようとした。「拙い」の読み方として正しいものはどれか。",
        "choices": [
          "つたない",
          "せつない",
          "つまらない",
          "まずしい"
        ],
        "answer": 0,
        "explain_vi": "「拙い」は「つたない」と読み、nghĩa là vụng về, kém cỏi. Các cách đọc còn lại không phải của từ này.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "恣意的な判断で処分が決まるのは、公平の原則に反する。「恣意的」の読み方として正しいものはどれか。",
        "choices": [
          "しいせき",
          "しいてき",
          "ししき",
          "しいたい"
        ],
        "answer": 1,
        "explain_vi": "「恣意的」は「しいてき」と読み、nghĩa là tùy tiện, theo ý riêng, không có căn cứ khách quan.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "その改革案は、将来に大きな可能性を孕んでいる。「孕んで」の読み方として正しいものはどれか。",
        "choices": [
          "ふくんで",
          "つつんで",
          "はらんで",
          "やどして"
        ],
        "answer": 2,
        "explain_vi": "「孕む」は「はらむ」と読み、ngoài nghĩa mang thai còn có nghĩa bóng là ẩn chứa, tiềm ẩn khả năng hay nguy cơ.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "台風で地域の文化財が毀損されたことが分かった。「毀損」の読み方として正しいものはどれか。",
        "choices": [
          "かいそん",
          "きえん",
          "かいえん",
          "きそん"
        ],
        "answer": 3,
        "explain_vi": "「毀損」は「きそん」と読み、nghĩa là làm hư hại, phá hoại tài sản hoặc danh dự.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "長年の慣習は惰性で続いているにすぎない。「惰性」の読み方として正しいものはどれか。",
        "choices": [
          "だせい",
          "たせい",
          "だしょう",
          "らせい"
        ],
        "answer": 0,
        "explain_vi": "「惰性」は「だせい」と読み、nghĩa là quán tính, sức ỳ duy trì trạng thái cũ.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "忌憚のない意見を率直に述べてほしい。「忌憚」の読み方として正しいものはどれか。",
        "choices": [
          "きだん",
          "きたん",
          "いだん",
          "きたく"
        ],
        "answer": 1,
        "explain_vi": "「忌憚」は「きたん」と読み、nghĩa là kiêng dè, e ngại; 「忌憚のない意見」 là ý kiến thẳng thắn không kiêng dè.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "度重なる交渉の末、両者はようやく（　　）に至った。",
        "choices": [
          "対立",
          "決裂",
          "妥結",
          "紛糾"
        ],
        "answer": 2,
        "explain_vi": "「妥結に至る」 là đi đến thỏa thuận, dàn xếp xong sau nhiều lần thương lượng. Các từ còn lại đều mang nghĩa mâu thuẫn hoặc đổ vỡ.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼の発言は場の空気を一変させるほど（　　）なものだった。",
        "choices": [
          "円滑",
          "穏当",
          "曖昧",
          "辛辣"
        ],
        "answer": 3,
        "explain_vi": "Phát ngôn làm thay đổi hẳn bầu không khí thì phải là phát ngôn cay nghiệt, sắc bén: 「辛辣」. Các từ còn lại chỉ sự suôn sẻ, ôn hòa hoặc mơ hồ.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "新制度の導入に伴い、現場では少なからぬ（　　）が生じている。",
        "choices": [
          "混乱",
          "調和",
          "進展",
          "安定"
        ],
        "answer": 0,
        "explain_vi": "Khi áp dụng chế độ mới, tại hiện trường phát sinh không ít sự hỗn loạn: 「混乱が生じる」 là cụm tự nhiên. Các từ còn lại mang nghĩa tích cực, không hợp với 「少なからぬ」 trong ngữ cảnh này.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼女は困難な状況にあっても、決して希望を（　　）ことはなかった。",
        "choices": [
          "見出す",
          "見失う",
          "見送る",
          "見込む"
        ],
        "answer": 1,
        "explain_vi": "「希望を見失う」 là đánh mất hy vọng; câu phủ định 「決して〜ことはなかった」 cho thấy cô ấy chưa bao giờ mất hy vọng. Các động từ còn lại không kết hợp được với 「希望」 theo nghĩa này.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "その証言はあまりに（　　）で、到底信用できるものではなかった。",
        "choices": [
          "詳細",
          "具体的",
          "荒唐無稽",
          "明快"
        ],
        "answer": 2,
        "explain_vi": "Lời khai quá hoang đường, vô căn cứ nên không thể tin được: 「荒唐無稽」 là hoang đường, bịa đặt không có cơ sở. Các từ còn lại đều mang nghĩa rõ ràng, cụ thể.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "長年の研究が実を結び、彼の業績は高く（　　）されている。",
        "choices": [
          "疑問視",
          "軽視",
          "批判",
          "評価"
        ],
        "answer": 3,
        "explain_vi": "Nghiên cứu lâu năm đơm hoa kết trái thì thành quả được đánh giá cao: 「高く評価される」. Các lựa chọn còn lại mang nghĩa tiêu cực, trái với mạch câu.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "財政難のため、市は新規事業の実施を（　　）せざるを得なかった。",
        "choices": [
          "見合わせる",
          "推し進める",
          "拡大する",
          "前倒しする"
        ],
        "answer": 0,
        "explain_vi": "Vì khó khăn tài chính, thành phố buộc phải tạm hoãn việc triển khai dự án mới: 「見合わせる」 là tạm dừng, hoãn lại để xem xét. Các từ còn lại chỉ việc thúc đẩy hoặc mở rộng.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼の態度は目上の人に対してあまりにも（　　）で、周囲をあきれさせた。",
        "choices": [
          "丁重",
          "無礼",
          "謙虚",
          "慎重"
        ],
        "answer": 1,
        "explain_vi": "Thái độ quá vô lễ với bề trên khiến mọi người ngán ngẩm: 「無礼」. Các từ còn lại chỉ sự lễ phép, khiêm tốn hoặc thận trọng, không phù hợp.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "委員会は彼の提案を一蹴した。「一蹴した」と最も近い意味のものはどれか。",
        "choices": [
          "慎重に検討した",
          "一部を受け入れた",
          "即座に退けた",
          "次回に持ち越した"
        ],
        "answer": 2,
        "explain_vi": "「一蹴する」 là bác bỏ ngay lập tức, gạt phăng không cần bàn thêm. Các lựa chọn còn lại đều chỉ sự cân nhắc hoặc trì hoãn.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼女は陰で同僚の悪口を言いふらしている。「言いふらす」と最も近い意味のものはどれか。",
        "choices": [
          "大声で叫ぶ",
          "一人でつぶやく",
          "秘密にしておく",
          "あちこちに広める"
        ],
        "answer": 3,
        "explain_vi": "「言いふらす」 là rêu rao, tung tin khắp nơi. Ở đây là đi nói xấu đồng nghiệp sau lưng cho nhiều người nghe.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "その問題は根が深く、一筋縄ではいかない。「一筋縄ではいかない」と最も近い意味のものはどれか。",
        "choices": [
          "簡単には対処できない",
          "すぐに解決できる",
          "誰にも関係がない",
          "一度も起こったことがない"
        ],
        "answer": 0,
        "explain_vi": "「一筋縄ではいかない」 là thành ngữ chỉ việc không thể xử lý bằng cách thông thường, rất khó nhằn, phức tạp.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼は目上の人の前でも物おじしない性格だ。「物おじしない」と最も近い意味のものはどれか。",
        "choices": [
          "緊張して黙り込む",
          "臆することなく堂々としている",
          "相手に失礼な態度を取る",
          "人の話を聞こうとしない"
        ],
        "answer": 1,
        "explain_vi": "「物おじしない」 là không rụt rè, sợ sệt; đường hoàng, tự nhiên ngay cả trước mặt bề trên.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼女の説明は的を射ていた。「的を射ていた」と最も近い意味のものはどれか。",
        "choices": [
          "長くて分かりにくかった",
          "要点から外れていた",
          "核心を正確に捉えていた",
          "感情的で冷静さを欠いていた"
        ],
        "answer": 2,
        "explain_vi": "「的を射る」 là bắn trúng đích, nghĩa bóng là nắm đúng trọng tâm, cốt lõi của vấn đề.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「ぶしつけ」の使い方として正しいものはどれか。",
        "choices": [
          "彼はぶしつけに部屋をきれいに掃除した。",
          "会議ではぶしつけな資料が配られた。",
          "窓の外はぶしつけな景色が広がっていた。",
          "初対面にもかかわらず、彼はぶしつけな質問を次々と浴びせた。"
        ],
        "answer": 3,
        "explain_vi": "「ぶしつけ」 chỉ lời nói, thái độ thiếu lễ phép, đường đột. Chỉ câu về việc dồn dập hỏi những câu khiếm nhã ngay lần đầu gặp mới dùng đúng.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「心もとない」の使い方として正しいものはどれか。",
        "choices": [
          "初めての海外出張で、言葉が通じるかどうか心もとない。",
          "彼の説明は心もとないほど詳しく、皆が納得した。",
          "彼女は心もとない笑顔で優勝を喜んだ。",
          "予算は心もとないほど十分に用意されている。"
        ],
        "answer": 0,
        "explain_vi": "「心もとない」 là bồn chồn, không yên tâm, thiếu tin cậy. Câu về chuyến công tác nước ngoài đầu tiên, lo không giao tiếp được là dùng đúng; các câu còn lại dùng với nghĩa tích cực nên sai.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「あざとい」の使い方として正しいものはどれか。",
        "choices": [
          "彼のあざとい料理の腕前に、皆が感心した。",
          "彼女のあざとい言動は、計算高くて嫌味だと受け取られた。",
          "今日の空はあざといほど青く澄んでいた。",
          "彼はあざとい態度で目上の人に丁寧に挨拶した。"
        ],
        "answer": 1,
        "explain_vi": "「あざとい」 chỉ sự khôn lỏi, tính toán vụ lợi một cách lộ liễu gây khó chịu. Chỉ câu về lời nói hành động bị cho là tính toán, giả tạo mới đúng sắc thái.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「おこがましい」の使い方として正しいものはどれか。",
        "choices": [
          "おこがましい雨のせいで、楽しみにしていた遠足は中止になった。",
          "おこがましい天気のおかげで、遠足は中止になった。",
          "私のような未熟者が意見を述べるのは、おこがましいことかもしれません。",
          "彼女のおこがましい歌声に、観客は聞き入った。"
        ],
        "answer": 2,
        "explain_vi": "「おこがましい」 là trơ tráo, không biết thân phận mà làm điều quá phận; cũng dùng khiêm tốn khi tự nhận việc mình nói là quá phận. Câu thứ ba dùng theo cách khiêm tốn này là chuẩn; các câu còn lại gán từ này cho thời tiết, giọng hát thì hoàn toàn sai.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「いたたまれない」の使い方として正しいものはどれか。",
        "choices": [
          "合格の知らせを聞いて、いたたまれないほど嬉しかった。",
          "彼はいたたまれない速さでゴールに飛び込んだ。",
          "部屋の中はいたたまれないほどきれいに片付いていた。",
          "大勢の前で失敗し、その場にいたたまれない気持ちになった。"
        ],
        "answer": 3,
        "explain_vi": "「いたたまれない」 là không thể chịu đựng nổi mà muốn rời khỏi chỗ đó ngay, thường vì xấu hổ, khó xử. Chỉ câu thất bại trước đám đông mới đúng.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「そつがない」の使い方として正しいものはどれか。",
        "choices": [
          "彼女は来客への対応がそつがなく、上司から信頼されている。",
          "彼のそつがない失敗が、チームの敗北を招いた。",
          "今日はそつがない天気で、洗濯物がよく乾いた。",
          "そのそつがない料理は、誰の口にも合わなかった。"
        ],
        "answer": 0,
        "explain_vi": "「そつがない」 là chu toàn, không sơ sót, khéo léo trong ứng xử. Câu về cách tiếp khách không có điểm chê được là dùng đúng.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「わざとらしい」の使い方として正しいものはどれか。",
        "choices": [
          "彼のわざとらしい努力が実を結び、合格を果たした。",
          "彼女はわざとらしく咳払いをして、皆の注意を引いた。",
          "職人のわざとらしい技が、観客を魅了した。",
          "わざとらしい自然に囲まれた村は、観光地として人気だ。"
        ],
        "answer": 1,
        "explain_vi": "「わざとらしい」 là cố tình, lộ liễu một cách giả tạo. Hành động ho hắng cố ý để gây chú ý là dùng đúng; các câu còn lại nhầm với nghĩa khéo léo hoặc tự nhiên.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は優勝の知らせを聞く（　　）、喜びのあまり飛び上がった。",
        "choices": [
          "かたわら",
          "そばから",
          "や否や",
          "そば"
        ],
        "answer": 2,
        "explain_vi": "「〜や否や」 là vừa mới... thì ngay lập tức..., nối hai hành động xảy ra gần như đồng thời: vừa nghe tin vô địch thì nhảy cẫng lên vì mừng. Các lựa chọn còn lại không tạo thành mẫu này.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "ベテランの職人（　　）、この細かい作業には随分苦労したらしい。",
        "choices": [
          "かたわら",
          "ながらに",
          "にしては",
          "とはいえ"
        ],
        "answer": 3,
        "explain_vi": "「〜とはいえ」 là dù nói là... nhưng vẫn..., mang tính nhượng bộ: dù là thợ kỳ cựu, công việc tinh xảo này dường như cũng khiến ông ấy rất vất vả. Các lựa chọn còn lại không hợp nghĩa.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "今回の受賞は、これまでのどの賞（　　）嬉しく、努力が報われた思いがする。",
        "choices": [
          "にもまして",
          "にもましては",
          "にもまさず",
          "にもましての"
        ],
        "answer": 0,
        "explain_vi": "「〜にもまして」 là hơn cả..., dùng khi mức độ vượt qua thứ được so sánh trước đó: giải thưởng lần này vui hơn bất kỳ giải nào trước đây.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は誰よりも努力した（　　）、最後まで諦めずに走り抜くことができたのだ。",
        "choices": [
          "からには",
          "からこそ",
          "からして",
          "からといって"
        ],
        "answer": 1,
        "explain_vi": "「〜からこそ」 nhấn mạnh lý do tích cực: chính vì đã nỗ lực hơn bất kỳ ai nên anh ấy mới có thể chạy đến cùng mà không bỏ cuộc. Các mẫu còn lại chỉ điều kiện hoặc suy đoán, không hợp.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は優勝す（　　）優勝したと言えるほど、万全の準備と圧倒的な実力を備えていた。",
        "choices": [
          "べく",
          "べきして",
          "べくして",
          "べくん"
        ],
        "answer": 2,
        "explain_vi": "「〜べくして〜する」 là việc xảy ra như một kết quả tất yếu đã được định sẵn, không phải ngẫu nhiên: vô địch như một điều hiển nhiên phải đến.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "生徒の手本となるべき教師が、そのような行為に及ぶとは、教師としてある（　　）ことだ。",
        "choices": [
          "べく",
          "べき",
          "んがため",
          "まじき"
        ],
        "answer": 3,
        "explain_vi": "「あるまじき」 là mẫu văn viết cổ trang trọng, nghĩa là tuyệt đối không được phép có ở một người giữ vị trí, vai trò nào đó: hành vi không thể chấp nhận được ở một giáo viên.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は何日も眠っておらず、今にも倒れ（　　）ほど疲れ切っていた。",
        "choices": [
          "んばかり",
          "んがため",
          "べく",
          "ずくめ"
        ],
        "answer": 0,
        "explain_vi": "「〜んばかり」 diễn tả trạng thái như sắp xảy ra đến nơi: mệt đến mức như sắp ngã quỵ. Các mẫu còn lại chỉ mục đích hoặc toàn bộ, không hợp.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼女の部屋は白（　　）で統一され、清々しい印象を与えた。",
        "choices": [
          "だらけ",
          "ずくめ",
          "まみれ",
          "がち"
        ],
        "answer": 1,
        "explain_vi": "「〜ずくめ」 chỉ trạng thái toàn một màu, một loại: căn phòng toàn màu trắng. 「だらけ」 và 「まみれ」 dùng cho thứ bẩn, xấu; 「がち」 chỉ xu hướng hay xảy ra.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "需要の急激な落ち込みにより、その工場は閉鎖を（　　）。",
        "choices": [
          "やむなくされた",
          "余儀なくされず",
          "余儀なくされた",
          "余儀なくさせた"
        ],
        "answer": 2,
        "explain_vi": "「〜を余儀なくされる」 là bị hoàn cảnh bắt buộc phải làm gì: nhà máy bị buộc phải đóng cửa vì nhu cầu sụt giảm mạnh.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "その光景は、見る（　　）背筋が凍るほど恐ろしいものだった。",
        "choices": [
          "すら",
          "こそ",
          "まで",
          "だに"
        ],
        "answer": 3,
        "explain_vi": "「〜だに」 đi với động từ cảm nhận, suy tưởng để nhấn mạnh chỉ... thôi cũng đã: chỉ nhìn thôi cũng đủ rùng mình. Các trợ từ còn lại không tạo sắc thái này.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は重ねている。★に入る部分として最も適当なものはどれか。",
        "choices": [
          "取り入れるべく",
          "業務に",
          "新しい技術を",
          "日々研究を"
        ],
        "answer": 0,
        "explain_vi": "Câu hoàn chỉnh: 「彼は新しい技術を業務に取り入れるべく、日々研究を重ねている」 (để đưa kỹ thuật mới vào công việc, mỗi ngày anh ấy đều miệt mài nghiên cứu). Mảnh ở vị trí ★ là 「取り入れるべく」.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼女は励んでいる。★に入る部分として最も適当なものはどれか。",
        "choices": [
          "将来",
          "海外で働くことを",
          "夢見て",
          "語学の勉強に"
        ],
        "answer": 1,
        "explain_vi": "Câu hoàn chỉnh: 「彼女は将来、海外で働くことを夢見て、語学の勉強に励んでいる」 (mơ ước sau này làm việc ở nước ngoài nên cô ấy chăm chỉ học ngoại ngữ). Mảnh ở ★ là 「海外で働くことを」.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "この計画は進めていく必要がある。★に入る部分として最も適当なものはどれか。",
        "choices": [
          "専門家の意見を",
          "取り入れつつ",
          "地域住民の理解を",
          "得ながら"
        ],
        "answer": 2,
        "explain_vi": "Câu hoàn chỉnh: 「専門家の意見を取り入れつつ、地域住民の理解を得ながら進めていく」 (vừa tiếp thu ý kiến chuyên gia, vừa tranh thủ sự đồng thuận của cư dân). Mảnh ở ★ là 「地域住民の理解を」, tân ngữ của 「得ながら」.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は成長してきた。★に入る部分として最も適当なものはどれか。",
        "choices": [
          "失敗を",
          "恐れることなく",
          "むしろそれを",
          "糧として"
        ],
        "answer": 3,
        "explain_vi": "Câu hoàn chỉnh: 「彼は失敗を恐れることなく、むしろそれを糧として成長してきた」 (không sợ thất bại, trái lại lấy nó làm chất dinh dưỡng để trưởng thành). Mảnh ở ★ là 「糧として」.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼女はという。★に入る部分として最も適当なものはどれか。",
        "choices": [
          "必ず",
          "忙しい日々の中でも",
          "読書の時間を",
          "欠かさなかった"
        ],
        "answer": 0,
        "explain_vi": "Câu hoàn chỉnh: 「忙しい日々の中でも、必ず読書の時間を欠かさなかった」 (dù bận rộn vẫn không bao giờ bỏ thời gian đọc sách). Mảnh ở ★ là trạng từ 「必ず」, đứng trước cụm 「読書の時間を欠かさなかった」.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "人口減少が進む地方都市では、公共交通の維持が深刻な課題となっている。利用者の減少に伴い、バス路線の廃止が相次ぎ、車を運転できない高齢者の日常生活に支障が出始めている。（1）、公共交通は単なる移動手段ではない。人々が集い、街ににぎわいを生む基盤でもあるのだ。（2）、自治体が財政負担を増やしてまで路線を維持することには、慎重な意見も少なくない。限られた予算をどこに振り向けるかは、住民全体で考えるべき問題だからである。（3）現状を打開するには、従来の発想にとらわれない取り組みが求められる。例えば、予約に応じて運行する乗り合いタクシーは、利用の少ない地域でも効率的な運行を可能にする。（4）成功している地域に共通するのは、行政任せにせず、住民自らが運行に関わっている点である。交通を「与えられるもの」から「共に育てるもの」へと捉え直すことが、（5）。\n\n（1）に入るものとして最も適当なものはどれか。",
        "choices": [
          "そもそも",
          "しかしながら",
          "それゆえ",
          "ところで"
        ],
        "answer": 1,
        "explain_vi": "Sau khi nêu thực trạng tiêu cực, tác giả chuyển hướng khẳng định giao thông công cộng không chỉ là phương tiện di chuyển, nên cần từ nối nhượng bộ, đối lập 「しかしながら」.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "人口減少が進む地方都市では、公共交通の維持が深刻な課題となっている。利用者の減少に伴い、バス路線の廃止が相次ぎ、車を運転できない高齢者の日常生活に支障が出始めている。（1）、公共交通は単なる移動手段ではない。人々が集い、街ににぎわいを生む基盤でもあるのだ。（2）、自治体が財政負担を増やしてまで路線を維持することには、慎重な意見も少なくない。限られた予算をどこに振り向けるかは、住民全体で考えるべき問題だからである。（3）現状を打開するには、従来の発想にとらわれない取り組みが求められる。例えば、予約に応じて運行する乗り合いタクシーは、利用の少ない地域でも効率的な運行を可能にする。（4）成功している地域に共通するのは、行政任せにせず、住民自らが運行に関わっている点である。交通を「与えられるもの」から「共に育てるもの」へと捉え直すことが、（5）。\n\n（2）に入るものとして最も適当なものはどれか。",
        "choices": [
          "そのため",
          "なお",
          "一方で",
          "つまり"
        ],
        "answer": 2,
        "explain_vi": "Đoạn trước khẳng định vai trò của giao thông công cộng, đoạn này đưa ra mặt đối lập là ý kiến thận trọng về gánh nặng tài chính, nên dùng 「一方で」 (mặt khác).",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "人口減少が進む地方都市では、公共交通の維持が深刻な課題となっている。利用者の減少に伴い、バス路線の廃止が相次ぎ、車を運転できない高齢者の日常生活に支障が出始めている。（1）、公共交通は単なる移動手段ではない。人々が集い、街ににぎわいを生む基盤でもあるのだ。（2）、自治体が財政負担を増やしてまで路線を維持することには、慎重な意見も少なくない。限られた予算をどこに振り向けるかは、住民全体で考えるべき問題だからである。（3）現状を打開するには、従来の発想にとらわれない取り組みが求められる。例えば、予約に応じて運行する乗り合いタクシーは、利用の少ない地域でも効率的な運行を可能にする。（4）成功している地域に共通するのは、行政任せにせず、住民自らが運行に関わっている点である。交通を「与えられるもの」から「共に育てるもの」へと捉え直すことが、（5）。\n\n（3）に入るものとして最も適当なものはどれか。",
        "choices": [
          "あの",
          "そのような",
          "これらの",
          "こうした"
        ],
        "answer": 3,
        "explain_vi": "Cần một từ chỉ định tóm gọn toàn bộ tình hình vừa nêu ở hai đoạn trước: 「こうした現状」 (thực trạng như vậy). Các từ còn lại không dùng để quy chiếu cả một tình huống trừu tượng như thế này.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "人口減少が進む地方都市では、公共交通の維持が深刻な課題となっている。利用者の減少に伴い、バス路線の廃止が相次ぎ、車を運転できない高齢者の日常生活に支障が出始めている。（1）、公共交通は単なる移動手段ではない。人々が集い、街ににぎわいを生む基盤でもあるのだ。（2）、自治体が財政負担を増やしてまで路線を維持することには、慎重な意見も少なくない。限られた予算をどこに振り向けるかは、住民全体で考えるべき問題だからである。（3）現状を打開するには、従来の発想にとらわれない取り組みが求められる。例えば、予約に応じて運行する乗り合いタクシーは、利用の少ない地域でも効率的な運行を可能にする。（4）成功している地域に共通するのは、行政任せにせず、住民自らが運行に関わっている点である。交通を「与えられるもの」から「共に育てるもの」へと捉え直すことが、（5）。\n\n（4）に入るものとして最も適当なものはどれか。",
        "choices": [
          "実際に",
          "ところが",
          "したがって",
          "さもなければ"
        ],
        "answer": 0,
        "explain_vi": "Chỗ trống mở đầu câu nêu một thực tế minh chứng cho lập luận trước đó, nên dùng 「実際に」 (trên thực tế). Các từ nối còn lại mang nghĩa đối lập, hệ quả hoặc giả định, không phù hợp.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "人口減少が進む地方都市では、公共交通の維持が深刻な課題となっている。利用者の減少に伴い、バス路線の廃止が相次ぎ、車を運転できない高齢者の日常生活に支障が出始めている。（1）、公共交通は単なる移動手段ではない。人々が集い、街ににぎわいを生む基盤でもあるのだ。（2）、自治体が財政負担を増やしてまで路線を維持することには、慎重な意見も少なくない。限られた予算をどこに振り向けるかは、住民全体で考えるべき問題だからである。（3）現状を打開するには、従来の発想にとらわれない取り組みが求められる。例えば、予約に応じて運行する乗り合いタクシーは、利用の少ない地域でも効率的な運行を可能にする。（4）成功している地域に共通するのは、行政任せにせず、住民自らが運行に関わっている点である。交通を「与えられるもの」から「共に育てるもの」へと捉え直すことが、（5）。\n\n（5）に入るものとして最も適当なものはどれか。",
        "choices": [
          "望ましくない",
          "不可欠である",
          "避けられないことではない",
          "余儀ない"
        ],
        "answer": 1,
        "explain_vi": "Câu kết luận khẳng định việc thay đổi cách nhìn về giao thông là điều không thể thiếu: 「〜ことが不可欠である」. Các lựa chọn còn lại phủ định hoặc sai ngữ pháp.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "挨拶とは、情報を伝えるための行為だと思われがちである。だが、「おはよう」「こんにちは」といった言葉自体に、新しい情報はほとんど含まれていない。挨拶の本当の役割は、相手の存在を認め、自分との関係が今日も変わらず続いていることを確認し合う点にある。だからこそ、人は挨拶を交わすことで安心し、挨拶を欠かされると、内容以前に、自分が軽んじられたように感じるのである。\n\n筆者によると、挨拶の役割とは何か。",
        "choices": [
          "新しい情報を相手に正確に伝えること",
          "その日の用件を手短に済ませること",
          "相手との関係が続いていることを確認し合い、安心感を共有すること",
          "目上の人への敬意を言葉で示すこと"
        ],
        "answer": 2,
        "explain_vi": "Bài viết nói vai trò thật sự của lời chào là công nhận sự tồn tại của đối phương và xác nhận mối quan hệ vẫn tiếp tục như mọi ngày, từ đó tạo cảm giác yên tâm, chứ không phải truyền đạt thông tin mới.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "睡眠は、単に体を休めるための時間ではない。人が眠っている間、脳はその日に経験した出来事や学んだ事柄を整理し、必要な情報を記憶として定着させる働きをしている。徹夜で詰め込んだ知識が長続きしないのは、この整理の過程を経ていないからである。学習の効果を高めたいのであれば、勉強量を増やすことにもまして、十分な睡眠を確保することが重要だと言える。\n\n徹夜で詰め込んだ知識が長続きしないのはなぜか。",
        "choices": [
          "勉強量が絶対的に不足しているから",
          "脳が疲れていて新しい情報を受け付けないから",
          "睡眠中に体を休める時間が取れていないから",
          "眠っている間に脳が行う情報の整理と定着の過程を経ていないから"
        ],
        "answer": 3,
        "explain_vi": "Theo bài, khi ngủ não sắp xếp thông tin và cố định thành trí nhớ; học thâu đêm không trải qua quá trình này nên kiến thức không bền.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "技術の世界では、成功の記録ばかりが称賛され、失敗は隠されがちである。しかし、失敗の記録こそ、後進にとっては貴重な財産になり得る。どこで、なぜ行き詰まったのかが分かれば、同じ過ちを繰り返さずに済むからだ。失敗を隠す文化が根付いた組織では、かえって大きな事故が起こりやすくなる。失敗を正直に記録し、共有することこそ、技術を発展させる土台である。\n\nこの文章で筆者が最も言いたいことは何か。",
        "choices": [
          "失敗の記録を正直に残して共有することが、技術を発展させる土台になる",
          "成功の記録を称賛する文化を改める必要はない",
          "失敗は個人の責任として厳しく追及すべきである",
          "事故を防ぐには、失敗を組織の外に公表すべきである"
        ],
        "answer": 0,
        "explain_vi": "Thông điệp chính: ghi chép và chia sẻ thất bại một cách trung thực chính là nền tảng để kỹ thuật phát triển và tránh lặp lại sai lầm. Các lựa chọn còn lại trái hoặc lệch ý bài.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "伝統工芸が生き残るためには、昔ながらの姿をそのまま守るだけでは不十分である。生活様式が変われば、求められる品物の形や用途も変わる。かえで市の陶芸家たちは、伝統の技法を受け継ぎながらも、現代の食卓に合う器づくりに挑み、若い世代の支持を得ることに成功した。伝統とは、止まった姿ではなく、時代に合わせて姿を変えながら受け継がれていくものなのである。\n\n伝統について、筆者の考えに最も近いものはどれか。",
        "choices": [
          "伝統は昔の姿を一寸たりとも変えてはならない",
          "伝統は時代に合わせて姿を変えながら受け継がれていくものだ",
          "伝統工芸は若い世代の支持なしには価値がない",
          "伝統の技法は現代の生活にはもう役立たない"
        ],
        "answer": 1,
        "explain_vi": "Câu kết luận nêu rõ: truyền thống không phải là hình dáng đứng yên, mà là thứ được kế thừa trong khi thay đổi hình thức cho phù hợp với thời đại.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "日本では、まだ食べられるにもかかわらず捨てられてしまう食品、いわゆる食品ロスが大きな問題となっている。その量は年間数百万トンに上るとされ、家庭から出るものと事業者から出るものがほぼ半々を占める。対策として、賞味期限の表示方法の見直しや、売れ残りを割引販売する仕組みなどが進められているが、筆者は、それだけでは不十分だと考える。食品ロスが生まれる背景には、「新鮮なものほど良い」という消費者の強い意識があるからだ。少しでも期限の近い商品を避け、棚の奥から新しいものを取る行動が、店側に過剰な仕入れを促し、結果として廃棄を増やしてきた。つまり、食品ロスは生産や流通だけの問題ではなく、私たち一人一人の選択の積み重ねでもある。期限の近い商品から買う、食べきれる量だけを注文するといった小さな行動の変化が、社会全体の仕組みを変える力を持っているのではないだろうか。\n\n食品ロスについて、本文の内容に合うものはどれか。",
        "choices": [
          "食品ロスのほとんどは家庭から出るものである",
          "食品ロスの量は年間数万トン程度である",
          "家庭から出るものと事業者から出るものがほぼ半々を占める",
          "食品ロスは近年急速に減りつつある"
        ],
        "answer": 2,
        "explain_vi": "Bài viết ghi rõ lãng phí thực phẩm lên tới hàng triệu tấn mỗi năm, trong đó phần từ hộ gia đình và phần từ doanh nghiệp chiếm gần như một nửa mỗi loại.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "日本では、まだ食べられるにもかかわらず捨てられてしまう食品、いわゆる食品ロスが大きな問題となっている。その量は年間数百万トンに上るとされ、家庭から出るものと事業者から出るものがほぼ半々を占める。対策として、賞味期限の表示方法の見直しや、売れ残りを割引販売する仕組みなどが進められているが、筆者は、それだけでは不十分だと考える。食品ロスが生まれる背景には、「新鮮なものほど良い」という消費者の強い意識があるからだ。少しでも期限の近い商品を避け、棚の奥から新しいものを取る行動が、店側に過剰な仕入れを促し、結果として廃棄を増やしてきた。つまり、食品ロスは生産や流通だけの問題ではなく、私たち一人一人の選択の積み重ねでもある。期限の近い商品から買う、食べきれる量だけを注文するといった小さな行動の変化が、社会全体の仕組みを変える力を持っているのではないだろうか。\n\n筆者は、制度面の対策だけでは不十分だと考えている。その理由は何か。",
        "choices": [
          "賞味期限の表示方法がまだ統一されていないから",
          "割引販売の仕組みが消費者に知られていないから",
          "店側が過剰な仕入れをやめようとしないから",
          "食品ロスの背景に「新鮮なものほど良い」という消費者の意識があるから"
        ],
        "answer": 3,
        "explain_vi": "Tác giả cho rằng phía sau lãng phí thực phẩm là ý thức chuộng đồ tươi mới của người tiêu dùng; hành vi né hàng gần hết hạn khiến cửa hàng nhập thừa, nên chỉ sửa chế độ thôi là chưa đủ.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "日本では、まだ食べられるにもかかわらず捨てられてしまう食品、いわゆる食品ロスが大きな問題となっている。その量は年間数百万トンに上るとされ、家庭から出るものと事業者から出るものがほぼ半々を占める。対策として、賞味期限の表示方法の見直しや、売れ残りを割引販売する仕組みなどが進められているが、筆者は、それだけでは不十分だと考える。食品ロスが生まれる背景には、「新鮮なものほど良い」という消費者の強い意識があるからだ。少しでも期限の近い商品を避け、棚の奥から新しいものを取る行動が、店側に過剰な仕入れを促し、結果として廃棄を増やしてきた。つまり、食品ロスは生産や流通だけの問題ではなく、私たち一人一人の選択の積み重ねでもある。期限の近い商品から買う、食べきれる量だけを注文するといった小さな行動の変化が、社会全体の仕組みを変える力を持っているのではないだろうか。\n\nこの文章で筆者が最も言いたいことは何か。",
        "choices": [
          "消費者一人一人の小さな行動の変化が、食品ロスを減らす力になる",
          "食品ロスは店側の過剰な仕入れだけが原因である",
          "賞味期限の表示方法を見直せば、食品ロスはなくなる",
          "新鮮なものを求める消費者の意識は間違っている"
        ],
        "answer": 0,
        "explain_vi": "Kết luận của bài: lãng phí thực phẩm là tích lũy của lựa chọn của mỗi người, và những thay đổi nhỏ như mua hàng gần hết hạn trước có sức mạnh thay đổi cả hệ thống.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "ひかり町では、町内での買い物やボランティア活動に使える地域通貨「ひかり」が導入された。円とは異なり、この通貨は町外では使えず、有効期限も定められている。導入の狙いは、町の中でお金が循環する仕組みを作ることにある。大手の通販で買い物をすれば、そのお金は町の外へ流出してしまうが、地域通貨を使えば、商店も住民も互いに支え合う関係が強まるというわけである。もっとも、課題も少なくない。使える店が限られていることや、高齢者にとって仕組みが分かりにくいことなどが指摘されている。それでも筆者は、この試みに意義があると考える。地域通貨の価値は、経済効果の大きさだけで測れるものではない。人々が「この町で暮らし続けたい」と感じられるかどうか、その意識を育てる点にこそ、本当の役割があるのではないだろうか。\n\n地域通貨「ひかり」の特徴として、本文の内容に合うものはどれか。",
        "choices": [
          "日本中どこでも円と同じように使える",
          "町内でのみ使え、有効期限が定められている",
          "使うほど円に交換できる額が増えていく",
          "高齢者だけが使うことのできる通貨である"
        ],
        "answer": 1,
        "explain_vi": "Bài viết nêu rõ đồng tiền địa phương chỉ dùng được trong thị trấn và có thời hạn hiệu lực, khác với đồng yên. Các lựa chọn còn lại đều trái với nội dung.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "ひかり町では、町内での買い物やボランティア活動に使える地域通貨「ひかり」が導入された。円とは異なり、この通貨は町外では使えず、有効期限も定められている。導入の狙いは、町の中でお金が循環する仕組みを作ることにある。大手の通販で買い物をすれば、そのお金は町の外へ流出してしまうが、地域通貨を使えば、商店も住民も互いに支え合う関係が強まるというわけである。もっとも、課題も少なくない。使える店が限られていることや、高齢者にとって仕組みが分かりにくいことなどが指摘されている。それでも筆者は、この試みに意義があると考える。地域通貨の価値は、経済効果の大きさだけで測れるものではない。人々が「この町で暮らし続けたい」と感じられるかどうか、その意識を育てる点にこそ、本当の役割があるのではないだろうか。\n\n地域通貨を導入した狙いは何か。",
        "choices": [
          "大手通販の利用者を町内に増やすこと",
          "高齢者のボランティア活動を減らすこと",
          "町の中でお金が循環する仕組みを作ること",
          "町の商店の数を減らして効率化すること"
        ],
        "answer": 2,
        "explain_vi": "Bài viết nói thẳng mục đích là tạo cơ chế để tiền lưu thông trong thị trấn, tránh chảy ra ngoài qua mua sắm trực tuyến của các hãng lớn.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "ひかり町では、町内での買い物やボランティア活動に使える地域通貨「ひかり」が導入された。円とは異なり、この通貨は町外では使えず、有効期限も定められている。導入の狙いは、町の中でお金が循環する仕組みを作ることにある。大手の通販で買い物をすれば、そのお金は町の外へ流出してしまうが、地域通貨を使えば、商店も住民も互いに支え合う関係が強まるというわけである。もっとも、課題も少なくない。使える店が限られていることや、高齢者にとって仕組みが分かりにくいことなどが指摘されている。それでも筆者は、この試みに意義があると考える。地域通貨の価値は、経済効果の大きさだけで測れるものではない。人々が「この町で暮らし続けたい」と感じられるかどうか、その意識を育てる点にこそ、本当の役割があるのではないだろうか。\n\n筆者は、地域通貨の本当の役割はどこにあると考えているか。",
        "choices": [
          "町の財政を円の収入によって立て直すこと",
          "使える店を増やして経済効果を最大化すること",
          "課題をなくして高齢者にも分かりやすくすること",
          "住民が町で暮らし続けたいと感じる意識を育てること"
        ],
        "answer": 3,
        "explain_vi": "Câu kết luận: vai trò thật sự của tiền địa phương nằm ở việc nuôi dưỡng ý thức muốn tiếp tục sống ở thị trấn này của cư dân, chứ không chỉ ở quy mô hiệu quả kinh tế.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "都市部における緑地の役割が見直されている。公園や街路樹は、景観を整えるだけでなく、気温の上昇を和らげたり、住民の心身の健康を支えたりする働きを持つことが、近年の研究で明らかになってきた。あおば区では、空き地を小さな緑地として整備する事業が進められ、住民の交流の場としても機能し始めている。しかし、緑地の整備には費用と手間がかかり、開発の利益を優先する声も根強い。筆者は、緑地を「余裕があれば設けるもの」として扱う考え方に疑問を呈したい。緑地が生む利益は、土地の価格のようには数字で表しにくいが、長い目で見れば、医療費の抑制や地域への愛着の形成といった形で社会に還元される。目先の効率だけでは測れない価値を、どう判断に組み込むかが問われているのである。\n\n緑地の働きについて、本文の内容に合うものはどれか。",
        "choices": [
          "気温の上昇を和らげ、住民の心身の健康を支える働きがある",
          "土地の価格を引き上げ、開発の利益を増やす働きがある",
          "整備に費用がかからず、手間もほとんどかからない",
          "住民の交流を減らし、静かな環境を保つ働きがある"
        ],
        "answer": 0,
        "explain_vi": "Nghiên cứu gần đây cho thấy mảng xanh không chỉ làm đẹp cảnh quan mà còn giảm nhiệt độ tăng cao và hỗ trợ sức khỏe thể chất, tinh thần của cư dân.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "都市部における緑地の役割が見直されている。公園や街路樹は、景観を整えるだけでなく、気温の上昇を和らげたり、住民の心身の健康を支えたりする働きを持つことが、近年の研究で明らかになってきた。あおば区では、空き地を小さな緑地として整備する事業が進められ、住民の交流の場としても機能し始めている。しかし、緑地の整備には費用と手間がかかり、開発の利益を優先する声も根強い。筆者は、緑地を「余裕があれば設けるもの」として扱う考え方に疑問を呈したい。緑地が生む利益は、土地の価格のようには数字で表しにくいが、長い目で見れば、医療費の抑制や地域への愛着の形成といった形で社会に還元される。目先の効率だけでは測れない価値を、どう判断に組み込むかが問われているのである。\n\n筆者が疑問を呈しているのは、どのような考え方に対してか。",
        "choices": [
          "緑地は住民の交流の場になるという考え方",
          "緑地は余裕があれば設けるものだという考え方",
          "緑地の整備には費用と手間がかかるという考え方",
          "緑地は景観を整えるものだという考え方"
        ],
        "answer": 1,
        "explain_vi": "Tác giả đặt dấu hỏi với cách coi mảng xanh là thứ 'có dư dả mới làm', vì lợi ích của nó tuy khó đo bằng số nhưng sẽ hoàn lại cho xã hội về lâu dài.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "都市部における緑地の役割が見直されている。公園や街路樹は、景観を整えるだけでなく、気温の上昇を和らげたり、住民の心身の健康を支えたりする働きを持つことが、近年の研究で明らかになってきた。あおば区では、空き地を小さな緑地として整備する事業が進められ、住民の交流の場としても機能し始めている。しかし、緑地の整備には費用と手間がかかり、開発の利益を優先する声も根強い。筆者は、緑地を「余裕があれば設けるもの」として扱う考え方に疑問を呈したい。緑地が生む利益は、土地の価格のようには数字で表しにくいが、長い目で見れば、医療費の抑制や地域への愛着の形成といった形で社会に還元される。目先の効率だけでは測れない価値を、どう判断に組み込むかが問われているのである。\n\nこの文章で筆者が最も言いたいことは何か。",
        "choices": [
          "緑地の整備は開発の利益より常に優先されるべきだ",
          "緑地の価値は土地の価格に換算して示すべきだ",
          "数字で表しにくい緑地の価値を、長い目で見て判断に組み込むことが問われている",
          "空き地の整備は住民の交流を生むためだけに行うべきだ"
        ],
        "answer": 2,
        "explain_vi": "Câu cuối khẳng định vấn đề cốt lõi: làm thế nào đưa giá trị khó đo bằng hiệu quả trước mắt của mảng xanh vào quá trình ra quyết định, với tầm nhìn dài hạn.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "科学的な知見を政策に生かすことの難しさは、しばしば「科学は答えを出してくれるはずだ」という期待の裏側にある。科学は、観測や実験を積み重ね、暫定的な結論を更新し続ける営みであり、絶対に正しい答えを一度に提示するものではない。ところが、政策の決定には期限があり、不確実さを残したまま判断を下さなければならない場面が多い。このずれが、科学者と政策決定者の間の摩擦を生んできた。科学者は「まだ結論は出ていない」と言い、決定者は「今決めなければならない」と言う。どちらも間違っているわけではない。求められるのは、科学の不確実さを隠さずに伝え、その上でどの程度のリスクを社会が引き受けるのかを、開かれた議論の中で決めていく姿勢である。不確実さを理由に判断を先送りすることも、逆に科学を絶対視して議論を閉ざしてしまうことも、どちらも責任の放棄に等しい。科学と社会の関係は、答えの受け渡しではなく、不確実さを含めた対話の積み重ねの上に成り立つべきなのではないだろうか。\n\n筆者は、科学という営みをどのように捉えているか。",
        "choices": [
          "絶対に正しい答えを一度に提示できる営み",
          "政策決定の期限に合わせて結論を出す営み",
          "観測や実験の積み重ねの上に立つ、絶対的な真理の体系",
          "観測や実験を積み重ね、暫定的な結論を更新し続ける営み"
        ],
        "answer": 3,
        "explain_vi": "Bài viết định nghĩa khoa học là hoạt động chồng chất quan sát, thực nghiệm và liên tục cập nhật các kết luận tạm thời, chứ không đưa ra đáp án tuyệt đối ngay một lần.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "科学的な知見を政策に生かすことの難しさは、しばしば「科学は答えを出してくれるはずだ」という期待の裏側にある。科学は、観測や実験を積み重ね、暫定的な結論を更新し続ける営みであり、絶対に正しい答えを一度に提示するものではない。ところが、政策の決定には期限があり、不確実さを残したまま判断を下さなければならない場面が多い。このずれが、科学者と政策決定者の間の摩擦を生んできた。科学者は「まだ結論は出ていない」と言い、決定者は「今決めなければならない」と言う。どちらも間違っているわけではない。求められるのは、科学の不確実さを隠さずに伝え、その上でどの程度のリスクを社会が引き受けるのかを、開かれた議論の中で決めていく姿勢である。不確実さを理由に判断を先送りすることも、逆に科学を絶対視して議論を閉ざしてしまうことも、どちらも責任の放棄に等しい。科学と社会の関係は、答えの受け渡しではなく、不確実さを含めた対話の積み重ねの上に成り立つべきなのではないだろうか。\n\n科学者と政策決定者の間に摩擦が生まれるのはなぜか。",
        "choices": [
          "科学には不確実さが残る一方、政策の決定には期限があるというずれがあるから",
          "科学者が政策に関心を持とうとしないから",
          "政策決定者が科学の答えを絶対視しているから",
          "科学の結論があまりにも早く更新されすぎるから"
        ],
        "answer": 0,
        "explain_vi": "Ma sát sinh ra từ độ lệch: khoa học còn tính bất định trong khi quyết định chính sách có thời hạn, buộc phải phán đoán ngay. Cả hai phía đều không sai.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "科学的な知見を政策に生かすことの難しさは、しばしば「科学は答えを出してくれるはずだ」という期待の裏側にある。科学は、観測や実験を積み重ね、暫定的な結論を更新し続ける営みであり、絶対に正しい答えを一度に提示するものではない。ところが、政策の決定には期限があり、不確実さを残したまま判断を下さなければならない場面が多い。このずれが、科学者と政策決定者の間の摩擦を生んできた。科学者は「まだ結論は出ていない」と言い、決定者は「今決めなければならない」と言う。どちらも間違っているわけではない。求められるのは、科学の不確実さを隠さずに伝え、その上でどの程度のリスクを社会が引き受けるのかを、開かれた議論の中で決めていく姿勢である。不確実さを理由に判断を先送りすることも、逆に科学を絶対視して議論を閉ざしてしまうことも、どちらも責任の放棄に等しい。科学と社会の関係は、答えの受け渡しではなく、不確実さを含めた対話の積み重ねの上に成り立つべきなのではないだろうか。\n\n筆者が求められる姿勢だとしているものはどれか。",
        "choices": [
          "結論が出るまで政策の判断を先送りする姿勢",
          "不確実さを隠さず伝え、引き受けるリスクの程度を開かれた議論の中で決めていく姿勢",
          "科学の答えを絶対のものとして議論を打ち切る姿勢",
          "科学者だけにリスクの判断を委ねる姿勢"
        ],
        "answer": 1,
        "explain_vi": "Tác giả yêu cầu thái độ: truyền đạt tính bất định không che giấu, rồi quyết định mức rủi ro xã hội chấp nhận thông qua thảo luận cởi mở.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "科学的な知見を政策に生かすことの難しさは、しばしば「科学は答えを出してくれるはずだ」という期待の裏側にある。科学は、観測や実験を積み重ね、暫定的な結論を更新し続ける営みであり、絶対に正しい答えを一度に提示するものではない。ところが、政策の決定には期限があり、不確実さを残したまま判断を下さなければならない場面が多い。このずれが、科学者と政策決定者の間の摩擦を生んできた。科学者は「まだ結論は出ていない」と言い、決定者は「今決めなければならない」と言う。どちらも間違っているわけではない。求められるのは、科学の不確実さを隠さずに伝え、その上でどの程度のリスクを社会が引き受けるのかを、開かれた議論の中で決めていく姿勢である。不確実さを理由に判断を先送りすることも、逆に科学を絶対視して議論を閉ざしてしまうことも、どちらも責任の放棄に等しい。科学と社会の関係は、答えの受け渡しではなく、不確実さを含めた対話の積み重ねの上に成り立つべきなのではないだろうか。\n\n筆者が「責任の放棄に等しい」としているものはどれか。",
        "choices": [
          "不確実さを伝えながら議論を続けること",
          "期限のある中で判断を下すこと",
          "不確実さを理由に判断を先送りすることと、科学を絶対視して議論を閉ざすこと",
          "科学の暫定的な結論を更新し続けること"
        ],
        "answer": 2,
        "explain_vi": "Bài viết nêu cả hai thái cực đều là trốn tránh trách nhiệm: viện cớ bất định để trì hoãn phán đoán, và tuyệt đối hóa khoa học để đóng lại thảo luận.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "人工知能が生み出した作品も、芸術と呼ぶに値する。芸術の価値は、作り手の内面そのものではなく、受け手の心を動かすかどうかで決まるからだ。歴史を振り返れば、写真が登場した当初も「機械が作るものは芸術ではない」と言われたが、今や写真は確立した芸術分野である。道具が変わるたびに芸術の定義は広がってきた。人工知能もまた、人間の創造性を拡張する新しい道具と捉えるべきであり、その可能性を閉ざす理由はない。\n人工知能の作品を芸術と呼ぶことには慎重でありたい。芸術とは、作り手が自らの経験や葛藤と向き合い、その過程そのものに意味がある営みだからである。人工知能には経験も葛藤もなく、大量のデータの組み合わせから結果を出すにすぎない。受け手が感動したとしても、それは作り手の意図なき偶然の産物への感動である。人間の創作と同列に扱うことは、芸術という営みの本質を見失わせる危険がある。\n\n文章Aの主張として最も適当なものはどれか。",
        "choices": [
          "芸術の価値は作り手の経験や葛藤によって決まる",
          "写真は機械が作るものなので芸術とは呼べない",
          "人工知能は人間の創造性を脅かす存在である",
          "作品が受け手の心を動かすかどうかで価値が決まるので、人工知能の作品も芸術と呼べる"
        ],
        "answer": 3,
        "explain_vi": "Đoạn A cho rằng giá trị nghệ thuật quyết định bởi việc tác phẩm có lay động người tiếp nhận hay không, nên tác phẩm của AI cũng xứng đáng gọi là nghệ thuật.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "人工知能が生み出した作品も、芸術と呼ぶに値する。芸術の価値は、作り手の内面そのものではなく、受け手の心を動かすかどうかで決まるからだ。歴史を振り返れば、写真が登場した当初も「機械が作るものは芸術ではない」と言われたが、今や写真は確立した芸術分野である。道具が変わるたびに芸術の定義は広がってきた。人工知能もまた、人間の創造性を拡張する新しい道具と捉えるべきであり、その可能性を閉ざす理由はない。\n人工知能の作品を芸術と呼ぶことには慎重でありたい。芸術とは、作り手が自らの経験や葛藤と向き合い、その過程そのものに意味がある営みだからである。人工知能には経験も葛藤もなく、大量のデータの組み合わせから結果を出すにすぎない。受け手が感動したとしても、それは作り手の意図なき偶然の産物への感動である。人間の創作と同列に扱うことは、芸術という営みの本質を見失わせる危険がある。\n\n文章Bの主張として最も適当なものはどれか。",
        "choices": [
          "芸術は作り手が経験や葛藤と向き合う過程に意味があるため、人工知能の作品を人間の創作と同列に扱うべきではない",
          "人工知能の作品は受け手を感動させることは決してない",
          "写真が芸術として認められたのだから、人工知能も認めるべきだ",
          "芸術の定義は時代とともに広がるべきものだ"
        ],
        "answer": 0,
        "explain_vi": "Đoạn B nhấn mạnh ý nghĩa nằm ở quá trình người sáng tạo đối diện với trải nghiệm và giằng xé của chính mình; AI không có những thứ đó nên không thể xếp ngang sáng tác của con người.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "人工知能が生み出した作品も、芸術と呼ぶに値する。芸術の価値は、作り手の内面そのものではなく、受け手の心を動かすかどうかで決まるからだ。歴史を振り返れば、写真が登場した当初も「機械が作るものは芸術ではない」と言われたが、今や写真は確立した芸術分野である。道具が変わるたびに芸術の定義は広がってきた。人工知能もまた、人間の創造性を拡張する新しい道具と捉えるべきであり、その可能性を閉ざす理由はない。\n人工知能の作品を芸術と呼ぶことには慎重でありたい。芸術とは、作り手が自らの経験や葛藤と向き合い、その過程そのものに意味がある営みだからである。人工知能には経験も葛藤もなく、大量のデータの組み合わせから結果を出すにすぎない。受け手が感動したとしても、それは作り手の意図なき偶然の産物への感動である。人間の創作と同列に扱うことは、芸術という営みの本質を見失わせる危険がある。\n\n二つの文章の関係について、最も適当なものはどれか。",
        "choices": [
          "両方とも人工知能の作品を芸術と認める立場である",
          "芸術の価値を何が決めるのかをめぐって、二つの文章は対立している",
          "文章Bは文章Aの具体例を補足したものである",
          "両方とも写真を芸術ではないと考えている"
        ],
        "answer": 1,
        "explain_vi": "Hai đoạn đối lập nhau về tiêu chí quyết định giá trị nghệ thuật: đoạn A lấy phía người tiếp nhận, đoạn B lấy quá trình của người sáng tạo.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "効率が重んじられる現代社会では、「無駄」を排除することが正しいことのように語られる。しかし、筆者はその風潮に危うさを感じる。人の成長や創造の多くは、一見無駄に見える寄り道や試行錯誤の中から生まれてきたからである。目的地へ最短で進むことだけを求めれば、途中で得られるはずだった発見や出会いは失われる。無駄を一切認めない社会は、失敗を一切認めない社会でもある。そのような社会では、人々は挑戦を避け、安全な道だけを選ぶようになるだろう。本当に豊かな社会とは、無駄に見える時間や労力をどこまで許容できるかによって測られるのではないだろうか。\n\n筆者が「無駄」を排除する風潮に危うさを感じるのはなぜか。",
        "choices": [
          "無駄を排除すれば、社会の効率が下がってしまうから",
          "無駄な時間は人の成長とは関係がないから",
          "人の成長や創造の多くは、一見無駄に見える寄り道や試行錯誤の中から生まれてきたから",
          "目的地へ最短で進むことが難しくなるから"
        ],
        "answer": 2,
        "explain_vi": "Tác giả thấy nguy hiểm vì phần lớn sự trưởng thành và sáng tạo của con người sinh ra từ những đường vòng, thử-sai trông có vẻ lãng phí.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "効率が重んじられる現代社会では、「無駄」を排除することが正しいことのように語られる。しかし、筆者はその風潮に危うさを感じる。人の成長や創造の多くは、一見無駄に見える寄り道や試行錯誤の中から生まれてきたからである。目的地へ最短で進むことだけを求めれば、途中で得られるはずだった発見や出会いは失われる。無駄を一切認めない社会は、失敗を一切認めない社会でもある。そのような社会では、人々は挑戦を避け、安全な道だけを選ぶようになるだろう。本当に豊かな社会とは、無駄に見える時間や労力をどこまで許容できるかによって測られるのではないだろうか。\n\nこの文章で筆者が最も言いたいことは何か。",
        "choices": [
          "効率を重んじる社会では、無駄を完全に排除すべきだ",
          "安全な道だけを選ぶことが、豊かな社会への近道だ",
          "無駄に見えるものを一切認めない社会こそ理想的だ",
          "社会の豊かさは、無駄に見える時間や労力をどこまで許容できるかによって測られる"
        ],
        "answer": 3,
        "explain_vi": "Câu kết luận là thông điệp chính: sự giàu có thật sự của một xã hội được đo bằng mức độ nó chấp nhận được thời gian và công sức trông có vẻ lãng phí.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "かえで市立文化ホール 利用案内\n・開館時間：午前9時〜午後9時（月曜日は休館。ただし、月曜日が祝日の場合は開館し、翌日が休館となります。）\n・大ホールの利用料金：平日1日30,000円、土日・祝日1日45,000円\n・会議室の利用料金：1時間1,200円（3時間以上利用する場合は1割引）\n・申し込み：利用日の6か月前の月の初日から、窓口または電話で受け付けます。\n・注意：市内の中学生以下の団体は、大ホールの料金が半額になります。営利目的の利用は、料金が2割増しとなります。\n\n月曜日が祝日の場合、このホールはどうなるか。",
        "choices": [
          "その月曜日は開館し、翌日が休館になる",
          "その月曜日も通常どおり休館になる",
          "その週は月曜日と翌日の両方が休館になる",
          "その月曜日は午後だけ開館する"
        ],
        "answer": 0,
        "explain_vi": "Thông báo ghi rõ: thứ Hai là ngày nghỉ, nhưng nếu thứ Hai trùng ngày lễ thì vẫn mở cửa và ngày hôm sau sẽ nghỉ thay.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "かえで市立文化ホール 利用案内\n・開館時間：午前9時〜午後9時（月曜日は休館。ただし、月曜日が祝日の場合は開館し、翌日が休館となります。）\n・大ホールの利用料金：平日1日30,000円、土日・祝日1日45,000円\n・会議室の利用料金：1時間1,200円（3時間以上利用する場合は1割引）\n・申し込み：利用日の6か月前の月の初日から、窓口または電話で受け付けます。\n・注意：市内の中学生以下の団体は、大ホールの料金が半額になります。営利目的の利用は、料金が2割増しとなります。\n\n市内の中学校の吹奏楽部が、営利目的ではなく、土曜日に大ホールを1日利用する場合、料金はいくらか。",
        "choices": [
          "45,000円",
          "22,500円",
          "36,000円",
          "15,000円"
        ],
        "answer": 1,
        "explain_vi": "Phí hội trường lớn ngày thứ Bảy là 45,000 yên; đoàn thể là học sinh trung học cơ sở trở xuống trong thành phố được giảm một nửa, còn 22,500 yên. Mục đích không phải thương mại nên không bị cộng thêm 20%.",
        "src": "full"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼は恩人の好意を蔑ろにするような態度を取った。「蔑ろ」の読み方として正しいものはどれか。",
        "choices": [
          "ないがしろ",
          "さげすみ",
          "べっし",
          "うとんじ"
        ],
        "answer": 0,
        "explain_vi": "「蔑ろ」は「ないがしろ」と読み、意味は「coi thường, xem nhẹ」。Câu này chê trách thái độ xem nhẹ lòng tốt của ân nhân.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "資金不足のため、新製品の開発計画は頓挫した。「頓挫」の読み方として正しいものはどれか。",
        "choices": [
          "どんさ",
          "とんざ",
          "とんさ",
          "どんざ"
        ],
        "answer": 1,
        "explain_vi": "「頓挫」は「とんざ」と読み、意味は「bị đình trệ, đổ vỡ giữa chừng」。Ở đây kế hoạch phát triển sản phẩm mới bị dừng vì thiếu vốn.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "慣れない海外生活で、彼はすっかり憔悴していた。「憔悴」の読み方として正しいものはどれか。",
        "choices": [
          "しょうたい",
          "すいせい",
          "しょうすい",
          "しょうせい"
        ],
        "answer": 2,
        "explain_vi": "「憔悴」は「しょうすい」と読み、意味は「tiều tụy, hốc hác vì mệt mỏi, suy nhược」。Không đọc là 「すいせい」 hay 「しょうせい」.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「忖度」という言葉の意味として、最も適当なものはどれか。",
        "choices": [
          "自分の利益だけを考えること",
          "相手を厳しく批判すること",
          "約束を必ず守ること",
          "相手の気持ちを推し量って配慮すること"
        ],
        "answer": 3,
        "explain_vi": "「忖度」（そんたく）は「đoán ý, cân nhắc cảm xúc của đối phương để ứng xử cho phù hợp」。Từ này không mang nghĩa chỉ trích người khác hay chỉ nghĩ cho lợi ích của mình.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "今回のプロジェクトが成功したのは、（　　）関係者の皆様のご尽力のおかげです。",
        "choices": [
          "ことごとく",
          "ひとえに",
          "あながち",
          "かろうじて"
        ],
        "answer": 1,
        "explain_vi": "「ひとえに」は「hoàn toàn, chỉ nhờ vào」、thường dùng trong lời cảm ơn trang trọng. 「あながち」はphải đi với phủ định, 「かろうじて」は「suýt soát, may mà kịp」 nên không hợp ở đây.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "「おもむろに」の使い方として正しいものはどれか。",
        "choices": [
          "彼女はおもむろに駆け出して、発車間際の電車に飛び乗った。",
          "彼はおもむろに大声で叫び、周囲の人を驚かせた。",
          "彼はおもむろに立ち上がり、静かに話し始めた。",
          "会議はおもむろに終わり、皆急いで帰路についた。"
        ],
        "answer": 2,
        "explain_vi": "「おもむろに」は「từ từ, chậm rãi, không vội vàng」. Chỉ câu đứng dậy rồi bình tĩnh bắt đầu nói mới đúng; các câu còn lại đều chỉ hành động đột ngột, vội vã nên sai.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "その研究成果は、長年信じられてきた定説を（　　）もので、学界に衝撃を与えた。",
        "choices": [
          "損なう",
          "和らげる",
          "拒む",
          "覆す"
        ],
        "answer": 3,
        "explain_vi": "「定説を覆す」は cụm cố định, nghĩa là「lật đổ, bác bỏ một thuyết đã được tin tưởng lâu nay」. 「損なう」（làm tổn hại）, 「和らげる」（làm dịu）, 「拒む」（từ chối） đều không kết hợp được với 「定説」 trong ngữ cảnh này.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文字・語彙",
        "question": "彼は決断を逡巡し、結局その場では何も言えなかった。「逡巡する」とはどういう意味か。",
        "choices": [
          "ためらってなかなか決められないでいること",
          "すぐに諦めてしまうこと",
          "深く後悔していること",
          "人の意見に流されていること"
        ],
        "answer": 0,
        "explain_vi": "「逡巡する」（しゅんじゅんする）は「do dự, chần chừ mãi không quyết được」。Trong câu, vì do dự nên cuối cùng anh ta không nói được gì.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼女は、今にも泣き出さん（　　）表情で窓の外を見つめていた。",
        "choices": [
          "ばかりに",
          "どころの",
          "ばかりの",
          "がてらの"
        ],
        "answer": 2,
        "explain_vi": "「〜んばかりだ」nói về trạng thái「như sắp... đến nơi」; dạng đứng trước danh từ là 「〜んばかりの」. 「泣き出さんばかりの表情」 là vẻ mặt như sắp òa khóc.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "台風の接近により、式典は延期を（　　）。",
        "choices": [
          "余儀なくされかねない",
          "余儀なくされた",
          "余地なくされた",
          "余儀なくなくされた"
        ],
        "answer": 1,
        "explain_vi": "「〜を余儀なくされる」は「bị hoàn cảnh bắt buộc phải làm gì」. Vì bão đang đến gần nên buổi lễ bị buộc phải hoãn lại.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "その事故の様子は、想像する（　　）身の毛がよだつほどだった。",
        "choices": [
          "すら",
          "までに",
          "こそ",
          "だに"
        ],
        "answer": 3,
        "explain_vi": "「〜だに」đi với các động từ suy tưởng như 「想像する」「思う」 để nhấn mạnh「chỉ... thôi cũng đã」. Ở đây chỉ tưởng tượng về vụ tai nạn thôi cũng đã rùng mình.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "プロの選手（　　）、あの場面では焦ってしまうのも無理はない。",
        "choices": [
          "とはいえ",
          "というより",
          "とあって",
          "ともなると"
        ],
        "answer": 0,
        "explain_vi": "「〜とはいえ」は「dù nói là... nhưng vẫn」, mang tính nhượng bộ. Dù là vận động viên chuyên nghiệp, trong tình huống đó có cuống lên cũng là điều dễ hiểu.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "娘の結婚に孫の誕生と、この一年は嬉しいこと（　　）だった。",
        "choices": [
          "まみれ",
          "だらけ",
          "がち",
          "ずくめ"
        ],
        "answer": 3,
        "explain_vi": "「〜ずくめ」chỉ trạng thái「toàn là một loại điều gì đó」, thường dùng cho điều tốt: 「嬉しいことずくめ」 là「toàn chuyện vui」. 「まみれ」 và 「だらけ」 thường dùng cho điều xấu, bẩn.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は家族を養わ（　　）、昼も夜も働き続けた。",
        "choices": [
          "んばかり",
          "んがため",
          "んがための",
          "んがてら"
        ],
        "answer": 1,
        "explain_vi": "「〜んがため」là cách nói văn viết trang trọng, nghĩa là「để, vì mục đích」, gắn với dạng phủ định cổ của động từ: 養う → 養わんがため. Các dạng còn lại không đúng ngữ pháp trong câu này.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "文法",
        "question": "彼は自らにかけられた疑惑を晴らす（　　）、記者会見を開いた。",
        "choices": [
          "べき",
          "べからず",
          "べく",
          "べくん"
        ],
        "answer": 2,
        "explain_vi": "「〜べく」là dạng nối tiếp của 「〜べきだ」, dùng trong văn viết với nghĩa「để...」. 「晴らすべく」 nghĩa là「để làm sáng tỏ」mối nghi ngờ đang nhắm vào mình.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "近年、地方都市では商店街の衰退が深刻な問題となっている。ほうげん市でも例外ではなく、空き店舗はこの十年で倍増した。その主因として、インターネット通販の普及がよく挙げられる。確かに、価格の安さや利便性の点では、個人商店が大規模な通販に対抗するのは難しい。しかし、筆者は、衰退の原因を通販だけに求める見方には疑問を感じている。なぜなら、商店街には、品物を売る場である以前に、住民同士が顔を合わせ、情報を交換する「地域の交流の場」という役割があったからだ。その役割が失われた背景には、車社会の進展や共働き世帯の増加といった、住民の生活様式の変化がある。つまり、商店街の衰退は、暮らしの変化に商店街の側が対応しきれなかった結果と捉えるのが実態に近いのではないだろうか。\n\n筆者が疑問を感じているのは、どのような見方に対してか。",
        "choices": [
          "インターネット通販の普及だけが商店街衰退の原因だとする見方",
          "商店街には交流の場という役割があったとする見方",
          "車社会の進展こそが商店街を衰退させたとする見方",
          "個人商店も通販に十分対抗できるとする見方"
        ],
        "answer": 0,
        "explain_vi": "Tác giả nghi ngờ cách nhìn cho rằng nguyên nhân suy thoái của phố mua sắm「chỉ nằm ở」sự phổ biến của mua sắm trực tuyến. Theo tác giả, phía sau còn có sự thay đổi trong lối sống của cư dân.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "近年、地方都市では商店街の衰退が深刻な問題となっている。ほうげん市でも例外ではなく、空き店舗はこの十年で倍増した。その主因として、インターネット通販の普及がよく挙げられる。確かに、価格の安さや利便性の点では、個人商店が大規模な通販に対抗するのは難しい。しかし、筆者は、衰退の原因を通販だけに求める見方には疑問を感じている。なぜなら、商店街には、品物を売る場である以前に、住民同士が顔を合わせ、情報を交換する「地域の交流の場」という役割があったからだ。その役割が失われた背景には、車社会の進展や共働き世帯の増加といった、住民の生活様式の変化がある。つまり、商店街の衰退は、暮らしの変化に商店街の側が対応しきれなかった結果と捉えるのが実態に近いのではないだろうか。\n\n商店街の役割として、筆者が特に述べているものはどれか。",
        "choices": [
          "安い商品を大量に供給すること",
          "住民が顔を合わせて情報を交換する交流の場であること",
          "観光客を地域に呼び込むこと",
          "若者に働く場を提供すること"
        ],
        "answer": 1,
        "explain_vi": "Đoạn văn nói phố mua sắm, trước khi là nơi bán hàng, từng là「nơi giao lưu của khu dân cư」— nơi cư dân gặp gỡ và trao đổi thông tin. Đây là vai trò tác giả nhấn mạnh, các lựa chọn còn lại không được nhắc đến trong bài.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "近年、地方都市では商店街の衰退が深刻な問題となっている。ほうげん市でも例外ではなく、空き店舗はこの十年で倍増した。その主因として、インターネット通販の普及がよく挙げられる。確かに、価格の安さや利便性の点では、個人商店が大規模な通販に対抗するのは難しい。しかし、筆者は、衰退の原因を通販だけに求める見方には疑問を感じている。なぜなら、商店街には、品物を売る場である以前に、住民同士が顔を合わせ、情報を交換する「地域の交流の場」という役割があったからだ。その役割が失われた背景には、車社会の進展や共働き世帯の増加といった、住民の生活様式の変化がある。つまり、商店街の衰退は、暮らしの変化に商店街の側が対応しきれなかった結果と捉えるのが実態に近いのではないだろうか。\n\n筆者の考えに最も近いものはどれか。",
        "choices": [
          "商店街の衰退はインターネット通販の普及が唯一の原因である",
          "住民は通販の利用をやめて商店街で買い物すべきである",
          "衰退の背景には住民の暮らしの変化があり、商店街がそれに対応しきれなかった",
          "商店街はこれまで交流の場としての役割を果たしたことがなかった"
        ],
        "answer": 2,
        "explain_vi": "Câu kết luận của bài: nên hiểu sự suy thoái là kết quả của việc phố mua sắm không thích ứng kịp với thay đổi lối sống (xã hội ô tô, gia đình cả hai vợ chồng cùng đi làm). Tác giả không kêu gọi bỏ mua sắm trực tuyến, cũng không phủ nhận vai trò giao lưu trước đây.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "現代人は、スマートフォンの普及により、膨大な情報にいつでもアクセスできるようになった。分からないことがあれば、その場で検索すれば答えが得られる。こうした環境は確かに便利だが、筆者はそこに一つの危うさを感じている。情報を得ることと理解することは、本来、別の営みであるはずだからだ。検索して得た答えは、自分の頭で考える過程を経ていないため、その場では分かった気になっても、記憶に定着しにくい。かつては、本を読み、辞書を引き、人に尋ねるといった手間そのものが、思考を深める機会にもなっていた。手間が省かれるようになった今、私たちは「知っている」ことと「分かっている」ことの区別を意識的に行う必要があるのではないか。そのためにも、あえて立ち止まって考える時間を持つことが、これまでにもまして重要になっている。\n\n筆者が「危うさ」を感じているのはなぜか。",
        "choices": [
          "スマートフォンの普及がまだ十分に進んでいないから",
          "辞書や本が手に入りにくい時代になったから",
          "情報の量が少なすぎて判断を誤りやすいから",
          "考える過程を経ずに答えだけを得て、分かった気になってしまいやすいから"
        ],
        "answer": 3,
        "explain_vi": "Tác giả thấy nguy hiểm ở chỗ chỉ cần tra cứu là có ngay đáp án, nên dễ「tưởng là đã hiểu」mà bỏ qua quá trình tự suy nghĩ. Đáp án có được theo cách đó khó ghi nhớ lâu dài.",
        "src": "mock"
      },
      {
        "level": "N1",
        "section": "読解",
        "question": "現代人は、スマートフォンの普及により、膨大な情報にいつでもアクセスできるようになった。分からないことがあれば、その場で検索すれば答えが得られる。こうした環境は確かに便利だが、筆者はそこに一つの危うさを感じている。情報を得ることと理解することは、本来、別の営みであるはずだからだ。検索して得た答えは、自分の頭で考える過程を経ていないため、その場では分かった気になっても、記憶に定着しにくい。かつては、本を読み、辞書を引き、人に尋ねるといった手間そのものが、思考を深める機会にもなっていた。手間が省かれるようになった今、私たちは「知っている」ことと「分かっている」ことの区別を意識的に行う必要があるのではないか。そのためにも、あえて立ち止まって考える時間を持つことが、これまでにもまして重要になっている。\n\nこの文章で筆者が最も言いたいことは何か。",
        "choices": [
          "情報を得るだけでは理解したことにはならず、立ち止まって考える時間を持つことが大切だ",
          "検索は便利なのだから、もっと積極的に活用すべきだ",
          "本や辞書はスマートフォンより優れた道具である",
          "現代人は記憶力を鍛える訓練を受けるべきだ"
        ],
        "answer": 0,
        "explain_vi": "Thông điệp chính của bài: có được thông tin không đồng nghĩa với hiểu; cần ý thức phân biệt「biết」và「hiểu」, đồng thời dành thời gian dừng lại để suy nghĩ. Các lựa chọn còn lại chỉ là chi tiết phụ hoặc không có trong bài.",
        "src": "mock"
      }
    ]
  };
})();
