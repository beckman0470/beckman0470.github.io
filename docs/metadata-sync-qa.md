# Metadata Patch QA（2026-09-09）

- 基底 commit：`ac6336d2acfb75a4b7949b0a7af2b2cb05922759`。
- 已收錄 119 篇：家庭誌 71、保健室 19、圖書室 7、風格誌 17、光影誌 5。
- 最新文章：2026-09-01〈A流之後，雞爸爸累累的：燒退了，怎麼感覺人還沒回來？〉。
- 首頁與 About 共 2 個 JSON-LD 區塊、119 個文章頁的 Article JSON-LD 均可解析。
- 首頁與 About 的站內 href/src 檔案存在；官方 IG 與 Vocus 作者連結使用使用者確認 URL。
- Edge／Playwright：1440px 桌面與 390px 手機檢查首頁、About、文章列表，無 JS 例外、無水平溢出；最新文章、119 篇統計、五大入口數量正確。
- 模擬資料讀取失敗，保留產生的首頁備援；空清單可將 About 更新為 0。
- 匯入回歸測試 3 項通過：相同 slug 重跑不重複；首頁／About／列表／sitemap 同步且重跑相同；站內 canonical 文章及模板 schema；錯誤分類、日期、草稿狀態與 URL 拒絕。
- sitemap 共 16 個唯一站內 URL，檔案皆存在。119 篇現有文章 canonical 均為 Vocus，故不將其重複版本列入官網 sitemap。
- `studio/release_check.py` 通過；`git diff --check` 通過。
- `tools/qa_check.py` 的舊規則要求首頁存在 `id="contact"`，基底首頁已無此區塊，故此檢查仍失敗。其相對路徑檢查也會誤報以 `/articles/` 開頭的有效站內網址；另以網站根目錄解析驗證已通過。未為了配合舊 QA 而改動網站區塊。

本次未匯入未提供的新 Vocus 文章、未改動現有全文／分類／角色／全站樣式。metadata 匯入為可重複流程，不代表已建立自動爬取或定時同步。

