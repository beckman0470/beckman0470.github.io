"""Offline regression checks for untrusted public metadata and repeatability."""
import copy
import json
import shutil
import tempfile
import unittest
from pathlib import Path

from sync_vocus import AUTHOR_ID, OUTPUTS, ROOT, load_catalogue, run

class PublicSyncTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        for name in (*OUTPUTS, 'tools/article-only/vocus-categories.json'):
            dest = self.root / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / name, dest)
        shutil.copytree(ROOT / 'articles', self.root / 'articles')
        self.before = len(load_catalogue(self.root))
        self.row = dict(contentId='0123456789abcdef01234567', type='article',
                        title='公開測試', creatorId=AUTHOR_ID,
                        publishAt='2026-09-01T18:00:00Z', tags=['家庭誌'],
                        article=dict(userId=AUTHOR_ID, status=2, abstract='測試摘要'))

    def page(self, row=None, total=None):
        props = dict(userData=dict(_id=AUTHOR_ID, username='beckman'),
                     contentData=dict(contents=[row or self.row], count=total or self.before + 1))
        return '<script id="__NEXT_DATA__" type="application/json">' + json.dumps(dict(props=dict(pageProps=props))) + '</script>'

    def test_import_twice_preserves_count_and_uses_taipei_date(self):
        run(self.page(), self.root)
        self.assertEqual(len(load_catalogue(self.root)), self.before + 1)
        entry = next(a for a in load_catalogue(self.root) if a['title'] == '公開測試')
        self.assertEqual(entry['date'], '2026-09-02')
        self.assertEqual(entry['url'], 'https://vocus.cc/article/0123456789abcdef01234567')
        saved = {name: (self.root / name).read_bytes() for name in OUTPUTS}
        run(self.page(), self.root)
        self.assertEqual(saved, {name: (self.root / name).read_bytes() for name in OUTPUTS})

    def test_ambiguous_paid_foreign_and_gaps_leave_files_untouched(self):
        saved = {name: (self.root / name).read_bytes() for name in OUTPUTS}
        for change in ('category', 'paid', 'author', 'gap', 'status'):
            row = copy.deepcopy(self.row)
            if change == 'category': row['tags'] = ['健康']
            if change == 'paid': row['article']['isPay'] = True
            if change == 'author': row['creatorId'] = 'someone-else'
            if change == 'status': row['article']['status'] = 1
            with self.subTest(change=change), self.assertRaises(ValueError):
                run(self.page(row, self.before + (2 if change == 'gap' else 1)), self.root)
            self.assertEqual(saved, {name: (self.root / name).read_bytes() for name in OUTPUTS})

    def test_dry_run_does_not_write(self):
        saved = (self.root / 'data/articles.json').read_bytes()
        run(self.page(), self.root, dry_run=True)
        self.assertEqual(saved, (self.root / 'data/articles.json').read_bytes())

if __name__ == '__main__':
    unittest.main()
