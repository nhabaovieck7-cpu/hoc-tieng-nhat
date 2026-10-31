// maps-restaurant.js — Nhà hàng hư cấu 「築地食堂」 (2D, đợt duyệt bối cảnh mẫu).
// Dữ liệu thuần + paint tĩnh theo hợp đồng MAPDEF (xem maps-core.js).
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
    function VT(s, cx, y0, sz, c) { for (var i = 0; i < s.length; i++) TX(s[i], cx, y0 + i * (sz + 2), sz, c); }
    function lamp(cx, cy) { // đèn treo: quầng sáng vàng + bóng đèn + dây
      C(cx, cy, 30, 'rgba(250,204,21,.16)'); C(cx, cy, 15, 'rgba(250,204,21,.22)');
      L(cx, cy - 30, cx, cy - 7, '#6b4423', 2); C(cx, cy, 7, '#fde047'); C(cx, cy, 3, '#fff7cc');
    }
    function booth(bx, by, label) { // booth 3x2: băng ghế 2 bên + bàn giữa
      var x = bx * T, y = by * T;
      R(x, y, 3 * T, 2 * T, 'rgba(120,53,15,.14)');
      RR(x + 3, y + 3, 3 * T - 6, 15, 4, '#991b1b'); RR(x + 3, y + 2 * T - 18, 3 * T - 6, 15, 4, '#991b1b'); // 2 băng ghế
      RR(x + 10, y + 21, 3 * T - 20, 2 * T - 42, 4, '#d6a05a'); R(x + 14, y + 25, 3 * T - 28, 4, '#f5deb3'); // bàn gỗ
      C(x + 40, y + 32, 5, '#f8fafc'); C(x + 56, y + 32, 4, '#dbeafe'); // ấm/cốc trà
      RR(x + 62, y + 24, 12, 16, 2, '#fff7ed'); TX('品', x + 68, y + 32, 8, '#92400e'); // menu để bàn
      lamp(x + 48, y + 32);
      TX(label, x + 48, y + 2 * T - 8, 7, 'rgba(120,53,15,.65)');
    }

    /* ===== Biển gỗ cao (vùng y âm) ===== */
    R(-4, -40, 552, 36, '#3f2412');
    R(-4, -40, 552, 4, '#b45309'); R(-4, -8, 552, 4, '#b45309');
    TX('築地食堂', 190, -22, 20, '#fde68a');
    TX('定食 ・ 丼 ・ 麺', 360, -22, 12, '#fcd34d');
    TX('🍱', 62, -22, 16, '#fff');

    /* ===== Sàn gỗ ấm (khu ăn) ===== */
    R(0, 0, 17 * T, 12 * T, '#b07a45');
    for (var fy = 0; fy < 12; fy++) for (var fx = 0; fx < 17; fx++) {
      var hh = H.hash(fx, fy);
      if (hh > 0.5) R(fx * T, fy * T, T, T, 'rgba(255,220,160,.10)'); else R(fx * T, fy * T, T, T, 'rgba(80,40,10,.08)');
      if (hh > 0.8) { L(fx * T + 5, fy * T + 18, fx * T + 24, fy * T + 18, 'rgba(90,50,20,.35)', 1); }
    }
    for (var gy = 0; gy <= 12; gy++) L(0, gy * T, 17 * T, gy * T, 'rgba(80,45,15,.4)', 1);
    for (var px = 0; px < 17; px++) L(px * T + ((px % 2) ? 10 : 22), 3 * T, px * T + ((px % 2) ? 10 : 22), 12 * T, 'rgba(80,45,15,.25)', 1);

    /* ===== Tường ===== */
    R(0, 0, 17 * T, T, '#f1e3c8'); R(0, 24, 17 * T, 8, '#8a5a2b');
    R(0, 0, T, 12 * T, '#a97c50'); R(16 * T, 0, T, 12 * T, '#a97c50');
    // Bảng thực đơn viết tay trên tường trái/phải khu ăn (trang trí trên ô tường)
    RR(3, 6 * T + 3, 26, 52, 3, '#1f2937'); VT('定食', 16, 6 * T + 14, 9, '#fde68a');
    RR(16 * T + 3, 6 * T + 3, 26, 52, 3, '#292018'); VT('丼麺', 16 * T + 16, 6 * T + 14, 9, '#fde68a');
    // Tường đáy + bảng giờ mở cửa cạnh cửa
    R(0, 11 * T, 17 * T, T, '#8a5a2b');
    RR(6 * T + 3, 11 * T + 4, 58, 24, 3, '#fff7ed'); TX('営業時間', 6 * T + 32, 11 * T + 12, 8, '#7c2d12'); TX('11:00–21:00', 6 * T + 32, 11 * T + 23, 8, '#7c2d12');
    RR(10 * T + 6, 11 * T + 4, 52, 24, 3, '#7f1d1d'); TX('日替わり定食', 10 * T + 32, 11 * T + 16, 9, '#fecaca');

    /* ===== Sàn bếp (gạch/thép, phía trên counter hàng 1–2) ===== */
    R(T, T, 15 * T, 2 * T, '#c9cdd2');
    for (var ky = 1; ky < 3; ky++) for (var kx = 1; kx < 16; kx++) { if ((kx + ky) % 2) R(kx * T, ky * T, T, T, 'rgba(255,255,255,.25)'); L(kx * T, ky * T, kx * T, ky * T + T, 'rgba(100,110,120,.3)', 1); }
    R(3 * T, 2 * T, 3 * T, T, 'rgba(100,116,139,.20)'); // vùng đứng của nhân viên (4,2) — không solid

    /* --- Thiết bị bếp --- */
    // [1,1,3,1] tủ lạnh / kho thép
    RR(T + 2, T + 2, 3 * T - 4, T - 4, 3, '#9ca3af'); L(2 * T, T + 3, 2 * T, 2 * T - 3, '#6b7280', 2); L(3 * T, T + 3, 3 * T, 2 * T - 3, '#6b7280', 2); TX('冷蔵', 2 * T + 16, T + 16, 8, '#374151');
    // [5,1,3,1] bếp ga + nồi (có hơi nước)
    RR(5 * T + 2, T + 2, 3 * T - 4, T - 4, 3, '#374151');
    C(5 * T + 18, T + 16, 9, '#111827'); C(6 * T + 14, T + 16, 11, '#6b7280'); C(7 * T + 16, T + 16, 8, '#9ca3af');
    C(6 * T + 14, T + 14, 7, '#d1d5db'); TX('~', 6 * T + 8, T + 4, 10, '#e5e7eb'); TX('~', 7 * T + 16, T + 4, 10, '#e5e7eb');
    // [9,1,1,1] bồn rửa
    RR(9 * T + 2, T + 2, T - 4, T - 4, 3, '#a8c3cf'); R(9 * T + 7, T + 8, T - 14, 12, '#38bdf8'); TX('洗', 9 * T + 16, T + 27, 8, '#334155');
    // [14,1,2,1] bàn sơ chế của đầu bếp: thớt + rau củ
    RR(14 * T + 2, T + 2, 2 * T - 4, T - 4, 3, '#d6a05a'); R(14 * T + 8, T + 8, 22, 14, '#f5deb3'); C(15 * T + 10, T + 12, 5, '#22c55e'); C(15 * T + 20, T + 18, 5, '#f97316'); C(14 * T + 22, T + 24, 4, '#ef4444');
    // [1,2,2,1] bàn chuẩn bị thép + chồng bát
    RR(T + 2, 2 * T + 3, 2 * T - 4, T - 6, 3, '#d1d5db'); C(T + 18, 2 * T + 16, 7, '#f8fafc'); C(T + 34, 2 * T + 16, 6, '#e0f2fe'); C(2 * T + 18, 2 * T + 16, 6, '#fef3c7');
    // [7,2,3,1] quầy pass món + đèn giữ nóng
    RR(7 * T + 2, 2 * T + 3, 3 * T - 4, T - 6, 3, '#e7e5e4'); R(7 * T + 4, 2 * T + 5, 3 * T - 8, 6, 'rgba(239,68,68,.55)');
    C(7 * T + 22, 2 * T + 20, 7, '#fff7ed'); C(8 * T + 16, 2 * T + 20, 7, '#ffedd5'); C(9 * T + 12, 2 * T + 20, 7, '#fff7ed'); TX('パス', 8 * T + 16, 2 * T + 9, 7, '#991b1b');

    /* ===== Dải thực đơn treo (tanzaku) phía trên counter ===== */
    L(T, 2 * T + 4, 16 * T, 2 * T + 4, '#6b4423', 2);
    var menu = ['定', '食', '丼', '麺', 'そ', 'ば', 'う', 'ど', 'ん', '焼', '魚'];
    for (var mi = 0; mi < menu.length; mi++) { var mx = 2 * T + 12 + mi * 40; RR(mx, 2 * T + 5, 24, 24, 2, '#f5deb3'); TX(menu[mi], mx + 12, 2 * T + 17, 12, '#5b3413'); }

    /* ===== Counter dài [1,3,15,1] + noren bếp ở đầu đông ===== */
    RR(T, 3 * T + 1, 15 * T, T - 2, 4, '#7c4a21');
    R(T, 3 * T + 1, 13 * T, 8, '#c98d4e'); // mặt counter gỗ sáng (phần ghế khách)
    for (var cp = 0; cp < 6; cp++) L(2 * T + cp * 64, 3 * T + 18, 2 * T + cp * 64, 4 * T - 2, 'rgba(60,30,5,.35)', 2); // vách ngăn mặt trước
    // Bình trà + cốc + lọ gia vị + hộp đũa trên counter
    for (var tea = 0; tea < 4; tea++) { var txp = 3 * T + 20 + tea * 78; C(txp, 3 * T + 7, 5, '#334155'); C(txp + 12, 3 * T + 7, 3, '#f8fafc'); R(txp + 20, 3 * T + 3, 4, 8, '#dc2626'); }
    TX('カウンター', 7 * T + 16, 3 * T + 24, 8, '#fde68a');
    // Đầu tây counter: máy tính tiền nhỏ
    RR(T + 4, 3 * T - 3, 24, 18, 2, '#1f2937'); R(T + 7, 3 * T, 18, 8, '#67e8f9');
    // Noren ở cửa bếp (đầu đông của hàng counter, [14,3,2,1] nằm trong dải counter)
    R(14 * T, 3 * T - 8, 2 * T, T + 8, '#1e3a5f');
    L(15 * T, 3 * T - 8, 15 * T, 4 * T, 'rgba(255,255,255,.35)', 2);
    TX('築地', 15 * T, 3 * T + 8, 11, '#fff'); TX('厨房', 15 * T, 3 * T + 25, 8, '#bfdbfe');
    // Ghế tròn dọc counter (vẽ ở hàng 4, phía khách)
    for (var st = 0; st < 5; st++) { var sx = 3 * T + 16 + st * 64; C(sx, 4 * T + 10, 10, 'rgba(0,0,0,.18)'); C(sx, 4 * T + 8, 10, '#b45309'); C(sx, 4 * T + 8, 6, '#d97706'); }
    lamp(5 * T + 16, 4 * T + 8); lamp(11 * T + 16, 4 * T + 8);

    /* ===== 3 bàn booth + 1 bàn tròn ===== */
    booth(1, 5, 'ブース席');
    booth(1, 8, 'ブース席');
    booth(13, 5, 'ブース席');
    // Bàn tròn nhỏ [13,8,2,2]: bàn tròn + 4 ghế quanh (trong vùng solid)
    R(13 * T, 8 * T, 2 * T, 2 * T, 'rgba(120,53,15,.12)');
    C(14 * T, 9 * T, 27, 'rgba(0,0,0,.18)'); C(14 * T, 9 * T - 2, 27, '#d6a05a'); C(14 * T, 9 * T - 2, 19, '#e9bc7a');
    C(14 * T, 9 * T - 4, 5, '#334155'); C(14 * T - 7, 9 * T + 2, 3, '#f8fafc'); C(14 * T + 8, 9 * T + 2, 3, '#f8fafc');
    RR(14 * T - 8, 8 * T + 3, 16, 12, 3, '#991b1b'); RR(14 * T - 8, 10 * T - 15, 16, 12, 3, '#991b1b'); RR(13 * T + 3, 9 * T - 8, 12, 16, 3, '#991b1b'); RR(15 * T - 15, 9 * T - 8, 12, 16, 3, '#991b1b');
    lamp(14 * T, 9 * T - 2);

    /* ===== Máy bán thực券 cạnh cửa [9,10,2,1] ===== */
    RR(9 * T + 2, 10 * T - 4, 2 * T - 4, T + 4, 4, '#e7e5e4'); R(9 * T + 2, 10 * T - 4, 2 * T - 4, 10, '#dc2626'); TX('食券', 10 * T, 10 * T + 1, 10, '#fff');
    for (var bt = 0; bt < 6; bt++) { var bx2 = 9 * T + 7 + (bt % 3) * 13, by2 = 10 * T + 10 + Math.floor(bt / 3) * 10; RR(bx2, by2, 11, 8, 2, ['#fde68a', '#bbf7d0', '#bfdbfe'][bt % 3]); }
    R(10 * T + 22, 10 * T + 9, 8, 4, '#111827'); R(10 * T + 22, 10 * T + 17, 10, 6, '#9ca3af'); C(10 * T + 27, 10 * T + 27, 3, '#22c55e');
    TX('¥800〜', 9 * T + 22, 10 * T + 27, 8, '#7f1d1d');

    /* ===== Cửa ra vào (8,11): thảm + biển chào + noren cửa ===== */
    RR(7 * T + 2, 10 * T + 4, 3 * T - 4, T - 9, 3, '#7f1d1d'); TX('いらっしゃいませ', 8 * T + 16, 10 * T + 16, 10, '#fecaca');
    R(8 * T - 2, 11 * T + 1, T + 4, T - 2, '#5b3413'); R(8 * T + 2, 11 * T + 4, T - 4, T - 7, 'rgba(186,230,253,.9)');
    R(8 * T - 2, 11 * T - 8, T + 4, 10, '#1e3a5f'); TX('築地', 8 * T + 16, 11 * T - 3, 7, '#fff'); // noren ngắn treo trên cửa
    L(8 * T + 5, 11 * T + 24, 8 * T + 13, 11 * T + 9, 'rgba(255,255,255,.75)', 2);
  }

  window.MAPDEF['restaurant'] = {
    id: 'restaurant',
    label: '🍱 Nhà hàng 築地食堂',
    grid: [
      '#################',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '#...............#',
      '########D########'
    ],
    paint: paint,
    solidsExtra: [
      [1, 1, 3, 1],   // tủ lạnh / kho bếp
      [5, 1, 3, 1],   // bếp ga + nồi
      [9, 1, 1, 1],   // bồn rửa
      [14, 1, 2, 1],  // bàn sơ chế của đầu bếp
      [1, 2, 2, 1],   // bàn chuẩn bị bếp
      [7, 2, 3, 1],   // quầy pass món
      [1, 3, 13, 1],  // counter dài (chừa ô 14,3 = cửa noren vào bếp)
      [15, 3, 1, 1],  // mẩu counter phía đông ô noren
      [1, 5, 3, 2],   // booth 1 (tây, trên)
      [1, 8, 3, 2],   // booth 2 (tây, dưới)
      [13, 5, 3, 2],  // booth 3 (đông)
      [13, 8, 2, 2],  // bàn tròn nhỏ + ghế
      [9, 10, 2, 1]   // máy bán thực券 cạnh cửa
    ],
    doors: { '8,11': { to: 'street', spawn: [14, 4] }, '14,3': { to: 'kitchen', spawn: [2, 9] } },
    npcs: [
      { id: 'staff', name: 'Nhân viên nhà hàng', sprite: 'staffF', tx: 4, ty: 2, behavior: 'stand', scene: 'staff', label: '💬 Gọi nhân viên', range: 84 },
      { id: 'chef', name: 'Đầu bếp', sprite: 'chef', tx: 12, ty: 1, behavior: 'stand', label: '💬 Nói chuyện', range: 56 }
    ],
    objects: [],
    spawnDefault: [8, 9]
  };
})();
