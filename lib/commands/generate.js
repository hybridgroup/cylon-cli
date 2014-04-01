var path = require('path'),
    fs = require('fs');

var globule = require('globule'),
    ejs = require('ejs');

var Process = require('./../process');

module.exports = {
  usage: "generate [module|driver] [name]",

  description: "Generate new Cylon components or modules",

  printUsage: function() {
    console.log("Usage:");
    console.log("  cylon generate module [name] # generates a new cylon module");
    console.log("  cylon generate driver [name] # generates a new driver class in ./lib");
    console.log("  cylon generate robot [dir] # generates a new robot in ./dir, complete with Test-Driven-Robotics harness");
  },

  action: function(args) {
    args = args.slice();

    var command = args.shift();

    if (["module", "driver", "robot"].indexOf(command) === -1) {
      console.log("Invalid/no generator supplied");
      this.printUsage();
      return;
    }

    this[command](args);
  },

  robot: function(args) {
    args = args.slice();

    if (args.length === 0) {
      console.log("No name supplied.");
      this.printUsage();
      return;
    }

    var name = args[0],
        dest = path.join(process.cwd(), name),
        template = path.join(__dirname, "support/generate/robot");

    if (fs.existsSync(dest)) {
      console.log("Destination path ./" + name + " already exists. Aborting.");
      return;
    }

    console.log("Creating new robot in ./" + name);
    Process.exec("cp -R " + template + " " + dest);
  },

  driver: function(args) {
    args = args.slice();

    if (args.length === 0) {
      console.log("No name supplied.");
      this.printUsage();
      return;
    }

    var lib = path.join(process.cwd(), "lib"),
        template = path.join(__dirname, "support/generate/driver/driver.js");

    if (!fs.existsSync(lib)) {
      console.log("No ./lib directory found. Aborting.");
      return;
    }

    var name = args.shift(),
        classname = this._convertToClassName(name),
        filename = path.join(lib, name.toLowerCase() + ".js");

    var contents = fs.readFileSync(template, 'utf8');
    var compiled = ejs.render(contents, { className: classname });

    fs.writeFileSync(filename, compiled);
  },

  module: function(args) {
    args = args.slice();

    if (args.length === 0) {
      console.log("No name supplied.");
      this.printUsage();
      return;
    }

    var name = args.shift(),
        basename = String(name).toLowerCase(),
        moduleName = "cylon-" + basename,
        className = this._convertToClassName(name);

    var templateData = {
      adaptorName: moduleName,
      adaptorClassName: className,
      basename: basename,
      cylonVersion: "0.11.2"
    };

    var template = path.join(__dirname, "support/generate/module");

    console.log("Creating new module '" + moduleName + "'");
    Process.exec("cp -R " + template + " ./" + moduleName);

    console.log("Compiling templates for '" + moduleName + "'");

    globule.find("./" + moduleName + "/**/*.tpl").forEach(function(filename) {
      var newFilename = String(filename)
        .replace(/adaptorName/, moduleName)
        .replace(/\.tpl$/, '');

      fs.renameSync(filename, newFilename);

      var contents = fs.readFileSync(newFilename, 'utf8');
      var result = ejs.render(contents, templateData);

      fs.writeFileSync(newFilename, result);
    });
  },

  _convertToClassName: function(string) {
    return String(string)
      .replace(/[\W_]/g, ' ')
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, function(s) { return s.toUpperCase(); })
      .replace(/\s/g, '');
  }
};
