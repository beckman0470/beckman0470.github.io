
(function(){
  const fallbackStories = [
    {id:"vision-care-20260630",title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",slug:"vision-care",date:"2026-06-30",summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",series:"DoDo 成長日記",category:"家庭故事",featured:false,hero:false,tags:["視力","遠視","陪伴"],characters:["ChickenDad","DoDo"],research:["兒童視力","遠視照護","家庭陪伴"],url:"articles/vision-care.html"},
    {id:"swimming-20260629",title:"雞爸爸和鼠姊姊的半小時夏日約會",slug:"swimming",date:"2026-06-29",summary:"一個夏日午後，雞爸爸和 DoDo 在泳池邊完成一場短短半小時的夏日約會。",series:"DoDo 成長日記",category:"家庭故事",featured:true,hero:true,tags:["游泳","陪伴","成長"],characters:["ChickenDad","DoDo"],research:["親子陪伴","夏日游泳","成長紀錄"],url:"articles/swimming.html"},
    {id:"cortisol-20260629",title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",slug:"cortisol",date:"2026-06-29",summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",series:"ChickenDad 札記",category:"健康生活",featured:false,hero:false,tags:["皮質醇","壓力","健康"],characters:["ChickenDad"],research:["皮質醇","壓力管理","臉部老化"],url:"articles/cortisol.html"},
    {id:"dragons-champion-20260629",title:"味全龍這一冠，屬於用心經營的球團！",slug:"dragons-champion",date:"2026-06-29",summary:"從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",series:"棒球觀察",category:"棒球故事",featured:false,hero:false,tags:["味全龍","棒球","養成"],characters:["ChickenDad"],research:["味全龍","棒球數據","球隊養成"],url:"articles/dragons-champion.html"}
  ];
  let allStories = [];
  let activeCategory = "all";
  let query = "";

  function fixUrl(url){ if(!url) return "#"; if(url.startsWith("./")) return url; if(url.startsWith("/")) return "."+url; return "./"+url; }
  function coverClass(s){ const text=((s.category||"")+" "+(s.tags||[]).join(" ")+" "+(s.series||"")); if(text.includes("健康")||text.includes("皮質醇")) return "health"; if(text.includes("棒球")||text.includes("味全")) return "baseball"; if(text.includes("AI")) return "ai"; if(text.includes("閱讀")) return "reading"; if(text.includes("DoDo")||text.includes("視力")||text.includes("游泳")) return "dodo"; return ""; }

  async function loadStories(){
    try{
      const res=await fetch("./data/stories.json?v=24",{cache:"no-store"});
      if(!res.ok) throw new Error("HTTP "+res.status);
      const data=await res.json();
      if(!Array.isArray(data)||data.length===0) throw new Error("empty data");
      return data;
    }catch(e){
      console.warn("stories fallback", e);
      return fallbackStories;
    }
  }

  function renderFeatured(stories){
    const el=document.getElementById("featured-story");
    if(!el) return;
    const story=stories.find(s=>s.hero)||stories.find(s=>s.featured)||stories[0];
    if(!story){ el.innerHTML='<div class="empty">目前沒有推薦故事。</div>'; return; }
    el.innerHTML=`<div class="feature-art"><h2>${story.category||"故事"}</h2><p>${story.series||"Chicken Dad Journal"}</p></div><div class="feature-copy"><span class="chip">${story.series||story.category||"故事"}</span><h2>${story.title}</h2><p class="muted">${story.summary||""}</p><p class="muted">${story.date||""}</p><a class="btn" href="${fixUrl(story.url)}">閱讀故事</a></div>`;
  }

  function storyCard(s){
    return `<a class="story-card" href="${fixUrl(s.url)}"><div class="story-cover ${coverClass(s)}"></div><div class="card-body"><span class="chip">${s.category||"故事"}</span><h3>${s.title}</h3><p class="muted">${s.summary||""}</p><p class="muted">${s.series||""}｜${s.date||""}</p><span class="readmore">閱讀 →</span></div></a>`;
  }

  function matchStory(s){
    const catOk = activeCategory === "all" || (s.category === activeCategory);
    const q = query.trim().toLowerCase();
    if(!q) return catOk;
    const hay = [s.title,s.summary,s.series,s.category,...(s.tags||[]),...(s.characters||[]),...(s.research||[])].join(" ").toLowerCase();
    return catOk && hay.includes(q);
  }

  function renderGrid(){
    const el=document.getElementById("story-grid");
    const count=document.getElementById("story-count");
    const list=allStories.filter(matchStory);
    if(count) count.textContent = `目前顯示 ${list.length} 篇故事。`;
    if(!el) return;
    el.innerHTML = list.length ? list.map(storyCard).join("") : '<div class="empty">沒有符合條件的故事。</div>';
  }

  function bindUI(){
    document.querySelectorAll("[data-category]").forEach(btn=>{
      btn.addEventListener("click",()=>{
        document.querySelectorAll("[data-category]").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory=btn.dataset.category;
        renderGrid();
      });
    });
    const input=document.getElementById("story-search");
    if(input){
      input.addEventListener("input",()=>{
        query=input.value;
        renderGrid();
      });
    }
  }

  loadStories().then(stories=>{
    allStories = stories.sort((a,b)=>new Date(b.date)-new Date(a.date));
    renderFeatured(allStories);
    renderGrid();
    bindUI();
  });
})();
