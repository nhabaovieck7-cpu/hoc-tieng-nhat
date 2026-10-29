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

Phân vai mới theo lệnh của chủ trang Khánh, áp dụng từ **29/10/2026**:

- **Phía B** (trợ lý của builder trước): phụ trách **TOÀN BỘ phần lập trình** của trang: tính năng mới, sửa lỗi, Worker `hoc-tieng-nhat-ai`, dữ liệu D1, các file web, bảo trì kỹ thuật, gồm cả cộng đồng/chat, đồng bộ tiến độ, xếp hạng/huy hiệu và lưu trữ tệp (nay dùng **R2**, theo quyết định của Khánh).
- **Phía A** (trợ lý của chủ trang): **CHỈ** đăng bài học/nội dung và quy trình tin tức hằng ngày lúc 05:00, cùng phần ghi âm/giọng đọc (file audio, `audio-index.json`, cơ chế phát đọc). Phía B không đụng vào các phần này nếu không có lệnh của Khánh.

## Luật cứng cho cả hai phía

1. Lấy ref `main` mới nhất ngay trước khi sửa và ngay trước khi đẩy. Mỗi đợt chỉ đẩy đúng các file thuộc phần việc của mình; file ngoài phạm vi giữ nguyên như trên `main` mới nhất.
2. **TUYỆT ĐỐI không dựng lại hay đẩy thư mục `enc/` từ bản local cũ.** Sự cố ngày 29/10/2026: một lần đẩy từ bản local cũ đã làm chỉ mục khóa học mất toàn bộ N5–N3. Cổng kiểm tra sau mỗi lần đẩy: `enc/meta.json` đủ **19 khóa `v`**; blob của `enc/course.bin` và `enc/search.bin` không đổi, trừ khi đợt làm đó chính là về `enc`.
3. Nếu đợt làm có đổi file thuộc app shell (trang HTML/JS/CSS chính), phải tăng phiên bản SW nối tiếp từ phiên bản đang live mới nhất, không tự đặt số.
4. Không xóa file dự án. Không ghi bí mật (mật khẩu, khóa API, token) vào repo. Nội dung bài học chỉ dùng tên người và địa danh hư cấu. Trong câu hỏi đọc hiểu, không gắn furigana lên chữ kanji đích.

## Nhật ký bàn giao

- **29/10/2026 — Phía A:** Tạo file điều phối này. Trạng thái hiện tại: toàn bộ hệ thống ở mục "Ảnh chụp trạng thái live" đang chạy ổn định trên `main` (SW v53). Chuyển giao phần tin tức: Phía A tiếp nhận đăng tin hằng ngày lúc 05:00 từ 30/10/2026; đề nghị Phía B dừng đăng tin từ ngày đó và, khi thuận tiện, xác nhận đã đọc file này bằng cách thêm một dòng vào nhật ký này.
- **29/10/2026 — Phía B:** Đã đọc file điều phối và làm theo. Routine đăng tin tức hằng ngày của Phía B đã dừng từ 28/10, không đăng tin nữa. Phía B chỉ giữ việc đăng bài học buổi sáng (khoảng 5:30, Thứ 2–Thứ 7): bài học được dựng vào `enc/`, nhưng luôn kéo `main` mới nhất trước khi dựng và trước khi đẩy, và kiểm tra lại `enc/meta.json` đủ 19 khóa `v` cùng khóa N5–N3 sau mỗi lần đẩy. Mỗi đợt sẽ ghi lại vào nhật ký này.
- **29/10/2026 — Phía B:** Kiểm chứng lưu tệp D1 (Cộng đồng/Chat) do Phía A đã triển khai (Worker version `e7e239a7`, bảng `file_chunks` BLOB, mảnh 1.5MB, trần an toàn toàn trang 200MB). Không đổi thiết kế, không deploy lại Worker, không sửa file web/`enc/`. Kiểm chứng đầu-cuối bằng 2 tài khoản thử: bài kèm ảnh, tài liệu qua chat, tệp 3.2MB tải về khớp SHA-256, avatar hiển thị, link ký hết hạn/sửa hạn bị 403, exe/svg bị 415, ảnh >5MB bị 413, hạn mức 200 tệp/tài khoản và trần 200MB toàn trang trả 429 — tất cả đạt; đã xoá sạch dữ liệu thử của Phía B.
- **29/10/2026 — Phía B:** Kiểm chứng bổ sung lưu tệp D1 (không sửa Worker/web, không deploy). API: tệp ≤8.4MB tải lên/tải về khớp SHA-256; tệp >10MB bị 413 đúng; hạn mức 200MB/tài khoản trả 429 đúng. **LỖI cần Phía A sửa:** (1) tệp ~8.5–9.9MB bị Cloudflare Error 1102 "Worker exceeded resource limits" (500/503) khi upload — giới hạn 10MB thực tế không dùng được; (2) `cong-dong.html` + `tin-nhan.html` gửi header `Authorization` sai (chuỗi `<redacted>` thay cho `Bearer `) nên mọi lần tải tệp từ giao diện bị 401; (3) hai trang đọc `j.id` nhưng Worker trả `j.file.id`; (4) `/community/file-token` trả đường dẫn tương đối nên ảnh/tệp trỏ về github.io (404) — cần ghép `SITE.aiEndpoint`; (5) avatar trong thẻ hồ sơ của mình (`renderMine`) không được nạp ảnh; (6) liên kết tài liệu trong chat có `onclick="return false"` nên bấm không tải được; (7) `common.js` gọi `/community/unread` về github.io (404). Đã thử vá (2)(3)(4) tạm trong trình duyệt thử: đăng ảnh, gửi tài liệu, avatar trong bảng tin đều chạy. Dữ liệu thử đã xoá sạch.
- **29/10/2026 — Phía B:** Đã nhận lệnh tổng của Khánh: Phía B phụ trách toàn bộ lập trình (đã cập nhật mục "Phân vai hiện tại"). Theo quyết định của Khánh lúc 18:51 JST, lưu trữ tệp cộng đồng chuyển từ D1 sang **R2** (bucket riêng tư `hoc-tieng-nhat-files`, binding `FILES`; Worker version `b6de56bd-82ca-451d-9842-11cd01fad08e`; trần toàn trang 9GB, 50 lần tải lên/ngày/tài khoản; tệp `d1://` cũ vẫn đọc được qua `file_chunks`). Phía B đã sửa 7 lỗi trong các file cộng đồng/chat của Phía A: `cong-dong.html`, `tin-nhan.html`, `common.js` (+ `sw.js` v56→v57), các commit `7ff88cd`, `e7201e5`. Phía A cần pull `main` trước khi đụng vào các file này. Lưu ý: `worker/src/index.js` trong repo KHÔNG phải bản đang live; bản live đã sao lưu ngoài repo, không deploy lại từ thư mục `worker/`. Kiểm chứng đầu-cuối (Chromium, khung iPhone) đều đạt; dữ liệu thử ở D1 và R2 đã xoá sạch.
- **29/10/2026 — Phía B:** Đồng bộ `worker/src/index.js` trùng khớp từng byte với Worker đang live (version `b6de56bd-82ca-451d-9842-11cd01fad08e`) và thêm binding R2 `FILES` (bucket `hoc-tieng-nhat-files`) vào `worker/wrangler.toml`. Từ nay thư mục `worker/` là nguồn đúng; không có bí mật trong repo, không deploy lại.
- **29/10/2026 19:05 JST — Lập Trình 2 (Phía B):** Commit `557497f` + `efc2926`: `dang-nhap.html` bỏ nhận `?session=` từ URL (Worker live b6de56bd đã dùng mã 1 lần qua `/auth/exchange`); `auth.js` lưu dự phòng `hn_device_id` vào cookie first-party + IndexedDB và khôi phục khi mất localStorage; `dang-cho.html` tự kiểm tra duyệt mỗi 20 giây và khi mở lại tab; đổi `auth.js?v=5e9a553a` trên 16 trang HTML (sửa tay, không chạy stamp.py). SW v57→v58. Không đụng `enc/`, audio, `worker/`, không deploy Worker.
- **29/10/2026 19:17 JST — Lập Trình 2 (Phía B):** Commit `6adf888`: `dang-nhap.html` tự chuyển trang khi đã có phiên (afterAuth đọc cả `j.user.status` của /auth/me — lỗi có từ 34a41045, không do 557497f) và vẽ lại menu sau khi đổi mã; `auth.js` đăng xuất chờ /auth/logout tối đa 4 giây rồi chuyển về `dang-nhap.html` thay vì reload (tránh màn trắng); đổi `auth.js?v=fb72ff4f` trên 16 trang HTML (cong-dong/tin-nhan chỉ đổi ?v=). SW v58→v59. Không đụng `enc/`, audio, `worker/`, không deploy Worker.
- 2026-10-29 · Phía B: tăng tốc (font không chặn render, hero.webp 31KB, lessons-meta.js thay lessons.bin trên trang chủ, prefetch bin khi đã đăng nhập, lesson khoa-* không tải lessons.bin), header mobile 1 hàng + menu avatar, bỏ link quản lý cho người thường, trang riêng mỗi bài bai/<id>.html (chỉ tiêu đề/cấp/phần/số mục, không lộ nội dung) + og/*.jpg + sitemap.xml + robots.txt, sửa xep-hang bị ẩn mãi. SW v60. Lưu ý Phía A: khi thêm bài mới cần chạy lại `node tools/build_pages.js` (tạo bai/ + lessons-meta.js); nếu không, trang chủ tự quay về tải lessons.bin (vẫn đúng, chỉ chậm hơn). Không đụng enc/, audio, tin tức.
- **29/10/2026 — Phía A:** Theo lệnh trực tiếp của chủ trang (ngoại lệ của phân vai lập trình), Phía A tự dựng và đăng 2 tính năng nội dung mới: trang Kiểm tra trình độ 5 phút (`kiem-tra-trinh-do.html`, dữ liệu `data/placement-test.json` — 25 câu + thang gợi ý khóa trong trường `scoring`) và mục Đề thi thử hằng tuần tích hợp trong `thi-thu.html` (dữ liệu `data/weekly-mock/week-<tuần>-<cấp>.json`, danh mục `data/weekly-mock/index.json`). Từ nay, mỗi tuần phía nội dung chỉ cần thêm file đề tuần mới vào `data/weekly-mock/` và cập nhật `index.json` là trang tự hiện. SW v60→v61.
