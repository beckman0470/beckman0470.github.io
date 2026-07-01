# Chicken Dad Journal v5.0 Production Platform

這是 v5.0 的完整平台版，可直接覆蓋 GitHub Repository 根目錄。

## 主要頁面

- `index.html`
- `articles.html`
- `series.html`
- `timeline.html`
- `search.html`
- `tags.html`
- `subscribe.html`
- `dashboard.html`
- `family.html`
- `about.html`
- `404.html`

## Studio

- `studio/`
- `content/drafts/`
- `content/scheduled/`
- `content/published/`
- `content/archived/`
- `templates/story-template-v5.md`

## Build

```bash
python cms/build.py
```

## Publish

```bash
python studio/publish.py "Update Chicken Dad Journal"
```

## QA

```bash
python tools/qa_check.py
python studio/release_check.py
```
