'use strict';

// allow production modules to expose internal
// functions and properties for testing
process.env.NODE_ENV = 'test';
process.env.CYLON_TEST = true;

var path = require('path');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var Cylon = require('cylon');
Cylon.Logger.setup(false);

global.chai = chai;
global.should = chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
global.AssertionError = chai.AssertionError;
global.sinon = sinon;
global.spy = sinon.spy;
global.stub = sinon.stub;

// reset globals so Cylon will work properly.
// Unfortunately, this means you can't use Mocha's #after in test suites.
global.Utils.bootstrap();

// can be used when you expect a function to throw an error
global.err = function (fn, msg) {
  try {
    fn();
    throw new chai.AssertionError({ message: 'Expected an error' });
  } catch (err) {
    if ('string' === typeof msg) {
      chai.expect(err.message).to.equal(msg);
    } else {
      chai.expect(err.message).to.match(msg);
    }
  }
};

chai.use(sinonChai);
