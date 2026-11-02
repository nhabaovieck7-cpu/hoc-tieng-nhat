// maps-kitchen.js — Bếp nhà hàng «築地食堂 厨房» (bối cảnh 2D, đợt mở rộng ngành).
// Khu vực LÀM VIỆC riêng của tuyến nhà hàng, nối từ ô noren ở quầy counter của bản đồ
// 'restaurant'. Chuẩn thật bếp Nhật: dãy bếp ga + chảo, nồi cơm lớn, máy rửa chén, kho
// lạnh, kệ gia vị, bàn ra món (パス) hướng về phía noren, tủ đồ + bảng phân ca ở góc.
// Thể ngữ kép của bếp (kính ngữ với khách / thể thường trong bếp) nằm ở cảnh 'kitchen-manager'.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['kitchen'] = {
  id: 'kitchen',
  label: '👨‍🍳 Bếp nhà hàng — 築地食堂 厨房',
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
    '#................#',
    '##D###############'
  ],
  solidsExtra: [
    [1, 1, 4, 2],   // kho lạnh + tủ đông
    [6, 1, 3, 1],   // kệ gia vị + nồi niêu
    [10, 1, 5, 2],  // dãy bếp ga + chảo + nồi (có hơi)
    [16, 1, 1, 1],  // nồi cơm lớn 炊飯器
    [1, 4, 5, 1],   // bàn sơ chế (thớt + rau củ)
    [8, 4, 4, 1],   // bàn ra món パス + đèn giữ nóng
    [14, 4, 3, 1],  // máy rửa chén + bồn rửa
    [1, 8, 3, 1],   // tủ đồ nhân viên bếp
    [8, 9, 2, 1]    // bảng phân ca シフト表 (tương tác)
  ],
  doors: { '2,11': { to: 'restaurant', spawn: [14, 4] } },
  npcs: [
    { id: 'kitchen-manager', name: 'Anh Sato — bếp trưởng', sprite: 'chef', tx: 11, ty: 6, behavior: 'stand', scene: 'kitchen-manager', label: '💬 Chào bếp trưởng Sato', range: 72 }
  ],
  objects: [
    { tx: 8, ty: 9, tw: 2, th: 1, interact: { scene: 'kitchen-board', label: '🗓️ Xem bảng phân ca của bếp' } }
  ],
  spawnDefault: [2, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu nhỏ phía trên noren (vùng y âm) ===== */
    rect(0, -40, 18 * T, 34, '#1e3a5f'); H.txt(g, '厨房 — 築地食堂', 9 * T, -23, 14, '#ffffff');
    H.txt(g, '関係者以外 立入禁止', 15 * T, -23, 7, '#bfdbfe');

    /* ===== Sàn bếp: gạch thép chống trượt + rãnh thoát nước ===== */
    rect(0, 0, 18 * T, 12 * T, '#c9cdd2');
    var tx, ty, i;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 18; tx++) {
      if ((tx + ty) % 2) rect(tx * T, ty * T, T, T, 'rgba(255,255,255,0.22)');
      g.strokeStyle = 'rgba(100,110,120,0.3)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1);
    }
    rect(0, 7 * T + 14, 18 * T, 5, '#8f979e'); line(0, 7 * T + 16, 18 * T, 7 * T + 16, '#6d757e', 1);

    /* ===== Kho lạnh + tủ đông (1,1)-(4,2) ===== */
    rect(34, 34, 124, 60, '#9ca3af'); line(66, 36, 66, 92, '#6b7280', 2); line(98, 36, 98, 92, '#6b7280', 2);
    H.txt(g, '冷蔵・冷凍', 96, 28, 8, '#374151');
    cir(46, 46, 6, '#26303c'); H.txt(g, '4', 46, 46, 6, '#7fe0a8');

    /* ===== Kệ gia vị (6,1)-(8,1): lọ shoyu/miso/đường muối xếp hàng ===== */
    rect(194, 36, 92, 26, '#8a6f52');
    [['#5d3a1a', '醤'], ['#8a5a18', '味'], ['#e8e2d4', '塩'], ['#c95d5d', '唐']].forEach(function (s, si) {
      rect(200 + si * 22, 42, 14, 16, s[0]); H.txt(g, s[1], 207 + si * 22, 50, 7, si === 2 ? '#5a4632' : '#ffffff');
    });

    /* ===== Dãy bếp ga (10,1)-(14,2): bếp lửa + chảo + nồi bốc hơi ===== */
    rect(322, 34, 156, 60, '#374151');
    cir(346, 58, 13, '#111827'); cir(346, 58, 8, '#3d7be0'); cir(382, 58, 13, '#111827'); cir(382, 58, 8, '#e07830');
    cir(424, 56, 15, '#6b7280'); cir(424, 53, 11, '#d1d5db');
    cir(458, 58, 11, '#9ca3af');
    H.txt(g, '~', 420, 38, 11, '#e5e7eb'); H.txt(g, '~', 434, 34, 11, '#e5e7eb'); H.txt(g, '~', 452, 40, 10, '#e5e7eb');
    H.txt(g, 'コンロ', 400, 28, 8, '#374151');

    /* ===== Nồi cơm lớn (16,1) ===== */
    rect(514, 38, 28, 26, '#e8e2d4'); rect(514, 38, 28, 7, '#8a6f52'); cir(528, 34, 4, '#c73e3a');
    H.txt(g, '炊飯', 528, 70, 7, '#5a4632');

    /* ===== Bàn sơ chế (1,4)-(5,4): thớt, dao để trong hộp, rau củ ===== */
    rect(34, 130, 156, 28, '#d6a05a'); rect(40, 136, 60, 16, '#f5deb3');
    cir(120, 144, 6, '#22c55e'); cir(136, 144, 6, '#f97316'); cir(152, 144, 5, '#e0533d');
    rect(168, 134, 16, 20, '#565d63'); H.txt(g, '包丁', 176, 144, 6, '#ffffff');

    /* ===== Bàn ra món / パス (8,4)-(11,4): đèn giữ nóng đỏ + đĩa chờ ===== */
    rect(258, 130, 124, 28, '#e7e5e4'); rect(260, 133, 120, 6, 'rgba(239,68,68,0.6)');
    cir(282, 148, 8, '#fff7ed'); cir(316, 148, 8, '#ffedd5'); cir(350, 148, 8, '#fff7ed');
    H.txt(g, 'パス', 320, 124, 8, '#991b1b');
    // Chuông gọi món + xấp phiếu オーダー treo phía trên pass
    cir(320, 108, 5, '#ffd94d'); rect(352, 100, 26, 18, '#ffffff'); line(356, 106, 374, 106, '#c73e3a', 1); line(356, 111, 370, 111, '#8a8f94', 1);

    /* ===== Máy rửa chén + bồn rửa (14,4)-(16,4) ===== */
    rect(450, 130, 92, 28, '#a8c3cf'); rect(456, 136, 40, 14, '#38bdf8');
    rect(504, 132, 34, 24, '#9ca3af'); cir(521, 140, 4, '#39a05a'); H.txt(g, '食洗', 521, 152, 6, '#374151');

    /* ===== Tủ đồ bếp (1,8)-(3,8) + tạp dề/mũ treo ===== */
    rect(34, 258, 92, 28, '#9fb6bd');
    for (i = 0; i < 3; i++) { line(64 + i * 30, 258, 64 + i * 30, 286, '#7d929a', 2); }
    rect(140, 260, 12, 18, '#f0ede6'); rect(156, 260, 12, 14, '#26303c'); H.txt(g, 'エプロン', 190, 269, 7, '#5a4632');

    /* ===== Bảng phân ca (8,9)-(9,9) — điểm tương tác ===== */
    rect(258, 290, 60, 30, '#f7f3e4'); g.strokeStyle = '#8a6f47'; g.lineWidth = 2; g.strokeRect(258, 290, 60, 30);
    H.txt(g, 'シフト表', 288, 298, 8, '#8a5a18');
    for (i = 0; i < 4; i++) rect(264 + i * 13, 306, 10, 9, i === 1 ? '#ffe9ec' : '#ffffff');

    /* ===== Phía đông (x17) vẽ noren thông sang sảnh — gợi cửa liên thông phía quầy ===== */
    rect(17 * T, 5 * T, T, 3 * T, '#1e3a5f'); H.txt(g, 'わ', 17 * T + 16, 5 * T + 20, 11, '#fff'); H.txt(g, 'か', 17 * T + 16, 6 * T + 20, 11, '#fff'); H.txt(g, 'ば', 17 * T + 16, 7 * T + 20, 11, '#fff');

    /* ===== Cửa hậu bếp ô D (2,11) ===== */
    rect(34, 322, 92, 26, '#cfc8b8');
    rect(64, 352 - 30, 28, 30, '#7a4a2e'); H.txt(g, '勝手口', 78, 330, 7, '#5a4632');
  }
};
