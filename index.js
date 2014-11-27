/*
The MIT License (MIT)

Copyright (c) 2013-2014 Bryan Hughes <bryan@theoreticalideations.com> (http://theoreticalideations.com)

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

import { Peripheral } from 'raspi-peripheral';
import addon from '../build/Release/addon';

export var INPUT = 0;
export var OUTPUT = 1;

export var LOW = 0;
export var HIGH = 1;

export var PULL_NONE = 0;
export var PULL_UP = 1;
export var PULL_DOWN = 2;

/*addon.setCallback(function(pin, value) {
  if (pinInstances[pin]) {
    pinInstances[pin].emit('change', value);
  }
});*/

function parseConfig(config) {
  var pin;
  var pullResistor;
  if (typeof config == 'number' || typeof config == 'string') {
    pin = config;
    pullResistor = PULL_NONE;
  } else if (typeof config == 'object') {
    pin = config.pin;
    pullResistor = config.pullResistor || PULL_NONE;
    if ([ PULL_NONE, PULL_DOWN, PULL_UP].indexOf(pullResistor) == -1) {
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

export class DigitalOutput extends Peripheral {
  constructor(config) {
    config = parseConfig(config);
    super(config.pin);
    addon.init(this.pin, config.pullResistor, OUTPUT);
  }

  write(value) {
    if (!this.alive) {
      throw new Error('Attempted to write to a destroyed peripheral');
    }
    if ([LOW, HIGH].indexOf(value) == -1) {
      throw new Error('Invalid write value ' + value);
    }
    addon.write(this.pin, value);
  }
}

export class DigitalInput extends Peripheral {
  constructor(config) {
    config = parseConfig(config);
    super(config.pin);
    addon.init(this.pin, config.pullResistor, INPUT);
    this.value = addon.read(this.pin);
  }

  read() {
    return this.value = addon.read(this.pin);
  }
}
