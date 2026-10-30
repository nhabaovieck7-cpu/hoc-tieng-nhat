// =====================================================================
// challenge-codec.js — Mã thách đấu TỰ CHỨA (Thách Đấu Bạn Bè)
// Mã = 'HN1-' + base64url(JSON{v, seed, level, topic, count, qids,
//        from:{name, score, ok, ms}, t})
// Mang đủ dữ kiện để máy người nhận dựng lại đúng bộ câu (theo qids)
// và có điểm chuẩn so sánh — KHÔNG cần server. Lớp link ngắn phía
// server (worker-additions/challenge.js) chỉ là tuỳ chọn rút gọn.
// =====================================================================
(function () {
  'use strict';
  function b64urlEncode(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlDecode(s) {
    s = String(s || '').replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    var bin = atob(s);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  // Bản chụp câu hỏi (tuỳ chọn, mã mới): giữ đúng các trường cần dựng lại
  // câu (loại/bài/prompt/sub/đáp án + lựa chọn hoặc mảnh sắp xếp), cắt
  // độ dài từng trường để mã không phình vô hạn.
  function sanitizeQs(qs) {
    if (!Array.isArray(qs)) return undefined;
    function s(v, n) { return String(v == null ? '' : v).slice(0, n); }
    function arr(v) { return Array.isArray(v) ? v.slice(0, 12).map(function (x) { return s(x, 120); }) : null; }
    return qs.slice(0, 40).map(function (q) {
      if (!q || typeof q !== 'object') return null;
      return { t: s(q.t, 12), l: s(q.l, 40), p: s(q.p, 160), s: s(q.s, 160), a: s(q.a, 160), c: arr(q.c), k: arr(q.k) };
    }).filter(Boolean);
  }
  function encode(ch) {
    var obj = {
      v: 1,
      seed: String(ch.seed || ''),
      level: ch.level || 'N5',
      topic: ch.topic || 'mix',
      count: ch.count || 10,
      qids: Array.isArray(ch.qids) ? ch.qids.slice(0, 40) : [],
      qs: sanitizeQs(ch.qs),
      from: {
        name: String((ch.from && ch.from.name) || '').slice(0, 40),
        score: Math.max(0, Math.floor(+((ch.from && ch.from.score) || 0))),
        ok: Math.max(0, Math.floor(+((ch.from && ch.from.ok) || 0))),
        ms: Math.max(0, Math.floor(+((ch.from && ch.from.ms) || 0)))
      },
      t: Date.now()
    };
    return 'HN1-' + b64urlEncode(JSON.stringify(obj));
  }
  function decode(code) {
    try {
      code = String(code || '').trim();
      if (code.indexOf('HN1-') !== 0) return null;
      var obj = JSON.parse(b64urlDecode(code.slice(4)));
      if (!obj || obj.v !== 1) return null;
      if (!obj.seed || !Array.isArray(obj.qids) || !obj.qids.length) return null;
      if (!obj.from || typeof obj.from.score !== 'number') return null;
      return obj;
    } catch (e) { return null; }
  }
  // Phán quyết so kết quả: người nhận (me) vs người thách (from)
  function verdict(me, from) {
    if (me.ok !== from.ok) return me.ok > from.ok ? 'win' : 'lose';
    if (me.score !== from.score) return me.score > from.score ? 'win' : 'lose';
    if (me.ms !== from.ms) return me.ms < from.ms ? 'win' : 'lose';
    return 'draw';
  }
  window.GCHALLENGE = { encode: encode, decode: decode, verdict: verdict };
})();
