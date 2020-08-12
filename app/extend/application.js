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

};
