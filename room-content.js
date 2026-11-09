/* One ordered room bar and one in-page game stage per room. */
(()=>{'use strict';
const scene=document.querySelector('.cdj-greeting[data-room]'),hero=scene?.closest('.cdj-welcome');if(!scene||!hero)return;
const room=scene.dataset.room,D=window.CDJHouseData;if(!D)return;
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const linkStyle=make('link');linkStyle.rel='stylesheet';linkStyle.href='/css/room-content.css?v=20261109-room13';document.head.append(linkStyle);
const welcome={living:'來坐，一起看我們家的影片。',dining:'一起來用餐吧',mom:'親子生活教養',ama:'安靜穩定力量',study:'生活點滴記錄',games:'一起放鬆一下',kitchen:'自己來做料理',bathroom:'浴廁安全守則'};
if(welcome[room])hero.querySelector('h1').textContent=welcome[room];
// Size the remaining rooms in image coordinates. Toddlers and schoolchildren
// retain their own body proportions, with a slight increase toward the camera.
const stature={dad:175,mom:160,ama:150,dodo:120,dragon:90};
const perspective={games:[290,290*stature.mom/stature.dad*.98,290*stature.ama/stature.dad*.98,290*stature.dodo/stature.dad*1.1,290*stature.dragon/stature.dad*1.1],kitchen:[290,290*stature.ama/stature.mom*.96],bathroom:[230,230*stature.dragon/stature.dodo*.96],study:[300,190,280],ama:[300]}[room];
if(perspective){const background=scene.querySelector('.greeting-scene'),people=[...scene.querySelectorAll('.greeting-character:not(.greeting-cat)')];const alignPeople=()=>{const box=background.getBoundingClientRect(),z=Math.max(box.width/960,box.height/640);people.forEach((p,i)=>{if(perspective[i])p.style.setProperty('--frame',perspective[i]*z+'px','important');});};new ResizeObserver(alignPeople).observe(background);alignPeople();}
scene.querySelectorAll('.greeting-character').forEach(p=>{if(p.dataset.greeting?.includes('歡迎'))p.dataset.greeting=welcome[room];});
// Retire the older strips so there is only one complete navigation row.
scene.querySelectorAll('.living-quick-links,.dining-quick-links,.mom-quick-links').forEach(e=>e.remove());
const groups={video:[],article:[],game:[],other:[]};
function add(group,label,url,options={}){const item={group,label,url,...options};groups[group].push(item);return item;}
const game=(label,url)=>add('game',label,url,{inline:true});
const section=(group,label,url,options)=>add(group,label,url,options);
const topic=(host,id)=>'/relax-family.html?host='+host+'&game='+id;
const fromGames=host=>D.games[host].filter(([id])=>!['coffee','ama-video','ama-exercise'].includes(id)).forEach(([id,label,,url])=>game(label,url==='topic'?topic(host,id):url));
if(room==='living'){
 section('video','YouTube 影片','#media-library-title',{filter:'platform:youtube'});section('video','Instagram 短片','#media-library-title',{filter:'platform:instagram'});
 section('article','珍山陳經典語錄','#living-zschen');
 game('神明拼圖','/ama-games.html?game=puzzle');game('掃貓毛','/play/?area=dragon&game=sweep');
 section('game','阿嬤養蘭花','#orchid-care',{tab:'orchid-tab'});section('game','姊姊腳踏車','#bicycle-race',{tab:'bike-tab'});
}else if(room==='dining'){
 game('雅虎喝水','/play/?area=dragon&game=chores');game('右右吃飯','/play/?area=dragon&game=feed');game('今天吃什麼水果','/dining-fruit.html');game('弟弟找零食','/dining-stairs.html');
 section('game','餐桌禮儀','#room-activity-dining');section('other','雞爸爸一家的菜單','#dining-mom-menu');
}else if(room==='mom'){
 section('article','一家故事','/articles.html?room=family#cards-grid');
 section('game','鼠媽媽排行程','#mom-plan');section('game','弟弟怎麼了','#mom-needs');fromGames('mom');
 section('other','鼠姊姊的一天','#mom-life');section('other','睡前小任務','/rooms.html?room=mom&flow=bedtime#mom-life');section('other','到客廳看影片','/videos.html');
}else if(room==='ama'){
 [['佛經講解','sutra'],['超慢跑','slow'],['健康養生','health']].forEach(([label,key])=>section('video',label,'#ama-room-media',{filter:'topic:'+key}));fromGames('ama');
 section('other','坐姿健康操','/ama-exercise.html',{inline:true});
}else if(room==='study'){
 D.filters.forEach(([key,label])=>section('article',label,'#cards-grid',{journal:key}));
}else if(room==='games'){
 section('video','鼠姊姊的影片','/play/?area=dodo&roomview=video',{inline:true});section('video','龍弟弟的影片','/play/?area=dragon&roomview=video',{inline:true});
 game('鼠姊姊學習樂園','/play/?area=dodo');game('龍弟弟快樂天地','/play/?area=dragon');fromGames('dad');
 section('other','到鼠窩','/rooms.html?room=mom');section('other','到兔窩','/rooms.html?room=ama');
}else if(room==='kitchen'){
 section('article','一家日常','/articles.html?room=family#cards-grid');section('game','手沖咖啡','#kitchen-coffee');section('other','廚房點菜','#room-activity-kitchen');
}else if(room==='bathroom'){
 section('article','健康期刊','/articles.html?room=cdhj#cards-grid');section('game','浴室生活小遊戲','#room-activity-bathroom');
 game('洗澡步驟小達人','/play/?area=dragon&game=bath');section('other','鼠姊姊的一天','/rooms.html?room=mom#mom-life');
}
const all=Object.values(groups).flat(),inline=all.filter(x=>x.inline),bar=make('nav','room-link-bar');bar.setAttribute('aria-label',(D.rooms[room]?.label||'房間')+'所有內容');
let current=null,frame=null,observer=null,resize=null,stage=null,select=null,feedback=null,launchButton=null;
const targetHost=document.querySelector('#house-content')||document.querySelector('main');
const canonical=raw=>{const u=new URL(raw,location.href);u.searchParams.delete('roomembed');return u.pathname+u.search+u.hash;};
function scrollTo(e){if(!e)return;e.tabIndex=-1;e.focus({preventScroll:true});e.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});}
function closeGame(){observer?.disconnect();observer=null;resize?.disconnect();resize=null;if(frame){try{frame.contentWindow.speechSynthesis?.cancel();frame.contentWindow.dispatchEvent(new Event('pagehide'));}catch(_){}frame.remove();frame=null;}current=null;}
function setupFrame(item){
 if(!frame)return;try{
 const doc=frame.contentDocument,win=frame.contentWindow;if(!doc?.body)return;
 if(!doc.body.textContent.trim()){feedback.textContent='這個遊戲檔案目前沒有內容，請稍後再試其他遊戲。';return;}
 const embedded=make('style');embedded.textContent=`html,body{height:auto!important;min-height:0!important;margin:0!important;overflow-x:hidden!important}body{background:#fffdf7!important}body>header,body>footer,.site-header,.site-footer,.cdj-welcome,.intro,.family-host-switch,#topic-menu,#arcade-tabs,.ama-top,.ama-tabs,.stairs-top,.ama-main>h1,main>.kicker,main>h1,.game-head,#adult-catalog,.adult-audio-note,[data-analytics-consent]{display:none!important}main,.ama-main,.stairs-main{width:100%!important;max-width:100%!important;padding:12px!important;margin:0!important;box-sizing:border-box!important;min-height:0!important}.stage,.ama-panel,.mg-panel{margin-top:0!important}canvas{display:block;width:auto!important;height:auto!important;margin-inline:auto;max-width:100%!important;object-fit:contain;max-height:var(--room-canvas-height,320px)!important}.cdj-unified-header{display:none!important}.mg-top>.secondary,.mg-classic>.secondary{display:none!important}.mgt-dock{position:static!important}#topic-stage>.toolbar{position:static!important}`;doc.head.append(embedded);
 doc.documentElement.style.setProperty('--room-canvas-height',Math.max(180,Math.min(380,innerHeight*.46))+'px');
 // Children retain their actual game code and save keys, with no duplicated site furniture.
 if(item.url.startsWith('/play/')){
   const video=new URL(item.url,location.href).searchParams.get('roomview')==='video';
   if(video){doc.querySelectorAll('.mg-section,.mg-classic,.mg-panel,.panel-head,.tabs').forEach(e=>e.style.setProperty('display','none','important'));}
   else if(new URL(item.url,location.href).searchParams.has('game'))doc.querySelectorAll('.tabs,.panel-head,.dv-corner').forEach(e=>e.style.setProperty('display','none','important'));
 }
 doc.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.getAttribute('href'),win.location.href);if(u.origin===location.origin&&inline.some(x=>canonical(x.url)===canonical(u.href)))a.addEventListener('click',e=>{e.preventDefault();open(u.href);});});
 const fit=()=>{if(!frame||frame.contentDocument!==doc)return;const main=doc.querySelector('main')||doc.body;const bottom=Math.max(main.getBoundingClientRect().bottom+win.scrollY,...[...doc.body.children].filter(e=>e.tagName!=='SCRIPT'&&win.getComputedStyle(e).display!=='none'&&win.getComputedStyle(e).position!=='fixed').map(e=>e.getBoundingClientRect().bottom+win.scrollY));const height=Math.min(24000,Math.max(240,Math.ceil(bottom+16)));if(Math.abs(frame.getBoundingClientRect().height-height)>2)frame.style.height=height+'px';};
 resize=new win.ResizeObserver(fit);resize.observe(doc.body);if(doc.querySelector('main'))resize.observe(doc.querySelector('main'));doc.addEventListener('load',fit,true);doc.addEventListener('click',()=>win.requestAnimationFrame(fit));fit();feedback.textContent='';
 }catch(_){feedback.textContent='遊戲暫時無法載入，可以按「重新載入遊戲」再試一次。';}
}
function loadFrame(item){closeGame();current=item;const index=inline.findIndex(x=>canonical(x.url)===canonical(item.url));select.value=String(index>=0?index:inline.findIndex(x=>x.url.startsWith('/ama-games.html')));stage.querySelector('h2').textContent=item.label;feedback.textContent='遊戲載入中…';frame=make('iframe','room-game-frame');frame.title=item.label+'（在本頁遊玩）';frame.setAttribute('allow','autoplay; fullscreen');frame.setAttribute('loading','lazy');frame.onload=()=>setupFrame(item);const url=new URL(item.url,location.href);url.searchParams.set('roomembed','1');frame.src=url.pathname+url.search+url.hash;stage.querySelector('.room-game-surface').replaceChildren(frame);launchButton.textContent='重新載入遊戲';
 document.querySelector('[data-bike-pause]:not(:disabled)')?.click();document.querySelectorAll('.dv-stop').forEach(b=>b.click());
}
function open(raw,label){const item=inline.find(x=>canonical(x.url)===canonical(raw))||inline.find(x=>new URL(raw,location.href).pathname==='/ama-games.html'&&x.url.startsWith('/ama-games.html'));if(!item)return false;
 const actual=canonical(raw)===canonical(item.url)?item:{...item,url:canonical(raw),label:label||item.label};
 if(!current||canonical(current.url)!==canonical(actual.url))loadFrame(actual);scrollTo(stage);return true;}
window.CDJRoom={open,entries:all.map(({group,label,url})=>({group,label,url}))};
if(room==='living')document.querySelectorAll('.ancestor-shrine,#family-shrine a[href^="/articles.html"]').forEach(a=>{a.href='#living-zschen';});
if(inline.length){
 stage=make('section','room-inline-stage');stage.id='room-inline-stage';stage.setAttribute('aria-label','在這個房間玩遊戲');stage.append(make('h2','',inline[0].label));const controls=make('div','room-inline-controls'),caption=make('label','','選擇內容 ');select=make('select');select.setAttribute('aria-label','選擇本頁遊戲或影片');inline.forEach((item,i)=>{const option=make('option','',item.label);option.value=String(i);select.append(option);});caption.append(select);select.onchange=()=>loadFrame(inline[+select.value]);launchButton=make('button','','開始載入');launchButton.type='button';launchButton.onclick=()=>loadFrame(current||inline[+select.value]);const stop=make('button','','結束遊戲');stop.type='button';stop.onclick=()=>{closeGame();feedback.textContent='已結束，隨時可以再開始。';launchButton.textContent='開始載入';};controls.append(caption,launchButton,stop);feedback=make('p','room-inline-status');feedback.setAttribute('role','status');const surface=make('div','room-game-surface');stage.append(controls,feedback,surface);
 if(room==='living')document.querySelector('#living-playground')?.after(stage);else if(room==='dining')document.querySelector('#dining-games')?.after(stage);else targetHost.append(stage);
 if(!stage.isConnected)targetHost.append(stage);
 // Do not load every game at once; the first one appears when its section reaches the viewport.
 if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!current){observer?.disconnect();loadFrame(inline[0]);}},{rootMargin:'120px'});observer.observe(stage);}else loadFrame(inline[0]);
}
function activate(item){
 if(item.inline)return open(item.url,item.label);
 if(item.journal!==undefined)window.cdjSelectJournal?.(item.journal,false);
 if(item.filter){const [kind,value]=item.filter.split(':');document.querySelector('[data-media-'+(kind==='platform'?'platform':'topic')+'-filter="'+value+'"]')?.click();}
 if(item.tab)document.getElementById(item.tab)?.click();
 if(item.url.startsWith('#')){const e=document.getElementById(item.url.slice(1));if(e?.tagName==='DETAILS')e.open=true;scrollTo(e);return true;}return false;
}
Object.entries(groups).forEach(([key,items])=>{if(!items.length)return;const group=make('span','room-link-group');group.append(make('strong','',{video:'影片',article:'文章',game:'小遊戲',other:'其他'}[key]+'：'));items.forEach(item=>{const a=make('a','',item.label);a.href=item.inline?'#room-inline-stage':item.url;a.onclick=e=>{if(activate(item)){e.preventDefault();bar.querySelectorAll('[aria-current]').forEach(x=>x.removeAttribute('aria-current'));a.setAttribute('aria-current','true');}};group.append(a);});bar.append(group);});hero.after(bar);
// Existing cards and painted-object links use the same in-page game stage.
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.closest('.room-link-bar')||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const href=a.getAttribute('href');if(href&&inline.some(x=>canonical(x.url)===canonical(href))){e.preventDefault();e.stopImmediatePropagation();open(href);}else if(href?.startsWith('/ama-games.html')&&room==='living'){e.preventDefault();e.stopImmediatePropagation();open(href);}},true);
if(room==='games')document.addEventListener('click',e=>{const a=e.target.closest('a[href]'),href=a?.getAttribute('href'),url={'#games-dodo':'/play/?area=dodo','#games-dragon':'/play/?area=dragon','#games-dad':topic('dad','baseball')}[href];if(url){e.preventDefault();e.stopImmediatePropagation();open(url);}},true);
window.addEventListener('pagehide',closeGame);
window.addEventListener('resize',()=>{if(frame?.contentDocument)frame.contentDocument.documentElement.style.setProperty('--room-canvas-height',Math.max(180,Math.min(380,innerHeight*.46))+'px');});
})();
