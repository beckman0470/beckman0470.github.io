# Chicken Dad Journal v3.1

Auto Article Generator.

## 覆蓋

```text
cms/
  __init__.py
  build.py
  markdown.py
  schema.py
  templates.py

docs/
  v3.1-auto-article-generator.md
```

## 執行

```bash
python cms/build.py
```

會自動產生：

```text
data/stories.json
articles/{slug}.html
sitemap.xml
```
