/*
 * <%= adaptorName %> driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

// Include a list of commands that will be made available to the device instance.
// and used in the work block of the robot.
Driver.prototype.commands = [];

Driver.prototype.start = function(callback) {
  Driver.__super__.start.apply(this, arguments);
};
