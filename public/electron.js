const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let customizationWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 320,
    height: 200,
    minWidth: 280,
    minHeight: 150,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,
      preload: isDev 
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../build/preload.js')
    },
    frame: false,          // Frameless for transparency
    alwaysOnTop: true,
    transparent: true,
    opacity: 1.0,          // Full opacity, transparency handled by CSS
    skipTaskbar: false,
    resizable: true,
    movable: true,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent background
    titleBarStyle: 'hidden'
  });

  // Don't enable click-through by default - let dragging work
  // Click-through will be controlled dynamically by the renderer process

  // Load the app
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Set window to always stay on top
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true);

  // Register global shortcut for hide/show
  registerGlobalShortcuts();

  // Set up IPC handlers
  setupIPCHandlers();
}

function createCustomizationWindow() {
  if (customizationWindow) {
    customizationWindow.focus();
    return;
  }

  customizationWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 700,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: isDev 
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../build/preload.js')
    },
    parent: mainWindow,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    title: 'Stage Timer - Customization'
  });

  // Load the customization page
  customizationWindow.loadFile(isDev 
    ? path.join(__dirname, 'customization.html')
    : path.join(__dirname, '../build/customization.html')
  );

  // Show when ready
  customizationWindow.once('ready-to-show', () => {
    customizationWindow.show();
  });

  // Handle window closed
  customizationWindow.on('closed', () => {
    customizationWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app activation (macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, navigationURL, frameName, disposition) => {
    navigationEvent.preventDefault();
  });
});

// Register global shortcuts
function registerGlobalShortcuts() {
  // Hide/Show with Cmd+Shift+H (Mac) or Ctrl+Shift+H (Windows/Linux)
  const shortcut = process.platform === 'darwin' ? 'CommandOrControl+Shift+H' : 'CommandOrControl+Shift+H';
  
  globalShortcut.register(shortcut, () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  // Settings dialog with Cmd+Shift+S (Mac) or Ctrl+Shift+S (Windows/Linux)
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    createCustomizationWindow();
  });
}

// Unregister shortcuts when app quits
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Set up IPC communication between windows
function setupIPCHandlers() {
  // Handle opening customization window
  ipcMain.handle('open-customization', () => {
    createCustomizationWindow();
  });

  // Handle getting current settings and timers
  ipcMain.handle('get-settings-data', async () => {
    if (mainWindow) {
      return await mainWindow.webContents.executeJavaScript(`
        window.getAppData ? window.getAppData() : null
      `);
    }
    return null;
  });

  // Handle saving settings and timers
  ipcMain.handle('save-settings-data', async (event, data) => {
    if (mainWindow) {
      await mainWindow.webContents.executeJavaScript(`
        window.updateAppData && window.updateAppData(${JSON.stringify(data)})
      `);
    }
  });

  // Close customization window
  ipcMain.handle('close-customization', () => {
    if (customizationWindow) {
      customizationWindow.close();
    }
  });
}