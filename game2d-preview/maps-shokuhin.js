// maps-shokuhin.js — Nhà máy chế biến thực phẩm «大阪食品 工場» (bối cảnh 2D, đợt mở rộng ngành).
// Chuẩn thật: cửa gió + bồn rửa tay/khử trùng ở lối vào, tủ đồ, hai dây chuyền băng tải có
// khay thịt/rau, bàn đóng gói, kho lạnh có cửa dày + bảng ghi nhiệt độ, kệ nguyên liệu.
// Sàn trắng xanh sạch, vạch phân khu. Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['shokuhin'] = {
  id: 'shokuhin',
  label: '🥩 Nhà máy chế biến thực phẩm — 大阪食品',
  grid: [
    '######################',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#####D################'
  ],
  solidsExtra: [
    [1, 1, 3, 2],   // góc rửa tay + khử trùng + cửa gió ở lối vào
    [6, 1, 3, 1],   // tủ đồ nhân viên ロッカー
    [17, 1, 4, 3],  // kho lạnh 冷蔵庫 (cửa dày phía nam)
    [11, 1, 4, 1],  // kệ hộp rỗng + khay nhựa xếp chồng
    [2, 4, 8, 1],   // dây chuyền 1 (băng tải + khay)
    [2, 6, 8, 1],   // dây chuyền 2 (băng tải + thùng thành phẩm)
    [12, 4, 3, 2],  // bàn đóng gói 包裝
    [17, 6, 4, 2],  // kệ nguyên liệu + thùng gia vị
    [12, 8, 2, 1]   // bàn ghi nhiệt độ (tương tác) cạnh kho lạnh
  ],
  doors: { '5,11': { to: 'street', spawn: [17, 10] } },
  npcs: [
    { id: 'shokuhin-leader', name: 'Chị Tanaka — trưởng ca', sprite: 'staffF', tx: 11, ty: 5, behavior: 'stand', scene: 'shokuhin-leader', label: '💬 Chào trưởng ca Tanaka', range: 72 }
  ],
  objects: [
    { tx: 12, ty: 8, tw: 2, th: 1, interact: { scene: 'shokuhin-board', label: '🌡️ Xem bảng ghi nhiệt độ kho lạnh' } }
  ],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu tường bắc ===== */
    rect(0, -40, 22 * T, 34, '#e8f2f0'); g.strokeStyle = '#5d8f83'; g.lineWidth = 2; g.strokeRect(196, -36, 316, 26);
    H.txt(g, '大阪食品 工場', 354, -23, 16, '#2e6b5e');
    H.txt(g, '衛生第一', 640, -23, 10, '#c73e3a');

    /* ===== Sàn: gạch trắng xanh + vạch phân khu vàng ===== */
    rect(0, 0, 22 * T, 12 * T, '#dcebe8');
    var tx, ty, i;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 22; tx++) {
      g.strokeStyle = 'rgba(93,143,131,0.30)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1);
      if (H.hash(tx, ty) > 0.8) rect(tx * T + 8, ty * T + 20, 5, 2, 'rgba(93,143,131,0.20)');
    }
    rect(0, 3 * T - 2, 22 * T, 3, '#e8c33a'); rect(0, 8 * T - 2, 22 * T, 3, '#e8c33a');

    /* ===== Góc vệ sinh (1,1)-(3,2): bồn rửa tay, vòi khử trùng, gương, biển 手洗い ===== */
    rect(34, 34, 92, 60, '#eef7f5'); g.strokeStyle = '#8fb8ae'; g.lineWidth = 2; g.strokeRect(34, 34, 92, 60);
    rect(42, 44, 34, 20, '#cfe3de'); rect(46, 48, 26, 10, '#7fb3d5');
    line(59, 40, 59, 48, '#5d8f83', 3); cir(59, 40, 3, '#3d7be0');
    rect(86, 44, 14, 34, '#e0533d'); H.txt(g, '消毒', 93, 54, 7, '#ffffff');
    rect(106, 40, 16, 22, '#f4f8f7'); H.txt(g, '手洗い', 80, 88, 7, '#2e6b5e');
    H.txt(g, 'エアシャワー →', 80, 30, 7, '#5d8f83');

    /* ===== Tủ đồ (6,1)-(8,1) ===== */
    rect(194, 34, 92, 28, '#9fb6bd');
    for (i = 0; i < 3; i++) { line(224 + i * 30, 34, 224 + i * 30, 62, '#7d929a', 2); cir(216 + i * 30, 48, 2, '#4c565e'); }

    /* ===== Kệ hộp rỗng + khay (11,1)-(14,1) ===== */
    rect(354, 34, 124, 28, '#b9cdd2');
    for (i = 0; i < 4; i++) rect(358 + i * 30, 40, 24, 9, ['#e8a13a', '#3d7be0', '#39a05a', '#e0533d'][i]);
    for (i = 0; i < 4; i++) rect(358 + i * 30, 52, 24, 7, '#dfe9ec');

    /* ===== Kho lạnh (17,1)-(20,3): thân thép, cửa dày, tay nắm lớn, đồng hồ nhiệt ===== */
    rect(546, 34, 124, 92, '#aebfca'); rect(546, 34, 124, 10, '#8fa5b3');
    rect(566, 52, 84, 74, '#c8d6de'); g.strokeStyle = '#7d929a'; g.lineWidth = 3; g.strokeRect(566, 52, 84, 74);
    line(650, 60, 650, 118, '#5d707c', 5); cir(644, 88, 4, '#33373c');
    cir(560, 46, 8, '#26303c'); H.txt(g, '-18', 560, 46, 6, '#7fe0a8');
    H.txt(g, '冷蔵庫', 608, 40, 9, '#31517d');
    for (i = 0; i < 3; i++) rect(552 + i * 40, 104, 30, 16, 'rgba(255,255,255,0.35)');  // hơi lạnh đọng trên cửa

    /* ===== Hai dây chuyền băng tải (hàng 4 và 6) ===== */
    [4, 6].forEach(function (ry, li) {
      var y = ry * T;
      rect(66, y + 4, 252, 24, '#6d757e'); rect(66, y + 8, 252, 4, '#8f979e');
      for (i = 0; i < 7; i++) line(76 + i * 38, y + 4, 76 + i * 38, y + 28, '#565d63', 2);
      for (i = 0; i < 4; i++) {  // khay hàng trên băng
        rect(80 + i * 62, y + 9, 34, 14, li ? '#dfe9ec' : '#f2d5c4');
        cir(90 + i * 62, y + 16, 4, li ? '#7a9a4d' : '#c95d5d'); cir(100 + i * 62, y + 16, 4, li ? '#5da464' : '#e88ca0');
      }
      H.txt(g, li ? 'ライン2' : 'ライン1', 192, y - 5, 8, '#2e6b5e');
    });
    // Đèn báo chuyền + biển 帽子・マスク着用
    cir(330, 4 * T - 8, 5, '#39a05a'); rect(340, 4 * T - 14, 74, 13, '#fff7dd'); H.txt(g, '帽子・マスク着用', 377, 4 * T - 7, 6, '#8a5a18');

    /* ===== Bàn đóng gói (12,4)-(14,5): cuộn màng bọc, cân, thùng carton ===== */
    rect(386, 130, 92, 60, '#c8b28a'); rect(390, 134, 84, 8, '#e5d3a8');
    cir(410, 162, 10, '#eef1f3'); ring2(410, 162, 10);
    function ring2(cx, cy, r) { g.strokeStyle = '#9aa5ad'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    rect(436, 148, 18, 14, '#565d63'); H.txt(g, '1.0', 445, 155, 6, '#7fe0a8');
    rect(392, 168, 26, 18, '#c9a06a'); rect(424, 172, 30, 14, '#b08954');
    H.txt(g, '包裝', 432, 126, 8, '#5a4632');

    /* ===== Kệ nguyên liệu (17,6)-(20,7): thùng gia vị, bao bột ===== */
    rect(546, 194, 124, 60, '#8a6f52');
    for (i = 0; i < 3; i++) { cir(566 + i * 38, 214, 12, ['#e8a13a', '#c95d5d', '#7a9a4d'][i]); H.txt(g, ['塩', '糖', '油'][i], 566 + i * 38, 214, 8, '#ffffff'); }
    rect(552, 232, 34, 18, '#e8e2d4'); rect(594, 232, 34, 18, '#dcd4c2'); rect(636, 232, 28, 18, '#e8e2d4');
    H.txt(g, '原材料', 608, 190, 8, '#5a4632');

    /* ===== Bàn ghi nhiệt độ (12,8)-(13,8) — điểm tương tác ===== */
    rect(386, 258, 60, 28, '#f4f8f7'); g.strokeStyle = '#5d8f83'; g.lineWidth = 2; g.strokeRect(386, 258, 60, 28);
    H.txt(g, '温度記録', 416, 266, 7, '#2e6b5e');
    for (i = 0; i < 3; i++) { line(392, 274 + i * 4, 440, 274 + i * 4, '#b9cdd2', 1); }
    H.txt(g, '-18.2℃', 416, 284, 6, '#c73e3a');

    /* ===== Cửa ra vào ô D (5,11): sàn dính + biển 履物交換 ===== */
    rect(130, 322, 64, 26, '#9fc6d6');
    for (i = 0; i < 6; i++) rect(136 + (i % 3) * 20, 328 + Math.floor(i / 3) * 10, 12, 6, i % 2 ? '#e0533d' : '#3d7be0');  // dép trong xưởng xếp ở genkan
    rect(202, 320, 74, 16, '#2e6b5e'); H.txt(g, '履物交換', 239, 328, 8, '#ffffff');
  }
};
