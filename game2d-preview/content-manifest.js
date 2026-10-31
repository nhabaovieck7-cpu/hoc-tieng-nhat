// content-manifest.js — BẢN KÊ GÓI NỘI DUNG của game «TUỔI TRẺ Ở NHẬT».
// Đây là NGUỒN SỰ THẬT về phiên bản nội dung: gói nào chứa bản đồ/cảnh nào, phiên bản bao nhiêu, ngày nào.
// Phát hành nội dung mới = thêm gói (hoặc tăng phiên bản gói liên quan) tại đây sau khi đã:
//   đăng ký tình huống vào Sổ → kiểm thử harness đạt → chủ trang duyệt → tăng phiên bản.
// ID trong bản kê là BẤT BIẾN: chỉ thêm dòng mới, không xóa/đổi tên ID cũ (xem luật ở content.js).
// File này nạp SAU mọi file nội dung, TRƯỚC engine.js; cuối file chốt kiểm chứng qua CONTENT.finalize().
(function () {
  'use strict';
  var C = window.CONTENT;

  C.declare({
    id: 'goi-nen-tang', version: '1.0.4', date: '2026-10-31',
    title: 'Nền tảng — ngày đầu ở Nhật',
    notes: [
      '6 bối cảnh đầu tiên: phòng trọ, đường phố, trước ga, combini, nhà hàng, shiyakusho.',
      'Mạch mẫu ngày đầu: gặp senpai Hùng, diễn kaiwa ở combini, tin nhắn điện thoại, câu hỏi nghe ghi âm thật, phân loại rác.',
      'Cập nhật hội thoại đầy đủ: đăng ký địa chỉ ở shiyakusho, hỏi đường lạc tàu ở ga, gọi món ở nhà hàng, trò chuyện với Hùng và máy bán hàng — tất cả đều có thoại thật nhiều lượt, chọn đáp án và dịch từng câu.',
      'Mới: bàn học trong phòng trọ mở được buổi học online buổi tối với thầy giáo; cạnh điểm tập kết rác có túi rác bị dán giấy nhắc đỏ — tới xin lỗi bà hàng xóm và học lại lịch đổ rác.',
      'Mới: điện thoại có thêm DẠNG CUỘC GỌI — gọi về nhà nghe giọng bố mẹ từng lượt như thật (cảnh nhớ nhà), khác hẳn nhắn tin.',
      'Mới (đợt máy truyện): toàn bộ mạch chạy trên MÁY TRUYỆN đầy đủ — tiến độ được LƯU lại (đóng trang mở lại chơi tiếp), cuộc gọi về nhà 1.9 thành nhịp bắt buộc của mạch chính, và Chương 1 khép lại bằng MỐC THI JLPT N5 dùng đề thi thật của web (trượt thì ôn ở bàn học rồi thi lại, không kẹt).',
      'Mới (đợt Chương 2 trọn vẹn): máy truyện mở rộng — phòng trọ có thêm chiếc TV nhỏ trên kệ để xem tin tức; máy thi dùng chung cho mọi cấp JLPT (thêm mốc N4 cuối Chương 2, cùng khuôn ôn–thi lại–lệ phí như N5); điện thoại có thêm DẠNG CUỘC GỌI TẾT — gọi về nhà đón giao thừa từ xa (nhớ nhà lần 2).'
    ],
    maps: ['room', 'street', 'station', 'combini', 'restaurant', 'shiyakusho'],
    scenes: ['intro', 'hung', 'combini', 'vending', 'staff', 'officer', 'station', 'room-desk', 'gomi-apology']
  });

  C.declare({
    id: 'goi-mo-dau-san-bay', version: '1.1.1', date: '2026-10-31',
    title: 'Mở đầu mới — chia tay ở sân bay Việt Nam',
    notes: [
      'Game bắt đầu từ sảnh sân bay Việt Nam: chia tay bố mẹ và người yêu (chọn lời đáp, lời hứa được ghi sổ), lên máy bay sang Nhật.',
      'Bỏ nút điều hướng ảo — chỉ còn chạm/ấn-để-đi.',
      'Quầy làm thủ tục và khoang máy bay có thêm lựa chọn tình huống; những lời đáp ở sân bay và tin nhắn đầu tiên về nhà để lại dấu ấn lâu dài trong truyện.'
    ],
    maps: ['vn-san-bay', 'may-bay'],
    scenes: ['airport-intro', 'airport-checkin', 'airport-family', 'airport-lover', 'airport-gate', 'flight', 'flight-window']
  });

  C.declare({
    id: 'goi-pho-dich-vu', version: '1.2.3', date: '2026-10-31',
    title: 'Phố mua sắm & dịch vụ quanh nhà',
    notes: [
      'Thêm phố mua sắm 浅草商店街 làm trung tâm khu phố.',
      'Mở thêm: koban, ngân hàng (có ATM), bưu điện, siêu thị — mỗi nơi có người để hỏi chuyện và việc để làm thử.',
      'Cập nhật hội thoại đầy đủ: khai báo mất đồ ở koban, mở tài khoản và rút tiền ATM ở ngân hàng, gửi EMS về Việt Nam ở bưu điện, tính tiền và săn đồ giảm giá ở siêu thị, nhận おすそ分け từ bà cụ ở phố mua sắm.',
      'Mới: cửa hàng quần áo 原宿洋品店 ở cổng nam phố mua sắm — vào thử đồ, đổi size áo và học cách nói chuyện với nhân viên bán hàng.',
      'Mới (đợt máy truyện): anh Tuấn "môi giới" xuất hiện ở phố mua sắm gần cửa ngân hàng — từ Chương 2, anh ta sẽ có một "kèo thơm" dành cho người mới sang.'
    ],
    maps: ['shotengai', 'koban', 'bank', 'post', 'supermarket', 'shop'],
    scenes: ['shotengai-obaasan', 'koban', 'koban-board', 'bank-counter', 'bank-atm', 'post-counter', 'post-box', 'super-checkout', 'super-shelf', 'shop-exchange']
  });

  C.declare({
    id: 'goi-doi-song-cong-cong', version: '1.2.1', date: '2026-10-31',
    title: 'Đời sống quanh khu phố',
    notes: [
      'Mở thêm: bệnh viện, công viên, karaoke, quán nhậu izakaya, nơi làm kaigo (day-service), chùa Việt, trường tiếng Nhật.',
      'Cập nhật hội thoại đầy đủ cho mọi điểm đến: đi khám và nhận thuốc ở bệnh viện, tập thể dục buổi sáng ở công viên, thuê phòng karaoke, gọi món ở izakaya, ngày đầu ở nơi làm kaigo với chị Mai, thắp hương ở chùa Việt, giờ học ở trường tiếng Nhật.'
    ],
    maps: ['hospital', 'park', 'karaoke', 'izakaya', 'kaigo', 'temple', 'school'],
    scenes: ['hospital-reception', 'hospital-pharmacy', 'park-elder', 'park-fountain', 'karaoke-reception', 'karaoke-room', 'izakaya-master', 'izakaya-menu', 'kaigo-mai', 'kaigo-board', 'temple-monk', 'temple-bell', 'school-teacher', 'school-board']
  });

  C.declare({
    id: 'goi-noi-lam-nganh', version: '1.3.1', date: '2026-10-31',
    title: 'Nơi làm việc theo ngành — không chỉ kaigo',
    notes: [
      'Mở thêm 7 nơi làm theo ngành: công trường xây dựng, nhà máy chế biến thực phẩm, nhà máy chế tạo, nông trại nhà kính, khách sạn, kho vận, xưởng sửa ô tô — vào từ các cổng phía nam khu phố.',
      'Bếp nhà hàng thành khu làm việc riêng: từ quầy counter của 築地食堂, bước qua tấm noren là vào bếp.',
      'Cập nhật hội thoại THẬT cho cả 13 cảnh nơi làm: điểm danh và hô an toàn ở công trường, trình tự vệ sinh ở nhà máy thực phẩm, chỉ tay hô xác nhận ở xưởng chế tạo, xem luống và lịch xuất hàng ở nông trại, kính ngữ phục vụ ở khách sạn, nhịp quét hàng ở kho vận, kiểm phanh hai lượt ở xưởng ô tô, và "hai thứ tiếng" trong bếp nhà hàng — nhân vật có tính cách, người chơi có lựa chọn, nói sai có người sửa ngay.'
    ],
    maps: ['genba', 'shokuhin', 'seizo', 'nogyo', 'hotel', 'soko', 'seibi', 'kitchen'],
    scenes: ['genba-boss', 'genba-board', 'shokuhin-leader', 'shokuhin-board', 'seizo-senpai', 'seizo-board',
      'nogyo-boss', 'nogyo-board', 'hotel-senpai', 'soko-leader', 'seibi-boss', 'kitchen-manager', 'kitchen-board']
  });

  C.declare({
    id: 'goi-chuong-2-sim', version: '1.4.0', date: '2026-10-31',
    title: 'Chương 2 mở đầu — cám dỗ SIM (đứng tên điện thoại hộ)',
    notes: [
      'Chương 2 «Vào guồng» mở đầu bằng một cám dỗ có thật ngoài đời: anh Tuấn "môi giới" rủ đứng tên đăng ký điện thoại hộ — tiền công 2,5 man mỗi máy nghe rất thơm với một chiếc ví mỏng.',
      'Cảnh có đủ hai đường: TỪ CHỐI (mất lòng một chút, ngủ ngon) và SA NGÃ (ký 4 máy, nhận trước 5 man — rồi hoá đơn kỳ đầu ¥46,800 và món nợ đứng tên gần 200 man tìm đến sau, kèm đường xử lý hợp lệ qua tổng đài hỗ trợ tiếng Việt và trung tâm hỗ trợ người nước ngoài). Ghi chú: các số liệu của vụ SIM là số theo từng vụ án trên báo, không phải thống kê chính thức.',
      'Điểm đặc biệt: "trận chiến" của cảnh là ĐỌC HIỂU — bộ giấy tờ hợp đồng tiếng Nhật đặt ngay trước mặt, đọc kỹ hay ký mù là lựa chọn của người chơi; và sau tất cả, một tin nhắn của Mẹ: nói thật hay giấu, cũng là lựa chọn của người chơi.'
    ],
    maps: [],
    scenes: ['ch2-opening', 'sim-01-loi-ru', 'sim-02-cua-hang', 'sim-03-hoa-don', 'sim-04-xu-ly']
  });

  C.declare({
    id: 'goi-chuong-2-vao-guong', version: '1.5.0', date: '2026-10-31',
    title: 'Chương 2 trọn vẹn — lương đầu, bản tin TV, rung động đầu & mốc N4',
    notes: [
      'LƯƠNG ĐẦU & VÒNG THÁNG: tới quầy ngân hàng nhận lương đầu (lương tay 16,80 man), đọc kỹ bảng lương, trừ chi phí sống 7,80 man — rồi tự tay chọn gửi về nhà GẦN HẾT 8 man / VỪA 5 man / ÍT 2 man. Gửi xong là có tin nhắn của Mẹ theo đúng mức đã gửi.',
      'BẢN TIN TV trong phòng trọ: tin người Việt bị bắt vì giấy tờ giả + dãy số liệu chính thức về thực tập sinh mất tích của Cơ quan Quản lý Xuất nhập cảnh (2022: 9.006 · 2023: 9.753 — Việt 5.481 · 2024: 6.510 · 2025: 3.950). Ngay sau bản tin, anh Tuấn lại nhắn rủ "làm thêm ngoài" — từ chối, ỡm ờ hay im lặng là lựa chọn của bạn.',
      'RUNG ĐỘNG ĐẦU TIÊN: Yui ở combini đã nhớ mặt khách quen, nhớ cả món bạn hay mua. Thêm một cuộc gọi về nhà đón TẾT từ xa cùng bố mẹ và tin nhắn chúc Tết của Linh (nhớ nhà lần 2).',
      'MỐC THI JLPT N4 cuối Chương 2 — đề thi thử N4 THẬT của web (thi không đỗ thì ôn ở bàn học, thi lại, không kẹt) — qua mốc là TỔNG KẾT Chương 2 và mở khoá Chương 3 «Ngã rẽ» (cảnh mở đầu).'
    ],
    maps: [],
    scenes: ['ch2-luong', 'ch2-tv', 'ch2-yui', 'ch3-opening']
  });

  C.declare({
    id: 'goi-ngoai-hinh-mall', version: '1.6.0', date: '2026-10-31',
    title: 'Ngoại hình & trung tâm thương mại — sắm đồ theo cấp',
    notes: [
      'Mới: TRUNG TÂM THƯƠNG MẠI 銀座モール mở ở cổng nam phố mua sắm — 4 quầy: thời trang, trang sức & phụ kiện, mỹ phẩm, nước hoa. Vào được từ đầu, hàng xịn mở theo CẤP (cấp suy từ mốc JLPT đã đỗ: N5 → cấp 2, N4 → cấp 3).',
      'Mới: màn hình NGOẠI HÌNH & TỦ ĐỒ (Menu ☰ hoặc tủ quần áo trong phòng trọ): đổi kiểu tóc (6 kiểu), màu tóc, màu da, áo, quần/váy miễn phí; đồ mua ở mall vào tủ đồ, mặc lên người là nhân vật đổi ngay — kính, vòng cổ, túi, mũ đều vẽ lên người; mỹ phẩm/nước hoa tính thành điểm phong cách riêng.',
      'Học mua sắm thật: kaiwa chào hỏi + mặc thử ở quầy thời trang, tìm son hợp tông da ở quầy mỹ phẩm — nhân viên nói kính ngữ chuẩn, có cả mẫu câu trả bằng thẻ.',
      'Chuẩn bị nền cho kinh tế người chơi (đợt máy chủ riêng): mọi món có ID ổn định, mỗi món sở hữu có mã instance riêng và cờ chuyển nhượng; mọi khoản tiền mua/bán đều ghi sổ giao dịch kèm mã lý do.'
    ],
    maps: ['mall'],
    scenes: ['mall-fashion', 'mall-cosmetics']
  });

  C.declare({
    id: 'goi-doi-song-mua-xa-hoi', version: '1.7.0', date: '2026-10-31',
    title: 'Đi lại · mùa · đời sống xã hội — tàu điện, Shinkansen, tất niên, đồng hương',
    notes: [
      'Mới: ĐI TÀU ở ga 新宿 — tàu điện thường (vài trăm yên) và Shinkansen chặng xa (名古屋/大阪/神戸…), chọn người đi cùng, ăn ekiben trên tàu; nơi chưa mở theo truyện thì vé báo rõ lý do.',
      'Mới: MÙA theo tiến trình truyện (thu lá đỏ · đông cuối năm · xuân anh đào) với hạt hoa/lá rơi ngoài trời; sự kiện hanami ở công viên 代々木 và ngắm lá đỏ ở chùa 鎌倉.',
      'Mới: cảnh 忘年会 (tiệc tất niên) bắt buộc ở Chương 2 — học 上座/下座, お酌, từ chối rượu khéo, 二次会 karaoke; công ty trả phần lớn.',
      'Mới: HỌP ĐỒNG HƯƠNG lặp được ở công viên sau mỗi kỳ lương — nghe kinh nghiệm tử tế và cả lời rủ rê xám để tự chọn đáp.'
    ],
    maps: [],
    scenes: ['bonenkai', 'dong-huong', 'hanami', 'momiji']
  });

  C.declare({
    id: 'goi-tinh-cam-quan-he', version: '1.8.0', date: '2026-10-31',
    title: 'Tình cảm Chương 3 — yêu xa đổ vỡ, hồi phục, tình mới & hệ quan hệ',
    notes: [
      'Mới: ARC YÊU XA ở Chương 3 — điểm "quan tâm yêu xa" từ cách bạn đối xử với người yêu ở quê quyết định kết cục: giữ được nhau, bị buông tay, hay phát hiện người thứ ba; thoại viết riêng cho tuyến nam (Linh) và tuyến nữ (Hải).',
      'Mới: CHUỖI HỒI PHỤC sau đổ vỡ — khóc một trận ở phòng trọ, bạn bè kéo dậy, và lựa chọn cách gượng dậy của riêng bạn; lành rồi mới mở lòng lại.',
      'Mới: TÁN NGƯỜI MỚI ở Nhật — chọn theo đuổi gái Nhật Yui, gái Việt Hằng, trai Nhật Ren hoặc trai Việt Khôi; rủ đi chơi (trừ tiền vé + ăn), rủ về nhà nấu ăn cùng nhau, tặng quà đúng gu, tỏ tình khi thiện cảm đủ chín; có cả nhịp được người khác tán ngược.',
      'Mới: thiện cảm của từng người là cờ chuẩn affection.<người> (xem trong mục 💗 Tình cảm cạnh nút điện thoại) — nền cho hệ quan hệ/kết đôi của đợt sau.'
    ],
    maps: [],
    scenes: ['ch3-hang-vo', 'ch3-ren-gap', 'ch3-khoi-gap', 'ch3-cam-do-nam', 'ch3-cam-do-nu',
      'ch3-davut-nam', 'ch3-davut-nu', 'ch3-camsung-nam', 'ch3-camsung-nu', 'ch3-giu-duoc-nam', 'ch3-giu-duoc-nu',
      'ch3-khoc', 'ch3-hoi-phuc', 'ch3-tan-nguoc-nam', 'ch3-tan-nguoc-nu',
      'hen-yui', 'hen-hang', 'hen-ren', 'hen-khoi', 've-nha-yui', 've-nha-hang', 've-nha-ren', 've-nha-khoi',
      'to-tinh-yui', 'to-tinh-hang', 'to-tinh-ren', 'to-tinh-khoi', 'to-tinh-loi',
      'be-ban-hung', 'be-ban-hang', 'be-ban-yui', 'be-ban-mai', 'be-ban-ren', 'be-ban-khoi',
      'ket-doi-yui', 'ket-doi-hang', 'ket-doi-ren', 'ket-doi-khoi', 'karaoke-doi', 'cong-vien-doi']
  });

  C.finalize();
})();
