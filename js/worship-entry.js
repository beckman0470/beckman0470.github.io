(()=>{'use strict';
  if(location.pathname!=='/videos.html')return;
  const worshipPath='/worship/';
  function init(){
    const living=document.querySelector('.cdj-greeting[data-room="living"]');
    if(!living)return false;
    const old=document.getElementById('cdj-worship-direct');
    if(old)return true;
    // A small '點香祭拜' entry, positioned alongside existing room controls without replacing background props.
    const link=document.createElement('a');
    link.id='cdj-worship-direct';link.href=worshipPath;
    link.textContent='點香祭拜';link.setAttribute('aria-label','進入祖先與神明線上祭拜');
    link.style.cssText='display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:9px 18px;margin:8px 4px;border:1px solid #c79d59;border-radius:22px;background:#6b3b24;color:#ffebbf;font:700 16px/1.4 system-ui,"Noto Sans TC",sans-serif;box-shadow:0 3px 10px #0002;text-decoration:none;';
    const host=document.querySelector('.living-quick-links') || document.querySelector('#living-playground') || document.querySelector('#house-content');
    if(host)host.prepend(link);else living.after(link);
    // Keep the original altar objects as objects; clicking them leads to the worship room.
    // Do not alter other hotspots or family character interactions.
    const altars=living.querySelectorAll('.room-item-hotspots .altar-item,.room-item-hotspots .shrine-mobile');
    altars.forEach(a=>{a.setAttribute('href',worshipPath);a.setAttribute('aria-label','按神桌，進入線上祭拜');a.title='點神桌開始點香祭拜';});
    return true;
  }
  if(!init()){
    let tries=0;const observer=new MutationObserver(()=>{if(init())observer.disconnect();else if(++tries>100)observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
  // If room-activities creates hotspots after this script runs, update links when inserted.
  document.addEventListener('click',event=>{
    const a=event.target.closest?.('.cdj-greeting[data-room="living"] .room-item-hotspots .altar-item,.cdj-greeting[data-room="living"] .room-item-hotspots .shrine-mobile');
    if(!a)return;
    event.preventDefault();event.stopPropagation();location.assign(worshipPath);
  },true);
})();