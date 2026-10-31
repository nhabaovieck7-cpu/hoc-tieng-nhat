// scenes-f.js — GÓI CHƯƠNG 2 MỞ ĐẦU + CÁM DỖ SIM (đợt máy truyện 31/10/2026).
// Cảnh: ch2-opening (chuyển chương), sim-01-loi-ru → sim-02-cua-hang (5 nhịp §6f, KHUNG-GAME §2.4),
// sim-03-hoa-don (nhịp 4 — hậu quả đến sau, do máy truyện lên lịch), sim-04-xu-ly (đường xử lý hợp lệ).
// SỐ CHỐT theo Sổ BS-01 (đã kiểm chứng): công đăng ký 2–3 man/máy (ở đây 2,5), ký 4 máy qua 2 cửa hàng,
// hứa tổng 10 man — nhận trước 5,00 man, nửa còn lại không bao giờ tới; hoá đơn kỳ đầu ¥46,800;
// tổng nghĩa vụ đứng tên nếu huỷ ngang ~¥1,980,000 (≈ 200 man như các vụ việc báo chí đã nêu).
// GHI CHÚ SỐ LIỆU (quyết định chủ trang 13:28 JST 31/10/2026, giữ nguyên ở quyết định cuối 13:31):
// các số trên là số theo TỪNG VỤ ÁN trên báo (cờ ⚠ C11 trong checklist-that.md), KHÔNG phải
// thống kê chính thức — ghi chú này hiện ngay trong cảnh hoá đơn sim-03 (bước thoại 📌).
// NGƯỜI RỦ SIM (quyết định CUỐI của chủ trang 13:31 JST 31/10/2026): ANH TUẤN "môi giới" gánh cả
// tuyến SIM lẫn các tuyến làm chui/bỏ trốn — quyết định tách SIM sang cặp nhân vật mới lúc 13:28
// đã bị HUỶ sau 3 phút, không áp dụng.
// Ngữ vực theo §8: anh Tuấn nói thân mật xuề xoà; NHÂN VIÊN CỬA HÀNG nói KÍNH NGỮ đầy đủ;
// giấy tờ điều khoản trình tiếng Nhật trần (không furigana) — đọc hiểu chính là trận chiến của cảnh này.
// Cờ truyện dùng trong lựa chọn phải ĐĂNG KÝ ở validate-dialogue (FLOWFLAGS): sim-di · sim-ky · sim-xuly.
(function () {
  'use strict';
  window.DEMO_DATA = window.DEMO_DATA || {};

  /* ================= CH2-OPENING — Chuyển sang Chương 2 «Vào guồng» ================= */
  window.DEMO_DATA['ch2-opening'] = {
    scene: '📖 Chương 2 — Vào guồng',
    branch: [
      { sp: 'narr', text: 'Một tháng đầu ở Nhật trôi qua nhanh hơn bạn tưởng. Đăng ký địa chỉ xong, thẻ ngân hàng đã có, mốc N5 đầu tiên đã qua. Phòng trọ 1K giờ đã có mùi của một "nhà" — nồi cơm nhỏ, giá sách mini, tấm ảnh gia đình dán ngay đầu giường.' },
      { sp: 'narr', text: 'Nhịp sống bắt đầu vào guồng: sáng đi làm, tối học online với thầy Khánh, cuối tuần gọi về nhà. Chỉ có một thứ chưa vào guồng: chiếc ví. Tiền nhà, tiền ăn, tiền tàu… tháng nào cũng vừa khít, có tháng còn phải ngó trước ngó sau.' },
      { sp: 'hero', text: '(Ở quê, bố mẹ vẫn nghĩ sang Nhật là "kiếm được nhiều tiền lắm". Mình không dám nói tháng này mình ăn mì gói mấy bữa rồi…)' },
      { sp: 'narr', text: 'Chiều nay tan ca, điện thoại rung: anh Tuấn "môi giới" — người quen của người quen, chuyên "có việc nhẹ lương cao cho anh em mới sang" — hẹn bạn ở phố mua sắm. Nghe nói có "kèo thơm" chỉ dành cho người mới.' },
      {
        prompt: 'Ra phố mua sắm gặp anh Tuấn, trong lòng bạn nghĩ gì?',
        choice: [
          { label: 'Đi nghe thử — nghe thôi thì không mất gì', fx: { jp: 1 }, say: [
            { sp: 'hero', text: '(Nghe thôi. Quyết định gì cũng để sau khi nghe rõ đã. Bố dặn rồi: "Ở xứ người, cái gì dễ quá thì phải hỏi vì sao nó dễ.")' }
          ] },
          { label: 'Hơi ngại — nhưng ví đang mỏng quá, cứ đi xem sao', fx: { pressure: 1 }, say: [
            { sp: 'hero', text: '(Tháng này còn phải gửi về nhà nữa… Nghe thử xem sao. Chỉ nghe thôi mà.)' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Phố mua sắm 浅草商店街 buổi chiều đông vui. Anh Tuấn đang đứng chờ gần cửa ngân hàng, thấy bạn là vẫy tay rối rít.' }
    ]
  };

  /* ================= SIM-01 — NHỊP 1: LỜI RỦ (phải nghe thật hấp dẫn) ================= */
  window.DEMO_DATA['sim-01-loi-ru'] = {
    scene: '📱 Anh Tuấn "môi giới" — kèo kiếm thêm',
    branch: [
      { sp: 'Anh Tuấn', text: 'Ê, tới rồi hả! Trông gầy đi đấy — bên này ăn uống kiểu gì mà héo thế? Ngồi xuống đây anh nói chuyện này, chỉ anh em mình biết thôi nhé.' },
      { sp: 'Anh Tuấn', text: 'Anh đang có kèo cho một bên đối tác: họ cần người ĐỨNG TÊN đăng ký điện thoại. Việc của chú đơn giản lắm: mang thẻ lưu trú ra cửa hàng, ký tên, chụp ảnh — ba mươi phút là xong. Mỗi máy họ trả hai man rưỡi tiền công. Hai man rưỡi đấy, bằng chú đi làm cả hai ngày!' },
      { sp: 'hero', text: 'Đăng ký điện thoại… hộ người khác ạ? Máy đó ai dùng hả anh?', jp: '{誰|だれ}が {使|つか}うんですか。' },
      { sp: 'Anh Tuấn', text: 'Khách của họ dùng chứ ai. Mấy ông khách nước ngoài mới sang chưa có giấy tờ, họ mượn tên người có thẻ lưu trú đăng ký giúp. Chuyện này đầy người làm, senpai của chú khóa trước làm ầm ầm, có ai sao đâu. Điện thoại là của họ, cước họ đóng — chú chỉ đứng tên trên giấy thôi.' },
      { sp: 'Anh Tuấn', text: 'Hôm nay ký được bốn máy ở hai cửa hàng là mười man tiền công. Mười man! Gửi về nhà được một khoản, còn dư ăn uống tử tế cả tháng. Chú mới sang, anh thương anh mới gọi chú đầu tiên đấy — để người khác là họ hớt tay trên ngay.' },
      { sp: 'hero', text: '(Mười man… Bằng cả tháng mình tằn tiện. Nhưng sao nghe nó… dễ thế nhỉ?)' },
      {
        prompt: 'Anh Tuấn giục: "Đi luôn bây giờ, cửa hàng sắp đóng cửa." Bạn làm gì?',
        choice: [
          { label: 'Đi theo anh Tuấn tới cửa hàng — tới nơi xem giấy tờ rồi tính', flag: 'sim-di', value: 'di', say: [
            { sp: 'hero', text: 'Dạ… để em đi theo anh tới cửa hàng xem thế nào đã. Em chưa hứa ký đâu nhé anh.', jp: '{店|みせ}に {行|い}って、{書類|しょるい}を {見|み}てから {考|かんが}えます。' },
            { sp: 'Anh Tuấn', text: 'Đấy, thế mới là người biết nắm cơ hội! Đi, anh chở. Tới nơi chú sẽ thấy — toàn người đàng hoàng, cửa hàng lớn giữa phố, có gì đâu mà lo.' }
          ] },
          { label: 'Từ chối khéo ngay tại chỗ — kèo này nghe không ổn', flag: 'sim-di', value: 'khong', fx: { pressure: 1 }, say: [
            { sp: 'hero', text: 'Em cảm ơn anh đã nghĩ tới em. Nhưng đứng tên hộ người khác… em sợ lắm anh ạ. Giấy tờ của em, nhỡ có chuyện gì em không biết đường nào mà gỡ. Thôi anh cho em xin kiếu kèo này.', jp: '{心配|しんぱい}なので、やめておきます。すみません。' },
            { sp: 'Anh Tuấn', text: 'Ôi dào, nhát thế! Người ta làm đầy ra có sao đâu. Thôi, tùy chú — sau này đừng bảo anh có kèo ngon không gọi. Anh đi tìm người khác đây.' },
            { sp: 'narr', text: 'Anh Tuấn quay đi, hơi phật ý. Bạn đứng lại giữa phố đông, tay nắm chặt chiếc ví mỏng. Từ chối một kèo "mười man" không dễ chịu chút nào — nhưng tối nay, bạn sẽ ngủ ngon.' }
          ] }
        ]
      }
    ]
  };

  /* ================= SIM-02 — NHỊP 2+3: ĐIỂM DỪNG ĐỌC GIẤY TỜ + QUYẾT ĐỊNH KÝ ================= */
  window.DEMO_DATA['sim-02-cua-hang'] = {
    scene: '🏬 Cửa hàng điện thoại — bộ giấy tờ',
    branch: [
      { sp: 'narr', text: 'Cửa hàng điện thoại sáng đèn giữa phố, nhân viên cúi chào lịch sự. Anh Tuấn nói nhỏ vài câu, nhân viên gật đầu rồi mang ra một tập giấy dày, hai chiếc điện thoại mới nguyên seal đặt ngay ngắn trên quầy.' },
      { sp: 'Nhân viên cửa hàng', jp: 'いらっしゃいませ。本日は{契約|けいやく}の{手続|てつづ}きですね。こちらが{契約書|けいやくしょ}と{重要事項説明書|じゅうようじこうせつめいしょ}でございます。ご{不明|ふめい}な{点|てん}がございましたら、{何|なん}でもお{聞|き}きください。', text: '(Kính chào quý khách. Hôm nay mình làm thủ tục hợp đồng đúng không ạ. Đây là hợp đồng và bản giải thích các điều khoản quan trọng. Có điểm nào chưa rõ, quý khách cứ hỏi tôi bất cứ điều gì.)' },
      { sp: 'Anh Tuấn', text: 'Đấy chú thấy chưa, người ta tiếp đàng hoàng thế này cơ mà. Ký vào mấy chỗ anh đánh dấu là xong. Nhanh lên, còn qua cửa hàng thứ hai nữa.' },
      { sp: 'narr', text: 'Tập giấy toàn tiếng Nhật, chữ nhỏ li ti. Nhân viên đặt cây bút ngay trước mặt bạn. Đây là khoảnh khắc quyết định: đọc, hay ký?' },
      {
        prompt: 'Trước khi cầm bút, bạn sẽ…',
        choice: [
          { label: 'Xin vài phút ĐỌC KỸ tập giấy — đặc biệt phần chữ nhỏ', say: [
            { sp: 'hero', jp: 'すみません、{少|すこ}し {時間|じかん}をください。{全部|ぜんぶ} {読|よ}んでから サインします。', text: '(Xin lỗi, cho tôi ít phút. Tôi sẽ đọc hết rồi mới ký.)' },
            { sp: 'narr', text: 'Bạn đọc chậm rãi, tra từng chữ. Và đây là những gì tập giấy THẬT SỰ nói — bằng tiếng Nhật khô khốc của hợp đồng:' },
            { sp: 'narr', jp: '「本契約の名義人は、端末代金および月々の通信料金の一切について支払義務を負うものとする。分割支払金の残額は、2台分合計で 264,000円。途中解約の場合、残額は一括で請求される。」', text: '(Người đứng tên hợp đồng chịu nghĩa vụ trả TOÀN BỘ tiền máy và cước hằng tháng. Tổng tiền máy trả góp còn lại của 2 máy: 264.000 yên. Nếu hủy ngang, toàn bộ số còn lại sẽ bị đòi một lần.)' },
            { sp: 'narr', text: 'Bạn nhân nhanh trong đầu: mới 2 máy ở cửa hàng này đã 26,4 man tiền máy — chưa kể cước tháng. Bốn máy ở hai cửa hàng… con số nợ đứng tên có thể lên tới gần 200 man. "Cước họ đóng" — nhưng trên giấy, người nợ là BẠN.' },
            { sp: 'hero', text: '(Hóa ra là thế. Mình đứng tên, mình là người nợ. Nếu họ biến mất, 200 man này đổ hết lên đầu mình… Tay mình đang run.)' }
          ] },
          { label: 'Hỏi lại nhân viên cho chắc: "Nếu người dùng không đóng cước thì sao?"', say: [
            { sp: 'hero', jp: 'あのう…{使|つか}う {人|ひと}が {料金|りょうきん}を {払|はら}わなかったら、どうなりますか。', text: '(Xin hỏi… nếu người dùng máy không trả cước thì sẽ thế nào ạ?)' },
            { sp: 'Nhân viên cửa hàng', jp: 'お{支払|しはら}いは {名義人|めいぎにん}の{方|かた}へご{請求|せいきゅう}いたします。', text: '(Việc thanh toán sẽ được yêu cầu tới NGƯỜI ĐỨNG TÊN ạ.) — Nhân viên trả lời rất nhẹ nhàng, rất kính ngữ… và rất rõ ràng: hóa đơn sẽ gửi về tên BẠN.' },
            { sp: 'Anh Tuấn', text: 'Ôi chú hỏi gì kỳ vậy, người ta làm ăn đàng hoàng ai lại quỵt cước. Đừng làm khó nhân viên nữa, ký đi cho xong việc.' },
            { sp: 'hero', text: '(Anh Tuấn gạt đi nhanh quá. Câu trả lời của nhân viên thì vẫn còn vang trong đầu mình: "yêu cầu tới người đứng tên"…)' }
          ] },
          { label: 'Không đọc — tin anh Tuấn, việc gì phải làm phức tạp', say: [
            { sp: 'narr', text: 'Bạn liếc qua loa mấy trang đầu — toàn điều khoản dài dằng dặc, chữ nào chữ nấy như kiến bò. Anh Tuấn đứng cạnh gật gù: "Đấy, giấy tờ bình thường thôi." Bạn cầm bút lên, lòng nhẹ tênh vì sắp có tiền.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Nhân viên mỉm cười chờ đợi. Anh Tuấn nhìn đồng hồ. Cây bút nằm trong tay bạn.' },
      {
        prompt: 'Quyết định cuối cùng ở quầy:',
        choice: [
          { label: 'KÝ TÊN — đăng ký hộ, nhận tiền công', flag: 'sim-ky', value: 'ky', fx: { money: 5.0, risk: 3, pressure: 2 }, say: [
            { sp: 'narr', text: 'Bạn ký. Ký ở cửa hàng này 2 máy, rồi anh Tuấn chở qua cửa hàng thứ hai ký thêm 2 máy nữa. Tổng cộng 4 máy đứng tên bạn. Anh Tuấn đếm tiền đưa ngay tại chỗ: 5 man — "hai máy đầu, tiền tươi". Hai máy sau, "tối anh chuyển khoản nốt 5 man còn lại".' },
            { sp: 'hero', text: '(Năm man tiền tươi trong ví. Tối nay mình ăn một bữa tử tế. Còn 5 man nữa tối nay anh ấy chuyển… chắc chắn rồi, anh Tuấn nói là làm mà.)' },
            { sp: 'narr', text: 'Đêm đó, bạn ngủ với chiếc ví dày nhất từ ngày sang Nhật. Tin nhắn "chuyển khoản" thì… chưa thấy. Thôi, chắc mai anh ấy mới chuyển. Mấy chuyện giấy tờ, bạn gạt sang một bên — và câu chuyện chưa dừng ở đây.' }
          ] },
          { label: 'ĐẶT BÚT XUỐNG — không ký, đứng dậy ra về', flag: 'sim-ky', value: 'khong', fx: { pressure: 1 }, say: [
            { sp: 'hero', jp: 'すみません。やっぱり {契約|けいやく}は やめておきます。', text: '(Xin lỗi. Tôi nghĩ lại rồi — tôi xin không ký hợp đồng này.)' },
            { sp: 'Nhân viên cửa hàng', jp: 'かしこまりました。またのご{来店|らいてん}をお{待|ま}ちしております。', text: '(Tôi hiểu rồi ạ. Mong được đón tiếp quý khách lần sau.) — Nhân viên vẫn cúi chào như không có chuyện gì.' },
            { sp: 'Anh Tuấn', text: 'Chú làm anh mất mặt quá đấy. Tới tận nơi rồi còn quay xe. Sau này có kèo gì anh không gọi chú nữa đâu — nói trước.' },
            { sp: 'narr', text: 'Bạn bước ra khỏi cửa hàng, nắng chiều đổ xuống phố. Mười man vuột khỏi tay — tiếc thật. Nhưng tập giấy kia đã dạy bạn một điều đắt giá hơn: ở xứ người, chữ ký của mình là thứ không bao giờ được cho mượn.' }
          ] }
        ]
      }
    ]
  };

  /* ================= SIM-03 — NHỊP 4: HẬU QUẢ ĐẾN SAU (máy truyện lên lịch chèn) ================= */
  window.DEMO_DATA['sim-03-hoa-don'] = {
    scene: '✉️ Thư từ công ty điện thoại',
    branch: [
      { sp: 'narr', text: 'Vài tuần sau. Hòm thư phòng trọ có một phong bì dày của công ty điện thoại — rồi hôm sau thêm một phong nữa. Không phải thư quảng cáo: trên bì ghi rõ chữ 「ご請求書」— hóa đơn.' },
      { sp: 'narr', text: 'Hóa đơn kỳ đầu của 4 chiếc máy đứng tên bạn: tiền máy trả góp + cước phát sinh — ¥46,800. Kèm theo là bảng kê: tổng nghĩa vụ trả góp còn lại của 4 máy, nếu bị yêu cầu trả một lần, là ¥1,980,000 — gần 200 man.' },
      { sp: 'narr', text: '📌 Ghi chú từ đời thật: các con số của vụ này (tiền công 2,5 man/máy, hoá đơn kỳ đầu ¥46,800, tổng nghĩa vụ đứng tên ¥1,980,000) là số liệu theo TỪNG VỤ ÁN được báo chí đăng lại — không phải thống kê chính thức.' },
      { sp: 'hero', text: 'Khoan… sao hóa đơn lại gửi về cho mình? Anh Tuấn nói cước họ đóng cơ mà?!', jp: 'えっ…{請求書|せいきゅうしょ}が {私|わたし}の {家|いえ}に…？' },
      { sp: 'narr', text: 'Bạn gọi cho anh Tuấn. Thuê bao không liên lạc được. Nhắn tin — không trả lời. 5 man "chuyển khoản tối nay" từ hôm ký giấy đến giờ vẫn chưa từng xuất hiện. Những người "khách" dùng 4 chiếc máy kia là ai, ở đâu — bạn không hề biết. Bạn chỉ biết một điều chắc chắn: trên giấy tờ, người nợ là bạn.' },
      { sp: 'hero', text: '(Mình… bị lừa rồi. 200 man. Bằng mấy năm trời đi làm. Mình phải làm sao bây giờ… Nói với bố mẹ thế nào đây?)' },
      {
        prompt: 'Ngay lúc này, bạn quyết định:',
        choice: [
          { label: 'Không trốn — tìm nơi hỗ trợ chính thống để xử lý ngay', flag: 'sim-xuly', value: 'ngay', say: [
            { sp: 'hero', text: '(Hoảng thì cũng đã hoảng rồi. Trốn tránh chỉ làm nợ thêm nặng. Mình nhớ thầy Khánh từng nói: ở Nhật có những nơi hỗ trợ người nước ngoài miễn phí. Mình sẽ tới đó, trình bày hết sự thật.)' }
          ] },
          { label: 'Giấu đã — để mai tính, giờ không nghĩ nổi nữa', flag: 'sim-xuly', value: 'de-sau', fx: { risk: 2, pressure: 3 }, say: [
            { sp: 'narr', text: 'Bạn nhét hai phong bì vào ngăn kéo, khóa lại — như thể khóa được cả con số 200 man trong đó. Đêm ấy bạn trằn trọc mãi không ngủ được. Hóa đơn thì vẫn nằm yên trong ngăn kéo… và kỳ hóa đơn tiếp theo đang đến gần.' },
            { sp: 'hero', text: '(Mai. Mai mình sẽ tính. …Mà mai nào cũng nói thế được sao?)' }
          ] }
        ]
      }
    ]
  };

  /* ================= SIM-04 — ĐƯỜNG XỬ LÝ HỢP LỆ (luôn có đường sống) ================= */
  window.DEMO_DATA['sim-04-xu-ly'] = {
    scene: '🆘 Trung tâm hỗ trợ — xử lý chuyện SIM',
    branch: [
      { sp: 'narr', text: 'Bạn tìm tới quầy hỗ trợ người nước ngoài. Trước đó, bạn đã gọi tổng đài điều kiện lao động có hỗ trợ tiếng Việt (0120-531-406) và được chỉ đường tới đây. Nhân viên hỗ trợ nghe bạn kể hết — không trách móc một câu.' },
      { sp: 'Nhân viên hỗ trợ', text: 'Trường hợp của bạn, tiếc là chúng tôi gặp không ít. Điều quan trọng nhất: bạn đã tới đây sớm, và bạn không bỏ trốn. Nợ đứng tên thì phải xử lý từng bước — nhưng có cách để nó không nuốt chửng bạn: liên hệ công ty điện thoại ngay hôm nay, trình bày bị lợi dụng đứng tên, xin trả góp kỳ đầu và đóng băng phát sinh thêm.' },
      { sp: 'Nhân viên hỗ trợ', text: 'Đồng thời, hãy giữ lại mọi giấy tờ, tin nhắn với người môi giới. Nếu muốn, chúng tôi giới thiệu luật sư tư vấn miễn phí buổi đầu qua 法テラス (Houterasu). Và nhớ kỹ: từ nay, tuyệt đối không cho ai mượn tên, thẻ lưu trú hay con dấu của mình — dù thân đến đâu.' },
      { sp: 'hero', jp: '{本当|ほんとう}に ありがとうございます。{逃|に}げないで、{一歩|いっぽ}ずつ {返|かえ}します。', text: '(Thật sự cảm ơn anh/chị. Tôi sẽ không trốn tránh — tôi sẽ trả dần, từng bước một.)' },
      { sp: 'narr', text: 'Công ty điện thoại đồng ý cho bạn xử lý kỳ đầu đang treo, với điều kiện từ nay trả đúng hạn và không phát sinh thêm máy mới. Số nợ lớn vẫn còn đó — nó sẽ đi theo bạn một thời gian dài, nhắc bạn mỗi tháng. Nhưng nó không còn là con số "không biết phải làm sao" nữa.' },
      {
        prompt: 'Với hóa đơn kỳ đầu ¥46,800 đang treo, bạn chọn:',
        choice: [
          { label: 'Trả kỳ đầu ngay (4,68 man) — giữ uy tín, chặn phát sinh xấu', fx: { money: -4.68, pressure: -2 }, say: [
            { sp: 'narr', text: 'Bạn rút tiền trả kỳ đầu. Ví lại mỏng như xưa — nhưng lần này, mỏng vì bạn đang sửa sai, không phải vì bị ai lấy mất. Nhân viên hỗ trợ bắt tay bạn: "Cố lên. Sai thì sửa, sợ gì." — câu này nghe quen quen…' }
          ] },
          { label: 'Xin giãn kỳ đầu — tháng này thật sự không còn tiền', fx: { pressure: 2 }, say: [
            { sp: 'narr', text: 'Bạn trình bày thật là mình không còn đủ tiền, và được chấp nhận giãn sang kỳ sau kèm cam kết bằng văn bản. Đường về dài hơn một chút, nhưng vẫn là đường đi tiếp được — miễn là bạn không biến mất.' }
          ] }
        ]
      },
      { sp: 'narr', text: 'Bước ra khỏi trung tâm hỗ trợ, trời đã nhá nhem. Điện thoại trong túi rung lên — là Mẹ nhắn tin hỏi thăm. Chuyện này… có nên nói với bố mẹ không?' }
    ]
  };
})();
