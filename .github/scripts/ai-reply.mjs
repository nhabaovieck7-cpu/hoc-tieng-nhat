// Đọc bình luận mới từ sự kiện GitHub, hỏi Gemini, rồi trả lời ngay dưới bình luận đó.
import fs from 'node:fs';
const ev=JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH,'utf8'));
const {GEMINI_API_KEY:KEY,GITHUB_TOKEN:GH}=process.env;const MODEL=process.env.GEMINI_MODEL||'gemini-2.5-flash';
if(!KEY){console.log('Chưa có secret GEMINI_API_KEY – bỏ qua.');process.exit(0)}
const c=ev.comment,d=ev.discussion;const body=(c.body||'').trim();
if(!body||body.length<4||/🤖 AI trả lời/.test(body)){console.log('Bỏ qua.');process.exit(0)}
const gql=async(query,variables)=>{const r=await fetch('https://api.github.com/graphql',{method:'POST',headers:{Authorization:'bearer '+GH,'Content-Type':'application/json'},body:JSON.stringify({query,variables})});const j=await r.json();if(j.errors)throw new Error(JSON.stringify(j.errors));return j.data};
// trả lời vào luồng: nếu bình luận là một trả lời thì gắn vào bình luận gốc
const info=await gql('query($id:ID!){node(id:$id){... on DiscussionComment{id replyTo{id} }}}',{id:c.node_id});
const threadId=info.node.replyTo?info.node.replyTo.id:c.node_id;
const sys='Bạn là trợ lý trả lời bình luận dưới bài học tiếng Nhật cho người Việt (trình độ N2–N1, nhiều người làm kaigo). Trả lời NGẮN (tối đa 120 từ) bằng tiếng Việt, thân thiện, chính xác; kèm 1 ví dụ tiếng Nhật có furigana trong ngoặc và dịch nếu hữu ích. Nếu bình luận không phải câu hỏi (chỉ cảm ơn, chào…) thì trả lời đúng một từ: SKIP. Không bịa; nếu không chắc hãy nói không chắc.';
const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
 body:JSON.stringify({systemInstruction:{parts:[{text:sys}]},contents:[{role:'user',parts:[{text:'Bài học (mã): '+d.title+'\n\nBình luận: '+body.slice(0,2000)}]}],generationConfig:{temperature:0.4,maxOutputTokens:600}})});
const j=await r.json();if(!r.ok){console.error('Gemini lỗi',r.status);process.exit(0)}
const reply=((j.candidates||[])[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();
if(!reply||/^SKIP\b/i.test(reply)){console.log('Không cần trả lời.');process.exit(0)}
await gql('mutation($d:ID!,$r:ID!,$b:String!){addDiscussionComment(input:{discussionId:$d,replyToId:$r,body:$b}){comment{id}}}',{d:d.node_id,r:threadId,b:'🤖 **AI trả lời**\n\n'+reply+'\n\n<sub>AI có thể sai – hãy kiểm tra lại với bài học.</sub>'});
console.log('Đã trả lời.');
