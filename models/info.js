var mongoose = require('mongoose');

var Info = new mongoose.Schema({
  href: { type: String, default: "" },
  category: { type: String, default: "" },
  title: { type: String, default: "" },
  position: { type: String, default: "" },
  date: { type: String, default: "" },
  img: { type: String, default: "" },
  info: { type: String, default: "" }
});

module.exports = Info;
