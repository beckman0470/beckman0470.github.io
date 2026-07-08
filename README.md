# 雞爸爸生活研究室｜只置換鼠姊姊與龍弟弟角色圖

這包只包含圖片，不包含整頁首頁、不包含 CSS、不包含 Hero、不包含五大入口。

## 必換檔案

請把這兩個檔案放到 GitHub repo 的這個位置：

```text
assets/img/portrait-dodo.png
assets/img/portrait-dragon.png
```

尺寸：
- portrait-dodo.png：1086 × 1448 px
- portrait-dragon.png：1086 × 1448 px

## 你線上剛剛沒變的原因

你目前看到的線上頁面仍是「手持小噴瓶」那張，代表線上 `index.html` 仍在讀舊圖，或 `assets/img/portrait-dragon.png` 尚未被新圖覆蓋。

## 最穩定做法

### 做法 A：覆蓋同名圖片
把本包的：

```text
assets/img/portrait-dodo.png
assets/img/portrait-dragon.png
```

直接覆蓋 GitHub repo 中同路徑的檔案。

### 做法 B：避免快取，改用新版檔名
如果覆蓋後還不變，請改 `index.html`：

```html
<img src="assets/img/portrait-dodo-v32.png?v=20260708-32" alt="鼠姊姊角色插圖">
<img src="assets/img/portrait-dragon-v32.png?v=20260708-32" alt="龍弟弟角色插圖">
```

同時把本包的：

```text
assets/img/portrait-dodo-v32.png
assets/img/portrait-dragon-v32.png
```

一起上傳到 repo。

## 請不要整包覆蓋首頁

這包只做角色圖置換。
