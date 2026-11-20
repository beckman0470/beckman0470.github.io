/* Route the existing bath game entry to the picture-first sibling bath adventure. */
(()=>{'use strict';
 document.addEventListener('click',event=>{
  const node=event.target.closest('a,button,[role="button"]');
  if(!node)return;
  const href=node.getAttribute('href')||'';
  const text=(node.textContent||'').trim();
  if(href.includes('game=bath')||text.includes('洗澡步驟小達人')){
   event.preventDefault();event.stopImmediatePropagation();
   window.location.assign('/play/bath-family/');
  }
 },true);
})();
