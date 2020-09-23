'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 保存用户信息
  async createUserInfo() {

  }

  /**
   * 获取通讯录列表
   * @return {Promise<void>} 无
   */
  async getUserList() {
    const { app } = this;
    const getUserListMsg = {
      id: Date.now().toString(),
      type: 5000,
      content: 'user list',
      wxid: 'null',
    };
    const message = JSON.stringify(getUserListMsg);
    await app.ws.send(message);
  }

  /**
   * 保存用户通讯录列表
   */
  async saveUserList(data) {
    const { ctx } = this;
    for (const item of data) {
      await ctx.model.User.findOneAndUpdate(
        { wxid: item.wxid },
        item,
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    }
  }
}
module.exports = UserService;
