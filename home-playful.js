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

/* Two resident cats: Yahoo wanders; Youyou prefers a nap. */
const catStyle=document.createElement('style');
catStyle.textContent=`
.cdj-cat-world{position:fixed;inset:0;pointer-events:none;z-index:30;overflow:hidden}
.cdj-resident{position:absolute;top:0;left:0;width:152px;height:126px;pointer-events:auto;border:0;background:none!important;padding:0;cursor:pointer;isolation:isolate;transition:left 6s linear,top 1s ease;filter:drop-shadow(0 4px 3px #51391d20)}
.cdj-resident svg{display:block;width:100%;height:100%;overflow:visible}
.cdj-resident .cat-art{width:100%;height:100%;transform-origin:center;transition:transform .3s}
.cdj-resident.facing-left .cat-art{transform:scaleX(-1)}
.cdj-resident .cat-tail{transform-origin:45px 92px;animation:cdj-tail 2.4s ease-in-out infinite}
.cdj-resident.walk .cat-leg-a{transform-origin:center;animation:cdj-step .55s ease-in-out infinite alternate}
.cdj-resident.walk .cat-leg-b{transform-origin:center;animation:cdj-step .55s ease-in-out infinite alternate-reverse}
.cdj-resident.walk .cat-torso{animation:cdj-bob .55s ease-in-out infinite}
.cdj-resident .eyes-closed,.cdj-resident .cat-zzz{display:none}
.cdj-resident.sleep .eyes-open{display:none}
.cdj-resident.sleep .eyes-closed,.cdj-resident.sleep .cat-zzz{display:block}
.cdj-resident.sleep .cat-torso{transform-origin:90px 115px;animation:cdj-breathe 3.5s ease-in-out infinite}
.cdj-resident.sleep .cat-leg-a,.cdj-resident.sleep .cat-leg-b{opacity:0}
.cdj-resident.sleep .cat-head{transform:translate(-6px,22px) rotate(8deg);transform-origin:136px 65px}
.cdj-resident.sleep .cat-tail{animation:none;transform:rotate(-18deg)}
.cdj-resident .cat-zzz{font:bold 19px system-ui;fill:#67785c;animation:cdj-zzz 3s ease-out infinite}
.cdj-resident.peek{height:66px;overflow:hidden;transition:left .6s,top .6s}
.cdj-resident.peek .cat-art{height:126px;transform:translateY(-13px)}
.cdj-resident.peek.facing-left .cat-art{transform:translateY(-13px) scaleX(-1)}
.cdj-resident.peek .cat-torso{transform:translate(-35px,14px)}
.cdj-resident.peek .cat-head{transform:translate(-35px,0)}
.cdj-resident.peek .cat-tail,.cdj-resident.peek .cat-leg-a,.cdj-resident.peek .cat-leg-b{visibility:hidden}
.cdj-cat-bubble{position:fixed;z-index:32;pointer-events:none;max-width:240px;padding:10px 16px;border-radius:18px;background:#fffaf0;border:1px solid #dfd8c1;box-shadow:0 4px 20px #0001;font-size:14px;color:#495a40}
.cdj-cat-toggle{position:fixed;bottom:12px;left:12px;pointer-events:auto;z-index:31;border:1px solid #ded9c7;border-radius:999px;padding:8px 13px;background:#fffaf0ed;color:#59664d;font:13px system-ui;cursor:pointer;min-height:40px}
.cdj-cat-world.paused *{animation-play-state:paused!important;transition:none!important}
@keyframes cdj-step{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
@keyframes cdj-bob{50%{transform:translateY(-2px)}}
@keyframes cdj-tail{50%{transform:rotate(15deg)}}
@keyframes cdj-breathe{50%{transform:scaleY(.97)}}
@keyframes cdj-zzz{0%{opacity:0;transform:translateY(6px)}40%{opacity:1}100%{opacity:0;transform:translateY(-12px)}}
@media(max-width:600px){.cdj-resident{width:112px;height:96px}.cdj-resident.peek{height:49px}.cdj-resident.peek .cat-art{height:96px}.cdj-cat-toggle{font-size:12px;bottom:8px;left:8px}}
@media(prefers-reduced-motion:reduce){.cdj-resident,.cdj-resident *{animation:none!important;transition:none!important}}
`;
document.head.append(catStyle);
const world=document.createElement('div');world.className='cdj-cat-world';world.setAttribute('aria-label','雅虎與右右的網站小日常');document.body.append(world);
const toggle=document.createElement('button');toggle.type='button';toggle.className='cdj-cat-toggle';world.append(toggle);
let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let bubbleTimer;const residents=[];
function catDrawing(orange){
const fur=orange?'#dda15d':'#333b40',stripe=orange?'#b7743e':'#333b40',belly=orange?'#efc48a':'#fff9ed';
return '<svg viewBox="0 0 180 140" aria-hidden="true"><g class="cat-torso"><path class="cat-tail" d="M49 96Q9 101 20 62Q27 43 38 55" fill="none" stroke="'+fur+'" stroke-width="15" stroke-linecap="round"/><path class="cat-leg-a" d="M58 101v26h17" stroke="'+fur+'" stroke-width="12" stroke-linecap="round" fill="none"/><path class="cat-leg-b" d="M103 101v26h17" stroke="'+fur+'" stroke-width="12" stroke-linecap="round" fill="none"/><ellipse cx="83" cy="94" rx="'+(orange?'53':'45')+'" ry="'+(orange?'34':'27')+'" fill="'+fur+'"/><ellipse cx="103" cy="103" rx="25" ry="18" fill="'+belly+'"/>'+(orange?'<path d="m65 67 5 15m12-18 4 15m14-12 3 13" stroke="'+stripe+'" stroke-width="5" stroke-linecap="round"/>':'')+'</g><g class="cat-head"><path d="M113 50 112 22 133 36Q142 33 151 38L170 25 167 58Q178 95 143 98Q107 96 110 66Z" fill="'+fur+'"/><path d="m118 44-1-13 11 9m28 5 10-11-2 15" fill="#e8b0a1"/>'+(!orange?'<path d="m141 37-12 38h27Z" fill="#fff9ed"/><ellipse cx="144" cy="80" rx="22" ry="15" fill="#fff9ed"/>':'<path d="m136 39 4 12m7-12-2 12" stroke="'+stripe+'" stroke-width="4" stroke-linecap="round"/>')+'<g class="eyes-open"><ellipse cx="127" cy="63" rx="6" ry="7" fill="#bad18c"/><ellipse cx="157" cy="63" rx="6" ry="7" fill="#bad18c"/><path d="M128 60v6m28-6v6" stroke="#263936" stroke-width="3" stroke-linecap="round"/></g><g class="eyes-closed" stroke="#4c443c" stroke-width="3" stroke-linecap="round" fill="none"><path d="m121 65q6 5 12 0m18 0q6 5 12 0"/></g><path d="m138 76 6 4 6-4" fill="#c68582"/><path d="M144 80v5m-7 0q7 7 14 0" stroke="#514943" stroke-width="2" fill="none"/><path d="m113 78 18 3m-19 6 18-1m25-5 19-3m-19 8 19 1" stroke="#b9ac93" stroke-width="2"/></g><text class="cat-zzz" x="145" y="20">z z</text></svg>';
}
function size(){return innerWidth<=600?{w:112,h:96}:{w:152,h:126};}
function setPos(p,x,y,instant=false){
const s=size();p.x=Math.max(4,Math.min(x,innerWidth-s.w-6));p.y=Math.max(88,Math.min(y,innerHeight-s.h-52));
if(instant)p.el.style.transition='none';p.el.style.left=p.x+'px';p.el.style.top=p.y+'px';
if(instant){void p.el.offsetWidth;p.el.style.transition='';}
}
function visiblePerches(){
return Array.from(document.querySelectorAll('.feature-card,.family-card,.hero-art-wrap')).map(el=>el.getBoundingClientRect()).filter(r=>r.width>70&&r.top>110&&r.top<innerHeight-95&&r.right>30&&r.left<innerWidth-40);
}
function schedule(p,ms){clearTimeout(p.timer);if(!paused&&!document.hidden)p.timer=setTimeout(()=>act(p),ms);}
function act(p,initial=false){
if(paused||document.hidden)return;
const s=size(),ledges=visiblePerches(),r=Math.random();
let mode=initial?(p.orange?'sleep':'walk'):(p.orange?(r<.62?'sleep':r<.82?'peek':'walk'):(r<.53?'walk':r<.88?'peek':'sleep'));
if(mode==='peek'&&!ledges.length)mode=p.orange?'sleep':'walk';
p.mode=mode;p.el.className='cdj-resident '+mode+(p.left?' facing-left':'');
p.el.setAttribute('aria-label',p.name+'正在'+({walk:'散步',peek:'探頭',sleep:'睡覺'}[mode])+'，點一下摸摸牠');
if(mode==='walk'){
const dest=p.x<innerWidth/2?innerWidth-s.w-10:10;p.left=dest<p.x;
p.el.classList.toggle('facing-left',p.left);setPos(p,dest,innerHeight-s.h-(p.orange?60:118));schedule(p,6800);
}else if(mode==='peek'){
const ledge=ledges[Math.floor(Math.random()*ledges.length)];p.left=false;p.el.classList.remove('facing-left');
setPos(p,ledge.left+ledge.width*.4-s.w/2,ledge.top-50,true);schedule(p,p.orange?11000:6000);
}else{
setPos(p,p.orange?innerWidth-s.w-14:18,innerHeight-s.h-(p.orange?60:118));schedule(p,p.orange?14000:8500);
}
}
function showBubble(p){
world.querySelector('.cdj-cat-bubble')?.remove();clearTimeout(bubbleTimer);
const b=document.createElement('div');b.className='cdj-cat-bubble';b.setAttribute('role','status');
b.textContent=p.name+'：'+(p.orange?'呼嚕……陪我睡一下。':'喵！陪我玩嘛～');
const rect=p.el.getBoundingClientRect();b.style.left=Math.max(8,Math.min(rect.left,innerWidth-250))+'px';b.style.top=Math.max(75,rect.top-48)+'px';world.append(b);
bubbleTimer=setTimeout(()=>b.remove(),2600);
}
[['雅虎',false],['右右',true]].forEach(([name,orange])=>{
const el=document.createElement('button');el.type='button';el.className='cdj-resident sleep';el.innerHTML='<div class="cat-art">'+catDrawing(orange)+'</div>';
world.append(el);const p={el,name,orange,x:orange?innerWidth-size().w-14:12,y:innerHeight-size().h-70,timer:null,left:false,mode:'sleep'};residents.push(p);
setPos(p,p.x,p.y,true);el.setAttribute('aria-label',name+'正在休息，點一下摸摸牠');el.addEventListener('click',()=>showBubble(p));
});
function updatePause(){
world.classList.toggle('paused',paused);toggle.textContent=paused?'🐾 讓貓咪活動':'🐾 讓貓咪休息';toggle.setAttribute('aria-pressed',String(paused));
residents.forEach(p=>{clearTimeout(p.timer);if(paused){p.el.classList.remove('walk','peek');p.el.classList.add('sleep');}else act(p,true);});
}
toggle.addEventListener('click',()=>{paused=!paused;updatePause();});
let reposition;
function onViewChanged(){clearTimeout(reposition);reposition=setTimeout(()=>{residents.forEach(p=>{setPos(p,p.x,p.y,true);if(!paused&&p.mode==='peek')act(p);});},180);}
window.addEventListener('resize',onViewChanged);window.addEventListener('scroll',onViewChanged,{passive:true});
document.addEventListener('visibilitychange',()=>{residents.forEach(p=>{clearTimeout(p.timer);if(!document.hidden&&!paused)act(p,true);});});
updatePause();
})();
