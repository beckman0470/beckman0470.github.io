雞爸爸生活研究室｜線上祭拜 v6

本版改動：
① 更換寫實金爐（金屬、爐門、火灰），不再用 CSS 漸層拼成假爐子。
② 焚燒時動態火光、煙霧及火星；燒完約 4.5 秒才計數並提示焚化完成。
③ 完成畫面的「敬　禮」改成「祭拜圓滿」，未進行實際祭拜時顯示「尚未完成祭拜」。
④ 保留 v5 靜態祭壇背景、香爐下方祈福文字、折金紙、擲筊、祖先／神明金紙限制。
⑤ 客廳入口沿用原本 js/worship-entry.js。

若網站已有 v5：
只需把 ZIP 中整個 worship/ 資料夾覆蓋到 GitHub 儲存庫根目錄下的 worship/。
其中 worship/index.html 和新增的 worship/assets/furnace-idle.webp、furnace-fire.webp 都必須一起上傳。

若是首次安裝：
請將 ZIP 內 worship/ 與 js/worship-entry.js 放到網站同路徑。
另外確認網站根目錄 videos.html 的 </body> 前已放入：
<script defer src="/js/worship-entry.js?v=20261117-v6"></script>
切勿將該 script 放到 <!DOCTYPE html> 和 <html> 之間。

開啟： https://beckman0470.github.io/worship/
請注意：本 ZIP 尚未替你直接更新正式網站，需上傳 GitHub 才會生效。
