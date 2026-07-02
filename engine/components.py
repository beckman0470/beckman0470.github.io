from pathlib import Path

def component_root(root):
    return Path(root) / "templates" / "components"

def load_component(root, name):
    path = component_root(root) / name
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")

def render_navigation(root):
    return load_component(root, "navigation.html")

def render_header(root):
    header = load_component(root, "header.html")
    navigation = render_navigation(root)
    return header.replace("{{ navigation }}", navigation)

def render_footer(root):
    return load_component(root, "footer.html")

def inject_header_footer(html, root):
    """Replace the first existing header/footer with shared components.

    This is intentionally conservative: if no header/footer exists, it inserts
    the component after <body> or before </body>.
    """
    header = render_header(root)
    footer = render_footer(root)

    if header:
        if "<header" in html.lower():
            html = __import__("re").sub(r"<header[\s\S]*?</header>", header, html, count=1, flags=__import__("re").I)
        else:
            html = html.replace("<body>", "<body>\n" + header, 1)

    if footer:
        if "<footer" in html.lower():
            html = __import__("re").sub(r"<footer[\s\S]*?</footer>", footer, html, count=1, flags=__import__("re").I)
        else:
            html = html.replace("</body>", footer + "\n</body>", 1)

    return html
