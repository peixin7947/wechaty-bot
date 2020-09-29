'use strict';

const Controller = require('egg').Controller;

class ChatroomController extends Controller {
  // 更新群聊成员列表
  async getChatroomMemberList() {
    const { ctx } = this;
    await ctx.service.chatroom.getChatroomMemberList();
    ctx.body = 'success';
  }
}

module.exports = ChatroomController;
