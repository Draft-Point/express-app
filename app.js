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
app.use('/default', express.static(path.join(__dirname, 'public')))

// Code for Draft Point

app.get('/', function (req, res) {

  const okta = req.headers['x-mlbam-okta'];
  const vid = req.headers['x-mlbam-vid'];
  const cis = req.headers['x-mlbam-cis'];
  
  if (okta) {

    const firebaseUrl = 'https://draft-point.firebaseapp.com/?x-mlbam-okta=' + okta + '&x-mlbam-vid=' + vid + '&x-mlbam-cis=' + cis;

    res.redirect(firebaseUrl);

  }

  else res.redirect('/default');

})

module.exports = app;
