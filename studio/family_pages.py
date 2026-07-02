
import json
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]

FAMILY_PROFILES = {
    "ChickenDad": {
        "displayName": "雞爸爸",
        "emoji": "🐔",
        "role": "記錄者 / 研究者 / 陪伴者",
        "intro": "喜歡蒐集、驗證、分析生活中的資料，理解之後落實到家庭與日常，再把有趣的部分分享出來。"
    },
    "DoDo": {
        "displayName": "鼠姊姊",
        "emoji": "🐭",
        "role": "活潑好動的姊姊",
        "intro": "活潑、愛漂亮、愛唱歌跳舞，也是雞爸爸生活研究室裡最常出現的成長主角之一。"
    },
    "Dragon": {
        "displayName": "龍弟弟",
        "emoji": "🐲",
        "role": "愛笑的一歲半弟弟",
        "intro": "愛笑、聰明、聲音宏亮，喜歡車車，也喜歡用自己的方式參與家裡每一場小冒險。"
    },
    "B.Dragon": {
        "displayName": "龍弟弟",
        "emoji": "🐲",
        "role": "愛笑的一歲半弟弟",
        "intro": "愛笑、聰明、聲音宏亮，喜歡車車，也喜歡用自己的方式參與家裡每一場小冒險。"
    },
    "RatMom": {
        "displayName": "鼠媽媽",
        "emoji": "🐭",
        "role": "家裡最穩定的溫柔力量",
        "intro": "溫柔、細心、安定，是家裡最可靠的節奏，也是孩子與雞爸爸安心的依靠。"
    },
    "RabbitAma": {
        "displayName": "兔阿嬤",
        "emoji": "🐰",
        "role": "生活智慧與溫暖照顧者",
        "intro": "溫暖、會照顧人，也常常在日常裡提醒我們，幸福其實藏在平凡的細節裡。"
    }
}

def safe_slug(name):
    return name.replace(".", "-").replace(" ", "-")

def load_stories(root=ROOT):
    path = Path(root) / "data" / "stories.json"
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))

def collect_character_data(stories):
    data = defaultdict(lambda: {
        "stories": [],
        "tags": defaultdict(int),
        "series": defaultdict(int),
        "categories": defaultdict(int),
        "timeline": defaultdict(list),
    })

    for story in stories:
        for char in story.get("characters", []):
            item = data[char]
            item["stories"].append(story)

            for tag in story.get("tags", []):
                item["tags"][tag] += 1

            if story.get("series"):
                item["series"][story["series"]] += 1

            if story.get("category"):
                item["categories"][story["category"]] += 1

            date = story.get("date", "")
            year = date[:4] if len(date) >= 4 else "unknown"
            item["timeline"][year].append(story)

    return data

def render_page(character, payload):
    profile = FAMILY_PROFILES.get(character, {
        "displayName": character,
        "emoji": "🏡",
        "role": "Family member",
        "intro": "這是雞爸爸生活研究室裡的人物節點。"
    })

    stories = sorted(payload["stories"], key=lambda s: s.get("date", ""), reverse=True)
    tags = sorted(payload["tags"].items(), key=lambda x: (-x[1], x[0]))[:12]
    series = sorted(payload["series"].items(), key=lambda x: (-x[1], x[0]))[:8]
    timeline = {year: sorted(items, key=lambda s: s.get("date", ""), reverse=True) for year, items in payload["timeline"].items()}

    story_cards = []
    for s in stories:
        story_cards.append(f"""
        <a class="story-card" href="../{s.get('url', '#')}">
          <span class="chip">{s.get('series') or s.get('category') or '故事'}</span>
          <h3>{s.get('title')}</h3>
          <p class="muted">{s.get('summary') or ''}</p>
          <div class="date">{s.get('date') or ''}</div>
        </a>
        """)
    story_cards_html = "".join(story_cards) or '<div class="empty">目前沒有相關文章。</div>'

    tag_html = "".join([f'<span class="tag">{name}<small>{count}</small></span>' for name, count in tags]) or '<span class="muted">尚無標籤</span>'
    series_html = "".join([f'<div class="line"><strong>{name}</strong><span>{count} 篇</span></div>' for name, count in series]) or '<div class="empty">尚無系列</div>'

    timeline_sections = []
    for year, items in sorted(timeline.items(), reverse=True):
        events = []
        for s in items:
            events.append(f'<a class="event" href="../{s.get("url","#")}"><span>{s.get("date","")}</span><strong>{s.get("title")}</strong></a>')
        timeline_sections.append(f'<section class="year"><h3>{year}</h3>{"".join(events)}</section>')
    timeline_html = "".join(timeline_sections) or '<div class="empty">尚無時間軸。</div>'

    return f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{profile["displayName"]}｜Family Knowledge｜雞爸爸生活研究室</title>
<meta name="description" content="{profile["intro"]}">
<style>
:root{{--paper:#F8F6F1;--surface:#FFFDF8;--ink:#263328;--muted:#687463;--brown:#A67C52;--line:#E6DED1;--shadow:0 24px 60px rgba(70,55,35,.12);--serif:Georgia,"Times New Roman",serif;--sans:-apple-system,BlinkMacSystemFont,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.75}}a{{text-decoration:none;color:inherit}}.container{{width:min(1120px,calc(100% - 40px));margin:auto}}.muted{{color:var(--muted)}}.kicker{{font-size:13px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--brown)}}
.hero{{padding:72px 0 46px;background:linear-gradient(180deg,#FFFDF8 0%,#F8F6F1 100%)}}.hero-grid{{display:grid;grid-template-columns:180px 1fr;gap:34px;align-items:center}}.avatar{{width:160px;height:160px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:82px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow)}}h1{{font-family:var(--serif);font-size:clamp(48px,7vw,86px);line-height:1.05;margin:8px 0}}.role{{font-size:22px;font-weight:950;color:var(--brown);margin:0 0 12px}}.lead{{font-size:20px;color:#344238;max-width:760px}}.nav{{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}}.btn{{display:inline-flex;padding:11px 18px;border-radius:999px;background:var(--ink);color:white;font-weight:950}}.btn.secondary{{background:var(--surface);color:var(--ink);border:1px solid var(--line)}}
.section{{padding:42px 0}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:22px}}.panel,.story-card{{background:var(--surface);border:1px solid var(--line);border-radius:26px;box-shadow:var(--shadow);padding:24px}}.story-grid{{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}}.chip,.tag{{display:inline-flex;padding:5px 11px;border-radius:999px;background:#EEE6D9;color:var(--brown);font-size:13px;font-weight:950}}.tag{{margin:5px}}.tag small{{margin-left:6px;opacity:.7}}.story-card h3{{font-size:22px;line-height:1.35;margin:10px 0}}.date{{font-family:var(--serif);font-weight:700;color:var(--brown)}}.line{{display:flex;justify-content:space-between;border-top:1px solid var(--line);padding:12px 0}}.year{{margin-top:18px}}.year h3{{font-family:var(--serif);font-size:36px;margin:0 0 8px}}.event{{display:grid;grid-template-columns:120px 1fr;gap:14px;border-top:1px solid var(--line);padding:12px 0}}.event span{{color:var(--brown);font-weight:900}}.empty{{color:var(--muted);padding:12px 0}}
@media(max-width:800px){{.hero-grid,.grid,.story-grid{{grid-template-columns:1fr}}.avatar{{width:130px;height:130px}}.event{{grid-template-columns:1fr}}}}
</style>
</head>
<body>
<header class="hero"><div class="container hero-grid"><div class="avatar">{profile["emoji"]}</div><div><div class="kicker">Family Knowledge</div><h1>{profile["displayName"]}</h1><p class="role">{profile["role"]}</p><p class="lead">{profile["intro"]}</p><nav class="nav"><a class="btn" href="../family.html">回我們一家</a><a class="btn secondary" href="../knowledge.html">知識圖譜</a><a class="btn secondary" href="../timeline.html">時間軸</a><a class="btn secondary" href="../index.html">首頁</a></nav></div></div></header>
<main>
<section class="section"><div class="container grid"><div class="panel"><div class="kicker">Tags</div><h2>相關標籤</h2>{tag_html}</div><div class="panel"><div class="kicker">Series</div><h2>相關系列</h2>{series_html}</div></div></section>
<section class="section"><div class="container"><div class="kicker">Stories</div><h2>出現文章</h2><div class="story-grid">{story_cards_html}</div></div></section>
<section class="section"><div class="container panel"><div class="kicker">Timeline</div><h2>人物時間軸</h2>{timeline_html}</div></section>
</main>
</body>
</html>"""

def build_family_pages(root=ROOT):
    root = Path(root)
    stories = load_stories(root)
    data = collect_character_data(stories)
    family_dir = root / "family"
    family_dir.mkdir(exist_ok=True)

    pages = []
    for character, payload in data.items():
        filename = safe_slug(character) + ".html"
        html = render_page(character, payload)
        (family_dir / filename).write_text(html, encoding="utf-8")
        pages.append({
            "character": character,
            "file": f"family/{filename}",
            "stories": len(payload["stories"])
        })

    data_dir = root / "data"
    data_dir.mkdir(exist_ok=True)
    (data_dir / "family-pages.json").write_text(
        json.dumps(pages, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    return pages

if __name__ == "__main__":
    pages = build_family_pages()
    print("Family knowledge pages generated.")
    for page in pages:
        print("-", page["file"], page["stories"])
