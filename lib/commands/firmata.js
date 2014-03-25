"use strict";

var path = require('path'),
    os = require('os'),
    process = require('./../process');

module.exports = {
  usage: "firmata [subcommand] [opts]",

  description: "Install avrdude and upload the Firmata sketch to your Arduino",

  action: function(args) {
    args = args.slice();

    var subcommand = args.shift();

    var printUsage = function() {
      console.log("Usage:");
      console.log("  cylon firmata install # installs avrdude to allow uploading of sketch to Arduino");
      console.log("  cylon firmata upload [port] [file] # uploads Firmata or provided sketch to Arduino");
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
        var port = args.shift(),
            hexfile = args.shift() || path.join(__dirname, "support/firmata/StandardFirmata.cpp.hex");

        if (!port) {
          console.log("No serial port address supplied.");
          printUsage();
          return;
        }

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
