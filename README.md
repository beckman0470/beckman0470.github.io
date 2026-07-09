# 雞爸爸生活研究室｜文章頁 Header 完全比照首頁修正包 v5.1

這次是直接替換 `articles.html`，不是補丁，不需要 Python，也不需要另外新增 CSS/JS。

## 直接覆蓋

```text
articles.html
```

## 修正內容

### 1. Header 改成首頁同一套結構

文章頁上方列已改用首頁相同的 HTML 結構：

```text
<header class="site-header">
  <div class="wrap header-inner">
    brand / main-nav / search-link
  </div>
</header>
```

### 2. Header 位置比照首頁

已直接在 `articles.html` 內寫入首頁同規格 CSS：

```text
.wrap = min(1440px, 100vw - 48px)
.header-inner = grid-template-columns: auto 1fr auto
brand 在左
主導覽置中
搜尋在右
```

### 3. 移除文章頁內重複分類列

已刪除文章頁 Hero 底下那排：

```text
全部文章 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
```

因為上方列已經有五大入口。

### 4. 移除重複標題與說明

已刪除：

```text
典藏作品｜家庭誌
家庭誌目前顯示 7 篇作品。每張卡片都可點進完整原文。
```

保留上方 Hero 的分類標題與描述，下面直接接文章卡片。

## 不動內容

- 不動首頁
- 不動文章卡內容
- 不動文章分類
- 不動 LOGO 圖片
- 不動五大入口圖片
- 不動角色圖

## 上線後檢查

```text
https://beckman0470.github.io/articles.html?v=v51
https://beckman0470.github.io/articles.html?journal=family&v=v51
https://beckman0470.github.io/articles.html?journal=health&v=v51
https://beckman0470.github.io/articles.html?journal=library&v=v51
https://beckman0470.github.io/articles.html?journal=style&v=v51
https://beckman0470.github.io/articles.html?journal=light&v=v51
```
