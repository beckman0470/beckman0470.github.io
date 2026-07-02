from pathlib import Path
import re
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]

PAGE_JS_RULES = {
    "js/homepage.js": {"index.html"},
    "js/search.js": {"search.html"},
    "js/timeline-page.js": {"timeline.html"},
    "js/knowledge-graph.js": {"knowledge.html"},
    "js/dashboard.js": {"dashboard.html"},
}

ARTICLE_ONLY_JS = {
    "js/reader-experience.js",
    "js/story-flow.js",
}

def normalize_ref(ref, html_path):
    ref = ref.split("?")[0].split("#")[0]
    if ref.startswith("http://") or ref.startswith("https://"):
        return ref
    base = html_path.parent
    return str((base / ref).resolve().relative_to(ROOT.resolve())).replace("\\", "/")

def main():
    warnings = []
    css_refs = defaultdict(list)
    js_refs = defaultdict(list)

    for html in ROOT.rglob("*.html"):
        if ".git" in html.parts or "__MACOSX" in html.parts:
            continue
        text = html.read_text(encoding="utf-8", errors="ignore")
        rel_html = str(html.relative_to(ROOT)).replace("\\", "/")

        for href in re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', text, flags=re.I):
            try:
                css_refs[normalize_ref(href, html)].append(rel_html)
            except Exception:
                css_refs[href].append(rel_html)

        for src in re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', text, flags=re.I):
            try:
                norm = normalize_ref(src, html)
            except Exception:
                norm = src
            js_refs[norm].append(rel_html)

    for js, allowed_pages in PAGE_JS_RULES.items():
        for page in js_refs.get(js, []):
            if page not in allowed_pages:
                warnings.append(f"{js} should not be loaded by {page}")

    for js in ARTICLE_ONLY_JS:
        for page in js_refs.get(js, []):
            if not page.startswith("articles/"):
                warnings.append(f"{js} should normally be article-only, but is loaded by {page}")

    duplicate_css = {k:v for k,v in css_refs.items() if len(v) != len(set(v))}
    duplicate_js = {k:v for k,v in js_refs.items() if len(v) != len(set(v))}

    if duplicate_css:
        warnings.append("duplicate CSS references detected")
    if duplicate_js:
        warnings.append("duplicate JS references detected")

    print("Dependency check")
    print("CSS files referenced:", len(css_refs))
    print("JS files referenced:", len(js_refs))

    if warnings:
        print("\nWarnings:")
        for w in warnings:
            print(" -", w)
        raise SystemExit(1)

    print("Dependency check passed.")

if __name__ == "__main__":
    main()
