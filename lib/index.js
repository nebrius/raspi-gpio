"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/*
The MIT License (MIT)

Copyright (c)2014 Bryan Hughes <bryan@theoreticalideations.com> (http://theoreticalideations.com)

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

var Peripheral = require("raspi-peripheral").Peripheral;

var addon = _interopRequire(require("../build/Release/addon"));

var INPUT = 0;
var OUTPUT = 1;

var LOW = exports.LOW = 0;
var HIGH = exports.HIGH = 1;

var PULL_NONE = exports.PULL_NONE = 0;
var PULL_UP = exports.PULL_UP = 1;
var PULL_DOWN = exports.PULL_DOWN = 2;

function parseConfig(config) {
  var pin;
  var pullResistor;
  if (typeof config == "number" || typeof config == "string") {
    pin = config;
    pullResistor = PULL_NONE;
  } else if (typeof config == "object") {
    pin = config.pin;
    pullResistor = config.pullResistor || PULL_NONE;
    if ([PULL_NONE, PULL_DOWN, PULL_UP].indexOf(pullResistor) == -1) {
      throw new Error("Invalid pull resistor option " + pullResistor);
    }
  } else {
    throw new Error("Invalid pin or configuration");
  }
  return {
    pin: pin,
    pullResistor: pullResistor
  };
}

var DigitalOutput = exports.DigitalOutput = (function (Peripheral) {
  function DigitalOutput(config) {
    _classCallCheck(this, DigitalOutput);

    config = parseConfig(config);
    _get(Object.getPrototypeOf(DigitalOutput.prototype), "constructor", this).call(this, config.pin);
    addon.init(this.pins[0], config.pullResistor, OUTPUT);
  }

  _inherits(DigitalOutput, Peripheral);

  _prototypeProperties(DigitalOutput, null, {
    write: {
      value: function write(value) {
        if (!this.alive) {
          throw new Error("Attempted to write to a destroyed peripheral");
        }
        if ([LOW, HIGH].indexOf(value) == -1) {
          throw new Error("Invalid write value " + value);
        }
        addon.write(this.pins[0], value);
      },
      writable: true,
      configurable: true
    }
  });

  return DigitalOutput;
})(Peripheral);

var DigitalInput = exports.DigitalInput = (function (Peripheral) {
  function DigitalInput(config) {
    _classCallCheck(this, DigitalInput);

    config = parseConfig(config);
    _get(Object.getPrototypeOf(DigitalInput.prototype), "constructor", this).call(this, config.pin);
    addon.init(this.pins[0], config.pullResistor, INPUT);
    this.value = addon.read(this.pins[0]);
  }

  _inherits(DigitalInput, Peripheral);

  _prototypeProperties(DigitalInput, null, {
    read: {
      value: function read() {
        if (!this.alive) {
          throw new Error("Attempted to read from a destroyed peripheral");
        }
        return this.value = addon.read(this.pins[0]);
      },
      writable: true,
      configurable: true
    }
  });

  return DigitalInput;
})(Peripheral);

Object.defineProperty(exports, "__esModule", {
  value: true
});
//# sourceMappingURL=data:application/json;base64,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R0FBRyxFQUFFO0FBQ2xCLFNBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JELFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDdkM7O1lBTlUsWUFBWSxFQUFTLFVBQVU7O3VCQUEvQixZQUFZO0FBUXZCLFFBQUk7YUFBQSxnQkFBRztBQUNMLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2YsZ0JBQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNsRTtBQUNELGVBQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM5Qzs7Ozs7O1NBYlUsWUFBWTtHQUFTLFVBQVUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykyMDE0IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPiAoaHR0cDovL3RoZW9yZXRpY2FsaWRlYXRpb25zLmNvbSlcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgUGVyaXBoZXJhbCB9IGZyb20gJ3Jhc3BpLXBlcmlwaGVyYWwnO1xuaW1wb3J0IGFkZG9uIGZyb20gJy4uL2J1aWxkL1JlbGVhc2UvYWRkb24nO1xuXG52YXIgSU5QVVQgPSAwO1xudmFyIE9VVFBVVCA9IDE7XG5cbmV4cG9ydCB2YXIgTE9XID0gMDtcbmV4cG9ydCB2YXIgSElHSCA9IDE7XG5cbmV4cG9ydCB2YXIgUFVMTF9OT05FID0gMDtcbmV4cG9ydCB2YXIgUFVMTF9VUCA9IDE7XG5leHBvcnQgdmFyIFBVTExfRE9XTiA9IDI7XG5cbmZ1bmN0aW9uIHBhcnNlQ29uZmlnKGNvbmZpZykge1xuICB2YXIgcGluO1xuICB2YXIgcHVsbFJlc2lzdG9yO1xuICBpZiAodHlwZW9mIGNvbmZpZyA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgY29uZmlnID09ICdzdHJpbmcnKSB7XG4gICAgcGluID0gY29uZmlnO1xuICAgIHB1bGxSZXNpc3RvciA9IFBVTExfTk9ORTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnID09ICdvYmplY3QnKSB7XG4gICAgcGluID0gY29uZmlnLnBpbjtcbiAgICBwdWxsUmVzaXN0b3IgPSBjb25maWcucHVsbFJlc2lzdG9yIHx8IFBVTExfTk9ORTtcbiAgICBpZiAoWyBQVUxMX05PTkUsIFBVTExfRE9XTiwgUFVMTF9VUF0uaW5kZXhPZihwdWxsUmVzaXN0b3IpID09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcHVsbCByZXNpc3RvciBvcHRpb24gJyArIHB1bGxSZXNpc3Rvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwaW4gb3IgY29uZmlndXJhdGlvbicpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcGluOiBwaW4sXG4gICAgcHVsbFJlc2lzdG9yOiBwdWxsUmVzaXN0b3JcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxPdXRwdXQgZXh0ZW5kcyBQZXJpcGhlcmFsIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uZmlnID0gcGFyc2VDb25maWcoY29uZmlnKTtcbiAgICBzdXBlcihjb25maWcucGluKTtcbiAgICBhZGRvbi5pbml0KHRoaXMucGluc1swXSwgY29uZmlnLnB1bGxSZXNpc3RvciwgT1VUUFVUKTtcbiAgfVxuXG4gIHdyaXRlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmFsaXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byB3cml0ZSB0byBhIGRlc3Ryb3llZCBwZXJpcGhlcmFsJyk7XG4gICAgfVxuICAgIGlmIChbTE9XLCBISUdIXS5pbmRleE9mKHZhbHVlKSA9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHdyaXRlIHZhbHVlICcgKyB2YWx1ZSk7XG4gICAgfVxuICAgIGFkZG9uLndyaXRlKHRoaXMucGluc1swXSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaWdpdGFsSW5wdXQgZXh0ZW5kcyBQZXJpcGhlcmFsIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uZmlnID0gcGFyc2VDb25maWcoY29uZmlnKTtcbiAgICBzdXBlcihjb25maWcucGluKTtcbiAgICBhZGRvbi5pbml0KHRoaXMucGluc1swXSwgY29uZmlnLnB1bGxSZXNpc3RvciwgSU5QVVQpO1xuICAgIHRoaXMudmFsdWUgPSBhZGRvbi5yZWFkKHRoaXMucGluc1swXSk7XG4gIH1cblxuICByZWFkKCkge1xuICAgIGlmICghdGhpcy5hbGl2ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gcmVhZCBmcm9tIGEgZGVzdHJveWVkIHBlcmlwaGVyYWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPSBhZGRvbi5yZWFkKHRoaXMucGluc1swXSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==