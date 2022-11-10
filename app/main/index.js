const { app, BrowserWindow } = require('electron')
// const { create: createWindow } = require('./window/main')
const { create: createWindow, capturer } = require('./window/control')
const handleIPC = require('./ipc')
app.whenReady().then(() => {
  createWindow().then(capturer)
  handleIPC()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


