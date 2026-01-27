@echo off
echo ============================================
echo   Harvest Tutor - Full Stack Launcher
echo ============================================
echo.

echo [1/3] Checking Vercel CLI installation...
where vercel >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Vercel CLI not installed
    echo.
    echo Installing Vercel CLI globally...
    call npm install -g vercel
    if errorlevel 1 (
        echo [ERROR] Failed to install Vercel CLI
        echo.
        echo Please install manually:
        echo   npm install -g vercel
        pause
        exit /b 1
    )
    echo [SUCCESS] Vercel CLI installed
) else (
    echo [SUCCESS] Vercel CLI is installed
)

echo.
echo [2/3] Checking environment files...
if not exist ".env" (
    echo [ERROR] .env file not found!
    echo Please create .env file with your API key
    echo See API_KEY_SECURITY.md for instructions
    pause
    exit /b 1
)
echo [SUCCESS] .env file exists

if not exist "frontend\.env.local" (
    echo [WARNING] frontend\.env.local not found
    echo Creating default configuration...
    echo NEXT_PUBLIC_API_URL=http://localhost:3000/api > frontend\.env.local
    echo [SUCCESS] Created frontend\.env.local
) else (
    echo [SUCCESS] frontend\.env.local exists
)

echo.
echo [3/3] Starting full-stack development server...
echo.
echo This will start BOTH frontend and backend:
echo   - Frontend: http://localhost:3000
echo   - Backend API: http://localhost:3000/api/*
echo.
echo Press Ctrl+C to stop the server
echo.
timeout /t 3 >nul

vercel dev

echo.
echo Server stopped.
pause
