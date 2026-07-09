# 雞爸爸生活研究室｜文章列表五大入口分流整理包 v3.9

這包處理你現在文章列表頁的兩個問題：

1. 首頁／上方列的五大入口進到文章列表後，目前看到的文章都一樣。
2. 文章列表中間那排「系列／時間軸／搜尋／標籤」與四張舊分類卡已經不需要了。

## 這包會做什麼

### 1. 全站文字統一
把：

```text
獨家記憶
```

改成：

```text
家庭誌
```

包含上方列、標題、內文、alt、aria-label、HTML、JS、JSON、Markdown 等文字型檔案。

### 2. 首頁五大入口連結改成分流網址

```text
家庭誌：articles.html?journal=family
保健室：articles.html?journal=health
圖書室：articles.html?journal=library
風格誌：articles.html?journal=style
光影誌：articles.html?journal=light
```

### 3. 移除／隱藏文章列表中間舊分類卡

會隱藏目前文章列表頁中間這些舊內容：

```text
系列
時間軸
搜尋
標籤
幸福點滴
生活研究
棒球札記
AI 共創
```

### 4. 文章列表依入口分流

文章會依標題、分類、標籤、摘要文字自動判斷屬於：

```text
家庭誌
保健室
圖書室
風格誌
光影誌
```

並只顯示該入口文章。

---

## 使用方式

把本包內容放到 GitHub repo 根目錄，也就是和 `index.html` 同一層。

然後執行：

```bash
python tools/apply_articles_journal_patch_v3_9.py
```

執行後會新增：

```text
css/articles-journal-filter.css
js/articles-journal-filter.js
articles_journal_patch_report_v3_9.txt
```

並修改：

```text
index.html
articles.html
```

以及其他含有「獨家記憶」的文字型檔案。

---

## 上線後檢查網址

```text
https://beckman0470.github.io/articles.html?journal=family
https://beckman0470.github.io/articles.html?journal=health
https://beckman0470.github.io/articles.html?journal=library
https://beckman0470.github.io/articles.html?journal=style
https://beckman0470.github.io/articles.html?journal=light
```

首頁檢查：

```text
https://beckman0470.github.io/index.html?v=articles-filter-v39
```

---

## 這包不動

- Hero
- LOGO
- 五大入口圖片
- 角色圖
- 文章內容本身
