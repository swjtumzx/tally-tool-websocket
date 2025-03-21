const ws = require('nodejs-websocket');
const path = require('path');
const express = require('express');
const http = require('http');

// 创建 Express 应用用于提供静态文件
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建 HTTP 服务器
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 80;

// 启动 HTTP 服务器
httpServer.listen(PORT, () => {
  console.log(`HTTP 服务器启动成功，端口: ${PORT}`);
});

// 创建 WebSocket 服务器
const wsServer = ws
  .createServer((connection) => {
    console.log('建立新的链接');

    // 接收消息
    connection.on('text', function (data) {
      console.log('接收到的客户端消息:' + data);
      connection.sendText('收到消息:' + data);
    });

    // 断开连接
    connection.on('close', function (code, reason) {
      console.log('连接关闭, 代码:', code, '原因:', reason);
    });

    // 错误处理
    connection.on('error', (error) => {
      console.log('服务异常关闭:', error);
    });
  })
  .listen(80);

console.log('WebSocket 服务器启动成功，端口: 8080');
