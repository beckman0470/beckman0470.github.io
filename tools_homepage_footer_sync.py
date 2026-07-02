from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
FOOTER_PATH = ROOT / "templates" / "components" / "footer.html"
CSS_LINK = '<link rel="stylesheet" href="./assets/css/footer-sync.css">'

def replace_footer(html, footer):
    pattern = re.compile(r"<footer[\s\S]*?</footer>", re.IGNORECASE)
    if pattern.search(html):
        return pattern.sub(footer, html, count=1)
    return html.replace("</body>", footer + "\n</body>")

def patch_index(root=ROOT):
    index = Path(root) / "index.html"
    if not index.exists():
        print("index.html not found")
        return False

    footer = FOOTER_PATH.read_text(encoding="utf-8")
    text = index.read_text(encoding="utf-8", errors="ignore")
    original = text

    text = replace_footer(text, footer)

    if "assets/css/footer-sync.css" not in text:
        text = text.replace("</head>", CSS_LINK + "\n</head>")

    # 修正舊版導覽文字黏在一起的常見狀況
    text = text.replace("系列我們一家", "系列　我們一家")
    text = text.replace("故事系列", "故事　系列")
    text = text.replace("知識圖譜Dashboard", "知識圖譜　Dashboard")

    if text != original:
        index.write_text(text, encoding="utf-8")
        print("Homepage footer synced.")
    else:
        print("Homepage already synced.")

    return True

if __name__ == "__main__":
    patch_index()
