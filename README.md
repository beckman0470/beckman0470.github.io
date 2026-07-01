# Chicken Dad Journal v4.5 Production Release

正式版完整包，可直接覆蓋 GitHub Repository 根目錄。

## 主要頁面

- `index.html`
- `articles.html`
- `series.html`
- `timeline.html`
- `search.html`
- `tags.html`
- `subscribe.html`
- `family.html`
- `about.html`
- `404.html`

## Build

```bash
python cms/build.py
```

會自動產生：

- `index.html`
- `data/stories.json`
- `data/related.json`
- `data/navigation.json`
- `data/timeline.json`
- `data/search-index.json`
- `data/tag-index.json`
- `data/series-index.json`
- `articles/{slug}.html`
- `sitemap.xml`
- `rss.xml`
- `robots.txt`

## 新增文章

1. 複製 `templates/story-template.md`
2. 放到 `content/stories/YYYY-MM-DD-slug.md`
3. 修改 front matter 與正文
4. 執行 `python cms/build.py`
5. 上傳產出檔案到 GitHub
