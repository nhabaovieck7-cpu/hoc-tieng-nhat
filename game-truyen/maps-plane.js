// maps-plane.js — Bản đồ 'may-bay' ✈️ Trong máy bay / tới Narita (M3 của Mở đầu §6e).
// Bản đồ chuyển tiếp nhỏ: khoang hành khách, ghế cửa sổ nhìn ra cánh máy bay, cửa ra ở
// đầu đông → 'room' (phòng trọ ở Nhật) tượng trưng cho chặng "hạ cánh — về phòng".
// Cảnh trên máy bay ('flight') do lớp truyện tự kích hoạt khi vào bản đồ (flow.js).
(function () {
  'use strict';

  var grid = [
    '################',
    '#..............#',
    '#..............#',
    '#..............#',
    '#..............D',
    '#..............#',
    '#..............#',
    '#..............#',
    '################'
  ];

  function paint(g, H) {
    var T = H.T;
    function R(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function RR(x, y, w, h, r, c) { g.fillStyle = c; H.rr(g, x, y, w, h, r); }
    function C(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function L(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function TX(t, x, y, s, c, a, wgt) { H.txt(g, t, x, y, s, c, a, wgt); }

    // ===== Ngoài cửa sổ (vùng y âm): trời chiều + cánh máy bay =====
    R(0, -40, 16 * T, 40, '#f2c98a');
    RR(40, -34, 64, 12, 6, 'rgba(255,255,255,.75)');
    RR(330, -30, 80, 13, 6, 'rgba(255,255,255,.7)');
    g.fillStyle = '#9aa7b1'; g.beginPath(); g.moveTo(150, -6); g.lineTo(300, -34); g.lineTo(330, -34); g.lineTo(210, -6); g.closePath(); g.fill(); // cánh
    R(292, -34, 8, 12, '#c73e3a');

    // ===== Thân khoang: tường kem + sàn + lối đi giữa =====
    R(0, 0, 16 * T, 9 * T, '#ddd6c8');
    R(T, T, 14 * T, 7 * T, '#c9cfd6');
    R(7 * T, T, 2 * T, 7 * T, '#7a4a56');                                   // thảm lối đi
    for (var y = 1; y < 8; y++) { R(7 * T + 4, y * T + 6, 2, 20, 'rgba(255,220,150,.35)'); R(9 * T - 6, y * T + 6, 2, 20, 'rgba(255,220,150,.35)'); }
    // Khoang để đồ phía trên + đèn đọc sách
    R(T, T - 6, 6 * T, 14, '#e8e2d4'); R(10 * T, T - 6, 5 * T, 14, '#e8e2d4');
    for (var d = 0; d < 5; d++) { C(2 * T + d * 26, T + 12, 2, '#ffd94d'); C(11 * T + d * 26, T + 12, 2, '#ffd94d'); }

    // ===== Cửa sổ khoang dọc tường bắc + vệt nắng =====
    for (var wI = 0; wI < 6; wI++) {
      var wx = 1.6 * T + wI * 2.2 * T;
      g.fillStyle = '#f6e3b8'; g.beginPath(); g.ellipse(wx, 20, 11, 13, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#bfe0ee'; g.beginPath(); g.ellipse(wx, 20, 8, 10, 0, 0, Math.PI * 2); g.fill();
    }
    // Màn hình trước khoang: bản đồ đường bay
    RR(7 * T - 6, 2, 2 * T + 12, 24, 3, '#232a33');
    TX('HANOI → NARITA', 8 * T, 10, 7, '#8fd0ff');
    L(7 * T + 2, 20, 9 * T - 2, 8, '#ffd94d', 1); C(7 * T + 2, 20, 1.8, '#7ac74f'); C(9 * T - 2, 8, 1.8, '#e0533d');

    // ===== Dãy ghế (khớp solidsExtra): ghế xanh + tựa đầu trắng + khay bàn =====
    function seatBlock(x0, y0) {
      for (var s = 0; s < 4; s++) {
        var px = x0 * T + s * T;
        RR(px + 3, y0 * T + 8, 26, 22, 4, '#31517d');
        RR(px + 6, y0 * T + 2, 20, 10, 3, '#eef1f3');                 // tựa đầu
        R(px + 8, y0 * T + 20, 16, 5, '#27405f');                     // túi ghế + tạp chí
        R(px + 10, y0 * T + 21, 5, 3, '#e0533d'); R(px + 17, y0 * T + 21, 5, 3, '#e8a13a');
      }
    }
    seatBlock(2, 2); seatBlock(10, 2);
    seatBlock(2, 4); seatBlock(10, 4);
    seatBlock(2, 6); seatBlock(10, 6);
    // Khăn tay thêu của Linh gấp trên ghế của nhân vật chính (ghế 5,3 — cạnh cửa sổ)
    RR(5 * T + 8, 3 * T + 12, 15, 10, 2, '#fdf3f6'); TX('💗', 5 * T + 15, 3 * T + 17, 8, '#d96a86');

    // ===== Cửa máy bay (đông, ô D) + biển EXIT =====
    RR(15 * T + 3, 4 * T + 2, 26, 30, 4, '#aeb6bd');
    g.fillStyle = '#dfe7ec'; g.beginPath(); g.ellipse(15 * T + 16, 4 * T + 12, 5, 7, 0, 0, Math.PI * 2); g.fill();
    RR(15 * T + 7, 3 * T + 18, 18, 9, 2, '#c73e3a'); TX('EXIT', 15 * T + 16, 3 * T + 22, 7, '#ffffff');
    TX('Cửa ra — xuống máy bay', 15 * T + 16, 5 * T + 10, 6, '#5a4632');
  }

  window.MAPDEF = window.MAPDEF || {};
  window.MAPDEF['may-bay'] = {
    id: 'may-bay',
    label: '✈️ Trên máy bay — bay sang Nhật',
    grid: grid,
    paint: paint,
    solidsExtra: [
      [2, 2, 4, 1], [10, 2, 4, 1],
      [2, 4, 4, 1], [10, 4, 4, 1],
      [2, 6, 4, 1], [10, 6, 4, 1]
    ],
    doors: { '15,4': { to: 'room', spawn: [7, 5] } },
    npcs: [],
    objects: [
      { tx: 5, ty: 3, tw: 1, th: 1, interact: { scene: 'flight-window', label: '🪟 Nhìn ra cửa sổ máy bay' } }
    ],
    spawnDefault: [8, 7]
  };
})();
