'use strict';

const Service = require('egg').Service;
const rp = require('request-promise');
class ChatroomService extends Service {

  // 获取群聊成员
  async getChatroomMemberList() {
    const { app } = this;
    const getChatroomMemberListMsg = {
      id: Date.now().toString(),
      type: app.constance.messageTypeCode.CHATROOM_MEMBER,
      content: 'op:list member',
      wxid: 'null',
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(getChatroomMemberListMsg);
    await app.ws.send(message);
  }

  // 更新群聊成员列表
  async updateChatroomMemberList(data) {
    const { ctx } = this;
    for (const item of data) {

      await ctx.model.Chatroom.findOneAndUpdate(
        { roomid: item.roomid },
        item,
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    }
    ctx.logger.info('更新通讯录数据成功，共更新' + data.length + '条数据');
  }

  // 获取群聊中的某个成员的昵称
  async getMemberNickInChatroom() {
    const { ctx, app } = this;
    const getMemberNickInChatroomMsg = {
      id: app.msgId,
      // type: app.constance.messageTypeCode.CHATROOM_MEMBER_NICK,
      // content: '2109694158@chatroom',
      // roomid: '2109694158@chatroom',
      // wxid: 'jingjie841256',
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(getMemberNickInChatroomMsg);
    await app.ws.send(message);
  }

}
module.exports = ChatroomService;
