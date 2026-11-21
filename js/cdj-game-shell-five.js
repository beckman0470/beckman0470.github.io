/* CDJ: shared compact site-level navigation for standalone games.
 * Game-specific HUDs, scores, voice controls and buttons are left untouched.
 */
(()=>{'use strict';
  if(new URLSearchParams(location.search).has('roomembed'))return;
  const routes={
    '/play/fast-food/':['餐廳','/rooms.html?room=dining'],
    '/play/yahoo-water/':['餐廳','/rooms.html?room=dining'],
    '/play/youyou-food/':['餐廳','/rooms.html?room=dining'],
    '/play/dish-family/':['廚房','/rooms.html?room=kitchen'],
    '/play/bath-family/':['浴室','/rooms.html?room=bathroom'],
  };
  const key=location.pathname.replace(/index\.html$/,'');
  const route=routes[key]||routes[location.pathname];
  if(!route)return;
  function install(){
    if(!document.body||document.getElementById('cdjg-shell-bar'))return;
    const body=document.body;body.classList.add('cdjg-shell-enabled');
    // Retire only a redundant navigation header, NEVER a game HUD.
    document.querySelectorAll('header').forEach(h=>{
      // A header containing game buttons, score or progress is a game HUD.
      if(h.querySelector('button,select,[id="score"],[id="progress"]'))return;
      if(h.querySelector('.stars,.star,.score'))return;
      if(!h.matches('[data-cdj-shell-replace],.site-header,.cdj-unified-header') && h.querySelector('h1,h2'))return;
      h.classList.add('cdjg-replaced-site-header');
      h.setAttribute('aria-hidden','true');
      h.querySelectorAll('a,button,input,select').forEach(el=>el.tabIndex=-1);
    });
    // Hide only duplicate ROOM links, not any game buttons or actions.
    document.querySelectorAll('header a[href],.top > a[href],.nav > a[href]').forEach(a=>{
      const href=a.getAttribute('href')||'';
      if(href.includes('/rooms.html?room=') && !a.closest('.cdjg-shell-bar')){
        a.classList.add('cdjg-duplicate-back');
      }
    });
    const bar=document.createElement('nav');bar.id='cdjg-shell-bar';bar.className='cdjg-shell-bar';bar.setAttribute('aria-label','遊戲頁面導覽');
    const brand=document.createElement('a');brand.className='cdjg-shell-brand';brand.href='/';brand.textContent='雞爸爸生活研究室';
    const actions=document.createElement('span');actions.className='cdjg-shell-actions';
    const back=document.createElement('a');back.className='cdjg-shell-return';back.href=route[1];back.textContent='回'+route[0];
    const games=document.createElement('a');games.className='cdjg-shell-games';games.href='/rooms.html?room=games';games.textContent='遊戲間';
    actions.append(back,games);bar.append(brand,actions);body.insertBefore(bar,body.firstChild);
    let foot=body.querySelector(':scope > footer');
    if(!foot){foot=document.createElement('footer');body.append(foot);foot.append(document.createTextNode('雞爸爸生活研究室'));}
    foot.classList.add('cdjg-shell-footer');
    const links=Array.from(foot.querySelectorAll('a[href]'));
    if(!links.some(a=>a.getAttribute('href')===route[1])){
      const l=document.createElement('a');l.href=route[1];l.textContent='回'+route[0];foot.append(' · ',l);
    }
    if(!links.some(a=>a.getAttribute('href')==='/')){
      const l=document.createElement('a');l.href='/';l.textContent='網站首頁';foot.append(' · ',l);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
