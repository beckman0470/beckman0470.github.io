# ChickenDadJournal Hero Balance Hotfix 20260708

## 修正目的

依照畫面回饋修正首頁橫幅：

- 桌機 100% 縮放時，右側兔阿嬤與主要角色不再被 `object-fit: cover` 裁切。
- 移除主視覺圖上的覆蓋標籤、標語與按鈕，避免蓋住底圖左側詩句或人物。
- 將首頁標語與 CTA 移到圖片下方獨立區塊，讓圖片、文字、按鈕各自有清楚層次。
- 修正首頁角色小圖的 CSS 圖片相對路徑。

## 覆蓋檔案

- `index.html`
- `css/room-theme-v1.css`

## 不會動

- `content/`
- `articles/`
- `assets/`
- `about.html`
- `memory.html`
- `clinic.html`
- `library.html`
- `style.html`
- `photo.html`
- `首頁主視覺圖片本身`
- `Logo 圖片`

## 檢查標記

可在 `index.html` 原始碼搜尋：

```text
CDJ_HERO_BALANCE_HOTFIX_20260708
```
