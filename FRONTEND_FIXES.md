# Harvest Tutor - Frontend Error Fixes

## Common Frontend Errors and Solutions

### Error 1: "Cannot find module '@/components/...'" or "@/lib/..."

**Cause**: TypeScript path aliases not resolving correctly or missing files.

**Solution**:
1. Ensure all files exist in correct locations:
   ```
   frontend/
   ├── src/
   │   ├── app/
   │   │   ├── layout.tsx ✓
   │   │   ├── page.tsx ✓
   │   │   ├── globals.css ✓
   │   │   └── diagnose/
   │   │       └── page.tsx ✓
   │   ├── components/
   │   │   ├── ImageUpload.tsx ✓
   │   │   └── AudioPlayer.tsx ✓
   │   └── lib/
   │       └── api.ts ✓
   ```

2. Verify `tsconfig.json` has correct path mapping:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

3. Restart your IDE/editor after creating files

---

### Error 2: "Module not found: Can't resolve 'lucide-react'"

**Cause**: Dependencies not installed.

**Solution**:
```bash
cd frontend
npm install
```

If that doesn't work, try:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### Error 3: "Module not found: Can't resolve 'next/link'" or similar Next.js modules

**Cause**: Next.js not installed properly.

**Solution**:
```bash
cd frontend
npm install next@14.1.0 react@18.2.0 react-dom@18.2.0
```

---

### Error 4: Tailwind CSS classes not working

**Cause**: Tailwind not configured or build not running.

**Solution**:
1. Verify `tailwind.config.js` exists
2. Verify `postcss.config.js` exists  
3. Check `globals.css` has:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Install Tailwind dependencies:
   ```bash
   cd frontend
   npm install -D tailwindcss postcss autoprefixer
   ```

---

### Error 5: Build fails with TypeScript errors

**Cause**: TypeScript strict mode catching errors.

**Solutions**:

**Option A - Fix TypeScript errors** (Recommended):
- Check the error messages and fix type issues
- Ensure all props are properly typed
- Add missing return types

**Option B - Temporarily disable strict mode**:
In `tsconfig.json`, change:
```json
"strict": false
```

---

### Error 6: "Failed to compile" with CSS errors

**Cause**: CSS syntax errors or missing PostCSS config.

**Solution**:
1. Check `globals.css` for syntax errors
2. Ensure `postcss.config.js` exists:
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

---

### Error 7: Development server won't start

**Cause**: Port 3000 already in use or npm command not found.

**Solution**:
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process using port 3000
taskkill /PID <PID> /F

# Or run on different port
cd frontend
npm run dev -- -p 3001
```

---

### Error 8: "ENOENT: no such file or directory"

**Cause**: File paths incorrect or files missing.

**Solution**:
1. Check file exists at the path mentioned in error
2. Verify file names match exactly (case-sensitive)
3. Check for typos in import statements

---

## Step-by-Step Manual Setup

If automated scripts don't work, follow these manual steps:

### Step 1: Install Dependencies
```bash
cd c:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main\frontend
npm install
```

### Step 2: Create Environment File
Create `frontend/.env.local` with:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 3: Verify File Structure
Ensure these files exist:
- `frontend/src/app/layout.tsx`
- `frontend/src/app/page.tsx`
- `frontend/src/app/globals.css`
- `frontend/src/app/diagnose/page.tsx`
- `frontend/src/components/ImageUpload.tsx`
- `frontend/src/components/AudioPlayer.tsx`
- `frontend/src/lib/api.ts`
- `frontend/package.json`
- `frontend/tsconfig.json`
- `frontend/tailwind.config.js`
- `frontend/next.config.js`

### Step 4: Start Development Server
```bash
cd frontend
npm run dev
```

### Step 5: Check for Errors
Open browser to `http://localhost:3000`

If you see errors in the console:
1. Check browser console (F12)
2. Check terminal for build errors
3. Read error messages carefully
4. Fix one error at a time

---

## Quick Diagnosis Commands

Run these to check your setup:

```bash
# Check Node.js version
node --version
# Should be v18 or higher

# Check npm version
npm --version
# Should be 9 or higher

# Check if dependencies are installed
cd frontend
npm list next react react-dom
# Should show installed versions

# Try building
npm run build
# Check for any errors
```

---

## Still Having Issues?

1. **Delete and reinstall everything**:
   ```bash
   cd frontend
   Remove-Item -Recurse -Force node_modules, .next, package-lock.json
   npm install
   npm run dev
   ```

2. **Check specific error message**:
   - Copy the exact error message
   - Look for the file and line number mentioned
   - Check that specific file for syntax errors

3. **IDE/Editor issues**:
   - Restart VS Code or your editor
   - Run "Developer: Reload Window" command
   - Close and reopen the terminal

---

## Success Checklist

✅ Node.js v18+ installed
✅ npm dependencies installed (`node_modules` folder exists)
✅ All source files exist in correct locations
✅ `.env.local` file created
✅ `npm run dev` starts without errors
✅ Can access `http://localhost:3000`
✅ Landing page loads correctly
✅ Can navigate to `/diagnose`
