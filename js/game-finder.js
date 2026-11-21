(() => {
  const guide = document.getElementById('game-categories');
  if (!guide) return;
  const input = guide.querySelector('#game-search');
  const picker = guide.querySelector('#game-category');
  const picture = guide.querySelector('#game-picture-only');
  const result = guide.querySelector('#game-find-results');
  const groups = [...guide.querySelectorAll('details')];
  const key = 'cdj-game-finder-return';
  const params = new URLSearchParams(location.search);
  input.value = params.get('gameq') || '';
  picture.checked = params.get('picture') === '1';
  const fromHash = () => /^#game-cat-(life|puzzle|sport|strategy|other)$/.exec(location.hash)?.[1] || '';
  picker.value = params.get('gamecat') || fromHash();
  const normalize = text => text.normalize('NFKC').toLowerCase().trim();

  function apply(update) {
    const term = normalize(input.value);
    const category = picker.value;
    let count = 0;
    for (const group of groups) {
      let matches = 0;
      const allowed = !category || group.id === 'game-cat-' + category;
      for (const item of group.querySelectorAll('li')) {
        item.hidden = !normalize(item.querySelector('a').textContent).includes(term) || (picture.checked && !item.dataset.gameHint?.startsWith('看圖可玩'));
        if (!item.hidden) matches++;
      }
      group.hidden = !allowed || !matches;
      if (update || term || category || picture.checked) group.open = !group.hidden && (Boolean(term) || Boolean(category) || picture.checked);
      if (allowed) count += matches;
    }
    result.hidden = false;
    result.textContent = count ? '找到 ' + count + ' 款遊戲' : '找不到符合的遊戲，換個名稱試試。';
    if (update) {
      const url = new URL(location.href);
      for (const [name, value] of [['gameq', input.value.trim()], ['gamecat', category], ['picture', picture.checked ? '1' : '']]) {
        if (value) url.searchParams.set(name, value);
        else url.searchParams.delete(name);
      }
      if (fromHash()) url.hash = category ? 'game-cat-' + category : 'game-categories';
      history.replaceState(history.state, '', url);
    }
  }
  input.addEventListener('input', () => apply(true));
  picker.addEventListener('change', () => apply(true));
  picture.addEventListener('change', () => apply(true));
  window.addEventListener('hashchange', () => {
    if (!fromHash()) return;
    picker.value = fromHash();
    apply(true);
  });
  guide.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const url = new URL(location.href);
    const group = link.closest('details');
    if (group && !input.value.trim()) url.hash = group.id;
    if (url.href !== location.href) history.replaceState(history.state, '', url);
    try {
      sessionStorage.setItem(key, JSON.stringify({
        source: url.pathname + url.search + url.hash,
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
