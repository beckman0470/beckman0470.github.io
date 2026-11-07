/* Visual choices retain their original click handlers and spoken meanings. */
(()=>{
'use strict';
const symbols={
 '大':['●','large'],'小':['●','small'],'高':['▮','tall'],'低':['▮','short-height'],
 '長':['━','long'],'短':['━','short'],'快':['🐇',''],'慢':['🐢',''],
 '上':['↑',''],'下':['↓',''],'左':['←',''],'右':['→',''],
 '多':['● ● ● ●','many'],'少':['●','few'],'開':['◯ /',''],'關':['◯ —',''],
 '○':['○','yes'],'×':['×','no'],
 '手臂':['💪',''],'肚肚':['◎',''],'腿':['🦵',''],'背':['👤 ↶',''],
 '咚':['●','drum1'],'啪':['●','drum2'],'叮':['●','drum3'],'砰':['●','drum4']
};
const scenes=[
 [/雙手洗乾淨/,'👐 💧'],[/坐到餐桌/,'🪑'],[/開心吃早餐/,'🥪'],[/碗筷收好|吃完的碗收好/,'🥣 → 🗄️'],
 [/東西放進書包/,'📚 → 🎒'],[/換好外出/,'👕'],[/穿上鞋/,'👟'],[/書包出門/,'🎒 → 🚪'],
 [/食碗洗乾淨/,'🥣 💧'],[/點心放進碗/,'🐟 → 🥣'],[/右右慢慢吃/,'🐈 🥣'],
 [/走到公園/,'🚶 🌳'],[/排隊等溜滑梯/,'🧒 🧒 🛝'],[/滑下來/,'🛝 ↓'],[/公園說再見/,'👋 🏠'],
 [/準備好白紙和畫筆/,'📄 ✏️'],[/畫出喜歡的貓咪/,'✏️ 🐈'],[/塗上顏色/,'🖍️ 🐈'],[/畫筆收回盒子/,'✏️ → 📦'],
 [/準備溫水/,'🪣 💧'],[/沖濕/,'🚿 💧'],[/沖掉身上泡泡/,'🫧 → 🚿'],[/搓出洗澡泡泡/,'👐 🫧'],[/毛巾擦乾/,'🧻'],[/乾淨衣服/,'👕'],
 [/吃早餐/,'🥪'],[/去公園/,'🌳'],[/吃午餐/,'🍱'],[/畫一張圖/,'🎨'],[/收好畫筆/,'🖍️ → 📦'],[/讀故事書/,'📖'],[/起床/,'🛏️ ☀️'],[/到學校/,'🏫'],[/回到家/,'🏠'],[/整理玩具/,'🧸 → 📦'],[/吃點心/,'🍪'],[/吃晚餐/,'🍚'],[/陪貓咪玩/,'🐈 🪶'],[/準備睡覺/,'🛏️ 🌙']
];
function describe(label){
 const clean=label.replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u200D\uFE0F\uFE0E\u20E3]/gu,'').replace(/^\s*[✓✕]\s*/,'').trim();
 if(label.trim()==='○')return '對，按圈';
 if(label.trim()==='×')return '不對，按叉';
 return clean||label;
}
function visualFor(label){
 if(symbols[label])return symbols[label];
 const part=label.replace(/[✨🫧]/gu,'').replace('洗洗','').trim();
 if(['手臂','肚肚','腿','背'].includes(part))return symbols[part];
 for(const [test,art] of scenes)if(test.test(label))return[art,'scene'];
 const emoji=label.match(/(?:\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)?)/gu);
 if(emoji?.length)return[emoji.join(' '),''];
 return null;
}
function decorate(node){
 if(node.hidden||node.querySelector('img,svg')||!node.textContent.trim())return;
 if(node.dataset.pictureRendered===node.textContent)return;
 const original=node.textContent.trim(),art=visualFor(original);
 if(!art)return;
 const spoken=describe(original),time=original.match(/\b\d{1,2}:\d{2}\b/)?.[0];
 node.dataset.speechLabel=spoken;node.setAttribute('aria-label',spoken);
 const picture=document.createElement('span');picture.className='kg-choice-symbol '+art[1];picture.setAttribute('aria-hidden','true');picture.textContent=art[0];
 const label=document.createElement('span');label.className='kg-sr-only';label.textContent=spoken;
 node.replaceChildren(picture,label);
 if(time){const clock=document.createElement('span');clock.className='kg-choice-time';clock.setAttribute('aria-hidden','true');clock.textContent=time;node.prepend(clock);}
 node.classList.add('kg-picture-choice');node.dataset.pictureRendered=node.textContent;
}
let queued=false;
function refresh(){queued=false;document.querySelectorAll('.mg-stage .mg-choice,.fg-list-buttons button,.sp-story-piece,.fg-slot,.fg-grocery-item,.mg-beat,.mg-stage .fg-hero-word').forEach(decorate);}
function queue(){if(queued)return;queued=true;queueMicrotask(refresh);}
const root=document.querySelector('main');if(root)new MutationObserver(queue).observe(root,{childList:true,subtree:true,characterData:true});
refresh();
})();
