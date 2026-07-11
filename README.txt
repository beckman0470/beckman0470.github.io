雞爸爸生活研究室｜五大誌舊版入口統一修復 PATCH

修正範圍
- memory.html  → articles.html?journal=family
- clinic.html  → articles.html?journal=health
- library.html → articles.html?journal=library
- style.html   → articles.html?journal=style
- photo.html   → articles.html?journal=light

修正目的
1. 舊文章頁或舊導覽若仍連到五個獨立頁面，會立即轉到目前統一的新版文章列表。
2. 避免光影誌、家庭誌、保健室、圖書室、風格誌在新舊兩套版型之間切換。
3. 不覆蓋 articles.html、index.html、文章資料與封面，降低舊 PATCH 回退內容的風險。
4. 舊網址仍可繼續使用，外部連結不會失效。

上傳方式
將 ZIP 解壓縮後，把五個 HTML 檔上傳到 GitHub 專案根目錄，覆蓋同名檔案並 Commit。
