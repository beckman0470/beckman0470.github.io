"""
Chicken Dad Journal HTML Generator
v2.1

產生：
- data/stories.json
- articles/generated-*.html
目前先建立可運作基礎，下一版再接回正式版型。
"""

import json
from pathlib import Path
from .markdown import load_markdown_file
from .schema import validate_story

def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)

def story_to_summary(story):
    meta = story["meta"]
    return {
        "id": meta.get("id"),
        "title": meta.get("title"),
        "slug": meta.get("slug"),
        "date": meta.get("date"),
        "series": meta.get("series"),
        "seriesTitle": meta.get("seriesTitle"),
        "category": meta.get("category"),
        "categoryTitle": meta.get("categoryTitle"),
        "characters": meta.get("characters", []),
        "tags": meta.get("tags", []),
        "readingTime": meta.get("readingTime"),
        "summary": meta.get("summary"),
        "featured": meta.get("featured", False),
        "hero": meta.get("hero", False),
        "mood": meta.get("mood", ""),
        "research": meta.get("research", []),
        "cover": meta.get("cover", ""),
        "quote": meta.get("quote", ""),
        "url": f"./articles/{meta.get('slug')}.html"
    }

def render_article_page(story):
    meta = story["meta"]
    title = meta.get("title", "Untitled")
    series = meta.get("seriesTitle", "")
    summary = meta.get("summary", "")
    quote = meta.get("quote", "")
    body_html = story["html"]

    return f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}｜雞爸爸生活研究室</title>
<meta name="description" content="{summary}">
<style>
body{{margin:0;background:#F8F6F1;color:#263328;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif;line-height:1.9}}
a{{color:inherit;text-decoration:none}}
.container{{width:min(780px,calc(100% - 40px));margin:auto}}
.header{{padding:28px 0;border-bottom:1px solid #E6DED1;background:#FFFDF8}}
.kicker{{font-size:13px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#A67C52}}
h1{{font-family:Georgia,"Times New Roman",serif;font-size:clamp(42px,6vw,72px);line-height:1.08;letter-spacing:-.04em}}
.lead{{font-size:21px;color:#344238}}
.meta{{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0}}
.pill{{display:inline-flex;padding:7px 12px;border-radius:999px;background:#FFFDF8;border:1px solid #E6DED1;color:#687463;font-weight:800}}
.quote{{margin:36px 0;background:#FFFDF8;border-left:6px solid #A67C52;border-radius:22px;padding:24px;font-family:Georgia,"Times New Roman",serif;font-size:24px;box-shadow:0 18px 50px rgba(70,55,35,.10)}}
.article{{font-size:19px;padding-bottom:70px}}
.article h2{{font-size:31px;margin-top:2.2em}}
.nav{{display:flex;justify-content:space-between;gap:16px}}
.btn{{display:inline-flex;padding:12px 20px;border-radius:999px;background:#263328;color:white;font-weight:900;margin:24px 0}}
</style>
</head>
<body>
<header class="header"><div class="container nav"><a href="../index.html">🐔 雞爸爸生活研究室</a><a href="../articles.html">故事</a></div></header>
<main class="container">
<div class="kicker">{series}</div>
<h1>{title}</h1>
<p class="lead">{summary}</p>
<div class="meta"><span class="pill">{meta.get("date","")}</span><span class="pill">{meta.get("readingTime","")} 分鐘閱讀</span><span class="pill">{meta.get("categoryTitle","")}</span></div>
<div class="quote">{quote}</div>
<article class="article">{body_html}</article>
<a class="btn" href="../articles.html">回故事典藏</a>
</main>
</body>
</html>"""

def build_site(root: Path):
    content_dir = root / "content" / "stories"
    data_dir = root / "data"
    articles_dir = root / "articles"

    ensure_dir(data_dir)
    ensure_dir(articles_dir)

    stories = []
    errors = []

    for md_path in sorted(content_dir.glob("*.md")):
        story = load_markdown_file(md_path)
        story_errors = validate_story(story["meta"], str(md_path))
        if story_errors:
            errors.extend(story_errors)
            continue
        stories.append(story)

    stories_summary = [story_to_summary(story) for story in stories]
    stories_summary.sort(key=lambda x: x.get("date", ""), reverse=True)

    (data_dir / "stories.json").write_text(
        json.dumps(stories_summary, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    for story in stories:
        slug = story["meta"].get("slug")
        if not slug:
            continue
        html = render_article_page(story)
        (articles_dir / f"{slug}.html").write_text(html, encoding="utf-8")

    return {
        "stories": len(stories),
        "errors": errors
    }
