from datetime import date
from studio.status import normalize_status

DEFAULT_META = {
    "status": "draft",
    "visibility": "public",
    "featured": False,
    "hero": False,
    "readingTime": 5,
    "wordCount": 0,
    "aiSummary": "",
    "aiKeywords": [],
    "aiDescription": "",
}

def enrich_meta(meta, body=""):
    enriched = dict(DEFAULT_META)
    enriched.update(meta)

    enriched["status"] = normalize_status(enriched.get("status"))
    enriched["wordCount"] = len(body.replace("\n", " ").split())

    if not enriched.get("lastModified"):
        enriched["lastModified"] = date.today().isoformat()

    if not enriched.get("publishDate"):
        enriched["publishDate"] = enriched.get("date", "")

    if not enriched.get("aiDescription"):
        enriched["aiDescription"] = enriched.get("summary", "")

    if not enriched.get("aiSummary"):
        enriched["aiSummary"] = enriched.get("summary", "")

    if not enriched.get("aiKeywords"):
        enriched["aiKeywords"] = enriched.get("tags", [])

    return enriched
