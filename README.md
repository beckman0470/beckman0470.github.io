# Chicken Dad Journal v3.0

完整 CMS 發行版。

## 包含

- 首頁 JSON Reader
- 故事頁 JSON Reader + 搜尋
- 系列頁 JSON Reader + 自動分組
- Family / About 頁
- Markdown CMS 基礎
- `data/stories.json`
- `sitemap.xml`
- `robots.txt`
- `404.html`
- Open Graph 圖

## 使用方式

整包覆蓋 GitHub Repository 根目錄。

## 新增文章流程

1. 複製 `templates/story-template.md`
2. 放到 `content/stories/YYYY-MM-DD-slug.md`
3. 修改 front matter 與正文
4. 執行：

```bash
python cms/build_json.py
```

5. Commit & Push

## 下一階段

v3.1：自動產生單篇文章 HTML  
v3.2：自動 sitemap / RSS  
v3.3：更完整的 Search / Tag 頁
