var mongoose = require('mongoose');
var crypto = require('crypto');

var User = new mongoose.Schema({
  fullname: String,
  username: { type: String, unique: true },
  password: String,
  salt: String
});

module.exports = User;
