"""
Chicken Dad Journal Markdown Parser
v2.1

不依賴外部套件，解析簡易 YAML front matter。
支援：
- key: value
- list:
  - item
"""

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

    raw_meta = parts[1].strip().splitlines()
    body = parts[2].strip()

    meta = {}
    current_key = None

    for line in raw_meta:
        if not line.strip():
            continue

        if line.startswith("  - ") and current_key:
            meta.setdefault(current_key, []).append(line.replace("  - ", "", 1).strip())
            continue

        if ": " in line:
            key, value = line.split(": ", 1)
            key = key.strip()
            value = value.strip()
            meta[key] = parse_value(value)
            current_key = key
        elif line.endswith(":"):
            key = line[:-1].strip()
            meta[key] = []
            current_key = key

    return meta, body

def markdown_to_html(body: str) -> str:
    html = []
    paragraphs = []
    lines = body.splitlines()

    def flush_paragraph():
        if paragraphs:
            html.append("<p>" + " ".join(paragraphs).strip() + "</p>")
            paragraphs.clear()

    for line in lines:
        stripped = line.strip()

        if not stripped:
            flush_paragraph()
            continue

        if stripped.startswith("# "):
            flush_paragraph()
            html.append(f"<h1>{stripped[2:].strip()}</h1>")
        elif stripped.startswith("## "):
            flush_paragraph()
            html.append(f"<h2>{stripped[3:].strip()}</h2>")
        elif stripped.startswith("### "):
            flush_paragraph()
            html.append(f"<h3>{stripped[4:].strip()}</h3>")
        else:
            paragraphs.append(stripped)

    flush_paragraph()
    return "\n".join(html)

def load_markdown_file(path: Path):
    text = path.read_text(encoding="utf-8")
    meta, body = parse_front_matter(text)
    html = markdown_to_html(body)
    return {
        "source": str(path),
        "meta": meta,
        "body": body,
        "html": html
    }
