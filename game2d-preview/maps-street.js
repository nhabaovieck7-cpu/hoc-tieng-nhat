// maps-street.js — Bản đồ 'street' 🚶 Đường phố Nhật (2D, đợt duyệt bối cảnh mẫu).
// Tự đăng ký theo hợp đồng maps-core.js: dữ liệu thuần + paint(g,H), KHÔNG giữ trạng thái chạy,
// KHÔNG tham chiếu người chơi. Tên cơ sở chỉ dùng tên hư cấu: 高円寺アパート / 築地食堂 /
// 霞が関区役所 / 秋葉原マート.
(function () {
  'use strict';

  // --- Grid 56×12, dựng bằng hàm thuần để bảo đảm mọi hàng cùng độ dài 56 ---
  function row(fill, overrides) {
    var a = [], i, k;
    for (i = 0; i < 56; i++) a.push(fill);
    if (overrides) for (k in overrides) a[+k] = overrides[k];
    return a.join('');
  }
  var HASH56 = row('#');
  var grid = [
    HASH56,                                                        // 0  mặt tiền (chặn)
    HASH56,                                                        // 1  mặt tiền (chặn)
    HASH56,                                                        // 2  mặt tiền (chặn)
    row('#', { 4: 'D', 14: 'D', 24: 'D', 36: 'D' }),               // 3  mặt tiền + 4 ô cửa
    row('s'),                                                      // 4  vỉa hè
    row('s', { 55: 'D' }),                                         // 5  vỉa hè + cửa rìa đông
    row('s', { 0: 'D', 55: 'D' }),                                 // 6  vỉa hè + cửa rìa đông (ga) + cửa rìa tây (trường tiếng)
    row('s', { 55: 'D' }),                                         // 7  vỉa hè (tactile paving)
    row('r'),                                                      // 8  lòng đường
    row('r'),                                                      // 9  lòng đường
    row('r'),                                                      // 10 lòng đường
    row('#', { 8: 'D', 12: 'D', 17: 'D', 22: 'D', 27: 'D', 32: 'D', 40: 'D', 46: 'D' })  // 11 rìa dưới + cổng nam (công viên / các nơi làm theo ngành / phố mua sắm)
  ];

  function paint(g, H) {
    var T = H.T, W = 56 * T;

    // ---------- helpers cục bộ (thuần vẽ, không trạng thái) ----------
    function R(x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
    function RR(x, y, w, h, r, c) { g.fillStyle = c; H.rr(g, x, y, w, h, r); }
    function C(cx, cy, r, c) { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); }
    function RING(cx, cy, r, c, lw) { g.strokeStyle = c; g.lineWidth = lw || 2; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    function L(x1, y1, x2, y2, c, w) { g.strokeStyle = c; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
    function TX(t, x, y, s, c, a, wgt) { H.txt(g, t, x, y, s, c, a, wgt); }
    function vending(px, py, body, dark) {
      // Máy bán hàng tự động: thân cao hơn 1 ô (chân đứng trong ô của nó), màn hình sáng, lon đủ màu.
      RR(px + 3, py - 16, 26, 48, 3, body);
      RR(px + 6, py - 12, 20, 22, 2, '#eaf6ff');
      var cols = ['#e0533d', '#3d7be0', '#39a05a', '#e8a13a', '#7a4fd0', '#e5e5e5'];
      for (var i = 0; i < 6; i++) R(px + 8 + (i % 3) * 6, py - 9 + Math.floor(i / 3) * 9, 4, 7, cols[i]);
      R(px + 6, py + 13, 20, 3, '#ffffff');
      R(px + 8, py + 19, 16, 7, dark);
      C(px + 24, py + 4, 1.6, '#222');
    }
    function tree(tx, ty) {
      var px = tx * T, py = ty * T;
      RR(px + 6, py + 22, 20, 9, 3, '#8a6f52');                    // bồn cây
      R(px + 14, py + 2, 4, 22, '#6b4a30');                        // thân
      // Tán cây THEO MÙA (giai đoạn 6B, KHUNG-GAME §4.11): cây vỉa hè là anh đào —
      // xuân hồng rộ, thu cam, hạ xanh đậm, đông trơ cành điểm tuyết.
      var P = H.pal('sakura');
      if (P.bare) {
        L(px + 16, py + 4, px + 4, py - 12, '#5a4632', 3); L(px + 16, py + 4, px + 16, py - 16, '#5a4632', 3); L(px + 16, py + 4, px + 28, py - 12, '#5a4632', 3);
        L(px + 4, py - 12, px - 2, py - 18, '#5a4632', 2); L(px + 28, py - 12, px + 34, py - 18, '#5a4632', 2);
        C(px + 8, py - 10, 1.8, '#ffffff'); C(px + 24, py - 13, 1.8, '#ffffff');
      } else {
        C(px + 16, py - 4, 17, P.colors[0]);
        C(px + 4, py + 4, 12, P.colors[1]);
        C(px + 28, py + 4, 12, P.colors[2]);
        C(px + 16, py + 8, 13, P.colors[1]);
        C(px + 10, py - 8, 2, P.season === 'spring' ? '#ffffff' : P.colors[2]); C(px + 24, py + 2, 2, P.colors[0]); // điểm hoa/quả theo mùa
      }
    }
    function windowUnit(px, py, warm) {
      RR(px + 3, py + 4, 26, 24, 2, '#f4f1ea');
      RR(px + 5, py + 6, 22, 20, 1, warm ? '#ffd98f' : '#9db8c6');
      L(px + 16, py + 6, px + 16, py + 26, '#f4f1ea', 2);
      L(px + 7, py + 20, px + 13, py + 8, 'rgba(255,255,255,.55)', 2); // vệt sáng kính
    }

    // ================= TRỜI + DÂY ĐIỆN (vùng y âm) =================
    R(0, -40, W, 40, '#bfd9e8');
    RR(60, -34, 52, 11, 6, 'rgba(255,255,255,.85)');
    RR(900, -36, 64, 12, 6, 'rgba(255,255,255,.8)');
    RR(1560, -33, 48, 10, 5, 'rgba(255,255,255,.85)');
    // dây điện võng ngang qua cả phố (vẽ trước, cột vẽ sau)
    g.strokeStyle = '#2e2a26'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(0, -24); g.quadraticCurveTo(W / 2, -8, W, -24); g.stroke();
    g.beginPath(); g.moveTo(0, -33); g.quadraticCurveTo(W / 2, -19, W, -33); g.stroke();
    g.lineWidth = 1;
    g.beginPath(); g.moveTo(0, -14); g.quadraticCurveTo(W / 2, -2, W, -14); g.stroke();

    // ================= NỀN TỪNG Ô =================
    var x, y, px, py, v;
    for (y = 0; y < 12; y++) {
      for (x = 0; x < 56; x++) {
        px = x * T; py = y * T; v = H.hash(x, y);
        if (y <= 3) {
          var wall = '#d8c9a8';
          if (x >= 10 && x < 20) wall = '#b08256';
          else if (x >= 20 && x < 30) wall = '#b9bdc4';
          else if (x >= 30 && x < 32) wall = '#989ea4';
          else if (x >= 32 && x < 42) wall = '#eef0ee';
          else if (x >= 42 && x < 49) wall = '#ddd2bf';
          else if (x >= 49) wall = '#ccd6da';
          R(px, py, T, T, wall);
          if (v > 0.6) R(px, py, T, T, 'rgba(0,0,0,0.045)');
        } else if (y <= 7) {
          R(px, py, T, T, (x + y) % 2 ? '#c7c7c1' : '#c0c0ba');   // vỉa hè lát ô
          if (v > 0.75) R(px + 5, py + 7, 3, 2, 'rgba(0,0,0,.12)');
          g.strokeStyle = 'rgba(90,90,90,.28)'; g.lineWidth = 1;
          g.strokeRect(px + 0.5, py + 0.5, T - 1, T - 1);
        } else if (y <= 10) {
          R(px, py, T, T, '#4b4e54');                              // nhựa đường
          if (v > 0.5) { R(px + 4 + v * 18, py + 6 + v * 16, 2, 2, 'rgba(255,255,255,.10)'); R(px + 20 - v * 10, py + 22, 2, 1, 'rgba(0,0,0,.25)'); }
        } else {
          R(px, py, T, T, '#5d7350');                              // hàng rào cây rìa dưới
          C(px + 8 + v * 14, py + 10, 6, '#54703f'); C(px + 20, py + 22, 7, '#688557');
          if (v > 0.7) C(px + 10 + v * 10, py + 8, 1.8, '#e8e3a1');
        }
      }
    }

    // ================= MẶT TIỀN: CHUNG CƯ 高円寺アパート (x0–9) =================
    R(0, 0, 10 * T, 8, '#8a6f52');                                 // gờ mái
    [1, 2, 6, 7, 8].forEach(function (wx) { windowUnit(wx * T, 6, wx % 2 === 0); });
    [1, 2, 6, 7, 8].forEach(function (wx) {
      windowUnit(wx * T, 38, wx % 3 === 0);
      L(wx * T + 2, 66, wx * T + 30, 66, '#7a7f85', 2);            // lan can ban công hàng 1
      L(wx * T + 2, 71, wx * T + 30, 71, '#7a7f85', 1);
    });
    RR(3 * T + 2, 44, 20, 16, 2, '#d8dde2'); TX('〒', 3 * T + 12, 52, 9, '#5a4632'); // hộp thư / chuông tầng
    RR(1 * T, 74, 8 * T, 22, 4, '#4a3b2c');                        // biển tên chung cư
    TX('高円寺アパート', 5 * T, 85, 19, '#ffe9b0');
    // cửa ra vào x=4, hàng 3
    RR(4 * T + 2, 3 * T + 2, 28, 30, 2, '#5d4630');
    RR(4 * T + 6, 3 * T + 6, 20, 26, 1, '#8fb2c4');
    L(4 * T + 16, 3 * T + 6, 4 * T + 16, 3 * T + 32, '#5d4630', 2);
    C(4 * T + 12, 3 * T + 20, 1.6, '#ffd94d'); C(4 * T + 20, 3 * T + 20, 1.6, '#ffd94d');
    R(3 * T + 6, 3 * T + 8, 14, 20, '#e8e2d4');                    // bảng số phòng / hộp thư cạnh cửa
    for (var mb = 0; mb < 4; mb++) R(3 * T + 8, 3 * T + 11 + mb * 5, 10, 3, '#9aa0a6');
    TX('管理室', 5 * T + 18, 3 * T + 12, 8, '#5a4632');

    // ================= MẶT TIỀN: NHÀ HÀNG 築地食堂 (x10–19) =================
    for (var pl = 0; pl < 10; pl++) L(10 * T + pl * T + 16, 0, 10 * T + pl * T + 16, 96, 'rgba(70,45,25,.35)', 1); // ván gỗ dọc
    R(10 * T, 0, 10 * T, 8, '#6e4526');
    [11, 12, 16, 17, 18].forEach(function (wx) { windowUnit(wx * T, 8, true); });
    [11, 17].forEach(function (wx) { windowUnit(wx * T, 40, true); });
    RR(10 * T + 6, 68, 8 * T - 12 + 2 * T, 26, 4, '#43301f');      // biển hiệu gỗ
    TX('築地食堂', 15 * T, 81, 20, '#ffedd0');
    C(10 * T + 14, 52, 8, '#e8e0cc'); TX('食', 10 * T + 14, 52, 10, '#b03a30'); // đèn lồng giấy 2 đầu
    C(19 * T + 18, 52, 8, '#e8e0cc'); TX('食', 19 * T + 18, 52, 10, '#b03a30');
    // cửa x=14 + のれん (rèm cửa vải chia múi, chữ trắng)
    R(14 * T + 1, 3 * T, 30, 30, '#54402c');
    RR(14 * T + 5, 3 * T + 5, 22, 25, 1, '#c8b28a');
    [0, 1, 2].forEach(function (n) {
      R(14 * T + 2 + n * 10, 3 * T - 2, 9, 17, '#2e4057');
      TX('わ', 14 * T + 6 + n * 10, 3 * T + 6, 8, '#fff');
    });
    TX('メニュー', 17 * T + 16, 3 * T + 10, 9, '#5a3418');          // bảng thực đơn treo cạnh cửa
    R(17 * T + 4, 3 * T + 16, 24, 12, '#f6efdd');
    L(17 * T + 7, 3 * T + 20, 17 * T + 25, 3 * T + 20, '#a08b62', 1);
    L(17 * T + 7, 3 * T + 24, 17 * T + 21, 3 * T + 24, '#a08b62', 1);

    // ================= MẶT TIỀN: ỦY BAN 霞が関区役所 (x20–29) =================
    R(20 * T, 0, 10 * T, 8, '#7e858e');
    for (var st = 0; st < 4; st++) L(20 * T, 34 + st * 24, 30 * T, 34 + st * 24, 'rgba(80,86,94,.35)', 1); // vân đá ngang
    [21, 23, 26, 28].forEach(function (wx) {                        // cửa sổ vuông trang trọng
      RR(wx * T + 5, 14, 22, 20, 1, '#e8eaec'); RR(wx * T + 7, 16, 18, 16, 1, '#7f96a8');
      RR(wx * T + 5, 44, 22, 20, 1, '#e8eaec'); RR(wx * T + 7, 46, 18, 16, 1, '#8aa2b2');
    });
    R(21 * T + 12, 0, 7, 128, '#cfd3d8'); R(28 * T + 13, 0, 7, 128, '#cfd3d8'); // 2 cột trụ
    RR(22 * T + 4, 70, 6 * T - 8, 26, 3, '#5d646d');               // biển đá trang trọng
    TX('霞が関区役所', 25 * T, 83, 19, '#ffffff');
    R(20 * T + 10, 12, 22, 15, '#f2f2f2'); C(20 * T + 21, 19, 4, '#c73e3a'); // cờ Nhật nhỏ đầu hồi
    // cửa kính đôi x=24 + bậc thềm
    RR(24 * T + 1, 3 * T + 2, 30, 30, 2, '#6d757e');
    RR(24 * T + 4, 3 * T + 5, 11, 27, 1, '#a9c6d6'); RR(24 * T + 17, 3 * T + 5, 11, 27, 1, '#a9c6d6');
    R(23 * T, 3 * T + 28, 3 * T, 4, '#9aa0a6');
    // bảng thông báo cạnh cửa x=27
    RR(27 * T + 3, 3 * T + 4, 26, 24, 2, '#3f6152');
    R(27 * T + 6, 3 * T + 7, 9, 8, '#fff'); R(27 * T + 17, 3 * T + 7, 9, 8, '#fdf6d8');
    R(27 * T + 6, 3 * T + 18, 20, 7, '#eef2ee');

    // ================= KHE TƯỜNG x30–31 (giữa ủy ban và combini) =================
    R(30 * T + 13, 0, 6, 96, '#7d838a');                            // ống thoát nước
    RR(31 * T + 4, 60, 24, 34, 2, '#a7adb3'); TX('立入禁止', 31 * T + 16, 77, 8, '#6d7278');
    RR(30 * T + 4, 104, 22, 20, 2, '#8f979e');                      // hộp điện tường

    // ================= MẶT TIỀN: COMBINI 秋葉原マート (x32–41) =================
    RR(32 * T + 2, 10, 10 * T - 4, 42, 5, '#0f766e');              // biển lớn
    TX('秋葉原マート', 37 * T, 31, 24, '#ffffff');
    TX('24時間営業', 40 * T + 8, 31, 10, '#ffe9a8');
    R(32 * T, 54, 10 * T, 6, '#f59e0b');                           // dải màu thương hiệu (3 sọc)
    R(32 * T, 60, 10 * T, 4, '#e0533d'); R(32 * T, 64, 10 * T, 4, '#3d7be0');
    // mặt kính lớn hàng 2–3: thấy kệ hàng + poster bên trong
    R(32 * T + 2, 70, 10 * T - 4, 58, '#8fb8cc');
    for (var sh = 0; sh < 4; sh++) { R(33 * T + sh * 52, 108, 40, 5, '#5d7a68'); R(33 * T + sh * 52, 96, 40, 9, sh % 2 ? '#e8a13a' : '#e0533d'); }
    g.globalAlpha = 0.28; g.fillStyle = '#ffffff';
    g.beginPath(); g.moveTo(33 * T, 128); g.lineTo(35 * T, 70); g.lineTo(36 * T, 70); g.lineTo(34 * T, 128); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(39 * T, 128); g.lineTo(41 * T, 70); g.lineTo(41 * T + 16, 70); g.lineTo(39 * T + 16, 128); g.closePath(); g.fill();
    g.globalAlpha = 1;
    for (var fr = 0; fr <= 10; fr++) L(32 * T + fr * T, 70, 32 * T + fr * T, 128, '#5d707c', 2); // khung kính
    RR(33 * T + 3, 78, 24, 30, 2, '#fdfdfd'); TX('おにぎり', 33 * T + 15, 88, 8, '#c73e3a'); TX('セール', 33 * T + 15, 100, 9, '#0f766e'); // poster 1
    RR(39 * T + 5, 78, 24, 30, 2, '#fff7dd'); TX('お弁当', 39 * T + 17, 88, 8, '#8a5a18'); TX('新発売', 39 * T + 17, 100, 9, '#c73e3a');   // poster 2
    // cửa tự động x=36
    RR(36 * T, 3 * T, 32, 32, 2, '#42525e');
    RR(36 * T + 3, 3 * T + 3, 12, 29, 1, '#cfe8f2'); RR(36 * T + 17, 3 * T + 3, 12, 29, 1, '#cfe8f2');
    TX('自動', 36 * T + 16, 3 * T + 8, 8, '#0f766e');
    RR(40 * T + 4, 3 * T + 6, 24, 22, 2, '#e0533d'); TX('ATM', 40 * T + 16, 3 * T + 17, 10, '#fff'); // biển ATM trong kính

    // ================= NHÀ DÂN x42–48 + KHU ĐỂ XE ĐẠP x49–55 =================
    R(42 * T, 0, 7 * T, 8, '#7a5c40');                             // mái nhà dân
    g.fillStyle = '#8a6a4c'; g.beginPath(); g.moveTo(42 * T, 34); g.lineTo(45 * T + 16, 8); g.lineTo(49 * T, 34); g.closePath(); g.fill();
    [43, 46].forEach(function (wx) { windowUnit(wx * T, 40, false); windowUnit(wx * T, 74, true); });
    RR(45 * T + 2, 3 * T + 4, 60, 26, 2, '#9aa0a6');               // cửa cuốn gara
    for (var gr = 0; gr < 4; gr++) L(45 * T + 4, 3 * T + 10 + gr * 6, 45 * T + 60, 3 * T + 10 + gr * 6, '#767c83', 1);
    R(49 * T, 0, 7 * T, 96, '#b9c6cc');                            // tường sau bãi xe đạp
    [50, 52, 54].forEach(function (wx) { windowUnit(wx * T, 12, false); });
    RR(51 * T + 2, 66, 4 * T - 4, 24, 3, '#31517d');               // biển bãi xe đạp trên tường
    TX('駐輪場', 53 * T, 78, 17, '#ffffff');

    // ================= VỈA HÈ: TACTILE PAVING hàng 7 + dẫn hướng tới zebra =================
    for (x = 0; x < 56; x++) {
      if (x >= 55) continue;
      RR(x * T + 3, 7 * T + 10, 26, 12, 3, '#eec93c');
      for (var d = 0; d < 3; d++) C(x * T + 9 + d * 7, 7 * T + 16, 1.7, '#c9a227');
    }
    for (y = 4; y < 7; y++) {                                      // dải dẫn dọc xuống vạch qua đường (x46)
      RR(46 * T + 10, y * T + 3, 12, 26, 3, '#eec93c');
      L(46 * T + 13, y * T + 8, 46 * T + 19, y * T + 8, '#c9a227', 2); L(46 * T + 13, y * T + 16, 46 * T + 19, y * T + 16, '#c9a227', 2); L(46 * T + 13, y * T + 24, 46 * T + 19, y * T + 24, '#c9a227', 2);
    }
    // cống thoát nước sát lề + vệt nứt vỉa hè
    for (x = 2; x < 56; x += 6) { RR(x * T + 6, 7 * T + 26, 20, 5, 1, '#8f9296'); L(x * T + 10, 7 * T + 26, x * T + 10, 7 * T + 31, '#6f7276', 1); L(x * T + 16, 7 * T + 26, x * T + 16, 7 * T + 31, '#6f7276', 1); L(x * T + 22, 7 * T + 26, x * T + 22, 7 * T + 31, '#6f7276', 1); }
    L(120, 5 * T + 20, 150, 5 * T + 26, 'rgba(90,90,90,.4)', 1); L(1200, 6 * T + 8, 1236, 6 * T + 14, 'rgba(90,90,90,.4)', 1);

    // ================= ĐỒ ĐẠC VỈA HÈ (khớp solidsExtra) =================
    vending(20 * T, 4 * T + 16, '#c73e3a', '#7e1f1a');             // máy bán hàng TƯƠNG TÁC (20,4)
    // thùng rác phân loại cạnh máy (21,4): 燃える / 缶・ペット / 燃えない
    [['#e0533d', '燃'], ['#3d7be0', '缶'], ['#6b7280', '他']].forEach(function (b, i) {
      RR(21 * T + 2 + i * 10, 4 * T + 8, 9, 22, 2, b[0]); TX(b[1], 21 * T + 6 + i * 10, 4 * T + 15, 7, '#fff'); R(21 * T + 3 + i * 10, 4 * T + 5, 7, 3, '#333');
    });
    // túi rác buộc gọn bị DÁN GIẤY NHẮC ĐỎ (22,4) — điểm kích hoạt thoại xin lỗi cảnh 1.11 (kaiwa-08)
    RR(22 * T + 5, 4 * T + 12, 22, 19, 5, '#4c565e');               // thân túi đen buộc miệng
    RR(22 * T + 12, 4 * T + 6, 8, 8, 2, '#39424a');                 // nút buộc
    RR(22 * T + 8, 4 * T + 17, 16, 11, 1, '#e8e4da');               // tờ giấy nhắc trắng…
    RR(22 * T + 8, 4 * T + 17, 16, 4, 1, '#c73e3a');                // …viền đỏ chót = giấy nhắc vi phạm
    TX('!', 22 * T + 16, 4 * T + 25, 8, '#c73e3a');
    vending(42 * T, 4 * T + 16, '#31517d', '#1d3350');             // máy bán hàng TRANG TRÍ cạnh combini (42,4)
    tree(7, 4); tree(27, 4); tree(44, 4);                          // cây xanh vỉa hè
    // bảng thực đơn đứng của nhà hàng (16,4)
    RR(16 * T + 5, 4 * T + 2, 22, 28, 2, '#5d4630'); RR(16 * T + 8, 4 * T + 5, 16, 20, 1, '#fdf6e0');
    TX('定食', 16 * T + 16, 4 * T + 11, 8, '#5a3418'); L(16 * T + 10, 4 * T + 17, 16 * T + 22, 4 * T + 17, '#a08b62', 1); L(16 * T + 10, 4 * T + 21, 16 * T + 20, 4 * T + 21, '#a08b62', 1);
    // cột biển 消火栓 (18,4) + họng nước đỏ dưới chân
    L(18 * T + 16, 4 * T + 30, 18 * T + 16, 4 * T + 8, '#8a8f94', 3);
    RR(18 * T + 5, 4 * T - 2, 22, 13, 3, '#c73e3a'); TX('消火栓', 18 * T + 16, 4 * T + 4, 8, '#fff');
    C(18 * T + 9, 4 * T + 27, 4, '#c73e3a'); R(18 * T + 7, 4 * T + 21, 4, 5, '#a02c28');
    // biển đứng combini (38,4)
    RR(38 * T + 4, 4 * T + 3, 24, 27, 2, '#0f766e'); TX('24h', 38 * T + 16, 4 * T + 12, 10, '#fff'); TX('営業中', 38 * T + 16, 4 * T + 23, 8, '#ffe9a8');
    // bãi xe đạp x50–53 hàng 4: vạch ô + 3 chiếc xe đạp dựng
    for (var bp = 0; bp < 4; bp++) { g.strokeStyle = 'rgba(255,255,255,.75)'; g.lineWidth = 2; g.strokeRect(50 * T + bp * T + 3, 4 * T + 4, 26, 26); }
    [[50, '#c73e3a'], [51, '#31517d'], [53, '#3f7a4d']].forEach(function (bk) {
      var bx = bk[0] * T, by = 4 * T;
      RING(bx + 9, by + 24, 5, '#2e2a26', 2); RING(bx + 24, by + 24, 5, '#2e2a26', 2);
      L(bx + 9, by + 24, bx + 16, by + 12, bk[1], 2); L(bx + 16, by + 12, bx + 24, by + 24, bk[1], 2); L(bx + 16, by + 12, bx + 22, by + 12, bk[1], 2);
      L(bx + 22, by + 12, bx + 24, by + 8, '#2e2a26', 2); L(bx + 14, by + 10, bx + 18, by + 10, '#2e2a26', 2);
      RR(bx + 17, by + 4, 9, 7, 1, '#8a6f52');                      // giỏ xe
    });
    // cột biển bãi xe đạp (54,4)
    L(54 * T + 16, 4 * T + 30, 54 * T + 16, 4 * T + 6, '#8a8f94', 3);
    RR(54 * T + 3, 4 * T - 4, 26, 15, 3, '#31517d'); TX('駐輪場', 54 * T + 16, 4 * T + 3, 9, '#fff');
    // biển tốc độ + tên đường (54,6) — tránh ô (53,6) là điểm spawn từ ga về
    L(54 * T + 16, 6 * T + 30, 54 * T + 16, 6 * T + 2, '#8a8f94', 3);
    C(54 * T + 16, 6 * T + 2, 10, '#f4f4f4'); RING(54 * T + 16, 6 * T + 2, 10, '#c73e3a', 3); TX('30', 54 * T + 16, 6 * T + 2, 10, '#222');
    RR(54 * T + 2, 6 * T + 14, 28, 11, 2, '#31517d'); TX('吉祥寺通り', 54 * T + 16, 6 * T + 19, 7, '#fff');
    // cọc tiêu cam trên đường (33,8)
    g.fillStyle = '#e07830'; g.beginPath(); g.moveTo(33 * T + 9, 8 * T + 28); g.lineTo(33 * T + 16, 8 * T + 6); g.lineTo(33 * T + 23, 8 * T + 28); g.closePath(); g.fill();
    R(33 * T + 12, 8 * T + 16, 8, 4, '#fff'); R(33 * T + 7, 8 * T + 28, 18, 3, '#b85a20');

    // ================= CỘT ĐIỆN + BIẾN ÁP (x9, x30, x49 — chân ở hàng 4) =================
    [9, 30, 49].forEach(function (tx, idx) {
      var cx = tx * T + 16;
      R(cx - 3, -38, 6, 4 * T + 66, '#5d4a38');
      L(cx - 16, -22, cx + 16, -22, '#5d4a38', 4); L(cx - 13, -6, cx + 13, -6, '#5d4a38', 3);
      C(cx - 14, -22, 2, '#d8d8d8'); C(cx + 14, -22, 2, '#d8d8d8');
      if (idx === 1) {                                             // biến áp trên cột giữa
        RR(cx + 5, -30, 15, 20, 3, '#7d838a'); L(cx + 8, -24, cx + 17, -24, '#5d646b', 2); L(cx + 8, -18, cx + 17, -18, '#5d646b', 2);
        RR(cx - 20, -14, 11, 14, 2, '#9aa0a6');
      }
      if (idx === 2) TX('吉祥寺', cx, 26, 8, '#3c4a56');            // biển tên khu trên cột cuối
    });
    // dây hạ thế nối xuống từng nhà (đường chéo mảnh)
    g.strokeStyle = 'rgba(40,36,32,.65)'; g.lineWidth = 1;
    [5, 15, 25, 37, 46].forEach(function (tx) { g.beginPath(); g.moveTo(tx * T + 16, 2); g.lineTo(tx * T + 40, -18); g.stroke(); });

    // ================= LÒNG ĐƯỜNG =================
    R(0, 8 * T + 2, W, 3, 'rgba(255,255,255,.85)');                // vạch mép đường trên
    for (x = 0; x < 56; x += 2) {                                  // vạch phân làn đứt đoạn (tránh zebra)
      if (x >= 44 && x < 49) continue;
      R(x * T + 4, 9 * T + 15, 24, 3, 'rgba(255,255,255,.75)');
    }
    // vạch qua đường zebra x44–48 (sọc dài song song hướng xe chạy)
    for (var zb = 0; zb < 4; zb++) R(44 * T + 4, 8 * T + 7 + zb * 23, 5 * T - 8, 12, '#f2f2f0');
    R(43 * T + 26, 8 * T + 4, 4, 88, '#f2f2f0'); R(49 * T + 2, 8 * T + 4, 4, 88, '#f2f2f0'); // vạch dừng 2 đầu
    // nắp cống tròn (giữa đường)
    [[18, 9], [38, 8], [52, 9]].forEach(function (mh) {
      var cx = mh[0] * T + 16, cy = mh[1] * T + 16;
      C(cx, cy, 11, '#5f646b'); RING(cx, cy, 11, '#33373c', 2); RING(cx, cy, 6, '#484d53', 1);
      L(cx - 6, cy, cx + 6, cy, '#484d53', 1);
    });
    TX('止まれ', 30 * T + 16, 10 * T + 16, 13, 'rgba(255,255,255,.55)'); // chữ sơn mặt đường
    // lan can bảo vệ sát lề (đoạn không có zebra / không sát cửa đông)
    [0, 1, 2, 3, 4, 5, 6, 20, 21, 22, 23, 24, 25].forEach(function (tx) {
      L(tx * T + 1, 8 * T - 3, tx * T + 31, 8 * T - 3, '#aeb4ba', 3); L(tx * T + 4, 8 * T - 3, tx * T + 4, 8 * T + 2, '#8a9096', 2); L(tx * T + 28, 8 * T - 3, tx * T + 28, 8 * T + 2, '#8a9096', 2);
    });

    // ================= CỔNG NAM + BIỂN TÂY (thêm ở đợt mở rộng — chỉ vẽ đè, không đổi hình cũ) =================
    // Cổng công viên (8,11): lối đá xuyên hàng rào cây + biển gỗ treo trên cổng
    R(8 * T, 11 * T, T, T, '#b7a98c'); R(8 * T + 4, 11 * T + 4, 24, 24, '#c4b494');
    L(8 * T + 2, 11 * T, 8 * T + 2, 11 * T + 30, '#6b4a30', 3); L(9 * T - 2, 11 * T, 9 * T - 2, 11 * T + 30, '#6b4a30', 3);
    RR(7 * T + 8, 11 * T - 15, 2 * T + 16, 16, 2, '#4a3b2c'); TX('代々木公園', 8 * T + 16, 11 * T - 7, 11, '#ffe9b0');
    // Cổng phố mua sắm (32,11): lối gạch + cột biển商店街
    R(32 * T, 11 * T, T, T, '#c6bba2'); R(32 * T + 3, 11 * T + 3, 26, 26, '#cfc4ae');
    L(32 * T + 3, 11 * T + 28, 32 * T + 3, 11 * T + 2, '#8a6f52', 3); L(33 * T - 3, 11 * T + 28, 33 * T - 3, 11 * T + 2, '#8a6f52', 3);
    RR(31 * T + 6, 11 * T - 15, 2 * T + 20, 16, 2, '#b03a30'); TX('浅草商店街', 32 * T + 16, 11 * T - 7, 10, '#ffffff');
    // Biển trường tiếng ở rìa tây (gắn trên cột cạnh ô cửa 0,6 — bản cũ 30px/7px bị cắt chữ,
    // nay bảng rộng 3 ô, chữ 10px đọc rõ ở 390px)
    L(6, 5 * T + 30, 6, 5 * T - 12, '#8a8f94', 3);
    RR(0, 5 * T - 16, 3 * T, 19, 2, '#31517d'); TX('日本語学校 ←', 1.5 * T, 5 * T - 6, 10, '#ffffff');
    // Biển GA ở rìa đông (cửa 55,5–55,7): bảng treo trên mặt tiền cuối phố, ngay trên lối ra ga
    // (trước đây phía đông KHÔNG có biển ga nào — chỉ có biển tốc độ/tên đường ở (54,6))
    RR(52 * T + 2, 3 * T + 3, 4 * T - 4, 25, 3, '#20324a');
    TX('新宿駅 →', 54 * T, 3 * T + 12, 13, '#ffffff');
    TX('SHINJUKU STATION', 54 * T, 3 * T + 23, 6, '#a9c6e8');
    // Sáu cổng NƠI LÀM THEO NGÀNH ở rìa nam (đợt mở rộng ngành — cùng kiểu cổng công viên:
    // lối đá xuyên hàng rào cây + hai cọc + biển gỗ tên cơ sở)
    [[12, '横浜建設', '#7a4a2e'], [17, '大阪食品', '#2e6b5e'], [22, '名古屋製作所', '#374151'],
     [27, '富良野農園', '#3d7a3a'], [40, '千葉物流', '#37424e'], [46, '豊田自動車', '#31517d']].forEach(function (gt) {
      var gx = gt[0];
      R(gx * T, 11 * T, T, T, '#b7a98c'); R(gx * T + 4, 11 * T + 4, 24, 24, '#c4b494');
      L(gx * T + 2, 11 * T, gx * T + 2, 11 * T + 30, '#6b4a30', 3); L((gx + 1) * T - 2, 11 * T, (gx + 1) * T - 2, 11 * T + 30, '#6b4a30', 3);
      // Biển cổng treo GIỮA hai cọc, bảng rộng 2,5 ô + chữ 10px (bản cũ 2 ô/8px khó đọc ở 390px)
      RR(gx * T - 24, 11 * T - 15, 80, 16, 2, gt[2]); TX(gt[1], gx * T + 16, 11 * T - 7, 10, '#ffffff');
    });
  }

  window.MAPDEF = window.MAPDEF || {};
  window.MAPDEF['street'] = {
    id: 'street',
    label: '🚶 Đường phố Nhật',
    grid: grid,
    paint: paint,
    solidsExtra: [
      [20, 4, 1, 1],   // máy bán hàng tương tác
      [21, 4, 1, 1],   // cụm thùng rác phân loại
      [42, 4, 1, 1],   // máy bán hàng trang trí cạnh combini
      [7, 4, 1, 1], [27, 4, 1, 1], [44, 4, 1, 1],   // bồn cây vỉa hè
      [9, 4, 1, 1], [30, 4, 1, 1], [49, 4, 1, 1],   // chân cột điện
      [16, 4, 1, 1],   // bảng thực đơn đứng
      [18, 4, 1, 1],   // cột biển消火栓
      [38, 4, 1, 1],   // biển đứng combini
      [50, 4, 4, 1],   // dãy xe đạp ở bãi
      [54, 4, 1, 1],   // cột biển駐輪場
      [54, 6, 1, 1],   // cột biển tốc độ / tên đường (tránh ô spawn 53,6 từ ga)
      [33, 8, 1, 1]    // cọc tiêu cam trên đường
    ],
    doors: {
      '4,3': { to: 'room', spawn: [7, 8] },
      '14,3': { to: 'restaurant', spawn: [8, 9] },
      '24,3': { to: 'shiyakusho', spawn: [9, 10] },
      '36,3': { to: 'combini', spawn: [8, 9] },
      '55,5': { to: 'station', spawn: [1, 6] },
      '55,6': { to: 'station', spawn: [1, 6] },
      '55,7': { to: 'station', spawn: [1, 6] },
      '0,6': { to: 'school', spawn: [23, 6] },
      '8,11': { to: 'park', spawn: [8, 2] },
      '12,11': { to: 'genba', spawn: [5, 9] },
      '17,11': { to: 'shokuhin', spawn: [5, 9] },
      '22,11': { to: 'seizo', spawn: [5, 9] },
      '27,11': { to: 'nogyo', spawn: [5, 9] },
      '40,11': { to: 'soko', spawn: [5, 9] },
      '46,11': { to: 'seibi', spawn: [5, 9] },
      '32,11': { to: 'shotengai', spawn: [28, 4] }
    },
    npcs: [
      { id: 'hung', name: 'Hùng "sẹo"', sprite: 'hung', tx: 42, ty: 6, behavior: 'pace', from: 42, to: 49, scene: 'hung', label: '💬 Nói chuyện với Hùng', range: 56 }
    ],
    objects: [
      { tx: 20, ty: 4, tw: 1, th: 1, interact: { scene: 'vending', label: '🥤 Xem máy bán hàng' } },
      { tx: 21, ty: 4, tw: 1, th: 1, interact: { scene: 'gomi', label: '🗑️ Điểm tập kết rác' } },
      { tx: 22, ty: 4, tw: 1, th: 1, interact: { scene: 'gomi-apology', label: '📄 Túi rác bị dán giấy nhắc đỏ' } }
    ],
    spawnDefault: [6, 6]
  };
})();
