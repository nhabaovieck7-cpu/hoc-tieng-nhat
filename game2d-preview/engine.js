// engine.js — Máy chơi DEMO 2D «TUỔI TRẺ Ở NHẬT»:
// Canvas 2D + requestAnimationFrame, đi lại 4 hướng (CHẠM/ẤN-ĐỂ-ĐI theo BFS là chính —
// chủ trang chốt 08:11 JST 31/10/2026: BỎ nút điều hướng ảo; phím WASD/mũi tên chỉ còn là phụ trợ),
// camera bám nhân vật, va chạm theo ô, cửa chuyển khu, NPC đi lại nhẹ,
// và máy hội thoại kaiwa sao đúng cơ chế lane truyện (chọn 1/3 — sai: 😅「えっ…？」+ tô sáng câu đúng).
(function () {
  'use strict';
  var TILE = window.MAPS2D.TILE;
  var DATA = window.DEMO_DATA;

  /* ---------- Tiện ích ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function furiHtml(s) { return esc(s).replace(/\{([^{}|]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>'); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* ---------- Trạng thái ---------- */
  var cv = document.getElementById('game');
  var ctx = cv.getContext('2d');
  var view = { w: 0, h: 0, dpr: 1 };
  var built = {};                 // id -> {def, canvas, solid, w, h}
  var cur = null;                 // bản đồ hiện tại (built)
  var started = false;
  var player = {
    name: '', call: 'anh', gender: 'M', sprite: null,
    x: 0, y: 0, dir: 'down', moving: false, phase: 0, frame: 0
  };
  var npcs = [];                  // NPC runtime của khu hiện tại
  var remotes = {};               // Avatar người chơi khác (LỚP THẾ GIỚI — pha online sau qua Worker;
                                  // đợt này chưa có nguồn dữ liệu, chỉ giữ chỗ kiến trúc tách lớp)
  var keys = {};
  var path = [];                  // đường đi BFS (danh sách tâm ô)
  var target = null;              // điểm tương tác gần nhất {kind:'npc'|'prop', ref, label}
  var dlgOpen = false;
  var fade = 0;                   // hiệu ứng chuyển khu (0..1)
  var frameTimes = [];
  var fpsNow = 0;
  /* Cỡ hình (Lane H): hệ số phóng của camera — mặc định 1.35 (to rõ hơn bản 1.0 cũ),
     chỉnh ở Cài đặt qua WORLD2D.setZoom, lưu localStorage. Mọi phép tính camera làm
     việc trong "đơn vị thế giới" vw/vh = kích thước CSS / zoom rồi scale khi vẽ. */
  var ZOOM_KEY = 'tuoitre2d_zoom';
  var zoom = 1.35;
  try { var zv = parseFloat(localStorage.getItem(ZOOM_KEY)); if (zv >= 1 && zv <= 1.6) zoom = zv; } catch (e) {}
  function viewW() { return view.w / zoom; }
  function viewH() { return view.h / zoom; }
  // Cache khung bản đồ đã phóng theo (bản đồ, camera, zoom, mùa) — camera đứng yên
  // thì khỏi phải phóng lại cả vùng bản đồ mỗi khung (giữ FPS trên máy yếu).
  var mapCache = document.createElement('canvas');
  var mapCacheKey = '';

  function buildMap(id) {
    // Giai đoạn 6B: nền tĩnh được paint theo MÙA lúc dựng (tán cây đổi màu — maps-core
    // H.pal), nên mùa đổi giữa phiên (đỗ mốc N4 → xuân…) thì bản đồ đã cache phải dựng
    // lại, người chơi thấy cây đổi màu ngay, không cần tải lại trang.
    var s = null;
    try { s = (window.LIFE && window.LIFE.season) ? window.LIFE.season() : null; } catch (e) {}
    if (!built[id] || (s && built[id].__season !== s)) { built[id] = window.MAPS2D.build(id); built[id].__season = s; }
    return built[id];
  }

  function tileAt(tx, ty) {
    if (!cur) return true;
    if (tx < 0 || ty < 0 || tx >= cur.w || ty >= cur.h) return true;
    return !!cur.solid[tx + ',' + ty];
  }
  function npcTileSolid(tx, ty, ignore) {
    for (var i = 0; i < npcs.length; i++) {
      if (npcs[i] === ignore) continue;
      var ntx = Math.floor(npcs[i].x / TILE), nty = Math.floor(npcs[i].y / TILE);
      if (ntx === tx && nty === ty) return true;
    }
    return false;
  }
  function boxHits(x, y) {
    var x0 = Math.floor((x - 9) / TILE), x1 = Math.floor((x + 9) / TILE);
    var y0 = Math.floor((y - 5) / TILE), y1 = Math.floor((y + 5) / TILE);
    for (var ty = y0; ty <= y1; ty++) for (var tx = x0; tx <= x1; tx++) {
      if (tileAt(tx, ty) || npcTileSolid(tx, ty)) return true;
    }
    return false;
  }

  /* ---------- Chuyển khu ---------- */
  function enterMap(id, spawnTx, spawnTy, dir) {
    cur = buildMap(id);
    player.x = spawnTx * TILE + TILE / 2;
    player.y = spawnTy * TILE + TILE / 2;
    player.dir = dir || 'down';
    path = [];
    npcs = cur.def.npcs.map(function (n) {
      return {
        def: n, id: n.id, name: n.name, scene: n.scene, label: n.label,
        sprite: window.SPRITES[n.sprite](),
        x: n.tx * TILE + TILE / 2, y: n.ty * TILE + TILE / 2,
        dir: 'down', frame: 0, phase: Math.random() * 2,
        paceDir: 1, waitT: 0
      };
    });
    document.getElementById('hud-area').textContent = (window.PLACES && window.PLACES[id]) ? window.PLACES[id].label : cur.def.label;   // tên địa điểm lấy từ BẢNG ĐĂNG KÝ DUY NHẤT places.js (giai đoạn 2)
    fade = 1;
    if (window.FLOW && window.FLOW.onMapEnter) window.FLOW.onMapEnter(id);
  }
  function checkDoor() {
    var tx = Math.floor(player.x / TILE), ty = Math.floor(player.y / TILE);
    var d = cur.def.doors[tx + ',' + ty];
    if (d) enterMap(d.to, d.spawn[0], d.spawn[1], d.to === 'street' ? 'down' : 'up');
  }

  /* ---------- BFS chạm-để-đi ---------- */
  function findPath(tx, ty) {
    if (tileAt(tx, ty)) return null;
    var sx = Math.floor(player.x / TILE), sy = Math.floor(player.y / TILE);
    var key = function (x, y) { return x + ',' + y; };
    var prev = {}, seen = { }, q = [[sx, sy]];
    seen[key(sx, sy)] = true;
    while (q.length) {
      var c = q.shift(), cx = c[0], cy = c[1];
      if (cx === tx && cy === ty) {
        var out = [], k = key(tx, ty);
        while (k !== key(sx, sy)) {
          var p = k.split(','); out.unshift({ x: +p[0] * TILE + TILE / 2, y: +p[1] * TILE + TILE / 2 });
          k = prev[k];
        }
        return out;
      }
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        var nx = cx + d[0], ny = cy + d[1], kk = key(nx, ny);
        if (!seen[kk] && !tileAt(nx, ny) && !npcTileSolid(nx, ny)) { seen[kk] = true; prev[kk] = key(cx, cy); q.push([nx, ny]); }
      });
    }
    return null;
  }

  /* ---------- Cập nhật ---------- */
  var SPEED = 118;
  function update(dt) {
    if (!started || dlgOpen) return;
    var mx = 0, my = 0;
    if (keys.ArrowLeft || keys.a) mx -= 1;
    if (keys.ArrowRight || keys.d) mx += 1;
    if (keys.ArrowUp || keys.w) my -= 1;
    if (keys.ArrowDown || keys.s) my += 1;
    if (mx || my) path = [];
    if (!mx && !my && path.length) {
      var wp = path[0];
      var dx = wp.x - player.x, dy = wp.y - player.y;
      if (Math.abs(dx) < 3 && Math.abs(dy) < 3) { path.shift(); }
      else if (Math.abs(dx) >= Math.abs(dy)) { mx = Math.sign(dx); } else { my = Math.sign(dy); }
    }
    player.moving = !!(mx || my);
    if (player.moving) {
      if (mx) player.dir = mx < 0 ? 'left' : 'right';
      else if (my) player.dir = my < 0 ? 'up' : 'down';
      var nx = player.x + mx * SPEED * dt;
      if (!boxHits(nx, player.y)) player.x = nx;
      var ny = player.y + my * SPEED * dt;
      if (!boxHits(player.x, ny)) player.y = ny;
      player.phase += dt;
      player.frame = (Math.floor(player.phase / 0.16) % 2) + 1;
      checkDoor();
    } else { player.frame = 0; player.phase = 0; }

    // NPC đi lại nhẹ
    npcs.forEach(function (n) {
      n.phase += dt;
      if (n.def.behavior === 'pace') {
        if (n.waitT > 0) { n.waitT -= dt; n.frame = 0; return; }
        var targetX = (n.paceDir > 0 ? n.def.to : n.def.from) * TILE + TILE / 2;
        var d = targetX - n.x;
        if (Math.abs(d) < 4) { n.paceDir *= -1; n.waitT = 1.6; n.frame = 0; return; }
        n.dir = d > 0 ? 'right' : 'left';
        n.x += Math.sign(d) * 30 * dt;
        n.frame = (Math.floor(n.phase / 0.22) % 2) + 1;
      } else {
        n.frame = 0;
        n.dir = 'down';
      }
    });

    updateTarget();
  }

  function updateTarget() {
    var best = null, bestD = 1e9;
    npcs.forEach(function (n) {
      var d = Math.hypot(n.x - player.x, n.y - player.y);
      var range = n.def.range || 56;
      if (d < range && d < bestD) { bestD = d; best = { kind: 'npc', ref: n, label: n.label || '💬 Nói chuyện' }; }
    });
    cur.def.objects.forEach(function (o) {
      if (!o.interact) return;
      var cxp = (o.tx + o.tw / 2) * TILE, cyp = (o.ty + o.th / 2) * TILE;
      var d = Math.hypot(cxp - player.x, cyp - player.y);
      if (d < 58 && d < bestD) { bestD = d; best = { kind: 'prop', ref: o, label: o.interact.label, scene: o.interact.scene }; }
    });
    target = best;
    var btn = document.getElementById('btn-interact');
    if (target && !dlgOpen) {
      btn.textContent = target.label;
      btn.classList.add('show');
    } else btn.classList.remove('show');
  }

  /* ---------- Vẽ ---------- */
  function drawCharAt(g, spriteSet, dir, frame, x, y, flipSrc) {
    var frames = spriteSet.frames[dir] || spriteSet.frames.down;
    var img = frames[frame] || frames[0];
    g.fillStyle = 'rgba(0,0,0,.22)';
    g.beginPath(); g.ellipse(x, y + 2, 11, 4, 0, 0, Math.PI * 2); g.fill();
    g.save();
    if (dir === 'left' && flipSrc) { g.translate(x, 0); g.scale(-1, 1); g.drawImage(img, -16, y - 46, 32, 48); }
    else g.drawImage(img, x - 16, y - 46, 32, 48);
    g.restore();
  }
  // Cache bề rộng chữ của biển tên (Lane H — đo 1 lần/tên, giữ FPS khi vẽ mỗi khung)
  var plateWCache = {};
  function plateWidth(g, text) {
    var w = plateWCache[text];
    if (w == null) { g.font = '600 10px sans-serif'; w = g.measureText(text).width + 12; plateWCache[text] = w; }
    return w;
  }
  function plateWidthF(g, text, font) {
    var key = font + '|' + text, w = plateWCache[key];
    if (w == null) { g.font = font; w = g.measureText(text).width + 14; plateWCache[key] = w; }
    return w;
  }
  // Nhãn NƠI ĐẾN tại điểm cửa (bổ sung chủ trang 22:02 — cửa phải ghi rõ ĐI ĐÂU):
  // "🚪 → Đường phố 吉祥寺" = mô tả tiếng Việt (từ PLACES.label) + tên riêng nơi đến,
  // lấy từ doors[].to → bảng đăng ký places.js (nguồn tên duy nhất).
  function doorText(to) {
    var P = (window.PLACES || {})[to];
    if (!P) return '🚪 → …';
    var desc = (P.label || '').split('—')[0].trim().replace(/^\S+\s+/, '');
    return '🚪 → ' + (desc ? desc + ' ' : '') + P.jp;
  }
  // Cache BITMAP biển chữ (Lane H2 — tối ưu FPS): nền + chữ render 1 lần vào canvas
  // riêng ở độ nét ×3, mỗi khung chỉ drawImage. fillText + roundRect lặp lại từng
  // khung rất đắt trong trình duyệt render phần mềm (đo tại công viên 390px).
  var plateBmpCache = {};
  var plateBmpCount = 0;
  var measCtx = document.createElement('canvas').getContext('2d');
  function plateBitmap(text, font, fg, bg, hPx) {
    var key = font + '|' + fg + '|' + bg + '|' + hPx + '|' + text;
    var hit = plateBmpCache[key];
    if (hit) return hit;
    if (plateBmpCount > 240) { plateBmpCache = {}; plateBmpCount = 0; }
    var S = 3;
    measCtx.font = font;
    var size = parseFloat((font.match(/(\d+(?:\.\d+)?)px/) || [0, 11])[1]);
    var w = Math.ceil(measCtx.measureText(text).width) + Math.round(size * 1.4);
    var h = hPx || Math.round(size * 1.55);
    var c = document.createElement('canvas');
    c.width = w * S; c.height = h * S;
    var g = c.getContext('2d');
    g.scale(S, S);
    g.fillStyle = bg;
    g.beginPath(); g.roundRect(0.75, 0.75, w - 1.5, h - 1.5, (h - 1.5) / 2); g.fill();
    g.font = font; g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, w / 2, h / 2 + 0.5);
    hit = { c: c, w: w, h: h };
    plateBmpCache[key] = hit; plateBmpCount++;
    return hit;
  }
  function blitPlate(g, cx, cy, bmp) { g.drawImage(bmp.c, cx - bmp.w / 2, cy - bmp.h / 2, bmp.w, bmp.h); }
  // Biển tên NHÂN VẬT CHÍNH + người chơi khác: cỡ chuẩn, nổi nhất
  function drawNamePlate(g, x, y, text) {
    blitPlate(g, x, y - 55, plateBitmap(text, '600 10px sans-serif', '#fff', 'rgba(20,20,30,.72)', 15));
  }
  // Biển tên NPC: NHỎ hơn biển nhân vật chính một bậc (phân cấp thị giác — Lane H2),
  // nền trong hơn; vẫn đủ rõ để nhận ra Bố/Mẹ/Linh/Yui… từ xa.
  function drawNpcNamePlate(g, x, y, text) {
    blitPlate(g, x, y - 55, plateBitmap(text, '600 9px sans-serif', '#fff', 'rgba(20,20,30,.58)', 13));
  }
  // Biển nhỏ tự do (cửa ra vào — Lane H, nét bitmap Lane H2): tâm tại (cx, cy),
  // chữ đậm TO rõ từ xa
  function drawSignPlate(g, cx, cy, text, font) {
    var f = font || '700 12px sans-serif';
    blitPlate(g, cx, cy, plateBitmap(text, f, '#fff', 'rgba(20,20,30,.82)', 18));
  }
  // Mũi tên chỉ đường (Lane H): đích do guide.js cấp qua GUIDE.targetFor(mapId) —
  // tọa độ THẾ GIỚI của NPC/vật thể bước hiện tại, hoặc ô cửa đi đúng hướng.
  function drawGuideArrow(gt, camX, camY, vw, vh, now) {
    var tx = gt.x - camX, ty = gt.y - camY;
    var px = player.x - camX, py = player.y - camY;
    var dist = Math.max(1, Math.round(Math.hypot(gt.x - player.x, gt.y - player.y) / TILE));
    var bob = Math.sin(now / 260) * 3;
    var pulse = 0.65 + 0.35 * Math.sin(now / 300);
    ctx.save();
    if (tx >= -16 && tx <= vw + 16 && ty >= -30 && ty <= vh + 16) {
      // Đích trong tầm nhìn: vòng sáng dưới chân + mũi tên nảy phát sáng phía trên
      ctx.fillStyle = 'rgba(255,205,64,' + (0.30 * pulse + 0.18).toFixed(3) + ')';
      ctx.beginPath(); ctx.ellipse(tx, ty + 4, 17, 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffcd40';
      ctx.strokeStyle = 'rgba(90,60,0,.85)'; ctx.lineWidth = 1.4;
      ctx.beginPath();
      // Nâng lên trên biển tên (Lane H2): mũi tên ở ty-84..-72, biển tên NPC nằm ở
      // ty-62..-48 — không còn đè lên tên nhân vật được chỉ tới.
      ctx.moveTo(tx - 9, ty - 84 + bob); ctx.lineTo(tx + 9, ty - 84 + bob); ctx.lineTo(tx, ty - 72 + bob);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else {
      // Đích ngoài tầm nhìn: mũi tên ghim ở mép màn hình, xoay đúng hướng + số bước
      var ex = clamp(tx, 34, vw - 34), ey = clamp(ty, 46, vh - 34);
      var ang = Math.atan2(ty - py, tx - px);
      ctx.translate(ex, ey); ctx.rotate(ang);
      ctx.fillStyle = '#ffcd40';
      ctx.strokeStyle = 'rgba(90,60,0,.85)'; ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(13, 0); ctx.lineTo(-8, -9); ctx.lineTo(-3, 0); ctx.lineTo(-8, 9);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.rotate(-ang);
      // Kèm TÊN nơi/người cần tới (bổ sung 22:02) + số bước ước lượng — biển bitmap
      // cache theo chuỗi (Lane H2): khỏi fillText mỗi khung.
      var label = (gt.label ? gt.label + ' · ' : '') + '≈' + dist + ' bước';
      blitPlate(ctx, 0, 20, plateBitmap(label, '700 10px sans-serif', '#ffe9a8', 'rgba(20,20,30,.78)', 14));
    }
    ctx.restore();
  }
  function render(now) {
    if (!cur) { ctx.fillStyle = '#20242a'; ctx.fillRect(0, 0, view.w, view.h); return; }
    var mapW = cur.w * TILE, mapH = cur.h * TILE;
    var vw = viewW(), vh = viewH();
    var camX = mapW <= vw ? (mapW - vw) / 2 : clamp(player.x - vw / 2, 0, mapW - vw);
    var camY = mapH <= vh ? (mapH - vh) / 2 : clamp(player.y - vh / 2, 0, mapH - vh);
    // Bản đồ phủ kín khung hình thì khỏi tô nền toàn cảnh (tiết kiệm cho FPS);
    // bản đồ nhỏ hơn khung vẫn tô nền như cũ để có viền tối quanh bản đồ.
    if (mapW < vw || mapH < vh) { ctx.fillStyle = '#20242a'; ctx.fillRect(0, 0, view.w, view.h); }
    ctx.save();
    ctx.scale(zoom, zoom);
    // Chỉ blit vùng bản đồ đang nhìn thấy (tối ưu FPS) — qua lớp cache: chỉ dựng lại
    // khi bản đồ/camera/zoom/mùa đổi, còn lại dán nguyên khung (1:1, rất rẻ).
    // Canvas bản đồ tĩnh được paint SIÊU MẪU ×cur.ss (Lane M — maps-core): tọa độ
    // nguồn phải nhân hệ số này, kích thước đích giữ theo đơn vị thế giới (thu nhỏ
    // từ bản siêu mẫu xuống = chữ/biển trong thế giới nét, hết nhòe do phóng to).
    var mss = cur.ss || 1;
    var srcX = Math.max(0, camX) * mss, srcY = Math.max(0, camY + 40) * mss;
    var dstX = srcX / mss - camX, dstY = srcY / mss - (camY + 40);
    var srcW = Math.min(cur.canvas.width - srcX, (vw - dstX) * mss);
    var srcH = Math.min(cur.canvas.height - srcY, (vh - dstY) * mss);
    if (srcW > 0 && srcH > 0) {
      var cacheKey = cur.def.id + '|' + camX.toFixed(1) + '|' + camY.toFixed(1) + '|' + zoom + '|' + view.w + 'x' + view.h + '|' + view.dpr + '|' + ((window.SEASON && window.SEASON.current) ? window.SEASON.current() : '');
      if (cacheKey !== mapCacheKey) {
        mapCacheKey = cacheKey;
        if (mapCache.width !== cv.width || mapCache.height !== cv.height) { mapCache.width = cv.width; mapCache.height = cv.height; }
        var mc = mapCache.getContext('2d');
        mc.setTransform(view.dpr * zoom, 0, 0, view.dpr * zoom, 0, 0);
        mc.clearRect(0, 0, vw, vh);
        mc.drawImage(cur.canvas, srcX, srcY, srcW, srcH, dstX, dstY, srcW / mss, srcH / mss);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(mapCache, 0, 0);
      ctx.setTransform(view.dpr * zoom, 0, 0, view.dpr * zoom, 0, 0);
    }

    // Đánh dấu cửa NỔI BẬT (Lane H): vệt sáng ở sàn + mũi tên nảy to + biển tên nơi tới
    // (tên lấy từ bảng đăng ký places.js) — đứng xa cũng thấy ngay chỗ ra vào.
    Object.keys(cur.def.doors).forEach(function (k) {
      var p = k.split(','), dx = +p[0] * TILE + 16 - camX, dy = +p[1] * TILE - camY;
      // Cắt cửa NGOÀI khung nhìn (Lane H2): bản đồ lớn có tới 16 cửa, vẽ tất cả mỗi
      // khung là phí vô ích — chỉ vẽ cửa trong/viền khung hình.
      if (dx < -90 || dx > vw + 90 || dy < -100 || dy > vh + 90) return;
      var dest = cur.def.doors[k].to;
      var bob = Math.sin(now / 300) * 3;
      var pulse = 0.30 + 0.14 * Math.sin(now / 300);
      ctx.fillStyle = 'rgba(255,205,64,' + pulse.toFixed(3) + ')';
      ctx.beginPath(); ctx.ellipse(dx, dy + 28, 19, 6.5, 0, 0, Math.PI * 2); ctx.fill();
      // Mũi tên chỉ xuống TO hơn hẳn (Lane H2 — chủ trang chê marker cũ quá nhỏ):
      // rộng 22px, cao 15px, viền đậm.
      ctx.fillStyle = '#ffcd40';
      ctx.strokeStyle = 'rgba(90,60,0,.85)'; ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(dx - 11, dy + 1 + bob); ctx.lineTo(dx + 11, dy + 1 + bob); ctx.lineTo(dx, dy + 16 + bob);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      // Biển TÊN NƠI ĐẾN ngay tại cửa (bổ sung 22:02): "🚪 → Đường phố 吉祥寺"
      drawSignPlate(ctx, dx, dy - 15, doorText(dest));
    });

    // Vẽ thực thể theo thứ tự y
    var ents = npcs.map(function (n) { return { y: n.y, n: n }; });
    Object.keys(remotes).forEach(function (id) {
      var r = remotes[id];
      if (r.map === cur.def.id) ents.push({ y: r.y, r: r });
    });
    ents.push({ y: player.y, p: true });
    ents.sort(function (a, b) { return a.y - b.y; });
    ents.forEach(function (e) {
      if (e.p) {
        drawCharAt(ctx, player.sprite, player.dir, player.frame, player.x - camX, player.y - camY, true);
        drawNamePlate(ctx, player.x - camX, player.y - camY, player.name);
      } else if (e.r) {
        drawCharAt(ctx, e.r.sprite, e.r.dir, e.r.frame, e.r.x - camX, e.r.y - camY, true);
        drawNamePlate(ctx, e.r.x - camX, e.r.y - camY, e.r.name);
      } else {
        drawCharAt(ctx, e.n.sprite, e.n.dir, e.n.frame, e.n.x - camX, e.n.y - camY, true);
        // Tên trên đầu MỌI NPC (Lane H — góp ý chủ trang: nhân vật nào cũng phải có
        // tên cho dễ nhìn, không chỉ nhân vật chính/người đang tương tác). Biển NPC
        // nhỏ hơn biển nhân vật chính 1 bậc (Lane H2) + cắt khi ngoài khung nhìn.
        var nx = e.n.x - camX, ny = e.n.y - camY;
        if (e.n.name && nx > -80 && nx < vw + 80 && ny > -40 && ny < vh + 80) drawNpcNamePlate(ctx, nx, ny, e.n.name);
      }
    });

    // Mũi tên chỉ đường tới bước hiện tại (Lane H — đích do guide.js cấp)
    if (window.GUIDE && window.GUIDE.targetFor) {
      var gt = window.GUIDE.targetFor(cur.def.id);
      if (gt) drawGuideArrow(gt, camX, camY, vw, vh, now);
    }
    ctx.restore();

    if (fade > 0) {
      ctx.fillStyle = 'rgba(10,10,16,' + (fade * 0.9).toFixed(3) + ')';
      ctx.fillRect(0, 0, view.w, view.h);
    }
  }

  /* ---------- Vòng lặp + FPS ---------- */
  var lastT = 0;
  function loop(t) {
    requestAnimationFrame(loop);
    var rawDt = lastT ? (t - lastT) : 16.7;
    var dt = Math.min(0.05, rawDt / 1000 || 0);
    lastT = t;
    if (rawDt > 0 && rawDt < 250) {
      frameTimes.push(rawDt);
      if (frameTimes.length > 40) frameTimes.shift();
      var sum = 0;
      for (var i = 0; i < frameTimes.length; i++) sum += frameTimes[i];
      fpsNow = Math.round(1000 / (sum / frameTimes.length));
    }
    if (fade > 0) fade = Math.max(0, fade - dt * 2.2);
    update(dt);
    render(t);
  }

  /* ---------- Khung hội thoại ---------- */
  var dlg = document.getElementById('dlg');
  var el = {
    scene: document.getElementById('dlg-scene'), sp: document.getElementById('dlg-sp'),
    jp: document.getElementById('dlg-jp'), vi: document.getElementById('dlg-vi'),
    opts: document.getElementById('dlg-opts'), fb: document.getElementById('dlg-fb'),
    act: document.getElementById('dlg-act')
  };
  function subs(s) { return String(s || '').replace(/\{name\}/g, player.name).replace(/\{call\}/g, player.call); }
  function openDlg() { dlgOpen = true; dlg.classList.add('show'); document.getElementById('btn-interact').classList.remove('show'); }
  function closeDlg() { dlgOpen = false; dlg.classList.remove('show'); if (window.VOICE) window.VOICE.stop(); }
  function nextBtn(label, fn) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'dlg-next'; b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  }
  function setHead(sceneTitle) { el.scene.textContent = sceneTitle || ''; }

  // Cảnh kaiwa (cơ chế của lane truyện)
  function playKaiwa(scene, onDone) {
    openDlg();
    setHead(scene.scene);
    var lines = scene.lines, idx = 0, heroOrd = -1, interact = 0, perfect = 0;
    function finish() {
      el.sp.textContent = '🎬 Hết cảnh';
      el.jp.innerHTML = '';
      el.vi.textContent = interact === 0 ? 'Cảnh diễn xong.' :
        (perfect === interact ? 'Diễn trôi chảy như người Nhật thật! Mẫu câu đã ghi vào danh sách ôn tập.' :
          'Diễn xong — có ' + (interact - perfect) + ' lượt phải gợi ý. Mẫu câu đã ghi vào danh sách ôn tập, về ôn lại nhé.');
      el.opts.innerHTML = ''; el.fb.innerHTML = ''; el.act.innerHTML = '';
      el.act.appendChild(nextBtn('Tiếp ▶', function () {
        if (scene.outro) {
          el.sp.textContent = '📖';
          el.jp.innerHTML = '';
          el.vi.textContent = subs(scene.outro);
          if (window.VOICE) window.VOICE.playOutro(scene);
          el.act.innerHTML = '';
          el.act.appendChild(nextBtn('Đi tiếp ▶', function () { closeDlg(); if (onDone) onDone(); }));
        } else { closeDlg(); if (onDone) onDone(); }
      }));
    }
    function draw() {
      el.fb.innerHTML = ''; el.opts.innerHTML = ''; el.act.innerHTML = '';
      if (idx >= lines.length) { finish(); return; }
      var ln = lines[idx];
      var hero = ln.sp === 'hero';
      if (hero) heroOrd++;
      el.scene.textContent = (scene.scene || '') + ' · Câu ' + (idx + 1) + '/' + lines.length;
      if (!hero) {
        el.sp.textContent = ln.sp;
        el.jp.innerHTML = furiHtml(ln.jp);
        el.vi.textContent = ln.vi || '';
        if (window.VOICE) window.VOICE.onStep(ln);
        el.act.appendChild(nextBtn('Tiếp ▶', function () { idx++; draw(); }));
        return;
      }
      var wrongSpec = scene.wrong && scene.wrong[heroOrd];
      el.sp.textContent = player.name;
      if (wrongSpec && wrongSpec.length) {
        interact++;
        el.jp.innerHTML = '';
        el.vi.textContent = 'Ý cần nói: ' + (ln.vi || '');
        var tried = false;
        var opts = shuffle([{ t: ln.jp, ok: true }].concat(wrongSpec.map(function (w) { return { t: w, ok: false }; })));
        opts.forEach(function (o) {
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'dlg-opt jp';
          if (o.ok) b.setAttribute('data-ok', '1');
          b.innerHTML = furiHtml(o.t);
          b.addEventListener('click', function () {
            if (o.ok) {
              if (!tried) perfect++;
              idx++; draw();
            } else {
              tried = true;
              b.classList.add('bad'); b.disabled = true;
              el.fb.innerHTML = '<div>😅 Đối phương ngơ ngác: 「えっ…？」— câu đó chưa đúng tình huống. Câu đúng đã được tô sáng, chọn lại nhé.</div>';
              el.opts.querySelectorAll('.dlg-opt').forEach(function (x, xi) { if (opts[xi] && opts[xi].ok) x.classList.add('hint'); });
            }
          });
          el.opts.appendChild(b);
        });
        return;
      }
      el.jp.innerHTML = furiHtml(ln.jp);
      el.vi.textContent = ln.vi || '';
      if (window.VOICE) window.VOICE.onStep(ln);
      el.act.appendChild(nextBtn('💬 Nói câu này', function () { idx++; draw(); }));
    }
    draw();
  }

  // Cảnh thoại thường (say)
  function playSay(scene, onDone) {
    openDlg();
    setHead(scene.scene);
    var lines = scene.sayLines, idx = 0;
    function draw() {
      el.opts.innerHTML = ''; el.fb.innerHTML = ''; el.act.innerHTML = '';
      if (idx >= lines.length) { closeDlg(); if (onDone) onDone(); return; }
      var ln = lines[idx];
      el.sp.textContent = ln.sp === 'narr' ? '📖' : ln.sp;
      el.jp.innerHTML = '';
      el.vi.textContent = subs(ln.text);
      if (window.VOICE) window.VOICE.onStep(ln);
      var last = idx === lines.length - 1;
      el.act.appendChild(nextBtn(last ? 'Đi tiếp ▶' : 'Tiếp ▶', function () { idx++; draw(); }));
    }
    draw();
  }

  // Cảnh thoại rẽ nhánh (node 'choice' rút gọn cho bản mẫu): chuỗi bước say, xen các
  // điểm lựa chọn — mỗi lựa chọn áp chỉ số qua GAMEUI và chèn tiếp các câu hệ quả của nó.
  // Dùng cho các cảnh cảm xúc cần người chơi TỰ CHỌN lời đáp (chia tay sân bay §6e…).
  // Định dạng: { scene, branch: [ {sp, text, jp?} | {choice:[{label, fx?, note?, say:[...]}]} ] }
  function playBranch(scene, onDone) {
    openDlg();
    setHead(scene.scene);
    var steps = (scene.branch || []).slice(), idx = 0;
    function draw() {
      el.opts.innerHTML = ''; el.fb.innerHTML = ''; el.act.innerHTML = '';
      if (idx >= steps.length) { closeDlg(); if (onDone) onDone(); return; }
      var st = steps[idx];
      if (st.choice) {
        el.sp.textContent = player.name;
        el.jp.innerHTML = '';
        el.vi.textContent = subs(st.prompt || 'Chọn lời đáp của {name}:');
        if (window.VOICE) window.VOICE.stop();
        st.choice.forEach(function (c) {
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'dlg-opt choice';
          b.textContent = subs(c.label);
          b.addEventListener('click', function () {
            if (c.fx && window.GAMEUI) window.GAMEUI.apply(c.fx, c.note || '');
            // Lựa chọn được ghi vào SỔ của lớp truyện (sổ lời hứa sân bay §6e…) qua FLOW.setFlag
            if (c.flag && window.FLOW && window.FLOW.setFlag) window.FLOW.setFlag(c.flag, c.value !== undefined ? c.value : true);
            var say = (c.say || []).slice();
            steps = steps.slice(0, idx + 1).concat(say).concat(steps.slice(idx + 1));
            idx++; draw();
          });
          el.opts.appendChild(b);
        });
        return;
      }
      el.sp.textContent = st.sp === 'narr' ? '📖' : st.sp;
      el.jp.innerHTML = st.jp ? furiHtml(st.jp) : '';
      el.vi.textContent = subs(st.text || '');
      if (window.VOICE) window.VOICE.onStep(st);
      var last = idx === steps.length - 1;
      el.act.appendChild(nextBtn(last ? 'Đi tiếp ▶' : 'Tiếp ▶', function () { idx++; draw(); }));
    }
    draw();
  }

  function startScene(id) {
    if (dlgOpen) return;
    // Lớp truyện (flow.js) được quyền chặn cảnh để mở giao diện riêng (điện thoại/câu hỏi nghe/quiz)
    if (window.FLOW && window.FLOW.handleScene && window.FLOW.handleScene(id)) return;
    var sc = id && DATA[id];
    var done = function () {
      // Hợp đồng 1.3 (KHUNG-GAME): lớp truyện trả chỉ thị khai báo sẵn {moveTo} sau cảnh.
      var res = (window.FLOW && window.FLOW.onSceneEnd) ? window.FLOW.onSceneEnd(id) : null;
      if (res && res.moveTo && window.MAPDEF[res.moveTo.map]) {
        var d = window.MAPDEF[res.moveTo.map];
        var tx = (res.moveTo.tx != null) ? res.moveTo.tx : (d.spawnDefault || [2, 2])[0];
        var ty = (res.moveTo.ty != null) ? res.moveTo.ty : (d.spawnDefault || [2, 2])[1];
        enterMap(res.moveTo.map, tx, ty, 'down');
      }
    };
    if (sc && sc.lines) playKaiwa(sc, done);
    else if (sc && sc.branch) playBranch(sc, done);
    else if (sc && sc.sayLines) playSay(sc, done);
    // NPC quay mặt về phía người chơi
    if (target && target.kind === 'npc') {
      var n = target.ref;
      n.dir = n.y > player.y ? 'up' : 'down';
    }
  }

  /* ---------- Điều khiển ---------- */
  window.addEventListener('keydown', function (e) {
    // Đang gõ trong ô nhập liệu (ô tên #inp-name và mọi input/textarea/select/
    // contentEditable khác trong game) thì để trình duyệt xử lý phím tự nhiên:
    // KHÔNG preventDefault (gõ được dấu cách), KHÔNG kích hoạt phím tắt game.
    var et = e.target;
    if (et && (et.tagName === 'INPUT' || et.tagName === 'TEXTAREA' || et.tagName === 'SELECT' || et.isContentEditable)) return;
    keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = true;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) >= 0) e.preventDefault();
    if ((e.key === ' ' || e.key === 'Enter' || e.key === 'e') && target && !dlgOpen && started) startScene(target.kind === 'npc' ? target.ref.scene : target.scene);
  });
  window.addEventListener('keyup', function (e) { keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = false; });

  // (Đã BỎ nút điều hướng ảo theo lệnh chủ trang 08:11 JST 31/10/2026 — chỉ còn chạm/ấn-để-đi
  //  theo BFS bên dưới + phím WASD/mũi tên phụ trợ ở trên.)
  document.getElementById('btn-interact').addEventListener('click', function () {
    if (target && !dlgOpen) startScene(target.kind === 'npc' ? target.ref.scene : target.scene);
  });

  cv.addEventListener('pointerdown', function (e) {
    if (!started || dlgOpen) return;
    var rect = cv.getBoundingClientRect();
    var mapW = cur.w * TILE, mapH = cur.h * TILE;
    var vw = viewW(), vh = viewH();
    var camX = mapW <= vw ? (mapW - vw) / 2 : clamp(player.x - vw / 2, 0, mapW - vw);
    var camY = mapH <= vh ? (mapH - vh) / 2 : clamp(player.y - vh / 2, 0, mapH - vh);
    var wx = (e.clientX - rect.left) / zoom + camX, wy = (e.clientY - rect.top) / zoom + camY;
    var tx = Math.floor(wx / TILE), ty = Math.floor(wy / TILE);
    if (tileAt(tx, ty)) { // ô đặc: lùi về ô kề đi được gần người chơi nhất
      var dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (var i = 0; i < dirs.length; i++) {
        var ax = tx + dirs[i][0], ay = ty + dirs[i][1];
        if (!tileAt(ax, ay)) { tx = ax; ty = ay; break; }
      }
    }
    var p = findPath(tx, ty);
    if (p) path = p;
  });

  /* ---------- Kích thước ---------- */
  function resize() {
    view.dpr = Math.min(2, window.devicePixelRatio || 1);
    view.w = window.innerWidth; view.h = window.innerHeight;
    cv.width = Math.round(view.w * view.dpr); cv.height = Math.round(view.h * view.dpr);
    cv.style.width = view.w + 'px'; cv.style.height = view.h + 'px';
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------- Bắt đầu ---------- */
  function detectProfile() {
    var name = '', gender = '';
    try {
      if (window.GAME_USER && window.GAME_USER.name) { name = window.GAME_USER.name; gender = window.GAME_USER.gender || ''; }
      var raw = localStorage.getItem('hn_game_user');
      if (raw) { var j = JSON.parse(raw); if (j && j.name) { name = j.name; gender = j.gender || gender; } }
    } catch (e) {}
    return { name: name, gender: gender };
  }
  function startDemo(name, gender) {
    player.gender = gender === 'F' ? 'F' : 'M';
    player.name = (name || '').trim() || (player.gender === 'F' ? 'Thảo Ly' : 'Minh Quân');
    player.call = player.gender === 'F' ? 'chị' : 'anh';
    player.sprite = player.gender === 'F' ? window.SPRITES.heroF() : window.SPRITES.heroM();
    frameTimes = [];
    started = true;
    document.getElementById('start-overlay').classList.add('hide');
    // Mở đầu BẮT BUỘC của bản 2D (§6e/§12): bắt đầu ở SÂN BAY VIỆT NAM — cảnh chia tay
    // gia đình + người yêu — rồi mới bay sang Nhật vào phòng trọ (mạch cũ giữ nguyên sau đó).
    var sp = (window.MAPDEF['vn-san-bay'] && window.MAPDEF['vn-san-bay'].spawnDefault) || [17, 11];
    enterMap('vn-san-bay', sp[0], sp[1], 'up');
    if (window.FLOW && window.FLOW.onGameStart) window.FLOW.onGameStart(player);
  }
  function gotoMap(id) {
    var d = window.MAPDEF[id];
    if (!d) return false;
    var sp = d.spawnDefault || [2, 2];
    enterMap(id, sp[0], sp[1], 'down');
    return true;
  }
  // (Không còn binding '.mapjump': thanh #mapbar đã gỡ hẳn khỏi bản chơi theo lệnh
  //  chủ trang 13:33 JST 31/10/2026 — querySelectorAll trên danh sách rỗng là an toàn,
  //  và chuyển bản đồ chỉ còn qua cửa trong thế giới + WORLD2D.gotoMap / __demo.enter.)

  var prof = detectProfile();
  if (prof.name) document.getElementById('inp-name').value = prof.name;
  if (prof.gender) {
    document.querySelectorAll('.gender-btn').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-g') === prof.gender);
    });
  }
  var selGender = prof.gender === 'F' ? 'F' : 'M';
  document.querySelectorAll('.gender-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      selGender = b.getAttribute('data-g');
      document.querySelectorAll('.gender-btn').forEach(function (x) { x.classList.toggle('on', x === b); });
    });
    if (b.getAttribute('data-g') === selGender) b.classList.add('on');
  });
  document.getElementById('btn-start').addEventListener('click', function () {
    startDemo(document.getElementById('inp-name').value, selGender);
  });
  window.addEventListener('hn-game-user', function (e) {
    if (started) return;
    var d = e && e.detail;
    if (d && d.name) document.getElementById('inp-name').value = d.name;
  });

  /* ---------- LỚP THẾ GIỚI (tách khỏi lớp truyện — sẵn sàng online nhiều người) ----------
     Thế giới = bản đồ (MAPDEF, dữ liệu thuần) + thực thể có vị trí serializable.
     Lớp truyện chỉ "thuê" thế giới qua điểm kích hoạt; trạng thái truyện không sống ở đây.
     Pha online sau: Worker (hạ tầng phòng nhóm sẵn có) sẽ đổ dữ liệu vào setRemote —
     engine không phải viết lại. Đợt bối cảnh mẫu: chưa có nguồn remote nào. */
  window.WORLD2D = {
    version: 1,
    snapshot: function () {
      return {
        map: cur ? cur.def.id : null,
        player: { name: player.name, gender: player.gender, x: Math.round(player.x), y: Math.round(player.y), dir: player.dir },
        npcs: npcs.map(function (n) { return { id: n.id, x: Math.round(n.x), y: Math.round(n.y), dir: n.dir }; }),
        remotes: Object.keys(remotes).map(function (id) { var r = remotes[id]; return { id: id, map: r.map, x: Math.round(r.x), y: Math.round(r.y), dir: r.dir }; })
      };
    },
    setRemote: function (id, d) {
      if (!d || !window.SPRITES[d.sprite]) return false;
      remotes[id] = {
        map: d.map, name: d.name || 'Người chơi', sprite: window.SPRITES[d.sprite](),
        x: d.x, y: d.y, dir: d.dir || 'down', frame: 0
      };
      return true;
    },
    removeRemote: function (id) { delete remotes[id]; },
    clearRemotes: function () { remotes = {}; },
    // Lớp truyện ra lệnh chuyển bản đồ theo hợp đồng 1.3 ({moveTo}) — dùng cho các cảnh
    // "lên máy bay", "đi xe đưa đón"… mà cửa thường không diễn đạt được.
    gotoMap: function (id, tx, ty) {
      var d = window.MAPDEF[id];
      if (!d) return false;
      var sp = d.spawnDefault || [2, 2];
      enterMap(id, (tx != null ? tx : sp[0]), (ty != null ? ty : sp[1]), 'down');
      return true;
    },
    // Cỡ hình (Lane H): hệ số phóng camera 1.0–1.6, lưu localStorage; guide.js
    // (thanh trượt trong Cài đặt) chỉnh qua đây, engine đọc lại mỗi lần tải trang.
    setZoom: function (z) {
      z = clamp(Math.round((+z || 1.35) * 100) / 100, 1, 1.6);
      zoom = z;
      try { localStorage.setItem(ZOOM_KEY, String(z)); } catch (e) {}
      return zoom;
    },
    getZoom: function () { return zoom; }
  };

  /* ---------- API cho harness kiểm thử ---------- */
  window.__demo = {
    started: function () { return started; },
    enter: function (id) { return gotoMap(id); },
    maps: function () { return Object.keys(window.MAPDEF || {}); },
    start: startDemo,
    scene: function (id) { startScene(id); },
    mapId: function () { return cur ? cur.def.id : null; },
    pos: function () { return { tx: Math.floor(player.x / TILE), ty: Math.floor(player.y / TILE), x: Math.round(player.x), y: Math.round(player.y) }; },
    moveTo: function (tx, ty) { var p = findPath(tx, ty); if (p) { path = p; return true; } return false; },
    target: function () { return target ? target.label : null; },
    interact: function () { if (target && !dlgOpen) { startScene(target.kind === 'npc' ? target.ref.scene : target.scene); return true; } return false; },
    dlgOpen: function () { return dlgOpen; },
    fps: function () { return fpsNow; },
    // Lane H (harness-guide): cỡ hình + NPC trên bản đồ + đích mũi tên chỉ đường
    zoom: function () { return zoom; },
    setZoom: function (z) { return window.WORLD2D.setZoom(z); },
    npcs: function () { return npcs.map(function (n) { return { id: n.id, name: n.name, x: Math.round(n.x), y: Math.round(n.y) }; }); },
    doors: function () { return Object.keys((cur && cur.def.doors) || {}).map(function (k) { var d = cur.def.doors[k]; return { at: k, to: d.to, label: doorText(d.to) }; }); },
    guideTarget: function () { return (window.GUIDE && window.GUIDE.targetFor && cur) ? window.GUIDE.targetFor(cur.def.id) : null; },
    name: function () { return player.name; },
    player: function () { return { name: player.name, gender: player.gender, call: player.call }; },
    // Hệ ngoại hình (style.js): thay sprite nhân vật chính NGAY tại chỗ theo spec tự chỉnh
    setAppearance: function (spec) {
      if (!spec || !window.SPRITES.make) return false;
      player.sprite = window.SPRITES.make(spec);
      player.appearanceSpec = JSON.parse(JSON.stringify(spec));
      return true;
    },
    appearanceSpec: function () { return player.appearanceSpec ? JSON.parse(JSON.stringify(player.appearanceSpec)) : null; }
  };

  // Huy hiệu FPS
  setInterval(function () {
    var f = document.getElementById('hud-fps');
    if (f) f.textContent = started ? (fpsNow + ' FPS') : '';
  }, 500);

  requestAnimationFrame(loop);
})();
