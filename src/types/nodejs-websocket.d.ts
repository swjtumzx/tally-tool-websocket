declare module 'nodejs-websocket' {
  import { EventEmitter } from 'events';
  import * as WebSocket from 'websocket';

  interface Connection extends EventEmitter {
    socket: any;
    readyState: number;
    sendText(str: string): void;
    sendBinary(data: Buffer): void;
    close(code?: number, reason?: string): void;
    on(event: 'text', listener: (str: string) => void): this;
    on(event: 'binary', listener: (data: Buffer) => void): this;
    on(event: 'close', listener: (code: number, reason: string) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: string, listener: Function): this;
  }

  interface Server extends EventEmitter {
    listen(port: number, hostname?: string): Server;
    close(): void;
    socket: any;
    connections: Connection[];
  }

  interface ServerOptions {
    secure?: boolean;
    key?: string;
    cert?: string;
    server?: any;
  }

  function createServer(
    options: ServerOptions | ((conn: Connection) => void),
    callback?: (conn: Connection) => void
  ): Server;

  export { createServer, Connection, Server, ServerOptions };
}
