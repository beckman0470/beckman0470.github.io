# v5.0 Sprint 3｜Publishing Pipeline

## 新增

```text
studio/publish.py
studio/release_check.py
.github/workflows/build.yml
PUBLISHING.md
```

## 功能

- Build Pipeline
- QA Check
- Git Commit Helper
- GitHub Actions Build Check
- Release Check

## 使用

```bash
python studio/publish.py "Update site"
```

## 注意

`publish.py` 預設不自動 push，避免誤推。
