// Lời khen dưới lời chào (mockup 29/10). Hồ sơ tùy chọn hn_dk_ho_so {nam,gt} chỉ lưu trên máy.
// Nhóm: nam/nu × tre(<30)/tn(30–54)/lt(55+); trung tính (không điền / Không muốn nói) chỉ khen nỗ lực.
const KHEN=(()=>{
const CHUNG=[
'Bạn kiên trì thật đáng nể, mỗi ngày một chút là tiến bộ rõ rệt.',
'Việc bạn quay lại học hôm nay đã là một thành công rồi.',
'Sự chăm chỉ của bạn chắc chắn sẽ được đền đáp.',
'Bạn đang đi đúng hướng, cứ giữ nhịp này nhé.',
'Mỗi bài bạn học là một viên gạch vững chắc cho tương lai.',
'Bạn học đều đặn như vậy thật đáng khâm phục.',
'Cảm ơn bạn đã dành thời gian cho tiếng Nhật hôm nay.',
'Bạn tiến bộ hơn hôm qua, thế là tuyệt vời rồi.',
'Sự nghiêm túc của bạn trong học tập thật đáng quý.',
'Bạn đã vượt qua nhiều bài khó, hôm nay cũng sẽ làm được.',
'Tinh thần học hỏi của bạn thật đáng trân trọng.',
'Bạn không bỏ cuộc — đó là điều quan trọng nhất.',
'Từng chữ kanji bạn nhớ được đều là công sức của bạn.',
'Bạn đang xây nền tảng tiếng Nhật thật chắc chắn.',
'Sự đều đặn của bạn chính là bí quyết thành công.',
'Bạn đã cố gắng rất nhiều, hãy tự hào về bản thân nhé.',
'Mỗi lần bạn ôn bài là trí nhớ lại vững thêm một chút.',
'Bạn học với tinh thần rất tích cực, thật tuyệt.',
'Chỉ cần bạn tiếp tục, mục tiêu sẽ ngày càng gần.',
'Bạn đã chọn học thay vì để mai — thật đáng khen.',
'Sự tập trung của bạn hôm nay chắc chắn sẽ có kết quả.',
'Bạn đã đi được một chặng đường đáng kể rồi đấy.',
'Cách bạn kiên nhẫn với ngữ pháp thật đáng học hỏi.',
'Bạn luôn giữ được động lực, điều đó không hề dễ.',
'Hôm nay bạn lại thêm một bước gần hơn tới JLPT.',
'Bạn chăm chỉ luyện nghe, tai bạn sẽ ngày càng nhạy.',
'Sự cố gắng âm thầm của bạn rất đáng ghi nhận.',
'Bạn học không vội vàng mà chắc chắn, thật hay.',
'Mỗi câu bạn đọc to là một lần tự tin thêm.',
'Bạn đã dành thời gian quý giá cho việc học — cảm ơn bạn.'];
const RIENG={
nu_tre:['Hôm nay trông bạn rạng rỡ quá!','Nụ cười của bạn hôm nay thật tươi tắn.','Bạn trẻ trung và đầy năng lượng, học gì cũng nhanh.','Sự nhiệt huyết tuổi trẻ của bạn thật đáng quý.','Bạn đang đầu tư cho tương lai thật thông minh.','Bạn học giỏi lại chăm chỉ, thật đáng ngưỡng mộ.'],
nu_tn:['Hôm nay trông bạn thật tươi tắn!','Bạn vừa lo công việc vừa học, thật đáng khâm phục.','Sự chín chắn của bạn giúp việc học rất hiệu quả.','Bạn là tấm gương học tập cho cả gia đình.','Bạn sắp xếp thời gian thật khéo léo.','Bạn duyên dáng và kiên trì, thật đáng quý.'],
nu_lt:['Hôm nay trông bạn thật hiền hậu và tươi tắn!','Tinh thần học hỏi của bạn thật đáng kính trọng.','Bạn học tiếng Nhật ở tuổi này thật đáng ngưỡng mộ.','Sự điềm đạm của bạn giúp bài học thêm sâu sắc.','Bạn là nguồn cảm hứng cho con cháu và mọi người.','Kinh nghiệm sống giúp bạn hiểu bài thật thấu đáo.'],
nam_tre:['Hôm nay bạn trông thật phong độ!','Bạn trẻ trung và đầy năng lượng, học gì cũng nhanh.','Sự nhiệt huyết tuổi trẻ của bạn thật đáng quý.','Bạn đang đầu tư cho tương lai thật thông minh.','Hôm nay trông bạn rất tự tin!','Bạn học giỏi lại chăm chỉ, thật đáng ngưỡng mộ.'],
nam_tn:['Hôm nay bạn trông thật phong độ!','Bạn vừa lo công việc vừa học, thật đáng khâm phục.','Sự chín chắn của bạn giúp việc học rất hiệu quả.','Bạn là tấm gương học tập cho cả gia đình.','Bạn sắp xếp thời gian thật khéo léo.','Trông bạn hôm nay thật chững chạc và tự tin!'],
nam_lt:['Hôm nay trông bạn thật khỏe khoắn và phong độ!','Tinh thần học hỏi của bạn thật đáng kính trọng.','Bạn học tiếng Nhật ở tuổi này thật đáng ngưỡng mộ.','Sự điềm đạm của bạn giúp bài học thêm sâu sắc.','Bạn là nguồn cảm hứng cho con cháu và mọi người.','Kinh nghiệm sống giúp bạn hiểu bài thật thấu đáo.']};
const NHOM={trung_tinh:CHUNG};for(const k in RIENG)NHOM[k]=RIENG[k].concat(CHUNG);
const g=k=>{try{return localStorage.getItem(k)}catch(e){return null}},s=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
function hoSo(){try{return JSON.parse(g('hn_dk_ho_so')||'null')||{}}catch(e){return {}}}
function nhom(h){h=h||hoSo();const gt=h.gt,y=+h.nam;if(gt!=='nam'&&gt!=='nu')return 'trung_tinh';
 const tuoi=y?new Date().getFullYear()-y:null;const t=tuoi==null?'tn':(tuoi<30?'tre':(tuoi<55?'tn':'lt'));return gt+'_'+t}
let pick=null;
function cau(){const k=nhom();if(pick&&pick[0]===k)return pick[1];const L=NHOM[k],K='hn_dk_khen_last';let last=-1;
 try{const v=JSON.parse(g(K)||'null');if(v&&v.k===k)last=v.i}catch(e){}
 let i=Math.floor(Math.random()*L.length);if(L.length>1&&i===last)i=(i+1+Math.floor(Math.random()*(L.length-1)))%L.length;
 s(K,JSON.stringify({k,i}));pick=[k,L[i]];return L[i]}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function show(el){if(!el)return;el.innerHTML='<p class="dk-khen">💐 '+esc(cau())+'</p><button type="button" class="dk-link" data-hs>Hồ sơ của bạn (không bắt buộc)</button>';el.querySelector('[data-hs]').onclick=()=>form(el)}
function form(el){const h=hoSo(),y=new Date().getFullYear();let o='<option value="">— Không chọn —</option>';for(let n=y-12;n>=y-90;n--)o+='<option value="'+n+'"'+(+h.nam===n?' selected':'')+'>'+n+'</option>';
 const r=(v,t)=>'<label class="dk-radio"><input type="radio" name="dkgt" value="'+v+'"'+(h.gt===v?' checked':'')+'> '+t+'</label>';
 el.innerHTML='<section class="dk-card dk-hs" aria-labelledby="dkHsH"><h2 id="dkHsH">Hồ sơ của bạn</h2><p class="dk-priv">🔒 Không bắt buộc. Chỉ lưu trên máy này, dùng để chọn lời khen phù hợp.</p>'+
 '<label class="dk-lab" for="dkNam">Năm sinh</label><select id="dkNam" class="dk-sel">'+o+'</select>'+
 '<fieldset class="dk-fs"><legend class="dk-lab">Giới tính</legend>'+r('nam','Nam')+r('nu','Nữ')+r('kmn','Không muốn nói')+'</fieldset>'+
 '<button type="button" class="dk-btn big" data-sv>Lưu hồ sơ</button><button type="button" class="dk-btn ghost big" data-del>Xóa thông tin này</button><button type="button" class="dk-btn ghost" data-cl>Đóng, không thay đổi</button></section>';
 el.querySelector('[data-sv]').onclick=()=>{const c=el.querySelector('input[name=dkgt]:checked');const v={};const n=el.querySelector('#dkNam').value;if(n)v.nam=+n;if(c)v.gt=c.value;s('hn_dk_ho_so',JSON.stringify(v));pick=null;show(el);typeof DK!='undefined'&&DK.toast('Đã lưu trên máy này. Cảm ơn bạn!')};
 el.querySelector('[data-del]').onclick=()=>{try{localStorage.removeItem('hn_dk_ho_so')}catch(e){}pick=null;show(el);typeof DK!='undefined'&&DK.toast('Đã xóa thông tin hồ sơ khỏi máy này.')};
 el.querySelector('[data-cl]').onclick=()=>show(el)}
return {NHOM,nhom,cau,show,form}})();
