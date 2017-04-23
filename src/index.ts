/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@nebri.us>

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
import { Gpio } from 'pigpio';
import { getGpioNumber } from 'raspi-board';

export interface IConfig {
  pin: number | string;
  pullResistor?: number;
}

interface INormalizedConfig {
  pin: number | string;
  pullResistor: number;
}

export const LOW = 0;
export const HIGH = 1;

export const PULL_NONE = Gpio.PUD_OFF;
export const PULL_DOWN = Gpio.PUD_DOWN;
export const PULL_UP = Gpio.PUD_UP;

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

function getPin(alias: string | number, pin: number): number {
  const gpioPin = getGpioNumber(pin);
  if (gpioPin === null) {
    throw new Error(`Internal error: ${alias} was parsed as a valid pin, but couldn't be resolved to a GPIO pin`);
  }
  return gpioPin;
}

export class DigitalOutput extends Peripheral {

  private output: Gpio;

  public value: number;

  constructor(config: number | string | IConfig) {
    const parsedConfig = parseConfig(config);
    super(parsedConfig.pin);
    this.output = new Gpio(getPin(parsedConfig.pin, this.pins[0]), {
      mode: Gpio.OUTPUT,
      pullUpDown: parsedConfig.pullResistor
    });
  }

  public write(value: number): void {
    if (!this.alive) {
      throw new Error('Attempted to write to a destroyed peripheral');
    }
    if ([LOW, HIGH].indexOf(value) === -1) {
      throw new Error('Invalid write value ' + value);
    }
    this.value = value;
    this.output.digitalWrite(this.value);
    this.emit('change', this.value);
  }
}

export class DigitalInput extends Peripheral {

  private input: Gpio;

  public value: number;

  constructor(config: number | string | IConfig) {
    const parsedConfig = parseConfig(config);
    super(parsedConfig.pin);
    this.input = new Gpio(getPin(parsedConfig.pin, this.pins[0]), {
      mode: Gpio.INPUT,
      pullUpDown: parsedConfig.pullResistor
    });
    this.input.enableInterrupt(Gpio.EITHER_EDGE);
    this.input.on('interrupt', (level: number) => setTimeout(() => {
      this.value = level;
      this.emit('change', this.value);
    }));
    this.value = this.input.digitalRead();
  }

  public read(): number {
    if (!this.alive) {
      throw new Error('Attempted to read from a destroyed peripheral');
    }
    this.value = this.input.digitalRead();
    return this.value;
  }
}
