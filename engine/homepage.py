
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
        " ".join(story.get("tags", []))
    ])
    if "健康" in text or "皮質醇" in text:
        return "health"
    if "棒球" in text or "味全" in text:
        return "baseball"
    if "AI" in text:
        return "ai"
    if "DoDo" in text or "游泳" in text or "視力" in text:
        return "dodo"
    return ""

def render_story_card(story):
    return f"""
    <a class="story-card" href="{fix_url(story.get('url'))}">
      <div class="story-cover {card_class(story)}"></div>
      <div class="card-body">
        <span class="chip">{story.get('category') or '故事'}</span>
        <h3>{story.get('title')}</h3>
        <p class="muted">{story.get('summary') or ''}</p>
        <span class="readmore">閱讀 →</span>
      </div>
    </a>
    """

def render_update_card(story):
    date = story.get("date", "")
    display_date = date[5:].replace("-", "/") if len(date) >= 10 else date
    return f"""
    <a class="update-card" href="{fix_url(story.get('url'))}">
      <div class="datebox">{display_date}</div>
      <div>
        <strong>{story.get('title')}</strong>
        <p class="muted">{story.get('series') or ''}｜{story.get('category') or ''}</p>
      </div>
      <span class="readmore">閱讀 →</span>
    </a>
    """

def render_research(stories):
    counts = {}
    for story in stories:
        for topic in story.get("research", []):
            counts[topic] = counts.get(topic, 0) + 1
    topics = sorted(counts.items(), key=lambda x: (-x[1], x[0]))[:4]
    if not topics:
        topics = [("親子陪伴", 1), ("健康生活", 1), ("味全龍", 1), ("AI網站", 1)]
    return "".join([
        f"""<div class="research-card"><div class="kicker">Research</div><h3>{name}</h3><p class="muted">{count} 篇相關故事</p></div>"""
        for name, count in topics
    ])

def render_homepage(stories):
    stories = sorted(stories, key=lambda s: s.get("date", ""), reverse=True)
    featured = next((s for s in stories if s.get("hero")), None) or next((s for s in stories if s.get("featured")), None) or (stories[0] if stories else None)
    latest = stories[:3]

    featured_html = ""
    if featured:
        featured_html = f"""
        <div class="featured">
          <div class="cover-card">
            <h3>{featured.get('category') or '故事'}</h3>
            <p>{featured.get('series') or 'Chicken Dad Journal'}</p>
          </div>
          <div class="featured-copy">
            <span class="chip">{featured.get('series') or featured.get('category') or '故事'}</span>
            <h2>{featured.get('title')}</h2>
            <p class="muted">{featured.get('summary') or ''}</p>
            <p class="muted">{featured.get('date') or ''}</p>
            <a class="btn" href="{fix_url(featured.get('url'))}">閱讀本月故事</a>
          </div>
        </div>
        """

    latest_html = "".join(render_update_card(story) for story in latest)
    cards_html = "".join(render_story_card(story) for story in latest)
    research_html = render_research(stories)

    return f"""<!DOCTYPE html>
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
:root{{--paper:#F8F6F1;--surface:#FFFDF8;--ink:#263328;--muted:#687463;--brown:#A67C52;--sage:#8FAF8B;--blue:#8DBFD8;--line:#E6DED1;--shadow:0 24px 60px rgba(70,55,35,.12);--radius:30px;--serif:Georgia,"Times New Roman",serif;--sans:-apple-system,BlinkMacSystemFont,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.75}}a{{text-decoration:none;color:inherit}}.container{{width:min(1160px,calc(100% - 40px));margin:auto}}.muted{{color:var(--muted)}}.kicker{{font-size:13px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--brown)}}
.site-header{{position:sticky;top:0;z-index:20;background:rgba(255,253,248,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}}.nav{{height:82px;display:flex;align-items:center;justify-content:space-between;gap:24px}}.logo{{display:flex;align-items:center;gap:14px}}.logo-mark{{width:48px;height:48px;border-radius:50%;background:var(--surface);border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:26px}}.logo-text strong{{display:block;font-size:21px;font-weight:950;line-height:1.2}}.logo-text span{{display:block;color:var(--muted);font-size:13px}}.nav-links{{display:flex;gap:22px;font-weight:850}}.nav-links a:hover,.nav-links a.active{{color:var(--brown)}}
.hero{{background:linear-gradient(180deg,#FFFDF8 0%,#F8F6F1 100%);overflow:hidden}}.hero-grid{{min-height:620px;display:grid;grid-template-columns:.95fr 1.05fr;gap:50px;align-items:center;padding:72px 0}}.hero h1{{font-family:var(--serif);font-size:clamp(48px,6vw,86px);line-height:1.06;letter-spacing:-.04em;margin:18px 0}}.belief{{font-size:25px;font-weight:950;color:var(--brown);margin:0 0 18px}}.mission{{font-size:21px;max-width:500px;margin:0;color:#344238}}.intro-note{{margin-top:24px;color:var(--muted);max-width:500px}}.btn{{display:inline-flex;align-items:center;justify-content:center;padding:13px 24px;border-radius:999px;background:var(--ink);color:white;font-weight:950}}.btn.secondary{{background:var(--surface);color:var(--ink);border:1px solid var(--line)}}.hero-art{{min-height:460px;border-radius:46px;background:radial-gradient(circle at 78% 15%,#FFF1BA 0 92px,transparent 94px),linear-gradient(135deg,#FFF7EC,#E8C994 55%,#9EBB9A);box-shadow:var(--shadow);border:1px solid rgba(255,255,255,.8);position:relative;overflow:hidden}}.hero-art:before{{content:"Every family has stories. This is ours.";position:absolute;left:42px;top:42px;font-family:var(--serif);font-size:34px;font-weight:700;color:var(--ink);max-width:420px;line-height:1.25}}
.section{{padding:76px 0}}.section-head{{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:28px}}.section-title{{font-size:36px;line-height:1.2;margin:0;font-weight:950;letter-spacing:-.03em}}.section-note{{margin:0;color:var(--muted)}}.chip{{display:inline-flex;align-self:flex-start;padding:5px 11px;border-radius:999px;background:#EEE6D9;color:var(--brown);font-size:13px;font-weight:950}}.readmore{{font-weight:950;color:var(--brown)}}.featured{{display:grid;grid-template-columns:1.08fr .92fr;gap:28px}}.cover-card{{min-height:360px;border-radius:var(--radius);background:linear-gradient(135deg,#C7D9D0,#FFF7EC);box-shadow:var(--shadow);border:1px solid var(--line);padding:42px}}.cover-card h3{{font-family:var(--serif);font-size:58px;line-height:1.08;margin:0}}.cover-card p{{font-size:22px;color:var(--muted)}}.featured-copy{{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:42px;box-shadow:var(--shadow);display:flex;flex-direction:column;justify-content:center}}.featured-copy h2{{font-size:39px;line-height:1.2;margin:10px 0 14px}}.updates{{display:grid;gap:14px}}.update-card{{display:grid;grid-template-columns:88px 1fr auto;gap:20px;align-items:center;padding:18px 20px;background:var(--surface);border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow)}}.datebox{{font-family:var(--serif);font-size:23px;color:var(--brown);font-weight:700}}.card-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}}.story-card,.research-card{{background:var(--surface);border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow);overflow:hidden}}.story-cover{{height:180px;background:linear-gradient(135deg,#D8C2A8,#FFF7EC)}}.story-cover.dodo{{background:linear-gradient(135deg,var(--blue),#FFF7EC)}}.story-cover.health{{background:linear-gradient(135deg,var(--sage),#FFF7EC)}}.story-cover.baseball{{background:linear-gradient(135deg,#802424,#F0D0A0)}}.story-cover.ai{{background:linear-gradient(135deg,#263328,#8DBFD8)}}.card-body{{padding:20px}}.card-body h3{{font-size:21px;line-height:1.35;margin:8px 0}}.research-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}}.research-card{{padding:22px}}
.contact-card{background:var(--surface);border:1px solid var(--line);border-radius:30px;box-shadow:var(--shadow);padding:34px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}.contact-card h2{font-size:34px;line-height:1.2;margin:8px 0 10px}.contact-actions{display:flex;gap:12px;flex-wrap:wrap}
@media(max-width:620px){.contact-card{grid-template-columns:1fr;padding:24px}}
.site-footer{{margin-top:50px;background:#243128;color:#FFFDF8}}.footer-grid{{display:grid;grid-template-columns:1.4fr .8fr .8fr .8fr;gap:32px;padding:54px 0}}.site-footer h3,.site-footer h4{{margin-top:0}}.site-footer p,.site-footer a{{color:rgba(255,253,248,.75)}}.footer-bottom{{border-top:1px solid rgba(255,255,255,.14);padding:18px 0;color:rgba(255,253,248,.6);font-size:14px}}
@media(max-width:980px){{.nav-links{{display:none}}.hero-grid,.featured{{grid-template-columns:1fr}}.card-grid,.research-grid{{grid-template-columns:1fr 1fr}}.footer-grid{{grid-template-columns:1fr 1fr}}}}@media(max-width:620px){{.container{{width:min(100% - 28px,1160px)}}.hero h1{{font-size:46px}}.card-grid,.research-grid,.footer-grid{{grid-template-columns:1fr}}.update-card{{grid-template-columns:1fr}}}}
</style>
</head>
<body>
<header class="site-header"><div class="container nav"><a class="logo" href="./index.html"><div class="logo-mark">🐔</div><span class="logo-text"><strong>雞爸爸生活研究室</strong><span>Chicken Dad Journal</span></span></a><nav class="nav-links"><a class="active" href="./index.html">首頁</a><a href="./articles.html">故事</a><a href="./series.html">系列</a><a href="./timeline.html">時間軸</a><a href="./search.html">搜尋</a><a href="./tags.html">標籤</a><a href="./subscribe.html">訂閱</a><a href="./family.html">我們一家</a><a href="./about.html">關於</a><a href="./index.html#contact">聯絡</a></nav></div></header>
<main>
<section class="hero"><div class="container hero-grid"><div><div class="kicker">Content Engine · v4.3</div><h1>雞爸爸生活研究室</h1><p class="belief">幸福來自平凡生活的點滴累積。</p><p class="mission">分享生活的故事，用科學理解生活，用陪伴記錄成長。</p><p class="intro-note">這裡不是教人如何生活，而是記錄一個家庭，如何在平凡的日子裡，慢慢過成自己喜歡的樣子。</p><div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:30px"><a class="btn" href="./articles.html">開始閱讀故事</a><a class="btn secondary" href="./timeline.html">看時間軸</a></div></div><div class="hero-art"></div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Cover Story</div><h2 class="section-title">本月故事</h2><p class="section-note">由 Markdown metadata 自動挑選。</p></div></div>{featured_html}</div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Latest</div><h2 class="section-title">最近發生的故事</h2><p class="section-note">依日期自動排序。</p></div></div><div class="updates">{latest_html}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Research</div><h2 class="section-title">雞爸爸最近在研究</h2><p class="section-note">由每篇文章的 research 欄位整理。</p></div></div><div class="research-grid">{research_html}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Stories</div><h2 class="section-title">繼續閱讀</h2><p class="section-note">自動帶入最新三篇。</p></div><a class="readmore" href="./articles.html">全部故事 →</a></div><div class="card-grid">{cards_html}</div></div></section>

<section class="section" id="contact"><div class="container">
  <div class="contact-card">
    <div>
      <div class="kicker">Contact</div>
      <h2>聯絡雞爸爸生活研究室</h2>
      <p class="muted">目前主要透過 Vocus 與 GitHub 維護內容。若要看完整文章與最新更新，可以先從 Vocus 或網站故事典藏開始。</p>
    </div>
    <div class="contact-actions">
      <a class="btn" href="https://vocus.cc/salon/jisoopama-baby-cat" target="_blank">前往 Vocus</a>
      <a class="btn secondary" href="https://github.com/beckman0470/beckman0470.github.io" target="_blank">GitHub</a>
    </div>
  </div>
</div></section>

</main>
<footer class="site-footer"><div class="container footer-grid"><div><h3>雞爸爸生活研究室</h3><p>幸福來自平凡生活的點滴累積。</p><p>分享生活的故事，用科學理解生活，用陪伴記錄成長。</p></div><div><h4>閱讀</h4><p><a href="./index.html">首頁</a></p><p><a href="./articles.html">故事</a></p><p><a href="./series.html">系列</a></p><p><a href="./timeline.html">時間軸</a></p></div><div><h4>探索</h4><p><a href="./search.html">搜尋</a></p><p><a href="./tags.html">標籤</a></p><p><a href="./subscribe.html">訂閱</a></p></div><div><h4>品牌</h4><p><a href="./family.html">我們一家</a></p><p><a href="./about.html">關於</a></p><p><a href="https://vocus.cc/salon/jisoopama-baby-cat" target="_blank">Vocus</a></p></div></div><div class="container footer-bottom">© 2026 Chicken Dad Journal. Every family has stories. This is ours.</div></footer>
</body></html>"""
