# SEO 與文章封面架構 V1｜2026-07-07

本包建立「一篇文章、一張封面圖」與基礎 SEO / 社群分享架構。

## 本包會做什麼

- 為 26 篇文章的 `meta.json` 增加：`cover`、`coverAlt`、`coverStatus`。
- 新增 `assets/story-covers/default.svg` 作為暫時預設封面。
- 新增 `assets/story-covers/README.md`，規範未來封面尺寸與命名。
- 文章頁加入 Open Graph、Twitter Card、canonical、JSON-LD Article。
- 故事頁、系列頁、宇宙圖鑑卡片支援封面區塊。
- 新增 `sitemap.xml` 與 `robots.txt`。

## 封面圖命名

```text
assets/story-covers/<slug>.jpg
```

建議尺寸：1200 × 630 px。

## 本包不做什麼

- 不生成圖片。
- 不修改首頁主視覺。
- 不修改 Header / Footer / Logo。
- 不改文章內文。

## 驗證標記

可在文章頁原始碼搜尋：

```text
CDJ_SEO_COVER_ARCH_V1_20260707
```
