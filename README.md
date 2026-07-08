# 雞爸爸生活研究室｜Hero 家庭合照更新包 v3.6

這包只處理首頁 Hero / 家庭合照圖片，讓合照裡的龍弟弟以目前角色介紹卡的龍弟弟為準。

## 本包只新增／置換圖片

主要檔案：

```text
assets/img/hero-family.png
```

尺寸：

```text
1448 × 1086 px
```

## 如果首頁目前讀的是 `assets/img/hero-family.png`

直接把本包的：

```text
assets/img/hero-family.png
```

覆蓋到 GitHub repo 同一路徑即可。

## 如果上傳後仍看到舊圖，請使用強制刷新檔名

本包另附：

```text
assets/img/hero-family-v36.png
```

然後把 `index.html` 裡 Hero 圖片路徑改成：

```html
<img src="assets/img/hero-family-v36.png?v=20260708-36" alt="雞爸爸、鼠媽媽、鼠姊姊、龍弟弟、兔阿嬤的家庭合照插圖" class="hero-art" width="1448" height="1086">
```

## 不要動的東西

這包不改：
- LOGO
- 五大入口
- 鼠姊姊角色卡
- 龍弟弟角色卡
- 其他角色卡
- CSS 版型

## 上線後檢查

請開：

```text
https://beckman0470.github.io/index.html?v=20260708-36
```

確認 Hero 家庭合照裡的龍弟弟，已經是穿藍黃條紋衣、粉色點點圍兜、抱恐龍玩偶的版本。
