from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    "index.html",
    "articles.html",
    "series.html",
    "timeline.html",
    "search.html",
    "tags.html",
    "subscribe.html",
    "family.html",
    "about.html",
    "rss.xml",
    "sitemap.xml",
    "robots.txt",
    "data/stories.json",
]

def main():
    errors = []
    for rel in REQUIRED:
        if not (ROOT / rel).exists():
            errors.append(f"missing {rel}")

    stories = ROOT / "data" / "stories.json"
    if stories.exists():
        try:
            data = json.loads(stories.read_text(encoding="utf-8"))
            if not isinstance(data, list):
                errors.append("data/stories.json is not a list")
        except Exception as e:
            errors.append(f"data/stories.json invalid: {e}")

    if errors:
        print("Release check failed:")
        for e in errors:
            print(" -", e)
        raise SystemExit(1)

    print("Release check passed.")

if __name__ == "__main__":
    main()
