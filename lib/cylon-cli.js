/** Cylon-CLI Bootstrapper
 * cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

"use strict";

var argv = process.argv.slice(2),
    commands = {};

// we use an anonymous function to bootstrap the Cylon CLI tool, and load all
// sub-commands.
module.exports = function() {
  commands['bluetooth'] = require('./commands/bluetooth.js')
  commands['scan'] = require('./commands/scan.js')
  commands['help'] = require('./commands/help.js')
  // [etc]

  var command = argv[0];

  // print help, if requested
  if (argv.length === 0 || ["help", "-h", "--help"].indexOf(command) >= 0) {
    commands.help.action(commands);
    return;
  }

  if (command in commands) {
    argv.shift();
    commands[command].action(argv);
  } else {
    console.log("Unrecognized Command Supplied.");
    console.log("Here are the commands cylon knows:");

    commands.help.action(commands);
  }
};
