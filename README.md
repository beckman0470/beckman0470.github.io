# 雞爸爸生活研究室｜首頁＋文章列表直接修復包 v4.3

這包是針對你目前指出的三個問題做的「直接替換版」：

1. 首頁 Hero 沒套用方案 B
2. LOGO 跑掉
3. 上方列「文章列表」造成雙底線，而且文章列表不需要出現在主導覽

## 直接覆蓋檔案

請把本包三個檔案覆蓋到 GitHub repo 對應位置：

```text
index.html
articles.html
assets/img/logo-avatar.png
```

## 這版已直接寫進 HTML，不再靠 JS 補丁

### 首頁 Hero 方案 B
已改成：

```text
用科學理解生活 用陪伴記錄成長

學問求知識，研究生智慧；
覺悟得玄機，了解道真理。
```

並且：
- 拿掉上方重複的小標
- 拿掉「科學理解生活」後面的逗號
- 詩句改為兩行

### LOGO
左上角恢復使用：

```text
assets/img/logo-avatar.png
```

不再使用空白圓形或文字「雞」。

### 主導覽
已移除「文章列表」。

主導覽改成：

```text
首頁 / 家庭誌 / 保健室 / 圖書室 / 風格誌 / 光影誌 / 知識圖譜 / 我們一家 / 關於
```

### 五大入口
首頁五大入口已改成：

```text
家庭誌：articles.html?journal=family
保健室：articles.html?journal=health
圖書室：articles.html?journal=library
風格誌：articles.html?journal=style
光影誌：articles.html?journal=light
```

### 文字
首頁與文章列表中的「獨家記憶」已改成「家庭誌」。

## 這包不動

- Hero 圖片
- 五大入口圖片
- 角色圖片
- 文章內容分類資料

## 上線後檢查

```text
https://beckman0470.github.io/index.html?v=v43
https://beckman0470.github.io/articles.html?journal=family&v=v43
https://beckman0470.github.io/articles.html?journal=health&v=v43
https://beckman0470.github.io/articles.html?journal=library&v=v43
https://beckman0470.github.io/articles.html?journal=style&v=v43
https://beckman0470.github.io/articles.html?journal=light&v=v43
```
