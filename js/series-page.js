
(function(){
  const fallbackStories = [
    {id:"vision-care-20260630",title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",slug:"vision-care",date:"2026-06-30",summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",series:"DoDo 成長日記",category:"家庭故事",tags:["視力","遠視","陪伴"],characters:["ChickenDad","DoDo"],research:["兒童視力","遠視照護","家庭陪伴"],url:"articles/vision-care.html"},
    {id:"swimming-20260629",title:"雞爸爸和鼠姊姊的半小時夏日約會",slug:"swimming",date:"2026-06-29",summary:"一個夏日午後，雞爸爸和 DoDo 在泳池邊完成一場短短半小時的夏日約會。",series:"DoDo 成長日記",category:"家庭故事",tags:["游泳","陪伴","成長"],characters:["ChickenDad","DoDo"],research:["親子陪伴","夏日游泳","成長紀錄"],url:"articles/swimming.html"},
    {id:"cortisol-20260629",title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",slug:"cortisol",date:"2026-06-29",summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",series:"健康生活",category:"健康生活",tags:["皮質醇","壓力","健康"],characters:["ChickenDad"],research:["皮質醇","壓力管理","臉部老化"],url:"articles/cortisol.html"},
    {id:"dragons-champion-20260629",title:"味全龍這一冠，屬於用心經營的球團！",slug:"dragons-champion",date:"2026-06-29",summary:"從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",series:"棒球觀察",category:"棒球故事",tags:["味全龍","棒球","養成"],characters:["ChickenDad"],research:["味全龍","棒球數據","球隊養成"],url:"articles/dragons-champion.html"}
  ];

  const seriesInfo = {
    "DoDo 成長日記": { emoji:"🐭", color:"#8DBFD8", intro:"視力、游泳、畢業與成長日常。這是一個孩子慢慢長大的紀錄。" },
    "B.Dragon 成長日記": { emoji:"🐲", color:"#8FBF72", intro:"車車、笑聲、第一次跟陌生人打招呼。世界對他來說，什麼都是新的。" },
    "ChickenDad 札記": { emoji:"🐔", color:"#A67C52", intro:"把蒐集、驗證、分析後的理解，放進生活，再整理成可以分享的故事。" },
    "健康生活": { emoji:"🌿", color:"#8FAF8B", intro:"身體訊號、壓力、睡眠、運動與照顧自己。" },
    "AI 生活實驗": { emoji:"🤖", color:"#263328", intro:"把工具放進生活裡，讓寫作、設計與工作變得更有趣。" },
    "棒球觀察": { emoji:"⚾", color:"#802424", intro:"勝負之外，還有養成、數據、教練團與球隊經營。" },
    "閱讀札記": { emoji:"📖", color:"#B7A3C9", intro:"漫畫、武俠、文學與人生思考。閱讀不是知道更多，而是理解更多。" },
    "生活研究室": { emoji:"🏡", color:"#D8C2A8", intro:"那些難以分類、卻很值得記錄的日常。" }
  };

  async function loadStories(){
    try{
      const res=await fetch("./data/stories.json?v=25",{cache:"no-store"});
      if(!res.ok) throw new Error("HTTP "+res.status);
      const data=await res.json();
      if(!Array.isArray(data)||data.length===0) throw new Error("empty data");
      return data;
    }catch(e){
      console.warn("series fallback", e);
      return fallbackStories;
    }
  }

  function fixUrl(url){ if(!url) return "#"; if(url.startsWith("./")) return url; if(url.startsWith("/")) return "."+url; return "./"+url; }
  function fmtDate(s){ const d=new Date(s+"T00:00:00"); if(Number.isNaN(d.getTime())) return s||""; return String(d.getMonth()+1).padStart(2,"0")+"/"+String(d.getDate()).padStart(2,"0"); }

  function groupBySeries(stories){
    const groups = {};
    stories.forEach(s=>{
      const key = s.series || "生活研究室";
      if(!groups[key]) groups[key] = [];
      groups[key].push(s);
    });
    Object.values(groups).forEach(list=>list.sort((a,b)=>new Date(b.date)-new Date(a.date)));
    return groups;
  }

  function tagsFor(list){
    const counts = {};
    list.forEach(s=>(s.tags||[]).forEach(t=>counts[t]=(counts[t]||0)+1));
    return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>x[0]);
  }

  function renderSeries(groups){
    const el=document.getElementById("series-grid");
    const count=document.getElementById("series-count");
    const names=Object.keys(groups).sort((a,b)=>groups[b].length-groups[a].length);
    if(count) count.textContent = `目前 ${names.length} 個系列，合計 ${Object.values(groups).reduce((sum,l)=>sum+l.length,0)} 篇故事。`;
    if(!el) return;
    if(names.length===0){ el.innerHTML='<div class="empty">目前還沒有系列。</div>'; return; }
    el.innerHTML = names.map(name=>{
      const list=groups[name];
      const info=seriesInfo[name] || {emoji:"🏡", color:"#A67C52", intro:"這個系列正在慢慢累積故事。"};
      const tags=tagsFor(list);
      return `<article class="series-card">
        <div class="series-art" style="background:linear-gradient(135deg,${info.color},#FFF7EC)">${info.emoji}</div>
        <div class="series-body">
          <div class="kicker">Series</div>
          <h2>${name}</h2>
          <div class="count">目前 ${list.length} 篇故事</div>
          <p class="muted">${info.intro}</p>
          <div class="tag-row">${tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
          <div class="story-list">${list.map(s=>`<a class="story-item" href="${fixUrl(s.url)}"><div class="date">${fmtDate(s.date)}</div><strong>${s.title}</strong><span class="readmore">閱讀 →</span></a>`).join("")}</div>
        </div>
      </article>`;
    }).join("");
  }

  function renderResearch(stories){
    const el=document.getElementById("research-grid");
    if(!el) return;
    const counts={};
    stories.forEach(s=>(s.research||[]).forEach(r=>counts[r]=(counts[r]||0)+1));
    let topics=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8);
    if(topics.length===0) topics=[["親子陪伴",1],["健康生活",1],["味全龍",1],["AI網站",1]];
    el.innerHTML=topics.map(([name,count])=>`<div class="research-card"><div class="kicker">Research</div><h3>${name}</h3><p class="muted">${count} 篇相關故事</p></div>`).join("");
  }

  loadStories().then(stories=>{
    stories.sort((a,b)=>new Date(b.date)-new Date(a.date));
    const groups=groupBySeries(stories);
    renderSeries(groups);
    renderResearch(stories);
  });
})();
