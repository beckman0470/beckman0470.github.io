/* Chicken Dad Journal unified game presentation, 2026-11-20.
   Presentation only. No DOM relocation, game start/restart interception, or frame manipulation.
*/
(()=>{'use strict';
if(typeof document==='undefined')return;
const path=location.pathname;
const portal=/^\/(?:rooms\.html|play\/?(?:index\.html)?|play\/play\/?(?:index\.html)?|relax-family\.html|relax\.html|play\/family-lab\.html)$/.test(path);
const standalone=/(?:^\/play\/(?:bath-family|dish-family|fast-food|salon|yahoo-water|yakiniku)\/(?:index\.html)?$)|(?:^\/(?:ama-games|ama-solitaire|ama-sudoku|mom-breakout|mom-words|dad-arcade|dining-fruit|dining-stairs|relax-classics|ama-exercise|seven-kingdoms|babymonster-classroom|babymonster-ep01)\.html$)/.test(path);
if(!portal&&!standalone)return;
const embedded=new URLSearchParams(location.search).has('roomembed');
const nameFromPath={
 '/play/bath-family/':'鼠媽媽幫龍弟弟洗澡','/play/dish-family/':'洗碗泡泡小幫手','/play/fast-food/':'小森速食店','/play/salon/':'鼠姊姊的魔法美髮屋',
 '/play/yahoo-water/':'雅虎喝水','/play/yakiniku/':'雞爸爸家的滋滋燒肉','/ama-games.html':'兔阿嬤拼圖與隨喜紅包','/ama-solitaire.html':'撲克牌接龍',
 '/ama-sudoku.html':'數獨時光','/mom-breakout.html':'鼠媽媽彈珠打磚塊','/mom-words.html':'英文排字與猜字','/dad-arcade.html':'雞爸爸的街機時光',
 '/dining-fruit.html':'今天吃什麼水果','/dining-stairs.html':'弟弟找零食','/relax-classics.html':'俄羅斯方塊與四川省麻將',
 '/ama-exercise.html':'兔阿嬤坐姿健康操','/seven-kingdoms.html':'七格三國志','/babymonster-classroom.html':'BABYMONSTER 小教室','/babymonster-ep01.html':'BABYMONSTER 互動小教室'};
function gameName(){let key=path.replace(/index\.html$/,'');if(!key.endsWith('/')&&path.startsWith('/play/'))key+='/';return nameFromPath[key]||(document.title||'').split(/[｜|]/)[0].trim()||'互動遊戲';}
function category(){return (/mom-words|dining-fruit|sudoku|solitaire|ama-games|babymonster|ama-exercise/.test(path))?'學習・益智':(/yakiniku|fast-food|salon|bath-family|dish-family|yahoo-water|dining-stairs/.test(path))?'生活・模擬':'街機・挑戰';}
function roomLink(){if(/bath-family/.test(path))return '/rooms.html?room=bathroom';if(/dish-family|fast-food|yakiniku/.test(path))return '/rooms.html?room=kitchen';if(/yahoo-water|dining-fruit|dining-stairs/.test(path))return '/rooms.html?room=dining';if(/mom-words|mom-breakout|babymonster/.test(path))return '/rooms.html?room=mom';if(/ama-games|ama-solitaire|ama-sudoku|ama-exercise/.test(path))return '/rooms.html?room=ama';return '/rooms.html?room=games';}
function install(){if(!document.body||document.getElementById('cdjg-masthead'))return;
 document.body.classList.add(portal?'cdjg-portal':'cdjg-enabled');
 if(portal||embedded)return;
 const h=document.createElement('section');h.id='cdjg-masthead';h.className='cdjg-masthead';h.setAttribute('aria-label','遊戲資訊');
 const card=document.createElement('div');card.className='cdjg-masthead-inner';
 const copy=document.createElement('div');copy.className='cdjg-masthead-text';
 const kind=document.createElement('p');kind.className='cdjg-eyebrow';kind.textContent='雞爸爸生活研究室 · '+category();
 const title=document.createElement('h2');title.textContent=gameName();
 const existingHeading=document.querySelector('main h1,header h1');
 if(existingHeading){title.className='cdjg-heading-preserved';title.textContent='互動遊戲';}
 const tip=document.createElement('p');tip.className='cdjg-tip';tip.textContent='保留原本玩法，統一遊戲版面與操作識別';
 copy.append(kind,title,tip);card.append(copy);
 if(!embedded){const back=document.createElement('a');back.className='cdjg-return';back.href=roomLink();back.textContent='返回房間';card.append(back);}
 h.append(card);
 const header=document.querySelector('body > header');
 const main=document.querySelector('body > main');
 if(header)header.after(h);else if(main)main.before(h);else document.body.prepend(h);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
