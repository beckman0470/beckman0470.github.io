雞爸爸生活研究室｜線上祭拜 v4（可上傳 GitHub Pages）

【不覆蓋原本客廳的安全安裝方式】
1. 解壓 ZIP，把 worship/ 資料夾與 js/worship-entry.js 放到 GitHub 儲存庫根目錄對應位置。
2. 打開 GitHub 上的 videos.html，找到最底下的 </body>，在前一行加入：
   <script defer src="/js/worship-entry.js?v=20261117-v4"></script>
3. 提交變更。客廳原本神桌按下即可進入 /worship/；在客廳內容入口旁也會出現「點香祭拜」。
   也可在本機倉庫根目錄執行 python install_entry.py，自動完成第 2 步。
4. 測試網址：https://beckman0470.github.io/worship/
   客廳：https://beckman0470.github.io/videos.html

【功能】
固定使用你指定的橫式祭拜背景，不使用背景 GIF。
祖先只燒刈金；神明可以燒刈金、壽金、福金。
刈金顯示寫實紙錢堆；點一次折一張，會在中央顯示一張張獨立疊高；可累積多張，一次點爐子燒完。
擲筊更換寫實筊杯；可選祖先爐／神明爐點香，鞠躬三次。

【注意】
本 ZIP 含獨立祭拜頁與客廳入口外掛，不直接覆蓋 videos.html、house-rooms.js 或 room-activities.js，降低破壞原本客廳的風險。
必須執行第 2 步的單行引用，否則雖然 /worship/ 可以開啟，客廳的點擊入口不會自動出現。
此為前端模擬功能，未經宗教儀式認證；文字不會上傳到伺服器。
