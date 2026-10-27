// Đổi tên trang web ở đây
const SITE = { title: "Học tiếng Nhật cùng Khánh", intro: "Chia sẻ bài học tiếng Nhật cho người Việt: từ vựng, ngữ pháp, kanji và tiếng Nhật trong công việc kaigo (介護)." };
// Trợ lý AI: dán địa chỉ Cloudflare Worker (xem worker/HUONG_DAN.txt). Để trống = ẩn tính năng AI.
SITE.aiEndpoint = "https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev";
// Bình luận Giscus: điền repoId + categoryId lấy từ https://giscus.app (xem HUONG_DAN_TINH_NANG.txt). Để trống = ẩn bình luận.
SITE.giscus = { repo: "nhabaovieck7-cpu/hoc-tieng-nhat", repoId: "", category: "Bình luận", categoryId: "" };
