雞爸爸生活研究室｜主導覽列十項重新排序（2026-11-20）

指定順序（遊戲間第 8 位）：
1 客廳
2 餐廳
3 雞窩
4 鼠窩
5 兔窩
6 廚房
7 浴室
8 遊戲間
9 貼圖小舖
10 認識我們

更新步驟：
1. 上傳並覆蓋 js/site-entry-nav.js。這會更新大部分內頁的共用主導覽列；其他舊功能保持不變。
2. 首頁 index.html 的主導覽是獨立 HTML。找到從 <nav class="nav" aria-label="主要導覽"> 到 </nav> 的完整區塊，替換成 index-nav-snippet.html 的內容。
3. 儲存 GitHub 變更並重新整理（Ctrl+Shift+R）。若共用導覽仍顯示舊版，需在頁面中更換 /js/site-entry-nav.js 的快取版號。

注意：遊戲間導覽網址為 /rooms.html?room=games；本次只調整頂部主選單的順序，不刪遊戲或其他內容。
