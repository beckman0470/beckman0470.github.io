#!/usr/bin/env python3
"""Apply a narrowly scoped, idempotent, non-destructive shared game UI integration.

This script runs once in GitHub Actions after the four new files are uploaded.
It reads the latest game pages already in the repository; never replaces them
with older versions or rewrites any game logic.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
MARKER = 'cdjg-standalone-v20261121b'
FILES = {
    'play/fast-food/index.html': 'dining',
    'play/yahoo-water/index.html': 'dining',
    'play/youyou-food/index.html': 'dining',
    'play/dish-family/index.html': 'kitchen',
    'play/bath-family/index.html': 'bathroom',
}
RESOURCE = (
    '<!-- '+MARKER+' -->'
    '<link rel="stylesheet" href="/css/cdj-game-shell-five.css?v=20261121-stage3b">'
    '<script defer src="/js/cdj-game-shell-five.js?v=20261121-stage3b"></script>'
)

def integrate(name: str) -> str:
    f = ROOT / name
    if not f.is_file():
        raise FileNotFoundError(f'Missing required game: {name}')
    raw = f.read_text(encoding='utf-8')
    if MARKER in raw:
        print(f'ALREADY_PATCHED {name}')
        return 'unchanged'
    if '</head>' not in raw.lower():
        raise ValueError(f'Cannot locate </head> in {name}')
    # Keep exact original bytes apart from one appended CSS/script reference.
    at = raw.lower().index('</head>')
    new = raw[:at] + RESOURCE + raw[at:]
    f.write_text(new, encoding='utf-8')
    print(f'PATCHED {name}')
    return 'patched'

def main():
    # Preflight all files before writing anything.
    for p in FILES:
        raw = (ROOT / p).read_text(encoding='utf-8')
        if MARKER not in raw and '</head>' not in raw.lower():
            raise ValueError(f'Missing head closing tag: {p}')
    return sum(integrate(p) == 'patched' for p in FILES)

if __name__ == '__main__':
    try:
        print(f'Updated {main()} game pages')
    except Exception as err:
        sys.exit(f'Patch aborted: {err}')
