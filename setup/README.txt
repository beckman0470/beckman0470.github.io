雞爸爸官網：共用按讚與留言更新

目前狀態：網站程式已備妥。需完成以下兩步，並上傳網站檔案後才能上線。

一、開啟訪客身分
https://supabase.com/dashboard/project/pshwffoehfxrinkvtniq/auth/providers
在 Authentication → Sign In / Providers 找到 Anonymous Sign-ins，啟用並儲存。
這讓讀者不用填信箱或另外註冊，就能按讚、以暱稱留言。

二、建立共用資料表
https://supabase.com/dashboard/project/pshwffoehfxrinkvtniq/sql/new
用記事本開啟本資料夾內 01-community.sql，複製全部內容，貼到 SQL Editor 後按 Run。
出現 Success 即完成；此指令可重跑，不會刪掉既有留言。
只處理 cdj_ 前綴的表和函式，不會改動遊戲存檔。

三、上傳官網
將壓縮檔解開，除了 setup 資料夾外，其餘檔案與資料夾按原路徑上傳到 GitHub 儲存庫根目錄並覆蓋。
包含 articles.html、articles/、js/、css/、cloud-config.json。
setup 是給你執行的說明與 SQL，不必上傳官網。
請不要只上傳 ZIP 本身。等 GitHub Pages 部署成功後再測試。

四、驗證
打開任一文章，滑到最下方，按讚並留下測試留言。
再用另一台手機或無痕視窗開啟同篇文章，應看到一樣的讚數與留言。
文章列表顯示累計數量；進入文章才有互動按鈕與完整留言。
其他讀者頁面每 30 秒重新取得資料，也可以按「重新整理留言」。

五、留言管理
到 Supabase Table Editor 找 public.cdj_messages。
將不適當留言的 state 欄位改成 hidden，即不再公開顯示，也不計入留言數；改回 published 可恢復。
所有人可閱讀公開暱稱、留言和累計數量，但無法直接讀取讀者識別碼，或修改其他人的留言。
留言以純文字顯示，不會執行 HTML 或連結中的程式碼。
同一訪客每 30 秒最多一則、24 小時最多 20 則留言。

重要說明
讚數和留言儲存在 Supabase，非瀏覽器暫存；公開金鑰是正常的前端設定。
程式不含 Secret key / service_role / 資料庫密碼。
目前採訪客身分，同一瀏覽器同篇文章最多一個讚，可收回；清除瀏覽資料或換裝置會視為另一位訪客。
因此這不是「一位真人只能按一次」的實名制度；大量濫用仍需額外驗證或管理。
若之後開啟 CAPTCHA，需搭配增加前端驗證欄位，請先不要單獨開啟。
新增文章時，除了載入 /js/article-community.js，還要在 cdj_articles 新增文章路徑。
此整合包同時包含七頁迎賓版型修改與鼠姊姊學習／生活專區。請以根目錄 README-FIRST.txt 的完整上傳清單為準。
