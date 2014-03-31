var path = require('path'),
    fs = require('fs');

var globule = require('globule'),
    ejs = require('ejs');

var process = require('./../process');

module.exports = {
  usage: "generate (module) [name]",

  description: "Generates a new Cylon adaptor module.",

  printUsage: function() {
    console.log("Usage:");
    console.log("  cylon generate module [name] # generates a new cylon module");
  },

  action: function(args) {
    args = args.slice();

    var command = args.shift();

    if (["module"].indexOf(command) === -1) {
      console.log("Invalid/no generator supplied");
      this.printUsage();
      return;
    }

    this[command](args);
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
        moduleName = "cylon-" + basename;

    var className = String(name)
      .replace(/[\W_]/g, ' ')
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, function(s) { return s.toUpperCase(); })
      .replace(/\s/g, '');

    var templateData = {
      adaptorName: moduleName,
      adaptorClassName: className,
      basename: basename,
      cylonVersion: "0.11.2"
    };

    var template = path.join(__dirname, "support/generate");

    console.log("Creating new module '" + moduleName + "'");
    process.exec("cp -R " + template + " ./" + moduleName);

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
  }
};
