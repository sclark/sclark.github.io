var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Info = mongoose.model('Info');

router.get('/testing', function(req, res, next) {
  res.send("good");
});

router.get('/', function(req, res, next) {
  Info.find({}).exec(function(err, doc) {
    if (err) return console.error(err);
    res.render('index', { cards: doc });
  });
});

module.exports = router;
