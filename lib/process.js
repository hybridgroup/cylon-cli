var child_process = require('child_process');

module.exports = {
  exec: function(command) {
    child_process.exec(command, function(err, stdout, stderr) {
      if (stdout != null) { console.log(stdout); }
      if (stderr != null) { console.log(stderr); }
      if (err != null) { console.log(err); }
    });
  },

  spawn: function(command, args) {
    var cmd = child_process.spawn(command, args, { stdio: 'inherit' });

    var printErrorCode = function(code) {
      if (code !== 0) { console.log("process exited with code " + code); }
    };

    cmd.once('close', printErrorCode);
    cmd.once('exit', printErrorCode);
  }
};
