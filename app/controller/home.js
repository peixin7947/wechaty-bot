'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 测试调用接口
  async test() {
    const { ctx } = this;
    await ctx.service.chatroom.getChatroomMemberList();
    // await ctx.service.chatroom.getMemberNickInChatroom();
    ctx.body = 'success';
  }
}

module.exports = HomeController;
