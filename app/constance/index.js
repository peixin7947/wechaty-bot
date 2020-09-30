'use strict';

module.exports = {
  messageTypeCode: {
    HEART_BEAT: 5005,
    RECV_TXT_MSG: 1, // 接收到文字消息
    RECV_PIC_MSG: 3, // 接收到图片消息
    USER_LIST: 5000, // 获取用户通讯录
    GET_USER_LIST_SUCCESS: 5001,
    GET_USER_LIST_FAIL: 5002,
    TXT_MSG: 555,
    PIC_MSG: 500,
    AT_MSG: 550,
    CHATROOM_MEMBER: 5010, // 获取群聊成员列表
    CHATROOM_MEMBER_NICK: 5020, // 获取
    PERSONAL_INFO: 6500,
    DEBUG_SWITCH: 6000,
    PERSONAL_DETAIL: 6550,
  },
};
