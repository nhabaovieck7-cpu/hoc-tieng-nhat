// maps-nogyo.js — Nông nghiệp / nhà kính «富良野農園» (bối cảnh 2D, đợt mở rộng ngành).
// Chuẩn thật: nhà kính vòm phủ nilon (ビニールハウス), luống cà chua + luống dâu có dây tưới
// nhỏ giọt, khu đóng hàng xuất xưởng (thùng carton, cân, bàn phân loại), chòi nghỉ + văn
// phòng nhỏ, bảng lịch xuất hàng. Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['nogyo'] = {
  id: 'nogyo',
  label: '🍅 Nông trại — 富良野農園 (nhà kính)',
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
    [2, 2, 4, 1], [8, 2, 4, 1], [14, 2, 4, 1],   // luống cà chua hàng trên
    [2, 5, 4, 1], [8, 5, 4, 1], [14, 5, 4, 1],   // luống dâu hàng dưới
    [1, 8, 3, 2],   // chòi văn phòng + kho dụng cụ
    [16, 8, 5, 2],  // khu đóng hàng 出荷場 (bàn + thùng + cân)
    [16, 7, 2, 1]   // bảng lịch xuất hàng (tương tác) ở mép khu đóng hàng
  ],
  doors: { '5,11': { to: 'street', spawn: [27, 10] } },
  npcs: [
    { id: 'nogyo-boss', name: 'Bác Yamada — chủ nông trại', sprite: 'elder', tx: 10, ty: 7, behavior: 'stand', scene: 'nogyo-boss', label: '💬 Chào bác Yamada', range: 72 }
  ],
  objects: [
    { tx: 16, ty: 7, tw: 2, th: 1, interact: { scene: 'nogyo-board', label: '🚚 Xem bảng lịch xuất hàng' } }
  ],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Mái vòm nhà kính (vùng y âm + khung vòm phủ toàn bản đồ) ===== */
    rect(0, -40, 22 * T, 40, '#dceefb');
    H.txt(g, '富良野農園', 120, -24, 14, '#3d7a3a');
    g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 3;
    for (var a = 0; a < 6; a++) { g.beginPath(); g.arc(352, 400, 340 - a * 6, Math.PI, 2 * Math.PI); g.stroke(); }
    line(32, 30, 672, 30, 'rgba(255,255,255,0.6)', 3);

    /* ===== Đất nâu + lối đi giữa các luống ===== */
    rect(0, 0, 22 * T, 12 * T, '#8a6a48');
    var tx, ty, i, j;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 22; tx++) {
      if (H.hash(tx * 7, ty * 3) > 0.6) rect(tx * T + 6, ty * T + 10, 7, 3, 'rgba(60,40,22,0.30)');
    }
    rect(0, 3 * T + 10, 22 * T, 12, '#a5825e'); rect(0, 6 * T + 10, 22 * T, 12, '#a5825e');  // lối đi ngang
    rect(6 * T + 10, 0, 12, 12 * T, '#a5825e');                                            // lối đi dọc

    /* ===== Luống cây: hàng trên cà chua (đỏ), hàng dưới dâu (lá + quả nhỏ) ===== */
    function bed(bx, by, fruit) {
      var x = bx * T, y = by * T;
      rect(x + 2, y + 6, 4 * T - 4, 20, '#6d5138');                                        // đất luống vun cao
      line(x + 4, y + 10, x + 4 * T - 4, y + 10, '#3d7be0', 2);                            // ống tưới nhỏ giọt
      for (j = 0; j < 5; j++) {
        var cx = x + 16 + j * 24;
        cir(cx, y + 20, 9, '#4c8a3f'); cir(cx - 6, y + 24, 6, '#5da44c'); cir(cx + 6, y + 24, 6, '#447a36');
        cir(cx, y + 14, fruit === 'tomato' ? 4.5 : 3, fruit === 'tomato' ? '#e0533d' : '#e88ca0');
        if (fruit === 'tomato') cir(cx + 7, y + 18, 3.5, '#e88c3a');
      }
      line(x + 6, y + 2, x + 6, y + 30, '#8a8f94', 2); line(x + 4 * T - 6, y + 2, x + 4 * T - 6, y + 30, '#8a8f94', 2); // cọc đỡ
    }
    bed(2, 2, 'tomato'); bed(8, 2, 'tomato'); bed(14, 2, 'tomato');
    bed(2, 5, 'berry'); bed(8, 5, 'berry'); bed(14, 5, 'berry');
    H.txt(g, 'トマト', 128, 58, 8, '#ffffff'); H.txt(g, 'いちご', 128, 154, 8, '#ffffff');

    /* ===== Chòi văn phòng + kho dụng cụ (1,8)-(3,9) ===== */
    rect(34, 258, 92, 60, '#e8e2d4'); rect(34, 258, 92, 8, '#b08954');
    rect(44, 272, 24, 20, '#9fc6d6'); rect(78, 272, 16, 30, '#6d5230');
    H.txt(g, '事務所', 80, 254, 8, '#5a4632');
    line(104, 292, 120, 292, '#8a8f94', 3); cir(118, 286, 4, '#c73e3a');                  // cuốc dựng cạnh chòi

    /* ===== Bảng lịch xuất hàng (16,7)-(17,7) — điểm tương tác ===== */
    rect(514, 226, 60, 28, '#f7f3e4'); g.strokeStyle = '#8a6f47'; g.lineWidth = 2; g.strokeRect(514, 226, 60, 28);
    H.txt(g, '出荷予定', 544, 234, 7, '#8a5a18');
    for (i = 0; i < 3; i++) line(520, 242 + i * 4, 568, 242 + i * 4, '#c9b894', 1);

    /* ===== Khu đóng hàng (16,8)-(20,9): bàn phân loại, cân, thùng carton, xe kéo ===== */
    rect(514, 258, 156, 60, '#c9b894');
    rect(520, 264, 70, 22, '#a5825e');
    for (i = 0; i < 4; i++) cir(532 + i * 17, 275, 5, '#e0533d');
    rect(600, 262, 30, 18, '#565d63'); H.txt(g, 'kg', 615, 271, 7, '#7fe0a8');
    rect(520, 292, 30, 22, '#c9a06a'); rect(556, 292, 30, 22, '#b08954'); rect(592, 292, 30, 22, '#c9a06a');
    H.txt(g, '出荷', 540, 303, 7, '#5a4632');
    line(640, 292, 640, 314, '#55504a', 3); rect(626, 288, 28, 8, '#7a9a4d');              // xe kéo tay
    H.txt(g, '出荷場', 592, 254, 8, '#5a4632');

    /* ===== Cửa nhà kính ở ô D (5,11): khung cửa nilon + biển ハウス1号 ===== */
    rect(130, 322, 64, 26, '#e8eef2'); g.strokeStyle = '#8fa5b3'; g.lineWidth = 2; g.strokeRect(130, 322, 64, 26);
    line(162, 322, 162, 348, '#8fa5b3', 2);
    rect(202, 320, 74, 16, '#3d7a3a'); H.txt(g, 'ハウス 1号棟', 239, 328, 8, '#ffffff');
  }
};
