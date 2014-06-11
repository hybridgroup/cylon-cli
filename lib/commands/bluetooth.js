var os = require('os'),
    Process = require('./../process'),
    Scan = require('./scan');

module.exports = {
  usage: "bluetooth [pair|unpair|connect]",

  description: "Scan, pair, unpair bluetooth devices. Establishes serial to Bluetooth connection.",

  action: function(args) {
    args = args.slice();

    var command = args.shift(),
        platform = os.platform(),
        opts;

    if (["scan", "pair", "unpair", "connect", "release"].indexOf(command) === -1) {
      console.log("Invalid/no subcommand supplied.\n");
      console.log("Usage:");
      console.log("1.- cylon bluetooth scan");
      console.log("2.- cylon bluetooth pair <address> [hciX]");
      console.log("3.- cylon bluetooth unpair <address> [hciX]");
      console.log("4.- cylon bluetooth connect <address> [channel]\n");
      console.log("4.- cylon bluetooth release <address> [channel]\n");
      return;
    }

    var opts = [
          (args[1]) ? args[1] : 'hci0',
          args[0]
        ];

    switch (platform) {
      case 'linux':
        switch (command) {
          case 'scan':
            Scan.action(['bluetooth']);
            break;
          case 'pair':
            Process.spawn("bluez-simple-agent", opts);
            break;
          case 'unpair':
            Process.spawn("bluez-simple-agent", opts.concat('remove'));
            break;
          case 'connect':
            opts = ['rfcomm', 'connect'].concat(opts, '1');
            Process.spawn('sudo', opts);
            break;
          case 'release':
            opts = ['rfcomm', 'release'].concat(opts);
            Process.spawn('sudo', opts);
            break;
          default:
            console.log("Invalid/no subcommand supplied.");
            console.log("Usage: cylon bluetooth [scan|pair|unpair|connect|release]");
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
