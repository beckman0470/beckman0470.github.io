雞爸爸生活研究室｜線上祭拜 v5 功能包

【本次修改】
1.「祈福／追思的話」文字輸入區，調整至點香面板的香爐圖像正下方（可不填、不上傳、不儲存）。
2.「鞠躬」改為動畫：祭拜者從腰部前傾、停頓、起身，一次操作一拜，三拜後才可插香。
3. 防連點：鞠躬動畫中暫時停用鞠躬按鈕，完成後才能按下一次。
4. 祭拜背景維持你指定的清晰橫式原圖，不加入背景 GIF，也不更動擲筊／金紙規則。
5. 祖先只用刈金；神明可用刈金、壽金、福金。金紙逐張對折、可累積後一次焚化。

【如何更新你已上傳 v4 的網站】
方法 A（最安全、最簡單）：只需用 ZIP 裡的 worship/index.html 覆蓋 GitHub 專案同位置的舊檔。
其他已上傳的 /worship/background.png、/worship/assets/ 和 js/worship-entry.js 均無須更動。

方法 B（首次安裝）：將本 ZIP 解壓後，依資料夾路徑上傳 worship/ 與 js/worship-entry.js。
在 videos.html 的 </body> 前加一行：
<script defer src="/js/worship-entry.js?v=20261117-v5"></script>

目前 GitHub 可讀取但寫入權限不足，所以沒有替你直接修改上線網頁。

【驗證網址】
祭拜頁 https://beckman0470.github.io/worship/
客廳   https://beckman0470.github.io/videos.html

【注意】
文字僅留在目前開啟頁面，不寫入伺服器；擲筊為隨機模擬。
