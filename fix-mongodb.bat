@echo off
echo ========================================
echo    ClimateLens MongoDB Troubleshooter
echo ========================================
echo.

echo 1. Checking if MongoDB is installed...
mongod --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB is installed
    mongod --version
) else (
    echo ❌ MongoDB is not installed or not in PATH
    echo Please install MongoDB from: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)

echo.
echo 2. Checking MongoDB service status...
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB service exists
    sc query MongoDB
) else (
    echo ❌ MongoDB service not found
)

echo.
echo 3. Attempting to start MongoDB service...
net start MongoDB
if %errorlevel% equ 0 (
    echo ✅ MongoDB service started successfully
) else (
    echo ❌ Failed to start MongoDB service
    echo Trying alternative service name...
    net start "MongoDB Server"
    if %errorlevel% equ 0 (
        echo ✅ MongoDB Server started successfully
    ) else (
        echo ❌ Could not start MongoDB service
        echo.
        echo Manual start option:
        echo Run: mongod --dbpath "C:\data\db"
    )
)

echo.
echo 4. Testing database connection...
cd server
node test-mongodb.js

echo.
echo 5. If MongoDB is running, starting the application...
if %errorlevel% equ 0 (
    echo ✅ Starting ClimateLens application...
    start "Server" npm start
    cd ..\client
    start "Client" npm start
    echo.
    echo ✅ Application started!
    echo Frontend: http://localhost:3000
    echo Backend: http://localhost:5000
) else (
    echo ❌ Please fix MongoDB connection first
)

echo.
echo Press any key to exit...
pause >nul
