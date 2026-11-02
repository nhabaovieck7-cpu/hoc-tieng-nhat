// maps-genba.js — Công trường xây dựng «横浜建設 作業現場» (bối cảnh 2D, đợt mở rộng ngành).
// Chuẩn thật: văn phòng tạm (プレハブ), cổng có biển ヘルメット着用, đài chào buổi sáng + bảng
// an toàn, giàn giáo + khung bê tông đang xây, đống ống thép/ván, máy trộn, nhà vệ sinh tạm,
// góc nghỉ hút thuốc tách riêng. Dữ liệu thuần + paint theo maps-core.js.
window.MAPDEF = window.MAPDEF || {};
window.MAPDEF['genba'] = {
  id: 'genba',
  label: '🏗️ Công trường xây dựng — 横浜建設',
  grid: [
    '########################',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#......................#',
    '#####D##################'
  ],
  solidsExtra: [
    [1, 1, 5, 2],   // văn phòng tạm プレハブ (現場事務所)
    [8, 1, 3, 2],   // đống ống thép 資材
    [13, 1, 3, 1],  // ván gỗ + pallet
    [19, 1, 4, 5],  // khung bê tông đang xây + giàn giáo (đông)
    [1, 5, 2, 2],   // nhà vệ sinh tạm 仮設トイレ
    [8, 5, 3, 2],   // máy trộn bê tông + xe đẩy
    [15, 5, 2, 1],  // thùng dụng cụ + cuộn cáp
    [14, 8, 2, 1],  // bảng an toàn / bảng chào buổi sáng (tương tác)
    [18, 9, 3, 1],  // băng ghế góc nghỉ 休憩所
    [4, 8, 1, 1], [11, 3, 1, 1], [6, 6, 1, 1]  // cọc tiêu nón giao thông (vật cản nhỏ)
  ],
  doors: { '5,11': { to: 'street', spawn: [12, 10] } },
  npcs: [
    { id: 'genba-boss', name: 'Anh Sato — giám sát công trường', sprite: 'senpai', tx: 11, ty: 7, behavior: 'stand', scene: 'genba-boss', label: '💬 Chào giám sát Sato', range: 72 }
  ],
  objects: [
    { tx: 14, ty: 8, tw: 2, th: 1, interact: { scene: 'genba-board', label: '🦺 Xem bảng an toàn của công trường' } }
  ],
  spawnDefault: [5, 9],
  paint: function (g, H) {
    var T = H.T;
    function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function cir(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function ring(cx, cy, r, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function line(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }

    /* ===== Cần cẩu + khung nhà đang xây ở vùng y âm / tường bắc ===== */
    rect(0, -40, 24 * T, 40, '#c8dcea');
    line(660, -40, 660, 130, '#7a4a2e', 5);                       // cột cẩu đứng ở phía đông
    line(300, -30, 764, -30, '#7a4a2e', 5);                       // cần cẩu ngang
    line(660, -40, 420, -30, '#7a4a2e', 2); line(660, -40, 764, -30, '#7a4a2e', 2);
    line(430, -30, 430, 6, '#55504a', 2); rect(414, 6, 32, 18, '#8a8f94'); // khối bê tông đang cẩu
    H.txt(g, '横浜建設', 130, -24, 15, '#31517d');

    /* ===== Nền: sỏi xám + lối đi sơn trắng/vàng ===== */
    rect(0, 0, 24 * T, 12 * T, '#b9b0a0');
    var tx, ty, i;
    for (ty = 0; ty < 12; ty++) for (tx = 0; tx < 24; tx++) {
      var v = H.hash(tx * 3, ty * 7);
      rect(tx * T + 4 + v * 20, ty * T + 5 + v * 18, 3, 2, 'rgba(90,80,64,0.25)');
      if (v > 0.82) rect(tx * T + 16, ty * T + 20, 5, 3, 'rgba(255,255,255,0.18)');
    }
    rect(4 * T, 3 * T, 3, 8 * T, '#f2f2f0');                       // vạch lối đi bộ dọc (trắng)
    rect(0, 8 * T - 3, 24 * T, 3, '#e8c33a');                      // vạch vàng ngang khu vực làm việc
    for (tx = 1; tx < 23; tx += 2) rect(tx * T + 4, 4 * T + 14, 20, 3, 'rgba(255,255,255,0.55)'); // vạch phân làn đứt

    /* ===== Văn phòng tạm (1,1)-(5,2): プレハブ trắng, cửa + biển 現場事務所 ===== */
    rect(34, 34, 156, 60, '#eef1f3'); rect(34, 34, 156, 10, '#7a9ab0');
    line(34, 64, 190, 64, '#c8cfd4', 2);
    rect(52, 48, 26, 20, '#9fc6d6'); rect(96, 48, 26, 20, '#9fc6d6'); rect(140, 48, 26, 20, '#9fc6d6');
    rect(44, 76, 30, 18, '#6d757e'); H.txt(g, '現場事務所', 112, 40, 8, '#31517d');
    H.txt(g, '立入禁止', 168, 84, 7, '#c73e3a');

    /* ===== Đống ống thép (8,1) + ván gỗ (13,1) ===== */
    for (i = 0; i < 5; i++) { ring(266 + (i % 3) * 26, 44 + Math.floor(i / 3) * 22, 10, '#5d646b', 4); }
    line(258, 34, 258, 92, '#8a6f52', 4); line(346, 34, 346, 92, '#8a6f52', 4);
    rect(418, 38, 90, 12, '#b08954'); rect(422, 52, 90, 12, '#a97c50'); rect(418, 66, 90, 12, '#b08954');
    H.txt(g, '資材置場', 462, 33, 8, '#5a4632');

    /* ===== Khung bê tông + giàn giáo (19,1)-(22,5) ===== */
    rect(610, 34, 118, 156, '#c9cdd2');
    for (i = 0; i < 3; i++) { rect(616 + i * 38, 34, 10, 156, '#9aa0a6'); }
    for (i = 0; i < 4; i++) { rect(610, 40 + i * 40, 118, 7, '#8f959b'); }
    line(606, 30, 606, 196, '#4a7fb5', 4); line(732, 30, 732, 196, '#4a7fb5', 4);   // ống giàn giáo 2 mép
    line(606, 62, 732, 62, '#4a7fb5', 3); line(606, 126, 732, 126, '#4a7fb5', 3);
    line(606, 30, 732, 190, 'rgba(74,127,181,0.5)', 2); line(732, 30, 606, 190, 'rgba(74,127,181,0.5)', 2);
    rect(610, 158, 118, 10, '#e8c33a'); H.txt(g, '建設中', 669, 40, 9, '#6d7278');

    /* ===== Nhà vệ sinh tạm (1,5)-(2,6) xanh dương ===== */
    rect(34, 162, 28, 60, '#3d7be0'); rect(66, 162, 28, 60, '#3568bd');
    rect(40, 168, 16, 26, '#dceefb'); rect(72, 168, 16, 26, '#dceefb');
    H.txt(g, '仮設トイレ', 64, 156, 7, '#31517d');

    /* ===== Máy trộn bê tông (8,5)-(10,6) + xe đẩy ===== */
    cir(288, 186, 26, '#e8a13a'); cir(288, 186, 17, '#c77f22'); cir(288, 186, 6, '#6d5230');
    rect(258, 206, 60, 8, '#55504a'); ring(266, 218, 6, '#33302e', 3); ring(310, 218, 6, '#33302e', 3);
    rect(330, 178, 20, 14, '#7a9a4d'); line(336, 192, 328, 206, '#55504a', 3); line(344, 192, 352, 206, '#55504a', 3); ring(352, 208, 5, '#33302e', 2);

    /* ===== Thùng dụng cụ + cuộn cáp (15,5) ===== */
    rect(482, 164, 60, 26, '#c73e3a'); H.txt(g, '工具', 512, 176, 9, '#ffffff');
    ring(530, 205, 11, '#33302e', 4); ring(530, 205, 5, '#e8c33a', 3);

    /* ===== Cọc tiêu nón cam (vật cản nhỏ) ===== */
    [[4, 8], [11, 3], [6, 6]].forEach(function (p) {
      var cx = p[0] * T + 16, cy = p[1] * T + 18;
      g.fillStyle = '#e07830'; g.beginPath(); g.moveTo(cx - 8, cy + 10); g.lineTo(cx, cy - 12); g.lineTo(cx + 8, cy + 10); g.closePath(); g.fill();
      rect(cx - 5, cy, 10, 4, '#ffffff'); rect(cx - 10, cy + 10, 20, 3, '#b85a20');
    });

    /* ===== Bảng an toàn / chào buổi sáng (14,8)-(15,8) — điểm tương tác ===== */
    rect(450, 258, 60, 30, '#2e7d4f'); g.strokeStyle = '#1f5c39'; g.lineWidth = 2; g.strokeRect(450, 258, 60, 30);
    H.txt(g, '安全第一', 480, 266, 9, '#ffffff');
    H.txt(g, '本日のKY', 480, 279, 6, '#dff2e4');
    rect(446, 288, 4, 14, '#6b4a30'); rect(510, 288, 4, 14, '#6b4a30');
    H.txt(g, '朝礼台', 416, 273, 7, '#5a4632');

    /* ===== Góc nghỉ (18,9): băng ghế + máy bán hàng + khu hút thuốc riêng ===== */
    rect(578, 290, 92, 26, '#8a6f52'); rect(582, 294, 84, 6, '#a5825e');
    rect(690, 288, 30, 30, '#c73e3a'); rect(694, 292, 22, 14, '#eaf6ff'); H.txt(g, '飲料', 705, 315, 6, '#7e1f1a');
    rect(578, 322, 60, 20, 'rgba(70,70,70,0.12)'); H.txt(g, '喫煙所', 608, 332, 7, '#5a5148');

    /* ===== Cổng công trường ở ô D (5,11): barie + biển bắt buộc đội mũ ===== */
    rect(130, 322, 64, 26, '#cfc8b8');
    line(128, 356, 224, 356, '#c73e3a', 5); line(128, 356, 160, 344, '#f2f2f0', 5); line(176, 356, 208, 344, '#f2f2f0', 5);
    cir(150, 330, 11, '#f7c948'); ring(150, 330, 11, '#b8860b', 2); H.txt(g, '!', 150, 330, 10, '#7a5200');
    rect(196, 320, 66, 16, '#31517d'); H.txt(g, 'ヘルメット着用', 229, 328, 7, '#ffffff');
  }
};
