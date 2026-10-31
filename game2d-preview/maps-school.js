// maps-school.js — Trường tiếng «早稲田日本語学校» (bối cảnh 2D, đợt duyệt).
// Hai khu nối bằng khe cửa trong grid: phòng học phía tây (vách x=17, khe ở hàng 6)
// + sảnh phía đông (tủ giày, bảng thông báo, máy nước). Paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['school'] = {
  id: 'school',
  label: '🏫 Trường tiếng 早稲田日本語学校',
  grid: [
    '##########################',
    '#................#.......#',
    '#................#.......#',
    '#................#.......#',
    '#................#.......#',
    '#................#.......#',
    '#........................D',
    '#................#.......#',
    '#................#.......#',
    '#................#.......#',
    '#................#.......#',
    '#................#.......#',
    '##########################'
  ],
  solidsExtra: [
    [2, 1, 5, 1],   // bảng đen tường bắc phòng học (tương tác)
    [9, 1, 2, 1],   // bàn giáo viên
    [3, 5, 2, 1], [6, 5, 2, 1], [9, 5, 2, 1], [12, 5, 2, 1],   // dãy bàn học sinh 1
    [3, 7, 2, 1], [6, 7, 2, 1], [9, 7, 2, 1], [12, 7, 2, 1],   // dãy bàn học sinh 2
    [3, 9, 2, 1], [6, 9, 2, 1], [9, 9, 2, 1], [12, 9, 2, 1],   // dãy bàn học sinh 3
    [1, 11, 4, 1],  // tủ sách / tủ đựng đồ cuối lớp
    [19, 1, 5, 1],  // tủ giày ở sảnh
    [24, 3, 1, 1],  // máy nước uống ở sảnh (để ô 24,2 làm lối nối góc đông-bắc)
    [20, 11, 4, 1], // bảng thông báo tường nam sảnh
    [20, 9, 3, 1],  // ghế băng chờ ở sảnh
    [18, 11, 1, 1]  // chậu cây góc tây-nam sảnh (để ô 24,11 nối được qua 24,10)
  ],
  doors: { '25,6': { to: 'street', spawn: [1, 6] } },
  npcs: [
    { id: 'school-teacher', name: 'Cô giáo chủ nhiệm', sprite: 'teacher', tx: 7, ty: 3, behavior: 'stand', scene: 'school-teacher', label: '💬 Chào cô giáo', range: 72 }
  ],
  objects: [
    { tx: 2, ty: 1, tw: 5, th: 1, interact: { scene: 'school-board', label: '📚 Xem bảng đen / thông báo' } }
  ],
  spawnDefault: [23, 6],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Nền: sàn gỗ lớp học (tây) + gạch sảnh (đông) ===== */
    rect(0, -40, 26 * T, 13 * T + 40, '#ddd2ba');
    rect(32, 32, 16 * T, 11 * T, '#cfa66e');
    var tx, ty, i;
    for (ty = 1; ty <= 11; ty++) for (tx = 1; tx <= 16; tx++) {
      if (H.hash(tx, ty) > 0.62) rect(tx * T, ty * T, T, T, 'rgba(255,240,205,0.08)');
    }
    for (i = 0; i <= 11; i++) line(32, 32 + i * 24, 544, 32 + i * 24, 'rgba(150,105,58,0.25)', 1);
    rect(18 * T, 32, 7 * T, 11 * T, '#cfc8b8');
    for (ty = 1; ty <= 11; ty++) for (tx = 18; tx <= 24; tx++) {
      g.strokeStyle = 'rgba(110,105,92,0.35)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1);
    }
    // Thảm hành lang dẫn từ cửa đông (25,6) qua khe vách tới lớp
    rect(17 * T, 6 * T + 6, 9 * T, 20, '#b8564a'); rect(32, 6 * T + 6, 16 * T, 20, 'rgba(184,86,74,0.30)');

    /* ===== Tường bao + vách ngăn x=17 (khe cửa hàng 6) + biển trường vùng y âm ===== */
    rect(0, 0, 26 * T, 32, '#efe6d0'); rect(0, 0, 32, 13 * T, '#e6dbc4');
    rect(800, 0, 32, 13 * T, '#e6dbc4'); rect(0, 384, 26 * T, 32, '#e6dbc4');
    rect(17 * T, 32, 32, 5 * T, '#e2d3b2'); rect(17 * T, 7 * T, 32, 5 * T, '#e2d3b2');
    line(17 * T, 32, 17 * T, 6 * T, '#b8ab90', 2); line(17 * T, 7 * T, 17 * T, 384, '#b8ab90', 2);
    rect(17 * T - 3, 6 * T - 3, 38, 6, '#8a6f47'); rect(17 * T - 3, 7 * T - 3, 38, 6, '#8a6f47'); // khung khe cửa
    rect(270, -38, 292, 30, '#31517d'); H.txt(g, '早稲田日本語学校', 416, -23, 17, '#ffffff');

    /* ===== Bảng đen (2,1)-(6,1) — điểm tương tác + bàn giáo viên (9,1) ===== */
    rect(62, 30, 164, 34, '#2e4a3e'); g.strokeStyle = '#8a6f47'; g.lineWidth = 3; g.strokeRect(62, 30, 164, 34);
    H.txt(g, '今日の宿題', 110, 42, 10, '#ffffff');
    line(76, 54, 150, 54, '#e8e8e8', 1); line(76, 59, 132, 59, '#cfd8d2', 1);
    H.txt(g, 'N1 文法', 190, 42, 9, '#fdf6d8'); rect(206, 56, 12, 4, '#ffffff'); rect(192, 56, 10, 4, '#e88ca0');
    rect(290, 36, 60, 26, '#8a5a33'); rect(294, 40, 52, 8, '#f4efe2');
    rect(300, 42, 14, 10, '#4a7fb5'); cir(338, 44, 4, '#e0533d');
    // Đồng hồ lớp + bảng chữ kana treo tường tây
    cir(262, 14, 10, '#ffffff'); ring(262, 14, 10, '#6b5a44', 2);
    line(262, 14, 262, 8, '#33302e', 2); line(262, 14, 267, 16, '#33302e', 2);
    rect(34, 74, 26, 52, '#fdf6e0'); g.strokeStyle = '#b08954'; g.lineWidth = 1; g.strokeRect(34, 74, 26, 52);
    H.txt(g, 'あ', 47, 84, 9, '#b03a30'); H.txt(g, 'か', 47, 100, 9, '#31517d'); H.txt(g, 'さ', 47, 116, 9, '#3f7a4d');

    /* ===== Dãy bàn học sinh: mặt bàn + sách + ghế ===== */
    [[3, 5], [6, 5], [9, 5], [12, 5], [3, 7], [6, 7], [9, 7], [12, 7], [3, 9], [6, 9], [9, 9], [12, 9]].forEach(function (d, idx) {
      var px = d[0] * T, py = d[1] * T;
      g.fillStyle = '#b08954'; H.rr(g, px + 2, py + 4, 60, 22, 3);
      g.fillStyle = '#c39a63'; H.rr(g, px + 4, py + 6, 56, 7, 2);
      rect(px + 8, py + 9, 13, 9, idx % 3 === 0 ? '#c95d5d' : '#4a7fb5');
      rect(px + 40, py + 9, 12, 9, '#ffffff'); line(px + 42, py + 13, px + 50, py + 13, '#a08b62', 1);
      g.fillStyle = '#5a6b7d'; H.rr(g, px + 18, py + 27, 28, 5, 2);
    });
    /* Tủ sách cuối lớp (1,11)-(4,11) */
    rect(34, 354, 124, 28, '#8a5a33');
    var bk = ['#c95d5d', '#4a7fb5', '#e9c44d', '#5da464', '#8a6fb8'];
    for (i = 0; i < 10; i++) rect(38 + i * 12, 358, 8, 20, bk[i % 5]);

    /* ===== Sảnh: tủ giày (19,1)-(23,1) ===== */
    rect(610, 34, 156, 28, '#9a6a3f'); line(649, 34, 649, 62, '#7a5230', 2); line(688, 34, 688, 62, '#7a5230', 2); line(727, 34, 727, 62, '#7a5230', 2);
    for (i = 0; i < 8; i++) cir(620 + (i % 4) * 39, 44 + Math.floor(i / 4) * 11, 4, i % 2 ? '#3a3230' : '#7a4a6e');
    H.txt(g, '下駄箱', 688, 70, 8, '#5a4632');
    /* Máy nước (24,3) */
    rect(772, 98, 26, 30, '#e8eaea'); rect(776, 102, 18, 12, '#9fd4e8');
    cir(781, 120, 3, '#4a7fb5'); cir(791, 120, 3, '#e0533d'); rect(779, 124, 12, 3, '#b9bebe');
    /* Bảng thông báo sảnh (20,11)-(23,11) */
    rect(642, 354, 124, 28, '#3f6152'); g.strokeStyle = '#2e4a3e'; g.lineWidth = 2; g.strokeRect(642, 354, 124, 28);
    rect(648, 359, 24, 18, '#ffffff'); rect(678, 359, 24, 18, '#fdf6d8'); rect(708, 359, 24, 18, '#ffffff'); rect(738, 359, 22, 18, '#ffe4e0');
    H.txt(g, '掲示板', 704, 348, 8, '#486b3a');
    /* Ghế băng chờ (20,9) + cây góc tây-nam sảnh (18,11) */
    g.fillStyle = '#5da4b8'; H.rr(g, 642, 292, 92, 24, 4);
    rect(646, 296, 26, 16, '#4c8a9c'); rect(676, 296, 26, 16, '#4c8a9c');
    cir(592, 362, 10, '#5da464'); cir(604, 368, 8, '#4c8a54'); rect(586, 370, 12, 10, '#b08954');
    /* Áp phích JLPT trên tường sảnh */
    rect(610, 120, 44, 56, '#ffffff'); g.strokeStyle = '#c9c2b2'; g.lineWidth = 1; g.strokeRect(610, 120, 44, 56);
    H.txt(g, 'JLPT', 632, 134, 10, '#b03a30'); H.txt(g, '7月', 632, 152, 9, '#31517d'); H.txt(g, '申込', 632, 166, 8, '#5a4632');

    /* ===== Cửa ra vào ở ô D (25,6) ===== */
    rect(802, 194, 30, 28, '#7a4a2e'); g.strokeStyle = '#5a3520'; g.lineWidth = 2; g.strokeRect(802, 194, 30, 28);
    rect(806, 198, 20, 12, '#bfe0ee'); cir(810, 216, 3, '#c0c0c0');
    rect(806, 188, 20, 7, '#f4efe2'); H.txt(g, '入口', 816, 191.5, 6, '#5a4632');
  }
};
