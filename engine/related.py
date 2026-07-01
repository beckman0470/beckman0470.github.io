def story_item(story):
    meta = story["meta"]
    return {
        "id": meta.get("id"),
        "title": meta.get("title"),
        "slug": meta.get("slug"),
        "date": meta.get("date"),
        "summary": meta.get("summary"),
        "series": meta.get("seriesTitle"),
        "category": meta.get("categoryTitle"),
        "url": f"articles/{meta.get('slug')}.html"
    }

def score_related(current, other):
    if current["meta"].get("id") == other["meta"].get("id"):
        return 0

    a = current["meta"]
    b = other["meta"]
    score = 0

    if a.get("seriesTitle") and a.get("seriesTitle") == b.get("seriesTitle"):
        score += 5
    if a.get("categoryTitle") and a.get("categoryTitle") == b.get("categoryTitle"):
        score += 3

    score += len(set(a.get("tags", [])) & set(b.get("tags", []))) * 3
    score += len(set(a.get("characters", [])) & set(b.get("characters", []))) * 2
    score += len(set(a.get("research", [])) & set(b.get("research", []))) * 2
    return score

def build_related_map(stories, limit=4):
    related = {}

    for story in stories:
        story_id = story["meta"].get("id")
        scored = []

        for other in stories:
            score = score_related(story, other)
            if score > 0:
                scored.append((score, other))

        scored.sort(key=lambda item: (item[0], item[1]["meta"].get("date", "")), reverse=True)
        related[story_id] = [story_item(item) for score, item in scored[:limit]]

    return related

def build_prev_next_map(stories):
    ordered = sorted(stories, key=lambda s: s["meta"].get("date", ""), reverse=True)
    result = {}

    for idx, story in enumerate(ordered):
        story_id = story["meta"].get("id")
        newer = ordered[idx - 1] if idx > 0 else None
        older = ordered[idx + 1] if idx < len(ordered) - 1 else None
        result[story_id] = {
            "previous": story_item(newer) if newer else None,
            "next": story_item(older) if older else None
        }

    return result
