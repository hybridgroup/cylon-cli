/*
 * <%= adaptorName %> adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Adaptor = module.exports = function Adaptor(opts) {
  if (opts == null) { opts = {}; }
  Adaptor.__super__.constructor.apply(this, arguments);
};

subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  <%= adaptorClassName %>.__super__.connect.apply(this, arguments);
};
