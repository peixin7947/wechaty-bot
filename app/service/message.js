'use strict';

const Service = require('egg').Service;
class MessageService extends Service {
  /**
   * 发送文本消息
   * @param {String} wxId - wxid
   * @param {String} content - 发送的文本内容
   * @return {Promise<void>} 无
   */
  async sendTxtMsg(wxId, content) {
    const { app } = this;
    const sendTxtMsg = {
      content, // 文本消息内容
      wxid: wxId, // wxid
      id: app.msgId,
      type: app.constance.msgTypeCode.TXT_MSG,
    };
    // 发送消息给ws服务端
    await app.sendMsgToWS(sendTxtMsg);
  }

  // 发送群@消息
  async sendAtMsg(wxId, chatroomId, content) {
    const { app } = this;
    const sendAtMsg = {
      content, // 文本消息内容
      wxid: wxId, // wxid
      id: app.msgId,
      type: app.constance.msgTypeCode.AT_MSG,
      roomid: chatroomId, // not null
      nickname: '[微笑]Python',
    };
    // 发送消息给ws服务端
    await app.sendMsgToWS(sendAtMsg);
  }
}
module.exports = MessageService;
