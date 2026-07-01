from datetime import date
from email.utils import formatdate
import time

SITE_URL = "https://beckman0470.github.io"
SITE_TITLE = "雞爸爸生活研究室"
SITE_DESC = "幸福來自平凡生活的點滴累積。分享生活的故事，用科學理解生活，用陪伴記錄成長。"

def xml_escape(text):
    if text is None:
        return ""
    return str(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

def build_sitemap(stories):
    today = date.today().isoformat()
    static_pages = [
        ("", "1.0"),
        ("index.html", "1.0"),
        ("articles.html", "0.9"),
        ("series.html", "0.8"),
        ("timeline.html", "0.8"),
        ("search.html", "0.8"),
        ("tags.html", "0.8"),
        ("subscribe.html", "0.7"),
        ("family.html", "0.8"),
        ("about.html", "0.7"),
    ]

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

    for path, priority in static_pages:
        lines.append("  <url>")
        lines.append(f"    <loc>{SITE_URL}/{path}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")

    for story in stories:
        lines.append("  <url>")
        lines.append(f"    <loc>{SITE_URL}/{story.get('url')}</loc>")
        lines.append(f"    <lastmod>{story.get('date', today)}</lastmod>")
        lines.append("    <priority>0.7</priority>")
        lines.append("  </url>")

    lines.append("</urlset>")
    return "\n".join(lines) + "\n"

def build_rss(stories):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0">',
        '<channel>',
        f'<title>{xml_escape(SITE_TITLE)}</title>',
        f'<link>{SITE_URL}/</link>',
        f'<description>{xml_escape(SITE_DESC)}</description>',
        '<language>zh-Hant</language>',
        f'<lastBuildDate>{formatdate(time.time(), usegmt=True)}</lastBuildDate>'
    ]

    for story in stories[:20]:
        link = f"{SITE_URL}/{story.get('url')}"
        lines.extend([
            "<item>",
            f"<title>{xml_escape(story.get('title'))}</title>",
            f"<link>{link}</link>",
            f"<guid>{link}</guid>",
            f"<description>{xml_escape(story.get('summary'))}</description>",
            f"<category>{xml_escape(story.get('category'))}</category>",
            f"<pubDate>{story.get('date')}</pubDate>",
            "</item>"
        ])

    lines.extend(["</channel>", "</rss>"])
    return "\n".join(lines) + "\n"

def build_robots():
    return f"""User-agent: *
Allow: /

Sitemap: {SITE_URL}/sitemap.xml
"""
