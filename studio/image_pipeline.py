
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".svg"}

ASSET_FOLDERS = [
    "content/assets/covers",
    "content/assets/heroes",
    "content/assets/illustrations",
    "assets/og",
    "assets/thumbs",
]

def scan_images(root=ROOT):
    root = Path(root)
    images = []

    for folder in ASSET_FOLDERS:
        path = root / folder
        if not path.exists():
            continue

        for file in sorted(path.rglob("*")):
            if file.is_file() and file.suffix.lower() in IMAGE_EXTS:
                images.append({
                    "path": str(file.relative_to(root)).replace("\\\\", "/"),
                    "name": file.name,
                    "stem": file.stem,
                    "type": folder,
                    "ext": file.suffix.lower(),
                    "size": file.stat().st_size
                })

    return images

def match_story_assets(stories, images):
    by_stem = {img["stem"]: img for img in images}
    result = []

    for story in stories:
        slug = story.get("slug", "")
        cover = story.get("cover") or story.get("heroImage") or ""
        matched = None

        if cover:
            matched = next((img for img in images if img["path"] == cover or img["name"] == Path(cover).name), None)

        if not matched and slug:
            matched = by_stem.get(slug)

        result.append({
            "id": story.get("id"),
            "title": story.get("title"),
            "slug": slug,
            "cover": matched["path"] if matched else "",
            "hasCover": bool(matched),
            "ogImage": matched["path"] if matched else "assets/og/og-image.svg"
        })

    return result

def build_image_manifest(root=ROOT):
    root = Path(root)
    data_dir = root / "data"
    data_dir.mkdir(exist_ok=True)

    images = scan_images(root)

    stories_path = data_dir / "stories.json"
    stories = []
    if stories_path.exists():
        stories = json.loads(stories_path.read_text(encoding="utf-8"))

    story_assets = match_story_assets(stories, images)

    manifest = {
        "images": images,
        "stories": story_assets,
        "summary": {
            "imageCount": len(images),
            "storyCount": len(stories),
            "storiesWithCover": sum(1 for s in story_assets if s["hasCover"]),
            "storiesMissingCover": sum(1 for s in story_assets if not s["hasCover"])
        }
    }

    (data_dir / "image-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    return manifest

if __name__ == "__main__":
    manifest = build_image_manifest()
    print("Image manifest generated.")
    print("Images:", manifest["summary"]["imageCount"])
    print("Stories:", manifest["summary"]["storyCount"])
    print("Stories with cover:", manifest["summary"]["storiesWithCover"])
    print("Stories missing cover:", manifest["summary"]["storiesMissingCover"])
