const path = require('path')
const { BrowserWindow, desktopCapturer } = require('electron')

let win = null;
function create() {
  win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preloadControl.js')
    }
  })

  return win.loadFile(path.resolve(__dirname, '../../renderer/pages/control/index.html'))

}

// 主线程给渲染线程推送消息
function send(channel, ...args) {
  win.webContents.send(channel, ...args)
}


// 桌面捕获
function capturer() {
  desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
    for (const source of sources) {
      if (source.id === 'screen:0:0') {
        win.webContents.send('SET_SOURCE', source.id)
        return
      }
    }
  })
}

module.exports = {
  create,
  send,
  capturer
}