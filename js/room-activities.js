/* Small room activities, usable with mouse, touch and keyboard. No account needed. */
(()=>{'use strict';
const key=location.pathname==='/videos.html'?'living':location.pathname==='/rooms.html'?new URLSearchParams(location.search).get('room'):location.pathname==='/articles.html'?'study':null;
const main=document.querySelector('main');if(!key||!main)return;
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function block(title,copy){const s=document.createElement('section');s.id='room-activity-'+key;s.className='room-activity';s.innerHTML='<h2>'+title+'</h2><p>'+copy+'</p>';const host=document.querySelector('#house-content');if(host)host.prepend(s);else document.querySelector('.cdj-welcome').after(s);return s;}
function choicesGame(title,copy,rounds){const s=block(title,copy),play=document.createElement('div');s.append(play);let turn=0,score=0,locked=false;
function paint(){locked=false;if(turn===rounds.length){play.innerHTML='<div class="room-game-result"><strong>完成啦！</strong><p>這次答對 '+score+' / '+rounds.length+' 題，謝謝你一起練習。</p><button type="button" data-replay>再玩一次</button></div>';play.querySelector('[data-replay]').onclick=()=>{turn=0;score=0;paint();};return;}
const r=rounds[turn];play.innerHTML='<p class="room-game-progress">第 '+(turn+1)+' / '+rounds.length+' 個小任務</p><h3>'+r[0]+'</h3><div class="room-game-options">'+r[1].map((t,i)=>'<button type="button" data-choice="'+i+'">'+esc(t)+'</button>').join('')+'</div><p class="room-game-feedback" role="status" aria-live="polite"></p><button type="button" class="room-next" hidden>下一題 →</button>';
play.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{if(locked)return;locked=true;const right=+b.dataset.choice===r[2];if(right)score++;b.classList.add(right?'answer-right':'answer-retry');play.querySelectorAll('[data-choice]').forEach(x=>{x.disabled=true;if(+x.dataset.choice===r[2])x.classList.add('answer-right');});play.querySelector('[role=status]').textContent=(right?'答對了！':'一起記住：')+r[3];const next=play.querySelector('.room-next');next.hidden=false;next.textContent=turn===rounds.length-1?'看完成結果 →':'下一題 →';next.onclick=()=>{turn++;paint();};});}
paint();}
if(key==='study'){
 const reset=document.createElement('a');reset.className='study-show-all';reset.href='/articles.html#cards-grid';reset.dataset.journalFilter='all';reset.textContent='看全部文章 →';document.querySelector('.cdj-welcome').after(reset);
 const caption=document.querySelector('.greeting-caption');if(caption)caption.textContent='點相片、小惡魔或健康小物，挑一類文章。';
}
if(key==='living'){
 const s=block('客廳的小角落','點神桌認識家人的信仰與故事。'),stage=document.querySelector('.cdj-greeting[data-room=living]');if(!stage)return;
 const shrine=document.createElement('section');shrine.id='family-shrine';shrine.className='shrine-menu';shrine.innerHTML='<h3>神桌小角落</h3><div><a href="/articles.html?room=zschen#cards-grid">珍山陳祖先・列祖列宗｜讀經典語錄</a>'+['清水祖師','觀世音菩薩','關聖帝君'].map((n,i)=>'<a href="/ama-games.html?game=puzzle&person='+['qingshui','guanyin','guansheng'][i]+'">'+n+'｜玩兔阿嬤神明拼圖</a>').join('')+'</div>';s.append(shrine);
}
if(key==='bathroom')choicesGame('浴室生活小遊戲','陪鼠姊姊和龍弟弟練習，安全又乾淨。',[
 ['要上廁所了，先做什麼？',['拉好衣物，坐穩馬桶','站在馬桶蓋上','在浴室跑來跑去'],0,'拉好衣物並坐穩，需要時請大人幫忙。'],
 ['上完廁所，要記得？',['馬上跑出去','擦拭、整理衣物，再沖水','把玩具丟進馬桶'],1,'做好清潔、整理衣物，再沖水。'],
 ['洗手時，哪個方法好？',['只有摸一下水','用肥皂搓洗手心、手背和指縫，再沖乾淨擦乾','只擦在衣服上'],1,'用肥皂洗乾淨，再把手擦乾。'],
 ['地板濕濕的，怎麼走？',['慢慢走，請大人幫忙擦乾','比賽誰跑得快','跳過去'],0,'慢慢走、不奔跑，請大人一起保持地面乾燥。'],
 ['刷完牙、洗完臉後呢？',['收好用品，把洗手台整理乾淨','讓水一直流','把毛巾丟地上'],0,'關好水、收好用品，也把自己的毛巾掛好。']
]);
if(key==='dining')choicesGame('一起練習餐桌禮儀','不比速度，選一個體貼的做法，一起好好吃飯。',[
 ['準備吃飯了，先做什麼？',['洗手、坐好，等大家準備好','拿筷子敲碗','邊跑邊吃'],0,'洗手後坐好，一起準備開動。'],
 ['想夾離自己很遠的菜？',['整個人趴到桌上','請家人幫忙傳過來','用手直接抓'],1,'說聲「可以請你幫我嗎？」就很好。'],
 ['嘴裡還有食物，想說話？',['先嚼完吞下，再說話','含著食物大叫','邊吃邊跑去找人'],0,'慢慢吃、吞下後再說話，彼此都舒服。'],
 ['今天的菜不是最喜歡的？',['說好難吃，推到別人那裡','說謝謝，表達自己的感受，和大人商量份量','把菜丟地上'],1,'可以表達喜好，也尊重準備飯菜的人。'],
 ['不小心打翻水，怎麼辦？',['假裝沒看到','責怪旁邊的人','告訴家人，一起擦乾'],2,'先說一聲，再請大人幫忙整理，避免滑倒。'],
 ['吃飽要離開餐桌？',['說吃飽了、謝謝，依能力收好自己的餐具','直接跑走','把碗藏起來'],0,'謝謝家人的準備，也一起把桌面整理好。']
]);
if(key==='kitchen'){
 const s=block('鼠媽媽拿手料理','雞爸爸一家點菜囉！今天想吃哪一道？');const menu=[['雞爸爸推薦','鰻魚飯','🍱'],['鼠媽媽自推','手沖咖啡','☕'],['鼠媽媽自推','辛拉麵','🍜'],['鼠姊姊推薦','番茄蛋花湯','🍅'],['鼠姊姊推薦','蛤蜊湯','🥣'],['鼠姊姊推薦','滷肉','🍲']];
 const g=document.createElement('div');g.className='kitchen-menu';g.innerHTML=menu.map(([who,dish,icon])=>'<button type="button" aria-pressed="false" class="kitchen-dish"><span class="dish-icon" aria-hidden="true">'+icon+'</span><small>'+who+'</small><strong>'+dish+'</strong><span>今天想吃這道</span></button>').join('');const status=document.createElement('p');status.setAttribute('role','status');status.textContent='點一道菜，跟鼠媽媽說今天想吃什麼。';s.append(g,status);g.querySelectorAll('button').forEach(b=>b.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));status.textContent='收到！今天想吃「'+b.querySelector('strong').textContent+'」。';});
 const coffee=document.createElement('div');coffee.id='kitchen-coffee';coffee.className='kitchen-coffee';coffee.innerHTML='<h3>鼠媽媽的手沖咖啡角</h3><p>轉動磨豆機、控制注水，端出一杯剛剛好的咖啡。這是遊戲，小朋友要請大人處理熱水。</p><div class="coffee-play"></div>';s.append(coffee);
 const cp=coffee.querySelector('.coffee-play');let ground=0,water=0;
 function grind(){cp.innerHTML='<div class="coffee-scene" aria-hidden="true">🫘 → ⚙️ → ☕</div><p role="status">磨豆進度 '+ground+' / 6</p><progress max="6" value="'+ground+'" aria-label="磨豆進度"></progress><div><button type="button" data-grind>轉一下磨豆機</button></div>';cp.querySelector('[data-grind]').onclick=()=>{ground++;if(ground===6)pour();else grind();};}
 function pour(){cp.innerHTML='<div class="coffee-scene" aria-hidden="true">🫖 <span class="coffee-cup">☕</span></div><p role="status">已注水 '+water+' ml · 遊戲目標 160～200 ml</p><progress max="260" value="'+water+'" aria-label="注水量"></progress><div class="coffee-actions"><button type="button" data-pour>慢慢注水 ＋20 ml</button><button type="button" data-finish>完成注水</button></div><p class="coffee-feedback" role="status"></p>';cp.querySelector('[data-pour]').onclick=()=>{water+=20;if(water>260)water=260;pour();};cp.querySelector('[data-finish]').onclick=()=>{if(water<160){cp.querySelector('.coffee-feedback').textContent='水還少一點，再慢慢加一些。';return;}if(water>200){water=0;pour();cp.querySelector('.coffee-feedback').textContent='注水太多了，這次練習重新注水。';return;}serve();};}
 function serve(){cp.innerHTML='<div class="coffee-scene" aria-hidden="true">☕ ✨</div><p role="status">咖啡完成！鼠媽媽說：謝謝你，坐下來喝一杯。</p><button type="button" data-coffee-again>再沖一杯</button>';cp.querySelector('[data-coffee-again]').onclick=()=>{ground=0;water=0;grind();};}
 grind();
}
// Match links to objects already painted in each room; never add replacement props.
if(key!=='study'){
 const hint={living:'點神桌找拼圖與語錄，點電視看影片，也幫忙掃紙屑。',dining:'點餐盤，練習餐桌禮儀。',mom:'點書櫃玩小遊戲，點床鋪選睡前故事。',ama:'點佛像與經書看影片，點扶手椅玩小遊戲。',games:'點街機、積木、畫桌或桌遊櫃，挑一段遊戲時光。',kitchen:'點咖啡杯來手沖，點湯鍋來點菜。',bathroom:'點馬桶練習浴室生活，點肥皂找日常任務。'}[key];const caption=document.querySelector('.greeting-caption');if(hint&&caption)caption.textContent=hint;
 if(key==='ama'){const h=[...document.querySelectorAll('#house-content h2')].find(x=>x.textContent.includes('小遊戲'));if(h)h.id='ama-room-games';}
 if(key==='mom'){const hs=[...document.querySelectorAll('#house-content h2')];if(hs[0])hs[0].id='mom-games';if(hs[1])hs[1].id='mom-bedtime';}
 const entries={
 living:[['','看一家人的影片','media-library-title',21,44]],
 dining:[['🍽️','餐桌禮儀小遊戲','room-activity-dining',22,70]],
 mom:[], ama:[], games:[],
 kitchen:[['☕','手沖咖啡小遊戲','kitchen-coffee',82,33],['🍲','鼠媽媽拿手料理','room-activity-kitchen',22,66]],
 bathroom:[['🚽','浴室生活小遊戲','room-activity-bathroom',19,56],['🧼','日常生活小任務','house-content',82,40]]
 }[key]||[];
 const stage=document.querySelector('.cdj-greeting[data-room]');if(stage){const nav=document.createElement('nav');nav.className='room-item-hotspots';nav.setAttribute('aria-label','點房間物品前往內容');entries.forEach(([icon,label,id,x,y])=>{if(!document.getElementById(id))return;const a=document.createElement('a');a.href='#'+id;a.className='room-item'+(!icon?' object-hit':'');a.style.left=x+'%';a.style.top=y+'%';a.setAttribute('aria-label',label);a.innerHTML='<span class="room-item-art" aria-hidden="true">'+icon+'</span><span class="room-item-label">'+label+'</span>';a.onclick=()=>{const target=document.getElementById(id);target.setAttribute('tabindex','-1');requestAnimationFrame(()=>target.focus({preventScroll:true}));};nav.append(a);});
 if(key==='living'){
 [['珍山陳祖先・列祖列宗','/articles.html?room=zschen#cards-grid',35.8],['清水祖師','/ama-games.html?game=puzzle&person=qingshui',39.7],['觀世音菩薩','/ama-games.html?game=puzzle&person=guanyin',42.3],['關聖帝君','/ama-games.html?game=puzzle&person=guansheng',44.8]].forEach(([name,href,x])=>{const a=document.createElement('a');a.className='room-item altar-item'+(x===35.8?' ancestor-shrine':'');a.href=href;a.style.left=x+'%';a.style.top='37%';a.setAttribute('aria-label',name+(x===35.8?'：珍山陳經典語錄':'：兔阿嬤神明拼圖'));a.innerHTML='<span class="room-item-label">'+name+'</span>';nav.append(a);});
 const mobileShrine=document.createElement('a');mobileShrine.className='room-item shrine-mobile';mobileShrine.href='#family-shrine';mobileShrine.setAttribute('aria-label','神桌：選擇神明拼圖或祖先語錄');mobileShrine.innerHTML='<span class="room-item-label">點神桌</span>';nav.append(mobileShrine);
 }
 stage.append(nav);
 const painted={
 mom:[['書櫃：鼠媽媽的小天地','mom-games','414,47 564,44 566,280 413,280'],['床鋪：睡前故事與生活','mom-bedtime','789,135 892,136 903,273 873,298 634,282 632,237 655,201 786,191']],
 ama:[['佛像與經書：數位養生佛堂','ama-room-media','719,186 809,186 812,286 719,286'],['扶手椅：兔阿嬤的小遊戲','ama-room-games','90,230 220,233 256,344 339,347 360,375 344,509 322,528 111,523 74,469 70,350']],
 games:[['街機：雞爸爸遊戲場','games-dad','292,179 379,178 401,282 393,365 347,374 294,356 287,220'],['積木：龍弟弟快樂天地','games-dragon','29,272 151,268 155,342 27,355'],['畫桌：鼠姊姊學習與生活','games-dodo','685,302 886,303 918,327 904,348 895,429 870,429 861,352 715,351 711,411 692,411 682,343'],['桌遊櫃：全部遊戲','house-content','410,282 592,277 594,369 408,371']]
 }[key];
 if(painted){
 const cards=[...document.querySelectorAll('#house-content .house-card')];
 if(key==='games')cards.slice(0,3).forEach((card,i)=>card.id=['games-dodo','games-dragon','games-dad'][i]);
 const scene=stage.querySelector('.greeting-scene');
 const map=document.createElementNS('http://www.w3.org/2000/svg','svg');map.classList.add('room-background-map');map.setAttribute('aria-label','點房間裡的物品前往內容');
 painted.forEach(([label,id,points])=>{if(!document.getElementById(id))return;const a=document.createElementNS(map.namespaceURI,'a');a.setAttribute('href','#'+id);a.setAttribute('aria-label',label);const title=document.createElementNS(map.namespaceURI,'title');title.textContent=label;const polygon=document.createElementNS(map.namespaceURI,'polygon');polygon.setAttribute('points',points);a.append(title,polygon);a.addEventListener('click',()=>{const target=document.getElementById(id);target.setAttribute('tabindex','-1');requestAnimationFrame(()=>target.focus({preventScroll:true}));});map.append(a);});stage.append(map);
 // Use the identical cover crop as the background, including the compact mobile room.
 const align=()=>{const s=scene.getBoundingClientRect(),r=stage.getBoundingClientRect(),zoom=Math.max(s.width/960,s.height/640);if(!zoom)return;const pos=getComputedStyle(scene).backgroundPosition.split(' '),px=parseFloat(pos[0])/100,py=parseFloat(pos[1]||pos[0])/100;map.style.left=s.left-r.left+'px';map.style.top=s.top-r.top+'px';map.style.width=s.width+'px';map.style.height=s.height+'px';map.setAttribute('viewBox',[(960-s.width/zoom)*px,(640-s.height/zoom)*py,s.width/zoom,s.height/zoom].join(' '));};
 new ResizeObserver(align).observe(scene);align();
 }
 }
}
})();
