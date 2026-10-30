// =====================================================================
// village-catalog.js — Danh mục công trình Làng Edo (dữ liệu thuần)
// cost[i] = chi phí để LÊN cấp i+1 (tối đa 3 cấp). names[i] = tên cấp.
// Cân bằng theo nhịp kiếm (lượt ~500 điểm ≈ 10 gỗ / 5 đá / 3 xu):
// cấp 1 mỗi công trình = vài lượt chơi; trọn làng cấp 3 = mục tiêu
// nhiều tuần — đúng chất "lớp mục tiêu dài hạn".
// =====================================================================
window.GVILLAGE = {
  order: ['nha', 'torii', 'quan-tra', 'vuon', 'thap-canh', 'den', 'cau', 'cho'],
  items: {
    'nha': {
      icon: '🏠', name: 'Nhà ở',
      names: ['Nhà tranh', 'Nhà gỗ', 'Nhà ngói'],
      descs: ['Mái tranh đơn sơ, đủ che mưa nắng.', 'Tường gỗ chắc chắn, bếp lửa ấm.', 'Mái ngói khang trang — nhà nhất nhì làng.'],
      cost: [{ go: 20, da: 0, xu: 0 }, { go: 45, da: 10, xu: 5 }, { go: 90, da: 30, xu: 15 }]
    },
    'torii': {
      icon: '⛩️', name: 'Cổng torii',
      names: ['Cổng gỗ nhỏ', 'Cổng sơn son', 'Đại torii'],
      descs: ['Cổng làng bằng gỗ thô.', 'Sơn son đỏ rực, ai qua cũng ngước nhìn.', 'Cổng lớn trang nghiêm ở lối vào làng.'],
      cost: [{ go: 30, da: 15, xu: 5 }, { go: 60, da: 35, xu: 12 }, { go: 110, da: 70, xu: 25 }]
    },
    'quan-tra': {
      icon: '🍵', name: 'Quán trà',
      names: ['Quán trà nhỏ', 'Trà quán đông khách', 'Trà lâu O-Hana'],
      descs: ['Vài bộ bàn ghế tre.', 'Khách ra vào tấp nập cả ngày.', 'Trà lâu hai tầng — niềm tự hào của làng.'],
      cost: [{ go: 35, da: 5, xu: 10 }, { go: 70, da: 20, xu: 22 }, { go: 130, da: 45, xu: 40 }]
    },
    'vuon': {
      icon: '🪨', name: 'Vườn đá',
      names: ['Góc vườn đá', 'Vườn thiền', 'Vườn đá danh tiếng'],
      descs: ['Mấy hòn đá xếp quanh gốc tùng.', 'Cát cào sóng, đá dựng thế — ngồi là tĩnh tâm.', 'Người làng bên cũng sang ngắm vườn.'],
      cost: [{ go: 10, da: 25, xu: 5 }, { go: 25, da: 55, xu: 12 }, { go: 50, da: 110, xu: 25 }]
    },
    'thap-canh': {
      icon: '🗼', name: 'Tháp canh',
      names: ['Chòi canh', 'Tháp canh gỗ', 'Tháp canh cao'],
      descs: ['Chòi thấp ngó quanh làng.', 'Tháp gỗ nhìn xa tới bìa rừng.', 'Đứng trên tháp thấy cả núi Tengu.'],
      cost: [{ go: 50, da: 40, xu: 10 }, { go: 100, da: 85, xu: 20 }, { go: 180, da: 160, xu: 40 }]
    },
    'den': {
      icon: '🏮', name: 'Đền nhỏ',
      names: ['Miếu nhỏ', 'Đền làng', 'Đền Ngọc Chữ'],
      descs: ['Miếu đá thờ thần làng.', 'Đền nhỏ khói hương quanh năm.', 'Đền thờ Ngọc Chữ — linh thiêng nhất vùng.'],
      cost: [{ go: 40, da: 30, xu: 20 }, { go: 80, da: 65, xu: 45 }, { go: 150, da: 120, xu: 90 }]
    },
    'cau': {
      icon: '🌉', name: 'Cầu gỗ',
      names: ['Cầu khỉ', 'Cầu gỗ vững', 'Cầu vòm sơn đỏ'],
      descs: ['Vài tấm ván bắc qua suối.', 'Cầu gỗ chắc, xe bò qua được.', 'Cầu vòm đỏ cong cong in bóng xuống nước.'],
      cost: [{ go: 45, da: 20, xu: 8 }, { go: 90, da: 45, xu: 18 }, { go: 160, da: 90, xu: 35 }]
    },
    'cho': {
      icon: '🎪', name: 'Chợ làng',
      names: ['Sạp chợ', 'Chợ phiên', 'Chợ lớn Edo'],
      descs: ['Một sạp bán rau củ.', 'Chợ phiên cuối tuần đông vui.', 'Chợ lớn đủ mặt hàng — làng giàu lên trông thấy.'],
      cost: [{ go: 55, da: 25, xu: 25 }, { go: 110, da: 55, xu: 55 }, { go: 200, da: 110, xu: 110 }]
    }
  }
};
