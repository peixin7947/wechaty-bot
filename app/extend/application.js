'use strict';

const constance = require('../constance');
const WebSocket = require('ws');
const ws = new WebSocket('ws://127.0.0.1:5555', '', {});

module.exports = {
  get constance() {
    return constance;
  },

  get ws() {
    return ws;
  },

  // 发送消息给ws服务器
  async sendMsgToWS(data) {
    await ws.send(data);
  },

  get msgId() {
    return new Date().toString();
  },

};
