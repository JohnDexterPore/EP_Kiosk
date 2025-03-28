@echo off
setlocal

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Downloading and installing...
    powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi' -OutFile 'nodejs.msi'"
    msiexec /i nodejs.msi /quiet /norestart
    del nodejs.msi
    echo Node.js installation completed. Please restart the script.
    exit /b
)

echo Node.js is installed.

:: Kill existing server and client processes
echo Checking for existing server and client processes...

for /f "tokens=5" %%a in ('netstat -ano ^| find ":3000" ^| find "LISTENING"') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| find ":8080" ^| find "LISTENING"') do taskkill /PID %%a /F >nul 2>&1

echo Existing processes stopped. Starting new instances...

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
set "URL=http://localhost/"
set "BROWSER=chrome"

where %BROWSER% >nul 2>&1
if %errorlevel% neq 0 set "BROWSER=firefox"
where %BROWSER% >nul 2>&1
if %errorlevel% neq 0 set "BROWSER=msedge"
where %BROWSER% >nul 2>&1
if %errorlevel% neq 0 set "BROWSER=iexplore"
where %BROWSER% >nul 2>&1
if %errorlevel% neq 0 (
    echo No supported browser found.
    exit /b
)

start %BROWSER% --start-fullscreen %URL%

endlocal
