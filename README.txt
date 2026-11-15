BABYMONSTER DRIP 逐字時間碼驅動版（不含虛構時間）

上傳 babymonster-ep01.html 至 GitHub 根目錄（覆蓋舊檔）。
本包保留網站既有 /assets/bm-approved/drip-stage.jpg 及 /assets/dodo/dodo-song.m4a 的引用，不重複包含私人的錄音。

重要：需從 LyricTimestamps 取得 55 句逐字 JSON，或轉為內建的 {lines:[{start,end,words:[{start,end,text}]}]} 格式。匯入並驗證後，自動教學按鈕才會啟用。
未取得真正時間碼前，程式不會使用估算秒數假裝同步。
播放器的逐句暫停已依 JSON 起訖時間實作，但尚未進行真實逐字時碼與瀏覽器整合驗收。
