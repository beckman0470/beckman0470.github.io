import json

SITE_URL = "https://beckman0470.github.io"

def website_schema():
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "雞爸爸生活研究室",
        "alternateName": "Chicken Dad Journal",
        "url": SITE_URL,
        "description": "幸福來自平凡生活的點滴累積。"
    }

def article_schema(meta):
    slug = meta.get("slug", "")
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta.get("title", ""),
        "description": meta.get("summary", ""),
        "datePublished": meta.get("date") or meta.get("published", ""),
        "dateModified": meta.get("updated") or meta.get("date") or meta.get("published", ""),
        "author": {"@type": "Person", "@id": SITE_URL + "/#chickendad", "name": "雞爸爸 ChickenDad", "url": "https://vocus.cc/user/@beckman"},
        "publisher": {"@type": "Organization", "name": "雞爸爸生活研究室"},
        "mainEntityOfPage": meta.get("canonicalUrl") or f"{SITE_URL}/articles/{slug}.html"
    }

def script(schema):
    return '<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False).replace('<', '\\u003c') + '</script>'
