"use strict";

var Cylon = require('cylon');

var <%= className %> = module.exports = function <%= className %>(opts) {
  <%= className %>.__super__.constructor.apply(this, arguments);
  // Include a list of commands that will be made available to the device instance.
  // and used in the work block of the robot.
  this.commands = {
    // This is how you register a command function for the device;
    // the command should be added to the prototype, see below.
    hello: this.hello;
  };
};

Cylon.Utils.subclass(<%= className %>, Cylon.Driver);

<%= className %>.prototype.start = function() {
  <%= className %>.__super__.start.apply(this, arguments);
};

<%= className %>.prototype.hello = function() {
  Cylon.Logger.info('Hello World!');
}
