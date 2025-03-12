import { describe, expect, it } from 'vitest';
import { DecimalSignedSuffixedHemisphereFormat } from '../src/formats/decimal-signed-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DecimalSignedSuffixedHemisphereFormat.canParse('12° N 5° E')).toBe(true);
        expect(DecimalSignedSuffixedHemisphereFormat.canParse('1.234° N 5.678° E')).toBe(true);
        expect(DecimalSignedSuffixedHemisphereFormat.canParse('1.234° N, 5.678° E')).toBe(true);
        expect(DecimalSignedSuffixedHemisphereFormat.canParse('1.234°N, 5.678°E')).toBe(true);
        expect(DecimalSignedSuffixedHemisphereFormat.canParse('1.234°N,5.678°E')).toBe(true);
        expect(DecimalSignedSuffixedHemisphereFormat.canParse('1.234°N5.678°E')).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 12° N 5° E`, () => {
        const formatParser = new DecimalSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`12° N 5° E`);
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it(`returns the correct latitude and longitude for 1.234° N 5.678° E`, () => {
        const formatParser = new DecimalSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`1.234° N 5.678° E`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it(`returns the correct latitude and longitude for 1.234° N 5.678° E`, () => {
        const formatParser = new DecimalSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`1.234° N 5.678° E`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it(`returns the correct latitude and longitude for 1.234  ° N 5.678 ° E`, () => {
        const formatParser = new DecimalSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`1.234  ° N 5.678 ° E`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it(`returns the correct latitude and longitude for 1.234°N,5.678°E`, () => {
        const formatParser = new DecimalSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`1.234°N,5.678°E`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it(`returns the correct latitude and longitude for 1.234°N5.678°E`, () => {
        const formatParser = new DecimalSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`1.234°N5.678°E`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });
});
