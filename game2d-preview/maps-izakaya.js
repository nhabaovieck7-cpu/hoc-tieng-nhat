// maps-izakaya.js — Quán nhậu hư cấu 「居酒屋 新橋」 (2D, đợt duyệt bối cảnh mẫu).
// Dữ liệu thuần + paint tĩnh theo hợp đồng MAPDEF (xem maps-core.js).
// Bố cục: bếp mở + kệ rượu phía trên, counter dài (chủ quán đứng sau quầy),
// bàn thấp + đệm ngồi phía dưới, thực đơn viết tay dán tường đông, đèn lồng đỏ,
// rèm のれん ở cửa ra vào.
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
    function lantern(cx, cy) { // đèn lồng đỏ treo: quầng sáng + thân lồng + chữ
      C(cx, cy, 24, 'rgba(239,68,68,.15)'); C(cx, cy, 13, 'rgba(239,68,68,.18)');
      L(cx, cy - 24, cx, cy - 9, '#5b3413', 2);
      g.fillStyle = '#dc2626'; g.beginPath(); g.ellipse(cx, cy, 10, 12, 0, 0, Math.PI * 2); g.fill();
      L(cx - 9, cy - 4, cx + 9, cy - 4, 'rgba(0,0,0,.25)', 1); L(cx - 9, cy + 4, cx + 9, cy + 4, 'rgba(0,0,0,.25)', 1);
      TX('酒', cx, cy, 9, '#fff');
    }
    function lowTable(bx, by) { // bàn thấp 3x2 trên thảm tatami + đệm 2 bên + đồ ăn nhỏ
      var x = bx * T, y = by * T;
      R(x, y, 3 * T, 2 * T, '#a8b98a'); L(x, y + T, x + 3 * T, y + T, 'rgba(70,90,50,.5)', 1); L(x + T, y, x + T, y + 2 * T, 'rgba(70,90,50,.35)', 1); L(x + 2 * T, y, x + 2 * T, y + 2 * T, 'rgba(70,90,50,.35)', 1);
      RR(x + 14, y + 18, 3 * T - 28, 2 * T - 36, 4, '#6b4423'); R(x + 18, y + 22, 3 * T - 36, 4, '#9a6a38');
      C(x + 34, y + 32, 6, '#f8fafc'); C(x + 52, y + 32, 6, '#fef3c7'); C(x + 68, y + 32, 4, '#fca5a5'); // đĩa nhỏ
      C(x + 44, y + 30, 3, '#fbbf24'); C(x + 60, y + 34, 3, '#f59e0b'); // ly bia vàng
      RR(x + 8, y + 4, 18, 10, 2, '#475569'); RR(x + 3 * T - 26, y + 4, 18, 10, 2, '#475569'); // đệm trên
      RR(x + 8, y + 2 * T - 14, 18, 10, 2, '#475569'); RR(x + 3 * T - 26, y + 2 * T - 14, 18, 10, 2, '#475569'); // đệm dưới
    }

    /* ===== Biển hiệu cao (vùng y âm): biển gỗ + đèn lồng ===== */
    R(-4, -40, 18 * T + 8, 36, '#2b1408');
    R(-4, -40, 18 * T + 8, 4, '#dc2626'); R(-4, -8, 18 * T + 8, 4, '#b45309');
    TX('居酒屋 新橋', 190, -22, 20, '#fde68a');
    TX('IZAKAYA SHINBASHI', 360, -22, 11, '#fcd34d');
    lantern(52, -20); lantern(18 * T - 52, -20);

    /* ===== Sàn gỗ tối ấm ===== */
    R(0, 0, 18 * T, 11 * T, '#8a5a30');
    for (var fy = 0; fy < 11; fy++) for (var fx = 0; fx < 18; fx++) {
      var hh = H.hash(fx, fy);
      if (hh > 0.5) R(fx * T, fy * T, T, T, 'rgba(255,210,140,.09)'); else R(fx * T, fy * T, T, T, 'rgba(50,25,5,.09)');
      if (hh > 0.82) L(fx * T + 5, fy * T + 17, fx * T + 23, fy * T + 17, 'rgba(60,32,8,.35)', 1);
    }
    for (var gy = 0; gy <= 11; gy++) L(0, gy * T, 18 * T, gy * T, 'rgba(60,32,8,.4)', 1);

    /* ===== Tường ===== */
    R(0, 0, 18 * T, T, '#e8d9b8'); R(0, 24, 18 * T, 8, '#7c4a21');
    R(0, 0, T, 11 * T, '#9a6a38'); R(17 * T, 0, T, 11 * T, '#9a6a38');
    R(0, 10 * T, 18 * T, T, '#7c4a21');
    // Tanzaku thực đơn viết tay dán tường trên (trang trí)
    var tz = ['焼鳥', '枝豆', '刺身', '唐揚', '出汁巻', 'おでん'];
    for (var ti = 0; ti < tz.length; ti++) { var txp = 2 * T + 6 + ti * 44; RR(txp, 3, 34, 25, 2, '#f5deb3'); TX(tz[ti], txp + 17, 15, 9, '#5b3413'); }

    /* ===== Bếp mở phía trên (sàn thép/gạch hàng 1–2) ===== */
    R(T, T, 16 * T, 2 * T, '#b9bdc0');
    for (var ky = 1; ky < 3; ky++) for (var kx = 1; kx < 17; kx++) { if ((kx + ky) % 2) R(kx * T, ky * T, T, T, 'rgba(255,255,255,.22)'); }
    // [2,1,4,1] bếp nướng than + vỉ nướng (xiên que)
    RR(2 * T + 2, T + 2, 4 * T - 4, T - 4, 3, '#374151'); R(2 * T + 6, T + 8, 4 * T - 12, 12, '#111827');
    for (var sk = 0; sk < 5; sk++) { L(2 * T + 12 + sk * 20, T + 20, 2 * T + 20 + sk * 20, T + 6, '#d6a05a', 2); C(2 * T + 17 + sk * 20, T + 12, 4, ['#b45309', '#22c55e', '#ef4444'][(sk) % 3]); }
    TX('炭火', 4 * T, T + 27, 8, '#fca5a5');
    C(3 * T + 10, T + 2, 3, 'rgba(255,255,255,.5)'); C(4 * T + 20, T + 0, 4, 'rgba(255,255,255,.4)'); // khói/hơi
    // [6,1,5,1] kệ rượu sau quầy: chai sake / shochu đủ dáng
    RR(6 * T + 2, T + 1, 5 * T - 4, T - 2, 3, '#5b3413');
    var bots = ['#365314', '#7f1d1d', '#1e3a5f', '#78350f', '#14532d', '#581c87', '#7c2d12', '#164e63'];
    for (var bt = 0; bt < 8; bt++) { var bx2 = 6 * T + 8 + bt * 18; R(bx2, T + 8, 9, 16, bots[bt]); R(bx2 + 3, T + 3, 3, 5, bots[bt]); }
    TX('地酒', 8 * T + 16, T + 28, 7, '#fde68a');
    // [12,1,4,1] tủ lạnh + bàn sơ chế phía đông bếp
    RR(12 * T + 2, T + 2, 2 * T - 4, T - 4, 3, '#9ca3af'); L(13 * T, T + 3, 13 * T, 2 * T - 3, '#6b7280', 2); TX('冷蔵', 12 * T + 16, T + 16, 8, '#374151');
    RR(14 * T + 2, T + 3, 2 * T - 4, T - 6, 3, '#d6a05a'); R(14 * T + 8, T + 8, 22, 13, '#f5deb3'); C(15 * T + 8, T + 12, 5, '#22c55e'); C(15 * T + 18, T + 18, 4, '#f97316');
    // [14,3,2,1] quầy ra món phía đông (pass)
    RR(14 * T + 2, 3 * T + 3, 2 * T - 4, T - 6, 3, '#e7e5e4'); R(14 * T + 4, 3 * T + 5, 2 * T - 8, 6, 'rgba(239,68,68,.5)');
    C(14 * T + 20, 3 * T + 20, 7, '#fff7ed'); C(15 * T + 14, 3 * T + 20, 7, '#ffedd5'); TX('パス', 15 * T, 3 * T + 9, 7, '#991b1b');

    /* ===== Counter dài [2,3,10,1] ===== */
    RR(2 * T, 3 * T + 1, 10 * T, T - 2, 4, '#6e4526');
    R(2 * T, 3 * T + 1, 10 * T, 8, '#c98d4e');
    for (var cp = 0; cp < 5; cp++) L(3 * T + cp * 58, 3 * T + 18, 3 * T + cp * 58, 4 * T - 2, 'rgba(40,20,2,.35)', 2);
    // Đĩa お通し + ly bia + bình rượu trên counter
    for (var ot = 0; ot < 4; ot++) { var ox = 3 * T + 22 + ot * 66; C(ox, 3 * T + 6, 5, '#f8fafc'); C(ox + 13, 3 * T + 6, 3, '#fbbf24'); R(ox + 22, 3 * T + 2, 5, 8, '#365314'); }
    TX('カウンター', 7 * T + 10, 3 * T + 24, 8, '#fde68a');
    // Ghế tròn dọc counter (hàng 4, phía khách)
    for (var st = 0; st < 5; st++) { var sx = 3 * T + 20 + st * 58; C(sx, 4 * T + 12, 10, 'rgba(0,0,0,.2)'); C(sx, 4 * T + 10, 10, '#991b1b'); C(sx, 4 * T + 10, 6, '#b91c1c'); }
    lantern(4 * T + 16, 4 * T + 6); lantern(10 * T + 16, 4 * T + 6); lantern(14 * T + 24, 5 * T + 2);

    /* ===== Bàn thấp + đệm (khớp solidsExtra) ===== */
    lowTable(2, 6); lowTable(7, 6); lowTable(13, 6);
    TX('お座敷', 9 * T + 16, 5 * T + 18, 10, 'rgba(253,230,138,.6)');

    /* ===== Tường thực đơn viết tay phía đông [16,5,1,2] (điểm tương tác) ===== */
    RR(16 * T + 3, 5 * T + 2, T - 6, 2 * T - 4, 3, '#f5deb3');
    VT('本日のおすすめ', 16 * T + 16, 5 * T + 11, 7, '#7c2d12');
    L(16 * T + 7, 6 * T + 14, 16 * T + 25, 6 * T + 14, 'rgba(124,45,18,.5)', 1);
    TX('¥?', 16 * T + 16, 6 * T + 24, 9, '#b91c1c');

    /* ===== Tủ giày + cây góc cửa ===== */
    RR(T + 3, 9 * T + 4, 2 * T - 6, T - 8, 3, '#5b3413'); for (var sh = 0; sh < 3; sh++) R(T + 8 + sh * 16, 9 * T + 18, 12, 6, ['#334155', '#7f1d1d', '#365314'][sh]); TX('下駄箱', 2 * T, 9 * T + 11, 8, '#fde68a');
    C(16 * T, 9 * T + 18, 10, '#22c55e'); C(16 * T - 7, 9 * T + 12, 7, '#4ade80'); RR(16 * T - 7, 9 * T + 23, 15, 8, 2, '#b45309');

    /* ===== Cửa ra (9,10): thảm + のれん đỏ/trắng + đèn lồng cửa ===== */
    RR(7 * T + 2, 9 * T + 4, 5 * T - 4, T - 9, 3, '#7f1d1d'); TX('いらっしゃいませ', 9 * T + 16, 9 * T + 16, 10, '#fecaca');
    R(9 * T - 2, 10 * T + 1, T + 4, T - 2, '#5b3413'); R(9 * T + 2, 10 * T + 12, T - 4, T - 15, 'rgba(120,70,30,.85)');
    // のれん chia 3 múi treo trên cửa
    for (var nr = 0; nr < 3; nr++) { R(9 * T - 2 + nr * 12, 10 * T - 8, 11, 17, '#b91c1c'); }
    TX('わ', 9 * T + 4, 10 * T + 0, 7, '#fff'); TX('か', 9 * T + 16, 10 * T + 0, 7, '#fff'); TX('ば', 9 * T + 28, 10 * T + 0, 7, '#fff');
    lantern(7 * T + 10, 10 * T + 14); lantern(11 * T + 22, 10 * T + 14);
    RR(12 * T + 4, 9 * T + 5, 54, 22, 3, '#fff7ed'); TX('営業中', 12 * T + 31, 9 * T + 12, 9, '#7c2d12'); TX('17:00–23:00', 12 * T + 31, 9 * T + 22, 7, '#7c2d12');
  }

  window.MAPDEF['izakaya'] = {
    id: 'izakaya',
    label: '🍶 Quán nhậu 居酒屋 新橋',
    grid: [
      '##################',
      '#................#',
      '#................#',
      '#................#',
      '#................#',
      '#................#',
      '#................#',
      '#................#',
      '#................#',
      '#................#',
      '#########D########'
    ],
    paint: paint,
    solidsExtra: [
      [2, 1, 4, 1],   // bếp nướng than + vỉ nướng
      [6, 1, 5, 1],   // kệ rượu sau quầy
      [12, 1, 4, 1],  // tủ lạnh + bàn sơ chế
      [2, 3, 10, 1],  // counter dài
      [14, 3, 2, 1],  // quầy ra món (pass) phía đông
      [2, 6, 3, 2],   // bàn thấp 1 + đệm
      [7, 6, 3, 2],   // bàn thấp 2 + đệm
      [13, 6, 3, 2],  // bàn thấp 3 + đệm
      [16, 5, 1, 2],  // tường thực đơn viết tay (điểm tương tác)
      [1, 9, 2, 1],   // tủ giày cạnh cửa
      [16, 9, 1, 1]   // chậu cây góc cửa (đông-nam)
    ],
    doors: { '9,10': { to: 'shotengai', spawn: [53, 4] } },
    npcs: [
      { id: 'izakaya-master', name: 'Chủ quán nhậu', sprite: 'chef', tx: 9, ty: 2, behavior: 'stand', scene: 'izakaya-master', label: '💬 Gọi chủ quán', range: 96 }
    ],
    objects: [
      { tx: 16, ty: 5, tw: 1, th: 2, interact: { scene: 'izakaya-menu', label: '📜 Xem thực đơn viết tay' } }
      ,{ tx: 2, ty: 5, tw: 2, th: 2, interact: { scene: 'bonenkai', label: '🍻 Bảng tin — tiệc tất niên 忘年会 của công ty (tháng 12)' } }
    ],
    spawnDefault: [9, 8]
  };
})();
