// maps-park.js — Công viên «代々木公園» (bối cảnh 2D ngoài trời, đợt duyệt).
// Lối đi lát đá bắc–nam/đông–tây, đài phun nước gần giữa, bãi cỏ, khu chơi trẻ em
// góc đông-bắc, đồng hồ công viên, bảng quy định. Paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['park'] = {
  id: 'park',
  label: '🌳 Công viên 代々木公園',
  grid: [
    '########D#####################',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '######################D#######'
  ],
  solidsExtra: [
    [24, 2, 4, 2],  // cầu trượt ở khu chơi trẻ em góc đông-bắc
    [24, 5, 3, 1],  // khung xích đu
    [8, 4, 1, 1],   // chân đồng hồ công viên
    [13, 8, 4, 2],  // đài phun nước (tương tác)
    [10, 7, 2, 1],  // ghế đá tây đài phun
    [18, 8, 2, 1],  // ghế đá đông đài phun
    [3, 3, 1, 1],   // gốc cây lớn tây-bắc
    [20, 3, 1, 1],  // gốc cây lớn giữa-bắc
    [5, 10, 1, 1],  // gốc cây tây-nam
    [26, 10, 1, 1], // gốc cây đông-nam
    [2, 6, 2, 1],   // bụi hoa rìa tây
    [27, 7, 2, 1],  // bụi hoa rìa đông
    [10, 12, 3, 1], // bảng quy định công viên gần lối nam
    [18, 11, 1, 1]  // chân đèn công viên
  ],
  doors: {
    '8,0': { to: 'street', spawn: [8, 10] },
    '22,13': { to: 'temple', spawn: [11, 2] }
  },
  npcs: [
    { id: 'park-elder', name: 'Ông cụ tập thể dục', sprite: 'elder', tx: 16, ty: 6, behavior: 'pace', from: 14, to: 19, scene: 'park-elder', label: '💬 Chào ông cụ', range: 64 }
  ],
  objects: [
    { tx: 13, ty: 8, tw: 4, th: 2, interact: { scene: 'park-fountain', label: '⛲ Xem đài phun nước' } }
    ,{ tx: 4, ty: 3, tw: 3, th: 2, interact: { scene: 'hanami', label: '🌸 Gốc anh đào lớn — trải chiếu hanami (mùa xuân)' } },
    { tx: 18, ty: 3, tw: 3, th: 2, interact: { scene: 'dong-huong', label: '🇻🇳 Góc BBQ của hội đồng hương (khi có lời mời)' } }
  ],
  spawnDefault: [8, 2],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function tree(tx, ty, big) {
      var cx = tx * T + 16, cy = ty * T + 16, r = big ? 30 : 24;
      rect(cx - 3, cy + 8, 7, 16, '#6b4a30');
      // Tán cây THEO MÙA (giai đoạn 6B, KHUNG-GAME §4.11): cây lớn = anh đào ở gốc
      // hanami; cây nhỏ = cây lá thường. Đông → cành trơ + điểm tuyết.
      var P = H.pal(big ? 'sakura' : 'leaf');
      if (P.bare) { H.branches(g, cx, cy + 8, r); cir(cx - r + 6, cy + 27, 2.4, '#ffffff'); cir(cx + r - 10, cy + 28, 2.4, '#ffffff'); }
      else {
        cir(cx, cy - 4, r, P.colors[0]); cir(cx - r + 6, cy + 6, r - 8, P.colors[1]); cir(cx + r - 6, cy + 6, r - 8, P.colors[2]);
        cir(cx - 8, cy - 10, 2.4, P.season === 'spring' ? '#ffffff' : P.colors[2]); cir(cx + 10, cy + 2, 2.4, P.colors[1]);
        // cánh hoa (xuân) / lá rụng (thu) vương dưới gốc — vẽ tĩnh, không tốn FPS
        if (P.season === 'spring' || P.season === 'autumn') {
          var fc = P.season === 'spring' ? 'rgba(247,168,196,0.75)' : 'rgba(226,112,58,0.7)';
          cir(cx - r + 4, cy + 26, 2.2, fc); cir(cx + 6, cy + 29, 2.2, fc); cir(cx + r - 8, cy + 25, 2.2, fc);
        }
      }
    }

    /* ===== Trời + biển tên công viên ở cửa bắc (vùng y âm) ===== */
    rect(0, -40, 30 * T, 40, '#bfd9e8');
    g.fillStyle = 'rgba(255,255,255,0.85)'; H.rr(g, 90, -34, 56, 11, 6); H.rr(g, 760, -32, 62, 11, 6);
    rect(196, -36, 120, 22, '#3f6152'); H.txt(g, '代々木公園', 256, -25, 13, '#ffffff');

    /* ===== Nền cỏ từng ô + hoa lấm tấm ===== */
    var tx, ty, i;
    for (ty = 0; ty < 14; ty++) for (tx = 0; tx < 30; tx++) {
      var px = tx * T, py = ty * T, v = H.hash(tx, ty);
      rect(px, py, T, T, (tx + ty) % 2 ? '#6f9a58' : '#679351');
      if (v > 0.55) rect(px, py, T, T, 'rgba(255,255,220,0.05)');
      if (v > 0.86) { cir(px + 9, py + 10, 1.8, '#ffd94d'); cir(px + 20, py + 20, 1.8, '#ffffff'); }
      if (ty === 0 || ty === 13) rect(px, py, T, T, '#587f47');
    }
    /* ===== Lối đi lát đá: trục bắc–nam x=8, trục ngang hàng 6, lối x=22 xuống cửa nam, vòng quanh đài phun ===== */
    function path(x, y, w, h) {
      rect(x * T, y * T, w * T, h * T, '#c2bcab');
      for (var yy = y; yy < y + h; yy++) for (var xx = x; xx < x + w; xx++) {
        g.strokeStyle = 'rgba(100,95,82,0.35)'; g.lineWidth = 1; g.strokeRect(xx * T + 0.5, yy * T + 0.5, T - 1, T - 1);
      }
    }
    path(7, 0, 3, 13);            // trục dọc qua cửa bắc + spawn
    path(1, 6, 28, 1);            // trục ngang (ông cụ đi bộ hàng này ở phía trên đài phun)
    path(21, 7, 3, 7);            // lối xuống cửa nam
    path(11, 7, 8, 4);            // sân đá quanh đài phun
    rect(7 * T, 0, 3 * T, 6, '#8a8f94'); rect(22 * T - 16, 13 * T, 3 * T, 6, '#8a8f94'); // thềm hai cửa

    /* ===== Đồng hồ công viên (8,4) ===== */
    rect(8 * T + 14, 4 * T + 10, 4, 22, '#4c4438');
    cir(8 * T + 16, 4 * T + 8, 12, '#ffffff'); ring(8 * T + 16, 4 * T + 8, 12, '#31517d', 3);
    line(8 * T + 16, 4 * T + 8, 8 * T + 16, 4 * T + 1, '#33302e', 2); line(8 * T + 16, 4 * T + 8, 8 * T + 21, 4 * T + 11, '#33302e', 2);
    cir(8 * T + 16, 4 * T + 8, 1.8, '#b03a30');

    /* ===== Đài phun nước (13,8)-(16,9) — điểm tương tác ===== */
    var fx = 15 * T, fy = 9 * T;
    cir(fx, fy, 62, '#a7adb3'); cir(fx, fy, 56, '#8fb8cc'); cir(fx, fy, 48, '#a8d4ea');
    ring(fx, fy, 56, '#7d8891', 3);
    cir(fx, fy, 13, '#e8ecee'); ring(fx, fy, 13, '#9aa0a3', 2);
    line(fx, fy - 12, fx, fy - 30, '#cfe8f5', 3);
    line(fx - 7, fy - 10, fx - 16, fy - 24, 'rgba(180,225,245,0.85)', 2); line(fx + 7, fy - 10, fx + 16, fy - 24, 'rgba(180,225,245,0.85)', 2);
    cir(fx - 20, fy + 14, 3, 'rgba(255,255,255,0.75)'); cir(fx + 24, fy - 8, 3, 'rgba(255,255,255,0.75)'); cir(fx + 4, fy + 26, 2.4, 'rgba(255,255,255,0.75)');
    H.txt(g, '噴水', fx, fy + 44, 8, '#5d7a8c');

    /* ===== Ghế đá hai bên đài phun ===== */
    [[10, 7], [18, 8]].forEach(function (b) {
      g.fillStyle = '#a7adb3'; H.rr(g, b[0] * T + 2, b[1] * T + 10, 60, 11, 3);
      rect(b[0] * T + 6, b[1] * T + 21, 6, 6, '#8f979e'); rect(b[0] * T + 52, b[1] * T + 21, 6, 6, '#8f979e');
    });

    /* ===== Khu chơi trẻ em góc đông-bắc: cầu trượt (24,2) + xích đu (24,5) ===== */
    rect(24 * T, 2 * T, 4 * T, 3 * T, '#e3d3a0');                              // nền cát khu chơi
    g.fillStyle = '#d95f43'; g.beginPath(); g.moveTo(25 * T + 22, 2 * T + 10); g.lineTo(27 * T + 24, 4 * T + 24); g.lineTo(27 * T + 2, 4 * T + 24); g.closePath(); g.fill();
    rect(24 * T + 10, 2 * T + 8, 30, 22, '#4a7fb5'); rect(24 * T + 16, 2 * T + 2, 18, 8, '#e9c44d');
    line(24 * T + 14, 3 * T + 6, 24 * T + 36, 3 * T + 6, '#31517d', 2); line(24 * T + 14, 3 * T + 16, 24 * T + 36, 3 * T + 16, '#31517d', 2);
    // Xích đu: khung + 2 ghế đu
    line(24 * T + 4, 5 * T + 28, 24 * T + 4, 5 * T + 4, '#7d8891', 3); line(27 * T - 4, 5 * T + 28, 27 * T - 4, 5 * T + 4, '#7d8891', 3);
    line(24 * T + 2, 5 * T + 4, 27 * T - 2, 5 * T + 4, '#7d8891', 3);
    [0, 1].forEach(function (s) {
      var sx = 24 * T + 22 + s * 34;
      line(sx - 7, 5 * T + 5, sx - 7, 5 * T + 20, '#4c4438', 1.5); line(sx + 7, 5 * T + 5, sx + 7, 5 * T + 20, '#4c4438', 1.5);
      rect(sx - 10, 5 * T + 20, 20, 5, s ? '#5da464' : '#e0533d');
    });
    H.txt(g, 'こども広場', 26 * T, 5 * T - 4, 9, '#8a5a18');

    /* ===== Cây lớn + bụi hoa + đèn công viên ===== */
    tree(3, 3, true); tree(20, 3, false); tree(5, 10, false); tree(26, 10, true);
    [[2, 6], [27, 7]].forEach(function (b) {
      rect(b[0] * T + 2, b[1] * T + 12, 60, 14, '#486b3a');
      for (i = 0; i < 5; i++) cir(b[0] * T + 10 + i * 12, b[1] * T + 16, 3.4, ['#e88ca0', '#ffd94d', '#e0533d'][i % 3]);
    });
    rect(18 * T + 14, 11 * T + 8, 4, 24, '#4c565e'); cir(18 * T + 16, 11 * T + 6, 6, '#ffd94d'); ring(18 * T + 16, 11 * T + 6, 6, '#4c565e', 2);

    /* ===== Bảng quy định công viên (10,12)-(12,12) ===== */
    rect(10 * T + 4, 12 * T + 4, 88, 24, '#3f6152'); g.strokeStyle = '#2e4a3e'; g.lineWidth = 2; g.strokeRect(10 * T + 4, 12 * T + 4, 88, 24);
    H.txt(g, '公園のきまり', 11 * T + 16, 12 * T + 11, 8, '#ffffff');
    line(10 * T + 10, 12 * T + 19, 12 * T + 22, 12 * T + 19, '#cfd8d2', 1); line(10 * T + 10, 12 * T + 24, 12 * T + 10, 12 * T + 24, '#cfd8d2', 1);

    /* ===== Biển cổng nam → chùa 福安寺 (22,13) (bổ sung 13:33 31/10/2026 — trước đây
       cổng nam không có biển phía công viên, chỉ có cổng tam quan bên phía chùa) ===== */
    rect(21 * T + 2, 13 * T - 17, 2 * T + 28, 18, '#4a3b2c'); H.txt(g, '福安寺 →', 22 * T + 16, 13 * T - 8, 11, '#ffe9b0');
    line(21 * T + 10, 13 * T - 17, 21 * T + 10, 13 * T - 26, '#6b4a30', 3); line(23 * T + 22, 13 * T - 17, 23 * T + 22, 13 * T - 26, '#6b4a30', 3);

    /* ===== Hàng rào thấp rìa nam + khóm hoa hai cửa ===== */
    for (i = 0; i < 30; i++) { if (i >= 21 && i <= 23) continue; line(i * T + 4, 13 * T + 26, i * T + 28, 13 * T + 26, '#8a6f52', 2); }
    cir(7 * T + 6, 26, 4, '#e88ca0'); cir(10 * T + 20, 26, 4, '#ffd94d');
    cir(20 * T + 10, 13 * T + 8, 4, '#e88ca0'); cir(24 * T + 22, 13 * T + 8, 4, '#ffd94d');
  }
};
