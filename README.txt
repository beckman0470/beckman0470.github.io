BABYMONSTER v12 — 慢速逐句、逐字教學更新包

安裝：將 babymonster-classroom.html 上傳 GitHub 根目錄，覆蓋同名檔。原本的 /assets/babymonster/*.gif 不要刪除。

新增功能：
1. 按「開始慢速教學」：先講整句中文，再高亮各單字、慢速唸字詞、講詞義。
2. 每個字完成後停頓預設 2.5 秒（可改 1.5、4、6 秒）。
3. 點選單字單獨重聽，亦可用上一字／下一字。
4. 單字詞義以內建基本字典或家長填入的「字詞|意思|發音提示」為準。未查證詞不猜、不唸錯誤翻譯。
5. 歌詞文本：仍須家長在原有「家長設定」提供有權展示的原文，否則無法從只有中文句意的資料做精準逐字分析。
6. 配音整合：若存在 MP3 優先播放，沒有才回退瀏覽器 TTS。這份 ZIP 不含憑空合成的七位聲音，也沒有成功操作 CapCut 的音檔。

可選的獨立音檔命名：
/assets/babymonster/audio/{member}/{song}_{segment}_{line}_meaning.mp3
/assets/babymonster/audio/{member}/{song}_{segment}_{line}_word_{index}.mp3
/assets/babymonster/audio/{member}/{song}_{segment}_{line}_gloss_{index}.mp3
例：assets/babymonster/audio/chiquita/drip_01_01_meaning.mp3
    assets/babymonster/audio/chiquita/drip_01_01_word_01.mp3
    assets/babymonster/audio/chiquita/drip_01_01_gloss_01.mp3

注意：既有歌詞翻譯、原唱片段時間未完整核實。本版以改善慢速與逐字教學流程為主，不代表四首歌均完成歌詞／MV 精準同步。
