# Stage Timer - Quick Start Guide

Get up and running with Stage Timer in under 5 minutes!

## Prerequisites

1. **Check if Node.js is installed**:
   ```bash
   node --version
   npm --version
   ```
   If not installed, download from https://nodejs.org/

## Installation

1. **Clone or download** the project to your computer
2. **Open terminal** and navigate to the project folder:
   ```bash
   cd stagetimer
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the App

### Development Mode (Recommended)
```bash
npm run electron-dev
```
This launches the app with development features enabled.

### What to Expect
- A semi-transparent window that stays on top
- Default timers loaded from your configuration
- Draggable window interface
- Color-coded timer states

## Basic Usage

### Timer Operations
- **Start Timer**: Click the green circle button
- **Pause Timer**: Click the red circle button (when running)
- **Archive Timer**: Right-click on any timer row to move it to bottom of list
- **Drag Window**: Click and drag anywhere to move the window

### First Steps
1. **Launch the app** - you'll see the default timers loaded
2. **Click the green circle** on any timer to start it
3. **Test the sounds** - you should hear a startup chime
4. **Try dragging** - click and drag to move the window around

## Advanced Features

### Customization (Optional)
1. Press `Cmd/Ctrl + Shift + S` to open settings
2. **Colors tab**: Change timer colors for different states
3. **Timers tab**: Add/edit/remove timers
4. **Sounds tab**: Enable/disable audio notifications

### Adding New Timers
1. Open settings (`Cmd/Ctrl + Shift + S`)
2. Go to **Timers** tab
3. Click **Add Timer**
4. Enter title and time (in minutes)
5. Click **Save & Close**

## Timer Behavior

- **Green background**: Timer running normally
- **Red background**: Less than 60 seconds remaining
- **Blue background**: Timer in overtime (past zero)
- **Progress bar**: Shows time remaining as background fill

## Sound Notifications

- **Startup**: 3-tone rising chime when timer starts
- **Warning**: Double beep at 60 seconds remaining
- **Finished**: 3-tone descending chime when timer reaches zero
- **Overtime**: Rapid beeping when timer goes negative

## Troubleshooting

### Common Issues
- **"npm command not found"**: Install Node.js first
- **Dependencies fail to install**: Try `npm install --force`
- **App won't start**: Check console for errors
- **No Sound**: Click anywhere in app first, check system volume
- **Timer Not Counting**: Ensure you clicked the green circle to start
- **Can't Drag Window**: Make sure you're not clicking on buttons
- **Settings Won't Open**: Try `Cmd/Ctrl + Shift + S` keyboard shortcut

### Alternative: Python Version
If React Native setup fails:
```bash
python3 test.py
```

## Production Build

To create a standalone application:
```bash
npm run build
npm run electron-pack
```
The built app will be in the `dist/` folder.

## Tips & Features

- **Window Dragging**: Click and drag anywhere (except buttons) to move window
- **Archive Timers**: Right-click timers to archive and move to bottom
- **Auto-Save**: Settings and timer states save automatically
- **Always on Top**: Window stays visible above other applications
- **Progress Bars**: Visual progress fills from 0% to 100% as time elapses

## Timer States & Colors

- **Green**: Timer running normally
- **Red**: Less than 60 seconds remaining (warning)
- **Blue**: Timer in overtime (past zero)
- **Archived**: Grayed out timers at bottom of list

## Sound Notifications

- **Start**: Rising 3-tone chime when timer begins
- **Warning**: Double beep at 60 seconds remaining
- **End**: Descending 3-tone chime when timer reaches zero
- **Overtime**: Rapid beeping when timer goes negative

## Default Timers

- **Presentation**: 30 minutes
- **Q&A**: 5 minutes  
- **Break**: 15 minutes
- **Setup**: 10 minutes

## Next Steps

1. Customize timers and colors for your specific needs
2. Test all features before important presentations
3. Build standalone app for distribution if needed

Need detailed documentation? Check the full README.md file.