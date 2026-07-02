# v5.4 Sprint 2.1 Typography helper
# Optional utility: inject typography stylesheet into generated article HTML.

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LINK_TAG = '<link rel="stylesheet" href="../assets/css/typography.css">'

def patch_article_html(root=ROOT):
    articles = Path(root) / "articles"
    if not articles.exists():
        print("No articles folder.")
        return 0

    count = 0
    for html_file in articles.glob("*.html"):
        text = html_file.read_text(encoding="utf-8", errors="ignore")
        if "assets/css/typography.css" not in text:
            text = text.replace("</head>", LINK_TAG + "\n</head>")
            count += 1

        text = text.replace('class="article-body"', 'class="article-body article-reading"')
        html_file.write_text(text, encoding="utf-8")

    print(f"Patched {count} article file(s).")
    return count

if __name__ == "__main__":
    patch_article_html()
