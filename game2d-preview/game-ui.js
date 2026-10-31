// game-ui.js — Lớp giao diện game: thẻ nhân vật, thanh 5 chỉ số, mục tiêu, toast,
// cài đặt (nhạc), tổng kết đoạn mẫu. Chỉ số Rủi ro là chỉ số ẨN theo bible §3:
// ô của nó luôn hiện "???" — chỉ biến động ngầm, không bao giờ lộ số.
// Chỉ số ẩn thứ hai: ÁP LỰC (pressure) — đặc tả ở noi-dung-mo-rong/checklist-that.md
// mục D, được chủ trang duyệt áp dụng 08:53 JST 31/10/2026 (ủy quyền quyết). Áp lực
// CHỈ gắn với tiền–nợ–gia đình; cùng luật với Rủi ro: biến động ngầm qua apply(),
// KHÔNG render, KHÔNG floater, KHÔNG lộ số dưới bất kỳ hình thức nào cho người chơi
// (chỉ lộ qua dấu hiệu truyện: mất ngủ, tránh điện thoại, cáu vô cớ…).
(function () {
  'use strict';
  var stats = { jp: 12, money: 3.20, hp: 82, love: 35, risk: 0, pressure: 0 };
  var log = [];
  var $ = function (id) { return document.getElementById(id); };

  function fmtMoney(v) { return v.toFixed(2).replace('.', ',') + ' man'; }
  function render() {
    $('st-jp').textContent = stats.jp;
    $('st-money').textContent = fmtMoney(stats.money);
    $('st-hp').textContent = stats.hp;
    $('st-love').textContent = stats.love;
    $('st-risk').textContent = '???';
  }
  function pulse(id) {
    var s = $(id); if (!s) return;
    var cell = s.closest('.stat'); if (!cell) return;
    cell.classList.remove('pulse'); void cell.offsetWidth; cell.classList.add('pulse');
  }
  var toastTimer = null;
  function toast(text, ms) {
    var t = $('toast'); t.textContent = text; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, ms || 2600);
  }
  function floater(text, neg) {
    var f = document.createElement('div');
    f.className = 'floater' + (neg ? ' neg' : '');
    f.textContent = text;
    $('floaters').appendChild(f);
    setTimeout(function () { f.remove(); }, 2300);
  }
  // deltas: {jp, money, hp, love, risk, pressure} — risk & pressure nhận nhưng không hiển thị
  function apply(deltas, note) {
    var parts = [];
    Object.keys(deltas || {}).forEach(function (k) {
      var d = deltas[k]; if (!d) return;
      stats[k] = Math.round((stats[k] + d) * 100) / 100;
      if (k === 'jp') { pulse('st-jp'); parts.push((d > 0 ? '+' : '') + d + ' 📚'); }
      if (k === 'money') { pulse('st-money'); parts.push((d > 0 ? '+' : '−') + fmtMoney(Math.abs(d)) + ' 💴'); }
      if (k === 'hp') { pulse('st-hp'); parts.push((d > 0 ? '+' : '') + d + ' ❤️'); }
      if (k === 'love') { pulse('st-love'); parts.push((d > 0 ? '+' : '') + d + ' 💗'); }
    });
    if (parts.length) {
      floater(parts.join(' · '), parts.some(function (p) { return p.charAt(0) === '−' || (p.charAt(0) === '-' && p.indexOf('📚') < 0); }) && deltas.money < 0);
      log.push({ note: note || '', parts: parts.join(' · ') });
    }
    if (note) toast(note);
    render();
  }
  function setObjective(text) {
    var o = $('objective');
    o.textContent = text;
    o.classList.remove('pulse'); void o.offsetWidth; o.classList.add('pulse');
  }
  function setPhoneBadge(n) {
    var b = $('phone-badge');
    b.textContent = n;
    b.classList.toggle('show', n > 0);
    $('btn-phone').classList.toggle('ring', n > 0);
  }
  function showSummary() {
    var body = $('sum-body');
    body.innerHTML = '';
    if (!log.length) body.innerHTML = '<div class="sub">Chưa có biến động nào.</div>';
    log.forEach(function (e) {
      var row = document.createElement('div');
      row.className = 'sum-line';
      row.innerHTML = '<span></span><b></b>';
      row.firstChild.textContent = e.note || '—';
      row.lastChild.textContent = e.parts;
      body.appendChild(row);
    });
    $('modal-summary').classList.add('show');
  }
  function init(player) {
    $('pc-name').textContent = player.name;
    $('pc-ava').textContent = (player.name || '?').trim().charAt(0).toUpperCase();
    $('pc-level').textContent = (player.gender === 'F' ? '👧' : '👦') + ' · Cấp JLPT N5 · Ngày lên đường sang Nhật';
    render();
    // Cài đặt
    $('set-bgm-on').checked = window.BGM.isOn();
    $('set-bgm-vol').value = Math.round(window.BGM.volume() * 100);
    $('set-bgm-on').addEventListener('change', function () { window.BGM.setEnabled(this.checked); toast(this.checked ? '🔊 Đã bật nhạc nền' : '🔇 Đã tắt nhạc nền'); });
    $('set-bgm-vol').addEventListener('input', function () { window.BGM.setVolume(this.value / 100); });
    $('btn-menu').addEventListener('click', function () { $('modal-settings').classList.add('show'); });
    $('set-close').addEventListener('click', function () { $('modal-settings').classList.remove('show'); });
    $('set-restart').addEventListener('click', function () { location.reload(); });
    // 🆕 Có gì mới — đọc thẳng từ lớp nạp nội dung (bản kê gói), không chép tay danh sách
    if (window.CONTENT) {
      var ver = window.CONTENT.version || '—';
      $('set-content-ver').textContent = 'v' + ver;
      $('news-cur-ver').textContent = 'v' + ver;
      $('set-news').addEventListener('click', function () {
        var list = $('news-list'); list.innerHTML = '';
        window.CONTENT.changelog().forEach(function (pkg) {
          var d = document.createElement('div');
          d.style.cssText = 'border:1px solid #e3dcc8;border-radius:12px;padding:10px 12px;margin:0 0 10px;background:#fffdf6';
          var h = document.createElement('div');
          h.style.cssText = 'font-weight:800;font-size:14.5px;color:#2b3a67';
          h.textContent = '📦 v' + pkg.version + ' — ' + pkg.title;
          var meta = document.createElement('div');
          meta.style.cssText = 'font-size:12px;color:#8a8574;margin:2px 0 6px';
          meta.textContent = 'Ngày ' + pkg.date + ' · ' + (pkg.maps || []).length + ' bản đồ · ' + (pkg.scenes || []).length + ' cảnh';
          d.appendChild(h); d.appendChild(meta);
          (pkg.notes || []).forEach(function (n) {
            var p = document.createElement('div');
            p.style.cssText = 'font-size:13.5px;line-height:1.5;color:#3d3d3d';
            p.textContent = '• ' + n;
            d.appendChild(p);
          });
          list.appendChild(d);
        });
        $('modal-settings').classList.remove('show');
        $('modal-news').classList.add('show');
      });
      $('news-close').addEventListener('click', function () { $('modal-news').classList.remove('show'); });
    }
    $('sum-close').addEventListener('click', function () { $('modal-summary').classList.remove('show'); });
  }
  window.GAMEUI = {
    init: init, apply: apply, render: render, toast: toast,
    setObjective: setObjective, setPhoneBadge: setPhoneBadge, showSummary: showSummary,
    stats: function () { return JSON.parse(JSON.stringify(stats)); },
    // Máy truyện (story.js) khôi phục chỉ số từ bản lưu — ghi đè sạch rồi vẽ lại HUD
    restore: function (saved) { if (saved) { Object.keys(stats).forEach(function (k) { if (typeof saved[k] === 'number') stats[k] = saved[k]; }); render(); } },
    log: function () { return log.slice(); }
  };
})();
