# 雞爸爸生活研究室｜首頁正式上線包

這份上線包以 **最新確認的 Prototype** 為唯一視覺基準，目標是做到：

> Prototype 看到什麼，網站就是什麼。

## 內容
- `index.html`：首頁主檔
- `css/homepage-official.css`：首頁樣式
- `assets/img/`：已切好的首頁視覺資產
  - `hero-full.png`：Hero 完整主視覺（滿版不動）
  - `category-*.png`：五大入口卡
  - `family-*.png`：五位角色卡
  - `cta-full.png`：底部 CTA 區塊
  - `prototype-reference.png`：核准 Prototype 參考圖

## 連結設定
### 導覽列
- 首頁：`index.html`
- 文章列表：`articles.html`
- 知識圖譜：`knowledge.html`
- 我們一家：`family.html`
- 關於我們：`about.html`
- 工作室：`dashboard.html`
- 搜尋：`search.html`

### 五大入口
- 獨家記憶：`articles.html#memory`
- 保健室：`articles.html#health`
- 圖書室：`articles.html#library`
- 風格誌：`articles.html#style`
- 光影誌：`articles.html#light`

### 角色介紹
- 雞爸爸：`family.html#dad`
- 鼠媽媽：`family.html#mom`
- 鼠姊姊：`family.html#dodo`
- 龍弟弟：`family.html#dragon`
- 兔阿嬤：`family.html#ama`

## 設計原則落地
1. **Hero 滿版圖片不動**：使用 `hero-full.png`，保留 Prototype 的完整主視覺。
2. **五大入口全部可點擊**：整張卡片都是連結。
3. **角色卡全部可點擊**：整張卡片都連到 `family.html` 的角色錨點。
4. **Prototype = 上線版**：本包素材全部取自核准的 Prototype 畫面，避免實作時跑版。

## 建議上線方式
1. 在測試分支先替換首頁檔案
2. 將 `index.html` 放到網站根目錄
3. 將 `css/homepage-official.css` 放入 `css/`
4. 將 `assets/img/` 內圖檔放入網站對應素材資料夾
5. 上線前再用 Prototype 與實際頁面逐項比對
