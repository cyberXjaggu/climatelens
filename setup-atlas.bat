@echo off
echo ========================================
echo    MongoDB Atlas Setup Helper
echo ========================================
echo.

echo This script will help you set up your .env file for MongoDB Atlas
echo.

echo Step 1: Copy the .env.example file
if exist "server\.env" (
    echo ⚠️  .env file already exists. Creating backup...
    copy "server\.env" "server\.env.backup" >nul
    echo ✅ Backup created as .env.backup
)

copy "server\.env.example" "server\.env" >nul
echo ✅ Created .env file from template

echo.
echo Step 2: Edit the .env file
echo Please update the following in server\.env:
echo.
echo 1. MONGODB_URI - Replace with your Atlas connection string
echo    Format: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/climatelens?retryWrites=true^&w=majority
echo.
echo 2. EMAIL_HOST_USER - Your email address
echo 3. EMAIL_HOST_PASSWORD - Your email app password
echo.

echo Opening .env file for editing...
timeout /t 2 /nobreak > nul
notepad "server\.env"

echo.
echo Step 3: Test the connection
echo Press any key to test the MongoDB Atlas connection...
pause >nul

cd server
node test-mongodb.js

if %errorlevel% equ 0 (
    echo.
    echo ✅ Atlas connection successful! Starting the application...
    echo.
    cd ..
    call start-project.bat
) else (
    echo.
    echo ❌ Connection failed. Please check your .env configuration.
    echo Make sure you:
    echo 1. Replaced the connection string correctly
    echo 2. Used the correct username and password
    echo 3. Added your IP address to Atlas Network Access
)

echo.
pause
