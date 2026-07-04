// V7.3.1 Stories Engine
// Reads Content Engine metadata and renders the Stories page.

import { createStoryCard } from "../components/story-card.js";

const DEFAULT_BASE_PATH = ".";

export async function renderStories(options = {}) {
  const {
    mount = "#stories-grid",
    status = "#stories-status",
    basePath = DEFAULT_BASE_PATH
  } = options;

  const mountEl = document.querySelector(mount);
  const statusEl = document.querySelector(status);

  if (!mountEl) return;

  setStatus(statusEl, "正在整理故事……");

  try {
    const works = await loadWorks(basePath);
    const publishedWorks = works
      .filter(work => work.status === "published")
      .sort((a, b) => String(b.published || "").localeCompare(String(a.published || "")));

    mountEl.innerHTML = "";

    if (!publishedWorks.length) {
      setStatus(statusEl, "作品正在整理中……");
      return;
    }

    const fragment = document.createDocumentFragment();
    publishedWorks.forEach(work => fragment.appendChild(createStoryCard(work)));
    mountEl.appendChild(fragment);

    renderSeriesSummary(publishedWorks);
    setStatus(statusEl, "");
  } catch (error) {
    console.error(error);
    setStatus(statusEl, "故事暫時無法載入，請稍後再試。");
  }
}

async function loadWorks(basePath) {
  const index = await loadJson(`${basePath}/content/content-index.json`);
  const paths = Array.isArray(index.works) ? index.works : [];

  return Promise.all(paths.map(path => loadJson(`${basePath}/${path}`)));
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Cannot load ${path}`);
  return response.json();
}

function setStatus(el, message) {
  if (!el) return;
  el.textContent = message || "";
  el.hidden = !message;
}

function renderSeriesSummary(works) {
  const countEls = document.querySelectorAll("[data-series-count]");
  if (!countEls.length) return;

  const counts = works.reduce((map, work) => {
    const key = work.series || work.category || "未分類";
    map[key] = (map[key] || 0) + 1;
    return map;
  }, {});

  countEls.forEach(el => {
    const key = el.dataset.seriesCount;
    el.textContent = `${counts[key] || 0} 篇`;
  });
}
