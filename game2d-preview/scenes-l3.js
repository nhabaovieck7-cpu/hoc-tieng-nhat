// scenes-l3.js — GÓI CHƯƠNG 4 phần cám dỗ / bạo hành nơi làm / cặp đôi / cảnh phụ §6c
// (đợt SAGA 01/11/2026, LANE L-C). Tuyến phạm pháp và bạo hành là nhánh CẢNH TỈNH
// nghiêm túc: không hài hoá, không tả chi tiết bạo lực, luôn hiện rõ đường thoát
// hợp pháp (thầy/công ty phái cử, tổng đài hỗ trợ lao động có tiếng Việt, nghiệp
// đoàn, cảnh sát khu vực). Thể ngữ: Tuấn suồng sã dụ dỗ; Kobayashi lúc quát thì
// thô, lúc ở đồn thì bị buộc phải lịch sự; cảnh sát, bác sĩ, y tá teineigo chuẩn mực;
// cặp đôi đời thường thân mật; kaiwa bếp núc, y tế, onsen lồng tự nhiên.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};
  Object.assign(window.DEMO_DATA, {

  /* ================= NHÓM CÁM DỖ — ARC ANH TUẤN ================= */
  'c4-tuan-1': {
    scene: '📱 Chương 4 — Anh Tuấn quay lại',
    branch: [
      { sp: 'narr', text: 'Điện thoại rung lúc {name} vừa tan ca, người còn nguyên mùi nơi làm việc, ví mỏng đi thấy rõ sau mấy khoản phải chi liền nhau. Số lạ. Tin nhắn đầu tiên chỉ có một câu: "Là anh Tuấn đây. Nghe nói dạo này em vất vả lắm hả?"' },
      { sp: 'narr', text: 'Anh Tuấn — người môi giới ngày xưa từng đưa bao người sang, miệng ngọt, tin tức nhanh, và luôn xuất hiện đúng lúc người ta mệt và thiếu tiền nhất. Như thể anh ta ngửi được mùi đuối sức qua sóng điện thoại.' },
      { sp: 'Anh Tuấn', text: '"Ra phố uống với anh cốc cà phê. Không mất gì đâu, nghe anh nói một đường sống khác. Em cứ làm kiểu này, ba năm nữa cũng không dư được bao nhiêu. Người khôn phải biết chọn lúc rẽ."' },
      { sp: 'narr', text: 'Quán cà phê ở góc phố, tối muộn. Tuấn kéo ghế, gọi đồ uống cho cả hai trước khi {name} kịp từ chối. Cách của anh ta luôn vậy: làm cho người đối diện thấy mình vừa nhận một ân huệ nhỏ.' },
      { sp: 'Anh Tuấn', text: '"Thẳng nhé. BỎ TRỐN ra ngoài làm chui. Bên anh có chỗ đang cần người, lương gấp đôi chỗ em bây giờ, trả tiền mặt. Ai cũng làm thế cả — cả xóm trọ cũ của em, một nửa đã ra rồi, có sao đâu."' },
      { sp: 'Anh Tuấn', text: '"Giấy tờ để anh lo. Em chỉ cần nghỉ một hôm, xách đồ đi theo anh, từ mai là người khác, lương khác. Đừng dại mà báo công ty, báo trường — chúng nó hù em để giữ lao động rẻ thôi."' },
      { sp: 'hero', jp: 'すみません、{逃|に}げたら{在留資格|ざいりゅうしかく}はどうなるんですか。{捕|つか}まったら、{帰国|きこく}させられますよね。', text: '"Xin lỗi, nếu bỏ trốn thì tư cách lưu trú sẽ thế nào ạ? Nếu bị bắt thì sẽ bị cưỡng chế về nước đúng không ạ?" — {name} hỏi chậm, như để tự nhắc mình nghe.' },
      { sp: 'Anh Tuấn', text: '"Ôi dào, em lo xa như cán bộ ấy." Tuấn phẩy tay cười. "Anh làm nghề này bao nhiêu năm, có ai bị gì đâu. Mà kể cả có chuyện — tiền kiếm được đã gấp mấy lần rồi. Nghĩ đi: gấp đôi, tiền mặt, không ai quản."' },
      { sp: 'narr', text: 'Ba chữ "lương gấp đôi" rơi xuống bàn và nằm yên ở đó, sáng lên như mồi câu. {name} nhìn ra phố: người ta đang hối hả về nhà, ai cũng có một nơi hợp pháp để trở về tối nay.' },
      {
        prompt: 'Trước kèo bỏ trốn làm chui của Anh Tuấn, {name} quyết thế nào?',
        choice: [
          { label: 'Gật đầu đi theo Tuấn — "Em tin anh, mai em xách đồ đi"', flag: 'saga-c4', value: 'tuan:theo', fx: { risk: 3 }, note: 'C4 cám dỗ: gật đầu bỏ trốn theo Anh Tuấn — bước vào tuyến đen', say: [
            { sp: 'Anh Tuấn', text: '"Đấy, thế mới là người biết tính toán." Tuấn vỗ vai, hạ giọng: "Đêm mai, sau ca, thu đồ gọn vào một ba lô thôi. SIM điện thoại cắt bỏ. Ai hỏi, em không biết gì hết. Anh đợi ở góc phố."' },
            { sp: 'narr', text: 'Trên đường về, {name} nắm chặt quai ba lô trống trong tưởng tượng. Không có ai ép buộc cả — cái gật đầu vừa rồi là của chính mình. Đó là điều đáng sợ nhất của con đường này.' } ] },
          { label: 'Từ chối thẳng — "Em không bỏ trốn. Đường của em là đường thẳng"', flag: 'saga-c4', value: 'tuan:tu-choi', fx: { jp: 1 }, note: 'C4 cám dỗ: từ chối thẳng kèo bỏ trốn của Anh Tuấn', say: [
            { sp: 'hero', jp: 'すみません、その{話|はなし}は{受|う}けられません。{私|わたし}は{正|ただ}しい{方法|ほうほう}で{働|はたら}きます。', text: '"Xin lỗi, việc đó tôi không thể nhận. Tôi sẽ làm việc theo con đường đúng đắn."' },
            { sp: 'Anh Tuấn', text: '"…Ừ, cứng đấy." Tuấn cười nhạt, nhét lại tờ giấy ghi địa chỉ vào túi. "Nhưng nhớ này: kèo còn mở. Hôm nào đuối quá, cứ gọi anh. Người ta đổi ý nhanh lắm, em ạ."' },
            { sp: 'narr', text: '{name} về phòng, kể lại chuyện này cho bạn cùng phòng nghe ngay trong đêm — một việc nhỏ, mà sau này mới biết là quan trọng: một lời cám dỗ được nói ra ánh sáng thì mất đi một nửa sức nặng.' } ] },
          { label: 'Nghe cho vui, chưa quyết — "Để em nghĩ đã, anh Tuấn"', flag: 'saga-c4', value: 'tuan:nghe', fx: { pressure: 1 }, note: 'C4 cám dỗ: nghe kèo bỏ trốn, chưa quyết định', say: [
            { sp: 'Anh Tuấn', text: '"Nghĩ đi." Tuấn cười, đứng dậy trả tiền cả hai cốc. "Kèo còn mở. Nhưng đừng nghĩ lâu — chỗ tốt không chờ người chậm chân đâu."' },
            { sp: 'narr', text: 'Tờ giấy ghi số điện thoại mới của Tuấn nằm trong túi áo {name} suốt mấy ngày sau, nhẹ mà nặng lạ thường. Chưa quyết — nghĩa là cánh cửa ấy vẫn chưa đóng.' } ] }
        ]
      }
    ]
  },

  'c4-gamble': {
    scene: '🎰 Chương 4 — Kèo gỡ gạc',
    branch: [
      { sp: 'narr', text: 'Mấy hôm sau, Tuấn lại nhắn — lần này không nhắc chuyện bỏ trốn nữa. "Không đi đường dài thì kiếm nhanh một cú đã. Tối nay anh em đi pachinko, rồi xem trận bóng có kèo ngon. Tiền mất vì chậm lương, gỡ lại trong một đêm."' },
      { sp: 'Anh Tuấn', text: '"Em cứ ngồi ôm cái lương chết ấy thì bao giờ mới phất? Chơi nhỏ thôi, anh chỉ điểm cho. Thắng thì coi như trời trả lại phần của mình. Thua… thì ai mà thua mãi được."' },
      { sp: 'narr', text: 'Câu "ai mà thua mãi được" — {name} đã từng nghe ở quê, từ miệng của những người sau đó phải bán cả xe máy. Nhưng tối nay, cơn mệt và cơn túng quẫn làm mọi lời cảnh báo nghe xa xôi.' },
      {
        prompt: 'Tuấn rủ đi pachinko và cá độ bóng đá để "gỡ lại nhanh". {name} làm gì?',
        choice: [
          { label: 'Đi chơi một tối — "Chỉ lần này, gỡ lại cái đã mất thôi"', flag: 'saga-c4', value: 'gamble:choi', fx: { money: -1.2, risk: 1, pressure: 3 }, note: 'C4 cám dỗ: sa vào pachinko/cá độ, thua sạch 1.2 man', say: [
            { sp: 'narr', text: 'Tiếng máy pachinko ồn như mưa đá. Quả bóng bạc chạy những đường không ai điều khiển được. Đầu tối, {name} còn thắng một ít và tin rằng "tay mình đang đỏ". Cuối tối, cả phần thắng lẫn tiền mang theo — tổng cộng 1.2 man — đều nằm lại trong máy và trong một trận bóng ở tận bên kia bán cầu.' },
            { sp: 'Anh Tuấn', text: '"Đen thôi, đỏ quên đi. Mai anh cho vay mà gỡ." Tuấn nói nhẹ tênh. Đó là câu nói nguy hiểm nhất của đêm nay: món nợ đầu tiên luôn được cho vay bằng giọng thân tình như vậy.' },
            { sp: 'narr', text: '{name} từ chối vay, đi bộ về trong đêm. Và rồi điện thoại rung: mẹ gọi video, như mọi tối. Màn hình sáng lên khuôn mặt mẹ ở quê, đang cười: "Lương tháng này về chưa con? Mẹ tính sửa lại cái mái bếp."' },
            { sp: 'hero', text: '"Dạ… tháng này công ty chậm lương mẹ ạ. Chắc… chắc ít hôm nữa mới có. Con gửi về sau nhé." — Câu nói dối trơn tru đến mức chính {name} cũng giật mình. Bên kia, mẹ gật đầu tin ngay: "Ừ, chậm thì thôi, con giữ mà ăn uống, đừng nhịn."' },
            { sp: 'narr', text: 'Cuộc gọi tắt. {name} ngồi rất lâu bên vệ đường. 1.2 man thua trong một đêm không đau bằng câu nói dối vừa rồi — nói dối mẹ, người tin mình không cần một bằng chứng nào. Đêm đó, lần đầu tiên {name} hiểu: cờ bạc lấy tiền rất nhanh, nhưng lấy sự yên lòng còn nhanh hơn.' } ] },
          { label: 'Từ chối — rủ Hùng đi ăn mì, tối nay thế là đủ', flag: 'saga-c4', value: 'gamble:khong', fx: { love: 1 }, note: 'C4 cám dỗ: từ chối pachinko/cá độ, rủ Hùng đi ăn mì', say: [
            { sp: 'hero', jp: 'すみません、{今日|きょう}はやめておきます。{友達|ともだち}とラーメンを{食|た}べに{行|い}く{約束|やくそく}がありますから。', text: '"Xin lỗi, hôm nay tôi xin thôi. Tôi đã có hẹn đi ăn mì với bạn rồi."' },
            { sp: 'Hùng', text: '"Nghe đâu có người vừa thoát một kèo thơm hả?" Hùng gắp mì, cười khà. "Tao nói thật: tiền gỡ bằng cờ bạc, gỡ mười lần mất cả mười một. Ăn bát mì này, ngủ một giấc — mai đi làm, tiền lại về. Chậm mà còn nguyên."' },
            { sp: 'narr', text: 'Hai bát mì bốc khói trong quán nhỏ gần ga. Không ai phất lên trong tối nay cả — nhưng cũng không ai phải nói dối mẹ mình. Trên đường về, {name} xoá số điện thoại mới của Tuấn, sau một giây chần chừ.' } ] }
        ]
      }
    ]
  },

  'c4-dark-1': {
    scene: '🌑 Chương 4 — Đêm bỏ trốn',
    branch: [
      { sp: 'narr', text: 'Đêm bỏ trốn không ồn ào như trong phim. Nó im lặng đến đáng sợ: {name} thu dọn đồ trong bóng tối, chỉ bật đèn pin điện thoại, chọn đi chọn lại rồi cũng chỉ mang một ba lô — quần áo, ít tiền mặt, và cuốn sổ tiếng Nhật đã sờn gáy.' },
      { sp: 'narr', text: 'Tấm thẻ lưu trú vẫn nằm trong ví. Luật pháp của nước Nhật, từ giây phút bước ra khỏi ký túc xá không lời từ biệt này, không còn đứng về phía {name} nữa. Ở lại quá hạn, làm việc ngoài tư cách — mỗi ngày từ nay đều là một ngày phạm luật.' },
      { sp: 'Anh Tuấn', text: '"SIM cũ cắt bỏ đi. Từ giờ dùng số anh đưa. Ai ở chỗ cũ cũng không liên lạc nữa — kể cả bạn thân. Nhớ mặt anh dặn: có chuyện gì, chạy trước, gọi anh sau."' },
      { sp: 'narr', text: 'Chiếc SIM bị bẻ đôi, rơi vào thùng rác ở góc phố. Cùng với nó là đường dây về phía thầy cô, bạn bè, công ty phái cử — những người duy nhất có thể giúp hợp pháp nếu có chuyện. Trong túi áo còn một mảnh giấy ghi số tổng đài hỗ trợ người lao động nước ngoài — {name} chưa vứt nó đi. Chưa.' },
      { sp: 'narr', text: 'Chỗ ở mới là một căn phòng lụp xụp ở rìa thành phố, bốn người chen nhau, cửa không có khoá riêng. Chủ chỗ làm chui đón bằng một cái bắt tay và một câu: "Ở đây không ai hỏi giấy tờ ai. Cũng không ai chịu trách nhiệm cho ai."' },
      { sp: 'narr', text: 'Buổi làm chui đầu tiên: việc nặng hơn, giờ dài hơn chỗ cũ, không bảo hiểm, không khám sức khoẻ, không ai hỏi han khi tay rớm máu vì một vết xước. Cuối ngày, tiền mặt trao tận tay — nhiều thật, đúng như lời Tuấn hứa.' },
      { sp: 'narr', text: 'Nhưng lúc đi ngang qua đồn cảnh sát trên đường về, một viên cảnh sát đang đứng ghi chép gì đó ở cửa. Tim {name} đập thình thịch, chân tự bước nhanh, mắt tự cúi xuống. Tiền trong túi bỗng nhẹ bẫng — còn nỗi sợ thì nặng như đeo đá.' },
      { sp: 'narr', text: 'Đêm đầu tiên ở chỗ ở mới, {name} giật mình tỉnh giấc ba lần vì những tiếng động lạ. Ở ký túc xá cũ, tiếng động lạ nhất cũng chỉ là tiếng bạn cùng phòng ngáy. Ở đây, mọi âm thanh đều phải nghe ngóng như nghe một tín hiệu nguy hiểm.' },
      { sp: 'narr', text: 'Trước khi ngủ, {name} nhìn chiếc điện thoại dùng SIM mới: không một tin nhắn quen thuộc nào. Sự cô lập mà Tuấn gọi là "an toàn" — hoá ra trông giống hệt sự biến mất.' },
      { sp: 'hero', text: '"Mình vừa đổi cái gì lấy cái gì thế này…" — câu hỏi lẩm bẩm trong căn phòng lạ, giữa những người lạ, ở một thành phố bỗng nhiên không còn thuộc về mình nữa.' }
    ]
  },

  'c4-dark-2': {
    scene: '🌧️ Chương 4 — Sống chui',
    branch: [
      { sp: 'narr', text: 'Mấy tháng sống chui trôi qua như một cái bóng dài. Không địa chỉ đăng ký, không thẻ bảo hiểm, không dám khai tên thật ở bất cứ đâu. {name} học thêm được một thứ tiếng mới: tiếng của sự im lặng mỗi khi có người gõ cửa phòng trọ.' },
      { sp: 'narr', text: 'Tháng thứ hai, {name} ốm — sốt cao, ho không dứt. Người cùng phòng đưa cho vài viên thuốc cảm mua ở hiệu thuốc và một câu thật lòng: "Đừng đi viện. Vào viện là lộ." Một trận ốm ở tuổi đôi mươi, mà phải nằm nhà tự chịu như một cái tội.' },
      { sp: 'narr', text: 'Tháng thứ ba, chủ chỗ làm chui quỵt mất hai tuần lương. "Muốn đòi thì đi mà báo cảnh sát." Hắn cười khi nói câu đó — vì hắn biết, và {name} cũng biết, rằng cánh cửa đồn cảnh sát là cánh cửa {name} không dám bước vào nhất.' },
      { sp: 'narr', text: 'Tin tức từ ký túc xá cũ len lỏi tới qua một người quen: bạn bè vẫn đi làm đường hoàng, có người vừa thi đỗ chứng chỉ, có người được tăng lương. Thầy cô từng hỏi thăm {name} một thời gian, rồi thôi. Mỗi tin nghe được là một lần tự hỏi: nếu ngày đó mình ở lại…' },
      { sp: 'narr', text: 'Điện thoại mẹ gọi, {name} vẫn phải nói dối — giọng phải vui, chuyện phải bịa cho trơn tru. Nói dối quen dần là một thứ rất đáng sợ: nó không còn cắn rứt như lần đầu nữa. Chỉ còn mệt. Mệt đến tận xương.' },
      { sp: 'narr', text: 'Đường thoát vẫn còn đó, dù hẹp: tự ra trình diện, hoặc gọi tới tổng đài hỗ trợ, chấp nhận xử lý theo pháp luật mà về nước trong tư thế ngẩng đầu hơn là bị bắt. {name} đã cầm mảnh giấy ghi số điện thoại ấy lên nhiều lần trong đêm — và lại đặt xuống nhiều lần như thế.' },
      { sp: 'narr', text: 'Có đêm, {name} ngồi tính lại sổ sách của mấy tháng sống chui: tiền vào nhiều hơn thật, nhưng tiền giữ được thì không hơn bao nhiêu — và cái giá phải trả bằng sức khoẻ, bằng giấc ngủ, bằng từng câu nói dối với mẹ, thì không có cột nào trong sổ ghi nổi.' },
      { sp: 'narr', text: 'Cũng có đêm, {name} đã bấm gần đủ dãy số của tổng đài hỗ trợ, chỉ còn thiếu một phím cuối. Bấm nốt phím đó, mọi chuyện sẽ rẽ sang một hướng khác — đau đớn, nhưng là đau đớn có lối ra. Đêm ấy, ngón tay vẫn dừng lại.' },
      { sp: 'narr', text: 'Rạng sáng. Trời chưa sáng hẳn. Cả phòng trọ đang ngủ say thì — CỘC. CỘC. CỘC. Tiếng gõ cửa. Không phải kiểu gõ của người quen. Là kiểu gõ chậm, đều, và chắc chắn của người biết rõ mình có quyền đứng ở phía bên kia cánh cửa.' },
      { sp: 'narr', text: '{name} ngồi bật dậy, tim đập vào tận cổ họng. Ba lô vẫn để ở góc phòng, y nguyên như đêm đầu tiên bỏ trốn — như thể sâu trong lòng, mình vẫn luôn biết ngày này sẽ tới.' }
    ]
  },

  'ket-den': {
    scene: '⬛ Kết cục 5 — Kết cục đen',
    branch: [
      { sp: 'narr', text: 'Mọi chuyện khép lại không ồn ào. Sau buổi làm việc với cơ quan quản lý xuất nhập cảnh, quyết định được đọc rõ ràng, có phiên dịch: cưỡng chế trục xuất. Trong cuốn hộ chiếu đóng một dấu — cấm nhập cảnh Nhật Bản 5 năm. Năm năm, cho những tháng ngày ngỡ là "kiếm nhanh".' },
      { sp: 'narr', text: 'Chuyến bay về quê, hành lý chỉ có một ba lô. Số tiền làm chui kiếm được phần lớn đã tan vào tiền trọ, tiền môi giới, hai tuần lương bị quỵt không bao giờ đòi lại được, và những ngày ốm nằm nhà không lương. Tay trắng — đúng nghĩa đen của hai chữ đó.' },
      { sp: 'narr', text: 'Sân bay quê nhà. Bố mẹ đứng chờ ở cửa ra, vẫn nụ cười ấy. {name} bước tới, định nói một câu xin lỗi cho trọn vẹn — mà cổ họng nghẹn lại. Mẹ ôm chầm lấy trước, không hỏi một câu nào về tiền. Bố xách chiếc ba lô nhẹ tênh lên, lặng lẽ nói: "Về nhà đã. Mọi chuyện, tính sau."' },
      { sp: 'narr', text: 'Sự im lặng trên xe về nhà dài hơn mọi lời trách mắng. Chính sự tử tế ấy mới làm {name} đau nhất: bố mẹ đã chuẩn bị một tương lai khác cho đứa con đi Nhật — và không ai trong nhà ngờ, nó lại kết thúc bằng một con dấu trong hộ chiếu.' },
      { sp: 'narr', text: '⬛ KẾT CỤC 5 — «KẾT CỤC ĐEN». Không ai đẩy {name} vào con đường này: nó bắt đầu bằng một cái gật đầu trước một lời dụ dỗ "ai cũng làm", và lớn dần bằng từng lần chần chừ không quay lại. Ở ngoài đời, không có nút chơi lại — một lần bỏ trốn có thể đóng cửa nước Nhật nhiều năm, và để lại món nợ niềm tin với chính gia đình mình. Trong trò chơi này thì có: quay lại Chương 4, từ chối Anh Tuấn ngay từ cốc cà phê đầu tiên, và đi con đường thẳng — chậm hơn, mà là đường của mình. (Đạt được bằng lựa chọn của chính bạn trong tuyến cám dỗ Chương 4.)' }
    ]
  },

  /* ================= BẠO HÀNH NƠI LÀM — NGHIÊM TÚC, ĐƯỜNG ĐÚNG ================= */
  'c4-bully-1': {
    scene: '⚠️ Chương 4 — Tổ trưởng mới',
    branch: [
      { sp: 'narr', text: 'Tổ trưởng mới chuyển về ca của {name}: Kobayashi. Tuần đầu tiên, cả ca đã nhận ra một điều — ông ta luôn cần một người để trút. Và người được chọn là Phong, đồng nghiệp Việt ở cùng nơi làm, hiền nhất ca, tiếng Nhật yếu nhất ca.' },
      { sp: 'Tổ trưởng Kobayashi', text: '"Lại chậm nữa! Việc thế này mà cũng không xong thì ở đây làm gì? Nghe không hiểu thì gật đầu làm gì hả?" — tiếng quát vang trước cả ca, giữa bao nhiêu người. Phong đứng cúi đầu, tay còn cầm dụng cụ, không nói được một câu trọn vẹn.' },
      { sp: 'narr', text: 'Không dừng ở lời nói. Phong bị giao phần việc quá sức một người, ca của Phong bị ghi lỗi vô lý hết lần này tới lần khác, và hôm nay — bảng phân ca bị ném xuống bàn trước mặt Phong, giấy tờ bay tung toé. Cả ca im phăng phắc. Sự im lặng ấy cũng là một phần của vấn đề.' },
      { sp: 'Phong', text: '"Thôi… chắc tại em chậm thật. Anh đừng can, kẻo liên luỵ. Em chịu được." Phong nói nhỏ, tay nhặt từng tờ phân ca lên, xếp lại ngay ngắn — cái cách người ta cố giữ phẩm giá của mình trong một ngày tồi tệ.' },
      {
        prompt: 'Chứng kiến Phong bị bắt nạt ngay trước mặt, {name} làm gì?',
        choice: [
          { label: 'Im lặng chịu đựng cùng Phong — việc của mình, mình lo chưa xong', flag: 'saga-c4', value: 'bully:chiu-dung', fx: { pressure: 3, hp: -3 }, note: 'C4 bạo hành: im lặng chịu đựng — áp lực dồn nén, dư âm còn dài', say: [
            { sp: 'narr', text: '{name} quay lại với phần việc của mình, tai vẫn nghe từng câu quát phía sau. Tối đó về phòng, bữa cơm nuốt không trôi. Im lặng giúp một ngày trôi qua êm thấm — nhưng trong lòng {name} biết rõ: ngày mai, Phong vẫn phải đứng ở chỗ cũ, một mình.' } ] },
          { label: 'Âm thầm thu thập chứng cứ — ghi âm, chép sổ ca, bàn riêng với Phong', flag: 'saga-c4', value: 'bully:thu-thap', fx: { jp: 1 }, note: 'C4 bạo hành: thu thập chứng cứ bài bản — ghi âm, sổ ca, bàn với Phong', say: [
            { sp: 'hero', jp: '{大丈夫|だいじょうぶ}、{私|わたし}が{証拠|しょうこ}を{集|あつ}めます。{録音|ろくおん}とシフトの{記録|きろく}があれば、{相談|そうだん}できます。', text: '"Không sao, mình sẽ thu thập chứng cứ. Có ghi âm và ghi chép phân ca là có thể đi tư vấn được."' },
            { sp: 'narr', text: 'Từ hôm đó, điện thoại trong túi áo {name} ghi lại từng buổi quát mắng, cuốn sổ tay chép rõ ngày, giờ, người chứng kiến, lỗi nào bị ghi oan. Và quan trọng nhất: {name} nói chuyện riêng với Phong — "Mình không chịu mãi được đâu. Phải đi đường đúng, cùng nhau đi." Phong gật đầu, mắt đỏ hoe.' } ] },
          { label: 'Đứng ra can thiệp ngay tại chỗ, bằng kính ngữ cứng rắn', flag: 'saga-c4', value: 'bully:bao-ngay', fx: { love: 1, pressure: 1 }, note: 'C4 bạo hành: can thiệp ngay tại chỗ bằng kính ngữ cứng rắn', say: [
            { sp: 'hero', jp: 'すみません、{組長|くみちょう}。その{言|い}い{方|かた}は、{指導|しどう}ではなく{皆|みな}の{前|まえ}での{叱責|しっせき}だと{思|おも}います。{仕事|しごと}の{話|はなし}は、{冷静|れいせい}にお{願|ねが}いできませんか。', text: '"Xin lỗi tổ trưởng. Cách nói đó, tôi nghĩ không phải là chỉ đạo mà là quát mắng trước mặt mọi người. Việc công việc, xin hãy trao đổi một cách bình tĩnh được không ạ?"' },
            { sp: 'Tổ trưởng Kobayashi', text: '"…Mày là ai mà dạy tao cách nói chuyện?" Kobayashi sững một giây — rồi hạ giọng, quay đi. Cả ca thở phào. Nhưng ánh mắt ông ta nhìn {name} lúc quay đi cho thấy: chuyện này chưa xong ở đây. Cần một đường chính thức, không chỉ một phút dũng cảm.' } ] }
        ]
      },
      { sp: 'narr', text: 'Tối đó, {name} nằm nhìn trần nhà rất lâu. Dù đã chọn cách nào, một điều đã rõ: chuyện ở ca này không tự hết được. Nó cần được giải quyết — bằng chứng cứ, bằng tổ chức, bằng luật. Chỉ là sớm hay muộn, và cái giá phải trả trong lúc chờ đợi.' }
    ]
  },

  'c4-bully-dh': {
    scene: '⚠️ Chương 4 — Ca làm thêm ở quán',
    branch: [
      { sp: 'narr', text: 'Quán baito buổi tối đông khách. Quản lý ca mới là người nói nhanh, nóng tính — và sinh viên làm thêm nước ngoài là đối tượng dễ bị ông ta trút giận nhất, vì biết các em sợ mất việc, sợ bị trừ lương, sợ cả việc phải cãi lại bằng thứ tiếng chưa phải tiếng mẹ đẻ.' },
      { sp: 'Quản lý ca', text: '"Chậm thế này thì đừng đi làm nữa! Khách đang đợi kia kìa — nghe không hiểu tiếng Nhật thì về nước đi!" — câu quát vang ra tận bàn khách. Mấy vị khách gần quầy ngẩng lên nhìn. Cô sinh viên bị quát cúi gằm, tay run run bê khay.' },
      { sp: 'narr', text: 'Chưa hết: tuần này quản lý ca ép sinh viên ở lại quá giờ mà không tính lương tăng ca, lại doạ "làm vỡ một cái đĩa là trừ thẳng vào lương". Trừ lương vô lý như vậy là trái luật lao động — nhưng người bị doạ thì ít ai biết điều đó trong lúc đang run.' },
      { sp: 'narr', text: 'Giờ làm của du học sinh có giới hạn theo luật, tiền lương và tăng ca cũng có luật bảo vệ — không phân biệt quốc tịch. Vấn đề không phải là không có đường đúng. Vấn đề là có ai chịu đứng ra đi đường đó hay không.' },
      {
        prompt: 'Trước cảnh quản lý ca bắt nạt sinh viên làm thêm, {name} làm gì?',
        choice: [
          { label: 'Im lặng chịu đựng — mất việc thì tiền học cũng mất theo', flag: 'saga-c4', value: 'bully:chiu-dung', fx: { pressure: 3, hp: -3 }, note: 'C4 bạo hành (du học): im lặng chịu đựng ở quán baito', say: [
            { sp: 'narr', text: '{name} cúi đầu làm tiếp phần việc của mình. Đêm về, nghĩ tới cô bạn sinh viên bê khay với đôi tay run, {name} không ngủ được. Số giờ bị ép làm không lương tuần này lại tăng thêm — im lặng hoá ra cũng có giá, và giá đó tính bằng chính sức của mình.' } ] },
          { label: 'Âm thầm thu thập chứng cứ — ghi âm, chụp bảng chấm công, bàn với các bạn cùng ca', flag: 'saga-c4', value: 'bully:thu-thap', fx: { jp: 1 }, note: 'C4 bạo hành (du học): thu thập chứng cứ ở quán baito', say: [
            { sp: 'hero', jp: '{証拠|しょうこ}を{集|あつ}めましょう。{録音|ろくおん}とタイムカードの{写真|しゃしん}があれば、{労働相談|ろうどうそうだん}に{行|い}けます。', text: '"Mình thu thập chứng cứ đi. Có ghi âm và ảnh thẻ chấm công là đi tư vấn lao động được."' },
            { sp: 'narr', text: 'Bảng chấm công được chụp lại từng ngày, giờ bị ép ở lại được ghi vào sổ, đoạn quát mắng trước khách được lưu lại. {name} hẹn các bạn cùng ca ở quán cà phê sau giờ làm: "Một người đi tố thì sợ. Cả ca cùng ký tên vào đơn trình bày — thì đó là sự thật." Lần đầu tiên, cả nhóm gật đầu cùng lúc.' } ] },
          { label: 'Đứng ra can thiệp ngay tại chỗ, bằng kính ngữ cứng rắn', flag: 'saga-c4', value: 'bully:bao-ngay', fx: { love: 1, pressure: 1 }, note: 'C4 bạo hành (du học): can thiệp ngay bằng kính ngữ cứng rắn', say: [
            { sp: 'hero', jp: 'すみません、{店長|てんちょう}。お{客様|きゃくさま}の{前|まえ}でその{言|い}い{方|かた}は、{店|みせ}のためにもよくないと{思|おも}います。{指示|しじ}は{落|お}ち{着|つ}いてお{願|ねが}いします。', text: '"Xin lỗi quản lý. Nói như vậy trước mặt khách, tôi nghĩ cũng không tốt cho quán. Xin hãy chỉ thị một cách bình tĩnh ạ."' },
            { sp: 'Quản lý ca', text: '"…" Quản lý ca khựng lại — có lẽ vì nhận ra khách đang nhìn thật. Ông ta hắng giọng, bỏ vào trong. Nhưng khoản giờ làm không lương vẫn nằm đó trên bảng chấm công. Một phút can đảm cần được nối tiếp bằng một thủ tục đàng hoàng.' } ] }
        ]
      },
      { sp: 'narr', text: 'Trên đường về, {name} tra cứu trên điện thoại: tổng đài tư vấn lao động cho người nước ngoài, có hỗ trợ tiếng Việt. Số điện thoại được lưu vào danh bạ với cái tên rất rõ ràng: "Đường đúng".' }
    ]
  },

  'c4-bully-2': {
    scene: '⚖️ Chương 4 — Giải quyết đường đúng',
    branch: [
      { sp: 'narr', text: 'Sáng thứ Hai, {name} và Phong không vào ca vội. Hai người tới đồn cảnh sát khu vực trước — không phải để tố cáo ầm ĩ, mà để trình bày và xin ghi nhận. Mang theo: điện thoại có file ghi âm, cuốn sổ chép ca, và một tờ trình bày viết sẵn bằng tiếng Nhật trang trọng.' },
      { sp: 'hero', jp: 'おはようございます。{職場|しょくば}でのパワーハラスメントについて、ご{相談|そうだん}に{参|まい}りました。{録音|ろくおん}とシフトの{記録|きろく}を{持参|じさん}しております。ご{確認|かくにん}いただけますでしょうか。', text: '"Chào buổi sáng. Chúng tôi đến để xin tư vấn về việc quấy rối quyền lực nơi làm việc. Chúng tôi có mang theo ghi âm và ghi chép phân ca. Xin vui lòng kiểm tra giúp ạ."' },
      { sp: 'Cảnh sát', jp: 'はい、{内容|ないよう}を{確認|かくにん}します。{落|お}ち{着|つ}いて、{時系列|じけいれつ}でお{話|はな}しください。{通訳|つうやく}が{必要|ひつよう}であれば、{手配|てはい}もできます。', text: '"Vâng, chúng tôi sẽ xác nhận nội dung. Xin cứ bình tĩnh, trình bày theo trình tự thời gian. Nếu cần phiên dịch, chúng tôi cũng có thể sắp xếp."' },
      { sp: 'narr', text: 'Mọi việc được ghi vào biên bản: ngày, giờ, lời lẽ, người chứng kiến. Viên cảnh sát hướng dẫn bước tiếp theo rõ ràng: liên hệ tổng đài hỗ trợ lao động — nơi có tư vấn bằng tiếng Việt — và gửi đơn tới cơ quan thanh tra lao động cùng nghiệp đoàn của công ty.' },
      { sp: 'hero', jp: 'もしもし、{労働相談|ろうどうそうだん}の{窓口|まどぐち}でしょうか。ベトナム{語|ご}で{相談|そうだん}できますか。{職場|しょくば}のハラスメントと、{給料|きゅうりょう}の{不当|ふとう}な{天引|てんび}きについてです。', text: '"A lô, đây có phải tổng đài tư vấn lao động không ạ? Tôi có thể tư vấn bằng tiếng Việt không ạ? Việc này liên quan tới quấy rối nơi làm việc và khoản lương bị trừ không đúng quy định."' },
      { sp: 'narr', text: 'Đầu dây bên kia là một giọng tiếng Việt ấm và chuyên nghiệp. Lần đầu tiên sau nhiều tuần, Phong trình bày được mọi chuyện bằng tiếng mẹ đẻ, không thiếu một chi tiết nào vì vốn từ. Người tư vấn ghi nhận, hướng dẫn từng giấy tờ, và hẹn lịch làm việc với công ty.' },
      { sp: 'narr', text: 'Nghiệp đoàn vào cuộc. Buổi làm việc ba bên diễn ra trong phòng họp nhỏ: ghi âm được mở, sổ ca được đối chiếu, bảng lương bị trừ vô lý được đặt lên bàn. Không ai cần phải to tiếng — chứng cứ tự nó đã nói đủ to rồi.' },
      { sp: 'narr', text: 'Kết quả được thông báo bằng văn bản: Kobayashi bị khiển trách chính thức và chuyển sang ca khác, không còn quản lý nhóm của Phong. Khoản tiền ca bị trừ vô lý được hoàn trả đầy đủ cho Phong, kèm một lời xin lỗi chính thức từ công ty trước cả ca.' },
      { sp: 'Tổ trưởng Kobayashi', text: '"…Xin lỗi. Tôi đã… quá lời và làm sai quy định." Câu xin lỗi gượng gạo, ngắn ngủi — nhưng được nói ra trước mặt mọi người, theo đúng thủ tục. Đôi khi công lý nơi công sở trông như thế này: không ồn ào, mà bằng văn bản.' },
      { sp: 'Phong', text: '"Cảm ơn thật đấy. Trước giờ em cứ nghĩ sang đây thì phải chịu. Hoá ra luật nó bảo vệ cả mình — chỉ là mình phải biết đường mà đi, và… phải có người đi cùng." Phong cười, lần đầu tiên sau nhiều tuần cười mà không cúi đầu.' },
      { sp: 'narr', text: 'Bài học của chương này, {name} ghi vào cuối cuốn sổ ca: bị bắt nạt không phải lỗi của mình, và chịu đựng mãi không phải cách giải quyết duy nhất. Ghi lại chứng cứ. Tìm tổng đài có tiếng Việt. Nhờ nghiệp đoàn và cơ quan lao động. Đường đúng có thể chậm — nhưng nó tới nơi, và nó bảo vệ được cả những người đến sau.' }
    ]
  },

  'c4-bully-2b': {
    scene: '🏥 Chương 4 — Cái giá của im lặng',
    branch: [
      { sp: 'narr', text: 'Tuần thứ ba kể từ ngày {name} chọn im lặng, Phong ngất ngay trong ca. Không dramatic, không ai kịp đỡ — chỉ là một cơ thể đã quá sức từ lâu, cộng thêm những đêm mất ngủ vì sợ ngày mai đi làm. Phong được đưa vào viện khám, truyền nước, nằm lại theo dõi.' },
      { sp: 'Phong', text: '"Không sao đâu… chắc em thiếu ngủ thôi." Phong nằm trên giường bệnh, tay còn vết kim truyền, vẫn cố cười trấn an mọi người. Chính câu "không sao đâu" ấy làm {name} đứng ngoài hành lang bệnh viện mà không ngăn được nước mắt.' },
      { sp: 'narr', text: 'Day dứt là một thứ không cho người ta đứng yên lâu. Ngay tối đó, {name} mở điện thoại ra xem lại: may thay, mấy đoạn ghi âm lén ghi từ những ngày đầu vẫn còn; cuốn sổ tay của Phong, hoá ra, cũng chép lại không ít ngày tháng bị ghi lỗi oan. Chứng cứ gom muộn — nhưng chưa phải là quá muộn.' },
      { sp: 'hero', jp: 'すみません、{遅|おそ}くなりましたが、ご{相談|そうだん}させてください。{同僚|どうりょう}が{体調|たいちょう}を{崩|くず}して{入院|にゅういん}しました。{録音|ろくおん}と{記録|きろく}はあります。', text: '"Xin lỗi, dù muộn nhưng xin cho tôi được tư vấn. Đồng nghiệp của tôi đã suy sụp sức khoẻ và phải nhập viện. Chúng tôi có ghi âm và ghi chép ạ."' },
      { sp: 'narr', text: 'Tổng đài hỗ trợ lao động có tiếng Việt tiếp nhận hồ sơ. Nghiệp đoàn vào cuộc muộn hơn con đường kia vài tuần, thủ tục cũng vất vả hơn vì chứng cứ phải nối lại từng mảnh — nhưng cuối cùng, kết luận vẫn rõ ràng: Kobayashi bị xử lý kỷ luật và chuyển ca, công ty phải hoàn trả các khoản trừ vô lý và cam kết bằng văn bản về môi trường làm việc.' },
      { sp: 'narr', text: 'Phong xuất viện, sức khoẻ dần hồi lại, được chuyển sang ca nhẹ một thời gian. Ngày quay lại nơi làm, Phong đi ngang qua bảng phân ca mới — không còn cái tên nào bị ghi lỗi vô lý nữa.' },
      { sp: 'Phong', text: '"Anh biết câu em nhớ nhất là gì không? Không phải câu chửi nào của lão Kobayashi đâu. Là câu anh nói hôm vào viện thăm em: Lần sau có chuyện, mình báo ngay từ ngày đầu tiên." Phong nói câu đó rất khẽ — và {name} biết mình sẽ nhớ nó suốt những năm ở Nhật.' },
      { sp: 'Phong', text: '"Em không trách anh chuyện im lặng đâu. Hồi đó em cũng bảo anh đừng can mà. Nhưng từ giờ hai anh em mình có giao kèo nhé: thấy chuyện bất thường là ghi lại ngay, nói với nhau ngay. Đừng để tới lúc vào viện mới bắt đầu."' },
      { sp: 'narr', text: 'Trên đường từ bệnh viện về, {name} lưu số tổng đài hỗ trợ lao động có tiếng Việt vào danh bạ, ghim lên đầu danh sách, và gửi nó cho cả nhóm bạn ở nơi làm — để lần sau, bất kỳ ai cần, số điện thoại ấy cũng đã nằm sẵn trong máy họ rồi.' },
      { sp: 'narr', text: 'Chuyện vẫn được giải quyết — đường đúng không bao giờ đóng hẳn. Nhưng nó đến muộn hơn, và cái giá phải trả là những ngày nằm viện của một người bạn. {name} ghi vào sổ: im lặng không làm mọi chuyện qua đi. Nó chỉ hoãn lại, và cộng thêm lãi.' }
    ]
  },

  /* ================= CẶP ĐÔI — ẤM, ĐỜI THƯỜNG ================= */
  'c4-couple-1': {
    scene: '🍲 Chương 4 — Bữa cơm sau ngày tiễn bạn',
    branch: [
      { sp: 'narr', text: 'Chiều nay {name} vừa tiễn một người bạn về nước ở sân bay — cái ôm cuối, cánh tay vẫy mãi tới khi khuất sau cửa an ninh. Về tới phòng, căn phòng im lặng đến lạ. Rồi có tiếng gõ cửa quen thuộc.' },
      { sp: 'Người yêu', text: '"Em qua này. Không nhắn trước — sợ anh ở nhà một mình lại nghĩ ngợi. Nay đừng ra ngoài ăn. Em nấu. Anh phụ em nhặt rau, thế là đủ rồi."' },
      { sp: 'Người yêu', jp: 'ねえ、{味見|あじみ}して。{薄|うす}くない？{醤油|しょうゆ}、もう{少|すこ}し{足|た}したほうがいいかな。', text: '"Này, anh nếm thử đi. Có nhạt không? Em có nên cho thêm một chút xì dầu không?"' },
      { sp: 'hero', jp: '{美味|おい}しいよ。あと{少|すこ}しだけ{醤油|しょうゆ}を{足|た}せば、ごはんにちょうどいいと{思|おも}う。', text: '"Ngon đấy. Thêm một chút xì dầu nữa thôi là vừa ăn với cơm, anh nghĩ vậy."' },
      { sp: 'narr', text: 'Bữa cơm chung nấu trong căn bếp nhỏ xíu: một món mặn, một món canh, cơm nóng bốc khói. Người yêu không hỏi han dồn dập chuyện sân bay, không khuyên những câu to tát. Chỉ gắp cho {name} miếng ngon nhất, như một cách nói: buồn thì cứ buồn, cơm vẫn phải ăn nóng.' },
      { sp: 'Người yêu', text: '"Bạn anh về rồi, chắc phòng bên kia trống lắm. Nhưng này — ở lại hay về, ai cũng có đường của người ta. Anh còn ở đây ngày nào, thì ngày đó còn có em nấu cơm cùng. Mai mình đi làm, tối mai lại ăn chung. Thế thôi, từng ngày một."' },
      { sp: 'hero', jp: 'じゃあ、{皿洗|さらあら}いは{僕|ぼく}がする。いつも{作|つく}ってくれて、ありがとう。', text: '"Vậy thì rửa bát để anh. Cảm ơn em, lúc nào cũng nấu cho anh."' },
      { sp: 'Người yêu', jp: 'いいよ、{一緒|いっしょ}に{洗|あら}おう。その{方|ほう}が{早|はや}いし、その{間|あいだ}に{明日|あした}の{話|はなし}もできるし。', text: '"Thôi, mình rửa cùng nhau đi. Vừa nhanh hơn, vừa trong lúc rửa còn nói chuyện ngày mai được nữa."' },
      { sp: 'narr', text: 'Hai người đứng chen nhau bên bồn rửa nhỏ, tiếng nước chảy, tiếng bát đũa chạm nhau khe khẽ. Chuyện ngày mai hoá ra toàn chuyện nhỏ: ca làm mấy giờ, trời có mưa không, cuối tuần đi siêu thị mua gì. Mà chính những chuyện nhỏ ấy kéo một ngày buồn trở lại mặt đất.' },
      { sp: 'narr', text: 'Đêm xuống, nỗi buồn vì người bạn ra đi vẫn còn — nhưng nó không còn ở một mình trong phòng nữa. Nó ngồi cạnh một bữa cơm nóng, một đôi đũa gắp cho nhau, và một lời hẹn rất đỗi bình thường cho tối mai.' }
    ]
  },

  'c4-couple-1m': {
    scene: '🍲 Chương 4 — Bữa cơm sau ngày tiễn bạn',
    branch: [
      { sp: 'narr', text: 'Chiều nay {name} vừa tiễn một người bạn về nước ở sân bay — cái ôm cuối, cánh tay vẫy mãi tới khi khuất sau cửa an ninh. Về tới phòng, căn phòng im lặng đến lạ. Rồi có tiếng gõ cửa quen thuộc.' },
      { sp: 'Anh người yêu', text: '"Anh qua này. Không nhắn trước — sợ em ở nhà một mình lại nghĩ ngợi. Nay đừng ra ngoài ăn. Anh nấu. Em phụ anh nhặt rau, thế là đủ rồi."' },
      { sp: 'Anh người yêu', jp: 'ねえ、{味見|あじみ}して。{薄|うす}くない？{醤油|しょうゆ}、もう{少|すこ}し{足|た}したほうがいいかな。', text: '"Này, em nếm thử đi. Có nhạt không? Anh có nên cho thêm một chút xì dầu không?"' },
      { sp: 'hero', jp: '{美味|おい}しいよ。あと{少|すこ}しだけ{醤油|しょうゆ}を{足|た}せば、ごはんにちょうどいいと{思|おも}う。', text: '"Ngon đấy. Thêm một chút xì dầu nữa thôi là vừa ăn với cơm, em nghĩ vậy."' },
      { sp: 'narr', text: 'Bữa cơm chung nấu trong căn bếp nhỏ xíu: một món mặn, một món canh, cơm nóng bốc khói. Anh không hỏi han dồn dập chuyện sân bay, không khuyên những câu to tát. Chỉ gắp cho {name} miếng ngon nhất, như một cách nói: buồn thì cứ buồn, cơm vẫn phải ăn nóng.' },
      { sp: 'Anh người yêu', text: '"Bạn em về rồi, chắc phòng bên kia trống lắm. Nhưng này — ở lại hay về, ai cũng có đường của người ta. Em còn ở đây ngày nào, thì ngày đó còn có anh nấu cơm cùng. Mai mình đi làm, tối mai lại ăn chung. Thế thôi, từng ngày một."' },
      { sp: 'hero', jp: 'じゃあ、{皿洗|さらあら}いは{私|わたし}がする。いつも{作|つく}ってくれて、ありがとう。', text: '"Vậy thì rửa bát để em. Cảm ơn anh, lúc nào cũng nấu cho em."' },
      { sp: 'Anh người yêu', jp: 'いいよ、{一緒|いっしょ}に{洗|あら}おう。その{方|ほう}が{早|はや}いし、その{間|あいだ}に{明日|あした}の{話|はなし}もできるし。', text: '"Thôi, mình rửa cùng nhau đi. Vừa nhanh hơn, vừa trong lúc rửa còn nói chuyện ngày mai được nữa."' },
      { sp: 'narr', text: 'Hai người đứng chen nhau bên bồn rửa nhỏ, tiếng nước chảy, tiếng bát đũa chạm nhau khe khẽ. Chuyện ngày mai hoá ra toàn chuyện nhỏ: ca làm mấy giờ, trời có mưa không, cuối tuần đi siêu thị mua gì. Mà chính những chuyện nhỏ ấy kéo một ngày buồn trở lại mặt đất.' },
      { sp: 'narr', text: 'Đêm xuống, nỗi buồn vì người bạn ra đi vẫn còn — nhưng nó không còn ở một mình trong phòng nữa. Nó ngồi cạnh một bữa cơm nóng, một đôi đũa gắp cho nhau, và một lời hẹn rất đỗi bình thường cho tối mai.' }
    ]
  },

  'c4-couple-2': {
    scene: '💌 Chương 4 — Kỷ niệm và chuyện tiền',
    branch: [
      { sp: 'narr', text: 'Hôm nay là kỷ niệm ngày hai người kết đôi. Không nhà hàng sang — chỉ một chiếc bánh nhỏ mua ở combini, hai ly trà, và tấm ảnh chụp chung đầu tiên được lôi ra xem lại, cười vì hồi đó cả hai đứa trông ngố hơn bây giờ nhiều.' },
      { sp: 'Người yêu', text: '"Một năm rồi đấy. Nhanh thật." — rồi cô ấy ngập ngừng, xoay xoay ly trà. "Mà… em muốn bàn chuyện này lâu rồi. Tháng nào anh cũng gửi gần hết lương về quê. Em không trách — bố mẹ anh cần thật. Nhưng còn hai đứa mình thì sao? Học lên, đổi việc, sau này… mình không có một đồng dự phòng nào cả."' },
      { sp: 'narr', text: 'Câu nói rơi xuống, bữa kỷ niệm chùng hẳn. {name} thấy cổ họng khô: tiền gửi về là chữ hiếu, tiền để lại là tương lai — tờ lương nào cũng chỉ có một con số, mà hai phía đều là những người mình thương nhất.' },
      { sp: 'hero', text: '"Anh biết. Anh cũng nghĩ mãi mà không dám nói trước. Anh sợ nói ra thì em nghĩ anh tiếc tiền gửi về nhà. Nhưng cứ im lặng thì hai đứa cứ đứng yên ở đây mãi."' },
      { sp: 'Người yêu', text: '"Vậy đừng im lặng nữa. Mình viết ra giấy đi — nói miệng thì cãi nhau, viết ra thì nó thành kế hoạch." Người yêu lấy cuốn sổ tay, kẻ ba cột bằng bút bi, nét nào ra nét nấy.' },
      { sp: 'Người yêu', jp: 'ねえ、{三|みっ}つに{分|わ}けよう。{実家|じっか}への{仕送|しおく}り、{二人|ふたり}の{将来|しょうらい}、それから{勉強|べんきょう}の{積立|つみたて}。{割合|わりあい}は{二人|ふたり}で{決|き}めよう。', text: '"Này, mình chia làm ba phần đi: tiền gửi về quê, quỹ tương lai của hai đứa, và quỹ để dành cho việc học lên. Tỷ lệ bao nhiêu, hai đứa mình cùng quyết."' },
      { sp: 'narr', text: 'Ba cột được viết ra: QUỸ GỬI VỀ — đều đặn mỗi tháng, ít hơn trước một chút nhưng không tháng nào đứt; QUỸ HAI ĐỨA — dành cho những bước đi chung; QUỸ HỌC LÊN — nhỏ thôi, nhưng là hạt giống cho kỳ thi và chứng chỉ sắp tới. Hai người tranh luận từng con số, có lúc giọng cao lên — rồi lại tự rót trà cho nhau và hạ xuống.' },
      { sp: 'Người yêu', text: '"Xong. Chữ ký đi, giám đốc." Người yêu chìa cuốn sổ, cười. "Cãi nhau mà cuối cùng ra được một tờ giấy thế này thì… cãi cũng đáng. Tháng sau cứ theo đây mà làm. Sai thì sửa, không ai được giận ai vì tiền nữa — giận thì lôi giấy ra."' },
      { sp: 'narr', text: 'Chiếc bánh kỷ niệm được cắt làm hai phần không đều nhau — phần to hơn, như mọi khi, lại bị đẩy về phía {name}. Kỷ niệm ngày kết đôi năm nay không có hoa. Nó có một kế hoạch chung viết tay — thứ lãng mạn bền nhất mà hai người xa xứ có thể tặng nhau.' },
      { sp: 'narr', text: 'Cuốn sổ được cất vào ngăn kéo chung, ngay dưới cuốn hộ chiếu và những giấy tờ quan trọng nhất của căn phòng này. Từ tháng sau, mỗi kỳ lương về, hai người lại mở nó ra — đánh dấu từng cột một, như hai người cùng chèo một con thuyền nhỏ mà vững.' },
    ]
  },

  'c4-couple-2m': {
    scene: '💌 Chương 4 — Kỷ niệm và chuyện tiền',
    branch: [
      { sp: 'narr', text: 'Hôm nay là kỷ niệm ngày hai người kết đôi. Không nhà hàng sang — chỉ một chiếc bánh nhỏ mua ở combini, hai ly trà, và tấm ảnh chụp chung đầu tiên được lôi ra xem lại, cười vì hồi đó cả hai đứa trông ngố hơn bây giờ nhiều.' },
      { sp: 'Anh người yêu', text: '"Một năm rồi đấy. Nhanh thật." — rồi anh ngập ngừng, xoay xoay ly trà. "Mà… anh muốn bàn chuyện này lâu rồi. Tháng nào em cũng gửi gần hết lương về quê. Anh không trách — bố mẹ em cần thật. Nhưng còn hai đứa mình thì sao? Học lên, đổi việc, sau này… mình không có một đồng dự phòng nào cả."' },
      { sp: 'narr', text: 'Câu nói rơi xuống, bữa kỷ niệm chùng hẳn. {name} thấy cổ họng khô: tiền gửi về là chữ hiếu, tiền để lại là tương lai — tờ lương nào cũng chỉ có một con số, mà hai phía đều là những người mình thương nhất.' },
      { sp: 'hero', text: '"Em biết. Em cũng nghĩ mãi mà không dám nói trước. Em sợ nói ra thì anh nghĩ em tiếc tiền gửi về nhà. Nhưng cứ im lặng thì hai đứa cứ đứng yên ở đây mãi."' },
      { sp: 'Anh người yêu', text: '"Vậy đừng im lặng nữa. Mình viết ra giấy đi — nói miệng thì cãi nhau, viết ra thì nó thành kế hoạch." Anh lấy cuốn sổ tay, kẻ ba cột bằng bút bi, nét nào ra nét nấy.' },
      { sp: 'Anh người yêu', jp: 'ねえ、{三|みっ}つに{分|わ}けよう。{実家|じっか}への{仕送|しおく}り、{二人|ふたり}の{将来|しょうらい}、それから{勉強|べんきょう}の{積立|つみたて}。{割合|わりあい}は{二人|ふたり}で{決|き}めよう。', text: '"Này, mình chia làm ba phần đi: tiền gửi về quê, quỹ tương lai của hai đứa, và quỹ để dành cho việc học lên. Tỷ lệ bao nhiêu, hai đứa mình cùng quyết."' },
      { sp: 'narr', text: 'Ba cột được viết ra: QUỸ GỬI VỀ — đều đặn mỗi tháng, ít hơn trước một chút nhưng không tháng nào đứt; QUỸ HAI ĐỨA — dành cho những bước đi chung; QUỸ HỌC LÊN — nhỏ thôi, nhưng là hạt giống cho kỳ thi và chứng chỉ sắp tới. Hai người tranh luận từng con số, có lúc giọng cao lên — rồi lại tự rót trà cho nhau và hạ xuống.' },
      { sp: 'Anh người yêu', text: '"Xong. Chữ ký đi, giám đốc." Anh chìa cuốn sổ, cười. "Cãi nhau mà cuối cùng ra được một tờ giấy thế này thì… cãi cũng đáng. Tháng sau cứ theo đây mà làm. Sai thì sửa, không ai được giận ai vì tiền nữa — giận thì lôi giấy ra."' },
      { sp: 'narr', text: 'Chiếc bánh kỷ niệm được cắt làm hai phần không đều nhau — phần to hơn, như mọi khi, lại bị đẩy về phía {name}. Kỷ niệm ngày kết đôi năm nay không có hoa. Nó có một kế hoạch chung viết tay — thứ lãng mạn bền nhất mà hai người xa xứ có thể tặng nhau.' },
      { sp: 'narr', text: 'Cuốn sổ được cất vào ngăn kéo chung, ngay dưới cuốn hộ chiếu và những giấy tờ quan trọng nhất của căn phòng này. Từ tháng sau, mỗi kỳ lương về, hai người lại mở nó ra — đánh dấu từng cột một, như hai người cùng chèo một con thuyền nhỏ mà vững.' }
    ]
  },

  'c4-couple-3': {
    scene: '📞 Chương 4 — Bố mẹ gọi sang',
    branch: [
      { sp: 'narr', text: 'Tối cuối tuần, điện thoại của {name} sáng lên: bố mẹ gọi từ quê nhà. Bên cạnh, người yêu ngồi thu chân lên ghế, bỗng dưng chỉnh lại tóc và áo — dù đầu dây bên kia chỉ nhìn thấy qua một màn hình điện thoại nhỏ xíu.' },
      { sp: 'Mẹ', text: '"Hai đứa ăn cơm chưa? …Ừ, mẹ hỏi này, hỏi thật nhé: hai đứa tính sao? Yêu nhau bên đó, bố mẹ ở đây không gặp được người ta, cũng sốt ruột chứ. Tính đường dài hay chỉ… quen cho vui thôi?"' },
      { sp: 'narr', text: 'Câu hỏi "tính sao" của mẹ — câu hỏi mà mọi cặp đôi xa xứ đều biết sẽ đến, và không ai chuẩn bị được sẵn một câu trả lời trọn vẹn. {name} nhìn sang người yêu. Người yêu hít một hơi, ghé sát vào màn hình trước cả khi được mời.' },
      { sp: 'Người yêu', text: '"Cháu chào hai bác ạ! Cháu là… người yêu của {name} ạ." — tiếng Việt lơ lớ, chậm, có chữ phát âm chưa tròn, nhưng câu nào cũng rõ ràng là đã tập trước. "Cháu… thương anh ấy thật lòng ạ. Hai bác cứ yên tâm ạ."' },
      { sp: 'Bố', text: '"Ờ… ờ, chào cháu." Đầu dây bên kia, bố cười ngượng mà vui thấy rõ. Mẹ chen vào: "Nói được tiếng Việt thế này là quý lắm rồi. Hai đứa thương nhau thật thì bố mẹ mừng. Đường dài thì phải giữ nhau, nghe chưa."' },
      { sp: 'hero', text: '"Bố mẹ cứ yên tâm. Tụi con chưa tính chuyện cưới xin ngay đâu — còn phải ổn định việc làm, giấy tờ, tiếng tăm đã. Nhưng tụi con quen nhau là nghiêm túc. Tới lúc tính chuyện lớn, con sẽ về thưa chuyện đàng hoàng với hai bên."' },
      { sp: 'Người yêu', jp: '{将来|しょうらい}のことは、{二人|ふたり}で{少|すこ}しずつ{話|はな}し{合|あ}っています。{仕事|しごと}が{落|お}ち{着|つ}いたら、ちゃんとご{挨拶|あいさつ}に{行|い}きます。', text: '"Chuyện tương lai, hai đứa cháu vẫn đang bàn với nhau từng chút một ạ. Khi công việc ổn định, cháu sẽ sang chào hỏi hai bác đàng hoàng ạ."' },
      { sp: 'narr', text: 'Cuộc gọi kéo dài thêm nửa tiếng — chuyện mùa màng, chuyện mái bếp đã sửa, chuyện bà hàng xóm hỏi thăm. Khi màn hình tắt, căn phòng yên lặng một lúc. Người yêu thở phào: "Hồi hộp hơn cả thi vấn đáp." {name} cười: "Đỗ rồi đấy."' },
      { sp: 'narr', text: 'Trước khi đi ngủ, người yêu nhắn một tin rất ngắn: "Hôm nay em nói tiếng Việt với bố mẹ anh, được khen đấy nhé. Lần sau em sẽ nói được nhiều hơn." {name} đọc tin nhắn hai lần, mỉm cười hai lần.' },
      { sp: 'narr', text: 'Chuyện kết hôn chưa được quyết trong tối nay — nó còn nằm ở Chương 5, sau khi việc làm và tương lai đã rõ ràng hơn. Nhưng một cây cầu vừa được bắc xong: hai gia đình, từ hai đầu múi giờ, đã biết mặt và biết lòng nhau.' }
    ]
  },

  'c4-couple-3m': {
    scene: '📞 Chương 4 — Bố mẹ gọi sang',
    branch: [
      { sp: 'narr', text: 'Tối cuối tuần, điện thoại của {name} sáng lên: bố mẹ gọi từ quê nhà. Bên cạnh, anh người yêu ngồi thu chân lên ghế, bỗng dưng chỉnh lại tóc và áo — dù đầu dây bên kia chỉ nhìn thấy qua một màn hình điện thoại nhỏ xíu.' },
      { sp: 'Mẹ', text: '"Hai đứa ăn cơm chưa? …Ừ, mẹ hỏi này, hỏi thật nhé: hai đứa tính sao? Yêu nhau bên đó, bố mẹ ở đây không gặp được người ta, cũng sốt ruột chứ. Tính đường dài hay chỉ… quen cho vui thôi?"' },
      { sp: 'narr', text: 'Câu hỏi "tính sao" của mẹ — câu hỏi mà mọi cặp đôi xa xứ đều biết sẽ đến, và không ai chuẩn bị được sẵn một câu trả lời trọn vẹn. {name} nhìn sang người yêu. Anh hít một hơi, ghé sát vào màn hình trước cả khi được mời.' },
      { sp: 'Anh người yêu', text: '"Cháu chào hai bác ạ! Cháu là… người yêu của {name} ạ." — tiếng Việt lơ lớ, chậm, có chữ phát âm chưa tròn, nhưng câu nào cũng rõ ràng là đã tập trước. "Cháu… thương cô ấy thật lòng ạ. Hai bác cứ yên tâm ạ."' },
      { sp: 'Bố', text: '"Ờ… ờ, chào cháu." Đầu dây bên kia, bố cười ngượng mà vui thấy rõ. Mẹ chen vào: "Nói được tiếng Việt thế này là quý lắm rồi. Hai đứa thương nhau thật thì bố mẹ mừng. Đường dài thì phải giữ nhau, nghe chưa."' },
      { sp: 'hero', text: '"Bố mẹ cứ yên tâm. Tụi con chưa tính chuyện cưới xin ngay đâu — còn phải ổn định việc làm, giấy tờ, tiếng tăm đã. Nhưng tụi con quen nhau là nghiêm túc. Tới lúc tính chuyện lớn, con sẽ về thưa chuyện đàng hoàng với hai bên."' },
      { sp: 'Anh người yêu', jp: '{将来|しょうらい}のことは、{二人|ふたり}で{少|すこ}しずつ{話|はな}し{合|あ}っています。{仕事|しごと}が{落|お}ち{着|つ}いたら、ちゃんとご{挨拶|あいさつ}に{行|い}きます。', text: '"Chuyện tương lai, hai đứa cháu vẫn đang bàn với nhau từng chút một ạ. Khi công việc ổn định, cháu sẽ sang chào hỏi hai bác đàng hoàng ạ."' },
      { sp: 'narr', text: 'Cuộc gọi kéo dài thêm nửa tiếng — chuyện mùa màng, chuyện mái bếp đã sửa, chuyện bà hàng xóm hỏi thăm. Khi màn hình tắt, căn phòng yên lặng một lúc. Anh thở phào: "Hồi hộp hơn cả thi vấn đáp." {name} cười: "Đỗ rồi đấy."' },
      { sp: 'narr', text: 'Trước khi đi ngủ, anh nhắn một tin rất ngắn: "Hôm nay anh nói tiếng Việt với bố mẹ em, được khen đấy nhé. Lần sau anh sẽ nói được nhiều hơn." {name} đọc tin nhắn hai lần, mỉm cười hai lần.' },
      { sp: 'narr', text: 'Chuyện kết hôn chưa được quyết trong tối nay — nó còn nằm ở Chương 5, sau khi việc làm và tương lai đã rõ ràng hơn. Nhưng một cây cầu vừa được bắc xong: hai gia đình, từ hai đầu múi giờ, đã biết mặt và biết lòng nhau.' }
    ]
  },

  /* ================= YÊU XA ================= */
  'c4-ld-1': {
    scene: '📱 Chương 4 — Yêu xa sau khủng hoảng tiền',
    branch: [
      { sp: 'narr', text: 'Sau khủng hoảng tiền vừa rồi, những cuộc gọi video với Linh — người yêu ở quê nhà — thưa dần. Lệch múi giờ hai tiếng, lệch cả nhịp sống: bên này {name} vừa tan ca đêm, bên kia Linh sắp đi ngủ. Tối nay, cuối cùng hai người cũng khớp được một giờ.' },
      { sp: 'Linh', text: '"Dạo này anh ít gọi hẳn. Em không trách đâu — em biết anh bận, anh mệt. Nhưng em nói thật: cái làm em sợ không phải ít gọi. Là cảm giác anh đang gồng một mình chuyện gì đó, còn em thì không được biết."' },
      { sp: 'narr', text: 'Linh nói đúng tim đen. Chuyện tiền nong, chuyện áp lực — {name} đã giấu hết sau những câu "anh ổn". Màn hình nhỏ, mà khoảng cách thì bỗng hiện ra rõ hơn cả hai nghìn cây số địa lý.' },
      {
        prompt: 'Trước lời nói thật của Linh, {name} đáp thế nào?',
        choice: [
          { label: 'Nói thật hết — chuyện tiền, chuyện mệt, và lời xin lỗi vì đã giấu', flag: 'saga-c4', value: 'ld:that-long', fx: { love: 2 }, note: 'C4 yêu xa: nói thật hết với Linh — mối quan hệ ấm lại', say: [
            { sp: 'hero', text: '"Anh xin lỗi. Anh không ổn như anh vẫn nói. Tháng vừa rồi tiền nong căng lắm, anh sợ nói ra em lo theo… Nhưng giấu em mới là sai nhất. Từ giờ, chuyện gì anh cũng kể. Em là người nhà của anh, không phải khán giả."' },
            { sp: 'Linh', text: '"…Nghe câu đó là đủ rồi." Linh cười qua màn hình, mắt hơi đỏ. "Tiền ít thì mình tiêu ít, anh đừng gồng. Em ở xa, thứ duy nhất em gửi được là sự thật với nhau — anh đừng cắt mất thứ đó."' } ] },
          { label: 'Lảng đi — "Anh ổn mà, em đừng nghĩ nhiều, ngủ sớm đi"', flag: 'saga-c4', value: 'ld:lang-di', fx: { love: -1, pressure: 1 }, note: 'C4 yêu xa: lảng tránh, mối quan hệ lạnh đi một nhịp', say: [
            { sp: 'Linh', text: '"…Ừ. Anh ổn." Linh nhắc lại khẽ, nụ cười tắt dần. "Vậy em ngủ đây. Anh cũng ngủ sớm." Cuộc gọi kết thúc sớm hơn mọi lần mười lăm phút — và mười lăm phút ấy, cả hai người đều biết, là mười lăm phút của khoảng cách.' } ] }
        ]
      },
      { sp: 'hero', jp: '{来週|らいしゅう}の{日曜日|にちようび}、また{電話|でんわ}しよう。その{日|ひ}は{休|やす}みだから、{長|なが}く{話|はな}せるよ。', text: '"Chủ nhật tuần sau mình lại gọi nhé. Hôm đó anh được nghỉ, mình nói chuyện được lâu."' },
      { sp: 'Linh', text: '"Ừ, hẹn chủ nhật. Anh giữ sức đấy — giọng hôm nay nghe mệt lắm." Một lời dặn dò rất nhỏ, mà {name} nghe xong, tự nhiên thấy mình được thương một cách cụ thể.' },
      { sp: 'narr', text: 'Đêm đó, {name} hiểu thêm một điều về yêu xa: kẻ thù của nó không phải khoảng cách, mà là những câu "anh ổn" nói ra để che đi sự thật. Xa nhau đã khó — xa nhau mà không thật lòng với nhau thì khó gấp đôi.' }
    ]
  },

  'c4-ld-1-nu': {
    scene: '📱 Chương 4 — Yêu xa sau khủng hoảng tiền',
    branch: [
      { sp: 'narr', text: 'Sau khủng hoảng tiền vừa rồi, những cuộc gọi video với Hải — người yêu ở quê nhà — thưa dần. Lệch múi giờ hai tiếng, lệch cả nhịp sống: bên này {name} vừa tan ca đêm, bên kia Hải sắp đi ngủ. Tối nay, cuối cùng hai người cũng khớp được một giờ.' },
      { sp: 'Hải', text: '"Dạo này em ít gọi hẳn. Anh không trách đâu — anh biết em bận, em mệt. Nhưng anh nói thật: cái làm anh sợ không phải ít gọi. Là cảm giác em đang gồng một mình chuyện gì đó, còn anh thì không được biết."' },
      { sp: 'narr', text: 'Hải nói đúng tim đen. Chuyện tiền nong, chuyện áp lực — {name} đã giấu hết sau những câu "em ổn". Màn hình nhỏ, mà khoảng cách thì bỗng hiện ra rõ hơn cả hai nghìn cây số địa lý.' },
      {
        prompt: 'Trước lời nói thật của Hải, {name} đáp thế nào?',
        choice: [
          { label: 'Nói thật hết — chuyện tiền, chuyện mệt, và lời xin lỗi vì đã giấu', flag: 'saga-c4', value: 'ld:that-long', fx: { love: 2 }, note: 'C4 yêu xa: nói thật hết với Hải — mối quan hệ ấm lại', say: [
            { sp: 'hero', text: '"Em xin lỗi. Em không ổn như em vẫn nói. Tháng vừa rồi tiền nong căng lắm, em sợ nói ra anh lo theo… Nhưng giấu anh mới là sai nhất. Từ giờ, chuyện gì em cũng kể. Anh là người nhà của em, không phải khán giả."' },
            { sp: 'Hải', text: '"…Nghe câu đó là đủ rồi." Hải cười qua màn hình, mắt hơi đỏ. "Tiền ít thì mình tiêu ít, em đừng gồng. Anh ở xa, thứ duy nhất anh gửi được là sự thật với nhau — em đừng cắt mất thứ đó."' } ] },
          { label: 'Lảng đi — "Em ổn mà, anh đừng nghĩ nhiều, ngủ sớm đi"', flag: 'saga-c4', value: 'ld:lang-di', fx: { love: -1, pressure: 1 }, note: 'C4 yêu xa: lảng tránh, mối quan hệ lạnh đi một nhịp', say: [
            { sp: 'Hải', text: '"…Ừ. Em ổn." Hải nhắc lại khẽ, nụ cười tắt dần. "Vậy anh ngủ đây. Em cũng ngủ sớm." Cuộc gọi kết thúc sớm hơn mọi lần mười lăm phút — và mười lăm phút ấy, cả hai người đều biết, là mười lăm phút của khoảng cách.' } ] }
        ]
      },
      { sp: 'hero', jp: '{来週|らいしゅう}の{日曜日|にちようび}、また{電話|でんわ}しよう。その{日|ひ}は{休|やす}みだから、{長|なが}く{話|はな}せるよ。', text: '"Chủ nhật tuần sau mình lại gọi nhé. Hôm đó em được nghỉ, mình nói chuyện được lâu."' },
      { sp: 'Hải', text: '"Ừ, hẹn chủ nhật. Em giữ sức đấy — giọng hôm nay nghe mệt lắm." Một lời dặn dò rất nhỏ, mà {name} nghe xong, tự nhiên thấy mình được thương một cách cụ thể.' },
      { sp: 'narr', text: 'Đêm đó, {name} hiểu thêm một điều về yêu xa: kẻ thù của nó không phải khoảng cách, mà là những câu "em ổn" nói ra để che đi sự thật. Xa nhau đã khó — xa nhau mà không thật lòng với nhau thì khó gấp đôi.' }
    ]
  },

  'c4-ld-2': {
    scene: '📱 Chương 4 — Tin nhắn sau đêm đi bar',
    branch: [
      { sp: 'narr', text: 'Đêm qua cả nhóm bạn đi bar mừng sinh nhật một người trong hội. Ai đó đã đăng ảnh nhóm lên mạng — trong ảnh, {name} đứng cạnh một cô bạn cùng lớp, cười rất tươi. Sáng nay, điện thoại có một tin nhắn của Linh, ngắn mà lạnh: "Ảnh đẹp nhỉ. Vui quá ha anh."' },
      { sp: 'Linh', text: '"Em không muốn là kiểu người ghen tuông vô lý. Nhưng em ở cách anh hai nghìn cây số, em chỉ có những tấm ảnh ấy để đoán về cuộc sống của anh. Anh nói em nghe: cô ấy là ai, và tối qua thật ra là thế nào?"' },
      { sp: 'narr', text: 'Ghen tuông trong yêu xa hiếm khi chỉ là ghen. Nó là nỗi bất an của người ở xa, không nhìn thấy, không chạm được, chỉ còn biết tin — mà niềm tin thì đang bị một tấm ảnh làm lung lay.' },
      { sp: 'narr', text: '{name} nhìn chằm chằm vào dòng tin nhắn lạnh ngắt ấy một lúc lâu. Trả lời thế nào trong năm phút tới có thể quyết định cả mấy tháng sau đó — và cả hai người ở hai đầu múi giờ đều đang thức, chờ đợi.' },
      {
        prompt: '{name} xử lý cơn ghen của Linh thế nào?',
        choice: [
          { label: 'Gọi điện ngay, nói rõ ràng từ đầu tới cuối và hẹn một lời hứa cụ thể', flag: 'saga-c4', value: 'ld:noi-ro', fx: { love: 2 }, note: 'C4 yêu xa: gọi điện nói rõ ràng, hứa cùng để dành vé máy bay về thăm', say: [
            { sp: 'hero', text: '"Anh gọi, không nhắn — chuyện này nhắn tin là cãi nhau to. Nghe anh này: tối qua là sinh nhật bạn trong lớp, cả nhóm hơn chục người, cô ấy là bạn học ngồi cạnh trong lớp, hết. Anh biết em ở xa, thấy ảnh như thế thì không yên được. Là anh, anh cũng thế."' },
            { sp: 'hero', text: '"Mình hẹn nhau một việc cụ thể đi: từ tháng này, mỗi tháng anh để riêng một khoản cho vé máy bay. Tết tới — anh về. Không phải "để xem" — là anh hứa, có quỹ vé đàng hoàng. Em kiểm chứng từng tháng luôn."' },
            { sp: 'Linh', text: '"…Có quỹ vé thật á?" Giọng Linh mềm hẳn đi. "Vậy mỗi tháng gửi em xem một lần đấy. Không phải em không tin — mà là em muốn được cùng anh đếm ngược. Xa nhau mà có một ngày để cùng đếm tới thì… chịu được."' } ] },
          { label: 'Nhắn lại cụt lủn — "Có gì đâu mà ghen, em nghĩ nhiều quá"', flag: 'saga-c4', value: 'ld:cut-lun', fx: { love: -1, pressure: 1 }, note: 'C4 yêu xa: trả lời cụt lủn, cơn ghen không được hoá giải', say: [
            { sp: 'narr', text: 'Tin nhắn gửi đi, dấu "đã đọc" hiện lên rất lâu mà không có hồi âm. Tối đó Linh chỉ nhắn lại một câu: "Ừ, em nghĩ nhiều quá thật. Ngủ ngon." Hai chữ "ngủ ngon" lạnh như nước đá — {name} nằm nhìn màn hình, biết mình vừa làm một việc rất dễ sửa mà đã không sửa.' } ] }
        ]
      },
      { sp: 'narr', text: 'Yêu xa bền hay không, nhiều khi quyết định ở những buổi sáng như thế này: một tấm ảnh, một cơn ghen, và cách người ta chọn — gọi điện nói cho rõ, hay nhắn một câu cho xong.' }
    ]
  },

  'c4-ld-2-nu': {
    scene: '📱 Chương 4 — Tin nhắn sau đêm đi bar',
    branch: [
      { sp: 'narr', text: 'Đêm qua cả nhóm bạn đi bar mừng sinh nhật một người trong hội. Ai đó đã đăng ảnh nhóm lên mạng — trong ảnh, {name} đứng cạnh một cậu bạn cùng lớp, cười rất tươi. Sáng nay, điện thoại có một tin nhắn của Hải, ngắn mà lạnh: "Ảnh đẹp nhỉ. Vui quá ha em."' },
      { sp: 'Hải', text: '"Anh không muốn là kiểu người ghen tuông vô lý. Nhưng anh ở cách em hai nghìn cây số, anh chỉ có những tấm ảnh ấy để đoán về cuộc sống của em. Em nói anh nghe: cậu ấy là ai, và tối qua thật ra là thế nào?"' },
      { sp: 'narr', text: 'Ghen tuông trong yêu xa hiếm khi chỉ là ghen. Nó là nỗi bất an của người ở xa, không nhìn thấy, không chạm được, chỉ còn biết tin — mà niềm tin thì đang bị một tấm ảnh làm lung lay.' },
      { sp: 'narr', text: '{name} nhìn chằm chằm vào dòng tin nhắn lạnh ngắt ấy một lúc lâu. Trả lời thế nào trong năm phút tới có thể quyết định cả mấy tháng sau đó — và cả hai người ở hai đầu múi giờ đều đang thức, chờ đợi.' },
      {
        prompt: '{name} xử lý cơn ghen của Hải thế nào?',
        choice: [
          { label: 'Gọi điện ngay, nói rõ ràng từ đầu tới cuối và hẹn một lời hứa cụ thể', flag: 'saga-c4', value: 'ld:noi-ro', fx: { love: 2 }, note: 'C4 yêu xa: gọi điện nói rõ ràng, hứa cùng để dành vé máy bay về thăm', say: [
            { sp: 'hero', text: '"Em gọi, không nhắn — chuyện này nhắn tin là cãi nhau to. Nghe em này: tối qua là sinh nhật bạn trong lớp, cả nhóm hơn chục người, cậu ấy là bạn học ngồi cạnh trong lớp, hết. Em biết anh ở xa, thấy ảnh như thế thì không yên được. Là em, em cũng thế."' },
            { sp: 'hero', text: '"Mình hẹn nhau một việc cụ thể đi: từ tháng này, mỗi tháng em để riêng một khoản cho vé máy bay. Tết tới — em về. Không phải "để xem" — là em hứa, có quỹ vé đàng hoàng. Anh kiểm chứng từng tháng luôn."' },
            { sp: 'Hải', text: '"…Có quỹ vé thật á?" Giọng Hải mềm hẳn đi. "Vậy mỗi tháng gửi anh xem một lần đấy. Không phải anh không tin — mà là anh muốn được cùng em đếm ngược. Xa nhau mà có một ngày để cùng đếm tới thì… chịu được."' } ] },
          { label: 'Nhắn lại cụt lủn — "Có gì đâu mà ghen, anh nghĩ nhiều quá"', flag: 'saga-c4', value: 'ld:cut-lun', fx: { love: -1, pressure: 1 }, note: 'C4 yêu xa: trả lời cụt lủn, cơn ghen không được hoá giải', say: [
            { sp: 'narr', text: 'Tin nhắn gửi đi, dấu "đã đọc" hiện lên rất lâu mà không có hồi âm. Tối đó Hải chỉ nhắn lại một câu: "Ừ, anh nghĩ nhiều quá thật. Ngủ ngon." Hai chữ "ngủ ngon" lạnh như nước đá — {name} nằm nhìn màn hình, biết mình vừa làm một việc rất dễ sửa mà đã không sửa.' } ] }
        ]
      },
      { sp: 'narr', text: 'Yêu xa bền hay không, nhiều khi quyết định ở những buổi sáng như thế này: một tấm ảnh, một cơn ghen, và cách người ta chọn — gọi điện nói cho rõ, hay nhắn một câu cho xong.' }
    ]
  },

  /* ================= CẢNH PHỤ §6c ================= */
  'c4-hong': {
    scene: '🍅 Chương 4 — Cây hồng nhà hàng xóm',
    branch: [
      { sp: 'narr', text: 'Cuối ngõ có một cây hồng trĩu quả, chín đỏ cả góc trời thu — vườn của một bác người Nhật lớn tuổi. Chiều nay Hùng đứng ngắm nó đến lần thứ ba trong tuần, rồi quay sang {name} với ánh mắt của một kế hoạch.' },
      { sp: 'narr', text: 'Mùa thu ở Nhật là mùa hồng. Hồng treo trước hiên nhà người ta, hồng bán trong siêu thị xếp ngay ngắn từng quả một — và hồng trong vườn nhà bác hàng xóm thì chín mà không ai hái, rụng xuống đất từng quả, thơm cả con ngõ.' },
      { sp: 'Hùng', jp: 'あの{柿|かき}、{本当|ほんとう}に{美味|おい}しそうだね。{毎年|まいとし}{食|た}べ{切|き}れないくらい{成|な}るんだって。', text: '"Cây hồng kia trông ngon thật đấy. Nghe nói năm nào quả cũng sai tới mức ăn không hết."' },
      { sp: 'Hùng', text: '"Tối nay lẻn hái vài quả đi. Cây nhà bác ấy sai thế, mất chục quả ai biết. Hồng vườn này ngọt gấp mười lần hồng siêu thị — tao thèm từ đầu mùa rồi."' },
      {
        prompt: 'Hùng rủ lẻn hái trộm hồng vườn nhà người Nhật. {name} theo không?',
        choice: [
          { label: 'Đi — "Vài quả thôi, chắc không sao đâu"', flag: 'saga-c4', value: 'hong:di', fx: { risk: 2 }, note: 'C4 cảnh phụ: hái trộm hồng — bị phát hiện, hôm sau cây bị chặt trụi', say: [
            { sp: 'narr', text: 'Tối đó, hai cái bóng lấp ló bên hàng rào. Được đúng ba quả thì đèn sân bật sáng: bác chủ nhà đứng ở hiên, không quát tháo, chỉ nhìn rất lâu và nói một câu nhỏ: "Thích ăn thì gõ cửa xin, bác cho. Sao lại làm thế này?" — rồi quay vào. {name} đứng chết lặng, quả hồng trong tay bỗng nặng chĩu.' },
            { sp: 'narr', text: 'Suýt nữa thì bác đã báo cảnh sát — tiếng hàng xóm xì xào làm hai đứa chỉ biết cúi đầu xin lỗi rối rít. Nhưng cú sốc thật sự là sáng hôm sau: đi ngang qua ngõ, {name} thấy cây hồng ĐÃ BỊ CHẶT TRỤI, chỉ còn gốc. Bác chủ chặt bỏ cây hồng bao năm của mình — vì không muốn nó làm phiền hàng xóm, hay vì buồn, không ai dám hỏi. Hùng đứng lặng: "Tao… cười không nổi mà khóc cũng không xong." Vài quả hồng, đổi bằng cả một cây hồng lâu năm — và một bài học nhớ đời về hai chữ tôn trọng.' } ] },
          { label: 'Từ chối — "Muốn ăn thì mua. Ra siêu thị, tao bao một nửa"', flag: 'saga-c4', value: 'hong:tu-choi', fx: { love: 1 }, note: 'C4 cảnh phụ: từ chối hái trộm, mua hồng siêu thị ăn chung', say: [
            { sp: 'hero', jp: 'ダメだよ、{人|ひと}の{庭|にわ}の{柿|かき}だよ。{食|た}べたければスーパーで{買|か}おう。{半分|はんぶん}は{僕|ぼく}が{出|だ}すから。', text: '"Không được đâu, đó là hồng trong vườn nhà người ta đấy. Muốn ăn thì ra siêu thị mua. Một nửa để mình trả."' },
            { sp: 'Hùng', text: '"Ừ… mày nói phải." Hùng gãi đầu, nhìn cây hồng lần cuối rồi quay đi. "Xin lỗi cây hồng nhé — tí nữa thì vì tao mà mày mất quả." Tối đó hai đứa ăn hồng siêu thị ở công viên, chấm một tí muối ớt mang từ quê sang — Hùng gật gù: "Cũng ngọt. Ngọt kiểu… yên tâm." ' } ] }
        ]
      },
      { sp: 'narr', text: 'Chuyện cây hồng, dù kết thúc theo cách nào, cũng ở lại trong đầu {name} rất lâu: ở xứ người, ranh giới giữa "vài quả hồng cho vui" và một rắc rối thật sự chỉ cách nhau một hàng rào — theo đúng nghĩa đen.' }
    ]
  },

  'c4-bbq': {
    scene: '🔥 Chương 4 — BBQ bờ sông',
    branch: [
      { sp: 'narr', text: 'Chủ nhật đẹp trời, hội đồng hương rủ nhau ra bờ sông nướng BBQ: thịt ướp sẵn, bếp ga mini, bia mát lạnh. Cả nhóm đang vui thì khói um lên theo gió — tạt thẳng vào khu dân cư phía trên bờ kè.' },
      { sp: 'narr', text: 'Mười lăm phút sau, một xe cứu hoả và một xe cảnh sát dừng lại ở đầu dốc. Không còi hú ầm ĩ, không bắt bớ — nhưng cả nhóm bỗng im bặt, mặt ai cũng tái đi một nhịp: ở Nhật, nướng lửa ngoài trời chỉ được phép ở những khu vực quy định, và khói làm phiền dân cư là chuyện người ta báo thật.' },
      { sp: 'Hùng', jp: 'ねえ、この{辺|あた}り、バーベキューの{看板|かんぽん}が{見|み}当たらないけど、{本当|ほんとう}に{大丈夫|だいじょうぶ}かな。{住宅|じゅうたく}も{近|ちか}いし。', text: '"Này, quanh đây mình không thấy biển cho phép nướng BBQ, liệu có thật sự ổn không? Nhà dân cũng gần lắm."' },
      { sp: 'narr', text: 'Cả nhóm xua tay: "Chỗ này năm ngoái cũng có người nướng mà." — cái lý do muôn thuở của mọi rắc rối: người khác làm được thì mình cũng làm được. Bếp vẫn đỏ lửa, thịt vẫn xèo xèo, và không một ai chịu đứng lên đi đọc tấm biển ở đầu dốc.' },
      { sp: 'narr', text: 'Tấm biển ấy — mà sau này cả nhóm mới chịu đọc — ghi rất rõ: khu vực này cấm lửa trại và nướng ngoài trời, vì khói và tàn lửa ảnh hưởng tới khu dân cư phía trên bờ kè.' },
      { sp: 'Cảnh sát', jp: 'すみません、ここはバーベキュー{禁止|きんし}の{場所|ばしょ}なんです。{近所|きんじょ}から{煙|けむり}の{通報|つうほう}がありました。{火|ひ}を{消|け}して、{片付|かたづ}けをお{願|ねが}いします。', text: '"Xin lỗi, đây là nơi cấm nướng BBQ. Có người dân gần đây báo về khói. Xin các bạn tắt lửa và dọn dẹp giúp."' },
      { sp: 'hero', jp: 'すみません、{知|し}りませんでした。すぐに{火|ひ}を{消|け}して、ゴミも{全部持|ぜんぶも}ち{帰|かえ}ります。ご{迷惑|めいわく}をおかけして、{申|もう}し{訳|わけ}ありませんでした。', text: '"Xin lỗi, chúng tôi không biết ạ. Chúng tôi sẽ tắt lửa ngay và mang toàn bộ rác về. Đã làm phiền mọi người, thành thật xin lỗi ạ."' },
      { sp: 'narr', text: 'Cả nhóm xắn tay dọn: than nguội được gói kỹ, rác phân loại, mặt cỏ được nhặt sạch đến từng mẩu giấy — sạch hơn cả lúc mới tới. Anh lính cứu hoả trước khi đi còn chỉ tay về phía hạ lưu: "Dưới kia có khu BBQ được phép, có biển rõ ràng. Lần sau cứ tới đó mà nướng cho thoải mái."' },
      { sp: 'Hùng', text: '"Suýt thì bữa thịt nướng thành bữa… lên phường." Hùng xách hai túi rác, thở phào. "Ở nước người ta, muốn vui cũng phải vui đúng chỗ. Ghi nhớ: thấy biển cấm là cấm thật, không phải biển trang trí."' },
      { sp: 'narr', text: 'Trước khi về, cả nhóm còn quay lại bãi cỏ một lượt cuối: nhặt nốt vài mẩu than sót, kiểm tra không còn tàn lửa nào âm ỉ. Anh cảnh sát đi ngang gật đầu: "Cảm ơn các bạn đã hợp tác." — một lời cảm ơn nhẹ nhàng, cho một buổi chiều suýt nữa đã thành biên bản.' },
      { sp: 'narr', text: 'Bữa BBQ dở dang được nối tiếp bằng cơm hộp mua ở combini, ngồi ngay bờ sông — không khói, không lo. Lạ là vẫn vui. Có những bài học chỉ tốn một buổi chiều đẹp trời và hai túi rác mang về.' }
    ]
  },

  'c4-bien': {
    scene: '🦪 Chương 4 — Đi biển bắt hàu, bắt ngao',
    branch: [
      { sp: 'narr', text: 'Nghỉ lễ, cả hội kéo nhau ra biển: xô, cào nhỏ, găng tay — mục tiêu là một bữa hải sản "tự bắt tự ăn". Tới nơi mới thấy bờ biển chia hai phía: một bãi có biển hướng dẫn khu vực được phép bắt, một bãi yên tĩnh hơn hẳn… và có một tấm biển đỏ mà không phải ai trong nhóm cũng chịu đọc kỹ.' },
      { sp: 'Hùng', text: '"Bãi vắng kia trông nhiều hàu hơn hẳn. Bãi có biển hướng dẫn thì đông người, tranh nhau từng con ngao." Hùng chỉ tay về hai phía, làm cả nhóm dừng lại giữa đường xuống bãi cát.' },
      { sp: 'hero', jp: 'まず{看板|かんぽん}をよく{読|よ}もう。{赤|あか}い{看板|かんぽん}は{禁止|きんし}のことが{多|おお}いから、{確認|かくにん}してから{決|き}めよう。', text: '"Trước hết mình đọc kỹ biển báo đã. Biển đỏ thường là cấm, nên xác nhận xong rồi hẵng quyết."' },
      { sp: 'narr', text: 'Đó là một phút dừng lại rất đáng giá — dù quyết định cuối cùng của cả hội có nghe theo nó hay không.' },
      {
        prompt: 'Cả hội chọn bãi nào để bắt hàu, bắt ngao?',
        choice: [
          { label: 'Bãi hợp lệ có biển hướng dẫn — xa hơn một chút mà đúng quy định', flag: 'saga-c4', value: 'bien:hop-le', fx: { love: 2 }, note: 'C4 cảnh phụ: chọn bãi hợp lệ — mở tiệc hải sản', say: [
            { sp: 'narr', text: 'Theo đúng biển chỉ dẫn, cả hội cào ngao, gỡ hàu ở khu vực cho phép, giữ đúng số lượng quy định. Tối đó, bữa tiệc hải sản mở ngay sân ký túc: ngao hấp, hàu nướng — thành quả lao động hợp pháp bao giờ cũng ngon hơn một bậc. "Của mình bắt, ở chỗ được bắt, ăn mới yên cái bụng." Hùng kết luận với miệng đầy ngao.' } ] },
          { label: 'Bãi cấm có biển báo — "bãi này vắng, chắc bắt nhanh rồi đi"', flag: 'saga-c4', value: 'bien:cam', fx: { money: -0.3, risk: 1 }, note: 'C4 cảnh phụ: vào nhầm bãi cấm — bị nhắc nhở, phạt nhẹ, học về quyền đánh bắt', say: [
            { sp: 'narr', text: 'Chưa đầy mười phút, một người của hợp tác xã ngư nghiệp địa phương đã tới nơi. Ông không quát — ông chỉ vào tấm biển và giải thích rõ ràng: bãi này là nơi ngư dân nuôi trồng, quyền đánh bắt thuộc về hợp tác xã; bắt ở đây, dù ít, cũng là xâm phạm quyền của người ta.' },
            { sp: 'hero', jp: 'すみません、{看板|かんぽん}をよく{読|よ}みませんでした。{取|と}った{分|ぶん}は{全部|ぜんぶ}お{返|かえ}しします。{本当|ほんとう}に{申|もう}し{訳|わけ}ありません。', text: '"Xin lỗi, chúng tôi đã không đọc kỹ biển báo. Phần đã bắt, chúng tôi xin trả lại toàn bộ. Thành thật xin lỗi ạ."' },
            { sp: 'narr', text: 'Số hàu ngao bắt được phải thả lại hết, kèm một khoản phạt hành chính nhẹ 0.3 man và một buổi giải thích về 漁業権 — quyền đánh bắt của ngư dân. Cả hội ra về tay không mà đầu óc đầy thêm một bài học: biển không phải của chung vô chủ — bãi nào được bắt, bãi nào không, biển báo đã ghi rõ từ đầu.' } ] }
        ]
      },
      { sp: 'narr', text: 'Trên tàu về, Hùng tra cứu hẳn hoi khu vực bắt hải sản hợp lệ cho lần sau và lưu vào điện thoại của cả nhóm. Đi chơi ngoài thiên nhiên ở Nhật vui thật — với điều kiện chịu khó đọc biển báo trước khi xắn tay áo.' }
    ]
  },

  'c4-dacap': {
    scene: '🚉 Chương 4 — "Cơ hội kinh doanh" ở ga',
    branch: [
      { sp: 'narr', text: 'Ở ga, một người phụ nữ lạ ăn mặc lịch sự, nụ cười rất chuyên nghiệp, bắt chuyện với {name} như quen từ lâu: "Em nói tiếng Nhật giỏi thế! Chị đang tìm người trẻ có chí làm giàu. Có một cơ hội kinh doanh — không cần vốn lớn, thu nhập thụ động, chỉ cần giới thiệu thêm bạn bè."' },
      { sp: 'Người phụ nữ lạ', text: '"Cuối tuần này có buổi giới thiệu, toàn người thành công chia sẻ. Em cứ tới nghe, không mất gì. Ai cũng bắt đầu từ một buổi nghe như thế — người giàu khác người nghèo ở chỗ dám nắm cơ hội thôi."' },
      { sp: 'Người phụ nữ lạ', jp: 'こんにちは。{少|すこ}しだけお{時間|じかん}、いいですか。{若|わか}いのに{日本語|にほんご}がお{上手|じょうず}ですね。', text: '"Xin chào. Cho chị xin một chút thời gian được không? Còn trẻ mà tiếng Nhật giỏi nhỉ."' },
      { sp: 'narr', text: 'Ngày định hướng trước khi sang Nhật, thầy từng chiếu hẳn một slide về các chiêu dụ dỗ nơi công cộng: bắt chuyện thân thiện ở ga, khen tiếng Nhật, rồi dẫn dần tới "cơ hội" và một khoản tiền phải đóng. {name} còn nhớ thầy dặn: lịch sự từ chối, không tranh cãi, không đi theo tới địa điểm lạ.' },
      { sp: 'narr', text: 'Không cần vốn lớn, thu nhập thụ động, giới thiệu bạn bè, đánh vào tự ái "dám hay không dám" — {name} ngửi thấy một mùi rất quen: mùi của bài đa cấp đã được kể đi kể lại trong mọi buổi định hướng trước khi sang Nhật.' },
      {
        prompt: 'Trước lời rủ rê "cơ hội kinh doanh" ở ga, {name} làm gì?',
        choice: [
          { label: 'Đi nghe buổi giới thiệu một lần — "nghe thôi thì không mất gì"', flag: 'saga-c4', value: 'dacap:theo', fx: { risk: 1 }, note: 'C4 cảnh phụ: đi nghe đa cấp, suýt mua khoá học khởi nghiệp rồi tỉnh ra', say: [
            { sp: 'narr', text: 'Phòng hội thảo sáng choang, nhạc sôi động, hết người này tới người khác lên kể chuyện đổi đời. Tới cuối buổi, "cơ hội chỉ còn hôm nay": một khoá học khởi nghiệp giảm giá đặc biệt, ký ngay thì được "giữ suất". Cả phòng quay sang nhìn những người còn đang phân vân — áp lực được dàn dựng y như một cái bẫy có đệm êm.' },
            { sp: 'narr', text: 'Ngay lúc cây bút được đưa tới tay, {name} bỗng nhớ lời thầy dặn ngày định hướng: "Cái gì phải quyết NGAY, không cho mang về suy nghĩ — thì câu trả lời đúng luôn là không." {name} đặt bút xuống, xin phép ra về để "suy nghĩ thêm một tuần" — và bước ra khỏi phòng với ví tiền còn nguyên, tim đập thình thịch.' } ] },
          { label: 'Từ chối lịch sự ngay tại ga, bằng một câu tiếng Nhật chuẩn', flag: 'saga-c4', value: 'dacap:tu-choi', fx: { jp: 2 }, note: 'C4 cảnh phụ: từ chối đa cấp lịch sự bằng tiếng Nhật chuẩn', say: [
            { sp: 'hero', jp: 'お{誘|さそ}い、ありがとうございます。でも、{興味|きょうみ}がありませんので、{失礼|しつれい}します。{今後|こんご}もお{声|こえ}をかけないでいただけると{助|たす}かります。', text: '"Cảm ơn chị đã mời. Nhưng tôi không có hứng thú, xin phép. Sau này chị đừng gọi tôi nữa thì tôi rất cảm ơn ạ."' },
            { sp: 'narr', text: 'Câu từ chối gọn, lịch sự, không một kẽ hở để níu kéo. Người phụ nữ lạ mỉm cười chuyên nghiệp lần cuối rồi hoà vào dòng người trong ga. {name} lên tàu, tự thưởng cho mình một thanh kẹo ở combini: tỉnh táo đôi khi chỉ là một câu tiếng Nhật nói đúng lúc.' } ] }
        ]
      }
    ]
  },

  'c4-health': {
    scene: '🩺 Chương 4 — Khám sức khoẻ định kỳ',
    branch: [
      { sp: 'narr', text: 'Ngày khám sức khoẻ định kỳ của công ty ở bệnh viện. Tối hôm trước {name} phải nhịn ăn từ sớm — sáng nay bụng réo liên hồi trong phòng chờ đầy mùi thuốc sát trùng và tiếng gọi tên đều đều.' },
      { sp: 'Y tá', jp: 'おはようございます。まず{血圧|けつあつ}を{測|はか}ります。{腕|うで}を{出|だ}して、{力|ちから}を{抜|ぬ}いてください。{昨夜|ゆうべ}は{何時|なんじ}まで{食事|しょくじ}をしましたか。', text: '"Chào buổi sáng. Trước tiên tôi đo huyết áp. Xin anh/chị đưa tay ra và thả lỏng. Tối qua anh/chị ăn tới mấy giờ?"' },
      { sp: 'hero', jp: '{昨夜|ゆうべ}は9{時|じ}までに{食|た}べました。その{後|あと}は{水|みず}だけです。{胸|むね}のレントゲンは、この{順番|じゅんばん}でいいですか。', text: '"Tối qua tôi ăn xong trước 9 giờ. Sau đó chỉ uống nước thôi ạ. Chụp X-quang ngực thì theo thứ tự này là được phải không ạ?"' },
      { sp: 'Y tá', jp: 'では{次|つぎ}に{身長|しんちょう}と{体重|たいじゅう}、それから{視力|しりょく}を{測|はか}ります。{眼鏡|めがね}をかけている{方|かた}は、かけたまま{測|はか}ってください。', text: '"Tiếp theo tôi đo chiều cao, cân nặng và thị lực. Ai đeo kính thì cứ đeo kính khi đo ạ."' },
      { sp: 'hero', jp: 'すみません、{採血|さいけつ}の{後|あと}、{絆創膏|ばんそうこう}はこのままでいいですか。{結果|けっか}は{何日|なんにち}ごろ{届|とど}きますか。', text: '"Xin lỗi, sau khi lấy máu, băng cá nhân cứ để nguyên thế này là được ạ? Kết quả khoảng mấy ngày thì tới ạ?"' },
      { sp: 'narr', text: 'Đo huyết áp, đo thị lực, lấy máu, chụp X-quang ngực — dây chuyền khám của Nhật trôi chảy như một nhà máy tử tế: mỗi trạm một người, mỗi người một câu hướng dẫn ngắn gọn. {name} làm theo, thỉnh thoảng phải hỏi lại một từ chuyên môn — và lần nào cũng được giải thích chậm rãi.' },
      { sp: 'narr', text: 'Phòng chờ kết quả, {name} ngồi cạnh mấy đồng nghiệp cùng công ty — người thì lo dạ dày, người thì lo mắt tăng độ. Hoá ra ai đi làm xa nhà cũng mang theo một cơ thể đang âm thầm tính sổ những đêm thức khuya và những bữa ăn qua loa.' },
      { sp: 'Bác sĩ', jp: '{結果|けっか}は{概|おおむ}ね{良好|りょうこう}ですが、{血圧|けつあつ}が{少|すこ}し{高|たか}めです。あと、{胃|い}の{調子|ちょうし}も{気|き}になりますね。{夜更|よふ}かしと{食事|しょくじ}の{時間|じかん}、{気|き}をつけてください。', text: '"Kết quả nhìn chung tốt, nhưng huyết áp hơi cao một chút. Ngoài ra dạ dày của bạn cũng đáng để ý. Xin hãy chú ý việc thức khuya và giờ giấc ăn uống."' },
      { sp: 'Bác sĩ', text: '"Tuổi trẻ hay nghĩ sức khoẻ là thứ không bao giờ hết. Nó là một tài khoản đấy — rút nhiều vào mà không nạp, tới một ngày ngân hàng sẽ báo tin." Bác sĩ nói tử tế, kê thêm lời dặn: ngủ sớm hơn, bữa tối nhẹ, một tháng sau đo lại huyết áp.' },
      { sp: 'narr', text: 'Ra khỏi bệnh viện, {name} ăn ngay một cái bánh mì mua ở combini — bữa sáng muộn ngon lạ thường. Một chỉ số cần để ý không phải là án tử; nó là một lời nhắc đúng lúc, được nói bằng giọng tử tế, để người ta kịp sửa khi còn dễ sửa.' }
    ]
  },

  'c4-trip': {
    scene: '♨️ Chương 4 — Chuyến onsen một ngày',
    branch: [
      { sp: 'narr', text: 'Sau nửa chương sóng gió, hội bạn (và người thương) rủ nhau làm một chuyến onsen một ngày: tàu chậm, núi xanh, hơi nước bốc lên từ những bể tắm ngoài trời. Chi phí không nhỏ — nhưng có những khoản tiền mua lại được sức người.' },
      { sp: 'Hùng', text: '"Đi một ngày thôi. Sáng đi tối về. Người mày dạo này nhìn như cái pin còn 3% — không sạc là nó sập nguồn giữa ca đấy."' },
      {
        prompt: 'Chuyến onsen tốn khoảng 1.2 man. {name} quyết thế nào?',
        choice: [
          { label: 'Đi — hồi sức một ngày cho đáng, tiền kiếm lại sau', flag: 'saga-c4', value: 'trip:di', fx: { money: -1.2, hp: 8, love: 2 }, note: 'C4 cảnh phụ: đi onsen một ngày — tốn 1.2 man, hồi sức rõ rệt', say: [
            { sp: 'hero', jp: 'よし、{行|い}こう。{体|からだ}が{資本|しほん}だって、{最近|さいきん}よく{分|わ}かったから。{明日|あした}は{温泉|おんせん}でしっかり{休|やす}む。', text: '"Được, đi thôi. Dạo này mình thấm lắm rồi: cơ thể là vốn. Ngày mai ở onsen, nghỉ cho thật sự."' } ] },
          { label: 'Đi, nhưng chọn chuyến tàu rẻ và suất trưa bình dân', flag: 'saga-c4', value: 'trip:di-re', fx: { money: -0.8, hp: 5, love: 1 }, note: 'C4 cảnh phụ: đi onsen gói tiết kiệm — vẫn hồi sức, nhẹ ví hơn', say: [
            { sp: 'narr', text: 'Cả nhóm thống nhất đi tàu thường thay vì tàu nhanh, bữa trưa chọn suất bình dân nhất trong thực đơn. Chuyến đi vẫn là chuyến đi — nước nóng thì không phân biệt giàu nghèo, và núi xanh cũng vậy.' } ] }
        ]
      },
      { sp: 'narr', text: 'Trước khi xuống bể, cả nhóm được nhắc lại quy tắc: tắm tráng sạch trước khi vào bể chung, không cho khăn xuống nước, không bơi, nói chuyện nhỏ tiếng. Onsen là nơi người Nhật dạy nhau hai chữ "chung" — chung nước, chung yên lặng, chung sự tôn trọng.' },
      { sp: 'hero', jp: 'お{湯|ゆ}、ちょうどいいですね。{入|はい}る{前|まえ}に{体|からだ}を{洗|あら}うのがルールなんですね。タオルは{湯船|ゆぶね}に{入|い}れないで、ここに{置|お}きます。', text: '"Nước vừa đẹp nhỉ. Trước khi vào phải tắm tráng sạch — đó là quy tắc nhỉ. Khăn thì không cho xuống bể, để ở đây."' },
      { sp: 'Hùng', text: '"Aaa… sống lại rồi." Hùng ngâm tới vai, mắt nhắm nghiền. "Nửa năm nay người tao như cái điện thoại pin yếu sạc chập chờn. Hôm nay mới gọi là sạc đầy."' },
      { sp: 'narr', text: 'Bữa trưa ở nhà ăn trong khu onsen: cơm phần, cá nướng, canh miso nóng. Cả nhóm ăn chậm — không ai nhìn điện thoại, không ai nhắc chuyện ca kíp. Chuyện trò toàn những thứ vô thưởng vô phạt mà lâu lắm rồi mới được nói ra một cách thảnh thơi như vậy.' },
      { sp: 'narr', text: 'Chuyến tàu chiều đưa cả nhóm về thành phố. {name} tựa đầu vào cửa kính, người nhẹ đi mấy ký trong cảm giác: tiền vé onsen đã đổi lại một cái lưng hết mỏi, một cái đầu hết ong ong, và một lời hứa tự hứa — từ nay, nghỉ ngơi là một phần của kế hoạch, không phải phần thưởng xa xỉ.' }
    ]
  },

  'c4-gui-tien': {
    scene: '🏦 Chương 4 — Ngày lương ở ngân hàng',
    branch: [
      { sp: 'narr', text: 'Ngày lương. {name} đứng ở quầy ngân hàng với tờ phiếu gửi tiền trên tay, con số lương tháng vừa về tài khoản. Ở quê nhà, bố mẹ đang trông vào khoản gửi về này — mà ở đây, tháng sống phía trước cũng cần tiền để sống cho ra người.' },
      { sp: 'hero', jp: 'すみません、ベトナムへ{送金|そうきん}したいんですが、{手数料|てすうりょう}は{いくら}ですか。{今日|きょう}のレートも{教|おし}えてください。', text: '"Xin lỗi, tôi muốn gửi tiền về Việt Nam, phí gửi là bao nhiêu ạ? Xin cho tôi biết tỷ giá hôm nay nữa."' },
      { sp: 'Nhân viên ngân hàng', jp: '{手数料|てすうりょう}はこちらになります。{送金|そうきん}の{金額|きんがく}がお{決|き}まりでしたら、{申込書|もうしこみしょ}にご{記入|きにゅう}ください。', text: '"Phí gửi là như thế này ạ. Khi anh/chị quyết định số tiền gửi, xin điền vào phiếu đăng ký giúp."' },
      { sp: 'narr', text: 'Cây bút nằm trên tờ phiếu, con số chưa được viết ra. {name} nghĩ về những điều cả hai phía đều không nói thành lời: ở quê, mẹ kể nhà dột, bố ho khan cả mùa; ở đây, tháng trước {name} đã phải tính từng bữa ăn sau một khoản chi bất ngờ.' },
      { sp: 'narr', text: 'Gửi tiền về quê, với người xa xứ, chưa bao giờ chỉ là một nghiệp vụ ngân hàng. Nó là một quyết định về tình cảm — cân bằng giữa chữ hiếu hôm nay và sức bền của cả chặng đường dài.' },
      {
        prompt: 'Tháng này {name} gửi về quê bao nhiêu?',
        choice: [
          { label: 'Gửi GẦN HẾT — nhà đang cần, mình xoay xở được', flag: 'saga-c4', value: 'gui:gan-het', fx: { love: 2, hp: -2 }, note: 'C4 cảnh phụ: gửi gần hết lương — bước vào chế độ sinh tồn cuối tháng', say: [
            { sp: 'narr', text: 'Phiếu gửi xác nhận xong, điện thoại ở quê rung lên gần như ngay lập tức: mẹ nhắn "nhận được rồi con, bố mẹ cảm ơn con". Cả buổi chiều hôm đó, {name} đi làm mà lòng ấm hẳn — rồi tối về mở ví ra đếm lại phần còn cho tới cuối tháng… và lặng người.' },
            { sp: 'narr', text: 'Thế là "chế độ sinh tồn cuối tháng" chính thức bắt đầu — về sau trở thành huyền thoại của cả dãy ký túc: tuần một trứng luộc, tuần hai trứng chiên cho "đổi vị", tuần ba mì gói độn trứng, những ngày cuối là màn đếm ngược từng ngày tới kỳ lương như đếm ngược giao thừa. Bạn cùng phòng cảm động quá, rủ sang ăn chực một bữa cơm có thịt — {name} nhận, với lời thề danh dự: "Kỳ sau có lương, tao trả gấp đôi." Buồn cười mà thương: chữ hiếu đôi khi được nấu thành ba món trứng, và tình bạn ký túc là thứ gia vị làm cho chúng nuốt trôi được.' } ] },
          { label: 'Gửi VỪA đủ — giữ lại một quỹ dự phòng cho chính mình', flag: 'saga-c4', value: 'gui:vua-du', fx: { jp: 1 }, note: 'C4 cảnh phụ: gửi vừa đủ, giữ quỹ dự phòng — cân bằng đường dài', say: [
            { sp: 'narr', text: '{name} gửi một khoản đều đặn, đủ để nhà yên tâm, và giữ lại một phần nhỏ cho quỹ dự phòng của chính mình — ốm đau, hỏng xe, hay một cơ hội học hành bất ngờ. Tối đó gọi về nhà, {name} nói rõ kế hoạch ấy: mẹ nghe xong gật đầu — "Con biết lo đường dài thế là bố mẹ mừng hơn cả thêm tiền."' },
            { sp: 'narr', text: 'Cân bằng không làm ai vui bùng nổ trong một ngày — nó làm mọi người yên tâm trong nhiều tháng. Và ở xứ người, sự yên tâm dài hạn ấy mới là thứ tiền khó mua nhất.' } ] }
        ]
      }
    ]
  }

  });
})();
