// maps-kaigo.js — Nơi làm kaigo «デイサービス神戸» (bối cảnh 2D, đợt duyệt).
// Hai khu trong một grid mở: phòng sinh hoạt lớn phía trên + sảnh/genkan phía dưới,
// nối bằng khoảng mở ở giữa (không doors nội bộ). Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['kaigo'] = {
  id: 'kaigo',
  label: '🧓 Nơi làm kaigo — デイサービス神戸',
  grid: [
    '########################',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#####D##################'
  ],
  solidsExtra: [
    [2, 1, 3, 1],   // TV + kệ TV ở tường bắc phòng sinh hoạt
    [7, 1, 2, 1],   // kệ thấp + cây xanh cạnh TV
    [18, 1, 4, 2],  // khu tập vận động: thảm + thanh song song
    [3, 3, 3, 2],   // cụm bàn tròn 1 + ghế
    [14, 3, 3, 2],  // cụm bàn tròn 2 + ghế
    [19, 4, 2, 1],  // chỗ để xe lăn
    [8, 6, 4, 1],   // sofa dài giữa phòng
    [2, 8, 3, 1],   // bàn tiếp tân ở sảnh
    [1, 10, 3, 1],  // tủ giày genkan
    [17, 9, 3, 1],  // bảng lịch hoạt động tuần (tương tác)
    [12, 10, 3, 1]  // ghế băng chờ ở sảnh
  ],
  doors: { '5,11': { to: 'shotengai', spawn: [39, 4] } },
  npcs: [
    { id: 'kaigo-mai', name: 'Chị Mai', sprite: 'staffF', tx: 10, ty: 4, behavior: 'stand', scene: 'kaigo-mai', label: '💬 Nói chuyện với chị Mai', range: 72 }
  ],
  objects: [
    { tx: 17, ty: 9, tw: 3, th: 1, interact: { scene: 'kaigo-board', label: '🗓️ Xem lịch hoạt động tuần' } }
    ,{ tx: 2, ty: 8, tw: 3, th: 1, interact: { scene: 'listen-kaigo', label: '🎧 Loa sảnh — nghe hướng dẫn của trung tâm' } }
  ],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Nền: phòng sinh hoạt (trên) sàn gỗ sáng + sảnh (dưới) gạch ===== */
    rect(0, -40, 24 * T, 12 * T + 40, '#ddd2ba');
    rect(32, 32, 22 * T, 6 * T + 16, '#d3ac72');                    // sàn gỗ phòng sinh hoạt hàng 1–6
    var tx, ty, i;
    for (ty = 1; ty <= 6; ty++) for (tx = 1; tx <= 22; tx++) {
      if (H.hash(tx, ty) > 0.6) rect(tx * T, ty * T, T, T, 'rgba(255,240,205,0.08)');
      line(32, 32 + ty * 24 - 24, 736, 32 + ty * 24 - 24, 'rgba(150,105,58,0.22)', 1);
    }
    rect(32, 7 * T, 22 * T, 32, '#e8dfc8');                          // dải chuyển tiếp giữa hai khu
    rect(32, 8 * T, 22 * T, 3 * T, '#cfc8b8');                       // gạch sảnh hàng 8–10
    for (ty = 8; ty <= 10; ty++) for (tx = 1; tx <= 22; tx++) {
      g.strokeStyle = 'rgba(110,105,92,0.35)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1);
      if (H.hash(tx * 5, ty * 3) > 0.75) rect(tx * T + 7, ty * T + 18, 4, 2, 'rgba(90,85,70,0.18)');
    }
    // Tường bao
    rect(0, 0, 24 * T, 32, '#efe6d0'); rect(0, 0, 32, 12 * T, '#e6dbc4');
    rect(736, 0, 32, 12 * T, '#e6dbc4'); rect(0, 352, 24 * T, 32, '#e6dbc4');
    line(32, 32, 736, 32, '#b8ab90', 2);

    /* ===== Biển hiệu + cửa sổ lớn tường bắc (vùng y âm) ===== */
    rect(250, -38, 268, 30, '#fff8e8'); g.strokeStyle = '#8a6f47'; g.lineWidth = 2; g.strokeRect(250, -38, 268, 30);
    H.txt(g, 'デイサービス神戸', 384, -23, 17, '#5a4632');
    rect(60, -34, 110, 26, '#bfe0ee'); rect(598, -34, 110, 26, '#bfe0ee');
    line(115, -34, 115, -8, '#f7f4ec', 3); line(653, -34, 653, -8, '#f7f4ec', 3);
    cir(86, -20, 7, '#ffd94d'); cir(630, -18, 5, '#e88ca0'); cir(676, -24, 5, '#7fb3d5');

    /* ===== TV (2,1)-(4,1) + kệ thấp & cây (7,1)-(8,1) ===== */
    rect(66, 34, 92, 26, '#8a5a33'); rect(72, 38, 80, 8, '#6f4525');
    rect(82, 4, 60, 30, '#26303c'); rect(86, 7, 52, 24, '#9fd0e8');
    line(92, 26, 116, 10, 'rgba(255,255,255,0.6)', 3); H.txt(g, '体操', 112, 20, 9, '#31517d');
    rect(226, 36, 60, 24, '#a97c50'); cir(246, 30, 9, '#5da464'); cir(262, 27, 11, '#4c8a54'); cir(276, 32, 7, '#679a4c');
    rect(240, 38, 10, 12, '#c95d5d'); rect(258, 40, 12, 10, '#4a7fb5');

    /* ===== Khu tập vận động (18,1)-(21,2): thảm + thanh song song + bóng ===== */
    g.fillStyle = '#7fb3a5'; H.rr(g, 578, 34, 124, 60, 6);
    g.fillStyle = '#8fc0b2'; H.rr(g, 584, 40, 112, 48, 5);
    line(592, 58, 688, 58, '#5d8f83', 4); line(592, 78, 688, 78, '#5d8f83', 4);
    line(596, 50, 596, 86, '#8a6f47', 3); line(684, 50, 684, 86, '#8a6f47', 3);
    cir(614, 48, 6, '#e0533d'); cir(664, 84, 5, '#e9c44d');
    H.txt(g, '運動', 640, 44, 8, '#ffffff');

    /* ===== Hai cụm bàn tròn + ghế (3,3) & (14,3) ===== */
    [[4, 3], [15, 3]].forEach(function (b) {
      var cx = b[0] * T + 48, cy = b[1] * T + 32;
      cir(cx, cy, 27, 'rgba(90,60,30,0.18)');
      cir(cx, cy, 25, '#f4efe2'); ring(cx, cy, 25, '#b08954', 3);
      cir(cx - 8, cy - 4, 5, '#e88ca0'); cir(cx + 9, cy + 6, 5, '#ffd9a0');
      rect(cx - 3, cy - 12, 7, 9, '#ffffff');
      [[-38, 0], [38, 0], [0, -38], [0, 38]].forEach(function (o) {
        g.fillStyle = '#5da4b8'; H.rr(g, cx + o[0] - 9, cy + o[1] - 9, 18, 18, 4);
      });
    });
    /* ===== Xe lăn (19,4)-(20,4) ===== */
    ring(624, 146, 13, '#4c565e', 3); ring(656, 146, 13, '#4c565e', 3);
    cir(624, 146, 3, '#222'); cir(656, 146, 3, '#222');
    rect(622, 122, 36, 20, '#7a9aa5'); rect(622, 112, 36, 12, '#5d7f8c');
    line(618, 118, 610, 132, '#4c565e', 3); line(662, 118, 670, 132, '#4c565e', 3);

    /* ===== Sofa dài (8,6)-(11,6) + thảm giữa phòng ===== */
    g.fillStyle = '#e7dcc4'; H.rr(g, 240, 168, 240, 74, 10);
    g.fillStyle = '#c95d5d'; H.rr(g, 258, 196, 124, 28, 6);
    g.fillStyle = '#d96a6a'; H.rr(g, 262, 200, 36, 20, 4); H.rr(g, 302, 200, 36, 20, 4); H.rr(g, 342, 200, 36, 20, 4);
    rect(258, 188, 124, 10, '#a84a4a');
    cir(430, 206, 8, '#5da464'); rect(424, 210, 12, 9, '#b08954');

    /* ===== Vách ngăn thấp giữa hai khu — chừa khoảng mở ở giữa ===== */
    rect(32, 7 * T + 4, 7 * T, 8, '#b08954'); rect(17 * T, 7 * T + 4, 6 * T, 8, '#b08954');
    H.txt(g, '玄関・受付', 128, 7 * T + 8, 8, '#ffffff');

    /* ===== Sảnh: bàn tiếp tân (2,8) + tủ giày (1,10) + ghế chờ (12,10) ===== */
    rect(66, 258, 92, 28, '#8a5a33'); rect(70, 262, 84, 9, '#f4efe2');
    H.txt(g, '受付', 112, 266, 8, '#5a4632'); cir(146, 280, 3, '#ffd94d');
    rect(34, 322, 92, 28, '#9a6a3f'); line(66, 322, 66, 350, '#7a5230', 2); line(98, 322, 98, 350, '#7a5230', 2);
    for (i = 0; i < 6; i++) { cir(44 + (i % 3) * 32, 332 + Math.floor(i / 3) * 11, 4, i % 2 ? '#4a7fb5' : '#3a3230'); }
    g.fillStyle = '#5da4b8'; H.rr(g, 386, 324, 92, 24, 4);
    rect(390, 328, 26, 16, '#4c8a9c'); rect(420, 328, 26, 16, '#4c8a9c');
    /* Đồng hồ + tranh tường ở sảnh */
    cir(480, 272, 11, '#ffffff'); ring(480, 272, 11, '#6b5a44', 2);
    line(480, 272, 480, 265, '#33302e', 2); line(480, 272, 486, 274, '#33302e', 2);

    /* ===== Bảng lịch hoạt động tuần (17,9)-(19,9) — điểm tương tác ===== */
    rect(546, 290, 92, 30, '#3f6152'); g.strokeStyle = '#2e4a3e'; g.lineWidth = 2; g.strokeRect(546, 290, 92, 30);
    H.txt(g, '今週の予定', 592, 297, 8, '#ffffff');
    for (i = 0; i < 5; i++) rect(551 + i * 17, 304, 14, 12, i === 2 ? '#fdf6d8' : '#ffffff');
    H.txt(g, 'レク', 558, 310, 5, '#5a4632'); H.txt(g, '入浴', 592, 310, 5, '#31517d'); H.txt(g, '体操', 626, 310, 5, '#b03a30');

    /* ===== Cửa kính sảnh nhìn ra xe đưa đón (tường nam, phía đông genkan) ===== */
    rect(288, 354, 190, 28, '#a8d4ea'); g.strokeStyle = '#f7f4ec'; g.lineWidth = 3; g.strokeRect(288, 354, 190, 28);
    line(352, 354, 352, 382, '#f7f4ec', 3); line(416, 354, 416, 382, '#f7f4ec', 3);
    g.fillStyle = '#f4f4f4'; H.rr(g, 372, 360, 74, 18, 5);            // xe đưa đón trắng sau kính
    rect(382, 364, 12, 7, '#7fb3d5'); rect(398, 364, 12, 7, '#7fb3d5'); rect(414, 364, 12, 7, '#7fb3d5');
    cir(388, 379, 5, '#33373c'); cir(430, 379, 5, '#33373c');
    H.txt(g, '送迎車', 409, 357, 6, '#31517d');
    rect(500, 362, 120, 15, '#e8dfc8'); H.txt(g, 'お迎え 9:00', 560, 369, 8, '#5a4632');

    /* ===== Genkan + cửa ra vào ở ô D (5,11) ===== */
    rect(128, 320, 64, 32, '#9aa0a3');
    for (i = 0; i < 8; i++) rect(132 + H.hash(i, 11) * 52, 324 + H.hash(11, i) * 22, 2, 2, 'rgba(60,64,68,0.35)');
    rect(128, 318, 64, 4, '#8a5a33');
    rect(162, 352, 28, 32, '#7a4a2e'); g.strokeStyle = '#5a3520'; g.lineWidth = 2; g.strokeRect(162, 352, 28, 32);
    cir(176, 363, 2, '#ffd94d'); cir(186, 371, 3, '#c0c0c0');
    rect(165, 355, 17, 7, '#f4efe2'); H.txt(g, '神戸', 173, 358.5, 5, '#5a4632');
  }
};
