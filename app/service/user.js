'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 保存用户信息
  async createUserInfo() {

  }

  /**
   * 获取通讯录列表
   * @return {Promise<void>} 无返回
   */
  async getUserList() {
    const { app } = this;
    const getUserListMsg = {
      id: Date.now().toString(),
      type: app.constance.messageTypeCode.USER_LIST,
      content: 'user list',
      wxid: 'null',
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(getUserListMsg);
    await app.ws.send(message);
  }

  /**
   * 保存用户通讯录列表
   * @param {Array} data 通讯录数据列表
   * @return {Promise<void>} void
   */
  async saveUserList(data) {
    const { ctx } = this;
    for (const item of data) {
      if (item.wxid.endsWith('chatroom')) {
        // 群聊类型
        item.type = 'chatroom';
      } else {
        // 微信好友/订阅号
        item.type = 'wx';
      }
      await ctx.model.User.findOneAndUpdate(
        { wxid: item.wxid },
        item,
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    }
    ctx.logger.info('更新通讯录数据成功，共更新' + data.length + '条数据');
  }
}
module.exports = UserService;
