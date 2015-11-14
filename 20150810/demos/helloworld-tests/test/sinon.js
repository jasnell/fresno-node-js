var index = require('../routes/index');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('Stub request dependency', function() {
   it("Calls status method once", function () {
        var req, res;
        
        req = res = {};
        var spyStatus = res.status = sinon.spy();
        var spyEnd = res.end = sinon.spy();
        
        index(req, res);
        
        expect(spyStatus.calledOnce).to.equal(true);
    });  
    
     it("Calls end method once", function () {
        var req, res;
        
        req = res = {};
        var spyStatus = res.status = sinon.spy();
        var spyEnd = res.end = sinon.spy();
        
        index(req, res);
        
        expect(spyEnd.calledOnce).to.equal(true);
    });     
});
