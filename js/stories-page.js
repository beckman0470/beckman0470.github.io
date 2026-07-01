
(function(){
  let allStories=[]; let activeCategory="all"; let query="";
  const fallbackStories=[
    {title:"從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",date:"2026-06-30",summary:"記錄我們陪孩子面對先天遠視的荒野與希望。",series:"DoDo 成長日記",category:"家庭故事",tags:["視力","遠視"],characters:["ChickenDad","DoDo"],url:"articles/vision-care.html"},
    {title:"雞爸爸和鼠姊姊的半小時夏日約會",date:"2026-06-29",summary:"短短半小時，也能成為很久以後還記得的回憶。",series:"DoDo 成長日記",category:"家庭故事",featured:true,hero:true,tags:["游泳","陪伴"],characters:["ChickenDad","DoDo"],url:"articles/swimming.html"},
    {title:"壓力正壓垮你的臉：從皮質醇到下垂臉的真相",date:"2026-06-29",summary:"皮質醇不是壞人，但長期壓力會讓身體失去修復節奏。",series:"健康生活",category:"健康生活",tags:["皮質醇"],characters:["ChickenDad"],url:"articles/cortisol.html"},
    {title:"味全龍這一冠，屬於用心經營的球團！",date:"2026-06-29",summary:"從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",series:"棒球觀察",category:"棒球故事",tags:["味全龍"],characters:["ChickenDad"],url:"articles/dragons-champion.html"}
  ];
  function fixUrl(u){return u?("./"+u.replace(/^\\.\\//,"")):"#"} function coverClass(s){const t=((s.category||"")+" "+(s.tags||[]).join(" "));if(t.includes("健康"))return"health";if(t.includes("棒球"))return"baseball";if(t.includes("AI"))return"ai";if(t.includes("閱讀"))return"reading";if(t.includes("視力")||t.includes("游泳"))return"dodo";return""}
  async function load(){try{const r=await fetch("./data/stories.json?v=30",{cache:"no-store"});if(!r.ok)throw Error(r.status);const d=await r.json();return d.length?d:fallbackStories}catch(e){return fallbackStories}}
  function card(s){return`<a class="story-card" href="${fixUrl(s.url)}"><div class="story-cover ${coverClass(s)}"></div><div class="card-body"><span class="chip">${s.category||"故事"}</span><h3>${s.title}</h3><p class="muted">${s.summary||""}</p><p class="muted">${s.series||""}｜${s.date||""}</p><span class="readmore">閱讀 →</span></div></a>`}
  function match(s){const cat=activeCategory==="all"||s.category===activeCategory;const q=query.trim().toLowerCase();if(!q)return cat;return cat&&[s.title,s.summary,s.series,s.category,...(s.tags||[]),...(s.characters||[])].join(" ").toLowerCase().includes(q)}
  function render(){const list=allStories.filter(match);document.getElementById("story-count").textContent=`目前顯示 ${list.length} 篇故事。`;document.getElementById("story-grid").innerHTML=list.length?list.map(card).join(""):'<div class="empty">沒有符合條件的故事。</div>'}
  function featured(){const s=allStories.find(x=>x.hero)||allStories.find(x=>x.featured)||allStories[0];if(!s)return;document.getElementById("featured-story").innerHTML=`<div class="feature-art"><h2>${s.category||"故事"}</h2><p>${s.series||""}</p></div><div class="feature-copy"><span class="chip">${s.series||""}</span><h2>${s.title}</h2><p class="muted">${s.summary||""}</p><a class="btn" href="${fixUrl(s.url)}">閱讀故事</a></div>`}
  load().then(d=>{allStories=d.sort((a,b)=>new Date(b.date)-new Date(a.date));featured();render();document.querySelectorAll("[data-category]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-category]").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCategory=b.dataset.category;render()});document.getElementById("story-search").oninput=e=>{query=e.target.value;render()};});
})();
