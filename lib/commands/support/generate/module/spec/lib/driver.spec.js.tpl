'use strict';

var <%= adaptorClassName %> = source("driver");

describe("Cylon.Drivers.<%= adaptorClassName %>", function() {
  var driver = new <%= adaptorClassName %>({
    connection: {}
  });

  it("needs tests");
});
