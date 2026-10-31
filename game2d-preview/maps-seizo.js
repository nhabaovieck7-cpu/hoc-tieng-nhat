// maps-seizo.js — Nhà máy chế tạo «名古屋製作所» (bối cảnh 2D, đợt mở rộng ngành).
// Chuẩn thật: hai máy ép dập, trung tâm gia công, bàn làm việc + bàn kiểm tra, kệ linh kiện,
// xe nâng đậu trong vạch, dầm cẩu trục trên cao, sơn vạch 5S/通路 dưới sàn, bảng 改善提案.
// Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['seizo'] = {
  id: 'seizo',
  label: '🏭 Nhà máy chế tạo — 名古屋製作所',
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
    [2, 1, 3, 2],   // máy ép 1 プレス機
    [7, 1, 3, 2],   // máy ép 2
    [13, 1, 4, 1],  // bàn làm việc + ê-tô
    [19, 1, 4, 3],  // kệ linh kiện 部品棚
    [2, 5, 4, 2],   // trung tâm gia công マシニング
    [9, 6, 3, 1],   // bàn kiểm tra 検査台
    [20, 7, 3, 2],  // xe nâng フォークリフト đậu
    [14, 9, 2, 1]   // bảng 改善提案 (tương tác)
  ],
  doors: { '5,11': { to: 'street', spawn: [22, 10] } },
  npcs: [
    { id: 'seizo-senpai', name: 'Anh Kobayashi — senpai máy', sprite: 'staffM', tx: 11, ty: 4, behavior: 'stand', scene: 'seizo-senpai', label: '💬 Chào senpai Kobayashi', range: 72 }
  ],
  objects: [
    { tx: 14, ty: 9, tw: 2, th: 1, interact: { scene: 'seizo-board', label: '📌 Xem bảng 改善提案 (đề xuất cải tiến)' } }
  ],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu + dầm cẩu trục (vùng y âm và hàng 0) ===== */
    rect(0, -40, 24 * T, 34, '#dfe3e6'); g.strokeStyle = '#6d757e'; g.lineWidth = 2; g.strokeRect(250, -36, 268, 26);
    H.txt(g, '名古屋製作所', 384, -23, 16, '#374151');
    rect(0, 2, 24 * T, 10, '#e8c33a'); line(0, 12, 24 * T, 12, '#b8860b', 2);        // dầm cẩu trục vàng chạy dọc trần
    rect(500, 0, 34, 20, '#c77f22'); line(517, 12, 517, 26, '#55504a', 2);           // móc cẩu

    /* ===== Sàn bê tông + sơn vạch 5S: lối đi xanh, ô đặt vật viền vàng ===== */
    rect(0, 0, 24 * T, 12 * T, '#a9adb2');
    var tx, ty, i;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 24; tx++) {
      if (H.hash(tx * 5, ty * 3) > 0.72) rect(tx * T + 6, ty * T + 8, 6, 3, 'rgba(60,64,68,0.18)');
    }
    rect(0, 4 * T, 24 * T, T, '#5d8f6a');                                            // 通路 lối đi ngang màu xanh lá
    rect(0, 4 * T, 24 * T, 3, '#f2f2f0'); rect(0, 5 * T - 3, 24 * T, 3, '#f2f2f0');
    g.strokeStyle = '#e8c33a'; g.lineWidth = 2;
    g.strokeRect(19 * T + 3, 1 * T - 3, 4 * T - 6, 3 * T + 4);                       // ô kệ linh kiện
    g.strokeRect(20 * T + 3, 7 * T - 3, 3 * T - 6, 2 * T + 4);                       // ô đậu xe nâng
    H.txt(g, '通路', 60, 4 * T + 16, 9, '#ffffff'); H.txt(g, '指差呼称', 700, 4 * T + 16, 8, '#ffffff');

    /* ===== Hai máy ép (x2 và x7, hàng 1–2) ===== */
    [[2, '#31517d'], [7, '#5d646b']].forEach(function (m) {
      var x = m[0] * T;
      rect(x + 2, 34, 92, 60, m[1]); rect(x + 2, 34, 92, 12, '#26303c');
      rect(x + 30, 48, 36, 20, '#1d2733'); cir(x + 48, 58, 5, '#e0533d'); cir(x + 62, 58, 4, '#39a05a');
      rect(x + 14, 76, 68, 14, '#8f979e'); rect(x + 22, 79, 52, 8, '#c9cdd2');        // bàn khuôn dưới
      H.txt(g, 'プレス', x + 48, 40, 8, '#ffffff');
    });

    /* ===== Bàn làm việc (13,1)-(16,1): mặt gỗ, ê-tô, đèn bàn, bản vẽ ===== */
    rect(418, 36, 124, 26, '#8a6f52'); rect(422, 40, 116, 6, '#a5825e');
    rect(428, 48, 16, 10, '#565d63'); cir(520, 42, 5, '#ffd94d'); line(512, 40, 520, 42, '#55504a', 2);
    rect(456, 48, 34, 12, '#f4f8f7'); line(460, 52, 486, 52, '#7fb3d5', 1); line(460, 56, 480, 56, '#7fb3d5', 1);
    H.txt(g, '図面', 473, 33, 7, '#374151');

    /* ===== Kệ linh kiện (19,1)-(22,3): 3 tầng hộp màu theo mã ===== */
    rect(610, 34, 118, 92, '#6d757e');
    for (i = 0; i < 3; i++) for (var j = 0; j < 4; j++) {
      rect(614 + j * 28, 38 + i * 30, 24, 22, ['#e8a13a', '#3d7be0', '#39a05a', '#e0533d'][(i + j) % 4]);
    }
    H.txt(g, '部品棚', 669, 30, 8, '#374151');

    /* ===== Trung tâm gia công (2,5)-(5,6): thân máy có cửa kính + bảng điều khiển ===== */
    rect(66, 162, 124, 60, '#d8dde2'); rect(66, 162, 124, 10, '#31517d');
    rect(76, 178, 62, 36, '#33424e'); rect(80, 182, 54, 28, '#9fd0e8');
    cir(96, 196, 6, '#8f979e'); rect(146, 178, 36, 36, '#26303c');
    cir(156, 188, 4, '#e0533d'); cir(168, 188, 4, '#39a05a'); H.txt(g, 'CNC', 164, 204, 7, '#7fe0a8');
    H.txt(g, 'マシニング', 128, 158, 8, '#374151');

    /* ===== Bàn kiểm tra (9,6)-(11,6): sản phẩm xếp hàng + thước cặp + đèn ===== */
    rect(290, 194, 92, 28, '#e8e2d4'); rect(294, 198, 84, 5, '#f4efe2');
    for (i = 0; i < 4; i++) cir(306 + i * 22, 212, 6, '#9aa5ad');
    line(352, 200, 368, 216, '#565d63', 2); cir(372, 184, 6, '#ffd94d');
    H.txt(g, '検査', 336, 190, 8, '#5a4632');

    /* ===== Xe nâng (20,7)-(22,8): thân vàng cam, khung nâng, càng ===== */
    rect(650, 232, 66, 44, '#e8a13a'); rect(650, 232, 66, 10, '#c77f22');
    line(656, 224, 656, 282, '#55504a', 4); line(706, 224, 706, 282, '#55504a', 4); line(656, 224, 706, 224, '#55504a', 4);
    line(716, 268, 736, 268, '#8f979e', 4); line(716, 278, 736, 278, '#8f979e', 4);   // càng nâng
    ring(664, 280, 9, '#26303c', 4); ring(700, 280, 9, '#26303c', 4);
    rect(668, 246, 26, 16, '#33424e');
    H.txt(g, 'フォークリフト', 683, 226, 6, '#7a5200');

    /* ===== Bảng 改善提案 (14,9)-(15,9) — điểm tương tác ===== */
    rect(450, 290, 60, 30, '#f7f3e4'); g.strokeStyle = '#8a6f47'; g.lineWidth = 2; g.strokeRect(450, 290, 60, 30);
    H.txt(g, '改善提案', 480, 298, 8, '#8a5a18');
    for (i = 0; i < 3; i++) rect(456 + i * 17, 306, 13, 10, ['#fdf6d8', '#ffffff', '#ffe9ec'][i]);
    rect(452, 320, 4, 12, '#6b4a30'); rect(504, 320, 4, 12, '#6b4a30');

    /* ===== Cửa ra vào ô D (5,11): cửa cuốnシャッター hé + vạch an toàn ===== */
    rect(130, 322, 64, 26, '#c9cdd2');
    for (i = 0; i < 4; i++) line(132, 328 + i * 6, 192, 328 + i * 6, '#9aa0a6', 2);
    rect(200, 320, 84, 16, '#c73e3a'); H.txt(g, '安全第一・5S', 242, 328, 8, '#ffffff');
  }
};
