from collections import defaultdict

def story_summary(story):
    meta = story["meta"]
    return {
        "id": meta.get("id"),
        "title": meta.get("title"),
        "slug": meta.get("slug"),
        "date": meta.get("date"),
        "summary": meta.get("summary"),
        "series": meta.get("seriesTitle"),
        "category": meta.get("categoryTitle"),
        "featured": meta.get("featured", False),
        "hero": meta.get("hero", False),
        "tags": meta.get("tags", []),
        "characters": meta.get("characters", []),
        "research": meta.get("research", []),
        "url": f"articles/{meta.get('slug')}.html"
    }

def build_stories_json(stories):
    data = [story_summary(story) for story in stories]
    data.sort(key=lambda s: s.get("date", ""), reverse=True)
    return data

def build_search_index(stories):
    index = []
    for story in stories:
        meta = story["meta"]
        text = " ".join([
            str(meta.get("title", "")),
            str(meta.get("summary", "")),
            str(meta.get("seriesTitle", "")),
            str(meta.get("categoryTitle", "")),
            " ".join(meta.get("tags", [])),
            " ".join(meta.get("characters", [])),
            " ".join(meta.get("research", [])),
            story.get("body", "")
        ])
        index.append({
            "id": meta.get("id"),
            "title": meta.get("title"),
            "url": f"articles/{meta.get('slug')}.html",
            "date": meta.get("date"),
            "summary": meta.get("summary"),
            "text": text
        })
    return index

def build_tag_index(stories):
    tags = defaultdict(list)
    for story in stories:
        meta = story["meta"]
        item = story_summary(story)
        for tag in meta.get("tags", []):
            tags[tag].append(item)
    return dict(tags)

def build_series_index(stories):
    series = defaultdict(list)
    for story in stories:
        meta = story["meta"]
        item = story_summary(story)
        series[meta.get("seriesTitle", "未分類")].append(item)
    return dict(series)
