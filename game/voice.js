/* =====================================================================
 * voice.js — LÕI ĐỌC DUY NHẤT của game "Hành trình đến Edo" (Nhánh V).
 * Mọi phát âm trong game (câu trend của GTREND, "Chém gió" của GCHAT)
 * đều đi qua đây. Thứ tự ưu tiên khi đọc 1 câu:
 *
 *   1) BẢN GHI CÓ SẴN (chỉ với text tiếng Nhật): tra text (và biến thể
 *      bỏ dấu câu cuối) trong ../audio-index.json của site chính
 *      {văn bản -> id clip}; trúng -> phát ../audio/<id>.mp3, KHÔNG
 *      dùng TTS nữa. Index được fetch LƯỜI một lần rồi cache; fetch
 *      lỗi -> bỏ qua lớp này, đọc bằng TTS như thường.
 *   2) BẢN ĐỌC (reading): nếu opts.reading có (kana trích từ furigana
 *      {chữ|cách đọc}) và không có bản ghi -> TTS đọc THEO reading thay
 *      vì text gốc. Đây là cơ chế sửa đọc sai tên người / kanji khó.
 *   3) TTS speechSynthesis theo 1 trong 3 KIỂU GIỌNG (cài đặt
 *      localStorage 'hn_game_voice_style'; SỐ lấy từ GAME_VOICE_STYLE
 *      ở settings.js — FIX3):
 *        'chat'   (Chất):       ưu tiên giọng NAM/trầm nhất cho ja/vi;
 *                               pitch 0.55, rate 0.88.
 *        'thuong' (Bình thường, MẶC ĐỊNH): giọng đầu tiên khớp tiền tố
 *                               ngôn ngữ; pitch 1.0, rate 1.0.
 *        'cute'   (Dễ thương): ưu tiên giọng nữ; pitch 1.6, rate 1.12.
 *
 * Cài đặt dùng chung (đọc lại MỖI LẦN phát, đổi là ăn ngay):
 *   'hn_game_snd_voice'  : '0' = tắt giọng (mặc định bật).
 *   'hn_game_vol_voice'  : 0..100, mặc định 100 -> volume = vol/100
 *                          (áp cho cả bản ghi lẫn TTS; 0 = im lặng).
 *   'hn_game_voice_style': 'chat' | 'thuong' | 'cute'.
 * opts.force = true: bỏ qua công tắc tắt (dùng cho nút nghe thử trong
 *   màn cài đặt); âm lượng vẫn theo vol, vol=0 + force -> phát ở 1.0
 *   để nghe thử được.
 *
 * Hàng đợi: đọc câu mới sẽ HỦY câu cũ (cancel TTS + pause bản ghi đang
 * phát), giống hành vi cũ. stop() hủy tất cả + nhả duck nhạc nền.
 *
 * API: window.GAME_VOICE = { speak(text, opts), stop(), presets }
 *   opts: { lang?, reading?, force? } — lang ép ngôn ngữ ('ja-JP'…);
 *   không ép thì tự nhận diện: text chứa kana/kanji -> ja-JP, còn lại
 *   vi-VN; câu lẫn hai thứ tiếng được tách đoạn như trend.js cũ.
 * File này KHÔNG bắt buộc: trend.js/chat.js vẫn chạy (rơi về đường đọc
 * cũ) khi voice.js vắng mặt.
 * ===================================================================== */
(function () {
  'use strict';

  var LS_ON = 'hn_game_snd_voice';
  var LS_VOL = 'hn_game_vol_voice';
  var LS_STYLE = 'hn_game_voice_style';
  var INDEX_URL = '../audio-index.json';
  var AUDIO_BASE = '../audio/';
  var JA_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

  /* FIX3 (30/10, Lỗi 4): số preset lấy từ NGUỒN DUY NHẤT
     GAME_VOICE_STYLE (settings.js). Bản cũ ở đây: chat = {1.0, 1.0}
     GIỐNG HỆT thuong — chọn "Chất" mà pitch/rate không đổi chút nào,
     khác biệt duy nhất là thứ tự ưu tiên tên giọng (mà trên máy ít
     giọng thì giọng được chọn cũng y hệt) nên nghe như chưa sửa.
     Nay: chat pitch 0.55 / rate 0.88, thuong 1.0 / 1.0,
     cute pitch 1.6 / rate 1.12 — ba bộ số khác nhau rõ rệt. */
  var PRESETS = (function () {
    var base = (window.GAME_VOICE_STYLE && window.GAME_VOICE_STYLE.presets) || {
      chat: { pitch: 0.55, rate: 0.88 },
      thuong: { pitch: 1.0, rate: 1.0 },
      cute: { pitch: 1.6, rate: 1.12 },
    };
    return {
      chat: { label: 'Chất', rate: base.chat.rate, pitch: base.chat.pitch },
      thuong: { label: 'Bình thường', rate: base.thuong.rate, pitch: base.thuong.pitch },
      cute: { label: 'Dễ thương', rate: base.cute.rate, pitch: base.cute.pitch },
    };
  })();

  /* ---------- Cài đặt ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function settings() {
    var vol = parseInt(lsGet(LS_VOL), 10);
    if (isNaN(vol)) vol = 100;
    vol = Math.max(0, Math.min(100, vol));
    var style = lsGet(LS_STYLE);
    if (style !== 'chat' && style !== 'cute') style = 'thuong';
    return { on: lsGet(LS_ON) !== '0', vol: vol, style: style };
  }

  /* ---------- Bản ghi: audio-index (fetch lười, cache 1 lần) ---------- */
  var indexCache = null;
  var indexPromise = null;
  function loadIndex() {
    if (indexCache) return Promise.resolve(indexCache);
    if (indexPromise) return indexPromise;
    if (typeof fetch !== 'function') return Promise.resolve(null);
    try {
      indexPromise = fetch(INDEX_URL)
        .then(function (res) {
          if (!res || !res.ok) throw new Error('index HTTP ' + (res && res.status));
          return res.json();
        })
        .then(function (j) {
          indexCache = (j && typeof j === 'object') ? j : null;
          return indexCache;
        })
        .catch(function () {
          // Lỗi mạng/format: bỏ qua lớp bản ghi lần này, lần sau thử lại.
          indexPromise = null;
          return null;
        });
    } catch (e) {
      indexPromise = null;
      return Promise.resolve(null);
    }
    return indexPromise;
  }
  // Tra id clip: text nguyên văn, rồi biến thể bỏ dấu câu cuối.
  function lookupId(idx, text) {
    if (!idx || !text) return null;
    var t = String(text).trim();
    if (!t) return null;
    if (Object.prototype.hasOwnProperty.call(idx, t) && idx[t]) return idx[t];
    var v = t.replace(/[。！？!?、，,.…・]+$/, '').trim();
    if (v && v !== t && Object.prototype.hasOwnProperty.call(idx, v) && idx[v]) return idx[v];
    // Khóa trong index thường kết thúc bằng '。' còn text game có thể không:
    if (v && Object.prototype.hasOwnProperty.call(idx, v + '。') && idx[v + '。']) return idx[v + '。'];
    return null;
  }

  /* ---------- Chọn giọng TTS ---------- */
  var voiceCache = [];
  function refreshVoices() {
    try {
      if (window.speechSynthesis && typeof speechSynthesis.getVoices === 'function') {
        voiceCache = speechSynthesis.getVoices() || [];
      }
    } catch (e) {}
    return voiceCache;
  }
  try {
    if (window.speechSynthesis) {
      refreshVoices();
      if (typeof speechSynthesis.addEventListener === 'function') {
        speechSynthesis.addEventListener('voiceschanged', refreshVoices);
      } else if ('onvoiceschanged' in speechSynthesis) {
        speechSynthesis.onvoiceschanged = refreshVoices;
      }
    }
  } catch (e) {}

  // Danh sách ưu tiên tên giọng cho kiểu 'chat' (theo tiền tố ngôn ngữ).
  var CHAT_PRIORITY = {
    ja: [
      /google\s*日本語/i,
      /microsoft[^,]*(nanami|haruka)[^,]*natural/i,
      /natural/i,
      /kyoko/i,
      /o[\s-]?ren/i,
      /microsoft[^,]*(nanami|haruka)/i,
      /google/i,
      /microsoft/i,
    ],
    vi: [
      /google[^,]*tiếng việt/i,
      /microsoft[^,]*(hoai\s?my|nam\s?minh)[^,]*natural/i,
      /natural/i,
      /microsoft[^,]*(hoai\s?my|nam\s?minh)/i,
      /google/i,
      /microsoft/i,
    ],
  };
  var FEMALE_RE = /kyoko|o[\s-]?ren|nanami|haruka|ayumi|ichika|female|hoai\s?my|\blinh\b|zira|samantha|aria|jenny/i;
  /* FIX3 (Lỗi 4): giọng NAM/TRẦM theo tên mà các nền tảng hay dùng —
     ja: Otoya + Ichiro + Keita + Takumi (Apple/Microsoft), vi: Nam Minh.
     Kiểu 'chat' ưu tiên nhóm này TRƯỚC danh sách chất lượng cũ, và
     loại hẳn giọng nữ đã biết khỏi các vòng ưu tiên sau, để "Chất"
     không rơi trúng giọng nữ cao rồi hạ pitch giả tạo. */
  var MALE_RE = /otoya|ichiro|keita|takumi|masahiro|nam\s?minh|\bmale\b|daniel|fred/i;

  function pickVoice(lang, style) {
    var prefix = String(lang || '').slice(0, 2).toLowerCase();
    var vs = voiceCache.length ? voiceCache : refreshVoices();
    var cands = [];
    for (var i = 0; i < vs.length; i++) {
      var l = String(vs[i].lang || '').replace('_', '-').toLowerCase();
      if (l.indexOf(prefix) === 0) cands.push(vs[i]);
    }
    if (!cands.length) return null;
    if (style === 'chat') {
      for (var m = 0; m < cands.length; m++) {
        if (MALE_RE.test(String(cands[m].name || ''))) return cands[m];
      }
      var prio = CHAT_PRIORITY[prefix] || [];
      for (var p = 0; p < prio.length; p++) {
        for (var c = 0; c < cands.length; c++) {
          if (FEMALE_RE.test(String(cands[c].name || ''))) continue;
          if (prio[p].test(String(cands[c].name || ''))) return cands[c];
        }
      }
      for (var d = 0; d < cands.length; d++) {
        if (!FEMALE_RE.test(String(cands[d].name || ''))) return cands[d];
      }
      return cands[0];
    }
    if (style === 'cute') {
      for (var f = 0; f < cands.length; f++) {
        if (FEMALE_RE.test(String(cands[f].name || ''))) return cands[f];
      }
      return cands[0];
    }
    // 'thuong': hành vi cũ của trend.js — giọng đầu tiên khớp tiền tố.
    return cands[0];
  }

  /* ---------- Tách đoạn Nhật / Việt (giữ logic cũ của trend.js) ---------- */
  function splitLang(text) {
    var raw = String(text).split(/([\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff！]+)/g);
    var parts = [];
    raw.forEach(function (seg) {
      if (!seg || !seg.trim()) return;
      parts.push({ text: seg, ja: JA_RE.test(seg) });
    });
    return parts;
  }
  function cleanText(text) {
    return String(text == null ? '' : text)
      .replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ---------- Bộ phát tuần tự (bản ghi + TTS chung 1 hàng đợi) ---------- */
  var gen = 0;          // thế hệ phát: tăng mỗi lần speak/stop mới
  var curAudio = null;  // <audio> đang phát (nếu có)
  var duckTimer = null;

  function duck(on) {
    try { if (window.GMUSIC && typeof window.GMUSIC.duck === 'function') window.GMUSIC.duck(!!on); } catch (e) {}
  }
  function cancelCurrent() {
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    if (curAudio) {
      try { curAudio.pause(); } catch (e) {}
      curAudio = null;
    }
  }
  function stop() {
    gen++;
    cancelCurrent();
    if (duckTimer) { clearTimeout(duckTimer); duckTimer = null; }
    duck(false);
  }

  /* FIX2 (30/10, "âm lượng lúc được lúc không"): áp âm lượng MỚI NGAY
     vào clip bản ghi đang phát dở. Bản cũ: speak() chốt vol tại thời
     điểm bắt đầu phát, kéo thanh trượt giữa chừng không đổi gì cho tới
     câu đọc SAU — người dùng kéo lúc clip đang đọc sẽ tưởng trượt hỏng.
     (Câu TTS speechSynthesis không đổi được volume giữa utterance —
     giới hạn của chính API trình duyệt; câu TTS sau sẽ theo mức mới vì
     speak() đọc lại cài đặt mỗi lần phát.) */
  /* FIX3 (Lỗi 3): giống nhạc nền — .volume của <audio> không do JS
     điều khiển được trên iOS Safari, nên clip ghi sẵn cũng được nối
     qua GainNode WebAudio (tạo trong cử chỉ người dùng, resume mỗi
     lần phát). Có gain thì .volume giữ 1 và gain là mức thật; không
     nối được thì rơi về .volume như cũ. */
  var vctx = null, vMaster = null;
  function ensureVCtx() {
    if (vctx) { if (vctx.state === 'suspended') { try { vctx.resume(); } catch (e) {} } return vctx; }
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      vctx = new AC();
      vMaster = vctx.createGain();
      vMaster.gain.value = 1;
      vMaster.connect(vctx.destination);
    } catch (e) { vctx = null; vMaster = null; }
    return vctx;
  }
  try {
    window.addEventListener('pointerdown', function () { ensureVCtx(); }, { passive: true, capture: true });
  } catch (e) {}
  function applyVolumeNow(v01) {
    var v = Number(v01);
    if (isNaN(v)) { var s = settings(); v = s.on ? s.vol / 100 : 0; }
    v = Math.max(0, Math.min(1, v));
    if (curAudio) {
      if (curAudio._cg) { try { curAudio._cg.gain.value = v; } catch (e) {} }
      else { try { curAudio.volume = v; } catch (e) {} }
    }
    return v;
  }
  // Nghe sự kiện đổi cài đặt do settings.js phát (detail = snapshot).
  try {
    window.addEventListener('hn-game-settings', function (ev) {
      var d = (ev && ev.detail) || null;
      if (!d) return;
      if (d.voiceOn === false) { stop(); return; }
      applyVolumeNow((typeof d.voiceVol === 'number' ? d.voiceVol : 100) / 100);
    });
  } catch (e) {}

  // Lập kế hoạch phát: mảng hành động {type:'audio',src} | {type:'tts',text,lang}.
  function plan(text, idx, opts) {
    var actions = [];
    // 1) Bản ghi cho TOÀN CÂU (chỉ khi câu là tiếng Nhật).
    if (JA_RE.test(text)) {
      var whole = lookupId(idx, text);
      if (whole) { actions.push({ type: 'audio', src: AUDIO_BASE + whole + '.mp3' }); return actions; }
    }
    // 2) Bản đọc: TTS đọc theo reading, không tách đoạn.
    if (opts.reading) {
      actions.push({ type: 'tts', text: String(opts.reading), lang: opts.lang || 'ja-JP' });
      return actions;
    }
    // Ép ngôn ngữ: 1 utterance duy nhất.
    if (opts.lang) {
      actions.push({ type: 'tts', text: text, lang: opts.lang });
      return actions;
    }
    // 3) Tách đoạn: đoạn Nhật tra bản ghi theo từng đoạn, còn lại TTS.
    splitLang(text).forEach(function (p) {
      if (p.ja) {
        var id = lookupId(idx, p.text);
        if (id) { actions.push({ type: 'audio', src: AUDIO_BASE + id + '.mp3' }); return; }
        actions.push({ type: 'tts', text: p.text, lang: 'ja-JP' });
      } else {
        actions.push({ type: 'tts', text: p.text, lang: 'vi-VN' });
      }
    });
    return actions;
  }

  function playActions(actions, myGen, st) {
    if (!actions.length) return;
    var vol = st.vol / 100;
    var preset = PRESETS[st.style] || PRESETS.thuong;
    var i = 0;
    duck(true);
    if (duckTimer) clearTimeout(duckTimer);
    // An toàn: nhả duck tối đa sau 30 giây dù sự kiện kết thúc không về.
    duckTimer = setTimeout(function () { duck(false); }, 30000);

    function finish() {
      if (duckTimer) { clearTimeout(duckTimer); duckTimer = null; }
      duck(false);
    }
    function next() {
      if (myGen !== gen) return; // đã bị câu mới/stop thay thế
      if (i >= actions.length) { finish(); return; }
      var a = actions[i++];
      var done = false;
      var watchdog = null;
      function advance() {
        if (done) return;
        done = true;
        if (watchdog) { clearTimeout(watchdog); watchdog = null; }
        next();
      }
      if (a.type === 'audio') {
        var au = null;
        try { au = new Audio(a.src); } catch (e) { advance(); return; }
        curAudio = au;
        // FIX3: ưu tiên GainNode WebAudio (điều khiển được trên iOS).
        au._cg = null;
        if (ensureVCtx() && vMaster) {
          try {
            var srcN = vctx.createMediaElementSource(au);
            var cg = vctx.createGain();
            cg.gain.value = vol;
            srcN.connect(cg); cg.connect(vMaster);
            au._cg = cg;
            au.volume = 1;
          } catch (e) { au._cg = null; }
        }
        if (!au._cg) { try { au.volume = vol; } catch (e) {} }
        au.onended = function () { if (curAudio === au) curAudio = null; advance(); };
        au.onerror = function () { if (curAudio === au) curAudio = null; advance(); };
        watchdog = setTimeout(function () { if (curAudio === au) curAudio = null; advance(); }, 20000);
        try {
          var pr = au.play();
          if (pr && typeof pr.catch === 'function') pr.catch(function () { advance(); });
        } catch (e) { advance(); }
        return;
      }
      // TTS
      if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') { advance(); return; }
      var u;
      try { u = new SpeechSynthesisUtterance(a.text); } catch (e) { advance(); return; }
      /* FIX3 (Lỗi 4): áp kiểu giọng qua HÀM CHUNG GAME_VOICE_STYLE.applyTo
         (settings.js) — cùng một cửa với trend.js/chat.js. preset cục
         bộ ở trên chỉ còn là dữ liệu dự phòng đồng bộ với nguồn chung. */
      var v = pickVoice(a.lang, st.style);
      if (window.GAME_VOICE_STYLE && typeof window.GAME_VOICE_STYLE.applyTo === 'function') {
        window.GAME_VOICE_STYLE.applyTo(u, { lang: a.lang, voice: v, volume: vol, style: st.style });
      } else {
        u.lang = a.lang;
        if (v) { try { u.voice = v; } catch (e) {} }
        u.rate = preset.rate;
        u.pitch = preset.pitch;
        u.volume = vol;
      }
      u.onend = advance;
      u.onerror = advance;
      // iOS đôi khi không bắn onend: ước lượng thời lượng để hàng đợi không kẹt.
      watchdog = setTimeout(advance, Math.max(4000, a.text.length * 400));
      try { speechSynthesis.speak(u); } catch (e) { advance(); }
    }
    next();
  }

  /* ---------- API ---------- */
  function speak(text, opts) {
    opts = opts || {};
    var st = settings();
    var force = !!opts.force;
    if (!st.on && !force) return false;
    if (st.vol <= 0 && !force) return false;
    if (force && st.vol <= 0) st = { on: true, vol: 100, style: st.style }; // nghe thử
    var clean = cleanText(text);
    var reading = opts.reading ? cleanText(opts.reading) : '';
    if (!clean && !reading) return false;
    if (!clean) clean = reading;
    var myGen = ++gen;
    cancelCurrent(); // hủy câu cũ như hành vi cũ
    loadIndex().then(function (idx) {
      if (myGen !== gen) return;
      var o = { lang: opts.lang, reading: reading || undefined };
      playActions(plan(clean, idx, o), myGen, st);
    });
    return true;
  }

  window.GAME_VOICE = {
    speak: speak,
    stop: stop,
    applyVolumeNow: applyVolumeNow,
    /* FIX3: cửa áp kiểu giọng dùng chung, xuất ra cho nơi khác cần —
       bản thân nó ủy quyền GAME_VOICE_STYLE.applyTo (settings.js). */
    applyPreset: function (u, opts) {
      opts = opts || {};
      if (window.GAME_VOICE_STYLE && typeof window.GAME_VOICE_STYLE.applyTo === 'function') {
        return window.GAME_VOICE_STYLE.applyTo(u, opts);
      }
      var st = settings();
      var p = PRESETS[opts.style || st.style] || PRESETS.thuong;
      if (opts.lang) u.lang = opts.lang;
      if (opts.voice) { try { u.voice = opts.voice; } catch (e) {} }
      u.pitch = p.pitch; u.rate = p.rate;
      if (typeof opts.volume === 'number') u.volume = Math.max(0, Math.min(1, opts.volume));
      return u;
    },
    presets: PRESETS,
    _test: {
      settings: settings,
      pickVoice: pickVoice,
      lookupId: lookupId,
      plan: plan,
      splitLang: splitLang,
      _setIndex: function (idx) { indexCache = idx; indexPromise = null; },
      _refreshVoices: refreshVoices,
    },
  };
})();
