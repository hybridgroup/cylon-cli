"use strict";

var namespace = require('node-namespace');

namespace("Cylon.Drivers", function() {
  this.<%= className %> = (function(klass) {
    subclass(<%= className %>, klass);

    function <%= className %>(opts) {
      <%= className %>.__super__.constructor.apply(this, arguments);
    }

    <%= className %>.prototype.commands = function() {
      return [];
    };

    <%= className %>.prototype.start = function() {
      <%= className %>.__super__.start.apply(this, arguments);
    };

    return <%= className %>;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.<%= className %>;
