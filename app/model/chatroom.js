'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    _id: false,
    nickname: { type: String, default: '' },
    wxid: { type: String, default: '', index: true },
  });

  // 群聊表
  const ChatroomSchema = new Schema({
    roomid: { type: String, require: true, index: true },
    name: { type: String, default: '' },
    member: { type: [ UserSchema ], default: [] },
    updateTime: { type: Date, default: Date.now },
  });
  return mongoose.model('Chatroom', ChatroomSchema, 'Chatroom');
};
