
export function storyCard(story){
  return `<a class="story-card" href="${story.url}">
    <div class="story-cover" style="background-image:url('${story.cover}')"></div>
    <div class="card-body">
      <span class="chip">${story.category}</span>
      <h3>${story.title}</h3>
      <p class="muted">${story.summary}</p>
      <span class="readmore">${story.readingTime} 分鐘閱讀 →</span>
    </div>
  </a>`;
}

export function updateCard(story){
  const d = new Date(story.date + "T00:00:00");
  const date = `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  return `<a class="update-card" href="${story.url}">
    <div class="datebox">${date}</div>
    <div>
      <strong>${story.title}</strong>
      <p class="muted">${story.seriesTitle}｜${story.category}</p>
    </div>
    <span class="readmore">閱讀 →</span>
  </a>`;
}
