// maps-seibi.js — Xưởng sửa ô tô «豊田自動車» (bối cảnh 2D, đợt mở rộng ngành).
// Chuẩn thật: hai cầu nâng có xe, tủ dụng cụ đỏ, chồng lốp, bàn làm việc, góc văn phòng
// tiếp khách, hố kiểm tra sơn trên sàn, biển 点検・車検. Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['seibi'] = {
  id: 'seibi',
  label: '🔧 Xưởng sửa ô tô — 豊田自動車',
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
    '#####D################'
  ],
  solidsExtra: [
    [2, 1, 5, 3],   // cầu nâng 1 + xe đang nâng
    [9, 1, 5, 3],   // cầu nâng 2 + xe chờ
    [16, 1, 4, 1],  // tủ dụng cụ + kệ phụ tùng
    [17, 3, 3, 2],  // chồng lốp
    [2, 6, 4, 1],   // bàn làm việc 工作台
    [17, 6, 4, 2]   // góc văn phòng (bàn + ghế khách)
  ],
  doors: { '5,11': { to: 'street', spawn: [46, 10] } },
  npcs: [
    { id: 'seibi-boss', name: 'Ông chủ kiêm thợ cả — chú Ito', sprite: 'senpai', tx: 7, ty: 5, behavior: 'stand', scene: 'seibi-boss', label: '💬 Chào chú Ito', range: 72 }
  ],
  objects: [],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Biển hiệu ===== */
    rect(0, -40, 22 * T, 34, '#31517d'); H.txt(g, '豊田自動車 — 点検・車検・整備', 352, -23, 14, '#ffffff');

    /* ===== Sàn xưởng: bê tông tối + vạch ô làm việc vàng + hố kiểm tra ===== */
    rect(0, 0, 22 * T, 12 * T, '#8f9296');
    var tx, ty, i, j;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 22; tx++) {
      if (H.hash(tx * 4, ty * 6) > 0.78) rect(tx * T + 7, ty * T + 9, 6, 4, 'rgba(40,42,46,0.25)');
    }
    g.strokeStyle = '#e8c33a'; g.lineWidth = 2;
    g.strokeRect(2 * T - 3, 1 * T - 3, 5 * T + 6, 3 * T + 6);
    g.strokeRect(9 * T - 3, 1 * T - 3, 5 * T + 6, 3 * T + 6);
    rect(11 * T, 8 * T + 6, 5 * T, 14, '#6d7278'); line(11 * T, 8 * T + 13, 16 * T, 8 * T + 13, '#565d63', 2);  // hố kiểm tra ピット
    H.txt(g, 'ピット', 13 * T + 16, 8 * T + 30, 7, '#4c565e');

    /* ===== Hai cầu nâng + xe ===== */
    function lift(lx, car, raised) {
      var x = lx * T;
      line(x + 10, 1 * T + 4, x + 10, 4 * T - 4, '#31517d', 6); line(x + 5 * T - 10, 1 * T + 4, x + 5 * T - 10, 4 * T - 4, '#31517d', 6);
      var cy = raised ? 2 * T - 6 : 2 * T + 16;
      g.fillStyle = car; H.rr(g, x + 16, cy, 5 * T - 32, 40, 9);
      rect(x + 44, cy - 8, 60, 12, car); rect(x + 52, cy - 6, 44, 9, '#9fd0e8');
      ring(x + 42, cy + 42, 9, '#22252a', 4); ring(x + 5 * T - 42, cy + 42, 9, '#22252a', 4);
      if (raised) { rect(x + 30, cy + 40, 8, 16, '#565d63'); rect(x + 5 * T - 38, cy + 40, 8, 16, '#565d63'); }
    }
    lift(2, '#c73e3a', true);
    lift(9, '#d8dde2', false);
    H.txt(g, 'リフト1', 4 * T + 16, 4 * T + 12, 8, '#374151'); H.txt(g, 'リフト2', 11 * T + 16, 4 * T + 12, 8, '#374151');

    /* ===== Tủ dụng cụ (16,1) + chồng lốp (17,3) ===== */
    rect(16 * T + 2, 1 * T + 2, 4 * T - 4, T - 4, '#c73e3a');
    for (i = 0; i < 4; i++) { line(16 * T + 4, 1 * T + 9 + i * 6, 20 * T - 4, 1 * T + 9 + i * 6, '#a02c28', 2); cir(16 * T + 14 + i * 26, 1 * T + 12, 2, '#f2d38a'); }
    H.txt(g, '工具', 18 * T, 2 * T + 8, 8, '#7e1f1a');
    for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) ring(17 * T + 26 + j * 44, 3 * T + 22 + i * 18, 13, '#22252a', 6);
    H.txt(g, 'タイヤ', 18 * T + 16, 5 * T + 12, 8, '#374151');

    /* ===== Bàn làm việc (2,6): phụ tùng + đèn + sổ 点検 ===== */
    rect(2 * T + 2, 6 * T + 3, 4 * T - 4, T - 6, '#6d5138'); rect(2 * T + 2, 6 * T + 3, 4 * T - 4, 6, '#8a6f52');
    cir(2 * T + 24, 6 * T + 18, 6, '#9aa5ad'); cir(3 * T + 8, 6 * T + 18, 5, '#565d63'); rect(4 * T + 8, 6 * T + 10, 22, 14, '#f4f8f7');
    H.txt(g, '点検簿', 4 * T + 19, 6 * T + 17, 6, '#374151');

    /* ===== Góc văn phòng (17,6)-(20,7): bàn, ghế, lịch 車検, máy tính ===== */
    rect(17 * T + 2, 6 * T + 2, 4 * T - 4, 2 * T - 4, '#e8e2d4');
    rect(17 * T + 8, 6 * T + 10, 40, 22, '#8a6f52'); rect(17 * T + 14, 6 * T + 14, 26, 15, '#26303c'); H.txt(g, '予約', 17 * T + 27, 6 * T + 21, 6, '#7fe0a8');
    cir(19 * T + 8, 7 * T + 8, 8, '#5da4b8'); cir(19 * T + 30, 7 * T + 8, 8, '#5da4b8');
    H.txt(g, '受付', 19 * T, 6 * T - 4, 8, '#5a4632');

    /* ===== Cửa xưởng ô D (5,11): shutter mở + xe khách chờ ngoài ===== */
    rect(130, 322, 64, 26, '#c9cdd2');
    for (i = 0; i < 3; i++) line(132, 328 + i * 6, 192, 328 + i * 6, '#9aa0a6', 2);
    rect(202, 320, 84, 16, '#31517d'); H.txt(g, '営業中 8:30–18:30', 244, 328, 7, '#ffffff');
  }
};
