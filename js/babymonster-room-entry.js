/* BABYMONSTER English/Korean classroom link in games room; non-destructive. */
(()=>{'use strict';
if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='games')return;
function install(){
 const host=document.querySelector('#house-content');if(!host)return;
 let section=document.getElementById('bm-room-entry');
 if(!section){section=document.createElement('section');section.id='bm-room-entry';host.prepend(section)}
 section.style.cssText='max-width:1040px;margin:26px auto;padding:18px 20px;background:linear-gradient(115deg,#fff7e7,#e8f0e3,#f8e8ed);border:1px solid #d4dfd0;border-radius:22px;box-sizing:border-box;font-family:system-ui,"Microsoft JhengHei",sans-serif';
 section.innerHTML='<div style="display:flex;align-items:center;flex-wrap:wrap;gap:15px"><img src="/assets/babymonster/chiquita.png" alt="CHIQUITA Q版小老師" style="height:115px;width:87px;object-fit:contain;border-radius:14px;background:#fffaf2"><div style="flex:1;min-width:200px"><p style="font-size:13px;color:#67816c;font-weight:800;margin:0">鼠姊姊的英韓音樂教室</p><h2 style="margin:5px 0 8px;font-size:clamp(20px,3vw,27px);color:#3d6048">BABYMONSTER 英韓小教室</h2><p style="margin:0;color:#516454;line-height:1.65">DRIP EP01｜CHIQUITA Q版小老師</p></div><a href="/babymonster-ep01.html" style="display:inline-block;background:#426b54;color:white;padding:13px 20px;border-radius:16px;text-decoration:none;font-weight:800">▶ 開始上課</a></div>';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
