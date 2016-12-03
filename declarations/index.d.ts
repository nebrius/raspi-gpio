import { Peripheral } from 'raspi-peripheral';
export interface IConfig {
    pin: number | string;
    pullResistor?: number;
}
export declare const LOW: number;
export declare const HIGH: number;
export declare const PULL_NONE: number;
export declare const PULL_DOWN: number;
export declare const PULL_UP: number;
export declare class DigitalOutput extends Peripheral {
    constructor(config: number | string | IConfig);
    write(value: number): void;
}
export declare class DigitalInput extends Peripheral {
    value: number;
    constructor(config: number | string | IConfig);
    read(): number;
}
