// Cloudflare Worker: proxy an toàn từ trang web tới Gemini (gói miễn phí).
// - Khoá GEMINI_API_KEY chỉ nằm trong Worker (secret), không bao giờ ở trình duyệt.
// - Chỉ nhận yêu cầu từ ALLOWED_ORIGIN và có X-Access đúng (băm từ mã khoá trang) -> người không có mã khoá không dùng được.
// - Giới hạn số câu/ngày theo IP (cần KV "RL"; không có KV thì chỉ giới hạn phía trình duyệt).
const SYS={
 hoi:'Bạn là giáo viên tiếng Nhật cho người Việt (trình độ N2–N1, có học viên làm kaigo). Trả lời NGẮN GỌN bằng tiếng Việt, rõ ràng, chính xác. Khi đưa câu tiếng Nhật hãy kèm bản dịch tiếng Việt; có thể ghi furigana dạng {漢字|かんじ}. Dùng **đậm** cho ý chính. Nếu không chắc, nói rõ là không chắc. Chỉ trả lời về tiếng Nhật, JLPT, văn hoá/công việc ở Nhật.',
 chua:'Bạn là giáo viên tiếng Nhật cho người Việt. Học viên gửi một câu tiếng Nhật. Hãy: (1) nói câu đúng hay sai, (2) chỉ ra lỗi cụ thể bằng tiếng Việt (ngữ pháp, trợ từ, kính ngữ, tự nhiên hay không), (3) đưa câu sửa ✅ kèm nghĩa tiếng Việt. Ngắn gọn, dùng ❌ / ✅.',
 dich:'Bạn là giáo viên chấm bài dịch Nhật→Việt. Có câu gốc, bản dịch mẫu và bản dịch của học viên. Chấm điểm trên 10 (dạng "**8/10**"), nhận xét ngắn bằng tiếng Việt: đúng ý chính chưa, từ nào dịch sai/thiếu, gợi ý cách dịch tự nhiên hơn. Tối đa 4 câu.',
 binhluan:'Bạn là trợ lý trả lời bình luận dưới bài học tiếng Nhật cho người Việt. Trả lời ngắn bằng tiếng Việt, thân thiện, chính xác; kèm ví dụ tiếng Nhật có dịch nếu cần.'};
const J=(o,s,h)=>new Response(JSON.stringify(o),{status:s||200,headers:Object.assign({'Content-Type':'application/json; charset=utf-8'},h)});
export default {async fetch(req,env){
 const origin=req.headers.get('Origin')||'';const allow=(env.ALLOWED_ORIGIN||'').split(',').map(s=>s.trim()).filter(Boolean);
 const ok=allow.includes(origin);const cors={'Access-Control-Allow-Origin':ok?origin:allow[0]||'','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, X-Access','Vary':'Origin'};
 if(req.method=='OPTIONS')return new Response(null,{status:204,headers:cors});
 if(req.method!='POST')return J({error:'Chỉ nhận POST'},405,cors);
 if(!ok)return J({error:'Không được phép (origin)'},403,cors);
 if(env.ACCESS_TOKEN&&req.headers.get('X-Access')!==env.ACCESS_TOKEN)return J({error:'Mã truy cập AI không đúng – hãy mở khoá lại trang.'},401,cors);
 let b;try{b=await req.json()}catch(e){return J({error:'Dữ liệu không hợp lệ'},400,cors)}
 const mode=SYS[b.mode]?b.mode:'hoi',text=String(b.text||'').slice(0,2000),ctx=String(b.ctx||'').slice(0,3000);if(!text.trim())return J({error:'Câu hỏi trống'},400,cors);
 const LIM=+(env.DAILY_LIMIT||30);
 if(env.RL){const ip=req.headers.get('CF-Connecting-IP')||'x',k='rl:'+new Date().toISOString().slice(0,10)+':'+ip;const n=+(await env.RL.get(k)||0);if(n>=LIM)return J({error:'Hôm nay đã dùng hết '+LIM+' câu hỏi AI.'},429,cors);await env.RL.put(k,String(n+1),{expirationTtl:90000})}
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},
  body:JSON.stringify({systemInstruction:{parts:[{text:SYS[mode]}]},contents:[{role:'user',parts:[{text:(ctx?ctx+'\n\n':'')+(mode=='dich'?'Bản dịch của học viên: ':'')+text}]}],generationConfig:{temperature:0.4,maxOutputTokens:900}})});
 const j=await r.json().catch(()=>({}));
 if(!r.ok)return J({error:r.status==429?'AI đang quá tải (giới hạn gói miễn phí), thử lại sau.':'Lỗi AI ('+r.status+')'},502,cors);
 const reply=((j.candidates||[])[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();
 return J({reply:reply||'(AI không trả lời được câu này)'},200,cors)}};
