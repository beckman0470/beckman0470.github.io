# 雞爸爸生活研究室｜全站「獨家記憶」改為「家庭誌」工具包 v3.8

這包是針對你目前的需求做的：

> 搜尋網站所有「獨家記憶」，統一改成「家庭誌」，包含上方列、標題、內文、alt、aria-label、JSON、JS、HTML、Markdown 等文字。

## 使用方式

把整個 `tools/` 資料夾放到 GitHub repo 根目錄，也就是和 `index.html` 同一層。

然後執行：

```bash
python tools/replace_dujia_memory_to_family_journal.py
```

執行後會自動產生：

```text
rename_dujia_to_family_journal_report.txt
```

裡面會列出：
- 總共替換幾處
- 哪些檔案被改
- 每個檔案改了幾處

## 這支工具會替換哪些檔案

會處理這些文字型檔案：

```text
.html .htm .css .js .json .md .txt .xml .svg .webmanifest .py .yml .yaml
```

會跳過圖片、壓縮檔、字型、影片、`.git`、`node_modules` 等。

## 你目前首頁至少有一處需要改

目前線上首頁仍顯示：

```text
獨家記憶
```

應改為：

```text
家庭誌
```

## 建議上線流程

1. 先在 repo 根目錄執行工具
2. 檢查 `rename_dujia_to_family_journal_report.txt`
3. 用 GitHub diff 確認修改內容
4. commit / push
5. 等 GitHub Pages 部署完成
6. 用這個網址檢查：

```text
https://beckman0470.github.io/index.html?v=family-journal-20260709
```

## 注意

這包只做文字統一，不改圖片、不改 Hero、不改角色、不改版型。
