"""Regression checks for the small publishing bridge (no network access)."""
import copy
import json
from pathlib import Path
import re
import shutil
import tempfile
import unittest
import xml.etree.ElementTree as ET

from catalogue import ROOT, load_catalogue, sync, upsert, validate_meta
from publish_article import render_article

class CatalogueTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for name in ('index.html', 'about.html', 'articles.html', 'data/articles.json'):
            dest = self.root / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / name, dest)
        shutil.copytree(ROOT / 'articles', self.root / 'articles')
        self.meta = dict(id='test', slug='test-import', title='測試 <標題> & 引號',
                         published='2026-09-09', summary='測試摘要', cover='assets/story-covers/default.svg',
                         category='家庭誌', source='Vocus', sourceUrl='https://vocus.cc/article/test',
                         canonicalUrl='https://vocus.cc/article/test', status='published')

    def test_metadata_import_is_repeatable_and_drives_all_outputs(self):
        before = len(load_catalogue(self.root))
        validate_meta(self.meta)
        upsert(self.meta, True, self.root)
        upsert(self.meta, True, self.root)
        articles = sync(self.root)
        self.assertEqual(len(articles), before + 1)
        self.assertEqual(articles[0]['slug'], 'test-import')
        self.assertIn('data-total-count>' + str(before + 1), (self.root / 'about.html').read_text(encoding='utf-8'))
        self.assertIn('data-latest-article href="https://vocus.cc/article/test"', (self.root / 'index.html').read_text(encoding='utf-8'))
        self.assertIn('data-journal-count="家庭誌">72 篇文章', (self.root / 'index.html').read_text(encoding='utf-8'))
        self.assertIn('測試 &lt;標題&gt; &amp; 引號', (self.root / 'articles.html').read_text(encoding='utf-8'))
        urls = [e.text for e in ET.parse(self.root / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        self.assertNotIn(self.meta['sourceUrl'], urls)
        outputs = {name: (self.root / name).read_bytes() for name in ('index.html', 'about.html', 'articles.html', 'sitemap.xml')}
        sync(self.root)
        for name, expected in outputs.items():
            self.assertEqual(expected, (self.root / name).read_bytes())

    def test_local_article_schema_and_sitemap(self):
        self.meta['canonicalUrl'] = 'https://beckman0470.github.io/articles/test-import.html'
        self.meta['summary'] = '</script><script>alert(1)</script>'
        page = render_article(self.meta, '<p>測試</p>')
        data = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', page)[1])
        self.assertEqual(data['author']['name'], '雞爸爸 ChickenDad')
        self.assertEqual(data['datePublished'], '2026-09-09')
        self.assertEqual(data['mainEntityOfPage'], self.meta['canonicalUrl'])
        (self.root / 'articles/test-import.html').write_text(page, encoding='utf-8')
        upsert(self.meta, False, self.root)
        sync(self.root)
        self.assertIn('<loc>' + self.meta['canonicalUrl'] + '</loc>', (self.root / 'sitemap.xml').read_text(encoding='utf-8'))

    def test_invalid_manifest_is_rejected(self):
        for key, value in [('category', '第六分類'), ('status', 'draft'), ('slug', '../escape'),
                           ('published', '2026-02-30'), ('sourceUrl', 'javascript:alert(1)')]:
            meta = copy.deepcopy(self.meta)
            meta[key] = value
            with self.assertRaises(ValueError):
                validate_meta(meta)

if __name__ == '__main__':
    unittest.main()
