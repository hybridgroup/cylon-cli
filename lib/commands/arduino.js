"use strict";

var path = require('path'),
    os = require('os'),
    process = require('./../process');

module.exports = {
  usage: "arduino [subcommand] [opts]",

  description: "Install avrdude, and upload sketches to your Arduino",

  action: function(args) {
    args = args.slice();

    var subcommand = args.shift();

    var printUsage = function() {
      console.log("Usage:");
      console.log("  cylon arduino install                                  # installs avrdude to allow uploading of sketches to Arduino");
      console.log("  cylon arduino upload firmata [port]                    # uploads Firmata sketch to Arduino");
      console.log("  cylon arduino upload rapiro [port]                     # uploads Rapiro sketch to Arduino");
      console.log("  cylon arduino upload [custom-firmware-filename] [port] # uploads a custom sketch to Arduino");
    }

    if (["install", "upload"].indexOf(subcommand) === -1) {
      console.log("No/unrecognized subcommand.");
      printUsage();
      return;
    }

    switch(subcommand) {
      case 'install':
        switch (os.platform()) {
          case 'linux':
            console.log("Attempting to install avrdude with apt-get.");
            process.spawn('sudo', ['apt-get', 'install', 'avrdude']);

          case 'darwin':
            console.log("Attempting to install avrdude with Homebrew.");
            process.exec('brew install avrdude');

          default:
            console.log("OS not yet supported.")
        }

        break;

      case 'upload':

        if (args.length < 2) {
          console.log('Invalid number of arguments.');
          printUsage();
          return;
        }

        var firmware = args.shift(),
            port = args.shift(),
            hexfile;

        if (["firmata", "rapiro"].indexOf(firmware) >= 0) {
          hexfile = path.join(__dirname, "support/firmata/" + firmware + ".cpp.hex");
        } else {
          hexfile = firmware;
        }

        // allows users to just pass in device names, e.g.
        // cylon arduino upload firmata tty.ACM0
        if (!port.match(/\/dev\//)) { port = "/dev/" + port; }

        var part = '-patmega328p',
            programmer = '-carduino',
            baudrate = '-b115200',
            hexfile = "-Uflash:w:" + hexfile + ":i",
            port = "-P" + port;

        switch (os.platform()) {
          case 'linux':
          case 'darwin':
            var opts = [part, programmer, port, baudrate, '-D', hexfile]
            process.spawn('avrdude', opts);
            break;

          default:
            console.log('OS not yet supported...\n');
        }

        break;
    }
  }
};
