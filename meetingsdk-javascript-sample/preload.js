const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  clickButton: () => ipcRenderer.send("click-camera-button"),
});
