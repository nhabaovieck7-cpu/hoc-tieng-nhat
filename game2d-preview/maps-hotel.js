// maps-hotel.js — Khách sạn «ホテルお台場» khu nhân viên + phòng khách đang dọn (2D, đợt mở rộng ngành).
// Chuẩn thật: hành lang trải thảm, hai phòng khách mở cửa (một phòng đang thay ga giường,
// một phòng đã dọn xong), xe đẩy dọn phòng, kho vải lanh, khu nhân viên có tủ đồ + bảng ca.
// Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['hotel'] = {
  id: 'hotel',
  label: '🛏️ Khách sạn — ホテルお台場 (khu nhân viên)',
  grid: [
    '######################',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '#....................#',
    '########D#############'
  ],
  solidsExtra: [
    [3, 1, 3, 2],   // giường phòng 301 đang thay ga
    [11, 1, 3, 2],  // giường phòng 302 đã dọn xong
    [18, 1, 3, 2],  // kho vải lanh リネン庫
    [6, 5, 2, 1],   // xe đẩy dọn phòng 清掃カート
    [2, 8, 4, 1],   // tủ đồ nhân viên
    [9, 8, 3, 1],   // bàn nghỉ nhân viên + bảng phân ca
    [15, 8, 4, 1]   // kệ khăn + đồ amenities dự trữ
  ],
  doors: { '8,11': { to: 'shotengai', spawn: [16, 10] } },
  npcs: [
    { id: 'hotel-senpai', name: 'Chị Kato — senpai dọn phòng', sprite: 'staffF', tx: 7, ty: 4, behavior: 'stand', scene: 'hotel-senpai', label: '💬 Chào senpai Kato', range: 72 }
  ],
  objects: [],
  spawnDefault: [8, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu ===== */
    rect(0, -40, 22 * T, 34, '#2c3e6b'); H.txt(g, 'ホテル お台場 — スタッフエリア', 352, -23, 14, '#f2d38a');

    /* ===== Sàn: phòng khách (trên) sàn gỗ + hành lang thảm đỏ nâu + khu nhân viên (dưới) ===== */
    rect(0, 0, 22 * T, 12 * T, '#d9cdb2');
    rect(32, 32, 20 * T, 3 * T, '#d8c49c');
    rect(32, 5 * T, 20 * T, 2 * T, '#7d4a4a'); rect(32, 5 * T + 4, 20 * T, 3, '#c9a86a'); rect(32, 7 * T - 7, 20 * T, 3, '#c9a86a');
    rect(32, 8 * T, 20 * T, 3 * T, '#cfc8b8');
    var tx, ty, i;
    for (ty = 8; ty <= 10; ty++) for (tx = 1; tx <= 20; tx++) { g.strokeStyle = 'rgba(110,105,92,0.3)'; g.lineWidth = 1; g.strokeRect(tx * T + 0.5, ty * T + 0.5, T - 1, T - 1); }
    H.txt(g, '3F 客室フロア', 352, 4 * T + 20, 9, '#7d4a4a');

    /* ===== Phòng 301 (x2–7): giường đang thay ga — ga trắng vắt nửa, gối để lệch ===== */
    rect(2 * T, 1 * T, 6 * T, 3 * T, 'rgba(90,60,30,0.10)');
    rect(3 * T + 2, 1 * T + 2, 3 * T - 4, 2 * T - 4, '#8a6f52');
    rect(3 * T + 5, 1 * T + 5, 3 * T - 10, 2 * T - 16, '#f4f1ea'); rect(3 * T + 40, 1 * T + 20, 40, 22, '#e8e2d4');  // ga đã trải + ga đang vắt
    rect(3 * T + 6, 1 * T + 6, 22, 14, '#ffffff'); rect(4 * T + 16, 2 * T + 2, 20, 12, '#e8e2d4');
    H.txt(g, '301', 5 * T, 4 * T - 6, 9, '#5a4632'); H.txt(g, '清掃中', 5 * T + 30, 4 * T - 6, 7, '#c73e3a');

    /* ===== Phòng 302 (x10–15): giường đã dọn — ga phẳng, khăn xếp hình, tờ chào trên gối ===== */
    rect(10 * T, 1 * T, 6 * T, 3 * T, 'rgba(90,60,30,0.10)');
    rect(11 * T + 2, 1 * T + 2, 3 * T - 4, 2 * T - 4, '#8a6f52');
    rect(11 * T + 5, 1 * T + 5, 3 * T - 10, 2 * T - 10, '#ffffff');
    rect(11 * T + 6, 1 * T + 6, 22, 14, '#ffffff'); rect(12 * T + 16, 1 * T + 6, 22, 14, '#f7f3e4');
    cir(12 * T + 8, 2 * T + 8, 5, '#7fb3d5'); H.txt(g, '302', 13 * T, 4 * T - 6, 9, '#5a4632'); H.txt(g, '清掃済', 13 * T + 30, 4 * T - 6, 7, '#2e7d4f');

    /* ===== Kho vải lanh (18,1)-(20,2): kệ ga/khăn xếp chồng ===== */
    rect(18 * T + 2, 1 * T + 2, 3 * T - 4, 2 * T - 4, '#9fb6bd');
    for (i = 0; i < 3; i++) { rect(18 * T + 6, 1 * T + 8 + i * 18, 3 * T - 12, 12, i % 2 ? '#e8eef2' : '#ffffff'); }
    H.txt(g, 'リネン庫', 19 * T + 16, 4 * T - 6, 8, '#374151');

    /* ===== Xe đẩy dọn phòng (6,5)-(7,5): thân vải, khăn treo, chai xịt, túi rác đen ===== */
    rect(6 * T + 2, 5 * T + 8, 2 * T - 4, 22, '#6d757e'); rect(6 * T + 2, 5 * T + 8, 2 * T - 4, 6, '#c73e3a');
    rect(6 * T + 8, 5 * T + 16, 18, 12, '#ffffff'); rect(6 * T + 30, 5 * T + 16, 16, 12, '#e8eef2');
    cir(6 * T + 52, 5 * T + 22, 6, '#26303c'); cir(6 * T + 10, 5 * T + 30, 4, '#26303c'); cir(7 * T - 12, 5 * T + 30, 4, '#26303c');

    /* ===== Khu nhân viên: tủ đồ (2,8) + bàn nghỉ/bảng ca (9,8) + kệ khăn dự trữ (15,8) ===== */
    rect(2 * T + 2, 8 * T + 2, 4 * T - 4, T - 4, '#9fb6bd');
    for (i = 0; i < 4; i++) { line(3 * T + i * T, 8 * T + 2, 3 * T + i * T, 9 * T - 2, '#7d929a', 2); cir(2 * T + 22 + i * T, 8 * T + 16, 2, '#4c565e'); }
    rect(9 * T + 2, 8 * T + 4, 3 * T - 4, T - 8, '#f7f3e4'); g.strokeStyle = '#8a6f47'; g.lineWidth = 2; g.strokeRect(9 * T + 2, 8 * T + 4, 3 * T - 4, T - 8);
    H.txt(g, 'シフト表', 10 * T + 16, 8 * T + 12, 8, '#8a5a18');
    rect(15 * T + 2, 8 * T + 2, 4 * T - 4, T - 4, '#b9cdd2');
    for (i = 0; i < 3; i++) rect(15 * T + 6 + i * 10, 8 * T + 8, 8, 8, '#ffffff');
    H.txt(g, 'タオル・アメニティ', 17 * T, 9 * T + 8, 7, '#374151');

    /* ===== Cửa thang máy + cửa ra ô D (8,11) ===== */
    rect(18 * T, 10 * T + 2, 3 * T, T - 4, '#8f979e'); line(19 * T + 16, 10 * T + 2, 19 * T + 16, 11 * T - 2, '#5d646b', 2); H.txt(g, 'EV', 19 * T + 16, 10 * T + 14, 8, '#374151');
    rect(8 * T + 2, 11 * T + 1, T - 4, T - 2, '#5a4630'); rect(8 * T + 5, 11 * T + 4, T - 10, T - 8, '#a8d4ea');
    rect(6 * T, 11 * T + 4, 52, 20, '#7d4a4a'); H.txt(g, 'スタッフ専用', 7 * T + 10, 11 * T + 14, 7, '#ffffff');
  }
};
