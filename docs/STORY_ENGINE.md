# Sprint 4: Story Engine v15.2

## 已完成
- `/content/stories/`：每篇故事的獨立 JSON
- `/content/family/`：角色資料
- `/content/series/`：系列資料
- `/schema/story.schema.json`：故事資料規格
- `/js/story-loader.js`：故事載入器
- `/js/story-card.js`：故事卡片元件
- `/data/articles.json`：首頁資料來源
- 自動 Related Stories 基礎邏輯

## 新增故事方式
1. 在 `/content/stories/` 新增一個 JSON。
2. 同步更新 `/data/articles.json`。
3. 若是新系列，更新 `/content/series/` 與 `/data/series.json`。
4. 若是新角色，更新 `/content/family/` 與 `/data/characters.json`。

下一版會把故事列表頁與角色頁改成完全資料驅動。
