(function(){
  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function slugify(text, index){
    return "section-" + index + "-" + text.trim().toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function buildProgress(){
    const bar = document.createElement("div");
    bar.className = "reading-progress";
    document.body.appendChild(bar);

    function update(){
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      bar.style.width = progress + "%";
    }

    window.addEventListener("scroll", update, {passive:true});
    window.addEventListener("resize", update);
    update();
  }

  function buildTools(){
    const article = document.querySelector(".article-reading, .article-body");
    if(!article) return;

    const tools = document.createElement("div");
    tools.className = "reader-tools";
    tools.innerHTML = `
      <button class="reader-tool-btn" data-reader-action="toc">目錄</button>
      <button class="reader-tool-btn" data-reader-action="font-plus">字大一點</button>
      <button class="reader-tool-btn" data-reader-action="font-minus">字小一點</button>
      <button class="reader-tool-btn" data-reader-action="dark">深色閱讀</button>
    `;
    article.parentNode.insertBefore(tools, article);

    let scale = 1;
    tools.addEventListener("click", function(e){
      const btn = e.target.closest("[data-reader-action]");
      if(!btn) return;
      const action = btn.dataset.readerAction;

      if(action === "font-plus"){
        scale = Math.min(1.22, scale + 0.06);
        article.style.fontSize = scale + "em";
      }

      if(action === "font-minus"){
        scale = Math.max(0.9, scale - 0.06);
        article.style.fontSize = scale + "em";
      }

      if(action === "dark"){
        document.body.classList.toggle("reader-dark");
      }

      if(action === "toc"){
        const toc = document.querySelector(".reader-toc");
        if(toc) toc.scrollIntoView({behavior:"smooth", block:"center"});
      }
    });
  }

  function buildToc(){
    const article = document.querySelector(".article-reading, .article-body");
    if(!article) return;

    const headings = Array.from(article.querySelectorAll("h2, h3"));
    if(headings.length < 2) return;

    headings.forEach((h, i)=>{
      if(!h.id) h.id = slugify(h.textContent, i);
    });

    const toc = document.createElement("nav");
    toc.className = "reader-toc";
    toc.innerHTML = `
      <h2>文章目錄</h2>
      <ol>
        ${headings.map(h=>`<li><a href="#${h.id}">${h.textContent}</a></li>`).join("")}
      </ol>
    `;

    const tools = document.querySelector(".reader-tools");
    if(tools) tools.parentNode.insertBefore(toc, tools.nextSibling);
    else article.parentNode.insertBefore(toc, article);
  }

  function buildBackToTop(){
    const btn = document.createElement("button");
    btn.className = "reader-tool-btn back-to-top";
    btn.textContent = "↑";
    btn.setAttribute("aria-label", "回到頂端");
    document.body.appendChild(btn);

    btn.addEventListener("click", ()=>{
      window.scrollTo({top:0, behavior:"smooth"});
    });

    function update(){
      if(window.scrollY > 520) btn.classList.add("visible");
      else btn.classList.remove("visible");
    }

    window.addEventListener("scroll", update, {passive:true});
    update();
  }

  ready(function(){
    buildProgress();
    buildTools();
    buildToc();
    buildBackToTop();
  });
})();
