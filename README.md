# 雞爸爸生活研究室｜首頁 Hero 方案 B 文字排版修正包 v4.1

這包對應你確認的「方案 B」。

## 修正內容

1. 「用科學理解生活 用陪伴記錄成長」只保留一次。
2. 拿掉「科學理解生活」後面的逗號。
3. 詩句改成兩行：

```text
學問求知識，研究生智慧；
覺悟得玄機，了解道真理。
```

4. 重新調整 Hero 文字排版。
5. 不動 Hero 圖、不動 LOGO、不動五大入口、不動角色卡。

---

## 上傳檔案

請把本包中的兩個檔案上傳到 GitHub repo：

```text
css/homepage-hero-scheme-b.css
js/homepage-hero-scheme-b.js
```

---

## 修改 index.html

在 `</head>` 前加入：

```html
<link rel="stylesheet" href="css/homepage-hero-scheme-b.css">
```

在 `</body>` 前加入：

```html
<script src="js/homepage-hero-scheme-b.js" defer></script>
```

---

## 上線後檢查

請開：

```text
https://beckman0470.github.io/index.html?v=hero-scheme-b-v41
```

確認 Hero 文字變成：

```text
用科學理解生活 用陪伴記錄成長

學問求知識，研究生智慧；
覺悟得玄機，了解道真理。
```

---

## 本包不修改

- Hero 圖
- LOGO
- 五大入口圖片
- 五大入口連結
- 我們這一家角色圖
- 文章列表
