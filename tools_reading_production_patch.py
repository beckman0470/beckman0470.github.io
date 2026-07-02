from pathlib import Path

ROOT = Path(__file__).resolve().parent

HEAD_LINKS = [
    '<link rel="stylesheet" href="../assets/css/typography.css">',
    '<link rel="stylesheet" href="../assets/css/reader-experience.css">',
    '<link rel="stylesheet" href="../assets/css/story-flow.css">',
]

BODY_SCRIPTS = [
    '<script src="../js/reader-experience.js"></script>',
    '<script src="../js/story-flow.js"></script>',
]

def patch_articles(root=ROOT):
    articles = Path(root) / "articles"
    if not articles.exists():
        print("No articles folder.")
        return 0

    count = 0
    for html in articles.glob("*.html"):
        text = html.read_text(encoding="utf-8", errors="ignore")
        original = text

        for link in HEAD_LINKS:
            marker = link.split("href=\"")[1].split("\"")[0]
            if marker not in text:
                text = text.replace("</head>", link + "\n</head>")

        for script in BODY_SCRIPTS:
            marker = script.split("src=\"")[1].split("\"")[0]
            if marker not in text:
                text = text.replace("</body>", script + "\n</body>")

        if 'class="article-body"' in text and 'article-reading' not in text:
            text = text.replace('class="article-body"', 'class="article-body article-reading"')

        if text != original:
            html.write_text(text, encoding="utf-8")
            count += 1

    print(f"Reading Production patched {count} article file(s).")
    return count

if __name__ == "__main__":
    patch_articles()
