
const video = document.querySelector('video')
function handleStream(stream) {
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

// =================== P2P数据传输 ===================
// RTCPeerConnection - 控制端
const pc = new window.RTCPeerConnection({})
async function createOffer() {
  const offer = await pc.createOffer({
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
  })
  await pc.setLocalDescription(offer)
  console.log(`pc offer`, JSON.stringify(offer))
  return pc.localDescription
}
createOffer()

async function setRemote(answer) {
  await pc.setRemoteDescription(answer)
}
window.setRemote = setRemote
pc.ontrack = (e) => {
  console.log('ontrack')
  console.log(e)
  handleStream(e.streams[0])
}
// =================== ========== ===================


// 桌面控制
window.onkeydown = function (e) {
  // data {keyCode, meta, alt, ctrl, shift}
  let data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    control: e.ctrlKey,
    alt: e.altKey
  }
  window.electronAPI.robot('key', data)
}

window.onmouseup = function (e) {
  // data {clientX, clientY, screen: {width, height}, video: {width, height}}
  let data = {}
  data.clientX = e.clientX
  data.clientY = e.clientY
  data.video = {
    width: video.getBoundingClientRect().width,
    height: video.getBoundingClientRect().height
  }
  window.electronAPI.robot('mouse', data)
}
