# Chicken Dad Journal v3.6 Stable Full Release

這是 v3.0～v3.5 的完整穩定整合版。

## 主要頁面

- `index.html`：首頁
- `articles.html`：故事典藏
- `series.html`：系列入口
- `search.html`：全站搜尋
- `tags.html`：標籤索引
- `subscribe.html`：RSS 訂閱說明
- `family.html`：認識這個家
- `about.html`：關於
- `404.html`：錯誤頁

## CMS

- `content/stories/`：Markdown 文章
- `templates/story-template.md`：文章範本
- `cms/build.py`：一鍵建置
- `data/stories.json`：網站讀取資料

## 自動建置

執行：

```bash
python cms/build.py
```

會自動產生：

- `data/stories.json`
- `articles/{slug}.html`
- `sitemap.xml`
- `rss.xml`
- `robots.txt`

## 公開發布

整包解壓縮後，將所有檔案覆蓋到 GitHub Repository 根目錄即可。
