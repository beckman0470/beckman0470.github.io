BABYMONSTER DRIP 逐句英韓教學｜完整版歌詞資料版（2026-11-15）

上傳方式：把本 ZIP 內 babymonster-ep01.html 和 assets 資料夾的內容，依原路徑覆蓋上傳至 GitHub Pages 網站根目錄。

本版內容：
- 依使用者提供的完整歌詞拆成 55 句；重複副歌同樣保留。
- 每句歌詞、繁體中文解釋、英文及韓文單字圖卡和語音按鍵。
- 韓文羅馬拼音作為輔助文字，不當成重複演唱。
- 直接從 0:00 播放使用者提供的 dodo-song.m4a 錄音。
- 保持定案粉紅舞台畫面，不新增第二組卡通人物，避免疊影。
- 可匯入逐字秒數 JSON，啟用按時間自動停句、逐字亮字及中文教學。

重要限制：
這包未附 LyricTimestamps 真實對齊時間碼，不能宣稱已經精準逐字同步；
在時間碼不存在時，錄音從頭連續播放，仍可使用下一句以及獨立的中文教學按鍵。

需要的時間碼格式：
{
  "lines": [
    {"start": 0.0, "end": 2.7,
     "words": [
       {"text":"When", "start":0.0, "end":0.3},
       {"text":"I", "start":0.3, "end":0.5}
     ]
    }
  ]
}
上方數字純為 JSON 結構範例，不是錄音的實際時間！
任何時間碼都必須先與實際音檔及使用者歌詞核對。若輸出格式不同需要轉換。

檔案：
- babymonster-ep01.html 互動教學網頁
- assets/bm-approved/drip-stage.jpg 固定粉紅舞台
- assets/bm-approved/drip-lessons.json 55 句歌詞、繁中翻譯、詞彙卡
- assets/bm-approved/drip-timestamps.json 空白對齊檔（明示未校準）
- assets/dodo/dodo-song.m4a 使用者提供之錄音

此網頁將在公開網站上公開所附音訊，請在上傳前確認符合你的隱私期待。
