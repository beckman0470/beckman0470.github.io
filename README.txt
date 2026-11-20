雞爸爸生活研究室｜影片 / 文章 / 遊戲三種視覺識別（2026-11-20）

這次改動：
影片：藍色，▶ 播放符號，影片卡片藍色識別。
文章：暖米色，書頁符號，文章卡片暖色識別。
遊戲：薄荷綠＋粉色，與浴室兩款遊戲相同的圓角、漸層標題、統一操作列和遊戲容器。

安裝（GitHub）：
1. 覆蓋 rooms.html
2. 新增 css/content-identity.css
3. 新增 js/content-identity.js

不修改原有遊戲、影片播放程式或文章資料。
浴室的兩款遊戲內部維持原樣，其他房間的「內嵌遊戲框」採同樣的視覺語言。

如果要讓文章主頁（articles.html）和客廳影片主頁（videos.html）的卡片也套用相同識別，
在兩個 HTML 的 </head> 前加入：
<link rel="stylesheet" href="/css/content-identity.css?v=20261120-types1">
在 </body> 前加入：
<script defer src="/js/content-identity.js?v=20261120-types1"></script>

這個 ZIP 的 rooms.html 以 2026-11-20 目前讀到的 GitHub 版本為基礎。
上傳前若 rooms.html 同時有其他人更新，應先比對避免蓋掉新功能。

註：本包已完成 CSS/JS/ZIP 檔案結構檢查，正式站與手機畫面仍待驗收。
