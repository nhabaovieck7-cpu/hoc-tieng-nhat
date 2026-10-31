// maps-soko.js — Kho vận / trung tâm logistics «千葉物流センター» (bối cảnh 2D, đợt mở rộng ngành).
// Chuẩn thật: dãy kệ cao 3 tầng có số vị trí棚番, băng chuyền phân loại, trạm quét mã,
// xe nâng, pallet xếp thùng, cửa xuất hàng (shutter) phía nam có xe tải chờ.
// Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['soko'] = {
  id: 'soko',
  label: '📦 Kho vận — 千葉物流センター',
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
    [2, 1, 3, 6], [7, 1, 3, 6], [12, 1, 3, 6],   // 3 dãy kệ cao (lối đi giữa các dãy)
    [17, 3, 5, 1],  // băng chuyền phân loại
    [17, 6, 3, 1],  // trạm quét mã + bàn kiểm hàng
    [20, 8, 3, 2],  // xe nâng đậu
    [16, 9, 4, 1]   // pallet thùng chờ xuất
  ],
  doors: { '5,11': { to: 'street', spawn: [40, 10] } },
  npcs: [
    { id: 'soko-leader', name: 'Anh Mori — trưởng nhóm kho', sprite: 'guard', tx: 16, ty: 5, behavior: 'stand', scene: 'soko-leader', label: '💬 Chào anh Mori', range: 72 }
  ],
  objects: [],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu ===== */
    rect(0, -40, 24 * T, 34, '#37424e'); H.txt(g, '千葉物流センター', 384, -23, 16, '#ffffff');
    H.txt(g, '構内 徐行', 700, -23, 9, '#ffd94d');

    /* ===== Sàn bê tông sáng + vạch lối xe nâng màu vàng ===== */
    rect(0, 0, 24 * T, 12 * T, '#b5b9bd');
    var tx, ty, i, j;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 24; tx++) {
      if (H.hash(tx * 3, ty * 5) > 0.75) rect(tx * T + 8, ty * T + 12, 6, 3, 'rgba(60,64,68,0.15)');
    }
    rect(15 * T + 14, 0, 3, 12 * T, '#e8c33a'); rect(23 * T - 3, 0, 3, 12 * T, '#e8c33a');   // làn xe nâng phía đông

    /* ===== 3 dãy kệ cao: cột xanh, dầm cam, thùng theo tầng + nhãn 棚番 ===== */
    [2, 7, 12].forEach(function (kx, di) {
      var x = kx * T;
      rect(x + 2, 34, 3 * T - 4, 6 * T - 4, '#31517d');
      for (i = 0; i < 3; i++) {
        rect(x + 2, 40 + i * 62, 3 * T - 4, 8, '#e07830');
        for (j = 0; j < 3; j++) rect(x + 8 + j * 30, 50 + i * 62, 24, 30, ['#c9a06a', '#b08954', '#d6b183'][(i + j + di) % 3]);
      }
      rect(x + 26, 232, 44, 14, '#f7f3e4'); H.txt(g, '棚 ' + (di + 1) + '-A', x + 48, 239, 8, '#374151');
    });

    /* ===== Băng chuyền phân loại (17,3)-(21,3) + thùng đang chạy ===== */
    rect(17 * T + 2, 3 * T + 4, 5 * T - 4, 24, '#6d757e'); rect(17 * T + 2, 3 * T + 8, 5 * T - 4, 4, '#8f979e');
    for (i = 0; i < 5; i++) line(17 * T + 14 + i * 30, 3 * T + 4, 17 * T + 14 + i * 30, 3 * T + 28, '#565d63', 2);
    rect(17 * T + 20, 3 * T + 9, 26, 14, '#c9a06a'); rect(19 * T + 2, 3 * T + 9, 26, 14, '#b08954');
    H.txt(g, '仕分けライン', 19 * T + 16, 3 * T - 4, 8, '#374151');

    /* ===== Trạm quét mã (17,6)-(19,6): máy quét cố định + màn hình + thùng chờ ===== */
    rect(17 * T + 2, 6 * T + 2, 3 * T - 4, T - 4, '#d8dde2');
    rect(17 * T + 10, 6 * T + 6, 26, 18, '#26303c'); H.txt(g, 'SCAN', 17 * T + 23, 6 * T + 15, 7, '#7fe0a8');
    line(18 * T + 20, 6 * T + 2, 18 * T + 20, 6 * T - 8, '#e0533d', 3);                     // tia quét đỏ phía trên
    rect(19 * T - 20, 6 * T + 8, 22, 14, '#c9a06a');

    /* ===== Xe nâng (20,8)-(22,9) + pallet thùng chờ xuất (16,9)-(19,9) ===== */
    rect(650, 262, 62, 40, '#e8a13a'); rect(650, 262, 62, 9, '#c77f22');
    line(656, 254, 656, 310, '#55504a', 4); line(700, 254, 700, 310, '#55504a', 4); line(656, 254, 700, 254, '#55504a', 4);
    ring(662, 306, 8, '#26303c', 4); ring(696, 306, 8, '#26303c', 4);
    rect(16 * T + 2, 9 * T + 4, 4 * T - 4, 22, '#a5825e');
    for (i = 0; i < 3; i++) rect(16 * T + 8 + i * 40, 9 * T - 12, 34, 16, ['#c9a06a', '#b08954', '#d6b183'][i]);
    H.txt(g, '出荷待ち', 18 * T, 9 * T + 15, 8, '#5a4632');

    /* ===== Cửa xuất hàng phía nam (x17–21, hàng 11 là tường): shutter hé + xe tải sau cửa ===== */
    rect(17 * T, 11 * T - 6, 5 * T, 12, '#8f979e');
    for (i = 0; i < 5; i++) line(17 * T + 4, 11 * T - 4 + i * 3, 22 * T - 4, 11 * T - 4 + i * 3, '#6d757e', 1);
    H.txt(g, '出荷口', 19 * T + 16, 11 * T + 14, 9, '#374151');

    /* ===== Cửa nhân viên ô D (5,11) ===== */
    rect(130, 322, 64, 26, '#cfc8b8');
    rect(200, 320, 84, 16, '#37424e'); H.txt(g, '関係者入口', 242, 328, 8, '#ffffff');
  }
};
