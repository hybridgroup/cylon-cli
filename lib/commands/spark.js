var fs = require('fs'),
    rest = require('restler'),
    path = require('path');

module.exports = {
  usage: "spark upload [access_token] [device_id] [default|./path/to/firmware_file.cpp]",

  description: "Upload new firmare to your Spark Core",

  action: function(args)  {
    args = args.slice();

    if (["upload"].indexOf(args.shift()) === -1) {
      console.log("No/unrecognized subcommand.");
      console.log("Usage:");
      console.log("  cylon spark upload [access_token] [device_id] [default|./path/to/firmware_file.cpp]");
      return;
    }

    if (args.length < 3) {
      console.log("Invalid number of arguments.");
      console.log("Necessary arguments:");
      console.log("  - [access_token]     # your Spark access token");
      console.log("  - [device_id]        # your Spark Core's device ID");
      console.log("  - [default|filename] # filename of app you'd like to upload, or 'default' to upload the default firmware");
      return;
    }

    var access_token = args.shift(),
        device_id = args.shift(),
        filename = args.shift(),
        url = "https://api.spark.io/v1/devices/" + device_id,
        length;

    if (filename === "default") {
      filename = path.join(__dirname, "support/spark/default.cpp");
    }

    fs.exists(filename, function(exists) {
      if (!exists) {
        console.log("Supplied filename does not exist.");
        return;
      }

      fs.stat(filename, function(err, stats) {
        if (err) {
          console.log("Error occured while trying to get length of file.");
          return;
        }

        length = stats.size;

        var opts = {
          multipart: true,
          headers: { "Authorization": "Bearer " + access_token },
          data: { file: rest.file(filename, null, length, null, 'text/plain') }
        };

        var complete = function(data) {
          if (data.error) {
            console.log("Failed! Message from Spark's API:");
            console.log(data.error_description);
          } else if ((data.ok !== undefined) && !data.ok) {
            console.log("Failed! Backtrace from Spark's API:");
            console.log(data.errors);
          } else {
            console.log("Uploaded successfully, your Spark Core should be updating now.");
          }
        };

        rest.put(url, opts).on('complete', complete);
      });
    });
  }
};
