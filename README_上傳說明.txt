雞爸爸生活研究室｜線上祭拜 v5【含客廳神桌入口】

內容：
- worship/index.html：線上祭拜 v5（祈福文字置於香爐下、人物鞠躬三次）
- worship/background.png：你指定的清晰橫式神桌背景
- worship/assets/：刈金、對折金紙與寫實木筊杯
- js/worship-entry.js：客廳「點香祭拜」以及神桌點擊入口
- 客廳入口_一鍵產生videos.html：免寫程式的入口安裝器
- install_entry.py：有 Python 時可從公開 GitHub 取得客廳原始碼並加入入口

最快安裝方式（不必打字改程式）：
1. 解壓本 ZIP。
2. 雙擊「客廳入口_一鍵產生videos.html」，點「產生可直接上傳的 videos.html」；瀏覽器會下載 videos.html。
3. 把新產生的 videos.html、ZIP 內 js/worship-entry.js、整個 worship 資料夾（包含 assets 與 background.png）上傳到 GitHub 儲存庫 beckman0470/beckman0470.github.io 對應的路徑。上傳前請注意：videos.html 會覆蓋既有客廳頁，因此建議先在 GitHub 保留一份舊版備份。
4. GitHub Pages 更新完成後： https://beckman0470.github.io/videos.html 點神桌，或點「點香祭拜」即可進入 https://beckman0470.github.io/worship/。

重要：單純將 ZIP 上傳到 GitHub 不會自動解壓縮。必須先解壓後照路徑放置檔案。

替代作法：如果已經把 worship/ 和 js/worship-entry.js 上傳 GitHub，只需打開 GitHub 的 videos.html，在 </body> 前加入：
<script defer src="/js/worship-entry.js?v=20261117-v5"></script>

說明：金紙規則：祖先僅刈金、神明刈金／壽金／福金；一張張對折疊放，集中入爐；擲筊為模擬，祈福內容不傳送至伺服器。
此 ZIP 為可上傳的檔案組合，並不代表已直接部署到網站。
