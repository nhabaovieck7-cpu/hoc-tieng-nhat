/* Khóa tiếng Anh / tiếng Trung: thanh chọn ngôn ngữ, trang vào, mở bài ?lang=, TTS trình duyệt.
   Không đổi cách mở bài tiếng Nhật (LOCK/enc). */
(function(w){
  var KEY='hn_lang';
  function path(){try{return (location.pathname.split('/').pop()||'index.html')}catch(e){return 'index.html'}}
  function qs(k){try{return new URLSearchParams(location.search).get(k)||''}catch(e){return ''}}
  function pageLang(){
    var q=qs('lang');
    if(q==='en'||q==='zh')return q;
    var p=path();
    if(p==='en.html')return 'en';
    if(p==='zh.html')return 'zh';
    return 'jp';
  }
  function isLangLesson(){var L=qs('lang');return L==='en'||L==='zh'}

  function injectFonts(){
    if(document.getElementById('hn-lang-fonts'))return;
    var l=document.createElement('link');
    l.id='hn-lang-fonts';l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Serif+SC:wght@600;700&display=swap';
    document.head.appendChild(l);
  }
  function injectCss(){
    if(document.getElementById('hn-lang-css'))return;
    var l=document.createElement('link');
    l.id='hn-lang-css';l.rel='stylesheet';l.href='lang-courses.css?v=4';
    document.head.appendChild(l);
  }

  function base(){
    var p=location.pathname;
    if(/\/bai\/|\/game\/|\/game-truyen\//.test(p))return '../';
    return '';
  }

  function switcherHtml(on){
    var b=base();
    function a(k,href,big,small){
      return '<a href="'+b+href+'"'+(k===on?' class="on"':'')+'><b>'+big+'</b><small>'+small+'</small></a>';
    }
    return '<div class="hn-langbar" id="hnLangBar"><div class="wrap">'+
      '<p class="hn-langbar-lab">Bạn muốn học</p>'+
      '<div class="hn-lang-sw" role="navigation" aria-label="Chọn ngôn ngữ học">'+
        a('jp','index.html','日本語','Tiếng Nhật')+
        a('en','en.html','English','Tiếng Anh')+
        a('zh','zh.html','中文','Tiếng Trung')+
      '</div></div></div>';
  }

  function placeBar(){
    var tb=document.querySelector('.topbar');
    var bar=document.getElementById('hnLangBar');
    if(!tb||!bar)return;
    var h=Math.ceil(tb.getBoundingClientRect().height);
    if(h<40)h=62;
    bar.style.top=h+'px';
    document.documentElement.style.setProperty('--hn-topbar-h',h+'px');
    var bh=Math.ceil(bar.getBoundingClientRect().height)||52;
    document.documentElement.style.scrollPaddingTop=(h+bh)+'px';
  }
  function injectBar(){
    if(document.getElementById('hnLangBar'))return;
    var tb=document.querySelector('.topbar');
    if(!tb)return;
    injectCss();
    var lang=pageLang();
    if(lang==='zh'||path()==='zh.html')injectFonts();
    if(lang==='en'||lang==='zh')document.documentElement.setAttribute('data-hn-lang',lang);
    tb.insertAdjacentHTML('afterend', switcherHtml(lang));
    placeBar();
    try{
      if(typeof ResizeObserver==='function'){
        var ro=new ResizeObserver(function(){placeBar()});
        ro.observe(tb);
        var bar=document.getElementById('hnLangBar');
        if(bar)ro.observe(bar);
      }
    }catch(e){}
    w.addEventListener('resize',placeBar);
    w.addEventListener('load',placeBar);
  }

  /* ---- Browser TTS (en-US / zh-CN). Không đụng F.tts (VOICEVOX tiếng Nhật). ---- */
  var utter=null;
  function ttsLangFor(L){return L==='zh'?'zh-CN':'en-US'}
  function pickVoice(code){
    var list=[];
    try{list=speechSynthesis.getVoices()||[]}catch(e){return null}
    var pref=list.filter(function(v){return (v.lang||'').toLowerCase().indexOf(code.toLowerCase())===0});
    return pref[0]||null;
  }
  function stopSpeak(){
    try{if(w.speechSynthesis)speechSynthesis.cancel()}catch(e){}
    utter=null;
    document.querySelectorAll('.hn-line.reading').forEach(function(el){el.classList.remove('reading')});
  }
  function speak(text, lang, rate, onend){
    if(!text||!w.speechSynthesis){if(onend)onend();return}
    stopSpeak();
    var u=new SpeechSynthesisUtterance(String(text));
    u.lang=lang||'en-US';
    u.rate=rate||0.95;
    var v=pickVoice(u.lang);
    if(v)u.voice=v;
    u.onend=function(){utter=null;if(onend)onend()};
    u.onerror=function(){utter=null;if(onend)onend()};
    utter=u;
    // Chrome: voices may load async
    var start=function(){try{speechSynthesis.speak(u)}catch(e){if(onend)onend()}};
    if(speechSynthesis.getVoices().length)start();
    else{
      var done=false;
      var ev=function(){if(done)return;done=true;speechSynthesis.onvoiceschanged=null;var v2=pickVoice(u.lang);if(v2)u.voice=v2;start()};
      speechSynthesis.onvoiceschanged=ev;
      setTimeout(ev,400);
    }
  }

  function bindTts(root){
    root=root||document;
    root.querySelectorAll('[data-tts]').forEach(function(el){
      if(el.getAttribute('data-tts-bound'))return;
      el.setAttribute('data-tts-bound','1');
      el.addEventListener('click',function(ev){
        if(!ev.target.closest('.hn-tts')&&el.tagName!=='BUTTON')return;
        ev.preventDefault();
        var t=el.getAttribute('data-tts')||el.getAttribute('data-tts');
        var btn=ev.target.closest('.hn-tts')||el;
        var line=btn.closest('.hn-line')||btn;
        var lang=btn.getAttribute('data-tts-lang')||(line&&line.getAttribute('data-tts-lang'))||ttsLangFor(pageLang());
        var text=btn.getAttribute('data-tts')||(line&&line.getAttribute('data-tts'))||'';
        if(!text)return;
        var slow=btn.classList.contains('hn-ttslow')||btn.getAttribute('data-rate')==='slow';
        document.querySelectorAll('.hn-line.reading').forEach(function(x){x.classList.remove('reading')});
        if(line&&line.classList)line.classList.add('reading');
        speak(text, lang, slow?0.7:0.95, function(){if(line)line.classList.remove('reading')});
      });
    });
    root.querySelectorAll('.hn-tts-all').forEach(function(btn){
      if(btn.getAttribute('data-tts-bound'))return;
      btn.setAttribute('data-tts-bound','1');
      btn.addEventListener('click',function(){
        var box=btn.closest('.hn-kaiwa')||root;
        var lines=[].slice.call(box.querySelectorAll('.hn-line[data-tts]'));
        if(!lines.length)return;
        if(btn.getAttribute('data-playing')){btn.removeAttribute('data-playing');btn.textContent='🔊 Đọc cả hội thoại';stopSpeak();return}
        btn.setAttribute('data-playing','1');
        btn.textContent='⏹ Dừng đọc';
        var i=0, rate=btn.getAttribute('data-rate')==='slow'?0.7:0.95;
        function next(){
          if(!btn.getAttribute('data-playing'))return;
          if(i>=lines.length){btn.removeAttribute('data-playing');btn.textContent='🔊 Đọc cả hội thoại';return}
          var ln=lines[i++];
          document.querySelectorAll('.hn-line.reading').forEach(function(x){x.classList.remove('reading')});
          ln.classList.add('reading');
          speak(ln.getAttribute('data-tts'), ln.getAttribute('data-tts-lang')||ttsLangFor(pageLang()), rate, function(){
            ln.classList.remove('reading');next();
          });
        }
        next();
      });
    });
    root.querySelectorAll('.hn-shadow').forEach(function(btn){
      if(btn.getAttribute('data-tts-bound'))return;
      btn.setAttribute('data-tts-bound','1');
      btn.addEventListener('click',function(){
        var box=btn.closest('.hn-kaiwa')||root;
        var hint=box.querySelector('.hn-shadow-hint');
        var lines=[].slice.call(box.querySelectorAll('.hn-line[data-tts]'));
        if(!lines.length)return;
        if(btn.classList.contains('on')){
          btn.classList.remove('on');btn.textContent='📖 Đọc theo';
          if(hint)hint.hidden=true;stopSpeak();return;
        }
        btn.classList.add('on');btn.textContent='⏹ Dừng đọc theo';
        if(hint){hint.hidden=false;hint.textContent='Nghe một câu, rồi đọc lại. Bấm “Câu tiếp” khi đã đọc xong.'}
        var i=0;
        function playOne(){
          if(!btn.classList.contains('on'))return;
          if(i>=lines.length){btn.classList.remove('on');btn.textContent='📖 Đọc theo';if(hint)hint.textContent='Đã hết hội thoại.';return}
          var ln=lines[i];
          document.querySelectorAll('.hn-line.reading').forEach(function(x){x.classList.remove('reading')});
          ln.classList.add('reading');
          if(hint)hint.innerHTML='Câu '+(i+1)+'/'+lines.length+': hãy nghe, rồi đọc lại. <button type="button" class="hn-tts solid hn-shadow-next">Câu tiếp ▶</button>';
          var nextBtn=hint&&hint.querySelector('.hn-shadow-next');
          if(nextBtn)nextBtn.onclick=function(){i++;playOne()};
          speak(ln.getAttribute('data-tts'), ln.getAttribute('data-tts-lang')||ttsLangFor(pageLang()), 0.8, function(){
            ln.classList.remove('reading');
          });
        }
        playOne();
      });
    });
  }

  /* ---- Load pack / lesson ---- */
  function normalizeLesson(L){
    var x=L||{};
    if(!Array.isArray(x.explain))x.explain=[];
    if(!Array.isArray(x.examples))x.examples=[];
    return x;
  }
  function normalizePack(pack){
    if(!pack)return pack;
    pack.lessons=(pack.lessons||[]).map(normalizeLesson);
    return pack;
  }
  function loadJson(url){
    return fetch(url,{cache:'no-cache'}).then(function(r){
      if(!r.ok)throw new Error('Không tải được '+url+' ('+r.status+')');
      return r.json();
    });
  }
  function packUrl(lang, file){
    return base()+'data/'+lang+'/'+file;
  }
  function indexUrl(lang){return packUrl(lang,'index.json')}

  async function loadIndex(lang){return loadJson(indexUrl(lang))}
  async function loadPackByLevel(lang, levelId, index){
    index=index||await loadIndex(lang);
    var lv=(index.levels||[]).find(function(x){return x.id===levelId});
    if(!lv||!lv.ready||!lv.pack)return null;
    return loadJson(packUrl(lang, lv.pack)).then(normalizePack);
  }
  async function loadPackForId(lang, id){
    var index=await loadIndex(lang);
    var levels=index.levels||[];
    // Try each ready pack until the id is found; prefer prefix hint
    var hint=levels.filter(function(lv){
      if(!lv.ready||!lv.pack)return false;
      var p=(lv.pack||'').replace(/\.json$/,'');
      return id.indexOf(lang+'-'+p+'-')===0||id.indexOf(lang+'-'+lv.id.toLowerCase()+'-')===0||id.indexOf(lang+'-'+String(lv.id).toLowerCase().replace(/\s+/g,'')+'-')===0;
    });
    var order=hint.concat(levels.filter(function(lv){return lv.ready&&lv.pack&&hint.indexOf(lv)<0}));
    for(var i=0;i<order.length;i++){
      var pack=await loadJson(packUrl(lang, order[i].pack));
      var list=pack.lessons||[];
      pack=normalizePack(pack);
      if((pack.lessons||[]).some(function(L){return L.id===id}))return pack;
    }
    throw new Error('Không tìm thấy bài '+id);
  }

  function runMain(){
    var m=document.getElementById('main');
    if(m){var s2=document.createElement('script');s2.textContent=m.textContent;document.body.appendChild(s2)}
  }

  async function bootLesson(){
    var lang=qs('lang'), id=qs('id');
    if(lang!=='en'&&lang!=='zh')return false;
    injectCss();if(lang==='zh')injectFonts();
    document.documentElement.classList.remove('locked');
    document.documentElement.setAttribute('data-hn-lang',lang);
    var back=document.querySelector('.hn-back');
    if(back){back.href=(lang==='en'?'en.html':'zh.html');back.textContent=lang==='en'?'← Khóa tiếng Anh':'← Khóa tiếng Trung'}
    try{
      var pack=await loadPackForId(lang, id);
      pack=normalizePack(pack);
      w.LESSONS=pack.lessons||[];
      runMain();
      try{document.querySelectorAll('.ttsbar').forEach(function(el){el.hidden=true;el.style.display='none'})}catch(e){}
      setTimeout(function(){bindTts(document.getElementById('m')||document);
        try{document.querySelectorAll('.ttsbar').forEach(function(el){el.hidden=true;el.style.display='none'})}catch(e2){}
      },0);
      try{dispatchEvent(new Event('unlocked'))}catch(e){}
    }catch(e){
      var box=document.getElementById('m');
      if(box)box.innerHTML='<section class="sec"><p>Không mở được bài này. <a href="'+(lang==='en'?'en.html':'zh.html')+'">Về khóa học</a>.</p></section>';
      document.documentElement.classList.remove('locked');
    }
    return true;
  }

  /* ---- Landing pages en.html / zh.html ---- */
  var CAT={
    'Ngữ pháp':{sub:'Grammar',subZh:'语法 · yǔfǎ',glyph:'Aa'},
    'Từ vựng':{sub:'Vocabulary',subZh:'词汇 · cíhuì',glyph:'V'},
    'Hội thoại':{sub:'Speaking',subZh:'会话 · huìhuà',glyph:'💬'},
    'Đọc hiểu':{sub:'Reading',subZh:'阅读 · yuèdú',glyph:'R'},
    'Chữ Hán':{sub:'Hànzì',subZh:'汉字 · hànzì',glyph:'汉'}
  };
  function catMeta(type, lang){
    var c=CAT[type]||{sub:type,subZh:type,glyph:'•'};
    return {title:type, sub:lang==='zh'?c.subZh:c.sub, glyph:c.glyph};
  }
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])})}

  async function renderLanding(lang){
    injectCss();if(lang==='zh')injectFonts();
    document.documentElement.setAttribute('data-hn-lang',lang);
    var root=document.getElementById('hnLangApp');
    if(!root)return;
    var index;
    try{index=await loadIndex(lang)}catch(e){
      root.innerHTML='<p class="lead">Chưa tải được mục lục khóa học. Kiểm tra mạng rồi tải lại trang nhé.</p>';
      return;
    }
    var levels=index.levels||[];
    var firstReady=levels.find(function(l){return l.ready})||null;
    var cur=firstReady?firstReady.id:(levels[0]&&levels[0].id);
    async function paint(levelId){
      cur=levelId;
      var lv=levels.find(function(l){return l.id===levelId})||levels[0];
      var pack=null;
      if(lv&&lv.ready&&lv.pack){
        try{pack=await loadPackByLevel(lang, lv.id, index)}catch(e){pack=null}
      }
      var lessons=pack&&pack.lessons||[];
      var first=lessons[0];
      var six=levels.length>5?' six':'';
      var lvBtns=levels.map(function(l,i){
        return '<button type="button" class="hn-lv'+(l.id===cur?' on':'')+'" data-i="'+i+'" data-id="'+esc(l.id)+'">'+
          '<span class="nm"><i></i>'+esc(l.name)+'</span>'+
          '<span class="sub">'+esc(l.sub||'')+'</span>'+
          '<span class="map">'+esc(l.map||'')+'</span></button>';
      }).join('');
      var desc='';
      if(lv&&lv.ready&&lessons.length){
        desc='<div class="hn-lvdesc">Cấp <strong>'+esc(lv.name)+'</strong> — '+esc(lv.desc||('Có '+lessons.length+' bài.'))+'</div>';
      }else{
        desc='<div class="hn-lvdesc">Cấp <strong>'+esc(lv&&lv.name||'')+'</strong> đang được biên soạn. Anh chọn cấp đã mở, hoặc quay lại sau nhé.</div>'+
          '<p class="hn-note">Các cấp chưa mở hiện khung “sắp có”, không ghi số bài giả.</p>';
      }
      var cont='';
      if(first){
        cont='<div class="hn-cont"><div><span class="lab">HỌC TIẾP</span> <span class="tag lv" style="background:var(--shu-soft,#faecea);color:var(--shu,#c73e2e);font-weight:800;font-size:13px;padding:2px 10px;border-radius:999px">'+esc(lv.name)+'</span></div>'+
          '<h2>'+(first.title||'')+'</h2>'+
          '<p>'+esc(first.type)+' · Bài mở đầu cấp này</p>'+
          '<a class="hn-btn" href="lesson.html?lang='+encodeURIComponent(lang)+'&id='+encodeURIComponent(first.id)+'">Mở bài ▶</a></div>';
      }else if(!firstReady){
        cont='<div class="hn-cont"><h2>Khóa này sắp có</h2><p>Phần tiếng '+(lang==='zh'?'Trung':'Anh')+' đang được biên soạn theo cùng lối học với khóa tiếng Nhật. Khi có bài, anh vào đây là học được ngay.</p></div>';
      }
      var cats={};
      lessons.forEach(function(L){
        var t=L.type||'Khác';
        (cats[t]=cats[t]||[]).push(L);
      });
      var order=['Ngữ pháp','Từ vựng','Hội thoại','Đọc hiểu','Chữ Hán'];
      var keys=order.filter(function(k){return cats[k]}).concat(Object.keys(cats).filter(function(k){return order.indexOf(k)<0}));
      var catHtml=keys.map(function(k){
        var meta=catMeta(k,lang);
        var items=cats[k].map(function(L,i){
          return '<li><a href="lesson.html?lang='+encodeURIComponent(lang)+'&id='+encodeURIComponent(L.id)+'"><span class="hn-num">'+(i+1)+'</span>'+(L.title||L.id)+'</a></li>';
        }).join('');
        return '<div class="hn-cat"><h3>'+esc(meta.title)+' <span>'+esc(meta.sub)+'</span></h3><ol>'+items+'</ol></div>';
      }).join('');
      if(!keys.length && lv){
        catHtml='<div class="hn-cat hn-soon"><h3>'+esc(lv.name)+' <span>sắp có</span></h3><p>Bài học cấp này chưa mở.</p></div>';
      }
      var map=index.mapTable||[];
      var mapHtml=map.length?('<table class="hn-map"><thead><tr>'+(map[0]||[]).map(function(h){return '<th>'+esc(h)+'</th>'}).join('')+'</tr></thead><tbody>'+
        map.slice(1).map(function(row){return '<tr>'+row.map(function(c){return '<td>'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+
        '</tbody></table>'+(index.mapNote?'<p class="hn-note">'+esc(index.mapNote)+'</p>':'')):'';

      root.innerHTML=
        '<section class="hn-lc">'+
          (index.hello?'<p class="ht-hello">'+index.hello+'</p>':'')+
          (index.line?'<p class="ht-line">'+index.line+'</p>':'')+
          (index.headline?'<h1>'+index.headline+'</h1>':'')+
          (index.lead?'<p class="lead">'+index.lead+'</p>':'')+
        '</section>'+cont+
        '<div class="block" id="khoahoc"><div class="block-h"><h2>'+esc(index.courseTitle||('Khóa '+(lang==='zh'?'tiếng Trung':'tiếng Anh')))+'</h2></div>'+
        (index.courseLead?'<p class="lead">'+index.courseLead+'</p>':'')+
        '<div class="hn-levels'+six+'">'+lvBtns+'</div>'+desc+
        '<div class="hn-cats">'+catHtml+'</div></div>'+
        (mapHtml?('<div class="block"><div class="block-h"><h2>Cấp độ so với tiếng Nhật</h2></div>'+mapHtml+'</div>'):'');

      root.querySelectorAll('.hn-lv').forEach(function(b){
        b.addEventListener('click',function(){paint(b.getAttribute('data-id'))});
      });
    }
    await paint(cur);
  }

  w.HNLang={pageLang:pageLang,isLangLesson:isLangLesson,injectBar:injectBar,bootLesson:bootLesson,renderLanding:renderLanding,bindTts:bindTts,speak:speak,stopSpeak:stopSpeak,loadIndex:loadIndex,loadPackForId:loadPackForId};

  function boot(){injectBar()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
})(window);
