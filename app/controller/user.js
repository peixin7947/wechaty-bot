'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 更新微信通讯录接口
  async getUserList() {
    const { ctx } = this;
    await ctx.service.user.getUserList();
    ctx.body = 'success';
  }
}

module.exports = UserController;
