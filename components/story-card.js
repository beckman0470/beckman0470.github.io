// CDJ-0038 Album Story Card

export function createStoryCard(work) {
  const card = document.createElement("article");
  card.className = "work-card";
  card.dataset.slug = work.slug || "";
  const cover = work.cover || work.hero || "";
  const date = work.published ? String(work.published).replaceAll("-", ".") : "";
  card.innerHTML = `
    <div class="work-cover">
      ${cover ? `<img src="${escapeHtml(cover)}" alt="${escapeHtml(work.title || "故事封面")}">` : `<span>📷</span>`}
    </div>
    <div class="work-content">
      <h3>${escapeHtml(work.title || "未命名故事")}</h3>
      ${date ? `<div class="work-date">${escapeHtml(date)}</div>` : ""}
      ${work.signature ? `<div class="work-signature">${escapeHtml(work.signature)}</div>` : ""}
    </div>
  `;
  return card;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
