"use strict";
/*
The MIT License (MIT)

Copyright (c) 2014-2017 Bryan Hughes <bryan@nebri.us>

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var raspi_peripheral_1 = require("raspi-peripheral");
var pigpio_1 = require("pigpio");
var raspi_board_1 = require("raspi-board");
exports.LOW = 0;
exports.HIGH = 1;
exports.PULL_NONE = pigpio_1.Gpio.PUD_OFF;
exports.PULL_DOWN = pigpio_1.Gpio.PUD_DOWN;
exports.PULL_UP = pigpio_1.Gpio.PUD_UP;
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
function getPin(alias, pin) {
    var gpioPin = raspi_board_1.getGpioNumber(pin);
    if (gpioPin === null) {
        throw new Error("Internal error: " + alias + " was parsed as a valid pin, but couldn't be resolved to a GPIO pin");
    }
    return gpioPin;
}
var DigitalOutput = /** @class */ (function (_super) {
    __extends(DigitalOutput, _super);
    function DigitalOutput(config) {
        var _this = this;
        var parsedConfig = parseConfig(config);
        _this = _super.call(this, parsedConfig.pin) || this;
        _this._output = new pigpio_1.Gpio(getPin(parsedConfig.pin, _this.pins[0]), {
            mode: pigpio_1.Gpio.OUTPUT,
            pullUpDown: parsedConfig.pullResistor
        });
        return _this;
    }
    Object.defineProperty(DigitalOutput.prototype, "value", {
        get: function () {
            return this._currentValue;
        },
        enumerable: true,
        configurable: true
    });
    DigitalOutput.prototype.write = function (value) {
        if (!this.alive) {
            throw new Error('Attempted to write to a destroyed peripheral');
        }
        if ([exports.LOW, exports.HIGH].indexOf(value) === -1) {
            throw new Error('Invalid write value ' + value);
        }
        this._currentValue = value;
        this._output.digitalWrite(this.value);
        this.emit('change', this.value);
    };
    return DigitalOutput;
}(raspi_peripheral_1.Peripheral));
exports.DigitalOutput = DigitalOutput;
var DigitalInput = /** @class */ (function (_super) {
    __extends(DigitalInput, _super);
    function DigitalInput(config) {
        var _this = this;
        var parsedConfig = parseConfig(config);
        _this = _super.call(this, parsedConfig.pin) || this;
        _this._input = new pigpio_1.Gpio(getPin(parsedConfig.pin, _this.pins[0]), {
            mode: pigpio_1.Gpio.INPUT,
            pullUpDown: parsedConfig.pullResistor
        });
        _this._input.enableInterrupt(pigpio_1.Gpio.EITHER_EDGE);
        _this._input.on('interrupt', function (level) { return setTimeout(function () {
            _this._currentValue = level;
            _this.emit('change', _this.value);
        }); });
        _this._currentValue = _this._input.digitalRead();
        return _this;
    }
    Object.defineProperty(DigitalInput.prototype, "value", {
        get: function () {
            return this._currentValue;
        },
        enumerable: true,
        configurable: true
    });
    DigitalInput.prototype.destroy = function () {
        this._input.disableInterrupt();
        _super.prototype.destroy.call(this);
    };
    DigitalInput.prototype.read = function () {
        if (!this.alive) {
            throw new Error('Attempted to read from a destroyed peripheral');
        }
        this._currentValue = this._input.digitalRead();
        return this.value;
    };
    return DigitalInput;
}(raspi_peripheral_1.Peripheral));
exports.DigitalInput = DigitalInput;
//# sourceMappingURL=index.js.map