'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalInput = exports.DigitalOutput = exports.PULL_UP = exports.PULL_DOWN = exports.PULL_NONE = exports.HIGH = exports.LOW = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /*
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

var _raspiPeripheral = require('raspi-peripheral');

var _addon = require('../build/Release/addon');

var _addon2 = _interopRequireDefault(_addon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INPUT = 0;
var OUTPUT = 1;

var LOW = exports.LOW = 0;
var HIGH = exports.HIGH = 1;

var PULL_NONE = exports.PULL_NONE = 0;
var PULL_DOWN = exports.PULL_DOWN = 1;
var PULL_UP = exports.PULL_UP = 2;

function parseConfig(config) {
  var pin = void 0;
  var pullResistor = void 0;
  if (typeof config == 'number' || typeof config == 'string') {
    pin = config;
    pullResistor = PULL_NONE;
  } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) == 'object') {
    pin = config.pin;
    pullResistor = config.pullResistor || PULL_NONE;
    if ([PULL_NONE, PULL_DOWN, PULL_UP].indexOf(pullResistor) == -1) {
      throw new Error('Invalid pull resistor option ' + pullResistor);
    }
  } else {
    throw new Error('Invalid pin or configuration');
  }
  return {
    pin: pin,
    pullResistor: pullResistor
  };
}

var DigitalOutput = exports.DigitalOutput = function (_Peripheral) {
  _inherits(DigitalOutput, _Peripheral);

  function DigitalOutput(config) {
    _classCallCheck(this, DigitalOutput);

    config = parseConfig(config);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DigitalOutput).call(this, config.pin));

    _addon2.default.init(_this.pins[0], config.pullResistor, OUTPUT);
    return _this;
  }

  _createClass(DigitalOutput, [{
    key: 'write',
    value: function write(value) {
      if (!this.alive) {
        throw new Error('Attempted to write to a destroyed peripheral');
      }
      if ([LOW, HIGH].indexOf(value) == -1) {
        throw new Error('Invalid write value ' + value);
      }
      _addon2.default.write(this.pins[0], value);
    }
  }]);

  return DigitalOutput;
}(_raspiPeripheral.Peripheral);

var DigitalInput = exports.DigitalInput = function (_Peripheral2) {
  _inherits(DigitalInput, _Peripheral2);

  function DigitalInput(config) {
    _classCallCheck(this, DigitalInput);

    config = parseConfig(config);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DigitalInput).call(this, config.pin));

    _addon2.default.init(_this2.pins[0], config.pullResistor, INPUT);
    _this2.value = _addon2.default.read(_this2.pins[0]);
    return _this2;
  }

  _createClass(DigitalInput, [{
    key: 'read',
    value: function read() {
      if (!this.alive) {
        throw new Error('Attempted to read from a destroyed peripheral');
      }
      this.value = _addon2.default.read(this.pins[0]);
      return this.value;
    }
  }]);

  return DigitalInput;
}(_raspiPeripheral.Peripheral);

//# sourceMappingURL=data:application/json;base64,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Iiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpMjAxNCBCcnlhbiBIdWdoZXMgPGJyeWFuQG5lYnJpLnVzPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBQZXJpcGhlcmFsIH0gZnJvbSAncmFzcGktcGVyaXBoZXJhbCc7XG5pbXBvcnQgYWRkb24gZnJvbSAnLi4vYnVpbGQvUmVsZWFzZS9hZGRvbic7XG5cbmNvbnN0IElOUFVUID0gMDtcbmNvbnN0IE9VVFBVVCA9IDE7XG5cbmV4cG9ydCBjb25zdCBMT1cgPSAwO1xuZXhwb3J0IGNvbnN0IEhJR0ggPSAxO1xuXG5leHBvcnQgY29uc3QgUFVMTF9OT05FID0gMDtcbmV4cG9ydCBjb25zdCBQVUxMX0RPV04gPSAxO1xuZXhwb3J0IGNvbnN0IFBVTExfVVAgPSAyO1xuXG5mdW5jdGlvbiBwYXJzZUNvbmZpZyhjb25maWcpIHtcbiAgbGV0IHBpbjtcbiAgbGV0IHB1bGxSZXNpc3RvcjtcbiAgaWYgKHR5cGVvZiBjb25maWcgPT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbmZpZyA9PSAnc3RyaW5nJykge1xuICAgIHBpbiA9IGNvbmZpZztcbiAgICBwdWxsUmVzaXN0b3IgPSBQVUxMX05PTkU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZyA9PSAnb2JqZWN0Jykge1xuICAgIHBpbiA9IGNvbmZpZy5waW47XG4gICAgcHVsbFJlc2lzdG9yID0gY29uZmlnLnB1bGxSZXNpc3RvciB8fCBQVUxMX05PTkU7XG4gICAgaWYgKFsgUFVMTF9OT05FLCBQVUxMX0RPV04sIFBVTExfVVBdLmluZGV4T2YocHVsbFJlc2lzdG9yKSA9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHB1bGwgcmVzaXN0b3Igb3B0aW9uICcgKyBwdWxsUmVzaXN0b3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGluIG9yIGNvbmZpZ3VyYXRpb24nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHBpbixcbiAgICBwdWxsUmVzaXN0b3JcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxPdXRwdXQgZXh0ZW5kcyBQZXJpcGhlcmFsIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uZmlnID0gcGFyc2VDb25maWcoY29uZmlnKTtcbiAgICBzdXBlcihjb25maWcucGluKTtcbiAgICBhZGRvbi5pbml0KHRoaXMucGluc1swXSwgY29uZmlnLnB1bGxSZXNpc3RvciwgT1VUUFVUKTtcbiAgfVxuXG4gIHdyaXRlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmFsaXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byB3cml0ZSB0byBhIGRlc3Ryb3llZCBwZXJpcGhlcmFsJyk7XG4gICAgfVxuICAgIGlmIChbTE9XLCBISUdIXS5pbmRleE9mKHZhbHVlKSA9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHdyaXRlIHZhbHVlICcgKyB2YWx1ZSk7XG4gICAgfVxuICAgIGFkZG9uLndyaXRlKHRoaXMucGluc1swXSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaWdpdGFsSW5wdXQgZXh0ZW5kcyBQZXJpcGhlcmFsIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uZmlnID0gcGFyc2VDb25maWcoY29uZmlnKTtcbiAgICBzdXBlcihjb25maWcucGluKTtcbiAgICBhZGRvbi5pbml0KHRoaXMucGluc1swXSwgY29uZmlnLnB1bGxSZXNpc3RvciwgSU5QVVQpO1xuICAgIHRoaXMudmFsdWUgPSBhZGRvbi5yZWFkKHRoaXMucGluc1swXSk7XG4gIH1cblxuICByZWFkKCkge1xuICAgIGlmICghdGhpcy5hbGl2ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gcmVhZCBmcm9tIGEgZGVzdHJveWVkIHBlcmlwaGVyYWwnKTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IGFkZG9uLnJlYWQodGhpcy5waW5zWzBdKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxufVxuIl19