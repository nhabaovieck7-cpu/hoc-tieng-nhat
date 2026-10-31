// maps-bank.js — Ngân hàng hư cấu «丸の内銀行» (bối cảnh 2D, đợt duyệt).
// Dữ liệu thuần + paint theo hợp đồng maps-core.js. Không trạng thái chạy.
// Quầy giao dịch chừa lối vòng hai đầu (x1-2 và x12-16 ở hàng y=3);
// ô nhân viên (5,2) cố ý KHÔNG nằm trong solidsExtra.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['bank'] = {
  id: 'bank',
  label: '🏦 Ngân hàng 丸の内銀行',
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
    '#########D########'
  ],
  solidsExtra: [
    [2, 1, 3, 1],    // bàn làm việc sau quầy — tây
    [7, 1, 3, 1],    // tủ hồ sơ / bàn sau quầy — đông
    [11, 1, 1, 1],   // cửa kho tiền (vault) trên tường bắc
    [13, 1, 3, 1],   // dãy 3 máy ATM dọc tường bắc — điểm tương tác
    [3, 3, 9, 1],    // quầy giao dịch vách kính (chừa lối vòng 2 đầu)
    [5, 6, 3, 1],    // ghế chờ — hàng tây
    [10, 6, 3, 1],   // ghế chờ — hàng đông
    [2, 8, 3, 1],    // bàn điền biểu mẫu
    [15, 8, 1, 1],   // máy lấy số thứ tự gần cửa
    [16, 9, 1, 1]    // chậu cây góc đông-nam
  ],
  doors: { '9,10': { to: 'shotengai', spawn: [24, 4] } },
  npcs: [
    { id: 'bank-staff', name: 'Nhân viên ngân hàng', sprite: 'officer', tx: 5, ty: 2, behavior: 'stand', scene: 'bank-counter', label: '💬 Tới quầy ngân hàng', range: 96 }
  ],
  objects: [
    { tx: 13, ty: 1, tw: 3, th: 1, interact: { scene: 'bank-atm', label: '🏧 Dùng máy ATM' } }
  ],
  spawnDefault: [9, 8],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Sàn đá bóng + tường ngân hàng ===== */
    rect(0, -40, 18 * T, 11 * T + 40, '#ddd6c4');
    rect(32, 32, 16 * T, 9 * T, '#d7dde0');
    var tx, ty, i;
    for (ty = 1; ty <= 9; ty++) for (tx = 1; tx <= 16; tx++) {
      if ((tx + ty) % 2 === 0) rect(tx * T, ty * T, T, T, 'rgba(255,255,255,0.24)');
      if (H.hash(tx, ty * 7) > 0.9) rect(tx * T + 6, ty * T + 20, 11, 2, 'rgba(255,255,255,0.4)');
    }
    for (i = 1; i < 16; i++) line(32 + i * T, 32, 32 + i * T, 320, 'rgba(145,155,160,0.30)', 1);
    for (i = 1; i < 9; i++) line(32, 32 + i * T, 544, 32 + i * T, 'rgba(145,155,160,0.30)', 1);
    line(110, 300, 330, 50, 'rgba(255,255,255,0.15)', 20);
    rect(0, 0, 18 * T, 32, '#f0ead9'); rect(0, 0, 32, 11 * T, '#e8e1cf');
    rect(544, 0, 32, 11 * T, '#e8e1cf'); rect(0, 320, 18 * T, 32, '#e8e1cf');
    line(32, 32, 544, 32, '#bdb294', 2);
    // Thảm đỏ dẫn từ cửa tới quầy
    rect(282, 128, 24, 192, 'rgba(160,44,44,0.20)');
    H.txt(g, '▲', 294, 168, 9, 'rgba(160,44,44,0.5)'); H.txt(g, '▲', 294, 240, 9, 'rgba(160,44,44,0.5)');

    /* ===== Biển ngân hàng (vùng y âm) + biển treo trần ===== */
    line(170, -40, 170, -24, '#8a9299', 2); line(406, -40, 406, -24, '#8a9299', 2);
    g.fillStyle = '#14532d'; H.rr(g, 160, -37, 256, 29, 5);
    H.txt(g, '丸の内銀行', 288, -22, 17, '#ffffff');
    g.fillStyle = '#2e6da4'; H.rr(g, 52, -33, 92, 22, 4); H.txt(g, '窓口', 98, -22, 11, '#ffffff');
    g.fillStyle = '#b45309'; H.rr(g, 436, -33, 92, 22, 4); H.txt(g, 'ATM', 482, -22, 12, '#ffffff');
    rect(224, 5, 128, 22, '#14532d'); H.txt(g, '丸の内銀行', 288, 16, 12, '#ffffff');
    // Bảng lãi suất / tỷ giá treo tường tây + bảng số đang gọi tường đông
    rect(40, 4, 62, 24, '#ffffff'); rect(40, 4, 62, 7, '#14532d'); H.txt(g, '金利', 71, 19, 8, '#33302e');
    g.fillStyle = '#15181c'; H.rr(g, 462, 3, 62, 26, 3);
    H.txt(g, 'A12', 493, 13, 12, '#ff9f1c'); H.txt(g, '受付中', 493, 24, 6, '#ffb85c');

    /* ===== Sau quầy: bàn làm việc (2,1)-(4,1) + tủ hồ sơ (7,1)-(9,1) + kho tiền (11,1) ===== */
    rect(66, 36, 92, 22, '#8a97a5');
    for (i = 0; i < 3; i++) { rect(70 + i * 30, 40, 20, 11, '#2f3b4c'); rect(72 + i * 30, 42, 16, 7, '#a8d8f0'); }
    rect(226, 35, 92, 24, '#9aa7b0'); line(230, 43, 314, 43, '#75828c', 2); line(230, 51, 314, 51, '#75828c', 2);
    for (i = 0; i < 4; i++) rect(232 + i * 22, 36, 7, 22, i % 2 ? '#e8e2d4' : '#cfd8dc');
    rect(354, 33, 28, 30, '#6d7a84'); ring(368, 48, 8, '#39434c', 3); cir(368, 48, 2.5, '#ffd94d');
    H.txt(g, '金庫', 368, 27, 7, '#39434c');
    g.fillStyle = '#44546a'; H.rr(g, 148, 68, 28, 16, 3); // lưng ghế nhân viên ở ô (5,2)
    rect(140, 84, 44, 6, '#f4f4f4'); H.txt(g, '申込書', 162, 87, 5, '#888888');

    /* ===== Dãy ATM (13,1)-(15,1) — điểm tương tác bank-atm ===== */
    for (i = 0; i < 3; i++) {
      var ax = (13 + i) * T;
      rect(ax + 2, 34, 28, 28, '#31517d'); rect(ax + 2, 34, 28, 6, '#b45309');
      H.txt(g, 'ATM', ax + 16, 37, 6, '#ffffff');
      rect(ax + 6, 43, 20, 10, '#7ac74f'); rect(ax + 7, 53, 12, 3, '#15181c'); rect(ax + 22, 53, 5, 6, '#d8dde2');
      cir(ax + 24, 45, 1.8, '#ffd94d');
    }
    H.txt(g, 'ATMコーナー', 14 * T + 16, 27, 7, '#6b5a2e');
    line(13 * T, 62, 16 * T, 62, '#b45309', 2);

    /* ===== Quầy giao dịch (3,3)-(11,3): mặt đá + vách kính + số thứ tự từng ô ===== */
    rect(96, 96, 288, 32, '#f2ede2'); rect(96, 112, 288, 16, '#cfc4ab');
    rect(96, 96, 288, 5, '#ffffff'); rect(96, 124, 288, 4, '#8a7a5c');
    rect(100, 70, 280, 24, 'rgba(175,215,235,0.55)'); // vách kính phía trên quầy
    g.strokeStyle = '#8fa8b5'; g.lineWidth = 2; g.strokeRect(100, 70, 280, 24);
    for (i = 0; i < 5; i++) line(100 + i * 70, 70, 100 + i * 70, 94, '#8fa8b5', 2);
    line(122, 90, 160, 74, 'rgba(255,255,255,0.65)', 3); line(262, 90, 300, 74, 'rgba(255,255,255,0.5)', 3);
    var winN = ['①', '②', '③'];
    for (i = 0; i < 3; i++) {
      var wx = 152 + i * 96;
      g.fillStyle = '#14532d'; H.rr(g, wx - 34, 50, 68, 14, 3);
      H.txt(g, i === 0 ? '預金・口座' : (i === 1 ? '振込' : '両替'), wx, 57, 7.5, '#ffffff');
      cir(wx, 106, 9, '#14532d'); ring(wx, 106, 9, '#ffffff', 2); H.txt(g, String(i + 1), wx, 106, 10, '#ffffff');
    }
    rect(118, 114, 30, 10, '#ffffff'); H.txt(g, '在留カード', 133, 119, 5, '#666666'); // nhắc giấy tờ trên quầy
    rect(330, 114, 30, 10, '#fdf6d8'); H.txt(g, '印鑑', 345, 119, 6, '#6b5a2e');
    // Dây ngăn hàng chờ trước quầy
    cir(232, 138, 3.5, '#c9a227'); cir(344, 138, 3.5, '#c9a227');
    line(232, 132, 232, 138, '#8a9299', 2); line(344, 132, 344, 138, '#8a9299', 2);
    g.strokeStyle = '#14532d'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(232, 136); g.quadraticCurveTo(288, 146, 344, 136); g.stroke();

    /* ===== Ghế chờ 2 hàng (5,6)-(7,6) và (10,6)-(12,6) ===== */
    var blocks = [[5, 6], [10, 6]];
    for (var b = 0; b < blocks.length; b++) for (i = 0; i < 3; i++) {
      var cxp = (blocks[b][0] + i) * T, cyp = blocks[b][1] * T;
      g.fillStyle = 'rgba(30,60,45,0.20)'; H.rr(g, cxp + 3, cyp + 5, 26, 24, 4);
      g.fillStyle = '#1e6b4a'; H.rr(g, cxp + 3, cyp + 2, 26, 10, 3);
      g.fillStyle = '#25936a'; H.rr(g, cxp + 3, cyp + 14, 26, 13, 3);
    }
    rect(268, 198, 15, 10, '#e0533d'); H.txt(g, 'A12', 275.5, 203, 5.5, '#ffffff'); // phiếu số trên ghế

    /* ===== Bàn điền biểu mẫu (2,8)-(4,8) ===== */
    g.fillStyle = '#c9a876'; H.rr(g, 66, 260, 92, 20, 3); rect(64, 254, 4, 32, '#a98a5e'); rect(156, 254, 4, 32, '#a98a5e');
    rect(72, 264, 20, 12, '#ffffff'); rect(98, 264, 20, 12, '#ffffff'); rect(124, 264, 20, 12, '#fdf6d8');
    line(75, 268, 89, 268, '#b5b5b5', 1); line(75, 272, 89, 272, '#b5b5b5', 1); line(101, 268, 115, 268, '#b5b5b5', 1);
    ring(134, 270, 4, '#c0392b', 1.5); line(146, 274, 154, 264, '#2f3b4c', 2.5); // con dấu mẫu + bút buộc dây
    H.txt(g, '記入台', 112, 291, 8, '#6b6250');

    /* ===== Máy lấy số 発券機 (15,8) ===== */
    g.fillStyle = '#5a646e'; H.rr(g, 482, 258, 28, 30, 3);
    rect(482, 258, 28, 8, '#14532d'); H.txt(g, '発券', 496, 262, 6, '#ffffff');
    rect(486, 269, 20, 10, '#a8e6f0'); cir(496, 284, 3.5, '#ffd94d'); ring(496, 284, 3.5, '#c9a227', 1);
    H.txt(g, '番号札をどうぞ', 496, 298, 6, '#14532d');

    /* ===== Cây góc đông-nam (16,9) + giá tạp chí cạnh cửa ===== */
    cir(528, 300, 8, '#5da464'); cir(522, 304, 6, '#4c8a54'); cir(534, 304, 6, '#6cb574');
    g.fillStyle = '#a96a44'; H.rr(g, 520, 306, 16, 11, 2);
    rect(392, 294, 24, 20, '#7a8a99'); rect(395, 288, 6, 10, '#e9c44d'); rect(403, 288, 6, 10, '#7fb3d5'); rect(411, 290, 5, 9, '#e8a0b4');

    /* ===== Cửa kính tự động ô D (9,10) + thảm ===== */
    rect(258, 292, 44, 20, '#8a9299'); H.txt(g, '丸の内銀行', 280, 302, 6, '#eef2f2');
    rect(290, 320, 28, 32, '#bfe0ee'); g.strokeStyle = '#5f7a68'; g.lineWidth = 2; g.strokeRect(290, 320, 28, 32);
    line(304, 320, 304, 352, '#5f7a68', 2);
    rect(290, 320, 28, 7, '#14532d'); H.txt(g, '自動ドア', 304, 323.5, 5, '#ffffff');
    rect(240, 322, 40, 24, '#dcebe2'); rect(328, 322, 40, 24, '#dcebe2'); // kính hai bên cửa
  }
};
