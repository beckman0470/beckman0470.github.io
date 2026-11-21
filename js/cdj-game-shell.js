/* Chicken Dad Journal - compact, single standalone-game navigation. */
(()=>{'use strict';
 if(new URLSearchParams(location.search).has('roomembed'))return;
 const routes={
  '/dining-fruit.html':['餐廳','/rooms.html?room=dining'],
  '/dining-stairs.html':['餐廳','/rooms.html?room=dining'],
  '/ama-solitaire.html':['兔窩','/rooms.html?room=ama'],
  '/ama-sudoku.html':['兔窩','/rooms.html?room=ama'],
  '/mom-breakout.html':['鼠窩','/rooms.html?room=mom'],
  '/mom-words.html':['鼠窩','/rooms.html?room=mom'],
  '/dad-arcade.html':['遊戲間','/rooms.html?room=games'],
  '/play/salon/':['遊戲間','/rooms.html?room=games'],
  '/play/yakiniku/':['廚房','/rooms.html?room=kitchen']
 };
 const key=location.pathname.replace(/index\.html$/,'');const entry=routes[key]||routes[location.pathname];if(!entry)return;
 const install=()=>{
  if(!document.body||document.getElementById('cdjg-shell-bar'))return;
  document.body.classList.add('cdjg-shell-enabled');
  // Page already owns a site header; avoid showing TWO site headers.
  // Preserve unscoped game-specific headers (e.g. arcade controls).
  document.querySelectorAll('body > header.site-header,body > header.cdj-unified-header,body > header[data-cdj-shell-replace]').forEach(header=>{
   header.classList.add('cdjg-replaced-site-header');
   header.setAttribute('aria-hidden','true');
   header.querySelectorAll('a,button,input,select').forEach(n=>n.setAttribute('tabindex','-1'));
  });
  const nav=document.createElement('nav');nav.id='cdjg-shell-bar';nav.className='cdjg-shell-bar';nav.setAttribute('aria-label','遊戲頁面導覽');
  const brand=document.createElement('a');brand.className='cdjg-shell-brand';brand.href='/';brand.textContent='雞爸爸生活研究室';
  const group=document.createElement('span');group.className='cdjg-shell-actions';
  const back=document.createElement('a');back.className='cdjg-shell-return';back.href=entry[1];back.textContent='回'+entry[0];
  const games=document.createElement('a');games.className='cdjg-shell-games';games.href='/rooms.html?room=games';games.textContent='遊戲間';
  group.append(back,games);nav.append(brand,group);
  document.body.insertBefore(nav,document.body.firstChild);
  // Keep original footers if any; add a footer only when no footer exists.
  let foot=document.querySelector('body > footer');
  if(!foot){foot=document.createElement('footer');document.body.append(foot);foot.append(document.createTextNode('雞爸爸生活研究室'));}
  foot.classList.add('cdjg-shell-footer');
  if(!Array.from(foot.querySelectorAll('a')).some(a=>a.getAttribute('href')===entry[1])){
    const link=document.createElement('a');link.href=entry[1];link.textContent='回'+entry[0];
    foot.prepend(link,document.createTextNode(' · '));
  }
  if(!Array.from(foot.querySelectorAll('a')).some(a=>a.getAttribute('href')==='/')){
    const home=document.createElement('a');home.href='/';home.textContent='網站首頁';
    foot.append(document.createTextNode(' · '),home);
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
