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

## Version History

Version | Notes
------- | -----
1.1.0   | Correct generation of package.json
1.0.0   | Rewrite, restriction of functionality to generating new modules
0.13.1  | Correct issues with Tessel
0.13.0  | Compatibility with Cylon 0.21.0
0.12.1  | Minor version bumps, Tessel update
0.12.0  | Compatibility with Cylon 0.21.0
0.11.0  | Compatibility with Cylon 0.20.0
0.10.0  | Compatibility with Cylon 0.19.0
0.9.2   | Escape spacing for `cp` command
0.9.1   | Fix semicolon error causing issues
0.9.0   | Compatibility with Cylon 0.18.0
0.8.1   | Compatibility with Cylon 0.17.0
0.8.0   | Compatibility with Cylon 0.16.0
0.7.0   | Updates for cylon-tessel 0.3.0
0.6.1   | Add peerDependencies to generated modules
0.6.0   | Compatibility with Cylon 0.15.0
0.5.0   | Compatibility with Cylon 0.14.0, remove node-namespace from generated files.
0.4.3   | Fix race condition on generate command.
0.4.2   | Include crazyflie support udev-rules.
0.4.1   | Update bluetooth commands and inline help for subcommands.
0.4.0   | Ability to upload Tinker-compatible sketch as default Spark firmware
0.3.0   | Add Tessel generator and robot generator
0.2.0   | Restructure 'generate' commands and add driver file generation. Also fixes error with specification of `restler` dependency.
0.1.1   | Fix issues with `arduino` commands.
0.1.0   | Initial Release

## License

Copyright (c) 2013-2015 The Hybrid Group.

Licenced under the Apache 2.0 license.

For more details, see the `LICENCE` file.
