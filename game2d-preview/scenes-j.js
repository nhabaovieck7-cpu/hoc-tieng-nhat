// scenes-j.js — GÓI TÌNH CẢM & QUAN HỆ (giai đoạn 7 + 8, lệnh chủ trang 14:07–14:09 JST 31/10/2026).
// GIAI ĐOẠN 7 (tuyến tình cảm Chương 3): gặp gỡ ứng viên (Hằng cho mượn vở — mắt xích 6d-01 còn
// thiếu; Ren đầu bếp izakaya; Khôi — trai Việt MỚI) · nhịp cám dỗ đầu Ch3 · ARC ĐỔ VỠ YÊU XA
// (bị đá / cắm sừng — viết RIÊNG cho tuyến nam và tuyến nữ; giữ được người yêu) · chuỗi HỒI PHỤC
// (khóc ở phòng trọ → chọn cách vượt qua) · ĐƯỢC TÁN NGƯỢC · HẸN HÒ (rủ đi chơi / rủ về nhà chơi)
// · TỎ TÌNH cho 4 ứng viên: gái Nhật Yui (combini — thoại nhiều tiếng Nhật) · gái Việt Hằng
// (bạn cùng lớp) · trai Nhật Ren (đầu bếp izakaya) · trai Việt Khôi (bạn học, ấm, khác hẳn
// anh Tuấn/Đức). Điểm "quan tâm yêu xa", ngưỡng đổ vỡ và máy trạng thái quan hệ nằm ở rel.js
// (đăng ký ở KHUNG-GAME §4.10/§4.11) — file này chỉ chứa THOẠI.
// GIAI ĐOẠN 8 (hệ quan hệ có đồng ý): cảnh KẾT BẠN cho 6 NPC chính · cảnh KẾT ĐÔI cho 4 ứng viên ·
// cảnh đi chơi chung (karaoke hát đôi / dạo công viên) — trạng thái do rel.js quyết, cảnh chỉ diễn.
// Thể ngữ §8: Yui/Ren nói tiếng Nhật (có dịch dưới câu) — Yui teineigo mềm của nhân viên combini,
// Ren thể thường ấm của đầu bếp trẻ; người Việt nói tiếng Việt đời thường; chị Mai lịch sự, điềm đạm.
// Ghi chú máy: các lựa chọn "chấm điểm" (buổi hẹn, rủ về nhà, cám dỗ, hồi phục, tán ngược) mang
// note dạng câu tự nhiên có chứa mã ở đầu — rel.js đọc GAMEUI.log để cộng thiện cảm/điểm quan tâm,
// đúng tiền lệ nhịp điện thoại SIM của story.js. Tiền của buổi hẹn/đi chơi do rel.js trừ qua
// moneyTxn (reason 'date.*' / 'outing.*' / 'gift.*') — cảnh KHÔNG tự trừ tiền để khỏi trừ hai lần.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= GẶP GỠ ỨNG VIÊN ================= */
  'ch3-hang-vo': {
    scene: '📒 Hằng cho mượn vở — lớp tiếng 早稲田',
    branch: [
      { sp: 'narr', text: 'Giờ giải lao ở lớp tiếng 早稲田. {name} đang ngồi nhìn trang vở trống trơn — buổi trước nghỉ ốm, bài giảng hôm đó coi như mất trắng. Cô bạn cùng lớp ngồi bàn bên khẽ đẩy sang một cuốn vở chép tay nắn nót, chữ nào ra chữ nấy.' },
      { sp: 'Hằng', text: '"Vở của mình nè, {call} chép đi. Buổi trước thầy giảng phần trợ từ は và が kỹ lắm, mình có đánh dấu sao ở những chỗ hay thi. Chép xong nhớ mang trả, mai mình còn ôn." — Hằng, cô bạn Việt cùng lớp: học giỏi nhất lớp, thực tế, nói năng nhỏ nhẹ mà câu nào cũng có ích.' },
      {
        prompt: 'Nhận cuốn vở chép tay cẩn thận của Hằng, {name} nói gì?',
        choice: [
          { label: 'Cảm ơn đàng hoàng và hứa chép xong trả ngay mai', fx: { love: 2, jp: 1 }, note: 'Hằng cho mượn vở: cảm ơn đàng hoàng', say: [
            { sp: 'Hằng', text: '"Ừ, mai trả là được. À mà…" — Hằng ngập ngừng một chút — "phần ngữ pháp này khó, {call} chép mà không hiểu chỗ nào thì cứ hỏi mình. Hỏi người khác không bằng hỏi người cùng cảnh xa nhà."' },
            { sp: 'narr', text: 'Một cuốn vở cho mượn — chuyện nhỏ xíu ở quê nhà, mà ở xứ người nó ấm lạ thường: giữa một lớp học toàn người lạ, có một đồng hương sẵn lòng đưa tay ra trước.' }
          ] },
          { label: 'Đùa: "Cho mượn vở thế này là có ý gì với mình đây?"', fx: { love: 1 }, note: 'Hằng cho mượn vở: đùa vui', say: [
            { sp: 'Hằng', text: '"Có ý là… không muốn thấy người Việt mình trượt phỏng vấn vì thiếu một buổi học!" — Hằng cười, gõ nhẹ cuốn vở — "Đùa ít thôi, chép đi. Sang đây rồi, tiếng Nhật là cái cần câu cơm của cả hai đứa đấy."' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Từ hôm đó, bàn học của {name} và Hằng hay kê sát nhau hơn một chút trong giờ giải lao. Ở xứ người, thân nhau đôi khi bắt đầu chỉ từ một cuốn vở.' }
    ]
  },

  'ch3-ren-gap': {
    scene: '🍳 Gặp Ren — đầu bếp trẻ ở quán nhậu 新橋',
    branch: [
      { sp: 'narr', text: 'Tối nay {name} ghé quán nhậu 新橋 ăn khuya sau ca. Ngồi ở quầy counter, lần đầu {name} để ý người đầu bếp trẻ đứng bếp phía trong: tay thoăn thoắt, ít nói, nhưng món nào ra cũng được khách gật gù. Anh chủ quán giới thiệu: "Đây là Ren — đầu bếp của quán, trẻ nhất mà tay nghề nhất đấy."' },
      { sp: 'Ren', jp: '{初|はじ}めまして、{蓮|れん}です。いつも{来|き}てくれて、ありがとうございます。', text: '(Rất vui được gặp bạn, tôi là Ren. Cảm ơn bạn đã luôn ghé quán.) — Ren lau tay vào tạp dề, cúi chào gọn gàng đúng kiểu người làm bếp Nhật.' },
      { sp: 'Ren', jp: 'よかったら、これ、{食|た}べてみてください。{今日|きょう}の{新|あたら}しいメニューです。', text: '(Nếu bạn không ngại, ăn thử món này nhé. Món mới của hôm nay đấy.) — Ren đẩy sang một đĩa nhỏ: cá thu nướng muối, da giòn, thịt thơm — món thử không có trong thực đơn.' },
      {
        prompt: 'Ăn thử món Ren mời, {name} nhận xét sao?',
        choice: [
          { label: 'Khen thật lòng bằng tiếng Nhật', fx: { jp: 2, love: 2 }, note: 'Gặp Ren: khen món ăn bằng tiếng Nhật', say: [
            { sp: 'hero', jp: 'すごく{美味|おい}しいです。{皮|かわ}がパリッとしてて、{中|なか}はふっくらですね。', text: '(Ngon lắm ạ. Da giòn rụm mà thịt bên trong mềm mọng.)' },
            { sp: 'Ren', jp: '…{分|わ}かってくれましたか。{嬉|うれ}しいです。{食|た}べる{人|ひと}の{顔|かお}を{見|み}るのが、{料理人|りょうりにん}の{一番|いちばん}の{給料|きゅうりょう}ですから。', text: '(…Bạn nhận ra được à. Tôi vui lắm. Nhìn mặt người ăn là đồng lương lớn nhất của người đầu bếp mà.) — Ren cười, lần đầu trong buổi tối nụ cười chạm tới mắt.' }
          ] },
          { label: 'Ăn ngon quá quên cả nhận xét, chỉ gật đầu lia lịa', fx: { love: 1 }, note: 'Gặp Ren: gật đầu lia lịa', say: [
            { sp: 'narr', text: '{name} ăn một miếng, rồi miếng nữa, gật đầu không ngừng. Ren bật cười: ngon tới không nói nên lời là lời khen to nhất trong bếp. Từ hôm đó, ngồi quầy counter ở quán này bỗng thành một thói quen dễ chịu.' }
          ] }
        ]
      }
    ]
  },

  'ch3-khoi-gap': {
    scene: '🎒 Gặp Khôi — bạn học mới ở trường tiếng',
    branch: [
      { sp: 'narr', text: 'Kỳ học mới, lớp tiếng có thêm một bạn Việt mới chuyển tới: Khôi — người miền Trung, nói giọng ấm, học hành chắc chắn, vừa học vừa làm thêm ở kho vận 千葉. Giờ ra chơi, Khôi chủ động sang bắt chuyện {name} — người đã "có thâm niên" ở lớp.' },
      { sp: 'Khôi', text: '"Chào {call}, em mới chuyển lớp tới. Nghe thầy nói {call} học chắc nhất nhì lớp nên em qua làm quen trước, có gì không hiểu còn biết đường hỏi. Em tên Khôi — ở Nhật được hơn nửa năm rồi, vẫn còn lớ ngớ khoản kính ngữ lắm."' },
      {
        prompt: '{name} đáp lại Khôi thế nào?',
        choice: [
          { label: 'Nhận lời vui vẻ, chỉ luôn mấy mẹo học kính ngữ mình từng vấp', fx: { love: 2, jp: 1 }, note: 'Gặp Khôi: chia sẻ mẹo học', say: [
            { sp: 'Khôi', text: '"Trời, {call} nói một lèo em ghi được cả trang vở." — Khôi cười hiền — "Ở xứ này, gặp được người đi trước chịu chỉ lại từng chút thế này là quý lắm. Bữa nào em mời {call} ly cà phê cảm ơn nhé, đừng từ chối đấy."' },
            { sp: 'narr', text: 'Khôi khác hẳn kiểu senpai "môi giới" ồn ào: ít nói, chắc chắn, việc gì cũng nghĩ cho người khác một bước. Một người bạn đồng hương như thế, ở Nhật, đáng giá hơn nhiều mối quan hệ hào nhoáng.' }
          ] },
          { label: 'Giữ khoảng cách xã giao: "Ừ, có gì cứ hỏi thầy nhé"', fx: { pressure: 1 }, note: 'Gặp Khôi: giữ khoảng cách', say: [
            { sp: 'narr', text: 'Khôi gật đầu cười trừ, quay về chỗ. {name} nhìn theo, hơi áy náy: mình cũng từng là người mới, cũng từng mong có ai đó chịu chỉ cho một câu. Thôi thì… để lần sau vậy.' }
          ] }
        ]
      }
    ]
  },

  /* ================= NHỊP CÁM DỖ ĐẦU CHƯƠNG 3 (điểm quan tâm yêu xa) ================= */
  'ch3-cam-do-nam': {
    scene: '🌙 Một tối ở combini — lời rủ của Yui',
    branch: [
      { sp: 'narr', text: 'Tối muộn, {name} ghé combini mua đồ như thường lệ. Yui đang dọn kệ cuối ca. Thấy {name}, cô ấy ngập ngừng một lúc rồi lên tiếng — bằng thứ tiếng Nhật chậm rãi, dễ hiểu như mọi khi cô ấy vẫn dành cho "khách quen".' },
      { sp: 'Yui', jp: 'あの…{今週|こんしゅう}の{日曜日|にちようび}、{映画|えいが}を{見|み}に{行|い}きませんか。ずっと{見|み}たかったんですけど、{一人|ひとり}だと、ちょっと…', text: '(À… chủ nhật tuần này, bạn đi xem phim với tôi không? Tôi muốn xem lâu rồi, mà đi một mình thì hơi…) — Yui nói xong cúi mặt, vành tai đỏ lên.' },
      { sp: 'narr', text: 'Một lời rủ trong sáng, tử tế — không có gì sai ở phía Yui cả. Chỉ là ở quê nhà, vẫn còn một người đang đợi, với lời hứa ở sân bay hôm nào. Lựa chọn ở đây là của {name} — và nó sẽ được nhớ rất lâu.' },
      {
        prompt: '{name} trả lời Yui thế nào?',
        choice: [
          { label: 'Nhận lời đi xem phim — "bạn bè đi chơi thôi mà"', fx: { love: 2, pressure: 2 }, note: 'Điểm cám dỗ Ch3: đã tiến tới với người ở Nhật', say: [
            { sp: 'Yui', jp: 'ほんとですか。じゃあ、{日曜日|にちようび}、{駅|えき}の{前|まえ}で{待|ま}ってます。', text: '(Thật ạ? Vậy chủ nhật, tôi đợi bạn ở trước ga nhé.) — Yui cười rạng rỡ. {name} bước ra khỏi combini, lòng vừa vui vừa nặng: vui như nắng, nặng như đá — cả hai cùng một lúc.' },
            { sp: 'narr', text: 'Không ai làm gì sai trong buổi tối này. Nhưng có những cánh cửa, mở ra rồi thì không đóng lại như cũ được nữa.' }
          ] },
          { label: 'Từ chối khéo và nói thật: "Ở quê, tôi có người đang đợi"', fx: { jp: 2, love: 1 }, note: 'Điểm cám dỗ Ch3: đã dừng lại vì lời hứa', say: [
            { sp: 'hero', jp: 'ありがとう。でも、{国|くに}に{待|ま}ってくれている{人|ひと}がいるんです。だから、{映画|えいが}は…ごめんなさい。', text: '(Cảm ơn bạn. Nhưng ở quê, tôi có người đang đợi mình. Nên chuyện đi xem phim… tôi xin lỗi.)' },
            { sp: 'Yui', jp: '…そっか。{正直|しょうじき}に{言|い}ってくれて、ありがとう。そういう{人|ひと}、{素敵|すてき}だと{思|おも}います。', text: '(…Vậy à. Cảm ơn bạn đã nói thật với tôi. Tôi nghĩ một người như bạn… rất đáng quý đấy.) — Yui cười buồn một chút, rồi lại là Yui của quầy combini như mọi ngày. Có những lời từ chối làm người ta trọng nhau hơn cả lời đồng ý.' }
          ] }
        ]
      }
    ]
  },

  'ch3-cam-do-nu': {
    scene: '🌙 Sau ca tối ở quán nhậu — lời rủ của Ren',
    branch: [
      { sp: 'narr', text: 'Tối nay quán nhậu vắng khách lạ thường. Dọn bếp xong, Ren ngồi xuống đầu quầy phía {name}, rót cho cả hai ly trà — một việc chưa từng có. Anh nói chậm, mắt không nhìn thẳng, đúng kiểu người quen cầm dao hơn cầm lời.' },
      { sp: 'Ren', jp: 'あのさ…{今度|こんど}、{休|やす}みの{日|ひ}に、{築地|つきじ}の{市場|いちば}、{一緒|いっしょ}に{行|い}かない？ {魚|さかな}の{見方|みかた}、{教|おし}えたいと{思|おも}って。', text: '(À này… hôm nào được nghỉ, bạn có muốn đi chợ cá Tsukiji với tôi không? Tôi muốn chỉ bạn cách xem cá.)' },
      { sp: 'narr', text: 'Một lời rủ tử tế, trong sáng — lỗi không ở phía Ren. Chỉ là ở quê nhà, vẫn còn một người đang đợi, với lời hứa ở sân bay hôm nào. Lựa chọn ở đây là của {name} — và nó sẽ được nhớ rất lâu.' },
      {
        prompt: '{name} trả lời Ren thế nào?',
        choice: [
          { label: 'Nhận lời đi chợ cá — "đi học nghề thôi mà"', fx: { love: 2, pressure: 2 }, note: 'Điểm cám dỗ Ch3: đã tiến tới với người ở Nhật', say: [
            { sp: 'Ren', jp: 'ほんと？ よし、じゃあ{決|き}まり。{早起|はやお}きだよ、{市場|いちば}は{朝|あさ}だから。', text: '(Thật hả? Rồi, chốt nhé. Phải dậy sớm đấy, chợ cá là chuyện của buổi sáng mà.) — Ren cười, nụ cười của người vừa được cho một cơ hội. {name} về phòng, lòng vừa vui vừa nặng — cả hai cùng một lúc.' },
            { sp: 'narr', text: 'Không ai làm gì sai trong buổi tối này. Nhưng có những cánh cửa, mở ra rồi thì không đóng lại như cũ được nữa.' }
          ] },
          { label: 'Từ chối khéo và nói thật: "Ở quê, em có người đang đợi"', fx: { jp: 2, love: 1 }, note: 'Điểm cám dỗ Ch3: đã dừng lại vì lời hứa', say: [
            { sp: 'hero', jp: 'ありがとうございます。でも、{国|くに}に{待|ま}ってくれている{人|ひと}がいるんです。だから、そのお{誘|さそ}いは…すみません。', text: '(Cảm ơn anh. Nhưng ở quê, em có người đang đợi mình. Nên lời mời này… em xin lỗi.)' },
            { sp: 'Ren', jp: '…そっか。{正直|しょうじき}に{言|い}ってくれて、ありがとう。そういう{人|ひと}を、{大事|だいじ}にしてあげてね。', text: '(…Vậy à. Cảm ơn em đã nói thật. Hãy trân trọng người như thế nhé.) — Ren gật đầu, rót thêm trà, câu chuyện quay về món cá ngày mai như chưa có gì. Có những lời từ chối làm người ta trọng nhau hơn cả lời đồng ý.' }
          ] }
        ]
      }
    ]
  },

  /* ================= ARC ĐỔ VỠ YÊU XA — BIẾN THỂ BỊ ĐÁ ================= */
  'ch3-davut-nam': {
    scene: '💔 Cuộc gọi lúc nửa đêm — Linh',
    branch: [
      { sp: 'narr', text: 'Gần nửa đêm, điện thoại rung. Là Linh gọi video — nhưng khác mọi lần: không cười, mắt sưng, ngồi trong góc phòng tối ở quê. {name} chưa kịp hỏi gì, Linh đã nói trước, giọng nghẹn như đã tập nói câu này rất nhiều lần.' },
      { sp: 'Linh (qua điện thoại)', text: '"Mình nói chuyện này… mình nghĩ lâu lắm rồi. Mình không đợi nổi nữa. Không phải mình hết thương — mà là mình kiệt sức rồi. Mỗi ngày chờ một người ở cách nửa vòng trái đất, chờ tới mức không còn biết mình đang sống cho cái gì nữa."' },
      { sp: 'Linh (qua điện thoại)', text: '"Ở sân bay, mình hứa sẽ đợi. Mình đã cố — cố thật. Nhưng lời hứa hôm đó là của hai đứa mình lúc còn ở cạnh nhau. Còn bây giờ… mình xin lỗi. Mình trả lại lời hứa đây. {call} hãy sống tốt ở bên đó, đừng vì mình mà lỡ dở gì nữa."' },
      {
        prompt: 'Cổ họng {name} nghẹn lại. Câu đầu tiên thốt ra là…',
        choice: [
          { label: '"Xin em… cho anh thêm thời gian. Anh sắp xếp được rồi mình tính tiếp, được không?"', fx: { pressure: 3, hp: -2 }, note: 'Bị đá (tuyến nam): níu kéo trong cuộc gọi chia tay', say: [
            { sp: 'Linh (qua điện thoại)', text: '"Đừng. Xin đừng nói câu đó nữa." — Linh khóc thành tiếng — "Mình đã cho thời gian rồi, cho tới khi chính mình không còn gì để cho nữa. Nếu mình mềm lòng lần này, mấy tháng nữa lại đứng đúng chỗ này, chỉ đau hơn thôi. Mình xin lỗi… mình cúp máy đây. Tạm biệt."' },
            { sp: 'narr', text: 'Màn hình tối đi. Cuộc gọi kết thúc ở phút thứ mười một — bằng đúng thời gian của bao cuộc gọi vui vẻ trước đây cộng lại cũng không nặng bằng.' }
          ] },
          { label: 'Im lặng một lúc lâu, rồi nói khẽ: "Anh hiểu rồi. Cảm ơn em vì những tháng ngày qua"', fx: { pressure: 2, love: -2 }, note: 'Bị đá (tuyến nam): chấp nhận trong cuộc gọi chia tay', say: [
            { sp: 'Linh (qua điện thoại)', text: 'Linh khóc to hơn: "Sao tới lúc này anh vẫn nói chuyện tử tế được vậy… Giá mà anh giận mình, mắng mình, thì mình còn đỡ áy náy." — "Anh không giận. Người ta chỉ giận khi còn mong người kia ở lại. Còn anh… anh chỉ mong em sống khỏe." Cuộc gọi kết thúc bằng tiếng khóc ở cả hai đầu dây.' },
            { sp: 'narr', text: 'Không có ai phản bội ai trong câu chuyện này. Chỉ có khoảng cách — thứ kẻ thù không mặt mũi, thắng bằng cách mài mòn từng ngày một.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Điện thoại đặt xuống bàn, màn hình còn sáng hình nền là ảnh hai người ở sân bay hôm tiễn. Ngoài cửa sổ phòng trọ, trời bắt đầu mưa — thứ mưa Nhật Bản tháng ba, lạnh và dai dẳng như không định ngừng.' }
    ]
  },

  'ch3-davut-nu': {
    scene: '💔 Cuộc gọi lúc nửa đêm — Hải',
    branch: [
      { sp: 'narr', text: 'Gần nửa đêm, điện thoại rung. Là Hải — bạn trai ở quê của {name}. Nhưng khác mọi lần: anh không cười, mắt trũng, ngồi lặng trong phòng trọ ở quê nhà. {name} chưa kịp hỏi, Hải đã nói trước, như người đã tập nói câu này rất nhiều lần.' },
      { sp: 'Hải (qua điện thoại)', text: '"Anh nói chuyện này… anh nghĩ lâu lắm rồi. Anh không đợi nổi nữa. Không phải anh hết thương em — mà là anh kiệt sức rồi. Mỗi ngày chờ một người cách nửa vòng trái đất, chờ tới mức không biết mình sống cho cái gì nữa."' },
      { sp: 'Hải (qua điện thoại)', text: '"Ở sân bay, anh hứa sẽ đợi. Anh đã cố — cố thật. Nhưng lời hứa hôm đó là của hai đứa mình khi còn ở cạnh nhau. Còn bây giờ… anh xin lỗi. Anh trả lại lời hứa đây. Em hãy sống tốt ở bên đó, đừng vì anh mà lỡ dở gì nữa."' },
      {
        prompt: 'Cổ họng {name} nghẹn lại. Câu đầu tiên thốt ra là…',
        choice: [
          { label: '"Xin anh… cho em thêm thời gian. Em sắp xếp được rồi mình tính tiếp, được không?"', fx: { pressure: 3, hp: -2 }, note: 'Bị đá (tuyến nữ): níu kéo trong cuộc gọi chia tay', say: [
            { sp: 'Hải (qua điện thoại)', text: '"Đừng. Xin em đừng nói câu đó nữa." — Hải ôm mặt — "Anh đã cho thời gian rồi, cho tới khi chính anh không còn gì để cho nữa. Nếu anh mềm lòng lần này, mấy tháng nữa mình lại đứng đúng chỗ này, chỉ đau hơn thôi. Anh xin lỗi… anh cúp máy đây. Tạm biệt em."' },
            { sp: 'narr', text: 'Màn hình tối đi. Cuộc gọi kết thúc ở phút thứ mười một — bằng đúng thời gian của bao cuộc gọi vui vẻ trước đây cộng lại cũng không nặng bằng.' }
          ] },
          { label: 'Im lặng một lúc lâu, rồi nói khẽ: "Em hiểu rồi. Cảm ơn anh vì những tháng ngày qua"', fx: { pressure: 2, love: -2 }, note: 'Bị đá (tuyến nữ): chấp nhận trong cuộc gọi chia tay', say: [
            { sp: 'Hải (qua điện thoại)', text: 'Đầu dây bên kia im rất lâu, rồi là tiếng thở dài nghẹn lại: "Giá mà em mắng anh một trận… anh còn thấy đỡ hơn." — "Em không mắng. Người ta chỉ mắng khi còn mong người kia ở lại. Còn em… em chỉ mong anh sống khỏe." Cuộc gọi kết thúc trong im lặng ở cả hai đầu.' },
            { sp: 'narr', text: 'Không có ai phản bội ai trong câu chuyện này. Chỉ có khoảng cách — thứ kẻ thù không mặt mũi, thắng bằng cách mài mòn từng ngày một.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Điện thoại đặt xuống bàn, màn hình còn sáng hình nền là ảnh hai người ở sân bay hôm tiễn. Ngoài cửa sổ phòng trọ, trời bắt đầu mưa — thứ mưa Nhật Bản tháng ba, lạnh và dai dẳng như không định ngừng.' }
    ]
  },

  /* ================= ARC ĐỔ VỠ — BIẾN THỂ CẮM SỪNG ================= */
  'ch3-camsung-nam': {
    scene: '💔 Đối chất qua điện thoại — Linh',
    branch: [
      { sp: 'narr', text: 'Tin nhắn của Trang — bạn chung của hai đứa — đến từ chiều: một tấm ảnh chụp ở quán cà phê quê nhà. Linh ngồi cạnh một người con trai lạ, tay anh ta khoác vai cô ấy tự nhiên như đã quen thuộc từ lâu, còn Linh thì cười — nụ cười mà lâu rồi {name} chỉ được thấy qua màn hình. Dòng chữ của Trang ngắn ngủn: "Tao nghĩ mày nên biết. Xin lỗi."' },
      { sp: 'narr', text: '{name} ngồi nhìn tấm ảnh rất lâu, phóng to, thu nhỏ, như thể nhìn kỹ hơn thì sự thật sẽ khác đi. Rồi bấm gọi. Chuông đổ ba hồi. Linh bắt máy, giọng vui vẻ bình thường — chính cái bình thường đó làm {name} lạnh người.' },
      {
        prompt: '{name} mở lời thế nào?',
        choice: [
          { label: 'Gửi thẳng tấm ảnh sang: "Giải thích cho anh tấm ảnh này"', fx: { pressure: 3 }, note: 'Cắm sừng (tuyến nam): đối chất bằng tấm ảnh', say: [
            { sp: 'Linh (qua điện thoại)', text: 'Đầu dây bên kia im bặt gần một phút. Rồi Linh thở dài — tiếng thở dài của người vừa được tháo một gánh nặng: "…Thôi thì em nói thật. Anh ấy là đồng nghiệp, theo đuổi em nửa năm nay. Em đã từ chối nhiều lần… rồi có một hôm em ốm, anh ở xa không làm được gì, còn anh ấy thì có mặt. Em yếu lòng. Em xin lỗi."' },
            { sp: 'hero', text: '"Nửa năm… Nửa năm em để anh mỗi tối gọi về, kể chuyện Nhật, hứa hẹn tương lai — trong khi ở đó đã có người khác ở bên?"' },
            { sp: 'Linh (qua điện thoại)', text: '"Em biết em sai. Em không có gì để bào chữa cả. Chỉ là… ở xa nhau, tình cảm nó không chết trong một ngày đâu anh. Nó chết dần mỗi lần em cần một người ở cạnh mà anh không thể ở cạnh."' }
          ] },
          { label: 'Hỏi vòng quanh trước: "Dạo này… em có chuyện gì giấu anh không?"', fx: { pressure: 2 }, note: 'Cắm sừng (tuyến nam): hỏi vòng quanh trước khi đối chất', say: [
            { sp: 'Linh (qua điện thoại)', text: '"…Sao tự nhiên anh hỏi vậy?" — giọng Linh chột dạ đi thấy rõ. {name} gửi tấm ảnh sang. Im lặng. Rồi tiếng khóc nấc ở đầu dây bên kia: "Anh biết rồi à… Em xin lỗi. Em đã định nói nhiều lần mà không nói được. Em sai rồi, em biết em sai rồi…"' },
            { sp: 'narr', text: 'Lời xin lỗi đến sau sự thật thì chỉ còn là tiếng vang. {name} nghe tiếng khóc ở đầu dây bên kia mà thấy lòng mình trống rỗng lạ thường — hóa ra đau nhất không phải lúc phát hiện, mà là lúc nhận ra mình đã là người biết cuối cùng.' }
          ] }
        ]
      },
      { sp: 'hero', text: '"Vậy thì mình dừng ở đây thôi. Anh không chúc được em hạnh phúc đâu — anh chưa cao thượng được tới mức đó. Nhưng anh cũng không làm ầm ĩ. Từ nay, đừng nhắn cho anh nữa."' },
      { sp: 'narr', text: 'Cuộc gọi kết thúc. {name} ngồi yên trong phòng trọ tối, tay vẫn cầm điện thoại. Ở quê nhà, một mối tình chết đi không một tiếng động. Ở Nhật, mưa bắt đầu rơi ngoài cửa sổ.' }
    ]
  },

  'ch3-camsung-nu': {
    scene: '💔 Đối chất qua điện thoại — Hải',
    branch: [
      { sp: 'narr', text: 'Tin nhắn của Trang — bạn chung của hai đứa — đến từ chiều: một tấm ảnh chụp ở quán cà phê quê nhà. Hải ngồi cạnh một cô gái lạ, tay anh khoác vai cô ấy tự nhiên như đã quen thuộc từ lâu, còn Hải thì cười — nụ cười mà lâu rồi {name} chỉ được thấy qua màn hình. Dòng chữ của Trang ngắn ngủn: "Tao nghĩ mày nên biết. Xin lỗi."' },
      { sp: 'narr', text: '{name} ngồi nhìn tấm ảnh rất lâu, phóng to, thu nhỏ, như thể nhìn kỹ hơn thì sự thật sẽ khác đi. Rồi bấm gọi. Chuông đổ ba hồi. Hải bắt máy, giọng vui vẻ bình thường — chính cái bình thường đó làm {name} lạnh người.' },
      {
        prompt: '{name} mở lời thế nào?',
        choice: [
          { label: 'Gửi thẳng tấm ảnh sang: "Giải thích cho em tấm ảnh này"', fx: { pressure: 3 }, note: 'Cắm sừng (tuyến nữ): đối chất bằng tấm ảnh', say: [
            { sp: 'Hải (qua điện thoại)', text: 'Đầu dây bên kia im bặt gần một phút. Rồi Hải thở dài — tiếng thở dài của người vừa được tháo một gánh nặng: "…Thôi thì anh nói thật. Cô ấy là đồng nghiệp, quen nhau nửa năm nay. Anh đã giữ khoảng cách nhiều lần… rồi có một hôm nhà anh có việc, em ở xa không làm được gì, còn cô ấy thì có mặt. Anh yếu lòng. Anh xin lỗi."' },
            { sp: 'hero', text: '"Nửa năm… Nửa năm anh để em mỗi tối gọi về, kể chuyện Nhật, hứa hẹn tương lai — trong khi ở đó đã có người khác ở bên?"' },
            { sp: 'Hải (qua điện thoại)', text: '"Anh biết anh sai. Anh không có gì để bào chữa cả. Chỉ là… ở xa nhau, tình cảm nó không chết trong một ngày đâu em. Nó chết dần mỗi lần anh cần một người ở cạnh mà em không thể ở cạnh."' }
          ] },
          { label: 'Hỏi vòng quanh trước: "Dạo này… anh có chuyện gì giấu em không?"', fx: { pressure: 2 }, note: 'Cắm sừng (tuyến nữ): hỏi vòng quanh trước khi đối chất', say: [
            { sp: 'Hải (qua điện thoại)', text: '"…Sao tự nhiên em hỏi vậy?" — giọng Hải chột dạ đi thấy rõ. {name} gửi tấm ảnh sang. Im lặng rất lâu. Rồi giọng anh khàn đi: "Em biết rồi à… Anh xin lỗi. Anh đã định nói nhiều lần mà không nói được. Anh sai rồi…"' },
            { sp: 'narr', text: 'Lời xin lỗi đến sau sự thật thì chỉ còn là tiếng vang. {name} nghe đầu dây bên kia im lặng mà thấy lòng mình trống rỗng lạ thường — hóa ra đau nhất không phải lúc phát hiện, mà là lúc nhận ra mình đã là người biết cuối cùng.' }
          ] }
        ]
      },
      { sp: 'hero', text: '"Vậy thì mình dừng ở đây thôi. Em không chúc được anh hạnh phúc đâu — em chưa cao thượng được tới mức đó. Nhưng em cũng không làm ầm ĩ. Từ nay, đừng nhắn cho em nữa."' },
      { sp: 'narr', text: 'Cuộc gọi kết thúc. {name} ngồi yên trong phòng trọ tối, tay vẫn cầm điện thoại. Ở quê nhà, một mối tình chết đi không một tiếng động. Ở Nhật, mưa bắt đầu rơi ngoài cửa sổ.' }
    ]
  },

  /* ================= ARC YÊU XA — NHÁNH GIỮ ĐƯỢC NGƯỜI YÊU ================= */
  'ch3-giu-duoc-nam': {
    scene: '💗 Cuộc gọi lúc nửa đêm — Linh vẫn đợi',
    branch: [
      { sp: 'narr', text: 'Gần nửa đêm, điện thoại rung. Linh gọi video — lần này cô ấy cười, dù mắt hơi đỏ: "Mình gọi không phải để báo tin xấu đâu. Mình gọi vì hôm nay có chuyện muốn nói cho rõ, một lần cho xong."' },
      { sp: 'Linh (qua điện thoại)', text: '"Ở quê, có người theo đuổi mình. Điều kiện tốt, ở gần nhà. Bố mẹ mình cũng ưng. Mình đã từ chối rồi — từ chối xong mới gọi cho anh đây. Mình không giấu anh chuyện này, vì mình không muốn giữa hai đứa có cái gì phải giấu."' },
      {
        prompt: 'Nghe Linh nói thật hết, {name} đáp thế nào?',
        choice: [
          { label: '"Cảm ơn em đã nói thật. Anh hứa: sẽ không để em đợi vô hạn — mình cùng đặt một mốc rõ ràng"', fx: { love: 3, pressure: -2 }, note: 'Giữ được người yêu (tuyến nam): đặt mốc rõ ràng', say: [
            { sp: 'Linh (qua điện thoại)', text: '"Ừ — có mốc rồi thì đợi cũng khác. Mình không cần giàu sang gì đâu, mình cần biết là mình đang đợi CÁI GÌ, và tới BAO GIỜ." — Linh cười qua màn hình, nụ cười nhẹ nhõm nhất từ ngày hai đứa xa nhau.' },
            { sp: 'narr', text: 'Đêm đó, hai người ngồi vạch ra một kế hoạch thật: mốc thi, mốc visa, mốc về thăm nhà đầu tiên. Tình yêu xa không sống bằng lời hứa suông — nó sống bằng những cột mốc cụ thể mà cả hai cùng nhìn thấy.' }
          ] },
          { label: '"Anh xin lỗi vì đã để em phải một mình chống chọi với những lúc như thế"', fx: { love: 2, pressure: -1 }, note: 'Giữ được người yêu (tuyến nam): xin lỗi và cảm ơn', say: [
            { sp: 'Linh (qua điện thoại)', text: '"Đừng xin lỗi. Xa nhau là lựa chọn của cả hai đứa mà." — Linh lắc đầu — "Mình chỉ cần anh đừng quên: ở đây vẫn có một người đang cố cùng anh. Anh cố, mình cố — thế là đủ."' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Cuộc gọi kết thúc lúc trời gần sáng. Lời hứa ở sân bay không còn là một câu nói của ngày chia tay nữa — nó đã thành một kế hoạch, có ngày tháng, có hai người cùng giữ. (Tuyến yêu xa đi tiếp — những nhịp thăm nhau/đoàn tụ dựng trên hệ đi lại sẽ mở ở các chương sau.)' }
    ]
  },

  'ch3-giu-duoc-nu': {
    scene: '💗 Cuộc gọi lúc nửa đêm — Hải vẫn đợi',
    branch: [
      { sp: 'narr', text: 'Gần nửa đêm, điện thoại rung. Hải gọi video — lần này anh cười, dù mắt hơi đỏ: "Anh gọi không phải để báo tin xấu đâu. Anh gọi vì hôm nay có chuyện muốn nói cho rõ, một lần cho xong."' },
      { sp: 'Hải (qua điện thoại)', text: '"Ở quê, có người để ý anh. Điều kiện tốt, ở gần nhà. Anh đã từ chối rồi — từ chối xong mới gọi cho em đây. Anh không giấu em chuyện này, vì anh không muốn giữa hai đứa có cái gì phải giấu."' },
      {
        prompt: 'Nghe Hải nói thật hết, {name} đáp thế nào?',
        choice: [
          { label: '"Cảm ơn anh đã nói thật. Em hứa: sẽ không để anh đợi vô hạn — mình cùng đặt một mốc rõ ràng"', fx: { love: 3, pressure: -2 }, note: 'Giữ được người yêu (tuyến nữ): đặt mốc rõ ràng', say: [
            { sp: 'Hải (qua điện thoại)', text: '"Ừ — có mốc rồi thì đợi cũng khác. Anh không cần gì nhiều đâu, anh cần biết là mình đang đợi CÁI GÌ, và tới BAO GIỜ." — Hải cười qua màn hình, nụ cười nhẹ nhõm nhất từ ngày hai đứa xa nhau.' },
            { sp: 'narr', text: 'Đêm đó, hai người ngồi vạch ra một kế hoạch thật: mốc thi, mốc visa, mốc về thăm nhà đầu tiên. Tình yêu xa không sống bằng lời hứa suông — nó sống bằng những cột mốc cụ thể mà cả hai cùng nhìn thấy.' }
          ] },
          { label: '"Em xin lỗi vì đã để anh phải một mình chống chọi với những lúc như thế"', fx: { love: 2, pressure: -1 }, note: 'Giữ được người yêu (tuyến nữ): xin lỗi và cảm ơn', say: [
            { sp: 'Hải (qua điện thoại)', text: '"Đừng xin lỗi. Xa nhau là lựa chọn của cả hai đứa mà." — Hải lắc đầu — "Anh chỉ cần em đừng quên: ở đây vẫn có một người đang cố cùng em. Em cố, anh cố — thế là đủ."' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Cuộc gọi kết thúc lúc trời gần sáng. Lời hứa ở sân bay không còn là một câu nói của ngày chia tay nữa — nó đã thành một kế hoạch, có ngày tháng, có hai người cùng giữ. (Tuyến yêu xa đi tiếp — những nhịp thăm nhau/đoàn tụ dựng trên hệ đi lại sẽ mở ở các chương sau.)' }
    ]
  },

  /* ================= CHUỖI HỒI PHỤC ================= */
  'ch3-khoc': {
    scene: '🌧 Phòng trọ, một mình — cơn mưa trong nhà',
    branch: [
      { sp: 'narr', text: 'Về tới phòng trọ, {name} không bật đèn. Ngồi xuống góc phòng quen thuộc, mở điện thoại, lướt lại album ảnh: ảnh sân bay, ảnh tin nhắn chúc Tết, ảnh chụp màn hình những cuộc gọi cười đùa. Ngón tay dừng ở nút xóa rất lâu.' },
      { sp: 'narr', text: 'Rồi nước mắt đến — không báo trước, không kìm được. Khóc cho người ở quê, khóc cho chính mình của những tháng ngày cố gắng, khóc cho lời hứa ở sân bay mà cả hai phía đều đã cố hết sức. Ngoài cửa sổ, mưa rơi đều đều xuống những con phố 吉祥寺 ướt sũng.' },
      {
        prompt: 'Khóc một trận đã đời xong, {name} làm gì với album ảnh?',
        choice: [
          { label: 'Xóa hết — giữ lại thì chỉ đau thêm', fx: { hp: -2, pressure: 2 }, note: 'Sau đổ vỡ: xóa hết ảnh người yêu cũ', say: [
            { sp: 'narr', text: 'Từng tấm ảnh biến mất khỏi màn hình. Tới tấm cuối cùng — tấm ở sân bay, hai đứa cười toe toét sau lưng là bảng chuyến bay — ngón tay run lên, dừng ba giây… rồi cũng bấm. Album trống đi. Lòng cũng trống đi một khoảng. Nhưng ít nhất, từ mai, mở điện thoại lên sẽ không còn bị quá khứ níu lại nữa.' }
          ] },
          { label: 'Gom vào một thư mục riêng, cất sâu — chưa xóa được, nhưng không xem nữa', fx: { hp: -1, pressure: 1 }, note: 'Sau đổ vỡ: cất ảnh vào thư mục riêng', say: [
            { sp: 'narr', text: '{name} tạo một thư mục tên vỏn vẹn một dấu chấm, chuyển hết ảnh vào đó, chôn sâu giữa trăm thư mục khác. Chưa xóa được — nhưng cũng là một cách nói lời tạm biệt: không phải mọi thứ kết thúc đều phải biến mất; có những thứ chỉ cần được cất đi tử tế.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Đêm đó {name} ngủ chập chờn, tỉnh dậy mấy lần. Sáng ra, mắt sưng húp, soi gương tự cười chua chát: "Được rồi. Khóc thì khóc hết hôm qua rồi. Hôm nay… tính tiếp."' }
    ]
  },

  'ch3-hoi-phuc': {
    scene: '🌤 Gượng dậy — bạn bè không để mình gục',
    branch: [
      { sp: 'narr', text: 'Tin {name} chia tay lan nhanh trong hội bạn ở Nhật theo cách của xứ này: không ai hỏi thẳng, nhưng Hùng xuất hiện trước cửa phòng với hai lon trà và một túi đồ ăn: "Không hỏi gì đâu. Ngồi ăn đi đã." Chị Mai thì nhắn một tin dài: dặn ngủ đủ, ăn đủ, và "buồn thì buồn cho tử tế, đừng buồn kiểu phá hoại bản thân".' },
      { sp: 'Hùng "sẹo"', text: '"Anh từng bị đá hồi mới sang, khóc trong phòng tắm ký túc ba ngày liền." — Hùng khui lon trà, tỉnh bơ — "Xong rồi sao? Rồi cũng phải dậy đi làm, vì không đi làm là không có tiền gửi về. Đau thật đấy, nhưng người xa xứ có một cái hay: bận quá nên không có thời gian gục lâu. Chọn đi — gượng dậy kiểu nào?"' },
      {
        prompt: '{name} chọn cách vượt qua giai đoạn này:',
        choice: [
          { label: 'Vùi đầu vào học và làm — biến nỗi đau thành điểm thi', fx: { jp: 4, hp: -1 }, note: 'Cách gượng dậy: vùi đầu vào học và làm', say: [
            { sp: 'narr', text: 'Từ hôm đó, {name} học như chưa từng học: sáng dậy sớm ôn từ vựng, tối ngồi bàn học tới khuya, ca nào trống cũng nhận. Buồn thì vẫn buồn — nhưng mỗi trang vở chép kín là một ngày không chìm. Vài tuần sau, thầy Khánh nhắn: "Dạo này tiến bộ hẳn đấy." Nỗi đau, hóa ra, cũng là một loại nhiên liệu — đốt đúng cách thì nó đẩy mình đi rất xa.' }
          ] },
          { label: 'Nhậu triền miên cho quên — tối nào cũng say', fx: { hp: -4, pressure: 3, money: -0.5 }, note: 'Cách gượng dậy: nhậu triền miên (hậu quả xấu)', say: [
            { sp: 'narr', text: 'Một tuần liền, tối nào phòng {name} cũng có tiếng khui lon. Say thì quên thật — quên được đúng tới sáng hôm sau, khi đầu đau như búa bổ và nỗi buồn quay lại nguyên vẹn, cộng thêm tiền nhà tháng này hụt đi một khoản. Chị Mai ghé qua, không mắng, chỉ dọn đống vỏ lon và nói một câu: "Uống để quên thì quên được một đêm. Còn sống để nhớ tử tế thì quên được cả đời." — {name} ngồi lặng rất lâu sau câu nói đó.' }
          ] },
          { label: 'Gọi về tâm sự thật với gia đình — lần đầu không giấu gì', fx: { love: 3, pressure: -3 }, note: 'Cách gượng dậy: tâm sự thật với gia đình', say: [
            { sp: 'narr', text: 'Lần đầu tiên từ ngày sang Nhật, {name} gọi về và kể THẬT hết — không giấu, không "con ổn". Đầu dây bên kia, mẹ im lặng nghe rất lâu, rồi nói một câu làm {name} khóc thêm một trận nữa, mà là trận khóc nhẹ lòng: "Thương ai thì thương, nhưng người phải thương nhất là mình, con ạ. Ở nhà, lúc nào cũng có một mâm cơm chờ con." Hóa ra nói thật với gia đình không làm họ gục — nó làm cả nhà cùng đứng dậy.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Ngày tháng trôi, nỗi buồn không biến mất một sáng một chiều — nó chỉ loãng dần, như mưa tạnh từng hồi. Một buổi sáng, {name} soi gương thấy mình đã cười được một nụ cười không phải gượng. Hành trình ở Nhật còn dài, và trái tim — sau khi lành — hóa ra vẫn còn nguyên khả năng rung động.' }
    ]
  },

  /* ================= ĐƯỢC TÁN NGƯỢC ================= */
  'ch3-tan-nguoc-nam': {
    scene: '💌 Hằng chủ động — tin nhắn lúc tối muộn',
    branch: [
      { sp: 'narr', text: 'Tối nay, điện thoại {name} rung vì một tin nhắn lạ thường từ Hằng: "Ngủ chưa? Mình hỏi chuyện này, hỏi xong là thôi, không nhắc lại lần hai đâu."' },
      { sp: 'Hằng', text: '"Mình để ý {call} lâu rồi. Từ hôm cho mượn vở, rồi những buổi giải lao… Mình biết {call} mới đi qua chuyện buồn, mình không vội gì đâu. Chỉ là mình muốn {call} biết: ở Nhật này, có một người đang nhìn về phía {call} đấy. Khi nào sẵn sàng thì… mình vẫn ở đây."' },
      {
        prompt: 'Một lời tỏ tình dè dặt mà chân thành. {name} trả lời thế nào?',
        choice: [
          { label: 'Nói thật: "Mình chưa sẵn sàng, nhưng cảm ơn Hằng đã nói thẳng. Cho mình thời gian"', fx: { love: 2 }, note: 'Được tán ngược (tuyến nam): đồng ý để ngỏ, xin thời gian', say: [
            { sp: 'Hằng', text: '"Ừ, mình chờ được. Người Việt mình ở đây, chờ đợi là nghề rồi." — Hằng nhắn lại kèm một biểu tượng mặt cười — "Ngủ đi, mai còn học. Chuyện này để mai tính tiếp."' },
            { sp: 'narr', text: 'Đêm đó, lần đầu sau nhiều tuần, {name} đi ngủ với một cảm giác rất lạ: được một người tử tế nhìn về phía mình — hóa ra là thứ thuốc an thần tốt nhất.' }
          ] },
          { label: 'Từ chối dứt khoát cho rõ ràng: "Mình chỉ coi Hằng là bạn thôi"', fx: { pressure: 1 }, note: 'Được tán ngược (tuyến nam): từ chối khéo', say: [
            { sp: 'Hằng', text: '"Ừ, vậy là rõ ràng rồi. Cảm ơn {call} đã nói thẳng — nói thẳng là tử tế nhất đấy." — Hằng đáp ngắn gọn, và từ hôm sau ở lớp, cô ấy vẫn gật đầu chào như thường, chỉ là cuốn vở không còn đẩy sang bàn bên nữa.' }
          ] }
        ]
      }
    ]
  },

  'ch3-tan-nguoc-nu': {
    scene: '💌 Khôi chủ động — lời mời vụng về mà chân thành',
    branch: [
      { sp: 'narr', text: 'Sau giờ học, Khôi đứng chờ {name} ở cổng trường — tay cầm hai lon cà phê, mặt đỏ lên thấy rõ trước cả khi mở miệng. Người miền Trung ít nói, tới lúc cần nói chuyện quan trọng thì càng vụng.' },
      { sp: 'Khôi', text: '"Em nói chuyện này, nói một lần thôi, {call} nghe xong quên cũng được. Từ hôm chuyển lớp tới, em để ý {call} nhiều… Em biết {call} mới qua chuyện không vui, em không có ý chen vào lúc này đâu. Chỉ là em muốn {call} biết: ở đây, có một người luôn đứng về phía {call}. Khi nào {call} sẵn sàng, em vẫn còn ở đây."' },
      {
        prompt: 'Một lời tỏ tình vụng về mà chân thành. {name} trả lời thế nào?',
        choice: [
          { label: 'Nói thật: "Chị chưa sẵn sàng, nhưng cảm ơn em đã nói thẳng. Cho chị thời gian"', fx: { love: 2 }, note: 'Được tán ngược (tuyến nữ): đồng ý để ngỏ, xin thời gian', say: [
            { sp: 'Khôi', text: '"Dạ, em chờ được." — Khôi gãi đầu, cười ngượng — "Người Việt mình ở đây, chờ là nghề rồi mà {call}. Thôi, {call} uống cà phê đi cho ấm, em về trước kẻo lỡ tàu."' },
            { sp: 'narr', text: 'Đi bộ về phòng, lon cà phê ấm trong tay, lần đầu sau nhiều tuần {name} thấy lòng mình nhẹ đi một nhịp: được một người tử tế nhìn về phía mình — hóa ra là thứ thuốc an thần tốt nhất.' }
          ] },
          { label: 'Từ chối dứt khoát cho rõ ràng: "Chị chỉ coi em là bạn học thôi"', fx: { pressure: 1 }, note: 'Được tán ngược (tuyến nữ): từ chối khéo', say: [
            { sp: 'Khôi', text: '"Dạ… em hiểu rồi. Cảm ơn {call} đã nói thẳng — nói thẳng vậy là tử tế nhất." — Khôi gật đầu, lùi một bước đúng phép, và từ hôm sau ở lớp vẫn chào hỏi bình thường, chỉ là không còn đứng chờ ở cổng trường nữa.' }
          ] }
        ]
      }
    ]
  },

  /* ================= RỦ ĐI CHƠI — BUỔI HẸN VỚI TỪNG ỨNG VIÊN ================= */
  'hen-yui': {
    scene: '🎡 Đi chơi với Yui — một ngày nghỉ hiếm hoi',
    branch: [
      { sp: 'narr', text: 'Ngày nghỉ của Yui và ngày nghỉ của {name} hiếm hoi trùng nhau. Hai người hẹn ở trước ga, đi dạo phố mua sắm 浅草 rồi ghé công viên. Yui mặc thường phục — không còn bộ đồng phục combini — trông khác hẳn: như một cô gái Nhật bình thường trong một ngày nghỉ bình thường, chỉ có nụ cười là vẫn quen thuộc.' },
      { sp: 'Yui', jp: '今日は{休|やす}みだから、{店|みせ}のことは{忘|わす}れよう。…あ、でも、{一緒|いっしょ}にいると、つい「いらっしゃいませ」って{言|い}いそうになる。', text: '(Hôm nay là ngày nghỉ, quên chuyện cửa hàng đi nhé. …À mà ở cạnh bạn, tôi cứ suýt buột miệng "kính chào quý khách" thôi.) — Cả hai cùng bật cười.' },
      {
        prompt: 'Đi ngang một quầy bánh ngọt xếp hàng dài, Yui nhìn vào với ánh mắt thèm thuồng. {name} sẽ…',
        choice: [
          { label: 'Xếp hàng mua hai phần — một cho Yui, một cho mình', fx: { love: 2 }, note: 'Buổi hẹn với Yui: xếp hàng mua bánh cho cô ấy', say: [
            { sp: 'Yui', jp: 'え、私の{分|ぶん}まで…？ ありがとう。…{並|なら}んでまで{買|か}ってくれるなんて、{思|おも}わなかった。', text: '(Ơ, cả phần của tôi nữa à…? Cảm ơn bạn. …Tôi không ngờ bạn chịu xếp hàng mua cho tôi như thế.) — Yui cầm hộp bánh bằng hai tay, ăn miếng đầu tiên rồi nhắm mắt gật gù. Một hàng người dài mười lăm phút, đổi lấy nụ cười đó — rẻ chán.' }
          ] },
          { label: 'Rủ Yui vào quán trà gần đó ngồi nghỉ chân, nói chuyện thong thả', fx: { jp: 2 }, note: 'Buổi hẹn với Yui: ngồi quán trà nói chuyện', say: [
            { sp: 'narr', text: 'Trong quán trà nhỏ, Yui kể chuyện quê nhà ở tỉnh xa, chuyện ước mơ mở một tiệm bánh sau này. {name} kể chuyện Việt Nam, chuyện sân bay, chuyện những ngày đầu lớ ngớ. Hai thứ tiếng, hai quê — mà ngồi cạnh nhau, khoảng cách hóa ra chỉ bằng một ấm trà.' }
          ] }
        ]
      },
      {
        prompt: 'Chiều xuống, buổi đi chơi sắp hết. Ấn tượng của {name} về hôm nay:',
        choice: [
          { label: 'Một ngày trọn vẹn — rủ Yui lần sau đi tiếp', fx: { love: 3 }, note: 'Điểm buổi hẹn: trọn vẹn', say: [
            { sp: 'Yui', jp: '今日は{本当|ほんとう}に{楽|たの}しかった。…また、{誘|さそ}ってくれる？', text: '(Hôm nay tôi thật sự rất vui. …Lần sau, bạn lại rủ tôi nhé?) — Yui hỏi mà mắt không dám nhìn thẳng. {name} gật đầu ngay, nhanh hơn cả lúc gật bừa ở combini ngày đầu mới sang.' }
          ] },
          { label: 'Vui, nhưng hơi tiếc vì mình còn nói chưa được nhiều', fx: { love: 1, jp: 1 }, note: 'Điểm buổi hẹn: ổn', say: [
            { sp: 'narr', text: 'Trên tàu về, {name} mở sổ tay ghi lại mấy từ mới học được từ Yui hôm nay. Tiếng Nhật tiến bộ nhất không phải ở lớp — là ở những buổi đi chơi mà mình muốn nói thật nhiều mà nói chưa đủ thế này.' }
          ] },
          { label: 'Hơi nhạt — hai người vẫn còn khoảng cách khó gọi tên', fx: { pressure: 1 }, note: 'Điểm buổi hẹn: hơi nhạt', say: [
            { sp: 'narr', text: 'Buổi đi chơi kết thúc lịch sự và… hơi xa cách. Ngôn ngữ, văn hóa, những câu chuyện chưa kể hết — giữa hai người vẫn còn một lớp kính mỏng. Không sao: thân nhau là việc của nhiều buổi đi chơi, không phải của một buổi.' }
          ] }
        ]
      }
    ]
  },

  'hen-hang': {
    scene: '📚 Đi chơi với Hằng — hiệu sách và quán trà của hai đồng hương',
    branch: [
      { sp: 'narr', text: 'Chủ nhật, {name} và Hằng hẹn nhau ở khu phố sách cũ. Hằng đến đúng giờ từng phút, tay cầm sẵn danh sách sách cần tìm — một buổi đi chơi được tổ chức như một buổi học, mà không hiểu sao lại vui hơn hẳn buổi học.' },
      { sp: 'Hằng', text: '"Hôm nay mình dẫn {call} tới hiệu sách cũ tủ của mình. Sách tiếng Nhật cũ ở đây rẻ bằng nửa giá bìa, có cuốn còn mới nguyên. Người Việt mình ở Nhật, tiết kiệm được đồng nào hay đồng nấy — nhưng sách thì đừng tiếc, sách là vốn."' },
      {
        prompt: 'Trong hiệu sách, Hằng rút ra một cuốn truyện tranh cũ, mắt sáng lên. {name} sẽ…',
        choice: [
          { label: 'Mua tặng Hằng cuốn đó — ghi nhớ luôn một điều: cô ấy thích truyện tranh cũ', fx: { love: 2 }, note: 'Buổi hẹn với Hằng: tặng đúng cuốn sách cô ấy thích', say: [
            { sp: 'Hằng', text: '"Ơ, sao {call} mua cho mình?" — Hằng ôm cuốn sách, ngượng mà vui thấy rõ — "…Cảm ơn nhé. Từ ngày sang đây, đây là món quà đầu tiên mình được tặng ở Nhật đấy."' },
            { sp: 'narr', text: 'Một cuốn sách cũ giá vài trăm yên — mà người nhận ôm nó như ôm một thứ quý giá. Ở xứ người, giá trị của món quà chưa bao giờ nằm ở cái giá.' }
          ] },
          { label: 'Ngồi đọc ké và bàn luận rôm rả cả buổi', fx: { jp: 2 }, note: 'Buổi hẹn với Hằng: đọc sách và bàn luận', say: [
            { sp: 'narr', text: 'Hai đứa ngồi bệt ở góc hiệu sách, lật hết cuốn này tới cuốn khác, cãi nhau vui vẻ về nhân vật nào ngốc hơn. Tiếng Việt rôm rả giữa một hiệu sách Nhật yên tĩnh — chủ tiệm già nhìn sang, không trách, chỉ cười: khách quen của ông cũng từng có thời như thế.' }
          ] }
        ]
      },
      {
        prompt: 'Chiều xuống, buổi đi chơi sắp hết. Ấn tượng của {name} về hôm nay:',
        choice: [
          { label: 'Một ngày trọn vẹn — rủ Hằng lần sau đi tiếp', fx: { love: 3 }, note: 'Điểm buổi hẹn: trọn vẹn', say: [
            { sp: 'Hằng', text: '"Hôm nay vui thật. Ở Nhật này, có một người để cùng đi hiệu sách, cùng cãi nhau về truyện tranh… quý lắm đấy {call} ạ." — Hằng nói mà không nhìn {name}, tai đỏ lên một chút.' }
          ] },
          { label: 'Vui và ấm — như được về quê một buổi', fx: { love: 1 }, note: 'Điểm buổi hẹn: ổn', say: [
            { sp: 'narr', text: 'Trên đường về, {name} nghĩ: đi chơi với đồng hương có một cái ấm riêng — không phải dịch cho nhau nghe, không phải đoán ý nhau qua một lớp ngôn ngữ. Chỉ cần là mình, nguyên vẹn, bằng tiếng mẹ đẻ.' }
          ] },
          { label: 'Hơi nhạt — hai người nói chuyện học hành là chính', fx: { pressure: 1 }, note: 'Điểm buổi hẹn: hơi nhạt', say: [
            { sp: 'narr', text: 'Buổi đi chơi vui mà sao cứ giống một buổi ôn bài mở rộng. Có lẽ cả hai đều đang quá quen với việc "hữu ích", đến mức quên mất cách đi chơi vô bổ cho vui. Lần sau — nếu có lần sau — phải khác.' }
          ] }
        ]
      }
    ]
  },

  'hen-ren': {
    scene: '🐟 Đi chợ cá 築地 với Ren — buổi sáng của người làm bếp',
    branch: [
      { sp: 'narr', text: 'Năm giờ sáng, chợ cá 築地 đã rộn như ban ngày. Ren dẫn {name} đi giữa những dãy sạp cá, bước chân chắc nịch của người ở nhà mình: chỗ này cá thu ngon, chỗ kia phải mặc cả, bà chủ sạp kia là "không được trả giá nhưng được tặng thêm hành".' },
      { sp: 'Ren', jp: '{魚|さかな}は{目|め}で{選|えら}ぶんだ。{目|め}が{澄|す}んでいて、エラが{赤|あか}いのが{新鮮|しんせん}な{証拠|しょうこ}。…ほら、この{違|ちが}い、{分|わ}かる？', text: '(Cá thì chọn bằng mắt. Mắt trong, mang đỏ là dấu hiệu cá tươi. …Này, bạn thấy khác nhau không?) — Ren cầm hai con cá lên so sánh, mắt sáng đúng kiểu người đang nói về thứ mình yêu nhất.' },
      {
        prompt: 'Ren mua một phần cá hồi tươi, rủ {name} về quán ăn thử món anh mới nghĩ ra. {name} sẽ…',
        choice: [
          { label: 'Ăn và nhận xét thật kỹ như một thực khách khó tính nhất', fx: { jp: 2, love: 2 }, note: 'Buổi hẹn với Ren: nhận xét món ăn thật kỹ', say: [
            { sp: 'Ren', jp: '…{率直|そっちょく}な{感想|かんそう}、ありがとう。{褒|ほ}めるだけの{人|ひと}は{沢山|たくさん}いるけど、ちゃんと{見|み}てくれる{人|ひと}は、{少|すく}ないから。', text: '(…Cảm ơn nhận xét thẳng thắn của bạn. Người chỉ biết khen thì nhiều, nhưng người chịu nhìn kỹ cho mình thì ít lắm.) — Với người làm bếp, được "nhìn kỹ" còn quý hơn được khen.' }
          ] },
          { label: 'Xin Ren dạy luôn cách cầm dao và thái cá cơ bản', fx: { jp: 2 }, note: 'Buổi hẹn với Ren: học thái cá', say: [
            { sp: 'narr', text: 'Ren đứng sau lưng, chỉnh tay cầm dao cho {name} từng chút một — kiên nhẫn bất ngờ ở một người ít nói. Miếng cá đầu tiên thái ra méo mó như răng cưa, cả hai cùng phá lên cười giữa bếp quán chưa mở cửa. Học nghề từ người mình quý, mệt mấy cũng thành vui.' }
          ] }
        ]
      },
      {
        prompt: 'Buổi sáng ở chợ cá kết thúc. Ấn tượng của {name} về hôm nay:',
        choice: [
          { label: 'Một buổi sáng trọn vẹn — hẹn Ren lần sau đi tiếp', fx: { love: 3 }, note: 'Điểm buổi hẹn: trọn vẹn', say: [
            { sp: 'Ren', jp: '今日は…{楽|たの}しかった。{仕事|しごと}の{日|ひ}より、{早|はや}く{起|お}きたのにね。', text: '(Hôm nay… tôi rất vui. Dù phải dậy còn sớm hơn cả ngày đi làm.) — Ren cười, dúi vào tay {name} một phần cá tươi gói cẩn thận: "Phần này mang về, tối nấu ăn thử đi."' }
          ] },
          { label: 'Vui và được mở mang — nghề bếp hóa ra sâu hơn mình tưởng', fx: { love: 1, jp: 1 }, note: 'Điểm buổi hẹn: ổn', say: [
            { sp: 'narr', text: 'Về phòng, {name} ghi vào sổ: cách chọn cá tươi, tên các loại cá theo mùa. Một buổi đi chơi vừa vui vừa thêm một nghề tay trái trong đầu — kiểu đi chơi rất "Ren".' }
          ] },
          { label: 'Hơi nhạt — Ren nói chuyện cá nhiều hơn chuyện người', fx: { pressure: 1 }, note: 'Điểm buổi hẹn: hơi nhạt', say: [
            { sp: 'narr', text: 'Ren là thế: đứng trước cá thì nói không ngừng, đứng trước người thì lại lúng túng. Buổi đi chơi kết thúc hơi sớm, hơi vụng. Nhưng có những người, phải đi cùng vài buổi mới thấy được phần mềm nhất của họ.' }
          ] }
        ]
      }
    ]
  },

  'hen-khoi': {
    scene: '⚽ Đi chơi với Khôi — công viên và quán cơm Việt',
    branch: [
      { sp: 'narr', text: 'Cuối tuần, Khôi rủ {name} ra công viên đá cầu, chạy bộ, rồi ghé quán cơm Việt nhỏ gần ga. Khôi mang theo cả một túi quýt: "Quýt nhà người quen gửi từ quê sang, ăn một mình không hết — có người cùng ăn mới ngon."' },
      { sp: 'Khôi', text: '"Ở bên này, em nhớ nhất là những buổi chiều ở quê: đá bóng xong cả đám ngồi ăn quýt, chém gió tới tối. Sang đây cái gì cũng có, chỉ thiếu đúng cái cảm giác đó. Hôm nay có {call}, tự nhiên thấy giống ở nhà ghê."' },
      {
        prompt: 'Ngồi ăn quýt ở công viên, Khôi kể chuyện dự định tương lai. {name} sẽ…',
        choice: [
          { label: 'Chia sẻ thật dự định của mình — hai đứa cùng vạch mốc cho nhau', fx: { love: 2 }, note: 'Buổi hẹn với Khôi: chia sẻ dự định tương lai', say: [
            { sp: 'Khôi', text: '"Vậy là hai đứa cùng một hướng rồi." — Khôi gật gù, bóc thêm quả quýt đưa sang — "Có người cùng cố gắng, đường dài nó ngắn lại hẳn {call} ạ. Mình hẹn nhau: thi đỗ đợt này, cả hai cùng khao một bữa ra trò."' },
            { sp: 'narr', text: 'Hai người xa xứ ngồi hứa với nhau những điều rất cụ thể: mốc thi, mốc tiền, mốc về thăm nhà. Ở Nhật, có một đồng hương cùng nhịp cố gắng là có thêm một cái neo giữ mình khỏi trôi.' }
          ] },
          { label: 'Rủ Khôi đá cầu một trận ra mồ hôi cho khỏe người', fx: { hp: 2, love: 1 }, note: 'Buổi hẹn với Khôi: đá cầu ở công viên', say: [
            { sp: 'narr', text: 'Trận đá cầu kéo dài tới khi cả hai ướt đẫm mồ hôi và cười không ngớt vì những pha đỡ cầu "đi vào lòng đất". Mấy ông cụ Nhật ngồi ghế đá gần đó xem một lúc rồi vỗ tay — thể thao là thứ ngôn ngữ không cần phiên dịch.' }
          ] }
        ]
      },
      {
        prompt: 'Chiều xuống, buổi đi chơi sắp hết. Ấn tượng của {name} về hôm nay:',
        choice: [
          { label: 'Một ngày trọn vẹn — hẹn Khôi lần sau đi tiếp', fx: { love: 3 }, note: 'Điểm buổi hẹn: trọn vẹn', say: [
            { sp: 'Khôi', text: '"Hôm nay em vui lắm. Lần sau {call} đừng khách sáo, cứ gọi em — đi đâu cũng được, miễn là có người đi cùng." — Khôi nói câu đó rất khẽ, như sợ nói to thì nó bay mất.' }
          ] },
          { label: 'Vui và ấm — như một buổi chiều ở quê nhà', fx: { love: 1 }, note: 'Điểm buổi hẹn: ổn', say: [
            { sp: 'narr', text: 'Trên tàu về, {name} nghĩ: có những buổi đi chơi không cần danh lam thắng cảnh — chỉ cần một người nói cùng thứ tiếng, ăn cùng vị quýt quê, và hiểu hết những điều mình không cần nói ra.' }
          ] },
          { label: 'Hơi nhạt — hai người vẫn còn giữ kẽ với nhau', fx: { pressure: 1 }, note: 'Điểm buổi hẹn: hơi nhạt', say: [
            { sp: 'narr', text: 'Buổi đi chơi lịch sự, vui vẻ — và hơi xa cách, như hai người vẫn đang đứng ở hai phía của một con rạch nhỏ tên là "chưa đủ thân". Không sao: thân nhau là chuyện của nhiều buổi, không phải một buổi.' }
          ] }
        ]
      }
    ]
  },

  /* ================= RỦ VỀ NHÀ CHƠI — NẤU ĂN CÙNG NHAU Ở PHÒNG TRỌ ================= */
  've-nha-yui': {
    scene: '🏠 Rủ Yui về phòng trọ — nấu ăn và xem phim',
    branch: [
      { sp: 'narr', text: 'Lần đầu rủ Yui về phòng trọ chơi, {name} dọn phòng kỹ hơn cả ngày tổng vệ sinh cuối năm: sàn lau bóng, chăn gấp gọn, và quan trọng nhất — nguyên liệu nấu ăn đã mua sẵn ở siêu thị 中野 từ chiều. Yui đứng ở cửa, ôm một túi trái cây, ngó quanh phòng nhỏ với vẻ tò mò.' },
      { sp: 'Yui', jp: 'おじゃまします。…わあ、{小|ちい}さいけど、すごく{綺麗|きれい}に{住|す}んでるんですね。', text: '(Xin phép vào nhà ạ. …Ồ, phòng nhỏ mà bạn ở gọn gàng quá nhỉ.) — 「おじゃまします」 là câu chào bắt buộc khi bước vào nhà người Nhật — Yui nói câu đó với chính căn phòng của {name}, lịch sự theo thói quen.' },
      { sp: 'narr', text: 'Hai người cùng vào bếp: {name} nấu món Việt, Yui phụ nhặt rau và học cách nêm nếm. Tiếng Nhật, tiếng Việt và tiếng dao thớt trộn vào nhau trong căn bếp hai mét vuông.' },
      {
        prompt: 'Món ăn dọn ra, Yui ăn miếng đầu tiên rồi tròn mắt. {name} sẽ…',
        choice: [
          { label: 'Dạy Yui câu khen món ăn bằng tiếng Việt: "Ngon quá!"', fx: { jp: 1, love: 3 }, note: 'Điểm rủ về nhà: trọn vẹn', say: [
            { sp: 'Yui', jp: '「ゴン・クア」…？ あはは、{難|むずか}しい。でも、{本当|ほんとう}に…ゴン・クア！', text: '("Ngon quá"…? A ha ha, khó phát âm thật. Nhưng mà thật sự… NGON QUÁ!) — Yui cười tới chảy nước mắt vì chính giọng nói của mình. Bữa cơm hôm đó, hai người dạy nhau mỗi người một thứ tiếng, món ăn thành phụ, tiếng cười thành chính.' }
          ] },
          { label: 'Kể Yui nghe chuyện bữa cơm nhà ở quê — ai nấu, ai rửa bát', fx: { love: 2 }, note: 'Điểm rủ về nhà: ổn', say: [
            { sp: 'narr', text: 'Yui chống cằm nghe chuyện mâm cơm quê nhà của {name}: mẹ nấu, bố rửa bát, em út chuyên ăn vụng. "Ở đâu thì bữa cơm nhà cũng là nơi người ta thương nhau nhất nhỉ" — Yui nói khẽ, và căn phòng trọ xa xứ tự nhiên ấm như một mái nhà.' }
          ] },
          { label: 'Hơi lúng túng vì bếp nhỏ, hai người cứ va vào nhau', fx: { pressure: 1 }, note: 'Điểm rủ về nhà: hơi nhạt', say: [
            { sp: 'narr', text: 'Bếp hai mét vuông, hai người nấu một bữa cơm = mười lần suýt va nhau, ba lần nhường đường cùng lúc về cùng một phía, và một lần cả hai cùng phá lên cười vì sự vụng về đó. Vụng — nhưng là thứ vụng về người ta nhớ mãi.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Ăn xong, hai người xem một bộ phim trên điện thoại, bình luận rôm rả tới đoạn kết. Đồng hồ điểm gần mười giờ tối — Yui đứng dậy: "Tàu cuối sắp tới rồi, tôi về nhé." {name} tiễn ra tận ga, đứng nhìn theo tới khi bóng cô ấy khuất sau cửa soát vé. Đúng phép, trong sáng, và đủ ấm để nhớ cả tuần.' }
    ]
  },

  've-nha-hang': {
    scene: '🏠 Rủ Hằng về phòng trọ — nấu một bữa cơm Việt đúng nghĩa',
    branch: [
      { sp: 'narr', text: 'Hằng về phòng trọ của {name} chơi, tay xách theo một túi đồ cô ấy mua ở siêu thị trên đường tới: "Nấu cơm Việt thì phải có người Việt giám sát chất lượng chứ." Phòng trọ nhỏ bỗng hóa thành một góc bếp quê nhà: tiếng Việt, mùi nước mắm, và hai đôi đũa gõ vào nhau leng keng.' },
      { sp: 'Hằng', text: '"Ở Nhật một mình, cái mình nhớ nhất hóa ra không phải món gì cao sang — là tiếng người nói chuyện trong bếp lúc nấu cơm." — Hằng vừa thái rau vừa nói, tay thoăn thoắt của người con gái đã nấu cơm cho cả nhà từ bé.' },
      {
        prompt: 'Bữa cơm dọn ra: hai món mặn, một món canh — như hệt mâm cơm ở quê. {name} sẽ…',
        choice: [
          { label: 'Nói thật lòng: "Lâu lắm rồi mình mới ăn một bữa ra hồn bữa cơm nhà"', fx: { love: 3 }, note: 'Điểm rủ về nhà: trọn vẹn', say: [
            { sp: 'Hằng', text: '"Ừ… mình cũng vậy." — Hằng gắp thêm thức ăn vào bát {name}, giọng nhỏ đi — "Vậy từ nay thỉnh thoảng lại nấu chung nhé. Hai đứa xa nhà, góp gạo thổi cơm chung thế này… đỡ tủi thân hẳn."' },
            { sp: 'narr', text: 'Một câu nói rất nhẹ, mà căn phòng như rộng ra: ở xứ người, "thỉnh thoảng lại nấu chung nhé" là một trong những câu nói ấm nhất mà một người có thể nghe.' }
          ] },
          { label: 'Tranh thủ nhờ Hằng chỉ luôn bài ngữ pháp đang bí', fx: { jp: 2, love: 1 }, note: 'Điểm rủ về nhà: ổn', say: [
            { sp: 'narr', text: 'Ăn xong, hai đứa ngồi vào bàn học: Hằng giảng ngữ pháp bằng cách liên hệ sang tiếng Việt, dễ hiểu hơn hẳn sách giáo khoa. Buổi "về nhà chơi" vừa ấm bụng vừa đầy đầu — đúng phong cách của cô bạn học giỏi nhất lớp.' }
          ] },
          { label: 'Bữa cơm hơi lặng — cả hai đều đang nghĩ về quê nhà của riêng mình', fx: { pressure: 1 }, note: 'Điểm rủ về nhà: hơi nhạt', say: [
            { sp: 'narr', text: 'Cơm ngon mà không khí hơi trầm: mùi vị quê nhà làm cả hai cùng nhớ nhà theo hai cách khác nhau, và im lặng chia nhau nỗi nhớ đó. Không phải buổi nào cũng cần rôm rả — có những buổi, ngồi ăn cạnh nhau trong im lặng cũng là một cách thân.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Dọn dẹp xong, Hằng xem đồng hồ: "Sắp tới giờ tàu cuối rồi, mình về đây." {name} tiễn ra ga, đứng nhìn theo tới khi tàu chạy khuất. Một buổi tối hoàn toàn trong sáng, đúng phép — và là buổi tối ấm nhất của phòng trọ này từ ngày {name} dọn vào.' }
    ]
  },

  've-nha-ren': {
    scene: '🏠 Rủ Ren về phòng trọ — đầu bếp vào bếp nhà người ta',
    branch: [
      { sp: 'narr', text: 'Rủ một đầu bếp về nhà nấu ăn là một quyết định can đảm: bếp phòng trọ của {name} chỉ có một bếp gas đơn và một con dao cùn. Ren đứng ở cửa, tay xách túi nguyên liệu anh tự mua ở siêu thị, ngó quanh bếp và gật đầu như giám khảo: "Được. Bếp nhỏ không sao, quan trọng là người nấu."' },
      { sp: 'Ren', jp: 'おじゃまします。…じゃあ、{今日|きょう}は{僕|ぼく}が{作|つく}ります。{手伝|てつだ}ってくれる？', text: '(Xin phép vào nhà. …Vậy hôm nay để tôi nấu nhé. Bạn phụ tôi được không?) — Ren xắn tay áo, và căn bếp hai mét vuông bỗng vận hành như một bếp nhà hàng thu nhỏ.' },
      {
        prompt: 'Món Ren nấu dọn ra — đơn giản mà ngon tới mức {name} phải thừa nhận bếp nhà mình chưa từng có bữa nào thế này. {name} sẽ…',
        choice: [
          { label: 'Nói thật: "Đây là bữa ngon nhất của căn phòng này từ ngày em dọn vào"', fx: { love: 3 }, note: 'Điểm rủ về nhà: trọn vẹn', say: [
            { sp: 'Ren', jp: '…そっか。じゃあ、この{部屋|へや}の{記録|きろく}、また{更新|こうしん}しに{来|こ}なきゃね。', text: '(…Vậy à. Thế thì tôi lại phải tới cập nhật kỷ lục của căn phòng này nữa rồi.) — Ren nói tỉnh bơ mà tai đỏ lên. Người làm bếp tỏ tình bằng cách hẹn lần nấu tiếp theo — vụng về và chân thành cùng một lúc.' }
          ] },
          { label: 'Xin Ren chỉ bí quyết nêm nếm — ghi chép cẩn thận vào sổ tay', fx: { jp: 2, love: 1 }, note: 'Điểm rủ về nhà: ổn', say: [
            { sp: 'narr', text: 'Ren chỉ từng chút một: thứ tự cho gia vị, cách nghe tiếng dầu sôi để biết độ nóng. Buổi tối thành một lớp học nấu ăn một thầy một trò — và là lớp học mà học trò không hề muốn tan giờ.' }
          ] },
          { label: 'Hơi ngại vì để khách phải nấu hết, mình chỉ đứng phụ lóng ngóng', fx: { pressure: 1 }, note: 'Điểm rủ về nhà: hơi nhạt', say: [
            { sp: 'narr', text: '{name} đứng phụ bếp mà cứ thấy áy náy: khách tới nhà chơi lại phải nấu từ đầu tới cuối. Ren thì chẳng để tâm, còn bảo: "Được nấu cho người mình quý ăn là một niềm vui, không phải việc nhà." Nghe xong câu đó, áy náy tan đi quá nửa.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Ăn xong, hai người xem một trận bóng đá trên điện thoại, cãi nhau vui vẻ về đội nào mạnh hơn. Gần mười giờ, Ren đứng dậy: "Tàu cuối sắp tới, tôi về đây." {name} tiễn ra tận ga. Một buổi tối đúng phép, trong sáng — và căn bếp phòng trọ từ nay có thêm một kỷ niệm rất thơm.' }
    ]
  },

  've-nha-khoi': {
    scene: '🏠 Rủ Khôi về phòng trọ — hai anh em xa xứ nấu cơm',
    branch: [
      { sp: 'narr', text: 'Khôi về phòng trọ của {name} chơi, mang theo nguyên liệu mua ở siêu thị và một gói gia vị Việt quý như vàng: "Cái này ở Nhật khó kiếm lắm, em để dành mãi — hôm nay có dịp tốt mới mang ra đấy."' },
      { sp: 'Khôi', text: '"Để em nấu cho. Ở quê, em là con út mà nấu cơm giỏi nhất nhà — mẹ em bảo sau này ai lấy em là sướng cái miệng." — Khôi nói tỉnh bơ rồi xắn tay vào bếp, tay chân nhanh nhẹn, vừa nấu vừa kể chuyện kho vận, chuyện lớp học, chuyện quê nhà miền Trung mùa bão.' },
      {
        prompt: 'Bữa cơm dọn ra, mùi vị quê nhà lan khắp phòng trọ. {name} sẽ…',
        choice: [
          { label: 'Nói thật lòng: "Lâu lắm rồi mới ăn một bữa ra hồn bữa cơm nhà"', fx: { love: 3 }, note: 'Điểm rủ về nhà: trọn vẹn', say: [
            { sp: 'Khôi', text: '"Ừ… em cũng vậy." — Khôi gắp thêm thức ăn sang, giọng nhỏ đi — "Vậy từ nay thỉnh thoảng lại nấu chung nhé. Người xa nhà với nhau, góp gạo thổi cơm chung thế này… đỡ tủi thân hẳn, {call} ạ."' },
            { sp: 'narr', text: 'Một câu nói rất nhẹ, mà căn phòng như rộng ra: ở xứ người, "thỉnh thoảng lại nấu chung nhé" là một trong những câu nói ấm nhất mà một người có thể nghe.' }
          ] },
          { label: 'Rủ Khôi xem lại bài học hôm nay — vừa ăn vừa ôn bài', fx: { jp: 2, love: 1 }, note: 'Điểm rủ về nhà: ổn', say: [
            { sp: 'narr', text: 'Ăn xong, hai anh em ngồi vào bàn học ôn bài: người đi trước giảng cho người đi sau, thỉnh thoảng lại lạc sang chuyện cười ở lớp. Buổi "về nhà chơi" vừa ấm bụng vừa đầy đầu — đúng kiểu của những người xa xứ biết thương nhau bằng cách thiết thực nhất.' }
          ] },
          { label: 'Bữa cơm hơi lặng — cả hai đều đang nghĩ về quê nhà của riêng mình', fx: { pressure: 1 }, note: 'Điểm rủ về nhà: hơi nhạt', say: [
            { sp: 'narr', text: 'Cơm ngon mà không khí hơi trầm: mùi vị quê nhà làm cả hai cùng nhớ nhà theo hai cách khác nhau, và im lặng chia nhau nỗi nhớ đó. Không phải buổi nào cũng cần rôm rả — có những buổi, ngồi ăn cạnh nhau trong im lặng cũng là một cách thân.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Dọn dẹp xong, Khôi xem đồng hồ: "Sắp tới giờ tàu cuối rồi, em về đây." {name} tiễn ra ga, đứng nhìn theo tới khi tàu chạy khuất. Một buổi tối hoàn toàn trong sáng, đúng phép — và là buổi tối ấm nhất của phòng trọ này từ ngày {name} dọn vào.' }
    ]
  },

  /* ================= TỎ TÌNH ================= */
  'to-tinh-yui': {
    scene: '💌 Tỏ tình với Yui — dưới tán cây trước combini',
    branch: [
      { sp: 'narr', text: 'Tối nay, {name} đợi Yui tan ca. Cô ấy bước ra khỏi combini, thấy {name} đứng dưới tán cây với hai lon trà nóng, ngạc nhiên: "Ơ, hôm nay không mua gì à?" — "Hôm nay tôi không tới để mua đồ. Tôi tới để nói một chuyện."' },
      { sp: 'hero', jp: 'あの…{私|わたし}と、{付|つ}き{合|あ}ってくれませんか。{言葉|ことば}もまだ{下手|へた}だけど、{気持|きも}ちは、{本物|ほんもの}です。', text: '(À… bạn có thể hẹn hò với tôi không? Tiếng Nhật của tôi còn vụng, nhưng tình cảm thì là thật.)' },
      { sp: 'Yui', jp: '…{待|ま}ってました。ずっと、{待|ま}ってました。…はい。よろしくお{願|ねが}いします。', text: '(…Tôi đã đợi câu này. Đợi lâu lắm rồi. …Vâng. Từ nay mong được bạn giúp đỡ.) — Yui khóc cười cùng một lúc, hai tay ôm lon trà nóng như ôm một thứ gì rất quý.' },
      { sp: 'narr', text: 'Từ hôm nay, combini 秋葉原マート không còn là "cái combini gần nhà" nữa — nó là nơi có người yêu của {name} đứng ở quầy, và mỗi lần chuông cửa reo, cô ấy lại ngẩng lên nhìn theo thói quen, mong là người ấy bước vào.' }
    ]
  },

  'to-tinh-hang': {
    scene: '💌 Tỏ tình với Hằng — sân trường sau giờ học',
    branch: [
      { sp: 'narr', text: 'Sau giờ học, {name} rủ Hằng ở lại sân trường một lát. Nắng chiều đổ dài trên sân, học sinh ra về gần hết. {name} hít một hơi thật sâu — câu này, nói bằng tiếng mẹ đẻ, hóa ra còn khó hơn mọi bài thi nói tiếng Nhật cộng lại.' },
      { sp: 'hero', text: '"Hằng này. Mình nghĩ kỹ rồi mới nói. Ở Nhật này, người làm mình thấy bình yên nhất là Hằng. Mình… mình thích Hằng, từ lâu rồi. Hằng cho mình một cơ hội, được không?"' },
      { sp: 'Hằng', text: 'Hằng im lặng vài giây — dài như một kỳ thi — rồi cười, mắt đỏ hoe: "Mình chờ câu này… từ cái hôm cho mượn vở rồi đấy. Ừ. Mình nhận lời. Nhưng có điều kiện: hai đứa phải cùng thi đỗ, cùng ở lại đàng hoàng. Tình yêu của người xa xứ là phải kéo nhau đi lên, không phải kéo nhau đi xuống."' },
      { sp: 'narr', text: 'Hai người đi bộ ra ga cạnh nhau, khoảng cách giữa hai vai hẹp hơn mọi ngày một chút. Ở xứ người, tìm được một người cùng tiếng nói, cùng cảnh ngộ, cùng hướng phấn đấu — đó không chỉ là tình yêu, đó là một đồng minh cho cả hành trình dài phía trước.' }
    ]
  },

  'to-tinh-ren': {
    scene: '💌 Tỏ tình với Ren — sau giờ đóng cửa quán',
    branch: [
      { sp: 'narr', text: 'Đêm nay {name} ở lại quán tới lúc đóng cửa, viện cớ "đợi mưa tạnh" dù trời quang mây tạnh. Ren lau xong mặt bếp cuối cùng, quay lại: "Mưa đâu mà đợi?" — "Em không đợi mưa. Em đợi quán vắng người, để nói một chuyện."' },
      { sp: 'hero', jp: '{蓮|れん}さん。{私|わたし}と、{付|つ}き{合|あ}ってください。{蓮|れん}さんの{料理|りょうり}も、{蓮|れん}さん{自身|じしん}も、{好|す}きになりました。', text: '(Anh Ren. Hãy hẹn hò với em nhé. Em đã thích cả món ăn của anh, lẫn chính con người anh.)' },
      { sp: 'Ren', jp: '…{料理|りょうり}の{腕|うで}には{自信|じしん}があるけど、こういうのは、{全然|ぜんぜん}ダメなんだ、{僕|ぼく}。…でも、はい。{嬉|うれ}しい。すごく、{嬉|うれ}しい。', text: '(…Tay nghề nấu ăn thì tôi tự tin, chứ mấy chuyện này thì tôi dở tệ. …Nhưng mà, vâng. Tôi vui lắm. Vui thật sự đấy.) — Ren nói mà tay cứ lau đi lau lại một cái mặt bếp đã sạch bong.' },
      { sp: 'narr', text: 'Từ hôm nay, quán nhậu 新橋 có một món không nằm trong thực đơn: phần ăn "thử món mới" luôn được để riêng cho một thực khách đặc biệt ở quầy counter. Và người đầu bếp ít nói nhất khu phố bắt đầu cười nhiều hơn hẳn.' }
    ]
  },

  'to-tinh-khoi': {
    scene: '💌 Tỏ tình với Khôi — bến ga sau buổi đi chơi',
    branch: [
      { sp: 'narr', text: 'Tiễn Khôi ra ga sau một buổi đi chơi dài, {name} đứng lại ở cửa soát vé thay vì quay lưng đi như mọi lần. Khôi nhận ra điều đó: "Sao thế {call}? Còn chuyện gì à?" — "Ừ. Chuyện này để trong lòng lâu rồi, hôm nay nói."' },
      { sp: 'hero', text: '"Khôi này. Từ ngày em chuyển lớp tới, những ngày ở Nhật của mình bỗng nhẹ hẳn đi. Mình thích em — thích thật, không phải cảm kích suông đâu. Em cho mình một cơ hội, được không?"' },
      { sp: 'Khôi', text: 'Khôi đứng chết trân đúng ba giây, rồi cười tới mức mắt híp lại: "Trời đất… em định là người nói câu này trước, tập nói cả tuần rồi mà {call} nói mất tiêu." — Khôi gãi đầu — "Dạ. Em nhận lời. Từ nay, để em là người đứng về phía {call} một cách chính thức."' },
      { sp: 'narr', text: 'Tàu đến, Khôi lùi vào cửa tàu mà vẫn ngoái lại vẫy tay tới khi tàu chạy khuất. Hai người xa xứ, từ hai miền quê khác nhau, gặp nhau ở một lớp học tiếng Nhật nơi đất khách — đời đôi khi sắp xếp những cuộc gặp như thế, gọn gàng như một câu văn mẫu.' }
    ]
  },

  'to-tinh-loi': {
    scene: '🍂 Lời từ chối nhẹ nhàng',
    branch: [
      { sp: 'narr', text: '{name} lấy hết can đảm nói ra lòng mình — và nhận lại một cái lắc đầu rất khẽ, cùng một nụ cười buồn: "Cảm ơn bạn đã thật lòng. Nhưng tình cảm của mình… chưa tới mức đó. Mình không muốn nhận lời cho có, như thế là không tử tế với cả hai."' },
      { sp: 'narr', text: 'Bị từ chối không phải dấu chấm hết của thế giới — nó chỉ là một ngã rẽ. {name} đi bộ về phòng, lòng buồn mà nhẹ: ít nhất mình đã nói ra, và người kia đã trả lời bằng sự tử tế. Ở xứ người, thêm một người bạn tốt cũng là thêm một phần quê nhà.' },
      { sp: 'narr', text: '(Thiện cảm chưa đủ chín — hãy đi chơi, tặng quà, ở bên nhau thêm một thời gian nữa rồi hãy nói lại. Tình cảm ép chín thì không ngọt.)' }
    ]
  },

  /* ================= KẾT BẠN (hệ quan hệ — giai đoạn 8) ================= */
  'be-ban-hung': {
    scene: '🤝 Kết bạn chính thức với anh Hùng',
    branch: [
      { sp: 'narr', text: 'Ở xứ này, "kết bạn" không phải một nút bấm — nó là một buổi tối Hùng xách sang phòng {name} hai lon trà, ngồi bệt xuống sàn và tuyên bố tỉnh bơ:' },
      { sp: 'Hùng "sẹo"', text: '"Từ nay, có việc gì thì gọi anh trước tiên. Ốm đau, hết tiền, bị bắt nạt — gọi anh. Anh ở Nhật lâu hơn, ngã nhiều hơn, nên biết đường đỡ chú ngã nhẹ hơn. Bạn bè ở xứ người là thế đấy: không phải đứa cùng uống, mà là đứa cùng gánh."' },
      { sp: 'narr', text: 'Hai người cụng lon trà thay rượu. Từ hôm nay, số của Hùng nằm trong danh bạ điện thoại của {name} với đúng vị trí của nó: người gọi khi có chuyện, và là người sẽ có mặt.' }
    ]
  },

  'be-ban-hang': {
    scene: '🤝 Kết bạn chính thức với Hằng',
    branch: [
      { sp: 'narr', text: 'Sau giờ học, Hằng chủ động nói trước: "Ở lớp này, mình thấy nói chuyện với {call} là hợp nhất. Hay là… mình kết bạn đàng hoàng đi. Bạn kiểu có chuyện là gọi nhau ấy, không phải bạn kiểu gật đầu chào."' },
      { sp: 'Hằng', text: '"Người Việt mình ở đây ít, mà giữ được nhau thì quý. Mình trao đổi số nhé — tối nào ôn bài không vào thì gọi, mình giảng cho. Còn hôm nào buồn quá thì cứ nhắn, đừng để trong lòng một mình."' },
      { sp: 'narr', text: 'Số của Hằng vào danh bạ của {name} từ hôm nay — mở đầu cho vô số buổi ôn bài qua điện thoại và những lần "góp gạo thổi cơm chung" về sau.' }
    ]
  },

  'be-ban-yui': {
    scene: '🤝 Kết bạn với Yui — từ "khách quen" thành "bạn"',
    branch: [
      { sp: 'narr', text: 'Hôm nay ở combini, Yui không nói "kính chào quý khách" ngay như mọi lần. Cô ấy ngập ngừng, rồi lấy hết can đảm nói một câu mà chắc đã tập ở nhà:' },
      { sp: 'Yui', jp: 'あの…よかったら、{友達|ともだち}になってくれませんか。{店|みせ}の{人|ひと}と{客|きゃく}さん、じゃなくて、{友達|ともだち}として。', text: '(À… nếu bạn không ngại, mình làm bạn nhé? Không phải người của quán với khách, mà là bạn với nhau.)' },
      { sp: 'hero', jp: 'もちろんです。{嬉|うれ}しいです、{結衣|ゆい}さん。', text: '(Tất nhiên rồi. Tôi vui lắm, Yui.) — Lần đầu {name} gọi thẳng tên cô ấy mà không kèm một câu mua bán nào. Từ hôm nay, số của Yui nằm trong danh bạ của {name} — một người bạn Nhật đúng nghĩa đầu tiên ở thị trấn này.' }
    ]
  },

  'be-ban-mai': {
    scene: '🤝 Kết bạn chính thức với chị Mai',
    branch: [
      { sp: 'narr', text: 'Sau ca làm, chị Mai pha hai cốc trà, ngồi xuống cạnh {name} và nói bằng giọng điềm đạm quen thuộc: "Làm chung bấy lâu, chị coi em như em út trong nhà. Hôm nay nói rõ một lần cho đàng hoàng: mình là bạn, có chuyện gì — việc làm, giấy tờ, hay chỉ là một ngày buồn — thì gọi cho chị."' },
      { sp: 'Chị Mai', text: '"Ở xứ người, người đi trước có nghĩa vụ dìu người đi sau — vì ai cũng từng được dìu như thế. Sau này em vững rồi, em lại dìu người khác. Cứ thế mà cái cộng đồng này nó ấm lên."' },
      { sp: 'narr', text: 'Số của chị Mai vào danh bạ của {name} từ hôm nay — một số điện thoại mà giá trị của nó, sau này {name} mới hiểu hết.' }
    ]
  },

  'be-ban-ren': {
    scene: '🤝 Kết bạn với Ren — người đầu bếp ít nói',
    branch: [
      { sp: 'narr', text: 'Đêm nay quán đóng cửa sớm. Ren dọn bếp xong, lần đầu tiên ngồi xuống ghế khách phía ngoài quầy, đối diện {name}, và nói một câu có vẻ đã chuẩn bị từ lâu:' },
      { sp: 'Ren', jp: '{仕事|しごと}の{話|はなし}じゃなくてさ。…{友達|ともだち}に、なってくれない？ {僕|ぼく}、{友達|ともだち}、{少|すく}ないんだ。', text: '(Không phải chuyện công việc đâu nhé. …Bạn làm bạn với tôi được không? Tôi ít bạn lắm.)' },
      { sp: 'narr', text: 'Với người ít nói, một câu ngắn ngủn như thế nặng bằng cả một bài diễn văn. Từ hôm nay, số của Ren nằm trong danh bạ của {name} — và những lời rủ đi chợ cá, đi ăn, đi chơi bắt đầu có một cái tên gọi mới: bạn bè rủ nhau.' }
    ]
  },

  'be-ban-khoi': {
    scene: '🤝 Kết bạn chính thức với Khôi',
    branch: [
      { sp: 'narr', text: 'Cuối buổi học, Khôi trịnh trọng đứng dậy, nói như tuyên thệ: "Hôm nay em xin phép được kết bạn chính thức với {call}. Bạn kiểu có số nhau, có chuyện là gọi, cuối tuần rủ nhau đi chơi — chứ không phải bạn kiểu biết mặt ở lớp."' },
      { sp: 'Khôi', text: '"Ở quê, bạn bè là phải qua nhà nhau ăn cơm. Ở đây không có nhà to để mời, thì mời nhau bát mì cũng tính. {call} nhớ đấy: số của em, gọi giờ nào cũng được — trừ giờ em đang trên xe nâng ở kho, lúc đó gọi là em bị trừ lương."' },
      { sp: 'narr', text: 'Cả hai cùng cười, trao đổi số. Danh bạ của {name} từ hôm nay có thêm một người đồng hương chắc chắn như một cái neo.' }
    ]
  },

  /* ================= KẾT ĐÔI (cặp đôi chính thức — giai đoạn 8) ================= */
  'ket-doi-yui': {
    scene: '💑 Kết đôi với Yui — một lời hứa nhỏ ở trước ga',
    branch: [
      { sp: 'narr', text: 'Tối nay, ở quảng trường trước ga 新宿， {name} và Yui ngồi trên băng ghế, hai lon trà nóng trong tay. Mối quan hệ của hai người đã đi một đoạn dài từ "khách quen ở quầy" — và hôm nay, {name} muốn gọi nó bằng một cái tên rõ ràng, trước cả hai người.' },
      { sp: 'hero', jp: '{結衣|ゆい}さん。{私|わたし}たち、{正式|せいしき}に「{恋人|こいびと}」として、{二人|ふたり}で{歩|ある}いていきませんか。', text: '(Yui này. Hai đứa mình, chính thức là "người yêu" của nhau, cùng nhau bước tiếp, được không?)' },
      { sp: 'Yui', jp: '…はい。{私|わたし}も、それが{言|い}いたかったんです。{二人|ふたり}で、{歩|ある}いていきましょう。', text: '(…Vâng. Tôi cũng đã muốn nói điều đó. Hai đứa mình, cùng nhau bước tiếp nhé.) — Yui đan tay vào tay {name}, tự nhiên như một việc đã chờ rất lâu để được xảy ra.' },
      { sp: 'narr', text: 'Từ hôm nay, trạng thái của hai người là một CẶP ĐÔI chính thức: có ngày kỷ niệm được ghi lại, có áo đôi đang chờ ở trung tâm thương mại 銀座， và có một người ở thị trấn này mà niềm vui nỗi buồn của {name} luôn có phần. (Ngày kỷ niệm của hai bạn đã được lưu trong mục Quan hệ của điện thoại.)' }
    ]
  },

  'ket-doi-hang': {
    scene: '💑 Kết đôi với Hằng — lời hẹn của hai người xa xứ',
    branch: [
      { sp: 'narr', text: 'Chiều nay, trên con đường từ trường về ga, {name} và Hằng đi chậm hơn mọi ngày. Có những chuyện, nói ở nơi ồn ào thì phí — phải nói trên một con đường yên, cạnh một người yên.' },
      { sp: 'hero', text: '"Hằng này. Mình không muốn mối quan hệ của hai đứa cứ lửng lơ mãi. Mình muốn nó có một cái tên: người yêu — chính thức, rõ ràng, và cùng nhau cố gắng. Hằng đồng ý không?"' },
      { sp: 'Hằng', text: 'Hằng dừng bước, nhìn {name} một lúc rồi cười — nụ cười của người vừa nghe đúng câu mình chờ: "Đồng ý. Nhưng mình nhắc lại điều kiện cũ: cặp đôi này phải kéo nhau đi lên. Cùng thi đỗ, cùng ở lại đàng hoàng, cùng xây một tương lai tử tế. Hứa nhé?" — "Hứa."' },
      { sp: 'narr', text: 'Từ hôm nay, hai người là một CẶP ĐÔI chính thức: ngày kỷ niệm được ghi vào điện thoại, áo đôi chờ ở trung tâm thương mại 銀座， và trên hành trình ở Nhật của {name} có thêm một người đi cùng đường theo đúng nghĩa đen. (Ngày kỷ niệm đã lưu trong mục Quan hệ.)' }
    ]
  },

  'ket-doi-ren': {
    scene: '💑 Kết đôi với Ren — món ăn không có trong thực đơn',
    branch: [
      { sp: 'narr', text: 'Đêm nay, Ren làm riêng một món không có trong thực đơn, đặt trước mặt {name} và ngồi xuống đối diện — việc mà một đầu bếp chỉ làm khi có chuyện quan trọng hơn cả món ăn.' },
      { sp: 'Ren', jp: 'この{料理|りょうり}には、まだ{名前|なまえ}がないんだ。…{僕|ぼく}たちの{関係|かんけい}も、{同|おな}じだった。だから、{今日|きょう}、{名前|なまえ}をつけよう。{正式|せいしき}に、{恋人|こいびと}に、なってください。', text: '(Món này chưa có tên. …Quan hệ của hai đứa mình cũng vậy. Nên hôm nay, mình đặt tên cho nó đi. Hãy chính thức trở thành người yêu của tôi nhé.)' },
      { sp: 'narr', text: '{name} gật đầu, và món ăn không tên đó trở thành món ngon nhất của quán nhậu 新橋 trong đêm ấy. Từ hôm nay, hai người là một CẶP ĐÔI chính thức: ngày kỷ niệm được ghi vào điện thoại, và quầy counter của quán có một chỗ ngồi mang ý nghĩa hoàn toàn khác. (Ngày kỷ niệm đã lưu trong mục Quan hệ.)' }
    ]
  },

  'ket-doi-khoi': {
    scene: '💑 Kết đôi với Khôi — lời hứa ở bến ga',
    branch: [
      { sp: 'narr', text: 'Ở bến ga quen thuộc — nơi bắt đầu của mối quan hệ này — {name} và Khôi đứng cạnh nhau đợi tàu. Nhưng hôm nay không ai vội về: có một chuyện cần được nói ra cho rõ ràng, trước khi tàu đến.' },
      { sp: 'hero', text: '"Khôi này. Mình không muốn hai đứa cứ lửng lơ mãi. Mình muốn nó có một cái tên: người yêu — chính thức, rõ ràng. Em đồng ý không?"' },
      { sp: 'Khôi', text: 'Khôi cười tươi như nắng: "Câu này em chờ nghe lâu rồi đấy. Dạ — em đồng ý. Từ nay, em là người yêu của {call} một cách chính thức: có chuyện vui chia đôi, chuyện buồn gánh chung. Người Việt mình nói một là một — em giữ lời."' },
      { sp: 'narr', text: 'Tàu đến. Lần này, hai người bước lên cùng một toa, ngồi cạnh nhau. Từ hôm nay, hai người là một CẶP ĐÔI chính thức — ngày kỷ niệm đã được ghi vào mục Quan hệ trong điện thoại, và hành trình ở Nhật của {name} có thêm một người đi cùng đường.' }
    ]
  },

  /* ================= ĐI CHƠI CHUNG (cảnh dùng chung cho buổi đi chơi cùng bạn/người yêu) ================= */
  'karaoke-doi': {
    scene: '🎤 Karaoke 渋谷 — hát đôi một buổi',
    branch: [
      { sp: 'narr', text: 'Phòng karaoke nhỏ ở 渋谷， hai chiếc micro, một màn hình lớn và một danh sách bài hát dài vô tận. Người đi cùng {name} hôm nay lật danh sách bài hát với vẻ nghiêm túc như chọn món trong thực đơn nhà hàng sang.' },
      {
        prompt: 'Bài hát đầu tiên của buổi, {name} chọn kiểu gì?',
        choice: [
          { label: 'Chọn một bài song ca nổi tiếng — hát đôi cho ra trò', fx: { love: 3, hp: 1 }, note: 'Đi karaoke chung: hát đôi một bài song ca', say: [
            { sp: 'narr', text: 'Hai giọng hát — một chuẩn, một lạc tông một cách đáng yêu — hòa vào nhau trong căn phòng nhỏ. Hát hay không quan trọng; quan trọng là có những bài hát, hát một mình thì thường, hát hai người thì thành kỷ niệm.' }
          ] },
          { label: 'Mỗi người một bài sở trường, chấm điểm nhau như giám khảo', fx: { love: 2 }, note: 'Đi karaoke chung: chấm điểm nhau như giám khảo', say: [
            { sp: 'narr', text: 'Phần thi "ai hát hay hơn" kết thúc bất phân thắng bại và đầy tranh cãi vui vẻ. Máy chấm điểm cho cả hai những con số không ai công nhận — và đó chính là phần vui nhất.' }
          ] },
          { label: 'Nhường micro phần lớn buổi — nghe người kia hát cũng vui', fx: { love: 1 }, note: 'Đi karaoke chung: nhường micro nghe người kia hát', say: [
            { sp: 'narr', text: '{name} ngồi nghe phần lớn buổi, vỗ tay theo nhịp, thỉnh thoảng hát bè một câu. Có những buổi đi chơi, làm khán giả hạnh phúc cũng là một cách tham gia trọn vẹn.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Tan buổi, hai người đi bộ ra ga trong tiếng nhạc còn văng vẳng trong đầu. Ở Nhật, rủ được nhau đi karaoke và hát lạc tông trước mặt nhau mà không ngại — đó là một cấp độ thân thiết rất riêng.' }
    ]
  },

  'cong-vien-doi': {
    scene: '🌳 Dạo công viên 代々木 cùng nhau',
    branch: [
      { sp: 'narr', text: 'Công viên 代々木 vào buổi chiều cuối tuần: người chạy bộ, người dắt chó, người trải chiếu nằm đọc sách. {name} và người đi cùng thong thả đi hết vòng hồ, nói đủ thứ chuyện trên trời dưới đất mà ở chỗ làm hay lớp học không bao giờ nói tới.' },
      {
        prompt: 'Đi ngang quầy nước ở công viên, {name} sẽ…',
        choice: [
          { label: 'Mua hai lon nước, ngồi ghế đá nói chuyện tới khi nắng nhạt', fx: { love: 2 }, note: 'Dạo công viên chung: ngồi ghế đá nói chuyện', say: [
            { sp: 'narr', text: 'Hai lon nước, một ghế đá, và một buổi chiều không có việc gì gấp. Ở xứ người bận rộn, dành cho nhau một buổi chiều "không làm gì cả" là một món quà xa xỉ hơn mọi món quà mua bằng tiền.' }
          ] },
          { label: 'Rủ người kia chạy bộ một vòng hồ cho khỏe', fx: { hp: 3, love: 1 }, note: 'Dạo công viên chung: chạy bộ quanh hồ', say: [
            { sp: 'narr', text: 'Một vòng hồ, hai người thở không ra hơi ở đoạn cuối và cười vào sự yếu ớt của nhau. Khỏe người, nhẹ đầu — và lần sau chắc chắn sẽ có người rủ chạy tiếp.' }
          ] },
          { label: 'Chụp vài tấm ảnh kỷ niệm ở góc đẹp nhất của công viên', fx: { love: 2 }, note: 'Dạo công viên chung: chụp ảnh kỷ niệm', say: [
            { sp: 'narr', text: 'Vài tấm ảnh chụp vội bằng điện thoại — ánh sáng đẹp, người trong ảnh cười thật. Những tấm ảnh thế này, mấy năm sau xem lại, là cả một thời tuổi trẻ ở Nhật hiện về. (Ảnh kỷ niệm đã lưu vào album.)' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Ra về khi công viên lên đèn, cả hai đều đi chậm hơn lúc tới — như thể bước chân cũng biết là buổi chiều này đáng được kéo dài.' }
    ]
  }
  });
})();



