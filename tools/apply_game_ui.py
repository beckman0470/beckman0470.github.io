#!/usr/bin/env python3
"""Safe patcher: reads the *current* repository checkout and produces only changed pages.
Does not overwrite the checkout, preserving changes made after this package was built.
"""
from __future__ import annotations
import argparse
import html
from pathlib import Path
import re
import sys
import zipfile

VERSION = '20261120-gameui1'
PAGE_PATHS = [
    'rooms.html', 'play/index.html', 'play/play/index.html',
    'play/bath-family/index.html', 'play/dish-family/index.html',
    'play/fast-food/index.html', 'play/salon/index.html',
    'play/yahoo-water/index.html', 'play/yakiniku/index.html',
    'ama-games.html', 'ama-solitaire.html', 'ama-sudoku.html',
    'mom-breakout.html', 'mom-words.html', 'dad-arcade.html',
    'dining-fruit.html', 'dining-stairs.html',
    'relax-family.html', 'relax-classics.html', 'relax.html',
    'ama-exercise.html', 'seven-kingdoms.html',
    'babymonster-classroom.html', 'babymonster-ep01.html'
]
CSS = f'<link rel="stylesheet" href="/css/unified-game-ui.css?v={VERSION}">'
JS = f'<script defer src="/js/unified-game-ui.js?v={VERSION}"></script>'

def locate(path: Path) -> Path:
    if (path / 'rooms.html').is_file():
        return path
    roots = [p for p in path.iterdir() if p.is_dir() and (p / 'rooms.html').is_file()]
    if len(roots) == 1:
        return roots[0]
    raise ValueError('找不到專案根目錄（應包含 rooms.html）。請指定解壓後的 GitHub 專案資料夾。')

def patch(content: str) -> str:
    # Replace an existing same-name version cleanly, without duplicate includes.
    content = re.sub(r'<link\s+[^>]*href=["\'][^"\']*/css/unified-game-ui\.css(?:\?[^"\']*)?["\'][^>]*>\s*', '', content, flags=re.I)
    content = re.sub(r'<script\s+[^>]*src=["\'][^"\']*/js/unified-game-ui\.js(?:\?[^"\']*)?["\'][^>]*>\s*</script>\s*', '', content, flags=re.I)
    if not re.search(r'</head\s*>', content, flags=re.I):
        raise ValueError('HTML 缺少 </head>，已跳過。')
    content = re.sub(r'</head\s*>', CSS + '\n</head>', content, count=1, flags=re.I)
    if re.search(r'</body\s*>', content, flags=re.I):
        content = re.sub(r'</body\s*>', JS + '\n</body>', content, count=1, flags=re.I)
    else:
        content += '\n' + JS + '\n'
    return content

def main():
    parser = argparse.ArgumentParser(description='雞爸爸全站遊戲視覺統一、安全更新包產生器')
    parser.add_argument('repo', type=Path, help='最新 GitHub 專案資料夾，例如 beckman0470.github.io-main')
    parser.add_argument('--output', type=Path, default=Path('ChickenDad_GameUI_ReadyToUpload.zip'))
    args = parser.parse_args()
    repo = locate(args.repo.resolve())
    package = Path(__file__).resolve().parent.parent
    modifications = {}
    missing = []
    for relative in PAGE_PATHS:
        target = repo / relative
        if not target.is_file():
            missing.append(relative)
            continue
        try:
            src = target.read_text(encoding='utf-8-sig')
            updated = patch(src)
        except Exception as err:
            print(f'ERROR {relative}: {err}', file=sys.stderr)
            return 2
        if updated.count('/css/unified-game-ui.css?') != 1 or updated.count('/js/unified-game-ui.js?') != 1:
            print(f'ERROR: 重複引用 {relative}', file=sys.stderr)
            return 3
        modifications[relative] = updated.encode('utf-8')
    for rel in ['css/unified-game-ui.css', 'js/unified-game-ui.js']:
        modifications[rel] = (package / rel).read_bytes()
    # Never overwrite source checkout, only create a ready-to-upload ZIP.
    out = args.output.resolve()
    with zipfile.ZipFile(out, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        for key, value in sorted(modifications.items()):
            z.writestr(key, value)
        z.writestr('UPLOADED_FILES.txt', '\n'.join(sorted(modifications)) + '\n')
    print(f'完成：{out} ；更新 HTML {len(modifications)-2} 個，新 CSS/JS 2 個。')
    if missing:
        print('提醒：下列檔案在該版 GitHub 專案中不存在，已略過：')
        for p in missing:
            print('  - ' + p)
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
