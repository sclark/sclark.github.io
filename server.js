#!/usr/bin/env node
var app = require('./app');
var debug = require('debug')('sclarkio:server');
var http = require('http');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

var server = http.createServer(app);
server.listen(app.get('port') ,app.get('ip'));

server.on('error', function(error) {
  if (error.syscall !== 'listen') throw error;

  var port = app.get('port');
  var bind = typeof port === 'string' ? 'Pipe '+port : 'Port '+port;
  if (error.code === "EACCES") console.error(bind + ' requires elevated privileges');
  else if (error.code === "EADDRINUSE") console.error(bind + ' is already in use');
  else throw error;
  process.exit(1);
});

server.on('listening', function() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe '+addr : 'port '+addr.port;
  debug('Listening on ' + bind);
});
