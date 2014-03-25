"use strict";

var module = source('commands/crazyflie'),
    process = source('process'),
    os = require('os'),
    path = require('path');

describe("cylon crazyflie", function() {
  it("provides example usage", function() {
    expect(module.usage).to.be.a('string');
  });

  it("provides a command description", function() {
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

    describe("set-udev-rules", function() {
      var args = ['set-udev-rules'];

      beforeEach(function() {
        stub(os, 'platform');
      });

      afterEach(function() {
        os.platform.restore();
      });

      context("when platform is Linux", function() {
        beforeEach(function() {
          os.platform.returns('linux');
          stub(path, 'join').returns("crazyradio.rules");
        });

        afterEach(function() {
          path.join.restore();
        });

        it("copies the crazyradio rules to /etc/udev", function() {
          var opts = [
            'cp',
            'crazyradio.rules',
            '/etc/udev/rules.d/99-crazyradio.rules'
          ];

          module.action(args);
          expect(process.spawn).to.be.calledWith('sudo', opts);
        });
      });

      context("when platform is OS X", function() {
        beforeEach(function() {
          os.platform.returns('darwin');
        });

        it("logs that the OS is not supported", function() {
          module.action(args);
          expect(console.log).to.be.calledWith("OS not yet supported.");
        });

        it("doesn't try to run any commands", function() {
          module.action(args);
          expect(process.spawn).to.not.be.called;
        });
      });
    });
  });
});
