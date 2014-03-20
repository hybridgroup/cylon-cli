var os = require('os'),
    process = require('./../process');

module.exports = {
  usage: "bluetooth [pair|unpair|connect]",

  description: "Scan, pair, unpair bluetooth devices. Establishes serial to Bluetooth connection.",

  action: function(opts) {
    var command = opts.shift(),
        platform = os.platform();

    if (["pair", "unpair", "connect"].indexOf(command) >= 0) {
      console.log("Invalid/no subcommand supplied.");
      console.log("Usage: cylon bluetooth [pair|unpair|connect]");
      return;
    }

    switch (platform) {
      case 'linux':
        switch (command) {
          case 'pair':
            var args = opts.slice(0, 2);
            process.spawn("bluez-simple-agent", args);
            break;
          case 'unpair':
            var args = opts.slice(0, 2).concat("remove");
            process.spawn("bluez-simple-agent", args);
            break;
          case 'connect':
            var args = ['rfcomm', 'connect', args[0], args[1], '1'];
            process.spawn('sudo', args);
            break;
          default:
            console.log("Invalid subcommand supplied");
        }

        break;
      case 'darwin':
        console.log("OS X manages Bluetooth pairing/unpairing/binding itself.")
        break;
      default:
        console.log("OS not yet supported.");
    }
  }
}
