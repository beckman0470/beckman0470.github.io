from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

def main():
    errors = []
    for html in ROOT.rglob("*.html"):
        if ".git" in html.parts:
            continue
        text = html.read_text(encoding="utf-8", errors="ignore")
        rel = html.relative_to(ROOT)
        checks = {
            "title": r"<title>.+?</title>",
            "description": r'<meta name="description"',
            "canonical": r'<link rel="canonical"',
            "og title": r'<meta property="og:title"',
            "twitter card": r'<meta name="twitter:card"',
            "json ld": r'application/ld\+json',
        }
        for label, pattern in checks.items():
            if not re.search(pattern, text, re.I | re.S):
                errors.append(f"{rel}: missing {label}")

    if not (ROOT / "sitemap.xml").exists():
        errors.append("missing sitemap.xml")
    if not (ROOT / "robots.txt").exists():
        errors.append("missing robots.txt")
    if not (ROOT / "404.html").exists():
        errors.append("missing 404.html")

    if errors:
        print("Production hardening check failed:")
        for e in errors[:80]:
            print(" -", e)
        if len(errors) > 80:
            print(f"...and {len(errors)-80} more")
        raise SystemExit(1)

    print("Production hardening check passed.")

if __name__ == "__main__":
    main()
