
from pathlib import Path

def parse_value(value: str):
    value = value.strip()
    if value.lower() == "true":
        return True
    if value.lower() == "false":
        return False
    if value.isdigit():
        return int(value)
    return value

def parse_front_matter(text: str):
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text

    meta = {}
    current_key = None

    for line in parts[1].strip().splitlines():
        if not line.strip():
            continue
        if line.startswith("  - ") and current_key:
            meta.setdefault(current_key, []).append(line.replace("  - ", "", 1).strip())
            continue
        if ": " in line:
            key, value = line.split(": ", 1)
            key = key.strip()
            meta[key] = parse_value(value)
            current_key = key
        elif line.endswith(":"):
            key = line[:-1].strip()
            meta[key] = []
            current_key = key

    return meta, parts[2].strip()

def markdown_to_html(body: str):
    html = []
    paragraph = []

    def flush():
        if paragraph:
            html.append("<p>" + " ".join(paragraph).strip() + "</p>")
            paragraph.clear()

    for raw in body.splitlines():
        line = raw.strip()
        if not line:
            flush()
            continue
        if line.startswith("# "):
            flush()
            html.append(f"<h1>{line[2:].strip()}</h1>")
        elif line.startswith("## "):
            flush()
            html.append(f"<h2>{line[3:].strip()}</h2>")
        elif line.startswith("### "):
            flush()
            html.append(f"<h3>{line[4:].strip()}</h3>")
        elif line.startswith("> "):
            flush()
            html.append(f"<blockquote>{line[2:].strip()}</blockquote>")
        else:
            paragraph.append(line)

    flush()
    return "\n".join(html)

def load_markdown_file(path: Path):
    text = path.read_text(encoding="utf-8")
    meta, body = parse_front_matter(text)
    return {
        "source": str(path),
        "meta": meta,
        "body": body,
        "html": markdown_to_html(body)
    }
