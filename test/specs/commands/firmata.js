"use strict";

var module = source('commands/firmata'),
    process = source('process'),
    os = require('os'),
    path = require('path');

describe("cylon firmata", function() {
  it("provides example usage", function() {
    expect(module.usage).to.be.a('string');
  });

  it("provides a command description", function() {
    expect(module.description).to.be.a('string');
  });

  describe("#action", function() {
    beforeEach(function() {
      stub(console, 'log');
      stub(process, 'exec');
      stub(process, 'spawn');
    });

    afterEach(function() {
      console.log.restore();
      process.exec.restore();
      process.spawn.restore();
    });

    context("without a subcommand", function() {
      it("logs that no subcommand was supplied", function() {
        module.action([]);
        expect(console.log).to.be.calledWith("No/unrecognized subcommand.");
      });
    });

    context("with an invalid subcommand", function() {
      it("logs that an invalid subcommand was supplied", function() {
        module.action(['invalid']);
        expect(console.log).to.be.calledWith("No/unrecognized subcommand.");
      });
    });

    describe("install", function() {
      var args = ['install'];

      beforeEach(function() {
        stub(os, 'platform');
      });

      afterEach(function() {
        os.platform.restore();
      });

      context("when platform is Linux", function() {
        beforeEach(function() {
          os.platform.returns('linux');
        });

        it("logs that it's attempting to install avrdude with apt-get", function() {
          module.action(args);
          expect(console.log).to.be.calledWith("Attempting to install avrdude with apt-get.");
        });

        it("uses apt-get to install avrdude", function() {
          module.action(args);
          var command = ['apt-get', 'install', 'avrdude'];
          expect(process.spawn).to.be.calledWith('sudo', command);
        });
      });

      context("when platform is OS X", function() {
        beforeEach(function() {
          os.platform.returns('darwin');
        });

        it("logs that it's attempting to install avrdude with homebrew", function() {
          module.action(args);
          expect(console.log).to.be.calledWith("Attempting to install avrdude with Homebrew.");
        });

        it("uses homebrew to install avrdude", function() {
          module.action(args);
          expect(process.exec).to.be.calledWith("brew install avrdude");
        });
      });

      context("when platform is Windows", function() {
        beforeEach(function() {
          os.platform.returns('windows');
        });

        it("logs that the OS is not supported", function() {
          module.action(args);
          expect(console.log).to.be.calledWith("OS not yet supported.");
        });

        it("doesn't try to run any commands", function() {
          module.action(args);
          expect(process.exec).to.not.be.called;
          expect(process.spawn).to.not.be.called;
        });
      });
    });

    describe("upload", function() {
      var args = ['upload', 'tty.usbmodem1411'];

      beforeEach(function() {
        stub(path, 'join').returns("StandardFirmata.cpp.hex");
      });

      afterEach(function() {
        path.join.restore();
      });

      it("uses avrdude to upload a firmata sketch to the arduino", function() {
        var opts = [
          '-patmega328p',
          '-carduino',
          '-P/dev/tty.usbmodem1411',
          '-b115200',
          '-D',
          '-Uflash:w:StandardFirmata.cpp.hex:i'
        ];

        module.action(args);
        expect(process.spawn).to.be.calledWith('avrdude', opts);
      });

      context("with no port supplied", function() {
        var args = ['upload'];

        it("logs that no serial port address was supplied", function() {
          module.action(args);
          expect(console.log).to.be.calledWith('No serial port address supplied.');
        });

        it('does not attempt to run avrdude', function() {
          module.action(args);
          expect(process.spawn).to.not.be.called;
        });
      });

      context("with custom hexfile", function() {
        var args = ['upload', 'tty.usbmodem1411', 'customFirmware.cpp.hex'];

        it("uploads the custom hexfile", function() {
          var opts = [
            '-patmega328p',
            '-carduino',
            '-P/dev/tty.usbmodem1411',
            '-b115200',
            '-D',
            '-Uflash:w:customFirmware.cpp.hex:i'
          ];

          module.action(args);
          expect(process.spawn).to.be.calledWith('avrdude', opts);
        });
      });
    });
  });
});
