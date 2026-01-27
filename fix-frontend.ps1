# Harvest Tutor - Frontend Troubleshooting & Fix Script

Write-Host "============================================" -ForegroundColor Green
Write-Host "  Harvest Tutor - Frontend Diagnostic Tool" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path ".\frontend\package.json")) {
    Write-Host "[ERROR] Please run this script from the project root directory" -ForegroundColor Red
    Write-Host "Expected to find: .\frontend\package.json" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/6] Checking Node.js installation..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "[2/6] Checking npm installation..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "  ✓ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3/6] Checking frontend directory structure..." -ForegroundColor Cyan
$requiredDirs = @(
    ".\frontend\src",
    ".\frontend\src\app",
    ".\frontend\src\components",
    ".\frontend\src\lib"
)

$allDirsExist = $true
foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "  ✓ Found: $dir" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Missing: $dir" -ForegroundColor Red
        $allDirsExist = $false
    }
}

if (-not $allDirsExist) {
    Write-Host ""
    Write-Host "  Some directories are missing. This may cause errors." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[4/6] Checking for node_modules..." -ForegroundColor Cyan
if (Test-Path ".\frontend\node_modules") {
    Write-Host "  ✓ node_modules exists" -ForegroundColor Green
    $needsInstall = $false
} else {
    Write-Host "  ✗ node_modules not found" -ForegroundColor Yellow
    Write-Host "  Dependencies need to be installed" -ForegroundColor Yellow
    $needsInstall = $true
}

Write-Host ""
Write-Host "[5/6] Installing dependencies..." -ForegroundColor Cyan
if ($needsInstall) {
    Write-Host "  Installing npm packages (this may take a few minutes)..." -ForegroundColor Yellow
    Set-Location .\frontend
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Failed to install dependencies" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
} else {
    Write-Host "  Reinstalling dependencies to ensure everything is up to date..." -ForegroundColor Yellow
    Set-Location .\frontend
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Dependencies reinstalled successfully" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Failed to reinstall dependencies" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
}

Write-Host ""
Write-Host "[6/6] Checking environment variables..." -ForegroundColor Cyan
if (Test-Path ".\frontend\.env.local") {
    Write-Host "  ✓ .env.local file exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠ .env.local not found" -ForegroundColor Yellow
    Write-Host "  Creating .env.local from example..." -ForegroundColor Yellow
    if (Test-Path ".\frontend\.env.local.example") {
        Copy-Item ".\frontend\.env.local.example" ".\frontend\.env.local"
        Write-Host "  ✓ Created .env.local" -ForegroundColor Green
    } else {
        Write-Host "  Creating default .env.local..." -ForegroundColor Yellow
        "NEXT_PUBLIC_API_URL=http://localhost:3000/api" | Out-File -FilePath ".\frontend\.env.local" -Encoding UTF8
        Write-Host "  ✓ Created .env.local with default values" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Diagnostic Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. To run the development server:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. To build for production:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Yellow
Write-Host "   npm run build" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Frontend will be available at:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
