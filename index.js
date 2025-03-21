const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { init: initDB, Counter } = require('./db');

// 创建Express应用
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// 首页
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建HTTP服务器
const server = http.createServer(app);

// 创建Socket.IO服务器
const io = new Server(server);

// Socket.IO连接事件
io.on('connection', (socket) => {
  console.log('用户已连接:', socket.id);

  // 发送欢迎消息
  socket.emit('message', {
    type: 'welcome',
    message: '欢迎连接到Socket.IO服务器',
  });

  // 监听客户端消息
  socket.on('message', async (data) => {
    console.log('收到消息:', data);

    // 处理计数功能
    if (data.type === 'count') {
      if (data.action === 'get') {
        // 获取计数
        const count = await Counter.count();
        socket.emit('message', {
          type: 'count',
          data: count,
        });
      } else if (data.action === 'inc') {
        // 增加计数
        await Counter.create();
        const count = await Counter.count();
        socket.emit('message', {
          type: 'count',
          data: count,
        });
      } else if (data.action === 'clear') {
        // 清除计数
        await Counter.destroy({
          truncate: true,
        });
        socket.emit('message', {
          type: 'count',
          data: 0,
        });
      }
    }

    // 广播消息到所有客户端（可选）
    if (data.broadcast) {
      socket.broadcast.emit('message', data);
    }
  });

  // 断开连接事件
  socket.on('disconnect', () => {
    console.log('用户已断开连接:', socket.id);
  });
});

const port = process.env.PORT || 3000;

async function bootstrap() {
  await initDB();
  server.listen(port, () => {
    console.log('Socket.IO服务器启动成功，端口:', port);
  });
}

bootstrap();
