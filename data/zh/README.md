# Đặc tả khóa tiếng Trung (cho Lập Trình 2)

Hạ tầng đã có trên `main`: thanh chọn 日本語 / English / 中文, `zh.html`, `lesson.html?lang=zh&id=...`, tiến độ tách theo ngôn ngữ, TTS trình duyệt (`zh-CN`). **Phía B không viết nội dung HSK.** Lập Trình 2 chỉ cần thêm file dữ liệu đúng định dạng dưới đây, rồi đặt `"ready": true` ở cấp tương ứng trong `data/zh/index.json`.

## File cần tạo

- `data/zh/index.json` — **đã có**. Mục lục 6 cấp HSK 1–6, hiện `"ready": false`. Khi xong một cấp, đổi cấp đó thành `"ready": true` (giữ `"pack": "hsk1.json"` v.v.).
- `data/zh/hsk1.json` — **chưa có**, Lập Trình 2 tạo. Các cấp sau: `hsk2.json` … `hsk6.json`.
- Không sửa `enc/`, không đụng tin tức / game / khóa tiếng Nhật.
- Chữ **giản thể**, có **pinyin**, giải thích **tiếng Việt**. Tên người trong hội thoại phải là tên giả.

## Khổ `data/zh/hsk1.json`

```json
{
  "lang": "zh",
  "level": "HSK1",
  "lessons": [ { "...một bài..." } ]
}
```

Mỗi bài trong `lessons` là một object:

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `id` | có | Duy nhất, dạng `zh-hsk1-np-01`, `zh-hsk1-tv-01`, `zh-hsk1-kw-01`, `zh-hsk1-dk-01`, `zh-hsk1-hz-01` (số 2 chữ số). Tiền tố `zh-hsk1-` để trang tìm đúng pack. |
| `title` | có | Tiêu đề hiện ra (có thể có HTML nhẹ, ví dụ `<span lang="zh-Hans">你好</span> — Chào hỏi`). |
| `level` | có | Đúng `HSK1` (hoặc `HSK2`… khớp `levels[].id` trong index). |
| `type` | có | Một trong: `Ngữ pháp`, `Từ vựng`, `Hội thoại`, `Đọc hiểu`, `Chữ Hán`. Đúng chữ, đúng dấu. |
| `sections` | có | Mảng `{ "h": "Tiêu đề mục", "html": "…nội dung HTML…" }`. |
| `quiz` | nên có | Mảng câu trắc nghiệm 4 lựa chọn: `{ "q": "câu hỏi (HTML được)", "o": ["A","B","C","D"], "c": 0 }` — `c` là chỉ số đáp án đúng (0–3). |
| `ttsLang` | hội thoại | `"zh-CN"`. |

Không dùng đúng cụm `<b>Nghĩa:</b>` / `<b>Cấu trúc:</b>` (trùng máy sinh câu Nhật). Nên dùng `<b>Giải thích:</b>` và `<b>Công thức:</b>`.

## HTML trong `sections`

- Pinyin: `<ruby>你<rt>nǐ</rt>好<rt>hǎo</rt></ruby>` (gom theo từ, không chèn khoảng giữa chữ của cùng một từ).
- Đánh dấu tiếng Trung: `lang="zh-Hans"`.
- Hội thoại: bọc cả đoạn trong `<div class="hn-kaiwa">`, thêm thanh:

```html
<div class="hn-ttsbar">
  <button type="button" class="hn-tts hn-tts-all">🔊 Đọc cả hội thoại</button>
  <button type="button" class="hn-tts hn-ttslow hn-tts-all" data-rate="slow">🐢 Chậm</button>
  <button type="button" class="hn-shadow">📖 Đọc theo</button>
</div>
<p class="hn-shadow-hint" hidden></p>
```

Mỗi câu:

```html
<div class="hn-line" data-tts="你好！我叫明。" data-tts-lang="zh-CN">
  <div class="hn-line-sp">明</div>
  <div class="hn-line-tx" lang="zh-Hans">…ruby…</div>
  <div class="hn-line-vi">Xin chào! Tôi tên là Minh.</div>
  <button type="button" class="hn-tts" data-tts="你好！我叫明。" data-tts-lang="zh-CN">🔊 Nghe</button>
</div>
```

`data-tts` là câu **chữ Hán không ruby**, để giọng máy đọc đúng.

## Liên kết bài

`lesson.html?lang=zh&id=zh-hsk1-np-01`

Trang `zh.html` tự vẽ danh sách khi pack `ready`. Không cần sửa HTML/JS nếu giữ đúng khổ trên.

## Tiến độ và Worker

- Tiến độ máy: `localStorage` khóa `hn_prog_v1_zh` (tiếng Nhật vẫn là `hn_prog_v1`).
- Phiên học gửi `lang: "zh"` lên `/study/start` và `/study/ping`. Không in secret, không đụng `enc/`.

## Tham khảo tiếng Anh (cùng khổ)

Khi có `data/en/a1.json`, xem một bài `Hội thoại` và một bài `Ngữ pháp` để bắt chước cấu trúc. Mục lục: `data/en/index.json`.
