'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 保存用户信息
  async createUserInfo() {

  }

  // 获取通讯录列表
  async getUserList() {
    const { ctx, app } = this;
    const getUserListMsg = {
      id: Date.now().toString(),
      type: 5000,
      content: 'user list',
      wxid: 'null',
    };
    await app.ws.send(JSON.stringify(getUserListMsg));
  }
}
module.exports = UserService;
