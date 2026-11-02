// maps-shotengai.js — Bản đồ 'shotengai' 🛍️ Phố mua sắm 浅草商店街 (hub nối các địa điểm mới).
// Phố đi bộ lát gạch với 7 mặt tiền: koban, siêu thị, ngân hàng, bưu điện, nơi làm kaigo,
// karaoke, quán nhậu + ngõ bắc về 'street' + cổng nam sang 'hospital'. Dữ liệu thuần + paint.
(function () {
  'use strict';

  function row(fill, overrides) {
    var a = [], i, k;
    for (i = 0; i < 56; i++) a.push(fill);
    if (overrides) for (k in overrides) a[+k] = overrides[k];
    return a.join('');
  }
  var HASH56 = row('#');
  var WALK = row('s', { 0: '#', 55: '#' });
  var grid = [
    HASH56, HASH56, HASH56,
    row('#', { 4: 'D', 13: 'D', 24: 'D', 28: 'D', 32: 'D', 39: 'D', 47: 'D', 53: 'D' }),  // 3 mặt tiền + ngõ
    WALK, WALK, WALK, WALK, WALK, WALK, WALK,                                            // 4–10 phố đi bộ
    row('#', { 16: 'D', 28: 'D', 36: 'D', 44: 'D' })                                                 // 11 cổng nam → khách sạn / bệnh viện / TRUNG TÂM THƯƠNG MẠI / shop quần áo
  ];

  function paint(g, H) {
    var T = H.T, W = 56 * T;
    function R(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function RR(x, y, w, h, r, c) { g.fillStyle = c; H.rr(g, x, y, w, h, r); }
    function C(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function L(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function TX(t, x, y, s, c, a, wgt) { H.txt(g, t, x, y, s, c, a, wgt); }
    function door(x, c) {  // ô cửa mặt tiền hàng 3
      RR(x * T + 2, 3 * T + 2, 28, 30, 2, '#4a3b2c');
      RR(x * T + 6, 3 * T + 6, 20, 26, 1, c || '#9fc6d6');
      L(x * T + 16, 3 * T + 6, x * T + 16, 3 * T + 32, '#4a3b2c', 2);
    }
    function sign(x0, tiles, text, bg, fg, size) {
      RR(x0 * T + 3, 66, tiles * T - 6, 26, 4, bg);
      TX(text, (x0 + tiles / 2) * T, 79, size || 15, fg);
    }
    function awning(x0, tiles, c) {
      for (var i = 0; i < tiles * 2; i++) { g.fillStyle = i % 2 ? c : '#f4f1ea'; g.beginPath(); g.moveTo(x0 * T + i * 16, 94); g.lineTo(x0 * T + i * 16 + 16, 94); g.lineTo(x0 * T + i * 16 + 13, 104); g.lineTo(x0 * T + i * 16 + 3, 104); g.closePath(); g.fill(); }
    }

    // ===== Trời + băng rôn商店街 vắt ngang (vùng y âm) =====
    R(0, -40, W, 40, '#c8e2ef');
    RR(200, -34, 56, 11, 6, 'rgba(255,255,255,.85)');
    RR(1300, -33, 60, 11, 6, 'rgba(255,255,255,.8)');
    L(0, -16, W, -16, '#8a6f52', 2);
    for (var bn = 0; bn < 14; bn++) {  // cờ phướn tam giác đủ màu
      var bx = 30 + bn * 124;
      g.fillStyle = ['#e0533d', '#e8a13a', '#3d7be0', '#39a05a'][bn % 4];
      g.beginPath(); g.moveTo(bx, -16); g.lineTo(bx + 22, -16); g.lineTo(bx + 11, -2); g.closePath(); g.fill();
    }
    RR(24 * T, -38, 8 * T, 22, 4, '#b03a30'); TX('浅草商店街', 28 * T, -27, 16, '#ffffff');

    // ===== Nền theo ô: mặt tiền (0–3) / phố đi bộ lát gạch (4–10) / rìa nam (11) =====
    var x, y, v;
    for (y = 0; y < 12; y++) for (x = 0; x < 56; x++) {
      var px = x * T, py = y * T; v = H.hash(x, y);
      if (y <= 3) {
        var wall = '#d9cdb2';
        if (x >= 1 && x < 8) wall = '#cfd8de'; else if (x >= 8 && x < 20) wall = '#eef2ee';
        else if (x >= 20 && x < 28) wall = '#b9bdc4'; else if (x >= 28 && x < 29) wall = '#6d6255';
        else if (x >= 29 && x < 36) wall = '#e6ddcb'; else if (x >= 36 && x < 44) wall = '#e8d9bd';
        else if (x >= 44 && x < 51) wall = '#584a63'; else if (x >= 51) wall = '#a9805a';
        R(px, py, T, T, wall);
        if (v > 0.62) R(px, py, T, T, 'rgba(0,0,0,0.05)');
      } else if (y <= 10) {
        R(px, py, T, T, (x + y) % 2 ? '#cfc4ae' : '#c6bba2');          // gạch lát phố đi bộ
        g.strokeStyle = 'rgba(96,84,64,.3)'; g.lineWidth = 1; g.strokeRect(px + 0.5, py + 0.5, T - 1, T - 1);
        if (v > 0.8) R(px + 6, py + 8, 3, 2, 'rgba(90,76,56,.25)');
      } else {
        R(px, py, T, T, '#7d7466');                                     // tường rào phía nam
        if (v > 0.6) C(px + 9 + v * 12, py + 12, 5, '#5f7050');
      }
    }
    // Dải gạch đỏ dẫn hướng giữa phố
    for (x = 1; x < 55; x++) { R(x * T + 3, 7 * T + 13, 26, 6, 'rgba(178,84,60,.35)'); }

    // ===== 1) KOBAN (x1–7), cửa x=4 =====
    R(1 * T, 6, 7 * T, 5, '#31517d');
    RR(2 * T, 14, 5 * T, 26, 2, '#f2f4f6'); TX('上野交番', 4.5 * T, 27, 15, '#22354f');
    C(4.5 * T, 52, 6, '#e23b32'); R(4.5 * T - 1, 44, 2, 4, '#8a2a24');   // đèn đỏ biểu tượng koban
    TX('POLICE', 4.5 * T, 60, 8, '#31517d');
    RR(6 * T + 4, 44, 24, 26, 2, '#3f6152'); TX('お知らせ', 6 * T + 16, 50, 7, '#fff'); R(6 * T + 7, 56, 18, 10, '#eef2ee');
    door(4);

    // ===== 2) SIÊU THỊ (x8–19), cửa kính x=13 =====
    sign(8, 12, 'スーパー中野', '#2e7d46', '#ffffff', 17);
    R(8 * T + 2, 70, 12 * T - 4, 58, '#9fc9bb');                          // mặt kính lớn
    for (var sh = 0; sh < 5; sh++) { R(9 * T + sh * 62, 106, 46, 5, '#48755c'); R(9 * T + sh * 62, 94, 46, 10, sh % 2 ? '#e8a13a' : '#7fb069'); }
    for (var fr = 0; fr <= 12; fr++) L(8 * T + fr * T, 70, 8 * T + fr * T, 128, '#4d6b5c', 2);
    RR(9 * T + 3, 76, 26, 20, 2, '#fff'); TX('青果', 9 * T + 16, 82, 8, '#2e7d46'); TX('特売', 9 * T + 16, 92, 8, '#c73e3a');
    RR(17 * T + 3, 76, 26, 20, 2, '#fff7dd'); TX('お肉', 17 * T + 16, 82, 8, '#8a5a18'); TX('半額', 17 * T + 16, 92, 8, '#c73e3a');
    R(13 * T, 3 * T, 32, 32, '#42525e'); RR(13 * T + 3, 3 * T + 3, 12, 29, 1, '#d7f0e4'); RR(13 * T + 17, 3 * T + 3, 12, 29, 1, '#d7f0e4'); TX('自動', 13 * T + 16, 3 * T + 8, 8, '#2e7d46');
    awning(8, 12, '#2e7d46');

    // ===== 3) NGÂN HÀNG (x20–27), cửa x=24 =====
    R(20 * T, 0, 8 * T, 8, '#7e858e');
    for (var st = 0; st < 4; st++) L(20 * T, 30 + st * 22, 28 * T, 30 + st * 22, 'rgba(80,86,94,.3)', 1);
    [21, 26].forEach(function (wx) { RR(wx * T + 5, 14, 22, 20, 1, '#e8eaec'); RR(wx * T + 7, 16, 18, 16, 1, '#7f96a8'); });
    sign(20, 8, '丸の内銀行', '#45525e', '#ffffff', 15);
    RR(27 * T - 26, 40, 22, 16, 2, '#c73e3a'); TX('ATM', 27 * T - 15, 48, 9, '#fff');
    door(24, '#a9c6d6');

    // ===== NGÕ BẮC (x=28) — về đường phố chính =====
    R(28 * T, 0, T, 4 * T, '#57493a');
    RR(28 * T + 3, 30, 26, 44, 3, '#7a2e35'); TX('横', 28 * T + 16, 41, 11, '#ffe9b0'); TX('丁', 28 * T + 16, 59, 11, '#ffe9b0');
    TX('↑ 吉祥寺通り', 28 * T + 16, 3 * T + 16, 9, '#ffe9b0');
    R(28 * T + 4, 3 * T + 26, 24, 6, '#8a7a5f');

    // ===== 4) BƯU ĐIỆN (x29–35), cửa x=32 =====
    sign(29, 7, '日本橋郵便局', '#b03a30', '#ffffff', 14);
    TX('〒', 29 * T + 16, 30, 22, '#c73e3a');
    [30, 34].forEach(function (wx) { RR(wx * T + 5, 16, 22, 18, 1, '#f2ede0'); RR(wx * T + 7, 18, 18, 14, 1, '#a8c4cf'); });
    // hòm thư đỏ tròn cạnh cửa
    RR(30 * T + 6, 3 * T + 6, 18, 24, 5, '#d23c2e'); R(30 * T + 8, 3 * T + 12, 14, 3, '#7e1f16'); TX('〒', 30 * T + 15, 3 * T + 22, 8, '#fff');
    door(32);

    // ===== 5) KAIGO — ĐỆ DỊCH VỤ NGÀY (x36–43), cửa x=39 =====
    sign(36, 8, 'デイサービス神戸', '#c97b4a', '#ffffff', 13);
    [37, 41].forEach(function (wx) { RR(wx * T + 4, 16, 24, 20, 2, '#fdf6e8'); RR(wx * T + 6, 18, 20, 16, 1, '#f2d8a8'); });
    TX('送迎あり · 見学OK', 40 * T, 48, 9, '#8a5a18');
    door(39, '#f2d8a8');
    // Xe đưa đón福祉 đỗ trước cửa (36,4)-(38,4) — chi tiết nhận diện day-service
    RR(36 * T + 2, 4 * T + 8, 3 * T - 4, 20, 5, '#f2f4f6');
    RR(36 * T + 6, 4 * T + 2, 34, 10, 4, '#dfe7ec'); RR(37 * T + 14, 4 * T + 2, 30, 10, 4, '#dfe7ec');
    R(38 * T + 12, 4 * T + 10, 18, 9, '#7ac74f'); TX('福', 38 * T + 21, 4 * T + 14, 8, '#fff');
    C(36 * T + 16, 4 * T + 29, 5, '#33373c'); C(38 * T + 16, 4 * T + 29, 5, '#33373c');

    // ===== 6) KARAOKE (x44–50), cửa x=47 =====
    R(44 * T, 8, 7 * T, 5, '#2c2438');
    RR(44 * T + 4, 16, 7 * T - 8, 30, 4, '#3a2f4d');
    TX('カラオケ渋谷', 47.5 * T, 31, 15, '#ff9ff3');
    TX('🎤 24h · 学生割', 47.5 * T, 54, 9, '#8fd0ff');
    // biển dọc neon cạnh cửa (50,4)
    RR(50 * T + 6, 4 * T - 26, 20, 52, 4, '#2c2438'); TX('カ', 50 * T + 16, 4 * T - 13, 11, '#ff9ff3'); TX('ラ', 50 * T + 16, 4 * T + 1, 11, '#8fd0ff'); TX('オ', 50 * T + 16, 4 * T + 15, 11, '#ffd94d'); TX('ケ', 50 * T + 16, 4 * T + 29 - 14, 11, '#7ac74f');
    door(47, '#8a76a8');

    // ===== 7) IZAKAYA (x51–55), cửa x=53 =====
    R(51 * T, 0, 5 * T, 8, '#6e4526');
    RR(51 * T + 4, 62, 5 * T - 8, 28, 3, '#43301f'); TX('居酒屋 新橋', 53.5 * T, 76, 13, '#ffedd0');
    C(51 * T + 14, 44, 8, '#e23b32'); TX('酒', 51 * T + 14, 44, 9, '#fff');
    C(55 * T + 18, 44, 8, '#e23b32'); TX('酒', 55 * T + 18, 44, 9, '#fff');
    R(53 * T + 1, 3 * T, 30, 30, '#54402c');
    [0, 1, 2].forEach(function (n) { R(53 * T + 2 + n * 10, 3 * T - 2, 9, 17, '#7a2e35'); TX('わ', 53 * T + 6 + n * 10, 3 * T + 6, 8, '#fff'); });

    // ===== ĐỒ ĐẠC PHỐ (khớp solidsExtra) =====
    // thùng hoa / cây trang trí (20,4) và (44,4)
    [[20, 4], [44, 4]].forEach(function (p) {
      RR(p[0] * T + 4, p[1] * T + 18, 24, 12, 3, '#8a6f52');
      C(p[0] * T + 16, p[1] * T + 10, 11, '#4e7d3a'); C(p[0] * T + 8, p[1] * T + 14, 7, '#5d8f45'); C(p[0] * T + 24, p[1] * T + 14, 7, '#679a4c');
      C(p[0] * T + 12, p[1] * T + 6, 1.8, '#e88aa5'); C(p[0] * T + 20, p[1] * T + 12, 1.8, '#ffd94d');
    });
    // thùng rau củ trước siêu thị (10,4)
    RR(10 * T + 2, 4 * T + 10, 28, 18, 2, '#8a6f52');
    for (var vg = 0; vg < 5; vg++) { C(10 * T + 8 + vg * 5, 4 * T + 16, 3.4, vg % 2 ? '#e0533d' : '#7fb069'); }
    TX('98円', 10 * T + 16, 4 * T + 6, 8, '#c73e3a');
    // ghế đá giữa phố (30,7) + bảng tin商店街 (34,4)
    RR(30 * T + 2, 7 * T + 10, 28, 10, 3, '#9aa0a6'); L(30 * T + 6, 7 * T + 20, 30 * T + 6, 7 * T + 27, '#767c83', 2); L(30 * T + 26, 7 * T + 20, 30 * T + 26, 7 * T + 27, '#767c83', 2);
    RR(34 * T + 3, 4 * T + 2, 26, 28, 2, '#3f6152'); R(34 * T + 6, 4 * T + 6, 9, 9, '#fff'); R(34 * T + 17, 4 * T + 6, 9, 9, '#fdf6d8'); R(34 * T + 6, 4 * T + 18, 20, 8, '#eef2ee');
    TX('掲示板', 34 * T + 16, 4 * T - 4, 8, '#3f6152');

    // ===== CỔNG NAM → BỆNH VIỆN (28,11) =====
    R(26 * T, 11 * T, 6 * T, T, '#6d6255');
    RR(27 * T + 2, 11 * T + 4, 2 * T - 4, 24, 3, '#eef1f3');
    TX('本郷病院 →', 28 * T, 11 * T + 16, 10, '#31517d');
    L(26 * T + 4, 11 * T + 16, 26 * T + 12, 11 * T + 16, '#c73e3a', 3); TX('✚', 26 * T + 8, 11 * T + 8, 9, '#c73e3a');

    // ===== CỔNG NAM → KHÁCH SẠN (16,11) (đợt mở rộng ngành — lối nhân viên khách sạn) =====
    R(14 * T, 11 * T, 5 * T, T, '#2c3e6b');
    R(16 * T, 11 * T, T, T, '#7d4a4a'); R(16 * T + 4, 11 * T + 4, 24, 24, '#8a5656');
    RR(14 * T + 4, 11 * T + 4, 3 * T - 8, 24, 3, '#f7f3e4');
    TX('ホテルお台場', 15 * T + 16, 11 * T + 12, 9, '#2c3e6b');
    TX('スタッフ入口', 15 * T + 16, 11 * T + 23, 6, '#8a8574');

    // ===== CỔNG NAM → SHOP QUẦN ÁO (44,11) (gỡ nghẽn cảnh 1.4 — đợt thoại Chương 1) =====
    R(42 * T, 11 * T, 5 * T, T, '#7a4a63');
    R(44 * T, 11 * T, T, T, '#a9805a'); R(44 * T + 4, 11 * T + 4, 24, 24, '#c49ab2');
    RR(42 * T + 4, 11 * T + 4, 3 * T - 8, 24, 3, '#ffe9f2');
    TX('原宿洋品店', 43 * T + 16, 11 * T + 12, 9, '#7a4a63');
    TX('👕 cửa hàng quần áo', 43 * T + 16, 11 * T + 23, 6, '#a8849c');

    // ===== BIỂN TREO TRÊN 3 CỔNG NAM (bổ sung 13:33 31/10/2026 — tên nơi phải đọc được
    // ngay tại cổng, không chỉ là bảng nhỏ sơn trên ô cửa ở hàng 11) =====
    // Bệnh viện — trên cổng (28,11): bảng trắng + chữ thập đỏ, treo ở hàng 10 ngay trên cổng
    RR(26 * T + 8, 11 * T - 17, 4 * T, 19, 3, '#eef1f3');
    TX('✚ 本郷病院', 28 * T + 16, 11 * T - 7, 11, '#31517d');
    L(28 * T + 2, 11 * T - 17, 28 * T + 2, 11 * T - 26, '#6d6255', 3); L(29 * T - 2, 11 * T - 17, 29 * T - 2, 11 * T - 26, '#6d6255', 3);
    // Khách sạn — trên cổng (16,11)
    RR(14 * T + 8, 11 * T - 17, 4 * T, 19, 3, '#f7f3e4');
    TX('ホテルお台場', 16 * T + 16, 11 * T - 7, 11, '#2c3e6b');
    L(16 * T + 2, 11 * T - 17, 16 * T + 2, 11 * T - 26, '#6d6255', 3); L(17 * T - 2, 11 * T - 17, 17 * T - 2, 11 * T - 26, '#6d6255', 3);
    // Shop quần áo — trên cổng (44,11)
    RR(42 * T + 8, 11 * T - 17, 4 * T, 19, 3, '#ffe9f2');
    TX('原宿洋品店', 44 * T + 16, 11 * T - 7, 11, '#7a4a63');
    L(44 * T + 2, 11 * T - 17, 44 * T + 2, 11 * T - 26, '#6d6255', 3); L(45 * T - 2, 11 * T - 17, 45 * T - 2, 11 * T - 26, '#6d6255', 3);

    // ===== CỔNG NAM → TRUNG TÂM THƯƠNG MẠI (36,11) (đợt ngoại hình + mall 31/10/2026) =====
    R(34 * T, 11 * T, 5 * T, T, '#2b3a67');
    R(36 * T, 11 * T, T, T, '#42525e'); RR(36 * T + 3, 11 * T + 3, 12, 29, 1, '#d7f0e4'); RR(36 * T + 17, 11 * T + 3, 12, 29, 1, '#d7f0e4');
    RR(34 * T + 4, 11 * T + 4, 3 * T - 8, 24, 3, '#fdf6d8');
    TX('銀座モール', 35 * T + 16, 11 * T + 12, 9, '#2b3a67');
    TX('🛍 trung tâm thương mại', 35 * T + 16, 11 * T + 23, 6, '#8a6f3a');
    // Biển treo trên cổng mall — cùng luật biển treo 3 cổng nam (tên gắn trên cổng, đọc được ở 390px)
    RR(34 * T + 8, 11 * T - 17, 4 * T, 19, 3, '#2b3a67');
    TX('🛍 銀座モール', 36 * T + 16, 11 * T - 7, 11, '#ffd94d');
    L(36 * T + 2, 11 * T - 17, 36 * T + 2, 11 * T - 26, '#6d6255', 3); L(37 * T - 2, 11 * T - 17, 37 * T - 2, 11 * T - 26, '#6d6255', 3);
  }

  window.MAPDEF = window.MAPDEF || {};
  window.MAPDEF['shotengai'] = {
    id: 'shotengai',
    label: '🛍️ Phố mua sắm 浅草商店街',
    grid: grid,
    paint: paint,
    solidsExtra: [
      [36, 4, 3, 1],   // xe đưa đón kaigo
      [20, 4, 1, 1], [44, 4, 1, 1],   // chậu cây trang trí
      [10, 4, 1, 1],   // thùng rau củ trước siêu thị
      [50, 4, 1, 1],   // cột biển karaoke
      [34, 4, 1, 1],   // bảng tin商店街
      [30, 7, 1, 1]    // ghế đá giữa phố
    ],
    doors: {
      '4,3': { to: 'koban', spawn: [7, 7] },
      '13,3': { to: 'supermarket', spawn: [12, 9] },
      '24,3': { to: 'bank', spawn: [9, 8] },
      '28,3': { to: 'street', spawn: [32, 10] },
      '32,3': { to: 'post', spawn: [8, 8] },
      '39,3': { to: 'kaigo', spawn: [5, 9] },
      '47,3': { to: 'karaoke', spawn: [5, 10] },
      '53,3': { to: 'izakaya', spawn: [9, 8] },
      '28,11': { to: 'hospital', spawn: [12, 10] },
      '16,11': { to: 'hotel', spawn: [8, 9] },
      '36,11': { to: 'mall', spawn: [11, 11] },
      '44,11': { to: 'shop', spawn: [7, 9] }
    },
    npcs: [
      { id: 'obaasan', name: 'Bà cụ đi chợ', sprite: 'mom', tx: 18, ty: 6, behavior: 'pace', from: 16, to: 22, scene: 'shotengai-obaasan', label: '💬 Chào bà cụ', range: 56 },
      { id: 'tuan', name: 'Anh Tuấn "môi giới"', sprite: 'senpai', tx: 26, ty: 6, behavior: 'stand', scene: 'sim-01-loi-ru', label: '📱 Anh Tuấn "môi giới" — vẫy tay gọi bạn', range: 64 }
    ],
    objects: [],
    spawnDefault: [28, 4]
  };
})();
