// maps-station.js — Bản đồ 'station' 🚉 Trước ga 新宿駅 (2D, đợt duyệt bối cảnh mẫu).
// Tự đăng ký theo hợp đồng maps-core.js: dữ liệu thuần + paint(g,H), KHÔNG giữ trạng thái chạy,
// KHÔNG tham chiếu người chơi. Tên cơ sở chỉ dùng tên hư cấu: 新宿駅.
(function () {
  'use strict';

  // --- Grid 34×13, dựng bằng hàm thuần để bảo đảm mọi hàng cùng độ dài 34 ---
  function row(fill, overrides) {
    var a = [], i, k;
    for (i = 0; i < 34; i++) a.push(fill);
    if (overrides) for (k in overrides) a[+k] = overrides[k];
    return a.join('');
  }
  var HASH34 = row('#');
  var grid = [
    HASH34,                       // 0  tòa nhà ga (chặn)
    HASH34,                       // 1  tòa nhà ga (chặn)
    HASH34,                       // 2  tòa nhà ga (chặn)
    HASH34,                       // 3  tòa nhà ga (chặn)
    HASH34,                       // 4  tòa nhà ga (chặn)
    row('s', { 0: 'D' }),         // 5  quảng trường + cửa rìa tây
    row('s', { 0: 'D' }),         // 6  quảng trường + cửa rìa tây
    row('s', { 0: 'D' }),         // 7  quảng trường + cửa rìa tây
    row('s'),                     // 8  quảng trường
    row('s'),                     // 9  quảng trường
    row('s'),                     // 10 quảng trường
    row('s'),                     // 11 quảng trường (tactile paving)
    HASH34                        // 12 rìa dưới (chặn)
  ];

  function paint(g, H) {
    var T = H.T, W = 34 * T;

    // ---------- helpers cục bộ (thuần vẽ, không trạng thái) ----------
    function R(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function RR(x, y, w, h, r, c) { g.fillStyle = c; H.rr(g, x, y, w, h, r); }
    function C(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function RING(cx, cy, r, c, lw) { g.strokeStyle = c; g.lineWidth = lw || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function L(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function TX(t, x, y, s, c, a, wgt) { H.txt(g, t, x, y, s, c, a, wgt); }
    function silhouette(px, py, color) {
      // bóng người chờ vẽ tĩnh: đầu + thân + chân, tông tối giản
      C(px + 16, py + 6, 5, color);
      RR(px + 10, py + 11, 12, 14, 5, color);
      R(px + 11, py + 25, 4, 7, color); R(px + 17, py + 25, 4, 7, color);
      RR(px + 21, py + 14, 6, 9, 2, color); // cặp/túi xách
    }
    function treePlanter(tx, ty) {
      var px = tx * T, py = ty * T;
      RR(px + 3, py + 20, 26, 10, 2, '#8a7a66');
      R(px + 14, py + 2, 4, 20, '#6b4a30');
      C(px + 16, py - 2, 15, '#4e7d3a'); C(px + 5, py + 6, 10, '#5d8f45'); C(px + 27, py + 6, 10, '#679a4c');
    }

    // ================= TRỜI (vùng y âm) =================
    R(0, -40, W, 40, '#bfd9e8');
    RR(120, -34, 56, 11, 6, 'rgba(255,255,255,.85)');
    RR(760, -36, 62, 12, 6, 'rgba(255,255,255,.8)');
    R(0, -6, W, 6, '#4c525a');                                     // gờ mái ga chạy ngang

    // ================= NỀN TỪNG Ô =================
    var x, y, px, py, v;
    for (y = 0; y < 13; y++) {
      for (x = 0; x < 34; x++) {
        px = x * T; py = y * T; v = H.hash(x, y);
        if (y <= 4) {
          R(px, py, T, T, (x + y) % 2 ? '#ccd0d6' : '#c4c9cf');   // tường ga ốp đá sáng
          if (v > 0.72) R(px, py, T, T, 'rgba(0,0,0,0.04)');
        } else if (y <= 11) {
          R(px, py, T, T, (x + y) % 2 ? '#cfc9ba' : '#c6c0ae');   // quảng trường lát gạch
          if (v > 0.78) R(px + 6, py + 9, 3, 2, 'rgba(90,80,60,.18)');
          g.strokeStyle = 'rgba(100,95,80,.30)'; g.lineWidth = 1;
          g.strokeRect(px + 0.5, py + 0.5, T - 1, T - 1);
        } else {
          R(px, py, T, T, '#5d7350');                              // hàng cây rìa dưới
          C(px + 9 + v * 12, py + 11, 6, '#54703f'); C(px + 21, py + 22, 7, '#688557');
          if (v > 0.72) C(px + 12 + v * 8, py + 8, 1.8, '#e8e3a1');
        }
      }
    }

    // ================= MẶT TIỀN GA =================
    R(0, 0, W, 12, '#5a6068');                                     // dải mái / parapet
    // cửa sổ hai cánh bên (kính tối + khung)
    [1, 2, 4, 5].forEach(function (wx) { RR(wx * T + 3, 20, 26, 24, 2, '#f0f2f4'); RR(wx * T + 5, 22, 22, 20, 1, '#7f96a8'); });
    [28, 29, 31, 32].forEach(function (wx) { RR(wx * T + 3, 20, 26, 24, 2, '#f0f2f4'); RR(wx * T + 5, 22, 22, 20, 1, '#7f96a8'); });
    [1, 4, 29, 31].forEach(function (wx) { RR(wx * T + 3, 56, 26, 24, 2, '#f0f2f4'); RR(wx * T + 5, 58, 22, 20, 1, '#93a9ba'); });

    // đồng hồ tròn trên mặt tiền (bên trái biển chính)
    C(7 * T + 16, 36, 19, '#f7f7f2'); RING(7 * T + 16, 36, 19, '#37404a', 3); RING(7 * T + 16, 36, 15, '#c8ccd0', 1);
    L(7 * T + 16, 36, 7 * T + 16, 25, '#222', 3); L(7 * T + 16, 36, 7 * T + 25, 40, '#222', 2); C(7 * T + 16, 36, 2.4, '#c73e3a');
    TX('時計', 7 * T + 16, 62, 7, '#5a6068');

    // BIỂN LỚN 新宿駅
    RR(11 * T, 14, 12 * T, 46, 6, '#20324a');
    R(11 * T, 54, 12 * T, 6, '#c73e3a');                           // sọc đỏ dưới biển ga
    TX('新宿駅', 17 * T, 36, 30, '#ffffff');
    TX('しんじゅく', 21 * T + 20, 36, 11, '#a9c6e8');

    // ---- Khu kính sảnh chính x13–20, hàng 2–4: thấy bên trong ----
    R(13 * T, 64, 8 * T, 96, '#26303a');                           // nội thất tối sau kính
    for (var fr = 0; fr <= 8; fr++) L(13 * T + fr * T, 64, 13 * T + fr * T, 160, '#4b5a66', 2);
    L(13 * T, 112, 21 * T, 112, '#4b5a66', 2);
    // bảng giờ tàu điện tử: nền đen, chữ cam — 行先・時刻 (trang trí)
    RR(14 * T + 2, 70, 6 * T - 4, 34, 3, '#0c0d0f');
    TX('行先 ・ 時刻', 17 * T, 78, 10, '#ffb347');
    TX('のぼり  9:05', 17 * T, 89, 10, '#ff9435');
    TX('くだり  9:12', 17 * T, 99, 10, '#ff9435');
    // quầy soát vé sau kính (hàng 4): 3 làn cửa — xanh đi được / đỏ cấm
    [13, 16, 18].forEach(function (gx, i) {
      var bx = gx * T + 2;
      RR(bx, 128, 26, 30, 3, '#8b939c');
      RR(bx + 3, 131, 20, 12, 2, '#39424c');
      if (i === 2) { TX('×', bx + 13, 150, 13, '#e0533d'); }
      else { TX('↓', bx + 13, 150, 13, '#39d353'); C(bx + 13, 136, 4, '#39d353'); }
    });
    RR(15 * T + 2, 128, 26, 30, 3, '#788089'); TX('IC', 15 * T + 15, 143, 10, '#dbeafe'); // làn IC ở giữa
    // cửa kính tự động chính giữa (chân hàng 4)
    RR(16 * T + 14, 132, 36, 28, 2, '#5d707c');
    RR(16 * T + 17, 135, 15, 25, 1, '#cfe8f2'); RR(16 * T + 34, 135, 15, 25, 1, '#cfe8f2');
    // biển のりば / 出口 hai bên cửa
    RR(11 * T + 4, 3 * T + 6, 52, 18, 3, '#31517d'); TX('のりば', 11 * T + 30, 3 * T + 15, 12, '#fff');
    RR(21 * T + 8, 3 * T + 6, 52, 18, 3, '#2e7d4f'); TX('出口', 21 * T + 34, 3 * T + 15, 12, '#fff');
    TX('きっぷうりば →', 22 * T + 14, 2 * T + 16, 10, '#31517d');
    // mái che sảnh kéo ra quảng trường
    g.fillStyle = '#374151'; g.beginPath();
    g.moveTo(12 * T, 156); g.lineTo(22 * T, 156); g.lineTo(22 * T + 10, 170); g.lineTo(12 * T - 10, 170); g.closePath(); g.fill();
    L(12 * T + 4, 170, 12 * T + 4, 5 * T + 26, '#4b5563', 3); L(21 * T + 28, 170, 21 * T + 28, 5 * T + 26, '#4b5563', 3);
    // poster trên tường cánh phải + bảng giờ giấy cánh trái
    RR(26 * T + 3, 66, 26, 52, 2, '#fdf3e3'); TX('マナー', 26 * T + 16, 76, 9, '#b03a30');
    C(26 * T + 16, 90, 6, '#f2c49b'); RR(26 * T + 10, 96, 12, 9, 3, '#31517d'); TX('ゆずります', 26 * T + 16, 114, 6, '#5a4632');
    RR(2 * T + 3, 66, 26, 42, 2, '#f7f7f2'); TX('時刻表', 2 * T + 16, 74, 8, '#37404a');
    for (var tt = 0; tt < 4; tt++) L(2 * T + 7, 84 + tt * 6, 2 * T + 25, 84 + tt * 6, '#a7adb3', 1);
    // biển tên ga dọc trên cột trước sảnh (trái)
    L(10 * T + 6, 5 * T + 30, 10 * T + 6, 3 * T + 8, '#6b7280', 3);
    RR(10 * T - 5, 3 * T + 2, 22, 40, 3, '#20324a'); TX('若', 10 * T + 6, 3 * T + 13, 11, '#fff'); TX('葉', 10 * T + 6, 3 * T + 25, 11, '#fff'); TX('駅', 10 * T + 6, 3 * T + 37, 11, '#fff');

    // ================= QUẢNG TRƯỜNG =================
    // họa tiết vòng tròn lát gạch giữa sân
    RING(17 * T + 16, 8 * T + 16, 46, 'rgba(120,110,90,.5)', 3); RING(17 * T + 16, 8 * T + 16, 30, 'rgba(120,110,90,.35)', 2);
    // cống + nứt gạch
    RR(6 * T + 6, 9 * T + 24, 20, 5, 1, '#8f9296'); RR(27 * T + 6, 6 * T + 24, 20, 5, 1, '#8f9296');
    L(300, 9 * T + 10, 330, 9 * T + 16, 'rgba(90,85,70,.4)', 1);

    // tactile paving hàng 11 (dải chấm vàng suốt chiều ngang)
    for (x = 0; x < 34; x++) {
      RR(x * T + 3, 11 * T + 10, 26, 12, 3, '#eec93c');
      for (var d = 0; d < 3; d++) C(x * T + 9 + d * 7, 11 * T + 16, 1.7, '#c9a227');
    }
    // dải dẫn tactile từ cửa ga xuống hàng 11 (cột 16–17)
    for (y = 5; y < 11; y++) {
      RR(16 * T + 26, y * T + 3, 12, 26, 3, '#eec93c');
      L(16 * T + 29, y * T + 8, 16 * T + 35, y * T + 8, '#c9a227', 2); L(16 * T + 29, y * T + 16, 16 * T + 35, y * T + 16, '#c9a227', 2); L(16 * T + 29, y * T + 24, 16 * T + 35, y * T + 24, '#c9a227', 2);
    }
    // biển chỉ đường gắn trên cột ở cửa tây (0,5–0,7) → về đường phố (bổ sung 13:33 31/10/2026 —
    // trước đây cửa tây chỉ có mũi tên sơn dưới đất, không có biển tên nơi tới)
    L(6, 4 * T + 26, 6, 4 * T + 2, '#6b7280', 3);
    RR(0, 4 * T - 14, 3 * T, 19, 3, '#31517d'); TX('← 吉祥寺通り', 1.5 * T, 4 * T - 4, 10, '#ffffff');
    // mũi tên sơn dẫn ra cửa tây (về đường phố)
    g.fillStyle = 'rgba(255,255,255,.65)';
    g.beginPath(); g.moveTo(1 * T + 4, 6 * T + 16); g.lineTo(1 * T + 20, 6 * T + 7); g.lineTo(1 * T + 20, 6 * T + 12); g.lineTo(2 * T + 24, 6 * T + 12); g.lineTo(2 * T + 24, 6 * T + 20); g.lineTo(1 * T + 20, 6 * T + 20); g.lineTo(1 * T + 20, 6 * T + 25); g.closePath(); g.fill();

    // ---- Bốt điện thoại xanh lá kiểu Nhật (5,5)–(5,6) ----
    RR(5 * T + 2, 5 * T - 14, 28, 78, 3, '#2e7d4f');
    RR(5 * T + 5, 5 * T - 4, 22, 40, 2, '#cfe8d8');
    L(5 * T + 16, 5 * T - 4, 5 * T + 16, 5 * T + 36, '#2e7d4f', 2); L(5 * T + 5, 5 * T + 16, 5 * T + 27, 5 * T + 16, '#2e7d4f', 2);
    RR(5 * T + 10, 5 * T + 40, 12, 16, 2, '#26303a'); C(5 * T + 16, 5 * T + 46, 3, '#e8e8e8'); // máy điện thoại bên trong
    RR(5 * T + 2, 5 * T - 20, 28, 9, 2, '#256b43'); TX('電話', 5 * T + 16, 5 * T - 15, 8, '#fff');
    R(5 * T + 2, 6 * T + 28, 28, 4, '#256b43');

    // ---- Bảng bản đồ khu vực (10,5) 2 ô ----
    L(10 * T + 6, 5 * T + 30, 10 * T + 6, 5 * T + 6, '#6b7280', 3); L(11 * T + 26, 5 * T + 30, 11 * T + 26, 5 * T + 6, '#6b7280', 3);
    RR(10 * T + 2, 5 * T - 8, 60, 38, 3, '#f7f5ee');
    g.strokeStyle = '#31517d'; g.lineWidth = 2; g.strokeRect(10 * T + 3.5, 5 * T - 6.5, 57, 35);
    TX('周辺案内図', 11 * T, 5 * T - 1, 9, '#20324a');
    L(10 * T + 8, 5 * T + 18, 11 * T + 24, 5 * T + 10, '#7fb069', 3);          // tuyến đường bộ / sông
    L(10 * T + 8, 5 * T + 8, 11 * T + 10, 5 * T + 22, '#a9c6e8', 3);
    L(10 * T + 14, 5 * T + 26, 11 * T + 28, 5 * T + 16, '#e8a13a', 2);
    C(11 * T, 5 * T + 16, 3.4, '#c73e3a'); TX('現在地', 11 * T + 14, 5 * T + 24, 7, '#c73e3a');

    // ---- Hàng rào dẫn luồng trước sảnh (12–14,7) & (20–22,7) ----
    [12, 20].forEach(function (fx) {
      for (var fp = 0; fp < 3; fp++) L(fx * T + fp * T + 16, 7 * T + 8, fx * T + fp * T + 16, 7 * T + 28, '#787f87', 3);
      L(fx * T + 2, 7 * T + 10, fx * T + 3 * T - 2, 7 * T + 10, '#c3c9cf', 4);
      L(fx * T + 2, 7 * T + 20, fx * T + 3 * T - 2, 7 * T + 20, '#c3c9cf', 3);
    });

    // ---- Máy bán vé ngoài trời có mái che (24,6) ----
    L(24 * T + 2, 6 * T - 26, 24 * T + 2, 6 * T + 4, '#6b7280', 3); L(24 * T + 30, 6 * T - 26, 24 * T + 30, 6 * T + 4, '#6b7280', 3);
    RR(24 * T - 3, 6 * T - 32, 38, 8, 3, '#31517d'); TX('きっぷ', 24 * T + 16, 6 * T - 28, 8, '#fff');
    RR(24 * T + 4, 6 * T - 22, 24, 50, 3, '#5b7a99');
    RR(24 * T + 8, 6 * T - 18, 16, 13, 2, '#bfe3ff'); TX('運賃', 24 * T + 16, 6 * T - 11, 7, '#20324a');
    C(24 * T + 11, 6 * T + 2, 2.4, '#39d353'); C(24 * T + 21, 6 * T + 2, 2.4, '#e8a13a');
    R(24 * T + 8, 6 * T + 10, 16, 5, '#26303a'); R(24 * T + 8, 6 * T + 19, 16, 6, '#39424c');

    // ---- Biển điểm taxi (30,5) + vạch đỗ taxi dưới sân ----
    L(30 * T + 16, 5 * T + 30, 30 * T + 16, 5 * T + 2, '#6b7280', 3);
    RR(30 * T + 1, 5 * T - 8, 30, 17, 3, '#f59e0b'); TX('タクシー', 30 * T + 16, 5 * T, 9, '#26303a');
    g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 2; g.strokeRect(26 * T + 3, 10 * T + 4, 6 * T - 6, 24);
    TX('タクシー', 29 * T, 10 * T + 16, 13, 'rgba(255,255,255,.75)');

    // ---- Ghế chờ (8,8) 2 ô & (28,9) 2 ô ----
    [[8, 8], [28, 9]].forEach(function (b) {
      var bx = b[0] * T, by = b[1] * T;
      for (var sl = 0; sl < 3; sl++) RR(bx + 3, by + 8 + sl * 6, 58, 4, 1, '#9a6f47');
      R(bx + 6, by + 26, 5, 6, '#4b4238'); R(bx + 53, by + 26, 5, 6, '#4b4238');
      L(bx + 3, by + 6, bx + 61, by + 6, '#7a5a38', 3);
    });

    // ---- Cột quảng cáo / poster lịch sự (20,9) ----
    RR(20 * T + 5, 9 * T - 8, 22, 38, 4, '#e8e4da');
    RR(20 * T + 8, 9 * T - 4, 16, 20, 2, '#fdf3e3'); TX('優先席', 20 * T + 16, 9 * T + 3, 7, '#b03a30'); TX('マナー', 20 * T + 16, 9 * T + 12, 7, '#37404a');
    R(20 * T + 5, 9 * T - 11, 22, 4, '#374151');

    // ---- Đèn sân ga (4,8) & (18,10) ----
    [[4, 8], [18, 10]].forEach(function (lp) {
      var cx = lp[0] * T + 16, by = lp[1] * T;
      L(cx, by + 30, cx, by + 2, '#4b5563', 3); L(cx, by + 2, cx + 8, by + 2, '#4b5563', 3);
      C(cx + 11, by + 3, 5, '#ffe9a8'); RING(cx + 11, by + 3, 5, '#8a8f94', 1);
    });

    // ---- Chậu cây 2 góc sân ----
    treePlanter(2, 10); treePlanter(31, 10);

    // ---- Bóng người chờ vẽ tĩnh (silhouette) ----
    silhouette(13 * T, 9 * T);
    silhouette(31 * T, 7 * T);
    silhouette(7 * T, 10 * T);
  }

  window.MAPDEF = window.MAPDEF || {};
  window.MAPDEF['station'] = {
    id: 'station',
    label: '🚉 Trước ga 新宿駅',
    grid: grid,
    paint: paint,
    solidsExtra: [
      [5, 5, 1, 2],    // bốt điện thoại xanh lá
      [10, 5, 2, 1],   // bảng bản đồ khu vực
      [12, 7, 3, 1], [20, 7, 3, 1],   // hàng rào dẫn luồng
      [24, 6, 1, 1],   // máy bán vé ngoài trời
      [30, 5, 1, 1],   // cột biển taxi
      [8, 8, 2, 1],    // ghế chờ 1
      [28, 9, 2, 1],   // ghế chờ 2
      [20, 9, 1, 1],   // cột quảng cáo / poster
      [4, 8, 1, 1], [18, 10, 1, 1],   // chân đèn sân
      [2, 10, 1, 1], [31, 10, 1, 1],   // chậu cây
      [12, 5, 1, 1], [21, 5, 1, 1]   // chân cột mái che sảnh
    ],
    doors: {
      '0,5': { to: 'street', spawn: [53, 6] },
      '0,6': { to: 'street', spawn: [53, 6] },
      '0,7': { to: 'street', spawn: [53, 6] }
    },
    npcs: [
      { id: 'station-staff', name: 'Nhân viên ga', sprite: 'staffM', tx: 16, ty: 5, behavior: 'stand', scene: 'station', label: '💬 Hỏi nhân viên ga', range: 56 },
      { id: 'wait-officer', name: 'Hành khách chờ tàu', sprite: 'officer', tx: 9, ty: 9, behavior: 'stand', label: '💬' },
      { id: 'wait-stafff', name: 'Hành khách chờ tàu', sprite: 'staffF', tx: 26, ty: 7, behavior: 'stand', label: '💬' }
    ],
    objects: [
      { tx: 24, ty: 6, tw: 1, th: 1, interact: { scene: 'listen-ga-bank', label: '🎧 Loa thông báo ở ga — nghe thông báo (xoay vòng)' } }
      ,{ tx: 30, ty: 5, tw: 1, th: 1, interact: { scene: 'station-ticket', label: '🎫 Máy bán vé — đi tàu điện / Shinkansen' } }
    ],
    spawnDefault: [2, 6]
  };
})();
