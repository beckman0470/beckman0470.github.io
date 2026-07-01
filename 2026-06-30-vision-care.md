
REQUIRED_FIELDS = [
    "id",
    "title",
    "slug",
    "date",
    "seriesTitle",
    "categoryTitle",
    "characters",
    "tags",
    "readingTime",
    "summary"
]

def validate_story(meta: dict, source: str = ""):
    errors = []
    for field in REQUIRED_FIELDS:
        if field not in meta or meta[field] in ("", None):
            errors.append(f"{source}: missing required field `{field}`")

    if "characters" in meta and not isinstance(meta["characters"], list):
        errors.append(f"{source}: `characters` must be a list")
    if "tags" in meta and not isinstance(meta["tags"], list):
        errors.append(f"{source}: `tags` must be a list")
    if "research" in meta and not isinstance(meta["research"], list):
        errors.append(f"{source}: `research` must be a list")

    return errors
