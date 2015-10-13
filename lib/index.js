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

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _raspiPeripheral = require('raspi-peripheral');

var _buildReleaseAddon = require('../build/Release/addon');

var _buildReleaseAddon2 = _interopRequireDefault(_buildReleaseAddon);

var INPUT = 0;
var OUTPUT = 1;

var LOW = 0;
exports.LOW = LOW;
var HIGH = 1;

exports.HIGH = HIGH;
var PULL_NONE = 0;
exports.PULL_NONE = PULL_NONE;
var PULL_UP = 1;
exports.PULL_UP = PULL_UP;
var PULL_DOWN = 2;

exports.PULL_DOWN = PULL_DOWN;
function parseConfig(config) {
  var pin = undefined;
  var pullResistor = undefined;
  if (typeof config == 'number' || typeof config == 'string') {
    pin = config;
    pullResistor = PULL_NONE;
  } else if (typeof config == 'object') {
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

var DigitalOutput = (function (_Peripheral) {
  _inherits(DigitalOutput, _Peripheral);

  function DigitalOutput(config) {
    _classCallCheck(this, DigitalOutput);

    config = parseConfig(config);
    _get(Object.getPrototypeOf(DigitalOutput.prototype), 'constructor', this).call(this, config.pin);
    _buildReleaseAddon2['default'].init(this.pins[0], config.pullResistor, OUTPUT);
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
      _buildReleaseAddon2['default'].write(this.pins[0], value);
    }
  }]);

  return DigitalOutput;
})(_raspiPeripheral.Peripheral);

exports.DigitalOutput = DigitalOutput;

var DigitalInput = (function (_Peripheral2) {
  _inherits(DigitalInput, _Peripheral2);

  function DigitalInput(config) {
    _classCallCheck(this, DigitalInput);

    config = parseConfig(config);
    _get(Object.getPrototypeOf(DigitalInput.prototype), 'constructor', this).call(this, config.pin);
    _buildReleaseAddon2['default'].init(this.pins[0], config.pullResistor, INPUT);
    this.value = _buildReleaseAddon2['default'].read(this.pins[0]);
  }

  _createClass(DigitalInput, [{
    key: 'read',
    value: function read() {
      if (!this.alive) {
        throw new Error('Attempted to read from a destroyed peripheral');
      }
      this.value = _buildReleaseAddon2['default'].read(this.pins[0]);
      return this.value;
    }
  }]);

  return DigitalInput;
})(_raspiPeripheral.Peripheral);

exports.DigitalInput = DigitalInput;
//# sourceMappingURL=data:application/json;base64,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QUssR0FBRywrQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3ZDOztlQU5VLFlBQVk7O1dBUW5CLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDZixjQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7T0FDbEU7QUFDRCxVQUFJLENBQUMsS0FBSyxHQUFHLCtCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEMsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7U0FkVSxZQUFZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpMjAxNCBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT4gKGh0dHA6Ly90aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20pXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IFBlcmlwaGVyYWwgfSBmcm9tICdyYXNwaS1wZXJpcGhlcmFsJztcbmltcG9ydCBhZGRvbiBmcm9tICcuLi9idWlsZC9SZWxlYXNlL2FkZG9uJztcblxuY29uc3QgSU5QVVQgPSAwO1xuY29uc3QgT1VUUFVUID0gMTtcblxuZXhwb3J0IGNvbnN0IExPVyA9IDA7XG5leHBvcnQgY29uc3QgSElHSCA9IDE7XG5cbmV4cG9ydCBjb25zdCBQVUxMX05PTkUgPSAwO1xuZXhwb3J0IGNvbnN0IFBVTExfVVAgPSAxO1xuZXhwb3J0IGNvbnN0IFBVTExfRE9XTiA9IDI7XG5cbmZ1bmN0aW9uIHBhcnNlQ29uZmlnKGNvbmZpZykge1xuICBsZXQgcGluO1xuICBsZXQgcHVsbFJlc2lzdG9yO1xuICBpZiAodHlwZW9mIGNvbmZpZyA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgY29uZmlnID09ICdzdHJpbmcnKSB7XG4gICAgcGluID0gY29uZmlnO1xuICAgIHB1bGxSZXNpc3RvciA9IFBVTExfTk9ORTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnID09ICdvYmplY3QnKSB7XG4gICAgcGluID0gY29uZmlnLnBpbjtcbiAgICBwdWxsUmVzaXN0b3IgPSBjb25maWcucHVsbFJlc2lzdG9yIHx8IFBVTExfTk9ORTtcbiAgICBpZiAoWyBQVUxMX05PTkUsIFBVTExfRE9XTiwgUFVMTF9VUF0uaW5kZXhPZihwdWxsUmVzaXN0b3IpID09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcHVsbCByZXNpc3RvciBvcHRpb24gJyArIHB1bGxSZXNpc3Rvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwaW4gb3IgY29uZmlndXJhdGlvbicpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcGluLFxuICAgIHB1bGxSZXNpc3RvclxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRGlnaXRhbE91dHB1dCBleHRlbmRzIFBlcmlwaGVyYWwge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25maWcgPSBwYXJzZUNvbmZpZyhjb25maWcpO1xuICAgIHN1cGVyKGNvbmZpZy5waW4pO1xuICAgIGFkZG9uLmluaXQodGhpcy5waW5zWzBdLCBjb25maWcucHVsbFJlc2lzdG9yLCBPVVRQVVQpO1xuICB9XG5cbiAgd3JpdGUodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuYWxpdmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHdyaXRlIHRvIGEgZGVzdHJveWVkIHBlcmlwaGVyYWwnKTtcbiAgICB9XG4gICAgaWYgKFtMT1csIEhJR0hdLmluZGV4T2YodmFsdWUpID09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgd3JpdGUgdmFsdWUgJyArIHZhbHVlKTtcbiAgICB9XG4gICAgYWRkb24ud3JpdGUodGhpcy5waW5zWzBdLCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxJbnB1dCBleHRlbmRzIFBlcmlwaGVyYWwge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25maWcgPSBwYXJzZUNvbmZpZyhjb25maWcpO1xuICAgIHN1cGVyKGNvbmZpZy5waW4pO1xuICAgIGFkZG9uLmluaXQodGhpcy5waW5zWzBdLCBjb25maWcucHVsbFJlc2lzdG9yLCBJTlBVVCk7XG4gICAgdGhpcy52YWx1ZSA9IGFkZG9uLnJlYWQodGhpcy5waW5zWzBdKTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgaWYgKCF0aGlzLmFsaXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byByZWFkIGZyb20gYSBkZXN0cm95ZWQgcGVyaXBoZXJhbCcpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gYWRkb24ucmVhZCh0aGlzLnBpbnNbMF0pO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
