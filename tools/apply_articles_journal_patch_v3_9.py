#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply articles page journal split patch.

What it does:
1. Copy css/articles-journal-filter.css into repo.
2. Copy js/articles-journal-filter.js into repo.
3. Inject CSS/JS into articles.html.
4. Replace all 「家庭誌」 with 「家庭誌」 in common text files.
5. Update homepage entrance links from hash anchors to articles.html?journal=...
6. Remove/avoid the old middle category cards by runtime hiding.
"""

from pathlib import Path
import shutil
import re

ROOT = Path(__file__).resolve().parents[1]
PATCH_ROOT = Path(__file__).resolve().parents[1]

# The script may be run after copying this whole package into repo root,
# or only tools/ copied. Locate bundled css/js by walking upward.
def find_bundle_file(rel):
    for base in [ROOT, Path(__file__).resolve().parents[0], Path.cwd()]:
        p = base / rel
        if p.exists():
            return p
    raise FileNotFoundError(f"Cannot find bundled file: {rel}")

def ensure_in_head(html, line):
    if line in html:
        return html
    if "</head>" in html:
        return html.replace("</head>", f"  {line}\n</head>")
    return line + "\n" + html

def ensure_before_body(html, line):
    if line in html:
        return html
    if "</body>" in html:
        return html.replace("</body>", f"  {line}\n</body>")
    return html + "\n" + line + "\n"

# 1. copy assets
(ROOT / "css").mkdir(exist_ok=True)
(ROOT / "js").mkdir(exist_ok=True)

bundle_css = find_bundle_file("css/articles-journal-filter.css")
bundle_js = find_bundle_file("js/articles-journal-filter.js")
shutil.copy(bundle_css, ROOT / "css" / "articles-journal-filter.css")
shutil.copy(bundle_js, ROOT / "js" / "articles-journal-filter.js")

changed = []

# 2. articles.html inject
articles = ROOT / "articles.html"
if articles.exists():
    html = articles.read_text(encoding="utf-8")
    old = html
    html = html.replace("家庭誌", "家庭誌")
    html = ensure_in_head(html, '<link rel="stylesheet" href="css/articles-journal-filter.css">')
    html = ensure_before_body(html, '<script src="js/articles-journal-filter.js" defer></script>')
    # Make top/nav links explicit if they appear in simple hrefs
    html = html.replace('href="#memory"', 'href="articles.html?journal=family"')
    html = html.replace('href="articles.html#memory"', 'href="articles.html?journal=family"')
    html = html.replace('href="#health"', 'href="articles.html?journal=health"')
    html = html.replace('href="articles.html#health"', 'href="articles.html?journal=health"')
    html = html.replace('href="#library"', 'href="articles.html?journal=library"')
    html = html.replace('href="articles.html#library"', 'href="articles.html?journal=library"')
    html = html.replace('href="#style"', 'href="articles.html?journal=style"')
    html = html.replace('href="articles.html#style"', 'href="articles.html?journal=style"')
    html = html.replace('href="#light"', 'href="articles.html?journal=light"')
    html = html.replace('href="articles.html#light"', 'href="articles.html?journal=light"')
    if html != old:
        articles.write_text(html, encoding="utf-8")
        changed.append("articles.html")

# 3. index.html update entrance links and label
index = ROOT / "index.html"
if index.exists():
    html = index.read_text(encoding="utf-8")
    old = html
    html = html.replace("家庭誌", "家庭誌")
    replacements = {
        'articles.html#memory': 'articles.html?journal=family',
        'articles.html#health': 'articles.html?journal=health',
        'articles.html#library': 'articles.html?journal=library',
        'articles.html#style': 'articles.html?journal=style',
        'articles.html#light': 'articles.html?journal=light',
    }
    for a, b in replacements.items():
        html = html.replace(a, b)
    if html != old:
        index.write_text(html, encoding="utf-8")
        changed.append("index.html")

# 4. global text replace for remaining files
suffixes = {".html", ".htm", ".css", ".js", ".json", ".md", ".txt", ".svg", ".xml", ".yml", ".yaml"}
skip_dirs = {".git", "node_modules", ".next", "dist", "build", "__pycache__"}
for path in ROOT.rglob("*"):
    if not path.is_file():
        continue
    if set(path.relative_to(ROOT).parts) & skip_dirs:
        continue
    if path.suffix.lower() not in suffixes:
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    new_text = text.replace("家庭誌", "家庭誌")
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        rel = str(path.relative_to(ROOT))
        if rel not in changed:
            changed.append(rel)

report = "Articles journal split patch v3.9\n\nChanged files:\n" + "\n".join(f"- {f}" for f in changed)
report += "\n\nAdded files:\n- css/articles-journal-filter.css\n- js/articles-journal-filter.js\n"
(ROOT / "articles_journal_patch_report_v3_9.txt").write_text(report, encoding="utf-8")
print(report)
