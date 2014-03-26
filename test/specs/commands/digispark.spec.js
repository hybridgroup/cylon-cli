"use strict";

var module = source('commands/digispark'),
    process = source('process'),
    os = require('os'),
    path = require('path');

describe("cylon digispark", function() {
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

    describe("upload", function() {
      var args = ['upload'];

      beforeEach(function() {
        stub(os, 'platform');
        stub(path, 'join').returns('loader');
      });

      afterEach(function() {
        os.platform.restore();
        path.join.restore();
      });

      context("when platform is linux", function() {
        beforeEach(function() {
          os.platform.returns("linux");
          stub(module, 'setUdevRules');
        });

        afterEach(function() {
          module.setUdevRules.restore();
        });

        it("attempts to set udev rules before uploading", function() {
          module.action(args);
          expect(module.setUdevRules).to.be.called;
          expect(path.join).to.be.calledWithMatch('', 'littlewire');
        });

        context("if setUdevRules succeeds", function() {
          beforeEach(function() {
            this.clock = sinon.useFakeTimers();
            module.setUdevRules.returns(true);
          });

          afterEach(function() {
            this.clock.restore();
          });

          it("starts the upload command after five seconds", function() {
            module.action(args);

            expect(process.spawn).to.not.be.called;
            this.clock.tick(5000);
            expect(process.spawn).to.be.calledWith('loader', []);
          });
        });

        context("if setUdevRules does not succeed", function() {
          beforeEach(function() {
            module.setUdevRules.returns(false);
          });

          it("starts the upload command immediately", function() {
            module.action(args);
            expect(process.spawn).to.be.calledWith('loader', []);
          });
        });
      });

      context("when platform is OS X", function() {
        beforeEach(function() {
          os.platform.returns("darwin");
        });

        it("runs the upload command", function() {
          module.action(args);
          expect(process.spawn).to.be.calledWith('loader', []);
        });
      });

      context("when platform is Windows", function() {
        beforeEach(function() {
          os.platform.returns("windows");
        });

        it("logs that the OS is not yet supported", function() {
          module.action(args);
          expect(console.log).to.be.calledWith("OS not yet supported.");
        });

        it("doesn't try to run any commands", function() {
          module.action(args);
          expect(process.spawn).to.not.be.called;
        });
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
          stub(path, 'join').returns("micronucleus.rules");
        });

        afterEach(function() {
          path.join.restore();
        });

        it("copies the crazyradio rules to /etc/udev", function() {
          var opts = [
            'cp',
            'micronucleus.rules',
            '/etc/udev/rules.d/49-micronucleus.rules'
          ];

          module.action(args);
          expect(process.spawn).to.be.calledWith('sudo', opts);
          expect(path.join).to.be.calledWithMatch('', 'micronucleus');
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
