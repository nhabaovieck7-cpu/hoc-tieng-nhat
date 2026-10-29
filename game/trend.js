// trend.js — Câu trend game "Hành trình đến Edo" (Nhánh 4)
// Nguồn lời: ban-giao-game/cau-trend-game.md (bảng chính 94 câu + Bổ sung đợt 2: 129 câu = 223 câu).
// Giữ nguyên lời, không chế thêm. {X} thay bằng GAME_USER.call (anh/chị/tên; khách = 'bạn').
// Đọc to bằng speechSynthesis: đoạn tiếng Nhật (kana/kanji) -> ja-JP, còn lại -> vi-VN.
// Tôn trọng công tắc giọng localStorage 'hn_game_snd_voice' (đọc lại mỗi lần phát).
// API: window.GTREND = { say(moment, anchorEl?|opts?), show(text, anchorEl?), bubble (bí danh của show), stop(), TREND }
(function () {
  'use strict';

  var TREND = {
    "vao": ["Có làm thì mới có ăn — {X} vào trận thôi!", "Ai sợ thì đi về, còn {X} thì ở lại quẩy!", "Mời đoàn mình di chuyển lên… võ đài 🏟️", "Tới công chuyện rồi {X} ơi!", "Bật chế độ bay lên! 🚀", "Nghe theo tổ tiên mách bảo: học kanji đi {X}", "Đi đi {X}, do dự trời tối mất!", "Hồi chiều trời mưa… giờ thì mưa kanji ☔", "いくぞ！ Chiến thôi {X}!", "Ăm chã húi! Vào trận thôi {X}", "Hôm nay {X} quyết tâm out trình cả bản đồ", "Trùm ơi chuẩn bị tâm lý đi nha", "Học là phải chất, đánh là phải gắt!", "{X} nhà bao việc mà vẫn ghé học, nể ghê", "Khởi động ngón tay, kích hoạt não bộ 🧠", "Một chữ cũng là chữ, triển thôi {X}", "Hôm nay ai cản {X} là trùm thôi", "がんばって！{X} cố lên!", "よっしゃ！Quẩy thôi", "Lên đồ xong rồi, chiến thôi {X}", "Không học thì thôi, học là phải cháy 🔥"],
    "dung": ["Đỉnh nóc kịch trần bay phấp phới!", "Đỉnh của chóp luôn {X} ơi!", "Vuýp! Câu này {X} xử gọn", "Tuyệt vời, uống nào! 🧋", "Nó cứ phải gọi là nét luôn!", "Ra đời em nể mỗi {X}", "Vượt mức pickleball luôn!", "Trộm vía {X} học giỏi quá", "8386 mãi đỉnh mãi đỉnh!", "Thắng đời 1-0 ✌️", "Bá khí ngút trời!", "{X} đang farm aura đó hả?", "Slay! Câu này {X} ăn trọn", "やばい！Quá dữ!", "神！{X} là thần (kami) rồi", "Ngoan xinh yêu… à không, ngầu xinh yêu 😎", "Chuẩn không cần chỉnh!", "Chất như nước cất 💧", "Ăn điểm ngon ơ", "Kanji này hết đường chạy rồi 😤", "Gọn lẹ như ninja", "Nét căng, không cần chỉnh màu", "Não {X} đang chạy 5G", "{X} học ít mà hiểu nhiều ghê", "Nhìn là biết dân chơi kanji", "Trúng phóc! Chuẩn từng nét", "Đúng rồi đó, cho {X} 10 điểm không có nhưng", "Cái này gọi là đẳng cấp", "Thơm! Câu này thơm", "Dễ như ăn kẹo", "Mượt như sữa chua", "Tâm phục khẩu phục", "{X} học kiểu này trùm ngủ không yên", "Ngon lành cành đào 🌸", "いいね！Ngon!", "さすが！Đúng là {X}", "完璧！Hoàn hảo", "正解！Chính xác", "Một phát ăn ngay"],
    "combo": ["Giảm sức mạnh con tướng này giúp em!!", "Tôi năm nay hơn 70 tuổi chưa thấy ai học như {X} này!", "Về kể không ai tin luôn!", "Cạn phước lắm mới thấy được combo này", "Cá thể vượt trội! Trùng sinh chắc luôn", "Vua chúa cũng chỉ đến thế!", "Hơn cả khu tự trị!", "Đọc STK đi {X}, khen hoài ngại quá!", "Điều mà chẳng ai làm được!", "Ngôn tình cũng không dám viết nhân vật chính như {X}", "Thua Gia Cát Lượng mỗi cái quạt 🪭", "{X} mà vô chùa là không biết lạy ai luôn", "エモい… combo này đẹp muốn khóc", "草 草 草 — trùm cười không nổi luôn", "Combo không phanh luôn!", "Chuỗi này chắc phải đóng khung", "{X} đang on fire 🔥🔥🔥", "Trùm xin số tài khoản để chuyển tiền chuộc", "Ai đó gọi cứu thương cho trùm!", "Bảng xếp hạng đang run rẩy", "Đây không phải học, đây là biểu diễn", "Combo này lên top trending chắc luôn", "Chưa thấy ai cháy như {X}", "Người hay cảnh đẹp? Người!", "Tay nhanh, não nhanh, combo dài", "{X} có hack không đó? Đùa thôi 🤣", "Trùm đang tính đổi nghề", "Chuỗi dài như hàng chờ trà sữa", "無双！Vô song!", "止まらない！Không dừng được!", "神コンボ！Combo thần thánh", "Quá đỉnh, xin chữ ký {X}"],
    "nhanh": ["Ủa alo? Nhanh vậy trời?", "Đoán vội mà trúng luôn!", "Ê khó nha bro… mà {X} dễ ợt", "Cái quái đản gì thế, sao nhanh vậy!", "Nghe vô lý nhưng rất thuyết phục: {X} quá nhanh", "Liêm's sỉ của trùm đâu rồi? Chưa kịp chớp mắt!", "はやっ！Nhanh như shinkansen 🚄", "Chớp mắt cái là xong", "Nhanh như người yêu cũ trở mặt 😆", "Tốc độ ánh sáng!", "Trùm chưa kịp load", "Ngón tay {X} có turbo à?", "Bấm nhanh hơn wifi nhà hàng xóm", "Đọc đề xong là trả lời luôn", "Tốc độ này đi thi JLPT dư giờ", "Nhanh như shipper giờ cao điểm", "瞬殺！Hạ trong chớp mắt", "秒で！Tính bằng giây"],
    "sai": ["Hên lắm mới xui được vậy á", "Thua đời 1-0, gỡ lại liền!", "Tôi biết nhưng tôi không chứng minh được 🥲", "Chưa đủ wow, làm lại nha {X}", "U là trời! Suýt nữa thôi", "Tại kanji, tất cả là tại kanji", "Hướng nội hết phần đời còn lại… 5 giây thôi rồi chơi tiếp", "Giỡn vậy có nên không trời 😵", "Đã làm gì đâu, đã chạm vào đâu!", "Mọi thứ hóa điên với {X} ngày hôm nay 🤯", "ドンマイ！Không sao đâu {X}", "Sai thì sửa, ngại gì!", "Lỡ tay thôi, không tính", "Kanji này lươn lẹo ghê", "Không sao, ai mà chẳng có lúc quên", "Chữ này chơi xấu {X} rồi", "Bình tĩnh, tự tin, không cay cú", "Sai một ly, học thêm một chữ", "Thả lỏng đi {X}, câu sau gỡ", "Quên chút xíu thôi, mai nhớ liền", "Câu này để dành ôn lại nha", "惜しい！Tiếc ghê!", "あれ？Ủa sao kì vậy?"],
    "hetgio": ["Hồi chiều trời mưa… nên {X} chậm xíu thôi", "Nơi lạnh nhất lúc này: đồng hồ của {X} ❄️", "Dự án ma: câu này chưa kịp trả lời 👻", "Im lặng là vàng… nhưng hết giờ rồi {X} ơi", "Ét o ét! Đồng hồ chạy mất rồi", "Nín… thở xíu rồi câu sau phục thù", "Họ chưa từng hỏi tôi có muốn hết giờ hay không", "Đồng hồ chạy nhanh hơn người yêu cũ", "Chậm một nhịp thôi mà", "Suy nghĩ kỹ quá cũng không tốt nha {X}", "Thời gian không chờ ai, nhưng câu sau chờ {X}", "Tick tock… hết giờ rồi", "Lag nhẹ thôi, không sao", "時間切れ！Hết giờ!"],
    "thua": ["Flop quá thì ghi tên trùm vào, không phải {X}!", "Người cười cuối cùng mới là người quan trọng — trận sau!", "Không có bông tuyết nào trong sạch, trùm ăn gian đó 😤", "Còn cái nịt… nhưng còn {X} là còn hy vọng", "Khổ nhất thế giới… trong 3 giây thôi", "Ê nha, không có hỗn nha trùm!", "Nhiều cái chưa muốn nói đâu, mai {X} quay lại xử", "悔しい！Tức ghê, phục thù thôi", "Thua keo này ta bày keo khác", "Thất bại là mẹ thành công, mà mẹ hơi đông con", "Trùm ăn may thôi, mai tính sổ", "Hồi máu, uống nước, đánh lại", "Không thua, chỉ là chưa thắng", "Nghỉ 5 phút rồi quay lại báo thù", "Hôm nay trùm gặp may, mai gặp {X}", "Thua nhưng vẫn đẹp trai/xinh gái như thường", "次こそ！Lần sau nhất định!", "まだまだ！Còn lâu mới bỏ cuộc"],
    "thang": ["Phải tôi tôi đập chết nó — mà {X} đập thật rồi kìa! 💥", "Trùm ơi, ai sợ thì đi về!", "Có làm thì mới có ăn — {X} ăn trọn chiến thắng 🍜", "Tôi năm nay hơn 70 tuổi chưa thấy trùm nào thua thảm thế này", "Anh em mình cứ thế thôi, hẹ hẹ", "Trùm: 'Thân chưa mà giỡn kiểu đó?' 😭", "Kính thưa hội đồng xét xử: trùm đã thua!", "Độc lạ Edo: trùm khóc nhè", "Làm gì có ai đỉnh hơn sếp {X}!", "最強！{X} mạnh nhất rồi", "Trùm cuối cũng phải gọi {X} bằng sư phụ", "Đã thắng còn thắng đẹp", "Ghi tên {X} vào sử sách Edo", "Chiến thắng này xin dành tặng… cá khô của mèo", "Bản đồ mở khóa, trùm mở mắt", "Trùm xin rút kinh nghiệm sâu sắc", "Làng Sakura mở tiệc mừng {X}", "Out trình, out luôn bản đồ", "Trùm: 'Tui chỉ đùa thôi mà' 😭", "勝った！Thắng rồi!", "やったー！Yeah!", "優勝！Vô địch!"],
    "trogiup": ["Nhét chữ vào mồm giúp {X} nè ✂️", "Ai gọi trợ giúp? Có em đây!", "Chuyển qua thuốc nam coi thử đỡ không? 🌿", "Mình xin phép ăn miếng to nhé: bỏ 2 đáp án!", "Tôi nghe và không phán xét 🤫", "+1 thời gian cho {X} nha", "Gọi điện cho người thân… à không, cho mèo", "Bí thì dùng chiêu, không ai cười đâu", "Trợ giúp tới, trùm hết đường", "Đổi câu cho đổi vận", "Câu này khó quá, đổi câu khác xinh hơn", "Thêm giờ cho {X} suy nghĩ thật sâu", "Dùng đúng lúc là cao thủ", "Câu mới, vận mới, điểm mới", "チェンジ！Đổi!", "助けて！Cứu với!"],
    "roi": ["Trên núi hết chỗ rồi, mời đoàn mình di chuyển xuống 1 tầng", "Hên lắm mới xui được vậy, leo lại thôi {X}", "Làm quá nó ô dề, rơi nhẹ thôi mà", "Đúng nhận sai cãi… à không, sai thì leo lại 😅", "Keo lỳ tái châu — leo tiếp!", "Rơi 1 tầng thôi, ai sợ thì đi về, {X} thì leo tiếp!", "Rơi tầng là để bật cao hơn", "Lùi một bước tiến ba bước", "Tầng dưới cũng view đẹp mà", "Trượt chân nhẹ, đứng dậy liền", "Tầng cũ quen đường, leo nhanh thôi", "落ちた！Rơi rồi, leo lại!"],
    "doicau": ["Đổi câu cho đổi vận", "Câu này khó quá, đổi câu khác xinh hơn", "Câu mới, vận mới, điểm mới", "チェンジ！Đổi!", "Mời đoàn mình di chuyển sang câu khác giúp em", "Câu này chưa đủ wow, đổi!", "Nghe theo tổ tiên mách bảo: đổi câu", "Thôi bỏ qua, {X} xứng đáng câu đẹp hơn"]
  };

  var LS_VOICE = 'hn_game_snd_voice';
  var lastIdx = {};      // chống lặp liền theo từng khoảnh khắc
  var bubbleEl = null;
  var bubbleTimer = null;
  var cachedCall = null; // call đã resolve từ GAME_USER (Promise hoặc object)
  var duckTimer = null;

  function voiceOn() {
    try { return localStorage.getItem(LS_VOICE) !== '0'; } catch (e) { return true; }
  }

  // ---- GAME_USER: Promise<{call,...}> (nhánh 1) — hook an toàn, không bắt buộc có ----
  function harvestCall(u) {
    if (u && typeof u.call === 'string' && u.call) cachedCall = u.call;
  }
  function resolveUser() {
    try {
      var gu = window.GAME_USER;
      if (!gu) return;
      if (typeof gu.then === 'function') { gu.then(harvestCall).catch(function () {}); }
      else harvestCall(gu);
    } catch (e) { /* im lặng: khách */ }
  }
  resolveUser();

  function fillX(text) {
    resolveUser();
    var call = cachedCall || 'bạn'; // chưa rõ người dùng -> khách
    return String(text).split('{X}').join(call);
  }

  function pick(moment) {
    var arr = TREND[moment];
    if (!arr || !arr.length) return null;
    if (arr.length === 1) { lastIdx[moment] = 0; return arr[0]; }
    var i;
    do { i = Math.floor(Math.random() * arr.length); } while (i === lastIdx[moment]);
    lastIdx[moment] = i;
    return arr[i];
  }

  // ---- Bong bóng thoại (DOM an toàn: chỉ textContent, không innerHTML) ----
  function ensureBubble() {
    if (bubbleEl && bubbleEl.parentNode) return bubbleEl;
    bubbleEl = document.createElement('div');
    bubbleEl.id = 'gt-bubble';
    bubbleEl.className = 'gt-bubble';
    bubbleEl.setAttribute('role', 'status');
    bubbleEl.style.cssText = 'position:fixed;z-index:9990;max-width:min(78vw,320px);' +
      'background:#fff;color:#1d2440;border:2px solid #233d63;border-radius:16px;' +
      'padding:10px 14px;font-size:15px;font-weight:700;line-height:1.45;' +
      'box-shadow:0 8px 24px rgba(20,25,60,.28);opacity:0;pointer-events:none;' +
      'transition:opacity .18s ease, transform .18s ease;transform:translateY(6px)';
    document.body.appendChild(bubbleEl);
    return bubbleEl;
  }

  function findAnchor(anchorEl) {
    if (anchorEl && anchorEl.getBoundingClientRect) return anchorEl;
    var sel = ['#mascot', '.mascot', '#gt-anchor', '.gt-anchor', '#charAvatar', '.char-avatar'];
    for (var i = 0; i < sel.length; i++) {
      var el = document.querySelector(sel[i]);
      if (el) return el;
    }
    return null;
  }

  function show(text, anchorEl) {
    if (!text) return;
    var el = ensureBubble();
    el.textContent = fillX(text);
    var anchor = findAnchor(anchorEl);
    if (anchor) {
      var r = anchor.getBoundingClientRect();
      el.style.left = Math.max(8, Math.min(window.innerWidth - 200, r.left + r.width / 2 - 90)) + 'px';
      el.style.top = 'auto';
      el.style.bottom = Math.max(8, window.innerHeight - r.top + 10) + 'px';
    } else {
      el.style.left = '50%';
      el.style.bottom = '96px';
      el.style.top = 'auto';
      el.style.transform = 'translate(-50%,6px)';
      requestAnimationFrame(function () { el.style.transform = 'translate(-50%,0)'; });
      el.style.opacity = '1';
      scheduleHide();
      return;
    }
    el.style.transform = 'translateY(0)';
    el.style.opacity = '1';
    scheduleHide();
  }

  function scheduleHide() {
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(hideBubble, 3600);
  }
  function hideBubble() {
    if (!bubbleEl) return;
    bubbleEl.style.opacity = '0';
    bubbleEl.style.transform = 'translateY(6px)';
  }

  // ---- Đọc to: tách đoạn Nhật / Việt ----
  function voiceFor(prefix) {
    try {
      var vs = window.speechSynthesis.getVoices();
      for (var i = 0; i < vs.length; i++) {
        var lang = (vs[i].lang || '').replace('_', '-').toLowerCase();
        if (lang.indexOf(prefix) === 0) return vs[i];
      }
    } catch (e) {}
    return null;
  }

  function splitLang(text) {
    // Đoạn chứa kana/kanji (+ dấu ！) đọc ja-JP, phần còn lại vi-VN.
    var raw = text.split(/([\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff！]+)/g);
    var parts = [];
    raw.forEach(function (seg) {
      if (!seg || !seg.trim()) return;
      var isJa = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(seg);
      parts.push({ text: seg, ja: isJa });
    });
    return parts;
  }

  function duck(on) {
    try { if (window.GMUSIC && typeof window.GMUSIC.duck === 'function') window.GMUSIC.duck(!!on); } catch (e) {}
  }

  function speak(text) {
    if (!voiceOn()) return;
    if (!window.speechSynthesis) return;
    var clean = text.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, '').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    var parts = splitLang(clean);
    if (!parts.length) return;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    duck(true);
    if (duckTimer) clearTimeout(duckTimer);
    // An toàn: nhả duck tối đa sau 12 giây dù sự kiện onend không về (lỗi iOS thỉnh thoảng gặp).
    duckTimer = setTimeout(function () { duck(false); }, 12000);
    parts.forEach(function (p, idx) {
      var u = new SpeechSynthesisUtterance(p.text);
      u.lang = p.ja ? 'ja-JP' : 'vi-VN';
      var v = voiceFor(p.ja ? 'ja' : 'vi');
      if (v) u.voice = v;
      u.rate = p.ja ? 1.1 : 1.08;
      u.pitch = 1.15;
      if (idx === parts.length - 1) {
        u.onend = u.onerror = function () {
          if (duckTimer) clearTimeout(duckTimer);
          duck(false);
        };
      }
      window.speechSynthesis.speak(u);
    });
  }

  // ---- API ----
  // say(moment, anchorEl?) hoặc say(moment, {anchorEl|anchor}) — hợp đồng CONTRACT + đặc tả nhánh 4.
  function say(moment, arg) {
    var anchorEl = null;
    if (arg) {
      if (arg.getBoundingClientRect) anchorEl = arg;
      else if (typeof arg === 'object') anchorEl = arg.anchorEl || arg.anchor || null;
    }
    var key = moment;
    if (key === 'chem') key = 'trogiup'; // "Chém gió": dùng chung kho câu preset (không thêm câu ngoài nguồn)
    var raw = pick(key);
    if (!raw) return null;
    var text = fillX(raw);
    show(text, anchorEl);
    speak(text);
    return text;
  }

  function stop() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    if (duckTimer) clearTimeout(duckTimer);
    duck(false);
    hideBubble();
  }

  window.GTREND = { say: say, show: show, bubble: show, stop: stop, TREND: TREND };
})();
