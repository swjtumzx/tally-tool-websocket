import * as ws from 'nodejs-websocket';

// 设置端口
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 80;

// 创建 WebSocket 服务器
const wsServer = ws
  .createServer((connection: ws.Connection) => {
    console.log('建立新的链接');

    // 接收消息
    connection.on('text', function (data: string) {
      console.log('接收到的客户端消息:' + data);
      connection.sendText('收到消息:' + data);
    });

    // 断开连接
    connection.on('close', function (code: number, reason: string) {
      console.log('连接关闭, 代码:', code, '原因:', reason);
    });

    // 错误处理
    connection.on('error', (error: Error) => {
      console.log('服务异常关闭:', error);
      // 防止未捕获的错误导致服务器崩溃
    });
  })
  .listen(PORT);

console.log(`WebSocket 服务器启动成功，端口: ${PORT}`);

// 添加全局错误处理，防止程序崩溃
process.on('uncaughtException', (err: Error) => {
  console.error('未捕获的异常:', err);
  // 保持服务运行不退出
});
