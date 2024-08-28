// user model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  refreshToken: String,
  refreshTokenExp: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;