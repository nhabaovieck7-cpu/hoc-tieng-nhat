// scenes-h.js — KAIWA MUA SẮM ở TRUNG TÂM THƯƠNG MẠI (đợt ngoại hình + mall 31/10/2026).
// Hai cảnh chào hỏi ĐẦU TIÊN ở hai quầy có kaiwa đầy đủ (thời trang + mỹ phẩm); diễn xong
// máy truyện tự mở quầy mua sắm của quầy đó (story.js onSceneEnd → STYLE.openShop).
// Hai quầy trang sức + nước hoa mở thẳng quầy mua sắm, lời chào kính ngữ nằm ở đầu quầy.
// Thể ngữ §8: nhân viên trung tâm thương mại nói KÍNH NGỮ bán lẻ chuẩn; người chơi đáp
// teineigo lịch sự — đúng cặp câu sống còn khi mua sắm ở Nhật: 試着 (mặc thử),
// サイズ (size), カードで払えますか (trả bằng thẻ được không).
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  'mall-fashion': {
    scene: '👕 銀座モール — quầy thời trang — chào hỏi và mặc thử',
    lines: [
      { sp: 'Nhân viên quầy thời trang', jp: 'いらっしゃいませ。{何|なに}かお{探|さが}しですか。', vi: 'Chào mừng quý khách ạ. Quý khách đang tìm gì ạ?' },
      { sp: 'hero', jp: 'このジャケットを{試着|しちゃく}してもいいですか。', vi: 'Tôi mặc thử chiếc áo khoác này có được không ạ?' },
      { sp: 'Nhân viên quầy thời trang', jp: 'もちろんでございます。サイズはおいくつですか。', vi: 'Tất nhiên rồi ạ. Quý khách mặc size mấy ạ?' },
      { sp: 'hero', jp: 'Mサイズをお{願|ねが}いします。', vi: 'Cho tôi size M ạ.' },
      { sp: 'Nhân viên quầy thời trang', jp: 'かしこまりました。{試着室|しちゃくしつ}はあちらでございます。…いかがですか、お{似合|にあ}いですか。', vi: 'Vâng, tôi hiểu rồi ạ. Phòng thử đồ ở phía đằng kia ạ. …Thế nào ạ, có hợp với quý khách không ạ?' },
      { sp: 'hero', jp: 'ぴったりです。これをください。カードで{払|はら}えますか。', vi: 'Vừa khít ạ. Cho tôi lấy chiếc này. Tôi trả bằng thẻ có được không ạ?' },
      { sp: 'Nhân viên quầy thời trang', jp: 'はい、カードもご{利用|りよう}いただけます。ありがとうございます。', vi: 'Vâng, thẻ cũng dùng được ạ. Cảm ơn quý khách ạ.' }
    ],
    wrong: {
      0: ['このジャケットを{食|た}べてもいいですか。', 'ジャケットに{住|す}んでもいいですか。'],
      1: ['Mサイズを{飲|の}みたいです。', 'サイズは{昨日|きのう}です。お{願|ねが}いします。'],
      2: ['ぴったりじゃない。これを{寝|ね}ます。', 'これをください。カードで{泳|およ}げますか。']
    },
    outro: '{name} bước ra khỏi phòng thử đồ, ngắm mình trong gương: ở Nhật, vào cửa hàng cứ nói một câu 「試着してもいいですか」 là nhân viên niềm nở ngay. Quầy thời trang hiện ra trước mặt — sắm gì thì ngắm tiếp ở quầy nhé.'
  },
  'mall-cosmetics': {
    scene: '💄 銀座モール — quầy mỹ phẩm — tìm son hợp tông da',
    lines: [
      { sp: 'Nhân viên quầy mỹ phẩm', jp: 'いらっしゃいませ。コスメをお{探|さが}しですか。', vi: 'Chào mừng quý khách ạ. Quý khách đang tìm mỹ phẩm ạ?' },
      { sp: 'hero', jp: '{口紅|くちべに}を{探|さが}しています。おすすめはありますか。', vi: 'Tôi đang tìm son môi ạ. Có loại nào chị gợi ý không ạ?' },
      { sp: 'Nhân viên quầy mỹ phẩm', jp: 'こちらが{一番|いちばん}{人気|にんき}の{色|いろ}でございます。テスターもございますよ。', vi: 'Đây là màu bán chạy nhất của quầy ạ. Cũng có đồ dùng thử đấy ạ.' },
      { sp: 'hero', jp: 'この{色|いろ}は{私|わたし}の{肌|はだ}に{合|あ}いますか。', vi: 'Màu này có hợp với da của tôi không ạ?' },
      { sp: 'Nhân viên quầy mỹ phẩm', jp: 'はい、とてもお{似合|にあ}いですよ。{自然|しぜん}な{感|かん}じに{見|み}えます。', vi: 'Vâng, rất hợp với quý khách đấy ạ. Trông tự nhiên lắm ạ.' },
      { sp: 'hero', jp: 'じゃあ、これをください。カードで{払|はら}えますか。', vi: 'Vậy cho tôi lấy cái này ạ. Tôi trả bằng thẻ có được không ạ?' },
      { sp: 'Nhân viên quầy mỹ phẩm', jp: 'もちろんでございます。ありがとうございます。またのお{越|こ}しをお{待|ま}ちしております。', vi: 'Tất nhiên rồi ạ. Cảm ơn quý khách ạ. Mong được đón tiếp quý khách lần sau ạ.' }
    ],
    wrong: {
      0: ['{口紅|くちべに}を{食|た}べています。おすすめは{寝|ね}ていますか。', '{口紅|くちべに}に{住|す}んでいます。'],
      1: ['この{色|いろ}は{私|わたし}の{肌|はだ}を{食|た}べますか。', '{色|いろ}は{肌|はだ}に{泳|およ}ぎますか。'],
      2: ['じゃあ、これを{寝|ね}ます。カードで{走|はし}れますか。', 'これをください。カードは{飲|の}めますか。']
    },
    outro: '{name} cầm thỏi son mới, nhớ thêm được hai mẫu câu vàng khi mua mỹ phẩm ở Nhật: 「おすすめはありますか」 (có gợi ý gì không) và 「肌に合いますか」 (có hợp da không). Quầy mỹ phẩm hiện ra — ngắm hàng tiếp ở quầy nhé.'
  }
});
