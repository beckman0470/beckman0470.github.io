# 雞爸爸生活研究室｜首頁「生活誌」入口修正包 v3.7

這包只做兩件事：

1. 把首頁中的「獨家記憶」統一改成「生活誌」
2. 把原本「大家一起看相片」那張入口圖，換成新的手帳／生活記錄圖片

## 新圖片

主要置換檔案：

```text
assets/img/category-memory.png
```

尺寸：

```text
1448 × 1086 px
```

圖片內容：溫暖午後的生活手帳、照片、眼鏡、恐龍小物與日常記錄氛圍。  
這張會和 Hero 家庭合照區隔開來，手機版看起來不會那麼像首頁 Hero。

---

## 最小上線方式 A：只覆蓋圖片 + 改文字

### 1. 覆蓋圖片

把本包的：

```text
assets/img/category-memory.png
```

覆蓋到 GitHub repo 的同一路徑。

### 2. 修改首頁文字

在 `index.html` 裡，把首頁出現的：

```text
獨家記憶
```

全部改成：

```text
生活誌
```

目前先不改連結錨點，避免內頁分類路徑斷掉。

---

## 強制刷新方式 B：如果圖片有快取

本包也附：

```text
assets/img/category-life-journal-v37.png
```

你可以把 `index.html` 裡該入口圖片路徑改成：

```html
<img src="assets/img/category-life-journal-v37.png?v=20260708-37" alt="生活誌插圖">
```

然後把入口文字改成：

```text
生活誌
```

---

## 建議同步修正的文字

如果首頁有這段：

```html
<a href="articles.html#memory">獨家記憶</a>
```

建議先改成：

```html
<a href="articles.html#memory">生活誌</a>
```

如果入口卡片內有：

```html
<h3>獨家記憶</h3>
```

改成：

```html
<h3>生活誌</h3>
```

如果 alt 文字有：

```html
alt="獨家記憶插圖"
```

改成：

```html
alt="生活誌插圖"
```

---

## 本包不修改

- Hero
- LOGO
- 保健室
- 圖書室
- 風格誌
- 光影誌
- 我們這一家角色卡
- 其他頁面

---

## 上線後檢查

請開：

```text
https://beckman0470.github.io/index.html?v=20260708-37
```

確認：

- 首頁入口名稱變成「生活誌」
- 原本「大家一起看相片」的圖片已改成手帳生活記錄圖
- 其他四個入口沒有改變
