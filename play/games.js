/* Six family mini-games. All progress stays in this page. */
(()=>{
'use strict';
const cards=[
["truthdetective","👿","小惡魔真假偵探","聽小惡魔的說法，判斷哪裡對、哪裡不對。","小惡魔 · 新遊戲 · 5 題"],
["opposite","🔄","小惡魔反口令","有時照著做、有時唱反調，先看規則再回答。","小惡魔 · 新遊戲 · 8 題"],
["grocery","🧺","兔阿嬤買菜記憶","先記清單，再挑食物，隨時能回頭看。","兔阿嬤 · 新遊戲 · 3 張清單"],
["clock","🕰️","兔阿嬤時間小高手","看短針和長針，練習整點、半點與一刻鐘。","兔阿嬤 · 新遊戲 · 5 題"],
["tidy","🧹","鼠媽媽收納大作戰","幫物品找到廚房、衣櫃或書桌的家。","鼠媽媽 · 新遊戲 · 6 件物品"],
["dayplan","🗓️","鼠媽媽行程排排看","按照時間，把一天的三件事排好。","鼠媽媽 · 新遊戲 · 5 天"],
["numberhunt","🔢","雞爸爸猜數字","利用太大、太小的線索，找出藏起來的數字。","雞爸爸 · 新遊戲 · 30／100"],
["spot","🔎","雞爸爸生活小偵探","比較兩張畫面，找到三處不同。","雞爸爸 · 新遊戲 · 5 組"],
["maze","🗺️","貓咪迷宮探險","找出通道，帶雅虎走回家。","新遊戲 · 六歲＋ · 5 關"],
["snackshop","🧮","點心小店長","算總價、練找零，完成五張訂單。","新遊戲 · 六歲＋ · 20／50 元"],
["codequest","🔐","雅虎密碼研究所","觀察數字和圖形，解開規律密碼。","新遊戲 · 六歲＋ · 5 題"],
["storytiles","📚","故事句子拼拼樂","依照先後順序，把四張句子卡排好。","新遊戲 · 六歲＋ · 5 個故事"],
['feed','🥣','幫右右找點心','點選或拖曳食物，餵飽右右陪牠睡。','龍弟弟'],
['memory','🐾','雅虎記憶翻牌','兩張一樣就是一對，姊弟都能挑戰。','2 組／6 組'],
['count','🐈','貓咪排排隊','找大小、數貓咪，慢慢觀察就能答對。','大小／數數'],
['jump','📦','雅虎跳跳樂','抓好時機跳過紙箱，收集五顆星。','慢速／一般'],
['phonetic','🎩','注音找物品','ㄇ是帽子的開頭！找出注音朋友。','鼠姊姊'],
['post','✉️','ABC 小郵差','把小寫字母送進大寫信箱。','鼠姊姊'],
['doors','🚪','雅虎開門大作戰','找出圖形機關，幫逃脫大師闖三關。','三關小解謎'],
['puzzle','🧩','右右的紙箱拼圖','交換圖片位置，拼回雅虎或右右。','4／9／16 片'],
['detective','🔎','貓咪捉迷藏升級版','看尾巴、耳朵和腳掌，猜猜是誰？','觀察小偵探'],
['rhythm','🎵','鼠姊姊的小小歌手','先看先聽，再敲出相同順序。','2 拍／4 拍'],
['coop','🤝','姊弟一起搬點心','一人找點心、一人接住，輪流合作。','同機雙人'],
['chores','🏡','雞爸爸家的小任務','添水、收玩具、找車車，一起照顧家。','三個生活任務']
];
const css=document.createElement('style');css.textContent=`
.mg-section{margin:28px 0 36px}.mg-kicker{text-align:center;color:#426b54;letter-spacing:2px;font-size:13px;font-weight:750}.mg-title{text-align:center;font-size:28px;margin:10px 0 22px}.mg-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.mg-card{text-align:left;border:1px solid #dcded0;border-radius:22px;padding:22px;background:#fff;box-shadow:0 5px 18px #304d3608;color:#353e39;transition:transform .18s}.mg-card:hover{transform:translateY(-3px)}.mg-card .mg-icon{font-size:34px;display:block;margin-bottom:10px}.mg-card strong{display:block;font-size:20px}.mg-card small{display:block;color:#73796b;line-height:1.7;margin:10px 0}.mg-tag{display:inline-block;border-radius:999px;background:#eef1df;color:#4d6d43;font-size:12px;padding:4px 10px}.mg-panel{border:1px solid #d9ddcc;border-radius:26px;background:white;padding:24px;margin:20px 0}.mg-top{display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap}.mg-top h2{margin:8px 0;font-size:27px}.mg-stage{background:#f7f8f0;border-radius:20px;padding:24px;margin-top:20px;text-align:center;min-height:330px}.mg-stage button{font:inherit}.mg-status{min-height:32px;color:#426b54;font-size:18px;font-weight:700;line-height:1.7;margin:16px 0}.mg-choices{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin:20px 0}.mg-choice{background:#fff;border:2px solid #dde1d1;border-radius:18px;padding:18px;min-width:90px;min-height:78px;font-size:28px;color:#384331}.mg-choice:disabled{opacity:1}.mg-choice.correct{background:#dcecd5;border-color:#729b61}.mg-choice.wrong{background:#ffeedb;border-color:#dda86c}.mg-cat{width:190px;height:180px;object-fit:contain;display:block;margin:12px auto}.mg-counter{color:#6e7767;font-size:14px;margin:10px}.mg-bowl{border:2px dashed #b5c4a1;border-radius:24px;padding:18px;min-height:86px;max-width:400px;margin:16px auto;font-size:32px;background:#fffaf1}.mg-food{font-size:32px}.mg-sizes{display:flex;justify-content:center;align-items:flex-end;gap:12px;min-height:180px}.mg-sizes button{border:2px solid #dce0d2;border-radius:18px;background:#fff;padding:10px;min-width:64px}.mg-sizes img{object-fit:contain;max-width:100%}.mg-cats-count{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:450px;margin:22px auto}.mg-cats-count img{width:64px;height:64px;object-fit:contain}.mg-memory{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:680px;margin:20px auto}.mg-memory.easy{grid-template-columns:repeat(2,minmax(0,1fr));max-width:400px}.mg-memory button{height:118px;min-width:0;border:2px solid #d7dfc8;border-radius:18px;background:#e8efdf;font-size:38px;color:#456239}.mg-memory button img{width:100%;height:100%;object-fit:contain}.mg-memory button.matched{background:#fff5da;border-color:#d5b26c}.mg-word{font-size:20px;font-weight:650;display:block}.mg-emoji{font-size:44px;display:block;margin-bottom:6px}.mg-big-letter{font-size:76px;font-weight:800;color:#426b54;line-height:1.4;margin:16px auto}.mg-letter-mail{border:2px dashed #c5b48b;background:#fff6dc;border-radius:16px;width:140px;margin:20px auto;padding:12px;font-size:64px;cursor:grab}.mg-mailbox{min-width:100px;min-height:120px;background:#eff3e6;font-size:46px}.mg-mailbox small{display:block;font-size:15px}.mg-running{position:relative;height:220px;max-width:740px;margin:20px auto;border-radius:22px;overflow:hidden;background:linear-gradient(#e8f2e2 0%,#f5f3db 76%,#d8e0bd 76%);border:1px solid #d4ddc4;touch-action:manipulation}.mg-run-cat{position:absolute;left:40px;bottom:48px;width:74px;height:64px;object-fit:contain;pointer-events:none}.mg-box{position:absolute;left:0;bottom:48px;width:38px;height:43px;background:#bc8d53;border:3px solid #916b3f;border-radius:5px;color:#fff3d6;font-size:26px;font-weight:800;line-height:36px;pointer-events:none}.mg-track-text{position:absolute;top:16px;left:20px;color:#758267;font-size:14px}.mg-config{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:14px 0}.mg-config button[aria-pressed=true]{background:#426b54;color:white}.mg-tip{color:#6a7465;font-size:14px;line-height:1.7}.mg-panel[hidden],.mg-section[hidden],.tabs[hidden]{display:none!important}.mg-sizes button{flex:1;max-width:175px;height:180px;display:flex;align-items:flex-end;justify-content:center}.mg-pet{border:0;background:none;padding:0}.mg-pet.roll img{animation:mg-roll .6s ease-in-out}@keyframes mg-roll{50%{transform:rotate(12deg) translateY(-4px)}}@media(max-width:680px){.mg-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mg-card{padding:16px}.mg-card strong{font-size:18px}.mg-panel{padding:16px}.mg-stage{padding:18px 12px}.mg-memory{gap:8px;grid-template-columns:repeat(3,minmax(0,1fr))}.mg-memory button{height:100px}.mg-choices{gap:10px}.mg-choice{padding:12px;min-width:70px}.mg-cats-count img{width:50px;height:50px}.mg-cat{width:165px;height:165px}}@media(max-width:380px){.mg-grid{grid-template-columns:1fr}.mg-card .mg-icon{float:right}.mg-mailbox{min-width:66px}}@media(prefers-reduced-motion:reduce){.mg-card,.mg-pet img{transition:none!important;animation:none!important}}
`;document.head.append(css);
/* The two child tabs own their game menus and the shared game stage. */
const groups={
dodo:["truthdetective","opposite","grocery","clock","tidy","dayplan","numberhunt","spot",'maze','snackshop','codequest','storytiles','phonetic','post','memory','count','jump','rhythm'],
dragon:['feed','doors','puzzle','detective','coop','chores']
};
const areaNames={dodo:'鼠姊姊學習樂園',dragon:'龍弟弟快樂天地'};
const areas={};
const panel=document.createElement('section');panel.className='mg-panel';panel.hidden=true;panel.setAttribute('aria-label','小遊戲');
let cleanup=()=>{},active='',activeArea='',lastLauncher=null;
const img=(name,pose='peek')=>'/cat-'+name+'-'+pose+'.png?v=20261105-art1';
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function btn(text,cls='mg-choice',fn){const b=el('button',cls,text);b.type='button';if(fn)b.addEventListener('click',fn);return b;}
function shuffle(xs){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function sound(){if(typeof tone==='function')tone('good');}
function catImage(name,pose,cls='mg-cat'){const e=el('img',cls);e.src=img(name,pose);e.alt=name==='yahoo'?'雅虎':'右右';e.draggable=false;return e;}
function currentArea(){return document.querySelector('#tab-dragon').getAttribute('aria-selected')==='true'?'dragon':'dodo';}
function stopVideo(){document.querySelectorAll('.dv-stop').forEach(stop=>stop.click());}
function resetActivities(){
cleanup();cleanup=()=>{};active='';activeArea='';panel.hidden=true;
Object.values(areas).forEach(area=>{area.menu.hidden=false;area.classic.hidden=true;if(area.video)area.video.hidden=false;});
}
function leave(){
const area=areas[activeArea||currentArea()];resetActivities();
const focus=lastLauncher&&area.menu.contains(lastLauncher)?lastLauncher:area.grid.querySelector('button');
if(focus)focus.focus({preventScroll:true});area.menu.scrollIntoView({block:'start'});
}
function shell(id){
const key=groups.dodo.includes(id)?'dodo':'dragon';
const tab=document.querySelector('#tab-'+key);if(tab.getAttribute('aria-selected')!=='true')tab.click();
cleanup();cleanup=()=>{};stopVideo();active=id;activeArea=key;
const area=areas[key];area.menu.hidden=true;area.classic.hidden=true;if(area.video)area.video.hidden=true;
area.host.append(panel);panel.hidden=false;panel.replaceChildren();
const head=el('div','mg-top'),title=el('h2','',cards.find(x=>x[0]===id)[2]);title.tabIndex=-1;
head.append(title,btn('← 回到'+areaNames[key],'secondary',leave));
const stage=el('div','mg-stage');panel.append(head,stage);panel.scrollIntoView({block:'start'});title.focus({preventScroll:true});return stage;
}
function status(stage){const e=el('div','mg-status','');e.setAttribute('role','status');e.setAttribute('aria-live','polite');stage.append(e);return e;}
function configs(stage,choices,current,fn){const row=el('div','mg-config');choices.forEach(([v,t])=>{const b=btn(t,'pill',()=>fn(v));b.setAttribute('aria-pressed',String(v===current));row.append(b);});stage.append(row);}
function menuCard(area,id,icon,name,desc,tag,action){
const b=btn('','mg-card',()=>{lastLauncher=b;action();});b.dataset.gameId=id;
b.innerHTML='<span class="mg-icon" aria-hidden="true">'+icon+'</span><strong>'+name+'</strong><small>'+desc+'</small><span class="mg-tag">'+tag+'</span>';
area.grid.append(b);return b;
}
function openClassic(key,kind){
resetActivities();stopVideo();const area=areas[key];active='classic-'+kind;activeArea=key;
area.menu.hidden=true;area.classic.hidden=false;if(area.video)area.video.hidden=true;
const selector=key==='dodo'?'[data-learn="'+kind+'"]':'[data-toddler="'+kind+'"]';
const control=area.classic.querySelector(selector);if(control){control.click();control.focus({preventScroll:true});}
area.classic.scrollIntoView({block:'start'});
}
['dodo','dragon'].forEach(key=>{
const host=document.querySelector('#panel-'+key),modes=host.querySelector('.modes'),playbox=host.querySelector('.playbox'),video=host.querySelector('.dv-corner');
const classic=el('section','mg-classic');classic.hidden=true;classic.setAttribute('aria-label',areaNames[key]+'的小活動');
const back=btn('← 回到'+areaNames[key],'secondary',leave);classic.append(back,modes,playbox);
const menu=el('section','mg-section');menu.setAttribute('aria-label',areaNames[key]+'遊戲選單');
const title=el('h3','mg-menu-heading','選一個，開始玩！'),grid=el('div','mg-grid');menu.append(title,grid);
host.querySelector('.panel-head').after(menu,classic);areas[key]={host,menu,grid,classic,video};
});
const originals={
dodo:[['zh','🔤','ㄅㄆㄇ 找朋友','看注音，找出一樣的朋友。'],['abc','✉️','ABC 大小寫配對','大寫字母的小寫朋友在哪裡？']],
dragon:[['hide','📦','貓咪躲貓貓','打開紙箱，找找雅虎和右右。'],['pet','🐾','摸摸貓咪','輕輕點一下，陪貓咪玩。'],['drum','🥁','BANG 節奏鼓','自由敲敲，玩自己的節奏。']]
};
Object.keys(areas).forEach(key=>{
const area=areas[key];
originals[key].forEach(([id,icon,name,desc])=>menuCard(area,'classic-'+id,icon,name,desc,'小活動',()=>openClassic(key,id)));
groups[key].forEach(id=>{const [,icon,name,desc,tag]=cards.find(c=>c[0]===id);menuCard(area,id,icon,name,desc,tag,()=>open(id));});
});
document.querySelectorAll('.tabs [role="tab"]').forEach(tab=>tab.addEventListener('click',()=>{if(activeArea&&activeArea!==currentArea())resetActivities();}));
const tabObserver=new MutationObserver(()=>{if(activeArea&&activeArea!==currentArea())resetActivities();});
document.querySelectorAll('.tabs [role="tab"]').forEach(tab=>tabObserver.observe(tab,{attributes:true,attributeFilter:['aria-selected']}));
const menuStyle=document.createElement('style');menuStyle.textContent=`
.mg-classic[hidden],.mg-section[hidden],.dv-corner[hidden]{display:none!important}
.mg-menu-heading{font-size:24px;line-height:1.5;margin:12px 0 22px}.mg-section{margin:28px 0 8px}.mg-classic{margin-top:24px}.mg-classic>.secondary{margin-bottom:10px}
.mg-card{width:100%;min-height:180px}.mg-card strong{line-height:1.5}.mg-panel{scroll-margin-top:20px}
@media(max-width:760px){.mg-grid{grid-template-columns:1fr;gap:16px}.mg-card{padding:22px;min-height:160px}.mg-card strong{font-size:23px}.mg-card small{font-size:18px;line-height:1.8}.mg-tag,.mg-tip,.mg-counter,.mg-track-text{font-size:17px;line-height:1.8}.mg-card .mg-icon{float:right;margin-left:12px;font-size:38px}.mg-stage .question,.mg-stage>p:not(.mg-counter):not(.mg-tip){font-size:20px;line-height:1.8}.mg-status{font-size:20px}.mg-choice{min-height:80px}.mg-top>.secondary{font-size:20px;min-height:52px}}
`;document.head.append(menuStyle);
function open(id){({feed,memory,count,jump,phonetic,post,doors,puzzle,detective,rhythm,coop,chores,maze,snackshop,codequest,storytiles,truthdetective,opposite,grocery,clock,tidy,dayplan,numberhunt,spot}[id])();}
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
const stage=shell('jump');configs(stage,[['slow','慢速'],['normal','一般']],level,v=>jump(v));stage.append(el('p','question',level==='slow'?'看到「現在跳！」就按跳躍。跳過 5 個就過關，碰到也保留進度。':'看到紙箱靠近，按「跳一下」！跳過 5 個就過關。'));
const track=el('div','mg-running'),label=el('div','mg-track-text','按開始後，雅虎就會出發。'),cat=catImage('yahoo','walk','mg-run-cat'),box=el('div','mg-box','✦');box.setAttribute('aria-hidden','true');track.append(label,cat,box);stage.append(track);
const counter=el('p','mg-counter','已跳過 0 / 5 個紙箱');stage.append(counter);const feedback=status(stage),row=el('div','mg-choices');stage.append(row);
// Slow mode gives a longer jump window, a smaller body hitbox, and retries without losing progress.
const motion=level==='slow'?{speed:118,launch:250,gravity:300}:{speed:165,launch:470,gravity:1100};
let frame=0,last=0,y=0,velocity=0,x=0,score=0,running=false,paused=false,passed=false,ended=false;
const action=btn('開始出發 ▶','primary',()=>{if(!running){if(ended){score=0;counter.textContent='已跳過 0 / 5 個紙箱';}start();return;}if(paused){feedback.textContent='先按繼續，再跳一下。';return;}if(y===0){velocity=motion.launch;if(level==='slow')feedback.textContent='';}});
const pause=btn('暫停','secondary',()=>{if(!running)return;paused=!paused;cancelAnimationFrame(frame);pause.textContent=paused?'繼續':'暫停';last=0;feedback.textContent=paused?'先休息一下，準備好再繼續。':'';if(!paused)frame=requestAnimationFrame(tick);});pause.disabled=true;row.append(action,pause);
function draw(){cat.style.transform='translateY('+(-y)+'px)';box.style.transform='translateX('+x+'px)';}
function start(){cancelAnimationFrame(frame);running=true;paused=false;ended=false;last=0;y=0;velocity=0;score=score||0;x=Math.max(280,track.clientWidth)+30;passed=false;action.textContent='跳一下 ↑';pause.disabled=false;pause.textContent='暫停';label.textContent='雅虎出發囉！';feedback.textContent='';draw();frame=requestAnimationFrame(tick);}
function stop(win){running=false;ended=true;cancelAnimationFrame(frame);pause.disabled=true;action.textContent=win?'再玩一回 ↻':'再試一次 ↻';feedback.textContent=win?'五個都跳過了！雅虎好厲害 ⭐':'碰到紙箱了，沒關係，再試一次！';}
function tick(t){if(!running||paused)return;const dt=last?Math.min((t-last)/1000,.04):0;last=t;if(velocity||y){y=Math.max(0,y+velocity*dt);velocity-=motion.gravity*dt;if(y===0)velocity=0;}x-=motion.speed*dt;
if(level==='slow'){
 const cue=y>0?'雅虎跳躍中 ↑':x<=205&&x>=100?'現在跳！按「跳一下」↑':'紙箱過來囉，準備一下！';
 if(label.textContent!==cue)label.textContent=cue;
 if(x<88&&x+38>64&&y<24){x=Math.max(280,track.clientWidth)+60;y=0;velocity=0;passed=false;feedback.textContent='沒關係！已跳過的紙箱幫你留著，再試一次。';label.textContent='準備好，再跳一次！';draw();frame=requestAnimationFrame(tick);return;}
}else if(x<100&&x+38>52&&y<39){draw();stop(false);return;}
if(!passed&&x+38<52){passed=true;score++;counter.textContent='已跳過 '+score+' / 5 個紙箱';sound();if(score>=5){draw();stop(true);return;}}
if(x<-50){x=Math.max(280,track.clientWidth)+60;passed=false;}draw();frame=requestAnimationFrame(tick);}
const onHidden=()=>{if(document.hidden&&running&&!paused){paused=true;pause.textContent='繼續';last=0;feedback.textContent='遊戲已暫停，回來後按繼續。';}};
document.addEventListener('visibilitychange',onHidden);
cleanup=()=>{running=false;cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',onHidden);};
box.style.transform='translateX(250px)';stage.append(el('p','mg-tip',level==='slow'?'慢速有更長的起跳時間，擦過尾巴也不算碰撞；碰到紙箱會保留進度。可用滑鼠、觸控或空白鍵，隨時能暫停。':'可用滑鼠、觸控或在按鈕上按空白鍵。沒有倒數計時，隨時能暫停。'));
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

/* Second collection: six more family adventures. */
const css2=document.createElement('style');css2.textContent=`
.mg-door-scene{max-width:560px;margin:18px auto;display:flex;gap:24px;justify-content:center;align-items:flex-end}.mg-door{position:relative;width:150px;height:220px;background:#b98452;border:10px solid #8c6038;border-radius:45px 45px 6px 6px;color:#fff3c9;display:flex;align-items:center;justify-content:center;font-size:38px;box-shadow:inset 0 0 0 4px #d6a473}.mg-door:after{content:'●';position:absolute;right:8px;top:110px;color:#f5d38d;font-size:22px}.mg-door.open{transform:perspective(400px) rotateY(-25deg);background:#e9f1db;transition:transform .4s}.mg-door-scene img{width:140px;height:140px;object-fit:contain}.mg-puzzle-layout{display:flex;gap:22px;justify-content:center;align-items:flex-start;flex-wrap:wrap}.mg-puzzle-preview{width:130px;height:130px;object-fit:contain;border:1px dashed #bac9a7;border-radius:18px;background:#fffaf0;padding:8px}.mg-puzzle-board{display:grid;width:min(100%,420px);gap:4px;background:#f1e8d4;border:5px solid #d7c6a1;border-radius:14px;padding:5px}.mg-puzzle-piece{aspect-ratio:1;min-width:0;position:relative;border:2px solid transparent;border-radius:5px;background-color:#fffaf0;background-repeat:no-repeat;cursor:pointer;padding:0}.mg-puzzle-piece.selected{border-color:#b77a2d;box-shadow:0 0 0 2px #e8c36f}.mg-puzzle-piece.right{border-color:#a6bf91}.mg-puzzle-piece span{position:absolute;top:2px;left:3px;font-size:12px;border-radius:50%;padding:2px 5px;background:#ffffffdf;color:#556149}.mg-clue{position:relative;width:170px;height:118px;overflow:hidden;border:3px solid #c5ceb4;border-radius:24px;background:#fff6e5;margin:20px auto}.mg-clue img{position:absolute;width:260px;height:220px;max-width:none;object-fit:fill}.mg-detective-choice{width:150px;min-width:0}.mg-detective-choice img{width:95px;height:95px;display:block;object-fit:contain;margin:auto}.mg-beats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;max-width:480px;margin:24px auto}.mg-beat{border:3px solid transparent;border-radius:24px;min-height:120px;font-size:26px;font-weight:750;color:#3c4937;background:#dbe7ca;box-shadow:0 5px 0 #c4d0b4;transition:filter .1s,transform .1s}.mg-beat:nth-child(2){background:#f3d4a4}.mg-beat:nth-child(3){background:#d5d4ec}.mg-beat:nth-child(4){background:#efd0c9}.mg-beat.lit{filter:brightness(1.12);border-color:#6b8156;transform:translateY(-4px) scale(1.02)}.mg-coop-turn{background:#edf0df;padding:12px 18px;border-radius:18px;font-size:19px;color:#48603c;margin:14px auto;max-width:520px}.mg-coop-lane{display:flex;align-items:center;justify-content:center;gap:24px;min-height:130px}.mg-coop-food{font-size:58px;min-width:70px}.mg-coop-food.delivered{animation:mg-deliver .5s ease-out}.mg-water-meter{width:220px;height:95px;border:4px solid #9bb7bd;border-top:0;border-radius:0 0 45px 45px;background:white;position:relative;overflow:hidden;margin:22px auto}.mg-water-fill{position:absolute;bottom:0;width:100%;background:#9dcfdf;transition:height .3s}.mg-toy-chosen{border-color:#b18d3e!important;background:#fff3d4!important}.mg-task-check{font-size:17px;color:#4e7142;line-height:1.8;margin:15px}.mg-basket{font-size:23px;min-width:130px}@keyframes mg-deliver{from{transform:translateY(-30px);opacity:.3}to{transform:translateY(0);opacity:1}}@media(max-width:600px){.mg-door{width:120px;height:180px}.mg-door-scene{gap:12px}.mg-door-scene img{width:110px;height:110px}.mg-detective-choice{width:120px}.mg-puzzle-preview{width:95px;height:95px}.mg-puzzle-board{width:min(100%,340px)}.mg-coop-lane{gap:12px}.mg-beat{min-height:100px}.mg-basket{min-width:100px;font-size:18px}}@media(prefers-reduced-motion:reduce){.mg-door,.mg-beat,.mg-water-fill,.mg-coop-food{animation:none!important;transition:none!important}}
`;document.head.append(css2);
function doors(){
const stage=shell('doors');let step=0,placed=false,pattern=[];const body=el('div');stage.append(body);const feedback=status(stage);
const next=btn('下一關 →','primary',()=>{step++;placed=false;pattern=[];render();});next.hidden=true;stage.append(next);
function render(){body.replaceChildren();next.hidden=true;feedback.textContent='';if(step>=3){body.append(el('h3','','雅虎逃脫成功！⭐ ⭐ ⭐'),catImage('yahoo','walk'),el('p','','雅虎：「門自己開的喵。」'),btn('再闖一次 ↻','primary',doors));return;}
body.append(el('p','mg-counter','第 '+(step+1)+' / 3 關'));const scene=el('div','mg-door-scene'),door=el('div','mg-door',step===0?'○':step===1?'🐾':'⭐ ☾');scene.append(catImage('yahoo','peek',''),door);body.append(scene);
function win(){if(placed)return;placed=true;door.classList.add('open');feedback.textContent=['找到圓形機關了，第一關過關！','小紙箱放好了，雅虎跳得上去了！','星星和月亮對上了，門開了！'][step];sound();next.hidden=false;next.textContent=step===2?'看看逃脫成果 →':'下一關 →';}
if(step===0){body.append(el('p','question','門上畫著 ○，請找出一樣的圖形。'));const row=el('div','mg-choices');shuffle(['○','△','□']).forEach(v=>{const b=btn(v,'mg-choice',()=>{if(v==='○')win();else feedback.textContent='看看門上的圖形，再找一次。';});row.append(b);});body.append(row);}
else if(step===1){body.append(el('p','question','雅虎需要小紙箱墊腳，請把它放到腳印旁。'));let selected=false;const row=el('div','mg-choices'),box=btn('📦 小紙箱','mg-choice',()=>{selected=true;feedback.textContent='拿好了！再點門前的腳印。';}),spot=btn('🐾 放在這裡','mg-choice',()=>{if(selected)win();else feedback.textContent='先拿起小紙箱，再放到這裡。';});box.draggable=true;box.addEventListener('dragstart',e=>{selected=true;e.dataTransfer.setData('text/plain','small-box');});spot.addEventListener('dragover',e=>e.preventDefault());spot.addEventListener('drop',e=>{e.preventDefault();if(e.dataTransfer.getData('text/plain')==='small-box')win();});row.append(box,spot);body.append(row,el('p','mg-tip','這是故事裡的圖形機關；點選或拖曳都可以。'));}
else{body.append(el('p','question','照門上的順序，先點星星，再點月亮。'));const row=el('div','mg-choices');[['⭐','星星'],['☾','月亮'],['☀','太陽']].forEach(([v,name])=>{row.append(btn(v+' '+name,'mg-choice',()=>{if(placed)return;const expected=['⭐','☾'][pattern.length];if(v!==expected){pattern=[];feedback.textContent='順序重新開始：先星星，再月亮。';return;}pattern.push(v);feedback.textContent='星星對了，下一個是月亮。';if(pattern.length===2)win();}));});body.append(row);}}
render();
}
function puzzle(level=2,who='youyou'){
const stage=shell('puzzle');configs(stage,[[2,'4 片'],[3,'9 片'],[4,'16 片']],level,v=>puzzle(v,who));configs(stage,[['youyou','右右'],['yahoo','雅虎']],who,v=>puzzle(level,v));
stage.append(el('p','question','先點一片，再點另一格，就能交換位置。'));let pieces=shuffle(Array.from({length:level*level},(_,i)=>i));if(pieces.every((v,i)=>v===i))[pieces[0],pieces[1]]=[pieces[1],pieces[0]];
let selected=-1,moves=0,showNumbers=level===2,solved=false;const layout=el('div','mg-puzzle-layout'),preview=catImage(who,who==='youyou'?'sleep':'peek','mg-puzzle-preview'),board=el('div','mg-puzzle-board');board.style.gridTemplateColumns='repeat('+level+',minmax(0,1fr))';layout.append(board,preview);stage.append(layout);const counter=el('p','mg-counter');stage.append(counter);const feedback=status(stage);
const numbers=btn(showNumbers?'隱藏編號':'顯示編號提示','secondary',()=>{showNumbers=!showNumbers;numbers.textContent=showNumbers?'隱藏編號':'顯示編號提示';draw();});stage.append(numbers);
function draw(){board.replaceChildren();const correct=pieces.filter((v,i)=>v===i).length;counter.textContent='拼對 '+correct+' / '+pieces.length+' 片 · 交換 '+moves+' 次';
pieces.forEach((value,index)=>{const b=btn('','mg-puzzle-piece'+(selected===index?' selected':'')+(value===index?' right':''),()=>{if(solved)return;if(selected===index){selected=-1;draw();return;}if(selected<0){selected=index;draw();return;}[pieces[selected],pieces[index]]=[pieces[index],pieces[selected]];selected=-1;moves++;draw();if(pieces.every((v,i)=>v===i)){solved=true;board.querySelectorAll('button').forEach(x=>x.disabled=true);feedback.textContent='拼好了！'+(who==='youyou'?'右右':'雅虎')+'回來了 ⭐';sound();again.hidden=false;}});
b.style.backgroundImage='url("'+img(who,who==='youyou'?'sleep':'peek')+'")';b.style.backgroundSize=(level*100)+'% '+(level*100)+'%';b.style.backgroundPosition=(value%level)/(level-1)*100+'% '+Math.floor(value/level)/(level-1)*100+'%';b.setAttribute('aria-label','第 '+(index+1)+' 格，圖片第 '+(value+1)+' 片');if(showNumbers)b.append(el('span','',String(value+1)));board.append(b);});}
const again=btn('再拼一張 ↻','primary',()=>puzzle(level,who));again.hidden=true;stage.append(again);draw();
}
function detective(){
const stage=shell('detective');let round=0,hint=0,who,done=false;const body=el('div');stage.append(body);const feedback=status(stage),next=btn('下一個線索 →','primary',()=>{round++;render();});stage.append(next);
function render(){body.replaceChildren();next.hidden=true;feedback.textContent='';done=false;hint=round%3;who=Math.random()<.5?'yahoo':'youyou';if(round>=5){body.append(el('h3','','五次都找到了！你是貓咪小偵探 🔎'),btn('再找一回 ↻','primary',detective));return;}
body.append(el('p','mg-counter','第 '+(round+1)+' / 5 題'));const prompt=el('p','question'),clue=el('div','mg-clue'),photo=catImage(who,'walk','');photo.alt='神祕貓咪的局部線索';clue.append(photo);body.append(prompt,clue);
function clueView(){prompt.textContent=['看尾巴，猜猜是雅虎還是右右？','看耳朵，猜猜是雅虎還是右右？','看腳掌和毛色，猜猜是誰？'][hint];photo.style.left=['0px','-122px','-100px'][hint];photo.style.top=['-2px','0px','-115px'][hint];}
clueView();body.append(btn('再看一個線索','secondary',()=>{hint=(hint+1)%3;clueView();}));const row=el('div','mg-choices');[['yahoo','雅虎'],['youyou','右右']].forEach(([name,label])=>{const b=btn('','mg-choice mg-detective-choice',()=>{if(done)return;if(name!==who){feedback.textContent='再看看毛色：雅虎黑白，右右橘橘的。';return;}done=true;clue.style.overflow='visible';photo.style.position='static';photo.style.width='160px';photo.style.height='110px';photo.style.objectFit='contain';photo.alt=label;feedback.textContent='是'+label+'！你認出來了。';b.classList.add('correct');sound();next.hidden=false;next.textContent=round===4?'領取小偵探星星 ⭐':'下一個線索 →';});b.append(catImage(name,'peek',''),el('span','mg-word',label));b.setAttribute('aria-label','我猜是'+label);row.append(b);});body.append(row);}
render();
}
function rhythm(level=2){
const stage=shell('rhythm');configs(stage,[[2,'弟弟：2 拍'],[4,'姊姊：4 拍']],level,v=>rhythm(v));stage.append(el('p','question','先看亮起的順序，再跟著敲。聲音關掉也能玩。'));
let sequence=[],position=0,round=0,accept=false,timers=[],audio=null,audioOn=true,dead=false;
const counter=el('p','mg-counter','第 1 / 3 回合'),pads=el('div','mg-beats');stage.append(counter,pads);const feedback=status(stage);const controls=el('div','mg-choices');stage.append(controls);
function later(fn,ms){const t=setTimeout(()=>{if(!dead)fn();},ms);timers.push(t);}
function note(i){if(!audioOn)return;try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain(),now=audio.currentTime;o.connect(g);g.connect(audio.destination);o.frequency.value=[262,330,392,523][i];g.gain.setValueAtTime(.12,now);g.gain.exponentialRampToValueAtTime(.001,now+.28);o.start(now);o.stop(now+.3);}catch{}}
const padButtons=[];['咚','啪','叮','砰'].forEach((name,i)=>{const b=btn(name,'mg-beat',()=>{if(!accept)return;flash(i);if(i!==sequence[position]){accept=false;position=0;feedback.textContent='差一點點！按「再看再聽一次」重新試。';play.disabled=false;return;}position++;if(position===sequence.length){accept=false;round++;counter.textContent='已完成 '+round+' / 3 回合';feedback.textContent=round===3?'三回合完成！你是節奏小歌手 🎵 ⭐':'順序都對了！準備好再玩下一回合。';next.hidden=round>=3;again.hidden=round<3;play.disabled=true;}else feedback.textContent='第 '+position+' 拍對了，繼續！';});padButtons.push(b);pads.append(b);});
function flash(i){padButtons[i].classList.add('lit');note(i);later(()=>padButtons[i].classList.remove('lit'),270);}
function demo(){timers.forEach(clearTimeout);timers=[];padButtons.forEach(b=>b.classList.remove('lit'));accept=false;position=0;play.disabled=true;feedback.textContent='先看先聽，輪到你時再敲。';sequence.forEach((v,i)=>later(()=>flash(v),i*600+150));later(()=>{accept=true;feedback.textContent='換你了！照剛剛的順序敲。';play.disabled=false;},sequence.length*600+200);}
function fresh(){sequence=Array.from({length:level},()=>Math.floor(Math.random()*4));next.hidden=true;counter.textContent='第 '+(round+1)+' / 3 回合';demo();}
const play=btn('開始看節奏 ▶','primary',()=>{if(!sequence.length)fresh();else demo();play.textContent='再看再聽一次';}),next=btn('下一回合 →','primary',fresh),again=btn('再唱一回 ↻','primary',()=>rhythm(level)),mute=btn('聲音：開','secondary',()=>{audioOn=!audioOn;mute.textContent='聲音：'+(audioOn?'開':'關');mute.setAttribute('aria-pressed',String(audioOn));});mute.setAttribute('aria-pressed','true');next.hidden=again.hidden=true;controls.append(play,next,again,mute);
cleanup=()=>{dead=true;timers.forEach(clearTimeout);if(audio)audio.close();};
}
function coop(){
const stage=shell('coop');stage.append(el('p','question','同一台裝置輪流合作：A 找點心，B 接住送進碗裡。不限時！'));
let score=0,target,ready=false;const foods=[['🐟','魚點心'],['🍗','雞肉點心'],['🟤','貓飼料']];
const turn=el('p','mg-coop-turn'),lane=el('div','mg-coop-lane'),parcel=el('div','mg-coop-food','✉️'),cat=catImage('youyou','peek','mg-cat');lane.append(parcel,cat);stage.append(turn,lane);const counter=el('p','mg-counter','一起送到 0 / 5 份');stage.append(counter);const choices=el('div','mg-choices');stage.append(choices);const feedback=status(stage);const catchButton=btn('B：接住，送給右右！','primary',()=>{if(!ready)return;ready=false;catchButton.disabled=true;score++;parcel.classList.remove('delivered');void parcel.offsetWidth;parcel.classList.add('delivered');counter.textContent='一起送到 '+score+' / 5 份';feedback.textContent='兩個人配合成功，點心送到了！';sound();if(score===5){cat.src=img('youyou','sleep');turn.textContent='合作完成！右右吃飽睡著了。';again.hidden=false;}else next.hidden=false;});
const next=btn('準備下一份 →','primary',order),again=btn('交換角色再玩 ↻','primary',coop);stage.append(catchButton,next,again);
function order(){ready=false;target=foods[Math.floor(Math.random()*foods.length)];turn.textContent='輪到 A：請找出 '+target[0]+' '+target[1];parcel.textContent='❔';feedback.textContent='';next.hidden=again.hidden=true;catchButton.disabled=true;choices.replaceChildren();foods.forEach(([emoji,name])=>{const b=btn(emoji+' '+name,'mg-choice',()=>{if(ready)return;if(emoji!==target[0]){feedback.textContent='再看看訂單，這次要找'+target[1]+'。';return;}ready=true;parcel.textContent=emoji;turn.textContent='輪到 B：點一下接住，再送給右右。';feedback.textContent='A 找到了！把裝置交給 B。';catchButton.disabled=false;choices.querySelectorAll('button').forEach(x=>x.disabled=true);});choices.append(b);});}
order();
}
function chores(){
const stage=shell('chores'),done={water:false,toys:false,car:false};let task='water',selected=null,water=0,toysDone=new Set();
const progress=el('p','mg-task-check'),nav=el('div','mg-config'),body=el('div');stage.append(progress,nav,body);const feedback=status(stage);
function update(){const n=Object.values(done).filter(Boolean).length;progress.textContent='完成 '+n+' / 3 個任務 '+['','⭐','⭐ ⭐','⭐ ⭐ ⭐'][n];nav.replaceChildren();[['water','幫貓咪添水'],['toys','整理玩具'],['car','找龍弟弟的車車']].forEach(([id,name])=>{const b=btn((done[id]?'✓ ':'')+name,'pill',()=>{task=id;show();});b.setAttribute('aria-pressed',String(task===id));nav.append(b);});if(n===3){feedback.textContent='我們一起照顧好這個家了！⭐ ⭐ ⭐';again.hidden=false;}}
function finish(){done[task]=true;sound();feedback.textContent='任務完成！換另一個小任務吧。';update();}
function show(){body.replaceChildren();feedback.textContent='';update();if(done[task]){body.append(el('h3','','這個任務已完成 ✓'),catImage('youyou','sleep'));return;}
if(task==='water'){body.append(el('p','question','點水壺 3 次，把新鮮的水添進貓咪水碗。'),catImage('yahoo','peek'));const meter=el('div','mg-water-meter'),fill=el('div','mg-water-fill');fill.style.height=(water/3*100)+'%';meter.append(fill);const pour=btn('🚰 添一點水','primary',()=>{if(water>=3)return;water++;fill.style.height=(water/3*100)+'%';feedback.textContent='已添 '+water+' / 3 次水';if(water===3){pour.disabled=true;finish();}});body.append(meter,pour);}
else if(task==='toys'){body.append(el('p','question','先點玩具，再點它的收納籃。'));const toys=[['car','🚗','車車'],['blocks','🧱','積木'],['bear','🧸','小熊']];const row=el('div','mg-choices'),baskets=el('div','mg-choices');toys.forEach(([id,icon,name])=>{const b=btn(icon+' '+name,'mg-choice',()=>{selected=id;row.querySelectorAll('button').forEach(x=>x.classList.remove('mg-toy-chosen'));b.classList.add('mg-toy-chosen');feedback.textContent='拿起'+name+'，幫它找個家。';});b.disabled=toysDone.has(id);row.append(b);baskets.append(btn('🧺 '+name+'的家','mg-choice mg-basket',()=>{if(!selected){feedback.textContent='先拿起一個玩具。';return;}if(selected!==id){feedback.textContent='這是'+name+'的家，再找找另一個籃子。';return;}toysDone.add(id);selected=null;if(toysDone.size===3){finish();body.replaceChildren(el('h3','','玩具都回家了！'));}else{show();feedback.textContent='收好一個了，再幫下一個玩具回家。';}}));});body.append(row,baskets);}
else{body.append(el('p','question','龍弟弟記得：車車躲在「星星毯子」下面。'));const row=el('div','mg-choices');[['☁️','雲朵毯子'],['⭐','星星毯子'],['🌙','月亮毯子']].forEach(([icon,name])=>{const b=btn(icon+' '+name,'mg-choice',()=>{if(done.car)return;if(icon!=='⭐'){feedback.textContent='這裡沒有，找找星星毯子。';return;}b.textContent='🚗 找到車車了！';finish();});row.append(b);});body.append(row);}}
const again=btn('再幫忙一回 ↻','primary',chores);again.hidden=true;stage.append(again);show();
}

/* Six-plus adventures: untimed puzzles, hints and retries. */
const plusStyle=el('style');plusStyle.textContent=`
.sp-progress{font-size:18px;color:#527148;line-height:1.7}.sp-toolbar{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:18px 0}.sp-receipt{max-width:520px;margin:20px auto;padding:20px;border:1px dashed #b8c5a8;border-radius:18px;background:#fffef8;text-align:left;font-size:22px;line-height:1.9}.sp-receipt p{margin:4px 0}.sp-pattern{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:22px auto}.sp-token{display:grid;place-items:center;min-width:58px;min-height:68px;border:2px solid #d4dec8;border-radius:16px;background:white;font-size:30px;padding:8px}.sp-maze{display:grid;max-width:440px;width:100%;margin:22px auto;background:#7b9868;border:3px solid #526e42;gap:0;outline-offset:5px}.sp-cell{aspect-ratio:1;background:#fcfbef;min-width:0;position:relative;border-color:#526e42;border-style:solid;border-width:0;display:grid;place-items:center;font-size:24px}.sp-cell .sp-cat{position:absolute;width:100%;height:100%;object-fit:contain;z-index:2}.sp-cell.visited{background:#edf4e6}.sp-cell.hint{background:#ffe8a6}.sp-directions{display:grid;grid-template-columns:repeat(3,64px);gap:10px;justify-content:center}.sp-direction{min-width:0;min-height:60px;font-size:28px;border:1px solid #aebf9b;border-radius:15px;background:white;color:#426b54}.sp-direction:first-child{grid-column:2}.sp-direction:nth-child(2){grid-column:1}.sp-direction:nth-child(3){grid-column:2}.sp-direction:nth-child(4){grid-column:3}.sp-story-slots{display:flex;flex-direction:column;gap:10px;max-width:620px;margin:20px auto;min-height:95px;padding:16px;border:2px dashed #c4d1b5;border-radius:18px;background:#fffdf6;text-align:left}.sp-story-piece{font-size:21px;line-height:1.7;padding:12px 18px;border:1px solid #c6d3b7;background:white;border-radius:14px;color:#3a5034;text-align:left;min-height:56px}.sp-story-choices{display:grid;gap:12px;max-width:620px;margin:20px auto}.sp-chosen{background:#e8f0df;border-color:#91ad76}.sp-new{border:2px solid #bf9d64;background:#fffcf1}.sp-new .mg-tag{background:#f0dfbd;color:#70522e}.sp-new-note{font-size:18px;line-height:1.8;color:#6e614b;background:#fff7df;border-radius:16px;padding:16px;margin:0 0 18px}
@media(max-width:760px){.sp-receipt{font-size:22px;padding:16px}.sp-token{min-width:48px;font-size:26px}.sp-story-piece{font-size:21px;line-height:1.8}.sp-progress{font-size:18px}.sp-directions{grid-template-columns:repeat(3,68px)}.sp-direction{min-height:64px}.sp-new-note{font-size:19px}}
`;document.head.append(plusStyle);
function makeMaze(n,rng=Math.random){
const walls=Array(n*n).fill(15),seen=new Set([0]),stack=[0];
const dirs=[[-1,0,1,4],[0,1,2,8],[1,0,4,1],[0,-1,8,2]];
while(stack.length){
 const p=stack[stack.length-1],r=Math.floor(p/n),c=p%n;
 const options=dirs.map(d=>({d,r:r+d[0],c:c+d[1]})).filter(v=>v.r>=0&&v.r<n&&v.c>=0&&v.c<n&&!seen.has(v.r*n+v.c));
 if(!options.length){stack.pop();continue;}
 const v=options[Math.min(options.length-1,Math.floor(rng()*options.length))],q=v.r*n+v.c;
 walls[p]&=~v.d[2];walls[q]&=~v.d[3];seen.add(q);stack.push(q);
}
return walls;
}
function mazeStep(walls,n,p,dir){
const ds={up:[-n,1],right:[1,2],down:[n,4],left:[-1,8]},d=ds[dir];if(!d||(walls[p]&d[1]))return p;
const q=p+d[0];return q<0||q>=n*n?p:q;
}
function mazeRoute(walls,n,start,goal){
const queue=[start],parents=new Map([[start,null]]);
for(let k=0;k<queue.length;k++){const p=queue[k];if(p===goal)break;for(const dir of ['up','right','down','left']){const q=mazeStep(walls,n,p,dir);if(!parents.has(q)){parents.set(q,p);queue.push(q);}}}
if(!parents.has(goal))return [];
const route=[];for(let p=goal;p!==null;p=parents.get(p))route.push(p);return route.reverse();
}
function maze(){
const stage=shell('maze');let level=0,walls=[],n=4,pos=0,moves=0,done=false,hint=-1,visited=new Set();
const progress=el('p','sp-progress'),prompt=el('p','question','幫雅虎沿著通道走回家。方向鍵或下方箭頭都可以玩。'),board=el('div','sp-maze');
board.tabIndex=0;board.setAttribute('role','group');board.setAttribute('aria-label','雅虎迷宮，可用方向鍵移動');
stage.append(progress,prompt,board);const feedback=status(stage),directions=el('div','sp-directions');stage.append(directions);
[['up','↑','往上'],['left','←','往左'],['down','↓','往下'],['right','→','往右']].forEach(([dir,text,label])=>{const b=btn(text,'sp-direction',()=>move(dir));b.setAttribute('aria-label',label);directions.append(b);});
const tools=el('div','sp-toolbar'),help=btn('提示下一步','secondary',()=>{if(done)return;hint=mazeRoute(walls,n,pos,n*n-1)[1]??-1;feedback.textContent='黃色格子是下一步，可以慢慢走。';draw();}),retry=btn('這關重新走','secondary',()=>{pos=0;moves=0;done=false;hint=-1;visited=new Set([0]);help.disabled=false;feedback.textContent='重新出發，路線不會改變。';next.hidden=true;draw();}),next=btn('下一個迷宮 →','primary',()=>{level++;newLevel();});tools.append(help,retry,next);stage.append(tools);
board.addEventListener('keydown',e=>{const dir={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}[e.key];if(dir){e.preventDefault();move(dir);}});
function draw(){
board.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';board.replaceChildren();progress.textContent='第 '+(level+1)+' / 5 關 · 已走 '+moves+' 步';
walls.forEach((wall,i)=>{const cell=el('div','sp-cell'+(visited.has(i)?' visited':'')+(i===hint?' hint':''));cell.dataset.cell=String(i);
cell.style.borderTopWidth=(wall&1)?'2px':'0';cell.style.borderRightWidth=(wall&2)?'2px':'0';cell.style.borderBottomWidth=(wall&4)?'2px':'0';cell.style.borderLeftWidth=(wall&8)?'2px':'0';
if(i===n*n-1){cell.textContent='🏠';cell.setAttribute('aria-label','終點，小屋');}
if(i===pos){cell.append(catImage('yahoo','walk','sp-cat'));cell.setAttribute('aria-current','location');cell.setAttribute('aria-label','雅虎在第 '+(Math.floor(i/n)+1)+' 排第 '+(i%n+1)+' 格');}board.append(cell);});
}
function move(dir){
if(done)return;const q=mazeStep(walls,n,pos,dir);if(q===pos){feedback.textContent='這邊是牆壁，換個方向試試看。';return;}
pos=q;moves++;hint=-1;visited.add(pos);feedback.textContent='';
if(pos===n*n-1){done=true;sound();feedback.textContent=level===4?'五個迷宮都完成了！雅虎安全到家 ⭐':'雅虎到家了！準備好再玩下一關。';next.hidden=level===4;help.disabled=true;if(level===4){retry.hidden=true;tools.append(btn('再探險一次 ↻','primary',maze));}}draw();
}
function newLevel(){n=4+level;walls=makeMaze(n);pos=0;moves=0;done=false;hint=-1;visited=new Set([0]);feedback.textContent='';next.hidden=true;help.disabled=false;draw();}
newLevel();
}
function mathChoices(answer,max){
const values=new Set([answer]);for(const delta of shuffle([-2,-1,1,2,3,-3,4])){const v=answer+delta;if(v>=0&&v<=max)values.add(v);if(values.size===4)break;}
for(let v=0;values.size<4;v++)values.add(v);return shuffle([...values]);
}
function snackshop(limit=20){
const stage=shell('snackshop');configs(stage,[[20,'20 元以內'],[50,'50 元以內']],limit,v=>snackshop(v));
let round=0,done=false,showHint=()=>{};const body=el('div');stage.append(body);const feedback=status(stage),tools=el('div','sp-toolbar'),help=btn('看看計算提示','secondary',()=>showHint()),next=btn('下一張訂單 →','primary',()=>{round++;render();});tools.append(help,next);stage.append(tools);
function render(){
body.replaceChildren();feedback.textContent='';next.hidden=true;done=false;
if(round>=5){help.hidden=true;body.append(el('h3','','五張訂單都完成了！小店長好棒 ⭐'),btn('再開店一次 ↻','primary',()=>snackshop(limit)));return;}
const goods=shuffle([['🍎','蘋果'],['🍞','麵包'],['🥛','牛奶'],['🍪','餅乾']]).slice(0,2),max=limit===20?9:20,a=2+Math.floor(Math.random()*(max-1)),b=2+Math.floor(Math.random()*(max-1)),sum=a+b,change=round%2===1,answer=change?limit-sum:sum;
body.append(el('p','sp-progress','第 '+(round+1)+' / 5 張訂單'));const receipt=el('div','sp-receipt');receipt.append(el('p','',goods[0][0]+' '+goods[0][1]+'：'+a+' 元'),el('p','',goods[1][0]+' '+goods[1][1]+'：'+b+' 元'));if(change)receipt.append(el('p','','客人付了 '+limit+' 元。'));body.append(receipt,el('p','question',change?'應該找回多少元？':'這張訂單一共多少元？'));
const choices=el('div','mg-choices');mathChoices(answer,limit).forEach(value=>{const button=btn(value+' 元','mg-choice',()=>{if(done)return;if(value!==answer){feedback.textContent=change?'先算兩樣東西的總價，再從客人付的錢扣掉。':'先把兩個價格加起來，慢慢算就可以。';return;}done=true;button.classList.add('correct');choices.querySelectorAll('button').forEach(x=>x.disabled=true);feedback.textContent='算對了！'+(change?limit+' − '+sum:a+' ＋ '+b)+' ＝ '+answer+' 元。';sound();next.hidden=false;next.textContent=round===4?'看看我的店長星星 ⭐':'下一張訂單 →';});choices.append(button);});body.append(choices);
showHint=()=>{feedback.textContent=a+' ＋ '+b+' ＝ '+sum+' 元。'+(change?'再算 '+limit+' − '+sum+' ＝ '+answer+' 元。':'兩樣東西加起來就是總價。');};
}
render();
}
const codePuzzles=[
{tokens:['2','4','6','8','？'],answer:'10',choices:['9','10','12','14'],hint:'每次加 2，接著是 8 ＋ 2。'},
{tokens:['1','3','5','7','？'],answer:'9',choices:['8','9','10','11'],hint:'每次加 2，接著是 7 ＋ 2。'},
{tokens:['5','10','15','20','？'],answer:'25',choices:['21','24','25','30'],hint:'每次加 5，接著是 20 ＋ 5。'},
{tokens:['20','17','14','11','？'],answer:'8',choices:['7','8','9','10'],hint:'每次少 3，接著是 11 − 3。'},
{tokens:['1','2','4','8','？'],answer:'16',choices:['10','12','16','18'],hint:'每個數字都是前一個的兩倍。'},
{tokens:['⭐','○','⭐','○','？'],answer:'⭐',choices:['⭐','○','△','□'],hint:'星星、圓圈，兩個一組重複出現。'},
{tokens:['△','□','○','△','□','？'],answer:'○',choices:['△','□','○','⭐'],hint:'三角形、正方形、圓圈，三個一組。'},
{tokens:['⭐','○','○','⭐','○','？'],answer:'○',choices:['△','□','○','⭐'],hint:'每組都是一顆星星、兩個圓圈。'},
{tokens:['1','1','2','2','3','？'],answer:'3',choices:['2','3','4','6'],hint:'每個數字都連續出現兩次。'},
{tokens:['3','6','9','12','？'],answer:'15',choices:['13','14','15','18'],hint:'每次加 3，接著是 12 ＋ 3。'}
];
function codequest(){
const stage=shell('codequest');let round=0;const deck=shuffle(codePuzzles).slice(0,5),body=el('div');stage.append(body);const feedback=status(stage),tools=el('div','sp-toolbar'),hint=btn('看看規律提示','secondary',()=>{feedback.textContent=deck[round].hint;}),next=btn('下一個密碼 →','primary',()=>{round++;render();});tools.append(hint,next);stage.append(tools);
function render(){
body.replaceChildren();feedback.textContent='';next.hidden=true;
if(round>=5){hint.hidden=true;body.append(el('h3','','五道密碼解開了！雅虎向你致敬 🔎 ⭐'),btn('再解一組新密碼 ↻','primary',codequest));return;}
let done=false;const puzzle=deck[round];body.append(el('p','sp-progress','第 '+(round+1)+' / 5 道密碼'),el('p','question','觀察前面的規律，問號應該放什麼？'));
const pattern=el('div','sp-pattern');puzzle.tokens.forEach(token=>pattern.append(el('span','sp-token',token)));body.append(pattern);const answers=el('div','mg-choices');
shuffle(puzzle.choices).forEach(value=>{const button=btn(value,'mg-choice',()=>{if(done)return;if(value!==puzzle.answer){feedback.textContent='再看看前面是怎麼重複或變化的，也可以按提示。';return;}done=true;button.classList.add('correct');answers.querySelectorAll('button').forEach(x=>x.disabled=true);sound();feedback.textContent='密碼正確！'+puzzle.hint;next.hidden=false;next.textContent=round===4?'領取解謎星星 ⭐':'下一個密碼 →';});answers.append(button);});body.append(answers);
}render();
}
const storySets=[
{title:'一起吃早餐',parts:['先把雙手洗乾淨。','接著坐到餐桌旁。','然後開心吃早餐。','最後把碗筷收好。']},
{title:'準備上學',parts:['先把要帶的東西放進書包。','接著換好外出的衣服。','然後穿上鞋子。','最後背起書包出門。']},
{title:'陪右右吃點心',parts:['先把食碗洗乾淨。','接著把點心放進碗裡。','然後讓右右慢慢吃。','最後把吃完的碗收好。']},
{title:'公園玩耍',parts:['先和家人一起走到公園。','接著排隊等溜滑梯。','然後輪到自己，開心滑下來。','最後向公園說再見，一起回家。']},
{title:'畫一張圖',parts:['先準備好白紙和畫筆。','接著畫出喜歡的貓咪。','然後替貓咪塗上顏色。','最後把畫筆收回盒子裡。']}
];
function storytiles(){
const stage=shell('storytiles');let round=0,selected=[],done=false,order=[];const deck=shuffle(storySets),body=el('div');stage.append(body);const feedback=status(stage),tools=el('div','sp-toolbar');
const check=btn('排好了，看看故事','primary',checkStory),undo=btn('退回一張','secondary',()=>{if(done||!selected.length)return;selected.pop();feedback.textContent='';draw();}),reset=btn('重新排這一題','secondary',()=>{if(done)return;selected=[];feedback.textContent='';draw();}),hint=btn('給我一點提示','secondary',()=>{if(done)return;const correctPrefix=selected.findIndex((v,i)=>v!==i);const nextIndex=correctPrefix>=0?correctPrefix:Math.min(selected.length,3);feedback.textContent='看看順序詞「先、接著、然後、最後」。第 '+(nextIndex+1)+' 張可以找：「'+deck[round].parts[nextIndex]+'」';}),next=btn('下一個故事 →','primary',()=>{round++;fresh();});
tools.append(check,undo,reset,hint,next);
const listen=btn('🔊 聽聽完整故事','secondary',()=>{if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(deck[round].title+'。'+deck[round].parts.join(''));utterance.lang='zh-TW';utterance.rate=.8;window.speechSynthesis.speak(utterance);});listen.hidden=!('speechSynthesis'in window);tools.append(listen);stage.append(tools);
cleanup=()=>{if('speechSynthesis'in window)window.speechSynthesis.cancel();};
function fresh(){if('speechSynthesis'in window)window.speechSynthesis.cancel();selected=[];done=false;feedback.textContent='';next.hidden=true;
if(round>=5){body.replaceChildren(el('h3','','五個故事排好了！你是小小故事家 📚 ⭐'),btn('再說一回故事 ↻','primary',storytiles));tools.hidden=true;return;}
order=shuffle([0,1,2,3]);if(order.every((v,i)=>v===i))[order[0],order[1]]=[order[1],order[0]];draw();
}
function draw(){body.replaceChildren();body.append(el('p','sp-progress','第 '+(round+1)+' / 5 個故事：'+deck[round].title),el('p','question','把四張句子卡依照事情發生的順序排好。'));
const slots=el('div','sp-story-slots');slots.setAttribute('aria-label','目前排好的故事');if(!selected.length)slots.append(el('p','mg-tip','點下方句子卡，就會排到這裡。'));selected.forEach((value,i)=>slots.append(el('p','sp-story-piece sp-chosen',(i+1)+'．'+deck[round].parts[value])));body.append(slots);
const choices=el('div','sp-story-choices');order.forEach(value=>{const b=btn(deck[round].parts[value],'sp-story-piece',()=>{if(done||selected.includes(value))return;selected.push(value);feedback.textContent='';draw();});b.disabled=done||selected.includes(value);b.setAttribute('aria-pressed',String(selected.includes(value)));choices.append(b);});body.append(choices);check.disabled=done||selected.length!==4;undo.disabled=done||!selected.length;reset.disabled=done;hint.disabled=done;
}
function checkStory(){if(done||selected.length!==4)return;if(!selected.every((v,i)=>v===i)){feedback.textContent='有一張順序還可以調整。按「退回一張」或「重新排」，慢慢試。';return;}done=true;sound();feedback.textContent='故事排好了！讀一讀，事情就連起來了。';draw();next.hidden=false;next.textContent=round===4?'領取故事家星星 ⭐':'下一個故事 →';}
fresh();
}
const freshIds=['maze','snackshop','codequest','storytiles'];
const newButtons=freshIds.map(id=>areas.dodo.grid.querySelector('[data-game-id="'+id+'"]'));
newButtons.forEach(b=>b.classList.add('sp-new'));areas.dodo.grid.prepend(...newButtons);
const newNote=el('p','sp-new-note','✨ 六歲＋新挑戰在最前面！探索迷宮、當小店長、解密碼、排故事，每款都有多關和提示，不用趕時間。');
areas.dodo.menu.querySelector('.mg-menu-heading').after(newNote);


/* Family hosts: eight new untimed games for ages six and up. */
const familyHosts={
devil:{name:'小惡魔',icon:'👿'},
ama:{name:'兔阿嬤',icon:'🧺',image:'/assets/img/portrait-ama.png'},
mom:{name:'鼠媽媽',icon:'🌷',image:'/assets/img/portrait-mom.png'},
dad:{name:'雞爸爸',icon:'👓',image:'/assets/img/portrait-dad.png'}
};
const familyGameHost={truthdetective:'devil',opposite:'devil',grocery:'ama',clock:'ama',tidy:'mom',dayplan:'mom',numberhunt:'dad',spot:'dad'};
function familyStage(id){
const stage=shell(id),host=familyHosts[familyGameHost[id]],banner=el('div','fg-host');
if(host.image){const picture=el('img','fg-avatar');picture.src=host.image;picture.alt=host.name;banner.append(picture);}
else banner.append(el('span','fg-devil',host.icon));
banner.append(el('p','',host.name+'陪你玩 · 不限時，慢慢想也很棒。'));stage.append(banner);return stage;
}
const familyStyle=el('style');familyStyle.textContent=`
.fg-host{display:flex;align-items:center;justify-content:center;gap:16px;margin:0 0 20px}.fg-host p{font-size:19px;line-height:1.8}.fg-avatar{width:66px;height:78px;object-fit:cover;object-position:top;border-radius:16px;display:block}.fg-devil{font-size:48px}.mg-card>.fg-avatar{float:right;margin:0 0 10px 12px}.fg-filter{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 22px}.fg-filter .pill[aria-pressed=true]{background:#426b54;color:white}.fg-claim{max-width:620px;margin:20px auto;padding:24px;background:#fff5df;border:1px solid #ead5af;border-radius:20px;font-size:25px;line-height:1.8}.fg-hero-word{font-size:38px;font-weight:800;color:#426b54;margin:18px}.fg-grocery{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding:20px;background:#fff9e8;border:2px dashed #d8c59b;border-radius:20px;margin:20px auto;max-width:620px}.fg-grocery-item{font-size:22px;padding:10px}.fg-list-buttons{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:20px auto;max-width:650px}.fg-list-buttons button{font-size:20px;line-height:1.7;padding:14px 8px;min-height:74px;border:2px solid #d7e1ca;border-radius:16px;background:#fff;color:#3c5334}.fg-list-buttons button[aria-pressed=true]{background:#e2efd4;border-color:#708e59}.fg-clock{display:block;width:min(100%,300px);height:auto;margin:20px auto}.fg-clock text{font:700 17px system-ui;fill:#384d37}.fg-clock .fg-hour{stroke:#426b54;stroke-width:7;stroke-linecap:round}.fg-clock .fg-minute{stroke:#94642f;stroke-width:4;stroke-linecap:round}.fg-room{min-width:120px;min-height:95px;line-height:1.6}.fg-timeline{display:flex;gap:10px;flex-wrap:wrap;max-width:620px;margin:20px auto;justify-content:center}.fg-slot{font-size:20px;padding:16px;background:#eaf0df;border:1px dashed #b8cba4;border-radius:14px;flex:1;min-width:135px}.fg-number-input{font:inherit;font-size:28px;width:150px;max-width:100%;padding:12px;border:2px solid #a9be94;border-radius:14px;text-align:center}.fg-number-range{font-size:30px;font-weight:800;color:#426b54;padding:20px}.fg-scenes{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:740px;margin:20px auto}.fg-scene{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.fg-scene-cell{min-height:68px;aspect-ratio:1;font-size:34px;border:2px solid #d9e0ca;border-radius:14px;display:grid;place-items:center;background:white;padding:5px;color:#35472f}.fg-scene-cell.found{background:#e1efd3;border-color:#719655}.fg-scene-cell.hinted{outline:4px solid #e4ae46;outline-offset:1px}.fg-clue-note{font-size:20px;line-height:1.8;margin:18px auto;max-width:620px}
@media(max-width:560px){.fg-list-buttons{grid-template-columns:repeat(2,minmax(0,1fr))}.fg-scenes{grid-template-columns:1fr;gap:14px}.fg-scene{max-width:320px;margin:auto}.fg-scene-cell{min-height:62px;font-size:32px}.fg-claim{font-size:23px;padding:20px}.fg-hero-word{font-size:34px}.fg-filter .pill{flex:1 1 auto}.fg-avatar{width:60px;height:72px}}
`;document.head.append(familyStyle);
const truthBank=[
{claim:'2 ＋ 2 ＋ 2 等於 6。',answer:true,reason:'三個 2 相加：2 ＋ 2 ＋ 2 ＝ 6。'},
{claim:'一星期有八天。',answer:false,reason:'一星期有七天，不是八天。'},
{claim:'9 比 12 大。',answer:false,reason:'9 比 12 小，數字可以放在數線上比較。'},
{claim:'三角形有三條邊。',answer:true,reason:'三角形的三條邊連成一圈。'},
{claim:'10 元買了 6 元的東西，應找回 4 元。',answer:true,reason:'10 − 6 ＝ 4。'},
{claim:'每個月都剛好有 30 天。',answer:false,reason:'月份的天數不同，有的 30 天、有的 31 天，二月也不同。'},
{claim:'兩個 5 元，和一個 10 元一樣多。',answer:true,reason:'5 ＋ 5 ＝ 10，總金額一樣。'},
{claim:'正方形有五個角。',answer:false,reason:'正方形有四個角。'},
{claim:'半小時就是 30 分鐘。',answer:true,reason:'一小時 60 分鐘，一半是 30 分鐘。'},
{claim:'1、3、5、7 都是雙數。',answer:false,reason:'它們都是單數；2、4、6、8 才是雙數。'},
{claim:'18 是兩個 9 相加。',answer:true,reason:'9 ＋ 9 ＝ 18。'},
{claim:'12 減掉 5，還有 8。',answer:false,reason:'12 − 5 ＝ 7。'}
];
function truthdetective(){
const stage=familyStage('truthdetective'),deck=shuffle(truthBank).slice(0,5);let round=0;const body=el('div');stage.append(body);const feedback=status(stage),next=btn('下一個說法 →','primary',()=>{round++;render();});stage.append(next);
function render(){body.replaceChildren();feedback.textContent='';next.hidden=true;if(round>=5){body.append(el('h3','','五個說法都看懂了！你是清醒的小偵探 👿 ⭐'),btn('再查一組說法 ↻','primary',truthdetective));return;}
const item=deck[round];let done=false;body.append(el('p','sp-progress','第 '+(round+1)+' / 5 題'),el('p','question','小惡魔的這句話，對不對？'),el('p','fg-claim','👿「'+item.claim+'」'));const row=el('div','mg-choices');[[true,'✓ 這句是對的'],[false,'✕ 這句不對']].forEach(([value,label])=>{const b=btn(label,'mg-choice',()=>{if(done)return;if(value!==item.answer){feedback.textContent='再想一想，可以數一數、算一算。';return;}done=true;b.classList.add('correct');row.querySelectorAll('button').forEach(x=>x.disabled=true);feedback.textContent='看懂了！'+item.reason;sound();next.hidden=false;next.textContent=round===4?'領取偵探星星 ⭐':'下一個說法 →';});row.append(b);});body.append(row);
}render();
}
const oppositePairs=[['大','小'],['高','低'],['長','短'],['快','慢'],['上','下'],['左','右'],['多','少'],['開','關']];
function opposite(mode='reverse'){
const stage=familyStage('opposite');configs(stage,[['reverse','先練習：唱反調'],['mixed','挑戰：規則會換']],mode,v=>opposite(v));let round=0;const body=el('div');stage.append(body);const feedback=status(stage),next=btn('下一個口令 →','primary',()=>{round++;render();});stage.append(next);
function render(){body.replaceChildren();feedback.textContent='';next.hidden=true;if(round>=8){body.append(el('h3','','八個口令都完成！你有先看清楚規則 👿 ⭐'),btn('再挑戰一回 ↻','primary',()=>opposite(mode)));return;}
const pair=oppositePairs[round],reverse=mode==='reverse'||round%2===0,from=Math.random()<.5?0:1,word=pair[from],answer=pair[reverse?1-from:from];let done=false;
body.append(el('p','sp-progress','第 '+(round+1)+' / 8 個口令'),el('p','fg-claim',reverse?'👿 這次唱反調：請按「相反的字」。':'👿 這次照著做：請按「一樣的字」。'),el('div','fg-hero-word',word));const row=el('div','mg-choices');shuffle(pair).forEach(value=>{const b=btn(value,'mg-choice',()=>{if(done)return;if(value!==answer){feedback.textContent=reverse?'這一題要找相反的字，再看一下規則。':'這一題要找一樣的字，再看一下規則。';return;}done=true;b.classList.add('correct');row.querySelectorAll('button').forEach(x=>x.disabled=true);feedback.textContent='規則看清楚了！'+word+(reverse?'的相反是':'和這個字一樣：')+answer+'。';sound();next.hidden=false;next.textContent=round===7?'看看口令成果 ⭐':'下一個口令 →';});row.append(b);});body.append(row);
}render();
}
const groceryItems=[['🍎','蘋果'],['🥕','紅蘿蔔'],['🍌','香蕉'],['🥚','雞蛋'],['🥛','牛奶'],['🍞','麵包'],['🥦','花椰菜'],['🍅','番茄'],['🍇','葡萄'],['🌽','玉米'],['🥔','馬鈴薯'],['🍊','橘子']];
function grocery(level=3){
const stage=familyStage('grocery');configs(stage,[[3,'記住 3 樣'],[5,'挑戰 5 樣']],level,v=>grocery(v));let round=0,list=[],options=[],picked=new Set(),phase='list';const body=el('div');stage.append(body);const feedback=status(stage),tools=el('div','sp-toolbar');
const ready=btn('我記好了，去買菜！','primary',()=>{phase='choose';feedback.textContent='';render();}),again=btn('再看一次清單','secondary',()=>{phase='list';feedback.textContent='';render();}),check=btn('買好了，核對清單','primary',()=>{if(picked.size!==level){feedback.textContent='這次要買 '+level+' 樣，再數一數。';return;}if([...picked].some(i=>!list.includes(i))){feedback.textContent='有一樣還可以換一換；按「再看一次清單」也沒關係。';return;}phase='done';sound();render();feedback.textContent='清單上的都買齊了！兔阿嬤謝謝你。';}),next=btn('下一張清單 →','primary',()=>{round++;fresh();});tools.append(ready,again,check,next);stage.append(tools);
function fresh(){if(round>=3){body.replaceChildren(el('h3','','三張清單完成！記憶小幫手 ⭐'),btn('再陪兔阿嬤買一次 ↻','primary',()=>grocery(level)));tools.hidden=true;feedback.textContent='';return;}list=shuffle(Array.from({length:groceryItems.length},(_,i)=>i)).slice(0,level);options=shuffle([...list,...shuffle(Array.from({length:groceryItems.length},(_,i)=>i).filter(i=>!list.includes(i))).slice(0,4)]);picked=new Set();phase='list';feedback.textContent='';render();}
function render(){body.replaceChildren();body.append(el('p','sp-progress','第 '+(round+1)+' / 3 張清單'),el('p','question',phase==='list'?'慢慢看清楚，不用趕時間。記好了再按出發。':'選出清單上的 '+level+' 樣食物。'));
ready.hidden=phase!=='list';again.hidden=phase!=='choose';check.hidden=phase!=='choose';next.hidden=phase!=='done';next.textContent=round===2?'看看採買成果 ⭐':'下一張清單 →';
if(phase==='list'){const row=el('div','fg-grocery');list.forEach(i=>row.append(el('span','fg-grocery-item',groceryItems[i].join(' '))));body.append(row);}
else{body.append(el('p','mg-counter','已選 '+picked.size+' / '+level+' 樣'));const row=el('div','fg-list-buttons');options.forEach(i=>{const b=btn(groceryItems[i].join(' '),'',()=>{if(phase!=='choose')return;if(picked.has(i))picked.delete(i);else if(picked.size<level)picked.add(i);else{feedback.textContent='先取消一樣，再換成想選的食物。';return;}feedback.textContent='';render();});b.setAttribute('aria-pressed',String(picked.has(i)));b.disabled=phase==='done';row.append(b);});body.append(row);}
}fresh();
}
function clockLabel(hour,minute){return hour+'：'+String(minute).padStart(2,'0');}
function clockFace(hour,minute){
const point=(angle,length)=>({x:150+Math.sin(angle*Math.PI/180)*length,y:150-Math.cos(angle*Math.PI/180)*length});
let svg='<svg class="fg-clock" viewBox="0 0 300 300" role="img" aria-label="時鐘：短針在 '+hour+' 點附近，長針指向 '+(minute/5||12)+'"><circle cx="150" cy="150" r="142" fill="#fffdf3" stroke="#b4c59e" stroke-width="5"/>';
for(let number=1;number<=12;number++){const p=point(number*30,116);svg+='<text x="'+p.x+'" y="'+(p.y+6)+'" text-anchor="middle">'+number+'</text>';}
const h=point((hour%12)*30+minute*.5,67),m=point(minute*6,98);
svg+='<line class="fg-hour" x1="150" y1="150" x2="'+h.x+'" y2="'+h.y+'"/><line class="fg-minute" x1="150" y1="150" x2="'+m.x+'" y2="'+m.y+'"/><circle cx="150" cy="150" r="7" fill="#426b54"/></svg>';return svg;
}
function clock(level='half'){
const stage=familyStage('clock');configs(stage,[['half','整點與半點'],['quarter','加入一刻鐘']],level,v=>clock(v));let round=0;const body=el('div');stage.append(body);const feedback=status(stage),next=btn('下一個時鐘 →','primary',()=>{round++;render();});stage.append(next);
function render(){body.replaceChildren();feedback.textContent='';next.hidden=true;if(round>=5){body.append(el('h3','','五個時鐘都看懂了！時間小高手 ⭐'),btn('再看一回時鐘 ↻','primary',()=>clock(level)));return;}
let done=false;const hour=1+Math.floor(Math.random()*12),mins=level==='half'?[0,30]:[0,15,30,45],minute=mins[Math.floor(Math.random()*mins.length)],answer=clockLabel(hour,minute);
body.append(el('p','sp-progress','第 '+(round+1)+' / 5 個時鐘'),el('p','question','現在是幾點幾分？'));const face=el('div');face.innerHTML=clockFace(hour,minute);body.append(face,el('p','mg-tip','綠色短針看小時，棕色長針看分鐘；長針走一格數字是 5 分鐘。'));
const choices=new Set([answer,clockLabel(hour%12+1,minute)]);for(const m of [0,15,30,45]){choices.add(clockLabel(hour,m));if(choices.size>=4)break;}
const row=el('div','mg-choices');shuffle([...choices]).forEach(value=>{const b=btn(value,'mg-choice',()=>{if(done)return;if(value!==answer){feedback.textContent='先看短針接近幾點，再看長針指到哪一個數字。';return;}done=true;b.classList.add('correct');row.querySelectorAll('button').forEach(x=>x.disabled=true);feedback.textContent='對了，是 '+hour+' 點 '+minute+' 分。';sound();next.hidden=false;next.textContent=round===4?'領取時間星星 ⭐':'下一個時鐘 →';});row.append(b);});body.append(row);
}render();
}
const tidyItems=[{icon:'🥣',name:'飯碗',room:'廚房'},{icon:'🥄',name:'湯匙',room:'廚房'},{icon:'🍳',name:'平底鍋',room:'廚房'},{icon:'🧦',name:'襪子',room:'衣櫃'},{icon:'🧥',name:'外套',room:'衣櫃'},{icon:'👕',name:'上衣',room:'衣櫃'},{icon:'✏️',name:'鉛筆',room:'書桌'},{icon:'📚',name:'故事書',room:'書桌'},{icon:'📏',name:'尺',room:'書桌'}];
function tidy(){
const stage=familyStage('tidy'),deck=shuffle(tidyItems).slice(0,6);let round=0;const body=el('div');stage.append(body);const feedback=status(stage),next=btn('收下一樣 →','primary',()=>{round++;render();});stage.append(next);
function render(){body.replaceChildren();feedback.textContent='';next.hidden=true;if(round>=6){body.append(el('h3','','六樣東西都回家了！鼠媽媽的小幫手 ⭐'),btn('再整理一回 ↻','primary',tidy));return;}
let done=false;const item=deck[round];body.append(el('p','sp-progress','第 '+(round+1)+' / 6 樣物品'),el('p','question','幫這樣東西找個合適的家。'),el('div','fg-hero-word',item.icon+' '+item.name));const row=el('div','mg-choices');[['🍳','廚房'],['👕','衣櫃'],['📖','書桌']].forEach(([icon,room])=>{const b=btn(icon+' '+room,'mg-choice fg-room',()=>{if(done)return;if(room!==item.room){feedback.textContent='想一想，這樣東西平常在哪裡使用或收納？';return;}done=true;b.classList.add('correct');row.querySelectorAll('button').forEach(x=>x.disabled=true);feedback.textContent=item.name+'收進'+room+'，整齊又好找！';sound();next.hidden=false;next.textContent=round===5?'看看整理成果 ⭐':'收下一樣 →';});row.append(b);});body.append(row);
}render();
}
const planSets=[
[{time:8,label:'吃早餐'},{time:10,label:'去公園'},{time:12,label:'吃午餐'}],
[{time:9,label:'畫一張圖'},{time:11,label:'收好畫筆'},{time:14,label:'讀故事書'}],
[{time:7,label:'起床'},{time:8,label:'到學校'},{time:16,label:'回到家'}],
[{time:14,label:'整理玩具'},{time:16,label:'吃點心'},{time:18,label:'吃晚餐'}],
[{time:15,label:'陪貓咪玩'},{time:18,label:'吃晚餐'},{time:20,label:'準備睡覺'}]
];
function dayplan(){
const stage=familyStage('dayplan'),deck=shuffle(planSets);let round=0,picked=[],order=[],done=false;const body=el('div');stage.append(body);const feedback=status(stage),tools=el('div','sp-toolbar');
const undo=btn('退回一張','secondary',()=>{if(done||!picked.length)return;picked.pop();feedback.textContent='';draw();}),check=btn('排好了！','primary',()=>{if(done||picked.length!==3)return;if(!picked.every((v,i)=>v===i)){feedback.textContent='先看時間的小時數字，數字小的先發生。可以退回調整。';return;}done=true;sound();draw();feedback.textContent='先後順序排好了，鼠媽媽可以照計畫出發囉！';next.hidden=false;}),next=btn('下一天的計畫 →','primary',()=>{round++;fresh();});tools.append(undo,check,next);stage.append(tools);
function fresh(){picked=[];done=false;feedback.textContent='';next.hidden=true;if(round>=5){tools.hidden=true;body.replaceChildren(el('h3','','五天的計畫排好了！時間安排小幫手 ⭐'),btn('再排一回 ↻','primary',dayplan));return;}order=shuffle([0,1,2]);if(order.every((v,i)=>v===i))[order[0],order[1]]=[order[1],order[0]];draw();}
function draw(){body.replaceChildren();body.append(el('p','sp-progress','第 '+(round+1)+' / 5 天的計畫'),el('p','question','看 24 小時制的時間，把三件事從早到晚排好。'));
const line=el('div','fg-timeline');for(let i=0;i<3;i++){const item=picked[i]!==undefined?deck[round][picked[i]]:null;line.append(el('div','fg-slot',item?String(item.time).padStart(2,'0')+':00 '+item.label:'第 '+(i+1)+' 件事'));}body.append(line);
const row=el('div','sp-story-choices');order.forEach(i=>{const item=deck[round][i],b=btn(String(item.time).padStart(2,'0')+':00 '+item.label,'sp-story-piece',()=>{if(done||picked.includes(i))return;picked.push(i);feedback.textContent='';draw();});b.disabled=done||picked.includes(i);row.append(b);});body.append(row,el('p','mg-tip','例如 14:00 是下午 2 點，18:00 是下午 6 點。'));check.disabled=done||picked.length!==3;undo.disabled=done||!picked.length;next.textContent=round===4?'領取計畫星星 ⭐':'下一天的計畫 →';
}fresh();
}
function numberhunt(max=30){
const stage=familyStage('numberhunt');configs(stage,[[30,'1 到 30'],[100,'挑戰到 100']],max,v=>numberhunt(v));
let target=1+Math.floor(Math.random()*max),low=1,high=max,tries=0,done=false;stage.append(el('p','question','雞爸爸藏了一個整數。每猜一次，都會告訴你太大還是太小。'));
const range=el('p','fg-number-range'),count=el('p','mg-counter','已猜 0 次，沒有次數限制。'),row=el('div','sp-toolbar'),input=el('input','fg-number-input');
input.type='number';input.inputMode='numeric';input.min='1';input.max=String(max);input.step='1';input.setAttribute('aria-label','輸入猜的整數');const label=el('label','','我猜是：');label.append(input);row.append(label);
const submit=btn('猜猜看','primary',guess);row.append(submit);stage.append(range,count,row);const feedback=status(stage),again=btn('再猜一個數字 ↻','primary',()=>numberhunt(max));again.hidden=true;stage.append(again,el('p','mg-tip','小提示：先猜範圍中間的數字，可以更快縮小範圍。'));
function draw(){range.textContent='目前範圍：'+low+' ～ '+high;input.min=String(low);input.max=String(high);}
function guess(){if(done)return;const text=String(input.value??'').trim(),value=Number(text);if(!/^\d+$/.test(text)||!Number.isInteger(value)||value<low||value>high){feedback.textContent='請輸入 '+low+' 到 '+high+' 之間的整數。';return;}
tries++;count.textContent='已猜 '+tries+' 次，沒有次數限制。';if(value===target){done=true;feedback.textContent='猜中了！雞爸爸藏的是 '+target+'，你用了 '+tries+' 次 ⭐';submit.disabled=true;input.disabled=true;again.hidden=false;sound();}
else{if(value<target){low=value+1;feedback.textContent='太小了！再找一個大一點的數字。';}else{high=value-1;feedback.textContent='太大了！再找一個小一點的數字。';}input.value='';draw();input.focus();}
}
input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();guess();}});draw();
}
const sceneItems=[['🍎','紅蘋果'],['🍏','青蘋果'],['🍌','香蕉'],['🍊','橘子'],['🚗','小汽車'],['🚕','計程車'],['⚽','足球'],['🏀','籃球'],['🧸','小熊'],['📚','書本'],['🌷','鬱金香'],['🌻','向日葵'],['⭐','星星'],['🌙','月亮'],['🎈','氣球'],['🎁','禮物']];
function spot(){
const stage=familyStage('spot');let round=0,differences=[],found=new Set(),left=[],right=[];const body=el('div');stage.append(body);const feedback=status(stage),tools=el('div','sp-toolbar'),hint=btn('提示一個位置','secondary',()=>{const index=differences.find(i=>!found.has(i));if(index!==undefined){const cell=body.querySelectorAll('.fg-right-cell')[index];cell.classList.add('hinted');feedback.textContent='看看黃色外框這一格，和左圖有什麼不同？';}}),next=btn('下一組生活畫面 →','primary',()=>{round++;fresh();});tools.append(hint,next);stage.append(tools);
function fresh(){body.replaceChildren();feedback.textContent='';next.hidden=true;if(round>=5){hint.hidden=true;body.append(el('h3','','五組不同都找到了！生活小偵探 ⭐'),btn('再觀察一回 ↻','primary',spot));return;}
left=shuffle(sceneItems).slice(0,9);right=left.slice();differences=shuffle([0,1,2,3,4,5,6,7,8]).slice(0,3);found=new Set();
differences.forEach(i=>{right[i]=shuffle(sceneItems.filter(item=>item[1]!==left[i][1]))[0];});
body.append(el('p','sp-progress','第 '+(round+1)+' / 5 組 · 找到 0 / 3 處不同'),el('p','question','比較兩張圖，點右圖不一樣的三個格子。'));const scenes=el('div','fg-scenes');
for(let side=0;side<2;side++){const box=el('div');box.append(el('h3','',side?'右圖：點不同的地方':'左圖：參考圖'));const grid=el('div','fg-scene');(side?right:left).forEach((item,index)=>{const cell=side?btn(item[0],'fg-scene-cell fg-right-cell',()=>choose(index,cell)):el('div','fg-scene-cell',item[0]);cell.setAttribute('aria-label',(side?'右圖':'左圖')+'第 '+(index+1)+' 格：'+item[1]);grid.append(cell);});box.append(grid);scenes.append(box);}body.append(scenes);
}
function choose(index,cell){if(found.has(index))return;if(!differences.includes(index)){feedback.textContent='這一格一樣，找找其他地方。';return;}
found.add(index);cell.classList.remove('hinted');cell.classList.add('found');cell.disabled=true;body.querySelector('.sp-progress').textContent='第 '+(round+1)+' / 5 組 · 找到 '+found.size+' / 3 處不同';feedback.textContent=found.size===3?'三處都找到了！雞爸爸佩服你的觀察力。':'找到一處了，再看看另外兩處。';sound();if(found.size===3){next.hidden=false;next.textContent=round===4?'領取觀察星星 ⭐':'下一組生活畫面 →';}
}fresh();
}
const familyIds=Object.keys(familyGameHost);
const familyCards=familyIds.map(id=>areas.dodo.grid.querySelector('[data-game-id="'+id+'"]'));
familyCards.forEach((card,i)=>{
const host=familyHosts[familyGameHost[familyIds[i]]];card.dataset.host=familyGameHost[familyIds[i]];card.classList.add('sp-new');
if(host.image){const picture=el('img','fg-avatar');picture.src=host.image;picture.alt=host.name;picture.loading='lazy';card.prepend(picture);const icon=card.querySelector('.mg-icon');if(icon)icon.hidden=true;}
});
areas.dodo.grid.prepend(...familyCards);
const roleFilters=el('div','fg-filter');roleFilters.setAttribute('role','group');roleFilters.setAttribute('aria-label','依角色找遊戲');
[['all','全部遊戲'],['new','八款新遊戲'],['devil','👿 小惡魔'],['ama','兔阿嬤'],['mom','鼠媽媽'],['dad','雞爸爸']].forEach(([key,label])=>{
const b=btn(label,'pill',()=>{roleFilters.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));areas.dodo.grid.querySelectorAll('.mg-card').forEach(card=>{card.hidden=key!=='all'&&(key==='new'?!familyIds.includes(card.dataset.gameId):card.dataset.host!==key);});});
b.setAttribute('aria-pressed',String(key==='all'));roleFilters.append(b);
});
areas.dodo.menu.querySelector('.mg-menu-heading').after(roleFilters);


})();
