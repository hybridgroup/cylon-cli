"use strict";

var Cylon = require('cylon');

var <%= className %> = module.exports = function <%= className %>(opts) {
  <%= className %>.__super__.constructor.apply(this, arguments);
  this.commands = [];
};

Cylon.Utils.subclass(<%= className %>, Cylon.Driver);

<%= className %>.prototype.start = function() {
  <%= className %>.__super__.start.apply(this, arguments);
};
