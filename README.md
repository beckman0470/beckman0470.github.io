# 家庭誌封面修復＋NAS 分類調整 PATCH

本 PATCH 以目前線上 `articles.html` 的近期累積版本為基礎，僅做下列調整：

1. 補上〈雞爸爸和鼠姊姊的半小時夏天〉列表封面。
2. 補上〈鼠姊姊的中班畢業典禮：唱跳、氣球與一整天的願望清單〉列表封面。
3. 將〈我與我的老夥伴：納斯 NAS〉由「保健室」移至「風格誌」。
4. 所有尚未設定專屬 `cover` 的文章卡，改用 `assets/story-covers/default.svg` 作為保底圖片，避免再出現整塊空白。

## 上傳方式

解壓縮後，將以下內容上傳至 GitHub 專案根目錄並覆蓋同名檔案：

- `articles.html`
- `assets/story-covers/half-hour-of-summer.webp`
- `assets/story-covers/graduation-day.webp`

Commit 後等待 GitHub Pages 更新；若瀏覽器仍顯示舊版，可使用 Ctrl+F5 強制重新整理。
