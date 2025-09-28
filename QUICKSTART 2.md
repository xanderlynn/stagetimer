# Quick Start Guide

## Immediate Setup (5 minutes)

1. **Check if Node.js is installed**:
   ```bash
   node --version
   npm --version
   ```
   If not installed, download from https://nodejs.org/

2. **Install dependencies**:
   ```bash
   cd /Users/randalltatham/Desktop/stagetimer
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run electron-dev
   ```
   
   This starts the development server and opens the Stage Timer app.

## What to Expect

- A semi-transparent window that stays on top
- Three default timers from your `timers.json` file
- Start/Pause buttons that work like the original Python app
- Color-coded backgrounds for different timer states

## If Something Goes Wrong

- **"npm command not found"**: Install Node.js first
- **Dependencies fail to install**: Try `npm install --force`
- **App won't start**: Check console for errors, try `npm start` first
- **Transparency not working**: This is expected on some systems

## Alternative: Use Original Python Version

While setting up React Native:
```bash
cd /Users/randalltatham/Desktop/stagetimer
python3 test.py
```

## Next Steps

Once working:
1. Modify `timers.json` to customize your timers
2. Run `npm run electron-pack` to build a standalone app
3. The built app will be in `dist/` folder for distribution