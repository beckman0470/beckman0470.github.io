#!/usr/bin/env python3
"""Safely enable the site layout patch in an existing, freshly updated repository."""
from pathlib import Path
import sys
root=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path.cwd()
css=root/'css/room-width-nav-fix.css'
source=Path(__file__).resolve().parents[1]/'css/room-width-nav-fix.css'
if not (root/'articles.html').is_file() or not (root/'videos.html').is_file():
    sys.exit('找不到網站根目錄，請指定包含 articles.html 和 videos.html 的資料夾。')
css.parent.mkdir(parents=True,exist_ok=True)
css.write_bytes(source.read_bytes())
tag='<link rel="stylesheet" href="/css/room-width-nav-fix.css?v=20261120-wide-nav2">'
for name in ['articles.html','videos.html','rooms.html']:
    p=root/name
    if not p.is_file():continue
    text=p.read_text(encoding='utf-8')
    # Remove old invocations of this particular patch before reinserting.
    import re
    text=re.sub(r'<link\b[^>]*href=["\'][^"\']*/css/room-width-nav-fix\.css[^"\']*["\'][^>]*>','',text,flags=re.I)
    closing=re.search(r'</head\s*>',text,re.I)
    if closing is None:raise RuntimeError(f'{name} 缺少 </head>')
    text=text[:closing.start()]+tag+'\n'+text[closing.start():]
    p.write_text(text,encoding='utf-8')
    print('已更新',name)
print('完成：',css)
