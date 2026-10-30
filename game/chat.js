/* =====================================================================
 * chat.js — "Chém gió" dùng chung cho các trang game (NHÁNH 6).
 * Trang phòng nhóm (phong-nhom.js) gắn vào phòng; các trang game khác
 * cũng gắn được độc lập (chỉ bong bóng + câu trend, không cần phòng).
 *
 * API:
 *   GCHAT.mount({
 *     mountEl,                 // phần tử để dựng panel (nút + sheet + feed)
 *     me: {id, name},          // người chơi hiện tại
 *     call,                    // cách gọi thay {X}: 'anh' | 'chị' | tên | 'bạn' (khách)
 *     anchorFor(userKey),      // -> phần tử avatar của người đó (để neo bong bóng)
 *     onSendTrend(text),       // gửi câu trend cho cả phòng (phong-nhom nối GROOMS)
 *     onSendText(text),        // gửi tin chữ cho cả phòng (sau khi qua chatSend nếu có)
 *     lines,                   // tuỳ chọn: mảng câu trend 'chem' ghi đè nguồn mặc định
 *     teamLines,               // Việc G: mảng câu trend TỔ ĐỘI (chỉ phòng Hợp sức,
 *                              //   lấy từ GTREND_TEAM.linesFor('coop') — xem trend-team.js).
 *                              //   Có câu -> sheet thêm thẻ "🤝 Tổ đội"; rỗng/vắng -> như cũ.
 *   })
 *   GCHAT.receiveRemote({userId, name, text, kind})  // tin từ polling đổ về
 *   GCHAT.showBubble(userKey, text, {me})            // hiện bong bóng (qua hàng đợi)
 *   GCHAT.setEnabled(bool) / GCHAT.isEnabled()
 *   GCHAT.destroy()
 *
 * SỬA LỖI MẪU (bong bóng chồng nhau trong phòng nhóm):
 *   - Tối đa 3 bong bóng hiển thị CÙNG LÚC trên toàn màn (hàng đợi FIFO).
 *   - Mỗi người chơi tối đa 1 bong bóng đang hiện — câu tiếp của cùng
 *     người đó chờ trong hàng đợi.
 *   - Bong bóng được LỆCH TẦNG theo "slot" (0..2): tầng càng sâu càng
 *     đẩy lên cao thêm (chiều cao bong bóng + 10px), không đè nhau.
 *   - Tự ẩn sau ~3,4 giây (mờ dần 0,4s), hết mới nhả slot cho hàng đợi.
 *
 * Công tắc Chém gió: localStorage hn_game_chem = '0' = TẮT:
 *   ẩn mọi bong bóng + không đọc tiếng người khác. Feed chữ vẫn ghi
 *   (đó là nhật ký, không phải bong bóng). Bật lại bất cứ lúc nào.
 *
 * Tin chữ ≤60 ký tự: ưu tiên GAME_API.chatSend(text) của nhánh 5
 *   (máy chủ lọc từ tục + chống spam). Chưa có GAME_API.chatSend ->
 *   hook an toàn: lọc từ tục cơ bản NGAY Ở CLIENT + báo nhẹ trong
 *   panel, rồi mới relay qua onSendText (sự kiện phòng). Không bao
 *   giờ ném lỗi ra ngoài.
 * Mọi nội dung hiển thị đều escape / dùng textContent (chống XSS).
 * ===================================================================== */
(function () {
  'use strict';

  var CHEM_KEY = 'hn_game_chem';
  var VOICE_KEY = 'hn_game_snd_voice';
  var MAX_VISIBLE = 3;
  var SHOW_MS = 3400;
  var FADE_MS = 400;
  var SEND_GAP_MS = 3000;
  var TEXT_MAX = 60;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function clampText(s, n) { return String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, n); }

  /* ---------- Lọc từ tục cơ bản ở client (chỉ là lớp dự phòng) ---------- */
  var BAD = ['dm', 'dmm', 'dcm', 'dit', 'deo', 'vcl', 'vkl', 'vl', 'cc', 'clm', 'lon', 'cac', 'dien', 'dume', 'duma', 'cut', 'fuck', 'shit', 'bitch'];
  var BAD_PHRASES = ['oc cho', 'thang cho', 'con cho', 'vai lon', 'me may'];
  function noDau(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }
  function filterBad(s) {
    var words = String(s || '').split(/(\s+)/);
    var norm = words.map(function (w) { return noDau(w).replace(/[^a-z~]/g, ''); });
    words.forEach(function (w, i) { if (BAD.indexOf(norm[i]) >= 0) words[i] = '*'.repeat(Math.max(2, w.length)); });
    var out = words.join('');
    var flat = noDau(out);
    BAD_PHRASES.forEach(function (p) {
      var k = flat.indexOf(p);
      if (k >= 0) { out = out.slice(0, k) + '*'.repeat(p.length) + out.slice(k + p.length); flat = noDau(out); }
    });
    return out;
  }

  /* ---------- Bộ lập lịch bong bóng (logic thuần — kiểm thử được) ------
   * createBubbleScheduler({maxVisible, showMs, fadeMs, setTimeout, clearTimeout,
   *                        onShow(item, slot), onHide(item, slot)})
   * Quy tắc: tối đa maxVisible bong bóng cùng lúc; mỗi anchorKey tối đa
   * 1 bong bóng đang hiện; hàng đợi FIFO; slot = chỉ số tầng lệch vị trí. */
  function createBubbleScheduler(opts) {
    opts = opts || {};
    var maxVisible = opts.maxVisible || MAX_VISIBLE;
    var showMs = opts.showMs || SHOW_MS;
    var fadeMs = opts.fadeMs || FADE_MS;
    var st = opts.setTimeout || function (fn, ms) { return setTimeout(fn, ms); };
    var onShow = opts.onShow || function () {};
    var onHide = opts.onHide || function () {};
    var visible = []; // [{item, slot, timer}]
    var queue = [];   // [item]
    function slotFree() {
      for (var i = 0; i < maxVisible; i++) {
        if (!visible.some(function (v) { return v.slot === i; })) return i;
      }
      return -1;
    }
    function anchorBusy(key) { return visible.some(function (v) { return v.item.anchorKey === key; }); }
    function pump() {
      while (visible.length < maxVisible && queue.length) {
        var idx = -1;
        for (var i = 0; i < queue.length; i++) { if (!anchorBusy(queue[i].anchorKey)) { idx = i; break; } }
        if (idx < 0) return; // mọi câu đang chờ đều thuộc người đang có bong bóng
        var item = queue.splice(idx, 1)[0];
        var slot = slotFree();
        if (slot < 0) return;
        var rec = { item: item, slot: slot, timer: null };
        visible.push(rec);
        onShow(item, slot);
        rec.timer = st(function () { hide(rec); }, showMs);
      }
    }
    function hide(rec) {
      var i = visible.indexOf(rec);
      if (i < 0) return;
      visible.splice(i, 1);
      onHide(rec.item, rec.slot);
      // chờ mờ xong mới bơm tiếp: không bao giờ quá maxVisible bong bóng
      // trên màn cùng lúc (kể cả bong bóng đang mờ dần).
      st(pump, fadeMs);
    }
    return {
      enqueue: function (item) {
        if (!item || !item.text) return false;
        // chống dồn dập: cùng người + cùng câu đang chờ/hiện thì bỏ bản trùng
        var dup = queue.concat(visible.map(function (v) { return v.item; }))
          .some(function (x) { return x.anchorKey === item.anchorKey && x.text === item.text; });
        if (dup) return false;
        if (queue.length > 12) queue.shift();
        queue.push(item);
        pump();
        return true;
      },
      clear: function () {
        visible.slice().forEach(function (rec) { onHide(rec.item, rec.slot); });
        visible = []; queue = [];
      },
      counts: function () { return { visible: visible.length, queued: queue.length }; },
      _visible: function () { return visible.slice(); },
    };
  }

  /* Vị trí bong bóng (thuần): neo trên đầu anchor, lệch tầng theo slot.
   * Trả {left, top} đã kẹp trong khung nhìn. */
  function bubblePos(anchorRect, size, slot, viewW) {
    var left = anchorRect.left + anchorRect.width / 2 - size.w / 2;
    left = Math.max(6, Math.min(viewW - size.w - 6, left));
    var top = anchorRect.top - size.h - 8 - slot * (size.h + 10);
    return { left: Math.round(left), top: Math.round(top) };
  }

  /* ---------- Câu trend 'chem' ---------- */
  var FALLBACK_CHEM = [
    'Đỉnh nóc kịch trần bay phấp phới!', 'Ai sợ thì đi về!', '8386 mãi đỉnh mãi đỉnh!',
    'Giảm sức mạnh con tướng này giúp em!!', 'Thắng đời 1-0 ✌️', 'Tới công chuyện rồi {X} ơi!',
    'Bật chế độ bay lên! 🚀', 'やばい！Quá dữ!', '草 草 草 — cười không nổi luôn',
    'Đoán vội mà trúng luôn!', 'Slay! Ăn trọn câu này', 'Vượt mức pickleball luôn!',
    'Combo không phanh luôn!', 'Trộm vía học giỏi quá', 'Nó cứ phải gọi là nét luôn!',
    'Ủa alo? Nhanh vậy trời?', 'Keo lỳ tái châu — chơi tiếp!', '最強！Mạnh nhất rồi',
  ];
  var EMO = ['😂', '🔥', '😎', '🤯', '👏', '😭', '🫡', '💀', '🥶', '🙏', '🤣', '😤', '🍜', '🌸', '👑', '💯'];
  var lastTrendIdx = -1;
  /* Việc G: kiểu CÂU THOẠI tổ đội (Bình thường/Chất) — lưu lựa chọn
   * của người chơi, mặc định Bình thường. Độc lập với kiểu GIỌNG đọc. */
  var TEAM_STYLE_KEY = 'hn_game_team_style';
  function loadTeamStyle() {
    try { return localStorage.getItem(TEAM_STYLE_KEY) === 'chat' ? 'chat' : 'normal'; } catch (e) { return 'normal'; }
  }
  function saveTeamStyle(v) {
    try { localStorage.setItem(TEAM_STYLE_KEY, v === 'chat' ? 'chat' : 'normal'); } catch (e) {}
  }
  function normTeamEntries(arr) {
    if (!Array.isArray(arr)) return [];
    var out = [];
    arr.forEach(function (e) {
      if (typeof e === 'string' && e) out.push({ t: e, s: 'neu' });
      else if (e && typeof e.t === 'string' && e.t) out.push({ t: e.t, s: (e.s === 'win' || e.s === 'lose') ? e.s : 'neu' });
    });
    return out;
  }
  function normalizeTeamSets(opts) {
    if (opts && opts.teamSets && typeof opts.teamSets === 'object') {
      var n = normTeamEntries(opts.teamSets.normal);
      var c = normTeamEntries(opts.teamSets.chat);
      if (n.length || c.length) return { normal: n, chat: c };
      return null;
    }
    // Tương thích ngược: mảng teamLines cũ -> bộ Bình thường, trung tính.
    if (opts && Array.isArray(opts.teamLines) && opts.teamLines.length) return { normal: normTeamEntries(opts.teamLines), chat: [] };
    return null;
  }

  function trendLines(explicit) {
    if (Array.isArray(explicit) && explicit.length) return explicit.slice();
    try {
      // Nguồn chính: GTREND.TREND của nhánh 4 (đúng kho 223 câu); dự phòng window.TREND.
      var T = (typeof window !== 'undefined' && window.GTREND && window.GTREND.TREND) || (typeof window !== 'undefined' && window.TREND) || null;
      if (T) {
        var out = [];
        ['chem', 'dung', 'combo', 'vao', 'nhanh', 'thang', 'sai', 'trogiup'].forEach(function (k) {
          if (Array.isArray(T[k])) out = out.concat(T[k].slice(0, 8));
        });
        if (out.length) return out;
      }
    } catch (e) {}
    return FALLBACK_CHEM.slice();
  }
  function pickTrend(lines) {
    if (!lines.length) return '';
    var i = Math.floor(Math.random() * lines.length);
    if (lines.length > 1 && i === lastTrendIdx) i = (i + 1) % lines.length;
    lastTrendIdx = i;
    return lines[i];
  }

  /* ---------- Đọc to 1 câu cụ thể (cho tin từ người khác đổ về) ------- */
  function speakText(text) {
    try {
      if (localStorage.getItem(VOICE_KEY) === '0') return;
      if (localStorage.getItem(CHEM_KEY) === '0') return;
      // Nhánh V: ủy quyền lõi đọc chung GAME_VOICE (voice.js) — nó tự lo
      // công tắc/âm lượng/kiểu giọng + ưu tiên bản ghi ../audio-index.json
      // cho câu tiếng Nhật. Cổng CHEM_KEY ở trên vẫn giữ: tắt Chém gió thì
      // không đọc tiếng người khác dù GAME_VOICE đang bật.
      if (window.GAME_VOICE && typeof window.GAME_VOICE.speak === 'function') {
        window.GAME_VOICE.speak(text);
        return;
      }
      if (!('speechSynthesis' in window)) return;
      // GTREND lo phần đọc câu trend CỦA MÌNH (say/bubble). Ở đây cần đọc
      // ĐÚNG câu người khác gửi nên dùng speechSynthesis trực tiếp:
      // câu chứa kana -> ja-JP, còn lại vi-VN (cùng quy tắc bản mẫu).
      var u = new SpeechSynthesisUtterance(text);
      u.lang = /[぀-ヿ]/.test(text) ? 'ja-JP' : 'vi-VN';
      u.rate = 1.02;
      try { if (window.GMUSIC && GMUSIC.duck) GMUSIC.duck(true); } catch (e) {}
      u.onend = u.onerror = function () { try { if (window.GMUSIC && GMUSIC.duck) GMUSIC.duck(false); } catch (e) {} };
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function isEmojiOnly(text) { try { return /^\p{Extended_Pictographic}+$/u.test(String(text || '').replace(/\s/g, '')); } catch (e) { return false; } }

  /* ============================ GCHAT ============================ */
  var state = null; // trạng thái bản gắn hiện tại (mỗi trang gắn 1 lần)

  function chemEnabled() {
    try { return localStorage.getItem(CHEM_KEY) !== '0'; } catch (e) { return true; }
  }
  function setChemEnabled(on) {
    try { localStorage.setItem(CHEM_KEY, on ? '1' : '0'); } catch (e) {}
    if (state) {
      state.enabled = on;
      if (!on && state.scheduler) state.scheduler.clear();
      if (state.els && state.els.toggle) state.els.toggle.checked = on;
      if (state.els && state.els.root) state.els.root.classList.toggle('cg-off', !on);
      if (!on) {
        try {
          if (window.GAME_VOICE && typeof window.GAME_VOICE.stop === 'function') window.GAME_VOICE.stop();
          else speechSynthesis.cancel();
        } catch (e) {}
      }
    }
  }

  function mount(opts) {
    opts = opts || {};
    destroy();
    var mountEl = opts.mountEl;
    if (!mountEl) return null;
    var me = opts.me || { id: 'me', name: '' };
    var call = opts.call || 'bạn';
    var lines = trendLines(opts.lines);
    // Việc G: câu trend TỔ ĐỘI là preset RIÊNG hai kiểu câu do nơi gắn
    // (phòng Hợp sức) cấp qua opts.teamSets {normal, chat}; không trộn
    // vào lines chung. Kiểu câu khác hẳn kiểu GIỌNG đọc trong ⚙️.
    var teamSets = normalizeTeamSets(opts);
    var teamStyle = loadTeamStyle();
    var hasTeam = !!teamSets && (((teamSets.normal || []).length) || ((teamSets.chat || []).length));
    /* Việc G — XOAY CÂU theo tình thế + túi không lặp: câu đã phát
     * (bởi mình) bị loại khỏi lưới cho tới khi dùng hết nhóm hợp lệ
     * (thẻ tình huống khớp + thẻ trung tính) của bộ đang chọn; hết
     * nhóm thì vòng mới bắt đầu. Mỗi (bộ × tình huống) một túi riêng.
     * Tình huống do nơi gắn cấp qua opts.situationFor(); không có
     * hàm đó -> 'any' (mọi câu đều hợp lệ, vẫn áp túi không lặp). */
    var teamUsed = {};
    function currentSituation() {
      if (!opts.situationFor) return 'any';
      try {
        var s = opts.situationFor();
        return (s === 'win' || s === 'lose') ? s : 'neu';
      } catch (e) { return 'neu'; }
    }
    function teamLinesNow() {
      if (!teamSets) return [];
      var set = (teamSets[teamStyle] && teamSets[teamStyle].length) ? teamSets[teamStyle] : (teamSets.normal || []);
      var sit = currentSituation();
      var elig = sit === 'any' ? set.slice()
        : set.filter(function (e) { return e.s === sit || e.s === 'neu'; });
      var key = teamStyle + '|' + sit;
      var used = teamUsed[key] || (teamUsed[key] = {});
      var avail = elig.filter(function (e) { return !used[e.t]; });
      if (!avail.length && elig.length) { teamUsed[key] = {}; avail = elig; }
      return avail.map(function (e) { return e.t; });
    }
    function teamMarkUsed(text) {
      var key = teamStyle + '|' + currentSituation();
      (teamUsed[key] || (teamUsed[key] = {}))[text] = 1;
    }
    var enabled = chemEnabled();
    var lastSendAt = 0;

    mountEl.innerHTML =
      '<button type="button" class="cg-fab" id="cgFab" aria-haspopup="true">💬<small>Chém gió</small></button>' +
      '<div class="cg-feed" id="cgFeed"><div class="cg-feed-h"><b>💬 Phòng</b>' +
      '<label class="cg-switch" title="Bật/tắt Chém gió"><input type="checkbox" id="cgToggle"' + (enabled ? ' checked' : '') + '><span>Tắt chém gió</span></label>' +
      '<button type="button" class="cg-feed-x" id="cgFeedHide" aria-label="Ẩn khung tin">✕</button></div>' +
      '<div class="cg-list" id="cgList"></div></div>' +
      '<div class="cg-sheet hid" id="cgSheet"><div class="cg-sh">' +
      '<div class="cg-sh-h"><b class="cg-grow">Chém gió với cả phòng</b><button type="button" class="cg-x" id="cgClose">✕</button></div>' +
      '<div class="cg-tabs" id="cgTabs"><button type="button" class="on" data-t="hot">🔥 Câu trend</button>' +
      (hasTeam ? '<button type="button" data-t="team">🤝 Tổ đội</button>' : '') +
      '<button type="button" data-t="emo">😂 Biểu cảm</button></div>' +
      (hasTeam ? '<div class="cg-seg hid" id="cgSeg" role="group" aria-label="Kiểu câu thoại tổ đội"><button type="button" data-s="normal">Bình thường</button><button type="button" data-s="chat">Chất</button></div>' : '') +
      '<div class="cg-grid cg-hot" id="cgGrid"></div>' +
      '<div class="cg-row"><input id="cgIn" maxlength="' + TEXT_MAX + '" placeholder="Bình luận ngắn (tối đa ' + TEXT_MAX + ' ký tự)…" autocomplete="off">' +
      '<button type="button" class="cg-send" id="cgSend">Gửi</button></div>' +
      '<div class="cg-row cg-meta"><span class="cg-grow" id="cgHint">Lời lẽ lịch sự nha · mỗi 3 giây gửi 1 lần</span><span id="cgCnt">0/' + TEXT_MAX + '</span></div>' +
      '<label class="cg-offrow"><input type="checkbox" id="cgToggle2"' + (enabled ? ' checked' : '') + '> Đang bật Chém gió (tắt = ẩn bong bóng + không nghe tiếng người khác)</label>' +
      '</div></div>';

    var els = {
      root: mountEl, fab: mountEl.querySelector('#cgFab'), feed: mountEl.querySelector('#cgFeed'),
      list: mountEl.querySelector('#cgList'), sheet: mountEl.querySelector('#cgSheet'),
      grid: mountEl.querySelector('#cgGrid'), tabs: mountEl.querySelector('#cgTabs'),
      seg: mountEl.querySelector('#cgSeg'),
      input: mountEl.querySelector('#cgIn'), send: mountEl.querySelector('#cgSend'),
      hint: mountEl.querySelector('#cgHint'), cnt: mountEl.querySelector('#cgCnt'),
      toggle: mountEl.querySelector('#cgToggle'), toggle2: mountEl.querySelector('#cgToggle2'),
    };
    mountEl.classList.toggle('cg-off', !enabled);

    /* ----- bong bóng ----- */
    var layer = document.createElement('div');
    layer.className = 'cg-layer'; layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    var bubbleEls = new Map(); // item -> el
    var scheduler = createBubbleScheduler({
      maxVisible: MAX_VISIBLE, showMs: SHOW_MS, fadeMs: FADE_MS,
      onShow: function (item, slot) {
        if (!chemEnabled()) return;
        var anchor = null;
        try { anchor = opts.anchorFor ? opts.anchorFor(item.anchorKey) : null; } catch (e) {}
        if (!anchor || !anchor.getBoundingClientRect) return;
        var b = document.createElement('div');
        b.className = 'cg-bubble' + (item.me ? ' me' : '');
        b.textContent = item.text;
        layer.appendChild(b);
        var r = anchor.getBoundingClientRect();
        var pos = bubblePos(
          { left: r.left, top: r.top + (window.scrollY || 0), width: r.width },
          { w: b.offsetWidth || 120, h: b.offsetHeight || 36 },
          slot, window.innerWidth || 375);
        b.style.left = pos.left + 'px';
        b.style.top = pos.top + 'px';
        bubbleEls.set(item, b);
      },
      onHide: function (item) {
        var b = bubbleEls.get(item);
        if (b) { b.classList.add('out'); setTimeout(function () { b.remove(); }, FADE_MS); bubbleEls.delete(item); }
      },
    });

    function showBubble(userKey, text, o) {
      o = o || {};
      if (!chemEnabled()) return false;
      text = clampText(text, 140);
      if (!text) return false;
      return scheduler.enqueue({ anchorKey: String(userKey == null ? '' : userKey), text: text, me: !!o.me });
    }

    function feed(name, text, isMe) {
      if (!els.list) return;
      var d = document.createElement('div');
      d.className = 'cg-msg' + (isMe ? ' me' : '');
      var b = document.createElement('b'); b.textContent = name + ': ';
      d.appendChild(b); d.appendChild(document.createTextNode(text));
      els.list.appendChild(d);
      while (els.list.children.length > 30) els.list.firstChild.remove();
      els.list.scrollTop = 1e9;
    }

    function hint(msg, warn) {
      if (!els.hint) return;
      els.hint.textContent = msg;
      els.hint.style.color = warn ? 'var(--pn-gold,#d9a84e)' : '';
    }
    function sayOwn(text) {
      // Chỉ LO PHẦN TIẾNG cho câu của mình. Bong bóng do showBubble lo —
      // KHÔNG gọi GTREND.bubble ở đây: GTREND có bong bóng riêng, gọi cả
      // hai sẽ thành 2 bong bóng chồng nhau (đúng lỗi mẫu cần sửa).
      speakText(text);
    }

    /* ----- gửi ----- */
    function gateSend() {
      var now = Date.now(), wait = SEND_GAP_MS - (now - lastSendAt);
      if (wait > 0) { hint('Từ từ nha ' + call + ', ' + Math.ceil(wait / 1000) + ' giây nữa gửi tiếp được 😉', true); return false; }
      lastSendAt = now;
      hint('Lời lẽ lịch sự nha · mỗi 3 giây gửi 1 lần', false);
      return true;
    }
    function sendTrend(rawText) {
      var text = String(rawText || '').replace(/\{X\}/g, call);
      if (!gateSend()) return false;
      showBubble(me.id, text, { me: true });
      feed(call === 'bạn' ? me.name : call + ' ' + me.name, text, true);
      sayOwn(text);
      els.sheet.classList.add('hid');
      try { if (opts.onSendTrend) opts.onSendTrend(text); } catch (e) {}
      return true;
    }
    function sendText(raw) {
      var text = clampText(raw, TEXT_MAX);
      if (!text) return;
      if (!gateSend()) return;
      var done = function (finalText, note) {
        showBubble(me.id, finalText, { me: true });
        feed(call === 'bạn' ? me.name : call + ' ' + me.name, finalText, true);
        if (note) hint(note, true);
        els.sheet.classList.add('hid');
        try { if (opts.onSendText) opts.onSendText(finalText); } catch (e) {}
      };
      // Đường chính: GAME_API.chatSend của nhánh 5 (lọc + chống spam ở máy chủ).
      try {
        if (window.GAME_API && typeof GAME_API.chatSend === 'function') {
          Promise.resolve(window.GAME_API.chatSend(text)).then(function (r) {
            if (r && r.ok === false) { hint((r.error || 'Tin chưa gửi được, thử lại sau nhé.'), true); lastSendAt = 0; return; }
            // Máy chủ có thể trả chữ ĐÃ LỌC trong r.message (chuỗi hoặc
            // {text} như /game/chat của nhánh 5) — hiển thị đúng bản đó.
            var finalText = text;
            if (r && typeof r.message === 'string' && r.message) finalText = r.message;
            else if (r && r.message && typeof r.message.text === 'string' && r.message.text) finalText = r.message.text;
            done(clampText(finalText, TEXT_MAX));
          }).catch(function () { hint('Chưa gửi được tin (mạng chập chờn), thử lại nhé.', true); lastSendAt = 0; });
          return;
        }
      } catch (e) {}
      // Hook an toàn khi nhánh 5 chưa sẵn: lọc từ tục ở client + báo nhẹ.
      var filtered = filterBad(text);
      done(filtered, filtered !== text ? 'Vài từ chưa lịch sự đã được che ở máy này — máy chủ sẽ lọc thêm khi nối xong.' : 'Đang gửi qua phòng (bộ lọc máy chủ sẽ nối sau).');
    }

    /* ----- lưới câu trend / biểu cảm ----- */
    function paintSeg() {
      if (!els.seg) return;
      els.seg.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-s') === teamStyle);
      });
    }
    function grid(kind) {
      els.grid.className = 'cg-grid ' + (kind === 'emo' ? 'cg-emo' : 'cg-hot');
      els.grid.innerHTML = '';
      if (els.seg) { els.seg.classList.toggle('hid', kind !== 'team'); paintSeg(); }
      var src = kind === 'emo' ? EMO : (kind === 'team' ? teamLinesNow() : lines);
      src.forEach(function (x) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = x;
        b.addEventListener('click', function () {
          var ok = sendTrend(x);
          // Việc G: câu tổ đội vừa phát rời lưới ngay (túi không lặp).
          if (kind === 'team' && ok) { teamMarkUsed(x); grid('team'); }
        });
        els.grid.appendChild(b);
      });
    }
    grid('hot');
    els.tabs.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        els.tabs.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); grid(b.getAttribute('data-t'));
      });
    });
    if (els.seg) els.seg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        teamStyle = b.getAttribute('data-s') === 'chat' ? 'chat' : 'normal';
        saveTeamStyle(teamStyle);
        grid('team');
      });
    });
    els.fab.addEventListener('click', function () {
      els.sheet.classList.toggle('hid');
      if (els.feed.classList.contains('cg-feed-hidden')) els.feed.classList.remove('cg-feed-hidden');
    });
    mountEl.querySelector('#cgClose').addEventListener('click', function () { els.sheet.classList.add('hid'); });
    mountEl.querySelector('#cgFeedHide').addEventListener('click', function () { els.feed.classList.add('cg-feed-hidden'); });
    els.input.addEventListener('input', function () { els.cnt.textContent = els.input.value.length + '/' + TEXT_MAX; });
    els.send.addEventListener('click', function () {
      var v = els.input.value; if (!v.trim()) return;
      sendText(v); els.input.value = ''; els.cnt.textContent = '0/' + TEXT_MAX;
    });
    els.input.addEventListener('keydown', function (e) { if (e.key === 'Enter') els.send.click(); });
    var onToggle = function (ev) { setChemEnabled(!!ev.target.checked); if (els.toggle) els.toggle.checked = !!ev.target.checked; if (els.toggle2) els.toggle2.checked = !!ev.target.checked; };
    els.toggle.addEventListener('change', onToggle);
    els.toggle2.addEventListener('change', onToggle);

    state = {
      opts: opts, me: me, call: call, els: els, scheduler: scheduler, layer: layer,
      enabled: enabled, showBubble: showBubble, feed: feed,
    };
    return state;
  }

  function receiveRemote(msg) {
    if (!state || !msg) return;
    var text = clampText(msg.text, 140);
    if (!text) return;
    var name = String(msg.name || '').slice(0, 40);
    state.feed(name, text, false);
    if (!chemEnabled()) return; // tắt Chém gió: không bong bóng, không tiếng người khác
    state.showBubble(msg.userId != null ? msg.userId : name, text, { me: false });
    if (!isEmojiOnly(text)) speakText(text);
  }

  function destroy() {
    if (!state) return;
    try { state.scheduler.clear(); } catch (e) {}
    try { state.layer.remove(); } catch (e) {}
    try { state.els.root.innerHTML = ''; } catch (e) {}
    state = null;
  }

  window.GCHAT = {
    mount: mount,
    receiveRemote: receiveRemote,
    showBubble: function (k, t, o) { return state ? state.showBubble(k, t, o) : false; },
    feed: function (n, t, m) { if (state) state.feed(n, t, m); },
    setEnabled: setChemEnabled,
    isEnabled: chemEnabled,
    destroy: destroy,
    _test: { createBubbleScheduler: createBubbleScheduler, bubblePos: bubblePos, filterBad: filterBad, clampText: clampText, esc: esc, trendLines: trendLines, teamSetsOf: function (o) { var s = normalizeTeamSets(o || {}); return s ? { normal: s.normal.slice(), chat: s.chat.slice() } : null; }, loadTeamStyle: loadTeamStyle, saveTeamStyle: saveTeamStyle },
  };
})();
