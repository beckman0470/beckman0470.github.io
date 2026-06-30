
async function loadArticles() {
  const res = await fetch('/data/articles.json?v=9');
  return await res.json();
}
function articleCard(a) {
  return `<a class="article-card" href="${a.url}">
    <div class="cover" style="background-image:url('${a.cover}')"></div>
    <div class="card-body">
      <span class="tag">${a.category}</span>
      <h3>${a.title}</h3>
      <p class="muted">${a.summary}</p>
      <span class="readmore">在本站閱讀 →</span>
    </div>
  </a>`;
}
function listCard(a) {
  return `<a class="list-card" href="${a.url}">
    <div class="list-thumb" style="background-image:url('${a.cover}')"></div>
    <div>
      <span class="tag">${a.category}</span>
      <h3>${a.title}</h3>
      <p class="muted">${a.summary}</p>
      <p class="muted">${a.date}｜${a.readingTime}</p>
      <span class="readmore">在本站閱讀 →</span>
    </div>
  </a>`;
}
async function renderHome() {
  const el = document.querySelector('[data-featured-articles]');
  if (!el) return;
  const articles = await loadArticles();
  el.innerHTML = articles.filter(a => a.featured).slice(0, 3).map(articleCard).join('');
}
async function renderList() {
  const el = document.querySelector('[data-article-list]');
  const input = document.querySelector('[data-search]');
  if (!el) return;
  const articles = await loadArticles();
  function render(q='') {
    const query = q.trim().toLowerCase();
    const filtered = articles.filter(a => {
      const hay = `${a.title} ${a.category} ${a.summary} ${(a.tags||[]).join(' ')}`.toLowerCase();
      return hay.includes(query);
    });
    el.innerHTML = filtered.map(listCard).join('') || '<p class="muted">找不到符合的文章。</p>';
  }
  render();
  if (input) input.addEventListener('input', e => render(e.target.value));
}
renderHome();
renderList();
