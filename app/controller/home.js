'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    await ctx.service.user.getUserList();
    ctx.body = 'success';
  }
}

module.exports = HomeController;
