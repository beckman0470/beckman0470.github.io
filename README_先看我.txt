雞爸爸生活研究室｜直接上傳修正包（2026-11-20）

這包不需執行 BAT、不需 Python，也不需先下載 GitHub ZIP。

操作方法：
1. 解壓縮本 ZIP。
2. 在 GitHub 專案中，將 ZIP 內七個檔案依相同資料夾路徑覆蓋。
3. 等 GitHub Pages 部署後，按 Ctrl+Shift+R 重新整理。

本包修正：
- 首頁十個主選單順序；遊戲間第 8 個。
- 雞窩以既有 /assets/greetings/v1/room-study-16x9.webp 套用 16:9 書房背景和寬度。
- 客廳、雞窩、房間頁分類列寬度與留白。
- 客廳珍山陳列表去重（保留雞窩文章）。
- 共用遊戲視覺套用到會載入 js/site-entry-nav.js 的主要房間及遊戲頁。

重要限制：
- 其他完全獨立、沒有載入 js/site-entry-nav.js 的遊戲（例如部分美髮、燒肉、速食店頁面），此包不會強行覆蓋它們的遊戲內容，避免破壞近期功能。這些遊戲的內部畫面仍需個別驗收與整合。
- 書房的五個互動點與人物、兩隻貓保留，但 16:9 圖案點位要上線後實測。
- 本包只做 HTML/CSS/JS 靜態檢查，沒有宣稱正式站已部署或已實機驗證。
- 如果 GitHub 自此後已有更新上述三個既有檔案，請勿覆蓋較新的版本。

檔案：
index.html
js/site-entry-nav.js
css/room-activities.css
css/layout-slim.css
js/layout-slim.js
css/unified-game-ui.css
js/unified-game-ui.js
