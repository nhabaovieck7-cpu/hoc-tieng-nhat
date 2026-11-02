// maps-shiyakusho.js — Ủy ban hư cấu «霞が関区役所» (bối cảnh mẫu 2D, đợt duyệt).
// Dữ liệu thuần + paint theo hợp đồng maps-core.js. Không trạng thái chạy.
// Lưu ý: ô cán bộ (5,1) cố ý KHÔNG nằm trong solidsExtra — vùng sau quầy vẫn
// bị bịt kín bởi hàng quầy (y=2) nên người chơi không vào được, đồng thời
// NPC không rơi vào vùng chặn (đúng bài kiểm tra bắt buộc).
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['shiyakusho'] = {
  id: 'shiyakusho',
  label: '🏢 Shiyakusho 霞が関区役所',
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
    '#................#',
    '#########D########'
  ],
  solidsExtra: [
    [1, 1, 4, 1],    // sau quầy — phía tây (chừa ô cán bộ 5,1)
    [6, 1, 11, 1],   // sau quầy — phía đông (chừa ô cán bộ 5,1)
    [1, 2, 16, 1],   // dãy quầy tiếp nhận dài
    [16, 3, 1, 2],   // bốt ATM tường đông
    [1, 4, 2, 1],    // bốt hướng dẫn / 案内
    [6, 4, 1, 1],    // cột tròn tây
    [11, 4, 1, 1],   // cột tròn đông
    [3, 5, 4, 1],    // ghế chờ hàng 1 — tây
    [11, 5, 4, 1],   // ghế chờ hàng 1 — đông
    [3, 7, 4, 1],    // ghế chờ hàng 2 — tây
    [11, 7, 4, 1],   // ghế chờ hàng 2 — đông
    [1, 8, 1, 2],    // giá/kệ tờ đơn tường tây
    [2, 9, 3, 1],    // bàn viết đơn
    [11, 10, 1, 1]   // máy lấy số thứ tự 発券機 gần cửa
  ],
  doors: { '9,12': { to: 'street', spawn: [24, 4] } },
  npcs: [
    { id: 'officer1', name: 'Cán bộ quầy', sprite: 'officer', tx: 5, ty: 1, behavior: 'stand', scene: 'officer', label: '💬 Tới quầy hỏi', range: 96 },
    { id: 'citizen1', name: 'Người dân đang chờ', sprite: 'mom', tx: 12, ty: 6, behavior: 'stand', label: 'Người dân đang chờ' }
  ],
  objects: [],
  spawnDefault: [9, 10],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Sàn sáng bóng + tường ===== */
    rect(0, -40, 18 * T, 13 * T + 40, '#e8e2d4');
    rect(32, 32, 16 * T, 11 * T, '#dde3e6');
    var tx, ty, i;
    for (ty = 1; ty <= 11; ty++) for (tx = 1; tx <= 16; tx++) {
      if ((tx + ty) % 2 === 0) rect(tx * T, ty * T, T, T, 'rgba(255,255,255,0.20)');
      if (H.hash(tx, ty * 3) > 0.86) rect(tx * T + 4, ty * T + 24, 12, 2, 'rgba(255,255,255,0.35)');
    }
    for (i = 1; i < 16; i++) line(32 + i * T, 32, 32 + i * T, 384, 'rgba(150,160,168,0.30)', 1);
    for (i = 1; i < 11; i++) line(32, 32 + i * T, 544, 32 + i * T, 'rgba(150,160,168,0.30)', 1);
    line(120, 372, 330, 60, 'rgba(255,255,255,0.16)', 20);
    line(330, 372, 520, 90, 'rgba(255,255,255,0.12)', 14);
    rect(0, 0, 18 * T, 32, '#efe9db'); rect(0, 0, 32, 13 * T, '#e7dfd0');
    rect(544, 0, 32, 13 * T, '#e7dfd0'); rect(0, 384, 18 * T, 32, '#e7dfd0');
    line(32, 32, 544, 32, '#c4b89e', 2);

    /* ===== Biển treo trần (vùng y âm) + biển tên ủy ban + poster + bảng số ===== */
    line(156, -40, 156, -20, '#8a9299', 2); line(420, -40, 420, -20, '#8a9299', 2);
    g.fillStyle = '#2e6da4'; H.rr(g, 96, -34, 120, 26, 4); H.txt(g, '受付', 156, -21, 13, '#ffffff');
    g.fillStyle = '#3a7d5d'; H.rr(g, 360, -34, 120, 26, 4); H.txt(g, '証明書発行', 420, -21, 11, '#ffffff');
    rect(224, 4, 128, 24, '#34495e'); H.txt(g, '霞が関区役所', 288, 16, 13, '#ffffff');
    rect(40, 4, 52, 24, '#ffffff'); rect(40, 4, 52, 7, '#d84f4f'); H.txt(g, '転入届', 66, 19, 9, '#33302e');
    rect(100, 4, 52, 24, '#ffffff'); rect(100, 4, 52, 7, '#e9c44d'); H.txt(g, '案内図', 126, 19, 8, '#33302e');
    rect(484, 4, 52, 24, '#ffffff'); rect(484, 4, 52, 7, '#4a7fb5'); H.txt(g, '印鑑登録', 510, 19, 8, '#33302e');
    g.fillStyle = '#15181c'; H.rr(g, 388, 3, 58, 26, 3);
    H.txt(g, '123', 417, 13, 13, '#ff9f1c'); H.txt(g, 'お呼び出し中', 417, 24, 6, '#ffb85c');
    // Poster dọc tường tây / đông (chữ xoay)
    rect(4, 150, 24, 64, '#ffffff'); rect(4, 150, 24, 8, '#d84f4f');
    g.save(); g.translate(16, 186); g.rotate(-Math.PI / 2); H.txt(g, '印鑑登録', 0, 0, 9, '#33302e'); g.restore();
    rect(548, 150, 24, 64, '#ffffff'); rect(548, 150, 24, 8, '#4a7fb5');
    g.save(); g.translate(560, 186); g.rotate(-Math.PI / 2); H.txt(g, '転出届', 0, 0, 9, '#33302e'); g.restore();

    /* ===== Khu sau quầy (y=1): thảm, bàn làm việc, tủ hồ sơ ===== */
    rect(32, 32, 512, 32, '#b9c6d4');
    var offDesk = [1, 2, 3, 4, 7, 9, 11, 13, 15];
    for (i = 0; i < offDesk.length; i++) {
      var ox = offDesk[i] * T;
      rect(ox + 3, 44, 26, 16, '#8a97a5'); rect(ox + 8, 47, 12, 8, '#2f3b4c'); rect(ox + 18, 52, 8, 5, '#f4f4f4');
    }
    for (i = 0; i < 5; i++) { var fx = 200 + i * 66; rect(fx, 34, 20, 12, '#aeb8c2'); line(fx + 3, 40, fx + 17, 40, '#7d8891', 2); }
    g.fillStyle = '#44546a'; H.rr(g, 168, 42, 20, 13, 3);  // lưng ghế của cán bộ ở ô (5,1)
    rect(162, 54, 28, 6, '#f4f4f4');                        // giấy tờ trên bàn trước cán bộ

    /* ===== Dãy quầy tiếp nhận (y=2) + ô số + biển課 ===== */
    rect(32, 64, 512, 32, '#f2ede2'); rect(32, 78, 512, 18, '#d8cfbc');
    rect(32, 64, 512, 5, '#ffffff'); rect(32, 92, 512, 4, '#9a8f76');
    for (i = 0; i <= 8; i++) line(32 + i * 64, 78, 32 + i * 64, 96, '#b3a888', 1.5);
    var winX = [176, 304, 432], winTx = ['住民課', '届出受付', '証明書発行'];
    for (i = 0; i < 3; i++) {
      g.fillStyle = '#34495e'; H.rr(g, winX[i] - 56, 38, 112, 16, 3);
      H.txt(g, winTx[i], winX[i], 46, i === 2 ? 8 : 9, '#ffffff');
      cir(winX[i], 58, 10, '#2e6da4'); ring(winX[i], 58, 10, '#ffffff', 2);
      H.txt(g, String(i + 1), winX[i], 58, 11, '#ffffff');
    }
    // Dây ngăn hàng chờ trước ô ①
    cir(140, 110, 3.5, '#c9a227'); cir(212, 110, 3.5, '#c9a227'); line(140, 104, 140, 110, '#8a9299', 2); line(212, 104, 212, 110, '#8a9299', 2);
    g.strokeStyle = '#c0392b'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(140, 108); g.quadraticCurveTo(176, 118, 212, 108); g.stroke();

    /* ===== Vạch dẫn sàn từ cửa tới quầy ===== */
    rect(300, 96, 8, 288, 'rgba(46,109,164,0.22)');
    H.txt(g, '▲', 304, 140, 9, 'rgba(46,109,164,0.55)'); H.txt(g, '▲', 304, 228, 9, 'rgba(46,109,164,0.55)'); H.txt(g, '▲', 304, 316, 9, 'rgba(46,109,164,0.55)');

    /* ===== Bốt hướng dẫn 案内 (1,4) + cột tròn + ATM (16,3) ===== */
    g.fillStyle = '#f2ede2'; H.rr(g, 34, 134, 60, 20, 3); rect(34, 148, 60, 6, '#d8cfbc');
    line(48, 128, 48, 134, '#8a9299', 2); cir(48, 122, 9, '#2e6da4'); H.txt(g, 'i', 48, 122, 11, '#ffffff');
    rect(56, 138, 10, 7, '#e9c44d'); rect(68, 138, 10, 7, '#7fb3d5'); rect(80, 138, 10, 7, '#e8a0b4');
    H.txt(g, '案内', 64, 168, 8, '#6b6250');
    var colX = [208, 368];
    for (i = 0; i < 2; i++) {
      cir(colX[i], 146, 16, 'rgba(90,100,110,0.25)'); cir(colX[i], 144, 14, '#c9ced2'); cir(colX[i], 144, 12, '#f4f6f7');
      cir(colX[i] - 4, 139, 4, 'rgba(255,255,255,0.7)');
    }
    rect(512, 96, 32, 64, '#31517d'); rect(512, 96, 32, 4, '#d84f4f');
    rect(514, 102, 28, 12, '#ffffff'); H.txt(g, 'ATM', 528, 108, 9, '#31517d');
    rect(516, 118, 24, 34, '#d7dde2'); rect(520, 122, 16, 10, '#7ac74f'); rect(520, 136, 16, 3, '#33302e');
    cir(524, 146, 2, '#31517d'); cir(532, 146, 2, '#c0392b');

    /* ===== Ghế chờ nhựa xanh — 4 khối, mỗi ô 1 ghế ===== */
    var chairBlocks = [[3, 5], [11, 5], [3, 7], [11, 7]];
    for (var b = 0; b < chairBlocks.length; b++) {
      for (var s = 0; s < 4; s++) {
        var cxp = (chairBlocks[b][0] + s) * T, cyp = chairBlocks[b][1] * T;
        g.fillStyle = 'rgba(60,80,90,0.20)'; H.rr(g, cxp + 3, cyp + 5, 26, 24, 4);
        g.fillStyle = '#2f9e8f'; H.rr(g, cxp + 3, cyp + 2, 26, 10, 3);
        g.fillStyle = '#35b5a5'; H.rr(g, cxp + 3, cyp + 14, 26, 13, 3);
        line(cxp + 8, cyp + 29, cxp + 8, cyp + 31, '#5f7a76', 2); line(cxp + 24, cyp + 29, cxp + 24, cyp + 31, '#5f7a76', 2);
      }
    }
    rect(424, 168, 14, 10, '#8a5a33'); line(424, 168, 431, 160, '#8a5a33', 2);  // túi xách để trên ghế (13,5)

    /* ===== Bảng thông báo tường tây + đồng hồ tường đông ===== */
    rect(2, 196, 28, 56, '#b08954');
    rect(6, 200, 9, 12, '#ffffff'); rect(17, 200, 9, 12, '#ffffff'); rect(6, 216, 9, 12, '#fff6d8'); rect(17, 216, 9, 12, '#ffffff');
    cir(10, 202, 1.6, '#d84f4f'); cir(21, 218, 1.6, '#4a7fb5');
    cir(560, 80, 11, '#ffffff'); ring(560, 80, 11, '#6b5a44', 2);
    line(560, 80, 560, 73, '#33302e', 2); line(560, 80, 566, 82, '#33302e', 2);

    /* ===== Giá tờ đơn (1,8) + bàn viết đơn (2,9) ===== */
    rect(34, 258, 28, 60, '#7a8a99'); rect(34, 258, 28, 10, '#34495e'); H.txt(g, '申請書', 48, 263, 6, '#ffffff');
    var formC = ['#ffffff', '#f6d8e0', '#fdf3c0'];
    for (i = 0; i < 3; i++) { rect(38, 272 + i * 15, 20, 9, formC[i]); line(38, 276 + i * 15, 58, 276 + i * 15, '#b08954', 2); }
    g.fillStyle = '#c9a876'; H.rr(g, 66, 294, 92, 20, 3); rect(64, 288, 4, 32, '#a98a5e'); rect(156, 288, 4, 32, '#a98a5e');
    rect(72, 298, 20, 12, '#ffffff'); rect(98, 298, 20, 12, '#ffffff'); rect(124, 298, 20, 12, '#ffffff');
    line(75, 302, 89, 302, '#b5b5b5', 1); line(75, 306, 89, 306, '#b5b5b5', 1); line(101, 302, 115, 302, '#b5b5b5', 1);
    ring(134, 304, 4, '#c0392b', 1.5);
    line(146, 310, 154, 300, '#2f3b4c', 2.5);
    cir(140, 313, 1.2, '#8a9299'); cir(145, 311, 1.2, '#8a9299'); cir(150, 307, 1.2, '#8a9299');
    H.txt(g, '記入台', 112, 327, 8, '#6b6250');

    /* ===== Máy lấy số 発券機 (11,10) + biển sàn ===== */
    g.fillStyle = '#5a646e'; H.rr(g, 354, 322, 28, 30, 3);
    rect(354, 322, 28, 8, '#d84f4f'); H.txt(g, '発券', 368, 326, 6, '#ffffff');
    rect(358, 333, 20, 10, '#a8e6f0'); cir(368, 348, 3.5, '#ffd94d'); ring(368, 348, 3.5, '#c9a227', 1);
    H.txt(g, '発券機', 368, 362, 8, '#c0392b');

    /* ===== Chậu cây góc + giá tờ rơi gần cửa ===== */
    var plantX = [44, 524];
    for (i = 0; i < 2; i++) {
      g.fillStyle = '#a96a44'; H.rr(g, plantX[i] - 8, 358, 16, 12, 2);
      cir(plantX[i], 350, 8, '#5da464'); cir(plantX[i] - 6, 354, 6, '#4c8a54'); cir(plantX[i] + 6, 354, 6, '#6cb574');
    }
    cir(528, 268, 8, '#5da464'); cir(522, 272, 6, '#4c8a54'); g.fillStyle = '#a96a44'; H.rr(g, 520, 274, 16, 11, 2);
    rect(420, 358, 24, 20, '#7a8a99'); rect(423, 352, 6, 10, '#e9c44d'); rect(431, 352, 6, 10, '#7fb3d5'); rect(439, 354, 5, 9, '#e8a0b4');

    /* ===== Cửa kính tự động (9,12) + thảm chào + kính hai bên ===== */
    rect(32, 388, 240, 24, '#cfe6ef'); rect(336, 388, 208, 24, '#cfe6ef');
    for (i = 0; i < 6; i++) line(72 + i * 40, 388, 72 + i * 40, 412, '#9fc6d8', 2);
    for (i = 0; i < 5; i++) line(376 + i * 40, 388, 376 + i * 40, 412, '#9fc6d8', 2);
    g.fillStyle = '#8a9299'; H.rr(g, 282, 356, 44, 20, 3); H.txt(g, 'ようこそ', 304, 366, 7, '#4c545a');
    rect(290, 386, 28, 28, '#bfe0ee'); g.strokeStyle = '#7d8891'; g.lineWidth = 2; g.strokeRect(290, 386, 28, 28);
    line(304, 386, 304, 414, '#7d8891', 2); line(298, 396, 298, 408, '#5f6a72', 2); line(310, 396, 310, 408, '#5f6a72', 2);
    rect(290, 386, 28, 7, '#34495e'); H.txt(g, '自動ドア', 304, 389.5, 5, '#ffffff');
  }
};
