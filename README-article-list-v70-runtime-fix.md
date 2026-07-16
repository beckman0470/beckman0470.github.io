# CDJ Article List v70 Runtime Fix｜2026-07-16

這包修正 v69 上線後內容頁文章卡片可能不顯示／圖片不對的問題。

## 問題原因

目前 `articles.html` 已經有最新文章列表，但下方 JavaScript 還殘留舊版 `autoCover()`：

- 舊版 `autoCover()` 會忽略每篇文章的 `cover:'assets/story-covers/...'`，改用 `images/cover-ai.svg`、`images/cover-baseball.svg` 等通用圖示。
- 卡片產生區有呼叫 `autoCoverPosition(item)`，但舊版函式區沒有定義 `autoCoverPosition()`，可能造成 JavaScript 中斷，文章卡片無法正常渲染。

## 本版修正

- `autoCover(item)` 改為優先使用每篇文章指定的 `item.cover`。
- 補上 `autoCoverPosition(item)`。
- 不改首頁。
- 不改 Logo / Hero / Header / Footer。
- 不改五大內容頁底圖。
- 不改文章列表數量。
- 不回到舊的通用封面圖示邏輯。

## 上傳方式

解壓後，將 `articles.html` 直接覆蓋到 GitHub repo 根目錄。
不要把外層資料夾整包丟進 repo。
