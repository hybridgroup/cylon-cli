/*
 * Cylon-CLI: 'help' subcommand
 * cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

module.exports = {
  description: "Prints help for using the Cylon-CLI commands.",

  action: function(commands) {
    console.log();
    console.log("  Usage: cylon [command] [options]");
    console.log();
    console.log("  Commands: ");

    for (var name in commands) {
      var command = commands[name];

      console.log("    ", (command.usage || name));

      if (command.description) console.log("       ", command.description);

      console.log("");
    }
  }
};
