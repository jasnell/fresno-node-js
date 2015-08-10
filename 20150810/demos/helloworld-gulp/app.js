var express = require('express');
var formatter = require('./formatter');
var app = express();

app.get('/', function(req,res) {
  res.status(200).end('Hello World ' + formatter(req.query.firstName, req.query.lastName) + '!');
});

/*
app.get('/', function(req,res) {
  res.status(200).end('Hello World ' + formatter(req.query.firstName, req.query.lastName) + '!');
});
*/

app.listen(8888, function() {
  console.log('Web Server is running!');
});
