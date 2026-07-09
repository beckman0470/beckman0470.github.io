// ChickenDad Journal articles page static patch v4.0
// No Python needed. This runs in the browser after the page loads.
(() => {
  const JOURNALS = {
    family: '家庭誌',
    health: '保健室',
    library: '圖書室',
    style: '風格誌',
    light: '光影誌'
  };

  const params = new URLSearchParams(location.search);
  const raw = (params.get('journal') || params.get('category') || location.hash.replace('#', '') || '').trim();
  const alias = {
    memory: 'family',
    life: 'family',
    journal: 'family',
    family: 'family',
    health: 'health',
    library: 'library',
    book: 'library',
    style: 'style',
    light: 'light',
    photo: 'light'
  };
  const current = alias[raw] || raw;

  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim();

  function updateAllTextLabels() {
    document.querySelectorAll('*').forEach((el) => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        if (el.textContent.includes('獨家記憶')) {
          el.textContent = el.textContent.replaceAll('獨家記憶', '家庭誌');
        }
      }
      ['aria-label', 'alt', 'title'].forEach((attr) => {
        if (el.hasAttribute && el.hasAttribute(attr)) {
          el.setAttribute(attr, el.getAttribute(attr).replaceAll('獨家記憶', '家庭誌'));
        }
      });
    });
  }

  function classify(text) {
    const t = normalize(text);

    if (/(棒球札記|味全龍|徐若熙|陳子豪|張政禹|龍魂|TTO|BABIP|盜壘|棒球|說唱|嘻哈|音樂|電影|PG ONE|GAI|熱狗|巔峰對決)/i.test(t)) return 'style';
    if (/(AI 共創|AI共創|AI製圖|AI 工具|ChatGPT|Gemini|網站架設|小妾|製圖翻車|插圖|攝影|光影|相片|照片|影像|短影音)/i.test(t)) return 'light';
    if (/(圖書室|閱讀|共讀|金庸|笑傲江湖|令狐沖|鏢人|諦聽|阿相|刀馬|大漠餘響|武俠|漫畫|佛法|易經|老莊|書)/i.test(t)) return 'library';
    if (/(保健室|生活研究|健康|健身|氣喘|急性氣喘|肌酸|異位性|皮膚炎|過敏|HSP|高敏感|壓力|睡眠|情緒管理|能量用球數|數據雜訊|NAS|QNAP|資安稽核|補充品|保健|中醫)/i.test(t)) return 'health';
    if (/(幸福點滴|家庭誌|家庭|孩子|親子|陪伴|夫妻|鼠姊姊|龍弟弟|兔阿嬤|鼠媽媽|爸爸|媽媽|畢業典禮|分房睡|游泳|鞦韆|生活片刻|日常)/i.test(t)) return 'family';

    return 'family';
  }

  function updateNavLinks() {
    const map = [
      ['獨家記憶', 'family'],
      ['家庭誌', 'family'],
      ['保健室', 'health'],
      ['圖書室', 'library'],
      ['風格誌', 'style'],
      ['光影誌', 'light']
    ];

    document.querySelectorAll('a').forEach((a) => {
      const label = normalize(a.textContent);
      const found = map.find(([name]) => label === name);
      if (!found) return;

      const [, key] = found;
      a.textContent = JOURNALS[key];
      a.href = `articles.html?journal=${key}`;
      if (current === key) a.classList.add('active');
    });
  }

  function hideOldMiddleSection() {
    const needles = ['幸福點滴', '生活研究', '棒球札記', 'AI 共創'];
    const controls = ['系列', '時間軸', '搜尋', '標籤'];

    const candidates = Array.from(document.querySelectorAll('section, div, nav')).filter((el) => {
      const t = normalize(el.innerText || el.textContent || '');
      if (!t) return false;
      const hasOldCards = needles.every((n) => t.includes(n));
      const hasOldControls = controls.every((n) => t.includes(n));
      const containsArchive = t.includes('典藏作品') || /\d{4}\.\d{2}\.\d{2}/.test(t);
      return (hasOldCards || hasOldControls) && !containsArchive;
    });

    candidates
      .sort((a, b) => normalize(a.textContent).length - normalize(b.textContent).length)
      .slice(0, 2)
      .forEach((el) => el.classList.add('cdj-hide-old-series'));
  }

  function addJournalTabs() {
    if (document.querySelector('.cdj-journal-tabs')) return;

    const title = Array.from(document.querySelectorAll('h1,h2,h3')).find((el) => normalize(el.textContent).includes('典藏作品'));
    if (!title) return;

    const tabs = document.createElement('nav');
    tabs.className = 'cdj-journal-tabs';
    tabs.setAttribute('aria-label', '文章分類入口');

    Object.entries(JOURNALS).forEach(([key, label]) => {
      const a = document.createElement('a');
      a.href = `articles.html?journal=${key}`;
      a.textContent = label;
      if (current === key) a.classList.add('active');
      tabs.appendChild(a);
    });

    const all = document.createElement('a');
    all.href = 'articles.html';
    all.textContent = '全部文章';
    if (!JOURNALS[current]) all.classList.add('active');
    tabs.appendChild(all);

    title.insertAdjacentElement('afterend', tabs);
  }

  function findArticleCards() {
    const cards = Array.from(document.querySelectorAll('article, a, .work-card, .article-card, .entry-card')).filter((el) => {
      const t = normalize(el.innerText || el.textContent || '');
      return /\d{4}\.\d{2}\.\d{2}/.test(t) && /(約\s*\d+|分鐘|#)/.test(t);
    });

    // De-duplicate nested cards by keeping larger/outer meaningful anchors first
    return cards.filter((card, index) => !cards.some((other, otherIndex) => otherIndex !== index && other.contains(card) && normalize(other.textContent).length < normalize(card.textContent).length));
  }

  function filterArticleCards() {
    const target = JOURNALS[current] ? current : null;
    const cards = findArticleCards();
    if (!cards.length) return;

    let visible = 0;
    cards.forEach((card) => {
      const journal = classify(card.innerText || card.textContent || '');
      card.dataset.journal = journal;
      if (!target || journal === target) {
        card.classList.remove('cdj-filtered-out');
        card.hidden = false;
        visible += 1;
      } else {
        card.classList.add('cdj-filtered-out');
        card.hidden = true;
      }
    });

    const title = Array.from(document.querySelectorAll('h1,h2,h3')).find((el) => normalize(el.textContent).includes('典藏作品'));
    if (title && target) {
      title.textContent = `典藏作品｜${JOURNALS[target]}`;
    }

    const desc = Array.from(document.querySelectorAll('p, .archive-desc, .section-desc')).find((el) => normalize(el.textContent).includes('目前共收錄'));
    if (desc && target) {
      desc.textContent = `${JOURNALS[target]}目前顯示 ${visible} 篇作品。每張卡片都可點進完整原文。`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateAllTextLabels();
    updateNavLinks();
    hideOldMiddleSection();
    addJournalTabs();
    filterArticleCards();
  });
})();
