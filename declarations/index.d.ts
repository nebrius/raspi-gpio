import { Peripheral } from 'raspi-peripheral';
export interface IConfig {
    pin: number | string;
    pullResistor?: number;
}
export declare const LOW = 0;
export declare const HIGH = 1;
export declare const PULL_NONE: number;
export declare const PULL_DOWN: number;
export declare const PULL_UP: number;
export declare class DigitalOutput extends Peripheral {
    private _output;
    private _currentValue;
    readonly value: number;
    constructor(config: number | string | IConfig);
    write(value: number): void;
}
export declare class DigitalInput extends Peripheral {
    private _input;
    private _currentValue;
    readonly value: number;
    constructor(config: number | string | IConfig);
    destroy(): void;
    read(): number;
}
