// maps-temple.js — Chùa Việt «福安寺» (bối cảnh 2D ngoài trời, đợt duyệt).
// Sân lát đá + chính điện phía trên (hai cánh hai bên lối giữa dẫn ra cửa bắc),
// cây bồ đề, đèn đá, tháp chuông. Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['temple'] = {
  id: 'temple',
  label: '🛕 Chùa Việt — 福安寺',
  grid: [
    '###########D##########',
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
    '#....................#',
    '######################'
  ],
  solidsExtra: [
    [2, 1, 7, 2],   // chính điện — cánh trái (bàn thờ + tượng trong điện)
    [13, 1, 7, 2],  // chính điện — cánh phải
    [18, 4, 2, 2],  // tháp chuông (tương tác: chuông chùa)
    [3, 5, 1, 1],   // đèn đá trái sân
    [10, 3, 3, 1],  // lư hương lớn trước điện (đi vòng hai bên)
    [2, 8, 1, 1],   // gốc cây bồ đề
    [19, 8, 1, 1],  // đèn đá phải sân
    [5, 10, 3, 1],  // bồn hoa trái sân dưới
    [14, 10, 3, 1]  // bồn hoa phải sân dưới
  ],
  doors: { '11,0': { to: 'park', spawn: [22, 11] } },
  npcs: [
    { id: 'temple-monk', name: 'Sư thầy', sprite: 'monk', tx: 11, ty: 5, behavior: 'stand', scene: 'temple-monk', label: '💬 Chào sư thầy', range: 72 }
  ],
  objects: [
    { tx: 18, ty: 4, tw: 2, th: 2, interact: { scene: 'temple-bell', label: '🔔 Thỉnh chuông / thắp hương' } }
    ,{ tx: 3, ty: 6, tw: 3, th: 2, interact: { scene: 'momiji', label: '🍁 Hàng phong đỏ — ngắm lá đỏ (mùa thu)' } }
  ],
  spawnDefault: [11, 2],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function lantern(cx, cy) {
      rect(cx - 5, cy + 4, 10, 16, '#8f979e'); rect(cx - 8, cy - 2, 16, 7, '#aeb4ba');
      rect(cx - 4, cy - 8, 8, 6, '#c9ced2'); cir(cx, cy - 1, 2.4, '#ffd94d');
      rect(cx - 9, cy - 11, 18, 4, '#7d838a');
    }
    // Bảng màu MÙA (giai đoạn 6B, KHUNG-GAME §4.11): TP = cây lá thường/bồ đề + bụi
    // rìa sân; MP = hàng phong ở điểm ngắm lá đỏ. Đông → trơ cành.
    var TP = H.pal('leaf'), MP = H.pal('momiji');
    var hedge1 = TP.bare ? '#7d8b74' : TP.colors[1], hedge2 = TP.bare ? '#93a189' : TP.colors[2];

    /* ===== Trời + mái cổng tam quan quanh ô cửa (11,0), vùng y âm ===== */
    rect(0, -40, 22 * T, 40, '#cfe4ef');
    g.fillStyle = '#b03a30'; g.beginPath(); g.moveTo(304, -38); g.lineTo(384, -18); g.lineTo(464, -38); g.lineTo(448, -38); g.lineTo(384, -24); g.lineTo(320, -38); g.closePath(); g.fill();
    rect(312, -14, 10, 14, '#6b4a30'); rect(446, -14, 10, 14, '#6b4a30');
    rect(336, -34, 96, 15, '#7a4a2e'); H.txt(g, '福安寺', 384, -26, 12, '#ffe9b0');

    /* ===== Nền sân: đá lát + cỏ hai rìa + lối giữa ===== */
    var tx, ty, i;
    for (ty = 0; ty < 13; ty++) for (tx = 0; tx < 22; tx++) {
      var px = tx * T, py = ty * T;
      if (tx === 0 || tx === 21 || ty === 12) { rect(px, py, T, T, '#5d7350'); cir(px + 10, py + 12, 6, hedge1); cir(px + 22, py + 22, 7, hedge2); }
      else if (tx >= 10 && tx <= 12) { rect(px, py, T, T, '#b9b2a2'); }        // lối đá giữa
      else { rect(px, py, T, T, (tx + ty) % 2 ? '#c4beb0' : '#bab4a6'); }
      if (tx > 0 && tx < 21 && ty > 0 && ty < 12) {
        g.strokeStyle = 'rgba(100,95,82,0.30)'; g.lineWidth = 1; g.strokeRect(px + 0.5, py + 0.5, T - 1, T - 1);
        if (H.hash(tx, ty) > 0.8) rect(px + 6, py + 20, 7, 2, 'rgba(80,75,62,0.18)');
      }
    }
    rect(32, 352, 20 * T, 32, '#7a7264');                                     // thềm dưới / đường vào
    H.txt(g, '福安寺', 352, 368, 11, '#e8dfc8');

    /* ===== Chính điện: mái cong + thân điện hai cánh (1–2), lối giữa mở ===== */
    g.fillStyle = '#8a3b2e'; g.beginPath(); g.moveTo(48, 34); g.lineTo(176, 2); g.lineTo(304, 34); g.lineTo(288, 34); g.lineTo(176, 12); g.lineTo(64, 34); g.closePath(); g.fill();
    g.fillStyle = '#8a3b2e'; g.beginPath(); g.moveTo(400, 34); g.lineTo(528, 2); g.lineTo(656, 34); g.lineTo(640, 34); g.lineTo(528, 12); g.lineTo(416, 34); g.closePath(); g.fill();
    rect(56, 30, 240, 6, '#5d2a20'); rect(408, 30, 240, 6, '#5d2a20');
    rect(64, 36, 224, 58, '#6e3527'); rect(416, 36, 224, 58, '#6e3527');
    // Trong điện trái: bàn thờ, nến, hoa sen
    rect(96, 46, 110, 30, '#4c241c'); rect(102, 50, 98, 10, '#8a2f2a');
    cir(151, 55, 3, '#ffd94d'); cir(120, 68, 4, '#e88ca0'); cir(182, 68, 4, '#e88ca0');
    H.txt(g, '佛', 151, 40, 11, '#ffe9b0');
    // Trong điện phải: tượng + chuông nhỏ + mõ
    cir(528, 56, 13, '#d9a441'); ring(528, 56, 13, '#a87a24', 2); cir(528, 50, 5, '#e8bc60');
    rect(462, 62, 26, 14, '#7a4a2e'); cir(564, 68, 8, '#8a5a33');
    H.txt(g, '南無', 528, 40, 9, '#ffe9b0');
    // Bậc thềm điện + hoành phi trên lối giữa
    rect(288, 88, 128, 8, '#9a9282');
    rect(322, 36, 84, 18, '#7a1f1f'); H.txt(g, '福安寺', 364, 45, 11, '#ffe9b0');
    // Trụ + đèn lồng đỏ hai bên lối giữa
    rect(310, 54, 8, 40, '#6b4a30'); rect(390, 54, 8, 40, '#6b4a30');
    cir(314, 66, 7, '#d84f4f'); H.txt(g, '福', 314, 66, 7, '#ffffff');
    cir(394, 66, 7, '#d84f4f'); H.txt(g, '安', 394, 66, 7, '#ffffff');

    /* ===== Lư hương lớn trước điện (10,3)-(12,3) ===== */
    g.fillStyle = '#7a6238'; H.rr(g, 326, 104, 76, 22, 5);
    rect(338, 98, 52, 8, '#8f743f');
    line(348, 98, 346, 84, '#5a4632', 2); line(364, 98, 364, 80, '#5a4632', 2); line(380, 98, 382, 84, '#5a4632', 2);
    cir(346, 82, 2.4, '#e07830'); cir(364, 78, 2.4, '#e07830'); cir(382, 82, 2.4, '#e07830');
    g.fillStyle = 'rgba(200,200,200,0.35)'; cir(356, 72, 6, 'rgba(210,210,210,0.30)'); cir(374, 64, 8, 'rgba(210,210,210,0.22)');

    /* ===== Tháp chuông (18,4)-(19,5) — điểm tương tác ===== */
    rect(582, 132, 56, 8, '#5d2a20');
    g.fillStyle = '#8a3b2e'; g.beginPath(); g.moveTo(574, 134); g.lineTo(610, 116); g.lineTo(646, 134); g.closePath(); g.fill();
    rect(584, 140, 6, 52, '#6b4a30'); rect(630, 140, 6, 52, '#6b4a30');
    g.fillStyle = '#b08a3e'; g.beginPath(); g.moveTo(596, 148); g.lineTo(624, 148); g.lineTo(628, 172); g.lineTo(592, 172); g.closePath(); g.fill();
    cir(610, 143, 4, '#8f743f'); line(610, 147, 610, 152, '#8f743f', 2);
    cir(602, 160, 1.8, '#7a6238'); cir(618, 160, 1.8, '#7a6238'); cir(610, 166, 1.8, '#7a6238');
    line(636, 150, 650, 176, '#8a5a33', 4);                                   // chày thỉnh chuông treo
    H.txt(g, '鐘', 610, 182, 9, '#5a4632');

    /* ===== Đèn đá + cây bồ đề ===== */
    lantern(3 * T + 16, 5 * T + 10); lantern(19 * T + 16, 8 * T + 10);
    rect(2 * T + 13, 8 * T + 14, 7, 18, '#6b4a30');                            // gốc bồ đề (2,8) — tán theo mùa
    if (TP.bare) { H.branches(g, 2 * T + 16, 8 * T + 14, 30); }
    else {
      cir(2 * T + 16, 8 * T + 2, 30, TP.colors[0]); cir(2 * T - 2, 8 * T + 12, 20, TP.colors[1]); cir(2 * T + 34, 8 * T + 12, 20, TP.colors[2]);
      cir(2 * T + 8, 8 * T - 6, 2.4, TP.colors[2]); cir(2 * T + 26, 8 * T + 6, 2.4, TP.colors[1]);
    }

    /* ===== Hàng phong ở điểm ngắm lá đỏ (3,6)-(5,6) — điểm tương tác 'momiji' =====
       Trước đợt 6B điểm này chỉ có nhãn chữ, không có cây. Thu = đỏ rực; xuân/hạ xanh;
       đông trơ cành. Lá rụng vẽ sẵn dưới gốc vào mùa thu. */
    [3, 4, 5].forEach(function (mtx) {
      var mcx = mtx * T + 16, mcy = 6 * T + 4;
      rect(mcx - 2, mcy + 12, 5, 14, '#6b4a30');
      if (MP.bare) { H.branches(g, mcx, mcy + 12, 17); }
      else {
        cir(mcx, mcy, 17, MP.colors[0]); cir(mcx - 11, mcy + 7, 12, MP.colors[1]); cir(mcx + 11, mcy + 7, 12, MP.colors[2]);
        cir(mcx - 4, mcy - 4, 2, MP.colors[2]); cir(mcx + 6, mcy + 3, 2, MP.colors[1]);
      }
    });
    if (!MP.bare && MP.season === 'autumn') { cir(3 * T + 8, 7 * T + 22, 2.2, 'rgba(226,112,58,0.8)'); cir(4 * T + 20, 7 * T + 26, 2.2, 'rgba(207,63,29,0.8)'); cir(5 * T + 24, 7 * T + 20, 2.2, 'rgba(232,161,58,0.8)'); }
    rect(2 * T - 8, 8 * T + 28, 48, 5, '#8a6f52');
    H.txt(g, '菩提樹', 2 * T + 16, 9 * T + 12, 7, '#486b3a');

    /* ===== Bồn hoa dưới sân + cờ phật giáo nhỏ ===== */
    [[5, 10], [14, 10]].forEach(function (b) {
      rect(b[0] * T + 2, b[1] * T + 6, 92, 20, '#8a6f52');
      for (i = 0; i < 6; i++) cir(b[0] * T + 12 + i * 14, b[1] * T + 14, 4, ['#e88ca0', '#ffd94d', '#e0533d'][i % 3]);
    });
    line(600, 300, 600, 336, '#8a8f94', 2);
    rect(600, 300, 22, 6, '#f2c14e'); rect(600, 306, 22, 6, '#e07830'); rect(600, 312, 22, 6, '#4a7fb5');
    /* Ghế đá nghỉ chân hai bên sân */
    g.fillStyle = '#a7adb3'; H.rr(g, 164, 218, 52, 12, 3); H.rr(g, 484, 218, 52, 12, 3);
  }
};
