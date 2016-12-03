/*
The MIT License (MIT)

Copyright (c)2014 Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var raspi_peripheral_1 = require('raspi-peripheral');
// Creating type definition files for native code is...not so simple, so instead
// we just disable tslint and trust that it works. It's not any less safe than
// creating an external .d.ts file, and this way we don't have to move it around
// tslint:disable-next-line
var addon = require('../build/Release/addon');
var INPUT = 0;
var OUTPUT = 1;
exports.LOW = 0;
exports.HIGH = 1;
exports.PULL_NONE = 0;
exports.PULL_DOWN = 1;
exports.PULL_UP = 2;
function parseConfig(config) {
    var pin;
    var pullResistor;
    if (typeof config === 'number' || typeof config === 'string') {
        pin = config;
        pullResistor = exports.PULL_NONE;
    }
    else if (typeof config === 'object') {
        pin = config.pin;
        pullResistor = config.pullResistor || exports.PULL_NONE;
        if ([exports.PULL_NONE, exports.PULL_DOWN, exports.PULL_UP].indexOf(pullResistor) === -1) {
            throw new Error('Invalid pull resistor option ' + pullResistor);
        }
    }
    else {
        throw new Error('Invalid pin or configuration');
    }
    return {
        pin: pin,
        pullResistor: pullResistor
    };
}
var DigitalOutput = (function (_super) {
    __extends(DigitalOutput, _super);
    function DigitalOutput(config) {
        var parsedConfig = parseConfig(config);
        _super.call(this, parsedConfig.pin);
        addon.init(this.pins[0], parsedConfig.pullResistor, OUTPUT);
    }
    DigitalOutput.prototype.write = function (value) {
        if (!this.alive) {
            throw new Error('Attempted to write to a destroyed peripheral');
        }
        if ([exports.LOW, exports.HIGH].indexOf(value) === -1) {
            throw new Error('Invalid write value ' + value);
        }
        addon.write(this.pins[0], value);
    };
    return DigitalOutput;
}(raspi_peripheral_1.Peripheral));
exports.DigitalOutput = DigitalOutput;
var DigitalInput = (function (_super) {
    __extends(DigitalInput, _super);
    function DigitalInput(config) {
        var parsedConfig = parseConfig(config);
        _super.call(this, parsedConfig.pin);
        addon.init(this.pins[0], parsedConfig.pullResistor, INPUT);
        this.value = addon.read(this.pins[0]);
    }
    DigitalInput.prototype.read = function () {
        if (!this.alive) {
            throw new Error('Attempted to read from a destroyed peripheral');
        }
        this.value = addon.read(this.pins[0]);
        return this.value;
    };
    return DigitalInput;
}(raspi_peripheral_1.Peripheral));
exports.DigitalInput = DigitalInput;
//# sourceMappingURL=index.js.map