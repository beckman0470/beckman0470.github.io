/* Add one independent game entry without replacing any existing room content. */
(()=>{'use strict';
if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='games')return;
function install(){if(document.getElementById('bm-room-entry'))return;
 const host=document.querySelector('#house-content');if(!host)return;
 const section=document.createElement('section');section.id='bm-room-entry';section.style.cssText='max-width:1040px;margin:26px auto;padding:18px 20px;background:linear-gradient(115deg,#fff0f8,#f3edff);border:1px solid #e8cfe9;border-radius:22px;box-sizing:border-box;font-family:system-ui,"Microsoft JhengHei",sans-serif';
 section.innerHTML='<div style="display:flex;align-items:center;flex-wrap:wrap;gap:15px"><img src="/assets/babymonster/asa.png" alt="短髮 ASA Q版小老師" style="height:115px;width:87px;object-fit:contain;border-radius:14px;background:#fffaf2"><div style="flex:1;min-width:200px"><p style="font-size:13px;color:#795b88;font-weight:800;margin:0">鼠姊姊的英韓音樂遊戲</p><h2 style="margin:5px 0 8px;font-size:clamp(20px,3vw,27px);color:#453263">BABYMONSTER 英韓小教室</h2><p style="margin:0;color:#5e5272;line-height:1.65">七位Q版小老師，陪你聽發音、學英韓語、玩小測驗！</p></div><a href="/babymonster-classroom.html" style="display:inline-block;background:#64458d;color:white;padding:13px 20px;border-radius:16px;text-decoration:none;font-weight:800">開始上課 ▶</a></div>';
 host.prepend(section);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
