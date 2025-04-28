@echo off
setlocal

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Installing now...
    start /wait node.msi
    echo Node.js installation completed. Please restart this script.
    exit /b
)

:: Start the server
cd /d "C:\EP_Kiosk\server"
start cmd /k "npm install && npm start"

:: Wait for a few seconds to ensure the server starts
timeout /t 2 /nobreak >nul

:: Start the client
cd /d "C:\EP_Kiosk\client"
start cmd /k "npm install && npm run dev"

:: Wait before opening the browser
timeout /t 2 /nobreak >nul

:: Open browser in full-screen mode
start chrome --kiosk --kiosk-printing http://localhost/

endlocal
