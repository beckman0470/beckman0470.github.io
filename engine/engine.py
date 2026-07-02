import json
from pathlib import Path

from cms.markdown import load_markdown_file
from cms.templates import render_article_page

from engine.validator import validate_collection
from engine.related import build_related_map, build_prev_next_map
from engine.timeline import build_timeline
from engine.homepage import render_homepage
from engine.indexer import (
    build_stories_json,
    build_search_index,
    build_tag_index,
    build_series_index
)
from engine.seo import build_sitemap, build_rss, build_robots

try:
    from engine.analytics import inject_analytics
except Exception:
    def inject_analytics(html, measurement_id=""):
        return html

try:
    from engine.seo_plus import inject_article_seo
except Exception:
    def inject_article_seo(html, meta):
        return html

class ContentEngine:
    def __init__(self, root, measurement_id=""):
        self.root = Path(root)
        self.content_dir = self.root / "content" / "stories"
        self.data_dir = self.root / "data"
        self.articles_dir = self.root / "articles"
        self.measurement_id = measurement_id

    def load_stories(self):
        stories = []
        for md_path in sorted(self.content_dir.glob("*.md")):
            stories.append(load_markdown_file(md_path))
        return stories

    def write_json(self, name, data):
        self.data_dir.mkdir(exist_ok=True)
        (self.data_dir / name).write_text(
            json.dumps(data, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )

    def build_articles(self, stories, related_map, prev_next_map):
        self.articles_dir.mkdir(exist_ok=True)

        for story in stories:
            meta = story["meta"]
            slug = meta.get("slug")
            story_id = meta.get("id")
            if not slug:
                continue

            html = render_article_page(
                meta,
                story["html"],
                related_items=related_map.get(story_id, []),
                prev_next=prev_next_map.get(story_id, {})
            )
            html = inject_article_seo(html, meta)
            html = inject_analytics(html, self.measurement_id)

            (self.articles_dir / f"{slug}.html").write_text(html, encoding="utf-8")

    def build(self):
        stories = self.load_stories()
        errors, warnings = validate_collection(stories)

        if errors:
            return {
                "ok": False,
                "stories": len(stories),
                "errors": errors,
                "warnings": warnings
            }

        stories_json = build_stories_json(stories)
        related_json = build_related_map(stories)
        prev_next_json = build_prev_next_map(stories)
        timeline_json = build_timeline(stories)
        search_index = build_search_index(stories)
        tag_index = build_tag_index(stories)
        series_index = build_series_index(stories)

        self.write_json("stories.json", stories_json)
        self.write_json("related.json", related_json)
        self.write_json("navigation.json", prev_next_json)
        self.write_json("timeline.json", timeline_json)
        self.write_json("search-index.json", search_index)
        self.write_json("tag-index.json", tag_index)
        self.write_json("series-index.json", series_index)

        self.build_articles(stories, related_json, prev_next_json)

        homepage = render_homepage(stories_json, self.root)
        homepage = inject_analytics(homepage, self.measurement_id)
        (self.root / "index.html").write_text(homepage, encoding="utf-8")

        (self.root / "sitemap.xml").write_text(build_sitemap(stories_json), encoding="utf-8")
        (self.root / "rss.xml").write_text(build_rss(stories_json), encoding="utf-8")
        (self.root / "robots.txt").write_text(build_robots(), encoding="utf-8")

        return {
            "ok": True,
            "stories": len(stories),
            "errors": [],
            "warnings": warnings,
            "generated": [
                "index.html",
                "data/stories.json",
                "data/related.json",
                "data/navigation.json",
                "data/timeline.json",
                "data/search-index.json",
                "data/tag-index.json",
                "data/series-index.json",
                "articles/{slug}.html",
                "sitemap.xml",
                "rss.xml",
                "robots.txt"
            ]
        }
