// maps-post.js — Bưu điện hư cấu «日本橋郵便局» (bối cảnh 2D, đợt duyệt).
// Dữ liệu thuần + paint theo hợp đồng maps-core.js. Không trạng thái chạy.
// Quầy chừa lối vòng hai đầu (x1-2 và x11-14 ở hàng y=3);
// ô nhân viên (5,2) cố ý KHÔNG nằm trong solidsExtra.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['post'] = {
  id: 'post',
  label: '📮 Bưu điện 日本橋郵便局',
  grid: [
    '################',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............#',
    '########D#######'
  ],
  solidsExtra: [
    [1, 1, 3, 1],    // kệ / bàn soạn bưu phẩm sau quầy — tây
    [12, 1, 3, 1],   // quầy ゆうちょ + tủ sau quầy — đông-bắc
    [3, 3, 8, 1],    // quầy bưu phẩm (chừa lối vòng 2 đầu)
    [1, 5, 1, 2],    // kệ phong bì / hộp dọc tường tây
    [11, 5, 2, 1],   // cân bưu kiện
    [5, 6, 3, 1],    // ghế chờ
    [14, 7, 1, 1],   // hòm thư đỏ trong nhà — điểm tương tác
    [3, 8, 3, 1],    // bàn viết / dán tem
    [15, 9, 1, 1]    // chậu cây góc đông-nam
  ],
  doors: { '8,10': { to: 'shotengai', spawn: [32, 4] } },
  npcs: [
    { id: 'post-staff', name: 'Nhân viên bưu điện', sprite: 'staffM', tx: 5, ty: 2, behavior: 'stand', scene: 'post-counter', label: '💬 Tới quầy bưu điện', range: 96 }
  ],
  objects: [
    { tx: 14, ty: 7, tw: 1, th: 1, interact: { scene: 'post-box', label: '📮 Bỏ thư / xem bảng giá cước' } }
  ],
  spawnDefault: [8, 8],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Sàn gạch ấm + tường bưu điện ===== */
    rect(0, -40, 16 * T, 11 * T + 40, '#e0d6bf');
    rect(32, 32, 14 * T, 9 * T, '#ddd3b8');
    var tx, ty, i;
    for (ty = 1; ty <= 9; ty++) for (tx = 1; tx <= 14; tx++) {
      if ((tx + ty) % 2 === 0) rect(tx * T, ty * T, T, T, 'rgba(255,255,255,0.20)');
      if (H.hash(tx * 3, ty * 5) > 0.88) rect(tx * T + 5, ty * T + 21, 10, 2, 'rgba(140,110,60,0.16)');
    }
    for (i = 1; i < 14; i++) line(32 + i * T, 32, 32 + i * T, 320, 'rgba(160,145,110,0.32)', 1);
    for (i = 1; i < 9; i++) line(32, 32 + i * T, 480, 32 + i * T, 'rgba(160,145,110,0.32)', 1);
    rect(0, 0, 16 * T, 32, '#f2ecdc'); rect(0, 0, 32, 11 * T, '#eae2cf');
    rect(480, 0, 32, 11 * T, '#eae2cf'); rect(0, 320, 16 * T, 32, '#eae2cf');
    line(32, 32, 480, 32, '#bdb294', 2);
    rect(246, 128, 24, 192, 'rgba(199,62,58,0.14)'); // thảm dẫn tới quầy
    H.txt(g, '▲', 258, 176, 9, 'rgba(199,62,58,0.45)'); H.txt(g, '▲', 258, 248, 9, 'rgba(199,62,58,0.45)');

    /* ===== Biển bưu điện (vùng y âm) + biển treo 郵便 / ゆうちょ ===== */
    line(140, -40, 140, -24, '#8a9299', 2); line(372, -40, 372, -24, '#8a9299', 2);
    g.fillStyle = '#c73e3a'; H.rr(g, 132, -37, 248, 29, 5);
    H.txt(g, '〒 日本橋郵便局', 256, -22, 16, '#ffffff');
    g.fillStyle = '#c73e3a'; H.rr(g, 44, -33, 84, 22, 4); H.txt(g, '郵便', 86, -22, 11, '#ffffff');
    g.fillStyle = '#3a7d5d'; H.rr(g, 384, -33, 84, 22, 4); H.txt(g, 'ゆうちょ', 426, -22, 10, '#ffffff');
    rect(192, 5, 128, 22, '#c73e3a'); H.txt(g, '日本橋郵便局', 256, 16, 12, '#ffffff');

    /* ===== Sau quầy: kệ soạn bưu phẩm (1,1)-(3,1) + quầy ゆうちょ (12,1)-(14,1) ===== */
    rect(34, 35, 92, 24, '#a98a5e'); line(34, 47, 126, 47, '#8a6f47', 2);
    rect(38, 38, 18, 8, '#e8c87a'); rect(60, 38, 18, 8, '#c8d8e8'); rect(82, 38, 18, 8, '#e8a0b4'); // kiện hàng chờ phân loại
    rect(38, 50, 14, 7, '#ffffff'); rect(56, 50, 14, 7, '#fdf6d8'); rect(74, 50, 14, 7, '#ffffff'); rect(92, 50, 14, 7, '#d8e8f5');
    g.fillStyle = '#3a7d5d'; H.rr(g, 386, 34, 92, 26, 3); // mặt quầy ゆうちょ銀行
    H.txt(g, 'ゆうちょ銀行', 432, 43, 9, '#ffffff');
    rect(392, 50, 22, 7, '#ffffff'); rect(418, 50, 22, 7, '#fdf6d8'); rect(444, 50, 22, 7, '#ffffff');
    H.txt(g, '貯金・保険', 432, 27, 7, '#2e5a44');
    g.fillStyle = '#7a4a3a'; H.rr(g, 148, 68, 28, 16, 3); // lưng ghế nhân viên ở ô (5,2)
    rect(140, 84, 44, 6, '#f4f4f4'); H.txt(g, '国際郵便', 162, 87, 5, '#888888');
    cir(210, 44, 6, '#c73e3a'); H.txt(g, '〒', 210, 44, 8, '#ffffff'); // con dấu bưu điện tròn sau quầy

    /* ===== Quầy bưu phẩm (3,3)-(10,3): mặt gỗ + biển郵便窓口 + cân nhỏ trên quầy ===== */
    rect(96, 96, 256, 32, '#f2ede2'); rect(96, 110, 256, 18, '#d3c19a');
    rect(96, 96, 256, 5, '#ffffff'); rect(96, 124, 256, 4, '#8a6f47');
    for (i = 0; i < 4; i++) line(96 + i * 64 + 32, 110, 96 + i * 64 + 32, 128, '#b3a077', 1.5);
    g.fillStyle = '#c73e3a'; H.rr(g, 176, 76, 96, 16, 3); H.txt(g, '郵便窓口', 224, 84, 10, '#ffffff');
    g.fillStyle = '#3a7d5d'; H.rr(g, 284, 76, 60, 16, 3); H.txt(g, 'EMS・国際', 314, 84, 7.5, '#ffffff');
    rect(116, 102, 30, 13, '#d8dde2'); rect(120, 105, 22, 6, '#7ac74f'); H.txt(g, 'kg', 131, 119, 5, '#666666'); // cân mini trên quầy
    rect(300, 103, 34, 12, '#ffffff'); H.txt(g, '航空便', 317, 109, 7, '#31517d'); // nhãn hàng không
    cir(104, 104, 3, '#c9a227'); cir(344, 104, 3, '#c9a227');

    /* ===== Kệ phong bì / hộp (1,5)-(1,6): 封筒・箱 các cỡ ===== */
    rect(34, 162, 28, 60, '#8a5a33'); line(34, 182, 62, 182, '#6f4525', 3); line(34, 202, 62, 202, '#6f4525', 3);
    rect(38, 166, 20, 13, '#ffffff'); rect(38, 186, 20, 13, '#fdf6d8'); rect(38, 206, 20, 13, '#f6d8e0');
    H.txt(g, '封筒', 48, 172.5, 6, '#8a5a33'); H.txt(g, '箱', 48, 192.5, 7, '#8a5a33'); H.txt(g, 'レターパック', 48, 212.5, 4.5, '#c73e3a');
    H.txt(g, '封筒・箱', 48, 232, 7, '#6b4a26');

    /* ===== Cân bưu kiện (11,5)-(12,5): bàn cân lớn + kiện hàng đang cân ===== */
    rect(354, 162, 60, 26, '#9aa5a8'); rect(354, 162, 60, 7, '#6d7a80');
    rect(366, 140, 36, 22, '#c9a876'); line(366, 151, 402, 151, '#a98a5e', 2); line(384, 140, 384, 162, '#a98a5e', 2); // kiện nâu
    rect(374, 144, 20, 8, '#ffffff'); H.txt(g, 'ベトナム', 384, 148, 5, '#c73e3a'); // nhãn gửi về Việt Nam
    g.fillStyle = '#2f3b4c'; H.rr(g, 420, 166, 18, 14, 2); H.txt(g, '12.4', 429, 171, 5.5, '#7ac74f'); H.txt(g, 'kg', 429, 177, 4.5, '#ffffff');
    H.txt(g, 'ゆうパック計量', 384, 198, 7, '#5a6a72');

    /* ===== Ghế chờ (5,6)-(7,6) ===== */
    for (i = 0; i < 3; i++) {
      var cxp = (5 + i) * T;
      g.fillStyle = 'rgba(120,60,40,0.20)'; H.rr(g, cxp + 3, 197, 26, 24, 4);
      g.fillStyle = '#c2703d'; H.rr(g, cxp + 3, 194, 26, 10, 3);
      g.fillStyle = '#d98a52'; H.rr(g, cxp + 3, 206, 26, 13, 3);
    }
    rect(238, 200, 16, 11, '#ffffff'); H.txt(g, '切手', 246, 205.5, 5.5, '#c73e3a'); // tập tem trên ghế

    /* ===== Bàn viết / dán tem (3,8)-(5,8) ===== */
    g.fillStyle = '#c9a876'; H.rr(g, 98, 260, 92, 20, 3); rect(96, 254, 4, 32, '#a98a5e'); rect(188, 254, 4, 32, '#a98a5e');
    rect(104, 264, 20, 12, '#ffffff'); rect(130, 264, 20, 12, '#ffffff');
    for (i = 0; i < 4; i++) rect(156 + (i % 2) * 8, 264 + Math.floor(i / 2) * 7, 6, 5, i % 2 ? '#e8a0b4' : '#7fb3d5'); // tem mẫu
    cir(182, 270, 4, '#7fb3d5'); // hồ dán
    H.txt(g, '記入台', 144, 291, 8, '#6b6250');

    /* ===== Hòm thư đỏ trong nhà (14,7) + bảng giá cước cạnh hòm — tương tác post-box ===== */
    var px = 14 * T;
    rect(px - 22, 198, 20, 44, '#ffffff'); g.strokeStyle = '#b08954'; g.lineWidth = 1.5; g.strokeRect(px - 22, 198, 20, 44); // bảng giá cước đứng cạnh
    H.txt(g, '料金表', px - 12, 205, 5.5, '#c73e3a');
    line(px - 19, 214, px - 5, 214, '#b5b5b5', 1); line(px - 19, 221, px - 5, 221, '#b5b5b5', 1); line(px - 19, 228, px - 5, 228, '#b5b5b5', 1); line(px - 19, 235, px - 5, 235, '#b5b5b5', 1);
    g.fillStyle = '#c73e3a'; H.rr(g, px + 3, 226, 26, 30, 3);
    rect(px + 3, 226, 26, 9, '#a52a26'); H.txt(g, '〒', px + 16, 230.5, 9, '#ffffff');
    rect(px + 7, 240, 18, 4, '#5d1613'); // khe bỏ thư
    H.txt(g, '郵便', px + 16, 250, 7, '#ffffff');
    H.txt(g, 'ポスト', px + 16, 266, 7, '#8a2a26');

    /* ===== Cây góc đông-nam (15,9) + bảng giờ làm việc cạnh cửa ===== */
    cir(496, 300, 8, '#5da464'); cir(490, 304, 6, '#4c8a54');
    g.fillStyle = '#a96a44'; H.rr(g, 488, 306, 16, 11, 2);
    rect(300, 292, 34, 22, '#ffffff'); g.strokeStyle = '#9aa5a8'; g.lineWidth = 1; g.strokeRect(300, 292, 34, 22);
    H.txt(g, '平日 9–17', 317, 300, 5.5, '#33302e'); H.txt(g, '土曜 9–12', 317, 308, 5.5, '#666666');

    /* ===== Cửa ra vào ô D (8,10) + thảm + kính hai bên ===== */
    rect(230, 292, 44, 20, '#9aa5a8'); H.txt(g, 'ありがとうございました', 252, 302, 5, '#eef2f2');
    rect(258, 320, 28, 32, '#bfe0ee'); g.strokeStyle = '#7a5a40'; g.lineWidth = 2; g.strokeRect(258, 320, 28, 32);
    line(272, 320, 272, 352, '#7a5a40', 2);
    rect(258, 320, 28, 7, '#c73e3a'); H.txt(g, '郵便局', 272, 323.5, 5, '#ffffff');
    rect(204, 322, 40, 24, '#e8e2cf'); rect(292, 322, 40, 24, '#e8e2cf');
  }
};
