雞爸爸生活研究室｜雞窩 16:9 背景＋全站分類導航統一
2026-11-20

已查 GitHub：assets/greetings/v1/room-study-16x9.webp 存在。
問題根源：css/room-activities.css 的雞窩仍有 *3/2 和 aspect-ratio:3/2 舊規則；
js/house-rooms.js 仍指定 room-study.webp。覆蓋 CSS 可以在不改角色與現有 JS 的情況下，
直接啟用新的16:9背景，並修正容器寬度。

如何套用：
1. 下載 GitHub 最新專案 ZIP 並解壓縮，不能拿舊版網站當來源。
2. 將本包 tools/apply.py 放到任何方便的位置（保留本包 css 目錄）。
3. 在有 Python 3 的電腦執行：
   python tools/apply.py "你的網站專案資料夾"
   (上述路徑需依實際位置調整，建議在本包解壓目錄執行)
4. 將修改後的 articles.html、videos.html、rooms.html 及 css/room-width-nav-fix.css
   上傳 GitHub 相同路徑；其餘檔案不要覆蓋。
5. 在瀏覽器使用 Ctrl+Shift+R 更新快取。

也可以手動安裝：上傳 css/room-width-nav-fix.css，然後在上述三個 HTML 的
</head> 前各加一行：
<link rel="stylesheet" href="/css/room-width-nav-fix.css?v=20261120-wide-nav2">

修正範圍：
- 雞窩背景：依 16:9 計算，並強制讀取已上傳的 room-study-16x9.webp。
- 客廳、雞窩、其他房間的分類導覽：共同寬度、邊框、間距與手機排版。
- 根據新圖重設雞窩五個物件熱區的位置（需上線後點擊驗收）。
- 不更動貓咪動畫、角色圖、遊戲邏輯、文章資料。

提醒：這包已進行靜態檢查，並未實際部署或驗收不同螢幕尺寸。
