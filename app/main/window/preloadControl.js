// 在 preload 脚本中。
const { ipcRenderer, contextBridge } = require('electron')

// // 直接放到 preload 中, 完全正常
// ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: false,
//       video: {
//         mandatory: {
//           chromeMediaSource: 'desktop',
//           chromeMediaSourceId: sourceId,
//           minWidth: 1280,
//           maxWidth: 1280,
//           minHeight: 720,
//           maxHeight: 720
//         }
//       }
//     })
//     handleStream(stream)
//   } catch (e) {
//     handleError(e)
//   }
// })
// function handleStream(stream) {
//   const video = document.querySelector('video')
//   video.srcObject = stream
//   video.onloadedmetadata = (e) => video.play()
// }
// function handleError(e) {
//   console.log(e)
// }


// 为什么放到app.js大概率会失效？--- 监听时机的问题！消息发完之后才开启的监听... 
// SET_SOURCE 消息的发送, 要放在页面load完之后执行... win.loadFile(xxx).then(capturer)

// window.screen 返回屏幕的宽高
const { width: screenWidth, height: screenHeight } = window.screen
contextBridge.exposeInMainWorld('electronAPI', {
  robot: (type, data) => {
    if (type === 'mouse') {
      data.screen = {
        width: screenWidth,
        height: screenHeight
      }
    }
    ipcRenderer.send('robot', type, data)
  },
})