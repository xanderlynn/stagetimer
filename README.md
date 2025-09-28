# Stage Timer - React Native Desktop App

A sleek, modern stage timer application built with React Native Web and Electron. Perfect for presentations, performances, and time-sensitive events.

![Stage Timer Screenshot](assets/screenshot.png)

## Features

- **Multiple Timers**: Manage multiple countdown timers simultaneously
- **Visual Progress**: Background progress bars show time remaining at a glance
- **Sound Notifications**: Audio cues for timer start, 60-second warning, completion, and overtime
- **Color Customization**: Customize colors for running, warning, and overtime states
- **Minimal UI**: Clean, compact interface optimized for stage use
- **Keyboard Shortcuts**: Quick access via global hotkeys
- **Separate Settings Window**: Configure timers and settings in a dedicated window

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run electron-dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm run electron-pack
   ```

## Usage

### Timer Operations
- **Start Timer**: Click the green circle button to start a timer (pauses all others)
- **Pause Timer**: Click the red circle button to pause the active timer
- **Multiple Timers**: Only one timer can run at a time for focused time management

### Customization
- **Open Settings**: Use Cmd/Ctrl + , or access via app menu
- **Colors Tab**: Customize colors for different timer states
- **Timers Tab**: Add, edit, or remove timers
- **Sounds Tab**: Enable/disable audio notifications

### Keyboard Shortcuts
- `Cmd/Ctrl + ,`: Open customization window
- `Space`: Toggle current timer (when app is focused)
- `R`: Reset all timers
- `Cmd/Ctrl + Q`: Quit application

### Sound Notifications
- **Timer Start**: Rising three-tone chime
- **60-Second Warning**: Double beep
- **Timer End**: Descending three-tone chime
- **Overtime**: Rapid beeping sequence

## Project Structure

```
stagetimer/
├── src/
│   ├── StageTimerApp.js      # Main React component
│   ├── TimerTile.js          # Individual timer display
│   ├── TimerModel.js         # Timer data model
│   ├── TimerService.js       # Timer persistence service
│   └── SoundManager.js       # Web Audio API sound system
├── public/
│   ├── electron.js           # Electron main process
│   ├── preload.js           # Secure IPC bridge
│   ├── customization.html   # Settings window HTML
│   └── customization.js     # Settings window logic
├── assets/                  # Images and resources
└── timers.json             # Default timer configurations
```

## Technical Details

### Architecture
- **React Native Web**: Cross-platform UI components
- **Electron**: Desktop application wrapper
- **Web Audio API**: Dynamic sound generation
- **localStorage**: Settings and state persistence
- **IPC Communication**: Secure window-to-window messaging

### Timer States
- **Stopped**: Grey background, no progress
- **Running**: Green background with progress bar
- **Warning** (≤60s): Red background with progress bar
- **Overtime** (<0s): Blue background, full progress bar

### Audio System
- Uses Web Audio API for browser-compatible sound generation
- No external audio files required
- Automatically initializes on first user interaction
- Configurable on/off settings for each sound type

## Configuration

### Default Timers
Edit `public/timers.json` to modify default timer configurations:

```json
[
  {
    "title": "Presentation",
    "time": 1800
  },
  {
    "title": "Q&A",
    "time": 300
  }
]
```

### Settings Storage
Settings are automatically saved to localStorage and include:
- Color preferences for each timer state
- Sound notification preferences
- Timer configurations (title, duration)

## Development

### Prerequisites
- Node.js 16 or later
- npm or yarn

### Development Mode
```bash
npm run start          # Start React development server
npm run electron-dev   # Run full Electron app in development
```

### Building
```bash
npm run build         # Build React app for production
npm run electron-pack # Package Electron app
```

### Testing
```bash
npm test              # Run React tests
```

## Troubleshooting

### Audio Issues
- Ensure browser allows audio playback
- Audio requires user interaction to initialize
- Check sound settings in customization window

### Timer Not Updating
- Refresh the application
- Check browser console for errors
- Ensure JavaScript is enabled

### Window Management
- Use Cmd/Ctrl + , to reopen settings if closed
- Application supports multiple monitors
- Window positions are automatically saved

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and feature requests, please create an issue on the project repository.
