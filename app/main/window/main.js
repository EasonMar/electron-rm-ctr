const path = require('path')
const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

let win = null;
function create() {
  win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.resolve(__dirname, '../renderer/pages/main/index.html'))
  }

}

// 主线程给渲染线程推送消息
function send(channel, ...args) {
  win.webContents.send(channel, ...args)
}

module.exports = {
  create,
  send
}