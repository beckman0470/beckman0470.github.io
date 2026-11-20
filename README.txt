雞爸爸生活研究室｜雞窩與其他房間全寬一致性修正（2026-11-20）

根因：上一版即使移除 960px，仍透過 max-width:100% 及 100svh 計算，
把雞窩限制在 main#journal-page 的 1180px 主欄中。
其他房間的桌機場景採 viewport-wide breakout，所以兩者寬度不同。

本版只修改 css/room-activities.css：
- 桌機雞窩改用與其他房間相同的 viewport-wide breakout。
- 桌機維持 16:9；手機仍為文章欄內的 3:2 圖片。
- 保留背景左上角標題、五個透明互動連結與原本的人物、貓咪。
- 廚房、浴室的既有 CSS 保留未變。

安裝：
1. 上傳 css/room-activities.css，覆蓋 GitHub 同路徑檔案並 Commit。
2. 強烈建議在 articles.html 將
   /css/room-activities.css?v=20261108-welcome9
   改成
   /css/room-activities.css?v=20261120-fullviewport
   以清掉瀏覽器及 CDN 的舊 CSS 快取。只換 query，不動其他 HTML。
3. 更新後重開 https://beckman0470.github.io/articles.html

驗證：此包已完成 CSS 語法與 ZIP 完整性檢查；正式站的實際瀏覽器畫面尚未驗證。
