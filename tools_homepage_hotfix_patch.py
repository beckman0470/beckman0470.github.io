from pathlib import Path

ROOT = Path(__file__).resolve().parent

CSS = '<link rel="stylesheet" href="./assets/css/homepage-hotfix.css">'
JS = '<script src="./js/homepage-hotfix.js"></script>'

def patch_index(root=ROOT):
    path = Path(root) / "index.html"
    if not path.exists():
        print("index.html not found")
        return False

    text = path.read_text(encoding="utf-8", errors="ignore")
    original = text

    if "assets/css/homepage-hotfix.css" not in text:
        text = text.replace("</head>", CSS + "\n</head>")

    if "js/homepage-hotfix.js" not in text:
        text = text.replace("</body>", JS + "\n</body>")

    # Fix a few common nav concatenation issues if old static HTML missed spacing
    text = text.replace("系列我們一家", "系列　我們一家")
    text = text.replace("故事系列", "故事　系列")
    text = text.replace("搜尋標籤", "搜尋　標籤")
    text = text.replace("標籤訂閱", "標籤　訂閱")

    if text != original:
        path.write_text(text, encoding="utf-8")
        print("index.html patched")
    else:
        print("index.html already patched")
    return True

if __name__ == "__main__":
    patch_index()
