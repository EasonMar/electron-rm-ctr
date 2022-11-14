const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  login: () => ipcRenderer.invoke('login'),
  control: (...arg) => ipcRenderer.send('control', ...arg),

  /**
   * ipcRenderer.on(channel, listener)
   *  - channel string
   *  - listener Function
   *    - event IpcRendererEvent
   *    - ...args any[]
   */
  handleControlState: (cb) => ipcRenderer.on('control-state-changed', cb),
  removeControlState: (cb) => ipcRenderer.removeListener('control-state-changed', cb),
  getStream: (cb) => ipcRenderer.on('SET_SOURCE', cb),
  capture: () => ipcRenderer.send("capture") // 触发主进程capturer
})