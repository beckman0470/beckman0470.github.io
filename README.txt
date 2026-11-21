雞爸爸生活研究室｜第三階段 B：剩下 5 款獨立遊戲的共用頁首／頁尾

這是一次性自動整合包：只需把 ZIP 內的四個檔案，依原路徑上傳 GitHub main 分支。
GitHub Actions 會在該次 push 後，針對「當時 GitHub 最新的五款遊戲 HTML」
僅插入 CSS/JS 載入標籤。不用下載全部網站，也不用本機執行程式。

本包包含：
- .github/workflows/cdj-stage3b-once.yml：只對這次四個檔案的修改觸發一次整合
- tools/cdj_stage3b_apply.py：原位小修 5 個獨立遊戲的 HTML，不覆蓋遊戲功能
- css/cdj-game-shell-five.css：共用精簡導覽與頁尾
- js/cdj-game-shell-five.js：各遊戲返回原房間、遊戲間與網站首頁

目標：
- play/fast-food/index.html：鼠姊姊速食店
- play/yahoo-water/index.html：雅虎喝水
- play/youyou-food/index.html：右右吃飯
- play/dish-family/index.html：洗碗泡泡小幫手
- play/bath-family/index.html：鼠媽媽幫龍弟弟洗澡

注意：
1. GitHub Actions 必須啟用，且允許 GITHUB_TOKEN 寫入 repository contents；否則 HTML 不會自動變更。
2. 若 Actions 工作失敗，請不要以為網站已修改成功；在 GitHub Actions 頁面查看執行結果。
3. 腳本只加入依賴，不修改任何遊戲玩法、角色圖、比分或動作。
4. 正式桌機／手機畫面必須在 GitHub Pages 部署後驗收。

本次採用五款專用的新檔名，避免影響前一階段美髮屋與燒肉共用版型。
