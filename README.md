# Electron demo of remote control
- From Geekbang [Tutorial](https://time.geekbang.org/course/detail/100044201-191151)

# 端口说明
- app\renderer\pages\control -- 控制端
- app\renderer\pages\main -- 傀儡端

# 业务流程
- 傀儡端申请被控制端控制
- 控制端开启p2p连接: createOffer -> setLocalDescription -> 发送SDP给傀儡端 -> 监听 ontrack 事件（等待傀儡端返回的track）
- 傀儡端开启录屏, 获取视频流 -> 响应p2p连接 createAnswer(addTrack -> setRemoteDescription -> setLocalDescription) -> 发送answer给控制端
- 控制端设置 setRemoteDescription -> 监听到 track 事件 -> 获取携带的数据