const { ipcMain, screen } = require('electron')
const robot = require('robotjs')
const vkey = require('vkey')

function handleMouse(data) {
  let { clientX, clientY, screen, video, scaleFactor } = data
  // data {clientX, clientY, screen: {width, height}, video: {width, height}}
  let x = clientX * screen.width / video.width * scaleFactor
  let y = clientY * screen.height / video.height * scaleFactor
  robot.moveMouse(x, y)
  robot.mouseClick()
}

function handleKey(data) {
  // data {keyCode, meta, alt, ctrl, shift}
  const modifiers = []
  if (data.meta) modifiers.push('meta')
  if (data.shift) modifiers.push('shift')
  if (data.alt) modifiers.push('alt')
  if (data.ctrl) modifiers.push('ctrl')
  let key = vkey[data.keyCode].toLowerCase()
  if (key[0] !== '<') { //<shift>
    robot.keyTap(key, modifiers)
  }
}

module.exports = function () {
  const primaryDisplay = screen.getPrimaryDisplay()
  ipcMain.on('robot', (e, type, data) => {
    if (type === 'mouse') {
      data.scaleFactor = primaryDisplay.scaleFactor
      handleMouse(data)
    } else if (type === 'key') {
      handleKey(data)
    }
  })
}