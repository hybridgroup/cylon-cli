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
    { "type": "Apache 2.0" }
  ],
  "dependencies": {
    "cylon": "~0.13.0",
    "cylon-gpio": "~0.13.0",
    "cylon-tessel": "~0.0.1",
    "cylon-i2c": "~0.10.0"
  }
}
