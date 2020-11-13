'use strict';

const Service = require('egg').Service;
class ChatroomService extends Service {
  // todo  重新整理实现方案和流程
  // 发送获取群聊成员ws请求
  async getChatroomMemberList() {
    const { app } = this;
    const getChatroomMemberListMsg = {
      id: app.msgId,
      type: app.constance.msgTypeCode.CHATROOM_MEMBER,
      content: 'op:list member',
      wxid: 'null',
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(getChatroomMemberListMsg);
    await app.ws.send(message);
  }

  // 获取某个群聊中的所有成员的昵称(备注)
  async getMemberNickInChatroom(roomId) {
    const { ctx, app } = this;
    const getMemberNickInChatroomMsg = {
      id: app.msgId,
      type: app.constance.msgTypeCode.CHATROOM_MEMBER_NICK,
      content: roomId,
      wxid: 'ROOT',
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(getMemberNickInChatroomMsg);
    await app.ws.send(message);
  }

  // 更新群聊成员昵称
  async updateChatroomMemberNick(data) {
    const { ctx } = this;
    console.log(data);
    await ctx.model.Chatroom.findOneAndUpdate(
      {
        roomid: data[0].roomid,
      },
      {
        roomid: data[0].roomid,
        member: data,
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    ctx.logger.info('更新群聊成员昵称数据成功，共更新' + data.length + '条数据');
  }

}
module.exports = ChatroomService;
