"use strict";

var Cylon = require('cylon');

var <%= className %> = module.exports = function <%= className %>(opts) {
  <%= className %>.__super__.constructor.apply(this, arguments);
};

subclass(<%= className %>, Cylon.Driver);

<%= className %>.prototype.commands = function() {
  return [];
};

<%= className %>.prototype.start = function() {
  <%= className %>.__super__.start.apply(this, arguments);
};
