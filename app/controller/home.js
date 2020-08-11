'use strict';

const Controller = require('egg').Controller;

const WebSocket = require('ws');
const ws = new WebSocket('ws://127.0.0.1:5555');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ws.on('message', msg => {
      console.log('message from server:' + msg);
    });

  }
}

module.exports = HomeController;
