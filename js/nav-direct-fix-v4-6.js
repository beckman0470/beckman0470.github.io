// ChickenDad Journal nav direct static fix v4.6
// Runs in browser. No Python needed.
// Goal: top nav only keeps 首頁 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌.
// 知識圖譜 / 我們一家 / 關於 / 搜尋 move to footer.

document.addEventListener('DOMContentLoaded', () => {
  const normalize = (s) => (s || '').replace(/\s+/g, '').trim();

  const desired = [
    { text: '首頁', href: 'index.html' },
    { text: '家庭誌', href: 'articles.html?journal=family' },
    { text: '保健室', href: 'articles.html?journal=health' },
    { text: '圖書室', href: 'articles.html?journal=library' },
    { text: '風格誌', href: 'articles.html?journal=style' },
    { text: '光影誌', href: 'articles.html?journal=light' }
  ];

  function isCurrent(item) {
    const path = location.pathname.split('/').pop() || 'index.html';
    if (item.href === 'index.html') return path === 'index.html' || path === '';
    if (!item.href.includes('articles.html')) return false;
    const params = new URLSearchParams(location.search);
    return path === 'articles.html' && item.href.includes(`journal=${params.get('journal')}`);
  }

  function replaceTopNav() {
    const navs = Array.from(document.querySelectorAll('nav, .main-nav')).filter((nav) => {
      const t = normalize(nav.innerText || nav.textContent || '');
      return t.includes('首頁') && (
        t.includes('家庭誌') ||
        t.includes('家庭誌') ||
        t.includes('保健室') ||
        t.includes('圖書室') ||
        t.includes('風格誌') ||
        t.includes('光影誌') ||
        t.includes('知識圖譜') ||
        t.includes('我們一家') ||
        t.includes('關於') ||
        t.includes('文章列表')
      );
    });

    const nav = navs[0];
    if (!nav) return;

    nav.classList.add('main-nav');
    nav.innerHTML = '';

    desired.forEach((item) => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      if (isCurrent(item)) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      nav.appendChild(a);
    });
  }

  function replaceOldText() {
    document.querySelectorAll('*').forEach((el) => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        if (el.textContent.includes('家庭誌')) {
          el.textContent = el.textContent.replaceAll('家庭誌', '家庭誌');
        }
      }
      ['aria-label', 'alt', 'title'].forEach((attr) => {
        if (el.hasAttribute && el.hasAttribute(attr)) {
          el.setAttribute(attr, el.getAttribute(attr).replaceAll('家庭誌', '家庭誌'));
        }
      });
    });
  }

  function ensureFooterLinks() {
    const footer = document.querySelector('footer, .site-footer') || document.body;
    if (document.querySelector('.cdj-footer-links')) return;

    const nav = document.createElement('nav');
    nav.className = 'cdj-footer-links';
    nav.setAttribute('aria-label', '輔助導覽');
    nav.innerHTML = `
      <a href="knowledge.html">知識圖譜</a>
      <a href="family.html">我們一家</a>
      <a href="about.html">關於</a>
      <a href="search.html">搜尋</a>
      <a href="https://vocus.cc" target="_blank" rel="noopener">VOCUS</a>
    `;

    const copyright = Array.from(footer.querySelectorAll('p, div')).find((el) =>
      (el.textContent || '').includes('©')
    );

    if (copyright) {
      copyright.insertAdjacentElement('beforebegin', nav);
    } else {
      footer.insertBefore(nav, footer.firstChild);
    }
  }

  replaceOldText();
  replaceTopNav();
  ensureFooterLinks();
});
