# CDJ Home RabbitAma No Glasses v71｜2026-07-17

這包修正首頁兔阿嬤仍戴眼鏡的問題。

## 修改內容

1. `assets/img/hero-family.png`
   - 首頁 HERO 全家福。
   - 右側兔阿嬤已改為不戴眼鏡。
   - 保留雞爸爸宇宙人物設定：雞爸爸黑框眼鏡與山羊鬍、鼠媽媽短髮戴眼鏡、鼠姊姊透明框眼鏡、龍弟弟幼兒感、兔阿嬤咖啡色短捲髮與紫色穿搭。

2. `assets/img/portrait-ama.png`
   - 首頁「我們這一家」兔阿嬤角色介紹圖片。
   - 已改為不戴眼鏡。
   - 保留白皙膚色、自然眼尾紋與法令紋、溫暖親切感。

3. `index.html`
   - 只針對以上兩張首頁圖片加上 cache-busting：
     - `?v=20260717-ama-v71`
   - 避免 GitHub Pages 或瀏覽器繼續顯示舊圖。

4. `data/character-bible-v1.0.1.json` / `data/characters.json`
   - 若原 repo 有這兩個檔案，本包同步更新兔阿嬤人物設定：
     - 不戴眼鏡
     - 咖啡色短捲髮
     - 膚色偏白皙
     - 自然眼尾紋與法令紋
     - 紫色系穿搭
     - 溫暖親切

## 上傳方式

請解壓後，把內容直接覆蓋到 GitHub repo 根目錄：

```text
index.html
assets/img/hero-family.png
assets/img/portrait-ama.png
assets/img/hero-family.webp
assets/img/portrait-ama.webp
data/character-bible-v1.0.1.json
data/characters.json
```

不要把外層資料夾整包丟進 repo。

## 上線後檢查

請使用無痕視窗或強制重新整理：

```text
https://beckman0470.github.io/?v=20260717-ama-v71
```
