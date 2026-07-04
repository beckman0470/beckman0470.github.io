# V7 Article-only 上架流程

這包是 **V7 完整版乾淨基底** 加上「只上文章」工具。

## 原則

現在先不改版。

不要動：

- `index.html`
- `family.html`
- `about.html`
- Header / Footer
- 全站 CSS
- 角色設定
- 首頁圖片

只動文章需要的檔案：

- `content/works/<slug>/article.md`
- `content/works/<slug>/meta.json`
- `content/content-index.json`
- `articles/<slug>.html`

## 最簡單流程

1. 打開 `tools/article-only/new/meta.json`
2. 填文章資料
3. 打開 `tools/article-only/new/article.md`
4. 貼上 Vocus 原文
5. 在 repository 根目錄執行：

```bash
python tools/article-only/publish_article.py
```

完成後會產生：

```text
content/works/<slug>/article.md
content/works/<slug>/meta.json
articles/<slug>.html
```

並自動更新：

```text
content/content-index.json
```

## meta.json 欄位

```json
{
  "id": "CDJ-0005",
  "title": "文章標題",
  "slug": "article-slug",
  "series": "幸福點滴",
  "category": "幸福點滴",
  "source": "Vocus",
  "status": "published",
  "published": "2026-07-04",
  "updated": "2026-07-04",
  "readingTime": 5,
  "subtitle": "副標題",
  "signature": "文章金句",
  "people": ["雞爸爸", "鼠姊姊"],
  "relationship": ["雞爸爸 × 鼠姊姊"],
  "tags": ["幸福點滴", "親子"],
  "related": []
}
```

## 系列建議

目前維持 V7 既有分類：

- 幸福點滴
- 生活研究
- 棒球札記
- AI 共創

## 上傳 GitHub

執行完工具後，把以下新增或更新的檔案上傳：

- `content/works/<slug>/`
- `content/content-index.json`
- `articles/<slug>.html`

不要重新上傳亂改過的 Step2 / Hotfix 檔。
