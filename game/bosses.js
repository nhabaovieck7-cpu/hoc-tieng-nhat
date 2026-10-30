/* bosses.js — Việc J (Đợt game 3): dàn BOSS phong phú, KHÔNG TRÙNG LẶP.
   window.GBOSS theo CONTRACT-B3 mục BOSS:
     GBOSS.ALL  : >=16 boss {id,name,emoji,sub,color,theme,line,lv,tier,hpMul,spdMul}
                  (gồm 5 boss gốc của dau-kanji.js, giữ nguyên name/emoji/color/hp gốc)
     GBOSS.get(id) / GBOSS.byTier(t) / GBOSS.byLevel(lv)
     GBOSS.next(): túi xáo trộn bền qua sessionStorage 'hn_boss_bag_v1'
                  + boss cuối trong localStorage 'hn_boss_last' —
                  không bao giờ trả boss vừa trả ở lần gọi ngay trước
                  (kể cả khi vừa xáo túi mới); hết túi mới xáo lại.
   Phụ trợ (không nằm trong contract, dùng cho tích hợp):
     GBOSS.baseHp(lv)   : máu gốc theo cấp {N5:90,N4:100,N3:110,N2:120,N1:130}
     GBOSS.effHp(boss)  : Math.round(baseHp(boss.lv) * boss.hpMul)
     GBOSS.removeFromBag(id): loại 1 boss khỏi túi phiên hiện tại (khi chọn tay)
     GBOSS.campaign(stage)  : ánh xạ cố định chặng chiến dịch 0..9 -> boss
                              (tier tăng dần, chặng cuối = 'shogun')
   Thuần dữ liệu + storage, không phụ thuộc file nào khác. */
(function () {
  'use strict';

  var BASE_HP = { N5: 90, N4: 100, N3: 110, N2: 120, N1: 130 };

  var ALL = [
    /* ---- 5 boss gốc của dau-kanji.js (id/name/emoji/color/hp giữ nguyên,
       hp gốc -> hpMul 1.0 để máu hiệu dụng đúng bằng hp gốc cũ) ---- */
    { id: 'oni-do', name: 'Oni Đỏ', emoji: '👹', sub: '', color: '#ff7eb6', theme: 'Làng Sakura', line: 'Hô hô! Kanji của ta giấu sau mặt nạ này, đoán được không?', lv: 'N5', tier: 1, hpMul: 1.0, spdMul: 1.0, hp: 90 },
    { id: 'kappa', name: 'Kappa Láu Cá', emoji: '🐸', sub: '', color: '#2fbf71', theme: 'Rừng Tre Ma', line: 'Đĩa nước trên đầu ta mà đổ là ta thua — mà ta nhanh lắm đấy!', lv: 'N4', tier: 2, hpMul: 1.0, spdMul: 1.0, hp: 100 },
    { id: 'tengu', name: 'Tengu Mũi Dài', emoji: '👺', sub: '', color: '#22d3ee', theme: 'Lâu đài Mây', line: 'Mũi ta dài vì ta biết nhiều kanji khó — thử đọ xem!', lv: 'N3', tier: 3, hpMul: 1.0, spdMul: 1.0, hp: 110 },
    { id: 'ryujin', name: 'Rồng Lửa Ryūjin', emoji: '🐉', sub: '', color: '#ff7a45', theme: 'Núi Lửa Fuji', line: 'Lửa của ta nung chảy cả thép, kanji của ngươi chịu nổi không?', lv: 'N2', tier: 4, hpMul: 1.0, spdMul: 1.0, hp: 120 },
    { id: 'shogun', name: 'Shogun Bóng Tối', emoji: '🥷', sub: '', color: '#7c5cff', theme: 'Kinh thành Edo', line: 'Ta là trùm cuối của Edo. Qua được ta, kanji nào cũng không làm khó ngươi nữa.', lv: 'N1', tier: 5, hpMul: 1.0, spdMul: 1.0, hp: 130 },

    /* ---- 13 boss mới: yêu quái / thần thoại Nhật ---- */
    { id: 'tanuki', name: 'Tanuki Bụng Bự', emoji: '🦝', sub: '🍶', color: '#b08968', theme: 'Đồi Biến Hình', line: 'Bụng ta tròn vo gõ trống được luôn — mà kanji ta giấu cũng tròn không kém!', lv: 'N5', tier: 1, hpMul: 0.9, spdMul: 0.9 },
    { id: 'bakeneko', name: 'Bakeneko Hai Đuôi', emoji: '🐱', sub: '🔥', color: '#f59e0b', theme: 'Ngõ Mèo Hoang', line: 'Meo… hai đuôi của ta quẫy là đáp án đổi chỗ đấy, nhìn cho kỹ!', lv: 'N5', tier: 1, hpMul: 0.95, spdMul: 1.05 },
    { id: 'kitsune', name: 'Kitsune Chín Đuôi', emoji: '🦊', sub: '✨', color: '#ff922b', theme: 'Đền Hồ Ly', line: 'Chín đuôi, chín mẹo lừa — đáp án thật chỉ có một thôi nhé!', lv: 'N4', tier: 2, hpMul: 1.05, spdMul: 1.1 },
    { id: 'yuki-onna', name: 'Yuki-onna Tuyết Lạnh', emoji: '⛄', sub: '❄️', color: '#74c0fc', theme: 'Đèo Tuyết Trắng', line: 'Hơi thở của ta đóng băng cả thời gian — trả lời nhanh lên kẻo lạnh cóng!', lv: 'N4', tier: 2, hpMul: 1.0, spdMul: 0.95 },
    { id: 'jorogumo', name: 'Jorōgumo Nhện Chúa', emoji: '🕷️', sub: '🕸️', color: '#9775fa', theme: 'Hang Tơ Nhện', line: 'Tơ của ta đã giăng khắp màn hình rồi, mắc bẫy là ta biết ngay!', lv: 'N3', tier: 3, hpMul: 1.1, spdMul: 1.0 },
    { id: 'nue', name: 'Nue Quái Chimera', emoji: '🐯', sub: '🐍', color: '#63e6be', theme: 'Thung Lũng Sấm', line: 'Đầu hổ, đuôi rắn, tiếng kêu như chim đêm — ta là tổ hợp khó đoán nhất đấy!', lv: 'N3', tier: 3, hpMul: 1.15, spdMul: 1.05 },
    { id: 'umibozu', name: 'Umibōzu Sư Biển', emoji: '🐙', sub: '🌊', color: '#3bc9db', theme: 'Biển Khơi Đen', line: 'Biển lặng là lúc ta nổi lên… thuyền kanji của ngươi có vững không?', lv: 'N3', tier: 3, hpMul: 1.2, spdMul: 0.9 },
    { id: 'kasha', name: 'Kasha Miêu Hỏa', emoji: '😼', sub: '🔥', color: '#ff6b6b', theme: 'Đường Lửa Địa Ngục', line: 'Xe lửa của ta chạy vèo vèo — chậm một nhịp là ta lướt qua luôn!', lv: 'N2', tier: 4, hpMul: 1.1, spdMul: 1.15 },
    { id: 'raijin', name: 'Raijin Thần Sấm', emoji: '🌩️', sub: '🥁', color: '#ffd43b', theme: 'Đỉnh Trống Sấm', line: 'Trống sấm của ta gõ nhịp rất gắt — bắt nhịp nhanh mới theo kịp ta!', lv: 'N2', tier: 4, hpMul: 1.15, spdMul: 1.25 },
    { id: 'fujin', name: 'Fūjin Thần Gió', emoji: '🌪️', sub: '🎐', color: '#66d9e8', theme: 'Đèo Gió Xoáy', line: 'Túi gió của ta thổi bay mọi đáp án chần chừ — quyết đoán lên nào!', lv: 'N2', tier: 4, hpMul: 0.95, spdMul: 1.25 },
    { id: 'shuten-doji', name: 'Shuten-dōji Vua Quỷ', emoji: '🧌', sub: '🍶', color: '#e599f7', theme: 'Núi Ōe Say', line: 'Ta là vua của bầy quỷ núi Ōe — uống cạn chén này rồi hẵng đấu kanji với ta!', lv: 'N1', tier: 5, hpMul: 1.3, spdMul: 1.05 },
    { id: 'gashadokuro', name: 'Gashadokuro Khổng Lồ', emoji: '💀', sub: '🦴', color: '#ced4da', theme: 'Bãi Tha Ma Đêm', line: 'Lạch cạch… lạch cạch… xương ta cao bằng tháp, kanji của ngươi cao bằng không?', lv: 'N1', tier: 5, hpMul: 1.35, spdMul: 0.95 },
    { id: 'orochi', name: 'Yamata-no-Orochi', emoji: '🐍', sub: '🐲', color: '#51cf66', theme: 'Đầm Tám Đầu', line: 'Tám cái đầu, tám hướng tấn công — hạ được ta phải nhanh cả tám phía!', lv: 'N1', tier: 5, hpMul: 1.4, spdMul: 0.9 }
  ];

  var byId = {};
  ALL.forEach(function (b) { byId[b.id] = b; });

  function get(id) { return byId[id] || null; }
  function byTier(t) { return ALL.filter(function (b) { return b.tier === +t; }); }
  function byLevel(lv) { return ALL.filter(function (b) { return b.lv === lv; }); }
  function baseHp(lv) { return BASE_HP[lv] || 100; }
  function effHp(boss) {
    if (!boss) return 100;
    return Math.round(baseHp(boss.lv) * (boss.hpMul || 1));
  }

  /* ---------- Túi xáo trộn (shuffle bag) ---------- */
  var BAG_KEY = 'hn_boss_bag_v1', LAST_KEY = 'hn_boss_last';
  var memBag = null; // fallback khi storage bị chặn

  function loadBag() {
    if (memBag) return memBag;
    try {
      var raw = sessionStorage.getItem(BAG_KEY);
      var arr = raw ? JSON.parse(raw) : null;
      if (Array.isArray(arr)) {
        // Chỉ giữ id hợp lệ, không trùng trong túi
        var seen = {}, out = [];
        arr.forEach(function (id) { if (byId[id] && !seen[id]) { seen[id] = 1; out.push(id); } });
        memBag = out; return memBag;
      }
    } catch (e) { /* storage chặn -> dùng bộ nhớ */ }
    memBag = []; return memBag;
  }
  function saveBag() {
    try { sessionStorage.setItem(BAG_KEY, JSON.stringify(memBag || [])); } catch (e) {}
  }
  function lastId() {
    try { return localStorage.getItem(LAST_KEY) || null; } catch (e) { return null; }
  }
  function saveLast(id) {
    try { localStorage.setItem(LAST_KEY, id); } catch (e) {}
  }
  function shuffleIds() {
    var a = ALL.map(function (b) { return b.id; });
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function refill() {
    var bag = shuffleIds();
    var last = lastId();
    // Vẫn tránh boss cuối của túi trước: nếu phần tử đầu trùng boss vừa
    // trả lần trước, hoán đổi với một vị trí khác (roster > 1).
    if (last && bag.length > 1 && bag[0] === last) {
      var k = 1 + Math.floor(Math.random() * (bag.length - 1));
      var t = bag[0]; bag[0] = bag[k]; bag[k] = t;
    }
    memBag = bag; saveBag();
    return memBag;
  }

  function next() {
    var bag = loadBag();
    if (!bag.length) bag = refill();
    var id = bag.shift();
    saveBag();
    // Phòng thủ: boss lấy ra không bao giờ bằng boss vừa trả lần trước.
    // (Trong 1 túi các id là duy nhất nên chỉ có thể xảy ra nếu túi bị
    // sửa từ bên ngoài — khi đó đổi với phần tử tiếp theo trong túi.)
    var last = lastId();
    if (last && id === last && ALL.length > 1) {
      if (!bag.length) bag = refill();
      if (bag.length && bag[0] !== id) {
        var t = bag[0]; bag[0] = id; id = t; saveBag();
      }
    }
    saveLast(id);
    return byId[id] || ALL[0];
  }

  /* Chọn tay: loại boss khỏi túi phiên hiện tại (contract). */
  function removeFromBag(id) {
    var bag = loadBag();
    var ix = bag.indexOf(id);
    if (ix >= 0) { bag.splice(ix, 1); saveBag(); }
    return ix >= 0;
  }

  /* ---------- Ánh xạ Chiến dịch (cố định) ----------
     Chặng (stage) 0..9 -> boss, tier tăng dần, 10 chặng = 10 boss khác nhau,
     chặng cuối (9) = 'shogun' (tier 5, mạnh nhất).
       0 tanuki(1) · 1 oni-do(1) · 2 kappa(2) · 3 yuki-onna(2) ·
       4 jorogumo(3) · 5 tengu(3) · 6 fujin(4) · 7 ryujin(4) ·
       8 shuten-doji(5) · 9 shogun(5)                                        */
  var CAMPAIGN = ['tanuki', 'oni-do', 'kappa', 'yuki-onna', 'jorogumo',
                  'tengu', 'fujin', 'ryujin', 'shuten-doji', 'shogun'];
  function campaign(stage) {
    var s = Math.max(0, Math.min(CAMPAIGN.length - 1, +stage || 0));
    return byId[CAMPAIGN[s]] || ALL[0];
  }

  window.GBOSS = {
    ALL: ALL,
    get: get,
    byTier: byTier,
    byLevel: byLevel,
    next: next,
    removeFromBag: removeFromBag,
    exclude: removeFromBag,
    baseHp: baseHp,
    effHp: effHp,
    campaign: campaign,
    CAMPAIGN: CAMPAIGN.slice()
  };
})();
