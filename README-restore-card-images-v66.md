# CDJ Restore Article Card Images v66

這包修正「內容頁文章卡片圖片不見」的問題。

## 原因

目前 GitHub 上的 `articles.html` 在產生 `.story-card` 時，只輸出：

- journal / 日期
- 標題
- 摘要
- tags

沒有輸出任何 `<img>`，所以卡片看起來全部沒有圖。這不是正常狀態。

## 修正內容

1. `articles.html`
   - 每張卡片加回圖片區塊 `.card-media`。
   - 若文章有 `cover`，優先使用文章 cover。
   - 若文章沒有 `cover`，自動使用該分類的乾淨房間底圖 `journal.room` 當卡片圖。
   - YouTube 影片卡片使用 YouTube 縮圖。

2. `css/articles-v59.css`
   - 新增 `.card-media` 與 `.card-media img` 樣式。
   - 保留 v61 乾淨底圖，不回復污染圖。

## 上傳方式

解壓後把以下檔案覆蓋到 GitHub repo 根目錄：

- `articles.html`
- `css/articles-v59.css`

不要把外層資料夾整包丟進 repo。

## 上線後檢查

- `https://beckman0470.github.io/articles.html?journal=light`
- `https://beckman0470.github.io/articles.html?journal=family`

卡片應該會重新出現圖片。
