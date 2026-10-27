/* Phiếu đáp án + nhúng YouTube (click-to-load) dưới mỗi đề 聴解. */
(function(){
const LS_PREFIX='hn_choukai_';
const KEYS={"F6ELghsFVK8":{"level":"N1","session":"2019/12","source":"Công bố đáp án 聴解 N1 12/2019 (aixinjp · 正解 + 選択肢 trong bản script)","mondai":[{"name":"問題1","choices":4,"c":[3,1,2,4,3,4],"o":[["ちぎれた部分を探す","本を修理する","同じ本を買って持ってくる","図書館に本の代金を払う"],["デザイン変更の相談を業者とする","業者に納期の変更を依頼する","記念品の予算を再検討する","記念品を別の業者に注文する"],["専門家と打ち合わせをする","ツアーで登るの候補を絞る","他社の類似ツアーに参加する","山周辺の観光スポットを探す"],["駐車場までの地図を作る","店の隣に駐車場を作る","店の前に看板を立てる","店先に植物を置く"],["自習用教材の作成","受講生へのアンケートの実施","新しい教材の内容の確認","パソコンの設定変更"],["オンラインの共有フォルダーに保存する","印刷して、出席者に回覧する","印刷して、部長に提出する","発言者にメールで送付する"]]},{"name":"問題2","choices":4,"c":[4,1,2,2,1,2],"o":[["歌舞伎の知識を得ること","着物を着て出かけること","好きな役者をじかに見ること","劇の時代の雰囲気を味わうこと"],["部屋に本をしまうスペースがないから","言葉の意味がすぐに調べられるから","欲しい本がすぐに手に入るから","同時に何冊も楽にも持ち歩けるから"],["市内の図書館の数を増やす","市内全ての図書館の利用時間を延ばす","大きな図書館にパソコンルームを作る","中央図書館にカフェスペースを設置する"],["効率的に事務をこなせる人","自分で課題を発見できる人","建設業務の経験が豊かな人","明確なビジョンを持っている人"],["周囲に同化して、敵をだます方法","毒の針で、敵を刺す方法","においで、敵を攻撃する方法","からに閉じこもり、敵をかわす方法"],["不測の事態に営業部が臨機応変に対処すること","トラブル時の部署間れんけいの指針を作ること","全ての部署が団結して目標に立ち向かうこと","各部署が対処可能な業務範囲を広げること"]]},{"name":"問題3","choices":4,"c":[4,1,1,1,3,4],"o":[["将来に備えて貯蓄するべきだ","確実な投資の方法を学ぶべきだ","若い時の外国語学習は大切だ","若い時の異文化体験は大切だ"],["改めて新聞を読むことにしたわけ","インターネットニュースの便利さ","毎日 新聞を読むことの大切さ","おすすめのニュースサイト"],["作詞家が亡くなったこと","作詞家の一生","流行歌の歌詞","流行歌の特徴"],["人口知能はどのように活用されているのか","人工知能はどうして必要なのか","人工知能は今後どうなっていくのか","人工知能はどんな問題を抱えているのか"],["歴史が趣味だという女性が増えていること","男性より、女性のほうが趣味が多いこと","趣味に男女差がなくなってきていること","趣味を持つ男性が少なくなったこと"],["雪が積もった山の美しさ","天候と作物のできの関係","雪が花の開花に及ぼす影響","農作業の時期を見極める知恵"]]},{"name":"問題4","choices":3,"c":[2,3,1,2,1,2,2,2,1,3,1,3,2],"o":[["じゃ、やむまでやりましょう","これじゃ、無理ですね","ああ、雨、やみそうですか"],["すみません、計算が間違ってましたか","すみません、合計書がないほうがよかったんですね","すみません、書き入れて出し直します"],["期待を裏切らないね","材料にこだわってるのにね","いいのは値段だけってことだね"],["あ、待っててくださったんですか","本当、思いもしませんでした","先もここでお会いしましたっけ"],["そんなことないです。緊張しちゃって","毎回ひやひやさせてすみません","危なかったですか。気がつきませんでした"],["じゃ、出張から戻ったら教えて","トラブルがあって、その対応みたい","え、これからまた海外に行くの"],["本当、まるで子供が描いたみたいですね","子どもの発想って本当に素晴らしいですね","確かに子供ならもっと自由に描くでしょうね"],["それが結局かえなかったんで","ぜひやってみたいと思いまして","え、今度そんな企画が出たんですか"],["何かもめたのかな","えっ、二人で一緒に？","確かに忙しそうにしているね"],["あの、よかったの。商品名だけでしょうか","いいえ、似たような商品名をたくさんあるはずです","商品名もう一度考え直します"],["いったい何考えてるんだろうね","そんなむちゃなこと言わないでよ","関心するほどのことじゃないよ"],["少しは人気が出てもいいのになあ","いや、問い合わせはゼロやないよ","なんだかものすごい反響なんだよ"],["まだ何も考えてません","特にないですが、何でしょうか","今日は荷物は持ってきてないです"]]},{"name":"問題5","choices":4,"c":[3,3,4,2],"o":[["日本の漁業","北海道の漁業","漁業の未来","新しい漁業"],["おしゃれなカメラケースをプレゼントする","ただで講座が受けられる特典をつける","カメラの一日貸出サービスを始める","写真の展示会を開いて宣伝する"],["赤","青","緑","黄"],["赤","青","緑","黄"]]}]},"5b995VcJuV4":{"level":"N1","session":"2018/07","source":"Script + đáp án N1 07/2018 (Saromalang · 正解 + 選択肢)","mondai":[{"name":"問題1","choices":4,"c":[2,4,3,3,2,4],"o":[["講演会の中止を参加者に伝える","講演者に時間の延長を頼む","代わりの講演者を探す","空いた時間にすることを決める"],["走る姿勢を変える","走る回数を増やす","スポーツジムに通う","自転車で通学する"],["書類のしめきりの日を机に張る","一日の仕事の順序を決める","仕事にかかった時間を記録する","上司からのアドバイスをメモする"],["落書きを消す","ごみを拾う","落ち葉を集める","かだんの草を抜く"],["タイトルの書体を変更する","背景の色を修正する","作品のあらすじを削除する","出演者の名前を書き入れる"],["売れ行きが悪い作品","人気がある作家の作品","今の季節がテーマの作品","今と異なる季節がテーマの作品"]]},{"name":"問題2","choices":4,"c":[2,3,1,2,2,1],"o":[["通勤に使っていた時間が有効に使える","自分のペースで仕事ができる","住みたい場所に引っ越せる","服装に気をつかわなくていい"],["発明の賞を取りたかったから","独立して新しい会社を作りたかったから","ゲーム感覚で発電できるものを作りたかったから","代替エネルギーとしてていあんしたかったから"],["都会を離れてのびのび過ごしてほしいから","自立心を養ってほしいから","勉強に集中しやすい環境だから","将来家族でいなかに住む予定だから"],["発見されたときの状態がよいこと","画家本人が少年時代にかいたものであること","画家が最後にかいた作品であること","画家が妻と共同で制作した作品であること"],["漁業や農業の技術を身につけること","体験を通して人と食との関係を理解すること","島の人の毎日の食事を調査すること","島で売れる新商品を開発すること"],["新商品が発売されるから","売り上げが好調だから","社長が交代したから","新しい工場ができたから"]]},{"name":"問題3","choices":4,"c":[3,3,2,1,4,2],"o":[["必要がないものを買うと後悔する","急いで買うと失敗する","迷わずに買ったものは飽きない","よく考えて買ったものは長く使える"],["いろいろな移動式サービスの種類","災害に備えた地域の取り組み","銀行が移動式サービスを始めたこと","銀行同士の競争が激しくなっていること"],["桜祭りに来る客を増やすための対策","桜の木の病気に対する対応","桜の木を切ることに反対する運動","桜の木を新たに植える取り組み"],["現在栽培されている麦の始まり","麦に関する研究の展望","麦を分類する方法","麦の突然変異の仕組み"],["ウェブを中心に行うべきだ","ウェブとテレビで行うべきだ","新聞とウェブとテレビで行うべきだ","新聞に絞って行うべきだ"],["無責任に犬を捨ててはいけない","高齢者に合った動物保護の仕方がある","子犬も高齢の犬も同様に保護すべきだ","犬は高齢者に癒しを与えてくれる"]]},{"name":"問題4","choices":3,"c":[3,2,3,1,2,3,2,1,3,1,3,2,1],"o":[["バイトの予定早く決まればいいね。","バイト入ってなかったんだ。じゃ、いけるね。","いっしょに行くのを楽しみにしてたのに。"],["うん、そこの棚にもないでしょう。","えっ？本当？あった？","早く見つかるといいんだけど。"],["ご期待にそえなくて、すみません。","はあ、一言足りませんでしたか。","いやあ、今日はたまたまです。"],["もう映画に出ないの？結構好きだったんだけど。","最後はどんな映画に出るんだろうね。","あの映画で引退を思いとどまったんだね。"],["じゃあ、予定どおりですね。","遅れるのは困りますね。","えっ、早まるんですか。"],["でも、うっかり言わなくてよかったじゃないの？","そんなに君ばかり話してたんだ。","そう。何言ったの？"],["優勝して目標を失ったんだね。","そっか。残念だったろうね。","だから、機嫌がいいんだね。"],["何とか片付きました。","えっ、もう終わりましたけど。","どなたが手伝ってくださったんですか。"],["ありがとうございます。恐れ入ります。","よくあることなんですね。ほっとしました。","申し訳ありません。今後気をつけます。"],["レシートを渡せばいいんですね。","レシートは出口でもらえるんですね。","レシートは見せなくていいんですね。"],["将来性があるってこと？","新人なのに、頼もしいね。","まだ入ったばっかりだから。"],["ああ、予約しとかなくてもいいんだ。","えっ、予約しとけばよかったね。","せっかく予約しといたのにね。"],["ご無理をお願いして申し訳ありません。","やはりだめでしたか。","私はお受けしにくいですが。"]]},{"name":"問題5","choices":4,"c":[2,3,3,4],"o":[["木村会館","山田ホテル","井上セミナーハウス","高山ホール"],["子供向けのパンフレットを配る","画用紙と色鉛筆を貸し出す","絵に関するクイズを用意する","絵の一部から作品を探すゲームを用意する"],["赤山","青山","緑山","白山"],["赤山","青山","緑山","白山"]]}]},"ni_PF_GGJeQ":{"level":"N2","session":"2019/07","source":"Công bố đáp án 聴解 N2 07/2019 (aixinjp · 正解; 選択肢 khi có trong script)","mondai":[{"name":"問題1","choices":4,"c":[4,3,4,1,3],"o":[null,null,null,null,null]},{"name":"問題2","choices":4,"c":[4,3,3,2,2],"o":[null,null,null,null,null]},{"name":"問題3","choices":4,"c":[2,2,4,1,3],"o":[["この仕事の魅力","この仕事の大変さ","この仕事に就いた理由","この仕事に必要な体力"],["値段も安かったし、良い車で満足だ","値段は高かったが、良い車で満足だ","安い車なので、性能に不満がある","高級な車だが、性能に不満がある"],["おいしい料理を作る工夫","子供時代の食事の思い出","家庭料理の味の特徴","味の好みを決める要素"],["好きな本を繰り返し読んでほしい","なるべく多くの本を読んでほしい","すぐに役に立つ本を読んでほしい","宣伝を参考にして本を読んでほしい"],["目標は自分たちに合ったものがよい","目標を持ち続けることが必要だ","目標に向かうプロセスにも意味がある","時々目標を見直すことが大事だ"]]},{"name":"問題4","choices":3,"c":[1,2,2,3,3,1,1,3,3,2,1],"o":[["え？ないんですか","助かります。ありがとうございます","あ、机の上に置いてはいけなかったんですね"],["もっと小さいのがよかったんですね","小さいのにすごいけでしょう","小さい方が性能がいいんですか"],["明日までじゃなくてよかったね","本当、もっと時間ほしいよね","え？レポート出さなくてもよくなったの？"],["運んでいただけるんですか","え？私、運んでませんよ","あ、はい。どこへ運びましょうか"],["では、さっそく準備を始めます","中止になるなんて残念です","今のところうまくいってます"],["あぁ、わかった。忘れるよ","え？ちゃんと聞いてたよ","もちろん、いつでも聞くよ"],["そうか。でも間に合ったならよかったね","あー、いつものに乗れなかったんだ","え？電車が遅れたんだ"],["それなら一緒にやろうか","え？１人でやったの？","じゃ、お願いしてもいい？"],["うまくいったんだ。頑張った甲斐があったね","仕方ないよ。そんなにがっかりしないで","きっと練習の成果を出せると思うよ"],["予約は必要ないんですね","先週、予約しました","せっかく予約したのに使えないんですか"],["すみません。すぐ用意します","あ、検討していただけるんですね","えぇ、ご理解ありがとうございます"]]},{"name":"問題5","choices":4,"c":[2,4,2,1],"o":[["ボール体操","柔軟体操","リズム運動","筋肉トレーニング"],["チラシの文字を大きくする","配るチラシの数を増やす","看板の文字を大きくする","看板の高さを高くする"],["東小学校","西中学校","南小学校","北中学校"],["東小学校","西中学校","南小学校","北中学校"]]}]}};
const EMBED_OK=new Set(["psQfsg8iJxw", "_LKqSk5BSio", "jV-wT4rw_XY", "JcRyY_U-icE", "0nxZjE21qig", "7l2kTJYb8pE", "F6ELghsFVK8", "eKV7vbcTKB4", "5b995VcJuV4", "OeTlXJ0W5w4", "nT3mO9ibJ1Q", "SS6DKr7A9X4", "oyewM6GWMM8", "IecUh9Fh-4g", "J--7gfmYCUA", "qJ-7H1DGYKM", "MzxZFycbXIs", "GzhDnW9y2Nk", "kT0oJ7Abqk0", "ni_PF_GGJeQ"]);

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

function renderSheet(li,vid,key){
  const wrap=document.createElement('div');
  wrap.className='ck-sheet'; wrap.dataset.vid=vid;
  const total=key.mondai.reduce((a,m)=>a+m.c.length,0);
  wrap.innerHTML='<h4>📝 Phiếu trả lời · '+esc(key.level)+' 聴解 '+esc(key.session)+' ('+total+' câu)</h4>'+
    '<p class="mut" style="margin:0 0 6px;font-size:.8rem">Chọn đáp án khi nghe (giống phiếu thi). Bấm <b>Chấm điểm</b> để xem đúng/sai theo đáp án đã xác minh.</p>';
  const stored=load(vid);
  key.mondai.forEach((m,mi)=>{
    const box=document.createElement('div');
    box.className='ck-m'; box.dataset.mi=String(mi);
    box.innerHTML='<h5>'+esc(m.name)+(m.choices===3?' · 即時応答 (3 lựa chọn)':'')+'</h5>';
    m.c.forEach((correct,qi)=>{
      const row=document.createElement('div');
      row.className='ck-q'; row.dataset.qi=String(qi);
      const lab=document.createElement('div'); lab.className='ck-ql'; lab.textContent=qLabel(m,qi);
      const optsWrap=document.createElement('div');
      const texts=m.o && m.o[qi];
      const hasText=Array.isArray(texts) && texts.length===m.choices && texts.every(Boolean);
      optsWrap.className=hasText?'ck-opts ck-opts-text':'ck-opts';
      for(let n=1;n<=m.choices;n++){
        const b=document.createElement('button'); b.type='button'; b.dataset.n=String(n);
        if(hasText) b.innerHTML='<span class="ck-num">'+n+'</span><span class="ck-tx">'+esc(texts[n-1])+'</span>';
        else b.textContent=String(n);
        if(+(stored[mi]||{})[qi]===n) b.classList.add('sel');
        b.onclick=()=>{
          if(wrap.classList.contains('done')) return;
          optsWrap.querySelectorAll('button').forEach(x=>x.classList.remove('sel'));
          b.classList.add('sel');
          const cur=load(vid); if(!cur[mi]) cur[mi]={}; cur[mi][qi]=n; save(vid,cur);
        };
        optsWrap.appendChild(b);
      }
      const ans=document.createElement('div'); ans.className='ck-ans'; ans.hidden=true;
      row.append(lab,optsWrap,ans); box.appendChild(row);
    });
    wrap.appendChild(box);
  });
  const bar=document.createElement('div'); bar.className='ck-bar';
  const grade=document.createElement('button'); grade.type='button'; grade.className='btn'; grade.textContent='Chấm điểm';
  const redo=document.createElement('button'); redo.type='button'; redo.className='btn g'; redo.textContent='Làm lại'; redo.hidden=true;
  const score=document.createElement('div'); score.className='ck-score';
  bar.append(grade,redo,score); wrap.appendChild(bar);
  const src=document.createElement('p'); src.className='ck-src';
  src.textContent='Nguồn đáp án: '+key.source+' — không đoán.';
  wrap.appendChild(src);

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
      });
      per.push(m.name+': '+ok+'/'+m.c.length);
    });
    wrap.classList.add('done'); grade.hidden=true; redo.hidden=false;
    score.innerHTML='<b>Tổng: '+okAll+'/'+totAll+'</b><br>'+per.join(' · ');
  };
  redo.onclick=()=>{
    wrap.classList.remove('done');
    wrap.querySelectorAll('.ck-opts button').forEach(b=>b.classList.remove('sel','right','wrong'));
    wrap.querySelectorAll('.ck-ans').forEach(a=>{a.hidden=true;a.textContent=''});
    save(vid,{}); score.textContent=''; grade.hidden=false; redo.hidden=true;
  };
  li.appendChild(wrap);
}

function renderNoKey(li){
  const n=document.createElement('p'); n.className='ck-note';
  n.textContent='Chưa có đáp án đã xác minh cho đề này — phiếu trả lời sẽ hiện khi đối chiếu được đủ đáp án từ video (mô tả/phụ đề) hoặc bảng đáp án công bố của kỳ thi.';
  li.appendChild(n);
}

function demoShot(){
  const mode=new URLSearchParams(location.search).get('ckshot');
  if(!mode) return;
  const root=document.getElementById('choukai-yt'); if(!root) return;
  if(mode==='nokey'){
    const note=root.querySelector('.ck-note'); if(!note) return;
    const li=note.closest('li');
    root.querySelectorAll('.ytlist li').forEach(x=>{if(x!==li) x.remove()});
    return;
  }
  const sheet=root.querySelector('.ck-sheet[data-vid="F6ELghsFVK8"]')||root.querySelector('.ck-sheet');
  if(!sheet) return;
  const li=sheet.closest('li');
  root.querySelectorAll('.ytlist li').forEach(x=>{if(x!==li) x.remove()});
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
    renderEmbed(li, vid, title);
    if(KEYS[vid]) renderSheet(li,vid,KEYS[vid]); else renderNoKey(li);
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{init();demoShot()});
else {init();demoShot()}
})();
