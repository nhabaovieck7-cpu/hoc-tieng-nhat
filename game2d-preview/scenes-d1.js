// scenes-d1.js — Hội thoại ĐẦY ĐỦ (nâng cấp) cho 4 cảnh ngành xây dựng / chế tạo
// của demo 2D «TUỔI TRẺ Ở NHẬT» (staging — bản duyệt nội dung, chưa đẩy main).
// Đăng ký vào window.DEMO_DATA theo đúng định dạng engine:
//   KAIWA  { scene, lines:[{sp, jp, vi}], wrong:{<thứ tự câu hero, từ 0>:[câu sai 1, câu sai 2]}, outro }
//   BRANCH { scene, branch:[ {sp, text, jp?} | {prompt, choice:[{label, fx?, note?, say:[{sp, text, jp?}]}]} ] }
// Thể ngữ: giám sát Sato nói ngắn, to, thể thường ra lệnh nhưng thương người;
// senpai Kobayashi ít nói, trọng 5S và chỉ tay hô xác nhận; nhân vật chính nói
// vốn N5 lịch sự (desu/masu) còn vấp — các đáp án sai là lỗi điển hình của
// người Việt mới học: sai trợ từ, sai thể, suồng sã sai chỗ, gật bừa khi chưa hiểu.
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  'genba-boss': {
    scene: '🏗️ Công trường — giám sát Sato điểm danh buổi sáng',
    lines: [
      { sp: 'Giám sát Sato', jp: 'おはよう。{朝礼|ちょうれい}を{始|はじ}めるぞ。{全員|ぜんいん}、{並|なら}んでくれ。', vi: 'Chào buổi sáng. Bắt đầu buổi chào sáng đây. Mọi người xếp hàng nào.' },
      { sp: 'hero', jp: 'おはようございます！', vi: 'Chào buổi sáng ạ! (hô to, rõ ràng)' },
      { sp: 'Giám sát Sato', jp: '{点呼|てんこ}するぞ。{順番|じゅんばん}に{名前|なまえ}を{呼|よ}ぶから、{大|おお}きな{声|こえ}で{返事|へんじ}をしてくれ。', vi: 'Điểm danh đây. Tôi gọi tên lần lượt, hãy đáp lại bằng giọng thật to nhé.' },
      { sp: 'hero', jp: 'はい！', vi: 'Có mặt ạ! (đáp khi được gọi tên mình)' },
      { sp: 'Giám sát Sato', jp: 'よし。{次|つぎ}は{保護具|ほごぐ}の{確認|かくにん}だ。{自分|じぶん}の{体|からだ}を、{自分|じぶん}でよく{見|み}てくれ。', vi: 'Tốt. Tiếp theo là kiểm tra đồ bảo hộ. Tự nhìn kỹ lại người mình đi.' },
      { sp: 'hero', jp: 'ヘルメット、{安全帯|あんぜんたい}、{確認|かくにん}しました。', vi: 'Mũ bảo hộ, dây an toàn — đã kiểm tra xong ạ.' },
      { sp: 'Giám sát Sato', jp: '{今日|きょう}は3{階|かい}の{型枠|かたわく}だ。{午前中|ごぜんちゅう}に{材料|ざいりょう}を{上|あ}げて、{午後|ごご}から{組|く}み{立|た}てる。{注意|ちゅうい}だ、3{階|かい}の{東側|ひがしがわ}は{足場|あしば}の{板|いた}がまだ{固定|こてい}されていない。あそこは{立入禁止|たちいりきんし}だ。', vi: 'Hôm nay làm cốp pha tầng 3. Buổi sáng đưa vật liệu lên, buổi chiều bắt đầu lắp. Chú ý này: phía đông tầng 3, ván giàn giáo vẫn chưa được cố định. Chỗ đó cấm vào.' },
      { sp: 'hero', jp: 'すみません、もう{一度|いちど}お{願|ねが}いします。', vi: 'Xin lỗi, làm ơn nhắc lại một lần nữa ạ. (chỗ chưa hiểu thì hỏi lại, không gật bừa)' },
      { sp: 'Giám sát Sato', jp: 'いいぞ、{聞|き}き{返|かえ}すのは{大事|だいじ}だ。ゆっくり{言|い}うぞ。{東側|ひがしがわ}には{入|はい}るな。{西側|にしがわ}から{回|まわ}れ。いいか。', vi: 'Tốt, hỏi lại là việc quan trọng đấy. Tôi nói chậm lại nhé. Không được vào phía đông. Hãy đi vòng qua phía tây. Rõ chưa?' },
      { sp: 'Giám sát Sato', jp: 'それから、{作業|さぎょう}は{二人|ふたり}でやれ。{重|おも}い{物|もの}は{一人|ひとり}で{持|も}つな。{声|こえ}をかけ{合|あ}え。', vi: 'Thêm nữa: làm việc theo cặp hai người. Đồ nặng thì đừng bê một mình. Nhớ gọi nhau, hô nhau.' },
      { sp: 'Giám sát Sato', jp: '{最後|さいご}に{言|い}うぞ。{分|わ}からないことは{聞|き}け。{一人|ひとり}で{勝手|かって}にやるな。ケガをしたら、{仕事|しごと}も{夢|ゆめ}も{終|お}わりだ。それが{約束|やくそく}だ。', vi: 'Tôi nói điều cuối cùng. Việc gì không hiểu thì cứ hỏi. Đừng tự làm một mình. Bị thương thì cả công việc lẫn ước mơ đều chấm hết. Đó là giao ước đấy.' },
      { sp: 'hero', jp: 'わかりました。{東側|ひがしがわ}には{入|はい}りません。{分|わ}からないときは、すぐ{聞|き}きます。', vi: 'Tôi hiểu rồi ạ. Tôi sẽ không vào phía đông. Khi nào không hiểu, tôi sẽ hỏi ngay ạ.' },
      { sp: 'Giám sát Sato', jp: 'よし、その{返事|へんじ}でいい。じゃあ{始|はじ}めるぞ。{今日|きょう}も{安全第一|あんぜんだいいち}でいこう。', vi: 'Tốt, đáp như vậy là được. Vậy thì bắt đầu thôi. Hôm nay cũng an toàn là trên hết nhé.' }
    ],
    wrong: {
      0: ['おはよう。', 'こんにちは！{今日|きょう}もよろしく。'],
      1: ['うん！', 'はい、{私|わたし}はここをいます。'],
      2: ['ヘルメットを{安全帯|あんぜんたい}は、{確認|かくにん}する。', 'ヘルメット、{安全|あんぜん}、{帯|おび}、{見|み}ました。'],
      3: ['すみません、もう{一度|いちど}{言|い}って。', 'すみません、{私|わたし}は{分|わ}かります。{大丈夫|だいじょうぶ}です。'],
      4: ['わかった。{東側|ひがしがわ}を{入|はい}ります。{一人|ひとり}で{大丈夫|だいじょうぶ}です。', 'わかりました。{東側|ひがしがわ}に{入|はい}りませんを、{聞|き}きます。']
    },
    outro: 'Giờ chào sáng kết thúc, cả đội tản ra ai vào việc nấy. {name} đi sau cùng, còn nghe tiếng giám sát Sato vọng lại phía sau lưng, dặn một anh thợ lớn tuổi nhớ uống nước. {call} chợt hiểu ra một điều ở công trường này: câu nói nghe khô khan nhất — “không hiểu thì hỏi, đừng tự làm một mình” — hóa ra lại là câu thương người nhất. Nó không phải mệnh lệnh. Nó là cách một người gánh trách nhiệm cho cả đội nói lời lo lắng của mình, bằng thứ tiếng ngắn và to vừa đủ để át tiếng máy, và vừa đủ để không ai phải mang thương tật về nhà.'
  },
  'genba-board': {
    scene: '🦺 Bảng an toàn của công trường',
    branch: [
      { sp: 'narr', text: 'Sau buổi chào sáng, {name} đứng lại trước tấm bảng an toàn sơn xanh lá ở lối vào công trường Shinjuku. Giữa bảng là dòng chữ lớn nhất: an toàn là trên hết. Ngay bên dưới là tờ KY của hôm nay — tờ dự đoán nguy hiểm mà cả đội vừa đọc cùng nhau.' },
      { sp: 'Giám sát Sato', jp: '{今日|きょう}のKYだ。{午後|ごご}から{風|かぜ}が{強|つよ}くなる。{上|うえ}からの{落下物|らっかぶつ}に{気|き}をつけろ。', text: '"Đây là tờ KY của hôm nay. Từ buổi chiều gió sẽ mạnh lên. Cẩn thận vật rơi từ trên cao." — Giám sát Sato gõ ngón tay vào đúng dòng chữ đỏ trên bảng.' },
      { sp: 'narr', text: 'Góc phải của bảng là ô đếm ngày không tai nạn: 214 ngày. Không phải con số để khoe — mỗi sáng, người trực đều phải tự tay lật số mới. Chỉ một người bị thương thôi, ô số ấy quay về 0, và cả đội sẽ phải bắt đầu lại từ đầu.' },
      { sp: 'narr', text: 'Dưới cùng của bảng là quy tắc viết tay bằng bút dạ, nét chữ của giám sát Sato: thấy nguy hiểm thì hô STOP — ai hô cũng được, kể cả người mới nhất. {name} đọc đi đọc lại hai lần, vì câu ấy nghe không giống luật của công trường, mà giống một lời hứa.' },
      { sp: 'narr', text: 'Lên tới tầng 3, {name} được giao mang theo dây buộc tới khu cốp pha phía tây. Đi ngang qua phía giàn giáo, {call} chợt khựng lại: ở mép sàn gần phía đông, một chồng ván cốp pha đang xếp chồng lên nhau — và gió vừa nổi lên đã làm tấm trên cùng rung lên, dịch ra ngoài từng chút một.' },
      { sp: 'narr', text: 'Nhìn kỹ lại thì cả chồng ván chưa hề được buộc dây. Chỉ cần một cơn gió mạnh hơn, hoặc một người đi ngang làm rung sàn, tấm ván trên cùng có thể trượt ra khỏi mép sàn và rơi thẳng xuống lối đi bên dưới — nơi đồng đội vẫn đang qua lại.' },
      {
        prompt: '{name} làm gì ngay lúc này?',
        choice: [
          {
            label: 'Hô to STOP và báo ngay cho giám sát Sato',
            fx: { jp: 2, love: 1 }, note: 'Đã hô STOP và báo ngay khi thấy nguy hiểm',
            say: [
              { sp: 'hero', jp: 'ストップ！{止|と}まってください！{型枠|かたわく}が{動|うご}いています！', text: '"STOP! Xin dừng lại! Ván cốp pha đang dịch chuyển!" — {name} hô to hết sức, tay chỉ thẳng vào chồng ván. Tiếng hô vang cả tầng 3.' },
              { sp: 'Giám sát Sato', jp: 'よく{見|み}つけた。よく{叫|さけ}んだ。それでいいんだ。', text: '"Phát hiện tốt lắm. Hô to lắm. Cứ như thế là đúng." — Giám sát Sato chạy tới, nhìn chồng ván rồi gật đầu với {name} một cái thật rõ.' },
              { sp: 'narr', text: 'Sato cho dừng việc ở khu vực đó, gọi hai anh thợ tới cùng hạ chồng ván xuống, xếp lại và buộc dây chéo hai lớp. Mất đúng mười phút. Mười phút ấy đổi lấy một buổi chiều không ai phải vào bệnh viện.' }
            ]
          },
          {
            label: 'Tự leo lên buộc lại một mình cho nhanh',
            fx: { hp: -3 }, note: 'Đã tự leo lên buộc ván một mình — bị nhắc vì nguy hiểm',
            say: [
              { sp: 'narr', text: '{name} đặt cuộn dây xuống, tự trèo lên mép sàn với ý nghĩ rất đơn giản: buộc lại mất có một phút, gọi người thì lâu. Nhưng vừa với tay tới tấm ván trên cùng, gió tạt tới, cả chồng ván rung lên dưới tay — chân {call} trượt khỏi mép ván một nhịp, tim rơi thẳng xuống bụng.' },
              { sp: 'Giám sát Sato', jp: '{何|なに}をしてる！{一人|ひとり}で{上|あ}がるな！{危|あぶ}ないだろ！', text: '"Đang làm cái gì thế! Không được leo lên một mình! Nguy hiểm biết bao nhiêu!" — Tiếng quát của giám sát Sato nổ như pháo. Anh kéo {name} xuống khỏi mép sàn ngay lập tức.' },
              { sp: 'Giám sát Sato', jp: '{直|なお}したい{気持|きも}ちは{分|わ}かる。でも、{一人|ひとり}でやるな。まず{叫|さけ}べ。', text: '"Muốn sửa ngay thì tôi hiểu. Nhưng đừng làm một mình. Trước hết là phải hô lên." — Quát xong, giọng Sato hạ xuống ngay. Anh chỉ vào lối đi bên dưới: nếu tấm ván kia rơi lúc {name} đang ở trên đó, thì không còn là chuyện của một người nữa.' },
              { sp: 'narr', text: 'Chồng ván sau đó được cả đội hạ xuống và buộc lại cùng nhau. {name} ngồi nghỉ một lúc cho hết run chân, và nhớ bài học này kỹ hơn bất kỳ dòng chữ nào trên bảng: thấy nguy hiểm, việc đầu tiên không phải là lao vào — mà là hô lên.' }
            ]
          },
          {
            label: 'Kệ đi, không phải phần việc của mình',
            note: 'Đã bỏ qua chồng ván chưa buộc — giám sát tự phát hiện và nhắc cả đội',
            say: [
              { sp: 'narr', text: '{name} tự nhủ chồng ván ấy không thuộc phần việc được giao, quay đi mang dây về phía tây như không có chuyện gì. Cảm giác khó chịu ở sau gáy thì vẫn còn nguyên đó, không đi theo bước chân của {call}.' },
              { sp: 'Giám sát Sato', jp: 'おい、{止|と}まれ。この{型枠|かたわく}、{誰|だれ}が{縛|しば}っていないんだ。{見|み}た{人|ひと}は{言|い}え。', text: '"Này, dừng lại đã. Chồng cốp pha này, ai chưa buộc dây thế? Ai nhìn thấy thì phải nói." — Mười phút sau, chính giám sát Sato đi kiểm tra vòng quanh và phát hiện ra. Giọng anh không to, nhưng cả tầng 3 im phăng phắc.' },
              { sp: 'narr', text: 'Sato không truy hỏi riêng ai. Anh cho cả đội cùng hạ chồng ván xuống, buộc lại từ đầu, rồi nhắc lại một câu duy nhất: ở công trường này, không có nguy hiểm nào là “không phải việc của mình”. {name} cúi đầu — lần sau, {call} biết mình phải làm gì.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Chồng ván được hạ xuống, xếp lại ngay ngắn và buộc dây chắc chắn bởi cả đội. Giám sát Sato tự tay giật thử hai lần, gật đầu, rồi mới cho mọi người quay lại làm việc.' },
      { sp: 'Giám sát Sato', jp: '{危|あぶ}ないと{思|おも}ったら、STOPと{叫|さけ}べ。{誰|だれ}が{叫|さけ}んでもいいんだ。', text: '"Thấy nguy hiểm thì hô STOP. Ai hô cũng được." — Trước khi tản ra, Sato chốt lại câu ấy một lần nữa, nhìn khắp cả đội chứ không nhìn riêng ai.' },
      { sp: 'narr', text: 'Buổi chiều, gió mạnh lên thật, đúng như tờ KY dự đoán. Mấy tấm bạt che ở tầng 2 kêu phần phật, bụi bay mù lối đi — nhưng không có vật gì rơi xuống, và không có ai phải dừng việc vì bị thương.' },
      { sp: 'narr', text: 'Cuối ngày, {name} đi ngang qua bảng an toàn. Ô đếm ngày vẫn là 214 — và sáng mai, nó sẽ thành 215. {call} chợt thấy con số ấy không còn là con số của riêng ai nữa. Nó là số ngày mà cả đội, trong đó có cả người mới như mình, đã cùng nhau giữ được.' }
    ]
  },
  'seizo-senpai': {
    scene: '🏭 Nhà máy chế tạo — senpai Kobayashi chỉ việc',
    lines: [
      { sp: 'Senpai Kobayashi', jp: 'いいか。{機械|きかい}を{動|うご}かす{前|まえ}は、{必|かなら}ず{指差呼称|ゆびさしこしょう}だ。まず{電源|でんげん}を{見|み}ろ。{指|ゆび}をさして、{声|こえ}に{出|だ}せ。', vi: 'Nghe này. Trước khi chạy máy, bắt buộc phải chỉ tay và hô xác nhận. Trước hết nhìn vào nguồn điện. Chỉ tay vào, và hô thành tiếng.' },
      { sp: 'hero', jp: '{電源|でんげん}ヨシ！', vi: 'Điện — xong! (chỉ tay vào công tắc nguồn và hô to)' },
      { sp: 'Senpai Kobayashi', jp: 'よし。{次|つぎ}はチャックだ。{締|し}まっているか、{目|め}と{手|て}で{確|たし}かめろ。', vi: 'Tốt. Tiếp theo là mâm cặp. Kiểm tra xem đã siết chặt chưa, bằng cả mắt và tay.' },
      { sp: 'hero', jp: 'チャックヨシ！', vi: 'Mâm cặp — xong! (chỉ tay vào mâm cặp và hô to)' },
      { sp: 'Senpai Kobayashi', jp: 'じゃあ{始|はじ}めろ。あと、ネジが{落|お}ちたら{床|ゆか}に{置|お}くな。{赤|あか}い{箱|はこ}に{入|い}れろ。{理由|りゆう}は{後|あと}で{教|おし}える。', vi: 'Vậy thì bắt đầu đi. Thêm nữa: ốc mà rơi thì đừng để trên sàn. Bỏ vào hộp đỏ. Lý do thì lát nữa tôi sẽ nói.' },
      { sp: 'hero', jp: 'はい、わかりました。{落|お}ちたネジは{赤|あか}い{箱|はこ}に{入|い}れます。', vi: 'Vâng, tôi hiểu rồi ạ. Ốc rơi thì tôi sẽ bỏ vào hộp đỏ ạ.' },
      { sp: 'Senpai Kobayashi', jp: '{部品|ぶひん}を{十個|じゅっこ}{作|つく}ったら、{数|かず}を{数|かぞ}えて{報告|ほうこく}しろ。{途中|とちゅう}で{止|と}めるな。', vi: 'Làm xong mười chi tiết thì đếm số lượng rồi báo cáo. Đừng dừng giữa chừng.' },
      { sp: 'hero', jp: '{終|お}わりました。{十個|じゅっこ}できました。', vi: 'Xong rồi ạ. Đã làm được mười chi tiết ạ.' },
      { sp: 'Senpai Kobayashi', jp: 'よし、{見|み}せてみろ。…うん、{悪|わる}くない。{次|つぎ}はこの{材料|ざいりょう}だ。{機械|きかい}を{回|まわ}してみろ。', vi: 'Tốt, đưa tôi xem nào. …Ừm, không tệ. Tiếp theo là vật liệu này. Cho máy chạy thử đi.' },
      { sp: 'Senpai Kobayashi', jp: 'おい、どうした。{止|と}まったぞ。{顔|かお}が{青|あお}いぞ。', vi: 'Này, sao thế. Máy dừng rồi kìa. Mặt cậu tái đi rồi đấy.' },
      { sp: 'hero', jp: 'すみません、{変|へん}な{音|おと}がします。{止|と}めました。', vi: 'Xin lỗi, máy có tiếng kêu lạ ạ. Tôi đã dừng máy rồi ạ. (không tự ý sửa)' },
      { sp: 'Senpai Kobayashi', jp: '{正解|せいかい}だ。{自分|じぶん}で{直|なお}そうとするな。{音|おと}が{変|へん}なら{止|と}めて、すぐ{呼|よ}べ。それが{一番|いちばん}{大事|だいじ}な{仕事|しごと}だ。', vi: 'Đúng rồi đấy. Đừng cố tự sửa. Máy kêu lạ thì dừng lại và gọi ngay. Đó là việc quan trọng nhất.' },
      { sp: 'Senpai Kobayashi', jp: '{床|ゆか}を{見|み}ろ。ネジ{一本|いっぽん}も{落|お}ちていない。それでいいんだ。', vi: 'Nhìn sàn đi. Không có con ốc nào rơi cả. Như thế là tốt rồi đấy.' }
    ],
    wrong: {
      0: ['{電源|でんげん}、はい。', '{私|わたし}は{電源|でんげん}です。ヨシです。'],
      1: ['チャック、うん。', 'チャックをヨシしました。'],
      2: ['はい、ネジは{床|ゆか}に{置|お}きます。{後|あと}でいいです。', 'ネジ、{赤|あか}い{箱|はこ}を{入|い}れます。'],
      3: ['{終|お}わる。', '{私|わたし}は{終|お}わりました{人|ひと}です。'],
      4: ['すみません、{音|おと}が{変|へん}ですから、{私|わたし}が{直|なお}します。', '{変|へん}な{音|おと}、{聞|き}いた。{大丈夫|だいじょうぶ}だと{思|おも}う。']
    },
    outro: 'Cuối ca, {name} lau lại máy, xếp dụng cụ về đúng vạch kẻ trên bàn rồi mới tháo găng tay. Anh Kobayashi đi ngang, không nói gì, chỉ liếc xuống sàn một cái rồi gật đầu rất nhẹ — ở xưởng này, cái gật đầu ấy quý hơn một lời khen dài. {call} nhìn sàn nhà sạch bóng, không một con ốc, không một vệt dầu, và hiểu câu anh nói từ sáng: sàn sạch như một lời hứa. Hứa rằng người vào ca sau sẽ không trượt ngã, không dẫm phải ốc, và biết rằng người làm trước mình đã làm việc bằng cả sự cẩn thận.'
  },
  'seizo-board': {
    scene: '📌 Bảng đề xuất cải tiến 改善提案',
    branch: [
      { sp: 'narr', text: 'Giờ nghỉ trưa, {name} đứng trước tấm bảng đề xuất cải tiến ở góc xưởng Shinjuku. Bảng không lớn, nhưng ghim kín những phiếu nhỏ viết tay — mỗi phiếu là một ý kiến của một người trong xưởng, và dưới mỗi phiếu đều có dòng phản hồi viết bằng bút đỏ.' },
      { sp: 'Senpai Kobayashi', jp: 'それが{改善提案|かいぜんていあん}の{板|いた}だ。{読|よ}んでみろ。{新|あたら}しい{人|ひと}の{目|め}が、{一番|いちばん}よく{見|み}えるんだ。', text: '"Đó là bảng đề xuất cải tiến đấy. Đọc thử đi. Mắt của người mới là nhìn rõ nhất đấy." — Anh Kobayashi đứng sau lưng {name} từ lúc nào, tay cầm cốc trà.' },
      { sp: 'narr', text: 'Phiếu đầu tiên được ghim ở vị trí đẹp nhất: dời kệ dụng cụ lại gần máy số 2 — tiết kiệm 40 bước mỗi ca cho người đứng máy. Góc phiếu đóng dấu đỏ “đã duyệt”, và một dòng nhỏ ghi mức thưởng 1.000 yên. Không phải số tiền lớn, nhưng phiếu được giữ lại trên bảng như một tấm gương.' },
      { sp: 'narr', text: 'Phiếu thứ hai viết ngắn hơn: gắn gương ở góc khuất nơi xe nâng rẽ vào lối đi của người đi bộ, để hai bên nhìn thấy nhau sớm hơn. Phiếu này đang được xét — nhưng chỉ riêng việc nó được viết ra, đã có người trong xưởng gật gù bảo nhau: góc đó, ai cũng từng giật mình một lần.' },
      { sp: 'Senpai Kobayashi', jp: '{改善|かいぜん}は{小|ちい}さいことだ。{数字|すうじ}があって、すぐできること。それが{条件|じょうけん}だ。', text: '"Cải tiến là việc nhỏ thôi. Có con số đo được, và làm ngay được. Đó là điều kiện." — Anh Kobayashi nói gọn như mọi khi, rồi nhấp một ngụm trà.' },
      { sp: 'narr', text: 'Nghe tới chữ “con số”, {name} chợt nhớ tới chính mình: mỗi lần hết vật tư, {call} phải đi từ máy của mình tới kho vật tư ở cuối xưởng, rồi quay lại — một vòng như thế, ngày nào cũng vài lần. Nhưng là bao nhiêu bước, bao nhiêu phút, thì chưa bao giờ đếm thử.' },
      { sp: 'narr', text: 'Chiều hôm đó, tranh thủ lúc chờ máy chạy, {name} lặng lẽ đếm thử: từ máy của mình tới kho vật tư là 68 bước một chiều. Một ca đi bốn vòng là hơn 500 bước — toàn là bước đi không tạo ra một chi tiết nào. Và trên sàn, lối đi ấy còn cắt qua đúng góc khuất của xe nâng.' },
      {
        prompt: '{name} viết gì vào phiếu đề xuất của mình?',
        choice: [
          {
            label: 'Dán vạch dẫn đường từ kho vật tư tới máy của mình, kèm con số bước đã đo',
            fx: { jp: 3, love: 1 }, note: 'Phiếu đề xuất đã được ghim lên bảng cải tiến',
            say: [
              { sp: 'narr', text: '{name} nắn nót viết vào phiếu: dán vạch dẫn đường trên sàn, từ kho vật tư tới máy của mình, đi vòng qua lối an toàn thay vì cắt qua góc khuất xe nâng. Cuối phiếu là con số đã tự đo: 68 bước một chiều, một ca bốn vòng, hơn 500 bước — và một lần giật mình ở góc khuất.' },
              { sp: 'Senpai Kobayashi', jp: '{数字|すうじ}がある。{場所|ばしょ}も{分|わ}かる。いい{提案|ていあん}だ。{貼|は}っておけ。', text: '"Có con số. Địa điểm cũng rõ. Đề xuất tốt đấy. Ghim lên đi." — Anh Kobayashi tự tay lấy chiếc ghim đỏ, đưa cho {name}. Ghim đỏ là loại chỉ dùng cho phiếu đã được người phụ trách đọc và gật đầu.' },
              { sp: 'narr', text: 'Phiếu của {name} được ghim ngay cạnh hai phiếu mẫu. Tên người đề xuất viết ở góc dưới — là tên của {call}. Người mới nhất xưởng, và là phiếu thứ ba trên bảng tuần này.' }
            ]
          },
          {
            label: 'Viết đề xuất “tăng lương” thật chung chung cho cả xưởng',
            fx: { jp: 1 }, note: 'Đã được chỉ lại cách viết một đề xuất cải tiến',
            say: [
              { sp: 'narr', text: '{name} cầm bút, viết một dòng rất to và rất thật lòng: mong công ty tăng lương cho mọi người. Viết xong đọc lại, tự mình cũng thấy nó không giống hai phiếu mẫu chút nào — không có nơi nào cụ thể, không có con số nào, và cũng không có việc gì làm ngay được.' },
              { sp: 'Senpai Kobayashi', jp: 'はは、{気持|きも}ちは{分|わ}かる。でもそれは{改善|かいぜん}じゃない。{小|ちい}さいことを{書|か}け。', text: '"Ha ha, tấm lòng thì tôi hiểu. Nhưng đó không phải là cải tiến. Hãy viết việc nhỏ thôi." — Anh Kobayashi cười thành tiếng — lần đầu tiên {name} thấy anh cười như thế — rồi chỉ lại vào hai phiếu mẫu trên bảng.' },
              { sp: 'Senpai Kobayashi', jp: '{自分|じぶん}が{困|こま}っていることを{書|か}け。{数字|すうじ}を{付|つ}けてな。', text: '"Viết đúng cái việc đang làm cậu khó chịu ấy. Nhớ kèm con số vào." — Anh gõ nhẹ vào tờ phiếu trắng: cải tiến không phải là đòi một điều lớn lao, mà là sửa một điều bất tiện nhỏ, ngay trong tầm tay của mình.' },
              { sp: 'narr', text: '{name} cất tờ phiếu “tăng lương” vào túi áo — để nhớ một bài học vui — rồi lấy một tờ phiếu mới. Lần này, {call} biết mình phải đếm bước chân của chính mình trước đã.' }
            ]
          },
          {
            label: 'Không dám viết gì, sợ ý kiến của người mới bị cười',
            fx: { love: 1 }, note: 'Đã được đưa bút và động viên viết đề xuất đầu tiên',
            say: [
              { sp: 'narr', text: '{name} cầm tờ phiếu trắng, rồi lại đặt xuống. Mình mới vào xưởng chưa lâu, chữ còn viết chậm, việc còn chưa thạo — viết ra mà sai thì cả xưởng cười cho. Nghĩ vậy, {call} lặng lẽ quay lưng đi như chưa hề đứng trước bảng.' },
              { sp: 'Senpai Kobayashi', jp: 'おい。ペンを{持|も}て。{新|あたら}しい{人|ひと}が、{一番|いちばん}{不便|ふべん}に{気|き}づくんだ。', text: '"Này. Cầm lấy bút đi. Người mới là người nhận ra cái bất tiện rõ nhất đấy." — Anh Kobayashi gọi với theo, tay chìa ra một cây bút và một tờ phiếu mới.' },
              { sp: 'Senpai Kobayashi', jp: '{下手|へた}でいい。{思|おも}ったことを、そのまま{書|か}け。', text: '"Viết vụng cũng được. Nghĩ gì thì cứ viết đúng như thế." — Anh nói xong thì quay đi uống trà, như thể chuyện vừa rồi nhỏ xíu. Nhưng {name} hiểu: người quen việc lâu năm đã nhìn cái bất tiện thành quen, nên không còn thấy nó nữa. Chỉ người mới còn thấy rõ.' },
              { sp: 'narr', text: '{name} cầm cây bút đứng lại trước bảng thêm một lúc lâu. Tờ phiếu vẫn trắng — nhưng lần này, {call} không đặt nó xuống nữa. Tối nay về, việc đầu tiên là đếm lại cho kỹ những bước chân của mình trong một ca làm.' }
            ]
          }
        ]
      },
      { sp: 'narr', text: 'Cuối ca, bảng đề xuất vẫn sáng đèn huỳnh quang như mọi ngày. Có thêm một phiếu mới hay chưa, điều thay đổi rõ nhất không nằm trên bảng — mà nằm ở cách {name} bắt đầu nhìn xưởng này: không còn là nơi mình chỉ làm theo lời dặn, mà là nơi mình được phép làm cho nó tốt lên, từng việc nhỏ một.' },
      { sp: 'Senpai Kobayashi', jp: '{明日|あした}も、よく{見|み}ろ。{工場|こうじょう}は{目|め}で{良|よ}くなるんだ。', text: '"Mai cũng vậy, nhìn cho kỹ vào. Nhà máy tốt lên là nhờ đôi mắt của người làm trong đó đấy." — Anh Kobayashi khóa cửa xưởng, nói vọng lại một câu rồi đi trước.' },
      { sp: 'narr', text: 'Trên đường về, {name} đi chậm hơn mọi ngày một chút, mắt vô thức đếm từng bước chân trên vỉa hè. Hóa ra cải tiến không bắt đầu từ một ý tưởng lớn. Nó bắt đầu từ một người mới, dám nhìn kỹ vào điều bất tiện của chính mình — và dám viết nó ra giấy.' }
    ]
  }
});
