# Story Covers｜文章封面圖規格

雞爸爸生活研究室之後採用「一篇文章、一張代表插圖」的封面架構。

## 命名規則

```text
assets/story-covers/<slug>.jpg
```

例如：

```text
assets/story-covers/midnight-asthma-wheezing-lesson.jpg
assets/story-covers/picture-book-hand-courage.jpg
```

## 建議尺寸

- 1200 × 630 px
- 橫式封面，適合故事列表與社群分享 Open Graph
- 重要人物與主視覺放在中央 80% 安全區域

## meta.json 欄位

```json
{
  "cover": "assets/story-covers/default.svg",
  "coverAlt": "文章代表插圖說明",
  "coverStatus": "placeholder"
}
```

等正式插圖完成後，把 `cover` 改成對應的 jpg/png 路徑，`coverStatus` 可改為 `ready`。
