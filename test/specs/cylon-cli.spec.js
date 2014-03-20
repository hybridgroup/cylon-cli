"use strict";

var cli = source('cylon-cli');

describe("Cylon-CLI", function() {
  it("returns a function", function() {
    expect(cli).to.be.a('function');
  });
});
