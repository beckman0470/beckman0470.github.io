(()=>{'use strict';
 if(location.pathname!=='/videos.html')return;
 const dest='/worship/';
 const style=document.createElement('style');style.textContent=`
 .cdj-greeting .worship-altar-hits{position:absolute;inset:0;pointer-events:none;z-index:16}
 .cdj-greeting .worship-altar-hotspot{pointer-events:auto;position:absolute;display:block;border:0;background:transparent;border-radius:5px;outline-offset:-2px;overflow:hidden;color:transparent;font-size:1px;text-indent:-1000px}
 .cdj-greeting .worship-altar-hotspot:hover,.cdj-greeting .worship-altar-hotspot:focus-visible{outline:2px solid #f9d289;background:#ffd78833}
 .cdj-worship-direct{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:9px 18px;margin:8px 4px;border:1px solid #c79d59;border-radius:22px;background:#6b3b24;color:#ffebbf;font:700 16px/1.4 system-ui,'Noto Sans TC',sans-serif;box-shadow:0 3px 10px #0002;text-decoration:none}
 `;document.head.append(style);
 function enable(){
  const living=document.querySelector('.cdj-greeting[data-room="living"]');if(!living)return false;
  if(!document.getElementById('cdj-worship-direct')){
    const link=document.createElement('a');link.id='cdj-worship-direct';link.className='cdj-worship-direct';link.href=dest;link.textContent='點香祭拜';link.setAttribute('aria-label','進入線上祭拜');
    const host=document.querySelector('.living-quick-links')||document.querySelector('#living-playground')||document.querySelector('#house-content');
    if(host)host.prepend(link);else living.after(link);
  }
  living.querySelectorAll('.room-item-hotspots .altar-item,.room-item-hotspots .shrine-mobile').forEach(a=>{
    a.href=dest;a.setAttribute('aria-label','神桌：點香祭拜');a.title='點神桌開始線上祭拜';
  });
  if(!living.querySelector('.worship-altar-hits')){
   const nav=document.createElement('nav');nav.className='worship-altar-hits';nav.setAttribute('aria-label','神桌畫作與對聯的祭拜入口');
   // Relative to the actual living stage. Four small, accessible hit areas for two pictures and the couplets.
   const areas=[
     ['左側對聯','32%','9%','4.0%','34%'],
     ['左側畫作','36%','11%','6.5%','32%'],
     ['右側畫作','43%','11%','6.5%','32%'],
     ['右側對聯','50%','9%','4.0%','34%']
   ];
   areas.forEach(([name,left,top,width,height])=>{
    const link=document.createElement('a');link.className='worship-altar-hotspot';link.href=dest;link.textContent=name+'：進入線上祭拜';link.setAttribute('aria-label',name+'，進入線上祭拜');link.title='點'+name+'，開始祭拜';Object.assign(link.style,{left,top,width,height});nav.append(link);
   });living.append(nav);
  }
  return true;
 }
 if(!enable()){
   let trials=0;const observer=new MutationObserver(()=>{if(enable()||++trials>300)observer.disconnect()});observer.observe(document.documentElement,{subtree:true,childList:true});
 }
 // Other room scripts may add altar links afterwards; intercept only the ancestral altar objects.
 document.addEventListener('click',e=>{const el=e.target.closest?.('.cdj-greeting[data-room="living"] .room-item-hotspots .altar-item,.cdj-greeting[data-room="living"] .room-item-hotspots .shrine-mobile');if(!el)return;e.preventDefault();e.stopPropagation();location.assign(dest);},true);
})();
