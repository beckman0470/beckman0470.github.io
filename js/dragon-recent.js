(() => {
  const key = 'cdj-dragon-recent-v1';
  const games = {
    cleanup: ['貓毛吸乾淨', '/play/cat-cleanup/'],
    jump: ['雅虎跳跳樂', '/play/?area=dodo&game=jump'],
    hide: ['貓咪躲貓貓', '/play/?area=dragon&game=classic-hide'],
  };
  const params = new URLSearchParams(location.search);
  const current = /^\/play\/cat-cleanup\/(?:index\.html)?$/.test(location.pathname)
    ? 'cleanup'
    : /^\/play\/(?:index\.html)?$/.test(location.pathname)
      ? { jump: 'jump', 'classic-hide': 'hide' }[params.get('game')]
      : undefined;
  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(saved)) return [...new Set(saved.filter(id => typeof id === 'string' && Object.hasOwn(games, id)))].slice(0, 3);
    } catch (_) {}
    return [];
  }
  if (current && !params.has('roomembed')) {
    try {
      localStorage.setItem(key, JSON.stringify([current, ...read().filter(id => id !== current)].slice(0, 3)));
    } catch (_) {}
  }
  const recent = document.getElementById('dragon-recent');
  if (!recent) return;
  function render() {
    const entries = read();
    const list = recent.querySelector('ul');
    list.replaceChildren(...entries.map(id => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      [link.textContent, link.href] = games[id];
      item.append(link);
      return item;
    }));
    recent.hidden = entries.length === 0;
  }
  render();
  window.addEventListener('pageshow', render);
})();
