"use strict";

var module = source("commands/help");

describe("cylon help", function() {
  it("provides a description", function() {
    expect(module.description).to.be.a('string');
  });

  it("provides an action function", function() {
    expect(module.action).to.be.a('function');
  });
});
