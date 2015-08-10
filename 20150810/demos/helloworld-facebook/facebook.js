'use strict';
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require('method-override');
var uuid = require('node-uuid');

// you will need to set the environment variables equal to
// your app id and secret as provided by facebook
var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// set up our authentication strategy...
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:8888/auth/facebook/callback',
      profileFields: ['id', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        done(null,profile);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


function init(app) {
  // configure our express app with the necessary middleware
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    secret:uuid.v4() + '-fresno',
    resave: false,
    saveUninitialized: true
  }));

  // tell express to use passport authentication
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
          passport.authenticate('facebook',{failureRedirect: '/login'}),
          function(req,res) { res.redirect('/'); });
  app.get('/login', function(req,res) {
    res.status(200).end('<a href="/auth/facebook">Login with Facebook</a>');
  });
}

module.exports = init;
