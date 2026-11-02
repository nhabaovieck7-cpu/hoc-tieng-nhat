// maps-supermarket.js — Siêu thị hư cấu 「スーパー中野」 (2D, đợt duyệt bối cảnh mẫu).
// Dữ liệu thuần + paint tĩnh theo hợp đồng MAPDEF (xem maps-core.js).
// Bố cục: 3 hàng kệ song song (lối đi 2 ô giữa các dãy), khu rau củ phía tây,
// quầy thu ngân phía dưới, giỏ hàng xếp gần cửa ra vào.
(function () {
  'use strict';
  window.MAPDEF = window.MAPDEF || {};

  function paint(g, H) {
    var T = H.T;
    function R(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function RR(x, y, w, h, r, c) { g.fillStyle = c; H.rr(g, x, y, w, h, r); }
    function C(cx, cy, rad, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, rad, 0, Math.PI * 2); g.fill(); }
    function L(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function TX(s, cx, cy, sz, c, al, wt) { H.txt(g, s, cx, cy, sz, c || '#222', al || 'center', wt || 'bold'); }
    // Kệ ngang 5 ô: thân kệ + 2 tầng hàng + nhãn giá vàng + biển treo trên đầu.
    function shelf(tx, ty, label, cols, sign) {
      var x = tx * T, y = ty * T;
      RR(x - 3, y - 13, 66, 13, 3, '#065f46'); TX(sign, x + 30, y - 6, 8, '#fff');
      RR(x + 1, y + 1, 5 * T - 2, T - 2, 3, '#4b5563');
      RR(x + 3, y + 3, 5 * T - 6, T - 6, 2, '#f8fafc');
      for (var s = 0; s < 5; s++) for (var p = 0; p < 2; p++) R(x + 6 + s * 30, y + 5 + p * 11, 25, 9, cols[(s + p) % cols.length]);
      for (var t = 0; t < 4; t++) R(x + 8 + t * 38, y + T - 7, 20, 4, '#fef08a');
      TX(label, x + 2 * T + 16, y + T - 13, 8, 'rgba(255,255,255,.92)');
    }
    function counter(cx, label) { // quầy thu ngân ở hàng 10
      var x = cx * T, y = 10 * T;
      RR(x + 1, y + 2, 4 * T - 2, T - 4, 4, '#e2e8f0'); R(x + 1, y + 2, 4 * T - 2, 6, '#0ea5e9');
      R(x + 8, y + 12, 3 * T - 16, 8, '#334155'); // băng chuyền
      C(x + 22, y + 16, 3, '#fca5a5'); C(x + 40, y + 16, 3, '#86efac'); C(x + 58, y + 16, 3, '#fcd34d');
      TX(label, x + 2 * T, y + 26, 8, '#075985');
    }

    /* ===== Biển hiệu cao (vùng y âm) ===== */
    R(-4, -40, 24 * T + 8, 36, '#065f46');
    R(-4, -40, 24 * T + 8, 5, '#fbbf24'); R(-4, -9, 24 * T + 8, 5, '#fbbf24');
    TX('🛒', 56, -22, 17, '#fff');
    TX('スーパー中野', 220, -22, 20, '#ffffff');
    TX('SUPER NAKANO', 400, -22, 11, '#a7f3d0');
    TX('夕方セール実施中', 590, -22, 11, '#fde68a');

    /* ===== Sàn gạch lớn sáng ===== */
    R(0, 0, 24 * T, 12 * T, '#e8e6df');
    for (var fy = 0; fy < 12; fy++) for (var fx = 0; fx < 24; fx++) {
      if ((fx + fy) % 2 === 0) R(fx * T, fy * T, T, T, 'rgba(255,255,255,.35)');
      if (H.hash(fx, fy) > 0.87) R(fx * T + 4, fy * T + 5, 17, 3, 'rgba(185,180,165,.5)');
    }
    for (var gx = 0; gx <= 24; gx++) L(gx * T, 0, gx * T, 12 * T, 'rgba(150,145,130,.25)', 1);
    for (var gy = 0; gy <= 12; gy++) L(0, gy * T, 24 * T, gy * T, 'rgba(150,145,130,.25)', 1);
    R(60, 150, 170, 10, 'rgba(255,255,255,.18)'); R(420, 260, 150, 10, 'rgba(255,255,255,.16)');

    /* ===== Tường + dải phân khu trên tường trên ===== */
    R(0, 0, 24 * T, T, '#fef3c7'); R(0, 22, 24 * T, 10, '#065f46');
    R(0, 0, T, 12 * T, '#d6cfbc'); R(23 * T, 0, T, 12 * T, '#d6cfbc');
    R(0, 11 * T, 24 * T, T, '#9db8c4');
    var zones = [['青果', 3], ['鮮魚', 10], ['精肉', 17], ['冷凍食品', 21]];
    for (var zn = 0; zn < zones.length; zn++) TX(zones[zn][0], zones[zn][1] * T + 16, 11, 10, '#065f46');
    RR(5 * T + 4, 3, 58, 26, 3, '#dc2626'); TX('夕方セール', 5 * T + 33, 12, 9, '#fff'); TX('半額シール', 5 * T + 33, 23, 8, '#fecaca');
    // Mặt kính ở đáy (hàng 11) trừ ô cửa
    for (var wx = 1; wx < 23; wx++) { if (wx === 12) continue; R(wx * T + 2, 11 * T + 3, T - 4, T - 6, 'rgba(205,235,245,.8)'); L(wx * T + 6, 11 * T + 26, wx * T + 24, 11 * T + 6, 'rgba(255,255,255,.65)', 2); }
    R(0, 11 * T, 24 * T, 3, '#5b6b73'); R(0, 12 * T - 3, 24 * T, 3, '#5b6b73');

    /* ===== Các dãy kệ song song (khớp solidsExtra) ===== */
    shelf(2, 2, '野菜・果物', ['#22c55e', '#f97316', '#ef4444', '#facc15', '#84cc16'], '青果');
    shelf(9, 2, '魚・肉', ['#fca5a5', '#fda4af', '#e7e5e4', '#fda4af'], '鮮魚・精肉');
    shelf(16, 2, '冷凍食品', ['#93c5fd', '#bfdbfe', '#a5f3fc', '#dbeafe'], '冷凍');
    shelf(2, 4, '野菜コーナー', ['#16a34a', '#65a30d', '#f97316', '#facc15', '#dc2626'], '野菜');
    shelf(9, 4, 'パン・お菓子', ['#f59e0b', '#fde68a', '#d97706', '#fbcfe8'], 'パン');
    shelf(16, 4, '飲料', ['#38bdf8', '#22c55e', '#fb923c', '#a78bfa'], '飲料');
    shelf(2, 6, '調味料', ['#b45309', '#dc2626', '#facc15', '#78716c'], '調味料');
    shelf(9, 6, '麺・米', ['#f8fafc', '#fde68a', '#d6d3d1', '#fca5a5'], '麺・米');
    shelf(16, 6, '日用品', ['#a78bfa', '#f9a8d4', '#6ee7b7', '#fcd34d'], '日用品');
    // Kệ rau củ (2,4) tô thêm: thùng rau phía trước mặt + thẻ 半額
    for (var vg = 0; vg < 5; vg++) { C(2 * T + 12 + vg * 30, 4 * T + 12, 6, ['#22c55e', '#f97316', '#ef4444', '#84cc16', '#facc15'][vg]); }
    RR(3 * T + 6, 4 * T + 20, 40, 11, 2, '#dc2626'); TX('半額', 3 * T + 26, 4 * T + 26, 9, '#fff');
    TX('¥98〜', 6 * T + 2, 4 * T + 26, 8, '#b91c1c');

    /* ===== Khu thu ngân phía dưới ===== */
    R(0, 8 * T + 6, 24 * T, 200, 'rgba(14,165,233,.07)'); // thảm khu vực tính tiền
    TX('レジ', 12 * T, 8 * T + 20, 11, 'rgba(7,89,133,.5)');
    // Băng chuyền + máy tính tiền của làn thu ngân chính (NPC ở 6,9; băng [3,9,3,1])
    RR(3 * T + 1, 9 * T + 3, 3 * T - 2, T - 6, 4, '#cbd5e1'); R(3 * T + 6, 9 * T + 11, 3 * T - 12, 9, '#334155');
    C(3 * T + 22, 9 * T + 16, 4, '#fca5a5'); C(3 * T + 44, 9 * T + 16, 4, '#86efac'); C(4 * T + 20, 9 * T + 16, 4, '#fcd34d');
    RR(5 * T + 18, 9 * T - 5, 30, 20, 3, '#111827'); R(5 * T + 21, 9 * T - 2, 24, 10, '#67e8f9'); TX('¥0', 6 * T + 1, 9 * T + 3, 7, '#164e63');
    RR(6 * T + 4, 8 * T + 2, 52, 18, 3, '#0284c7'); TX('レジ 1番', 6 * T + 30, 8 * T + 11, 9, '#fff'); // biển làn treo trên đầu thu ngân
    counter(1, 'レジ 2番'); counter(7, 'レジ 3番'); counter(14, 'レジ 4番');
    // Quầy thu ngân 5 (chỉ rộng 2 ô, khớp solid [20,10,2,1])
    RR(20 * T + 1, 10 * T + 2, 2 * T - 2, T - 4, 4, '#e2e8f0'); R(20 * T + 1, 10 * T + 2, 2 * T - 2, 6, '#0ea5e9');
    R(20 * T + 8, 10 * T + 12, 2 * T - 16, 8, '#334155'); C(20 * T + 22, 10 * T + 16, 3, '#fca5a5'); C(20 * T + 40, 10 * T + 16, 3, '#86efac');
    TX('レジ 5番', 21 * T, 10 * T + 26, 8, '#075985');
    // Chồng giỏ hàng cạnh cửa [20,9,2,1]
    for (var bk = 0; bk < 3; bk++) { RR(20 * T + 4 + bk * 4, 9 * T + 6 + bk * 3, 52 - bk * 8, 18, 2, ['#dc2626', '#2563eb', '#16a34a'][bk]); }
    TX('買い物かご', 21 * T, 9 * T + 28, 8, '#374151');
    // Xe đẩy hàng góc tây-dưới
    RR(T + 4, 9 * T + 6, 36, 20, 3, '#9ca3af'); L(T + 8, 9 * T + 12, T + 36, 9 * T + 12, '#6b7280', 2); L(T + 8, 9 * T + 20, T + 36, 9 * T + 20, '#6b7280', 2); C(T + 10, 9 * T + 28, 3, '#374151'); C(T + 34, 9 * T + 28, 3, '#374151');
    TX('カート', T + 22, 9 * T + 16, 7, '#f8fafc');

    /* ===== Cửa ra (12,11): thảm + cửa kính trượt ===== */
    RR(11 * T + 2, 9 * T + 38, 3 * T - 4, 20, 3, '#6b7280'); TX('スーパー中野', 12 * T + 16, 9 * T + 48, 8, '#e5e7eb');
    R(12 * T - 2, 11 * T + 2, T + 4, T - 4, '#475569');
    R(12 * T, 11 * T + 4, T - 8, T - 8, 'rgba(186,230,253,.95)'); R(12 * T + 15, 11 * T + 4, 3, T - 8, '#e5e7eb');
    L(12 * T + 4, 11 * T + 26, 12 * T + 12, 11 * T + 8, 'rgba(255,255,255,.8)', 2);
    TX('出口', 12 * T + 16, 11 * T + 10, 7, '#0369a1');
  }

  window.MAPDEF['supermarket'] = {
    id: 'supermarket',
    label: '🛒 Siêu thị スーパー中野',
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
      '############D###########'
    ],
    paint: paint,
    solidsExtra: [
      [2, 2, 5, 1],   // kệ rau củ / trái cây (hàng trên)
      [9, 2, 5, 1],   // kệ cá / thịt
      [16, 2, 5, 1],  // tủ đông
      [2, 4, 5, 1],   // kệ rau củ giảm giá (điểm tương tác)
      [9, 4, 5, 1],   // kệ bánh mì / đồ ăn vặt
      [16, 4, 5, 1],  // kệ đồ uống
      [2, 6, 5, 1],   // kệ gia vị
      [9, 6, 5, 1],   // kệ mì / gạo
      [16, 6, 5, 1],  // kệ đồ dùng hằng ngày
      [3, 9, 3, 1],   // băng chuyền làn thu ngân chính
      [20, 9, 2, 1],  // chồng giỏ hàng gần cửa
      [1, 10, 4, 1],  // quầy thu ngân 2
      [7, 10, 4, 1],  // quầy thu ngân 3
      [14, 10, 4, 1], // quầy thu ngân 4
      [20, 10, 2, 1]  // quầy thu ngân 5
    ],
    doors: { '12,11': { to: 'shotengai', spawn: [13, 4] } },
    npcs: [
      { id: 'super-cashier', name: 'Thu ngân siêu thị', sprite: 'staffF', tx: 6, ty: 9, behavior: 'stand', scene: 'super-pay', label: '🧾 Ra quầy tính tiền (giỏ thật của bạn)', range: 84 }
    ],
    objects: [
      { tx: 2, ty: 4, tw: 5, th: 1, interact: { scene: 'super-shelf', label: '🥬 Xem kệ rau củ giảm giá' } },
      { tx: 2, ty: 2, tw: 5, th: 1, interact: { scene: 'super-shelf-fresh', label: '🥬 Kệ rau củ & thực phẩm tươi — chọn mua' } },
      { tx: 9, ty: 2, tw: 5, th: 1, interact: { scene: 'super-shelf-fresh', label: '🐟 Kệ cá & thịt tươi — chọn mua' } },
      { tx: 9, ty: 4, tw: 5, th: 1, interact: { scene: 'super-shelf-bento', label: '🍱 Kệ đồ ăn sẵn & bento — chọn mua' } },
      { tx: 16, ty: 4, tw: 5, th: 1, interact: { scene: 'super-shelf-drinks', label: '🥤 Kệ đồ uống — chọn mua' } },
      { tx: 9, ty: 6, tw: 5, th: 1, interact: { scene: 'super-shelf-dry', label: '🍜 Kệ đồ khô & mì — chọn mua' } },
      { tx: 16, ty: 2, tw: 5, th: 1, interact: { scene: 'super-shelf-frozen', label: '🧊 Tủ đông — chọn mua' } },
      { tx: 16, ty: 6, tw: 5, th: 1, interact: { scene: 'super-shelf-daily', label: '🧺 Kệ đồ dùng hằng ngày — chọn mua' } },
      { tx: 3, ty: 9, tw: 3, th: 1, interact: { scene: 'super-pay', label: '🧾 Băng chuyền quầy thu ngân — tính tiền giỏ hàng' } }
      ,{ tx: 20, ty: 9, tw: 2, th: 1, interact: { scene: 'listen-super', label: '🎧 Loa siêu thị — nghe thông báo trong cửa hàng' } }
    ],
    spawnDefault: [12, 9]
  };
})();
