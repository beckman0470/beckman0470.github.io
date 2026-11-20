/* Chicken Dad Journal — room content decluttering (2026-11-20)
   Safe enhancement: does not remove articles, game state or other room pages. */
(()=>{'use strict';
  function tidy(){
    const page=location.pathname;
    if(page!=='/videos.html' && page!=='/rooms.html')return;
    // Living room: journals are exclusively browsed from the study.
    if(page==='/videos.html' || new URLSearchParams(location.search).get('room')==='living'){
      document.querySelectorAll('#living-zschen').forEach(node=>node.remove());
      document.querySelectorAll('.room-link-bar a[href="#living-zschen"]').forEach(a=>{
        const group=a.closest('.room-link-group');a.remove();
        // Remove the now-empty article group, but keep the games and videos.
        if(group && !group.querySelector('a'))group.remove();
      });
      document.querySelectorAll('.ancestor-shrine, #family-shrine a[href="#living-zschen"]').forEach(a=>{
        a.href='/articles.html?room=zschen#cards-grid';
        a.setAttribute('aria-label','到雞窩閱讀珍山陳經典語錄');
      });
    }
    document.body.classList.add('cdj-layout-slim');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tidy,{once:true});
  else tidy();
})();
