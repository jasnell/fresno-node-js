var express = require('express');
var app = express();

app.get('/', function(req,res) {
  res.status(200).end('Hello World!');
});

app.listen(8888, function() {
  console.log('Web Server is running!');
});
