
(function(){
 const fallback=[
  {title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",date:"2026-06-30",series:"DoDo 成長日記",tags:["視力","遠視"],research:["兒童視力"],url:"articles/vision-care.html"},
  {title:"雞爸爸和鼠姊姊的半小時夏日約會",date:"2026-06-29",series:"DoDo 成長日記",tags:["游泳","陪伴"],research:["親子陪伴"],url:"articles/swimming.html"},
  {title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",date:"2026-06-29",series:"健康生活",tags:["皮質醇"],research:["壓力管理"],url:"articles/cortisol.html"},
  {title:"味全龍這一冠，屬於用心經營的球團！",date:"2026-06-29",series:"棒球觀察",tags:["味全龍"],research:["棒球數據"],url:"articles/dragons-champion.html"}
 ];
 const info={"DoDo 成長日記":["🐭","#8DBFD8"],"健康生活":["🌿","#8FAF8B"],"棒球觀察":["⚾","#802424"],"ChickenDad 札記":["🐔","#A67C52"]};
 function fix(u){return u?("./"+u.replace(/^\\.\\//,"")):"#"} function fmt(s){const d=new Date(s+"T00:00:00");return isNaN(d)?s:String(d.getMonth()+1).padStart(2,"0")+"/"+String(d.getDate()).padStart(2,"0")}
 async function load(){try{const r=await fetch("./data/stories.json?v=30",{cache:"no-store"});if(!r.ok)throw Error(r.status);const d=await r.json();return d.length?d:fallback}catch(e){return fallback}}
 load().then(stories=>{const groups={};stories.forEach(s=>{const k=s.series||"生活研究室";(groups[k]=groups[k]||[]).push(s)});const names=Object.keys(groups);document.getElementById("series-count").textContent=`目前 ${names.length} 個系列，合計 ${stories.length} 篇故事。`;document.getElementById("series-grid").innerHTML=names.map(n=>{const arr=groups[n].sort((a,b)=>new Date(b.date)-new Date(a.date));const meta=info[n]||["🏡","#A67C52"];return`<article class="series-card"><div class="series-art" style="background:linear-gradient(135deg,${meta[1]},#FFF7EC)">${meta[0]}</div><div class="series-body"><div class="kicker">Series</div><h2>${n}</h2><div class="count">目前 ${arr.length} 篇故事</div><p class="muted">這個系列正在慢慢累積故事。</p><div class="story-list">${arr.map(s=>`<a class="story-item" href="${fix(s.url)}"><div class="date">${fmt(s.date)}</div><strong>${s.title}</strong><span class="readmore">閱讀 →</span></a>`).join("")}</div></div></article>`}).join("");const counts={};stories.forEach(s=>(s.research||[]).forEach(r=>counts[r]=(counts[r]||0)+1));document.getElementById("research-grid").innerHTML=Object.entries(counts).slice(0,8).map(([n,c])=>`<div class="research-card"><div class="kicker">Research</div><h3>${n}</h3><p class="muted">${c} 篇相關故事</p></div>`).join("");});
})();
