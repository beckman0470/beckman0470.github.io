(()=>{'use strict';
const E=window.Yakiniku,$=id=>document.getElementById(id),slots=Array(6).fill(null);
let selected='beef',tool='flip',held=null,running=false,paused=false,remaining=90,score=0,combo=0,success=0,burnt=0,raw=0,perfect=0,last=0,order=0,best=0,audio=null,sound=false,practice=false;
try{best=Number(localStorage.getItem('cdj-yakiniku-best'))||0;}catch(_){}$('best').textContent=best;
const people=['鼠姊姊','龍弟弟','兔阿嬤'];
function say(text){$('feedback').textContent=text;}
function beep(good){if(!sound)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();audio.resume();const osc=audio.createOscillator(),gain=audio.createGain();osc.frequency.value=good?660:180;gain.gain.setValueAtTime(.035,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.15);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+.15);}catch(_){}}
function chooseTool(value){tool=value;$('flip').setAttribute('aria-pressed',String(value==='flip'));$('pick').setAttribute('aria-pressed',String(value==='pick'));}
function chooseFood(id){selected=id;document.querySelectorAll('[data-food]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.food===id)));say('選了'+E.foods.find(f=>f.id===id).name+'，點空烤格放上去。');}
E.foods.forEach(f=>{const b=document.createElement('button');b.className='ingredient';b.dataset.food=f.id;b.setAttribute('aria-pressed',String(f.id===selected));b.innerHTML='<i aria-hidden="true"><img src="art/'+f.id+'.svg" alt=""></i><span>'+f.name+'<small>每面約 '+f.seconds+' 秒</small></span>';b.onclick=()=>chooseFood(f.id);$('ingredients').append(b);});
const buttons=slots.map((_,i)=>{const b=document.createElement('button');b.className='slot';b.onclick=()=>act(i);$('grill').append(b);return b;});
function active(){return running&&!paused;}
// Pointer gestures also work in embedded browsers, without relying on native file dragging.
let drag=null,suppressClickUntil=0;
function dragTarget(x,y){const target=document.elementFromPoint(x,y)?.closest('.slot');return target?buttons.indexOf(target):-1;}
function markDrop(){buttons.forEach((b,i)=>b.classList.toggle('drop-target',!!drag?.moved&&active()&&!held&&!slots[i]&&dragTarget(drag.x,drag.y)===i));}
function cancelDrag(){if(!drag)return;const previous=drag;drag=null;previous.ghost?.remove();previous.source.classList.remove('drag-source');buttons.forEach(b=>b.classList.remove('drop-target'));document.body.classList.remove('dragging-food');if(previous.source.hasPointerCapture(previous.pointer))previous.source.releasePointerCapture(previous.pointer);}
function dragScroll(){if(!drag?.moved)return;const edge=65,y=drag.y,delta=y<edge?-10:y>innerHeight-edge?10:0;if(delta){window.scrollBy(0,delta);markDrop();}requestAnimationFrame(dragScroll);}
$('ingredients').addEventListener('dragstart',e=>e.preventDefault());
$('ingredients').addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
$('ingredients').addEventListener('pointerdown',e=>{const source=e.target.closest('[data-food]');if(!source||e.button!==0||!e.isPrimary)return;if(!active()){say(running?'先按「繼續」，再把食材拖到烤盤。':'先按「開始烤肉」，就能把食材拖上烤盤。');return;}if(held){say('先將夾起的食材裝盤或放回，再取新的食材。');return;}drag={source,pointer:e.pointerId,id:source.dataset.food,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,moved:false};source.setPointerCapture(e.pointerId);});
$('ingredients').addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.pointer)return;drag.x=e.clientX;drag.y=e.clientY;if(!drag.moved&&Math.hypot(drag.x-drag.startX,drag.y-drag.startY)<8)return;if(!drag.moved){drag.moved=true;drag.ghost=drag.source.querySelector('img').cloneNode();drag.ghost.className='food-drag-ghost';drag.ghost.alt='';drag.ghost.draggable=false;document.body.append(drag.ghost);drag.source.classList.add('drag-source');document.body.classList.add('dragging-food');say('拖到亮起的空烤格，放開就能開始烤。');requestAnimationFrame(dragScroll);}e.preventDefault();drag.ghost.style.left=drag.x+'px';drag.ghost.style.top=drag.y+'px';markDrop();});
$('ingredients').addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.pointer)return;const previous=drag,index=dragTarget(e.clientX,e.clientY);if(previous.moved){suppressClickUntil=performance.now()+500;e.preventDefault();cancelDrag();if(active()&&!held&&index>=0&&!slots[index]){chooseFood(previous.id);slots[index]=E.create(previous.id);say('滋滋～'+slots[index].food.name+'放上烤盤了！點食材就能翻面。');render();}else if(index>=0&&slots[index])say('這格已經有食材囉，請拖到空烤格。');else say('還沒放上烤盤，食材收回備料盤。');}else cancelDrag();});
$('ingredients').addEventListener('pointercancel',cancelDrag);
$('ingredients').addEventListener('lostpointercapture',e=>{if(drag?.pointer===e.pointerId)cancelDrag();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drag){suppressClickUntil=performance.now()+500;cancelDrag();say('取消拖曳，食材收回備料盤。');}});
function act(i){if(!active())return;if(held){if(i===held.index){slots[i]=held.piece;held=null;say('放回烤盤，繼續留意貼盤面的熟度。');}else say('請先放到餐盤、廚餘碗，或放回原烤格。');render();return;}
const p=slots[i];if(!p){slots[i]=E.create(selected);say('滋滋～'+slots[i].food.name+'上烤盤了！');}else if(tool==='flip'){p.down=1-p.down;say('翻面囉！朝上的一面停止加熱，貼盤的一面繼續烤。');}else{held={piece:p,index:i};slots[i]=null;say('夾起'+p.food.name+'，點餐盤上菜，或點原格放回。');}render();}
function updateOrder(){const food=E.foods[order%3];$('order').textContent=practice?'練習時間：慢慢烤，不限時。成功裝盤也會累積這一桌的分數。':people[order%3]+'點菜：想吃'+food.name+'！符合點菜加 30 分（成功三盤換單）。';}
function render(){
if(!active())cancelDrag();
$('score').textContent=score;$('combo').textContent=combo;$('clock').textContent=practice?'不限時':Math.ceil(remaining)+' 秒';
buttons.forEach((b,i)=>{const p=slots[i];b.disabled=!active();b.classList.toggle('empty',!p);b.dataset.heat=p?E.level(p.sides[p.down],p.food):'';if(!p){b.innerHTML='<span aria-hidden="true">＋</span><b>'+(held?.index===i?'放回原格':'空烤格 '+(i+1))+'</b>';b.setAttribute('aria-label','烤格 '+(i+1)+(held?.index===i?'，放回食材':'，放上'+E.foods.find(f=>f.id===selected).name));return;}
const up=E.level(p.sides[1-p.down],p.food),down=E.level(p.sides[p.down],p.food),color=up==='烤焦'?'burnt':up==='偏老'?'old':up==='剛好'?'ready':'raw';
b.innerHTML='<span class="food '+color+'" style="--food:'+p.food.color+'" aria-hidden="true"><img src="art/'+p.food.id+'.svg" alt=""></span><b>'+p.food.name+'</b><span>朝上：'+up+'</span><span class="'+(down==='剛好'?'ready-label':'')+'">貼盤：'+down+'</span><span class="meter" aria-hidden="true"><span style="--progress:'+Math.min(100,p.sides[p.down]/(p.food.seconds*1.8)*100)+'%"></span></span>';
b.setAttribute('aria-label','烤格 '+(i+1)+'，'+p.food.name+'，朝上'+up+'，貼盤'+down+'，'+(tool==='flip'?'翻面':'夾起裝盤'));
});
$('serve').disabled=$('discard').disabled=!active()||!held;$('held').textContent=held?'已夾起：'+held.piece.food.name+'（停止加熱）':'切換裝盤夾，點食材夾起。';
$('pause').disabled=!running;$('pause').textContent=paused?'繼續':'暫停';$('pause').setAttribute('aria-pressed',String(paused));document.querySelector('.game').classList.toggle('paused',paused);document.querySelector('.game').classList.toggle('is-running',running);var plateArt=document.querySelector('.plate-center');if(held){plateArt.innerHTML='<img src="art/'+held.piece.food.id+'.svg" alt="">';}else if(plateArt.children.length){plateArt.textContent='いただきます';}
}
function finish(){running=false;paused=false;held=null;render();$('result').hidden=false;$('summary').textContent='這桌得到 '+score+' 分，成功 '+success+' 盤，其中完美 '+perfect+' 盤；未熟 '+raw+' 盤、烤焦 '+burnt+' 盤。'+(score>=800?'雞爸爸：主廚，明天也拜託你了！':'兔阿嬤：慢慢來，下一桌會更拿手。');if(!practice&&score>best){best=score;$('best').textContent=best;try{localStorage.setItem('cdj-yakiniku-best',String(best));}catch(_){}}say('開飯時間到！這桌的成績已經整理好了。');$('again').focus({preventScroll:true});}
function start(){if(running){if(!window.confirm('重新開始會清除這一桌的進度，要再開一桌嗎？'))return;}slots.fill(null);held=null;score=combo=success=burnt=raw=perfect=order=0;remaining=90;practice=$('mode').value==='practice';running=true;paused=false;last=performance.now();$('result').hidden=true;$('served').replaceChildren();$('start').textContent='重新開一桌';updateOrder();render();say('開火囉！把食材拖到空烤格，或點選放上。兩面都要到「剛好」。');buttons[0].focus({preventScroll:true});}
$('start').onclick=start;$('again').onclick=()=>{$('mode').disabled=false;start();};
$('flip').onclick=()=>chooseTool('flip');$('pick').onclick=()=>chooseTool('pick');
$('pause').onclick=()=>{if(!running)return;paused=!paused;last=performance.now();render();say(paused?'先坐一下，所有食材與倒數都暫停了。':'繼續開烤！');};
$('sound').onclick=()=>{sound=!sound;$('sound').textContent='音效：'+(sound?'開':'關');$('sound').setAttribute('aria-pressed',String(sound));beep(true);};
$('serve').onclick=()=>{if(!active()||!held)return;const p=held.piece,r=E.judge(p);held=null;let points=r.points,bonus=0;
if(r.points>0){combo++;success++;if(r.kind==='perfect')perfect++;points+=Math.min(50,(combo-1)*10);if(!practice&&p.food.id===E.foods[order%3].id){points+=30;bonus=30;}say((r.kind==='perfect'?'鼠媽媽：兩面剛好，好香呀！':'兔阿嬤：熟了，口感再嫩一點就更棒。')+' ＋'+points+' 分'+(bonus?'（點菜加分！）':''));if(success%3===0){order++;updateOrder();}}else{combo=0;if(r.kind==='burnt'){burnt++;say('雞爸爸：哎呀，這片變木炭了！下次早一點翻面。 −30 分');}else{raw++;say('鼠媽媽：還沒熟透，兩面都要顧到喔！ −20 分');}}
score=Math.max(0,score+points);const mark=document.createElement('span');if(r.points>0){const image=document.createElement('img');image.src='art/'+p.food.id+'.svg';image.alt=p.food.name;mark.append(image);}else mark.textContent='✕';mark.title=p.food.name+'：'+({perfect:'剛剛好',well:'熟透偏老',raw:'未熟',burnt:'烤焦'}[r.kind]);$('served').append(mark);while($('served').children.length>6)$('served').firstChild.remove();beep(r.points>0);render();};
$('discard').onclick=()=>{if(!active()||!held)return;held=null;combo=0;score=Math.max(0,score-10);say('放入廚餘碗了（−10 分），清出空間再試試。');render();};
function autoPause(){if(running&&!paused){paused=true;render();say('已自動暫停。準備好再按繼續，食材不會偷偷烤焦。');}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)autoPause();});window.addEventListener('pagehide',autoPause);
function tick(now){if(now-last<100){requestAnimationFrame(tick);return;}const dt=Math.min(.25,Math.max(0,(now-last)/1000));last=now;if(active()){const step=practice?dt:Math.min(dt,remaining);slots.forEach(p=>{if(p)E.heat(p,step);});if(!practice){remaining=Math.max(0,remaining-step);if(remaining===0){$('mode').disabled=false;finish();}}render();}requestAnimationFrame(tick);}render();requestAnimationFrame(tick);
})();
