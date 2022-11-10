const { ipcMain } = require('electron')
const { send: sendMainWin } = require('./window/main')
// const { create: createControl } = require('./window/control')

// 封装主进程 IPC handler
module.exports = function () {
  // 主进程处理登录事件
  ipcMain.handle('login', async () => {
    // mock - 这里实际上需要跟服务端交互
    const code = Math.floor(Math.random() * 899999) + 100000
    return code
  })

  /**
   * ipcMain.on(channel, listener)
   *  - channel string
   *  - listener Function
   *    - event IpcMainEvent
   *    - ...args any[]
   */
  ipcMain.on('control', async (e, remoteCode) => {
    // mock - 这里实际上需要跟服务端交互
    sendMainWin('control-state-changed', remoteCode, 1)
    // createControl()
  })
}