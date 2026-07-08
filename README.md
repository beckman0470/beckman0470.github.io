# 雞爸爸生活研究室首頁正式上線版實作包

這份實作包以 **已確認的首頁 Prototype** 為基準，內容聚焦在首頁正式上線所需的主要檔案。

## 內容
- `index.html`：首頁主檔
- `css/homepage-launch.css`：首頁樣式檔
- `assets/img/`：本次首頁用到的視覺素材（Hero、五大入口、五位角色、底部 CTA 等）

## 導覽連結設定
- 首頁：`index.html`
- 文章列表：`articles.html`
- 知識圖譜：`knowledge.html`
- 我們一家：`family.html`
- 關於我們：`about.html`
- 工作室：`dashboard.html`
- 搜尋：`search.html`

## 本次首頁重點
1. 依照核准 Prototype 的版型進行實作
2. 保留日系溫暖插畫風格
3. 五大入口改成插圖卡片
4. 角色介紹區塊保留五位角色
5. 「了解更多」按鈕恢復連到 `family.html`
6. 僅提供首頁實作包，不覆蓋整個 Repository

## 建議上線方式
1. 先在本機或測試分支比對現有 `index.html`
2. 複製本包中的 `index.html` 與 `css/homepage-launch.css`
3. 將 `assets/img/` 內資產放入網站對應素材資料夾
4. 調整既有 header / footer 共用元件時，再逐步整合成網站正式元件
