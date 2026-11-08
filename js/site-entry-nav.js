/* Shared centered header. Old article and archive layouts receive the same brand and destinations. */
(()=>{'use strict';if(typeof document==='undefined')return;const host=document.querySelector('header');if(!host)return;
const version='room6';
if(!document.querySelector('link[data-entry-nav-style="'+version+'"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='/css/site-entry-nav.css?v=20261106-order2';link.dataset.entryNavStyle=version;document.head.append(link);}
host.classList.add('cdj-unified-header');
if(host.dataset.unifiedHeader===version)return;
const inner=document.createElement('div');inner.className='cdj-unified-inner';const brand=document.createElement('a');brand.className='cdj-unified-brand';brand.href='/';brand.setAttribute('aria-label','雞爸爸生活研究室首頁');
const avatar=document.createElement('img');avatar.src='/assets/img/logo-avatar.png';avatar.alt='';avatar.width=52;avatar.height=52;const text=document.createElement('span'),name=document.createElement('strong'),english=document.createElement('small');name.textContent='雞爸爸生活研究室';english.textContent='CHICKEN DAD JOURNAL';text.append(name,english);brand.append(avatar,text);
const nav=document.createElement('nav');nav.className='entry-subnav';nav.setAttribute('aria-label','主要導覽');const path=location.pathname;
[["/videos.html","客廳"],["/rooms.html?room=dining","餐廳"],["/rooms.html?room=mom","鼠窩"],["/rooms.html?room=ama","兔窩"],["/articles.html","雞窩"],["/rooms.html?room=games","遊戲間"],["/rooms.html?room=kitchen","廚房"],["/rooms.html?room=bathroom","浴室"],["/stickers.html","貼圖小舖"],["/family.html","認識我們"]].forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.textContent=label;const active=url.startsWith('/rooms.html?')?((path==='/rooms.html'&&new URLSearchParams(location.search).get('room')===new URL(url,location.origin).searchParams.get('room'))||(url==='/rooms.html?room=games'&&(path.startsWith('/play/')||path.startsWith('/relax')||path==='/dad-arcade.html'))):url==='/'?(path==='/'||path==='/index.html'):url==='/articles.html'?(path==='/articles.html'||path.startsWith('/articles/')):url==='/family.html'?(path==='/family.html'||path==='/about.html'):url==='/play/'?path.startsWith('/play/'):url==='/relax.html'?(path==='/relax.html'||path==='/relax-family.html'||path==='/play/family-lab.html'):path===url;if(active)a.setAttribute('aria-current','page');nav.append(a);});
inner.append(brand,nav);host.replaceChildren(inner);host.dataset.unifiedHeader=version;
})();




/* A single heading system for section entrances and article/person detail pages. */
(()=>{
 if(typeof document==='undefined')return;
 if(document.querySelector('.cdj-welcome'))return;
 const route=location.pathname;if(route==='/'||route==='/index.html')return;
 const title=document.querySelector('main h1');if(!title)return;
 let section='認識我們';
 if(route.startsWith('/articles'))section='雞窩';
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



