// V7.3.1 Story Card Component

export function createStoryCard(work) {
  const article = document.createElement("article");
  article.className = "work-card";
  article.dataset.slug = work.slug || "";

  const tags = Array.isArray(work.tags) ? work.tags.slice(0, 3) : [];
  const people = Array.isArray(work.people) ? work.people.slice(0, 3) : [];

  article.innerHTML = `
    <div class="tag">${escapeHtml(work.series || work.category || "作品")}</div>
    <h3>${escapeHtml(work.title || "未命名作品")}</h3>
    ${work.subtitle ? `<p>${escapeHtml(work.subtitle)}</p>` : ""}
    ${work.signature ? `<blockquote>${escapeHtml(work.signature)}</blockquote>` : ""}
    <div class="work-meta">
      ${formatDate(work.published)}
      ${work.readingTime ? ` · 約 ${escapeHtml(String(work.readingTime))} 分鐘` : ""}
    </div>
    ${tags.length ? `<div class="work-tags">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
    ${people.length ? `<div class="work-people">${people.map(person => `<span>${escapeHtml(person)}</span>`).join("")}</div>` : ""}
  `;

  return article;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateText) {
  if (!dateText) return "";
  return String(dateText).replaceAll("-", ".");
}
