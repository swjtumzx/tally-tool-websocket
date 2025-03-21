# Socket.IO 简单消息服务

这是一个基于 Socket.IO 的简单消息服务，支持消息的发送和接收功能。

## 功能特点

- 基于 Socket.IO 的实时双向通信
- 支持基本的消息发送和接收
- 包含计数功能（获取计数、增加计数、清空计数）
- 提供简单的 Web 客户端界面

## 安装和运行

1. 安装依赖

```bash
npm install
```

2. 启动服务

```bash
npm start
```

3. 访问客户端
   浏览器打开 http://localhost:80 即可访问 Web 客户端界面

## 客户端使用

Web 客户端提供以下功能：

- 显示连接状态
- 发送文本消息
- 获取、增加和清空计数

## API 说明

### 客户端发送到服务器的消息格式

1. 文本消息

```javascript
{
  message: "消息内容",
  timestamp: "2023-03-21T12:34:56.789Z"
}
```

2. 计数操作

```javascript
{
  type: "count",
  action: "get" | "inc" | "clear"
}
```

### 服务器发送到客户端的消息格式

1. 欢迎消息

```javascript
{
  type: "welcome",
  message: "欢迎连接到Socket.IO服务器"
}
```

2. 计数结果

```javascript
{
  type: "count",
  data: 5 // 当前计数值
}
```

## 开发和扩展

可以修改 `index.js` 文件添加更多的消息处理逻辑。
