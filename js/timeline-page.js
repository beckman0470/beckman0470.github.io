
(function(){
  const fallbackStories = [
    {title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",date:"2026-06-30",summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",series:"DoDo 成長日記",category:"家庭故事",url:"articles/vision-care.html"},
    {title:"雞爸爸和鼠姊姊的半小時夏日約會",date:"2026-06-29",summary:"一個夏日午後，雞爸爸和 DoDo 在泳池邊完成一場短短半小時的夏日約會。",series:"DoDo 成長日記",category:"家庭故事",url:"articles/swimming.html"},
    {title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",date:"2026-06-29",summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",series:"健康生活",category:"健康生活",url:"articles/cortisol.html"},
    {title:"味全龍這一冠，屬於用心經營的球團！",date:"2026-06-29",summary:"從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",series:"棒球觀察",category:"棒球故事",url:"articles/dragons-champion.html"}
  ];

  async function loadStories(){
    try{
      const res = await fetch("./data/stories.json?v=42", {cache:"no-store"});
      if(!res.ok) throw new Error("HTTP "+res.status);
      const data = await res.json();
      if(!Array.isArray(data) || !data.length) throw new Error("empty");
      return data;
    }catch(e){
      console.warn("timeline fallback", e);
      return fallbackStories;
    }
  }

  function fixUrl(url){
    if(!url) return "#";
    if(url.startsWith("./")) return url;
    if(url.startsWith("/")) return "." + url;
    return "./" + url;
  }

  function group(stories){
    const grouped = {};
    stories.forEach(s=>{
      const date = s.date || "unknown";
      const y = date.slice(0,4) || "unknown";
      const m = date.slice(5,7) || "unknown";
      if(!grouped[y]) grouped[y] = {};
      if(!grouped[y][m]) grouped[y][m] = [];
      grouped[y][m].push(s);
    });
    return grouped;
  }

  function day(date){
    return date && date.length >= 10 ? date.slice(8,10) : "--";
  }

  function render(stories){
    const root = document.getElementById("timeline-root");
    const grouped = group(stories.sort((a,b)=>new Date(b.date)-new Date(a.date)));
    const years = Object.keys(grouped).sort((a,b)=>b.localeCompare(a));
    if(!years.length){
      root.innerHTML = '<div class="empty">目前沒有故事。</div>';
      return;
    }

    root.innerHTML = years.map(year=>{
      const months = Object.keys(grouped[year]).sort((a,b)=>b.localeCompare(a));
      return `<section class="year-block">
        <h2 class="year-title">${year}</h2>
        ${months.map(month=>{
          const list = grouped[year][month].sort((a,b)=>new Date(b.date)-new Date(a.date));
          return `<article class="month-block">
            <div class="month-head"><h2>${month} 月</h2><div class="month-count">${list.length} 篇故事</div></div>
            <div class="story-list">
              ${list.map(s=>`<a class="timeline-item" href="${fixUrl(s.url)}">
                <div class="day">${day(s.date)}</div>
                <div><span class="chip">${s.series || s.category || "故事"}</span><h3>${s.title}</h3><p class="muted">${s.summary || ""}</p></div>
                <span class="readmore">閱讀 →</span>
              </a>`).join("")}
            </div>
          </article>`;
        }).join("")}
      </section>`;
    }).join("");
  }

  loadStories().then(render);
})();
