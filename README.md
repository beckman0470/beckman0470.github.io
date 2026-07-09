雞爸爸生活研究室｜內容頁一致版 v5.9

這份套件為五大內容頁的真正一致版，重點如下：
1. 上方 LOGO 與導覽列位置比照首頁。
2. 只保留首頁同樣的六個上方導覽項目：首頁／家庭誌／保健室／圖書室／風格誌／光影誌。
3. 五個內容頁全部共用同一套 HTML + CSS 模板。
4. 五個內容頁各自有不同房間感背景插畫：家庭誌／保健室／圖書室／風格誌／光影誌。
5. 每個內容頁都有：標題、副標、分類標籤、文章卡片區、按鈕、關於區塊。
6. 全站純靜態，不需要 Python，可直接上傳到 GitHub Pages 使用。

使用方式
- 將本資料夾內容覆蓋到網站專案根目錄對應位置。
- 重點檔案：articles.html、css/articles-v59.css、assets/img/*
- 頁面連結：
  - 家庭誌：articles.html?journal=family
  - 保健室：articles.html?journal=health
  - 圖書室：articles.html?journal=library
  - 風格誌：articles.html?journal=style
  - 光影誌：articles.html?journal=light

設計原則對應
- Prototype 先行、實作需與 Prototype 一致：本版採「同一套模板 + 五個不同房間背景」方式，避免上一版只換底圖而沒有整體版型一致。
- GitHub / GitHub Pages 可直接使用：不依賴任何後端或 Python。
- LOGO / Header / Nav 一致：內容頁導覽與首頁對齊。
