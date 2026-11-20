/* All-room embedded game cleanup: runs only in rooms.html parent,
   uses same-origin iframe document, and never hides the parent's navigation. */
(()=>{'use strict';
  const bridge=window.CDJRoomFrame;
  if(!bridge||typeof bridge.attach!=='function')return;
  const original=bridge.attach;
  const extraCSS=`
html body .cdj-welcome,
html body main > .cdj-welcome,
html body header,
html body footer,
html body .site-header,
html body .site-footer,
html body .cdj-unified-header,
html body .entry-subnav,
html body .intro,
html body main > .tabs,
html body main > .intro,
html body .family-host-switch,
html body #arcade-tabs,
html body #topic-menu,
html body .dv-corner,
html body .dv-player,
html body .dv-note,
html body .dv-filters {
  display:none!important;
}
html body main,
html body main.cdj-welcome-main {
  width:100%!important;
  max-width:none!important;
  margin:0!important;
  padding:8px!important;
  min-height:0!important;
}
html body[data-welcome-page="play"] #panel-dodo,
html body[data-welcome-page="play"] #panel-dragon { margin:0!important; }
html body[data-welcome-page="play"] .panel-head {display:none!important;}
`;
  bridge.attach=function(frame,opts){
    const driver=original.call(this,frame,opts);
    const doc=frame.contentDocument;
    if(!doc?.body)return driver;
    const childStyle=doc.createElement('style');
    childStyle.setAttribute('data-room-embed-cleanup','');
    childStyle.textContent=extraCSS;
    doc.head.append(childStyle);

    const path=new URL(opts.url,opts.base).pathname;
    // The play portal contains several independent areas.
    // Keep the selected child's activity, not the entire portal.
    if(path.startsWith('/play/')){
      const url=new URL(opts.url,opts.base);
      const area=url.searchParams.get('area');
      const dodo=doc.querySelector('#panel-dodo');
      const dragon=doc.querySelector('#panel-dragon');
      if(area==='dragon'){
        if(dodo)dodo.style.setProperty('display','none','important');
        if(dragon){
          dragon.hidden=false;
          dragon.style.setProperty('display','block','important');
        }
      }else if(area==='dodo'){
        if(dragon)dragon.style.setProperty('display','none','important');
        if(dodo){
          dodo.hidden=false;
          dodo.style.setProperty('display','block','important');
        }
      }
    }
    // Avoid overwriting the embedded game's own interactive controls.
    // Only top-level site chrome is hidden. The iframe is still same-origin.
    return {
      ...driver,
      dispose(){
        childStyle.remove();
        driver.dispose();
      }
    };
  };
})();
