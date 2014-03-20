"use strict";

var child_process = require('child_process'),
    EventEmitter = require('events').EventEmitter;

var process = source('process');

describe('Process', function() {
  describe('#exec', function() {
    before(function() {
      stub(child_process, 'exec');
    });

    after(function() {
      child_process.exec.restore();
    });

    it('runs a command with child_process#exec', function() {
      process.exec('hello');
      expect(child_process.exec).to.be.calledWith('hello');
    });

    context("when err", function() {
      before(function() {
        stub(console, 'log');
        child_process.exec.callsArgWith(1, "error!");
      });

      after(function() {
        console.log.restore();
      });

      it("prints the error to the console", function() {
        process.exec("hello");
        expect(console.log).to.be.calledWith("error!");
      });
    });

    context("when stdout", function() {
      before(function() {
        stub(console, 'log');
        child_process.exec.callsArgWith(1, null, "program output");
      });

      after(function() {
        console.log.restore();
      });

      it("prints the error to the console", function() {
        process.exec("hello");
        expect(console.log).to.be.calledWith('program output');
      });
    });

    context("when stderr", function() {
      before(function() {
        stub(console, 'log');
        child_process.exec.callsArgWith(1, null, null, "errors on stderr");
      });

      after(function() {
        console.log.restore();
      });

      it("prints the error to the console", function() {
        process.exec("hello");
        expect(console.log).to.be.calledWith('errors on stderr');
      });
    });
  });

  describe("#spawn", function() {
    var spawnedProcess;

    before(function() {
      spawnedProcess = new EventEmitter();
      stub(child_process, 'spawn').returns(spawnedProcess);
    });

    after(function() {
      child_process.spawn.restore();
    });

    it("spawns a new process with child_process#spawn", function() {
      process.spawn("hello", "-a args");
      expect(child_process.spawn).to.be.calledWith("hello", "-a args");
    });

    context("on close", function() {
      beforeEach(function() {
        stub(console, 'log');
      });

      afterEach(function() {
        console.log.restore();
      });

      context("if exit code was 0", function() {
        it("does nothing", function() {
          process.spawn("hello, -a args")
          spawnedProcess.emit('close', 0);
          expect(console.log).to.not.be.called;
        });
      });

      context("if exit code was not 0", function() {
        it("logs the error code", function() {
          process.spawn("hello", "-a args");
          spawnedProcess.emit('close', 1);
          expect(console.log).to.be.calledWith("process exited with code 1");
        });
      });
    });

    context("on exit", function() {
      beforeEach(function() {
        stub(console, 'log');
      });

      afterEach(function() {
        console.log.restore();
      });

      context("if exit code was 0", function() {
        it("does nothing", function() {
          process.spawn("hello, -a args")
          spawnedProcess.emit('exit', 0);
          expect(console.log).to.not.be.called;
        });
      });

      context("if exit code was not 0", function() {
        it("logs the error code", function() {
          process.spawn("hello", "-a args");
          spawnedProcess.emit('exit', 1);
          expect(console.log).to.be.calledWith("process exited with code 1");
        });
      });
    });
  });
});
