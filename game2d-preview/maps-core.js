// maps-core.js — Lõi bản đồ 2D «TUỔI TRẺ Ở NHẬT» (đợt bối cảnh mẫu).
// Các file maps-*.js đăng ký định nghĩa vào window.MAPDEF theo hợp đồng:
//   MAPDEF[id] = {
//     id, label,
//     grid: [chuỗi...],            // '#' = chặn; ký tự khác = đi được; ô cửa dùng 'D'
//     paint: function (g, H) {},   // vẽ TOÀN BỘ nền tĩnh (ô + đồ đạc) lên canvas đã translate(0,40)
//     solidsExtra: [[tx,ty,tw,th], ...],   // vùng đồ đạc chặn (ngoài '#')
//     doors: { 'tx,ty': { to:'mapId', spawn:[tx,ty] } },
//     npcs: [ {id,name,sprite,tx,ty,behavior:'stand'|'pace',from,to,scene,label,range} ],
//     objects: [ {tx,ty,tw,th,interact:{scene,label}} ],   // điểm tương tác (tùy chọn)
//     spawnDefault: [tx, ty]
//   }
// H (helpers vẽ): { T, hash(x,y), rr(g,x,y,w,h,r), txt(g,text,cx,cy,size,color,align,weight), line(g,...) }
(function () {
  'use strict';
  var TILE = 32;

  function hash(x, y) { var h = (x * 374761393 + y * 668265263) ^ 0x5bf03635; h = (h ^ (h >> 13)) * 1274126177; return ((h ^ (h >> 16)) >>> 0) / 4294967295; }
  function rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r);
    g.closePath(); g.fill();
  }
  function txt(g, text, cx, cy, size, color, align, weight) {
    g.fillStyle = color || '#fff';
    g.font = (weight || 'bold') + ' ' + (size || 12) + 'px "Hiragino Sans","Noto Sans JP",sans-serif';
    g.textAlign = align || 'center'; g.textBaseline = 'middle';
    g.fillText(text, cx, cy);
  }
  var H = { T: TILE, hash: hash, rr: rr, txt: txt };

  /* ===== MÙA (giai đoạn 6B — luật ở KHUNG-GAME §4.11) =====
     Mùa hiện tại do LIFE.season() quyết từ tiến trình truyện; file bản đồ chỉ ĐỌC để
     chọn màu tán cây, không tự quyết mùa. Ba họ cây: 'sakura' (anh đào — cây lớn ở
     công viên, cây vỉa hè phố), 'momiji' (phong — hàng phong ở chùa), 'leaf' (cây lá
     thường + bồ đề). Đông: bare=true → vẽ cành trơ bằng H.branches thay cho tán lá. */
  function seasonNow() {
    try { if (window.LIFE && window.LIFE.season) return window.LIFE.season(); } catch (e) {}
    return 'autumn';
  }
  var CANOPY = {
    sakura: { spring: ['#f2a4c0', '#f7c3d6', '#eda0bf'], summer: ['#3f7031', '#4e7d3a', '#5d8f45'], autumn: ['#d97b3f', '#e59a52', '#c96a35'] },
    momiji: { spring: ['#7fb069', '#97c47e', '#6da05c'], summer: ['#3f7031', '#4e7d3a', '#557f3e'], autumn: ['#cf3f1d', '#e2703a', '#e8a13a'] },
    leaf:   { spring: ['#5d9a4a', '#74b25e', '#4e8f45'], summer: ['#356b2c', '#3f7031', '#4e7d3a'], autumn: ['#c9a13a', '#dcb84e', '#b8862e'] }
  };
  function pal(type) {
    var s = seasonNow();
    var t = CANOPY[type] || CANOPY.leaf;
    return { season: s, bare: s === 'winter', colors: t[s] || t.autumn };
  }
  // Cành trơ mùa đông: (cx, cy) = điểm thân gặp tán; cành tỏa lên trên + điểm tuyết.
  function branches(g, cx, cy, r) {
    g.strokeStyle = '#5a4632'; g.lineCap = 'round';
    var limbs = [[-0.85, -0.72], [-0.45, -0.98], [0, -1.06], [0.45, -0.98], [0.85, -0.72]];
    limbs.forEach(function (L) {
      var ex = cx + L[0] * r, ey = cy + L[1] * r;
      g.lineWidth = 3.4; g.beginPath(); g.moveTo(cx, cy); g.lineTo(ex, ey); g.stroke();
      g.lineWidth = 1.8;
      g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex + L[0] * r * 0.34, ey - r * 0.30); g.stroke();
      g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex - L[1] * r * 0.22, ey - r * 0.26); g.stroke();
    });
    g.fillStyle = 'rgba(255,255,255,0.9)';
    [[-0.5, -0.92], [0.1, -1.02], [0.6, -0.88], [-0.15, -0.68], [0.35, -0.6]].forEach(function (d) {
      g.beginPath(); g.arc(cx + d[0] * r, cy + d[1] * r, 1.8, 0, Math.PI * 2); g.fill();
    });
  }
  H.season = seasonNow; H.pal = pal; H.branches = branches;

  window.MAPDEF = window.MAPDEF || {};

  function build(id) {
    var def = window.MAPDEF[id];
    if (!def) throw new Error('Thiếu bản đồ: ' + id);
    var w = def.grid[0].length, h = def.grid.length;
    var c = document.createElement('canvas');
    c.width = w * TILE; c.height = h * TILE + 40; // chừa 40px phía trên cho biển/cột vẽ vượt ô
    var g = c.getContext('2d');
    g.translate(0, 40);
    var solid = {};
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      if (def.grid[y][x] === '#') solid[x + ',' + y] = true;
    }
    (def.solidsExtra || []).forEach(function (r) {
      for (var yy = r[1]; yy < r[1] + r[3]; yy++) for (var xx = r[0]; xx < r[0] + r[2]; xx++) solid[xx + ',' + yy] = true;
    });
    if (typeof def.paint === 'function') def.paint(g, H);
    if (!def.objects) def.objects = [];
    if (!def.npcs) def.npcs = [];
    if (!def.doors) def.doors = {};
    return { def: def, canvas: c, solid: solid, w: w, h: h };
  }

  window.MAPS2D = { TILE: TILE, defs: window.MAPDEF, build: build, H: H };
})();
