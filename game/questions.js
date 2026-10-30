/* =====================================================================
 * questions.js — NHÁNH 2 · Game "Hành trình đến Edo"
 * Bộ chuyển câu hỏi từ BÀI HỌC THẬT lúc chạy, CHỈ ĐỌC qua /free/list +
 * /free/lesson (đọc-only, không sửa endpoint, không nhúng nội dung
 * khóa học vào file). ĐỢT 7 · P1: người ĐÃ ĐĂNG NHẬP (phiên hn_sess_v1 +
 * khoá nội dung hn_key_v1//auth/me) mở thêm nguồn FULL — giải mã gói
 * enc/*.bin ngay trên máy (fmt 2, chỉ trong bộ nhớ) và dùng TOÀN BỘ bài;
 * khách vẫn đi đường free y như cũ; lỗi nguồn full -> rơi êm về free.
 * Mỗi Question có thêm q.lesson (id bài gốc) + q.src ('full'|'free').
 * Giao diện theo CONTRACT.md:
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
 * mix→gộp kj+tv+np (+tonghop: chỉ các câu mcq trích an toàn, xem
 * parseTonghopMcq). Dokkai/kaiwa KHÔNG dùng (đánh giá ở báo cáo nhánh Q:
 * dokkai cần cả bài đọc dài, kaiwa không có cấu trúc hỏi–đáp hợp định dạng).
 *
 * Bản Q (sửa "ít + lặp"):
 * - Tải MỌI bài free của section (bỏ trần 8 bài/phiên), tải theo đợt
 *   FETCH_BATCH; thứ tự bài XOAY theo phiên bằng cursor localStorage
 *   hn_game_q_cursor_<level>_<section> (ưu tiên bài chưa tải gần đây ở
 *   đầu hàng đợi tải/khử trùng).
 * - Mỗi Question có id ổn định = hash(level|section|lesson|prompt|answerText).
 * - Chống lặp bền vững: localStorage hn_game_seen_q (tối đa 4000 id, FIFO)
 *   + tập đã phát trong phiên; getQuestions ưu tiên câu CHƯA thấy, cạn
 *   pool chưa-thấy mới dùng lại câu cũ nhất; mix chia đều vòng tròn
 *   (round-robin) giữa các section thay vì dồn một section.
 * Lỗi mạng / không có dữ kiện → reject Error với thông điệp thân thiện.
 * ===================================================================== */
(function () {
  'use strict';
  var ROOT = (typeof window !== 'undefined') ? window : globalThis;
  var ENDPOINT = ROOT.GAME_ENDPOINT ||
    'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev'; // = SITE.aiEndpoint; khi hợp nhất, game.js/config.js có thể đặt GAME_ENDPOINT trước.
  // Gốc site (nơi có enc/): game nằm ở /game/ nên gốc là ../ — harness kiểm
  // thử có thể ghi đè bằng window.GAME_SITE_ROOT (URL tuyệt đối kết thúc /).
  var SITE_ROOT = String(ROOT.GAME_SITE_ROOT || '../');
  if (!/\/$/.test(SITE_ROOT)) SITE_ROOT += '/';

  // ĐỢT SỬA 30/10 — nhánh Q: bỏ hẳn trần số bài/phiên (bản gốc 8, bản
  // trung gian 16) — tải MỌI bài free của section; thứ tự tải XOAY theo
  // cursor lưu bền (hn_game_q_cursor_*) để các phiên liên tiếp ưu tiên
  // các bài khác nhau khi khử trùng/chọn câu.
  var FETCH_BATCH = 6;               // số lesson tải song song tối đa
  var SEEN_KEY = 'hn_game_seen_q';   // id câu đã phát (chống lặp bền vững)
  var SEEN_CAP = 4000;
  var SESSION_SEEN = {};             // id đã phát trong phiên (trang) hiện tại
  function loadSeen() {
    try {
      var a = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function saveSeen(arr) {
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(arr.slice(-SEEN_CAP))); } catch (e) { /* bỏ qua */ }
  }

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
  function fetchJSON(url, attempt) {
    // Thử lại tối đa 3 lần (chờ 700ms rồi 1600ms): Worker có lúc trả lỗi
    // thoáng qua khi dồn nhiều request tải bài.
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).catch(function (e) {
      var n = attempt || 0;
      if (n >= 2) throw e;
      return new Promise(function (res) { setTimeout(res, n === 0 ? 700 : 1600); })
        .then(function () { return fetchJSON(url, n + 1); });
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

  /* ---------------- Nguồn FULL cho người đã đăng nhập (ĐỢT 7 · P1) ----------------
   * Phiên: localStorage 'hn_sess_v1' (đúng cách game-api.js đọc; ưu tiên
   * AUTH.session() nếu trang đã nạp auth.js). Khoá nội dung: ưu tiên
   * localStorage 'hn_key_v1' (auth.js đã lưu), thiếu thì GET /auth/me
   * (Bearer) lấy j.contentKey — chỉ tài khoản approved mới có. Gói
   * <site>/enc/*.bin giải mã fmt 2 ngay trên máy: IV 12 byte đầu +
   * AES-256-GCM + gzip (đúng lock.js của trang học). Nội dung đã giải mã
   * CHỈ ở trong bộ nhớ phiên — TUYỆT ĐỐI không ghi xuống localStorage.
   * Mọi lỗi ở nguồn full → resolve null → buildPool rơi êm về đường free. */
  function gameSession() {
    try { if (ROOT.AUTH && typeof ROOT.AUTH.session === 'function') return ROOT.AUTH.session() || ''; } catch (e) { /* bỏ qua */ }
    try { return localStorage.getItem('hn_sess_v1') || ''; } catch (e) { return ''; }
  }
  var lastSessFp = null; // vân tay phiên đã thấy; đổi phiên/khoá -> bỏ mọi cache full
  function sessFp() { var t = gameSession(); return t ? 's' + hashStr(t).toString(36) : ''; }
  var fullKeyPromise = null, fullKeyFp = '';
  var fullPackCache = {};   // name@fp -> Promise<mảng bài đã parse | null>
  var siteMetaPromise = null;
  function checkSessionEpoch() {
    var fp = sessFp();
    if (lastSessFp === null) { lastSessFp = fp; return; }
    if (fp !== lastSessFp) {
      lastSessFp = fp;
      poolCache = {}; fullPackCache = {}; fullKeyPromise = null; fullKeyFp = ''; siteMetaPromise = null;
    }
  }
  function b64ToBytes(s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); }
  function importContentKey(b64) {
    if (!ROOT.crypto || !ROOT.crypto.subtle) return Promise.reject(new Error('no-subtle'));
    return ROOT.crypto.subtle.importKey('raw', b64ToBytes(b64), 'AES-GCM', false, ['decrypt']);
  }
  function getContentKey() {
    var tok = gameSession();
    if (!tok) return Promise.resolve(null);
    var fp = sessFp();
    if (fullKeyPromise && fullKeyFp === fp) return fullKeyPromise;
    fullKeyFp = fp;
    fullKeyPromise = (function () {
      var stored = '';
      try { stored = localStorage.getItem('hn_key_v1') || ''; } catch (e) { /* bỏ qua */ }
      var fromStored = stored ? importContentKey(stored).catch(function () { return null; }) : Promise.resolve(null);
      return fromStored.then(function (k) {
        if (k) return k;
        return fetch(ENDPOINT + '/auth/me', { headers: { Authorization: 'Bearer ' + tok } })
          .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
          .then(function (j) { return (j && j.contentKey) ? importContentKey(j.contentKey) : null; })
          .catch(function () { return null; });
      });
    })();
    return fullKeyPromise;
  }
  function siteMeta() {
    if (!siteMetaPromise) {
      siteMetaPromise = fetch(SITE_ROOT + 'enc/meta.json').then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status); return r.json();
      }).catch(function (e) { siteMetaPromise = null; throw e; });
    }
    return siteMetaPromise;
  }
  function decryptPackText(key, buf) {
    var bytes = new Uint8Array(buf);
    return ROOT.crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(0, 12) }, key, bytes.slice(12))
      .then(function (z) {
        var stream = new Blob([z]).stream().pipeThrough(new DecompressionStream('gzip'));
        return new Response(stream).text();
      });
  }
  // Port nguyên văn parser khoan dung của Worker (freeParseObjs): text gói
  // là dãy object JS literal, không phải JSON thuần.
  function freeParseObjs(t) {
    var i = 0, n = t.length, out = [];
    function ws() { for (;;) { while (i < n && /\s/.test(t[i])) i++; if (t[i] === '/' && t[i + 1] === '/') { while (i < n && t[i] !== '\n') i++; } else if (t[i] === '/' && t[i + 1] === '*') { i = t.indexOf('*/', i + 2); i = i < 0 ? n : i + 2; } else return; } }
    function str() { var q = t[i++], s = ''; while (i < n && t[i] !== q) { if (t[i] === '\\') { var c = t[++i]; i++; if (c === 'n') s += '\n'; else if (c === 't') s += '\t'; else if (c === 'r') s += '\r'; else if (c === 'u') { s += String.fromCharCode(parseInt(t.substr(i, 4), 16)); i += 4; } else if (c === '\n') { /* nối dòng */ } else s += c; } else s += t[i++]; } i++; return s; }
    function val() {
      ws(); var c = t[i];
      if (c === '{') { i++; var o = {}; for (;;) { ws(); if (t[i] === '}') { i++; return o; } var k; if (t[i] === '"' || t[i] === "'") k = str(); else { var m = /^[A-Za-z_$][\w$]*/.exec(t.slice(i, i + 64)); if (!m) throw new Error('key@' + i); k = m[0]; i += k.length; } ws(); if (t[i++] !== ':') throw new Error(':@' + i); o[k] = val(); ws(); if (t[i] === ',') i++; } }
      if (c === '[') { i++; var a = []; for (;;) { ws(); if (t[i] === ']') { i++; return a; } a.push(val()); ws(); if (t[i] === ',') i++; } }
      if (c === '"' || c === "'") return str();
      var m2 = /^(-?\d+(\.\d+)?([eE][-+]?\d+)?|true|false|null)/.exec(t.slice(i, i + 32));
      if (!m2) throw new Error('val@' + i); i += m2[0].length; return JSON.parse(m2[0]);
    }
    while (i < n) { ws(); if (i >= n) break; var c2 = t[i]; if (c2 === '{') { try { var o2 = val(); if (o2 && o2.id) out.push(o2); } catch (e) { i++; } } else if (c2 === '"' || c2 === "'") str(); else i++; }
    return out;
  }
  // Port freeSecOf của Worker: phân loại bài trong gói 'lessons'.
  function freeSecOf(x) {
    var ty = String(x.type || ''), id = String(x.id || '');
    if (/Hội thoại|kaiwa|kaigo/i.test(ty) || /^kaiwa-/.test(id)) return 'kaiwa';
    if (/Đọc hiểu/i.test(ty) || /dokkai/.test(id)) return 'dokkai';
    if (/Tổng hợp/i.test(ty) || /tonghop/.test(id)) return 'tonghop';
    return '';
  }
  function loadFullPack(name) {
    return getContentKey().then(function (key) {
      if (!key) return null;
      var ck = name + '@' + fullKeyFp;
      if (fullPackCache[ck]) return fullPackCache[ck];
      var p = siteMeta().then(function (meta) {
        var v = (meta.v || {})[name];
        if (v == null) throw new Error('no-pack');
        return fetch(SITE_ROOT + 'enc/' + name + '.bin?v=' + v);
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
        .then(function (buf) { return decryptPackText(key, buf); })
        .then(function (text) { return freeParseObjs(text); })
        .catch(function () { delete fullPackCache[ck]; return null; });
      fullPackCache[ck] = p;
      return p;
    }).catch(function () { return null; });
  }
  // Mảng bài FULL cho (level, section); null = không dùng được -> fallback free.
  function resolveFullLessons(levelLow, section) {
    if (!gameSession()) return Promise.resolve(null);
    var name = section === 'tonghop' ? 'lessons' : 'course_' + levelLow + '_' + section;
    return loadFullPack(name).then(function (all) {
      if (!all || !all.length) return null;
      if (section !== 'tonghop') {
        // FIX2 (30/10): gộp thêm các bài LẺ trong gói 'lessons' thuộc
        // đúng (cấp, phần) mà freeSecOf không phân loại — bản cũ chỉ
        // đọc gói 'lessons' cho phần tổng hợp nên 22 bài thật của
        // khóa N1 (6 bài "Từ vựng N1" + 16 bài "Ngữ pháp N1") không
        // bao giờ vào được pool game. Chỉ gộp tv/np (kj không có bài
        // lẻ dạng này); lỗi nạp gói lessons thì giữ nguyên gói khóa.
        if (section === 'kj') return all;
        return loadFullPack('lessons').then(function (pack) {
          if (!pack || !pack.length) return all;
          var seen = {};
          all.forEach(function (l) { seen[l.id] = 1; });
          var extra = pack.filter(function (x) {
            if (!x || seen[x.id]) return false;
            if (freeSecOf(x) !== '') return false;
            if (String(x.level || '').toLowerCase() !== levelLow) return false;
            var ty = String(x.type || '');
            return section === 'tv' ? /Từ vựng/.test(ty) : /Ngữ pháp/.test(ty);
          });
          return extra.length ? all.concat(extra) : all;
        }).catch(function () { return all; });
      }
      var arr = all.filter(function (x) {
        return freeSecOf(x) === 'tonghop' && String(x.level || '').toLowerCase() === levelLow;
      }).sort(function (a, b) { return String(a.id).localeCompare(String(b.id), 'en', { numeric: true }); });
      return arr.length ? arr : null;
    }).catch(function () { return null; });
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
      // FIX2 (30/10): bảng 2 cột [Từ, Nghĩa] của các bài Từ vựng N1 lẻ
      // (gói lessons) — ô từ là một "{từ|đọc}" trọn ô, ô 2 là nghĩa.
      if (cells.length === 2) {
        var fm2 = /^\{([^{}|]+)\|([^{}]+)\}$/.exec(clean(cells[0]));
        if (fm2 && fm2[1].length <= 24) {
          var mean2 = cleanMeaning(stripTags(String(cells[1]).split(/<div class="ix">/)[0]));
          if (mean2) entries.push({ word: fm2[1], reading: fm2[2], meaning: mean2, lesson: lessonId, ex: exampleIn(cells[1]) });
        }
        return;
      }
      if (cells.length < 3) return;
      var wi = -1, raw = '';
      for (var i = 0; i < cells.length; i++) {
        var t = clean(cells[i]);
        // FIX2 (30/10): nhận ô từ khi markup {từ|đọc} nằm BẤT KỲ đâu
        // trong ô (bản cũ neo ^...$ nên bỏ qua dạng okurigana
        // {抱|かか}える rất phổ biến ở N2/N1); bỏ qua ô chứa khối ví
        // dụ .ix để không bắt nhầm ô nghĩa ở cuối hàng.
        if (String(cells[i]).indexOf('<div class="ix">') >= 0) continue;
        if (/\{[^{}|]+\|[^{}]+\}/.test(t) || /class="jp"/.test(cells[i])) { wi = i; raw = t; break; }
      }
      if (wi < 0) {
        // FIX2 (30/10): hàng từ viết THƯỜNG, không markup furigana
        // (vd アクセント, あくび — class="jp" nằm trên thẻ <td> nên
        // tableRows không giữ lại được). Dự phòng theo VỊ TRÍ theo
        // đúng layout bảng tv chuẩn [#, Từ, Cách đọc, Hán Việt,
        // Nghĩa]: ô từ là ô 1 khi ô 0 là số thứ tự, ngược lại ô 0.
        // Điều kiện Nhật chặt (có kana/kanji, không chứa dấu tiếng
        // Việt) để không nuốt hàng tiêu đề/hàng lạ.
        var pwi = (cells.length >= 4 && /^\d+$/.test(clean(cells[0]))) ? 1 : 0;
        var pw = clean(stripTags(stripFuri(cells[pwi])));
        var prd = clean(stripTags(stripFuri(cells[pwi + 1] || '')));
        if (!pw || pw.length > 24 || pw === 'Từ') return;
        if (!/[぀-ヿ一-鿿]/.test(pw) || /[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(pw)) return;
        var pLast = cells[cells.length - 1];
        var pMean = cleanMeaning(stripTags(String(pLast).split(/<div class="ix">/)[0]));
        if (!pMean) return;
        entries.push({ word: pw, reading: (prd && !hasKanji(prd)) ? prd : '', meaning: pMean, lesson: lessonId, ex: exampleIn(pLast) });
        return;
      }
      var fm = /^\{([^{}|]+)\|([^{}]+)\}$/.exec(raw);
      var word, reading;
      if (fm) { word = fm[1]; reading = fm[2]; }
      else {
        // Dạng okurigana: word = mặt chữ đầy đủ sau khi gỡ furigana;
        // reading = ráp phần đọc trong ngoặc + kana ngoài ngoặc; nếu
        // ráp không sạch (còn kanji) thì lấy cột đọc kề bên như cũ.
        word = clean(stripTags(stripFuri(cells[wi])));
        reading = clean(stripTags(String(cells[wi]).replace(/\{([^{}|]+)\|([^{}]+)\}/g, '$2')));
        if (!reading || hasKanji(reading)) reading = '';
        if (!reading && cells[wi + 1]) { var rd = clean(stripTags(stripFuri(cells[wi + 1]))); if (rd && !hasKanji(rd)) reading = rd; }
      }
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
      // FIX2 (30/10): quiz dạng THẺ của các bài Từ vựng N1 lẻ — q là
      // đúng một "{từ|đọc}", a là nghĩa. Bản cũ không mẫu nào khớp.
      if ((m = /^\{([^{}|]+)\|([^{}]+)\}$/.exec(q.trim()))) {
        var cardMean = cleanMeaning(a);
        if (cardMean) entries.push({ word: m[1], reading: m[2], meaning: cardMean, lesson: lessonId, ex: null });
        return;
      }
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

  function parseQuizGrammar(quiz, lessonId, fills, targets, directs) {
    (quiz || []).forEach(function (it) {
      if (!it || !it.o || typeof it.c !== 'number') return;
      var prompt = clean(stripTags(stripFuri(String(it.q || '').replace(/^Điền mẫu ngữ pháp thích hợp:\s*/, ''))));
      if (prompt.indexOf('＿＿') < 0 && prompt.indexOf('（　）') < 0) {
        // FIX2 (30/10): quiz ngữ pháp KHÔNG có chỗ trống (chọn mẫu/câu
        // đúng) — bản cũ bỏ hẳn (381 câu ở 5 cấp). Nay đưa vào pool
        // dạng câu hỏi TRỰC TIẾP (giữ nguyên câu hỏi + đáp án của bài
        // học, sinh câu bằng qTonghopDirect) khi có truyền mảng
        // directs; lời giải thích tiếng Việt lấy từ it.a như fills.
        if (directs) {
          var dOpts = uniq(it.o.map(function (o) { return clean(stripTags(stripFuri(o))); })).filter(function (x) { return x; });
          var dCorr = clean(stripTags(stripFuri(it.o[it.c] || '')));
          var dExpl = clean(stripTags(stripFuri(String(it.a || ''))));
          var dVi = dExpl.indexOf(' — ') >= 0 ? dExpl.split(' — ').slice(1).join(' — ') : '';
          if (dCorr && dOpts.length >= 3 && dOpts.indexOf(dCorr) >= 0 && prompt && prompt.length <= 220) {
            targets.push(dCorr);
            directs.push({ prompt: prompt, options: dOpts, correct: dCorr, meaning: dVi, lesson: lessonId, type: 'grammar' });
          }
        }
        return;
      }
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
  /* FIX2 (30/10): thẻ ngữ pháp hỏi–đáp của các bài Ngữ pháp N1 lẻ
   * (gói lessons): quiz không có o/c, q dạng "〜が早いか nghĩa là
   * gì?", a là nghĩa tiếng Việt. Không có đáp án nhiễu trong nguồn
   * nên sinh câu trắc nghiệm bằng cách lấy nghĩa của các thẻ khác
   * trong cùng cấp làm nhiễu (qGramCard). */
  function parseGrammarCards(quiz, lessonId, cards) {
    (quiz || []).forEach(function (it) {
      if (!it || it.o) return;
      var q = clean(stripTags(stripFuri(String(it.q || ''))));
      var m = /^(.+?)\s*nghĩa là gì\?\s*$/.exec(q);
      if (!m) return;
      var ans = clean(stripTags(stripFuri(String(it.a || ''))));
      if (!ans || ans.length > 80) return;
      cards.push({ pattern: m[1].trim(), answerText: ans, lesson: lessonId });
    });
  }
  function qGramCard(card, cards, r) {
    var wrongs = uniq(cards.map(function (c) { return c.answerText; }))
      .filter(function (x) { return x && x !== card.answerText; });
    if (wrongs.length < 3) return null;
    wrongs = shuffle(wrongs, r).slice(0, 3);
    var c = makeChoices(card.answerText, wrongs, r);
    return { type: 'grammar', prompt: 'Mẫu ' + card.pattern, promptSub: 'Mẫu ngữ pháp này nghĩa là gì?', choices: c.choices, answer: c.answer, answerText: card.answerText };
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

  /* ---------------- Tổng hợp: mcq[] sẵn đáp án + bảng từ chặt chẽ ----------------
   * Bài tonghop có trường mcq[] dạng {q, o[], c, a} GIỐNG hệt quiz ngữ
   * pháp (đã kiểm chứng trên dữ liệu thật: N1 9 câu, N2 14 câu, tất cả
   * đều có o/c hợp lệ). Câu có chỗ trống （　）/＿＿ đi qua cùng đường
   * fills như np; câu không chỗ trống (đọc/gạch chân) dựng thẳng thành
   * Question trắc nghiệm. Nghĩa lấy từ thẻ <i>…</i> đầu trường a.
   * CHỈ dùng cho topic mix (đúng bản chất "tổng hợp"). */
  function tonghopMeaning(a) {
    var m = /<i>([\s\S]*?)<\/i>/.exec(String(a || ''));
    return m ? clean(stripTags(stripFuri(m[1]))) : '';
  }
  function parseTonghopMcq(mcq, lessonId, fills, directs, targets) {
    (mcq || []).forEach(function (it) {
      if (!it || !Array.isArray(it.o) || typeof it.c !== 'number') return;
      var prompt = clean(stripTags(stripFuri(String(it.q || '')))).replace(/^Câu\s*\d+\s*[.:]?\s*/, '');
      if (!prompt || prompt.length > 220) return;
      var opts = uniq(it.o.map(function (o) { return clean(stripTags(stripFuri(o))); }))
        .filter(function (x) { return x; });
      var correct = clean(stripTags(stripFuri(it.o[it.c] || '')));
      if (!correct || opts.length < 3 || opts.indexOf(correct) < 0) return;
      var meaning = tonghopMeaning(it.a);
      targets.push(correct);
      // Chỗ trống: ＿＿ hoặc （　）— lưu ý clean() đã gấp khoảng trắng
      // toàn chiều U+3000 trong （　） thành space thường nên phải test
      // bằng \s, nếu test chuỗi cứng '（　）' sẽ không bao giờ khớp.
      if (/＿＿|（\s）/.test(prompt)) {
        var distract = opts.filter(function (x) { return x !== correct; });
        fills.push({
          prompt: prompt, answerText: correct, distractors: distract,
          meaning: meaning, lesson: lessonId,
          type: (isParticle(correct) && distract.every(isParticle)) ? 'part' : 'fill'
        });
      } else {
        // Câu đọc từ gạch chân: đáp án là cách đọc (toàn kana) -> 'kanji';
        // đáp án chứa kanji (chọn chữ/từ đúng) -> 'vocab'.
        var kanaOnly = function (s) { return /^[ぁ-ゖァ-ヺー・]+$/.test(s); };
        directs.push({
          prompt: prompt, options: opts, correct: correct,
          meaning: meaning, lesson: lessonId,
          type: kanaOnly(correct) ? 'kanji' : 'vocab'
        });
      }
    });
  }
  // Bảng từ tonghop: [Từ, Cách đọc, Nghĩa, Câu ví dụ] với từ viết thường
  // (không {furigana}). Điều kiện CHẶT để không nuốt nhầm bảng đáp án:
  // từ không bắt đầu bằng số thứ tự "1.", có kanji, ≤12 ký tự; cách đọc
  // THUẦN kana; nghĩa ≥2 ký tự. (Đã đối chiếu tay 2 bài thật: trúng đúng
  // 5/5 từ thật mỗi bài, loại hết các hàng đáp án/giải thích.)
  function parseTonghopVocabTable(html, lessonId, entries) {
    tableRows(html).forEach(function (cells) {
      if (cells.length < 4) return;
      var word = clean(stripTags(stripFuri(cells[0])));
      var reading = clean(stripTags(stripFuri(cells[1])));
      // FIX2 (30/10): chọn ô NGHĨA theo biến thể bảng thực tế:
      // (a) cột ghi chú loại từ ("từ thuần Nhật", "từ ngoại lai"...)
      //     chen giữa -> nghĩa ở ô kế tiếp;
      // (b) bảng có cột Hán Việt [Từ, Cách đọc, Hán Việt, Nghĩa] với
      //     ô Hán Việt là "—" -> nghĩa ở ô kế tiếp;
      // (c) chuẩn [Từ, Cách đọc, Nghĩa, Ví dụ] -> nghĩa ở ô 2.
      var note = clean(stripTags(cells[2]));
      var meaningCell = cells[2];
      if (cells.length >= 4 && note.length <= 30 && /thuần Nhật|ngoại lai/.test(note)) meaningCell = cells[3];
      else if (cells.length >= 4 && (note === '—' || note === '-' || note === '')) meaningCell = cells[3];
      // stripFuri trước để nghĩa không dính markup {漢字|đọc} thô
      // (vd nghĩa của ジレンマ chứa "{陥|おちい}る" trong nguồn).
      var meaning = cleanMeaning(stripTags(stripFuri(String(meaningCell).split(/<div class="ix">/)[0])));
      if (!word || word.length > 12) return;
      // FIX2: nhận cả từ THUẦN KANA (phó từ/từ ngoại lai N1 như
      // おろそか, きっぱり — bản cũ bắt buộc có kanji nên loại 157
      // mục thật); vẫn chặn hàng đáp án bằng các điều kiện còn lại.
      if (!hasKanji(word) && !/^[ぁ-ゖァ-ヺー・〜～]+$/.test(word)) return;
      if (/^\d/.test(word) || word.indexOf('{') >= 0) return;
      // Cách đọc "—"/trống trong nguồn = nguồn không ghi cách đọc:
      // giữ mục với reading rỗng (vẫn hỏi được nghĩa), thay vì loại.
      if (reading === '—' || reading === '-') reading = '';
      if (reading && !/^[ぁ-ゖァ-ヺー・〜～]+$/.test(reading)) return;
      if (!meaning || meaning.length < 2) return;
      entries.push({ word: word, reading: reading, meaning: meaning, lesson: lessonId, ex: null });
    });
  }

  /* ---------------- Sắp xếp câu: cắt câu ngắn thành 3–5 mảnh ---------------- */
  function segmentSentence(s) {
    var t = String(s || '').replace(/[。．]$/, '');
    // FIX2 (30/10): nới biên độ dài 8–30 -> 6–48 ký tự và số mảnh
    // 3–5 -> 3–6: bản cũ loại 54 câu ví dụ nguồn (quá dài >30 ký tự
    // là chính) khỏi dạng câu sắp xếp dù nội dung hoàn toàn dùng được.
    if (t.length < 6 || t.length > 48) return null;
    var pts = [], i;
    for (i = 2; i < t.length - 1; i++) {
      if ('はがをにへでともか、'.indexOf(t[i]) >= 0) pts.push(i + 1);
    }
    var cuts = [], last = 0;
    for (i = 0; i < pts.length && cuts.length < 5; i++) {
      var p = pts[i];
      if (p - last >= 3 && t.length - p >= 3) { cuts.push(p); last = p; }
    }
    if (cuts.length < 2) { // không đủ điểm cắt tự nhiên -> cắt đều
      var n = t.length >= 24 ? 5 : (t.length >= 15 ? 4 : 3), step = Math.floor(t.length / n);
      cuts = []; for (i = 1; i < n; i++) cuts.push(step * i);
    }
    var segs = [], prev = 0;
    cuts.forEach(function (c) { segs.push(t.slice(prev, c)); prev = c; });
    segs.push(t.slice(prev));
    segs = segs.filter(function (x) { return x.length > 0; });
    if (segs.length < 3 || segs.length > 6) return null;
    return { tokens: segs, answerText: t + '。' };
  }

  /* ---------------- Dựng pool theo (level, section, nguồn), cache trong phiên ----------------
   * Nguồn 'full' (đã đăng nhập, giải mã gói enc trên máy) dùng TOÀN BỘ bài;
   * nguồn 'free' giữ nguyên hành vi cũ. Cache theo (level, section, nguồn);
   * đổi phiên/khoá -> checkSessionEpoch() bỏ toàn bộ cache. */
  var poolCache = {}; // key level/section@nguồn -> Promise<pool>
  function buildPoolFrom(levelLow, section, lessons, src) {
    var pool = {
      vocab: [], kanji: [], kanjiSingle: [],
      fills: [], examples: [], gramTargets: [], directs: [], gramCards: [],
      tonghopVocab: [], tonghopFills: [], tonghopDirects: [],
      src: src
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
        parseQuizGrammar(lesson.quiz, lesson.id, pool.fills, pool.gramTargets, pool.directs);
        parseGrammarCards(lesson.quiz, lesson.id, pool.gramCards);
        secs.forEach(function (s) { parseGrammarExamples(s.html || '', lesson.id, pool.fills, pool.examples, pool.gramTargets); });
      } else if (section === 'tonghop') {
        parseTonghopMcq(lesson.mcq, lesson.id, pool.tonghopFills, pool.tonghopDirects, pool.gramTargets);
        parseQuizGrammar(lesson.quiz, lesson.id, pool.tonghopFills, pool.gramTargets, pool.tonghopDirects);
        secs.forEach(function (s) { parseTonghopVocabTable(s.html || '', lesson.id, pool.tonghopVocab); });
      }
    });
    // Khử trùng entries theo word+reading+NGHĨA. FIX2 (30/10): bản cũ
    // khử theo word+reading nên nuốt mất mọi mục đồng âm/đồng tự khác
    // nghĩa (đo được: N3 từ vựng mất 291 mục khác nghĩa, N4 mất 115,
    // N5 mất 77). Nay chỉ gộp khi trùng CẢ nghĩa (trùng tuyệt đối giữa
    // bảng và quiz của cùng bài), mục khác nghĩa được giữ lại hết.
    ['vocab', 'kanji', 'kanjiSingle', 'tonghopVocab'].forEach(function (k) {
      var seen = {};
      pool[k] = pool[k].filter(function (e) {
        var kk = e.word + '|' + (e.reading || '') + '|' + (e.meaning || '');
        if (seen[kk] || !e.word) return false; seen[kk] = 1; return true;
      });
    });
    pool.gramTargets = uniq(pool.gramTargets);
    // Khử trùng thẻ ngữ pháp theo mẫu+nghĩa (trùng tuyệt đối giữa các bài).
    var seenCards = {};
    pool.gramCards = pool.gramCards.filter(function (c) {
      var kk = c.pattern + '|' + c.answerText;
      if (seenCards[kk]) return false; seenCards[kk] = 1; return true;
    });
    return pool;
  }
  function buildPoolFree(levelLow, section) {
    var key = levelLow + '/' + section + '@free';
    if (poolCache[key]) return poolCache[key];
    var p = freeList(levelLow, section).then(function (list) {
      var free = (list.lessons || []).filter(function (x) { return x.free; });
      if (!free.length) throw new Error('EMPTY');
      // XOAY BÀI theo phiên: xoay danh sách free bắt đầu từ cursor đã
      // lưu rồi tải HẾT (không cắt cửa sổ nữa). Vì đã tải hết, cursor
      // chủ yếu đổi THỨ TỰ ưu tiên (bài ở đầu được khử trùng trước,
      // bài lỗi mạng ở các phiên khác nhau cũng khác nhau); bước nhảy
      // cursor = một nửa vòng để phiên sau bắt đầu ở vùng bài khác.
      var ck = 'hn_game_q_cursor_' + levelLow + '_' + section;
      var cursor = 0;
      try { cursor = parseInt(localStorage.getItem(ck) || '0', 10) || 0; } catch (e) { /* bỏ qua */ }
      var start = ((cursor % free.length) + free.length) % free.length;
      var ordered = free.slice(start).concat(free.slice(0, start));
      var stride = free.length > 1 ? Math.max(1, Math.floor(free.length / 2)) : 0;
      try { localStorage.setItem(ck, String((start + stride) % free.length)); } catch (e) { /* bỏ qua */ }
      return fetchLessons(levelLow, section, ordered.map(function (x) { return x.id; }));
    }).then(function (lessons) {
      if (!lessons.length) throw new Error('EMPTY');
      return buildPoolFrom(levelLow, section, lessons, 'free');
    }).catch(function (e) {
      delete poolCache[key];
      if (e && e.message === 'EMPTY') throw new Error('Chưa có bài học mở miễn phí cho phần này. Thử trình độ/chủ đề khác nhé!');
      throw new Error('Không tải được câu hỏi từ bài học (mạng chậm hoặc máy chủ bận). Thử lại sau một chút nhé!');
    });
    poolCache[key] = p;
    return p;
  }
  function buildPool(levelLow, section) {
    checkSessionEpoch();
    return resolveFullLessons(levelLow, section).then(function (full) {
      if (full && full.length) {
        var key = levelLow + '/' + section + '@full:' + fullKeyFp;
        if (!poolCache[key]) poolCache[key] = Promise.resolve(buildPoolFrom(levelLow, section, full, 'full'));
        return poolCache[key];
      }
      return buildPoolFree(levelLow, section);
    });
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

  function qTonghopDirect(d, r) {
    var wrongs = shuffle(d.options.filter(function (x) { return x !== d.correct; }), r).slice(0, 3);
    if (wrongs.length < 2) return null;
    var c = makeChoices(d.correct, wrongs, r);
    return { type: d.type, prompt: d.prompt, promptSub: 'Chọn đáp án đúng', choices: c.choices, answer: c.answer, answerText: d.correct, meaning: d.meaning || undefined };
  }

  /* Gom "máy sinh câu" theo TỪNG section (bucket) để mix chia đều.
   * Mỗi gen ghi rõ section + lesson gốc phục vụ id ổn định và để KHÔNG
   * bao giờ lấy câu ngoài section của topic. */
  function collectGens(P, topic, r) {
    var buckets = { kj: [], tv: [], np: [], tonghop: [] };
    function push(bucket, section, lesson, make) { buckets[bucket].push({ section: section, lesson: lesson, make: make }); }
    if ((topic === 'kanji' || topic === 'mix') && P.kj) {
      P.kj.kanji.forEach(function (e) {
        push('kj', 'kj', e.lesson, function () { return qKanjiReading(e, P.kj.kanji, r); });
        push('kj', 'kj', e.lesson, function () { return qKanjiMeaning(e, P.kj.kanji, r); });
      });
      P.kj.kanjiSingle.forEach(function (e) {
        push('kj', 'kj', e.lesson, function () { return qKanjiMeaning(e, P.kj.kanjiSingle.concat(P.kj.kanji), r); });
        push('kj', 'kj', e.lesson, function () { return qKanjiReading(e, P.kj.kanjiSingle, r); });
      });
    }
    if ((topic === 'vocab' || topic === 'mix') && P.tv) {
      P.tv.vocab.forEach(function (e) {
        push('tv', 'tv', e.lesson, function () { return qVocabMeaning(e, P.tv.vocab, r); });
        push('tv', 'tv', e.lesson, function () { return qVocabReading(e, P.tv.vocab, r); });
        push('tv', 'tv', e.lesson, function () { return qVocabReverse(e, P.tv.vocab, r); });
        push('tv', 'tv', e.lesson, function () { return qVocabFill(e, P.tv.vocab, r); });
      });
    }
    if ((topic === 'grammar' || topic === 'mix') && P.np) {
      P.np.fills.forEach(function (f) { push('np', 'np', f.lesson, function () { return qFill(f, P.np, r); }); });
      // FIX2: câu hỏi ngữ pháp trực tiếp (quiz không chỗ trống) — sinh
      // bằng cùng máy qTonghopDirect, giữ nguyên đáp án của bài học.
      if (P.np.directs) P.np.directs.forEach(function (d) { push('np', 'np', d.lesson, function () { return qTonghopDirect(d, r); }); });
      // FIX2: thẻ ngữ pháp hỏi–đáp của bài lẻ N1 (nghĩa làm đáp án,
      // nhiễu là nghĩa của các thẻ khác cùng cấp).
      if (P.np.gramCards) P.np.gramCards.forEach(function (cd) { push('np', 'np', cd.lesson, function () { return qGramCard(cd, P.np.gramCards, r); }); });
      var orderSrc = P.np.examples.slice();
      if (P.tv) P.tv.vocab.forEach(function (e) { if (e.ex && e.ex.jp) orderSrc.push({ jp: e.ex.jp, vi: e.ex.vi, lesson: e.lesson, __sec: 'tv' }); });
      orderSrc.forEach(function (ex) { push('np', ex.__sec || 'np', ex.lesson, function () { return qOrder(ex, r); }); });
    }
    if (topic === 'mix' && P.tonghop) {
      P.tonghop.tonghopVocab.forEach(function (e) {
        push('tonghop', 'tonghop', e.lesson, function () { return qVocabMeaning(e, P.tonghop.tonghopVocab, r); });
        push('tonghop', 'tonghop', e.lesson, function () { return qVocabReading(e, P.tonghop.tonghopVocab, r); });
        push('tonghop', 'tonghop', e.lesson, function () { return qVocabReverse(e, P.tonghop.tonghopVocab, r); });
      });
      P.tonghop.tonghopFills.forEach(function (f) { push('tonghop', 'tonghop', f.lesson, function () { return qFill(f, P.tonghop, r); }); });
      P.tonghop.tonghopDirects.forEach(function (d) { push('tonghop', 'tonghop', d.lesson, function () { return qTonghopDirect(d, r); }); });
    }
    return buckets;
  }
  // id ổn định của một câu: hash(level|section|lesson|prompt|answerText)
  function makeQid(levelLow, section, lesson, q) {
    return 'q' + hashStr(levelLow + '|' + section + '|' + (lesson || '') + '|' + (q.prompt || '') + '|' + q.answerText).toString(36);
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
    checkSessionEpoch();
    if (!/^n[1-5]$/.test(levelLow)) {
      return Promise.reject(new Error('Trình độ chưa đúng. Chọn N5–N1 nhé!'));
    }
    var sections = topic === 'mix' ? TOPIC_SECTIONS.mix.concat(['tonghop']) : TOPIC_SECTIONS[topic];
    return Promise.all(sections.map(function (s) {
      return buildPool(levelLow, s).then(function (p) { return { section: s, pool: p }; })
        .catch(function (e) { return { section: s, pool: null, error: e }; });
    })).then(function (loaded) {
      var okPools = loaded.filter(function (x) { return x.pool; });
      if (!okPools.length) throw (loaded[0] && loaded[0].error) || new Error('Không tải được câu hỏi. Thử lại sau nhé!');
      var P = {};
      okPools.forEach(function (x) { P[x.section] = x.pool; });

      // Gom gens theo bucket section; mix sẽ lấy VÒNG TRÒN đều các
      // bucket thay vì dồn vào bucket nhiều gen nhất.
      var buckets = collectGens(P, topic, r);
      var bucketNames = Object.keys(buckets).filter(function (k) { return buckets[k].length; });
      var totalGens = bucketNames.reduce(function (n, k) { return n + buckets[k].length; }, 0);
      if (!totalGens) throw new Error('Bài học chưa đủ dữ kiện để tạo câu hỏi cho phần này. Thử chủ đề khác nhé!');

      // CHỐNG LẶP (nhánh Q): ưu tiên tuyệt đối câu CHƯA từng phát —
      // theo sổ bền hn_game_seen_q VÀ tập trong phiên SESSION_SEEN.
      // Câu đã thấy (hoặc câu 'order' vượt trần ~1/3) bị hoãn vào
      // fallback; chỉ khi chưa đủ count mới lấy lại, ƯU TIÊN câu bị
      // hoãn vì trần order (vẫn là câu mới) rồi đến câu đã thấy CŨ
      // NHẤT (theo thứ tự trong sổ bền).
      var seenArr = loadSeen();
      var seenIdx = {};
      seenArr.forEach(function (id, i) { seenIdx[id] = i; });
      function isSeen(id) { return (id in seenIdx) || !!SESSION_SEEN[id]; }

      var queues = bucketNames.map(function (name) {
        return { gens: shuffle(buckets[name], r), i: 0 };
      });
      var out = [], fallback = [], usedKey = {}, orderSeen = {};
      var orderCap = Math.max(1, Math.round(count / 3)); // tối đa ~1/3 câu sắp xếp mỗi màn
      var orderUsed = 0;
      var remaining = totalGens;
      while (out.length < count && remaining > 0) {
        var progressed = false;
        for (var qi = 0; qi < queues.length && out.length < count; qi++) {
          var qu = queues[qi];
          if (qu.i >= qu.gens.length) continue;
          progressed = true;
          var g = qu.gens[qu.i++]; remaining--;
          var q = null;
          try { q = g.make(); } catch (e) { q = null; }
          if (!q) continue;
          q.id = makeQid(levelLow, g.section, g.lesson, q);
          // Truy vết nguồn (ĐỢT 7 · P1, additive): bài gốc + nguồn dữ liệu.
          q.lesson = g.lesson || undefined;
          q.src = (P[g.section] && P[g.section].src) || 'free';
          var key = q.type + '|' + q.prompt + '|' + q.answerText;
          if (usedKey[key] || usedKey['id:' + q.id]) continue;
          if (q.type === 'order') {
            if (orderSeen[q.answerText]) continue;
            orderSeen[q.answerText] = 1;
            if (orderUsed >= orderCap) { usedKey[key] = 1; usedKey['id:' + q.id] = 1; fallback.push({ q: q, fresh: !isSeen(q.id) }); continue; }
          }
          usedKey[key] = 1; usedKey['id:' + q.id] = 1;
          if (isSeen(q.id)) { fallback.push({ q: q, fresh: false }); continue; }
          out.push(q);
          if (q.type === 'order') orderUsed++;
        }
        if (!progressed) break;
      }
      if (out.length < count && fallback.length) {
        fallback.sort(function (a, b) {
          if (a.fresh !== b.fresh) return a.fresh ? -1 : 1; // câu mới (hoãn vì trần order) trước
          var ia = a.q.id in seenIdx ? seenIdx[a.q.id] : 1e9; // rồi câu đã thấy cũ nhất
          var ib = b.q.id in seenIdx ? seenIdx[b.q.id] : 1e9;
          return ia - ib;
        });
        for (var fi = 0; fi < fallback.length && out.length < count; fi++) out.push(fallback[fi].q);
      }
      if (out.length < Math.min(count, 3)) {
        throw new Error('Chưa gom đủ câu hỏi cho màn này. Thử lại hoặc đổi chủ đề nhé!');
      }
      var finalQs = out.slice(0, count);
      // Ghi sổ: id đã phát vào SESSION_SEEN + sổ bền (id được phát lại
      // thì dời xuống cuối sổ = "mới thấy lại", FIFO cắt ở SEEN_CAP).
      var finalIds = {};
      finalQs.forEach(function (q) { SESSION_SEEN[q.id] = 1; finalIds[q.id] = 1; });
      var kept = seenArr.filter(function (id) { return !finalIds[id]; });
      finalQs.forEach(function (q) { kept.push(q.id); });
      saveSeen(kept);
      return finalQs;
    });
  }

  ROOT.GQ = { getQuestions: getQuestions, _version: 'b7-p1' };
  if (typeof module !== 'undefined' && module.exports) module.exports = ROOT.GQ;
})();
