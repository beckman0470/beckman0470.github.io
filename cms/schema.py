"""
Chicken Dad Journal CMS Schema
v2.1

定義 Story 必要欄位與資料驗證。
"""

REQUIRED_FIELDS = [
    "id",
    "title",
    "slug",
    "date",
    "series",
    "seriesTitle",
    "category",
    "categoryTitle",
    "characters",
    "tags",
    "readingTime",
    "summary",
]

OPTIONAL_FIELDS = [
    "featured",
    "hero",
    "mood",
    "research",
    "cover",
    "quote",
    "status",
]

def validate_story(meta: dict, source: str = "") -> list[str]:
    errors = []

    for field in REQUIRED_FIELDS:
        if field not in meta or meta[field] in (None, ""):
            errors.append(f"{source}: missing required field `{field}`")

    if "characters" in meta and not isinstance(meta["characters"], list):
        errors.append(f"{source}: `characters` must be a list")

    if "tags" in meta and not isinstance(meta["tags"], list):
        errors.append(f"{source}: `tags` must be a list")

    if "research" in meta and not isinstance(meta["research"], list):
        errors.append(f"{source}: `research` must be a list")

    return errors
