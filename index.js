const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// 创建 Express 应用
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建 HTTP 服务器
const server = http.createServer(app);

// 创建 Socket.IO 服务器
const io = new Server(server);

// Socket.IO 连接事件
io.on('connection', (socket) => {
  console.log('建立新的链接, ID:', socket.id);

  // 接收消息
  socket.on('message', (data) => {
    console.log('接收到的客户端消息:', data);

    // 回复消息
    socket.emit('message', '收到消息: ' + data);
  });

  // 断开连接
  socket.on('disconnect', (reason) => {
    console.log('服务关闭, 原因:', reason);
  });

  // 连接错误
  socket.on('error', (error) => {
    console.log('服务异常关闭:', error);
  });
});

// 启动服务器
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Socket.IO 服务器启动成功，端口: ${PORT}`);
});
