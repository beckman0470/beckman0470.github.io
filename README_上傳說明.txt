雞爸爸生活研究室｜線上祭拜 v7｜入口＋互動修改包

本版修改
1. 持香三拜人物改為同一名雞爸爸的側後方寫實人物，雙手持香、站立／前傾／低頭／回正，四幅姿勢循序播放。雞爸爸只有下巴山羊鬍，沒有上唇鬍鬚。
2. 修飾祭拜背景左下角雞爸爸上唇的鬍鬚，保留山羊鬍；不變動其他人像、神像、文字和祭壇背景。
3. 擲筊兩片左右鏡向，尖角合攏，點擊後短暫出現雙手合筊的圖片，接著兩片分別按照重力、反彈係數、旋轉衰減動畫落地，停止後才出聖筊／笑筊／陰筊。
4. 客廳原本神桌的祖先、神明熱區連到 /worship/；新增兩幅畫作和兩副對聯的四個透明熱區（滑鼠移過才顯示外框），不遮蔽或重畫原有客廳背景。
5. 修正 videos.html 的入口 script 不該放在 <!DOCTYPE html> 後面；應移到 </body> 前。
6. 保留 v6 的金爐、火焰、三種金紙、完成畫面「祭拜圓滿」。

上傳方式（如網站已有 v6）
- 將 ZIP 內 worship/ 整個資料夾（含 index.html、background.png、assets/）覆蓋 GitHub 對應檔案。
- 將 js/worship-entry.js 覆蓋 GitHub 的 js/worship-entry.js。
- 在你的網站根目錄 videos.html 將錯誤放在 <!DOCTYPE html> 後的舊入口刪除，於 </body> 前加入：
  <script defer src="/js/worship-entry.js?v=20261117-v7"></script>
- 也可以用隨附的「客廳入口_一鍵產生videos.html」在瀏覽器讀取最新版 videos.html，下載修正版本再上傳；不要將安裝器檔案直接覆蓋 videos.html。

測試網址：
  https://beckman0470.github.io/videos.html
  https://beckman0470.github.io/worship/

注意：此包不會自動修改 GitHub 遠端倉庫，上傳後才會出現在正式網站。
