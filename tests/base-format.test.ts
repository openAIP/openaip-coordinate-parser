import { describe, expect, it } from 'vitest';
import { BaseFormat } from '../src/formats/base-format.js';

describe('dmsToDecimal', () => {
    it('returns the correct decimal value for valid DMS input with direction N', () => {
        const baseFormat = new BaseFormat();
        const result = baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 34, direction: 'N' });
        expect(result).toBe(45.20944444444445);
    });

    it('returns the correct decimal value for valid DMS input with direction S', () => {
        const baseFormat = new BaseFormat();
        const result = baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 34, direction: 'S' });
        expect(result).toBe(-45.20944444444445);
    });

    it('returns the correct decimal value for valid DMS input with direction E', () => {
        const baseFormat = new BaseFormat();
        const result = baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 34, direction: 'E' });
        expect(result).toBe(45.20944444444445);
    });

    it('returns the correct decimal value for valid DMS input with direction W', () => {
        const baseFormat = new BaseFormat();
        const result = baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 34, direction: 'W' });
        expect(result).toBe(-45.20944444444445);
    });

    it('rejects invalid minutes range', () => {
        const baseFormat = new BaseFormat();

        expect(() => baseFormat.dmsToDecimal({ degrees: 45, minutes: 60, seconds: 34, direction: 'W' })).toThrowError(
            `Schema validation failed for parameter 'dms. Expected to match schema 'Union'. [minutes]: Number must be less than or equal to 59. Received: {"degrees":45,"minutes":60,"seconds":34,"direction":"W"}`
        );
    });

    it('rejects invalid seconds range', () => {
        const baseFormat = new BaseFormat();

        expect(() => baseFormat.dmsToDecimal({ degrees: 45, minutes: 56, seconds: 60, direction: 'W' })).toThrowError(
            `Schema validation failed for parameter 'dms. Expected to match schema 'Union'. [seconds]: Number must be less than or equal to 59. Received: {"degrees":45,"minutes":56,"seconds":60,"direction":"W"}`
        );
    });
});
