(() => {
  const guide = document.getElementById('game-categories');
  if (!guide) return;
  const input = guide.querySelector('#game-search');
  const category = guide.querySelector('#game-category');
  const audience = guide.querySelector('#game-audience-select');
  const picture = guide.querySelector('#game-picture-only');
  const result = guide.querySelector('#game-find-results');
  const more = guide.querySelector('#game-show-more');
  const cards = [...guide.querySelectorAll('.filtered-game-grid > li')];
  const key = 'cdj-game-finder-return';
  const params = new URLSearchParams(location.search);
  const step = 12;
  let limit = Math.min(cards.length, Math.max(step, Number(params.get('shown')) || step));
  const normalize = text => text.normalize('NFKC').toLowerCase().trim();

  function syncHash() {
    const cat = /^#game-cat-(life|puzzle|sport|strategy|other)$/.exec(location.hash);
    if (cat) category.value = cat[1];
    if (location.hash === '#kids-games' || location.hash === '#dragon-games') audience.value = 'kids';
    if (location.hash === '#adult-games') audience.value = 'adult';
  }
  input.value = params.get('gameq') || '';
  picture.checked = params.get('picture') === '1';
  syncHash();
  if (params.has('gamecat')) category.value = params.get('gamecat');
  if (params.has('audience')) audience.value = params.get('audience');

  function apply(update) {
    const term = normalize(input.value);
    let count = 0;
    for (const card of cards) {
      const match = (!category.value || card.dataset.category === category.value)
        && (!audience.value || card.dataset.audience.split(' ').includes(audience.value))
        && (!picture.checked || card.dataset.gameHint?.startsWith('看圖可玩'))
        && normalize(card.querySelector('strong').textContent).includes(term);
      card.hidden = !match || ++count > limit;
    }
    result.textContent = count ? '找到 ' + count + ' 款遊戲' : '找不到符合的遊戲，試試其他條件。';
    more.hidden = count <= limit;
    if (!update) return;
    const url = new URL(location.href);
    for (const [name, value] of [
      ['gameq', input.value.trim()], ['gamecat', category.value],
      ['audience', audience.value], ['picture', picture.checked ? '1' : ''],
      ['shown', limit > step ? String(limit) : '']
    ]) {
      if (value) url.searchParams.set(name, value);
      else url.searchParams.delete(name);
    }
    if (/^#(?:game-cat-|kids-games$|adult-games$|dragon-games$)/.test(url.hash)) url.hash = 'game-categories';
    history.replaceState(history.state, '', url);
  }

  const filter = () => { limit = step; apply(true); };
  input.addEventListener('input', filter);
  for (const field of [category, audience, picture]) field.addEventListener('change', filter);
  more.addEventListener('click', () => {
    const firstNewIndex = limit;
    limit += step;
    apply(true);
    cards.filter(card => !card.hidden)[firstNewIndex]?.querySelector('a')?.focus();
  });
  window.addEventListener('hashchange', () => { syncHash(); filter(); });
  if (/^#(?:game-cat-|kids-games$|adult-games$)/.test(location.hash)) {
    requestAnimationFrame(() => guide.scrollIntoView({block:'start'}));
  }
  guide.addEventListener('click', event => {
    const link = event.target.closest('.filtered-game-card');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    try {
      sessionStorage.setItem(key, JSON.stringify({
        source: location.pathname + location.search + location.hash,
        target: link.pathname + link.search,
        y: window.scrollY
      }));
    } catch (_) {}
  });
  apply(false);
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) || 'null');
    if (saved?.source === location.pathname + location.search + location.hash) {
      sessionStorage.removeItem(key);
      requestAnimationFrame(() => window.scrollTo(0, saved.y));
    }
  } catch (_) {}
})();
