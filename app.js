var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

mongoose.model('User', require('./models/user'), 'user');
mongoose.model('Info', require('./models/info'), 'info');
mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/sclarkio');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET || 'secret', cookie: { secure: false } })); //TODO: secure cookie
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/admin/users', require('./routes/users'));

// error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
