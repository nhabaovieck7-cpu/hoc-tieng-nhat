// maps-mall.js — TRUNG TÂM THƯƠNG MẠI «銀座モール» (đợt ngoại hình + mall 31/10/2026).
// Sảnh trong nhà: sàn bóng, 4 quầy dọc tường bắc — mỗi quầy có BIỂN GẮN TRÊN QUẦY (luật biển
// hiệu 13:33: tên nằm trên mặt tiền/quầy, không phải danh sách nổi), nhân viên đứng quầy và
// điểm tương tác mở quầy mua sắm (style.js): 👕 Thời trang · 💍 Trang sức & phụ kiện ·
// 💄 Mỹ phẩm · 🌸 Nước hoa. Nối cửa nam về phố mua sắm (shotengai, cổng nam x=36).
// Dữ liệu thuần + paint theo hợp đồng maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['mall'] = {
  id: 'mall',
  label: '🛍️ Trung tâm thương mại 銀座モール',
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
    '#......................#',
    '###########D############'
  ],
  solidsExtra: [
    [1, 1, 5, 1],   // quầy thời trang
    [7, 1, 5, 1],   // quầy trang sức & phụ kiện
    [13, 1, 5, 1],  // quầy mỹ phẩm
    [19, 1, 4, 1],  // quầy nước hoa
    [2, 5, 3, 1],   // đảo trưng bày giữa sảnh 1
    [10, 5, 4, 1],  // đảo trưng bày giữa sảnh 2
    [19, 5, 3, 1],  // đảo trưng bày giữa sảnh 3
    [11, 8, 2, 1]   // ghế nghỉ giữa sảnh
  ],
  doors: { '11,12': { to: 'shotengai', spawn: [36, 10] } },
  npcs: [
    { id: 'mall-fashion-staff', name: 'Nhân viên quầy thời trang', sprite: 'staffF', tx: 3, ty: 2, behavior: 'stand', scene: 'mall-fashion', label: '👕 Quầy thời trang — chào hỏi & mua sắm', range: 84 },
    { id: 'mall-jewelry-staff', name: 'Nhân viên quầy trang sức', sprite: 'staffM', tx: 9, ty: 2, behavior: 'stand', scene: 'mall-jewelry', label: '💍 Quầy trang sức & phụ kiện — mua sắm', range: 84 },
    { id: 'mall-cosmetics-staff', name: 'Nhân viên quầy mỹ phẩm', sprite: 'staffF', tx: 15, ty: 2, behavior: 'stand', scene: 'mall-cosmetics', label: '💄 Quầy mỹ phẩm — chào hỏi & mua sắm', range: 84 },
    { id: 'mall-perfume-staff', name: 'Nhân viên quầy nước hoa', sprite: 'staffM', tx: 20, ty: 2, behavior: 'stand', scene: 'mall-perfume', label: '🌸 Quầy nước hoa — mua sắm', range: 84 }
  ],
  objects: [],
  spawnDefault: [11, 11],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu lớn của mall (trên tường bắc, vùng y âm) ===== */
    rect(0, -40, 24 * T, 34, '#2b3a67');
    H.txt(g, '🛍 銀座モール — GINZA MALL', 12 * T, -23, 15, '#ffd94d');

    /* ===== Sàn đá bóng + thảm đỏ lối giữa ===== */
    rect(0, 0, 24 * T, 13 * T, '#ddd6c4');
    var tx, ty, i;
    for (ty = 0; ty <= 12; ty++) for (tx = 0; tx <= 23; tx++) {
      g.strokeStyle = 'rgba(120,110,90,0.25)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1);
      if (H.hash(tx * 5, ty * 3) > 0.86) rect(tx * T + 4, ty * T + 4, 5, 3, 'rgba(255,255,255,0.35)');
    }
    rect(10 * T, 2 * T, 4 * T, 10 * T, 'rgba(178,60,60,0.16)');

    /* ===== 4 QUẦY dọc tường bắc: mặt quầy + biển gắn trên quầy + hàng trưng bày ===== */
    var counters = [
      { x: 1, w: 5, sign: 'ファッション', sub: '👕 THỜI TRANG', bg: '#7a4a63', cols: ['#3d7be0', '#e0533d', '#f4f1ea', '#39a05a', '#e9c44d'] },
      { x: 7, w: 5, sign: 'アクセサリー', sub: '💍 TRANG SỨC', bg: '#8a6f3a', cols: ['#ffd94d', '#e8e8e8', '#7fb3d5', '#ffd94d', '#e8a0b4'] },
      { x: 13, w: 5, sign: 'コスメ', sub: '💄 MỸ PHẨM', bg: '#b03a48', cols: ['#e0533d', '#e8a0b4', '#f4f1ea', '#c95d5d', '#e9c44d'] },
      { x: 19, w: 4, sign: '香水', sub: '🌸 NƯỚC HOA', bg: '#4a6741', cols: ['#a8d4ea', '#e8a0b4', '#cfe8b8', '#f2d8a8'] }
    ];
    counters.forEach(function (ct) {
      rect(ct.x * T + 2, 1 * T + 8, ct.w * T - 4, T - 10, '#6d5a4a');            // mặt quầy
      rect(ct.x * T + 2, 1 * T + 22, ct.w * T - 4, 4, '#54432f');
      rect(ct.x * T + 6, -2, ct.w * T - 12, 17, ct.bg);                          // BIỂN GẮN TRÊN QUẦY
      H.txt(g, ct.sign, (ct.x + ct.w / 2) * T, 6, 10, '#ffffff');
      H.txt(g, ct.sub, (ct.x + ct.w / 2) * T, 1 * T - 6, 6, ct.bg);
      for (i = 0; i < ct.cols.length; i++) {                                      // hàng mẫu trên quầy
        var ix = ct.x * T + 12 + i * ((ct.w * T - 24) / ct.cols.length);
        rect(ix, 1 * T + 11, 9, 8, ct.cols[i]);
        rect(ix + 2, 1 * T + 19, 5, 2, 'rgba(255,255,255,0.5)');
      }
    });

    /* ===== Đảo trưng bày giữa sảnh ===== */
    [[2, '#7a4a63'], [10, '#8a6f3a'], [19, '#b03a48']].forEach(function (isl) {
      var wdt = isl[0] === 10 ? 4 : 3;
      rect(isl[0] * T + 3, 5 * T + 6, wdt * T - 6, T - 12, '#9a7b58');
      for (i = 0; i < wdt * 2; i++) { cir(isl[0] * T + 14 + i * 16, 5 * T + 14, 4.5, ['#e0533d', '#3d7be0', '#e9c44d', '#39a05a', '#e8a0b4', '#f4f1ea', '#8a6fb8'][i % 7]); }
      rect(isl[0] * T + 8, 5 * T - 6, 44, 11, '#ffffff'); H.txt(g, 'SALE', isl[0] * T + 30, 5 * T, 7, '#c0392b');
    });

    /* ===== Ghế nghỉ + cây trong nhà ===== */
    rect(11 * T + 2, 8 * T + 8, 2 * T - 4, 12, '#8a6f52');
    [[5, 8], [18, 8]].forEach(function (p) {
      rect(p[0] * T + 9, p[1] * T + 16, 14, 12, '#a0522d');
      cir(p[0] * T + 16, p[1] * T + 9, 11, '#4e7d3a'); cir(p[0] * T + 9, p[1] * T + 13, 7, '#5d8f45'); cir(p[0] * T + 23, p[1] * T + 13, 7, '#679a4c');
    });

    /* ===== Cửa ra ở ô D (11,12) — kính tự động về phố mua sắm ===== */
    rect(11 * T + 1, 12 * T + 1, T - 2, T - 2, '#42525e');
    rect(11 * T + 4, 12 * T + 4, 11, T - 8, '#d7f0e4'); rect(11 * T + 17, 12 * T + 4, 11, T - 8, '#d7f0e4');
    rect(9 * T + 4, 12 * T + 3, 52, 17, '#2b3a67'); H.txt(g, 'ありがとうございました', 9 * T + 30, 12 * T + 11, 7, '#ffffff');
  }
};
