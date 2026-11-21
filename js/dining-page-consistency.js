/* Dining-only presentation fixes. No global navigation or room changes. */
(()=>{'use strict';
 if(location.pathname!=='/rooms.html' || new URLSearchParams(location.search).get('room')!=='dining')return;
 const run=()=>{
   const section=document.getElementById('dining-games');
   const host=section?.querySelector('.house-cards');
   if(!section||!host)return;
   if(document.getElementById('cdj-dining-only-consistency-style'))return;
   const style=document.createElement('style');
   style.id='cdj-dining-only-consistency-style';
   style.textContent=`
     body[data-welcome-page="house"] #dining-games .house-cards{
       display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;
       gap:16px!important;align-items:stretch!important;
     }
     body[data-welcome-page="house"] #dining-games .house-card{
       display:flex!important;flex-direction:column!important;overflow:hidden;
       border-radius:18px;min-width:0;text-decoration:none;
     }
     body[data-welcome-page="house"] #dining-games .house-card .dining-card-picture,
     body[data-welcome-page="house"] #dining-games .house-card > img{
       display:block!important;width:100%!important;height:auto!important;
       aspect-ratio:1/1!important;object-fit:cover!important;
       background-position:center!important;background-size:cover!important;
     }
     body[data-welcome-page="house"] #dining-games .house-card > div:not(.dining-card-picture){
       flex:1;display:flex;flex-direction:column;
     }
     body[data-welcome-page="house"] #dining-games .house-card > div:not(.dining-card-picture) > span:last-child{margin-top:auto}
     body[data-welcome-page="house"] #room-inline-stage .room-inline-controls > label{display:none!important}
     @media(max-width:900px){body[data-welcome-page="house"] #dining-games .house-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
     @media(max-width:520px){body[data-welcome-page="house"] #dining-games .house-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}}
   `;
   document.head.append(style);
   const makeCard=({id,title,description,url,img})=>{
     const card=document.createElement('a');card.id=id;card.className='house-card';card.href=url;
     const picture=document.createElement('img');picture.src=img;picture.alt=title+'遊戲封面';picture.width=600;picture.height=600;picture.loading='lazy';
     const body=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p'),cta=document.createElement('span');
     h.textContent=title;p.textContent=description;cta.textContent='開始玩 →';body.append(h,p,cta);card.append(picture,body);return card;
   };
   // Preserve existing full game and its original cover; add a fallback only if an entry script failed.
   let menuCard=host.querySelector('.cdj-menu-cover');
   if(!menuCard){
     menuCard=makeCard({id:'cdj-menu-card-fallback',title:'點餐小廚師',description:'看訂單、選食材，幫家人完成料理。',url:'#cdj-family-menu-game',img:'/assets/play-covers/v1/family-menu.webp?v=20261121-character-fix'});
     host.prepend(menuCard);
   }
   let fast=host.querySelector('#dining-fast-food-card');
   if(!fast){
     fast=makeCard({id:'dining-fast-food-card',title:'鼠姊姊速食店',description:'看圖拿餐點、招待客人，完成點餐任務。',url:'/play/fast-food/',img:'/play/fast-food/assets/dodo-cover.webp?v=20261121'});
     host.prepend(fast);
   }
   // Order the two requested games visibly at the front, then keep every existing dining game.
   host.prepend(menuCard);host.prepend(fast);
   const menuHeading=menuCard.querySelector('h3');
   if(menuHeading)menuHeading.textContent='點餐小廚師';
   menuCard.setAttribute('aria-label','開始玩雞爸爸一家的菜單');
   fast.setAttribute('aria-label','開始玩鼠姊姊速食店');
   section.querySelector('h2')?.setAttribute('id','cdj-dining-games-title');
   // Remove only the redundant selector. Existing cards invoke the shared game frame through its links.
   const redundant=document.querySelector('#room-inline-stage .room-inline-controls > label');
   if(redundant)redundant.hidden=true;
   // Make the menu card reliably open the existing game, even if the auxiliary entry script loaded late.
   menuCard.addEventListener('click',e=>{
     const game=document.getElementById('cdj-family-menu-game');
     const recipes=document.getElementById('dining-mom-menu');
     if(!game||!recipes)return;
     e.preventDefault();recipes.open=true;
     game.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
   });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
