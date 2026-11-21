/* Scoped: dining cards, single shrine entrance, mobile study caption. No other room content. */
(()=>{'use strict';
const path=location.pathname;
if(!['/videos.html','/articles.html','/rooms.html'].includes(path))return;
const apply=()=>{
 if(path==='/videos.html'){
   // Legacy extra shortcut. Actual altar hotspots & the worship entry remain intact.
   document.querySelectorAll('.cdj-greeting[data-room="living"] .room-item.shrine-mobile').forEach(e=>e.remove());
 }
 if(path==='/articles.html'){
   // Keep study object hotspots, articles and pause button; remove only the overlapping hint.
   const style=document.createElement('style');style.id='cdj-study-caption-mobile-fix';
   style.textContent='html body[data-welcome-page="articles"] .cdj-greeting[data-room="study"] > .greeting-caption{display:none!important}';
   document.head.append(style);
 }
 if(path!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='dining')return;
 const list=document.querySelector('#dining-games .house-cards');if(!list)return;
 // Reuse existing game entry scripts. Do not add another competing menu or fast-food game.
 const menu=list.querySelector('.cdj-menu-cover,#cdj-menu-card-fallback');
 const fast=list.querySelector('#dining-fast-food-card');
 if(menu){menu.querySelector('h3') && (menu.querySelector('h3').textContent='點餐小廚師');list.prepend(menu);}
 if(fast)list.prepend(fast);
 // Existing card order: fast-food then chef; preserve all other game cards.
 const style=document.createElement('style');style.id='cdj-dining-stage-only-when-playing';
 style.textContent=`
 body[data-welcome-page="house"] #room-inline-stage:not(.cdj-stage-active){display:none!important}
 body[data-welcome-page="house"] #room-inline-stage .room-inline-controls>label{display:none!important}
 body[data-welcome-page="house"] #dining-games .house-cards{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:16px!important}
 body[data-welcome-page="house"] #dining-games .house-card{display:flex!important;flex-direction:column!important;min-width:0!important;overflow:hidden!important}
 body[data-welcome-page="house"] #dining-games .house-card .dining-card-picture,body[data-welcome-page="house"] #dining-games .house-card>img{display:block!important;width:100%!important;aspect-ratio:1/1!important;height:auto!important;object-fit:cover!important;background-position:center!important;background-size:cover!important}
 @media(max-width:900px){body[data-welcome-page="house"] #dining-games .house-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
 @media(max-width:540px){body[data-welcome-page="house"] #dining-games .house-cards{gap:10px!important}}
 `;
 document.head.append(style);
 const stage=document.querySelector('#room-inline-stage');if(!stage)return;
 const reveal=()=>stage.classList.add('cdj-stage-active');
 // Direct clickable cards/room items invoke shared in-page game player.
 if(window.CDJRoom?.open){const original=window.CDJRoom.open;window.CDJRoom.open=function(...args){reveal();return original.apply(this,args);};}
 window.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');if(!a)return;
    const href=a.getAttribute('href')||'';
    if(/^\/(?:play\/(?:yahoo-water|youyou-food)\/|dining-fruit\.html|dining-stairs\.html)/.test(href))reveal();
 },true);
 stage.querySelectorAll('button').forEach(b=>{if(b.textContent.trim()==='結束遊戲')b.addEventListener('click',()=>stage.classList.remove('cdj-stage-active'));});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
