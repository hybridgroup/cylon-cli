"use strict";

var module = source("<%= adaptorName %>");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("Cylon.<%= adaptorClassName %>", function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql([]);
    });
  });

  describe("#drivers", function() {
    it('is an array of supplied drivers', function() {
      expect(module.drivers).to.be.eql([]);
    });
  });

  describe("#dependencies", function() {
    it('is an array of supplied dependencies', function() {
      expect(module.dependencies).to.be.eql([]);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      expect(module.driver()).to.be.instanceOf(Driver);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(module.adaptor()).to.be.instanceOf(Adaptor);
    });
  });
});
