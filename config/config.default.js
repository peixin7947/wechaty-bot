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

  return {
    ...config,
    ...userConfig,
  };
};
