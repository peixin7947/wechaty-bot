'use strict';
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
  }


  async didReady() {
    // 应用已经启动完毕
    const ctx = await this.app.createAnonymousContext();
    const WebSocket = require('ws');
    const ws = new WebSocket('ws://127.0.0.1:5555');
    await ws.on('message', msg => {
      console.log('message from server:' + msg);
    });
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    this.app.server.on('timeout', socket => {
      // handle socket timeout
    });
  }
}

module.exports = AppBootHook;
