/*
 * <%= adaptorName %>
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Your License Here
*/

'use strict';

var Adaptor = require('./adaptor'),
    Driver = require('./driver');

module.exports = {
  // Adaptors your module provides, e.g. ['spark']
  adaptors: [],

  // Drivers your module provides, e.g. ['led', 'button']
  drivers: [],

  // Modules intended to be used with yours, e.g. ['cylon-gpio']
  dependencies: [],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
