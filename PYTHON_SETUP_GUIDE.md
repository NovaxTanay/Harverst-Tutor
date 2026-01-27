# Python Environment Setup Guide

## Python Version Compatibility

### Recommended Setup
- **Python Version**: 3.10.x (You have Python 3.10.6 ✓)
- **TensorFlow**: 2.12.0 (Compatible with Python 3.10)
- This is the **optimal combination** for this project

---

## Installation Steps

### Step 1: Verify Python Installation

```bash
python --version
# Should show: Python 3.10.x
```

If you see a different version or error:
- Download Python 3.10 from: https://www.python.org/downloads/
- During installation, check "Add Python to PATH"

---

### Step 2: Create Virtual Environment (Recommended)

**Why use a virtual environment?**
- Isolates project dependencies
- Avoids conflicts with other Python projects
- Easy to delete and recreate if issues occur

**Create virtual environment:**

```bash
# Navigate to project directory
cd c:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main

# Create virtual environment
python -m venv venv_harvest

# Activate virtual environment
# On Windows:
venv_harvest\Scripts\activate

# You should see (venv_harvest) in your terminal prompt
```

---

### Step 3: Install Dependencies

**With virtual environment activated:**

```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Install all dependencies
pip install -r requirements.txt
```

**If TensorFlow installation fails**, try:

```bash
# Option 1: Install TensorFlow CPU version (lighter, no GPU required)
pip install tensorflow-cpu==2.12.0

# Option 2: Install specific wheel for Windows
pip install tensorflow==2.12.0 --no-cache-dir

# Option 3: Use alternative requirements
pip install -r requirements-alternatives.txt
```

---

### Step 4: Verify Installation

```bash
# Check TensorFlow installation
python -c "import tensorflow as tf; print(tf.__version__)"
# Should output: 2.12.0

# Check all dependencies
pip list
```

---

## Troubleshooting TensorFlow Issues

### Issue 1: "Could not find a version that satisfies the requirement tensorflow==2.12.0"

**Cause**: Incompatible Python version or missing Microsoft Visual C++

**Solutions**:

1. **Verify Python version**:
   ```bash
   python --version
   # Must be 3.8, 3.9, 3.10, or 3.11
   ```

2. **Install Visual C++ Redistributable** (Windows only):
   - Download from: https://aka.ms/vs/17/release/vc_redist.x64.exe
   - Install and restart computer

3. **Use CPU-only version**:
   ```bash
   pip install tensorflow-cpu==2.12.0
   ```

---

### Issue 2: "DLL load failed" or "ImportError: DLL"

**Cause**: Missing system libraries

**Solutions**:

1. **Install Visual C++ Redistributable** (see above)

2. **Update pip, wheel, and setuptools**:
   ```bash
   python -m pip install --upgrade pip wheel setuptools
   ```

3. **Reinstall TensorFlow**:
   ```bash
   pip uninstall tensorflow
   pip install tensorflow==2.12.0 --no-cache-dir
   ```

---

### Issue 3: "numpy.dtype size changed" warning

**Cause**: numpy version incompatibility

**Solution**:
```bash
pip install numpy==1.23.5 --force-reinstall
```

---

### Issue 4: Virtual environment conflicts

**Cause**: Multiple virtual environments or system-wide installations conflicting

**Solution - Clean reinstall**:

```bash
# Deactivate current environment
deactivate

# Delete old virtual environments
Remove-Item -Recurse -Force venv, venv310, tf_env

# Create fresh virtual environment
python -m venv venv_fresh

# Activate it
venv_fresh\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Python Version Reference

| Python Version | TensorFlow Version | Status |
|----------------|-------------------|---------|
| 3.8 | 2.12.0 | ✓ Supported |
| 3.9 | 2.12.0 | ✓ Supported |
| **3.10** | **2.12.0** | ✓ **Recommended** (Your version) |
| 3.11 | 2.13.0+ | ✓ Supported (upgrade TF) |
| 3.12 | 2.15.0+ | ⚠️ Limited support |

---

## Vercel Deployment Considerations

For Vercel deployment, consider:

1. **Model file size**: TensorFlow models are large (~100MB each)
   - Vercel limit: 250MB total deployment
   - Consider using TensorFlow Lite or ONNX

2. **Python runtime**: Vercel supports Python 3.9+
   - Your Python 3.10 code will work

3. **Alternative approach**: Use serverless functions with model in cloud storage
   - Host models on Google Cloud Storage or AWS S3
   - Download on-demand in serverless function

---

## Quick Commands Reference

```bash
# Create virtual environment
python -m venv venv_harvest

# Activate (Windows)
venv_harvest\Scripts\activate

# Activate (Mac/Linux)
source venv_harvest/bin/activate

# Install dependencies
pip install -r requirements.txt

# Deactivate virtual environment
deactivate

# Check installed packages
pip list

# Check TensorFlow
python -c "import tensorflow as tf; print(tf.__version__)"

# Check Python version
python --version

# Upgrade pip
python -m pip install --upgrade pip
```

---

## Environment Setup Checklist

- [ ] Python 3.10.x installed
- [ ] Virtual environment created
- [ ] Virtual environment activated
- [ ] pip upgraded to latest version
- [ ] requirements.txt installed successfully
- [ ] TensorFlow imports without errors
- [ ] numpy imports without errors
- [ ] All dependencies verified with `pip list`
- [ ] `.env` file created with API keys

---

## Success Test

Run this to verify everything works:

```bash
# Activate your virtual environment first
venv_harvest\Scripts\activate

# Test imports
python -c "import tensorflow as tf; import numpy as np; from PIL import Image; print('All imports successful!')"

# If no errors, you're ready to go!
```

---

## Need Help?

If you continue having issues:

1. **Check Python version**: Must be 3.8-3.11
2. **Use virtual environment**: Avoids system conflicts
3. **Install Visual C++**: Required for TensorFlow on Windows
4. **Try CPU version**: `pip install tensorflow-cpu==2.12.0`
5. **Check error messages**: Read carefully and search for specific errors

---

**Your Current Setup:**
- ✓ Python 3.10.6 (Perfect!)
- ✓ Compatible with TensorFlow 2.12.0
- Ready to proceed with installation
