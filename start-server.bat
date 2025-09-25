@echo off
echo ========================================
echo    ClimateLens Server Startup Script
echo ========================================
echo.

cd /d "%~dp0\server"

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found: 
node --version

echo.
echo Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not available
    pause
    exit /b 1
)

echo npm found:
npm --version

echo.
echo Installing dependencies...
npm install

echo.
echo Validating configuration...
npm run validate
if errorlevel 1 (
    echo.
    echo ERROR: Configuration validation failed
    echo Please check your .env file and fix the issues above
    pause
    exit /b 1
)

echo.
echo Starting ClimateLens server...
echo Press Ctrl+C to stop the server
echo.
npm start

pause
