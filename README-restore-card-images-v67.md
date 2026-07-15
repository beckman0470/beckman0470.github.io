# CDJ Restore Article Card Images v67

這包是 v66 的修正版，用來符合雞爸爸生活研究室設計原則與 SEO 封面白皮書。

## v66 檢查結果

v66 已經把卡片圖片區塊加回來，但 fallback 使用 `journal.room`，也就是每個分類都可能用同一張房間底圖當卡片圖。這能讓畫面有圖，但不完全符合「文章封面」概念。

## v67 修正

1. 保留 v66 的卡片圖片版型。
2. YouTube 影片卡片使用 YouTube 縮圖。
3. 一般文章依題材自動使用現有封面資產：
   - 家庭／親子：`images/cover-family.svg`、`images/cover-dodo.svg`、`images/cover-dragon-brother.svg`
   - 保健：`images/cover-health.svg`
   - 圖書室：`images/hero-journal.svg`
   - 風格誌／棒球：`images/cover-baseball.svg`
   - 光影誌／AI：`images/cover-ai.svg`
4. 若圖片載入失敗，自動 fallback 到 `assets/story-covers/default.svg`。
5. 不修改首頁、不修改 Header/Footer、不修改 Logo、不修改 Hero。

## 上傳方式

把 zip 解壓後，將以下檔案覆蓋到 GitHub repo 根目錄：

- `articles.html`
- `css/articles-v59.css`

不要把外層資料夾整包丟進 repo。
