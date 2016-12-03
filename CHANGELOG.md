## 2.3.1 (2016-12-3)

- Converted the project to TypeScript and cleaned up a bunch of odds and ends
  - Note: there is no functionality change or bug fixes with this release

## 2.3.0 (2016-7-7)

- Switched dependency ranges to ^
- Bumped dependencies to bring in support for a new Raspberry Pi Zero revision

## 2.2.2 (2016-3-20)

- Dependency update to fix bug
- New build system

## 2.2.1 (2016-3-7)

- Dependency update to add missing Raspberry Pi 3 Model B revision

## 2.2.0 (2016-3-4)

- Updated dependencies to add Raspberry Pi 3 Model B support

## 2.1.0 (2015-12-8)

- Fixed a typo in the pull up/down constants
- Updated dependencies to add Raspberry Pi Zero support

## 2.0.0 (2015-10-20)

- Upgraded to NAN 2
  - POTENTIAL BREAKING CHANGE
  - The API has not changed, but the build requirements have
  - Make sure you are running Raspbian Jessie because this module no longer builds on stock Raspbian Wheezy
  - See https://github.com/fivdi/onoff/wiki/Node.js-v4-and-native-addons for more information

## 1.5.0 (2015-10-12)

- Dependency updates to fix bug with invalid pin aliases
- Updated build dependencies

## 1.4.1 (2015-9-3)

- Dependency updates to fix a bug with pin aliasing

## 1.4.0 (2015-7-16)

- Reverted the changes in 1.3.0
  - The performance tradeoffs weren't worth the ease of installation, sadly
- Updated dependencies
- Updated the repository links to point to their new location
- Added a contributing guide
- Added code linter
- Update code style to use newer best practices

## 1.3.0 (2015-6-2)

- Switched to using node-ffi for calling Wiring Pi.
    - See https://github.com/nodejs/hardware/issues/11 for more info

## 1.2.1 (2015-3-17)

- Dependency update to fix a bug with destroying peripherals

## 1.2.0 (2015-2-21)

- Switched from traceur to babel for ES6->ES5 compilation

## 1.1.0 (2015-2-19)

- Upgraded NAN to get support for Node.js 0.12
  - io.js support is theoretically there, but won't work until https://github.com/TooTallNate/node-gyp/pull/564 is landed

## 1.0.5 (2015-2-12)

- Updated the README to reflect the change to Raspi.js

## 1.0.4 (2015-1-21)

- Locked down the NAN version for now since code breaks on 1.5

## 1.0.3 (2015-1-7)

- New README
- Code cleanup

## 1.0.2 (2014-12-5)

- Bug fix when reading from a destroyed input

## 1.0.1 (2014-12-2)

- Refactored to match changes in raspi-peripheral

## 1.0.0 (2014-11-12)

- Initial implementation
