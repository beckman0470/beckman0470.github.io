@echo off
chcp 65001 >nul
set "HERE=%~dp0"
if "%~1"=="" (
 echo 請將最新 GitHub 專案資料夾拖曳到這個 BAT 檔案上。
 pause
 exit /b 1
)
cd /d "%HERE%"
where py >nul 2>nul
if %ERRORLEVEL%==0 (
 py "%HERE%tools\apply_all.py" "%~1" --output "%HERE%ChickenDad_AllSite_ReadyToUpload.zip"
) else (
 python "%HERE%tools\apply_all.py" "%~1" --output "%HERE%ChickenDad_AllSite_ReadyToUpload.zip"
)
echo.
echo 如果顯示「成功產生」，請使用本資料夾中的 ChickenDad_AllSite_ReadyToUpload.zip。
pause
