(()=>{'use strict';if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='dining')return;
const stage=document.querySelector('.cdj-greeting[data-room=dining]');if(!stage)return;
const style=document.createElement('link');style.rel='stylesheet';style.href='/css/dining-family.css?v=20261108-dining11';document.head.append(style);
stage.querySelector('.greeting-table')?.remove();stage.querySelector('.room-item-hotspots')?.remove();
const base='/assets/greetings/v1/';const entries=[
 ['yahoo-water','雅虎喝水','幫雅虎的水碗添新鮮的水。','/play/?area=dragon&game=chores'],
 ['youyou-food','右右吃飯','挑一份食物，餵飽愛吃的右右。','/play/?area=dragon&game=feed'],
 ['dodo-fruit','今天吃什麼水果？','看水果猜英文，也可以切換排字遊戲。','/dining-fruit.html'],
 ['dragon-snack','弟弟找零食','看準方向與時機，跳上階梯找零食。','/dining-stairs.html']
];
const host=document.createElement('section');host.id='dining-games';host.className='dining-game-section';host.innerHTML='<h2>餐廳的小遊戲</h2><p>點餐廳裡的家人、貓咪，或從這裡挑一個開始玩。</p><div class="house-cards"></div>';
entries.forEach(([id,title,desc,href])=>{const a=document.createElement('a');a.className='house-card';a.href=href;const pic=document.createElement('span');pic.className='dining-card-picture';pic.style.backgroundImage='url('+base+'dining-'+id+'.webp)';pic.setAttribute('aria-hidden','true');const copy=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p'),go=document.createElement('span');h.textContent=title;p.textContent=desc;go.textContent='開始玩 →';copy.append(h,p,go);a.append(pic,copy);host.querySelector('.house-cards').append(a);});document.querySelector('#house-content').prepend(host);
const people=[...stage.querySelectorAll('.greeting-character:not(.greeting-cat)')];
const yogurtArticle='/articles/vocus-20260715-011768d0.html';
[[0,'dad-blueberry'],[1,'mom-serving'],[2,'ama-yogurt']].forEach(([i,id])=>{people[i].classList.add('dining-task-character');people[i].querySelector('.greeting-sprite').style.backgroundImage='url('+base+'dining-'+id+'.webp)';});
people[0].dataset.greeting='歡迎來吃飯，藍莓冰冰的，好好吃！';people[2].setAttribute('aria-label','兔阿嬤的優格：看雞爸爸一家的菜單');people[2].onclick=()=>openYogurt();
[[3,2],[4,3]].forEach(([i,n])=>{const person=people[i],entry=entries[n];person.classList.add('dining-task-character');person.querySelector('.greeting-sprite').style.backgroundImage='url('+base+'dining-'+entry[0]+'.webp)';person.setAttribute('aria-label',(n===2?'荳荳挑水果：':'龍弟弟找零食：')+entry[1]);person.onclick=()=>{if(!window.CDJRoom?.open(entry[3]))location.href=entry[3];};});
const pets=entries.slice(0,2).map(([id,title,,href],i)=>{const b=document.createElement('button');b.type='button';b.className='dining-pet';b.style.backgroundImage='url('+base+'dining-'+id+'.webp)';b.style.setProperty('--pet-delay',(-i*5)+'s');b.setAttribute('aria-label',title+'：開始遊戲');b.onclick=()=>{if(!window.CDJRoom?.open(href))location.href=href;};stage.append(b);return b;});
const quick=document.createElement('nav');quick.className='dining-quick-links';quick.setAttribute('aria-label','餐廳遊戲入口');entries.forEach(([,title,,href])=>{const a=document.createElement('a');a.href=href;a.textContent=title+'（小遊戲）';quick.append(a);});const etiquette=document.createElement('a');etiquette.href='#room-activity-dining';etiquette.textContent='餐桌禮儀（小遊戲）';quick.append(etiquette);stage.append(quick);stage.querySelector('.greeting-caption').textContent='';
// Align actors and bowls to the same background crop on desktop and phones.
const anchors=[[470,250,160],[285,475,260],[625,250,140],[485,445,190],[655,565,160]],catAnchors=[[190,560,180],[420,575,190]],scene=stage.querySelector('.greeting-scene');
function align(){const r=scene.getBoundingClientRect(),p=stage.getBoundingClientRect(),z=Math.max(r.width/960,r.height/640),pos=getComputedStyle(scene).backgroundPosition.split(' '),px=parseFloat(pos[0])/100,py=parseFloat(pos[1]||pos[0])/100,dx=r.left-p.left+(r.width-960*z)*px,dy=r.top-p.top+(r.height-640*z)*py;
anchors.forEach(([x,y,size],i)=>{const person=people[i];if(!person)return;person.style.setProperty('left',dx+x*z+'px','important');person.style.setProperty('bottom',p.height-dy-y*z+'px','important');person.style.setProperty('--frame',size*z+'px','important');});catAnchors.forEach(([x,y,size],i)=>{pets[i].style.left=dx+x*z+'px';pets[i].style.top=dy+y*z+'px';pets[i].style.width=size*z+'px';pets[i].style.height=size*z+'px';});}
new ResizeObserver(align).observe(scene);style.onload=align;align();
// Family recommendations: every dish has its own picture and a complete recipe.
const dishes=[
 ['義大利麵','雞爸爸推薦','2 人份',['義大利麵 200 公克','豬絞肉 100 公克','番茄 2 顆、洋蔥 1/4 顆','蒜頭 2 瓣、油 1 大匙','水 100 毫升、鹽適量'],['番茄切丁、洋蔥和蒜頭切末。','煮一鍋水，放義大利麵，依包裝時間煮熟，保留半杯煮麵水。','鍋中熱油，炒香洋蔥和蒜末，加入絞肉炒至完全熟透。','加入番茄和水，小火煮約 10 分鐘成醬汁，再加入麵拌勻。','用少量煮麵水調整濃稠度，最後依喜好調味。']],
 ['白飯','雞爸爸推薦','約 2 碗',['白米 1 杯','水約 1～1.2 杯（依米種與電鍋調整）'],['白米輕輕淘洗 2～3 次，瀝乾。','加水後浸泡約 20 分鐘。','電子鍋按一般煮飯模式；使用電鍋時，外鍋依機型說明加水。','煮好再燜約 10 分鐘，用飯匙輕輕翻鬆。']],
 ['番茄蛋花湯','鼠姊姊推薦','2～3 人份',['番茄 2 顆、雞蛋 2 顆','水或高湯 600 毫升','油 1 小匙、蔥花與鹽適量'],['番茄洗淨切小塊，雞蛋打散。','鍋內放油，將番茄稍微炒軟。','加入水，煮滾後轉小火約 5 分鐘。','沿鍋邊慢慢倒入蛋液，等蛋花凝固再輕輕拌開。','煮至蛋完全凝固，調味後撒上蔥花。']],
 ['蛤蠣湯','鼠姊姊推薦','2～3 人份',['蛤蠣 400 公克','水 600 毫升','薑絲少許、蔥花適量'],['依購買時的處理說明讓蛤蠣吐沙，再刷洗外殼、沖洗乾淨。','水煮滾後加入薑絲。','加入蛤蠣，煮到開殼、肉熟透，撈除浮沫。','先嚐湯味，再視需要調味；撒蔥花即可。沒有開殼或有異味的蛤蠣不食用。']],
 ['滷肉','鼠姊姊推薦','約 4 人份',['豬五花肉或絞肉 400 公克','紅蔥頭 3 顆、蒜頭 3 瓣','醬油 3 大匙、冰糖 1 小匙','水約 500 毫升、白胡椒少許'],['五花肉切小條，紅蔥頭與蒜切末。','將肉放入鍋中煸炒，再加入紅蔥頭和蒜末炒香。','加入醬油、冰糖與白胡椒，拌炒上色。','加入水煮滾，轉小火加蓋燉約 40～60 分鐘，到肉熟透且軟嫩。','中途查看水量，太少時補熱水；最後試味，搭配白飯。']],
 ['肉片包番茄','鼠姊姊推薦','2 人份',['薄豬肉片 200 公克','番茄 1～2 顆','薑片少許','醬油或喜歡的沾醬少量'],['番茄洗淨，切成適口的小長塊。','煮一鍋水，放薑片，再將豬肉片分次燙到完全熟透。','把熟肉片攤開，稍微放涼後包住番茄塊。','收口朝下排盤，不需要牙籤固定。','沾少量醬汁，趁新鮮食用。']],
 ['寶寶粥','龍弟弟推薦','約 2 小碗',['白米 1/4 杯、水 500～600 毫升','豬絞肉 40 公克','紅蘿蔔、青菜各少量'],['白米洗淨浸泡；紅蘿蔔和青菜切成細碎小丁。','白米加水煮滾，轉小火熬約 25～35 分鐘，期間攪拌防沾底。','加入紅蘿蔔，再加入絞肉拌散，繼續煮至肉完全熟透。','加入青菜，煮到蔬菜軟熟、米粒綿軟。','依平常喜歡的口感調整水量，稍微放涼再享用。']]
];
const menu=document.createElement('details');menu.id='dining-mom-menu';menu.className='dining-mom-menu';const menuTitle=document.createElement('summary');menuTitle.textContent='雞爸爸一家的菜單';menu.open=true;const grid=document.createElement('div');grid.className='dining-dish-grid';menu.append(menuTitle,grid);
dishes.forEach(([name,who,servings,ingredients,steps],i)=>{const recipe=document.createElement('details');recipe.className='dining-recipe';const summary=document.createElement('summary'),art=document.createElement('span'),title=document.createElement('strong'),by=document.createElement('small');art.className='dining-dish-art';art.setAttribute('aria-hidden','true');art.style.backgroundPosition=(i%4*100/3)+'% '+(i<4?0:100)+'%';title.textContent=name;by.textContent=who;summary.append(art,title,by);const body=document.createElement('div');body.className='dining-recipe-body';const portion=document.createElement('p');portion.textContent=servings;const h1=document.createElement('h4'),h2=document.createElement('h4');h1.textContent='準備食材';h2.textContent='作法';const list=document.createElement('ul'),order=document.createElement('ol');ingredients.forEach(t=>{const li=document.createElement('li');li.textContent=t;list.append(li);});steps.forEach(t=>{const li=document.createElement('li');li.textContent=t;order.append(li);});body.append(portion,h1,list,h2,order);recipe.append(summary,body);grid.append(recipe);});host.before(menu);
function openMenu(){menu.open=true;menuTitle.focus({preventScroll:true});menu.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
people[1].setAttribute('aria-label','鼠媽媽端菜：看雞爸爸一家的菜單');people[1].onclick=openMenu;
const mealLink=document.createElement('a');mealLink.href='#dining-mom-menu';mealLink.textContent='雞爸爸一家的菜單';mealLink.onclick=e=>{e.preventDefault();openMenu();};quick.prepend(mealLink);const yogurtLink=document.createElement('a');yogurtLink.href=yogurtArticle;yogurtLink.textContent='阿格優格（文章）';
people[0].setAttribute('aria-label','雞爸爸用餐：玩餐桌禮儀小遊戲');people[0].onclick=()=>{const game=document.getElementById('room-activity-dining');game.tabIndex=-1;game.focus({preventScroll:true});game.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});};

const yogurt=document.createElement('details');yogurt.id='dining-ama-yogurt';yogurt.className='dining-recipe';
const ys=document.createElement('summary'),yp=document.createElement('span'),yt=document.createElement('strong'),yb=document.createElement('small');
yp.className='dining-card-picture';yp.style.backgroundImage='url('+base+'dining-ama-yogurt.webp)';yp.setAttribute('aria-hidden','true');yt.textContent='兔阿嬤的優格';yb.textContent='兔阿嬤與龍弟弟推薦';ys.append(yp,yt,yb);
const intro=document.createElement('div');intro.className='dining-recipe-body';const desc=document.createElement('p');desc.textContent='「阿格！阿格！」這是龍弟弟和兔阿嬤一起分享的優格小時光。來看看他們的優格故事。';
const story=document.createElement('a');story.href=yogurtArticle;story.textContent='讀故事：阿格！阿格！兔阿嬤不會拉肚子的優格 →';intro.append(desc,story);yogurt.append(ys,intro);grid.append(yogurt);
function openYogurt(){menu.open=true;yogurt.open=true;yogurt.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});ys.focus({preventScroll:true});}

if(location.hash==='#dining-ama-yogurt')openYogurt();
})();
