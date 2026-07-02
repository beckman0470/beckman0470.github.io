# PROJECT_STRUCTURE

Chicken Dad Journal 目前是一個 GitHub Pages 靜態網站，但已經包含 CMS / Engine / Studio 的專案雛形。

## 根目錄主要頁面

```text
index.html          首頁
articles.html       故事列表
series.html         系列頁
timeline.html       時間軸
knowledge.html      知識圖譜
family.html         我們一家
search.html         搜尋
tags.html           標籤
subscribe.html      訂閱
dashboard.html      內容儀表板
404.html            找不到頁面
```

## 主要資料夾

```text
assets/             圖片、OG、縮圖等靜態素材
css/                全站 CSS
js/                 前端互動 JavaScript
content/            Markdown 內容與草稿
data/               JSON 資料來源，例如 stories.json
articles/           文章輸出頁
family/             Family Knowledge Pages
engine/             Python 內容產生器與 SEO / 首頁等模組
cms/                Build 入口與 Markdown 處理
studio/             Content Studio、AI Editor、Dashboard、Publishing 工具
templates/          版型與共用元件
docs/               專案文件與版本紀錄
tools/              QA / Cleanup / Hardening 檢查工具
```

## 現況摘要

```text
Top-level directories: 20
HTML files: 38
CSS files: 8
JS files: 19
Footer component: yes
```

## CSS 分層

目前 CSS 來源較多，建議後續整理成明確分層：

```text
css/style.css               基礎設計與主要頁面
css/visual-polish.css       視覺微調
assets/css/typography.css   文章閱讀排版
assets/css/reader-experience.css
assets/css/story-flow.css
```

## JS 分層

```text
js/main.js                  共用互動
js/homepage.js              首頁資料載入
js/search.js                搜尋
js/timeline-page.js         時間軸
js/knowledge-graph.js       知識圖譜
js/dashboard.js             儀表板
```

## 元件化目標

目前已有：

```text
templates/components/footer.html
```

接下來應該建立並統一使用：

```text
templates/components/header.html
templates/components/navigation.html
templates/components/footer.html
templates/layout.html
```

## 開發原則

1. 不再整包覆蓋 Repository。
2. 每次只更新真正修改的檔案。
3. Header / Footer / Navigation 必須元件化。
4. CSS / JS 必須逐步去重。
5. 每次修改後先做線上 QA，再進下一步。
