# Contributing

Chicken Dad Journal 目前是個人內容平台專案。

## 開發原則

1. GitHub Repository 是唯一程式碼來源。
2. `cms/build.py` 是主要建置入口。
3. 新文章以 Markdown 管理。
4. Production 版本需通過 QA。
5. 文件更新需同步 README / CHANGELOG / ROADMAP。

## Build

```bash
python cms/build.py
```

## QA

```bash
python tools/qa_check.py
python studio/release_check.py
```
