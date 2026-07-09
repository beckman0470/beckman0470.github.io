# 雞爸爸生活研究室｜內容頁底圖移除 hotfix

這包只做一件事：移除內容頁背景底圖污染。

## 不動的地方

- 不改 `index.html`
- 不改首頁 HERO
- 不改首頁入口卡
- 不改首頁人物區
- 不改 LOGO / Header / Footer

## 套用方式 A：最小改法，推薦

把 `css/cdj-remove-content-bg.css` 放進網站的 `css/` 目錄。

然後在以下五個內容頁的 `</head>` 前面加入這行，放在原本 CSS 後面：

```html
<link rel="stylesheet" href="css/cdj-remove-content-bg.css?v=20260709-bg-off">
```

需要加入的頁面：

- `memory.html`
- `clinic.html`
- `library.html`
- `style.html`
- `photo.html`

不要加到 `index.html`。

## 套用方式 B：更小檔案數

也可以直接把 `css/cdj-remove-content-bg.css` 的內容整段貼到 `css/room-theme-v1.css` 最後面。

## 檢查重點

- 內容頁背景不再出現 Prototype 底圖、房間圖、污染截圖。
- 頁面只剩米白／暖色漸層底。
- 文章卡片圖片仍保留。
- 首頁完全不受影響。
