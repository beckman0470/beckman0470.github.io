雞爸爸生活研究室｜客廳與雞窩文章歸位、版面精簡（2026-11-20）

這是一個「非破壞性」的小更新包，沒有覆蓋既有的網站或房間 CSS/JS，以免洗掉今天的其他修改。

上傳 GitHub 新增：
  js/layout-slim.js
  css/layout-slim.css

在 videos.html 的 </head> 前加入：
  <link rel="stylesheet" href="/css/layout-slim.css?v=20261120-slim1">

在 videos.html 的 </body> 前加入：
  <script defer src="/js/layout-slim.js?v=20261120-slim1"></script>

如需將同樣規範套用到 rooms.html，也可在 rooms.html 加入相同兩行；目前先以客廳為主，避免誤刪其他房間正在使用的遊戲入口。

結果：
- 客廳不再另外顯示「珍山陳經典語錄」五張文章卡。
- 客廳分類列不再重複顯示這個文章入口。
- 客廳原祖先物件的點擊可直接進入雞窩的珍山陳分類。
- 雞窩所有文章、分類、五個物件連結都保留。

檢查：打開 /videos.html，再點客廳祖先物件，應進入 /articles.html?room=zschen#cards-grid。
