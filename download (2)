
BASE_CSS = """
:root{--paper:#F8F6F1;--surface:#FFFDF8;--ink:#263328;--muted:#687463;--brown:#A67C52;--line:#E6DED1;--shadow:0 24px 60px rgba(70,55,35,.12);--serif:Georgia,"Times New Roman",serif;--sans:-apple-system,BlinkMacSystemFont,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.9}a{text-decoration:none;color:inherit}.container{width:min(1080px,calc(100% - 40px));margin:auto}.article-container{width:min(780px,calc(100% - 40px));margin:auto}.muted{color:var(--muted)}.kicker{font-size:13px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--brown)}
.site-header{position:sticky;top:0;z-index:20;background:rgba(255,253,248,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}.nav{height:82px;display:flex;align-items:center;justify-content:space-between;gap:24px}.logo{display:flex;align-items:center;gap:14px}.logo-mark{width:48px;height:48px;border-radius:50%;background:var(--surface);border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:26px}.logo-text strong{display:block;font-size:21px;font-weight:950;line-height:1.2}.logo-text span{display:block;color:var(--muted);font-size:13px}.nav-links{display:flex;gap:26px;font-weight:850}.nav-links a:hover{color:var(--brown)}
.breadcrumb{padding:28px 0 0;color:var(--muted);font-size:14px}.breadcrumb a{color:var(--brown);font-weight:800}.article-hero{padding:54px 0 38px}.article-hero h1{font-family:var(--serif);font-size:clamp(42px,6vw,76px);line-height:1.08;letter-spacing:-.04em;margin:16px 0 20px}.article-lead{font-size:22px;color:#344238;max-width:820px}.meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.pill{display:inline-flex;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font-size:14px;color:var(--muted);font-weight:800}.hero-cover{min-height:380px;border-radius:32px;background:linear-gradient(135deg,#C7D9D0,#FFF7EC);box-shadow:var(--shadow);border:1px solid var(--line);margin-top:34px;padding:42px}.hero-cover h2{font-family:var(--serif);font-size:58px;line-height:1.05;margin:0}.quote{margin:46px auto;background:var(--surface);border-left:6px solid var(--brown);border-radius:24px;padding:28px 32px;box-shadow:var(--shadow);font-size:25px;font-family:var(--serif);line-height:1.55}.article-body{font-size:19px}.article-body p{margin:0 0 1.4em}.article-body h2{font-size:32px;line-height:1.25;margin:2.2em 0 .7em}.article-body h3{font-size:25px;margin:1.8em 0 .5em}.article-body blockquote{background:#FFFDF8;border-left:5px solid var(--brown);padding:18px 22px;border-radius:18px;color:#344238}.btn-row{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}.btn{display:inline-flex;align-items:center;justify-content:center;padding:13px 24px;border-radius:999px;background:var(--ink);color:white;font-weight:950;box-shadow:0 12px 30px rgba(38,51,40,.16)}.btn.secondary{background:var(--surface);color:var(--ink);border:1px solid var(--line);box-shadow:none}.site-footer{margin-top:50px;background:#243128;color:#FFFDF8}.footer-grid{display:grid;grid-template-columns:1.4fr .8fr .8fr .8fr;gap:32px;padding:54px 0}.site-footer h3,.site-footer h4{margin-top:0}.site-footer p,.site-footer a{color:rgba(255,253,248,.75)}.footer-bottom{border-top:1px solid rgba(255,255,255,.14);padding:18px 0;color:rgba(255,253,248,.6);font-size:14px}
@media(max-width:900px){.nav-links{display:none}.footer-grid{grid-template-columns:1fr 1fr}.hero-cover h2{font-size:46px}}@media(max-width:620px){.container,.article-container{width:min(100% - 28px,1080px)}.logo-mark{width:42px;height:42px}.logo-text strong{font-size:18px}.article-hero h1{font-size:42px}.article-lead{font-size:19px}.article-body{font-size:18px}.quote{font-size:22px;padding:24px}.footer-grid{grid-template-columns:1fr}}
"""

def render_article_page(meta: dict, html_body: str):
    title = meta.get("title", "Untitled")
    summary = meta.get("summary", "")
    series = meta.get("seriesTitle", "")
    category = meta.get("categoryTitle", "")
    quote = meta.get("quote", "生活值得被記錄，分享讓故事有了延續。")
    date = meta.get("date", "")
    reading = meta.get("readingTime", "")

    return f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}｜雞爸爸生活研究室</title>
<meta name="description" content="{summary}">
<meta property="og:site_name" content="Chicken Dad Journal">
<meta property="og:type" content="article">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{summary}">
<meta property="og:image" content="https://beckman0470.github.io/assets/og/og-image.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#263328">
<style>{BASE_CSS}</style>
</head>
<body>
<header class="site-header">
  <div class="container nav">
    <a class="logo" href="../index.html"><div class="logo-mark">🐔</div><span class="logo-text"><strong>雞爸爸生活研究室</strong><span>Chicken Dad Journal</span></span></a>
    <nav class="nav-links"><a href="../index.html">首頁</a><a href="../articles.html">故事</a><a href="../series.html">系列</a><a href="../family.html">我們一家</a><a href="../about.html">關於</a></nav>
  </div>
</header>

<div class="article-container breadcrumb"><a href="../index.html">首頁</a> ／ <a href="../articles.html">故事</a> ／ {series}</div>

<main>
<section class="article-hero">
  <div class="article-container">
    <div class="kicker">{series}</div>
    <h1>{title}</h1>
    <p class="article-lead">{summary}</p>
    <div class="meta"><span class="pill">{date}</span><span class="pill">{reading} 分鐘閱讀</span><span class="pill">{category}</span></div>
  </div>
  <div class="container">
    <div class="hero-cover"><h2>{category}</h2><p class="muted">{series}</p></div>
  </div>
</section>

<div class="article-container">
  <div class="quote">{quote}</div>
  <article class="article-body">{html_body}</article>
  <div class="btn-row"><a class="btn" href="../articles.html">回故事典藏</a><a class="btn secondary" href="../index.html">回首頁</a></div>
</div>
</main>

<footer class="site-footer">
  <div class="container footer-grid">
    <div><h3>雞爸爸生活研究室</h3><p>幸福來自平凡生活的點滴累積。</p><p>分享生活的故事，用科學理解生活，用陪伴記錄成長。</p></div>
    <div><h4>閱讀</h4><p><a href="../index.html">首頁</a></p><p><a href="../articles.html">故事</a></p><p><a href="../series.html">系列</a></p></div>
    <div><h4>品牌</h4><p><a href="../family.html">我們一家</a></p><p><a href="../about.html">關於</a></p></div>
    <div><h4>外部</h4><p><a href="https://vocus.cc/salon/jisoopama-baby-cat" target="_blank">Vocus</a></p><p><a href="https://github.com/beckman0470" target="_blank">GitHub</a></p></div>
  </div>
  <div class="container footer-bottom">© 2026 Chicken Dad Journal. Every family has stories. This is ours.</div>
</footer>
</body>
</html>"""
