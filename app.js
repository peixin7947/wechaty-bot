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
    const url = this.app.config.wsUrl;
    const initData = await ctx.curl(`${url}/api/getcontactlist`);
    console.log(initData.data.toString());
    const config = this.app.config.messageTypeCode;
    await this.app.ws.on('message', msg => {
      const message = JSON.parse(msg);
      const type = message.type;
      switch (type) {
        case config.CHATROOM_MEMBER_NICK:
          console.log(message);
          break;
        case config.PERSONAL_DETAIL:
          console.log(message);
          break;
        case config.AT_MSG:
          console.log(message);
          break;
        case config.DEBUG_SWITCH:
          console.log(message);
          break;
        case config.PERSONAL_INFO:
          console.log(message);
          break;
        case config.TXT_MSG:
          console.log(message);
          break;
        case config.PIC_MSG:
          console.log(message);
          break;
        case config.CHATROOM_MEMBER:
          console.log(message);
          break;
        case config.RECV_PIC_MSG:
          console.log(message);
          break;
        case config.RECV_TXT_MSG:
          console.log(message);
          break;
        case config.HEART_BEAT:
          console.log(message);
          break;
        case config.GET_USER_LIST_SUCCSESS:
          console.log(message);
          break;
        case config.GET_USER_LIST_FAIL:
          console.log(message);
          break;
          // case SEND_TXT_MSG_SUCCSESS:
          // handle_recv_msg(j);
          // break;
          // case SEND_TXT_MSG_FAIL:
          // handle_recv_msg(j);
          // break;
        default:
          break;
      }
    });
  }

}

module.exports = AppBootHook;
