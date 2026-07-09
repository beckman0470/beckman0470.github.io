# 雞爸爸生活研究室｜首頁五大入口標題修正包 v4.5

這包只修改首頁五大入口上方標題，不動 Hero、不動圖片、不動角色、不動五大入口連結。

## 修改結果

原本：

```text
❦ 探索雞爸爸一家的生活研究 ❦
```

改成：

```text
❦ 生活研究室 ❦
行勝於言 厚德載物
```

格式比照「我們這一家」區塊：主標置中、左右裝飾符號、底下小標置中。

---

## 上傳檔案

請把這兩個檔案上傳到 GitHub repo：

```text
css/homepage-section-title-v4-5.css
js/homepage-section-title-v4-5.js
```

---

## 修改 index.html

在 `</head>` 前加入：

```html
<link rel="stylesheet" href="css/homepage-section-title-v4-5.css">
```

在 `</body>` 前加入：

```html
<script src="js/homepage-section-title-v4-5.js" defer></script>
```

---

## 上線後檢查

```text
https://beckman0470.github.io/index.html?v=section-title-v45
```

---

## 這包不修改

- Hero 圖
- Hero 文案
- LOGO
- 五大入口圖片
- 五大入口連結
- 我們這一家
- 文章列表
