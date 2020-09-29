'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const routerPlus = router.namespace('/api');
  // 测试使用
  router.get('/test', controller.home.test);

  // 更新通讯录列表
  routerPlus.get('/getUserList', controller.user.getUserList);
  // 更新群聊成员列表
  routerPlus.get('/getChatroomMemberList', controller.chatroom.getChatroomMemberList);

};
