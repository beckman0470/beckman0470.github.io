
import { storyCard, updateCard } from './story-card.js';
import { loadStories, loadCharacters, loadSeries, sortByDate, getFeatured } from './story-loader.js';

async function renderHome(){
  const stories = sortByDate(await loadStories());
  const characters = await loadCharacters();
  const series = await loadSeries();
  const featured = getFeatured(stories);

  const featuredEl = document.querySelector('[data-featured]');
  if(featuredEl && featured){
    featuredEl.innerHTML = `<div class="featured-cover" style="background-image:url('${featured.cover}')"></div>
    <div class="featured-copy">
      <span class="chip">${featured.seriesTitle}</span>
      <h2>${featured.title}</h2>
      <p class="muted">${featured.summary}</p>
      <p class="muted">${featured.date}｜${featured.readingTime} 分鐘閱讀</p>
      <a class="btn" href="${featured.url}">閱讀本月故事</a>
    </div>`;
  }

  const latestEl = document.querySelector('[data-latest]');
  if(latestEl) latestEl.innerHTML = stories.slice(0,3).map(updateCard).join('');

  const storiesEl = document.querySelector('[data-stories]');
  if(storiesEl) storiesEl.innerHTML = stories.filter(s => !s.featured).slice(0,3).map(storyCard).join('');

  const familyEl = document.querySelector('[data-family]');
  if(familyEl){
    familyEl.innerHTML = characters.map(c => `<a class="family-card" href="${c.url}">
      <div class="avatar" style="background:${c.color}">${c.emoji}</div>
      <h3>${c.name}</h3>
      <p class="muted">${c.zh}</p>
      <p>${c.summary}</p>
    </a>`).join('');
  }

  const seriesEl = document.querySelector('[data-series]');
  if(seriesEl){
    seriesEl.innerHTML = series.map(s => `<a class="series-card" href="#">
      <div class="bar" style="background:${s.color}"></div>
      <h3>${s.title}</h3>
      <p class="muted">${s.count} 篇故事</p>
      <p>${s.summary}</p>
    </a>`).join('');
  }
}

renderHome();
