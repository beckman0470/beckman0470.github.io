
(function () {
  console.log("Chicken Dad Journal v15.2.1 Stable Fix loaded");

  const fallbackStories = [
    {
      title: "雞爸爸和鼠姊姊的半小時夏日約會",
      date: "2026-06-29",
      seriesTitle: "DoDo 成長日記",
      category: "家庭故事",
      readingTime: 5,
      summary: "一個夏日午後，雞爸爸和 DoDo 在泳池邊完成一場短短半小時的夏日約會。",
      url: "./articles/swimming.html",
      cover: "./images/cover-family.svg",
      featured: true
    },
    {
      title: "從心疼、戴鏡到全人調理：陪孩子對抗先天遠視",
      date: "2026-06-30",
      seriesTitle: "DoDo 成長日記",
      category: "家庭故事",
      readingTime: 7,
      summary: "從鬥雞眼、戴眼鏡到每週點眼調理，記錄我們陪孩子面對先天遠視的荒野與希望。",
      url: "./articles/vision-care.html",
      cover: "./images/cover-dodo.svg",
      featured: false
    },
    {
      title: "壓力正壓垮你的臉：從皮質醇到下垂臉的真相",
      date: "2026-06-29",
      seriesTitle: "ChickenDad 札記",
      category: "健康生活",
      readingTime: 7,
      summary: "皮質醇不是壞人，但長期壓力會讓臉部與身體失去修復節奏。",
      url: "./articles/cortisol.html",
      cover: "./images/cover-health.svg",
      featured: false
    },
    {
      title: "味全龍這一冠，屬於用心經營的球團！",
      date: "2026-06-29",
      seriesTitle: "棒球觀察",
      category: "棒球故事",
      readingTime: 6,
      summary: "從情蒐、養成、跑壘到投手整合，重新理解上半季冠軍。",
      url: "./articles/dragons-champion.html",
      cover: "./images/cover-baseball.svg",
      featured: false
    }
  ];

  const fallbackCharacters = [
    { name: "ChickenDad", zh: "雞爸爸", emoji: "🐔", url: "./stories/chickendad.html", color: "#A67C52", summary: "閱讀、驗證、分析，再把有趣的理解落實到生活並分享。" },
    { name: "RatMom", zh: "鼠媽媽", emoji: "🐭", url: "./stories/ratmom.html", color: "#D8C2A8", summary: "溫柔、細心、安定，是家裡最穩定的力量。" },
    { name: "DoDo", zh: "鼠姊姊", emoji: "🐭", url: "./stories/dodo.html", color: "#8DBFD8", summary: "活潑好動、愛漂亮、愛撒嬌，喜歡公主打扮與唱歌跳舞。" },
    { name: "B.Dragon", zh: "龍弟弟", emoji: "🐲", url: "./stories/bdragon.html", color: "#8FBF72", summary: "愛笑、聰明、聲音宏亮，喜歡車車，也愛跟陌生人打招呼。" },
    { name: "RabbitAma", zh: "兔阿嬤", emoji: "🐰", url: "./stories/rabbitama.html", color: "#B7A3C9", summary: "溫暖、生活智慧、會照顧人，讓平凡日子更安心。" }
  ];

  const fallbackSeries = [
    { title: "DoDo 成長日記", count: 2, color: "#8DBFD8", summary: "視力、游泳、畢業與成長日常。" },
    { title: "B.Dragon 成長日記", count: 0, color: "#8FBF72", summary: "車車、笑聲、第一次探索世界。" },
    { title: "ChickenDad 札記", count: 1, color: "#A67C52", summary: "健康、AI、棒球、閱讀與生活整理。" },
    { title: "健康生活", count: 1, color: "#8FAF8B", summary: "身體訊號、運動、睡眠與照顧自己。" },
    { title: "棒球觀察", count: 1, color: "#802424", summary: "勝負之外的系統、養成與故事。" }
  ];

  async function loadJSON(path, fallback) {
    try {
      const response = await fetch(path + "?v=1521", { cache: "no-store" });
      if (!response.ok) throw new Error(path + " HTTP " + response.status);
      const data = await response.json();
      console.log("Loaded", path, Array.isArray(data) ? data.length : "object");
      return data;
    } catch (error) {
      console.warn("Fallback used for", path, error);
      return fallback;
    }
  }

  function fixedUrl(url) {
    if (!url) return "#";
    return url.startsWith("/") ? "." + url : url;
  }

  function fixedImage(url) {
    if (!url) return "";
    return url.startsWith("/") ? "." + url : url;
  }

  function fmtDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    if (Number.isNaN(d.getTime())) return dateStr || "";
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  }

  function storyCard(story) {
    return `<a class="story-card" href="${fixedUrl(story.url)}">
      <div class="story-cover" style="background-image:url('${fixedImage(story.cover)}')"></div>
      <div class="card-body">
        <span class="chip">${story.category || "故事"}</span>
        <h3>${story.title}</h3>
        <p class="muted">${story.summary || ""}</p>
        <span class="readmore">${story.readingTime || ""} 分鐘閱讀 →</span>
      </div>
    </a>`;
  }

  function updateCard(story) {
    return `<a class="update-card" href="${fixedUrl(story.url)}">
      <div class="datebox">${fmtDate(story.date)}</div>
      <div>
        <strong>${story.title}</strong>
        <p class="muted">${story.seriesTitle || story.series || ""}｜${story.category || ""}</p>
      </div>
      <span class="readmore">閱讀 →</span>
    </a>`;
  }

  function renderFeatured(stories) {
    const el = document.querySelector("[data-featured]");
    if (!el) return;
    const featured = stories.find(s => s.featured) || stories[0];
    if (!featured) {
      el.innerHTML = `<p class="muted">目前沒有本月故事。</p>`;
      return;
    }
    el.innerHTML = `<div class="featured-cover" style="background-image:url('${fixedImage(featured.cover)}')"></div>
      <div class="featured-copy">
        <span class="chip">${featured.seriesTitle || featured.series || featured.category || "故事"}</span>
        <h2>${featured.title}</h2>
        <p class="muted">${featured.summary || ""}</p>
        <p class="muted">${featured.date || ""}｜${featured.readingTime || ""} 分鐘閱讀</p>
        <a class="btn" href="${fixedUrl(featured.url)}">閱讀本月故事</a>
      </div>`;
  }

  function renderLatest(stories) {
    const el = document.querySelector("[data-latest]");
    if (!el) return;
    el.innerHTML = stories.slice(0, 3).map(updateCard).join("");
  }

  function renderStories(stories) {
    const el = document.querySelector("[data-stories]");
    if (!el) return;
    el.innerHTML = stories.filter(s => !s.featured).slice(0, 3).map(storyCard).join("");
  }

  function renderFamily(characters) {
    const el = document.querySelector("[data-family]");
    if (!el) return;
    el.innerHTML = characters.map(c => `<a class="family-card" href="${fixedUrl(c.url)}">
      <div class="avatar" style="background:${c.color || "#D8C2A8"}">${c.emoji || ""}</div>
      <h3>${c.name}</h3>
      <p class="muted">${c.zh || ""}</p>
      <p>${c.summary || ""}</p>
    </a>`).join("");
  }

  function renderSeries(series) {
    const el = document.querySelector("[data-series]");
    if (!el) return;
    el.innerHTML = series.map(s => `<a class="series-card" href="#">
      <div class="bar" style="background:${s.color || "#A67C52"}"></div>
      <h3>${s.title}</h3>
      <p class="muted">${s.count || 0} 篇故事</p>
      <p>${s.summary || ""}</p>
    </a>`).join("");
  }

  async function init() {
    const storiesRaw = await loadJSON("./data/articles.json", fallbackStories);
    const characters = await loadJSON("./data/characters.json", fallbackCharacters);
    const series = await loadJSON("./data/series.json", fallbackSeries);

    const stories = [...storiesRaw].sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log("Story Engine ready", {
      stories: stories.length,
      characters: characters.length,
      series: series.length
    });

    renderFeatured(stories);
    renderLatest(stories);
    renderFamily(characters);
    renderStories(stories);
    renderSeries(series);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
