# Chicken Dad Journal v2.1 CMS Engine

這版新增 CMS 引擎骨架。

## 覆蓋／新增

```text
cms/
  __init__.py
  build.py
  generator.py
  markdown.py
  schema.py

docs/
  cms-engine-architecture.md
```

## 暫時不動網站頁面

此版本只建立 CMS 引擎，不會覆蓋 `index.html`、`articles.html`、`series.html`、`family.html`、`about.html`。

## 下一步

v2.2 會讓 `content/stories/*.md` 開始自動產生故事列表與文章頁。
