'use strict';

const Service = require('egg').Service;
class MessageService extends Service {

  // 发送文本消息
  async sendTxtMsg(wxId, content) {
    const { app } = this;
    const sendTxtMsg = {
      content, // 文本消息内容
      wxid: wxId, // wxid
      id: app.msgId,
      type: app.constance.msgTypeCode.TXT_MSG,
    };
    // 发送消息给ws服务端
    const message = JSON.stringify(sendTxtMsg);
    await app.sendMsgToWS(message);
  }
}
module.exports = MessageService;
