# REFACTOR_TODO

## v5.7.1 Sprint 1：Architecture Documentation

狀態：進行中

### 已完成

- [x] 建立 `PROJECT_STRUCTURE.md`
- [x] 建立 `REFACTOR_TODO.md`
- [x] 建立目前 Repository 結構盤點
- [x] 確認後續不再整包覆蓋 Repository

---

## Sprint 2：Header / Footer Component Sync

優先度：最高

### 目標

把 Header / Footer / Navigation 從各 HTML 中抽出，改由共用元件維護。

### 待辦

- [ ] 建立 `templates/components/header.html`
- [ ] 建立 `templates/components/navigation.html`
- [ ] 檢查 `templates/components/footer.html`
- [ ] 讓首頁與文章頁共用同一份 Footer
- [ ] 讓 Build 後的 `index.html` 不再出現舊 Footer
- [ ] QA：首頁、文章頁、Family、Knowledge、Dashboard Footer 是否一致

---

## Sprint 3：CSS Dependency Cleanup

優先度：高

### 目標

整理 CSS 引用順序，避免同一樣式被多個檔案覆蓋。

### 待辦

- [ ] 盤點所有 HTML 的 CSS 引用
- [ ] 確認 `css/style.css` 的責任範圍
- [ ] 確認 `css/visual-polish.css` 是否全站需要
- [ ] 將文章頁專用 CSS 限定於文章頁
- [ ] 移除重複或未使用 CSS

---

## Sprint 4：JS Dependency Cleanup

優先度：中

### 目標

整理 JS 載入與功能責任，避免重複載入與不必要的全站執行。

### 待辦

- [ ] 盤點所有 HTML 的 JS 引用
- [ ] `homepage.js` 限定首頁
- [ ] `search.js` 限定搜尋頁
- [ ] `dashboard.js` 限定 Dashboard
- [ ] `reader-experience.js` 限定文章頁
- [ ] local scripts 全部使用 `defer`

---

## Sprint 5：Build Pipeline Refactor

優先度：中高

### 目標

讓 `cms/build.py` 成為唯一 Build 入口，並由它組裝頁面元件。

### 待辦

- [ ] 檢查 `cms/build.py`
- [ ] 檢查 `engine/homepage.py`
- [ ] 檢查 `cms/templates.py`
- [ ] 建立 layout render helper
- [ ] Build 後自動產生 sitemap / RSS / JSON-LD

---

## Sprint 6：Production QA

優先度：高

### 目標

建立上線前 QA checklist。

### 待辦

- [ ] 首頁桌機版
- [ ] 首頁手機版
- [ ] Footer 一致性
- [ ] Header 一致性
- [ ] 文章閱讀體驗
- [ ] 搜尋
- [ ] Knowledge Graph
- [ ] Dashboard
- [ ] Sitemap
- [ ] Robots
