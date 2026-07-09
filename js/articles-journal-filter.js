(() => {
  const JOURNAL_LABELS = {
    family: '家庭誌',
    health: '保健室',
    library: '圖書室',
    style: '風格誌',
    light: '光影誌'
  };

  const JOURNAL_LINKS = [
    ['family', '家庭誌'],
    ['health', '保健室'],
    ['library', '圖書室'],
    ['style', '風格誌'],
    ['light', '光影誌']
  ];

  const params = new URLSearchParams(window.location.search);
  const rawJournal = (params.get('journal') || params.get('category') || location.hash.replace('#', '') || '').trim();
  const alias = {
    memory: 'family',
    life: 'family',
    journal: 'family',
    family: 'family',
    family_journal: 'family',
    health: 'health',
    library: 'library',
    book: 'library',
    style: 'style',
    light: 'light',
    photo: 'light'
  };
  const currentJournal = alias[rawJournal] || rawJournal;

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function classifyArticle(text) {
    const t = normalize(text);

    // 先處理更明確的專欄，避免「親子」文章被全部歸到家庭誌。
    if (/(棒球札記|味全龍|徐若熙|陳子豪|張政禹|龍魂|TTO|BABIP|盜壘|棒球|說唱|嘻哈|音樂|電影|PG ONE|GAI|熱狗|巔峰對決)/i.test(t)) {
      return 'style';
    }

    if (/(AI 共創|AI共創|AI製圖|AI 工具|ChatGPT|Gemini|網站架設|小妾|製圖|插圖|攝影|光影|相片|照片|影像|短影音|Vocus 個人網站)/i.test(t)) {
      return 'light';
    }

    if (/(圖書室|閱讀|共讀|金庸|笑傲江湖|令狐沖|鏢人|諦聽|阿相|刀馬|大漠餘響|武俠|漫畫|佛法|易經|老莊|書)/i.test(t)) {
      return 'library';
    }

    if (/(保健室|生活研究|健康|健身|氣喘|急性氣喘|肌酸|異位性|皮膚炎|過敏|HSP|高敏感|壓力|睡眠|情緒管理|能量用球數|數據雜訊|NAS|QNAP|資安稽核|補充品|保健|中醫)/i.test(t)) {
      return 'health';
    }

    if (/(幸福點滴|家庭誌|家庭|孩子|親子|陪伴|夫妻|鼠姊姊|龍弟弟|兔阿嬤|鼠媽媽|爸爸|媽媽|畢業典禮|分房睡|游泳|鞦韆|生活片刻|日常)/i.test(t)) {
      return 'family';
    }

    return 'family';
  }

  function updateHeaderLinks() {
    const replacements = [
      ['獨家記憶', 'family'],
      ['家庭誌', 'family'],
      ['保健室', 'health'],
      ['圖書室', 'library'],
      ['風格誌', 'style'],
      ['光影誌', 'light']
    ];

    document.querySelectorAll('a').forEach((a) => {
      const label = normalize(a.textContent);
      const found = replacements.find(([text]) => label === text);
      if (found) {
        const [text, key] = found;
        a.textContent = key === 'family' ? '家庭誌' : text;
        a.setAttribute('href', `articles.html?journal=${key}`);
        if (currentJournal === key) a.classList.add('active');
      }
    });
  }

  function hideLegacyMiddleCards() {
    const needles = ['幸福點滴', '生活研究', '棒球札記', 'AI 共創'];
    const controls = ['系列', '時間軸', '搜尋', '標籤'];

    const candidates = Array.from(document.querySelectorAll('section, .section, .archive-tabs, .filter-tabs, .series-tabs, div'));
    let best = null;

    for (const el of candidates) {
      const t = normalize(el.innerText || el.textContent || '');
      if (!t) continue;

      const hasCategoryCards = needles.every((n) => t.includes(n));
      const hasControls = controls.every((n) => t.includes(n));
      const hasArchiveList = t.includes('典藏作品') || /\d{4}\.\d{2}\.\d{2}/.test(t);

      if ((hasCategoryCards || hasControls) && !hasArchiveList) {
        if (!best || t.length < normalize(best.innerText || best.textContent || '').length) best = el;
      }
    }

    if (best) {
      best.classList.add('cdj-hidden-legacy-series');
    } else {
      // 備援：只隱藏包含舊四張分類卡的最小區塊
      const categoryNodes = Array.from(document.querySelectorAll('*')).filter((el) => {
        const t = normalize(el.textContent || '');
        return needles.every((n) => t.includes(n)) && !/\d{4}\.\d{2}\.\d{2}/.test(t);
      });
      categoryNodes
        .sort((a, b) => normalize(a.textContent).length - normalize(b.textContent).length)
        .slice(0, 1)
        .forEach((el) => el.classList.add('cdj-hidden-legacy-series'));
    }
  }

  function findArticleCards() {
    return Array.from(document.querySelectorAll('a, article, .work-card, .article-card, .entry-card')).filter((el) => {
      const t = normalize(el.innerText || el.textContent || '');
      return /\d{4}\.\d{2}\.\d{2}/.test(t) && /(約\s*\d+|分鐘|#)/.test(t);
    });
  }

  function filterArticles() {
    const cards = findArticleCards();
    if (!cards.length) return;

    const target = JOURNAL_LABELS[currentJournal] ? currentJournal : null;
    let visibleCount = 0;

    cards.forEach((card) => {
      const journal = classifyArticle(card.innerText || card.textContent || '');
      card.dataset.journal = journal;

      if (!target || journal === target) {
        card.hidden = false;
        card.classList.remove('cdj-filtered-out');
        visibleCount += 1;
      } else {
        card.hidden = true;
        card.classList.add('cdj-filtered-out');
      }
    });

    const archiveTitle = Array.from(document.querySelectorAll('h1,h2,h3')).find((el) => normalize(el.textContent).includes('典藏作品'));
    if (archiveTitle && target) {
      archiveTitle.textContent = `典藏作品｜${JOURNAL_LABELS[target]}`;
    }

    const countText = Array.from(document.querySelectorAll('p, .archive-desc, .section-desc')).find((el) => normalize(el.textContent).includes('目前共收錄'));
    if (countText && target) {
      countText.textContent = `${JOURNAL_LABELS[target]}目前顯示 ${visibleCount} 篇作品。每張卡片都可點進完整原文。`;
    }

    if (target && visibleCount === 0) {
      const archiveSection = archiveTitle?.parentElement || document.body;
      const empty = document.createElement('p');
      empty.className = 'cdj-empty-state';
      empty.textContent = `${JOURNAL_LABELS[target]}目前還沒有符合條件的文章。`;
      archiveSection.appendChild(empty);
    }
  }

  function addJournalTabs() {
    const archiveTitle = Array.from(document.querySelectorAll('h1,h2,h3')).find((el) => normalize(el.textContent).includes('典藏作品'));
    if (!archiveTitle || document.querySelector('.cdj-journal-tabs')) return;

    const tabs = document.createElement('nav');
    tabs.className = 'cdj-journal-tabs';
    tabs.setAttribute('aria-label', '文章分類入口');

    JOURNAL_LINKS.forEach(([key, label]) => {
      const a = document.createElement('a');
      a.href = `articles.html?journal=${key}`;
      a.textContent = label;
      if (currentJournal === key) a.classList.add('active');
      tabs.appendChild(a);
    });

    const all = document.createElement('a');
    all.href = 'articles.html';
    all.textContent = '全部文章';
    if (!JOURNAL_LABELS[currentJournal]) all.classList.add('active');
    tabs.appendChild(all);

    archiveTitle.insertAdjacentElement('afterend', tabs);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('cdj-articles-journal-filter-ready');
    updateHeaderLinks();
    hideLegacyMiddleCards();
    addJournalTabs();
    filterArticles();
  });
})();
