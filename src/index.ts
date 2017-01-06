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

import { Peripheral } from 'raspi-peripheral';

interface IAddon {
  init(pin: number, pullResistor: number, mode: number): void;
  setListener(cb: (pin: number, value: number) => void, nop: () => void): void;
  enableListenerPin(pin: number): void;
  read(pin: number): number;
  write(pin: number, value: number): void;
}

export interface IConfig {
  pin: number | string;
  pullResistor?: number;
}

interface INormalizedConfig {
  pin: number | string;
  pullResistor: number;
}

// Creating type definition files for native code is...not so simple, so instead
// we just disable tslint and trust that it works. It's not any less safe than
// creating an external .d.ts file, and this way we don't have to move it around
// tslint:disable-next-line
const addon: IAddon = require('../build/Release/addon');

const INPUT = 0;
const OUTPUT = 1;

export const LOW = 0;
export const HIGH = 1;

export const PULL_NONE = 0;
export const PULL_DOWN = 1;
export const PULL_UP = 2;

const inputs: DigitalInput[] = [];

addon.setListener((pin, value) => {
  if (inputs[pin] && inputs[pin].alive) {
    inputs[pin].emit('change', value);
  }
}, () => {}); // The second callback is not used, but has to be supplied

// Ugly ugly hack because I can't seen to get another way to keep the process
// from dying, even though we have persistent handles to everything. Without
// this, we can't emit pin value change errors unless we get lucky and some
// other piece of code keeps the process alive
setInterval(() => {}, 100000);

function parseConfig(config: number | string | IConfig): INormalizedConfig {
  let pin: number | string;
  let pullResistor: number;
  if (typeof config === 'number' || typeof config === 'string') {
    pin = config;
    pullResistor = PULL_NONE;
  } else if (typeof config === 'object') {
    pin = config.pin;
    pullResistor = config.pullResistor || PULL_NONE;
    if ([ PULL_NONE, PULL_DOWN, PULL_UP].indexOf(pullResistor) === -1) {
      throw new Error('Invalid pull resistor option ' + pullResistor);
    }
  } else {
    throw new Error('Invalid pin or configuration');
  }
  return {
    pin,
    pullResistor
  };
}

export class DigitalOutput extends Peripheral {
  constructor(config: number | string | IConfig) {
    const parsedConfig = parseConfig(config);
    super(parsedConfig.pin);
    addon.init(this.pins[0], parsedConfig.pullResistor, OUTPUT);
    addon.enableListenerPin(this.pins[0]);
  }

  public write(value: number): void {
    if (!this.alive) {
      throw new Error('Attempted to write to a destroyed peripheral');
    }
    if ([LOW, HIGH].indexOf(value) === -1) {
      throw new Error('Invalid write value ' + value);
    }
    addon.write(this.pins[0], value);
  }
}

export class DigitalInput extends Peripheral {

  public value: number;

  constructor(config: number | string | IConfig) {
    const parsedConfig = parseConfig(config);
    super(parsedConfig.pin);
    addon.init(this.pins[0], parsedConfig.pullResistor, INPUT);
    addon.enableListenerPin(this.pins[0]);
    this.value = addon.read(this.pins[0]);
    inputs[this.pins[0]] = this;
  }

  public read(): number {
    if (!this.alive) {
      throw new Error('Attempted to read from a destroyed peripheral');
    }
    this.value = addon.read(this.pins[0]);
    return this.value;
  }
}
