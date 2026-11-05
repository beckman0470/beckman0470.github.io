/* Six family mini-games. All progress stays in this page. */
(()=>{
'use strict';
const cards=[
['feed','🥣','幫右右找點心','點選或拖曳食物，餵飽右右陪牠睡。','龍弟弟'],
['memory','🐾','雅虎記憶翻牌','兩張一樣就是一對，姊弟都能挑戰。','2 組／6 組'],
['count','🐈','貓咪排排隊','找大小、數貓咪，慢慢觀察就能答對。','大小／數數'],
['jump','📦','雅虎跳跳樂','抓好時機跳過紙箱，收集五顆星。','慢速／一般'],
['phonetic','🎩','注音找物品','ㄇ是帽子的開頭！找出注音朋友。','鼠姊姊'],
['post','✉️','ABC 小郵差','把小寫字母送進大寫信箱。','鼠姊姊']
];
const css=document.createElement('style');css.textContent=`
.mg-section{margin:28px 0 36px}.mg-kicker{text-align:center;color:#426b54;letter-spacing:2px;font-size:13px;font-weight:750}.mg-title{text-align:center;font-size:28px;margin:10px 0 22px}.mg-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.mg-card{text-align:left;border:1px solid #dcded0;border-radius:22px;padding:22px;background:#fff;box-shadow:0 5px 18px #304d3608;color:#353e39;transition:transform .18s}.mg-card:hover{transform:translateY(-3px)}.mg-card .mg-icon{font-size:34px;display:block;margin-bottom:10px}.mg-card strong{display:block;font-size:20px}.mg-card small{display:block;color:#73796b;line-height:1.7;margin:10px 0}.mg-tag{display:inline-block;border-radius:999px;background:#eef1df;color:#4d6d43;font-size:12px;padding:4px 10px}.mg-panel{border:1px solid #d9ddcc;border-radius:26px;background:white;padding:24px;margin:20px 0}.mg-top{display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap}.mg-top h2{margin:8px 0;font-size:27px}.mg-stage{background:#f7f8f0;border-radius:20px;padding:24px;margin-top:20px;text-align:center;min-height:330px}.mg-stage button{font:inherit}.mg-status{min-height:32px;color:#426b54;font-size:18px;font-weight:700;line-height:1.7;margin:16px 0}.mg-choices{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin:20px 0}.mg-choice{background:#fff;border:2px solid #dde1d1;border-radius:18px;padding:18px;min-width:90px;min-height:78px;font-size:28px;color:#384331}.mg-choice:disabled{opacity:1}.mg-choice.correct{background:#dcecd5;border-color:#729b61}.mg-choice.wrong{background:#ffeedb;border-color:#dda86c}.mg-cat{width:190px;height:180px;object-fit:contain;display:block;margin:12px auto}.mg-counter{color:#6e7767;font-size:14px;margin:10px}.mg-bowl{border:2px dashed #b5c4a1;border-radius:24px;padding:18px;min-height:86px;max-width:400px;margin:16px auto;font-size:32px;background:#fffaf1}.mg-food{font-size:32px}.mg-sizes{display:flex;justify-content:center;align-items:flex-end;gap:12px;min-height:180px}.mg-sizes button{border:2px solid #dce0d2;border-radius:18px;background:#fff;padding:10px;min-width:64px}.mg-sizes img{object-fit:contain;max-width:100%}.mg-cats-count{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:450px;margin:22px auto}.mg-cats-count img{width:64px;height:64px;object-fit:contain}.mg-memory{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:680px;margin:20px auto}.mg-memory.easy{grid-template-columns:repeat(2,minmax(0,1fr));max-width:400px}.mg-memory button{height:118px;min-width:0;border:2px solid #d7dfc8;border-radius:18px;background:#e8efdf;font-size:38px;color:#456239}.mg-memory button img{width:100%;height:100%;object-fit:contain}.mg-memory button.matched{background:#fff5da;border-color:#d5b26c}.mg-word{font-size:20px;font-weight:650;display:block}.mg-emoji{font-size:44px;display:block;margin-bottom:6px}.mg-big-letter{font-size:76px;font-weight:800;color:#426b54;line-height:1.4;margin:16px auto}.mg-letter-mail{border:2px dashed #c5b48b;background:#fff6dc;border-radius:16px;width:140px;margin:20px auto;padding:12px;font-size:64px;cursor:grab}.mg-mailbox{min-width:100px;min-height:120px;background:#eff3e6;font-size:46px}.mg-mailbox small{display:block;font-size:15px}.mg-running{position:relative;height:220px;max-width:740px;margin:20px auto;border-radius:22px;overflow:hidden;background:linear-gradient(#e8f2e2 0%,#f5f3db 76%,#d8e0bd 76%);border:1px solid #d4ddc4;touch-action:manipulation}.mg-run-cat{position:absolute;left:40px;bottom:48px;width:74px;height:64px;object-fit:contain;pointer-events:none}.mg-box{position:absolute;left:0;bottom:48px;width:38px;height:43px;background:#bc8d53;border:3px solid #916b3f;border-radius:5px;color:#fff3d6;font-size:26px;font-weight:800;line-height:36px;pointer-events:none}.mg-track-text{position:absolute;top:16px;left:20px;color:#758267;font-size:14px}.mg-config{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:14px 0}.mg-config button[aria-pressed=true]{background:#426b54;color:white}.mg-tip{color:#6a7465;font-size:14px;line-height:1.7}.mg-panel[hidden],.mg-section[hidden],.tabs[hidden]{display:none!important}.mg-sizes button{flex:1;max-width:175px;height:180px;display:flex;align-items:flex-end;justify-content:center}.mg-pet{border:0;background:none;padding:0}.mg-pet.roll img{animation:mg-roll .6s ease-in-out}@keyframes mg-roll{50%{transform:rotate(12deg) translateY(-4px)}}@media(max-width:680px){.mg-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mg-card{padding:16px}.mg-card strong{font-size:18px}.mg-panel{padding:16px}.mg-stage{padding:18px 12px}.mg-memory{gap:8px;grid-template-columns:repeat(3,minmax(0,1fr))}.mg-memory button{height:100px}.mg-choices{gap:10px}.mg-choice{padding:12px;min-width:70px}.mg-cats-count img{width:50px;height:50px}.mg-cat{width:165px;height:165px}}@media(max-width:380px){.mg-grid{grid-template-columns:1fr}.mg-card .mg-icon{float:right}.mg-mailbox{min-width:66px}}@media(prefers-reduced-motion:reduce){.mg-card,.mg-pet img{transition:none!important;animation:none!important}}
`;document.head.append(css);
const root=document.createElement('section');root.className='mg-section';root.innerHTML='<p class="mg-kicker">今天的小冒險</p><h2 class="mg-title">六個新遊戲，挑一個來玩</h2><div class="mg-grid"></div>';
const grid=root.querySelector('.mg-grid'),panel=document.createElement('section');panel.className='mg-panel';panel.hidden=true;panel.setAttribute('aria-label','小遊戲');
document.querySelector('.tabs').before(root,panel);
let cleanup=()=>{},active='';
const img=(name,pose='peek')=>'/cat-'+name+'-'+pose+'.png?v=20261105-art1';
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function btn(text,cls='mg-choice',fn){const b=el('button',cls,text);b.type='button';if(fn)b.addEventListener('click',fn);return b;}
function shuffle(xs){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function sound(){if(typeof tone==='function')tone('good');}
function catImage(name,pose,cls='mg-cat'){const e=el('img',cls);e.src=img(name,pose);e.alt=name==='yahoo'?'雅虎':'右右';e.draggable=false;return e;}
function hideOriginal(hide){document.querySelector('.tabs').hidden=hide;document.querySelectorAll('[role=tabpanel]').forEach(p=>{p.hidden=hide||document.querySelector('[aria-controls="'+p.id+'"]').getAttribute('aria-selected')!=='true';});}
function leave(){cleanup();cleanup=()=>{};active='';panel.hidden=true;root.hidden=false;hideOriginal(false);root.querySelector('button').focus({preventScroll:true});root.scrollIntoView({block:'start'});}
function shell(id){cleanup();cleanup=()=>{};active=id;root.hidden=true;hideOriginal(true);panel.hidden=false;panel.replaceChildren();const head=el('div','mg-top'),title=el('h2','',cards.find(x=>x[0]===id)[2]);title.tabIndex=-1;head.append(title,btn('← 返回遊戲選單','secondary',leave));const stage=el('div','mg-stage');panel.append(head,stage);panel.scrollIntoView({block:'start'});title.focus({preventScroll:true});return stage;}
function status(stage){const e=el('div','mg-status','');e.setAttribute('role','status');e.setAttribute('aria-live','polite');stage.append(e);return e;}
function configs(stage,choices,current,fn){const row=el('div','mg-config');choices.forEach(([v,t])=>{const b=btn(t,'pill',()=>fn(v));b.setAttribute('aria-pressed',String(v===current));row.append(b);});stage.append(row);}
cards.forEach(([id,icon,name,desc,tag])=>{const b=btn('','mg-card',()=>open(id));b.innerHTML='<span class="mg-icon" aria-hidden="true">'+icon+'</span><strong>'+name+'</strong><small>'+desc+'</small><span class="mg-tag">'+tag+'</span>';grid.append(b);});
function open(id){({feed,memory,count,jump,phonetic,post}[id])();}
function feed(){
const stage=shell('feed');stage.append(el('p','question','右右肚子餓了，餵牠 5 口點心吧。'));
let n=0;const pet=btn('','mg-pet');pet.setAttribute('aria-label','摸摸右右的肚子');const picture=catImage('youyou','peek');pet.append(picture);stage.append(pet);
const counter=el('p','mg-counter','已餵 0 / 5 口'),bowl=el('div','mg-bowl','🥣');bowl.setAttribute('aria-label','右右的食碗，可放入點心');stage.append(counter,bowl);
const row=el('div','mg-choices');stage.append(row);const feedback=status(stage);
function eat(food){if(n>=5)return;n++;bowl.textContent='🥣 '+Array(n).fill(food).join(' ');counter.textContent='已餵 '+n+' / 5 口';sound();feedback.textContent=n===5?'右右：吃飽了……呼嚕，陪我睡一下。':'右右：好好吃！還想再吃一口。';if(n===5){picture.src=img('youyou','sleep');row.querySelectorAll('button').forEach(b=>b.disabled=true);again.hidden=false;}}
[['🐟','魚點心'],['🍗','雞肉點心'],['🟤','貓飼料']].forEach(([emoji,name])=>{const b=btn(emoji+' '+name,'mg-choice mg-food',()=>eat(emoji));b.draggable=true;b.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',emoji));row.append(b);});
bowl.addEventListener('dragover',e=>e.preventDefault());bowl.addEventListener('drop',e=>{e.preventDefault();const data=e.dataTransfer.getData('text/plain');if(['🐟','🍗','🟤'].includes(data))eat(data);});
pet.addEventListener('click',()=>{if(n<5){feedback.textContent='右右：先陪我吃點心嘛～';return;}pet.classList.remove('roll');void pet.offsetWidth;pet.classList.add('roll');feedback.textContent='右右：呼嚕呼嚕，肚子好舒服。';sound();});
const again=btn('再陪右右玩一次 ↻','primary',feed);again.hidden=true;stage.append(again,el('p','mg-tip','手機直接點食物即可，也可以把食物拖進碗裡。'));
}
function memory(level='easy'){
const stage=shell('memory');configs(stage,[['easy','弟弟：2 組'],['hard','姊姊：6 組']],level,v=>memory(v));
stage.append(el('p','question','翻開兩張卡片，找到一模一樣的貓咪。'));
const poses=[['yahoo','peek','雅虎探頭'],['youyou','sleep','右右睡覺'],['yahoo','walk','雅虎散步'],['youyou','peek','右右探頭'],['yahoo','sleep','雅虎睡覺'],['youyou','walk','右右散步']].slice(0,level==='easy'?2:6);
const deck=shuffle(poses.flatMap((x,i)=>[{pair:i,pose:x},{pair:i,pose:x}])),board=el('div','mg-memory '+(level==='easy'?'easy':''));
let first=null,locked=false,matched=0,turns=0,timer;const counter=el('p','mg-counter','找到 0 / '+poses.length+' 組');stage.append(counter,board);const feedback=status(stage);cleanup=()=>clearTimeout(timer);
function close(c){c.b.replaceChildren(document.createTextNode('🐾'));c.b.setAttribute('aria-label','翻開第 '+(c.index+1)+' 張卡片');}
function reveal(c){c.b.replaceChildren(catImage(c.pose[0],c.pose[1],''));c.b.setAttribute('aria-label',c.pose[2]);}
deck.forEach((c,index)=>{c.index=index;c.b=btn('🐾','',()=>{if(locked||c.done||first===c)return;reveal(c);if(!first){first=c;return;}turns++;if(first.pair===c.pair){c.done=first.done=true;c.b.disabled=first.b.disabled=true;c.b.classList.add('matched');first.b.classList.add('matched');first=null;matched++;sound();counter.textContent='找到 '+matched+' / '+poses.length+' 組 · 翻了 '+turns+' 回';feedback.textContent=matched===poses.length?'全部找到了！你記得好清楚 ⭐':'找到一對了！';if(matched===poses.length)again.hidden=false;}else{locked=true;const previous=first;feedback.textContent='記住牠們的位置，再試一次。';timer=setTimeout(()=>{close(previous);close(c);first=null;locked=false;},850);}});close(c);board.append(c.b);});
const again=btn('再玩一回 ↻','primary',()=>memory(level));again.hidden=true;stage.append(again);
}
function count(mode='size'){
const stage=shell('count');configs(stage,[['size','弟弟：找大小'],['five','弟弟：數到 5'],['ten','姊姊：數到 10']],mode,v=>count(v));
let round=0;const content=el('div');stage.append(content);const feedback=status(stage),next=btn('下一題 →','primary',()=>{round++;render();});next.hidden=true;stage.append(next);
function render(){content.replaceChildren();feedback.textContent='';next.hidden=true;let done=false;
if(round>=5){content.append(el('h3','','五題完成！⭐ ⭐ ⭐ ⭐ ⭐'));next.hidden=true;content.append(btn('再玩一回 ↻','primary',()=>count(mode)));return;}
content.append(el('p','mg-counter','第 '+(round+1)+' / 5 題'));
function choose(correct,b){if(done)return;if(!correct){feedback.textContent='再看一看，慢慢找就可以。';b.classList.add('wrong');return;}done=true;b.classList.add('correct');feedback.textContent='答對了！你的觀察力真好。';sound();next.textContent=round===4?'看看我的小星星 ⭐':'下一題 →';next.hidden=false;}
if(mode==='size'){const big=Math.random()<.5;content.append(el('p','question','請找出'+(big?'最大':'最小')+'的貓咪。'));const sizes=shuffle([64,100,142]),row=el('div','mg-sizes');sizes.forEach((s,i)=>{const b=btn('','',()=>choose(s===(big?142:64),b));const image=catImage('youyou','peek','');image.style.width=(s/142*100)+'%';image.style.height='auto';b.setAttribute('aria-label','第 '+(i+1)+' 隻貓咪');b.append(image);row.append(b);});content.append(row);
}else{const max=mode==='five'?5:10,n=1+Math.floor(Math.random()*max);content.append(el('p','question','這裡一共有幾隻貓咪？'));const row=el('div','mg-cats-count');for(let i=0;i<n;i++)row.append(catImage(i%2?'youyou':'yahoo','peek',''));content.append(row);const choices=shuffle([n,...shuffle(Array.from({length:max+2},(_,i)=>i+1).filter(x=>x!==n)).slice(0,2)]),answers=el('div','mg-choices');choices.forEach(v=>{const b=btn(String(v),'mg-choice',()=>choose(v===n,b));answers.append(b);});content.append(answers);}}
render();
}
function jump(level='slow'){
const stage=shell('jump');configs(stage,[['slow','慢速'],['normal','一般']],level,v=>jump(v));stage.append(el('p','question','看到紙箱靠近，按「跳一下」！跳過 5 個就過關。'));
const track=el('div','mg-running'),label=el('div','mg-track-text','按開始後，雅虎就會出發。'),cat=catImage('yahoo','walk','mg-run-cat'),box=el('div','mg-box','✦');box.setAttribute('aria-hidden','true');track.append(label,cat,box);stage.append(track);
const counter=el('p','mg-counter','已跳過 0 / 5 個紙箱');stage.append(counter);const feedback=status(stage),row=el('div','mg-choices');stage.append(row);
let frame=0,last=0,y=0,velocity=0,x=0,score=0,running=false,paused=false,passed=false,ended=false;
const action=btn('開始出發 ▶','primary',()=>{if(!running){if(ended){score=0;counter.textContent='已跳過 0 / 5 個紙箱';}start();return;}if(paused){feedback.textContent='先按繼續，再跳一下。';return;}if(y===0)velocity=470;});
const pause=btn('暫停','secondary',()=>{if(!running)return;paused=!paused;cancelAnimationFrame(frame);pause.textContent=paused?'繼續':'暫停';last=0;feedback.textContent=paused?'先休息一下，準備好再繼續。':'';if(!paused)frame=requestAnimationFrame(tick);});pause.disabled=true;row.append(action,pause);
function draw(){cat.style.transform='translateY('+(-y)+'px)';box.style.transform='translateX('+x+'px)';}
function start(){cancelAnimationFrame(frame);running=true;paused=false;ended=false;last=0;y=0;velocity=0;score=score||0;x=Math.max(280,track.clientWidth)+30;passed=false;action.textContent='跳一下 ↑';pause.disabled=false;pause.textContent='暫停';label.textContent='雅虎出發囉！';feedback.textContent='';draw();frame=requestAnimationFrame(tick);}
function stop(win){running=false;ended=true;cancelAnimationFrame(frame);pause.disabled=true;action.textContent=win?'再玩一回 ↻':'再試一次 ↻';feedback.textContent=win?'五個都跳過了！雅虎好厲害 ⭐':'碰到紙箱了，沒關係，再試一次！';}
function tick(t){if(!running||paused)return;const dt=last?Math.min((t-last)/1000,.04):0;last=t;if(velocity||y){y=Math.max(0,y+velocity*dt);velocity-=1100*dt;if(y===0)velocity=0;}x-=(level==='slow'?118:165)*dt;
if(x<100&&x+38>52&&y<39){draw();stop(false);return;}
if(!passed&&x+38<52){passed=true;score++;counter.textContent='已跳過 '+score+' / 5 個紙箱';sound();if(score>=5){draw();stop(true);return;}}
if(x<-50){x=Math.max(280,track.clientWidth)+60;passed=false;}draw();frame=requestAnimationFrame(tick);}
const onHidden=()=>{if(document.hidden&&running&&!paused){paused=true;pause.textContent='繼續';last=0;feedback.textContent='遊戲已暫停，回來後按繼續。';}};
document.addEventListener('visibilitychange',onHidden);
cleanup=()=>{running=false;cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',onHidden);};
box.style.transform='translateX(250px)';stage.append(el('p','mg-tip','可用滑鼠、觸控或在按鈕上按空白鍵。沒有倒數計時，隨時能暫停。'));
}
const things=[['ㄇ','帽子','🎩'],['ㄅ','杯子','🥤'],['ㄆ','蘋果','🍎'],['ㄉ','蛋','🥚'],['ㄊ','太陽','☀️'],['ㄋ','牛奶','🥛'],['ㄌ','老虎','🐯'],['ㄍ','狗','🐶'],['ㄎ','恐龍','🦕'],['ㄏ','花','🌼'],['ㄐ','雞','🐔'],['ㄑ','氣球','🎈'],['ㄒ','西瓜','🍉']];
function phonetic(){
const stage=shell('phonetic'),deck=shuffle(things).slice(0,5);let round=0;const content=el('div');stage.append(content);const feedback=status(stage),next=btn('下一題 →','primary',()=>{round++;render();});stage.append(next);
function render(){content.replaceChildren();next.hidden=true;feedback.textContent='';if(round>=5){content.append(el('h3','','你找到五個注音朋友了 ⭐'),btn('再玩一回 ↻','primary',phonetic));return;}
const target=deck[round];content.append(el('p','mg-counter','第 '+(round+1)+' / 5 題'),el('p','question','哪個東西的開頭是這個注音？'),el('div','mg-big-letter',target[0]));const row=el('div','mg-choices');let done=false;shuffle([target,...shuffle(things.filter(x=>x!==target)).slice(0,2)]).forEach(item=>{const b=btn('','mg-choice',()=>{if(done)return;if(item!==target){b.classList.add('wrong');feedback.textContent='念念看這個名字的開頭，再試一次。';return;}done=true;b.classList.add('correct');feedback.textContent='對！'+target[1]+'的開頭是 '+target[0]+'。';sound();next.textContent=round===4?'看看我的小星星 ⭐':'下一題 →';next.hidden=false;});b.innerHTML='<span class="mg-emoji" aria-hidden="true">'+item[2]+'</span><span class="mg-word">'+item[1]+'</span>';b.setAttribute('aria-label',item[1]);row.append(b);});content.append(row);}
render();
}
function post(){
const stage=shell('post'),letters=Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),deck=shuffle(letters).slice(0,5);let round=0;const content=el('div');stage.append(content);const feedback=status(stage),next=btn('下一封信 →','primary',()=>{round++;render();});stage.append(next);
function render(){content.replaceChildren();next.hidden=true;feedback.textContent='';if(round>=5){content.append(el('h3','','五封信都送到家了！✉️ ⭐'),btn('再送一回 ↻','primary',post));return;}
const target=deck[round];let done=false;content.append(el('p','mg-counter','第 '+(round+1)+' / 5 封信'),el('p','question','把小寫字母送進對應的大寫信箱。'));const letter=el('div','mg-letter-mail',target.toLowerCase());letter.draggable=true;letter.setAttribute('aria-label','這封信是小寫 '+target.toLowerCase());letter.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',target.toLowerCase()));content.append(letter);const row=el('div','mg-choices');
function deliver(value,b){if(done)return;if(value!==target){b.classList.add('wrong');feedback.textContent='這不是它的家，再找找另一個信箱。';return;}done=true;b.classList.add('correct');letter.textContent='✓';feedback.textContent='送到了！'+target.toLowerCase()+' 和 '+target+' 是一家人。';sound();next.textContent=round===4?'看看投遞成果 ⭐':'下一封信 →';next.hidden=false;}
shuffle([target,...shuffle(letters.filter(x=>x!==target)).slice(0,2)]).forEach(v=>{const b=btn('','mg-choice mg-mailbox',()=>deliver(v,b));b.innerHTML='<small>📮 信箱</small>'+v;b.setAttribute('aria-label','投遞到大寫 '+v+' 信箱');b.addEventListener('dragover',e=>e.preventDefault());b.addEventListener('drop',e=>{e.preventDefault();if(e.dataTransfer.getData('text/plain')===target.toLowerCase())deliver(v,b);});row.append(b);});content.append(row,el('p','mg-tip','直接點信箱就能投遞，也可以把信拖過去。'));}
render();
}
})();

