
(function(){
  async function loadJSON(path, fallback){
    try{
      const res = await fetch(path + "?v=50s4", {cache:"no-store"});
      if(!res.ok) throw new Error(res.status);
      return await res.json();
    }catch(e){
      console.warn("fallback", path, e);
      return fallback;
    }
  }

  const fallbackStories = [
    {title:"雞爸爸和鼠姊姊的半小時夏日約會",date:"2026-06-29",series:"DoDo 成長日記",category:"家庭故事",tags:["游泳","陪伴"],characters:["ChickenDad","DoDo"],url:"articles/swimming.html",summary:"一個夏日午後的家庭故事。"},
    {title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",date:"2026-06-29",series:"健康生活",category:"健康生活",tags:["皮質醇","健康"],characters:["ChickenDad"],url:"articles/cortisol.html",summary:"壓力與健康紀錄。"}
  ];

  function countBy(stories, getter){
    const counts = {};
    stories.forEach(s=>{
      const values = getter(s);
      (Array.isArray(values) ? values : [values]).filter(Boolean).forEach(v=>counts[v]=(counts[v]||0)+1);
    });
    return Object.entries(counts).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0],"zh-Hant"));
  }

  function statCard(label, value, note){
    return `<div class="card"><div class="kicker">${label}</div><div class="stat">${value}</div><p class="muted">${note||""}</p></div>`;
  }

  function renderStats(stories, inventory){
    const tags = countBy(stories, s=>s.tags||[]);
    const series = countBy(stories, s=>s.series||"未分類");
    const characters = countBy(stories, s=>s.characters||[]);
    const drafts = (inventory||[]).filter(x=>x.status==="draft").length;
    document.getElementById("stats-grid").innerHTML = [
      statCard("Stories", stories.length, "已建立故事"),
      statCard("Series", series.length, "系列數"),
      statCard("Tags", tags.length, "標籤數"),
      statCard("Drafts", drafts, "草稿數")
    ].join("");
  }

  function renderLatest(stories){
    const list = document.getElementById("latest-list");
    list.innerHTML = stories.slice(0,6).map(s=>`
      <a class="item" href="./${s.url}">
        <span class="chip">${s.date||""}</span>
        <strong>${s.title}</strong>
        <span class="muted">${s.series||""}</span>
      </a>
    `).join("") || '<div class="empty">尚無文章</div>';
  }

  function renderTags(stories){
    const tags = countBy(stories, s=>s.tags||[]).slice(0,8);
    const max = Math.max(...tags.map(x=>x[1]),1);
    document.getElementById("tag-list").innerHTML = tags.map(([name,count])=>`
      <div class="item">
        <span class="chip">${count}</span>
        <strong>${name}</strong>
        <div class="bar"><span style="width:${Math.round(count/max*100)}%"></span></div>
      </div>
    `).join("") || '<div class="empty">尚無標籤</div>';
  }

  function renderSeries(stories){
    const series = countBy(stories, s=>s.series||"未分類").slice(0,8);
    const max = Math.max(...series.map(x=>x[1]),1);
    document.getElementById("series-list").innerHTML = series.map(([name,count])=>`
      <div class="item">
        <span class="chip">${count}</span>
        <strong>${name}</strong>
        <div class="bar"><span style="width:${Math.round(count/max*100)}%"></span></div>
      </div>
    `).join("") || '<div class="empty">尚無系列</div>';
  }

  function renderQuality(stories, inventory){
    const noSummary = stories.filter(s=>!s.summary).length;
    const noTags = stories.filter(s=>!(s.tags||[]).length).length;
    const noCharacters = stories.filter(s=>!(s.characters||[]).length).length;
    const invCount = inventory ? inventory.length : 0;
    document.getElementById("quality-list").innerHTML = `
      <div class="item"><span class="chip">${noSummary}</span><strong>缺摘要</strong><span class="muted">summary</span></div>
      <div class="item"><span class="chip">${noTags}</span><strong>缺標籤</strong><span class="muted">tags</span></div>
      <div class="item"><span class="chip">${noCharacters}</span><strong>缺角色</strong><span class="muted">characters</span></div>
      <div class="item"><span class="chip">${invCount}</span><strong>Studio Inventory</strong><span class="muted">content-inventory</span></div>
    `;
  }

  Promise.all([
    loadJSON("./data/stories.json", fallbackStories),
    loadJSON("./data/content-inventory.json", [])
  ]).then(([stories, inventory])=>{
    stories.sort((a,b)=>new Date(b.date)-new Date(a.date));
    renderStats(stories, inventory);
    renderLatest(stories);
    renderTags(stories);
    renderSeries(stories);
    renderQuality(stories, inventory);
  });
})();
