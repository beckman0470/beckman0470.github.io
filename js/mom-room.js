(()=>{'use strict';
if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='mom')return;
const stage=document.querySelector('.cdj-greeting[data-room=mom]'),host=document.querySelector('#house-content');if(!stage||!host)return;
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const btn=(label,fn)=>{const b=make('button','mom-button',label);b.type='button';b.onclick=fn;return b;};
const style=make('link');style.rel='stylesheet';style.href='/css/mom-room.css?v=20261108-mom12';document.head.append(style);
const routineStyle=make('link');routineStyle.rel='stylesheet';routineStyle.href='/play/dodo-zones.css?v=20261108-mom12';document.head.append(routineStyle);
const base='/assets/greetings/v1/';const scene=stage.querySelector('.greeting-scene');scene.style.backgroundImage='url('+base+'room-mom-12.webp)';
stage.querySelectorAll('.room-rest-control,.room-item-hotspots,.room-background-map').forEach(e=>e.remove());
function jump(id){const e=document.getElementById(id);if(!e)return;e.tabIndex=-1;e.focus({preventScroll:true});e.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});}
const entries=[['mom-plan','鼠媽媽排行程'],['mom-life','鼠姊姊的一天'],['mom-needs','弟弟怎麼了？']];
const blocks=entries.map(([id,label])=>{const section=make('section','mom-room-block');section.id=id;section.setAttribute('aria-label',label);section.append(make('h2','',label));return section;});
host.prepend(...blocks);const [plan,life,needs]=blocks;life.classList.add('dr-life');
const routines=make('script');routines.src='/js/mom-routines.js?v=20261108-mom12';document.body.append(routines);
const people=[...stage.querySelectorAll('.greeting-character:not(.greeting-cat)')];
['mom-vanity-12','dodo-wake-12','dragon-needs-12'].forEach((name,i)=>{const p=people[i];p.classList.add('mom-task-character');p.querySelector('.greeting-sprite').style.backgroundImage='url('+base+name+'.webp)';p.setAttribute('aria-label',entries[i][1]+'：前往小遊戲');p.onclick=()=>jump(entries[i][0]);});
const quick=make('nav','mom-quick-links');quick.setAttribute('aria-label','鼠窩生活小遊戲');entries.forEach(([id,label])=>{const a=make('a','',label);a.href='#'+id;a.onclick=e=>{e.preventDefault();jump(id);};quick.append(a);});stage.append(quick);
const calendar=btn('',()=>jump('mom-plan'));calendar.className='mom-calendar-hit';calendar.setAttribute('aria-label','梳妝台行事曆：幫鼠媽媽排行程');calendar.title='幫鼠媽媽排行程';stage.append(calendar);
const dodoLabel=make('a','mom-dodo-label','鼠姊姊的一天');dodoLabel.href='#mom-life';dodoLabel.onclick=e=>{e.preventDefault();jump('mom-life');};stage.append(dodoLabel);
stage.querySelector('.greeting-caption').textContent='';
// Positions use the room image coordinates, including its crop on small screens.
const anchors=[[165,565,285],[440,540,195],[770,265,155]];
function align(){const r=scene.getBoundingClientRect(),p=stage.getBoundingClientRect(),z=Math.max(r.width/960,r.height/640),pos=getComputedStyle(scene).backgroundPosition.split(' '),dx=r.left-p.left+(r.width-960*z)*parseFloat(pos[0])/100,dy=r.top-p.top+(r.height-640*z)*parseFloat(pos[1]||pos[0])/100;
anchors.forEach(([x,y,size],i)=>{people[i].style.setProperty('left',dx+x*z+'px','important');people[i].style.setProperty('bottom',p.height-dy-y*z+'px','important');people[i].style.setProperty('--frame',size*z+'px','important');});
Object.assign(calendar.style,{left:dx+215*z+'px',top:dy+235*z+'px',width:65*z+'px',height:72*z+'px'});
Object.assign(dodoLabel.style,{left:dx+440*z+'px',top:dy+551*z+'px'});}
new ResizeObserver(align).observe(scene);style.onload=align;align();
// The original five-day ordering game, now played directly in Mom's room.
const plans=[
 [[8,'吃早餐'],[10,'帶孩子去公園'],[12,'準備午餐']],
 [[9,'整理家裡'],[11,'採買食材'],[14,'讀故事書']],
 [[7,'起床梳妝'],[8,'送姊姊到學校'],[16,'接姊姊回家']],
 [[14,'整理玩具'],[16,'準備點心'],[18,'一起吃晚餐']],
 [[15,'陪貓咪玩'],[18,'一起吃晚餐'],[20,'陪孩子準備睡覺']]
];
plan.append(make('p','','看行事曆上的時間，依序點選三件事，幫鼠媽媽從早到晚安排好。'));
const planStatus=make('p','mom-status'),timeline=make('ol','mom-timeline'),cards=make('div','mom-plan-cards'),planFeedback=make('p','mom-feedback'),tools=make('div','mom-tools');planFeedback.setAttribute('role','status');
let day=0,picked=[],order=[],checked=false;
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const undo=btn('退回一張',()=>{if(!checked){picked.pop();planFeedback.textContent='';drawPlan();}}),check=btn('排好了！',()=>{if(picked.length!==3||checked)return;if(!picked.every((v,i)=>v===i)){planFeedback.textContent='再看看時間，較早的事先做。可以退回一張，調整順序。';return;}checked=true;drawPlan();planFeedback.textContent=day===4?'五天都安排好了！你是鼠媽媽的時間小幫手。':'安排好了，鼠媽媽可以照計畫出發囉！';next.hidden=day===4;});
const next=btn('下一天 →',()=>{day++;freshPlan();}),reset=btn('重新開始',()=>{day=0;freshPlan();});
tools.append(undo,check,next,reset);plan.append(planStatus,timeline,cards,tools,planFeedback);
function freshPlan(){picked=[];checked=false;order=shuffle([0,1,2]);if(order.every((v,i)=>v===i))order.reverse();planFeedback.textContent='';next.hidden=true;drawPlan();}
function drawPlan(){planStatus.textContent='第 '+(day+1)+' / 5 天';timeline.replaceChildren();for(let i=0;i<3;i++){const item=picked[i]!==undefined?plans[day][picked[i]]:null;timeline.append(make('li','',item?String(item[0]).padStart(2,'0')+':00 '+item[1]:'第 '+(i+1)+' 件事'));}cards.replaceChildren();order.forEach(i=>{const [time,label]=plans[day][i],b=btn('',()=>{picked.push(i);planFeedback.textContent='';drawPlan();});b.append(make('time','',String(time).padStart(2,'0')+':00'),make('strong','',label));b.disabled=checked||picked.includes(i);cards.append(b);});undo.disabled=checked||!picked.length;check.disabled=checked||picked.length!==3;}
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
