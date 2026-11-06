/* Four playable family activities. No external engines or network requests. */
(() => {
'use strict';
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function battingResult(progress,easy=true){const error=Math.abs(progress-.78);return error<=(easy?.23:.13)?(error<=.065?'全壘打':'安打'):'揮空';}
function aimResult(progress,ax,ay,bx,by,easy=true){const timing=Math.abs(progress-.78);if(timing>(easy?.23:.13))return '揮空';if(Math.abs(ax-bx)>(easy?57:44)||Math.abs(ay-by)>(easy?43:34))return '瞄準偏了';return timing<=.065&&Math.hypot(ax-bx,ay-by)<=22?'全壘打':'安打';}
function newKingdom(){return {gold:12,food:18,troops:12,turn:1,actions:2,selected:0,ended:false,cities:[{name:'成都',owner:'you',def:0},{name:'漢中',owner:'neutral',def:4},{name:'長安',owner:'enemy',def:8},{name:'荊州',owner:'neutral',def:5},{name:'建業',owner:'enemy',def:7},{name:'許昌',owner:'enemy',def:10}]};}
const adjacent=(a,b)=>Math.abs(Math.floor(a/3)-Math.floor(b/3))+Math.abs(a%3-b%3)===1;
function kingdomAct(state,type){const s=JSON.parse(JSON.stringify(state));if(s.ended)return {state:s,text:'這一局已結束，可以重新開局。'};let text='';const own=s.cities.filter(c=>c.owner==='you').length;
if(type==='turn'){s.turn++;s.gold+=own*3;s.food+=own*5-Math.ceil(s.troops/6);s.actions=2;if(s.food<0){s.troops=Math.max(0,s.troops-2);s.food=0;text='糧食不足，兩名士兵先回家休息。';}else text='城池帶來收入與糧食，新的回合開始！';if(s.turn>3){const target=s.cities.findIndex((c,i)=>c.owner==='you'&&i!==0&&s.cities.some((e,j)=>e.owner==='enemy'&&adjacent(i,j)));if(target>=0){if(s.troops>=5){s.troops-=2;text+=' 守軍擋住敵方試探，消耗兩名兵力。';}else{s.cities[target].owner='enemy';text+=' 兵力不足，失去'+s.cities[target].name+'，仍能重新奪回。';}}}return {state:s,text};}
if(s.actions<=0)return {state:s,text:'這回合已做兩個行動，按「下一回合」繼續。'};
if(type==='farm'){if(s.gold<2)return {state:s,text:'需要兩枚金幣才能準備糧食。'};s.gold-=2;s.food+=10;text='農田收成！增加十份糧食。';}
else if(type==='recruit'){if(s.gold<4||s.food<4)return {state:s,text:'招兵需要四枚金幣和四份糧食。'};s.gold-=4;s.food-=4;s.troops+=6;text='招募六名士兵加入。';}
else if(type==='attack'){const t=s.cities[s.selected];if(t.owner==='you')return {state:s,text:'這是自己的城池，請先選一座鄰近城池。'};if(!s.cities.some((c,i)=>c.owner==='you'&&adjacent(i,s.selected)))return {state:s,text:'距離太遠，先攻下相鄰的城池。'};if(s.food<3)return {state:s,text:'出征需要三份糧食，先準備糧食。'};if(s.troops<t.def+2)return {state:s,text:'需要至少'+(t.def+2)+'名士兵，再招兵就能穩穩出發。'};s.food-=3;s.troops-=Math.ceil(t.def/2);t.owner='you';text='攻下'+t.name+'！士兵休息後，這座城會在下回合提供資源。';}
else return {state:s,text:'請選擇一個行動。'};
s.actions--;if(s.cities.every(c=>c.owner==='you')){s.ended=true;text='六座城都加入你了！你完成了這場迷你三國遠征。';}return {state:s,text};}
if(typeof module!=='undefined'&&module.exports){module.exports={clamp,battingResult,aimResult,newKingdom,kingdomAct,adjacent};return;}
const NS='http://www.w3.org/2000/svg';
function svg(tag,attrs={},text){const n=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text)n.textContent=text;return n;}
function node(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
function btn(text,fn,cls=''){const b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
function mount(id,root,api){let disposed=false,frame=0,last=0,paused=false;const cleanups=[];
const on=(target,type,fn,options)=>{target.addEventListener(type,fn,options);cleanups.push(()=>target.removeEventListener(type,fn,options));};
root.classList.add('ag-root');cleanups.push(()=>root.classList.remove('ag-root'));
const tip=node('p','ag-tip');tip.setAttribute('role','status');const tell=(s)=>{tip.textContent=s;api.message(s,true);};
const screen=node('div','ag-screen');root.append(screen,tip);const controls=node('div','ag-controls');root.append(controls);
const pause=btn('暫停',()=>{paused=!paused;pause.textContent=paused?'繼續玩':'暫停';if(paused)holding=false;last=0;});let holding=false;
on(document,'visibilitychange',()=>{if(document.hidden){paused=true;holding=false;pause.textContent='繼續玩';last=0;}});
function loop(step){function tick(now){if(disposed)return;const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(!paused)step(dt,now);frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);}
function hold(button,change){on(button,'pointerdown',e=>{e.preventDefault();button.setPointerCapture?.(e.pointerId);change(true);});['pointerup','pointercancel','lostpointercapture'].forEach(type=>on(button,type,()=>change(false)));on(button,'keydown',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();change(true);}});on(button,'keyup',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();change(false);}});on(button,'blur',()=>change(false));}
function scene(label){const s=svg('svg',{viewBox:'0 0 600 320',role:'img','aria-label':label});screen.append(s);return s;}
if(id==='baseball'){
const s=scene('打者視角：用滑鼠或手指移動金色打擊框，球接近框框時按打擊。');s.setAttribute('viewBox','0 0 600 360');s.classList.add('ag-batting-view');s.tabIndex=0;
s.append(svg('rect',{width:600,height:360,fill:'#dcebd1'}),svg('path',{d:'M0 155 Q300 70 600 155 L600 0 H0 Z',fill:'#bad4dc'}),svg('path',{d:'M0 175 Q300 30 600 175',fill:'none',stroke:'#668674','stroke-width':32}),svg('path',{d:'M300 342 L120 190 L300 86 L480 190 Z',fill:'#ddc49b'}),svg('path',{d:'M0 345 L300 320 L600 345',stroke:'white','stroke-width':4,fill:'none'}),svg('rect',{x:245,y:278,width:110,height:62,fill:'#c7ad8b'}),svg('path',{d:'M283 314 H317 L322 327 L300 340 L278 327 Z',fill:'white'}));
s.append(svg('image',{href:'/assets/img/portrait-dad.png',x:408,y:193,width:76,height:135}),svg('circle',{cx:300,cy:95,r:14,fill:'#42664d'}),svg('line',{x1:300,y1:110,x2:300,y2:134,stroke:'#42664d','stroke-width':12}));
const bat=svg('line',{x1:427,y1:268,x2:391,y2:170,stroke:'#906136','stroke-width':11,'stroke-linecap':'round'});s.append(bat);
s.append(svg('rect',{x:205,y:148,width:175,height:136,rx:4,fill:'white','fill-opacity':'.06',stroke:'#fffdf8','stroke-width':3,'stroke-dasharray':'8 6'}),svg('text',{x:210,y:139,'font-size':17,fill:'#344b38'},'好球帶'));
const hint=svg('circle',{r:14,fill:'#547faa','fill-opacity':'.18',stroke:'#547faa','stroke-dasharray':'4 3',visibility:'hidden'});s.append(hint);
const ball=svg('circle',{cx:300,cy:105,r:5,fill:'white',stroke:'#ac6351','stroke-width':2,visibility:'hidden'});s.append(ball);
const aim=svg('g',{'pointer-events':'none'}),box=svg('rect',{width:100,height:72,rx:12,fill:'#fff2aa','fill-opacity':'.2',stroke:'#a16a17','stroke-width':3}),cross=svg('path',{d:'M-12 0 H12 M0 -12 V12',stroke:'#42664d','stroke-width':2});aim.append(box,cross);s.append(aim);
let ax=300,ay=220,landing={x:300,y:220},shots=0,hits=0,homers=0,progress=0,flying=false,flight=0,swingFlash=0,easy=true;
const score=node('p','ag-score');root.prepend(score);
const aimStatus=node('p','ag-aim-status');aimStatus.setAttribute('aria-live','off');root.append(aimStatus);
function moveAim(x,y){ax=clamp(x,190,395);ay=clamp(y,140,286);aim.setAttribute('transform','translate('+ax+' '+ay+')');const w=easy?100:74,h=easy?72:54;box.setAttribute('x',-w/2);box.setAttribute('y',-h/2);box.setAttribute('width',w);box.setAttribute('height',h);aimStatus.textContent='瞄準位置：橫向 '+Math.round(ax)+'，高度 '+Math.round(ay)+'。可拖動框框，也可點選球場後用方向鍵。';}
function point(event){const r=s.getBoundingClientRect();if(!r.width||!r.height)return;moveAim((event.clientX-r.left)*600/r.width,(event.clientY-r.top)*360/r.height);}
on(s,'pointerdown',event=>{if(paused)return;event.preventDefault();s.setPointerCapture?.(event.pointerId);point(event);});
on(s,'pointermove',event=>{if(paused)return;if(event.pointerType==='mouse'||event.buttons||s.hasPointerCapture?.(event.pointerId)){event.preventDefault();point(event);}});
on(s,'keydown',event=>{const d={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]}[event.code];if(d){event.preventDefault();if(!paused)moveAim(ax+d[0],ay+d[1]);}if(event.code==='Space'){event.preventDefault();swing();}});
const pitch=btn('投下一球',()=>{if(paused||flying||flight>0||shots>=5)return;shots++;progress=0;landing={x:225+Math.random()*130,y:178+Math.random()*75};flying=true;ball.setAttribute('visibility','visible');hint.setAttribute('cx',landing.x);hint.setAttribute('cy',landing.y);hint.setAttribute('visibility',easy?'visible':'hidden');pitch.disabled=true;tip.textContent=easy?'藍色圈是來球落點。把金框移過去，等球靠近再打擊！':'看來球移動金框，等接近本壘再打擊！';update();},'primary');
function result(kind){flying=false;hits+=['安打','全壘打'].includes(kind)?1:0;homers+=kind==='全壘打'?1:0;flight=['安打','全壘打'].includes(kind)?1.2:0;hint.setAttribute('visibility','hidden');let text=kind==='瞄準偏了'?'時機接近了！但框框偏離落點，再移準一點。':kind==='揮空'?'這次時機差一點，等球更靠近金框再打擊。':kind+'！瞄準與時機都抓到了！';if(shots===5)text+=' 五球完成：'+hits+' 支安打，其中 '+homers+' 支全壘打。';tell(text);pitch.disabled=shots>=5||flight>0;update();}
function swing(){if(paused||!flying)return;swingFlash=.3;result(aimResult(progress,ax,ay,landing.x,landing.y,easy));}
const hit=btn('打擊！',swing,'primary ag-hit'),difficulty=btn('模式：輕鬆・落點提示',()=>{if(flying||flight>0)return;easy=!easy;difficulty.textContent=easy?'模式：輕鬆・落點提示':'模式：挑戰・自己瞄準';moveAim(ax,ay);});
controls.append(pitch,hit,difficulty,pause,btn('再打五球',()=>{flying=false;flight=0;shots=hits=homers=0;pitch.disabled=false;ball.setAttribute('visibility','hidden');hint.setAttribute('visibility','hidden');update();tip.textContent='準備好了，移動金框，再投一球。';}));
function update(){score.textContent='第 '+shots+' / 5 球 · 安打 '+hits+' · 全壘打 '+homers;hit.disabled=!flying;}
loop(dt=>{if(flying){progress+=dt/(easy?3.0:2.2);const p=progress/.78;ball.setAttribute('cx',300+(landing.x-300)*p);ball.setAttribute('cy',105+(landing.y-105)*p);ball.setAttribute('r',5+clamp(p,0,1.3)*6);if(progress>1.08)result('揮空');}else if(flight>0){flight-=dt;const p=1-flight/1.2;ball.setAttribute('cx',landing.x-170*p);ball.setAttribute('cy',landing.y-205*Math.sin(p*1.5));if(flight<=0){ball.setAttribute('visibility','hidden');pitch.disabled=shots>=5;}}swingFlash=Math.max(0,swingFlash-dt);bat.setAttribute('transform',swingFlash?'rotate(-85 427 268)':'');});
moveAim(ax,ay);update();root.append(node('p','note','金框是你移動的打擊位置，白色虛線框是固定好球帶。先用滑鼠或手指瞄準，再按下方「打擊！」；電腦也能在球場用方向鍵瞄準、空白鍵打擊。'));
api.announce('先按投下一球，把金色打擊框移到藍色落點圈，等球靠近，再按打擊。可以用滑鼠或手指移動框框。');
}else if(id==='coffee'){
const s=scene('咖啡操作台：磨豆機、手沖壺、濾杯和咖啡杯。');s.append(svg('rect',{width:600,height:320,fill:'#f3ecd9'}),svg('rect',{x:0,y:278,width:600,height:42,fill:'#d8bd92'}));
const grinder=svg('g');grinder.append(svg('rect',{x:55,y:115,width:110,height:135,rx:18,fill:'#b39473'}),svg('ellipse',{cx:110,cy:112,rx:50,ry:18,fill:'#72533a'}));const handle=svg('line',{x1:110,y1:82,x2:175,y2:82,stroke:'#42664d','stroke-width':9,'stroke-linecap':'round'});grinder.append(handle);s.append(grinder,svg('path',{d:'M280 125 L400 125 L370 190 L310 190 Z',fill:'#fdfbf3',stroke:'#9b886e','stroke-width':3}),svg('path',{d:'M300 130 L380 130 L365 163 L315 163 Z',fill:'#795039'}),svg('rect',{x:300,y:198,width:80,height:78,rx:12,fill:'#fffdf8',stroke:'#9b886e','stroke-width':3}));
const liquid=svg('rect',{x:305,y:268,width:70,height:0,rx:6,fill:'#795039'});s.append(liquid);const kettle=svg('g');kettle.append(svg('path',{d:'M450 68 Q425 130 470 136 L525 136 Q550 100 520 68 Z',fill:'#85a99e'}),svg('path',{d:'M451 100 L412 83 L406 98 L448 120',fill:'#85a99e'}));s.append(kettle);const stream=svg('path',{d:'M410 96 Q372 95 340 132',fill:'none',stroke:'#74b7cb','stroke-width':6,'stroke-dasharray':'6 5',visibility:'hidden'});s.append(stream);
let ground=0,water=0,phase='grind',angle=0;const gauge=node('p','ag-score');root.prepend(gauge);
const grind=btn('轉一下磨豆機',()=>{if(paused||phase!=='grind')return;ground=Math.min(100,ground+20);angle+=60;handle.setAttribute('transform','rotate('+angle+' 110 82)');if(ground===100){phase='pour';tell('磨好了！按住注水，水量到一百八十毫升時就可以放開。');}update();},'primary');
const pour=btn('按住注水',()=>{},'primary');hold(pour,down=>{holding=down&&!paused&&phase==='pour';});
const serve=btn('端給鼠媽媽',()=>{if(paused||water<140||phase==='done')return;phase='done';holding=false;tell(water>=170&&water<=195?'鼠媽媽收到剛剛好的手沖咖啡！謝謝你的用心。':'這杯是你的特調！下次試試注到一百八十毫升。');update();},'primary');
function reset(){ground=water=angle=0;phase='grind';holding=false;stream.setAttribute('visibility','hidden');tip.textContent='先轉五下磨豆機，再按住注水。';update();}
function update(){gauge.textContent=phase==='grind'?'磨豆進度 '+ground+'%':'注水 '+Math.round(water)+' / 180 毫升';grind.disabled=phase!=='grind';pour.disabled=phase!=='pour';serve.disabled=water<140||phase==='done';liquid.setAttribute('height',water/210*65);liquid.setAttribute('y',273-water/210*65);kettle.setAttribute('transform',holding?'rotate(-12 470 115)':'');}
controls.append(grind,pour,serve,pause,btn('再沖一杯',reset));root.append(node('p','note','螢幕裡放心玩；真的熱水交給大人。小朋友不需要喝咖啡。'));
loop(dt=>{if(holding&&phase==='pour'){water=clamp(water+dt*42,0,210);if(water>=210){holding=false;tell('水量已滿，自動停止。可以端出你的特調。');}update();}stream.setAttribute('visibility',holding?'visible':'hidden');});reset();api.announce('先按磨豆機五次，再按住注水。放開就停，一百八十毫升左右，端給鼠媽媽。');
}else if(id==='kingdoms'){
const s=scene('三國小戰場：移動雞爸爸武將，揮刀擊退靠近城門的敵兵。');s.append(svg('rect',{width:600,height:320,fill:'#dfe8ce'}),svg('path',{d:'M0 255 H600',stroke:'#ddc795','stroke-width':60}),svg('rect',{x:10,y:105,width:45,height:100,fill:'#9b886d'}),svg('text',{x:14,y:95,'font-size':17},'城門'));
const player=svg('image',{href:'/assets/img/portrait-dad.png',width:45,height:64});s.append(player);const slash=svg('circle',{r:76,fill:'#f5d680','fill-opacity':'.5',stroke:'#bc8c30','stroke-width':3,visibility:'hidden'});s.append(slash);
let x=180,y=160,spawned=0,beaten=0,gate=6,time=0,cooldown=0,flash=0,ended=false;const enemies=[],directions=new Set();const score=node('p','ag-score');root.prepend(score);
function update(){score.textContent='守住城門 '+gate+' / 6 · 擊退 '+beaten+' / 10';player.setAttribute('x',x-22);player.setAttribute('y',y-40);slash.setAttribute('cx',x);slash.setAttribute('cy',y);}
function end(won){ended=true;tell(won?'守城成功！你擊退了'+beaten+'名敵兵，城門還有'+gate+'格力量。':'城門需要休息了。再玩一次，也可以把敵兵引到一起再揮刀。');}
function attack(){if(paused||ended||cooldown>0)return;cooldown=.28;flash=.16;for(const e of enemies)if(!e.gone&&Math.hypot(e.x-x,e.y-y)<90){e.gone=true;e.node.remove();beaten++;}if(beaten>=10)end(true);update();}
const pad=node('div','ag-pad');[['↑','up'],['←','left'],['↓','down'],['→','right']].forEach(([label,dir])=>{const b=btn(label,()=>{});b.setAttribute('aria-label','往'+({up:'上',left:'左',down:'下',right:'右'}[dir])+'移動');hold(b,down=>down?directions.add(dir):directions.delete(dir));pad.append(b);});controls.append(pad,btn('揮刀！',attack,'primary ag-hit'),pause,btn('重新守城',()=>{enemies.forEach(e=>e.node.remove());enemies.length=0;spawned=beaten=0;gate=6;time=0;ended=false;x=180;y=160;directions.clear();tip.textContent='守住城門！靠近敵兵，再按揮刀。';update();}));
screen.tabIndex=0;screen.setAttribute('aria-label','戰場，點選後可用方向鍵移動、空白鍵揮刀');const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};
on(screen,'keydown',e=>{if(keys[e.code]){e.preventDefault();directions.add(keys[e.code]);}if(e.code==='Space'){e.preventDefault();attack();}});on(screen,'keyup',e=>{if(keys[e.code]){e.preventDefault();directions.delete(keys[e.code]);}});on(screen,'blur',()=>directions.clear());on(document,'visibilitychange',()=>directions.clear());
loop(dt=>{if(ended)return;cooldown=Math.max(0,cooldown-dt);flash=Math.max(0,flash-dt);x=clamp(x+((directions.has('right')?1:0)-(directions.has('left')?1:0))*150*dt,65,565);y=clamp(y+((directions.has('down')?1:0)-(directions.has('up')?1:0))*150*dt,45,285);time-=dt;if(time<=0&&spawned<10){spawned++;time=2.4;const e={x:560,y:65+Math.random()*185,gone:false,node:svg('g')};e.node.append(svg('circle',{r:16,fill:'#9e6d4f',stroke:'#fffdf8','stroke-width':2}),svg('text',{x:-9,y:6,'font-size':18,fill:'white'},'兵'));s.append(e.node);enemies.push(e);s.append(slash,player);}for(const e of enemies){if(e.gone)continue;e.x-=29*dt;e.node.setAttribute('transform','translate('+e.x+' '+e.y+')');if(e.x<48){e.gone=true;e.node.remove();gate--;if(gate<=0)end(false);}}if(spawned===10&&enemies.every(e=>e.gone)&&!ended)end(gate>0);slash.setAttribute('visibility',flash?'visible':'hidden');update();});update();api.announce('按方向按鈕移動，靠近敵兵，按揮刀。守住左邊城門。不用碰到敵兵，靠近一點就打得到。');
}else if(id==='strategy'){
let state=newKingdom();screen.classList.add('ag-map');const score=node('p','ag-score');root.prepend(score);const selected=node('p','ag-selected');root.append(selected);
function render(){screen.replaceChildren();score.textContent='第 '+state.turn+' 回合 · 金 '+state.gold+' · 糧 '+state.food+' · 兵 '+state.troops+' · 剩 '+state.actions+' 行動';state.cities.forEach((c,i)=>{const b=btn(c.name+'\n'+({you:'我方',enemy:'對方',neutral:'未加入'}[c.owner])+' · 守軍 '+c.def,()=>{state.selected=i;render();});b.className='ag-city '+c.owner;b.setAttribute('aria-pressed',String(state.selected===i));screen.append(b);});const c=state.cities[state.selected];selected.textContent='選中：'+c.name+'。'+(c.owner==='you'?'這座城每回合提供三金、五糧。':'攻城需 '+(c.def+2)+' 兵和三糧。只能攻相鄰城池。');}
function act(type){if(paused)return;const result=kingdomAct(state,type);state=result.state;render();tell(result.text);}
controls.append(btn('準備糧食 −2金',()=>act('farm')),btn('招兵 +6兵',()=>act('recruit')),btn('攻下選中的城',()=>act('attack'),'primary'),btn('下一回合',()=>act('turn'),'primary'),pause,btn('重新開局',()=>{state=newKingdom();render();tell('從成都出發。先選相鄰城池，招兵或準備糧食，再攻城。');}));root.append(node('p','note','原創簡化策略玩法。每回合兩個行動，城池上下左右相鄰；第三回合後，鄰近敵城可能發動試探。這是想像的棋盤地圖，不是真實地理位置。'));render();api.announce('從成都開始，選一座相鄰城池，準備糧食、招兵，再攻城。每回合可以做兩個行動。');
}
return ()=>{disposed=true;cancelAnimationFrame(frame);cleanups.forEach(fn=>fn());};
}
window.CDJActionGames={mount};
})();

