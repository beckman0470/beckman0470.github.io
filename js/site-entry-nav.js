/* Shared destination navigation; no article or game content is changed. */
(()=>{'use strict';if(typeof document==='undefined')return;
const header=document.querySelector('header');if(!header)return;
if(!document.querySelector('link[data-entry-nav-style]')){const link=document.createElement('link');link.rel='stylesheet';link.href='/css/site-entry-nav.css?v=20261106-entry1';link.dataset.entryNavStyle='true';document.head.append(link);}
header.classList.add('cdj-entry-header');
let nav=header.querySelector('[data-entry-nav],nav[aria-label="主要導覽"],.main-nav,nav.nav');
if(!nav){nav=document.createElement('nav');Array.from(header.children).filter(n=>n.tagName==='A'&&!n.classList.contains('brand')).forEach(n=>n.remove());header.append(nav);}
nav.classList.add('entry-subnav');nav.setAttribute('aria-label','主要導覽');
if(nav.dataset.entryNav===undefined){
nav.replaceChildren();const items=[["/","首頁"],["/play/","親子樂園"],["/relax.html","大人放風"],["/videos.html","影音館"],["/articles.html","生活文章"],["/stickers.html","貼圖小舖"],["/family.html","認識我們"]];const path=location.pathname;
items.forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.textContent=label;let current=url==='/'?(path==='/'||path==='/index.html'):url==='/articles.html'?(path==='/articles.html'||path.startsWith('/articles/')):url==='/family.html'?(path==='/family.html'||path==='/about.html'):url==='/play/'?path.startsWith('/play/'):path===url;if(current)a.setAttribute('aria-current','page');nav.append(a);});nav.dataset.entryNav='true';
}
})();

