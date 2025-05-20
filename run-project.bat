@echo off

set FRONTEND_PATH=%USERPROFILE%\Desktop\ComplaintManager\front
set BACKEND_PROJECT_PATH=%USERPROFILE%\Desktop\ComplaintManager\CrimeAlerto

REM Build Backend with Maven
cd /d %BACKEND_PROJECT_PATH%
call mvn clean package || pause

REM Start Backend in new Command Prompt
start "Backend" cmd /k "cd /d target && java -jar CrimeAlerto-1.0-SNAPSHOT.jar"

REM Start Frontend in new Command Prompt
start "Frontend" cmd /k "cd /d %FRONTEND_PATH% && npm run dev"
