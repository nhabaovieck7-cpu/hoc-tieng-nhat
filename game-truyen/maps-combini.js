// maps-combini.js — Combini hư cấu 「秋葉原マート」 (2D, đợt duyệt bối cảnh mẫu).
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
    // Chữ xếp dọc (nhãn kệ hẹp 1 ô): mỗi ký tự một dòng.
    function VT(s, cx, y0, sz, c) { for (var i = 0; i < s.length; i++) TX(s[i], cx, y0 + i * (sz + 2), sz, c); }

    /* ===== Biển hiệu cao (vùng y âm) ===== */
    R(-4, -40, 520, 36, '#14532d');
    R(-4, -40, 520, 5, '#fbbf24');
    TX('秋葉原マート', 150, -22, 19, '#ffffff');
    TX('AKIHABARA MART 24h', 330, -22, 11, '#bbf7d0');
    TX('🍙', 52, -22, 17, '#fff');

    /* ===== Sàn gạch sáng bóng ===== */
    R(0, 0, 16 * T, 12 * T, '#e7e4da');
    for (var fy = 0; fy < 12; fy++) for (var fx = 0; fx < 16; fx++) {
      if ((fx + fy) % 2 === 0) R(fx * T, fy * T, T, T, 'rgba(255,255,255,.35)');
      if (H.hash(fx, fy) > 0.86) R(fx * T + 4, fy * T + 5, 18, 3, 'rgba(190,185,170,.5)');
    }
    for (var gx = 0; gx <= 16; gx++) L(gx * T, 0, gx * T, 12 * T, 'rgba(150,145,130,.28)', 1);
    for (var gy = 0; gy <= 12; gy++) L(0, gy * T, 16 * T, gy * T, 'rgba(150,145,130,.28)', 1);
    // vệt bóng sáng chéo như sàn mới lau
    R(70, 130, 150, 10, 'rgba(255,255,255,.20)');
    R(300, 250, 130, 10, 'rgba(255,255,255,.18)');

    /* ===== Tường ===== */
    R(0, 0, 16 * T, T, '#f3ead8');                 // tường trên
    R(0, 22, 16 * T, 10, '#16a34a');                // dải xanh thương hiệu (hư cấu)
    R(0, 0, T, 12 * T, '#cfc8b8'); R(15 * T, 0, T, 12 * T, '#cfc8b8'); // tường trái/phải
    // Poster quảng cáo trên tường trên
    RR(11 * T + 4, 3, 54, 26, 3, '#dc2626'); TX('新発売！', 11 * T + 31, 12, 10, '#fff'); TX('おにぎり', 11 * T + 31, 24, 8, '#fecaca');
    RR(12 * T + 10, 3, 54, 26, 3, '#2563eb'); TX('冷たい！', 12 * T + 37, 12, 10, '#fff'); TX('ドリンク', 12 * T + 37, 24, 8, '#bfdbfe');
    RR(4, 5 * T + 4, 24, 44, 3, '#f59e0b'); VT('雑誌', 16, 5 * T + 16, 9, '#fff');
    // Mặt tiền kính ở đáy (hàng 11): kính lớn + khung
    R(0, 11 * T, 16 * T, T, '#9db8c4');
    for (var wx = 1; wx < 15; wx++) { R(wx * T + 2, 11 * T + 3, T - 4, T - 6, 'rgba(205,235,245,.85)'); L(wx * T + 6, 11 * T + 26, wx * T + 24, 11 * T + 6, 'rgba(255,255,255,.7)', 2); }
    R(0, 11 * T, 16 * T, 3, '#5b6b73'); R(0, 12 * T - 3, 16 * T, 3, '#5b6b73');

    /* ===== Khu sau quầy (sàn xám riêng) + kệ sau lưng nhân viên ===== */
    R(6 * T, T, 2 * T, T, '#b8bcc2'); // ô đứng của Yui (7,1) + ô kề — KHÔNG nằm trong solidsExtra
    // [1,1,5,1] kệ thuốc lá / đồ nhỏ sau quầy (đặc trưng combini Nhật)
    RR(T + 1, T + 1, 5 * T - 2, T - 2, 3, '#374151');
    for (var sb = 0; sb < 5; sb++) for (var sr = 0; sr < 2; sr++) R(T + 5 + sb * 30, T + 5 + sr * 12, 24, 9, ['#e5e7eb', '#fca5a5', '#93c5fd', '#fcd34d', '#86efac'][(sb + sr) % 5]);
    TX('小物・カード', 3 * T + 16, T + 27, 7, '#d1d5db');
    // [8,1,1,1] trụ máy phụ / cột quầy (vây ô nhân viên phía đông)
    RR(8 * T + 3, T + 2, T - 6, T - 4, 3, '#6b7280'); R(8 * T + 7, T + 6, T - 14, 10, '#a5f3fc'); TX('POS', 8 * T + 16, T + 24, 7, '#e5e7eb');

    /* ===== Quầy thu ngân [1,2,9,1] ===== */
    RR(T, 2 * T + 1, 9 * T, T - 2, 4, '#f8fafc');
    R(T, 2 * T + 22, 9 * T, 9, '#16a34a'); // mặt trước quầy dải xanh
    R(T, 2 * T + 1, 9 * T, 5, '#d6c9a8');  // mặt quầy sáng
    // Khay đồ ăn nóng: tủ hấp 肉まん (trái) + nồi おでん (giữa-trái)
    RR(T + 4, 2 * T - 5, 52, 24, 3, '#e2e8f0'); R(T + 7, 2 * T - 2, 46, 12, 'rgba(165,243,252,.8)');
    C(T + 18, 2 * T + 4, 5, '#fff7ed'); C(T + 31, 2 * T + 4, 5, '#fff7ed'); C(T + 44, 2 * T + 4, 5, '#ffedd5');
    TX('肉まん', T + 30, 2 * T + 26, 8, '#065f46');
    RR(2 * T + 28, 2 * T - 5, 54, 24, 3, '#92400e'); R(2 * T + 31, 2 * T - 2, 48, 18, '#f59e0b');
    C(2 * T + 42, 2 * T + 5, 5, '#fef3c7'); C(2 * T + 56, 2 * T + 5, 5, '#fde68a'); C(2 * T + 68, 2 * T + 5, 5, '#fef3c7');
    TX('おでん', 3 * T + 24, 2 * T + 26, 8, '#065f46');
    // Máy cà phê (giữa quầy)
    RR(4 * T + 12, 2 * T - 6, 40, 26, 3, '#1f2937'); C(4 * T + 24, 2 * T + 1, 4, '#ef4444'); C(4 * T + 36, 2 * T + 1, 4, '#22c55e'); R(4 * T + 26, 2 * T + 8, 12, 8, '#f8fafc');
    TX('コーヒー', 4 * T + 32, 2 * T + 26, 8, '#065f46');
    // Máy tính tiền gần Yui (x7 trên quầy)
    RR(6 * T + 22, 2 * T - 6, 44, 24, 3, '#111827'); R(6 * T + 26, 2 * T - 3, 36, 12, '#67e8f9'); TX('¥0', 6 * T + 44, 2 * T + 4, 8, '#164e63');
    TX('レジ', 7 * T + 12, 2 * T + 26, 8, '#065f46');
    TX('いらっしゃいませ', 5 * T + 12, 2 * T + 13, 8, 'rgba(100,116,139,.55)');

    /* ===== Máy photocopy [10,1,2,1] + ATM [13,1,2,1] (tường trên-phải) ===== */
    RR(10 * T + 2, T + 2, 2 * T - 4, T - 4, 3, '#e5e7eb'); R(10 * T + 6, T + 5, 2 * T - 12, 12, '#9ca3af'); C(11 * T + 18, T + 24, 4, '#22c55e'); TX('コピー', 11 * T, T + 24, 9, '#374151');
    RR(13 * T + 2, T + 1, 2 * T - 4, T - 2, 3, '#334155'); R(13 * T + 7, T + 5, 34, 16, '#22d3ee'); TX('¥', 13 * T + 24, T + 13, 11, '#164e63'); R(14 * T + 6, T + 6, 16, 4, '#111827'); R(14 * T + 6, T + 14, 16, 10, '#94a3b8');
    TX('ATM', 14 * T + 14, T + 27, 10, '#f8fafc');

    /* ===== Các kệ song song (cột 1 ô, lối đi 2 ô) ===== */
    function shelf(tx, label, cols, price) {
      var x = tx * T, y = 4 * T;
      RR(x + 1, y, T - 2, 3 * T, 3, '#4b5563');
      RR(x + 3, y + 3, T - 6, 3 * T - 6, 2, '#f8fafc');
      for (var s = 0; s < 3; s++) for (var p = 0; p < 3; p++) {
        R(x + 5, y + s * T + 5 + p * 8, T - 10, 6, cols[(s * 3 + p) % cols.length]);
      }
      for (var t = 0; t < 3; t++) R(x + 6, y + t * T + T - 6, T - 12, 4, '#fef08a'); // nhãn giá vàng
      RR(x - 2, y - 12, T + 4, 12, 3, '#14532d'); TX(price, x + 16, y - 6, 7, '#fff');
      VT(label, x + 16, y + 8, 9, 'rgba(31,41,55,.75)');
    }
    shelf(2, 'おにぎり', ['#22c55e', '#f8fafc', '#ef4444', '#fbbf24'], '弁当');
    shelf(5, 'パン', ['#f59e0b', '#fde68a', '#d97706', '#fff7ed'], 'パン');
    shelf(8, 'ドリンク', ['#38bdf8', '#22c55e', '#fb923c', '#a78bfa'], '飲料');
    shelf(11, 'カップ麺', ['#ef4444', '#facc15', '#f97316', '#f8fafc'], '麺・菓子');
    // Tủ lạnh đồ uống: phủ kính xanh mờ lên kệ x8 sau khi vẽ hàng
    R(8 * T + 3, 4 * T + 3, T - 6, 3 * T - 6, 'rgba(125,211,252,.22)'); L(8 * T + 8, 7 * T - 8, 8 * T + 24, 4 * T + 10, 'rgba(255,255,255,.55)', 2);

    /* ===== Kệ tạp chí / comic tường phải [14,4,1,3] ===== */
    RR(14 * T + 1, 4 * T, T - 2, 3 * T, 3, '#78350f');
    for (var mz = 0; mz < 3; mz++) { R(14 * T + 4, 4 * T + mz * T + 20, T - 8, 5, '#451a03'); for (var mb = 0; mb < 4; mb++) R(14 * T + 5 + mb * 6, 4 * T + mz * T + 4, 5, 16, ['#ef4444', '#3b82f6', '#22c55e', '#eab308'][(mz + mb) % 4]); }
    VT('雑誌', 14 * T + 16, 4 * T + 34, 9, 'rgba(255,255,255,.85)');

    /* ===== Góc イートイン trái-dưới [1,9,3,1] ===== */
    R(T, 8 * T + 4, 3 * T, 22, 'rgba(217,119,6,.16)');
    TX('イートイン', 2 * T + 16, 8 * T + 14, 9, '#92400e');
    RR(T + 20, 9 * T + 5, 56, 22, 4, '#d6a05a'); R(T + 24, 9 * T + 8, 48, 4, '#f5deb3');
    RR(T + 2, 9 * T + 8, 16, 16, 3, '#92400e'); RR(3 * T + 14, 9 * T + 8, 16, 16, 3, '#92400e'); // 2 ghế hai đầu bàn
    C(2 * T + 14, 9 * T + 16, 5, '#f8fafc'); C(2 * T + 26, 9 * T + 16, 4, '#fca5a5'); // cốc trên bàn

    /* ===== Tủ đông kem góc phải-dưới [13,9,2,1] ===== */
    RR(13 * T + 2, 9 * T + 2, 2 * T - 4, T - 4, 4, '#e0f2fe'); R(13 * T + 5, 9 * T + 5, T - 8, T - 10, 'rgba(186,230,253,.9)'); R(14 * T + 3, 9 * T + 5, T - 8, T - 10, 'rgba(186,230,253,.9)');
    C(13 * T + 14, 9 * T + 14, 5, '#f9a8d4'); C(13 * T + 26, 9 * T + 18, 5, '#86efac'); C(14 * T + 12, 9 * T + 16, 5, '#fde68a'); C(14 * T + 24, 9 * T + 13, 5, '#a78bfa');
    TX('アイス', 14 * T, 9 * T + 27, 9, '#075985');

    /* ===== Thảm cửa + dải cảnh báo vàng hàng 10–11 quanh cửa ===== */
    RR(7 * T + 2, 10 * T + 3, 3 * T - 4, T - 8, 3, '#6b7280'); TX('秋葉原マート', 8 * T + 16, 10 * T + 15, 9, '#e5e7eb');
    R(7 * T, 10 * T + 28, 3 * T, 4, '#facc15'); R(7 * T, 11 * T, 3 * T, 4, '#facc15');
    for (var wz = 0; wz < 6; wz++) L(7 * T + wz * 16, 11 * T + T - 4, 7 * T + wz * 16 + 8, 11 * T + T - 12, '#111827', 2);

    /* ===== Thùng rác phân loại 3 ngăn trước cửa [10,10,3,1] ===== */
    var bins = [['燃える', '#16a34a'], ['ペット', '#2563eb'], ['缶', '#ca8a04']];
    for (var bi = 0; bi < 3; bi++) { RR(10 * T + bi * T + 2, 10 * T + 3, T - 4, T - 6, 3, bins[bi][1]); C(10 * T + bi * T + 16, 10 * T + 12, 6, 'rgba(255,255,255,.85)'); TX(bins[bi][0], 10 * T + bi * T + 16, 10 * T + 24, 7, '#fff'); }

    /* ===== Cửa kính trượt ở đáy (ô cửa 8,11) — vẽ sau mặt tiền ===== */
    R(8 * T - 2, 11 * T + 2, T + 4, T - 4, '#475569');
    R(8 * T, 11 * T + 4, T - 8, T - 8, 'rgba(186,230,253,.95)'); R(8 * T + 15, 11 * T + 4, 3, T - 8, '#e5e7eb');
    L(8 * T + 4, 11 * T + 26, 8 * T + 12, 11 * T + 8, 'rgba(255,255,255,.8)', 2);
    TX('自動', 8 * T + 16, 11 * T + 10, 7, '#0369a1');
    // Vạch dẫn sàn từ cửa tới quầy
    for (var dl = 0; dl < 3; dl++) R(8 * T + 14, (7 + dl) * T + 10, 4, 12, 'rgba(250,204,21,.55)');
  }

  window.MAPDEF['combini'] = {
    id: 'combini',
    label: '🏪 Combini 秋葉原マート',
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
      '#..............#',
      '########D#######'
    ],
    paint: paint,
    solidsExtra: [
      [1, 1, 5, 1],   // kệ sau quầy (sau lưng nhân viên)
      [8, 1, 1, 1],   // trụ máy phụ — vây phía đông ô nhân viên
      [1, 2, 9, 1],   // quầy thu ngân dài
      [10, 1, 2, 1],  // máy photocopy
      [13, 1, 2, 1],  // ATM
      [2, 4, 1, 3],   // kệ onigiri / bento
      [5, 4, 1, 3],   // kệ bánh mì
      [8, 4, 1, 3],   // tủ/kệ đồ uống
      [11, 4, 1, 3],  // kệ mì ly / đồ ăn vặt
      [14, 4, 1, 3],  // kệ tạp chí / comic tường phải
      [1, 9, 3, 1],   // bàn + 2 ghế イートイン
      [13, 9, 2, 1],  // tủ đông kem
      [10, 10, 3, 1]  // thùng rác phân loại 3 ngăn
    ],
    doors: { '8,11': { to: 'street', spawn: [36, 4] } },
    npcs: [
      { id: 'yui', name: 'Yui', sprite: 'yui', tx: 7, ty: 1, behavior: 'stand', scene: 'combini', label: '💬 Nói chuyện', range: 84 }
    ],
    objects: [],
    spawnDefault: [8, 9]
  };
})();
