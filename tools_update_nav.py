"""
v3.5 Navigation Helper

This helper updates common navigation references in static HTML files.
Run from project root:

python tools_update_nav.py

It is optional. You may also upload subscribe.html only.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent

NAV_OLD_MARKERS = [
    '<a href="./search.html">搜尋</a><a href="./family.html">',
    '<a href="./search.html" class="active">搜尋</a><a href="./family.html">',
    '<a href="./tags.html" class="active">標籤</a><a href="./family.html">',
]

def update_file(path: Path):
    text = path.read_text(encoding="utf-8")
    original = text

    text = text.replace('<a href="./search.html">搜尋</a><a href="./family.html">', '<a href="./search.html">搜尋</a><a href="./tags.html">標籤</a><a href="./subscribe.html">訂閱</a><a href="./family.html">')
    text = text.replace('<a href="./search.html" class="active">搜尋</a><a href="./family.html">', '<a href="./search.html" class="active">搜尋</a><a href="./tags.html">標籤</a><a href="./subscribe.html">訂閱</a><a href="./family.html">')
    text = text.replace('<a href="./tags.html" class="active">標籤</a><a href="./family.html">', '<a href="./tags.html" class="active">標籤</a><a href="./subscribe.html">訂閱</a><a href="./family.html">')

    text = text.replace('<p><a href="./search.html">搜尋</a></p>', '<p><a href="./search.html">搜尋</a></p><p><a href="./tags.html">標籤</a></p><p><a href="./subscribe.html">訂閱</a></p>')

    if text != original:
        path.write_text(text, encoding="utf-8")
        print("Updated", path)

for filename in ["index.html", "articles.html", "series.html", "search.html", "tags.html", "family.html", "about.html"]:
    p = ROOT / filename
    if p.exists():
        update_file(p)
