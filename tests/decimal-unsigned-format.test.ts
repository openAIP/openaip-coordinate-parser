import { describe, expect, it } from 'vitest';
import { DecimalUnsignedFormat } from '../src/formats/decimal-unsigned-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DecimalUnsignedFormat.canParse('1.234, 5.678')).toBe(true);
        expect(DecimalUnsignedFormat.canParse('1.234 5.678')).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 10, 13`, () => {
        const formatParser = new DecimalUnsignedFormat();
        const result = formatParser.parse(`10, 13`);
        expect(result.latitude).toBe(10);
        expect(result.longitude).toBe(13);
    });

    it(`returns the correct latitude and longitude for 1.234, 5.678`, () => {
        const formatParser = new DecimalUnsignedFormat();
        const result = formatParser.parse(`1.234, 5.678`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it(`returns the correct latitude and longitude for 1.234,5.678`, () => {
        const formatParser = new DecimalUnsignedFormat();
        const result = formatParser.parse(`1.234,5.678`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it(`returns the correct latitude and longitude for 1.234 5.678`, () => {
        const formatParser = new DecimalUnsignedFormat();
        const result = formatParser.parse(`1.234 5.678`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });
});
