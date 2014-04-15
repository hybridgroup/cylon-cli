"use strict";

var module = source("commands/bluetooth"),
    process = source('process'),
    os = require('os');

describe("cylon bluetooth", function() {
  it("provides example usage", function() {
    expect(module.usage).to.be.a('string');
  });

  it("provides a description of the command", function() {
    expect(module.description).to.be.a('string');
  });

  describe("#action", function() {
    beforeEach(function() {
      stub(console, 'log');
      stub(process, 'spawn');
    });

    afterEach(function() {
      console.log.restore();
      process.spawn.restore();
    });

    context("when no subcommand supplied", function() {
      it("logs that a subcommand wasn't supplied and returns", function() {
        module.action([]);
        expect(console.log).to.be.calledWith("Invalid/no subcommand supplied.\n");
        expect(console.log).to.be.calledWith("Usage:");
      });
    });

    context("when invalid subcommand supplied", function() {
      it("logs that a invalid subcommand was supplied and returns", function() {
        module.action(['laser']);
        expect(console.log).to.be.calledWith("Invalid/no subcommand supplied.\n");
        expect(console.log).to.be.calledWith("Usage:");
      });
    });

    describe("when platform is linux", function() {
      before(function() {
        stub(os, 'platform').returns("linux");
      });

      after(function() {
        os.platform.restore();
      });

      context("command: 'pair'", function() {
        it("passes args to bluez-simple-agent", function() {
          module.action(['pair', 'arg1', 'arg2']);
          expect(process.spawn).to.be.calledWith("bluez-simple-agent", ["arg2", "arg1"]);
        });
      });

      context("command: 'unpair'", function() {
        it("unpairs with bluez-simple-agent", function() {
          module.action(['unpair', 'arg1', 'arg2']);
          expect(process.spawn).to.be.calledWith("bluez-simple-agent", ["arg2", "arg1", "remove"]);
        });
      });

      context("command: 'connect'", function() {
        it("uses rfcomm to connect the device", function() {
          module.action(['connect', 'arg1', 'arg2']);
          var args = ['rfcomm', 'connect', 'arg2', 'arg1', '1'];
          expect(process.spawn).to.be.calledWith("sudo", args);
        });
      });
    });

    describe("when platform is os x", function() {
      var message = "OS X manages Bluetooth pairing/unpairing/binding itself.";
      before(function() {
        stub(os, 'platform').returns("darwin");
      });

      after(function() {
        os.platform.restore();
      });

      context("command: 'pair'", function() {
        it("prints that OS X will handle it", function() {
          module.action(['pair']);
          expect(console.log).to.be.calledWith(message);
        });
      });

      context("command: 'unpair'", function() {
        it("prints that OS X will handle it", function() {
          module.action(['unpair']);
          expect(console.log).to.be.calledWith(message);
        });
      });

      context("command: 'connect'", function() {
        it("prints that OS X will handle it", function() {
          module.action(['connect']);
          expect(console.log).to.be.calledWith(message);
        });
      });
    });

    describe("when platform is windows", function() {
      before(function() {
        stub(os, 'platform').returns('windows');
      });

      after(function() {
        os.platform.restore();
      });

      it('prints that the OS is not yet supported', function() {
        module.action(['pair']);
        expect(console.log).to.be.calledWith("OS not yet supported.");
      });
    });
  });
});
