// user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  refreshToken: String,
  refreshTokenExp: Date,
});

module.exports = mongoose.model('User', userSchema);