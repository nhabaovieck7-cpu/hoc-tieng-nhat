/* Phiếu đáp án + nhúng YouTube (click-to-load) dưới mỗi đề 聴解. */
(function(){
const LS_PREFIX='hn_choukai_';
const KEYS={"F6ELghsFVK8":{"level":"N1","session":"2019/12","source":"Công bố đáp án 聴解 N1 12/2019 (aixinjp · 正解 + 選択肢 trong bản script)","mondai":[{"name":"問題1","choices":4,"c":[3,1,2,4,3,4],"o":[["ちぎれた部分を探す","本を修理する","同じ本を買って持ってくる","図書館に本の代金を払う"],["デザイン変更の相談を業者とする","業者に納期の変更を依頼する","記念品の予算を再検討する","記念品を別の業者に注文する"],["専門家と打ち合わせをする","ツアーで登るの候補を絞る","他社の類似ツアーに参加する","山周辺の観光スポットを探す"],["駐車場までの地図を作る","店の隣に駐車場を作る","店の前に看板を立てる","店先に植物を置く"],["自習用教材の作成","受講生へのアンケートの実施","新しい教材の内容の確認","パソコンの設定変更"],["オンラインの共有フォルダーに保存する","印刷して、出席者に回覧する","印刷して、部長に提出する","発言者にメールで送付する"]]},{"name":"問題2","choices":4,"c":[4,1,2,2,1,2],"o":[["歌舞伎の知識を得ること","着物を着て出かけること","好きな役者をじかに見ること","劇の時代の雰囲気を味わうこと"],["部屋に本をしまうスペースがないから","言葉の意味がすぐに調べられるから","欲しい本がすぐに手に入るから","同時に何冊も楽にも持ち歩けるから"],["市内の図書館の数を増やす","市内全ての図書館の利用時間を延ばす","大きな図書館にパソコンルームを作る","中央図書館にカフェスペースを設置する"],["効率的に事務をこなせる人","自分で課題を発見できる人","建設業務の経験が豊かな人","明確なビジョンを持っている人"],["周囲に同化して、敵をだます方法","毒の針で、敵を刺す方法","においで、敵を攻撃する方法","からに閉じこもり、敵をかわす方法"],["不測の事態に営業部が臨機応変に対処すること","トラブル時の部署間れんけいの指針を作ること","全ての部署が団結して目標に立ち向かうこと","各部署が対処可能な業務範囲を広げること"]]},{"name":"問題3","choices":4,"c":[4,1,1,1,3,4],"o":[["将来に備えて貯蓄するべきだ","確実な投資の方法を学ぶべきだ","若い時の外国語学習は大切だ","若い時の異文化体験は大切だ"],["改めて新聞を読むことにしたわけ","インターネットニュースの便利さ","毎日 新聞を読むことの大切さ","おすすめのニュースサイト"],["作詞家が亡くなったこと","作詞家の一生","流行歌の歌詞","流行歌の特徴"],["人口知能はどのように活用されているのか","人工知能はどうして必要なのか","人工知能は今後どうなっていくのか","人工知能はどんな問題を抱えているのか"],["歴史が趣味だという女性が増えていること","男性より、女性のほうが趣味が多いこと","趣味に男女差がなくなってきていること","趣味を持つ男性が少なくなったこと"],["雪が積もった山の美しさ","天候と作物のできの関係","雪が花の開花に及ぼす影響","農作業の時期を見極める知恵"]]},{"name":"問題4","choices":3,"c":[2,3,1,2,1,2,2,2,1,3,1,3,2],"o":[["じゃ、やむまでやりましょう","これじゃ、無理ですね","ああ、雨、やみそうですか"],["すみません、計算が間違ってましたか","すみません、合計書がないほうがよかったんですね","すみません、書き入れて出し直します"],["期待を裏切らないね","材料にこだわってるのにね","いいのは値段だけってことだね"],["あ、待っててくださったんですか","本当、思いもしませんでした","先もここでお会いしましたっけ"],["そんなことないです。緊張しちゃって","毎回ひやひやさせてすみません","危なかったですか。気がつきませんでした"],["じゃ、出張から戻ったら教えて","トラブルがあって、その対応みたい","え、これからまた海外に行くの"],["本当、まるで子供が描いたみたいですね","子どもの発想って本当に素晴らしいですね","確かに子供ならもっと自由に描くでしょうね"],["それが結局かえなかったんで","ぜひやってみたいと思いまして","え、今度そんな企画が出たんですか"],["何かもめたのかな","えっ、二人で一緒に？","確かに忙しそうにしているね"],["あの、よかったの。商品名だけでしょうか","いいえ、似たような商品名をたくさんあるはずです","商品名もう一度考え直します"],["いったい何考えてるんだろうね","そんなむちゃなこと言わないでよ","関心するほどのことじゃないよ"],["少しは人気が出てもいいのになあ","いや、問い合わせはゼロやないよ","なんだかものすごい反響なんだよ"],["まだ何も考えてません","特にないですが、何でしょうか","今日は荷物は持ってきてないです"]]},{"name":"問題5","choices":4,"c":[3,3,4,2],"o":[["日本の漁業","北海道の漁業","漁業の未来","新しい漁業"],["おしゃれなカメラケースをプレゼントする","ただで講座が受けられる特典をつける","カメラの一日貸出サービスを始める","写真の展示会を開いて宣伝する"],["赤","青","緑","黄"],["赤","青","緑","黄"]]}]},"5b995VcJuV4":{"level":"N1","session":"2018/07","source":"Script + đáp án N1 07/2018 (Saromalang · 正解 + 選択肢)","mondai":[{"name":"問題1","choices":4,"c":[2,4,3,3,2,4],"o":[["講演会の中止を参加者に伝える","講演者に時間の延長を頼む","代わりの講演者を探す","空いた時間にすることを決める"],["走る姿勢を変える","走る回数を増やす","スポーツジムに通う","自転車で通学する"],["書類のしめきりの日を机に張る","一日の仕事の順序を決める","仕事にかかった時間を記録する","上司からのアドバイスをメモする"],["落書きを消す","ごみを拾う","落ち葉を集める","かだんの草を抜く"],["タイトルの書体を変更する","背景の色を修正する","作品のあらすじを削除する","出演者の名前を書き入れる"],["売れ行きが悪い作品","人気がある作家の作品","今の季節がテーマの作品","今と異なる季節がテーマの作品"]]},{"name":"問題2","choices":4,"c":[2,3,1,2,2,1],"o":[["通勤に使っていた時間が有効に使える","自分のペースで仕事ができる","住みたい場所に引っ越せる","服装に気をつかわなくていい"],["発明の賞を取りたかったから","独立して新しい会社を作りたかったから","ゲーム感覚で発電できるものを作りたかったから","代替エネルギーとしてていあんしたかったから"],["都会を離れてのびのび過ごしてほしいから","自立心を養ってほしいから","勉強に集中しやすい環境だから","将来家族でいなかに住む予定だから"],["発見されたときの状態がよいこと","画家本人が少年時代にかいたものであること","画家が最後にかいた作品であること","画家が妻と共同で制作した作品であること"],["漁業や農業の技術を身につけること","体験を通して人と食との関係を理解すること","島の人の毎日の食事を調査すること","島で売れる新商品を開発すること"],["新商品が発売されるから","売り上げが好調だから","社長が交代したから","新しい工場ができたから"]]},{"name":"問題3","choices":4,"c":[3,3,2,1,4,2],"o":[["必要がないものを買うと後悔する","急いで買うと失敗する","迷わずに買ったものは飽きない","よく考えて買ったものは長く使える"],["いろいろな移動式サービスの種類","災害に備えた地域の取り組み","銀行が移動式サービスを始めたこと","銀行同士の競争が激しくなっていること"],["桜祭りに来る客を増やすための対策","桜の木の病気に対する対応","桜の木を切ることに反対する運動","桜の木を新たに植える取り組み"],["現在栽培されている麦の始まり","麦に関する研究の展望","麦を分類する方法","麦の突然変異の仕組み"],["ウェブを中心に行うべきだ","ウェブとテレビで行うべきだ","新聞とウェブとテレビで行うべきだ","新聞に絞って行うべきだ"],["無責任に犬を捨ててはいけない","高齢者に合った動物保護の仕方がある","子犬も高齢の犬も同様に保護すべきだ","犬は高齢者に癒しを与えてくれる"]]},{"name":"問題4","choices":3,"c":[3,2,3,1,2,3,2,1,3,1,3,2,1],"o":[["バイトの予定早く決まればいいね。","バイト入ってなかったんだ。じゃ、いけるね。","いっしょに行くのを楽しみにしてたのに。"],["うん、そこの棚にもないでしょう。","えっ？本当？あった？","早く見つかるといいんだけど。"],["ご期待にそえなくて、すみません。","はあ、一言足りませんでしたか。","いやあ、今日はたまたまです。"],["もう映画に出ないの？結構好きだったんだけど。","最後はどんな映画に出るんだろうね。","あの映画で引退を思いとどまったんだね。"],["じゃあ、予定どおりですね。","遅れるのは困りますね。","えっ、早まるんですか。"],["でも、うっかり言わなくてよかったじゃないの？","そんなに君ばかり話してたんだ。","そう。何言ったの？"],["優勝して目標を失ったんだね。","そっか。残念だったろうね。","だから、機嫌がいいんだね。"],["何とか片付きました。","えっ、もう終わりましたけど。","どなたが手伝ってくださったんですか。"],["ありがとうございます。恐れ入ります。","よくあることなんですね。ほっとしました。","申し訳ありません。今後気をつけます。"],["レシートを渡せばいいんですね。","レシートは出口でもらえるんですね。","レシートは見せなくていいんですね。"],["将来性があるってこと？","新人なのに、頼もしいね。","まだ入ったばっかりだから。"],["ああ、予約しとかなくてもいいんだ。","えっ、予約しとけばよかったね。","せっかく予約しといたのにね。"],["ご無理をお願いして申し訳ありません。","やはりだめでしたか。","私はお受けしにくいですが。"]]},{"name":"問題5","choices":4,"c":[2,3,3,4],"o":[["木村会館","山田ホテル","井上セミナーハウス","高山ホール"],["子供向けのパンフレットを配る","画用紙と色鉛筆を貸し出す","絵に関するクイズを用意する","絵の一部から作品を探すゲームを用意する"],["赤山","青山","緑山","白山"],["赤山","青山","緑山","白山"]]}]},"ni_PF_GGJeQ":{"level":"N2","session":"2019/07","source":"Công bố đáp án 聴解 N2 07/2019 (aixinjp · 正解; 選択肢 khi có trong script)","mondai":[{"name":"問題1","choices":4,"c":[4,3,4,1,3],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[4,3,3,2,2],"o":[null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,2,4,1,3],"o":[["この仕事の魅力","この仕事の大変さ","この仕事に就いた理由","この仕事に必要な体力"],["値段も安かったし、良い車で満足だ","値段は高かったが、良い車で満足だ","安い車なので、性能に不満がある","高級な車だが、性能に不満がある"],["おいしい料理を作る工夫","子供時代の食事の思い出","家庭料理の味の特徴","味の好みを決める要素"],["好きな本を繰り返し読んでほしい","なるべく多くの本を読んでほしい","すぐに役に立つ本を読んでほしい","宣伝を参考にして本を読んでほしい"],["目標は自分たちに合ったものがよい","目標を持ち続けることが必要だ","目標に向かうプロセスにも意味がある","時々目標を見直すことが大事だ"]]},{"name":"問題4","choices":3,"c":[1,2,2,3,3,1,1,3,3,2,1],"o":[["え？ないんですか","助かります。ありがとうございます","あ、机の上に置いてはいけなかったんですね"],["もっと小さいのがよかったんですね","小さいのにすごいけでしょう","小さい方が性能がいいんですか"],["明日までじゃなくてよかったね","本当、もっと時間ほしいよね","え？レポート出さなくてもよくなったの？"],["運んでいただけるんですか","え？私、運んでませんよ","あ、はい。どこへ運びましょうか"],["では、さっそく準備を始めます","中止になるなんて残念です","今のところうまくいってます"],["あぁ、わかった。忘れるよ","え？ちゃんと聞いてたよ","もちろん、いつでも聞くよ"],["そうか。でも間に合ったならよかったね","あー、いつものに乗れなかったんだ","え？電車が遅れたんだ"],["それなら一緒にやろうか","え？１人でやったの？","じゃ、お願いしてもいい？"],["うまくいったんだ。頑張った甲斐があったね","仕方ないよ。そんなにがっかりしないで","きっと練習の成果を出せると思うよ"],["予約は必要ないんですね","先週、予約しました","せっかく予約したのに使えないんですか"],["すみません。すぐ用意します","あ、検討していただけるんですね","えぇ、ご理解ありがとうございます"]]},{"name":"問題5","choices":4,"c":[2,4,2,1],"o":[["ボール体操","柔軟体操","リズム運動","筋肉トレーニング"],["チラシの文字を大きくする","配るチラシの数を増やす","看板の文字を大きくする","看板の高さを高くする"],["東小学校","西中学校","南小学校","北中学校"],["東小学校","西中学校","南小学校","北中学校"]]}]},"79IGiPodBB0":{"level":"N1","session":"2024/07","source":"Công bố đáp án 聴解 N1 07/2024 (UnoJapano + luyenthitiengnhat.edu.vn khớp nhau 30/30)","mondai":[{"name":"問題1","choices":4,"c":[3,2,1,2,3],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[4,3,1,2,1,2],"o":[null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,1,4,1,4],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[1,3,3,3,3,2,1,1,2,1,2],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[3,4,3],"o":[null,null,null]}]},"GSOBD5vl8jQ":{"level":"N1","session":"2022/07","source":"Công bố đáp án 聴解 N1 07/2022 (Shizen + UnoJapano khớp nhau 35/35)","mondai":[{"name":"問題1","choices":4,"c":[3,2,1,2,3,2],"o":[null,null,null,null,null,null]},{"name":"問題2","choices":4,"c":[2,3,2,2,3,1,3],"o":[null,null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[4,4,1,4,1,3],"o":[null,null,null,null,null,null]},{"name":"問題4","choices":3,"c":[3,3,1,2,2,3,3,1,1,1,3,1,2],"o":[null,null,null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[4,2,1],"o":[null,null,null]}]},"E7sa6Wilrfs":{"level":"N1","session":"2022/12","source":"Công bố đáp án 聴解 N1 12/2022 (UnoJapano bản đã đính chính + chuyenngoaingu khớp nhau 30/30)","mondai":[{"name":"問題1","choices":4,"c":[2,4,3,2,1],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[2,2,3,3,2,1],"o":[null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[3,2,4,3,2],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[3,1,1,3,2,1,3,3,2,2,1],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[4,3,1],"o":[null,null,null]}]},"OeTlXJ0W5w4":{"level":"N1","session":"2016/12","source":"Đáp án cộng đồng đăng ngay sau kỳ thi 12/2016 (Saromalang · đáp án tham khảo, 1 nguồn)","mondai":[{"name":"問題1","choices":4,"c":[1,4,2,1,2,1],"o":[null,null,null,null,null,null]},{"name":"問題2","choices":4,"c":[2,4,4,3,4,2,2],"o":[null,null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,4,4,3,1,2],"o":[null,null,null,null,null,null]},{"name":"問題4","choices":3,"c":[2,3,2,3,1,3,3,2,1,2,3,1,2,3],"o":[null,null,null,null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[2,2,1,2],"o":[null,null,null,null]}]},"oyewM6GWMM8":{"level":"N2","session":"2024/07","source":"Công bố đáp án 聴解 N2 07/2024 (UnoJapano + Nam Triều + learnjapaneseaz đối chiếu từng câu)","mondai":[{"name":"問題1","choices":4,"c":[3,1,2,3,3],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[3,1,2,3,4,4],"o":[null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,1,4,1,4],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[1,3,2,2,1,2,2,3,1,3,1],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[2,1,3],"o":[null,null,null]}]},"J--7gfmYCUA":{"level":"N2","session":"2024/07","source":"Công bố đáp án 聴解 N2 07/2024 (UnoJapano + Nam Triều + learnjapaneseaz đối chiếu từng câu)","mondai":[{"name":"問題1","choices":4,"c":[3,1,2,3,3],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[3,1,2,3,4,4],"o":[null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,1,4,1,4],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[1,3,2,2,1,2,2,3,1,3,1],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[2,1,3],"o":[null,null,null]}]},"MzxZFycbXIs":{"level":"N2","session":"2024/07","source":"Công bố đáp án 聴解 N2 07/2024 (UnoJapano + Nam Triều + learnjapaneseaz đối chiếu từng câu)","mondai":[{"name":"問題1","choices":4,"c":[3,1,2,3,3],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[3,1,2,3,4,4],"o":[null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,1,4,1,4],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[1,3,2,2,1,2,2,3,1,3,1],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[2,1,3],"o":[null,null,null]}]},"t2K5p2nOgRo":{"level":"N2","session":"2023/12","source":"Công bố đáp án 聴解 N2 12/2023 (luyenthitiengnhat.edu.vn + bảng đáp án đã công bố khớp nhau 30/30)","mondai":[{"name":"問題1","choices":4,"c":[3,2,2,4,1],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[3,1,3,3,2,4],"o":[null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[1,2,4,3,1],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[2,1,2,2,3,1,3,1,2,1,3],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[3,1,3],"o":[null,null,null]}]},"GzhDnW9y2Nk":{"level":"N2","session":"2018/07","source":"Đáp án + script 聴解 N2 07/2018 (Saromalang · bảng đáp án khớp script có đánh dấu 正解)","mondai":[{"name":"問題1","choices":4,"c":[3,2,2,1,4],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[3,1,3,1,4],"o":[null,null,null,null,null]},{"name":"問題3","choices":4,"c":[1,3,2,1,3],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[3,1,2,3,2,1,1,2,1,1,3],"o":[null,null,null,null,null,null,null,null,null,null,null]},{"name":"問題5","choices":4,"c":[2,4,2,1],"o":[null,null,null,null]}]},"GzjFGRP355c":{"level":"N4","session":"2023/12","source":"Đối chiếu 2 nguồn độc lập khớp toàn bộ 28 câu: learnjapaneseaz — JLPT N4 LISTENING SCRIPT 12/2023 with ANSWER (text) và unojapano — Answers JLPT N4 12/2023 (bảng đáp án phần 聴解)","mondai":[{"name":"問題1","choices":4,"c":[2,1,3,2,2,4,1,4],"o":[null,null,null,null,null,null,null,null]},{"name":"問題2","choices":4,"c":[2,2,4,1,3,3,2],"o":[null,null,null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,3,1,3,1],"o":[null,null,null,null,null]},{"name":"問題4","choices":3,"c":[2,3,2,1,1,2,1,3],"o":[null,null,null,null,null,null,null,null]}]}};
const EMBED_OK=new Set(["psQfsg8iJxw", "KeHn78eVD6A", "79IGiPodBB0", "jV-wT4rw_XY", "E7sa6Wilrfs", "GSOBD5vl8jQ", "RnNqPGCzH3U", "F6ELghsFVK8", "5b995VcJuV4", "OeTlXJ0W5w4", "eKV7vbcTKB4", "nT3mO9ibJ1Q", "WO1Rz7GkboM", "oyewM6GWMM8", "J--7gfmYCUA", "MzxZFycbXIs", "t2K5p2nOgRo", "qJ-7H1DGYKM", "kT0oJ7Abqk0", "ni_PF_GGJeQ", "GzhDnW9y2Nk", "CI13-VkhtAI", "sTGSDkqr58c", "Rl_OLxyVxkE", "90I32aHrF78", "eEAbXBRthX8", "_qOEdHZdPhU", "a_YebRtuWQI", "JZJ9-2s2DoE", "zjRLNHdW1Rs", "cpOaSWliLzE", "Hf0IpRAGUz0", "qg2QSL987oE", "Ici3Q7LKdFw", "K3c_dSP_QXY", "bD3_j2nqCbQ", "1WDF63H8qZQ", "Ttm6ZOrp2zE", "00EItcIod-E", "XG2wRNaZhA4", "xLO9EDHwBE8", "d4c-CL1JwQ0", "he1U5jkFYHs", "zGVvPLMygwk", "fDFrZ9giMQA", "MkzEjj2H6Ac", "x8wf2fvEkkk", "5ZrEBc7r0eY", "UZkwrs32QL4", "LeLgK__o-Q4", "xkF5kY9Yf4c", "hQIbKTpbvEo", "8ToNGO6sI9c", "AtY9YSLT3jw", "U5iKC7UdrS0", "ezSd2y6fGj8", "5E-9dcp9iLk", "8gvLxL6Wmr8", "fWxWy2FFA0Y", "qZzKoz7pkfk", "YGu2z-5jOGA", "FOGhNmH6cGE", "dAEawhAMufk", "OHYSAfkHfdc", "qJNO6iLnGTs", "0RQYavOdfnk", "s-bmJ4YSjaQ", "V-Pwww5q16M", "A3HndNqtogU", "LKLFl7CW4_Q", "F_OENsu4Cv4"]);

function vidOf(a){
  try{const u=new URL(a.href);
    if(u.hostname.includes('youtu.be')) return u.pathname.replace(/^\//,'').split('/')[0];
    return u.searchParams.get('v')||''}catch(e){return ''}
}
function qLabel(m,i){
  if(m.name==='問題5' && m.c.length===4) return ['1番','2番','3番・質問1','3番・質問2'][i];
  return (i+1)+'番';
}
function load(vid){try{return JSON.parse(localStorage.getItem(LS_PREFIX+vid)||'{}')}catch(e){return {}}}
function save(vid,ans){try{localStorage.setItem(LS_PREFIX+vid,JSON.stringify(ans))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

/* Phiếu trả lời thu gọn: mỗi 番 là một khối thu/mở, mặc định thu gọn. */
(function(){
  if(document.getElementById('ck-acc-style')) return;
  const st=document.createElement('style'); st.id='ck-acc-style';
  st.textContent=
  '.ck-sheet .ck-q{display:block;padding:2px 0}'+
  '.ck-qh{display:flex;align-items:center;gap:8px;width:100%;min-height:44px;padding:6px 8px;margin:0;font:inherit;text-align:left;background:transparent;border:0;border-radius:10px;cursor:pointer}'+
  '.ck-qh:hover{background:#eef3f8}'+
  '.ck-qh .ck-ql{flex:none;min-width:4.5rem;font-size:.85rem;font-weight:700;color:#555}'+
  '.ck-qst{flex:1;font-size:.8rem;font-weight:600;color:#2f6fb2}'+
  '.ck-qst[data-res="ok"]{color:#2e8b57}'+
  '.ck-qst[data-res="wrong"]{color:#c0392b}'+
  '.ck-qst[data-res="none"]{color:#999}'+
  '.ck-chev{flex:none;font-size:.78rem;color:var(--accent,#c8374f);transition:transform .18s ease}'+
  '.ck-q.open .ck-chev{transform:rotate(180deg)}'+
  '.ck-qb{padding:2px 8px 6px}'+
  '.ck-tools{margin:0 0 2px}'+
  '.ck-tools .btn{font-size:.8rem;padding:7px 12px;min-height:36px}'+
  'html[data-theme="dark"] .ck-qh{color:var(--m)}'+
  'html[data-theme="dark"] .ck-qh:hover{background:#262019}'+
  'html[data-theme="dark"] .ck-qst{color:#5b82c4}'+
  'html[data-theme="dark"] .ck-qst[data-res="ok"]{color:#63c984}'+
  'html[data-theme="dark"] .ck-qst[data-res="wrong"]{color:#e0655a}'+
  '.ck-sheet>.ck-open{margin:2px 0 4px}';
  (document.head||document.documentElement).appendChild(st);
})();

function renderEmbed(li, vid, title){
  const wrap=document.createElement('div');
  wrap.className='yt-embed';
  const open='https://www.youtube.com/watch?v='+encodeURIComponent(vid);
  const openA='<a class="yt-open" href="'+esc(open)+'" target="_blank" rel="noopener noreferrer">Mở trên YouTube</a>';
  if(!EMBED_OK.has(vid)){
    wrap.innerHTML='<p class="mut" style="margin:8px 0 0">Video này không nhúng được trên trang — '+openA+'.</p>';
    li.appendChild(wrap); return;
  }
  const thumb='https://i.ytimg.com/vi/'+encodeURIComponent(vid)+'/hqdefault.jpg';
  wrap.innerHTML=
    '<div class="yt-facade" role="button" tabindex="0" aria-label="Phát video: '+esc(title)+'">'+
      '<img class="yt-thumb" src="'+esc(thumb)+'" alt="" loading="lazy" width="480" height="360">'+
      '<span class="yt-play" aria-hidden="true">▶</span>'+
    '</div>'+
    '<div class="yt-actions">'+openA+'</div>';
  const facade=wrap.querySelector('.yt-facade');
  const loadPlayer=()=>{
    if(wrap.dataset.loaded) return;
    wrap.dataset.loaded='1';
    const box=document.createElement('div');
    box.className='yt-frame-wrap';
    box.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(vid)+
      '?autoplay=1&playsinline=1&rel=0" title="'+esc(title)+
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" '+
      'allowfullscreen playsinline loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    facade.replaceWith(box);
  };
  facade.addEventListener('click', loadPlayer);
  facade.addEventListener('keydown', e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();loadPlayer()}});
  li.appendChild(wrap);
}

/* ===== ĐỢT 3: phiếu tự chấm cho đề chưa có key + nhãn đáp án trong video =====
   FORMATS: mẫu chuẩn hiện hành của từng cấp (số câu suy từ các phiếu đã xác minh
   trên trang + bảng cấu trúc JLPT công bố; vài kỳ cũ có thể lệch vài câu). */
const FORMATS={
 "N1":[{name:"問題1",desc:"課題理解",choices:4,n:6},{name:"問題2",desc:"ポイント理解",choices:4,n:7},{name:"問題3",desc:"概要理解",choices:4,n:6},{name:"問題4",desc:"即時応答",choices:3,n:13},{name:"問題5",desc:"統合理解",choices:4,n:3}],
 "N2":[{name:"問題1",desc:"課題理解",choices:4,n:5},{name:"問題2",desc:"ポイント理解",choices:4,n:6},{name:"問題3",desc:"概要理解",choices:4,n:5},{name:"問題4",desc:"即時応答",choices:3,n:11},{name:"問題5",desc:"統合理解",choices:4,n:3}],
 "N3":[{name:"問題1",desc:"課題理解",choices:4,n:6},{name:"問題2",desc:"ポイント理解",choices:4,n:6},{name:"問題3",desc:"概要理解",choices:4,n:3},{name:"問題4",desc:"発話表現",choices:4,n:4},{name:"問題5",desc:"即時応答",choices:3,n:9}],
 "N4":[{name:"問題1",desc:"課題理解",choices:4,n:8},{name:"問題2",desc:"ポイント理解",choices:4,n:7},{name:"問題3",desc:"発話表現",choices:4,n:5},{name:"問題4",desc:"即時応答",choices:3,n:8}],
 "N5":[{name:"問題1",desc:"課題理解",choices:4,n:7},{name:"問題2",desc:"ポイント理解",choices:4,n:6},{name:"問題3",desc:"発話表現",choices:4,n:5},{name:"問題4",desc:"即時応答",choices:3,n:6}]
};
const VID_LABELS={"-gdxdYUyV5A":"end","00EItcIod-E":"end","0RQYavOdfnk":"unknown","1WDF63H8qZQ":"end","1kCkbwjnZUs":"end","4mM4qlD7JEY":"unknown","5E-9dcp9iLk":"unknown","5ZrEBc7r0eY":"end","5b995VcJuV4":"unknown","5lACWIzG3u8":"end","79IGiPodBB0":"unknown","7Gbn2Soh_8k":"end","80QNF0hOEcU":"unknown","8ToNGO6sI9c":"end","8gvLxL6Wmr8":"unknown","90I32aHrF78":"end","A3HndNqtogU":"unknown","AruDi1dW4eM":"end","AtY9YSLT3jw":"end","CI13-VkhtAI":"end","E7sa6Wilrfs":"end","EyGnlnLfhK4":"end","F6ELghsFVK8":"unknown","FOGhNmH6cGE":"unknown","F_OENsu4Cv4":"end","FgXR_c3DWpE":"end","GSOBD5vl8jQ":"unknown","GwwFU7vI5dE":"end","GzhDnW9y2Nk":"unknown","GzjFGRP355c":"end","Hf0IpRAGUz0":"end","Ici3Q7LKdFw":"end","J--7gfmYCUA":"end","JZJ9-2s2DoE":"end","K3c_dSP_QXY":"end","KeHn78eVD6A":"end","LKLFl7CW4_Q":"end","LP51n3CCuu8":"end","LeLgK__o-Q4":"end","Md0IbPDVaZc":"end","MkzEjj2H6Ac":"end","MzxZFycbXIs":"per","OHYSAfkHfdc":"unknown","OeTlXJ0W5w4":"unknown","PhsQJE1B9O0":"end","Rl_OLxyVxkE":"end","RnNqPGCzH3U":"unknown","SPX3ags6zQA":"end","Ttm6ZOrp2zE":"end","U5iKC7UdrS0":"end","UZkwrs32QL4":"end","V-Pwww5q16M":"unknown","VJv9541pdiA":"end","WO1Rz7GkboM":"per","XG2wRNaZhA4":"end","YGu2z-5jOGA":"unknown","YHPuALa32l0":"end","ZBSHzUR00JM":"end","_qOEdHZdPhU":"end","a_YebRtuWQI":"end","bD3_j2nqCbQ":"end","bY1sONxgXyQ":"end","blE_bGQnyCU":"end","cSmTAN5VtG4":"end","cpOaSWliLzE":"end","d4c-CL1JwQ0":"end","dAEawhAMufk":"unknown","eEAbXBRthX8":"end","eKV7vbcTKB4":"unknown","eX3gNCq6AUk":"end","eb92bbKreRk":"unknown","ezSd2y6fGj8":"unknown","f1sxDVCAvq4":"end","fDFrZ9giMQA":"end","fWxWy2FFA0Y":"unknown","fsme470PytA":"end","hQIbKTpbvEo":"unknown","he1U5jkFYHs":"end","i5fwGjzqRDc":"unknown","iOZ6BAY6YBg":"end","icCFyDubNCs":"end","iieDMaq0Eyo":"end","jV-wT4rw_XY":"end","kT0oJ7Abqk0":"end","lFjv4CZQH2E":"end","mSX1EglZX18":"end","nT3mO9ibJ1Q":"per","ni_PF_GGJeQ":"end","oyewM6GWMM8":"unknown","paEQrYR9pZs":"end","psQfsg8iJxw":"unknown","qJ-7H1DGYKM":"end","qJNO6iLnGTs":"unknown","qZzKoz7pkfk":"unknown","qg2QSL987oE":"end","rX99RAsx8kQ":"unknown","s-bmJ4YSjaQ":"unknown","sTGSDkqr58c":"end","st6AmJs_ycg":"end","t2K5p2nOgRo":"end","u-8e6RuL0es":"end","x8wf2fvEkkk":"end","xLO9EDHwBE8":"end","xfJ4oDaUPPg":"end","xkF5kY9Yf4c":"end","zGVvPLMygwk":"end","zjRLNHdW1Rs":"end"};
const LABEL_TXT={per:"✅ Đáp án sau mỗi câu",end:"📋 Đáp án cuối bài",unknown:"❔ Chưa rõ có đáp án trong video"};

(function(){
  if(document.getElementById('ck-self-style')) return;
  const st=document.createElement('style'); st.id='ck-self-style';
  st.textContent=
  '.ck-tag{display:inline-block;margin:6px 0 0;padding:2px 10px;border-radius:99px;font-size:.78rem;font-weight:600}'+
  '.ck-tag.t-per{background:#e2f4e5;color:#20713a}'+
  '.ck-tag.t-end{background:#fff0d6;color:#a0522d}'+
  '.ck-tag.t-unk{background:#eeeeee;color:#777777}'+
  'html[data-theme="dark"] .ck-tag.t-per{background:#1d3320;color:#63c984}'+
  'html[data-theme="dark"] .ck-tag.t-end{background:#3a2a16;color:#e0a35a}'+
  'html[data-theme="dark"] .ck-tag.t-unk{background:#2c2620;color:#999999}'+
  '.ck-mark{display:none;gap:8px;margin:8px 0 2px}'+
  '.ck-sheet.marking .ck-mark{display:flex}'+
  '.ck-mark button{flex:1;min-height:40px;border-radius:10px;border:1px solid #bbbbbb;background:transparent;font:inherit;font-weight:600;cursor:pointer;color:inherit}'+
  '.ck-mark button.mk-ok.sel{background:#2e8b57;color:#ffffff;border-color:#2e8b57}'+
  '.ck-mark button.mk-ng.sel{background:#c0392b;color:#ffffff;border-color:#c0392b}';
  (document.head||document.documentElement).appendChild(st);
})();

function loadMark(vid){try{return JSON.parse(localStorage.getItem('hn_choukai_mark_'+vid)||'{}')}catch(e){return {}}}
function saveMark(vid,mk){try{localStorage.setItem('hn_choukai_mark_'+vid,JSON.stringify(mk))}catch(e){}}

function renderTag(li,vid){
  const lab=VID_LABELS[vid]||'unknown';
  const d=document.createElement('div');
  d.className='ck-tag t-'+(lab==='per'?'per':lab==='end'?'end':'unk');
  d.textContent=LABEL_TXT[lab]||LABEL_TXT.unknown;
  const ch=li.querySelector('.mut');
  if(ch) ch.after(d); else li.appendChild(d);
}

function selfQLabel(m,i){
  if(m.name==='問題5' && m.n===4) return ['1番','2番','3番・質問1','3番・質問2'][i];
  return (i+1)+'番';
}

/* Phiếu tự chấm: cùng khung phiếu chuẩn; học viên tự đánh dấu Đúng/Sai theo đáp án
   nghe/xem được trong video. Trang KHÔNG có key cho các đề này — tuyệt đối không
   trình bày điểm tự chấm như đáp án chính thức. */
function renderSelfSheet(li,vid,level,session){
  const fmt=FORMATS[level]; if(!fmt) return;
  const wrap=document.createElement('div');
  wrap.className='ck-sheet ck-self'; wrap.dataset.vid=vid;
  const total=fmt.reduce((a,m)=>a+m.n,0);
  const tglS=document.createElement('button'); tglS.type='button'; tglS.className='btn ck-open'; tglS.setAttribute('aria-expanded','false');
  tglS.textContent='📝 Phiếu trả lời (tự chấm) ▾';
  const body=document.createElement('div'); body.className='ck-body'; body.hidden=true;
  tglS.onclick=()=>{ body.hidden=!body.hidden; tglS.setAttribute('aria-expanded',body.hidden?'false':'true'); tglS.textContent=body.hidden?'📝 Phiếu trả lời (tự chấm) ▾':'📝 Phiếu trả lời (tự chấm) ▴'; };
  wrap.append(tglS,body);
  body.innerHTML='<h4>📝 Phiếu trả lời (tự chấm) · '+esc(level)+' 聴解'+(session?' '+esc(session):'')+' ('+total+' câu · mẫu chuẩn)</h4>'+
    '<p class="mut" style="margin:0 0 6px;font-size:.8rem">Đề này <b>chưa có đáp án đã xác minh</b>. Hãy làm như thi thật: chọn đáp án khi nghe, đối chiếu đáp án ngay trong video, rồi bấm <b>Tự chấm</b> và tự đánh dấu từng câu <b>Đúng/Sai</b> — trang tính điểm từ đánh dấu của bạn. Đây là <b>tự chấm theo đáp án trong video</b>, không phải đáp án chính thức. Số câu theo mẫu chuẩn hiện hành của '+esc(level)+'; một số kỳ cũ có thể lệch vài câu.</p>';
  const stored=load(vid);
  const marks=loadMark(vid);
  const tools=document.createElement('div'); tools.className='ck-tools';
  const tgl=document.createElement('button'); tgl.type='button'; tgl.className='btn g'; tgl.textContent='Mở tất cả';
  tools.appendChild(tgl); body.appendChild(tools);
  const setOpen=(row,open)=>{
    const b=row.querySelector('.ck-qb'); if(b) b.hidden=!open;
    row.classList.toggle('open',open);
    const h=row.querySelector('.ck-qh'); if(h) h.setAttribute('aria-expanded',open?'true':'false');
    const anyClosed=[...wrap.querySelectorAll('.ck-qb')].some(x=>x.hidden);
    tgl.textContent=anyClosed?'Mở tất cả':'Thu gọn tất cả';
  };
  tgl.onclick=()=>{
    const rows=[...wrap.querySelectorAll('.ck-q')];
    const anyClosed=rows.some(r=>r.querySelector('.ck-qb').hidden);
    rows.forEach(r=>setOpen(r,anyClosed));
  };
  const bar=document.createElement('div'); bar.className='ck-bar';
  const grade=document.createElement('button'); grade.type='button'; grade.className='btn'; grade.textContent='Tự chấm theo đáp án trong video';
  const redo=document.createElement('button'); redo.type='button'; redo.className='btn g'; redo.textContent='Làm lại'; redo.hidden=true;
  const score=document.createElement('div'); score.className='ck-score';
  bar.append(grade,redo,score);
  const updateScore=()=>{
    let ok=0,ng=0;
    fmt.forEach((m,mi)=>{ for(let qi=0;qi<m.n;qi++){ const v=(marks[mi]||{})[qi]; if(v===1)ok++; else if(v===0)ng++; } });
    const marked=ok+ng;
    if(total>0){ if(marked===total){ if(!marks.__done){ marks.__done=Date.now(); saveMark(vid,marks); } } else if(marks.__done){ delete marks.__done; saveMark(vid,marks); } }
    if(!wrap.classList.contains('marking')){ score.textContent=''; return; }
    score.innerHTML= marked
      ? '<b>Tự chấm: '+ok+' đúng · '+ng+' sai</b> — đã đánh dấu '+marked+'/'+total+' câu · điểm theo phần đã chấm: <b>'+ok+'/'+marked+'</b>'
      : 'Đang ở chế độ tự chấm: hãy đánh dấu <b>Đúng/Sai</b> cho từng câu theo đáp án trong video.';
  };
  fmt.forEach((m,mi)=>{
    const box=document.createElement('div');
    box.className='ck-m'; box.dataset.mi=String(mi);
    box.innerHTML='<h5>'+esc(m.name)+' · '+esc(m.desc)+(m.choices===3?' · 即時応答 (3 lựa chọn)':'')+'</h5>';
    for(let qi=0;qi<m.n;qi++){
      const row=document.createElement('div');
      row.className='ck-q'; row.dataset.qi=String(qi);
      const head=document.createElement('button'); head.type='button'; head.className='ck-qh'; head.setAttribute('aria-expanded','false');
      const lab=document.createElement('span'); lab.className='ck-ql'; lab.textContent=selfQLabel(m,qi);
      const st=document.createElement('span'); st.className='ck-qst';
      const chev=document.createElement('span'); chev.className='ck-chev'; chev.setAttribute('aria-hidden','true'); chev.textContent='▾';
      head.append(lab,st,chev);
      head.onclick=()=>setOpen(row,row.querySelector('.ck-qb').hidden);
      const qb=document.createElement('div'); qb.className='ck-qb'; qb.hidden=true;
      const optsWrap=document.createElement('div'); optsWrap.className='ck-opts';
      const chosen0=+(stored[mi]||{})[qi]||0;
      if(chosen0){ st.textContent='Đã chọn: '+chosen0; }
      for(let n=1;n<=m.choices;n++){
        const b=document.createElement('button'); b.type='button'; b.dataset.n=String(n); b.textContent=String(n);
        if(chosen0===n) b.classList.add('sel');
        b.onclick=()=>{
          optsWrap.querySelectorAll('button').forEach(x=>x.classList.remove('sel'));
          b.classList.add('sel');
          if(!wrap.classList.contains('marking')) st.textContent='Đã chọn: '+n;
          const cur=load(vid); if(!cur[mi]) cur[mi]={}; cur[mi][qi]=n; save(vid,cur);
          const rows=[...wrap.querySelectorAll('.ck-q')]; const ix=rows.indexOf(row);
          setOpen(row,false);
          if(ix>=0&&ix<rows.length-1) setOpen(rows[ix+1],true);
        };
        optsWrap.appendChild(b);
      }
      const mk=document.createElement('div'); mk.className='ck-mark';
      const bOk=document.createElement('button'); bOk.type='button'; bOk.className='mk-ok'; bOk.textContent='✓ Đúng';
      const bNg=document.createElement('button'); bNg.type='button'; bNg.className='mk-ng'; bNg.textContent='✗ Sai';
      const applyMarkUI=()=>{
        const v=(marks[mi]||{})[qi];
        bOk.classList.toggle('sel',v===1); bNg.classList.toggle('sel',v===0);
        if(wrap.classList.contains('marking')){
          if(v===1){ st.textContent='✅ Đúng (tự chấm)'; st.dataset.res='ok'; }
          else if(v===0){ st.textContent='❌ Sai (tự chấm)'; st.dataset.res='wrong'; }
          else { const c=+(load(vid)[mi]||{})[qi]||0; st.textContent=c?('Đã chọn: '+c+' · chưa đánh dấu'):''; st.removeAttribute('data-res'); }
        }
      };
      const setMark=v=>{
        if(!marks[mi]) marks[mi]={};
        marks[mi][qi]=v; saveMark(vid,marks);
        applyMarkUI(); updateScore();
      };
      bOk.onclick=()=>setMark(1);
      bNg.onclick=()=>setMark(0);
      mk.append(bOk,bNg);
      qb.append(optsWrap,mk);
      row.append(head,qb); box.appendChild(row);
      row._applyMarkUI=applyMarkUI;
    }
    body.appendChild(box);
  });
  body.appendChild(bar);
  const src=document.createElement('p'); src.className='ck-src';
  src.textContent='Phiếu tự chấm theo mẫu chuẩn '+level+' — trang không lưu đáp án của đề này vì chưa đối chiếu được từ 2 nguồn độc lập.';
  body.appendChild(src);

  const enterMarking=(expand)=>{
    wrap.classList.add('marking'); grade.hidden=true; redo.hidden=false;
    try{if(window.F&&F.P&&F.P.touch)F.P.touch()}catch(e){}
    wrap.querySelectorAll('.ck-q').forEach(r=>{ if(r._applyMarkUI) r._applyMarkUI(); if(expand) setOpen(r,true); });
    updateScore();
  };
  grade.onclick=()=>enterMarking(true);
  redo.onclick=()=>{
    wrap.classList.remove('marking');
    wrap.querySelectorAll('.ck-opts button').forEach(b=>b.classList.remove('sel'));
    wrap.querySelectorAll('.ck-mark button').forEach(b=>b.classList.remove('sel'));
    wrap.querySelectorAll('.ck-qst').forEach(x=>{x.textContent='';x.removeAttribute('data-res')});
    wrap.querySelectorAll('.ck-q').forEach(r=>setOpen(r,false));
    Object.keys(marks).forEach(k=>delete marks[k]);
    save(vid,{}); saveMark(vid,{});
    score.textContent=''; grade.hidden=false; redo.hidden=true;
  };
  const hasMark=fmt.some((m,mi)=>{ const mm=marks[mi]||{}; return Object.keys(mm).length>0; });
  if(hasMark) enterMarking(false);
  li.appendChild(wrap);
}

function renderSheet(li,vid,key){
  const wrap=document.createElement('div');
  wrap.className='ck-sheet'; wrap.dataset.vid=vid;
  const total=key.mondai.reduce((a,m)=>a+m.c.length,0);
  const tglS=document.createElement('button'); tglS.type='button'; tglS.className='btn ck-open'; tglS.setAttribute('aria-expanded','false');
  tglS.textContent='📝 Phiếu trả lời ▾';
  const body=document.createElement('div'); body.className='ck-body'; body.hidden=true;
  tglS.onclick=()=>{ body.hidden=!body.hidden; tglS.setAttribute('aria-expanded',body.hidden?'false':'true'); tglS.textContent=body.hidden?'📝 Phiếu trả lời ▾':'📝 Phiếu trả lời ▴'; };
  wrap.append(tglS,body);
  body.innerHTML='<h4>📝 Phiếu trả lời · '+esc(key.level)+' 聴解 '+esc(key.session)+' ('+total+' câu)</h4>'+
    '<p class="mut" style="margin:0 0 6px;font-size:.8rem">Chọn đáp án khi nghe (giống phiếu thi). Bấm <b>Chấm điểm</b> để xem đúng/sai theo đáp án đã xác minh.</p>';
  const stored=load(vid);
  const tools=document.createElement('div'); tools.className='ck-tools';
  const tgl=document.createElement('button'); tgl.type='button'; tgl.className='btn g'; tgl.textContent='Mở tất cả';
  tools.appendChild(tgl); body.appendChild(tools);
  const syncTools=()=>{
    const anyClosed=[...wrap.querySelectorAll('.ck-qb')].some(b=>b.hidden);
    tgl.textContent=anyClosed?'Mở tất cả':'Thu gọn tất cả';
  };
  const setOpen=(row,open)=>{
    const b=row.querySelector('.ck-qb'); if(b) b.hidden=!open;
    row.classList.toggle('open',open);
    const h=row.querySelector('.ck-qh'); if(h) h.setAttribute('aria-expanded',open?'true':'false');
    syncTools();
  };
  tgl.onclick=()=>{
    const rows=[...wrap.querySelectorAll('.ck-q')];
    const anyClosed=rows.some(r=>r.querySelector('.ck-qb').hidden);
    rows.forEach(r=>setOpen(r,anyClosed));
  };
  key.mondai.forEach((m,mi)=>{
    const box=document.createElement('div');
    box.className='ck-m'; box.dataset.mi=String(mi);
    box.innerHTML='<h5>'+esc(m.name)+(m.choices===3?' · 即時応答 (3 lựa chọn)':'')+'</h5>';
    m.c.forEach((correct,qi)=>{
      const row=document.createElement('div');
      row.className='ck-q'; row.dataset.qi=String(qi);
      const head=document.createElement('button'); head.type='button'; head.className='ck-qh'; head.setAttribute('aria-expanded','false');
      const lab=document.createElement('span'); lab.className='ck-ql'; lab.textContent=qLabel(m,qi);
      const st=document.createElement('span'); st.className='ck-qst';
      const chev=document.createElement('span'); chev.className='ck-chev'; chev.setAttribute('aria-hidden','true'); chev.textContent='▾';
      head.append(lab,st,chev);
      head.onclick=()=>setOpen(row,row.querySelector('.ck-qb').hidden);
      const body=document.createElement('div'); body.className='ck-qb'; body.hidden=true;
      const optsWrap=document.createElement('div');
      const texts=m.o && m.o[qi];
      const hasText=Array.isArray(texts) && texts.length===m.choices && texts.every(Boolean);
      optsWrap.className=hasText?'ck-opts ck-opts-text':'ck-opts';
      for(let n=1;n<=m.choices;n++){
        const b=document.createElement('button'); b.type='button'; b.dataset.n=String(n);
        if(hasText) b.innerHTML='<span class="ck-num">'+n+'</span><span class="ck-tx">'+esc(texts[n-1])+'</span>';
        else b.textContent=String(n);
        if(+(stored[mi]||{})[qi]===n){ b.classList.add('sel'); st.textContent='Đã chọn: '+n; }
        b.onclick=()=>{
          if(wrap.classList.contains('done')) return;
          optsWrap.querySelectorAll('button').forEach(x=>x.classList.remove('sel'));
          b.classList.add('sel');
          st.textContent='Đã chọn: '+n; st.removeAttribute('data-res');
          const cur=load(vid); if(!cur[mi]) cur[mi]={}; cur[mi][qi]=n; save(vid,cur);
          const rows=[...wrap.querySelectorAll('.ck-q')]; const ix=rows.indexOf(row);
          setOpen(row,false);
          if(ix>=0&&ix<rows.length-1) setOpen(rows[ix+1],true);
        };
        optsWrap.appendChild(b);
      }
      const ans=document.createElement('div'); ans.className='ck-ans'; ans.hidden=true;
      body.append(optsWrap,ans);
      row.append(head,body); box.appendChild(row);
    });
    body.appendChild(box);
  });
  const bar=document.createElement('div'); bar.className='ck-bar';
  const grade=document.createElement('button'); grade.type='button'; grade.className='btn'; grade.textContent='Chấm điểm';
  const redo=document.createElement('button'); redo.type='button'; redo.className='btn g'; redo.textContent='Làm lại'; redo.hidden=true;
  const score=document.createElement('div'); score.className='ck-score';
  bar.append(grade,redo,score); body.appendChild(bar);
  const src=document.createElement('p'); src.className='ck-src';
  src.textContent='Nguồn đáp án: '+key.source+' — không đoán.';
  body.appendChild(src);

  grade.onclick=()=>{
    let okAll=0,totAll=0; const per=[];
    key.mondai.forEach((m,mi)=>{
      let ok=0;
      const rows=wrap.querySelectorAll('.ck-m[data-mi="'+mi+'"] .ck-q');
      m.c.forEach((correct,qi)=>{
        totAll++;
        const row=rows[qi];
        const btns=[...row.querySelectorAll('.ck-opts button')];
        btns.forEach(b=>b.classList.remove('right','wrong'));
        const sel=row.querySelector('.ck-opts button.sel');
        const chosen=sel?+sel.dataset.n:0;
        const rightBtn=btns.find(b=>+b.dataset.n===correct);
        if(rightBtn) rightBtn.classList.add('right');
        if(chosen===correct){ok++; okAll++} else if(sel) sel.classList.add('wrong');
        const ans=row.querySelector('.ck-ans');
        const texts=m.o && m.o[qi];
        const ttxt=(Array.isArray(texts)&&texts[correct-1])?(' — '+texts[correct-1]):'';
        ans.hidden=false;
        ans.innerHTML=(chosen===correct?'✅ Đúng':(chosen?'❌ Sai':'⚪ Chưa chọn'))+' · đáp án: <b>'+correct+'</b>'+esc(ttxt);
        const st=row.querySelector('.ck-qst');
        if(st){ st.textContent=(chosen===correct?'✅ Đúng':(chosen?'❌ Sai':'⚪ Chưa chọn'))+' · đáp án '+correct; st.dataset.res=(chosen===correct?'ok':(chosen?'wrong':'none')); }
      });
      per.push(m.name+': '+ok+'/'+m.c.length);
    });
    wrap.querySelectorAll('.ck-q').forEach(r=>setOpen(r,true));
    try{ const cur2=load(vid); let ansN=0; key.mondai.forEach((m2,mi2)=>{ const mm2=cur2[mi2]||{}; Object.keys(mm2).forEach(qi2=>{ if(mm2[qi2]!=null) ansN++; }); }); if(total>0&&ansN>=total&&!cur2.__done){ cur2.__done=Date.now(); save(vid,cur2); } if(window.F&&F.P&&F.P.touch)F.P.touch(); }catch(e){}
    wrap.classList.add('done'); grade.hidden=true; redo.hidden=false;
    score.innerHTML='<b>Tổng: '+okAll+'/'+totAll+'</b><br>'+per.join(' · ');
  };
  redo.onclick=()=>{
    wrap.classList.remove('done');
    wrap.querySelectorAll('.ck-opts button').forEach(b=>b.classList.remove('sel','right','wrong'));
    wrap.querySelectorAll('.ck-ans').forEach(a=>{a.hidden=true;a.textContent=''});
    wrap.querySelectorAll('.ck-qst').forEach(x=>{x.textContent='';x.removeAttribute('data-res')});
    wrap.querySelectorAll('.ck-q').forEach(r=>setOpen(r,false));
    save(vid,{}); score.textContent=''; grade.hidden=false; redo.hidden=true;
  };
  li.appendChild(wrap);
}


function demoShot(){
  const mode=new URLSearchParams(location.search).get('ckshot');
  if(!mode) return;
  const root=document.getElementById('choukai-yt'); if(!root) return;
  const keepOnly=li=>{ root.querySelectorAll('.ytlist li').forEach(x=>{if(x!==li) x.remove()}); };
  if(mode==='nokey'||mode==='self'||mode==='selfmark'){
    const sheet=root.querySelector('.ck-sheet.ck-self'); if(!sheet) return;
    const li=sheet.closest('li'); keepOnly(li);
    if(mode==='nokey') return;
    const tgl=sheet.querySelector('.ck-open'); if(tgl) tgl.click();
    const rows=sheet.querySelectorAll('.ck-q');
    rows.forEach((row,ix)=>{ if(ix<6){ const b=row.querySelector('.ck-opts button[data-n="'+((ix%4)+1)+'"]'); if(b) b.click(); } });
    if(mode==='selfmark'){
      const g=[...sheet.querySelectorAll('.ck-bar .btn')].find(b=>b.textContent.indexOf('Tự chấm')===0); if(g) g.click();
      rows.forEach((row,ix)=>{ const b=row.querySelector(ix<3?'.mk-ok':(ix===3?'.mk-ng':'.mk-ok')); if(b&&(ix<5)) b.click(); });
    }
    return;
  }
  const sheet=root.querySelector('.ck-sheet[data-vid="F6ELghsFVK8"]')||root.querySelector('.ck-sheet:not(.ck-self)');
  if(!sheet) return;
  const li=sheet.closest('li');
  keepOnly(li);
  if(mode==='empty'||mode==='embed') return;
  if(mode==='playing'){
    const fac=li.querySelector('.yt-facade');
    if(fac) fac.click();
    return;
  }
  if(mode==='scored'){
    const key=KEYS[sheet.dataset.vid]; if(!key) return;
    key.mondai.forEach((m,mi)=>{
      const rows=sheet.querySelectorAll('.ck-m[data-mi="'+mi+'"] .ck-q');
      m.c.forEach((correct,qi)=>{
        const pick=(qi%3===1)?((correct%m.choices)+1||m.choices):correct;
        const btn=rows[qi].querySelector('.ck-opts button[data-n="'+pick+'"]');
        if(btn) btn.click();
      });
    });
    const g=sheet.querySelector('.ck-bar .btn:not(.g)'); if(g) g.click();
  }
}

function init(){
  const root=document.getElementById('choukai-yt'); if(!root) return;
  root.querySelectorAll('.ytlist li').forEach(li=>{
    const a=li.querySelector('a[href*="youtube.com"],a[href*="youtu.be"]'); if(!a) return;
    const vid=vidOf(a); if(!vid) return;
    const title=(a.querySelector('b')||a).textContent.trim();
    renderTag(li,vid);
    renderEmbed(li, vid, title);
    if(KEYS[vid]) renderSheet(li,vid,KEYS[vid]);
    else{
      let h=li.parentElement.previousElementSibling; while(h&&h.tagName!=='H3') h=h.previousElementSibling;
      const lv=h?('N'+(h.id||'').replace('lv-n','')):'';
      let sess=''; const tm=title.match(/(\d{4})年(\d{1,2})月/)||title.match(/(\d{1,2})\s*\/\s*(\d{4})/)||title.match(/(\d{4})\s*\/\s*(\d{1,2})/);
      if(tm){ if(tm[1].length===4) sess=tm[2].padStart(2,'0')+'/'+tm[1]; else sess=tm[1].padStart(2,'0')+'/'+tm[2]; }
      renderSelfSheet(li,vid,lv,sess);
    }
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{init();demoShot()});
else {init();demoShot()}

const hv=(location.hash||'').replace('#ck-','');if(hv&&EMBED_OK.has(hv)){setTimeout(()=>{const li=document.getElementById('ck-'+hv);if(li){li.style.outline='3px solid #cf3a2e';li.style.borderRadius='12px';li.scrollIntoView({block:'center'})}},400)}
})();
