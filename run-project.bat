@echo off

set FRONTEND_PATH=%USERPROFILE%\Desktop\ComplaintManager\Frontend
set BACKEND_PATH=%USERPROFILE%\Desktop\ComplaintManager\Backend

REM Build Backend with Maven
REM Start Backend in new Command Prompt
start "Backend" cmd /k "cd /d %BACKEND_PATH%  && mvn compile exec:java"

REM Start Frontend in new Command Prompt
start "Frontend" cmd /k "cd /d %FRONTEND_PATH% && npm run dev"
