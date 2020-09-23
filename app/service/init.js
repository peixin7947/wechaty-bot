'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 与websocket连接
  async init() {
    const { ctx, app } = this;
    const messageTypeCode = app.constance.messageTypeCode;
    await app.ws.on('message', async msg => {
      const message = JSON.parse(msg);
      const type = message.type;
      if (type !== 5005) console.log(message);
      switch (type) {
        case messageTypeCode.CHATROOM_MEMBER_NICK:
          break;
        case messageTypeCode.PERSONAL_DETAIL:
          break;
        case messageTypeCode.AT_MSG:
          break;
        case messageTypeCode.DEBUG_SWITCH:
          break;
        case messageTypeCode.PERSONAL_INFO:
          break;
        case messageTypeCode.TXT_MSG:
          break;
        case messageTypeCode.PIC_MSG:
          break;
        case messageTypeCode.CHATROOM_MEMBER:
          break;
        case messageTypeCode.RECV_PIC_MSG:
          break;
        case messageTypeCode.RECV_TXT_MSG:
          break;
        case messageTypeCode.USER_LIST: {
          // 获取用户通讯录列表成功
          await ctx.service.user.saveUserList(message.content);
          break;
        }

        case messageTypeCode.HEART_BEAT:
          break;
        case messageTypeCode.GET_USER_LIST_FAIL:
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