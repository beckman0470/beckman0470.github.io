/* Non-invasive visual classification. Never changes navigation targets or game mechanics. */
(()=>{'use strict';
const groups={video:['▶','影片'],article:['▤','文章'],game:['★','遊戲'],other:['','其他']};
const match=(value)=>{const s=String(value||'').toLowerCase();
 if(/youtube|instagram|reels|shorts|影片|影音|video|media-|roomview=video|#ama-room-media/.test(s))return 'video';
 if(/articles|journal|文章|期刊|語錄|閱讀|故事|#cards-grid|vocus/.test(s))return 'article';
 if(/遊戲|小學堂|練習|挑戰|play\/|game=|#room-activity|#orchid-care|#bicycle-race|#mom-plan|#mom-needs|#kitchen-coffee|#room-inline-stage|拼圖|樂園|賽車/.test(s))return 'game';
 return 'other';};
function identify(e){if(!e)return null;const s=[e.getAttribute('href'),e.getAttribute('aria-label'),e.getAttribute('data-category'),e.querySelector('h3')?.textContent,e.querySelector('h2')?.textContent,e.textContent?.slice(0,90)].filter(Boolean).join(' ');return match(s);}
function decorate(){
 document.querySelectorAll('.room-link-group').forEach(g=>{let k=g.dataset.contentKind;
  if(!k){const title=g.querySelector('strong')?.textContent||'';k=/影片/.test(title)?'video':/文章/.test(title)?'article':/遊戲/.test(title)?'game':'other';g.dataset.contentKind=k}
  const t=g.querySelector('strong');if(t&&!t.dataset.cdjIcon){t.dataset.cdjIcon='1';t.textContent=(groups[k]?.[0]||'')+' '+t.textContent.trim();}
 });
 document.querySelectorAll('.house-card,.media-card,.dv-card,.article-card,.journal-card,.post-card,.video-card').forEach(card=>{
   if(card.closest('.cdj-greeting,nav,.room-inline-stage'))return;
   const kind=identify(card);if(kind==='other')return;
   card.classList.add('cdj-type-card');card.dataset.contentKind=kind;card.dataset.contentBadge=groups[kind][1];
 });
 document.querySelectorAll('#house-content h2,#cards-grid h2,#media-library-title,.living-quotes h2').forEach(h=>{
   const k=match(h.textContent||'');if(k==='other')return;h.classList.add('cdj-type-heading');h.dataset.contentKind=k;
 });
 document.querySelectorAll('.room-inline-stage').forEach(stage=>{
   stage.classList.add('cdj-unified-game');
   const title=stage.querySelector(':scope > h2');
   const chooser=stage.querySelector('.room-inline-controls select');
   const picked=chooser?.selectedOptions?.[0]?.textContent||'';
   const k=match(picked+' '+(title?.textContent||''));
   stage.dataset.contentKind=k==='video'?'video':'game';
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});else decorate();
// Rooms generate and swap their controls after page load: rescan only on relevant changes.
const target=document.querySelector('main')||document.body;
if(target&&window.MutationObserver){let busy=false;const o=new MutationObserver(list=>{
 if(list.every(m=>m.type==='attributes'&&m.attributeName==='data-content-kind'))return;
 if(busy)return;busy=true;queueMicrotask(()=>{busy=false;decorate()});
});o.observe(target,{subtree:true,childList:true,characterData:false});}
})();
