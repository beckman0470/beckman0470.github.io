# 雞爸爸生活研究室｜各入口內容頁底圖修正包 v5.3

這次修正你說的重點：  
不是文章卡片裡面的底圖，而是「各入口連結進去後的內容頁背景」。

## 直接覆蓋

```text
articles.html
```

## 本版完成

### 1. 各入口內容頁有不同的淡背景

依網址自動套用：

```text
articles.html?journal=family   → 家庭誌：溫暖家居／手帳感
articles.html?journal=health   → 保健室：柔和綠色療癒感
articles.html?journal=library  → 圖書室：淡淡書架感
articles.html?journal=style    → 風格誌：工作桌／光影感
articles.html?journal=light    → 光影誌：微亮攝影感
```

### 2. 背景放在整個內容頁

不是放在每張文章卡片裡。  
文章卡片改回乾淨半透明白底，讓頁面有房間氛圍，但文字仍清楚。

### 3. 延續 v5.2

保留：

- 刪除 `WORKS`
- 文章卡片文字收斂
- 標題最多 2 行
- 摘要最多 3 行
- 引言最多 2 行
- 隱藏 #標籤列
- Header 仍比照首頁

## 不動內容

- 不動首頁
- 不動 LOGO 圖
- 不動文章資料
- 不動文章分類
- 不動五大入口圖片
- 不動角色圖

## 上線後檢查

```text
https://beckman0470.github.io/articles.html?journal=family&v=v53
https://beckman0470.github.io/articles.html?journal=health&v=v53
https://beckman0470.github.io/articles.html?journal=library&v=v53
https://beckman0470.github.io/articles.html?journal=style&v=v53
https://beckman0470.github.io/articles.html?journal=light&v=v53
```
