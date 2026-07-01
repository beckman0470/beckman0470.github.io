from collections import Counter
from datetime import datetime

REQUIRED_FIELDS = [
    "id", "title", "slug", "date", "seriesTitle", "categoryTitle",
    "characters", "tags", "readingTime", "summary"
]

def validate_story(story):
    meta = story.get("meta", {})
    source = story.get("source", "")
    errors = []
    warnings = []

    for field in REQUIRED_FIELDS:
        if field not in meta or meta[field] in ("", None, []):
            errors.append(f"{source}: missing required field `{field}`")

    try:
        datetime.strptime(str(meta.get("date", "")), "%Y-%m-%d")
    except ValueError:
        errors.append(f"{source}: date must be YYYY-MM-DD")

    if "characters" in meta and not isinstance(meta["characters"], list):
        errors.append(f"{source}: characters must be a list")

    if "tags" in meta and not isinstance(meta["tags"], list):
        errors.append(f"{source}: tags must be a list")

    if "research" in meta and not isinstance(meta.get("research", []), list):
        errors.append(f"{source}: research must be a list")

    if len(str(meta.get("summary", ""))) > 160:
        warnings.append(f"{source}: summary is longer than 160 characters")

    if not meta.get("tags"):
        warnings.append(f"{source}: tags is empty")

    if not meta.get("characters"):
        warnings.append(f"{source}: characters is empty")

    return errors, warnings

def validate_collection(stories):
    errors = []
    warnings = []

    ids = [s["meta"].get("id") for s in stories if s.get("meta", {}).get("id")]
    slugs = [s["meta"].get("slug") for s in stories if s.get("meta", {}).get("slug")]

    for value, count in Counter(ids).items():
        if count > 1:
            errors.append(f"duplicate id: {value}")

    for value, count in Counter(slugs).items():
        if count > 1:
            errors.append(f"duplicate slug: {value}")

    for story in stories:
        e, w = validate_story(story)
        errors.extend(e)
        warnings.extend(w)

    return errors, warnings
