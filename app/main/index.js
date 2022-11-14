const { app, BrowserWindow } = require('electron')
const { create: createWindow } = require('./window/main')
const handleIPC = require('./ipc')
// const robot = require('./robot') // 暂时移除 robot 业务
app.whenReady().then(() => {
  createWindow()
  handleIPC()
  // robot()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


