// trend.js — Câu trend game "Hành trình đến Edo" (Nhánh 4)
// Nguồn lời: ban-giao-game/cau-trend-game.md (bảng chính 94 câu + Bổ sung đợt 2: 129 câu = 223 câu).
// Giữ nguyên lời, không chế thêm. {X} thay bằng GAME_USER.call (anh/chị/tên; khách = 'bạn').
// PHÁT ÂM (Nhánh V): ủy quyền window.GAME_VOICE.speak (voice.js) nếu có —
//   lõi đó ưu tiên BẢN GHI trong ../audio-index.json, rồi BẢN ĐỌC kana trích
//   từ furigana {chữ|cách đọc}, rồi mới TTS theo kiểu giọng đã cài. voice.js
//   vắng mặt -> rơi về đường speechSynthesis cũ trong file này (giữ nguyên).
// BONG BÓNG (Nhánh V, việc 5b): trên màn hẹp (<=860px) #gt-bubble nằm TRONG
//   LUỒNG trong #gt-bubble-host chèn ngay sau topbar/header — không còn
//   position:fixed nổi tự do nên không đè vùng đáp án (.opt). Desktop giữ
//   fixed neo theo linh vật như cũ.
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

  /* Việc G — THẺ TÌNH HUỐNG theo khoảnh khắc (đấu đơn): nhóm câu khen/
   * ăn mừng khi ĐANG THẮNG, nhóm gỡ gạc/động viên khi ĐANG THUA, nhóm
   * mở trận/trợ giúp/đổi câu là TRUNG TÍNH dùng mọi lúc. Khoảnh khắc
   * do màn chơi truyền vào say() vốn đã đúng tình thế (đúng/sai/hết
   * giờ/thắng/thua trận) nên thẻ ở đây chỉ là lớp phân loại báo cáo. */
  var SITUATION = {
    dung: 'win', combo: 'win', nhanh: 'win', thang: 'win',
    sai: 'lose', hetgio: 'lose', thua: 'lose', roi: 'lose',
    vao: 'neu', trogiup: 'neu', doicau: 'neu',
  };
  /* Việc G — TÚI XÁO TRỘN (shuffle-bag) theo từng khoảnh khắc: một câu
   * đã phát thì không phát lại cho tới khi dùng hết cả nhóm; hết nhóm
   * mới xáo vòng mới (và tránh câu cuối vòng trước lặp ngay đầu vòng
   * sau khi nhóm có từ 2 câu). Thay cơ chế cũ chỉ tránh lặp liền 1 câu. */
  var bags = {};
  function shuffledIdx(n) {
    var a = []; for (var i = 0; i < n; i++) a.push(i);
    for (var j = n - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = a[j]; a[j] = a[k]; a[k] = tmp;
    }
    return a;
  }
  function pick(moment) {
    var arr = TREND[moment];
    if (!arr || !arr.length) return null;
    if (arr.length === 1) { lastIdx[moment] = 0; return arr[0]; }
    var bag = bags[moment];
    if (!bag || bag.pos >= bag.order.length) {
      var order = shuffledIdx(arr.length);
      if (bag && arr[order[0]] === bag.last) { var t0 = order[0]; order[0] = order[1]; order[1] = t0; }
      bag = bags[moment] = { order: order, pos: 0, last: bag ? bag.last : null };
    }
    var idx = bag.order[bag.pos++];
    bag.last = arr[idx];
    lastIdx[moment] = idx;
    return arr[idx];
  }

  // ---- Furigana {chữ|cách đọc}: tách bản HIỂN THỊ và bản ĐỌC (cùng
  // regex với stripFuri/furiReading của questions.js). Câu trend hiện
  // không chứa markup này, nhưng nếu có (hoặc show() được gọi với text
  // có furigana) thì phần đọc sẽ truyền reading cho GAME_VOICE để TTS
  // đọc đúng kana thay vì đoán kanji/tên người.
  function stripFuri(s) {
    return String(s == null ? '' : s).replace(/\{([^{}|]+)\|[^{}]*\}/g, '$1').replace(/[{}]/g, '');
  }
  function furiReading(s) {
    return String(s == null ? '' : s).replace(/\{[^{}|]+\|([^{}]*)\}/g, '$1');
  }
  function hasFuri(s) { return /\{[^{}|]+\|[^{}]*\}/.test(String(s || '')); }

  // ---- Bong bóng thoại (DOM an toàn: chỉ textContent, không innerHTML) ----
  // Nhánh V (5b): bong bóng sống trong #gt-bubble-host đặt ngay sau
  // topbar/header. CSS nhúng 1 lần bằng thẻ <style>:
  //  - >860px: host không chiếm chỗ (height:0), bong bóng fixed như cũ.
  //  - <=860px: host là khối TRONG LUỒNG (đẩy nội dung xuống, không đè
  //    lên .opt); bong bóng thành phần tử thường trong host, chữ dài bị
  //    kẹp ~3 dòng + cuộn dọc trong khung, không phình trang.
  // FIX2 (30/10, góp ý chủ trang "khung câu hỏi/đáp án nhảy lên sau vài
  // giây, bấm nhầm"): bản 5b cho host CHIỀU CAO CO GIÃN theo bong bóng —
  // hiện (say ở 'vao'/sau mỗi câu trả lời) thì đẩy khung câu hỏi xuống,
  // ẩn sau 3,6s (scheduleHide) thì khung NHẢY LÊN đúng lúc người chơi
  // đang ngắm đáp án. Nay host GIỮ CHỖ CỐ ĐỊNH (92px = đúng max-height
  // của bong bóng: 3 dòng * 1.45em * 15px + padding 20 + border 4, dư
  // biên) trong suốt phiên, bong bóng chỉ đổi visibility/opacity —
  // vị trí khung câu hỏi + đáp án không đổi dù bong bóng hiện/ẩn/đổi câu.
  var bubbleHost = null;
  var bubbleStyleDone = false;
  function ensureBubbleStyle() {
    if (bubbleStyleDone) return;
    bubbleStyleDone = true;
    try {
      var st = document.createElement('style');
      st.id = 'gt-bubble-style';
      st.textContent =
        '#gt-bubble-host{display:block;height:0;margin:0;padding:0}' +
        '#gt-bubble{position:fixed;z-index:9990;max-width:min(78vw,320px);' +
        'background:#fff;color:#1d2440;border:2px solid #233d63;border-radius:16px;' +
        'padding:10px 14px;font-size:15px;font-weight:700;line-height:1.45;' +
        'box-shadow:0 8px 24px rgba(20,25,60,.28);opacity:0;pointer-events:none;' +
        'transition:opacity .18s ease, transform .18s ease;transform:translateY(6px)}' +
        '@media (max-width:860px){' +
        '#gt-bubble-host{height:92px;margin:8px 10px 0}' +
        '#gt-bubble{visibility:hidden;position:relative!important;left:auto!important;' +
        'top:auto!important;bottom:auto!important;transform:none!important;' +
        'max-width:100%!important;width:auto;box-sizing:border-box;' +
        'max-height:calc(1.45em * 3 + 22px);overflow-y:auto}' +
        '#gt-bubble-host.gt-on #gt-bubble{visibility:visible}' +
        '}';
      (document.head || document.body).appendChild(st);
    } catch (e) { /* không có style: desktop vẫn chạy nhờ style nội tuyến dự phòng */ }
  }
  function ensureBubble() {
    if (bubbleEl && bubbleEl.parentNode) return bubbleEl;
    ensureBubbleStyle();
    if (!bubbleHost || !bubbleHost.parentNode) {
      bubbleHost = document.createElement('div');
      bubbleHost.id = 'gt-bubble-host';
      var top = document.querySelector('.gtop, #gtop, header');
      if (top && top.parentNode) top.parentNode.insertBefore(bubbleHost, top.nextSibling);
      else if (document.body) document.body.insertBefore(bubbleHost, document.body.firstChild);
    }
    bubbleEl = document.createElement('div');
    bubbleEl.id = 'gt-bubble';
    bubbleEl.className = 'gt-bubble';
    bubbleEl.setAttribute('role', 'status');
    // Dự phòng khi <style> không chèn được: desktop vẫn fixed như cũ.
    // Ở <=860px, các !important trong <style> sẽ thắng style nội tuyến này.
    bubbleEl.style.cssText = 'position:fixed;z-index:9990;max-width:min(78vw,320px);' +
      'background:#fff;color:#1d2440;border:2px solid #233d63;border-radius:16px;' +
      'padding:10px 14px;font-size:15px;font-weight:700;line-height:1.45;' +
      'box-shadow:0 8px 24px rgba(20,25,60,.28);opacity:0;pointer-events:none;' +
      'transition:opacity .18s ease, transform .18s ease;transform:translateY(6px)';
    bubbleHost.appendChild(bubbleEl);
    return bubbleEl;
  }
  function isNarrow() {
    try {
      if (window.matchMedia) return window.matchMedia('(max-width:860px)').matches;
    } catch (e) {}
    return (window.innerWidth || 1024) <= 860;
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
    el.textContent = fillX(stripFuri(text)); // hiển thị không kèm {chữ|đọc}
    if (bubbleHost) bubbleHost.classList.add('gt-on');
    if (isNarrow()) {
      // Trong luồng: không neo tọa độ, không transform — host ngay dưới
      // topbar đẩy vùng câu hỏi/đáp án xuống, giao nhau với .opt = 0.
      el.style.left = '';
      el.style.top = '';
      el.style.bottom = '';
      el.style.transform = 'none';
      el.style.opacity = '1';
      scheduleHide();
      return el.textContent;
    }
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
    if (!isNarrow()) bubbleEl.style.transform = 'translateY(6px)';
    // Màn hẹp: gỡ .gt-on để host thu lại (bong bóng display:none theo CSS).
    if (bubbleHost) {
      var host = bubbleHost;
      setTimeout(function () { host.classList.remove('gt-on'); }, 200);
    }
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

  // ---- Phát âm: ưu tiên ủy quyền GAME_VOICE (voice.js, Nhánh V) ----
  // GAME_VOICE tự lo: công tắc + âm lượng + kiểu giọng + bản ghi + bản đọc.
  // Không có GAME_VOICE -> speakLegacy (đường cũ, giữ nguyên hành vi).
  function speak(text, reading) {
    try {
      if (window.GAME_VOICE && typeof window.GAME_VOICE.speak === 'function') {
        window.GAME_VOICE.speak(text, reading ? { reading: reading } : undefined);
        return;
      }
    } catch (e) { /* rơi xuống đường cũ */ }
    speakLegacy(text);
  }

  function speakLegacy(text) {
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
      var v = voiceFor(p.ja ? 'ja' : 'vi');
      // FIX2 (30/10): đường đọc cũ này trước đây không đặt u.volume —
      // nay theo mức Giọng đọc đã lưu (giống hệt lõi GAME_VOICE).
      var vol01 = 1;
      try {
        var vv = parseInt(localStorage.getItem('hn_game_vol_voice'), 10);
        vol01 = isNaN(vv) ? 1 : Math.max(0, Math.min(100, vv)) / 100;
      } catch (e) {}
      /* FIX3 (Lỗi 4): bản cũ TỰ đặt u.rate = 1.1/1.08 + u.pitch = 1.15
         BẤT KỂ kiểu giọng đã chọn trong ⚙️ — đường dự phòng này nuốt
         mất preset (chọn "Chất" vẫn đọc như thường). Nay áp qua HÀM
         CHUNG GAME_VOICE_STYLE.applyTo như mọi đường khác; chọn giọng
         cho 'chat' ở đường này cũng ưu tiên giọng nam/trầm. */
      var styleNow = 'thuong';
      try { styleNow = localStorage.getItem('hn_game_voice_style') || 'thuong'; } catch (e) {}
      if (styleNow === 'chat' && v && /kyoko|o[\s-]?ren|nanami|haruka|ayumi|female|hoai\s?my/i.test(String(v.name || ''))) {
        try {
          var vs = window.speechSynthesis.getVoices();
          for (var vi = 0; vi < vs.length; vi++) {
            var vl = (vs[vi].lang || '').replace('_', '-').toLowerCase();
            if (vl.indexOf(p.ja ? 'ja' : 'vi') === 0 && /otoya|ichiro|keita|takumi|nam\s?minh|\bmale\b/i.test(String(vs[vi].name || ''))) { v = vs[vi]; break; }
          }
        } catch (e) {}
      }
      if (window.GAME_VOICE_STYLE && typeof window.GAME_VOICE_STYLE.applyTo === 'function') {
        window.GAME_VOICE_STYLE.applyTo(u, { lang: p.ja ? 'ja-JP' : 'vi-VN', voice: v, volume: vol01, style: styleNow });
      } else {
        u.lang = p.ja ? 'ja-JP' : 'vi-VN';
        if (v) { try { u.voice = v; } catch (e) {} }
        u.rate = 1.0; u.pitch = 1.0; u.volume = vol01;
      }
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
    // Furigana (nếu câu có): hiển thị bản strip, đọc theo bản kana.
    var display = stripFuri(text);
    var reading = hasFuri(text) ? furiReading(text) : null;
    show(display, anchorEl);
    speak(display, reading);
    return display;
  }

  function stop() {
    try {
      if (window.GAME_VOICE && typeof window.GAME_VOICE.stop === 'function') window.GAME_VOICE.stop();
      else if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (e) {}
    if (duckTimer) clearTimeout(duckTimer);
    duck(false);
    hideBubble();
  }

  window.GTREND = { say: say, show: show, bubble: show, stop: stop, TREND: TREND, SITUATION: SITUATION, situationOf: function (m) { return SITUATION[m] || 'neu'; }, _test: { stripFuri: stripFuri, furiReading: furiReading, hasFuri: hasFuri, isNarrow: isNarrow, pick: pick, resetBags: function () { bags = {}; } } };
})();
