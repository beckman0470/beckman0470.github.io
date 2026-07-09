# 雞爸爸生活研究室｜文章列表直接替換版 v4.2

這包解決目前三個問題：

1. 五大入口連到文章列表後看到的文章都一樣。
2. 文章列表中間舊卡片還在。
3. 「獨家記憶」沒有全部改成「家庭誌」。

## 使用方式

把本包裡的：

```text
articles.html
```

直接覆蓋 GitHub repo 根目錄的 `articles.html`。

不用執行 Python。
不用再另外新增 JS。
不用再另外新增 CSS。

## 分流網址

- 全部文章：`articles.html`
- 家庭誌：`articles.html?journal=family`
- 保健室：`articles.html?journal=health`
- 圖書室：`articles.html?journal=library`
- 風格誌：`articles.html?journal=style`
- 光影誌：`articles.html?journal=light`

## 本版分類數

- 家庭誌：7 篇
- 保健室：7 篇
- 圖書室：3 篇
- 風格誌：7 篇
- 光影誌：2 篇

合計：26 篇

## 這版已移除

- 系列
- 時間軸
- 搜尋
- 標籤
- 幸福點滴
- 生活研究
- 棒球札記
- AI 共創

## 上線後檢查

```text
https://beckman0470.github.io/articles.html?v=v42
https://beckman0470.github.io/articles.html?journal=family&v=v42
https://beckman0470.github.io/articles.html?journal=health&v=v42
https://beckman0470.github.io/articles.html?journal=library&v=v42
https://beckman0470.github.io/articles.html?journal=style&v=v42
https://beckman0470.github.io/articles.html?journal=light&v=v42
```

## 注意

這包只覆蓋文章列表頁，不動首頁 Hero、不動 LOGO、不動圖片。
首頁五大入口如果還沒有連到 `articles.html?journal=...`，仍需另外改首頁連結。
