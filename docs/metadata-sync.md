# Vocus metadata 與官網同步

GitHub = Reality。前台已收錄作品以 `data/articles.json` 為唯一清單；
`content/works/` 保存全文與編輯資料，不重新掃描草稿來推定發布狀態。
本次未取得完整品牌白皮書檔案，依現有網站、`DO_NOT_REDESIGN.md` 與使用者明確指定的五大入口做必要 Patch。

## 只匯入 metadata

1. 複製 `tools/article-only/meta.template.json` 至自己的 `meta.json`。
2. 填入 `title`、`slug`、`published`（YYYY-MM-DD）、`summary`、`cover`、`category`、`source`、`sourceUrl`、`canonicalUrl`。
3. `category` 只能是家庭誌／保健室／圖書室／風格誌／光影誌；`series` 是既有內容線索，不是另一套入口。
4. 確認資料可公開後，將 `status` 改為 `published`，執行：

```sh
python tools/article-only/publish_article.py --manifest path/to/meta.json --metadata-only
```

新項目直接連到 Vocus 原文，不產生假全文頁。相同 slug 重跑會更新原項目，不增加篇數。
若項目已有官網文章連結，metadata 更新保留該連結；全文與 canonical 有改動時應走下方全文流程。
封面可用已備妥的站內圖片路徑或正式 HTTPS 圖片 URL。此工具不登入、不爬取、不下載 Vocus 私有內容。

## 已備妥全文

將 `article.md` 放在 manifest 同一資料夾，執行：

```sh
python tools/article-only/publish_article.py --manifest path/to/meta.json
```

沿用既有文章模板，保存 `content/works/<slug>/`、更新 `content/content-index.json`、產生文章頁與 Article JSON-LD，並同步前台清單。
未指定 manifest 時仍讀取 `tools/article-only/new/`，但必要欄位與公開狀態必須通過驗證。

## 同步產物與 QA

```sh
python tools/article-only/publish_article.py --sync-only
python tools/article-only/test_catalogue.py
python tools/qa_check.py
python studio/release_check.py
```

同步會從 `data/articles.json` 更新首頁最新文章與五大入口篇數的 HTML 備援值、About 總數、既有 `articles.html` 卡片資料、`sitemap.xml`。
首頁與 About 另由同一支 `js/article-summary.js` 即時讀取該清單；讀取失敗保留上次發布值。日期由新到舊排序，同日保留清單順序。明確標記草稿的項目不納入。

sitemap 重用 `engine/seo.py`，只列官網站內且 canonical 指向自己的文章。既有文章若未在清單填 canonical，會讀取已發布 HTML 的 canonical。
目前 119 篇的 canonical 均指向 Vocus，因此不列入官網 sitemap；並非刪除文章或減少作品統計。

請一併提交資料檔與產物。不要執行舊的全站 `cms/build.py` 來完成這個小 Patch：該流程會重建首頁。
此流程是可重複的手動匯入，不是定時自動抓取；未匯入的新文章不會憑空出現在官網。
