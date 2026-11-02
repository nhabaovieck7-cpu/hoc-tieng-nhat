// maps-karaoke.js — Karaoke hư cấu 「カラオケ渋谷」 (2D, đợt duyệt bối cảnh mẫu).
// Dữ liệu thuần + paint tĩnh theo hợp đồng MAPDEF (xem maps-core.js).
// Bố cục MỘT bản đồ hai khu: 3 phòng hát phía trên (tường ngăn '#' có khe cửa đi qua
// được, KHÔNG dùng doors nội bộ) → hành lang ngang → hành lang dọc x5 → sảnh lễ tân
// phía dưới, cửa chính ở (5,12).
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
    function room(rx, num, accent) { // phòng hát: TV karaoke ở tường trên + sofa + bàn + đèn disco
      var x = rx * T;
      RR(x + 2, T + 2, 5 * T - 4, T - 4, 3, '#111827'); R(x + 6, T + 5, 5 * T - 12, T - 12, '#312e81');
      TX('♪ カラオケ ♪', x + 2 * T + 16, T + 15, 10, '#a5b4fc');
      for (var n = 0; n < 4; n++) R(x + 14 + n * 34, T + 22, 22, 4, ['#f472b6', '#60a5fa', '#facc15', '#4ade80'][n]);
      TX('TV', x + 5 * T - 14, T + 15, 7, '#94a3b8');
      // sofa hai bên (hàng 3) + bàn giữa (hàng 2)
      RR(x + 2, 3 * T + 4, 2 * T - 4, T - 8, 4, accent); RR(x + 3 * T + 2, 3 * T + 4, 2 * T - 4, T - 8, 4, accent);
      RR(x + 3 * T + 2, 2 * T + 6, T - 4, T - 12, 3, '#78350f'); // bàn của phòng (ô solid ở cột giữa-phải)
      C(x + 3 * T + 16, 2 * T + 14, 4, '#f8fafc'); C(x + 3 * T + 24, 2 * T + 20, 3, '#fca5a5'); // cốc + micro trên bàn
      L(x + 3 * T + 24, 2 * T + 20, x + 3 * T + 29, 2 * T + 12, '#111827', 2); C(x + 3 * T + 30, 2 * T + 11, 3, '#374151');
      // đèn disco + quầng sáng màu trên trần phòng
      C(x + 3 * T, T - 6, 26, 'rgba(244,114,182,.14)'); C(x + 3 * T, T - 6, 6, '#f9a8d4'); C(x + 3 * T - 5, T - 8, 2, '#fff');
      RR(x + 5, 4 * T + 20, 62, 10, 2, '#1f2937'); TX('' + num + '番ルーム', x + 36, 4 * T + 25, 8, '#e5e7eb');
    }

    /* ===== Biển hiệu cao (vùng y âm) ===== */
    R(-4, -40, 22 * T + 8, 36, '#2e1065');
    R(-4, -40, 22 * T + 8, 4, '#f472b6'); R(-4, -9, 22 * T + 8, 4, '#60a5fa');
    TX('🎤', 52, -22, 16, '#fff');
    TX('カラオケ渋谷', 215, -22, 20, '#ffffff');
    TX('KARAOKE SHIBUYA', 395, -22, 11, '#c4b5fd');
    TX('♪ 1人カラオケ歓迎', 570, -22, 11, '#f9a8d4');

    /* ===== Sàn: phòng hát (trên) / hành lang / sảnh (dưới) ===== */
    R(0, 0, 22 * T, 5 * T, '#3b2d5c');                       // khu phòng: thảm tím đậm
    for (var fy = 1; fy < 5; fy++) for (var fx = 1; fx < 21; fx++) if (H.hash(fx, fy) > 0.8) C(fx * T + 10, fy * T + 12, 2, 'rgba(249,168,212,.35)');
    R(0, 6 * T, 22 * T, T, '#57406e');                        // hành lang ngang
    for (var cx1 = 0; cx1 < 22; cx1++) R(cx1 * T + 13, 6 * T + 13, 6, 6, 'rgba(244,114,182,.35)');
    R(0, 8 * T, 22 * T, 5 * T, '#4c1d95');                   // sảnh: tím sáng hơn
    for (var ly = 8; ly < 13; ly++) for (var lx = 0; lx < 22; lx++) if ((lx + ly) % 2 === 0) R(lx * T, ly * T, T, T, 'rgba(255,255,255,.05)');
    R(5 * T, 6 * T, T, 2 * T, '#57406e');                     // hành lang dọc x5 nối hành lang ngang → sảnh

    /* ===== Tường ngăn / tường bao ===== */
    R(0, 0, 22 * T, T, '#241640'); R(0, 0, T, 13 * T, '#241640'); R(21 * T, 0, T, 13 * T, '#241640');
    R(7 * T, 0, T, 5 * T, '#241640'); R(14 * T, 0, T, 5 * T, '#241640'); // vách dọc giữa các phòng
    R(0, 5 * T, 22 * T, T, '#241640');                        // vách ngang dưới phòng (khe cửa vẽ lại ở dưới)
    R(0, 7 * T, 22 * T, T, '#241640');                        // vách giữa hành lang và sảnh (khe x5)
    R(0, 12 * T, 22 * T, T, '#1c1030');
    // Khe cửa phòng: viền sáng + thảm nhỏ + biển số phòng
    var roomDoors = [[3, '1番'], [10, '2番'], [17, '3番']];
    for (var rd = 0; rd < 3; rd++) {
      var dx = roomDoors[rd][0] * T;
      R(dx + 2, 5 * T + 1, T - 4, T - 2, '#6d5a8a'); L(dx + 16, 5 * T + 3, dx + 16, 5 * T + 29, '#2e1065', 2);
      RR(dx - 6, 5 * T - 12, 44, 12, 2, '#f472b6'); TX(roomDoors[rd][1], dx + 16, 5 * T - 6, 8, '#fff');
    }
    // Khe cửa hành lang → sảnh (x5, hàng 7)
    R(5 * T + 2, 7 * T + 1, T - 4, T - 2, '#6d5a8a'); TX('受付 ↓', 5 * T + 16, 7 * T - 8, 8, '#c4b5fd');
    // Biển hướng dẫn trên hành lang
    RR(9 * T + 2, 6 * T + 5, 4 * T - 4, 20, 3, '#1f2937'); TX('お部屋 1〜3番 →', 11 * T, 6 * T + 15, 9, '#f9a8d4');

    /* ===== 3 phòng hát ===== */
    room(1, 1, '#7c3aed'); room(8, 2, '#2563eb'); room(15, 3, '#db2777');
    // Bảng máy chọn bài (リモコン案内) gắn trên vách dưới phòng 1, cạnh khe cửa
    RR(5 * T + 3, 5 * T + 3, 24, 16, 2, '#111827'); R(5 * T + 6, 5 * T + 6, 18, 7, '#67e8f9'); TX('選曲', 5 * T + 15, 5 * T + 24, 7, '#94a3b8');

    /* ===== Máy bán đồ uống ở hành lang [20,6,1,1] ===== */
    RR(20 * T + 3, 6 * T - 8, 26, 40, 3, '#7c2d12'); RR(20 * T + 6, 6 * T - 4, 20, 20, 2, '#eaf6ff');
    for (var vd = 0; vd < 6; vd++) R(20 * T + 8 + (vd % 3) * 6, 6 * T - 1 + Math.floor(vd / 3) * 8, 4, 6, ['#e0533d', '#3d7be0', '#39a05a'][vd % 3]);
    R(20 * T + 8, 6 * T + 20, 16, 6, '#451a03'); TX('飲料', 20 * T + 16, 6 * T + 29, 7, '#fed7aa');

    /* ===== Sảnh lễ tân ===== */
    // [7,8,5,1] kệ sau quầy: tủ khóa / kệ dép + bảng giá treo
    RR(7 * T + 2, 8 * T + 2, 5 * T - 4, T - 4, 3, '#4b3268');
    for (var k1 = 0; k1 < 5; k1++) { R(7 * T + 6 + k1 * 29, 8 * T + 6, 23, 10, '#6d5a8a'); TX('' + (k1 + 1), 7 * T + 17 + k1 * 29, 8 * T + 11, 7, '#e9d5ff'); }
    TX('ロッカー', 9 * T + 16, 8 * T + 25, 7, '#c4b5fd');
    RR(14 * T + 2, 8 * T + 2, 2 * T - 4, T - 4, 3, '#ffffff'); TX('料金', 15 * T, 8 * T + 10, 9, '#7c2d12'); TX('30分 ¥250〜', 15 * T, 8 * T + 22, 7, '#7c3aed');
    // Quầy lễ tân [7,10,5,1] (NPC đứng hàng 9, sau quầy)
    RR(7 * T, 10 * T + 1, 5 * T, T - 2, 4, '#f5f0fa'); R(7 * T, 10 * T + 22, 5 * T, 9, '#7c3aed'); R(7 * T, 10 * T + 1, 5 * T, 5, '#ddd6fe');
    RR(7 * T + 6, 10 * T - 6, 48, 21, 3, '#ffffff'); TX('受付', 7 * T + 30, 10 * T - 1, 11, '#7c3aed'); TX('FRONT', 7 * T + 30, 10 * T + 10, 6, '#64748b');
    RR(10 * T + 14, 10 * T - 5, 34, 19, 3, '#111827'); R(10 * T + 17, 10 * T - 2, 28, 9, '#67e8f9'); TX('♪', 11 * T + 15, 10 * T + 3, 8, '#164e63');
    TX('ドリンクバー', 9 * T + 10, 10 * T + 26, 8, '#5b21b6');
    // [14,8,2,1] máy nước / drink bar phụ ở sảnh đông — gộp vào bảng giá phía trên nên vẽ máy tại (18,8)
    RR(18 * T + 3, 8 * T + 1, 2 * T - 6, T - 2, 3, '#0ea5e9'); R(18 * T + 7, 8 * T + 5, 20, 12, '#e0f2fe'); C(18 * T + 40, 8 * T + 11, 4, '#dc2626'); C(18 * T + 48, 8 * T + 11, 4, '#22c55e'); TX('飲み放題', 19 * T, 8 * T + 25, 8, '#e0f2fe');
    // Ghế sofa chờ ở sảnh tây
    RR(T + 3, 9 * T + 5, 3 * T - 6, 20, 5, '#9d4edd'); RR(T + 3, 9 * T + 3, 3 * T - 6, 8, 4, '#7b2cbf'); TX('待合', 2 * T + 16, 9 * T + 17, 8, '#e9d5ff');
    // Poster ca sĩ trên tường sảnh
    RR(16 * T + 4, 11 * T + 3, 54, 25, 3, '#f472b6'); TX('新曲入荷！', 16 * T + 31, 11 * T + 11, 9, '#fff'); TX('演歌・J-POP', 16 * T + 31, 11 * T + 22, 7, '#fce7f3');

    /* ===== Cửa chính (5,12) ở sảnh: thảm + cửa kính + biển OPEN ===== */
    RR(3 * T + 2, 11 * T + 4, 5 * T - 4, T - 9, 3, '#312e81'); TX('カラオケ渋谷', 5 * T + 16, 11 * T + 16, 9, '#c4b5fd');
    R(5 * T - 2, 12 * T + 1, T + 4, T - 2, '#475569');
    R(5 * T + 2, 12 * T + 4, T - 4, T - 7, 'rgba(186,230,253,.92)'); R(5 * T + 15, 12 * T + 4, 3, T - 7, '#e5e7eb');
    L(5 * T + 5, 12 * T + 25, 5 * T + 12, 12 * T + 9, 'rgba(255,255,255,.8)', 2);
    RR(6 * T + 6, 12 * T + 4, 40, 15, 3, '#22c55e'); TX('OPEN', 6 * T + 26, 12 * T + 12, 8, '#fff');
    TX('入口', 5 * T + 16, 12 * T + 10, 7, '#0369a1');
  }

  window.MAPDEF['karaoke'] = {
    id: 'karaoke',
    label: '🎤 Karaoke カラオケ渋谷',
    grid: [
      '######################',
      '#......#......#......#',
      '#......#......#......#',
      '#......#......#......#',
      '#......#......#......#',
      '###.######.######.####',
      '#....................#',
      '#####.################',
      '#....................#',
      '#....................#',
      '#....................#',
      '#....................#',
      '#####D################'
    ],
    paint: paint,
    solidsExtra: [
      [1, 1, 5, 1],   // TV karaoke phòng 1
      [8, 1, 5, 1],   // TV karaoke phòng 2
      [15, 1, 5, 1],  // TV karaoke phòng 3
      [4, 2, 1, 1],   // bàn phòng 1
      [11, 2, 1, 1],  // bàn phòng 2
      [18, 2, 1, 1],  // bàn phòng 3
      [1, 3, 2, 1],   // sofa tây phòng 1
      [4, 3, 2, 1],   // sofa đông phòng 1
      [8, 3, 2, 1],   // sofa tây phòng 2
      [11, 3, 2, 1],  // sofa đông phòng 2
      [15, 3, 2, 1],  // sofa tây phòng 3
      [18, 3, 2, 1],  // sofa đông phòng 3
      [20, 6, 1, 1],  // máy bán đồ uống ở hành lang
      [7, 8, 5, 1],   // kệ tủ khóa sau quầy lễ tân
      [14, 8, 2, 1],  // bảng giá / kệ quầy (đông quầy)
      [18, 8, 2, 1],  // máy drink bar ở sảnh
      [1, 9, 3, 1],   // ghế sofa chờ ở sảnh (tây)
      [7, 10, 5, 1]   // quầy lễ tân sảnh
    ],
    doors: { '5,12': { to: 'shotengai', spawn: [47, 4] } },
    npcs: [
      { id: 'karaoke-reception', name: 'Lễ tân karaoke', sprite: 'staffF', tx: 8, ty: 9, behavior: 'stand', scene: 'karaoke-reception', label: '💬 Thuê phòng hát', range: 84 }
    ],
    objects: [
      { tx: 3, ty: 5, tw: 1, th: 1, interact: { scene: 'karaoke-room', label: '🎤 Xem phòng hát số 1' } }
    ],
    spawnDefault: [5, 10]
  };
})();
