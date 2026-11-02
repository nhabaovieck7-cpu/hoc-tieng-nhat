// scenes-m4.js — HỒI KẾT CHƯƠNG 5 «LỚN RỒI» (Pha 3, lane M4):
// trận phỏng vấn cuối với Sếp Tanaka (7 prompt chấm điểm, tiền tố note
// 'Phỏng vấn cuối: đúng/sai') · quầy nyukan xin vĩnh trú + prompt hướng đi
// cuối gắn cờ 'saga-c5' (final:eiju / final:ve) · 4 kết cục ket-1..ket-4.
// Thể ngữ §8: phỏng vấn / nyukan dùng kính ngữ chuẩn mực; kết cục viết
// văn chương, trang trọng, trung tính về gia đình (không giả định con cái
// hay danh tính người thương cụ thể).
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= PHỎNG VẤN CUỐI — ĐỐI GƯƠNG NGÀY ĐẦU ================= */
  'c5-final-1': {
    scene: '💼 Chương 5 «Lớn rồi» — trận phỏng vấn cuối cùng',
    branch: [
      { sp: 'narr', text: 'Phòng họp nhỏ ở tầng cao nhất. Qua cửa kính, thành phố trải ra dưới nắng sớm — cùng một thành phố mà năm xưa {name} đáp xuống với hai bàn tay trắng và một cuốn sổ tay ghi chằng chịt những câu tiếng Nhật học vẹt. Hôm nay, {name} ngồi thẳng lưng trước bàn phỏng vấn cuối cùng: buổi phỏng vấn cho vị trí chính thức mà mình đã đi một chặng đường rất dài mới chạm tới được.' },
      { sp: 'narr', text: 'Người ngồi đối diện là Sếp Tanaka — gương mặt nghiêm, tập hồ sơ mở sẵn. {name} hít một hơi thật chậm. Bao nhiêu năm, bao nhiêu lần lắp bắp, bao nhiêu đêm học tới khuya — tất cả dồn về buổi sáng này.' },
      { sp: 'Sếp Tanaka', jp: 'では、{自己紹介|じこしょうかい}をお{願|ねが}いします。', text: '"Vậy, xin anh/chị tự giới thiệu. 「では、自己紹介をお願いします」 — đúng câu hỏi mở màn của ngày đầu tiên năm xưa, khi {name} chỉ biết đáp lại bằng một câu học thuộc lòng trong sách giáo khoa."' },
      {
        prompt: 'Câu hỏi 1/7 — Tự giới thiệu. Ngày đầu, {name} trả lời bằng câu học vẹt. Hôm nay, trả lời ở đẳng cấp N1 thế nào?',
        choice: [
          { label: 'Giới thiệu đĩnh đạc: quê quán, năm năm kinh nghiệm, N1, vai trò hướng dẫn hậu bối', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — tự giới thiệu N1: cấu trúc rõ, thành tích cụ thể, kính ngữ chuẩn', say: [
            { sp: 'hero', jp: '{私|わたし}はベトナム{出身|しゅっしん}です。{来日|らいにち}して{五年間|ごねんかん}、{介護|かいご}の{現場|げんば}で{働|はたら}きながら{日本語|にほんご}を{学|まな}び、{昨年|さくねん}、{日本語能力試験|にほんごのうりょくしけん}のN1に{合格|ごうかく}いたしました。{現在|げんざい}は{後輩|こうはい}の{指導|しどう}も{担当|たんとう}しております。{本日|ほんじつ}はどうぞよろしくお{願|ねが}いいたします。', text: '"Tôi quê ở Việt Nam. Năm năm kể từ khi sang Nhật, tôi vừa làm việc tại hiện trường chăm sóc, vừa học tiếng Nhật, và năm ngoái đã đỗ N1 kỳ thi năng lực tiếng Nhật. Hiện tại tôi cũng phụ trách hướng dẫn các hậu bối. Hôm nay xin được nhờ anh/chị giúp đỡ."' },
            { sp: 'Sếp Tanaka', jp: '{経歴|けいれき}がよく{伝|つた}わりました。ありがとうございます。', text: '"Tôi đã nắm rõ quá trình của anh/chị. Cảm ơn anh/chị." — Sếp Tanaka gật đầu, ghi một dòng dài vào hồ sơ. Không còn cái nhíu mày của ngày đầu tiên nữa.' } ] },
          { label: 'Đáp suồng sã như nói với bạn bè: "Tớ từ Việt Nam qua, tiếng Nhật cũng tàm tạm"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — tự giới thiệu suồng sã, thiếu kính ngữ, tự hạ thấp bản thân', say: [
            { sp: 'hero', jp: '{私|わたし}、ベトナムから{来|き}た。{日本語|にほんご}、ペラペラじゃないけど{大丈夫|だいじょうぶ}。よろしくね。', text: '"Tớ từ Việt Nam qua nè. Tiếng Nhật thì không trôi chảy lắm đâu nhưng cũng ổn ổn. Nhờ cả vào cậu nhé."' },
            { sp: 'Sếp Tanaka', jp: '…ここは{面接|めんせつ}の{場|ば}です。{言葉遣|ことばづか}いにはお{気|き}をつけください。', text: '"…Đây là buổi phỏng vấn. Xin anh/chị chú ý cách dùng từ." — không khí trong phòng chùng xuống thấy rõ. Năm năm đi qua, mà câu mở đầu lại quay về vạch xuất phát.' } ] },
          { label: 'Đọc thuộc lòng mẫu câu trong sách: tuổi, sở thích, số người trong gia đình', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — giới thiệu kiểu sách giáo khoa, lệch trọng tâm, không nói được năng lực', say: [
            { sp: 'hero', jp: '{私|わたし}は{今年|ことし}{二十五歳|にじゅうごさい}で、{趣味|しゅみ}は{歌|うた}を{歌|うた}うことです。{家族|かぞく}は{四人|よにん}います。{以上|いじょう}です。', text: '"Tôi năm nay hai mươi lăm tuổi, sở thích là hát. Gia đình tôi có bốn người. Hết ạ."' },
            { sp: 'Sếp Tanaka', jp: '{趣味|しゅみ}ではなく、{仕事|しごと}の{経験|けいけん}について{伺|うかが}いたいのですが。', text: '"Tôi muốn hỏi về kinh nghiệm công việc, chứ không phải sở thích ạ." — câu trả lời đúng từng chữ trong sách, mà sai hoàn toàn ở chỗ cần đúng nhất.' } ] }
        ]
      },
      { sp: 'narr', text: 'Sếp Tanaka lật sang trang tiếp theo của hồ sơ. Ngày đầu tiên, {name} từng ngồi ở một căn phòng giống thế này, mồ hôi ướt tay, nghe mà chỉ hiểu được một nửa. Hôm nay, từng câu hỏi đều nghe rõ — và từng câu trả lời đều là của chính mình, không vay mượn của sách vở nào.' },
      { sp: 'Sếp Tanaka', jp: '{経歴|けいれき}はよくわかりました。では{待遇|たいぐう}について{伺|うかが}います。{希望|きぼう}の{年収|ねんしゅう}はどのくらいですか。{理由|りゆう}も{合|あ}わせて{聞|き}かせてください。', text: '"Tôi đã rõ phần quá trình làm việc. Giờ xin hỏi về đãi ngộ. Anh/chị mong muốn mức lương năm khoảng bao nhiêu? Xin cho tôi nghe cả lý do."' },
      {
        prompt: 'Câu hỏi 2/7 — Đàm phán lương. Sếp Tanaka nói thêm: ngân sách của phòng ban năm nay khá eo hẹp. Đưa con số và lý do thế nào, và đáp sao cho đúng mực trước lời ép giá ấy?',
        choice: [
          { label: 'Đưa con số cụ thể kèm lý do thực tích; khi bị ép giá, giữ vững bằng kính ngữ, đề nghị xem xét theo lộ trình', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — đàm phán lương: con số rõ, lý do thực tích, đáp ép giá điềm tĩnh và có phương án', say: [
            { sp: 'hero', jp: '{希望年収|きぼうねんしゅう}は450{万|まん}{円|えん}を{考|かんが}えております。{現在|げんざい}の{実績|じっせき}と、N1{取得|しゅとく}、{後輩指導|こうはいしどう}の{役割|やくわり}を{踏|ふ}まえた{金額|きんがく}です。ご{検討|けんとう}いただけますと{幸|さいわ}いです。', text: '"Mức lương năm tôi mong muốn là 450 man yên. Đó là con số dựa trên thực tích hiện tại, việc đã đạt N1, và vai trò hướng dẫn hậu bối. Rất mong được anh/chị xem xét."' },
            { sp: 'Sếp Tanaka', jp: '{正直|しょうじき}、{予算|よさん}は{厳|きび}しいです。もう{少|すこ}し{下|さ}げられませんか。', text: '"Nói thật, ngân sách khá eo hẹp. Anh/chị có thể giảm xuống một chút được không?" — đòn ép giá quen thuộc của mọi bàn đàm phán.' },
            { sp: 'hero', jp: 'ご{事情|じじょう}は{承知|しょうち}いたしました。{金額|きんがく}そのものは{実績|じっせき}に{基|もと}づく{希望|きぼう}ですので、もし{難|むずか}しければ、{半年後|はんとしご}の{評価|ひょうか}で{見直|みなお}す{形|かたち}もご{相談|そうだん}できます。', text: '"Tôi hiểu tình hình của công ty ạ. Con số này dựa trên thực tích nên tôi xin giữ làm mức mong muốn; nếu hiện tại khó, tôi cũng có thể bàn phương án đánh giá lại sau nửa năm ạ." — không nhượng bộ trong hoảng loạn, cũng không cứng nhắc đến gãy. Đó là đàm phán.' } ] },
          { label: 'Đòi thật cao cho chắc: "Không được 500 man thì tôi không làm"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — đàm phán kiểu thách giá, tối hậu thư, thiếu căn cứ thực tích', say: [
            { sp: 'hero', jp: '{給料|きゅうりょう}は{高|たか}ければ{高|たか}いほどいいです。500{万|まん}くれないと{困|こま}ります。', text: '"Lương thì càng cao càng tốt ạ. Không được 500 man là tôi khó xử lắm."' },
            { sp: 'Sếp Tanaka', jp: '{根拠|こんきょ}のない{数字|すうじ}では、{検討|けんとう}のしようがありません。', text: '"Con số không có căn cứ thì chúng tôi không có cách nào xem xét được." — một câu nói làm cánh cửa vừa mở đã khép lại phân nửa.' } ] },
          { label: 'Né tránh: "Dạ bao nhiêu cũng được, tuỳ công ty ạ"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — đàm phán mơ hồ, không dám đưa con số, tự đánh mất vị thế', say: [
            { sp: 'hero', jp: '{金額|きんがく}は…{会社|かいしゃ}に{任|まか}せます。いくらでも{大丈夫|だいじょうぶ}です。', text: '"Dạ số tiền thì… tôi để tuỳ công ty ạ. Bao nhiêu cũng được ạ."' },
            { sp: 'Sếp Tanaka', jp: 'ご{自身|じしん}の{価値|かち}を、ご{自身|じしん}で{語|かた}れないのは{残念|ざんねん}です。', text: '"Không tự nói được giá trị của chính mình thì thật đáng tiếc." — nhún nhường không phải là khiêm tốn; trước bàn đàm phán, nó là tự bỏ cuộc.' } ] }
        ]
      },
      { sp: 'narr', text: 'Sếp Tanaka ngả lưng ra ghế một chút — dấu hiệu đầu tiên của sự thoải mái trong buổi phỏng vấn. Nhưng câu hỏi tiếp theo lại là câu khó nhất, loại câu không có trong bất kỳ giáo trình nào.' },
      { sp: 'Sếp Tanaka', jp: '{担当|たんとう}プロジェクトの{途中|とちゅう}で、メンバーが{急|きゅう}に{辞|や}めてしまったら、どう{対応|たいおう}しますか。', text: '"Nếu giữa một dự án đang phụ trách, một thành viên đột ngột nghỉ việc, anh/chị sẽ xử lý thế nào?"' },
      {
        prompt: 'Câu hỏi 3/7 — Xử lý khủng hoảng: đội có người bỏ việc giữa dự án gấp. Trả lời thế nào?',
        choice: [
          { label: 'Bình tĩnh đánh giá ảnh hưởng, phân lại việc theo ưu tiên, báo sớm cho cấp trên, bàn giao bằng văn bản', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — xử lý khủng hoảng có quy trình: đánh giá, phân việc, báo sớm, bàn giao văn bản', say: [
            { sp: 'hero', jp: 'まず{落|お}ち{着|つ}いて{影響|えいきょう}を{確認|かくにん}し、{残|のこ}った{業務|ぎょうむ}を{優先順位|ゆうせんじゅんい}で{分|わ}け{直|なお}します。{必要|ひつよう}なら{上司|じょうし}に{早|はや}めに{相談|そうだん}し、{引|ひ}き{継|つ}ぎを{文書|ぶんしょ}で{残|のこ}して、{誰|だれ}も{困|こま}らないようにします。', text: '"Trước hết tôi bình tĩnh xác nhận phạm vi ảnh hưởng, phân chia lại công việc còn lại theo thứ tự ưu tiên. Nếu cần, tôi trao đổi sớm với cấp trên, và để lại bàn giao bằng văn bản để không ai bị động."' },
            { sp: 'Sếp Tanaka', jp: '{具体的|ぐたいてき}で{現実的|げんじつてき}な{答|こた}えですね。', text: '"Câu trả lời cụ thể và thực tế." — Sếp Tanaka gật đầu chậm rãi, như thể vừa đặt một dấu tick lớn vào hồ sơ.' } ] },
          { label: 'Một mình gồng hết: "Tôi thức trắng làm thay, không sao đâu"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — xử lý khủng hoảng bằng cách tự gồng một mình, không bền vững, che giấu rủi ro', say: [
            { sp: 'hero', jp: '{大変|たいへん}です。とにかく{自分|じぶん}が{全部|ぜんぶ}{寝|ね}ないでやります。', text: '"Khó khăn lắm ạ. Dù sao tôi sẽ tự làm hết, thức trắng cũng làm."' },
            { sp: 'Sếp Tanaka', jp: '{一人|ひとり}で{抱|かか}え{込|こ}むのは、{長|なが}くは{続|つづ}きません。チームの{危機|きき}は、チームで{乗|の}り{越|こ}えるものです。', text: '"Ôm hết một mình thì không bền được. Khủng hoảng của cả đội phải do cả đội cùng vượt qua." — nhiệt tình không thay được phương án.' } ] },
          { label: 'Đổ trách nhiệm: "Ai nghỉ thì người đó chịu, không liên quan tới tôi"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — xử lý khủng hoảng bằng cách phủi trách nhiệm', say: [
            { sp: 'hero', jp: 'それは{辞|や}めた{人|ひと}の{責任|せきにん}です。{私|わたし}には{関係|かんけい}ありません。', text: '"Đó là trách nhiệm của người đã nghỉ. Không liên quan gì tới tôi ạ."' },
            { sp: 'Sếp Tanaka', jp: '…その{考|かんが}え{方|かた}では、リーダーは{任|まか}せられませんね。', text: '"…Với cách nghĩ đó, khó mà giao vị trí lãnh đạo được." — câu nói nhẹ mà nặng như một bản án.' } ] }
        ]
      },
      { sp: 'Sếp Tanaka', jp: '{新|あたら}しく{来日|らいにち}した{後輩|こうはい}に、どんな{方針|ほうしん}で{接|せっ}しますか。', text: '"Với hậu bối mới sang Nhật, anh/chị sẽ tiếp cận theo phương châm nào?" — hỏi câu này, Sếp Tanaka nhìn thẳng vào mắt {name}, như nhìn vào chính những năm tháng đã qua.' },
      {
        prompt: 'Câu hỏi 4/7 — Phương châm dạy hậu bối mới sang. Trả lời thế nào?',
        choice: [
          { label: 'Tạo quan hệ an toàn để dám hỏi; không trách lỗi, cùng tìm lý do và cách sửa — vì mình từng đi qua đúng con đường ấy', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — dạy hậu bối: an toàn tâm lý, sửa lỗi có lý do, đồng cảm từ trải nghiệm thật', say: [
            { sp: 'hero', jp: 'いきなり{厳|きび}しくするのではなく、まず{安心|あんしん}して{質問|しつもん}できる{関係|かんけい}を{作|つく}ります。{自分|じぶん}も{同|おな}じ{道|みち}を{通|とお}ってきたので、{間違|まちが}いは{責|せ}めず、{理由|りゆう}と{直|なお}し{方|かた}を{一緒|いっしょ}に{確認|かくにん}します。', text: '"Thay vì nghiêm khắc ngay từ đầu, tôi tạo mối quan hệ để hậu bối yên tâm đặt câu hỏi. Bản thân tôi cũng từng đi qua con đường ấy, nên tôi không trách móc lỗi sai, mà cùng xác nhận lý do và cách sửa."' },
            { sp: 'Sếp Tanaka', jp: '{自分|じぶん}の{経験|けいけん}が、{教|おし}える{力|ちから}になっているんですね。', text: '"Trải nghiệm của chính anh/chị đã thành sức mạnh để dạy người khác." — lần đầu tiên trong buổi phỏng vấn, giọng Sếp Tanaka ấm lên rõ rệt.' } ] },
          { label: 'Nghiêm khắc ngay từ đầu: "Ở Nhật là phải chịu đựng, yếu là không tồn tại được"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — dạy hậu bối bằng áp lực và đe nẹt, dập tắt người mới', say: [
            { sp: 'hero', jp: '{日本|にほん}では{我慢|がまん}が{大事|だいじ}だと、{最初|さいしょ}から{厳|きび}しく{言|い}います。', text: '"Tôi sẽ nói thật nghiêm ngay từ đầu rằng ở Nhật, chịu đựng là quan trọng nhất."' },
            { sp: 'Sếp Tanaka', jp: '{厳|きび}しさだけでは、{人|ひと}は{育|そだ}ちません。', text: '"Chỉ nghiêm khắc thôi thì không nuôi được người." — Sếp Tanaka khẽ lắc đầu.' } ] },
          { label: 'Dạy hết bằng tiếng Việt cho nhanh: "Tiếng Nhật từ từ rồi cũng biết"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — dạy hậu bối bằng cách né tiếng Nhật, làm thui chột người mới', say: [
            { sp: 'hero', jp: 'ベトナム{語|ご}だけで{全部|ぜんぶ}{教|おし}えます。{日本語|にほんご}はそのうち{覚|おぼ}えます。', text: '"Tôi dạy hết bằng tiếng Việt cho nhanh. Tiếng Nhật thì từ từ rồi cũng nhớ thôi ạ."' },
            { sp: 'Sếp Tanaka', jp: 'それでは、{後輩|こうはい}の{成長|せいちょう}を{止|と}めてしまいます。', text: '"Làm vậy là chặn đứng sự trưởng thành của hậu bối." — {name} chợt nhớ những ngày mình được senpai kiên nhẫn sửa từng câu tiếng Nhật, và hiểu ra mình vừa nói điều gì.' } ] }
        ]
      },
      { sp: 'narr', text: 'Buổi phỏng vấn đi vào chặng cuối. Ngoài cửa kính, nắng đã lên cao. {name} nhận ra tay mình khô ráo, giọng mình đều — sự điềm tĩnh này không phải bẩm sinh — nó là thành quả của năm năm rèn giũa, từng ngày một.' },
      { sp: 'Sếp Tanaka', jp: '{五年後|ごねんご}、ご{自身|じしん}はどうなっていたいですか。', text: '"Năm năm nữa, anh/chị muốn mình trở thành người thế nào?"' },
      {
        prompt: 'Câu hỏi 5/7 — Kế hoạch 5 năm tới. Trả lời thế nào?',
        choice: [
          { label: 'Mục tiêu rõ: thành người được giao hiện trường, đào tạo được hậu bối; lộ trình từng năm bằng資格 và thực tích', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — kế hoạch 5 năm cụ thể, có lộ trình từng năm, gắn với đóng góp cho tổ chức', say: [
            { sp: 'hero', jp: '{五年後|ごねんご}には、{現場|げんば}を{任|まか}せられるリーダーとして、{後輩|こうはい}を{育|そだ}てられる{存在|そんざい}になっていたいです。そのために、{資格|しかく}の{取得|しゅとく}と{実務|じつむ}の{経験|けいけん}を{一年|いちねん}ごとに{積|つ}み{重|かさ}ねていく{計画|けいかく}です。', text: '"Năm năm nữa, tôi muốn trở thành một lãnh đạo được tin cậy giao phó hiện trường, và là người đào tạo được hậu bối. Để đạt được điều đó, tôi có kế hoạch tích lũy chứng chỉ và kinh nghiệm thực tiễn theo từng năm."' },
            { sp: 'Sếp Tanaka', jp: '{計画|けいかく}に{段階|だんかい}があるのがいいですね。', text: '"Kế hoạch có từng giai đoạn rõ ràng, rất tốt." — cây bút của Sếp Tanaka lại ghi thêm một dòng.' } ] },
          { label: 'Mơ hồ: "Dạ… tới đâu hay tới đó, chắc sẽ ổn thôi ạ"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — kế hoạch 5 năm mơ hồ, phó mặc cho may rủi', say: [
            { sp: 'hero', jp: '{五年後|ごねんご}のことは…{正直|しょうじき}、まだわかりません。なるようになると{思|おも}います。', text: '"Chuyện năm năm nữa thì… thật ra tôi cũng chưa biết. Chắc tới đâu hay tới đó ạ."' },
            { sp: 'Sếp Tanaka', jp: '{目標|もくひょう}のない{人|ひと}に、{大|おお}きな{仕事|しごと}は{任|まか}せにくいものです。', text: '"Người không có mục tiêu thì khó giao việc lớn." — câu trả lời buông xuôi làm buổi phỏng vấn mất đi một nửa trọng lượng.' } ] },
          { label: 'Thực dụng suồng sã: "Chỗ nào lương cao hơn thì tôi qua chỗ đó"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — kế hoạch 5 năm chỉ xoay quanh lương, tuyên bố sẵn sàng nhảy việc', say: [
            { sp: 'hero', jp: '{五年後|ごねんご}は{給料|きゅうりょう}の{高|たか}いところに{行|い}きたいです。ここじゃなくてもいいです。', text: '"Năm năm nữa tôi muốn qua chỗ nào lương cao hơn. Không phải ở đây cũng được ạ."' },
            { sp: 'Sếp Tanaka', jp: '…そうですか。{率直|そっちょく}なご{意見|いけん}、ありがとうございます。', text: '"…Vậy à. Cảm ơn ý kiến thẳng thắn của anh/chị." — sự thẳng thắn đặt sai chỗ nghe như một lời chia tay sớm.' } ] }
        ]
      },
      { sp: 'Sếp Tanaka', jp: '{会社|かいしゃ}の{都合|つごう}で{長期間|ちょうきかん}の{残業|ざんぎょう}が{必要|ひつよう}になる{場合|ばあい}もあります。ご{家族|かぞく}との{時間|じかん}はどう{考|かんが}えますか。', text: '"Vì yêu cầu của công ty, có trường hợp phải tăng ca dài hạn. Anh/chị nghĩ thế nào về thời gian dành cho gia đình?" — câu hỏi cân não nhất buổi, hỏi về ranh giới giữa công việc và đời người.' },
      {
        prompt: 'Câu hỏi 6/7 — Công ty cần tăng ca dài hạn, gia đình cũng cần mình. Trả lời cân bằng, chuyên nghiệp thế nào?',
        choice: [
          { label: 'Sẵn sàng hợp tác mùa cao điểm; nếu dài hạn, xin trao đổi sớm để cùng xây cơ chế cân bằng sức khoẻ và gia đình', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — cân bằng tăng ca và gia đình: hợp tác có nguyên tắc, đề xuất trao đổi sớm và cơ chế bền vững', say: [
            { sp: 'hero', jp: '{繁忙期|はんぼうき}には{会社|かいしゃ}に{協力|きょうりょく}する{覚悟|かくご}はあります。{同時|どうじ}に、{長期間|ちょうきかん}になる{場合|ばあい}は、{早|はや}めに{相談|そうだん}しながら、{体調|たいちょう}と{家庭|かてい}の{両立|りょうりつ}ができる{体制|たいせい}を{一緒|いっしょ}に{考|かんが}えさせていただきたいです。', text: '"Vào mùa cao điểm, tôi sẵn sàng hợp tác với công ty. Đồng thời, nếu tăng ca kéo dài, tôi mong được trao đổi sớm để cùng xây dựng cơ chế cân bằng được sức khỏe và gia đình." — không hứa suông, không khước từ; đó là câu trả lời của một người đã lớn.' },
            { sp: 'Sếp Tanaka', jp: '{長|なが}く{働|はたら}くための{考|かんが}え{方|かた}ですね。{理解|りかい}しました。', text: '"Đó là cách nghĩ để làm việc được lâu dài. Tôi hiểu rồi." — Sếp Tanaka gật đầu, lần này là cái gật của sự đồng tình thật sự.' } ] },
          { label: 'Từ chối tuyệt đối: "Gia đình là số một, tăng ca dài hạn tôi không làm"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — cân bằng bằng cách từ chối tuyệt đối, đóng sập mọi thương lượng', say: [
            { sp: 'hero', jp: '{家族|かぞく}が{一番|いちばん}なので、{残業|ざんぎょう}はできません。きっぱり{断|ことわ}ります。', text: '"Gia đình là số một nên tôi không tăng ca được. Tôi xin từ chối dứt khoát."' },
            { sp: 'Sếp Tanaka', jp: '{立場|たちば}はわかりますが、{現場|げんば}が{回|まわ}らなくなる{心配|しんぱい}がありますね。', text: '"Tôi hiểu lập trường, nhưng lo là hiện trường sẽ không vận hành nổi." — đúng về tình cảm, mà thiếu hẳn tư duy tổ chức.' } ] },
          { label: 'Hứa quá đà: "Tôi tăng ca vô hạn cũng được, không ngủ cũng không sao"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — cân bằng bằng lời hứa quá đà, coi thường sức khoẻ, thiếu tin cậy', say: [
            { sp: 'hero', jp: '{残業|ざんぎょう}は{無限|むげん}にできます。{寝|ね}なくても{平気|へいき}です。', text: '"Tăng ca bao nhiêu tôi cũng làm được ạ. Không ngủ cũng không sao."' },
            { sp: 'Sếp Tanaka', jp: '{体|からだ}を{壊|こわ}す{約束|やくそく}は、{信用|しんよう}できません。', text: '"Lời hứa đánh đổi bằng sức khỏe thì không thể tin được." — nhiệt huyết thiếu chín chắn, trong mắt người quản lý lâu năm, là một rủi ro chứ không phải điểm cộng.' } ] }
        ]
      },
      { sp: 'Sếp Tanaka', jp: 'では{最後|さいご}に、{何|なに}かご{質問|しつもん}はありますか。', text: '"Cuối cùng, anh/chị có câu hỏi nào cho chúng tôi không?" — câu hỏi ngược, nơi người phỏng vấn thật ra vẫn đang chấm điểm.' },
      {
        prompt: 'Câu hỏi 7/7 — Câu hỏi ngược lại cho công ty. Hỏi câu nào cho thông minh?',
        choice: [
          { label: 'Hỏi về lộ trình thăng tiến và cơ chế đào tạo dành cho nhân sự trẻ', fx: { jp: 2 }, note: 'Phỏng vấn cuối: đúng — câu hỏi ngược thông minh: lộ trình thăng tiến và đào tạo, thể hiện tầm nhìn dài hạn', say: [
            { sp: 'hero', jp: '{若手|わかて}の{育成|いくせい}についてお{聞|き}きしたいです。{入社後|にゅうしゃご}、どのような{研修|けんしゅう}やキャリアパスの{仕組|しく}みがありますか。', text: '"Tôi xin hỏi về đào tạo nhân sự trẻ. Sau khi vào công ty, có những chương trình đào tạo và cơ chế lộ trình nghề nghiệp như thế nào ạ?"' },
            { sp: 'Sếp Tanaka', jp: 'いい{質問|しつもん}です。{研修|けんしゅう}は{入社後|にゅうしゃご}も{継続|けいぞく}して{行|おこな}っており、キャリアパスは{面談|めんだん}で{一緒|いっしょ}に{設計|せっけい}します。', text: '"Câu hỏi hay. Chương trình đào tạo vẫn tiếp tục sau khi vào công ty, và lộ trình nghề nghiệp sẽ được cùng thiết kế qua các buổi trao đổi định kỳ." — câu hỏi ngược đúng chỗ biến buổi phỏng vấn thành một cuộc trò chuyện giữa hai người cùng nhìn về một hướng.' } ] },
          { label: 'Không hỏi gì: "Dạ không có gì. Tôi về được chưa ạ?"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — câu hỏi ngược bị bỏ trống, tỏ ra thờ ơ với chính tương lai của mình', say: [
            { sp: 'hero', jp: '{質問|しつもん}は{特|とく}にありません。もう{帰|かえ}っていいですか。', text: '"Dạ tôi không có câu hỏi gì đặc biệt. Tôi về được chưa ạ?"' },
            { sp: 'Sếp Tanaka', jp: '…はい、{本日|ほんじつ}は{以上|いじょう}です。', text: '"…Vâng, hôm nay đến đây thôi." — cơ hội cuối cùng để ghi điểm trôi qua trong một câu nói cụt lủn.' } ] },
          { label: 'Hỏi dồn về tiền ngay: "Nghỉ phép dùng hết từ đầu được không, tăng ca có trả đủ không?"', fx: { pressure: 1 }, note: 'Phỏng vấn cuối: sai — câu hỏi ngược chỉ xoay quanh quyền lợi tiền bạc, hỏi dồn dập thiếu tế nhị', say: [
            { sp: 'hero', jp: '{有給|ゆうきゅう}は{初|はじ}めから{全部|ぜんぶ}{使|つか}えますか。{残業代|ざんぎょうだい}はちゃんと{出|で}ますか。', text: '"Nghỉ phép có được dùng hết ngay từ đầu không ạ? Tiền tăng ca có trả đủ không ạ?"' },
            { sp: 'Sếp Tanaka', jp: '{条件|じょうけん}の{確認|かくにん}は{大切|たいせつ}ですが、{順番|じゅんばん}というものがあります。', text: '"Xác nhận điều kiện là việc quan trọng, nhưng cũng có thứ tự của nó." — những câu hỏi không sai về nội dung, sai về thời điểm và cách hỏi.' } ] }
        ]
      },
      { sp: 'hero', jp: '{本日|ほんじつ}は{貴重|きちょう}なお{時間|じかん}をありがとうございました。', text: '"Hôm nay cảm ơn anh/chị đã dành thời gian quý báu ạ." {name} đứng dậy, cúi chào — cái cúi chào chậm, sâu và vững, khác hẳn cái cúi chào luống cuống của ngày đầu tiên.' },
      { sp: 'Sếp Tanaka', jp: '{本日|ほんじつ}はありがとうございました。{結果|けっか}は{後日|ごじつ}、{人事|じんじ}からご{連絡|れんらく}いたします。', text: '"Hôm nay cảm ơn anh/chị. Kết quả sẽ được bộ phận nhân sự liên lạc vào ngày khác." Sếp Tanaka bắt tay {name} — bàn tay bắt chắc, ánh mắt giữ lại thêm một nhịp so với thông thường. Không một lời tuyên bố nào được nói ra trong căn phòng này; phần còn lại thuộc về những ngày chờ đợi phía trước.' },
      { sp: 'narr', text: 'Ra khỏi tòa nhà, {name} đứng lại giữa dòng người giờ trưa, ngẩng nhìn bầu trời tháng năm trong vắt. Dù kết quả thế nào, có một điều đã chắc chắn: người bước ra khỏi phòng phỏng vấn hôm nay không còn là cậu học trò lắp bắp của ngày đầu nữa. Câu hỏi mở màn vẫn là câu hỏi ấy — chỉ có người trả lời là đã khác.' }
    ]
  },

  /* ================= NYUKAN — XIN VĨNH TRÚ + HƯỚNG ĐI CUỐI ================= */
  'c5-visa-final': {
    scene: '🛂 Nyukan — nộp hồ sơ xin vĩnh trú, và lựa chọn hướng đi cuối cùng',
    branch: [
      { sp: 'narr', text: 'Nyukan vào một buổi sáng thường ngày vẫn đông và im lặng như mọi lần {name} từng đến. Khác chăng là bìa hồ sơ hôm nay dày hơn tất cả những lần trước cộng lại: trong đó là cả một chặng đời — giấy tờ thuế của từng năm, quá trình làm việc, những con dấu nối tiếp nhau không đứt quãng. Đây không còn là hồ sơ gia hạn. Đây là hồ sơ xin vĩnh trú.' },
      { sp: 'Cán bộ nyukan', jp: '{永住許可申請|えいじゅうきょかしんせい}ですね。{申請書|しんせいしょ}と{在留|ざいりゅう}カード、パスポートをお{出|だ}しください。', text: '"Hồ sơ xin phép vĩnh trú phải không ạ. Xin anh/chị đưa đơn xin, thẻ lưu trú và hộ chiếu ra đây ạ."' },
      { sp: 'hero', jp: 'はい、こちらが{永住許可申請|えいじゅうきょかしんせい}の{書類一式|しょるいいっしき}です。{順番通|じゅんばんどお}りに{揃|そろ}えてありますので、ご{確認|かくにん}をお{願|ねが}いいたします。', text: '"Vâng ạ, đây là toàn bộ hồ sơ xin phép vĩnh trú. Tôi đã sắp xếp theo đúng thứ tự, xin anh/chị kiểm tra giúp ạ."' },
      { sp: 'Cán bộ nyukan', jp: '{税金|ぜいきん}の{納付状況|のうふじょうきょう}を{確認|かくにん}します。{住民税|じゅうみんぜい}や{年金|ねんきん}に{滞納|たいのう}はありませんか。', text: '"Tôi xin xác nhận tình hình nộp thuế. Thuế cư trú và nenkin của anh/chị có khoản nào nộp chậm không ạ?" — câu hỏi đầu tiên đã chạm vào xương sống của cả bộ hồ sơ.' },
      { sp: 'hero', jp: '{滞納|たいのう}はございません。{住民税|じゅうみんぜい}は{給与|きゅうよ}から{天引|てんび}きで、{年金|ねんきん}と{健康保険|けんこうほけん}も{同|おな}じです。{証明書|しょうめいしょ}も{添付|てんぷ}してあります。', text: '"Tôi không có khoản nộp chậm nào ạ. Thuế cư trú được khấu trừ từ lương, nenkin và bảo hiểm y tế cũng vậy. Giấy chứng nhận tôi cũng đã đính kèm đầy đủ ạ."' },
      { sp: 'Cán bộ nyukan', jp: '{昨年|さくねん}の{年収|ねんしゅう}と、{現在|げんざい}の{雇用|こよう}の{安定性|あんていせい}について{教|おし}えてください。', text: '"Xin cho tôi biết thu nhập năm ngoái và tính ổn định của công việc hiện tại." Giọng cán bộ đều đều, cây bút không ngừng ghi — căng thẳng mà công bằng, đúng như mọi lần.' },
      { sp: 'hero', jp: '{昨年|さくねん}の{年収|ねんしゅう}は{源泉徴収票|げんせんちょうしゅうひょう}のとおりです。{現在|げんざい}の{勤務先|きんむさき}では{正社員|せいしゃいん}として{安定|あんてい}して{働|はたら}いております。', text: '"Thu nhập năm ngoái của tôi đúng như trên giấy khấu trừ thuế tại nguồn ạ. Tại nơi làm việc hiện tại, tôi đang làm ổn định với tư cách nhân viên chính thức ạ."' },
      { sp: 'Cán bộ nyukan', jp: '{来日|らいにち}してから{今日|きょう}までの{経緯|けいい}を、{簡単|かんたん}に{説明|せつめい}してください。{転職|てんしょく}の{理由|りゆう}も{含|ふく}めてお{願|ねが}いします。', text: '"Xin anh/chị tóm tắt quá trình từ khi sang Nhật đến nay, bao gồm cả lý do chuyển việc." — câu hỏi xoáy đúng vào chỗ mà một đời người xa xứ khó tóm tắt nhất: cả hành trình.' },
      { sp: 'hero', jp: '{来日当初|らいにちとうしょ}は{言葉|ことば}もわからず、{毎日|まいにち}{勉強|べんきょう}と{仕事|しごと}の{両立|りょうりつ}でした。{転職|てんしょく}は{一度|いちど}だけで、{資格|しかく}を{活|い}かすための{前向|まえむ}きな{選択|せんたく}です。{届出|とどけで}もすべて{期限内|きげんない}に{行|おこな}っております。', text: '"Hồi mới sang, tôi không hiểu tiếng, mỗi ngày là vừa học vừa làm. Tôi chỉ chuyển việc một lần, đó là lựa chọn tích cực để phát huy chứng chỉ đã đạt được. Mọi khai báo tôi đều thực hiện trong thời hạn ạ." {name} nói chậm, rõ — mỗi câu là một năm.' },
      { sp: 'narr', text: 'Cán bộ lật hồ sơ rất lâu. Từng trang giấy là từng năm tháng: có năm gầy guộc, có năm khấm khá, có những giai đoạn mà chỉ người trong cuộc mới biết mình đã đi qua bằng cách nào. Quầy kính im lặng. Ngoài kia, hàng người chờ vẫn dài — ai cũng mang theo một đời người trong một bìa hồ sơ mỏng.' },
      { sp: 'Cán bộ nyukan', jp: '{永住|えいじゅう}を{希望|きぼう}する{理由|りゆう}と、{今後|こんご}の{生活|せいかつ}の{見通|みとお}しを{聞|き}かせてください。', text: '"Xin cho tôi nghe lý do anh/chị mong muốn vĩnh trú, và dự định cuộc sống sau này." — câu hỏi cuối cùng. Và cũng là câu hỏi mà {name} đã tự hỏi mình suốt nhiều đêm.' },
      {
        prompt: 'Đỉnh điểm của cả hành trình: {name} chọn hướng đi cuối cùng nào cho đời mình?',
        choice: [
          { label: 'Ở lại — xin vĩnh trú, gắn bó lâu dài với Nhật Bản', flag: 'saga-c5', value: 'final:eiju', fx: { jp: 2 }, note: 'Hướng đi cuối: ở lại — vĩnh trú, gắn bó lâu dài với Nhật', say: [
            { sp: 'hero', jp: '{私|わたし}はこの{国|くに}で{学|まな}び、{働|はたら}き、{多|おお}くの{方|かた}に{支|ささ}えられてきました。{今後|こんご}も{日本|にほん}を{生活|せいかつ}の{拠点|きょてん}として、{税金|ぜいきん}も{社会|しゃかい}の{一員|いちいん}としての{責任|せきにん}も、きちんと{果|は}たしてまいります。', text: '"Tôi đã học, đã làm việc, và được rất nhiều người ở đất nước này nâng đỡ. Sau này tôi vẫn lấy Nhật Bản làm nơi sinh sống lâu dài, và sẽ hoàn thành đàng hoàng cả nghĩa vụ thuế lẫn trách nhiệm của một thành viên trong xã hội."' },
            { sp: 'narr', text: 'Lời cam kết nói ra nhẹ nhàng mà nặng như một lời thề. Đất nước này đã lấy đi của {name} những năm tháng trẻ nhất — và cũng trả lại cho {name} một con người khác hẳn. Ở lại, không phải vì không còn đường về, mà vì đây đã thành một phần đời mình.' } ] },
          { label: 'Hồi hương — mang vốn và tiếng Nhật về Việt Nam dựng nghiệp', flag: 'saga-c5', value: 'final:ve', fx: { love: 2 }, note: 'Hướng đi cuối: hồi hương — mang vốn và tiếng Nhật về Việt Nam dựng nghiệp', say: [
            { sp: 'hero', jp: '{日本|にほん}で{得|え}た{言葉|ことば}と{経験|けいけん}を、{今後|こんご}は{故郷|こきょう}のために{活|い}かしたいと{考|かんが}えています。{永住|えいじゅう}の{申請|しんせい}は、{今|いま}の{自分|じぶん}の{記録|きろく}をきちんと{認|みと}めていただくための{申請|しんせい}です。どちらにしても、この{国|くに}への{感謝|かんしゃ}は{変|か}わりません。', text: '"Tôi muốn dùng tiếng Nhật và kinh nghiệm có được ở Nhật để phục vụ quê hương mình từ nay về sau. Hồ sơ xin vĩnh trú này là để quá trình sống đàng hoàng của tôi được ghi nhận một cách chính thức. Dù thế nào đi nữa, lòng biết ơn của tôi với đất nước này không hề thay đổi."' },
            { sp: 'narr', text: 'Về, không phải là bỏ cuộc. Về là mang theo tất cả những gì những năm tháng này đã rèn ra — thứ vốn không nằm trong vali, mà nằm trong chính con người mình. Quê nhà ở phía bên kia biển, và con đường về cũng là một con đường đi tới.' } ] }
        ]
      },
      { sp: 'Cán bộ nyukan', jp: 'はい、{承知|しょうち}いたしました。{書類|しょるい}は{確|たし}かに{受|う}け{取|と}りました。', text: '"Vâng, tôi đã rõ. Hồ sơ tôi xin nhận đủ." Cán bộ đóng dấu tiếp nhận lên phiếu — tiếng dấu gõ xuống mặt giấy khô và dứt khoát.' },
      { sp: 'hero', jp: 'ありがとうございました。ご{確認|かくにん}のほど、よろしくお{願|ねが}いいたします。', text: '"Cảm ơn anh/chị nhiều ạ. Xin nhờ anh/chị xác nhận giúp." {name} cúi chào. Mọi điều cần nói đã nói, mọi giấy tờ cần nộp đã nộp — bằng tất cả sự đàng hoàng tích lũy qua từng ấy năm.' },
      { sp: 'Cán bộ nyukan', jp: '{審査|しんさ}の{結果|けっか}は、はがきでお{知|し}らせします。{届|とど}くまで、{現在|げんざい}の{在留資格|ざいりゅうしかく}の{範囲内|はんいない}で{生活|せいかつ}してください。', text: '"Kết quả xét duyệt sẽ được thông báo bằng bưu thiếp. Trước khi bưu thiếp tới, xin anh/chị sinh hoạt trong phạm vi tư cách lưu trú hiện tại." Không kết quả nào được tuyên bố tại quầy này — chỉ có một tấm bưu thiếp sẽ đến trong một buổi chiều nào đó sắp tới.' },
      { sp: 'narr', text: '{name} bước ra khỏi tòa nhà nyukan, đứng rất lâu trên bậc thềm như những lần trước. Chỉ khác là lần này, trong tay không còn bìa hồ sơ nào nữa — hành trình giấy tờ đã đi đến trang cuối. Phần đời còn lại, từ đây, sẽ do chính mình viết tiếp.' }
    ]
  },

  /* ================= KẾT CỤC 1 — AN CƯ XỨ NGƯỜI ================= */
  'ket-1': {
    scene: '🏠 Kết cục «An cư xứ người»',
    branch: [
      { sp: 'narr', text: 'Chiều hôm ấy, về tới nhà, trong hòm thư có một tấm bưu thiếp trắng. {name} cầm nó lên bằng cả hai tay — lần này không còn hồi hộp như những lần chờ đợi trước, chỉ có một sự tĩnh lặng rất sâu. Vĩnh trú đã được cấp. Bao nhiêu năm đi qua các quầy kính, các hàng chờ, các con dấu — cuối cùng khép lại trong một tấm bưu thiếp mỏng.' },
      { sp: 'hero', text: '"Được rồi… Thật sự được rồi." {name} đứng yên giữa hiên nhà rất lâu, để cho câu nói ấy thấm xuống tận đáy lòng. Không phải niềm vui vỡ oà. Là niềm vui của người đã đi hết một con đường dài và biết chắc từng bước chân của mình đều đứng vững trên mặt đất.' },
      { sp: 'narr', text: 'Ngôi nhà nhỏ mua lại ở ngoại ô không lớn, nhưng có một khoảng sân vừa đủ trồng rau, một cửa sổ bếp đón nắng sáng, và tiếng tàu xa xa mỗi buổi chiều. Đêm đầu tiên ngủ trong nhà mình, {name} nghe tiếng mưa trên mái và nghĩ: hóa ra "an cư" không phải là một nơi chốn — nó là cảm giác không còn phải đếm ngược ngày tháng trên một tấm thẻ nữa.' },
      { sp: 'narr', text: 'Cuộc sống mới mở ra bằng những điều nhỏ bé và bền bỉ: cuối tuần người thương cùng {name} đi chợ sớm, chọn cá, chọn rau, cãi nhau rất khẽ về chuyện tối nay ăn gì. Bữa cơm nhà nấu trong căn bếp của chính mình, khói bay lên trong ánh đèn vàng — thứ hạnh phúc không ồn ào, không cần ai chứng kiến.' },
      {
        prompt: 'Một buổi tối yên bình trong ngôi nhà nhỏ, {name} nghĩ về chặng đường đã qua…',
        choice: [
          { label: 'Nghĩ về những người đã nâng đỡ mình — và muốn trở thành người như thế cho kẻ khác', fx: { love: 1 }, note: 'Kết cục 1: suy ngẫm — biết ơn và mong muốn nâng đỡ người đi sau', say: [
            { sp: 'narr', text: 'Từ senpai sửa cho từng câu kính ngữ, bà chủ phố gói ghém đồ ăn thừa, đến người bạn cùng ký túc những đêm mất ngủ — chẳng ai trong số họ biết rằng họ đã cùng nhau đỡ một con người đứng dậy. {name} thầm hứa: từ nay, đến lượt mình làm chiếc ô cho người khác trong những cơn mưa đầu tiên.' } ] },
          { label: 'Nghĩ về chính mình của ngày đầu — và mỉm cười với cậu ấy từ xa', fx: { love: 1 }, note: 'Kết cục 1: suy ngẫm — mỉm cười với chính mình của ngày đầu', say: [
            { sp: 'narr', text: 'Cậu trai năm ấy đứng lớ ngớ giữa sân bay, ôm cuốn sổ tay như ôm phao cứu sinh. Nếu gặp lại cậu ấy bây giờ, {name} sẽ không nói trước điều gì về những năm tháng sắp tới. Chỉ nói một câu thôi: cứ đi đi, đi cho đàng hoàng — rồi sẽ tới.' } ] }
        ]
      },
      { sp: 'narr', text: 'Một chiều cuối tuần, {name} ghé lại combini năm xưa — vẫn quầy hàng ấy, vẫn ánh đèn trắng ấy, chỉ có người đứng sau quầy thu ngân giờ đã là một gương mặt khác. {name} mua một lon cà phê, đứng nán lại gần cửa như một thói quen cũ.' },
      { sp: 'narr', text: 'Quầy tự thanh toán ở góc cửa hàng có một bạn trẻ đang loay hoay — vali còn dựng bên chân, điện thoại cầm trên tay mở sẵn ứng dụng dịch, mặt đỏ lên vì hàng người phía sau đang chờ. Cái dáng vẻ ấy quen thuộc đến nhói lòng: y hệt một người mà {name} từng biết rất rõ, nhiều năm về trước.' },
      { sp: 'Bạn trẻ', jp: 'すみません…この{機械|きかい}、どうやって{使|つか}うんですか。{全然|ぜんぜん}わからなくて…', text: '"Xin lỗi… cái máy này dùng thế nào vậy ạ? Cháu… em chẳng hiểu gì cả…"' },
      { sp: 'hero', jp: '{大丈夫|だいじょうぶ}ですよ。まずここを{押|お}して、{画面|がめん}の{案内|あんない}どおりに{進|すす}めば{大丈夫|だいじょうぶ}です。', text: '"Không sao đâu. Trước hết nhấn vào đây, rồi cứ làm theo hướng dẫn trên màn hình là được." {name} nói chậm rãi, điềm tĩnh, tay chỉ từng bước một — bằng thứ tiếng Nhật mà năm xưa mình từng ước ao có được.' },
      { sp: 'narr', text: 'Bạn trẻ làm theo, máy kêu tít một tiếng, hóa đơn chạy ra. Cậu cúi đầu cảm ơn rối rít, mắt đỏ hoe — không phải vì cái máy, mà vì giữa một nơi xa lạ hoàn toàn, có một người dừng lại vì mình. {name} chỉ cười, khoát tay: "Ai mới sang cũng vậy cả. Từ từ rồi quen."' },
      { sp: 'Bạn trẻ', text: '"Anh ở đây lâu chưa ạ? …Bao giờ em mới được như anh?" Câu hỏi ngây ngô và chân thành đến mức {name} phải quay đi một giây, giấu một nụ cười rất dài.' },
      { sp: 'hero', text: '"Không cần vội đâu. Cứ đi từng bước, sai thì sửa, ngã thì đứng dậy. Một ngày nào đó, chính em sẽ là người dừng lại giúp một người mới khác." {name} nói, và nghe chính giọng mình vang lên như lời của những senpai năm xưa đã nói với mình.' },
      { sp: 'narr', text: 'Ra khỏi combini, trời đã nhá nhem, đèn đường bật lên từng dãy. {name} đi bộ về nhà, lon cà phê ấm trong tay. Ngày đầu tiên đặt chân tới đất này, có người từng nói với {name} rằng ngày đầu cậu chẳng hiểu gì đâu — và quả thật, ngày đầu ấy, {name} chẳng hiểu gì thật. Nhưng vòng tròn đã khép: người chẳng hiểu gì năm xưa, hôm nay là người dừng lại, mỉm cười, và chìa tay ra cho một ngày đầu khác.' }
    ]
  },

  /* ================= KẾT CỤC 2 — VINH QUY ================= */
  'ket-2': {
    scene: '✈️ Kết cục «Vinh quy»',
    branch: [
      { sp: 'narr', text: 'Sân bay Nội Bài, buổi chiều muộn. Cửa đến quốc tế mở ra — và lần này, {name} không phải là người bị tiễn đi trong nước mắt. Lần này, phía sau hàng rào chờ là cả một đoàn người đứng đón: bố mẹ già đi trông thấy mà mắt sáng rỡ, anh em, họ hàng, và những bó hoa cầm sẵn trên tay. Ngày đi, người ta khóc tiễn một cậu trai gầy. Ngày về, người ta đón một con người đã khác.' },
      { sp: 'narr', text: 'Mẹ ôm chầm lấy {name} ngay giữa sảnh, bàn tay gầy gò vỗ nhẹ lên lưng như vỗ về một đứa trẻ vừa đi xa về — dù đứa trẻ ấy giờ đã cao hơn mẹ gần một cái đầu, vai đã rộng ra vì những năm tháng lao động. Bố đứng bên cạnh, không nói nhiều, chỉ nắm chặt tay con rất lâu. Có những lời yêu thương không cần đi qua miệng.' },
      { sp: 'hero', text: '"Con về rồi. Về hẳn, bố mẹ ạ." {name} nói, và thấy câu nói ấy rơi xuống nhẹ nhõm như đặt một gánh nặng đã mang nhiều năm xuống đất. "Những gì con học được bên ấy, con mang về hết đây rồi. Mình làm lại từ quê mình, bố mẹ nhé."' },
      { sp: 'narr', text: 'Những tuần đầu ở quê là những tuần sống chậm: sửa lại mái nhà cho bố mẹ, ăn những bữa cơm mà vị của chúng không nhà hàng nào ở Tokyo nấu ra được, đi hết một vòng họ hàng. Nhưng {name} không về để nghỉ ngơi. Trong cuốn sổ mang theo từ Nhật, trang cuối cùng đã viết sẵn một kế hoạch bằng hai thứ tiếng.' },
      { sp: 'narr', text: 'Mấy tháng sau, trên con phố nhỏ của thị trấn, một tấm biển mới được treo lên: một công ty nhỏ kết hợp quán ăn và lớp học — nơi {name} dùng chính vốn liếng của những năm xa xứ: tiếng Nhật, tay nghề, và cung cách làm việc học được từ những hiện trường khắt khe nhất. Thanh niên trong vùng bắt đầu tìm đến, ban đầu vì tò mò, sau vì nhìn thấy một con đường thật.' },
      { sp: 'narr', text: 'Lớp tiếng Nhật buổi tối sáng đèn đều đặn. {name} đứng trên bục, viết lên bảng những chữ kana đầu tiên — và chợt nhận ra cái dáng đứng ấy, giọng nói ấy, là của những người thầy năm xưa đã dạy mình. Kiến thức, hóa ra, là thứ duy nhất càng cho đi càng đầy thêm.' },
      { sp: 'narr', text: 'Ngày khai trương, quán nhỏ chật kín người: họ hàng, hàng xóm, học trò và cả những người chỉ ghé vì nghe tiếng. Bố mẹ ngồi ở bàn trong cùng, mặc bộ đồ đẹp nhất, nhìn con tiếp khách bằng cả hai thứ tiếng, mắt không giấu nổi niềm tự hào lặng lẽ. Món nợ năm xưa — món nợ đã đẩy {name} lên chuyến bay năm ấy — giờ được trả không chỉ bằng tiền, mà bằng cả một cơ nghiệp đang mở ra.' },
      { sp: 'Học trò', text: '"Thầy ơi, tháng sau em bay rồi. Em… em sợ lắm thầy ạ. Em chẳng biết gì cả, tiếng thì mới bập bẹ." Cậu học trò đầu tiên của lớp — gầy, đen, và có đúng ánh mắt của một người mà {name} từng biết rất rõ.' },
      { sp: 'hero', text: '"Sợ là đúng rồi. Ai đi mà chẳng sợ." {name} cười, đặt tay lên vai cậu học trò. "Thầy chỉ dặn một câu thôi: đi đường thẳng như mình. Đừng tắt đường, đừng vay đường của ai. Chậm cũng được, miễn là đàng hoàng. Tới nơi rồi, người ta sẽ nhìn cách em sống mà đánh giá em — không phải nhìn em đến từ đâu."' },
      { sp: 'Học trò', jp: '{行|い}ってきます。{先生|せんせい}、ありがとうございました。', text: '"Em đi đây ạ. Thầy, cảm ơn thầy." Cậu cúi chào rất sâu — cái cúi chào của người sắp bước qua một cánh cửa lớn của đời mình.' },
      { sp: 'narr', text: 'Buổi tối khai trương khép lại bằng một bữa cơm quây quần ngay trong quán. Tiếng cười nói rộn ràng, mùi thức ăn quê nhà, và qua khung cửa, con phố nhỏ lên đèn. {name} nâng chén trà, nhìn quanh một vòng: bố mẹ còn khỏe, cơ nghiệp vừa nhóm lửa, và những hạt giống đầu tiên đã gieo xuống đất quê hương.' },
      { sp: 'hero', text: '"Những năm ở Nhật không mất đi đâu cả." {name} nói khẽ, như nói với chính mình. "Chúng nó ở hết ở đây này — trong cái quán này, trong lớp học này, trong từng đứa học trò sắp lên đường. Mình không trở về tay không. Mình trở về để bắt đầu."' },
      { sp: 'narr', text: 'Đêm ấy, trước khi tắt đèn quán, {name} đứng ở cửa nhìn ra con phố quê yên tĩnh. Xa lắm, ở phía bên kia biển, có một đất nước đã rèn giũa mình bằng những năm tháng không dễ dàng — và ở ngay đây, một đất nước khác đang chờ mình dùng chính những rèn giũa ấy mà dựng xây. Vinh quy, hóa ra, không phải là trở về trong tiếng vỗ tay. Vinh quy là trở về với hai bàn tay đầy ắp, và một trái tim biết mình thuộc về đâu.' }
    ]
  },

  /* ================= KẾT CỤC 3 — LƯNG CHỪNG ================= */
  'ket-3': {
    scene: '🌙 Kết cục «Lưng chừng»',
    branch: [
      { sp: 'narr', text: 'Tấm thẻ lưu trú mới nằm trong phong bì trên bàn, hạn dài, thông tin in ngay ngắn. Về mặt giấy tờ, đây là một thành công — thứ thành công mà năm xưa {name} từng nằm mơ mới thấy. Vậy mà căn phòng đón nó chỉ có sự im lặng: một căn phòng gọn gàng đến mức trống trải, mọi thứ xếp đúng chỗ, và không có tiếng người thứ hai.' },
      { sp: 'hero', text: '"Được ở lại rồi…" {name} nói với căn phòng trống, và nghe giọng mình vang lên mỏng như một tờ giấy. Thành công, hóa ra, khi không có ai để chia, nó kêu lên một thứ tiếng rất khẽ và rất buồn.' },
      { sp: 'narr', text: 'Không ai nói đời {name} là thất bại. Trái lại: công việc ổn định, vị trí được nể trọng, sổ tiết kiệm dày lên theo từng năm, tiếng Nhật trôi chảy đến mức người ta quên mất đó là người nước ngoài. Mọi chỉ số mà một đời xa xứ thường được đo bằng đều nằm ở vạch xanh. Chỉ có một thứ không đo được bằng chỉ số nào — và thứ ấy đang rạn ra từng ngày, lặng lẽ.' },
      { sp: 'narr', text: 'Những cuộc gọi thưa dần. Những tin nhắn trả lời chậm đi, ngắn lại. Khoảng cách giữa hai bờ biển, sau cùng, không đo bằng cây số — nó đo bằng những lần định nói điều gì đó thật lòng rồi lại thôi. {name} không trách ai. Có những thứ vỡ không vì ai sai, chỉ vì đời người ta cứ thế mà trôi lệch khỏi nhau, mỗi người một dòng.' },
      { sp: 'narr', text: 'Đêm giao thừa. Ngoài cửa sổ, thành phố lên đèn rực rỡ, tiếng người đi lễ đầu năm râm ran xa xa. Trong phòng, {name} tự nấu một bữa ăn nhỏ cho một người: bát canh, đĩa cá, chén cơm — nấu vẫn ngon như đã nấu trăm lần, chỉ thiếu một đôi đũa nữa ở phía bên kia bàn.' },
      { sp: 'hero', text: '"Một mình thì cũng phải ăn cho đàng hoàng." {name} tự nhủ, xếp đôi đũa dự phòng vào ngăn kéo — không phải cất giấu đi, chỉ là để dành, như người ta để dành một chiếc ghế cho vị khách chưa biết có quay lại hay không.' },
      { sp: 'narr', text: 'Đúng thời khắc chuyển giao năm mới, điện thoại đổ chuông. Là nhà gọi sang. Màn hình hiện lên những gương mặt thân thuộc chen chúc trong một khung hình nhỏ: bố mẹ, anh em, tiếng cười nói lao xao, tiếng trẻ con, mùi Tết quê nhà như tràn qua cả sóng điện thoại.' },
      { sp: 'Mẹ', text: '"Con ăn Tết chưa? Bên ấy có lạnh lắm không? Giữ sức khỏe đấy, đừng có làm quá sức. Nhà mình vừa đốt pháo hoa ngoài sân, đẹp lắm — để mẹ quay cho con xem này." Mẹ nói một tràng, giọng cười mà mắt rơm rớm, như mọi bà mẹ trên đời khi gọi cho đứa con ở xa vào đúng đêm giao thừa.' },
      { sp: 'hero', text: '"Con ăn rồi, mẹ ạ. Ăn ngon lắm. Bố mẹ giữ sức khỏe nhé, năm mới con chúc cả nhà mình…" {name} nói, và nghẹn lại một nhịp ở giữa câu chúc — rồi cũng nói trọn được đến cuối, bằng một giọng cười vững vàng. Ở đầu dây bên kia, pháo hoa nổ sáng rực một góc trời quê, tiếng vọng qua điện thoại nghe nhỏ xíu mà ấm lạ.' },
      { sp: 'narr', text: 'Cuộc gọi kết thúc. Căn phòng trở lại im lặng, nhưng là một thứ im lặng khác — không còn trống rỗng như ban nãy, mà như vừa được ai đó thắp lên một ngọn đèn nhỏ ở góc xa. {name} đứng bên cửa sổ, nhìn thành phố xa lạ mà quen thuộc, và lần đầu tiên sau nhiều tháng, cho phép mình nghĩ thành lời điều vẫn né tránh.' },
      { sp: 'hero', text: '"Mình không mất hết. Mình chỉ đang ở lưng chừng thôi." {name} nói khẽ. "Giấy tờ xong rồi, công việc xong rồi — phần đời còn lại, mình vẫn chưa viết. Mà đời thì còn dài. Cái gì rạn, còn có thể hàn. Người nào lạc, còn có thể tìm. Bắt đầu lại từ một tin nhắn cũng được."' },
      { sp: 'narr', text: '{name} pha một ấm trà, mở cuốn sổ mới mua mà chưa viết chữ nào, và viết xuống dòng đầu tiên của năm mới — không phải kế hoạch công việc, mà là những cái tên. Những người mình nợ một lời hỏi thăm. Những người mình nợ một lời xin lỗi. Những người mình vẫn còn thương, dù đã xa nhau đến thế nào.' },
      { sp: 'narr', text: 'Đêm Tết ở xứ người khép lại như vậy: không pháo hoa trước cửa, không tiếng cười đầy nhà — chỉ có một người ngồi bên cửa sổ, một ấm trà, và một trang sổ vừa viết những dòng đầu tiên. Lưng chừng không phải là kết thúc. Lưng chừng chỉ là chỗ đứng của người đang nhìn lại cả hai phía — phía đã qua để biết ơn, và phía sắp tới để bắt đầu sửa lại đời mình. Trời còn chưa sáng, nhưng ở phương đông, một vệt hồng rất mỏng đã bắt đầu nhú lên.' }
    ]
  },

  /* ================= KẾT CỤC 4 — TAY TRẮNG ================= */
  'ket-4': {
    scene: '🧳 Kết cục «Tay trắng»',
    branch: [
      { sp: 'narr', text: 'Tấm bưu thiếp đến vào một buổi chiều không có gì đặc biệt. {name} mở hòm thư như mọi ngày — và đứng lặng đi giữa hành lang. Không được cấp. Chỉ mấy dòng chữ in lạnh lùng, và phía sau chúng là cả một chặng đời vừa bị khép lại: những vết gợn trong quá trình lưu trú của những năm tháng cũ, những giai đoạn mà sai lầm và thiếu sót đã âm thầm nằm lại trong hồ sơ, đến chặng cuối cùng thì lên tiếng.' },
      { sp: 'hero', text: '"…Vậy là đến đây thôi." {name} gấp tấm bưu thiếp lại rất cẩn thận, đặt vào ví như đặt một vật chứng của đời mình. Không khóc, không đập phá, không oán trách ai. Chỉ có một sự thật phải nhìn thẳng vào: con đường này, với mình, dừng tại đây.' },
      { sp: 'narr', text: 'Những ngày tiếp theo là những ngày của thủ tục và thu xếp: báo công ty, bàn giao công việc cho người kế tiếp bằng chính những tập văn bản ngăn nắp mà mình từng tự hào, làm các giấy tờ xuất cảnh trong hạn định. {name} làm mọi thứ chậm rãi và đàng hoàng — như cách mình đã sống ở đất này từ những ngày tỉnh táo nhất. Rời đi cũng là một phần của cách sống.' },
      { sp: 'narr', text: 'Rồi đến những ngày dọn phòng. Từng món đồ gắn với một năm tháng được xếp vào thùng hoặc gửi tặng lại người quen: chiếc nồi cơm đầu tiên, bộ đồ làm việc đã sờn, chồng sách tiếng Nhật chi chít ghi chú. Căn phòng dần trở lại trống như ngày đầu nhận phòng — chỉ khác là người dọn nó đi lần này hiểu rõ từng ngóc ngách của đời sống nơi đây, và rời đi không một chút bỡ ngỡ.' },
      { sp: 'narr', text: 'Trả nhà xong, {name} đi một vòng cuối quanh khu phố: combini đầu đường nơi mình từng lớ ngớ không biết dùng máy thanh toán, công viên nhỏ nơi mình từng ngồi ôn bài thi, hàng quán quen đã thuộc tên mình. Khu phố không biết nó đang tiễn một người — nó chỉ tiếp tục sáng đèn như mọi buổi chiều. Vậy mà {name} thấy biết ơn cả sự vô tình ấy: đời vẫn tiếp diễn, và mình đã từng là một phần của nó.' },
      { sp: 'Bà chủ phố', text: '"Về thật đấy à… Bao năm rồi còn gì. Thỉnh thoảng nhớ cái phố này thì gọi điện về nhé. Cái phòng trọ thì không còn, chứ quán của bà thì lúc nào cũng có một chỗ ngồi cho cháu." Bà chủ quán nhỏ ở góc phố dúi vào tay {name} một túi đồ ăn cho chuyến bay, giọng cằn nhằn mà mắt đỏ hoe.' },
      { sp: 'hero', jp: '{今|いま}までお{世話|せわ}になりました。ありがとうございました。', text: '"Cháu cảm ơn bà đã chăm sóc cháu suốt thời gian qua." {name} cúi chào thật sâu. Tiếng Nhật của mình — thứ tiếng đã mở ra và cũng khép lại chặng đời này — vẫn tròn vành rõ chữ trong lời chào cuối cùng với khu phố.' },
      { sp: 'narr', text: 'Đêm cuối cùng trong căn phòng trọ đã trả, nằm tạm ở nhà một người bạn, {name} ngồi viết một lá thư. Không gửi cho ai cả. Lá thư viết cho chính mình — cho cậu trai của ngày đầu tiên lên máy bay, và cho cả người đàn ông của nhiều năm sau nữa, nếu có lúc nào đó muốn đọc lại.' },
      { sp: 'hero', text: '"Nếu được làm lại — viết trong thư — tôi vẫn sẽ đi chuyến bay ấy. Tôi chỉ ước mình hiểu sớm hơn rằng mỗi con dấu, mỗi tờ giấy, mỗi ngày tháng đều là một phần của hồ sơ đời mình, và không có trang nào là không quan trọng. Tôi không mang về được những gì mình từng mơ. Nhưng tôi mang về được một con người biết đứng thẳng, biết nói lời tử tế bằng hai thứ tiếng, và biết rằng ngã ở đâu thì cũng phải tự mình phủi đất mà đi tiếp."' },
      { sp: 'narr', text: 'Ngày bay, sân bay đông như mọi ngày. Không có đoàn người tiễn đưa ồn ào như buổi sáng năm xưa ở quê nhà — chỉ có vài người bạn đứng lặng ở khu vực tiễn, những cái bắt tay chặt, những lời chúc ngắn. {name} kéo chiếc vali nhẹ hơn nhiều so với những gì một chặng đời dài như vậy thường để lại: món nợ quê nhà vẫn chưa trả hết, kế hoạch dang dở còn nguyên trong sổ. Về mặt vật chất, đây gần như là tay trắng.' },
      { sp: 'hero', text: '"Xin lỗi bố mẹ, con về mà chưa làm được như đã hứa." {name} nhìn qua ô cửa máy bay, nhìn đất Nhật thu nhỏ dần phía dưới cánh. "Nhưng con không còn là đứa trẻ của ngày ra đi nữa. Cái đó, không ai lấy của con được — và nó sẽ là vốn của con, ở bất cứ nơi nào con làm lại."' },
      { sp: 'narr', text: 'Máy bay xuyên qua tầng mây, hướng về phía tây, về quê nhà. Phía dưới, một đất nước khép lại sau lưng như một cuốn sách đã đọc đến trang cuối — có những chương rực rỡ, có những chương muốn xé đi, nhưng là một cuốn sách đã làm nên người đọc nó. Tay trắng, ừ thì tay trắng — nếu chỉ tính bằng tiền và giấy tờ. Còn nếu tính bằng con người, thì người ngồi trên chuyến bay này giàu hơn hẳn cậu trai của chuyến bay năm xưa, ở mọi nghĩa có thể nghĩ được.' },
      { sp: 'narr', text: 'Câu chuyện khép lại ở đó — không pháo hoa, không khải hoàn. Chỉ có một người trở về, mang theo một lá thư không gửi, một cái đầu đầy ắp hai thứ tiếng, và một phẩm giá nguyên vẹn không sứt mẻ qua từng ấy năm sóng gió. Đời người không đo bằng việc ta giữ được bao lâu ở một nơi chốn. Đời người đo bằng việc, dù kết cục thế nào, ta đã sống ở đó ra sao.' }
    ]
  }

  });
})();
