# 雞爸爸生活研究室｜導覽列直接靜態修正包 v4.6

你說得對，v4.4 沒有真正處理到。  
原因是 v4.4 只是提供 CSS 與替換片段，如果沒有每一頁都確實引用或替換，頁面就不會變。

這次 v4.6 是「靜態 JS/CSS 直接修正包」，不用 Python。  
每頁只要加兩行，瀏覽器載入後會直接把上方列重組成正確版本。

---

## 修正目標

上方列統一只保留：

```text
首頁 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
```

移到底部：

```text
知識圖譜 / 我們一家 / 關於 / 搜尋 / VOCUS
```

同時會把頁面上殘留的：

```text
獨家記憶
```

顯示成：

```text
家庭誌
```

---

## 上傳檔案

請把這兩個檔案上傳到 repo：

```text
css/nav-direct-fix-v4-6.css
js/nav-direct-fix-v4-6.js
```

---

## 每個頁面都加兩行

請至少在這些頁面加：

```text
index.html
articles.html
knowledge.html
family.html
about.html
```

### 在 `</head>` 前加：

```html
<link rel="stylesheet" href="css/nav-direct-fix-v4-6.css">
```

### 在 `</body>` 前加：

```html
<script src="js/nav-direct-fix-v4-6.js" defer></script>
```

---

## 上線後檢查

```text
https://beckman0470.github.io/index.html?v=nav46
https://beckman0470.github.io/articles.html?journal=family&v=nav46
https://beckman0470.github.io/knowledge.html?v=nav46
https://beckman0470.github.io/family.html?v=nav46
https://beckman0470.github.io/about.html?v=nav46
```

---

## 注意

這包不改圖片、不改 Hero、不改文章內容。  
它只處理導覽列、底部輔助連結，以及「獨家記憶」顯示文字。
