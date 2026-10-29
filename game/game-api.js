// =====================================================================
// game-api.js — NHÁNH 5: window.GAME_API (xem CONTRACT.md)
//   { isGuest, getProgress(), saveProgress(patch), submitScore({...}),
//     leaderboard({cat, level}), chatSend(text) }
//
// Nguyên tắc: KHÔNG BAO GIỜ ném lỗi ra UI. Khách / mất mạng / máy chủ lỗi
// -> rơi về localStorage:
//   hn_game_progress        cây tiến độ (cùng cấu trúc máy chủ key 'main':
//                           {campaign:{'N5-kanji':{stars:{},unlocked,best}},
//                            totals:{score,bossWins}})
//   hn_game_scores_local    điểm các lượt chơi lưu tạm (tối đa 200 lượt)
// Phiên đăng nhập: ưu tiên AUTH.session() của auth.js nếu trang đã nạp;
// không có thì đọc thẳng localStorage khoá SK='hn_sess_v1' — ĐÚNG khoá
// auth.js định nghĩa (const SK='hn_sess_v1' trong live-ref/auth.js).
// Endpoint: ưu tiên GAME_ENDPOINT (staging đặt sẵn), rồi SITE.aiEndpoint
// từ ../config.js khi đăng thật, cuối cùng là địa chỉ Worker mặc định.
// =====================================================================
(function () {
  'use strict';
  var DEFAULT_ENDPOINT = 'https://hoc-tieng-nhat-ai.nhabaovieck7.workers.dev';
  var SK = 'hn_sess_v1';
  var LS_PROG = 'hn_game_progress';
  var LS_SCORES = 'hn_game_scores_local';
  var PROG_KEY = 'main';

  function endpoint() {
    var ep = '';
    if (typeof window !== 'undefined' && window.GAME_ENDPOINT) ep = window.GAME_ENDPOINT;
    else if (typeof SITE !== 'undefined' && SITE.aiEndpoint) ep = SITE.aiEndpoint;
    else ep = DEFAULT_ENDPOINT;
    return String(ep || '').replace(/\/$/, '');
  }
  function session() {
    try { if (window.AUTH && typeof AUTH.session === 'function') return AUTH.session() || ''; } catch (e) {}
    try { return localStorage.getItem(SK) || ''; } catch (e) { return ''; }
  }
  function isGuestNow() { return !session(); }

  function lsGet(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  // Gộp tiến độ: số lấy MAX (sao/mở khoá/điểm cao không bao giờ tụt),
  // đối tượng gộp đệ quy, còn lại (chuỗi/mảng/boolean) lấy bản mới (b).
  function deepMergeMax(a, b) {
    if (b === null || b === undefined) return a;
    if (typeof b === 'number' && typeof a === 'number') return Math.max(a, b);
    if (b && a && typeof b === 'object' && typeof a === 'object' && !Array.isArray(b) && !Array.isArray(a)) {
      var out = {}, k;
      for (k in a) if (Object.prototype.hasOwnProperty.call(a, k)) out[k] = a[k];
      for (k in b) if (Object.prototype.hasOwnProperty.call(b, k)) out[k] = deepMergeMax(a[k], b[k]);
      return out;
    }
    return b;
  }
  function localProgress() {
    var p = lsGet(LS_PROG, null);
    return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {};
  }

  // fetch có hẹn giờ 8s; lỗi gì cũng trả null (không ném).
  function api(path, opts) {
    opts = opts || {};
    var tok = session();
    if (!tok) return Promise.resolve(null);
    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    return fetch(endpoint() + path, {
      method: opts.method || 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: ctrl ? ctrl.signal : undefined,
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (timer) clearTimeout(timer);
        j._status = r.status;
        return j;
      });
    }).catch(function () { if (timer) clearTimeout(timer); return null; });
  }

  // getProgress(): Promise<object> — cây tiến độ (key 'main').
  // Đăng nhập + có mạng: lấy bản máy chủ, gộp MAX với bản local (tiến độ
  // chơi khi còn là khách không bị mất), lưu lại local; nếu bản gộp khác
  // bản máy chủ thì đẩy lên luôn. Khách/offline: trả bản local.
  function getProgress() {
    var local = localProgress();
    if (isGuestNow()) return Promise.resolve(local);
    return api('/game/progress').then(function (j) {
      if (!j || !j.ok || !j.items) return local;
      var server = {};
      var item = j.items[PROG_KEY];
      if (item && item.v) { try { server = JSON.parse(item.v) || {}; } catch (e) { server = {}; } }
      var merged = deepMergeMax(server, local);
      lsSet(LS_PROG, merged);
      if (JSON.stringify(merged) !== JSON.stringify(server)) {
        api('/game/progress', { method: 'POST', body: { key: PROG_KEY, data: merged } });
      }
      return merged;
    });
  }

  // saveProgress(patch): gộp patch vào cây tiến độ local (ngay lập tức),
  // đăng nhập thì đẩy cả cây lên máy chủ. Trả Promise<{ok, synced}>.
  function saveProgress(patch) {
    var merged = deepMergeMax(localProgress(), (patch && typeof patch === 'object') ? patch : {});
    lsSet(LS_PROG, merged);
    if (isGuestNow()) return Promise.resolve({ ok: true, synced: false, progress: merged });
    return api('/game/progress', { method: 'POST', body: { key: PROG_KEY, data: merged } }).then(function (j) {
      return { ok: true, synced: !!(j && j.ok), progress: merged };
    });
  }

  // submitScore({mode, level, score, durationMs}): luôn lưu local trước;
  // đăng nhập thì gửi máy chủ (máy chủ kiểm trần điểm — bị từ chối thì
  // trả {ok:false, error} để UI báo nhẹ, KHÔNG ném lỗi).
  function submitScore(s) {
    s = s || {};
    var rec = { mode: s.mode, level: s.level, score: s.score, durationMs: s.durationMs, at: new Date().toISOString() };
    var list = lsGet(LS_SCORES, []);
    if (!Array.isArray(list)) list = [];
    list.push(rec);
    if (list.length > 200) list = list.slice(list.length - 200);
    lsSet(LS_SCORES, list);
    if (isGuestNow()) return Promise.resolve({ ok: true, local: true });
    return api('/game/score', { method: 'POST', body: { mode: s.mode, level: s.level, score: s.score, durationMs: s.durationMs } }).then(function (j) {
      if (!j) return { ok: true, local: true, offline: true };
      if (j.ok) return { ok: true, synced: true };
      return { ok: false, error: j.error || 'Máy chủ chưa ghi nhận điểm này', status: j._status };
    });
  }

  // leaderboard({cat:'week'|'total', level}): khách/offline -> danh sách
  // rỗng + tổng điểm local của chính mình (để UI vẫn hiện được gì đó).
  function leaderboard(q) {
    q = q || {};
    var cat = (q.cat === 'total') ? 'total' : 'week';
    var localTotal = lsGet(LS_SCORES, []).reduce(function (sum, r) { return sum + (+r.score || 0); }, 0);
    var fallback = { ok: false, cat: cat, level: q.level || 'all', list: [], me: { rank: null, name: '', score: localTotal, local: true } };
    if (isGuestNow()) { fallback.guest = true; return Promise.resolve(fallback); }
    var path = '/game/leaderboard?cat=' + encodeURIComponent(cat) + (q.level ? '&level=' + encodeURIComponent(q.level) : '');
    return api(path).then(function (j) {
      if (!j || !j.ok) return fallback;
      return j;
    });
  }

  // chatSend(text): cho nhánh 6 (Chém gió). -> {ok:true, message} hoặc
  // {ok:false, error:'...'} (kèm cả hai trường: CONTRACT ghi {error},
  // chat.js của nhánh 6 kiểm r.ok===false — khớp cả hai cách đọc).
  // Không ném lỗi.
  function chatSend(text) {
    var t = String(text == null ? '' : text).trim();
    if (!t) return Promise.resolve({ ok: false, error: 'Chưa có chữ nào để gửi' });
    if ([...t].length > 60) return Promise.resolve({ ok: false, error: 'Tin nhắn tối đa 60 ký tự thôi nhé' });
    if (isGuestNow()) return Promise.resolve({ ok: false, error: 'Khách thì chém gió bằng câu trend có sẵn thôi nhé — đăng nhập để chém chữ tự do' });
    return api('/game/chat', { method: 'POST', body: { text: t } }).then(function (j) {
      if (!j) return { ok: false, error: 'Mất mạng rồi — thử lại sau nhé' };
      if (j.ok) return { ok: true, message: j.message };
      return { ok: false, error: j.error || 'Chưa gửi được — thử lại sau nhé', status: j._status };
    });
  }

  window.GAME_API = {
    isGuest: isGuestNow(),
    getProgress: getProgress,
    saveProgress: saveProgress,
    submitScore: submitScore,
    leaderboard: leaderboard,
    chatSend: chatSend,
    // Tiện ích phụ (không thuộc CONTRACT, nhánh khác không bắt buộc dùng):
    _session: session,
    _endpoint: endpoint,
    _refresh: function () { window.GAME_API.isGuest = isGuestNow(); return window.GAME_API.isGuest; },
  };
})();
