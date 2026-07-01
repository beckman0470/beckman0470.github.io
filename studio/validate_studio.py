from studio.status import VALID_STATUS, normalize_status

REQUIRED_STUDIO_FIELDS = [
    "title",
    "slug",
    "status",
    "visibility",
    "seriesTitle",
    "categoryTitle",
    "tags",
    "characters",
    "summary",
]

def validate_studio_meta(meta, source=""):
    errors = []
    warnings = []

    for field in REQUIRED_STUDIO_FIELDS:
        if field not in meta or meta[field] in ("", None, []):
            errors.append(f"{source}: missing studio field `{field}`")

    if normalize_status(meta.get("status")) not in VALID_STATUS:
        errors.append(f"{source}: invalid status `{meta.get('status')}`")

    if meta.get("status") == "scheduled" and not meta.get("publishDate"):
        errors.append(f"{source}: scheduled story requires `publishDate`")

    if not meta.get("cover"):
        warnings.append(f"{source}: missing cover")

    if not meta.get("aiDescription"):
        warnings.append(f"{source}: missing aiDescription")

    return errors, warnings
