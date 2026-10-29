/* =====================================================================
 * questions.js — NHÁNH 2 · Game "Hành trình đến Edo"
 * Bộ chuyển câu hỏi từ BÀI HỌC THẬT lúc chạy, CHỈ ĐỌC qua /free/list +
 * /free/lesson (đọc-only, không sửa endpoint, không nhúng nội dung
 * khóa học vào file). Giao diện theo CONTRACT.md:
 *
 *   window.GQ.getQuestions({level, topic, count, seed})
 *     level: 'N5'|'N4'|'N3'|'N2'|'N1'
 *     topic: 'kanji'|'vocab'|'grammar'|'mix'
 *   → Promise<Question[]>
 *   Question = {type:'kanji'|'vocab'|'part'|'fill'|'order', prompt,
 *               promptSub?, choices?[4], answer?, tokens?, answerText,
 *               meaning?}
 *
 * Nguồn theo topic: kanji→section kj, vocab→tv, grammar→np,
 * mix→gộp kj+tv+np.
 * Lỗi mạng / không có dữ kiện → reject Error với thông điệp thân thiện.
 * ===================================================================== */
(function () {
  'use strict';
  var ROOT = (typeof window !== 'undefined') ? window : globalThis;
  var ENDPOINT = ROOT.GAME_ENDPOINT ||
    'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev'; // = SITE.aiEndpoint; khi hợp nhất, game.js/config.js có thể đặt GAME_ENDPOINT trước.

  var MAX_LESSONS_PER_SECTION = 8;   // giới hạn số bài tải mỗi section/phiên (tránh dồn request)
  var FETCH_BATCH = 3;               // số lesson tải song song tối đa

  /* ---------------- RNG có seed (mulberry32) ---------------- */
  function rng(seed) {
    var a = (seed == null ? (Math.random() * 1e9) : seed) >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, r) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(arr, r) { return arr[Math.floor(r() * arr.length)]; }
  function uniq(arr) {
    var seen = {}, out = [];
    arr.forEach(function (x) { if (x != null && !seen[x]) { seen[x] = 1; out.push(x); } });
    return out;
  }
  function hashStr(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h >>> 0; }

  /* ---------------- Làm sạch văn bản / furigana ---------------- */
  // {chữ|cách đọc} -> chữ
  function stripFuri(s) {
    return String(s == null ? '' : s).replace(/\{([^{}|]+)\|[^{}]*\}/g, '$1').replace(/[{}]/g, '');
  }
  // {chữ|cách đọc} -> cách đọc
  function furiReading(s) {
    return String(s == null ? '' : s).replace(/\{[^{}|]+\|([^{}]*)\}/g, '$1');
  }
  function decodeEnt(s) {
    return String(s).replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'");
  }
  function stripTags(html) {
    return decodeEnt(String(html == null ? '' : html).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, ''));
  }
  function clean(s) {
    return decodeEnt(String(s == null ? '' : s)).replace(/\s+/g, ' ').trim();
  }
  function cleanMeaning(s) {
    return clean(s).replace(/\s*\(Hán Việt:[^)]*\)\s*$/i, '').replace(/\s*（Hán Việt:[^）]*）\s*$/, '').trim();
  }
  function hasKanji(s) { return /[\u4e00-\u9fff]/.test(s); }

  /* ---------------- Gọi /free/* ---------------- */
  function fetchJSON(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }
  function freeList(level, section) {
    return fetchJSON(ENDPOINT + '/free/list?level=' + level + '&section=' + section);
  }
  function freeLesson(level, section, id) {
    return fetchJSON(ENDPOINT + '/free/lesson?level=' + level + '&section=' + section + '&id=' + encodeURIComponent(id));
  }
  // Tải nhiều lesson, tối đa FETCH_BATCH song song; lỗi từng bài thì bỏ qua bài đó.
  function fetchLessons(level, section, ids) {
    var out = [], idx = 0;
    function step() {
      if (idx >= ids.length) return Promise.resolve(out);
      var id = ids[idx++];
      return freeLesson(level, section, id)
        .then(function (j) { if (j && j.lesson) out.push(j.lesson); })
        .catch(function () { /* bỏ qua bài lỗi */ })
        .then(step);
    }
    var chains = [];
    for (var i = 0; i < Math.min(FETCH_BATCH, ids.length); i++) chains.push(step());
    return Promise.all(chains).then(function () { return out; });
  }

  /* ---------------- Trích bảng từ vựng / kanji từ html ---------------- */
  function tableRows(html) {
    var rows = [], m, re = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    while ((m = re.exec(html))) {
      var cells = [], cm, cre = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      while ((cm = cre.exec(m[1]))) cells.push(cm[1]);
      if (cells.length) rows.push(cells);
    }
    return rows;
  }
  function exampleIn(cellHtml) {
    var jm = /<div class="jp">([\s\S]*?)<\/div>/.exec(cellHtml || '');
    var vm = /<div class="vi">([\s\S]*?)<\/div>/.exec(cellHtml || '');
    if (!jm) return null;
    return { jp: clean(stripTags(stripFuri(jm[1]))), vi: clean(stripTags(vm ? vm[1] : '')) };
  }
  // Hàng tv: ô từ dạng {từ|đọc}; cột đọc; cột nghĩa (kèm ví dụ .ix)
  function parseVocabTable(html, lessonId, entries) {
    tableRows(html).forEach(function (cells) {
      if (cells.length < 3) return;
      var wi = -1, raw = '';
      for (var i = 0; i < cells.length; i++) {
        var t = clean(cells[i]);
        if (/^\{[^{}|]+\|[^{}]+\}$/.test(t) || /class="jp"/.test(cells[i])) { wi = i; raw = t; break; }
      }
      if (wi < 0) return;
      var fm = /^\{([^{}|]+)\|([^{}]+)\}$/.exec(raw);
      var word = fm ? fm[1] : clean(stripTags(stripFuri(cells[wi])));
      var reading = fm ? fm[2] : clean(stripTags(cells[wi + 1] || ''));
      if (!fm && cells[wi + 1]) { var rd = clean(stripTags(cells[wi + 1])); if (rd && !hasKanji(rd)) reading = rd; }
      var lastCell = cells[cells.length - 1];
      var meaningHtml = String(lastCell).split(/<div class="ix">/)[0];
      var meaning = cleanMeaning(stripTags(meaningHtml));
      if (!word || !meaning || word.length > 24) return;
      var ex = exampleIn(lastCell);
      entries.push({ word: word, reading: reading, meaning: meaning, lesson: lessonId, ex: ex });
    });
  }
  // Hàng kj: [Kanji, On, Kun, Hán Việt, Nghĩa, Từ thường gặp "từ（đọc）: nghĩa<br>..."]
  function parseKanjiTable(html, lessonId, singles, compounds) {
    tableRows(html).forEach(function (cells) {
      if (cells.length < 5) return;
      var kj = clean(stripTags(cells[0]));
      if (!kj || kj.length > 2 || !hasKanji(kj) || kj === 'Kanji') return;
      var on = clean(stripTags(cells[1] || '')).split(/[、,]/)[0].trim();
      var kun = clean(stripTags(cells[2] || '')).split(/[、,]/)[0].replace(/・/g, '').trim();
      var meaning = cleanMeaning(stripTags(cells[4] || ''));
      if (meaning) singles.push({ word: kj, reading: kun || on, meaning: meaning, lesson: lessonId, ex: null, single: true });
      // Ô "Từ thường gặp" có thể dính khối ví dụ .ix ở cuối -> cắt bỏ trước khi tách từ.
      var commonRaw = String(cells[5] || '');
      var rowEx = exampleIn(commonRaw);
      var common = commonRaw.split(/<div class="ix">/)[0];
      var rowCompounds = [];
      common.split(/<br\s*\/?>/i).forEach(function (part) {
        var t = clean(stripTags(stripFuri(part)));
        var m = /^(.+?)（(.+?)）\s*[:：]\s*(.+)$/.exec(t);
        if (m && m[1].length <= 12 && hasKanji(m[1])) {
          rowCompounds.push({ word: m[1].trim(), reading: m[2].trim(), meaning: cleanMeaning(m[3]), lesson: lessonId, ex: null });
        }
      });
      if (rowEx && rowEx.jp) { // gắn ví dụ của hàng cho từ ghép xuất hiện trong câu ví dụ
        for (var ci = 0; ci < rowCompounds.length; ci++) {
          if (rowEx.jp.indexOf(rowCompounds[ci].word) >= 0) { rowCompounds[ci].ex = rowEx; break; }
        }
      }
      rowCompounds.forEach(function (e) { compounds.push(e); });
    });
  }

  /* ---------------- Trích quiz[] của bài tv/kj ---------------- */
  // a dạng "{先生|せんせい}（せんせい）" -> {word, reading}
  function parseBracedAnswer(a) {
    var s = String(a || '');
    var word = stripFuri(s.split('（')[0].split('(')[0]).trim();
    var pm = /[（(]([^）)]+)[）)]/.exec(s);
    var reading = pm ? pm[1].trim() : furiReading(s).trim();
    return { word: word, reading: reading };
  }
  function parseQuizVocab(quiz, lessonId, entries) {
    (quiz || []).forEach(function (it) {
      if (!it || it.o) return; // quiz có sẵn lựa chọn (np) xử lý riêng
      var q = String(it.q || ''), a = String(it.a || '');
      var m;
      if (/Cách đọc và nghĩa|Đọc từ|Đọc 「|thế nào/.test(q) && (m = /「([^」]+)」/.exec(q))) {
        var parts = a.split(/\s+—\s+|\s+–\s+|\s+-\s+/);
        if (parts.length >= 2) {
          entries.push({ word: m[1], reading: clean(parts[0]), meaning: cleanMeaning(parts.slice(1).join(' — ')), lesson: lessonId, ex: null });
        }
      } else if (/Từ nào có nghĩa/.test(q)) {
        var qm = /[“"]([^”"]+)[”"]/.exec(q);
        var pa = parseBracedAnswer(a);
        if (qm && pa.word) entries.push({ word: pa.word, reading: pa.reading, meaning: cleanMeaning(qm[1]), lesson: lessonId, ex: null });
      } else if (/viết bằng chữ Hán/.test(q) && (m = /「([^」]+)」/.exec(q))) {
        var qm2 = /[“"]([^”"]+)[”"]/.exec(q);
        var pa2 = parseBracedAnswer(a);
        if (pa2.word) entries.push({ word: pa2.word, reading: pa2.reading || m[1], meaning: qm2 ? cleanMeaning(qm2[1]) : '', lesson: lessonId, ex: null });
      } else if ((m = /Từ 「([^」]+)」 có nghĩa/.exec(q))) {
        var mm = /^(.*?)\s+—\s+.*đọc là\s+(\S+)\s*$/.exec(a);
        if (mm) entries.push({ word: m[1], reading: mm[2], meaning: cleanMeaning(mm[1]), lesson: lessonId, ex: null });
        else entries.push({ word: m[1], reading: '', meaning: cleanMeaning(a.split(/\s+—\s+/)[0]), lesson: lessonId, ex: null });
      }
    });
  }

  /* ---------------- Ngữ pháp: quiz có sẵn o/c + ví dụ <b> ---------------- */
  var PARTICLES = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'も', 'の', 'か', 'から', 'まで', 'より', 'や', 'ね', 'よ'];
  function isParticle(s) { return PARTICLES.indexOf(s) >= 0; }

  function parseQuizGrammar(quiz, lessonId, fills, targets) {
    (quiz || []).forEach(function (it) {
      if (!it || !it.o || typeof it.c !== 'number') return;
      var prompt = clean(stripTags(stripFuri(String(it.q || '').replace(/^Điền mẫu ngữ pháp thích hợp:\s*/, ''))));
      if (prompt.indexOf('＿＿') < 0 && prompt.indexOf('（　）') < 0) return;
      var correct = clean(stripTags(stripFuri(it.o[it.c] || '')));
      if (!correct) return;
      var distract = uniq(it.o.map(function (o) { return clean(stripTags(stripFuri(o))); }))
        .filter(function (x) { return x && x !== correct; });
      var expl = clean(stripTags(stripFuri(String(it.a || ''))));
      var vi = expl.indexOf(' — ') >= 0 ? expl.split(' — ').slice(1).join(' — ') : '';
      targets.push(correct);
      fills.push({
        prompt: prompt, answerText: correct, distractors: distract,
        meaning: vi, lesson: lessonId,
        type: (isParticle(correct) && distract.every(isParticle)) ? 'part' : 'fill'
      });
    });
  }
  // Ví dụ trong section np: <div class="ex"><div class="jp">...<b>đích</b>...</div><div class="vi">...</div></div>
  function parseGrammarExamples(html, lessonId, fills, examples, targets) {
    var re = /<div class="ex">\s*<div class="jp">([\s\S]*?)<\/div>\s*<div class="vi">([\s\S]*?)<\/div>/g, m;
    while ((m = re.exec(html))) {
      var jpHtml = m[1], vi = clean(stripTags(m[2]));
      var bm = /<b>([\s\S]*?)<\/b>/.exec(jpHtml);
      var marked = jpHtml.replace(/<b>/g, '').replace(/<\/b>/g, '');
      var plain = clean(stripTags(stripFuri(marked)));
      var full = plain.replace(/[]/g, '');
      if (full) examples.push({ jp: full, vi: vi, lesson: lessonId });
      if (!bm) continue;
      var target = clean(stripTags(stripFuri(bm[1])));
      if (!target || target.length > 20) continue;
      targets.push(target);
      var blanked = plain.replace(/[\s\S]*?/, isParticle(target) ? '（　）' : '＿＿');
      if (blanked !== plain) {
        fills.push({
          prompt: blanked, answerText: target, distractors: null,
          meaning: vi, lesson: lessonId, type: isParticle(target) ? 'part' : 'fill'
        });
      }
    }
  }

  /* ---------------- Sắp xếp câu: cắt câu ngắn thành 3–5 mảnh ---------------- */
  function segmentSentence(s) {
    var t = String(s || '').replace(/[。．]$/, '');
    if (t.length < 8 || t.length > 30) return null;
    var pts = [], i;
    for (i = 2; i < t.length - 1; i++) {
      if ('はがをにへでともか、'.indexOf(t[i]) >= 0) pts.push(i + 1);
    }
    var cuts = [], last = 0;
    for (i = 0; i < pts.length && cuts.length < 4; i++) {
      var p = pts[i];
      if (p - last >= 3 && t.length - p >= 3) { cuts.push(p); last = p; }
    }
    if (cuts.length < 2) { // không đủ điểm cắt tự nhiên -> cắt đều
      var n = t.length >= 15 ? 4 : 3, step = Math.floor(t.length / n);
      cuts = []; for (i = 1; i < n; i++) cuts.push(step * i);
    }
    var segs = [], prev = 0;
    cuts.forEach(function (c) { segs.push(t.slice(prev, c)); prev = c; });
    segs.push(t.slice(prev));
    segs = segs.filter(function (x) { return x.length > 0; });
    if (segs.length < 3 || segs.length > 5) return null;
    return { tokens: segs, answerText: t + '。' };
  }

  /* ---------------- Dựng pool theo (level, section), cache trong phiên ---------------- */
  var poolCache = {}; // key level/section -> Promise<pool>
  function buildPool(levelLow, section) {
    var key = levelLow + '/' + section;
    if (poolCache[key]) return poolCache[key];
    var p = freeList(levelLow, section).then(function (list) {
      var free = (list.lessons || []).filter(function (x) { return x.free; });
      if (!free.length) throw new Error('EMPTY');
      var r = rng(hashStr(key));
      var chosen = shuffle(free, r).slice(0, MAX_LESSONS_PER_SECTION);
      return fetchLessons(levelLow, section, chosen.map(function (x) { return x.id; }));
    }).then(function (lessons) {
      if (!lessons.length) throw new Error('EMPTY');
      var pool = {
        vocab: [], kanji: [], kanjiSingle: [],
        fills: [], examples: [], gramTargets: []
      };
      lessons.forEach(function (lesson) {
        var secs = lesson.sections || [];
        if (section === 'tv') {
          secs.forEach(function (s) { parseVocabTable(s.html || '', lesson.id, pool.vocab); });
          parseQuizVocab(lesson.quiz, lesson.id, pool.vocab);
        } else if (section === 'kj') {
          secs.forEach(function (s) { parseKanjiTable(s.html || '', lesson.id, pool.kanjiSingle, pool.kanji); });
          parseQuizVocab(lesson.quiz, lesson.id, pool.kanji);
        } else if (section === 'np') {
          parseQuizGrammar(lesson.quiz, lesson.id, pool.fills, pool.gramTargets);
          secs.forEach(function (s) { parseGrammarExamples(s.html || '', lesson.id, pool.fills, pool.examples, pool.gramTargets); });
        }
      });
      // Khử trùng entries theo word+reading
      ['vocab', 'kanji', 'kanjiSingle'].forEach(function (k) {
        var seen = {};
        pool[k] = pool[k].filter(function (e) {
          var kk = e.word + '|' + (e.reading || '');
          if (seen[kk] || !e.word) return false; seen[kk] = 1; return true;
        });
      });
      pool.gramTargets = uniq(pool.gramTargets);
      return pool;
    }).catch(function (e) {
      delete poolCache[key];
      if (e && e.message === 'EMPTY') throw new Error('Chưa có bài học mở miễn phí cho phần này. Thử trình độ/chủ đề khác nhé!');
      throw new Error('Không tải được câu hỏi từ bài học (mạng chậm hoặc máy chủ bận). Thử lại sau một chút nhé!');
    });
    poolCache[key] = p;
    return p;
  }

  /* ---------------- Sinh câu hỏi từ entries ---------------- */
  function distractors(entries, entry, field, n, r, lessonFirst) {
    var vals = [], i, e;
    var same = entries.filter(function (x) { return x !== entry && x.lesson === entry.lesson; });
    var rest = entries.filter(function (x) { return x !== entry && x.lesson !== entry.lesson; });
    var order = lessonFirst === false ? shuffle(same.concat(rest), r) : shuffle(same, r).concat(shuffle(rest, r));
    for (i = 0; i < order.length && vals.length < n; i++) {
      e = order[i]; var v = e[field];
      if (v && v !== entry[field] && vals.indexOf(v) < 0) vals.push(v);
    }
    return vals;
  }
  function makeChoices(correct, wrongs, r) {
    var all = shuffle([correct].concat(wrongs), r);
    return { choices: all, answer: all.indexOf(correct) };
  }
  function qKanjiReading(e, entries, r) {
    var w = distractors(entries, e, 'reading', 3, r);
    if (!e.reading || w.length < 2) return null;
    var c = makeChoices(e.reading, w, r);
    return { type: 'kanji', prompt: e.word, promptSub: 'Đọc là gì?', choices: c.choices, answer: c.answer, answerText: e.reading, meaning: e.meaning || undefined };
  }
  function qKanjiMeaning(e, entries, r) {
    var w = distractors(entries, e, 'meaning', 3, r);
    if (!e.meaning || w.length < 2) return null;
    var c = makeChoices(e.meaning, w, r);
    return { type: 'kanji', prompt: e.word, promptSub: e.reading ? '（' + e.reading + '）· nghĩa là gì?' : 'Nghĩa là gì?', choices: c.choices, answer: c.answer, answerText: e.meaning, meaning: e.reading || undefined };
  }
  function qVocabMeaning(e, entries, r) {
    var w = distractors(entries, e, 'meaning', 3, r);
    if (!e.meaning || w.length < 2) return null;
    var c = makeChoices(e.meaning, w, r);
    return { type: 'vocab', prompt: e.word, promptSub: e.reading || undefined, choices: c.choices, answer: c.answer, answerText: e.meaning, meaning: e.reading || undefined };
  }
  function qVocabReading(e, entries, r) {
    var w = distractors(entries, e, 'reading', 3, r);
    if (!e.reading || w.length < 2) return null;
    var c = makeChoices(e.reading, w, r);
    return { type: 'vocab', prompt: e.word, promptSub: 'Đọc là gì?', choices: c.choices, answer: c.answer, answerText: e.reading, meaning: e.meaning || undefined };
  }
  function qVocabReverse(e, entries, r) {
    var w = distractors(entries, e, 'word', 3, r);
    if (!e.meaning || w.length < 2) return null;
    var c = makeChoices(e.word, w, r);
    return { type: 'vocab', prompt: '“' + e.meaning + '”', promptSub: 'Từ nào có nghĩa này?', choices: c.choices, answer: c.answer, answerText: e.word, meaning: e.reading || undefined };
  }
  function qVocabFill(e, entries, r) {
    if (!e.ex || !e.ex.jp || e.ex.jp.indexOf(e.word) < 0) return null;
    var w = distractors(entries, e, 'word', 3, r);
    if (w.length < 2) return null;
    var c = makeChoices(e.word, w, r);
    return {
      type: 'fill', prompt: e.ex.jp.replace(e.word, '＿＿'), promptSub: 'Điền từ đúng vào chỗ trống',
      choices: c.choices, answer: c.answer, answerText: e.word, meaning: e.ex.vi || e.meaning || undefined
    };
  }
  function qFill(f, pool, r) {
    var wrongs = f.distractors && f.distractors.length >= 3 ? shuffle(f.distractors, r).slice(0, 3)
      : distractors(pool.gramTargets.map(function (t) { return { word: t, lesson: f.lesson }; }), { word: f.answerText, lesson: f.lesson }, 'word', 3, r);
    if (wrongs.length < 2) {
      if (f.type === 'part') wrongs = shuffle(PARTICLES.filter(function (x) { return x !== f.answerText; }), r).slice(0, 3);
      else return null;
    }
    var c = makeChoices(f.answerText, wrongs, r);
    return { type: f.type, prompt: f.prompt, promptSub: f.type === 'part' ? 'Chọn trợ từ đúng' : 'Điền vào chỗ trống', choices: c.choices, answer: c.answer, answerText: f.answerText, meaning: f.meaning || undefined };
  }
  function qOrder(ex, r) {
    var seg = segmentSentence(ex.jp);
    if (!seg) return null;
    var toks = shuffle(seg.tokens, r), guard = 0;
    while (toks.join('') === seg.tokens.join('') && guard++ < 6) toks = shuffle(seg.tokens, r);
    return { type: 'order', prompt: 'Sắp xếp các mảnh thành câu đúng', promptSub: ex.vi ? '“' + ex.vi + '”' : undefined, tokens: toks, answerText: seg.answerText, meaning: ex.vi || undefined };
  }

  /* ---------------- getQuestions ---------------- */
  var TOPIC_SECTIONS = { kanji: ['kj'], vocab: ['tv'], grammar: ['np'], mix: ['kj', 'tv', 'np'] };

  function getQuestions(opts) {
    opts = opts || {};
    var level = String(opts.level || 'N5').toUpperCase();
    var topic = TOPIC_SECTIONS[opts.topic] ? opts.topic : 'mix';
    var count = Math.max(1, Math.min(40, opts.count || 6));
    var r = rng(opts.seed);
    var levelLow = level.toLowerCase();
    if (!/^n[1-5]$/.test(levelLow)) {
      return Promise.reject(new Error('Trình độ chưa đúng. Chọn N5–N1 nhé!'));
    }
    var sections = TOPIC_SECTIONS[topic];
    return Promise.all(sections.map(function (s) {
      return buildPool(levelLow, s).then(function (p) { return { section: s, pool: p }; })
        .catch(function (e) { return { section: s, pool: null, error: e }; });
    })).then(function (loaded) {
      var okPools = loaded.filter(function (x) { return x.pool; });
      if (!okPools.length) throw (loaded[0] && loaded[0].error) || new Error('Không tải được câu hỏi. Thử lại sau nhé!');
      var P = {};
      okPools.forEach(function (x) { P[x.section] = x.pool; });

      // Danh sách "máy sinh câu" theo topic
      var gens = [];
      if (topic === 'kanji' || topic === 'mix') {
        if (P.kj) {
          P.kj.kanji.forEach(function (e) {
            gens.push({ make: function () { return qKanjiReading(e, P.kj.kanji, r); } });
            gens.push({ make: function () { return qKanjiMeaning(e, P.kj.kanji, r); } });
          });
          P.kj.kanjiSingle.forEach(function (e) {
            gens.push({ make: function () { return qKanjiMeaning(e, P.kj.kanjiSingle.concat(P.kj.kanji), r); } });
            gens.push({ make: function () { return qKanjiReading(e, P.kj.kanjiSingle, r); } });
          });
        }
      }
      if (topic === 'vocab' || topic === 'mix') {
        if (P.tv) {
          P.tv.vocab.forEach(function (e) {
            gens.push({ make: function () { return qVocabMeaning(e, P.tv.vocab, r); } });
            gens.push({ make: function () { return qVocabReading(e, P.tv.vocab, r); } });
            gens.push({ make: function () { return qVocabReverse(e, P.tv.vocab, r); } });
            gens.push({ make: function () { return qVocabFill(e, P.tv.vocab, r); } });
          });
        }
      }
      if (topic === 'grammar' || topic === 'mix') {
        if (P.np) {
          P.np.fills.forEach(function (f) { gens.push({ make: function () { return qFill(f, P.np, r); } }); });
          var orderSrc = P.np.examples.slice();
          if (P.tv) P.tv.vocab.forEach(function (e) { if (e.ex && e.ex.jp) orderSrc.push({ jp: e.ex.jp, vi: e.ex.vi, lesson: e.lesson }); });
          orderSrc.forEach(function (ex) { gens.push({ make: function () { return qOrder(ex, r); } }); });
        }
      }
      if (!gens.length) throw new Error('Bài học chưa đủ dữ kiện để tạo câu hỏi cho phần này. Thử chủ đề khác nhé!');

      var out = [], seen = {}, orderSeen = {};
      var orderCap = Math.max(1, Math.round(count / 3)); // tối đa ~1/3 câu sắp xếp mỗi màn
      var orderUsed = 0;
      var shuffledGens = shuffle(gens, r);
      var attempts = 0, gi = 0;
      while (out.length < count && attempts < gens.length * 3 + 60) {
        attempts++;
        var g = shuffledGens[gi++ % shuffledGens.length];
        var q = null;
        try { q = g.make(); } catch (e) { q = null; }
        if (!q) continue;
        if (q.type === 'order') {
          if (orderUsed >= orderCap || orderSeen[q.answerText]) continue;
          orderSeen[q.answerText] = 1; orderUsed++;
        }
        var key = q.type + '|' + q.prompt + '|' + q.answerText;
        if (seen[key]) continue;
        seen[key] = 1;
        out.push(q);
      }
      if (out.length < Math.min(count, 3)) {
        throw new Error('Chưa gom đủ câu hỏi cho màn này. Thử lại hoặc đổi chủ đề nhé!');
      }
      return out.slice(0, count);
    });
  }

  ROOT.GQ = { getQuestions: getQuestions, _version: 'n2-1' };
  if (typeof module !== 'undefined' && module.exports) module.exports = ROOT.GQ;
})();
