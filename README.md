# 鼠姊姊版型大小修正包 v3.5

這包只處理鼠姊姊角色圖，目的是讓首頁「我們這一家」區塊中的鼠姊姊，
回到和其他家人更一致的構圖比例與視覺大小。

## 這次修正
- 原本鼠姊姊為全身構圖，放到首頁卡片中會顯得偏小、版型不一致。
- 本版改為較接近其他家人的半身／中近景構圖。
- 不需要改 Hero、不需要改五大入口、不需要改龍弟弟。

## 直接覆蓋
請把以下檔案覆蓋到 GitHub repo：

```text
assets/img/portrait-dodo.png
```

## 如果還是快取
你也可以改用新版檔名：

```text
assets/img/portrait-dodo-v35.png
```

並把 `index.html` 裡鼠姊姊圖片路徑改成：

```html
<img src="assets/img/portrait-dodo-v35.png?v=20260708-35" alt="鼠姊姊角色插圖">
```

## 本包不修改
- LOGO
- Hero
- 五大入口
- 龍弟弟
- 其他角色
