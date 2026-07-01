# Story Markdown 規格

每篇文章放在：

```text
content/stories/
```

檔名格式建議：

```text
YYYY-MM-DD-slug.md
```

例如：

```text
2026-06-29-swimming.md
```

## Front Matter 欄位

| 欄位 | 說明 |
|---|---|
| id | 全站唯一 ID |
| title | 文章標題 |
| slug | 文章網址用代稱 |
| date | 發布日期 |
| series | 系列 ID |
| seriesTitle | 系列顯示名稱 |
| category | 分類 ID |
| categoryTitle | 分類顯示名稱 |
| characters | 出場角色 |
| tags | 標籤 |
| readingTime | 閱讀時間 |
| featured | 是否首頁推薦 |
| hero | 是否 Hero 文章 |
| mood | 文章情緒 |
| research | 雞爸爸研究主題 |
| cover | 封面圖 |
| summary | 摘要 |
| quote | 金句 |

## ChickenDad Metadata

`mood` 和 `research` 是雞爸爸特色欄位。

未來可以用來產生：

- 雞爸爸本週研究
- 情緒分類
- 研究主題牆
- 推薦閱讀
