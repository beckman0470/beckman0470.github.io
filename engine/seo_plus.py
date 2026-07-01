def inject_article_seo(html, meta):
    tags=[
        f'<meta property="article:published_time" content="{meta.get("date","")}">',
        f'<meta property="article:section" content="{meta.get("categoryTitle","")}">',
        f'<meta name="keywords" content="{",".join(meta.get("tags",[]))}">'
    ]
    return html.replace("</head>","\n".join(tags)+"\n</head>")
