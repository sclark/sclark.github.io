var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.username) res.send('render dashboard');
  else res.redirect('/admin/users/login');
});

module.exports = router;
