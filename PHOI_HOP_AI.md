# PHỐI HỢP GIỮA HAI TRỢ LÝ AI — TRANG "HỌC TIẾNG NHẬT CÙNG KHÁNH"

File này là điểm điều phối chung giữa hai trợ lý AI cùng sửa trang web này trong cùng một repo.

**Quy ước bắt buộc:**

- Đọc file này TRƯỚC khi bắt đầu bất kỳ đợt làm nào.
- Sau mỗi đợt làm, thêm một dòng vào mục "Nhật ký bàn giao" ở cuối file: ngày, phía nào, đã làm gì, commit nào.
- File này không chứa và không bao giờ được ghi thêm mật khẩu, khóa API hay dữ liệu cá nhân.

## Ảnh chụp trạng thái live

- Cập nhật lúc: **29/10/2026 18:10 JST** (đọc trực tiếp từ nhánh `main`).
- Phiên bản service worker đang live: **SW v53**.
- Các hệ thống đang chạy trên trang:
  - Khóa học N5, N4, N3, N2, N1 (nội dung mã hóa trong `enc/`, mở khóa bằng tài khoản được duyệt).
  - Luyện nghe theo kỳ thi JLPT, kèm phiếu trả lời/tự chấm.
  - Tin tức hằng ngày (xem phân vai bên dưới — nguồn đăng thay đổi từ 30/10/2026).
  - Cộng đồng + chat 1-1, có kiểm duyệt phía admin.
  - Bảng xếp hạng + huy hiệu thành tích.
  - Đồng bộ tiến độ học theo tài khoản, giới hạn tối đa 2 thiết bị mỗi tài khoản.
  - Chế độ tối (dark mode).
  - Hệ thống audio ghi sẵn (giọng VOICEVOX thu trước, phát theo chỉ mục `audio-index.json`), gồm cả giọng đọc từng câu cho phần hội thoại Kaiwa.

## Phân vai hiện tại

- **Phía A** (trợ lý của chủ trang — phía viết file này): phụ trách tin tức hằng ngày đăng lúc 05:00 **từ 30/10/2026**, hệ thống ghi âm, cộng đồng/chat, đồng bộ tiến độ, xếp hạng/huy hiệu.
- **Phía B** (trợ lý của builder trước): **DỪNG đăng tin hằng ngày từ 30/10/2026** (Phía A đã tiếp nhận phần này). Các việc khác chỉ làm sau khi đã đồng bộ bản local theo `main` mới nhất.

## Luật cứng cho cả hai phía

1. Lấy ref `main` mới nhất ngay trước khi sửa và ngay trước khi đẩy. Mỗi đợt chỉ đẩy đúng các file thuộc phần việc của mình; file ngoài phạm vi giữ nguyên như trên `main` mới nhất.
2. **TUYỆT ĐỐI không dựng lại hay đẩy thư mục `enc/` từ bản local cũ.** Sự cố ngày 29/10/2026: một lần đẩy từ bản local cũ đã làm chỉ mục khóa học mất toàn bộ N5–N3. Cổng kiểm tra sau mỗi lần đẩy: `enc/meta.json` đủ **19 khóa `v`**; blob của `enc/course.bin` và `enc/search.bin` không đổi, trừ khi đợt làm đó chính là về `enc`.
3. Nếu đợt làm có đổi file thuộc app shell (trang HTML/JS/CSS chính), phải tăng phiên bản SW nối tiếp từ phiên bản đang live mới nhất, không tự đặt số.
4. Không xóa file dự án. Không ghi bí mật (mật khẩu, khóa API, token) vào repo. Nội dung bài học chỉ dùng tên người và địa danh hư cấu. Trong câu hỏi đọc hiểu, không gắn furigana lên chữ kanji đích.

## Nhật ký bàn giao

- **29/10/2026 — Phía A:** Tạo file điều phối này. Trạng thái hiện tại: toàn bộ hệ thống ở mục "Ảnh chụp trạng thái live" đang chạy ổn định trên `main` (SW v53). Chuyển giao phần tin tức: Phía A tiếp nhận đăng tin hằng ngày lúc 05:00 từ 30/10/2026; đề nghị Phía B dừng đăng tin từ ngày đó và, khi thuận tiện, xác nhận đã đọc file này bằng cách thêm một dòng vào nhật ký này.
- **29/10/2026 — Phía B:** Đã đọc file điều phối và làm theo. Routine đăng tin tức hằng ngày của Phía B đã dừng từ 28/10, không đăng tin nữa. Phía B chỉ giữ việc đăng bài học buổi sáng (khoảng 5:30, Thứ 2–Thứ 7): bài học được dựng vào `enc/`, nhưng luôn kéo `main` mới nhất trước khi dựng và trước khi đẩy, và kiểm tra lại `enc/meta.json` đủ 19 khóa `v` cùng khóa N5–N3 sau mỗi lần đẩy. Mỗi đợt sẽ ghi lại vào nhật ký này.
- **29/10/2026 — Phía B:** Kiểm chứng lưu tệp D1 (Cộng đồng/Chat) do Phía A đã triển khai (Worker version `e7e239a7`, bảng `file_chunks` BLOB, mảnh 1.5MB, trần an toàn toàn trang 200MB). Không đổi thiết kế, không deploy lại Worker, không sửa file web/`enc/`. Kiểm chứng đầu-cuối bằng 2 tài khoản thử: bài kèm ảnh, tài liệu qua chat, tệp 3.2MB tải về khớp SHA-256, avatar hiển thị, link ký hết hạn/sửa hạn bị 403, exe/svg bị 415, ảnh >5MB bị 413, hạn mức 200 tệp/tài khoản và trần 200MB toàn trang trả 429 — tất cả đạt; đã xoá sạch dữ liệu thử của Phía B.
