# 雞爸爸網站｜光影誌短影音 Patch

## 內容
- `articles/belly-tap-smile-video.html`：短影音播放頁
- `assets/videos/belly-tap-smile.mp4`：已壓縮的網站版影片，約 169 KB
- `assets/video-posters/belly-tap-smile.jpg`：影片封面截圖
- `ARTICLES-HTML-INSERT.txt`：光影誌列表新增卡片的程式碼

## 上傳方式
1. 解壓縮 ZIP。
2. 將 `articles` 與 `assets` 資料夾依原路徑上傳至 GitHub Repository。
3. 依照 `ARTICLES-HTML-INSERT.txt`，在網站根目錄的 `articles.html` 新增一筆光影誌資料。
4. Commit changes。
5. 等 GitHub Pages 更新後，打開光影誌確認。

## 設計與技術
- 保留既有網站 Header、Footer 與文章頁風格。
- 影片使用 HTML5 `<video>`，可在手機內嵌播放。
- 直式比例 9:16，播放器最大寬度 420px。
- 使用 H.264 MP4，並加入 faststart，適合網頁串流。
- 原始影片約 5.4 MB，網站版約 169 KB。
