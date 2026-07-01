
from pathlib import Path
import json
import sys
from datetime import date

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from cms.markdown import load_markdown_file
from cms.schema import validate_story
from cms.templates import render_article_page

SITE_URL = "https://beckman0470.github.io"

def story_summary(story):
    meta = story["meta"]
    return {
        "id": meta.get("id"),
        "title": meta.get("title"),
        "slug": meta.get("slug"),
        "date": meta.get("date"),
        "summary": meta.get("summary"),
        "series": meta.get("seriesTitle"),
        "category": meta.get("categoryTitle"),
        "featured": meta.get("featured", False),
        "hero": meta.get("hero", False),
        "tags": meta.get("tags", []),
        "characters": meta.get("characters", []),
        "research": meta.get("research", []),
        "url": f"articles/{meta.get('slug')}.html"
    }

def build_sitemap(stories):
    today = date.today().isoformat()
    static_pages = [
        ("", "1.0"),
        ("index.html", "1.0"),
        ("articles.html", "0.9"),
        ("series.html", "0.8"),
        ("family.html", "0.8"),
        ("about.html", "0.7"),
    ]

    urls = []
    for path, priority in static_pages:
        urls.append((path, today, priority))

    for story in stories:
        urls.append((story["url"], story.get("date", today), "0.7"))

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

    for path, lastmod, priority in urls:
        lines.append(f"  <url><loc>{SITE_URL}/{path}</loc><lastmod>{lastmod}</lastmod><priority>{priority}</priority></url>")

    lines.append("</urlset>")
    return "\n".join(lines) + "\n"

def main():
    content_dir = ROOT / "content" / "stories"
    data_dir = ROOT / "data"
    articles_dir = ROOT / "articles"

    data_dir.mkdir(exist_ok=True)
    articles_dir.mkdir(exist_ok=True)

    stories = []
    errors = []

    for md_path in sorted(content_dir.glob("*.md")):
        story = load_markdown_file(md_path)
        story_errors = validate_story(story["meta"], str(md_path))

        if story_errors:
            errors.extend(story_errors)
            continue

        stories.append(story)

    summaries = [story_summary(story) for story in stories]
    summaries.sort(key=lambda s: s.get("date", ""), reverse=True)

    (data_dir / "stories.json").write_text(
        json.dumps(summaries, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    for story in stories:
        meta = story["meta"]
        slug = meta.get("slug")
        if not slug:
            continue

        article_html = render_article_page(meta, story["html"])
        (articles_dir / f"{slug}.html").write_text(article_html, encoding="utf-8")

    (ROOT / "sitemap.xml").write_text(build_sitemap(summaries), encoding="utf-8")

    print("Chicken Dad Journal build complete.")
    print(f"Stories: {len(summaries)}")
    print("Generated: data/stories.json")
    print("Generated: articles/{slug}.html")
    print("Generated: sitemap.xml")

    if errors:
        print("\nErrors:")
        for error in errors:
            print(" -", error)
        raise SystemExit(1)

if __name__ == "__main__":
    main()
