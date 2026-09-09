"""Import only public author-page metadata; never fetch article bodies or log in."""
import argparse
from datetime import datetime, timezone, timedelta
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil
import tempfile
from urllib.request import Request, urlopen

from catalogue import ROOT, JOURNALS, load_catalogue, validate_meta, upsert, sync

AUTHOR_URL = 'https://vocus.cc/user/@beckman'
AUTHOR_ID = '6a0ab8a0f49feccf811dd604'
OUTPUTS = ('data/articles.json', 'index.html', 'about.html', 'articles.html', 'sitemap.xml')

class NextData(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.parts = []

    def handle_starttag(self, tag, attrs):
        self.active = tag == 'script' and dict(attrs).get('id') == '__NEXT_DATA__'

    def handle_endtag(self, tag):
        if tag == 'script':
            self.active = False

    def handle_data(self, data):
        if self.active:
            self.parts.append(data)

def parse_public(text):
    parser = NextData()
    parser.feed(text)
    data = json.loads(''.join(parser.parts))['props']['pageProps']
    if data['userData']['_id'] != AUTHOR_ID or data['userData']['username'] != 'beckman':
        raise ValueError('公開頁作者不符')
    rows = data['contentData']['contents']
    if not isinstance(rows, list) or not rows:
        raise ValueError('公開頁資料格式改變或沒有內容；保留原清單')
    return rows, data['contentData']['count']

def known_sources(root, catalogue):
    urls = set()
    for entry in catalogue:
        if entry.get('sourceUrl'):
            urls.add(entry['sourceUrl'])
        page = root / entry.get('url', '').lstrip('/')
        if page.is_file():
            match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', page.read_text(encoding='utf-8'))
            if match:
                urls.add(match[1])
    return urls

def plan_import(rows, total, root=ROOT):
    catalogue = load_catalogue(root)
    known = known_sources(root, catalogue)
    overrides = json.loads((root / 'tools/article-only/vocus-categories.json').read_text(encoding='utf-8'))
    planned, problems = [], []
    seen = set()
    for row in rows:
        article_id = row.get('contentId', '')
        if not re.fullmatch('[0-9a-f]{24}', article_id):
            raise ValueError('無效 Vocus 內容 ID')
        kind = row.get('type')
        url = f'https://vocus.cc/{"article" if kind == "article" else "post"}/{article_id}'
        if url in known or article_id in seen:
            continue
        seen.add(article_id)
        if kind != 'article':
            problems.append(f'{url}：新短貼文需人工確認 metadata')
            continue
        article = row['article']
        if row.get('creatorId') != AUTHOR_ID or article.get('userId') != AUTHOR_ID:
            raise ValueError('內容作者不符')
        if article.get('status') != 2 or article.get('isPay') or row.get('isPay'):
            problems.append(f'{url}：不匯入非公開或付費內容')
            continue
        tags = row.get('tags', [])
        explicit = set(tags) & set(JOURNALS)
        # Platform topics/rooms are not equivalent to the brand's five entrances.
        category = overrides.get(article_id) or (next(iter(explicit)) if len(explicit) == 1 else None)
        if category not in JOURNALS:
            problems.append(f'{url} {row["title"]}：請在分類對照檔指定五大入口，或於 Vocus 加上唯一入口標籤')
            continue
        timestamp = datetime.fromisoformat(row['publishAt'].replace('Z', '+00:00'))
        if timestamp.tzinfo is None or timestamp > datetime.now(timezone.utc):
            raise ValueError('日期缺時區或尚未發布')
        published = timestamp.astimezone(timezone(timedelta(hours=8))).date().isoformat()
        meta = dict(slug=f'vocus-{published.replace("-", "")}-{article_id[-8:]}',
                    title=row['title'], published=published, summary=article['abstract'],
                    cover=article.get('thumbnailUrl') or '/assets/story-covers/default.svg',
                    category=category, source='Vocus', sourceUrl=url,
                    canonicalUrl=article.get('canonicalURL') or url, status='published',
                    tags=tags, readingTime=article.get('readingTime', 0))
        validate_meta(meta)
        planned.append(meta)
    if len(catalogue) + len(planned) != total:
        problems.append(f'總數無法對齊：官網 {len(catalogue)} + 可匯入 {len(planned)}，Vocus {total}；可能超出公開頁最新 10 則範圍，請補 manifest 或檢查刪文')
    if problems:
        raise ValueError('\n'.join(problems))
    return planned

def run(text, root=ROOT, dry_run=False):
    rows, total = parse_public(text)
    planned = plan_import(rows, total, root)
    print(json.dumps({'publicTotal': total, 'new': [dict(title=m['title'], category=m['category'], sourceUrl=m['sourceUrl']) for m in planned]}, ensure_ascii=False, indent=2))
    if dry_run or not planned:
        return planned
    # Validate and generate everything in isolation before touching published files.
    with tempfile.TemporaryDirectory() as directory:
        staging = Path(directory)
        for name in OUTPUTS:
            dest = staging / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(root / name, dest)
        shutil.copytree(root / 'articles', staging / 'articles')
        for meta in planned:
            upsert(meta, metadata_only=True, root=staging)
        sync(staging)
        for name in OUTPUTS:
            shutil.copyfile(staging / name, root / name)
    return planned

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    request = Request(AUTHOR_URL, headers={'User-Agent': 'ChickenDadJournal-PublicMetadataSync/1.0'})
    with urlopen(request, timeout=45) as response:
        if response.status != 200:
            raise ValueError('公開頁讀取失敗')
        text = response.read(5_000_001)
        if len(text) > 5_000_000:
            raise ValueError('公開頁大小異常')
    run(text.decode('utf-8'), dry_run=args.dry_run)
