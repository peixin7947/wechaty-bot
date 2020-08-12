/* eslint valid-jsdoc: "off" */

'use strict';
module.exports = appInfo => {

  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595942528369_9051';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.messageTypeCode = {
    RECV_TXT_MSG: 1, // 接收到文字消息
    RECV_PIC_MSG: 3, // 接收到图片消息
  };

  config.wsUrl = 'http://127.0.0.1:5555';

  return {
    ...config,
    ...userConfig,
  };
};
