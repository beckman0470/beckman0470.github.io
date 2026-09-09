from pathlib import Path
import re
import json
import sys
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "index.html",
    "articles.html",
    "series.html",
    "timeline.html",
    "search.html",
    "tags.html",
    "subscribe.html",
    "family.html",
    "about.html",
    "404.html",
    "rss.xml",
    "sitemap.xml",
    "robots.txt",
    "data/stories.json",
    "data/articles.json",
]

REQUIRED_ANCHORS = {
    "index.html": ['data-latest-article', *[f'data-journal-count="{name}"' for name in
                    ('家庭誌', '保健室', '圖書室', '風格誌', '光影誌')]],
    "about.html": ['data-total-count']
}

def fail(msg):
    print("ERROR:", msg)
    return 1

def main():
    errors = 0

    print("Chicken Dad Journal QA Check v4.6")

    for rel in REQUIRED_FILES:
        p = ROOT / rel
        if not p.exists():
            errors += fail(f"missing {rel}")
        else:
            print("OK:", rel)

    for rel, anchors in REQUIRED_ANCHORS.items():
        p = ROOT / rel
        if p.exists():
            text = p.read_text(encoding="utf-8", errors="ignore")
            for anchor in anchors:
                if anchor not in text:
                    errors += fail(f"{rel} missing {anchor}")
                else:
                    print("OK:", rel, anchor)

    stories_path = ROOT / "data" / "stories.json"
    if stories_path.exists():
        try:
            stories = json.loads(stories_path.read_text(encoding="utf-8"))
            if not isinstance(stories, list):
                errors += fail("data/stories.json is not a list")
            else:
                print("OK: stories count", len(stories))
        except Exception as e:
            errors += fail(f"data/stories.json invalid JSON: {e}")

    for html in ["index.html", "about.html", "articles.html", "series.html", "timeline.html", "search.html", "tags.html", "subscribe.html"]:
        p = ROOT / html
        if p.exists():
            text = p.read_text(encoding="utf-8", errors="ignore")
            for href in re.findall(r'href=["\']([^"\']+)["\']', text):
                if urlsplit(href).scheme or href.startswith(("//", "#")):
                    continue
                clean = unquote(urlsplit(href).path)
                if not clean:
                    continue
                target = ((ROOT / clean.lstrip('/')) if clean.startswith('/') else (p.parent / clean)).resolve()
                if not target.exists():
                    print("WARN: possible missing link", html, "->", href)

    if errors:
        print(f"QA finished with {errors} error(s).")
        raise SystemExit(1)

    print("QA passed.")

if __name__ == "__main__":
    main()
