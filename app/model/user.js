'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    wxid: {
      type: String,
    },
    name: {
      type: String,
    },
    createTime: { type: Date, default: Date.now },
  });
  return mongoose.model('User', UserSchema, 'User');
};
