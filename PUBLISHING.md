# Publishing Pipeline

## 本機發布流程

```bash
python studio/publish.py "Update Chicken Dad Journal"
```

預設只會：

1. Build
2. QA
3. git status
4. git add
5. git commit

不會自動 push。

若要推送，請手動：

```bash
git push
```

## GitHub Actions

新增：

```text
.github/workflows/build.yml
```

每次 push 到 main 會自動：

- 執行 `python cms/build.py`
- 執行 `python studio/release_check.py`
