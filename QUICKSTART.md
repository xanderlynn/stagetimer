# Stage Timer - Quick Start Guide

Get up and running with Stage Timer in under 5 minutes!

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

### Development Mode (Recommended for first-time users)
```bash
npm run electron-dev
```
This launches the app in development mode with debugging enabled.

### Production Mode
```bash
npm run build
npm run electron-pack
```
This creates a standalone application package.

## First Use

1. **Launch the app** - you'll see the default timers loaded
2. **Click the green circle** on any timer to start it
3. **Test the sounds** - you should hear a startup chime
4. **Open settings** with `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)

## Basic Operations

### Starting/Stopping Timers
- **Green circle** = Start timer (pauses others automatically)
- **Red circle** = Pause timer
- Only one timer runs at a time

### Customizing
1. Press `Cmd/Ctrl + ,` to open settings
2. **Colors tab**: Change timer colors
3. **Timers tab**: Add/edit/remove timers
4. **Sounds tab**: Enable/disable audio notifications
5. Click **Save & Close** to apply changes

### Adding New Timers
1. Open settings (`Cmd/Ctrl + ,`)
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

## Common Issues & Solutions

### No Sound?
- Click anywhere in the app first (browsers require user interaction for audio)
- Check settings - sounds might be disabled
- Ensure system volume is up

### Timer Not Counting?
- Make sure you clicked the green circle to start it
- Only one timer runs at a time - starting one pauses others
- Try refreshing with `Cmd/Ctrl + R`

### Settings Won't Open?
- Try `Cmd/Ctrl + ,` keyboard shortcut
- If that fails, restart the app

### Can't See All Timers?
- Scroll in the main window if you have many timers
- Window can be resized by dragging edges

## Quick Tips

- **Drag the window** by clicking and dragging the background
- **Keyboard shortcuts** work globally (even when app is in background)
- **Timer continues** even when app is minimized
- **Settings auto-save** - no need to manually save
- **Multiple monitors supported** - drag window between screens

## Default Timer Setup

The app comes with these default timers:
- **Presentation**: 30 minutes
- **Q&A**: 5 minutes  
- **Break**: 15 minutes
- **Setup**: 10 minutes

You can modify or replace these in the Timers tab of settings.

## Next Steps

Once you're comfortable with basics:
1. Customize colors to match your presentation style
2. Set up timers for your specific use case
3. Test keyboard shortcuts for smooth operation during events
4. Consider disabling sounds if using in quiet environments

Need more help? Check the full README.md for detailed documentation.