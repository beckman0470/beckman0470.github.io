
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def escape(text):
    return (text or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def render_og_svg(title="雞爸爸生活研究室", subtitle="Chicken Dad Journal", category="Story"):
    title = escape(title[:22])
    subtitle = escape(subtitle)
    category = escape(category)
    return f\"\"\"<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFDF8"/>
      <stop offset="55%" stop-color="#F8F6F1"/>
      <stop offset="100%" stop-color="#C7D9D0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1020" cy="120" r="72" fill="#FFF1BA"/>
  <rect x="70" y="70" width="1060" height="490" rx="44" fill="#FFFDF8" stroke="#E6DED1" stroke-width="3"/>
  <text x="110" y="145" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#A67C52" letter-spacing="4">{category}</text>
  <text x="110" y="275" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#263328">{title}</text>
  <text x="110" y="365" font-family="Arial, sans-serif" font-size="34" fill="#687463">{subtitle}</text>
  <text x="110" y="475" font-family="Arial, sans-serif" font-size="30" fill="#263328">幸福來自平凡生活的點滴累積</text>
  <text x="980" y="480" font-family="Arial, sans-serif" font-size="82">CDJ</text>
</svg>\"\"\"

def write_default_og(root=ROOT):
    root = Path(root)
    out = root / "assets" / "og" / "og-image.svg"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render_og_svg(), encoding="utf-8")
    return out

if __name__ == "__main__":
    path = write_default_og()
    print("Default OG generated:", path)
