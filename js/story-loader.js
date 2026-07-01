
import { storyCard, updateCard } from './story-card.js';

async function loadStories(){
  const response = await fetch('/data/articles.json?v=152');
  return await response.json();
}

async function loadCharacters(){
  const response = await fetch('/data/characters.json?v=152');
  return await response.json();
}

async function loadSeries(){
  const response = await fetch('/data/series.json?v=152');
  return await response.json();
}

function sortByDate(stories){
  return [...stories].sort((a,b)=> new Date(b.date) - new Date(a.date));
}

function getFeatured(stories){
  return stories.find(story => story.featured) || stories[0];
}

function getRelatedStories(currentStory, allStories, limit = 3){
  return allStories
    .filter(story => story.id !== currentStory.id)
    .map(story => {
      let score = 0;
      if(story.series === currentStory.series) score += 4;
      story.characters.forEach(c => { if(currentStory.characters.includes(c)) score += 3; });
      story.tags.forEach(t => { if(currentStory.tags.includes(t)) score += 1; });
      return {story, score};
    })
    .filter(item => item.score > 0)
    .sort((a,b)=> b.score - a.score)
    .slice(0, limit)
    .map(item => item.story);
}

window.ChickenDadStoryEngine = {
  loadStories,
  loadCharacters,
  loadSeries,
  sortByDate,
  getFeatured,
  getRelatedStories
};

export { loadStories, loadCharacters, loadSeries, sortByDate, getFeatured, getRelatedStories };
