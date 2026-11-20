浴室新遊戲入口修復包（2026-11-20）

修正：
- 浴室原來的「洗澡步驟小達人」入口移除。
- 換成「鼠媽媽幫龍弟弟洗澡」，指向 /play/bath-family/。
- 浴室「選擇內容」下拉選單與內嵌遊戲同時更新。
- 移除舊版浴室入口轉址攔截程式引用，避免點擊後跳轉錯誤。
- 保留浴室安全圖片小學堂、其他房間與遊戲邏輯。

上傳：把 rooms.html、js/room-content.js 覆蓋到 GitHub 根目錄相同位置。
本包只修復入口。新版遊戲程式已存在於 GitHub 的 play/bath-family/index.html；
請勿額外上傳任何上一版的 bath-family-entry.js。

驗收：開啟 https://beckman0470.github.io/rooms.html?room=bathroom
點選「鼠媽媽幫龍弟弟洗澡」，應該在浴室內載入新版雙擊圖片遊戲。

GitHub 若已有其他同事在這兩個檔案上進行較新修改，請先比對差異再覆蓋，避免蓋掉新變更。
