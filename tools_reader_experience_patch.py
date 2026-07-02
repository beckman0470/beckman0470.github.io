from pathlib import Path

ROOT = Path(__file__).resolve().parent

CSS_LINK = '<link rel="stylesheet" href="../assets/css/reader-experience.css">'
JS_SCRIPT = '<script src="../js/reader-experience.js"></script>'

def patch_articles(root=ROOT):
    articles = Path(root) / "articles"
    if not articles.exists():
        print("No articles folder.")
        return 0

    count = 0
    for html in articles.glob("*.html"):
        text = html.read_text(encoding="utf-8", errors="ignore")
        changed = False

        if "assets/css/reader-experience.css" not in text:
            text = text.replace("</head>", CSS_LINK + "\n</head>")
            changed = True

        if "js/reader-experience.js" not in text:
            text = text.replace("</body>", JS_SCRIPT + "\n</body>")
            changed = True

        if 'class="article-body"' in text and 'article-reading' not in text:
            text = text.replace('class="article-body"', 'class="article-body article-reading"')
            changed = True

        if changed:
            html.write_text(text, encoding="utf-8")
            count += 1

    print(f"Reader Experience patched {count} article file(s).")
    return count

if __name__ == "__main__":
    patch_articles()
