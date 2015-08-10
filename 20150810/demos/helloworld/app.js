var express = require('express');
var app = express();

function log(req, res, next) {
  console.log('%s - %s %s %s', Date(), req.method, req.url, req.path);
  next();
}

app.get('/', log, function(req,res) {
  res.status(200).end('Hello World!');
});

app.listen(8888, function() {
  console.log('Web Server is running!');
});
