# 雞爸爸生活研究室｜首頁精準修復包 v3.4

本包只修兩件事：

1. 還原首頁左上角 LOGO，不再使用文字「雞」作為品牌標記。
2. 恢復鼠姊姊在首頁角色卡中的視覺大小，避免看起來太小。

## 需要上傳／覆蓋的檔案

```text
index.html
css/homepage-hd-v2.css
assets/img/logo-avatar.png
assets/img/portrait-dodo.png
```

## 沒有修改的東西

- 不動 Hero
- 不動五大入口
- 不動龍弟弟
- 不動雞爸爸、鼠媽媽、兔阿嬤
- 不重做首頁

## 修改說明

### LOGO
`index.html` 中已把：

```html
<div class="brand-mark">雞</div>
```

改回：

```html
<img src="assets/img/logo-avatar.png?v=20260708-logo-restore" alt="雞爸爸生活研究室 LOGO" class="brand-avatar">
```

### 鼠姊姊
`portrait-dodo.png` 已換成放大後的版本，保留五歲中班比例與日系漫畫人物風格，但在首頁角色卡裡會比上一版更接近其他角色的視覺大小。

CSS 也加了只針對第三張角色卡的安全修正：

```css
.family-grid .family-card:nth-child(3) .family-image-link img {
  object-fit: contain;
  object-position: center center;
  padding: 0;
}
```

## 上線後檢查

上傳後請開：

```text
https://beckman0470.github.io/index.html?v=20260708-logo-dodo-fix
```

如果手機仍顯示舊圖，請用無痕視窗或清除瀏覽器快取。
