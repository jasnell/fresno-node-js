var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var util = require('util');

// set up our authentication strategy...
passport.use(
  new BasicStrategy({}, function(username, password, done) {
    process.nextTick(function() {
      // validate the user somehow
      var user = {
        name: username
      };
      return done(null, user);
    });
  })
);

var app = express();

// tell express to use passport authentication
app.use(passport.initialize());

function log(req, res, next) {
  console.log('%s - %s %s %s', Date(), req.method, req.url, req.path);
  next();
}

app.get('/', 
  // add the passport middleware to our route
  passport.authenticate('basic', {session: false}),
  log, 
  function(req,res) {
    res.status(200).end(util.format('Hello %s!', req.user.name));
  }
);

app.listen(8888, function() {
  console.log('Web Server is running!');
});
