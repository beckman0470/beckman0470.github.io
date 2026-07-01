
(function(){
  const fallbackStories = [
    {title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",date:"2026-06-30",summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",series:"DoDo 成長日記",category:"家庭故事",tags:["視力","遠視","陪伴","健康"],characters:["ChickenDad","DoDo"],research:["兒童視力","遠視照護","家庭陪伴"],url:"articles/vision-care.html"},
    {title:"雞爸爸和鼠姊姊的半小時夏日約會",date:"2026-06-29",summary:"一個夏日午後，雞爸爸和 DoDo 在泳池邊完成一場短短半小時的夏日約會。",series:"DoDo 成長日記",category:"家庭故事",tags:["游泳","陪伴","成長"],characters:["ChickenDad","DoDo"],research:["親子陪伴","夏日游泳","成長紀錄"],url:"articles/swimming.html"},
    {title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",date:"2026-06-29",summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",series:"健康生活",category:"健康生活",tags:["皮質醇","壓力","健康"],characters:["ChickenDad"],research:["皮質醇","壓力管理","臉部老化"],url:"articles/cortisol.html"},
    {title:"味全龍這一冠，屬於用心經營的球團！",date:"2026-06-29",summary:"從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",series:"棒球觀察",category:"棒球故事",tags:["味全龍","棒球","養成"],characters:["ChickenDad"],research:["味全龍","棒球數據","球隊養成"],url:"articles/dragons-champion.html"}
  ];

  let stories = [];

  function fixUrl(url){
    if(!url) return "#";
    if(url.startsWith("./")) return url;
    if(url.startsWith("/")) return "." + url;
    return "./" + url;
  }

  function coverClass(s){
    const text = ((s.category||"")+" "+(s.tags||[]).join(" ")+" "+(s.series||""));
    if(text.includes("健康") || text.includes("皮質醇")) return "health";
    if(text.includes("棒球") || text.includes("味全")) return "baseball";
    if(text.includes("AI")) return "ai";
    if(text.includes("閱讀")) return "reading";
    if(text.includes("DoDo") || text.includes("視力") || text.includes("游泳")) return "dodo";
    return "";
  }

  async function loadStories(){
    try{
      const res = await fetch("./data/stories.json?v=32", {cache:"no-store"});
      if(!res.ok) throw new Error("HTTP "+res.status);
      const data = await res.json();
      if(!Array.isArray(data) || data.length === 0) throw new Error("empty");
      return data;
    }catch(e){
      console.warn("search fallback", e);
      return fallbackStories;
    }
  }

  function haystack(s){
    return [
      s.title, s.summary, s.series, s.category,
      ...(s.tags || []),
      ...(s.characters || []),
      ...(s.research || [])
    ].join(" ").toLowerCase();
  }

  function card(s){
    return `<a class="result-card" href="${fixUrl(s.url)}">
      <div class="result-cover ${coverClass(s)}"></div>
      <div class="card-body">
        <span class="chip">${s.category || "故事"}</span>
        <h3>${s.title}</h3>
        <p class="muted">${s.summary || ""}</p>
        <p class="muted">${s.series || ""}｜${s.date || ""}</p>
        <span class="readmore">閱讀 →</span>
      </div>
    </a>`;
  }

  function render(query){
    const grid = document.getElementById("result-grid");
    const count = document.getElementById("result-count");
    const q = (query || "").trim().toLowerCase();

    if(!q){
      const latest = stories.slice(0, 6);
      count.textContent = `目前顯示最新 ${latest.length} 篇故事。`;
      grid.innerHTML = latest.map(card).join("");
      return;
    }

    const tokens = q.split(/\s+/).filter(Boolean);
    const results = stories.filter(s => {
      const h = haystack(s);
      return tokens.every(t => h.includes(t));
    });

    count.textContent = `「${query}」找到 ${results.length} 篇故事。`;
    grid.innerHTML = results.length ? results.map(card).join("") : '<div class="empty">沒有找到符合條件的故事。可以試試「DoDo」「健康」「味全龍」「皮質醇」。</div>';
  }

  loadStories().then(data => {
    stories = data.sort((a,b)=>new Date(b.date)-new Date(a.date));
    const input = document.getElementById("site-search");
    render("");
    input.addEventListener("input", () => render(input.value));

    document.querySelectorAll("[data-query]").forEach(btn => {
      btn.addEventListener("click", () => {
        input.value = btn.dataset.query;
        render(input.value);
      });
    });
  });
})();
