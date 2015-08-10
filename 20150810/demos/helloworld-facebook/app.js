'use strict';

var express = require('express');
var util = require('util');

var app = express();

require('./facebook')(app); // init facebook authentication

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function log(req, res, next) {
  console.log('%s - %s %s %s', Date(), req.method, req.url, req.path);
  next();
}

app.get('/',
  ensureAuthenticated,
  log,
  function(req,res) {
      res.status(200).end(util.format('Hello %s!', req.user.displayName));
  }
);

app.listen(8888, function() {
  console.log('Web Server is running!');
});
