@echo off
title JOJO - Career OS
color 0B
cls
echo ======================================================================
echo                  JOJO - UNIFIED CAREER OS
echo ======================================================================
echo.
echo   [1/2] Opening your browser at http://localhost:3000 ...
echo   [2/2] Starting Turbopack engine ...
echo.
echo   * Keep this window open while using JOJO.
echo   * To stop JOJO, simply close this window.
echo.
echo ======================================================================
echo.

:: Automatically open browser in 2 seconds
start "" powershell -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000'"

:: Launch with Turbopack (instant startup, no OneDrive freeze)
call npx next dev --turbo -p 3000

pause
