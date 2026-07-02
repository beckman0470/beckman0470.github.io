# Repository Health Audit

## 基準檔案

```text
beckman0470.github.io-main (1).zip
```

## Inventory

```text
HTML: 44
Markdown: 76
CSS: 11
JS: 19
JSON: 22
```

## Critical

- `temperature-of-now.html`：HTML 檔內容疑似 Markdown / frontmatter

## Warnings

- `temperature-of-now.html`：正式頁面缺少 <html> 或 <!doctype>
- `temperature-of-now.html`：正式頁面缺少 </html>
- `temperature-of-now.html`：正式頁面缺少 <title>
- `download`：疑似下載 / 複製產生的重複檔

## Missing / suspicious asset refs

- `articles/cortisol.html` references `./site.webmanifest`
- `articles/dragons-champion.html` references `./site.webmanifest`
- `articles/swimming.html` references `./site.webmanifest`
- `articles/vision-care.html` references `./site.webmanifest`
- `templates/articles/article-publishing-template.html` references `../css/style.css`
- `templates/articles/article-publishing-template.html` references `../css/visual-polish.css`
- `templates/articles/article-publishing-template.html` references `../css/article-template.css`

## 結論

目前必須先修復：

1. `temperature-of-now.html` 被 Markdown 覆蓋。
2. 根目錄 / stories 目錄中有部分 root-relative 資源路徑需要後續確認。
3. `templates/components/*.html` 是 component，不應當作正式頁面檢查，已排除在 critical 外。

## 下一步建議

先做 `v5.8.1 Hotfix｜Article Recovery`，只修復 `temperature-of-now.html`，不要加入任何新功能。
