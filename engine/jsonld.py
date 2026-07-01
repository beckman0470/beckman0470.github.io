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
        "datePublished": meta.get("date", ""),
        "author": {"@type": "Person", "name": "ChickenDad"},
        "publisher": {"@type": "Organization", "name": "Chicken Dad Journal"},
        "mainEntityOfPage": f"{SITE_URL}/articles/{slug}.html"
    }

def script(schema):
    return '<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False) + '</script>'
