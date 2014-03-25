"use strict";

var path = require('path'),
    os = require('os'),
    fs = require('fs'),
    process = require('./../process');

module.exports = {
  usage: "crazyflie [subcommand] [opts]",

  description: "Set udev rules for Crazyflie",

  action: function(args) {
    args = args.slice();

    var subcommand = args.shift();

    var printUsage = function() {
      console.log("Usage:");
      console.log("  cylon crazyflie set-udev-rules");
    };

    if (["set-udev-rules"].indexOf(subcommand) === -1) {
      console.log("No/unrecognized subcommand.");
      printUsage();
      return;
    }

    switch (os.platform()) {
      case 'linux':
        var source = path.join(__dirname, "support/crazyflie/crazyradio.rules"),
            dest = '/etc/udev/rules.d/99-crazyradio.rules';

        process.spawn('sudo', ['cp', source, dest]);
        break;

      default:
        console.log("OS not yet supported.")
    }
  }
};
