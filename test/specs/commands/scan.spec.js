"use strict";

var module = source("commands/scan"),
    process = source('process'),
    os = require('os');

describe("cylon scan", function() {
  it("provides example usage", function() {
    expect(module.usage).to.be.a('string');
  });

  it("provides a description of the command", function() {
    expect(module.description).to.be.a('string');
  });

  describe("#action", function() {
    beforeEach(function() {
      stub(console, 'log');
      stub(process, 'exec');
    });

    afterEach(function() {
      console.log.restore();
      process.exec.restore();
    });

    context("when no type supplied", function() {
      it("logs that a type wasn't supplied and returns", function() {
        module.action([]);
        expect(console.log).to.be.calledWith("Invalid/no type supplied.");
        expect(console.log).to.be.calledTwice;
      });
    });

    context("when invalid type supplied", function() {
      it("logs that a invalid type was supplied and returns", function() {
        module.action(['laser']);
        expect(console.log).to.be.calledWith("Invalid/no type supplied.");
        expect(console.log).to.be.calledTwice;
      });
    });

    describe("when platform is linux", function() {
      before(function() {
        stub(os, 'platform').returns("linux");
      });

      after(function() {
        os.platform.restore();
      });

      context("type: 'serial'", function() {
        it("queries dmesg", function() {
          module.action(['serial']);
          expect(process.exec).to.be.calledWith("dmesg | grep tty");
        });
      });

      context("type: 'bluetooth'", function() {
        it("scans with hcitool", function() {
          module.action(['bluetooth']);
          expect(process.exec).to.be.calledWith("hcitool scan");
        });
      });

      context("type: 'usb'", function() {
        it("uses lsusb to find USB devices", function() {
          module.action(['usb']);
          expect(process.exec).to.be.calledWith("lsusb");
        });
      });
    });

    describe("when platform is os x", function() {
      before(function() {
        stub(os, 'platform').returns("darwin");
      });

      after(function() {
        os.platform.restore();
      });

      context("type: 'serial'", function() {
        it("lists the devices in /dev", function() {
          module.action(['serial']);
          expect(process.exec).to.be.calledWith("ls /dev/{tty,cu}.*");
        });
      });

      context("type: 'bluetooth'", function() {
        it("lists the devices in /dev", function() {
          module.action(['bluetooth']);
          expect(process.exec).to.be.calledWith("ls /dev/{tty,cu}.*");
        });
      });

      context("type: 'usb'", function() {
        it("lists the devices in /dev", function() {
          module.action(['usb']);
          expect(process.exec).to.be.calledWith("ls /dev/{tty,cu}.*");
        });
      });
    });
  });
});
