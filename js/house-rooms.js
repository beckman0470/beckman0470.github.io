(()=>{'use strict';
const D=window.CDJHouseData,A=D.actors;
const $=s=>document.querySelector(s);
function actor(key,msg){return '<button type="button" class="greeting-character" aria-label="和'+A[key]+'打招呼" data-greeting="'+msg+'"><span class="greeting-sprite" aria-hidden="true" style="background-image:url(/assets/greetings/v1/'+key+'.webp)"></span></button>';}
function stage(key,room,people,msg){let content='<div class="greeting-scene" aria-hidden="true"'+(room?' style="background-image:url(/assets/greetings/v1/room-'+room+'.webp)"':'')+'></div>';
if(key==='study')content+='<nav class="room-categories" aria-label="書架文章分類">'+D.filters.map(([k,n])=>'<a href="/articles.html?room='+k+'#cards-grid" data-journal-filter="'+k+'">'+n+'</a>').join('')+'</nav>';
content+=people.map(k=>actor(k,msg)).join('');
if(key==='study')content+=['yahoo','youyou'].map((k,i)=>'<button type="button" class="greeting-character greeting-cat" aria-label="和'+(i?'右右':'雅虎')+'打招呼" data-greeting="喵～歡迎來看故事！"><img src="/cat-'+k+'-'+(i?'sleep':'peek')+'.png" alt="" width="90" height="90"></button>').join('');
if(key==='dining')content+='<div class="greeting-table" aria-hidden="true"><span>●</span><i></i><span>●</span></div>';
return '<div class="cdj-greeting'+(people.length>1?' cdj-greeting-group':'')+(key==='home'?' cdj-greeting-home':'')+'"'+(room?' data-room="'+room+'"':'')+' aria-label="家人迎賓互動區">'+content+'<p class="greeting-caption" aria-live="polite">'+(key==='study'?'點書架挑文章，也可以和家人打招呼':'點一下角色，打個招呼')+'</p><button type="button" class="greeting-pause" aria-pressed="false">暫停動作</button></div>';
}
function bind(){const reduce=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.cdj-greeting').forEach(el=>{const p=el.querySelector('.greeting-pause');
function pause(v){el.classList.toggle('is-paused',v);p.textContent=v?'播放動作':'暫停動作';p.setAttribute('aria-pressed',String(v));}pause(reduce.matches);p.onclick=()=>pause(!el.classList.contains('is-paused'));
el.querySelectorAll('.greeting-character').forEach(a=>{a.onclick=()=>{el.querySelector('.greeting-caption').textContent=a.dataset.greeting;if(el.classList.contains('is-paused')||reduce.matches)return;a.classList.remove('is-waving');void a.offsetWidth;a.classList.add('is-waving');};a.addEventListener('animationend',()=>a.classList.remove('is-waving'));});
if('IntersectionObserver'in window)new IntersectionObserver(es=>es.forEach(e=>el.classList.toggle('is-offscreen',!e.isIntersecting))).observe(el);
});}
const path=location.pathname;
if(path==='/rooms.html'){
const key=new URLSearchParams(location.search).get('room')||'games',r=D.rooms[key]||D.rooms.games;
document.title=r.label+'｜雞爸爸生活研究室';$('.cdj-welcome-label').textContent=r.label;$('#cdj-welcome-title').innerHTML=r.title;$('.cdj-welcome-summary').textContent=r.summary;$('#room-stage').outerHTML=stage(key,r.bg,r.people,r.greeting);
const host=$('#house-content');host.replaceChildren();
function heading(t){const h=document.createElement('h2');h.textContent=t;host.append(h);}
function grid(){const g=document.createElement('div');g.className='house-cards';host.append(g);return g;}
function card(g,title,desc,href,image){const a=document.createElement('a');a.href=href;a.className='house-card';if(image){const i=document.createElement('img');i.src=image;i.alt='';i.loading='lazy';i.width=600;i.height=400;a.append(i);}const div=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p'),go=document.createElement('span');h.textContent=title;p.textContent=desc;go.textContent='進去看看 →';div.append(h,p,go);a.append(div);g.append(a);}
if(key==='mom'||key==='ama'){
if(key==='ama'){
const media=document.createElement('section');media.id='ama-room-media';media.className='ama-room-media';
media.innerHTML='<h2>兔阿嬤的數位養生佛堂</h2><p>佛經、超慢跑與健康影片，選一支慢慢看。</p><div class="media-filters" role="group" aria-label="兔阿嬤影片分類">'+[['all','全部影片'],['sutra','佛經講解'],['slow','超慢跑'],['health','健康養生']].map(([k,t])=>'<button type="button" data-media-topic-filter="'+k+'" aria-pressed="'+(k==='all')+'">'+t+'</button>').join('')+'</div><p data-media-result role="status"></p><div class="media-grid" data-media-grid>'+D.amaMedia.join('')+'</div><p data-media-empty hidden>這個分類目前沒有影片。</p><a class="house-all" href="/ama-exercise.html">跟兔阿嬤做健康操 →</a>';
host.append(media);
['/css/media-gallery.css','/css/media-compact.css'].forEach(href=>{const link=document.createElement('link');link.rel='stylesheet';link.href=href;document.head.append(link);});
const player=document.createElement('script');player.src='/js/media-gallery.js?v=20261108-room3';document.body.append(player);
}
heading(key==='mom'?'鼠媽媽的小天地':'兔阿嬤的小遊戲');const g=grid();D.games[key].filter(([id])=>key!=='ama'||!['ama-video','ama-exercise'].includes(id)).forEach(([id,t,d,url])=>{const covers={'solitaire':'ama-solitaire-v4','sudoku':'ama-sudoku-v4','blocks':'ama-blocks-v4'};card(g,t,d,url==='topic'?'/relax-family.html?host='+key+'&game='+id:url,'/assets/adult-games/'+(covers[id]||id)+'.webp');});
if(key==='mom'){heading('要聽故事睡覺了嗎？');const g=grid();card(g,'一起讀故事','挑一篇雞爸爸家的故事，陪孩子慢慢讀。','/articles.html?room=family');card(g,'睡前生活小任務','洗澡、刷牙、洗臉與點眼藥水的小步驟。','/play/?zone=life&flow=bedtime');card(g,'一家人的客廳','一起看家人的日常與喜歡的影片。','/videos.html');}
}else if(key==='games'){heading('今天想跟誰玩？');const g=grid();[
['鼠姊姊學習與生活','ㄅㄆㄇ、ABC、數學、日常習慣與鼠姊姊的影片。','/play/?area=dodo','/assets/play-covers/v1/area-dodo.webp'],
['龍弟弟快樂天地','找貓咪、唱唱跳跳，還有弟弟喜歡的影片。','/play/?area=dragon','/assets/play-covers/v1/area-dragon.webp'],
['雞爸爸遊戲場','三國、棒球、投籃、節奏與街機。','/relax-family.html?host=dad','/assets/adult-hosts/dad.webp'],
['鼠窩','英文、咖啡、麻將與打磚塊。','/rooms.html?room=mom','/assets/adult-hosts/mom.webp'],
['兔窩','接龍、數獨、方塊，輕鬆玩一會。','/rooms.html?room=ama','/assets/adult-hosts/ama.webp'],
['一家大富翁','選喜歡的角色，和家人走一圈。','/dad-arcade.html?game=board','/assets/adult-games/board.webp']].forEach(x=>card(g,...x));
}else{if(key==='bathroom'){heading('把日常練習變成小習慣');const g=grid();card(g,'鼠姊姊的生活專區','起床、回家和睡前的日常小步驟。','/play/?zone=life','/assets/play-covers/v1/dishwash.webp');}
const a=document.createElement('a');a.className='house-all';a.href='/articles.html'+(key==='bathroom'?'?room=cdhj':'?room=family');a.textContent='到雞窩挑一篇'+(key==='bathroom'?'健康文章':'生活故事')+' →';host.append(a);}
}else if(path==='/'||path==='/index.html'){$('.life-hero-copy')?.insertAdjacentHTML('beforeend',stage('home',null,['mom-home'],'歡迎回家，今天過得好嗎？'));}
else{
const key=path==='/articles.html'?'study':path==='/videos.html'?'living':path.startsWith('/play/')?'play':path==='/relax.html'?'relax':path==='/stickers.html'?'stickers':path==='/family.html'?'family':null;
const cfg={study:['study',['dad-reader','devil','zschen'],'歡迎來雞窩！'],living:['living',D.family,'歡迎來我們這一家！'],play:[null,['dodo-abc'],'一起玩，一起發現新東西！'],relax:[null,['ama-tea'],'坐一下，陪阿嬤喝杯茶。'],stickers:[null,['mom-chat'],'讓家人的小表情，陪你聊天。'],family:[null,['dad-greeter'],'歡迎來我們家！']}[key];
if(cfg){$('.cdj-welcome-picture')?.insertAdjacentHTML('afterend',stage(key,...cfg));$('.cdj-welcome-picture')?.remove();if(key==='study'){$('.journal-categories')?.remove();$('.cdj-welcome-label').textContent='雞窩';$('#cdj-welcome-title').innerHTML='歡迎來書房，<br>坐下來讀一段。';$('.cdj-welcome-summary').textContent='雞爸爸的文章都在這裡，小惡魔、珍山陳阿祖和兩隻貓陪你挑故事。';window.cdjSelectJournal?.(new URLSearchParams(location.search).get('room')||'all',false);}if(key==='living'){$('.cdj-welcome-label').textContent='客廳';$('#cdj-welcome-title').innerHTML='歡迎來，<br>我們這一家。';$('.cdj-welcome-summary').textContent='雞爸爸拍的一家日常、雅虎右右與創作短片，點封面就能看。';}}
}
document.querySelectorAll('.cdj-welcome .cdj-greeting[data-room]').forEach(el=>el.closest('.cdj-welcome').classList.add('cdj-room-entrance'));
function viewportSize(){document.documentElement.style.setProperty('--cdj-scrollbar',(innerWidth-document.documentElement.clientWidth)+'px');}viewportSize();window.addEventListener('resize',viewportSize);
document.addEventListener('click',e=>{const a=e.target.closest('[data-journal-filter]');if(a&&window.cdjSelectJournal){e.preventDefault();window.cdjSelectJournal(a.dataset.journalFilter);}});
bind();
})();
