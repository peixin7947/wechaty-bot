'use strict';

const Controller = require('egg').Controller;

const {
  Wechaty,
} = require('wechaty');

const bot = new Wechaty({
  name: 'myWechatyBot',
});
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    bot.on('login', this.onLogin);
    bot.start()
      .catch(async e => {
        console.error('Bot start() fail:', e);
        await bot.stop();
        // process.exit(-1);
      });
    ctx.body = 'hi, egg';
  }
  onLogin(user) {
    console.log(`${user.name()} login`);
    bot.say('Wechaty login').catch(console.error);
  }
}

module.exports = HomeController;
