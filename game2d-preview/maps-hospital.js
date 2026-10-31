// maps-hospital.js — Bệnh viện hư cấu 「本郷病院」 (2D, đợt duyệt bối cảnh mẫu).
// Dữ liệu thuần + paint tĩnh theo hợp đồng MAPDEF (xem maps-core.js).
// Bố cục: quầy lễ tân/thanh toán phía trên (NPC sau quầy), quầy phát thuốc phía đông,
// sảnh chờ phía dưới với ghế, bảng số thứ tự và máy đo huyết áp tự phục vụ.
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
    function bench(bx, by, n) { // hàng ghế chờ: lưng ghế + các mặt ngồi riêng
      var x = bx * T, y = by * T;
      RR(x + 2, y + 3, n * T - 4, 9, 3, '#2563eb');
      for (var i = 0; i < n; i++) { RR(x + i * T + 3, y + 14, T - 6, 13, 3, '#60a5fa'); L(x + i * T + 8, y + 27, x + i * T + 8, y + 31, '#94a3b8', 2); L(x + i * T + T - 8, y + 27, x + i * T + T - 8, y + 31, '#94a3b8', 2); }
    }

    /* ===== Biển hiệu cao (vùng y âm) ===== */
    R(-4, -40, 24 * T + 8, 36, '#f8fafc');
    R(-4, -40, 24 * T + 8, 4, '#dc2626'); R(-4, -8, 24 * T + 8, 4, '#0ea5e9');
    RR(58, -32, 20, 20, 3, '#dc2626'); TX('＋', 68, -22, 16, '#fff');
    TX('本郷病院', 210, -22, 20, '#0f3a5c');
    TX('HONGO HOSPITAL', 380, -22, 11, '#64748b');
    TX('内科・小児科・整形外科', 560, -22, 10, '#64748b');

    /* ===== Sàn sáng sạch kiểu bệnh viện ===== */
    R(0, 0, 24 * T, 13 * T, '#eef1ee');
    for (var fy = 0; fy < 13; fy++) for (var fx = 0; fx < 24; fx++) {
      if ((fx + fy) % 2 === 0) R(fx * T, fy * T, T, T, 'rgba(255,255,255,.4)');
      if (H.hash(fx, fy) > 0.88) R(fx * T + 5, fy * T + 6, 14, 3, 'rgba(170,180,175,.45)');
    }
    for (var gx = 0; gx <= 24; gx++) L(gx * T, 0, gx * T, 13 * T, 'rgba(150,160,155,.25)', 1);
    for (var gy = 0; gy <= 13; gy++) L(0, gy * T, 24 * T, gy * T, 'rgba(150,160,155,.25)', 1);
    // Dải dẫn màu xanh từ cửa lên quầy lễ tân
    for (var dl = 0; dl < 6; dl++) R(12 * T + 13, (6 + dl) * T + 8, 6, 14, 'rgba(14,165,233,.4)');

    /* ===== Tường ===== */
    R(0, 0, 24 * T, T, '#e3ecef'); R(0, 24, 24 * T, 8, '#0ea5e9');
    R(0, 0, T, 13 * T, '#ccd6da'); R(23 * T, 0, T, 13 * T, '#ccd6da');
    R(0, 12 * T, 24 * T, T, '#b9c8cd');
    // Biển các khoa khám trên tường trên
    var dept = [['内科', 6], ['小児科', 9], ['整形外科', 12], ['受付', 3]];
    for (var dp = 0; dp < dept.length; dp++) { RR(dept[dp][1] * T + 2, 4, T * 2 - 6, 20, 3, '#ffffff'); TX(dept[dp][0], dept[dp][1] * T + T - 1, 14, 10, '#0f3a5c'); }
    TX('診察室 →', 20 * T + 8, 14, 10, '#0369a1');

    /* ===== Sàn khu sau quầy (hàng 1–2, xám riêng) ===== */
    R(T, T, 22 * T, 2 * T, '#dde3e6');
    // [2,1,4,1] kệ hồ sơ sau lễ tân
    RR(2 * T + 2, T + 2, 4 * T - 4, T - 4, 3, '#94a3b8');
    for (var f1 = 0; f1 < 4; f1++) for (var f2 = 0; f2 < 2; f2++) R(2 * T + 6 + f1 * 28, T + 5 + f2 * 12, 22, 9, ['#f8fafc', '#fde68a', '#bfdbfe', '#fecaca'][(f1 + f2) % 4]);
    TX('カルテ', 4 * T, T + 27, 7, '#334155');
    // [11,1,4,1] bảng hướng dẫn khoa / lịch khám
    RR(11 * T + 2, T + 2, 4 * T - 4, T - 4, 3, '#ffffff'); R(11 * T + 6, T + 6, 4 * T - 12, 10, '#e0f2fe');
    TX('午前 9:00–12:30', 13 * T, T + 11, 8, '#0369a1'); TX('午後 14:00–17:30', 13 * T, T + 23, 8, '#475569');
    // [18,1,3,1] tủ thuốc sau quầy phát thuốc
    RR(18 * T + 2, T + 2, 3 * T - 4, T - 4, 3, '#bbf7d0');
    for (var m1 = 0; m1 < 3; m1++) for (var m2 = 0; m2 < 2; m2++) R(18 * T + 6 + m1 * 28, T + 5 + m2 * 12, 20, 9, ['#ffffff', '#fef3c7', '#dbeafe'][(m1 + m2) % 3]);
    TX('薬局', 19 * T + 16, T + 27, 7, '#166534');

    /* ===== Quầy lễ tân / thanh toán [2,3,12,1] ===== */
    RR(2 * T, 3 * T + 1, 12 * T, T - 2, 4, '#f8fafc');
    R(2 * T, 3 * T + 22, 12 * T, 9, '#0ea5e9'); R(2 * T, 3 * T + 1, 12 * T, 5, '#bae6fd');
    RR(2 * T + 6, 3 * T - 6, 52, 22, 3, '#ffffff'); TX('受付', 2 * T + 32, 3 * T - 1, 11, '#dc2626'); TX('RECEPTION', 2 * T + 32, 3 * T + 10, 6, '#64748b');
    RR(7 * T + 20, 3 * T - 6, 44, 22, 3, '#111827'); R(7 * T + 24, 3 * T - 3, 36, 11, '#67e8f9'); TX('¥0', 8 * T + 10, 3 * T + 3, 8, '#164e63'); // máy tính tiền gần lễ tân (x8)
    TX('会計', 11 * T + 8, 3 * T + 26, 8, '#075985');
    TX('保険証をお出しください', 5 * T + 8, 3 * T + 13, 8, 'rgba(71,85,105,.6)');

    /* ===== Quầy phát thuốc [17,3,5,1] ===== */
    RR(17 * T, 3 * T + 1, 5 * T, T - 2, 4, '#f0fdf4');
    R(17 * T, 3 * T + 22, 5 * T, 9, '#22c55e'); R(17 * T, 3 * T + 1, 5 * T, 5, '#bbf7d0');
    C(17 * T + 18, 3 * T + 12, 8, '#22c55e'); TX('＋', 17 * T + 18, 3 * T + 12, 11, '#fff');
    TX('お薬', 19 * T + 16, 3 * T + 13, 11, '#166534');
    TX('お薬手帳', 21 * T, 3 * T + 26, 7, '#166534');
    // Lối đi giữa hai quầy: biển treo phân luồng
    RR(14 * T + 2, 3 * T + 4, 3 * T - 4, 20, 3, '#fef9c3'); TX('受付 → ｜ ← 薬局', 15 * T + 16, 3 * T + 14, 8, '#854d0e');

    /* ===== Bảng số thứ tự đang gọi (tường khu chờ, hàng 4–5) ===== */
    RR(9 * T + 4, 4 * T + 2, 5 * T - 8, 40, 4, '#111827');
    TX('現在の呼び出し', 11 * T + 16, 4 * T + 12, 9, '#fca5a5');
    TX('A 042', 11 * T + 16, 4 * T + 30, 16, '#fde047');
    RR(15 * T + 6, 4 * T + 2, 58, 26, 3, '#ffffff'); TX('番号札', 15 * T + 35, 4 * T + 10, 9, '#0f3a5c'); TX('発券機', 15 * T + 35, 4 * T + 21, 8, '#64748b');

    /* ===== Ghế chờ (khớp solidsExtra) ===== */
    bench(3, 6, 4); bench(10, 6, 3); bench(17, 6, 4);
    bench(3, 8, 4); bench(10, 8, 3); bench(16, 8, 3);
    TX('待合室', 7 * T, 5 * T + 18, 10, 'rgba(15,58,92,.55)');
    // Bàn tạp chí giữa khu chờ
    RR(7 * T + 4, 7 * T + 6, 2 * T - 8, 18, 3, '#d6c9a8'); R(7 * T + 10, 7 * T + 9, 20, 10, '#fca5a5'); R(8 * T + 2, 7 * T + 9, 18, 10, '#93c5fd');

    /* ===== Máy đo huyết áp tự phục vụ [20,9,2,1] ===== */
    RR(20 * T + 2, 9 * T + 1, 2 * T - 4, T - 2, 4, '#e0f2fe'); R(20 * T + 6, 9 * T + 4, 24, 13, '#38bdf8');
    TX('120', 20 * T + 18, 9 * T + 11, 9, '#082f49'); C(21 * T + 18, 9 * T + 12, 8, '#64748b'); C(21 * T + 18, 9 * T + 12, 5, '#cbd5e1');
    TX('血圧測定', 21 * T, 9 * T + 25, 8, '#075985');

    /* ===== Cây xanh + thùng rác y tế góc sảnh ===== */
    C(2 * T, 10 * T + 20, 11, '#22c55e'); C(2 * T - 8, 10 * T + 14, 8, '#4ade80'); C(2 * T + 9, 10 * T + 13, 8, '#16a34a'); RR(2 * T - 8, 10 * T + 24, 17, 9, 2, '#b45309');
    RR(21 * T + 4, 10 * T + 4, 22, 26, 3, '#facc15'); TX('医療', 21 * T + 15, 10 * T + 13, 7, '#713f12'); TX('ごみ', 21 * T + 15, 10 * T + 23, 7, '#713f12');

    /* ===== Cửa ra (12,12): cửa kính tự động + thảm + biển 出口 ===== */
    RR(10 * T + 2, 11 * T + 4, 4 * T - 4, T - 9, 3, '#64748b'); TX('出口', 12 * T + 16, 11 * T + 16, 11, '#e2e8f0');
    R(12 * T - 2, 12 * T + 1, T + 4, T - 2, '#475569');
    R(12 * T + 2, 12 * T + 4, T - 4, T - 7, 'rgba(186,230,253,.92)'); R(12 * T + 15, 12 * T + 4, 3, T - 7, '#e5e7eb');
    L(12 * T + 5, 12 * T + 25, 12 * T + 12, 12 * T + 9, 'rgba(255,255,255,.8)', 2);
    TX('自動', 12 * T + 16, 12 * T + 10, 7, '#0369a1');
    RR(18 * T + 4, 11 * T + 5, 56, 22, 3, '#ffffff'); TX('駐車場 →', 18 * T + 32, 11 * T + 16, 9, '#475569');
  }

  window.MAPDEF['hospital'] = {
    id: 'hospital',
    label: '🏥 Bệnh viện 本郷病院',
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
      '############D###########'
    ],
    paint: paint,
    solidsExtra: [
      [2, 1, 4, 1],   // kệ hồ sơ sau quầy lễ tân
      [11, 1, 4, 1],  // bảng lịch khám / hướng dẫn khoa
      [18, 1, 3, 1],  // tủ thuốc sau quầy phát thuốc
      [2, 3, 12, 1],  // quầy lễ tân + thanh toán
      [17, 3, 5, 1],  // quầy phát thuốc
      [3, 6, 4, 1],   // ghế chờ 1
      [10, 6, 3, 1],  // ghế chờ 2
      [17, 6, 4, 1],  // ghế chờ 3
      [3, 8, 4, 1],   // ghế chờ 4
      [10, 8, 3, 1],  // ghế chờ 5
      [16, 8, 3, 1],  // ghế chờ 6
      [20, 9, 2, 1],  // máy đo huyết áp tự phục vụ
      [1, 10, 2, 1]   // chậu cây góc sảnh (khớp tranh vẽ)
    ],
    doors: { '12,12': { to: 'shotengai', spawn: [28, 9] } },
    npcs: [
      { id: 'hospital-reception', name: 'Lễ tân bệnh viện', sprite: 'nurse', tx: 8, ty: 2, behavior: 'stand', scene: 'hospital-reception', label: '💬 Tới quầy lễ tân', range: 96 }
    ],
    objects: [
      { tx: 17, ty: 3, tw: 5, th: 1, interact: { scene: 'hospital-pharmacy', label: '💊 Tới quầy phát thuốc' } }
    ],
    spawnDefault: [12, 10]
  };
})();
