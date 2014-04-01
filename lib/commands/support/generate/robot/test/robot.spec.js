"use strict";

require('./support')

var clock = sinon.useFakeTimers();

var Cylon = require('cylon')
require('./../robot');
var robot = Cylon.findRobot("New Robot");

describe("robot", function() {
  beforeEach(function() {
    stub(console, 'log');
  });

  afterEach(function() {
    console.log.restore();
  });

  it("says 'hello world' if we wait a couple seconds", function() {
    expect(console.log).to.not.be.called;
    clock.tick(2000);
    expect(console.log).to.be.calledWith("Hello World!");
  });
});
