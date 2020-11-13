'use strict';

const Service = require('egg').Service;

class InitService extends Service {

  // 与websocket连接
  async init() {
    const { ctx, app } = this;
    const msgTypeCode = app.constance.msgTypeCode;
    await app.ws.on('message', async msg => {
      const message = JSON.parse(msg);
      const type = message.type;
      // if (type !== 5005) console.log(message);
      switch (type) {
        case msgTypeCode.CHATROOM_MEMBER_NICK: {
          // 获取群聊成员昵称
          await ctx.service.chatroom.updateChatroomMemberNick(message.content);
          break;
        }
        case msgTypeCode.PERSONAL_DETAIL:
          break;
        case msgTypeCode.AT_MSG:
          break;
        case msgTypeCode.DEBUG_SWITCH:
          break;
        case msgTypeCode.PERSONAL_INFO:
          break;
        // case msgTypeCode.TXT_MSG:
          // 发送文本消息
          // break;
        case msgTypeCode.PIC_MSG:
          break;
        case msgTypeCode.CHATROOM_MEMBER:
          // 获取群聊成员列表
          await ctx.service.chatroom.updateChatroomMemberList(message.content);
          break;
        case msgTypeCode.RECV_PIC_MSG:
          break;
        case msgTypeCode.RECV_TXT_MSG:
          console.log('收到消息：' + message);
          break;
        case msgTypeCode.USER_LIST: {
          // 获取用户通讯录列表成功
          await ctx.service.user.saveUserList(message.content);
          break;
        }
        case msgTypeCode.HEART_BEAT:
          break;
        case msgTypeCode.GET_USER_LIST_FAIL:
          ctx.logger.error('更新用户通讯录失败');
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
module.exports = InitService;
