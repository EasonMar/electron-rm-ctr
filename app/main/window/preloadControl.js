// 在 preload 脚本中。
const { ipcRenderer, contextBridge } = require('electron')

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


ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  console.log('PPPP preloadControl listening')
})

// 为什么放到app里面经常失效呢？--- 时机的问题？ 消息发完之后才开启的监听？
contextBridge.exposeInMainWorld('electronAPI', {
  // 这两行有啥区别 --- 仅仅是返回值的区别吧....
  // getStream: (cb) => { ipcRenderer.on('SET_SOURCE', cb) }
  getStream: (cb) => ipcRenderer.on('SET_SOURCE', cb)
})

