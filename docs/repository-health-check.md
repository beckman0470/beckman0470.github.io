# Repository Health Check

## 必要檔案

- README.md
- CHANGELOG.md
- ROADMAP.md
- CONTRIBUTING.md
- LICENSE
- VERSION.txt
- config.json

## 必要目錄

- cms/
- engine/
- studio/
- content/
- data/
- docs/
- js/
- templates/
- .github/

## 建議檢查

```bash
python cms/build.py
python tools/qa_check.py
python studio/release_check.py
```
