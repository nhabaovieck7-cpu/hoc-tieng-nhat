// maps-airport.js — Bản đồ 'vn-san-bay' ✈️ Sân bay Việt Nam (MỞ ĐẦU BẮT BUỘC §6e/§12).
// Nơi diễn ra cảnh chia tay với GIA ĐÌNH (bố mẹ) và NGƯỜI YÊU (Linh) trước khi sang Nhật.
// Cửa an ninh là ĐIỂM TƯƠNG TÁC (object, scene 'airport-gate') chứ không phải ô cửa thường:
// lớp truyện (flow.js) chặn cửa cho tới khi nói xong lời chia tay — qua cửa là lên máy bay
// (chỉ thị moveTo về 'may-bay' theo hợp đồng 1.3). Dữ liệu thuần + paint, không trạng thái.
(function () {
  'use strict';

  function row(fill, overrides) {
    var a = [], i, k;
    for (i = 0; i < 34; i++) a.push(fill);
    if (overrides) for (k in overrides) a[+k] = overrides[k];
    return a.join('');
  }
  var WALL = row('#');
  var OPEN = row('#', {}); for (var i = 1; i < 33; i++) OPEN = OPEN.substring(0, i) + '.' + OPEN.substring(i + 1);
  var grid = [WALL, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, OPEN, WALL];

  function paint(g, H) {
    var T = H.T, W = 34 * T;
    function R(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function RR(x, y, w, h, r, c) { g.fillStyle = c; H.rr(g, x, y, w, h, r); }
    function C(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function L(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function TX(t, x, y, s, c, a, wgt) { H.txt(g, t, x, y, s, c, a, wgt); }

    // ===== Trời ngoài cửa kính lớn phía trên (vùng y âm) + máy bay đang đỗ =====
    R(0, -40, W, 40, '#cfe7f2');
    RR(120, -34, 60, 12, 6, 'rgba(255,255,255,.9)');
    RR(760, -32, 72, 12, 6, 'rgba(255,255,255,.85)');
    // Thân máy bay trắng + đuôi đỏ (hư cấu) nhìn qua kính
    RR(430, -30, 210, 16, 8, '#f4f7f9');
    g.fillStyle = '#c73e3a'; g.beginPath(); g.moveTo(622, -30); g.lineTo(644, -38); g.lineTo(644, -16); g.lineTo(622, -16); g.closePath(); g.fill();
    for (var wn = 0; wn < 8; wn++) C(452 + wn * 22, -23, 2.4, '#7fa8bd');
    TX('BAYVIET', 520, -23, 9, '#31517d');

    // ===== Sàn sảnh: gạch bóng sáng + vệt phản chiếu =====
    var x, y, v;
    for (y = 0; y < 14; y++) for (x = 0; x < 34; x++) {
      v = H.hash(x, y);
      if (x === 0 || x === 33 || y === 0 || y === 13) R(x * T, y * T, T, T, '#b9c2c9');       // tường bao
      else {
        R(x * T, y * T, T, T, (x + y) % 2 ? '#e9e6df' : '#e2ded4');
        if (v > 0.72) R(x * T + 4, y * T + 5, 16, 3, 'rgba(255,255,255,.5)');
      }
    }
    // Thảm đỏ dẫn từ sảnh tới cửa an ninh
    R(24 * T, 5 * T, 8 * T, 4 * T, 'rgba(178,58,50,.16)');
    for (var ry = 5; ry < 9; ry++) L(24 * T, ry * T, 32 * T, ry * T, 'rgba(178,58,50,.25)', 1);

    // ===== Bảng khởi hành lớn (tường bắc, trung tâm) =====
    RR(12 * T + 2, 4, 10 * T - 4, 52, 4, '#232a33');
    TX('KHỞI HÀNH · 出発 · DEPARTURES', 17 * T, 15, 11, '#ffd94d');
    TX('VN310   TOKYO NARITA   18:40   ĐANG LÀM THỦ TỤC', 17 * T, 31, 10, '#ffb84d');
    TX('VN205   OSAKA KANSAI   19:25   ĐÚNG GIỜ', 17 * T, 44, 10, '#9fd48a');
    // Cờ Việt Nam nhỏ cạnh bảng (chi tiết "ở nhà" trước khi đi xa)
    R(11 * T + 6, 6, 22, 15, '#d8342c'); TX('★', 11 * T + 17, 13, 10, '#ffd94d');
    L(11 * T + 6, 4, 11 * T + 6, 34, '#6d7278', 2);
    TX('SẢNH ĐI — CHIA TAY NGƯỜI THÂN TẠI ĐÂY', 17 * T, 66, 10, '#7a4a3a');

    // ===== Hai quầy làm thủ tục (hàng 2) + biển hãng =====
    function counter(x0, tiles, label, quầy) {
      RR(x0 * T + 2, 34, tiles * T - 4, 22, 3, '#31517d');
      TX(label, (x0 + tiles / 2) * T, 45, 12, '#ffffff');
      R(x0 * T, 2 * T, tiles * T, 26, '#8a97a3');                       // mặt quầy
      R(x0 * T, 2 * T, tiles * T, 5, '#5f6d78');
      for (var i = 0; i < tiles; i++) {                                // màn hình + cân hành lý từng ô
        RR(x0 * T + i * T + 6, 2 * T + 7, 13, 10, 2, '#2c3844'); TX('✈', x0 * T + i * T + 12, 2 * T + 12, 7, '#8fd0ff');
        R(x0 * T + i * T + 20, 2 * T + 8, 9, 12, '#454f58');
      }
      TX(quầy, (x0 + tiles / 2) * T, 2 * T + 34, 9, '#5a4632');
    }
    counter(3, 10, 'BAYVIET AIR — QUẦY 09–18', 'LÀM THỦ TỤC · チェックイン');
    counter(21, 9, 'BAYVIET AIR — QUẦY 19–27', 'HÀNH LÝ KÝ GỬI · 手荷物');
    // Vali xếp cạnh quầy trái
    [[3, 3, '#c73e3a'], [4, 3, '#31517d'], [5, 3, '#e8a13a']].forEach(function (s) {
      RR(s[0] * T + 7, 3 * T + 8, 18, 22, 3, s[2]); L(s[0] * T + 12, 3 * T + 8, s[0] * T + 12, 3 * T + 4, '#444', 2); L(s[0] * T + 20, 3 * T + 8, s[0] * T + 20, 3 * T + 4, '#444', 2);
    });

    // ===== Ki-ốt giữa sảnh (15,4)-(18,5) =====
    RR(15 * T + 2, 4 * T + 2, 4 * T - 4, 2 * T - 4, 4, '#a05a78');
    TX('BÁNH MÌ · CÀ PHÊ', 17 * T, 4 * T + 14, 9, '#ffe9f2');
    for (var k = 0; k < 6; k++) RR(15 * T + 8 + k * 19, 4 * T + 26, 13, 16, 2, ['#e8a13a', '#7fb069', '#e0533d'][k % 3]);
    TX('GIÁ SÂN BAY… ĐẮT GẤP ĐÔI', 17 * T, 5 * T + 20, 7, '#7a445c');

    // ===== Hàng ghế chờ (12,6) và (12,8) =====
    [6, 8].forEach(function (gy) {
      RR(12 * T + 2, gy * T + 8, 6 * T - 4, 14, 4, '#5a7a8c');
      for (var s2 = 0; s2 < 6; s2++) { R(12 * T + 6 + s2 * T, gy * T + 4, 2, 6, '#48626f'); L(12 * T + 4 + s2 * T, gy * T + 15, 12 * T + 28 + s2 * T, gy * T + 15, '#48626f', 2); }
    });
    // Túi đồ ăn mẹ gói để trên ghế (chi tiết chia tay)
    RR(13 * T + 8, 8 * T + 2, 16, 12, 2, '#e0533d'); TX('🍊', 13 * T + 16, 8 * T + 8, 9, '#fff');

    // ===== Góc cà phê bên phải (28,3)-(31,4): bàn tròn + biển =====
    RR(28 * T, 3 * T, 4 * T, 6, 2, '#6b4a30'); TX('CÀ PHÊ PHIN', 30 * T, 3 * T + 3, 8, '#ffe9b0');
    [[29, 4], [31, 4]].forEach(function (tb) {
      C(tb[0] * T + 16, tb[1] * T + 14, 11, '#e8e2d4'); C(tb[0] * T + 16, tb[1] * T + 14, 4, '#6b4a30');
      L(tb[0] * T + 16, tb[1] * T + 25, tb[0] * T + 16, tb[1] * T + 30, '#8a8f94', 2);
    });

    // ===== CỬA AN NINH (tường đông, hàng 5–8): băng chuyền X-quang + khung dò =====
    R(31 * T, 5 * T, 1 * T, 4 * T, '#79828b');                          // băng chuyền
    for (var b = 0; b < 8; b++) L(31 * T + 3, 5 * T + 6 + b * 15, 31 * T + 29, 5 * T + 6 + b * 15, '#5f686f', 2);
    RR(31 * T + 4, 6 * T + 8, 24, 20, 2, '#454f58'); TX('X-RAY', 31 * T + 16, 6 * T + 18, 8, '#ffd94d');
    [5, 8].forEach(function (gy) {                                     // hai khung dò kim loại ở cột 32
      L(32 * T + 6, gy * T + 2, 32 * T + 6, gy * T + 30, '#3f4a54', 4);
      L(32 * T + 26, gy * T + 2, 32 * T + 26, gy * T + 30, '#3f4a54', 4);
      L(32 * T + 6, gy * T + 2, 32 * T + 26, gy * T + 2, '#3f4a54', 4);
      C(32 * T + 16, gy * T + 7, 2.4, '#7ac74f');
    });
    RR(30 * T + 2, 4 * T + 12, 3 * T - 4, 20, 3, '#b03a30');
    TX('KIỂM SOÁT AN NINH · 手荷物検査', 31 * T + 16 - T, 4 * T + 22, 9, '#ffffff');
    TX('Qua cửa này là không quay lại ôm được nữa…', 28 * T + 8, 9 * T + 10, 8, '#8a4a42');

    // ===== Chậu cây hai góc sảnh dưới + cửa kính sảnh đến (hàng 12–13) =====
    [[1, 11], [30, 11]].forEach(function (p) {
      RR(p[0] * T + 2, 11 * T + 14, 3 * T - 4, 16, 3, '#8a6f52');
      C(p[0] * T + 16, 11 * T + 10, 12, '#4e7d3a'); C(p[0] * T + 34, 11 * T + 12, 10, '#5d8f45'); C(p[0] * T + 52, 11 * T + 10, 11, '#679a4c');
    });
    RR(14 * T, 12 * T + 4, 6 * T, 26, 3, '#42525e');
    RR(14 * T + 4, 12 * T + 7, 6 * T - 8, 20, 2, '#bfe0ee');
    L(17 * T, 12 * T + 7, 17 * T, 12 * T + 27, '#42525e', 3);
    TX('CỬA SẢNH ĐI · 出発口', 17 * T, 12 * T - 6, 9, '#5a4632');
  }

  window.MAPDEF = window.MAPDEF || {};
  window.MAPDEF['vn-san-bay'] = {
    id: 'vn-san-bay',
    label: '✈️ Sân bay Việt Nam — ngày lên đường',
    grid: grid,
    paint: paint,
    solidsExtra: [
      [3, 2, 10, 1], [21, 2, 9, 1],     // hai quầy làm thủ tục
      [15, 4, 4, 2],                    // ki-ốt giữa sảnh
      [12, 6, 6, 1], [12, 8, 6, 1],     // hai hàng ghế chờ
      [28, 3, 4, 2],                    // quầy cà phê góc phải
      [31, 5, 1, 4],                    // băng chuyền X-quang (cột 31, hàng 5–8)
      [1, 11, 3, 1], [30, 11, 3, 1]     // chậu cây hai góc
    ],
    doors: {},
    npcs: [
      { id: 'bo', name: 'Bố', sprite: 'dad', tx: 7, ty: 5, behavior: 'stand', scene: 'airport-family', label: '💞 Tới chỗ bố mẹ', range: 68 },
      { id: 'me', name: 'Mẹ', sprite: 'mom', tx: 8, ty: 5, behavior: 'stand', scene: 'airport-family', label: '💞 Tới chỗ bố mẹ', range: 68 },
      { id: 'linh', name: 'Linh (người yêu)', sprite: 'linh', tx: 27, ty: 6, behavior: 'stand', scene: 'airport-lover', label: '💗 Tới chỗ Linh', range: 68 },
      { id: 'checkin', name: 'Nhân viên quầy', sprite: 'staffF', tx: 7, ty: 1, behavior: 'stand', scene: 'airport-checkin', label: '🧳 Hỏi quầy làm thủ tục', range: 88 }
    ],
    objects: [
      { tx: 32, ty: 5, tw: 1, th: 2, interact: { scene: 'airport-gate', label: '✈️ Qua cửa an ninh — lên máy bay' } },
      { tx: 32, ty: 7, tw: 1, th: 2, interact: { scene: 'airport-gate', label: '✈️ Qua cửa an ninh — lên máy bay' } }
    ],
    spawnDefault: [17, 11]
  };
})();
