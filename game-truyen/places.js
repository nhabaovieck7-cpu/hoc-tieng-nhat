// places.js — BẢNG ĐĂNG KÝ TÊN ĐỊA ĐIỂM DUY NHẤT (giai đoạn 2, lệnh chủ trang 13:57 + 13:58 JST 31/10/2026:
// "Mỗi địa điểm 1 tên khác nhau không được trùng"). Mỗi mapId mang MỘT tên riêng là tên
// thành phố / khu / ga / danh lam NỔI TIẾNG THẬT của Nhật, ghép theo tính chất nơi đó.
// LUẬT: muốn sửa tên một địa điểm thì sửa ĐÚNG MỘT DÒNG ở bảng này — nhãn HUD (#hud-area)
// đọc từ đây (engine.js), biển cổng/biển khu trong bản đồ và nhắc tên trong hội thoại
// cũng phải khớp bảng này. KHÔNG hai mapId nào trùng tên (kiểm ở validate-content/harness).
// Biển CHỨC NĂNG trên tòa nhà (銀行, 郵便局+〒, 病院…) giữ nguyên — chỉ tên riêng của nơi đổi.
(function () {
  'use strict';
  window.PLACES = {
    'room':       { jp: '高円寺',   vi: 'Koenji',    label: '🏠 Phòng trọ — 高円寺 Koenji' },
    'street':     { jp: '吉祥寺',   vi: 'Kichijoji', label: '🚶 Đường phố — 吉祥寺 Kichijoji' },
    'station':    { jp: '新宿駅',   vi: 'Shinjuku',  label: '🚉 Trước ga — 新宿駅 Shinjuku' },
    'combini':    { jp: '秋葉原',   vi: 'Akihabara', label: '🏪 Combini — 秋葉原 Akihabara' },
    'restaurant': { jp: '築地',     vi: 'Tsukiji',   label: '🍱 Nhà hàng — 築地 Tsukiji' },
    'kitchen':    { jp: '豊洲',     vi: 'Toyosu',    label: '👨‍🍳 Bếp nhà hàng — 豊洲 Toyosu' },
    'shiyakusho': { jp: '霞が関',   vi: 'Kasumigaseki', label: '🏢 Shiyakusho — 霞が関 Kasumigaseki' },
    'shotengai':  { jp: '浅草',     vi: 'Asakusa',   label: '🛍️ Phố mua sắm — 浅草 Asakusa' },
    'mall':       { jp: '銀座',     vi: 'Ginza',     label: '🛍️ Trung tâm thương mại — 銀座 Ginza' },
    'shop':       { jp: '原宿',     vi: 'Harajuku',  label: '👕 Cửa hàng quần áo — 原宿 Harajuku' },
    'supermarket':{ jp: '中野',     vi: 'Nakano',    label: '🛒 Siêu thị — 中野 Nakano' },
    'bank':       { jp: '丸の内',   vi: 'Marunouchi', label: '🏦 Ngân hàng — 丸の内 Marunouchi' },
    'post':       { jp: '日本橋',   vi: 'Nihonbashi', label: '📮 Bưu điện — 日本橋 Nihonbashi' },
    'koban':      { jp: '上野',     vi: 'Ueno',      label: '👮 Koban — 上野 Ueno' },
    'hospital':   { jp: '本郷',     vi: 'Hongo',     label: '🏥 Bệnh viện — 本郷 Hongo' },
    'park':       { jp: '代々木',   vi: 'Yoyogi',    label: '🌳 Công viên — 代々木 Yoyogi' },
    'temple':     { jp: '鎌倉',     vi: 'Kamakura',  label: '🛕 Chùa — 鎌倉 Kamakura' },
    'school':     { jp: '早稲田',   vi: 'Waseda',    label: '🏫 Trường tiếng — 早稲田 Waseda' },
    'karaoke':    { jp: '渋谷',     vi: 'Shibuya',   label: '🎤 Karaoke — 渋谷 Shibuya' },
    'izakaya':    { jp: '新橋',     vi: 'Shinbashi', label: '🍶 Quán nhậu — 新橋 Shinbashi' },
    'kaigo':      { jp: '神戸',     vi: 'Kobe',      label: '🧓 Nơi làm kaigo — 神戸 Kobe' },
    'hotel':      { jp: 'お台場',   vi: 'Odaiba',    label: '🛏️ Khách sạn — お台場 Odaiba' },
    'genba':      { jp: '横浜',     vi: 'Yokohama',  label: '🏗️ Công trường — 横浜 Yokohama' },
    'shokuhin':   { jp: '大阪',     vi: 'Osaka',     label: '🥩 Nhà máy thực phẩm — 大阪 Osaka' },
    'seizo':      { jp: '名古屋',   vi: 'Nagoya',    label: '🏭 Nhà máy chế tạo — 名古屋 Nagoya' },
    'seibi':      { jp: '豊田',     vi: 'Toyota',    label: '🔧 Xưởng sửa ô tô — 豊田 Toyota' },
    'soko':       { jp: '千葉',     vi: 'Chiba',     label: '📦 Kho vận — 千葉 Chiba' },
    'nogyo':      { jp: '富良野',   vi: 'Furano',    label: '🍅 Nông trại — 富良野 Furano' },
    'may-bay':    { jp: '成田',     vi: 'Narita',    label: '✈️ Máy bay — đáp xuống 成田 Narita' },
    'vn-san-bay': { jp: 'ノイバイ', vi: 'Nội Bài',   label: '🇻🇳 Sân bay Nội Bài — Việt Nam' }
  };
})();
