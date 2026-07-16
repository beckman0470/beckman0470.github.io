# CDJ Restore Article Card Images v68｜Whitepaper Safe Patch

這包是以使用者上傳的目前 GitHub zip 為基準製作的「文章卡片圖片復原包」。

## 這次修正的核心

目前 `articles.html` 的卡片雖然有 `<img>` 區塊，但多數圖片被導到通用圖示，例如 `images/cover-ai.svg`、`images/cover-baseball.svg`，因此看起來像「文章卡片圖片全部跑掉」。

本版依照雞爸爸生活研究室白皮書原則復原：

- 一篇文章，一張代表插圖。
- 優先使用 `assets/story-covers/<slug>.*` 的正式文章封面。
- 不用內容頁房間底圖充當文章卡片圖。
- 不回到舊的污染圖。
- 不修改首頁、Logo、Hero、Header/Footer。
- 保留目前內容頁乾淨底圖 v61。
- YouTube 影片卡片使用 YouTube 縮圖。
- 找不到正式封面的文章才使用 `assets/story-covers/default.svg`。

## 修改檔案

- `articles.html`
- `css/articles-v59.css`
- `assets/story-covers/*`：只附上這次卡片實際會用到的封面檔，避免 GitHub 遺漏素材。
- `articles/ai-makeover-rollover.html`：目前上傳 zip 中此文章頁不存在，但列表有連結，因此補一個不 404 的佔位文章頁。

## 上傳方式

請解壓後，將內容直接覆蓋到 GitHub repo 根目錄。

確認檔案位置應該是：

```text
articles.html
css/articles-v59.css
assets/story-covers/temperature-of-now.webp
assets/story-covers/picture-book-hand-courage.webp
...
```

不要把外層資料夾整包丟進 repo。

## 上線後請檢查

- `https://beckman0470.github.io/articles.html?journal=family`
- `https://beckman0470.github.io/articles.html?journal=health`
- `https://beckman0470.github.io/articles.html?journal=library`
- `https://beckman0470.github.io/articles.html?journal=style`
- `https://beckman0470.github.io/articles.html?journal=light`
