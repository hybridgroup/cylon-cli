{
  "name": "<%= adaptorName %>",
  "version": "0.1.0",
  "main": "lib/<%= adaptorName %>.js",
  "description": "Cylon module for <%= adaptorClassName %>",
  "homepage": "http://cylonjs.com",
  "bugs": "Your bug report URL here",

  "author": "Your Name Here <your@email.here> (your.url.here)",

  "repository": {
    "type": "git",
    "url": "your git URL here"
  },

  "license": "your license type here",

  "devDependencies": {
    "sinon-chai": "~2.5.0",
    "chai":       "~1.9.0",
    "mocha":      "~1.17.1",
    "sinon":      "~1.8.2",
    "jshint":     "~2.4.4"
  },

  "dependencies": {
    "node-namespace": "~1.0.0",
    "cylon":          "~<%= cylonVersion %>"
  }
}
