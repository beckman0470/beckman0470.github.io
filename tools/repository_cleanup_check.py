from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

BAD_PATTERNS = [
    re.compile(r".*\(\d+\)(\.[^.]+)?$"),
    re.compile(r"^download(\s*\(\d+\))?$", re.IGNORECASE),
    re.compile(r"^copy of .*$", re.IGNORECASE),
    re.compile(r".* - copy(\.[^.]+)?$", re.IGNORECASE),
]

def main():
    bad = []
    for p in ROOT.rglob("*"):
        if ".git" in p.parts:
            continue
        if p.name in [".DS_Store", "Thumbs.db", "desktop.ini"]:
            bad.append(str(p.relative_to(ROOT)))
            continue
        if any(rx.match(p.name) for rx in BAD_PATTERNS):
            bad.append(str(p.relative_to(ROOT)))

    if bad:
        print("Repository cleanup check failed:")
        for item in bad:
            print(" -", item)
        raise SystemExit(1)

    print("Repository cleanup check passed.")

if __name__ == "__main__":
    main()
