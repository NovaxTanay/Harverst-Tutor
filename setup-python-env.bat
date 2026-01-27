@echo off
echo ============================================
echo   Harvest Tutor - Python Environment Setup
echo ============================================
echo.

echo Detected Python version:
python --version
echo.

echo [1/5] Creating fresh virtual environment...
if exist "venv_harvest" (
    echo Removing old virtual environment...
    rmdir /s /q venv_harvest
)

python -m venv venv_harvest
if errorlevel 1 (
    echo [ERROR] Failed to create virtual environment
    echo Make sure Python is installed and in PATH
    pause
    exit /b 1
)
echo ✓ Virtual environment created

echo.
echo [2/5] Activating virtual environment...
call venv_harvest\Scripts\activate.bat
echo ✓ Virtual environment activated

echo.
echo [3/5] Upgrading pip...
python -m pip install --upgrade pip
echo ✓ pip upgraded

echo.
echo [4/5] Installing dependencies...
echo This may take several minutes for TensorFlow...
pip install -r requirements.txt
if errorlevel 1 (
    echo.
    echo [ERROR] Failed to install dependencies
    echo.
    echo Trying alternative installation...
    pip install tensorflow-cpu==2.12.0 numpy pillow gtts google-generativeai python-dotenv
    if errorlevel 1 (
        echo [ERROR] Installation failed. Please check PYTHON_SETUP_GUIDE.md
        pause
        exit /b 1
    )
)
echo ✓ Dependencies installed

echo.
echo [5/5] Verifying installation...
python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__)"
if errorlevel 1 (
    echo [WARNING] TensorFlow verification failed
) else (
    echo ✓ TensorFlow working
)

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Virtual environment: venv_harvest
echo.
echo To activate this environment in future:
echo   venv_harvest\Scripts\activate
echo.
echo To deactivate:
echo   deactivate
echo.
echo Next steps:
echo 1. Make sure to activate the virtual environment
echo 2. Create .env file with your Gemini API key
echo 3. Run: python -c "from services.disease_predictor import predict_disease"
echo.
pause
