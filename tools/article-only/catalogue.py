"""Small publishing bridge to the existing public data/articles.json catalogue."""
import html
import json
import re
import sys
from datetime import date
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from engine.seo import SITE_URL, build_sitemap

JOURNALS = dict(zip(('家庭誌', '保健室', '圖書室', '風格誌', '光影誌'),
                    ('family', 'health', 'library', 'style', 'light')))

def load_catalogue(root=ROOT):
    return json.loads((root / 'data/articles.json').read_text(encoding='utf-8'))

def validate_meta(meta):
    for key in ('title', 'slug', 'published', 'summary', 'cover', 'category', 'source', 'sourceUrl', 'canonicalUrl'):
        if not isinstance(meta.get(key), str) or not meta[key].strip():
            raise ValueError(f'缺少必要欄位：{key}')
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', meta['slug']):
        raise ValueError('slug 必須是小寫英文、數字與連字號')
    if meta['category'] not in JOURNALS:
        raise ValueError('category 必須使用五大正式入口')
    if meta.get('status') != 'published':
        raise ValueError('僅接受明確標示 published 的匯入資料')
    date.fromisoformat(meta['published'])
    date.fromisoformat(meta.get('updated') or meta['published'])
    for key in ('sourceUrl', 'canonicalUrl'):
        url = urlparse(meta[key])
        if url.scheme != 'https' or not url.netloc:
            raise ValueError(f'{key} 必須是完整 HTTPS URL')
    if meta['source'] == 'Vocus' and urlparse(meta['sourceUrl']).hostname != 'vocus.cc':
        raise ValueError('Vocus sourceUrl 必須指向 vocus.cc')
    cover = urlparse(meta['cover'])
    if cover.scheme and cover.scheme != 'https':
        raise ValueError('封面僅接受 HTTPS 或站內路徑')
    if not cover.scheme and ('..' in Path(meta['cover']).parts or cover.netloc):
        raise ValueError('封面路徑不可離開網站')

def upsert(meta, metadata_only=False, root=ROOT):
    articles = load_catalogue(root)
    previous = next((a for a in articles if a['slug'] == meta['slug']), {})
    entry = dict(previous)
    entry.update({
        'id': meta.get('id') or meta['slug'], 'slug': meta['slug'], 'title': meta['title'],
        'date': meta['published'], 'updated': meta.get('updated') or meta['published'],
        'summary': meta['summary'], 'cover': meta['cover'], 'category': meta['category'],
        'series': meta.get('series', ''), 'seriesTitle': meta.get('series', ''),
        'tags': meta.get('tags', []), 'readingTime': meta.get('readingTime', 0),
        'source': meta['source'], 'sourceUrl': meta['sourceUrl'],
        'canonicalUrl': meta['canonicalUrl'], 'status': 'published',
        'url': previous.get('url', meta['sourceUrl']) if metadata_only else f"/articles/{meta['slug']}.html",
        'contentType': meta.get('contentType', 'article'),
    })
    for a in articles:
        if a['slug'] != entry['slug'] and (a.get('id') == entry['id'] or a.get('sourceUrl') == entry['sourceUrl']):
            raise ValueError('重複的 id 或 sourceUrl；請使用原有 slug 更新')
    articles = [entry if a['slug'] == entry['slug'] else a for a in articles]
    if not previous:
        articles.append(entry)
    articles.sort(key=lambda a: a['date'], reverse=True)
    (root / 'data/articles.json').write_text(json.dumps(articles, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return articles

def sync(root=ROOT):
    articles = [a for a in load_catalogue(root) if a.get('status', 'published') == 'published']
    articles.sort(key=lambda a: a['date'], reverse=True)
    for a in articles:
        if a['category'] not in JOURNALS:
            raise ValueError(f"未知入口：{a['category']}")
    index = root / 'index.html'
    text = index.read_text(encoding='utf-8')
    latest = articles[0]['url'] if articles else 'articles.html'
    text = re.sub(r'(data-latest-article\s+href=")[^"]*', lambda m: m[1] + html.escape(latest, quote=True), text)
    for category in JOURNALS:
        count = sum(a['category'] == category for a in articles)
        text = re.sub(r'(data-journal-count="' + category + r'">)[^<]*', lambda m: m[1] + f'{count} 篇文章', text)
    index.write_text(text, encoding='utf-8')
    about = root / 'about.html'
    about.write_text(re.sub(r'(data-total-count>)[^<]*', lambda m: m[1] + str(len(articles)), about.read_text(encoding='utf-8')), encoding='utf-8')

    # Keep the existing card renderer and its layout; regenerate its data only.
    cards = [dict(journal=JOURNALS[a['category']], title=html.escape(a['title']),
                  excerpt=html.escape(a.get('summary', '')), date=a['date'].replace('-', '.'),
                  href=a['url'], tags=[html.escape(t) for t in a.get('tags', [])[:3]],
                  cover=html.escape(a.get('cover') or 'assets/story-covers/default.svg', quote=True)) for a in articles]
    listing = root / 'articles.html'
    serialized = json.dumps(cards, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
    listing.write_text(re.sub(r'const stories = \[.*?\];', lambda _: 'const stories = ' + serialized + ';', listing.read_text(encoding='utf-8'), count=1), encoding='utf-8')

    # Canonical may already live in the published HTML for older catalogue rows.
    sitemap_articles = []
    for a in articles:
        item = dict(a)
        local_url = urljoin(SITE_URL + '/', a['url'])
        if urlparse(local_url).netloc != urlparse(SITE_URL).netloc:
            continue
        page = root / urlparse(local_url).path.lstrip('/')
        if not page.is_file():
            raise ValueError(f'文章頁不存在：{page}')
        match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', page.read_text(encoding='utf-8'))
        item['canonicalUrl'] = a.get('canonicalUrl') or (html.unescape(match[1]) if match else local_url)
        sitemap_articles.append(item)
    (root / 'sitemap.xml').write_text(build_sitemap(sitemap_articles), encoding='utf-8')
    return articles
