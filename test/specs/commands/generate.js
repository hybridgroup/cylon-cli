"use strict";

var module = source("commands/generate"),
    Process = source('process');

var path = require('path'),
    fs = require('fs');

var ejs = require('ejs'),
    globule = require('globule');

describe("cylon generate", function() {
  it("provides example usage", function() {
    expect(module.usage).to.be.a('string');
  });

  it("provides a description of the command", function() {
    expect(module.description).to.be.a('string');
  });

  describe("#action", function() {
    beforeEach(function() {
      stub(console, 'log');

      stub(Process, 'exec');

      stub(path, 'join');

      stub(fs, 'existsSync');
      stub(fs, 'renameSync');
      stub(fs, 'readFileSync');
      stub(fs, 'writeFileSync');

      spy(ejs, 'render');

      stub(globule, 'find');
    });

    afterEach(function() {
      console.log.restore();
      Process.exec.restore();
      path.join.restore();
      fs.existsSync.restore();
      fs.renameSync.restore();
      fs.readFileSync.restore();
      fs.writeFileSync.restore();
      ejs.render.restore();
      globule.find.restore();
    });

    describe("when no generator is supplied", function() {
      var args = [];

      beforeEach(function() {
        module.action(args);
      });

      it("prints that no generator was supplied", function() {
        expect(console.log).to.be.calledWith("Invalid/no generator supplied")
      });

      it("doesn't run any commands", function() {
        expect(Process.exec).to.not.be.called;
      });
    });

    describe("robot", function() {
      context("when a directory name is supplied", function() {
        var args = ['robot', 'testing'];

        context("if the directory already exists", function() {
          beforeEach(function() {
            fs.existsSync.returns(true);
            module.action(args);
          });

          it("logs that the destination path exists", function() {
            var msg = "Destination path ./testing already exists. Aborting."
            expect(console.log).to.be.calledWith(msg);
          });

          it("doesn't run any commands", function() {
            expect(Process.exec).to.not.be.called;
          });
        });

        context("if the directory doesn't exist", function() {
          beforeEach(function() {
            fs.existsSync.returns(false);
            path.join
              .onFirstCall().returns("./testing")
              .onSecondCall().returns("support/generate/robot");
            module.action(args);
          });

          it("logs that it's creating the robot", function() {
            expect(console.log).to.be.calledWith("Creating new robot in ./testing");
          });

          it("copies the template to the specified folder", function() {
            expect(Process.exec).to.be.calledWith("cp -R support/generate/robot ./testing")
          });
        });
      });

      context("when a name is not supplied", function() {
        var args = ['robot'];

        beforeEach(function() {
          module.action(args);
        });

        it("logs that no name was supplied", function() {
          expect(console.log).to.be.calledWith("No name supplied.")
        });

        it("doesn't run any commands", function() {
          expect(Process.exec).to.not.be.called;
        });
      });
    });

    describe("driver", function() {
      context("when a name is supplied", function() {
        var args = ["driver", "test"];

        beforeEach(function() {
          path.join
            .onFirstCall().returns('hello')
            .onSecondCall().returns("support/generate/driver/driver.js")
            .onThirdCall().returns("lib/test.js");

          fs.existsSync.returns(true);
          fs.readFileSync.returns("<%= className %>")
          module.action(args);
        });

        it("reads the template file", function() {
          expect(path.join).to.be.calledWithMatch('', 'support/generate/driver/driver.js');
          expect(fs.readFileSync).to.be.calledWithMatch('support/generate/driver/driver.js');
        });

        it("compiles the template", function() {
          expect(ejs.render).to.be.calledWith("<%= className %>");
        });

        it("writes the compiled template to the new driver file", function() {
          expect(fs.writeFileSync).to.be.calledWithMatch("lib/test.js", "Test");
        });
      });

      context("when no ./lib directory could be found", function() {
        var args = ["driver", "test"];

        beforeEach(function() {
          fs.existsSync.withArgs(process.cwd(), "lib").returns(false);
          module.action(args);
        });

        it("logs that no ./lib directory was found", function() {
          expect(console.log).to.be.calledWith("No ./lib directory found. Aborting.");
        });

        it("doesn't run any commands", function() {
          expect(ejs.render).to.not.be.called;
        });
      })

      context("when no name is supplied", function() {
        var args = ["driver"];

        beforeEach(function() {
          module.action(args);
        });

        it("logs that no name was supplied", function() {
          expect(console.log).to.be.calledWith("No name supplied.")
        });

        it("doesn't run any commands", function() {
          expect(ejs.render).to.not.be.called;
        });
      });
    });

    describe("module", function() {
      context("when a name is supplied", function() {
        var args = ["module", "new-hardware"];
        var template = "<%= adaptorName %> <%= adaptorClassName %> <%= basename %> <%= cylonVersion %>";

        beforeEach(function() {
          globule.find.returns(["adaptorName.js.tpl"]);
          fs.readFileSync.returns(template);
          path.join.returns("template_dir")
          module.action(args);
        });

        it("logs that it's creating a new module", function() {
          expect(console.log).to.be.calledWith("Creating new module 'cylon-new-hardware'");
        });

        it("copies over the template using Process#exec and cp", function() {
          expect(path.join).to.be.calledWithMatch('', 'support/generate/module');
          expect(Process.exec).to.be.calledWith("cp -R template_dir ./cylon-new-hardware");
        });

        it("logs that it's compiling the templates for the new module", function() {
          expect(console.log).to.be.calledWith("Compiling templates for 'cylon-new-hardware'");
        });

        it("uses globule to find all template files", function() {
          expect(globule.find).to.be.calledWith("./cylon-new-hardware/**/*.tpl");
        });

        describe("with template files", function() {
          it("renames the file", function() {
            expect(fs.renameSync).to.be.calledWith("adaptorName.js.tpl", "cylon-new-hardware.js");
          });

          it("reads the new file", function() {
            expect(fs.readFileSync).to.be.calledWith("cylon-new-hardware.js");
          });

          it("runs EJS on the template to get the compiled file", function() {
            expect(ejs.render).to.be.calledWith(template);
          });

          it("writes the compiled template to the new file", function() {
            var compiled = "cylon-new-hardware NewHardware new-hardware"
            expect(fs.writeFileSync).to.be.calledWithMatch("cylon-new-hardware.js", compiled);
          });
        });
      });

      context("when no name is supplied", function() {
        var args = ["module"];

        beforeEach(function() {
          module.action(args);
        });

        it("logs that no name was supplied", function() {
          expect(console.log).to.be.calledWith("No name supplied.")
        });

        it("doesn't run any commands", function() {
          expect(Process.exec).to.not.be.called;
        });
      });
    });
  });
});
