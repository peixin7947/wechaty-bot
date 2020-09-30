'use strict';

const Service = require('egg').Service;
const rp = require('request-promise');
class ChatroomService extends Service {

  // 发送获取群聊成员ws请求
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
    for (const chatroom of data) {
      // chatroom.member = chatroom.member.map(item => { return { wxid: item }; });
      // await ctx.model.Chatroom.findOneAndUpdate(
      //   { roomid: chatroom.roomid },
      //   chatroom,
      //   {
      //     upsert: true,
      //     setDefaultsOnInsert: true,
      //   }
      // );
      await this.getMemberNickInChatroom(chatroom.roomid);
      await new Promise(resolve => { setTimeout(resolve, 100000); });
    }
    ctx.logger.info('更新通讯录数据成功，共更新' + data.length + '条数据');
  }

  // 获取群聊中的所有成员的昵称(备注)
  async getMemberNickInChatroom(roomId) {
    const { ctx, app } = this;
    const getMemberNickInChatroomMsg = {
      id: app.msgId,
      type: app.constance.messageTypeCode.CHATROOM_MEMBER_NICK,
      content: roomId,
      wxid: 'ROOT',
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(getMemberNickInChatroomMsg);
    await app.ws.send(message);
    // const res = await ctx.curl(app.config.httpUrl + '/api/getmembernick', {
    //   method: 'GET',
    //   data: {
    //     id: app.msgId,
    //     type: app.constance.messageTypeCode.CHATROOM_MEMBER_NICK,
    //     roomid: roomId,
    //   },
    // });
    // console.log(res.data);
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
