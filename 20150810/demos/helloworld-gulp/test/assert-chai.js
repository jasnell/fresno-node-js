var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;
var http = require('http');
var server = require('../app');

describe('Doing a simple assert example', function() {
	it('Should Equal Simple Example', function(done) {
		var person = { foo: 'bar' };
	    assert.property(person, 'foo');
		assert.equal(person.foo, 'bar');
		done();
	});
});

describe('Doing a simple should example', function() {
	it('Should Equal Simple Example', function(done) {
	    ({ foo: 'bar' }).should.have.property('foo').equal('bar');
		done();
	});
});

describe('Making a simple request', function() {
  	it('Should return a 200 OK with "Hello World Robert Schultz!"', function(done) {
	    http.get('http://localhost:8888/?firstName=Robert&lastName=Schultz', function(res) {
		  res.statusCode.should.equal(200);
	      var body = '';
	      res.on('data', function(chunk) {
	        body += chunk;
	      });
	      res.on('end', function() {
			expect(body.trim()).equal('Hello World Robert Schultz!');
			expect(body.trim()).to.be.a('string');
	        done();
	      });
	    });
  	});
	it('Should return a 200 OK with "Hello World undefined undefined!"', function(done) {
	    http.get('http://localhost:8888/', function(res) {
		  res.statusCode.should.equal(200);
	      var body = '';
	      res.on('data', function(chunk) {
	        body += chunk;
	      });
	      res.on('end', function() {
			expect(body.trim()).equal('Hello World undefined undefined!');
			expect(body.trim()).to.be.a('string');
	        done();
	      });
	    });
  	});
});

describe('formatName method', function() {
	it('Should concatenate', function(done) {
		
	    //var nameFormatted = server.formatName('Robert', 'Schultz');
		//nameFormatted.should.equal('Robert Schultz');
		done();
	});
});