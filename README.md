# 雞爸爸生活研究室｜文章列表分流靜態修正包 v4.0

你說得對：GitHub Pages 不會執行 `.py`，所以上一包上傳後不會有效果。

這一包不需要 Python。  
你只要上傳兩個靜態檔案，並在 `articles.html` 加兩行引用即可。

## 上傳檔案

把本包裡這兩個檔案放到 repo：

```text
css/articles-journal-filter.css
js/articles-journal-filter.js
```

## 修改 articles.html

在 `</head>` 前加：

```html
<link rel="stylesheet" href="css/articles-journal-filter.css">
```

在 `</body>` 前加：

```html
<script src="js/articles-journal-filter.js" defer></script>
```

同時把 articles.html 裡所有：

```text
獨家記憶
```

改成：

```text
家庭誌
```

## 修改 index.html 首頁入口連結

請把首頁五大入口改成：

```text
家庭誌：articles.html?journal=family
保健室：articles.html?journal=health
圖書室：articles.html?journal=library
風格誌：articles.html?journal=style
光影誌：articles.html?journal=light
```

## 效果

這兩個靜態檔會在瀏覽器端做這些事：

1. 把頁面上殘留的「獨家記憶」顯示成「家庭誌」
2. 隱藏文章列表中間那排舊分類：
   - 系列
   - 時間軸
   - 搜尋
   - 標籤
   - 幸福點滴
   - 生活研究
   - 棒球札記
   - AI 共創
3. 依 `?journal=` 參數分流文章：
   - `articles.html?journal=family`
   - `articles.html?journal=health`
   - `articles.html?journal=library`
   - `articles.html?journal=style`
   - `articles.html?journal=light`

## 上線後測試

```text
https://beckman0470.github.io/articles.html?journal=family
https://beckman0470.github.io/articles.html?journal=health
https://beckman0470.github.io/articles.html?journal=library
https://beckman0470.github.io/articles.html?journal=style
https://beckman0470.github.io/articles.html?journal=light
```

## 這包不動

- Hero
- LOGO
- 角色圖
- 首頁圖片
- 文章內容檔案
