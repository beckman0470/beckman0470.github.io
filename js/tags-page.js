
(function(){
  const fallbackStories=[
    {title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",date:"2026-06-30",summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",series:"DoDo 成長日記",category:"家庭故事",tags:["視力","遠視","陪伴","健康"],characters:["ChickenDad","DoDo"],research:["兒童視力"],url:"articles/vision-care.html"},
    {title:"雞爸爸和鼠姊姊的半小時夏日約會",date:"2026-06-29",summary:"一個夏日午後，雞爸爸和 DoDo 在泳池邊完成一場短短半小時的夏日約會。",series:"DoDo 成長日記",category:"家庭故事",tags:["游泳","陪伴","成長","家庭"],characters:["ChickenDad","DoDo"],research:["親子陪伴"],url:"articles/swimming.html"},
    {title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",date:"2026-06-29",summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",series:"健康生活",category:"健康生活",tags:["皮質醇","壓力","健康"],characters:["ChickenDad"],research:["壓力管理"],url:"articles/cortisol.html"},
    {title:"味全龍這一冠，屬於用心經營的球團！",date:"2026-06-29",summary:"從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",series:"棒球觀察",category:"棒球故事",tags:["味全龍","棒球","養成"],characters:["ChickenDad"],research:["棒球數據"],url:"articles/dragons-champion.html"}
  ];
  let stories=[], activeTag=null;
  function fixUrl(url){ if(!url)return"#"; if(url.startsWith("./"))return url; if(url.startsWith("/"))return"."+url; return"./"+url; }
  function coverClass(s){ const t=((s.category||"")+" "+(s.tags||[]).join(" ")+" "+(s.series||"")); if(t.includes("健康")||t.includes("皮質醇"))return"health"; if(t.includes("棒球")||t.includes("味全"))return"baseball"; if(t.includes("AI"))return"ai"; if(t.includes("閱讀"))return"reading"; if(t.includes("DoDo")||t.includes("視力")||t.includes("游泳"))return"dodo"; return""; }
  async function loadStories(){ try{ const r=await fetch("./data/stories.json?v=33",{cache:"no-store"}); if(!r.ok)throw Error(r.status); const d=await r.json(); if(!Array.isArray(d)||!d.length)throw Error("empty"); return d; }catch(e){ console.warn("tags fallback",e); return fallbackStories; } }
  function countTags(){ const counts={}; stories.forEach(s=>(s.tags||[]).forEach(t=>counts[t]=(counts[t]||0)+1)); return Object.entries(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"zh-Hant")); }
  function renderCloud(){ const cloud=document.getElementById("tag-cloud"); const tags=countTags(); cloud.innerHTML=tags.map(([tag,count])=>`<button class="tag-btn ${tag===activeTag?'active':''}" data-tag="${tag}">${tag}<span class="tag-count">${count}</span></button>`).join(""); document.querySelectorAll("[data-tag]").forEach(btn=>btn.addEventListener("click",()=>{activeTag=btn.dataset.tag; renderCloud(); renderResults();})); }
  function card(s){ return `<a class="result-card" href="${fixUrl(s.url)}"><div class="result-cover ${coverClass(s)}"></div><div class="card-body"><span class="chip">${s.category||"故事"}</span><h3>${s.title}</h3><p class="muted">${s.summary||""}</p><p class="muted">${s.series||""}｜${s.date||""}</p><span class="readmore">閱讀 →</span></div></a>`; }
  function renderResults(){ const grid=document.getElementById("tag-results"); const title=document.getElementById("tag-title"); const note=document.getElementById("tag-note"); let list=stories; if(activeTag){ list=stories.filter(s=>(s.tags||[]).includes(activeTag)); title.textContent="# "+activeTag; note.textContent=`${activeTag} 共有 ${list.length} 篇故事。`; }else{ title.textContent="全部標籤故事"; note.textContent=`目前共 ${stories.length} 篇故事。`; } grid.innerHTML=list.length?list.map(card).join(""):'<div class="empty">這個標籤目前沒有故事。</div>'; }
  loadStories().then(data=>{stories=data.sort((a,b)=>new Date(b.date)-new Date(a.date)); const params=new URLSearchParams(location.search); activeTag=params.get("tag"); renderCloud(); renderResults();});
})();
