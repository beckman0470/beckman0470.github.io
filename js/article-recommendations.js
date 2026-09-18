/* Public catalogue only. No age cutoff, publishing, or social scheduling. */
(() => {
  'use strict';
  const normal = value => String(value || '').normalize('NFKC').trim().toLowerCase();
  const values = value => [...new Set((Array.isArray(value) ? value : [value]).map(normal).filter(Boolean))];
  const series = article => values([article.series, article.seriesTitle]);
  const sameSeries = (a, b) => series(a).some(s => series(b).includes(s));
  const newest = (a, b) => String(b.date || '').localeCompare(String(a.date || ''));
  const generic = new Set(values(['雞爸爸生活研究室', '雞爸爸ChickenDad', '雞爸爸', '鼠媽媽', '鼠姊姊', '龍弟弟', '兔阿嬤', 'ChickenDad', 'vocus2026']));
  function safeURL(value, base) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const url = new URL(value, base); return /^https?:$/.test(url.protocol) ? url : null; }
    catch (_) { return null; }
  }
  function key(article, base) {
    const url = safeURL(article.url, base);
    return url ? url.origin + url.pathname.replace(/\/$/, '') : '';
  }
  function catalogue(data, base) {
    const seen = new Set();
    return (Array.isArray(data) ? data : []).filter(a => {
      if (!a || (a.status && a.status !== 'published') || !a.title) return false;
      const id = key(a, base);
      if (!id || seen.has(id)) return false;
      seen.add(id); return true;
    });
  }
  function recommend(current, articles, base) {
    const frequency = new Map();
    articles.forEach(a => values(a.tags).forEach(t => frequency.set(t, (frequency.get(t) || 0) + 1)));
    const tags = values(current.tags).filter(t => !generic.has(t) && (frequency.get(t) || 0) / articles.length < 0.35);
    const ranked = articles.filter(a => key(a, base) !== key(current, base) && (!current.id || a.id !== current.id)).map(article => {
      const shared = tags.filter(t => values(article.tags).includes(t));
      const category = normal(current.category) && normal(current.category) === normal(article.category);
      const inSeries = sameSeries(current, article);
      const score = shared.reduce((sum, t) => sum + Math.min(4, Math.log(1 + articles.length / frequency.get(t))), 0) + (category ? 1 : 0) + (inSeries ? 2 : 0);
      // A broad category/series or family-member tag alone is not a topic match.
      const relevant = shared.length >= 2 || (shared.length === 1 && (category || inSeries));
      return {article, score, relevant, inSeries};
    }).sort((a, b) => b.score - a.score || newest(a.article, b.article));
    let related = ranked.filter(a => a.relevant).slice(0, 4);
    let selected = new Set(related.map(a => key(a.article, base)));
    // Keep a separate series block when all series candidates fit in topic results.
    if (related.length > 2 && ranked.some(a => a.inSeries) && !ranked.some(a => a.inSeries && !selected.has(key(a.article, base)))) {
      const last = related.map(a => a.inSeries).lastIndexOf(true);
      related.splice(last, 1);
      selected = new Set(related.map(a => key(a.article, base)));
    }
    return {related: related.map(a => a.article), series: ranked.filter(a => a.inSeries && !selected.has(key(a.article, base))).slice(0, 4).map(a => a.article)};
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = {catalogue, recommend, safeURL, newest}; return; }
  const base = new URL('../', document.currentScript.src);
  function element(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }
  function cards(items, kind) {
    const grid = element('div', 'cdj-reading-grid');
    items.forEach(a => {
      const link = element('a', 'cdj-reading-card');
      link.href = safeURL(a.url, base).href;
      const cover = safeURL(a.cover, base);
      if (kind === 'latest' && cover) {
        const img = element('img'); img.src = cover.href; img.alt = ''; img.loading = 'lazy'; img.width = 600; img.height = 400;
        link.append(img);
      }
      const body = element('div', 'cdj-reading-body');
      body.append(element('p', 'cdj-reading-meta', [a.category, a.date].filter(Boolean).join(' · ')), element('h3', '', a.title));
      if (a.summary) body.append(element('p', 'cdj-reading-summary', a.summary));
      body.append(element('span', 'cdj-reading-more', '繼續閱讀 →'));
      link.append(body);
      link.addEventListener('click', () => {
        if (typeof window.gtag === 'function' && window['ga-disable-G-3L4BC9J8FE'] === false) {
          window.gtag('event', 'select_content', {content_type: 'article', item_id: a.id || a.slug, content_list: kind, link_url: link.href});
        }
      });
      grid.append(link);
    });
    return grid;
  }
  function section(title, items, kind) {
    const block = element('section', 'cdj-reading-section');
    block.dataset.readingSection = kind;
    const heading = element('h2', '', title); heading.id = 'cdj-reading-' + kind;
    block.setAttribute('aria-labelledby', heading.id);
    block.append(heading, cards(items, kind));
    return block;
  }
  async function init() {
    try {
      const response = await fetch(new URL('data/articles.json', base), {cache: 'no-store'});
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid article catalogue');
      const articles = catalogue(data, base);
      const latest = document.querySelector('[data-latest-articles]');
      if (latest && articles.length) {
        latest.replaceChildren(section('最新文章', [...articles].sort(newest).slice(0, 6), 'latest'));
        const all = element('a', 'cdj-reading-all', '瀏覽所有文章 →'); all.href = new URL('articles.html', base).href; latest.append(all);
        latest.hidden = false;
      }
      if (!document.body.matches('.article-page') && !location.pathname.includes('/articles/')) return;
      // Legacy pages outside the catalogue can use their existing visible metadata.
      const title = document.querySelector('h1')?.textContent.trim();
      const kicker = document.querySelector('.article-kicker, .kicker')?.textContent.trim() || '';
      const current = articles.find(a => key(a, base) === key({url: location.href}, base)) ||
        articles.find(a => normal(a.title) === normal(title)) || {
          url: location.href, title,
          tags: [...document.querySelectorAll('.article-tags span')].map(el => el.textContent),
          category: kicker.split(' · ')[0], series: kicker.split(' · ')[1] || kicker
        };
      const main = document.querySelector('main');
      if (!main || !title) return;
      const result = recommend(current, articles, base);
      const container = element('div', 'cdj-article-reading');
      const related = section('同主題延伸閱讀', result.related, 'related');
      if (!result.related.length) {
        related.append(element('p', 'cdj-reading-meta', '目前尚無足夠相關的文章，歡迎探索更多故事。'));
        const all = element('a', 'cdj-reading-all', '瀏覽所有文章 →'); all.href = new URL('articles.html', base).href; related.append(all);
      }
      container.append(related);
      if (result.series.length) container.append(section('相關系列文章', result.series, 'series'));
      main.append(container);
    } catch (error) { console.warn('延伸閱讀暫時無法載入。', error); }
  }
  init();
})();
