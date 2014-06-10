"use strict";

var Cylon = require('cylon');

// reset globals so Cylon will work properly.
// Unfortunately, this means you can't use Mocha's #after in test suites.
Cylon.Utils.bootstrap();

var clock = sinon.useFakeTimers();

source('robot');

var robot = Cylon.robots['New Robot'];

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
