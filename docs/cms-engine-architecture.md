# v2.1 CMS Engine Architecture

## 目標

建立 Chicken Dad Journal 的 Markdown CMS 引擎骨架。

## 架構

```text
content/stories/*.md
        ↓
cms/markdown.py
        ↓
cms/schema.py
        ↓
cms/generator.py
        ↓
data/stories.json
articles/{slug}.html
```

## 檔案說明

### cms/markdown.py
解析 Markdown front matter 與正文，將 Markdown 轉成基礎 HTML。

### cms/schema.py
檢查每篇文章是否包含必要欄位。

### cms/generator.py
產生 `data/stories.json` 與單篇文章 HTML。

### cms/build.py
主執行入口。

## 使用方式

在 GitHub Codespaces、github.dev 或任何可執行 Python 的環境中：

```bash
python cms/build.py
```

## 下一步 v2.2

- 讓 `articles.html` 自動生成
- 讓 `series.html` 自動讀取故事系列
- 產生 sitemap.xml
- 產生 RSS
