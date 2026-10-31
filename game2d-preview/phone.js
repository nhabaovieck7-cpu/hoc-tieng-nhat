// phone.js — Giao diện ĐIỆN THOẠI trong game (tuyến điện thoại xuyên suốt §6e).
// Hai luồng: Gia đình + Người yêu (tên hư cấu). Tin nhắn đến → huy hiệu đỏ trên nút điện thoại;
// người chơi mở máy, đọc và CHỌN CÂU TRẢ LỜI — mỗi lựa chọn tính chỉ số riêng (qua GAMEUI.apply)
// và phía bên kia nhắn lại. Luồng hội thoại do flow.js điều phối qua PHONE.setReplies/onReplied.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var threads = {
    family: { name: '👨‍👩‍👧 Gia đình', ava: '👨‍👩‍👧', unread: 0, msgs: [
      { from: 'them', text: 'Mẹ: Con tới nơi thì nhắn cho mẹ một tiếng nhé. Cả nhà lo lắm.' }
    ] },
    lover: { name: '💗 Linh', ava: '💗', unread: 0, msgs: [] }
  };
  var current = null;      // thread đang mở (null = màn hình danh sách)
  var replies = {};        // threadId -> [{text, fx, follow:[...]}]
  var onReplied = null;    // callback của flow

  function totalUnread() { return Object.keys(threads).reduce(function (s, k) { return s + (threads[k].unread || 0); }, 0); }
  function syncBadge() { window.GAMEUI.setPhoneBadge(totalUnread()); }

  function renderList() {
    current = null;
    $('phone-title').textContent = '📱 Tin nhắn';
    $('phone-back').style.visibility = 'hidden';
    var body = $('phone-body'); body.innerHTML = '';
    Object.keys(threads).forEach(function (id) {
      var t = threads[id];
      var last = t.msgs.length ? t.msgs[t.msgs.length - 1].text : '(chưa có tin nhắn)';
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'thread-item'; b.setAttribute('data-thread', id);
      b.innerHTML = '<span class="t-ava"></span><span><span class="t-name"></span><br><span class="t-last"></span></span><span class="t-dot"></span>';
      b.querySelector('.t-ava').textContent = t.ava;
      b.querySelector('.t-name').textContent = t.name;
      b.querySelector('.t-last').textContent = last;
      var dot = b.querySelector('.t-dot');
      dot.textContent = t.unread; dot.classList.toggle('show', t.unread > 0);
      b.addEventListener('click', function () { renderThread(id); });
      body.appendChild(b);
    });
    $('phone-replies').innerHTML = '';
  }
  function renderThread(id) {
    current = id;
    var t = threads[id];
    t.unread = 0; syncBadge();
    $('phone-title').textContent = t.name;
    $('phone-back').style.visibility = 'visible';
    var body = $('phone-body'); body.innerHTML = '';
    t.msgs.forEach(function (m) {
      var d = document.createElement('div');
      d.className = 'msg ' + (m.from === 'me' ? 'me' : 'them');
      d.textContent = m.text;
      body.appendChild(d);
    });
    body.scrollTop = body.scrollHeight;
    renderReplies(id);
  }
  function renderReplies(id) {
    var box = $('phone-replies'); box.innerHTML = '';
    var list = replies[id];
    if (!list || !list.length) {
      box.innerHTML = '<div class="reply-note">Chạm vào tin nhắn khi có lựa chọn trả lời 👆</div>';
      return;
    }
    list.forEach(function (r) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'reply-btn';
      b.textContent = r.text;
      b.addEventListener('click', function () { choose(id, r); });
      box.appendChild(b);
    });
  }
  function pushMsg(id, from, text) {
    threads[id].msgs.push({ from: from, text: text });
    if (current === id) renderThread(id);
    else if ($('phone').classList.contains('show')) renderList();
  }
  function choose(id, r) {
    replies[id] = null;
    pushMsg(id, 'me', r.text);
    if (r.fx && window.GAMEUI) window.GAMEUI.apply(r.fx.deltas || {}, r.fx.note || '');
    var follows = r.follow || [];
    follows.forEach(function (txt, i) {
      setTimeout(function () {
        pushMsg(id, 'them', txt);
        if (i === follows.length - 1) { if (onReplied) onReplied(id); if (r.cb) r.cb(); }
      }, 900 * (i + 1));
    });
    if (!follows.length) { if (onReplied) onReplied(id); if (r.cb) r.cb(); }
    renderReplies(id);
  }
  /* ================= CHẾ ĐỘ CUỘC GỌI THOẠI (cảnh điện thoại §2.3/1.9, 6c-28) =================
     Khác tin nhắn: mở màn hình cuộc gọi riêng (avatar, đồng hồ đếm giờ, bong bóng thoại
     hiện TỪNG LƯỢT — câu của phía bên kia "chạy chữ" sau nhịp chờ như đang nói thật);
     lượt của người chơi = chọn câu đáp (có fx chỉ số như tin nhắn). Câu tiếng Nhật trong
     cuộc gọi hiển thị kèm furigana + dòng dịch dưới bong bóng. */
  var call = null;   // { cfg, lines, idx, sec, timer, wait }
  function furi(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/\{([^{}|]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>');
  }
  function callBubble(who, jp, text, me) {
    var log = $('call-log'); if (!log) return;
    var d = document.createElement('div');
    d.className = 'msg ' + (me ? 'me' : 'them');
    var h = '';
    if (who) h += '<div class="call-who">' + who + '</div>';
    if (jp) h += '<div class="call-jp">' + furi(jp) + '</div>';
    if (text) h += '<div>' + text + '</div>';
    d.innerHTML = h;
    log.appendChild(d);
    var body = $('phone-body'); body.scrollTop = body.scrollHeight;
  }
  function callStatus(t) { var s = $('call-status'); if (s) s.textContent = t; }
  function callTick() {
    if (!call) return;
    call.sec++;
    var m = ('0' + Math.floor(call.sec / 60)).slice(-2), s = ('0' + (call.sec % 60)).slice(-2);
    callStatus('📞 Đang gọi… ' + m + ':' + s);
  }
  function callAdvance() {
    if (!call) return;
    var box = $('phone-replies'); if (!box) return;
    if (call.idx >= call.lines.length) {
      box.innerHTML = '';
      var end = document.createElement('button');
      end.type = 'button'; end.className = 'reply-btn call-end'; end.textContent = '🔴 Kết thúc cuộc gọi';
      end.addEventListener('click', function () { endCall(); });
      box.appendChild(end);
      callStatus('📞 Cuộc gọi sắp kết thúc…');
      return;
    }
    var ln = call.lines[call.idx];
    if (ln.from === 'them') {
      box.innerHTML = '<div class="reply-note">🔊 Đang nghe…</div>';
      call.wait = setTimeout(function () {
        if (!call) return;
        callBubble(ln.who || call.cfg.name, ln.jp, ln.text, false);
        call.idx++;
        callAdvance();
      }, 1100);
    } else if (ln.prompt) {
      box.innerHTML = '';
      ln.prompt.forEach(function (op) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'reply-btn';
        b.textContent = op.label || op.text;
        b.addEventListener('click', function () {
          if (!call) return;
          callBubble(null, op.jp, op.text, true);
          if (op.fx && window.GAMEUI) window.GAMEUI.apply(op.fx.deltas || {}, op.fx.note || '');
          if (op.cb) op.cb();
          call.idx++;
          if (op.reply) call.lines.splice(call.idx, 0, { from: 'them', who: op.reply.who, jp: op.reply.jp, text: op.reply.text });
          callAdvance();
        });
        box.appendChild(b);
      });
    }
  }
  function startCall(cfg) {
    if (call) return;
    call = { cfg: cfg, lines: (cfg.lines || []).slice(), idx: 0, sec: 0, timer: null, wait: null };
    open();
    current = null;
    $('phone-title').textContent = '📞 ' + cfg.name;
    $('phone-back').style.visibility = 'hidden';
    var body = $('phone-body');
    body.innerHTML = '<div class="call-head"><div class="call-ava">' + (cfg.ava || '📞') + '</div>' +
      '<div class="call-name">' + cfg.name + '</div><div class="call-status" id="call-status">📞 Đang kết nối…</div></div>' +
      '<div id="call-log"></div>';
    $('phone-replies').innerHTML = '<div class="reply-note">🔊 Đang kết nối…</div>';
    call.timer = setInterval(callTick, 1000);
    call.wait = setTimeout(function () { callAdvance(); }, 900);
  }
  function endCall() {
    if (!call) return;
    var cb = call.cfg.onEnd;
    clearInterval(call.timer); clearTimeout(call.wait);
    call = null;
    renderList();
    if (cb) cb();
  }

  function receive(id, texts) {
    texts.forEach(function (txt) { threads[id].msgs.push({ from: 'them', text: txt }); });
    threads[id].unread += texts.length;
    syncBadge();
    if ($('phone').classList.contains('show')) { if (current === id) renderThread(id); else if (!current) renderList(); }
  }
  function open() {
    $('phone').classList.add('show');
    if (call) return;   // đang trong cuộc gọi: giữ nguyên màn hình cuộc gọi
    var now = new Date();
    $('phone-clock').textContent = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    if (current) renderThread(current); else renderList();
  }
  function close() { if (call) endCall(); $('phone').classList.remove('show'); }

  document.addEventListener('DOMContentLoaded', function () {});
  window.PHONE = {
    receive: receive, open: open, close: close,
    addThread: function (id, def) { if (!threads[id]) threads[id] = { name: def.name, ava: def.ava || '💬', unread: 0, msgs: [] }; },
    setThreadName: function (id, name) { if (threads[id]) threads[id].name = name; },
    startCall: startCall, callActive: function () { return !!call; },
    setReplies: function (id, list) { replies[id] = list; if (current === id) renderReplies(id); },
    onReplied: function (fn) { onReplied = fn; },
    bind: function () {
      $('btn-phone').addEventListener('click', open);
      $('phone-close').addEventListener('click', close);
      $('phone-back').addEventListener('click', renderList);
    },
    state: function () { return { unread: totalUnread(), threads: Object.keys(threads).map(function (k) { return { id: k, msgs: threads[k].msgs.length, unread: threads[k].unread }; }) }; }
  };
})();
