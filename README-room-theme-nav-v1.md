# ChickenDadJournal Room Theme Navigation V1 — 2026-07-08

本包依照已確認的 Prototype 與設計原則改版：

- 上方導覽列改為：首頁｜獨家記憶｜保健室｜圖書室｜風格誌｜光影誌
- 首頁主視覺使用既有 `assets/step1a-redo/hero.png`，滿版呈現
- 圖片標語直接覆蓋在主視覺上，不再使用 40% / 60% 切分
- 下方五張入口卡分別對應五大入口
- 角色介紹保留五位家庭角色與「他們是雞爸爸生活研究室的靈魂人物。」
- 頁尾文案：精選 VOCUS，追蹤雞爸爸一家的生活。

## 會覆蓋

- `index.html`
- 根目錄既有 HTML 頁面 Header 導覽
- `articles/*.html` Header 導覽

## 會新增

- `memory.html`
- `clinic.html`
- `library.html`
- `style.html`
- `photo.html`
- `css/room-theme-v1.css`
- `README-room-theme-nav-v1.md`
- `sitemap.xml`（新增五大入口頁 URL）

## 不會動

- `content/`
- `assets/`
- `articles/` 文章內文主體
- `css/homepage-v2.css`
- Logo 圖片
- 首頁主視覺圖片

## Self-check

- 主導覽標記：`CDJ_ROOM_NAV_V1_20260708`
- 首頁標記：`CDJ_ROOM_HOME_V1_20260708`
- 新增房間頁標記：`CDJ_ROOM_PAGE_V1_20260708`
- 沒有生成新圖片
- 沒有使用 emoji Logo
- 首頁主視覺來源：`assets/step1a-redo/hero.png`
- 文案未使用「不是……而是……」框架
