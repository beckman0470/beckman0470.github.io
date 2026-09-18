# 最新文章與延伸閱讀

資料來源仍為 `data/articles.json`，不修改文章 metadata、原文、canonical、JSON-LD、既有導覽或分析同意機制。

## 行為

- 首頁依 date 由新到舊顯示 6 篇；同日維持目錄順序。沿用既有目錄規則，status 缺省視為舊版已發布資料，明確草稿不展示。
- 同主題最多 4 篇；至少需要兩個具辨識力的共同標籤，或一個共同標籤搭配同分類／同系列。常見品牌、家人名與出現於至少 35% 文章的標籤不作為主題依據。
- 分數為共同標籤的稀有度加權總和（每個上限 4），同分類加 1，同系列加 2。平手才按日期排序，無文章年齡限制。
- 同系列比較 series、seriesTitle 的正規化值，最多 4 篇，排除本文與同主題區已選文章。
- 目標為 2–4 篇同主題文章；metadata 不足時可少於 2 篇，零篇時顯示探索全部文章連結，不以無關新文補數。
- 舊網址不在目錄時，優先以完全一致的文章標題對應目錄，再使用頁面既有標籤／分類資訊。推薦候選仍只來自公開目錄。
- URL 忽略 query/hash 去重，拒絕非 HTTP(S) URL；文字以 textContent 建立。
- select_content 只在既有 GA4 已啟用且未被停用時發送，區分 latest、related、series；沒有社群排程或自動重發。
- 目錄讀取失敗時保留首頁「瀏覽最新文章」連結，文章正文仍可閱讀。

## 檔案

- `index.html`：Hero 下方加入最新文章容器及共用資源。
- `js/article-recommendations.js`：目錄篩選、排序、推薦、呈現與點擊事件。
- `css/article-recommendations.css`：限定於新區塊的樣式，沿用網站配色／字型；首頁 3/2/1 欄、文章 2/1 欄。
- `articles/*.html`：138 篇現有文章頁加入共用 JS/CSS；`articles/family.html` 是人物介紹，未更動。
- `tools/article-only/publish_article.py`、`templates/articles/article-publishing-template.html`、`cms/templates.py`：新文章沿用相同資源。
- `tools/test-article-recommendations.cjs`：推薦回歸測試。

## 驗證（2026-09-18）

- 推薦單元測試通過：排除本文、草稿、重複網址、不安全 URL；2020 年舊文可入選；seriesTitle 可匹配。
- 131 篇目錄文章均經瀏覽器載入，推薦排除本文且兩區無重複。
- 首頁及文章於 320、390、768、1440px 無水平溢出；桌機／手機截圖已檢視。
- 拒絕追蹤時無 Google script；拒絕／啟用狀態下推薦點擊事件行為正確。
- 目錄 503 故障備援通過。
- `studio/release_check.py` 通過。
- 既有 `test_catalogue.py` 有固定日期文章必須最新的過期斷言；既有 `tools/qa_check.py` 要求現已不存在的 contact 錨點。兩項在原始 f76b903 版本亦同樣失敗，未在本次變更中修改這些舊測試或重建首頁。
