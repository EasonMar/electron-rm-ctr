
const EventEmitter = require('events')
const peer = new EventEmitter()
const { desktopCapturer } = require('electron')

async function getScreenStream() {
  const sources = await desktopCapturer.getSources({ types: ['screen'] })
  return new Promise((resolve, reject) => {
    navigator.webkitGetUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
          maxWidth: window.screen.width,
          maxHeight: window.screen.height
        }
      }
    }, (stream) => {
      console.log('add-stream', stream)
      resolve(stream)
    }, reject)
  })
}

getScreenStream()

module.exports = peer