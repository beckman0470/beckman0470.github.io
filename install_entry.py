#!/usr/bin/env python3
"""產生已加入祭拜入口的 videos.html。先使用本機檔案；不存在時讀取 GitHub 公開版。"""
from pathlib import Path
from urllib.request import urlopen
p=Path('videos.html')
if p.exists():
    s=p.read_text(encoding='utf-8')
    print('使用本資料夾內既有的 videos.html')
else:
    url='https://raw.githubusercontent.com/beckman0470/beckman0470.github.io/main/videos.html'
    print('取得 GitHub 上目前的 videos.html ...')
    with urlopen(url,timeout=20) as response:
        s=response.read().decode('utf-8')
if '/js/worship-entry.js' not in s:
    if '</body>' not in s: raise SystemExit('無法找到 </body>，已取消修改。')
    s=s.replace('</body>', '<script defer src="/js/worship-entry.js?v=20261117-v5"></script></body>',1)
    print('已加入點香祭拜及神桌入口')
else: print('原有祭拜入口已存在，未重複加入')
if p.exists():
    from shutil import copy2
    copy2(p, p.with_name('videos.backup.html'))
    print('原本 videos.html 已備份至 videos.backup.html')
p.write_text(s,encoding='utf-8')
print('完成：請將 videos.html、js/worship-entry.js 及 worship/ 上傳 GitHub 專案相同位置。')
