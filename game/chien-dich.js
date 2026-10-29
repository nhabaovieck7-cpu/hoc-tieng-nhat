/* =====================================================================
 * chien-dich.js — NHÁNH 2 · Chiến dịch dài N5→N1 "Hành trình đến Edo"
 * Luồng: chọn trình độ → chọn chủ đề → (độ khó) → bản đồ 10 chặng
 * (mỗi chặng 3 màn + 1 màn trùm) → màn chơi → kết quả (sao 1–3).
 * Câu hỏi: window.GQ.getQuestions (questions.js, từ bài học thật /free/*).
 * Tiến độ: GAME_API nếu có, không thì localStorage 'hn_game_campaign',
 * cấu trúc CONTRACT: {campaign:{'N5-kanji':{stars:{'0-0':3,...},unlocked,best}}}
 * Mọi hook nhánh khác (GAME_USER/GMUSIC/GTREND/GFX/GSFX) đều an toàn khi thiếu.
 * ===================================================================== */
(function () {
  'use strict';

  /* ---------- Tiện ích ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* Hook an toàn sang nhánh khác */
  var HOOK = {
    user: { loggedIn: false, name: '', call: 'bạn', gender: null, level: null },
    trend: function (moment) { try { if (window.GTREND && GTREND.say) GTREND.say(moment); } catch (e) {} },
    music: function (scene) { try { if (window.GMUSIC && GMUSIC.play) GMUSIC.play(scene); } catch (e) {} },
    sfx: function (name) {
      // GSFX (nhánh 4): play('hit'|'wrong'|'win'|'lose'|'click'|...) — ánh xạ tên của nhánh 2.
      var map = { correct: 'hit', victory: 'win' };
      try { if (window.GSFX && GSFX.play) GSFX.play(map[name] || name); } catch (e) {}
    },
    fx: function (fn, arg) { try { if (window.GFX && GFX[fn]) GFX[fn](arg); } catch (e) {} }
  };
  try {
    var gu = window.GAME_USER;
    if (gu && typeof gu.then === 'function') gu.then(function (u) { if (u) { HOOK.user = u; greet(); } });
    else if (gu && typeof gu === 'object') { HOOK.user = gu; }
  } catch (e) {}
  function call() { return HOOK.user.call || 'bạn'; }
  function capCall() { var c = call(); return c.charAt(0).toUpperCase() + c.slice(1); }

  /* ---------- Hằng số chiến dịch ---------- */
  var LVS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var ZONES = ['Làng Tre Xanh', 'Rừng Tre Ma', 'Đồng Hoa Cải', 'Núi Sương Mù', 'Thành Edo'];
  var TYS = [
    ['kanji', '漢', 'Kanji', 'đọc & nghĩa'],
    ['vocab', '語', 'Từ vựng', 'nghĩa của từ'],
    ['grammar', '文', 'Ngữ pháp', 'điền · xếp câu · trợ từ'],
    ['mix', '🎲', 'Trộn', 'tất cả lẫn lộn']
  ];
  var DIFFS = {
    de: { n: 'Dễ', t: 1.4, x: 1 },
    vua: { n: 'Vừa', t: 1, x: 1.25 },
    kho: { n: 'Khó', t: 0.65, x: 1.6 }
  };
  var PLACES = ['Cổng làng', 'Chợ sáng', 'Cầu gỗ', 'Đền nhỏ', 'Suối nước nóng', 'Rừng đèn lồng', 'Đồi trà', 'Bến thuyền', 'Tháp canh', 'Thành trì trùm'];
  var MINI = ['🦊', '🐍', '🦇', '👻', '🐗', '🕷️', '🦂', '🐺', '🗿'];
  var BOSS_FINAL = '👹';
  var NODES_PER_STAGE = 4, STAGES = 10;
  var Q_NORMAL = 6, Q_BOSS = 10;
  var LIFE_MAX = { fifty: 1, swap: 1, time: 2 };

  /* Thời gian/câu theo chặng: 18s (chặng 1) -> 6s (chặng 10) */
  function tsec(stage) { return Math.max(6, Math.round(18 - stage * (12 / (STAGES - 1)))); }

  /* ---------- Trạng thái chọn ---------- */
  var params = new URLSearchParams(location.search);
  var LV = LVS.indexOf(params.get('lv')) >= 0 ? params.get('lv') : (localStorage.getItem('hn_game_lv') || 'N5');
  var TY = TYS.some(function (t) { return t[0] === params.get('t'); }) ? params.get('t') : (localStorage.getItem('hn_game_ty') || 'mix');
  if (LVS.indexOf(LV) < 0) LV = 'N5';
  if (!TYS.some(function (t) { return t[0] === TY; })) TY = 'mix';
  var DIFF = DIFFS[localStorage.getItem('hn_game_diff')] ? localStorage.getItem('hn_game_diff') : 'vua';

  /* ---------- Tiến độ ---------- */
  var LS_KEY = 'hn_game_campaign';
  var prog = { campaign: {}, totals: { score: 0, bossWins: 0 } };
  var progLoaded = false;
  function lsLoad() {
    try { var o = JSON.parse(localStorage.getItem(LS_KEY) || 'null'); if (o && o.campaign) return o; } catch (e) {}
    return { campaign: {}, totals: { score: 0, bossWins: 0 } };
  }
  function lsSave() { try { localStorage.setItem(LS_KEY, JSON.stringify(prog)); } catch (e) {} }
  function loadProg() {
    prog = lsLoad();
    if (window.GAME_API && GAME_API.getProgress) {
      try {
        return Promise.resolve(GAME_API.getProgress()).then(function (p) {
          if (p && p.campaign) {
            // Gộp: lấy bản có nhiều sao hơn cho từng khoá
            Object.keys(p.campaign).forEach(function (k) {
              var a = prog.campaign[k], b = p.campaign[k];
              if (!a) { prog.campaign[k] = b; return; }
              var sa = Object.keys(a.stars || {}).length, sb = Object.keys(b.stars || {}).length;
              if (sb > sa) prog.campaign[k] = b;
            });
            if (p.totals) prog.totals = p.totals;
          }
          progLoaded = true;
        }).catch(function () { progLoaded = true; });
      } catch (e) { progLoaded = true; }
    }
    progLoaded = true;
    return Promise.resolve();
  }
  function saveProg() {
    lsSave();
    if (window.GAME_API && GAME_API.saveProgress) {
      try { Promise.resolve(GAME_API.saveProgress({ campaign: prog.campaign, totals: prog.totals })).catch(function () {}); } catch (e) {}
    }
  }
  function campKey() { return LV + '-' + TY; }
  function camp() {
    var k = campKey();
    if (!prog.campaign[k]) prog.campaign[k] = { stars: {}, unlocked: 0, best: 0 };
    return prog.campaign[k];
  }
  function nodeStars(c, stage, node) { return (c.stars || {})[stage + '-' + node] || 0; }
  function isOpen(c, stage, node) {
    var g = stage * NODES_PER_STAGE + node;
    if (g === 0) return true;
    var ps = Math.floor((g - 1) / NODES_PER_STAGE), pn = (g - 1) % NODES_PER_STAGE;
    return nodeStars(c, ps, pn) > 0;
  }
  function totalStars(lv, ty) {
    var c = (prog.campaign || {})[lv + '-' + ty];
    if (!c) return 0;
    return Object.values(c.stars || {}).reduce(function (a, b) { return a + b; }, 0);
  }

  /* ---------- Điều hướng màn hình ---------- */
  function show(id) {
    ['cdPick', 'cdMap', 'cdPlay', 'cdRes'].forEach(function (x) { $(x).classList.toggle('cd-hid', x !== id); });
    window.scrollTo(0, 0);
  }
  function greet() {
    var el = $('cdGreet');
    if (el) el.textContent = capCall() + (HOOK.user.name ? ' ' + HOOK.user.name : '') +
      ' đang học trình nào thì chọn trình đó nha, lúc nào đổi cũng được 😊';
  }

  /* ---------- Màn chọn ---------- */
  function segPick(el, cb) {
    el.querySelectorAll('button').forEach(function (b) {
      b.onclick = function () {
        el.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); HOOK.sfx('click'); cb(b.dataset.v);
      };
    });
  }
  function pick() {
    show('cdPick'); greet();
    $('cdLvs').innerHTML = LVS.map(function (l, i) {
      return '<button data-v="' + l + '" class="' + (l === LV ? 'on' : '') + '">' + l + '<small>' + esc(ZONES[i]) + '</small>' +
        '<div class="cd-prog"><i style="width:' + (totalStars(l, TY) / (STAGES * NODES_PER_STAGE * 3) * 100) + '%"></i></div></button>';
    }).join('');
    $('cdTys').innerHTML = TYS.map(function (t) {
      return '<button data-v="' + t[0] + '" class="' + (t[0] === TY ? 'on' : '') + '"><i>' + t[1] + '</i>' + t[2] + '<small>' + t[3] + '</small></button>';
    }).join('');
    $('cdDiffs').innerHTML = Object.keys(DIFFS).map(function (k) {
      var d = DIFFS[k];
      return '<button data-v="' + k + '" class="' + (k === DIFF ? 'on' : '') + '">' + d.n +
        '<small>' + (k === 'de' ? 'nhiều giờ hơn' : k === 'kho' ? 'ít giờ · điểm ×' + d.x : 'chuẩn · điểm ×' + d.x) + '</small></button>';
    }).join('');
    segPick($('cdLvs'), function (v) { LV = v; });
    segPick($('cdTys'), function (v) { TY = v; pick(); });
    segPick($('cdDiffs'), function (v) { DIFF = v; localStorage.setItem('hn_game_diff', v); });
    $('cdGoMap').onclick = function () {
      localStorage.setItem('hn_game_lv', LV); localStorage.setItem('hn_game_ty', TY);
      map();
    };
  }

  /* ---------- Bản đồ ---------- */
  function map() {
    show('cdMap'); HOOK.music('map');
    var c = camp(), tot = totalStars(LV, TY), zi = LVS.indexOf(LV);
    $('cdMh').innerHTML =
      '<button class="cd-chip" id="cdChg">⚙️ ' + LV + ' · ' + esc(TYS.find(function (t) { return t[0] === TY; })[2]) + ' (đổi)</button>' +
      '<span class="cd-chip">' + esc(ZONES[zi]) + '</span>' +
      '<span class="cd-chip cd-g">⭐ ' + tot + '/' + (STAGES * NODES_PER_STAGE * 3) + '</span>';
    $('cdChg').onclick = pick;
    var cur = -1;
    $('cdPath').innerHTML = PLACES.map(function (p, s) {
      var open = isOpen(c, s, 0);
      var done = nodeStars(c, s, 3) > 0;
      if (open && !done && cur < 0) cur = s;
      var boss = s === STAGES - 1 ? BOSS_FINAL : MINI[s];
      var nodes = [0, 1, 2, 3].map(function (m) {
        var st = nodeStars(c, s, m), u = isOpen(c, s, m);
        var stars = [1, 2, 3].map(function (i) { return i <= st ? '<b>★</b>' : '★'; }).join('');
        if (m === 3) {
          return '<button class="cd-nd cd-boss ' + (u && !st ? 'cd-open' : '') + '" data-c="' + s + '" data-m="' + m + '"' + (u ? '' : ' disabled') + '>' +
            boss + '<small>' + (s === STAGES - 1 ? 'Trùm vùng' : 'Trùm chặng') + '</small><span class="cd-st">' + stars + '</span></button>';
        }
        return '<button class="cd-nd ' + (u && !st ? 'cd-open' : '') + '" data-c="' + s + '" data-m="' + m + '"' + (u ? '' : ' disabled') + '>' +
          'Màn ' + (m + 1) + '<span class="cd-st">' + stars + '</span></button>';
      }).join('');
      return '<div class="cd-stg ' + (open ? '' : 'cd-lock') + ' ' + (cur === s ? 'cd-cur' : '') + '">' +
        '<h4>Chặng ' + (s + 1) + ' · ' + esc(p) + '<small>' + (open ? (done ? '✅ đã qua' : '⏱ ' + tsec(s) + 's/câu') : '🔒') + '</small></h4>' +
        '<div class="cd-nodes">' + nodes + '</div></div>';
    }).join('');
    $('cdPath').querySelectorAll('.cd-nd').forEach(function (b) {
      b.onclick = function () { HOOK.sfx('click'); start(parseInt(b.dataset.c, 10), parseInt(b.dataset.m, 10)); };
    });
    setTimeout(function () {
      try {
        var e = $('cdPath').querySelector('.cd-cur');
        if (e && e.scrollIntoView) e.scrollIntoView({ block: 'center', behavior: 'smooth' });
      } catch (err) {}
    }, 200);
  }

  /* ---------- Chơi ---------- */
  var G = null, tmr = null, deadline = 0, qDuration = 0, qStartAt = 0;

  function start(stage, node) {
    var boss = node === 3;
    G = {
      stage: stage, node: node, boss: boss,
      n: boss ? Q_BOSS : Q_NORMAL, i: 0, ok: 0, bad: 0,
      hp: 100, life: 3, streak: 0, score: 0,
      remainSum: 0, qs: [], startedAt: Date.now(), attempt: 0,
      help: { fifty: LIFE_MAX.fifty, swap: LIFE_MAX.swap, time: LIFE_MAX.time },
      locked: false
    };
    show('cdPlay');
    $('cdPt').textContent = LV + ' · Chặng ' + (stage + 1) + (boss ? ' · TRÙM' : ' · Màn ' + (node + 1));
    $('cdBossBox').classList.toggle('cd-hid', !boss);
    if (boss) {
      $('cdBossName').textContent = (stage === STAGES - 1 ? BOSS_FINAL + ' Trùm ' : MINI[stage] + ' Trùm ') + PLACES[stage];
      $('cdFig2').textContent = stage === STAGES - 1 ? BOSS_FINAL : MINI[stage];
      $('cdBhp').style.width = '100%';
    }
    HOOK.music(boss ? 'boss' : 'normal');
    HOOK.trend('vao');
    updateHud();
    loadQuestions();
  }

  function loadQuestions() {
    var box = $('cdQbox');
    box.innerHTML = '<div class="cd-load"><span class="cd-spin">🌀</span>Đang lấy câu hỏi từ bài học ' + LV + '…</div>';
    setLifelinesEnabled(false);
    var seed = (Date.now() % 100000) + G.stage * 131 + G.node * 17 + (++G.attempt) * 997;
    var myG = G;
    window.GQ.getQuestions({ level: LV, topic: TY, count: G.n, seed: seed }).then(function (qs) {
      if (G !== myG) return; // người chơi đã bỏ màn trong lúc tải
      if (!qs || !qs.length) throw new Error('empty');
      G.qs = qs; G.n = qs.length; G.i = 0;
      next();
    }).catch(function (err) {
      if (G !== myG) return;
      box.innerHTML = '<div class="cd-err"><div class="cd-bigemoji">📡</div>' +
        '<p>' + esc((err && err.message) || 'Không tải được câu hỏi. Thử lại sau nhé!') + '</p>' +
        '<button class="cd-btn cd-blk" id="cdRetry">🔄 Thử tải lại</button><br><br>' +
        '<button class="cd-btn cd-alt cd-blk" id="cdBackMap">🗺️ Về bản đồ</button></div>';
      $('cdRetry').onclick = loadQuestions;
      $('cdBackMap').onclick = map;
    });
  }

  function updateHud() {
    $('cdScore').textContent = G.score;
    $('cdCombo').textContent = 'Combo ×' + G.streak;
    $('cdLives').textContent = G.life;
    if (G.boss) {
      $('cdHearts').textContent = '❤️'.repeat(Math.max(0, G.life)) + '🖤'.repeat(Math.max(0, 3 - G.life));
      $('cdBhp').style.width = Math.max(0, G.hp) + '%';
    }
    $('cdPr').textContent = 'Câu ' + Math.min(G.i + 1, G.n) + '/' + G.n;
    $('cdL5050N').textContent = 'còn ' + G.help.fifty;
    $('cdLSwapN').textContent = 'còn ' + G.help.swap;
    $('cdLTimeN').textContent = 'còn ' + G.help.time;
  }
  function setLifelinesEnabled(on) {
    $('cdL5050').disabled = !on || !G || G.help.fifty <= 0 || !G.q || G.q.type === 'order';
    $('cdLSwap').disabled = !on || !G || G.help.swap <= 0;
    $('cdLTime').disabled = !on || !G || G.help.time <= 0;
  }

  var TYPE_LABEL = {
    kanji: '🈶 Kanji', vocab: '📘 Từ vựng', part: '🧩 Ngữ pháp · chọn trợ từ',
    fill: '✍️ Ngữ pháp · điền chỗ trống', order: '🔀 Ngữ pháp · sắp xếp câu'
  };

  function next() {
    clearInterval(tmr);
    if (!G || G.i >= G.n || G.life <= 0 || (G.boss && G.hp <= 0)) return end();
    var q = G.q = G.qs[G.i];
    G.locked = false;
    G.placed = [];
    var h = '<span class="cd-qtype">' + TYPE_LABEL[q.type] + '</span>';
    if (q.type === 'order') {
      h += '<p class="cd-vi" style="margin-top:14px">' + esc(q.promptSub || '') + '</p>' +
        '<div class="cd-ans" id="cdAns"></div>' +
        '<div class="cd-pool" id="cdPool">' + q.tokens.map(function (t, i) {
          return '<button class="cd-tile" data-i="' + i + '">' + esc(t) + '</button>';
        }).join('') + '</div>' +
        '<p class="cd-mean" id="cdMean"></p>';
    } else if (q.type === 'part' || q.type === 'fill') {
      var blank = q.type === 'part' ? '（　）' : '＿＿';
      h += '<div class="cd-sent">' + esc(q.prompt).split(blank).join('<span class="cd-bl" id="cdBlank">？</span>') + '</div>' +
        '<div class="cd-opts" id="cdOp"></div><p class="cd-mean" id="cdMean"></p>';
    } else {
      h += '<div class="cd-q">' + esc(q.prompt) + '</div>' +
        (q.promptSub ? '<p class="cd-qsub">' + esc(q.promptSub) + '</p>' : '') +
        '<div class="cd-opts" id="cdOp"></div><p class="cd-mean" id="cdMean"></p>';
    }
    $('cdQbox').innerHTML = h;
    if (q.type === 'order') bindOrder(q);
    else bindChoices(q);
    startTimer(q);
    updateHud();
    setLifelinesEnabled(true);
  }

  function startTimer(q) {
    var base = tsec(G.stage) * (G.boss ? 0.8 : 1) * (q.type === 'order' ? 1.8 : 1) * DIFFS[DIFF].t;
    qDuration = Math.max(4, base) * 1000;
    qStartAt = Date.now();
    deadline = qStartAt + qDuration;
    $('cdTm').style.width = '100%';
    $('cdTm').parentElement.classList.remove('cd-low');
    clearInterval(tmr);
    tmr = setInterval(function () {
      var r = (deadline - Date.now()) / qDuration;
      $('cdTm').style.width = clamp(r * 100, 0, 100) + '%';
      $('cdTm').parentElement.classList.toggle('cd-low', r < 0.25);
      if (r <= 0) { clearInterval(tmr); onTimeout(); }
    }, 100);
  }
  function remainRatio() { return clamp((deadline - Date.now()) / qDuration, 0, 1); }

  function bindChoices(q) {
    var op = $('cdOp');
    op.innerHTML = q.choices.map(function (c, i) {
      return '<button class="cd-opt" data-i="' + i + '">' + esc(c) + '</button>';
    }).join('');
    op.querySelectorAll('.cd-opt').forEach(function (b) {
      b.onclick = function () {
        if (G.locked) return;
        var ok = parseInt(b.dataset.i, 10) === q.answer;
        op.querySelectorAll('.cd-opt').forEach(function (x) {
          x.disabled = true;
          if (parseInt(x.dataset.i, 10) === q.answer) x.classList.add('cd-ok');
        });
        if (!ok) b.classList.add('cd-bad');
        var blank = $('cdBlank');
        if (blank) blank.textContent = q.answerText;
        showMeaning(q);
        answer(ok);
      };
    });
  }
  function bindOrder(q) {
    var pool = $('cdPool'), ans = $('cdAns');
    pool.querySelectorAll('.cd-tile').forEach(function (b) {
      b.onclick = function () {
        if (G.locked || b.classList.contains('cd-used')) return;
        HOOK.sfx('click');
        b.classList.add('cd-used');
        var idx = parseInt(b.dataset.i, 10);
        G.placed.push(idx);
        var t = document.createElement('button');
        t.className = 'cd-tile'; t.textContent = q.tokens[idx]; t.dataset.i = idx;
        t.onclick = function () {
          if (G.locked) return;
          HOOK.sfx('click');
          G.placed.splice(G.placed.indexOf(idx), 1);
          t.remove(); b.classList.remove('cd-used');
        };
        ans.appendChild(t);
        if (G.placed.length === q.tokens.length) {
          var ok = G.placed.every(function (v, i) { return q.tokens[v] === correctTokens(q)[i]; });
          ans.classList.add(ok ? 'cd-ok' : 'cd-bad');
          if (!ok) {
            var mean = $('cdMean');
            if (mean) mean.textContent = 'Câu đúng: ' + q.answerText;
          }
          answer(ok);
        }
      };
    });
  }
  // Thứ tự đúng của các mảnh: suy từ answerText (mảnh là các đoạn liên tiếp của câu)
  function correctTokens(q) {
    if (q._sorted) return q._sorted;
    var rest = q.answerText.replace(/。$/, ''), out = [], used = q.tokens.slice();
    // Ghép tham lam: tại mỗi vị trí, chọn mảnh chưa dùng là tiền tố của phần còn lại (dài nhất trước)
    while (rest.length) {
      var best = null;
      used.forEach(function (t) { if (rest.indexOf(t) === 0 && (!best || t.length > best.length)) best = t; });
      if (best == null) { out = q.tokens.slice(); break; }
      out.push(best); used.splice(used.indexOf(best), 1); rest = rest.slice(best.length);
    }
    q._sorted = out.length === q.tokens.length ? out : q.tokens.slice();
    return q._sorted;
  }
  function showMeaning(q) {
    var mean = $('cdMean');
    if (mean && q.meaning && q.type !== 'order') mean.textContent = '💡 ' + q.meaning;
  }

  function onTimeout() {
    if (!G || G.locked) return;
    var q = G.q;
    var op = $('cdOp');
    if (op) op.querySelectorAll('.cd-opt').forEach(function (x) {
      x.disabled = true;
      if (parseInt(x.dataset.i, 10) === q.answer) x.classList.add('cd-ok');
    });
    var blank = $('cdBlank');
    if (blank) blank.textContent = q.answerText;
    if (q.type === 'order') { var mean = $('cdMean'); if (mean) mean.textContent = 'Câu đúng: ' + q.answerText; }
    showMeaning(q);
    HOOK.trend('hetgio');
    answer(false);
  }

  function answer(ok) {
    if (G.locked) return;
    G.locked = true;
    clearInterval(tmr);
    setLifelinesEnabled(false);
    var ratio = remainRatio();
    G.remainSum += ratio;
    if (ok) {
      G.ok++; G.streak++;
      var gained = Math.round((100 + Math.round(ratio * 50) + G.streak * 10) * DIFFS[DIFF].x);
      G.score += gained;
      HOOK.sfx('correct');
      HOOK.fx('burst');
      if (G.streak >= 5) { HOOK.fx('ultra'); HOOK.trend('combo'); }
      else if (ratio > 0.65) { HOOK.fx('perfect'); HOOK.trend('nhanh'); }
      else if (G.streak === 3) { HOOK.fx('comboPop', 3); HOOK.trend('combo'); }
      else HOOK.trend('dung');
      if (G.boss) {
        G.hp = Math.max(0, G.hp - (G.streak >= 3 ? 18 : 12));
        HOOK.fx('shake');
      }
    } else {
      G.bad++; G.streak = 0;
      HOOK.sfx('wrong');
      HOOK.fx('shake');
      HOOK.trend('sai');
      if (G.boss) G.life--;
    }
    G.i++;
    updateHud();
    setTimeout(next, ok ? 900 : 1600);
  }

  /* ---------- Trợ giúp ---------- */
  $('cdL5050').onclick = function () {
    if (!G || G.locked || G.help.fifty <= 0 || !G.q || G.q.type === 'order') return;
    G.help.fifty--; HOOK.trend('trogiup'); HOOK.sfx('click');
    var q = G.q, wrong = [];
    q.choices.forEach(function (c, i) { if (i !== q.answer) wrong.push(i); });
    // Ẩn 2 đáp án sai (giữ lại tối đa 1 sai + đáp án đúng)
    wrong.slice(0, Math.max(0, q.choices.length - 2)).forEach(function (i) {
      var b = $('cdOp').querySelector('[data-i="' + i + '"]');
      if (b) b.classList.add('cd-gone');
    });
    updateHud(); setLifelinesEnabled(true);
  };
  $('cdLSwap').onclick = function () {
    if (!G || G.locked || G.help.swap <= 0) return;
    G.help.swap--; HOOK.trend('doicau');
    clearInterval(tmr);
    setLifelinesEnabled(false);
    var myG = G;
    var seed = (Date.now() % 100000) + G.stage * 733 + G.i * 31;
    window.GQ.getQuestions({ level: LV, topic: TY, count: 1, seed: seed }).then(function (qs) {
      if (G !== myG) return;
      if (qs && qs.length) {
        var dup = G.qs.some(function (x) { return x.prompt === qs[0].prompt && x.answerText === qs[0].answerText; });
        if (!dup) G.qs[G.i] = qs[0];
      }
      next();
    }).catch(function () { if (G === myG) next(); });
    updateHud();
  };
  $('cdLTime').onclick = function () {
    if (!G || G.locked || G.help.time <= 0) return;
    G.help.time--; HOOK.trend('trogiup'); HOOK.sfx('click');
    deadline += qDuration * 0.5; // +50% thời lượng câu hiện tại
    updateHud(); setLifelinesEnabled(true);
  };
  $('cdQuit').onclick = function () { clearInterval(tmr); G = null; map(); };

  /* ---------- Kết thúc màn ---------- */
  function end() {
    clearInterval(tmr);
    var boss = G.boss;
    var pass = boss ? (G.hp <= 0 && G.life > 0) : (G.ok >= Math.ceil(G.n * 0.6) && G.life > 0);
    var stars = 0;
    if (pass) {
      var avgRemain = G.n ? G.remainSum / G.n : 0;
      if (G.bad === 0) stars = 3;
      else if (G.bad <= 1) stars = avgRemain >= 0.4 ? 3 : 2;
      else if (G.bad <= 2) stars = 2;
      else stars = 1;
    }
    var c = camp(), key = G.stage + '-' + G.node;
    var prevStars = c.stars[key] || 0;
    if (stars > prevStars) c.stars[key] = stars;
    if (pass) {
      var g = G.stage * NODES_PER_STAGE + G.node;
      c.unlocked = Math.max(c.unlocked || 0, g + 1);
      if (boss && !prevStars) prog.totals.bossWins = (prog.totals.bossWins || 0) + 1;
    }
    if (G.score > (c.best || 0)) c.best = G.score; // best = điểm cao nhất của 1 màn trong trình độ+chủ đề này
    prog.totals.score = (prog.totals.score || 0) + (pass ? G.score : 0);
    saveProg();
    if (window.GAME_API && GAME_API.submitScore) {
      try {
        Promise.resolve(GAME_API.submitScore({
          mode: 'campaign', level: LV, score: G.score,
          durationMs: Date.now() - G.startedAt
        })).catch(function () {});
      } catch (e) {}
    }
    show('cdRes');
    HOOK.sfx(pass ? 'victory' : 'lose');
    HOOK.music('map');
    var nx = null;
    if (pass) {
      if (G.node < 3) nx = [G.stage, G.node + 1];
      else if (G.stage < STAGES - 1) nx = [G.stage + 1, 0];
    }
    $('cdRb').innerHTML =
      '<div class="cd-bigemoji">' + (pass ? (boss ? '🏆' : '🎉') : '💪') + '</div>' +
      '<h2>' + (pass ? (boss ? 'Hạ trùm chặng ' + (G.stage + 1) + '!' : 'Qua màn!') : 'Chưa qua, thử lại nha ' + call()) + '</h2>' +
      '<div class="cd-stars">' + [1, 2, 3].map(function (i) { return '<span class="' + (i <= stars ? '' : 'cd-off') + '">⭐</span>'; }).join('') + '</div>' +
      '<p class="cd-sub">Đúng ' + G.ok + ' · sai ' + G.bad + ' · điểm màn: <b>' + G.score + '</b>' +
      (pass ? (boss && nx ? ' · Chặng ' + (nx[0] + 1) + ' đã mở 🔓' : '') : ' · cần đúng ≥60%' + (boss ? ' và hạ hết máu trùm' : '')) + '</p>' +
      (pass && nx ? '<button class="cd-btn cd-blk" id="cdNx">' + (G.node === 3 ? 'Sang chặng mới ➜' : 'Màn tiếp ➜') + '</button><br><br>' : '') +
      (!pass ? '<button class="cd-btn cd-blk" id="cdRt">Chơi lại</button><br><br>' : '') +
      '<button class="cd-btn cd-alt cd-blk" id="cdMp">🗺️ Về bản đồ</button>';
    if (pass) { HOOK.fx('confetti'); HOOK.trend(boss ? 'thang' : 'dung'); }
    else HOOK.trend('thua');
    var endStage = G.stage, endNode = G.node;
    var nxB = $('cdNx'), rtB = $('cdRt');
    if (nxB) nxB.onclick = function () { start(nx[0], nx[1]); };
    if (rtB) rtB.onclick = function () { start(endStage, endNode); };
    $('cdMp').onclick = map;
    G = null;
  }

  /* ---------- Khởi động ---------- */
  try { if (window.GMUSIC && GMUSIC.mountToggles) GMUSIC.mountToggles($('sndToggles')); } catch (e) {}
  loadProg().then(function () {
    var mode = params.get('s');
    if (mode === 'map') map();
    else pick();
  });
})();
