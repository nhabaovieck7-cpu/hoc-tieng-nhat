// maps-koban.js — Đồn cảnh sát hư cấu «上野交番» (bối cảnh 2D, đợt duyệt).
// Dữ liệu thuần + paint theo hợp đồng maps-core.js. Không trạng thái chạy.
// Quầy trực chừa lối vòng hai đầu (x1-2 và x10-12 ở hàng y=3) để khu sau quầy
// không bị cô lập; ô cảnh sát (7,2) cố ý KHÔNG nằm trong solidsExtra.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['koban'] = {
  id: 'koban',
  label: '🚓 Đồn cảnh sát (Koban)',
  grid: [
    '##############',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#######D######'
  ],
  solidsExtra: [
    [1, 1, 3, 1],   // bản đồ khu vực treo tường (tây-bắc)
    [10, 1, 3, 1],  // bảng thông báo (đông-bắc)
    [5, 1, 2, 1],   // bàn làm việc sau quầy
    [3, 3, 7, 1],   // quầy trực (chừa lối vòng x1-2 và x10-12)
    [1, 5, 2, 1],   // kệ / hộp đồ nhặt được 遺失物
    [4, 6, 3, 1],   // ghế chờ trước quầy
    [12, 5, 1, 2],  // xe đạp tuần tra dựng sát tường đông
    [1, 8, 1, 1]    // chậu cây / thùng hồ sơ góc tây-nam
  ],
  doors: { '7,9': { to: 'shotengai', spawn: [4, 4] } },
  npcs: [
    { id: 'koban-police', name: 'Cảnh sát trực', sprite: 'guard', tx: 7, ty: 2, behavior: 'stand', scene: 'koban', label: '💬 Hỏi cảnh sát', range: 96 }
  ],
  objects: [
    { tx: 1, ty: 1, tw: 3, th: 1, interact: { scene: 'koban-board', label: '🗺️ Xem bản đồ khu vực / bảng thông báo' } }
  ],
  spawnDefault: [7, 7],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Sàn gạch sáng + tường đồn ===== */
    rect(0, -40, 14 * T, 10 * T + 40, '#d9d2c0');
    rect(32, 32, 12 * T, 8 * T, '#cfd6d8');
    var tx, ty, i;
    for (ty = 1; ty <= 8; ty++) for (tx = 1; tx <= 12; tx++) {
      if ((tx + ty) % 2 === 0) rect(tx * T, ty * T, T, T, 'rgba(255,255,255,0.22)');
      if (H.hash(tx * 5, ty) > 0.88) rect(tx * T + 5, ty * T + 22, 10, 2, 'rgba(90,100,110,0.18)');
    }
    for (i = 1; i < 12; i++) line(32 + i * T, 32, 32 + i * T, 288, 'rgba(140,150,155,0.30)', 1);
    for (i = 1; i < 8; i++) line(32, 32 + i * T, 416, 32 + i * T, 'rgba(140,150,155,0.30)', 1);
    rect(0, 0, 14 * T, 32, '#eef0ee'); rect(0, 0, 32, 10 * T, '#e6e8e4');
    rect(416, 0, 32, 10 * T, '#e6e8e4'); rect(0, 288, 14 * T, 32, '#e6e8e4');
    line(32, 32, 416, 32, '#a8b0ae', 2);

    /* ===== Biển tên đồn (vùng y âm) + đèn đỏ交番 + quốc kỳ nhỏ ===== */
    line(120, -40, 120, -22, '#8a9299', 2); line(328, -40, 328, -22, '#8a9299', 2);
    g.fillStyle = '#20344d'; H.rr(g, 128, -36, 192, 28, 4);
    H.txt(g, '上野交番', 224, -22, 16, '#ffffff');
    g.fillStyle = '#c73e3a'; H.rr(g, 40, -30, 52, 20, 4); H.txt(g, '交番', 66, -20, 11, '#ffffff');
    cir(66, -34, 4, '#ff5a4d'); // đèn đỏ đặc trưng trên biển
    rect(356, -28, 30, 20, '#ffffff'); g.strokeStyle = '#b9bebe'; g.lineWidth = 1; g.strokeRect(356, -28, 30, 20);
    cir(371, -18, 5, '#c73e3a');
    H.txt(g, 'KOBAN', 224, 16, 9, '#20344d');
    rect(176, 6, 96, 20, '#f4f6f6'); g.strokeStyle = '#9aa5a8'; g.lineWidth = 1; g.strokeRect(176, 6, 96, 20);

    /* ===== Bản đồ khu vực (1,1)-(3,1) — điểm tương tác koban-board ===== */
    rect(34, 34, 92, 28, '#fdfdf8'); g.strokeStyle = '#5d7a68'; g.lineWidth = 2; g.strokeRect(34, 34, 92, 28);
    rect(38, 38, 54, 20, '#cfe3c8'); // mảng xanh công viên / khu dân cư
    line(38, 48, 92, 48, '#e8e3a1', 3); line(58, 38, 58, 58, '#e8e3a1', 2); line(76, 38, 76, 58, '#ffffff', 2);
    rect(96, 38, 26, 9, '#f6d8e0'); rect(96, 50, 26, 8, '#d8e8f5');
    cir(66, 48, 3.5, '#c73e3a'); ring(66, 48, 5.5, '#c73e3a', 1.5);
    H.txt(g, '管内図', 80, 28, 7, '#3c5a4a');
    cir(40, 37, 1.6, '#c73e3a'); cir(120, 37, 1.6, '#4a7fb5');

    /* ===== Bảng thông báo (10,1)-(12,1) ===== */
    rect(322, 34, 92, 28, '#3f6152'); g.strokeStyle = '#2e4a3e'; g.lineWidth = 2; g.strokeRect(322, 34, 92, 28);
    rect(326, 38, 26, 20, '#ffffff'); rect(356, 38, 26, 20, '#fdf6d8'); rect(386, 38, 24, 20, '#ffffff');
    line(329, 44, 349, 44, '#b08954', 1); line(329, 50, 349, 50, '#b08954', 1);
    line(359, 44, 379, 44, '#b08954', 1); line(389, 44, 407, 44, '#c73e3a', 1); line(389, 50, 407, 50, '#b08954', 1);
    cir(339, 40, 1.7, '#c73e3a'); cir(369, 40, 1.7, '#4a7fb5'); cir(398, 40, 1.7, '#e9c44d');
    H.txt(g, 'お知らせ', 368, 28, 7, '#3c5a4a');

    /* ===== Bàn làm việc sau quầy (5,1)-(6,1) + ghế cảnh sát ở ô (7,2) ===== */
    rect(162, 36, 60, 22, '#8a97a5'); rect(166, 40, 22, 12, '#2f3b4c'); rect(168, 42, 18, 8, '#a8d8f0');
    rect(196, 42, 20, 10, '#f4f4f4'); line(199, 46, 213, 46, '#b5b5b5', 1); line(199, 50, 213, 50, '#b5b5b5', 1);
    g.fillStyle = '#31435c'; H.rr(g, 214, 68, 28, 16, 3); // lưng ghế của cảnh sát trực
    rect(208, 84, 40, 6, '#f4f4f4'); // giấy tờ / sổ trực trên sàn trước ghế
    H.txt(g, '勤務日誌', 228, 87, 5, '#888888');
    cir(150, 44, 5, '#ffd94d'); ring(150, 44, 5, '#c9a227', 1); // đèn bàn / chuông trực
    rect(146, 50, 8, 6, '#8a6f47');

    /* ===== Quầy trực (3,3)-(9,3): mặt gỗ + kính + biển受付 ===== */
    rect(96, 96, 224, 32, '#f2ede2'); rect(96, 110, 224, 18, '#cbbfa5');
    rect(96, 96, 224, 5, '#ffffff'); rect(96, 124, 224, 4, '#8a7a5c');
    for (i = 0; i < 4; i++) line(96 + i * 56 + 28, 110, 96 + i * 56 + 28, 128, '#a89a7c', 1.5);
    g.fillStyle = '#20344d'; H.rr(g, 176, 78, 64, 15, 3); H.txt(g, '受付・相談', 208, 85.5, 8, '#ffffff');
    rect(120, 102, 34, 12, '#ffffff'); H.txt(g, '遺失届', 137, 108, 7, '#20344d'); // mẫu đơn khai mất đồ trên quầy
    rect(262, 102, 34, 12, '#fdf6d8'); H.txt(g, '道案内', 279, 108, 7, '#6b5a2e');
    cir(104, 104, 3, '#c9a227'); cir(312, 104, 3, '#c9a227');

    /* ===== Kệ đồ nhặt được (1,5)-(2,5): hộp trong suốt + ô / ví / chìa khóa ===== */
    rect(34, 162, 60, 28, '#aeb8c2'); rect(34, 162, 60, 8, '#20344d'); H.txt(g, '遺失物', 64, 166, 7, '#ffffff');
    rect(38, 174, 16, 13, 'rgba(200,230,245,0.85)'); rect(58, 174, 16, 13, 'rgba(200,230,245,0.85)'); rect(76, 174, 14, 13, 'rgba(200,230,245,0.85)');
    line(44, 176, 50, 184, '#d96a86', 2); cir(63, 180, 3, '#8a5a33'); ring(82, 180, 3, '#c9a227', 1.5);
    H.txt(g, '落とし物', 64, 200, 7, '#5a6a72');

    /* ===== Ghế chờ (4,6)-(6,6) ===== */
    for (i = 0; i < 3; i++) {
      var cxp = (4 + i) * T;
      g.fillStyle = 'rgba(40,60,80,0.20)'; H.rr(g, cxp + 3, 197, 26, 24, 4);
      g.fillStyle = '#31517d'; H.rr(g, cxp + 3, 194, 26, 10, 3);
      g.fillStyle = '#3d6396'; H.rr(g, cxp + 3, 206, 26, 13, 3);
    }
    rect(236, 200, 16, 11, '#ffffff'); H.txt(g, '番号札', 244, 205.5, 5, '#888888'); // thẻ số chờ trên ghế trống

    /* ===== Xe đạp tuần tra (12,5)-(12,6): khung trắng, giỏ trước, biển POLICE ===== */
    var bx = 12 * T, by = 5 * T;
    ring(bx + 16, by + 52, 9, '#2e2a26', 2.5); ring(bx + 16, by + 88, 9, '#2e2a26', 2.5);
    line(bx + 16, by + 52, bx + 16, by + 88, '#eef0ee', 3); line(bx + 16, by + 62, bx + 24, by + 72, '#eef0ee', 2);
    line(bx + 10, by + 46, bx + 22, by + 46, '#2e2a26', 2.5); cir(bx + 16, by + 42, 3, '#c73e3a');
    rect(bx + 6, by + 28, 20, 13, '#d8dde2'); g.strokeStyle = '#8a9299'; g.lineWidth = 1.5; g.strokeRect(bx + 6, by + 28, 20, 13);
    g.fillStyle = '#20344d'; H.rr(g, bx + 2, by + 6, 28, 13, 2); H.txt(g, '警察', bx + 16, by + 12.5, 8, '#ffffff');
    H.txt(g, 'パトロール自転車', bx + 16, by + 108, 6, '#5a6a72');

    /* ===== Góc tây-nam (1,8): thùng hồ sơ + chậu cây ===== */
    rect(36, 258, 24, 28, '#7a8a99'); rect(36, 258, 24, 8, '#20344d'); H.txt(g, '書類', 48, 262, 6, '#ffffff');
    line(40, 272, 56, 272, '#f4f4f4', 2); line(40, 278, 56, 278, '#f4f4f4', 2);
    cir(88, 268, 8, '#5da464'); cir(82, 272, 6, '#4c8a54'); g.fillStyle = '#a96a44'; H.rr(g, 80, 274, 16, 11, 2);

    /* ===== Đồng hồ tường + poster phòng chống tội phạm ===== */
    cir(304, 16, 11, '#ffffff'); ring(304, 16, 11, '#20344d', 2);
    line(304, 16, 304, 9, '#33302e', 2); line(304, 16, 310, 18, '#33302e', 2); cir(304, 16, 1.6, '#33302e');
    rect(28, 104, 24, 34, '#ffffff'); rect(28, 104, 24, 8, '#c73e3a'); H.txt(g, '防犯', 40, 108, 7, '#ffffff');
    H.txt(g, '110番', 40, 124, 7, '#20344d');

    /* ===== Cửa ra vào ô D (7,9) + thảm + bảng giờ trực ===== */
    rect(196, 292, 40, 22, '#9aa5a8'); H.txt(g, 'いらっしゃいませ', 216, 303, 5.5, '#eef2f2');
    rect(226, 288, 28, 32, '#31517d'); g.strokeStyle = '#20344d'; g.lineWidth = 2; g.strokeRect(226, 288, 28, 32);
    rect(230, 292, 20, 18, '#bfe0ee'); line(240, 292, 240, 310, '#20344d', 2); cir(246, 302, 2.2, '#ffd94d');
    rect(258, 292, 30, 20, '#ffffff'); g.strokeStyle = '#9aa5a8'; g.lineWidth = 1; g.strokeRect(258, 292, 30, 20);
    H.txt(g, '24時間', 273, 299, 6, '#c73e3a'); H.txt(g, '対応', 273, 307, 6, '#33302e');
  }
};
