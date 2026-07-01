
from pathlib import Path
def parse_value(value:str):
    value=value.strip()
    if value.lower()=="true": return True
    if value.lower()=="false": return False
    if value.isdigit(): return int(value)
    return value
def parse_front_matter(text:str):
    if not text.startswith("---"): return {}, text
    parts=text.split("---",2)
    if len(parts)<3: return {}, text
    meta={}; current=None
    for line in parts[1].strip().splitlines():
        if not line.strip(): continue
        if line.startswith("  - ") and current:
            meta.setdefault(current,[]).append(line.replace("  - ","",1).strip())
        elif ": " in line:
            k,v=line.split(": ",1); meta[k.strip()]=parse_value(v); current=k.strip()
        elif line.endswith(":"):
            current=line[:-1].strip(); meta[current]=[]
    return meta, parts[2].strip()
def markdown_to_html(body:str):
    html=[]; para=[]
    def flush():
        if para:
            html.append("<p>"+" ".join(para).strip()+"</p>"); para.clear()
    for line in body.splitlines():
        s=line.strip()
        if not s: flush(); continue
        if s.startswith("# "): flush(); html.append(f"<h1>{s[2:].strip()}</h1>")
        elif s.startswith("## "): flush(); html.append(f"<h2>{s[3:].strip()}</h2>")
        elif s.startswith("### "): flush(); html.append(f"<h3>{s[4:].strip()}</h3>")
        else: para.append(s)
    flush(); return "\n".join(html)
def load_markdown_file(path:Path):
    meta,body=parse_front_matter(path.read_text(encoding="utf-8"))
    return {"source":str(path),"meta":meta,"body":body,"html":markdown_to_html(body)}
