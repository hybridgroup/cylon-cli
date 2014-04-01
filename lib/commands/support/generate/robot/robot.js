var Cylon = require('cylon');

Cylon.robot({
  name: "New Robot",

  work: function(my) {
    after((2).seconds(), function() {
      console.log(console.log);
      console.log("Hello World!");
    });
  }
}).start();
