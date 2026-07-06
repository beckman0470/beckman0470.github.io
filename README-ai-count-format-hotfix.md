# AI count + archive card format hotfix

This hotfix fixes two issues from the live Stories page:

1. AI 共創 count showing 0 because the two AI articles were not in `content/content-index.json`.
2. Story cards looking inconsistent because `blockquote`, `work-tags`, and `work-people` were rendered but not styled in the archive CSS.

## Files overwritten
- `content/content-index.json`
- `css/v7-2-story.css`

## Files added
- `articles/ai-website-scary-lover-concubine.html`
- `articles/ai-fake-artsy-meme.html`
- `content/works/ai-website-scary-lover-concubine/article.md`
- `content/works/ai-website-scary-lover-concubine/meta.json`
- `content/works/ai-fake-artsy-meme/article.md`
- `content/works/ai-fake-artsy-meme/meta.json`

## Files not touched
- `index.html`
- `family.html`
- `about.html`
- `articles.html`
- Header / Footer / Logo assets
- Homepage layout
