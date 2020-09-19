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
    const { app } = this;
    const ctx = await app.createAnonymousContext();
    await ctx.service.init.init();
  }

}

module.exports = AppBootHook;
