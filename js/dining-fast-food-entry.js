/* Dining entry only; existing room activities and games remain intact. */
(()=>{
 'use strict';
 if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='dining')return;
 const host=document.querySelector('#dining-games .house-cards');
 if(!host||document.getElementById('dining-fast-food-card'))return;
 const card=document.createElement('a');card.id='dining-fast-food-card';card.className='house-card';card.href='/play/fast-food/';
 const picture=document.createElement('img');picture.src='/play/fast-food/assets/dodo-cover.webp?v=20261121';picture.alt='戴透明眼鏡、長髮的鼠姊姊在速食店招待客人，前方有漢堡薯條和飲料';picture.width=600;picture.height=400;picture.loading='lazy';picture.style.cssText='width:100%;aspect-ratio:1/1;object-fit:contain;display:block;background:#f2f0e6';
 const copy=document.createElement('div'),title=document.createElement('h3'),desc=document.createElement('p'),go=document.createElement('span');
 title.textContent='鼠姊姊速食店';desc.textContent='看圖拿漢堡、薯條和可樂，招呼排隊客人，再把錢放進收銀機。';go.textContent='開始開店 →';copy.append(title,desc,go);card.append(picture,copy);host.prepend(card);
})();