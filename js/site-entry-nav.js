/* Shared centered header. Old article and archive layouts receive the same brand and destinations. */
(()=>{'use strict';if(typeof document==='undefined')return;const host=document.querySelector('header');if(!host)return;
const version='room6';
if(!document.querySelector('link[data-entry-nav-style="'+version+'"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='/css/site-entry-nav.css?v=20261106-order2';link.dataset.entryNavStyle=version;document.head.append(link);}
host.classList.add('cdj-unified-header');
if(host.dataset.unifiedHeader===version)return;
const inner=document.createElement('div');inner.className='cdj-unified-inner';const brand=document.createElement('a');brand.className='cdj-unified-brand';brand.href='/';brand.setAttribute('aria-label','雞爸爸生活研究室首頁');
const avatar=document.createElement('img');avatar.src='/assets/img/logo-avatar.png';avatar.alt='';avatar.width=52;avatar.height=52;const text=document.createElement('span'),name=document.createElement('strong'),english=document.createElement('small');name.textContent='雞爸爸生活研究室';english.textContent='CHICKEN DAD JOURNAL';text.append(name,english);brand.append(avatar,text);
const nav=document.createElement('nav');nav.className='entry-subnav';nav.setAttribute('aria-label','主要導覽');const path=location.pathname;
[["/videos.html","客廳"],["/rooms.html?room=dining","餐廳"],["/articles.html","雞窩"],["/rooms.html?room=mom","鼠窩"],["/rooms.html?room=ama","兔窩"],["/rooms.html?room=kitchen","廚房"],["/rooms.html?room=bathroom","浴室"],["/rooms.html?room=games","遊戲間"],["/stickers.html","貼圖小舖"],["/family.html","認識我們"]].forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.textContent=label;const active=url.startsWith('/rooms.html?')?((path==='/rooms.html'&&new URLSearchParams(location.search).get('room')===new URL(url,location.origin).searchParams.get('room'))||(url==='/rooms.html?room=dining'&&path.startsWith('/dining-'))||(url==='/rooms.html?room=ama'&&path.startsWith('/ama-'))||(url==='/rooms.html?room=games'&&(path.startsWith('/play/')||path.startsWith('/relax')||path==='/dad-arcade.html'))):url==='/'?(path==='/'||path==='/index.html'):url==='/articles.html'?(path==='/articles.html'||path.startsWith('/articles/')):url==='/family.html'?(path==='/family.html'||path==='/about.html'):url==='/play/'?path.startsWith('/play/'):url==='/relax.html'?(path==='/relax.html'||path==='/relax-family.html'||path==='/play/family-lab.html'):path===url;if(active)a.setAttribute('aria-current','page');nav.append(a);});
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




/* ChickenDad consistency bootstrap: preserves the existing room/game scripts. */
(()=>{'use strict';
  const path=location.pathname;
  const page=(path==='/rooms.html'||path==='/articles.html'||path==='/videos.html');
  const addStyle=(file)=>{if(document.querySelector('link[href*="'+file+'"]'))return;const x=document.createElement('link');x.rel='stylesheet';x.href=file+'?v=20261120-integrated2';document.head.append(x)};
  const addScript=(file)=>{if(document.querySelector('script[src*="'+file+'"]'))return;const x=document.createElement('script');x.defer=true;x.src=file+'?v=20261120-integrated2';document.head.append(x)};
  if(page){
    // Bust stale stylesheet cache after existing coop/house fixes.
    document.querySelectorAll('link[rel="stylesheet"][href*="/css/room-activities.css"]').forEach(link=>{
      const url=new URL(link.href,location.href);
      if(url.searchParams.get('v')!=='20261120-integrated2'){
        url.searchParams.set('v','20261120-integrated2');link.href=url.href;
      }
    });
    addStyle('/css/content-identity.css');addScript('/js/content-identity.js');
    addStyle('/css/layout-slim.css');addScript('/js/layout-slim.js');
    addStyle('/css/unified-game-ui.css');addScript('/js/unified-game-ui.js');
  }
  // When the shared site header is loaded on standalone games, match the game presentation too.
  else if(path.startsWith('/play/')||/^(?:\/ama-|\/mom-|\/dad-|\/dining-|\/relax)/.test(path)){
    addStyle('/css/unified-game-ui.css');addScript('/js/unified-game-ui.js');
  }
})();
