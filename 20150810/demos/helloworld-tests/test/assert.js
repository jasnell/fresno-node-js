var assert = require('assert');
var http = require('http');
var server = require('../app');

describe('Making a simple request...', function() {
  it('Should return a 200 OK with "Hello World"', function(done) {
    http.get('http://localhost:8888/', function(res) {
      assert.equal(res.statusCode, 200);
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        assert.equal(body.trim(), 'Hello World!');
        done();
      });
    });
  });
});
