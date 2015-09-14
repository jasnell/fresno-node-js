/*
var should = require('should');
var http = require('http');
var server = require('../app');

describe('Doing a simple example', function() {
	it('Should Equal Simple Example', function(done) {
	    ({ foo: 'bar' }).should.have.ownProperty('foo').equal('bar');
		done();
	});
})

describe('Making a simple request...', function() {
  	it('Should return a 200 OK with "Hello World"', function(done) {
	    http.get('http://localhost:8888/', function(res) {
		  res.statusCode.should.be.exactly(200);
	      var body = '';
	      res.on('data', function(chunk) {
	        body += chunk;
	      });
	      res.on('end', function() {
			body.trim().should.be.exactly('Hello World!');
	        done();
	      });
	    });
  	});
});
*/