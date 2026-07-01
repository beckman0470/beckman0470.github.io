from collections import defaultdict

def build_timeline(stories):
    timeline = defaultdict(lambda: defaultdict(list))
    sorted_stories = sorted(stories, key=lambda s: s["meta"].get("date", ""), reverse=True)

    for story in sorted_stories:
        meta = story["meta"]
        date = str(meta.get("date", ""))
        year = date[:4] if len(date) >= 4 else "unknown"
        month = date[5:7] if len(date) >= 7 else "unknown"

        timeline[year][month].append({
            "id": meta.get("id"),
            "title": meta.get("title"),
            "slug": meta.get("slug"),
            "date": meta.get("date"),
            "series": meta.get("seriesTitle"),
            "category": meta.get("categoryTitle"),
            "characters": meta.get("characters", []),
            "tags": meta.get("tags", []),
            "summary": meta.get("summary"),
            "url": f"articles/{meta.get('slug')}.html"
        })

    return {year: dict(months) for year, months in timeline.items()}
