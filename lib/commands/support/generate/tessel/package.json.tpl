{
  "name": "<%= name %>",
  "version": "0.0.0",
  "main": "index.js",
  "description": "<%= name %>",
  "author": {
    "name": "your name here",
    "email": "your email here",
    "url": "your site here"
  },
  "hardware": {
    "*": true,
    "./": true
  },
  "repository": {
    "type": "git",
    "url": "your git uri here"
  },
  "licenses": [
    { "type": "your license here" }
  ],
  "dependencies": {
    "cylon":      "~0.21.0",
    "cylon-gpio": "~0.21.0",
    "cylon-i2c":  "~0.18.0",
    "cylon-tessel": "~0.8.0"
  }
}
