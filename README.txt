雞爸爸生活研究室｜全站遊戲統一更新包 2026-11-20

目的：將房間內嵌遊戲和獨立遊戲頁的「遊戲身分識別、標題與操作框架、圓角邊框、主題色、手機顯示」統一成浴室兩款遊戲的設計語言。

【重要】因網站當天持續更新，本包絕不使用舊版遊戲 HTML 覆蓋網站，而是從「你目前最新的 GitHub 專案」產生精準更新檔，原始遊戲程式和素材不修改。

包含：
- css/unified-game-ui.css：共用遊戲外觀
- js/unified-game-ui.js：遊戲頁識別及返回房間入口
- tools/apply_game_ui.py：從最新網站資料夾產生可直接上傳的 ZIP
- GAME_AUDIT.txt：套用範圍及驗收清單

【套用方法】
1. 到 https://github.com/beckman0470/beckman0470.github.io ，選 Code → Download ZIP，取得最新程式。
2. 解壓縮 ZIP 到電腦，例如「beckman0470.github.io-main」資料夾。
3. 在 Windows PowerShell 先 cd 到本包的資料夾，執行：
   py tools/apply_game_ui.py "C:\\你的路徑\\beckman0470.github.io-main"
   或 python tools/apply_game_ui.py "C:\\你的路徑\\beckman0470.github.io-main"
4. 會產生 ChickenDad_GameUI_ReadyToUpload.zip。解壓後將檔案以相同路徑覆蓋到 GitHub 專案（或用 Git 直接提交）。
5. GitHub Pages 部署後清除快取驗收。原專案不會被本工具修改。

請勿直接把本 ZIP 當成可以無步驟覆蓋的成品，因為 HTML 必須從最新網站產生，才不會覆蓋今天其他新增功能。

【本包保護措施】
- 遊戲 JS、動畫、音效、題目、得分邏輯沒有改動。
- 不改房間背景、角色位置、文章與影片卡片。
- 同一頁只插入一次新的 CSS / JS。
- 已檢查打包腳本及共用程式語法；未完成所有遊戲的正式站互動實測。
- GitHub 連接器寫入曾回應 403，故沒有直接修改正式站。
