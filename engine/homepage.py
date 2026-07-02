
def shared_footer_html():
    return """<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <h3>雞爸爸生活研究室</h3>
      <p>幸福來自平凡生活的點滴累積。</p>
      <p>分享生活的故事，用科學理解生活，用陪伴記錄成長。</p>
    </div>
    <div>
      <h4>閱讀</h4>
      <p><a href="./index.html">首頁</a></p>
      <p><a href="./articles.html">故事</a></p>
      <p><a href="./series.html">系列</a></p>
      <p><a href="./timeline.html">時間軸</a></p>
    </div>
    <div>
      <h4>探索</h4>
      <p><a href="./knowledge.html">知識圖譜</a></p>
      <p><a href="./search.html">搜尋</a></p>
      <p><a href="./tags.html">標籤</a></p>
      <p><a href="./subscribe.html">訂閱</a></p>
    </div>
    <div>
      <h4>品牌</h4>
      <p><a href="./family.html">我們一家</a></p>
      <p><a href="./about.html">關於</a></p>
      <p><a href="./dashboard.html">Dashboard</a></p>
      <p><a href="https://vocus.cc/salon/jisoopama-baby-cat" target="_blank" rel="noopener">Vocus</a></p>
    </div>
  </div>
  <div class="container footer-bottom">© 2026 Chicken Dad Journal. Every family has stories. This is ours.</div>
</footer>
"""


def fix_url(url):
    if not url:
        return "#"
    if url.startswith("./"):
        return url
    if url.startswith("/"):
        return "." + url
    return "./" + url

def card_class(story):
    text = " ".join([
        str(story.get("category", "")),
        str(story.get("series", "")),
        " ".join(story.get("tags", [])),
        " ".join(story.get("research", []))
    ])
    if "健康" in text or "皮質醇" in text:
        return "health"
    if "棒球" in text or "味全" in text:
        return "baseball"
    if "AI" in text:
        return "ai"
    if "DoDo" in text or "游泳" in text or "視力" in text or "家庭" in text:
        return "family"
    return ""

def pick_first(stories, predicate, fallback=None):
    for story in stories:
        if predicate(story):
            return story
    return fallback or {}

def render_small_card(story):
    return """
    <a class="small-card" href="{url}">
      <span class="chip">{label}</span>
      <h3>{title}</h3>
      <p class="muted">{summary}</p>
      <span class="readmore">閱讀 →</span>
    </a>
    """.format(
        url=fix_url(story.get("url")),
        label=story.get("series") or story.get("category") or "Story",
        title=story.get("title") or "",
        summary=story.get("summary") or ""
    )

def render_story_tile(story):
    return """
    <a class="story-tile" href="{url}">
      <div class="tile-cover {cls}"></div>
      <div class="tile-body">
        <span class="chip">{label}</span>
        <h3>{title}</h3>
        <p class="muted">{summary}</p>
      </div>
    </a>
    """.format(
        url=fix_url(story.get("url")),
        cls=card_class(story),
        label=story.get("category") or "故事",
        title=story.get("title") or "",
        summary=story.get("summary") or ""
    )

def render_research_notes(stories):
    research = []
    for story in stories:
        text = " ".join(story.get("research", []) + story.get("tags", []))
        if any(k in text for k in ["健康", "皮質醇", "AI", "棒球", "數據", "研究"]):
            research.append(story)
    research = research[:3] or stories[:3]
    return "".join(render_small_card(s) for s in research)

def render_series(stories):
    counts = {}
    for s in stories:
        key = s.get("series") or "未分類"
        counts[key] = counts.get(key, 0) + 1
    top = sorted(counts.items(), key=lambda x: (-x[1], x[0]))[:4]
    return "".join([
        '<div class="series-card"><div class="kicker">Series</div><h3>{}</h3><p class="muted">{} 篇故事</p></div>'.format(name, count)
        for name, count in top
    ])

def _render_homepage_core(stories):
    stories = sorted(stories, key=lambda s: s.get("date", ""), reverse=True)
    fallback = stories[0] if stories else {}
    hero = pick_first(stories, lambda s: s.get("hero"), fallback)
    editor = pick_first(stories, lambda s: s.get("featured") and s != hero, stories[1] if len(stories) > 1 else fallback)

    family = [
        s for s in stories
        if any(k in " ".join([s.get("category",""), s.get("series","")] + s.get("tags",[]))
               for k in ["家庭","DoDo","陪伴","游泳","視力"])
    ][:3] or stories[:3]

    latest = stories[:5]
    quote = hero.get("quote") or "幸福來自平凡生活的點滴累積。"

    latest_html = "".join([
        '<a class="latest-row" href="{url}"><span class="date">{date}</span><strong>{title}</strong><span class="muted">{label}</span></a>'.format(
            url=fix_url(s.get("url")),
            date=s.get("date", ""),
            title=s.get("title", ""),
            label=s.get("series") or s.get("category") or ""
        )
        for s in latest
    ])

    html = """<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>雞爸爸生活研究室｜Chicken Dad Journal</title>
<meta name="description" content="幸福來自平凡生活的點滴累積。分享生活的故事，用科學理解生活，用陪伴記錄成長。">
<meta property="og:site_name" content="Chicken Dad Journal">
<meta property="og:type" content="website">
<meta property="og:title" content="雞爸爸生活研究室｜Chicken Dad Journal">
<meta property="og:description" content="幸福來自平凡生活的點滴累積。">
<meta property="og:image" content="https://beckman0470.github.io/assets/og/og-image.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#263328">
<style>
:root{--paper:#F8F6F1;--surface:#FFFDF8;--ink:#263328;--muted:#687463;--brown:#A67C52;--sage:#8FAF8B;--blue:#8DBFD8;--line:#E6DED1;--shadow:0 24px 60px rgba(70,55,35,.12);--serif:Georgia,"Times New Roman",serif;--sans:-apple-system,BlinkMacSystemFont,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.75}a{text-decoration:none;color:inherit}.container{width:min(1180px,calc(100% - 40px));margin:auto}.muted{color:var(--muted)}.kicker{font-size:13px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--brown)}.chip{display:inline-flex;padding:5px 11px;border-radius:999px;background:#EEE6D9;color:var(--brown);font-size:13px;font-weight:950}.readmore{font-weight:950;color:var(--brown)}
.site-header{position:sticky;top:0;z-index:30;background:rgba(255,253,248,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}.nav{height:82px;display:flex;align-items:center;justify-content:space-between;gap:24px}.logo{display:flex;align-items:center;gap:14px}.logo-mark{width:48px;height:48px;border-radius:50%;background:var(--surface);border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:26px}.logo-text strong{display:block;font-size:21px;font-weight:950;line-height:1.2}.logo-text span{display:block;color:var(--muted);font-size:13px}.nav-links{display:flex;gap:20px;font-weight:850}.nav-links a:hover,.nav-links a.active{color:var(--brown)}
.mag-hero{padding:70px 0 54px;background:linear-gradient(180deg,#FFFDF8 0%,#F8F6F1 100%)}.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:34px;align-items:stretch}.hero-cover{min-height:520px;border-radius:42px;background:radial-gradient(circle at 80% 14%,#FFF1BA 0 78px,transparent 80px),linear-gradient(135deg,#FFF7EC,#E8C994 55%,#9EBB9A);box-shadow:var(--shadow);border:1px solid rgba(255,255,255,.8);padding:42px;display:flex;flex-direction:column;justify-content:flex-end}.hero-cover h1{font-family:var(--serif);font-size:clamp(48px,7vw,88px);line-height:1.05;letter-spacing:-.04em;margin:14px 0}.hero-cover p{font-size:22px;max-width:620px}.hero-side{display:grid;gap:18px}.editor-card,.today-card{background:var(--surface);border:1px solid var(--line);border-radius:32px;box-shadow:var(--shadow);padding:30px}.editor-card h2{font-size:34px;line-height:1.2;margin:10px 0}.today-card blockquote{font-family:var(--serif);font-size:28px;line-height:1.45;margin:12px 0;color:#344238}
.section{padding:58px 0}.section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:24px}.section-title{font-size:36px;line-height:1.2;margin:0;font-weight:950;letter-spacing:-.03em}.mag-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.story-tile,.small-card,.series-card{background:var(--surface);border:1px solid var(--line);border-radius:26px;box-shadow:var(--shadow);overflow:hidden;transition:.2s ease}.story-tile:hover,.small-card:hover,.series-card:hover{transform:translateY(-4px)}.tile-cover{height:190px;background:linear-gradient(135deg,#D8C2A8,#FFF7EC)}.tile-cover.family{background:linear-gradient(135deg,var(--blue),#FFF7EC)}.tile-cover.health{background:linear-gradient(135deg,var(--sage),#FFF7EC)}.tile-cover.baseball{background:linear-gradient(135deg,#802424,#F0D0A0)}.tile-cover.ai{background:linear-gradient(135deg,#263328,#8DBFD8)}.tile-body,.small-card,.series-card{padding:22px}.tile-body h3,.small-card h3,.series-card h3{font-size:22px;line-height:1.35;margin:10px 0}
.latest-list{background:var(--surface);border:1px solid var(--line);border-radius:30px;box-shadow:var(--shadow);overflow:hidden}.latest-row{display:grid;grid-template-columns:120px 1fr 180px;gap:18px;align-items:center;padding:18px 22px;border-bottom:1px solid var(--line)}.latest-row:last-child{border-bottom:0}.date{font-family:var(--serif);font-weight:700;color:var(--brown)}.research-grid,.series-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.series-grid{grid-template-columns:repeat(4,1fr)}.quote-band{margin:40px 0;background:#243128;color:#FFFDF8;padding:54px 0}.quote-band blockquote{font-family:var(--serif);font-size:clamp(32px,5vw,58px);line-height:1.2;margin:0}.quote-band p{color:rgba(255,253,248,.7)}.site-footer{margin-top:0;background:#243128;color:#FFFDF8}.footer-grid{display:grid;grid-template-columns:1.4fr .8fr .8fr .8fr;gap:32px;padding:54px 0}.site-footer h3,.site-footer h4{margin-top:0}.site-footer p,.site-footer a{color:rgba(255,253,248,.75)}.footer-bottom{border-top:1px solid rgba(255,255,255,.14);padding:18px 0;color:rgba(255,253,248,.6);font-size:14px}
@media(max-width:980px){.nav-links{display:none}.hero-grid,.mag-grid,.research-grid,.series-grid{grid-template-columns:1fr 1fr}.footer-grid{grid-template-columns:1fr 1fr}.latest-row{grid-template-columns:1fr}}@media(max-width:620px){.container{width:min(100% - 28px,1180px)}.hero-grid,.mag-grid,.research-grid,.series-grid,.footer-grid{grid-template-columns:1fr}.hero-cover{min-height:420px;padding:28px}.section-head{display:block}}
</style>
</head>
<body>
<header class="site-header"><div class="container nav"><a class="logo" href="./index.html"><div class="logo-mark">🐔</div><span class="logo-text"><strong>雞爸爸生活研究室</strong><span>Chicken Dad Journal</span></span></a><nav class="nav-links"><a class="active" href="./index.html">首頁</a><a href="./articles.html">故事</a><a href="./series.html">系列</a><a href="./timeline.html">時間軸</a><a href="./knowledge.html">知識圖譜</a><a href="./dashboard.html">Dashboard</a><a href="./family.html">我們一家</a></nav></div></header>
<main>
<section class="mag-hero"><div class="container hero-grid"><a class="hero-cover" href="{hero_url}"><div class="kicker">Cover Story</div><h1>{hero_title}</h1><p>{hero_summary}</p><span class="readmore">閱讀封面故事 →</span></a><div class="hero-side"><a class="editor-card" href="{editor_url}"><div class="kicker">Editor’s Pick</div><h2>{editor_title}</h2><p class="muted">{editor_summary}</p><span class="readmore">閱讀 →</span></a><div class="today-card"><div class="kicker">Today with Chicken Dad</div><blockquote>{quote}</blockquote><p>今天也從平凡生活裡，撿起一點值得記錄的幸福。</p></div></div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">This Week</div><h2 class="section-title">近期更新</h2></div><a class="readmore" href="./articles.html">全部故事 →</a></div><div class="latest-list">{latest_html}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Family Moments</div><h2 class="section-title">家庭時光</h2></div><a class="readmore" href="./family.html">認識我們一家 →</a></div><div class="mag-grid">{family_html}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Research Notes</div><h2 class="section-title">生活研究筆記</h2></div></div><div class="research-grid">{research_html}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Featured Series</div><h2 class="section-title">精選系列</h2></div><a class="readmore" href="./series.html">全部系列 →</a></div><div class="series-grid">{series_html}</div></div></section>
<section class="quote-band"><div class="container"><div class="kicker">Brand Quote</div><blockquote>Every family has stories. This is ours.</blockquote><p>在平凡生活裡，慢慢累積屬於我們家的故事。</p></div></section>
</main>
<footer class="site-footer"><div class="container footer-grid"><div><h3>雞爸爸生活研究室</h3><p>幸福來自平凡生活的點滴累積。</p><p>分享生活的故事，用科學理解生活，用陪伴記錄成長。</p></div><div><h4>閱讀</h4><p><a href="./articles.html">故事</a></p><p><a href="./series.html">系列</a></p><p><a href="./timeline.html">時間軸</a></p></div><div><h4>探索</h4><p><a href="./knowledge.html">知識圖譜</a></p><p><a href="./search.html">搜尋</a></p><p><a href="./tags.html">標籤</a></p></div><div><h4>平台</h4><p><a href="./dashboard.html">Dashboard</a></p><p><a href="./subscribe.html">訂閱</a></p><p><a href="https://vocus.cc/salon/jisoopama-baby-cat" target="_blank">Vocus</a></p></div></div><div class="container footer-bottom">© 2026 Chicken Dad Journal. Every family has stories. This is ours.</div></footer>
</body>
</html>""".format(
        hero_url=fix_url(hero.get("url")),
        hero_title=hero.get("title") or "雞爸爸生活研究室",
        hero_summary=hero.get("summary") or "幸福來自平凡生活的點滴累積。",
        editor_url=fix_url(editor.get("url")),
        editor_title=editor.get("title") or "編輯精選",
        editor_summary=editor.get("summary") or "",
        quote=quote,
        latest_html=latest_html,
        family_html="".join(render_story_tile(s) for s in family),
        research_html=render_research_notes(stories),
        series_html=render_series(stories)
    )
    return html


# v5.7.1 Sprint 2: shared header/footer wrapper
from pathlib import Path
try:
    from engine.components import inject_header_footer
except Exception:
    inject_header_footer = None

def render_homepage(stories, root=None):
    html = _render_homepage_core(stories)
    if inject_header_footer:
        project_root = Path(root) if root else Path(__file__).resolve().parents[1]
        html = inject_header_footer(html, project_root)
    return html
