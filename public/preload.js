const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  openCustomization: () => ipcRenderer.invoke('open-customization'),
  onCustomizationUpdate: (callback) => ipcRenderer.on('customization-update', callback),
  removeCustomizationListener: (callback) => ipcRenderer.removeListener('customization-update', callback),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // Data management
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
});