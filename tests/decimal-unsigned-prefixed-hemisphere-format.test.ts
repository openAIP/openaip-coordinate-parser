import { describe, expect, it } from 'vitest';
import { DecimalUnsignedPrefixedHemisphereFormat } from '../src/formats/decimal-unsigned-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DecimalUnsignedPrefixedHemisphereFormat.canParse('N12 E56')).toBe(true);
        expect(DecimalUnsignedPrefixedHemisphereFormat.canParse('N12,E56')).toBe(true);
        expect(DecimalUnsignedPrefixedHemisphereFormat.canParse('N 12.234 E 56.678')).toBe(true);
        expect(DecimalUnsignedPrefixedHemisphereFormat.canParse('N12.234,E56.678')).toBe(true);
        expect(DecimalUnsignedPrefixedHemisphereFormat.canParse('N12.234E56.678')).toBe(true);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for 'N12 E56'", () => {
        const formatParser = new DecimalUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N12 E56');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(56);
    });

    it("returns the correct latitude and longitude for 'N12,E56'", () => {
        const formatParser = new DecimalUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N12,E56');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(56);
    });

    it("returns the correct latitude and longitude for 'N 12.234 E 56.678'", () => {
        const formatParser = new DecimalUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N 12.234 E 56.678');
        expect(result.latitude).toBe(12.234);
        expect(result.longitude).toBe(56.678);
    });

    it("returns the correct latitude and longitude for 'N12.234,E56.678'", () => {
        const formatParser = new DecimalUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N12.234,E56.678');
        expect(result.latitude).toBe(12.234);
        expect(result.longitude).toBe(56.678);
    });

    it("returns the correct latitude and longitude for 'N12.234E56.678'", () => {
        const formatParser = new DecimalUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N12.234E56.678');
        expect(result.latitude).toBe(12.234);
        expect(result.longitude).toBe(56.678);
    });
});
