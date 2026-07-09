# 雞爸爸生活研究室｜文章內頁整理包 v4.9

這次直接修 `articles.html`，不是補丁、不用 Python、不用另外加 JS/CSS。

## 請直接覆蓋

```text
articles.html
```

## 修正內容

### 1. 內容頁上方列位置修正
把文章列表頁 header 的容器加寬，避免 LOGO 與導覽列整組偏右。

### 2. 移除內頁重複區塊
刪除每個分流頁下方重複的這段：

```text
全部文章 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
典藏作品｜家庭誌
家庭誌目前顯示 7 篇作品。每張卡片都可點進完整原文。
```

現在進入 `articles.html?journal=family` 後，會保留上方 Hero：

```text
家庭誌
家庭、孩子、陪伴與日常裡長出的幸福紀錄。
```

底下直接顯示文章卡片。

### 3. 分流仍保留
這些網址仍可使用：

```text
articles.html?journal=family
articles.html?journal=health
articles.html?journal=library
articles.html?journal=style
articles.html?journal=light
```

### 4. 上方列 active 狀態
目前所在入口會在上方列顯示 active 狀態。

## 這包不動

- index.html
- Hero 圖
- LOGO 圖
- 五大入口圖片
- 角色圖
- 文章內容
