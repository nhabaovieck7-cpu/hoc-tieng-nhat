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
  function drawNamePlate(g, x, y, text) {
    g.font = '600 10px sans-serif';
    var w = g.measureText(text).width + 12;
    g.fillStyle = 'rgba(20,20,30,.72)';
    g.beginPath(); g.roundRect(x - w / 2, y - 62, w, 14, 7); g.fill();
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, x, y - 54.5);
  }
  function render(now) {
    ctx.fillStyle = '#20242a';
    ctx.fillRect(0, 0, view.w, view.h);
    if (!cur) return;
    var mapW = cur.w * TILE, mapH = cur.h * TILE;
    var camX = mapW <= view.w ? (mapW - view.w) / 2 : clamp(player.x - view.w / 2, 0, mapW - view.w);
    var camY = mapH <= view.h ? (mapH - view.h) / 2 : clamp(player.y - view.h / 2, 0, mapH - view.h);
    // Chỉ blit vùng bản đồ đang nhìn thấy (tối ưu FPS)
    var srcX = Math.max(0, camX), srcY = Math.max(0, camY + 40);
    var dstX = srcX - camX, dstY = srcY - (camY + 40);
    var srcW = Math.min(cur.canvas.width - srcX, view.w - dstX);
    var srcH = Math.min(cur.canvas.height - srcY, view.h - dstY);
    if (srcW > 0 && srcH > 0) ctx.drawImage(cur.canvas, srcX, srcY, srcW, srcH, dstX, dstY, srcW, srcH);

    // Đánh dấu cửa (nhấp nháy nhẹ)
    Object.keys(cur.def.doors).forEach(function (k) {
      var p = k.split(','), dx = +p[0] * TILE + 16 - camX, dy = +p[1] * TILE - camY;
      var bob = Math.sin(now / 300) * 2.4;
      ctx.fillStyle = 'rgba(255,205,64,.92)';
      ctx.beginPath();
      ctx.moveTo(dx - 6, dy + 8 + bob); ctx.lineTo(dx + 6, dy + 8 + bob); ctx.lineTo(dx, dy + 15 + bob);
      ctx.closePath(); ctx.fill();
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
        if (target && target.kind === 'npc' && target.ref === e.n) drawNamePlate(ctx, e.n.x - camX, e.n.y - camY, e.n.name);
      }
    });

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
  function closeDlg() { dlgOpen = false; dlg.classList.remove('show'); }
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
    var camX = mapW <= view.w ? (mapW - view.w) / 2 : clamp(player.x - view.w / 2, 0, mapW - view.w);
    var camY = mapH <= view.h ? (mapH - view.h) / 2 : clamp(player.y - view.h / 2, 0, mapH - view.h);
    var wx = e.clientX - rect.left + camX, wy = e.clientY - rect.top + camY;
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
    }
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
