'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    wxid: { type: String, require: true, index: true },
    name: { type: String },
    type: { type: String },
    updateTime: { type: Date, default: Date.now },
  });
  return mongoose.model('User', UserSchema, 'User');
};
