'use strict';

const Service = require('egg').Service;
class ChatroomService extends Service {
  /**
   * 发送获取所有群聊及群聊成员websocket请求
   * 这是第一步，先获取微信群的chatroomId和群成员的wsid
   * @return {Promise<void>} 无
   */
  async getChatroomMemberList() {
    const { ctx, app } = this;
    const getChatroomMemberListMsg = {
      id: app.msgId,
      type: app.constance.msgTypeCode.CHATROOM_MEMBER,
      content: 'op:list member',
      wxid: 'null',
    };
    // 发送消息给ws服务端
    ctx.logger.info('发送所有群聊及群聊成员websocket请求');
    await app.sendMsgToWS(getChatroomMemberListMsg);
  }

  /**
   * 处理ws返回的群信息和群成员信息
   * 第二步，处理ws返回的数据
   * @param {Array} data - 群聊信息
   * @return {Promise<void>} 无
   */
  async updateChatroomMemberList(data) {
    const { ctx, app } = this;
    for (const chatroom of data) {
      await ctx.model.Chatroom.findOneAndUpdate(
        { roomid: chatroom.roomid },
        {
          roomid: chatroom.roomid,
          // 处理member的wxid保存
          member: chatroom.member.map(item => { return { wxid: item }; }),
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }
  }

  /**
   * 获取某个群聊中的所有成员的昵称(备注)
   * 第三步，根据指令去获取群聊用户昵称
   * @param {String} roomId - 群聊id
   * @return {Promise<void>} 无
   */
  async getMemberNickInChatroom(roomId) {
    const { ctx, app } = this;
    const getMemberNickInChatroomMsg = {
      id: app.msgId,
      type: app.constance.msgTypeCode.CHATROOM_MEMBER_NICK,
      content: roomId,
      wxid: 'ROOT',
    };
    // 发送消息给ws服务端
    await app.sendMsgToWS(getMemberNickInChatroomMsg);
  }

  /**
   * 更新群聊成员昵称
   * @param {Array} data - 群聊的用户信息
   * @return {Promise<void>} 无
   */
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
