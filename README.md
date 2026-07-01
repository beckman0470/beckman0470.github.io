# Chicken Dad Journal v2.0 CMS Foundation

這一版建立 Markdown CMS 的地基，但暫時不改動現有網站頁面。

## 新增內容

```text
config.json
content/
  stories/
    2026-06-29-swimming.md
    2026-06-30-vision-care.md
  drafts/
  assets/
templates/
  story-template.md
docs/
  story-markdown-spec.md
cms/
```

## 下一步：v2.0 Sprint 2

建立本機 build script：

```text
cms/build.py
```

功能：

1. 讀取 `content/stories/*.md`
2. 解析 front matter
3. 產生 `data/stories.json`
4. 產生 `articles.html`
5. 產生單篇文章 HTML

## 現階段使用方式

你之後新增文章時，可以複製：

```text
templates/story-template.md
```

到：

```text
content/stories/YYYY-MM-DD-slug.md
```

然後修改 front matter 與正文。
