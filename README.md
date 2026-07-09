# 雞爸爸生活研究室｜直接修復包 v4.8：首頁＋文章列表

這次是直接替換檔，不是 JS 補丁，不需要 Python。

## 請直接覆蓋

```text
index.html
articles.html
```

## 這版完成的事

### 1. 首頁上方列
只保留：

```text
首頁 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
```

移除：

```text
文章列表 / 知識圖譜 / 我們一家 / 關於 / 工作室
```

### 2. 文章列表上方列
只保留：

```text
首頁 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌
```

不再出現知識圖譜、我們一家、關於。

### 3. 首頁五大入口標題
改成：

```text
❦ 生活研究室 ❦
行勝於言 厚德載物
```

### 4. Hero 方案 B
確認直接寫入：

```text
用科學理解生活
用陪伴記錄成長

學問求知識，研究生智慧；
覺悟得玄機，了解道真理。
```

### 5. 舊字串
`獨家記憶` 已改為 `家庭誌`。

### 6. 文章列表
使用既有 v4.2 直接分流版，不再靠瀏覽器補丁。

## 這包不含 knowledge.html / family.html / about.html

我現在不能安全直接替換這三頁，因為需要以你目前 GitHub 版本的完整檔案為基準處理；若用舊檔硬蓋，可能會覆蓋掉你已經調整過的內容。

下一步建議：請把目前 GitHub 的 `knowledge.html`、`family.html`、`about.html` 下載後丟給我，或直接貼檔案，我會做 v4.9 直接替換版，移除它們上方列中的知識圖譜／我們一家／關於，並把輔助連結放到底部。

## 檢查網址

```text
https://beckman0470.github.io/index.html?v=v48
https://beckman0470.github.io/articles.html?journal=family&v=v48
https://beckman0470.github.io/articles.html?journal=health&v=v48
https://beckman0470.github.io/articles.html?journal=library&v=v48
https://beckman0470.github.io/articles.html?journal=style&v=v48
https://beckman0470.github.io/articles.html?journal=light&v=v48
```
