/* CDJ 2026-11-21: Only the three specifically requested welcome titles; no third line. */
(()=>{'use strict';
  const titles={living:'我們家的影片',study:'我們家的文章',dining:'一起來用餐吧'};
  function apply(){
    const route=location.pathname;
    const room=document.querySelector('.cdj-welcome .cdj-greeting[data-room]');
    const key=route==='/articles.html'?'study':route==='/videos.html'?'living':route==='/rooms.html'?room?.dataset.room:null;
    if(!Object.prototype.hasOwnProperty.call(titles,key))return;
    const hero=room?.closest('.cdj-welcome')||document.querySelector('main .cdj-welcome');
    if(!hero)return;
    const title=hero.querySelector('#cdj-welcome-title')||hero.querySelector('h1');
    const summary=hero.querySelector('.cdj-welcome-summary');
    if(title)title.textContent=titles[key];
    if(summary){summary.hidden=true;summary.textContent='';summary.style.setProperty('display','none','important');}
  }
  apply();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
})();
