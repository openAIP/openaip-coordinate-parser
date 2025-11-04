import { BaseFormat, type Hemisphere } from './base-format.js';

export abstract class AbstractDecimalHemisphereFormat extends BaseFormat {
    protected toDecimal(decimalValue: number, hemisphere: Hemisphere) {
        if (['W', 'S'].includes(hemisphere) === true) {
            return -decimalValue;
        }

        return decimalValue;
    }
}
