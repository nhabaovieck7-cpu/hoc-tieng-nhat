/* dau-kanji.js — Nhánh 3: Đấu trùm (đối đầu trùm theo vùng).
   Câu hỏi CHỈ qua window.GQ (hook an toàn); hiệu ứng qua GFX, âm skill qua GSFX
   (chỉ âm thanh, không hô tên skill), câu trend qua GTREND, nhạc nền GMUSIC 'boss',
   điểm nộp qua GAME_API.submitScore. Không nhúng nội dung khóa học. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var DIFF = { de: { n: 'Dễ', s: 20, x: 1 }, tb: { n: 'Trung bình', s: 12, x: 1 }, kho: { n: 'Khó', s: 6, x: 2 } };
  /* 5 trùm theo 5 vùng của cốt truyện (như bản mẫu/hub) */
  var BOSSES = [
    { lv: 'N5', zone: 'Làng Sakura', boss: 'Oni Đỏ', be: '👹', c: '#ff7eb6', hp: 90 },
    { lv: 'N4', zone: 'Rừng Tre Ma', boss: 'Kappa Láu Cá', be: '🐸', c: '#2fbf71', hp: 100 },
    { lv: 'N3', zone: 'Lâu đài Mây', boss: 'Tengu Mũi Dài', be: '👺', c: '#22d3ee', hp: 110 },
    { lv: 'N2', zone: 'Núi Lửa Fuji', boss: 'Rồng Lửa Ryūjin', be: '🐉', c: '#ff7a45', hp: 120 },
    { lv: 'N1', zone: 'Kinh thành Edo', boss: 'Shogun Bóng Tối', be: '🥷', c: '#7c5cff', hp: 130 }
  ];
  var SKILLS = ['beam', 'thunder', 'shuriken', 'gun', 'fire'];

  /* ---------- Hook an toàn tới các nhánh khác ---------- */
  var user = { loggedIn: false, name: 'Khách', call: 'bạn', gender: null, level: null };
  function loadUser() {
    if (typeof window.GAME_USER === 'undefined') return Promise.resolve(user);
    return Promise.resolve(window.GAME_USER).then(function (u) { if (u) for (var k in u) user[k] = u[k]; return user; }).catch(function () { return user; });
  }
  function callName() {
    if (!user.loggedIn) return 'bạn';
    if (user.call && user.name && user.call !== user.name) return user.call + ' ' + user.name;
    return user.name || user.call || 'bạn';
  }
  function trend(m) { try { if (window.GTREND && typeof GTREND.say === 'function') GTREND.say(m); } catch (e) {} }
  function music(scene) { try { if (window.GMUSIC && typeof GMUSIC.play === 'function') GMUSIC.play(scene); } catch (e) {} }
  function sfx(n) { try {
    if (typeof window.GSFX === 'function') GSFX(n);
    else if (window.GSFX && typeof GSFX.play === 'function') GSFX.play(n);
    else if (typeof window.sfx === 'function') window.sfx(n);
  } catch (e) {} }
  function fx(name, arg) { try { if (window.GFX && typeof GFX[name] === 'function') GFX[name](arg); } catch (e) {} }
  function submitScore(score, t0) { try {
    if (window.GAME_API && typeof GAME_API.submitScore === 'function') {
      var r = GAME_API.submitScore({ mode: 'dau-kanji', level: st.lv, score: Math.round(score), durationMs: Date.now() - t0 });
      if (r && r.catch) r.catch(function () {});
    }
  } catch (e) {} }
  function fetchQ(count) {
    if (!(window.GQ && typeof GQ.getQuestions === 'function')) return Promise.reject(new Error('gq-missing'));
    return GQ.getQuestions({ level: st.lv, topic: 'kanji', count: count });
  }
  function usable(qs) { return (qs || []).filter(function (q) { return q && ((q.choices && q.choices.length >= 2) || (q.tokens && q.tokens.length >= 2)); }); }
  function correctIdx(q) { if (typeof q.answer === 'number') return q.answer; if (q.choices) { var i = q.choices.indexOf(q.answerText); if (i >= 0) return i; } return -1; }
  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }

  /* ---------- Trạng thái ---------- */
  var st = { boss: 3, diff: 'tb' };
  Object.defineProperty(st, 'lv', { get: function () { return BOSSES[st.boss].lv; } });
  var hpP = 100, hpB = 100, hpBMax = 100, round = 0, okCount = 0, streak = 0, best = 0, score = 0,
      lock = false, pool = [], qi = 0, cur = null, t0 = 0, startT = 0, timer = null, limMs = 0;

  /* ---------- Menu ---------- */
  function segHTML(items, cur, attr) {
    return '<div class="mx-seg" data-seg="' + attr + '">' + items.map(function (it) {
      return '<button type="button" data-v="' + esc(it.v) + '" class="' + (it.v === cur ? 'on' : '') + '">' + esc(it.n) + (it.sub ? '<small>' + esc(it.sub) + '</small>' : '') + '</button>';
    }).join('') + '</div>';
  }
  function bindSeg(root, attr, cb) {
    $$('[data-seg="' + attr + '"] button', root).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-seg="' + attr + '"] button', root).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); cb(b.getAttribute('data-v'));
      });
    });
  }
  function buildMenu() {
    var m = $('#menu');
    var bossCards = BOSSES.map(function (b, i) {
      return '<button type="button" class="bk-boss' + (i === st.boss ? ' on' : '') + '" data-boss="' + i + '" style="--bkc:' + b.c + '">' +
        '<span class="bk-be">' + b.be + '</span><b>' + esc(b.boss) + '</b><small>' + esc(b.lv) + ' · ' + esc(b.zone) + '</small></button>';
    }).join('');
    m.innerHTML =
      '<div class="mx-card"><div class="mx-big-emoji">⚔️</div>' +
      '<h1>Đấu trùm</h1>' +
      '<p class="mx-mut">Chào ' + esc(callName()) + '! Chọn một trùm để đối đầu. Trả lời đúng và nhanh để tung đòn; combo 5 trở lên sẽ mở tuyệt chiêu ULTRA. Sai hoặc hết giờ thì trùm phản đòn đấy.</p>' +
      '<h2>Chọn trùm (theo vùng)</h2><div class="bk-bosses">' + bossCards + '</div>' +
      '<h2>Độ khó</h2>' + segHTML(Object.keys(DIFF).map(function (k) { return { v: k, n: DIFF[k].n, sub: DIFF[k].s + 's/câu' + (DIFF[k].x > 1 ? ' · x2 điểm' : '') }; }), st.diff, 'diff') +
      '<div style="height:14px"></div><button class="mx-btn" id="btnGo" type="button">Vào trận ▶</button>' +
      '<p class="mx-mut" style="text-align:center;margin-top:10px">Câu hỏi kanji lấy từ bài học thật của trang, hiện ngay khi chơi.</p></div>';
    $$('.bk-boss', m).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.bk-boss', m).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); st.boss = +b.getAttribute('data-boss'); sfx('click');
      });
    });
    bindSeg(m, 'diff', function (v) { st.diff = v; });
    $('#btnGo').addEventListener('click', start);
  }

  /* ---------- Chơi ---------- */
  function setHp() {
    $('#hpP').style.width = Math.max(0, hpP) + '%';
    $('#hpB').style.width = Math.max(0, hpB / hpBMax * 100) + '%';
    $('#hpBoxP').classList.toggle('low', hpP <= 30);
    $('#hpBoxB').classList.toggle('low', hpB / hpBMax <= 0.3);
    $('#scorePill').textContent = '⭐ ' + score;
    $('#comboBox').textContent = streak >= 2 ? '🔥 Combo x' + streak + (streak >= 5 ? ' — ULTRA sẵn sàng!' : '') : '';
  }
  function dmgPop(el, txt) {
    var ar = $('#arena'), d = document.createElement('div');
    d.className = 'bk-dmg'; d.textContent = txt;
    d.style.left = (el.offsetLeft + 10) + 'px'; d.style.top = '16px';
    ar.appendChild(d); setTimeout(function () { d.remove(); }, 1000);
  }
  function startTimer(sec, onTimeout) {
    stopTimer(); limMs = sec * 1000; t0 = Date.now();
    timer = setInterval(function () {
      var left = limMs - (Date.now() - t0);
      $('#tBar').style.width = Math.max(0, left / limMs * 100) + '%';
      $('#tTxt').textContent = (Math.max(0, left) / 1000).toFixed(1) + 's';
      if (left <= 0) { stopTimer(); onTimeout(); }
    }, 50);
  }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; }
  function speedFrac() { return Math.max(0, Math.min(1, (limMs - (Date.now() - t0)) / limMs)); }

  function showError(msg) {
    stopTimer();
    $('#play').classList.add('mx-hid');
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-err"><div class="mx-big-emoji">🌧️</div><h1>Chưa lấy được câu hỏi</h1>' +
      '<p class="mx-mut">' + esc(msg) + '</p><div style="height:12px"></div>' +
      '<button class="mx-btn" id="btnRetry" type="button">Thử lại</button>' +
      '<div style="height:8px"></div><a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnRetry').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); });
  }

  function start() {
    var B = BOSSES[st.boss];
    hpP = 100; hpBMax = B.hp; hpB = B.hp; round = 0; okCount = 0; streak = 0; best = 0; score = 0; qi = 0; pool = [];
    startT = Date.now();
    $('#menu').classList.add('mx-hid'); $('#result').classList.add('mx-hid');
    document.documentElement.style.setProperty('--bkc', B.c);
    $('#arena').style.setProperty('--bkc', B.c);
    $('#pName').textContent = '🧑 ' + (user.name || 'Người chơi');
    $('#bName').textContent = B.be + ' ' + B.boss;
    $('#figB').textContent = B.be;
    $('#play').classList.remove('mx-hid');
    setHp();
    music('boss'); trend('vao');
    loadMore(14).then(function () { next(); }).catch(function () {
      showError('Có vẻ đang mất mạng hoặc chưa có dữ liệu bài học cho cấp ' + st.lv + '. ' + callName() + ' thử lại sau ít phút nhé.');
    });
  }
  function loadMore(n) {
    return fetchQ(n).then(function (qs) {
      var u = usable(qs);
      if (!u.length && !pool.length) throw new Error('empty');
      pool = pool.concat(u); return pool;
    });
  }
  function takeQ() {
    if (qi >= pool.length) return loadMore(10).then(function () { return qi < pool.length ? pool[qi++] : null; }).catch(function () { return null; });
    return Promise.resolve(pool[qi++]);
  }

  function next() {
    if (hpP <= 0 || hpB <= 0) return end();
    takeQ().then(function (q) {
      if (!q) return end();
      cur = q; lock = false; round++;
      $('#roundInfo').textContent = 'Hiệp ' + round + ' · Đúng & nhanh = đòn mạnh';
      var qb = $('#qBox');
      qb.textContent = q.prompt || '';
      qb.classList.toggle('long', (q.prompt || '').length > 14);
      $('#qSub').textContent = q.promptSub || (q.meaning && q.type !== 'kanji' ? '' : '');
      $('#optBox').innerHTML = ''; $('#ordBox').innerHTML = '';
      if (q.tokens && q.tokens.length >= 2 && !q.choices) renderOrder(q); else renderChoices(q);
      startTimer(DIFF[st.diff].s, function () { if (!lock) { lock = true; onWrong(true); } });
    });
  }
  function renderChoices(q) {
    var box = $('#optBox'), ci = correctIdx(q);
    q.choices.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-opt'; b.textContent = c;
      b.addEventListener('click', function () { answer(i === ci, b); });
      box.appendChild(b);
    });
  }
  function revealChoices() {
    var ci = correctIdx(cur);
    $$('#optBox .mx-opt').forEach(function (b, i) { b.disabled = true; if (i === ci) b.classList.add('ok'); });
  }
  function renderOrder(q) {
    var box = $('#ordBox'), picked = [];
    var slots = document.createElement('div'); slots.className = 'mx-ord-slots';
    var poolEl = document.createElement('div'); poolEl.className = 'mx-ord-pool';
    shuffle(q.tokens).forEach(function (tk) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mx-token'; b.textContent = tk;
      b.addEventListener('click', function () {
        if (lock) return;
        if (b.classList.contains('used')) return;
        b.classList.add('used'); picked.push({ t: tk, b: b });
        var s = document.createElement('button');
        s.type = 'button'; s.className = 'mx-token'; s.textContent = tk;
        s.addEventListener('click', function () {
          if (lock) return;
          var ix = picked.findIndex(function (p) { return p.b === b; });
          if (ix >= 0) picked.splice(ix, 1);
          b.classList.remove('used'); s.remove();
        });
        slots.appendChild(s);
      });
      poolEl.appendChild(b);
    });
    var chk = document.createElement('button');
    chk.type = 'button'; chk.className = 'mx-btn'; chk.textContent = '⚔️ Ra đòn';
    chk.style.marginTop = '10px';
    chk.addEventListener('click', function () {
      var got = picked.map(function (p) { return p.t; }).join('');
      answer(norm(got) === norm(q.answerText), chk);
    });
    box.appendChild(slots); box.appendChild(poolEl); box.appendChild(chk);
  }

  function answer(right, btn) {
    if (lock) return; lock = true; stopTimer();
    var sp = speedFrac(), D = DIFF[st.diff];
    if (right) {
      if (btn) btn.classList.add('ok');
      revealChoices();
      okCount++; streak++; best = Math.max(best, streak);
      fx('comboPop', streak);
      var ultra = streak >= 5;
      var dmg = Math.round((12 + sp * 14) * (ultra ? 2 : 1));
      score += Math.round((100 + sp * 100) * D.x * (1 + streak * 0.1));
      hpB = Math.max(0, hpB - dmg); setHp();
      sfx(ultra ? 'thunder' : SKILLS[(round - 1) % SKILLS.length]);
      fx(ultra ? 'ultra' : 'burst', $('#figB'));
      if (ultra) { trend('combo'); }
      else if (sp > 0.7) { fx('perfect'); trend('nhanh'); }
      else trend('dung');
      dmgPop($('#figB'), '-' + dmg + (ultra ? ' ULTRA!' : ''));
    } else {
      onWrong(false, btn);
      return;
    }
    setTimeout(next, 950);
  }
  function onWrong(timeout, btn) {
    stopTimer();
    if (btn) btn.classList.add('bad');
    revealChoices();
    streak = 0; fx('comboPop', 0);
    var dmg = timeout ? 14 : 15;
    hpP = Math.max(0, hpP - dmg); setHp();
    sfx('fire'); fx('shake', $('#arena'));
    trend(timeout ? 'hetgio' : 'sai');
    dmgPop($('#figP'), '-' + dmg);
    setTimeout(next, 1150);
  }

  function end() {
    stopTimer();
    $('#play').classList.add('mx-hid');
    var B = BOSSES[st.boss], win = hpB <= 0;
    sfx(win ? 'victory' : 'lose');
    if (win) { fx('confetti'); trend('thang'); } else trend('thua');
    submitScore(score, startT);
    var r = $('#result'); r.classList.remove('mx-hid');
    r.innerHTML = '<div class="mx-card mx-result"><div class="mx-big-emoji mx-pop">' + (win ? '🏆' : '💪') + '</div>' +
      '<h1>' + (win ? 'Hạ gục ' + esc(B.boss) + '!' : 'Suýt nữa thôi!') + '</h1>' +
      '<p class="mx-mut">' + (win ? callName() + ' quá cháy! Vùng ' + esc(B.zone) + ' đã yên bình trở lại 🔓' : callName() + ' đánh rất hay, nghỉ một chút rồi phục thù nhé!') + '</p>' +
      '<div class="mx-stat-row"><span class="mx-pill">⭐ ' + score + ' điểm</span><span class="mx-pill">✅ ' + okCount + ' đúng</span><span class="mx-pill">⚡ Combo cao nhất ' + best + '</span><span class="mx-pill">❤️ Còn ' + Math.max(0, hpP) + ' máu</span></div>' +
      (win ? '<p class="mx-pill" style="margin-bottom:12px">🎉 Mở khóa danh hiệu: Người hùng ' + esc(B.zone) + '</p><br>' : '') +
      '<button class="mx-btn" id="btnAgain" type="button">Đánh lại</button><div style="height:8px"></div>' +
      '<a class="mx-btn alt" style="display:block;text-align:center;text-decoration:none" href="index.html">Về hub game</a></div>';
    $('#btnAgain').addEventListener('click', function () { r.classList.add('mx-hid'); $('#menu').classList.remove('mx-hid'); buildMenuKeep(); });
  }
  function buildMenuKeep() { /* giữ lựa chọn trùm/độ khó đã chọn */ buildMenu(); }

  loadUser().then(buildMenu);
})();
