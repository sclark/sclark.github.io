var express = require('express');
var mongoose = require('mongoose');
var sha256 = require('crypto-js/sha256');
var crypto = require('crypto');

var router = express.Router();
var Info = mongoose.model('Info');
var User = mongoose.model('User');

router.get('/logout', function(req, res, next) {
  if (req.session.username) req.session.username = "";
  res.redirect('login');
});

router.get('/login', function(req, res, next) {
  if (req.session.username) res.redirect('/admin');
  else res.send('render login');
});

router.post('/login', function(req, res, next) {
  if (req.session.username) res.redirect('/admin');
  else {
    // default user if user db is empty
    if (req.body.username === "snnadmin" && req.body.password === "snnadmin") {
      User.find({}).exec(function(err, doc) {
        if (err) return res.send('error could not verify admin');
        if (doc.length === 0) {
          req.session.username = user.username;
          res.send("render welcome " + user.fullname);
        }
        else res.send("error admin is disabled");
      });
    }
    // real users
    else {
      User.findOne({username: req.body.username}).exec(function(err, user) {
        if (err) return res.send("error user not found");
        password = sha256(user.salt + req.body.password).toString();
        User.findOne({username: req.body.username, password: password}).exec(function(err, user) {
          if (err) return res.send("error wrong password");
          req.session.username = user.username;
          res.send("render welcome " + user.fullname);
        });
      });
    }
  }
});

router.get('/user', function(req, res, next) {
  if (req.session.username) res.redirect('render new user');
  else res.send(404);
});

router.post('/user', function(req, res, next) {
  if (req.session.username) {
    var salt = crypto.randomBytes(512).toString('base64');
    var user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      password: sha256(salt + req.body.password).toString(),
      salt: salt
    });

    user.save(function(err, user) {
      if (err) return console.error(err);
      res.send("render created new user " + user.fullname)
    });
  }
  else res.send(404);
});

module.exports = router;
