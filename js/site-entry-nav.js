/* Shared centered header. Old article and archive layouts receive the same brand and destinations. */
(()=>{'use strict';if(typeof document==='undefined')return;const host=document.querySelector('header');if(!host)return;
const version='order2';
if(!document.querySelector('link[data-entry-nav-style="'+version+'"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='/css/site-entry-nav.css?v=20261106-order2';link.dataset.entryNavStyle=version;document.head.append(link);}
host.classList.add('cdj-unified-header');
if(host.dataset.unifiedHeader===version)return;
const inner=document.createElement('div');inner.className='cdj-unified-inner';const brand=document.createElement('a');brand.className='cdj-unified-brand';brand.href='/';brand.setAttribute('aria-label','雞爸爸生活研究室首頁');
const avatar=document.createElement('img');avatar.src='/assets/img/logo-avatar.png';avatar.alt='';avatar.width=52;avatar.height=52;const text=document.createElement('span'),name=document.createElement('strong'),english=document.createElement('small');name.textContent='雞爸爸生活研究室';english.textContent='CHICKEN DAD JOURNAL';text.append(name,english);brand.append(avatar,text);
const nav=document.createElement('nav');nav.className='entry-subnav';nav.setAttribute('aria-label','主要導覽');const path=location.pathname;
[["/","首頁"],["/articles.html","生活文章"],["/videos.html","影音館"],["/play/","親子樂園"],["/relax.html","大人放風"],["/stickers.html","貼圖小舖"],["/family.html","認識我們"]].forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.textContent=label;const active=url==='/'?(path==='/'||path==='/index.html'):url==='/articles.html'?(path==='/articles.html'||path.startsWith('/articles/')):url==='/family.html'?(path==='/family.html'||path==='/about.html'):url==='/play/'?path.startsWith('/play/'):url==='/relax.html'?(path==='/relax.html'||path==='/relax-family.html'||path==='/play/family-lab.html'):path===url;if(active)a.setAttribute('aria-current','page');nav.append(a);});
inner.append(brand,nav);host.replaceChildren(inner);host.dataset.unifiedHeader=version;
})();


