@echo off
setlocal

:: Kill existing server and client processes
echo Checking for existing server and client processes...

for /f "tokens=5" %%a in ('netstat -ano ^| find ":3000" ^| find "LISTENING"') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| find ":8080" ^| find "LISTENING"') do taskkill /PID %%a /F >nul 2>&1

echo Existing processes stopped. Starting new instances...

:: Start the server
cd /d "C:\EP_Kiosk\server"
start cmd /k "npm install"
start cmd /k "npm start"

:: Wait for a few seconds to ensure the server starts
timeout /t 2 /nobreak >nul

:: Start the client
cd /d "C:\EP_Kiosk\client"
start cmd /k "install"
start cmd /k "npm run dev"

:: Wait before opening the browser
timeout /t 2 /nobreak >nul

:: Open Chrome in full-screen mode
start chrome --start-fullscreen http://localhost/

endlocal
