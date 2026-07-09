# 雞爸爸生活研究室｜導覽列與底部連結統一包 v4.4

你說得對，現在知識圖譜頁面沒有跟其他頁面一致，而且之前的原則是：

> 上方列只放主要五大入口；知識圖譜、我們一家、關於放到底部輔助連結。

這包就是把規則收斂成固定版本。

---

## 一、上方列統一成這 6 個

```text
首頁 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
```

上方列不再放：

```text
文章列表 / 知識圖譜 / 我們一家 / 關於 / 工作室
```

文章列表仍然存在，但它是五大入口背後的分流頁，不需要放在主導覽。

---

## 二、底部輔助連結統一放這些

```text
知識圖譜 / 我們一家 / 關於 / 搜尋 / VOCUS
```

---

## 三、要上傳的檔案

請上傳：

```text
css/nav-footer-unify-v4-4.css
```

---

## 四、每個頁面都要加 CSS

在以下頁面的 `</head>` 前加入：

```html
<link rel="stylesheet" href="css/nav-footer-unify-v4-4.css">
```

建議至少改這些頁：

```text
index.html
articles.html
knowledge.html
family.html
about.html
```

---

## 五、建議直接替換上方列 HTML

把每頁 `<nav class="main-nav" ...>...</nav>` 改成：

```html
<nav class="main-nav" aria-label="主要導覽">
  <a href="index.html">首頁</a>
  <a href="articles.html?journal=family">家庭誌</a>
  <a href="articles.html?journal=health">保健室</a>
  <a href="articles.html?journal=library">圖書室</a>
  <a href="articles.html?journal=style">風格誌</a>
  <a href="articles.html?journal=light">光影誌</a>
</nav>
```

---

## 六、每頁 Footer 加這段

放在 footer 裡，或放在版權文字上方：

```html
<nav class="footer-links" aria-label="輔助導覽">
  <a href="knowledge.html">知識圖譜</a>
  <a href="family.html">我們一家</a>
  <a href="about.html">關於</a>
  <a href="search.html">搜尋</a>
  <a href="https://vocus.cc" target="_blank" rel="noopener">VOCUS</a>
</nav>
```

---

## 七、知識圖譜頁面文案也要順手修掉舊分類

你現在知識圖譜頁面右側統計還是：

```text
幸福點滴 / 生活研究 / 棒球札記 / AI 共創
```

建議下一步統一改成五大入口：

```text
家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
```

這一包先處理導覽規則，避免再讓頁面入口混亂。

---

## 八、上線後檢查

```text
https://beckman0470.github.io/index.html?v=nav44
https://beckman0470.github.io/articles.html?journal=family&v=nav44
https://beckman0470.github.io/knowledge.html?v=nav44
https://beckman0470.github.io/family.html?v=nav44
https://beckman0470.github.io/about.html?v=nav44
```
