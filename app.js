//File: app.js
var http = require('http');
//var config = require('./config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// From twilio server-notification-node example
var session = require('express-session');
var flash = require('connect-flash');
var csurf = require('csurf');
//var twilioClient = require('./twilioClient');
//var twilioNotifications = require('./twilioNotifications');

// Database added tk
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2'); //is this pointing to the right place?

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//added tk
// Make our db accessible to our router
app.use(function(req, res, next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); //tk: for some reason, twilio doesn't have "next(err)"
});

// Mount middleware to notify Twilio of errors
//app.use(twilioNotifications.notifyOnError);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    res.render('error', {
//        message: '***=>error',
    message: err.message,
      error: err
  });
});


module.exports = app;
