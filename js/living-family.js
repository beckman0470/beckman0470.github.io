/* Family living room: balcony orchids, low bicycle, sofa dinosaur, and cat play. */
(()=>{'use strict';
if(location.pathname!=='/videos.html')return;
const stage=document.querySelector('.cdj-greeting[data-room=living]');if(!stage)return;
const style=document.createElement('link');style.rel='stylesheet';style.href='/css/living-family.css?v=20261108-living10';document.head.append(style);
const people=[...stage.querySelectorAll('.greeting-character:not(.greeting-cat)')];
const scene=stage.querySelector('.greeting-scene');
stage.querySelectorAll('.room-paper,.room-rest-control').forEach(e=>e.remove());
const roles=[null,'mom-cat','ama-garden','dodo-bike','dragon-sofa'];
const greetings=['歡迎來我們這一家！','雅虎，來玩逗貓棒囉！','來看看阿嬤的蘭花吧。','一起來騎腳踏車！','我抱小恐龍，呵呵呵！'];
roles.forEach((name,i)=>{const person=people[i];if(!person)return;person.dataset.greeting=greetings[i];if(name){person.classList.add('living-activity-character');person.querySelector('.greeting-sprite').style.backgroundImage='url(/assets/greetings/v1/living-'+name+'.webp)';}});
const orchidStyle=document.createElement('style');orchidStyle.id='cdj-orchid-upgrade-v2';orchidStyle.textContent=String.raw`
.living-playground .living-game-tabs{display:none!important}
.orchid-reimagined{border:1px solid #e8d9c8;border-radius:24px;background:linear-gradient(160deg,#fffdf7,#fff4e9);padding:18px 20px 22px!important;color:#355341;font-family:system-ui,'Microsoft JhengHei',sans-serif}
.orchid-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:15px}
.orchid-reimagined .orchid-eyebrow{font-size:12px;letter-spacing:.12em;font-weight:800;color:#a36f66;margin:0 0 4px}
.orchid-reimagined h3{font-size:clamp(24px,2.6vw,34px);margin:0 0 6px!important;color:#365b44}
.orchid-reimagined .orchid-sub{margin:0;font-size:16px;line-height:1.7;color:#667960}
.orchid-day-chip{background:#eaf1e0;border:1px solid #bdd2ad;padding:10px 15px;border-radius:30px;font-weight:800;white-space:nowrap}
.orchid-hero{display:grid;grid-template-columns:minmax(230px,40%) 1fr;gap:22px;align-items:stretch}
.orchid-art{position:relative;display:flex;align-items:stretch;justify-content:center;overflow:hidden;min-height:460px;border-radius:24px;background:#faf1df;box-shadow:0 15px 34px #61724d25;isolation:isolate}
.orchid-art img{display:block;width:100%;height:100%;position:absolute;inset:0;object-fit:cover;object-position:center center;transition:filter .4s ease,opacity .4s ease}
.orchid-art.needs-care img{filter:saturate(.7) brightness(.9)}
.orchid-scene-shine{pointer-events:none;position:absolute;inset:0;background:linear-gradient(130deg,#fff8ed70,transparent 42%)}
.orchid-growth-label{position:absolute;top:16px;left:16px;background:#fff9f0e8;border:1px solid #f2d7c9;padding:8px 13px;border-radius:99px;color:#82556b;font-size:14px;font-weight:800;backdrop-filter:blur(7px)}
.orchid-scene-overlay{position:absolute;bottom:14px;left:14px;background:#3d564ebd;color:#fff;padding:8px 13px;border-radius:12px;font-size:14px;font-weight:800}
.orchid-side{display:flex;flex-direction:column;gap:12px;min-width:0}
.orchid-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.orchid-metrics>div{border:1px solid #e6e4cf;background:#fffdf7;border-radius:16px;padding:12px}
.orchid-metrics small{display:block;font-size:14px;color:#6b806b;font-weight:750}
.orchid-metrics strong{display:block;font-size:25px;color:#4e7d5e}.orchid-metrics em{font-size:12px;color:#819282;font-style:normal}
.orchid-bar{height:8px;background:#e8e8d9;border-radius:20px;overflow:hidden;margin-top:6px}.orchid-bar>div{height:100%;background:linear-gradient(90deg,#89bb6d,#4a915d);transition:width .5s}.orchid-bar.bloom>div{background:linear-gradient(90deg,#edb7d7,#d56caa)}
.orchid-guide{background:#fff2e7;border-left:5px solid #efbd91;border-radius:10px;padding:10px 14px}.orchid-guide>span{font-size:13px;font-weight:900;color:#ad7554}.orchid-guide p{font-size:16px;line-height:1.65;margin:5px 0 0;color:#6e584b}
.orchid-moisture-heading{display:flex;justify-content:space-between;font-weight:850}.orchid-moisture small{font-size:13px;color:#758b75}
.orchid-reimagined meter{display:block;width:100%;height:18px;margin:7px 0;accent-color:#7eb889}
.orchid-position{background:#eef2e7;padding:10px;border-radius:11px;font-size:14px;color:#57745b;font-weight:800}
.orchid-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.orchid-actions button{background:#f4f8ee;border:1px solid #bad4b2;border-radius:14px;padding:12px 6px!important;display:grid;gap:5px;justify-items:center;color:#3c6948;font-size:14px!important;font-weight:900;min-height:75px}.orchid-actions button span{font-size:22px}.orchid-actions button:disabled{opacity:.43}
.orchid-next-actions{display:flex;gap:9px;flex-wrap:wrap}.orchid-next-actions button{border:1px solid #aec5a4;border-radius:14px;background:#fbfff6;color:#386247;padding:11px 16px;font-weight:900}.orchid-next-actions button.orchid-next-primary{background:#527d5b;color:#fff;border-color:#527d5b}.orchid-next-actions button:disabled{opacity:.5}
.orchid-live-status{background:#edf5e9!important;border-radius:10px!important;color:#3e6648!important;padding:10px!important;font-size:14px!important;line-height:1.6}
.orchid-journal{margin-top:auto}.orchid-journal-title{font-size:13px;color:#6d806b;font-weight:850;margin-bottom:8px}.orchid-days{display:flex;gap:6px;flex-wrap:wrap}.orchid-days span{font-size:12px;padding:6px 9px;border:1px solid #e0e4d6;border-radius:12px;background:#f9faf5;color:#8b9386}.orchid-days span.today{border-color:#a7c49f;color:#477c58;background:#ecf4e6;font-weight:900}.orchid-days span.done{background:#ddecda;color:#337647;border-color:#a0c6a2}.orchid-days span.try-again{background:#fff0d7;color:#a47b47}
.orchid-botanical-note{font-size:12px;color:#748170;line-height:1.7;margin:14px 0 3px}
.orchid-switch{margin-top:10px;border:1px solid #c3d2b5;background:#f6f8ef;color:#4c6b53;border-radius:12px;padding:10px 13px;font-weight:800}
@media(max-width:850px){.orchid-hero{grid-template-columns:1fr}.orchid-art{min-height:460px;max-height:650px}.orchid-art img{object-position:center 42%}}
@media(max-width:540px){.orchid-reimagined{padding:12px!important}.orchid-art{min-height:390px}.orchid-actions{gap:5px}.orchid-actions button{font-size:12px!important;padding:8px 4px!important}}
`;document.head.append(orchidStyle);
const host=document.createElement('section');host.className='living-playground';host.id='living-playground';
host.innerHTML=`
<section id="orchid-care" class="living-game-panel orchid-reimagined" role="tabpanel" aria-label="兔阿嬤的蘭花小陽台">
<div class="orchid-heading"><div><p class="orchid-eyebrow">GRANDMA'S ORCHID STUDIO · 蘭花照護小旅行</p><h3>兔阿嬤的蘭花小陽台</h3><p class="orchid-sub">陪一盆蝴蝶蘭走過五個照護日，看見花苞慢慢長大、開成一束漂亮的花。</p></div><div class="orchid-day-chip">照護第 <strong data-day>1</strong>／5 天</div></div>
<div class="orchid-hero"><div class="orchid-art"><img data-orchid-scene src="/assets/orchid/orchid-0.jpg" alt="蝴蝶蘭照護第一階段：綠葉與花梗" width="396" height="793" loading="eager"><div class="orchid-scene-shine"></div><div class="orchid-growth-label" data-orchid-growth>花梗準備成長</div><div class="orchid-scene-overlay" data-orchid-overlay></div></div>
<div class="orchid-side"><div class="orchid-metrics"><div><small>健康活力</small><strong><span data-health>100</span> <em>／100</em></strong><div class="orchid-bar"><div data-health-fill></div></div></div><div><small>綻放進度</small><strong><span data-bud>0</span><em>%</em></strong><div class="orchid-bar bloom"><div data-bud-fill></div></div></div></div>
<div class="orchid-guide"><span>兔阿嬤的小提醒</span><p data-orchid-tip>摸摸介質，有點乾了，照顧好通風再慢慢等它開花。</p></div>
<div class="orchid-care-stats"><div class="orchid-moisture"><div class="orchid-moisture-heading"><span>介質水分</span><b><span data-moisture>25</span>%</b></div><meter class="orchid-meter" min="0" max="100" low="25" high="70" optimum="45" value="25" aria-label="介質水分"></meter><small data-moisture-tip>介質略乾，觀察後再補水</small></div><div class="orchid-position" data-orchid-place>明亮散光 · 空氣較悶</div></div>
<div class="orchid-actions"><button type="button" data-water><span>💧</span>少量澆水</button><button type="button" data-shade><span>🌤️</span>移到散光</button><button type="button" data-air><span>🌬️</span>打開通風</button></div>
<div class="orchid-next-actions"><button class="orchid-next-primary" type="button" data-day-next>完成今天照顧 →</button><button type="button" data-orchid-reset>重新栽培</button></div><p class="living-game-status orchid-live-status" data-orchid-status role="status" aria-live="polite">觀察葉片和介質，開始陪蘭花長大吧！</p>
<div class="orchid-journal"><div class="orchid-journal-title">五日開花紀錄</div><div data-orchid-days class="orchid-days" aria-label="照護日進度"></div></div></div></div><p class="orchid-botanical-note">照護提示參考一般蝴蝶蘭的需求：明亮散射光、良好通風、依介質乾濕澆水。五天開花是遊戲中的成長時間。</p><button type="button" class="orchid-switch" data-switch-bike>去玩鼠姊姊的腳踏車 →</button></section>
<section id="bicycle-race" class="living-game-panel" role="tabpanel" aria-label="鼠姊姊的小腳踏車賽" hidden><h3>鼠姊姊的小腳踏車賽</h3><p>按左右鍵換車道，避開三角錐、收集小花，騎到 400 公尺終點。也可以用鍵盤方向鍵。</p><div class="bike-hud"><span data-bike-distance>0 / 400 公尺</span><span data-bike-hearts>愛心 ♥♥♥</span><span data-bike-flowers>小花 0</span></div><div class="living-game-actions"><button type="button" data-bike-start>開始騎車</button><button type="button" data-bike-pause disabled>暫停</button><button type="button" data-bike-reset>重新開始</button></div><canvas id="bike-canvas" class="living-game-canvas" width="640" height="360" tabindex="0" aria-label="腳踏車賽車畫面，使用左右方向鍵換車道"></canvas><div class="living-game-actions bike-controls"><button type="button" data-bike-left aria-label="腳踏車向左">← 向左</button><button type="button" data-bike-fast>加速一下</button><button type="button" data-bike-right aria-label="腳踏車向右">向右 →</button></div><p class="living-game-status" data-bike-status role="status" aria-live="polite">戴好安全帽，在遊戲裡出發！</p><button type="button" class="orchid-switch" data-switch-orchid>← 回兔阿嬤蘭花</button></section>
`;
(document.querySelector('#media-library-title')?.closest('section') || document.querySelector('.cdj-welcome')).after(host);
const $=s=>host.querySelector(s);const panels=[...host.querySelectorAll('.living-game-panel')],tabs=[...host.querySelectorAll('[role=tab]')];
function choose(id,scroll=false){panels.forEach(p=>p.hidden=p.id!==id);tabs.forEach(t=>{const on=t.getAttribute('aria-controls')===id;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;});if(id!=='bicycle-race')pauseBike();if(scroll){const p=document.getElementById(id);p.tabIndex=-1;p.focus({preventScroll:true});p.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}}
tabs.forEach((t,i)=>{t.onclick=()=>choose(t.getAttribute('aria-controls'));t.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;tabs[next].focus();choose(tabs[next].getAttribute('aria-controls'));};});
host.querySelector('[data-switch-bike]').onclick=()=>choose('bicycle-race',true);
host.querySelector('[data-switch-orchid]').onclick=()=>choose('orchid-care',true);
// Care game: each round has a different moisture level and sun condition.
const days=[
 {water:25,sun:false,air:false,tip:'摸摸介質，有點乾囉。補一點水，再讓小陽台通通風。'},
 {water:64,sun:false,air:true,tip:'今天介質還很濕，先讓它呼吸，水可以晚點再加。'},
 {water:40,sun:true,air:true,tip:'陽光有點刺眼，幫蘭花移到明亮、柔和的散射光吧！'},
 {water:30,sun:false,air:false,tip:'葉片需要舒適的風，也可以少量補水。'},
 {water:45,sun:false,air:true,tip:'狀態真棒！今天只要用眼睛觀察，靜靜欣賞。'}
];
let day=0,health=100,bud=0,care,careDone=false,successDays=[];
const orchids=['花梗準備成長','冒出第一批花苞','花苞慢慢變飽滿','第一朵花開了','蝴蝶蘭盛開啦'];
const orchidImg=$('[data-orchid-scene]');
function carePaint(){
 $('[data-day]').textContent=day+1;
 $('[data-health]').textContent=health;
 $('[data-bud]').textContent=bud;
 $('[data-moisture]').textContent=care.water;
 $('meter').value=care.water;
 $('[data-orchid-tip]').textContent=days[day].tip;
 $('[data-orchid-place]').textContent=(care.sun?'☀️ 強烈直射光':'🌤️ 明亮散光')+' · '+(care.air?'🌬️ 通風中':'🌫️ 空氣較悶');
 $('[data-moisture-tip]').textContent=care.water<35?'介質偏乾，觀察是否需要補水':care.water>65?'介質較濕，讓根部透透氣':'水分剛剛好，可以安心觀察';
 $('[data-health-fill]').style.width=health+'%';
 $('[data-bud-fill]').style.width=bud+'%';
 const sceneStep=careDone?(bud>=80?4:Math.min(3,Math.floor(bud/25))):Math.min(4,Math.floor(bud/20));
 orchidImg.src='/assets/orchid/orchid-'+sceneStep+'.jpg';
 orchidImg.alt='蝴蝶蘭成長階段：'+orchids[sceneStep];
 $('[data-orchid-growth]').textContent=orchids[sceneStep];
 const thirsty=care.water<35,tooWet=care.water>65;
 $('.orchid-art').classList.toggle('needs-care',thirsty||tooWet||care.sun||health<70);
 $('[data-orchid-overlay]').textContent=care.sun?'☀️ 陽光太強':tooWet?'💧 介質太濕':thirsty?'🌱 可以補水':care.air?'✨ 舒服的陽台':'🌬️ 打開窗戶';
 $('[data-shade]').disabled=careDone||!care.sun;
 $('[data-air]').disabled=careDone||care.air;
 $('[data-water]').disabled=careDone||care.water>=100;
 $('[data-day-next]').disabled=careDone;
 const chips=$('[data-orchid-days]');chips.replaceChildren();
 for(let i=0;i<5;i++){const span=document.createElement('span');span.className=i<successDays.length?(successDays[i]?'done':'try-again'):i===day?'today':'';span.textContent=(i+1)+'日'+(i<successDays.length?(successDays[i]?' ✓':' ↺'):'');chips.append(span)}
}
function careReset(){day=0;health=100;bud=0;careDone=false;successDays=[];care={...days[0]};$('[data-orchid-status]').textContent='觀察葉片和介質，開始陪蘭花長大吧！';carePaint();}
$('[data-water]').onclick=()=>{care.water=Math.min(100,care.water+10);$('[data-orchid-status]').textContent='小水壺澆水啦！看看介質水分有沒有剛好。';carePaint()};
$('[data-shade]').onclick=()=>{care.sun=false;$('[data-orchid-status]').textContent='搬到柔和的散射光下，花苞更舒服了。';carePaint()};
$('[data-air]').onclick=()=>{care.air=true;$('[data-orchid-status]').textContent='微風吹過小陽台，空氣清新多了。';carePaint()};
$('[data-orchid-reset]').onclick=careReset;
$('[data-day-next]').onclick=()=>{
 const good=care.water>=35&&care.water<=65&&!care.sun&&care.air;
 successDays.push(good);health=Math.max(0,health+(good?0:-20));bud=Math.min(100,bud+(good?20:5));
 if(day===4){careDone=true;$('[data-orchid-status]').textContent=bud>=80?'蘭花盛開啦！兔阿嬤說：你照顧得真細心！':'五天照護完成！再試一次，觀察水分、陽光與通風，就能看見更多花。';}
 else{day++;care={...days[day]};$('[data-orchid-status]').textContent=good?'太棒了！花苞又長大一點，看看今天的小提醒。':'今天學到新技巧！下一天再仔細照顧，花苞會慢慢長大。';}
 carePaint();
};
careReset();
// Race game: time-based animation with bounded dt, three lanes and collision cooldown.
const canvas=$('#bike-canvas'),ctx=canvas.getContext('2d'),rider=new Image();rider.src='/assets/greetings/v1/living-dodo-bike.webp';
let lane=1,distance=0,hearts=3,flowers=0,items=[],running=false,paused=false,finished=false,last=0,spawn=0,boost=0,cooldown=0,raf=0,elapsed=0;
const laneX=n=>190+n*130;
function bikeHud(){$('[data-bike-distance]').textContent=Math.floor(distance)+' / 400 公尺';$('[data-bike-hearts]').textContent='愛心 '+'♥'.repeat(hearts);$('[data-bike-flowers]').textContent='小花 '+flowers;}
function bikeDraw(){ctx.clearRect(0,0,640,360);ctx.fillStyle='#dfe8c8';ctx.fillRect(0,0,640,360);ctx.fillStyle='#eddfc2';ctx.fillRect(105,0,430,360);ctx.strokeStyle='#fbf7e9';ctx.lineWidth=4;ctx.setLineDash([18,18]);ctx.lineDashOffset=-elapsed*60;[255,385].forEach(x=>{ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,360);ctx.stroke();});ctx.setLineDash([]);for(let i=0;i<8;i++){const y=(i*60+elapsed*42)%390;ctx.fillStyle='#92b184';ctx.beginPath();ctx.arc(55,y,17,0,Math.PI*2);ctx.arc(580,y+20,21,0,Math.PI*2);ctx.fill();}items.forEach(o=>{const x=laneX(o.lane);if(o.flower){ctx.fillStyle='#d59fbb';for(let n=0;n<5;n++){ctx.beginPath();ctx.arc(x+Math.cos(n*1.256)*9,o.y+Math.sin(n*1.256)*9,7,0,Math.PI*2);ctx.fill();}ctx.fillStyle='#f5df87';ctx.beginPath();ctx.arc(x,o.y,5,0,Math.PI*2);ctx.fill();}else{ctx.fillStyle='#ce8b58';ctx.beginPath();ctx.moveTo(x,o.y-18);ctx.lineTo(x-16,o.y+17);ctx.lineTo(x+16,o.y+17);ctx.closePath();ctx.fill();ctx.fillStyle='#fff2db';ctx.fillRect(x-9,o.y+1,18,5);}});
ctx.save();if(cooldown>0&&Math.floor(cooldown*8)%2)ctx.globalAlpha=.45;const x=laneX(lane);if(rider.complete&&rider.naturalWidth)ctx.drawImage(rider,0,0,rider.naturalWidth/2,rider.naturalHeight/2,x-55,250,110,110);else{ctx.fillStyle='#557f75';ctx.beginPath();ctx.arc(x,304,16,0,Math.PI*2);ctx.fill();}ctx.restore();if(!running){ctx.fillStyle='#fffdf5e8';ctx.fillRect(150,120,340,95);ctx.fillStyle='#3f614a';ctx.font='22px system-ui';ctx.textAlign='center';ctx.fillText(finished?(hearts?'到終點了！':'休息一下，再試一次'):paused?'已暫停':'準備好就出發',320,160);ctx.font='15px system-ui';ctx.fillText('左右換車道，收集小花',320,190);}}
function pauseBike(){if(!running)return;running=false;paused=true;cancelAnimationFrame(raf);$('[data-bike-start]').textContent='繼續騎車';$('[data-bike-pause]').disabled=true;bikeDraw();}
function bikeReset(){cancelAnimationFrame(raf);lane=1;distance=0;hearts=3;flowers=0;items=[];running=false;paused=false;finished=false;spawn=0;boost=0;cooldown=0;elapsed=0;bikeHud();$('[data-bike-start]').textContent='開始騎車';$('[data-bike-start]').disabled=false;$('[data-bike-pause]').disabled=true;$('[data-bike-status]').textContent='戴好安全帽，在遊戲裡出發！';bikeDraw();}
function tick(now){if(!running)return;const dt=Math.min(.04,(now-last)/1000);last=now;elapsed+=dt;const speed=boost>0?23:15;boost=Math.max(0,boost-dt);cooldown=Math.max(0,cooldown-dt);distance=Math.min(400,distance+speed*dt);spawn+=dt;if(spawn>1.2){spawn=0;items.push({lane:Math.floor(Math.random()*3),y:-20,flower:Math.random()<.45});}items.forEach(o=>o.y+=dt*(boost>0?165:120));items=items.filter(o=>{if(o.y>278&&o.y<326&&o.lane===lane){if(o.flower){flowers++;return false;}if(cooldown<=0){hearts--;cooldown=1.5;$('[data-bike-status]').textContent='碰到三角錐了，慢慢來！';return false;}}return o.y<390;});if(hearts<=0||distance>=400){running=false;finished=true;$('[data-bike-start]').disabled=true;$('[data-bike-pause]').disabled=true;$('[data-bike-status]').textContent=hearts?'到終點囉！收集了 '+flowers+' 朵小花。':'先休息一下，按重新開始再挑戰。';}bikeHud();bikeDraw();if(running)raf=requestAnimationFrame(tick);}
$('[data-bike-start]').onclick=()=>{if(finished)return;running=true;paused=false;last=performance.now();$('[data-bike-start]').textContent='騎車中';$('[data-bike-pause]').disabled=false;$('[data-bike-status]').textContent='看前方，左右避開三角錐！';cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);};$('[data-bike-pause]').onclick=pauseBike;$('[data-bike-reset]').onclick=bikeReset;
function steer(v){lane=Math.max(0,Math.min(2,lane+v));bikeDraw();}$('[data-bike-left]').onclick=()=>steer(-1);$('[data-bike-right]').onclick=()=>steer(1);$('[data-bike-fast]').onclick=()=>{if(running)boost=2;};
canvas.onkeydown=e=>{if(['ArrowLeft','ArrowRight','ArrowUp',' '].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')steer(-1);else if(e.key==='ArrowRight')steer(1);else if(running)boost=2;}};rider.onload=bikeDraw;document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseBike();});bikeReset();
// Positions use the same image crop as the background, including the compact phone view.
const anchors=[[1540,900,400],[500,830,355],[1030,510,230],[1000,865,270],[1380,740,190]];
const ns='http://www.w3.org/2000/svg',map=document.createElementNS(ns,'svg');map.classList.add('living-orchid-map');map.setAttribute('aria-label','點蘭花開始養花小遊戲');const orchid=document.createElementNS(ns,'a');orchid.setAttribute('href','#orchid-care');orchid.setAttribute('aria-label','陽台蘭花：玩澆花養花小遊戲');[['835,326 930,325 936,497 839,497'],['961,363 1054,363 1056,500 963,500'],['1067,350 1165,350 1170,502 1070,502'],['1185,360 1278,360 1281,501 1188,501']].forEach(([points])=>{const poly=document.createElementNS(ns,'polygon');poly.setAttribute('points',points);orchid.append(poly);});orchid.addEventListener('click',e=>{e.preventDefault();choose('orchid-care',true);});map.append(orchid);stage.append(map);
const align=()=>{const r=scene.getBoundingClientRect(),p=stage.getBoundingClientRect(),z=Math.max(r.width/1672,r.height/941),pos=getComputedStyle(scene).backgroundPosition.split(' '),px=parseFloat(pos[0])/100,py=parseFloat(pos[1]||pos[0])/100,dx=r.left-p.left+(r.width-1672*z)*px,dy=r.top-p.top+(r.height-941*z)*py;
anchors.forEach(([x,y,size],i)=>{const el=people[i];if(!el)return;el.style.setProperty('left',dx+x*z+'px','important');el.style.setProperty('bottom',p.height-dy-y*z+'px','important');el.style.setProperty('--frame',size*z+'px','important');});map.style.left=r.left-p.left+'px';map.style.top=r.top-p.top+'px';map.style.width=r.width+'px';map.style.height=r.height+'px';map.setAttribute('viewBox',[(1672-r.width/z)*px,(941-r.height/z)*py,r.width/z,r.height/z].join(' '));};new ResizeObserver(align).observe(scene);style.onload=align;align();
if(people[3]){people[3].setAttribute('aria-label','鼠姊姊的小腳踏車：玩腳踏車賽車');people[3].onclick=()=>choose('bicycle-race',true);}
stage.querySelector('.greeting-caption').textContent='';
const initial=location.hash.slice(1);if(panels.some(p=>p.id===initial))choose(initial);
})();