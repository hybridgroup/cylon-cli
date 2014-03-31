var os = require('os'),
    Process = require('./../process');

module.exports = {
  usage: "scan [type]",

  description: "Scans serial, Bluetooth, or USB for connected devices",

  action: function(opts) {
    var type = opts.shift(),
        platform = os.platform();

    if (['serial', 'bluetooth', 'usb'].indexOf(type) === -1) {
      console.log("Invalid/no type supplied.");
      console.log("Usage: cylon scan [serial|bluetooth|usb]");
      return;
    }

    switch (platform) {
      case 'darwin':
        Process.exec("ls /dev/{tty,cu}.*");
        break;
      case 'linux':
        switch (type) {
          case 'serial':
            Process.exec("dmesg | grep tty");
            break;
          case 'bluetooth':
            Process.exec("hcitool scan");
            break;
          case 'usb':
            Process.exec("lsusb");
            break;
          default:
            console.log("Device type not yet supported.");
            break;
        }

        break;
      default:
        console.log("OS not yet supported.");
    }
  }
};
