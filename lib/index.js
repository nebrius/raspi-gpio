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

var ffi = _interopRequire(require("ffi"));

var Peripheral = require("raspi-peripheral").Peripheral;

var wiringPi = ffi.Library("libwiringPi", {
  pinMode: ["void", ["int", "int"]],
  pullUpDnControl: ["void", ["int", "int"]],
  digitalRead: ["int", ["int"]],
  digitalWrite: ["void", ["int", "int"]],
  analogRead: ["int", ["int"]], // Not used
  analogWrite: ["void", ["int", "int"]] // Not used
});

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
    wiringPi.pinMode(this.pins[0], OUTPUT);
    wiringPi.pullUpDnControl(this.pins[0], config.pullResistor);
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
        wiringPi.digitalWrite(this.pins[0], value);
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
    wiringPi.pinMode(this.pins[0], INPUT);
    wiringPi.pullUpDnControl(this.pins[0], config.pullResistor);
    this.value = wiringPi.digitalRead(this.pins[0]);
  }

  _inherits(DigitalInput, Peripheral);

  _prototypeProperties(DigitalInput, null, {
    read: {
      value: function read() {
        if (!this.alive) {
          throw new Error("Attempted to read from a destroyed peripheral");
        }
        return this.value = wiringPi.digitalRead(this.pins[0]);
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
//# sourceMappingURL=data:application/json;base64,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QUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ3hEOzs7Ozs7U0FkVSxZQUFZO0dBQVMsVUFBVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKTIwMTQgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+IChodHRwOi8vdGhlb3JldGljYWxpZGVhdGlvbnMuY29tKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgZmZpIGZyb20gJ2ZmaSc7XG5pbXBvcnQgeyBQZXJpcGhlcmFsIH0gZnJvbSAncmFzcGktcGVyaXBoZXJhbCc7XG5cbnZhciB3aXJpbmdQaSA9IGZmaS5MaWJyYXJ5KCdsaWJ3aXJpbmdQaScsIHtcbiAgcGluTW9kZTogWyAndm9pZCcsIFsgJ2ludCcsICdpbnQnIF0gXSxcbiAgcHVsbFVwRG5Db250cm9sOiBbICd2b2lkJywgWyAnaW50JywgJ2ludCcgXV0sXG4gIGRpZ2l0YWxSZWFkOiBbICdpbnQnLCBbICdpbnQnIF1dLFxuICBkaWdpdGFsV3JpdGU6IFsgJ3ZvaWQnLCBbICdpbnQnLCAnaW50JyBdXSxcbiAgYW5hbG9nUmVhZDogWyAnaW50JywgWyAnaW50JyBdXSwgLy8gTm90IHVzZWRcbiAgYW5hbG9nV3JpdGU6IFsgJ3ZvaWQnLCBbICdpbnQnLCAnaW50JyBdXSAvLyBOb3QgdXNlZFxufSk7XG5cbnZhciBJTlBVVCA9IDA7XG52YXIgT1VUUFVUID0gMTtcblxuZXhwb3J0IHZhciBMT1cgPSAwO1xuZXhwb3J0IHZhciBISUdIID0gMTtcblxuZXhwb3J0IHZhciBQVUxMX05PTkUgPSAwO1xuZXhwb3J0IHZhciBQVUxMX1VQID0gMTtcbmV4cG9ydCB2YXIgUFVMTF9ET1dOID0gMjtcblxuZnVuY3Rpb24gcGFyc2VDb25maWcoY29uZmlnKSB7XG4gIHZhciBwaW47XG4gIHZhciBwdWxsUmVzaXN0b3I7XG4gIGlmICh0eXBlb2YgY29uZmlnID09ICdudW1iZXInIHx8IHR5cGVvZiBjb25maWcgPT0gJ3N0cmluZycpIHtcbiAgICBwaW4gPSBjb25maWc7XG4gICAgcHVsbFJlc2lzdG9yID0gUFVMTF9OT05FO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcgPT0gJ29iamVjdCcpIHtcbiAgICBwaW4gPSBjb25maWcucGluO1xuICAgIHB1bGxSZXNpc3RvciA9IGNvbmZpZy5wdWxsUmVzaXN0b3IgfHwgUFVMTF9OT05FO1xuICAgIGlmIChbIFBVTExfTk9ORSwgUFVMTF9ET1dOLCBQVUxMX1VQXS5pbmRleE9mKHB1bGxSZXNpc3RvcikgPT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwdWxsIHJlc2lzdG9yIG9wdGlvbiAnICsgcHVsbFJlc2lzdG9yKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBpbiBvciBjb25maWd1cmF0aW9uJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwaW46IHBpbixcbiAgICBwdWxsUmVzaXN0b3I6IHB1bGxSZXNpc3RvclxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRGlnaXRhbE91dHB1dCBleHRlbmRzIFBlcmlwaGVyYWwge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25maWcgPSBwYXJzZUNvbmZpZyhjb25maWcpO1xuICAgIHN1cGVyKGNvbmZpZy5waW4pO1xuICAgIHdpcmluZ1BpLnBpbk1vZGUodGhpcy5waW5zWzBdLCBPVVRQVVQpO1xuICAgIHdpcmluZ1BpLnB1bGxVcERuQ29udHJvbCh0aGlzLnBpbnNbMF0sIGNvbmZpZy5wdWxsUmVzaXN0b3IpO1xuICB9XG5cbiAgd3JpdGUodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuYWxpdmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHdyaXRlIHRvIGEgZGVzdHJveWVkIHBlcmlwaGVyYWwnKTtcbiAgICB9XG4gICAgaWYgKFtMT1csIEhJR0hdLmluZGV4T2YodmFsdWUpID09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgd3JpdGUgdmFsdWUgJyArIHZhbHVlKTtcbiAgICB9XG4gICAgd2lyaW5nUGkuZGlnaXRhbFdyaXRlKHRoaXMucGluc1swXSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaWdpdGFsSW5wdXQgZXh0ZW5kcyBQZXJpcGhlcmFsIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uZmlnID0gcGFyc2VDb25maWcoY29uZmlnKTtcbiAgICBzdXBlcihjb25maWcucGluKTtcbiAgICB3aXJpbmdQaS5waW5Nb2RlKHRoaXMucGluc1swXSwgSU5QVVQpO1xuICAgIHdpcmluZ1BpLnB1bGxVcERuQ29udHJvbCh0aGlzLnBpbnNbMF0sIGNvbmZpZy5wdWxsUmVzaXN0b3IpO1xuICAgIHRoaXMudmFsdWUgPSB3aXJpbmdQaS5kaWdpdGFsUmVhZCh0aGlzLnBpbnNbMF0pO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICBpZiAoIXRoaXMuYWxpdmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHJlYWQgZnJvbSBhIGRlc3Ryb3llZCBwZXJpcGhlcmFsJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbHVlID0gd2lyaW5nUGkuZGlnaXRhbFJlYWQodGhpcy5waW5zWzBdKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9