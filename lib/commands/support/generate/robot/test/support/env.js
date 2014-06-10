'use strict';

process.env.NODE_ENV = 'test';
process.env.CYLON_TEST = true;

var path = require('path');

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.chai = chai;
global.sinon = sinon;

global.should = chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
global.AssertionError = chai.AssertionError;

global.spy = sinon.spy;
global.stub = sinon.stub;

global.source = function(module) {
  return require(path.normalize('./../../' + module));
};

var Cylon = require('cylon');
Cylon.Logger.setup(false);
