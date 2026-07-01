import json
from pathlib import Path
from cms.markdown import load_markdown_file
from studio.metadata import enrich_meta

CONTENT_FOLDERS = [
    "content/stories",
    "content/drafts",
    "content/scheduled",
    "content/published",
    "content/archived",
]

def scan_content(root):
    root = Path(root)
    items = []

    for folder in CONTENT_FOLDERS:
        path = root / folder
        if not path.exists():
            continue

        for md in sorted(path.glob("*.md")):
            story = load_markdown_file(md)
            meta = enrich_meta(story["meta"], story.get("body", ""))
            items.append({
                "source": str(md.relative_to(root)),
                "status": meta.get("status"),
                "title": meta.get("title"),
                "slug": meta.get("slug"),
                "date": meta.get("date"),
                "publishDate": meta.get("publishDate"),
                "lastModified": meta.get("lastModified"),
                "series": meta.get("seriesTitle") or meta.get("series"),
                "category": meta.get("categoryTitle") or meta.get("category"),
                "tags": meta.get("tags", []),
                "characters": meta.get("characters", []),
                "wordCount": meta.get("wordCount", 0),
                "readingTime": meta.get("readingTime", 0),
            })

    return items

def write_inventory(root):
    root = Path(root)
    data_dir = root / "data"
    data_dir.mkdir(exist_ok=True)
    inventory = scan_content(root)
    (data_dir / "content-inventory.json").write_text(
        json.dumps(inventory, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    return inventory
