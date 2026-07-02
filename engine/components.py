from pathlib import Path

def load_component(root, name):
    path = Path(root) / "templates" / "components" / name
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")

def render_footer(root):
    return load_component(root, "footer.html")
