"use strict";

var module = source("commands/generate"),
    process = source('process');

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

      stub(process, 'exec');

      stub(path, 'join');

      stub(fs, 'renameSync');
      stub(fs, 'readFileSync');
      stub(fs, 'writeFileSync');

      spy(ejs, 'render');

      stub(globule, 'find');
    });

    afterEach(function() {
      console.log.restore();
      process.exec.restore();
      path.join.restore();
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
        expect(process.exec).to.not.be.called;
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

        it("copies over the template using process#exec and cp", function() {
          expect(path.join).to.be.calledWithMatch('', 'support/generate/module');
          expect(process.exec).to.be.calledWith("cp -R template_dir ./cylon-new-hardware");
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
          expect(process.exec).to.not.be.called;
        });
      });
    });
  });
});
