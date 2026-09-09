// data/articles.json is the public catalogue; HTML values are generated fallbacks.
(() => {
  async function sync() {
    try {
      const response = await fetch('data/articles.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const articles = await response.json();
      if (!Array.isArray(articles)) throw new Error('Invalid article catalogue');
      const published = articles.filter(a => !a.status || a.status === 'published');
      published.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      document.querySelectorAll('[data-journal-count]').forEach(el => {
        el.textContent = published.filter(a => a.category === el.dataset.journalCount).length + ' 篇文章';
      });
      document.querySelectorAll('[data-total-count]').forEach(el => {
        el.textContent = published.length;
      });
      document.querySelectorAll('[data-latest-article]').forEach(el => {
        const latest = published[0];
        if (!latest) { el.href = 'articles.html'; return; }
        const url = new URL(latest.url, location.href);
        if (!['http:', 'https:'].includes(url.protocol)) return;
        el.href = url.href;
        el.title = latest.title;
      });
    } catch (error) {
      console.warn('文章摘要暫時使用上次發布的資料。', error);
    }
  }
  sync();
})();
