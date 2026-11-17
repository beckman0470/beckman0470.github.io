#!/usr/bin/env python3
"""Run from the repository root AFTER copying the worship/ and js/ files into it."""
from pathlib import Path
p=Path('videos.html')
if not p.exists():raise SystemExit('找不到 videos.html：請先切換到網站原始碼的根目錄再執行。')
s=p.read_text(encoding='utf8')
needle='<script defer src="/js/worship-entry.js?v=20261117-v4"></script>'
if 'worship-entry.js' not in s:
    if '</body>' not in s:raise SystemExit('videos.html 沒有 </body>，為避免破壞網站已取消。')
    s=s.replace('</body>',needle+'</body>',1)
    p.write_text(s,encoding='utf8')
    print('完成：已在 videos.html 加入線上祭拜入口。')
else:print('已安裝，無需重複修改。')
