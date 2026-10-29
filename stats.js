// ===== Thành tích học tập: chuỗi ngày học / XP / bảng xếp hạng / huy hiệu =====
// Mọi con số do Worker /stats/* tính PHÍA SERVER từ dữ liệu đã đồng bộ theo
// tài khoản (không có điểm số riêng phía client). File này chỉ hiển thị:
// - Trang chủ: cập nhật chip 🔥 trong thẻ "học tiếp" + khối "🏆 Top tuần này".
// - xep-hang.html: panel "Thành tích của bạn" + huy hiệu + bảng nhiều hạng mục.
// Chưa đăng nhập -> trang chủ hiện lời mời đăng nhập; trang xếp hạng nhắc đăng nhập.
(function () {
  'use strict';
  function ep() { return (typeof SITE !== 'undefined' && SITE.aiEndpoint || '').replace(/\/$/, ''); }
  function tok() { return (typeof AUTH !== 'undefined' && AUTH.session) ? AUTH.session() : ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
  async function api(path) {
    var r = await fetch(ep() + path, { headers: { Authorization: 'Bearer ' + tok() } });
    var j = await r.json().catch(function () { return {}; });
    if (!r.ok) throw new Error(j.error || ('Lỗi ' + r.status));
    return j;
  }
  // ---------- CSS dùng chung (chip/toast/khối top tuần) ----------
  var css = ''
    + '.st-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:86px;z-index:9999;background:var(--card,#fff);color:var(--t,#1c2430);border:1px solid var(--line,#e3e0d6);border-left:5px solid var(--gold,#b07d2b);border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,.22);padding:12px 16px;max-width:min(92vw,430px);font-size:.95rem;line-height:1.45;animation:stIn .25s ease-out}'
    + '@keyframes stIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}'
    + '.st-topweek{margin:18px 0 4px;background:var(--card,#fff);border:1px solid var(--line,#e3e0d6);border-radius:var(--r,16px);box-shadow:var(--shadow,none);padding:16px 18px}'
    + '.st-topweek h2{margin:0 0 4px;font-size:1.15rem}'
    + '.st-topweek .st-sub{margin:0 0 10px;color:var(--m,#4c5866);font-size:.9rem}'
    + '.st-tw-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-top:1px dashed var(--line,#e3e0d6)}'
    + '.st-tw-row:first-of-type{border-top:none}'
    + '.st-medal{font-size:1.25rem;width:30px;text-align:center;flex:none}'
    + '.st-av{width:34px;height:34px;border-radius:50%;object-fit:cover;flex:none;background:var(--soft,#e8edf4)}'
    + '.st-av-t{display:inline-flex;align-items:center;justify-content:center;font-weight:700;color:var(--c2,#233d63);font-size:1rem}'
    + '.st-tw-name{flex:1;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.st-tw-val{font-weight:700;color:var(--c,#cf3a2e);white-space:nowrap}'
    + '.st-tw-link{display:inline-block;margin-top:10px;font-weight:600}'
    + '.st-me-chip{display:inline-block;background:var(--shu-soft,#faecea);color:var(--c,#cf3a2e);border-radius:999px;padding:1px 8px;font-size:.78rem;font-weight:700;margin-left:6px}';
  var stEl = document.createElement('style'); stEl.textContent = css; document.head.appendChild(stEl);

  function toast(html, ms) {
    var d = document.createElement('div');
    d.className = 'st-toast'; d.innerHTML = html;
    document.body.appendChild(d);
    setTimeout(function () { d.style.opacity = '0'; d.style.transition = 'opacity .3s'; setTimeout(function () { d.remove(); }, 320); }, ms || 6000);
  }
  function badgeToasts(me) {
    if (!me || !me.newBadges || !me.newBadges.length) return;
    var got = (me.badges || []).filter(function (b) { return me.newBadges.indexOf(b.id) >= 0; });
    got.forEach(function (b, i) {
      setTimeout(function () { toast('🏅 <b>Huy hiệu mới!</b> ' + b.icon + ' <b>' + esc(b.name) + '</b> — ' + esc(b.desc)); }, i * 700);
    });
  }
  async function avatarUrls(ids) {
    var need = []; (ids || []).forEach(function (id) { if (id && need.indexOf(id) < 0) need.push(id); });
    if (!need.length || !tok()) return {};
    try {
      var r = await fetch(ep() + '/community/file-token', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok() }, body: JSON.stringify({ ids: need }) });
      var j = await r.json().catch(function () { return {}; });
      var out = {}; Object.keys(j.urls || {}).forEach(function (k) { out[k] = ep() + j.urls[k]; });
      return out;
    } catch (e) { return {}; }
  }
  function avHtml(name, url) {
    if (url) return '<img class="st-av" src="' + esc(url) + '" alt="" loading="lazy">';
    return '<span class="st-av st-av-t">' + esc((name || '?').trim().charAt(0).toUpperCase() || '?') + '</span>';
  }
  var MEDALS = ['🥇', '🥈', '🥉'];
  function fmtVal(cat, v) {
    if (cat === 'streak') return v + ' ngày';
    if (cat === 'words') return v + ' từ';
    if (cat === 'boss') return v + ' lần';
    if (cat === 'listen') return v + ' đề';
    return v + ' XP';
  }

  // ================= TRANG CHỦ =================
  async function homeTopWeek(me) {
    var mount = document.getElementById('topWeek');
    if (!mount) return;
    if (!tok()) {
      mount.innerHTML = '<div class="st-topweek"><h2>🏆 Bảng xếp hạng học viên</h2>'
        + '<p class="st-sub">Ai học chăm nhất tuần này? Đăng nhập để xem thứ hạng và huy hiệu của bạn.</p>'
        + '<a class="st-tw-link" href="dang-nhap.html">Đăng nhập →</a> · <a class="st-tw-link" href="xep-hang.html">Xem bảng xếp hạng →</a></div>';
      return;
    }
    try {
      var lb = await api('/stats/leaderboard?cat=week&limit=3');
      var urls = await avatarUrls((lb.list || []).map(function (r) { return r.avatar_file; }));
      var rows = (lb.list || []).map(function (r, i) {
        return '<div class="st-tw-row"><span class="st-medal">' + MEDALS[i] + '</span>' + avHtml(r.name, urls[r.avatar_file])
          + '<span class="st-tw-name">' + esc(r.name) + (r.me ? '<span class="st-me-chip">Bạn</span>' : '') + '</span>'
          + '<span class="st-tw-val">' + r.value + ' XP</span></div>';
      }).join('');
      var meLine = '';
      if (lb.me && !lb.me.inTop) meLine = '<div class="st-tw-row"><span class="st-medal">' + lb.me.rank + '</span><span class="st-av st-av-t">' + esc((lb.me.name || '?').trim().charAt(0).toUpperCase()) + '</span><span class="st-tw-name">' + esc(lb.me.name) + '<span class="st-me-chip">Bạn</span></span><span class="st-tw-val">' + lb.me.value + ' XP</span></div>';
      mount.innerHTML = '<div class="st-topweek"><h2>🏆 Top tuần này</h2>'
        + '<p class="st-sub">XP học tập tuần này (Thứ Hai – Chủ nhật). Học đều mỗi ngày để leo hạng!</p>'
        + (rows || '<p class="st-sub">Chưa có dữ liệu tuần này — hãy là người đầu tiên!</p>') + meLine
        + '<a class="st-tw-link" href="xep-hang.html">Xem bảng xếp hạng đầy đủ →</a></div>';
      // Chip 🔥 trong thẻ học tiếp: thay số local bằng số server (đã đồng bộ đa máy)
      if (me && me.stats) {
        var cell = document.querySelector('#pg .pgn>div');
        if (cell) {
          var b = cell.querySelector('b'); if (b) b.textContent = '🔥 ' + me.stats.streakCur;
          var sp = cell.querySelector('span'); if (sp) sp.textContent = 'ngày liên tục · kỷ lục ' + me.stats.streakBest;
        }
      }
    } catch (e) { /* mất mạng/không có quyền: giữ nguyên hiển thị local */ }
  }
  async function home() {
    if (!document.getElementById('topWeek')) return;
    var me = null;
    if (tok()) { try { me = await api('/stats/me'); badgeToasts(me); } catch (e) { } }
    homeTopWeek(me);
  }

  // ================= TRANG XẾP HẠNG =================
  var CATS = [['week', 'XP tuần'], ['month', 'XP tháng'], ['total', 'Tổng XP'], ['streak', 'Chuỗi ngày'], ['words', 'Từ đã thuộc'], ['boss', 'Thắng trùm'], ['listen', 'Đề nghe']];
  function myPanel(me) {
    var s = me.stats;
    function tile(v, label) { return '<div class="xh-tile"><b>' + v + '</b><span>' + label + '</span></div>'; }
    var tiles = tile('🔥 ' + s.streakCur, 'ngày liên tục (kỷ lục ' + s.streakBest + ')')
      + tile(s.xpWeek, 'XP tuần này') + tile(s.xpMonth, 'XP tháng này') + tile(s.xpTotal, 'tổng XP')
      + tile(s.wordsMastered, 'từ đã thuộc') + tile(s.newCards, 'thẻ mới đã học')
      + tile(s.bossWins, 'lần thắng trùm') + tile(s.listenDone, 'đề nghe hoàn thành') + tile(s.seen, 'bài đã học');
    var badges = (me.badges || []).map(function (b) {
      var when = b.granted_at ? new Date(b.granted_at).toLocaleDateString('vi-VN', { timeZone: 'Asia/Tokyo' }) : '';
      return '<div class="xh-badge' + (b.earned ? ' got' : '') + '"><div class="xh-b-ic">' + b.icon + '</div>'
        + '<div class="xh-b-name">' + esc(b.name) + '</div><div class="xh-b-desc">' + esc(b.desc) + '</div>'
        + '<div class="xh-b-prog">' + (b.earned ? '✅ Đã đạt' + (when ? ' · ' + when : '') : b.rawValue + '/' + b.target + ' ' + b.unit) + '</div></div>';
    }).join('');
    return '<section class="xh-card"><h2>📈 Thành tích của bạn</h2><div class="xh-tiles">' + tiles + '</div>'
      + '<h3 class="xh-h3">🏅 Huy hiệu (' + (me.badges || []).filter(function (b) { return b.earned; }).length + '/' + (me.badges || []).length + ')</h3>'
      + '<div class="xh-badges">' + badges + '</div></section>';
  }
  async function loadBoard(cat, box, pin) {
    box.innerHTML = '<p class="mut">Đang tải…</p>'; pin.innerHTML = '';
    try {
      var lb = await api('/stats/leaderboard?cat=' + cat + '&limit=20');
      var urls = await avatarUrls((lb.list || []).map(function (r) { return r.avatar_file; }));
      var list = lb.list || [];
      var pod = list.slice(0, 3).map(function (r, i) {
        return '<div class="xh-pod p' + (i + 1) + '"><div class="xh-pod-medal">' + MEDALS[i] + '</div>' + avHtml(r.name, urls[r.avatar_file])
          + '<div class="xh-pod-name">' + esc(r.name) + (r.me ? '<span class="st-me-chip">Bạn</span>' : '') + '</div>'
          + '<div class="xh-pod-val">' + fmtVal(cat, r.value) + '</div></div>';
      }).join('');
      var rows = list.map(function (r) {
        return '<div class="xh-row' + (r.me ? ' me' : '') + '"><span class="xh-rk">' + r.rank + '</span>' + avHtml(r.name, urls[r.avatar_file])
          + '<span class="xh-nm">' + esc(r.name) + (r.me ? '<span class="st-me-chip">Bạn</span>' : '') + '</span>'
          + '<span class="xh-vl">' + fmtVal(cat, r.value) + '</span></div>';
      }).join('');
      box.innerHTML = (pod ? '<div class="xh-podium">' + pod + '</div>' : '') + (rows || '<p class="mut">Chưa có học viên nào có điểm ở hạng mục này — hãy là người đầu tiên!</p>');
      if (lb.me && !lb.me.inTop) {
        pin.innerHTML = '<div class="xh-pin"><span class="xh-rk">' + lb.me.rank + '</span><span class="xh-nm">' + esc(lb.me.name) + '<span class="st-me-chip">Bạn</span></span><span class="xh-vl">' + fmtVal(cat, lb.me.value) + '</span></div>';
      }
    } catch (e) {
      box.innerHTML = '<p class="mut">Không tải được bảng xếp hạng. Kiểm tra mạng rồi thử lại.</p>';
    }
  }
  async function page() {
    var root = document.getElementById('xhRoot');
    if (!root) return;
    if (!tok()) {
      root.innerHTML = '<section class="xh-card"><h2>🏆 Bảng xếp hạng học viên</h2><p>Bảng xếp hạng dành cho học viên đã đăng nhập — điểm tính từ tiến độ học đã đồng bộ theo tài khoản.</p><p><a class="btn-primary" href="dang-nhap.html">Đăng nhập để xem thứ hạng của bạn →</a></p></section>';
      return;
    }
    var me = null;
    try { me = await api('/stats/me'); } catch (e) { }
    if (!me) { root.innerHTML = '<section class="xh-card"><p>Không tải được dữ liệu thành tích (mất mạng hoặc tài khoản chưa được duyệt).</p></section>'; return; }
    badgeToasts(me);
    root.innerHTML = myPanel(me)
      + '<section class="xh-card"><h2>🏆 Bảng xếp hạng</h2>'
      + '<div class="xh-tabs" id="xhTabs">' + CATS.map(function (ct, i) { return '<button type="button" data-cat="' + ct[0] + '"' + (i === 0 ? ' class="on"' : '') + '>' + ct[1] + '</button>'; }).join('') + '</div>'
      + '<div id="xhBoard"></div><div id="xhPin"></div>'
      + '<p class="mut" style="margin-top:10px">XP tính từ: điểm trắc nghiệm tốt nhất (5 XP/câu đúng) · thẻ mới học được (2 XP/thẻ) · hoàn thành đề nghe (25 XP/đề) · thắng game đấu trùm (15 XP/lần). Tuần tính Thứ Hai – Chủ nhật theo giờ Nhật.</p></section>';
    var box = document.getElementById('xhBoard'), pin = document.getElementById('xhPin');
    document.getElementById('xhTabs').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-cat]'); if (!b) return;
      document.querySelectorAll('#xhTabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
      loadBoard(b.getAttribute('data-cat'), box, pin);
    });
    loadBoard('week', box, pin);
  }

  // ================= HỒ SƠ CỘNG ĐỒNG (cong-dong.html) =================
  async function cdBadges() {
    var mount = document.getElementById('cdBadges');
    if (!mount || !tok()) return;
    try {
      var me = await api('/stats/me');
      if (!me || !me.stats) return;
      badgeToasts(me);
      var got = (me.badges || []).filter(function (b) { return b.earned; });
      mount.innerHTML = '<div style="font-weight:700">🔥 ' + me.stats.streakCur + ' ngày liên tục · ' + me.stats.xpTotal + ' XP</div>'
        + (got.length
          ? '<div style="margin-top:2px">' + got.map(function (b) { return '<span title="' + esc(b.name) + '" style="font-size:1.3rem;margin-right:4px">' + b.icon + '</span>'; }).join('') + '</div><div style="font-size:.82rem;color:var(--m)">' + got.map(function (b) { return esc(b.name); }).join(' · ') + '</div>'
          : '<div style="font-size:.85rem;color:var(--m)">Chưa có huy hiệu nào — học mỗi ngày để mở khoá nhé!</div>')
        + '<div style="margin-top:4px"><a href="xep-hang.html" style="font-weight:600">Xem thành tích &amp; bảng xếp hạng →</a></div>';
    } catch (e) { /* bỏ qua êm */ }
  }

  function boot() { home(); page(); cdBadges(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  // Sau khi tiến độ vừa đồng bộ xong (học viên vừa học trên máy này), làm mới chip trang chủ
  var refT = null;
  document.addEventListener('hn-synced', function () {
    if (!document.getElementById('topWeek')) return;
    clearTimeout(refT); refT = setTimeout(function () { home(); }, 1200);
  });
})();
