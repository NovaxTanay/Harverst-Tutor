# Quick Start Commands - Harvest Tutor

## 🚀 Starting the Application

### You're Already Running It! ✅

According to your terminal, `npm run dev` is **already running** in the frontend directory!

**Just open your browser to:**
```
http://localhost:3000
```

---

## Common Navigation Errors

### Error: "Cannot find path ...frontend\frontend"

**Cause:** You're already IN the frontend directory, trying to `cd frontend` again.

**Current Path:** `C:\Users\Tanay\...\frontend`
**Trying to go to:** `C:\Users\Tanay\...\frontend\frontend` ❌ (doesn't exist)

**Solution:** You don't need to run any more commands! Just open your browser.

---

## Where Am I? (PWD - Print Working Directory)

To check your current directory:

```bash
# On Windows PowerShell
pwd

# Or
Get-Location
```

---

## Navigation Guide

### Scenario 1: You're in PROJECT ROOT
```
C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main
```

**To start frontend:**
```bash
cd frontend
npm run dev
```

### Scenario 2: You're ALREADY IN FRONTEND
```
C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main\frontend
```

**Just run:**
```bash
npm run dev
# DON'T do: cd frontend (you're already here!)
```

### Scenario 3: You're Lost

**Get back to project root:**
```bash
cd C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main
```

**Then navigate properly:**
```bash
cd frontend
npm run dev
```

---

## Starting Fresh

If you want to stop and restart the dev server:

### 1. Stop the Running Server
Press `Ctrl + C` in the terminal running `npm run dev`

### 2. Navigate to Project Root (if not there)
```bash
cd C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main
```

### 3. Navigate to Frontend
```bash
cd frontend
```

### 4. Start Dev Server
```bash
npm run dev
```

### 5. Open Browser
```
http://localhost:3000
```

---

## Quick Commands Reference

```bash
# Check where you are
pwd

# Go to project root
cd C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main

# List files in current directory
dir
# or
ls

# Start frontend (from project root)
cd frontend && npm run dev

# Start frontend (from frontend directory)
npm run dev

# Stop server
# Press: Ctrl + C

# Check if Node is running
Get-Process -Name node
```

---

## Visual Directory Structure

```
C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main\  ← PROJECT ROOT
│
├── frontend\          ← FRONTEND DIRECTORY
│   ├── src\
│   ├── package.json
│   └── node_modules\
│
├── api\
├── models\
└── requirements.txt
```

**If you're in PROJECT ROOT:**
- Run: `cd frontend` ✅

**If you're in FRONTEND:**
- DON'T run: `cd frontend` ❌ (you're already here!)
- Just run: `npm run dev` ✅

---

## Is the Server Running?

### Check Browser First
Open: **http://localhost:3000**

If you see the Harvest Tutor landing page → ✅ **Working!**

### Check Terminal
Look for output like:
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Check Process
Run this in PowerShell:
```bash
Get-Process -Name node
```

If you see node processes → Server is running ✅

---

## Troubleshooting

### "Port 3000 already in use"

**Cause:** Server is already running (maybe in another terminal)

**Solution A - Use existing server:**
Just open http://localhost:3000

**Solution B - Kill and restart:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it
taskkill /PID <PID> /F

# Start fresh
npm run dev
```

### "npm ERR! missing script: dev"

**Cause:** You're not in the frontend directory

**Solution:**
```bash
cd C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main\frontend
npm run dev
```

### Multiple Terminals Confused

**Solution - Clean slate:**
1. Close ALL terminals
2. Open ONE new terminal
3. Navigate to project:
   ```bash
   cd C:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main\frontend
   ```
4. Start server:
   ```bash
   npm run dev
   ```

---

## ✅ Success Checklist

- [ ] Terminal shows no errors
- [ ] You see "Ready in X.Xs" message
- [ ] Browser opens to http://localhost:3000
- [ ] Harvest Tutor landing page loads
- [ ] Can click "Start Diagnosis"
- [ ] Can navigate to /diagnose page

If all checked → **You're all set!** 🎉

---

## Current Status (Based on Your Terminals)

✅ **npm run dev is RUNNING** (for 26+ seconds)
✅ Frontend directory exists
✅ Dependencies installed
✅ Security vulnerabilities fixed

**Next Step:** Just open your browser to http://localhost:3000!

The error you saw was harmless - you just tried to `cd frontend` when already in frontend. The server is running fine!
