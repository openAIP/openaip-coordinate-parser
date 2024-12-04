import { describe, expect, it } from 'vitest';
import { DecimalUnsignedSuffixedHemisphereFormat } from '../src/formats/decimal-unsigned-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('12N,56E')).toBe(true);
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('12.234 N 56.678 E')).toBe(true);
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('12.234 N, 56.678 E')).toBe(true);
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('12.234N,56.678E')).toBe(true);
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('12.234N56.678E')).toBe(true);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for '12N 56E'", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('12N 56E');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(56);
    });

    it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('1.234N 5.678E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('1.234N 5.678E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  N 5.678 E'", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('1.234  N 5.678 E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N5.678E'", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('1.234N5.678E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N,5.678E'", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('1.234N,5.678E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });
});
