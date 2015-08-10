var express = require('express');
var app = express();
var index = require('./routes/index');

app.get('/', index);

app.listen(8888, function() {
  console.log('Web Server is running!');
});

