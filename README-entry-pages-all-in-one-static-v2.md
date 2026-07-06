# ChickenDadJournal Entry Pages All-in-One Static V2

這包是入口頁資料化修正版，目標是一次解決：

- 故事頁分類篇數沒有吃到資料，AI 共創顯示 0 篇
- 典藏作品卡片無法點進完整原文
- 系列頁只有文字與連結、沒有卡片版面
- 時間軸仍是舊示意內容
- 時間軸月份需要可收放

## 這包會覆蓋

- articles.html
- series.html
- timeline.html
- css/content-archive.css
- css/v7-2-story.css
- content/content-index.json
- articles/<slug>.html × 24
- content/works/<slug>/meta.json × 24
- content/works/<slug>/article.md × 24

## 這包不會動

- index.html
- family.html
- about.html
- Header / Footer / Logo / 首頁版面
- assets/
- css/homepage-v2.css

## 統計

- 總作品數：24
- 幸福點滴：8
- 生活研究：9
- 棒球札記：5
- AI 共創：2

## 技術策略

三個入口頁都已經直接預渲染成靜態 HTML，不依賴 fetch()，也不需要 js/content-archive.js 才能顯示內容。
同時在三頁內嵌 critical CSS，即使 css/content-archive.css 沒有被瀏覽器即時更新，版面仍會保持卡片樣式。

頁面原始碼可搜尋：
`CDJ_ENTRY_STATIC_V2_20260706`
確認部署到的是本版。
