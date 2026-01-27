@echo off
echo ============================================
echo   Harvest Tutor - Frontend Setup
echo ============================================
echo.

echo [1/3] Checking if we're in the right directory...
if not exist "frontend\package.json" (
    echo [ERROR] Please run this script from the project root directory
    pause
    exit /b 1
)

echo [2/3] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    cd ..
    pause
    exit /b 1
)

echo.
echo [3/3] Setting up environment variables...
if not exist ".env.local" (
    if exist ".env.local.example" (
        copy ".env.local.example" ".env.local"
        echo Created .env.local from example
    ) else (
        echo NEXT_PUBLIC_API_URL=http://localhost:3000/api > .env.local
        echo Created default .env.local
    )
) else (
    echo .env.local already exists
)

cd ..

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo To start the development server:
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
