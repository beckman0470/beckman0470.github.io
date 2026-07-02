(function(){
  const fallback = {
    nodes: [
      {id:"character:ChickenDad", label:"ChickenDad", type:"character", count:2},
      {id:"tag:陪伴", label:"陪伴", type:"tag", count:2}
    ],
    edges: []
  };

  async function loadGraph(){
    try{
      const res = await fetch("./data/knowledge-graph.json?v=521", {cache:"no-store"});
      if(!res.ok) throw new Error(res.status);
      const data = await res.json();
      if(!data.nodes) throw new Error("invalid graph");
      return data;
    }catch(e){
      console.warn("knowledge graph fallback", e);
      return fallback;
    }
  }

  function typeLabel(type){
    return {
      story:"文章",
      character:"人物",
      tag:"標籤",
      series:"系列",
      category:"分類",
      research:"研究"
    }[type] || type;
  }

  function renderStats(graph){
    const counts = {};
    graph.nodes.forEach(n=>counts[n.type]=(counts[n.type]||0)+1);
    document.getElementById("graph-stats").innerHTML = Object.entries(counts).map(([type,count])=>`
      <div class="stat"><span class="chip">${typeLabel(type)}</span><strong>${count}</strong></div>
    `).join("");
  }

  function neighbors(graph, nodeId){
    return graph.edges
      .filter(e=>e.source===nodeId || e.target===nodeId)
      .map(e=>{
        const otherId = e.source===nodeId ? e.target : e.source;
        const node = graph.nodes.find(n=>n.id===otherId);
        return {edge:e, node};
      })
      .filter(x=>x.node);
  }

  function renderList(graph){
    const list = document.getElementById("node-list");
    const sorted = graph.nodes.slice().sort((a,b)=>(b.count||0)-(a.count||0) || a.label.localeCompare(b.label,"zh-Hant"));
    list.innerHTML = sorted.map(n=>`
      <button class="node-btn" data-node="${n.id}">
        <span class="chip">${typeLabel(n.type)}</span>
        <strong>${n.label}</strong>
        <div class="muted">${n.count || 0} 次出現</div>
      </button>
    `).join("");

    document.querySelectorAll("[data-node]").forEach(btn=>{
      btn.addEventListener("click",()=>{
        document.querySelectorAll("[data-node]").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        renderDetails(graph, btn.dataset.node);
      });
    });
  }

  function renderDetails(graph, nodeId){
    const node = graph.nodes.find(n=>n.id===nodeId);
    const related = neighbors(graph, nodeId);
    const el = document.getElementById("node-details");
    if(!node){
      el.innerHTML = '<div class="empty">找不到節點。</div>';
      return;
    }
    el.innerHTML = `
      <span class="chip">${typeLabel(node.type)}</span>
      <h2>${node.label}</h2>
      <p class="muted">${node.summary || ""}</p>
      ${node.url ? `<p><a class="btn" href="./${node.url}">閱讀文章</a></p>` : ""}
      <div class="related-list">
        ${related.length ? related.map(({edge,node})=>`
          <a class="related-item" href="${node.url ? './'+node.url : '#'}">
            <span class="chip">${typeLabel(node.type)}</span>
            <strong>${node.label}</strong>
            <span class="muted">${edge.relation} · ${edge.weight}</span>
          </a>
        `).join("") : '<div class="empty">目前沒有關聯。</div>'}
      </div>
    `;
  }

  loadGraph().then(graph=>{
    renderStats(graph);
    renderList(graph);
  });
})();
