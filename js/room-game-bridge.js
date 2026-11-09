/* Small, testable adapter for same-origin room games. No game state is copied. */
((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CDJRoomFrame=api;})(typeof window==='undefined'?this:window,()=>{
 'use strict';
 function canonical(raw,base){try{const origin=new URL(base),url=new URL(raw,base);if(url.origin!==origin.origin||!['http:','https:'].includes(url.protocol))return null;url.searchParams.delete('roomembed');url.searchParams.sort();return url.pathname+url.search+url.hash;}catch(_){return null;}}
 const css=`html,body{height:auto!important;min-height:0!important;margin:0!important;overflow-x:hidden!important}body{background:#fffdf7!important}body>header,body>footer,.site-header,.site-footer,.cdj-welcome,.intro,.family-host-switch,#topic-menu,#arcade-tabs,.ama-top,.ama-tabs,.stairs-top,.ama-main>h1,main>.kicker,main>h1,.game-head,#adult-catalog,.adult-audio-note,[data-analytics-consent]{display:none!important}main,.ama-main,.stairs-main{width:100%!important;max-width:100%!important;padding:12px!important;margin:0!important;box-sizing:border-box!important;min-height:0!important}.stage,.ama-panel,.mg-panel{margin-top:0!important}canvas{display:block;width:auto!important;height:auto!important;margin-inline:auto;max-width:100%!important;object-fit:contain;max-height:var(--room-canvas-height,320px)!important}.cdj-unified-header{display:none!important}.mg-top>.secondary,.mg-classic>.secondary{display:none!important}.mgt-dock{position:static!important}#topic-stage>.toolbar{position:static!important}`;
 const startSelectors=['#launch-ball','[data-stair-start]','#start'];
 const pauseSelectors=['#pause-ball','[data-stair-pause]','#pause'];
 function attach(frame,options={}){
  const doc=frame.contentDocument,win=frame.contentWindow;if(!doc?.body||!win)throw new Error('missing-document');
  if(!doc.body.textContent.trim())throw new Error('empty-document');
  if(!doc.querySelector('main')&&/404|not found/i.test(doc.title||''))throw new Error('missing-game');
  let disposed=false,queued=null,resize=null,mutation=null;
  const viewport=()=>Math.max(180,Math.min(380,(options.viewportHeight?.()||800)*.46));
  const style=doc.createElement('style');style.textContent=css;doc.head.append(style);doc.documentElement.style.setProperty('--room-canvas-height',viewport()+'px');
  const path=new URL(options.url,options.base).pathname,params=new URL(options.url,options.base).searchParams;
  if(path.startsWith('/play/')){
   if(params.get('roomview')==='video')doc.querySelectorAll('.mg-section,.mg-classic,.mg-panel,.panel-head,.tabs').forEach(e=>e.style.setProperty('display','none','important'));
   else if(params.has('game'))doc.querySelectorAll('.tabs,.panel-head,.dv-corner').forEach(e=>e.style.setProperty('display','none','important'));
  }
  const visible=e=>!!e&&e.getClientRects().length>0&&!e.closest('[hidden]');
  const control=selectors=>selectors.flatMap(s=>[...doc.querySelectorAll(s)]).find(visible)||null;
  function sync(){if(disposed)return;const start=control(startSelectors),pause=control(pauseSelectors);options.onActions?.({start:!!start,startDisabled:!start||start.disabled,pause:!!pause,pauseDisabled:!pause||pause.disabled,pauseLabel:pause?.textContent?.trim()||'暫停'});}
  function fit(){queued=null;if(disposed||frame.contentDocument!==doc)return;const main=doc.querySelector('main')||doc.body;let bottom=main.getBoundingClientRect().bottom+win.scrollY;
   for(const e of doc.body.children){const c=win.getComputedStyle(e);if(e.tagName!=='SCRIPT'&&c.display!=='none'&&c.position!=='fixed')bottom=Math.max(bottom,e.getBoundingClientRect().bottom+win.scrollY);}
   const height=Math.min(24000,Math.max(240,Math.ceil(bottom+16)));if(Math.abs(frame.getBoundingClientRect().height-height)>2)frame.style.height=height+'px';sync();
  }
  function schedule(){if(disposed||queued!==null)return;queued=win.requestAnimationFrame(fit);}
  function clickControl(selectors){if(disposed)return false;const b=control(selectors);if(!b||b.disabled)return false;b.click();schedule();return true;}
  function start(){const used=clickControl(startSelectors);if(used)doc.querySelector('canvas')?.focus({preventScroll:true});return used;}
  function togglePause(){return clickControl(pauseSelectors);}
  function pause(){const b=control(pauseSelectors);if(b&&!b.disabled&&!/繼續|恢復|resume/i.test(b.textContent||''))b.click();doc.querySelectorAll('audio,video').forEach(e=>e.pause());win.speechSynthesis?.cancel();schedule();}
  function route(e){const a=e.target.closest?.('a[href]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const raw=new URL(a.getAttribute('href'),win.location.href);if(raw.origin!==new URL(options.base).origin)return;if(options.onRoute?.(raw.href)){e.preventDefault();e.stopImmediatePropagation();}}
  function updateViewport(){if(disposed)return;doc.documentElement.style.setProperty('--room-canvas-height',viewport()+'px');schedule();}
  if(win.ResizeObserver){resize=new win.ResizeObserver(schedule);resize.observe(doc.body);if(doc.querySelector('main'))resize.observe(doc.querySelector('main'));}
  if(win.MutationObserver){mutation=new win.MutationObserver(schedule);mutation.observe(doc.body,{subtree:true,childList:true,attributes:true,attributeFilter:['disabled','hidden','aria-pressed','style']});}
  doc.addEventListener('load',schedule,true);doc.addEventListener('click',schedule);doc.addEventListener('click',route,true);fit();
  return {start,togglePause,pause,updateViewport,dispose(){if(disposed)return;disposed=true;if(queued!==null)win.cancelAnimationFrame(queued);queued=null;resize?.disconnect();mutation?.disconnect();doc.removeEventListener('load',schedule,true);doc.removeEventListener('click',schedule);doc.removeEventListener('click',route,true);options.onActions?.({start:false,pause:false});}};
 }
 return {canonical,attach};
});
