'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 与websocket连接
  async init() {
    const { app } = this;
    const config = app.constance.messageTypeCode;
    await app.ws.on('message', msg => {
      const message = JSON.parse(msg);
      const type = message.type;
      if (type !== 5005) console.log(message);
      switch (type) {
        case config.CHATROOM_MEMBER_NICK:
          break;
        case config.PERSONAL_DETAIL:
          break;
        case config.AT_MSG:
          break;
        case config.DEBUG_SWITCH:
          break;
        case config.PERSONAL_INFO:
          break;
        case config.TXT_MSG:
          break;
        case config.PIC_MSG:
          break;
        case config.CHATROOM_MEMBER:
          break;
        case config.RECV_PIC_MSG:
          break;
        case config.RECV_TXT_MSG:
          break;
        case config.HEART_BEAT:
          break;
        case config.GET_USER_LIST_SUCCSESS:
          break;
        case config.GET_USER_LIST_FAIL:
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
module.exports = UserService;
