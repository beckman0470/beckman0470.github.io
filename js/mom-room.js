(()=>{'use strict';
if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='mom')return;
const stage=document.querySelector('.cdj-greeting[data-room=mom]'),host=document.querySelector('#house-content');if(!stage||!host)return;
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const btn=(label,fn)=>{const b=make('button','mom-button',label);b.type='button';b.onclick=fn;return b;};
const style=make('link');style.rel='stylesheet';style.href='/css/mom-room.css?v=20261108-mom12';document.head.append(style);
const compact=make('style');compact.textContent='.mom-room-block > summary{cursor:pointer;font-size:clamp(18px,4vw,24px);font-weight:750;min-height:44px;align-content:center}.mom-room-block:not([open]){padding:10px 16px;margin:8px 0}.mom-button[hidden],.mom-timeline[hidden]{display:none!important}.mom-plan-cards button > span{display:block}';document.head.append(compact);
const routineStyle=make('link');routineStyle.rel='stylesheet';routineStyle.href='/play/dodo-zones.css?v=20261108-mom12';document.head.append(routineStyle);
const base='/assets/greetings/v1/';const scene=stage.querySelector('.greeting-scene');scene.style.backgroundImage='url('+base+'room-mom-12.webp)';
stage.querySelectorAll('.room-rest-control,.room-item-hotspots,.room-background-map').forEach(e=>e.remove());
function jump(id){const e=document.getElementById(id);if(!e)return;if(e.tagName==='DETAILS')e.open=true;e.tabIndex=-1;e.focus({preventScroll:true});e.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});}
const entries=[['mom-plan','鼠媽媽排行程'],['mom-life','鼠姊姊的一天'],['mom-needs','弟弟怎麼了？']];
const blocks=entries.map(([id,label])=>{const section=make('details','mom-room-block');section.id=id;section.setAttribute('name','mom-activities');section.setAttribute('aria-label',label);section.append(make('summary','',label));return section;});
const legacyHeading=[...host.children].find(e=>e.tagName==='H2'&&e.textContent==='要聽故事睡覺了嗎？');
if(legacyHeading?.nextElementSibling?.classList.contains('house-cards')){
 legacyHeading.nextElementSibling.remove();
 legacyHeading.remove();
}
host.prepend(...blocks);const [plan,life,needs]=blocks;life.classList.add('dr-life');
const routines=make('script');routines.src='/js/mom-routines.js?v=20261109-room14';document.body.append(routines);
const people=[...stage.querySelectorAll('.greeting-character:not(.greeting-cat)')];
['mom-vanity-12','dodo-wake-12','dragon-needs-12'].forEach((name,i)=>{const p=people[i];if(!p)return;p.classList.add('mom-task-character');p.querySelector('.greeting-sprite').style.backgroundImage='url('+base+name+'.webp)';p.setAttribute('aria-label',entries[i][1]+'：前往小遊戲');p.onclick=()=>jump(entries[i][0]);});
const calendar=btn('',()=>jump('mom-plan'));calendar.className='mom-calendar-hit';calendar.setAttribute('aria-label','梳妝台行事曆：幫鼠媽媽排行程');calendar.title='幫鼠媽媽排行程';stage.append(calendar);
stage.querySelector('.greeting-caption').textContent='';
// Positions use the room image coordinates, including its crop on small screens.
const anchors=[[165,565,285],[440,540,240],[770,265,145]];
function align(){const r=scene.getBoundingClientRect(),p=stage.getBoundingClientRect(),z=Math.max(r.width/960,r.height/640),pos=getComputedStyle(scene).backgroundPosition.split(' '),dx=r.left-p.left+(r.width-960*z)*parseFloat(pos[0])/100,dy=r.top-p.top+(r.height-640*z)*parseFloat(pos[1]||pos[0])/100;
anchors.forEach(([x,y,size],i)=>{people[i]?.style.setProperty('left',dx+x*z+'px','important');people[i]?.style.setProperty('bottom',p.height-dy-y*z+'px','important');people[i]?.style.setProperty('--frame',size*z+'px','important');});
Object.assign(calendar.style,{left:dx+215*z+'px',top:dy+235*z+'px',width:65*z+'px',height:72*z+'px'});}
new ResizeObserver(align).observe(scene);style.onload=align;align();
// Choose what to do before each outing. Each activity uses part of the available time.
const missions=[
 {title:'校車快到了',minutes:25,goal:'校車出發前，要吃早餐、帶好書包。',tasks:[['吃早餐',10,true],['找玩具',10,false],['裝好書包',5,true],['看一集卡通',15,false]]},
 {title:'突然下雨了',minutes:25,goal:'出門前要收陽台衣服，也要準備雨具。',tasks:[['找雨傘',5,true],['整理抽屜',15,false],['收陽台衣服',10,true],['和貓咪玩',10,false]]},
 {title:'出發去野餐',minutes:30,goal:'離開家前，要裝好水壺和午餐。',tasks:[['找好看的貼紙',10,false],['把水壺裝滿',10,true],['準備午餐盒',15,true],['先看一本故事書',15,false]]},
 {title:'睡前半小時',minutes:30,goal:'睡前一定要洗澡、刷牙。先留時間做完，再想要不要聽故事。',tasks:[['聽故事',10,false],['洗澡',15,true],['整理全部玩具',20,false],['刷牙',5,true]]}
];
const planStatus=make('p','mom-status'),brief=make('p',''),timer=make('p','mom-clue'),timeline=make('ol','mom-timeline'),cards=make('div','mom-plan-cards'),planFeedback=make('p','mom-feedback'),tools=make('div','mom-tools');
planFeedback.setAttribute('role','status');
let day=0,picked=[],checked=false;
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const undo=btn('退回上一件',()=>{picked.pop();planFeedback.textContent='';drawPlan();});
const check=btn('確認出發',()=>{
 const mission=missions[day];
 const missing=mission.tasks.filter((task,i)=>task[2]&&!picked.includes(i));
 if(missing.length){planFeedback.textContent='還要做「'+missing.map(task=>task[0]).join('、')+'」。時間不夠時，可以退回上一件。';return;}
 checked=true;
 planFeedback.textContent=day===missions.length-1?'四個行程都安排好了！':'必要的事都做完了，還有 '+remaining()+' 分鐘。';
 drawPlan();
});
const next=btn('下一個情境',()=>{day++;freshPlan();});
const reset=btn('重排這一關',freshPlan);
const replay=btn('再玩一輪',()=>{day=0;freshPlan();});
tools.append(undo,check,next,reset,replay);
plan.append(planStatus,brief,timer,timeline,cards,tools,planFeedback);
function remaining(){const mission=missions[day];return mission.minutes-picked.reduce((sum,i)=>sum+mission.tasks[i][1],0);}
function freshPlan(){picked=[];checked=false;planFeedback.textContent='';drawPlan();}
function drawPlan(){
 const mission=missions[day];
 planStatus.textContent='第 '+(day+1)+' / '+missions.length+' 關 · '+mission.title;
 brief.textContent=mission.goal;
 timer.textContent='還剩 '+remaining()+' 分鐘';
 timeline.replaceChildren(...picked.map(i=>make('li','',mission.tasks[i][0])));
 timeline.hidden=!picked.length;
 cards.replaceChildren();
 mission.tasks.forEach(([label,time],i)=>{
  const b=btn('',()=>{picked.push(i);planFeedback.textContent='';drawPlan();});
  b.append(make('strong','',label),make('span','',time+' 分鐘'));
  b.disabled=checked||picked.includes(i)||time>remaining();
  cards.append(b);
 });
 undo.disabled=checked||!picked.length;
 check.disabled=checked||!picked.length;
 next.hidden=!checked||day===missions.length-1;
 replay.hidden=!checked||day!==missions.length-1;
}
freshPlan();
// Picture clues, with an original synthesized crying sound after explicit taps only.
const cases=[
 {label:'要換尿布',clue:'弟弟扭來扭去，手一直放在尿布的位置。',answer:'換尿布',reply:'換好乾淨尿布，弟弟舒服多了。'},
 {label:'要喝奶奶',clue:'弟弟拿著空奶瓶，伸手想找奶奶。',answer:'喝奶奶',reply:'原來是肚子餓，準備奶奶囉。'},
 {label:'想喝水',clue:'弟弟舉起空水杯，一直指著杯子。',answer:'喝水',reply:'補充一點水，弟弟開心了。'},
 {label:'太熱睡不著',clue:'弟弟臉紅紅、流汗，把小毯子推開了。',answer:'調整室溫',reply:'把環境調整舒服，弟弟可以好好休息了。'}
];
needs.append(make('p','','先看弟弟的表情、動作和手裡的東西，再猜他需要什麼。'));
const needsLayout=make('div','mom-needs-layout'),pic=make('div','mom-needs-picture'),question=make('div'),clue=make('p','mom-clue'),choices=make('div','mom-choices'),needFeedback=make('p','mom-feedback'),needTools=make('div','mom-tools'),needStatus=make('p','mom-status');
pic.setAttribute('role','img');needFeedback.setAttribute('role','status');question.append(needStatus,clue,choices,needTools,needFeedback,make('small','mom-audio-note','點按才播放合成哭聲；這是看圖找需求的小遊戲。'));needsLayout.append(pic,question);needs.append(needsLayout);
let deck=shuffle([0,1,2,3]),round=0,solved=false,audioContext=null,audioTimer=null;const voices=[];
function stopCry(){clearTimeout(audioTimer);while(voices.length){const v=voices.pop();try{v.stop();}catch(_){}}hear.disabled=false;}
async function cry(){stopCry();const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio){needFeedback.textContent='這個裝置無法播放合成哭聲，仍然可以看圖作答。';return;}try{audioContext??=new Audio();await audioContext.resume();const start=audioContext.currentTime;hear.disabled=true;
for(let n=0;n<3;n++){const t=start+n*.85,amp=audioContext.createGain(),filter=audioContext.createBiquadFilter(),osc=audioContext.createOscillator();osc.type='sawtooth';osc.frequency.setValueAtTime(420,t);osc.frequency.exponentialRampToValueAtTime(650,t+.18);osc.frequency.exponentialRampToValueAtTime(360,t+.65);filter.type='lowpass';filter.frequency.value=1700;filter.Q.value=.65;amp.gain.setValueAtTime(0,t);amp.gain.linearRampToValueAtTime(.025,t+.1);amp.gain.linearRampToValueAtTime(.012,t+.4);amp.gain.linearRampToValueAtTime(0,t+.72);osc.connect(filter);filter.connect(amp);amp.connect(audioContext.destination);osc.start(t);osc.stop(t+.74);voices.push(osc);osc.onended=()=>{amp.disconnect();filter.disconnect();osc.disconnect();};}audioTimer=setTimeout(stopCry,2600);
}catch(_){stopCry();needFeedback.textContent='聲音尚未啟用，可以先看圖片找線索。';}}
const hear=btn('聽哭聲',cry),mute=btn('停止哭聲',stopCry),needNext=btn('下一個情境 →',()=>{round++;drawNeed();}),needReset=btn('重新猜一輪',()=>{stopCry();deck=shuffle([0,1,2,3]);round=0;drawNeed();});needTools.append(hear,mute,needNext,needReset);
function drawNeed(){stopCry();solved=false;needFeedback.textContent='';needNext.hidden=true;if(round>=4){choices.replaceChildren();needStatus.textContent='4 / 4 完成';clue.textContent='你找到弟弟的四種小需求了！';pic.style.backgroundPosition='0 0';pic.setAttribute('aria-label','弟弟的需求圖片');hear.disabled=true;needFeedback.textContent='再玩一輪，繼續練習觀察。';return;}
const id=deck[round],item=cases[id];needStatus.textContent='情境 '+(round+1)+' / 4';pic.style.backgroundPosition=(id%2*100)+'% '+(Math.floor(id/2)*100)+'%';pic.setAttribute('aria-label',item.clue);clue.textContent=item.clue;choices.replaceChildren();cases.forEach(c=>{const b=btn(c.answer,()=>{if(solved)return;if(c!==item){needFeedback.textContent='再看一次圖片，'+item.clue;return;}solved=true;stopCry();choices.querySelectorAll('button').forEach(x=>x.disabled=true);b.classList.add('is-correct');needFeedback.textContent='猜對了！'+item.reply;needNext.hidden=false;needNext.textContent=round===3?'看看成果 →':'下一個情境 →';});choices.append(b);});}
drawNeed();document.addEventListener('visibilitychange',()=>{if(document.hidden)stopCry();});window.addEventListener('pagehide',stopCry);
if(location.hash&&entries.some(([id])=>'#'+id===location.hash)){routines.onload=()=>jump(location.hash.slice(1));}
})();
