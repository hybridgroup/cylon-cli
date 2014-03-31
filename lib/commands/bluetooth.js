var os = require('os'),
    Process = require('./../process');

module.exports = {
  usage: "bluetooth [pair|unpair|connect]",

  description: "Scan, pair, unpair bluetooth devices. Establishes serial to Bluetooth connection.",

  action: function(args) {
    args = args.slice();

    var command = args.shift(),
        platform = os.platform(),
        opts;

    if (["pair", "unpair", "connect"].indexOf(command) === -1) {
      console.log("Invalid/no subcommand supplied.");
      console.log("Usage: cylon bluetooth [pair|unpair|connect]");
      return;
    }

    switch (platform) {
      case 'linux':
        switch (command) {
          case 'pair':
            opts = args.slice(0, 2);
            Process.spawn("bluez-simple-agent", opts);
            break;
          case 'unpair':
            opts = args.slice(0, 2).concat("remove");
            Process.spawn("bluez-simple-agent", opts);
            break;
          case 'connect':
            opts = ['rfcomm', 'connect', args[0], args[1], '1'];
            Process.spawn('sudo', opts);
            break;
          default:
            console.log("Invalid subcommand supplied");
        }

        break;
      case 'darwin':
        console.log("OS X manages Bluetooth pairing/unpairing/binding itself.");
        break;
      default:
        console.log("OS not yet supported.");
    }
  }
};
