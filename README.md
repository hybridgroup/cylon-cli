# Cylon.js Command Line Interface

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides all the Command Line Interface (CLI) tools.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-cli.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-cli)

## Getting Started
Install the module with: `npm install -g cylon-cli`

You install the Cylon CLI separately from the rest of Cylon.js, which means you can use it to program Arduinos with the Firmata firmware also compatible with other JavaScript frameworks such as Johnny-Five. The Cylon CLI provides many useful features on other platforms as well.

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/documentation/cli please check there as we continue to work on the Cylon CLI

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.10.0 - Compatibility with Cylon 0.19.0

Version 0.9.2 - Escape spacing for `cp` command

Version 0.9.1 - Fix semicolon error causing issues

Version 0.9.0 - Compatibility with Cylon 0.18.0

Version 0.8.1 - Compatibility with Cylon 0.17.0

Version 0.8.0 - Compatibility with Cylon 0.16.0

Version 0.7.0 - Updates for cylon-tessel 0.3.0

Version 0.6.1 - Add peerDependencies to generated modules

Version 0.6.0 - Compatibility with Cylon 0.15.0

Version 0.5.0 - Compatibility with Cylon 0.14.0, remove node-namespace from generated files.

Version 0.4.3 - Fix race condition on generate command.

Version 0.4.2 - Include crazyflie support udev-rules.

Version 0.4.1 - Update bluetooth commands and inline help for subcommands.

Version 0.4.0 - Ability to upload Tinker-compatible sketch as default Spark firmware

Version 0.3.0 - Add Tessel generator and robot generator

Version 0.2.0 - Restructure 'generate' commands and add driver file generation.
                Also fixes error with specification of `restler` dependency.

Version 0.1.1 - Fix issues with `arduino` commands.

Version 0.1.0 - Initial Release

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
