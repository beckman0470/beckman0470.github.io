(function(){
  const fallbackStories = [
    {
      title:"雞爸爸和鼠姊姊的半小時夏日約會",
      date:"2026-06-29",
      summary:"一個夏日午後，雞爸爸和鼠姊姊在泳池邊完成一場短短半小時的夏日約會。",
      series:"DoDo 成長日記",
      category:"家庭故事",
      tags:["游泳","陪伴","家庭"],
      url:"articles/swimming.html"
    },
    {
      title:"從心疼、戴鏡到全人調理",
      date:"2026-06-30",
      summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",
      series:"DoDo 成長日記",
      category:"家庭故事",
      tags:["視力","健康","陪伴"],
      url:"articles/vision-care.html"
    },
    {
      title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",
      date:"2026-06-29",
      summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",
      series:"健康生活",
      category:"健康生活",
      tags:["皮質醇","壓力","健康"],
      url:"articles/cortisol.html"
    }
  ];

  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  async function loadStories(){
    try{
      const r = await fetch("./data/stories.json?v=hotfix54", {cache:"no-store"});
      if(!r.ok) throw new Error(r.status);
      const data = await r.json();
      if(!Array.isArray(data) || !data.length) throw new Error("empty");
      return data;
    }catch(e){
      console.warn("homepage hotfix fallback", e);
      return fallbackStories;
    }
  }

  function fixUrl(url){
    if(!url) return "#";
    if(url.startsWith("./")) return url;
    if(url.startsWith("/")) return "." + url;
    return "./" + url;
  }

  function card(story){
    return `<a class="hotfix-card story-card" href="${fixUrl(story.url)}">
      <div class="hotfix-cover story-cover"></div>
      <div class="hotfix-card-body card-body">
        <span class="hotfix-chip chip">${story.category || story.series || "故事"}</span>
        <h3>${story.title || ""}</h3>
        <p class="hotfix-muted muted">${story.summary || ""}</p>
      </div>
    </a>`;
  }

  function row(story){
    return `<a class="latest-row" href="${fixUrl(story.url)}">
      <span class="date">${story.date || ""}</span>
      <strong>${story.title || ""}</strong>
      <span class="muted">${story.series || story.category || ""}</span>
    </a>`;
  }

  function isStillLoading(el){
    if(!el) return false;
    const text = (el.textContent || "").trim();
    return !text || text.includes("載入") || text.toLowerCase().includes("loading");
  }

  function fillFirstExisting(ids, html, className){
    ids.forEach(id=>{
      const el = document.querySelector(id);
      if(isStillLoading(el)){
        if(className) el.classList.add(className);
        el.innerHTML = html;
      }
    });
  }

  function fixNavSpacing(){
    document.querySelectorAll(".nav-links a").forEach(a=>{
      a.style.marginRight = a.style.marginRight || "0";
      a.style.whiteSpace = "nowrap";
    });
  }

  function run(stories){
    stories.sort((a,b)=>new Date(b.date || 0)-new Date(a.date || 0));
    const cards = stories.slice(0,3).map(card).join("");
    const rows = stories.slice(0,5).map(row).join("");

    fillFirstExisting(["#latest-stories","#latest-list","#latest","#recent-stories"], rows || cards);
    fillFirstExisting(["#story-grid","#stories-grid","#stories-list"], cards, "hotfix-card-grid");
    fillFirstExisting(["#family-cards","#family-grid"], cards, "hotfix-card-grid");
    fillFirstExisting(["#series-grid","#series-list"], cards, "hotfix-card-grid");
    fillFirstExisting(["#cover-story","#featured-story"], cards);

    document.querySelectorAll("[data-loading], .loading").forEach(el=>{
      if(isStillLoading(el)){
        el.innerHTML = cards;
      }
    });

    fixNavSpacing();
  }

  ready(()=>loadStories().then(run));
})();
