/* CDJ 2026-11-21: Only three requested welcome areas. */
(()=>{'use strict';
  const copy={
    living:['我們家的影片','一家人的成長、貓咪日常與生活影片，都在客廳慢慢欣賞。'],
    study:['我們家的文章','一家人的生活紀錄、內心小惡魔、珍山陳語錄，還有親子與健康期刊。'],
    dining:['一起來用餐吧','一家人一起用餐，分享生活裡的每一段日常。']
  };
  function apply(){
    const route=location.pathname;
    const room=document.querySelector('.cdj-welcome .cdj-greeting[data-room]');
    const key=route==='/articles.html'?'study':route==='/videos.html'?'living':route==='/rooms.html'?room?.dataset.room:null;
    if(!Object.prototype.hasOwnProperty.call(copy,key))return;
    const hero=room?.closest('.cdj-welcome')||document.querySelector('main .cdj-welcome');
    if(!hero)return;
    const title=hero.querySelector('#cdj-welcome-title')||hero.querySelector('h1');
    const summary=hero.querySelector('.cdj-welcome-summary');
    if(title)title.textContent=copy[key][0];
    if(summary){summary.textContent=copy[key][1];summary.hidden=false;}
  }
  // This file is loaded with defer after house-rooms.js, which constructs the scenes.
  apply();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
})();
