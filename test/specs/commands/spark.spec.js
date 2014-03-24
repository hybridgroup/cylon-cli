"use strict";

var rest = require('restler'),
    fs = require('fs'),
    module = source("commands/spark");

describe("cylon spark", function() {
  it("provides a usage example", function() {
    expect(module.usage).to.be.a('string');
  });

  it("provides a description", function() {
    expect(module.description).to.be.a('string');
  });

  describe("#action", function() {
    var complete;

    beforeEach(function() {
      stub(console, 'log');
    });

    afterEach(function() {
      console.log.restore();
    });

    context("with no arguments", function() {
      it("logs that an no command was provided", function() {
        module.action([]);
        expect(console.log).to.be.calledWith("No/unrecognized subcommand.");
      });
    });

    context("with an invalid subcommand", function() {
      it("logs that an invalid command was provided", function() {
        module.action(['notacommand']);
        expect(console.log).to.be.calledWith("No/unrecognized subcommand.");
      });
    });

    context("with less than three arguments", function() {
      it("logs that an invalid number of arugments were provided", function() {
        module.action(['upload']);
        expect(console.log).to.be.calledWith("Invalid number of arguments.");
      });
    });

    context("with a subcommand and the correct number of arguments", function() {
      var args = ["upload", "access_token", "device_id", "filename.cpp"];

      context("when the provided filename exists", function() {
        beforeEach(function() {
          stub(fs, 'exists').callsArgWith(1, true);
        });

        afterEach(function() {
          fs.exists.restore();
        });

        context("if file stats can be fetched", function() {
          beforeEach(function() {
            stub(fs, 'stat').callsArgWith(1, null, { size: 1024 });
            stub(rest, 'file').returns('file');
            stub(rest, 'put').returns({ on: spy() });
          });

          afterEach(function() {
            fs.stat.restore();
            rest.file.restore();
            rest.put.restore();
          });

          it("makes a PUT request to upload the file", function() {
            module.action(args);

            var uri = "https://api.spark.io/v1/devices/device_id";
            var opts = {
              multipart: true,
              headers: { "Authorization": "Bearer access_token" },
              data: { file: 'file' }
            };

            expect(rest.file).to.be.calledWith("filename.cpp", null, 1024, null, 'text/plain');
            expect(rest.put).to.be.calledWith(uri, opts);
          });
        });

        context("if file stats cannot be obtained", function() {
          beforeEach(function() {
            stub(fs, 'stat').callsArgWith(1, true, null);
          });

          afterEach(function() {
            fs.stat.restore();
          });

          it("logs that an error occured while getting file stats", function() {
            module.action(args);
            expect(console.log).to.be.calledWith("Error occured while trying to get length of file.")
          });
        });
      });

      context("when the provided filename does not exist", function() {
        var args = ["upload", "access_token", "device_id", "filename.cpp"];

        beforeEach(function() {
          stub(fs, 'exists').callsArgWith(1, false);
        });

        afterEach(function() {
          fs.exists.restore();
        });

        it("logs that the file couldn't be found", function() {
          module.action(args);
          expect(console.log).to.be.calledWith("Supplied filename does not exist.");
        });
      });
    });
  });
});
