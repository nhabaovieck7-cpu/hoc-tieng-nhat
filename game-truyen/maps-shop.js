// maps-shop.js — Cửa hàng quần áo «原宿洋品店» (2D, gỡ nghẽn cảnh 1.4 Chương 1).
// Chuẩn thật của shop quần áo Nhật nhỏ ở phố mua sắm: kệ áo theo size S/M/L, góc SALE đỏ,
// hai phòng thử đồ 試着室 có rèm, quầy thu ngân + gương soi, biển "試着室は奥です".
// Nối cửa nam về phố mua sắm (shotengai). Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['shop'] = {
  id: 'shop',
  label: '👕 Cửa hàng quần áo — 原宿洋品店',
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
    '#######D########'
  ],
  solidsExtra: [
    [1, 1, 4, 1],   // kệ áo treo dãy bắc (size S)
    [6, 1, 4, 1],   // kệ áo treo dãy bắc (size M)
    [11, 1, 4, 1],  // kệ áo treo dãy bắc (size L)
    [1, 4, 3, 1],   // bàn xếp áo thun gấp
    [12, 4, 3, 1],  // góc SALE — giá đỏ
    [1, 7, 3, 2],   // phòng thử đồ 1 (rèm)
    [5, 7, 3, 2],   // phòng thử đồ 2 (rèm)
    [11, 7, 4, 1]   // quầy thu ngân + máy tính tiền
  ],
  doors: { '7,10': { to: 'shotengai', spawn: [44, 10] } },
  npcs: [
    { id: 'shop-staff', name: 'Chị nhân viên bán hàng', sprite: 'staffF', tx: 13, ty: 6, behavior: 'stand', scene: 'shop-exchange', label: '💬 Hỏi nhân viên — đổi size áo', range: 84 }
  ],
  objects: [],
  spawnDefault: [7, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu ===== */
    rect(0, -40, 16 * T, 34, '#7a4a63'); H.txt(g, '洋服 の はらじゅく — 原宿洋品店', 8 * T, -23, 14, '#ffe9f2');

    /* ===== Sàn gỗ sáng + thảm đỏ giữa lối đi ===== */
    rect(0, 0, 16 * T, 11 * T, '#e3d3ae');
    var tx, ty, i;
    for (ty = 1; ty <= 10; ty++) for (tx = 1; tx <= 14; tx++) {
      g.strokeStyle = 'rgba(150,120,70,0.22)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1);
    }
    rect(6 * T, 2 * T, 4 * T, 8 * T, 'rgba(178,84,60,0.20)');

    /* ===== 3 kệ áo treo dãy bắc: thanh ngang + móc + áo đủ màu, thẻ size ===== */
    var racks = [
      { x: 1, size: 'S', cols: ['#7fb3d5', '#e8a0b4', '#f4f1ea', '#5da464', '#e9c44d', '#c95d5d'] },
      { x: 6, size: 'M', cols: ['#3d7be0', '#e0533d', '#39a05a', '#f4f1ea', '#8a6fb8', '#e08a4d'] },
      { x: 11, size: 'L', cols: ['#4c565e', '#7fb3d5', '#c95d5d', '#e9c44d', '#5da464', '#f4f1ea'] }
    ];
    racks.forEach(function (rk) {
      rect(rk.x * T + 2, 1 * T + 2, 4 * T - 4, T - 4, '#9a7b58');
      line(rk.x * T + 6, 1 * T + 9, (rk.x + 4) * T - 6, 1 * T + 9, '#5d4a33', 3);
      for (i = 0; i < 6; i++) {
        var ax = rk.x * T + 8 + i * 19;
        line(ax + 4, 1 * T + 9, ax + 4, 1 * T + 13, '#5d4a33', 1);
        rect(ax, 1 * T + 13, 10, 15, rk.cols[i]);
        rect(ax + 2, 1 * T + 13, 6, 4, 'rgba(255,255,255,0.35)');
      }
      rect(rk.x * T + 2, 2, 20, 13, '#ffffff'); H.txt(g, rk.size, rk.x * T + 12, 8, 9, '#7a4a63');
    });

    /* ===== Bàn áo thun gấp (1,4): chồng áo gấp ngăn nắp + thẻ giá ===== */
    rect(1 * T + 2, 4 * T + 4, 3 * T - 4, T - 8, '#8a6f52');
    var fold = ['#3d7be0', '#e0533d', '#f4f1ea'];
    for (i = 0; i < 3; i++) { rect(1 * T + 6 + i * 28, 4 * T + 8, 24, 7, fold[i]); rect(1 * T + 6 + i * 28, 4 * T + 17, 24, 7, fold[(i + 1) % 3]); }
    rect(2 * T + 6, 4 * T - 8, 36, 12, '#ffffff'); H.txt(g, 'Tシャツ ¥1,900', 2 * T + 24, 4 * T - 2, 7, '#5a4632');

    /* ===== Góc SALE (12,4): giá đỏ, biển SALE, áo treo giảm giá ===== */
    rect(12 * T + 2, 4 * T + 2, 3 * T - 4, T - 4, '#c0392b');
    line(12 * T + 6, 4 * T + 10, 15 * T - 6, 4 * T + 10, '#7c241a', 3);
    for (i = 0; i < 4; i++) { rect(12 * T + 9 + i * 21, 4 * T + 14, 11, 14, ['#e0533d', '#e8a13a', '#7a4fd0', '#39a05a'][i]); }
    rect(12 * T + 18, 4 * T - 10, 52, 15, '#e0533d'); H.txt(g, 'SALE 30% OFF', 13 * T + 12, 4 * T - 2, 8, '#ffffff');

    /* ===== Phòng thử đồ ×2 (1,7) & (5,7): khung + rèm sọc + biển 試着室 ===== */
    [[1, '試着室 1'], [5, '試着室 2']].forEach(function (fr) {
      var fx = fr[0] * T;
      rect(fx + 2, 7 * T + 2, 3 * T - 4, 2 * T - 4, '#6d5a71');
      for (i = 0; i < 5; i++) rect(fx + 6 + i * 17, 7 * T + 6, 9, 2 * T - 12, i % 2 ? '#b9a7c4' : '#d9cbe2');
      rect(fx + 34, 7 * T - 9, 40, 12, '#ffffff'); H.txt(g, fr[1], fx + 54, 7 * T - 3, 7, '#6d5a71');
      cir(fx + 3 * T - 14, 8 * T + 8, 4, '#e9c44d'); // móc số phòng
      H.txt(g, fr[0] === 1 ? '1' : '2', fx + 3 * T - 14, 8 * T + 8, 7, '#5a4632');
    });
    H.txt(g, '試着室は奥です — phòng thử ở phía trong', 4 * T + 16, 10 * T - 4, 8, '#8a7a90');

    /* ===== Gương soi (10,7) dựng đứng cạnh phòng thử ===== */
    rect(10 * T + 8, 7 * T + 2, 16, 2 * T - 6, '#a8d4ea'); g.strokeStyle = '#7a6a52'; g.lineWidth = 2; g.strokeRect(10 * T + 8, 7 * T + 2, 16, 2 * T - 6);
    line(10 * T + 12, 8 * T + 6, 10 * T + 20, 7 * T + 10, 'rgba(255,255,255,0.7)', 2);

    /* ===== Quầy thu ngân (11,7): quầy dài, máy tính tiền, túi giấy ===== */
    rect(11 * T + 2, 7 * T + 6, 4 * T - 4, T - 8, '#7a5c40');
    rect(12 * T + 4, 7 * T - 2, 26, 16, '#374151'); rect(12 * T + 7, 7 * T + 1, 20, 9, '#bfe0ee'); H.txt(g, '¥', 12 * T + 17, 7 * T + 5, 8, '#31517d');
    rect(14 * T + 4, 7 * T + 12, 16, 14, '#e8dcc0'); rect(14 * T + 4, 7 * T + 12, 16, 4, '#c9b892'); // túi giấy mua hàng
    H.txt(g, 'レジ', 13 * T + 8, 8 * T + 10, 8, '#5a4632');

    /* ===== Cửa ra ở ô D (7,10) ===== */
    rect(7 * T + 2, 10 * T + 1, T - 4, T - 2, '#5a4630'); rect(7 * T + 5, 10 * T + 4, T - 10, T - 8, '#a8d4ea');
    rect(6 * T - 8, 10 * T + 4, 52, 18, '#7a4a63'); H.txt(g, 'いらっしゃいませ', 6 * T + 18, 10 * T + 13, 7, '#ffffff');
  }
};
