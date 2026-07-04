#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Chicken Dad Journal｜V7 Article-only publisher

用途：
- 只新增文章，不改首頁、不改 Family、不改全站設計。
- 讀取 tools/article-only/new/meta.json 與 article.md。
- 寫入 content/works/<slug>/。
- 更新 content/content-index.json。
- 產生 articles/<slug>.html。

使用：
1. 複製 tools/article-only/meta.template.json 到 tools/article-only/new/meta.json
2. 複製 tools/article-only/article.template.md 到 tools/article-only/new/article.md
3. 編輯 meta.json 與 article.md
4. 在 repository 根目錄執行：
   python tools/article-only/publish_article.py
"""

from pathlib import Path
import json
import html
import re
from datetime import date

ROOT = Path(__file__).resolve().parents[2]
NEW_DIR = ROOT / "tools" / "article-only" / "new"

def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))

def write_json(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def slugify(text: str) -> str:
    text = str(text or "").strip().lower()
    text = re.sub(r"[^a-z0-9\-]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text or "untitled"

def md_to_html(md: str) -> str:
    lines = md.splitlines()
    out = []
    in_ul = False
    para = []

    def flush_para():
        nonlocal para
        if para:
            text = " ".join(para).strip()
            if text:
                out.append(f"<p>{inline(text)}</p>")
            para = []

    def close_ul():
        nonlocal in_ul
        if in_ul:
            out.append("</ul>")
            in_ul = False

    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()

        if not stripped:
            flush_para()
            close_ul()
            continue

        if stripped.startswith("### "):
            flush_para(); close_ul()
            out.append(f"<h3>{inline(stripped[4:])}</h3>")
        elif stripped.startswith("## "):
            flush_para(); close_ul()
            out.append(f"<h2>{inline(stripped[3:])}</h2>")
        elif stripped.startswith("# "):
            # Vocus article title already in page title; skip first markdown H1.
            flush_para(); close_ul()
            continue
        elif stripped.startswith("> "):
            flush_para(); close_ul()
            out.append(f"<blockquote>{inline(stripped[2:])}</blockquote>")
        elif stripped.startswith("- "):
            flush_para()
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{inline(stripped[2:])}</li>")
        else:
            para.append(stripped)

    flush_para()
    close_ul()
    return "\n".join(out)

def inline(text: str) -> str:
    text = html.escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return text

def esc(value) -> str:
    return html.escape(str(value or ""), quote=True)

def render_article(meta, body_html):
    title = esc(meta.get("title"))
    subtitle = esc(meta.get("subtitle"))
    signature = esc(meta.get("signature"))
    series = esc(meta.get("series"))
    category = esc(meta.get("category"))
    published = esc(meta.get("published"))
    reading = esc(meta.get("readingTime"))
    description = esc(meta.get("subtitle") or meta.get("signature") or meta.get("title"))
    slug = esc(meta.get("slug"))

    tags = meta.get("tags") or []
    people = meta.get("people") or []

    tags_html = "".join([f"<span>{esc(t)}</span>" for t in tags])
    people_html = "".join([f"<span>{esc(p)}</span>" for p in people])

    return f"""<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}｜雞爸爸生活研究室</title>
<meta name="description" content="{description}">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="../css/visual-polish.css">
<link rel="stylesheet" href="../css/global-layout-sync.css">
<link rel="canonical" href="https://beckman0470.github.io/articles/{slug}.html">
<meta property="og:site_name" content="Chicken Dad Journal">
<meta property="og:type" content="article">
<meta property="og:title" content="{title}｜雞爸爸生活研究室">
<meta property="og:description" content="{description}">
<meta property="og:url" content="https://beckman0470.github.io/articles/{slug}.html">
<meta property="og:image" content="https://beckman0470.github.io/assets/og/og-image.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#263328">
<style>
.article-page{{background:#F8F6F1;color:#263328}}
.article-wrap{{width:min(820px,calc(100% - 40px));margin:0 auto;padding:56px 0 80px}}
.article-kicker{{font-size:13px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#A67C52;margin-bottom:14px}}
.article-title{{font-family:Georgia,"Times New Roman","Noto Serif TC",serif;font-size:clamp(42px,6vw,72px);line-height:1.1;margin:0 0 18px}}
.article-subtitle{{font-size:21px;line-height:1.8;color:#56655b;margin:0 0 24px}}
.article-meta{{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0 36px}}
.article-meta span,.article-tags span,.article-people span{{display:inline-flex;padding:7px 12px;border-radius:999px;background:#FFFDF8;border:1px solid #E6DED1;color:#687463;font-weight:800;font-size:14px}}
.article-signature{{margin:34px 0;background:#FFFDF8;border-left:6px solid #A67C52;border-radius:22px;padding:22px 26px;box-shadow:0 18px 50px rgba(70,55,35,.10);font-family:Georgia,"Times New Roman","Noto Serif TC",serif;font-size:24px;line-height:1.6}}
.article-body{{font-size:19px;line-height:2}}
.article-body p{{margin:0 0 1.45em}}
.article-body h2{{font-size:32px;line-height:1.35;margin:2.2em 0 .7em}}
.article-body h3{{font-size:25px;margin:1.8em 0 .5em}}
.article-body blockquote{{background:#FFFDF8;border-left:5px solid #A67C52;padding:18px 22px;border-radius:18px;color:#344238;margin:1.6em 0}}
.article-tags,.article-people{{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}}
.article-actions{{display:flex;gap:12px;flex-wrap:wrap;margin-top:46px}}
.article-actions a{{display:inline-flex;align-items:center;justify-content:center;padding:12px 20px;border-radius:999px;background:#263328;color:white;text-decoration:none;font-weight:900}}
.article-actions a.secondary{{background:#FFFDF8;color:#263328;border:1px solid #E6DED1}}
</style>
</head>
<body class="article-page">
<header class="site-header">
  <div class="container nav">
    <a class="logo" href="../index.html">
      <div class="logo-mark">🐔</div>
      <span class="logo-text">
        <strong>雞爸爸生活研究室</strong>
        <span>Chicken Dad Journal</span>
      </span>
    </a>
    <nav class="nav-links" aria-label="主要導覽">
      <a href="../index.html">首頁</a>
      <a class="active" aria-current="page" href="../articles.html">故事</a>
      <a href="../series.html">系列</a>
      <a href="../timeline.html">時間軸</a>
      <a href="../knowledge.html">知識圖譜</a>
      <a href="../search.html">搜尋</a>
      <a href="../tags.html">標籤</a>
      <a href="../family.html">我們一家</a>
      <a href="../about.html">關於</a>
    </nav>
  </div>
</header>
<main class="article-wrap">
  <div class="article-kicker">{series}</div>
  <h1 class="article-title">{title}</h1>
  <p class="article-subtitle">{subtitle}</p>
  <div class="article-meta">
    <span>{published}</span>
    <span>{category}</span>
    <span>約 {reading} 分鐘</span>
  </div>
  {f'<div class="article-signature">{signature}</div>' if signature else ''}
  <div class="article-tags">{tags_html}</div>
  <div class="article-people">{people_html}</div>
  <article class="article-body">
{body_html}
  </article>
  <div class="article-actions">
    <a href="../articles.html">回故事典藏</a>
    <a class="secondary" href="../index.html">回首頁</a>
  </div>
</main>
<footer class="site-footer">
  <div class="container footer-bottom">© 2026 Chicken Dad Journal. Every family has stories. This is ours.</div>
</footer>
</body>
</html>
"""

def main():
    meta_path = NEW_DIR / "meta.json"
    article_path = NEW_DIR / "article.md"

    if not meta_path.exists() or not article_path.exists():
        raise SystemExit("請先建立 tools/article-only/new/meta.json 與 article.md")

    meta = read_json(meta_path)
    slug = slugify(meta.get("slug") or meta.get("title"))
    meta["slug"] = slug
    meta.setdefault("source", "Vocus")
    meta.setdefault("status", "published")
    meta.setdefault("updated", meta.get("published") or str(date.today()))
    meta["url"] = f"./articles/{slug}.html"

    article_md = article_path.read_text(encoding="utf-8")

    work_dir = ROOT / "content" / "works" / slug
    work_dir.mkdir(parents=True, exist_ok=True)
    (work_dir / "article.md").write_text(article_md, encoding="utf-8")
    write_json(work_dir / "meta.json", meta)

    index_path = ROOT / "content" / "content-index.json"
    index = read_json(index_path)
    meta_ref = f"content/works/{slug}/meta.json"
    works = index.setdefault("works", [])
    if meta_ref not in works:
        works.insert(0, meta_ref)
    write_json(index_path, index)

    body_html = md_to_html(article_md)
    articles_dir = ROOT / "articles"
    articles_dir.mkdir(exist_ok=True)
    (articles_dir / f"{slug}.html").write_text(render_article(meta, body_html), encoding="utf-8")

    print(f"文章已上架：articles/{slug}.html")
    print(f"內容已建立：content/works/{slug}/")
    print("已更新：content/content-index.json")

if __name__ == "__main__":
    main()
