/* Shared centered header. Old article and archive layouts receive the same brand and destinations. */
(()=>{'use strict';if(typeof document==='undefined')return;const host=document.querySelector('header');if(!host)return;
const version='room6';
if(!document.querySelector('link[data-entry-nav-style="'+version+'"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='/css/site-entry-nav.css?v=20261106-order2';link.dataset.entryNavStyle=version;document.head.append(link);}
host.classList.add('cdj-unified-header');
if(host.dataset.unifiedHeader===version)return;
const inner=document.createElement('div');inner.className='cdj-unified-inner';const brand=document.createElement('a');brand.className='cdj-unified-brand';brand.href='/';brand.setAttribute('aria-label','雞爸爸生活研究室首頁');
const avatar=document.createElement('img');avatar.src='/assets/img/logo-avatar.png';avatar.alt='';avatar.width=52;avatar.height=52;const text=document.createElement('span'),name=document.createElement('strong'),english=document.createElement('small');name.textContent='雞爸爸生活研究室';english.textContent='CHICKEN DAD JOURNAL';text.append(name,english);brand.append(avatar,text);
const nav=document.createElement('nav');nav.className='entry-subnav';nav.setAttribute('aria-label','主要導覽');const path=location.pathname;
[["/","首頁"],["/videos.html","客廳"],["/articles.html","雞窩"],["/rooms.html?room=dining","餐廳"],["/rooms.html?room=mom","鼠窩"],["/rooms.html?room=ama","兔窩"],["/rooms.html?room=kitchen","廚房"],["/rooms.html?room=bathroom","浴室"],["/rooms.html?room=games","遊戲間"],["/stickers.html","貼圖小舖"],["/family.html","認識我們"]].forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.textContent=label;const active=url.startsWith('/rooms.html?')?((path==='/rooms.html'&&new URLSearchParams(location.search).get('room')===new URL(url,location.origin).searchParams.get('room'))||(url==='/rooms.html?room=dining'&&path.startsWith('/dining-'))||(url==='/rooms.html?room=ama'&&path.startsWith('/ama-'))||(url==='/rooms.html?room=games'&&(path.startsWith('/play/')||path.startsWith('/relax')||path==='/dad-arcade.html'))):url==='/'?(path==='/'||path==='/index.html'):url==='/articles.html'?(path==='/articles.html'||path.startsWith('/articles/')):url==='/family.html'?(path==='/family.html'||path==='/about.html'):url==='/play/'?path.startsWith('/play/'):url==='/relax.html'?(path==='/relax.html'||path==='/relax-family.html'||path==='/play/family-lab.html'):path===url;if(active)a.setAttribute('aria-current','page');nav.append(a);});
inner.append(brand,nav);host.replaceChildren(inner);host.dataset.unifiedHeader=version;
})();




/* A single heading system for section entrances and article/person detail pages. */
(()=>{
 if(typeof document==='undefined')return;
 if(document.querySelector('.cdj-welcome'))return;
 const route=location.pathname;if(route==='/'||route==='/index.html')return;
 const title=document.querySelector('main h1');if(!title)return;
 let section='認識我們';
 if(route.startsWith('/dining-'))section='餐廳';
 else if(route.startsWith('/ama-'))section='兔窩';
 else if(route.startsWith('/articles'))section='雞窩';
 else if(route.startsWith('/videos'))section='客廳';
 else if(route.startsWith('/play/'))section='親子樂園';
 else if(route.startsWith('/relax'))section='大人放風';
 else if(route.startsWith('/stickers'))section='貼圖小舖';
 document.body.dataset.cdjPage=route.includes('family')||route.includes('about')?'family':section;
 title.dataset.cdjTitle='true';
 const entrance=['/articles.html','/videos.html','/family.html','/about.html','/play/','/play/index.html','/relax.html','/relax-family.html','/stickers.html'].includes(route);
 let eyebrow=title.previousElementSibling;
 if(entrance){
  const hasEyebrow=eyebrow?.matches('.eyebrow,.entry-eyebrow,.our-eyebrow,.about-kicker,.screening-kicker,.kicker,.cdj-page-eyebrow');
  if(title.textContent.replace(/\s/g,'')===section){if(hasEyebrow)eyebrow.remove();}else{if(!hasEyebrow){eyebrow=document.createElement('p');title.before(eyebrow);}eyebrow.classList.add('cdj-page-eyebrow');eyebrow.textContent=section;}
  title.parentElement.classList.add('cdj-entrance-copy');
  (title.closest('section')||title.parentElement).classList.add('cdj-entrance-section');
 }else{
  if(!eyebrow?.matches('.eyebrow,.entry-eyebrow,.our-eyebrow,.about-kicker,.kicker,.cdj-page-eyebrow')){eyebrow=document.createElement('p');title.before(eyebrow);}
  eyebrow.classList.add('cdj-page-eyebrow');eyebrow.textContent=section;
 }
 const lead=title.nextElementSibling?.matches('p')?title.nextElementSibling:title.parentElement.nextElementSibling;if(lead?.matches('p'))lead.dataset.cdjLead='true';
})();
/* 雞爸爸生活研究室：彩色雅虎回頂端（可貼在 js/site-entry-nav.js 最後） */
(()=>{'use strict';
  const install=()=>{
    if(document.getElementById('cdj-yahoo-backtop')||!document.body)return;
    const style=document.createElement('style');
    style.textContent=`
      #cdj-yahoo-backtop{position:fixed;right:clamp(10px,2.4vw,24px);bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:9990;width:54px;height:62px;padding:3px 3px 2px;border:1px solid rgba(80,103,85,.24);border-radius:18px;background:rgba(255,248,240,.96);box-shadow:0 3px 12px rgba(36,49,40,.15);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0;cursor:pointer;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .2s,transform .2s,visibility .2s;-webkit-tap-highlight-color:transparent}
      #cdj-yahoo-backtop.is-visible{opacity:1;visibility:visible;transform:translateY(0)}
      #cdj-yahoo-backtop img{width:37px;height:43px;object-fit:contain;display:block}
      #cdj-yahoo-backtop span{font:700 10px/1.2 system-ui,'Microsoft JhengHei',sans-serif;color:#355a44;white-space:nowrap}
      #cdj-yahoo-backtop:hover{box-shadow:0 4px 16px rgba(36,49,40,.23)}
      #cdj-yahoo-backtop:focus-visible{outline:3px solid #d88037;outline-offset:3px}
      @media(max-width:600px){#cdj-yahoo-backtop{right:10px;bottom:calc(12px + env(safe-area-inset-bottom,0px));width:48px;height:56px;border-radius:15px}#cdj-yahoo-backtop img{width:33px;height:38px}#cdj-yahoo-backtop span{font-size:9px}}
      @media(prefers-reduced-motion:reduce){#cdj-yahoo-backtop{transition:none}}
    `;
    document.head.append(style);
    const button=document.createElement('button');button.type='button';button.id='cdj-yahoo-backtop';
    button.setAttribute('aria-label','雅虎帶你回到頁面頂端');button.title='回頂端';
    const pic=document.createElement('img');pic.src='/cat-yahoo-peek.png?v=20261115-backtop-color';pic.alt='';pic.loading='lazy';pic.decoding='async';
    const label=document.createElement('span');label.textContent='回頂端';
    button.append(pic,label);document.body.append(button);
    const update=()=>button.classList.toggle('is-visible',window.scrollY>280);
    button.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
    window.addEventListener('scroll',update,{passive:true});window.addEventListener('pageshow',update);update();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();





/* 2026-11-21 | Study ONLY: viewport-height fit, not full browser width.
   Header height + complete uncropped 16:9 study image <= one viewport height.
   Preserve the reader sprite, pets, five interactive hotspots, navigation, and all welcome copy. */
(()=>{'use strict';
  if(location.pathname!=='/articles.html')return;
  const apply=()=>{
    if(!document.body||document.getElementById('cdj-study-one-screen-height-v4'))return;
    const style=document.createElement('style');
    style.id='cdj-study-one-screen-height-v4';
    style.textContent=`
      html body[data-welcome-page="articles"] main#journal-page > section.cdj-welcome.cdj-room-entrance {
        --study-width:min(calc(100vw - var(--cdj-scrollbar,0px)), calc((100dvh - var(--cdj-header-height,104px) - 12px) * 16 / 9))!important;
        box-sizing:border-box!important;
        display:block!important;
        position:relative!important;
        width:var(--study-width)!important;
        min-width:0!important;
        max-width:var(--study-width)!important;
        margin:0 0 16px calc(50% - var(--study-width) / 2)!important;
        padding:0!important;
        left:auto!important;
        right:auto!important;
        transform:none!important;
        float:none!important;
      }
      html body[data-welcome-page="articles"] main#journal-page > section.cdj-welcome.cdj-room-entrance > .cdj-greeting[data-room="study"] {
        display:block!important;
        box-sizing:border-box!important;
        width:100%!important;
        min-width:0!important;
        max-width:none!important;
        height:auto!important;
        min-height:0!important;
        aspect-ratio:16 / 9!important;
        margin:0!important;
        padding:0!important;
        overflow:hidden!important;
        border-radius:0!important;
      }
      html body[data-welcome-page="articles"] .cdj-greeting[data-room="study"] > .greeting-scene {
        position:absolute!important;
        inset:0!important;
        width:100%!important;
        height:100%!important;
        background-image:url('/assets/greetings/v1/room-study-16x9.webp?v=20261121-one-screen4')!important;
        background-size:100% 100%!important;
        background-position:center center!important;
        background-repeat:no-repeat!important;
        border-radius:0!important;
      }
      /* Preserve previously approved smaller reader; only study scene sizing changes. */
      html body[data-welcome-page="articles"] .cdj-greeting[data-room="study"] > .greeting-character:not(.greeting-cat) {
        --frame:clamp(200px,25vw,380px)!important;
        left:49%!important;
        bottom:1.5%!important;
        scale:0.97!important;
        transform:none!important;
        transform-origin:50% 100%!important;
      }
      @media(max-width:760px){
        html body[data-welcome-page="articles"] main#journal-page > section.cdj-welcome.cdj-room-entrance {
          --study-width:min(calc(100vw - 24px), calc((100dvh - var(--cdj-header-height,104px) - 12px) * 16 / 9))!important;
          width:var(--study-width)!important;
          max-width:var(--study-width)!important;
          margin:0 0 16px calc(50% - var(--study-width) / 2)!important;
        }
        html body[data-welcome-page="articles"] .cdj-greeting[data-room="study"] > .greeting-character:not(.greeting-cat) {
          --frame:clamp(180px,42vw,290px)!important;
          left:49%!important;
          bottom:1.2%!important;
          scale:0.96!important;
        }
      }
    `;
    document.head.append(style);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();


/* 2026-11-21 | Only three explicitly requested welcome headlines.
   Other rooms retain their existing welcome text and descriptions.
   Run after house-rooms.js finishes building the interactive scenes.
   Do not change sprite assets, pet animation, background sizing or hotspots. */
(()=>{'use strict';
  const copy={
    living:['我們家的影片','一家人的成長、貓咪日常與生活短片，都在客廳慢慢欣賞。'],
    study:['我們家的文章','一家日常、內心小惡魔、珍山陳語錄，以及親子與健康期刊。'],
    dining:['一起來用餐吧','從雅虎喝水、右右吃飯，到一家人圍桌分享每天的故事。'],
  };
  const apply=()=>{
    const scene=document.querySelector('.cdj-welcome .cdj-greeting[data-room]');
    const route=location.pathname;
    const key=scene?.dataset.room || (route==='/articles.html'?'study':route==='/videos.html'?'living':null);
    const selected=copy[key];if(!selected)return;
    const hero=scene?.closest('.cdj-welcome') || document.querySelector('main .cdj-welcome');
    if(!hero)return;
    const title=hero.querySelector('#cdj-welcome-title')||hero.querySelector('h1');
    if(title){title.textContent=selected[0];}
    const desc=hero.querySelector('.cdj-welcome-summary');
    if(desc)desc.textContent=selected[1];
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
