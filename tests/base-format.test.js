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

    it('throws an error for non-numeric degrees', () => {
        const baseFormat = new BaseFormat();
        expect(() => baseFormat.dmsToDecimal({ degrees: 'a', minutes: 12, seconds: 34, direction: 'W' })).toThrow(
            'degrees must be a number',
        );
    });

    it('throws an error for non-numeric minutes', () => {
        const baseFormat = new BaseFormat();
        expect(() => baseFormat.dmsToDecimal({ degrees: 45, minutes: 'b', seconds: 34, direction: 'W' })).toThrow(
            'minutes must be a number',
        );
    });

    it('throws an error for non-numeric seconds', () => {
        const baseFormat = new BaseFormat();
        expect(() => baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 'c', direction: 'W' })).toThrow(
            'seconds must be a number',
        );
    });

    it('throws an error for non-string direction', () => {
        const baseFormat = new BaseFormat();
        expect(() => baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 34, direction: 123 })).toThrow(
            'direction must be a non-empty string',
        );
    });

    it('throws an error for empty direction', () => {
        const baseFormat = new BaseFormat();
        expect(() => baseFormat.dmsToDecimal({ degrees: 45, minutes: 12, seconds: 34, direction: '' })).toThrow(
            'direction must be a non-empty string',
        );
    });
});
