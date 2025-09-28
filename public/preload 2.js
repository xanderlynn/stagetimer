const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  openCustomization: () => ipcRenderer.invoke('open-customization'),
  getSettingsData: () => ipcRenderer.invoke('get-settings-data'),
  saveSettingsData: (data) => ipcRenderer.invoke('save-settings-data', data),
  closeCustomization: () => ipcRenderer.invoke('close-customization'),
  
  // Listen for messages from main process
  onSettingsToggle: (callback) => ipcRenderer.on('toggle-settings', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});