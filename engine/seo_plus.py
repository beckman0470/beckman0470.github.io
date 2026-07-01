from engine.jsonld import article_schema, script

def inject_article_seo(html, meta):
    keywords = ",".join(meta.get("tags", []))
    tags = [
        f'<link rel="canonical" href="https://beckman0470.github.io/articles/{meta.get("slug","")}.html">',
        f'<meta property="article:published_time" content="{meta.get("date","")}">',
        f'<meta property="article:section" content="{meta.get("categoryTitle","")}">',
        f'<meta name="keywords" content="{keywords}">',
        script(article_schema(meta))
    ]
    return html.replace("</head>", "\n".join(tags) + "\n</head>")
