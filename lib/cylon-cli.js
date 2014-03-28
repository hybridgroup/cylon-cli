/** Cylon-CLI Bootstrapper
 * cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

"use strict";

var fs = require('fs');

var argv = process.argv.slice(2),
    commands = {};

// we use an anonymous function to bootstrap the Cylon CLI tool, and load all
// sub-commands.
module.exports = function() {
  var files = fs.readdirSync(__dirname + "/commands");

  for (var i = 0; i < files.length; i++) {
    var file = files[i],
        regex = /^(.*)\.js$/;

    if (file.match(regex)) {
      var name = /^(.*)\.js$/.exec(file)[1];
      commands[name] = require('./commands/' + file);
    }
  }

  var command = argv[0];

  // print help, if requested
  if (argv.length === 0 || ["help", "-h", "--help"].indexOf(command) >= 0) {
    commands.help.action(commands);
    return;
  }

  if (["version", "--version", "-v"].indexOf(command) >= 0) {
    console.log(require('./../package.json').version);
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
