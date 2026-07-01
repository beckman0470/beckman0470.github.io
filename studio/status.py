VALID_STATUS = [
    "draft",
    "review",
    "scheduled",
    "published",
    "archived"
]

def normalize_status(value):
    value = (value or "draft").strip().lower()
    return value if value in VALID_STATUS else "draft"

def is_publishable(meta):
    return normalize_status(meta.get("status")) == "published"
