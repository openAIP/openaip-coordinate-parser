import { describe, expect, it } from 'vitest';
import { DecimalUnsignedSuffixedHemisphereFormat } from '../src/formats/decimal-unsigned-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('1.234N 5.678E')).toBe(true);
    });

    it("returns true for valid decimal format '1.234 N,  5.678 E' with comma", () => {
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('1.234 N,  5.678 E')).toBe(true);
    });

    it("returns false for invalid decimal format '1.234 5.678'", () => {
        expect(DecimalUnsignedSuffixedHemisphereFormat.canParse('1.234 5.678')).toBe(false);
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

    it("returns the correct latitude and longitude for '1.23412312N 5.6782356E' with precision 4", () => {
        const formatParser = new DecimalUnsignedSuffixedHemisphereFormat({ precision: 4 });
        const result = formatParser.parse('1.23412312N 5.6782356E');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(5.6782);
    });
});
