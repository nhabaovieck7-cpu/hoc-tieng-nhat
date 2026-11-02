// scenes-e.js — GỠ NGHẼN CHƯƠNG 1 (đợt thoại 31/10/2026): ba cảnh từng kẹt vì thiếu
// bản đồ/điểm kích hoạt, nay đã có chỗ đứng trên bản đồ:
//   1.4 'shop-exchange' (kaiwa) — có bản đồ shop quần áo 原宿洋品店 nối từ shotengai.
//   1.10 'room-desk' (branch) — điểm tương tác BÀN HỌC trong phòng trọ.
//   1.11 'gomi-apology' (kaiwa) — điểm kích hoạt riêng cạnh điểm tập kết rác: túi rác bị
//        dán giấy nhắc đỏ (tinh thần kaiwa-08: xin lỗi + học lại lịch đổ rác); mini-quiz
//        phân loại rác vẫn chạy qua flow.js ở điểm 'gomi' ngay bên cạnh.
// Thể ngữ §8: nhân viên bán hàng kính ngữ bán lẻ chuẩn; bà hàng xóm nói teineigo của
// người lớn tuổi, nghiêm mà thương; thầy giáo online nói tiếng Việt ấm, câu cửa miệng riêng.
window.DEMO_DATA = window.DEMO_DATA || {};
Object.assign(window.DEMO_DATA, {
  'shop-exchange': {
    scene: '👕 原宿洋品店 — đổi size áo',
    lines: [
      { sp: 'Nhân viên bán hàng', jp: 'いらっしゃいませ。{何|なに}かお{探|さが}しですか。', vi: 'Xin chào quý khách ạ. Quý khách đang tìm gì ạ?' },
      { sp: 'hero', jp: 'すみません、{昨日|きのう}{買|か}ったこのシャツを、{大|おお}きいサイズに{交換|こうかん}したいんですが…。', vi: 'Xin lỗi chị, chiếc áo sơ mi tôi mua hôm qua, tôi muốn đổi sang size lớn hơn ạ…' },
      { sp: 'Nhân viên bán hàng', jp: 'かしこまりました。レシートはお{持|も}ちですか。{今|いま}のサイズはおいくつですか。', vi: 'Vâng, tôi hiểu rồi ạ. Quý khách có mang theo hóa đơn không ạ? Size hiện tại là size mấy ạ?' },
      { sp: 'hero', jp: 'はい、レシートはこれです。Mサイズですが、{少|すこ}し{小|ちい}さいです。Lサイズはありますか。', vi: 'Vâng, hóa đơn đây ạ. Là size M nhưng hơi nhỏ ạ. Có size L không chị?' },
      { sp: 'Nhân viên bán hàng', jp: 'ございますよ。よろしければ、{試着室|しちゃくしつ}で{着|き}てみてください。{奥|おく}の{左側|ひだりがわ}です。', vi: 'Có đấy ạ. Nếu quý khách muốn, xin mời vào phòng thử đồ mặc thử ạ. Phòng ở phía trong, bên tay trái ạ.' },
      { sp: 'hero', jp: 'ありがとうございます。{試着|しちゃく}してもいいですか。', vi: 'Cảm ơn chị ạ. Tôi mặc thử có được không ạ?' },
      { sp: 'Nhân viên bán hàng', jp: 'もちろんです。いかがですか、お{体|からだ}に{合|あ}いますか。', vi: 'Tất nhiên rồi ạ. Thế nào ạ, có vừa với người quý khách không ạ?' },
      { sp: 'hero', jp: 'はい、{今度|こんど}はぴったりです。これに{交換|こうかん}をお{願|ねが}いします。', vi: 'Vâng, lần này vừa khít ạ. Cho tôi đổi sang chiếc này ạ.' },
      { sp: 'Nhân viên bán hàng', jp: 'かしこまりました。お{値段|ねだん}は{同|おな}じですので、{追加|ついか}のお{支払|しはら}いはございません。タグをお{取|と}りして、このままお{持|も}ち{帰|かえ}りいただけます。', vi: 'Vâng ạ. Giá tiền như nhau nên quý khách không cần trả thêm gì ạ. Tôi sẽ cắt thẻ, quý khách cứ mặc mang về luôn cũng được ạ.' },
      { sp: 'hero', jp: '{助|たす}かりました。ありがとうございました。', vi: 'Chị giúp tôi nhiều quá. Cảm ơn chị nhiều ạ.' },
      { sp: 'Nhân viên bán hàng', jp: 'ありがとうございました。またのお{越|こ}しをお{待|ま}ちしております。', vi: 'Cảm ơn quý khách ạ. Mong được đón tiếp quý khách lần sau ạ.' }
    ],
    wrong: {
      0: ['このシャツ、{大|おお}きくして。{早|はや}く{交換|こうかん}して。', 'シャツを{食|た}べたいんですが、サイズが{小|ちい}さいです。'],
      1: ['Mサイズは{私|わたし}を{着|き}ています。Lサイズを{住|す}んでいますか。', 'レシートは{昨日|きのう}{食|た}べました。サイズはMを{思|おも}います。'],
      2: ['{試着室|しちゃくしつ}に{住|す}んでもいいですか。', '{私|わたし}の{体|からだ}を{着|き}てもいいですか。'],
      3: ['これを{交換|こうかん}して。タグは{食|た}べて。', 'ぴったりを{買|か}いました。お{願|ねが}いをします。'],
      4: ['{助|たす}けてをありがとう。{私|わたし}はうれしいをします。', 'ありがとう。{私|わたし}はもう{行|い}く。タグを{食|た}べて。']
    },
    outro: '{name} bước ra khỏi 原宿洋品店 với chiếc áo vừa khít trên người, trong đầu thuộc thêm ba từ sống còn của đời sống Nhật: 交換 (đổi hàng), 試着 (mặc thử), ぴったり (vừa khít). Ở Nhật, đổi hàng không phải chuyện gây khó dễ — mang hóa đơn, nói một câu lịch sự, nhân viên còn cảm ơn mình đã quay lại. {name} nhìn chiếc áo mới, tự nhủ: mai mặc đi làm thủ tục, trông cũng ra dáng người sống ở đây rồi đấy chứ.'
  },
  'gomi-apology': {
    scene: '📄 Túi rác bị dán giấy nhắc đỏ — xin lỗi bà Suzuki hàng xóm',
    lines: [
      { sp: 'Bà Suzuki hàng xóm', jp: 'あら、あなたのお{部屋|へや}の{方|かた}？そのゴミ{袋|ふくろ}、{赤|あか}いシールが{貼|は}ってありますよ。', vi: 'Ô, cháu là người ở phòng bên đó phải không? Túi rác kia bị dán giấy nhắc đỏ rồi đấy cháu.' },
      { sp: 'hero', jp: 'すみません、{私|わたし}のゴミです。ご{迷惑|めいわく}をおかけして、{申|もう}し{訳|わけ}ありませんでした。', vi: 'Cháu xin lỗi ạ, đó là rác của cháu. Đã làm phiền mọi người, cháu thật sự xin lỗi ạ.' },
      { sp: 'Bà Suzuki hàng xóm', jp: '{謝|あやま}ってくれて、ありがとう。ここは{燃|も}えるゴミが{月曜|げつよう}と{木曜|もくよう}、ペットボトルは{金曜|きんよう}だけなの。{日|ひ}を{間違|まちが}えると、{置|お}きっぱなしになってしまうのよ。', vi: 'Cháu biết xin lỗi thế là bà cảm ơn rồi. Ở đây rác đốt được là thứ Hai và thứ Năm, chai nhựa PET chỉ thứ Sáu thôi. Nhầm ngày là rác cứ nằm ì ở đó đấy.' },
      { sp: 'hero', jp: '{教|おし}えてくださって、ありがとうございます。{燃|も}えるゴミは{月曜|げつよう}と{木曜|もくよう}、ペットボトルは{金曜|きんよう}ですね。', vi: 'Cảm ơn bà đã chỉ cho cháu ạ. Rác đốt được là thứ Hai và thứ Năm, chai PET là thứ Sáu, đúng không ạ?' },
      { sp: 'Bà Suzuki hàng xóm', jp: 'そうそう。あと、{袋|ふくろ}は{朝|あさ}の8{時|じ}までに{出|だ}してね。{夜|よる}に{出|だ}すと、カラスがつついて{大変|たいへん}なことになるから。', vi: 'Đúng rồi đấy. À, túi rác phải mang ra trước 8 giờ sáng nhé. Mang ra buổi tối là quạ nó mổ tung, khổ lắm.' },
      { sp: 'hero', jp: 'はい、わかりました。これからは{気|き}をつけます。', vi: 'Vâng, cháu hiểu rồi ạ. Từ nay cháu sẽ chú ý ạ.' },
      { sp: 'Bà Suzuki hàng xóm', jp: 'いいのよ、{初|はじ}めは{誰|だれ}でも{間違|まちが}えるんだから。{分|わ}からないことがあったら、{隣|となり}の{私|わたし}に{聞|き}いてちょうだいね。', vi: 'Không sao đâu cháu, ban đầu ai mà chẳng nhầm. Có gì không hiểu thì cứ hỏi bà hàng xóm này nhé.' }
    ],
    wrong: {
      0: ['ゴミは{私|わたし}じゃない。シールは{赤|あか}くない。', 'ご{迷惑|めいわく}を{食|た}べました。{申|もう}し{訳|わけ}を{買|か}います。'],
      1: ['{燃|も}えるゴミは{金曜|きんよう}に{住|す}んでいます。ペットボトルは{月曜|げつよう}を{着|き}ます。', '{日|ひ}をありがとうございます。ゴミは{朝|あさ}に{寝|ね}ます。'],
      2: ['{気|き}を{食|た}べます。これからはゴミに{住|す}みます。', 'わかりました。カラスと{一緒|いっしょ}に{出|だ}します。']
    },
    outro: '{name} xách túi rác về phòng, dán vội một tờ giấy nhớ lên tủ lạnh: 「燃えるゴミ：月・木／ペットボトル：金／朝8時まで」. Tờ giấy đỏ ban nãy làm {name} đỏ mặt thật — nhưng nhờ nó mà quen được bà Suzuki, người hàng xóm nghiêm nhất khu và cũng là người sẵn lòng chỉ bảo nhất. Ở Nhật, một lời xin lỗi nói cho đúng câu, đúng lúc, có khi mở được nhiều cánh cửa hơn cả một tấm bằng.'
  },
  'room-desk': {
    scene: '💻 Bàn học — học online buổi tối với thầy Khánh',
    branch: [
      { sp: 'narr', text: 'Tám giờ tối. {name} tắm rửa, ăn vội hộp cơm, rồi ngồi vào chiếc bàn học kê sát cửa sổ phòng trọ. Laptop mở ra, màn hình sáng lên khuôn mặt quen thuộc của thầy Khánh — người thầy dạy tiếng Nhật online từ hồi {name} còn ở Việt Nam, và cũng là người đầu tiên nói câu: "Sang đó rồi, học mới thật sự bắt đầu." Bên cạnh laptop là cuốn sổ ghi chằng chịt những câu hôm nay nói sai ở combini.' },
      { sp: 'Thầy Khánh (qua màn hình)', text: '"Chào {call}. Ngày đầu ở Nhật thế nào, kể thầy nghe một câu bằng tiếng Nhật trước đã. Đừng sợ nói sai — buổi học của thầy chỉ có một luật: sai thì sửa, sợ gì. Nào, hôm nay {call} đã nói được câu gì rồi?"' },
      { sp: 'narr', text: '{name} kể lại chuyện ở combini: câu thì nói ngược trợ từ, câu thì quên mất kính ngữ, được Yui cười xòa chỉ lại. Thầy Khánh vừa nghe vừa gật gù gõ gì đó, rồi chia sẻ màn hình: hiện lên đúng ba câu {name} nói sai hôm nay, xếp ngay ngắn thành bài ôn.' },
      { sp: 'Thầy Khánh (qua màn hình)', jp: '「{袋|ふくろ}はいりますか」と「いりません」の{違|ちが}い、もう{一度|いちど}やってみよう。', text: '"Mình ôn lại chỗ này trước: 「袋はいりますか」 với 「いりません」 khác nhau thế nào — làm lại một lần nữa nào. Học tiếng Nhật là thế đấy {call}: mỗi ngày nhặt một ít ở ngoài đời, tối về sắp xếp lại cho ngay ngắn, là nó thành của mình."' },
      {
        prompt: 'Buổi học tối nay, {name} học thế nào?',
        choice: [
          {
            label: 'Học chăm chỉ đến cuối buổi, ôn lại hết ba câu sai hôm nay',
            fx: { jp: 4 }, note: 'Học online buổi tối — ôn trọn ba câu sai, thầy Khánh khen nếp học này',
            say: [
              { sp: 'Thầy Khánh (qua màn hình)', text: '"Tốt. Ba câu hôm nay sai, giờ nói lại đều đúng cả ba. Nhớ cảm giác này nhé {call}: tiếng Nhật không vào đầu bằng cuốn sách dày, nó vào bằng đúng những lần mình đỏ mặt ngoài combini như hôm nay đấy."' },
              { sp: 'narr', text: 'Trước khi tắt máy, thầy gửi sang một bộ thẻ ghi nhớ nhỏ: toàn là câu của ngày hôm nay — câu ở ga, câu ở combini, câu chào ở ủy ban. {name} lưu lại, lòng nhẹ hẳn: ở đất khách, có một người thầy vẫn đợi mình mỗi tối thế này, đường học bỗng ngắn lại.' }
            ]
          },
          {
            label: 'Học qua loa, mắt cứ liếc điện thoại chờ tin nhắn của Linh',
            fx: { jp: 1 }, note: 'Học qua loa buổi tối — thầy Khánh nhìn ra ngay',
            say: [
              { sp: 'Thầy Khánh (qua màn hình)', text: '"{call} ơi, mắt {call} nãy giờ ở cái điện thoại nhiều hơn ở bài đấy." — Thầy cười, không mắng: "Nhớ nhà, nhớ người thương thì ai cũng thế, thầy hiểu. Nhưng hẹn hò với tiếng Nhật thì cũng phải cho nó một giờ tử tế mỗi ngày. Mai mình học sớm hơn một chút, nhé?"' },
              { sp: 'narr', text: '{name} cười trừ, đặt điện thoại úp xuống bàn. Bài học vẫn trôi qua, chỉ là đọng lại ít hơn mọi ngày — như ly nước rót vội, uống xong mà chẳng nhớ vị.' }
            ]
          },
          {
            label: 'Xin nghỉ sớm: cả ngày đi lại mệt quá, mai học bù',
            fx: { hp: 3 }, note: 'Nghỉ sớm một buổi — ngủ đủ cũng là giữ sức đường dài',
            say: [
              { sp: 'Thầy Khánh (qua màn hình)', text: '"Được, hôm nay {call} đi bộ cả ngày rồi, nghỉ là đúng. Ngủ sớm cũng là một cách học — đầu mệt thì chữ không vào đâu." — Thầy nói rồi chốt một câu như đóng dấu: "Nhưng nhớ: mai học bù gấp đôi. Hứa với thầy là phải giữ, người ta hơn nhau ở chữ hứa với chính mình thôi."' },
              { sp: 'narr', text: '{name} gấp laptop, ngả lưng xuống futon. Ngoài cửa sổ, khu phố Shinjuku đã lên đèn. Ngày đầu tiên ở Nhật khép lại — mệt rã rời, mà trong lòng có một thứ gì đó vừa nhú lên như mầm cây: ngày mai, mình sẽ làm tốt hơn hôm nay một chút.' }
            ]
          }
        ]
      }
    ]
  }
});
