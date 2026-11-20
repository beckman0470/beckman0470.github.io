#!/usr/bin/env python3
"""One-pass, non-destructive all-site consistency patcher.
Reads the supplied up-to-date checkout; writes ONLY a new upload ZIP.
"""
from __future__ import annotations
import argparse
import re
import sys
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

VERSION = '20261120-consistency1'
GAME_PAGES = [
    'rooms.html', 'play/index.html', 'play/play/index.html',
    'play/bath-family/index.html', 'play/dish-family/index.html',
    'play/fast-food/index.html', 'play/salon/index.html',
    'play/yahoo-water/index.html', 'play/youyou-food/index.html',
    'play/yakiniku/index.html', 'ama-games.html', 'ama-solitaire.html',
    'ama-sudoku.html', 'mom-breakout.html', 'mom-words.html',
    'dad-arcade.html', 'dining-fruit.html', 'dining-stairs.html',
    'relax-family.html', 'relax-classics.html', 'relax.html',
    'ama-exercise.html', 'seven-kingdoms.html',
    'babymonster-classroom.html', 'babymonster-ep01.html',
]
MAIN_PAGES = ['articles.html', 'videos.html', 'rooms.html']
NAV = [
    ('/videos.html', '客廳'),
    ('/rooms.html?room=dining', '餐廳'),
    ('/articles.html', '雞窩'),
    ('/rooms.html?room=mom', '鼠窩'),
    ('/rooms.html?room=ama', '兔窩'),
    ('/rooms.html?room=kitchen', '廚房'),
    ('/rooms.html?room=bathroom', '浴室'),
    ('/rooms.html?room=games', '遊戲間'),
    ('/stickers.html', '貼圖小舖'),
    ('/family.html', '認識我們'),
]


def locate(p: Path) -> Path:
    p = p.resolve()
    if (p / 'rooms.html').is_file() and (p / 'index.html').is_file():
        return p
    candidates = [c for c in p.iterdir() if c.is_dir() and (c / 'rooms.html').is_file() and (c / 'index.html').is_file()] if p.is_dir() else []
    if len(candidates) == 1:
        return candidates[0]
    raise ValueError('請指定最新 GitHub 專案的解壓資料夾（內含 index.html、rooms.html）。')


def ensure_head(s: str) -> str:
    """Support older standalone HTML that omits explicit <head>...</head>."""
    if re.search(r'</head\s*>', s, re.I): return s
    root = re.search(r'<html\b[^>]*>', s, re.I)
    body = re.search(r'<body\b', s, re.I)
    if not root or not body or body.start() <= root.end():
        raise ValueError('沒有可安全補上的 HTML head/body 結構')
    # Add end first so original offsets remain valid.
    s = s[:body.start()] + '</head>\n' + s[body.start():]
    return s[:root.end()] + '\n<head>\n' + s[root.end():]


def add_link(s: str, path: str, version: str, kind: str) -> str:
    s = ensure_head(s)
    escaped = re.escape(path)
    if kind == 'css':
        s = re.sub(r'<link\b(?=[^>]*\bhref=["\'][^"\']*'+escaped+r'(?:\?[^"\']*)?["\'])[^>]*>\s*', '', s, flags=re.I)
        new = f'<link rel="stylesheet" href="{path}?v={version}">'
        end = re.search(r'</head\s*>', s, re.I)
        if not end: raise ValueError('缺少 </head>')
        return s[:end.start()] + new + '\n' + s[end.start():]
    s = re.sub(r'<script\b(?=[^>]*\bsrc=["\'][^"\']*'+escaped+r'(?:\?[^"\']*)?["\'])[^>]*>\s*</script>\s*', '', s, flags=re.I)
    new = f'<script defer src="{path}?v={version}"></script>'
    end = re.search(r'</body\s*>', s, re.I)
    if end:
        return s[:end.start()] + new + '\n' + s[end.start():]
    return s + '\n' + new + '\n'


def fix_home_nav(s: str) -> str:
    # Replace ONLY the topmost main navigation; leave shortcut tiles, games and footer untouched.
    tag = '<nav class="nav" aria-label="主要導覽">' + ''.join(f'<a href="{url}">{label}</a>' for url, label in NAV) + '</nav>'
    result, n = re.subn(r'<nav\b(?=[^>]*class=["\'][^"\']*\bnav\b[^"\']*["\'])[^>]*aria-label=["\']主要導覽["\'][^>]*>[\s\S]*?</nav>', lambda m:tag, s, count=1, flags=re.I)
    if n != 1: raise ValueError('首頁主選單位置不符預期，已停止，不會覆蓋。')
    return result


def fix_shared_nav(s: str) -> str:
    # The JS already has the chosen order in current GitHub; re-order only the literal array if not yet present.
    start = s.find('[["/videos.html","客廳"]')
    if start < 0: raise ValueError('共用導覽格式與目前 GitHub 不同，已停止。')
    end = s.find(']].forEach', start)
    if end < 0: raise ValueError('找不到共用導覽結尾，已停止。')
    order = '[' + ','.join(f'["{url}","{label}"]' for url,label in NAV) + ']'
    return s[:start] + order + s[end+2:]


def build(repo: Path, package: Path) -> tuple[dict[str, bytes], list[str]]:
    files: dict[str, bytes] = {}
    missing = []
    pages = set(GAME_PAGES) | set(MAIN_PAGES) | {'index.html'}
    for rel in sorted(pages):
        src = repo / rel
        if not src.is_file():
            missing.append(rel)
            continue
        original = src.read_text(encoding='utf-8-sig')
        s = original
        if rel == 'index.html':
            s = fix_home_nav(s)
        if rel in MAIN_PAGES:
            s = add_link(s, '/css/room-width-nav-fix.css', VERSION, 'css')
            s = add_link(s, '/css/content-identity.css', VERSION, 'css')
            s = add_link(s, '/js/content-identity.js', VERSION, 'js')
        if rel == 'videos.html':
            s = add_link(s, '/css/layout-slim.css', VERSION, 'css')
            s = add_link(s, '/js/layout-slim.js', VERSION, 'js')
        if rel in GAME_PAGES:
            s = add_link(s, '/css/unified-game-ui.css', VERSION, 'css')
            s = add_link(s, '/js/unified-game-ui.js', VERSION, 'js')
        if s != original:
            files[rel] = s.encode('utf-8')
    shared = repo / 'js/site-entry-nav.js'
    if not shared.is_file():
        raise ValueError('共用導覽 js/site-entry-nav.js 不存在。')
    s = shared.read_text(encoding='utf-8-sig')
    sn = fix_shared_nav(s)
    if sn != s:
        files['js/site-entry-nav.js'] = sn.encode('utf-8')
    for rel in ['css/room-width-nav-fix.css','css/unified-game-ui.css','js/unified-game-ui.js','css/layout-slim.css','js/layout-slim.js']:
        files[rel] = (package / rel).read_bytes()
    return files, missing


def main() -> int:
    arg = argparse.ArgumentParser(description='雞爸爸生活研究室全站一致性整合包產生器')
    arg.add_argument('repo', type=Path, help='最新 GitHub 專案解壓目錄')
    arg.add_argument('--output', type=Path, default=Path('ChickenDad_AllSite_ReadyToUpload.zip'))
    args = arg.parse_args()
    try:
        root = locate(args.repo)
        package = Path(__file__).resolve().parent.parent
        files, missing = build(root, package)
        if missing:
            raise ValueError('最新版專案缺少重要頁面：'+', '.join(missing))
        # Validate all expected refs once and never duplicate a loaded asset.
        for path, data in files.items():
            if not path.endswith('.html'): continue
            text = data.decode('utf-8')
            for asset in ['/css/room-width-nav-fix.css','/css/unified-game-ui.css','/js/unified-game-ui.js']:
                if asset in text and text.count(asset) != 1:
                    raise ValueError(f'引用重複：{path} → {asset}')
        out = args.output.resolve()
        if out.parent == root or root in out.parents:
            raise ValueError('輸出 ZIP 請放在網站專案目錄外，避免混入網站。')
        with ZipFile(out, 'w', compression=ZIP_DEFLATED) as z:
            for rel, content in sorted(files.items()): z.writestr(rel, content)
            z.writestr('PATCH_FILES.txt','\n'.join(sorted(files))+'\n')
        with ZipFile(out) as z:
            assert z.testzip() is None
        print(f'成功產生：{out}\n共 {len(files)} 個更新檔；原始專案沒有改動。')
        return 0
    except Exception as exc:
        print('錯誤：'+str(exc),file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
