// maps-room.js — Phòng trọ 1K «高円寺アパート» (bối cảnh mẫu 2D, đợt duyệt).
// Dữ liệu thuần + paint theo hợp đồng maps-core.js. Không trạng thái chạy.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['room'] = {
  id: 'room',
  label: '🏠 Phòng trọ 1K',
  grid: [
    '##############',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#............#',
    '#######D######'
  ],
  solidsExtra: [
    [1, 1, 2, 1],   // tủ quần áo âm tường (oshiire) góc trên-trái
    [8, 1, 2, 2],   // WC riêng góc trên-phải
    [10, 1, 3, 2],  // unit-bath góc trên-phải
    [1, 2, 1, 1],   // kệ sách nhỏ tường tây
    [1, 3, 1, 3],   // bếp mini dọc tường tây (bồn rửa + IH + tủ lạnh)
    [12, 4, 1, 2],  // kệ sách / kệ đồ tường đông
    [2, 7, 3, 2],   // futon
    [5, 7, 2, 1],   // bàn thấp (chabudai)
    [10, 7, 2, 1],  // bàn học
    [5, 9, 2, 1]    // tủ giày ở genkan
  ],
  doors: { '7,10': { to: 'street', spawn: [4, 4] } },
  npcs: [],
  objects: [
    { tx: 1, ty: 1, tw: 2, th: 1, interact: { scene: 'room-wardrobe', label: '👗 Tủ quần áo — soi gương chỉnh ngoại hình & tủ đồ' } },
    { tx: 10, ty: 7, tw: 2, th: 1, interact: { scene: 'room-desk', label: '💻 Bàn học — học online buổi tối' } },
    { tx: 5, ty: 7, tw: 2, th: 1, interact: { scene: 'call-home', label: '📞 Điện thoại trên bàn — gọi về nhà' } },
    { tx: 12, ty: 4, tw: 1, th: 2, interact: { scene: 'room-tv', label: '📺 TV nhỏ trên kệ — xem tin tức buổi tối' } }
    ,{ tx: 1, ty: 3, tw: 1, th: 3, interact: { scene: 'room-fridge', label: '🧊 Tủ lạnh & bếp — ăn/uống đồ đã mua ở siêu thị' } },
    { tx: 2, ty: 7, tw: 3, th: 2, interact: { scene: 'room-sleep', label: '🛏️ Futon — ngủ tới sáng (qua ngày mới, hết say)' } }
  ],
  spawnDefault: [7, 5],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Nền: tường + sàn gỗ ===== */
    rect(0, -40, 14 * T, 11 * T + 40, '#d8cdb6');
    rect(32, 32, 12 * T, 9 * T, '#c79f6d');
    var tx, ty, i;
    for (ty = 1; ty <= 9; ty++) for (tx = 1; tx <= 12; tx++) {
      if (H.hash(tx, ty) > 0.55) rect(tx * T, ty * T, T, T, 'rgba(255,235,200,0.07)');
      if (H.hash(tx * 3, ty * 7) > 0.8) rect(tx * T + 6, ty * T + 20, 9, 2, 'rgba(120,80,40,0.18)');
    }
    for (i = 0; i <= 12; i++) line(32, 32 + i * 24, 416, 32 + i * 24, 'rgba(150,105,58,0.35)', 1);
    // Thảm giữa phòng + phản sáng đèn trần
    g.fillStyle = '#e7dcc4'; H.rr(g, 166, 164, 116, 60, 10);
    g.fillStyle = '#dccfb0'; H.rr(g, 172, 170, 104, 48, 8);
    cir(224, 178, 26, 'rgba(255,255,240,0.10)');
    // Tường bao
    rect(0, 0, 14 * T, 32, '#e9e1cf'); rect(0, 0, 32, 11 * T, '#e2d8c4');
    rect(416, 0, 32, 11 * T, '#e2d8c4'); rect(0, 320, 14 * T, 32, '#e2d8c4');
    line(32, 32, 416, 32, '#b8ab90', 2); line(32, 320, 416, 320, '#b8ab90', 2);

    /* ===== Ban công mini + cửa sổ lớn (mép trên, dùng vùng y âm) ===== */
    rect(92, -40, 136, 30, '#a8d4ea');                    // trời ngoài ban công
    rect(92, -14, 136, 14, '#b9bcbe');                    // sàn ban công
    line(94, -32, 226, -32, '#7d8891', 2); line(94, -22, 226, -22, '#7d8891', 1);
    for (i = 0; i < 8; i++) line(100 + i * 18, -38, 100 + i * 18, -14, '#7d8891', 2);
    line(100, -26, 220, -26, '#5f6a72', 3);               // thanh phơi đồ
    rect(110, -26, 18, 15, '#7fb3d5'); rect(150, -26, 20, 17, '#f4f4f4'); rect(192, -26, 16, 13, '#e8a0b4');
    line(114, -26, 114, -19, '#5f6a72', 1); line(124, -26, 124, -19, '#5f6a72', 1);
    // Kính cửa sổ + khung + rèm
    rect(100, 2, 120, 28, '#bfe0ee');
    line(108, 26, 150, 6, 'rgba(255,255,255,0.55)', 3); line(168, 28, 205, 8, 'rgba(255,255,255,0.4)', 3);
    g.strokeStyle = '#f7f4ec'; g.lineWidth = 3; g.strokeRect(99, 1, 122, 30);
    line(160, 2, 160, 30, '#f7f4ec', 3); line(100, 16, 220, 16, '#f7f4ec', 2);
    rect(94, 0, 13, 32, '#d98a8a'); rect(213, 0, 13, 32, '#d98a8a');
    line(98, 4, 98, 28, '#b96a6a', 1); line(103, 4, 103, 28, '#b96a6a', 1);
    line(217, 4, 217, 28, '#b96a6a', 1); line(222, 4, 222, 28, '#b96a6a', 1);
    rect(94, 30, 132, 3, '#ffffff');

    /* ===== Đồ treo tường: điều hòa, đồng hồ, lịch ===== */
    g.fillStyle = '#f4f4f4'; H.rr(g, 228, 6, 52, 18, 4);
    line(233, 17, 275, 17, '#c9ced2', 2); line(233, 20, 275, 20, '#c9ced2', 1);
    cir(274, 10, 2, '#7ac74f');
    cir(80, 16, 11, '#ffffff'); ring(80, 16, 11, '#6b5a44', 2);
    line(80, 16, 80, 9, '#33302e', 2); line(80, 16, 86, 18, '#33302e', 2); cir(80, 16, 1.6, '#33302e');
    rect(292, 3, 24, 26, '#ffffff'); rect(292, 3, 24, 8, '#d84f4f');
    H.txt(g, '10月', 304, 7, 6, '#ffffff');
    for (i = 0; i < 8; i++) rect(295 + (i % 4) * 5, 14 + Math.floor(i / 4) * 6, 3, 3, i === 5 ? '#d84f4f' : '#c9c2b2');

    /* ===== Tủ quần áo âm tường — cánh trượt fusuma (1,1)-(2,1) ===== */
    rect(34, 34, 60, 28, '#efe6d0'); g.strokeStyle = '#a98f66'; g.lineWidth = 2; g.strokeRect(34, 34, 60, 28);
    line(64, 34, 64, 62, '#a98f66', 2); cir(59, 48, 2.4, '#8a6f47'); cir(69, 48, 2.4, '#8a6f47');
    /* ===== Kệ sách nhỏ tường tây (1,2) ===== */
    rect(34, 66, 28, 28, '#8a5a33'); rect(36, 68, 24, 11, '#6f4525'); rect(36, 81, 24, 11, '#6f4525');
    var bk = ['#c95d5d', '#4a7fb5', '#e9c44d', '#5da464', '#8a6fb8', '#e08a4d'];
    for (i = 0; i < 6; i++) rect(38 + i * 4, 70 + (i > 2 ? 13 : 0), 3, 9, bk[i]);
    /* ===== Bếp mini dọc tường tây (1,3)-(1,5): bồn rửa / IH / tủ lạnh ===== */
    rect(32, 96, 32, 96, '#c0c4c6'); rect(32, 96, 32, 96, 'rgba(255,255,255,0.12)');
    rect(36, 100, 24, 24, '#9fb2b8'); rect(39, 103, 18, 18, '#c3d2d7');
    line(48, 108, 48, 100, '#6f858c', 3); line(48, 100, 54, 100, '#6f858c', 3);
    rect(34, 130, 28, 28, '#3c3f42'); cir(47, 144, 9, '#22252a'); ring(47, 144, 9, '#d84f4f', 1.5); cir(47, 144, 3.5, '#666c72');
    cir(58, 134, 2, '#ffd94d'); cir(58, 152, 2, '#e8e8e8');
    rect(33, 161, 30, 30, '#e8eaea'); line(33, 168, 63, 168, '#b9bebe', 1.5); cir(58, 165, 1.8, '#9aa0a3');
    rect(43, 172, 11, 12, '#ffffff'); line(45, 176, 52, 176, '#b5b5b5', 1); line(45, 180, 52, 180, '#b5b5b5', 1);
    cir(37, 165, 2.2, '#d84f4f'); cir(41, 186, 2.2, '#e9c44d'); cir(59, 186, 2.2, '#4a7fb5');
    H.txt(g, 'メモ', 48, 178, 5, '#888888');

    /* ===== WC riêng (8,1)-(9,2) ===== */
    rect(256, 32, 64, 64, '#eef3f3');
    line(256, 48, 320, 48, '#d5e0e2', 1); line(256, 64, 320, 64, '#d5e0e2', 1); line(288, 32, 288, 96, '#d5e0e2', 1);
    rect(256, 80, 64, 16, '#cfe0e4');
    g.strokeStyle = '#7a8588'; g.lineWidth = 3; g.strokeRect(256, 32, 64, 64);
    rect(274, 36, 30, 10, '#ffffff'); g.strokeStyle = '#b9c4c7'; g.lineWidth = 1; g.strokeRect(274, 36, 30, 10);
    g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(289, 63, 13, 16, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#dfe9ec'; g.beginPath(); g.ellipse(289, 63, 8, 11, 0, 0, Math.PI * 2); g.fill();
    rect(260, 38, 13, 12, '#ffffff'); cir(266, 44, 2.5, '#9fc6d8');
    rect(272, 90, 32, 5, '#b08954'); cir(300, 92, 2, '#5a4632');
    rect(279, 82, 18, 7, '#4a7fb5'); H.txt(g, 'トイレ', 288, 85.5, 6, '#ffffff');

    /* ===== Unit-bath (10,1)-(12,2): bồn tắm + vòi sen ===== */
    rect(320, 32, 96, 64, '#dceef2');
    line(320, 48, 416, 48, '#bfdde6', 1); line(320, 64, 416, 64, '#bfdde6', 1); line(352, 32, 352, 96, '#bfdde6', 1); line(384, 32, 384, 96, '#bfdde6', 1);
    g.strokeStyle = '#7a9aa5'; g.lineWidth = 3; g.strokeRect(320, 32, 96, 64);
    g.fillStyle = '#ffffff'; H.rr(g, 326, 38, 58, 36, 8);
    g.fillStyle = '#9fd4e8'; H.rr(g, 330, 42, 50, 28, 6);
    cir(342, 52, 3, 'rgba(255,255,255,0.8)'); cir(356, 60, 2.4, 'rgba(255,255,255,0.8)'); cir(368, 50, 2, 'rgba(255,255,255,0.8)');
    line(404, 38, 404, 50, '#7a9aa5', 3); cir(404, 52, 4, '#aebec4');
    g.strokeStyle = '#7a9aa5'; g.lineWidth = 1.5; g.beginPath(); g.arc(398, 62, 8, 0.3, 2.4); g.stroke();
    rect(390, 36, 18, 13, '#cfe8f5'); g.strokeStyle = '#9fc6d8'; g.lineWidth = 1; g.strokeRect(390, 36, 18, 13);
    rect(392, 74, 14, 10, '#f2c14e'); cir(400, 88, 5, '#e08a4d');
    rect(334, 82, 24, 7, '#5da4b8'); H.txt(g, 'お風呂', 346, 85.5, 6, '#ffffff');

    /* ===== Kệ sách / kệ đồ tường đông (12,4)-(12,5) + tranh treo ===== */
    rect(386, 130, 28, 60, '#8a5a33');
    line(386, 150, 414, 150, '#6f4525', 3); line(386, 170, 414, 170, '#6f4525', 3);
    for (i = 0; i < 5; i++) rect(389 + i * 5, 134, 4, 14, bk[(i + 2) % 6]);
    for (i = 0; i < 4; i++) rect(389 + i * 6, 154, 5, 14, bk[(i + 4) % 6]);
    rect(390, 174, 20, 12, '#d9c9a8'); line(390, 180, 410, 180, '#b3a077', 1);
    /* TV nhỏ đặt trên kệ tường đông (vật tương tác room-tv ở ô 12,4) */
    rect(386, 128, 28, 21, '#2b2f36'); rect(388, 130, 24, 15, '#7fb3d5');
    rect(388, 141, 24, 4, '#d84f4f'); rect(390, 132, 9, 3, 'rgba(255,255,255,0.75)');
    H.txt(g, 'TV', 400, 137, 6, '#33506b');
    rect(397, 149, 6, 4, '#555c63'); rect(392, 153, 16, 2, '#555c63');
    rect(420, 138, 20, 28, '#f4efe2'); g.strokeStyle = '#8a6f47'; g.lineWidth = 2; g.strokeRect(420, 138, 20, 28);
    g.fillStyle = '#7fb3d5'; g.beginPath(); g.moveTo(423, 160); g.lineTo(430, 146); g.lineTo(437, 160); g.closePath(); g.fill();

    /* ===== Futon (2,7)-(4,8) ===== */
    g.fillStyle = 'rgba(90,60,30,0.20)'; H.rr(g, 62, 222, 100, 66, 9);
    g.fillStyle = '#f6f2e8'; H.rr(g, 64, 224, 96, 62, 8);
    g.fillStyle = '#8fb8d8'; H.rr(g, 64, 248, 96, 38, 8);
    line(64, 248, 160, 248, '#6f9ec4', 2);
    cir(84, 264, 3, 'rgba(255,255,255,0.5)'); cir(112, 272, 3, 'rgba(255,255,255,0.5)'); cir(140, 262, 3, 'rgba(255,255,255,0.5)');
    g.fillStyle = '#ffffff'; H.rr(g, 70, 230, 34, 15, 6);
    g.strokeStyle = '#d8d2c2'; g.lineWidth = 1; g.strokeRect(70, 230, 34, 15);
    /* ===== Bàn thấp (5,7) + đệm ngồi ===== */
    g.fillStyle = '#9a6a3f'; H.rr(g, 164, 230, 56, 22, 4);
    g.fillStyle = '#b3814f'; H.rr(g, 166, 232, 52, 8, 3);
    cir(206, 242, 5, '#d96a86'); rect(170, 235, 16, 12, '#4a7fb5'); rect(172, 237, 12, 2, '#ffffff');
    rect(188, 246, 14, 4, '#33302e');
    rect(168, 262, 22, 18, '#c95d5d'); rect(196, 262, 22, 18, '#c95d5d');
    line(172, 266, 186, 276, '#a84a4a', 1); line(200, 266, 214, 276, '#a84a4a', 1);
    /* ===== Bàn học (10,7): laptop + sách + đèn bàn; ghế ở mép dưới ===== */
    g.fillStyle = '#b08954'; H.rr(g, 322, 226, 60, 26, 3);
    rect(326, 232, 12, 4, '#c95d5d'); rect(326, 237, 12, 4, '#4a7fb5'); rect(326, 242, 12, 4, '#e9c44d');
    rect(344, 228, 22, 14, '#2f3b4c'); rect(346, 230, 18, 10, '#a8d8f0');
    line(348, 233, 358, 233, '#5a87a0', 1); line(348, 236, 362, 236, '#5a87a0', 1);
    rect(342, 242, 26, 4, '#555c63');
    line(376, 246, 366, 231, '#6b5a44', 2); cir(376, 247, 4, '#6b5a44'); cir(364, 229, 6, 'rgba(255,217,77,0.45)'); cir(364, 229, 4, '#ffd94d');
    g.fillStyle = '#5a6b7d'; H.rr(g, 340, 257, 28, 10, 4);

    /* ===== Thùng rác nhỏ (vẽ góc ô 1,6 — không chặn) + dép genkan ===== */
    g.fillStyle = '#b9bec2'; H.rr(g, 36, 200, 15, 17, 3); rect(36, 200, 15, 4, '#e8e8e8');
    g.fillStyle = '#e88ca0'; g.beginPath(); g.ellipse(208, 282, 7, 4, 0.4, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#e88ca0'; g.beginPath(); g.ellipse(220, 285, 7, 4, 0.4, 0, Math.PI * 2); g.fill();

    /* ===== Genkan trũng + tủ giày + cửa ra vào ===== */
    rect(160, 288, 64, 32, '#a97c50');                       // tủ giày (5,9)-(6,9)
    line(192, 288, 192, 320, '#8a6238', 2); line(160, 304, 224, 304, '#8a6238', 1);
    cir(186, 296, 2, '#5a4020'); cir(198, 296, 2, '#5a4020');
    cir(176, 284, 6, '#5da464'); cir(184, 282, 5, '#4c8a54'); rect(172, 284, 10, 6, '#b08954');
    rect(224, 288, 64, 32, '#9aa0a3');                       // sàn đá genkan (7,9)-(8,9)
    for (i = 0; i < 10; i++) rect(228 + H.hash(i, 9) * 52, 292 + H.hash(9, i) * 22, 2, 2, 'rgba(60,64,68,0.35)');
    rect(224, 286, 64, 4, '#8a5a33');                        // bậc thềm gỗ
    g.fillStyle = '#7d8891'; H.rr(g, 231, 299, 26, 13, 2);
    H.txt(g, '玄関', 244, 305, 6, '#e8ecee');
    g.fillStyle = '#3a3230'; g.beginPath(); g.ellipse(272, 308, 7, 3.5, 0.3, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#3a3230'; g.beginPath(); g.ellipse(282, 311, 7, 3.5, 0.3, 0, Math.PI * 2); g.fill();
    cir(298, 304, 7, '#4a6b8a'); ring(298, 304, 7, '#33506b', 2);   // xô đựng ô ở ô (9,9)
    line(298, 304, 306, 292, '#d96a86', 2); line(306, 292, 310, 296, '#d96a86', 2);
    // Cửa chính trên ô D (7,10) + bảng tên chung cư hư cấu
    rect(226, 320, 28, 32, '#7a4a2e'); g.strokeStyle = '#5a3520'; g.lineWidth = 2; g.strokeRect(226, 320, 28, 32);
    cir(240, 331, 2, '#ffd94d'); cir(250, 339, 3, '#c0c0c0'); rect(231, 346, 18, 4, '#4c4438');
    rect(229, 323, 17, 7, '#f4efe2'); H.txt(g, '高円寺', 237, 326.5, 5, '#5a4632');
    /* ===== Ổ cắm + dây điện gọn dọc chân tường nam ===== */
    rect(104, 330, 12, 8, '#ffffff'); cir(107, 334, 1.4, '#888888'); cir(113, 334, 1.4, '#888888');
    line(116, 336, 210, 336, 'rgba(70,64,58,0.55)', 1.5); line(210, 336, 210, 344, 'rgba(70,64,58,0.55)', 1.5);
  }
};
