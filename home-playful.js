/* ChickenDad homepage interactions: no tracking or external dependencies. */
(() => {
'use strict';
if (document.querySelector('[data-cdj-playful]')) return;
const style=document.createElement('style');
style.textContent=`
.cdj-playful{--p-green:#47684e;--p-cream:#fbf5e7;--p-border:#d9ddcc}
.cdj-playful button{font:inherit;cursor:pointer}
.cdj-playful a:focus-visible,.cdj-playful button:focus-visible{outline:3px solid #c47b36;outline-offset:4px}
.cdj-welcome{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin:20px 0 8px}
.cdj-welcome a{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:999px;background:#4b6d51;color:white;font-weight:700;text-decoration:none}
.cdj-welcome small{color:#6d7565;font-size:14px}
.cdj-hello{width:100%;background:#fffaf0;border:1px solid #d6dac8;border-radius:14px;color:#47684e;padding:11px 8px;min-height:46px;margin:12px 0 0;font-weight:700}
.cdj-speech{background:#f6efdf;color:#4b5645;border-radius:14px;padding:14px;margin:10px 0 0;line-height:1.7;font-size:15px;box-shadow:0 3px 12px #443d2110}
.cdj-cat-note{color:#65705c;text-align:center;font-size:14px;margin:18px 0}
.cdj-cat-slot{position:relative}
.cdj-hidden-cat{position:absolute;right:10px;bottom:10px;z-index:2;width:60px;height:60px;border:2px solid #fff5db;border-radius:50%;padding:4px;background:#f5e4c2;box-shadow:0 3px 12px #0002;transition:transform .2s}
.cdj-hidden-cat:hover{transform:rotate(-10deg) scale(1.08)}
.cdj-hidden-cat svg{width:100%;height:100%;display:block}
.cdj-cat-result{max-width:720px;margin:24px auto;padding:24px;border:1px solid #d4dbc4;border-radius:22px;background:#f5f5e9;color:#46573c;text-align:center}
.cdj-cat-result p{margin:8px 0 16px;line-height:1.8}
.cdj-again{border:1px solid #acbc99;border-radius:999px;padding:10px 20px;color:#435e3c;background:white;min-height:44px}
.cdj-play-banner{display:flex;align-items:center;justify-content:space-between;gap:24px;background:linear-gradient(120deg,#eff2df,#faf0dc);border:1px solid #dfe0c8;padding:30px;border-radius:24px;margin:30px 0}
.cdj-play-banner h2{font-size:26px;margin:0 0 8px;color:#485d42}
.cdj-play-banner p{margin:0;line-height:1.8;color:#69715f}
.cdj-play-link{display:inline-block;white-space:nowrap;background:#4b6d51;color:white!important;border-radius:999px;padding:14px 24px;text-decoration:none;font-weight:700}
.cdj-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:20;padding:12px 22px;border-radius:999px;box-shadow:0 5px 25px #0002;background:#435e48;color:white;max-width:calc(100% - 32px);text-align:center;pointer-events:none}
.cdj-motion .feature-card,.cdj-motion .family-card{transition:transform .22s,box-shadow .22s}
@media(hover:hover){.cdj-motion .feature-card:hover,.cdj-motion .family-card:hover{transform:translateY(-5px);box-shadow:0 12px 28px #43533418}}
.cdj-motion .feature-card:focus-within,.cdj-motion .family-card:focus-within{box-shadow:0 0 0 2px #9caa89}
@media(max-width:650px){.cdj-play-banner{flex-direction:column;align-items:flex-start;padding:22px}.cdj-play-link{width:100%;text-align:center}.cdj-toast{font-size:14px;bottom:16px}.cdj-welcome small{display:block}}
@media(prefers-reduced-motion:reduce){.cdj-motion *{transition:none!important;animation:none!important}}
`;
document.head.append(style);
document.body.classList.add('cdj-playful','cdj-motion');
const marker=document.createElement('span');marker.dataset.cdjPlayful='true';marker.hidden=true;document.body.append(marker);
const welcome=document.createElement('div');welcome.className='cdj-welcome';
welcome.innerHTML='<a href="/play/">一起去互動樂園 →</a><small>今天，來雞爸爸家玩一下。</small>';
document.querySelector('.hero-copy')?.append(welcome);
const family=[
['雞爸爸','今天想研究什麼？先讀個故事，還是陪孩子玩一下？'],
['鼠媽媽','歡迎來我們家！玩完記得把玩具收好喔。'],
['鼠姊姊','來和我找注音朋友，還有 ABC！'],
['龍弟弟','貓咪呢？貓咪躲起來了！'],
['兔阿嬤','來啦，慢慢看，慢慢玩。']
];
document.querySelectorAll('.family-card').forEach((card,i)=>{
const info=family[i];if(!info)return;
const button=document.createElement('button');button.type='button';button.className='cdj-hello';button.textContent='和'+info[0]+'打招呼';
const speech=document.createElement('p');speech.id='cdj-greeting-'+i;speech.className='cdj-speech';speech.hidden=true;speech.setAttribute('role','status');speech.textContent=info[0]+'：「'+info[1]+'」';
button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',speech.id);
button.addEventListener('click',()=>{speech.hidden=!speech.hidden;button.setAttribute('aria-expanded',String(!speech.hidden));button.textContent=speech.hidden?'和'+info[0]+'打招呼':'收起對話 ↑';});
(card.querySelector('.family-body')||card).append(button,speech);
});
const banner=document.createElement('section');banner.className='cdj-play-banner';banner.setAttribute('aria-label','親子互動樂園');
banner.innerHTML='<div><h2>故事讀累了？換你玩一下！</h2><p>和鼠姊姊學 ㄅㄆㄇ、ABC，陪龍弟弟找貓咪、敲節奏。</p></div><a class="cdj-play-link" href="/play/">進入互動樂園 →</a>';
document.querySelector('.family-section')?.after(banner);
const slots=Array.from(document.querySelectorAll('.feature-image-link'));
if(!slots.length)return;
const note=document.createElement('p');note.className='cdj-cat-note';note.textContent='🐾 雅虎又躲起來了……看看哪張圖片旁邊有貓咪？';
slots[0].closest('.section')?.querySelector('.section-title-row')?.after(note);
const cat=document.createElement('button');cat.type='button';cat.className='cdj-hidden-cat';cat.setAttribute('aria-label','找到躲起來的雅虎，點一下');
cat.innerHTML='<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M20 38 15 5 40 22Q50 17 60 22L85 5 80 38Q95 85 50 85Q5 85 20 38" fill="#393d40"/><path d="m50 22-15 37h30z" fill="#fff8ec"/><ellipse cx="50" cy="65" rx="22" ry="18" fill="#fff8ec"/><path d="M27 47q6-8 12 0m22 0q6-8 12 0" stroke="#e8dcae" stroke-width="3" fill="none"/><path d="m45 61 5 5 5-5" fill="#d89b9b"/><path d="M50 66v6m-8 0q8 7 16 0" fill="none" stroke="#444" stroke-width="2"/></svg>';
const result=document.createElement('div');result.className='cdj-cat-result';result.hidden=true;
result.innerHTML='<strong>找到雅虎了！🐾</strong><p role="status">雅虎：「你找到我了！還要陪我玩嗎？」</p><button type="button" class="cdj-again">再躲一次 ↻</button> <a href="/play/">去樂園找更多貓咪 →</a>';
banner.before(result);
let previous=-1;
function hideCat(){
const choices=slots.filter((_,i)=>i!==previous);const target=choices[Math.floor(Math.random()*choices.length)]||slots[0];previous=slots.indexOf(target);
slots.forEach(s=>s.parentElement.classList.remove('cdj-cat-slot'));
target.parentElement.classList.add('cdj-cat-slot');
// Keep the cat outside the article anchor so a tap never also navigates.
target.parentElement.append(cat);cat.hidden=false;result.hidden=true;
note.textContent='🐾 雅虎又躲起來了……看看哪張圖片旁邊有貓咪？';
}
cat.addEventListener('click',()=>{
cat.hidden=true;result.hidden=false;note.textContent='🐾 找到雅虎了！到下方看看牠說了什麼。';
const toast=document.createElement('div');toast.className='cdj-toast';toast.setAttribute('role','status');toast.textContent='喵～你找到雅虎了！';document.body.append(toast);setTimeout(()=>toast.remove(),3500);
result.querySelector('button').focus({preventScroll:true});
result.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
result.querySelector('button').addEventListener('click',()=>{hideCat();cat.focus({preventScroll:true});cat.scrollIntoView({block:'center',behavior:'instant'});});
hideCat();
})();
