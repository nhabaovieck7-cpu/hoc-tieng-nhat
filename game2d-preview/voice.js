// voice.js — GIỌNG HỘI THOẠI + GIỌNG HƯỚNG DẪN (Lane J, 31/10/2026; Lane N bổ sung
// giọng Việt cùng ngày).
// Hội thoại: mỗi bước thoại có clip thu sẵn (staging/voice/<scene>-<idx>.mp3,
// bản kê staging/voice-index.json) sẽ TỰ PHÁT khi bước hiện + có nút 🔊 nghe lại
// trong hộp thoại. ƯU TIÊN clip tiếng Nhật (VOICEVOX); bước không có câu Nhật thì
// phát clip TIẾNG VIỆT (fileVn — Microsoft Edge neural vi-VN-HoaiMyNeural /
// vi-VN-NamMinhNeural, Lane N thu vì VOICEVOX đọc tiếng Việt thành đánh vần).
// Bước không có cả hai loại clip (prompt chọn đáp — engine chủ động stop() để
// người chơi đọc và chọn; cuộc gọi điện thoại dựng động) -> không phát, không
// hiện nút, không lỗi.
// Nhân vật chính: bản chính thu giọng nam (Ryusei 13); tuyến nữ dùng bản -f (No.7 30)
// nếu có trong bản kê. TUYỆT ĐỐI không dùng speechSynthesis.
// Cài đặt riêng lưu localStorage: b2d_voice_on / b2d_voice_vol / b2d_guide_on — nối vào
// modal ⚙️ Cài đặt bằng các hàng DOM do file này tự thêm (không sửa index.html).
// GUIDE_VOICE: window.GUIDE_VOICE.playCurrent() đọc câu mục tiêu hiện tại trên bảng
// hướng dẫn (#objective, ưu tiên thuộc tính data-guide-key nếu lane giao diện gắn) và
// phát clip guide tương ứng trong staging/voice/guide-index.json nếu có.
(function () {
  'use strict';

  /* ---------------- trạng thái + cài đặt ---------------- */
  var on = localStorage.getItem('b2d_voice_on') !== '0';
  var vol = parseFloat(localStorage.getItem('b2d_voice_vol') || '0.9');
  if (isNaN(vol)) vol = 0.9;
  var guideOn = localStorage.getItem('b2d_guide_on') !== '0';

  var audio = new Audio(); audio.preload = 'auto';
  var gAudio = new Audio(); gAudio.preload = 'auto';
  var index = null;        // voice-index.json
  var guideIndex = null;   // voice/guide-index.json
  var cur = null;          // { scene, idx, file } clip thoại đang gắn với bước hiện tại
  var bar = null, replayBtn = null;

  function gender() {
    try {
      if (window.__demo && window.__demo.player) return window.__demo.player().gender === 'F' ? 'F' : 'M';
    } catch (e) {}
    return 'M';
  }

  /* ---------------- đóng dấu bước thoại (khớp extract-voice.js) ---------------- */
  function stamp() {
    var DATA = window.DEMO_DATA || {};
    Object.keys(DATA).forEach(function (id) {
      var sc = DATA[id]; if (!sc) return;
      var n = 0;
      function mark(o) { if (o && typeof o === 'object') { o._vs = id; o._vi = n++; } }
      if (Array.isArray(sc.lines)) sc.lines.forEach(mark);
      if (Array.isArray(sc.sayLines)) sc.sayLines.forEach(mark);
      if (Array.isArray(sc.branch)) sc.branch.forEach(function (it) {
        if (!it) return;
        if (it.choice) {
          it._vs = id; it._vi = n++;  // prompt chiếm 1 chỉ số (không có clip)
          (it.choice || []).forEach(function (c) { (c.say || []).forEach(mark); });
        } else mark(it);
      });
      if (sc.outro) sc._vOutro = n;
    });
  }

  function recFor(sceneId, idx) {
    if (!index || !index.scenes || !index.scenes[sceneId]) return null;
    var rec = index.scenes[sceneId].steps[String(idx)];
    if (!rec) return null;
    if (rec.file) {
      if (rec.fileF && gender() === 'F') return { file: rec.fileF, rec: rec };
      return { file: rec.file, rec: rec };
    }
    // Lane N: bước không có clip Nhật -> lấp bằng clip tiếng Việt nếu có
    // (tuyến nữ dùng bản -vn-f khi có, giống quy tắc fileF của Lane J).
    if (rec.fileVn) {
      if (rec.fileVnF && gender() === 'F') return { file: rec.fileVnF, rec: rec };
      return { file: rec.fileVn, rec: rec };
    }
    return null;
  }

  function play(file) {
    audio.src = file;
    audio.volume = vol;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  function showBar(show) { if (bar) bar.style.display = show ? 'flex' : 'none'; }

  var VOICE = {
    // engine gọi mỗi khi một bước thoại được vẽ lên hộp thoại
    onStep: function (stepObj) {
      if (!stepObj || stepObj._vs == null || stepObj._vi == null) { VOICE.stop(); return; }
      var r = recFor(stepObj._vs, stepObj._vi);
      if (!r) { VOICE.stop(); return; }
      if (!on) { VOICE.stop(); return; }   // đã tắt giọng trong Cài đặt: như bước không có clip
      cur = { scene: stepObj._vs, idx: stepObj._vi, file: r.file };
      showBar(true);
      play(r.file);
    },
    playOutro: function (sceneObj) {
      if (!sceneObj || sceneObj._vOutro == null) { VOICE.stop(); return; }
      var DATA = window.DEMO_DATA || {};
      var id = null;
      Object.keys(DATA).forEach(function (k) { if (DATA[k] === sceneObj) id = k; });
      if (!id) { VOICE.stop(); return; }
      var r = recFor(id, sceneObj._vOutro);
      if (!r) { VOICE.stop(); return; }
      if (!on) { VOICE.stop(); return; }
      cur = { scene: id, idx: sceneObj._vOutro, file: r.file };
      showBar(true);
      play(r.file);
    },
    stop: function () {
      cur = null;
      try { audio.pause(); } catch (e) {}
      showBar(false);
    },
    replay: function () { if (cur && on) play(cur.file); },
    current: function () { return cur; },
    playing: function () { return !!cur && !audio.paused; },
    isOn: function () { return on; },
    volume: function () { return vol; },
    setEnabled: function (v) {
      on = !!v;
      localStorage.setItem('b2d_voice_on', on ? '1' : '0');
      if (!on) VOICE.stop();
      else if (cur) play(cur.file);
    },
    setVolume: function (v) {
      vol = Math.max(0, Math.min(1, v));
      localStorage.setItem('b2d_voice_vol', String(vol));
      audio.volume = vol;
    }
  };
  window.VOICE = VOICE;

  /* ---------------- giọng hướng dẫn ---------------- */
  function normKey(s) {
    return String(s || '').replace(/\s+/g, ' ').trim();
  }
  function guideEntry() {
    var el = document.getElementById('objective');
    if (!el || !guideIndex || !guideIndex.guides) return null;
    var key = el.getAttribute && el.getAttribute('data-guide-key');
    if (key && guideIndex.guides[normKey(key)]) return guideIndex.guides[normKey(key)];
    var t = normKey(el.textContent);
    if (guideIndex.guides[t]) return guideIndex.guides[t];
    // khớp mềm: bỏ tiền tố emoji/ký hiệu ở đầu
    var soft = t.replace(/^[^A-Za-zÀ-ỹ0-9]+/, '');
    for (var k in guideIndex.guides) {
      if (k.replace(/^[^A-Za-zÀ-ỹ0-9]+/, '') === soft) return guideIndex.guides[k];
    }
    return null;
  }
  var GUIDE_VOICE = {
    playCurrent: function () {
      if (!guideOn) return false;
      var e = guideEntry();
      if (!e || !e.file) return false;
      gAudio.src = e.file;
      gAudio.volume = vol;
      var p = gAudio.play();
      if (p && p.catch) p.catch(function () {});
      return true;
    },
    stop: function () { try { gAudio.pause(); } catch (e) {} },
    isOn: function () { return guideOn; },
    setEnabled: function (v) {
      guideOn = !!v;
      localStorage.setItem('b2d_guide_on', guideOn ? '1' : '0');
      if (!guideOn) GUIDE_VOICE.stop();
    }
  };
  window.GUIDE_VOICE = GUIDE_VOICE;

  /* ---------------- giao diện: thanh nghe lại + hàng cài đặt ---------------- */
  function buildUI() {
    var card = document.getElementById('dlg-card');
    if (card && !document.getElementById('voice-bar')) {
      bar = document.createElement('div');
      bar.id = 'voice-bar';
      bar.style.cssText = 'display:none;margin:6px 0 2px;';
      replayBtn = document.createElement('button');
      replayBtn.type = 'button';
      replayBtn.id = 'voice-replay';
      replayBtn.textContent = '🔊 Nghe lại';
      replayBtn.style.cssText = 'border:1px solid #c9c2ab;background:#fffdf6;color:#2b3a67;' +
        'font-weight:700;font-size:12.5px;border-radius:999px;padding:5px 12px;cursor:pointer;';
      replayBtn.addEventListener('click', function () { VOICE.replay(); });
      bar.appendChild(replayBtn);
      var opts = document.getElementById('dlg-opts');
      if (opts && opts.parentNode === card) card.insertBefore(bar, opts);
      else card.appendChild(bar);
    }
    var settingsCard = document.querySelector('#modal-settings .modal-card');
    if (settingsCard && !document.getElementById('set-voice-on')) {
      var anchor = settingsCard.querySelector('.btnrow');
      function row(html) {
        var d = document.createElement('div');
        d.className = 'mrow';
        d.innerHTML = html;
        if (anchor) settingsCard.insertBefore(d, anchor); else settingsCard.appendChild(d);
        return d;
      }
      row('<span>🗣️ Giọng hội thoại (tiếng Nhật + tiếng Việt)</span>' +
          '<label class="switch"><input type="checkbox" id="set-voice-on"><span class="tr"></span></label>');
      row('<span>🔉 Âm lượng giọng</span><input type="range" id="set-voice-vol" min="0" max="100" step="1">');
      row('<span>🧭 Giọng hướng dẫn đường đi</span>' +
          '<label class="switch"><input type="checkbox" id="set-guidevoice-on"><span class="tr"></span></label>');
      var c1 = document.getElementById('set-voice-on');
      var c2 = document.getElementById('set-voice-vol');
      var c3 = document.getElementById('set-guidevoice-on');
      c1.checked = on; c2.value = Math.round(vol * 100); c3.checked = guideOn;
      c1.addEventListener('change', function () { VOICE.setEnabled(this.checked); });
      c2.addEventListener('input', function () { VOICE.setVolume(this.value / 100); });
      c3.addEventListener('change', function () { GUIDE_VOICE.setEnabled(this.checked); });
    }
    // Tự phát giọng hướng dẫn khi mục tiêu đổi (nếu có clip + đang bật)
    var obj = document.getElementById('objective');
    if (obj && window.MutationObserver) {
      var lastText = obj.textContent, deb = null;
      new MutationObserver(function () {
        if (obj.textContent === lastText) return;
        lastText = obj.textContent;
        clearTimeout(deb);
        deb = setTimeout(function () { GUIDE_VOICE.playCurrent(); }, 350);
      }).observe(obj, { childList: true, characterData: true, subtree: true });
    }
  }

  /* ---------------- khởi động ---------------- */
  stamp();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildUI);
  else buildUI();
  fetch('voice-index.json').then(function (r) { return r.json(); })
    .then(function (j) { index = j; })
    .catch(function () { index = null; });
  fetch('voice/guide-index.json').then(function (r) { return r.json(); })
    .then(function (j) { guideIndex = j; })
    .catch(function () { guideIndex = null; });
})();
