# cylon-cli

[Cylon.js](http://cylonjs.com) is a JavaScript framework for robotics and physical computing, built on top of Node.js.

This package provides some ancillary command line tools for Cylon.

These tools are primarily to generate scaffolding for new Cylon-specific projects.

Looking for more a more useful, general purpose robotics CLI tool?
Then you'll love [Gort](http://gort.io), our command-line toolkit for RobotOps.

Want to use Ruby on robots?
Check out our sister project, [Artoo](http://artoo.io).

Want to use the Go programming language to power your robots?
Check out our sister project, [Gobot](http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-cli.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-cli) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-cli/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-cli) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-cli/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-cli)

## Getting Started

To install the Cylon CLI, use NPM:

    $ npm install -g cylon-cli

You'll now have a `cylon` executable available:

    $ which cylon
    /usr/local/bin/cylon

## Usage

#### cylon [dir]

This command will generate a new scaffolded Cylon adaptor/driver module in the specified dir (or the current directory, if one isn't provided.)

It will prompt for confirmation if the specified directory isn't empty.

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-cli/blob/master/RELEASES.md](https://github.com/hybridgroup/cylon-cli/blob/master/RELEASES.md).

## License

Copyright (c) 2013-2015 The Hybrid Group.

Licenced under the Apache 2.0 license.

For more details, see the `LICENCE` file.
