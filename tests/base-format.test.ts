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
});
