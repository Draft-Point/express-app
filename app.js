var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Code for Draft Point

app.get('/', function (req, res) {

  const okta = req.headers['x-mlbam-okta']
  const vid = req.headers['x-mlbam-vid']

  if (okta && vid) {

    const firebaseUrl = 'https://draft-point.firebaseapp.com/?x-mlbam-okta=' + okta + '&x-mlbam-vid=' + vid

    res.redirect(firebaseUrl)

  }

  else res.status(400).send("Auth credentials not detected")

})

module.exports = app;
