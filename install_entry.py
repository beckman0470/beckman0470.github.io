#!/usr/bin/env python3
from pathlib import Path
import re
p=Path('videos.html')
s=p.read_text(encoding='utf-8-sig')
s=re.sub(r'<script[^>]*src=["\']/js/worship-entry\.js[^>]*></script>\s*','',s,flags=re.I)
assert '</body>' in s
s=s.replace('</body>','<script defer src="/js/worship-entry.js?v=20261117-v8"></script>\n</body>',1)
p.write_text(s,encoding='utf8')
print('已修正客廳入口。')
