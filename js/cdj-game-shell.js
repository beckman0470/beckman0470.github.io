/* Standalone game outer shell; no gameplay or controls are modified. */
(()=>{'use strict';
if(new URLSearchParams(location.search).has('roomembed'))return;
const routes={
 '/dining-fruit.html':['餐廳','/rooms.html?room=dining'],
 '/dining-stairs.html':['餐廳','/rooms.html?room=dining'],
 '/ama-solitaire.html':['兔窩','/rooms.html?room=ama'],
 '/ama-sudoku.html':['兔窩','/rooms.html?room=ama'],
 '/mom-breakout.html':['鼠窩','/rooms.html?room=mom'],
 '/mom-words.html':['鼠窩','/rooms.html?room=mom'],
 '/dad-arcade.html':['遊戲間','/rooms.html?room=games']
};
const row=routes[location.pathname];if(!row)return;
const install=()=>{
 if(document.getElementById('cdjg-shell-bar'))return;
 const bar=document.createElement('nav');bar.id='cdjg-shell-bar';bar.className='cdjg-shell-bar';bar.setAttribute('aria-label','遊戲頁面導覽');
 const brand=document.createElement('a');brand.className='cdjg-shell-brand';brand.href='/';brand.textContent='雞爸爸生活研究室';
 const back=document.createElement('a');back.className='cdjg-shell-return';back.href=row[1];back.textContent='回'+row[0];
 bar.append(brand,back);document.body.insertBefore(bar,document.body.firstChild);
 const foot=document.querySelector('body>footer');
 if(foot){foot.classList.add('cdjg-shell-footer');
   if(![...foot.querySelectorAll('a')].some(a=>a.getAttribute('href')===row[1])){
     const a=document.createElement('a');a.href=row[1];a.textContent='回'+row[0];foot.prepend(a,document.createTextNode(' · '));
   }
 }else{
   const f=document.createElement('footer');f.className='cdjg-shell-footer';
   const a=document.createElement('a');a.href=row[1];a.textContent='回'+row[0];
   f.append(a,document.createTextNode(' · 雞爸爸生活研究室'));document.body.append(f);
 }
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
